---
title: "HTTP 상태 코드 정리"
description: "HTTP 상태 코드 정리하기"
date: "2023-03-18"
category: "server"
---

자주 쓰이는 HTTP 상태 코드 외우기...

# HTTP 상태 코드

상태 코드는 클라이언트와 서버 간의 통신상태를 나타내는 일련의 표준화된 코드 모음 입니다.
<br>
클라이언트는 해당 요청에 대한 성공, 실패, 잘못된 요청 등에 대한 여부도 상태코드를 통해 알 수 있습니다.

응답은 크게 5개의 그룹으로 나누어집니다.
<br>
1xx : 정보 응답 / 2xx : 성공 응답 / 3xx : 리다이렉트 / 4xx : 클라이언트 요청 오류 / 5xx : 서버 오류

## 1xx : Information

- 101 Continue : 진행 중임을 의미하는 응답 코드.
  <br> 현재까지의 진행상태에 문제가 없고, 클라이언트가 계속 요청하거나 이미 요청 완료한 경우 무시해도 됨을 알려줌
- 102 Processing : 서버가 요청을 수신하였으며 이를 처리하고 있지만, 아직 제대로된 응답을 알려줄 수 없음을 알려줌

## 2xx : Successful

- 200 OK : 요청을 정상적으로 처리함
- 201 Created : 성공적으로 생성에 대한 요청을 받고 그 결과로 서버가 새 리소스 작성(POST, PUT)
- 204 No Content : 요청을 성공적으로 처리했지만 제공할 컨텐츠는 없음

## 3xx : Redirection

- 301 Moved Permanently : 요청한 리소스의 URI가 변경되었음을 의미 (변경된 URI에 대한 정보와 함께 응답)
- 302 Found : 요청한 리소스의 URI가 일시적으로 변경되었음을 의미
  <br> (새롭게 변경된 URI는 나중에 만들어 질 수 있음! → 고로 클라이언트는 향후 요청도 반드시 동일한 URI로 해야됨)
- 303 See Other : 클라이언트가 요청한 리소스를 다른 URI에서 얻어야 할 때,
  <br> 서버가 클라이언트에게 직접 보내는 응답
- 307 Temporary Redirect : 클라이언트가 요청한 리소스가 다른 URI에 있으며,
  <br> 이전 요청과 동일한 메소드를 사용하여 요청해야 할 때,
  <br> 서버가 클라이언트에 이 응답을 직접 보냄
  <br> (302 응답 코드와 동일한 의미를 가지지만, 사용된 HTTP 메소드를 변경하지 말아야됨)
  <br> (첫번째가 POST 면! 두번째도 POST!!!)
- 308 Permanent Redirect : 리소스가 이제 HTTP 응답 헤더의 `Location:`에 명시된 다른 URL에 위치하고 있음을 의미.
  <br> (301과 동일한 의미를 가지나 HTTP 메소드도 변경하면 안됨)

## 4xx : Client Error

- 400 Bad Request : 잘못된 문법이나 값을 요청을 보내 서버가 이해할 수 없음
- 401 Unauthorized : 클라이언트가 인증되지 않았거나, 유효한 인증 정보가 부족하여 요청이 거부됨
- 403 Forbidden : 클라이언트가 요청한 컨텐츠에 접근할 권한이 없음
- 404 Not Found : 클라이언트가 요청한 URI를 찾을 수 없음
- 405 Method Not Allowed : 클라이언트가 보낸 메소드가 해당 URI에서 지원하지 않음
- 409 Conflict : 클라이언트의 요청이 서버의 상태와 충돌이 발생

## 5xx : Server Error

- 500 Internal Server Error : 서버 문제로 응답 불가능
- 502 Bad Gateway : 서버 위의 서버에서 오류 발생 (proxy 혹은 gateway 등에서 응답)
- 503 Service Unavailable : 현재 서버는 일시적으로 사용이 불가함 (유지보수로 인한 중단, 서버 과부화 등)

## 🔖 참고 링크

- [MDN - HTTP 상태 코드](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [MDN - HTTP 상태 코드(한국어)](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)
