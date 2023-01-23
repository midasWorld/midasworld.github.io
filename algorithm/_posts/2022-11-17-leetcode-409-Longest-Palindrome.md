---
layout: post
title: 리트코드 409. Longest Palindrome
description: >
  가장 긴 팰린드롬을 구하시오!
sitemap: false
---

쉬운 듯 어려운 듯한... 🤔

### 문제
> [409. Longest Palindrome 문제 링크](https://leetcode.com/problems/longest-palindrome/?envType=study-plan&id=level-1)

가장 긴 팰린드롬을 구하시오!

> 팰린드롬(palindrome)?

팰린드롬은 역순으로 읽어도 같은 것을 말합니다.
<br>
예를 들어 `bob` 과 같이 거꾸로 해도 `bob`인 단어 입니다.
<br>
(한국 예능에서는 이효리, 이혜리 가 있었죠..)

```text
# Example 1:
Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.
```

위의 예제에서 만들 수 있는 가장 긴 팰린드롬 단어는 dccaccd 입니다.
<br>
(a 를 b 로 대체하여 dccbccd 로 할 수도 있죠.)

### 최종 Solution

1. 글자 수가 짝수인 경우 그 단어는 무조건 사용할 수 있기에 포함!
  <br>
  (위의 예제에서는 c와 d가 있습니다.)
  <br>
  딱 떨어지는 개수가 아닌 aaa 라는 단어가 있어도! aa 만 추출하면 되니 이도 포함되어야 합니다. (여기서 한번 틀림... 🫠 )
2. 그리고 한 글자 이더라도 가장 중앙에 위치한다면 아무 문제가 없습니다.
  <br>
  (위의 예제의 중앙의 a와 같습니다.)

고로 정답 == 짝수개의 단어 + 한 글자(IF 한 글자가 있다면)

```python
def longestPalindrome(self, s: str) -> int:
  dic = collections.Counter(s)
  result = 0
  odd = False
  for letter in dic:
    result += dic[letter] // 2 * 2
    if dic[letter] % 2 == 1:
      odd = True
  return result + odd
```
