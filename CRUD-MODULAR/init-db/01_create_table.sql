-- Habilitar UUID 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Candidatos
CREATE TABLE IF NOT EXISTS candidatos (
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

-- Kids (deve vir antes de enderecos se enderecos referencia kid_id)
CREATE TABLE IF NOT EXISTS kids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidato_id UUID NOT NULL REFERENCES candidatos(id) ON DELETE CASCADE,
  nome_completo TEXT NOT NULL,
  cpf CHAR(11) NOT NULL UNIQUE,
  data_nascimento DATE NOT NULL,
  email TEXT,
  telefone TEXT,
  criado_em TIMESTAMP DEFAULT now()
);

-- Endereços
CREATE TABLE IF NOT EXISTS enderecos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidato_id UUID REFERENCES candidatos(id) ON DELETE CASCADE,
  kid_id UUID REFERENCES kids(id) ON DELETE CASCADE,
  tipo VARCHAR(20) NOT NULL,
  logradouro TEXT NOT NULL,
  numero TEXT NOT NULL,
  complemento TEXT,
  bairro TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado CHAR(2) NOT NULL,
  cep CHAR(8) NOT NULL,
  criado_em TIMESTAMP DEFAULT now()
);

-- Conjuges
CREATE TABLE IF NOT EXISTS conjuges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidato_id UUID REFERENCES candidatos(id) ON DELETE CASCADE,
  nome_completo TEXT NOT NULL,
  cpf CHAR(11) NOT NULL UNIQUE,
  data_nascimento DATE NOT NULL,
  email TEXT,
  telefone TEXT,
  criado_em TIMESTAMP DEFAULT now()
);

-- Representantes legais
CREATE TABLE IF NOT EXISTS representantes_legais (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidato_id UUID NOT NULL REFERENCES candidatos(id) ON DELETE CASCADE,
  kid_id UUID REFERENCES kids(id) ON DELETE CASCADE,
  nome_completo TEXT NOT NULL,
  cpf CHAR(11) NOT NULL,
  data_nascimento DATE NOT NULL,
  email TEXT,
  telefone TEXT,
  criado_em TIMESTAMP DEFAULT now()
);
