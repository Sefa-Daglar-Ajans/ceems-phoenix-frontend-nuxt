<script setup lang="ts">
const navLinks = [
  { label: 'Özet', to: '/admin', icon: 'i-heroicons-home' },
  { label: 'Adminler', to: '/admin/users', icon: 'i-heroicons-shield-check' },
  { label: 'Satıcılar / Doktorlar', to: '/admin/sellers', icon: 'i-heroicons-user-group' },
  { label: 'Pazarlamacılar', to: '/admin/marketers', icon: 'i-heroicons-presentation-chart-line' },
  { label: 'Müşteriler', to: '/admin/customers', icon: 'i-heroicons-users' },
  { label: 'Ürün Yönetimi', to: '/admin/products', icon: 'i-heroicons-beaker' },
  { label: 'Site Ayarları', to: '/admin/settings', icon: 'i-heroicons-cog-8-tooth' },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex font-sans text-gray-900 overflow-x-hidden">
    <!-- SIDEBAR -->
    <aside class="w-64 bg-slate-900 text-white flex flex-col shrink-0 fixed inset-y-0 z-[60]">
      <div class="p-6 border-b border-white/10">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold">P</div>
          <span class="font-bold tracking-tight text-sm uppercase">Phoenix Admin</span>
        </div>
      </div>
      
      <nav class="flex-1 p-4 space-y-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          active-class="!text-white !bg-emerald-600 shadow-lg shadow-emerald-900/20"
        >
          <UIcon :name="link.icon" class="size-5" />
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-white/10">
        <NuxtLink to="/" class="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-white px-4 py-2 uppercase tracking-widest">
          <UIcon name="i-heroicons-arrow-left" /> Siteye Dön
        </NuxtLink>
      </div>
    </aside>

    <!-- MAIN -->
    <div class="flex-1 pl-64 flex flex-col min-h-screen">
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-50">
        <h2 class="text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Yönetim Sistemi</h2>
        <div class="flex items-center gap-3">
          <span class="text-xs font-bold text-gray-500 uppercase">Admin Kullanıcı</span>
          <div class="w-8 h-8 rounded-full bg-gray-100 border flex items-center justify-center">
            <UIcon name="i-heroicons-user" class="text-gray-400" />
          </div>
        </div>
      </header>

      <main class="p-8 max-w-7xl w-full">
        <slot />
      </main>
    </div>
  </div>
</template>

<style>
/* Global sıfırlama: Siyah kutuları ve kaymaları engeller */
body {
  background-color: #f8fafc;
}
:root {
  --ui-primary: #10b981;
}
</style>