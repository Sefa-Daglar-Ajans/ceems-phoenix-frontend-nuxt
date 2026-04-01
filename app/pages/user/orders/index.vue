<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })
useHead({ title: 'Siparişlerim - CEEMS Phoenix' })

interface Order {
  id: number
  date: string
  status: string
  itemCount: number
  total: number
}

const orders = ref<Order[]>([
  { id: 1001, date: '2026-03-28', status: 'DELIVERED', itemCount: 2, total: 2500 },
  { id: 1002, date: '2026-03-30', status: 'PROCESSING', itemCount: 1, total: 1450 },
  { id: 1003, date: '2026-03-31', status: 'PENDING', itemCount: 3, total: 3850 },
  { id: 1004, date: '2026-03-15', status: 'CANCELLED', itemCount: 1, total: 1100 },
  { id: 1005, date: '2026-03-10', status: 'DELIVERED', itemCount: 2, total: 2700 },
])
const loading = ref(false)

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
</script>

<template>
  <div class="bg-gray-50 py-12">
    <div class="layout-container max-w-4xl">
      <h1 class="font-display text-2xl font-bold text-gray-900 uppercase tracking-tight mb-8">Siparişlerim</h1>

      <div v-if="loading" class="py-12 text-center text-gray-400">
        <UIcon name="i-heroicons-arrow-path" class="size-6 animate-spin mx-auto" />
        <p class="mt-2 text-sm">Yükleniyor...</p>
      </div>

      <div v-else-if="orders.length === 0" class="py-16 text-center bg-white rounded-2xl border border-dashed border-gray-300">
        <UIcon name="i-heroicons-shopping-bag" class="size-12 text-gray-300 mx-auto" />
        <h2 class="text-lg text-gray-400 mt-4">Henüz siparişiniz bulunmuyor.</h2>
        <UButton to="/products" label="Ürünleri İnceleyin" color="primary" class="mt-4" />
      </div>

      <div v-else class="space-y-3">
        <NuxtLink
          v-for="order in orders"
          :key="order.id"
          :to="`/user/orders/${order.id}`"
          class="block"
        >
          <UCard class="border-none shadow-sm hover:shadow-md transition-shadow rounded-xl">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-6">
                <div>
                  <p class="font-bold text-gray-900 text-lg">#{{ order.id }}</p>
                  <p class="text-sm text-gray-500">{{ new Date(order.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
                </div>
                <USeparator orientation="vertical" class="h-10 hidden sm:block" />
                <div class="text-sm text-gray-500">
                  {{ order.itemCount }} ürün
                </div>
              </div>
              <div class="flex items-center gap-4">
                <UBadge
                  :label="statusLabels[order.status]"
                  :color="statusColors[order.status]"
                  variant="subtle"
                />
                <span class="font-bold text-gray-900 text-lg">{{ order.total.toLocaleString('tr-TR') }} TL</span>
                <UIcon name="i-heroicons-chevron-right" class="size-5 text-gray-400" />
              </div>
            </div>
          </UCard>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
