import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  FileText, 
  User, 
  Car, 
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { ServiceWorkOrder } from '../../types';

interface ServiceModuleProps {
  orders: ServiceWorkOrder[];
  onBack: () => void;
  onUpdateStatus: (orderId: string, status: ServiceWorkOrder['status']) => void;
  onAddOrder: (order: Omit<ServiceWorkOrder, 'id' | 'spkNumber' | 'createdAt'>) => void;
  onSendToCashier: (order: ServiceWorkOrder) => void;
}

const STATUS_STEPS: ServiceWorkOrder['status'][] = [
  'Penerimaan',
  'Pengerjaan',
  'Ganti Part',
  'Quality Control',
  'Siap Kasir',
  'Selesai'
];

export const ServiceModule: React.FC<ServiceModuleProps> = ({
  orders,
  onBack,
  onUpdateStatus,
  onAddOrder,
  onSendToCashier
}) => {
  const [activeTab, setActiveTab] = useState<'spk_list' | 'kanban'>('spk_list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ServiceWorkOrder | null>(null);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [complaint, setComplaint] = useState('');
  const [mechanicName, setMechanicName] = useState('Agus Santoso');
  const [laborCost, setLaborCost] = useState(85000);

  const handleSubmitSPK = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !vehiclePlate) return;

    onAddOrder({
      customerName,
      customerPhone,
      vehiclePlate: vehiclePlate.toUpperCase(),
      vehicleModel,
      complaint,
      status: 'Penerimaan',
      mechanicName,
      laborCost,
      estimatedCost: laborCost + 65000,
      partsUsed: [{ name: 'Oli Mesin Matic', qty: 1, price: 65000 }]
    });

    setCustomerName('');
    setVehiclePlate('');
    setCustomerPhone('');
    setVehicleModel('');
    setComplaint('');
    setShowAddModal(false);
  };

  const getStepIndex = (status: ServiceWorkOrder['status']) => {
    return STATUS_STEPS.indexOf(status);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      
      {/* Header */}
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
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">Daftar Servis & SPK</h1>
              <p className="text-xs text-emerald-100 font-medium">Surat Perintah Kerja & Tracking Pit</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-white text-emerald-800 hover:bg-emerald-50 px-3.5 py-2 rounded-xl text-xs font-bold shadow transition active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Buat SPK</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('spk_list')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'spk_list' ? 'bg-[#047857] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Daftar SPK Aktif ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'kanban' ? 'bg-[#047857] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Alur Proses Visual
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-3">
        {activeTab === 'spk_list' && (
          <div className="space-y-3">
            {orders.map((order) => {
              const currentStep = getStepIndex(order.status);
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {order.spkNumber}
                        </span>
                        <span className="text-xs font-bold text-slate-800 font-mono">
                          {order.vehiclePlate}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 mt-1">
                        {order.customerName} • <span className="font-normal text-slate-600">{order.vehicleModel}</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        Keluhan: {order.complaint}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        order.status === 'Siap Kasir'
                          ? 'bg-emerald-100 text-emerald-800 font-extrabold animate-pulse'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Mekanik & Part Info */}
                  <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 flex items-center justify-between border border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Mekanik: <strong>{order.mechanicName}</strong></span>
                    </div>
                    <div className="font-bold text-slate-800">
                      Est. Rp {order.estimatedCost.toLocaleString('id-ID')}
                    </div>
                  </div>

                  {/* Step Progress Line */}
                  <div className="pt-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-medium mb-1">
                      <span>Penerimaan</span>
                      <span>Pengerjaan</span>
                      <span>QC Final</span>
                      <span>Kasir</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#047857] h-full transition-all duration-300"
                        style={{ width: `${Math.min(100, ((currentStep + 1) / STATUS_STEPS.length) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                    {order.status !== 'Siap Kasir' && order.status !== 'Selesai' && (
                      <button
                        onClick={() => {
                          const nextIdx = Math.min(STATUS_STEPS.length - 1, currentStep + 1);
                          onUpdateStatus(order.id, STATUS_STEPS[nextIdx]);
                        }}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition"
                      >
                        <span>Lanjut ke {STATUS_STEPS[currentStep + 1]}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {order.status === 'Siap Kasir' && (
                      <button
                        onClick={() => onSendToCashier(order)}
                        className="flex-1 bg-[#047857] hover:bg-[#065f46] text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow transition"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Proses di Kasir & Cetak Nota</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'kanban' && (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#047857] shrink-0" />
              <span>Standar Operasional: Setiap unit harus melalui Quality Control sebelum penyerahan kasir.</span>
            </div>

            {STATUS_STEPS.slice(0, 5).map((stepName) => {
              const itemsInStep = orders.filter((o) => o.status === stepName);
              return (
                <div key={stepName} className="bg-white rounded-2xl p-3 border border-slate-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">{stepName}</span>
                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">
                      {itemsInStep.length} Kendaraan
                    </span>
                  </div>

                  <div className="mt-2 space-y-2">
                    {itemsInStep.length === 0 ? (
                      <div className="text-[11px] text-slate-400 italic py-1">Tidak ada unit di tahap ini</div>
                    ) : (
                      itemsInStep.map((it) => (
                        <div key={it.id} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                          <div className="flex items-center justify-between font-bold text-slate-800">
                            <span>{it.vehiclePlate}</span>
                            <span className="text-emerald-700 font-mono text-[11px]">{it.spkNumber}</span>
                          </div>
                          <div className="text-slate-600 text-[11px] mt-0.5">{it.customerName} - {it.vehicleModel}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Buat SPK Baru */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900">Buat SPK Servis Baru</h3>
            <p className="text-xs text-slate-500 mt-0.5">Surat Perintah Kerja Mekanik Bengkel</p>

            <form onSubmit={handleSubmitSPK} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Pelanggan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pak Herman"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">No. WhatsApp / HP</label>
                <input
                  type="text"
                  placeholder="0812xxxx"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Plat Nomor</label>
                  <input
                    type="text"
                    required
                    placeholder="B 1234 XYZ"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 font-mono uppercase focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Model Kendaraan</label>
                  <input
                    type="text"
                    placeholder="Honda Beat 2023"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Keluhan Pelanggan</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Keluhan rem, oli, tarikan berat, dll."
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-600"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Mekanik</label>
                  <select
                    value={mechanicName}
                    onChange={(e) => setMechanicName(e.target.value)}
                    className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Agus Santoso">Agus Santoso</option>
                    <option value="Rudi Hartono">Rudi Hartono</option>
                    <option value="Fajar Nugraha">Fajar Nugraha</option>
                    <option value="Doni Pratama">Doni Pratama</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Biaya Jasa (Rp)</label>
                  <input
                    type="number"
                    value={laborCost}
                    onChange={(e) => setLaborCost(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
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
                  Terbitkan SPK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
