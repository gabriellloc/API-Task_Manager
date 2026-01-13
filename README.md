# API - Task Manager

API REST para gerenciamento de tarefas, com autenticação segura, validação de dados e persistência em banco de dados PostgreSQL.

## 📌 Visão Geral

A API Task Manager foi desenvolvida em Node.js, com typescript com foco em boas práticas de arquitetura, segurança e escalabilidade. Ela permite criar, listar, atualizar e remover tarefas, além de gerenciar usuários com autenticação baseada em JWT.

O projeto utiliza Docker Compose para facilitar o setup do ambiente de desenvolvimento, garantindo consistência.

## 🛠️ Tecnologias Utilizadas

- Node.js
- TypeScript
- Express 5
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose
- JWT (jsonwebtoken)
- Bcrypt
- Zod (validação de dados)

## Instalando o Projeto
### Clonando o Repositório
```bash
# Clone o repositório
git clone https://github.com/gabriellloc/api-task_manager.git

# Acesse o diretório
cd api-task-manager

# Instale as dependências
npm install
```

## Executando o Docker Compose

pré-requisitos: 
- Docker
- Docker Compose

### Subindo o ambiente
```bash
docker-compose up -d
```

## ▶️ Executando o Projeto
### Rodando localmente
```bash
npm run dev
```
A API estará disponível em `http://localhost:3333`.


## 🔐 Variáveis de Ambiente

Crie um arquivo <code>.env</code> na raiz do projeto:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET=suaChave
```

## 📜 Licença

Este projeto está licenciado sob a [licença MIT](LICENSE).


## 👨‍💻 Autor

Gabriel Oliveira Cardoso<br>
💻 Desenvolvedor Backend