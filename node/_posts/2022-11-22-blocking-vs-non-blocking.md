---
layout: post
title: Blocking vs Non-Blocking
description: >
  Blocking vs Non-Blocking 에 대해서 알아봅시다.
sitemap: false
---

면접 단골 질문인 Blocking vs Non-Blocking 에 대해 정리해보았습니다.

## Blocking vs Non-Blocking
둘의 차이점의 키-포인트는 _**제어권**_ 입니다.
```text
함수 A() {
  B();
  // 다음 작업!
}

함수 B() {
  // 열심히 실행!
}
```

> A 함수 내에서 B 함수 실행 시?

### ⛔️ 블로킹 (Blocking)
A는 B에게 제어권을 넘겨주고, 함수 실행을 잠시 멈춥니다(Block!).
<br>
B는 함수를 실행하고 A에게 제어권을 넘겨줍니다.
<br>
A는 제어권을 넘겨받고 나서 다음 작업을 이어갑니다.

`Javascript`에서 `alert()` 함수로 설명해보겠습니다.
```javascript
alert('Hi!');
console.log('Bye!');
```
위의 작업의 결과는 보이는 바와 같이 아래와 같습니다.
```shell
# 메시지 알림으로 Hi! 팝업
Bye!
```
메시지 팝업으로 `Hi!`를 보여준 후에 `Bye!`가 콘솔로 출력됩니다.
<br>
이는 `alert` 함수로 제어권이 넘어가서 실행을 완료되기 전까지 Block 됩니다.
<br>
메시지 창을 닫고 나서야 제어권이 다시 돌아와 다음 작업을 실행하게 되는 것이죠.

### ⛩️ 논블로킹 (Non-blocking)
A에서 B를 호출하지만 B가 바로 제어권을 반납하여 A가 제어권을 가지게 됩니다.
<br>
A는 B를 호출하고도 계속해서 다음 작업을 실행합니다.

똑같이 `Javascript`로 예시를 들어보겠습니다.
<br>
비동기 함수로 사용되는 `setTimeout()`로 설명해볼게요.
```javascript
setTimeout(() => 
  console.log('Hi!'), 0); // 2번째 매개변수: 대기 시간을 0으로 설정!
console.log('Bye!');
```
위의 작업을 실행하게 되면 어떻게 될까요?
<br>
정답은 아래와 같습니다.
```shell
Bye!
Hi!
```
제어권을 바로 반납 받아 (`Hi!`를 기다리는 것이 아닌) `Bye!`를 실행하게 되기 때문입니다.
<br>
이렇게 제어권을 바로 반납 받아 다른 일을 할 수 있도록 하는것을 논블로킹이라고 합니다.