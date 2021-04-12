const users = [
  {
    nome: "william",
    ativo: true,
  },
  {
    nome: "taty",
    ativo: false,
  },
];

const usersResolvers = {
  Query: {
    users: () => users
  }
};

module.exports = usersResolvers;
