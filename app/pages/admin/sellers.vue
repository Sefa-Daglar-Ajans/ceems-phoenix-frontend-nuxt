<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

// PDF 2. Maddeye göre Satıcı / Doktor verileri
const sellers = ref([
  { 
    id: 1, 
    prefix: 'Dr.', 
    firstName: 'Doğan', 
    lastName: 'Ceylan', 
    title: 'Ürolog', 
    email: 'dogan@ceemsphoenix.com',
    discountCode: 'DOC20' 
  }
])

const isModalOpen = ref(false)
const newSeller = reactive({
  firstName: '', lastName: '', prefix: '', title: '', gender: '',
  email: '', password: '', phone: '',
  discountCode: '', discountRate: '', discountAmount: ''
})

// HATAYI ÇÖZEN SÜTUN TANIMLARI (Her birine benzersiz id eklendi)
const columns = [
  { id: 'prefix', key: 'prefix', label: '2.3. ÖN EK' },
  { id: 'firstName', key: 'firstName', label: '2.1. ADI' },
  { id: 'lastName', key: 'lastName', label: '2.2. SOYADI' },
  { id: 'title', key: 'title', label: '2.4. ÜNVAN' },
  { id: 'discountCode', key: 'discountCode', label: '2.9. İNDİRİM KODU' },
  { id: 'actions', key: 'actions', label: 'İŞLEMLER' }
]
</script>

<template>
  <div class="space-y-6">
    <!-- Üst Başlık -->
    <div class="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tighter italic">2. Satıcılar / Doktorlar</h1>
        <p class="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Yetkili satış noktalarını ve doktorları yönetin</p>
      </div>
      <UButton
        icon="i-heroicons-user-plus"
        color="primary"
        size="lg"
        class="font-bold rounded-xl px-6"
        @click="isModalOpen = true"
      >
        YENİ KAYIT EKLE
      </UButton>
    </div>

    <!-- Satıcı Listesi Tablosu -->
    <UCard class="shadow-sm border-none overflow-hidden">
      <ClientOnly>
        <UTable 
          :rows="sellers" 
          :columns="columns"
        >
          <template #actions-data="{ row }">
            <div class="flex gap-2">
              <UButton icon="i-heroicons-pencil" variant="ghost" color="neutral" size="sm" />
              <UButton icon="i-heroicons-trash" variant="ghost" color="error" size="sm" />
            </div>
          </template>
        </UTable>
      </ClientOnly>
    </UCard>

    <!-- YENİ SATICI EKLEME MODALI (PDF 2.1 - 2.11 Maddelerini Kapsar) -->
    <UModal v-model="isModalOpen" fullscreen>
      <UCard :ui="{ base: 'h-full flex flex-col', body: { base: 'flex-1 overflow-y-auto' } }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-lg uppercase italic tracking-tighter">Yeni Satıcı / Doktor Kaydı</h3>
            <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark" @click="isModalOpen = false" />
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <!-- Kişisel Bilgiler -->
          <UFormField label="2.3. İsim Ön Eki"><UInput v-model="newSeller.prefix" placeholder="Örn: Dr. / Uzm." /></UFormField>
          <UFormField label="2.1. Adı"><UInput v-model="newSeller.firstName" /></UFormField>
          <UFormField label="2.2. Soyadı"><UInput v-model="newSeller.lastName" /></UFormField>
          <UFormField label="2.4. Unvan"><UInput v-model="newSeller.title" /></UFormField>
          <UFormField label="2.5. Cinsiyet"><USelect v-model="newSeller.gender" :options="['Erkek', 'Kadın']" /></UFormField>
          
          <!-- İletişim & Güvenlik -->
          <UFormField label="2.6. E-Posta"><UInput v-model="newSeller.email" type="email" /></UFormField>
          <UFormField label="2.7. Şifre"><UInput v-model="newSeller.password" type="password" /></UFormField>
          <UFormField label="2.8. Telefon"><UInput v-model="newSeller.phone" /></UFormField>

          <!-- Satış & İndirim Ayarları (Mavi kutu içine aldık ki ayrılsın) -->
          <div class="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50/50 p-6 rounded-2xl border border-blue-100 mt-4">
            <div class="md:col-span-3 font-bold text-blue-800 text-sm mb-2 uppercase tracking-widest">İndirim ve Kod Tanımları</div>
            <UFormField label="2.9. Ürün İndirim Kodu"><UInput v-model="newSeller.discountCode" placeholder="Örn: PHOENIX20" /></UFormField>
            <UFormField label="2.10. İndirim Oranı (%)"><UInput v-model="newSeller.discountRate" type="number" /></UFormField>
            <UFormField label="2.11. İndirim Tutarı (TL)"><UInput v-model="newSeller.discountAmount" type="number" /></UFormField>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3 px-6">
            <UButton label="İptal" color="neutral" variant="ghost" @click="isModalOpen = false" />
            <UButton label="Sisteme Kaydet" color="primary" class="px-10 font-bold" @click="isModalOpen = false" />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>