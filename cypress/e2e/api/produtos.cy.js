import { mensagens } from '../../support/constants/mensagens'
import { gerarProduto } from '../../support/factories/produto'
import { autenticar } from '../../support/services/auth'
import { buscarProduto, cadastrarProduto, excluirProduto } from '../../support/services/produtos'

describe('API - Produtos', () => {
  let admin
  let comum
  let tokenAdmin
  let produtoId

  beforeEach(() => {
    cy.criarUsuario({ administrador: true })
      .then((criado) => {
        admin = criado
        return autenticar(admin.email, admin.password)
      })
      .then((login) => {
        expect(login.status).to.eq(200)
        tokenAdmin = login.body.authorization
        return cy.criarUsuario()
      })
      .then((criado) => {
        comum = criado
      })
  })

  afterEach(() => {
    cy.limparMassa({
      produtoId,
      admin,
      usuarios: [admin?._id, comum?._id],
    })
  })

  it('permite ao administrador cadastrar, consultar e remover um produto e bloqueia quem não tem permissão', () => {
    const produto = gerarProduto()

    cadastrarProduto(produto)
      .then((response) => {
        expect(response.status).to.eq(401)
        expect(response.body.message).to.eq(mensagens.tokenAusente)

        return autenticar(comum.email, comum.password)
      })
      .then((login) => {
        expect(login.status).to.eq(200)
        expect(login.body.authorization).to.match(/^Bearer\s.+/)

        return cadastrarProduto(produto, login.body.authorization)
      })
      .then((response) => {
        expect(response.status).to.eq(403)
        expect(response.body.message).to.eq(mensagens.rotaAdministradores)

        return cadastrarProduto(produto, tokenAdmin)
      })
      .then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq(mensagens.cadastroSucesso)
        expect(response.body._id).to.be.a('string').and.not.be.empty
        produtoId = response.body._id

        return buscarProduto(produtoId)
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.deep.include({
          nome: produto.nome,
          preco: produto.preco,
          descricao: produto.descricao,
          quantidade: produto.quantidade,
          _id: produtoId,
        })

        return excluirProduto(produtoId, tokenAdmin)
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq(mensagens.registroExcluido)

        return buscarProduto(produtoId)
      })
      .then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq(mensagens.produtoNaoEncontrado)
        produtoId = undefined
      })
  })
})
