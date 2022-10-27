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

## 🔖 참고 사이트
- [드림코딩 - 리액트 개념정리 · 클론코딩](https://academy.dream-coding.com/courses/react)