---
layout: post
title: Docker-compose & MySQL Issue 해결
description: >
  docker-compose 에서 mysql 실행 시 생기는 이슈 해결
sitemap: false
---

흠.. 괜찮다가 갑자기 생기는 docker-compose & mysql 이슈였습니다. 🤔

## Docker MySQL Issue 해결

### ISSUE 발생

```yaml
version: "3"

services:
  db:
    container_name: db
    image: mysql:8.0
    restart: always
    ports:
      - 3307:3306
    env_file:
      - .env
    volumes:
      - ./db:/var/lib/mysql
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
```

위의 도커 컴포즈를 실행하고 MySQL 로 접속하려고 하는데...

```shell
Host '172.18.0.1' is not allowed to connect to this MySQL server
```

위와 같은 오류가 발생했습니다. 😓

### 해결

- ✨ 링크 : https://stackoverflow.com/questions/54030469/host-x-is-not-allowed-to-connect-to-this-mysql-server

역시나 stackoverflow 였습니다. 👍
<br>단순하게 경로만 아래와 같이 변경을 해주면 해결되는 문제였습니다.

```yaml
# Before (Error)
volumes:
  - ./db:/var/lib/mysql

# After (Solved)
volumes:
  - ~/db:/var/lib/mysql
```

이유는 자세히 알수는 없지만...
경로에 대한 권한 관련해서 오류가 발생했지 않았을까...? 🤔 싶습니다.
