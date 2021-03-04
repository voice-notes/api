import { NODE_ENV, MONGO_PRODUCTION_URI, MONGO_TEST_URI } from "../config";

export const returnDatabaseUri = () => {
  return NODE_ENV === "production" ? MONGO_PRODUCTION_URI : MONGO_TEST_URI;
};
