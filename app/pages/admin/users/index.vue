<script setup lang="ts">
import { z } from 'zod'
import { UBadge, UButton } from '#components'

definePageMeta({ layout: 'panel', middleware: ['auth'] })
useHead({ title: 'Kullanıcılar - Admin Paneli' })

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  isActive: boolean
  createdAt: string
}

const users = ref<User[]>([
  { id: 1, firstName: 'Admin', lastName: 'Kullanıcı', email: 'admin@ceems.com', role: 'ADMIN', isActive: true, createdAt: '2026-01-01' },
  { id: 2, firstName: 'Ahmet', lastName: 'Yılmaz', email: 'ahmet@example.com', role: 'DOCTOR', isActive: true, createdAt: '2026-01-15' },
  { id: 3, firstName: 'Fatma', lastName: 'Kaya', email: 'fatma@example.com', role: 'DOCTOR', isActive: true, createdAt: '2026-02-01' },
  { id: 4, firstName: 'Mehmet', lastName: 'Demir', email: 'mehmet@example.com', role: 'REFERRAL', isActive: true, createdAt: '2026-02-10' },
  { id: 5, firstName: 'Ayşe', lastName: 'Çelik', email: 'ayse@example.com', role: 'USER', isActive: true, createdAt: '2026-03-01' },
  { id: 6, firstName: 'Ali', lastName: 'Sönmez', email: 'ali@example.com', role: 'USER', isActive: false, createdAt: '2026-03-15' },
])
const loading = ref(false)

const activeRoleFilter = ref('ALL')
const roleFilters = [
  { label: 'Tümü', value: 'ALL' },
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Doktor', value: 'DOCTOR' },
  { label: 'Pazarlamacı', value: 'REFERRAL' },
  { label: 'Kullanıcı', value: 'USER' },
]

const filteredUsers = computed(() => {
  if (activeRoleFilter.value === 'ALL') return users.value
  return users.value.filter(u => u.role === activeRoleFilter.value)
})

const roleLabels: Record<string, string> = {
  ADMIN: 'Admin',
  DOCTOR: 'Doktor',
  REFERRAL: 'Pazarlamacı',
  USER: 'Kullanıcı',
}

const roleColors: Record<string, 'error' | 'primary' | 'info' | 'neutral'> = {
  ADMIN: 'error',
  DOCTOR: 'primary',
  REFERRAL: 'info',
  USER: 'neutral',
}

const columns = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'firstName',
    header: 'Ad Soyad',
    cell: ({ row }: any) => `${row.original.firstName} ${row.original.lastName}`,
  },
  { accessorKey: 'email', header: 'E-posta' },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }: any) => h(UBadge, {
      label: roleLabels[row.original.role] || row.original.role,
      color: roleColors[row.original.role] || 'neutral',
      variant: 'subtle',
      size: 'xs',
    }),
  },
  {
    accessorKey: 'isActive',
    header: 'Durum',
    cell: ({ row }: any) => h(UBadge, {
      label: row.original.isActive ? 'Aktif' : 'Pasif',
      color: row.original.isActive ? 'success' : 'neutral',
      variant: 'subtle',
      size: 'xs',
    }),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }: any) => h(UButton, {
      icon: 'i-heroicons-pencil-square',
      size: 'xs',
      variant: 'ghost',
      color: 'neutral',
      onClick: () => navigateTo(`/admin/users/${row.original.id}`),
    }),
  },
]

// Create user modal
const showCreateModal = ref(false)
const { fieldErrors, clearErrors, getFieldError } = useFormErrors()
const toast = useToast()

const createSchema = z.object({
  firstName: z.string().min(1, 'Ad zorunludur'),
  lastName: z.string().min(1, 'Soyad zorunludur'),
  email: z.string().email('Geçerli bir e-posta girin'),
  role: z.string().min(1, 'Rol seçimi zorunludur'),
  password: z.string().min(8, 'Şifre en az 8 karakter'),
})

const createForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  password: '',
})

const roleOptions = [
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Doktor', value: 'DOCTOR' },
  { label: 'Pazarlamacı', value: 'REFERRAL' },
  { label: 'Kullanıcı', value: 'USER' },
]

function handleCreateUser() {
  clearErrors()
  const result = createSchema.safeParse(createForm)
  if (!result.success) {
    for (const issue of result.error.issues) {
      fieldErrors.value[issue.path[0] as string] = issue.message
    }
    return
  }

  const newId = Math.max(...users.value.map(u => u.id)) + 1
  users.value.push({
    id: newId,
    firstName: createForm.firstName,
    lastName: createForm.lastName,
    email: createForm.email,
    role: createForm.role,
    isActive: true,
    createdAt: new Date().toISOString().split('T')[0],
  })

  toast.add({ title: 'Kullanıcı oluşturuldu', color: 'success' })
  showCreateModal.value = false
  Object.assign(createForm, { firstName: '', lastName: '', email: '', role: '', password: '' })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">Kullanıcılar</h1>
        <p class="text-sm text-gray-500 mt-1">Tüm kullanıcıları görüntüleyin ve yönetin</p>
      </div>
      <UButton
        label="Yeni Kullanıcı"
        icon="i-heroicons-plus"
        color="primary"
        @click="showCreateModal = true"
      />
    </div>

    <!-- Role Filter -->
    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="filter in roleFilters"
        :key="filter.value"
        :label="filter.label"
        :color="activeRoleFilter === filter.value ? 'primary' : 'neutral'"
        :variant="activeRoleFilter === filter.value ? 'solid' : 'ghost'"
        size="sm"
        @click="activeRoleFilter = filter.value"
      />
    </div>

    <UCard class="shadow-sm border-none">
      <UTable
        :data="filteredUsers"
        :columns="columns"
        :loading="loading"
        class="w-full"
      >
        <template #empty>
          <div class="py-8 text-center text-gray-400">
            <UIcon name="i-heroicons-users" class="size-10 mx-auto" />
            <p class="mt-2">Kullanıcı bulunamadı.</p>
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- Create User Modal -->
    <UModal v-model:open="showCreateModal" title="Yeni Kullanıcı Oluştur">
      <template #body>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Ad" :error="getFieldError('firstName')">
              <UInput v-model="createForm.firstName" placeholder="Ad" class="w-full" />
            </UFormField>
            <UFormField label="Soyad" :error="getFieldError('lastName')">
              <UInput v-model="createForm.lastName" placeholder="Soyad" class="w-full" />
            </UFormField>
          </div>
          <UFormField label="E-posta" :error="getFieldError('email')">
            <UInput v-model="createForm.email" type="email" placeholder="ornek@mail.com" class="w-full" />
          </UFormField>
          <UFormField label="Rol" :error="getFieldError('role')">
            <USelect v-model="createForm.role" :items="roleOptions" placeholder="Rol seçin" class="w-full" />
          </UFormField>
          <UFormField label="Şifre" :error="getFieldError('password')">
            <UInput v-model="createForm.password" type="password" placeholder="En az 8 karakter" class="w-full" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton label="İptal" color="neutral" variant="ghost" @click="showCreateModal = false" />
          <UButton label="Oluştur" color="primary" @click="handleCreateUser" />
        </div>
      </template>
    </UModal>
  </div>
</template>
