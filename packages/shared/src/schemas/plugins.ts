import { z } from "zod";
import { EntityIdSchema } from "./base.js";
import { PluginFormatSchema } from "./plugin.js";

export const PluginInfoSchema = z.object({
  id: EntityIdSchema,
  format: PluginFormatSchema,
  path: z.string(),
  name: z.string(),
  vendor: z.string(),
  category: z.string(),
  isInstrument: z.boolean(),
  version: z.string(),
  uniqueId: z.string(),
  scannedAt: z.string().datetime(),
});

export const PluginScanResultSchema = z.object({
  plugins: z.array(PluginInfoSchema),
  errors: z.array(z.object({ path: z.string(), message: z.string() })),
});
