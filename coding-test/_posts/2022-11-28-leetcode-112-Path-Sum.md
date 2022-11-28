---
layout: post
title: [leetcode] 112. Path Sum
description: >
  root 부터 마지막 노드까지의 합 중에 대상 숫자가 있는지 판별하시오! 
sitemap: false
---

Tree 문제... 🎋

### 문제
> [112. Path Sum 문제 링크](https://leetcode.com/problems/path-sum/description/)

root 부터 마지막 노드까지의 합 중에 대상 숫자가 있는지 판별하시오!

![image](https://user-images.githubusercontent.com/93169519/231185675-1f3a5b36-b161-401a-a060-8826191b3fed.png)

```text
# Example 1:
Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true
Explanation: The root-to-leaf path with the target sum is shown.
```

위의 예제에서는 5-4-11-2 의 경로(root-to-leaf)가 있어 합이 타겟인 22와 같기 때문에 True 를 반환합니다.
<br>
(❗️ 중간까지가 아닌 무조건 마지막 노드까지의 합만 가능합니다.)
<br>
결국엔 마지막 노드까지 있는 합인 모든 경우의 수를 구하는 수 밖에 없는 듯한 문제 였습니다. 

### ✅ 최종 Solution

```python
def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
  if not root:
    return False
  if not root.left and not root.right:
    return targetSum == root.val
  return self.hasPathSum(root.left, targetSum - root.val) or self.hasPathSum(root.right, targetSum - root.val)
```

코드를 보시면 알 수 있듯이 재귀를 이용해서 풀었습니다.
<br>
하위 노드는 left, right 두개 이기 때문에 마지막 경로까지 반복하여 그 합이 누적되도록 하고, 그 합이 target 과 같다면 `True`를 반환하도록 하였습니다.
<br>
마지막 return 구문을 보시면 `or`을 사용해서 수 많은 경로중에서 정답인 것이 하나라도 있다면 `True` 반환할 수 있도록 하였습니다.