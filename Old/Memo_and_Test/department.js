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
                    // ????????? ?????? ????????? ?????? ?????? ?????? ??????
                    $('#layerTree_open_all').prop("checked", true);
                    $(".org-list.org-dep1").css('display', 'block');
                    // ?????? ????????? ?????? ?????? ??????
                    
                    if(option.selectedWorkFrmtnDepart){
                    	option.selectedWorkFrmtnDepart();
                    }
                    
                    $('.jstree').bind('select_node.jstree', function(event, data){
                    	// ????????? ???????????? ??? ????????? ?????? ??????
                    	
                    	console.log("---select---")
                    	console.log(data.node);
                    	departOrderArray.push(data.node)
                    	console.log("===select===")
                    	console.log(departOrderArray)
                    	
                    });
                    
                    $('.jstree').bind('deselect_node.jstree', function(event, data){
                    	// ????????? ?????? ?????? ?????? ??? ????????? ?????? ??????
                    	
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