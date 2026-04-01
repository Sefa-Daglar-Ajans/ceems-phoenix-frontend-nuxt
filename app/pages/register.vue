<script setup lang="ts">
import { z } from 'zod'
import { api } from '~/utils/api'

definePageMeta({ layout: 'default' })
useHead({ title: 'Kayıt Ol - CEEMS Phoenix' })

const auth = useAuthStore()
const { fieldErrors, generalError, setBackendErrors, clearErrors, getFieldError } = useFormErrors()

const schema = z
  .object({
    firstName: z.string().min(1, 'Ad zorunludur'),
    lastName: z.string().min(1, 'Soyad zorunludur'),
    email: z.string().min(1, 'E-posta zorunludur').email('Geçerli bir e-posta adresi girin'),
    phone: z.string().optional(),
    password: z.string().min(8, 'Şifre en az 8 karakter olmalıdır'),
    passwordConfirm: z.string().min(1, 'Şifre tekrarı zorunludur'),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: 'Şifreler eşleşmiyor',
    path: ['passwordConfirm'],
  })

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirm: '',
})
const loading = ref(false)

async function handleRegister() {
  clearErrors()

  const result = schema.safeParse(form)
  if (!result.success) {
    for (const issue of result.error.issues) {
      fieldErrors.value[issue.path[0] as string] = issue.message
    }
    return
  }

  loading.value = true
  try {
    const { passwordConfirm: _, ...payload } = result.data
    const { data } = await api().post<{ accessToken: string, user: any }>('/auth/register', payload)
    auth.setAuth(data.accessToken, data.user)
    navigateTo('/user')
  }
  catch (error) {
    setBackendErrors(error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 py-12 px-4">
    <div class="w-full max-w-lg">
      <div class="text-center mb-8">
        <h1 class="font-display text-3xl font-bold text-gray-900 uppercase tracking-tight">Kayıt Ol</h1>
        <p class="text-gray-500 mt-2">Yeni bir CEEMS Phoenix hesabı oluşturun</p>
      </div>

      <UCard class="shadow-xl rounded-2xl">
        <form class="space-y-5" @submit.prevent="handleRegister">
          <div v-if="generalError" class="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
            {{ generalError }}
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Ad" :error="getFieldError('firstName')">
              <UInput v-model="form.firstName" placeholder="Adınız" class="w-full" />
            </UFormField>
            <UFormField label="Soyad" :error="getFieldError('lastName')">
              <UInput v-model="form.lastName" placeholder="Soyadınız" class="w-full" />
            </UFormField>
          </div>

          <UFormField label="E-posta" :error="getFieldError('email')">
            <UInput
              v-model="form.email"
              type="email"
              placeholder="ornek@mail.com"
              icon="i-heroicons-envelope"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Telefon" :error="getFieldError('phone')" hint="İsteğe bağlı">
            <UInput
              v-model="form.phone"
              type="tel"
              placeholder="05XX XXX XX XX"
              icon="i-heroicons-phone"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Şifre" :error="getFieldError('password')">
            <UInput
              v-model="form.password"
              type="password"
              placeholder="En az 8 karakter"
              icon="i-heroicons-lock-closed"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Şifre Tekrarı" :error="getFieldError('passwordConfirm')">
            <UInput
              v-model="form.passwordConfirm"
              type="password"
              placeholder="Şifrenizi tekrar girin"
              icon="i-heroicons-lock-closed"
              class="w-full"
            />
          </UFormField>

          <UButton
            type="submit"
            label="Kayıt Ol"
            color="primary"
            block
            size="xl"
            :loading="loading"
            class="font-bold"
          />
        </form>

        <USeparator class="my-6" label="veya" />

        <p class="text-center text-sm text-gray-500">
          Zaten hesabınız var mı?
          <NuxtLink to="/login" class="text-brand-600 font-semibold hover:underline">
            Giriş Yapın
          </NuxtLink>
        </p>
      </UCard>
    </div>
  </div>
</template>
