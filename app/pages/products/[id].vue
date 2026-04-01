<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { api } from '~/utils/api'
import type { Product } from '~/types'
import { useAddToCartMutation } from '~/queries/useCartMutations'

const route = useRoute()
const productId = route.params.id as string
const cartStore = useCartStore()
const auth = useAuthStore()
const { mutate: addToServerCart } = useAddToCartMutation()

const { data: product, isPending } = useQuery({
  key: () => ['products', productId],
  query: () => api().get<Product>(`/products/${productId}`).then(r => r.data),
})

function handleAddToCart() {
  if (!product.value) return

  if (auth.isLoggedIn) {
    addToServerCart({ productId: product.value.id, quantity: 1 })
  }
  else {
    cartStore.addToCart({
      id: product.value.id,
      name: product.value.name,
      price: Number(product.value.price),
      image: product.value.image || '',
      description: product.value.description || '',
    })
  }
}

useHead(() => ({
  title: product.value ? `${product.value.name} - CEEMS Phoenix` : 'Ürün - CEEMS Phoenix',
}))
</script>

<template>
  <div class="bg-white min-h-screen pb-20">
    <div v-if="isPending" class="flex justify-center py-32">
      <UIcon name="i-heroicons-arrow-path" class="size-8 text-brand-500 animate-spin" />
    </div>

    <template v-else-if="product">
      <section class="bg-gray-50 py-20 border-b">
        <div class="layout-container">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <UBadge color="primary" variant="subtle" size="lg" class="mb-4">
                {{ product.series || 'PHOENİX MİTO SERİSİ' }}
              </UBadge>
              <h1 class="text-5xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
              <p v-if="product.slogan" class="text-2xl text-brand-600 font-medium italic mb-6">
                {{ product.slogan }}
              </p>
              <p v-if="product.description" class="text-gray-500 text-lg mb-8">
                {{ product.description }}
              </p>

              <div class="flex items-center gap-6 mb-8">
                <span class="text-3xl font-bold text-brand-600">
                  {{ Number(product.price).toLocaleString('tr-TR') }} TL
                </span>
                <UBadge
                  :color="product.stockStatus === 'IN_STOCK' ? 'success' : 'error'"
                  variant="subtle"
                >
                  {{ product.stockStatus === 'IN_STOCK' ? 'Stokta' : product.stockStatus === 'LOW_STOCK' ? 'Az Stok' : 'Tükendi' }}
                </UBadge>
              </div>

              <UButton
                size="xl"
                color="primary"
                :disabled="product.stockStatus === 'OUT_OF_STOCK'"
                @click="handleAddToCart"
              >
                SEPETE EKLE
              </UButton>
            </div>
            <div class="flex justify-center">
              <NuxtImg
                v-if="product.image"
                :src="product.image"
                :alt="product.name"
                class="rounded-3xl shadow-2xl max-w-md w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section v-if="product.htmlContent" class="py-20">
        <div class="layout-container max-w-4xl prose prose-lg" v-html="product.htmlContent" />
      </section>
    </template>

    <div v-else class="text-center py-32">
      <UIcon name="i-heroicons-exclamation-triangle" class="size-16 text-gray-300 mx-auto mb-4" />
      <h2 class="text-xl text-gray-400">Ürün bulunamadı.</h2>
      <UButton to="/products" color="primary" class="mt-6">
        Ürünlere Dön
      </UButton>
    </div>
  </div>
</template>
