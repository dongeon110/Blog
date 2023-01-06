# Blog  

## 프록시 서버 설정  
<!-- httpd/conf.d bac -->
```conf
<VirtualHost *:80>
  ProxyRequests Off
  ProxyPreserveHost On
  <Location />
    ProxyPass http://1.89
    ProxyPassReverse http://1.89
  </Location>
```


# CronTab  
<!-- https://hdhdeveloper.tistory.com/107 -->


<!--
# Connection Pool 끊김 문제
https://engineering-skcc.github.io/cloud/tomcat/apache/performancetest/MySqlDBWaitTimeOut/#mysql-db-connection-pool-%EC%97%B0%EA%B2%B0-%EC%8B%A4%ED%8C%A8-%EC%97%90%EB%9F%AC
-->