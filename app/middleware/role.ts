import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  const required = to.meta.requiredRole as string | string[] | undefined

  if (!required) return

  const allowed = Array.isArray(required) ? required : [required]

  if (!auth.user || !allowed.includes(auth.user.role)) {
    return navigateTo('/')
  }
})
