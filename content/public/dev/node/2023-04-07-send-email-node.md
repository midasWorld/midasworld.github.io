---
parentCategory: "dev"
title: "Nodemailer 활용한 이메일 전송 구현(with Google)"
description: "구글 설정 및 Node 이메일 전송 구현"
date: "2023-04-07"
category: "node"
---

블로그의 `Contact` 페이지에서 블로그 주인에게 이메일 보내는 기능 구현을 위해!
<br>
`Nodemailer` 활용해 이메일 전송을 구현해보았습니다.

[Nodemailer 공식 문서](https://nodemailer.com/about/)에서 잘 설명되어 있어 참고하면 간단하게 구현이 가능합니다!

### ✅ 작업 순서!
1. 구글 설정(앱 비밀번호 생성)!
2. 코드 구현

## ⚙️ 1. 구글 설정(앱 비밀번호 생성)!

이전 글인 [Spring(Java) 이메일 인증 구현(with Google)](https://midasworld.github.io/spring/2023-04-06-send-email-java/)에서 잘 설명되어 있습니다!

## 💻 2. 코드 구현!

### 1. 의존성 추가!
```shell
npm install nodemailer
```

### 2. `/service/email.ts` 구현
```shell
import nodemailer from "nodemailer";

export type EmailData = {
  from: string;
  subject: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmail({ from, subject, message }: EmailData) {
  return transporter.sendMail({
    from,
    to: process.env.EMAIL_USER,
    subject,
    html: `
    <div style="background-color: #f8f9f9; padding: 2.5em">
      <h1>${subject}</h1>
      <p>${message}</p>
      <h3>from: </span>${from}</h3>
    </div>
    `,
  });
}
```

`nodemailer` 관련된 코드를 모아놓고 관리하기 위해 위와 같이 만들어줬습니다.

> **그래서 이제 ContactForm 컴포넌트에서 sendEmail 메서드만 사용하면 될줄 알았는데...?** 🤔

### 🚨 오류 발생

```typescript
"use client";

// ...

export default async function ContactForm() {
  const [form, setForm] = useState<Form>(DEFAULT_DATA);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendEmail(form) // ✨ 이메일 전송!
      .then(() => {/* 성공 배너 활성화 */})
      .catch((err) => {/* 오류 배너 활성화 */});
  };

  return (
    <form onSubmit={onSubmit}>
      //...
    </form>
  );
}
```

처음에는 /service/email.ts - sendEmail() 메서드를 위의 `ContactForm 컴포넌트`에서 바로 사용 했습니다.
<br>
하지만 아래와 같은 오류와 함께 다른 오류 외에도 줄줄이 발생해버렸습니다. 😳
> Module not found: Can't resolve 'fs' ....

해당 건에 대해 찾다 찾다가... 🫠
<br>
[Module not found: Can't resolve 'fs' #7755](https://github.com/vercel/next.js/issues/7755) → 해당 사이트에서 원인을 알게 되었습니다.

`ContactForm`는 클라이언트 컴포넌트이기 때문에 `fs` 사용할 수가 없는 것이었습니다. ❗️
<br>
(`fs` 관련된 것은 서버에 있는 동안만 사용 가능하여 클라이언트 측에서 랜더링되는 동안에는 사용할 수 없습니다.)

그래서 `fetch`를 사용해서 서버 API로 전송 후에 서버측에서 사용되도록 하였습니다.
```text
[Client] ContactForm - 이메일 전송 버튼 클릭!
 ↓
[Server] POST /api/contact 라우터에서 이메일 전송 처리 및 반환
```

### ✨ 오류 해결을 위한 ContactForm 컴포넌트 수정

```typescript
"use client";

// ...

export default async function ContactForm() {
  const [form, setForm] = useState<Form>(DEFAULT_DATA);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ✨ 이메일 전송!
    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "applicatioin/json",
      },
    })
    .then(() => {/* 성공 배너 활성화 */})
    .catch((err) => {/* 오류 배너 활성화 */});
  };

  return (
    <form onSubmit={onSubmit}>
      //...
    </form>
  );
}
```

먼저 `ContactForm 컴포넌트`에서 `fetch`를 이용해 서버측으로 요청을 하고,
<br>
아래와 같이 서버측 라우터를 생성하여 여기서 이메일이 전송될 수 있도록 하였습니다.

```typescript
// ...

export async function POST(request: Request) {
  const body = await request.json();
  // 유효성 검사 하기...
  
  return sendEmail(body) // ✨ 여기서 전송하기!
    .then(() => {/* 성공 정보 반환 */})
    .catch((err) => {/* 오류 정보 반환 */});
}
```

### 최종 확인!

![image](https://user-images.githubusercontent.com/93169519/230944591-5a1970cf-d5cc-40b8-b74d-c85d15ba8504.png)

> 메시지 입력 후 전송을 하게 되면?? 🤔

![image](https://user-images.githubusercontent.com/93169519/230943260-0d20c871-fe57-432f-9765-4b8772478adc.png)

위와 같이 잘 전달 된것을 확인할 수 있었습니다. 😁