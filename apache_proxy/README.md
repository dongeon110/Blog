- [아파치 다운로드](#아파치-다운로드)
  - [아파치 실행](#아파치-실행)
- [Apache 설정 파일](#apache-설정-파일)
  - [httpd.conf](#httpdconf)
    - [ServerRoot](#serverroot)
    - [Listen](#listen)
    - [LoadModule](#loadmodule)
    - [Include](#include)
- - - 
# 아파치 다운로드  
[아파치 다운로드 출처 자료](https://inpa.tistory.com/entry/APACHE-%F0%9F%8C%90-%EC%95%84%ED%8C%8C%EC%B9%98-%EC%84%9C%EB%B2%84-%EC%B4%88%EA%B0%84%EB%8B%A8-%EC%84%A4%EC%B9%98-%EC%A0%95%EB%A7%90-%EC%89%BD%EA%B2%8C-%EC%A0%95%EB%A6%AC)  

[아파치 공식 다운로드](https://www.apachelounge.com/download/)에서 다운로드 받을 수 있다.  
다운받은 파일을 압축 풀고 `Apache24` 폴더를 사용한다.  

`Apache24/bin` 폴더 내의 `httpd.exe`를 console에서 아래 명령어로 실행시킨다.

> cd C:\Apache24\bin # 아파치 폴더
> httpd.exe -k install

## 아파치 실행  

[아파치 실행 출처 자료](https://web-inf.tistory.com/16)
- 아파치를 실행시키는 방법  
1. `Apache24/bin/ApacheMonitor.exe`를 실행 시킨다.  
2. 또는 아래 명령어를 사용한다  
> httpd -k install  
> httpd -k start  
> httpd -k stop  
> httpd -k restart  

- 리눅스  
1. Apache 버전확인  
```bash
[root@localhost /] httpd -v
Server version: Apache/2.4.6 (CentOS)
Server built: Jan 10 2023 12:34:56

```

2. Apache 상태확인  
```bash
# 1.
[root@localhost /] systemctl status httpd

# 2.
[root@localhost /] service httpd status
```

3. Apache 시작 / 중지 / 재시작
3가지 중 하나만 실행해도 됨  
```bash
# 시작  
systemctl start httpd
service httpd start
apachectl start
```

```bash
# 중지  
systemctl stop httpd
service httpd stop
apachectl stop
```

```bash
# 재시작  
systemctl restart httpd
service httpd restart
apachectl restart
```
- - - 
# Apache 설정 파일  
## httpd.conf
[httpd.conf 출처자료](https://opentutorials.org/course/3647/23838)  
`Apache24/conf` 폴더 안에는 `httpd.conf`라는 conf 파일이 있다.  
`httpd.conf`는 Apache의 핵심적인 설정 파일이다.  

### ServerRoot 
```conf
Define SRVROOT "c:/Apache24"
ServerRoot "${SRVROOT}"
```
아파치 설치 경로에 대한 문자열을 SRVROOT에 저장하고 이를 ServerRoot 설정에 대입한다.  
ServerRoot는 서버가 설치된 디렉토리 경로를 지정하기 위한 지시자이다. 
conf 및 logs 디렉토리의 위치를 찾기 위해 사용한다.  

### Listen  
```conf
Listen 80
```
Apache가 가동되는 동안 수신할 포트 번호를 지정한다.  
여러 포트 번호를 수신하려면 Listen 지시자를 여러번 선언한다.  
```conf
Listen 80
Listen 8080
Listen 8090
```
응용하여, 80포트는 모든 IP 에서 접속하도록 하고, 8080은 특정 IP로만 접속되게 하려면 `Listen 123.123.123.123:8080`과 같이 포트 번호 앞에 IP주소를 지정한다.  
그 뒤에 서버를 재시작하면 localhost:8080은 접속이 안된다.  

Apache 서비스를 설치할 때, Windows 방화벽에서 httpd.exe에 대한 모든 포트 번호를 인바운드 하고 있으므로 방화벽 관련 설정은 하지 않아도 된다.  

### LoadModule  
```conf
LoadModule {modname} *.*
```
Apache와 호환되는 모듈을 로드하는 지시자이다.  
예컨대, 다음은 SSL을 지원하기 위해 사용하는 구문이다.  
```conf 
LoadModule ssl_module modules/mod_ssl.so
```
대부분 *.so 확장자를 가지는데 모든 모듈이 그렇지만은 않다.  
해당 모듈은 LoadModule에 나타나있듯 `Apache/modules`디렉토리 안에 있다.  

### Include  
```conf
Include *.conf
```
Apache는 설정 파일을 분산시켜 저장하여 필요한 설정 파일만 로드 할 수 있다.  
이떄 Include 지시자를 사용한다.  
다음은 SSL을 지원하기 위해 필요한 설정 파일을 포함시킨다.  
```conf
Include conf/extra/httpd-ssl.conf
```

