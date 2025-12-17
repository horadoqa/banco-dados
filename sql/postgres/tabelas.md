# Criando as Tabelas através de querys


-- 1️⃣ Habilitar extensão para UUID

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2️⃣ Criar tabela de candidatos
CREATE TABLE IF NOT EXISTS public.candidatos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome_completo TEXT NOT NULL,
  cpf CHAR(11) NOT NULL UNIQUE,
  data_nascimento DATE NOT NULL,
  estado_civil TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT,
  criado_em TIMESTAMP DEFAULT now(),
  atualizado_em TIMESTAMP DEFAULT now()
);
```

-- 3️⃣ Criar tabela de endereços

```sql
CREATE TABLE IF NOT EXISTS public.enderecos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidato_id UUID NOT NULL REFERENCES public.candidatos(id) ON DELETE CASCADE,
  logradouro TEXT NOT NULL,
  numero TEXT NOT NULL,
  complemento TEXT,
  bairro TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado CHAR(2) NOT NULL,
  cep CHAR(8) NOT NULL,
  criado_em TIMESTAMP DEFAULT now()
);

```

-- 4️⃣ Inserir candidato

```sql
INSERT INTO public.candidatos (nome_completo, cpf, data_nascimento, estado_civil, email, telefone)
SELECT
  'Raimundo Correa',
  '12345678910',
  '1956-01-24',
  'casado',
  'email-raimundo@teste.com',
  '+55714567897'
WHERE NOT EXISTS (
  SELECT 1 FROM public.candidatos WHERE cpf = '12345678910'
);
```

-- 5️⃣ Inserir endereço para o candidato (somente se ainda não existir)

```sql
INSERT INTO public.enderecos (
  candidato_id, logradouro, numero, bairro, cidade, estado, cep
)
SELECT
  id,
  'Rua Pirameira',
  '574',
  'Cafundó',
  'Judas',
  'DF',
  '61345789'
FROM public.candidatos
WHERE cpf = '12345678910'
AND NOT EXISTS (
  SELECT 1 FROM public.enderecos e
  JOIN public.candidatos c ON e.candidato_id = c.id
  WHERE c.cpf = '12345678910'
);
```

-- 6️⃣ Consultar todos os endereços

```sql
SELECT * FROM public.enderecos;

SELECT *
FROM public.enderecos
ORDER BY candidato_id;

SELECT *
FROM public.enderecos
WHERE candidato_id = 'bc51affa-d0d0-4696-85a7-7ba7911f1dd4';

SELECT *
FROM public.candidatos
WHERE estado_civil = 'casado'
```

-- 7️⃣ Consultar candidatos com seus endereços

```sql
SELECT
  c.nome_completo,
  c.cpf,
  e.logradouro,
  e.numero,
  e.bairro,
  e.cidade,
  e.estado,
  e.cep
FROM public.candidatos c
LEFT JOIN public.enderecos e ON e.candidato_id = c.id;
```