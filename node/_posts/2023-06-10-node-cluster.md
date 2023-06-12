---
layout: post
title: Node - Cluster
description: >
  Node - Cluster 예제 구현해보기
sitemap: false
---

NodeJS 의 장점이자 단점이 바로 Non-blocking I/O 와 단일 스레드 입니다.

싱글 스레드로 하나의 코어에서 실행되기 때문에,
<br>과부하가 된다면 서버가 다운되는 현상을 겪을 수도 있습니다.

> 🤔 이를 해결하기 위한 방법은?

1. 클러스터링 : https://nodejs.org/api/cluster.html
   <br> 여러 프로세스를 생성하여 요청을 병렬로 처리하는 방식입니다.
   <br> 각 프로세스는 독립적으로 작동하며, 요청 부하를 분산시킴으로써 동시성을 향상시킵니다.
2. 스레드풀 사용 : https://nodejs.org/api/worker_threads.html
   <br> worker-thread 를 사용하여 CPU 집약적인 작업을 병렬로 처리할 수 있습니다.
   <br> worker-thread 는 Node 의 메인 스레드와 별도로 동작하며,
   <br> 비동기적으로 작업을 처리하여 동시성을 개선합니다.

### 🛠️ 과부하 테스트 툴

- Artillery : https://github.com/artilleryio/artillery/tree/main/packages/artillery#readme

위의 툴은 지정한 수의 요청을 보낼 수 있는 과부화 툴 입니다. 😁

```shell
# 설치
npm install -g artillery

# 사용
artillery quick -c 2 -n 4000 http://localhost:8000
```

여기서 사용 부분을 보시면,
<br>`-c`는 가상 사용자의 수, `-n`은 보낼 요청의 수 입니다.
<br>고로 2명의 가상 사용자가 4,000번의 요청을 보내는 테스트 입니다.

공식 문서를 보시면 yml 파일을 작성하여 시나리오까지 만들 수 있습니다. 😁

## cluster 사용해보기

```typescript
import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import process from "node:process";
import express from "express";

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  const app = express();

  app.get("/", (_, res) => {
    console.log(process.pid, " is getting request");
    res.status(200).json({ message: "hello world" });
  });

  app.listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

사실상 공식 문서에서 예제로 보여주는 그대로 작성을 했습니다.

이렇게 작성한 후에 실행을 해보면?

```shell
Primary 24791 is running
Worker 24800 started
Worker 24794 started
Worker 24797 started
Worker 24795 started
Worker 24798 started
Worker 24799 started
Worker 24793 started
Worker 24796 started
Worker 24802 started
Worker 24801 started
```

위와 같이 CPU 코어에 맞춰 프로세스가 각각 실행됩니다.
<br>그리고 artillery 툴을 이용해서 요청을 보내보면 각각의 프로세스가 일을 처리하는 걸 확인할 수 있습니다.

### message 이벤트 사용하기

원래는 각 worker 는 독립적으로 동작하기 때문에 **데이터가 공유되지 않습니다.**
<br>그래서 아래와 같이 추가해버린다면? 🤔

```typescript
// ✨ 추가된 부분
let logs: Record<number, number> = {};

if (cluster.isPrimary) {
  // ...
} else {
  // ...
  app.get("/", (_, res) => {
    console.log(++logs[process.pid]); // ✨ 추가된 부분
    res.status(200).json({ message: "hello world" });
  });

  // ...
}
```

생각대로라면 각 워커들의 pid 와 숫자들이 출력되야 될것 같지만,
<br>결과로는 해당 pid 하나의 결과만 출력 됩니다.

```shell
{
  '26769': 12000,
}
```

> 💡 이를 어떻게보면 프로세스간에 통신할 수 있도록 해주는 이벤트를 추가할 수 있습니다.

각 worker 에 message 이벤트를 추가해보겠습니다.

```typescript
import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import process from "node:process";
import express from "express";

const numCPUs = availableParallelism();

let logs: Record<number, number> = {};

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // ✨ 추가된 부분
  for (const id in cluster.workers) {
    cluster.workers[id]?.on("message", (message) => {
      const pid = parseInt(message);
      if (pid in logs) {
        logs[pid] += 1;
      } else {
        logs[pid] = 1;
      }
      console.log(logs);
    });
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  const app = express();

  app.get("/", (_, res) => {
    res.status(200).json({ message: "hello world" });

    // ✨ 추가된 부분
    process.send(`${process.pid}`);
  });

  app.listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

추가된 부분만 보시면 각 worker 에 message 이벤트를 추가한 것을 알 수 있습니다.
<br>그리고 메시지를 보내면 추가한 이벤트가 작동을 하고,
<br>저는 각 pid 마다 요청 받아 처리한 개수를 logs 라는 변수에 담아 이를 출력하는 처리를 작성했기 때문에 아래와 같이 결과값이 출력됩니다.

```shell
{
  '26769': 16000,
  '26770': 16000,
  '26771': 16000,
  '26772': 12000,
  '26773': 16000,
  '26774': 16000,
  '26775': 16000,
  '26776': 16000,
  '26777': 12000,
  '26778': 16000
}
```

## 🤔 완벽하게 나눠서 일하지 않는다?

message 이벤트 결과 값을 먼저 보겠습니다.

```shell
{
  '26769': 16000,
  '26770': 16000,
  '26771': 16000,
  '26772': 12000,
  '26773': 16000,
  '26774': 16000,
  '26775': 16000,
  '26776': 16000,
  '26777': 12000,
  '26778': 16000
}
```

위의 결과 값은 `artillery quick -c 8 -n 4000 http://localhost:8000` 이 명령어로 동작한 결과 입니다.
<br>클러스터링을 적용하면 완벽하게 나누어서 동작할 것 같지만 꼭 그렇지도 않다는 것을 확인할 수 있습니다.

따로 지정하지 않는다면 기본적으로 라운드 로빈 방식으로 동작하게 되는데요,
<br>라운드 로빈 방식은 순차적으로 하나의 작업을 배분하는 방식입니다.

그래서 각각에 사용자의 담당을 순차적으로 맡겨서 실행하게 됩니다.

트래픽이 분산되는 것은 맞지만, 모든 요청에 대해서 모든 작업이 나누어 실행되지는 않습니다.
<br>이를 위해서는 로드밸런싱이 필요하다는 것을 알 수 있습니다.

## 🪄 PM2

위와 같이 코드를 작성하지 않고도 PM2 라는 툴만 이용하면 간단하게 클러스터 사용 가능합니다.

```shell
# 설치
npm install -g pm2

# 사용법
pm2 start <file> -i <n>
pm2 start ./app.js -i max
```

위와 같이 max 라고 지정하게 되면 최대 CPU 개수로 실행 됩니다.

## 🔖 보면 좋은 사이트

- [[NODE] 📚 PM2 모듈 사용법 - 클러스터 / 무중단 서비스](https://inpa.tistory.com/entry/node-%F0%9F%93%9A-PM2-%EB%AA%A8%EB%93%88-%EC%82%AC%EC%9A%A9%EB%B2%95-%ED%81%B4%EB%9F%AC%EC%8A%A4%ED%84%B0-%EB%AC%B4%EC%A4%91%EB%8B%A8-%EC%84%9C%EB%B9%84%EC%8A%A4)
- [웹 서비스를 위한 Node.js 병렬처리 구현](https://medium.com/monday-9-pm/%EC%9B%B9-%EC%84%9C%EB%B9%84%EC%8A%A4%EB%A5%BC-%EC%9C%84%ED%95%9C-node-js-%EB%A9%80%ED%8B%B0%EC%BD%94%EC%96%B4-%EB%B3%91%EB%A0%AC%EC%B2%98%EB%A6%AC-%EA%B5%AC%ED%98%84-c2953dc2daa8)
