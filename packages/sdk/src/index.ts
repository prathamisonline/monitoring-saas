import { SDKConfig, LogLevel } from "./types";
import { setupAutoCapture } from "./autoCapture";
import { log as logFn } from "./core";

let config: SDKConfig;

export function init(options: SDKConfig) {
  config = options;

  if (options.autoCaptureErrors) {
    setupAutoCapture(config.projectId, config.apiUrl);
  }
}

export function log(
  level: LogLevel,
  message: string,
  metadata?: Record<string, any>,
) {
  if (!config) throw new Error("SDK not initialized. Call init() first.");
  return logFn(level, message, {
    metadata,
    projectId: config.projectId,
    apiUrl: config.apiUrl,
  });
}

export const info = (msg: string, meta?: Record<string, any>) =>
  log("info", msg, meta);
export const warn = (msg: string, meta?: Record<string, any>) =>
  log("warn", msg, meta);
export const error = (msg: string, meta?: Record<string, any>) =>
  log("error", msg, meta);
export const debug = (msg: string, meta?: Record<string, any>) =>
  log("debug", msg, meta);
