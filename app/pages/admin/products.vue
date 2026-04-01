<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

// Store bağlantısını kuruyoruz
const productStore = useProductStore()

// Tablo Sütun Tanımları (id zorunluluğu giderildi)
const columns = [
  { id: 'image', key: 'image', label: 'GÖRSEL' },
  { id: 'code', key: 'code', label: 'KOD' },
  { id: 'name', key: 'name', label: 'ÜRÜN ADI' },
  { id: 'price', key: 'price', label: 'FİYAT' },
  { id: 'actions', key: 'actions', label: 'İŞLEMLER' }
]

const isModalOpen = ref(false)
const editingProduct = ref<any>({
  id: null, name: '', series: '', code: '', description: '', image: '', slogan: '', content: '', price: 0
})

const openEditModal = (product: any) => {
  editingProduct.value = { ...product }
  isModalOpen.value = true
}

const saveProduct = () => {
  if (editingProduct.value.id) {
    productStore.updateProduct(editingProduct.value)
  } else {
    productStore.addProduct(editingProduct.value)
  }
  isModalOpen.value = false
}
</script>

<template>
  <div class="space-y-6">
    <!-- Üst Başlık -->
    <div class="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div class="text-left">
        <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tighter italic">5. Ürün Yönetimi</h1>
        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-[2px]">Mevcut Ürün Sayısı: {{ productStore.products.length }}</p>
      </div>
      <UButton
        icon="i-heroicons-plus-circle"
        color="primary"
        class="font-bold px-6 py-3 rounded-xl shadow-lg shadow-brand-500/20"
        @click="editingProduct = { id: null, name: '', series: '', code: '', description: '', image: '', slogan: '', content: '', price: 0 }; isModalOpen = true"
      >
        YENİ ÜRÜN EKLE
      </UButton>
    </div>

    <!-- Ürün Listesi Tablosu -->
    <UCard class="shadow-sm border-none overflow-hidden text-center">
      <ClientOnly>
        <!-- Eğer veri yoksa uyarı ver -->
        <div v-if="productStore.products.length === 0" class="p-20 text-center text-gray-400 italic">
          Katalogda henüz ürün bulunmuyor.
        </div>
        
        <UTable 
          v-else
          :rows="productStore.products" 
          :columns="columns"
          :ui="{ td: { base: 'py-4 text-center' }, th: { base: 'text-center uppercase text-[10px] tracking-widest' } }"
        >
          <!-- Görsel -->
          <template #image-data="{ row }">
            <NuxtImg :src="row.image" class="w-12 h-12 rounded-lg object-cover bg-gray-50 border mx-auto" />
          </template>

          <!-- Fiyat -->
          <template #price-data="{ row }">
            <span class="font-bold text-brand-600">{{ row.price }} TL</span>
          </template>

          <!-- Aksiyonlar -->
          <template #actions-data="{ row }">
            <div class="flex gap-2 justify-center">
              <UButton icon="i-heroicons-pencil-square" variant="soft" color="primary" @click="openEditModal(row)" />
              <UButton icon="i-heroicons-trash" variant="ghost" color="error" @click="productStore.deleteProduct(row.id)" />
            </div>
          </template>
        </UTable>
      </ClientOnly>
    </UCard>

    <!-- ÜRÜN DÜZENLEME MODALI -->
    <UModal v-model="isModalOpen" fullscreen>
      <UCard :ui="{ base: 'h-full flex flex-col', body: { base: 'flex-1 overflow-y-auto' } }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-lg uppercase italic tracking-tighter">Ürün Detay Yönetimi</h3>
            <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark" size="xl" @click="isModalOpen = false" />
          </div>
        </template>

        <div class="max-w-5xl mx-auto p-10 w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="space-y-6 text-left">
             <UFormField label="5.1. Ürün Adı"><UInput v-model="editingProduct.name" /></UFormField>
             <div class="grid grid-cols-2 gap-4">
               <UFormField label="5.2. Ürün Serisi"><UInput v-model="editingProduct.series" /></UFormField>
               <UFormField label="5.3. Ürün Kodu"><UInput v-model="editingProduct.code" /></UFormField>
             </div>
             <UFormField label="5.8. Fiyat (TL)"><UInput v-model="editingProduct.price" type="number" /></UFormField>
             <UFormField label="5.5. Görsel URL"><UInput v-model="editingProduct.image" /></UFormField>
             <UFormField label="5.6. Ürün Sloganı"><UInput v-model="editingProduct.slogan" /></UFormField>
          </div>
          <div class="space-y-6 text-left">
            <UFormField label="5.4. Ürün Açıklaması">
              <UTextarea v-model="editingProduct.description" :rows="3" />
            </UFormField>
            <UFormField label="5.7. Ürün İçeriği">
              <UTextarea v-model="editingProduct.content" :rows="10" />
            </UFormField>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3 px-10">
            <UButton label="Vazgeç" color="neutral" variant="ghost" @click="isModalOpen = false" />
            <UButton label="Kataloğu Güncelle" color="primary" class="px-12 font-bold shadow-xl" @click="saveProduct" />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>