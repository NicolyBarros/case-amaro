# Projeto Amaro
- Projeto da rodada de cases proposto pela Labenu, como finalização do curso Full Stack Web.
- [Case Amaro](https://github.com/amaroteam/back-end-challenge)

## API - Postman
- [Postman](https://documenter.getpostman.com/view/20786077/VUr1HDH5)

## Surge - Heroku
- [Heroku](https://projeto-amaro.herokuapp.com/products)

## Instalação das dependências
- npm install : Instala as dependências utilizadas no desenvolvimento do projeto.
- Para conferir as dependências consultar arquivo 'package.json'.

## Criando e preenchenco arquivo .env
- Criar o arquivo .env e configurar com as informações de seu banco de dados.

PORT: 3003
DB_HOST = host
DB_USER = usuario
DB_PASSWORD = senha
DB_NAME = nome-do-banco-de-dados

JWT_KEY = senha
JWT_EXPIRES_IN = duração do token

BCRYPT_SALT_ROUNDS = 12 (padrão é 10/12)

## Popular tabelas
- npm run migrations: Cria e popula as tabelas no banco de dados com base no arquivo data.ts.

## Executar o projeto
- npm run dev: Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor localhost toda a vez que o projeto for alterado e salvo.

## Executar os testes
-  npm run test : Executa todos os testes unitários criados para testar a pasta Business do projeto.

## Funcionalidades básicas

### Endpoint 1) Signup
Endpoint de signup para cadastrar novos usuários. Ele deve receber o name, email e password do novo usuário. Em sucesso, retorna uma mensagem e também um token de acesso que guarda o id e a role da pessoa.

### Endpoint 2) Login
Endpoint chamado de login para logar de usuários já cadastrados. Ele deve receber o email e o password da pessoa, e em caso de sucesso retorna a mensagem e o token de acesso.

### Endpoint 3) Get products
Endpoint público que retorna todos os produtos do banco de dados, também é possível pesquisar por produto pela id ou nome.

### Endpoint 4) Get search products by tag
Endpoint público que retorna todos os produtos de determinada tag.

### Endpoint 5) Post product
Endpoint privado para cadastrar novo produto no banco de dados. 

### Endpoint 6) Add tag to product
Endpoint privado que adiciona tag à determinado produto cadastrado no banco de dados.

## Autor
- [GitHub](https://github.com/NicolyBarros)
- [Linkedin](https://www.linkedin.com/in/nicoly-barros-henrique-vitorio/)

## Stack - Backend
 - node.js
 - express
 - API REST
 - SQL

