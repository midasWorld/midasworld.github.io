---
layout: post
title: 인텔리제이에서 Javascript 관련 설정하기
description: >
  인텔리제이에서 Node 개발 환경 만들기!
sitemap: false
---

인텔리제이에서 Node, NextJS 작업을 하려고 했으나.. 😓
<br>
vscode의 편리함과의 괴리감이 느껴져서 그걸 줄여보고자 설정들을 찾아봤습니다.

## curly braces ('{}') for authformat

### 관련 링크: [How to format curly braces for autoformat in intellij](https://stackoverflow.com/questions/41903215/how-to-format-curly-braces-for-autoformat-in-intellij)

```javascript
// 설정 전: import {CommonModule} from "@angular/common";
import { CommonModule } from "@angular/common";
```

설정 전을 보시면 `{}` 의 안쪽의 띄워쓰기가 없이 설정되어 있습니다.
이 부분을 설정하는 곳은!! `ES6 import/export braces` 입니다.

`Settings > Editor > Code Style > Javascript > Spaces > ES6 import/export braces` 체크 하면 됩니다.

### 🔖 추가로 Object 도 바로 위에 있습니다.

```javascript
// 설정 전: const {name, image} = getUser();
const { name, image } = getUser();
```

`Settings > Editor > Code Style > Javascript > Spaces > Object literal braces` 체크 하면 됩니다. 👍

## preserve whitespace in self closing tag

### 관련 링크: [Code formatting - preserve whitespace in self closing tags](https://intellij-support.jetbrains.com/hc/en-us/community/posts/207060005-Code-formatting-preserve-whitespace-in-self-closing-tags)

```html
<!-- 설정 전: <input type="text"/> -->
<input type="text" />
```

설정 전을 보시면 `/>` 부분에 띄워쓰기가 되지 않는 걸로 되어 있습니다.
이 부분을 위한 설정은!! `in empty tag` 입니다.

`Settings > Code Style > HTML > Other > Spaces > in empty tag` 체크하면 됩니다!
