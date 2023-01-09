// package 패키지.경로;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

// import VO경로.LoginVO;


public class WsHandler extends TextWebSocketHandler{
	// 세션 연결 중인 유저들을 모아둔 map
	private Map<String, WebSocketSession> users = new HashMap<>();
	
	// 세션에 저장된 아이디를 얻기 위한 메서드 정의  
    // LoginVO는 해당 프로젝트에서 임의로 정의한 클래스 
	private String getId(WebSocketSession session) {
		Map<String, Object> httpsession = session.getAttributes();  
		LoginVO userVO = (LoginVO)httpsession.get("loginVO");
		if(userVO == null) {
			// httpsession.return session.getId();
		    return null;	
		} else {
			return userVO.getId();
		}
	}

    // 연결 성공시 수행
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("\n\n" + session.getId() + " 연결 됨" + session );
		String senderId=  getId(session); // 세션에 저장된 아이디  
		users.put(senderId, session); // 현재 연결 중인 유저들을 모아둔 map에 put
	}

	// 연결 종료시 수행
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("\n\n" +session.getId() + " 연결 종료됨" + session);
		users.remove(session.getId()); // 현재 연결중인 유저들을 모아둔 map에서 remove
	}

	// 메시지 수신시 수행
    @Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println(session.getId() + "로부터 메시지 수신: " + message.getPayload() + session);
		// 메시지 보낸 사람 id
		String senderId=  getId(session);
		
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
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        // 에러 로그 남기기 등 에러 발생시 수행 exception.getMessage()
		System.out.println("\n\n" +session.getId() + " Exception 발생: " + exception.getMessage());
	}

	
}
