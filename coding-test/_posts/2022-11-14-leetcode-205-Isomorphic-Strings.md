---
layout: post
title: [leetcode] Isomorphic Strings
description: >
  같은 모양의 문자열인지 판별하시오!
sitemap: false
---

굉장히 쉬운 문제 였는데, 너무 어렵게 생각해서 시간 낭비한 문제 입니다. 🫠

### 문제
> [205. Isomorphic Strings 문제 링크](https://leetcode.com/problems/isomorphic-strings/description/?envType=study-plan&id=level-1)

같은 모양의 문자열인지 판별하시오!
<br>
(단! 한 문자는 한 문자만 대체 가능!)

```text
# Example 1:
Input: s = "egg", t = "add"
Output: true

# Example 2:
Input: s = "foo", t = "bar"
Output: false
```

예를 들어 예제 1번(egg 와 add) 
<br>
s(egg)를 e → a, g → d로 대체 하면 둘은 같은 문자가 됩니다.

하지만 조건으로 한 문자는 한 문자만 대체 가능하므로...
<br>
예제 2번과 같이 s를 변환 하려고 해도 o → a 로 이미 정해져 있으므로 변환을 해도 `baa <> bar`로 일치하지 않게 됩니다.
<br>
반대로 t → s로 변환하려고 해도? 🤔
<br>
`{ b: f, a: o, r: ?????}` 와 같이 a - o 는 이미 매칭되어 r - o는 매칭 될수 없기 때문에 변환 실패입니다.

---

### 처음 작성한 풀이

1. ❎ 단순히 replace() 사용
  <br>
  → 한 단어는 하나만 변환 가능 조건이 안붙어서 무조건 True 만 반환하여 실패 
2. ❎ 문자를 처음 인덱스로 변환해서 각 합이 같은지?
  <br>
  → `s = bbbaaaba, t = aaabbbba` 라면 순서만 바뀌는 것이기 때문에 무조건 합이 같아 True 만 반환하여 실패
3. ✅ 변환 사전을 만들어서 변환! (아래 작성 코드)

```python
def isIsomorphic(self, s: str, t: str) -> bool:
  if len(set(s)) != len(set(t)):
    return False

  dic = {}
  encoded_s = ''
  for i in range(len(s)):
    if s[i] not in dic.keys():
      dic[s[i]] = t[i]
    encoded_s += dic[s[i]]
  return t == encoded_s
```

한 단어당 하나만 대체 가능하다는 조건을 위해 set 자료형을 사용해서 문자 종류 수 가 같은지 체크하게 됩니다.
<br>
그리고 for 문으로 하나씩 변환하여 두 단어가 같은지 체크하는 방식으로 검사했습니다.

### 최종 Solution

하지만 더 간단한 방법이 있었는데요. 😓
<br>
위의 2번에서 굳이 합산을 해서 비교하는 게 아닌 단순하게 리스트로 비교를 하게 되면 끝나는 거였습니다!
<br>
(1문자당 1문자 대체 가능! & 단어의 순서까지 체크가 가능하게 되는 거죠.)
<br>
(ex) bbbaaaba : aaabbbba = 00011101 : 00011110 → ✅ False 반환!

파이썬은 리스트 자체로 비교가 가능하다는 장점을 간과했습니다. 🫠

```python
def isIsomorphic(self, s: str, t: str) -> bool:
  index_s = []
  index_t = []
  for word in s:
    index_s.append(s.index(word))
  for word in t:
    index_t.append(t.index(word))
  return index_s == index_t
```

처음 작성한 코드와 사실 실행 시간은 같습니다. 
<br>
둘 다 시간 복잡도가 O(n^2) 라고 생각됩니다. 🤔 (O(n) 이라고 하는 사람도 있다?)
<br>
(이유: list.index() 함수의 시간 복잡도가 O(n) 이기 때문에 시간 복잡도는 O(n^2)!)