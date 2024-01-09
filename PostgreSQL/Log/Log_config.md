- [PostgreSQL Log 설정](#postgresql-log-설정)
  - [Config Option](#config-option)
  - [DB log to Slack](#db-log-to-slack)

- - -
# PostgreSQL Log 설정
먼저, PostgreSQL의 설정 파일 위치를 찾는다.  
SUPERSUER 계정으로 DB에 접속하여 아래 명령문을 날리면 설치된 서버의 설정 파일 경로를 알려준다.  
```sql
SHOW config_file;
```
임시 DB를 세팅하고 Docker로 postgres을 올렸을 때, (기본설정)  
`/var/lib/postgresql/data/postgresql.conf` 의 경로를 확인 할 수 있었다.  

해당 파일에 많은 옵션들이 있고, 그냥 DB 접속한 계정으로 바꿀 수 있는 옵션들도 있지만, Log 같은 경우에는 이 파일을 수정해야만 바꿀 수 있는 옵션들이 많다.   
옵션에 대한 자세한 설명은 [공식문서](https://www.postgresql.org/docs/current/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-JSONLOG)를 보고 찾았다.  


## Config Option
- log_destination = 'csvlog'
  - 어떤 로그를 남길 지 선택한다.
  - stderr, csvlog, jsonlog, syslog 등 이 있다.
  - CSV로 로그를 남기면 DB에 밀어 넣기 쉽기 때문에 CSV로 로그를 남기도록 선택했다.
- logging_collector = on
  - 로그를 파일로 남길지 말지 선택하는 옵션이다.
  - log_destination 에서 csvlog, jsonlog를 선택하면 반드시 on을 설정해야한다.
  - DB 재부팅 후 적용된다.
- log_directory = 'pg_log'
  - 로그를 남길 디렉토리 경로이다.
  - $data_directory 내 경로이다. (`SHOW data_directory;`를 날려보면 위치를 알 수 있다.)
- log_filename = 'postgresql-%Y-%m-%d_%H%M%S.csv'
  - 설명이 필요 없다.
- log_file_mode = 0600
  - 로그 파일 권한이다. `chmod`
  - 관례적인 8진수 형식을 사용해서 0으로 시작한다.
- log_rotation_age = 1d
  - 개별 로그파일을 사용할 최대 시간이다. 기본값은 24시간이며 단위가 없으면 분으로 간주한다.
- log_rotation_size = 10MB
  - 개별 로그파일을 사용할 최대 크기이다. 기본값은 10MB이며 단위가 없으면 KB로 간주한다.
- syslog_facility
  - 여러 시스템이 있는 경우 구분해서 사용하기 위한 설정이다.
  - rsyslog.conf 파일에서 각 그룹에 대한 설정을 할 수 있다.
  - `show syslog_facility;`하면 기본 설정시 local0 이 나온다.
  - 사용할 부분이 아니라고 생각해서 넘어갔지만, 추후에 사용할 만도 하다. 그때가서 더 찾아보자.

- log_min_duration_statement
  - 설정한 시간 이상 실행된 쿼리를 로그로 남기는 설정
  - 슬로우 쿼리 찾기 위해 사용
  - 단위는 ms
  - SUPERUSER가 SET 명령어를 사용해서 수정 가능.
  - 0으로 설정하면 모두 출력, -1은 비활성화
  - 3000으로 설정하고 `SELECT pg_sleep(3)` 쿼리를 날리면 로그가 남는걸 확인 할 수 있다.

버전이 올라감에 따라 옵션은 충분히 바뀔 수 있으니 맞는 버전에 따른 공식문서를 참조하자.  

## DB log to Slack
- DB 로그를 슬랙으로 보내보자.  
  - 처음엔 DB에 로그를 DB에 쌓은 뒤 보내려고 했는데, csv COPY하는 쿼리도 로그 설정에 따라 남을 거라고 생각했다.
  - 그럼 무한 루프처럼 로그가 쌓일 거라 생각했다.
  - 다른 설정이 있을 법한데, 일단 보류.
- inotify
  - 파일 변경을 감지하는 리눅스 프로그램.
  - 이 파일로 변경을 감지하고, 로그를 curl로 슬랙 메세지를 남기기로 했다.
    - 원하는 모양으로 가공하고 curl을 사용해서 Slack incoming Webhook 사용방법에 맞춰 보내주는 쉘 스크립트를 짠다.
    - inotify로 로그 파일 변화를 감지하면 그 쉘 스크립트 파일을 실행시켜주기만 하자.