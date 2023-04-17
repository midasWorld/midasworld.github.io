---
layout: post
title: 인증 정보 초기화 방법
description: >
  credential 오류 해결 방법 → 인증 정보 초기화 방법!
sitemap: false
---

git push 명령어 입력 시 `credential` 오류가 발생한 적이 있었습니다.
<br>
토큰이 만료되어 재발행을 했었는데, 새로운 토큰을 갱신해주지 않아서 생기는 문제였습니다. ❗️

## 로컬 GIT 비밀번호 변경 (토큰 만료 후 재발행 했을 경우...)
```shell
git config --unset credential.helper
```
위의 커맨드로 GITHUB 인증을 초기화 하면 됩니다.
<br>
그리고 다시 push → 이메일, 비밀번호 재입력하기!

## GIT 인증 정보 초기화 방법

토큰을 재발행 했을 때, 먼저 아래의 명령어로 인증 정보를 초기화 시켜주면 됩니다. 

```shell
git config --unset credential.helper
```

그리고 다시 push 를 하게 되면 이메일 / 비밀번호를 재입력하게 되는데, 여기서 비밀번호에 재발행된 토큰을 입력해주면 됩니다! 😁