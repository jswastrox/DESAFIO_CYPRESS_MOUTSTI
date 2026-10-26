class ListaComprasPage {
  assertProduto(nome) {
    cy.url().should('include', '/minhaListaDeProdutos')
    cy.get('[data-testid="shopping-cart-product-name"]')
      .should('be.visible')
      .and('contain.text', nome)
    cy.get('[data-testid="shopping-cart-product-quantity"]')
      .should('be.visible')
      .and('contain.text', 'Total: 1')
    return this
  }
}

export default new ListaComprasPage()
