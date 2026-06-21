import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '기초대사량 계산기',
  description: '성별, 나이, 키, 몸무게, 활동량으로 기초대사량(BMR)과 하루 권장 칼로리를 계산하세요.',
  keywords: ['기초대사량계산기', 'BMR계산기', '하루칼로리', 'TDEE', '칼로리계산기'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
