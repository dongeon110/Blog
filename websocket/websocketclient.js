var ws = null;
$(document).ready(function(){
    connect();
})

function connect() {
    var hostName = location.hostname;
    var port = location.port;

    var url = "ws://" + hostName + ":" + port + "/ws";

    // 웹 소켓
    ws = new WebSocket(url);

    // 웹 소켓이 연결되었을 때 수행
    ws.onopen = function() {
        console.log("웹소켓 연결됨");
    }

    // 서버에서 메시지를 받았을 때 수행
    ws.onmessage = function(msg){
        console.log("메시지 받음");
        obj = JSON.parse(msg.data); // 메시지
    }

    // 웹소켓이 닫혔을 때 수행  
    ws.onclose = function(event) {
        console.log("웹소켓 닫힘");
    }

    // 에러가 생김
    ws.onerror = function(error) {
        console.log("에러생김");
    }

    // 종료
    ws.close();
}