---
layout: post
title: Node JS 이모저모
description: >
  Node JS 복습하기
sitemap: false
---

## Node JS 특징

### 싱글 스레드, 논블로킹 모델
- 스레드 하나에 많은 수의 I/O를 감당 가능
- 하지만 CPU 부하가 큰 작업에는 적합하지 않음
- 즉 개수는 많지만 크기가 작은 데이터를 실시간으로 주고 받는데 적합하다.
  <br>
  → 실시간 채팅, 주식 차트, JSON 데이터를 제공하는 API 서버에 사용됩니다.

> ❗️ 하나뿐인 스레드가 에러로 인해 멈추지 않도록 잘 관리해야 한다.

노드는 생산성은 좋지만, Go 처럼 비동기에 강점을 보이는 언어나 nginx 처럼 정적 파일 제공, 로드 밸런싱에 특화된 웹 서버에 비해서는 속도가 느리다.
<br>
하지만 극단적인 성능이 필요하지 않다면 이러한 단점은 노드의 생산성으로 어느정도 극복 가능합니다!

### REPL
자바스크립트는 스크립트 언어이므로 미리 컴파일 하지 않아도 즉석에서 코드를 실행할 수 있습니다.
- Read: 코드를 읽고,
- Eval: 해석 하고,
- Print: 결과물을 반환하고,
- Loop: 종료할 때까지 반복한다.

### package.json (패키지 관리)

서비스에 필요한 패키지를 추가하다보면 100개는 넘어가게 되고, 각 패키지의 버전 관리를 위해 `package.json`이 필요합니다.

> 고로 Node 프로젝트 시작하기 전에 package.json 부터 만들고 시작해야 합니다.

```shell
# package.json 생성
npm init

# ...
package name: (폴더명) [프로젝트명]
version: (1.0.0) [프로젝트 버전]
description: [프로젝트 설명]
entry point: (index.js) index.js
test command: [엔터 키 press]
git repository: [엔터 키 press]
keywords: [엔터 키 press]
author: [your name 입력]
license: (ISC) [엔터 키 press]
# ...
```
- package name: 패키지 이름
- version: 패키지 버전
- entry point: 자바스크립트 실행 파일 진입점.

---

```shell
# 패키지 설치
npm install [패키지명]
```

> `--save 옵션`
`dependencies`에 패키지 이름을 추가하는 옵션이지만 `npm@5`부터는 기본값으로 설정되어 있으므로 생략해도 됩니다 :)

> 프로젝트 이름과 설치하는 패키지 이름은 달라야 한다.
express 패키지 설치 했는데, 프로젝트명이 express 여서는 안됩니다.
<br>
앞으로도 많은 패키지들을 설치할 때, 프로젝트 이름과 겹치지 않는지 확인이 필요합니다.

> package-lock.json
- package.json: 직접 설치한 패키지를 기록하는 파일
- package-lock.json: 패키지간의 의존 관계를 명시한 파일

---

```shell
npm audit
found 0 vulnerabilities
```

`npm audit`은 패키지의 알려진 취약점을 검사할 수 있는 명령어 입니다.
<br>
취약점이 없다면 `found 0 vulnerabilities`,
<br>
취약점이 있다면 `[숫자] [심각도] vulnerability`가 출력됩니다.

`npm audit fix` 명령어를 입력하면 스스로 수정 가능한 취약점을 수정할 수 있습니다.
> 🙋‍♂ 주기적으로 수정해주자!

### 패키지 버전 이해하기

노드 버전의 패키지들의 버전은 항상 세자리로 이루어져 있습니다.
<br>
**이는 SemVer(Semantic Versioning : 유의적 버전) 방식의 버전 넘버링을 따르기 때문입니다.**

> 1.0.7 == [major].[minor].[patch]
1. major: 메이저 버전이 0이면 초기 개발 중, 1부터는 정식 버전을 의미합니다.
  <br>
  메이저 버전은 하위 호환이 안될 정도로 패키지 내용이 수정되었을 때 올립니다.
  <br>
  예를 들어 1.5.0 → 2.0.0 변경 시, 에러가 발생할 확률이 크다.
2. minor: 하위 호환이 되는 기능 업데이트 시 올립니다.
  <br>
  1.5.0 → 1.6.0 업데이트 시, 아무 문제가 없어야 한다!
3. patch: 기존 기능에 문제가 있는 경우 수정 후 올립니다.

> ❗️ 새 버전을 배포한 후에는 그 버전의 내용을 절대 수정하면 안됩니다!
만약 수정 사항이 생기면 3가지 버전 중 하나를 의미에 맞게 올려 새로운 버전으로 배포해야 합니다.

> 🤔 package.json 버전의 ^ 기호의 의미는?
```json
{
  ...
  "dependencies": {
    "express": "^4.18.2"
  }
}
```
위와 같은 ^ 기호의 경우, 마이너 버전까지만 설치하거나 업데이트 합니다.
<br>
(~ 기호는 패치 버전)

### 🧐 import 구문 오류!

- [✅ Cannot use import statement outside a module 에러 해결](https://takeknowledge.netlify.app/bugfix/cannot-use-import-statement-outside-a-module/)
- [[NODE] 📚 require vs import 문법 비교 (CommonJS vs ES6)](https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-require-%E2%9A%94%EF%B8%8F-import-CommonJs%EC%99%80-ES6-%EC%B0%A8%EC%9D%B4-1)

### 유용한 패키지들? 🤔
- morgan : 요청과 응답에 대한 정보를 콘솔에 기록합니다.
  - dev, combined, common, short, tiny 등의 인수를 넣을 수 있다!
- cookie-parser
- express-session
- dotenv

### 🧐 module(import) - __dirname 오류!

- [✅ [Node.js] __dirname is not defined 에러](https://node-js.tistory.com/entry/Nodejs-dirname-is-not-defined-%EC%97%90%EB%9F%AC)
- [자바스크립트 ESM(ES Module)에서 __dirname 사용하기](https://jootc.com/p/202206123895)

### 자주 쓰이는 req, res 객체 속성 알아보기
- req
  - req.app: app 객체 접근(req.app.get('port') 등)
  - req.body: body-parser 미들웨어가 만드는 요청의 본문 해석 객체
  - req.cookies: cookie-parser 미들웨어가 만드는 요청의 쿠키 해석 객체
  - req.ip: 요청의 ip 주소
  - req.params: 라우트 매개변수 정보
  - req.query: 쿼리스트링 정보
  - req.signedCookies: 서명된 쿠키들은 이곳에!
  - req.get(헤더 이름): 헤더의 값을 가져오고 싶을 때!
- res
  - res.app: app 객체
  - res.cookie(키, 값, 옵션): 퀴 설정
  - res.clearCookie(키, 값, 옵션): 쿠키 제거 
  - res.end(): 데이터 없이 응답
  - res.json(JSON): 
  - res.locals: 
  - res.redirect(주소): 리다이렉트
  - res.render(뷰, 데이터): 템플릿 엔진 렌더링 응답
  - res.send(데이터): 데이터(문자열 or HTML or 버퍼 or 객체, 배열 or ...)와 함께 응답.
  - res.sendFile(경로): 경로에 위치한 파일 응답
  - res.set(헤더, 값): 응답 헤더 설정
  - res.status(코드): 응답 시 HTTP 상태 코드 지정
  
### module(import) - config.json 오류(json 파일 참조 오류)!

```javascript
import config from "../config/config.json";

// ...
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
// ...
```

위와 같이 참조하여 사용하려고 하니 아래와 같은 오류가 발생했습니다.

```shell
[nodemon] starting `node app.js`
node:internal/errors:484
    ErrorCaptureStackTrace(err);
    ^

TypeError [ERR_IMPORT_ASSERTION_TYPE_MISSING]: Module "file:///Users/midas/Desktop/Projects/node-js/learn-mysql/config/config.json" needs an import assertion of type "json"
    at new NodeError (node:internal/errors:393:5)
    at validateAssertions (node:internal/modules/esm/assert:82:15)
    at defaultLoad (node:internal/modules/esm/load:84:3)
    at nextLoad (node:internal/modules/esm/loader:163:28)
    at ESMLoader.load (node:internal/modules/esm/loader:601:26)
    at ESMLoader.moduleProvider (node:internal/modules/esm/loader:457:22)
    at new ModuleJob (node:internal/modules/esm/module_job:63:26)
    at #createModuleJob (node:internal/modules/esm/loader:476:17)
    at ESMLoader.getModuleJob (node:internal/modules/esm/loader:434:34)
    at async ModuleWrap.<anonymous> (node:internal/modules/esm/module_job:78:21) {
  code: 'ERR_IMPORT_ASSERTION_TYPE_MISSING'
```

🔖 참고
- [자바스크립트에서의 JSON 모듈](https://abbo.tistory.com/245)


### 메모
- 웹 사이트가 어떤 페이지의 크롤링을 허용하는지 확인하려면 도메인/robots.txt 확인