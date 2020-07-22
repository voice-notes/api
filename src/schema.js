const { gql } = require('apollo-server');

const typeDefs = gql`

  type Query {
    notes: [Note]
    users: [User]
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

`;

module.exports = typeDefs;
