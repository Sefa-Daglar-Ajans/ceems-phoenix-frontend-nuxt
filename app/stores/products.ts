import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    // PDF 5. Maddeye Göre Başlangıç Verileri
    products: [
      { 
        id: 1, 
        name: 'MitoViora X-Y', 
        series: 'Mito Serisi', 
        code: 'CP-101', 
        description: 'Yüksek biyoyararlanıma sahip formül.', 
        image: '/images/mitoviora.jpg', 
        slogan: 'Zamanı durduramıyor, çözümü hızlandırıyoruz.', 
        content: 'L-Arginine, L-Carnitine, Coenzyme Q10...', 
        price: 1250 
      },
      { 
        id: 2, 
        name: 'MitoRegenix X-Y', 
        series: 'Mito Serisi', 
        code: 'CP-102', 
        description: 'Hücresel yenilenmeyi destekler.', 
        image: '/images/mitoregenix.jpg', 
        slogan: 'Bilimin rehberliğinde yenilenin.',
        content: 'Alpha Lipoic Acid, Glutathione...', 
        price: 1450 
      },
      { 
        id: 3, 
        name: 'MitoAndro Y', 
        series: 'Mito Serisi', 
        code: 'CP-103', 
        description: 'Erkek sağlığına yönelik destek.', 
        image: '/images/mitoandro.jpg', 
        slogan: 'Erkek sağlığı için Phoenix gücü.',
        content: 'Tribulus Terrestris, Maca Root...', 
        price: 1100 
      },
      { 
        id: 4, 
        name: 'MitoOva X', 
        series: 'Mito Serisi', 
        code: 'CP-104', 
        description: 'Kadın sağlığı dengeleyici.', 
        image: '/images/mitoova.jpg', 
        slogan: 'Kadın sağlığında bilimsel denge.',
        content: 'Inositol, Folic Acid...', 
        price: 1350 
      }
    ]
  }),
  actions: {
    updateProduct(updatedProduct: any) {
      const index = this.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) {
        this.products[index] = { ...updatedProduct }
      }
    },
    addProduct(newProduct: any) {
      const nextId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1
      this.products.push({ ...newProduct, id: nextId })
    },
    deleteProduct(id: number) {
      this.products = this.products.filter(p => p.id !== id)
    }
  }
})