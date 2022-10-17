---
layout: post
title: [leetcode] Intersection of Two Arrays II
description: >
  두 배열의 교집합을 구하시오.
sitemap: false
---

기초부터 다시 반복적으로 풀어보고자 합니다. 🚶

### 문제
> [350. Intersection of Two Arrays II 문제 링크](https://leetcode.com/problems/intersection-of-two-arrays-ii/description/)

배열 `nums1`, `nums2`의 교집합을 구하시오.

```text
# Example 1:
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]
```

---

### 처음 작성한 풀이

```python
def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
  result = []
  for n in nums2:
    if n in nums1:
      nums1.remove(n)
      result.append(n)
  return result
```

하고 보니 `remove` 함수의 시간복잡도가 O(n)이기 때문에 결과적으로 O(n^2)가 되어 좋지 않은 풀이었습니다. 😓

### 최종 Solution

```python
def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
  nums1.sort()
  nums2.sort()
  i = 0
  j = 0
  result = []
  while i < len(nums1) and j < len(nums2):
    if nums1[i] < nums2[j]:
      i += 1
    elif nums1[i] > nums2[j]:
      j += 1
    else:
      result.append(nums1[i])
      i += 1
      j += 1
  return result
```

시간복잡도가 O(n)이 되고 처음 작성한 풀이보다 속도가 거의 1.5배 빨라졌습니다. (61ms → 44ms)
<br>
원리는 두 배열을 정렬한 후에 같아 질때까지 서로의 인덱스를 높여주는 방법 입니다.