# SpringBootApplication  
스프링부트 프로젝트의 메인 클래스  
```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringbootApplication;

@SpringbootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```
@SpringBootApplication 으로 인해 스프링부트의 자동 설정, 스프링 Bean 읽기와 생성을 모두 자동으로 설정 됩니다.  
때문에, 이 클래스는 항상 **프로젝트의 최상단에 위치**해야만 합니다.  

main 메소드에서 실행하는 SpringApplication.run으로 인해 내장 WAS를 실행합니다.  
이로 인해 항상 서버에서 톰캣을 설치할 필요가 없게 되고, 스프링 부트로 만들어진 Jar 파일(실행가능한 Java패키징 파일)로 실행하면 됩니다.  

꼭 스프링 부트에서만 내장 WAS를 사용할 수 있는 것은 아니지만,  
스프링 부트에서는 내장 WAS를 사용하는 것을 권장하고 있습니다.  
이유는, **'언제 어디서나 같은 환경에서 스프링 부트를 배포'**할 수 있기 때문입니다.  

외장 WAS를 쓴다고 하면 모든 서버는 WAS의 종류와 버전, 설정을 일치시켜야만 합니다.  
시간이 많이 걸리고 실수할 여지도 많기 때문에 내장 WAS 사용을 권장합니다.  
