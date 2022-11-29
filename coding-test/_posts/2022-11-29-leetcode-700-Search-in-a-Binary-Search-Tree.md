---
layout: post
title: [leetcode] 700. Search in a Binary Search Tree
description: >
  BST 에서 주어지는 숫자를 찾아라!
sitemap: false
---

Tree 문제.. 🎋

### 문제
> [700. Search in a Binary Search Tree 문제 링크](https://leetcode.com/problems/search-in-a-binary-search-tree/?envType=study-plan&id=data-structure-i)

BST 에서 주어지는 숫자를 찾아라!

![image](https://user-images.githubusercontent.com/93169519/231190278-6c886b27-fe4f-4b1d-862f-abb52b6036d7.png)

```text
# Example 1:
Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]
```

단순하게 노드에서 `val`에 해당하는 값이 있다면 해당 노드를 반환하면 됩니다.


### ✅ 최종 Solution

간단하게 재귀를 이용해서 풀었으며, 왼쪽 오른쪽 각각 재귀로 반복하게하여 해당 값이 있다면 노드를 반환하도록 구성했습니다.

```python
def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
  if not root: return None
  if root.val == val:
    return root
  return self.searchBST(root.left, val) or self.searchBST(root.right, val)
```


