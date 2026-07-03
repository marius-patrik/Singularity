import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outdir = path.join(root, "out", "tests", "integration");

fs.mkdirSync(outdir, { recursive: true });

for (const name of fs.readdirSync(outdir)) {
  if (name.endsWith(".cjs") || name.endsWith(".cjs.map")) {
    fs.rmSync(path.join(outdir, name), { force: true });
  }
}

const selectedTests = new Set(
  (process.env.VSDAW_INTEGRATION_TESTS || "")
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean),
);

const entries = fs
  .readdirSync(path.join(root, "tests", "integration"))
  .filter((name) => name.endsWith(".test.ts"))
  .filter((name) => selectedTests.size === 0 || selectedTests.has(name))
  .map((name) => ({
    in: path.join(root, "tests", "integration", name),
    out: path.basename(name, ".ts"),
  }));

/** @type {esbuild.BuildOptions} */
const config = {
  entryPoints: entries,
  bundle: true,
  format: "cjs",
  target: "node18",
  platform: "node",
  external: ["vscode"],
  sourcemap: true,
  outdir,
  outExtension: { ".js": ".cjs" },
};

async function build() {
  await esbuild.build(config);
  console.log("Integration tests built.");
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
