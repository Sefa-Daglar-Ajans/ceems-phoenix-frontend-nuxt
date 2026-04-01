import { useMutation, useQueryCache } from '@pinia/colada'
import { api } from '~/utils/api'

interface CreateAddressBody {
  title: string
  fullName: string
  phone: string
  city: string
  district: string
  neighborhood: string
  addressLine: string
  postalCode?: string
  isDefault?: boolean
}

interface UpdateAddressBody extends Partial<CreateAddressBody> {
  id: number
}

export function useCreateAddressMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (body: CreateAddressBody) =>
      api().post('/addresses', body).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['addresses'] })
    },
  })
}

export function useUpdateAddressMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: ({ id, ...body }: UpdateAddressBody) =>
      api().patch(`/addresses/${id}`, body).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['addresses'] })
    },
  })
}

export function useDeleteAddressMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (id: number) =>
      api().delete(`/addresses/${id}`).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['addresses'] })
    },
  })
}
