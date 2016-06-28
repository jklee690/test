/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : PFM_ACC_0030.jsp
 *@FileTitle : Local Statement
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

var pdf = false;
function pdfDown(prn){
	pdf = true;
	doWork(prn);
}

function TRDP_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cust_trdp_cd.value=rtnValAry[0];//full_nm
		formObj.f_cust_trdp_nm.value=rtnValAry[2];//full_nm
		formObj.f_filter_by_chk_3.disabled=false;
		docObjects[0].RemoveAll();
	}
	}
function doWork(srcName){
    var formObj=document.frm1;
    var sheetObj=docObjects[0];
    switch(srcName) {
	    case "PRINT":
	    	if(formObj.f_date_radio[0].checked == true){
	    		formObj.f_h_per_tp1.value="A";
	    		var perDt=formObj.per_dt.value.replaceAll("-","");
				if(perDt != ""){
					formObj.h_per_dt.value=perDt.substring(4,8) + perDt.substring(0,4);
				}else{
					//Period Date is mandatory field.
					alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_PERDT'));
					formObj.per_dt.focus();
					return;
				}
	    	}else{
	    		formObj.f_h_per_tp1.value="P";
	    		if(!chkSearchCmprPrd(true, frm1.per_strdt, frm1.per_enddt)){
	    			return;
	    		}
	    		//----------[20130624 ojg]----------------
	    		var perStrdt=formObj.per_strdt.value.replaceAll("-","");;
	    		var perEnddt=formObj.per_enddt.value.replaceAll("-","");;
	    		formObj.h_per_strdt.value=perStrdt.substring(4,8) + perStrdt.substring(0,4);
	    		formObj.h_per_enddt.value=perEnddt.substring(4,8) + perEnddt.substring(0,4);
	    		//----------[20130624 ojg]----------------
	    	}
	    	if(formObj.f_per_radio[0].checked == true){
	    		formObj.f_h_per_tp2.value="P";
	    	}else if(formObj.f_per_radio[1].checked == true){
	    		formObj.f_h_per_tp2.value="D";
	    	}else{
	    		formObj.f_h_per_tp2.value="I";
	    	}
	    	var deptCd="";
	    	if(formObj.f_dpt_tp_1.checked == true){
	      		deptCd=deptCd + ",'AIM','AIH'";
	      	}
	      	if(formObj.f_dpt_tp_2.checked == true){
	      		deptCd=deptCd + ",'AOM','AOH'";
	      	}
	      	if(formObj.f_dpt_tp_3.checked == true){
	      		deptCd=deptCd + ",'SIM','SIH'";
	      	}
	      	if(formObj.f_dpt_tp_4.checked == true){
	      		deptCd=deptCd + ",'SOM','SOH'";
	      	}
	      	if(formObj.f_dpt_tp_5.checked == true){
	      		deptCd=deptCd + ",'OTH'";
	      	}
	      	if(formObj.f_dpt_tp_6.checked == true){
	      		deptCd=deptCd + ",'WMS'";
	      	}
	      	deptCd=deptCd.substring(1);
	      	if(deptCd == ""){
	      		//Department Type is mandatory field.
	      		alert(getLabel('FMS_COM_ALT004') + " \n - " + getLabel('FMS_COD_DETP'));
	      		return;
	      	}else{
	      		formObj.f_h_dpt_tp.value=deptCd;
	      	}
	    	if(formObj.f_rpt_tp_1.checked == true && formObj.f_rpt_tp_2.checked == true){
	    		formObj.f_h_rpt_tp.value="ALL";
	    	}else if(formObj.f_rpt_tp_1.checked == true){
	    		formObj.f_h_rpt_tp.value="L";
	    	}else if(formObj.f_rpt_tp_2.checked == true){
	    		formObj.f_h_rpt_tp.value="A";
	    	}else{
	    		//Report Type is mandatory field.
	    		alert(getLabel('FMS_COM_ALT004') + " \n - " + getLabel('FMS_COD_RPTT'));
	    		return;
	    	}
	    	if(formObj.f_filter_by_radio[0].checked == true){
	    		formObj.f_h_all_tp.value="";
	    	}else{
	    		formObj.f_h_all_tp.value="O";
	    	}
	    	if(formObj.f_filter_by_chk_1.checked == true){
	    		formObj.f_h_inv_rcvd_flg.value="Y";
	    	}
	    	if(formObj.f_cust_radio[0].checked){
		  		formObj.f_cust_flg.value="Y";
		  	}else{
		  		formObj.f_cust_flg.value="";
		  	}
	    	printLocalStatement();
		break;	    
		case "Print":
		break;
		case "TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			// Agent group ID에 체크되어있으면 검색하지않는다.
			if(formObj.f_cust_radio[1].checked){  	
				break;
			}
			rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]=formObj.f_cust_trdp_nm.value;
			rtnary[2]=window;
			//var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
			callBackFunc = "TRDP_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");             
		break;
		case "ALL_DPT":
			formObj.f_dpt_tp_1.checked=true;
			formObj.f_dpt_tp_2.checked=true;
			formObj.f_dpt_tp_3.checked=true;
			formObj.f_dpt_tp_4.checked=true;
			formObj.f_dpt_tp_5.checked=true;
			formObj.f_dpt_tp_6.checked=true;
		break;
		case "CLEAR_DPT":
			formObj.f_dpt_tp_1.checked=false;
			formObj.f_dpt_tp_2.checked=false;
			formObj.f_dpt_tp_3.checked=false;
			formObj.f_dpt_tp_4.checked=false;
			formObj.f_dpt_tp_5.checked=false;
			formObj.f_dpt_tp_6.checked=false;
		break;
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
	 formObj=document.frm1;
	 
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.f_ofc_cd);
    
	 formObj.per_dt.value=getTodayStr();
	 formObj.per_strdt.value=getMonthFirstDate(-1);
	 formObj.per_enddt.value=getTodayStr();
	 if(formObj.f_sys_ofc_trf_cur_cd.value != ""){
		 formObj.f_curr_cd.value=formObj.f_sys_ofc_trf_cur_cd.value;
	 }
	 for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	 
	 // Period Type 을 Period로 설정
	 if(prn_ofc_cd =="BNXC"){		//[20150327 OJG]  임시수정
		 dateFieldChange(1);
	 }else{
		 dateFieldChange(2);
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
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {
		case 1:      //IBSheet1 init
			with (sheetObj) {

			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('PFM_ACC_0030_HDR1'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"ibflag" },
			             {Type:"Text",      Hidden:0,  Width:190,  Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:190,  Align:"Left",    ColMerge:1,   SaveName:"inv_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:"curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:"intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:"oth_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:"wms_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
			             ];
			 
			InitColumns(cols);
			SetVisible(0);
			SetEditable(1);
			/* 요구사항 #21738, jsjang 2013.12.19 */

        }                                                      
		break;
	}
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
	    case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
//		    var cal=new calendarPopup();
//	        cal.displayType="date";
//	        cal.select(formObj.per_dt, 'per_dt', 'MM-dd-yyyy');
	        var cal=new ComCalendar();
	        cal.displayType="date";
	        cal.select(formObj.per_dt, 'MM-dd-yyyy');

	    break;
        case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
//            var cal=new calendarPopupFromTo();
//            cal.displayType="date";
//            cal.select(formObj.per_strdt, 'per_strdt', formObj.per_enddt, 'per_enddt', 'MM-dd-yyyy');
            var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.per_strdt,formObj.per_enddt, 'MM-dd-yyyy');
        break;
    }
}
function dateFieldChange(flg){
	var formObj=document.frm1;
	if(flg == "1"){
		document.getElementById("date_td1").style.display="inline";
		document.getElementById("date_td2").style.display="none";
		formObj.f_filter_by_chk_3.disabled=true;
		formObj.f_filter_by_chk_3.checked=false;
		formObj.f_date_radio[0].checked=true;
	}else{
		document.getElementById("date_td1").style.display="none";
		document.getElementById("date_td2").style.display="inline";
		formObj.f_filter_by_chk_3.disabled=false;
		formObj.f_date_radio[1].checked=true;
	}
}
function rptTypeChange(){
	var formObj=document.frm1;
	if(formObj.f_rpt_tp_2.checked == true){
		formObj.f_filter_by_chk_1.disabled=false;
	}else{
		formObj.f_filter_by_chk_1.disabled=true;
		formObj.f_filter_by_chk_1.checked=false;
	}
}

function printLocalStatement(){
	var formObj=document.frm1;
	formObj.title.value='Local Statement';
	formObj.file_name.value="local_statement_01.mrd"; 
	
	var ofcCd="";
	
	if(formObj.f_ofc_cd.value != ""){
		ofcCd=formObj.f_ofc_cd.value;
  	}else{
  		ofcCd=formObj.f_sys_ofc_cd.value;
  	}
	
	var param="";
	param += "[" + ofcCd + "]";												//[1]
	param += "[" + formObj.f_cust_trdp_cd.value + "]";						//[2]
	param += formObj.f_per_radio[0].checked == true ? "[Y]" : "[]";			//[3]	
	param += formObj.f_per_radio[1].checked == true ? "[Y]" : "[]";			//[4]
	param += formObj.f_per_radio[2].checked == true ? "[Y]" : "[]";			//[5]
	param += formObj.f_per_radio[3].checked == true ? "[Y]" : "[]";			//[6]
	param += formObj.f_date_radio[0].checked == true ? "[Y]" : "[]";		//[7]
	param += formObj.f_date_radio[1].checked == true ? "[Y]" : "[]";		//[8]
	
	if(formObj.f_date_radio[0].checked == true){
		param += "[" + "As of " + formObj.per_dt.value + "]";				//[9]
		param += "[" + formObj.h_per_dt.value + "]";						//[10]
	}else{
		param += "[" + formObj.h_per_strdt.value + "]";						//[9]
		param += "[" + formObj.h_per_enddt.value + "]";						//[10]
	}
	
	var todayDt=getTodayStr().replaceAll("-","");
	var year=todayDt.substring(4,8);
	var month=todayDt.substring(0,2);
	var day=todayDt.substring(2,4);
	todayDt=mkCharMonthFormat(month) + " " + day + ", " +  year;
	param += "[" + todayDt + "]";											//[11]
	
	param += "[" + formObj.f_curr_cd.value + "]";							//[12]
	
	var dptTpStr="";
	var dptTp1="";
	var dptTp2="";
	var dptTp3="";
	var dptTp4="";
	var dptTp5="";
	var dptTp6="";
	
	if(formObj.f_dpt_tp_1.checked == true){
		dptTpStr += ",AI";
		dptTp1="Y";
	}
	if(formObj.f_dpt_tp_2.checked == true){
		dptTpStr += ",AE";
		dptTp2="Y";
	}
	if(formObj.f_dpt_tp_3.checked == true){
		dptTpStr += ",OI";
		dptTp3="Y";
	}
	if(formObj.f_dpt_tp_4.checked == true){
		dptTpStr += ",OE";
		dptTp4="Y";
	}
	if(formObj.f_dpt_tp_5.checked == true){
		dptTpStr += ",GE";
		dptTp5="Y";
	}
	if(formObj.f_dpt_tp_6.checked == true){
		dptTpStr += ",GE";
		dptTp6="Y";
	}
	
	param += '[' + dptTp1 + ']';											//[13]
	param += '[' + dptTp2 + ']';											//[14]
	param += '[' + dptTp3 + ']';											//[15]
	param += '[' + dptTp4 + ']';											//[16]
	param += '[' + dptTp5 + ']';											//[17]	
	
	dptTpStr=dptTpStr.substring(1);
	param += '[' + dptTpStr + ']';											//[18]
	
	param += formObj.f_rpt_tp_1.checked == true ? "[Y]" : "[]";				//[19]
	param += formObj.f_rpt_tp_2.checked == true ? "[Y]" : "[]";				//[20]
	
	if(formObj.f_rpt_tp_1.checked == false && formObj.f_rpt_tp_2.checked == true){
		param += '[Y]';														//[21]
	}else{
		param += '[]';														//[21]
	}
	param += formObj.f_filter_by_radio[0].checked == true ? "[Y]" : "[]";	//[22]
	param += formObj.f_filter_by_radio[1].checked == true ? "[Y]" : "[]";	//[23]
	param += formObj.f_filter_by_chk_1.checked == true ? "[Y]" : "[]";		//[24]
	param += formObj.f_filter_by_chk_3.checked == true ? "[Y]" : "[]";		//[25]
	param += '[' + formObj.f_sys_ofc_locl_stmt_rmk.value + ']';				//[26]
	param += formObj.f_ofc_cd.value == "" ? "[Y]" : "[]";					//[27]
	param += '[' + usrPhn + ']';											//[28]
	param += '[' + usrFax + ']';											//[29]
	param += '[' + usrEml + ']';											//[30]
	param += '[' + usrNm  + ']';											//[31]
	param += '[' + usrId  + ']';											//[32]
	param += '[' + dptTp6 + ']';											//[33]
	
	// Invoice 관련 파라메터
	param += formObj.f_filter_by_chk_2.checked == true ? "[Y]" : "[]";		//[34]
	param += '[' + ofcCd + 'MAINCMP]';										//[35]
	param += '[' + formObj.f_ofc_cd.value + ']';							//[36]
	
	if(formObj.f_cust_flg.value == "Y"){
		param += '[Y]';														//[37]
	}else{
		param += '[]';	
	}
	param += '[' + formObj.f_acct_cd.value + ']';							//[38]
	// [39] Logo
		
	formObj.rd_param.value = param;	
	formObj.rpt_biz_tp.value="ACCT";
	formObj.rpt_biz_sub_tp.value="LS";
	formObj.rpt_trdp_cd.value=formObj.f_cust_trdp_cd.value;
	
	//popPOST(formObj, "RPT_RD_0030.clt", 'popTest', 1025, 740);
	if (pdf) {
		popPOST(formObj, 'RPT_RD_0070.clt', 'popTest', 1025, 740);
		pdf = false;
	} else {
		popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
	}
	
}
/**
* code name select
*/
function codeNameAction(str, obj, tmp){
	CODETYPE=str;
 	var formObj=document.frm1;
 	var s_code=obj.value.toUpperCase();		
 	var s_type=str.substring(0,8);
 	if(str == "cust_trdpcode") {
 		s_type="trdpcode";
 		docObjects[0].RemoveAll();
 	}
	if (s_code != "") {
 		if (tmp == "onKeyDown") {
 			if (event.keyCode == 13) {
 				ajaxSendPost(trdpCdReq, 'reqVal',
 						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
 								+ '&s_code=' + s_code, './GateServlet.gsl');
 			}
 		} else if (tmp == "onBlur") {
 			if (s_code != "") {
 				ajaxSendPost(trdpCdReq, 'reqVal',
 						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
 								+ '&s_code=' + s_code, './GateServlet.gsl');
 			}
 		}
 	} else {
 		if (CODETYPE == "cust_trdpcode") {
 			formObj.f_cust_trdp_cd.value="";// trdp_cd AS param1
 			formObj.f_cust_trdp_nm.value="";// eng_nm AS param2
 		}
 	}
 }
 /**
 * Trade Partner 관련 코드조회
 */
 function trdpCdReq(reqVal){
 	var doc=getAjaxMsgXML(reqVal);
 	var formObj=document.frm1;
 	if(doc[0]=='OK'){
 		if(typeof(doc[1])!='undefined'){
 			//조회해온 결과를 Parent에 표시함
 			var masterVals=doc[1].split('@@^');
 			if(CODETYPE =="cust_trdpcode"){
 				formObj.f_cust_trdp_cd.value=masterVals[0];		//trdp_cd  AS param1
 				formObj.f_cust_trdp_nm.value=masterVals[3];		//eng_nm   AS param2
 			}
 		} else {
 			if(CODETYPE =="cust_trdpcode"){
 				formObj.f_cust_trdp_cd.value="";				//trdp_cd  AS param1
 				formObj.f_cust_trdp_nm.value="";				//eng_nm   AS param2
 			}
 		}
 	}else{
 		//alert(getLabel('SEE_BMD_MSG43'));		
 	}
}
//Calendar flag value
var firCalFlag=false;

function chkCustomer(){
	var formObj=document.frm1;
  	if(formObj.f_cust_radio[0].checked){  	
  		formObj.f_cust_trdp_cd.readOnly=false;
  		formObj.f_cust_trdp_nm.readOnly=false;
  		formObj.f_cust_trdp_cd.disabled=false;
  		formObj.f_cust_trdp_nm.disabled=false;
		// #50579
		//formObj.f_filter_by_chk_3.disabled=true;
		//formObj.f_filter_by_chk_3.checked=false;
		
  	}else{
  		formObj.f_cust_trdp_cd.value="";
		formObj.f_cust_trdp_cd.readOnly=true;
		formObj.f_cust_trdp_cd.disabled=true;
  		formObj.f_cust_trdp_nm.value="";
  		formObj.f_cust_trdp_nm.readOnly=true;
  		formObj.f_cust_trdp_nm.disabled=true;
		// #50579
		//formObj.f_filter_by_chk_3.disabled=false;
  	}
}