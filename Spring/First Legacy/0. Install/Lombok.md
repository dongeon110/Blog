# Lombok  

<!--
스프링 레거시 프로젝트에서 롬복을 설치하기 위해 직접 .jar파일을 받아서 사용하였습니다.  
[롬복 홈페이지](https://projectlombok.org)에서 Download 페이지로 들어가 .jar 파일로 받을 수 있습니다.  

롬복 설치 받은 경로에서  
명령 프롬포트창에 ```java -jar lombok.jar```와 같은 명령어를 통해 실행할 수 있습니다.  

실행 시, 화면에서는 필요한 IDE를 선택할 수 있습니다.  
만일 찾지 못하는 경우 지정해서 설치합니다.  
-->

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