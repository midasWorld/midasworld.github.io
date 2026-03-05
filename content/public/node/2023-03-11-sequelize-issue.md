---
title: "Sequelize Issue 정리"
description: "Sequelize 사용하면서 생긴 이슈 정리"
date: "2023-03-11"
category: "node"
---

시퀄라이즈 다사다난 사용기... 🚶 

# ISSUE 정리

## INSERT 시, FK(외래키) 정보가 등록 안되는 문제

글(Tweet) 생성 시, 작성자 정보 등록을 위해 회원의 Id를 외래키로 설정을 하고,
<br>
시퀄라이즈에서 제공하는 `model.create` 메서드를 사용해서 등록을 해줬는데?
<br>
외래키 정보만 쏙 빠진채로 등록되는 문제가 발생했습니다. 🤔

아래에는 순서대로 `[1]외래키 설정`, `[2]실행된 테이블 생성문`, `[3]등록 메서드(create)`, `[4]등록 결과물` 입니다.

```javascript
// [1] 외래키 설정(with Sequelize)
Tweet.belongsTo(User);
```

```shell
# [2] 실행된 테이블 생성문
# `user_id`(FK)가 생성됨! 
Executing (default): CREATE TABLE IF NOT EXISTS `tweets` (`id` INTEGER NOT NULL auto_increment , `text` TEXT NOT NULL, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL, `deleted_at` DATETIME, `user_id` INTEGER NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
```

```javascript
// [3] 등록 메서드(create)
export async function create(text, userId) {
  return Tweet.create({ text, userId });
}
```

```shell
# [4] 등록 결과
INSERT INTO `tweets` (`id`,`text`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?);
```

4번과 같이 user_id 는 제외된 상태로 INSERT 된것을 확인할 수 있었습니다. 🫠
<br>
(테이블을 확인해보니 `user_id`가 null 상태였습니다.)

```javascript
export async function create(text, userId) {
  return Tweet.create({ text, user_id: userId });
}
```

위와 같이 `user_id`를 명시해줘도 똑같이 등록이 되지 않았습니다.

### ✨ 해결
이리저리 찾아보다 외래키 설정하는 부분을 보고, 설정값을 넣어줬더니 너무 간단하게 해결되었습니다.

```javascript
Tweet.belongsTo(User, {
  foreignKey: { name: "userId", allowNull: false },
});
```

위와 같이 name 설정해주면서 겸사겸사 null 허용이 되지 않도록 같이 설정했습니다.
<br>
그리고 나서 실행을 하니 정상적으로 등록이 됬고, 데이터도 들어간것을 확인할 수 있었습니다.

```shell
INSERT INTO `tweets` (`id`,`text`,`created_at`,`updated_at`,`user_id`) VALUES (DEFAULT,?,?,?,?);
```

```shell
mysql> select * from tweets;
+----+---------+---------------------+---------------------+------------+---------+
| id | text    | created_at          | updated_at          | deleted_at | user_id |
+----+---------+---------------------+---------------------+------------+---------+
|  1 | 헬로?   | 2023-03-19 00:54:25 | 2023-03-19 00:54:25 | NULL       |       1 |
+----+---------+---------------------+---------------------+------------+---------+
1 row in set (0.01 sec)
```