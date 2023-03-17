---
layout: post
title: Restful API 란?
description: >
  Restful API 에 대해 알아보자!
sitemap: false
---


# REST API 란 무엇인가?

## 🗣️ 면접 질문

### Restful API에 대해 설명해주세요.

Restful API는 HTTP 통신을 Rest 설계 규칙을 잘 지켜서 개발한 API를 말합니다.
<br>
(~ful: 이 가득한, 의 셩격을 지닌)

Rest 설계 규칙은 URI는 정보의 자원만 표현해야 하고, 자원의 상태와 행위는 HTTP Method 명시해야 합니다.

## 🌐 REST(REpresentational State Transfer) 란?

### REST의 개념

자원을 이름(자원의 표현)으로 구분하여 해당 자원의 상태(정보)를 주고 받는 모든 것을 의미합니다.
즉 자원(resource)의 표현(representation)에 의한 상태전달을 뜻합니다.

- 자원: 해당 소프트웨어가 관리하는 모든 것(문서, 그림, 데이터 등)
- 표현: 그 자원을 표현하기 위한 이름 (회원 정보가 필요한 자원이면, 'users'를 자원의 표현으로 정함)
- 상태 전달: 데이터가 요청되는 시점에 자원의 상태를 전달합니다. (주로 JSON, XML 등을 통해 데이터를 주고 받음)

웹 서비스를 구성하는 아키텍처 스타일 중 하나 입니다.
HTTP 프로토콜을 기반으로 하며, 웹의 기존 인프라를 최대한 활용하면서 분산 시스템을 구축하는데 적합한 아키텍처 스타일 입니다.

### REST의 구성

- 자원(Resource) - URI
  - 모든 자원에 고유한 ID가 존재하고, 이 자원은 Server에 존재합니다.
  - 자원을 구별하는 ID는 '/group/:group_id'와 같은 HTTP URI 입니다.
- 행위(Verb) - HTTP Method
  - HTTP 프로토콜은 GET, POST, PUT, DELETE 와 같은 메소드를 제공합니다.
- 표현(Representation)
  - Client가 자원을 요청하면 서버는 해당 자원의 상태를 응답합니다.
  - 이 때 응답 결과는 JSON, XML, HTML, 이미지 등 다양한 형식으로 표현됩니다.

### REST의 특징

- Server-Client (서버-클라이언트 구조)
  - Client는 사용자 인증이나 context(세션, 로그인 정보) 등을 관리하고 책임진다.
  - Server는 각각의 요청을 완전히 별개의 것으로 인식하고 처리합니다.
    - 각 API 서버는 Client 요청을 단순 처리합니다.
    - 즉, 이전 요청이 다음 요청의 처리에 연관되어서는 안됩니다. (DB에 의해 바뀌는 것은 제외)
    - Server 처리 방식에 일관성을 부여하기 때문에 서비스의 자유도가 높아집니다.
- Stateless (무상태)
  - HTTP 프로토콜과 같이 상태를 갖지 않습니다.
- Cacheable (캐시 처리 가능)
  - HTTP 프로토콜을 그대로 사용하므로 웹에서 사용하는 기존 인프라를 그대로 활용할 수 있습니다.
    - 즉, HTTP가 가진 가장 강력한 특징 중 하나인 캐싱 기능을 적용할 수 있습니다.
    - HTTP 프로토콜 표준에서 사용하는 Last-Modified Tag 또는 E-Tag를 이용해 캐시를 구현합니다.
  - 대량의 요청을 효율적으로 처리할 수 있습니다.
- Layered System (계층 구조)
  - Client는 REST API Server만 호출합니다.
  - REST Server는 다중 계층으로 구성될 수 있습니다.
    - 보안, 로드 밸런싱, 암호화 등을 위한 계층을 추가하여 구조를 변경할 수 있습니다.
    - Proxy, Gateway와 같은 네트워크 기반의 중간 매체를 사용할 수 있습니다.
    - 하지만 Client는 Server와 직접 통신하는지, 중간 서버와 통신하는 지 알 수 없습니다.
- Code on demand (Optional)
- ⭐️ Uniform interface
  - URI로 지정한 Resource에 대한 요청을 통일하고 한정된 인터페이스로 수행되며 이를 정의하는 것을 의미합니다.
  - HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능하며, Loosely Coupling(느슨한 결함) 형태를 갖습니다.
    - 즉, 특정 언어나 기술에 종속되지 않음

## 🌐 REST API

- REST 특징을 기반으로 서비스 API를 구현한 것!
- 최근 OpenAPI, 마이크로 서비스 등을 제공하는 기업 대부분은 REST API를 제공합니다.

- 보통의 Rest APIs 기업 사례는 **[유튜브](https://developers.google.com/youtube/v3/docs/videos/list)**
- 진정한 Rest APIs 기업 사례는 **[깃허브](https://developer.github.com/v3/)**
  <br>
  (해당 API의 상태와 연관된 사용 가능한 모든 URL 정보를 포함되어 제공합니다.)

### REST API 특정

REST API의 가장 큰 특징은 각 요청이 어떤 동작이나 정보를 위한 것인지 그 요청 모습 자체로 추론이 가능한 것입니다.

### REST API 디자인 가이드

1. URI는 정보의 자원을 표현해야 합니다.
2. 자원에 대한 행위는 HTTP Method(GET, POST, PUT, PATCH, DELETE)로 표현한다.
   <br>
   (행위(Method)는 URI에 포함하지 않는다.)

### REST API 설계 규칙

1. URI는 명사를 사용한다!
   <br> 동사 사용 금지!
  - `/getAll`
  - `/updateUser`
  - `/deleteUser`
  - ...
2. 슬래시(/)로 계층 관계를 표현한다.
3. URI 마지막 문자로 슬래시(/)를 포함하지 않는다.
4. 밑줄(\_)을 사용하지 않고, 하이픈(-)을 사용한다.
5. URI는 소문자로만 구성한다.
6. HTTP 응답 상태 코드 사용
7. 파일 확장자는 URI에 포함하지 않는다.
   <br> ex) http://www.example.com/file/image.png ❌

## 🔖 참고 사이트

- [REST란? REST API 와 RESTful API의 차이점](https://dev-coco.tistory.com/97)
- [REST란? REST API란? RESTful이란?](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)