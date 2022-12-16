# WebSocket  

## WebSocket Error log  

- fail: Error in connection establish: net::ERR_SSL_PROTOCOL_ERROR  
    보안 확인


- NET::ERR_CERT_DATE_INVALIED  
- failed: Error during WebSocket handshake: Unexpected response code: 200  
- failed: Error during WebSocket handshake: Unexpected response code: 404  
[출처](https://hyeon-jinhyeok.tistory.com/38)



## 웹 푸시  
spring push notifications  
hybrid apps - push notifications  


- TCP/UDP 포트 목록  
https://ko.wikipedia.org/wiki/TCP/UDP%EC%9D%98_%ED%8F%AC%ED%8A%B8_%EB%AA%A9%EB%A1%9D

## CentOS 방화벽  
[CentOS 방화벽 명령어](https://www.manualfactory.net/10153)  

- 방화벽 실행 여부 확인  
> firewall-cmd --state

- 사용가능한 서비스/포트 출력하기
> firewall-cmd --list-all

- 사용가능한 모든 서비스/포트 목록 출력
> firewall-cmd --zone=public --list-all  


**서비스/포트 추가/제거**   
- ftp 서비스 추가
> firewall-cmd --add-service=ftp

- ftp 서비스 제거
> firewall-cmd --remove-service=ftp

- 21/tcp 서비스 추가
> firewall-cmd --add-port=21/tcp

- 21/tcp 서비스 제거
> firewall-cmd --remove-port=21/tcp


21/tcp 포트 : FTP 파일 전송 프로토콜 제어 포트