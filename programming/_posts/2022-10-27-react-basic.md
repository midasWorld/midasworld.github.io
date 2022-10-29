---
layout: post
title: 리액트 기초 공부 (1)
description: >
  리액트 기본 부터 다시 복습하며 정리해보기
sitemap: false
---

간단한 프론트 프로젝트를 만들어서 백엔드와 연동될 수 있도록 만들기 위한 리액트 복습!
<br>
리액트로 하고 후에 여유가 있다면 Typescript, Next.js로 전환하면 될듯 싶다.

# 리액트 개념 정리
## 라이브러리와 프레임워크 차이
리액트는 라이브러리 일까요? 프레임워크 일까요?? 🤔
<br>
둘의 차이는 무엇일까요?

- 프레임워크 : 
  - ex) Angular
  - Http Client, UI, Routing, State management 등이 모두 갖추어진 틀
  - 정해진 틀 안에서 원하는 것들을 만들어야 됨!
  - 😓 프레임워크에서 규정하는 사용되는 권장되는 모든 것들을 공부해야 되는 단점이 있어 러닝 커브가 있습니다.
  - 😓 정해진 틀 안에서 개발해야 되기 때문에 **자율성이 낮아집니다.**
- 라이브러리 : 
  - 큰 골격이나 규칙이 정해지지 않고, 단 한가지의 작은 솔루션 단위를 라이브러리라고 합니다.
  - ex) React : UI를 만들 수 있게 도와주는 라이브러리!! 😳
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(커뮤니티가 막강해서 필요하다 싶은 라이브러리가 다 있음!)
  - 원하는 것을 골라서 사용할 수 있는 자율성이 보장됩니다.

> 리액트는 유저 인터페이스를 만들기 위한 **자바스크립트 라이브러리** 입니다. 😁

## 리액트 컴포넌트
리액트란 컴포넌트들의 집합체 입니다.
<br>
고로 컴포넌트를 잘 만들어가야 합니다! 🪄

> A highly **cohesive building block** for UIs **loosely coupled** with other components.

좋은 컴포넌트란 다른 컴포넌트와 연결되어 있지 않아 독립적이며 재사용성이 높아야 합니다.
<br>
<br>
🎯 두 가지를 기억해보자!
- **DRY**
  - Don't Repeat Yourself
  - 재사용성
- **SR**
  - Single Responsibility
  - 단일책임

## 리액트 동작 원리
데이터를 State(내부 상태) Props(외부로부터 전달받은 상태)
<br>
나타내는 render가 있다.
<br>
상태가 변경될때마다 re-render 된다.
<br>
실제로 변경된 부분만 화면에 업데이트 된다.
- ✨ 60fps 유지하는 것이 중요!

## 리액트 훅
> Hooks are functions that let you **"hook into"** React **state and lifecycle feature** from function component
> <br>
> 📌 state and lifecycle feature : 재사용 가능한 로직들
- 재사용 가능한 함수이다!
- ✨ 값의 재사용이 아닌 **로직의 재사용**을 위한 것이다!!
- useState(상태 관리), useEffect(컴포넌트 생애주기 관리), useRef, useMemo, useCallback, useContext ...

### 클래스 컴포넌트들의 단점
- 클래스는 어렵다.
- this 바인딩 이슈
- 로직들을 재사용 하기 어려움

## 개발 환경 툴
### node JS
> JavaScript runtime environment (framework) that **executes JavaScript** code **outside a web browser** "JavaScript everywhere"
- server-side rendering 뿐만 아니라 스크립트로 만들어서 사용 가능!
- node 설치 → 자동으로 npm 설치 됨.

### npm
- package manager
- **Publish** and **share** course code of Node.js packages simplify installation, updating, and uninstallation of packages.
- 라이브러리를 쉽게 설치하고 버전을 관리하는 도구
- `package.json`에서 관리

### yarn
- package manager
- built on top of npm to resolve some of npm's shortcomings
  <br>
  faster, consistent, secure
- npm 대비 속도가 빠르고 보안성이 높다.

## 프로젝트 생성

### 만들기
- 링크 : https://create-react-app.dev/docs/getting-started

위 링크를 보면 아래와 같은 명령어로 프로젝트를 생성하게 됩니다.
> yarn create react-app [프로젝트명]


### 📌 yarn 버전 문제
리액트 프로젝트를 생성했을 때 파일이 다를수도 있는데, 이것은 yarn 버전 때문 입니다.
<br>
최신 버전 보다는 안정화된 버전으로 생성하는 것이 좋겠죠? 🤔

> yarn set version stable

위의 명령어로 yarn 안정화된 버전으로 설정이 가능 합니다! 

### 중요 툴
- BABEL
  - JavaScript transcompiler
  - 개발 때는 최신 자바스크립트로 개발을 해도, 예전 버전으로 변환 가능!!
- Webpack
  - Bundling the code, JavaScript module bundler 
  - 우리의 코드를 포장해서 배포할 수 있게 해주는 번들러!
  - 어떤 것들을 그룹지어 전송을 해야 되는지 등...
- ESLint
  - 코드가 올바르게 작성되고 있는지 체크!
- Jest
  - 테스팅 프레임워크
- PostCSS

### CSR?
- client side rendering

### Yarn 오류
실행을 하고 나서 파일을 수정하게 되면 실시간으로 수정된 내용이 반영되는게 아닌 아래와 같은 오류가 발생하는 것을 볼 수 있는데요. 🤔

<img width="875" alt="image" src="https://user-images.githubusercontent.com/93169519/198752227-87423f4e-588c-4d30-8433-6e60b122db48.png">

이를 해결하기 위해서 아래와 같이 하면 됩니다.
1. Dependencies 추가
    ```shell
    yarn add -D eslint-config-react-app
    ```
2. Root 경로에 `.yarnrc.yml` 작성
    ```yaml
    packageExtensions:
      react-scripts@*:                  # 기본적으로 모든 리액트 스크립트를 사용하고 있는데,
        peerDependencies:               # peer dependencies 중에 
          eslint-config-react-app: "*"  # 얘는 우리가 설치한 것을 수동적으로 사용할 것이니라!
    ```
3. 캐시 초기화 후 다시 설치해서 실행하면 됩니다.
    ```shell
    yarn cache clean
    yarn install
    ```
4. 끗!

### JSX
- https://reactjs.org/docs/introducing-jsx.html
- https://reactjs.org/docs/jsx-in-depth.html
- https://transform.tools/html-to-jsx

무료 사진 사이트 : https://unsplash.com/

### 컴포넌트 만들기
- rfc : 단축키 (react snippet 익스텐션)

- Box Shadow : https://cssgenerator.org/box-shadow-css-generator.html\

### Props
외부에서 전달용으로 주입할 수 있음!

### useState
주의할 점!
```jsx
const [cnt, setCnt] = useState(0);

onclick= () => {
    setState(cnt + 1);
    setState(cnt + 1);
    setState(cnt + 1);
    setState(cnt + 1);
    setState(cnt + 1);
}
```
위의 코드에서 한번 클릭을 하면, cnt = 5가 될까요?
<br>
❌ 1만 오르게 됩니다.
<br>
onclick 을 하게 됬을 때, 스냅샷을 저장하게 되며 환경(Lexical Environment : 특정 코드가 작성, 선언(정의)된 환경)이 콜백함수에 전달됩니다.
<br>
cnt = 0 인 상태로 전달을 하고, 0 + 1 만 계속해서 실행하게 되니 결국 1이 됩니다.

이를 굳이? 해결하고자 한다면? 아래와 같이 하면 됩니다!
```jsx
const [cnt, setCnt] = useState(0);

onclick= () => {
    setState((prev) => prev + 1);
    setState((prev) => prev + 1);
    setState((prev) => prev + 1);
    setState((prev) => prev + 1);
    setState((prev) => prev + 1);
}
```

## 🔖 참고 사이트
- [드림코딩 - 리액트 개념정리 · 클론코딩](https://academy.dream-coding.com/courses/react)