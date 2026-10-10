import React from 'react';
import { 
  ChevronRight, 
  Volume2, 
  Search, 
  Wrench, 
  UtensilsCrossed, 
  Store, 
  Sparkles, 
  Barcode, 
  Layers, 
  LayoutGrid,
  Handshake,
  Building2,
  HardDrive
} from 'lucide-react';
import { 
  MenuCategoryItem, 
  QueueItem, 
  BusinessType, 
  BusinessConfig,
  RestaurantTable,
  RetailProduct,
  CollabStore,
  UserAccount
} from '../types';
import { IconHelper } from './IconHelper';
import { ThemePalette } from '../utils/themeConfig';
import { playQueueChime, playBarcodeBeep } from '../utils/audio';

interface HomeDashboardProps {
  businessType: BusinessType;
  businessConfig: BusinessConfig;
  theme: ThemePalette;
  userAccount: UserAccount;
  categories: MenuCategoryItem[];
  onSelectCategory: (category: MenuCategoryItem) => void;
  onOpenPluginSwitcher: () => void;
  onOpenAuthModal: () => void;
  onOpenStorageCleaner: () => void;
  
  // Bengkel props
  queues: QueueItem[];
  onCallQueue: (queueId: string) => void;

  // Resto props
  tables: RestaurantTable[];
  onNavigateToTables: () => void;

  // Retail props
  retailProducts: RetailProduct[];
  onNavigateToRetail: () => void;

  // CollabQu props
  collabStores: CollabStore[];
  onNavigateToCollab: () => void;

  // Adaptive Search
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  businessType,
  businessConfig,
  theme,
  userAccount,
  categories,
  onSelectCategory,
  onOpenPluginSwitcher,
  onOpenAuthModal,
  onOpenStorageCleaner,
  queues,
  onCallQueue,
  tables,
  onNavigateToTables,
  retailProducts,
  onNavigateToRetail,
  collabStores,
  onNavigateToCollab,
  searchQuery,
  onSearchChange
}) => {
  // Operational calculations
  const activeQueues = queues.filter(q => q.status === 'Menunggu' || q.status === 'Dipanggil');
  const nextQueue = activeQueues.length > 0 ? activeQueues[0] : null;

  const occupiedTables = tables.filter(t => t.status === 'Terisi' || t.status === 'Billing').length;
  const lowStockRetail = retailProducts.filter(p => p.stock <= p.minStock).length;

  // Dynamic UQ Logo per active module
  const renderDynamicUQLogo = () => {
    switch (businessType) {
      case 'bengkel':
        return (
          <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center font-black text-sm text-white shadow-xs relative">
            <span>UQ</span>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <Wrench className="w-2.5 h-2.5" />
            </span>
          </div>
        );
      case 'resto':
        return (
          <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center font-black text-sm text-white shadow-xs relative">
            <span>UQ</span>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center">
              <UtensilsCrossed className="w-2.5 h-2.5" />
            </span>
          </div>
        );
      case 'ritel':
        return (
          <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center font-black text-sm text-white shadow-xs relative">
            <span>UQ</span>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center">
              <Barcode className="w-2.5 h-2.5" />
            </span>
          </div>
        );
      case 'collabqu':
      default:
        return (
          <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center font-black text-sm text-white shadow-xs relative">
            <span>UQ</span>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              <Store className="w-2.5 h-2.5" />
            </span>
          </div>
        );
    }
  };

  return (
    <div className={`flex-1 flex flex-col ${theme.surfaceBg}`}>
      
      {/* =========================================================================
          HEADER BERSIH TANPA STATUS BAR HP, TANPA ICON LONCENG/PROFIL
          Logo UQ dinamis berganti ikon & aksen sesuai modul aktif.
          Badge status paket di header.
          ========================================================================= */}
      <div className={`${theme.headerBg} ${theme.headerText} px-5 pt-4 pb-5 relative shadow-md transition-colors duration-200`}>
        
        {/* Topmost bar: Dynamic UQ Logo + Brand Name + Badge Status Paket + Plugin Switcher */}
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-2.5">
            {/* Dynamic UQ Logo */}
            {renderDynamicUQLogo()}

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold tracking-wider uppercase opacity-90">
                  Usaha Qu 1.0
                </span>
                <span className="w-1 h-1 rounded-full bg-white/80"></span>
                <span className="text-[10px] opacity-80">{businessConfig.statusText.split('•')[0]}</span>
              </div>
              <h1 className="text-base font-bold tracking-tight leading-tight">
                {businessConfig.brandName}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Badge Status Paket di Header (Freemium / Pro / Corporate) */}
            <button
              onClick={onOpenAuthModal}
              className="text-[10px] font-extrabold px-2 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30 transition flex items-center gap-1 active:scale-95"
              title="Kelola Paket & Cloud Sync"
            >
              {userAccount.tier === 'Corporate' ? (
                <>
                  <Building2 className="w-3 h-3 text-amber-300" />
                  <span>Corporate</span>
                </>
              ) : userAccount.tier === 'Pro' ? (
                <>
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Pro</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-emerald-300" />
                  <span>Freemium</span>
                </>
              )}
            </button>

            {/* Quick Plugin Switcher Pill */}
            <button
              onClick={onOpenPluginSwitcher}
              className="flex items-center gap-1 bg-black/25 hover:bg-black/35 active:scale-95 text-white px-2.5 py-1 rounded-full text-[11px] font-bold border border-white/20 shadow-xs transition"
              title="Ganti Mode Partisi Usaha"
            >
              {businessType === 'bengkel' && <Wrench className="w-3 h-3" />}
              {businessType === 'resto' && <UtensilsCrossed className="w-3 h-3" />}
              {businessType === 'ritel' && <Store className="w-3 h-3" />}
              {businessType === 'collabqu' && <Handshake className="w-3 h-3" />}
              <span className="capitalize">{businessType === 'collabqu' ? 'CollabQu' : businessType}</span>
              <span className="text-[9px] opacity-70">▾</span>
            </button>
          </div>
        </div>

        {/* Pencarian Adaptif */}
        <div className="relative mt-2 z-10">
          <Search className="w-4 h-4 text-white/70 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={businessConfig.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-black/20 border border-white/25 text-white placeholder-white/70 focus:outline-none focus:bg-black/30 focus:border-white transition font-medium"
          />
        </div>

        {/* Floating Summary Card (Adaptive Metrics based on business type) */}
        <div className="grid grid-cols-3 gap-2 pt-3 relative z-10">
          <div className="bg-black/20 backdrop-blur-xs rounded-xl p-2.5 border border-white/10">
            <div className="text-[10px] opacity-80 font-medium truncate">{businessConfig.primaryMetricLabel}</div>
            <div className="text-xs font-bold text-white mt-0.5 font-mono truncate">{businessConfig.primaryMetricValue}</div>
          </div>
          <div className="bg-black/20 backdrop-blur-xs rounded-xl p-2.5 border border-white/10">
            <div className="text-[10px] opacity-80 font-medium truncate">{businessConfig.secondaryMetricLabel}</div>
            <div className="text-xs font-bold text-white mt-0.5 truncate">
              {businessType === 'bengkel' && '3 Pit Aktif'}
              {businessType === 'resto' && `${occupiedTables}/8 Meja`}
              {businessType === 'ritel' && '48 Struk'}
              {businessType === 'collabqu' && `${collabStores.length} Toko`}
            </div>
          </div>
          <div className="bg-black/20 backdrop-blur-xs rounded-xl p-2.5 border border-white/10">
            <div className="text-[10px] opacity-80 font-medium truncate">
              {businessType === 'bengkel' && 'Antrian Tunggu'}
              {businessType === 'resto' && 'Minta Billing'}
              {businessType === 'ritel' && 'Stok Menipis'}
              {businessType === 'collabqu' && 'Status Titip'}
            </div>
            <div className="text-xs font-bold text-amber-300 mt-0.5 font-mono truncate">
              {businessType === 'bengkel' && `${activeQueues.length} Antrian`}
              {businessType === 'resto' && `${tables.filter(t => t.status === 'Billing').length} Meja`}
              {businessType === 'ritel' && `${lowStockRetail} SKU`}
              {businessType === 'collabqu' && '4 Batch'}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BODY DASHBOARD: GRID MODUL ADAPTIF & SUB-CARD
          ========================================================================= */}
      <div className="p-4 flex-1 space-y-4">

        {/* Special Activity Cards by Mode */}
        {businessType === 'bengkel' && nextQueue && (
          <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col items-center justify-center">
                <span className="text-[8px] uppercase font-bold text-emerald-700">Antrian</span>
                <span className="text-base font-extrabold text-emerald-800 leading-none">{nextQueue.number}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">{nextQueue.customerName}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({nextQueue.vehiclePlate})</span>
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {nextQueue.serviceType}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playQueueChime();
                onCallQueue(nextQueue.id);
              }}
              className="flex items-center gap-1.5 bg-[#047857] hover:bg-[#065f46] active:scale-95 text-white px-2.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Panggil</span>
            </button>
          </div>
        )}

        {businessType === 'resto' && (
          <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-amber-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">
                  {occupiedTables} Meja Terisi Tamu
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {tables.filter(t => t.status === 'Billing').length} Meja meminta cetak bill kasir
                </div>
              </div>
            </div>

            <button
              onClick={onNavigateToTables}
              className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white px-2.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition"
            >
              <span>Lihat Meja</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {businessType === 'ritel' && (
          <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-teal-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold">
                <Barcode className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">
                  Quick Barcode Scanner Ready
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Scan instan dengan laser beep & rak display
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playBarcodeBeep();
                onNavigateToRetail();
              }}
              className="flex items-center gap-1 bg-[#047857] hover:bg-[#065f46] text-white px-2.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition"
            >
              <span>Scan POS</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {businessType === 'collabqu' && (
          <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-indigo-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">
                  {collabStores.length} Toko Mitra Konsinyasi Aktif
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Kelola stok titip jual, retur, dan bagi hasil
                </div>
              </div>
            </div>

            <button
              onClick={onNavigateToCollab}
              className="flex items-center gap-1 bg-indigo-700 hover:bg-indigo-800 text-white px-2.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition"
            >
              <span>Buka Toko</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Section Title */}
        <div className="flex items-center justify-between px-0.5 pt-1">
          <div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              Grid Modul {businessType === 'bengkel' ? 'Bengkel' : businessType === 'resto' ? 'Resto & Kafe' : businessType === 'collabqu' ? 'CollabQu Konsinyasi' : 'Ritel & Toko'}
            </h2>
            <p className="text-[11px] text-slate-500">6 Modul Utama Flutter Material 3</p>
          </div>
          <button
            onClick={onOpenPluginSwitcher}
            className="text-[11px] font-semibold bg-white px-2.5 py-1 rounded-full border border-slate-200 flex items-center gap-1 shadow-2xs hover:bg-slate-50"
          >
            <Layers className="w-3 h-3 text-emerald-700" />
            <span>Ganti Mode</span>
          </button>
        </div>

        {/* Grid 6 Modul Kotak Bersudut Tumpul (rounded-2xl) */}
        <div className="grid grid-cols-2 gap-3.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat)}
              className="group bg-white hover:bg-slate-50/70 active:scale-[0.98] transition-all duration-200 rounded-2xl p-4 text-left border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 flex flex-col justify-between relative overflow-hidden tap-active"
            >
              {cat.badge && (
                <div className="absolute top-2.5 right-2.5 text-[9px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-md">
                  {cat.badge}
                </div>
              )}

              {/* Solid rounded icon containing glyph symbol */}
              <div className={`w-12 h-12 rounded-2xl ${theme.accentBg} text-white flex items-center justify-center shadow-xs transition-colors mb-3`}>
                <IconHelper name={cat.iconName} className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div>
                <h3 className="font-bold text-slate-800 text-sm group-hover:text-emerald-800 transition-colors flex items-center justify-between">
                  <span className="truncate">{cat.title}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 font-normal">
                  {cat.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Storage Cleaner & Offline RAM Banner */}
        <button
          onClick={onOpenStorageCleaner}
          className="w-full text-left bg-gradient-to-r from-slate-100 to-emerald-50/60 border border-slate-200/90 rounded-2xl p-3 flex items-center justify-between shadow-2xs hover:border-emerald-300 transition"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-200 text-slate-700 shrink-0">
              <HardDrive className="w-4 h-4 text-slate-800" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-900">Storage Cleaner & Kamera Kompresor</div>
              <p className="text-slate-500 text-[10px] mt-0.5">
                Target APK &lt;4.6 MB • Offline-First RAM 1-2 GB
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

      </div>

    </div>
  );
};
