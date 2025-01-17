import { disconnectFromMongo } from '../config/db.config';

export const setupGracefulShutdown = (): void => {
    const handleShutdown = async (signal: string) => {
        console.info(`\nReceived ${signal}. Gracefully shutting down...`);
        await disconnectFromMongo();
        process.exit(0);
    };

    process.on('SIGINT', () => handleShutdown('SIGINT'));
    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
};
