<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const heroContent = reactive({
  badge: 'YENİ NESİL SAĞLIK TEKNOLOJİSİ',
  title: 'GELECEĞİ PHOENİX İLE YÖNETİN',
  description: 'CEEMS PHOENİX, yüksek biyoyararlanıma sahip Mito serisi formülleriyle sağlığınızı ve yaşam kalitenizi en üst seviyeye taşır.'
})

const featuredProducts = ref([
  { id: 1, name: 'MitoViora X-Y', isFeatured: true },
  { id: 2, name: 'MitoRegenix X-Y', isFeatured: true },
  { id: 3, name: 'MitoAndro Y', isFeatured: true },
  { id: 4, name: 'MitoOva X', isFeatured: true },
  { id: 5, name: 'Sample Product 1', isFeatured: false },
])
</script>

<template>
  <div class="max-w-4xl space-y-8">
    <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">Anasayfa Düzenleme</h1>

    <!-- Hero Bölümü Ayarları -->
    <UCard>
      <template #header>
        <h3 class="font-bold text-gray-800 uppercase tracking-widest text-sm italic">Giriş (Hero) Alanı</h3>
      </template>
      <div class="space-y-4">
        <UFormField label="Küçük Başlık (Badge)">
          <UInput v-model="heroContent.badge" />
        </UFormField>
        <UFormField label="Ana Başlık">
          <UInput v-model="heroContent.title" />
        </UFormField>
        <UFormField label="Açıklama Metni">
          <UTextarea v-model="heroContent.description" :rows="3" />
        </UFormField>
      </div>
      <template #footer>
        <UButton color="primary" icon="i-heroicons-check">Metinleri Güncelle</UButton>
      </template>
    </UCard>

    <!-- Öne Çıkan Ürün Seçimi -->
    <UCard>
      <template #header>
        <h3 class="font-bold text-gray-800 uppercase tracking-widest text-sm italic">Öne Çıkan Ürünler (Maks 4)</h3>
      </template>
      <div class="space-y-2">
        <div 
          v-for="product in featuredProducts" 
          :key="product.id" 
          class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <span class="font-bold text-gray-700">{{ product.name }}</span>
          <UToggle v-model="product.isFeatured" color="primary" />
        </div>
      </div>
      <template #footer>
        <p class="text-xs text-gray-400">Not: Aktif ettiğiniz ilk 4 ürün anasayfada listelenecektir.</p>
      </template>
    </UCard>
  </div>
</template>