import { gql } from 'apollo-server-express';

const typeDefs = gql`

  type Query {
    notes: [Note]
    users: [User]
  }

  type Note {
    id: ID!
    sender: String!
    receiver: String!
    status: String!
    url: String!
  }

  type User {
    id: ID!
    slackID: String
  }

  type Mutation {
    createNote(sender: String!, receiver: String!, status: String!, url: String!): Note!
    createUser(slackID: String!): User!
  }

`;

export default typeDefs;
