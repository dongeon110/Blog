//직원 정보 조직도
var user = function(popupId, option){
    //좌측 리스트 초기화
    $(".org-box").empty();
    

    if(option.type == 'user'){    	//직원정보만 사용하는경우
        
        if(option.tepType != undefined){
            $("#userCount").show();
            $("#userCount").text(option.exData.userCount + "/1000");
            $("#contentList").css("height", "570px");
        }
        $("#selectChartList option[value='2']").remove();
        $("#selectChartList option[value='3']").remove();
        $("#selectChartList option[value='4']").remove();
        
    }else if(option.type == 'alarm'){// 알림전송
        
        $("#selectChartList option[value='3']").remove();
        $("#selectChartList option[value='4']").remove();
    }
    
    
    var srchBox = 
    '<div><input type="text" id="srchPerson" class="form-control" style="width:360px; margin-top: 4px;" placeholder="검색어를 입력해 주세요"></div><div class="scroll-box" id="userInfoList" style="height:630px; border: ridge; margin-right: 0px; " ><ul class="org-list org-dep1" ></ul></div>';
    $(".org-box").append(srchBox);
    
    //트리 생성
    $.ajax({
        url : '/cdps/com/gis/organization/selectUser.do',
        type : 'post',
        dataType : 'json',
        success : function(result){
            
            var data = JSON.parse(result);
            
            // jstree 표출될 array
            var jstreeArray = [];
            
            // 부서 조직도 object
            var dptmtObj = null;
      
            var secondArray = [];
            var thirdArray = [];

            $.each(data.department, function(k,v){
                if(v.orgnztUpperId === 'ROOT') {
                    dptmtObj = {
                        id:  v.orgnztId+''
                        , text : v.orgnztNm
//                            , icon : ctx+'/images/tree-icon.png'
                        , data : v
                        , children : []
                    };
                    jstreeArray.push(dptmtObj);
               
                    $.each(data.user, function(k,v){
                        
                        if(dptmtObj.id == v.orgnztId){
                            
                            var textValue = v.emplyrNm;
                            if(v.ofcpsCd != undefined){
                                textValue = textValue + " " + v.ofcpsNm;
                            }
                            
                            let	userObj = {
//    	                                id:  v.orgnztId+''
                                    id:  v.emplyrId+''
                                    , text : textValue
                                    //, icon : ctx+'/images/tree-icon.png'
                                    , data : v
                                    , children : []
                                    , userOrder : jobUserArray.length
                                };
                            
                            dptmtObj.children.push(userObj);
//								jobUserArray.push(userObj);
                        } 
                        
                    }) 
                    
                }
                else if(v.orgnztUpperId === "3600000" && v.level === 1) {

                    if (dptmtObj !== undefined) {                       	
                        let secondObj = {
                            id:  v.orgnztId+''
                            , text : v.orgnztNm
                            //, icon : ctx+'/images/tree-icon.png'
                            , data : v
                            , children : []
                        };                        	
                        $.each(data.user, function(k,v){    							
                            if(secondObj.id == v.orgnztId){   	
                                
                                var textValue = v.userNm;
                                if(v.ofcpsCd != undefined){
                                    textValue = textValue + " " + v.ofcpsNm;
                                }
                                
                                
                                let	secondUserObj = {
                                        id:  v.jobUserId+''
                                        , text : textValue
                                        //, icon : ctx+'/images/tree-icon.png'
                                        , data : v
                                        , children : []
                                , userOrder : jobUserArray.length
                                    };    								
                                secondObj.children.push(secondUserObj);   	
//    								jobUserArray.push(secondUserObj);
                            }     							
                        }) 
                                                    
                        $.each(data.department, function(k,v){                       		
                            if(v.orgnztUpperId === secondObj.id && v.level === 2){
                                
                                if (secondObj !== undefined) {                        				
                                    let	thirdObj = {
                                        id:  v.orgnztId+''
                                        , text : v.orgnztNm
                                        //, icon : ctx+'/images/tree-icon.png'
                                        , data : v
                                        , children : []
                                    };
                                                                           
                                    $.each(data.user, function(k,v){                							
                                        if(thirdObj.id == v.orgnztId){
                                            
                                            var textValue = v.userNm;
                                            if(v.ofcpsCd != undefined){
                                                textValue = textValue + " " + v.ofcpsNm;
                                            }
                                            
                                            let	thirdUserObj = {
                                                    id:  v.jobUserId+''
                                                    , text : textValue
                                                    //, icon : ctx+'/images/tree-icon.png'
                                                    , data : v
                                                    , children : []
                                            , userOrder : jobUserArray.length
                                                };    
                                            
                                            
                                            thirdObj.children.push(thirdUserObj);     
//                								jobUserArray.push(thirdUserObj);
                                        }    
                                        
                                    })
                                        $.each(data.department, function(k,v){                       		
                                            if(v.orgnztUpperId === thirdObj.id && v.level === 3){
                                                                                                
                                                if (thirdObj !== undefined) {                        				
                                                    let	fourthObj = {
                                                        id:  v.orgnztId+''
                                                        , text : v.orgnztNm
                                                        //, icon : ctx+'/images/tree-icon.png'
                                                        , data : v
                                                        , children : []
                                                    };
                                                                               
                                                    // 팀장 추가
                                                    $.each(data.user, function(k,v){                							
                                                        if(fourthObj.id == v.orgnztId && v.ofcpsCd != ''){
                                                            
                                                            var textValue = v.userNm;
                                                            if(v.ofcpsCd != undefined){
                                                                textValue = textValue + " " + v.ofcpsNm;
                                                            }
                                                            
                                                            let	fourthUserObj = {
                                                                    id:  v.jobUserId+''
                                                                    , text : textValue
                                                                    //, icon : ctx+'/images/tree-icon.png'
                                                                    , data : v
                                                                    , children : []
                                                            , userOrder : jobUserArray.length
                                                                };    
                                                            
                                                            fourthObj.children.push(fourthUserObj);           
//				                								jobUserArray.push(fourthUserObj);
                                                        }                 							
                                                    }) 
                                                    
                                                    
                                                    var fourthUserObjArray = [];
                                                    
                                                    // 팀원들 추가
                                                    $.each(data.user, function(k,v){
                                                        
                                                        
                                                        if(fourthObj.id == v.orgnztId && v.ofcpsCd == ''){
                                                            
                                                            var textValue = v.userNm;
                                                            if(v.ofcpsCd != undefined){
                                                                textValue = textValue + " " + v.ofcpsNm;
                                                            }
                                                            
                                                            let	fourthUserObj = {
                                                                    id:  v.jobUserId+''
                                                                    , text : textValue
                                                                    //, icon : ctx+'/images/tree-icon.png'
                                                                    , data : v
                                                                    , children : []
                                                                    , userOrder : jobUserArray.length
                                                                    , userOrder2 : v.emplyrOrdr
                                                                };    
                                                            
                                                            fourthUserObjArray.push(fourthUserObj);
//				                								jobUserArray.push(fourthUserObj);
                                                        }
                                                        
                                                        
                                                    })
                                                    
                                                    // 팀원 정렬
                                                    fourthUserObjArray.sort(function(a,b){
                                                        
                                                        return a.userOrder2 - b.userOrder2
                                                        
                                                    });
                                                    
                                                    // fourthObj에 추가
                                                    for(var i=0;i<fourthUserObjArray.length;i++){
                                                        
                                                        fourthObj.children.push(fourthUserObjArray[i]);
                                                        
                                                    }
                                                    
                                                    
                                                    thirdObj.children.push(fourthObj);
                                                }
                                                          
                                            
                                            }
                                        }) 
                                    
                                    secondObj.children.push(thirdObj);
                                }
                            }               
                            
                        })                       	
                        dptmtObj.children.push(secondObj);
                    }                       
                }
                
            })                 
            
            $(".org-list.org-dep1").jstree({
                core : {
                    check_callback : true,
                    data : jstreeArray
                },
                plugins : [ 'checkbox', 'types', 'search'], // , 'sort' , 'states', 'dnd', "wholerow"
                checkbox: {
                    keep_selected_style: false
                },
                search : {
                    show_only_matches: true
                }
            }).on("ready.jstree", function() {
                $module.setLoadingBarEnd();
                $(".org-list.org-dep1").jstree("open_node", "3600000");
                // 전체 체크박스 확인
                $("#orgChartList").unbind('change').bind('change',function(){
                    if($("#orgChartList input[name='orgCheckBox']").length == $("#orgChartList input:checked[name='orgCheckBox']").length){
                        $("input[name='allCharList']").prop('checked',true);
                    }else{
                        $("input[name='allCharList']").prop('checked',false);
                    }
                    // 주소록 개수 카운트(제한주기위한 개수표출)
                    $("#userCount").text($("input[name='orgCheckBox']:checked").length +"/1000");
                })
                
//                	$(".org-list.org-dep1").jstree('open_all');
                
                // 레이어 목록 펼치기 체크 박스 체크 처리
                $('#layerTree_open_all').prop("checked", true);
                $(".org-list.org-dep1").css('display', 'block');
            
                // 기존 선택된 항목 체크 처리
                if(option.selectedWrkrList){ //근무자
                    
                    option.selectedWrkrList(option.eventType);
                    
                 }
                
                if(option.exData){ //직원정보 공통
                    
                    option.callbackUserChecked(option.exData);
                    
                } setModuleEvent2(popupId, option);
            });