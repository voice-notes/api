import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";

import { returnDatabaseUri } from "./utils/returnDatabaseUri";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import { slackQuery } from "./utils/slackQuery";

const databaseUri = returnDatabaseUri();

const startServer = async () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    console.log(req)
    res.sendStatus(200)
  })

  app.post("/slack", (req, res) => {
    slackQuery(req, res);
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
  });
  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;

  const listen = app.listen({ port: port }, () =>
    console.log(`🎙 Server ready at port 4000`)
  );

  await connect(listen);
};

async function connect(listen: any) {
  mongoose.connection.on("error", console.log).once("open", () => listen);

  return await mongoose.connect(`${databaseUri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

startServer();
