<script setup lang="ts">
import type { Product } from '~/types'

const cartStore = useCartStore()

const products: Product[] = [
  { id: 1, name: 'MitoViora X-Y', price: 1250, description: 'Gelişmiş hücresel destek.', image: '/images/mitoviora.jpg' },
  { id: 2, name: 'MitoRegenix X-Y', price: 1350, description: 'Hücre yenilenmesi.', image: '/images/mitoregenix.jpg' },
  { id: 3, name: 'MitoAndro Y', price: 1150, description: 'Erkek sağlığına özel.', image: '/images/mitoandro.jpg' },
  { id: 4, name: 'MitoOva X', price: 1150, description: 'Kadın sağlığına özel.', image: '/images/mitoova.jpg' },
]

function handleAddToCart(product: Product) {
  cartStore.addToCart(product)
}

useHead({
  title: 'Ürünler - CEEMS Phoenix',
})
</script>

<template>
  <div class="bg-gray-50 py-16">
    <div class="layout-container">
      <div class="text-center mb-20">
        <span class="text-brand-600 font-bold tracking-[0.2em] uppercase text-sm">Ürün Portföyü</span>
        <h1 class="text-4xl font-bold text-gray-900 uppercase mt-4">MİTO SERİSİ KATALOGU</h1>
        <USeparator class="mt-4 mx-auto" style="width: 60px;" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          show-price
          show-add-to-cart
          @add-to-cart="handleAddToCart"
        />
      </div>
    </div>
  </div>
</template>
