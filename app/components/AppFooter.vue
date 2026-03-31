<template>
  <footer class="bg-gray-900 text-gray-400 py-12 mt-auto">
    <div class="layout-container grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <div class="text-white font-bold mb-4 uppercase">CEEMS PHOENİX</div>
        <p class="text-sm">
          Konuksever Mah. Gazi Bulvarı No:220 Muratpaşa/Antalya
        </p>
      </div>

      <div>
        <div class="text-white font-bold mb-4 uppercase">Hızlı Erişim</div>
        <div class="flex flex-col gap-2">
          <NuxtLink to="/products" class="text-gray-400 hover:text-white no-underline text-sm transition-colors">
            Ürünler
          </NuxtLink>
          <NuxtLink to="/contact" class="text-gray-400 hover:text-white no-underline text-sm transition-colors">
            İletişim
          </NuxtLink>
        </div>
      </div>

      <div>
        <div class="text-white font-bold mb-4 uppercase">Bize Ulaşın</div>
        <p class="text-sm">Tel: 0542 439 52 79</p>
        <p class="text-sm uppercase">E-posta: info@ceemsphoenix.com</p>
      </div>
    </div>
  </footer>
</template>
