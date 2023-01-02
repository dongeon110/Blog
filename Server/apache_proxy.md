# 아파치 프록시 설정  

## 아파치 다운로드
[아파치 다운로드](https://www.apachelounge.com/download/)  
[참고자료](https://inpa.tistory.com/entry/APACHE-%F0%9F%8C%90-%EC%95%84%ED%8C%8C%EC%B9%98-%EC%84%9C%EB%B2%84-%EC%B4%88%EA%B0%84%EB%8B%A8-%EC%84%A4%EC%B9%98-%EC%A0%95%EB%A7%90-%EC%89%BD%EA%B2%8C-%EC%A0%95%EB%A6%AC#thankYou)  
- - - 
[Apache2.4 httpd.conf 설정파일 완전 분석](https://cornswrold.tistory.com/358)  


## 아파치 오류 확인  
- Error : The requested operation has failed  
  
cmd 창에서  
> httpd.exe -k start  

또는 restart  

입력시 에러 로그를 확인 할 수 있다.  


## httpd-vhosts.conf 로 사용  

httpd.conf 에 아래 모듈 추가  
```conf
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so
LoadModule rewrite_module modules/mod_rewrite.so
```

```conf
<VirtualHost *:8090>
    ProxyRequests Off
	ProxyPreserveHost On

	RewriteEngine On
	RewriteCond %{HTTP:Upgrade} =websocket [NC]
	RewriteRule /(echo-ws) ws://localhost:9999/$1 [P,L]
	RewriteCond %{HTTP:Upgrade} !=websocket [NC]
	RewriteRule /(.*) http://localhost:9999/$1 [P,L]

	# ProxyPass /ws ws://localhost:9999/
	ProxyPassReverse / ws://localhost:9999/

	KeepAlive On
```

RewriteCond : Rewrite 조건  
RewriteRule : Rewrite Rule  
RewriteRule () 괄호 안의 내용이 $1 에 들어감  
    ()가 2개면 차례로 $1, $2 ...  

HTTP의 요청  
```http
Host: localhost  
Connection: upgrade  
Upgrade: websocket  
...
```
Upgrade가 websocket이면 ws://localhost:9999 로 바꾸고,  
아니면 http:// ~ 로 바꿈  

ProxyPass 는 서버가 적절한 문서를 가져오도록 설정하며, ProxyPassReverse 지시어는 internal.example.com 이 보내는 리다이렉션을 재작성하여 리다이렉션이 현재 서버의 적절한 디렉토리를 가리키도록 한다.  
- - - 
- Reverse Proxy  
다른 서버에 있는 문서를 서버의 URL 공간으로 가져옴  
웹 서버가 원격 서버에서 문서를 가져와서 클라이언트에게 전달하는 프록시 서버와 같이 동작하기 떄문에 Reverse Proxy 라고 함  
클라이언트 입장에서 역프록시 서버가 문서를 보내주는 것처럼 보이므로 일반 프록시와는 다름  
