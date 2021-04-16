const { GraphQLScalarType } = require("graphql");

const usersResolvers = {
  RolesType: {
    ESTUDANTE: "ESTUDANTE",
    DOCENTE: "DOCENTE",
    COORDENACAO: "COORDENACAO",
    FUNCIONARIO: "FUNCIONARIO",
  },

  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "String de data e hora no formato ISO-8601",
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value),
  }),

  Query: {
    users: (root, args, { dataSources }, info) => {
      return dataSources.usersAPI.getUsers(args);
    },
    user: (root, { id }, { dataSources }, info) => {
      return dataSources.usersAPI.getUserById(id);
    },
  },

  Mutation: {
    adicionaUser: (root, args, { dataSources }, info) => {
      return dataSources.usersAPI.adicionaUser(args);
    },
    atualizaUser: (root, args, { dataSources }, info) => {
      return dataSources.usersAPI.atualizaUser(args);
    },
    deletaUser: (root, args, { dataSources }, info) => {
      return dataSources.usersAPI.deletaUser(args);
    },
  },

  User: {
    matriculas: (root, args, { dataSources }) => {
      return dataSources.matriculasAPI.matriculasLoader.load(root.id);
    }
  }
};

module.exports = usersResolvers;
