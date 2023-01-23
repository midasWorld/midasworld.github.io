---
layout: post
title: 리트코드 101. Symmetric Tree 풀기 완료
description: >
  Tree → 좌우 대칭인지 판별하시오!
sitemap: false
---

Tree 문제... 🎋

### 문제
> [101. Symmetric Tree 풀기 완료 문제 링크](https://leetcode.com/problems/symmetric-tree/?envType=study-plan&id=data-structure-i)

문제는 Tree 가 좌우 대칭인지 판별하는 것입니다.

![image](https://user-images.githubusercontent.com/93169519/230925823-55e91feb-f1b7-43d3-aa1e-087084df36ca.png)

```text
# Example 1:
Input: root = [1,2,2,3,4,4,3]
Output: true
```

1번 예제는 보시는 바와 같이 1번을 기점으로 좌우 대칭으로 되어 있어 True 를 반환해야 합니다.

![image](https://user-images.githubusercontent.com/93169519/230925859-fd5acef7-eaeb-444a-8fd3-9c6e1937a21f.png)

```text
# Example 2:
Input: root = [1,2,2,null,3,null,3]
Output: false
```

하지만 2번 예제는 마지막 3번이 좌우 대칭이 아니기 때문에 False 를 반환해야 합니다.
<br>
(←|(왼쪽) 3번이 2의 왼쪽으로 가던지, 아니면 |→(오른쪽)의 3번이 2의 왼쪽으로 가면 대칭이 되겠죠?) 

### ✅ 최종 Solution

```python
def isSymmetric(self, root: Optional[TreeNode]) -> bool:
  def isSame(leftNode, rightNode):
    if leftNode == None and rightNode == None:
      return True
    if leftNode == None or rightNode == None:
      return False
    if leftNode.val != rightNode.val:
      return False
    return isSame(leftNode.left, rightNode.right) and isSame(leftNode.right, rightNode.left)
  
  if not root:
    return True

  return isSame(root.left, root.right)
```

풀이는 재귀로 간단하게 풀 수 있었습니다.
<br>
이진 트리는 2개의 하위 노드만 있기 때문에, 각 2개가 대칭이 맞는지 재귀로 반복하게 되면 모든 노드를 확인할 수 있습니다.
<br>
None 값을 다루기 때문에, if 문의 순서만 잘 작성하면 문제 없는 풀이였습니다.

