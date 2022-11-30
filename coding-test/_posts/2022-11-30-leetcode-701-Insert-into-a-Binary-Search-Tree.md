---
layout: post
title: [leetcode] 701. Insert into a Binary Search Tree
description: >
  BST 에 주어진 값의 노드 추가하기!
sitemap: false
---

Tree 문제... 🎋

### 문제
> [701. Insert into a Binary Search Tree 문제 링크](https://leetcode.com/problems/insert-into-a-binary-search-tree/description/?envType=study-plan&id=data-structure-i)

BST 에 주어진 값의 노드 추가하기!

![image](https://user-images.githubusercontent.com/93169519/231196434-8bfbeaa6-0397-4a63-b34f-0938388820ee.png)

```text
# Example 1:
Input: root = [4,2,7,1,3], val = 5
Output: [4,2,7,1,3,5]
Explanation: Another accepted tree is:
```

먼저 Binary Search Tree 특성에 대해 알아보자면...
> **🤔 Binary Search Tree 특성**
> 1. 모든 노드의 키는 중복되지 않는다. (중복되는 숫자가 없다!)
> 2. 루트 노드의 왼쪽 서브 트리는 해당 노드의 키보다 작은 값을 갖는다. (root > root.left)
> 3. 루트 노드의 오른쪽 서브 트리는 해당 노드의 키보다 큰 값을 갖는다. (root < root.right )

즉슨 root.left < root < root.right 로 이루어져 있습니다.
<br>
고로 값의 크기에 따라 적절한 곳에 노드를 만들어 연결해주면 됩니다.


### ✅ 최종 Solution

중복되지 않고 값에 따라 들어갈 위치가 정해져 있기 때문에 걱정없이 재귀를 사용했습니다.
<br>
빈 상태로 받으면 노드를 생성해줘야 되기 때문에 TreeNode 를 만들어 반환되도록 하고,
<br>
비교 연산자에 의해서 각 left or right에 하위 노드에 들어갈 수 있도록 반복해주면 끝입니다. 

```python
def insertIntoBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
  if not root: 
    return TreeNode(val)
  
  if root.val > val:
    root.left = self.insertIntoBST(root.left, val)
  else:
    root.right = self.insertIntoBST(root.right, val)

  return root
```

