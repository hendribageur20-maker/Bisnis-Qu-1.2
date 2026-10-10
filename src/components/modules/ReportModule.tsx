import React from 'react';
import { ArrowLeft, TrendingUp, DollarSign, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { TransactionReceipt } from '../../types';

interface ReportModuleProps {
  receipts: TransactionReceipt[];
  onBack: () => void;
  onViewReceipt: (receipt: TransactionReceipt) => void;
}

export const ReportModule: React.FC<ReportModuleProps> = ({
  receipts,
  onBack,
  onViewReceipt
}) => {
  const totalRevenue = receipts.reduce((sum, r) => sum + r.total, 0);

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
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">Laporan & Omset</h1>
              <p className="text-xs text-emerald-100 font-medium">Rekap Transaksi & Penjualan</p>
            </div>
          </div>
        </div>

        {/* Daily Total */}
        <div className="bg-emerald-800/70 border border-emerald-600/40 rounded-2xl p-3.5 mt-3.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-emerald-200 uppercase font-semibold">Total Omset Kasir Hari Ini</div>
            <div className="text-2xl font-black text-white font-mono mt-0.5">
              Rp {totalRevenue.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-emerald-200">Total Transaksi</div>
            <div className="text-lg font-bold text-amber-300 font-mono">
              {receipts.length} Nota
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase px-1">
          <span>Riwayat Nota Transaksi</span>
          <span>Status: Lunas</span>
        </div>

        {receipts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-400">
            Belum ada transaksi hari ini
          </div>
        ) : (
          receipts.map((rcp) => (
            <button
              key={rcp.id}
              onClick={() => onViewReceipt(rcp)}
              className="w-full bg-white hover:bg-emerald-50/40 transition p-3.5 rounded-2xl border border-slate-200 shadow-xs text-left flex items-center justify-between group tap-active"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                    {rcp.receiptNumber}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    {rcp.vehiclePlate}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">
                  {rcp.customerName}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {rcp.date} • {rcp.paymentMethod}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-black text-slate-900 font-mono">
                  Rp {rcp.total.toLocaleString('id-ID')}
                </div>
                <div className="text-[10px] font-semibold text-emerald-700 mt-0.5 flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Lihat Struk</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

    </div>
  );
};
