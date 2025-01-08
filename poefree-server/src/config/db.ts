import mongoose from 'mongoose';

const connectToMongo = async (uri: string): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log('[5/5] Connected to MongoDB...');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

const disconnectFromMongo = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Failed to disconnect from MongoDB', error);
  }
};

export { connectToMongo, disconnectFromMongo };
