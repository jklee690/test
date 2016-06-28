//=========================================================
//*@FileName   : SEE_AMS_0010.jsp
//*@FileTitle  : SEE AMS Search 
//*@Description: SEE AMS Search 
//*@author     : Chungrue
//*@version    : 
//*@since      : 
//
//*@Change history:
//*@author2     : Tuan.Chau
//*@version    : 2.0 - 2014/06/04
//*@since      : 2014/06/04
//=========================================================
var isInvStsOk=false;
var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName, valObj) {
	if(!btnGetVisible(srcName)){
		return;
	}
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var formObj=document.frm1;
	switch (srcName) {
		case "SEARCHLIST":
			if(!formValidation()) return;
	        formObj.f_cmd.value=SEARCHLIST;
	        sheetObj2.RemoveAll();
			sheetObj.DoSearch("OTH_OPR_0020GS.clt", FormQueryString(formObj) );
		break;
       	case "NEW":
       	    var paramStr="./OTH_OPR_0010.clt?f_cmd=-1";
       	    parent.mkNewFrame('Other Sales Details', paramStr);
		break;  		
		case "REMOVE":
			
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
   	 		var ref_ofc_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ofc_cd");
   	 		
   	 		//alert(edob_flg + " "+ofc_cd+" "+ref_ofc_cd);
	   	 	var btnflag = "Y";
			if (edob_flg == "N"){
				if (ofc_cd != ref_ofc_cd){  
					btnflag = "N";
				}
			}  
			if (btnflag == "Y"){ 
			}else{
				alert(getLabel('FMS_COM_ALT084'));
				return;
			}
			   
			//var formObj = document.frm1;
			ajaxSendPost(checkOthInvReq, 'reqVal', '&goWhere=aj&bcKey=getCheckOthInv&oth_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "oth_seq"), './GateServlet.gsl');
		   	if(isInvStsOk){
				if (confirm(getLabel('FMS_COM_CFMDEL'))) {
					formObj.f_cmd.value=REMOVE;
					sheetObj.DoAllSave("./OTH_OPR_0020GS.clt", FormQueryString(formObj), true);
				}
			}else{
	   	 		alert(getLabel('FMS_COM_ALT022'));
	   	 	}
		break;
		case "GOTOACCT":
			var ref_no=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ref_no");
			var oth_seq=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "oth_seq");
			var paramStr="./ACC_INV_0040.clt?f_cmd=-1&s_oth_ref_no="+ref_no+"&s_oth_seq="+oth_seq;
			if(ref_no != "-1"){
				parent.mkNewFrame('Invoice List', paramStr);
			}
		break;
		case "INSTRUCTION":
			if(sheetObj.LastRow()== 0){
				//There is no data
				alert(getLabel('FMS_COM_ALT004'));	
			}else{
				var paramStr="";
				paramStr += "./AIC_WOM_0018.clt?f_cmd=-1";
				paramStr += "&s_type=G"; // Other 에서 Pickup 호출할때 G , BL에서 호출시 B
				paramStr += "&s_seq=" + sheetObj.GetCellValue(sheetObj.GetSelectRow(), "oth_seq"); // Other Seq
				paramStr += '&air_sea_clss_cd='; 
				paramStr += '&bnd_clss_cd=G';
				paramStr += '&biz_clss_cd=';
				parent.mkNewFrame('Pickup Delivery Instruction', paramStr);
			}
		break;
		case "ORDER":
			var reqParam='';
			reqParam += '?f_ref_no=' + sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ref_no");
			popGET('CMM_POP_0322.clt'+reqParam, '', 600, 585, "scroll:yes;status:no;help:no;");
		break;
		case "PROFIT_REPORT":
	   	 	if(sheetObj.LastRow()== 0){
	   	 		//There is no data
				alert(getLabel('FMS_COM_ALT004'));	
			}else{
				var sRow=sheetObj.GetSelectRow();
				//WMS ACCOUNT LKH 2015.01.20
				var reqParam='?oth_seq=' + sheetObj.GetCellValue(sRow, "oth_seq");
					reqParam += '&ref_no=' + sheetObj.GetCellValue(sRow, "ref_no");
					reqParam += '&air_sea_clss_cd=' + "O";
					reqParam += '&bnd_clss_cd=' + "N";
					reqParam += '&biz_clss_cd=' + "";
				popGET('RPT_PRN_0210.clt'+reqParam, '', 630, 400, "scroll:yes;status:no;help:no;");
			}
   	 	break;
       	case "COPY":
	   	 	if(sheetObj.LastRow()== 0){
	   	 		//There is no data
				alert(getLabel('FMS_COM_ALT010'));	
			}else{
				var sRow=sheetObj.GetSelectRow();
				var paramStr="./OTH_OPR_0010.clt?f_cmd=15&oth_seq=" + sheetObj.GetCellValue(sRow, "oth_seq");
	       	    parent.mkNewFrame('Other Sales Details', paramStr);
			}
		break;
       	case "SHIP_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "SHIP_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
			break;
		case "CNEE_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "CNEE_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
			break;
		case "CUST_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "CUST_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
			break;
	}
}
/**
 * 달력 POPUP
 * @param doWhat
 * @param frm1
 * @return
*/
function doDisplay(doWhat, frm1){
	var formObj=document.frm1;
    switch(doWhat){
        case 'POST_DATE':   //달력 조회 From ~ To 팝업 호출 
        	var cal = new ComCalendarFromTo();
	        cal.select(formObj.post_frmdt, formObj.post_todt, 'MM-dd-yyyy');
        break;
        case 'INVOICE_DATE':
            var cal = new ComCalendarFromTo();
	        cal.select(formObj.invoice_frmdt, formObj.invoice_todt, 'MM-dd-yyyy');
        break;
        case 'CUSTOMER_POPLIST':
        	rtnary=new Array(1);
        	rtnary[0]="";
	   		rtnary[1]=formObj.cust_nm.value;
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "CUSTOMER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
        break;
    }
}
function CUSTOMER_POPLIST(rtnVal){
  	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.cust_cd.value=rtnValAry[0];
		formObj.cust_nm.value=rtnValAry[2];// loc_nm
	}
  }
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;
	
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.f_ofc_cd);

    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid(){
	var formObj=document.frm1;
	
    //오늘일자구하기
	var now=new Date(); 			
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1; 		
	var date=now.getDate(); 	
	//4개월전 날짜구하기
	var preDt=new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
	var preyear=preDt.getFullYear();
	var premonth=preDt.getMonth() + 1;
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	if(premonth < 10){
		premonth="0"+(premonth);
	}
	var fromDay=premonth + "-" + "01" + "-" + preyear;
	var today=month + "-" + date + "-" + year;
	//이번달 말일구하기
	var endDay=getEndDate(today);
	//ZOOT 
	//formObj.post_frmdt.value=fromDay;
	//formObj.post_todt.value=endDay;
	
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
  * Paging 항목 선택시 호출되
  */
function goToPage(callPage){
	docObjects[0].RemoveAll();
 	document.frm1.f_CurPage.value=callPage;
 	doWork('SEARCHLIST', '');
}

function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value='';
		doWork('SEARCHLIST');
	}
}

/**
  * 목록 조회건수 변경시 호출됨
  */
function viewCntChg(){
 	document.frm1.f_CurPage.value=1;
 	doWork('SEARCHLIST');
}
/**
  * 목록 조회건수 변경시 호출됨
  */
function searchList(){
 	document.frm1.f_CurPage.value=1;
 	doWork('SEARCHLIST');
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
             (22, 0, 0, false);
             var cnt=0;

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('OTH_OPR_0020_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"check_flag",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"block_flag",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cntr_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"vsl_flt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"cust_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cust_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"shpr_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cnee_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cust_ref_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"frt_chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ar_chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ap_chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"dc_chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"op_useid",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"oth_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Status",    Hidden:1, Width:1,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
              
             InitColumns(cols);

             SetEditable(1);
             InitViewFormat(0, "post_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
             SetSheetHeight(450);
             resizeSheet();
         }                                                      
           break;
           
       <!-- ############################################### COMMON MEMO 2-4 ##################################################### -->
         case 2:      //IBSheet1 init
      	   initMemo(sheetObj);                                              
         break;
       <!-- ############################################### COMMON MEMO 2-4 ##################################################### -->
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function getPageURL() {
	return document.getElementById("pageurl").value;
}
/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet1_OnSelectMenu(sheetObj, MenuString){
	 var formObj=document.frm1;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 사용자가 저장한 Header Setting을 삭제한다.
//		case "Header Setting Delete":
//			IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
//		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	for(var i=1; i<=sheetObj.LastRow();i++){
if(sheetObj.GetCellValue(i, "sts_cd") == "B") {
			sheetObj.SetCellValue(i, "block_flag","Y");
//parameter changed[check again]CLT 			sheetObj.SetCellFontColor(i, "block_flag","#FF0000");
		}
	}
 	if(frm1.f_cmd.value==REMOVE){
 		doWork("SEARCHLIST");
 	}
 	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));

	<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
	var intg_bl_seq = '';
	var palt_mnu_cd = '';
	var opr_no = '';
	
	if(sheetObj.GetTotalRows()>0){
		intg_bl_seq = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ref_no");
		palt_mnu_cd = 'OTH';
		opr_no = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ref_no");
	}
	
	setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
	<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
} 
function sheet1_OnSaveEnd(sheetOBj, ErrMsg){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(ErrMsg==undefined || ErrMsg==null || ErrMsg!=''){
		return;
	}
	//Save success!
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
	showCompleteProcess();
	doWork('SEARCHLIST');
}
function sheet1_OnClick(sheetObj,Row,Col){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
formObj.ref_no.value=sheetObj.GetCellValue(Row, "ref_no");
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(i == Row){
			sheetObj.SetRowBackColor(i,"#DFFFFF");
		}else{
			sheetObj.SetRowBackColor(i,"#FFFFFF");
		}
	}
	
	<!-- ############################################### COMMON MEMO 3-4 ##################################################### -->
	var intg_bl_seq =  sheetObj.GetCellValue(Row, "ref_no");
	var palt_mnu_cd = 'OTH';
	var opr_no = sheetObj.GetCellValue(Row, "ref_no");
	setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
	doWorkMemo("SEARCHMEMO");
	<!-- ############################################### COMMON MEMO 3-4 ##################################################### -->
}
function sheet1_OnChange(sheetObj,Row,Col){
	switch (sheetObj.ColSaveName(Col)) {
	    case "check_flag" :
			ajaxSendPost(checkOthInvReq, 'reqVal', '&goWhere=aj&bcKey=getCheckOthInv&oth_seq='+docObjects[0].GetCellValue(Row, "oth_seq"), './GateServlet.gsl');
			if(sheetObj.GetCellValue(Row, "block_flag") == "Y" || !isInvStsOk){
		   		alert(getLabel('FMS_COM_ALT022'));
		   		sheetObj.SetCellValue(Row, "check_flag","0",0);
				return;
			}
		break;
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	var ref_no=sheetObj.GetCellValue(Row, "ref_no");
	var oth_seq=sheetObj.GetCellValue(Row, "oth_seq");
    var paramStr="./OTH_OPR_0010.clt?f_cmd=-1&ref_no="+escape(ref_no)+"&oth_seq="+oth_seq;
    parent.mkNewFrame('MISC. Operation Entry', paramStr, "OTH_OPR_0010_SHEET_" + ref_no+"_"+oth_seq);
}
var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(obj, tmp){
	var formObj=document.frm1;
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}				
	var s_type="";
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				s_type="trdpCode";
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				s_type="trdpCode";
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}else{
		formObj.cust_cd.value="";
		formObj.cust_nm.value="";
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			formObj.cust_cd.value=masterVals[0]; 
			formObj.cust_nm.value=masterVals[3];
		}else{
			formObj.cust_cd.value=""; 
			formObj.cust_nm.value="";	
		}
	}else{
		//alert(getLabel('EQU_INV_MSG01'));		
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
function formValidation(){
	var formObj=document.frm1;
	if(trim(formObj.post_frmdt.value)!= "" && trim(formObj.post_todt.value) != ""){
		if(getDaysBetweenFormat(formObj.post_frmdt,formObj.post_todt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033'));
			formObj.post_todt.focus();
			return false;
		}
	}	
	if(!chkSearchCmprPrd(false, frm1.post_frmdt, frm1.post_todt)){
		return false;
	}
	return true;
}
//Calendar flag value
var firCalFlag=false;
function checkOthInvReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='N'){
			isInvStsOk=false;
		}else{
			isInvStsOk=true;
		}
	}
}

function SHIP_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.shpr_nm.value = rtnValAry[2];// full_nm
	}
}
function CNEE_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.cnee_nm.value = rtnValAry[2];// full_nm
	}
}
function CUST_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.cust_nm.value = rtnValAry[2];// full_nm
	}
}