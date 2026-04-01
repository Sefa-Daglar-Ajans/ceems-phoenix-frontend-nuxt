// stores/products.ts
import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', () => {
  // Mevcut ürünlerin listesi (Varsayılan veriler)
  const products = ref([
    { 
      id: 1, 
      name: 'MitoViora X-Y', 
      price: 1250, 
      category: 'PHARMA', 
      statusLabel: '30 SAŞE', 
      image: '/images/mitoviora.jpg',
      description: 'Yüksek biyoyararlanıma sahip Mito serisi formülü.' 
    },
    { 
      id: 2, 
      name: 'MitoRegenix X-Y', 
      price: 1450, 
      category: 'PHARMA', 
      statusLabel: '30 SAŞE', 
      image: '/images/mitoregenix.jpg',
      description: 'Hücresel yenilenmeyi destekleyen özel içerik.' 
    },
    { 
      id: 3, 
      name: 'MitoAndro Y', 
      price: 1100, 
      category: 'PHARMA', 
      statusLabel: '30 SAŞE', 
      image: '/images/mitoandro.jpg',
      description: 'Erkek sağlığına yönelik bilimsel destek.' 
    },
    { 
      id: 4, 
      name: 'MitoOva X', 
      price: 1350, 
      category: 'PHARMA', 
      statusLabel: '30 SAŞE', 
      image: '/images/mitoova.jpg',
      description: 'Kadın sağlığı ve dengeleyici formülasyon.' 
    }
  ])

  // Ürün Güncelleme Fonksiyonu
  const updateProduct = (updatedProduct: any) => {
    const index = products.value.findIndex(p => p.id === updatedProduct.id)
    if (index !== -1) {
      products.value[index] = { ...updatedProduct }
    }
  }

  // Yeni Ürün Ekleme
  const addProduct = (newProduct: any) => {
    const id = products.value.length + 1
    products.value.push({ ...newProduct, id })
  }

  // Ürün Silme
  const deleteProduct = (id: number) => {
    products.value = products.value.filter(p => p.id !== id)
  }

  return { products, updateProduct, addProduct, deleteProduct }
})