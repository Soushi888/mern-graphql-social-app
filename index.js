require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "hello world !!!!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true});
server.listen({ port: 3000 }).then((res) => {
  console.log(`Server running at ${res.url}`);
});
