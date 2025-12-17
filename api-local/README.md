# BackEnd

1️⃣ Inicializar o projeto

```bash
npm init -y

Wrote to /home/rfahham/projetos/banco-dados/BE/package.json:

{
  "name": "be",
  "version": "1.0.0",
  "description": "1️⃣ Inicializar o projeto",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

2️⃣ Instalar o Express

```bash
npm install express pg

added 79 packages, and audited 80 packages in 4s

22 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

3️⃣ Executar a API

```bash
node index.js
API rodando em http://localhost:8080
```

Testar com curl

```bash
curl -X POST http://localhost:8080/api/candidatos \
  -H "Content-Type: application/json" \
  -d '{
    "nome_completo": "Manoel da Couves",
    "cpf": "12345678910",
    "data_nascimento": "2000-01-15",
    "estado_civil": "solteiro",
    "email": ""Manoel.Couves@teste.com",
    "telefone": "+5561996583598"
  }'
```

```bash