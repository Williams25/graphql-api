const { SQLDataSource } = require("datasource-sql");
const DataLoader = require("dataloader");

class MatriculasAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);
  }

  async matricularEstudante(ids) {
    const novaMatricula = {
      estudante_id: ids.estudante,
      turma_id: ids.turma,
      status: "confirmado",
    };

    await this.knex.insert(novaMatricula).into("matriculas");

    this.Resposta.mensagem = "matrícula confirmada";
    return {
      mensagem: "matrícula confirmada",
      code: 201,
    };
  }

  async getMatriculasPorTurma(idTurma) {
    const matriculas = await this.knex
      .select("*")
      .from("matriculas")
      .where({ turma_id: idTurma });

    return matriculas;
  }

  matriculasLoader = new DataLoader(this.getMatriculasPorTurma.bind(this));

  async getMatriculasPorEstudante(idEstudante) {
    const matriculas = await this.knex
      .select("*")
      .from("matriculas")
      .whereIn("estudante_id", idEstudante)
      .select();

    return idEstudante.map((id) =>
      matriculas.filter((matricula) => {
        return matricula.estudante_id === id;
      })
    );
  }

  async deletarMatricula(idMatricula) {
    await this.knex("matriculas")
      .where({ id: Number(idMatricula) })
      .del();

    this.Resposta.mensagem = "registro deletado";
    return {
      mensagem: "registro deletado",
      code: 200,
    };
  }

  async cancelarMatricula(idMatricula) {
    await this.knex
      .update({ status: "cancelado" })
      .where({ id: Number(idMatricula) })
      .into("matriculas");

    this.Resposta.mensagem = "matrícula cancelada";
    return {
      mensagem: "matrícula cancelada",
      code: 200,
    };
  }
}

module.exports = MatriculasAPI;
