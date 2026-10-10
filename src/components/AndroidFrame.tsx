import React, { useState } from 'react';
import { 
  Smartphone, 
  Monitor, 
  Home, 
  ListOrdered, 
  Receipt, 
  Package, 
  Users, 
  LayoutGrid, 
  Flame, 
  Barcode, 
  Boxes, 
  Store,
  SlidersHorizontal 
} from 'lucide-react';
import { ViewMode, BusinessType } from '../types';
import { ThemePalette } from '../utils/themeConfig';

interface AndroidFrameProps {
  children: React.ReactNode;
  currentView: ViewMode;
  businessType: BusinessType;
  theme: ThemePalette;
  onNavigate: (view: ViewMode) => void;
  onBack: () => void;
  canGoBack: boolean;
  activeBadgeCount?: number;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  currentView,
  businessType,
  theme,
  onNavigate,
  onBack,
  canGoBack,
  activeBadgeCount = 0
}) => {
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 flex flex-col items-center justify-center p-0 sm:p-4 select-none">
      
      {/* Top Device Bar & Controls */}
      <div className="w-full max-w-md flex items-center justify-between px-3 py-2 text-xs text-slate-400 font-medium mb-1">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-200">Usaha Qu 1.0</span>
          <span className="hidden sm:inline text-slate-400">• Offline-First Core</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onNavigate('settings')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition border text-[11px] ${
              currentView === 'settings' 
                ? 'bg-slate-700 border-slate-500 text-white font-bold' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
            title="Pengaturan & Profil Usaha"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Pengaturan</span>
          </button>

          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-md transition border border-slate-700 text-[11px]"
            title="Toggle Tampilan HP vs Layar Lebar"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Layar Lebar</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Frame Android</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container - Android Device or Fullscreen */}
      <div
        className={`w-full transition-all duration-300 ${
          isMobileFrame
            ? 'max-w-[420px] rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-[8px] border-slate-800 bg-white overflow-hidden relative'
            : 'max-w-4xl rounded-2xl shadow-2xl border border-slate-700 bg-white overflow-hidden'
        }`}
        style={{ minHeight: isMobileFrame ? '820px' : 'auto', height: isMobileFrame ? '850px' : 'auto' }}
      >
        <div className={`h-full flex flex-col ${theme.surfaceBg} relative overflow-hidden`}>
          
          {/* Note: HEADER BERSIH TANPA STATUS BAR HP, TANPA ICON LONCENG/PROFIL */}

          {/* Scrollable Screen Body */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
            {children}
          </div>

          {/* Bottom App Navigation Bar Terkunci (Beradaptasi Sesuai Mode Usaha) */}
          <div className="bg-white border-t border-slate-200 px-2 py-1 flex items-center justify-around z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
            
            {/* Tab 1: Home (Universal) */}
            <button
              onClick={() => onNavigate('home')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                currentView === 'home' || currentView === 'submenu'
                  ? 'text-emerald-700 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${currentView === 'home' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                <Home className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5">Beranda</span>
            </button>

            {/* Tab 2: Adaptive Operational Tab */}
            {businessType === 'bengkel' && (
              <button
                onClick={() => onNavigate('queue')}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition relative ${
                  currentView === 'queue' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1 rounded-xl transition relative ${currentView === 'queue' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                  <ListOrdered className="w-5 h-5" />
                  {activeBadgeCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                      {activeBadgeCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-0.5">Antrian</span>
              </button>
            )}

            {businessType === 'resto' && (
              <button
                onClick={() => onNavigate('tables')}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                  currentView === 'tables' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1 rounded-xl transition ${currentView === 'tables' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5">Meja Resto</span>
              </button>
            )}

            {businessType === 'ritel' && (
              <button
                onClick={() => onNavigate('retail_pos')}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                  currentView === 'retail_pos' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1 rounded-xl transition ${currentView === 'retail_pos' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                  <Barcode className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5">Scan Kasir</span>
              </button>
            )}

            {businessType === 'collabqu' && (
              <button
                onClick={() => onNavigate('collabqu')}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                  currentView === 'collabqu' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1 rounded-xl transition ${currentView === 'collabqu' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                  <Store className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5">Toko Mitra</span>
              </button>
            )}

            {/* Tab 3: Kasir POS / Bill / Setoran */}
            <button
              onClick={() => onNavigate('cashier')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                currentView === 'cashier'
                  ? 'text-emerald-700 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${currentView === 'cashier' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                <Receipt className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5">
                {businessType === 'resto' ? 'Kasir & Bill' : businessType === 'collabqu' ? 'Setoran POS' : 'Kasir POS'}
              </span>
            </button>

            {/* Tab 4: Adaptive Inventory / Kitchen / Aisles / Consignment Stock */}
            {businessType === 'bengkel' && (
              <button
                onClick={() => onNavigate('inventory')}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                  currentView === 'inventory' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1 rounded-xl transition ${currentView === 'inventory' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                  <Package className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5">Inventaris</span>
              </button>
            )}

            {businessType === 'resto' && (
              <button
                onClick={() => onNavigate('kitchen')}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                  currentView === 'kitchen' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1 rounded-xl transition ${currentView === 'kitchen' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5">Dapur KDS</span>
              </button>
            )}

            {businessType === 'ritel' && (
              <button
                onClick={() => onNavigate('retail_aisles')}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                  currentView === 'retail_aisles' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1 rounded-xl transition ${currentView === 'retail_aisles' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                  <Boxes className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5">Rak Toko</span>
              </button>
            )}

            {businessType === 'collabqu' && (
              <button
                onClick={() => onNavigate('collabqu')}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                  currentView === 'collabqu' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1 rounded-xl transition ${currentView === 'collabqu' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                  <Package className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5">Stok Titip</span>
              </button>
            )}

            {/* Tab 5: Pelanggan / Marketing CRM (Universal) */}
            <button
              onClick={() => onNavigate('marketing')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                currentView === 'marketing'
                  ? 'text-emerald-700 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${currentView === 'marketing' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5">Pelanggan</span>
            </button>
          </div>

          {/* Android Standard System Navigation Bar at the Very Bottom */}
          <div className="bg-slate-950 text-slate-400 py-1.5 px-10 flex items-center justify-between text-xs border-t border-slate-900 select-none z-30">
            {/* Back Button (Triangle ◀) */}
            <button
              onClick={onBack}
              disabled={!canGoBack && currentView === 'home'}
              className="p-1 hover:text-white transition active:scale-90 text-slate-400 disabled:opacity-30"
              title="Kembali (Android Back)"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
              </svg>
            </button>

            {/* Home Button (Circle ⚪) */}
            <button
              onClick={() => onNavigate('home')}
              className="p-1 hover:text-white transition active:scale-90 text-slate-400"
              title="Beranda (Android Home)"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="7" />
              </svg>
            </button>

            {/* Recent Apps / Overview Button (Square ⏹) */}
            <button
              onClick={() => onNavigate(currentView === 'home' ? 'settings' : 'home')}
              className="p-1 hover:text-white transition active:scale-90 text-slate-400"
              title="Pengaturan / Ikhtisar"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect x="5" y="5" width="14" height="14" rx="2" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
