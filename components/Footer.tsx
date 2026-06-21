'use client';

import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="mt-auto bg-white border-t border-slate-200 py-8">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-2">
        <div className="flex justify-center gap-4 text-sm text-slate-500">
          <Link href="/privacy" className="hover:text-blue-600 transition-colors">
            {t(lang, 'footer.privacy')}
          </Link>
        </div>
        <p className="text-xs text-slate-400">{t(lang, 'footer.rights')}</p>
        <p className="text-xs text-slate-400">© 2025 CalcNest</p>
      </div>
    </footer>
  );
}
