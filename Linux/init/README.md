# 리눅스 초기 설정

- Table of Contents
- - -
- [리눅스 초기 설정](#리눅스-초기-설정)
  - [VIM 편집기](#vim-편집기)
  - [Docker](#docker)
  - [history](#history)

- - -
## VIM 편집기
1. 라인 표시 기능: set number
   - `/etc/virc` 파일을 열어 set ruler 아래 `set number` 한 줄 추가하고 저장
   - 계정 홈 디렉토리에 .vimrc 파일에 `set number` 한 줄 추가. 없으면 만들고 한줄 쓰기.

## Docker
1. yum 인 경우 설치 다르게

## history
1. history 시간 표시 기능
   - `/etc/profile` 파일에 아래 내용 추가  
```bash
HISTTIMEFORMAT="%Y-%m-%d [%H:%M:%S] "
export HISTTIMEFORMAT
```
   - 설정 전 내용은 시간이 저장되어 있지 않음. (세션 접속 시간으로 나타남)