'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';
import { convertData, formatNum, type DataUnit } from '@/lib/dataConverter';

const UNITS: { key: DataUnit; label: string; group: 'binary' | 'decimal' | 'bit' }[] = [
  { key: 'bit',  label: 'Bit (b)',       group: 'bit' },
  { key: 'byte', label: 'Byte (B)',      group: 'binary' },
  { key: 'kb',   label: 'Kilobyte (KB)', group: 'binary' },
  { key: 'mb',   label: 'Megabyte (MB)', group: 'binary' },
  { key: 'gb',   label: 'Gigabyte (GB)', group: 'binary' },
  { key: 'tb',   label: 'Terabyte (TB)', group: 'binary' },
  { key: 'pb',   label: 'Petabyte (PB)', group: 'binary' },
  { key: 'kbit', label: 'Kilobit (Kb)',  group: 'decimal' },
  { key: 'mbit', label: 'Megabit (Mb)',  group: 'decimal' },
  { key: 'gbit', label: 'Gigabit (Gb)', group: 'decimal' },
];

const PRESETS: { ko: string; en: string; value: number; unit: DataUnit }[] = [
  { ko: '1 MB', en: '1 MB', value: 1, unit: 'mb' },
  { ko: '1 GB', en: '1 GB', value: 1, unit: 'gb' },
  { ko: '1 TB', en: '1 TB', value: 1, unit: 'tb' },
  { ko: '100 Mbps', en: '100 Mbps', value: 100, unit: 'mbit' },
];

const RESULT_ROWS: { key: DataUnit; label: string }[] = [
  { key: 'bit',  label: 'Bit' },
  { key: 'byte', label: 'Byte' },
  { key: 'kb',   label: 'KB (Kilobyte)' },
  { key: 'mb',   label: 'MB (Megabyte)' },
  { key: 'gb',   label: 'GB (Gigabyte)' },
  { key: 'tb',   label: 'TB (Terabyte)' },
  { key: 'pb',   label: 'PB (Petabyte)' },
  { key: 'kbit', label: 'Kilobit' },
  { key: 'mbit', label: 'Megabit' },
  { key: 'gbit', label: 'Gigabit' },
];

export default function DataConverterPage() {
  const { lang } = useLang();
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState<DataUnit>('gb');
  const [result, setResult] = useState<ReturnType<typeof convertData> | null>(null);

  const handleCalc = (v = value, u = unit) => {
    const n = parseFloat(v);
    if (!n || n <= 0) return;
    setResult(convertData(n, u));
  };

  const handlePreset = (p: typeof PRESETS[0]) => {
    setValue(String(p.value));
    setUnit(p.unit);
    setResult(convertData(p.value, p.unit));
  };

  const handleUnitChange = (u: DataUnit) => {
    setUnit(u);
    const n = parseFloat(value);
    if (n > 0) setResult(convertData(n, u));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-slate-400 hover:text-blue-600 mb-4 inline-block">← {t(lang, 'nav.home')}</Link>

      <div className="mb-6">
        <div className="text-4xl mb-2">💾</div>
        <h1 className="text-2xl font-bold text-slate-900">
          {lang === 'ko' ? '데이터 용량 변환기' : 'Data Unit Converter'}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {lang === 'ko' ? 'Bit · Byte · KB · MB · GB · TB · PB 단위 변환' : 'Convert between Bit, Byte, KB, MB, GB, TB, PB'}
        </p>
      </div>

      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-6">{t(lang, 'privacy.badge')}</p>

      {/* 프리셋 */}
      <div className="flex gap-2 flex-wrap mb-4">
        {PRESETS.map(p => (
          <button key={p.ko} onClick={() => handlePreset(p)}
            className="text-xs px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-400 hover:text-blue-600 bg-white transition-colors">
            {lang === 'ko' ? p.ko : p.en}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 mb-4">
        {/* 단위 선택 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {lang === 'ko' ? '입력 단위' : 'Input Unit'}
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {UNITS.map(u => (
              <button key={u.key} onClick={() => handleUnitChange(u.key)}
                className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${unit === u.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'}`}>
                {u.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* 값 입력 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {lang === 'ko' ? '용량 입력' : 'Value'}
          </label>
          <div className="flex gap-2">
            <input
              type="number" value={value}
              onChange={e => { setValue(e.target.value); const n = parseFloat(e.target.value); if (n > 0) setResult(convertData(n, unit)); }}
              placeholder="1"
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
            <span className="flex items-center px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">
              {UNITS.find(u => u.key === unit)?.label.split(' ')[0]}
            </span>
          </div>
        </div>

        <button onClick={() => handleCalc()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors">
          {t(lang, 'calc')}
        </button>
      </div>

      {/* 결과 */}
      {result && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">{t(lang, 'result')}</h2>
          <div className="space-y-2">
            {RESULT_ROWS.map(row => (
              <div key={row.key}
                className={`flex justify-between items-center py-2 px-3 rounded-lg text-sm ${unit === row.key ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50'}`}>
                <span className="text-slate-600 font-medium">{row.label}</span>
                <span className={`font-mono font-semibold ${unit === row.key ? 'text-blue-600' : 'text-slate-800'}`}>
                  {formatNum(result[row.key])}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">
            {lang === 'ko' ? '1 KB = 1,024 Byte 기준 (이진법)' : '1 KB = 1,024 Bytes (binary)'}
          </p>
        </div>
      )}
    </div>
  );
}
