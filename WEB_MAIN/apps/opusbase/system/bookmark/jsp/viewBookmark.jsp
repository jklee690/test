<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html style="min-width:0!important">
<head>
	<title>OPUS Forwarding</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="style/css/theme_default.css" />
	<!-- common js include -->
	<script src="./js/ibsheet/ibsheet.js" ></script>
	<script src="./js/common/IBSheetInfo.js" ></script>
	<script src="./js/common/IBSheetConfig.js" ></script>
	<script src="./js/common/CoBizCommon.js" ></script>
	<script src="./js/common/CoMessage.js" ></script>
	<script src="./js/common/CoCommon.js" ></script>
	<script src="./js/common/CoFormControl.js" ></script>
	<script src="./js/common/CoAxon.js"></script>
	<script src="style/js/jquery-1.11.0.min.js"></script>
	<script src="style/js/jquery-ui.js"></script><!-- 이파일 로드 -->
	<!-- common js include -->
	<script>
	$(window).load(function(){
		
		$(".btn_add_favorites").bind({
			
			click: function(){
				var btnText = $(this).text();
				var curPgmNo = parent.document.getElementById("prm_seq").value;
				var uiTitle = parent.document.getElementById("prm_nm").value;
				var f_dp_nm = document.form.in_dp_nm;
				
				if(btnText.indexOf("Add") != -1) {
					if(f_dp_nm.value != "") uiTitle = f_dp_nm.value;
					$(this).text("Delete From Favorites").addClass("btn_add_favorites_on");
					createRemoveBookmark(1,curPgmNo,uiTitle);
					f_dp_nm.style.display = "none";
					f_dp_nm.value = "";
				} else {
					$(this).text("Add To Favorites").removeClass("btn_add_favorites_on");
					createRemoveBookmark(2,curPgmNo,uiTitle);
					f_dp_nm.style.display = "inline";
				}
			},
			
			mouseenter : function(){
				if($(this).text().toLowerCase().indexOf("delete") < 0) {
					if(parent.document.getElementById("prm_nm").value == $("#in_dp_nm").val() || $("#in_dp_nm").val() == ""){
						$("#in_dp_nm").val(parent.document.getElementById("prm_nm").value);
					}
					$(".fav_inputBox").stop().animate({height:41},150);
					
					$("#in_dp_nm").focus();
				}
			},
			mouseup : function(){
				$(".fav_inputBox").stop().animate({height:0},150);
			},
			mouseleave : function(e){
				// box hide
				if(!$(e.relatedTarget).parent().hasClass("fav_inputBox") && !$(event.relatedTarget).hasClass("fav_inputBox")) {
					$(".fav_inputBox").stop().animate({height:0},150);
				}
			}
			
		});
		
		
		// box hide
		$(".fav_inputBox").bind("mouseleave",function(event){
			$(".fav_inputBox").stop().animate({height:0},150);
		});
		
		
		
	/* $("#btn_Del").click(function(){
			
			if(ComShowConfirm("Do you really want to delete?")){
				
				var formObj = document.form;
				var favChk = formObj.favChk;
				var i = 0;
				if(typeof(favChk.length)=="number"){
					for(var j=0;j<favChk.length;j++){
						if(favChk[j].checked == true){
							formObj.f_cmd.value=REMOVE;
							sheet1.GetSaveData("CREATEREMOVEBOOKMARK.do", FormQueryString(formObj)+"&ibflag=D&pgm_no="+favChk[j].value);
							i++;
						}
					}
				} else {
					if(favChk.checked == true){
						formObj.f_cmd.value=REMOVE;
						sheet1.GetSaveData("CREATEREMOVEBOOKMARK.do", FormQueryString(formObj)+"&ibflag=D&pgm_no="+favChk.value);
						i++;
					}
				}
					
				if(i>0){
					$("#favList").empty();
					searchBookmark();
				}
			}
			
		}); */
		
		
		
		$("#btn_Del").click(function(){
			var formObj = document.form;
			var favChk = formObj.favChk;
			
			if(typeof(favChk.length)=="number"){
				for(var j=0;j<favChk.length;j++){
					if(favChk[j].checked == true){
						formObj.f_cmd.value=REMOVE;
						var intRows=sheet1.LastRow()+1;
						sheet1.DataInsert(intRows);
						sheet1.SetCellValue(intRows, "pgm_no", favChk[j].value);
					}
				}
			} else {
				if(favChk.checked == true){
					formObj.f_cmd.value=REMOVE;
					var intRows=sheet1.LastRow()+1;
					sheet1.DataInsert(intRows);
					sheet1.SetCellValue(intRows, "pgm_no", favChk.value);
				}
			}
			
			sheet1.DoSave("viewBookmark.clt", FormQueryString(formObj), "ibflag", false);
		});
	});
	</script>
	<script>
	  	function loadPage() {
			var sheetObj=sheet1;
			sheetObj.SetWaitTimeOut(10);
			comConfigSheet(sheetObj,SYSTEM_FIS);
			initSheet(sheetObj,1);
			comEndConfigSheet(sheetObj);
			
			searchBookmark();
		}
	  	
		function sheet1_OnSearchEnd(sheetObj, ErrMsg) {
			var formObj = document.form;
			var f_dp_nm = formObj.in_dp_nm;
			
			with(sheetObj){
				var favList = document.getElementById("favList");
				var curPgm = parent.document.getElementById("prm_seq").value;
				
				var curFlag = "N";
				if(curPgm == ""){
					curFlag = "X";
				}
				
				for(var j=1;j<= sheetObj.RowCount();j++){
					var tmpPgm = sheetObj.GetCellValue(j,"pgm_no");
					if(curPgm == tmpPgm){
						curFlag = "Y";
					} 
						
					var li;
					
					if (sheetObj.GetCellValue(j,"lvl") == "1") {
						li = document.createElement("li");
						
						var strong = document.createElement("strong");
						strong.appendChild(document.createTextNode("* " + sheetObj.GetCellValue(j,"dp_nm")));
						li.appendChild(strong);
						
						br = document.createElement("br");
						li.appendChild(br);
						
					} else if (sheetObj.GetCellValue(j,"lvl") == "2") {
						var em = document.createElement("em");
						em.appendChild(document.createTextNode("- " + sheetObj.GetCellValue(j,"dp_nm")));
						li.appendChild(em);
						
						var br = document.createElement("br");
						li.appendChild(br);
						
					} else {
						var span = document.createElement("span");
						
						var checkbox = document.createElement("input");
						checkbox.type = "checkbox";
						if(j<10) checkbox.id = "fav_0"+j;
						else checkbox.id = "fav_"+j;
						checkbox.name = "favChk";
						checkbox.value = tmpPgm;
						
						var label = document.createElement("label");
						label.setAttribute("for",checkbox.id);
						
						var aLink = document.createElement("a");
						aLink.setAttribute("href",sheetObj.GetCellValue(j,"pgm_url"));
						aLink.setAttribute("target","_blank");
						aLink.appendChild(document.createTextNode(sheetObj.GetCellValue(j,"dp_nm")));
						label.appendChild(aLink);
						
						span.appendChild(checkbox);
						span.appendChild(label);
						
						li.appendChild(span);
						
						var br = document.createElement("br");
						li.appendChild(br);
						
						if (sheetObj.GetCellValue(j+1,"lvl") == "1") {
							br = document.createElement("br");
							li.appendChild(br);
						}
						
						favList.appendChild(li);
					}
					//alert(favList.innerHTML);
				}
				
				if(curFlag=="Y"){
					$(".btn_add_favorites").text("Delete From Favorites").addClass("btn_add_favorites_on");
					f_dp_nm.style.display = "none";
				} else {
					$(".btn_add_favorites").text("Add To Favorites").removeClass("btn_add_favorites_on");
					f_dp_nm.style.display = "inline";
					
					if(curFlag=="X"){
						$(".btn_add_favorites").attr('disabled', 'disabled');
						$(".btn_add_favorites").addClass('notactive');
					}
				}
			}
		}
		
		function sheet1_OnSaveEnd(sheetObj, errMsg){
			$("#favList").empty();
			searchBookmark();
		}
		
		function searchBookmark(){
			var sheetObj=sheet1;
			doActionIBSheet(sheetObj,document.form,IBSEARCH);
		}
		
		/*function addBookmarkItem(pgmNo,dpNm){
			var favList = document.getElementById("favList");
			var li = document.createElement("li");
			var checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			var i = sheet1.RowCount()+1;
			if(i<10) checkbox.id = "fav_0"+i;
			else checkbox.id = "fav_"+i;
			var aLink = document.createElement("a");
			aLink.setAttribute("href","/opuscntr/"+pgmNo+".do");
			aLink.setAttribute("target","_blank");
			aLink.appendChild(document.createTextNode(dpNm));
			li.appendChild(checkbox);
			li.appendChild(aLink);
			favList.appendChild(li);
		}*/
		
		function createRemoveBookmark(cmd,pgmNo,dpNm){
			var formObj = document.form;
			var sndParam;
			
			if(cmd==1){
				formObj.f_cmd.value=ADD;
				sheet1.DataInsert(1);
				sheet1.SetCellValue(1, "dp_nm", dpNm);
				sheet1.SetCellValue(1, "pgm_no", pgmNo);
				sheet1.DoSave("viewBookmark.clt", FormQueryString(formObj), "ibflag", false);
				
			}else{
				formObj.f_cmd.value=REMOVE;
				sheet1.DataInsert(1);
				sheet1.SetCellValue(1, "pgm_no", pgmNo);
				sheet1.DoSave("viewBookmark.clt", FormQueryString(formObj), "ibflag", false);
			}//end if
		}
		
		// Sheet관련 프로세스 처리
		function doActionIBSheet(sheetObj,formObj,sAction) {
			//sheetObj.ShowDebugMsg(true);
	    	switch(sAction) {
				case IBSEARCH:      //조회
					formObj.f_cmd.value=SEARCH;
	 				sheetObj.DoSearch("viewBookmarkGS.clt", FormQueryString(formObj) );
					break;
	  		}
		  }
		
		function initSheet(sheetObj,sheetNo,flag) {
		    var cnt=0;
		    var sheetID=sheetObj.id;
		    switch(sheetID) {
		       case "sheet1":
	               with(sheetObj){
				       var HeadTitle1="|||Bookmark Name|";
				
				       SetConfig( { SearchMode:2, MergeSheet:0, Page:100, FrozenCol:0, DataRowMerge:1 } );
				
				       var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
				       var headers = [ { Text:HeadTitle1, Align:"Center"} ];
				       InitHeaders(headers, info);
				
				       var cols = [ {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"level",    		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1, TreeCol:1 },
				                    {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"dp_nm",    		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				                    {Type:"Text",      Hidden:1,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"fol_flg",    	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				                    {Type:"Text",      Hidden:1,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"pgm_no",   		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				                    {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dp_seq",   		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
									{Type:"Text",      Hidden:1,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"prnt_pgm_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
									{Type:"Text",      Hidden:1,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"pgm_nm",   		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
									{Type:"Text",      Hidden:1,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"pgm_url",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
									{Type:"Text",      Hidden:1,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"lvl",  			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
									{Type:"Status",    Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
				        
				       InitColumns(cols);
				       sheetObj.SetFocusAfterProcess(0);
			       }
	
				break;
			}
	    }
	</script>
</head>
<body onLoad="loadPage();">
<form name="form">
	<input type='hidden' name='f_cmd' />
	<h2 class="fav_h">Favorite links</h2>
	<!-- favorites(S) -->
	<div class="favorites">
		<button type="button" class="btn_add_favorites">Add to Favorites</button>
		<div class="fav_inputBox">
 			<label for="in_dp_nm">Program Name</label><!-- 
		 --><input type="text" name="in_dp_nm" id="in_dp_nm" dataformat="engup" maxlength="50" />
		</div>
        <ul id="favList"></ul>
        <button type="button" class="btn_normal floatR" name="btn_Del" id="btn_Del">Delete Selected Items</button>
    </div>
    <!-- favorites(E) -->
    <div id="mainTable" style="position:absolute;top:-9999px;left:-9999px">
		<script type="text/javascript">comSheetObject('sheet1');</script>
    </div>
</form>
</body>
</html>