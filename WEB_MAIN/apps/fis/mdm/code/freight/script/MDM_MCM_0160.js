function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
             	sheetObj.DoSearch("MDM_MCM_0160GS.clt", FormQueryString(formObj) );
            }
            var intRows=sheetObj.LastRow() + 1;
            for ( var i=1 ; i < intRows ; i++ ) {
            	if ( sheetObj.GetCellValue(i, "db_value") == "Y" ) {
            		sheetObj.SetCellEditable(i, "frt_cd",0);
            	} else {
            		sheetObj.SetCellEditable(i, "frt_cd",1);
            	}
            }
            //sheetObj.ShowDebugMsg = false;
       break;
       case "NEW":
       break;
       case "ROWADD":
    	   	var intRows=sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);
            sheetObj.SetCellValue(intRows, "use_flg","1");
            sheetObj.SetCellEditable(intRows, "seq",0);
            //sheetObj.CellImage(intRows, "frt_clss_cd") = 0;
       break;
       case "MODIFY":
       		if ( !fncGridCheck() ) return false;
            formObj.f_cmd.value=MODIFY;
            if(confirm(getLabel('FMS_COM_CFMSAV'))){
            	
            	var intRows=sheetObj.LastRow() + 1;
            	
            	if(GROSS_METHOD_IN_DC == "N"){
            		for(var i = 1; i < intRows; i++){
            			if(sheetObj.GetCellValue(i,"ibflag") == "I" || sheetObj.GetCellValue(i,"ibflag") == "U"){
            				sheetObj.SetCellValue(i,"gl_cd_prnr2",sheetObj.GetCellValue(i,"gl_cd_prnr"))
            			}
            		}
            	}
            	
                doProcess=true;
                sheetObj.DoSave("MDM_MCM_0160GS.clt", FormQueryString(formObj),"ibflag",false);
                
	            for ( var i=1 ; i < intRows ; i++ ) {
	            	if ( sheetObj.GetCellValue(i, "db_value") == "Y" ) {
	            		sheetObj.SetCellEditable(i, "frt_cd",0);
	            	} else {
	            		sheetObj.SetCellEditable(i, "frt_cd",1);
	            	}
	            }
            }
       break;
       case "EXCEL":
    	   if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   		}
       break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	
	var opt_key = "GROSS_METHOD_IN_DC";
	ajaxSendPost(setGrossMethodInDcReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    doWork('SEARCHLIST');
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
        	    with(sheetObj){

           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

           var HDR1_1 = "MDM_MCM_0160_HDR1_1";
           
           if(GROSS_METHOD_IN_DC == "Y"){
        	   HDR1_1 = "MDM_MCM_0160_HDR1_3";
           }
           
           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel(HDR1_1), Align:"Center"},
                       { Text:getLabel('MDM_MCM_0160_HDR1_2'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
                  {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                  {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",    ColMerge:1,   SaveName:"frt_cd",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:10 },
                  {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
                  {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_locl_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
                  {Type:"Combo",     Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"frt_curr",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"pfmc_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"tax_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Int",       Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"tax_rate",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
                  {Type:"Int",       Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"whld_tax_rate",   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
                  {Type:"PopupEdit", Hidden:0, Width:65,   Align:"Center",  ColMerge:1,   SaveName:"gl_cd_rev",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk_rev",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:500 },
                  {Type:"PopupEdit", Hidden:0, Width:65,   Align:"Center",  ColMerge:1,   SaveName:"gl_cd_cost",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk_cost",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:500 },
                  {Type:"PopupEdit", Hidden:0, Width:65,   Align:"Center",  ColMerge:1,   SaveName:"gl_cd_prnr",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk_prnr",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                  {Type:"PopupEdit", Hidden:1, Width:65,   Align:"Center",  ColMerge:1,   SaveName:"gl_cd_prnr2",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                  {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk_prnr2",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"ar_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"ap_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"dc_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"gnr_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"oim_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"oih_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"aim_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"aih_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"oem_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"oeh_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"aem_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"aeh_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"wms_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"frt_clss_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"srt_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
                  {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"dflt_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"Combo",     Hidden:1, Width:100,   Align:"Center",  ColMerge:1,   SaveName:"frt_grp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
            
           InitColumns(cols);
           
           SetEditable(1);
           sheetObj.SetDataLinkMouse("frt_clss_cd",1);
           sheetObj.SetColProperty("frt_clss_cd", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
           sheetObj.SetColProperty("frt_curr", {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
           sheetObj.SetColProperty("tax_flg", {ComboText:PARAM3_1, ComboCode:PARAM3_2} );
           sheetObj.SetColProperty("gl_cd_rev", {ComboText:PARAM4_1, ComboCode:PARAM4_2} );
           sheetObj.SetColProperty("gl_cd_cost", {ComboText:PARAM4_1, ComboCode:PARAM4_2} );
           sheetObj.SetColProperty("gl_cd_prnr", {ComboText:PARAM4_1, ComboCode:PARAM4_2} );
           sheetObj.SetColProperty("gl_cd_prnr2", {ComboText:PARAM4_1, ComboCode:PARAM4_2} );
           sheetObj.SetColProperty("frt_grp_cd", {ComboText:PARAM5_2, ComboCode:PARAM5_2} );
			
            SetColProperty(0 ,"frt_cd" , {AcceptKeys:"E|N|[, .-~!@#$%^*()_+;:/?[]{}|\=<>&]" , InputCaseSensitive:1});
            SetColProperty(0 ,"frt_cd_nm" , {AcceptKeys:"E|N|[, .-~!@#$%^*()_+;:/?[]{}|\=<>&]" , InputCaseSensitive:1});
            SetColProperty(0 ,"frt_cd_locl_nm" , {AcceptKeys:"E|N|[, .-~!@#$%^*()_+;:/?[]{}|\=<>&]" , InputCaseSensitive:1});
            SetColProperty(0 ,"gl_cd_rev" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
            SetColProperty(0 ,"gl_cd_cost" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
            SetColProperty(0 ,"gl_cd_prnr" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
            SetColProperty(0 ,"gl_cd_prnr2" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
            SetColProperty(0 ,"srt_seq" , {AcceptKeys:"N"});
            
            if(GROSS_METHOD_IN_DC == "Y"){
         	   SetColHidden("gl_cd_prnr2", 0);
         	   SetColHidden("gl_rmk_prnr2", 0);
            }
            
		   SetSheetHeight(460);
            resizeSheet();
           }


           break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	for(var i=2; i<docObjects[0].RowCount()+2 ; i++ ){
		if(docObjects[0].GetCellValue(i, "tax_flg") == 'N'){
			docObjects[0].SetCellEditable(i, "tax_rate",0);
			docObjects[0].SetCellEditable(i, "whld_tax_rate",0);
		}
	}
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	if(errMsg==undefined || errMsg=="" ||  errMsg==null ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnClick(sheetObj,Row,Col){
	SELECTROW=Row;
    switch (sheetObj.ColSaveName(Col)) {
        case "cstms_cntr_cd" :
        	/*
            rtnary=new Array();
	   		rtnary[0]="1";
   	        var rtnVal =  ComOpenWindow('./CMM_POP_0080.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:812px;dialogHeight:480px" , true);
   	        //window.open ('./CMM_POP_0010.clt', "list", "scrollbars=no,fullscreen=no,width=1024,height=480");
   	        if (rtnVal == null) {
			 	return;
			}
			//alert("rtnVal==>"+rtnVal);
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(Row, "cstms_cntr_cd",rtnValAry[0]);
			*/
		break;
	}
}
var cur_row;
var cur_col;
var rtnary=new Array(1);
var callBackFunc = "";
function sheet1_OnPopupClick(sheetObj, row, col){
	//GLCODE POPUP을 호출한다.
	rtnary=new Array(4);
	rtnary[0]="1";
	rtnary[1]="";
	rtnary[2]="";
	rtnary[3]="Y";
	cur_row = row;
	cur_col = col;
	callBackFunc = "CMM_POP_0260";
	modal_center_open('./CMM_POP_0260.clt', rtnary, 658,450,"yes");
}

function CMM_POP_0260(rtnVal){
	var sheetObj = docObjects[0];
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(cur_row, sheetObj.ColSaveName(cur_col).replaceAll("_rmk_", "_cd_"), rtnValAry[0], 0);
		sheetObj.SetCellValue(cur_row, sheetObj.ColSaveName(cur_col).replaceAll("_cd_", "_rmk_"), rtnValAry[1], 0);
	}
	sheetObj.SelectCell(cur_row, cur_col+1, 0);
}

function sheet1_OnKeyDown(sheetObj, Row, Col, KeyCode){
	cur_row = Row;
	cur_col = Col;
	var colStr=sheetObj.ColSaveName(Col);
	if(KeyCode==13 && (colStr == "gl_cd_rev" || colStr == "gl_rmk_rev" || colStr == "gl_cd_cost" || colStr == "gl_rmk_cost" || colStr == "gl_cd_prnr" || colStr == "gl_rmk_prnr" || colStr == "gl_cd_prnr2" || colStr == "gl_rmk_prnr2")){
		sheetObj.SelectCell(Row, Col);
		rtnary=new Array(2);
		rtnary[0]="GLRMK";
		rtnary[1]=sheetObj.GetCellValue(Row, colStr.replaceAll("_cd_", "_rmk_"));
		rtnary[2]="";
		rtnary[3]="Y";
		callBackFunc = "CMM_POP_0260_2";
   		modal_center_open('./CMM_POP_0260.clt', rtnary, 658,450,"yes");
	}
}

function CMM_POP_0260_2(rtnVal){
	var sheetObj = docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(cur_row, sheetObj.ColSaveName(cur_col).replaceAll("_rmk_", "_cd_"),rtnValAry[0], 0);
		sheetObj.SetCellValue(cur_row, sheetObj.ColSaveName(cur_col).replaceAll("_cd_", "_rmk_"), rtnValAry[1], 0);
	}
	sheetObj.SelectCell(cur_row, cur_col+1, 0);
}

/**
 * 콤보 조회
 */
function doAction(frt_cd){
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchFreightKeyCode&s_frt_cd='+frt_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//[Freight Code] is duplicated!
			alert(getLabel('FMS_COM_ALT008') + "\n - " + getLabel('FMS_COD_FRET') + getLabel('FMS_COD_CODE') + ": " + doc[1]);
			var sheetObj=docObjects[0];
			var intRow=sheetObj.LastRow();
			sheetObj.SetCellValue(intRow, "frt_cd","");
		}	
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));
	}
}
function sheet1_OnChange(sheetObj, Row, Col, Value){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "frt_cd" :
			var strCd=sheetObj.GetCellValue(Row, Col);
			sheetObj.SetCellValue(Row, Col,strCd.toUpperCase());
			doAction(sheetObj.GetCellValue(Row, Col));
		break;
		case "frt_cd_nm" :
			var strPckNm=sheetObj.GetCellValue(Row, Col);
			sheetObj.SetCellValue(Row, Col,strPckNm.toUpperCase());
		break;
		case "tax_flg" :
			var taxFlg=sheetObj.GetCellValue(Row, Col);
			if(taxFlg == 'Y'){
				sheetObj.SetCellEditable(Row, "tax_rate",1);
				sheetObj.SetCellEditable(Row, "whld_tax_rate",1);
			}else{
				sheetObj.SetCellValue(Row, "tax_rate",0);
				sheetObj.SetCellValue(Row, "whld_tax_rate",0);
				sheetObj.SetCellEditable(Row, "tax_rate",0);
				sheetObj.SetCellEditable(Row, "whld_tax_rate",0);
			}
		break;
		case "tax_rate" :
			var taxRate=sheetObj.GetCellValue(Row, Col);
			if(taxRate < 0){
				alert(getLabel('FMS_COM_ALT042'));
				sheetObj.SetCellValue(Row, "tax_rate", 0, 0);
			}
		break;
		case "whld_tax_rate" :
			var whldTaxRate=sheetObj.GetCellValue(Row, Col);
			if(whldTaxRate > 0){
				alert(getLabel('FMS_COM_ALT081'));
				sheetObj.SetCellValue(Row, "whld_tax_rate", 0, 0);
			}
		break;
		case "gl_cd_rev" :
		case "gl_cd_cost" :
		case "gl_cd_prnr" :
		case "gl_cd_prnr2" :
			SELECTROW=Row;
			// GL NO에 매핑되어있는 BANK 정보를 가져온다.
			ajaxSendPost(searchGlBankInfo, sheetObj.ColSaveName(Col), '&goWhere=aj&bcKey=searchGlBankInfo&gl_no='+Value+'&gl_rmk='+sheetObj.GetCellValue(Row, Col+1)+'&block_all_yn=Y', './GateServlet.gsl');
		break;
	}
}
function searchGlBankInfo(reqVal, colSaveName) {
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	if (doc[0] == "OK") {
		if (typeof(doc[1]) != "undefined") {
			//조회해온 결과를 setting
			var rtnArr=doc[1].split('^@');
			sheetObj.SetCellValue(SELECTROW, colSaveName,rtnArr[2],0);
			sheetObj.SetCellValue(SELECTROW, colSaveName.replaceAll("_cd_", "_rmk_"),rtnArr[3],0);
		} else {
			sheetObj.SetCellValue(SELECTROW, colSaveName,"",0);
			sheetObj.SetCellValue(SELECTROW, colSaveName.replaceAll("_cd_", "_rmk_"),"",0);
		}
	} else {
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function fncGridCheck() {
	var sheetObj=docObjects[0];
	var intRow=sheetObj.LastRow() + 1;
	for( var i=1 ; i < intRow ; i++ ) {
if( trim(sheetObj.GetCellValue(i, "frt_cd")) == "" || sheetObj.GetCellValue(i, "frt_cd") == null){
			//Please enter a [Billing Code]!
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_BILL') + getLabel('FMS_COD_CODE'));
			return false;
		}
	}
	var dupRow=sheetObj.ColValueDup("frt_cd");
	if(dupRow > 0){
		alert(getLabel('MDM_COM_ALT004'));
		return false;
	}
	return true;
}
function fncSearch(sFlag,keyCode) {
	if (sFlag != "" && sFlag != "undefined" && sFlag != undefined) {
	 	ComKeyOnlyAlphabet(sFlag,keyCode);
	}
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}

var GROSS_METHOD_IN_DC = "N";

// #50476 - [BNX] Agent Credit 계정 분리
function setGrossMethodInDcReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1]=="Y") {
			GROSS_METHOD_IN_DC = "Y";
		}
	}
}