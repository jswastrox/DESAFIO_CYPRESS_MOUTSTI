import { mensagens } from '../constants/mensagens'

class LoginPage {
  visit() {
    cy.clearLocalStorage()
    cy.visit('/login')
    return this
  }

  preencherEmail(email) {
    cy.get('[data-testid="email"]').clear().type(email)
    return this
  }

  preencherSenha(senha) {
    cy.get('[data-testid="senha"]').clear().type(senha, { log: false })
    return this
  }

  entrar() {
    cy.get('[data-testid="entrar"]').click()
    return this
  }

  login(email, senha) {
    this.preencherEmail(email)
    this.preencherSenha(senha)
    this.entrar()
    return this
  }

  assertCredenciaisInvalidas() {
    cy.get('.alert')
      .should('be.visible')
      .and('contain.text', mensagens.loginInvalido)
    cy.url().should('include', '/login')
    return this
  }
}

export default new LoginPage()
