<script setup lang="ts">
const cartStore = useCartStore()
const isMenuOpen = ref(false)

const navLinks = [
  { label: 'Kurumsal', to: '/corporate' },
  { label: 'Hakkında', to: '/about' },
  { label: 'Ürünler', to: '/products' },
  { label: 'İletişim', to: '/contact' },
]

// Sayfa değiştiğinde menüyü kapat
const route = useRoute()
watch(() => route.fullPath, () => {
  isMenuOpen.value = false
})
</script>

<template>
  <header class="bg-white border-b border-gray-100 sticky top-0 z-[100] h-[80px] flex items-center">
    <div class="layout-container w-full flex items-center justify-between">
      
      <!-- LOGO: Her zaman solda -->
      <NuxtLink to="/" class="flex items-center gap-2 shrink-0 no-underline">
        <NuxtImg
          src="/images/logo.png"
          alt="CEEMS Logo"
          width="45"
          height="45"
          class="rounded-full"
        />
        <span class="font-bold text-xl uppercase tracking-tighter text-gray-900">
          CEEMS <span class="text-brand-500">PHOENİX</span>
        </span>
      </NuxtLink>

      <!-- SAĞ TARAF: Masaüstü Nav + Butonlar -->
      <div class="flex items-center gap-3">
        
        <!-- MASAÜSTÜ NAVİGASYON: Sadece md ekranlarda görünür -->
        <nav class="hidden md:flex items-center gap-8 mr-6">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link"
            active-class="nav-link-active"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- SEPET BUTONU: Her zaman görünür -->
        <UButton
          to="/cart"
          variant="ghost"
          color="neutral"
          class="relative p-2 hover:bg-gray-50 rounded-full"
        >
          <UIcon name="i-heroicons-shopping-bag" class="size-6 text-gray-700" />
          <UBadge
            v-if="cartStore.totalItems > 0"
            :label="String(cartStore.totalItems)"
            color="primary"
            size="sm"
            class="absolute -top-1 -right-1 rounded-full px-1.5 py-0.5 text-[10px]"
          />
        </UButton>

        <!-- MOBİL MENÜ BUTONU: Sadece mobilde (md:hidden) görünür -->
        <UButton
          icon="i-heroicons-bars-3-bottom-right"
          color="neutral"
          variant="ghost"
          size="xl"
          class="md:hidden p-2"
          @click="isMenuOpen = true"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Masaüstü Linkleri */
.nav-link {
  font-family: var(--font-family-display);
  font-weight: 700;
  font-size: 13px;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
  padding: 4px 0;
}

.nav-link:hover {
  color: var(--color-brand-500);
}

.nav-link-active {
  color: var(--color-brand-600) !important;
  border-bottom: 2px solid var(--color-brand-500);
}
</style>