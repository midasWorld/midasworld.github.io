---
layout: post
title: 리트코드 36. Valid Sudoku
description: >
  올바른 스도쿠 구성인지 판별하시오!
sitemap: false
---

룰루

### 문제
> [36. Valid Sudoku 문제 링크](https://leetcode.com/problems/valid-sudoku/?envType=study-plan&id=data-structure-i)

올바른 스도쿠 구성인지 판별하시오!

![image](https://user-images.githubusercontent.com/93169519/231215857-9d6cb981-ee9b-49b0-9d4f-7242e6201167.png)

```text
# Example 1:
Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
```

스도쿠 룰은 한줄에 1~9 숫자가 중복되지 않도록 구성되어야 합니다.
<br>
그리고 3 x 3 구성에서도 중복이 되면 안됩니다.

그래서 위의 배열이 규칙에 어긋나지 않는지 판별하는 문제입니다.

### ✅ 처음 푼 Solution

처음에는 단순하게 rule 별로 for 문을 돌려서 리스트로 만든 다음!
<br>
`set`을 사용해서 개수 비교를 하여 중복된 것이 있는지 체크 하였습니다.

```python
class Solution:
  def isValidSudoku(self, board: List[List[str]]) -> bool:
    length = len(board)

    # rule 1 - check row
    for i in range(length):
      tmp = []
      for j in range(length):
        if board[i][j] != '.':
          tmp.append(board[i][j])
      if len(tmp) != len(set(tmp)):
        return False

    # rule 2 - check column
    for i in range(length):
      tmp = []
      for j in range(length):
        if board[j][i] != '.':
          tmp.append(board[j][i])
      if len(tmp) != len(set(tmp)):
        return False

    # rule 3 - check 3 x 3
    box = 3
    for i in range(box):
      for j in range(box):

        # 3 x 3 box
        tmp = []
        for m in range(i * box, i * box + box):
          for n in range(j * box, j * box + box):
            if board[m][n] != '.':
              tmp.append(board[m][n])
        if len(tmp) != len(set(tmp)):
          return False
        
    return True
```

### ✨ Best Solution

다른 분이 작성한 Solution 너무나도 인상 깊었습니다.
<br>
애초에 주어진 배열이 문자열 이었기 때문에, 해당 문자열 & 인덱스를 문장으로 잘 정리하여 존재하는지 판단한다!
<br>
코드를 보니 더더욱 보기도 좋고 깔끔한 코드였습니다.

```python
def isValidSudoku(self, board: List[List[str]]) -> bool:
seen = set([])
for i in range(9):
  for j in range(9):
    num = board[i][j]
    if num != '.':
      row = num + ' in row ' + str(i)
      col = num + ' in col ' + str(j)
      box = num + ' in box ' + str(i // 3) + '-' + str(j // 3)

      if row in seen or col in seen or box in seen:
        return False
      
      seen.add(row)
      seen.add(col)
      seen.add(box)

return True
```


