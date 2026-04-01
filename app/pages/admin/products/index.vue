<script setup lang="ts">
import { z } from 'zod'
import { UBadge, UButton } from '#components'
import { useProductsQuery } from '~/queries/useProductsQuery'
import { useCreateProductMutation, useDeleteProductMutation } from '~/queries/useAdminMutations'
import type { Product } from '~/types'

definePageMeta({ layout: 'panel', middleware: ['auth'] })
useHead({ title: 'Ürünler - Admin Paneli' })

const toast = useToast()
const { fieldErrors, clearErrors, getFieldError, setBackendErrors } = useFormErrors()
const showCreateModal = ref(false)

const { data: products, isPending } = useProductsQuery()
const { mutateAsync: createProduct, isPending: creating } = useCreateProductMutation()
const { mutate: deleteProduct } = useDeleteProductMutation()

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Ürün Adı' },
  { accessorKey: 'sku', header: 'SKU' },
  { accessorKey: 'series', header: 'Seri' },
  {
    accessorKey: 'price',
    header: 'Fiyat',
    cell: ({ row }: any) => `${Number(row.original.price).toLocaleString('tr-TR')} TL`,
  },
  {
    accessorKey: 'stockStatus',
    header: 'Stok',
    cell: ({ row }: any) => h(UBadge, {
      color: row.original.stockStatus === 'IN_STOCK' ? 'success' : 'error',
      variant: 'subtle',
    }, () => row.original.stockStatus === 'IN_STOCK' ? 'Stokta' : 'Tükendi'),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }: any) => h('div', { class: 'flex gap-1' }, [
      h(UButton, {
        icon: 'i-heroicons-pencil-square',
        size: 'xs',
        variant: 'ghost',
        color: 'neutral',
        onClick: () => navigateTo(`/admin/products/${row.original.id}`),
      }),
      h(UButton, {
        icon: 'i-heroicons-trash',
        size: 'xs',
        variant: 'ghost',
        color: 'error',
        onClick: () => {
          deleteProduct(row.original.id, {
            onSuccess() {
              toast.add({ title: 'Ürün silindi', color: 'neutral' })
            },
          })
        },
      }),
    ]),
  },
]

const createSchema = z.object({
  name: z.string().min(1, 'Ürün adı zorunludur'),
  sku: z.string().min(1, 'SKU zorunludur'),
  series: z.string().optional(),
  description: z.string().min(1, 'Açıklama zorunludur'),
  price: z.number({ invalid_type_error: 'Fiyat sayı olmalıdır' }).positive('Fiyat pozitif olmalıdır'),
  stock: z.number().int().min(0, 'Stok negatif olamaz'),
  slogan: z.string().optional(),
})

const createForm = reactive({
  name: '',
  sku: '',
  series: '',
  description: '',
  price: 0,
  stock: 0,
  slogan: '',
})

async function handleCreate() {
  clearErrors()
  const result = createSchema.safeParse({ ...createForm, price: Number(createForm.price), stock: Number(createForm.stock) })
  if (!result.success) {
    for (const issue of result.error.issues) {
      fieldErrors.value[issue.path[0] as string] = issue.message
    }
    return
  }

  try {
    await createProduct(result.data)
    toast.add({ title: 'Ürün oluşturuldu', color: 'success' })
    showCreateModal.value = false
    Object.assign(createForm, { name: '', sku: '', series: '', description: '', price: 0, stock: 0, slogan: '' })
  }
  catch (error) {
    setBackendErrors(error)
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">Ürünler</h1>
        <p class="text-sm text-gray-500 mt-1">Ürün kataloğunu görüntüleyin ve yönetin</p>
      </div>
      <UButton
        label="Yeni Ürün"
        icon="i-heroicons-plus"
        color="primary"
        @click="showCreateModal = true"
      />
    </div>

    <UCard class="shadow-sm border-none">
      <UTable
        :data="products ?? []"
        :columns="columns"
        :loading="isPending"
        class="w-full"
      >
        <template #empty>
          <div class="py-8 text-center text-gray-400">
            <UIcon name="i-heroicons-shopping-bag" class="size-10 mx-auto" />
            <p class="mt-2">Ürün bulunamadı.</p>
          </div>
        </template>
      </UTable>
    </UCard>

    <UModal v-model:open="showCreateModal" title="Yeni Ürün Ekle">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Ürün Adı" :error="getFieldError('name')">
            <UInput v-model="createForm.name" placeholder="MitoViora X-Y" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="SKU" :error="getFieldError('sku')">
              <UInput v-model="createForm.sku" placeholder="MITO-VIORA-XY" class="w-full" />
            </UFormField>
            <UFormField label="Seri">
              <UInput v-model="createForm.series" placeholder="Mito" class="w-full" />
            </UFormField>
          </div>
          <UFormField label="Açıklama" :error="getFieldError('description')">
            <UTextarea v-model="createForm.description" placeholder="Ürün açıklaması" :rows="3" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Fiyat (TL)" :error="getFieldError('price')">
              <UInput v-model.number="createForm.price" type="number" placeholder="1250" class="w-full" />
            </UFormField>
            <UFormField label="Stok" :error="getFieldError('stock')">
              <UInput v-model.number="createForm.stock" type="number" placeholder="100" class="w-full" />
            </UFormField>
          </div>
          <UFormField label="Slogan">
            <UInput v-model="createForm.slogan" placeholder="Ürün sloganı" class="w-full" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton label="İptal" color="neutral" variant="ghost" @click="showCreateModal = false" />
          <UButton label="Oluştur" color="primary" :loading="creating" @click="handleCreate" />
        </div>
      </template>
    </UModal>
  </div>
</template>
