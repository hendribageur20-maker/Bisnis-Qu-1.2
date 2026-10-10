import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Users, 
  Clock, 
  Receipt, 
  CheckCircle2, 
  Utensils, 
  Sparkles, 
  Filter, 
  Flame, 
  Printer, 
  DollarSign, 
  ChevronRight,
  ShoppingBag,
  X
} from 'lucide-react';
import { RestaurantTable, TableZone, TableStatus, MenuItem, TableOrderItem } from '../../types';
import { playKitchenDing } from '../../utils/audio';

interface RestoModuleProps {
  tables: RestaurantTable[];
  menuItems: MenuItem[];
  onBack: () => void;
  onUpdateTableStatus: (tableId: string, status: TableStatus) => void;
  onAddOrderToTable: (tableId: string, item: TableOrderItem) => void;
  onClearTable: (tableId: string) => void;
  onSendToCashier: (table: RestaurantTable) => void;
}

export const RestoModule: React.FC<RestoModuleProps> = ({
  tables,
  menuItems,
  onBack,
  onUpdateTableStatus,
  onAddOrderToTable,
  onClearTable,
  onSendToCashier
}) => {
  const [activeZone, setActiveZone] = useState<string>('Semua');
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);
  const [orderTypeToggle, setOrderTypeToggle] = useState<'Dine-In' | 'Takeaway'>('Dine-In');
  const [activeTab, setActiveTab] = useState<'meja' | 'dapur'>('meja');

  // Filtered tables
  const filteredTables = tables.filter((t) => {
    if (activeZone === 'Semua') return true;
    return t.zone === activeZone;
  });

  const occupiedCount = tables.filter(t => t.status === 'Terisi').length;
  const billingCount = tables.filter(t => t.status === 'Billing').length;
  const emptyCount = tables.filter(t => t.status === 'Kosong').length;

  const handleOpenTableDetail = (table: RestaurantTable) => {
    setSelectedTable(table);
  };

  const handleAddMenuClick = (tableId: string, menuItem: MenuItem) => {
    const orderItem: TableOrderItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      name: menuItem.name,
      qty: 1,
      price: menuItem.price
    };
    onAddOrderToTable(tableId, orderItem);

    // Update local selectedTable view
    if (selectedTable && selectedTable.id === tableId) {
      const updatedItems = [...selectedTable.items, orderItem];
      const newTotal = updatedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
      setSelectedTable({
        ...selectedTable,
        items: updatedItems,
        billTotal: newTotal,
        status: selectedTable.status === 'Kosong' ? 'Terisi' : selectedTable.status
      });
    }
  };

  const getStatusBadge = (status: TableStatus) => {
    switch (status) {
      case 'Terisi':
        return 'bg-emerald-600 text-white';
      case 'Billing':
        return 'bg-amber-500 text-white animate-pulse';
      case 'Reservasi':
        return 'bg-blue-600 text-white';
      case 'Kosong':
      default:
        return 'bg-slate-200 text-slate-700';
    }
  };

  const getTableBorder = (status: TableStatus) => {
    switch (status) {
      case 'Terisi':
        return 'border-emerald-500 bg-emerald-50/30';
      case 'Billing':
        return 'border-amber-400 bg-amber-50/40 ring-1 ring-amber-400';
      case 'Reservasi':
        return 'border-blue-400 bg-blue-50/30';
      case 'Kosong':
      default:
        return 'border-slate-200 bg-white hover:border-slate-300';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      
      {/* Top Header */}
      <div className="bg-[#047857] text-white px-5 pt-4 pb-5 shadow-md relative">
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
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-800/80 px-1.5 py-0.5 rounded text-emerald-200">Resto & Kafe</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">Manajemen Meja</h1>
            </div>
          </div>

          {/* Toggle Dine-In vs Takeaway */}
          <div className="bg-emerald-900/60 p-1 rounded-xl flex items-center border border-emerald-600/50">
            <button
              onClick={() => setOrderTypeToggle('Dine-In')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                orderTypeToggle === 'Dine-In' ? 'bg-white text-emerald-900 shadow-xs' : 'text-emerald-200'
              }`}
            >
              Dine-In
            </button>
            <button
              onClick={() => setOrderTypeToggle('Takeaway')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                orderTypeToggle === 'Takeaway' ? 'bg-white text-emerald-900 shadow-xs' : 'text-emerald-200'
              }`}
            >
              Takeaway
            </button>
          </div>
        </div>

        {/* Status Counter Bar */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-1">
          <div className="bg-emerald-800/60 rounded-xl p-2 text-center border border-emerald-600/40">
            <div className="text-[10px] text-emerald-200">Kosong</div>
            <div className="text-sm font-bold text-white">{emptyCount} Meja</div>
          </div>
          <div className="bg-emerald-800/60 rounded-xl p-2 text-center border border-emerald-600/40">
            <div className="text-[10px] text-emerald-200">Terisi Tamu</div>
            <div className="text-sm font-bold text-emerald-200">{occupiedCount} Meja</div>
          </div>
          <div className="bg-emerald-800/60 rounded-xl p-2 text-center border border-emerald-600/40">
            <div className="text-[10px] text-emerald-200">Minta Bill</div>
            <div className="text-sm font-bold text-amber-300">{billingCount} Meja</div>
          </div>
          <div className="bg-emerald-800/60 rounded-xl p-2 text-center border border-emerald-600/40">
            <div className="text-[10px] text-emerald-200">Reservasi</div>
            <div className="text-sm font-bold text-blue-200">1 VIP</div>
          </div>
        </div>
      </div>

      {/* Tabs & Zone Filters */}
      <div className="bg-white border-b border-slate-200 p-2.5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('meja')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'meja' ? 'bg-[#047857] text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Denah Meja ({tables.length})
            </button>
            <button
              onClick={() => {
                playKitchenDing();
                setActiveTab('dapur');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'dapur' ? 'bg-[#047857] text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Dapur & KDS</span>
            </button>
          </div>
        </div>

        {/* Filter Zona Ruangan: Indoor, Outdoor, Lantai 2, VIP */}
        {activeTab === 'meja' && (
          <div className="flex gap-1.5 overflow-x-auto text-xs pb-0.5">
            {['Semua', 'Indoor (AC)', 'Outdoor Garden', 'Lantai 2', 'VIP Room'].map((z) => (
              <button
                key={z}
                onClick={() => setActiveZone(z)}
                className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition ${
                  activeZone === z
                    ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {z}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {activeTab === 'meja' ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredTables.map((tbl) => (
              <button
                key={tbl.id}
                onClick={() => handleOpenTableDetail(tbl)}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-150 shadow-xs hover:shadow-md tap-active ${getTableBorder(tbl.status)}`}
              >
                <div className="flex items-start justify-between w-full">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-black text-slate-900 font-mono">
                        {tbl.number}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate max-w-[80px]">
                        {tbl.zone.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-700 mt-0.5 truncate">
                      {tbl.name}
                    </div>
                  </div>

                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-tight ${getStatusBadge(tbl.status)}`}>
                    {tbl.status}
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 w-full flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Users className="w-3 h-3 text-slate-400" />
                    <span>{tbl.guestCount}/{tbl.capacity} Org</span>
                  </div>

                  <div className="font-bold text-slate-900 font-mono text-xs">
                    {tbl.billTotal > 0 ? `Rp ${tbl.billTotal.toLocaleString('id-ID')}` : '-'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Kitchen Display System (KDS) */
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-600 shrink-0" />
              <span><strong>Layar Antrian Dapur:</strong> Daftar pesanan masak langsung koki dan racikan barista.</span>
            </div>

            {tables.filter(t => t.items.length > 0).map((t) => (
              <div key={t.id} className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-[#047857] text-white px-2 py-0.5 rounded-lg font-mono">
                      Meja {t.number}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{t.customerName || 'Tamu Resto'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{t.openedAt || 'Baru Masuk'}</span>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {t.items.map((it, idx) => (
                    <div key={idx} className="py-1.5 flex items-center justify-between">
                      <div className="font-semibold text-slate-800">
                        {it.qty}x {it.name}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Sedang Dimasak
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-1 flex items-center justify-end">
                  <button
                    onClick={() => {
                      playKitchenDing();
                      onUpdateTableStatus(t.id, 'Billing');
                    }}
                    className="text-xs font-bold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200 px-3 py-1.5 rounded-xl transition"
                  >
                    Tandai Siap Saji ✓
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lembar Tagihan Meja Popup Modal */}
      {selectedTable && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-[#047857] text-white p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold font-mono">Meja {selectedTable.number}</h3>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${getStatusBadge(selectedTable.status)}`}>
                    {selectedTable.status}
                  </span>
                </div>
                <p className="text-xs text-emerald-100 mt-0.5">{selectedTable.name} • {selectedTable.zone}</p>
              </div>
              <button
                onClick={() => setSelectedTable(null)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
              
              {/* Quick Status Shift */}
              <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="text-slate-600 font-semibold text-[11px]">Ubah Status Meja:</span>
                <div className="flex gap-1">
                  {(['Kosong', 'Terisi', 'Billing'] as TableStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        onUpdateTableStatus(selectedTable.id, st);
                        setSelectedTable({ ...selectedTable, status: st });
                      }}
                      className={`text-[10px] font-bold px-2 py-1 rounded-md transition ${
                        selectedTable.status === st ? 'bg-[#047857] text-white' : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Items List */}
              <div className="space-y-1.5">
                <div className="font-bold text-slate-800 text-xs flex justify-between">
                  <span>Pesanan Makanan/Minuman ({selectedTable.items.length})</span>
                  <span>{orderTypeToggle}</span>
                </div>

                {selectedTable.items.length === 0 ? (
                  <div className="p-4 text-center text-slate-400 bg-slate-50 rounded-xl">
                    Belum ada pesanan makanan/minuman di meja ini.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl p-2.5 bg-slate-50">
                    {selectedTable.items.map((it, idx) => (
                      <div key={idx} className="py-1.5 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-slate-800">{it.name}</div>
                          <div className="text-[10px] text-slate-400">
                            {it.qty} × Rp {it.price.toLocaleString('id-ID')}
                          </div>
                        </div>
                        <div className="font-bold text-slate-800 font-mono">
                          Rp {(it.qty * it.price).toLocaleString('id-ID')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Add Menu Items to Table */}
              <div className="space-y-1.5 pt-1">
                <div className="font-bold text-slate-800 text-xs flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Tambah Menu Cepat ke Meja:</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-1">
                  {menuItems.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleAddMenuClick(selectedTable.id, m)}
                      className="bg-white hover:bg-emerald-50 active:scale-95 border border-slate-200 rounded-xl p-2 text-left shadow-2xs transition"
                    >
                      <div className="font-semibold text-[11px] text-slate-800 truncate">{m.name}</div>
                      <div className="text-emerald-700 font-bold font-mono text-[10px] mt-0.5">
                        + Rp {m.price.toLocaleString('id-ID')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Total & Action */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">Total Tagihan Meja</div>
                  <div className="text-base font-black text-emerald-800 font-mono">
                    Rp {selectedTable.billTotal.toLocaleString('id-ID')}
                  </div>
                </div>

                {selectedTable.items.length > 0 && (
                  <button
                    onClick={() => {
                      onClearTable(selectedTable.id);
                      setSelectedTable({ ...selectedTable, items: [], billTotal: 0, status: 'Kosong' });
                    }}
                    className="text-[10px] text-rose-600 hover:underline"
                  >
                    Reset Meja
                  </button>
                )}
              </div>
            </div>

            {/* Modal Footer: Kirim ke Kasir POS */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
              <button
                onClick={() => setSelectedTable(null)}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100"
              >
                Tutup
              </button>

              <button
                onClick={() => {
                  onSendToCashier(selectedTable);
                  setSelectedTable(null);
                }}
                disabled={selectedTable.billTotal === 0}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#047857] hover:bg-[#065f46] disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Bill / Kasir</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
