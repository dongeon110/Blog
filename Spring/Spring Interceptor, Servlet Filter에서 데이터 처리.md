# Spring Interceptor(혹은 Servlet Filter)에서 POST 방식으로 전달된 JSON 데이터 처리하기  

[스프링 레거시 게시판](https://github.com/dongeon110/Spring_Legacy)인 Spring_Board를 진행하는 와중에  
조회수 중복 방지를 위한 쿠키를 만들 필요가 있었다.  
이전에 Servlet으로 구현해보았던 기능이었기에 어렵지 않게 해낼 수 있을 거라고 생각했지만 꽤 어렵고 오래 걸려서 해결을 했다.  
그래서 해결하는 과정에서 알게 된 것들을 정리해보고자 한다.  
- - -
## 기존에 알고 있었던 것  
이전에 [Servlet](https://github.com/dongeon110/Making_Web_Board)으로 만들었을 때에는  
프론트 컨트롤러인 DispatcherServlet을 직접 구현했고, HashMap으로 model을 만들어 request와 response의 역할을 하게 했다.  

기존에 구현했던 방식은  
1. DispatcherServlet 에서 request.getCookies() 메서드를 이용해 쿠키 리스트를 읽는다.  
2. model에 넣어서 읽은 쿠키 리스트를 넘겨준다.  
3. 쿠키를 사용할 Controller 에서 쿠키 리스트를 읽는다.  
4. 쿠키를 읽고, 만일 생성한다면 다시 생성하고, 리스트에 넣어서 다시 model에 넣어준다.  
5. DispatcherServlet에서 다시 읽어서 response.addCookie() 메서드를 통해 새로 생겨난 쿠키들을 추가해준다.  

위의 과정을 통해 쿠키를 처리했다.  
- - -
### 다른 방식을 생각한 이유  
Spring에서는 이미 DispatcherServlet을 만들어서 제공을 하고 있고, 나는 그것을 web.xml에서 서블릿 선언과 url-pattern 매핑을 해서 사용해주기만 해도 충분했다.  
```xml
<servlet>
    <servlet-name>appServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    ...
</servlet>

<servlet-mapping>
    <servlet-name>appServlet</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

기존에 구현했던 방식을 사용하려면,  
저 DispatcherServlet을 확장한 새로운 DispatcherServlet을 만들어 service()를 오버라이딩함으로서 사용할 수 있었다.  

하지만, 그렇게 하게 되면, Spring이 버전이 업데이트가 되어감에 따라 만약 DispatcherServlet의 service()에 변화가 생긴다면, 오버라이딩 한 부분을 다시 수정해주어야 하는 번거로움이 생길 것 같다는 생각이 들었다.  

그래서 그럴 필요없이 따로 분리하여 사용할 수 있는 방법을 찾아보았다.  
- - -
## 과정  

처음엔 단순히 Spring model과 HttpServletResponse를 함께 받아서 바인딩하게 하면 될 줄 알았는데 전혀 그렇지 않았다.  
```java
public void view(Model model, HttpServletResponse response, ...) {
    ...
}
```
기존에 잘 동작하던 페이지에는 아무것도 출력되지 않았다.  

알아보던 중에 다음과 같은 자료를 찾게 되었다.  
> HttpServletRequest의 InputStream은 한 번 읽으면 다시 읽을 수 없습니다.  
> 톰캣 개발자님들께서 친히 막아두셨기 때문이죠!  

그래서 나는 이 원인이 model로 이미 request와 response의 역할을 대신 하게끔 읽어서 수행했음에도 또 response를 읽으려고 해서 발생한 문제라고 생각했다.  

javax.servlet.http 패키지에는 HttpServletRequest을 래핑할 때 쓰라고 미리 준비해둔 HttpServletRequestWrapper라는 wrapper클래스가 이미 있었다.  
그래서 `Interceptor`를 통해 Controller에서 사용하기 전에 가로채서 Wrapper로 사용하고 읽은 데이터를 다시 넘겨주도록 하려고 했다.  
- - -
### `Interceptor`에서 wrapper클래스를 사용하면..  
Spring Interceptor를 만들면 Spring의 DispatcherServlet에서 Interceptor를 핸들링 하게 된다.  

만약 Interceptor 내에서 wrapper를 만들어서 preHandle()에 넘겨주게되면 이후 Spring이 데이터를 바인딩할 때 결국 Stream이 닫혔다는 메시지를 다시 만나게된다.  

그 원인은 Interceptor가 DispatcherServlet의 doDispatch메서드 내에서 열심히 for loop를 돌면서 실행된 뒤에 다음 구문에서 데이터 바인딩을 하러 가기 때문이다.  
다시 말하면, Interceptor 내에서 preHandle()으로 넘겨준 request 객체가 데이터 바인딩 작업을 하러 갈때는 call by value에 따라 이미 사라지고 없다는 의미이다.  

따라서, DispatcherServlet으로 가기 전인 ServletFilter에서 부터 wrapper클래스로 전환해주어야 정상작동하게 된다.  
- - -
### `Filter`에서 wrapper클래스를 사용하면..  
Filter에서 작업을 하려고 하니 예상문제가 있었다.  
내 프로젝트에서는 스프링 Security가 Interceptor에서 동작하고 있었다는 점이다.  
내가 하려는 작업은 단순히 쿠키를 만들고 읽음에 따라 Controller에서 Service의 메서드를 동작 하냐 안하냐를 결정하는 것이다.  
그런데 시큐리티가 동작하기 전에 쿠키를 만들거나 작업을 해버리면, 시큐리티에 의해 거절된 접근임에도 조회수 쿠키가 생성되거나 하는 문제가 발생할 수 있을 것이라 생각했다.  

그래서 생각한 것은 필터와 인터셉터 둘 다 동작해서 처리하는 방식을 생각했다.  
너무 번거로워서 다른 방법이 있을 것 같다라는 생각을 하는 데 참고자료에서 내게 마지막 힌트를 주었다.  

> 사실 `Spring AOP와 같은 방식`을 사용한다면 전혀 문제될 것이 없었지만, API 서버에 대한 접근권한을 판단하는 작업이다보니 ...

기존에 AOP에 대한 개념은 `관점 지향, 공통 코드`로 분리하는 것 이라고 이해하고 있었고, AOP를 공부 할 때에도 대부분 코드에 로깅작업을 공통부분으로 분리해내는 데 사용했기 때문에 생각하지 못했었다.  

비록 AOP의 관점에서 보기엔 적용하기 적합하지 않을 수도 있지만, AOP를 직접 내가 원하는대로 적용해보기도 할 겸 AOP를 적용해보기로 했다.  
- - -
## AOP Advice  

AOP에 대한 개념은 따로 정리.  



- - -
## 참고자료  
https://meetup.toast.com/posts/44