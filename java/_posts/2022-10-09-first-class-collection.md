---
layout: post
title: 일급 컬렉션 사용 후기
description: >
  일급 컬렉션 소개와 사용해야 되는 이유
sitemap: false
---

우아한 테크 pro 사전 과제를 하면서 사용하게 된 일급 컬렉션에 대해서 찾아보고 정리한 글 입니다.

## 일급 컬렉이란?

> 일급 컬렉션은 Collection을 Wrapping 하면서, Wrapping한 Collection 외 다른 멤버 변수가 없는 상태를 말한다.
> <br>
> ※ [소트웍스 앤솔로지의 객체지향 생활체조 규칙8. 일급 컬렉션 사용](https://developerfarm.wordpress.com/2012/02/01/object_calisthenics_/)에서 언급되었다.

사전 과제는 여러 자동차를 경주시켜서 우승자를 뽑는 게임을 구현하는 부분이었습니다.
(시도 횟수 입력 받음 → 횟수 동안 각 자동차는 랜덤으로 숫자를 받아 FORWARD(4)를 넘으면 전진, 아래면 멈춤을 반복!)

```java
class Car {
    private static final int FORWARD_NUM = 4;

    private String name;
    private int position;

    public void move() {
        if (getRandom() >= FORWARD_NUM)
            this.position++;
    }

    private getRandom() {
        // 랜덤 번호(0 ~ 9) 생성
    }
}
```

여러 자동차들을 한번에 전진 시키기 위해서는 List 생성하고, for 문을 써야 됩니다.
<br>
각 자동차들의 상태와 move 로직을 한번에 관리하기 위해서 일급 컬렉션을 사용하는 것이었습니다.

```java
public class Cars {
	private final List<Car> cars;

        // 👾 1. 생성자 ISSUE 부분
	public Cars(final List<Car> cars) {
		this.cars = cars;
	}

	public void move() {
		for (Car car : cars) {
			car.move();
		}
	}
	...

	// 👾 2. Getter ISSUE 부분
	public List<Car> getCars() {
		return cars;
	}
}
```

[일급 컬렉션 (First Class Collection)의 소개와 써야할 이유](https://jojoldu.tistory.com/412)에서는 4가지의 장점을 소개하고 있습니다.

1. 비지니스에 종속적인 자료구조
2. 불변
3. 상태와 행위를 한곳에서 관리
4. 이름이 있는 컬렉션
   위의 글에서는 4번에서 네이버페이와 카카오페이를 예시로 드는 부분이 있어 좀 더 명확하게 장점을 알 수 있으니 참고 바랍니다.

하지만 Cars 클래스에서는 1, 3, 4번의 장점을 사용할 수 있었지만 불변성에 대해서는 지키지 못했습니다.

### 👾 1. 생성자 ISSUE 부분

```java
List<Car> carList = new ArrayList<>();
carList.add(new Car("dooly"));
Cars cars = new Cars(carList);

// 👇 이 부분! → cars 도 함께 적용 😓
carList.add(new Car("hoit"));
```

이 부분에서 cars가 외부의 carList를 이용해서 변경에 함께 적용되게 됩니다.
<br>
(cars : 'hoit' 자동차가 추가)

### 👾 2. Getter ISSUE 부분

```java
List<Car> carList = new ArrayList<>();
carList.add(new Car("dooly"));
Cars cars = new Cars(carList);

// 👇 이 부분! → cars 도 함께 적용 😓
cars.getCars().add(new Car("hoit"));
```

이 부분 또한 getCars() 로 받아온 List는 외부 요인 입니다. 여기서 추가를 해도 함께 적용되는 문제가 발생합니다. 🫠

> 즉 위의 Cars 클래스는 **불변성을 지킬 수가 없습니다.** > <br>
> 이를 위해서 일급 컬렉션의 불변성을 위해 코드를 수정해야 합니다.

## 🪄 ISSUE 부분 해결하기 (불변성 지키기)

```java
public class Cars {
	private final List<Car> cars;

        // 🪄 1. 생성자 ISSUE 부분 해결 → 불변성 보장
	public Cars(final List<Car> cars) {
		this.cars = new ArrayList<>(cars);
	}

	public void move() {
		for (Car car : cars) {
			car.move();
		}
	}
	...

	// 🪄 2. Getter ISSUE 부분 해결 → 불변성 보장
	public List<Car> getCars() {
		return Collections.unmodifiableList(cars);
	}
}
```

위와 같이 생성자 부분에서 List를 새로 생성함으로써 매개변수로 받은 리스트와 단절시켜 불변성을 지킬 수 있고,
<br>
Getter 메서드의 경우는 [Collections.unmodifiableList 메서드](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#unmodifiableList-java.util.List-)를 이용해서 수정 불가능 하도록 반환하여 불변성을 지킬 수 있습니다.
<br>
(unmodifiableList로 반환된 리스트를 수정하려고 하면 UnsupportedOperationException이 발생합니다.)

> 불변이 꼭 필수가 아닐지도 모르겠지만,
> <br>
> 정보를 최대한 불변성으로 가져가는 것이 의도치 못한 변경을 막을 수 있으므로 할 수 있다면 최대한 가져가야 합니다.

여기까지가 일급 컬렉션 사용 후기였습니다.

## 🔖 참고 사이트

- [일급 컬렉션 (First Class Collection)의 소개와 써야할 이유](https://jojoldu.tistory.com/412)
- [일급 컬렉션을 사용하는 이유](https://tecoble.techcourse.co.kr/post/2020-05-08-First-Class-Collection/)
