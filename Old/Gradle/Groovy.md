# Groovy  

# Groovy 실행원리  
그루비 소스는 컴파일하면 자바 클래스가 만들어집니다.  
그루비로 만든 자바 클래스를 실행하려면 groovy.jar와 asm.jar 라이브러리 파일이 필요합니다.  

그루비 프로젝트를 생성하고 테스트 파일을 만들겠습니다.  
그루비 설치와 그루비 프로젝트 생성하는 부분은 생략하겠습니다.  


TestGroovy/src/groovy/Test.groovy
```groovy
package groovy

a = 20
println a
println plus(10, 20)

def plus(x, y) {
    x + y
}

println "실행 완료"
```
해당 파일을 [Run As]-[Groovy Script]로 실행시키면 콘솔창에 아래와 같이 출력 됩니다.  
```
20
30
실행 완료
```

## 그루비 클래스의 실행 원리  
