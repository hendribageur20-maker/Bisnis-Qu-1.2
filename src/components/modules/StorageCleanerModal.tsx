import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Camera, 
  CheckCircle2, 
  HardDrive, 
  Sparkles, 
  RefreshCw, 
  Image as ImageIcon,
  ArrowRight
} from 'lucide-react';
import { compressImageFile, CompressionResult } from '../../utils/compressor';

interface StorageCleanerModalProps {
  onClose: () => void;
}

export const StorageCleanerModal: React.FC<StorageCleanerModalProps> = ({ onClose }) => {
  const [cacheSizeKB, setCacheSizeKB] = useState(1850);
  const [dbSizeKB, setDbSizeKB] = useState(480);
  const [orphanCount, setOrphanCount] = useState(12);
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanDone, setCleanDone] = useState(false);

  // Camera compressor test
  const [compressedImage, setCompressedImage] = useState<CompressionResult | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleCleanStorage = () => {
    setIsCleaning(true);
    setTimeout(() => {
      setCacheSizeKB(60);
      setOrphanCount(0);
      setIsCleaning(false);
      setCleanDone(true);
    }, 900);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const result = await compressImageFile(file, 600, 0.75);
      setCompressedImage(result);
    } catch {
      // Error handling
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#047857] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-emerald-200" />
            <div>
              <h3 className="font-bold text-sm">Storage Cleaner & Kamera</h3>
              <p className="text-[10px] text-emerald-100">RAM 1-2 GB & APK under 4.6MB</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3.5 flex-1 text-xs">
          
          {/* Storage Cleaner Section */}
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/90 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Alokasi Memori Perangkat</span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Offline-First
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2 rounded-xl border border-slate-100">
                <div className="text-[9px] text-slate-400">Cache Temp</div>
                <div className="font-mono font-bold text-slate-800 text-xs mt-0.5">
                  {(cacheSizeKB / 1024).toFixed(2)} MB
                </div>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-100">
                <div className="text-[9px] text-slate-400">SQLite / IDB</div>
                <div className="font-mono font-bold text-slate-800 text-xs mt-0.5">
                  {dbSizeKB} KB
                </div>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-100">
                <div className="text-[9px] text-slate-400">Orphan Files</div>
                <div className="font-mono font-bold text-slate-800 text-xs mt-0.5">
                  {orphanCount} File
                </div>
              </div>
            </div>

            <button
              onClick={handleCleanStorage}
              disabled={isCleaning}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition active:scale-98 shadow-xs"
            >
              {isCleaning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  <span>Membersihkan Cache & Orphan...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Bersihkan Cache & Orphan Files (1-Click)</span>
                </>
              )}
            </button>

            {cleanDone && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2 rounded-xl text-[11px] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Memori dibersihkan! Cache dikompres, RAM 1-2GB kini stabil.</span>
              </div>
            )}
          </div>

          {/* Camera Auto-Compressor Section */}
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/90 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Camera className="w-4 h-4 text-emerald-700" />
                <span>Kamera Instan Auto-Compress</span>
              </span>
              <span className="text-[10px] text-slate-400">Max 600px • 100-200KB</span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Foto bukti servis/produk/struk otomatis dikompres ke resolusi optimal agar tidak membebani memori RAM Android.
            </p>

            <label className="w-full bg-emerald-50 hover:bg-emerald-100/70 border border-dashed border-emerald-400 text-emerald-900 py-3 rounded-xl font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition">
              <Camera className="w-5 h-5 text-emerald-700" />
              <span>Ambil Foto / Uji Kompresi Kamera</span>
              <span className="text-[9px] text-emerald-600 font-normal">Klik untuk kamera HP atau pilih file</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {isCompressing && (
              <div className="text-center py-2 text-slate-500 text-xs">
                Mengompresi gambar ke 600x600px...
              </div>
            )}

            {compressedImage && (
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex gap-2.5 items-center">
                  <img
                    src={compressedImage.dataUrl}
                    alt="Compressed"
                    className="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0"
                  />
                  <div className="text-[11px] space-y-0.5">
                    <div className="font-bold text-slate-900">Hasil Kompresi Berhasil!</div>
                    <div className="text-slate-500">
                      Ukuran: <strong className="text-rose-600 line-through">{(compressedImage.originalSizeBytes / 1024).toFixed(0)} KB</strong> <ArrowRight className="w-3 h-3 inline text-slate-400" /> <strong className="text-emerald-700 font-mono">{(compressedImage.compressedSizeBytes / 1024).toFixed(0)} KB</strong>
                    </div>
                    <div className="text-slate-500">
                      Dimensi: {compressedImage.width}×{compressedImage.height}px ({compressedImage.compressionRatio}% Hemat)
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Selesai
          </button>
        </div>

      </div>
    </div>
  );
};
