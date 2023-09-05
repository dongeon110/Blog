package Java.Enum;

import java.util.Arrays;

/**
 * Enum Example Class
 * 예시 샘플 Example
 */
public class EnumExample {

    /**
     * Test Example
     * Case 1 : static method in MyEnumType {@link Java.Enum.MyEnumType#findByCallName(String)}
     * Case 2 : toString() vs name()
     * Case 3 : campareTo()
     * Case 4 : ordinal()
     * Case 5 : valueOf()
     * Case 6 : values()
     */
    public static void main(String[] args) {

        System.out.println("----- Example Case 1. static method in MyEnumType");
        String callName = "Guy";
        MyEnumType myEnumType = testCase1(callName); // MAN, 남자다

        System.out.println("----- Example Case 2. toString() vs name()");
        System.out.println("toString(): " + myEnumType.toString()); // Overriding 하지 않았음.
        System.out.println("name(): " + myEnumType.name());
        System.out.println("equals? " + myEnumType.toString().equals(myEnumType.name())); // true

        System.out.println("----- Example Case 3. compareTo()");
        System.out.println(MyEnumType.WOMAN.compareTo(myEnumType)); // 1 - WOMAN은 myEnumType(MAN) 보다 나중에 선언되었기 때문

        System.out.println("----- Example Case 4. ordinal()");
        System.out.println(myEnumType.ordinal()); // 0 - 가장 첫번째로 선언된 MAN 이기 때문
        
        System.out.println("----- Example Case 5. valueOf()");
        MyEnumType valueOfType;
        try {
            valueOfType = MyEnumType.valueOf("MAN");
        } catch(IllegalArgumentException e) {
            System.out.println("맞는게 없으면 IllegalArgumentException이 발생한다.");
            valueOfType = MyEnumType.UNKNOWN;
        }
        System.out.println(valueOfType.name()); // MAN

        System.out.println("----- Example Case 6. values()");
        MyEnumType[] valuesTest = MyEnumType.values();
        Arrays.stream(valuesTest)
                .forEach(System.out::println);
        
        System.out.println("----- The End.");

    }

    /**
     * Test Case 1
     * Enum 의 static 메서드를 사용해서 Enum을 찾는다.
     */
    public static MyEnumType testCase1(String callName) {
        MyEnumType myEnumType = MyEnumType.findByCallName(callName);

        System.out.println(callName + "의 성별은?");
        switch(myEnumType){
        case MAN: 
            System.out.println(myEnumType.name() + ", 남자다.");
            break;
        case WOMAN:
            System.out.println(myEnumType.name() + ", 여자다.");
            break;
        default: // UNKNOWN
            System.out.println(myEnumType.name() + ", 모른다.");
            break;
        }
        return myEnumType;
    }
}
