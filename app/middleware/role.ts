import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()

  if (import.meta.server) return

  if (!auth.initialized) {
    await auth.init()
  }

  const required = to.meta.requiredRole as string | string[] | undefined

  if (!required) return

  const allowed = Array.isArray(required) ? required : [required]

  if (!auth.user || !allowed.includes(auth.user.role)) {
    return navigateTo('/')
  }
})
