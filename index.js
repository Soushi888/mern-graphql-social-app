require("dotenv").config();
const { ApolloServer, PubSub } = require("apollo-server");
const typeDefs = require("./grapheql/typeDefs");
const resolvers = require("./grapheql/resolvers");
const mongoose = require("mongoose");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen({ port: process.env.PORT || 5000 }).then((res) => {
      console.log(`Server running at ${res.url}`);
    });
  });
