import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  AlertTriangle, 
  Package, 
  Boxes, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { SparePart } from '../../types';

interface InventoryModuleProps {
  parts: SparePart[];
  onBack: () => void;
  onRestock: (partId: string, amount: number) => void;
  onAddPart: (part: Omit<SparePart, 'id'>) => void;
}

export const InventoryModule: React.FC<InventoryModuleProps> = ({
  parts,
  onBack,
  onRestock,
  onAddPart
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Add Part Form State
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<SparePart['category']>('Oli & Cairan');
  const [stock, setStock] = useState(10);
  const [minStock, setMinStock] = useState(5);
  const [unit, setUnit] = useState('Botol');
  const [buyPrice, setBuyPrice] = useState(50000);
  const [sellPrice, setSellPrice] = useState(65000);
  const [brand, setBrand] = useState('Original OEM');
  const [suitableVehicles, setSuitableVehicles] = useState('Honda Matic');

  const filteredParts = parts.filter((part) => {
    const matchesSearch = 
      part.name.toLowerCase().includes(search.toLowerCase()) ||
      part.sku.toLowerCase().includes(search.toLowerCase()) ||
      part.suitableVehicles.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Semua' || part.category === selectedCategory;
    const matchesLowStock = !showLowStockOnly || part.stock <= part.minStock;

    return matchesSearch && matchesCategory && matchesLowStock;
  });

  const lowStockCount = parts.filter(p => p.stock <= p.minStock).length;
  const totalValuation = parts.reduce((sum, p) => sum + p.stock * p.sellPrice, 0);

  const handleCreatePart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sku || !name) return;

    onAddPart({
      sku: sku.toUpperCase(),
      name,
      category,
      stock,
      minStock,
      unit,
      buyPrice,
      sellPrice,
      brand,
      suitableVehicles
    });

    setSku('');
    setName('');
    setShowAddModal(false);
  };

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
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">Inventaris Sparepart</h1>
              <p className="text-xs text-emerald-100 font-medium">Stok Suku Cadang & Pelumas</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-white text-emerald-800 hover:bg-emerald-50 px-3 py-2 rounded-xl text-xs font-bold shadow transition active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Tambah Part</span>
          </button>
        </div>

        {/* Quick summary stats */}
        <div className="grid grid-cols-2 gap-2 mt-3.5">
          <div className="bg-emerald-800/60 rounded-xl p-2.5 border border-emerald-600/40">
            <div className="text-[10px] text-emerald-200">Total Nilai Stok Jual</div>
            <div className="text-sm font-bold text-white font-mono">
              Rp {totalValuation.toLocaleString('id-ID')}
            </div>
          </div>

          <button
            onClick={() => setShowLowStockOnly(!showLowStockOnly)}
            className={`rounded-xl p-2.5 text-left transition border ${
              showLowStockOnly 
                ? 'bg-amber-400 text-slate-900 border-amber-300 font-bold' 
                : 'bg-emerald-800/60 text-white border-emerald-600/40'
            }`}
          >
            <div className="text-[10px] opacity-90 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-300" />
              <span>Stok Kritis / Menipis</span>
            </div>
            <div className="text-sm font-bold mt-0.5">
              {lowStockCount} Item Perlu Re-Order
            </div>
          </button>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="bg-white border-b border-slate-200 p-3 space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari sparepart, SKU, tipe motor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-emerald-600"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto text-xs pb-1">
          {['Semua', 'Oli & Cairan', 'Pengereman', 'Mesin & CVT', 'Ban & Velg', 'Kelistrikan'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition ${
                selectedCategory === cat
                  ? 'bg-[#047857] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Part List */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {filteredParts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-400">
            <Package className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-xs font-semibold text-slate-600">Tidak ada sparepart ditemukan</p>
          </div>
        ) : (
          filteredParts.map((part) => {
            const isLow = part.stock <= part.minStock;
            return (
              <div
                key={part.id}
                className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex flex-col gap-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                        {part.sku}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {part.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">{part.name}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Cocok untuk: {part.suitableVehicles}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                        isLow ? 'bg-rose-100 text-rose-800 animate-pulse' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isLow ? `Sisa ${part.stock} ${part.unit} (Menipis)` : `${part.stock} ${part.unit}`}
                    </span>
                    <div className="text-xs font-extrabold text-slate-900 font-mono mt-1">
                      Rp {part.sellPrice.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-2 text-xs flex items-center justify-between border border-slate-100">
                  <div className="text-[11px] text-slate-500">
                    Beli: <span className="font-mono font-semibold">Rp {part.buyPrice.toLocaleString('id-ID')}</span> • Margin: <strong className="text-emerald-700 font-mono">+Rp {(part.sellPrice - part.buyPrice).toLocaleString('id-ID')}</strong>
                  </div>
                  
                  {/* Quick restock buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onRestock(part.id, 5)}
                      className="text-[10px] font-bold bg-white hover:bg-emerald-50 text-emerald-800 px-2 py-1 rounded-md border border-emerald-200 shadow-xs active:scale-95 transition"
                    >
                      +5 Restock
                    </button>
                    <button
                      onClick={() => onRestock(part.id, 10)}
                      className="text-[10px] font-bold bg-white hover:bg-emerald-50 text-emerald-800 px-2 py-1 rounded-md border border-emerald-200 shadow-xs active:scale-95 transition"
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Tambah Sparepart Baru */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900">Tambah Sparepart Baru</h3>
            <p className="text-xs text-slate-500 mt-0.5">Input data stok suku cadang bengkel</p>

            <form onSubmit={handleCreatePart} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kode SKU</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: OLI-MOTUL-01"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 font-mono uppercase focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Produk</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Oli Motul Scooter Expert LE 0.8L"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as SparePart['category'])}
                    className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Oli & Cairan">Oli & Cairan</option>
                    <option value="Pengereman">Pengereman</option>
                    <option value="Mesin & CVT">Mesin & CVT</option>
                    <option value="Ban & Velg">Ban & Velg</option>
                    <option value="Kelistrikan">Kelistrikan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Satuan</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Stok Awal</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Batas Minimal</label>
                  <input
                    type="number"
                    value={minStock}
                    onChange={(e) => setMinStock(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Harga Beli (Rp)</label>
                  <input
                    type="number"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kesesuaian Kendaraan</label>
                <input
                  type="text"
                  placeholder="Contoh: Universal Matic Beat/Vario/Mio"
                  value={suitableVehicles}
                  onChange={(e) => setSuitableVehicles(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 px-3 rounded-xl border border-slate-300 text-slate-600 text-xs font-semibold hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white text-xs font-bold shadow-sm"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
