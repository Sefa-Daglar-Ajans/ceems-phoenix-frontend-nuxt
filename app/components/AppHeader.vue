<script setup lang="ts">
const cartStore = useCartStore()

const navLinks = [
  { label: 'Kurumsal', to: '/corporate' },
  { label: 'Hakkında', to: '/about' },
  { label: 'Ürünler', to: '/products' },
  { label: 'İletişim', to: '/contact' },
]
</script>

<template>
  <header class="bg-white text-gray-800 border-b border-gray-200 sticky top-0 z-50">
    <div class="layout-container flex items-center justify-between py-3" style="height: 80px;">
      <NuxtLink to="/" class="flex items-center gap-2 no-underline">
        <NuxtImg
          src="/images/logo.png"
          alt="CEEMS Phoenix Logo"
          width="50"
          height="50"
          class="rounded-full"
        />
        <span class="font-bold text-xl uppercase text-black tracking-tight">
          CEEMS <span class="text-brand-500">PHOENİX</span>
        </span>
      </NuxtLink>

      <div class="flex items-center gap-1">
        <nav class="hidden md:flex items-center gap-6 mr-6">
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

        <UButton
          to="/cart"
          icon="i-heroicons-shopping-cart"
          label="SEPETE GİT"
          color="primary"
          class="font-bold relative"
        >
          <template v-if="cartStore.totalItems > 0" #trailing>
            <UBadge
              :label="String(cartStore.totalItems)"
              color="error"
              size="sm"
              class="absolute -top-2 -right-2"
            />
          </template>
        </UButton>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  font-weight: 700;
  color: #4b5563;
  text-decoration: none;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.3s;
  white-space: nowrap;
}
.nav-link:hover {
  color: #10b981;
}
.nav-link-active {
  color: #059669 !important;
  border-bottom: 2px solid #059669;
}
</style>
