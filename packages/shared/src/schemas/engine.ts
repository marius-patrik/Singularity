import { z } from "zod";

export const EngineEventTopicSchema = z.enum([
  "transport",
  "meter",
  "error",
  "pluginScan",
  "renderProgress",
]);

export type EngineEventTopic = z.infer<typeof EngineEventTopicSchema>;
