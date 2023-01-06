# Gradle 설치  
이클립스에 Gradle을 설치하는 과정입니다.  

1. [다운로드](https://gradle.org/releases/)에서 최신버전을 **binary-only** or **complete**를 다운로드 합니다.  

2. 다운로드 받은 파일의 압축을 풀고 bin, docs 등이 있는 파일의 경로를 확인합니다.  

3. 윈도우 키를 눌러 **시스템 환경 변수 편집**에 들어가 환경 변수를 추가해줍니다.  
(시스템 변수 - 변수명 : GRADLE_HOME, 변수값 : 2. 에서 확인한 경로)

4. 시스템 변수 중, **Path**를 선택하고 편집 > 새로 만들기 %GRADLE_HOME%bin 을 추가합니다.

5. 명령 프롬포트를 실행하고 
```
gradle -v
```
를 실행시켰을때, gradle의 버전이 나타나면 성공입니다.

하지만 저는 해당 방법을 설치해도 되지 않아서 이클립스에서 경로를 직접 설정해주었습니다.  

## 이클립스에 직접 설정  
1. 이클립스 Help - Eclipse Marketplace 에서 Gradle Integration을 설치 합니다.
(코끼리 모양 이미지)

2. Window - Preferences를 실행하고 왼쪽 목차에서 Gradle을 선택합니다.  

3. Gradle distribution - Local installation directory 에서 설치한 gradle의 경로를 선택합니다.  

4. Apply 적용 후 Gradle project를 생성합니다.  


이렇게 Gradle Project를 생성하고 안의 파일




### 참조
https://thecodinglog.github.io/gradle/2019/09/11/install-gradle-in-windows.html  

