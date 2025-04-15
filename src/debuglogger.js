class debuglogger {
  /**
   * @param debugEnabled - Enable or disable debug output
   * @param logLevel - Minimum log level to show
   * @param prefixText - The text prefix for each log
   * @param prefixColor - CSS color string for the prefix
   */
  constructor(
    debugEnabled = false,
    logLevel = 'debug',
    prefixText = 'LOGGER:',
    prefixColor = '#ff5500',
  ) {
    this.debugEnabled = debugEnabled;
    this.logLevels = ['error', 'warn', 'info', 'debug', 'trace'];
    this.logLevel = logLevel;
    this.handler = null;

    this.prefixText = prefixText;
    this.prefixColor = prefixColor;

    this.originalConsole = { ...console };

    if (
      typeof window !== 'undefined' &&
      typeof window.location !== 'undefined'
    ) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('debug') === 'true') {
        this.debugEnabled = true;
      }
    }
  }

  /**
   * @param level - Set the minimum log level
   */
  setLogLevel(level) {
    if (this.logLevels.includes(level)) {
      this.logLevel = level;
    } else {
      console.warn(
        `Invalid log level: ${level}. Valid levels are: ${this.logLevels.join(', ')}`,
      );
    }
  }

  /**
   * @param handler - Optional handler to override logging behavior
   */
  setHandler(handler) {
    this.handler = handler;
  }

  /**
   * @param text - Set prefix label
   * @param color - Set prefix color (CSS format)
   */
  setPrefix(text, color = '#ff5500') {
    this.prefixText = text;
    this.prefixColor = color;
  }

  logMethod(method, level, ...args) {
    if (
      this.debugEnabled &&
      this.logLevels.indexOf(level) <= this.logLevels.indexOf(this.logLevel)
    ) {
      const prefix = `%c${this.prefixText}`;
      const style = `color: ${this.prefixColor}; font-weight: bold`;
      if (this.handler) {
        this.handler(method, [prefix, style, ...args]);
      } else if (this.originalConsole[method]) {
        this.originalConsole[method](prefix, style, ...args);
      } else {
        this.originalConsole.log(prefix, style, ...args);
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
    this.logMethod('log', 'debug', ...args);
  }
  warn(...args) {
    this.logMethod('warn', 'warn', ...args);
  }
  error(...args) {
    this.logMethod('error', 'error', ...args);
  }
  info(...args) {
    this.logMethod('info', 'info', ...args);
  }
  trace(...args) {
    this.logMethod('trace', 'trace', ...args);
  }
  group(...args) {
    this.logMethod('group', 'debug', ...args);
  }
  groupCollapsed(...args) {
    this.logMethod('groupCollapsed', 'debug', ...args);
  }
  groupEnd() {
    this.logMethod('groupEnd', 'debug');
  }
  assert(...args) {
    this.logMethod('assert', 'error', ...args);
  }
  clear() {
    this.logMethod('clear', 'debug');
  }
  table(...args) {
    this.logMethod('table', 'debug', ...args);
  }
  time(label) {
    this.logMethod('time', 'debug', label);
  }
  timeEnd(label) {
    this.logMethod('timeEnd', 'debug', label);
  }
  count(label) {
    this.logMethod('count', 'debug', label);
  }

  restoreConsole() {
    Object.keys(this.originalConsole).forEach((method) => {
      console[method] = this.originalConsole[method];
    });
  }
}

const logger = new debuglogger(false);

/**
 * @param loggerInstance - A debuglogger instance
 */
function replaceConsole(loggerInstance) {
  const originalConsole = { ...console };
  [
    'log',
    'warn',
    'error',
    'info',
    'trace',
    'group',
    'groupCollapsed',
    'groupEnd',
    'assert',
    'clear',
    'table',
    'time',
    'timeEnd',
    'count',
  ].forEach((method) => {
    console[method] = (...args) => loggerInstance[method](...args);
  });

  loggerInstance.restoreConsole = () => {
    Object.keys(originalConsole).forEach((method) => {
      console[method] = originalConsole[method];
    });
  };
}

export { debuglogger as default, logger, replaceConsole };
