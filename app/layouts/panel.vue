<script setup lang="ts">
const auth = useAuthStore()
const isSidebarOpen = ref(false)
const route = useRoute()

watch(() => route.fullPath, () => {
  isSidebarOpen.value = false
})

const adminLinks = [
  { label: 'Özet', to: '/admin', icon: 'i-heroicons-home' },
  { label: 'Kullanıcılar', to: '/admin/users', icon: 'i-heroicons-users' },
  { label: 'Ürünler', to: '/admin/products', icon: 'i-heroicons-shopping-bag' },
  { label: 'Siparişler', to: '/admin/orders', icon: 'i-heroicons-shopping-cart' },
  { label: 'İndirim Kodları', to: '/admin/discounts', icon: 'i-heroicons-ticket' },
  { label: 'İletişim', to: '/admin/contacts', icon: 'i-heroicons-envelope' },
  { label: 'Ayarlar', to: '/admin/settings', icon: 'i-heroicons-cog-8-tooth' },
]

const doctorLinks = [
  { label: 'Özet', to: '/doctor', icon: 'i-heroicons-home' },
  { label: 'Siparişler', to: '/doctor/orders', icon: 'i-heroicons-shopping-cart' },
  { label: 'Profil', to: '/doctor/profile', icon: 'i-heroicons-user' },
]

const referralLinks = [
  { label: 'Özet', to: '/referral', icon: 'i-heroicons-home' },
  { label: 'Profil', to: '/referral/profile', icon: 'i-heroicons-user' },
]

const navLinks = computed(() => {
  if (auth.isAdmin) return adminLinks
  if (auth.isDoctor) return doctorLinks
  if (auth.isReferral) return referralLinks
  return []
})

const panelTitle = computed(() => {
  if (auth.isAdmin) return 'Admin Paneli'
  if (auth.isDoctor) return 'Doktor Paneli'
  if (auth.isReferral) return 'Pazarlamacı Paneli'
  return 'Panel'
})

const userName = computed(() => {
  if (!auth.user) return ''
  const prefix = auth.user.namePrefix ? `${auth.user.namePrefix} ` : ''
  return `${prefix}${auth.user.firstName} ${auth.user.lastName}`
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex font-sans text-gray-900 overflow-x-hidden">
    <!-- Mobile overlay -->
    <Transition name="fade">
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black/40 z-[65] lg:hidden"
        @click="isSidebarOpen = false"
      />
    </Transition>

    <!-- Sidebar -->
    <aside
      :class="[
        'w-64 bg-slate-900 text-white flex flex-col shrink-0 fixed inset-y-0 z-[70] transition-transform duration-300',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <div class="p-6 border-b border-white/10">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center font-bold text-sm">P</div>
          <span class="font-bold tracking-tight text-sm uppercase">{{ panelTitle }}</span>
        </div>
      </div>

      <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          active-class="!text-white !bg-brand-600 shadow-lg shadow-brand-900/20"
        >
          <UIcon :name="link.icon" class="size-5" />
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-white/10 space-y-2">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-white px-4 py-2 uppercase tracking-widest"
        >
          <UIcon name="i-heroicons-arrow-left" class="size-4" />
          Siteye Dön
        </NuxtLink>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 lg:pl-64 flex flex-col min-h-screen">
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50">
        <div class="flex items-center gap-3">
          <UButton
            icon="i-heroicons-bars-3"
            color="neutral"
            variant="ghost"
            class="lg:hidden"
            @click="isSidebarOpen = true"
          />
          <h2 class="text-[10px] font-black text-gray-400 uppercase tracking-[3px] hidden sm:block">
            Yönetim Sistemi
          </h2>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-xs font-bold text-gray-500 hidden sm:inline">{{ userName }}</span>
          <UButton
            icon="i-heroicons-arrow-right-start-on-rectangle"
            color="neutral"
            variant="ghost"
            size="sm"
            @click="auth.logout()"
          />
        </div>
      </header>

      <main class="p-4 lg:p-8 max-w-7xl w-full">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
