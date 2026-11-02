export type CategoryId =
  | 'fresh-milk'
  | 'uht-milk'
  | 'curd-yogurt'
  | 'buttermilk'
  | 'lassi'
  | 'flavoured-milk'
  | 'ghee'
  | 'butter'
  | 'paneer'
  | 'sweets'
  | 'bakery'
  | 'ice-cream'
  | 'milk-shakes'
  | 'other';

export interface Category {
  id: CategoryId;
  name: string;
  teluguName?: string;
  tagline: string;
  image: string;
  productCount: number;
}

export interface PackSizeOption {
  size: string;
  price: number;
  originalPrice?: number;
}

export interface NutritionalInfo {
  energy: string; // e.g., "60 kcal"
  protein: string; // e.g., "3.2 g"
  fat: string; // e.g., "3.0 g"
  carbohydrate: string; // e.g., "4.8 g"
  calcium: string; // e.g., "120 mg"
  addedSugar?: string;
}

export interface Product {
  id: string;
  name: string;
  teluguName?: string;
  category: CategoryId;
  categoryName: string;
  packSizes: PackSizeOption[];
  price: number;
  originalPrice?: number;
  packSize: string; // default pack size
  image: string;
  inStock: boolean;
  stockCount?: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  nutritionalInfo: NutritionalInfo;
  ingredients: string;
  storage: string;
  shelfLife: string;
  fssaiNumber?: string;
}

export interface CartItem {
  id: string; // combo of productId + packSize
  productId: string;
  name: string;
  packSize: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  category: CategoryId;
}

export type SubscriptionFrequency = 'daily' | 'alternate' | 'weekly' | 'custom';

export interface Subscription {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  packSize: string;
  quantity: number;
  frequency: SubscriptionFrequency;
  customDays?: string[]; // e.g., ['Mon', 'Wed', 'Fri']
  startDate: string;
  endDate?: string;
  durationDays: number; // 7, 15, 30, 90
  deliveryTimeSlot: 'Morning (5:30 AM - 7:30 AM)' | 'Evening (4:30 PM - 7:00 PM)';
  addressId: string;
  addressText: string;
  estimatedMonthlyCost: number;
  status: 'active' | 'paused' | 'cancelled';
  nextDeliveryDate: string;
  createdAt: string;
}

export interface UserAddress {
  id: string;
  tag: 'Home' | 'Office' | 'Parents' | 'Other';
  name: string;
  phone: string;
  flat: string;
  street: string;
  area: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  packSize: string;
  price: number;
  quantity: number;
  image: string;
}

export interface TrackingStep {
  status: 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  time: string;
  done: boolean;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  deliveryDate: string;
  deliverySlot: string;
  paymentMethod: 'UPI' | 'Card' | 'Netbanking' | 'Cash on Delivery';
  deliveryAddress: UserAddress;
  tracking: TrackingStep[];
  driverName?: string;
  driverPhone?: string;
}

export interface Retailer {
  id: string;
  name: string;
  type: 'Exclusive Parlour' | 'Super Stockist' | 'Retail Franchise' | 'Dairy Mart';
  address: string;
  area: string;
  city: string;
  district: string;
  pincode: string;
  phone: string;
  timings: string;
  rating: number;
  verified: boolean;
  distanceKm?: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface DownloadDocument {
  id: string;
  title: string;
  category: 'Price Lists' | 'Vendor Forms' | 'Stockist Forms' | 'Notices' | 'Reports' | 'Other Documents';
  date: string;
  fileType: 'PDF' | 'DOC' | 'XLS';
  fileSize: string;
  downloadUrl: string;
  description: string;
}

export interface BoardDirector {
  name: string;
  designation: string;
  qualification?: string;
  image?: string;
}

export interface QualityHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
  metric?: string;
}
