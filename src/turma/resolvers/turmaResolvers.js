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
    turmas: (root, args, { dataSources }, info) => {
      return dataSources.turmasAPI.getTurmas();
    },
    turma: (root, { id }, { dataSources }, info) => {
      return dataSources.turmasAPI.getTurma(id);
    },
  },

  Mutation: {
    incluiTurma: (root, { turma }, { dataSources }) => dataSources.turmasAPI.incluiTurma(turma),
    atualizaTurma: (root, novosDados, { dataSources }) => dataSources.turmasAPI.atualizaTurma(novosDados),
    deletaTurma: (root, { id }, { dataSources }) => dataSources.turmasAPI.deletaTurma(id),
  },

  Turma: {
    matriculas: (root, args, { dataSources }) => dataSources.matriculasAPI.getMatriculasPorTurma(root.id),
    docente: (root, args, { dataSources }) => dataSources.usersAPI.getUserById(root.docente_id)
  }
};

module.exports = turmaResolvers;
