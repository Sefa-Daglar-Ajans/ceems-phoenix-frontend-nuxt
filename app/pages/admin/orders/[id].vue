<script setup lang="ts">
definePageMeta({ layout: 'panel', middleware: ['auth'] })

const route = useRoute()
const orderId = computed(() => route.params.id)
useHead({ title: () => `Sipariş #${orderId.value} - Admin Paneli` })

const toast = useToast()
const loading = ref(false)

const statusOptions = [
  { label: 'Beklemede', value: 'PENDING' },
  { label: 'Hazırlanıyor', value: 'PROCESSING' },
  { label: 'Kargoda', value: 'SHIPPED' },
  { label: 'Teslim Edildi', value: 'DELIVERED' },
  { label: 'İptal Edildi', value: 'CANCELLED' },
]

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

const order = ref({
  id: Number(orderId.value),
  customerName: 'Mehmet Kara',
  customerEmail: 'mehmet@mail.com',
  date: '2026-03-31',
  status: 'PENDING',
  items: [
    { id: 1, name: 'MitoViora X-Y', quantity: 1, price: 1250, image: '/images/mitoviora.jpg' },
    { id: 2, name: 'MitoRegenix X-Y', quantity: 1, price: 1450, image: '/images/mitoregenix.jpg' },
  ],
  subtotal: 2700,
  discount: 200,
  total: 2500,
  discountCode: 'DR-PHOENIX-10',
  shippingAddress: {
    fullName: 'Mehmet Kara',
    phone: '0555 111 22 33',
    addressLine: 'Konyaaltı Cad. No:15',
    district: 'Konyaaltı',
    city: 'Antalya',
  },
  billingAddress: {
    fullName: 'Mehmet Kara',
    phone: '0555 111 22 33',
    addressLine: 'Konyaaltı Cad. No:15',
    district: 'Konyaaltı',
    city: 'Antalya',
  },
})

async function updateStatus(newStatus: string) {
  order.value.status = newStatus
  toast.add({ title: 'Durum güncellendi', description: `Sipariş durumu: ${statusLabels[newStatus]}`, color: 'success' })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UButton
        to="/admin/orders"
        icon="i-heroicons-arrow-left"
        variant="ghost"
        color="neutral"
        size="sm"
      />
      <div class="flex-1">
        <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">
          Sipariş #{{ orderId }}
        </h1>
        <p class="text-sm text-gray-500">{{ order.customerName }} — {{ order.customerEmail }}</p>
      </div>
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
      <div class="lg:col-span-2 space-y-4">
        <!-- Items -->
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
                class="w-14 h-14 rounded-lg object-cover"
                width="56"
                height="56"
              />
              <div class="flex-1">
                <p class="font-bold text-gray-900 text-sm">{{ item.name }}</p>
                <p class="text-xs text-gray-500">Adet: {{ item.quantity }}</p>
              </div>
              <p class="font-bold text-sm">{{ (item.price * item.quantity).toLocaleString('tr-TR') }} TL</p>
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

      <!-- Sidebar -->
      <div class="space-y-4">
        <!-- Status Management -->
        <UCard class="border-none shadow-sm rounded-xl">
          <template #header>
            <h2 class="font-bold text-sm text-gray-800 uppercase tracking-wide">Durum Yönetimi</h2>
          </template>
          <div class="space-y-3">
            <USelect
              :model-value="order.status"
              :items="statusOptions"
              class="w-full"
              @update:model-value="updateStatus"
            />
            <p class="text-xs text-gray-500">Durumu değiştirmek için yukarıdaki menüyü kullanın.</p>
          </div>
        </UCard>

        <!-- Order Summary -->
        <UCard class="border-none shadow-sm rounded-xl">
          <template #header>
            <h2 class="font-bold text-sm text-gray-800 uppercase tracking-wide">Sipariş Özeti</h2>
          </template>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between text-gray-600">
              <span>Tarih</span>
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
</template>
