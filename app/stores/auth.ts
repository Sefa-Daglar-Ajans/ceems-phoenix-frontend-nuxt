import { defineStore } from 'pinia'
import { api } from '~/utils/api'

export interface AuthUser {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: 'ADMIN' | 'DOCTOR' | 'REFERRAL' | 'USER'
  gender?: string
  namePrefix?: string
  professionalTitle?: string
  isActive: boolean
  createdAt: string
}

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const user = ref<AuthUser | null>(null)
  const initialized = ref(false)
  let _initPromise: Promise<void> | null = null

  const isLoggedIn = computed(() => !!accessToken.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'ADMIN')
  const isDoctor = computed(() => user.value?.role === 'DOCTOR')
  const isReferral = computed(() => user.value?.role === 'REFERRAL')

  function setAuth(token: string, userData: AuthUser) {
    accessToken.value = token
    user.value = userData
  }

  function clearAuth() {
    accessToken.value = null
    user.value = null
  }

  async function refresh() {
    try {
      const { data } = await api().post<{ accessToken: string }>('/auth/refresh')
      accessToken.value = data.accessToken
    }
    catch {
      clearAuth()
    }
  }

  async function fetchMe() {
    try {
      const { data } = await api().get<AuthUser>('/auth/me')
      user.value = data
    }
    catch {
      clearAuth()
    }
  }

  /**
   * Restores the session from the httpOnly refresh-token cookie.
   * Called once on client startup; deduplicates concurrent calls.
   */
  function init(): Promise<void> {
    if (_initPromise) return _initPromise

    _initPromise = (async () => {
      try {
        await refresh()
        if (accessToken.value) {
          await fetchMe()
        }
      }
      catch {
        clearAuth()
      }
      finally {
        initialized.value = true
      }
    })()

    return _initPromise
  }

  function logout() {
    api().post('/auth/logout').catch(() => {})
    clearAuth()
    navigateTo('/login')
  }

  return {
    accessToken,
    user,
    initialized,
    isLoggedIn,
    isAdmin,
    isDoctor,
    isReferral,
    setAuth,
    clearAuth,
    refresh,
    fetchMe,
    init,
    logout,
  }
})
