var departOrderArray = [];
				
				
                //
                $.each(data,function(k,v){
                	if(v.orgnztUpperId === 'ROOT') {
                		dptmtObj = {
                            id:  v.orgnztId+''
                            , text : v.orgnztNm
//                            , icon : ctx+'/images/tree-icon.png'
                            , data : v
                            , children : []
                        };
                        jstreeArray.push(dptmtObj);
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
                        	
                        	$.each(data,function(k,v){
                        		
                        		if(v.orgnztUpperId === secondObj.id && v.level === 2){
                        			
                        			if (secondObj !== undefined) {
                        				
                        				let	thirdObj = {
        	                                id:  v.orgnztId+''
        	                                , text : v.orgnztNm
        	                                //, icon : ctx+'/images/tree-icon.png'
        	                                , data : v
        	                                , children : []
        	                            };
                        				
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
                    plugins : [ 'checkbox', 'types', 'search'], // , 'sort' 
                    checkbox: {
                        keep_selected_style: false
                    },
                    search : {
                        show_only_matches: true
                    }
                }).on("ready.jstree", function() {
//                	$(".org-list.org-dep1").jstree('open_all');
                    // 레이어 목록 펼치기 체크 박스 체크 처리
                    $('#layerTree_open_all').prop("checked", true);
                    $(".org-list.org-dep1").css('display', 'block');
                    // 기존 선택된 항목 체크 처리
                    
                    if(option.selectedWorkFrmtnDepart){
                    	option.selectedWorkFrmtnDepart();
                    }
                    
                    $('.jstree').bind('select_node.jstree', function(event, data){
                    	// 노드를 선택했을 때 적용할 코드 작성
                    	
                    	console.log("---select---")
                    	console.log(data.node);
                    	departOrderArray.push(data.node)
                    	console.log("===select===")
                    	console.log(departOrderArray)
                    	
                    });
                    
                    $('.jstree').bind('deselect_node.jstree', function(event, data){
                    	// 노드를 선택 해제 했을 때 적용할 코드 작성
                    	
                    	console.log("---deselect---")
                    	console.log(data.node);
//                    	
                    	var item1 = departOrderArray.indexOf(data.node);
                    	console.log(item1);
                    	departOrderArray.splice(item1, 1)
                    	console.log("===deselect===")
                    	console.log(departOrderArray)
                    	
                    });
                    
                    

                });