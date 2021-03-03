import * as dotenv from "dotenv";

dotenv.config();

export const returnGraphqlEndpoint = () => {
  console.log(process.env.MONGO_TEST_URI);
  console.log(process.env.GRAPHQL_ENDPOINT);
  return process.env.GRAPHQL_ENDPOINT;
};
