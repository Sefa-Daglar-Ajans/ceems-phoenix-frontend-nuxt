export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()

  if (import.meta.server) return

  if (!auth.initialized) {
    await auth.init()
  }

  if (!auth.isLoggedIn) {
    return navigateTo('/login')
  }
})
