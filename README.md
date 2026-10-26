Cenários:
* Frontend

1. Login com e-mail ou senha inválidos exibe o alerta e permanece na tela de login.
2. Cadastro de um usuário novo envia os dados corretos e abre a loja já autenticada.
3. Usuário autenticado pesquisa um produto e adiciona o item à lista de compras.

* API

1. Cadastro de usuário, consulta por id e recusa de e-mail duplicado.
2. Login válido devolve o token Bearer; credenciais inválidas retornam 401.
3. Administrador cadastra, consulta e remove um produto. A rota recusa chamada sem token e usuário comum.

Como executar:

* npm install
* npm test
* npm run cy:open
