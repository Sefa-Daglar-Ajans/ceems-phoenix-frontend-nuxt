<script setup lang="ts">
definePageMeta({ layout: 'panel', middleware: ['auth'] })
useHead({ title: 'Doktor Paneli - CEEMS Phoenix' })

const auth = useAuthStore()

if (auth.user && auth.user.role !== 'DOCTOR' && auth.user.role !== 'ADMIN') {
  navigateTo('/user')
}

const stats = ref([
  { label: 'Toplam Satış', value: '47', icon: 'i-heroicons-shopping-cart', color: 'text-blue-600' },
  { label: 'Aylık Satış', value: '12', icon: 'i-heroicons-chart-bar', color: 'text-brand-600' },
  { label: 'Aktif İndirim Kodu', value: '1', icon: 'i-heroicons-ticket', color: 'text-purple-600' },
  { label: 'Bu Ay Gelir', value: '15.600 TL', icon: 'i-heroicons-banknotes', color: 'text-orange-600' },
])

const discountCode = ref({
  code: 'DR-PHOENIX-10',
  discount: 10,
  usageCount: 47,
  isActive: true,
})
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">
        Hoş geldiniz, {{ auth.user?.namePrefix || 'Dr.' }} {{ auth.user?.firstName }}
      </h1>
      <p class="text-sm text-gray-500 mt-1">Doktor panelinize genel bakış</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard v-for="stat in stats" :key="stat.label" class="shadow-sm border-none">
        <div class="flex items-center gap-4">
          <div :class="['p-3 rounded-xl bg-gray-50', stat.color]">
            <UIcon :name="stat.icon" class="size-6" />
          </div>
          <div>
            <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ stat.label }}</div>
            <div class="text-2xl font-bold text-gray-900 leading-none mt-1">{{ stat.value }}</div>
          </div>
        </div>
      </UCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Discount Code Card -->
      <UCard class="shadow-sm border-none">
        <template #header>
          <h2 class="font-bold text-sm text-gray-800 uppercase tracking-wide">İndirim Kodunuz</h2>
        </template>
        <div class="space-y-4">
          <div class="bg-brand-50 border border-brand-200 rounded-xl p-6 text-center">
            <p class="text-3xl font-bold text-brand-700 font-display tracking-wider">{{ discountCode.code }}</p>
            <p class="text-sm text-brand-600 mt-2">%{{ discountCode.discount }} indirim</p>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Kullanım Sayısı</span>
            <span class="font-bold text-gray-900">{{ discountCode.usageCount }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Durum</span>
            <UBadge
              :label="discountCode.isActive ? 'Aktif' : 'Pasif'"
              :color="discountCode.isActive ? 'success' : 'neutral'"
              variant="subtle"
            />
          </div>
        </div>
      </UCard>

      <!-- Quick Links -->
      <UCard class="shadow-sm border-none">
        <template #header>
          <h2 class="font-bold text-sm text-gray-800 uppercase tracking-wide">Hızlı İşlemler</h2>
        </template>
        <div class="space-y-3">
          <UButton
            to="/doctor/orders"
            label="Siparişleri Görüntüle"
            icon="i-heroicons-shopping-cart"
            color="primary"
            variant="soft"
            block
            class="justify-start font-semibold"
          />
          <UButton
            to="/doctor/profile"
            label="Profili Düzenle"
            icon="i-heroicons-user"
            color="neutral"
            variant="soft"
            block
            class="justify-start font-semibold"
          />
        </div>
      </UCard>
    </div>
  </div>
</template>
