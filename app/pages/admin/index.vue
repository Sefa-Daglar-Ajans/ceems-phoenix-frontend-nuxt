<script setup lang="ts">
definePageMeta({ layout: 'panel', middleware: ['auth'] })
useHead({ title: 'Admin Paneli - CEEMS Phoenix' })

const auth = useAuthStore()
if (auth.user && auth.user.role !== 'ADMIN') {
  navigateTo('/user')
}

const stats = ref([
  { label: 'Toplam Kullanıcı', value: '128', icon: 'i-heroicons-users', color: 'text-blue-600' },
  { label: 'Toplam Ürün', value: '4', icon: 'i-heroicons-shopping-bag', color: 'text-brand-600' },
  { label: 'Aktif Siparişler', value: '23', icon: 'i-heroicons-shopping-cart', color: 'text-orange-600' },
  { label: 'Toplam Gelir', value: '87.500 TL', icon: 'i-heroicons-banknotes', color: 'text-purple-600' },
])

const quickActions = [
  { label: 'Kullanıcılar', to: '/admin/users', icon: 'i-heroicons-users' },
  { label: 'Ürünler', to: '/admin/products', icon: 'i-heroicons-shopping-bag' },
  { label: 'Siparişler', to: '/admin/orders', icon: 'i-heroicons-shopping-cart' },
  { label: 'İndirim Kodları', to: '/admin/discounts', icon: 'i-heroicons-ticket' },
  { label: 'İletişim', to: '/admin/contacts', icon: 'i-heroicons-envelope' },
  { label: 'Ayarlar', to: '/admin/settings', icon: 'i-heroicons-cog-8-tooth' },
]

const recentActivities = ref([
  { id: 1, action: 'Yeni sipariş alındı', detail: 'Sipariş #1045 — 2.500 TL', time: '5 dakika önce' },
  { id: 2, action: 'Kullanıcı kaydı', detail: 'Mehmet Kaya yeni kayıt oldu', time: '15 dakika önce' },
  { id: 3, action: 'Sipariş kargoya verildi', detail: 'Sipariş #1042 kargoya teslim edildi', time: '1 saat önce' },
  { id: 4, action: 'İndirim kodu oluşturuldu', detail: 'DR-YILMAZ-15 kodu aktif edildi', time: '2 saat önce' },
])
</script>

<template>
  <div class="space-y-8">
    <div class="flex justify-between items-end">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">Genel Özet</h1>
        <p class="text-sm text-gray-500">Hoş geldiniz, CEEMS Phoenix yönetim sistemine.</p>
      </div>
      <div class="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-widest hidden sm:block">
        Admin
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard v-for="stat in stats" :key="stat.label" class="shadow-sm border-none hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
          <div :class="['p-3 rounded-xl bg-gray-50', stat.color]">
            <UIcon :name="stat.icon" class="size-6" />
          </div>
          <div>
            <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ stat.label }}</div>
            <div class="text-2xl font-bold text-gray-900 leading-none mt-1">{{ stat.value }}</div>
          </div>
        </div>
      </UCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Activity -->
      <UCard class="shadow-sm border-none">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-gray-800 uppercase tracking-widest text-sm">Son Hareketler</h3>
            <UIcon name="i-heroicons-clock" class="text-gray-400 size-5" />
          </div>
        </template>
        <div class="divide-y divide-gray-100">
          <div v-for="item in recentActivities" :key="item.id" class="py-4 flex justify-between items-start group first:pt-0 last:pb-0">
            <div class="flex gap-3">
              <div class="w-2 h-2 rounded-full bg-brand-500 mt-2 group-hover:scale-150 transition-transform" />
              <div>
                <div class="font-bold text-sm text-gray-900">{{ item.action }}</div>
                <div class="text-xs text-gray-500">{{ item.detail }}</div>
              </div>
            </div>
            <div class="text-[10px] font-bold text-gray-400 uppercase shrink-0 ml-4">{{ item.time }}</div>
          </div>
        </div>
      </UCard>

      <!-- Quick Actions -->
      <UCard class="shadow-sm border-none">
        <template #header>
          <h3 class="font-bold text-gray-800 uppercase tracking-widest text-sm">Hızlı İşlemler</h3>
        </template>
        <div class="grid grid-cols-2 gap-3">
          <UButton
            v-for="action in quickActions"
            :key="action.to"
            :to="action.to"
            :icon="action.icon"
            :label="action.label"
            color="neutral"
            variant="soft"
            block
            class="justify-start font-semibold py-3"
          />
        </div>
      </UCard>
    </div>
  </div>
</template>
