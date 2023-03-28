---
layout: post
title: 리액트 웹페이지 개발기 (로그인)
description: >
  간단한 웹페이지 개발 일지
sitemap: false
---

백엔드 지망이라 프론트는 간단하게 구현만 했었는데...
<br>
간단하게 구현하더라도 로그인이나 api 프로세스 포함해서 기타 기초 개념에 대해서는 다시 다잡고 들어가야 겠다는걸 느끼게 되어 작성해보려고 합니다.

# 프로젝트 구조 설정


## tailwind 설치 및 사용법
### tailwind 설치
```shell
# 개발자 모드로 설치
npm instal -D tailwindcss

# tailwind.config.js 생성!
npx tailwindcss init
```

`tailwind.config.js` 파일에서 `content` 설정을 해줍니다.
<br>
(js, jsx 파일에서 `tailwind`를 사용할 수 있도록 설정!)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"], // ✨ 여기!
  theme: {
    extend: {},
  },
  plugins: [],
};
```

`index.css`에서 설정을 추가해줍니다.
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* css 내용...*/
```

다시 실행을 해보면 적용된 것을 확인 할 수 있습니다!

### tailwind css intelliSense 플러그인 설치!
tailwind css 사용할 때 자동완성을 시켜주는 플러그인 입니다.
<br>
색상 표시도 되기 때문에 유용한것 같아 같이 설치했습니다.
