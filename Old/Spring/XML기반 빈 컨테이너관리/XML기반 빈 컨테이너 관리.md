# XML 기반 빈 컨테이너 관리  


## 클래스 준비
먼저 사용할 클래스를 정의해주도록 하겠습니다.  

```java
public class Score {
    String      name;
    float       kor;
    float       eng;
    float       math;

    public Score(){}

    public Score(String name, float kor, float eng, float math) {
        this.name = name;
        this.kor = kor;
        this.eng = eng;
        this.math = math;
    }

    public float average() {
        return sum() / (float) 3;
    }

    public float sum() {
        return kor + eng + math;
    }

    // getter, setter method
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getKor() {
        return kor;
    }

    public void setKor(float kor) {
        this.kor = kor;
    }

    public float getEng() {
        return eng;
    }

    public void setEng(float eng) {
        this eng = eng;
    }

    public float getMath() {
        return math;
    }

    public void setMath(float math) {
        this.math = math;
    }
}
```

## XML 준비
다음은 빈 설정 XML 파일을 준비하겠습니다.  
beans.xml 파일을 하나 만들어서 다음과 같이 작성하겠습니다.  
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
        http://www.springframework.org/schema/beans/spring-beans.xsd">
    
    <bean id="score" class="exam.test.Score"/>
</beans>
```  

먼저 하나씩 살펴보겠습니다.  

- - -

```xml
<beans xmlns="http://springframework.org/schema/beans">
</beans>
```  
beans 태그는 http://www.springframework.org/schema/beans 네임스페이스에 소속되어 있기 때문에 XML 파서가 이해할 수 있도록 네임스페이스를 밝혀야 합니다.  
자바 클래스를 사용하기전 import 하는 것과 비슷합니다.  

- - -

```xml
<bean id="score" class="exam.test.Score"/>
```
네임스페이스를 정의한 XML 스키마 파일의 위치를 저장합니다.  
class는 위에서 준비한 Score클래스 경로입니다.

이것을 자바 코드로 표현하면  
```java
new exam.test.Score();
```
로 표현할 수 있습니다.

## 스프링 IoC 컨테이너 사용  

다음은 ClassPathXmlApplicationContext 클래스를 사용하여 IoC 컨테이너를 준비하겠습니다.  
IoC 컨테이너는 빈 설정 파일에 선언된 대로 인스턴스를 생성하여 객체 풀(pool)에 보관합니다.  

한번 Test.java 로 확인하겠습니다.  
```java
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test {
    public statci void main(String[] args) {
        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("exam/test/beans.xml");

        Score score = (Score) ctx.getBean("score");

        System.out.println("합계:" + score.sum());
        System.out.println("평균:" + score.average());
    }
}
```
실행해보면 합계, 평균 모두 0.0 으로 출력됩니다.  
이는 점수를 할당하지 않았기 때문이기 때문에 0.0이 출력 된 것이고, 메서드는 정상적으로 호출한 것을 확인 할 수 있습니다.  

- - -
beans.xml 에서  
\<bean id="```score```" class="exam.test.Score"\/>  
Test.java 에서
(Score) ctx.getBean("```score```");  

여기서 반환된 타입은 Object이기 때문에 객체를 사용하기 위해서는 형변환 해주어야 합니다.  