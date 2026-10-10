import React from 'react';
import { ArrowLeft, UserCheck, Star, ShieldCheck, Wrench, Coins, Award } from 'lucide-react';
import { Mechanic } from '../../types';

interface MechanicModuleProps {
  mechanics: Mechanic[];
  onBack: () => void;
}

export const MechanicModule: React.FC<MechanicModuleProps> = ({
  mechanics,
  onBack
}) => {
  const totalIncentive = mechanics.reduce((sum, m) => sum + m.incentiveToday, 0);
  const totalCompleted = mechanics.reduce((sum, m) => sum + m.completedToday, 0);

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      
      {/* Header */}
      <div className="bg-[#047857] text-white px-5 pt-4 pb-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 transition flex items-center justify-center text-white border border-white/20"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">Mekanik & Teknisi</h1>
              <p className="text-xs text-emerald-100 font-medium">Beban Stall & Insentif Kerja</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mt-3.5">
          <div className="bg-emerald-800/60 rounded-xl p-2.5 border border-emerald-600/40">
            <div className="text-[10px] text-emerald-200">Total Unit Selesai Hari Ini</div>
            <div className="text-base font-bold text-white">{totalCompleted} Kendaraan</div>
          </div>
          <div className="bg-emerald-800/60 rounded-xl p-2.5 border border-emerald-600/40">
            <div className="text-[10px] text-emerald-200">Total Akumulasi Insentif</div>
            <div className="text-base font-bold text-white font-mono">
              Rp {totalIncentive.toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <div className="px-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Daftar Teknisi Aktif ({mechanics.length})
        </div>

        {mechanics.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-2.5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#047857] text-white flex items-center justify-center font-bold text-sm">
                  {m.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">{m.name}</h3>
                    <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{m.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{m.specialty}</p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  m.status === 'Tersedia'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {m.status}
              </span>
            </div>

            <div className="bg-slate-50 rounded-xl p-2.5 text-xs flex items-center justify-between border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Wrench className="w-3.5 h-3.5 text-emerald-700" />
                <span>Unit Aktif: <strong>{m.activeOrders}</strong> • Selesai: <strong>{m.completedToday}</strong></span>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400">Insentif Hari Ini</div>
                <div className="font-bold text-emerald-700 font-mono text-xs">
                  Rp {m.incentiveToday.toLocaleString('id-ID')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
