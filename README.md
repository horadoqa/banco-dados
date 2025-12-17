# 📊 Diferenças entre Bancos de Dados SQL e NoSQL

Este documento explica as principais diferenças entre bancos de dados **SQL** e **NoSQL**, incluindo **conceitos**, **tipos**, **exemplos práticos** e **casos de uso reais**.

---

## 🧱 O que é um Banco de Dados SQL?

Bancos de dados **SQL (Structured Query Language)** são **relacionais**, armazenando dados em **tabelas** (linhas e colunas) com um **schema bem definido**.

### 🔹 Características principais

* Estrutura fixa (schema definido)
* Relacionamentos entre tabelas
* Uso da linguagem SQL
* Forte consistência de dados (ACID)

### 🔹 Exemplos de bancos SQL

* MySQL
* PostgreSQL
* Oracle Database
* SQL Server
* SQLite

### 🔹 Exemplo

```sql
CREATE TABLE usuarios (
  id INT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100)
);
```

### 🔹 Vantagens

* Alta integridade dos dados
* Ideal para dados estruturados
* Excelente para transações complexas

### 🔹 Desvantagens

* Menor flexibilidade de schema
* Escalabilidade horizontal mais complexa

---

## 🧩 O que é um Banco de Dados NoSQL?

Bancos de dados **NoSQL (Not Only SQL)** são **não relacionais** e projetados para lidar com **grandes volumes de dados**, **alta escalabilidade** e **dados não estruturados ou semi-estruturados**.

### 🔹 Características principais

* Schema flexível ou inexistente
* Escalabilidade horizontal
* Alta performance
* Consistência eventual (em muitos casos)

### 🔹 Exemplos de bancos NoSQL

* MongoDB
* Cassandra
* Redis
* DynamoDB
* CouchDB

---

## 🗂️ Tipos de Bancos de Dados NoSQL

### 1️⃣ Orientado a Documentos

Armazena dados em documentos (JSON/BSON).

**Exemplos:** MongoDB, CouchDB

```json
{
  "id": 1,
  "nome": "Ana",
  "email": "ana@email.com"
}
```

---

### 2️⃣ Chave–Valor

Armazena pares simples de chave e valor.

**Exemplos:** Redis, DynamoDB

```txt
usuario:1 → "Ana"
```

---

### 3️⃣ Orientado a Colunas

Dados armazenados por colunas, não por linhas.

**Exemplos:** Cassandra, HBase

---

### 4️⃣ Orientado a Grafos

Focado em relacionamentos entre dados.

**Exemplos:** Neo4j, Amazon Neptune

```txt
(Ana) -[AMIGO]-> (Carlos)
```

---

## ⚖️ Comparação SQL vs NoSQL

| Característica  | SQL                | NoSQL                     |
| --------------- | ------------------ | ------------------------- |
| Modelo de dados | Relacional         | Não relacional            |
| Schema          | Fixo               | Flexível                  |
| Escalabilidade  | Vertical           | Horizontal                |
| Consistência    | Forte (ACID)       | Eventual (BASE)           |
| Linguagem       | SQL                | Varia conforme o banco    |
| Melhor uso      | Dados estruturados | Big Data / Dados variados |

---

## 🚀 Casos de Uso Reais

### 🏦 Sistemas Financeiros e Bancários (SQL)

**Uso:** contas, pagamentos, transferências
**Motivo:** transações seguras e consistência total
**Bancos:** Oracle, PostgreSQL, MySQL

---

### 🛒 E-commerce (SQL + NoSQL)

**Uso:**

* SQL → pedidos, clientes, pagamentos
* NoSQL → carrinho, recomendações, cache

**Exemplos:** Amazon, Mercado Livre
**Bancos:** MySQL, PostgreSQL, DynamoDB, Redis

---

### 📱 Redes Sociais (NoSQL)

**Uso:** postagens, curtidas, comentários
**Motivo:** grande volume de dados e alta escalabilidade
**Bancos:** Cassandra, Redis, Neo4j

---

### 🎮 Jogos Online e Aplicações em Tempo Real (NoSQL)

**Uso:** sessões, rankings, dados temporários
**Motivo:** baixa latência
**Bancos:** Redis, DynamoDB

---

### 📊 Big Data e Analytics (NoSQL)

**Uso:** análise de comportamento, recomendações
**Exemplos:** Netflix, Spotify, YouTube
**Bancos:** Cassandra, MongoDB, HBase

---

### 🧠 Relacionamentos Complexos (Grafos)

**Uso:** redes de conexões, fraudes, recomendações
**Exemplo:** LinkedIn
**Banco:** Neo4j

---

### 🌐 CMS e Aplicações Web Modernas (NoSQL)

**Uso:** blogs, portais, APIs
**Motivo:** estrutura de dados variável
**Bancos:** MongoDB, CouchDB

---

## 🧠 Quando usar SQL ou NoSQL?

### ✅ Use SQL quando:

* Precisar de transações confiáveis
* A integridade dos dados for essencial
* O modelo de dados for bem definido

### ✅ Use NoSQL quando:

* Trabalhar com grande volume de dados
* Precisar de alta escalabilidade
* Os dados mudarem com frequência

---

## 📌 Conclusão

SQL e NoSQL **não competem**, eles **se complementam**.
Na prática, sistemas modernos utilizam **arquiteturas híbridas** para obter o melhor dos dois mundos.

---

📚 **Autor:** Ricardo Fahham
📅 **Ano:** 2025
📁 **Projeto:** SQL vs NoSQL
