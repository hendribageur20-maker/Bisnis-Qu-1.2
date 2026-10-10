import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  LogOut, 
  ShieldCheck, 
  Database,
  Cloud,
  Layers
} from 'lucide-react';
import { UserAccount, SubscriptionTier } from '../../types';

interface AuthCorporateModalProps {
  userAccount: UserAccount;
  onLoginGoogle: (email: string) => void;
  onUpgradeCorporate: () => void;
  onDowngradeFreemium: () => void;
  onMergeLocalData: () => void;
  onUseCorporateDataOnly: () => void;
  onExportSQLite: () => void;
  onClose: () => void;
}

export const AuthCorporateModal: React.FC<AuthCorporateModalProps> = ({
  userAccount,
  onLoginGoogle,
  onUpgradeCorporate,
  onDowngradeFreemium,
  onMergeLocalData,
  onUseCorporateDataOnly,
  onExportSQLite,
  onClose
}) => {
  const [showMergePrompt, setShowMergePrompt] = useState(false);
  const [showDowngradeExport, setShowDowngradeExport] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const handle1ClickGoogle = () => {
    // 1-Click Google OAuth using user hendri.bageur20@gmail.com
    onLoginGoogle('hendri.bageur20@gmail.com');
    setActionSuccess('Berhasil terhubung dengan Google OAuth (hendri.bageur20@gmail.com)');
    setTimeout(() => setActionSuccess(null), 2500);
  };

  const handleTriggerCorporateUpgrade = () => {
    setShowMergePrompt(true);
  };

  const handleConfirmMerge = () => {
    onMergeLocalData();
    onUpgradeCorporate();
    setShowMergePrompt(false);
    setActionSuccess('Smart Auto-Detect: Data lokal berhasil digabungkan ke Cloud Corporate!');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleConfirmCorporateOnly = () => {
    onUseCorporateDataOnly();
    onUpgradeCorporate();
    setShowMergePrompt(false);
    setActionSuccess('Berhasil menyinkronkan data pusat Corporate!');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleTriggerDowngrade = () => {
    setShowDowngradeExport(true);
  };

  const handleConfirmDowngrade = () => {
    // Auto-Export to local SQLite as required
    onExportSQLite();
    onDowngradeFreemium();
    setShowDowngradeExport(false);
    setActionSuccess('Akun diubah ke Freemium & database otomatis di-export ke file SQLite lokal.');
    setTimeout(() => setActionSuccess(null), 3500);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#047857] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-200" />
            <div>
              <h3 className="font-bold text-sm">Akun & Sinkronisasi Cloud</h3>
              <p className="text-[10px] text-emerald-100">Status Paket & Database Multi-Cabang</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3.5 flex-1 text-xs">
          
          {actionSuccess && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-2.5 rounded-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{actionSuccess}</span>
            </div>
          )}

          {/* User Profile Card */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Status Akun Pengguna
              </span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                userAccount.tier === 'Corporate' 
                  ? 'bg-purple-100 text-purple-900 border border-purple-300' 
                  : userAccount.tier === 'Pro'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}>
                {userAccount.tier === 'Corporate' ? '🏢 Corporate Multi-Cabang' : userAccount.tier === 'Pro' ? '⭐ Paket Pro' : '✨ Freemium'}
              </span>
            </div>

            {userAccount.isLoggedIn ? (
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm">{userAccount.name}</div>
                <div className="text-[11px] text-slate-600 font-mono">{userAccount.email}</div>
                {userAccount.corporateName && (
                  <div className="text-[10px] text-purple-700 font-semibold">
                    Entitas: {userAccount.corporateName}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Masuk dengan 1-Click Google OAuth untuk menghubungkan akun lokal Anda dengan server kantor.
                </p>
                <button
                  onClick={handle1ClickGoogle}
                  className="w-full bg-white hover:bg-slate-50 text-slate-800 font-bold py-2.5 px-3 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center gap-2 active:scale-98 transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Masuk dengan Google (1-Click)</span>
                </button>
              </div>
            )}
          </div>

          {/* Smart Auto-Detect: Gabung ke Corporate */}
          {!showMergePrompt && userAccount.tier !== 'Corporate' && (
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 text-purple-900 font-bold">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Smart Auto-Detect: Gabung Akun Corporate</span>
              </div>
              <p className="text-[11px] text-purple-800 leading-relaxed">
                Terdeteksi domain corporate kantor. Hubungkan data lokal ke jaringan kantor Multi-Cabang.
              </p>
              <button
                onClick={handleTriggerCorporateUpgrade}
                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-3 rounded-xl shadow-xs transition"
              >
                Gabung ke Akun Corporate
              </button>
            </div>
          )}

          {/* Smart Auto-Detect Modal Prompt */}
          {showMergePrompt && (
            <div className="bg-white rounded-2xl border-2 border-purple-500 p-3.5 space-y-3 shadow-md">
              <div className="text-purple-900 font-bold text-xs flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-purple-600" />
                <span>Pilih Penanganan Sinkronisasi Data:</span>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                Terdapat transaksi & stok lokal di perangkat Anda. Bagaimana Anda ingin menyelaraskannya?
              </p>

              <div className="space-y-2">
                <button
                  onClick={handleConfirmMerge}
                  className="w-full bg-[#047857] hover:bg-[#065f46] text-white p-2.5 rounded-xl font-bold text-left transition flex items-start gap-2 shadow-xs"
                >
                  <Database className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <div>Merge Local Data to Cloud (Direkomendasikan)</div>
                    <div className="text-[10px] text-emerald-100 font-normal">
                      Menggabungkan seluruh transaksi lokal ke database cloud kantor.
                    </div>
                  </div>
                </button>

                <button
                  onClick={handleConfirmCorporateOnly}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 p-2.5 rounded-xl font-bold text-left transition flex items-start gap-2 border border-slate-300"
                >
                  <Cloud className="w-4 h-4 shrink-0 mt-0.5 text-slate-600" />
                  <div>
                    <div>Use Corporate Data</div>
                    <div className="text-[10px] text-slate-500 font-normal">
                      Ganti penuh data dengan master data terbaru dari server kantor.
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Auto-Export SQLite saat Downgrade */}
          {userAccount.tier === 'Corporate' && !showDowngradeExport && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2">
              <div className="font-bold text-slate-800 text-xs">Opsi Paket Akun</div>
              <button
                onClick={handleTriggerDowngrade}
                className="w-full bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 font-bold py-2 px-3 rounded-xl transition"
              >
                Downgrade ke Freemium (Auto-Export SQLite)
              </button>
            </div>
          )}

          {showDowngradeExport && (
            <div className="bg-rose-50 border border-rose-300 rounded-2xl p-3.5 space-y-2.5">
              <div className="font-bold text-rose-900 text-xs">Konfirmasi Downgrade & Auto-Export</div>
              <p className="text-[11px] text-rose-800 leading-relaxed">
                Sebelum downgrade, sistem secara otomatis akan mengekspor seluruh basis data ke format <strong>.sqlite / .sql lokal</strong> agar data Anda tetap aman 100% offline.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDowngradeExport(false)}
                  className="flex-1 bg-white border border-slate-300 text-slate-700 py-1.5 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmDowngrade}
                  className="flex-1 bg-rose-700 hover:bg-rose-800 text-white py-1.5 rounded-xl font-bold flex items-center justify-center gap-1 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export & Downgrade</span>
                </button>
              </div>
            </div>
          )}

          {/* Direct Manual Export Button */}
          <div className="pt-1">
            <button
              onClick={onExportSQLite}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-98 shadow-xs"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export Database ke SQLite Lokal (.sql)</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <button onClick={onClose} className="text-xs font-bold text-slate-600 hover:text-slate-900">
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
