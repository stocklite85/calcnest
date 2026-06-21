import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'D-day 계산기',
  description: '목표일까지 남은 날짜(D-day)를 무료로 계산하세요. 시험, 여행, 기념일 등 특별한 날을 카운트다운.',
  keywords: ['디데이계산기', 'D-day계산기', '남은날짜', '날짜카운트다운', 'dday'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
