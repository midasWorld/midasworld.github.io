---
title: "리트코드 102. Binary Tree Level Order Traversal"
description: "Binary Tree → Level 순서로 탐색하기!"
date: "2022-11-20"
category: "algorithm"
---

Tree 문제

### 문제
> [102. Binary Tree Level Order Traversal 문제 링크](https://leetcode.com/problems/binary-tree-level-order-traversal/?envType=study-plan&id=level-1)

Binary Tree → Level 순서로 탐색하기!

> 🤔 Binary Tree(이진 트리)?
> <br>
> 자식 노드가 최대 두 개인 노드들로 구성된 트리 입니다.


```text
# Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

![image](https://user-images.githubusercontent.com/93169519/230064070-fcb82fc7-00b3-4f10-b362-3692eba2fc01.png)

문제의 핵심은 `Level` 순서로 진행 된다는 점!
<br>
🤔 만약에 위의 예제에서 9의 자식노드 [10, 4]가 추가로 존재한다면?
<br>
→ Output: [[3],[9,20],[10,4,15,7]] 으로 된다는 것!


### 최종 Solution

각 노드의 왼쪽 오른쪽에 있는 것을 `Level` 별로 하나로 합쳐야 됩니다.
<br>
그를 위해 노드를 하나의 배열로 모아놓은 `level` 변수를 이용해서 반복하여 풀어냈습니다.

```python
def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
  ans, level = [], [root]
  while root and level:
    ans.append([node.val for node in level])
    LRs = [(node.left, node.right) for node in level]
    level = [leaf for LR in LRs for leaf in LR if leaf]
  return ans
```


while 문 부분의 `level` 부분만 보면 아래와 같습니다.
```python
# 1. 일단 임시변수에 하위노드인 (left, right) 등록 (다음 레벨 노드)
LRs = []
for node in level:
  LRs.append((node.left, node.right));

# 2. (left, right)로 묶인 것을 배열 형태로 풀어 등록하기.
level = []
for LR in LRs:
  # LR = (left, right)
  for leaf in LR:
    if leaf:
      # 각 노드에 있는 값을 이제 다음 레벨로 
      level.append(leaf);
```

