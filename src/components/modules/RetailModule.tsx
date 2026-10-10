import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Barcode, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  Boxes, 
  Receipt, 
  AlertTriangle, 
  Check, 
  Sparkles,
  Volume2
} from 'lucide-react';
import { RetailProduct, RetailAisle, CartItem } from '../../types';
import { playBarcodeBeep } from '../../utils/audio';

interface RetailModuleProps {
  products: RetailProduct[];
  onBack: () => void;
  onSendToCashierWithCart: (cartItems: CartItem[]) => void;
}

export const RetailModule: React.FC<RetailModuleProps> = ({
  products,
  onBack,
  onSendToCashierWithCart
}) => {
  const [activeTab, setActiveTab] = useState<'scanner' | 'aisles'>('scanner');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [selectedAisle, setSelectedAisle] = useState<string>('Semua');
  const [lastScannedName, setLastScannedName] = useState<string | null>(null);

  // Fast Cart Drawer state
  const [cart, setCart] = useState<CartItem[]>([
    { id: 'ret-4', name: 'Indomie Goreng Spesial 85g', price: 3500, qty: 5, type: 'retail', barcode: '8991234560012' },
    { id: 'ret-5', name: 'Teh Botol Sosro Kotak 250ml', price: 4500, qty: 2, type: 'retail', barcode: '8992775123456' }
  ]);

  const handleScanProduct = (product: RetailProduct) => {
    playBarcodeBeep();
    setLastScannedName(product.name);
    setTimeout(() => setLastScannedName(null), 2500);

    setCart((prev) => {
      const existing = prev.find(i => i.barcode === product.barcode || i.name === product.name);
      if (existing) {
        return prev.map(i => i.barcode === product.barcode ? { ...i, qty: i.qty + 1 } : i);
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.sellPrice,
          qty: 1,
          type: 'retail',
          barcode: product.barcode
        }
      ];
    });
  };

  const handleManualBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput) return;

    const matched = products.find(p => p.barcode === barcodeInput.trim() || p.name.toLowerCase().includes(barcodeInput.toLowerCase()));
    if (matched) {
      handleScanProduct(matched);
      setBarcodeInput('');
    } else {
      // Create quick unknown item
      playBarcodeBeep();
      setCart(prev => [
        ...prev,
        {
          id: `custom-${Date.now()}`,
          name: `Item Barcode: ${barcodeInput}`,
          price: 10000,
          qty: 1,
          type: 'retail',
          barcode: barcodeInput
        }
      ]);
      setBarcodeInput('');
    }
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = item.qty + delta;
        return nextQty > 0 ? { ...item, qty: nextQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredProducts = products.filter(p => {
    if (selectedAisle === 'Semua') return true;
    return p.aisle === selectedAisle;
  });

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      
      {/* Top Header */}
      <div className="bg-[#047857] text-white px-5 pt-4 pb-5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 transition flex items-center justify-center text-white border border-white/20"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-800/80 px-1.5 py-0.5 rounded text-emerald-200">Ritel & Minimarket</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">Kasir Barcode & Rak</h1>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-emerald-200 uppercase font-semibold">Total Keranjang</div>
            <div className="text-base font-black text-white font-mono">
              Rp {cartTotal.toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'scanner' ? 'bg-[#047857] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Barcode className="w-3.5 h-3.5" />
            <span>Quick Scanner</span>
          </button>
          <button
            onClick={() => setActiveTab('aisles')}
            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'aisles' ? 'bg-[#047857] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Boxes className="w-3.5 h-3.5" />
            <span>Penataan Rak & Lorong</span>
          </button>
        </div>

        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          {cart.length} Item
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        
        {activeTab === 'scanner' && (
          <div className="space-y-3.5">
            {/* Quick Barcode Scanner Form */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Barcode className="w-4 h-4 text-emerald-700" />
                  <span>Simulasi Laser Barcode Scanner</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <Volume2 className="w-3 h-3" />
                  Beep Sound Ready
                </span>
              </div>

              <form onSubmit={handleManualBarcodeSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ketik/Paste 13-digit Barcode atau nama..."
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono focus:outline-emerald-600"
                />
                <button
                  type="submit"
                  className="bg-[#047857] hover:bg-[#065f46] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs active:scale-95 transition"
                >
                  Scan
                </button>
              </form>

              {/* Laser Scanned Feedback Alert */}
              {lastScannedName && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2 text-xs text-emerald-900 flex items-center gap-1.5 animate-bounce">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>Berhasil scan: <strong>{lastScannedName}</strong> (+1 ke keranjang)</span>
                </div>
              )}
            </div>

            {/* Tap to Scan Quick Barcode Chips */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-700 flex items-center justify-between px-1">
                <span>Klik untuk Simulasi Scan Barcode:</span>
                <span className="text-[10px] text-slate-400 font-normal">Fast moving retail</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {products.slice(0, 6).map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handleScanProduct(prod)}
                    className="bg-white hover:bg-emerald-50/70 active:scale-95 border border-slate-200/90 rounded-2xl p-2.5 text-left shadow-2xs transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[9px] font-mono text-slate-400 truncate">
                        ||| {prod.barcode}
                      </div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 truncate mt-0.5">
                        {prod.name}
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="font-extrabold text-emerald-800 font-mono">
                        Rp {prod.sellPrice.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[9px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {prod.shelfLocation.split(' - ')[0]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fast Cart Drawer (Keranjang Belanja Instan) */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-slate-800">Fast Cart Drawer ({cart.length})</span>
                </div>
                {cart.length > 0 && (
                  <button
                    onClick={() => setCart([])}
                    className="text-[10px] text-rose-600 hover:underline"
                  >
                    Kosongkan
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="py-2 flex items-center justify-between gap-2 text-xs">
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-800 truncate">{item.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Rp {item.price.toLocaleString('id-ID')}
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
                        <span className="px-2 font-bold font-mono">{item.qty}</span>
                        <button
                          onClick={() => handleUpdateQty(item.id, 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono font-bold text-slate-900 w-16 text-right">
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

              {/* Checkout Button to POS */}
              <button
                onClick={() => onSendToCashierWithCart(cart)}
                disabled={cart.length === 0}
                className="w-full bg-[#047857] hover:bg-[#065f46] disabled:opacity-50 text-white py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow transition"
              >
                <Receipt className="w-4 h-4" />
                <span>Bayar Sekarang ke Kasir POS (Rp {cartTotal.toLocaleString('id-ID')})</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab Penataan Rak & Lorong */}
        {activeTab === 'aisles' && (
          <div className="space-y-3">
            <div className="flex gap-1.5 overflow-x-auto text-xs pb-1">
              {['Semua', 'Lorong A - Sembako', 'Lorong B - Snack & Minuman', 'Lorong C - Kebersihan & Rumah'].map((aisle) => (
                <button
                  key={aisle}
                  onClick={() => setSelectedAisle(aisle)}
                  className={`px-3 py-1.5 rounded-xl shrink-0 font-medium transition ${
                    selectedAisle === aisle
                      ? 'bg-[#047857] text-white font-bold shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {aisle.replace(' - ', ' • ')}
                </button>
              ))}
            </div>

            <div className="space-y-2.5">
              {filteredProducts.map((p) => {
                const isLow = p.stock <= p.minStock;
                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {p.shelfLocation}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {p.barcode}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mt-1">{p.name}</h4>
                      <p className="text-[11px] text-slate-500">{p.aisle}</p>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isLow ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        Stok: {p.stock} {p.unit}
                      </span>
                      <div className="font-mono font-bold text-xs text-slate-900 mt-1">
                        Rp {p.sellPrice.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
