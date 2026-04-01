import { defineQuery, useQuery } from '@pinia/colada'
import { api } from '~/utils/api'
import { useAuthStore } from '~/stores/auth'

interface Cart {
  id: number
  items: CartItem[]
  totalPrice: number
}

interface CartItem {
  productId: number
  name: string
  price: number
  quantity: number
  image: string
}

export const useCartQuery = defineQuery(() => {
  const auth = useAuthStore()

  return useQuery({
    key: ['cart'],
    query: () => api().get<Cart>('/carts').then(r => r.data),
    enabled: () => auth.isLoggedIn,
  })
})
