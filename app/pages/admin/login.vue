<script setup lang="ts">
definePageMeta({
  layout: false
})

const credentials = reactive({ email: '', password: '' })
const errorMessage = ref('')

// TEST BİLGİLERİ (Şimdilik buraya yazıyoruz)
const ADMIN_EMAIL = 'admin@ceemsphoenix.com'
const ADMIN_PASSWORD = 'admin123' // Bu şifreyi istediğin gibi değiştirebilirsin

const handleLogin = () => {
  if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
    errorMessage.value = ''
    // Giriş başarılı, yönlendir
    navigateTo('/admin')
  } else {
    // Hatalı giriş
    errorMessage.value = 'E-posta veya şifre hatalı!'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 p-6 font-sans">
    <div class="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
      <div class="text-center mb-8">
        <NuxtImg src="/images/logo.png" width="60" class="mx-auto mb-4" />
        <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tighter">Admin Girişi</h1>
        <p class="text-gray-400 text-sm italic">Phoenix Yönetim Sistemine Hoş Geldiniz</p>
      </div>

      <div class="space-y-6">
        <UFormField label="E-Posta">
          <UInput v-model="credentials.email" placeholder="admin@ceemsphoenix.com" size="lg" />
        </UFormField>
        
        <UFormField label="Şifre">
          <UInput v-model="credentials.password" type="password" placeholder="••••••••" size="lg" />
        </UFormField>

        <!-- Hata Mesajı -->
        <p v-if="errorMessage" class="text-red-500 text-sm text-center font-bold animate-pulse">
          {{ errorMessage }}
        </p>

        <UButton color="primary" block size="xl" class="font-bold py-4" @click="handleLogin">
          GİRİŞ YAP
        </UButton>
      </div>

      <div class="mt-8 text-center">
        <p class="text-[10px] text-gray-300 uppercase tracking-widest">
          © {{ new Date().getFullYear() }} CEEMS PHOENIX BİYOTEKNOLOJİ
        </p>
      </div>
    </div>
  </div>
</template>