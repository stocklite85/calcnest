import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BMI 계산기',
  description: '키와 몸무게로 체질량지수(BMI)와 비만도를 무료로 계산하세요. 정상 체중 범위도 알려드립니다.',
  keywords: ['BMI계산기', '체질량지수', '비만도계산기', '정상체중', 'BMI'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
