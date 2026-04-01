import { useMutation } from '@pinia/colada'
import { api } from '~/utils/api'

interface ContactBody {
  name: string
  email: string
  subject: string
  message: string
}

export function useContactMutation() {
  return useMutation({
    mutation: (body: ContactBody) =>
      api().post('/contacts', body).then(r => r.data),
  })
}
