const express = require('express');
const { Pool } = require('pg');
const dayjs = require('dayjs'); // Para manipular datas

const app = express();
app.use(express.json());

// =======================
// CONEXÃO COM O BANCO
// =======================
const db = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin123',
  database: process.env.DB_NAME || 'banco_horadoqa',
  port: process.env.DB_PORT || 5432
});

// =======================
// 1️⃣ Criar candidato (adulto ou kid)
// =======================
app.post('/api/candidatos', async (req, res) => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const { nome_completo, cpf, data_nascimento, estado_civil, email, telefone, enderecos, conjuge, representante_legal, kids } = req.body;

    // Verifica CPF do candidato
    const exists = await client.query('SELECT 1 FROM candidatos WHERE cpf = $1', [cpf]);
    if (exists.rowCount > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ message: 'CPF do candidato já cadastrado' });
    }

    // Inserir candidato
    const candidatoRes = await client.query(`
      INSERT INTO candidatos (nome_completo, cpf, data_nascimento, estado_civil, email, telefone)
      VALUES ($1,$2,$3,$4,$5,$6) RETURNING id
    `, [nome_completo, cpf, data_nascimento, estado_civil, email, telefone]);
    const candidatoId = candidatoRes.rows[0].id;

    // Determinar idade
    const idade = dayjs().diff(dayjs(data_nascimento), 'year');

    // -----------------------
    // 1️⃣ Caso adulto
    // -----------------------
    if (idade >= 18) {
      // Endereços
      if (enderecos?.length > 0) {
        for (const e of enderecos) {
          if (!['residencial','comercial'].includes(e.tipo)) {
            await client.query('ROLLBACK');
            return res.status(400).json({ message: 'Tipo de endereço inválido' });
          }
          await client.query(`
            INSERT INTO enderecos (candidato_id, tipo, logradouro, numero, complemento, bairro, cidade, estado, cep)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
          `, [candidatoId, e.tipo, e.logradouro, e.numero, e.complemento, e.bairro, e.cidade, e.estado, e.cep]);
        }
      }

      // Cônjuge se casado
      if (estado_civil?.toLowerCase() === 'casado' && conjuge) {
        const conjExist = await client.query('SELECT 1 FROM conjuges WHERE cpf = $1', [conjuge.cpf]);
        if (conjExist.rowCount > 0) {
          await client.query('ROLLBACK');
          return res.status(409).json({ message: 'CPF do cônjuge já cadastrado' });
        }
        await client.query(`
          INSERT INTO conjuges (candidato_id, nome_completo, cpf, data_nascimento, email, telefone)
          VALUES ($1,$2,$3,$4,$5,$6)
        `, [candidatoId, conjuge.nome_completo, conjuge.cpf, conjuge.data_nascimento, conjuge.email, conjuge.telefone]);
      }

      // Representante legal (opcional)
      if (representante_legal) {
        const repExist = await client.query('SELECT 1 FROM representantes_legais WHERE cpf = $1', [representante_legal.cpf]);
        if (repExist.rowCount > 0) {
          await client.query('ROLLBACK');
          return res.status(409).json({ message: 'CPF do representante legal já cadastrado' });
        }
        await client.query(`
          INSERT INTO representantes_legais (candidato_id, nome_completo, cpf, data_nascimento, email, telefone)
          VALUES ($1,$2,$3,$4,$5,$6)
        `, [candidatoId, representante_legal.nome_completo, representante_legal.cpf, representante_legal.data_nascimento, representante_legal.email, representante_legal.telefone]);
      }

    // -----------------------
    // 2️⃣ Caso kid
    // -----------------------
    } else {
      // Inserir na tabela kids
      const kidRes = await client.query(`
        INSERT INTO kids (candidato_id, nome_completo, cpf, data_nascimento, email, telefone)
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING id
      `, [candidatoId, nome_completo, cpf, data_nascimento, email, telefone]);
      const kidId = kidRes.rows[0].id;

      // Endereços do kid
      if (enderecos?.length > 0) {
        for (const e of enderecos) {
          await client.query(`
            INSERT INTO enderecos (candidato_id, tipo, logradouro, numero, complemento, bairro, cidade, estado, cep)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
          `, [candidatoId, e.tipo, e.logradouro, e.numero, e.complemento, e.bairro, e.cidade, e.estado, e.cep]);
        }
      }

      // Representante legal obrigatório
      if (!representante_legal) {
        await client.query('ROLLBACK');
        return res.status(400).json({ message: 'Kid precisa de representante legal' });
      }

      await client.query(`
        INSERT INTO representantes_legais (candidato_id, kid_id, nome_completo, cpf, data_nascimento, email, telefone)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
      `, [
        candidatoId,
        kidId,
        representante_legal.nome_completo,
        representante_legal.cpf,
        representante_legal.data_nascimento,
        representante_legal.email,
        representante_legal.telefone
      ]);
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
});

// =======================
// INICIAR SERVIDOR
// =======================
app.listen(8080, () => {
  console.log('API rodando em http://localhost:8080');
});
