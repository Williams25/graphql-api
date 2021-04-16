const { RESTDataSource } = require("apollo-datasource-rest");

class Users extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000";
  }

  _setStatusAndMenssagem(status, mensagem) {
    return {
      code: status || 400,
      mensagem: mensagem || "Falha na operação tente novamente",
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

  async getUsers({ page = 1, limit = 0 }) {
    const query = limit ? `/users?_page=${page}&_limit=${limit}` : `/users?_page=${page}`
    const users = await this.get(query);
    return users.map(async (user) => {
      return this.usersDados(user);
    });
  }

  async getUserById({ id }) {
    const user = await this.get(`/users/${id}`);
    return this.usersDados(user);
  }

  async adicionaUser(user) {
    user.user.id = Math.floor(Math.random()); //users.length + 1;
    const role = await this.get(`/roles?type=${user.user.role}`);
    await this.post("/users", { ...user, role: role[0].id });

    const { code, mensagem } = this._setStatusAndMenssagem(
      201,
      "Operação efetuada com sucesso"
    );

    return {
      code,
      mensagem,
      user: {
        nome: user.user.nome,
        ativo: user.user.ativo,
        email: user.user.email,
        role: role[0],
      },
    };
  }

  async atualizaUser(user) {
    const role = await this.get(`/roles?type=${user.user.role}`);
    await this.put(`/users/${user.id}`, { ...user, role: role[0].id });

    const { code, mensagem } = this._setStatusAndMenssagem(
      200,
      "Operação efetuada com sucesso"
    );

    return {
      code,
      mensagem,
      userAtualizado: {
        ...user.user,
        role: role[0],
      },
    };
  }

  async deletaUser({ id }) {
    await this.delete(`/users/${id}`);
    return this._setStatusAndMenssagem(200, "Operação efetuada com sucesso");
  }
}

module.exports = new Users();
