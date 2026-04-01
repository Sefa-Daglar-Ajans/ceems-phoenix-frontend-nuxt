<script setup lang="ts">
import { useCartQuery } from '~/queries/useCartQuery'
import { useUpdateCartItemMutation, useRemoveCartItemMutation, useClearCartMutation } from '~/queries/useCartMutations'

const auth = useAuthStore()
const guestCart = useCartStore()
const couponCode = ref('')

const { data: serverCart, isPending: cartLoading } = useCartQuery()
const { mutate: updateItem } = useUpdateCartItemMutation()
const { mutate: removeItem } = useRemoveCartItemMutation()
const { mutate: clearServerCart } = useClearCartMutation()

const items = computed(() => {
  if (auth.isLoggedIn && serverCart.value) {
    return serverCart.value.items.map((item: any) => ({
      id: item.product.id,
      name: item.product.name,
      price: Number(item.product.price),
      image: item.product.image || '',
      quantity: item.quantity,
    }))
  }
  return guestCart.items
})

const totalPrice = computed(() =>
  items.value.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
)

function handleQuantityChange(productId: number, delta: number) {
  if (auth.isLoggedIn) {
    const item = items.value.find((i: any) => i.id === productId)
    if (item) {
      const newQty = item.quantity + delta
      if (newQty <= 0) {
        removeItem(productId)
      }
      else {
        updateItem({ productId, quantity: newQty })
      }
    }
  }
  else {
    guestCart.updateQuantity(productId, delta)
  }
}

function handleRemove(productId: number) {
  if (auth.isLoggedIn) {
    removeItem(productId)
  }
  else {
    guestCart.removeFromCart(productId)
  }
}

useHead({ title: 'Sepet - CEEMS Phoenix' })
</script>

<template>
  <div class="bg-gray-50 py-12">
    <div class="layout-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-8 uppercase">ALIŞVERİŞ SEPETİNİZ</h1>

      <div v-if="cartLoading && auth.isLoggedIn" class="flex justify-center py-20">
        <UIcon name="i-heroicons-arrow-path" class="size-8 text-brand-500 animate-spin" />
      </div>

      <div v-else-if="items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <UCard class="rounded-2xl">
            <div
              v-for="item in items"
              :key="item.id"
              class="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0"
            >
              <NuxtImg
                :src="item.image"
                :alt="item.name"
                class="rounded-lg w-20 h-20 object-cover shrink-0"
                width="80"
                height="80"
              />
              <div class="flex-1 min-w-0">
                <div class="font-bold text-gray-900 uppercase">{{ item.name }}</div>
                <div class="text-sm text-gray-400">30 SAŞE PAKET</div>
              </div>
              <div class="flex items-center gap-2">
                <UButton
                  icon="i-heroicons-minus"
                  variant="ghost"
                  size="sm"
                  color="neutral"
                  @click="handleQuantityChange(item.id, -1)"
                />
                <span class="font-bold w-8 text-center">{{ item.quantity }}</span>
                <UButton
                  icon="i-heroicons-plus"
                  variant="ghost"
                  size="sm"
                  color="neutral"
                  @click="handleQuantityChange(item.id, 1)"
                />
              </div>
              <div class="text-right shrink-0">
                <div class="font-bold text-brand-600">{{ (item.price * item.quantity).toLocaleString('tr-TR') }} TL</div>
                <UButton
                  icon="i-heroicons-trash"
                  variant="ghost"
                  size="sm"
                  color="error"
                  @click="handleRemove(item.id)"
                />
              </div>
            </div>

            <div class="flex items-center gap-3 mt-6">
              <UInput v-model="couponCode" placeholder="İNDİRİM KODU" class="flex-1" />
              <UButton label="UYGULA" color="neutral" variant="solid" class="px-6" />
            </div>
          </UCard>
        </div>

        <div>
          <UCard class="rounded-2xl">
            <div class="text-xl font-bold text-gray-900 mb-4">SİPARİŞ ÖZETİ</div>
            <div class="flex justify-between mb-3 text-gray-600">
              <span>Ara Toplam</span>
              <span>{{ totalPrice.toLocaleString('tr-TR') }} TL</span>
            </div>
            <div class="flex justify-between mb-3 text-green-600 font-bold">
              <span>İndirim</span>
              <span>0 TL</span>
            </div>
            <USeparator class="my-4" />
            <div class="flex justify-between text-xl font-bold text-brand-600 mb-6">
              <span>Toplam</span>
              <span>{{ totalPrice.toLocaleString('tr-TR') }} TL</span>
            </div>
            <UButton
              :to="auth.isLoggedIn ? '/checkout' : '/login'"
              label="ÖDEMEYE GEÇ"
              color="primary"
              block
              size="xl"
              class="py-3 font-bold rounded-xl"
            />
          </UCard>
        </div>
      </div>

      <div v-else class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
        <UIcon name="i-heroicons-shopping-cart" class="size-16 text-gray-300 mx-auto" />
        <h2 class="text-xl text-gray-400 mt-4">Sepetiniz şu an boş.</h2>
        <UButton to="/products" color="primary" label="ÜRÜNLERİ İNCELE" class="mt-6 rounded-xl px-8" />
      </div>
    </div>
  </div>
</template>
