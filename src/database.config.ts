import * as dotenv from "dotenv";

dotenv.config();

export const productionDb = process.env.MONGO_PRODUCTION_URL ?? "";

export const testDb = process.env.MONGO_TEST_URL ?? "";

export const env = process.env.NODE_ENV;
