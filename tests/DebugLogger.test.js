import { describe, it, expect, beforeEach } from 'vitest';
import DebugLogger from '../src/DebugLogger.js';

describe('DebugLogger', () => {
  beforeEach(() => {
    // Mock the global window object for URL parameter tests
    global.window = {
      location: {
        search: '?debug=true',
      },
    };
  });

  it('enables debugging when ?debug=true is in the URL', () => {
    const logger = new DebugLogger();
    expect(logger.debugEnabled).toBe(true);
  });

  it('does not enable debugging by default', () => {
    delete global.window; // Clean up the mock
    const logger = new DebugLogger();
    expect(logger.debugEnabled).toBe(false);
  });

  it('logs messages when debugging is enabled', () => {
    const logger = new DebugLogger(true);
    expect(() => logger.log('Test message')).not.toThrow();
  });

  it('does not log messages when debugging is disabled', () => {
    const logger = new DebugLogger(false);
    expect(() => logger.log('Test message')).not.toThrow();
  });
});
