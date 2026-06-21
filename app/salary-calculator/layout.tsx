import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '연봉 계산기',
  description: '연봉 입력만으로 월 실수령액, 4대보험, 소득세를 계산하세요. 2025년 기준.',
  keywords: ['연봉계산기', '실수령액', '연봉실수령액', '4대보험', '소득세계산기'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
