# Desafio Cypress — ServeRest

Automação do desafio de analista de qualidade para a aplicação [ServeRest](https://github.com/ServeRest/ServeRest).

- Frontend: https://front.serverest.dev/
- API: https://serverest.dev/

São 3 cenários de interface e 3 cenários de API, no mesmo repositório.

## Cenários

### Frontend

1. Login com e-mail ou senha inválidos exibe o alerta e permanece na tela de login.
2. Cadastro de um usuário novo envia os dados corretos e abre a loja já autenticada.
3. Usuário autenticado pesquisa um produto e adiciona o item à lista de compras.

### API

1. Cadastro de usuário, consulta por id e recusa de e-mail duplicado.
2. Login válido devolve o token Bearer; credenciais inválidas retornam 401.
3. Administrador cadastra, consulta e remove um produto. A rota recusa chamada sem token e usuário comum.

## Como executar

Requer Node.js 20 ou superior.

```bash
npm install
npm test
```

Suítes separadas:

```bash
npm run test:frontend
npm run test:api
npm run cy:open
```

Os testes usam o ambiente público do ServeRest. Cada cenário cria a própria massa (e-mail e produto únicos) e remove os registros ao final.

## Organização

- `cypress/e2e/frontend` e `cypress/e2e/api` — cenários
- `cypress/support/pages` — page objects da interface
- `cypress/support/services` — chamadas da API
- `cypress/support/factories` — dados dinâmicos com Faker
- `cypress/support/commands.js` — preparação e limpeza da massa

O fluxo de interface que depende de produto cria o item pela API antes de abrir o browser. Isso evita acoplar o teste ao catálogo compartilhado.
