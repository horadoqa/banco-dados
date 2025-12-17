const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Conexão com o banco
const db = new Pool({
  host: 'localhost',
  user: 'admin',
  password: 'admin123',
  database: 'banco_horadoqa',
  port: 5432
});

// =======================
// ROTAS
// =======================

// 1️⃣ Cadastrar candidato
app.post('/api/candidatos', async (req, res) => {
  try {
    const { nome_completo, cpf, data_nascimento, estado_civil, email, telefone } = req.body;

    const result = await db.query(`
      INSERT INTO public.candidatos
      (nome_completo, cpf, data_nascimento, estado_civil, email, telefone)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (cpf) DO NOTHING
      RETURNING *
    `, [nome_completo, cpf, data_nascimento, estado_civil, email, telefone]);

    if (result.rowCount === 0) {
      return res.status(409).json({ message: 'CPF já cadastrado na base' });
    }

    res.status(201).json({ message: 'Candidato cadastrado com sucesso', candidato: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar candidato' });
  }
});

// 2️⃣ Listar todos os candidatos
app.get('/api/candidatos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM public.candidatos ORDER BY nome_completo');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar candidatos' });
  }
});

// 3️⃣ Buscar candidato por CPF
app.get('/api/candidatos/:cpf', async (req, res) => {
  try {
    const { cpf } = req.params;
    const result = await db.query('SELECT * FROM public.candidatos WHERE cpf = $1', [cpf]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Candidato não encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar candidato' });
  }
});

// 4️⃣ Atualizar candidato por CPF
app.put('/api/candidatos/:cpf', async (req, res) => {
  try {
    const { cpf } = req.params;
    const { nome_completo, data_nascimento, estado_civil, email, telefone } = req.body;

    const result = await db.query(`
      UPDATE public.candidatos
      SET nome_completo = $1,
          data_nascimento = $2,
          estado_civil = $3,
          email = $4,
          telefone = $5
      WHERE cpf = $6
      RETURNING *
    `, [nome_completo, data_nascimento, estado_civil, email, telefone, cpf]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Candidato não encontrado' });
    }

    res.status(200).json({ message: 'Candidato atualizado com sucesso', candidato: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar candidato' });
  }
});

// 5️⃣ Excluir candidato por CPF
app.delete('/api/candidatos/:cpf', async (req, res) => {
  try {
    const { cpf } = req.params;

    const result = await db.query('DELETE FROM public.candidatos WHERE cpf = $1 RETURNING *', [cpf]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Candidato não encontrado' });
    }

    res.status(200).json({ message: 'Candidato excluído com sucesso', candidato: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir candidato' });
  }
});

// =======================
// INICIAR SERVIDOR
// =======================
app.listen(8080, () => {
  console.log('API rodando em http://localhost:8080');
});
