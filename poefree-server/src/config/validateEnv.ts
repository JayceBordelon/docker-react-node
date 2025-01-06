import dotenv from "dotenv";

dotenv.config();

const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || defaultValue!;
};

export const PORT = parseInt(getEnvVariable("PORT", "3000"), 10);
export const NODE_ENV = getEnvVariable("NODE_ENV", "development");
export const MONGO_URI = getEnvVariable("MONGO_URI");
