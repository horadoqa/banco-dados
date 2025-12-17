const db = require('../db');

const excluirCandidato = async (req, res) => {
  const client = await db.connect();
  const { id } = req.params; // id é um UUID

  try {
    await client.query('BEGIN');

    // Verifica se o candidato existe
    const exists = await client.query('SELECT 1 FROM candidatos WHERE id = $1', [id]);
    if (exists.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Candidato não encontrado' });
    }

    // Remove dependências (endereços, conjuges, representantes, kids)
    await client.query('DELETE FROM enderecos WHERE candidato_id = $1', [id]);
    await client.query('DELETE FROM conjuges WHERE candidato_id = $1', [id]);
    await client.query('DELETE FROM representantes_legais WHERE candidato_id = $1', [id]);
    await client.query('DELETE FROM kids WHERE candidato_id = $1', [id]);

    // Remove o candidato
    await client.query('DELETE FROM candidatos WHERE id = $1', [id]);

    await client.query('COMMIT');
    res.status(200).json({ message: 'Candidato excluído com sucesso' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

module.exports = { excluirCandidato };
