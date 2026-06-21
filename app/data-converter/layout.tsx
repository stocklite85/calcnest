import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '데이터 용량 변환기',
  description: 'Bit, Byte, KB, MB, GB, TB, PB 데이터 단위를 무료로 변환하세요.',
  keywords: ['데이터변환기', '용량변환기', 'MB변환', 'GB변환', 'TB변환', '바이트변환'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
