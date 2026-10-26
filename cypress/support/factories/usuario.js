import { faker } from '@faker-js/faker'

export function gerarUsuario({ administrador = false } = {}) {
  const sufixo = `${Date.now()}${Math.floor(Math.random() * 100000)}`

  return {
    nome: faker.person.fullName(),
    email: `cypress.${sufixo}@teste.com`,
    password: 'teste123',
    administrador: administrador ? 'true' : 'false',
  }
}
