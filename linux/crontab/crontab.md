# Crontab  
- [Crontab](#crontab)
  - [Cron, Crontab](#cron-crontab)
  - [Tomcat 검사 로직](#tomcat-검사-로직)
  - [CronTab 사용방법](#crontab-사용방법)
  - [CronTab 사용 2](#crontab-사용-2)
  - [추가 자료](#추가-자료)

- - - 
## Cron, Crontab
1. Cron
  유닉스/리눅스 계열에서 특정시간에 특정 작업을 하는 데몬
2. Crontab
  이 Cron이 언제 무슨 일을 하도록 설정해 특정 파일에 저장하는 Crontab
  Cron이라는 데몬이 원하는 시간에 원하는 명령을 수행하도록 만든 명령 리스트

## Tomcat 검사 로직 
[톰캣 검사 로직 출처](https://hdhdeveloper.tistory.com/107) 
> vi tomcatStatus.sh
```bash
#!/bin/bash

export STATUS = $(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8080)

export ANSWER = 200
```
STATUS: 톰캣이 리턴해주는 http Code  
URL은 자신의 URL 주소를 입력하면 된다.  

ANSWER: 정상 http 코드  

내 URL http_code 와 ANSWER를 비교해서 값이 다르면 톰캣을 실행시켜주면 끝.  

```bash
#!/bin/bash

export STATUS = $(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8080)

export ANSWER = 200

echo "$STATUS";

if [[ $STATUS -ne $ANSWER ]]; then

    echo "error : tomcat is not found : tomcat Reload start";

    sudo fuser -k 8080/tcp

    /tomcat/bin/startup.sh

    echo "success run tomcat server";

else

    echo "tomcat is started";

fi
```

bash 쉘 스크립트에서 정수형 비교를 하려면 
||bash|의미|
|---|---|---|
|!=|-ne|다르다|
|=|-eq|같다|

이렇게 비교 표현식을 사용한다.  

sudo fuser -k 8080/tcp 는 tcp 포트가 잡고있는 PID를 삭제한다.  
종료된 이후에도 PID가 남아있는 경우가 있으니, 해당 구문으로 남아있는 PID를 kill 해준다.  

이제 검사하는 스크립트가 완성 되었다.  

내가 의도한대로 로그가 출력되면 성공이다.  

이제 해당 스크립트를 CronTab에 등록하자  

## CronTab 사용방법  

```bash
vi /etc/crontab
```
해당 파일 열어보면 [* * * * * root /text/test] 이런 식으로 적혀있다.  
[시간설정 출처](https://blog.naver.com/PostList.naver?blogId=changbab&categoryNo=9&from=postList)  

해당 시간은 
[* * * * *] : [분 시간 일 월 요일] 이다.

요일은 0: 일요일 ~ 6: 토요일이다.

```bash
0 5 * * * # 매일 5시 0분에 실행
5 * * * * # 매시 5분이 될때마다 실행, 한시간 간격
* * * * * # 1분에 한번씩
0 5 1 * * # 매달 1일 새벽 5시에 실행

*/5 * * * * # 5분마다 한번씩 (분/5)
0 */5 * * * # 5시간마다 한번씩 (시간/5)

0 5,11 * * * # 5시와 11시
0 5,11 * * 0,3 # 매주 일요일, 수요일 5시와 11시
```

- - - 
## CronTab 사용 2  
[CronTab 사용 2 출처](https://jdm.kr/blog/2)  



## 추가 자료  
[상세 자료](https://happist.com/553442/%EC%84%9C%EB%B2%84%EC%97%90%EC%84%9C-%EC%9E%90%EB%8F%99-%EC%8B%A4%ED%96%89%EC%9D%84-%EA%B0%80%EB%8A%A5%EC%BC%80-%ED%95%B4%EC%A3%BC%EB%8A%94-crontab%ED%81%AC%EB%A1%A0%ED%83%AD-%EC%84%A4%EC%A0%95)