import dotenv from 'dotenv';

dotenv.config();

const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || defaultValue!;
};

export const PORT: number = parseInt(getEnvVariable('PORT', '3455'), 10);
export const NODE_ENV: string = getEnvVariable('NODE_ENV', 'development');
export const MONGO_URI: string = getEnvVariable('MONGO_URI');
export const SESSION_SECRET: string = getEnvVariable(
  'SESSION_SECRET',
  'aJS82!hjABFSh984q3ejwca9498vjcap9wjrsnuighfp983893w49lkasjdnqASDFasrghSeGserHwetHewFdj3@rLzX#92QwnTYz%Lkq9mDxJt?7pfG^yNkL@OjdJ',
);
