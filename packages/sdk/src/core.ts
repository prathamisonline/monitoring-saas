import { LogLevel, LogPayload } from "./types";

export async function log(
  level: LogLevel,
  message: string,
  {
    metadata,
    projectId,
    apiUrl,
  }: { metadata?: Record<string, any>; projectId: string; apiUrl: string },
) {
  try {
    await fetch(`${apiUrl}/projects/${projectId}/logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, message, metadata }),
    });
  } catch (err) {
    console.error("[MonitoringSDK] Failed to send log:", err);
  }
}
