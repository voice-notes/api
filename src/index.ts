import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";

import { MONGO_PRODUCTION_URL, MONGO_TEST_URL } from "./constants";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import { slackQuery } from "./utils";

// require("dotenv").config();

// if (process.env.NODE_ENV === "production") {
//   const databaseUrl = MONGO_PRODUCTION_URL;
// } else {
//   const databaseUrl = MONGO_TEST_URL;
// }

let databaseUrl = MONGO_TEST_URL;
if (process.env.NODE_ENV === "production") {
  databaseUrl = MONGO_PRODUCTION_URL;
}

console.log(process.env.NODE_ENV);

const startServer = async () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));

  app.post("/slack", (req, res) => {
    slackQuery(req, res);
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
  });
  server.applyMiddleware({ app });

  const listen = app.listen({ port: 4000 }, () =>
    console.log(`🎙 Server ready at port 4000`)
  );

  await connect(listen);
};

async function connect(listen: any) {
  mongoose.connection
    .on("error", console.log)
    .on("disconnected", connect)
    .once("open", () => listen);

  return await mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

startServer();
