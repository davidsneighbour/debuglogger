

export default class DebugLogger {
  constructor(debugEnabled = false, logLevel = 'debug') {
    this.debugEnabled = debugEnabled;
    this.logLevels = ['error', 'warn', 'info', 'debug', 'trace'];
    this.logLevel = logLevel;
    this.handler = null;

    // Store original console methods
    this.originalConsole = { ...console };

    // Environment check
    if (typeof window !== 'undefined' && typeof window.location !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('debug') === 'true') {
        this.debugEnabled = true;
      }
    }
  }

  setLogLevel(level) {
    if (this.logLevels.includes(level)) {
      this.logLevel = level;
    } else {
      console.warn(
        `Invalid log level: ${level}. Valid levels are: ${this.logLevels.join(
          ", "
        )}`
      );
    }
  }

  setHandler(handler) {
    this.handler = handler;
  }

  logMethod(method, level, ...args) {
    if (
      this.debugEnabled &&
      this.logLevels.indexOf(level) <= this.logLevels.indexOf(this.logLevel)
    ) {
      if (this.handler) {
        this.handler(method, args);
      } else if (this.originalConsole[method]) {
        this.originalConsole[method](...args);
      } else {
        // Fallback if console method is unavailable
        this.originalConsole.log(`[${method.toUpperCase()}]:`, ...args);
      }
    }
  }

  enableDebug() {
    this.debugEnabled = true;
  }
  disableDebug() {
    this.debugEnabled = false;
  }

  log(...args) {
    this.logMethod("log", "debug", ...args);
  }
  warn(...args) {
    this.logMethod("warn", "warn", ...args);
  }
  error(...args) {
    this.logMethod("error", "error", ...args);
  }
  info(...args) {
    this.logMethod("info", "info", ...args);
  }
  trace(...args) {
    this.logMethod("trace", "trace", ...args);
  }
  group(...args) {
    this.logMethod("group", "debug", ...args);
  }
  groupCollapsed(...args) {
    this.logMethod("groupCollapsed", "debug", ...args);
  }
  groupEnd() {
    this.logMethod("groupEnd", "debug");
  }
  assert(...args) {
    this.logMethod("assert", "error", ...args);
  }
  clear() {
    this.logMethod("clear", "debug");
  }
  table(...args) {
    this.logMethod("table", "debug", ...args);
  }
  time(label) {
    this.logMethod("time", "debug", label);
  }
  timeEnd(label) {
    this.logMethod("timeEnd", "debug", label);
  }
  count(label) {
    this.logMethod("count", "debug", label);
  }

  restoreConsole() {
    Object.keys(this.originalConsole).forEach((method) => {
      console[method] = this.originalConsole[method];
    });
  }
}

const logger = new DebugLogger(false);

export function replaceConsole(loggerInstance) {
  const originalConsole = { ...console }; // Backup original console
  [
    "log",
    "warn",
    "error",
    "info",
    "trace",
    "group",
    "groupCollapsed",
    "groupEnd",
    "assert",
    "clear",
    "table",
    "time",
    "timeEnd",
    "count",
  ].forEach((method) => {
    console[method] = (...args) => loggerInstance[method](...args);
  });

  loggerInstance.restoreConsole = () => {
    Object.keys(originalConsole).forEach((method) => {
      console[method] = originalConsole[method];
    });
  };
}

export { logger };
