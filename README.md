Cenários:
*Frontend

1. Login com e-mail ou senha inválidos exibe o alerta e permanece na tela de login.
2. Cadastro de um usuário novo envia os dados corretos e abre a loja já autenticada.
3. Usuário autenticado pesquisa um produto e adiciona o item à lista de compras.

*API

1. Cadastro de usuário, consulta por id e recusa de e-mail duplicado.
2. Login válido devolve o token Bearer; credenciais inválidas retornam 401.
3. Administrador cadastra, consulta e remove um produto. A rota recusa chamada sem token e usuário comum.

obs.: Não há usuário fixo para eos cenários que requerem login/cadastro. A cada execução a factory gera um cadastro único no formato `cypress.<timestamp>@teste.com`, com senha `teste123` e nome via Faker. O `afterEach` remove o registro criado.

Técnicas:

Utilizei nos cenários o estilo step-by-step para estruturar a escrita dos testes, quantidade de cenários é baixo então julgo ser melhor
Page Object Model (`LoginPage`, `CadastroPage`, `HomePage`, `ListaComprasPage`)
Limpeza de massa `afterEach` remove usuários/produtos criados para não poluir

Como executar:
npm install
npm test
npm run cy:open
