import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '세후 급여 계산기',
  description: '4대보험과 소득세를 공제한 실수령액을 무료로 계산하세요. 2025년 기준.',
  keywords: ['세후급여계산기', '실수령액', '4대보험', '소득세', '급여계산기'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
