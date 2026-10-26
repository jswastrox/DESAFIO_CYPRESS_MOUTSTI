import { mensagens } from '../../support/constants/mensagens'
import { autenticar } from '../../support/services/auth'

describe('API - Login', () => {
  let usuario

  beforeEach(() => {
    cy.criarUsuario().then((criado) => {
      usuario = criado
    })
  })

  afterEach(() => {
    cy.limparMassa({ usuarios: [usuario?._id] })
  })

  it('autentica um usuário válido e recusa credenciais inválidas', () => {
    autenticar(usuario.email, usuario.password).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq(mensagens.loginSucesso)
      expect(response.body.authorization).to.match(/^Bearer\s.+/)
    })

    autenticar(usuario.email, 'senha-incorreta').then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body.message).to.eq(mensagens.loginInvalido)
      expect(response.body).to.not.have.property('authorization')
    })
  })
})
