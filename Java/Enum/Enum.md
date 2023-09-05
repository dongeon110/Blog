- 23.09.05: Initial Enum
- - -
# Enum
Enum에 대해 알게된지 제법 지났고, 기본적인 내용들은 쉽게 찾을 수 있으니 생략.  

## Enum 사용시 장점  
- IDE의 도움을 받을 수 있다. 자동완성, 오타검증 등..  
- 리팩토링 할 경우 수정할 부분이 최소화 된다. Enum class 만 수정하면 된다.  
- 허용 가능한 값들을 제한 할 수 있다.  
- 내용을 담을 수 있다.  

고려할 점  
- 자주 수정해야 할 경우, DB에 넣는게 낫다. (관리자가 관리하는 것 등)  

## Enum이 제공하는 기본 메서드  
|메서드 명|설명|
|---|---|
|toString()|Enum 이름을 문자열로 반환|
|name()|Enum 이름을 문자열로 반환|
|compareTo()|비교 대상보다 순서가 빠르면 -1, 같으면 0, 느리면 1. <br>순서는 선언된 순서|
|ordinal()|선언 순서에 따른 인덱스 (0부터)|
|valueOf()|인자로 밭은 이름과 같은 Enum값을 반환|
|values()|선언된 모든 Enum을 순서대로 배열에 담아서 반환|

### toString() vs name()  
- 결과는 같음
- toString은 overriding 가능
- name 은 overriding 불가능

## [예시](./EnumExample.java)

# 참조
https://eatnows.tistory.com/91