package Java.Optional;

import lombok.Setter;
import lombok.Getter;
import java.util.Optional;

/**
 * 예시 클래스 - 사람
 */
@Getter
@Setter
public class Person {
    private String name; // 사람 이름
    private Department department; // 소속부서
    
    /**
     * 예시 메서드 1. - Optional을 반환하는 방법
     * 부서를 반환한다.
     * @return 부서
     */
    public Optional<Department> maybeDepartment() {
        return Optional.ofNullable(department);
    }

    /**
     * 예시 메서드 1. - Optional을 반환하는 방법을 사용해서 회사명을 출력하는 방법
     * 소속 회사명을 반환한다.
     * @return 소속 회사명. 없으면 빈 Optional 객체.
     */
    public Optional<String> findCompanyName() {
        return this.maybeDepartment()
                .map(Department::getName);
    }

    /**
     * 예시 메서드 2. - NullCheck에 옵셔널을 사용하는 방법
     * 소속 회사명을 반환한다
     * @return 소속 회사명. 없으면 null.
     */
    public String getCompanyName() {
        return Optional.ofNullable(this.getDepartment())
                .map(Department::getCompany)
                .map(Company::getName)
                .orElse(null);
    }
}
