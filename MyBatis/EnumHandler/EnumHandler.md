# EnumHandler

## MyEnumType
```java
import lombok.Getter;

import java.util.Arrays;

/**
 * 코드를 나눈 Enum 클래스
 */
@Getter
public enum MyEnumType {

    /** 하나 */
    ONE("하나", "A"),
    /** 둘 */
    TWO("둘", "B"),
    /** 셋 */
    THREE("셋", "C");

    /* 하나둘셋 */
    private String numberStr;

    /* 코드 */
    private String code;

    /* Constructor */
    MyEnumType(String numberStr, String code) {
        this.numberStr = numberStr;
        this.code = code;
    }

    /**
     * code로 MyEnumType을 찾는 메서드
     * @param code
     * @return param code를 가진 myEnumType
     * @throws IllegalArgumentException 일치하는 code가 없을 경우
     */
    public static MyEnumType getTypeByCode(String code) throws IllegalArgumentException {
        return Arrays.stream(MyEnumType.values())
                .filter(type -> type.code.equals(code))
                .findAny()
                .orElseThrow(IllegalArgumentException::new);
    }

    /**
     * numberStr명으로 MyEnumType을 찾는 메서드
     * @param numberStr
     * @return param numberStr와 일치하는 myEnumType
     * @throws IllegalArgumentException 일치하는 numberStr가 없을 경우
     */
    public static MyEnumType getTypeByNumberStr(String numberStr) throws IllegalArgumentException {
        return Arrays.stream(MyEnumType.values())
                .filter(type -> type.numberStr.equals(numberStr))
                .findAny()
                .orElseThrow(IllegalArgumentException::new);
    }

}

```


## CustomHandler
```java
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;
import org.apache.ibatis.type.TypeHandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Mybatis에서 MyEnumType Enum을 name이 아닌 code값으로 사용하기 위한 CustomHandler
 * @see MyEnumType
 */
@MappedTypes(MyEnumType.class)
public class MyEnumTypeHandler implements TypeHandler<MyEnumType> {

    @Override
    public void setParameter(PreparedStatement ps, int i, MyEnumType parameter, JdbcType jdbcType) throws SQLException {
        ps.setString(i, parameter.getCode());
    }

    @Override
    public MyEnumType getResult(ResultSet rs, String columnName) throws SQLException {
        String code = rs.getString(columnName);
        return MyEnumType.getTypeByCode(code);
    }

    @Override
    public MyEnumType getResult(ResultSet rs, int columnIndex) throws SQLException {
        String code = rs.getString(columnIndex);
        return MyEnumType.getTypeByCode(code);
    }

    @Override
    public MyEnumType getResult(CallableStatement cs, int columnIndex) throws SQLException {
        String code = cs.getString(columnIndex);
        return MyEnumType.getTypeByCode(code);
    }
}
```

```xml
<typeHandlers>
    <typeHandler handler="${CustomHandler path}" />
</typeHandlers>
```

참조: https://amagrammer91.tistory.com/115