export function api({ method = 'GET', url, body, token }) {
  return cy.request({
    method,
    url: `${Cypress.expose('apiUrl')}${url}`,
    body,
    failOnStatusCode: false,
    headers: {
      accept: 'application/json',
      ...(body ? { 'content-type': 'application/json' } : {}),
      ...(token ? { authorization: token } : {}),
    },
  })
}
