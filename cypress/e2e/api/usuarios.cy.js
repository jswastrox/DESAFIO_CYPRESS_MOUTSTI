import { mensagens } from '../../support/constants/mensagens'
import { gerarUsuario } from '../../support/factories/usuario'
import { buscarUsuario, cadastrarUsuario } from '../../support/services/usuarios'

describe('API - Usuários', () => {
  const usuario = gerarUsuario()
  let usuarioId

  afterEach(() => {
    cy.limparMassa({ usuarios: [usuarioId] })
  })

  it('cadastra um usuário, consulta o registro e recusa e-mail duplicado', () => {
    cadastrarUsuario(usuario)
      .then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq(mensagens.cadastroSucesso)
        expect(response.body._id).to.be.a('string').and.not.be.empty
        usuarioId = response.body._id

        return buscarUsuario(usuarioId)
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.deep.include({
          nome: usuario.nome,
          email: usuario.email,
          password: usuario.password,
          administrador: 'false',
          _id: usuarioId,
        })

        return cadastrarUsuario(usuario)
      })
      .then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq(mensagens.emailJaUtilizado)
      })
  })
})
