import { 
  MenuCategoryItem, 
  SubMenuPageData, 
  QueueItem, 
  ServiceWorkOrder, 
  SparePart, 
  Customer, 
  Mechanic,
  TransactionReceipt,
  BusinessType,
  BusinessConfig,
  RestaurantTable,
  MenuItem,
  RetailProduct,
  CollabStore,
  ConsignmentStock
} from '../types';

export const BUSINESS_CONFIGS: Record<BusinessType, BusinessConfig> = {
  bengkel: {
    id: 'bengkel',
    brandName: 'Bengkel Maju Motor',
    subName: 'Otomotif & Servis Berkala',
    avatarText: 'BQ',
    searchPlaceholder: 'Cari Plat Nomor / Unit...',
    primaryMetricLabel: 'Omset Servis',
    primaryMetricValue: 'Rp 1.850.000',
    secondaryMetricLabel: 'Unit Dikerjakan',
    secondaryMetricValue: '3 Unit Pit',
    statusText: 'Buka • 08:00 - 17:00'
  },
  resto: {
    id: 'resto',
    brandName: 'Resto & Kopi Nusantara',
    subName: 'Kuliner, Kafe & Dine-In',
    avatarText: 'RQ',
    searchPlaceholder: 'Cari No Meja / Menu...',
    primaryMetricLabel: 'Omset Hari Ini',
    primaryMetricValue: 'Rp 3.420.000',
    secondaryMetricLabel: 'Meja Terisi',
    secondaryMetricValue: '5 / 8 Meja',
    statusText: 'Buka • 10:00 - 22:00'
  },
  ritel: {
    id: 'ritel',
    brandName: 'Usaha Qu Mart',
    subName: 'Minimarket & Grosir Harian',
    avatarText: 'UQ',
    searchPlaceholder: 'Scan / Cari Barcode SKU...',
    primaryMetricLabel: 'Penjualan Hari Ini',
    primaryMetricValue: 'Rp 5.210.000',
    secondaryMetricLabel: 'Transaksi Kasir',
    secondaryMetricValue: '48 Transaksi',
    statusText: 'Buka • 07:00 - 22:00'
  },
  collabqu: {
    id: 'collabqu',
    brandName: 'CollabQu Mitra Toko',
    subName: 'Konsinyasi & Bagi Hasil',
    avatarText: 'CQ',
    searchPlaceholder: 'Cari Toko Mitra / Produk...',
    primaryMetricLabel: 'Nilai Titip Jual',
    primaryMetricValue: 'Rp 4.750.000',
    secondaryMetricLabel: 'Toko Mitra Aktif',
    secondaryMetricValue: '3 Mitra',
    statusText: 'Aktif • Siklus Mingguan'
  }
};

// 6 Adaptive Modules per Business Type (Flutter M3 Rounded Grid)
export const MODULES_BY_BUSINESS: Record<BusinessType, MenuCategoryItem[]> = {
  bengkel: [
    {
      id: 'servis',
      title: 'Servis',
      subtitle: 'Manajemen Bengkel',
      iconName: 'Wrench',
      badge: '4 Aktif',
      subModulesCount: 4,
      targetView: 'submenu'
    },
    {
      id: 'kasir',
      title: 'Kasir',
      subtitle: 'Transaksi & Nota',
      iconName: 'Calculator',
      badge: 'Siap Bayar',
      subModulesCount: 3,
      targetView: 'cashier'
    },
    {
      id: 'marketing',
      title: 'Marketing',
      subtitle: 'Pelanggan & Promo',
      iconName: 'Users',
      badge: '5 Pengingat',
      subModulesCount: 3,
      targetView: 'marketing'
    },
    {
      id: 'inventaris',
      title: 'Inventaris',
      subtitle: 'Stok Sparepart & Oli',
      iconName: 'Package',
      badge: '2 Menipis',
      subModulesCount: 3,
      targetView: 'inventory'
    },
    {
      id: 'mekanik',
      title: 'Mekanik',
      subtitle: 'Tugas & Insentif',
      iconName: 'UserCheck',
      subModulesCount: 2,
      targetView: 'mechanic'
    },
    {
      id: 'laporan',
      title: 'Laporan',
      subtitle: 'Arus Kas & Laba',
      iconName: 'BarChart3',
      subModulesCount: 2,
      targetView: 'report'
    }
  ],
  resto: [
    {
      id: 'meja',
      title: 'Meja & Tamu',
      subtitle: 'Manajemen Dine-In',
      iconName: 'LayoutGrid',
      badge: '5 Terisi',
      subModulesCount: 4,
      targetView: 'tables'
    },
    {
      id: 'kasir',
      title: 'Kasir & Bill',
      subtitle: 'Split Bill & Cetak',
      iconName: 'Receipt',
      badge: '2 Siap Bayar',
      subModulesCount: 3,
      targetView: 'cashier'
    },
    {
      id: 'dapur',
      title: 'Dapur & KDS',
      subtitle: 'Pesanan Masak Koki',
      iconName: 'Flame',
      badge: '4 Antrian',
      subModulesCount: 2,
      targetView: 'kitchen'
    },
    {
      id: 'menu',
      title: 'Buku Menu',
      subtitle: 'Makanan & Minuman',
      iconName: 'Utensils',
      subModulesCount: 4,
      targetView: 'menu_dishes'
    },
    {
      id: 'marketing',
      title: 'Pelanggan',
      subtitle: 'Voucher & Promo WA',
      iconName: 'Users',
      subModulesCount: 2,
      targetView: 'marketing'
    },
    {
      id: 'laporan',
      title: 'Laporan Resto',
      subtitle: 'Menu Terlaris & Kas',
      iconName: 'BarChart3',
      subModulesCount: 2,
      targetView: 'report'
    }
  ],
  ritel: [
    {
      id: 'scan_pos',
      title: 'Kasir Barcode',
      subtitle: 'Quick Scan & Beep',
      iconName: 'Barcode',
      badge: 'Cepat & Akurat',
      subModulesCount: 3,
      targetView: 'retail_pos'
    },
    {
      id: 'rak_display',
      title: 'Rak & Lorong',
      subtitle: 'Pemetaan Display Toko',
      iconName: 'Boxes',
      badge: '3 Lorong',
      subModulesCount: 3,
      targetView: 'retail_aisles'
    },
    {
      id: 'grosir_stok',
      title: 'Stok Sembako',
      subtitle: 'Katalog & Restock',
      iconName: 'Package',
      badge: '3 Menipis',
      subModulesCount: 3,
      targetView: 'retail_stock'
    },
    {
      id: 'promo',
      title: 'Promo & Diskon',
      subtitle: 'Bundling & Poin Member',
      iconName: 'Sparkles',
      subModulesCount: 2,
      targetView: 'marketing'
    },
    {
      id: 'marketing',
      title: 'Member Pelanggan',
      subtitle: 'Data Member & WA',
      iconName: 'Users',
      subModulesCount: 2,
      targetView: 'marketing'
    },
    {
      id: 'laporan',
      title: 'Laporan Penjualan',
      subtitle: 'Omset & Margin Laba',
      iconName: 'BarChart3',
      subModulesCount: 2,
      targetView: 'report'
    }
  ],
  collabqu: [
    {
      id: 'collab_toko',
      title: 'Toko Mitra',
      subtitle: 'List Toko & Margin',
      iconName: 'Store',
      badge: '3 Toko',
      subModulesCount: 3,
      targetView: 'collabqu'
    },
    {
      id: 'collab_stok',
      title: 'Stok Konsinyasi',
      subtitle: 'Titip, Terjual & Retur',
      iconName: 'Package',
      badge: '4 Produk',
      subModulesCount: 3,
      targetView: 'collabqu'
    },
    {
      id: 'kasir',
      title: 'Kasir & Setoran',
      subtitle: 'Bagi Hasil & Nota',
      iconName: 'Receipt',
      subModulesCount: 2,
      targetView: 'cashier'
    },
    {
      id: 'marketing',
      title: 'Broadcast Toko',
      subtitle: 'Tagihan WA ke Mitra',
      iconName: 'Users',
      subModulesCount: 2,
      targetView: 'marketing'
    },
    {
      id: 'laporan',
      title: 'Laporan Konsinyasi',
      subtitle: 'Margin & Profit Bersih',
      iconName: 'BarChart3',
      subModulesCount: 2,
      targetView: 'report'
    },
    {
      id: 'settings',
      title: 'Pengaturan & Cloud',
      subtitle: 'Storage & Backup SQLite',
      iconName: 'SlidersHorizontal',
      subModulesCount: 2,
      targetView: 'settings'
    }
  ]
};

// Bengkel Sub-Menus
export const SUB_MENUS_MAP: Record<string, SubMenuPageData> = {
  servis: {
    moduleId: 'servis',
    moduleTitle: 'Servis',
    moduleSubtitle: 'Manajemen Bengkel',
    infoTitle: 'Alur Kerja Bengkel Terintegrasi',
    infoDescription: 'Kelola pendaftaran nomor antrian, SPK mekanik, pantau pengerjaan unit, hingga tahap inspeksi fisik final.',
    items: [
      {
        id: 'antrian',
        title: 'Antrian',
        subtitle: 'Monitor & Ambil Nomor',
        iconName: 'ListOrdered',
        targetView: 'queue',
        badge: '3 Menunggu'
      },
      {
        id: 'daftar_service',
        title: 'Daftar Service',
        subtitle: 'Service Masuk & Estimasi',
        iconName: 'ClipboardList',
        targetView: 'service_list',
        badge: '4 Unit'
      },
      {
        id: 'proses_service',
        title: 'Proses Service',
        subtitle: 'Tracking Pengerjaan Teknisi',
        iconName: 'Cog',
        targetView: 'service_process'
      },
      {
        id: 'riwayat_selesai',
        title: 'Riwayat Selesai',
        subtitle: 'Inspeksi & Serah Terima Unit',
        iconName: 'CheckCircle2',
        targetView: 'service_list'
      }
    ]
  },
  meja: {
    moduleId: 'meja',
    moduleTitle: 'Manajemen Meja',
    moduleSubtitle: 'Denah & Status Dine-In',
    infoTitle: 'Floor Plan Resto Real-Time',
    infoDescription: 'Pantau kapasitas ruangan, pesanan tamu per meja, proses pesanan dapur, dan cetak lembar tagihan.',
    items: [
      {
        id: 'denah_meja',
        title: 'Denah Meja Resto',
        subtitle: 'Grid Interaktif 4 Status Warna',
        iconName: 'LayoutGrid',
        targetView: 'tables',
        badge: '5 Terisi'
      },
      {
        id: 'dapur_kds',
        title: 'Layar Dapur (KDS)',
        subtitle: 'Antrian Masak Koki & Barista',
        iconName: 'Flame',
        targetView: 'kitchen',
        badge: '4 Masak'
      },
      {
        id: 'katalog_menu',
        title: 'Daftar Menu & Resep',
        subtitle: 'Makanan, Minuman & Paket',
        iconName: 'Utensils',
        targetView: 'menu_dishes'
      }
    ]
  },
  scan_pos: {
    moduleId: 'scan_pos',
    moduleTitle: 'Kasir Barcode Ritel',
    moduleSubtitle: 'Quick Scan & Keranjang Kasir',
    infoTitle: 'Sistem Kasir Cepat Minimarket',
    infoDescription: 'Scan barcode produk dengan efek audio laser beep, input cepat keranjang belanja, dan pembayaran instan.',
    items: [
      {
        id: 'quick_scanner',
        title: 'Barcode Scanner Kasir',
        subtitle: 'Simulasi Laser Beep & Input Cepat',
        iconName: 'Barcode',
        targetView: 'retail_pos'
      },
      {
        id: 'penataan_rak',
        title: 'Penataan Rak & Lorong',
        subtitle: 'Lokasi Display Barang di Toko',
        iconName: 'Boxes',
        targetView: 'retail_aisles'
      },
      {
        id: 'katalog_sembako',
        title: 'Katalog Barang Sembako',
        subtitle: 'Stok Toko & Peringatan Re-Order',
        iconName: 'Package',
        targetView: 'retail_stock',
        badge: '3 Menipis'
      }
    ]
  }
};

// Initial Tables for Resto
export const INITIAL_TABLES: RestaurantTable[] = [
  {
    id: 'tbl-1',
    number: '01',
    name: 'Meja 01 (Jendela)',
    zone: 'Indoor (AC)',
    status: 'Terisi',
    guestCount: 2,
    capacity: 4,
    orderType: 'Dine-In',
    customerName: 'Bpk. Dimas',
    openedAt: '12:15',
    billTotal: 95000,
    items: [
      { id: '1', name: 'Nasi Goreng Spesial Telur', qty: 2, price: 30000 },
      { id: '2', name: 'Es Kopi Susu Gula Aren', qty: 2, price: 17500 }
    ]
  },
  {
    id: 'tbl-2',
    number: '02',
    name: 'Meja 02 (Tengah)',
    zone: 'Indoor (AC)',
    status: 'Billing',
    guestCount: 4,
    capacity: 4,
    orderType: 'Dine-In',
    customerName: 'Ibu Sarah',
    openedAt: '11:45',
    billTotal: 185000,
    items: [
      { id: '1', name: 'Ayam Bakar Madu + Nasi', qty: 3, price: 38000 },
      { id: '2', name: 'Tahu Tempe Goreng Krispi', qty: 1, price: 15000 },
      { id: '3', name: 'Es Jeruk Peras Segar', qty: 4, price: 14000 }
    ]
  },
  {
    id: 'tbl-3',
    number: '03',
    name: 'Meja 03 (Sudut AC)',
    zone: 'Indoor (AC)',
    status: 'Kosong',
    guestCount: 0,
    capacity: 2,
    orderType: 'Dine-In',
    billTotal: 0,
    items: []
  },
  {
    id: 'tbl-4',
    number: '04',
    name: 'Meja 04 (Taman)',
    zone: 'Outdoor Garden',
    status: 'Terisi',
    guestCount: 3,
    capacity: 4,
    orderType: 'Dine-In',
    customerName: 'Kak Reza',
    openedAt: '12:30',
    billTotal: 120000,
    items: [
      { id: '1', name: 'Mie Goreng Seafood Spesial', qty: 2, price: 32000 },
      { id: '2', name: 'French Fries BBQ', qty: 1, price: 20000 },
      { id: '3', name: 'Matcha Iced Latte', qty: 2, price: 18000 }
    ]
  },
  {
    id: 'tbl-5',
    number: '05',
    name: 'Meja 05 (Gazebo Luar)',
    zone: 'Outdoor Garden',
    status: 'Reservasi',
    guestCount: 6,
    capacity: 8,
    orderType: 'Dine-In',
    customerName: 'Reuni Alumni Bpk. Anton',
    openedAt: '13:00 (Booking)',
    billTotal: 0,
    items: []
  },
  {
    id: 'tbl-6',
    number: '06',
    name: 'Meja 06 (Balkon L2)',
    zone: 'Lantai 2',
    status: 'Terisi',
    guestCount: 2,
    capacity: 4,
    orderType: 'Dine-In',
    customerName: 'Mba Cindy',
    openedAt: '12:40',
    billTotal: 78000,
    items: [
      { id: '1', name: 'Croissant Butter Warm', qty: 2, price: 22000 },
      { id: '2', name: 'Americano Double Shot', qty: 2, price: 17000 }
    ]
  },
  {
    id: 'tbl-7',
    number: '07',
    name: 'Meja 07 (Lantai 2)',
    zone: 'Lantai 2',
    status: 'Kosong',
    guestCount: 0,
    capacity: 4,
    orderType: 'Dine-In',
    billTotal: 0,
    items: []
  },
  {
    id: 'tbl-8',
    number: 'VIP',
    name: 'Ruang VIP Soekarno',
    zone: 'VIP Room',
    status: 'Terisi',
    guestCount: 8,
    capacity: 12,
    orderType: 'Dine-In',
    customerName: 'Meeting Tim PT Karya Mandiri',
    openedAt: '12:00',
    billTotal: 485000,
    items: [
      { id: '1', name: 'Paket Prasmanan Nusantara (8 Pax)', qty: 1, price: 420000 },
      { id: '2', name: 'Kopi Susu Literan Signature', qty: 1, price: 65000 }
    ]
  }
];

// Initial Resto Menu Items
export const INITIAL_MENU_ITEMS: MenuItem[] = [
  { id: 'm-1', name: 'Nasi Goreng Spesial Telur Ceplok', category: 'Makanan Utama', price: 30000, available: true, preparationTime: 12 },
  { id: 'm-2', name: 'Ayam Bakar Madu + Nasi Wangi', category: 'Makanan Utama', price: 38000, available: true, preparationTime: 15 },
  { id: 'm-3', name: 'Mie Goreng Seafood Gurih', category: 'Makanan Utama', price: 32000, available: true, preparationTime: 10 },
  { id: 'm-4', name: 'Es Kopi Susu Gula Aren 250ml', category: 'Minuman & Kopi', price: 17500, available: true, preparationTime: 5 },
  { id: 'm-5', name: 'Es Jeruk Peras Murni', category: 'Minuman & Kopi', price: 14000, available: true, preparationTime: 4 },
  { id: 'm-6', name: 'Matcha Iced Latte Premium', category: 'Minuman & Kopi', price: 18000, available: true, preparationTime: 6 },
  { id: 'm-7', name: 'French Fries Saus BBQ', category: 'Camilan & Dessert', price: 20000, available: true, preparationTime: 8 },
  { id: 'm-8', name: 'Tahu Tempe Goreng Krispi', category: 'Camilan & Dessert', price: 15000, available: true, preparationTime: 7 },
  { id: 'm-9', name: 'Croissant Butter Hangat', category: 'Camilan & Dessert', price: 22000, available: true, preparationTime: 5 }
];

// Initial Retail Products (Minimarket Barcodes & Aisles)
export const INITIAL_RETAIL_PRODUCTS: RetailProduct[] = [
  {
    id: 'ret-1',
    barcode: '8999999120101',
    name: 'Beras Premium Ramos 5 Kg',
    aisle: 'Lorong A - Sembako',
    category: 'Sembako',
    shelfLocation: 'Rak A1 - Bawah',
    stock: 22,
    minStock: 8,
    unit: 'Sak',
    buyPrice: 68000,
    sellPrice: 74500
  },
  {
    id: 'ret-2',
    barcode: '8992345678901',
    name: 'Minyak Goreng Sania Pouch 2 Liter',
    aisle: 'Lorong A - Sembako',
    category: 'Minyak & Bumbu',
    shelfLocation: 'Rak A2 - Tengah',
    stock: 35,
    minStock: 12,
    unit: 'Pouch',
    buyPrice: 32500,
    sellPrice: 37000
  },
  {
    id: 'ret-3',
    barcode: '8991002345012',
    name: 'Gula Pasir Gulaku Putih 1 Kg',
    aisle: 'Lorong A - Sembako',
    category: 'Sembako',
    shelfLocation: 'Rak A1 - Atas',
    stock: 4, // Low Stock Alert
    minStock: 10,
    unit: 'Bungkus',
    buyPrice: 15500,
    sellPrice: 17500
  },
  {
    id: 'ret-4',
    barcode: '8991234560012',
    name: 'Indomie Goreng Spesial 85g',
    aisle: 'Lorong A - Sembako',
    category: 'Mie Instan',
    shelfLocation: 'Rak A3 - Full',
    stock: 140,
    minStock: 40,
    unit: 'Bungkus',
    buyPrice: 2800,
    sellPrice: 3500
  },
  {
    id: 'ret-5',
    barcode: '8992775123456',
    name: 'Teh Botol Sosro Kotak 250ml',
    aisle: 'Lorong B - Snack & Minuman',
    category: 'Minuman Dingin',
    shelfLocation: 'Chiller B1 - Rak 2',
    stock: 48,
    minStock: 15,
    unit: 'Kotak',
    buyPrice: 3400,
    sellPrice: 4500
  },
  {
    id: 'ret-6',
    barcode: '8998866200114',
    name: 'Chitato Sapi Panggang 68g',
    aisle: 'Lorong B - Snack & Minuman',
    category: 'Makanan Ringan',
    shelfLocation: 'Rak B2 - Eye Level',
    stock: 3, // Low Stock Alert
    minStock: 10,
    unit: 'Bungkus',
    buyPrice: 9200,
    sellPrice: 11500
  },
  {
    id: 'ret-7',
    barcode: '8998009010321',
    name: 'Kopi Kapal Api Spesial Mix 10x24g',
    aisle: 'Lorong B - Snack & Minuman',
    category: 'Kopi & Teh',
    shelfLocation: 'Rak B3 - Tengah',
    stock: 30,
    minStock: 10,
    unit: 'Renceng',
    buyPrice: 13500,
    sellPrice: 16000
  },
  {
    id: 'ret-8',
    barcode: '8991002998811',
    name: 'Deterjen Rinso Molto Cair 750ml',
    aisle: 'Lorong C - Kebersihan & Rumah',
    category: 'Kebersihan',
    shelfLocation: 'Rak C1 - Tengah',
    stock: 18,
    minStock: 6,
    unit: 'Pouch',
    buyPrice: 19000,
    sellPrice: 23500
  },
  {
    id: 'ret-9',
    barcode: '8993005881122',
    name: 'Sabun Cuci Piring Sunlight Lime 700ml',
    aisle: 'Lorong C - Kebersihan & Rumah',
    category: 'Dapur & Pembersih',
    shelfLocation: 'Rak C2 - Atas',
    stock: 2, // Low Stock Alert
    minStock: 8,
    unit: 'Pouch',
    buyPrice: 14000,
    sellPrice: 16800
  }
];

// Workshops queues, orders, spareparts (Bengkel)
export const INITIAL_QUEUES: QueueItem[] = [
  {
    id: 'Q-01',
    number: 'A-01',
    customerName: 'Budi Santoso',
    vehiclePlate: 'B 4128 SXZ',
    vehicleType: 'Motor Matic',
    serviceType: 'Servis Ringan + Ganti Oli MPX2',
    status: 'Dikerjakan',
    time: '08:15',
    mechanicName: 'Agus Santoso',
    estimatedMinutes: 35
  },
  {
    id: 'Q-02',
    number: 'A-02',
    customerName: 'Dewi Lestari',
    vehiclePlate: 'B 6902 UYA',
    vehicleType: 'Motor Matic',
    serviceType: 'Ganti Kampas Rem & V-Belt CVT',
    status: 'Dipanggil',
    time: '08:40',
    mechanicName: 'Rudi Hartono',
    estimatedMinutes: 45
  },
  {
    id: 'Q-03',
    number: 'B-01',
    customerName: 'Hendra Gunawan',
    vehiclePlate: 'B 1872 WQP',
    vehicleType: 'Mobil MPV',
    serviceType: 'Tune-Up Mesin + Ganti Oli Shell Helix 4L',
    status: 'Menunggu',
    time: '09:05',
    estimatedMinutes: 60
  },
  {
    id: 'Q-04',
    number: 'A-03',
    customerName: 'Ahmad Faisal',
    vehiclePlate: 'B 3091 KTT',
    vehicleType: 'Motor Sport',
    serviceType: 'Ganti Rantai & Gear Set',
    status: 'Menunggu',
    time: '09:20',
    estimatedMinutes: 40
  }
];

export const INITIAL_ORDERS: ServiceWorkOrder[] = [
  {
    id: 'SPK-2026-001',
    spkNumber: 'SPK #001',
    customerName: 'Budi Santoso',
    customerPhone: '081234567890',
    vehiclePlate: 'B 4128 SXZ',
    vehicleModel: 'Honda Vario 160 (2024)',
    complaint: 'Tarikan awal gredek saat rpm rendah, ganti oli rutin',
    status: 'Pengerjaan',
    mechanicName: 'Agus Santoso',
    createdAt: '08:15 WIB',
    estimatedCost: 195000,
    partsUsed: [
      { name: 'Oli Mesin AHM MPX2 Matic 0.8L', qty: 1, price: 65000 },
      { name: 'Oli Gardan Transmisi 120ml', qty: 1, price: 20000 }
    ],
    laborCost: 110000
  },
  {
    id: 'SPK-2026-002',
    spkNumber: 'SPK #002',
    customerName: 'Dewi Lestari',
    customerPhone: '085712349911',
    vehiclePlate: 'B 6902 UYA',
    vehicleModel: 'Yamaha NMAX 155 (2023)',
    complaint: 'Rem depan bunyi berdecit & getar di tarikan tengah',
    status: 'Ganti Part',
    mechanicName: 'Rudi Hartono',
    createdAt: '08:40 WIB',
    estimatedCost: 265000,
    partsUsed: [
      { name: 'Kampas Rem Depan Daytona Ultra', qty: 1, price: 85000 },
      { name: 'Slider Roller Set CVT', qty: 1, price: 90000 }
    ],
    laborCost: 90000
  },
  {
    id: 'SPK-2026-003',
    spkNumber: 'SPK #003',
    customerName: 'Fajar Nugroho',
    customerPhone: '081389001122',
    vehiclePlate: 'B 5509 PLZ',
    vehicleModel: 'Honda Beat FI (2022)',
    complaint: 'Mati mendadak di jalan, aki tekor',
    status: 'Siap Kasir',
    mechanicName: 'Agus Santoso',
    createdAt: '07:50 WIB',
    estimatedCost: 310000,
    partsUsed: [
      { name: 'Aki Kering GS Astra GTZ5S', qty: 1, price: 250000 },
      { name: 'Busi NGK CPR9EA', qty: 1, price: 30000 }
    ],
    laborCost: 30000
  }
];

export const INITIAL_PARTS: SparePart[] = [
  {
    id: 'P-01',
    sku: 'OLI-AHM-01',
    name: 'Oli Mesin AHM MPX2 Matic 0.8L',
    category: 'Oli & Cairan',
    stock: 24,
    minStock: 8,
    unit: 'Botol',
    buyPrice: 52000,
    sellPrice: 65000,
    brand: 'AHM Genuine',
    suitableVehicles: 'Honda Beat, Vario, Scoopy, Genio'
  },
  {
    id: 'P-02',
    sku: 'OLI-YAM-01',
    name: 'Oli Yamalube Power Matic 10W-40 0.8L',
    category: 'Oli & Cairan',
    stock: 18,
    minStock: 6,
    unit: 'Botol',
    buyPrice: 54000,
    sellPrice: 68000,
    brand: 'Yamalube',
    suitableVehicles: 'Mio, Fazzio, FreeGo, Lexi'
  },
  {
    id: 'P-03',
    sku: 'OLI-SHELL-01',
    name: 'Oli Shell Helix HX6 10W-40 4 Liter',
    category: 'Oli & Cairan',
    stock: 6,
    minStock: 3,
    unit: 'Galon',
    buyPrice: 310000,
    sellPrice: 385000,
    brand: 'Shell',
    suitableVehicles: 'Avanza, Xenia, Mobilio, Ertiga'
  },
  {
    id: 'P-04',
    sku: 'REM-NIS-01',
    name: 'Kampas Rem Depan Nissin Samurai',
    category: 'Pengereman',
    stock: 3,
    minStock: 5,
    unit: 'Set',
    buyPrice: 65000,
    sellPrice: 85000,
    brand: 'Nissin',
    suitableVehicles: 'Vario 150/160, Beat CBS, Scoopy'
  },
  {
    id: 'P-05',
    sku: 'REM-DAY-02',
    name: 'Kampas Rem Belakang Tromol Daytona',
    category: 'Pengereman',
    stock: 14,
    minStock: 5,
    unit: 'Set',
    buyPrice: 45000,
    sellPrice: 60000,
    brand: 'Daytona',
    suitableVehicles: 'Universal Matic Honda/Yamaha'
  },
  {
    id: 'P-06',
    sku: 'CVT-VAN-01',
    name: 'V-Belt + Roller Set Original Bando',
    category: 'Mesin & CVT',
    stock: 2,
    minStock: 4,
    unit: 'Set',
    buyPrice: 140000,
    sellPrice: 185000,
    brand: 'Bando',
    suitableVehicles: 'Vario 125/150, PCX 150'
  },
  {
    id: 'P-07',
    sku: 'BUS-NGK-01',
    name: 'Busi Iridium NGK CR7HIX',
    category: 'Mesin & CVT',
    stock: 16,
    minStock: 5,
    unit: 'Pcs',
    buyPrice: 75000,
    sellPrice: 95000,
    brand: 'NGK Spark',
    suitableVehicles: 'Mio Series, Supra X, Grand'
  },
  {
    id: 'P-08',
    sku: 'BAN-IRC-01',
    name: 'Ban Luar Tubeless IRC Fasti Pro 90/80-14',
    category: 'Ban & Velg',
    stock: 8,
    minStock: 3,
    unit: 'Buah',
    buyPrice: 220000,
    sellPrice: 275000,
    brand: 'IRC Tire',
    suitableVehicles: 'Velg Ring 14 Matic'
  },
  {
    id: 'P-09',
    sku: 'AKI-GS-01',
    name: 'Aki Kering GS Astra GTZ5S Bebas Perawatan',
    category: 'Kelistrikan',
    stock: 9,
    minStock: 4,
    unit: 'Unit',
    buyPrice: 195000,
    sellPrice: 250000,
    brand: 'GS Astra',
    suitableVehicles: 'Honda Matic, Yamaha Mio J, Suzuki'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'C-01',
    name: 'Budi Santoso',
    phone: '081234567890',
    vehiclePlate: 'B 4128 SXZ',
    vehicleModel: 'Honda Vario 160',
    lastServiceDate: '2026-09-08',
    totalVisits: 6,
    points: 480,
    tier: 'Gold'
  },
  {
    id: 'C-02',
    name: 'Dewi Lestari',
    phone: '085712349911',
    vehiclePlate: 'B 6902 UYA',
    vehicleModel: 'Yamaha NMAX 155',
    lastServiceDate: '2026-08-20',
    totalVisits: 4,
    points: 290,
    tier: 'Silver'
  },
  {
    id: 'C-03',
    name: 'Pak Hendra Gunawan',
    phone: '087822990011',
    vehiclePlate: 'B 1872 WQP',
    vehicleModel: 'Toyota Avanza 1.3 G',
    lastServiceDate: '2026-07-15',
    totalVisits: 8,
    points: 850,
    tier: 'Gold'
  },
  {
    id: 'C-04',
    name: 'Ahmad Faisal',
    phone: '081908765432',
    vehiclePlate: 'B 3091 KTT',
    vehicleModel: 'Yamaha R15 V3',
    lastServiceDate: '2026-09-01',
    totalVisits: 3,
    points: 175,
    tier: 'Bronze'
  },
  {
    id: 'C-05',
    name: 'Siti Rahmawati',
    phone: '082199887766',
    vehiclePlate: 'B 4402 PZX',
    vehicleModel: 'Honda Scoopy Prestige',
    lastServiceDate: '2026-07-01',
    totalVisits: 5,
    points: 390,
    tier: 'Silver'
  }
];

export const INITIAL_MECHANICS: Mechanic[] = [
  {
    id: 'M-01',
    name: 'Agus Santoso',
    specialty: 'Master Mesin & Transmisi CVT',
    activeOrders: 1,
    completedToday: 3,
    status: 'Sibuk',
    rating: 4.9,
    incentiveToday: 135000
  },
  {
    id: 'M-02',
    name: 'Rudi Hartono',
    specialty: 'Sistem Pengereman & Kaki-kaki',
    activeOrders: 1,
    completedToday: 2,
    status: 'Sibuk',
    rating: 4.8,
    incentiveToday: 95000
  },
  {
    id: 'M-03',
    name: 'Fajar Nugraha',
    specialty: 'Kelistrikan, Injeksi & EFI Scan',
    activeOrders: 0,
    completedToday: 4,
    status: 'Tersedia',
    rating: 4.9,
    incentiveToday: 160000
  },
  {
    id: 'M-04',
    name: 'Doni Pratama',
    specialty: 'Servis Ringan, Oli & Fast Moving',
    activeOrders: 0,
    completedToday: 3,
    status: 'Tersedia',
    rating: 4.7,
    incentiveToday: 110000
  }
];

export const INITIAL_RECEIPTS: TransactionReceipt[] = [
  {
    id: 'RCP-001',
    receiptNumber: 'UQ-2610-001',
    date: '10 Okt 2026 08:35 WIB',
    customerName: 'Fajar Nugroho',
    vehiclePlate: 'B 5509 PLZ',
    mechanicName: 'Agus Santoso',
    items: [
      { id: '1', name: 'Jasa Servis Kelistrikan', price: 30000, qty: 1, type: 'service' },
      { id: '2', name: 'Aki Kering GS Astra GTZ5S', price: 250000, qty: 1, type: 'part' },
      { id: '3', name: 'Busi NGK CPR9EA', price: 30000, qty: 1, type: 'part' }
    ],
    subtotal: 310000,
    discount: 15000,
    tax: 0,
    total: 295000,
    paymentMethod: 'QRIS',
    cashPaid: 295000,
    change: 0,
    businessType: 'bengkel'
  }
];

export const INITIAL_COLLAB_STORES: CollabStore[] = [
  {
    id: 'store-1',
    name: 'Toko Barokah Jaya',
    ownerName: 'Ibu Hj. Aminah',
    phone: '081234560011',
    address: 'Jl. Raya Pasar Minggu No. 12',
    commissionRate: 15, // 15%
    totalSold: 42,
    totalReturned: 2,
    totalRestocked: 50,
    joinedDate: '15 Jan 2026'
  },
  {
    id: 'store-2',
    name: 'Kafe Senja Corner',
    ownerName: 'Mas Aris Wardana',
    phone: '085788990022',
    address: 'Jl. Pemuda Kreatif No. 44',
    commissionRate: 20, // 20%
    totalSold: 28,
    totalReturned: 0,
    totalRestocked: 35,
    joinedDate: '01 Feb 2026'
  },
  {
    id: 'store-3',
    name: 'Minimarket Berkah Sejahtera',
    ownerName: 'Pak Joko Susilo',
    phone: '087811223344',
    address: 'Jl. Cempaka Putih Tengah No. 8',
    commissionRate: 12, // 12%
    totalSold: 75,
    totalReturned: 5,
    totalRestocked: 100,
    joinedDate: '10 Feb 2026'
  }
];

export const INITIAL_CONSIGNMENT_STOCKS: ConsignmentStock[] = [
  {
    id: 'cstock-1',
    storeId: 'store-1',
    storeName: 'Toko Barokah Jaya',
    productName: 'Keripik Tempe Renyah Oven 200g',
    consignedQty: 50,
    soldQty: 42,
    returnedQty: 2,
    remainingQty: 6,
    pricePerUnit: 15000,
    consignedDate: '01 Okt 2026',
    status: 'Titip Aktif'
  },
  {
    id: 'cstock-2',
    storeId: 'store-2',
    storeName: 'Kafe Senja Corner',
    productName: 'Sambal Bawang Botol Kaca 150ml',
    consignedQty: 35,
    soldQty: 28,
    returnedQty: 0,
    remainingQty: 7,
    pricePerUnit: 25000,
    consignedDate: '03 Okt 2026',
    status: 'Titip Aktif'
  },
  {
    id: 'cstock-3',
    storeId: 'store-3',
    storeName: 'Minimarket Berkah Sejahtera',
    productName: 'Kopi Robusta Bubuk Gayo 250g',
    consignedQty: 50,
    soldQty: 50,
    returnedQty: 0,
    remainingQty: 0,
    pricePerUnit: 32000,
    consignedDate: '25 Sep 2026',
    status: 'Settled / Lunas'
  },
  {
    id: 'cstock-4',
    storeId: 'store-1',
    storeName: 'Toko Barokah Jaya',
    productName: 'Roti Sisir Mentega Tradisional',
    consignedQty: 20,
    soldQty: 15,
    returnedQty: 5,
    remainingQty: 0,
    pricePerUnit: 12000,
    consignedDate: '28 Sep 2026',
    status: 'Retur'
  }
];

