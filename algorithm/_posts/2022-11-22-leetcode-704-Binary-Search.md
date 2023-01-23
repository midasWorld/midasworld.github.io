---
layout: post
title: 리트코드 704. Binary Search 풀기 완료
description: >
  배열에서 숫자 찾기!
sitemap: false
---

Tree 문제... 🎋

### 문제
> [704. Binary Search 풀기 완료 문제 링크](https://leetcode.com/problems/binary-search/)

```text
# Example 1:
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
```

nums 배열에서 타겟의 숫자는 9의 인덱스는 `4`이므로 `4`가 반환 됩니다.

### ✅해결 방법 & 최종 Solution

문제 자체가 Binary Search 이므로 이 방법으로 풀었습니다.

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        start, end = 0, len(nums) - 1
        while start <= end:
            mid = (end - start) // 2 + start
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                start = mid + 1
            else:
                end = mid - 1
        return -1
```

위의 예제로 순서대로 구해보면?
```shell
# Example
Input: nums = [-1,0,3,5,9,12], target = 9

1. ❎ start = 0, end = 5, mid = 2, nums[mid] = 3
2. ✅ start = 3, end = 5, mid = 4, nums[mid] = 9 (정답 끗!) 
```

첫 번째 중간 인덱스는 2인데 대상이 그보다 크기 때문에! 다음에는 [-1, 0 3] 배제! 하고 나머지 배열에서 찾게 됩니다.
<br>
이렇게 하면 개수 만큼 순서대로 찾는게 아니라 1/2씩 배제하며 찾을 수 있기 때문에 효과적입니다.