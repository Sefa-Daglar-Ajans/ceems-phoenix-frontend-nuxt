<script setup lang="ts">
definePageMeta({ layout: 'panel', middleware: ['auth'] })
useHead({ title: 'Pazarlamacı Paneli - CEEMS Phoenix' })

const auth = useAuthStore()
if (auth.user && auth.user.role !== 'REFERRAL' && auth.user.role !== 'ADMIN') {
  navigateTo('/user')
}

const stats = ref([
  { label: 'Toplam Komisyon', value: '4.200 TL', icon: 'i-heroicons-banknotes', color: 'text-brand-600' },
  { label: 'Bu Ay Komisyon', value: '1.100 TL', icon: 'i-heroicons-chart-bar', color: 'text-blue-600' },
  { label: 'Yönlendirilen Doktor', value: '5', icon: 'i-heroicons-users', color: 'text-purple-600' },
  { label: 'Toplam Satış', value: '32', icon: 'i-heroicons-shopping-cart', color: 'text-orange-600' },
])

interface ReferredDoctor {
  id: number
  name: string
  specialty: string
  salesCount: number
  totalRevenue: number
  joinDate: string
}

const referredDoctors = ref<ReferredDoctor[]>([
  { id: 1, name: 'Dr. Ahmet Yılmaz', specialty: 'Üroloji', salesCount: 12, totalRevenue: 15600, joinDate: '2026-01-15' },
  { id: 2, name: 'Dr. Fatma Kaya', specialty: 'Jinekoloji', salesCount: 8, totalRevenue: 10400, joinDate: '2026-02-01' },
  { id: 3, name: 'Dr. Mehmet Demir', specialty: 'Dahiliye', salesCount: 7, totalRevenue: 8750, joinDate: '2026-02-20' },
  { id: 4, name: 'Dr. Ayşe Çelik', specialty: 'Endokrinoloji', salesCount: 3, totalRevenue: 3900, joinDate: '2026-03-10' },
  { id: 5, name: 'Dr. Emre Arslan', specialty: 'Kardiyoloji', salesCount: 2, totalRevenue: 2600, joinDate: '2026-03-25' },
])
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">
        Hoş geldiniz, {{ auth.user?.firstName }}
      </h1>
      <p class="text-sm text-gray-500 mt-1">Pazarlamacı panelinize genel bakış</p>
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

    <!-- Referred Doctors -->
    <UCard class="shadow-sm border-none">
      <template #header>
        <h2 class="font-bold text-sm text-gray-800 uppercase tracking-wide">Yönlendirilen Doktorlar</h2>
      </template>

      <div class="divide-y divide-gray-100">
        <div
          v-for="doctor in referredDoctors"
          :key="doctor.id"
          class="flex items-center justify-between py-4 first:pt-0 last:pb-0"
        >
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
              <span class="text-sm font-bold text-brand-600">{{ doctor.name.split(' ')[1]?.[0] }}</span>
            </div>
            <div>
              <p class="font-bold text-gray-900 text-sm">{{ doctor.name }}</p>
              <p class="text-xs text-gray-500">{{ doctor.specialty }}</p>
            </div>
          </div>
          <div class="flex items-center gap-6 text-sm">
            <div class="text-right hidden sm:block">
              <p class="text-gray-500">Satış</p>
              <p class="font-bold text-gray-900">{{ doctor.salesCount }}</p>
            </div>
            <div class="text-right">
              <p class="text-gray-500">Gelir</p>
              <p class="font-bold text-brand-600">{{ doctor.totalRevenue.toLocaleString('tr-TR') }} TL</p>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
