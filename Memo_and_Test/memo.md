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

