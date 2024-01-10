# Git Hooks

깃 훅은 깃을 사용할 때,  
커밋 하기 전, 또는 커밋 한 후, 푸쉬한 후 등 깃을 사용할 때 무언가를 자동화 시키고 싶을 떄 사용하면 좋다.  

레포지토리의 .git 이라는 디렉토리가 숨겨져있는데 이 안에서 hooks 이라는 디렉토리에서 설정을 할 수 있다.  


hooks 디렉토리 안에는 각각에 따라 사용할 수 있는 .sample 파일이 있는데,  
이 .sample을 지우고 안의 코드를 수정하면 바로 사용할 수 있다.  

각 파일에 대한 설명은 [git공식문서](https://git-scm.com/book/ko/v2/Git%EB%A7%9E%EC%B6%A4-Git-Hooks)를 참조하자.


## 참조
- git 공식 문서: https://git-scm.com/book/ko/v2/Git%EB%A7%9E%EC%B6%A4-Git-Hooks