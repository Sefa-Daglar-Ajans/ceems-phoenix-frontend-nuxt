<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

// PDF 4. Maddeye göre Müşteri / Tüketici verileri
const customers = ref([
  { 
    id: 1, 
    firstName: 'Ahmet', 
    lastName: 'Yılmaz', 
    gender: 'Erkek',
    email: 'ahmet@email.com', 
    phone: '05xx xxx xx xx',
    birthDate: '1990-01-01'
  }
])

const isModalOpen = ref(false)
const newCustomer = reactive({
  firstName: '', 
  lastName: '', 
  gender: '',
  birthDate: '',
  email: '', 
  phone: '', 
  password: '',
  billingAddress: '', // 4.8.1
  deliveryAddress: '' // 4.8.2
})

// HATAYI ENGELLEYEN SÜTUN TANIMLARI
const columns = [
  { id: 'firstName', key: 'firstName', label: '4.1. ADI' },
  { id: 'lastName', key: 'lastName', label: '4.2. SOYADI' },
  { id: 'email', key: 'email', label: '4.5. E-POSTA' },
  { id: 'phone', key: 'phone', label: '4.6. TELEFON' },
  { id: 'birthDate', key: 'birthDate', label: '4.4. DOĞUM TARİHİ' },
  { id: 'actions', key: 'actions', label: 'İŞLEMLER' }
]
</script>

<template>
  <div class="space-y-6 font-sans">
    <!-- Üst Başlık ve Aksiyon -->
    <div class="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tighter italic">4. Müşteriler / Tüketiciler</h1>
        <p class="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1 italic">Müşteri veri tabanı ve adres bilgilerini yönetin</p>
      </div>
      <UButton
        icon="i-heroicons-user-group"
        color="primary"
        size="lg"
        class="font-bold rounded-xl px-6"
        @click="isModalOpen = true"
      >
        YENİ MÜŞTERİ EKLE
      </UButton>
    </div>

    <!-- Müşteri Listesi Tablosu -->
    <UCard class="shadow-sm border-none overflow-hidden">
      <ClientOnly>
        <UTable 
          :rows="customers" 
          :columns="columns"
          :ui="{ td: { base: 'py-4' } }"
        >
          <template #actions-data="{ row }">
            <div class="flex gap-2">
              <UButton icon="i-heroicons-eye" variant="ghost" color="neutral" size="sm" />
              <UButton icon="i-heroicons-pencil-square" variant="ghost" color="neutral" size="sm" />
              <UButton icon="i-heroicons-trash" variant="ghost" color="error" size="sm" />
            </div>
          </template>
        </UTable>
      </ClientOnly>
    </UCard>

    <!-- YENİ MÜŞTERİ EKLEME MODALI (PDF 4.1 - 4.8.2 Maddeleri) -->
    <UModal v-model="isModalOpen" fullscreen>
      <UCard :ui="{ base: 'h-full flex flex-col', body: { base: 'flex-1 overflow-y-auto' } }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-lg uppercase italic tracking-tighter">Müşteri / Tüketici Kayıt Formu</h3>
            <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark" @click="isModalOpen = false" />
          </div>
        </template>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 max-w-6xl mx-auto w-full">
          <!-- Sol Sütun: Temel Bilgiler -->
          <div class="space-y-6">
            <div class="text-sm font-bold text-brand-600 uppercase tracking-widest border-l-4 border-brand-500 pl-3">Kişisel Bilgiler</div>
            <div class="grid grid-cols-2 gap-4">
              <UFormField label="4.1. Adı"><UInput v-model="newCustomer.firstName" /></UFormField>
              <UFormField label="4.2. Soyadı"><UInput v-model="newCustomer.lastName" /></UFormField>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <UFormField label="4.3. Cinsiyet"><USelect v-model="newCustomer.gender" :options="['Erkek', 'Kadın', 'Diğer']" /></UFormField>
              <UFormField label="4.4. Doğum Tarihi"><UInput v-model="newCustomer.birthDate" type="date" /></UFormField>
            </div>
            <UFormField label="4.5. E-Posta"><UInput v-model="newCustomer.email" type="email" /></UFormField>
            <UFormField label="4.6. Telefon"><UInput v-model="newCustomer.phone" /></UFormField>
            <UFormField label="4.7. Şifre"><UInput v-model="newCustomer.password" type="password" /></UFormField>
          </div>

          <!-- Sağ Sütun: Adres Bilgileri (4.8) -->
          <div class="space-y-6">
            <div class="text-sm font-bold text-brand-600 uppercase tracking-widest border-l-4 border-brand-500 pl-3">4.8. Adres Bilgileri</div>
            <UFormField label="4.8.1. Fatura Adresleri">
              <UTextarea v-model="newCustomer.billingAddress" :rows="4" placeholder="Fatura adresi detaylarını girin..." />
            </UFormField>
            <UFormField label="4.8.2. Teslimat Adresleri">
              <UTextarea v-model="newCustomer.deliveryAddress" :rows="4" placeholder="Teslimat adresi detaylarını girin..." />
            </UFormField>
            <div class="p-4 bg-gray-50 rounded-xl border border-gray-100 text-[11px] text-gray-500 italic">
              Not: Birden fazla adres eklemek için adresleri ayırarak giriniz.
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3 px-8">
            <UButton label="Vazgeç" color="neutral" variant="ghost" @click="isModalOpen = false" />
            <UButton label="Müşteriyi Kaydet" color="primary" class="px-10 font-bold" @click="isModalOpen = false" />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>