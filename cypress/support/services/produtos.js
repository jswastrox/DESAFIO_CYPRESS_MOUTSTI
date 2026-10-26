import { api } from './client'

export function cadastrarProduto(produto, token) {
  return api({ method: 'POST', url: '/produtos', body: produto, token })
}

export function buscarProduto(id) {
  return api({ method: 'GET', url: `/produtos/${id}` })
}

export function excluirProduto(id, token) {
  return api({ method: 'DELETE', url: `/produtos/${id}`, token })
}
