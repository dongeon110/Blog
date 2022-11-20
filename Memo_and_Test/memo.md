jstree

체크박스 클릭 이벤트
```javascript
$('#t').on('select_node.jstree Event', function (e, data) {
var id = data.node.id;
alert(id);
});
```

체크박스 클릭 해제 이벤트
```javascript
$('#tree').on('deselect_node.jstree Event', function (e, data) {
var id = data.node.id;
alert(id);
});
```


<!--


LoginController gpki관련 코드 전부 주석 처리 후 테스트.
 C:/data1/에 키 집어넣음


- 주소록 에러 추정?
cannot create transaction exception
 
 -->

- javascript 함수 리턴

- 여러 js파일에서 전역변수 다루기
https://wikidocs.net/160284
