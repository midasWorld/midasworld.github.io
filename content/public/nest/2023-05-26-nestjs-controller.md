---
title: "NestJS - Controller"
description: "NestJS - Controller 내용 정리"
date: "2023-05-26"
category: "nest"
---

NestJS - Controller 정리해보기!

## @Param - route(routing | path) parameter

params 의 기본 타입이 any로 설정되어 권장하지 않습니다.
<br> 그래서 아래와 같이 2가 방법으로 타입을 명시할 수 있습니다.

```typescript
// 1.
@Delete('/api/v1/:userId/follows/:targetId')
deleteUserFollow(@Param() params: { [key: string]: string }) {
  return `userId: ${params.userId}, targetId: ${params.targetId}`;
}

// 2.
@Delete('/api/v2/:userId/follows/:targetId')
deleteUserFollowV2(
  @Param('userId') userId: string,
  @Param('targetId') targetId: string,
) {
  return `userId: ${userId}, targetId: ${targetId}`;
}
```

2번째 방법을 추천합니다.
REST API 구성때 라우트 매개변수는 개수가 너무 많아지지 않게 설계하는 것을 권장하기 때문에,
코드가 많이 길어질 걱정도 없기 때문입니다.

## 하위 도메인

도메인 설정을 할때 대게는 API 도메인을 따로 두게 됩니다.
예를 들어 `midas.com` 도메인이 있다면, API 도메인을 `api.midas.com`으로 설정합니다.

여기서 만약에 API 도메인을 버전별로 달리 사용하고 싶다면 어떻게 해야할까요? 🤔
(ex: `v1.api.midas.com`, `v2.api.midas.com`)

이럴 때 **하위 도메인 라우팅 기법**을 사용합니다.

### Mac - api.localhost 도메인 설정하기

- 설정 환경: macOS ventura 13.3.1(a)

하위 도메인 api.localhost 설정을 하기 위해서는 hosts 파일을 수정해야 합니다.

> hosts 파일이란?
> <br>
> host 파일은 운영 체제가 호스트 이름을 IP 주소에 매핑할 때 사용되는 파일 입니다.

이제 수정해보겠습니다.

```shell
sudo vim /private/etc/hosts


# 👉 hosts 파일 안에서 localhost 밑에 작성하면 됩니다.
# -----------------------
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1       localhost
127.0.0.1       api.localhost
127.0.0.1       v2.api.localhost
```

### NestJS - 하위 도메인 설정

먼저 모듈에서 ApiController에서 먼저 처리되도록 순서를 앞으로 변경해야 합니다.

```typescript
@Module({
  controllers: [ApiV2Controller, ApiController, AppController, UsersController],
  ...
})
export class AppModule {}
```

그리고 Controller의 host 속성을 사용하면 됩니다.

```typescript
@Controller({ host: "api.localhost" })
export class ApiController {
  @Get()
  index(): string {
    return "Hello, API";
  }
}
```

버저닝의 경우는 아래와 같이 host 속성과 `@HostParam`를 활용할 수 있습니다.

```typescript
@Controller({ host: ":version.api.localhost" })
export class ApiV2Controller {
  @Get()
  index(@HostParam("version") version: string): string {
    return `Hello, API ${version}`;
  }
}
```
