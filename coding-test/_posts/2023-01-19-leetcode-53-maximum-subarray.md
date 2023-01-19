---
layout: post
title: [leetcode] Maximum Subarray
description: >
  메모이제이션, 카데인 알고리즘으로 풀기
sitemap: false
---

리트코드 플랜 - DS 1일차 시작!

### 문제
> [53. Maximum Subarray 문제 링크](https://leetcode.com/problems/maximum-subarray/?envType=study-plan&id=data-structure-i)

배열에서 연속되는 서브 배열 중에 최대합을 찾아라!

```text
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
```

예시 중 하나를 가져 왔는데, 경우의 수 중에 [4,-1,2,1] 배열이 합 중에 가장 컸다는 것을 의미 합니다.


### 메모이제이션
> **🤔 메모이제이션(memoization)이란?**
> <br>
> 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 
> <br>
> 이전에 계산한 값을 메모리에 저장함으로써, 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술이다.
> <br>
> 동적 계획법의 핵심이 되는 기술
> <br>
> 🔖 [wiki 참조](https://ko.wikipedia.org/wiki/%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98)

실전에서는 캐싱(caching) 단어를 더 많이 사용된다고 하며,
<br>
예시로는 피보나치 수열이 있습니다.

그래서 위의 문제를 메모리제이션으로 풀어보면 아래와 같습니다. 
<img width="500" alt="image" src="https://user-images.githubusercontent.com/93169519/227840875-d88fda19-9b3a-429d-8c87-7e4f86966c81.png">

사실 이전의 합산해 놓은 값이 - 인 경우에는 굳이 합산을 할 필요가 없기 때문에, 
<br>
이를 제외하고 자기 자신만 되는 경우(-2, 1, 4 ...)도 있습니다.

고로 원리는 처음부터 끝까지 순서대로 하나씩 최대값을 구하는 방법으로 시간 복잡도는 `O(n)` 입니다.

코드는 아래와 같습니다.
```python
def maxSubArray(self, nums: List[int]) -> int:
  sums: List[int] = [nums[0]]
  for i in range(1, len(nums)):
    sums.append(nums[i] + (sums[i - 1] if sums[i - 1] > 0 else 0))
  return max(sums)
```


### 카데인 알고리즘
효율적인 접근법: Kadane의 알고리즘
Kadane의 알고리즘은 반복 동적 프로그래밍 알고리즘입니다. 이전 위치에서 끝나는 최대 합계 하위 배열을 사용하여 특정 위치에서 끝나는 최대 합계 하위 배열을 계산합니다. 문제를 해결하려면 아래 단계를 따르십시오.

여기서 끝나는 최대 합계를 저장하는 두 개의 변수 currSum과 지금까지의 최대 합계를 저장하는 maxSum을 정의합니다.
currSum을 0으로, maxSum을 INT_MIN으로 초기화합니다.
이제 배열을 반복하고 현재 요소의 값을 currSum에 추가하고 확인합니다.
currSum이 maxSum보다 큰 경우 maxSum을 currSum과 동일하게 업데이트합니다.
currSum이 0보다 작으면 currSum을 0으로 만듭니다.
마지막으로 maxSum의 값을 인쇄합니다.

카데인 알고리즘(Kadane's Algorithm)은 1977년에 제안되어, 
<br>
제이 카데인(Jay Kadane)이 O(n^2) → O(n) 으로 치환해서 풀이한 유명한 알고리즘이라고 합니다.

방법은..?
- maxSum(최대 합계 저장용), currentSum(최근 합) 준비
- `maxSum`을 `INT_MIN`으로 초기화
- 배열을 반복하고 `currentSum`에 추가 및 확인
- [IF] (currentSum > maxSum) → maxSum = currentSum 업데이트
- [IF] (currentSum < 0) → currentSum = 0 으로 초기화
- 마지막으로 `maxSum`을 출력!

이를 코드로 작성하면 아래와 같습니다.
```python
def maxSubArray(self, nums: List[int]) -> int:
  best_sum = -sys.maxsize
  current_sum = 0
  for num in nums:
    current_sum = max(num, current_sum + num)
    print(current_sum)
    best_sum = max(best_sum, current_sum)
  return best_sum
```

시간 복잡도는 `O(n)` 입니다.
<br>
방법으로서 위의 메모이제이션과 별 다를게 없습니다. 🥸
<br>
(실제 실행 시간도 별 차이 없음!)