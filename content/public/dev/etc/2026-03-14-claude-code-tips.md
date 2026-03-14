---
title: "Claude Code 사용 꿀팁 모음"
description: "토큰 절약, 추천 플러그인, 세팅 방법까지 실전 가이드"
date: "2026-03-14"
parentCategory: "dev"
category: "etc"
---

매일 Claude Code를 실무에서 쓰다 보면 "진작 알았으면 좋았을" 팁들이 생긴다. 이 글은 그 경험들을 정리한 실전 가이드다.

---

## 1. Claude Code란?

Claude Code는 Anthropic이 만든 **터미널 기반 AI 코딩 에이전트**다. 단순한 챗봇이 아니라 실제 파일을 읽고, 편집하고, 명령어를 실행하며 코드베이스 전체와 상호작용한다.

### VS Code / Cursor와의 차이점

| 비교 항목 | Claude Code | Cursor / Copilot |
|-----------|-------------|------------------|
| 실행 환경 | 터미널(CLI) | IDE 플러그인 |
| 파일 접근 | 직접 읽기/쓰기/실행 | 에디터 컨텍스트 |
| 자율성 | 에이전트 모드 (멀티 스텝) | 어시스턴트 모드 |
| 적합한 작업 | 대규모 리팩토링, 자동화 | 인라인 코드 작성 |

Cursor는 에디터 안에서 코드를 자동 완성하거나 채팅하는 느낌이라면, Claude Code는 **시니어 개발자를 고용해서 터미널 앞에 앉혀 놓은 것**에 가깝다. 스스로 파일 구조를 파악하고, 여러 파일을 동시에 수정하며, 빌드가 실패하면 오류를 읽고 다시 고친다.

### 설치 방법

```bash
# Node.js 18+ 필요
npm install -g @anthropic-ai/claude-code

# 설치 확인
claude --version

# 시작
claude
```

처음 실행하면 Anthropic API 키를 물어본다. [console.anthropic.com](https://console.anthropic.com)에서 발급받아 입력한다.

---

## 2. 토큰 절약 방법 (핵심)

Claude Code의 비용은 토큰 사용량에 비례한다. 잘 쓰면 같은 예산으로 두 배 이상 효율을 낼 수 있다.

### CLAUDE.md 활용

프로젝트 루트에 `CLAUDE.md` 파일을 두면 **매 대화마다 자동으로 컨텍스트가 주입**된다. 프로젝트 구조, 빌드 명령어, 코드 컨벤션을 한 번 써두면 매번 설명할 필요가 없어진다.

```markdown
# CLAUDE.md

## 프로젝트 개요
Next.js 14 + TypeScript 기술 블로그. `output: 'export'`로 정적 빌드.

## 주요 명령어
- `npm run dev` - 개발 서버
- `npm run build` - 프로덕션 빌드
- `npm test` - 테스트 실행

## 디렉토리 구조
- `app/` - Next.js App Router 페이지
- `components/` - 재사용 컴포넌트
- `lib/posts.ts` - 서버 전용 (fs 사용, 클라이언트에서 import 금지)
- `lib/types.ts` - 타입 정의 (클라이언트 안전)

## 코드 컨벤션
- 함수형 컴포넌트 + TypeScript strict 모드
- 불변성 유지: 객체 직접 변경 금지, 새 객체 반환
- 파일당 최대 400줄

## 절대 건드리면 안 되는 파일
- `.env.local` - 환경 변수
- `content/private/` - 암호화된 비공개 콘텐츠
```

이렇게 해두면 Claude가 프로젝트를 처음 보더라도 맥락을 바로 파악한다. **반복 설명에 쓰이는 토큰이 크게 줄어든다.**

### `/compact` 명령

대화가 길어지면 컨텍스트 창이 꽉 차기 시작한다. 이때 `/compact`를 치면 **현재까지의 대화를 요약**하여 토큰을 절약하면서 대화를 이어갈 수 있다.

```
> /compact
```

### `/clear` vs `/compact` 차이

| 명령어 | 동작 | 사용 시점 |
|--------|------|-----------|
| `/clear` | 대화 기록 완전 초기화 | 완전히 새로운 작업 시작 |
| `/compact` | 대화를 요약하여 압축 | 같은 작업을 계속하되 토큰 절약 |

긴 리팩토링 세션 중간에는 `/compact`, 완전히 다른 작업으로 넘어갈 때는 `/clear`를 쓴다.

### 구체적으로 질문하기

```
# 나쁜 예 - 모호한 질문 → 긴 답변 → 토큰 낭비
"이 프로젝트에서 성능 문제 찾아줘"

# 좋은 예 - 범위를 좁힌 질문
"src/lib/posts.ts의 getAllPosts 함수가 매 요청마다 파일을 전부 읽는데, 캐싱 로직 추가해줘"
```

### 파일 직접 지정

Claude Code는 필요하면 알아서 파일을 탐색하지만, 직접 지정하면 탐색 비용이 줄어든다.

```
# 비효율적
"로그인 버그 찾아줘"

# 효율적
"src/auth/login.ts 38번째 줄 확인해줘. userId가 null일 때 500 에러 발생함"
```

### `--model` 옵션으로 저렴한 모델 활용

단순한 작업에는 Haiku 모델을 쓰면 비용이 크게 줄어든다.

```bash
# 단순 포맷팅, 타입 수정 등
claude --model claude-haiku-4-5

# 복잡한 설계, 아키텍처 결정
claude --model claude-opus-4-5

# 기본 개발 작업 (기본값)
claude --model claude-sonnet-4-6
```

작업 복잡도에 따라 모델을 골라 쓰는 것이 가장 경제적이다.

### 불필요한 확인 줄이기

신뢰할 수 있는 환경에서는 매번 나오는 확인 프롬프트를 줄일 수 있다.

```bash
# 주의: 신뢰된 로컬 환경에서만 사용
claude --dangerously-skip-permissions
```

프로덕션 서버나 중요한 환경에서는 절대 사용하지 말 것.

---

## 3. CLAUDE.md 작성 요령

잘 쓴 CLAUDE.md 하나가 수십 번의 반복 설명을 대체한다.

### 포함해야 할 항목

1. **프로젝트 한 줄 요약** - 무엇을 하는 프로젝트인지
2. **자주 쓰는 명령어** - 빌드, 테스트, 실행, 배포
3. **디렉토리 구조 설명** - 핵심 디렉토리의 역할
4. **코드 스타일 규칙** - 네이밍, 패턴, 금지 사항
5. **절대 수정 금지 파일** - 실수로 건드리면 안 되는 것들
6. **환경 변수 설명** - 어떤 값이 필요한지 (실제 값 말고 키 이름만)

### 실전 CLAUDE.md 예시 (백엔드 API 서버)

```markdown
# CLAUDE.md

## 프로젝트
NestJS + TypeScript REST API 서버. PostgreSQL + TypeORM.

## 명령어
\`\`\`bash
npm run start:dev     # 개발 서버 (포트 3001)
npm run build         # 프로덕션 빌드
npm run test          # 단위 테스트
npm run test:e2e      # E2E 테스트
npm run migration:run # DB 마이그레이션 실행
\`\`\`

## 구조
- `src/modules/` - 기능별 모듈 (auth, users, posts)
- `src/common/` - 공통 데코레이터, 필터, 가드
- `src/config/` - 환경 변수 설정
- `test/` - E2E 테스트

## 규칙
- 모든 엔드포인트는 JWT Guard 적용 (명시적 `@Public()` 없으면 인증 필수)
- DTO는 class-validator 데코레이터 필수
- DB 변경은 반드시 마이그레이션 파일 생성
- 직접 `Repository` 주입 금지 → `Service` 통해서만 접근

## 환경 변수 (`.env`)
- `DATABASE_URL` - PostgreSQL 연결 URL
- `JWT_SECRET` - JWT 서명 키
- `REDIS_URL` - 캐시 서버 URL

## 건드리면 안 되는 것
- `src/database/migrations/` - 기존 마이그레이션 수정 금지
- `src/config/configuration.ts` - 변경 시 팀 논의 필요
```

### 팁: 전역 CLAUDE.md도 활용하라

`~/.claude/CLAUDE.md`에 두면 **모든 프로젝트에 적용**되는 전역 설정이 된다. 개인 코딩 스타일, 선호하는 라이브러리, 언어 설정 등을 넣어두면 유용하다.

```markdown
# ~/.claude/CLAUDE.md (전역 설정)

## 기본 규칙
- 한국어로 대화
- 코드 주석은 영어로
- 함수는 50줄 이하로 유지
- 불변성 패턴 사용 (직접 변경 금지)

## 선호 라이브러리
- 날짜: date-fns (moment.js 사용 금지)
- 유효성 검사: zod
- HTTP 클라이언트: axios
```

---

## 4. 추천 워크플로우

### Plan → Code → Review 패턴

큰 작업을 시작할 때는 바로 코드 작성을 요청하지 말고, 먼저 계획을 세우게 한다.

```
# Step 1: 계획 요청
"users 모듈에 소셜 로그인(Google, GitHub) 기능을 추가하려고 해.
어떤 파일을 어떻게 수정해야 할지 계획만 세워줘. 코드는 아직 짜지 마."

# Step 2: 계획 검토 후 승인
"3번 방법으로 진행해줘. 단, JWT 갱신 로직은 기존 auth.service.ts를 재사용해."

# Step 3: 단계별 구현
"auth/social 디렉토리 구조 먼저 만들어줘."
```

이렇게 하면 방향이 잘못된 채로 수백 줄을 짜는 일을 막을 수 있다.

### `/plan` 모드 활용

`/plan` 명령어를 쓰면 코드 수정 없이 계획만 세우는 모드로 전환된다.

```
> /plan
계획 모드 진입. 파일을 수정하지 않고 분석과 계획만 제시합니다.

> 인증 시스템을 JWT에서 세션 기반으로 마이그레이션하는 계획 세워줘
```

계획을 보고 마음에 들면 `/plan` 모드를 끄고 구현을 요청한다.

### 단계별 작업 요청

```
# 나쁜 예 - 한 번에 너무 많이
"결제 모듈 전체 만들어줘. Stripe 연동하고, 웹훅 처리하고, 환불 기능도 추가해."

# 좋은 예 - 단계별로
1. "Stripe SDK 설치하고 payment.module.ts 기본 구조 잡아줘"
2. "결제 생성 엔드포인트 먼저 구현해줘"
3. "웹훅 핸들러 추가해줘"
4. "환불 로직 마지막으로 추가해줘"
```

### 체크포인트 커밋

큰 작업 중간에는 자주 커밋해두는 것이 중요하다. Claude가 잘못된 방향으로 가도 롤백이 쉽다.

```bash
# 작업 중간중간
git add -A && git commit -m "wip: 소셜 로그인 기본 구조 추가"

# 완성 후
git commit -m "feat: Google/GitHub 소셜 로그인 구현"
```

CLAUDE.md에 이런 규칙을 명시해두면 Claude도 알아서 커밋을 제안한다.

---

## 5. 유용한 슬래시 명령어

터미널에서 `/`로 시작하는 명령어들이다.

| 명령어 | 설명 | 사용 시점 |
|--------|------|-----------|
| `/help` | 전체 명령어 목록 | 처음 시작할 때 |
| `/compact` | 컨텍스트 압축 | 대화가 길어졌을 때 |
| `/clear` | 대화 초기화 | 새 작업 시작 |
| `/cost` | 현재 세션 토큰/비용 확인 | 비용 모니터링 |
| `/model` | 사용 모델 변경 | 작업 복잡도에 따라 |
| `/memory` | 메모리 파일 확인/편집 | 저장된 컨텍스트 확인 |
| `/doctor` | 환경 진단 | 뭔가 이상할 때 |
| `/plan` | 계획 모드 토글 | 코드 수정 없이 분석만 |

### `/cost` 실전 활용

```
> /cost
Session cost: $0.23
Total tokens: 45,230 (input: 38,120, output: 7,110)
```

세션이 끝나기 전에 `/cost`로 비용을 확인하는 습관을 들이면 월말에 놀라는 일이 줄어든다.

---

## 6. MCP (Model Context Protocol) 서버 활용

MCP는 Claude에게 외부 도구나 API를 연결하는 프로토콜이다. 일종의 플러그인 시스템으로, MCP 서버를 통해 Claude가 GitHub, DB, 웹 등에 직접 접근할 수 있게 된다.

### 추천 MCP 서버

**파일 시스템 접근**
```
@modelcontextprotocol/server-filesystem
```
특정 디렉토리에만 접근을 허용하도록 제한할 수 있어서 보안상 안전하다.

**GitHub 연동**
```
@modelcontextprotocol/server-github
```
PR 생성, 이슈 조회, 코드 리뷰 댓글 달기 등을 Claude가 직접 처리한다.

```
# 활용 예시
"현재 브랜치의 변경사항을 분석해서 PR 설명 작성하고 GitHub에 PR 올려줘"
```

**PostgreSQL 연동**
```
@modelcontextprotocol/server-postgres
```
스키마를 분석하거나 쿼리 최적화를 요청할 때 DB에 직접 접근하게 할 수 있다.

**웹 검색**
```
@modelcontextprotocol/server-brave-search
```
Claude가 최신 문서나 패키지 정보를 직접 검색할 수 있게 된다.

**브라우저 자동화**
```
@modelcontextprotocol/server-puppeteer
```
E2E 테스트나 웹 스크래핑을 자동화할 때 유용하다.

### MCP 설정 방법

`~/.claude/config.json` 또는 프로젝트의 `.claude/config.json`에 설정한다.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/midas/projects"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "${DATABASE_URL}"
      }
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "${BRAVE_API_KEY}"
      }
    }
  }
}
```

MCP 서버를 추가하면 Claude가 자동으로 해당 도구를 사용할 수 있게 된다.

---

## 7. 추천 세팅 (settings.json)

`~/.claude/settings.json`에서 Claude Code의 동작 방식을 세밀하게 조정할 수 있다.

### 설정 파일 위치

- **전역 설정**: `~/.claude/settings.json`
- **프로젝트 설정**: `.claude/settings.json` (프로젝트 루트)
- 프로젝트 설정이 전역 설정보다 우선한다.

### 실전 settings.json 예시

```json
{
  "theme": "dark",
  "model": "claude-sonnet-4-6",
  "alwaysThinkingEnabled": true,
  "autoApprove": {
    "enabled": false,
    "patterns": []
  },
  "allowedTools": [
    "Read",
    "Edit",
    "Write",
    "Bash",
    "Glob",
    "Grep"
  ],
  "env": {
    "NODE_ENV": "development"
  }
}
```

### 핵심 설정 항목 설명

**`model`**: 기본 모델 설정. 자주 쓰는 모델을 기본값으로 지정한다.

```json
{
  "model": "claude-sonnet-4-6"
}
```

**`allowedTools`**: Claude가 사용할 수 있는 도구를 제한한다. 읽기 전용 작업만 허용하고 싶을 때 `Write`와 `Bash`를 제외한다.

```json
{
  "allowedTools": ["Read", "Glob", "Grep"]
}
```

**`alwaysThinkingEnabled`**: 확장 사고 모드. 복잡한 작업에서 더 깊이 생각하게 한다. 토큰 소모가 늘어나지만 품질이 올라간다.

```json
{
  "alwaysThinkingEnabled": true
}
```

---

## 8. 권한 설정 꿀팁

Claude Code는 파일 수정, 명령어 실행 등 강력한 기능을 가지므로 권한 설정이 중요하다.

### 도구별 권한 제어

```json
{
  "allowedTools": [
    "Read",
    "Edit",
    "Write",
    "Glob",
    "Grep",
    "Bash"
  ]
}
```

`Bash`를 허용 목록에서 빼면 터미널 명령어 실행을 막을 수 있다. 코드 리뷰만 시킬 때는 `Read`, `Glob`, `Grep`만 허용하는 것도 방법이다.

### 일회성 도구 허용

세션마다 설정 파일을 바꾸는 대신, 실행 시 플래그로 일회성 허용이 가능하다.

```bash
# 이 세션에서만 Bash 도구 허용
claude --allowedTools "Read,Edit,Write,Bash"

# 이 세션에서만 읽기 전용
claude --allowedTools "Read,Glob,Grep"
```

### 위험한 명령어 실행 전 항상 확인

Claude가 `rm -rf`, `DROP TABLE` 같은 위험한 명령어를 실행하려 할 때는 반드시 멈추고 내용을 확인한다. Claude Code는 기본적으로 위험한 명령어 실행 전에 확인을 요청하지만, 습관적으로 직접 검토하는 것이 중요하다.

```
# Claude가 이런 명령어를 제안하면 반드시 내용 확인
> 다음 명령어를 실행하겠습니다: rm -rf node_modules && npm install
> 실행할까요? [y/N]
```

---

## 9. Git 연동 활용법

Claude Code는 Git과 궁합이 매우 좋다.

### 변경사항 검토 후 커밋

```
# git diff를 보여주고 커밋 메시지 요청
"현재 변경된 파일들을 확인하고, 컨벤셔널 커밋 형식으로 커밋 메시지 제안해줘"

# 바로 커밋까지 요청
"스테이징된 변경사항을 분석해서 적절한 커밋 메시지로 커밋해줘"
```

### PR 설명 자동 작성

```
"현재 브랜치(feature/social-login)와 main 브랜치의 차이를 분석해서
GitHub PR 설명을 마크다운으로 작성해줘.
변경 사항 요약, 테스트 방법, 주의사항 포함해서."
```

### CLAUDE.md에 커밋 컨벤션 명시

```markdown
## 커밋 메시지 규칙
- feat: 새 기능
- fix: 버그 수정
- refactor: 리팩토링
- docs: 문서
- test: 테스트
- chore: 설정, 빌드

예시: "feat: 소셜 로그인 Google OAuth 추가"
```

이렇게 CLAUDE.md에 적어두면 커밋 메시지를 요청할 때 자동으로 해당 컨벤션을 따른다.

### 브랜치 전략 자동화

```
"feat/payment 브랜치 만들고, main에서 따와서 전환해줘"
```

```
"현재 작업이 완료됐어. main에 머지 전에 리베이스하고 충돌 확인해줘"
```

---

## 10. 실전 프롬프트 예시

좋은 프롬프트와 나쁜 프롬프트의 차이는 명확하다.

### 버그 수정

```
# 나쁜 예
"버그 고쳐줘"

# 좋은 예
"src/api/users.ts의 getUser 함수가 userId가 null일 때 500 에러 반환함.
null 체크 추가하고, 404 응답 반환하도록 수정해줘.
기존 테스트는 깨지지 않아야 해."
```

### 리팩토링

```
# 나쁜 예
"리팩토링 해줘"

# 좋은 예
"components/Header.tsx의 useEffect가 3개인데, 의존성 배열 정리하고
중복 로직 하나로 합쳐줘. 컴포넌트 분리는 하지 말고, 현재 파일 내에서만 정리해줘."
```

### 테스트 작성

```
# 나쁜 예
"테스트 짜줘"

# 좋은 예
"lib/utils.ts의 formatDate 함수 단위 테스트를 Jest로 작성해줘.
엣지 케이스(null, 빈 문자열, 잘못된 날짜 형식, 타임존 차이) 포함.
기존 테스트 파일이 lib/__tests__/utils.test.ts에 있으니 거기에 추가해줘."
```

### 코드 리뷰

```
# 나쁜 예
"코드 리뷰해줘"

# 좋은 예
"src/auth/ 디렉토리 전체를 보안 관점에서 리뷰해줘.
특히 JWT 토큰 처리, 비밀번호 해싱, SQL 인젝션 가능성 위주로.
Critical, High, Medium으로 우선순위 나눠서 정리해줘."
```

### 새 기능 구현

```
# 나쁜 예
"알림 기능 만들어줘"

# 좋은 예
"알림 기능을 추가하려고 해. 요구사항은 다음과 같아:
1. 사용자가 새 댓글을 받으면 알림 생성
2. 알림 목록 API: GET /notifications (페이지네이션)
3. 읽음 처리 API: PATCH /notifications/:id/read
4. 기존 User 엔티티에 관계 추가 필요

먼저 어떤 파일을 수정해야 할지 계획만 세워줘. 코드는 아직 짜지 마."
```

---

## 11. 비용 관리 팁

### `/cost`로 실시간 모니터링

```
> /cost
```

세션 중간중간 확인하는 습관을 들인다. 비용이 빠르게 올라간다면 `/compact`로 컨텍스트를 압축한다.

### 필요한 부분만 읽게 하기

```
# 비효율적 - 전체 파일 읽기
"auth.service.ts 분석해줘"

# 효율적 - 특정 부분 지정
"auth.service.ts의 validateUser 메서드만 분석해줘. 100번째 줄부터 150번째 줄 정도야."
```

### 반복 작업 패턴화

같은 유형의 작업을 반복한다면 CLAUDE.md에 패턴을 저장해둔다.

```markdown
## 반복 작업 패턴

### 새 API 엔드포인트 추가 시
1. `src/modules/<name>/<name>.controller.ts` - 엔드포인트 정의
2. `src/modules/<name>/<name>.service.ts` - 비즈니스 로직
3. `src/modules/<name>/dto/` - DTO 정의 (class-validator 데코레이터 필수)
4. `test/` - E2E 테스트 추가
```

### 월별 사용량 확인

[console.anthropic.com](https://console.anthropic.com)에서 월별 사용량과 비용을 확인할 수 있다. 예산 한도 알림을 설정해두면 갑작스러운 과금을 방지할 수 있다.

### 모델별 비용 비교 (2025년 기준 참고용)

| 모델 | 상대 비용 | 적합한 작업 |
|------|-----------|-------------|
| Haiku 4.5 | 가장 저렴 | 단순 포맷팅, 타입 수정, 간단한 리팩토링 |
| Sonnet 4.6 | 중간 | 일반 개발 작업 (기본값으로 추천) |
| Opus 4.5 | 가장 비쌈 | 복잡한 아키텍처 결정, 어려운 버그 분석 |

---

## 12. 주의사항

### 민감 정보 보호

`.claudeignore` 파일을 만들어 민감한 파일을 Claude가 읽지 못하게 막는다.

```
# .claudeignore
.env
.env.local
.env.production
secrets/
**/*.pem
**/*.key
credentials.json
```

`.gitignore`와 비슷한 문법으로, Claude Code가 이 파일들을 읽으려 할 때 차단된다.

### 프로덕션 DB 연결 금지

MCP로 DB를 연결할 때는 반드시 **개발/스테이징 DB**에만 연결한다. 프로덕션 DB에 직접 연결하면 데이터 삭제/변경 사고로 이어질 수 있다.

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://localhost/myapp_dev"
      }
    }
  }
}
```

### 중요한 작업 전 반드시 커밋

```bash
# Claude에게 큰 리팩토링을 요청하기 전
git add -A && git commit -m "chore: 리팩토링 전 백업 커밋"

# 실수가 발생하면 롤백
git reset --hard HEAD~1
```

### 생성된 코드는 반드시 직접 검토

Claude가 생성한 코드는 항상 훑어본다. 특히:
- 보안 관련 코드 (인증, 권한, 암호화)
- DB 쿼리 (특히 DELETE, UPDATE)
- 외부 API 호출
- 파일 시스템 작업

Claude는 빠르고 유능하지만 실수를 한다. 최종 판단은 개발자가 한다.

---

## 마치며

Claude Code를 처음 쓸 때는 "그냥 채팅이랑 뭐가 다르지?" 싶을 수 있다. 하지만 CLAUDE.md로 컨텍스트를 구성하고, Plan → Code → Review 패턴을 익히고, MCP로 외부 도구를 연결하기 시작하면 생산성이 완전히 달라진다.

핵심은 **Claude를 똑똑한 주니어 개발자처럼 대하는 것**이다. 모호한 지시 대신 구체적인 요구사항을 주고, 큰 작업은 단계별로 나누고, 중간중간 방향을 확인한다. 그렇게 하면 Claude Code는 실제로 믿을 수 있는 페어 프로그래밍 파트너가 된다.
