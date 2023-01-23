---
layout: post
title: 리트코드 21. Merge Two Sorted Lists
description: >
  두 배열을 병합하여 정렬된 링크드 리스트로 만드시오!
sitemap: false
---

갑자기 ListLink 클래스를 사용해서 당황한 문제... 🧐

### 문제
> [21. Merge Two Sorted Lists 문제 링크](https://leetcode.com/problems/merge-two-sorted-lists/description/?envType=study-plan&id=level-1)

두 배열을 병합하여 정렬된 링크드 리스트로 만드시오!

![image](https://user-images.githubusercontent.com/93169519/229270020-2b0fcb04-2472-425b-92aa-ce3ad8a405e4.png)

```text
# Example 1:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

여기서 문제는 문제를 보면...? 😓

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
  def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
```

그냥 리스트 아닌 ListNode 라는 클래스를 선언해서 사용한다는 점.
<br>
그래서 결과를 확인해 보려면...?
```python
list1, list1.next, list1.next.next = ListNode(1), ListNode(2), ListNode(4)
list2, list2.next, list2.next.next = ListNode(1), ListNode(3), ListNode(4)

lst = []
while result:
  lst.append(result.val)
  result = result.next
print(lst)
```
이런식으로 확인 했습니다. 다른 좋은 방법이 있으려나...? 🤔

### 최종 Solution

```python
def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
  if (not list1) or (list2 and list1.val > list2.val):
    list1, list2 = list2, list1
  if list1:
    list1.next = self.mergeTwoLists(list1.next, list2)
  return list1
```
list1 에 병합을 하는 방법으로 풀었고, 풀이 방법은 다음과 같습니다.

1. 정렬된 순서로 만들기 위해 list1 vs list2 둘 중 작은 것을 list1 으로 둡니다.
  <br>
  ```python
  if (not list1) or (list2 and list1.val > list2.val):
    list1, list2 = list2, list1
  ```
2. list1 에는 작은 것이 세팅되어 있으니 다음으로 list1.next vs list2 로 진행합니다. 
   <br>
  ```python
  if list1:
    list1.next = self.mergeTwoLists(list1.next, list2)
  ```
3. 이를 반복... 하다 보면 list1 에 정렬된 상태로 병합됩니다!

끗. 👍