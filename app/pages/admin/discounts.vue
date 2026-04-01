<script setup lang="ts">
import { z } from 'zod'
import { UBadge, UButton } from '#components'

definePageMeta({ layout: 'panel', middleware: ['auth'] })
useHead({ title: 'İndirim Kodları - Admin Paneli' })

const toast = useToast()
const { fieldErrors, clearErrors, getFieldError } = useFormErrors()

interface DiscountCode {
  id: number
  code: string
  discountPercent: number
  doctorName?: string
  usageCount: number
  maxUsage?: number
  isActive: boolean
  createdAt: string
}

const discounts = ref<DiscountCode[]>([
  { id: 1, code: 'DR-PHOENIX-10', discountPercent: 10, doctorName: 'Dr. Ahmet Yılmaz', usageCount: 47, isActive: true, createdAt: '2026-01-15' },
  { id: 2, code: 'DR-YILMAZ-15', discountPercent: 15, doctorName: 'Dr. Fatma Kaya', usageCount: 23, isActive: true, createdAt: '2026-02-01' },
  { id: 3, code: 'WELCOME-5', discountPercent: 5, usageCount: 102, maxUsage: 200, isActive: true, createdAt: '2026-01-01' },
  { id: 4, code: 'SUMMER-20', discountPercent: 20, usageCount: 15, maxUsage: 50, isActive: false, createdAt: '2025-06-01' },
])
const loading = ref(false)
const showCreateModal = ref(false)

const columns = [
  { accessorKey: 'code', header: 'Kod' },
  {
    accessorKey: 'discountPercent',
    header: 'İndirim',
    cell: ({ row }: any) => `%${row.original.discountPercent}`,
  },
  { accessorKey: 'doctorName', header: 'Doktor' },
  { accessorKey: 'usageCount', header: 'Kullanım' },
  {
    accessorKey: 'isActive',
    header: 'Durum',
    cell: ({ row }: any) => h(UBadge, {
      label: row.original.isActive ? 'Aktif' : 'Pasif',
      color: row.original.isActive ? 'success' : 'neutral',
      variant: 'subtle',
      size: 'xs',
    }),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }: any) => h('div', { class: 'flex gap-1' }, [
      h(UButton, {
        icon: row.original.isActive ? 'i-heroicons-pause' : 'i-heroicons-play',
        size: 'xs',
        variant: 'ghost',
        color: 'neutral',
        onClick: () => {
          const d = discounts.value.find(d => d.id === row.original.id)
          if (d) {
            d.isActive = !d.isActive
            toast.add({ title: d.isActive ? 'Kod aktif edildi' : 'Kod pasif edildi', color: 'success' })
          }
        },
      }),
    ]),
  },
]

const createSchema = z.object({
  code: z.string().min(1, 'Kod zorunludur').toUpperCase(),
  discountPercent: z.number().min(1, 'İndirim en az %1 olmalıdır').max(100, 'İndirim en fazla %100 olabilir'),
  doctorName: z.string().optional(),
  maxUsage: z.number().optional(),
})

const createForm = reactive({
  code: '',
  discountPercent: 10,
  doctorName: '',
  maxUsage: undefined as number | undefined,
})

function handleCreate() {
  clearErrors()
  const result = createSchema.safeParse({ ...createForm, discountPercent: Number(createForm.discountPercent) })
  if (!result.success) {
    for (const issue of result.error.issues) {
      fieldErrors.value[issue.path[0] as string] = issue.message
    }
    return
  }

  const newId = Math.max(...discounts.value.map(d => d.id)) + 1
  discounts.value.push({
    id: newId,
    code: createForm.code.toUpperCase(),
    discountPercent: Number(createForm.discountPercent),
    doctorName: createForm.doctorName || undefined,
    usageCount: 0,
    maxUsage: createForm.maxUsage,
    isActive: true,
    createdAt: new Date().toISOString().split('T')[0],
  })

  toast.add({ title: 'İndirim kodu oluşturuldu', color: 'success' })
  showCreateModal.value = false
  Object.assign(createForm, { code: '', discountPercent: 10, doctorName: '', maxUsage: undefined })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">İndirim Kodları</h1>
        <p class="text-sm text-gray-500 mt-1">İndirim kodlarını oluşturun ve yönetin</p>
      </div>
      <UButton
        label="Yeni Kod"
        icon="i-heroicons-plus"
        color="primary"
        @click="showCreateModal = true"
      />
    </div>

    <UCard class="shadow-sm border-none">
      <UTable
        :data="discounts"
        :columns="columns"
        :loading="loading"
        class="w-full"
      >
        <template #empty>
          <div class="py-8 text-center text-gray-400">
            <UIcon name="i-heroicons-ticket" class="size-10 mx-auto" />
            <p class="mt-2">İndirim kodu bulunamadı.</p>
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- Create Discount Modal -->
    <UModal v-model:open="showCreateModal" title="Yeni İndirim Kodu">
      <template #body>
        <div class="space-y-4">
          <UFormField label="İndirim Kodu" :error="getFieldError('code')">
            <UInput v-model="createForm.code" placeholder="DR-ISIM-YUZDE" class="w-full uppercase" />
          </UFormField>
          <UFormField label="İndirim Oranı (%)" :error="getFieldError('discountPercent')">
            <UInput v-model.number="createForm.discountPercent" type="number" placeholder="10" class="w-full" />
          </UFormField>
          <UFormField label="Doktor (opsiyonel)">
            <UInput v-model="createForm.doctorName" placeholder="Dr. Ad Soyad" class="w-full" />
          </UFormField>
          <UFormField label="Maks. Kullanım (opsiyonel)">
            <UInput v-model.number="createForm.maxUsage" type="number" placeholder="Sınırsız" class="w-full" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton label="İptal" color="neutral" variant="ghost" @click="showCreateModal = false" />
          <UButton label="Oluştur" color="primary" @click="handleCreate" />
        </div>
      </template>
    </UModal>
  </div>
</template>
