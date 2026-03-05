---
title: "리트코드 543. Diameter of Binary Tree 풀기 완료"
description: "이진 트리의 두 노드 간 가장 긴 경로의 길이 구하기"
date: "2022-11-21"
category: "algorithm"
---

Tree 문제... 🎋

### 문제
> [543. Diameter of Binary Tree 풀기 완료 문제 링크](https://leetcode.com/problems/diameter-of-binary-tree/)

Binary Tree → 최대 직경 구하기!

> 🤔 Binary Tree(이진 트리)?
> <br>
> 자식 노드가 최대 두 개인 노드들로 구성된 트리 입니다.

![image](https://user-images.githubusercontent.com/93169519/230866801-d241f953-68fe-4240-ab94-04b34f4548e4.png)

```text
# Example 1:
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
```

사진을 보면 알 수 있듯이 가장 깊은건  4→2→1 or 5→2→1 이므로 정답은 3입니다.

### ❎ 틀린 오답

```text
# Example 1:
Input: root = [4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2]
Output: 8
```

처음에는 root 기점으로 `dfs`를 사용하여 가장 긴 좌우 노드를 합치는 방법을 사용 했습니다만.. 🫠
<br>
위의 예제에서 계속 실패가 되서 왜 이래...? 🤔 했는데....

![image](https://user-images.githubusercontent.com/93169519/230883302-96dc2210-f811-4d06-b308-709c86fead83.png)

노드를 그림으로 보고 다시 문제를 보니 루트와 상관없이 어떤 노드든 그 기점으로 가장 긴 경로를 찾는 것이었습니다.
<br>
(이때 리트코드에 예제의 노드를 그림으로 보여주는 기능이 있다는 걸 처음 알았습니다. 😳)

### ✅해결 방법 & 최종 Solution

해결 방법으로는 전역 변수(longest)를 만들고, 
<br>
모든 노드들의 좌우 최대 길이를 구해서 더하여 가장 긴 직경을 등록하는 방법을 사용하였습니다.

```python
class Solution:
  longest: int = 0
  def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
    def dfs(node):
      if not node:
        return 0
      left = dfs(node.left)
      right = dfs(node.right)

      self.longest = max(self.longest, left + right)
      return max(left, right) + 1
    dfs(root)
    return self.longest
```

끗!
