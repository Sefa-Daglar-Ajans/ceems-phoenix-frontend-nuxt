<script setup lang="ts">
// Admin layout'u kullanıyoruz
definePageMeta({
  layout: 'admin'
})

// Ürün deposunu (Store) bağladık
const productStore = useProductStore()

// İstatistikleri dinamik hale getirdik
const stats = computed(() => [
  { 
    label: 'Toplam Ürün', 
    value: productStore.products.length, 
    icon: 'i-heroicons-shopping-bag', 
    color: 'text-blue-600' 
  },
  { 
    label: 'Aktif Siparişler', 
    value: '0', // Sipariş sistemi eklenince burası güncellenecek
    icon: 'i-heroicons-shopping-cart', 
    color: 'text-orange-600' 
  },
  { 
    label: 'En Yüksek Fiyat', 
    value: `${Math.max(...productStore.products.map(p => p.price || 0)).toLocaleString('tr-TR')} TL`, 
    icon: 'i-heroicons-banknotes', 
    color: 'text-brand-600' 
  },
  { 
    label: 'Yeni Mesajlar', 
    value: '3', 
    icon: 'i-heroicons-envelope', 
    color: 'text-purple-600' 
  },
])

// Son işlemleri dinamik bir liste gibi simüle ediyoruz
const recentActivities = [
  { id: 1, action: 'Sistem Güncellendi', detail: 'Admin paneli arayüzü aktif edildi.', time: 'Şimdi' },
  { id: 2, action: 'Stok Kontrolü', detail: 'Ürün listesi başarıyla yüklendi.', time: '10 dakika önce' },
  { id: 3, action: 'Giriş Yapıldı', detail: 'Admin oturumu başlatıldı.', time: '20 dakika önce' },
]
</script>

<template>
  <div class="space-y-8 font-sans">
    <div class="flex justify-between items-end">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">Genel Özet</h1>
        <p class="text-sm text-gray-500">Hoş geldiniz, CEEMS Phoenix yönetim sistemindesiniz.</p>
      </div>
      <div class="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-widest">
        OTURUM: AKTİF
      </div>
    </div>

    <!-- İstatistik Kartları -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard v-for="stat in stats" :key="stat.label" class="shadow-sm border-none hover:shadow-md transition-shadow">
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

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <!-- Son İşlemler Listesi -->
      <UCard class="shadow-sm border-none">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-gray-800 uppercase tracking-widest text-sm">Son Sistem Hareketleri</h3>
            <UIcon name="i-heroicons-clock" class="text-gray-400 size-5" />
          </div>
        </template>
        <div class="divide-y divide-gray-100">
          <div v-for="item in recentActivities" :key="item.id" class="py-4 flex justify-between items-start group">
            <div class="flex gap-3">
              <div class="w-2 h-2 rounded-full bg-brand-500 mt-2 group-hover:scale-150 transition-transform"></div>
              <div>
                <div class="font-bold text-sm text-gray-900">{{ item.action }}</div>
                <div class="text-xs text-gray-500">{{ item.detail }}</div>
              </div>
            </div>
            <div class="text-[10px] font-bold text-gray-400 uppercase">{{ item.time }}</div>
          </div>
        </div>
      </UCard>

      <!-- Hızlı Bağlantılar ve Kısayollar -->
      <UCard class="shadow-sm border-none bg-gray-900 text-white">
        <template #header>
          <h3 class="font-bold text-white uppercase tracking-widest text-sm">Hızlı İşlemler</h3>
        </template>
        <div class="grid grid-cols-2 gap-4">
          <UButton 
            to="/admin/products" 
            color="primary" 
            variant="solid" 
            icon="i-heroicons-plus" 
            block 
            class="py-3 font-bold uppercase text-xs"
          >
            Ürün Ekle
          </UButton>
          <UButton 
            to="/admin/settings" 
            color="white" 
            variant="ghost" 
            icon="i-heroicons-phone" 
            block 
            class="py-3 font-bold uppercase text-xs bg-white/5"
          >
            İletişim
          </UButton>
          <UButton 
            to="/" 
            target="_blank" 
            color="white" 
            variant="ghost" 
            icon="i-heroicons-arrow-top-right-on-square" 
            block 
            class="py-3 font-bold uppercase text-xs bg-white/5"
          >
            Siteyi Gör
          </UButton>
          <UButton 
            color="error" 
            variant="ghost" 
            icon="i-heroicons-power" 
            block 
            class="py-3 font-bold uppercase text-xs bg-red-500/10"
          >
            Çıkış Yap
          </UButton>
        </div>
        <div class="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
          <div class="text-[10px] text-gray-400 font-bold uppercase tracking-[2px] mb-2">Destek</div>
          <p class="text-xs text-gray-300 leading-relaxed italic">
            "Sistemle ilgili bir sorun yaşarsanız teknik ekiple iletişime geçin."
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>