---
layout: post
title: Debounce vs Throttle
description: >
  Debounce vs Throttle 에 대한 간단 정리
sitemap: false
---

아래의 사이트가 너무나도 설명이 직관적이고 상세하게 설명해주고 있어 한번 보시는 것을 추천 드립니다. 👍

- 링크 : ✨ https://redd.one/blog/debounce-vs-throttle

## Debounce

이벤트가 발생할 때 일정시간 기다렸다가 그 때 처리해주는 방식을 말합니다.

- 예를 들어 만약에 3초를 설정했다면,
- 검색 버튼을 클릭하게 됬을 때 3초 뒤에 요청을 합니다.
- 하지만 3초가 되기전에 클릭을 하게 되면 시간은 초기화되고,
  <br>다시 그 기점으로 다시 3초 뒤에 요청을 합니다.

## Throttle

일정 간격으로 끊어서 처리하는 방식입니다.

예를 들어 만약에 3초를 설정했다면, 3초에 딱 한 번만 요청할 수있습니다.

## 사용처

- 관련 코드 링크 : https://github.com/midasWorld/instagram-clone/pull/6

인스타그램 클론 코딩의 검색 페이지 구현 때, 사용하게 되었습니다.
<br>검색을 위해 키보드를 입력할 때마다 onChange 함수가 발생하므로 무수한 요청이 반복되게 됩니다.
<br>이를 해결하기 위해 둘 중에 Debounce 를 활용해 해결할 수 있었습니다.
