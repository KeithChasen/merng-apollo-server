const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const config = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('mongo is connected');
    return server.listen({port: PORT})
  })
  .then(res => {
    console.log(`Server is running at ${res.url}`)
  })
  .catch(err => {
    console.error(err)
  });
