# REST  
REST(Represesntational State Transfer)  

하나의 URI는 하나의 고유한 리소스를 대표하도록 설계된다는 개념에 전송 방식을 결합해서 원하는 작업을 지정합니다.  

예를 들어, '/boards/123'은 게시물 중에서 123번이라는 고유한 의미를 가지도록 설계하고, 이에 대한 처리는 GET, POST 방식과 같이 추가적인 정보를 통해서 결정합니다.  

따라서 REST 방식은 다음과 같이 구성된다고 생각할 수 있습니다.  
```URI``` + ```GET/POST/PUT/DELETE```  
스프링은 ```@RequestMapping```이나 ```@ResponseBody```와 같이 REST 방식의 데이터 처리를 위한 여러 종류의 어노테이션과 기능이 있습니다.  
REST와 관련해서 알아 두어야 하는 어노테이션들은 다음과 같습니다.  

|어노테이션|기능|
|---|---|
|```@RestController```|Controller가 REST방식을 처리하기 위한 것임을 명시|
|```@ResponseBody```|일반적인 JSP와 같은 뷰로 전달되는 게 아니라 데이터 자체를 전달하기 위한 용도|
|```@PathVariable```|URL 경로에 있는 값을 파라미터로 추출하려고 할 때 사용|
|```@CrossOrigin```|Ajax의 크로스 도메인 문제를 해결해주는 어노테이션|
|```@RequestBody```|JSON 데이터를 원하는 타입으로 바인딩 처리|

## ```@RestController```  
Controller가 REST방식을 처리하기 위한 것임을 명시  

기존의 Controller에서 Model에 데이터를 담아서 JSP 등과 같은 뷰(View)로 전달하는 방식이 아니므로 기존의 Controller와는 조금 다르게 동작합니다.  

스프링 4부터는 ```@Controller```외에 ```@RestController```라는 어노테이션을 추가해서 해당 Controller의 모든 메서드의 리턴 타입을 기존과 다르게 처리한다는 것을 명시합니다.  

```@RestController``` 이전에는 ```@Controller```와 메서드 선언부에 ```@ResponseBody```를 이용해서 동일한 결과를 만들 수 있습니다.  

```@RestController```는 메서드의 리턴 타입으로 사용자가 정의한 클래스 타입을 사용할 수 있고, 이를 JSON이나 XML로 자동으로 처리할 수 있습니다.  


### ```@RestController```에서 파라미터  
```@RestController```는 기존의 ```@Controller```에서 사용하던 일반적인 타입이나 사용자가 정의한 타입(클래스)을 사용합니다.  
여기에 추가로 몇 가지 어노테이션을 이용하는 경우가 있습니다.  

- ```@PathVariable``` : 일반 컨트롤러에서도 사용이 가능하지만 REST 방식에서 자주 사용됩니다.  URL 경로의 일부를 파라미터로 사용할 때 이용  
- ```@RequestBody``` : JSON 데이터를 원하는 타입의 객체로 변환해야 하는 경우에 주로 사용

#### ```@PathVariable```  
REST 방식에서는 URL 내에 최대한 많은 정보를 담으려고 노력합니다.  
예전에는 '?'뒤에 추가되는 쿼리 스트링이라는 형태로 파라미터를 이용해서 전달되던 데이터들이 REST 방식에서는 경로의 일부로 차용되는 경우가 많습니다.  

스프링 MVC에서는 @PathVariable 어노테이션을 이용해서 URL 상에 경로의 일부를 파라미터로 사용할 수 있습니다.  

```
http://localhost:9999/sample/{sno}
http://localhost:9999/sample/{sno}/page/{pno}
```
위 URL에서 '{ }'로 처리된 부분은 컨트롤러의 메서드에서 변수로 처리가 가능합니다.  

@PathVariable은 '{ }'의 이름을 처리할 때 사용합니다.  

REST방식에서는 URL자체에 데이터를 식별할 수 있는 정보들을 표현하는 경우가 많으므로 다양한 방식으로 @PathVariable이 사용됩니다.  

#### ```@RequestBody```  
전달된 요청(request)의 내용(body)을 이용해서 **해당 파라미터의 타입으로 변환**을 요구합니다.  
내부적으로 HttpMessageConverter 타입의 객체들을 이용해서 다양한 포맷의 입력 데이터를 변환할 수 있습니다.  

대부분의 경우에는 JSON 데이터를 서버에 보내서 원하는 타입의 객체로 변환하는 용도로 사용되지만, 경우에 따라서는 원하는 포맷의 데이터를 보내고, 이를 해석해서 원하는 타입으로 사용하기도 합니다.  


