<script setup lang="ts">
import { z } from 'zod'
import { useQuery } from '@pinia/colada'
import { api } from '~/utils/api'
import { useUpdateProductMutation } from '~/queries/useAdminMutations'
import type { Product } from '~/types'
import type { UploadedImage } from '~/components/ImageUpload.vue'

definePageMeta({ layout: 'panel', middleware: ['auth'] })

const route = useRoute()
const productId = computed(() => route.params.id as string)
useHead({ title: () => `Ürün #${productId.value} - Admin Paneli` })

const toast = useToast()
const { fieldErrors, clearErrors, getFieldError, setBackendErrors } = useFormErrors()

const { data: product, isPending } = useQuery({
  key: () => ['products', productId.value],
  query: () => api().get<Product>(`/products/${productId.value}`).then(r => r.data),
})

const { mutateAsync: updateProduct, isPending: saving } = useUpdateProductMutation()

const form = reactive({
  name: '',
  sku: '',
  series: '',
  description: '',
  price: 0,
  stock: 0,
  slogan: '',
  htmlContent: '',
})

const images = ref<UploadedImage[]>([])

watch(product, (p) => {
  if (p) {
    form.name = p.name
    form.sku = p.sku
    form.series = p.series || ''
    form.description = p.description || ''
    form.price = Number(p.price)
    form.stock = p.stock
    form.slogan = p.slogan || ''
    form.htmlContent = p.htmlContent || ''
    images.value = (p.images || []).map((img, i) => ({
      url: img.url,
      alt: img.alt || undefined,
      sortOrder: img.sortOrder ?? i,
    }))
  }
}, { immediate: true })

const schema = z.object({
  name: z.string().min(1, 'Ürün adı zorunludur'),
  sku: z.string().min(1, 'SKU zorunludur'),
  series: z.string().optional(),
  description: z.string().min(1, 'Açıklama zorunludur'),
  price: z.number().positive('Fiyat pozitif olmalıdır'),
  stock: z.number().int().min(0, 'Stok negatif olamaz'),
  slogan: z.string().optional(),
  htmlContent: z.string().optional(),
})

async function handleSave() {
  clearErrors()
  const result = schema.safeParse({
    ...form,
    price: Number(form.price),
    stock: Number(form.stock),
    htmlContent: form.htmlContent || undefined,
  })

  if (!result.success) {
    for (const issue of result.error.issues) {
      fieldErrors.value[issue.path[0] as string] = issue.message
    }
    return
  }

  try {
    await updateProduct({
      id: Number(productId.value),
      ...result.data,
      images: images.value.map((img, i) => ({
        url: img.url,
        alt: img.alt,
        sortOrder: i,
      })),
    })
    toast.add({ title: 'Ürün güncellendi', color: 'success' })
  }
  catch (error) {
    setBackendErrors(error)
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UButton
        to="/admin/products"
        icon="i-heroicons-arrow-left"
        variant="ghost"
        color="neutral"
        size="sm"
      />
      <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">Ürün Düzenle</h1>
    </div>

    <div v-if="isPending" class="flex justify-center py-16">
      <UIcon name="i-heroicons-arrow-path" class="size-8 text-brand-500 animate-spin" />
    </div>

    <div v-else-if="!product" class="py-12 text-center text-gray-400">
      <UIcon name="i-heroicons-exclamation-triangle" class="size-10 mx-auto" />
      <p class="mt-2">Ürün bulunamadı.</p>
      <UButton to="/admin/products" label="Ürünlere Dön" color="primary" class="mt-4" />
    </div>

    <form v-else class="space-y-8" @submit.prevent="handleSave">
      <UCard class="shadow-sm border-none rounded-xl">
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900">Temel Bilgiler</h2>
        </template>
        <div class="space-y-4">
          <UFormField label="Ürün Adı" :error="getFieldError('name')">
            <UInput v-model="form.name" class="w-full" />
          </UFormField>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="SKU" :error="getFieldError('sku')">
              <UInput v-model="form.sku" class="w-full" />
            </UFormField>
            <UFormField label="Seri">
              <UInput v-model="form.series" class="w-full" />
            </UFormField>
          </div>

          <UFormField label="Kısa Açıklama" :error="getFieldError('description')">
            <UTextarea v-model="form.description" :rows="3" class="w-full" />
          </UFormField>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Fiyat (TL)" :error="getFieldError('price')">
              <UInput v-model.number="form.price" type="number" class="w-full" />
            </UFormField>
            <UFormField label="Stok" :error="getFieldError('stock')">
              <UInput v-model.number="form.stock" type="number" class="w-full" />
            </UFormField>
          </div>

          <UFormField label="Slogan">
            <UInput v-model="form.slogan" class="w-full" />
          </UFormField>
        </div>
      </UCard>

      <UCard class="shadow-sm border-none rounded-xl">
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900">Ürün Görselleri</h2>
          <p class="text-sm text-gray-500 mt-0.5">İlk görsel kapak görseli olarak kullanılır. Sürükleyerek sıralayabilirsiniz.</p>
        </template>
        <ImageUpload v-model="images" />
      </UCard>

      <UCard class="shadow-sm border-none rounded-xl">
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900">Detaylı İçerik</h2>
          <p class="text-sm text-gray-500 mt-0.5">
            Zengin metin içeriği için editörü, tam HTML dokümanları (CSS/JS dahil) için HTML Kaynak modunu kullanın.
          </p>
        </template>
        <WysiwygEditor v-model="form.htmlContent" placeholder="Ürün detaylarını buraya yazın..." />
      </UCard>

      <div class="flex justify-end gap-3">
        <UButton to="/admin/products" label="İptal" color="neutral" variant="ghost" />
        <UButton type="submit" label="Kaydet" color="primary" :loading="saving" class="font-bold" />
      </div>
    </form>
  </div>
</template>
