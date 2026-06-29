import { z } from "zod";
import { PROTOCOL_VERSION } from "../constants.js";

export const ErrorCodeSchema = z.enum([
  "ERR_INVALID_MESSAGE",
  "ERR_UNKNOWN_TYPE",
  "ERR_VALIDATION_FAILED",
  "ERR_ENGINE_TIMEOUT",
  "ERR_ENGINE_NOT_CONNECTED",
  "ERR_PROJECT_NOT_FOUND",
  "ERR_UNAUTHORIZED_ACTION",
  "ERR_INTERNAL",
  "ERR_ENGINE_COMMAND_REJECTED",
  "ERR_MUTATION_CONFLICT",
  "ERR_BUNDLE_VERSION_MISMATCH",
  "ERR_FILE_ACCESS_DENIED",
  "ERR_FILE_NOT_FOUND",
  "ERR_TOOL_NOT_FOUND",
  "ERR_CONFIRMATION_REQUIRED",
  "ERR_BROWSER_NOT_AVAILABLE",
]);

export const ErrorEnvelopeSchema = z.object({
  code: ErrorCodeSchema,
  message: z.string().max(1024),
  details: z.unknown().optional(),
});

export const MessageSchema = z
  .object({
    id: z.string().uuid(),
    type: z.string().min(1).max(128),
    payload: z.unknown().refine((v) => v !== undefined, { message: "payload is required" }),
  })
  .strict();

export const ReplySchema = z
  .object({
    id: z.string().uuid(),
    type: z.literal("reply"),
    inReplyTo: z.string().uuid(),
    success: z.boolean(),
    payload: z.unknown().optional(),
    error: ErrorEnvelopeSchema.optional(),
  })
  .strict();

export const EventSchema = z
  .object({
    id: z.string().uuid(),
    type: z.literal("event"),
    topic: z.string().min(1).max(256),
    payload: z.unknown().refine((v) => v !== undefined, { message: "payload is required" }),
  })
  .passthrough();

export const EngineMessageSchema = z
  .object({
    id: z.string().uuid(),
    type: z.string().min(1).max(128),
    payload: z.unknown().refine((v) => v !== undefined, { message: "payload is required" }),
  })
  .strict();

export const HealthResponseSchema = z.object({
  status: z.literal("ok"),
  protocolVersion: z.literal(PROTOCOL_VERSION),
});
