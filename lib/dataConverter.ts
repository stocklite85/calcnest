export type DataUnit = 'bit' | 'byte' | 'kb' | 'mb' | 'gb' | 'tb' | 'pb' | 'kbit' | 'mbit' | 'gbit';

const TO_BITS: Record<DataUnit, number> = {
  bit:  1,
  byte: 8,
  kb:   8 * 1024,
  mb:   8 * 1024 ** 2,
  gb:   8 * 1024 ** 3,
  tb:   8 * 1024 ** 4,
  pb:   8 * 1024 ** 5,
  kbit: 1000,
  mbit: 1000 ** 2,
  gbit: 1000 ** 3,
};

export interface DataResult {
  bit:  number;
  byte: number;
  kb:   number;
  mb:   number;
  gb:   number;
  tb:   number;
  pb:   number;
  kbit: number;
  mbit: number;
  gbit: number;
}

export function convertData(value: number, from: DataUnit): DataResult {
  const bits = value * TO_BITS[from];
  return {
    bit:  bits,
    byte: bits / 8,
    kb:   bits / TO_BITS.kb,
    mb:   bits / TO_BITS.mb,
    gb:   bits / TO_BITS.gb,
    tb:   bits / TO_BITS.tb,
    pb:   bits / TO_BITS.pb,
    kbit: bits / TO_BITS.kbit,
    mbit: bits / TO_BITS.mbit,
    gbit: bits / TO_BITS.gbit,
  };
}

export function formatNum(n: number): string {
  if (n === 0) return '0';
  if (Math.abs(n) >= 0.001 && Math.abs(n) < 1e15) {
    const s = n.toPrecision(10).replace(/\.?0+$/, '');
    return parseFloat(s).toLocaleString('ko-KR', { maximumSignificantDigits: 10 });
  }
  return n.toExponential(4);
}
