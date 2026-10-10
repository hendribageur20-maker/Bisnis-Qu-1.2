import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Volume2, 
  CheckCircle2, 
  Clock, 
  Bike, 
  Car, 
  AlertCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { QueueItem } from '../../types';
import { playQueueChime } from '../../utils/audio';

interface QueueModuleProps {
  queues: QueueItem[];
  onBack: () => void;
  onAddQueue: (item: Omit<QueueItem, 'id' | 'number' | 'time'>) => void;
  onUpdateStatus: (id: string, newStatus: QueueItem['status']) => void;
}

export const QueueModule: React.FC<QueueModuleProps> = ({
  queues,
  onBack,
  onAddQueue,
  onUpdateStatus
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'semua' | 'menunggu' | 'dipanggil' | 'selesai'>('semua');
  const [lastCalledNumber, setLastCalledNumber] = useState<string | null>(null);

  // Form state
  const [customerName, setCustomerName] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleType, setVehicleType] = useState<QueueItem['vehicleType']>('Motor Matic');
  const [serviceType, setServiceType] = useState('Servis Rutin + Ganti Oli');
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);

  const handleCall = (queue: QueueItem) => {
    playQueueChime();
    setLastCalledNumber(queue.number);
    onUpdateStatus(queue.id, 'Dipanggil');
  };

  const handleStartWork = (queueId: string) => {
    onUpdateStatus(queueId, 'Dikerjakan');
  };

  const handleFinish = (queueId: string) => {
    onUpdateStatus(queueId, 'Selesai');
  };

  const handleSubmitNewQueue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !vehiclePlate) return;

    onAddQueue({
      customerName,
      vehiclePlate: vehiclePlate.toUpperCase(),
      vehicleType,
      serviceType,
      status: 'Menunggu',
      estimatedMinutes
    });

    // Reset & close
    setCustomerName('');
    setVehiclePlate('');
    setShowAddModal(false);
  };

  const filteredQueues = queues.filter((q) => {
    if (activeTab === 'semua') return true;
    if (activeTab === 'menunggu') return q.status === 'Menunggu';
    if (activeTab === 'dipanggil') return q.status === 'Dipanggil';
    if (activeTab === 'selesai') return q.status === 'Selesai' || q.status === 'Dikerjakan';
    return true;
  });

  const waitingCount = queues.filter(q => q.status === 'Menunggu').length;
  const inProgressCount = queues.filter(q => q.status === 'Dikerjakan' || q.status === 'Dipanggil').length;

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
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">Antrian Servis</h1>
              <p className="text-xs text-emerald-100 font-medium">Monitor & Panggilan Pit Bengkel</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-white text-emerald-800 hover:bg-emerald-50 px-3.5 py-2 rounded-xl text-xs font-bold shadow transition active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Ambil Antrian</span>
          </button>
        </div>

        {/* Display monitor banner */}
        <div className="mt-4 bg-emerald-800/70 border border-emerald-600/40 rounded-2xl p-3 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-200">Sedang Dipanggil</div>
            <div className="text-2xl font-black text-amber-300 font-mono">
              {lastCalledNumber || 'A-02'}
            </div>
          </div>
          <div className="flex items-center gap-2 text-right">
            <div>
              <div className="text-[10px] text-emerald-200">Antrian Menunggu: <strong className="text-white">{waitingCount}</strong></div>
              <div className="text-[10px] text-emerald-200">Sedang Dikerjakan: <strong className="text-white">{inProgressCount}</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('semua')}
          className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
            activeTab === 'semua' ? 'bg-[#047857] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Semua ({queues.length})
        </button>
        <button
          onClick={() => setActiveTab('menunggu')}
          className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
            activeTab === 'menunggu' ? 'bg-[#047857] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Menunggu ({waitingCount})
        </button>
        <button
          onClick={() => setActiveTab('dipanggil')}
          className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
            activeTab === 'dipanggil' ? 'bg-[#047857] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Dipanggil ({queues.filter(q => q.status === 'Dipanggil').length})
        </button>
        <button
          onClick={() => setActiveTab('selesai')}
          className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
            activeTab === 'selesai' ? 'bg-[#047857] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Proses & Selesai
        </button>
      </div>

      {/* Queue List Content */}
      <div className="flex-1 p-4 space-y-3">
        {filteredQueues.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-400">
            <Clock className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-600">Tidak ada nomor antrian pada tab ini</p>
            <p className="text-xs text-slate-400 mt-1">Gunakan tombol &quot;Ambil Antrian&quot; untuk mendaftarkan unit baru</p>
          </div>
        ) : (
          filteredQueues.map((item) => {
            const isMotor = item.vehicleType.toLowerCase().includes('motor');
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] font-bold text-emerald-700 uppercase">NO</span>
                      <span className="text-xl font-black text-emerald-800 tracking-tight font-mono">{item.number}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-800">{item.customerName}</h3>
                        <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                          {item.vehiclePlate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          {isMotor ? <Bike className="w-3.5 h-3.5 text-emerald-600" /> : <Car className="w-3.5 h-3.5 text-blue-600" />}
                          {item.vehicleType}
                        </span>
                        <span>•</span>
                        <span>{item.time} WIB</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        item.status === 'Menunggu'
                          ? 'bg-amber-100 text-amber-800'
                          : item.status === 'Dipanggil'
                          ? 'bg-blue-100 text-blue-800 animate-pulse'
                          : item.status === 'Dikerjakan'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl px-3 py-2 text-xs text-slate-600 flex items-center justify-between border border-slate-100">
                  <div className="truncate pr-2">
                    <span className="font-semibold text-slate-700">Keluhan: </span>
                    {item.serviceType}
                  </div>
                  <div className="text-[11px] text-slate-400 shrink-0 font-medium">
                    ~{item.estimatedMinutes} mnt
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                  {item.status === 'Menunggu' && (
                    <button
                      onClick={() => handleCall(item)}
                      className="flex-1 bg-[#047857] hover:bg-[#065f46] active:scale-98 text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Panggil Nomor</span>
                    </button>
                  )}

                  {item.status === 'Dipanggil' && (
                    <>
                      <button
                        onClick={() => handleCall(item)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                        title="Panggil Ulang"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Ulangi</span>
                      </button>
                      <button
                        onClick={() => handleStartWork(item.id)}
                        className="flex-1 bg-[#047857] hover:bg-[#065f46] text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Mulai Kerjakan di Pit</span>
                      </button>
                    </>
                  )}

                  {item.status === 'Dikerjakan' && (
                    <button
                      onClick={() => handleFinish(item.id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Selesaikan Servis & Siap Kasir</span>
                    </button>
                  )}

                  {item.status === 'Selesai' && (
                    <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1 py-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Servis Selesai • Lanjut Pembayaran Kasir</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Ambil Antrian Baru */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Pendaftaran Antrian Servis</h3>
            <p className="text-xs text-slate-500 mt-0.5">Ambil nomor urut pelanggan baru</p>

            <form onSubmit={handleSubmitNewQueue} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Pemilik Kendaraan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Plat Polisi</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: B 3456 TZZ"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 font-mono uppercase focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Kendaraan</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value as QueueItem['vehicleType'])}
                    className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Motor Matic">Motor Matic</option>
                    <option value="Motor Manual">Motor Manual</option>
                    <option value="Motor Sport">Motor Sport</option>
                    <option value="Mobil MPV">Mobil MPV</option>
                    <option value="Mobil Sedan/SUV">Mobil Sedan/SUV</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Estimasi Waktu</label>
                  <select
                    value={estimatedMinutes}
                    onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                    className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value={20}>20 Menit (Cepat)</option>
                    <option value={35}>35 Menit (Rutin)</option>
                    <option value={60}>60 Menit (Besar)</option>
                    <option value={90}>90 Menit (Turun Mesin)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Keluhan / Jenis Servis</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ganti Oli + Cek Rem + CVT"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-600"
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
                  Cetak & Ambil Tiket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
