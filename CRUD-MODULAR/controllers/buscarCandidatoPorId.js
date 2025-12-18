const db = require('../db');

const buscarCandidatoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await db.query(
      `
      SELECT
        c.id,
        c.nome_completo,
        c.cpf,
        c.data_nascimento,
        c.estado_civil,
        c.email,
        c.telefone,
        DATE_PART('year', AGE(c.data_nascimento)) AS idade,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', e.id,
              'tipo', e.tipo,
              'logradouro', e.logradouro,
              'numero', e.numero,
              'complemento', e.complemento,
              'bairro', e.bairro,
              'cidade', e.cidade,
              'estado', e.estado,
              'cep', e.cep
            )
          ) FILTER (WHERE e.id IS NOT NULL),
          '[]'
        ) AS enderecos
      FROM candidatos c
      LEFT JOIN enderecos e ON e.candidato_id = c.id
      WHERE c.id = $1
      GROUP BY c.id
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Candidato não encontrado' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar candidato' });
  }
};

module.exports = { buscarCandidatoPorId };
