/**
 * Logger utility for consistent logging across the application
 * Follows the cursor definitions requirement for logging function entry/exit and errors
 */

type LogLevel = 'info' | 'error' | 'warn' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
}

class LoggerService {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };
  }

  private log(entry: LogEntry): void {
    if (!this.isDevelopment) {
      return;
    }

    const logMessage = `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`;
    
    switch (entry.level) {
      case 'error':
        console.error(logMessage, entry.data || '');
        break;
      case 'warn':
        console.warn(logMessage, entry.data || '');
        break;
      case 'debug':
        console.debug(logMessage, entry.data || '');
        break;
      case 'info':
      default:
        console.log(logMessage, entry.data || '');
        break;
    }
  }

  public info(message: string, data?: any): void {
    this.log(this.formatMessage('info', message, data));
  }

  public error(message: string, error?: any): void {
    this.log(this.formatMessage('error', message, error));
  }

  public warn(message: string, data?: any): void {
    this.log(this.formatMessage('warn', message, data));
  }

  public debug(message: string, data?: any): void {
    this.log(this.formatMessage('debug', message, data));
  }

  public functionEntry(functionName: string, params?: any): void {
    this.info(`Function entry: ${functionName}`, params);
  }

  public functionExit(functionName: string, result?: any): void {
    this.info(`Function exit: ${functionName}`, result);
  }
}

export const Logger = new LoggerService(); 