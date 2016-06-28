var idChk = false;

function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj1=docObjects[1];
    var formObj=document.frm1;
    try {
        switch(srcName) {
           case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                	sheetObj.DoSearch("UserMngListGS.clt", FormQueryString(formObj) );
                }
           break;
           case "SAVE":
                formObj.f_cmd.value=MULTI;
                if(inpuValCheck(sheetObj)){
                    //전체 CellRow의 갯수
                	//Do you want to proceed?
                    if(confirm(getLabel('FMS_COM_CFMSAV'))){
                        doProcess=true;
                        //sheetObj.DoSave("UserMngListGS.clt", FormQueryString(formObj),"ibflag",false);
                        sheetObj.DoAllSave("UserMngListGS.clt", FormQueryString(formObj),false);
                    }                	
                }
           break;
           case "ROWADD":
        	   var intRows=docObjects[0].LastRow() + 1;
        	   var newRows=docObjects[0].DataInsert(intRows);
        	   sheetObj.SetCellValue(newRows, "usr_tp","I");
           break;
           case "SEARCHLIST01":
        	   formObj.f_cmd.value=SEARCHLIST01;
        	   formObj.f_usrid.value=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "usrid");
        	   sheetObj1.DoSearch("UserMngList_1GS.clt", FormQueryString(formObj) );
           break;
           case "EXCEL":
        	   if(sheetObj.RowCount() < 1){//no data	
	   	   			ComShowCodeMessage("COM132501");
	   	   		}else{
	   	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   	   		}
           break;
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }
    }
}

/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.frm1.f_CurPage.value=callPage;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.frm1.f_CurPage.value=1;
	doWork('SEARCHLIST');
}

function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value = 1;
		doWork('SEARCHLIST');
	}
}

/**
 * 좌측 메뉴조회
 */
function chgusrPwd(callId){
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=usrpwdchg&usrid='+callId, './GateServlet.gsl');
}
var calledMenu;
var displayedMenu;
//코드표시 Ajax
function dispAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//The passwords was reseted!
			//alert(getLabel('FMS_COM_NTYCOM'));
			/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
			showCompleteProcess();
		}
	}
}
/**
 * 입력값 체크
 */
function inpuValCheck(sheetObj){
	var rowCnt=sheetObj.LastRow() + 1;
	var isOk=true;
	var loopNum=0;
	var checkVal=false;
	for(var i=1; i < rowCnt; i++){
		var stat=sheetObj.GetCellValue(i, 'ibflag');
	   if(stat!='R'){
		   if(stat=='I'){
			   checkVal=true;
			   loopNum++;
		   }else if(stat=='U'){
			   checkVal=true;
			   loopNum++;
		   }
		   if(checkVal){
			   if(checkInputVal(sheetObj.GetCellValue(i, 'usrid'), 2, 12, "T", getLabel('ITM_USRID'))!='O'){
					sheetObj.SelectCell(i, 'usrid');
			    	isOk=false;
			    	break;
			   }else if(checkInputVal(sheetObj.GetCellValue(i, 'eng_usr_nm'), 2, 200, "T", getLabel('ITM_USRNMENG'))!='O'){
			    	isOk=false;
			    	break;
			   }else if(checkInputVal(sheetObj.GetCellValue(i, 'locl_usr_nm'), 2, 50, "T", getLabel('ITM_USRNMLOCAL'))!='O'){
				 	isOk=false;
			    	break;   
			   }else if(checkInputVal(sheetObj.GetCellValue(i, 'ofc_name'), 1, 100, "T", getLabel('FMS_COD_OFCE'))!='O'){
			    	isOk=false;
			    	break;
			   }
			   /* 2012/01/03 Chungrue 뉴욕요청사항 필수항목 제외
else if(checkInputVal(sheetObj.GetCellValue(i, 'addr'), 10, 200, "T", getLabel('ITM_ADDR'))!='O'){
			    	isOk=false;
			    	break;
}else if(checkInputVal(sheetObj.GetCellValue(i, 'eml'),  7, 100, "T", getLabel('ITM_EML'))!='O'){
			    	isOk=false;
			    	break;
}else if(checkInputVal(sheetObj.GetCellValue(i, 'phn'),  5,   30, "T", getLabel('ITM_PHN'))!='O'){
			    	isOk=false;
			    	break;
}else if(checkInputVal(sheetObj.GetCellValue(i, 'fax'),  0,   30, "T", 'FAX')!='O'){
			    	isOk=false;
			    	break;
			   }
			   */
			   ajaxSendPost(setUsrIdChk, 'reqVal', '&goWhere=aj&bcKey=getUsrIdCnt&usrid=' + sheetObj.GetCellValue(i, 'usrid'), './GateServlet.gsl');

			   if(stat == 'I' && idChk == false){
				   alert(getLabel('FMS_COM_ALT008'));
				   isOk=false;
				   break; 
			   }
			   
			   if(sheetObj.ColValueDup('usrid') > 0){
				    alert(getLabel('FMS_COM_ALT008'));
			    	isOk=false;
			    	break; 
			   }
			   
			   checkVal=false;
		   }
	   }
	}
	if(loopNum==0){
		//No data to proceed!
		//alert(getLabel('FMS_COM_ALT010'));
		//isOk = false;
	}
	return isOk;
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
	var formObj  = document.frm1;
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    if (formObj.user_id.value == "cltmaster") { // Super User
    	formObj.user_qty.className = 'search_form';
    	formObj.user_qty.readOnly = false;
    } else {
    	formObj.user_qty.className = 'search_form-disable';
    	formObj.user_qty.readOnly = true;
    }
    
    formObj.s_usrid.focus();
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
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with (sheetObj) {
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('USERMGMT_HDR1'), Align:"Center"} ];
			      InitHeaders(headers, info);

			      var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
			             {Type:"Text",      Hidden:0,  Width:120,   Align:"Left",    ColMerge:0,   SaveName:"usrid",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"eng_usr_nm",   KeyField:1 },
			             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"locl_usr_nm",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0 },
			             {Type:"Combo",     Hidden:0, Width:100,   Align:"Center",  ColMerge:0,   SaveName:"use_lang_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
			             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"ofc_cd",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"ofc_name",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0 },
			             {Type:"Combo",     Hidden:0, Width:100,   Align:"Left",    ColMerge:0,   SaveName:"dept_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0 },
			             {Type:"Combo",     Hidden:0, Width:100,   Align:"Left",    ColMerge:0,   SaveName:"team_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
			             {Type:"Combo",     Hidden:0, Width:100,   Align:"Left",    ColMerge:0,   SaveName:"role_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0 },
			             {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:0,   SaveName:"addr",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
			             {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"eml",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
			             {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"phn" },
			             {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fax" },
			             {Type:"Combo",     Hidden:0, Width:100,   Align:"Center",  ColMerge:0,   SaveName:"use_flg" },
			             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"dflt_wh_ctrt_no",       	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"dflt_wh_ctrt_nm",     	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
			             {Type:"Combo",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"dflt_wh_cd" ,			KeyField:0},
			             {Type:"Combo",     Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"dflt_ord_tp_cd" ,		KeyField:0},
			             {Type:"Image",     Hidden:0, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"pwd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 },
			             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"usr_tp" } ];
			       
			      InitColumns(cols);
			      SetEditable(1);
			      SetImageList(0,APP_PATH+"/web/img/button/btn_reset.gif");
			      sheetObj.SetDataLinkMouse('pwd',1);
			      
			      SetColProperty('use_lang_cd', {ComboText:LANGCD1, ComboCode:LANGCD2} );
				  SetColProperty('dept_cd', {ComboText:DPTCD1, ComboCode:DPTCD2} );
				  SetColProperty('team_cd', {ComboText:"|"+TEAMCD1, ComboCode:"|"+TEAMCD2} );
				  SetColProperty('role_cd', {ComboText:ROLCD1, ComboCode:ROLCD2} );
				  SetColProperty('use_flg', {ComboText:"ENABLE|DISABLE", ComboCode:"Y|N"} );
				  /*vinh.vo	07/09/2015 (S)*/
				  SetColProperty('dflt_wh_cd', {ComboText:"|"+WHCDLIST1, ComboCode:"|"+WHCDLIST2} );
				  SetColProperty('dflt_ord_tp_cd', {ComboText:OBORDTPCD1, ComboCode:OBORDTPCD2} );
				  /*vinh.vo	07/09/2015 (E)*/
				  
			      SetSheetHeight(350);
		   }                                                      
		break;
		case 2:      //IBSheet1 init
		    with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('USERMGMT_HDR2'), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
		               {Type:"Seq",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:0,   SaveName:"seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"rgst_usrid",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:700,  Align:"Left",    ColMerge:0,   SaveName:"mar_addr",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"log_type",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"rgst_tms",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		         
		        InitColumns(cols);
		        SetEditable(1);
		        SetSheetHeight(200);
		        resizeSheet();
		   }                                                      
		break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[1]);
}

var cur_row;
function sheet1_OnPopupClick(sheetObj, row, col) {
	cur_row = row;
	var colStr=sheetObj.ColSaveName(col);
	//Ofice코드 조회
	if(colStr=='ofc_cd'){
		rtnary=new Array(1);
		rtnary[0]="1";
		
		callBackFunc = "OFFICE_CD";
		modal_center_open('./CMM_POP_0050.clt', rtnary, 556,634,"yes");
	}
	if(colStr=='use_lang_cd'){
		var rtnary=new Array(2);
   		rtnary[0]="1";
   		rtnary[1]="";
	        var rtnVal =  ComOpenWindow('./CMM_POP_0020.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:560px;dialogHeight:480px" , true);
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(row, 'use_lang_cd',rtnValAry[0],0);//cd_val
		}
	}
	
	//vinh.vo 07/09/2015 (S)
	if(colStr=='dflt_wh_ctrt_no'){
		
		var params = "?ctrt_no=" + sheet1.GetCellValue(sheet1.GetSelectRow(),"dflt_wh_ctrt_no")
					+"&ctrt_nm=" + sheet1.GetCellValue(sheet1.GetSelectRow(),"dflt_wh_ctrt_nm");
		
		callBackFunc = "clbck_CTRT_CD_POP";
		modal_center_open('./ContractRoutePopup.clt' + params  , new Array(), 900, 620 ,"yes");
	}
	//vinh.vo 07/09/2015 (E)
	
}
function OFFICE_CD(rtnVal, sheetObj, row, col){
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, 'ofc_name',rtnValAry[1],0);
		docObjects[0].SetCellValue(cur_row, 'ofc_cd',rtnValAry[0],0);
	}
}

function clbck_CTRT_CD_POP(rtnVal){
	
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		sheet1.SetCellValue(cur_row,"dflt_wh_ctrt_no",rtnValAry[0]);
		sheet1.SetCellValue(cur_row,"dflt_wh_ctrt_nm",rtnValAry[1]);

	}
}



function sheet1_OnDblClick(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
	//패스워드 변경
	if(colStr!='pwd'){
		// Log In/Out History Search
		doWork("SEARCHLIST01");
	}
}
function sheet1_OnClick(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
	//패스워드 변경
	if(colStr=='pwd' && sheetObj.GetCellValue(row, "ibflag") != 'I'){
		//'Do you want to reset passwords?')){
		if(confirm(getLabel('FMS_COM_CFMCON'))){
			chgusrPwd(sheetObj.GetCellValue(row, 'usrid'));
		}
	}
}
var curRow;
var curCell;
var curSheet;
function sheet1_OnChange(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
	//패스워드 변경
	if(colStr=='ofc_cd'){
		var curVal=sheetObj.GetCellValue(row, col);
		if(curVal==''){
			sheetObj.SetCellValue(row, "ofc_name","");
			return;
		}else{
			curRow=row;
			curCell=col;
			curSheet=sheetObj;
			ajaxSendPost(setOfcAutoCd, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=office&s_code='+sheetObj.GetCellValue(row, 'ofc_cd'), './GateServlet.gsl');
		}
	}
	else if (colStr=='dflt_wh_cd'){
		if (sheetObj.GetCellValue(row, 'dflt_wh_ctrt_no') == '' || sheetObj.GetCellValue(row, 'dflt_wh_ctrt_no') == 'undefined'){
			alert(PL_SL_CTRT_NO);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), 'dflt_wh_cd','',0);
			return;
		}
//		var curVal=sheetObj.GetCellValue(row, col);
//		var ctrt_no = sheetObj.GetCellValue(row, 'dflt_wh_ctrt_no');
//		curSheet=sheetObj;
//		ajaxSendPost(setCtrtNo, 'reqVal', '&goWhere=aj&bcKey=searchCtrtNo&whCd='+curVal+ '&ctrt_no='+ctrt_no, './GateServlet.gsl');
	}
}

function sheet1_OnAfterEdit(sheetObj, row, col){
	if(sheet1.ColSaveName(col) == "dflt_wh_ctrt_no"){
		searchTlCtrtInfo(row);
	}
}


function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	if(errMsg == "" || errMsg == undefined || errMsg == null || errMsg == 0){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}
function setOfcAutoCd(rtnMsg){
	var doc=getAjaxMsgXML(rtnMsg);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=='undefined'){
			alert(CODE_NOT_FND);
			curSheet.SetCellValue(curRow, 'ofc_cd','',0);
			curSheet.SetCellValue(curRow, 'ofc_name','',0);
			curSheet.SelectCell(curRow, 'ofc_cd');
		}else{
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			curSheet.SetCellValue(curRow, 'ofc_cd',masterVals[0],0);
			curSheet.SetCellValue(curRow, 'ofc_name',masterVals[3],0);
		}
	}else{
		alert(AJ_FND_ERR);
	}
}

function setCtrtNo(rtnMsg){
	var doc=getAjaxMsgXML(rtnMsg);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=='undefined'){
			alert(CTRT_NO_NOT_FND);
			curSheet.SetCellValue(curSheet.GetSelectRow(), 'dflt_wh_cd','',0);
		}
	}else{
		alert(AJ_FND_ERR);
	}
}

function sheet1_OnFinish() {
	
}


function searchTlCtrtInfo(row){
	tempRow = row;

	ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+sheet1.GetCellValue(row,"dflt_wh_ctrt_no"), './GateServlet.gsl');
}

function setTlCtrtInfo(reqVal){
	
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheet1.SetCellValue(tempRow,"dflt_wh_ctrt_nm",rtnArr[0],0);
			}
			else{
				sheet1.SetCellValue(tempRow,"dflt_wh_ctrt_no","",0);
				sheet1.SetCellValue(tempRow,"dflt_wh_ctrt_nm","",0);
			}
		}
		else{
			sheet1.SetCellValue(tempRow,"dflt_wh_ctrt_no","",0);
			sheet1.SetCellValue(tempRow,"dflt_wh_ctrt_nm","",0);
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

function setUsrIdChk(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK' && doc[1] != '' && doc[1] !='undefined'){
		if(doc[1] == 0){
			idChk = true;
		} else {
			idChk = false;
		}
	} else{
		idChk = false;
	}
}
