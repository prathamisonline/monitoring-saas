import { log } from "./core";

export function setupAutoCapture(projectId: string, apiUrl: string) {
  window.onerror = (message, source, lineno, colno, error) => {
    log("error", "Unhandled Error", {
      message,
      source,
      lineno,
      colno,
      stack: error?.stack,
      projectId,
      apiUrl,
    });
  };

  window.onunhandledrejection = (event) => {
    log("error", "Unhandled Promise Rejection", {
      reason: event.reason,
      projectId,
      apiUrl,
    });
  };
}
