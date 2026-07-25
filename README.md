# 💰 DevBills API

Backend de um sistema de **controle financeiro**, desenvolvido com foco em performance, escalabilidade e boas práticas de arquitetura utilizando **Node.js**, **Fastify** e **TypeScript**.

O projeto permite o gerenciamento de transações financeiras, oferecendo uma API REST para cadastro, consulta, resumo e exclusão de receitas e despesas.

---

## 🚀 Tecnologias

- Node.js
- Fastify
- TypeScript
- Prisma ORM
- MongoDB
- Zod
- Day.js
- Biome

---

## 📂 Estrutura do Projeto

```
src
├── config
├── controllers
│   ├── transaction
│   └── category
├── routes
├── schemas
├── services
├── types
├── app.ts
└── server.ts

prisma
└── schema.prisma
```

---

# 📌 Funcionalidades

## Transações

### Criar Transação

```http
POST /api/transactions
```

Exemplo:

```json
{
  "description": "Salário",
  "amount": 5000,
  "date": "2026-07-25",
  "type": "INCOME",
  "categoryId": "686bxxxxxxxxxxxx"
}
```

---

### Listar Transações

```http
GET /api/transactions
```

Filtros disponíveis:

- descrição
- tipo
- categoria
- período
- paginação

---

### Resumo Financeiro

```http
GET /api/transactions/summary
```

Retorna:

```json
{
    "balance": 3200,
    "income": 5000,
    "expense": 1800
}
```

---

### Excluir Transação

```http
DELETE /api/transactions/:id
```

---

# 🛠️ Validação

Toda a entrada da API é validada utilizando **Zod**, garantindo:

- Campos obrigatórios
- Tipagem correta
- IDs válidos
- Datas válidas
- Valores positivos

---

# 🗄️ Banco de Dados

O projeto utiliza:

- MongoDB
- Prisma ORM

Modelos principais:

- Transactions
- Categories

---

# 📅 Manipulação de Datas

As operações envolvendo datas são realizadas utilizando:

- Day.js

Permitindo:

- filtros por período
- resumo mensal
- comparação de datas
- formatação

---

# ⚡ Performance

A API foi construída utilizando **Fastify**, proporcionando:

- Alta performance
- Baixo consumo de memória
- Excelente throughput
- Suporte nativo ao TypeScript

---

# 📦 Instalação

Clone o projeto

```bash
git clone https://github.com/Edvaldo-jb-Junior/devbills-backend.git
```

Entre na pasta

```bash
cd devbills-backend
```

Instale as dependências

```bash
npm install
```

Configure o arquivo

```env
.env
```

```env
DATABASE_URL="mongodb+srv://..."
PORT=3001
```

Execute as migrations (MongoDB)

```bash
npx prisma db push
```

Gere o Prisma Client

```bash
npx prisma generate
```

Inicie o projeto

```bash
npm run dev
```

---

# 📚 Stack

| Tecnologia | Função |
|------------|--------|
| Node.js | Runtime JavaScript |
| Fastify | Framework HTTP |
| TypeScript | Tipagem estática |
| MongoDB | Banco NoSQL |
| Prisma | ORM |
| Zod | Validação |
| Day.js | Manipulação de datas |
| Biome | Linter e Formatter |

---

# 🏗️ Arquitetura

```
Cliente

      │

 REST API

      │

 Fastify

      │

 Controllers

      │

 Services

      │

 Prisma ORM

      │

 MongoDB
```

---

# 🎯 Próximas funcionalidades

- Autenticação JWT
- Cadastro de usuários
- Dashboard financeiro
- Upload de avatar
- Categorias personalizadas
- Atualização (PUT/PATCH)
- Paginação
- Relatórios
- Testes automatizados
- Docker
- Deploy

---

# 📸 Preview

<p align="center">
  <img src="./docs/devbills-banner.png" alt="DevBills Backend" width="100%">
</p>

---

# 👨‍💻 Autor

**Edvaldo José Barbosa Júnior**

Desenvolvedor Backend | Node.js | TypeScript | Fastify

LinkedIn:
> https://linkedin.com/in/edvaldo-programadorfrontend

GitHub:
> https://github.com/Edvaldo-jb-Junior

---

## ⭐ Se este projeto foi útil, deixe uma estrela no repositório!
