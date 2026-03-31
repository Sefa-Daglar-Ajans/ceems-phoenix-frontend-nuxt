<script setup lang="ts">
useHead({
  title: 'Kurumsal - CEEMS Phoenix',
})

const stats = [
  { value: '12+', label: 'Ülke Satışı' },
  { value: '5M+', label: 'Saşe Üretimi' },
  { value: '100%', label: 'Doğal İçerik' },
  { value: '24/7', label: 'Sistem İzleme' },
]
</script>

<template>
  <div class="bg-white">
    <HeroSection
      badge="Hakkımızda"
      title="Geleceğin Sağlık"
      title-highlight="Yönetim Sistemleri"
      description="CEEMS Phoenix, sağlık ve teknolojiyi bir araya getirerek en yüksek biyoyararlanıma sahip formülleri dijital kontrol sistemleriyle buluşturur."
    />

    <!-- Mission/Vision -->
    <section class="py-20">
      <div class="layout-container grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 class="text-3xl font-bold mb-6 text-gray-900">Vizyonumuz</h2>
          <p class="text-gray-600 leading-loose text-lg">
            Sadece bir takviye edici gıda markası değil, aynı zamanda sağlık verilerini ve süreçlerini en modern şekilde yöneten bir teknoloji platformu olmayı hedefliyoruz. Saşe formundaki ürünlerimizi, dijital izlenebilirlik ile birleştirerek kullanıcılarımıza maksimum güven sunuyoruz.
          </p>
        </div>
        <div>
          <h2 class="text-3xl font-bold mb-6 text-gray-900">Teknolojimiz</h2>
          <p class="text-gray-600 leading-loose text-lg">
            Üretim tesislerimiz GMP (Good Manufacturing Practice) standartlarında olup, her bir ürünümüzün saşe basımından kullanıcıya ulaşana kadar olan yolculuğu CEEMS Phoenix altyapısı ile anlık olarak takip edilmektedir.
          </p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="bg-gray-50 py-20 border-y border-gray-100">
      <div class="layout-container grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <div class="text-4xl font-bold text-brand-600 mb-2">{{ stat.value }}</div>
          <div class="text-gray-500 font-medium">{{ stat.label }}</div>
        </div>
      </div>
    </section>
  </div>
</template>
