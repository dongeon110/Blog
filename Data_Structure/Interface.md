# Interface  
with Java

## ArrayList vs LinkedList  
자바 List 인터페이스에는 두 가지 구현을 제공합니다.  

어떤 동작은 ArrayList가 빠르거나 저장공간을 적게 사용하고  
어떤 동작은 LinkedList가 빠르거나 메모리 사용량이 적습니다.  
어느것이 더 좋을지는 수행하는 동작에 달렸습니다.

java.lang 패키지에 정의된 Comparable interface의 소스 코드는 다음과 같습니다.
```java
public interface Comparable<T> {
    public int compareTo(T o);
}
```
이 인터페이스는 타입 파라미터인 T를 사용하여 Comparable이라는 제네릭 타입을 정의합니다.  
이 interface를 구현하려면 클래스는 다음과 같아야 합니다.  
- T 타입을 명시해야 합니다.  
- T 타입 객체를 인자로 받고 int를 반환하는 compareTo() 메서드를 제공해야 합니다.  

예컨대, java.lang.Integer 클래스의 소스코드는 다음과 같습니다.  
```java
public final class Integer extends Number implements Comparable<Integer> {
    public int compareTo(Integer anotherInteger) {
        int thisVal = this.value;
        int anotherVal = anotherInteger.value;
        return (thisVal<anotherVal ? -1 : (thisVal == anotherVal ? 0 : 1)>);
    }
// 다른 메서드는 생략
}
```
이 클래스는 Number클래스를 확장합니다.






## Tree
