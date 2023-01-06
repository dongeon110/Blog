# Tomcat War Context  

`conf/server.xml` context 부분에 root 경로 설정하여 war파일 위치 설정함  


# 터미널  

ll : 목록

`bin/shutdown.sh` 끄고 -> ROOT 지우고 -> `startup.sh`  

> ps -ef | grep tomcat  
> ll -tr
> cd webapps/
> rm ROOT/ (rm -rf ROOT/)
> cd ../
> bin/startup.sh
> ps -ef | grep tomcat
> tail -f logs/catalina.out (로그출력)



