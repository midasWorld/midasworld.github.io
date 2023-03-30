---
layout: post
title: [GIT] 모든 로그에서 특정 파일 삭제하는 방법
description: >
  모든 로그에서 특정 파일 삭제하는 명령어 소개
sitemap: false
---

특정 커밋에서 불필요한 파일(`.env` 등)이 올라간 적이 있어서, 이를 찾아보다가 알게된 방법 입니다. 🤔

## GIT 모든 로그에서 특정 파일 삭제하는 방법
```shell
git filter-branch --tree-filter 'rm -rf .env' HEAD
```

### **❗️ 어떤 문제가 발생할지 모르니... 무조건 백업 먼저 해두기!!**

만약에 폴더에 있다면 폴더 경로까지 다 작성해주면 됩니다.
<br>
(ex: model/auth.js)

```shell
git filter-branch --tree-filter 'rm -rf model/auth.js' HEAD
```

그리고 커밋할 내역에 남아있다면 오류가 발생하니 미리 Commit or Stash 처리 해둬야 합니다.

### 🚨 혹시나 아래와 같은 오류가 발생하며 안된다면?
```shell
cannot create a new backup. 
a previous backup already exists in refs/original/ force overwriting the backup with -f ...
```

위와 같은 경우에는 강제로 덮어 쓸수 있도록! `-f` 명령어를 추가해주시면 해결됩니다.

```shell
git filter-branch -f --tree-filter 'rm -rf .env' HEAD
```