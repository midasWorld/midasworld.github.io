---
layout: post
title: 리트코드 566. Reshape the Matrix
description: >
  해당 2차원 배열을 주어진 행, 열로 재배열하시오!
sitemap: false
---

배열 문제... 🗃️

### 문제
> [566. Reshape the Matrix 문제 링크](https://leetcode.com/problems/reshape-the-matrix/description/)

해당 2차원 배열을 주어진 행, 열로 재배열하시오!

![image](https://user-images.githubusercontent.com/93169519/231202106-3396bd50-307f-4d5e-b8a0-5004e11fd738.png)

```text
# Example 1:
Input: mat = [[1,2],[3,4]], r = 1, c = 4
Output: [[1,2,3,4]]
```

(0, 0) 부터 순서대로 주어진 행 수(r) & 열 수(c)로 배열을 새롭게 만들면 되는 문제입니다.


### ✅ 처음 푼 Solution

처음에는 단순하게 2차원 배열을 평평하게 1차원 배열로 만든 다음!
<br>
행 * 열을 반복하며 해당 리스트 값을 넣어 새로운 배열로 만들어서 반환하는 방법을 사용 했습니다.
<br>
(물론 빈 배열이거나, 행 * 열 != 주어진 배열 개수 라면 각각 빈 배열, 주어진 배열을 반환되도록 했습니다.)

```python
  def matrixReshape(self, mat: List[List[int]], r: int, c: int) -> List[List[int]]:
    if not mat: return [[]]
    if len(mat) * len(mat[0]) != r * c:
      return mat

    flat = []
    for arr in mat:
      for num in arr:
        flat.append(num)

    idx = 0
    output = []
    for _ in range(r):
      tmp = []
      for _ in range(c):
        tmp.append(flat[idx])
        idx += 1
      output.append(tmp)
            
    return output
```

### ✅ 최종 Solution

최종적으로는 공식을 사용해서 풀었습니다.
```shell
# Example
# input
1 2 3
4 5 6

# output
1 2
3 4 
5 6
```

만약에 위의 예제로 진행 했을 때, 3의 좌표를 공식화 하면?
<br>
0 부터 순서대로 증가하는 것을 Index 라고 했을 때,
<br>
`Row`는 Index ➗ COL(열 개수) 로, `Col`은 Index % COL(열 개수)인 나머지로 구하면 됩니다.
<br>
(한 줄에는 COL 개수 만큼만 있을 수 있기 때문에 그 이상은 다음 줄로 넘어가게 되기 때문에 나누기와 나머지로 활용하면 됩니다.)
<br>
예를 들어 3(index = 2)을 각각 찾아보면? input[2 ➗ 3 = 0][2 % 3 = 2], output[2 ➗ 2 = 1][2 % 2 = 0] 입니다.

이를 코드로 작성해보면 아래와 같습니다.
<br>
(빈 배열을 미리 만들어 놓고 각 인덱스에 맞도록 등록하기!)

```python
def matrixReshape(self, mat: List[List[int]], r: int, c: int) -> List[List[int]]:
  if not mat: return [[]]
  if len(mat) * len(mat[0]) != r * c:
    return mat

  output = [[0 for _ in range(c)] for _ in range(r)]
  idx = 0
  while idx < r * c:
    output[idx // c][idx % c] = mat[idx // len(mat[0])][idx % len(mat[0])]
    idx += 1
  return output
```

하지만 속도 측면에서 보면 두 해답 모두 O(r * c)로 같기 때문에 딱히 차이는 없었습니다. 😓
