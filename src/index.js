const { ApolloServer } = require("apollo-server");
const { userScheme, userResolver } = require("./user");
const Users = require("./user/datasource/user");

const server = new ApolloServer({
  typeDefs: [userScheme],
  resolvers: [userResolver],
  dataSources: () => {
    return {
      usersAPI: Users,
    };
  },
});

server.listen().then(({ url }) => console.log(url));
