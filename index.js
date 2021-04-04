require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./grapheql/typeDefs");
const resolvers = require("./grapheql/resolvers");
const mongoose = require("mongoose");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen({ port: 3000 }).then((res) => {
      console.log(`Server running at ${res.url}`);
    });
  });
