# Spring Framework 와 IoC 컨테이너  
스프링 프레임워크는 단순히 빈(bean)관리를 위한 IoC 컨테이너를 넘어서 웹 MVC 아키텍처와 보안, 모바일 등 다양한 분야의 기반 기술을 제공하고 있습니다.  

여기서는 스프링의 핵심 기능 중에서 빈 관리를 위한 IoC 컨테이너 사용법을 보겠습니다.  


# 용어 정리
스프링 프레임워크에서는 빈 관리 컨테이너를 IoC (Invension of Control) 컨테이너라고 합니다.  
먼저 용어를 살펴보겠습니다.  

## 의존성 주입(DI)와 역제어(IoC)  
빈의 의존 객체 관리 방법으로 의존성 주입(DI, Dependency Infection)을 사용했습니다.  
의존성 주입을 일반적인 용어로 역제어(IoC, Invension of Control) 이라고 합니다.  
즉, 역제어의 한 형태가 의존성 주입인 것입니다.  

**역제어**란, 개발자가 작성한 코드의 흐름에 따라 제어가 이루어 지는 것이 아니라 **외부에 의해 코드의 흐름이 바뀌는 것**을 말합니다.  

### 역제어 사례1. 이벤트  
역제어의 대표적인 예로 이벤트가 있습니다.  

만약 카카오톡으로 메시지를 작성하고 있다고 가정해보겠습니다.  
일반적인 흐름이라면, 메시지를 입력하고 전송 버튼을 누르면 상대편에게 메시지가 전달되고 상대편이 보낸 메시지가 있다면 화면에 출력할 것입니다.  

하지만, 실제 카카오톡을 사용하다 보면, 메시지를 작성하는 중이라도 상대편으로부터 메시지를 받게 되면 그 즉시 메세지를 출력합니다.  
즉, **외부에서 발생한 이벤트에 의해 코드의 흐름이 바뀝니다**.  
이것이 역제어입니다.  

### 역제어 사례2. 의존성 주입  
역제어의 또 다른 예로 의존성 주입이 있습니다.  
어떤 작업을 처리하기 위해 사용하는 객체를 의존 객체라고 합니다.  

예를 들어, 기존의 방식으로는 어떤 작업을 처리하기 위해 직접 인스턴스를 생성하고 있었습니다.  
아래는 TestController가 TestDao를 사용하기 위해 직접 인스턴스를 생성하고 있는 코드입니다.  

```java
// 기존 방식
class TestController {
    public void execute() {
        TestDao testDao = new TestDao(); // 직접 TestDao 인스턴스를 생성
        ArrayList<Project> projects = testDao.list(); // dao 사용 예
        ...
    }
}
```

이 방식과는 반대대는 방식이 의존성 주입입니다.  
즉, 내부에서 생성하는 것이 아니라, **외부에서 의존 객체를 주입**하는 것입니다.  
아래는 setTestDao()를 통해 외부에서 TestDao를 주입합니다.  
execute()는 이렇게 외부에서 주입된 객체를 사용합니다.  

```java
// 의존성 주입을 이용한 방식
class TestController {
    TestDao testDao;

    public void setTestDao(TestDao testDao) {
        this.testDao = testDao;
    }

    public void execute() {
        ArrayList<Prject> projects = testDao.list(); // dao 사용 예
        ...
    }
}
```

### 이전방식 vs 의존성 주입 방식  
초창기에는 애플리케이션의 크기가 작아서 객체가 필요할 때마다 직접 생성해도 문제가 되지 않았습니다.  
하지만, 애플리케이션의 규모가 점점 커지면서 성능이나 유지보수에 문제가 생기게 됩니다.  
이런 문제를 해결하기 위해서 의존성 주입이라는 기법이 등장했습니다.  

이전에 ApplicationContext 로 만든 클래스가 바로 DI 기법으로 빈을 관리하는 IoC 컨테이너 입니다.  
(아래 코드가 이전에 만든 ApplicationContext 클래스)
```java
public class ApplicationContext {
    // 객체를 저장할 보관소 - 해시테이블
    Hashtable<String, Object> objTable = new HashTable<String, Object>();

    // 해시테이블에서 객체를 꺼낼 getter 메서드도 정의
    public Object getBean(String key) {
        return objTable.get(key);
    }

    public void addBean(String name, Object obj) {
        objTable.put(name, obj);
    }

    // 기존의 코드들을 자동으로 미리 객체를 생성한 뒤 해시테이블에 저장

    // Annotation으로 구분한 클래스들을 Reflection API를 사용해 찾아 내고,
    // 찾아낸 클래스에서 Annotation으로 준 값을 key값으로 인스턴스를 생성하여 해시테이블에 저장
    public void prepareObjectsByAnnotation(String basePackage) throws Exception {
        Reflections reflector = new Reflections(basePackage);
        
        Set<Class<?>> list = reflector.getTypesAnnotatedWith(Component.class);
		String key = null;
		for(Class<?> clazz : list) {
			key = clazz.getAnnotation(Component.class).value();
			objTable.put(key, clazz.newInstance());
		}
    }

    // properties 파일에 설정한 클래스들을 미리 생성하여 해시테이블에 저장
    public void prepareObjectsByProperties(String propertiesPath) throws Exception {
		Properties props = new Properties();
		props.load(new FileReader(propertiesPath));
		
		Context ctx = new InitialContext();
		String key = null;
		String value = null;
		
        // jndi.는 서버에서 제공하는 객체이기 때문에 제외시켰습니다.
		for (Object item : props.keySet()) {
			key = (String) item;
			value = props.getProperty(key);
			if (key.startsWith("jndi.")) {
				objTable.put(key, ctx.lookup(value));
			} else {
				objTable.put(key, Class.forName(value).newInstance());
			}
		}
	}


    // 객체를 가져오거나, 직접 생성했으면
    // 각 객체가 필요로 하는 의존 객체 할당
    public void injectDependency() throws Exception {
        for (String key:objTable.keySet()) {
            if (!key.startsWith("jndi.")) { // jndi. 으로 시작하는 경우 톰캣 서버에서 제공하는 객체라서 의존성 주입을 하지 않았습니다.
                callSetter(objTable.get(key));
            }
        }
    }

    // callSetter 는 매개변수로 주어진 객체에 대해 셋터 메서드를 찾아서 호출하는 일을 합니다.
	private void callSetter(Object obj) throws Exception {
		Object dependency = null;
		for (Method m : obj.getClass().getMethods()) {
			if (m.getName().startsWith("set")) {
				dependency = findObjectByType(m.getParameterTypes()[0]);
				if (dependency != null) {
					m.invoke(obj, dependency);
				}
			}
		}
	}
	
	// 셋터 메서드를 호출할 때 넘겨줄 의존 객체를 찾는 일
	private Object findObjectByType(Class<?> type) {
		for (Object obj : objTable.values()) {
			if (type.isInstance(obj)) {
				return obj;
			}
		}
		
		return null;
	}
}
```
간단히 정리하면, 미리 설정된 클래스들을 모두 찾습니다. (Annotation과 properties파일로 설정한 클래스들)  
그리고 각 클래스의 setter 메서드를 찾아서 (callSetter() 메서드) 의존성 주입을 해주는 것입니다.  
(의존성 주입을 하는 메서드들을 모두 setter 메서드로 set~ 으로 작성했었습니다.  
그래서 set으로 시작하는 메서드를 찾아서 의존성 주입을 해주었습니다.)  
