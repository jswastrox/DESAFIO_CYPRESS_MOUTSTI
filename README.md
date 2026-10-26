# Desafio Cypress — ServeRest

Automação do desafio de analista de qualidade para a aplicação [ServeRest](https://github.com/ServeRest/ServeRest).

- Frontend: https://front.serverest.dev/
- API: https://serverest.dev/

São 3 cenários de interface e 3 cenários de API, no mesmo repositório.

## Cenários

### Frontend

1. Login com e-mail ou senha inválidos exibe o alerta e permanece na tela de login.
2. Cadastro de um usuário novo envia os dados corretos e abre a loja já autenticada.

   Não há usuário fixo para esse (nem para os demais) cenários. A cada execução a factory gera um cadastro único no formato `cypress.<timestamp>@teste.com`, com senha `teste123` e nome via Faker. O `afterEach` remove o registro criado no ServeRest.

3. Usuário autenticado pesquisa um produto e adiciona o item à lista de compras.

### API

1. Cadastro de usuário, consulta por id e recusa de e-mail duplicado.
2. Login válido devolve o token Bearer; credenciais inválidas retornam 401.
3. Administrador cadastra, consulta e remove um produto. A rota recusa chamada sem token e usuário comum.

## Técnicas e padrões

A suíte não usa Cucumber/BDD com arquivos `.feature`. Os cenários seguem o estilo **step-by-step** do Cypress (`describe` / `it`), com ações nomeadas nos page objects e nos services. Assim o fluxo continua legível (“visitar → logar → pesquisar → adicionar”) sem o custo de Gherkin para um conjunto pequeno de testes.

| Técnica | Usa? | Por quê |
| --- | --- | --- |
| **Page Object Model** | Sim | Centraliza seletores e ações da UI (`LoginPage`, `CadastroPage`, `HomePage`, `ListaComprasPage`). O spec descreve o negócio; a página sabe *como* clicar e assertar. |
| **Step-by-step (Mocha)** | Sim | Cada `it` encadeia passos claros. Evita BDD formal quando o volume de cenários ainda é baixo e a equipe lê JavaScript com facilidade. |
| **BDD / Cucumber** | Não | Não há `.feature` nem step definitions. O ganho de linguagem natural não compensaria a camada extra neste desafio. |
| **API Services** | Sim | Camada espelho do POM para HTTP (`auth`, `usuarios`, `produtos` + `client`). Os specs de API não montam `cy.request` soltos. |
| **Factories + Faker** | Sim | Dados dinâmicos e únicos a cada run. Reduz colisão no ambiente público compartilhado do ServeRest. |
| **Fixtures (`cy.fixture`)** | Não | JSON estático fixaria e-mails/produtos e quebraria em reexecução. A factory resolve isso na hora. |
| **Custom Commands** | Sim | `criarUsuario`, `prepararProduto` e `limparMassa` encapsulam setup/teardown reutilizáveis. |
| **Constants** | Sim | Mensagens esperadas da API/UI ficam em um único lugar, evitando strings mágicas espalhadas. |
| **Network intercept** | Sim | O cadastro e a busca de produto validam request/response reais com `cy.intercept` / `cy.wait`. |
| **Setup híbrido (API + UI)** | Sim | O teste da lista de compras cria produto e usuário pela API e só então exercita a interface. Fica mais estável e rápido. |
| **Limpeza de massa** | Sim | `afterEach` remove usuários/produtos criados para não poluir o ServeRest. |
| **Paginação** | Não | Os fluxos escolhidos não dependem de listas paginadas; não há page object ou helper de pagination. |

## Como executar

Requer Node.js 20 ou superior.

```bash
npm install
npm test
npm run cy:open
```

Suítes separadas:

```bash
npm run test:frontend
npm run test:api
```

Os testes usam o ambiente público do ServeRest. Cada cenário cria a própria massa (e-mail e produto únicos) e remove os registros ao final.

## Organização

```text
cypress/
  e2e/
    frontend/     # cenários da interface
    api/          # cenários da API
  support/
    pages/        # Page Objects
    services/     # cliente e endpoints da API
    factories/    # massa dinâmica (Faker)
    constants/    # mensagens reutilizadas
    commands.js   # setup e limpeza
```

O fluxo de interface que depende de produto cria o item pela API antes de abrir o browser. Isso evita acoplar o teste ao catálogo compartilhado.
