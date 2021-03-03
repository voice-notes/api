export const returnDatabaseUri = () => {
  return process.env.NODE_ENV === "production"
    ? process.env.MONGO_PRODUCTION_URI
    : process.env.MONGO_TEST_URI;
};
