import React from 'react';
import { X, Wrench, UtensilsCrossed, Store, CheckCircle2, Sparkles, Layers, Handshake } from 'lucide-react';
import { BusinessType } from '../types';

interface QuickPluginSwitcherModalProps {
  currentType: BusinessType;
  onSelect: (type: BusinessType) => void;
  onClose: () => void;
}

export const QuickPluginSwitcherModal: React.FC<QuickPluginSwitcherModalProps> = ({
  currentType,
  onSelect,
  onClose
}) => {
  const plugins: {
    type: BusinessType;
    title: string;
    sub: string;
    avatar: string;
    icon: React.ReactNode;
    features: string[];
    tag: string;
  }[] = [
    {
      type: 'bengkel',
      title: 'Bengkel Motor & Mobil',
      sub: 'Otomotif & Servis Berkala',
      avatar: 'BQ',
      icon: <Wrench className="w-5 h-5 text-emerald-700" />,
      features: ['Nomor Antrian Unit & Chime Bel', 'SPK Mekanik & Tracking Pit Servis', 'Inventaris Sparepart & Oli Motor/Mobil'],
      tag: 'Spesialis Servis'
    },
    {
      type: 'resto',
      title: 'Resto, Kafe & Kuliner',
      sub: 'Dine-In, Takeaway & Barista',
      avatar: 'RQ',
      icon: <UtensilsCrossed className="w-5 h-5 text-emerald-700" />,
      features: ['Denah Meja Interaktif 4 Warna', 'Pemisahan Dine-In vs Takeaway', 'Dapur & KDS Antrian Koki / Barista'],
      tag: 'Food & Beverage'
    },
    {
      type: 'ritel',
      title: 'Ritel & Minimarket',
      sub: 'Toko Kelontong & Grosir Sembako',
      avatar: 'UQ',
      icon: <Store className="w-5 h-5 text-emerald-700" />,
      features: ['Quick Barcode Scanner Laser Beep', 'Penataan Rak Lorong A, B, C', 'Fast Cart Drawer & Penjualan Grosir'],
      tag: 'Quick POS'
    },
    {
      type: 'collabqu',
      title: 'CollabQu (Konsinyasi)',
      sub: 'Kemitraan Toko & Titip Jual',
      avatar: 'CQ',
      icon: <Handshake className="w-5 h-5 text-indigo-700" />,
      features: ['List Toko Gaya Underline Border', 'Badge [Terjual, Retur, Restok]', 'Tracking Sisa Stok & Bagi Hasil'],
      tag: 'Konsinyasi'
    }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-[#047857] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
              <Layers className="w-4 h-4 text-emerald-100" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">Partisi Plugin Usaha Qu</h3>
              <p className="text-[11px] text-emerald-200">Ganti Mode Usaha Seketika</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          <div className="text-[11px] text-slate-500 leading-relaxed bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              <strong>Arsitektur Universal:</strong> Seluruh modul manajerial (Kasir POS, Laporan Keuangan, Pelanggan WA) terintegrasi otomatis di setiap mode.
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {plugins.map((item) => {
              const isSelected = currentType === item.type;
              return (
                <button
                  key={item.type}
                  onClick={() => {
                    onSelect(item.type);
                    onClose();
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex flex-col gap-2 relative tap-active ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center text-sm shadow-xs ${
                        isSelected ? 'bg-[#047857] text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {item.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          <span>{item.title}</span>
                        </div>
                        <div className="text-[10px] text-slate-500">{item.sub}</div>
                      </div>
                    </div>

                    {isSelected ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                        Aktif
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Highlights */}
                  <div className="bg-white/80 rounded-xl p-2 border border-slate-100 text-[10px] text-slate-600 space-y-1">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-600"></span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <p className="text-[10px] text-slate-400">
            Pilihan plugin tersimpan otomatis di perangkat lokal
          </p>
        </div>

      </div>
    </div>
  );
};
