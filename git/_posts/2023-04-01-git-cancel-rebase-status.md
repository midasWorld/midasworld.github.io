---
layout: post
title: Rebase 상태 해제하는 방법
description: >
  Local 에서 Rebase 상태 해제하는 방법 소개
sitemap: false
---

만약에 아직 리베이스 상태중에 있다면...? 🤔
```shell
master >R>
```
Command 에서는 위와 같은 상태로 되어 있습니다.
<br>
이 상태에서는 브랜치 삭제가 안되는 것 때문에 **뭐야 이거!?** 하면서 삽질을 조금 했습니다. 🫠

## GIT `master >R>` 상태 해제하기

해제 하는 방법은 아래의 명령어를 입력하면 간단하게 해결 됩니다!

```shell
git rebase --abort
```

---

또한 Merge 상태에서도 아래의 명령어를 입력하시면 똑같이 해제가 됩니다. 😁

```shell
git merge --abort
```