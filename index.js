const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`
  type Query {
      sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => 'Hello'
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen({ port: 5000 })
.then(res => {
  console.log(`Server is running at ${res.url}`)
});
