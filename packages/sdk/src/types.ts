export type LogLevel = "info" | "warn" | "error" | "debug";

export interface SDKConfig {
  projectId: string;
  apiUrl: string;
  autoCaptureErrors?: boolean;
}

export interface LogPayload {
  level: LogLevel;
  message: string;
  metadata?: Record<string, any>;
}
