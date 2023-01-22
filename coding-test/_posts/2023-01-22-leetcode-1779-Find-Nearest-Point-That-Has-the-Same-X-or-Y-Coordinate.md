---
layout: post
title: [leetcode] 1779. Find Nearest Point That Has the Same X or Y Coordinate
description: >
  가장 근접한 좌표의 최소 인덱스는?
sitemap: false
---

리트코드 문제 풀기 챌린지...!

### 문제
> [1779. Find Nearest Point That Has the Same X or Y Coordinate 문제 링크](https://leetcode.com/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate/?envType=study-plan&id=programming-skills-i)

주어진 (x, y) 좌표를 기준으로 다음과 같은 조건을 만족하는 인덱스를 반환하면 됩니다!
- x 또는 y 좌표를 공유해야 합니다.
  (둘 중 하나는 같아야 된다는 뜻!)
- 거리는 Manhattan distance 으로 계산!
- 가장 근접한 좌표가 여러개라면 해당 좌표의 최소 인덱스를 반환하도록! 

> Manhattan distance 란? 🤔
> <br>
> (x1, y1) ↔ (x2, y2) 의 거리는?? 
> <br>
> |x1 - x1| + |y1 - y2| 입니다. 즉 두 점의 거리를 절대값으로 더한 값입니다.

즉 배열에서 가장 가까운 거리의 좌표를 구하고, 여러개 있다면 가장 작은 인덱스를 반환하면 됩니다.
<br>
기나긴 영어 속에서 읽는게 더 힘들었습니다. 🫠

```text
# Example 1:
Input: x = 3, y = 4, points = [[1,2],[3,1],[2,4],[2,3],[4,4]]
Output: 2
Explanation: Of all the points, only [3,1], [2,4] and [4,4] are valid. Of the valid points, [2,4] and [4,4] have the smallest Manhattan distance from your current location, with a distance of 1. [2,4] has the smallest index, so return 2.
```

위에서 기준 좌표는 (3, 4) 입니다.
<br>
여기서 최소 둘중 하나의 인덱스를 만족하는 좌표는 [3,1], [2,4], [4,4] 입니다.
<br>
3개의 각각의 거리는 3, 2, 2 입니다. 고로 최소 거리의 좌표는 [2,4], [4,4]가 됩니다.
<br>
복수의 좌표가 나왔기 때문에 가장 작은 인덱스는 [2,4]의 인덱스인 2가 정답이 됩니다!


### ✅ 최종 Solution

풀이는 간단했습니다.
<br>
먼저 인덱스와 최소 거리를 가지고 있을 변수를 선언 해주고,
<br>
순서대로 반복하면서 조건에 만족하는 이전보다 최소 거리의 좌표가 나오면 인덱스와 최소 거리를 갱신해주면 됩니다!

```python
class Solution:
  def nearestValidPoint(self, x: int, y: int, points: List[List[int]]) -> int:
    minIndex, minDistance = -1, sys.maxsize
    for i, (x2, y2) in enumerate(points):
      if x == x2 or y == y2:
        distance = abs(x - x2) + abs(y - y2)
        if minDistance > distance:
          index, minDistance = i, distance
    return index
```


