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
    colour: String!
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
    senderNotes: [ID]
    receiverNotes: [ID]
  }

  type Mutation {
    createCat(name: String!, colour: String!): Cat!
    createNote(sender: String!, receiver: String!, status: String!, url: String!): Note!
  }

`;

export default typeDefs;
