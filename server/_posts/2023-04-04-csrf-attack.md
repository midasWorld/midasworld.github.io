---
layout: post
title: CSRF ATTACK 이란?
description: >
  CSRF ATTACK 에 대해 알아보기
sitemap: false
---

CSRF Attack 에 알아보고 대응책도 알아보기

## CSRF Attack 이란?

- Cross-Site Request Forgery 의 약자입니다.
- 로그인된 사용자가 원하지 않는 특정한 액션을 하도록 만드는 공격입니다.
- 보통은 이메일이나 채팅을 통해서 어떤 URL을 보내게 됩니다.

이 공격은 **one-click attack** 또는 **sesion-riding** 이라고 합니다.

예를 들어 공격자들은 복권에 당첨되었다는 링크를 포함한 이메일을 보내고,
<br>그 링크로 들어와 클라이언트의 정보를 입력하고 보내게끔 합니다.
<br>만약에 정보를 등록하고 전송을 하게 되면 해당 정보로 무언가를 하는 방식입니다.
<br>(예를 들면 정보로 은행에 특정 금액을 송금하게끔 만듭니다.)

```html
<html>
  <form id="myForm" action="/transfer" method="POST" target="_blank">
    <h1>당첨을 축하드립니다!</h1>
    <h1>당첨금 수령을 위해 아래 당첨금 받기 버튼을 클릭해주세요!</h1>
    <input type="hidden" name="bankAccount" value="your account" />
    <input type="hidden" name="bankAmount" value="$5000" />
    <button>당첨금 받기!</button>
  </form>
</html>
```

위와 같이 중요 필드는 숨긴채 클라이언트가 클릭하게끔 만듭니다.

## CSRF 대응 방법은?

클라이언트에게 CSRF 토큰을 발급 받도록 하고,
<br>매 요청때마다 CSRF 토큰을 헤더에 포함시켜서 요청하게끔 하는 방법입니다.

> 🔥 CSRF 토큰을 쿠키나 세션으로 사용하면 좋지 않습니다.

쿠키의 경우에는 자동으로 요청시에 전달 되므로 `session-riding`이 진행됩니다.
<br>세션의 경우에는 그만큼 서버에 자원을 사용게 되므로 서버쪽에 부하를 가져옵니다.

그래서 프론트측에서는 사이트에 들어왔을 때 CSRF 토큰을 받아서,
<br>요청 때마다 발급받은 토큰을 헤더에 넣어서 요청되도록 구현을 하면 됩니다.

그리고 백엔드측에서는 일단 CSRF 토큰을 발급받는 API를 만들어 두고,
<br>요청 때마다 헤더를 확인하여 CSRF 헤더가 포함되었는지 확인하고 검증하면 됩니다.

이때 CSRF 헤더의 이름은 \_csrf, X-CSRF... 과 같은 이름을 사용하지만,
<br>통상적으로 모두가 쓰는 이름의 헤더로 하는 것은 좋지 않습니다.
<br>헤더의 이름은 `midas-csrf-token`과 같이 커스텀해서 사용하는 것을 추천합니다.
