import * as dotenv from "dotenv";

dotenv.config();

export const returnDatabaseUri = () => {
  console.log(process.env.MONGO_TEST_URI);
  console.log(process.env.GRAPHQL_ENDPOINT);
  return process.env.NODE_ENV === "production"
    ? process.env.MONGO_PRODUCTION_URI
    : process.env.MONGO_TEST_URI;
};
