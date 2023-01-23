---
layout: post
title: 리트코드 226. Invert Binary Tree
description: >
  이진 트리를 좌우로 뒤집어보자!
sitemap: false
---

Tree 문제... 🎋

### 문제
> [226. Invert Binary Tree 문제 링크](https://leetcode.com/problems/invert-binary-tree/?envType=study-plan&id=data-structure-i)

이진 트리를 좌우 반대로 만들어 반환하시오!

![image](https://user-images.githubusercontent.com/93169519/231039682-7c45b144-8c62-4264-b673-ac42321a4927.png)

```text
# Example 1:
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
```

예제를 보시면 각 노드의 왼쪽, 오른쪽 하위 노드들이 반대로 바뀐 것을 볼 수 있습니다.

### ✅ 최종 Solution

이건 간단하게 재귀로 반복하면서 좌우로만 바꾸면 됩니다.
<br>
노드가 2개 뿐이라 굉장히 간단하게 풀 수 있었습니다. 😁

```python
def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
  def invert(node):
    if not node: return
    node.left, node.right = node.right, node.left
    invert(node.left)
    invert(node.right)
  invert(root)
  return root
```


