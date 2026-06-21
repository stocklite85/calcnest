import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '백분율 계산기',
  description: 'A는 B의 몇 %인지, B의 A%는 얼마인지, 변화율은 얼마인지 쉽게 계산하세요. 할인율·증가율·비율 계산.',
  keywords: ['백분율계산기', '퍼센트계산기', '할인율계산기', '증가율계산', '비율계산', '퍼센트'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
