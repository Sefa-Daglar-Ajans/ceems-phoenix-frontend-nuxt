<script setup lang="ts">
import { UBadge, UButton } from '#components'

definePageMeta({ layout: 'panel', middleware: ['auth'] })
useHead({ title: 'Siparişler - Admin Paneli' })

interface AdminOrder {
  id: number
  customerName: string
  customerEmail: string
  date: string
  status: string
  total: number
  itemCount: number
  discountCode?: string
}

const orders = ref<AdminOrder[]>([
  { id: 1001, customerName: 'Mehmet Kara', customerEmail: 'mehmet@mail.com', date: '2026-03-31', status: 'PENDING', total: 2500, itemCount: 2, discountCode: 'DR-PHOENIX-10' },
  { id: 1002, customerName: 'Ayşe Demir', customerEmail: 'ayse@mail.com', date: '2026-03-30', status: 'PROCESSING', total: 1450, itemCount: 1 },
  { id: 1003, customerName: 'Fatma Yıldız', customerEmail: 'fatma@mail.com', date: '2026-03-28', status: 'SHIPPED', total: 3850, itemCount: 3, discountCode: 'DR-YILMAZ-15' },
  { id: 1004, customerName: 'Ali Sönmez', customerEmail: 'ali@mail.com', date: '2026-03-25', status: 'DELIVERED', total: 1100, itemCount: 1 },
  { id: 1005, customerName: 'Zeynep Büyük', customerEmail: 'zeynep@mail.com', date: '2026-03-20', status: 'DELIVERED', total: 2700, itemCount: 2 },
  { id: 1006, customerName: 'Emre Arslan', customerEmail: 'emre@mail.com', date: '2026-03-18', status: 'CANCELLED', total: 1250, itemCount: 1 },
])
const loading = ref(false)

const statusFilter = ref('ALL')
const statusOptions = [
  { label: 'Tümü', value: 'ALL' },
  { label: 'Beklemede', value: 'PENDING' },
  { label: 'Hazırlanıyor', value: 'PROCESSING' },
  { label: 'Kargoda', value: 'SHIPPED' },
  { label: 'Teslim Edildi', value: 'DELIVERED' },
  { label: 'İptal Edildi', value: 'CANCELLED' },
]

const filteredOrders = computed(() => {
  if (statusFilter.value === 'ALL') return orders.value
  return orders.value.filter(o => o.status === statusFilter.value)
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

const columns = [
  { accessorKey: 'id', header: 'Sipariş No' },
  { accessorKey: 'customerName', header: 'Müşteri' },
  {
    accessorKey: 'date',
    header: 'Tarih',
    cell: ({ row }: any) => new Date(row.original.date).toLocaleDateString('tr-TR'),
  },
  {
    accessorKey: 'status',
    header: 'Durum',
    cell: ({ row }: any) => h(UBadge, {
      label: statusLabels[row.original.status],
      color: statusColors[row.original.status],
      variant: 'subtle',
      size: 'sm',
    }),
  },
  {
    accessorKey: 'total',
    header: 'Tutar',
    cell: ({ row }: any) => `${row.original.total.toLocaleString('tr-TR')} TL`,
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }: any) => h(UButton, {
      icon: 'i-heroicons-eye',
      size: 'xs',
      variant: 'ghost',
      color: 'neutral',
      onClick: () => navigateTo(`/admin/orders/${row.original.id}`),
    }),
  },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">Siparişler</h1>
      <p class="text-sm text-gray-500 mt-1">Tüm siparişleri görüntüleyin ve yönetin</p>
    </div>

    <!-- Status Filter -->
    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="option in statusOptions"
        :key="option.value"
        :label="option.label"
        :color="statusFilter === option.value ? 'primary' : 'neutral'"
        :variant="statusFilter === option.value ? 'solid' : 'ghost'"
        size="sm"
        @click="statusFilter = option.value"
      />
    </div>

    <UCard class="shadow-sm border-none">
      <UTable
        :data="filteredOrders"
        :columns="columns"
        :loading="loading"
        class="w-full"
      >
        <template #empty>
          <div class="py-8 text-center text-gray-400">
            <UIcon name="i-heroicons-shopping-cart" class="size-10 mx-auto" />
            <p class="mt-2">Sipariş bulunamadı.</p>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
