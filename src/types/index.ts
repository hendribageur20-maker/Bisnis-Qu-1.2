export type BusinessType = 'bengkel' | 'resto' | 'ritel' | 'collabqu';

export type ThemeType = 'cerah' | 'zamrud' | 'oled' | 'cyber' | 'ocean' | 'ruby';

export type SubscriptionTier = 'Freemium' | 'Pro' | 'Corporate';

export type ViewMode = 
  | 'home' 
  | 'submenu' 
  | 'queue' 
  | 'service_list' 
  | 'service_process' 
  | 'cashier' 
  | 'inventory' 
  | 'marketing' 
  | 'mechanic' 
  | 'report'
  | 'settings'
  // Resto Views
  | 'tables'
  | 'kitchen'
  | 'menu_dishes'
  // Retail Views
  | 'retail_pos'
  | 'retail_aisles'
  | 'retail_stock'
  // CollabQu Views
  | 'collabqu';

export type MainCategory = 
  | 'servis' | 'kasir' | 'marketing' | 'inventaris' | 'mekanik' | 'laporan'
  | 'meja' | 'dapur' | 'menu' | 'waiter'
  | 'scan_pos' | 'rak_display' | 'grosir_stok' | 'promo'
  | 'collab_toko' | 'collab_stok';

export interface MenuCategoryItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  badge?: string;
  colorScheme?: string;
  subModulesCount: number;
  targetView?: ViewMode;
}

export interface SubMenuItemConfig {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  targetView: ViewMode;
  badge?: string;
}

export interface SubMenuPageData {
  moduleId: string;
  moduleTitle: string;
  moduleSubtitle: string;
  infoTitle: string;
  infoDescription: string;
  items: SubMenuItemConfig[];
}

// CollabQu (Konsinyasi & Kemitraan) Models
export interface CollabStore {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  address: string;
  commissionRate: number; // e.g. 15%
  totalSold: number;
  totalReturned: number;
  totalRestocked: number;
  joinedDate: string;
}

export interface ConsignmentStock {
  id: string;
  storeId: string;
  storeName: string;
  productName: string;
  consignedQty: number;
  soldQty: number;
  returnedQty: number;
  remainingQty: number;
  pricePerUnit: number;
  consignedDate: string;
  status: 'Titip Aktif' | 'Settled / Lunas' | 'Retur';
}

// Bengkel Models
export interface QueueItem {
  id: string;
  number: string;
  customerName: string;
  vehiclePlate: string;
  vehicleType: 'Motor Matic' | 'Motor Manual' | 'Motor Sport' | 'Mobil MPV' | 'Mobil Sedan/SUV';
  serviceType: string;
  status: 'Menunggu' | 'Dipanggil' | 'Dikerjakan' | 'Selesai';
  time: string;
  mechanicName?: string;
  estimatedMinutes: number;
}

export interface ServiceWorkOrder {
  id: string;
  spkNumber: string;
  customerName: string;
  customerPhone: string;
  vehiclePlate: string;
  vehicleModel: string;
  complaint: string;
  status: 'Penerimaan' | 'Pengerjaan' | 'Ganti Part' | 'Quality Control' | 'Siap Kasir' | 'Selesai';
  mechanicName: string;
  createdAt: string;
  estimatedCost: number;
  partsUsed: { name: string; qty: number; price: number }[];
  laborCost: number;
}

export interface SparePart {
  id: string;
  sku: string;
  name: string;
  category: 'Oli & Cairan' | 'Pengereman' | 'Mesin & CVT' | 'Ban & Velg' | 'Kelistrikan';
  stock: number;
  minStock: number;
  unit: string;
  buyPrice: number;
  sellPrice: number;
  brand: string;
  suitableVehicles: string;
}

export interface Mechanic {
  id: string;
  name: string;
  specialty: string;
  activeOrders: number;
  completedToday: number;
  status: 'Tersedia' | 'Sibuk' | 'Istirahat';
  rating: number;
  incentiveToday: number;
}

// Resto Models
export type TableZone = 'Indoor (AC)' | 'Outdoor Garden' | 'Lantai 2' | 'VIP Room';
export type TableStatus = 'Kosong' | 'Terisi' | 'Billing' | 'Reservasi';

export interface TableOrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  notes?: string;
}

export interface RestaurantTable {
  id: string;
  number: string;
  name: string;
  zone: TableZone;
  status: TableStatus;
  guestCount: number;
  capacity: number;
  orderType: 'Dine-In' | 'Takeaway';
  items: TableOrderItem[];
  billTotal: number;
  openedAt?: string;
  customerName?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Makanan Utama' | 'Minuman & Kopi' | 'Camilan & Dessert' | 'Paket Hemat';
  price: number;
  available: boolean;
  preparationTime: number; // minutes
}

// Retail Models
export type RetailAisle = 'Lorong A - Sembako' | 'Lorong B - Snack & Minuman' | 'Lorong C - Kebersihan & Rumah';

export interface RetailProduct {
  id: string;
  barcode: string;
  name: string;
  aisle: RetailAisle;
  category: string;
  shelfLocation: string;
  stock: number;
  minStock: number;
  unit: string;
  buyPrice: number;
  sellPrice: number;
}

// Shared Managerial Models
export interface Customer {
  id: string;
  name: string;
  phone: string;
  vehiclePlate?: string;
  vehicleModel?: string;
  lastServiceDate?: string;
  totalVisits: number;
  points: number;
  tier: 'Bronze' | 'Silver' | 'Gold';
  notes?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  type: 'part' | 'service' | 'food' | 'retail';
  barcode?: string;
}

export interface TransactionReceipt {
  id: string;
  receiptNumber: string;
  date: string;
  customerName: string;
  vehiclePlate?: string;
  tableNumber?: string;
  mechanicName?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: 'Tunai' | 'QRIS' | 'Transfer Bank' | 'Kartu Debit';
  cashPaid?: number;
  change?: number;
  businessType?: BusinessType;
}

export interface BusinessConfig {
  id: BusinessType;
  brandName: string;
  subName: string;
  avatarText: string;
  searchPlaceholder: string;
  primaryMetricLabel: string;
  primaryMetricValue: string;
  secondaryMetricLabel: string;
  secondaryMetricValue: string;
  statusText: string;
}

// User & Auth State
export interface UserAccount {
  isLoggedIn: boolean;
  email: string;
  name: string;
  tier: SubscriptionTier;
  corporateName?: string;
  syncedAt?: string;
}
