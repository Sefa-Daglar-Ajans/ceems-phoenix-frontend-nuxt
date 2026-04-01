<script setup lang="ts">
const cartStore = useCartStore()

const products = [
  { id: 'mitoviora', name: 'MitoViora X-Y', price: 12500, description: 'Hücresel Enerjinin Temeli', image: '/images/mitoviora.jpg', hasDetail: true },
  { id: 'mitoregenix', name: 'MitoRegenix X-Y', price: 13500, description: 'Hücresel Yenilenmenin Bilimi', image: '/images/mitoregenix.jpg', hasDetail: true },
  { id: 'mitoandro', name: 'MitoAndro Y', price: 11500, description: 'Sperm Enerjisini Destekleyen Güç', image: '/images/mitoandro.jpg', hasDetail: true },
  { id: 'mitoova', name: 'MitoOva X', price: 11500, description: 'Oosit Enerjisini Destekleyen Güç', image: '/images/mitoova.jpg', hasDetail: true },
  { id: 'erkek-seti', name: 'Erkek Seti', price: 23000, description: 'MitoAndro + MitoRegenix Kombinasyonu', image: '/images/erkek-seti.jpg', hasDetail: false },
  { id: 'kadin-seti', name: 'Kadın Seti', price: 23000, description: 'MitoOva + MitoRegenix Kombinasyonu', image: '/images/kadin-setiii.jpg', hasDetail: false },
]

function handleAddToCart(product: any) {
  cartStore.addToCart(product)
}

useHead({ title: 'Ürünler - CEEMS Phoenix' })
</script>

<template>
  <div class="bg-gray-50 py-16">
    <div class="layout-container">
      <div class="text-center mb-20">
        <span class="text-brand-600 font-bold tracking-[0.2em] uppercase text-sm">Ürün Portföyü</span>
        <h1 class="text-4xl font-bold text-gray-900 uppercase mt-4">MİTO SERİSİ KATALOGU</h1>
        <USeparator class="mt-4 mx-auto" style="width: 60px;" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="product in products" :key="product.id" class="group">
          <!-- Sadece detay sayfası olanları linkli yapıyoruz -->
          <NuxtLink :to="product.hasDetail ? `/products/${product.id}` : '#'" :class="{ 'cursor-default': !product.hasDetail }">
            <ProductCard
              :product="product"
              show-price
              show-add-to-cart
              @add-to-cart="handleAddToCart(product)"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>