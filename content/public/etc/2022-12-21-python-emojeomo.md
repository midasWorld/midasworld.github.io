---
title: "파이썬 이모저모"
description: "파이썬 이모저모"
date: "2022-12-21"
category: "etc"
---
파이썬 공부 필기용

## self 이해하기

### 🔖 참고 사이트
- [[Re:Python] 1. self 이해하기](https://velog.io/@magnoliarfsit/RePython-1.-self-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)

## PriorityQueue vs heapq
PriorityQueue vs heapq 차이점을 알아보겠습니다.

### CPython - PriorityQueue 클래스 일부
```python
class PriorityQueue:
    ...
    def _put(self, item):
        heappush(self.queue, item)
        
    def _get(self):
        return heappop(self.queue)
```

### 차이점은 스레드 세이프(Thread-Safe)

> 스레드 세이프(Thread-Safe)?
> <br>
> 멀티 스레드에도 안전한 프로그래밍의 개념. 
> <br>
> 만약 스레드 세이프하지 않은 경우 1번 스레드의 값이 2번 스레드에서 변경될 수 있어 문제가 발생한다.

파이썬은 GIL의 특성상 멀티 스레딩이 거의 없기 때문에 대부분 멀티 프로세싱으로 활용한다는 점을 생각해본다면...
<br>
멀티 스레딩 지원은 사실 큰 의미를 없습니다.
<br>
또한 스레드 세이프를 보장한다는 것은 내부적으로 락킹(Locking)을 제공한다는 의미로
<br>
락킹 오버헤드(Locking Overhead)가 발생해 성능에 영향을 끼칩니다.

따라서 굳이 멀티 스레드로 구현할 것이 아니라면 `PriorityQueue` 모듈을 사용할 필요가 없습니다.
<br>
(실무에서도 우선순위 큐는 대부분 `heapq`로 구현을 하고 있다고 합니다. 🤔)

## zip() & *(아스테리스크)

### zip() 함수
2개 이상의 시퀀스를 짧은 길이를 기준으로 일대일 대응하는 새로운 튜플 시퀀스를 만드는 함수

```python
a = [1, 2, 3, 4, 5]
b = [2, 3, 4, 5]
c = [3, 4, 5]
zip(a, b)

list(zip(a, b))
[(1, 2), (2, 3), (3, 4), (4, 5)]

list(zip(a, b, c))
[(1, 2, 3), (2, 3, 4), (3, 4, 5)]
```

zip() 결과 자체는 리스트 시퀀스가 아닌 튜플 시퀀스를 만들기 때문에, 값을 변경하는 것이 불가능 합니다.
<br>
(== 불변(Immutable) 객체)

```python
a = [1, 2, 3, 4, 5]
b = [2, 3, 4, 5]
c = [3, 4, 5]

d = list(zip(a, b, c))

print(d[0][0])

d[0][0] = 0

# >> 실행 결과!
1
Traceback (most recent call last):
  File "/Users/midas/Desktop/Study/Python/CodingInterview/interview/해시테이블/Sample.py", line 9, in <module>
    d[0][0] = 0
TypeError: 'tuple' object does not support item assignment

Process finished with exit code 1
```

위와 같이 `zip()`의 값을 변경 하려고하면 `TypeError`가 발생합니다.

> 이처럼 `zip()`은 여러 시퀀스에서 동일한 인덱스의 아이템을 순서대로 추출하여 튜플로 만들어줍니다.

### 아스테리스크(*)
C 언어의 포인터 변수와 혼동될 수 있으나 **파이썬에는 포인터가 존재하지 않습니다.**
<br>
파이썬에서 *는 언팩(Unpack) 입니다.
<br>
시퀀스 언패킹 연산자(Sequence Unpacking Operator)로 말 그대로 시퀀스를 풀어헤치는 연산자입니다.
<br>
주로 튜플이나 리스트를 언패킹하는 데 사용됩니다.

```python
import collections

nums = [1, 1, 1, 2, 2, 3]
result = collections.Counter(nums).most_common(2)

print(result) # 1
[(1, 3), (2, 2)]

print(list(zip(result))) # 2
[((1, 3),), ((2, 2),)]

print(list(zip(*result))) # 3
[(1, 2), (3, 2)]
```
위와 같이 Counter... 의 결과를 `zip()`으로 바로 묶으면 2번과 같이 엉뚱한 결과가 나오게 됩니다.
<br>
이는 *로 언패킹을 해줘야 원하는 값을 얻을 수 있습니다.

예제를 더 살펴보겠습니다.
```python
fruits = ['lemon', 'pear', 'watermelon', 'tomato']

for f in fruits: # 1
    print(f, end=' ')
    
print(*fruits) # 2
```
각 요소를 출력하는 방법은 1번과 같이 for 문을 사용해야 하지만...
<br>
놀랍게도 *로 언패킹을 해줘도 같은 결과가 출력됩니다!

이외에도 *는 활용도가 많다고 하는데요.
```python
date_info = {'year': '2020', 'month': '01', 'day': '7'}
new_info = {**date_info, 'day': '14'}

print(new_info)
{'year': '2020', 'month': '01', 'day': '14'}
```
위와 같이 `**date_info`에 모든 요소를 언패킹 할 수 있고,
<br>
`day`가 14로 업데이트 된것을 확인할 수 있습니다.

## 객체 복사
> 파이썬의 중요한 특징 중 하나!
> <br>
> 모든것이 객체이다!

위와 글과 같이 파이썬은 모든 것이 객체 입니다.
<br>
숫자, 문자까지도 객체죠. 🕺

숫자, 문자가 리스트, 딕셔너리와 같은 객체와 차이점은 **불변 객체**라는 것 뿐입니다.
<br>
그래서 별도로 값을 복사하지 않으면, 변수에 값을 할당하는 모든 행위는 값 객체에 대한 참조가 됩니다.
<br>
이는 즉 참조가 가리키는 원래의 값을 변경하면 모든 참조, 모든 변수의 값 또한 함께 변경됨을 말합니다.

그렇다면 참조가 되지 않도록 값 자체를 복사하는 방법은 무엇이 있을까요? 🤔
<br>
가장 간단한 방법이 `[:]` 슬라이스를 사용하는 것입니다.
```python
a = [1, 2, 3]
b = a
c = a[:]
print(id(a), id(b), id(c))
# 4312361728 4312361728 4312236800
```
[:]로 처리한 변수 c는 다른 ID를 갖는 것을 알 수 있습니다.
<br>
즉 참조 처리된 b는 a와 동일한 ID를 갖지만, 변수 c는 값 자체가 복사되어 새로운 객체가 되었습니다.

이외에도 `copy()` 메서드를 사용하는 방법이 있습니다.
<br>
(좀 더 직관적임 💁‍♂️)
```python
a = [1, 2, 3]
b = a
c = a[:]
d = a.copy()
print(id(a), id(b), id(c), id(d))
# 4344310272 4344310272 4344185408 4344308800
```
위와 같이 변수 d 또한 다른 ID를 갖는 것을 확인할 수 있었습니다.
<br>
(== 값이 복사되어 새로운 객체가 생성되었다.)

간단한 리스트의 경우에는 위와 같이 `[:]`와 `copy()`로 할 수 있지만,
<br>
복잡한 리스트의 경우에는 다음과 같이 `copy.deepcopy()` 사용해야 합니다.

```python
import copy
a = [1, 2, [3, 5], 4]
b = a
c = a[:]
d = copy.deepcopy(a)
print(id(a), id(a[2]), a) # 4376593536 4376586048 [1, 2, [3, 5], 4]
print(id(b), id(b[2]), b) # 4376593536 4376586048 [1, 2, [3, 5], 4]
print(id(c), id(c[2]), c) # 4376586880 4376586048 [1, 2, [3, 5], 4]
print(id(d), id(d[2]), d) # 4376586624 4376587584 [1, 2, [3, 5], 4]
```
자.. 위의 것을 차근차근 살펴보면... 🫠
<br>
1. `=` 연산자로 생성된 b는 a, [3, 5]까지 주소가 같은 것을 확인할 수 있습니다.
2. `[:]` 메서드로 생성된 c는 a는 주소가 다르지만, **내부의 [3, 5]는 주소가 같은 것을 확인할 수 있습니다.**
3. `copy.deepcopy()`로 생성된 d가 되어서야, a 뿐만 아니라 [3, 5]도 주소가 새롭게 생성된 것을 확인할 수 있습니다.

> 즉 2차원 리스트 이상의 경우 객체를 복사하기 위해서는 `copy.deepcopy()`를 사용해야 합니다.