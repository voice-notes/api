import { config } from 'dotenv';

config();

export const {
  NODE_ENV,
  MONGO_TEST_URL,
  MONGO_PRODUCTION_URL,
} = process.env as {
  [key: string]: string;
};
