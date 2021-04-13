const { RESTDataSource } = require("apollo-datasource-rest");

class Users extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000";
    this.respostaCustom = {
      code: 200,
      mensagem: "Operação efetuada com sucesso",
    };
  }

  async usersDados(user) {
    return await {
      id: user.id,
      nome: user.nome,
      email: user.email,
      ativo: user.ativo,
      role: await this.get(`/roles/${user.role}`),
    };
  }

  async getUsers() {
    const users = await this.get("/users");
    return users.map(async (user) => {
      return this.usersDados(user);
    });
  }

  async getUserById(id) {
    const user = await this.get(`/users/${id}`);
    return this.usersDados(user);
  }

  async adicionaUser(user) {
    const users = await this.get("/users");
    user.id = Math.floor(Math.random()); //users.length + 1;
    const role = await this.get(`/roles?type=${user.role}`);
    await this.post("/users", { ...user, role: role[0].id });
    return {
      ...user,
      role: role[0],
    };
  }

  async atualizaUser(user) {
    const role = await this.get(`/roles?type=${user.user.role}`);
    await this.put(`/users/${user.id}`, { ...user, role: role[0].id });

    return {
      ...this.respostaCustom,
      userAtualizado: {
        ...user.user,
        role: role[0],
      },
    };
  }

  async deletaUser({ id }) {
    await this.delete(`/users/${id}`);
    return this.respostaCustom;
  }
}

module.exports = new Users();
