<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })
useHead({ title: 'Hesabım - CEEMS Phoenix' })

const auth = useAuthStore()

const recentOrders = ref([
  { id: 1001, date: '2026-03-28', status: 'DELIVERED', total: 2500 },
  { id: 1002, date: '2026-03-30', status: 'PROCESSING', total: 1450 },
  { id: 1003, date: '2026-03-31', status: 'PENDING', total: 1100 },
])
const loadingOrders = ref(false)

const statusLabels: Record<string, string> = {
  PENDING: 'Beklemede',
  PROCESSING: 'Hazırlanıyor',
  SHIPPED: 'Kargoda',
  DELIVERED: 'Teslim Edildi',
  CANCELLED: 'İptal Edildi',
}

const statusColors: Record<string, 'warning' | 'info' | 'primary' | 'success' | 'error'> = {
  PENDING: 'warning',
  PROCESSING: 'info',
  SHIPPED: 'primary',
  DELIVERED: 'success',
  CANCELLED: 'error',
}

const quickLinks = [
  { label: 'Profilim', to: '/user/profile', icon: 'i-heroicons-user', description: 'Kişisel bilgilerinizi düzenleyin' },
  { label: 'Adreslerim', to: '/user/addresses', icon: 'i-heroicons-map-pin', description: 'Teslimat adreslerinizi yönetin' },
  { label: 'Siparişlerim', to: '/user/orders', icon: 'i-heroicons-shopping-bag', description: 'Tüm siparişlerinizi görüntüleyin' },
]
</script>

<template>
  <div class="bg-gray-50 py-12">
    <div class="layout-container space-y-8">
      <!-- Welcome -->
      <div class="bg-gradient-to-r from-brand-500 to-brand-700 rounded-2xl p-8 text-white">
        <h1 class="font-display text-3xl font-bold">
          Hoş geldiniz, {{ auth.user?.firstName }}!
        </h1>
        <p class="mt-2 text-brand-100">
          CEEMS Phoenix hesabınızdan siparişlerinizi takip edebilir ve profilinizi yönetebilirsiniz.
        </p>
      </div>

      <!-- Quick Links -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="link in quickLinks"
          :key="link.to"
          :to="link.to"
          class="group"
        >
          <UCard class="h-full hover:shadow-lg transition-shadow border-none">
            <div class="flex items-start gap-4">
              <div class="p-3 rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition-colors">
                <UIcon :name="link.icon" class="size-6" />
              </div>
              <div>
                <h3 class="font-bold text-gray-900">{{ link.label }}</h3>
                <p class="text-sm text-gray-500 mt-1">{{ link.description }}</p>
              </div>
            </div>
          </UCard>
        </NuxtLink>
      </div>

      <!-- Recent Orders -->
      <UCard class="border-none shadow-sm">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-bold text-gray-900 uppercase tracking-wide text-sm">Son Siparişler</h2>
            <UButton
              to="/user/orders"
              label="Tümünü Gör"
              variant="ghost"
              color="primary"
              size="sm"
              trailing-icon="i-heroicons-arrow-right"
            />
          </div>
        </template>

        <div v-if="loadingOrders" class="py-8 text-center text-gray-400">
          <UIcon name="i-heroicons-arrow-path" class="size-6 animate-spin mx-auto" />
          <p class="mt-2 text-sm">Yükleniyor...</p>
        </div>

        <div v-else-if="recentOrders.length === 0" class="py-8 text-center text-gray-400">
          <UIcon name="i-heroicons-shopping-bag" class="size-10 mx-auto" />
          <p class="mt-2">Henüz siparişiniz bulunmuyor.</p>
        </div>

        <div v-else class="divide-y divide-gray-100">
          <NuxtLink
            v-for="order in recentOrders"
            :key="order.id"
            :to="`/user/orders/${order.id}`"
            class="flex items-center justify-between py-4 hover:bg-gray-50 -mx-4 px-4 rounded-lg transition-colors"
          >
            <div>
              <span class="font-bold text-gray-900">#{{ order.id }}</span>
              <span class="text-sm text-gray-500 ml-3">{{ new Date(order.date).toLocaleDateString('tr-TR') }}</span>
            </div>
            <div class="flex items-center gap-4">
              <UBadge
                :label="statusLabels[order.status]"
                :color="statusColors[order.status]"
                variant="subtle"
                size="sm"
              />
              <span class="font-bold text-gray-900">{{ order.total.toLocaleString('tr-TR') }} TL</span>
              <UIcon name="i-heroicons-chevron-right" class="size-4 text-gray-400" />
            </div>
          </NuxtLink>
        </div>
      </UCard>
    </div>
  </div>
</template>
