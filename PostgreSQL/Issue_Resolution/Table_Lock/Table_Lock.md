23.09.05 Initial Table_Lock.md
- - -
# 특정 테이블 Lock  
PostgreSQL DB를 사용하는 중, 여러 테이블 중 특정 테이블만 읽을 수 없는 현상이 나타났다.  

읽지 못하는 테이블을 하루종일 읽고 있다는 로딩이 나타났고,  
이를 해결하기 위해서 여러가지 방법을 시도했다.  


## 상황 설명
먼저, DB가 있는 서버는 오래된 개발서버였는데 이것저것 많이 켜져있어서 많이 느려진 PC였다.  
그래서 DB를 옮기기 위해 pg_dump로 백업을 시켰는데 이 프로세스가 중간에 멈춰버린것이 원인인것 같다.  

이 프로세스가 멈춰버리니 그 이후에 오는 단순 조회 쿼리도 Lock이 걸려서 읽을 수 없게 되었다.  

그래서 나는 이 원인을 어떻게 찾았고, 어떻게 해결했는지 정리하고자 한다.

## 프로세스 찾기  
실제 PostgreSQL에서 수행중인 SQL을 아래와 같은 쿼리로 조회할 수 있다.  

```sql
SELECT datname, 
       pid, 
       usename, 
       application_name, 
       client_addr, 
       client_port, 
       backend_start, 
       query_start, 
       state
  FROM pg_stat_activity;
```
```sql
SELECT * FROM pg_stat_activity;
```

- datname : DB 명
- pid : 프로세스 id
- usename : user 명 (혹은 role명)
- application_name : 사용중인 어플리케이션 명 (JDBC 드라이버, 각종 DB 툴 등등..)
- client_addr : 사용중인 ip명
- client_port : 접속한 TCP 포트, unix 소켓은 -1
- backend_start : 서버 접속 시작 시간
- query_start : 해당 쿼리 시작 시간
- state : 상태 (idle: 대기중, active: 실행중)  

astral도 사용 가능하니 사용해도 된다.  
다른 정보들은 [공식문서](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW)를 참조하자.  


## LOCK 쿼리 종료
해당 쿼리를 사용해서 lock이 걸려서 수행되고 있지 않는 쿼리들을 수행중지 시켰다.  
당시 수행되지 않는 쿼리들은 조회 SELECT 쿼리 밖에 없었기 때문에 다른 문제가 발생하지 않을 거라 예상하고 중지시켰다.  

위의 프로세스 확인 쿼리로 lock 걸린 쿼리의 pid를 확인하고 아래의 쿼리를 사용해서 수행중지 시켰다.  
```sql
-- 프로세스 종료
SELECT pg_cancel_backend(1234); -- pid 가 1234 인 경우
```

만일 pg_cancel_backend 로 중지 되지 않는다면 상위 명령까지 한번에 중지하는 명령어를 사용한다.  

```sql
-- 상위 명령까지 한번에 중지
SELECT pg_terminate_backend(1234);
```

물론 LOCK 걸린 쿼리는 수행이 되고 있지 않은 쿼리들이고 문제가 되는 쿼리는 따로 있다.  
원인이 되는 쿼리를 찾아 종료를 해주어야 완전히 해결된다.   

나는 당시에 프로세스 목록에서 backend_start, query_start 시간을 보고 몇시간동안 수행중인 쿼리를 발견했고,  
해당 시간이 pg_dump를 수행한 시간과 당시 사용했던 role id(usename)과 db명(datname)을 확인하고 해당 쿼리를 종료시켰다.  

이후 Lock이 걸린 테이블 조회를 수행해보고 정상적으로 조회가 되는 것을 확인 한 후, 해결했음을 확인했다.   