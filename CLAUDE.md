# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Next.js 16 (App Router) + TypeScript 기반 기술 블로그. `output: 'export'`로 정적 빌드 후 GitHub Pages 배포. 서버 개발 관련 학습 내용 정리.

## 자동 커밋 규칙

**작업 완료 후 반드시 커밋한다.** Stop 훅이 세션 종료 시 자동 커밋하지만, 큰 작업 단위가 완료될 때마다 명시적으로 커밋할 것.

```bash
git add -A
git commit -m "<type>: <description>"
```

커밋 타입: `feat`, `fix`, `style`, `refactor`, `docs`, `chore`

## Commands

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 (http://localhost:3000)
npm run dev

# 프로덕션 빌드 → out/ 디렉토리
npm run build

# 비공개 마크다운 암호화 (content/private/*.md → .md.enc)
STATICRYPT_PASSWORD=<pw> node scripts/encrypt.js

# 복호화 (CI 전용)
STATICRYPT_PASSWORD=<pw> node scripts/decrypt.js
```

## Architecture

### 디렉토리 구조

```
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx            # 홈 (소개 + 최근 포스트)
│   ├── posts/page.tsx      # 포스트 목록 (카테고리 필터)
│   ├── posts/[slug]/       # 포스트 상세
│   └── private/            # 비공개 영역 (Staticrypt 게이트)
├── components/             # React 컴포넌트
├── lib/
│   ├── constants.ts        # CATEGORIES, CATEGORY_LABELS (클라이언트 안전)
│   ├── types.ts            # PostMeta, Post 타입 (클라이언트 안전)
│   ├── posts.ts            # fs 기반 포스트 읽기 (서버 전용)
│   └── markdown.ts         # Markdown → HTML (unified + remark + rehype)
├── content/
│   ├── public/<category>/  # 공개 포스트 73개
│   └── private/            # 비공개 노트 (.md.enc로 커밋)
└── scripts/
    ├── encrypt.js           # AES-256-GCM 암호화
    └── decrypt.js           # CI 복호화
```

### 포스트 Front Matter

```yaml
---
title: "제목"
description: "짧은 설명"
date: "YYYY-MM-DD"
category: "database"
---
```

카테고리: `database`, `java`, `spring`, `node`, `docker`, `server`, `network`, `git`, `algorithm`, `nest`, `javascript`, `etc`

### 클라이언트 / 서버 컴포넌트 주의사항

클라이언트 컴포넌트에서 **절대** `lib/posts.ts`를 import하지 말 것 (fs 의존).
- 타입 → `lib/types.ts`
- 상수 → `lib/constants.ts`

### 비공개 콘텐츠 전략

1. `content/private/`에 `.md` 작성
2. pre-commit 훅이 자동으로 AES-256-GCM 암호화 → `.md.enc` 생성
3. `.md` 원본은 `.gitignore`로 제외, `.md.enc`만 커밋
4. CI에서 복호화 → 빌드 → Staticrypt로 `/private/**/*.html` 래핑

비밀번호 1개(`STATICRYPT_PASSWORD`)로 암호화 + Staticrypt 게이트를 동시에 처리.

### 배포

GitHub Actions (`.github/workflows/deploy.yml`):
```
push(main) → 복호화 → npm run build → staticrypt → gh-pages 배포
```

GitHub secret 필요: `STATICRYPT_PASSWORD`

### 주요 설정 파일

| 파일 | 역할 |
|------|------|
| `next.config.ts` | `output: 'export'`, images unoptimized |
| `lib/constants.ts` | 카테고리 목록/레이블 |
| `scripts/encrypt.js` | 비공개 마크다운 암호화 |
| `.github/workflows/deploy.yml` | CI/CD 파이프라인 |
| `.husky/pre-commit` | 커밋 전 자동 암호화 |
