<script setup lang="ts">
import { z } from 'zod'

definePageMeta({ layout: 'panel', middleware: ['auth'] })

const route = useRoute()
const userId = computed(() => route.params.id)
useHead({ title: () => `Kullanıcı #${userId.value} - Admin Paneli` })

const toast = useToast()
const { fieldErrors, clearErrors, getFieldError } = useFormErrors()
const loading = ref(false)
const saving = ref(false)

const roleLabels: Record<string, string> = {
  ADMIN: 'Admin',
  DOCTOR: 'Doktor',
  REFERRAL: 'Pazarlamacı',
  USER: 'Kullanıcı',
}

const roleOptions = [
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Doktor', value: 'DOCTOR' },
  { label: 'Pazarlamacı', value: 'REFERRAL' },
  { label: 'Kullanıcı', value: 'USER' },
]

const user = ref({
  id: Number(userId.value),
  firstName: 'Ahmet',
  lastName: 'Yılmaz',
  email: 'ahmet@example.com',
  phone: '0542 000 00 00',
  role: 'DOCTOR',
  isActive: true,
  gender: 'male',
  namePrefix: 'Dr.',
  professionalTitle: 'Üroloji Uzmanı',
  createdAt: '2026-01-15',
})

const form = reactive({
  firstName: user.value.firstName,
  lastName: user.value.lastName,
  phone: user.value.phone,
  role: user.value.role,
  isActive: user.value.isActive,
  namePrefix: user.value.namePrefix,
  professionalTitle: user.value.professionalTitle,
})

const schema = z.object({
  firstName: z.string().min(1, 'Ad zorunludur'),
  lastName: z.string().min(1, 'Soyad zorunludur'),
  phone: z.string().optional(),
  role: z.string().min(1, 'Rol zorunludur'),
  namePrefix: z.string().optional(),
  professionalTitle: z.string().optional(),
})

async function handleSave() {
  clearErrors()
  const result = schema.safeParse(form)
  if (!result.success) {
    for (const issue of result.error.issues) {
      fieldErrors.value[issue.path[0] as string] = issue.message
    }
    return
  }

  saving.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    toast.add({ title: 'Kullanıcı güncellendi', color: 'success' })
  }
  finally {
    saving.value = false
  }
}

function toggleActive() {
  form.isActive = !form.isActive
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UButton
        to="/admin/users"
        icon="i-heroicons-arrow-left"
        variant="ghost"
        color="neutral"
        size="sm"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">Kullanıcı Düzenle</h1>
        <p class="text-sm text-gray-500">{{ user.email }} — Kayıt: {{ new Date(user.createdAt).toLocaleDateString('tr-TR') }}</p>
      </div>
    </div>

    <div v-if="loading" class="py-12 text-center text-gray-400">
      <UIcon name="i-heroicons-arrow-path" class="size-6 animate-spin mx-auto" />
    </div>

    <div v-else class="max-w-2xl">
      <UCard class="shadow-sm border-none rounded-xl">
        <form class="space-y-6" @submit.prevent="handleSave">
          <div class="flex items-center justify-between pb-4 border-b border-gray-100">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
                <span class="text-lg font-bold text-brand-600">{{ user.firstName[0] }}{{ user.lastName[0] }}</span>
              </div>
              <div>
                <p class="font-bold text-gray-900">{{ user.firstName }} {{ user.lastName }}</p>
                <p class="text-xs text-gray-500">ID: {{ user.id }}</p>
              </div>
            </div>
            <UButton
              :label="form.isActive ? 'Aktif' : 'Pasif'"
              :color="form.isActive ? 'success' : 'neutral'"
              variant="soft"
              size="sm"
              @click="toggleActive"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Ad" :error="getFieldError('firstName')">
              <UInput v-model="form.firstName" class="w-full" />
            </UFormField>
            <UFormField label="Soyad" :error="getFieldError('lastName')">
              <UInput v-model="form.lastName" class="w-full" />
            </UFormField>
          </div>

          <UFormField label="E-posta">
            <UInput :model-value="user.email" disabled class="w-full" />
          </UFormField>

          <UFormField label="Telefon" :error="getFieldError('phone')">
            <UInput v-model="form.phone" type="tel" class="w-full" />
          </UFormField>

          <UFormField label="Rol" :error="getFieldError('role')">
            <USelect v-model="form.role" :items="roleOptions" class="w-full" />
          </UFormField>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Ünvan" :error="getFieldError('namePrefix')">
              <UInput v-model="form.namePrefix" placeholder="Dr., Prof., vb." class="w-full" />
            </UFormField>
            <UFormField label="Uzmanlık" :error="getFieldError('professionalTitle')">
              <UInput v-model="form.professionalTitle" placeholder="Uzmanlık alanı" class="w-full" />
            </UFormField>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <UButton
              to="/admin/users"
              label="İptal"
              color="neutral"
              variant="ghost"
            />
            <UButton
              type="submit"
              label="Kaydet"
              color="primary"
              :loading="saving"
              class="font-bold"
            />
          </div>
        </form>
      </UCard>
    </div>
  </div>
</template>
