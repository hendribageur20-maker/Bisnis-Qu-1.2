import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Receipt, 
  Trash2, 
  Plus, 
  Minus, 
  QrCode, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  Search,
  Printer,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { CartItem, ServiceWorkOrder, SparePart, TransactionReceipt } from '../../types';

interface CashierModuleProps {
  orders: ServiceWorkOrder[];
  parts: SparePart[];
  onBack: () => void;
  onFinishTransaction: (receipt: TransactionReceipt) => void;
}

export const CashierModule: React.FC<CashierModuleProps> = ({
  orders,
  parts,
  onBack,
  onFinishTransaction
}) => {
  const readyOrders = orders.filter(o => o.status === 'Siap Kasir');

  const [cart, setCart] = useState<CartItem[]>([
    { id: 'srv-1', name: 'Jasa Servis Lengkap CVT & Injeksi', price: 90000, qty: 1, type: 'service' },
    { id: 'part-1', name: 'Oli Mesin AHM MPX2 Matic 0.8L', price: 65000, qty: 1, type: 'part' }
  ]);
  const [customerName, setCustomerName] = useState('Budi Santoso');
  const [vehiclePlate, setVehiclePlate] = useState('B 4128 SXZ');
  const [mechanicName, setMechanicName] = useState('Agus Santoso');

  const [paymentMethod, setPaymentMethod] = useState<TransactionReceipt['paymentMethod']>('Tunai');
  const [discount, setDiscount] = useState(10000);
  const [cashAmount, setCashAmount] = useState<number>(200000);
  const [partSearch, setPartSearch] = useState('');

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = Math.max(0, subtotal - discount);
  const change = Math.max(0, cashAmount - total);

  const handleLoadOrder = (order: ServiceWorkOrder) => {
    setCustomerName(order.customerName);
    setVehiclePlate(order.vehiclePlate);
    setMechanicName(order.mechanicName);

    const newCart: CartItem[] = [
      { id: `labor-${order.id}`, name: `Jasa Servis (${order.complaint})`, price: order.laborCost, qty: 1, type: 'service' },
      ...order.partsUsed.map((p, idx) => ({
        id: `part-${order.id}-${idx}`,
        name: p.name,
        price: p.price,
        qty: p.qty,
        type: 'part' as const
      }))
    ];
    setCart(newCart);
  };

  const handleAddPartToCart = (part: SparePart) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === part.name);
      if (existing) {
        return prev.map(i => i.name === part.name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: part.id, name: part.name, price: part.sellPrice, qty: 1, type: 'part' }];
    });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const handlePay = () => {
    if (cart.length === 0) return;

    const receipt: TransactionReceipt = {
      id: `RCP-${Date.now().toString().slice(-5)}`,
      receiptNumber: `BQ-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WIB',
      customerName: customerName || 'Pelanggan Umum',
      vehiclePlate: vehiclePlate || '-',
      mechanicName: mechanicName || 'Teknisi Bisnis Qu',
      items: [...cart],
      subtotal,
      discount,
      tax: 0,
      total,
      paymentMethod,
      cashPaid: paymentMethod === 'Tunai' ? cashAmount : total,
      change: paymentMethod === 'Tunai' ? change : 0
    };

    onFinishTransaction(receipt);
  };

  const filteredParts = parts.filter(p => 
    p.name.toLowerCase().includes(partSearch.toLowerCase()) || 
    p.sku.toLowerCase().includes(partSearch.toLowerCase())
  );

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
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">Kasir POS & Nota</h1>
              <p className="text-xs text-emerald-100 font-medium">Pembayaran Servis & Penjualan Part</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-emerald-200 uppercase font-semibold">Total Tagihan</div>
            <div className="text-lg font-black text-white font-mono">
              Rp {total.toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">

        {/* Ready Orders quick import */}
        {readyOrders.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3">
            <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Unit Siap Kasir ({readyOrders.length} Kendaraan)</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {readyOrders.map((ord) => (
                <button
                  key={ord.id}
                  onClick={() => handleLoadOrder(ord)}
                  className="bg-white hover:bg-emerald-50 active:scale-95 transition border border-amber-300 rounded-xl px-3 py-2 text-left shrink-0 shadow-xs"
                >
                  <div className="text-xs font-bold text-slate-800">{ord.vehiclePlate}</div>
                  <div className="text-[11px] text-slate-600">{ord.customerName}</div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-1">
                    Rp {ord.estimatedCost.toLocaleString('id-ID')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pelanggan & Kendaraan Info Bar */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-2">
          <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
            <span>Rincian Nota</span>
            <span className="text-[11px] text-slate-400 font-normal">Edit informasi bila perlu</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <input
              type="text"
              placeholder="Nama Pelanggan"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 font-medium"
            />
            <input
              type="text"
              placeholder="No. Plat Polisi"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value.toUpperCase())}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 font-mono uppercase font-bold"
            />
          </div>
        </div>

        {/* Keranjang Belanja / Bill Items */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Item Transaksi ({cart.length})</span>
            <button
              onClick={() => setCart([])}
              className="text-[11px] text-rose-600 hover:underline font-normal"
            >
              Kosongkan
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {cart.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-800 truncate">{item.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Rp {item.price.toLocaleString('id-ID')} × {item.qty}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center border border-slate-200 rounded-lg">
                    <button
                      onClick={() => handleUpdateQty(item.id, -1)}
                      className="p-1 hover:bg-slate-100 text-slate-600"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-bold font-mono">{item.qty}</span>
                    <button
                      onClick={() => handleUpdateQty(item.id, 1)}
                      className="p-1 hover:bg-slate-100 text-slate-600"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-xs font-bold text-slate-800 font-mono w-20 text-right">
                    Rp {(item.price * item.qty).toLocaleString('id-ID')}
                  </span>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Add Sparepart from Catalog */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
              <span>Tambah Sparepart / Oli Langsung:</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {parts.slice(0, 4).map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleAddPartToCart(p)}
                  className="bg-slate-50 hover:bg-emerald-50 active:scale-95 border border-slate-200 rounded-xl px-2.5 py-1.5 text-left shrink-0 text-xs transition"
                >
                  <div className="font-semibold text-slate-800 text-[11px] truncate max-w-[140px]">{p.name}</div>
                  <div className="text-emerald-700 font-bold text-[10px] font-mono">
                    + Rp {p.sellPrice.toLocaleString('id-ID')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pembayaran & Kalkulasi */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-800">Metode Pembayaran</div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPaymentMethod('Tunai')}
              className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition ${
                paymentMethod === 'Tunai'
                  ? 'bg-[#047857] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Banknote className="w-4 h-4" />
              <span>Tunai</span>
            </button>
            <button
              onClick={() => setPaymentMethod('QRIS')}
              className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition ${
                paymentMethod === 'QRIS'
                  ? 'bg-[#047857] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>QRIS</span>
            </button>
            <button
              onClick={() => setPaymentMethod('Transfer Bank')}
              className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition ${
                paymentMethod === 'Transfer Bank'
                  ? 'bg-[#047857] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Transfer</span>
            </button>
          </div>

          {/* If Cash, show quick amount selectors & change */}
          {paymentMethod === 'Tunai' && (
            <div className="space-y-2 pt-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Uang Diterima:</span>
                <input
                  type="number"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(Number(e.target.value))}
                  className="w-32 px-2 py-1 text-right font-mono font-bold text-xs rounded border border-slate-300"
                />
              </div>

              <div className="flex gap-1.5 justify-end">
                <button
                  type="button"
                  onClick={() => setCashAmount(total)}
                  className="text-[10px] font-bold bg-white px-2 py-1 rounded border border-slate-200 hover:bg-slate-100"
                >
                  Uang Pas
                </button>
                <button
                  type="button"
                  onClick={() => setCashAmount(100000)}
                  className="text-[10px] font-bold bg-white px-2 py-1 rounded border border-slate-200 hover:bg-slate-100"
                >
                  100k
                </button>
                <button
                  type="button"
                  onClick={() => setCashAmount(200000)}
                  className="text-[10px] font-bold bg-white px-2 py-1 rounded border border-slate-200 hover:bg-slate-100"
                >
                  200k
                </button>
                <button
                  type="button"
                  onClick={() => setCashAmount(500000)}
                  className="text-[10px] font-bold bg-white px-2 py-1 rounded border border-slate-200 hover:bg-slate-100"
                >
                  500k
                </button>
              </div>

              <div className="flex items-center justify-between text-xs font-bold pt-1 border-t border-slate-200">
                <span className="text-slate-700">Kembalian:</span>
                <span className="text-emerald-700 font-mono text-sm">
                  Rp {change.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          )}

          {/* Diskon / Voucher Bengkel */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-600">Diskon Member/Voucher:</span>
            <div className="flex items-center gap-1 font-mono">
              <span className="text-slate-400">- Rp</span>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-24 px-2 py-1 text-right text-xs rounded border border-slate-200 font-mono"
              />
            </div>
          </div>

          {/* Ringkasan Total Final */}
          <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal:</span>
              <span className="font-mono">Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Diskon:</span>
              <span className="font-mono text-emerald-700">- Rp {discount.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between font-black text-slate-900 text-sm pt-1 border-t border-slate-200">
              <span>Total Akhir:</span>
              <span className="text-[#047857] font-mono text-base">
                Rp {total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button: Bayar & Cetak Nota */}
        <button
          onClick={handlePay}
          disabled={cart.length === 0}
          className="w-full bg-[#047857] hover:bg-[#065f46] disabled:opacity-50 text-white py-3.5 px-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition"
        >
          <Printer className="w-5 h-5" />
          <span>Selesaikan Transaksi & Cetak Struk</span>
        </button>

      </div>

    </div>
  );
};
