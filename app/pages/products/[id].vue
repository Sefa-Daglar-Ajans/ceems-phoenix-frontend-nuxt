<script setup lang="ts">
const route = useRoute()
const cartStore = useCartStore()

// Bilimsel içerik datası
const productDetails: any = {
  'mitoviora': {
    title: 'MitoViora-XY',
    tagline: '“Hücresel Enerjinin Temeli”',
    englishTagline: 'Cellular Bioenergetic Foundation',
    motto: 'Power the Cell. Prepare for Life.',
    meanings: [
      { key: 'Mito', val: 'Mitokondri, ATP üretimi, redoks dengesi, metabolik kapasite ve hücresel biyogenez.' },
      { key: 'Viora', val: 'Yaşam enerjisi, hücresel canlılık, biyolojik süreklilik ve üreme potansiyelinin biyokimyasal temeli.' },
      { key: 'XY', val: 'Kadın ve erkek biyolojisinin ortak hücresel enerji platformu.' }
    ],
    definition: 'Oosit ve sperm hücresinde mitokondriyal fonksiyonun, ATP üretim kapasitesinin ve redoks dengesinin optimize edilmesi yoluyla fertiliteye hazırlık sürecinin desteklenmesi.',
    aims: [
      'Mitokondriyal biyogenez aktivasyonunun desteklenmesi',
      'ATP sentez kapasitesinin güçlendirilmesi',
      'NAD⁺ havuzunun korunması',
      'Oksidatif stres yükünün dengelenmesi',
      'mtDNA bütünlüğünün desteklenmesi'
    ],
    summary: 'MitoViora-XY, mitokondriyal enerji metabolizmasının temel kofaktörlerini sağlayarak hem oosit hem de sperm hücresinde biyolojik performansın optimize edilmesine yönelik tasarlanmış hücresel bir platform formülüdür.'
  },
  'mitoregenix': {
    title: 'MitoRegenix-XY',
    tagline: '“Hücresel Yenilenmenin Bilimi”',
    englishTagline: 'Systemic Mitochondrial Rejuvenation',
    motto: 'Reignite the Power Within.',
    meanings: [
      { key: 'Mito', val: 'Mitokondri; ATP üretimi, biyolojik yaşlanma ve hücresel dayanıklılığın merkezidir.' },
      { key: 'Regenix', val: 'Rejenerasyon, biyogenez ve hücresel onarımı temsil eder.' }
    ],
    definition: 'MitoRegenix-XY; mitokondriyal biyogenez, sirtuin sinyallemesi ve oksidatif stres regülasyonu ekseninde hücresel yenilenmeyi destekler.',
    aims: [
      'Mitokondriyal yoğunluğun artırılması',
      'NAD⁺ döngüsünün korunması',
      'Sirtuin aktivasyon ekseninin desteklenmesi',
      'Mitokondriyal Otofaji’nin sağlanması'
    ],
    summary: 'Elektron transport zinciri kofaktörleri ve polifenol bazlı sinyal düzenleyicilerin sinerjik kombinasyonu üzerine inşa edilmiştir.',
    extraSections: [
      { label: 'Yenilenme ve Rejenerasyon', items: 'NMN, PQQ, Ubiquinol, ALA, Resveratrol, NADH, Spermidin, MCT' },
      { label: 'Oksidatif Stres Azaltımı', items: 'Glutatyon, Selenyum, Çinko, Vitamin C, Vitamin E' },
      { label: 'DNA Onarımı', items: 'Metilfolat, Metilkobalamin, P-5-P, TMG, Spermidin' }
    ]
  },
  'mitoova': {
    title: 'MitoOva-XX',
    tagline: '“Oosit (Yumurta) Enerjisini Destekleyen Mitokondriyal Güç”',
    englishTagline: 'Mitochondrial Optimization of Ovum Activity',
    meanings: [
      { key: 'Ova', val: 'Ovum, Oosit, Kadın Üreme Hücremiz.' },
      { key: 'XX', val: 'Biyolojik kadın üreme kromozomu.' }
    ],
    aims: [
      'Mitokondriyal Otofaji ve biyogenez artışı',
      'ATP Üretim kapasitesinin desteklenmesi',
      'Ooosit Maturasyonu ve embriyo kalitesi iyileştirilmesi'
    ],
    summary: 'MitoOva, kadın fertilitesinde temel belirleyici olan mitokondriyal fonksiyonu hedefler.'
  },
  'mitoandro': {
    title: 'MitoAndro-XY',
    tagline: '“Sperm Enerjisini Destekleyen Mitokondriyal Güç”',
    englishTagline: 'Mitochondrial Optimization of Sperm Function',
    motto: 'Rebuild Mitochondria. Restore Fertility',
    meanings: [
      { key: 'Andro', val: 'Androjenik denge, Erkek üreme hücresi fonksiyonu.' },
      { key: 'XY', val: 'Erkek biyolojik kromozom yapısı.' }
    ],
    aims: [
      'Sperm motilite ve membran potansiyelinin iyileştirilmesi',
      'mtDNA bütünlüğünün korunması',
      'NAD⁺ havuzunun güçlendirilmesi'
    ],
    summary: 'Sperm motilitesi doğrudan ATP üretimine bağlıdır. MitoAndro, fertilite kapasitesini biyokimyasal düzeyde optimize eder.'
  }
}

const product = productDetails[route.params.id as string]

if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Ürün bulunamadı' })
}

useHead({ title: `${product.title} - CEEMS Phoenix` })
</script>

<template>
  <div class="bg-white min-h-screen pb-20">
    <!-- Ürün Hero -->
    <section class="bg-gray-50 py-20 border-b">
      <div class="layout-container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <UBadge color="primary" variant="subtle" size="lg" class="mb-4">{{ product.motto || 'PHOENİX MİTO SERİSİ' }}</UBadge>
            <h1 class="text-5xl font-bold text-gray-900 mb-2">{{ product.title }}</h1>
            <p class="text-2xl text-brand-600 font-medium italic mb-6">{{ product.tagline }}</p>
            <p class="text-gray-500 uppercase tracking-widest text-sm mb-8">{{ product.englishTagline }}</p>
            
            <div class="flex gap-4">
               <UButton size="xl" color="primary" @click="cartStore.addToCart({ id: route.params.id, name: product.title, price: 1250, image: `/images/${route.params.id}.jpg` })">
                 SEPETE EKLE
               </UButton>
            </div>
          </div>
          <div class="flex justify-center">
            <NuxtImg :src="`/images/${route.params.id}.jpg`" :alt="product.title" class="rounded-3xl shadow-2xl max-w-md w-full" />
          </div>
        </div>
      </div>
    </section>

    <!-- Bilimsel İçerik -->
    <section class="py-20">
      <div class="layout-container max-w-4xl">
        <!-- İsim Anlamları -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div v-for="item in product.meanings" :key="item.key" class="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div class="font-bold text-brand-600 text-xl mb-2">{{ item.key }}</div>
            <div class="text-sm text-gray-600">{{ item.val }}</div>
          </div>
        </div>

        <!-- Tanım ve Amaç -->
        <div class="space-y-12">
          <div v-if="product.definition">
            <h2 class="text-2xl font-bold mb-4 uppercase border-l-4 border-brand-500 pl-4">Tanım</h2>
            <p class="text-lg text-gray-700 leading-relaxed">{{ product.definition }}</p>
          </div>

          <div>
            <h2 class="text-2xl font-bold mb-6 uppercase border-l-4 border-brand-500 pl-4">Amaç</h2>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li v-for="aim in product.aims" :key="aim" class="flex items-start gap-3 text-gray-600">
                <UIcon name="i-heroicons-check-circle" class="size-6 text-brand-500 shrink-0" />
                {{ aim }}
              </li>
            </ul>
          </div>

          <!-- Extra Sections (Regenix için içerikler) -->
          <div v-if="product.extraSections" class="grid grid-cols-1 gap-6">
             <UCard v-for="section in product.extraSections" :key="section.label" class="bg-brand-50/50">
                <h3 class="font-bold text-brand-800 mb-2">{{ section.label }}</h3>
                <p class="text-sm text-brand-900/70">{{ section.items }}</p>
             </UCard>
          </div>

          <div class="bg-gray-900 text-white p-10 rounded-3xl">
            <h2 class="text-xl font-bold mb-4 uppercase text-brand-400">Bilimsel Konsept Özeti</h2>
            <p class="text-gray-300 leading-loose italic">"{{ product.summary }}"</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>