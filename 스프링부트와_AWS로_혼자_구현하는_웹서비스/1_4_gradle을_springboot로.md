# Gradle 프로젝트를 Spring boot 프로젝트로 변경하기  


1. 플러그인 의존성 관리를 위한 설정
build.gradle  
```groovy
buildscript {
    ext { // ext의 의미 : build.gradle에서 사용하는 전역변수를 설정하겠다는 의미
        springBootVersion = '2.1.7.RELEASE' 
    }

    repositories {
        mavenCentral()
        jcenter()
    }

    dependencies {
        classpath("org.springframewoork.boot:spring-boot-gradle-plugin:${springBootVersion})
    }
}
```
spring-bbot-gradle-plugin라는 스프링 부트 그레이들 플러그인의 2.1.7.RELEASE를 의존성으로 받겠다는 의미  


다음은 앞서 선언한 플러그인 의존성들을 적용할 것인지를 결정하는 코드  
```groovy
apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'org.springframework.boot'
apply plugin: 'io.spring.dependency-management'
```
io.spring.dependency-management 플러그인은 스프링 부트의 의존성들을 관리해 주는 플러그인이라 꼭 추가해야한 합니다.  
이 4개의 플러그인들은 자바와 스프링 부트를 사용하기 위해서는 필수 플러그인이니 항상 추가하면 됩니다.  


나머지 코드는 다음과 같습니다.
```groovy
repositories {
    mavenCentral()
    jcenter()

    dependencies {
        compile('org.springframework.boot:spring-boot-starter-web')
        testCompile('org.springframework.boot:spring-boot-starter-test')
    }
}
```
repositories는 각종 의존성 (라이브러리)들을 어떤 원격 저장소에서 받을지를 정합니다.  
기본적으로는 mavenCentral을 많이 사용하지만, 최근에는 라이브러리 업로드 난이도 때문에 jcenter도 많이 사용합니다.  

mavenCentral은 이전부터 많이 사용하는 저장소이지만, 본인이 만든 라이브러리를 업로드하기 위해서는 정말 많은 과정과 설정이 필요합니다.  
그러다 보니 개발자들이 직접 만든 라이브러리를 업로드하는 것이 힘들어 점점 공유가 안 되는 상황이 발생했습니다.  
