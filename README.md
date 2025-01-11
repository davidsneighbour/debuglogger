DebugLogger is a customizable logging wrapper that enhances debugging with log levels, external handlers, and console replacement.

## Installation

```bash
npm install debug-logger
```

## Usage

### Importing and Using the Singleton Instance

```javascript
import DebugLogger, { logger } from './DebugLogger.js';

// Use the singleton instance
logger.log('This is a log message');
logger.warn('This is a warning');
logger.error('This is an error');
```

### Creating a Custom Logger Instance

```javascript
const customLogger = new DebugLogger(true, 'warn');

customLogger.log('This will not log because log level is warn');
customLogger.warn('This is a warning');
customLogger.error('This is an error');
```

### Setting an External Log Handler

```javascript
logger.setHandler((method, args) => {
  if (method === 'error') {
    // Send error logs to a server
    sendToServer(args);
  }
});

logger.error('An error occurred'); // This will trigger the custom handler
```

### Changing Log Levels Dynamically

```javascript
logger.setLogLevel('info');

logger.debug('This will not log');
logger.info('This will log');
```

### Replacing Console Methods Globally

```javascript
import { replaceConsole, restoreConsole } from './DebugLogger.js';

replaceConsole(logger);

console.log('This is now handled by DebugLogger');

restoreConsole(); // Restore original console methods
```

## License

This project is licensed under the MIT License.
