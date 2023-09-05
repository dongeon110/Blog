package Java.Enum;

import java.util.Arrays;
import java.util.List;

/**
 * 예시를 위한 샘플 Enum
 */
public enum MyEnumType {
    
    /** 남자 */
    MAN(1, Arrays.asList("man", "guy", "guys", "men")),
    /** 여자 */
    WOMAN(2, Arrays.asList("woman", "girl", "girls", "women")),
    /** 모름 */
    UNKNOWN(0, Arrays.asList("", "dont know"));

    /** 구분하기 위한 숫자 ex. DB 에는 이렇게 저장 */
    private Integer number;
    /** 또다른 부르는 이름 */
    private List<String> callNames;

    MyEnumType(Integer number, List<String> callNames) {
        this.number = number;
        this.callNames = callNames;
    }

    /**
     * callNames 리스트에 입력된 값이 포함되어 있는지 확인하는 메서드
     * 입력된 문자열은 소문자로 변환되어 찾음
     * 
     * @param callName 입력값
     * 
     * @return true: 포함됨, false: 포함안됨
     */
    public boolean hasCallName(String callName) {
        return callNames.stream()
                .anyMatch(name -> name.equals(callName.toLowerCase()));
    }

    /**
     * callName이 callNames 리스트에 포함되어 있는 MyEnumType을 찾는 메서드
     * 
     * @param callName 입력값
     * 
     * @return callName이 callNames에 포함되어 있는 MyEnumType
     * <br> 없다면 MyEnumType.UNKNOWN
     */
    public static MyEnumType findByCallName(String callName) {
        return Arrays.stream(MyEnumType.values())
                .filter(type -> type.hasCallName(callName))
                .findAny()
                .orElse(UNKNOWN);
    }
}
