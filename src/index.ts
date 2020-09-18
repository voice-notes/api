// import { ApolloServer } from "apollo-server";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import slackAPI from "./datasources/slack";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";
// import mongoose from "mongoose";

// const startServer = async () => {
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const slackQuery = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("request body is:");
  console.log(request.body);

  // need to check if query is already included in body (this will be true when sent from the client)

  const query = {
    query: `{ test(channelId: \"${request.body.channel_id}\") }`,
    variables: {},
  };
  request.body = query;
  // response.status(200).send({
  //   channel: "D01A7T2H8G2",
  //   text: "Hello, world",
  // });
  console.log(request.body);
  next();
};

app.use(slackQuery);

export interface IDataSources {
  slackAPI: slackAPI;
}

const buildDataSources = () => {
  return {
    slackAPI: new slackAPI(),
  } as DataSources<IDataSources>;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => buildDataSources(),
  // playground: true,
});

server.applyMiddleware({ app, path: "/graphql" });

// await mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true})
// .then(()  => {
app.listen({ port: 4000 }, () => console.log(`🎙 Server ready at port 4000`));
// })
// .catch((err)=> { console.log(err)})
// };

// startServer();
