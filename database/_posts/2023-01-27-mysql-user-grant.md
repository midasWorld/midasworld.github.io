---
layout: post
title: MySQL 사용자 생성 및 권한 부여
description: >
  MySQL 에서 사용자 생성하고 데이터베이스에 대한 권한 부여해보기
sitemap: false
---

MySQL에서 새로운 데이터베이스와 함께 사용될 사용자 생성에 사용되는 명령어 모음 입니다.

## 사용자 생성 및 권한 부여하기

아래의 명령어들을 통해 생성한 데이터베이스를 사용하실 수 있습니다.

### 😐 사용자 생성

```shell
### 생성 ###
use mysql;

create user '사용자'@'host' identified by '비밀번호';

# ex1) 내부 접근을 허용하는 사용자 추가
create user 'test'@'localhost' identified by '0000';

# ex2) 외부 접근을 허용하는 사용자 추가
create user 'test'@'%' identified by '0000';

# ex3) 특정 ip만 접근을 허용하는 사용자 추가
create user 'test'@'123.456.789.100' iden****tified by '0000';

# ex4) 특정 ip 대역을 허용하는 사용자 추가
create user 'test'@'%' identified by '0000';
```

### 🫥 사용자 제거

```shell
### 제거 ###
drop user '사용자';
# or
delete from user where user='사용자';

# example
drop user 'test'@'localhost';

//== 비밀변호 변경 ==//
alter user '사용자'@'localhost' identified by '비밀번호';
```

### 😎 GRANT 를 이용한 사용자 권한 부여

```shell
# 모든 데이터베이스의 모든 테이블에 모든 권한을 줌
grant all privileges on *.* to '사용자'@'localhost';

# 특정 데이터베이스의 모든 테이블에 모든 권한을 줌
grant all privileges on DB이름.* to '사용자'@'localhost';

# 특정 데이터베이스의 특정 테이블에 모든 권한을 줌
grant all privileges on DB이름.테이블명 to '사용자'@'localhost';

# 특정 데이터베이스의 특정 테이블에 select 권한을 줌
grant select on DB이름.테이블명 to '사용자'@'localhost';

# 특정 데이터베이스의 특정 테이블에 select, insert 권한을 줌
grant select, insert on DB이름.테이블명 to '사용자'@'localhost';

# 특정 데이터베이스의 특정 테이블의 컬럼1과 컬럼2의 update 권한을 줌
grant update(컬럼1, 컬럼2) on DB이름.테이블명 to '사용자'@'localhost';
```

### ✨ 사용자 생성 + GRANT 권한 부여 한번에!

```shell
### 생성 및 권한 부여 ###
grant all privileges on *.* to '사용자'@'localhost' identified by '비밀번호';

# example
grant all privileges on *.* to 'test'@'localhost' identified by '0000';
```

### ‼️ 마무리로 변경사항 반영하기

```shell
### 권한 부여 ###
FLUSH PRIVILEGES;
```