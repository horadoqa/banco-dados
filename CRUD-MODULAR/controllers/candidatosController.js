const db = require('../db');

// ======================
// Função de validação
// ======================
const isEmailValido = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const criarCandidato = async (req, res) => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const {
      nome_completo,
      cpf,
      data_nascimento,
      estado_civil,
      email,
      telefone,
      enderecos
    } = req.body;

    // ======================
    // Validação obrigatória
    // ======================
    if (
      !nome_completo ||
      !cpf ||
      !data_nascimento ||
      !estado_civil ||
      !email ||
      !telefone ||
      !enderecos ||
      !Array.isArray(enderecos) ||
      enderecos.length === 0
    ) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        message: 'Todos os campos são obrigatórios, incluindo ao menos um endereço'
      });
    }

    // ======================
    // Validação de email
    // ======================
    const emailNormalizado = email.trim().toLowerCase();

    if (!isEmailValido(emailNormalizado)) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        message: 'Email inválido'
      });
    }

    // ======================
    // Verifica CPF duplicado
    // ======================
    const exists = await client.query(
      'SELECT 1 FROM candidatos WHERE cpf = $1',
      [cpf]
    );

    if (exists.rowCount > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({
        message: 'CPF já cadastrado'
      });
    }

    // ======================
    // Insere candidato
    // ======================
    const candidatoRes = await client.query(
      `
      INSERT INTO candidatos (
        nome_completo,
        cpf,
        data_nascimento,
        estado_civil,
        email,
        telefone
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING id
      `,
      [
        nome_completo,
        cpf,
        data_nascimento,
        estado_civil,
        emailNormalizado,
        telefone
      ]
    );

    const candidatoId = candidatoRes.rows[0].id;

    // ======================
    // Insere endereços
    // ======================
    for (const endereco of enderecos) {
      const {
        tipo,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep
      } = endereco;

      if (
        !tipo ||
        !logradouro ||
        !numero ||
        !bairro ||
        !cidade ||
        !estado ||
        !cep
      ) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          message: 'Todos os campos do endereço são obrigatórios'
        });
      }

      await client.query(
        `
        INSERT INTO enderecos (
          candidato_id,
          tipo,
          logradouro,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
          cep
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        `,
        [
          candidatoId,
          tipo,
          logradouro,
          numero,
          complemento || null,
          bairro,
          cidade,
          estado,
          cep
        ]
      );
    }

    await client.query('COMMIT');

    res.status(201).json({
      message: 'Candidato criado com sucesso',
      candidatoId
    });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({
      error: 'Erro ao criar candidato'
    });
  } finally {
    client.release();
  }
};

module.exports = { criarCandidato };
