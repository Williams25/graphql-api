const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db.sqlite");

const turmas = `
CREATE TABLE IF NOT EXISTS turmas(
  id INTEGER PRIMARY KEY,
  descricao TEXT NOT NULL,
  horario TEXT NOT NULL,
  vagas INTEGER,
  inicio TEXT,
  docente_id INTEGER NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`;

const matriculas = `
CREATE TABLE IF NOT EXISTS matriculas(
	id INTEGER PRIMARY KEY,
	estudante_id INTEGER NOT NULL,
	turma_id INTEGER NOT NULL,
	status TEXT NOT NULL,
	created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`;

const insertTurmas = `
INSERT INTO turmas (descricao, horario, vagas, inicio, docente_id)
VALUES 
   ("básico", "manhã", 10, "2020-08-01", 4),
   ("intermediário", "manhã", 5, "2020-08-01", 4),
   ("conversação", "noite", 10, "2020-08-01", 5);
`;

const insertMatriculas = `
INSERT INTO matriculas (estudante_id, turma_id, status)
VALUES 
   (1, 1, "confirmado"),
   (2, 2, "confirmado"),
   (3, 3, "cancelado");
`;

db.serialize(() => {
  db.run("PRAGMA foreign_keys=ON");
  db.run(turmas);
  db.run(matriculas);
  // db.run(insertTurmas);
  // db.run(insertMatriculas);
});

process.on("SIGINT", () =>
  db.close(() => {
    process.exit(0);
  })
);

module.exports = db;
