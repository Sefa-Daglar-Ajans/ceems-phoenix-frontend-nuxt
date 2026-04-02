<script setup lang="ts">
import { z } from 'zod'
import { useCreateProductMutation } from '~/queries/useAdminMutations'
import type { UploadedImage } from '~/components/ImageUpload.vue'

definePageMeta({ layout: 'panel', middleware: ['auth'] })
useHead({ title: 'Yeni Ürün - Admin Paneli' })

const toast = useToast()
const { fieldErrors, clearErrors, getFieldError, setBackendErrors } = useFormErrors()
const { mutateAsync: createProduct, isPending: saving } = useCreateProductMutation()

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

const schema = z.object({
  name: z.string().min(1, 'Ürün adı zorunludur'),
  sku: z.string().min(1, 'SKU zorunludur'),
  series: z.string().optional(),
  description: z.string().min(1, 'Açıklama zorunludur'),
  price: z.number({ invalid_type_error: 'Fiyat sayı olmalıdır' }).positive('Fiyat pozitif olmalıdır'),
  stock: z.number().int().min(0, 'Stok negatif olamaz'),
  slogan: z.string().optional(),
  htmlContent: z.string().optional(),
})

async function handleCreate() {
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
    await createProduct({
      ...result.data,
      images: images.value.map((img, i) => ({
        url: img.url,
        alt: img.alt,
        sortOrder: i,
      })),
    })
    toast.add({ title: 'Ürün oluşturuldu', color: 'success' })
    navigateTo('/admin/products')
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
      <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">Yeni Ürün</h1>
    </div>

    <form class="space-y-8" @submit.prevent="handleCreate">
      <UCard class="shadow-sm border-none rounded-xl">
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900">Temel Bilgiler</h2>
        </template>
        <div class="space-y-4">
          <UFormField label="Ürün Adı" :error="getFieldError('name')">
            <UInput v-model="form.name" placeholder="MitoViora X-Y" class="w-full" />
          </UFormField>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="SKU" :error="getFieldError('sku')">
              <UInput v-model="form.sku" placeholder="MITO-VIORA-XY" class="w-full" />
            </UFormField>
            <UFormField label="Seri">
              <UInput v-model="form.series" placeholder="Mito" class="w-full" />
            </UFormField>
          </div>

          <UFormField label="Kısa Açıklama" :error="getFieldError('description')">
            <UTextarea v-model="form.description" placeholder="Ürün açıklaması" :rows="3" class="w-full" />
          </UFormField>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Fiyat (TL)" :error="getFieldError('price')">
              <UInput v-model.number="form.price" type="number" placeholder="1250" class="w-full" />
            </UFormField>
            <UFormField label="Stok" :error="getFieldError('stock')">
              <UInput v-model.number="form.stock" type="number" placeholder="100" class="w-full" />
            </UFormField>
          </div>

          <UFormField label="Slogan">
            <UInput v-model="form.slogan" placeholder="Ürün sloganı" class="w-full" />
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
            HTML, CSS ve JavaScript kodu da dahil olmak üzere zengin içerik ekleyebilirsiniz.
            <span class="text-brand-600 font-medium">&lt;/&gt;</span> butonuyla kaynak koda geçiş yapabilirsiniz.
          </p>
        </template>
        <TipTapEditor v-model="form.htmlContent" placeholder="Ürün detaylarını buraya yazın..." />
      </UCard>

      <div class="flex justify-end gap-3">
        <UButton to="/admin/products" label="İptal" color="neutral" variant="ghost" />
        <UButton type="submit" label="Ürünü Oluştur" color="primary" :loading="saving" class="font-bold" />
      </div>
    </form>
  </div>
</template>
