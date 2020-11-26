import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";

import { MONGO_URL } from "./constants";
import resolvers from "./resolvers";
import typeDefs from "./schema";

const startServer = async () => {
  const app = express();

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

  return await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

startServer();
