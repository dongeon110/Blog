# Spring Annotation  
스프링에서 주로 사용하는 어노테이션  

## ```@Component```  
```@Component```는 해당 클래스가 스프링에서 객체로 만들어서 관리하는 대상임을 명시하는 어노테이션입니다.  

```@Component```가 있는 클래스를 스프링이 읽어주도록 ```@ComponenetScan```을 통해 지정되면 해당 패키지에 있는 클래스들을 조사하면서 **```@Component```가 존재하는 클래스들을 객체로 생성해서 빈으로 관리**하게 됩니다.  


## ```@Autowired```  
```@Autowired```는 스프링 내부에서 자신이 특정한 객체에 의존적이므로 자신에게 해당 타입의 빈을 주입해주라는 표시입니다.  

예를 들어, Restaurant과 Chef 객체가 있으면 아래처럼 Restaurant객체를 선언할 수 있습니다.  
```Restaurant.class```
```java
@Data
@Component
public class Restaurant {

    @Setter(onMethod_ = @Autowired)
    private Chef chef;
}
```  
```Chef.class```  
```java
@Data
@Component
public class Chef {}
```
여기서 Restaurant 객체는 Chef 타입의 객체가 필요하다는 것을 명시합니다.  

스프링은 ```@Autowired``` 어노테이션을 보고 스프링 내부에 관리되는 객체들 중에 적당한 것이 있는지 확인하고, 자동으로 주입해줍니다.  
만일 필요한 객체가 존재하지 않는다면, 스프링은 제대로 객체를 구성할 수 없기 때문에 에러를 발생합니다.  

만일, Chef 클래스에 ```@Component```가 없다면 Chef 객체를 스프링에서 관리하지 않게 됩니다.  
따라서 실행 시 아래와 같이 Chef 타입의 객체가 없어서 제대로 실행할 수 없게 됩니다.  



