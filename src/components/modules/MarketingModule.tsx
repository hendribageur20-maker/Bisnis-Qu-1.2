import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  MessageSquareShare, 
  Users, 
  Sparkles, 
  Phone, 
  Calendar, 
  Award, 
  Copy, 
  Check, 
  Send
} from 'lucide-react';
import { Customer } from '../../types';

interface MarketingModuleProps {
  customers: Customer[];
  onBack: () => void;
  onAddCustomer: (customer: Omit<Customer, 'id' | 'points' | 'tier'>) => void;
}

export const MarketingModule: React.FC<MarketingModuleProps> = ({
  customers,
  onBack,
  onAddCustomer
}) => {
  const [activeTab, setActiveTab] = useState<'reminders' | 'customers'>('reminders');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');

  const generateWAMessage = (c: Customer) => {
    return `Halo Bpk/Ibu *${c.name}*! 👋\n\nKami dari *Bengkel Maju Motor (Bisnis Qu)* ingin menginformasikan bahwa kendaraan *${c.vehicleModel}* (${c.vehiclePlate}) sudah saatnya servis rutin & ganti oli berkala agar performa mesin tetap prima.\n\n🎁 *Promo Khusus:* Tunjukkan pesan ini untuk Diskon Servis 15% + Pengecekan 12 Titik Gratis!\n\nUntuk booking jadwal servis, silakan balas chat ini ya. Terima kasih! 🙏`;
  };

  const handleCopyMessage = (c: Customer) => {
    const text = generateWAMessage(c);
    navigator.clipboard.writeText(text);
    setCopiedId(c.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleOpenWA = (c: Customer) => {
    const text = encodeURIComponent(generateWAMessage(c));
    const cleanPhone = c.phone.replace(/^0/, '62').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !vehiclePlate) return;

    onAddCustomer({
      name,
      phone: phone || '0812xxxxxxxx',
      vehiclePlate: vehiclePlate.toUpperCase(),
      vehicleModel: vehicleModel || 'Motor/Mobil',
      lastServiceDate: new Date().toISOString().split('T')[0],
      totalVisits: 1
    });

    setName('');
    setPhone('');
    setVehiclePlate('');
    setVehicleModel('');
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
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">Marketing & CRM</h1>
              <p className="text-xs text-emerald-100 font-medium">Broadcast WA & Retensi Pelanggan</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-white text-emerald-800 hover:bg-emerald-50 px-3 py-2 rounded-xl text-xs font-bold shadow transition active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Tambah</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center gap-2 text-xs">
        <button
          onClick={() => setActiveTab('reminders')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition ${
            activeTab === 'reminders' ? 'bg-[#047857] text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Pengingat Servis WA ({customers.length})
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition ${
            activeTab === 'customers' ? 'bg-[#047857] text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Daftar Member & Poin
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {activeTab === 'reminders' && (
          <div className="space-y-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-900 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong>Otomatisasi WhatsApp:</strong> Kirim broadcast ke pelanggan yang sudah lewat 60 hari servis untuk menaikkan repeat order hingga 40%.
              </div>
            </div>

            {customers.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900">{c.name}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.tier === 'Gold' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {c.tier} Member
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      {c.vehicleModel} • <strong className="font-mono">{c.vehiclePlate}</strong>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Terakhir: {c.lastServiceDate}
                      </span>
                      <span>•</span>
                      <span>{c.totalVisits}x Kunjungan</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700 font-mono bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                      {c.points} Pts
                    </span>
                  </div>
                </div>

                {/* Preview Message */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 font-sans leading-relaxed">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Preview Format WhatsApp:</div>
                  &quot;Halo Bpk/Ibu {c.name}! Kendaraan {c.vehicleModel} ({c.vehiclePlate}) sudah saatnya servis berkala. Dapatkan Diskon Servis 15%...&quot;
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleCopyMessage(c)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    {copiedId === c.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Pesan</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleOpenWA(c)}
                    className="flex-1 bg-[#047857] hover:bg-[#065f46] text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim via WA</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="space-y-3">
            {customers.map((c) => (
              <div key={c.id} className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{c.name}</span>
                    <span className="text-xs font-mono font-semibold text-slate-500">({c.phone})</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {c.vehiclePlate} • {c.vehicleModel}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-700">{c.points} Poin</div>
                  <div className="text-[10px] text-slate-400">{c.totalVisits} kali servis</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Tambah Pelanggan */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Tambah Data Pelanggan</h3>
            <p className="text-xs text-slate-500 mt-0.5">Simpan kontak untuk pengingat servis</p>

            <form onSubmit={handleSaveCustomer} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ibu Rina"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp</label>
                <input
                  type="text"
                  required
                  placeholder="08123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Plat Nomor</label>
                  <input
                    type="text"
                    required
                    placeholder="B 1234 ABC"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 font-mono uppercase focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tipe Motor/Mobil</label>
                  <input
                    type="text"
                    placeholder="Honda Beat 2023"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-600"
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
                  Simpan Pelanggan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
