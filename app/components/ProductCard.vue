<script setup lang="ts">
import type { Product } from '~/types'

interface Props {
  product: {
    id?: number
    name?: string
    title?: string
    price?: number
    image: string
    description?: string
    statusLabel?: string
    hasDetail?: boolean
  }
  showPrice?: boolean
  showAddToCart?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showPrice: false,
  showAddToCart: false,
})

const emit = defineEmits<{
  addToCart: [product: Product]
}>()
</script>

<template>
  <div class="bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer border border-gray-100 relative">
    <div class="aspect-square bg-gray-50 rounded-2xl mb-6 overflow-hidden relative border border-gray-50">
      <NuxtImg
        :src="product.image"
        :alt="product.name || product.title || ''"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>

    <div class="space-y-3">
      <div class="flex justify-between items-center">
        <span class="text-[10px] text-brand-600 font-bold tracking-widest uppercase">
          {{ showPrice ? 'CEEMS PHOENİX' : 'PHARMA' }}
        </span>
        <div v-if="!showPrice" class="flex items-center gap-1 text-[10px] text-green-600 font-bold">
          <UIcon name="i-heroicons-check-circle" class="size-3.5" />
          <span>STOKTA</span>
        </div>
      </div>

      <h3 class="text-lg font-bold text-gray-900 leading-tight group-hover:text-brand-600 transition-colors uppercase h-14 overflow-hidden">
        {{ product.name || product.title }}
      </h3>

      <div class="flex items-center justify-between pt-4 border-t border-gray-50">
        <template v-if="showPrice && product.price">
          <div class="flex flex-col">
            <span class="text-sm font-bold text-brand-600">{{ product.price.toLocaleString('tr-TR') }} TL</span>
            <span class="text-[10px] text-gray-400 uppercase">30 SAŞE</span>
          </div>
          <UButton
            icon="i-heroicons-shopping-cart"
            label="EKLE"
            color="primary"
            size="sm"
            class="rounded-xl px-4 text-xs font-bold"
            @click="emit('addToCart', product as Product)"
          />
        </template>
        <template v-else>
          <span class="text-xs text-gray-500 font-medium tracking-wide">{{ product.statusLabel || '30 SAŞE' }}</span>
          <UButton
            icon="i-heroicons-plus"
            color="primary"
            size="sm"
            variant="solid"
            class="rounded-full"
          />
        </template>
      </div>
    </div>
  </div>
</template>
