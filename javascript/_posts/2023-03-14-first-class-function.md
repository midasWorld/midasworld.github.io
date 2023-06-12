---
layout: post
title: 콜백 함수
description: >
  콜백 함수에 대해 정리해보기
sitemap: false
---

다른 함수에 전달인자로 전달하는 함수를 콜백 함수 라고 합니다.
<br>일단 일급 함수와 고차 함수를 통해 알아보겠습니다.

## 일급 함수 (first-class function)

- MDN 문서 링크 : https://developer.mozilla.org/ko/docs/Glossary/First-class_Function

함수가 일반 객체처럼 모든 연산이 가능한 것

```javascript
const plus = (a, b) => {
  return a + b;
};
```

- 함수의 매개변수로 전달
- 함수의 반환 값
- 할당 명령문
- 동일 비교 대상

> Java8+, Kotlin, Python, Swift 등이 지원

## 고차 함수 (Higher-order function)

- 인자를 함수를 받거나 (콜백함수),
- 함수를 반환하는 함수를 고차함수라 부릅니다.

```javascript
function calculate(a, b, action) {
  let result = action(a, b);
  console.log(`(${a}, ${b})'s plus result is ${result}`);
  return result;
}
```

**여기서 action 을 콜백함수라고 합니다.**
<br>전달될 당시에 함수를 바로 호출하는 것이 아니라,
<br>함수를 가리키고 있는 함수 참조값이 전달되고,
<br>고차 함수 내에서 필요한 순간에 호출이 나중에 됩니다.
