---
parentCategory: "dev"
title: "Spring(Java) 이메일 인증 구현(with Google)"
description: "구글 설정 및 Spring 이메일 인증 구현"
date: "2023-04-06"
category: "spring"
---

`Nodemailer`를 사용해서 이메일 보내기를 구현하려고 하다가... 🤔
<br>
작년에 `Notion`에 작성해 놓은 글과 정보가 겹쳐서 먼저 올려보았습니다. 

# 📥 간단 이메일 인증

## 1. 인증 정보 세팅

### 🙅‍♂️ a. (비추천) 보안 수준이 낮은 앱의 엑세스 허용하기
[보안 수준이 낮은 앱의 엑세스](https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4OTsfFueMecNzy1xPMqrw0Abe2okvsvyYh5mjoe9tA-Lant3IYRwVnuYglPe24k7TGiwugxh_WYmJRCkaOsPDvG3fSxyw) 해당 링크를 통해서 앱 허용을 해주셔야 합니다.
<br>
<img width=500 src="https://user-images.githubusercontent.com/93169519/230929394-6f81d6af-0e14-47c9-ba9e-767bc0d934ba.png" />

해당 설정을 사용하지 않으면 아래와 같이 오류가 발생 됩니다. 😓
> Authentication failed; … Username and Password not accepted.

---
>🤔 의문이 새롭게 계정을 생성해서 같은 곳으로 들어가면…

<img width=500 src="https://user-images.githubusercontent.com/93169519/230929420-8e80c839-5fa5-4b43-a79a-e8b37aef6f0c.png" />

사용할 수 없다고 나오게 됩니다. 😓 ~~인증을 해야 되는건가? 싶네요.~~ → 2차 인증을 해도 안됨

<img width=500 src="https://user-images.githubusercontent.com/93169519/230931291-086e7dba-e9e7-458a-adce-def1c42003ae.png" />

[보안 수준이 낮은 앱 및 Google 계정 링크](https://support.google.com/accounts/answer/6010255?hl=ko&visit_id=637950495068647686-2065665416&p=less-secure-apps&rd=1)
<br>
결국 로그인을 해서 메일을 보내는 구조다 보니.. 보안을 위해서 지원을 하지 않는 것 같습니다. 😱


### 👍 b. (추천) 2차 인증 설정
계정 관리 → 보안 → 2단계 인증을 해줍니다.
<br>
<img width=500 src="https://user-images.githubusercontent.com/93169519/230929443-6a6154c5-44bd-4f71-80d1-e3a85e92bea0.png" />

인증이 완료 되었다면, 같은 곳의 앱 비밀번호로 들어갑니다.
<br>
<img width=500 src="https://user-images.githubusercontent.com/93169519/230929461-2a6ba35c-81fd-4959-83fb-2fa1d687c482.png" />

> 이제 앱 비밀번호를 생성해줍니다.
- 앱 선택 → 기타
- **기기 선택** → 기타(맞춤 이름)
- **앱 이름 설정** 후 **생성 버튼을 클릭**합니다.
<br>
<img width=500 src="https://user-images.githubusercontent.com/93169519/230929472-f658a034-19ae-491c-a660-d07b89feeabc.png" />

🐶 이제 생성된 기기용 앱 비밀번호를 사용하면 됩니다.

## 2. Spring(Java) 코드 작성
### 라이브러리 추가
```xml
implementation 'org.springframework.boot:spring-boot-starter-mail'
```
- **MailSender 인터페이스**
  - 간단한 이메일을 보내기 위한 기본 기능을 제공하는 최상위 클래스

- **JavaMailSender 인터페이스**
  - MailSender의 하위 인터페이스
  - MIME 메시지를 지원하며 대부분의 MimeMessge를 생성을 위해 MimeMessageHelper 클래스와 함께 사용
  - 이 인터페이스와 함께 MimeMessagePreparator 메커니즘을 사용하는 것이 좋다.
- **JavaMailSenderImpl 클래스**
  - JavaMailSenderMimeMessage 및 SimpleMailMessage 인터페이스 의 구현을 제공합니다.

- **SimpleMailMessage 클래스**
  - 보낸 사람, 받는 사람, 참조, 제목 및 텍스트 필드를 포함하는 간단한 메일 메시지를 만드는 데 사용

- **MimeMessagePreparator 인터페이스**
  - MIME 메시지 준비를 위한 콜백 인터페이스를 제공합니다.

- **MimeMessageHelper 클래스**
  - MIME 메시지 생성을 위한 도우미 클래스입니다.
  - HTML 레이아웃의 이미지, 일반적인 메일 첨부 파일 및 텍스트 콘텐츠에 대한
    지원을 제공합니다.

### 설정 파일 작성
```yaml
spring:
  application:
    name: spring-email
  mail:
    host: smtp.gmail.com
    port: 587
    username: ${SMTP_EMAIL}    
    password: ${SMTP_PASSWORD} # 2차 인증 방법이면 앱 비밀번호!
    properties:
      mail:
        smtp:
          starttls:
            enable: true
            required: true
          auth: true
          connectiontimeout: 5000
          timout: 5000
          writetimeout: 5000
```
- connectiontimeout, timout, writetimeout : 무한 대기 상태를 피하기 위한 시간 설정

### 이메일 서비스 생성 및 사용
1. 이메일 서비스 생성
  <br>
    ```java
    @EnableAsync
    @RequiredArgsConstructor
    @Service
    public class EmailService {
      private final JavaMailSender javaMailSender;
    
      @Async
      public void send(String email, String authToken) {
        SimpleMailMessage smm = new SimpleMailMessage();
        smm.setTo(email);
        smm.setSubject("회원가입 이메일 인증");
        smm.setText("http://localhost:8080/api/users/confirm-email?email=" + email + "&authToken=" + authToken);
    
        javaMailSender.send(smm);
      }
    }
    ```
   - email : 사용되는 이메일을 등록
   - authToken : UUID를 사용
2. 이제 메일을 보내게 되면 다음과 같이 이메일이 발송 됩니다.
  <br>
  <img width=500 src="https://user-images.githubusercontent.com/93169519/230929494-c88a8738-ddd2-454f-8063-876b4df25b1f.png" />
  <br>
   해당 링크로 요청을 통해서 인증 처리를 하게 되는 것이죠.

## 🤔 추후 고려해볼만한 대안
두 번째 방법 - AWS SES(Simple Email Service) 사용
<br>
→ 단점으로는 하나의 관리 대상인 리소스가 더 생긴다는 점이 있습니다.

## 🔖 참고 사이트
- [[Baeldung] Guide to Spring Email](https://www.baeldung.com/spring-email)
- [[SpringBoot] 이메일 전송 ( JavaMailSender, MimeMessageHelper )](https://victorydntmd.tistory.com/342)
- [[괴발개발] REST API - 이메일 인증](https://workshop-6349.tistory.com/entry/%EA%B4%B4%EB%B0%9C%EA%B0%9C%EB%B0%9C-REST-API-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%9D%B8%EC%A6%9D?category=1007169)
- [[서버개발캠프] 인증 서버 - 이메일 인증 회원가입](https://yunb2.tistory.com/4)