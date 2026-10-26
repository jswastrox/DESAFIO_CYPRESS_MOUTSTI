import loginPage from '../../support/pages/LoginPage'

describe('Frontend - Login', () => {
  it('informa erro e permanece na tela quando o e-mail ou a senha são inválidos', () => {
    loginPage.visit()
    loginPage.login('usuario.inexistente@teste.com', 'senha-incorreta')
    loginPage.assertCredenciaisInvalidas()
  })
})
