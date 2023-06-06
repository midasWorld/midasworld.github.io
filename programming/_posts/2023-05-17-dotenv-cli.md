---
layout: post
title: dotenv cli 사용하기
description: >
  dotenv cli 사용해서 특정 env 파일로 명령어 실행하기
sitemap: false
---

Prisma 를 사용할 때 testdb 마이그레이션 작업이 필요했는데,
<br>`.env.test` 파일의 정보로 마이그레이션 명령어 작업을 해줘야 하는 상황에 필요했습니다.

## dotenv cli 사용하기

- GIT 문서 링크 : https://github.com/entropitor/dotenv-cli

명령어에서 특정 .env 파일로 설정해서 실행할 수 있도록 하는 모듈입니다.

```shell

dotenv -e .env.test -- npx prisma migrate dev --name init
dotenv -e .env.test -- npx prisma generate
```

위와 같이 `dotenv -e [파일명]`으로 특정 파일을 설정할 수 있고,
<br>`--` 으로 두가지 명령어를 동시에 실행할 수 있습니다.
