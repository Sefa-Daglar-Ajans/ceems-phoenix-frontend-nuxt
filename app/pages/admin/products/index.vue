<script setup lang="ts">
import { UBadge, UButton, UIcon } from '#components'
import { useProductsQuery } from '~/queries/useProductsQuery'
import { useDeleteProductMutation } from '~/queries/useAdminMutations'

definePageMeta({ layout: 'panel', middleware: ['auth'] })
useHead({ title: 'Ürünler - Admin Paneli' })

const toast = useToast()
const { data: products, isPending } = useProductsQuery()
const { mutate: deleteProduct } = useDeleteProductMutation()

const columns = [
  { accessorKey: 'id', header: 'ID' },
  {
    id: 'image',
    header: 'Görsel',
    cell: ({ row }: any) => {
      const src = row.original.images?.[0]?.url || row.original.image
      return src
        ? h('img', { src, alt: row.original.name, class: 'w-10 h-10 rounded-lg object-cover' })
        : h('div', { class: 'w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center' },
            h(UIcon, { name: 'i-heroicons-photo', class: 'size-5 text-gray-300' }),
          )
    },
  },
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
        to="/admin/products/new"
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
  </div>
</template>
