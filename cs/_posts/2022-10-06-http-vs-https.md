---
layout: post
title: HTTP vs HTTPS
description: >
  HTTP vs HTTPS 각 개념과 차이점
sitemap: false
---

Web 기초 지식인 HTTP 정리해보기 (면접 대비용)  

## HTTP
- HTTP (HyperText Transfer Protocol)
- 서버-클라이언트 메시지 교환 프로토콜
- HTML 문서 및 이미지와 같은 리소스를 가져오는 방법

**`www.domain.com` 을 입력하게 되면? 🤔**
1. 브라우저 주소 표시줄에 URL 입력
2. 웹사이트 서버로 데이터 전달
  <br>
  **(👾: 해당 데이터는 서버에 도달할 때까지 일반 텍스트로 이동 됨)**
3. 서버는 응답값을 다시 보냄
4. 브라우저는 해당 데이터를 의도한 대로 렌더링하거나 표시하고 **끗!**

> 🚨 HTTP는 암호화 되지 않고 데이터가 전달 되기 때문에 보안에 취약합니다.

- 중간에 패킷을 가로챌 수 있고 수정할 수도 있습니다.
- 민감한 정보(이름, 이메일, 신용카드 정보, 비밀번호)의 경우 유출되거나 악용될 여지가 큽니다.

### 프로토콜 (Protocol)
서로 다른 하드웨어 기기간 데이터 통신 규약
```angular2html
[CLIENT]                   [SERVER]
HTTP (초밥 1인분이요!)         HTTP (금방 가져다 드리죠!)
↕                           ↕
TCP (주인장 들리니?)           TCP (손님 들리니?)
↕                           ↕
IP (주인장 위치는)             IP (손님 위치는?)
↕                           ↕
NETWORK (메시지 이동중...)  ↔  NETWORK (메시지 이동중...)
```
### TCP (Transmission Control Protocol)
- 트랜스포트 계층
- 서버와 클라이언트 사이 통신 연결 제어
- HTTP ←(DATA)→ TCP ↔ IP 
- Byte Stream 제공 :
  <br>
  데이터가 너무 크기 때문에, 패킷으로 쪼개서 제공!
- 3way handshaking

### IP (Internet Protocol)


## HTTPS
- HTTPS (HyperText Transfer Protocol Secure)
- HTTP with security features.
- 주소표시줄 왼쪽에 있는 자물쇠 마크(🔒)로 적용되고 있는지 유무를 확인할 수 있습니다.
- 웹 서버로 이동하기 전에 패킷을 암호화 됩니다. → 🔒!

### SSL (Secure Sockets Layer)

### TLS

## HTTP vs HTTPS

## 🔖 참고 사이트
https://www.youtube.com/watch?v=IjxkKQvn8Bc&t=592s
<br>
https://www.youtube.com/watch?v=AB0VMbvEz7g&pp=ugMICgJrbxABGAE%3D
<br>
https://www.youtube.com/watch?v=H6lpFRpyl14&t=2s
<br>
https://www.youtube.com/watch?v=xcrjamphIp4&t=54s
<br>
https://www.youtube.com/watch?v=WS2n8mkrFaY