---
layout: post
title: 이메일 인증 구현 (Spring boot)
description: >
  회원 가입 시, 인증 메일을 전송하고 해당 메일로 인증까지 하는 기능 구현기 
sitemap: false
---

기존 사이드 프로젝트인 회원 관리 시스템에 이메일 인증 관리를 위해서 기능 추가를 해보았습니다. 🤔

## GMAIL 설정
### 1. (🙅‍♂️ 비추천) 보안 수준이 낮은 앱의 엑세스 허용하기
- [보안 수준이 낮은 앱의 엑세스](https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4P4ZD9vqj5HX72RUdPEI2TreSAFtRkz6nxoFRZnFAhZwbKjDu4mS_7Y-Ob5_D7LR_WPJDtJTvcEEoWeOb-WZU1Nh28R1Q) 해당 링크를 통해서 앱 허용을 해주셔야 합니다.
  <br>
  ![image](https://user-images.githubusercontent.com/93169519/196298743-2aa030be-fb74-4644-b26b-77e1faa3106a.png)
- 해당 설정을 사용하지 않으면 오류가 발생합니다. 😓
  <br>
  (→ Authentication failed; … Username and Password not accepted.)
  - 🤔 의문이 새롭게 계정을 생성해서 같은 곳으로 들어가면...
    <br>
    ![image](https://user-images.githubusercontent.com/93169519/196298756-9da98946-540f-4670-ab73-9999dbaa2f7b.png)
    <br>
    사용할 수 없다고 나오게 됩니다. ~~😓2차 인증을 해야 되는건가? 싶네요~~
    <br>
    → 2차 인증을 해도 안됨
    <br>
    ![image](https://user-images.githubusercontent.com/93169519/196298768-1316cc95-2799-4904-9fa5-66b21165d68b.png)
    <br>
    [👉 [보안 수준이 낮은 앱 및 Google 계정]](https://support.google.com/accounts/answer/6010255?hl=ko&visit_id=637950495068647686-2065665416&p=less-secure-apps&rd=1)
    <br>
    결국 로그인을 해서 메일을 보내는 구조다 보니.. 보안을 위해서 지원을 하지 않는 것 같습니다. 😱

### 2. (✨ 추천) 2차 인증 설정
1. 계정 관리 → 보안 → 2단계 인증을 해줍니다.
  ![image](https://user-images.githubusercontent.com/93169519/196298107-973d8f82-8246-4f9b-985f-744e8514472d.png)
2. 인증이 완료 되었다면, 같은 곳의 앱 비밀번호로 들어갑니다.
  ![image](https://user-images.githubusercontent.com/93169519/196297978-26c75529-98a8-4607-b089-701fcc1240fb.png)
3. 앱 비밀번호를 생성해줍니다.
  - **앱 선택** → 기타
  - **기기 선택** → 기타 (맞춤 이름)
  - **앱 이름 설정** 후 **생성 버튼을 클릭**합니다.
    <br>
    그럼 이렇게 앱 비밀번호가 생성 됩니다. 😁
    <br>
    ![image](https://user-images.githubusercontent.com/93169519/196297988-b1d17a22-fcd7-4ac7-84bf-9f6a60684a31.png)

**이제 생성된 기기용 앱 비밀번호를 사용하면 됩니다.**

## 인증 메일 전송 구현

일단 회원가입 시, 해당 이메일 인증을 위한 메일 전송을 구현 했습니다.

### 메일 내용 HTML 작성

먼저 인증 메일을 그저 텍스트로 보내는 것이 아니라 **보기 좋게 디자인된 형태로 보내기 위해** 먼저 HTML을 작성 했습니다. 
```html
<div style="background-color: #f8f9f9; padding: 2.5em">
  <h1><span style="color: #819ff7">이메일 인증</span><br />링크를 안내드립니다.</h1>
  <div style="margin-top: 3em">
    <p style="margin-bottom: 0">아래의 <b>인증하기</b> 버튼을 클릭하면</p>
    <p style="margin-top: 0.3em">이메일 인증이 완료 됩니다.</p>
  </div>
  <div style="display: flex; justify-content: center; margin-top: 3em">
    <a href="#" style="position: relative; width: 15%; background: #819ff7; border: none; border-radius: 1.5em; padding: 0.9em; color: white; font-size: 1.1em; text-align: center; text-decoration: none; cursor: pointer;">인증하기</a>
  </div>
</div>
```
여기서 중요한게 속성 값을 '(작은 따옴표)로 사용하면 안된다는 점입니다. 😓
<br>
먼저 이것을 스프링 프로젝트로 옮겨 오면 아래와 같은 형태가 되는데요.
```java
private String getEmailHtmlContent(String url) {
    return MessageFormat.format(
        new StringBuilder()
            .append("<div style=\"background-color: #f8f9f9; padding: 2.5em\">")
            .append("  <h1><span style=\"color: #819ff7\">이메일 인증</span><br />링크를 안내드립니다.</h1>")
            .append("  <div style=\"margin-top: 3em\">")
            .append("    <p style=\"margin-bottom: 0\">아래의 <b>인증하기</b> 버튼을 클릭하면</p>")
            .append("    <p style=\"margin-top: 0.3em\">이메일 인증이 완료 됩니다.</p>")
            .append("  </div>")
            .append("  <div style=\"display: flex; justify-content: center; margin-top: 3em\">")
            .append("    <a href=\"{0}\" style=\"position: relative; width: 15%; background: #819ff7; border: none; border-radius: 1.5em; padding: 0.9em; color: white; font-size: 1.1em; text-align: center; text-decoration: none; cursor: pointer;\">인증하기</a>")
            .append("  </div>")
            .append("</div>")
            .toString()
        , url);
}
```
처음에는 속성 값을 '(작은 따옴표)로 감싸는 형태로 사용했습니다.
<br>
이유는 특수문자을 하기 위해 \" 형태로 사용하는 것보다 확실히 구분되어 보기가 더 좋다고 생각이 들어서 였는데요.
<br>
문제는 '(작은 따옴표)를 사용하게 되면 해당 속성 값 자체가 제외된 상태로 전송이 됩니다. 🧐 
<br>
(CSS가 모두 제외된 상태로 HTML 태그만 전송 됩니다.)
<br>
그래서 이 부분만 유의하면 문제 없이 적용이 됩니다. **🪄 속성 값은 꼭 \\"로 감싸야 합니다!**

### 전송 기능 구현


![image](https://user-images.githubusercontent.com/93169519/195991229-4ee3c50b-ca4e-451a-939a-0203e423d550.png)

## 이메일 인증 구현


## 후기
코드 상으로 부족한 부분이 많아서 참 고민이 많아 졌습니다. 😓
<br>


## 🔖 참고 사이트
- [[Spring] 이메일 인증 구현](https://gilssang97.tistory.com/60)