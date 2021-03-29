const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const config = require('./config');
const Post = require('./models/Post');
const User = require('./models/User');

const typeDefs = gql`
  type Post {
      id: ID!
      body: String!
      createdAt: String!
      username: String!
  }
  
  type Query {
      getPosts: [Post]!
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        return  await Post.find();
      } catch (e) {
        throw new Error(e)
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
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
