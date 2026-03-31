<script setup lang="ts">
useHead({
  title: 'Hakkında - CEEMS Phoenix',
})
</script>

<template>
  <div class="bg-white pb-20">
    <HeroSection
      badge="HAKKIMIZDA"
      title="YAŞAM BİLİMLERİNDE"
      title-highlight="GELECEĞİ ŞEKİLLENDİRİYORUZ"
      description="CEEMS PHOENİX, bilimin ışığında karanlığı aydınlatarak, sağlıklı nesiller hedefiyle geleceğe bilimsel çözümler sunar."
    />

    <!-- Who We Are -->
    <section class="py-20">
      <div class="layout-container">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div class="md:col-span-7">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 uppercase border-l-4 border-brand-500 pl-4">BİZ KİMİZ?</h2>
            <div class="text-gray-700 text-lg leading-loose space-y-6">
              <p>
                <span class="font-bold text-gray-900">CEEMS PHOENİX Biyoteknoloji Sanayi ve Ticaret A.Ş</span>, yaşam bilimleri ve ileri biyoteknoloji alanlarında yenilikçi, bilim temelli ve sürdürülebilir çözümler geliştirmek amacıyla kurulmuş bir biyoteknoloji şirketidir.
              </p>
              <p>
                Antalya merkezli şirketimiz; biyoteknoloji, genetik ve üreme bilimleri ekseninde yürüttüğü çalışmalarla, sağlıklı nesiller hedefiyle, insan sağlığına ve insan üreme sağlığına katkı sunacak yüksek katma değerli çözümler üretmeyi hedeflemektedir.
              </p>
              <p>
                Bilimin dönüştürücü gücüne inanan CEEMS PHOENİX, modern laboratuvar yaklaşımlarını etik ilkeler ve kalite standartlarıyla birleştirerek; araştırma, geliştirme ve teknoloji odaklı bir kurum kültürü benimsemektedir.
              </p>
            </div>
          </div>

          <div class="md:col-span-5">
            <UCard class="bg-gray-50 rounded-2xl">
              <h3 class="text-xl font-bold text-gray-900 mb-4 uppercase">MARKA KİMLİĞİMİZ</h3>
              <div class="space-y-4 text-gray-600 leading-relaxed">
                <p><span class="text-brand-600 font-bold">CEEMS</span>, başarıya gidecek yolu görünür kılmayı temsil eder.</p>
                <p><span class="text-brand-600 font-bold">PHOENİX (Anka Kuşu)</span>, yenilenmeyi, sürekliliği ve ileri teknolojiyle yeniden doğuşu simgeler.</p>
                <p>Marka logomuzdaki <span class="font-bold text-gray-800">DNA sarmalı</span>; genetik ve üreme bilimleri alanındaki uzmanlık odağımızı temsil etmektedir.</p>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote -->
    <section class="py-16 bg-brand-600 text-white text-center italic">
      <div class="layout-container">
        <h2 class="text-2xl lg:text-3xl font-light mb-4">"Zamanı durduramıyorsak, çözümü hızlandırmalıyız"</h2>
        <div class="text-brand-200 font-bold uppercase tracking-widest">— DOĞAN CEYLAN</div>
        <USeparator class="my-6 mx-auto opacity-20" style="width: 100px;" />
        <div class="text-xl font-bold uppercase tracking-tighter">
          CEEMS PHOENİX BİYOTEKNOLOJİ <br>
          <span class="text-brand-100 font-normal normal-case">"Zamanı Durduramıyor, Bilimin Rehberliğinde Çözümü Hızlandırıyoruz."</span>
        </div>
      </div>
    </section>

    <!-- Vision / Mission -->
    <section class="py-20 bg-gray-50">
      <div class="layout-container grid grid-cols-1 md:grid-cols-2 gap-12">
        <div class="bg-white p-10 rounded-3xl shadow-sm h-full">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 uppercase">VİZYONUMUZ</h2>
          <p class="text-gray-600">
            Biyoteknoloji alanında, bilimsel altyapısı güçlü, yenilikçi yaklaşımıyla fark yaratan ve ulusal ile uluslararası ölçekte referans gösterilen öncü bir teknoloji şirketi olmak.
          </p>
        </div>
        <div class="bg-white p-10 rounded-3xl shadow-sm h-full">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 uppercase">MİSYONUMUZ</h2>
          <p class="text-gray-600">
            Bilimsel bilgi ve ileri teknoloji yaklaşımlarını bir araya getirerek; yaşam bilimleri alanında güvenilir, etkili ve yenilikçi biyoteknolojik çözümler üretmek.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
