import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Store, 
  Wrench, 
  UtensilsCrossed, 
  Building2, 
  ShieldCheck, 
  Database, 
  CheckCircle2, 
  Sparkles,
  HardDrive,
  Palette,
  Download,
  RotateCcw,
  Handshake,
  UserCheck
} from 'lucide-react';
import { BusinessType, ThemeType, UserAccount } from '../../types';
import { THEME_PALETTES, ThemePalette } from '../../utils/themeConfig';

interface SettingsModuleProps {
  currentType: BusinessType;
  currentTheme: ThemeType;
  themePalette: ThemePalette;
  userAccount: UserAccount;
  onSelectType: (type: BusinessType) => void;
  onSelectTheme: (theme: ThemeType) => void;
  onOpenStorageCleaner: () => void;
  onOpenAuthModal: () => void;
  onExportSQLite: () => void;
  onBack: () => void;
  onResetData: () => void;
}

export const SettingsModule: React.FC<SettingsModuleProps> = ({
  currentType,
  currentTheme,
  themePalette,
  userAccount,
  onSelectType,
  onSelectTheme,
  onOpenStorageCleaner,
  onOpenAuthModal,
  onExportSQLite,
  onBack,
  onResetData
}) => {
  const [selectedBranch, setSelectedBranch] = useState('Cabang Pusat - Jakarta');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const branches = [
    'Cabang Pusat - Jakarta',
    'Cabang 02 - Kelapa Gading',
    'Cabang 03 - Serpong BSD'
  ];

  const handleSwitch = (type: BusinessType) => {
    onSelectType(type);
    setSuccessToast(`Mode partisi berhasil diubah ke: ${type.toUpperCase()}`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleThemeSwitch = (themeKey: ThemeType) => {
    onSelectTheme(themeKey);
    setSuccessToast(`Tema berhasil diubah ke: ${THEME_PALETTES[themeKey].name}`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div className={`flex-1 flex flex-col ${themePalette.surfaceBg}`}>
      
      {/* Header */}
      <div className={`${themePalette.headerBg} ${themePalette.headerText} px-5 pt-4 pb-5 shadow-md`}>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 transition flex items-center justify-center text-white border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-tight">Pengaturan & Personalisasi</h1>
            <p className="text-xs text-white/80 font-medium">Tema, Storage & Partisi Plugin</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        
        {successToast && (
          <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Section: Akun & Status Paket */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>Status Lisensi & Akun</span>
            </h3>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
              {userAccount.tier}
            </span>
          </div>

          <div className="text-xs text-slate-600">
            {userAccount.isLoggedIn ? (
              <div>Terhubung sebagai: <strong>{userAccount.email}</strong></div>
            ) : (
              <div>Mode lokal offline aktif. Belum terhubung akun Google.</div>
            )}
          </div>

          <button
            onClick={onOpenAuthModal}
            className="w-full bg-[#047857] hover:bg-[#065f46] text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kelola Akun Google & Cloud Merge</span>
          </button>
        </div>

        {/* Section: 4. PERSONALISASI TEMA (6 Variasi) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-emerald-700" />
              <span>Personalisasi Tema (6 Variasi)</span>
            </h3>
            <span className="text-[10px] text-slate-400">Instan Switcher</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(THEME_PALETTES) as ThemeType[]).map((themeKey) => {
              const pal = THEME_PALETTES[themeKey];
              const isSelected = currentTheme === themeKey;
              return (
                <button
                  key={themeKey}
                  onClick={() => handleThemeSwitch(themeKey)}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-slate-900">{pal.name}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                  </div>

                  <div className="flex items-center gap-1.5 mt-1">
                    <div className={`w-4 h-4 rounded-full ${pal.headerBg} border border-slate-300`}></div>
                    <span className="text-[10px] text-slate-500 truncate">{pal.tagline.split(' ')[0]}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section: 5. MEDIA & STORAGE (Storage Cleaner & Kamera) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-emerald-700" />
              <span>Media, Cache & Storage Cleaner</span>
            </h3>
            <span className="text-[10px] text-slate-400">&lt;4.6 MB APK</span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Optimasi RAM 1-2 GB: Bersihkan file cache tidak terpakai dan uji kompresi kamera otomatis (max 600x600px, 100-200KB).
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onOpenStorageCleaner}
              className="bg-slate-900 hover:bg-slate-800 text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>Storage Cleaner</span>
            </button>

            <button
              onClick={onExportSQLite}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition border border-slate-300"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Export SQLite</span>
            </button>
          </div>
        </div>

        {/* Section: Partisi Industri Aktif */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Partisi Industri Aktif</span>
            </h3>
            <span className="text-[10px] text-slate-400">Modular Plugin</span>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleSwitch('bengkel')}
              className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition ${
                currentType === 'bengkel'
                  ? 'bg-emerald-50 border-emerald-500 shadow-xs ring-1 ring-emerald-500'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#047857] text-white flex items-center justify-center font-bold text-xs">
                  BQ
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">Bengkel Motor & Mobil</div>
                  <div className="text-[11px] text-slate-500">Antrian pit, SPK mekanik, dan suku cadang</div>
                </div>
              </div>
              {currentType === 'bengkel' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
            </button>

            <button
              onClick={() => handleSwitch('resto')}
              className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition ${
                currentType === 'resto'
                  ? 'bg-emerald-50 border-emerald-500 shadow-xs ring-1 ring-emerald-500'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#047857] text-white flex items-center justify-center font-bold text-xs">
                  RQ
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">Resto & Kafe (F&B)</div>
                  <div className="text-[11px] text-slate-500">Denah meja 4 status, Dine-In, dan KDS dapur koki</div>
                </div>
              </div>
              {currentType === 'resto' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
            </button>

            <button
              onClick={() => handleSwitch('ritel')}
              className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition ${
                currentType === 'ritel'
                  ? 'bg-emerald-50 border-emerald-500 shadow-xs ring-1 ring-emerald-500'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#047857] text-white flex items-center justify-center font-bold text-xs">
                  UQ
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">Ritel & Minimarket</div>
                  <div className="text-[11px] text-slate-500">Quick barcode scanner laser beep dan rak sembako</div>
                </div>
              </div>
              {currentType === 'ritel' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
            </button>

            <button
              onClick={() => handleSwitch('collabqu')}
              className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition ${
                currentType === 'collabqu'
                  ? 'bg-emerald-50 border-emerald-500 shadow-xs ring-1 ring-emerald-500'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-700 text-white flex items-center justify-center font-bold text-xs">
                  CQ
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">CollabQu (Konsinyasi)</div>
                  <div className="text-[11px] text-slate-500">Kemitraan toko, titip jual, dan bagi hasil</div>
                </div>
              </div>
              {currentType === 'collabqu' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
            </button>
          </div>
        </div>

        {/* Section: Corporate Multi-Cabang */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>Corporate Multi-Cabang</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">3 Outlet</span>
          </div>

          <div className="space-y-1.5">
            {branches.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBranch(b)}
                className={`w-full p-2.5 rounded-xl border text-left text-xs flex items-center justify-between transition ${
                  selectedBranch === b
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{b}</span>
                {selectedBranch === b && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
              </button>
            ))}
          </div>
        </div>

        {/* Section: Reset Data */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Database className="w-4 h-4 text-slate-600" />
            <span>Reset Data Contoh</span>
          </h3>

          <button
            onClick={onResetData}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Data Contoh / Muat Ulang Default</span>
          </button>
        </div>

      </div>

    </div>
  );
};
