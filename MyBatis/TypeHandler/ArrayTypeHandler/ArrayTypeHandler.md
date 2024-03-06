# ArrayTypeHandler
Java의 List -> DB의 Array 컬럼으로 매핑하기 위한 핸들러

- ArrayTypeHandler
```java
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * TestVO의 id걊을 배열로 DB에 핸들링하는 TypeHandler
 */
@MappedTypes(java.util.ArrayList.class)
@MappedJdbcTypes(JdbcType.ARRAY)
public class TestVOTypeHandler extends BaseTypeHandler<List<TestVO>> {

    @Override
    public void setNonNullParameter(
            PreparedStatement psmt, int columnIndex, List<TestVO> list, JdbcType jdbcType
    ) throws SQLException {
        if(list == null || list.size() == 0) {
            psmt.setArray(columnIndex, null);
            return;
        }
        Long[] newlist = new Long[list.size()];
        for(int i=0; i<list.size(); i++) {
            newlist[i] = list.get(i).getId();
        }
        psmt.setArray(columnIndex, psmt.getConnection().createArrayOf("bigint", newlist));
    }

    @Override
    public List<TestVO> getNullableResult(
            ResultSet rs, String columnName
    ) throws SQLException {
        return getArrayListFromSqlArray(rs.getArray(columnName));
    }

    @Override
    public List<TestVO> getNullableResult(
            ResultSet rs, int columnIndex
    ) throws SQLException {
        return getArrayListFromSqlArray(rs.getArray(columnIndex));
    }

    @Override
    public List<TestVO> getNullableResult(
            CallableStatement cs, int columnIndex
    ) throws SQLException {
        return getArrayListFromSqlArray(cs.getArray(columnIndex));
    }

    /**
     * Sql Array를 List 배열로 변환한다.
     */
    private List<TestVO> getArrayListFromSqlArray(Array array) throws SQLException {
        if(array == null) {
            return null;
        }
        Long[] newlist = (Long[])array.getArray();
        if(newlist == null) {
            return null;
        }
        List<TestVO> list = new ArrayList<TestVO>();
        for(Long newListValue: newlist) {
            TestVO radarPointVO = new TestVO();
            radarPointVO.setId(newListValue); // ID 값만 세팅한다.
            list.add(radarPointVO);
        }
        return list;
    }
}
```

- TestVO
```java
private Long id;
```
만 있는 VO라고 가정.