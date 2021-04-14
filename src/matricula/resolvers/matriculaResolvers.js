const { GraphQLScalarType } = require("graphql");

const turmaResolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "String de data e hora no formato ISO-8601",
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value),
  }),

  Query: {
    matriculas: (root, args, { dataSources }, info) => {
      return dataSources.matriculasAPI.getTurmas();
    },
    matricula: (root, { id }, { dataSources }, info) => {
      return dataSources.matriculasAPI.getTurma(id);
    },
  },

  Mutation: {},
};

module.exports = turmaResolvers;
