import axios from 'axios'
import { setApiInstance, type ApiErrorResponse } from '~/utils/api'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const instance = axios.create({
    baseURL: (config.public.apiBase as string) || 'http://localhost:4000',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  })

  instance.interceptors.request.use((reqConfig) => {
    if (import.meta.server) return reqConfig

    const auth = useAuthStore()
    if (auth.accessToken) {
      reqConfig.headers.Authorization = `Bearer ${auth.accessToken}`
    }
    return reqConfig
  })

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (!axios.isAxiosError(error) || !error.response) {
        return Promise.reject(error)
      }

      const { status, data } = error.response

      if (status === 401 && !error.config?.url?.includes('/auth/')) {
        const auth = useAuthStore()
        try {
          await auth.refresh()
          if (auth.accessToken && error.config) {
            error.config.headers.Authorization = `Bearer ${auth.accessToken}`
            return instance.request(error.config)
          }
        }
        catch {
          auth.clearAuth()
          navigateTo('/login')
        }
      }

      return Promise.reject(data as ApiErrorResponse)
    },
  )

  setApiInstance(instance)
})
