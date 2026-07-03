#!/usr/bin/env node
import * as cp from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const extensionId = "marius-patrik.vsdaw";
const codeCommand = process.env.VSCODE_CLI || (process.platform === "win32" ? "code.cmd" : "code");
const bunxCommand = process.env.BUNX_CLI || (process.platform === "win32" ? "bunx.cmd" : "bunx");

function run(command, args = [], options = {}) {
  console.log(`$ ${command} ${args.join(" ")}`);
  let spawnCommand = command;
  let spawnArgs = args;

  if (process.platform === "win32" && /\.cmd$/i.test(command)) {
    const quote = (value) => {
      const text = String(value);
      return /\s/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    };
    spawnCommand = process.env.ComSpec || "cmd.exe";
    spawnArgs = ["/d", "/s", "/c", [quote(command), ...args.map(quote)].join(" ")];
  }

  const result = cp.spawnSync(spawnCommand, spawnArgs, {
    stdio: "inherit",
    shell: false,
    cwd: root,
    ...options,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`Command failed with exit code ${result.status}`);
  }
  return result;
}

function findVsix() {
  const files = fs
    .readdirSync(root)
    .filter((name) => name.endsWith(".vsix"))
    .map((name) => ({ name, mtime: fs.statSync(path.join(root, name)).mtime }))
    .sort((a, b) => b.mtime - a.mtime);

  if (files.length === 0) {
    throw new Error("No .vsix file found. Run `bun run package` first.");
  }
  return path.join(root, files[0].name);
}

async function main() {
  console.log("== VSDAW Smoke Test ==");

  const vsixPath = findVsix();
  console.log(`Using vsix: ${vsixPath}`);

  // Install the extension in VS Code.
  run(codeCommand, ["--install-extension", vsixPath, "--force"]);

  // Run a minimal activation check via the integration test runner.
  try {
    run("bun", ["run", "build:integration-tests"], {
      env: { ...process.env, VSDAW_INTEGRATION_TESTS: "smoke.test.ts" },
    });
    run(bunxCommand, ["vscode-test", "--files", "out/tests/integration/smoke.test.cjs"]);
  } finally {
    // Uninstall the extension so repeated runs are clean.
    run(codeCommand, ["--uninstall-extension", extensionId]);
  }

  console.log("== Smoke test passed ==");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
