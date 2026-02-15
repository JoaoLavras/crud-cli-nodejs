# User Manager CLI v1.0.0

Uma aplicação **CLI (Command Line Interface)** simples para gerenciamento de usuários via terminal.

<img width="346" height="199" alt="image" src="https://github.com/user-attachments/assets/69ab67ff-66c0-494d-9e65-566d6f347c03" />


O sistema permite:

- ✅ Criar usuários  
- ✅ Listar usuários  
- ✅ Atualizar usuários  
- ✅ Deletar usuários  

Os dados são persistidos em arquivo JSON local.

---

## 📦 Tecnologias utilizadas

- Node.js  
- JavaScript  
- File System (fs)  
- Inquirer  
- Chalk
---

## ⚙️ Instalação

Clone o repositório:

```bash
git clone https://github.com/JoaoLavras/crud-cli-nodejs.git
```

Entre na pasta do projeto:

```bash
cd crud-cli-nodejs
```

Instale as dependências:

```bash
npm install
```

---

## ▶️ Como executar

```bash
npm start
```

ou

```bash
node index.js
```

---

## 🧠 Estrutura do projeto

```
📁 src
 ├── controllers
 ├── services
 ├── repositories
 ├── database
📄 index.js
📄 package.json
```

Arquitetura baseada em separação por camadas:

- **Controller** → fluxo da aplicação  
- **Service** → regras de negócio  
- **Repository** → acesso ao JSON  
- **Database** → persistência de dados  

---

## 🧪 Funcionalidades

### ➕ Criar usuário
Solicita CPF e dados e salva no JSON.

### 📋 Listar usuários
Exibe todos os usuários cadastrados.

### ✏️ Atualizar usuário
Busca pelo CPF e altera os dados.

### ❌ Deletar usuário
Remove o usuário pelo CPF.

---

## 📌 Observações

- O sistema valida se a lista está vazia antes de operações.
- Estrutura preparada para futura evolução para API (Express).
- Projeto focado em boas práticas e organização de código.

---

# 👨‍💻 Autor

Desenvolvido por **João Lavras**  
Estudante de Ciência da Computação | Desenvolvedor Web  

### 🎯 Focado em:

- Desenvolvimento Web  
- JavaScript  
- Boas práticas de arquitetura  
- Evolução para backend e microserviços  
- Segurança e escalabilidade  

---

💎 Gostou do que viu? Aqui tem mais →  
👉 [**Github-JoaoLavras**](https://github.com/JoaoLavras)
