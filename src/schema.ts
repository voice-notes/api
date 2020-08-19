import { gql } from 'apollo-server-express';

const typeDefs = gql`

  type Query {
    notes: [Note]
    users: [User]
    cats: [Cat!]!
  }

  type Cat {
    id: ID!
    name: String!
  }

  type Note {
    id: ID!
    sender: ID!
    receiver: ID!
    status: String!
    url: String!
  }

  type User {
    id: ID!
    slackID: String
    senderNotes: [ID]
    receiverNotes: [ID]
  }

  type Mutation {
    createCat(name: String!): Cat!
  }

`;

export default typeDefs;
