import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    notes: [Note]
  }

  type Mutation {
    createNote(
      slackID: String!
      audioUrl: String!
      responseUrl: String!
    ): Note!
  }

  type Note {
    id: ID!
    slackID: String
    url: String!
  }
`;

export default typeDefs;
