const { ApolloServer } = require("apollo-server");
const { userScheme, userResolver } = require("./user");

const server = new ApolloServer({
  typeDefs: [userScheme],
  resolvers: [userResolver],
});

server.listen().then(({ url }) => console.log(url));
