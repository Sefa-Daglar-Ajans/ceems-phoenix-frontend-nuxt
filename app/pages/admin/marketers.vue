<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

// PDF 3. Maddeye göre Pazarlamacı / Referans verileri
const marketers = ref([
  { 
    id: 1, 
    firstName: 'Mehmet', 
    lastName: 'Öztürk', 
    email: 'mehmet@pazarlama.com', 
    phone: '05xx xxx xx xx',
    commissionRate: '%10',
    commissionAmount: '500 TL'
  }
])

const isModalOpen = ref(false)
const newMarketer = reactive({
  firstName: '', 
  lastName: '', 
  email: '', 
  phone: '', 
  password: '',
  commissionRate: '', 
  commissionAmount: ''
})

// HATAYI ENGELLEYEN SÜTUN TANIMLARI (id ve key beraber kullanıldı)
const columns = [
  { id: 'firstName', key: 'firstName', label: '3.1. ADI' },
  { id: 'lastName', key: 'lastName', label: '3.2. SOYADI' },
  { id: 'email', key: 'email', label: '3.3. E-POSTA' },
  { id: 'commissionRate', key: 'commissionRate', label: '3.6. KOMİSYON (%)' },
  { id: 'commissionAmount', key: 'commissionAmount', label: '3.7. KOMİSYON (TL)' },
  { id: 'actions', key: 'actions', label: 'İŞLEMLER' }
]
</script>

<template>
  <div class="space-y-6">
    <!-- Üst Başlık ve Aksiyon -->
    <div class="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tighter italic">3. Referanslar / Pazarlamacılar</h1>
        <p class="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Saha ekibini ve komisyon oranlarını yönetin</p>
      </div>
      <UButton
        icon="i-heroicons-user-plus"
        color="primary"
        size="lg"
        class="font-bold rounded-xl px-6 shadow-lg shadow-brand-500/10"
        @click="isModalOpen = true"
      >
        YENİ PAZARLAMACI EKLE
      </UButton>
    </div>

    <!-- Pazarlamacı Listesi Tablosu -->
    <UCard class="shadow-sm border-none overflow-hidden text-center">
      <ClientOnly>
        <UTable 
          :rows="marketers" 
          :columns="columns"
          :ui="{ td: { base: 'py-4' } }"
        >
          <template #actions-data="{ row }">
            <div class="flex gap-2">
              <UButton icon="i-heroicons-pencil-square" variant="ghost" color="neutral" size="sm" />
              <UButton icon="i-heroicons-trash" variant="ghost" color="error" size="sm" />
            </div>
          </template>
        </UTable>
      </ClientOnly>
    </UCard>

    <!-- YENİ PAZARLAMACI EKLEME MODALI (PDF 3.1 - 3.7 Maddeleri) -->
    <UModal v-model="isModalOpen">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-lg uppercase italic tracking-tighter">Referans / Pazarlamacı Tanımla</h3>
            <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark" @click="isModalOpen = false" />
          </div>
        </template>

        <div class="space-y-4 p-2">
          <!-- Kişisel Bilgiler -->
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="3.1. Adı">
              <UInput v-model="newMarketer.firstName" placeholder="Adı" />
            </UFormField>
            <UFormField label="3.2. Soyadı">
              <UInput v-model="newMarketer.lastName" placeholder="Soyadı" />
            </UFormField>
          </div>

          <UFormField label="3.3. E-Posta">
            <UInput v-model="newMarketer.email" type="email" placeholder="email@pazarlama.com" />
          </UFormField>

          <UFormField label="3.4. Telefon">
            <UInput v-model="newMarketer.phone" placeholder="05xx xxx xx xx" />
          </UFormField>

          <UFormField label="3.5. Şifre">
            <UInput v-model="newMarketer.password" type="password" placeholder="••••••••" />
          </UFormField>

          <!-- Komisyon Ayarları -->
          <div class="grid grid-cols-2 gap-4 bg-orange-50/50 p-4 rounded-xl border border-orange-100">
            <UFormField label="3.6. Komisyon Oranı (%)">
              <UInput v-model="newMarketer.commissionRate" placeholder="Örn: 10" />
            </UFormField>
            <UFormField label="3.7. Komisyon Tutarı (TL)">
              <UInput v-model="newMarketer.commissionAmount" placeholder="Örn: 500" />
            </UFormField>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton label="Vazgeç" color="neutral" variant="ghost" @click="isModalOpen = false" />
            <UButton label="Kaydet" color="primary" class="px-8 font-bold" @click="isModalOpen = false" />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>