<template>
  <footer class="bg-gray-900 text-gray-400 py-16 mt-auto border-t border-gray-800 relative">
    <div class="layout-container grid grid-cols-1 md:grid-cols-3 gap-12">
      <!-- 1. Sütun: Kurumsal Bilgi -->
      <div>
        <div class="text-white font-bold mb-6 uppercase tracking-widest flex items-center gap-2">
          <span class="w-2 h-8 bg-brand-600 rounded-full"></span>
          CEEMS PHOENİX
        </div>
        <p class="text-sm leading-relaxed mb-4">
          Konuksever Mah. Gazi Bulvarı No:220 <br>
          Muratpaşa / Antalya
        </p>
        <p class="text-xs text-gray-600 mt-4 italic">"Zamanı Durduramıyor, Bilimin Rehberliğinde Çözümü Hızlandırıyoruz."</p>
      </div>

      <!-- 2. Sütun: Hızlı Erişim -->
      <div>
        <div class="text-white font-bold mb-6 uppercase tracking-widest">Hızlı Erişim</div>
        <div class="flex flex-col gap-3">
          <NuxtLink to="/" class="text-gray-400 hover:text-brand-500 no-underline text-sm transition-colors flex items-center gap-2">
            <UIcon name="i-heroicons-chevron-right" class="size-3" /> Ana Sayfa
          </NuxtLink>
          <NuxtLink to="/products" class="text-gray-400 hover:text-brand-500 no-underline text-sm transition-colors flex items-center gap-2">
            <UIcon name="i-heroicons-chevron-right" class="size-3" /> Ürünler
          </NuxtLink>
          <NuxtLink to="/about" class="text-gray-400 hover:text-brand-500 no-underline text-sm transition-colors flex items-center gap-2">
            <UIcon name="i-heroicons-chevron-right" class="size-3" /> Hakkımızda
          </NuxtLink>
          <NuxtLink to="/contact" class="text-gray-400 hover:text-brand-500 no-underline text-sm transition-colors flex items-center gap-2">
            <UIcon name="i-heroicons-chevron-right" class="size-3" /> İletişim
          </NuxtLink>
        </div>
      </div>

      <!-- 3. Sütun: İletişim ve Sosyal Medya -->
      <div>
        <div class="text-white font-bold mb-6 uppercase tracking-widest">Bize Ulaşın</div>
        <div class="space-y-3 mb-6">
          <p class="text-sm flex items-center gap-3 font-medium">
            <UIcon name="i-heroicons-phone" class="text-brand-500 size-5" /> 
            0533 270 26 04
          </p>
          <p class="text-sm flex items-center gap-3 lowercase">
            <UIcon name="i-heroicons-envelope" class="text-brand-500 size-5" /> 
            info@ceemsphoenix.com
          </p>
        </div>

        <!-- Sosyal Medya Butonları -->
        <div class="flex items-center gap-4">
          <UButton
            icon="i-simple-icons-instagram"
            to="https://www.instagram.com/ceemsphoenix/"
            target="_blank"
            color="white"
            variant="ghost"
            class="hover:text-pink-500 transition-colors bg-white/5"
            size="xl"
          />
          <UButton
            icon="i-simple-icons-whatsapp"
            to="https://wa.me/905332702604"
            target="_blank"
            color="white"
            variant="ghost"
            class="hover:text-green-500 transition-colors bg-white/5"
            size="xl"
          />
        </div>
      </div>
    </div>

    <!-- Alt Çizgi -->
    <div class="layout-container mt-12 pt-8 border-t border-gray-800 text-center">
      <p class="text-xs text-gray-500 uppercase tracking-widest">
        &copy; {{ new Date().getFullYear() }} CEEMS PHOENIX BİYOTEKNOLOJİ SAN. VE TİC. A.Ş.
      </p>
    </div>

    <!-- YÜZEN WHATSAPP BUTONU -->
    <div class="fixed bottom-6 right-6 z-[999] group">
      <div class="absolute -inset-2 bg-green-500/20 rounded-full blur-xl group-hover:bg-green-500/40 transition-all duration-500 animate-pulse"></div>
      <UButton
        icon="i-simple-icons-whatsapp"
        to="https://wa.me/905332702604"
        target="_blank"
        size="xl"
        class="relative rounded-full shadow-2xl p-4 bg-green-600 hover:bg-green-500 text-white transform hover:scale-110 transition-all duration-300 border-2 border-white/20"
      >
        <template #trailing>
           <span class="absolute -top-1 -right-1 flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        </template>
      </UButton>
    </div>
  </footer>
</template>

<style scoped>
/* Nuxt UI ile çakışmaması için basit bir layout-container garantisi */
.layout-container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
</style>