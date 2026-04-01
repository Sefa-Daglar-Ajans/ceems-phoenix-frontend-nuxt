<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const settings = reactive({
  address: '', phone: '', email: '',
  socials: { instagram: '', whatsapp: '' },
  font: 'Montserrat',
  primaryColor: '#10b981'
})
</script>

<template>
  <div class="max-w-4xl space-y-8">
    <h1 class="text-2xl font-bold uppercase tracking-tighter">Site Ayarları</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 6.1 İletişim Bilgileri -->
      <UCard>
        <template #header><div class="font-bold">6.1. İletişim & 6.3 Sosyal Medya</div></template>
        <div class="space-y-4">
          <UFormField label="Adres"><UTextarea v-model="settings.address" /></UFormField>
          <UFormField label="Telefon"><UInput v-model="settings.phone" /></UFormField>
          <UFormField label="E-Posta"><UInput v-model="settings.email" /></UFormField>
          <UFormField label="Instagram"><UInput v-model="settings.socials.instagram" /></UFormField>
        </div>
      </UCard>

      <!-- 6.4 & 6.5 Görsel Ayarlar -->
      <UCard>
        <template #header><div class="font-bold">6.4. Font & 6.5. Renk Paleti</div></template>
        <div class="space-y-6">
          <UFormField label="Sistem Fontu">
            <USelect v-model="settings.font" :options="['Montserrat', 'Inter', 'Roboto', 'Poppins']" />
          </UFormField>
          
          <UFormField label="Ana Renk (Brand Color)">
            <div class="flex gap-4 items-center">
              <input type="color" v-model="settings.primaryColor" class="w-12 h-12 rounded-lg cursor-pointer" />
              <UInput v-model="settings.primaryColor" class="flex-1" />
            </div>
          </UFormField>
          
          <div class="p-4 rounded-xl border border-dashed text-center" :style="{ color: settings.primaryColor, fontFamily: settings.font }">
            Önizleme Metni: Geleceği Phoenix ile Yönetin
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>