const { SQLDataSource } = require("datasource-sql");

class Turma extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);
  }

  _setStatusAndMenssagem(status, mensagem) {
    return {
      code: status || 400,
      mensagem: mensagem || "Falha na operação tente novamente",
    };
  }

  async getTurmas() {
    return await this.knex.select("*").from("turmas");
  }

  async getTurma(id) {
    const turma = await this.knex.select("*").from("turmas").where("id", id);
    return turma[0];
  }
}

module.exports = Turma;
