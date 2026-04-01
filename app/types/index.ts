export interface Product {
  id: number
  name: string
  series?: string
  sku: string
  description?: string
  slogan?: string
  htmlContent?: string
  price: number
  stock: number
  stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | 'LOW_STOCK'
  image?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  id: number
  cartId: number
  productId: number
  quantity: number
  product: Product
}

export interface Cart {
  id: number
  userId: number
  items: CartItem[]
}

export interface Address {
  id: number
  userId: number
  type: 'BILLING' | 'SHIPPING'
  title: string
  fullName: string
  phone: string
  city: string
  district: string
  neighborhood?: string
  street?: string
  buildingNo?: string
  apartmentNo?: string
  postalCode?: string
  isDefault: boolean
}

export interface OrderItem {
  id: number
  productId: number
  quantity: number
  unitPrice: number
  totalPrice: number
  product: Product
}

export interface Order {
  id: number
  userId: number
  subtotal: number
  discountTotal: number
  total: number
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  createdAt: string
  updatedAt: string
  items: OrderItem[]
  discountCode?: {
    code: string
    discountRate?: number
    discountAmount?: number
  }
  billingAddress?: Address
  shippingAddress?: Address
  user?: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
}

export interface ContactSubmission {
  id: number
  fullName: string
  email: string
  message: string
  isRead: boolean
  createdAt: string
}

export interface SiteSetting {
  id: number
  key: string
  value: string
}

export interface DiscountCode {
  id: number
  doctorId: number
  code: string
  discountRate?: number
  discountAmount?: number
  isActive: boolean
  doctor?: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
}

export interface GuestCartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}
