23.09.05 - Initial Excel(Apache_poi)

- - -
# \[Java\] Apache POI를 사용하여 엑셀 파일 읽기  

이번에 엑셀 파일을 읽어서 그 값들을 따로 화면에 띄워달라는 요구사항이 있었다.

그래서 엑셀 파일을 읽을 때 사용한 라이브러리와 그 사용법, 어떻게 사용했는지를 정리하고자 한다.

## 사용한 라이브러리

-   Apache POI
    -   pom.xml

```xml
<dependency>
  <groupId>org.apache.poi</groupId>
  <artifactId>poi</artifactId>
  <version>5.0.0</version>
</dependency>
<dependency>
  <groupId>org.apache.poi</groupId>
  <artifactId>poi-ooxml</artifactId>
  <version>5.0.0</version>
</dependency>
```

-   import

```java
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.openxml4j.util.ZipSecureFile;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
```

## 파일 읽기

-   엑셀파일을 읽을때, 아래와 같은 순서로 읽는다.

1.  엑셀 파일을 입력 받는다. (확장자가 엑셀 파일이 아니면 에러)
2.  엑셀파일을 Workbook으로 읽는다.
3.  원하는 시트를 선택한다.
4.  원하는 Row를 선택한다.
5.  원하는 Cell을 선택해서 읽는다.

Apache POI는 Cell의 값, 형태, 셀의 셀 등의 형태를 읽고 수정 할 수 있다.

Apache POI 말고도 엑셀파일을 읽은 GcExcel이라는 라이브러리도 찾았지만 유료라서 Pass..

### 엑셀 파일을 입력받아서 값을 읽는 Spring의 Controller

```java
/**
 * 엑셀파일을 입력받아서 원하는 값을 돌려줌
 * 
 * @param file 읽고자 하는 엑셀 파일
 * 
 * @return ResponseEntity
 * 
 * @throws IOException
 */
@RequestMapping("/readExcel.do")
public ResponseEntity<?> readExcel(
       @RequestParam(value="file", required=false) MultipartFile file) throws IOException {

    // 확장자 체크
    String extension = FilenameUtils.getExtension(file.getOrigianlFilename());
    boolean isExcelExtension = extension.equals("xlsx") || extension.equals("xls");
    if (!isExcelExtension) {
        // 엑셀 확장자가 아닐 경우 400 에러를 반환
        ResponseDTO responseDTO = ResponseDTO.builder()
                .message("is not excel file.")
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(responseDTO);
    }

    /* xlsx 파일은 XML을 포함한 압축파일
     * Apache POI는 악의적인 압축파일을 읽을 때 Zip Bomb이라는 관련 취약점이 발생할 가능성이 있기에
     * 기본적으로 해당 부분을 모두 reject 시키고 있음.
     * 이 부분을 해결하기 위해 압축관련 설정을 아래 한줄 추가해줌
     */
    ZipSecureFile.setMinInflateRatio(0);

    // 엑셀 파일 읽기
    /* Workbook은 AutoClosable 를 확장한 인터페이스이기 때문에
     * try-with-resource 로 try 구문이 끝나면 자동으로 close 할 수 있도록 함.
     */
    try (
            Workbook workbook = WorkbookFactory.create(file.getInputStream());
    ) {
        // 첫번째 sheet
        // Sheet명으로 검색하려면 workbook#getSheet(sheet명)을 사용
        Sheet worksheet = workbook.getSheetAt(0);
        // 해당 sheet에서 Row의 수를 구함
        int physicalNumberOfRows = worksheet.getPhysicalNumberOfRows();

        // 해당 엑셀파일의 첫번째 Row에 제목이 있다고 생각하고 작성 (csv파일을 엑셀로 읽었을 때 처럼)
        Row titleRow = worksheet.getRow(0);

        // 임의로 3번째 컬럼 라인에 있는 값을 가져온다.
        XSSFCell cell = (XSSFCell)titleRow.getCell(2);

        /* 
         * .. 할 일..
         */
    }
}
```

Cell의 값을 읽기 위해서는 어떤 값이냐에 따라 읽는 메서드가 달라지고 받는 클래스도 달라진다.  
예를 들어, Cell의 값이 문자라면 String으로 받아야 할 것이고, 숫자라면 Integer 또는 Double로 받아야 할 것이다.

Apache POI에서는 문자는 String, 숫자값은 Double 등 여러가지 타입이 존재하고, 해당 타입을 먼저 읽은 뒤에 값을 받아야 한다.

-   셀의 타입을 먼저 읽기
-   `CellType cellType = cell.getCellType();`

CellType은 Apache POI 에서 제공하는 Enum 클래스이다.  
직접 열어보면 해당 클래스에는 NUMERIC, STRING, FORMULA, BLANK, BOOLEAN 등의 값들을 확인 할 수 있다.

엑셀의 여러 값들을 읽으려는데 하나하나 읽을 때 마다 타입을 읽고 값을 읽으려니 번거로워서  
읽은 값들을 String으로 바꾸어서 읽는 메서드를 하나 만들어서 사용했다.

### Cell의 값을 String으로 반환하는 메서드

```java
/**
 * 셀의 값을 String으로 반환하는 메서드
 * 
 * @param cell 값을 알고자 하는 셀
 * 
 * @return 셀 값
 * 
 * @throws NoCellTypeException
 */
public static String getCellValue(XSSFCell cell) throws NoCellTypeException {

        // 셀 타입
        CellType cellType = cell.getCellType();

        switch(cellType) {
        case NUMERIC:
                Double numericValue = cell.getNumericCellValue();
                return numericValue.toString();
        case STRING:
                return cell.getStringCellValue();
        case BLANK:
                return "";
        default:
                throw new NoCellTypeException("no case CellType: " + cellType);
        }
}
```

읽으려는 엑셀 파일에 숫자, 문자열, 빈 칸 외에는 다른 값이 없어서 3개만 정리했다.

이외에 다른 값은 임의로 NoCellTypeException 이라는 예외를 만들어서 던지도록 했다.

### Cell의 배경색을 읽기

Apache POI에서 배경색을 읽는 메서드가 있다.

그래서 배경색이 단순히 있는지, 없는지만 확인하는 메서드를 만들었다.

```java
/**
 * 셀의 배경색이 있는지 확인 하는 메서드
 * 
 * @param cell 확인하려는 셀
 * 
 * @return true: 색 있음, false: 색 없음
 */
public static boolean isColoredCell(XSSFCell cell) {
        // 셀 스타일
        XSSFCellStyle cellStyle = cell.getCellStyle();

        // 배경색
        short color = cellStyle.getFillForegroundColor();

        // 0: 노랑, 64: 배경색 없음
        if (color != 64) {
                return true;
        } else {
                return false;
        }
}
```

이 메서드와 if문을 사용하면 배경색이 있는 셀만 값을 가져올 수 있다.

## EXAMPLE

나는 Utils 클래스를 만들어서 기능을 일부 분리해서 사용했다.  
아래는 그 중 일부를 정리했다.

### Utils

```java
/**
 * Apache POI를 이용해서 Excel 파일을 읽을 때 사용하는 클래스
 */
public class MyExcelUtils {

        /**
         * 셀의 값을 String으로 반환하는 메서드
         * 
         * @param cell 값을 알고자 하는 셀
         * 
         * @return 셀 값
         * 
         * @throws NoCellTypeException
         */
        public static String getCellValue(XSSFCell cell) throws NoCellTypeException {

                // 셀 타입
                CellType cellType = cell.getCellType();

                switch(cellType) {
                case NUMERIC:
                        Double numericValue = cell.getNumericCellValue();
                        return numericValue.toString();
                case STRING:
                        return cell.getStringCellValue();
                case BLANK:
                        return "";
                default:
                        throw new NoCellTypeException("no case CellType: " + cellType);
                }
        }


        /**
         * 제목 Row를 입력해서 제목들의 값을 ArrayList로 가져오는 메서드
         * 
         * @param getTitleRow 제목이 있는 Row
         * 
         * @see #getCellValue(XSSFCell) 셀의 값을 읽는 메서드
         * 
         * @return 제목 내용들의 ArrayList
         */
        public static ArrayList<String> getTitleRow(Row titleRow) {
                ArrayList<String> titleList = new ArrayList<>();

                // i: Cell Index
                for(int i=0; i<titleRow.getLastCellNum(); i++) {
                        XSFFCell cell = (XSSFCell)titleRow.getCell(i);
                        String title = getCellValue(cell);
                        titleList.add(title);
                }

                return titleList;
        }


        /**
         * 셀의 배경색이 있는지 확인 하는 메서드
         * 
         * @param cell 확인하려는 셀
         * 
         * @return true: 색 있음, false: 색 없음
         */
        public static boolean isColoredCell(XSSFCell cell) {
                // 셀 스타일
                XSSFCellStyle cellStyle = cell.getCellStyle();

                // 배경색
                short color = cellStyle.getFillForegroundColor();

                // 0: 노랑, 64: 배경색 없음
                if (color != 64) {
                        return true;
                } else {
                        return false;
                }
        }
}
```