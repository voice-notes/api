const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

  type Query {

  }

  type Note {
    id: ID!
    sender: ID!
    receiver: ID!
    noteStatus(type: Status): String!
    url: String!
  }

  type User {
    id: ID!
    slackID: String
    senderNotes: [Note.id]
    receiverNotes: [Note.id]
  }
  
  enum Status {
    DRAFT
    RECORDED
    LISTENED
  }
`;
