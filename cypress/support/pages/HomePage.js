class HomePage {
  assertCarregada() {
    cy.url({ timeout: 45000 }).should('eq', `${Cypress.config('baseUrl')}/home`)
    cy.contains('h4', 'Produtos').should('be.visible')
    return this
  }

  pesquisar(nome) {
    cy.intercept('GET', /\/produtos\?nome=/).as('buscaProdutos')
    cy.get('[data-testid="pesquisar"]').clear().type(nome)
    cy.get('[data-testid="botaoPesquisar"]').click()
    cy.wait('@buscaProdutos').its('response.statusCode').should('eq', 200)
    return this
  }

  assertProdutoEncontrado(nome) {
    cy.get('h5.card-title').should('have.length', 1).and('contain.text', nome)
    return this
  }

  adicionarProdutoALista() {
    cy.get('[data-testid="adicionarNaLista"]').should('have.length', 1).click()
    return this
  }
}

export default new HomePage()
