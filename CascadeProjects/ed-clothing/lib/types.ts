// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Cart Item Types
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  status: 'pending' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'cod' | 'gpay';
  paymentStatus: 'pending' | 'paid' | 'failed';
  shippingAddress: Address;
  billingAddress: Address;
  couponCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

// User Types
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  phoneNumber?: string;
  isAdmin: boolean;
  wishlist: string[];
  createdAt: Date;
}

// Coupon Types
export interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minOrder: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  active: boolean;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
