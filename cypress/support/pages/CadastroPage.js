class CadastroPage {
  visit() {
    cy.clearLocalStorage()
    cy.visit('/cadastrarusuarios')
    return this
  }

  preencher({ nome, email, password }) {
    cy.get('[data-testid="nome"]').clear().type(nome)
    cy.get('[data-testid="email"]').clear().type(email)
    cy.get('[data-testid="password"]').clear().type(password, { log: false })
    return this
  }

  cadastrar() {
    cy.get('[data-testid="cadastrar"]').click()
    return this
  }

  assertLojaDoUsuario(email) {
    cy.url({ timeout: 45000 }).should('eq', `${Cypress.config('baseUrl')}/home`)
    cy.get('[data-testid="logout"]').should('be.visible')
    cy.window().then((win) => {
      expect(win.localStorage.getItem('serverest/userEmail')).to.eq(email)
      expect(win.localStorage.getItem('serverest/userToken')).to.match(/^Bearer\s.+/)
    })
    return this
  }
}

export default new CadastroPage()
