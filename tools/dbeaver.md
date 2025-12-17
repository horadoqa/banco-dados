# 📌 O que é o DBeaver?

O **DBeaver** é uma ferramenta **gratuita e open source** para gerenciamento de bancos de dados.
Ele suporta diversos bancos SQL e NoSQL, como **MySQL, PostgreSQL, Oracle, SQL Server, SQLite, MongoDB**, entre outros.

## 🦫 Documentação de Instalação – DBeaver

---

## 📋 Pré-requisitos

Antes de instalar o DBeaver, verifique:

* Sistema operacional compatível:

  * Windows
  * Linux
  * macOS
* Permissões de administrador para instalação
* Conexão com a internet (para download)

> ⚠️ **Observação:**
> As versões mais recentes do DBeaver **já incluem o Java**, não sendo necessária a instalação manual do JDK.

---

## 🌐 Download do DBeaver

1. Acesse o site oficial:
   👉 [https://dbeaver.io/](https://dbeaver.io/)
2. Clique em **Download**
3. Escolha a edição:

   * **DBeaver Community** (gratuito – recomendado)
   * **DBeaver Enterprise** (pago – uso corporativo)

---

## 💻 Instalação por Sistema Operacional

---

## 🪟 Windows

### Passo a passo

1. Baixe o arquivo:

   ```
   dbeaver-ce-x.x.x-x64-setup.exe
   ```
2. Execute o instalador
3. Aceite os termos de licença
4. Escolha o diretório de instalação
5. Selecione se deseja criar atalhos
6. Clique em **Install**
7. Finalize em **Finish**

### Verificação

* Abra o **DBeaver**
* Confirme se a interface carrega corretamente

---

## 🍎 macOS

### Passo a passo

1. Baixe o arquivo:

   ```
   dbeaver-ce-x.x.x-macos.dmg
   ```
2. Abra o arquivo `.dmg`
3. Arraste o **DBeaver** para a pasta **Applications**
4. Abra o aplicativo pela pasta **Aplicativos**

> ⚠️ Caso o macOS bloqueie a execução:

* Vá em **Preferências do Sistema → Segurança e Privacidade**
* Permita a execução do DBeaver

---

## 🐧 Linux

### Opção 1 – AppImage (Recomendado)

1. Baixe o arquivo:

   ```
   dbeaver-ce-x.x.x.AppImage
   ```
2. Torne o arquivo executável:

   ```bash
   chmod +x dbeaver-ce-x.x.x.AppImage
   ```
3. Execute:

   ```bash
   ./dbeaver-ce-x.x.x.AppImage
   ```

---

### Opção 2 – Debian / Ubuntu (.deb)

```bash
sudo dpkg -i dbeaver-ce_x.x.x_amd64.deb
sudo apt --fix-broken install
```

---

### Opção 3 – Fedora / Red Hat (.rpm)

```bash
sudo rpm -ivh dbeaver-ce-x.x.x.x86_64.rpm
```

---

## 🔌 Primeira Execução

Ao abrir o DBeaver pela primeira vez:

1. Escolha o **workspace** (pasta onde ficarão as configurações)
2. Aguarde o carregamento inicial
3. A tela principal será exibida

---

## 🔗 Criando a Primeira Conexão com o Banco

1. Clique em **Database → New Database Connection**
2. Selecione o banco desejado (ex: MySQL, PostgreSQL)
3. Clique em **Next**
4. Informe:

   * Host
   * Porta
   * Usuário
   * Senha
5. Clique em **Test Connection**
6. Se solicitado, permita o download do driver
7. Clique em **Finish**

---

## 🧪 Testando a Instalação

Execute uma consulta simples após conectar:

```sql
SELECT 1;
```

Se retornar resultado, a instalação e conexão estão corretas ✅

---

## ❗ Problemas Comuns

### 🔹 Java não encontrado

* Atualize o DBeaver para a versão mais recente
* Ou configure a variável `JAVA_HOME`

### 🔹 Driver não encontrado

* Permita o download automático do driver
* Verifique conexão com a internet

### 🔹 Erro de permissão no Linux

```bash
chmod +x dbeaver*
```

---

## 📦 Desinstalação

### Windows

* Painel de Controle → Programas → Desinstalar

### macOS

* Apague o DBeaver da pasta **Applications**

### Linux

```bash
sudo apt remove dbeaver-ce
```

---

## 📚 Referências

* Site oficial: [https://dbeaver.io/](https://dbeaver.io/)
* Documentação: [https://dbeaver.io/docs/](https://dbeaver.io/docs/)

---

📅 **Atualizado em:** 2025
📁 **Ferramenta:** DBeaver
📌 **Versão:** Community Edition