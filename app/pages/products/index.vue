<script setup lang="ts">
import { useProductsQuery } from '~/queries/useProductsQuery'
import { useAddToCartMutation } from '~/queries/useCartMutations'
import type { Product } from '~/types'

const { data: products, isPending } = useProductsQuery()
const cartStore = useCartStore()
const auth = useAuthStore()
const { mutate: addToServerCart } = useAddToCartMutation()

function handleAddToCart(product: Product) {
  if (auth.isLoggedIn) {
    addToServerCart({ productId: product.id, quantity: 1 })
  }
  else {
    cartStore.addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image || '',
      description: product.description || '',
    })
  }
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

      <div v-if="isPending" class="flex justify-center py-20">
        <UIcon name="i-heroicons-arrow-path" class="size-8 text-brand-500 animate-spin" />
      </div>

      <div v-else-if="products?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="product in products" :key="product.id" class="group">
          <NuxtLink :to="`/products/${product.id}`">
            <ProductCard
              :product="{
                id: product.id,
                name: product.name,
                price: Number(product.price),
                image: product.image || '',
                description: product.description || '',
                hasDetail: true,
              }"
              show-price
              show-add-to-cart
              @add-to-cart="handleAddToCart(product)"
            />
          </NuxtLink>
        </div>
      </div>

      <div v-else class="text-center py-20 text-gray-400">
        <UIcon name="i-heroicons-cube" class="size-16 mx-auto mb-4" />
        <p class="text-lg">Henüz ürün bulunmamaktadır.</p>
      </div>
    </div>
  </div>
</template>
