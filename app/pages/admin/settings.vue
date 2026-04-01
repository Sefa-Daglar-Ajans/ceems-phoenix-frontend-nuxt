<script setup lang="ts">
definePageMeta({ layout: 'panel', middleware: ['auth'] })
useHead({ title: 'Site Ayarları - Admin Paneli' })

const toast = useToast()
const saving = ref(false)

interface Setting {
  key: string
  label: string
  value: string
  type: 'text' | 'textarea' | 'email' | 'tel'
}

const settings = ref<Setting[]>([
  { key: 'site_name', label: 'Site Adı', value: 'CEEMS Phoenix', type: 'text' },
  { key: 'site_description', label: 'Site Açıklaması', value: 'Yeni nesil sağlık teknolojisi ürünleri', type: 'text' },
  { key: 'contact_email', label: 'İletişim E-posta', value: 'info@ceemsphoenix.com', type: 'email' },
  { key: 'contact_phone', label: 'İletişim Telefon', value: '0542 439 52 79', type: 'tel' },
  { key: 'address', label: 'Adres', value: 'Konuksever Mah. Gazi Bulvarı No:220 Muratpaşa/Antalya', type: 'textarea' },
  { key: 'about_text', label: 'Hakkında Metni', value: 'CEEMS PHOENİX, yüksek biyoyararlanıma sahip Mito serisi formülleriyle sağlığınızı ve yaşam kalitenizi en üst seviyeye taşır.', type: 'textarea' },
  { key: 'instagram_url', label: 'Instagram', value: 'https://instagram.com/ceemsphoenix', type: 'text' },
  { key: 'whatsapp_number', label: 'WhatsApp Numarası', value: '+905424395279', type: 'tel' },
])

async function handleSave() {
  saving.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    toast.add({ title: 'Ayarlar kaydedildi', description: 'Tüm değişiklikler başarıyla uygulandı.', color: 'success' })
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">Site Ayarları</h1>
        <p class="text-sm text-gray-500 mt-1">Genel site ayarlarını düzenleyin</p>
      </div>
      <UButton
        label="Kaydet"
        icon="i-heroicons-check"
        color="primary"
        :loading="saving"
        class="font-bold"
        @click="handleSave"
      />
    </div>

    <div class="max-w-2xl space-y-4">
      <UCard
        v-for="setting in settings"
        :key="setting.key"
        class="shadow-sm border-none rounded-xl"
      >
        <UFormField :label="setting.label">
          <UTextarea
            v-if="setting.type === 'textarea'"
            v-model="setting.value"
            :rows="3"
            class="w-full"
          />
          <UInput
            v-else
            v-model="setting.value"
            :type="setting.type"
            class="w-full"
          />
        </UFormField>
      </UCard>
    </div>

    <div class="max-w-2xl flex justify-end pt-4">
      <UButton
        label="Tüm Ayarları Kaydet"
        color="primary"
        size="xl"
        :loading="saving"
        class="font-bold"
        @click="handleSave"
      />
    </div>
  </div>
</template>
