# CalcNest — AI Handoff Document

## 프로젝트 개요

무료 생활 계산기 모음 웹사이트. 수익화 목적(Google AdSense 예정).
한국어/영어 2개 언어 지원. 서버 비용 0원.

**GitHub:** https://github.com/stocklite85/calcnest
**배포 URL:** https://calcnest-sigma.vercel.app
**배포 방식:** Vercel 무료 플랜 — `git push` 시 자동 재배포 (가끔 실패 시 `vercel --prod` 직접 실행)

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| Framework | Next.js 16.2.9 (App Router) |
| Runtime | React 19.2.4 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| 패키지 매니저 | npm |
| Node.js | v24.16.0 |

---

## 완성된 파일 목록

```
calcnest/
├── app/
│   ├── globals.css                          ✅ 완성
│   ├── layout.tsx                           ✅ 완성 (루트 레이아웃, SEO 메타)
│   ├── page.tsx                             ✅ 완성 (홈 — 계산기 카드 10개, 카테고리 필터)
│   ├── sitemap.ts                           ✅ 완성 (/sitemap.xml 자동 생성)
│   ├── robots.ts                            ✅ 완성 (/robots.txt 자동 생성)
│   └── privacy/
│       └── page.tsx                         ✅ 완성 (개인정보 처리방침 한/영)
├── components/
│   ├── Header.tsx                           ✅ 완성 (로고 + 언어 토글)
│   └── Footer.tsx                           ✅ 완성 (Privacy Policy 링크)
├── contexts/
│   └── LangContext.tsx                      ✅ 완성 (브라우저 언어 자동 감지 + localStorage)
├── lib/
│   └── translations.ts                      ✅ 완성 (한/영 전체 번역, 10개 계산기 분량)
├── CLAUDE.md                                ✅ 완성
└── HANDOFF.md                               ← 이 파일
```

---

## 구현 예정 계산기 (10개)

| # | 슬러그 | 이름 | 카테고리 | 상태 |
|---|--------|------|----------|------|
| 1 | `loan-calculator` | 대출 이자 계산기 | 금융 | ✅ 완성 |
| 2 | `savings-calculator` | 적금 계산기 | 금융 | ✅ 완성 |
| 3 | `compound-calculator` | 복리 계산기 | 금융 | ✅ 완성 |
| 4 | `salary-calculator` | 세후 급여 계산기 | 금융 | ✅ 완성 |
| 5 | `bmi-calculator` | BMI 계산기 | 건강 | ✅ 완성 |
| 6 | `bmr-calculator` | 기초대사량 계산기 | 건강 | ✅ 완성 |
| 7 | `dday-calculator` | D-day 계산기 | 날짜 | ✅ 완성 |
| 8 | `age-calculator` | 나이 계산기 | 날짜 | ✅ 완성 |
| 9 | `date-diff-calculator` | 날짜 차이 계산기 | 날짜 | ✅ 완성 |
| 10 | `area-converter` | 평수 변환기 | 생활 | ✅ 완성 |

---

## 언어 시스템

- `contexts/LangContext.tsx` 에서 `lang` 상태 (`'en' | 'ko'`) 관리
- **자동 감지 순서:** ① localStorage → ② `navigator.language` → ③ 기본값 한국어
- Header 버튼으로 토글, `localStorage('calcnest-lang')` 에 저장
- 번역 텍스트: `lib/translations.ts`의 `t(lang, 'key')` 함수로 호출

---

## 계산기 페이지 구현 가이드

각 계산기 페이지는 다음 구조로 만든다:

```
app/{slug}/
├── layout.tsx   (SEO 메타데이터)
└── page.tsx     ('use client', 계산 UI)

lib/{name}.ts    (계산 로직 분리)
```

각 페이지 공통 구조:
```tsx
// layout.tsx
export const metadata: Metadata = {
  title: '계산기 이름',
  description: '설명',
}

// page.tsx
'use client';
// 1. 입력 폼
// 2. 계산 버튼
// 3. 결과 카드
```

---

## SEO / 검색엔진 등록 현황

| 항목 | 상태 |
|------|------|
| sitemap.xml | ✅ 자동 생성 |
| robots.txt | ✅ 자동 생성 |
| Google Search Console | ✅ 소유권 인증 완료 (색인 반영 대기) |
| 네이버 서치어드바이저 | ✅ 소유권 인증 완료 (색인 반영 대기) |
| Google 인증 키 | `gFJC8pKAliNeLONrdUMXGG5PsKABSFIcGr6DLkmz6KY` |
| 네이버 인증 키 | `757f1145a9b1a882ee186dec878a767b00a56983` |
| Google AdSense | 🔲 미신청 |

---

## 다음 AI가 할 일

### 우선순위 높음 (계산기 구현)
- [x] `loan-calculator` — 대출 이자 계산기 (원리금균등/원금균등/만기일시 + 상환 스케줄)
- [x] `savings-calculator` — 적금 계산기 (일반과세/비과세)
- [x] `compound-calculator` — 복리 계산기 (연/월 복리)
- [x] `salary-calculator` — 세후 급여 계산기 (2025년 4대보험 기준)
- [x] `bmi-calculator` — BMI 계산기 (BMI 구간 시각화 바, 정상체중 범위 표시)
- [x] `bmr-calculator` — 기초대사량 계산기 (Mifflin-St Jeor, 활동량 5단계)
- [x] `dday-calculator` — D-day 계산기 (수능/크리스마스/새해 프리셋)
- [x] `age-calculator` — 나이 계산기 (만/한국/연 나이 + 살아온 날 + 다음생일)
- [x] `date-diff-calculator` — 날짜 차이 계산기 (일/주/월/년)
- [x] `area-converter` — 평수 변환기 (평↔㎡↔ft², 부동산 프리셋)

### 수익화
- [ ] Google AdSense 신청 (publisher ID 발급 후 layout.tsx에 글로벌 스크립트 추가)
- [ ] `components/AdSlot.tsx` 생성 후 각 페이지에 배치

### 검색엔진 등록
- [ ] Google Search Console 소유권 인증 및 사이트맵 제출
- [ ] 네이버 서치어드바이저 등록

---

## 주의사항

- Tailwind v4 — `tailwind.config.ts` 없음, `@import "tailwindcss"` 방식
- 모든 페이지 `'use client'` — 브라우저 API 사용
- `next.config.ts` 에 `output: 'standalone'` 넣지 말 것 (Vercel과 충돌)
- 로컬 dev 서버 실행 금지 (사용자 요청) — git push 후 Vercel에서 확인
- 계산 로직은 `lib/` 폴더에 분리

---

## 코드 수정 후 배포 명령어

```powershell
cd D:\00.web\calcnest
git add .
git commit -m "feat: 변경 내용"
git push
# 자동배포 안 될 경우:
vercel --prod
```
