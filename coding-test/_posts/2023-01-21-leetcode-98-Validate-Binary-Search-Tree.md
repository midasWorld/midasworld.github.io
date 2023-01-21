---
layout: post
title: [leetcode] 98. Validate Binary Search Tree
description: >
  올바른 BST 인지 판별하시오! 
sitemap: false
---

룰루

### 문제
> 98. Validate Binary Search Tree 문제 링크](https://leetcode.com/problems/validate-binary-search-tree/description/?envType=study-plan&id=data-structure-i)

올바른 BST 인지 판별하시오!

![image](https://user-images.githubusercontent.com/93169519/231334574-9d010410-986b-4110-88c2-f16b097bfaa1.png)

```text
# Example 1:
Input: root = [2,1,3]
Output: true
```

2의 왼쪽엔 작은 1, 오른쪽은 큰 3이 있으므로 올바릅니다. 👍

---

![image](https://user-images.githubusercontent.com/93169519/231334559-6efb3ccc-5fb3-4ab2-9f25-185499279936.png)

```text
# Example 1:
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.
```

5의 오른쪽 노드인 4가 5보다 작으므로 올바르지 않습니다!

### ✅ 해결 방법 찾아보기

![image](https://user-images.githubusercontent.com/93169519/231334542-d8905517-3839-4d60-b145-c6c527bb7a80.png)

```text
# Example 1:
Input: root = [5,4,6,null,null,3,7]
Output: false
```

테스트 케이스에서 위에서 실패 했습니다.
<br>
저게 왜 문제지...? 했는데 Discussion 란에 저와 같이 질문한 사람이 있었습니다.
<br>
> ❗️ 문제는 Root의 5의 오른쪽 노드에는 모두 5보다 큰 수만 있어야 되는 것입니다.
> <br>
> → 5의 오른쪽 하위 노드들 중에 3이 있는 것이 문제인 것이죠!

이를 위해 lower, upper 두 개의 변수를 사용했습니다.
<br>
- 오른쪽 노드를 검사할 때는 루트보다 커야 되므로 lower 를 갱신해주고,
- 왼쪽 노드를 검사할 때는 루트보다 작아야 하므로 upper 를 갱신해주는 것이죠!
<br>
- (lower < node.val < upper 로 검사 할 수 있도록 합니다.)

이를 코드로 구현해 보면 아래와 같습니다.

### ✅ 최종 Solution

```python
def isValidBST(self, root: Optional[TreeNode]) -> bool:
  def dfs(node, lower, upper):
    if not node: return True
    if lower < node.val < upper:
      return dfs(node.left, lower, node.val) and dfs(node.right, node.val, upper)
    else:
      return False
  return dfs(root, -sys.maxsize, sys.maxsize)
```


