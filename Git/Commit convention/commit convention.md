# 커밋 컨벤션

커밋 메세지 제목에는  
`(깃모지) 약어: 내용` 을 작성하려고 한다.
주로 사용하는 약어는  
Memo, test, refactor, move, fix .. 등이 있고 다른 게 더 생길 수 있다.   

깃모지는 없어도 되지만 자주 사용하는 것들을 git hook 중 prepare-commit-msg 를 통해 추가해주기로 한다.

상세설명은 자세한 설명이 필요할 경우 작성하지만, 가급적 적지 않고 이슈를 통해 관리하도록 하겠다.

꼬리말에는 Ref 나 관련 이슈 등을 달 수 있다.

제목 / 상세내용 / 꼬리말은 빈 줄을 통해 구분한다.



## 내가 쓰려고 만든 컨벤션  

- :tada: : Initial
- :memo: : memo  
- :sparkles: : new Feature
- :white_check_mark: : test / Add or Update tests
- :bulb: : Add comments or new idea
- :recycle: : Refactoring
- :twisted_rightwards_arrows: : Merge branches
- :truck: : Move/Rename resource
- :pencil2: : Fix typos
- :see_no_evil: : Add/Update .gitignore
- :wrench: : Add/Update configuration files
- :hammer: : Add/Update development scripts
- :bug: : Fix a bug
- :rocket: : Deploy stuff

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