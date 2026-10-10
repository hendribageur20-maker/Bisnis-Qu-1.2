import React from 'react';
import { ArrowLeft, ChevronRight, Info, ShieldCheck, Sparkles } from 'lucide-react';
import { SubMenuPageData, ViewMode } from '../types';
import { IconHelper } from './IconHelper';

interface SubMenuPageProps {
  data: SubMenuPageData;
  onBack: () => void;
  onSelectSubItem: (targetView: ViewMode) => void;
}

export const SubMenuPage: React.FC<SubMenuPageProps> = ({
  data,
  onBack,
  onSelectSubItem
}) => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      
      {/* Top Header:
          Solid green background with a back arrow icon on the left, 
          a white module title (e.g., 'Servis'), a secondary subtitle ('Manajemen Bengkel'), 
          and a subtle vector illustration graphic on the right. */}
      <div className="bg-[#047857] text-white px-5 pt-4 pb-6 relative overflow-hidden shadow-md">
        
        {/* Subtle vector illustration graphic on the right */}
        <div className="absolute -right-4 -bottom-6 w-36 h-36 opacity-15 pointer-events-none select-none">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
            <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="6" strokeDasharray="6 6" />
            <circle cx="60" cy="60" r="32" stroke="currentColor" strokeWidth="4" />
            <path d="M60 18V36M60 84V102M18 60H36M84 60H102" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            <path d="M30 30L44 44M76 76L90 90M90 30L76 44M44 76L30 90" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            <circle cx="60" cy="60" r="14" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute top-2 right-12 w-20 h-20 bg-emerald-400/20 rounded-full blur-xl pointer-events-none"></div>

        {/* Header content bar */}
        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-90 transition flex items-center justify-center text-white border border-white/20"
            title="Kembali ke Dashboard"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-tight">
              {data.moduleTitle}
            </h1>
            <p className="text-xs text-emerald-100 font-medium opacity-90">
              {data.moduleSubtitle}
            </p>
          </div>
        </div>

        {/* Below the header, a rounded white container card displays a small info icon and title label */}
        <div className="mt-4 bg-white/95 backdrop-blur-xs rounded-2xl p-3 text-slate-800 shadow-sm border border-emerald-100/50 flex items-start gap-2.5 relative z-10">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 text-[#047857] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-slate-900 leading-snug">
              {data.infoTitle}
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
              {data.infoDescription}
            </div>
          </div>
        </div>
      </div>

      {/* Content Body: A clean white background featuring a vertical list of wide rounded-rectangle cards (white cards with a soft drop shadow) */}
      <div className="flex-1 bg-[#F8FAFC] p-4 space-y-3">
        
        <div className="px-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Daftar Fitur & Modul ({data.items.length})
        </div>

        <div className="space-y-3">
          {data.items.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectSubItem(item.targetView)}
              className="w-full bg-white hover:bg-emerald-50/30 active:scale-[0.99] transition-all duration-150 rounded-2xl p-3.5 text-left border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-emerald-200 flex items-center justify-between group tap-active"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Inside each card on the left, there is a square green icon with rounded corners containing a white minimalist icon */}
                <div className="w-12 h-12 rounded-xl bg-[#047857] group-hover:bg-[#065f46] text-white flex items-center justify-center shrink-0 shadow-sm transition-colors">
                  <IconHelper name={item.iconName} className="w-6 h-6 stroke-[2.2]" />
                </div>

                {/* Next to it, a bold main title and a smaller descriptive subtitle underneath */}
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800 text-sm group-hover:text-emerald-800 transition-colors truncate">
                      {item.title}
                    </h3>
                    {item.badge && (
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-normal mt-0.5 truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* On the far right of each card, place a simple grey greater-than arrow icon (>) */}
              <div className="shrink-0 pl-2">
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all stroke-[2.2]" />
              </div>
            </button>
          ))}
        </div>

        {/* Security & Operational footer badge */}
        <div className="pt-4 flex items-center justify-center gap-1.5 text-slate-400 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Sistem Bisnis Qu 1.0 • Data Bengkel Terenkripsi Lokal</span>
        </div>
      </div>

    </div>
  );
};
