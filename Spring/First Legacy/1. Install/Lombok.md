# Lombok  

<!--
스프링 레거시 프로젝트에서 롬복을 설치하기 위해 직접 .jar파일을 받아서 사용하였습니다.  
[롬복 홈페이지](https://projectlombok.org)에서 Download 페이지로 들어가 .jar 파일로 받을 수 있습니다.  

롬복 설치 받은 경로에서  
명령 프롬포트창에 ```java -jar lombok.jar```와 같은 명령어를 통해 실행할 수 있습니다.  

실행 시, 화면에서는 필요한 IDE를 선택할 수 있습니다.  
만일 찾지 못하는 경우 지정해서 설치합니다.  
-->
## Install
1. Intellij 플러그인에서 lombok을 설치합니다.  
2. Maven프로젝트의 pom.xml에 아래 코드를 추가합니다.  
```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.0</version>
    <scope>provided</scope>
</dependency>
```
3. xml 새로고침과 함께 pom.xml을 적용시킵니다.  
4. java 코드에 import 가능  
- - -
## Lombok  
Lombok을 간단히 설명하면 컴파일 시 흔하게 코드를 작성하는 기능들을 완성해주는 라이브러리 입니다.  

- ```@Setter```  
```@Setter``` 어노테이션은 setter 메서드를 만들어주는 역할을 합니다.  
```@Setter```에는 3가지의 속성을 부여해 줄 수 있습니다.  

    - **value**  
    접근 제한 속성을 의미합니다.  
    기본값은 ```lombok.AccessLevel.PUBLIC```  

    - **onMethod**  
    setter 메서드의 생성 시 메서드에 추가할 어노테이션을 지정합니다.(ex @Autowired)  
    코드는 특이하게도 '_'표기가 사용되는데 JDK 버전에 따라 차이가 있습니다.  

    - **onParam**  
    setter 메서드의 파라미터에 어노테이션을 사용하는 경우에 적용합니다.  

- ```@Data```  
```@Data```는 Lombok에서 가장 자주 사용되는 어노테이션입니다.  
```@ToString, @EqualAndHashCode, @Getter/@Setter, @RequiredArgsConstructor```를 모두 결합한 형태로 한번에 자주 사용되는 모든 메서드들을 생성할 수 있다는 장점이 있습니다.  

    만일 세부적인 설정이 필요 없는 경우라면 ```@Data```를 사용합니다.  
- ```@Log4j```  
```@Log4j```어노테이션은 로그 객체를 생성하게 됩니다.  
```@Log4j```는 Log4j 설정을 이용하고, Log4j가 존재하지 않을 경우에는 ```@Log```를 이용할 수 있습니다.  
작성된 코드와 실제 컴파일된 결과는 아래와 같이 달라지게 됩니다.  
```java
@Log
public class LogExample {
}

/* 클래스로 변환된 후 */

public class LogExample {
    private static final java.util.logging.Logger log = java.util.logging.Logger.getLogger(LogExample.class.getName());
}
```  

```@Log```를 클래스 쪽에 붙여주면 내부적으로는 ```static final```로 Logger객체가 생성되므로 개발 시 별도의 로그를 설정할 필요 없이 필요한 코드를 만들어 낼 수 있습니다.  
만일, STS 등 을 이용해서 'Spring Legacy Project'로 생성한 경우에는 기본적으로 Log4j 설정이 있기 때문에 추가적인 설정 없이 @Log4j만으로 로그 객체를 준비할 수 있습니다.  





