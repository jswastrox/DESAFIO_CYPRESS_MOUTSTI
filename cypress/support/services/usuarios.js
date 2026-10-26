import { api } from './client'

export function cadastrarUsuario(usuario) {
  return api({ method: 'POST', url: '/usuarios', body: usuario })
}

export function buscarUsuario(id) {
  return api({ method: 'GET', url: `/usuarios/${id}` })
}

export function excluirUsuario(id) {
  return api({ method: 'DELETE', url: `/usuarios/${id}` })
}
