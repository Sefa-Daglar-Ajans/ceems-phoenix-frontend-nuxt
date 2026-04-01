<script setup lang="ts">
import { z } from 'zod'
import { api } from '~/utils/api'

definePageMeta({ layout: 'default' })
useHead({ title: 'Giriş Yap - CEEMS Phoenix' })

const auth = useAuthStore()
const { fieldErrors, generalError, setBackendErrors, clearErrors, getFieldError } = useFormErrors()

const schema = z.object({
  email: z.string().min(1, 'E-posta adresi zorunludur').email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(8, 'Şifre en az 8 karakter olmalıdır'),
})

const form = reactive({ email: '', password: '' })
const loading = ref(false)

async function handleLogin() {
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
    const { data } = await api().post<{ accessToken: string, user: any }>('/auth/login', result.data)
    auth.setAuth(data.accessToken, data.user)

    const redirectMap: Record<string, string> = {
      ADMIN: '/admin',
      DOCTOR: '/doctor',
      REFERRAL: '/referral',
      USER: '/user',
    }
    navigateTo(redirectMap[data.user.role] || '/user')
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
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="font-display text-3xl font-bold text-gray-900 uppercase tracking-tight">Giriş Yap</h1>
        <p class="text-gray-500 mt-2">CEEMS Phoenix hesabınıza giriş yapın</p>
      </div>

      <UCard class="shadow-xl rounded-2xl">
        <form class="space-y-5" @submit.prevent="handleLogin">
          <div v-if="generalError" class="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
            {{ generalError }}
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

          <UFormField label="Şifre" :error="getFieldError('password')">
            <UInput
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              icon="i-heroicons-lock-closed"
              class="w-full"
            />
          </UFormField>

          <UButton
            type="submit"
            label="Giriş Yap"
            color="primary"
            block
            size="xl"
            :loading="loading"
            class="font-bold"
          />
        </form>

        <USeparator class="my-6" label="veya" />

        <p class="text-center text-sm text-gray-500">
          Hesabınız yok mu?
          <NuxtLink to="/register" class="text-brand-600 font-semibold hover:underline">
            Kayıt Olun
          </NuxtLink>
        </p>
      </UCard>
    </div>
  </div>
</template>
