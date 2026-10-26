import { gerarUsuario } from './factories/usuario'
import { gerarProduto } from './factories/produto'
import { autenticar } from './services/auth'
import { cadastrarProduto, excluirProduto } from './services/produtos'
import { cadastrarUsuario, excluirUsuario } from './services/usuarios'

Cypress.Commands.add('criarUsuario', (opcoes) => {
  const usuario = gerarUsuario(opcoes)

  return cadastrarUsuario(usuario).then((response) => {
    expect(response.status, response.body?.message).to.eq(201)

    return {
      ...usuario,
      _id: response.body._id,
    }
  })
})

Cypress.Commands.add('prepararProduto', () => {
  const produto = gerarProduto()

  return cy.criarUsuario({ administrador: true }).then((admin) => {
    return autenticar(admin.email, admin.password).then((login) => {
      expect(login.status, login.body?.message).to.eq(200)

      return cadastrarProduto(produto, login.body.authorization).then((criado) => {
        expect(criado.status, criado.body?.message).to.eq(201)

        return {
          admin,
          token: login.body.authorization,
          produto: {
            ...produto,
            _id: criado.body._id,
          },
        }
      })
    })
  })
})

Cypress.Commands.add('limparMassa', ({ usuarios = [], produtoId, admin } = {}) => {
  const exclusaoProduto =
    produtoId && admin
      ? autenticar(admin.email, admin.password).then((login) => {
          if (login.status !== 200) return
          return excluirProduto(produtoId, login.body.authorization)
        })
      : cy.wrap(null)

  return exclusaoProduto.then(() => {
    return usuarios.filter(Boolean).reduce((cadeia, id) => {
      return cadeia.then(() => excluirUsuario(id))
    }, cy.wrap(null))
  })
})
