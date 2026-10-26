import loginPage from '../../support/pages/LoginPage'
import homePage from '../../support/pages/HomePage'
import listaComprasPage from '../../support/pages/ListaComprasPage'

describe('Frontend - Lista de compras', () => {
  let contexto
  let comprador

  beforeEach(() => {
    cy.prepararProduto()
      .then((preparado) => {
        contexto = preparado
        return cy.criarUsuario()
      })
      .then((usuario) => {
        comprador = usuario
      })
  })

  afterEach(() => {
    cy.limparMassa({
      produtoId: contexto?.produto._id,
      admin: contexto?.admin,
      usuarios: [contexto?.admin._id, comprador?._id],
    })
  })

  it('pesquisa um produto e adiciona o item à lista de compras', () => {
    loginPage.visit()
    loginPage.login(comprador.email, comprador.password)
    homePage.assertCarregada()
    homePage.pesquisar(contexto.produto.nome)
    homePage.assertProdutoEncontrado(contexto.produto.nome)
    homePage.adicionarProdutoALista()
    listaComprasPage.assertProduto(contexto.produto.nome)
  })
})
