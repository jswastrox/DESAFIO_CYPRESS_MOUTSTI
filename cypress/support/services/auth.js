import { api } from './client'

export function autenticar(email, password) {
  return api({
    method: 'POST',
    url: '/login',
    body: { email, password },
  })
}
