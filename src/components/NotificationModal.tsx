import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle2, Clock, Wrench } from 'lucide-react';

interface NotificationModalProps {
  onClose: () => void;
  onNavigateToModule: (view: any) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  onClose,
  onNavigateToModule
}) => {
  const notifications = [
    {
      id: '1',
      title: 'Antrian Baru Masuk',
      message: 'Nomor A-04 (B 3091 KTT) mendaftar ganti rantai motor sport.',
      time: '5 menit lalu',
      type: 'queue',
      target: 'queue'
    },
    {
      id: '2',
      title: 'Peringatan Stok Menipis',
      message: 'V-Belt Bando (Sisa 2 set) dan Kampas Rem Nissin (Sisa 3 set) perlu restock segera.',
      time: '15 menit lalu',
      type: 'inventory',
      target: 'inventory'
    },
    {
      id: '3',
      title: 'Unit Siap Kasir',
      message: 'SPK #003 (Honda Beat FI B 5509 PLZ) telah selesai tahap QC & siap pembayaran.',
      time: '30 menit lalu',
      type: 'cashier',
      target: 'cashier'
    },
    {
      id: '4',
      title: 'Pengingat Servis Rutin',
      message: '5 pelanggan setia sudah melewati jadwal 3 bulan servis berkala.',
      time: '1 jam lalu',
      type: 'marketing',
      target: 'marketing'
    }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        
        <div className="bg-[#047857] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-200" />
            <span className="font-bold text-sm">Notifikasi Bengkel</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          {notifications.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onClose();
                onNavigateToModule(item.target);
              }}
              className="w-full text-left bg-slate-50 hover:bg-emerald-50/50 p-3 rounded-2xl border border-slate-200/80 transition flex gap-3 group"
            >
              <div className="mt-0.5">
                {item.type === 'inventory' ? (
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                ) : item.type === 'cashier' ? (
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-[#047857] text-white flex items-center justify-center">
                    <Wrench className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400">{item.time}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                  {item.message}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="text-xs font-bold text-emerald-800 hover:underline"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
