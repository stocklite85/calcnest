@AGENTS.md

# CalcNest 프로젝트 규칙

## HANDOFF.md 자동 업데이트 (필수)

파일을 추가하거나 수정할 때마다 HANDOFF.md를 업데이트한다.

업데이트 타이밍: **코드 작업 완료 직후, git commit 전에** HANDOFF.md를 수정하고 함께 커밋한다.

## 배포 방법

```powershell
cd D:\00.web\calcnest
git add .
git commit -m "feat: ..."
git push
# 자동배포 안 될 경우:
vercel --prod
```

## 주의사항

- 로컬 dev 서버 실행 금지 (사용자 요청)
- `next.config.ts` 에 `output: 'standalone'` 넣지 말 것
- Tailwind v4 사용 중 — `tailwind.config.ts` 없음, `@import "tailwindcss"` 방식
- 모든 페이지 `'use client'` 선언 필요 (crypto, Date 등 브라우저 API 사용)
- 계산 로직은 반드시 `lib/` 에 분리, 페이지에 직접 쓰지 말 것
