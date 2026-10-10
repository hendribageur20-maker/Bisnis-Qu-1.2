import React from 'react';
import { X, Printer, Share2, CheckCircle2 } from 'lucide-react';
import { TransactionReceipt } from '../types';

interface ReceiptModalProps {
  receipt: TransactionReceipt;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  receipt,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*NOTA SERVIS BENGKEL MAJU MOTOR (BISNIS QU)*\n` +
      `No. Nota: ${receipt.receiptNumber}\n` +
      `Tanggal: ${receipt.date}\n` +
      `Pelanggan: ${receipt.customerName} (${receipt.vehiclePlate})\n` +
      `--------------------------------\n` +
      receipt.items.map(i => `${i.name} (x${i.qty}) : Rp ${(i.price * i.qty).toLocaleString('id-ID')}`).join('\n') +
      `\n--------------------------------\n` +
      `Subtotal: Rp ${receipt.subtotal.toLocaleString('id-ID')}\n` +
      `Diskon: Rp ${receipt.discount.toLocaleString('id-ID')}\n` +
      `*TOTAL: Rp ${receipt.total.toLocaleString('id-ID')}*\n` +
      `Metode Bayar: ${receipt.paymentMethod}\n\n` +
      `Terima kasih telah mempercayakan kendaraan Anda kepada kami!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#047857] text-white p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <span className="font-bold text-sm">Transaksi Berhasil</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Realistic Thermal Receipt Body */}
        <div className="p-5 overflow-y-auto bg-amber-50/25 flex-1 font-mono text-xs">
          
          <div className="text-center pb-3 border-b border-dashed border-slate-300">
            <div className="font-extrabold text-sm text-slate-900 tracking-tight">BENGKEL MAJU MOTOR</div>
            <div className="text-[10px] text-slate-500 font-sans mt-0.5">Sistem Kasir Bisnis Qu 1.0</div>
            <div className="text-[9px] text-slate-400 font-sans">Jl. Raya Otomotif No. 88 • WA: 0812-3456-7890</div>
          </div>

          <div className="py-2.5 border-b border-dashed border-slate-300 text-[11px] space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">No. Nota:</span>
              <span className="font-bold text-slate-800">{receipt.receiptNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tanggal:</span>
              <span className="text-slate-700">{receipt.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Pelanggan:</span>
              <span className="font-bold text-slate-800">{receipt.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">No. Plat:</span>
              <span className="font-bold text-slate-800">{receipt.vehiclePlate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Mekanik:</span>
              <span className="text-slate-700">{receipt.mechanicName}</span>
            </div>
          </div>

          {/* Items */}
          <div className="py-3 border-b border-dashed border-slate-300 space-y-2">
            {receipt.items.map((it, idx) => (
              <div key={idx} className="flex justify-between text-[11px] leading-tight">
                <div className="pr-2">
                  <div className="text-slate-800 font-medium">{it.name}</div>
                  <div className="text-[10px] text-slate-400">
                    {it.qty} x Rp {it.price.toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="text-slate-800 font-bold shrink-0">
                  Rp {(it.price * it.qty).toLocaleString('id-ID')}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="py-2.5 border-b border-dashed border-slate-300 space-y-1 text-[11px]">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span>Rp {receipt.subtotal.toLocaleString('id-ID')}</span>
            </div>
            {receipt.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Diskon:</span>
                <span>-Rp {receipt.discount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="flex justify-between font-black text-sm text-slate-900 pt-1">
              <span>TOTAL:</span>
              <span>Rp {receipt.total.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-slate-600 pt-1">
              <span>Bayar ({receipt.paymentMethod}):</span>
              <span>Rp {(receipt.cashPaid || receipt.total).toLocaleString('id-ID')}</span>
            </div>
            {receipt.paymentMethod === 'Tunai' && (
              <div className="flex justify-between text-slate-600">
                <span>Kembalian:</span>
                <span>Rp {(receipt.change || 0).toLocaleString('id-ID')}</span>
              </div>
            )}
          </div>

          <div className="text-center pt-3 text-[10px] text-slate-500 space-y-1">
            <p>*** GARANSI SERVIS 7 HARI ***</p>
            <p className="text-[9px]">Simpan struk ini sebagai bukti garansi resmi.</p>
            <p className="text-[9px] text-slate-400">Powered by Bisnis Qu 1.0 Mobile</p>
          </div>

        </div>

        {/* Modal Buttons */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={handleShareWhatsApp}
            className="flex-1 py-2 px-3 rounded-xl border border-emerald-300 text-emerald-800 hover:bg-emerald-50 text-xs font-bold flex items-center justify-center gap-1.5 transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Kirim WA</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-2 px-3 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Thermal</span>
          </button>
        </div>

      </div>
    </div>
  );
};
