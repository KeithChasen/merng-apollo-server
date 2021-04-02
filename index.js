const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const config = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

mongoose
  .connect(config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('mongo is connected');
    return server.listen({port: 5000})
  })
  .then(res => {
    console.log(`Server is running at ${res.url}`)
  });
