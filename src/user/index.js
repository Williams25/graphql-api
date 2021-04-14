module.exports = {
  userScheme: require("./schema/user.graphql"),
  userResolver: require("./resolvers/userResolvers"),
  userDataSource: require("./datasource/user")
};
