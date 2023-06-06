---
layout: post
title: Github Action - Node CI 작성
description: >
  Github Action - Node CI 작성해보기
sitemap: false
---

작성한 문서는 아래와 같습니다. 😁

## Git Workflow 문서

```yaml
name: Server CI

on:
  push:
    branches:
      - main
      - release
      - develop
  pull_request:
    branches:
      - main
      - release
      - develop

permissions:
  contents: read
  issues: read
  checks: write
  pull-requests: write

jobs:
  CI:
    runs-on: ubuntu-latest
    steps:
      - name: Repository 가져오기
        uses: actions/checkout@v3

      - name: Node JS 설치
        uses: actions/setup-node@v3
        with:
          node-version: 19.7.0

      - name: Cache node modules
        uses: actions/cache@v3
        id: cache
        with:
          path: node_modules
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

      - name: Dependencies 설치
        if: steps.cache.outputs.cache-hit != 'true'
        run: npm ci

      - name: ESLint 실행
        run: npm run lint
        if: ${{ always() }}

      - name: 프로젝트 빌드
        run: npm run build
        if: ${{ always() }}
```

### 🤔 Cache node modules ??

push 나 PR 때마다 `npm install` 을 실행하게 되면 시간이 굉장히 많이 소요됩니다.

이를 사용하면 해당 프로젝트의 node_modules가 변했는지 여부를 확인할 수 있고,
<br>모듈 변화가 있는 경우에만 `npm install` 실행할 수 있도록 해줍니다.

### 🤔 `if: ${{ always() }}`란?

무조건 테스트를 실행하게끔 하는 옵션입니다.
<br>사용되는 이유는 앞선 ESLint 실행에서 오류가 발생하면 여기서 실행이 종료되게 됩니다.
<br>뒤에 빌드 부분에도 문제가 있을지도 모르는데 말이죠. 😓

이를 위해서 무조건 필요한 상황에 추가하면 됩니다.
