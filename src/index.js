require("./data/sqlite-config");
const path = require("path");
const { ApolloServer } = require("apollo-server");
const { mergeTypeDefs } = require("@graphql-tools/merge");

const { userScheme, userResolver, userDataSource } = require("./user");
const { turmaResolver, turmaSchema, turmaDataSource } = require("./turma");
const { matriculaResolver, matriculaSchema, matriculaDataSource } = require("./matricula");

const dbConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, "..", "db.sqlite"),
  },
};

const server = new ApolloServer({
  typeDefs: mergeTypeDefs([userScheme, turmaSchema, matriculaSchema]),
  resolvers: [userResolver, turmaResolver, matriculaResolver],
  dataSources: () => {
    return {
      usersAPI: userDataSource,
      turmasAPI: new turmaDataSource(dbConfig),
      matriculasAPI: new matriculaDataSource(dbConfig)
    };
  },
});

server.listen().then(({ url }) => console.log(url));
