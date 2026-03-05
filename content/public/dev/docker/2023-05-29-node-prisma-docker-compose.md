---
parentCategory: "dev"
title: "Node, Prisma → Docker-compose 작성하기"
description: "Node, Prisma 환경에서 docker-compose 로 로컬 환경 구축하기"
date: "2023-05-29"
category: "docker"
---

환경은 MySQL, Node, Prisma 환경입니다.

하고 나면 쉬운 작업이었는데, 연동하는데 참 먼길을 돌아왔던 것 같습니다. 😐

## 문제의 원인인 Prisma

- Prisma Quickstart: https://www.prisma.io/docs/getting-started/quickstart

위의 링크를 통해서 샘플 프로젝트를 손쉽게 만들 수 있습니다.

여기서 중요한 것은 prisma 를 실행하기 위해서는 아래의 두 가지 작업이 필요합니다.

```shell
# 1. /prisma/schema.prisma 파일에 작성된 schema 정보로 마이그레이션 작업이 실행 됩니다.
npx prisma migrate dev --name init

# 2. 스키마 정보로 해당 ORM 클래스를 만들어 사용 가능케합니다.
npx prisma generate
```

docker-compose 를 이용해서 DB 만들고 나서 위의 두 작업을 해줘야 프로젝트가 정상 동작할 수 있습니다.

스프링에서는 앱이 실행할 때 작성한 `schema.sql` 파일을 통해 테이블을 자동으로 만들수 있는 것과 달리, 커맨드를 실행해야 했습니다.
<br>(Prisma 객체를 이용해서 마이그레이션을 실행하는 것은 없는걸로 보입니다. 🤔)

순서대로 진행해보겠습니다.

## 1. docker-compose 만들기

```yaml
version: "3"

services:
  app-server:
    container_name: app-server
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      NODE_ENV: development
    ports:
      - 8080:8080
    volumes:
      - ./:/app
      - /app/node_modules
    depends_on:
      - app-db
    networks:
      - app

  app-db:
    container_name: app-db
    image: mysql:8.0
    restart: always
    ports:
      - 3307:3306
    environment:
      MYSQL_ROOT_PASSWORD: hello
      MYSQL_DATABASE: testdb
      MYSQL_USER: john
      MYSQL_PASSWORD: johndoe
    volumes:
      - ~/app-db:/var/lib/mysql
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    networks:
      - app

networks:
  app:
    driver: bridge
```

Node 와 MySQL 컨테이너를 작성했습니다.
<br>그리고 networks 옵션을 통해 컨테이너를 연결되도록 했습니다.

여기서 중요한 포인트는 **컨테이너 이름**과 **DB의 포트** 입니다.

```yaml
app-db:
  container_name: app-db
  ...
  ports:
    - 3307:3306
  ...
```

도커 내부에서는 db 포트로 3306을 사용하기 때문에, Node 서버에서도 DB 연결을 3307이 아닌 **3306으로 해야 합니다.**
<br>그리고 DB의 host name 도 localhost 가 아니라 컨테이너의 이름으로 실행되기 때문에,
<br>결과적으로 `app-db:3306` 으로 연결해야 합니다.

Prisma 연결을 위한 DATABASE_URL 은 아래와 같습니다.

> DATABASE_URL="mysql://root:hello@app-db:3306/testdb?schema=public"

## Dockerfile & Docker-entrypoint.sh 파일 작성하기

### Dockerfile

```shell
FROM node:19-alpine

ENV DOCKERIZE_VERSION v0.7.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["sh", "./docker-entrypoint.sh"]

EXPOSE 8080
```

### Docker Entrypoint SHELL 파일 작성하기

```shell
dockerize -wait tcp://malcopolo-db:3306 -timeout 20s

npx prisma migrate dev --name init
npx prisma generate

npm run start:dev
```

말 그대로 순서대로 실행되는데,
<br>여기서 중요한 포인트는 `DOCKERIZE`, `docker-entrypoint.sh` 입니다.

이것을 사용한 이유는 Prisma 의 마이그레이션 작업을 DB가 완전히 실행된 이후에 해야 되는데,
<br> 명령어를 그냥 여기서 작성을 해버리면 db가 제대로 실행되기도 전에 실행되어 오류가 발생하게 됩니다.

이를 위해서 DB가 완전히 실행 될때까지 기다려야 하는 작업이 필요한데,
<br>이를 위한 DOCKERIZE 모듈의 설치 및 사용입니다.

- dockerize 링크 : https://github.com/jwilder/dockerize

링크를 들어가보시면 관련 내용을 확인할 수 있습니다.
<br>아래의 docker-entrypoint.sh 파일을 보시면 알 수 있듯이,
<br>**지정한 TCP 포트에서 수신 대기할 때까지 시작을 지연시킬 수 있는 도구 입니다.**

그래서 반드시 실행되도록 만드는 ENTRYPOINT 를 사용해서, 순서대로 잘 작동할 수 있도록 할 수 있습니다.

이렇게 Node 서비스와 prisma 연동 작업을 완료하였습니다.
