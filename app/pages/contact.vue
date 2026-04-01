<script setup lang="ts">
import { z } from 'zod'
import { useContactMutation } from '~/queries/useContactMutation'
import { useFormErrors } from '~/composables/useFormErrors'

useHead({ title: 'İletişim - CEEMS Phoenix' })

const contactSchema = z.object({
  fullName: z.string().min(2, 'Ad Soyad en az 2 karakter olmalıdır.'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz.'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır.'),
})

const form = reactive({ fullName: '', email: '', message: '' })
const { fieldErrors, generalError, setBackendErrors, clearErrors, getFieldError } = useFormErrors()
const zodErrors = ref<Record<string, string>>({})
const submitted = ref(false)

const { mutate, isPending } = useContactMutation()

function getError(field: string): string | undefined {
  return zodErrors.value[field] || getFieldError(field)
}

function handleSubmit() {
  zodErrors.value = {}
  clearErrors()

  const result = contactSchema.safeParse(form)
  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string
      zodErrors.value[field] = issue.message
    }
    return
  }

  mutate(result.data, {
    onSuccess() {
      submitted.value = true
      form.fullName = ''
      form.email = ''
      form.message = ''
    },
    onError(error) {
      setBackendErrors(error)
    },
  })
}

const contactInfo = [
  { icon: 'i-heroicons-map-pin', title: 'Adres', value: 'Konuksever Mah. Gazi Bulvarı No:220 Muratpaşa/Antalya' },
  { icon: 'i-heroicons-phone', title: 'Telefon', value: '0533 270 26 04' },
  { icon: 'i-heroicons-envelope', title: 'E-Posta', value: 'info@ceemsphoenix.com' },
]
</script>

<template>
  <div class="bg-gray-50 py-20">
    <div class="layout-container">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-6">İletişim</h1>
          <p class="text-gray-600 text-lg mb-12">
            Her türlü soru ve görüşünüz için Antalya ofisimize bekleriz veya telefonla ulaşabilirsiniz.
          </p>

          <div class="space-y-8">
            <div v-for="info in contactInfo" :key="info.title" class="flex gap-6">
              <div class="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-600 shrink-0">
                <UIcon :name="info.icon" class="size-6" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900 mb-1">{{ info.title }}</h4>
                <p class="text-gray-500 text-sm">{{ info.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-10 shadow-xl">
          <div v-if="submitted" class="text-center py-8">
            <UIcon name="i-heroicons-check-circle" class="size-16 text-brand-500 mx-auto mb-4" />
            <h3 class="text-xl font-bold text-gray-900 mb-2">Mesajınız Gönderildi</h3>
            <p class="text-gray-500">En kısa sürede size dönüş yapacağız.</p>
            <UButton class="mt-6" color="primary" @click="submitted = false">
              Yeni Mesaj Gönder
            </UButton>
          </div>

          <form v-else class="space-y-6" @submit.prevent="handleSubmit">
            <p v-if="generalError" class="text-red-500 text-sm">{{ generalError }}</p>

            <UFormField label="Adınız Soyadınız" :error="getError('fullName')">
              <UInput v-model="form.fullName" placeholder="Adınız Soyadınız" class="w-full" />
            </UFormField>

            <UFormField label="E-Posta Adresiniz" :error="getError('email')">
              <UInput v-model="form.email" type="email" placeholder="E-Posta Adresiniz" class="w-full" />
            </UFormField>

            <UFormField label="Mesajınız" :error="getError('message')">
              <UTextarea v-model="form.message" placeholder="Mesajınız" :rows="5" class="w-full" />
            </UFormField>

            <UButton
              type="submit"
              label="Mesajı Gönder"
              color="primary"
              block
              size="xl"
              class="py-3 font-bold"
              :loading="isPending"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
