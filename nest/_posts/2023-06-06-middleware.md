---
layout: post
title: NestJS - Middleware
description: >
  NestJS - Middleware 내용 정리
sitemap: false
---

Middlware 예제로 로깅을 소개하고 있지만... 🤔
<br>커스텀 로깅으로는 사실 인터셉터를 이용해서 많이 사용하고 있고,
<br>보안 관련 해서는 Guards 를 지원하고 있기 때문에 사용처가 애매해진 느낌이 들었습니다.
<br>(npm library 의 morgan, helmet 등을 이미 사용하고 있지만 말이죠. 😐)

NestJS 에서 Request LifeCycle 문서를 보면 가장 먼저 Middleware 가 실행됩니다.
<br>그리하여 저의 경우에는 CSRF 토큰 검증에 사용했습니다.

전역적으로 모든 API에 CSRF 토큰이 필요하고, 가장 먼저 거치게 되는 부분도 딱 맞아떨어졌기 때문입니다.

## Middleware 란?

- 미들웨어는 라우트 핸들러보다 먼저 호출되는 함수 입니다.
- 요청 및 응답 객체에 접근하여 사용가능합니다.
  <br>(요청 객체를 변경할 수도 있고, 여기서 응답을 할 수도 있습니다.)
- 스택에서 다음 미들웨어 함수를 호출합니다.
- 미들웨어에서는 `next()` 함수를 호출하지 않으면 요청이 중단됩니다.
- 특정 API에서만 해당 미들웨어를 거쳐가도록 설정 가능합니다.

Node 환경의 미들웨어에서는 대게 로깅, JWT 토큰 검증등으로 활용했었습니다.

NextJS 에서는 Guards 기능을 통해 JWT 토큰 검증을 활용할 수 있어,
<br>여기서는 로깅을 예제로 들고 있습니다.

## 로깅 구현 및 설정하기

로깅 미들웨어를 만들어보겠습니다.

express 에서 사용했던 것 처럼 아래와 같이 구현 및 적용할 수 있습니다.

### logger.middleware.ts 구현

```typescript
import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  // 하고 싶은 작업 수행
  next();
}
```

### 전역(Global)적인 미들웨어 적용하기

main.ts 에서 아래와 같이 추가해주기만 하면 됩니다.

```typescript
app.use(logger);
```

### 특정 api 에 미들웨어 적용하기

`/posts` 의 `GET` API만 적용하고 싶다면 아래와 같습니다.

```typescript
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer //
      .apply(logger)
      .forRoutes({ path: "posts", method: RequestMethod.GET });
  }
}
```

### 특정 컨트롤러에 적용해보고, 그 중 특정 api는 제외하기!

특정 컨트롤러로 연결시킬 수도 있습니다.
<br>그리고 exclude() 함수를 통해 특정 API를 제외할 수도 있습니다.

```typescript
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer //
      .apply(logger)
      .exclude({ path: "posts", method: RequestMethod.POST })
      .forRoutes(PostsController);
  }
}
```
