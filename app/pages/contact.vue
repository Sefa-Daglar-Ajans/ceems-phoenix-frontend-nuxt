<script setup lang="ts">
useHead({
  title: 'İletişim - CEEMS Phoenix',
})

const form = reactive({ name: '', email: '', message: '' })

const contactInfo = [
  {
    icon: 'i-heroicons-map-pin',
    title: 'Adres',
    value: 'Konuksever Mah. Gazi Bulvarı No:220 Muratpaşa/Antalya',
  },
  {
    icon: 'i-heroicons-phone',
    title: 'Telefon',
    value: '0542 439 52 79',
  },
  {
    icon: 'i-heroicons-envelope',
    title: 'E-Posta',
    value: 'info@ceemsphoenix.com',
  },
]
</script>

<template>
  <div class="bg-gray-50 py-20">
    <div class="layout-container">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Contact Info -->
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

        <!-- Contact Form -->
        <div class="bg-white rounded-3xl p-10 shadow-xl">
          <div class="space-y-6">
            <UFormField label="Adınız Soyadınız">
              <UInput v-model="form.name" placeholder="Adınız Soyadınız" class="w-full" />
            </UFormField>
            <UFormField label="E-Posta Adresiniz">
              <UInput v-model="form.email" type="email" placeholder="E-Posta Adresiniz" class="w-full" />
            </UFormField>
            <UFormField label="Mesajınız">
              <UTextarea v-model="form.message" placeholder="Mesajınız" :rows="5" class="w-full" />
            </UFormField>
            <UButton
              label="Mesajı Gönder"
              color="primary"
              block
              size="xl"
              class="py-3 font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
