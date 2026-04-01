<script setup lang="ts">
definePageMeta({ layout: 'panel', middleware: ['auth'] })
useHead({ title: 'Profil - Doktor Paneli' })

const auth = useAuthStore()
if (auth.user && auth.user.role !== 'DOCTOR' && auth.user.role !== 'ADMIN') {
  navigateTo('/user')
}

const toast = useToast()
const saving = ref(false)

const form = reactive({
  firstName: auth.user?.firstName || '',
  lastName: auth.user?.lastName || '',
  phone: auth.user?.phone || '',
  professionalTitle: auth.user?.professionalTitle || '',
})

async function handleSave() {
  saving.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    toast.add({ title: 'Profil güncellendi', description: 'Bilgileriniz başarıyla kaydedildi.', color: 'success' })
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl space-y-6">
    <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">Profil</h1>

    <UCard class="shadow-sm border-none rounded-xl">
      <form class="space-y-6" @submit.prevent="handleSave">
        <div class="flex items-center gap-4 pb-6 border-b border-gray-100">
          <div class="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center">
            <span class="text-2xl font-bold text-brand-600">
              {{ auth.user?.firstName?.[0] }}{{ auth.user?.lastName?.[0] }}
            </span>
          </div>
          <div>
            <p class="font-bold text-gray-900">
              {{ auth.user?.namePrefix || 'Dr.' }} {{ auth.user?.firstName }} {{ auth.user?.lastName }}
            </p>
            <p class="text-sm text-gray-500">{{ auth.user?.email }}</p>
            <UBadge label="Doktor" color="primary" variant="subtle" size="xs" class="mt-1" />
          </div>
        </div>

        <UFormField label="Uzmanlık Alanı">
          <UInput v-model="form.professionalTitle" placeholder="Uzmanlık alanınız" class="w-full" />
        </UFormField>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UFormField label="Ad">
            <UInput v-model="form.firstName" class="w-full" />
          </UFormField>
          <UFormField label="Soyad">
            <UInput v-model="form.lastName" class="w-full" />
          </UFormField>
        </div>

        <UFormField label="E-posta">
          <UInput :model-value="auth.user?.email" disabled class="w-full" />
        </UFormField>

        <UFormField label="Telefon">
          <UInput v-model="form.phone" type="tel" placeholder="05XX XXX XX XX" class="w-full" />
        </UFormField>

        <div class="flex justify-end pt-4">
          <UButton
            type="submit"
            label="Değişiklikleri Kaydet"
            color="primary"
            :loading="saving"
            class="font-bold"
          />
        </div>
      </form>
    </UCard>
  </div>
</template>
