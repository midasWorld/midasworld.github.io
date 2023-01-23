---
layout: post
title: 리트코드 104. Maximum Depth of Binary Tree 풀기 완료
description: >
  Binary Tree 최대 깊이 구하기
sitemap: false
---

Tree 문제... 🎋

### 문제
> [104. Maximum Depth of Binary Tree 풀기 완료 문제 링크](https://leetcode.com/problems/binary-tree-level-order-traversal/?envType=study-plan&id=level-1)

Binary Tree → 최대 깊이 구하기!

> 🤔 Binary Tree(이진 트리)?
> <br>
> 자식 노드가 최대 두 개인 노드들로 구성된 트리 입니다.

![image](https://user-images.githubusercontent.com/93169519/230863009-94cf7a63-7198-4a16-b890-40a5710705d2.png)

```text
# Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 3
```

사진을 보면 알 수 있듯이 가장 깊은건  15, 7(3 level)이므로 정답은 3입니다.

### 최종 Solution

결과적으로 가장 깊은 노드까지 반복적으로 내려가며 반복하는 방법 밖에 없는 것 같습니다.

```python
def maxDepth(self, root: Optional[TreeNode]) -> int:
  if not root: return 0

  ans, level = 0, [root]
  while level:
    ans += 1
    LRs = []
    for node in level:
      if node.left:
        LRs.append(node.left)
      if node.right:
        LRs.append(node.right)
    level = LRs
  return ans
```

일단 빈 배열로 들어오면 0을 반환 합니다.
<br>
그리고 나서는 한 단계씩 '비어 있지 않은 하위 노드(left, right)'를 변수 `level`로 전달해서 계속 반복하는 것 뿐입니다.

아래의 `dfs`로 풀어낸 것과 거의 똑같은 속도가 측정되었습니다. 🥸

## Best Solution
이걸 `dfs`로 풀어내니 코드가 이렇게 짧아지는 구나... 싶었습니다. 🤔

```python
def maxDepth(self, root: Optional[TreeNode]) -> int:
  def dfs(root, depth):
    if not root: return depth
    return max(dfs(root.left, depth + 1), dfs(root.right, depth + 1))
                 
  return dfs(root, 0)
```

재귀함수로 계속해서 실행되며 마지막 노드까지 반환하여 `max` 함수로 최대 깊이를 반환하는 깔끔한 코드였습니다. 🧐
