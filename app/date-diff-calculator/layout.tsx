import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '날짜 차이 계산기',
  description: '두 날짜 사이의 일수, 주수, 개월수, 년수를 무료로 계산하세요.',
  keywords: ['날짜차이계산기', '날짜계산기', '기간계산', '일수계산', '날짜차이'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
