const db = require('../db');

const listarCandidatos = async (req, res) => {
  const client = await db.connect();

  try {
    const result = await client.query(`
      SELECT 
        c.id,
        c.nome_completo,
        c.cpf,
        c.data_nascimento,
        c.estado_civil,
        c.email,
        c.telefone,
        EXTRACT(YEAR FROM AGE(NOW(), c.data_nascimento)) AS idade
      FROM candidatos c
      ORDER BY c.nome_completo
    `);

    res.status(200).json({ candidatos: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

module.exports = { listarCandidatos };
