---
layout: post
title: Docker-compose 란?
description: >
  Docker-compose 내용 정리
sitemap: false
---

유용한 docker-compose 사용 정리! 🥸

## 도커 컴포즈란?

- 도커 컨테이너를 일괄적으로 정의하고 제어하는 도구 입니다.
- 설정 파일을 도커 CLI로 변역하는 역할을 맡습니다.

```yaml
version: '3'
services:
  prisma:
    image: prismagraphql/prisma:${PRISMA_VERSION}
    restart: always
    ports:
      - '${PRISMA_PORT}:${PRISMA_PORT}'
    environment:
      PRISMA_CONFIG: |
        managementApiSecret: ${PRISMA_MANAGEMENT_API_SECRET}
        port: ${PRISMA_PORT}
        databases:
          default:
            connector: postgres
            host: postgres
            port: ${POSTGRES_PORT}
            user: ${POSTGRES_USER}
            password: ${POSTGRES_PASSWORD}
   postgres:
    image: postgres:${POSTGRES_VERSION}
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres:/var/lib/postgresql/data
volumes:
  postgres: null
```

### `services`란?

- 실행하려는 컨테이너들을 정의하는 역할
- 이름, 이미지, 포트 매핑, 환경 변수, 볼륨 등을 포함
- 해당 정보를 가지고 컨테이너를 생성하고 관리

### `services` 옵션

- images: 컨테이너를 생성할 때 쓰일 이미지 지정
- build: 정의된 도커파일에서 이미지를 빌드해 서비스의 컨테이너를 생성하도록 설정
- environment: 환경 변수 설정, docker run 명령어의 --env, -e 옵션과 동일
- command: 컨테이너가 실행 될 때 수행할 명령어, docker run 명령어의 마지막에 붙이는 커맨드와 동일
- depends_on: 컨테이너간의 의존성 주입, 명시된 컨테이너가 먼저 생성되고 실행
- ports: 개방할 포트 지정, docker run 명령어의 -p 옵션과 동일 (포트 포워딩)
- expose: 링크로 연계된 컨테이너에게만 공개할 포트 설정
- volumes: 컨테이너에 볼륨을 마운트함
- restart: 컨테이너가 종료될 때 재시작 정책
  - no: 재시작 되지 않음
  - always: 외부의 영향에 의해 종료 되었을 때 항상 재시작(수동으로 끄기 전까지)
  - on-failure: 오류가 있을 시 재시작

## 도커 컴포즈 명령어

> docker-compose -f local-infra.yml up -d

- up: 도커 컴포즈 파일로, 컨테이너를 실행하기
- -f: 도커 컴포즈 파일 지정하기
- -d: 백그라운드에서 실행하기

### 도커 네트워크 리스트 조회

> docker network ls

- bridge: 도커 엔진에 의해 자동으로 생성되는 가상 네트워크, 컨테이너끼리 연결되는 기본 네트워크
- host: 호스트 컴퓨터의 네트워크 인터페이스를 그대로 사용하는 네트워크
- none: 네트워크를 사용하지 않는 컨테이너

### 도커 네트워크 생성

> docker network create wordpress_net

도커 네트워크를 생성하는 명령어 (네트워크 이름을 지정)
