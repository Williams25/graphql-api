const { GraphQLScalarType } = require("graphql");

const matriculaResolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "String de data e hora no formato ISO-8601",
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value),
  }),

  Query: {
    // matriculas: (root, args, { dataSources }, info) => {
    //   return dataSources.matriculasAPI.getTurmas();
    // },
    // matricula: (root, { id }, { dataSources }, info) => {
    //   return dataSources.matriculasAPI.getTurma(id);
    // },
  },

  Mutation: {
    matricularEstudante: (root, args, { dataSources }) => dataSources.matriculasAPI.matricularEstudante(args),
    deletarMatricula: (root, { matricula }, { dataSources }) => dataSources.matriculasAPI.deletarMatricula(matricula),
    cancelarMatricula: (root, { matricula }, { dataSources }) => dataSources.matriculasAPI.cancelarMatricula(matricula),
  },

  Matricula: {
    estudante: (root, args, { dataSources }) => dataSources.usersAPI.getUserById(root),
    turma: (root, args, { dataSources }) => dataSources.turmasAPI.getTurma(root.turma_id)
  }
};

module.exports = matriculaResolvers;
