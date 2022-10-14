---
layout: post
title: 프로젝트 Route53 + HTTPS 적용기
description: >
  https 상태에서 JWT Refresh 토큰 쿠키(Http-Only) 발행 테스트를 위한 적용기 
sitemap: false
---

거의 하루를 삽질로 날린 Route53 + HTTPS 적용기 입니다. 😓
<br>
알고 보면 정말 간단한 것인데, 사소한 설정 `MISS`로 인해서 삽질에 삽질을 거듭하게 됬습니다.
<br>
설정하는 부분들에 대해서는 확실히 이해하고 해야 된다라는 걸 다시금 깨닫게 되었습니다.

## Route 53 도메인 구입 및 설정

### 도메인 구입에서 인증서 발급까지
1. AWS - Route 53 접속
2. 도메인 등록 > [도메인 등록] 버튼 클릭
3. 도메인 이름을 선택 후 결재를 진행 합니다.
4. AWS - Certificate Manager 접속
5. 인증서 요청하기
   - 요청 버튼 클릭
   - 도메인 이름 입력 : *.도메인 (ex: *.never.com) 
     <br>
     🪄 이 부분이 중요한데, 도메인 하나로만 쓰는것이 아니라
     <br>
     www(FRONT 용), api(BACKEND 용) 등을 함께 사용하기 위해서 '*'를 추가하는 것이 좋습니다.
   - 나머지는 따로 입력할 필요 없이 [요청] 버튼을 클릭합니다.
     <br>
     (검증 방법 선택은 DNS 검증)
6. Route 53에서 레코드 생성
   - 🪄 인증서 요청만 하게 되면 상태가 '검증 대기중'로 나와 있습니다.
     <br>
     이게 가만히 있는다고 검증이 되는 것이 아니라 작업을 더 해줘야 합니다! 😓
     <br>
     **인증서 목록에서 발급한 인증서 ID(a 태그)를 클릭합니다.**
   - 그리고 도메인 란에서 [Route 53에서 레코드 생성] 버튼을 클릭하면 바로 상태가 발급됨 으로 변경됩니다. 👍
     <br>
     (AWS 에서 구매한 도메인이 아닌 경우는 다를지도 모르겠네요. 🤔)
7. 끗.

### Route 53 설정하기
필요한 도메인은 2개가 있었습니다.
- [FRONT] 사이트를 위한 도메인 : www.never.com
- [BACKEND] API 요청을 위한 도메인 : api.never.com


### [BACKEND 도메인 설정] 로드 밸런싱
AWS - EC2 - 로드 밸런싱 탭에서 진행을 하면 됩니다. 🎯
<br>
로드밸런싱 탭에서 먼저 대상 그룹(Target groups)을 생성해야 합니다.
<br>
- [Create target group] 버튼을 클릭합니다.
- Target type은 Instances(기본 설정) 설정 그대로 둡니다.
- Target group name(ex: midas-target-group)을 입력합니다.
- Protocol version : HTTP1
  - 🪄 Health checks 설정합니다.
  - 이 부분이 서버에서 health check 를 만들어서 해당 URL 등록해줍니다.
    ```java
    @RestController
      public class HealthCheckRestController {
  
        @GetMapping("/health_check")
        public String check() {
            return LocalDateTime.now().toString();
        }
    }
    ```
    저는 위와 같이 프로젝트에 간단한 Health check 컨트롤러를 생성후에 **입력란에 `/health_check`를 등록 했습니다.**
  - [Next] 버튼을 클릭합니다.
  - 이제 실행중인 EC2 를 선택하고 포트를 입력하는 란이 나오는데요.
    <br>
    **🪄 저는 스프링 부트 프로젝트 였기 때문에, 8080을 입력했습니다.**
    <br>
    그리고 [Include as pending below] 버튼을 클릭하여 대상으로 올립니다.
  - 하단의 [Create target group] 버튼을 클릭합니다.
  - 끗.

이렇게 대상 그룹을 생성하고 난 다음에 Health status 확인을 해줍니다.
![image](https://user-images.githubusercontent.com/93169519/195840488-83df1580-7610-4873-b0e8-0097b33b01c1.png)
healthy 상태라면 만사 Okay! 😁
<br>
(healthy가 아닌 다른 상태라면 문제가 있는 겁니다. 😓)

---
**이제는 로드밸런서를 등록하러 가봅시다!!**
- AWS - 로드 밸런싱 - 로드밸런서 > [로드 밸런서 생성] 버튼을 클릭합니다.
- Application Load Balancer(HTTPS) 의 [Create] 버튼을 클릭합니다.
- Load balancer name : 이름 등록 (ex: midas-ec2-alb)
- Mappings - 존을 선택해줍니다. (저는 a, b, c, d 모두 선택했습니다.)
- Security groups - ec2에 등록한 보안 그룹을 선택해서 추가해줍니다.
- Listeners and routing 등록
  - HTTP, Default action 에서 이제 만들어준 대상 그룹을 선택해주면 됩니다. 
  - [Add listener] 버튼을 클릭해서 HTTPS도 등록을 해줍니다. 
- [Create load balancer] 버튼을 클릭하여 생성주면 됩니다.
- 끗!

### [FRONT 도메인 설정] Vercel
처음에는 Netlify로 사용을 하려고 했었는데, DNS 등록 후에 확인하는 과정에서 시간이 소요되는 부분 때문에 다른걸 찾다가 Vercel을 사용하게 되었습니다.
<br>
**Vercel을 사용해보니 Netlify 보다 훨씬 간단하게 등록을 할 수가 있었습니다. 👍**
<br>
- 가입 후에 프로젝트를 등록하고 나서 해당 프로젝트의 [View Domains] 버튼을 클릭 합니다.
- 도메인 입력란에 도메인(www.never.com)을 입력하고 [Add] 버튼을 클릭하여 도메인을 추가합니다.
- 이제 Route 53에 추가하면 됩니다. 😁
  - CNAME 먼저 등록을 해보면 아래의 Value 부분(cname.vercel-dns.com)을 Route 53에 등록합니다.
    ![image](https://user-images.githubusercontent.com/93169519/195836287-8cb5d549-064a-4e37-8e76-57a316a92ee3.png)
    Route 53에서 레코드 생성을 해서 등록해줍니다.
    ![image](https://user-images.githubusercontent.com/93169519/195836894-c94cba1a-c579-4dec-ae72-52cc986beb65.png)
    위와 같이 입력후에 등록해주면 됩니다.
  - Nameservers 탭 DNS URL을 Route 53 - NS에 등록해줍니다.
    ![image](https://user-images.githubusercontent.com/93169519/195836302-5e1dc0ad-e771-4b87-8ba9-fe82ee57dc63.png)
    Route 53에서 기존에 있는 NS 선택 후 레코드 편집을 클릭하여 위의 NS를 추가해서 등록해주면 끝입니다.
    ![image](https://user-images.githubusercontent.com/93169519/195837769-2740afd3-dc71-40d6-8dfe-250e87528404.png)
    위와 같이 등록되어 있으면 됩니다.
- 끗!

> 너무 간단해서 진즉에 사용 할것을... 싶었습니다. 😭

## 후기
설정을 하고 나서 프론트 + 백엔드 둘다 HTTPS로 쿠키 받는 것을 확인할 수 있었습니다.
![image](https://user-images.githubusercontent.com/93169519/195843661-e4789459-9670-4d42-851d-f35fabe34ffe.png)

작성하고 보니 굉장히 간단하다는 생각과 함께 이걸 왜 헤맨거지... 현타가 오네요. 허헣.. 🫠
<br>
하면서도 HTTPS, DNS, Nameserver 개념에 대해서 다시 정리를 해봐야겠다는 생각이 드네요.
<br>
그리고 [참고 사이트](https://inpa.tistory.com/entry/AWS-%F0%9F%93%9A-Route-53-%EA%B0%9C%EB%85%90-%EC%9B%90%EB%A6%AC-%EC%82%AC%EC%9A%A9-%EC%84%B8%ED%8C%85-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC)를 보면서 도메인에 연결하는 부분에서 요금이 청구되는 부분이 있다는 걸 알게 되서, 요금 청구 부분도 체크를 계속해야 되는 부분인 것 같습니다. 

## 🔖 참고 사이트
- [[AWS] 📚 Route53 개념 원리 & 사용 세팅 💯 정리](https://inpa.tistory.com/entry/AWS-%F0%9F%93%9A-Route-53-%EA%B0%9C%EB%85%90-%EC%9B%90%EB%A6%AC-%EC%82%AC%EC%9A%A9-%EC%84%B8%ED%8C%85-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC)