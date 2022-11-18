<script type="text/javaScript" language="javascript" defer="defer"> 
var fn_Common = {
 	consoleLog			: function(data) {
							console.log("===============consoleLog====Start=================");
							console.log(data);
							$.each(data, function(i,v) {
							    console.log(i + "===>>" + v);
							});
							console.log("===============consoleLog=====End================");
 	},
 	jstree	:	function() {
        $('#jstree')
        .jstree({      
            core: {        
                check_callback: true,
                data: {  id : "ROOT" , text : "ROOT" }	/* 최초에 보여지 최상위 Root Tree */									    
            },
            types: {        
                "default" : {
                    "icon" : "glyphicon glyphicon-flash"
                },
                    file: {          
                    icon: "fa fa-file text-inverse fa-lg"        
                }      
            },
            plugins : [
                            "checkbox"
                        , "contextmenu"
                        , "dnd"
                        , "massload"
                        , "search"
                        , "sort"
                        , "state"
                        , "types"
                        , "unique"
                        , "wholerow"
                        , "changed"
                        , "conditionalselect"
            ]										    
        })   
        
        // .on("init.jstree", function () {}	// triggered after all events are bound											
        // .on("loading.jstree", function () {}	// triggered after the loading text is shown and before loading starts											
        // .on("destroy.jstree", function () {}// triggered before the tree is destroyed											
        // .on("loaded.jstree", function () {}	// triggered after the root node is loaded for the first time										
        // .on("ready.jstree", function () {}	// triggered after all nodes are finished loading										
        // .on("load_node.jstree", function (node, status) {}	// triggered after a node is loaded											
        // .on("load_all.jstree", function (node) {}	// triggered after a load_all call completes										
        // .on("model.jstree", function (nodes, parent) {}	// triggered when new data is inserted to the tree model										
        // .on("redraw.jstree", function (nodes) {}// triggered after nodes are redrawn											
        // .on("before_open.jstree", function (node) {	}// triggered when a node is about to be opened (if the node is supposed to be in the DOM, it will be, but it won't be visible yet)										
        // .on("open_node.jstree", function (node) {}	// triggered when a node is opened (if there is an animation it will not be completed yet)										
        // .on("after_open.jstree", function (node) {}	// triggered when a node is opened and the animation is complete											
        // .on("close_node.jstree", function (node) {}	// 	triggered when a node is closed (if there is an animation it will not be complete yet)										
        // .on("after_close.jstree", function (node) {}	// 	triggered when a node is closed and the animation is complete										
        // .on("open_all.jstree", function (node) {}	// 	triggered when an open_all call completes
        // .on("close_all.jstree", function (node) {}	// 	triggered when an close_all call completes
        // .on("enable_node.jstree", function (node) {}	// 	triggered when an node is enabled
        // .on("disable_node.jstree", function (node) {}	// 	triggered when an node is disabled
        // .on("hide_node.jstree", function (node) {}	// 	triggered when an node is hidden
        // .on("show_node.jstree", function (node) {}	// 	triggered when an node is shown
        // .on("hide_all.jstree", function (nodes) {}	// triggered when all nodes are hidden
        // .on("show_all.jstree", function (nodes) {}	// triggered when all nodes are shown
        // .on("activate_node.jstree", function (node) {node, event}	// triggered when an node is clicked or intercated with by the user
        // .on("hover_node.jstree", function (node) {}	// triggered when an node is hovered
        // .on("dehover_node.jstree", function (node) {}	// triggered when an node is no longer hovered
        // .on("select_node.jstree", function (node, selected, event) {}	// triggered when an node is selected
        // .on("changed.jstree", function (node, action, selected, event) {}	// triggered when selection changes
        // .on("deselect_node.jstree", function (node,selected, event) {}	// triggered when an node is deselected
        // .on("select_all.jstree", function (selected) {}	// triggered when all nodes are selected
        // .on("deselect_all.jstree", function (node, selected) {}	// triggered when all nodes are deselected
        // .on("set_state.jstree", function () {}	// triggered when a set_state call completes
        // .on("refresh.jstree", function (nodes) {}	// triggered when a refresh call completes
        // .on("refresh_node.jstree", function (node) {}	// triggered when a node is refreshed
        // .on("set_id.jstree", function (node, old) {}	// triggered when a node id value is changed
        // .on("set_text.jstree", function (obj, text) {}	// triggered when a node text value is changed
        // .on("create_node.jstree", function (node, parent, position) {}	// triggered when a node is created
        // .on("rename_node.jstree", function (node, text, old) {}	// triggered when a node is renamed
        // .on("delete_node.jstree", function (node, parent) {}	// triggered when a node is deleted
        // .on("move_node.jstree", function (node, parent, position, old_parent, old_position, is_multi, old_instance, new_instance) {}	// triggered when a node is moved
        // .on("copy_node.jstree", function (node, original, parent, position, old_parent, old_position, is_multi, old_instance, new_instance) {}	// triggered when a node is copied
        // .on("cut.jstree", function (node) {}	// triggered when nodes are added to the buffer for moving
        // .on("copy.jstree", function (node) {}	// triggered when nodes are added to the buffer for copying
        // .on("paste.jstree", function (parent, node, mode) {}	// triggered when paste is invoked
        // .on("clear_buffer.jstree", function () {}	// triggered when the copy / cut buffer is cleared
        // .on("set_theme.jstree", function (theme) {}	// triggered when a theme is set
        // .on("show_stripes.jstree", function () {}	// triggered when stripes are shown
        // .on("hide_stripes.jstree", function () {}	// triggered when stripes are hidden
        // .on("show_dots.jstree", function () {}	// triggered when dots are shown
        // .on("hide_dots.jstree", function () {}	// triggered when dots are hidden
        // .on("show_icons.jstree", function () {}	// triggered when icons are shown
        // .on("hide_icons.jstree", function () {}	// triggered when icons are hidden
        // .on("show_ellipsis.jstree", function () {}	// triggered when ellisis is shown
        // .on("hide_ellipsis.jstree", function () {}	// triggered when ellisis is hidden
        
                
        // **** plugin event  *****
        // .on("changed.jstree", function (node, action, selected, event) {}	// changed : triggered when selection changes
        // .on("disable_checkbox.jstree", function (node) {}	// checkbox : triggered when an node's checkbox is disabled
        // .on("enable_checkbox.jstree", function (node) {}	// checkbox : triggered when an node's checkbox is enabled
        // .on("check_node.jstree", function (node, selected, event) {}	// checkbox : triggered when an node is checked (only if tie_selection in checkbox settings is false)
        // .on("uncheck_node.jstree", function (node, selected, event) {}	// checkbox : triggered when an node is unchecked (only if tie_selection in checkbox settings is false)
        // .on("check_all.jstree", function (selected) {}	//  checkbox : triggered when all nodes are checked (only if tie_selection in checkbox settings is false)
        // .on("uncheck_all.jstree", function (node, selected) {}	// checkbox : triggered when all nodes are unchecked (only if tie_selection in checkbox settings is false)
        // .on("show_contextmenu.jstree", function (node, x, y) {}	// contextmenu : triggered when the contextmenu is shown for a node
        // .on("search.jstree", function (nodes, str, res) {}	// search : triggered after search is complete
        // .on("clear_search.jstree", function (nodes, str, res) {}	// search : triggered after search is complete
        // .on("state_ready.jstree", function (node) {}	// state  : triggered when the state plugin is finished restoring the state (and immediately after ready if there is no state to restore).
        
        .on("select_node.jstree", function (event, data) { // 노드가 선택된 뒤 처리할 이벤트									
            //var id = data.instance.get_node(data.selected).id;									    
            //console.log("data.node : " + JSON.stringify(data.node));
            // 선택한 Node에 따라 하위 목록 가져오기
            fn_Common.jstreeDynamic(data.node.id);
        });									
}, 	
	jstreeDynamic			:	function(selectedNode) {	
								 	$.ajax({
										 url 		: "/hsg/com/DeptTree.do"
								       , type		: "POST"
								       , dataType	: "json"
								       , async 		: false
								       , data 		: { id : selectedNode }
								       , success	: function(data){
												    	   $.each(data.dataList, function(i, obj) {
												    		   $('#jstree').jstree(
							    	   									'create_node'
							    	   								  , selectedNode
							    	   								  , {  "id": obj.id, "text": obj.text }
							    	   								  , "last"
							    	   								  , false
							    	   								  , false
							    	   							);	
															});										    	   
								       }
									   , error		: function() {}
									   , beforeSend	: function() {}
									   , complete	: function() {}
									});	
 	} 	
 }
 </script>