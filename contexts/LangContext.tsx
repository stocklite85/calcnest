'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'ko' | 'en';

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType>({ lang: 'ko', toggleLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko');

  useEffect(() => {
    const saved = localStorage.getItem('calcnest-lang') as Lang | null;
    if (saved === 'ko' || saved === 'en') {
      setLang(saved);
    } else {
      const browser = navigator.language;
      setLang(browser.startsWith('ko') ? 'ko' : 'en');
    }
  }, []);

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'ko' ? 'en' : 'ko';
      localStorage.setItem('calcnest-lang', next);
      return next;
    });
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
