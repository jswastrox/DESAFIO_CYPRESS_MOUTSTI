import { faker } from '@faker-js/faker'

export function gerarProduto() {
  const sufixo = `${Date.now()}${Math.floor(Math.random() * 100000)}`

  return {
    nome: `CypressProduto${sufixo}`,
    preco: faker.number.int({ min: 10, max: 900 }),
    descricao: 'Produto criado pela automacao Cypress',
    quantidade: faker.number.int({ min: 1, max: 40 }),
  }
}
