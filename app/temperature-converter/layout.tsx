import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '온도 변환기',
  description: '섭씨(°C), 화씨(°F), 켈빈(K) 온도 단위를 즉시 변환합니다. 어느 필드에 입력해도 자동 변환.',
  keywords: ['온도변환기', '섭씨화씨변환', '온도계산기', '화씨섭씨변환', '켈빈변환', '°C °F 변환'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
