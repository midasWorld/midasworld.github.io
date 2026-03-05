---
parentCategory: "dev"
title: "gitignore 파일 적용 안될 때!"
description: "ignore 파일 적용 안될 때 해결 방법 | Cache 삭제 방법"
date: "2022-12-26"
category: "git"
---

리액트 사용 중에 `.yarn` 폴더를 `.gitignore`에 작성을 했는데도 적용되지 않는 일이 있었습니다. 
<br>
🤔 찾아보니 GIT 캐시가 남아있어서 적용되지 않는다고 합니다.
<br>
아래의 방법으로 캐시를 삭제하고 보니 제대로 적용된 것을 확인할 수 있었습니다.

## `.gitignore` 캐시 삭제
```shell
git rm -r --cached .

git add .
```

캐시를 모두 삭제 후 파일을 다시 등록을 해주면 됩니다! 😁

