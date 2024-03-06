package Java.Optional;

import lombok.Setter;
import lombok.Getter;

import java.util.Optional;

/**
 * 예시 클래스 C - 회사
 */
@Setter
@Getter
public class Company {
    private String name; // 회사명

    /**
     * 예시 메서드 1. - Optional을 반환하는 방법
     * 회사명을 반환한다
     * @return 회사명
     */
    public Optional<String> findName() {
        return Optional.ofNullable(name);
    }
}
