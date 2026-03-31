<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const handleClearError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen bg-brand-600 text-white flex items-center justify-center text-center p-8">
    <div>
      <div class="text-[30vh] leading-none font-bold opacity-90">
        {{ error.statusCode }}
      </div>
      <div class="text-3xl opacity-40 mb-8">
        {{ error.statusCode === 404 ? 'Sayfa bulunamadı...' : 'Bir hata oluştu...' }}
      </div>
      <UButton
        label="Ana Sayfaya Dön"
        color="neutral"
        variant="solid"
        size="xl"
        @click="handleClearError"
      />
    </div>
  </div>
</template>
