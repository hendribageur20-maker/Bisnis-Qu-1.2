import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Store, 
  Package, 
  Percent, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  RotateCcw, 
  Clock, 
  DollarSign, 
  X,
  FileText,
  Share2
} from 'lucide-react';
import { CollabStore, ConsignmentStock } from '../../types';
import { ThemePalette } from '../../utils/themeConfig';

interface CollabQuModuleProps {
  stores: CollabStore[];
  stocks: ConsignmentStock[];
  theme: ThemePalette;
  onBack: () => void;
  onAddStore: (store: Omit<CollabStore, 'id' | 'totalSold' | 'totalReturned' | 'totalRestocked' | 'joinedDate'>) => void;
  onAddStock: (stock: Omit<ConsignmentStock, 'id' | 'soldQty' | 'returnedQty' | 'remainingQty' | 'consignedDate' | 'status'>) => void;
  onUpdateStockStatus: (stockId: string, status: ConsignmentStock['status']) => void;
}

export const CollabQuModule: React.FC<CollabQuModuleProps> = ({
  stores,
  stocks,
  theme,
  onBack,
  onAddStore,
  onAddStock,
  onUpdateStockStatus
}) => {
  const [activeTab, setActiveTab] = useState<'toko' | 'stok'>('toko');
  const [showAddStoreModal, setShowAddStoreModal] = useState(false);
  const [showAddStockModal, setShowAddStockModal] = useState(false);

  // New Store Form State
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [commissionRate, setCommissionRate] = useState(15);

  // New Stock Form State
  const [selectedStoreId, setSelectedStoreId] = useState(stores[0]?.id || '');
  const [productName, setProductName] = useState('');
  const [consignedQty, setConsignedQty] = useState(30);
  const [pricePerUnit, setPricePerUnit] = useState(15000);

  const handleCreateStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName || !phone) return;

    onAddStore({
      name: storeName,
      ownerName: ownerName || 'Pemilik Toko',
      phone,
      address: address || 'Alamat Toko',
      commissionRate
    });

    setStoreName('');
    setOwnerName('');
    setPhone('');
    setAddress('');
    setShowAddStoreModal(false);
  };

  const handleCreateStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !selectedStoreId) return;

    const targetStore = stores.find(s => s.id === selectedStoreId);
    const storeNameStr = targetStore ? targetStore.name : 'Toko Mitra';

    onAddStock({
      storeId: selectedStoreId,
      storeName: storeNameStr,
      productName,
      consignedQty,
      pricePerUnit
    });

    setProductName('');
    setShowAddStockModal(false);
  };

  const totalConsignmentValue = stocks.reduce((sum, s) => sum + s.consignedQty * s.pricePerUnit, 0);
  const totalItemsSold = stores.reduce((sum, s) => sum + s.totalSold, 0);

  return (
    <div className={`flex-1 flex flex-col ${theme.surfaceBg}`}>
      
      {/* Top Header */}
      <div className={`${theme.headerBg} ${theme.headerText} px-5 pt-4 pb-5 shadow-md`}>
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
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded text-white">
                  CollabQu 1.0
                </span>
                <span className="text-[10px] opacity-80">• Konsinyasi</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">
                Kemitraan Toko & Titip Jual
              </h1>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] opacity-80 uppercase font-semibold">Total Nilai Titip</div>
            <div className="text-sm font-black font-mono text-white">
              Rp {totalConsignmentValue.toLocaleString('id-ID')}
            </div>
          </div>
        </div>

        {/* Floating Mini Summary */}
        <div className="grid grid-cols-3 gap-2 mt-3.5 pt-1">
          <div className="bg-black/20 rounded-xl p-2 text-center border border-white/10">
            <div className="text-[10px] opacity-80">Toko Mitra</div>
            <div className="text-sm font-bold text-white">{stores.length} Toko</div>
          </div>
          <div className="bg-black/20 rounded-xl p-2 text-center border border-white/10">
            <div className="text-[10px] opacity-80">Total Terjual</div>
            <div className="text-sm font-bold text-white font-mono">{totalItemsSold} Pcs</div>
          </div>
          <div className="bg-black/20 rounded-xl p-2 text-center border border-white/10">
            <div className="text-[10px] opacity-80">Batch Titip</div>
            <div className="text-sm font-bold text-white font-mono">{stocks.length} Batch</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('toko')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'toko'
                ? `${theme.accentBg} text-white shadow-xs`
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Toko Mitra ({stores.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stok')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'stok'
                ? `${theme.accentBg} text-white shadow-xs`
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Stok Konsinyasi ({stocks.length})</span>
          </button>
        </div>

        {activeTab === 'toko' ? (
          <button
            onClick={() => setShowAddStoreModal(true)}
            className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-1.5 rounded-xl text-xs font-bold active:scale-95 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Toko Baru</span>
          </button>
        ) : (
          <button
            onClick={() => setShowAddStockModal(true)}
            className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-1.5 rounded-xl text-xs font-bold active:scale-95 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Tambah Stok</span>
          </button>
        )}
      </div>

      {/* Content Body */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        
        {/* =========================================================================
            TAB 1: TOKO MITRA (List toko gaya Underline Border & Badges Terjual, Retur, Restok)
            ========================================================================= */}
        {activeTab === 'toko' && (
          <div className="space-y-3">
            <div className="px-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Daftar Kemitraan Konsinyasi (Gaya Underline Border)
            </div>

            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 divide-y divide-slate-200">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className="p-4 hover:bg-slate-50/70 transition flex flex-col gap-2.5"
                >
                  {/* Store Header & Underline Style */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900">{store.name}</h3>
                        <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-mono">
                          Bagi Hasil: {store.commissionRate}%
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>{store.ownerName}</span>
                        <span>•</span>
                        <span className="font-mono">{store.phone}</span>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400">
                      Mitra sejak {store.joinedDate}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{store.address}</span>
                  </div>

                  {/* Card Detail Minimalis dengan Badge [Terjual, Retur, Restok] */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      Terjual: {store.totalSold} pcs
                    </span>

                    <span className="text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                      Retur: {store.totalReturned} pcs
                    </span>

                    <span className="text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      Restok: {store.totalRestocked} pcs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: STOK KONSINYASI (List stok dengan Sisa Stok, Qty Terjual, dan Status)
            ========================================================================= */}
        {activeTab === 'stok' && (
          <div className="space-y-3">
            <div className="px-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Batch Barang Konsinyasi Aktif
            </div>

            <div className="space-y-2.5">
              {stocks.map((stock) => (
                <div
                  key={stock.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                          {stock.storeName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {stock.consignedDate}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mt-1">{stock.productName}</h4>
                      <div className="text-xs text-emerald-800 font-bold font-mono mt-0.5">
                        Harga: Rp {stock.pricePerUnit.toLocaleString('id-ID')} / pcs
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        stock.status === 'Titip Aktif'
                          ? 'bg-blue-100 text-blue-800'
                          : stock.status === 'Settled / Lunas'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {stock.status}
                    </span>
                  </div>

                  {/* Detail Grid: Sisa Stok, Qty Terjual, Qty Retur */}
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 grid grid-cols-4 gap-2 text-center text-xs">
                    <div>
                      <div className="text-[9px] text-slate-400">Total Titip</div>
                      <div className="font-bold font-mono text-slate-700">{stock.consignedQty}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-emerald-700 font-bold">Qty Terjual</div>
                      <div className="font-bold font-mono text-emerald-800">{stock.soldQty}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500 font-bold">Sisa Stok</div>
                      <div className="font-bold font-mono text-slate-900">{stock.remainingQty}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-rose-600">Retur</div>
                      <div className="font-bold font-mono text-rose-700">{stock.returnedQty}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  {stock.status === 'Titip Aktif' && (
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                      <button
                        onClick={() => onUpdateStockStatus(stock.id, 'Settled / Lunas')}
                        className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Tandai Lunas (Settled)</span>
                      </button>

                      <button
                        onClick={() => onUpdateStockStatus(stock.id, 'Retur')}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-2.5 rounded-xl text-xs font-semibold transition"
                      >
                        Tarik Retur
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Tambah Toko Baru */}
      {showAddStoreModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">+ Toko Mitra Konsinyasi Baru</h3>
                <p className="text-[11px] text-slate-500">Daftarkan outlet mitra titip jual</p>
              </div>
              <button onClick={() => setShowAddStoreModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateStore} className="mt-3 space-y-2.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Toko Mitra</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Toko Manis Sejahtera"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Pemilik</label>
                  <input
                    type="text"
                    placeholder="Bpk/Ibu ..."
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">No. WhatsApp</label>
                  <input
                    type="text"
                    required
                    placeholder="0812xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bagi Hasil / Margin Toko (%)</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={50}
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Alamat Outlet</label>
                <input
                  type="text"
                  placeholder="Jl. ..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStoreModal(false)}
                  className="flex-1 py-2 px-3 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold"
                >
                  Simpan Toko
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Tambah Stok Konsinyasi */}
      {showAddStockModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">+ Tambah Stok Konsinyasi</h3>
                <p className="text-[11px] text-slate-500">Kirim batch titip barang ke toko mitra</p>
              </div>
              <button onClick={() => setShowAddStockModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateStock} className="mt-3 space-y-2.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pilih Toko Mitra</label>
                <select
                  value={selectedStoreId}
                  onChange={(e) => setSelectedStoreId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  {stores.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (Bagi hasil {s.commissionRate}%)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Produk Titipan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Keripik Singkong Balado 250g"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Qty Titip (Pcs)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={consignedQty}
                    onChange={(e) => setConsignedQty(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    required
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStockModal(false)}
                  className="flex-1 py-2 px-3 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold"
                >
                  Kirim Titipan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
