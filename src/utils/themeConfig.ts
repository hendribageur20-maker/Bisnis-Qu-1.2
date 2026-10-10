import { ThemeType } from '../types';

export interface ThemePalette {
  id: ThemeType;
  name: string;
  tagline: string;
  headerBg: string;
  headerText: string;
  headerSubText: string;
  accentBg: string;
  accentHoverBg: string;
  accentText: string;
  activeTabBg: string;
  badgeBg: string;
  surfaceBg: string;
  isDark: boolean;
  borderAccent: string;
}

export const THEME_PALETTES: Record<ThemeType, ThemePalette> = {
  zamrud: {
    id: 'zamrud',
    name: 'Zamrud Hijau',
    tagline: 'Default Segar & Bersih Material 3',
    headerBg: 'bg-[#047857]',
    headerText: 'text-white',
    headerSubText: 'text-emerald-100',
    accentBg: 'bg-[#047857]',
    accentHoverBg: 'hover:bg-[#065f46]',
    accentText: 'text-emerald-700',
    activeTabBg: 'bg-emerald-100 text-emerald-900',
    badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    surfaceBg: 'bg-slate-50',
    isDark: false,
    borderAccent: 'border-emerald-500'
  },
  cerah: {
    id: 'cerah',
    name: 'Cerah (Outdoor)',
    tagline: 'Kontras Tinggi di Bawah Sinar Matahari',
    headerBg: 'bg-amber-600',
    headerText: 'text-white',
    headerSubText: 'text-amber-100',
    accentBg: 'bg-amber-600',
    accentHoverBg: 'hover:bg-amber-700',
    accentText: 'text-amber-700',
    activeTabBg: 'bg-amber-100 text-amber-900',
    badgeBg: 'bg-amber-50 border-amber-300 text-amber-900',
    surfaceBg: 'bg-white',
    isDark: false,
    borderAccent: 'border-amber-500'
  },
  oled: {
    id: 'oled',
    name: 'Midnight OLED',
    tagline: 'Hitam Pekat #000000 Hemat Baterai Layar',
    headerBg: 'bg-black',
    headerText: 'text-white',
    headerSubText: 'text-zinc-400',
    accentBg: 'bg-zinc-800',
    accentHoverBg: 'hover:bg-zinc-700',
    accentText: 'text-zinc-200',
    activeTabBg: 'bg-zinc-800 text-white',
    badgeBg: 'bg-zinc-900 border-zinc-700 text-zinc-100',
    surfaceBg: 'bg-zinc-950',
    isDark: true,
    borderAccent: 'border-zinc-500'
  },
  cyber: {
    id: 'cyber',
    name: 'Neon Cyber Glow',
    tagline: 'Charcoal Futuristik & Electric Cyan',
    headerBg: 'bg-slate-950',
    headerText: 'text-cyan-400',
    headerSubText: 'text-lime-400',
    accentBg: 'bg-cyan-600',
    accentHoverBg: 'hover:bg-cyan-500',
    accentText: 'text-cyan-400',
    activeTabBg: 'bg-cyan-950 text-cyan-300 border border-cyan-800',
    badgeBg: 'bg-slate-900 border-cyan-500/50 text-cyan-300',
    surfaceBg: 'bg-slate-900',
    isDark: true,
    borderAccent: 'border-cyan-400'
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean Blue',
    tagline: 'Biru Samudra Kalem & Profesional',
    headerBg: 'bg-[#0369a1]',
    headerText: 'text-white',
    headerSubText: 'text-sky-100',
    accentBg: 'bg-[#0369a1]',
    accentHoverBg: 'hover:bg-[#075985]',
    accentText: 'text-sky-700',
    activeTabBg: 'bg-sky-100 text-sky-900',
    badgeBg: 'bg-sky-50 border-sky-200 text-sky-800',
    surfaceBg: 'bg-slate-50',
    isDark: false,
    borderAccent: 'border-sky-500'
  },
  ruby: {
    id: 'ruby',
    name: 'Royal Ruby',
    tagline: 'Merah Marun Mewah & Berani',
    headerBg: 'bg-[#be123c]',
    headerText: 'text-white',
    headerSubText: 'text-rose-100',
    accentBg: 'bg-[#be123c]',
    accentHoverBg: 'hover:bg-[#9f1239]',
    accentText: 'text-rose-700',
    activeTabBg: 'bg-rose-100 text-rose-900',
    badgeBg: 'bg-rose-50 border-rose-200 text-rose-800',
    surfaceBg: 'bg-slate-50',
    isDark: false,
    borderAccent: 'border-rose-500'
  }
};
