'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';
import { convertTemp } from '@/lib/temperature';

const PRESETS = [
  { ko: '물 끓는점 (100°C)',  en: 'Boiling point (100°C)',   celsius: 100 },
  { ko: '체온 (36.5°C)',      en: 'Body temp (36.5°C)',       celsius: 36.5 },
  { ko: '실온 (25°C)',        en: 'Room temp (25°C)',         celsius: 25 },
  { ko: '물 어는점 (0°C)',    en: 'Freezing point (0°C)',    celsius: 0 },
  { ko: '절대영도 (−273°C)', en: 'Absolute zero (−273°C)',  celsius: -273.15 },
];

export default function TemperatureConverterPage() {
  const { lang } = useLang();
  const isKo = lang === 'ko';
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [kelvin, setKelvin] = useState('');

  const fmt = (n: number) => {
    const rounded = parseFloat(n.toFixed(6));
    return rounded.toString();
  };

  const handleCelsius = (v: string) => {
    setCelsius(v);
    const n = parseFloat(v);
    if (!isNaN(n)) {
      const r = convertTemp(n, 'celsius');
      setFahrenheit(fmt(r.fahrenheit));
      setKelvin(fmt(r.kelvin));
    } else {
      setFahrenheit('');
      setKelvin('');
    }
  };

  const handleFahrenheit = (v: string) => {
    setFahrenheit(v);
    const n = parseFloat(v);
    if (!isNaN(n)) {
      const r = convertTemp(n, 'fahrenheit');
      setCelsius(fmt(r.celsius));
      setKelvin(fmt(r.kelvin));
    } else {
      setCelsius('');
      setKelvin('');
    }
  };

  const handleKelvin = (v: string) => {
    setKelvin(v);
    const n = parseFloat(v);
    if (!isNaN(n)) {
      const r = convertTemp(n, 'kelvin');
      setCelsius(fmt(r.celsius));
      setFahrenheit(fmt(r.fahrenheit));
    } else {
      setCelsius('');
      setFahrenheit('');
    }
  };

  const handlePreset = (c: number) => {
    const r = convertTemp(c, 'celsius');
    setCelsius(fmt(c));
    setFahrenheit(fmt(r.fahrenheit));
    setKelvin(fmt(r.kelvin));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-slate-400 hover:text-blue-600 mb-4 inline-block">
        ← {t(lang, 'nav.home')}
      </Link>

      <div className="mb-6">
        <div className="text-4xl mb-2">🌡️</div>
        <h1 className="text-2xl font-bold text-slate-900">{t(lang, 'temp.title')}</h1>
        <p className="text-slate-500 text-sm mt-1">{t(lang, 'temp.desc')}</p>
      </div>

      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-6">
        {t(lang, 'privacy.badge')}
      </p>

      <div className="flex gap-2 flex-wrap mb-4">
        {PRESETS.map(p => (
          <button
            key={p.celsius}
            onClick={() => handlePreset(p.celsius)}
            className="text-xs px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-400 hover:text-blue-600 bg-white transition-colors"
          >
            {isKo ? p.ko : p.en}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t(lang, 'temp.celsius')}
          </label>
          <div className="relative">
            <input
              type="number"
              value={celsius}
              onChange={e => handleCelsius(e.target.value)}
              placeholder="0"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">°C</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t(lang, 'temp.fahrenheit')}
          </label>
          <div className="relative">
            <input
              type="number"
              value={fahrenheit}
              onChange={e => handleFahrenheit(e.target.value)}
              placeholder="32"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">°F</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t(lang, 'temp.kelvin')}
          </label>
          <div className="relative">
            <input
              type="number"
              value={kelvin}
              onChange={e => handleKelvin(e.target.value)}
              placeholder="273.15"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">K</span>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          {isKo ? '어느 필드든 입력하면 자동으로 변환됩니다.' : 'Type in any field to convert automatically.'}
        </p>
      </div>
    </div>
  );
}
