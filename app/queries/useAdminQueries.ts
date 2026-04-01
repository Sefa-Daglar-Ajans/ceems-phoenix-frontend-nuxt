import { useQuery } from '@pinia/colada'
import { api } from '~/utils/api'
import type { AuthUser } from '~/stores/auth'

interface Contact {
  id: number
  name: string
  email: string
  subject: string
  message: string
  isRead: boolean
  createdAt: string
}

interface Discount {
  id: number
  code: string
  discountPercent: number
  isActive: boolean
  usageCount: number
  maxUsage?: number
  expiresAt?: string
  createdAt: string
}

interface Order {
  id: number
  userId: number
  status: string
  totalPrice: number
  createdAt: string
}

export function useAdminUsersQuery(role?: string) {
  return useQuery({
    key: () => role ? ['admin', 'users', role] : ['admin', 'users'],
    query: () =>
      api().get<AuthUser[]>('/users', role ? { params: { role } } : undefined).then(r => r.data),
  })
}

export function useAdminUserQuery(id: number) {
  return useQuery({
    key: () => ['admin', 'users', id],
    query: () => api().get<AuthUser>(`/users/${id}`).then(r => r.data),
  })
}

export function useAdminOrdersQuery() {
  return useQuery({
    key: ['admin', 'orders'],
    query: () => api().get<Order[]>('/orders').then(r => r.data),
  })
}

export function useAdminContactsQuery() {
  return useQuery({
    key: ['admin', 'contacts'],
    query: () => api().get<Contact[]>('/contacts').then(r => r.data),
  })
}

export function useAdminDiscountsQuery() {
  return useQuery({
    key: ['admin', 'discounts'],
    query: () => api().get<Discount[]>('/discounts').then(r => r.data),
  })
}
