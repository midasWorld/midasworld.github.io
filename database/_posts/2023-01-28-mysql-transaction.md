---
layout: post
title: 트랜잭션이란?
description: >
  트랜잭션의 정의와 특징에 대해 알아보기
sitemap: false
---

면접 질문으로 하기에는 너무 쉬워서 나오진 않을듯 싶지만... 😓
<br> 방심하면 까먹는 특징 4가지를 잊지 않기 위해 정리합니다.

## 트랜잭션이란?

> 데이터베이스의 상태를 변화시키기 위해 수행되는 작업 단위 입니다.

- 트랜잭션은 하나의 작업 단위로 **작업의 완전성을 보장해줍니다.**
- 즉, 작업들을 모두 처리하거나 처리하지 못할 경이 이전 상태로 복구하여 작업의 일부만 적용되는 현상이 발생되지 않게 만들어 주는 기능입니다.
- 하나의 트랜잭션은 Commit(작업 완료) 되거나 Rollback(취소) 됩니다.

### 트랜잭션의 특징 (ACID)

- 원자성(Atomicity) : 작업이 모두 반영되던지 아니면 전형 반영되지 않아야 한다.
- 일관성(Consistency) : 실행이 완료되면 언제나 일관성 있는 상태를 유지해야 한다.
- 독립성(Isolation) : 둘 이상 트랜잭션이 동시에 실행될 경우 서로의 연산에 끼어들 수 엇ㅂ다.
- 영속성(Durability) : 완료된 결과는 영구적으로 반영되어야 한다.