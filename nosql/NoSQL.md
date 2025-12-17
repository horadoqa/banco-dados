# Como criar um banco de dados não relacional (NoSQL)

Vamos usar **MongoDB**, porque:

* É NoSQL (documentos)
* O **DBeaver suporta nativamente**
* É muito usado com automações, APIs e n8n

---

## 🧱 Visão geral do que vamos fazer

1. Subir um **MongoDB local** (com Docker)
2. Criar um banco e uma coleção
3. Conectar no **DBeaver**
4. Inserir e consultar dados para teste

---

## 1️⃣ Subindo o MongoDB com Docker (recomendado)

Se você já tem Docker instalado, é o caminho mais rápido.

### Criar `docker-compose.yml`

```yaml
version: "3.8"

services:
  mongodb:
    image: mongo:7
    container_name: mongodb_test
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin123
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

Subir o banco:

```bash
docker-compose up -d
```

✔ MongoDB rodando na porta **http://localhost:27017**

---

## 2️⃣ Criando banco e coleção (opcional via terminal)

Entre no container:

```bash
docker exec -it mongodb_horadoqa mongosh -u admin -p admin123
```

Crie um banco:

```js
use horadoqa_nosql
```

Crie uma coleção:

```js
db.usuarios.insertOne({
  _id: UUID(), // se estiver usando MongoDB 7+ com UUID habilitado
  tipo_cadastro: "pessoa_fisica",

  dados_pessoais: {
    nome_completo: "João da Silva",
    cpf: "123.456.789-09",
    data_nascimento: ISODate("1994-03-15"),
    estado_civil: "solteiro",
    nacionalidade: "brasileiro"
  },

  contato: {
    email: "joao@email.com",
    telefone: "+55 11 91234-5678"
  },

  endereco: {
    logradouro: "Rua das Flores",
    numero: "123",
    complemento: "Apto 45",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01001-000",
    pais: "Brasil"
  },

  documentos: {
    rg: "12.345.678-9",
    orgao_emissor: "SSP-SP"
  },

  status: {
    conta_aprovada: false,
    etapa_onboarding: "cadastro_inicial"
  },

  criado_em: new Date(),
  atualizado_em: new Date()
})

```

✔ Banco criado automaticamente ao inserir dados

---

## 3️⃣ Conectando o MongoDB no DBeaver

### Passo a passo no DBeaver:

1. Abra o **DBeaver**
2. Clique em **New Database Connection**
3. Escolha **MongoDB**
4. Preencha:

**Connection**

* Host: `localhost`
* Port: `27017`
* Database: `teste_nosql`

**Authentication**

* Auth type: `Username / Password`
* Username: `admin`
* Password: `admin123`
* Auth database: `admin`

Clique em **Test Connection**
✔ Se pedir driver, aceite o download

---

## 4️⃣ Testando consultas no DBeaver

### Exemplo: buscar todos os usuários

```js
db.usuarios.find({})
```

### Buscar por filtro

```js
db.usuarios.find({ idade: { $gt: 25 } })
```

### Inserir novo documento

```js
db.usuarios.insertOne({
  nome: "Maria",
  email: "maria@email.com",
  ativo: true
})
```

---

## 5️⃣ Estrutura típica NoSQL (MongoDB)

```json
{
  "_id": "ObjectId",
  "nome": "string",
  "email": "string",
  "idade": number,
  "ativo": boolean,
  "criado_em": "date"
}
```

✔ Sem schema fixo
✔ Cada documento pode ter campos diferentes

---

## 6️⃣ Alternativas NoSQL compatíveis com DBeaver

Se quiser testar outros:

| Banco     | Tipo        | Suporte DBeaver |
| --------- | ----------- | --------------- |
| MongoDB   | Documentos  | ✅               |
| Cassandra | Wide-column | ✅               |
| Redis     | Key-Value   | ⚠️ Limitado     |
| Couchbase | Documentos  | ⚠️ Parcial      |

👉 **MongoDB é o melhor para começar**

---

## 7️⃣ Próximo passo (se quiser)

Posso te ajudar a:

* Integrar esse MongoDB com **n8n**
* Criar **CRUD via API**
* Modelar dados NoSQL corretamente
* Criar **dados fake para testes**
* Usar MongoDB em produção

👉 **Esse banco é só para teste ou vai fazer parte de um projeto maior?**
