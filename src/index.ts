import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
// import * as dotenv from "dotenv";

import { productionDb, testDb, env } from "./database.config";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import { slackQuery } from "./utils";

// dotenv.config();

// console.log(process.env.MONGO_PRODUCTION_URL);
let databaseUrl = testDb;
if (env === "production") {
  databaseUrl = productionDb;
}
console.log(databaseUrl);

const startServer = async () => {
  console.log(databaseUrl);
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
