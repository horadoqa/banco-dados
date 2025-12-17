const db = require('../db');
const dayjs = require('dayjs');

const criarCandidato = async (req, res) => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const { nome_completo, cpf, data_nascimento, estado_civil, email, telefone, enderecos, conjuge, representante_legal, kids } = req.body;

    const exists = await client.query('SELECT 1 FROM candidatos WHERE cpf = $1', [cpf]);
    if (exists.rowCount > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ message: 'CPF do candidato já cadastrado' });
    }

    const candidatoRes = await client.query(`
      INSERT INTO candidatos (nome_completo, cpf, data_nascimento, estado_civil, email, telefone)
      VALUES ($1,$2,$3,$4,$5,$6) RETURNING id
    `, [nome_completo, cpf, data_nascimento, estado_civil, email, telefone]);

    const candidatoId = candidatoRes.rows[0].id;
    const idade = dayjs().diff(dayjs(data_nascimento), 'year');

    if (idade >= 18) {
      // lógica adulto (endereços, cônjuge, representante legal)
      // ... você pode criar funções separadas para inserir endereços, cônjuge e representantes
    } else {
      // lógica kid
      // ...
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Conta criada com sucesso', candidatoId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

module.exports = { criarCandidato };
