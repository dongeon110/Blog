# prepare-commit-msg
- 주석 설명은 쓰지 않겠다. (직접 읽어 볼 수 있기 때문.)  

## Sample
- 샘플에 작성 된 내용.
```bash
#!/bin/sh
COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2
SHA1=$3

/usr/bin/perl -i.bak -ne 'print unless(m/^. Please enter the commit message/..m/^#$/)' "$COMMIT_MSG_FILE"
```

- 내 커밋 컨벤션을 적용시키자.
  - 내용은 어렵지 않지만 복붙하고 싶다.
```bash
#!/bin/sh
COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2
SHA1=$3

# COMMIT MSG
COMMIT_MSG=$(<$COMMIT_MSG_FILE)

# Apply My Commit Msg Style
COMMIT_MSG_ARR=($(echo $COMMIT_MSG | tr ":" "\n"))
ARR_SIZE=${#COMMIT_MSG_ARR[@]}

declare -A PRE_MAP

PRE_MAP[memo]=":memo:"
PRE_MAP[initial]=":tada:"
PRE_MAP[test]=":white_check_mark:"
PRE_MAP[comment]=":bulb:"
PRE_MAP[refactor]=":recycle:"
PRE_MAP[merge]=":twisted_rightwards_arrows:"
PRE_MAP[move]=":truck:"
PRE_MAP[rename]=":truck:"
PRE_MAP[typos]=":pencil2:"
PRE_MAP[fix]=":bug:"
PRE_MAP[deploy]=":rocket:"
PRE_MAP[feat]=":sparkles:"
PRE_MAP[docs]=":memo:"
PRE_MAP[ignore]=":see_no_evil:"
PRE_MAP[remove]=":fire:"
PRE_MAP[style]=":lipstick:"
PRE_MAP[revert]=":rewind:"

if [ ${ARR_SIZE} -gt 1 ]; then
        PRETEXT=${COMMIT_MSG_ARR[0]}
        NEW_MSG="${PRE_MAP[${PRETEXT,,}]} ${COMMIT_MSG}"
        echo -e "$NEW_MSG" > ${COMMIT_MSG_FILE}
fi

/usr/bin/perl -i.bak -ne 'print unless(m/^. Please enter the commit message/..m/^#$/)' "$COMMIT_MSG_FILE"
```
