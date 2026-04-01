<script setup lang="ts">
import { z } from 'zod'

definePageMeta({ middleware: ['auth'] })
useHead({ title: 'Adreslerim - CEEMS Phoenix' })

const toast = useToast()
const { fieldErrors, clearErrors, getFieldError } = useFormErrors()

interface Address {
  id: number
  title: string
  fullName: string
  phone: string
  city: string
  district: string
  addressLine: string
  isDefault: boolean
}

const addresses = ref<Address[]>([
  {
    id: 1,
    title: 'Ev Adresi',
    fullName: 'Ahmet Yılmaz',
    phone: '0542 000 00 00',
    city: 'Antalya',
    district: 'Muratpaşa',
    addressLine: 'Konuksever Mah. Gazi Bulvarı No:220',
    isDefault: true,
  },
])
const loading = ref(false)
const showModal = ref(false)
const editingAddress = ref<Address | null>(null)

const schema = z.object({
  title: z.string().min(1, 'Adres başlığı zorunludur'),
  fullName: z.string().min(1, 'Ad soyad zorunludur'),
  phone: z.string().min(1, 'Telefon zorunludur'),
  city: z.string().min(1, 'Şehir zorunludur'),
  district: z.string().min(1, 'İlçe zorunludur'),
  addressLine: z.string().min(1, 'Adres satırı zorunludur'),
})

const form = reactive({
  title: '',
  fullName: '',
  phone: '',
  city: '',
  district: '',
  addressLine: '',
})

function resetForm() {
  Object.assign(form, { title: '', fullName: '', phone: '', city: '', district: '', addressLine: '' })
  editingAddress.value = null
  clearErrors()
}

function openCreate() {
  resetForm()
  showModal.value = true
}

function openEdit(address: Address) {
  editingAddress.value = address
  Object.assign(form, {
    title: address.title,
    fullName: address.fullName,
    phone: address.phone,
    city: address.city,
    district: address.district,
    addressLine: address.addressLine,
  })
  showModal.value = true
}

function handleSave() {
  clearErrors()
  const result = schema.safeParse(form)
  if (!result.success) {
    for (const issue of result.error.issues) {
      fieldErrors.value[issue.path[0] as string] = issue.message
    }
    return
  }

  if (editingAddress.value) {
    const idx = addresses.value.findIndex(a => a.id === editingAddress.value!.id)
    if (idx !== -1) {
      addresses.value[idx] = { ...addresses.value[idx], ...result.data }
    }
    toast.add({ title: 'Adres güncellendi', color: 'success' })
  }
  else {
    const newId = addresses.value.length > 0 ? Math.max(...addresses.value.map(a => a.id)) + 1 : 1
    addresses.value.push({ id: newId, ...result.data, isDefault: addresses.value.length === 0 })
    toast.add({ title: 'Adres eklendi', color: 'success' })
  }

  showModal.value = false
  resetForm()
}

function handleDelete(id: number) {
  addresses.value = addresses.value.filter(a => a.id !== id)
  toast.add({ title: 'Adres silindi', color: 'neutral' })
}
</script>

<template>
  <div class="bg-gray-50 py-12">
    <div class="layout-container max-w-3xl">
      <div class="flex items-center justify-between mb-8">
        <h1 class="font-display text-2xl font-bold text-gray-900 uppercase tracking-tight">Adreslerim</h1>
        <UButton
          label="Yeni Adres"
          icon="i-heroicons-plus"
          color="primary"
          @click="openCreate"
        />
      </div>

      <div v-if="loading" class="py-12 text-center text-gray-400">
        <UIcon name="i-heroicons-arrow-path" class="size-6 animate-spin mx-auto" />
        <p class="mt-2 text-sm">Yükleniyor...</p>
      </div>

      <div v-else-if="addresses.length === 0" class="py-16 text-center bg-white rounded-2xl border border-dashed border-gray-300">
        <UIcon name="i-heroicons-map-pin" class="size-12 text-gray-300 mx-auto" />
        <h2 class="text-lg text-gray-400 mt-4">Henüz adres eklenmemiş.</h2>
        <UButton label="İlk Adresinizi Ekleyin" color="primary" class="mt-4" @click="openCreate" />
      </div>

      <div v-else class="space-y-4">
        <UCard v-for="address in addresses" :key="address.id" class="border-none shadow-sm rounded-xl">
          <div class="flex items-start justify-between">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-gray-900">{{ address.title }}</h3>
                <UBadge v-if="address.isDefault" label="Varsayılan" color="primary" variant="subtle" size="xs" />
              </div>
              <p class="text-sm text-gray-700">{{ address.fullName }}</p>
              <p class="text-sm text-gray-500">{{ address.addressLine }}</p>
              <p class="text-sm text-gray-500">{{ address.district }}, {{ address.city }}</p>
              <p class="text-sm text-gray-500">{{ address.phone }}</p>
            </div>
            <div class="flex gap-1">
              <UButton icon="i-heroicons-pencil-square" size="sm" variant="ghost" color="neutral" @click="openEdit(address)" />
              <UButton icon="i-heroicons-trash" size="sm" variant="ghost" color="error" @click="handleDelete(address.id)" />
            </div>
          </div>
        </UCard>
      </div>

      <!-- Address Modal -->
      <UModal v-model:open="showModal" :title="editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'">
        <template #body>
          <div class="space-y-4">
            <UFormField label="Adres Başlığı" :error="getFieldError('title')">
              <UInput v-model="form.title" placeholder="Ev, İş, vb." class="w-full" />
            </UFormField>
            <UFormField label="Ad Soyad" :error="getFieldError('fullName')">
              <UInput v-model="form.fullName" placeholder="Teslim alacak kişi" class="w-full" />
            </UFormField>
            <UFormField label="Telefon" :error="getFieldError('phone')">
              <UInput v-model="form.phone" type="tel" placeholder="05XX XXX XX XX" class="w-full" />
            </UFormField>
            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Şehir" :error="getFieldError('city')">
                <UInput v-model="form.city" placeholder="Şehir" class="w-full" />
              </UFormField>
              <UFormField label="İlçe" :error="getFieldError('district')">
                <UInput v-model="form.district" placeholder="İlçe" class="w-full" />
              </UFormField>
            </div>
            <UFormField label="Adres" :error="getFieldError('addressLine')">
              <UTextarea v-model="form.addressLine" placeholder="Açık adres" :rows="3" class="w-full" />
            </UFormField>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton label="İptal" color="neutral" variant="ghost" @click="showModal = false" />
            <UButton label="Kaydet" color="primary" @click="handleSave" />
          </div>
        </template>
      </UModal>
    </div>
  </div>
</template>
