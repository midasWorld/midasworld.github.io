---
layout: post
title: 리트코드 145. Binary Tree Postorder Traversal
description: >
  이진 트리의 순회(postorder traversal) 리스트를 반환하시오!
sitemap: false
---

Tree 문제... 🎋

### 문제
> [145. Binary Tree Postorder Traversal 문제 링크](https://leetcode.com/problems/binary-tree-postorder-traversal/?envType=study-plan&id=data-structure-i)

이진 트리의 순회(postorder traversal) 해보아라!

![image](https://user-images.githubusercontent.com/93169519/230949050-0dd6540c-0ce5-4513-8653-217eb1afaad7.png)

```text
# Example 1:
Input: root = [1,null,2,3]
Output: [1,3,2]
```

---

> 🤔 order 방식 중 `postorder`는?
> <br>
> LEFT → RIGHT → NODE

![image](https://user-images.githubusercontent.com/93169519/230957566-f4a7f52e-46be-4b77-bfa7-bcce180d210c.png)

위의 그림의 노드를 postorder 순서로 진행하면? [1, 2, 3, 4, 5]가 됩니다.
<br>
([✨ All DFS traversals (preorder, inorder, postorder) in Python in 1 line](https://leetcode.com/problems/binary-tree-inorder-traversal/solutions/283746/all-dfs-traversals-preorder-inorder-postorder-in-python-in-1-line/?envType=study-plan&id=data-structure-i&orderBy=most_votes&languageTags=python3) 해당 글을 참고했습니다.)


### ✅ 최종 Solution

L→R→N 순서로 하는 것 보다 차라리 반대로 진행을 한 다음에...
<br>
리스트를 반대로 출력하는게 가장 간단한 방법이라는 것을 헤매이다 찾아냈습니다. 🫠

고로 N→R→L 순서로 진행을 해보면 root 부터 오른쪽 왼쪽 순서대로 반복하여 리스트를 만들면 됩니다!
<br>
코드는 아래와 같습니다.

```python
def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
  def dfs(node):
    if not node: return
    ans.append(node.val)
    dfs(node.right)
    dfs(node.left)
  ans = []
  dfs(root)
  return ans[::-1]
```


