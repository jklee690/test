var FROMDATE;
var TODAY;
var ENDDATE;
var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
       case "SEARCHLIST":
    	   if(!formValidation()) return;
    	    //sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            sheetObj.DoSearch("./ACC_SLP_0030GS.clt", FormQueryString(formObj) );
       break;
       case "NEW":
	   		var paramStr="./ACC_JOR_0050.clt?f_cmd=-1";
		    parent.mkNewFrame('Journal Entry', paramStr);
	   break;      
       case "DELETE":	//삭제
    	   frm1.f_cmd.value=REMOVE;
    	   for(var i=1; i<=sheetObj.RowCount(); i++){
    		   if(sheetObj.GetCellValue(i, "chk_flag") == 1 && sheetObj.GetCellValue(i, "delt_flg") == "Y"){
    	   			alert("Please check the not Deleted data!");
    	   			return;
    	   		}
    	   }
           if(confirm(getLabel('FMS_COM_CFMDEL'))){
        	   sheetObj.DoSave("ACC_SLP_0030GS.clt", FormQueryString(formObj),"ibflag",false);
           }
       break;
       case "COMMAND01":	//RECREATE(INTERFACE ACCT_SLIP_NO INFO 삭제
    	   frm1.f_cmd.value=COMMAND01;
    	   for(var i=1; i<=sheetObj.RowCount(); i++){
    		   if(sheetObj.GetCellValue(i, "chk_flag") == 1 && sheetObj.GetCellValue(i, "delt_flg") == "N"){
    	   			alert("Please check the Deleted data!");
    	   			return;
    	   		}
    	   }
           if(confirm("Do you want to Journalize? ")){
        	   sheetObj.DoSave("ACC_SLP_0030GS.clt", FormQueryString(formObj),"ibflag",false);
           }
       break;
       case "PRINT":	//삭제
    	   //alert('---'+sheetObj.SearchRows());
	       if(sheetObj.GetSelectRow()== 0){
	    	   //There is no data
	    	   alert(getLabel('FMS_COM_ALT004'));
	    	   return;
			}
       		formObj.file_name.value='accounting_slip_01.mrd';
			formObj.title.value='Accounting Slip';
			//Parameter Setting
			var param='';
			param += '[' + ofcCd + ']';													// [1]
			param += '[' + sheetObj.GetCellValue(sheetObj.GetSelectRow(), "slip_no") + ']';		// [2]
			param += '[' + usrNm + ']';													// [3]
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
       break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_vendor_nm.value;
	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
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
    var formObj=document.frm1;
    
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);
    
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//오늘일자구하기
	var now=new Date(); 				
	var preDt=new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1;
	var date=now.getDate(); 	
	var preyear=preDt.getFullYear();
	var premonth=preDt.getMonth() + 1;
	if(month < 10){
		month="0"+(month);
	}
	if(premonth < 10){
		premonth="0"+(premonth);
	}
	if(date < 10){
		date="0"+date;
	}
	FROMDATE=premonth + "-" + "01" + "-" + preyear;
	TODAY=month + "-" + date + "-" + year;
	ENDDATE=getEndDate(TODAY);
	formObj.s_post_strdt.value=FROMDATE;
	formObj.s_post_enddt.value=ENDDATE;
//	if(btn_role == "Y"){
//    	deleteBtn1.style.display="inline";
//    	deleteBtn2.style.display="inline";
//    }else{
//    	deleteBtn1.style.display="none";
//    	deleteBtn2.style.display="none";
//    }
	//INV_DT 셋팅
	var fr_inv_dt;
	var to_inv_dt;
	to_inv_dt=formObj.slip_post_dt.value;
	if(to_inv_dt != ""){
		tmp_inv_dt=to_inv_dt.replaceAll("-","");
		fr_inv_dt=tmp_inv_dt.substring(0,2) +"-"+ "01" +"-"+ tmp_inv_dt.substring(4,8);
		//formObj.s_inv_strdt.value = fr_inv_dt;
		//formObj.s_inv_enddt.value = to_inv_dt;
	}
	doWork("SEARCHLIST");
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
	           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1, SortEventMode:1 };
	           var headers = [ { Text:getLabel('ACC_SLP_0030_HDR'), Align:"Center"} ];
	           InitHeaders(headers, info);
	
	           var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"chk_flag",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
	                  {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"block_yn",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dt_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"com_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"PopupEdit", Hidden:0, Width:200,  Align:"Left",    ColMerge:1,   SaveName:"com_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"g_debit",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"g_credit",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"slip_tp",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"acct_slip_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"if_yn",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"rgst_usrid",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"p_ofc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"delt_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"slip_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"acct_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"slip_2nd_tp",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	            
	           InitColumns(cols);
	           SetSheetHeight(500);
	           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	           SetEditable(1);
	                 /* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 */
	           //InitViewFormat(0, "post_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	           InitViewFormat(0, "inv_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	           SetExtendLastCol(0);
	           SetHighlightAfterSort(0);
	           resizeSheet();
           }
           break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	sheetObj.SetHeaderCheck(0, "chk_flag",0);
	
	sheetObj.SetColFontColor("block_yn","#FF0000");
	
	/*
	for(var i=1; i<=sheetObj.LastRow();i++){
		sheetObj.SetRowBackColor(i,"#EFEBEF");
		sheetObj.SetColBackColor(0,"#FFFFFF");
		sheetObj.SetColBackColor(1,"#FFFFFF");
	}
	*/
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	/*
	for(var i=1; i<=sheetObj.LastRow();i++){
		sheetObj.SetRowBackColor(i,"#EFEBEF");
		sheetObj.SetColBackColor(0,"#FFFFFF");
		sheetObj.SetColBackColor(1,"#FFFFFF");
	}
	*/
	//Save success!
	
	sheetObj.SetColFontColor("block_yn","#FF0000");	
	
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	//doWork("SEARCHLIST");
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	if(sheetObj.ColSaveName(Col) != "chk_flag" && sheetObj.ColSaveName(Col) != "post_dt"){
var paramStr="./ACC_JOR_0050.clt?f_cmd=-1&f_slip_no="+sheetObj.GetCellValue(Row, "slip_no");
	    parent.mkNewFrame('Journal Entry', paramStr);
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "post_dt" :
			sheetObj.SetCellValue(Row, "chk_flag","1");
		break;
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	    	var cal = new ComCalendarFromTo();
	    	cal.displayType = "date";
        	cal.select(formObj.s_post_strdt,formObj.s_post_enddt, 'MM-dd-yyyy');
	    break;
        case 'DATE2':    //달력 조회 팝업 호출      
        	var cal = new ComCalendarFromTo();
        	cal.displayType = "date";
        	cal.select(formObj.s_inv_strdt,formObj.s_inv_enddt, 'MM-dd-yyyy');
        break;
    }
}
function searchBlCmmInfo(){
	var formObj=document.frm1;
	if(formObj.s_hbl_no.value != "" || formObj.s_mbl_no.value != ""){
		ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.s_bl_no.value, './GateServlet.gsl');
	}
}
function enterBlCmmInfo(){
	var formObj=document.frm1;
	if(event.keyCode == 13){
		ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.s_bl_no.value, './GateServlet.gsl');
	}
}
function enterInvInfo(){
	var formObj=document.frm1;
	if(formObj.s_inv_no.value != ""){
		if(event.keyCode == 13){
			ajaxSendPost(getInvInfo, 'reqVal', '&goWhere=aj&bcKey=getInvInfo&s_inv_no='+formObj.s_inv_no.value, './GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN
 * BL_INFO를 가져온다.
 */
function getBlCmmInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				if(rtnArr[2] == "H"){
					frm1.s_hbl_no.value=rtnArr[1];
				}else if(rtnArr[2] == "M"){
					frm1.s_mbl_no.value=rtnArr[1];
				}
				frm1.f_intg_bl_seq.value=rtnArr[0];
				frm1.f_biz_clss_cd.value=rtnArr[2];
				frm1.f_air_sea_clss_cd.value=rtnArr[3];
				frm1.f_bnd_clss_cd.value=rtnArr[4];
				doWork("DEFAULT");
			}else{
				frm1.f_intg_bl_seq.value="";
				frm1.s_hbl_no.value="";
				frm1.s_mbl_no.value="";
				frm1.f_biz_clss_cd.value="";
				frm1.f_air_sea_clss_cd.value="";
				frm1.f_bnd_clss_cd.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
/**
 * AJAX RETURN
 * INVOICE_INFO를 가져온다.
 */
function getInvInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				frm1.s_inv_seq.value=rtnArr[0];
				frm1.s_inv_no.value=rtnArr[1];
				doWork("DEFAULT");
			}else{
				frm1.s_inv_seq.value="";
				frm1.s_inv_no.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].value="";
	  }           
	}

	//LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);
    
	formObj.s_type[0].selected=true;
	formObj.s_if_yn[0].selected=true;
	sheetObj.RemoveAll();
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type="";
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;	
				s_type="trdpCode";
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}else{
		formObj.s_vendor_cd.value="";//trdp_cd  AS param1
		formObj.s_vendor_nm.value="";//eng_nm   AS param2
	}
}
/**
 * Trade Partner 관린 코드조회
 */
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="BILLTO"){
				formObj.s_vendor_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.s_vendor_nm.value=masterVals[3];		//eng_nm   AS param2
			}
		}else{
			if(CODETYPE =="BILLTO"){
				formObj.s_vendor_cd.value="";//trdp_cd  AS param1
				formObj.s_vendor_nm.value="";//eng_nm   AS param2
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//말일구하기
function getEndDate(datestr){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2));
    //윤년 검증
    var boundDay="";
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm="0"+mm
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}
function custEnterAction(obj, type){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		doWork("CUSTOMER_POPLIST");
	}
}
function entSearch(){
	if(event.keyCode == 13){
		document.forms[0].f_CurPage.value='';
		doWork('SEARCHLIST')
	}
}
function setAmount(){
	var formObj=document.frm1;
	formObj.s_amt_to.value=formObj.s_amt_fr.value;
}
function formValidation(){
	if(!chkSearchCmprPrd(false, frm1.s_post_strdt, frm1.s_post_enddt)){
		return false;
	}
	if(!chkSearchCmprPrd(false, frm1.s_inv_strdt, frm1.s_inv_enddt)){
		return false;
	}	
	if(!chkSearchCmprAmt(false, frm1.s_amt_fr, frm1.s_amt_to)){
		return false;
	}
	return true;
}
//Calendar flag value
var firCalFlag=false;
var firAmtFlag=false;

function CUSTOMER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_vendor_cd.value=rtnValAry[0];//full_nm
		formObj.s_vendor_nm.value=rtnValAry[2];//full_nm
	}      
}
