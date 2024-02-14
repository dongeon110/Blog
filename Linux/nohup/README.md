# nohup
터미널과의 세션 연결이 끊어져도 프로세스가 계속 동작시켜주는 명령어


## 사용법
```bash
nohup [command]
```
command 의 명령어를 백그라운드에서 실행.


## 출력
nohup 명령의 표준출력을 다른 파일에 쓰기
- Redirection 사용.
```bash
nohup ./test.sh > test.out
```

출력을 하고 싶지 않을 때
```bash
nohup ./test.sh > /dev/null
```

## 0 입력, 1 출력, 2 에러
표준출력과 에러출력을 다르게 쓰기
```bash
nohup ./test.sh 1 > test.out 2 > test.err
```
표준출력은 test.out / 표준에러는 test.err 파일로.

- 같은 파일에 쓰기
```bash
nohup ./test.sh > test.log 2>&1
```
에러출력(2)도 표준출력(1)이 쓰여지는 파일로.

## nohup 명령을 백그라운드로 실행
nohup vs &
- nohup
  - nohup은 프로그램을 데몬형태로 실행시키는 것.
  - 연결이 끊기더라도 계속 동작하지만, 실행시 대기 상태가 되고, Ctrl+C를 누르면 바로 종료.
- 백그라운드 실행(&)
  - 백그라운드 실행은 대기상태가 없음.
  - 하지만, 세션 연결이 끊어지만 실행한 프로그램도 함께 종료됨
  
- 따라서, nohup을 백그라운드(&)로 실행하면, 대기상태도 없고, 세션 연결이 끊어져도 백그라운드에서 실행 됨.
```bash
nohup ./test.sh > test.log 2>&1 &
```

## 프로세스 종료
실행 되고 있는 명령을 찾는다.
```bash
ps -ef | grep test.sh
```

조회 프로세스 아이디를 kill로 종료
```bash
kill [pid]
```