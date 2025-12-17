# 📁 Estrutura final do projeto

```txt
api-candidatos/
├── README.md
├── docker-compose.yml
├── init-db/
│   └── 01_create_table.sql
└── backend/
    ├── Dockerfile
    ├── index.js
    └── package.json
```

---

# 1️⃣ `init-db/01_create_table.sql`

```sql
CREATE TABLE IF NOT EXISTS public.candidatos (
    id SERIAL PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    estado_civil VARCHAR(50),
    email VARCHAR(255),
    telefone VARCHAR(20)
);
```

---

# 2️⃣ `docker-compose.yml`

```yaml
version: "3.9"

services:
  postgres:
    image: postgres:16
    container_name: banco_horadoqa_postgres
    restart: always
    ports:
      - "5433:5432"
    environment:
      POSTGRES_DB: banco_horadoqa
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin123
      TZ: America/Sao_Paulo
    volumes:
      - banco_horadoqa_postgres_data:/var/lib/postgresql/data
      - ./init-db:/docker-entrypoint-initdb.d

  backend:
    build: ./backend
    container_name: api_candidatos
    restart: always
    ports:
      - "8080:8080"
    environment:
      DB_HOST: postgres
      DB_USER: admin
      DB_PASSWORD: admin123
      DB_NAME: banco_horadoqa
      DB_PORT: 5432
    depends_on:
      - postgres

volumes:
  banco_horadoqa_postgres_data:
```

---

# 3️⃣ `backend/package.json`

```json
{
  "name": "api-candidatos",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.0"
  }
}
```

---

# 4️⃣ `backend/Dockerfile`

```dockerfile
FROM node:20

WORKDIR /app

COPY package.json ./
RUN npm install

COPY index.js ./

EXPOSE 8080

CMD ["npm", "start"]
```

---

# 5️⃣ `backend/index.js` (CRUD completo)

```js
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const db = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin123',
  database: process.env.DB_NAME || 'banco_horadoqa',
  port: process.env.DB_PORT || 5432
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
```

---

# 6️⃣ `README.md`

````markdown
# API de Candidatos

API completa para gerenciar candidatos usando Node.js + Express + PostgreSQL via Docker Compose.

## 🚀 Pré-requisitos

- Docker e Docker Compose instalados
- Nenhuma instalação local do Node ou PostgreSQL necessária

## 🐳 Como subir a aplicação

1. Clone o projeto
2. Entre na pasta do projeto
3. Execute:

```bash
docker-compose up -d
````

* PostgreSQL disponível em: `localhost:5433`
* API disponível em: `http://localhost:8080`

## 🔗 Endpoints

### 1️⃣ Cadastrar candidato

```bash
curl -X POST http://localhost:8080/api/candidatos \
  -H "Content-Type: application/json" \
  -d '{
    "nome_completo": "Manoel da Couves",
    "cpf": "12345678910",
    "data_nascimento": "2000-01-15",
    "estado_civil": "solteiro",
    "email": "Manoel.Couves@teste.com",
    "telefone": "+5561996583598"
  }'
```

### 2️⃣ Listar todos os candidatos

```bash
curl http://localhost:8080/api/candidatos
```

### 3️⃣ Buscar candidato por CPF

```bash
curl http://localhost:8080/api/candidatos/12345678910
```

### 4️⃣ Atualizar candidato por CPF

```bash
curl -X PUT http://localhost:8080/api/candidatos/12345678910 \
  -H "Content-Type: application/json" \
  -d '{
    "nome_completo": "Manoel Couves Silva",
    "data_nascimento": "2000-01-15",
    "estado_civil": "casado",
    "email": "manou@teste.com",
    "telefone": "+5561996583598"
  }'
```

### 5️⃣ Excluir candidato por CPF

```bash
curl -X DELETE http://localhost:8080/api/candidatos/12345678910
```

## ⚡ Observações

* Se tentar cadastrar um CPF já existente, retorna `409 CPF já cadastrado na base`.
* Todos os dados são persistidos no volume do Docker, mesmo após reiniciar containers.

```

---


