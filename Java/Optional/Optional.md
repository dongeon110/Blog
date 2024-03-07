# Optional
- Java에서 null체크를 위해 만들어진 클래스
- Stream과 사용법이 유사하며, Null 일 경우 기본 값도 지정해 줄 수 있다.

## 목차
- - -
- [Optional](#optional)
  - [목차](#목차)
- [사용법](#사용법)
  - [예시](#예시)
    - [NPE에 취약한 기존 코드](#npe에-취약한-기존-코드)
    - [기존의 Null체크 방식](#기존의-null체크-방식)
    - [방법1. Optional을 반환하는 방법](#방법1-optional을-반환하는-방법)
    - [방법2. null체크에 Optional을 사용하는 방법](#방법2-null체크에-optional을-사용하는-방법)
- [주의](#주의)

- - -
# 사용법


## 예시
- A 안에 B 안에 C 가 있는 경우

- A (Person)
```java
@Setter
@Getter
public class Person {
    private String name;
    private Department department;
}
```

- B (Department)
```java
@Setter
@Getter
public class Department {
    private String name;
    private Company company;
}
```

- C (Company)
```java
@Setter
@Getter
public class Company {
    private String name;
}
```

### NPE에 취약한 기존 코드
```java
Person person;

String companyName = person.getDepartment()
        .getCompany()
        .getName();
```

### 기존의 Null체크 방식
```java
Person person;

String companyName = null;
if(person != null) {
    if(person.getDepartment() != null) {
        if(person.getDepartment().getCompany() != null) {
            companyName = person.getDepartment()
                    .getCompany()
                    .getName();
        }
    }
}
```

### 방법1. Optional을 반환하는 방법
- A (Person) 클래스에서 처음부터 Optional을 반환한다.
```java
public class Person {
    private String name;
    private Department department;

    // 중략

    public Optional<Department> getDepartment() {
        if(this.department == null) {
            return Optional.empty();
        }
        return Optional.of(department);
    }
}
```
- 장점: 확실함
- 단점: 수정할 부분이 너무 많음.

### 방법2. null체크에 Optional을 사용하는 방법
- Optional을 사용해서 Null Check를 한다.
```java
Person person;

String companyName = Optional.ofNullable(person)
        .map(Person::getDepartment)
        .map(Department::getCompany)
        .map(Company::getName)
        .orElse(null);
```
- 어떤 사람의 소속 부서, 소속 회사 가 있는 경우에 회사 명을 return 하고 없으면 기본값 null을 리턴.


# 주의
1. Optional은 비싸다.
- 단순한 값, null을 얻을 목적이라면 null 비교가 낫다.
```java
// Bad
return Optional.ofNullable(status)
        .orElse(READY);

// Good
return status != null ? status : READY;
```

- 컬렉션은 null 이 아니라 비어있는 컬렉션을 반환하는 것이 좋을 때가 많다.
  - 컬렉션은 옵셔널로 감싸지 말고, 빈 컬렉션을 반환하자.

2. Optional을 필드, 생성자, 메서드 인자 로 쓰지 말자.
- 그렇게 쓰라고 만든게 아니다.
- Optional 반환은 신중히 하자.
  - client는 반드시 Optional에 대한 작업을 마무리 할 수 있어야 한다.

1. `orElse(new ...)` 대신 `orElseGet(() -> new ...)`
- orElse는 값이 있든 없든 항상 실행되고, orElseGet은 없을 때에만 실행 된다.
```java
Optional<Member> member = ...;

// Bad
return member.orElse(new Member());

// Good
return member.orElseGet(Member::new);

// Good
Member EMPTY_MEMBER = new Member();
return member.orElse(EMPTY_MEMBER); // 이미 생성됐거나, 계산된 값은 orElse를 써도 무방
```
