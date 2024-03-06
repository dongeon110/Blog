package Java.Optional;

import lombok.Setter;

import java.util.Optional;

import lombok.Getter;

/**
 * 예시 클래스 B - 부서
 */
@Setter
@Getter
public class Department {
    private String name; // 부서명
    private Company company; // 회사

    /**
     * 예시 메서드 1. - Optional을 반환하는 방법
     * 회사를 반환한다.
     * @return 회사
     */
    public Optional<Company> maybeCompany() {
        return Optional.ofNullable(company);
    }
}
