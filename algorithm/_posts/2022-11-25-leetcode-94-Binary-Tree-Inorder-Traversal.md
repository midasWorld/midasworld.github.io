---
layout: post
title: 리트코드 94. Binary Tree Inorder Traversal
description: >
  이진 트리의 순회(inorder traversal) 리스트를 반환하시오!
sitemap: false
---

Tree 문제... 🎋

### 문제
> [94. Binary Tree Inorder Traversal 문제 링크](https://leetcode.com/problems/binary-tree-inorder-traversal/description/?envType=study-plan&id=data-structure-i)

이진 트리의 순회(inorder traversal) 해보아라!

![image](https://user-images.githubusercontent.com/93169519/230949050-0dd6540c-0ce5-4513-8653-217eb1afaad7.png)

```text
# Example 1:
Input: root = [1,null,2,3]
Output: [1,3,2]
```

---

> 🤔 order 방식 중 `inorder`는?
> <br>
> LEFT → NODE → RIGHT

![image](https://user-images.githubusercontent.com/93169519/230954612-2fd58f48-d158-4bdc-a3ea-a22bfa9d0997.png)

위의 그림의 노드를 inorder 순서로 진행하면? [1, 2, 3, 4, 5]가 됩니다.
<br>
([✨ All DFS traversals (preorder, inorder, postorder) in Python in 1 line](https://leetcode.com/problems/binary-tree-inorder-traversal/solutions/283746/all-dfs-traversals-preorder-inorder-postorder-in-python-in-1-line/?envType=study-plan&id=data-structure-i&orderBy=most_votes&languageTags=python3) 해당 글을 참고했습니다.)

왼쪽의 가장 깊은 노드 부터 inorder 순서로 리스트로 만들면 끝!

### ✅ 최종 Solution

```python
def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
  def inorderDfs(node):
    if not node: return
    if node.left:
      inorderDfs(node.left)
    path.append(node.val)
    if node.right:
      inorderDfs(node.right)

  path = []
  inorderDfs(root)
  return path
```

`dfs`를 활용하여 재귀로 간단하게 풀 수 있었습니다.
<br>
inorder 순서대로 `dfs` 내에서 왼쪽 가장 깊이 들어간 후에 Node, Right 순서대로 진행하게 됩니다!

