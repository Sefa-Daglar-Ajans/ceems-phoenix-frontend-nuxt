<script setup lang="ts">
import { UBadge } from '#components'

definePageMeta({ layout: 'panel', middleware: ['auth'] })
useHead({ title: 'Siparişler - Doktor Paneli' })

const auth = useAuthStore()
if (auth.user && auth.user.role !== 'DOCTOR' && auth.user.role !== 'ADMIN') {
  navigateTo('/user')
}

interface DoctorOrder {
  id: number
  customerName: string
  date: string
  status: string
  total: number
  discountCode: string
}

const orders = ref<DoctorOrder[]>([
  { id: 1001, customerName: 'Mehmet K.', date: '2026-03-31', status: 'PENDING', total: 2500, discountCode: 'DR-PHOENIX-10' },
  { id: 1002, customerName: 'Ayşe D.', date: '2026-03-30', status: 'PROCESSING', total: 1450, discountCode: 'DR-PHOENIX-10' },
  { id: 1003, customerName: 'Fatma Y.', date: '2026-03-28', status: 'DELIVERED', total: 3850, discountCode: 'DR-PHOENIX-10' },
  { id: 1004, customerName: 'Ali S.', date: '2026-03-25', status: 'DELIVERED', total: 1100, discountCode: 'DR-PHOENIX-10' },
  { id: 1005, customerName: 'Zeynep B.', date: '2026-03-20', status: 'CANCELLED', total: 2700, discountCode: 'DR-PHOENIX-10' },
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

const columns = [
  { accessorKey: 'id', header: 'Sipariş No' },
  { accessorKey: 'customerName', header: 'Müşteri' },
  { accessorKey: 'date', header: 'Tarih' },
  {
    accessorKey: 'status',
    header: 'Durum',
    cell: ({ row }: any) => h(UBadge, {
      label: statusLabels[row.original.status] || row.original.status,
      color: statusColors[row.original.status] || 'neutral',
      variant: 'subtle',
      size: 'sm',
    }),
  },
  {
    accessorKey: 'total',
    header: 'Tutar',
    cell: ({ row }: any) => `${row.original.total.toLocaleString('tr-TR')} TL`,
  },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">Siparişler</h1>
      <p class="text-sm text-gray-500 mt-1">İndirim kodunuzla yapılan siparişler</p>
    </div>

    <UCard class="shadow-sm border-none">
      <UTable
        :data="orders"
        :columns="columns"
        :loading="loading"
        class="w-full"
      >
        <template #empty>
          <div class="py-8 text-center text-gray-400">
            <UIcon name="i-heroicons-shopping-cart" class="size-10 mx-auto" />
            <p class="mt-2">Henüz sipariş bulunmuyor.</p>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
