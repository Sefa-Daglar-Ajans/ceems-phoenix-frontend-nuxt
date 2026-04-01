<script setup lang="ts">
import { z } from 'zod'

definePageMeta({ middleware: ['auth'] })
useHead({ title: 'Profilim - CEEMS Phoenix' })

const auth = useAuthStore()
const toast = useToast()
const { fieldErrors, clearErrors, getFieldError } = useFormErrors()

const schema = z.object({
  firstName: z.string().min(1, 'Ad zorunludur'),
  lastName: z.string().min(1, 'Soyad zorunludur'),
  phone: z.string().optional(),
})

const form = reactive({
  firstName: auth.user?.firstName || '',
  lastName: auth.user?.lastName || '',
  phone: auth.user?.phone || '',
})
const saving = ref(false)

async function handleSave() {
  clearErrors()

  const result = schema.safeParse(form)
  if (!result.success) {
    for (const issue of result.error.issues) {
      fieldErrors.value[issue.path[0] as string] = issue.message
    }
    return
  }

  saving.value = true
  try {
    // TODO: Connect to PATCH /users/me when backend is ready
    await new Promise(resolve => setTimeout(resolve, 500))
    toast.add({ title: 'Profil güncellendi', description: 'Bilgileriniz başarıyla kaydedildi.', color: 'success' })
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="bg-gray-50 py-12">
    <div class="layout-container max-w-2xl">
      <h1 class="font-display text-2xl font-bold text-gray-900 uppercase tracking-tight mb-8">Profilim</h1>

      <UCard class="shadow-sm border-none rounded-2xl">
        <form class="space-y-6" @submit.prevent="handleSave">
          <div class="flex items-center gap-4 pb-6 border-b border-gray-100">
            <div class="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center">
              <span class="text-2xl font-bold text-brand-600">
                {{ auth.user?.firstName?.[0] }}{{ auth.user?.lastName?.[0] }}
              </span>
            </div>
            <div>
              <p class="font-bold text-gray-900">{{ auth.user?.firstName }} {{ auth.user?.lastName }}</p>
              <p class="text-sm text-gray-500">{{ auth.user?.email }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Ad" :error="getFieldError('firstName')">
              <UInput v-model="form.firstName" placeholder="Adınız" class="w-full" />
            </UFormField>
            <UFormField label="Soyad" :error="getFieldError('lastName')">
              <UInput v-model="form.lastName" placeholder="Soyadınız" class="w-full" />
            </UFormField>
          </div>

          <UFormField label="E-posta">
            <UInput :model-value="auth.user?.email" disabled class="w-full" />
          </UFormField>

          <UFormField label="Telefon" :error="getFieldError('phone')" hint="İsteğe bağlı">
            <UInput v-model="form.phone" type="tel" placeholder="05XX XXX XX XX" class="w-full" />
          </UFormField>

          <div class="flex justify-end pt-4">
            <UButton
              type="submit"
              label="Değişiklikleri Kaydet"
              color="primary"
              :loading="saving"
              class="font-bold"
            />
          </div>
        </form>
      </UCard>
    </div>
  </div>
</template>
