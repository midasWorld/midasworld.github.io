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

HTTP(HyperText Transfer Protocol)는 데이터를 주고 받기 위한 프로토콜이며, 서버/클라이언트 모델을 따릅니다.
<br>
HTTP는 상태 정보를 저장하지 않는 **Stateless** 특징과 클라이언트 요청에 맞는 응답을 보낸 후 연결을 끊는 **Connectionless** 특징을 가지고 있습니다.

이전 통신 정보를 모르기 때문에 매번 인증을 해줘야 하는데...
<br>
이를 해결하기 위해 쿠키(Cookie)나 세션(Session)을 사용해서 데이터를 처리합니다.

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

IP 주소는 각 기기들을 식별하기 위한 논리적 주소입니다.
<br>
주소의 길이는 IPv4 기준으로 각각 8bit 씩 총 32bit 를 이룹니다.

|             | IPv4                                        | IPv6                             |
| ----------- | ------------------------------------------- | -------------------------------- |
| 주소 길이   | 32bit                                       | 128bit                           |
| 표기 방법   | 10진수<br>ex) 162.168.1.1                   | 16진수<br>ex)cccc:cccc:cccc:cccc |
| 주소 개수   | 약 43억 개<br>범위: 0.0.0.0~255.255.255.255 | 무한대에 가까움                  |
| 서비스 품질 | 제한적 품질                                 | 확장된 품질                      |
| 보안 기능   | IPSec 별도 설치                             | 기본 제공                        |

IPv4 의 43억 개가 많아 보이지만, 인터넷 보급이 확산되며 고갈되어 IPv6 가 나오게 되었습니다.

IP 주소는 A, B, C, D, E 총 5개의 클래스로 나눌 수 있습니다.
<br>
클래스는 하나의 IP 주소에서 네트워크 영역과 호스트 영역으로 나누는 방법에 따라 다릅니다.

![image](https://github.com/midasWorld/blog/assets/93169519/7f17c927-5f21-44f5-8016-584d1ba2d4da)

[[한국인터넷정보센터](https://xn--3e0bx5euxnjje69i70af08bea817g.xn--3e0b707e/jsp/resources/ipv4Info.jsp) 출처]

주소의 클래스는 A, B, C 가 일반적으로 사용되고,
<br>
D, E는 각각 멀티캐스트용, 연구용으로 사용됩니다.

## HTTPS

- HTTPS (HyperText Transfer Protocol Secure)
- HTTP with security features.
- 주소표시줄 왼쪽에 있는 자물쇠 마크(🔒)로 적용되고 있는지 유무를 확인할 수 있습니다.
- 웹 서버로 이동하기 전에 패킷을 암호화 됩니다. → 🔒!

## HTTP vs HTTPS

HTTP의 보안 취약점을 해결하기 위해 HTTP에 암호화가 추가된 프로토콜이 HTTPS 입니다.
<br>
**HTTP에 SSL을 더해 보안을 강화한 것이 HTTPS 입니다.**

> ※ SSL(Secure Socket Layer) : 인터넷을 통해 전달되는 정보를 보호하기 위해 개발된 통신 규약

HTTP는 원래 TCP와 직접 통신 했지만, HTTPS에서 HTTP는 SSL과 통신하고 SSL이 TCP와 통신함으로써,
<br>
암호화와 증명서, 안정성 보호를 이용할 있게 됩니다.

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