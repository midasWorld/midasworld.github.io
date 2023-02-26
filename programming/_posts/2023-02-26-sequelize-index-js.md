---
layout: post
title: Sequelize - index.js → module 타입으로 전환하기
description: >
  import 사용을 위한 index.js 수정하기
sitemap: false
---

## Sequelize - 😓 index.js → module 타입으로 수정하기

require 대신에 import 문을 사용하기 위해 `package.json`에서 type module 설정을 했더니...
<br>
sequelize - `index.js`에서 아래의 구문에서 문제가 발생했습니다.
```javascript
//...
fs.readdirSync(__dirname)
  .filter((file) => {
    console.log(file);
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    // 📌 바로 여기 require()부분!!!!!
    const model = require(path.join(__dirname, file));
    console.log(file, model.name);
    db[model.name] = model;
    model.initiate(sequelize);
  });
```

아래와 같이 `require` 부분에서 오류가 발생했습니다.
```shell
ReferenceError: require is not defined in ES module scope, you can use import instead
This file is being treated as an ES module because it has a '.js' file extension and '/Users/midas/Desktop/Projects/node-js/malcopolo/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
```

ES Module 에서는 `require`를 사용할 수 없는 부분이죠. 🤔
<br>
하지만 models 폴더에서 entity 객체를 초기화 해주기 위해서는 필요한 구문이었습니다.
<br>
다행히 대체 가능한 코드를 잘 작성한 사이트를 찾을 수 있어서 아래와 같이 작성했습니다.

```javascript
// models/index.js

import Sequelize from "sequelize";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Config from "../config/config.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";
const config = Config[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export default async () => {
  const files = fs.readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === ".js"
    );
  });

  for await (const file of files) {
    // 📌 이 부분이 import로 해당 파일의 객체를 생성하는 부분!
    const model = await import(`./${file}`);
    model.default.initiate(sequelize);
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;

  return db;
};
```

> model.default.initiate(sequelize);

`model.default`를 사용한 이유는 해당 import 문으로 받아온 `model`을 로그로 출력 해보면...
<br>
아래와 같이 default 안에 값이 들어있기 때문입니다.

```shell
[Module: null prototype] { default: User }
```

🥸 그리고!! 사용하는 부분도 export 부분이 함수로 내보내기 때문에, 아래와 같이 사용할 수 있었습니다.

```javascript
// app.js
import db from "./models/index.js";

// 📌 이 부분!
const database = await db();
const sequelize = database.sequelize;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
```

**🕺 고로 데이터 베이스 연결 성공!**

<img width="617" alt="image" src="https://user-images.githubusercontent.com/93169519/221416626-2a2930ec-bf68-42f5-9a2d-0a87573f1268.png">

🔖 참고 사이트
- [models/index.js doesn't work with ES6 modules](https://github.com/sequelize/cli/issues/960)