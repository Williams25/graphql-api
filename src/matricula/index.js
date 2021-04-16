module.exports = {
  matriculaSchema: require("./schema/matricula.graphql"),
  matriculaResolver: require("./resolvers/matriculaResolvers"),
  matriculaDataSource: require("./datasource/matricula")
}