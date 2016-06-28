/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : EDI_CSTM_0010.js
*@FileTitle  : 항공수출 국내세관 화물적화목록 EDI 처리
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/25
=========================================================*/
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDt(frm1.f_obdt_str_dt, frm1.f_obdt_end_dt);
}
function doWork(srcName){
	switch(srcName) {
		case "SEARCHLIST01":	//OB Date, 편명목록 조회
			if(!chkSearchCmprPrd(false, frm1.f_obdt_str_dt, frm1.f_obdt_end_dt)){
				return;
			}
			//항목초기화
			resetEdiValue();
			dispEdiViewTb(false);
			docObjects[1].RemoveAll();
			frm1.f_cmd.value=SEARCHLIST01;
			docObjects[0].DoSearch("EDI_CSTM_0010GS.clt",   FormQueryString(frm1) );
		break;
		case "SEARCHLIST02":	//BL목록 조회
			frm1.f_cmd.value=SEARCHLIST02;
			docObjects[1].DoSearch("EDI_CSTM_0010_1GS.clt", FormQueryString(frm1) );
		break;
		case "COMMAND01":		//전송데이터 생성
			if(checkInpuVals()){
				//'전문 정보를 생성하시겠습니까?')){
				if(confirm(getLabel('FMS_COM_CFMCRE'))){
					frm1.f_cmd.value=COMMAND01;
					docObjects[0].DoAllSave("EDI_CSTM_0010GS.clt",  FormQueryString(frm1)+'&'+docObjects[1].GetSaveString(true));
				}
			}
		break;
		case "COMMAND02":		//전송데이터 수정
			if(checkInpuVals()){
				//'전문 정보를 수정하시겠습니까?')){
				if(confirm(getLabel('FMS_COM_CFMMOD'))){
					frm1.f_cmd.value=COMMAND02;
					docObjects[0].DoAllSave("EDI_CSTM_0010GS.clt", FormQueryString(frm1)+'&'+docObjects[1].GetSaveString(true));
				}
			}
		break;
		case "COMMAND03":		//전송데이터 삭제
			//'전문 정보를 삭제하시겠습니까?')){
			if(confirm(getLabel('FMS_COM_CFMDEL'))){
				frm1.f_cmd.value=COMMAND03;
				docObjects[0].DoAllSave("EDI_CSTM_0010GS.clt", FormQueryString(frm1));
			}
		break;
		case "COMMAND04":		//EDI 전문 전송
			//'EDI 전문을 KTNET으로 전송하시겠습니까?')){
			if(confirm(getLabel('FMS_COM_CFMSEN'))){
				frm1.f_cmd.value=COMMAND04;
				docObjects[0].DoAllSave("EDI_CSTM_0010GS.clt", FormQueryString(frm1));
			}
		break;
		case "COMMAND05":		//전송자료 재생성
			//'기존 전문을 바탕으로 EDI 전문정보를 생성하시겠습니까?')){
			if(confirm(getLabel('FMS_COM_CFMCRE'))){
				frm1.f_cmd.value=COMMAND05;
				docObjects[0].DoAllSave("EDI_CSTM_0010GS.clt", FormQueryString(frm1));
			}
		break;
		case "COMMAND06":		//EDI전문 재전송
			//'EDI 전문을 KTNET으로 재전송하시겠습니까?')){
			if(confirm(getLabel('FMS_COM_CFMSEN'))){
				frm1.f_cmd.value=COMMAND04;
				docObjects[0].DoAllSave("EDI_CSTM_0010GS.clt", FormQueryString(frm1));
			}
		break;
		case "CALLCT":
			ajaxSendPost(getCtradeAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCtradeKey&AIR_SEA_CLSS_CD=A', './GateServlet.gsl');
		break;
	}
}
/**
 * Ctrade 화면
 **/
function getCtradeAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split(',');
			var myform=document.forms[0];
			myform.insertBefore(createHidden("ctwId",masterVals[0]));
			myform.insertBefore(createHidden("ctwPass",masterVals[1]));
			myform.insertBefore(createHidden("returnUrl","http://www.ctradeworld.com/logis/logis.jsp?topmenu=mfcs"));
			myform.action="http://www.ctradeworld.com/ctwpass/autoLoginChk.jsp";
			myform.method="post";
			myform.target="winName";
			window.open("about:blank","winName","toolbar=no,scrollbars=no,resizable=yes, left=100, width=900, height=600");
			myform.submit();
		}
	}
}
/**
 * EDI 전송전문 내용보기
 */
function showEdiMsg(){
	var param='f_edi_cre_seq=';
	param+= frm1.f_edi_cre_seq.value;
	param+= '&f_edi_msg_seq=';
	param+= frm1.f_edi_msg_seq.value;
	param+= '&f_edi_msg_no=';
	param+= frm1.sndKeyList.value;
	 ComOpenWindow('./EDI_CSTM_0090.clt?'+param,  '',  "scroll:yes;status:no;help:no;dialogWidth:756px;dialogHeight:460px" , true);
}
var rtnary=new Array(1);
function getCode(obj, isCstm){
	if(isCstm){
		if(frm1.disp_flt_no.value!=''){
	   		rtnary=new Array(1);
	   		rtnary[0]="2";
	   		var rtnVal =  ComOpenWindow('./EDI_CSTM_0011.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:540px;dialogHeight:340px" , true);
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnArr=rtnVal.split(';');
				frm1.disp_cstm_cd.value=rtnArr[0];
				frm1.disp_cstm_nm.value=rtnArr[1];
				frm1.disp_cstm_dept_cd.value='';
				frm1.disp_cstm_dept_nm.value='';
			}
		}else{
			//alert('전송항 정보를 좌측목록에서 선택하여 주십시오!');
			alert(getLabel('FMS_COM_ALT004') + "\n\n: EDI_CSTM_0010.147");
		}
	}else{
		if(frm1.disp_cstm_nm.value==''){
			//alert('세관코드를 먼저 선택해 주십시오!');
			alert(getLabel('FMS_COM_ALT004') + "\n\n: EDI_CSTM_0010.154");
		}else{
	   		rtnary=new Array(1);
	   		rtnary[0]=frm1.disp_cstm_cd.value;
	   		var paramStr='?disp_cstm_cd=';
	   		    paramStr+= frm1.disp_cstm_cd.value;
	   		var rtnVal =  ComOpenWindow('./EDI_CSTM_0012.clt'+paramStr,  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:540px;dialogHeight:350px" , true);
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnArr=rtnVal.split(';');
				frm1.disp_cstm_dept_cd.value=rtnArr[0];
				frm1.disp_cstm_dept_nm.value=rtnArr[1];
			}
		}
	}
}
function checkInpuVals(){
	var isOk=true;
	if(checkInputVal(frm1.disp_cstm_cd.value, 3, 3, "T", '세관코드')!='O'){
		isOk=false;
	}else if(checkInputVal(frm1.disp_cstm_dept_cd.value, 3, 3, "T", '세관부서코드')!='O'){
		isOk=false;
	}else if(checkInputVal(frm1.disp_decnsl_cmp_cd.value, 4, 4, "T", 'Deconsol')!='O'){
		isOk=false;
	}
	var rowCnt=docObjects[1].rows;
	if(rowCnt<3||docObjects[1].GetCellValue(2, 'hbl_no')==''){
		//alert('BL정보가 존재하지 않아 전문 생성이 불가능합니다!\n\nMAWB, HAWB 정보를 다시 확인하여 주십시오!');
		alert(getLabel('FMS_COM_ALT007') + "\n\n: EDI_CSTM_0010.187");
		isOk=false;
	}
	return isOk;
}
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
           // cal.displayType="date";
            cal.select(frm1.f_obdt_str_dt,  frm1.f_obdt_end_dt, 'MM-dd-yyyy');
        break;
    }
}
/**
 * 조회팝업여부
 */
function dispEdiViewTb(isView){
	var ediObj=getObj('ediView');
	if(isView){
		ediObj.style.display='block';	
	}else{
		ediObj.style.display='none';
		var pSelect=frm1.sndKeyList;	
		var optVal=pSelect.options;
		var sLen=optVal.length;
		for(var p=sLen; p >=0; p--){
			optVal.remove(p);
		}
	}
}
/**
 * 작성된 전문 목록을 조회함
 */
function setEdiSndKeyList(){
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchEdiMsgKey'+'&edi_cre_seq='+frm1.f_edi_cre_seq.value+'&edi_msg_seq='+frm1.f_edi_msg_seq.value, './GateServlet.gsl');
}
//코드표시 Ajax
function dispAjaxReq(reqVal){
	try{
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		//Perent의 <Select>의 options를 제거한다.
		//Perent의 <Select>의 options를 제거한다.
		var pSelect=frm1.sndKeyList;	
		var optVal=pSelect.options;
		var sLen=optVal.length;
		for(var p=sLen; p >=0; p--){
			optVal.remove(p);
		}
		//조회해온 결과를 Parent에 표시함
		var rtnArr=doc[1].split(';');
		for(var i=0; i<rtnArr.length; i++){
			var cdVals=rtnArr[i].split(',');
			if(typeof(cdVals[1])!='undefined'){
				var oOption=document.createElement("OPTION");
				optVal.add(oOption);
				oOption.innerText=cdVals[1];
				oOption.value=cdVals[0];
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: EDI_CSTM_0010.256");		
	}
	}catch(err){
		//alert('Error Msg.:'+err.message);
		alert(getLabel('FMS_COM_ERR001') + err.message + "\n\n: EDI_CSTM_0010.260");
	}
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var headerRowCnt=2;
/**
* Sheet 기본 설정 및 초기화
* body 태그의 onLoad 이벤트핸들러 구현
* 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
*/
function loadPage() {
	var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
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
		case 1:      //House B/L Information
			with (sheetObj) {
			SetColProperty("edi_sts", {ComboText:"미작성|작성|전송완료|재전송|재작성", ComboCode:"|C|S|R|N"} );
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('EDI_CSTM_0010_HDR1'), Align:"Center"} ];
	      InitHeaders(headers, info);
	      var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"ibflag" },
	             {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"workday" },
	             {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"flt_no" },
	             {Type:"Text",     Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"mmbl_no" },
	             {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"edi_sts" },
	             {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"smt_dt" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"edi_cre_seq" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"edi_msg_seq" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"cstm_cd" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"cstm_nm" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"cstm_dept_cd" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"cstm_dept_nm" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"edi_msg_no" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"intg_bl_seq" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"decnsl_cmp_cd" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"obdt_fltno" } ];
	      InitColumns(cols);
	      SetEditable(0);
	      SetSheetHeight(370);
			}
		break;
		case 2:      //House B/L Information
			with (sheetObj) {
			SetColProperty(1, {ComboText:"미작성|작성", ComboCode:"|H"} );
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('EDI_CSTM_0010_HDR2_1'), Align:"Center"},
	                  { Text:getLabel('EDI_CSTM_0010_HDR2_2'), Align:"Center"} ];
	      InitHeaders(headers, info);
	      var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"ibflag" },
	             {Type:"Text",      Hidden:1, Width:55,   Align:"Left",    ColMerge:1,   SaveName:"cur_sts" },
	             {Type:"Text",     Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"mbl_no" },
	             {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"mbl_obrd_dt" },
	             {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"mbl_flt_no" },
	             {Type:"Text",     Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"hbl_no" },
	             {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"hbl_obrd_dt" },
	             {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"hbl_flt_no" },
	             {Type:"Text",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"h_expyn" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"mbl_seq" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"hbl_seq" } ];
	      InitColumns(cols);
	      SetEditable(0);
	      SetSheetHeight(235);
			}
		break;
	}
}
function sheet1_OnSaveEnd(errObj){
	var curSts='';
	var selecRow=-1;
	for(var i=1; i <= docObjects[0].rows; i++){
		if(docObjects[0].GetCellValue(i, 'intg_bl_seq')==frm1.f_intg_bl_seq.value){
			curSts=docObjects[0].GetCellValue(i, 'edi_sts');
			selecRow=i;
			break;
		}
	}
	//삭제된 경우
	if(curSts==''){
		resetEdiValue();
		docObjects[1].RemoveAll();
	}else{
		//등록/수정 인 경우
		if(curSts=='C'||curSts=='S'||curSts=='N'){
			sheet1_OnClick(docObjects[0], selecRow, 1);
		}
	}
}
function sheet1_OnClick(sheetObj, row, col){
	//기존값 초기화
	resetEdiValue();
	//EDI처리내역 상세에 값을 Setting함
	frm1.disp_flt_no.value=sheetObj.GetCellValue(row, 'flt_no');
	frm1.disp_workday.value=sheetObj.GetCellValue(row, 'workday');
	frm1.disp_edi_sts.value=sheetObj.GetCellText(row, 'edi_sts');
	frm1.cur_edi_sts.value=sheetObj.GetCellValue(row, 'edi_sts');
	frm1.disp_smt_dt.value=sheetObj.GetCellValue(row, 'smt_dt');
	frm1.disp_cstm_cd.value=sheetObj.GetCellValue(row, 'cstm_cd');
	frm1.disp_cstm_nm.value=sheetObj.GetCellValue(row, 'cstm_nm');
	frm1.disp_cstm_dept_cd.value=sheetObj.GetCellValue(row, 'cstm_dept_cd');
	frm1.disp_cstm_dept_nm.value=sheetObj.GetCellValue(row, 'cstm_dept_nm');
	frm1.disp_decnsl_cmp_cd.value="GLAI";
	frm1.f_edi_sts.value=sheetObj.GetCellValue(row, 'edi_sts');
	frm1.f_edi_msg_no.value=sheetObj.GetCellValue(row, 'edi_msg_no');
	frm1.f_edi_cre_seq.value=sheetObj.GetCellValue(row, 'edi_cre_seq');
	frm1.f_edi_msg_seq.value=sheetObj.GetCellValue(row, 'edi_msg_seq');
	frm1.f_mbl_no.value=sheetObj.GetCellValue(row, 'mbl_no');
	frm1.f_intg_bl_seq.value=sheetObj.GetCellValue(row, 'intg_bl_seq');
	frm1.obdt_fltno.value=sheetObj.GetCellValue(row, 'obdt_fltno');
	//작성전
	if(frm1.f_edi_cre_seq.value==''){
		dispEdiViewTb(false);
		getObj('btn1').style.display='block';
		frm1.disp_cstm_cd.value=cstmCd;
		frm1.disp_cstm_nm.value=cstmNm;
		frm1.disp_cstm_dept_cd.value=cstmDptCd;
		frm1.disp_cstm_dept_nm.value=cstmDptNm;
	//저장후
	}else{
		//저장이후
		if(frm1.f_edi_sts.value=='C'||frm1.f_edi_sts.value=='N'){
			dispEdiViewTb(false);
			getObj('btn2').style.display='block';
		}else if(frm1.f_edi_sts.value=='S'){
			if(frm1.f_edi_sts.value=='S'){
				dispEdiViewTb(true);
				setEdiSndKeyList();
			}
			getObj('btn3').style.display='block';
		}
	}
	doWork('SEARCHLIST02');
}
function resetEdiValue(){
	frm1.f_cmd.value='';
	frm1.obdt_fltno.value='';
	getObj('btn1').style.display='none';
	getObj('btn2').style.display='none';
	getObj('btn3').style.display='none';
	frm1.disp_edi_sts.value='';
	//frm1.cur_edi_sts.value='';
	frm1.disp_flt_no.value='';
	frm1.disp_workday.value='';
	frm1.disp_cstm_cd.value='';
	frm1.disp_cstm_nm.value='';
	frm1.disp_cstm_dept_cd.value=''; 
	frm1.disp_cstm_dept_nm.value=''; 
	frm1.disp_decnsl_cmp_cd.value='';
	frm1.disp_smt_dt.value='';
	frm1.f_edi_msg_no.value='';
	frm1.f_edi_msg_seq.value='';
}
//Calendar flag value
var firCalFlag=false;
function codeNameAction(callId, obj, callTp){
	var cdVal=obj.value;
	if(cdVal==''){
		if(callId=='OFC_CD'){
			frm1.disp_cstm_nm.value='';
		}else{
			frm1.disp_cstm_dept_nm.value='';
		}
		return;
	}
	if(callId=='OFC_CD'){
		frm1.disp_cstm_nm.value='';
		ajaxSendPost(getOfcChk,    'reqVal', '&goWhere=aj&bcKey=getOfcChk&f_disp_cstm_cd='+frm1.disp_cstm_cd.value, './GateServlet.gsl');
	}else if(callId=='SUB_OFC_CD'){
		frm1.disp_cstm_dept_nm.value='';
		ajaxSendPost(getSubOfcChk, 'reqVal', '&goWhere=aj&bcKey=getSubOfcChk&f_disp_cstm_dept_cd='+frm1.disp_cstm_dept_cd.value+'&f_disp_cstm_cd='+frm1.disp_cstm_cd.value, './GateServlet.gsl');
	}
}
function getOfcChk(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='ERR'){
				frm1.disp_cstm_cd.value='';
			}else{
				frm1.disp_cstm_nm.value=doc[1];
			}
		}
	}else{
		frm1.disp_cstm_cd.value='';
	}
}
function getSubOfcChk(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='ERR'){
				frm1.disp_cstm_dept_cd.value='';
			}else{
				frm1.disp_cstm_dept_nm.value=doc[1];
			}
		}
	}else{
		frm1.disp_cstm_dept_cd.value='';
	}
}