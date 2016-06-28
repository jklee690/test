//=========================================================
//*@FileName   : MGT_JOB_0010.jsp
//*@FileTitle  : Job Management
//*@Description: Trade Partner ManagementList
//*@author     : Phitran
//*@since      :06/11/2014
//*@Change history:
//	<script language="javascript" src="<%=CLT_PATH%>/web/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js"></script>
//=========================================================
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var formObj=document.frm1;
    var sheetObj1=docObjects[0];
    //var sheetObj2 = docObjects[1];
    switch(srcName) {
    	//NEW 버튼을 눌렀을때 Default 데이터를 조회한다.
       case "NEW":
    	  //sheetObj1.ShowDebugMsg = true;
    	   /*
    	  formObj.f_cmd.value=SEARCHLIST01;
	      //검증로직
	      if(validateForm(sheetObj1, formObj, SEARCHLIST, 1)){
	    	  formObj.tmplet_del.checked=false;
	    	  var c_code=document.getElementById('category_code');
	    	  var c_idx=c_code.selectedIndex;
	    	  formObj.c_code.value=c_code.options[c_idx].value;
//method change[check again]CLT 	          sheetObj1.DoSearch("MGT_JOB_0010GS.clt", FormQueryString(formObj) );
	          var template_code=formObj.template_code.value;
	          formObj.tmplt_nm.value="";
	          formObj.description.value="";	
	          formObj.basic_time[0].selected=true;
			  formObj.cal_loc[0].selected=true;
    	  }
    	  */
    	   doShowProcess();
			var currLocUrl=this.location.href;
			currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
			currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
//			parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
			window.location.href = currLocUrl
			break;
       case "SEARCHLIST":
    	   if(formObj.template_code.value == ""){
    		   //Choose from the [Template List].
    		   alert(getLabel('FMS_COM_ALT014') + "\n - " + getLabel('TMP_LIST'));    		   
    	   }else{
	           formObj.f_cmd.value=SEARCHLIST02;
	           formObj.tmplet_del.checked=false;
	           formObj.f_Flag.value="U";
	           if(validateForm(sheetObj1, formObj, SEARCHLIST, 1)){
	 	    	  var c_code=document.getElementById('category_code');
		    	  var c_idx=c_code.selectedIndex;
		    	  formObj.c_code.value=c_code.options[c_idx].value;
	        	   sheetObj1.DoSearch("MGT_JOB_0010GS.clt", FormQueryString(formObj) );
	           }
	           var template_code=formObj.template_code.value;
	           //Name/Description 검색
	           ajaxSendPost(seachTemplateInfo, 'reqVal', '&goWhere=aj&bcKey=seachTemplateInfo&template_code='+template_code, './GateServlet.gsl');                        
    	   }
       break;
       case "MODIFY1":    	   
    	   formObj.f_cmd.value=MODIFY;
    	   formObj.work_flg.value="MODIFY";
    	   //삭제
    	   if(formObj.tmplet_del.checked == true){
     		  formObj.tmp_del.value="Y";     		  
	     	  doWork("REMOVE");
     	   }else{
     	   //NULL체크
     	   if(checkAddModiVal(frm1)){
	     	   //등록/수정
	     	   var v=formObj.tmp_seq.value; //Template seq
			   var t=formObj.tmplt_nm.value; //Template text
			   var tc=document.getElementById('template_code');
			   var tl=tc.length;
			   var check_flg="";
 			   for(var i=1 ; i <= sheetObj1.LastRow(); i++){
 				   if(sheetObj1.GetCellValue(i, "ibflag") == "I"){
						check_flg="err";
				   }
			   }
			   //ibflag가 I(insert)일때는 중복으로 이름이 들어갈 수 없다.
			   for(var i=1 ; i < tl ; i++){
				   if(t == tc.options[i].text && check_flg == "err"){
					   //alert("이미 존재하는 Template Name 입니다.");
					   alert(getLabel('FMS_COM_ALT013') + "\n - " + getLabel('TMP_NAME'));
					   return false;
				   }
			   }
	    	   if (confirm(getLabel('FMS_COM_CFMSAV'))){
	    		   doProcess=true;
	    		   sheetObj1.DoSave("MGT_JOB_0010GS.clt", FormQueryString(formObj),"ibflag",false);
				   //Saved successfully
	    		   //Templet List 검색
	    		   doTplAction();
	    		   for(var i=1 ; i < tl ; i++){
	    			   if(v == tc.options[i].value ){
	    				   tc.options[i].selected=true; 
	    			   }
	    		   }
	    	   }
		   }
       }
   	   break;
       case "REMOVE":
    	   //doProcess = true;    	   
    	   //formObj.action = "./MGT_JOB_0010.clt";
    	   if ( confirm(getLabel('FMS_COM_CFMDEL')) ) {
    	   	   formObj.f_cmd.value=REMOVE;
    	   	   formObj.work_flg.value="REMOVE";
 	       for(var i=1 ; i <= sheetObj1.LastRow(); i++){
			       sheetObj1.SetCellValue(i, "ibflag","D");
			   }
			   doProcess=true;
	    	   sheetObj1.DoSave("MGT_JOB_0010GS.clt", FormQueryString(formObj),"ibflag",false);
	    	   //Templet List 검색
    		   doTplAction();
    		   for(var i=1 ; i < tl ; i++){
    			   if(v == tc.options[i].value ){
    				   tc.options[i].selected=true; 
    			   }
    		   }
    		   formObj.tmplt_nm.value="";
    		   formObj.description.value="";
    		   formObj.tmplet_del.checked=false;
    		   formObj.basic_time[0].selected=true;
    		   formObj.cal_loc[0].selected=true;
    		   //deleted successfully
    	   }
    	   //formObj.submit();
  		   //Templet List 검색
  		   doTplAction();
	   break;
   	   case "TPLSEARCH":
   		   //Template List항목 삭제
		   document.frm1.template_code.options[0]=new Option( '',  ''  );
		   document.frm1.template_code.options.length='1';
   		   //Templet List 검색
   		   doTplAction();
   		   //BasicTime 검색
    		doBasicTime();
	   break;
	   case "SAVE":
   		   check_save_null();
	   break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    //Templet List 검색
    doTplAction();
    //BasicTime 검색
    doBasicTime();
}
//조회 후 그리드 데이터를 각 필드에 셋팅한다.
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
	//NEW버튼 눌렀을때
	if( formObj.f_cmd.value == SEARCHLIST01){	
 		for(var i=1 ; i <= sheetObj1.LastRow(); i++){
			sheetObj1.SetCellValue(i, "dur_tm_qty",0,0);
			//NEW일경우 ibflg를 I로 셋팅해준다.
			sheetObj1.SetCellValue(i, "ibflag","I");
		}
	}else{//조회했을때
		//삭제를 위해 jb_tmplt_seq를 hidden으로 셋팅한다.
		//formObj.tmp_seq.value = sheetObj1.CellValue(sheetObj1.lastRow, "jb_tmplt_seq");
		formObj.tmp_seq.value=formObj.template_code.value;
	}
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
	if(errMsg=="" || errMsg==undefined || errMsg==null ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj1 ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
			       
			      //(8, 0, 0, true);
		
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
		
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('MGT_JOB_0010_HDR'), Align:"Center"} ];
			      InitHeaders(headers, info);
		
			      var cols = [ {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
			             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"jb_tmplt_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"bl_sts_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:600,  Align:"Left",    ColMerge:1,   SaveName:"bl_sts_lbl",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:200,  Align:"Center",  ColMerge:1,   SaveName:"srt_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:200,  Align:"Right",   ColMerge:1,   SaveName:"dur_tm_qty",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"CheckBox",  Hidden:0, Width:150,  Align:"Center",  ColMerge:1,   SaveName:"delt_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:150,   Align:"Right",   ColMerge:1,   SaveName:"work_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
			       
			      InitColumns(cols);
		
			      SetEditable(1);
			      SetSheetHeight(500);
			      resizeSheet();
	            }

                                       
		break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//저장하기전 null 체크
function check_save_null(){
	var sheetObj=docObjects[0];
	var check_value=0;
	for(var i=1; i <= sheetObj.RowCount(); i++){
		if (sheetObj.GetCellValue(i, "dur_tm_qty") == ""){
			//alert("Duration(Hour) Data Insert.");		
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('DUR_HOUR'));
			check_value ++;
			break;
		}	
	if (sheetObj.GetCellValue(i, "rmk") == ""){
			//alert("Remark Data Insert.");	
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('DESC'));
			check_value ++;
			break;
		}		
	}
	//alert(check_value);
	if(check_value == 0){
		doWork("MODIFY1");
	}
}
/**
 * 수정가능/불가능을 체크
 */
function modi_yn(){
	var sheetObj2=docObjects[1];
var flag=sheetObj2.GetCellValue(2, "modi_flg");
	//alert(flag);
    if(flag == "false" ){
    	document.getElementById("delete_btn").style.display='none';
    	document.getElementById("save_btn").style.display='none';
	}else{    	
    	document.getElementById("delete_btn").style.display='block';
    	document.getElementById("save_btn").style.display='none';
	}
}
function rowUp(){
	var sheetObj=docObjects[0];
	var selRow=sheetObj.GetSelectionRows();
	if(Number(sheetObj.GetCellValue(selRow, "srt_seq")) > 1){
		//선택한 Row를 한줄 위로 올린다.
	sheetObj.SetCellValue(selRow, "srt_seq",Number(sheetObj.GetCellValue(selRow, "srt_seq")) - 1,0);
		//한줄위의 Row를 한줄 아래로 내린다.
		sheetObj.SetCellValue(Number(selRow)-1, "srt_seq",selRow,0);
		//정렬을 한다.
		sheetObj.ColumnSort("srt_seq","ASC");
		//포커스를 유지한다.
		sheetObj.SelectCell(Number(sheetObj.GetCellValue(selRow, "srt_seq")) - 1, 2);
		//포커스색상을 준다.
		for(var i=0; i<sheetObj.LastCol(); i++){
	    	sheetObj.GetRowBackColor(Number(sheetObj.SetCellValue(selRow, "srt_seq")) - 1,"#DFFFFF");
	    }
	}	
}
//그리드 up/down
function rowDown(){
	var sheetObj=docObjects[0];
	var selRow=sheetObj.GetSelectionRows();
	if(Number(sheetObj.GetCellValue(selRow, "srt_seq")) < sheetObj.LastRow()){
		//선택한 Row를 한줄 위로 내린다.
	sheetObj.SetCellValue(selRow, "srt_seq",Number(sheetObj.GetCellValue(selRow, "srt_seq")) + 1,0);
		//한줄아래의 Row를 한줄 위로 올린다.		
		sheetObj.SetCellValue(Number(selRow)+1, "srt_seq",selRow,0);
		//정렬을 한다.
		sheetObj.ColumnSort("srt_seq","ASC");
		//포커스를 유지한다.
		sheetObj.SelectCell(Number(sheetObj.GetCellValue(selRow, "srt_seq")) + 1, 2);
		//포커스색상을 준다.
		for(var i=0; i<sheetObj.LastCol(); i++){
	    	sheetObj.GetRowBackColor(Number(sheetObj.SetCellValue(selRow, "srt_seq")) + 1,"#DFFFFF");
	    }
	}	
}
/**
 * Templet List 검색
 */
function doTplAction(){
//조회조건 Templet List 검색
	var formObj=document.frm1;	
	var category_code=formObj.category_code.value;
	if(category_code==""){
		document.frm1.category_code.options[0]=new Option( '',  ''  );
		document.frm1.category_code.options.length='1';
		return;
	}
	CODETYPE="Templet";
	ajaxSendPost(dispCntAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchTemplateCombo&category_code='+category_code, './GateServlet.gsl');
}
//BasicTime Code 조회
function doBasicTime(){
	var formObj=document.frm1;	
	var category_code=formObj.category_code.value;
	if(category_code==""){
		document.frm1.category_code.options[0]=new Option( '',  ''  );
		document.frm1.category_code.options.length='1';
		return;
	}
	//alert("category_code===>"+category_code);
	if(category_code == "AO" || category_code == "AI"){
		category_code="C054"
	}else{
		category_code="C053"
	}
	CODETYPE="BasicTime";
	ajaxSendPost(dispCntAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchBasicTimeCombo&category_code='+category_code, './GateServlet.gsl');
}
//Templet List 조회
function dispCntAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	//alert("reqVal===>");
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var arrLen=rtnArr.length;
			if(CODETYPE == "Templet"){
				var tempLen=document.frm1.template_code.length=0;
				document.frm1.template_code.options[0]=new Option("", "");
				//alert(arrLen);
				for( var i=1; i < arrLen ; i++ ){
					var masterVals=rtnArr[i-1].split(',');	
					//alert("masterVals[0]===>"+masterVals[0]);
					//alert("masterVals[1]===>"+masterVals[1]);
					document.frm1.template_code.options[i]=new Option(masterVals[1],masterVals[0]);
				}	
			}else if(CODETYPE == "BasicTime"){
				var tempLen=document.frm1.basic_time.length=0;
				//alert(arrLen);
				for( var i=0; i < arrLen-1 ; i++ ){
					var masterVals=rtnArr[i].split(',');	
					document.frm1.basic_time.options[i]=new Option(masterVals[1],masterVals[0]);
				}	
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
//Name / Description 조회
function seachTemplateInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(',');
			var arrLen=rtnArr.length;
			document.frm1.tmplt_nm.value=rtnArr[0];
			document.frm1.description.value=rtnArr[1];
			document.frm1.basic_time.value=rtnArr[2];
			document.frm1.cal_loc.value=rtnArr[3];
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}	
}
function checkAddModiVal(frm1){
	var formObj=document.frm1;
    if(checkInputVal(formObj.tmplt_nm.value, 1, 20, "T", getLabel('TMP_NAME'))!='O'){
    	return false;
    } else if(checkInputVal(formObj.description.value, 1, 200, "T", getLabel('DESC'))!='O'){
    	return false;
    }
    return true;
}
