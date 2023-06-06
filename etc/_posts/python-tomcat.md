---
layout: post
title: 톰캣 + SSL + 파이썬(플라스크) 실행기
description: >
  톰캣 + SSL + 파이썬(플라스크) 실행 해보기
sitemap: false
---

💻 Mac M1 환경에서 진행 했습니다!

## 파이썬 + 플라스크 설치 및 실행하기

```shell
brew search pyenv

brew install pyenv

pyenv install --list

pyenv install 3.11.2

python3 --version
```

```shell
vi ~/.zshrc
```

```shell
# Python 설정 추가 
alias python="python3"
```

```shell
pip install flask

# 기타 필요한 모듈 설치
pip install requests
pip install bs4

# app.py  실행!
python app.py
```

## 톰캣 설치 및 실행하기


### 🤔 의문의 에러 발생??
![image](https://user-images.githubusercontent.com/93169519/223099688-c5eef764-9529-429e-bd6e-e234f496026c.png)

이게 뭔가 싶어 검색해봤지만 별다른 정보도 없었고, `brew list` 명령어 입력을 해보니 pcre2 는 이미 설치된 상태였기에 원인을 파악할 수가 없었습니다.
<br>
그래서 다시 설치해보니 문제 없이 설치되었다! 😓

### 톰캣 실행

```shell
# 톰캣 설치된 디렉토리로 이동
cd /opt/homebrew/Cellar/tomcat/10.1.7/bin/

# 실행!
./catalina start

# 종료!
./catalina stop
```

## Open SSL 설치 및 적용하기


### Open SSL 설치

```shell
genrsa -des3 -out [키이름] 2048 
genrsa -des3 -out private.pem 2048

genrsa -out [키이름] 2048
genrsa -out private.key 2048

rsa -in [개인키] -pubout -out [공개키] rsa -in priavte.key -pubout -out public.key

req -new -key [키] -out [CSR이름.csr]
req -new -key private.key -out private.csr

# 안되면

req -new -config ./openssl.cnf -key private.key -out private.csr

genrsa [암호화 알고리즘] -out [키이름] 2048
genrsa -aes256 -out rootCA.key 2048

req -x509 -new -nodes -key rootCA.key -days 3650 -out rootCA.pem

# 안되면

req -config ./openssl.cnf -x509 -new -nodes -key rootCA.key -days 3650 -out rootCA.pem

x509 -req -in private.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out private.crt -days 3650

//안되면
x509 -req -config ./openssl.cnf -in private.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out private.crt -days 3650
```

```xml
<Connector 
          port="8443" 
          protocol="org.apache.coyote.http11.Http11NioProtocol"
          maxThreads="150" 
          SSLEnabled="true" 
          scheme="https" 
          secure="true"
          keystoreFile="/Users/midas/Downloads/ssl/.keystore"
          keystorePass="helloworld" 
          keystoreType="pkcs12"
          clientauth="false" 
          sslProtocol="TLS"
          />
```