---
layout: post
title: [leetcode] 144. Binary Tree Preorder Traversal
description: >
  이진 트리의 순회(preorder traversal) 리스트를 반환하시오!
sitemap: false
---

Tree 문제... 🎋

### 문제
> [144. Binary Tree Preorder Traversal 문제 링크](https://leetcode.com/problems/binary-tree-preorder-traversal/description/?envType=study-plan&id=data-structure-i)

이진 트리의 순회(preorder traversal) 해보아라!

![image](https://user-images.githubusercontent.com/93169519/230949050-0dd6540c-0ce5-4513-8653-217eb1afaad7.png)

```text
# Example 1:
입력: root = [1,null,2,3]
출력: [1,2,3]
```

`preorder traversal`가 뭔가 싶었더니... 그냥 왼쪽 부터 DFS 탐색하면 되는 문제였습니다.

### ✅ 최종 Solution

```python
def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
  def dfs(node, path):
      if not node: return
      path.append(node.val)
      dfs(node.left, path)
      dfs(node.right, path)
  
  ans = []
  dfs(root, ans)  
  return ans
```

`dfs`를 활용하여 재귀로 간단하게 풀 수 있었습니다.
<br>
`dfs` 내에서 왼쪽, 오른쪽 순서로 하게 되면 재귀로 반복하며 `왼쪽 깊이 우선 순서`로 리스트로 등록됩니다! 😁

