<script setup lang="ts">
const featuredProducts = [
  { title: 'MitoViora X-Y', statusLabel: '30 SAŞE', image: '/images/mitoviora.jpg' },
  { title: 'MitoRegenix X-Y', statusLabel: '30 SAŞE', image: '/images/mitoregenix.jpg' },
  { title: 'MitoAndro Y', statusLabel: '30 SAŞE', image: '/images/mitoandro.jpg' },
  { title: 'MitoOva X', statusLabel: '30 SAŞE', image: '/images/mitoova.jpg' },
]

useHead({
  title: 'CEEMS Phoenix - Geleceği Phoenix İle Yönetin',
})
</script>

<template>
  <div class="bg-gray-50">
    <!-- Hero Section -->
    <section class="relative bg-white overflow-hidden border-b border-gray-100">
      <div class="absolute inset-0 bg-gradient-to-br from-brand-50 to-white z-0" />
      <div class="layout-container relative z-10 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-8 animate-fade-in-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 text-brand-700 text-sm font-semibold border border-brand-200">
            <span class="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
            YENİ NESİL SAĞLIK TEKNOLOJİSİ
          </div>
          <h1 class="font-display font-bold text-5xl lg:text-7xl text-gray-900 leading-tight uppercase">
            GELECEĞİ <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-600">PHOENİX</span> İLE YÖNETİN
          </h1>
          <p class="text-lg text-gray-600 leading-relaxed max-w-lg">
            CEEMS PHOENİX, yüksek biyoyararlanıma sahip Mito serisi formülleriyle sağlığınızı ve yaşam kalitenizi en üst seviyeye taşır.
          </p>
          <div class="flex flex-wrap gap-4">
            <UButton
              to="/products"
              size="xl"
              color="primary"
              class="text-lg px-8 py-3 rounded-xl font-bold"
            >
              ÜRÜNLERİ KEŞFET
              <template #trailing>
                <UIcon name="i-heroicons-arrow-right" />
              </template>
            </UButton>
          </div>
        </div>
        <div class="relative lg:h-[600px] flex items-center justify-center">
          <div class="relative z-10 bg-white p-4 rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
            <NuxtImg
              src="/images/sachet.jpg"
              alt="CEEMS Phoenix Saşe"
              class="rounded-2xl"
              width="400"
              height="400"
              style="object-fit: contain;"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-24 bg-gray-50">
      <div class="layout-container">
        <div class="flex justify-between items-end mb-16">
          <div>
            <span class="text-brand-600 font-bold tracking-widest uppercase text-sm">MİTO SERİSİ</span>
            <h2 class="text-3xl font-bold text-gray-900 uppercase mt-2">ÖNE ÇIKAN ÜRÜNLERİMİZ</h2>
          </div>
          <UButton
            to="/products"
            variant="ghost"
            color="primary"
            label="Tüm Katalogu Gör"
            class="font-bold"
          >
            <template #trailing>
              <UIcon name="i-heroicons-arrow-right" />
            </template>
          </UButton>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard
            v-for="(product, index) in featuredProducts"
            :key="index"
            :product="product"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
