- [websocket 빈 등록](#websocket-빈-등록)
- [클래스 구현](#클래스-구현)
- [클라이언트 js](#클라이언트-js)
- [웹소켓 최초 호출 요청 Header](#웹소켓-최초-호출-요청-header)

- - -
## websocket 빈 등록  
```xml
<bean id="wsHandler" class="클래스 경로" />
<websocket:handlers>
    <websocket:mapping handler="wsHandler" path="/ws" />
    <websocket:handshake-interceptors>
        <bean class="org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor" />
    </websocket:handshake-interceptos>
</websocket:handlers>
```

## 클래스 구현  
- 빈에 등록한 클래스 예시 샘플  
```java
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class wsHandler extends TextWebSocketHandler {
    // 세션 연결 중인 유저들을 모아둔 map
    private Map<String, WebSocketSession> users = new HashMap<>();
    
    // 세션에 저장된 아이디를 얻기 위한 메서드 정의  
    // LoginVO는 해당 프로젝트에서 임의로 정의한 클래스  
    private String getId(WebSocketSession session) {
        Map<String, Object> httpsession = session.getAttributes();
        LoginVO userVO = (LoginVO)httpsession.get("loginVO");
        if (userVO == null) {
            return null;
        } else {
            return userVO.getId();
        }
    }

    // 연결 성공시 수행
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String sessionId = getId(session); // 세션에 저장된 아이디  
        users.put(sessionId, session); // 현재 연결 중인 유저들을 모아둔 map에 put
    }

    // 연결 종료시 수행
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        users.remove(session.getId()); // 현재 연결중인 유저들을 모아둔 map에서 remove
    }

    // 메시지 수신시 수행
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 메시지 보낸 사람 id
        String senderId = getId(session);

        // 받은 json 메시지 obj 
        JsonParser jsonParser = new JsonParser();
        JsonElement obj = jsonParser.parse(message.getPayload());

        // 메시지 받는 사람 (메시지 포함)
        String receiver = obj.getAsJsonObject().get("receiver").getAsString();
        
        // 현재 연결중인 유저들에서 받는 사람 id 가져오기
        WebSocketSession receiverSession = users.get(receiver);

        // 받는 사람이 연결중이면 발송
        if (receiverSession != null) {
            receiverSession.sendMessage(message);
        }
    }

    // 에러 발생시  
    @Override
    public void handleTrandsportError(WebSocketSession session, Throwable exception) throws Exception {
        // 에러 로그 남기기 등 에러 발생시 수행 exception.getMessage()
    }
}
```
- - -
## 클라이언트 js  
```js
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
```
- - - 
## 웹소켓 최초 호출 요청 Header  
[웹소켓 헤더 출처 자료](https://ko.javascript.info/websocket)
```http
GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
```  
- `Origin`: 어떤 웹사이트와 소켓통신을 할지 결정  
- `Connection: Upgrade`: 클라이언트측에서 **프로토콜을 바꾸고 싶다**는 신호  
- `Upgrade: websocket`: 클라이언트측에서 요청한 프로토콜은 websocket  
- `Sec-WebSocket-Key`: 보안을 위해 브라우저에서 생성한 키
    서버가 웹소켓을 지원하는지 확인하는 데 사용
- `Sec-WebSocket-Version`: 웹소켓 프로토콜 버전이 명시, 예시에서 버전은 13

서버는 클라이언트에서 보낸 웹소켓 통신 요청을 최초로 받고 동의하면,  
상태코드 **101**이 담긴 응답을 클라이언트에 전송  




