<script setup lang="ts">
import { z } from 'zod'
import { api } from '~/utils/api'

definePageMeta({ middleware: ['auth'] })
useHead({ title: 'Ödeme - CEEMS Phoenix' })

const cartStore = useCartStore()
const auth = useAuthStore()
const toast = useToast()
const { fieldErrors, generalError, setBackendErrors, clearErrors, getFieldError } = useFormErrors()

const loading = ref(false)
const placingOrder = ref(false)

// Mock addresses
const addresses = ref([
  { id: 1, title: 'Ev Adresi', fullName: 'Ahmet Yılmaz', addressLine: 'Konuksever Mah. Gazi Bulvarı No:220', district: 'Muratpaşa', city: 'Antalya', phone: '0542 000 00 00' },
  { id: 2, title: 'İş Adresi', fullName: 'Ahmet Yılmaz', addressLine: 'Atatürk Cad. No:50', district: 'Konyaaltı', city: 'Antalya', phone: '0542 000 00 00' },
])

const addressOptions = computed(() =>
  addresses.value.map(a => ({ label: `${a.title} — ${a.addressLine}`, value: a.id })),
)

const form = reactive({
  shippingAddressId: addresses.value[0]?.id,
  billingAddressId: addresses.value[0]?.id,
  sameAddress: true,
  discountCode: '',
})

const discountValidated = ref(false)
const discountPercent = ref(0)
const validatingDiscount = ref(false)

watch(() => form.sameAddress, (val) => {
  if (val) form.billingAddressId = form.shippingAddressId
})

watch(() => form.shippingAddressId, (val) => {
  if (form.sameAddress) form.billingAddressId = val
})

const subtotal = computed(() => cartStore.totalPrice)
const discountAmount = computed(() => discountValidated.value ? Math.round(subtotal.value * discountPercent.value / 100) : 0)
const total = computed(() => subtotal.value - discountAmount.value)

async function validateDiscount() {
  if (!form.discountCode.trim()) return

  validatingDiscount.value = true
  try {
    // TODO: Connect to POST /discounts/validate when backend is ready
    await new Promise(resolve => setTimeout(resolve, 500))
    discountValidated.value = true
    discountPercent.value = 10
    toast.add({ title: 'İndirim kodu uygulandı', description: `%${discountPercent.value} indirim`, color: 'success' })
  }
  catch {
    discountValidated.value = false
    discountPercent.value = 0
    toast.add({ title: 'Geçersiz kod', description: 'Bu indirim kodu bulunamadı.', color: 'error' })
  }
  finally {
    validatingDiscount.value = false
  }
}

const orderSchema = z.object({
  shippingAddressId: z.number({ required_error: 'Teslimat adresi seçin' }),
  billingAddressId: z.number({ required_error: 'Fatura adresi seçin' }),
})

async function placeOrder() {
  clearErrors()

  const result = orderSchema.safeParse(form)
  if (!result.success) {
    for (const issue of result.error.issues) {
      fieldErrors.value[issue.path[0] as string] = issue.message
    }
    return
  }

  if (cartStore.items.length === 0) {
    toast.add({ title: 'Sepet boş', description: 'Sipariş vermek için sepetinize ürün ekleyin.', color: 'warning' })
    return
  }

  placingOrder.value = true
  try {
    // TODO: Connect to POST /orders when backend is ready
    await new Promise(resolve => setTimeout(resolve, 1000))
    cartStore.clearCart()
    toast.add({ title: 'Sipariş oluşturuldu!', description: 'Siparişiniz başarıyla alındı.', color: 'success' })
    navigateTo('/user/orders')
  }
  catch (error) {
    setBackendErrors(error)
  }
  finally {
    placingOrder.value = false
  }
}
</script>

<template>
  <div class="bg-gray-50 py-12">
    <div class="layout-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-8 uppercase font-display">Ödeme</h1>

      <div v-if="cartStore.items.length === 0" class="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
        <UIcon name="i-heroicons-shopping-cart" class="size-12 text-gray-300 mx-auto" />
        <h2 class="text-lg text-gray-400 mt-4">Sepetiniz boş.</h2>
        <UButton to="/products" label="Ürünleri İnceleyin" color="primary" class="mt-4" />
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <!-- Cart Items -->
          <UCard class="border-none shadow-sm rounded-2xl">
            <template #header>
              <h2 class="font-bold text-sm text-gray-800 uppercase tracking-wide">Sepetinizdeki Ürünler</h2>
            </template>
            <div class="divide-y divide-gray-100">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
              >
                <NuxtImg
                  :src="item.image"
                  :alt="item.name"
                  class="w-14 h-14 rounded-lg object-cover"
                  width="56"
                  height="56"
                />
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-gray-900 text-sm">{{ item.name }}</p>
                  <p class="text-xs text-gray-500">Adet: {{ item.quantity }}</p>
                </div>
                <p class="font-bold text-sm text-gray-900">{{ (item.price * item.quantity).toLocaleString('tr-TR') }} TL</p>
              </div>
            </div>
          </UCard>

          <!-- Address Selection -->
          <UCard class="border-none shadow-sm rounded-2xl">
            <template #header>
              <h2 class="font-bold text-sm text-gray-800 uppercase tracking-wide">Adres Bilgileri</h2>
            </template>
            <div class="space-y-4">
              <UFormField label="Teslimat Adresi" :error="getFieldError('shippingAddressId')">
                <USelect
                  v-model="form.shippingAddressId"
                  :items="addressOptions"
                  placeholder="Teslimat adresi seçin"
                  class="w-full"
                />
              </UFormField>

              <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input v-model="form.sameAddress" type="checkbox" class="rounded border-gray-300 text-brand-500 focus:ring-brand-500">
                Fatura adresi teslimat adresiyle aynı
              </label>

              <UFormField v-if="!form.sameAddress" label="Fatura Adresi" :error="getFieldError('billingAddressId')">
                <USelect
                  v-model="form.billingAddressId"
                  :items="addressOptions"
                  placeholder="Fatura adresi seçin"
                  class="w-full"
                />
              </UFormField>

              <div class="pt-2">
                <NuxtLink to="/user/addresses" class="text-sm text-brand-600 font-semibold hover:underline">
                  + Yeni adres ekle
                </NuxtLink>
              </div>
            </div>
          </UCard>

          <!-- Discount Code -->
          <UCard class="border-none shadow-sm rounded-2xl">
            <template #header>
              <h2 class="font-bold text-sm text-gray-800 uppercase tracking-wide">İndirim Kodu</h2>
            </template>
            <div class="flex items-end gap-3">
              <UFormField label="İndirim kodunuz varsa girin" class="flex-1">
                <UInput
                  v-model="form.discountCode"
                  placeholder="KODUNUZ"
                  :disabled="discountValidated"
                  class="w-full uppercase"
                />
              </UFormField>
              <UButton
                v-if="!discountValidated"
                label="Uygula"
                color="neutral"
                :loading="validatingDiscount"
                @click="validateDiscount"
              />
              <UButton
                v-else
                label="Kaldır"
                color="error"
                variant="ghost"
                @click="discountValidated = false; discountPercent = 0; form.discountCode = ''"
              />
            </div>
            <p v-if="discountValidated" class="text-sm text-green-600 mt-2 font-semibold">
              %{{ discountPercent }} indirim uygulandı
            </p>
          </UCard>
        </div>

        <!-- Order Summary -->
        <div>
          <div class="sticky top-24">
            <UCard class="border-none shadow-sm rounded-2xl">
              <template #header>
                <h2 class="font-bold text-sm text-gray-800 uppercase tracking-wide">Sipariş Özeti</h2>
              </template>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between text-gray-600">
                  <span>Ürünler ({{ cartStore.totalItems }})</span>
                  <span>{{ subtotal.toLocaleString('tr-TR') }} TL</span>
                </div>
                <div v-if="discountAmount > 0" class="flex justify-between text-green-600 font-semibold">
                  <span>İndirim ({{ form.discountCode }})</span>
                  <span>-{{ discountAmount.toLocaleString('tr-TR') }} TL</span>
                </div>
                <div class="flex justify-between text-gray-600">
                  <span>Kargo</span>
                  <span class="text-green-600 font-semibold">Ücretsiz</span>
                </div>
                <USeparator />
                <div class="flex justify-between text-xl font-bold text-brand-600">
                  <span>Toplam</span>
                  <span>{{ total.toLocaleString('tr-TR') }} TL</span>
                </div>
              </div>

              <div v-if="generalError" class="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {{ generalError }}
              </div>

              <UButton
                label="SİPARİŞİ ONAYLA"
                color="primary"
                block
                size="xl"
                class="mt-6 font-bold"
                :loading="placingOrder"
                @click="placeOrder"
              />

              <p class="text-xs text-gray-400 text-center mt-3">
                Siparişi onaylayarak kullanım koşullarını kabul etmiş olursunuz.
              </p>
            </UCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
