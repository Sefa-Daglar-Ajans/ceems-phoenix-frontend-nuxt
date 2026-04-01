import { useMutation } from '@pinia/colada'
import { api } from '~/utils/api'
import { useAuthStore, type AuthUser } from '~/stores/auth'

interface LoginBody {
  email: string
  password: string
}

interface RegisterBody {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
  gender?: string
}

interface AuthResponse {
  accessToken: string
  user: AuthUser
}

export function useLoginMutation() {
  const auth = useAuthStore()

  return useMutation({
    mutation: (body: LoginBody) =>
      api().post<AuthResponse>('/auth/login', body).then(r => r.data),
    onSuccess(data) {
      auth.setAuth(data.accessToken, data.user)
    },
  })
}

export function useRegisterMutation() {
  const auth = useAuthStore()

  return useMutation({
    mutation: (body: RegisterBody) =>
      api().post<AuthResponse>('/auth/register', body).then(r => r.data),
    onSuccess(data) {
      auth.setAuth(data.accessToken, data.user)
    },
  })
}
