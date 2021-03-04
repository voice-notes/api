import * as dotenv from "dotenv";

dotenv.config();

const {
  NODE_ENV,
  MONGO_PRODUCTION_URI,
  MONGO_TEST_URI,
  FRONT_END_URL,
} = process.env;

export { NODE_ENV, MONGO_PRODUCTION_URI, MONGO_TEST_URI, FRONT_END_URL };
