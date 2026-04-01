<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })

const route = useRoute()
const orderId = computed(() => route.params.id)

useHead({ title: () => `Sipariş #${orderId.value} - CEEMS Phoenix` })

const loading = ref(false)

const order = ref({
  id: Number(orderId.value),
  date: '2026-03-28',
  status: 'PROCESSING',
  items: [
    { id: 1, name: 'MitoViora X-Y', quantity: 1, price: 1250, image: '/images/mitoviora.jpg' },
    { id: 2, name: 'MitoRegenix X-Y', quantity: 1, price: 1450, image: '/images/mitoregenix.jpg' },
  ],
  subtotal: 2700,
  discount: 200,
  total: 2500,
  shippingAddress: {
    fullName: 'Ahmet Yılmaz',
    phone: '0542 000 00 00',
    addressLine: 'Konuksever Mah. Gazi Bulvarı No:220',
    district: 'Muratpaşa',
    city: 'Antalya',
  },
  billingAddress: {
    fullName: 'Ahmet Yılmaz',
    phone: '0542 000 00 00',
    addressLine: 'Konuksever Mah. Gazi Bulvarı No:220',
    district: 'Muratpaşa',
    city: 'Antalya',
  },
  discountCode: 'DR-PHOENIX-10',
})

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
      <div class="flex items-center gap-3 mb-8">
        <UButton
          to="/user/orders"
          icon="i-heroicons-arrow-left"
          variant="ghost"
          color="neutral"
          size="sm"
        />
        <h1 class="font-display text-2xl font-bold text-gray-900 uppercase tracking-tight">
          Sipariş #{{ orderId }}
        </h1>
        <UBadge
          :label="statusLabels[order.status]"
          :color="statusColors[order.status]"
          variant="subtle"
          size="lg"
        />
      </div>

      <div v-if="loading" class="py-12 text-center text-gray-400">
        <UIcon name="i-heroicons-arrow-path" class="size-6 animate-spin mx-auto" />
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Order Items -->
        <div class="lg:col-span-2 space-y-4">
          <UCard class="border-none shadow-sm rounded-xl">
            <template #header>
              <h2 class="font-bold text-sm text-gray-800 uppercase tracking-wide">Ürünler</h2>
            </template>
            <div class="divide-y divide-gray-100">
              <div
                v-for="item in order.items"
                :key="item.id"
                class="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <NuxtImg
                  :src="item.image"
                  :alt="item.name"
                  class="w-16 h-16 rounded-lg object-cover"
                  width="64"
                  height="64"
                />
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-gray-900">{{ item.name }}</p>
                  <p class="text-sm text-gray-500">Adet: {{ item.quantity }}</p>
                </div>
                <p class="font-bold text-gray-900">{{ (item.price * item.quantity).toLocaleString('tr-TR') }} TL</p>
              </div>
            </div>
          </UCard>

          <!-- Addresses -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UCard class="border-none shadow-sm rounded-xl">
              <template #header>
                <h3 class="font-bold text-xs text-gray-500 uppercase tracking-wide">Teslimat Adresi</h3>
              </template>
              <div class="text-sm space-y-1">
                <p class="font-semibold text-gray-900">{{ order.shippingAddress.fullName }}</p>
                <p class="text-gray-600">{{ order.shippingAddress.addressLine }}</p>
                <p class="text-gray-600">{{ order.shippingAddress.district }}, {{ order.shippingAddress.city }}</p>
                <p class="text-gray-600">{{ order.shippingAddress.phone }}</p>
              </div>
            </UCard>
            <UCard class="border-none shadow-sm rounded-xl">
              <template #header>
                <h3 class="font-bold text-xs text-gray-500 uppercase tracking-wide">Fatura Adresi</h3>
              </template>
              <div class="text-sm space-y-1">
                <p class="font-semibold text-gray-900">{{ order.billingAddress.fullName }}</p>
                <p class="text-gray-600">{{ order.billingAddress.addressLine }}</p>
                <p class="text-gray-600">{{ order.billingAddress.district }}, {{ order.billingAddress.city }}</p>
                <p class="text-gray-600">{{ order.billingAddress.phone }}</p>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Order Summary -->
        <div>
          <UCard class="border-none shadow-sm rounded-xl">
            <template #header>
              <h2 class="font-bold text-sm text-gray-800 uppercase tracking-wide">Sipariş Özeti</h2>
            </template>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between text-gray-600">
                <span>Sipariş Tarihi</span>
                <span class="font-medium text-gray-900">{{ new Date(order.date).toLocaleDateString('tr-TR') }}</span>
              </div>
              <USeparator />
              <div class="flex justify-between text-gray-600">
                <span>Ara Toplam</span>
                <span>{{ order.subtotal.toLocaleString('tr-TR') }} TL</span>
              </div>
              <div v-if="order.discount > 0" class="flex justify-between text-green-600">
                <span>İndirim ({{ order.discountCode }})</span>
                <span>-{{ order.discount.toLocaleString('tr-TR') }} TL</span>
              </div>
              <USeparator />
              <div class="flex justify-between text-lg font-bold text-brand-600">
                <span>Toplam</span>
                <span>{{ order.total.toLocaleString('tr-TR') }} TL</span>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
