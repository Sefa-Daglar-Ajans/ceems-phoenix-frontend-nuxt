<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const adminUsers = ref([
  { id: 1, firstName: 'Sefa', lastName: 'Dağlar', email: 'admin@ceemsphoenix.com', phone: '0533 000 00 00' }
])

const isModalOpen = ref(false)
const columns = [
  { id: 'firstName', key: 'firstName', label: 'AD' },
  { id: 'lastName', key: 'lastName', label: 'SOYAD' },
  { id: 'email', key: 'email', label: 'E-POSTA' },
  { id: 'phone', key: 'phone', label: 'TELEFON' },
  { id: 'actions', key: 'actions', label: '' }
]
</script>

<template>
  <div class="space-y-6">
    <!-- HEADER -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Adminler</h1>
        <p class="text-sm text-gray-500 font-medium mt-1">Sistem yetkililerini yönetin.</p>
      </div>
      <UButton
        label="Yeni Kayıt"
        icon="i-heroicons-plus"
        size="lg"
        color="primary"
        class="rounded-xl font-bold px-6 shadow-lg shadow-emerald-500/20"
        @click="isModalOpen = true"
      />
    </div>

    <!-- TABLE -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <UTable 
        :rows="adminUsers" 
        :columns="columns"
        :ui="{ 
          th: { base: 'text-[10px] font-black text-gray-400 uppercase tracking-widest p-4' },
          td: { base: 'text-sm font-semibold text-gray-700 p-4' }
        }"
      >
        <template #actions-data>
          <div class="flex justify-end gap-1">
            <UButton icon="i-heroicons-pencil" variant="ghost" color="neutral" />
            <UButton icon="i-heroicons-trash" variant="ghost" color="error" />
          </div>
        </template>
      </UTable>
    </div>

    <!-- MODAL (Apple Style) -->
    <UModal v-model="isModalOpen">
      <div class="p-0 overflow-hidden bg-white rounded-3xl shadow-2xl">
        <!-- Modal Başlık -->
        <div class="bg-gray-50 p-6 border-b flex justify-between items-center">
          <h3 class="font-bold text-lg uppercase tracking-tighter italic">Yeni Yetkili Tanımla</h3>
          <UButton icon="i-heroicons-x-mark" variant="ghost" color="neutral" @click="isModalOpen = false" />
        </div>

        <!-- Form Alanı -->
        <div class="p-8 space-y-5">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-bold text-gray-400 uppercase ml-1">Adı</label>
              <UInput placeholder="Örn: Sefa" variant="outline" class="clean-input" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-bold text-gray-400 uppercase ml-1">Soyadı</label>
              <UInput placeholder="Örn: Dağlar" variant="outline" class="clean-input" />
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-bold text-gray-400 uppercase ml-1">E-Posta</label>
            <UInput placeholder="admin@ceemsphoenix.com" variant="outline" class="clean-input" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-bold text-gray-400 uppercase ml-1">Şifre</label>
            <UInput type="password" placeholder="••••••••" variant="outline" class="clean-input" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-bold text-gray-400 uppercase ml-1">Telefon</label>
            <UInput placeholder="0533 000 00 00" variant="outline" class="clean-input" />
          </div>

          <div class="pt-4">
            <UButton
              label="Kaydı Tamamla"
              block
              size="xl"
              color="primary"
              class="rounded-xl font-bold py-4 shadow-xl shadow-emerald-500/30"
              @click="isModalOpen = false"
            />
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>

<style scoped>
/* Siyah kutuları ve garip gölgeleri öldüren CSS */
.clean-input :deep(input) {
  background-color: #ffffff !important;
  border-radius: 12px !important;
  color: #1e293b !important;
  padding: 12px 16px !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: none !important;
  font-weight: 600 !important;
}

.clean-input :deep(input:focus) {
  border-color: #10b981 !important;
  ring: 0 !important;
  background-color: #ffffff !important;
}

/* Modal arka plan karartmasını temizle */
:deep(.u-modal-overlay) {
  backdrop-filter: blur(4px);
  background-color: rgba(0,0,0,0.3);
}
</style>