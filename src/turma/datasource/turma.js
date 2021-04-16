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

  async incluiTurma(novaTurma) {
    const novaTurmaId = await this.knex
      .insert(novaTurma)
      .returning('id')
      .into('turmas')

    const turmaInserida = await this.getTurma(novaTurmaId[0])
    return ({ ...turmaInserida })
  }

  async atualizaTurma(novosDados) {
    await this.knex
      .update({ ...novosDados.turma })
      .where({ id: Number(novosDados.id) })
      .into('turmas')

    const turmaAtualizada = await this.getTurma(novosDados.id)
    return ({
      ...turmaAtualizada
    })
  }

  async deletaTurma(id) {
    await this.knex('turmas')
      .where({ id: id })
      .del()

    this.Resposta.mensagem = "registro deletado"
    return this._setStatusAndMenssagem(200, "Operação efetuada com sucesso")
  }

}

module.exports = Turma;
