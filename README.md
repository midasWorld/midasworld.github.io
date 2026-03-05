# midasworld.github.io

서버 개발 학습 블로그. Next.js 16 (App Router) + GitHub Pages.

## 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | Next.js 16 + TypeScript (`output: 'export'`) |
| 스타일 | Tailwind CSS v4 + next-themes (다크모드) |
| 마크다운 | unified + remark + rehype |
| 암호화 | AES-256-GCM (비공개 포스트) + Staticrypt (HTML 게이트) |
| 배포 | GitHub Actions → gh-pages |

## 시작하기

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # out/ 정적 파일 생성
```

## 포스트 작성

공개 포스트는 `content/public/<category>/YYYY-MM-DD-slug.md`에 작성:

```yaml
---
title: "제목"
description: "설명"
date: "YYYY-MM-DD"
category: "database"
---

본문 내용...
```

카테고리: `database` `java` `spring` `node` `docker` `server` `network` `git` `algorithm` `nest` `javascript` `etc`

## 비공개 포스트

1. `.env.local` 설정:
   ```
   STATICRYPT_PASSWORD=your-password
   ```
2. `content/private/stock/` 또는 `content/private/exam/`에 `.md` 작성
3. 커밋 시 pre-commit 훅이 자동으로 암호화 (`.md.enc`)

## 배포 설정

GitHub repository Settings에서:
- **Secret** `STATICRYPT_PASSWORD` 추가
- **Pages** → Source: `gh-pages` 브랜치

`main` 브랜치에 push하면 자동 배포됩니다.
