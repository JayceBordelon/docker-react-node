import {
    createLogger,
    format,
    transports,
    addColors,
    Logger as WinstonLogger,
} from 'winston';

const { combine, timestamp, printf, colorize } = format;

// Define custom colors for log levels
addColors({
    error: 'red bold',
    warn: 'yellow bold',
    info: 'white',
    success: 'green bold',
});

// Define custom log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    success: 3,
};

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

// Extend the Logger interface to add the `success` method
interface CustomLogger extends WinstonLogger {
    success: (message: string) => void;
}

// Create the logger
export const logger: CustomLogger = createLogger({
    levels,
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        colorize(),
        format.errors({ stack: true }),
        logFormat,
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/server.log',
            format: combine(timestamp(), logFormat),
        }),
    ],
}) as CustomLogger;

// Add the `success` method to the logger
logger.success = (message: string) => logger.log({ level: 'info', message });
