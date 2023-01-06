# Gradle Could not find method compile() 에러 해결  

build.gradle 파일에서 설정을 할 때 위와 같은 에러가 나타났습니다.  

에러가 발생한 부분은 다음과 같습니다.  
```groovy
dependencies {
    compile 'org.springframework: ~ 이하 생략'
}
```

원인은 ```compile```, ```testCompile```, ```runtime```, ```testRuntime``` 이 Gradle 7.0버전 이후로 삭제되었기 때문입니다.  

만일 자신이 Gradle 7.0이후의 버전을 사용하고 있다면, 버전을 바꾸거나 위 4개의 메서드를 다음으로 바꾸어야 합니다.  

```compile```  →  ```implementation```  
```testCompile```  →  ```testImplementation```  
```runtime```  →  ```runtimeOnly```  
```testRuntime```  →  ```testRuntimeOnly```  

compile 대신 implementation,  
runtime 에는 Only를 뒤에 붙여서 사용하면 가능합니다.  


