import { defineStore } from 'pinia'
import type { GuestCartItem } from '~/types'

const COOKIE_NAME = 'ceems-cart'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30

export const useCartStore = defineStore('cart', () => {
  const cartCookie = useCookie<GuestCartItem[]>(COOKIE_NAME, {
    default: () => [],
    maxAge: COOKIE_MAX_AGE,
    watch: true,
  })

  const items = computed(() => cartCookie.value ?? [])

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  function addToCart(product: Omit<GuestCartItem, 'quantity'>) {
    const current = [...(cartCookie.value ?? [])]
    const existing = current.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    }
    else {
      current.push({ ...product, quantity: 1 })
    }
    cartCookie.value = current
  }

  function removeFromCart(productId: number) {
    cartCookie.value = (cartCookie.value ?? []).filter(item => item.id !== productId)
  }

  function updateQuantity(productId: number, delta: number) {
    const current = [...(cartCookie.value ?? [])]
    const item = current.find(i => i.id === productId)
    if (item) {
      item.quantity += delta
      if (item.quantity <= 0) {
        cartCookie.value = current.filter(i => i.id !== productId)
      }
      else {
        cartCookie.value = current
      }
    }
  }

  function clearCart() {
    cartCookie.value = []
  }

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
})
