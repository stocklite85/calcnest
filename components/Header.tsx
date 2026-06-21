'use client';

import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';

export default function Header() {
  const { lang, toggleLang } = useLang();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 hover:text-blue-700">
          <span className="text-2xl">🧮</span>
          <span>CalcNest</span>
        </Link>

        <button
          onClick={toggleLang}
          className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
        >
          {t(lang, 'nav.lang')}
        </button>
      </div>
    </header>
  );
}
