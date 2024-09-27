import { LogLevel, Category, CategoryServiceFactory, CategoryConfiguration, LoggerType } from 'typescript-logging';

/**
 * LoggerService class for managing logging operations in the Apartment Finder application
 */
export class LoggerService {
  private logger: LoggerType;
  private loggerFactory: CategoryServiceFactory;

  /**
   * Initializes the LoggerService with default configurations
   */
  constructor() {
    // Create a CategoryServiceFactory with default configurations
    this.loggerFactory = CategoryServiceFactory.create({
      defaultConfiguration: new CategoryConfiguration(LogLevel.Info)
    });

    // Create a default Category for the application
    const category = new Category('ApartmentFinder');

    // Initialize the logger property with the created Category
    this.logger = this.loggerFactory.getLogger(category);
  }

  /**
   * Logs a message with the specified log level
   * @param level - The log level
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  log(level: LogLevel, message: string, ...args: any[]): void {
    // Check the provided log level and call the appropriate logging method
    switch (level) {
      case LogLevel.Trace:
        this.logger.trace(message, ...args);
        break;
      case LogLevel.Debug:
        this.logger.debug(message, ...args);
        break;
      case LogLevel.Info:
        this.logger.info(message, ...args);
        break;
      case LogLevel.Warn:
        this.logger.warn(message, ...args);
        break;
      case LogLevel.Error:
        this.logger.error(message, ...args);
        break;
      case LogLevel.Fatal:
        this.logger.fatal(message, ...args);
        break;
      default:
        this.logger.info(message, ...args);
    }
  }

  /**
   * Logs a debug message
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  debug(message: string, ...args: any[]): void {
    this.log(LogLevel.Debug, message, ...args);
  }

  /**
   * Logs an info message
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  info(message: string, ...args: any[]): void {
    this.log(LogLevel.Info, message, ...args);
  }

  /**
   * Logs a warning message
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  warn(message: string, ...args: any[]): void {
    this.log(LogLevel.Warn, message, ...args);
  }

  /**
   * Logs an error message
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  error(message: string, ...args: any[]): void {
    this.log(LogLevel.Error, message, ...args);
  }

  /**
   * Logs a fatal error message
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  fatal(message: string, ...args: any[]): void {
    this.log(LogLevel.Fatal, message, ...args);
  }

  /**
   * Sets the log level for the logger
   * @param level - The log level to set
   */
  setLogLevel(level: LogLevel): void {
    // Update the log level configuration for the logger
    const newConfiguration = new CategoryConfiguration(level);
    
    // Apply the new configuration to the logger
    this.loggerFactory.applyConfiguration(newConfiguration);
  }
}

// Human tasks:
// TODO: Implement error handling for logger initialization failures
// TODO: Add unit tests for the LoggerService class
// TODO: Implement a mechanism to write logs to a file or external logging service