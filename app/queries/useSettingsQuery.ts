import { defineQuery, useQuery } from '@pinia/colada'
import { api } from '~/utils/api'

interface Setting {
  key: string
  value: string
}

export const useSettingsQuery = defineQuery(() => {
  return useQuery({
    key: ['settings'],
    query: () => api().get<Setting[]>('/settings').then(r => r.data),
  })
})
