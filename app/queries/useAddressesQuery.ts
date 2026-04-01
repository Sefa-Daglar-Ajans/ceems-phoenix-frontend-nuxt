import { defineQuery, useQuery } from '@pinia/colada'
import { api } from '~/utils/api'

interface Address {
  id: number
  title: string
  fullName: string
  phone: string
  city: string
  district: string
  neighborhood: string
  addressLine: string
  postalCode?: string
  isDefault: boolean
}

export const useAddressesQuery = defineQuery(() => {
  return useQuery({
    key: ['addresses'],
    query: () => api().get<Address[]>('/addresses').then(r => r.data),
  })
})
