import cadastroPage from '../../support/pages/CadastroPage'
import { gerarUsuario } from '../../support/factories/usuario'
import { autenticar } from '../../support/services/auth'

describe('Frontend - Cadastro', () => {
  const usuario = gerarUsuario()
  let usuarioId

  afterEach(() => {
    if (!usuarioId) return

    cy.limparMassa({ usuarios: [usuarioId] })
  })

  it('cadastra um novo usuário e entra na loja', () => {
    cy.intercept('POST', `${Cypress.expose('apiUrl')}/usuarios`).as('cadastro')

    cadastroPage.visit()
    cadastroPage.preencher(usuario)
    cadastroPage.cadastrar()

    cy.wait('@cadastro').then(({ request, response }) => {
      expect(response.statusCode).to.eq(201)
      expect(request.body).to.include({
        nome: usuario.nome,
        email: usuario.email,
        password: usuario.password,
        administrador: 'false',
      })
      usuarioId = response.body._id
    })

    cadastroPage.assertLojaDoUsuario(usuario.email)

    autenticar(usuario.email, usuario.password).then((login) => {
      expect(login.status).to.eq(200)
      expect(login.body.authorization).to.match(/^Bearer\s.+/)
    })
  })
})
