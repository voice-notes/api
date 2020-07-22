const { ApolloServer } = require("apollo-server");

const typeDefs = require("./schema");

// const resolvers = require('./resolvers');
const data = require("./data");

const resolvers = {
  Query: {
    notes: () => data.notes,
    users: () => data.users,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🎙 Server ready at ${url}`);
});
