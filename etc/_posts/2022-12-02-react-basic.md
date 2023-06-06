---
layout: post
title: 리액트 기초 공부 (2) - CSS Triggers
description: >
  리액트 기본 부터 다시 복습하며 정리해보기
sitemap: false
---

리액트 복습 2탄!

# 리액트 고급 내용
## 마우스 이벤트
마우스 이동에 따라서 컴포넌트를 이동하는 간단한 미션을 진행해봤습니다.
<br>
미션 진행할 때는 css의 top, left 속성으로 진행을 했는데..?
```javascript
const pointerRef = useRef();

const onMove = (e) => {
  const top = (e.clientY - (pointerRef.current.clientWidth / 2)) + 'px';
  const left = (e.clientX - (pointerRef.current.clientHeight / 2)) + 'px';

  pointerRef.current.style.top = top;
  pointerRef.current.style.left = left;
}

return (
  <div className='container' onMouseMove={onMove}>
    <div className='pointer' ref={pointerRef}/>
  </div>
);
```
<br>
정답을 보니 `transform`을 사용했습니다.
<br>
생각을 해보니.. 성능 개선을 위한 렌더링 순서 관련된 내용을 들은 기억이 나서 그 내용도 추가!

## ✨ 성능을 위한 렌더링 순서 이해하기 (with Critical rendering path)

> requests/response → loading → scripting → rendering → layout → painting
1. requests/response
  <br>
  브라우저가 서버에게 html 파일을 요청,
  <br>
  서버에 request 하면 가장 먼저 index.html 받음
  <br>
  → 필요한 링크 파일(CSS, JS) 받음
  <br>
  → 필요한 리소스(image, font) 순차적으로 서버에서 받음
3. loading
  <br>
  html 파일을 서버에서 받아 로딩
3. scripting
  <br>
  html 파일을 한줄 한줄 읽어 DOM 요소로 변환 (DOM Tree 생성),
  <br>
  CSS 스타일을 모두 계산 → CSSOM Tree 생성
4. rendering
  <br>
  DOM + CSSOM → 브라우저에 표기될 요소 선별 → **Render Tree** 생성
5. layout
  <br>
  Render Tree 각 요소들이 어떤 위치에 얼마나 크게 차지 할것인지 계산!
6. painting
  <br>
  그리기

### **어떤 일을 하는지 카테고리로 나누어 생각을 해보면? 🤔**

-  Construction
- 만들어진 렌더링 트리를 이용해 구조를 작성하고 어디에 배치할건지 계산을 한 다음 실제로 브라우저 윈도우에 그림을 그려주는, 렌더링을 하주는 Operation

1. 🏗️ Construction : HTML 페이지에서 브라우저가 이해할 수 있도록 브라우저 언어로 바꾸는 작업
2. 🎨 Operation : `Rendering Tree`를 이용해서 구조와 배치 계산 후, 실제로 그림을 그리는(렌더링) 작업

> DOM > CSSDOM > Render Tree > layout > paint > composition

### 🏗️ Construction
> DOM > CSSDOM > Render Tree

**💁‍♂️ DOM 요소가 작으면 작을 수록, CSS 규칙이 작으면 작을 수록 빨라집니다.**

고로 불필요한 태그를 쓴다던지(div 태그 남용),
<br>
쓸데없이 래핑 클래스나 래핑 요소를 만든다던지는 자제해야 합니다.

### ✨ Operation
> layout > paint > composition

생성된 Render Tree를 이용하여 브라우저 window에 표기할 요소의 위치, 크기 등을 계산하고 그림을 그리는 단계

1. layout
  <br>
  각 요소를 어떤 크기로 어디에 위치시킬 것인지 **구성과 배치**
2. paint
   <br>
   그림을 바로 그리는 것이 아닌! 🙅‍♂️
   <br>
   요소들을 어떻게 배치했는지에 따라 각 부분을 잘게 잘게 나누어 이미지(BITMAP)를 준비해 놓는 단계
   <br>
   (다양한 속성값에 따라 브라우저 엔진마다 성능 개선을 위해 레이어를 준비)
   <br>
   <br>
   이는 변경 사항이 있을 때, 전체를 다시 그리는 것이 아닌 해당 부분만 수정할 수 있도록 하기 위함!
   <br>
   (그렇다고 해서 레이어를 불필요하게 너무 잘게 나누어 많아져도 성능 문제 발생되니 남용 금지)
3. composition
  <br>
  페인트에서 준비한 레이아웃들을 합치는 단계

> 🪄 여기서 중요한 것은!
> <br>
> layout > paint > composition 순서로 진행되기 때문에,
> - **composition 만 일어난다면 Best!** 👍
> <br>
> - paint 가 일어난다면 그럭 저럭? 🤔
> <br>
> - layout 이라면... 성능상 문제가 생길 여지가 다분함! 😓

그래서 위치를 이동 시킬 때, `top, left`가 아닌 `transform`을 사용하는 것이 좋습니다.
<br>
아래의 CSS Triggers 사이트가 그래서 중요합니다!

### ✨ 중요한 CSS Triggers 사이트 ✨
https://www.lmame-geek.com/css-triggers/

### 🤔 Mouse event vs Pointer event 차이는?
<img width="690" alt="image" src="https://user-images.githubusercontent.com/93169519/205250413-f847661f-78de-4184-848d-b956ef5db86d.png">

검색을 해보니, 비슷하지만 pointer 이벤트에 몇몇 속성 정보가 추가되는 것 같다.

### 📌 참고
- [translate() vs positioning 비교 :: 마이구미](https://mygumi.tistory.com/238)

## Todo-app 미션
![image](https://user-images.githubusercontent.com/93169519/206151022-f326d1ce-ef41-4d88-8dc2-973e68e01dad.png)
<br>
미션 완료!

## React Router
### CSR vs SSR
- SSR : 백엔드에 필요한 데이터를 채워 미리 `HTML`로 만들어 준다.
- CSR : 클라이언트에서 자바스크립트 파일을 받음 → 필요한 데이터도 백엔드로부터 받아 클라이언트에서 최종 `HTML`을 만듬

## 🔖 참고 사이트
- [드림코딩 - 리액트 개념정리 · 클론코딩](https://academy.dream-coding.com/courses/react)