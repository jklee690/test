//=========================================================
//*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
//*@FileName   : ClosingSearch.js
//*@FileTitle  : Inventory Movement & Hold & Damage Search
//*@author     : Bao.Huynh - DOU Network
//*@version    : 1.0
//*@since      : 2015/04/14
//=========================================================

//docObjects
var firCalFlag=false;
var rtnary=new Array(1);
var callBackFunc = "";
var sheetCnt=0;
var docObjects=new Array();
var comboCnt=0; 
var fix_grid01="";
var loading_flag="N";
//2번이상 사용되는 하드코딩된값은 변수로 선언하여 사용.
var sub_sum_row_div="TOTAL";
/*
 * Sheet object 생성시 cnt 증가
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	var formObj=document.form;
	//sheet
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
	loadComboStatus();
	loadComboType();
	loadComboWarehouse();
    loading_flag="Y";
    //control
	initControl();
	resizeSheet();
	setFieldValue(formObj.wh_combo, ComGetObjValue(formObj.def_wh_cd));
	setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.def_wh_ctrt_no)); 
	setFieldValue(formObj.ctrt_nm, ComGetObjValue(formObj.def_wh_ctrt_nm));
	setFieldValue(formObj.ofc_cd, ComGetObjValue(formObj.org_cd));
	setFieldValue(formObj.ofc_nm, ComGetObjValue(formObj.org_nm));
	 
	var monthStr=ComReplaceStr(ComGetDateAdd(null, "m", -1, "-"), "-","");
	var monthY=monthStr.substring(4, 8);
	var monthD=monthStr.substring(0, 2);
	$("#fm_cls_date").val(monthD + "-" + monthY);
	var date = ComGetNowInfo("ym");
	$("#to_cls_date").val(date.substring(5,7) + "-" + date.substring(0,4));
}
function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
	//- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
/*
 * init sheet
 */ 
 function initSheet(sheetObj, sheetNo) {
		var cnt=0;
		switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
            with(sheetObj){
            
			  var prefix=fix_grid01;
			  SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
			
			  var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
			  var headers = [ { Text:getLabel('ClosingSearch_HDR1'), Align:"Center"},
		                      { Text:getLabel('ClosingSearch_HDR2'), Align:"Center"} ];
			  InitHeaders(headers, info);

			  var cols = [{Type:"Text",     Hidden:0,  Width:30,		Align:"Center", ColMerge:1,			SaveName:prefix+"seq",    			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:1,  Width:30,		Align:"Center", ColMerge:1,			SaveName:prefix+"sub_key",			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:115,		Align:"Center", ColMerge:1,			SaveName:prefix+"cls_no", 			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:80,		Align:"Center", ColMerge:1,			SaveName:prefix+"ctrt_no",			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:100, 		Align:"Left",   ColMerge:1,			SaveName:prefix+"ctrt_nm",			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:55, 		Align:"Center", ColMerge:1,			SaveName:prefix+"cust_cd",			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:250,		Align:"Left",   ColMerge:1,			SaveName:prefix+"cust_nm",			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:75,		Align:"Center", ColMerge:1,			SaveName:prefix+"sts_nm", 			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:110,		Align:"Center", ColMerge:1,			SaveName:prefix+"so_no",  			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:70,		Align:"Center", ColMerge:1,			SaveName:prefix+"frt_view",			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:65,		Align:"Center", ColMerge:1,			SaveName:prefix+"sb_cls_nm",		KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:40,		Align:"Center", ColMerge:1,			SaveName:prefix+"curr_cd",			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:80,		Align:"Right",  ColMerge:1,			SaveName:prefix+"sub_tot",			KeyField:0,			Format:"Float",				PointCount:2,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:1,  Width:30, 		Align:"Center", ColMerge:1,			SaveName:prefix+"rn",				KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:110,		Align:"Center", ColMerge:1,			SaveName:prefix+"inv_no",			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:68, 		Align:"Center", ColMerge:1,			SaveName:prefix+"rate_tp_nm",		KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:95, 		Align:"Center", ColMerge:1,			SaveName:prefix+"order_rel_nm",		KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:50, 		Align:"Center", ColMerge:1,			SaveName:prefix+"frt_cd",			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:140,		Align:"Left",   ColMerge:1,			SaveName:prefix+"frt_nm",			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:0,  Width:40,		Align:"Center", ColMerge:1,			SaveName:prefix+"unit_cd",			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Int",      Hidden:0,  Width:50,		Align:"Right",  ColMerge:1,			SaveName:prefix+"unit_qty",			KeyField:0,			Format:"Integer",			PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Float",     Hidden:0,  Width:110,		Align:"Right",  ColMerge:1,			SaveName:prefix+"unit_price",		KeyField:0,			Format:"Float",				PointCount:3,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Float",     Hidden:1,  Width:110,		Align:"Right",  ColMerge:1,			SaveName:prefix+"basic_amt", 		KeyField:0,			Format:"Float",				PointCount:2,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Float",     Hidden:1,  Width:110,		Align:"Right",  ColMerge:1,			SaveName:prefix+"adjust_amt",		KeyField:0,			Format:"Float",				PointCount:2,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Float",     Hidden:0,  Width:110,		Align:"Right",  ColMerge:1,			SaveName:prefix+"tot_amt",   		KeyField:0,			Format:"Float",				PointCount:2,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Combo",     Hidden:0,  Width:150,		Align:"Left", ColMerge:1,			SaveName:prefix+"wh_cd",			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Image",    Hidden:0,  Width:100,		Align:"Center", ColMerge:1,			SaveName:prefix+"rmk_img",			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:1,  Width:100,		Align:"Center", ColMerge:1,			SaveName:prefix+"rmk",				KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:1,  Width:0,			Align:"Center",	ColMerge:0,			SaveName:prefix+"sb_cls_cd",		KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:1,  Width:0,			Align:"Center",	ColMerge:0,			SaveName:prefix+"sts_cd",			KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:1,  Width:0,			Align:"Center",	ColMerge:0,			SaveName:prefix+"rate_tp_cd",		KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:1,  Width:0,			Align:"Center",	ColMerge:0,			SaveName:prefix+"order_rel",		KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:1,  Width:0,			Align:"Center",	ColMerge:0,			SaveName:prefix+"sub_sum_row_div",	KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
 			  {Type:"Text",     Hidden:1,  Width:0,			Align:"Center",	ColMerge:0,			SaveName:prefix+"sub_sum_row",		KeyField:0,			Format:"",					PointCount:0,			  	UpdateEdit:0,   InsertEdit:0} ]; 	
                                           
   
			  InitColumns(cols);
			  SetHeaderRowHeight(30);
			  SetAutoRowHeight(0);
			  resizeSheet();
			  SetSheetHeight(480);
			  SetEditable(0);
			  SetImageList(0,"web/img/main/icon_text_off.gif");
			  SetImageList(1,"web/img/main/icon_text_on.gif");
			  SetColProperty(prefix+"wh_cd", {ComboText:wh_comboText, ComboCode:wh_comboCode} );
			  
  }
  break;


		}
	}

 function resizeSheet(){
		ComResizeSheet(docObjects[0]);
	}
/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(){
	var sheetObj=sheet1;//docObjects[0];
	//sheetObj.SubSumBackColor = "#FAF4C0";
	//displaySubSum();
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, fix_grid01 + "sub_sum_row_div") != sub_sum_row_div)
		{
			//link 폰트색상 변경
 			sheetObj.SetCellFontColor(i, fix_grid01 + "cls_no","#0100FF");
 			sheetObj.SetCellFontColor(i, fix_grid01 + "cust_cd","#0100FF");
 			sheetObj.SetCellFontColor(i, fix_grid01 + "so_no","#0100FF");
 			sheetObj.SetCellFontColor(i, fix_grid01 + "frt_view","#0100FF");
 			sheetObj.SetCellFontColor(i, fix_grid01 + "sb_cls_nm","#0100FF");
 			sheetObj.SetCellFontColor(i, fix_grid01 + "rate_tp_nm","#0100FF");
			//remark
 				var value=sheetObj.GetCellValue(i, fix_grid01 + "rmk").trim();
			if (value.length > 0) {
			sheetObj.SetCellImage(i, fix_grid01 + "rmk_img",1);
			} else {
 				sheetObj.SetCellImage(i, fix_grid01 + "rmk_img",0);
			}	
		}
	}
}


function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	if(sheetObj.GetCellValue(Row, fix_grid01 + "sub_sum_row_div") == sub_sum_row_div)
		{
			return;
		}
		var colName=sheetObj.ColSaveName(Col);
		switch(colName)
		{
			case fix_grid01 + "rmk_img": // remark
				var value=sheetObj.GetCellValue(Row, fix_grid01 + "rmk").trim();
				if (value.length > 0) {
					ComShowMemoPad2(sheetObj, Row, fix_grid01 + "rmk", true, 120, 100, Col, Col);
				}
				break;
			case fix_grid01 + "cls_no":
				//param = cls_no, s/b, type
				goClosingMgmt(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no"), "cls");
			break;
			case fix_grid01 + "cust_cd":
				//param = cls_no, s/b, type
				goClosingDetail(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no")
				, sheetObj.GetCellValue(Row, fix_grid01 + "cust_cd")
					      , ""
					      , "");
				break;
			case fix_grid01 + "sb_cls_nm":
				//param = cls_no, s/b, type
				goClosingDetail(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no")
						, sheetObj.GetCellValue(Row, fix_grid01 + "cust_cd")
						, sheetObj.GetCellValue(Row, fix_grid01 + "sb_cls_cd")
						      , "");
				break;
			case fix_grid01 + "rate_tp_nm":
				goClosingDetail(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no")
						, sheetObj.GetCellValue(Row, fix_grid01 + "cust_cd")
						, sheetObj.GetCellValue(Row, fix_grid01 + "sb_cls_cd")
						, sheetObj.GetCellValue(Row, fix_grid01 + "rate_tp_cd"));
				break;
			case fix_grid01 + "so_no":
				//param = cls_no, s/b, type
				goClosingMgmt(sheetObj.GetCellValue(Row, fix_grid01 + "so_no"), "so");
			break;
		}
	}
	function goClosingMgmt(val, type)
	{
		var param="";
		if(type == "cls"){
			param="?cls_no=" + val;
		}else if(type == "so"){
			param="?so_no=" + val;
		}
		var sUrl="./ClosingMgmt.clt" + param;
		parent.mkNewFrame('Closing Management', sUrl, "ClosingMgmt_" + val);
	}
	function goClosingDetail(cls_no, cust_cd, sb_cls_cd, rate_tp_cd)
	{
		var param="?cls_no=" + cls_no
		          + "&cust_cd=" + cust_cd
		          + "&sb_cls_cd=" + sb_cls_cd
		          + "&rate_tp_cd=" + rate_tp_cd;
		var sUrl="./ClosingDetail.clt" + param;
		parent.mkNewFrame('Closing Detail', sUrl, "ClosingDetail_" + cls_no + "_" + cust_cd + "_" + sb_cls_cd + "_" + rate_tp_cd);
	}

	function doWork(srcName){
		var formObj=document.form;
		try {
			switch(srcName) {	
				case "btn_fm_cls_date":	
					var cal=new ComCalendar();
					cal.setDisplayType('month');
					cal.select(formObj.fm_cls_date, 'MM-yyyy');
				break;
				case "btn_to_cls_date":	
					var cal=new ComCalendar();
					cal.setDisplayType('month');
		            cal.select(formObj.to_cls_date, 'MM-yyyy');
					break;
				
				case "btn_ctrt_no" :
					CtrtPopup();
				break;
				case "btn_cust_cd" :	
					CustomerPopup();
				break;
				case "btn_ofc_cd":
					OfficePopup();
					break;
				case "SEARCHLIST":
	 				btn_Search();
	 				break;
	 			case "EXCEL":
	 				btn_Excel_Dl();
	 				break;
			} // end switch
		}catch(e) {
			if( e == "[object Error]") {
				//ComShowMessage(OBJECT_ERROR);
			} else {
				//ComShowMessage(e);
			}
		}
	}

/**
 * 마우스 아웃일때 
 */
function form_deactivate() {
}
function obj_keydown(){ 
    var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
    var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "cls_no":	
				btn_Search();
			break;	
			default:		
				if(!(t.readOnly)){
				}
				break;
		}
	}
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
}


/**
 * 버튼 클릭 이벤트모음 시작
 */
function btn_Search() {	
	var formObj=document.form;
	//search
	if (validateForm(formObj,'search')) {
		doShowProcess();
		formObj.f_cmd.value = SEARCH;
 		sheet1.DoSearch("./searchClosingListGS.clt", FormQueryString(formObj));
	}
	
	doHideProcess();
}
function btn_Excel_Dl(){
	 	var prefix = fix_grid01;
		if(docObjects[0].RowCount() < 1){//no data
	     	ComShowCodeMessage("COM132501");
	    }else{
	    	docObjects[0].Down2Excel( {DownCols: makeSkipCol(docObjects[0],"27","26"), SheetDesign:1,Merge:1, HiddenColumn: 0, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
	    }
}
/**
 * 버튼 클릭 이벤트모음 끝
 */
/*
 * NAME 엔터시 팝업호출 - customer name 
 */
function CustomerPopup(){
	var formObj=document.form;
	rtnary=new Array(2);
	rtnary[0]="";
	rtnary[1]=formObj.cust_nm.value;
	rtnary[2]=window;
	callBackFunc = "setServiceProvider";
    modal_center_open('./CMM_POP_0010.clt',rtnary, 1150,650,"yes");
}

function CtrtPopup(){
	var formObj=document.form;
	callBackFunc = "setCtrtNoInfo";
    modal_center_open('./ContractRoutePopup.clt?ctrt_no=' + formObj.ctrt_no.value + "&ctrt_nm="+formObj.ctrt_nm.value, callBackFunc, 900, 580,"yes");
}

function OfficePopup(){
	var formObj=document.form;
	
	rtnary=new Array(2);
	rtnary[0]="1";
	sUrl="./CMM_POP_0150.clt?";
	
	callBackFunc = "setOffice";
	modal_center_open(sUrl, rtnary, 556,600,"yes");
	
//    modal_center_open('./CMM_POP_0050.clt', callBackFunc, 900,620,"yes");
}
/*
 * 팝업 관련 로직 시작
 */
function setCtrtNoInfo(rtnVal){
	var formObj=document.form;
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.ctrt_no.value=rtnValAry[0];//full_nm
		   formObj.ctrt_nm.value=rtnValAry[1];//full_nm
	   } 	
}

function setServiceProvider(rtnVal){
	 var formObj=document.form;
	  if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
	  }else{
		  var rtnValAry=rtnVal.split("||");
		   formObj.cust_cd.value=rtnValAry[0];//full_nm
		   formObj.cust_nm.value=rtnValAry[1];//full_nm
	  }
}
function setOffice(rtnVal){
	 var formObj=document.form;
	  if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
	  }else{
		  var rtnValAry=rtnVal.split("|");
		   formObj.ofc_cd.value=rtnValAry[0];
		   formObj.ofc_nm.value=rtnValAry[1];
	  }
}

/*
 * 팝업 관련 로직 끝
 */


/***
 * AJAX CODE SEARCH
 */

/*
 * Warehouse search
 * OnKeyDown 13 or onChange
 */
function searchLocInfo(obj){
		ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+obj.value+'&type=WH', './GateServlet.gsl');
}
function resultLocInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.wh_nm.value=rtnArr[0];
	   }
	   else{
	    formObj.wh_cd.value="";
	    formObj.wh_nm.value=""; 
	   }
	  }
	  else{
	   formObj.wh_cd.value="";
	   formObj.wh_nm.value=""; 
	  }
	 }
	 else{
	  //ComShowMessage(getLabel('SEE_BMD_MSG43'));
	 }
}
/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
function searchTlCtrtInfo(){
	var formObj=document.form;
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.ctrt_no.value, './GateServlet.gsl');
}
function resultCtrtInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				if(rtnArr[0] == "null"){
					formObj.ctrt_nm.value="";
				}else{ 
					formObj.ctrt_nm.value=rtnArr[0];
				}
			}
			else{
				formObj.ctrt_no.value="";
				formObj.ctrt_nm.value="";	
			}
		}
		else{
			formObj.ctrt_no.value="";
			formObj.ctrt_nm.value="";	
		}
	}
	else{
		//ComShowMessage(getLabel('SEE_BMD_MSG43'));
	}
}



/*
 * Customer search
 * OnKeyDown 13 or onChange
 */
function codeName(str, obj, tmp){
	var formObj=document.form;
	var s_code=obj.value.toUpperCase();
	var s_type="";
	if(s_code != ""){
		CODETYPE=str;
		if(str == "commodity") {
			s_type="commodity";
		}else{
			s_type="trdpCode";
		}
		if(tmp == "onKeyDown"){
			
			if(event.keyCode == 13){
				ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
		else if(tmp == "onBlur"){
			if(s_code != ""){
				ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}else{
		if(str == "CUSTUMER"){
			formObj.cust_cd.value="";//cust_cd  AS param1
			formObj.cust_nm.value="";//cust_nm   AS param2
		}
	}
}

var CODETYPE='';
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(CODETYPE =="CUSTUMER"){
				formObj.cust_cd.value=masterVals[0];	//cust_cd  AS param1
				formObj.cust_nm.value=masterVals[3];	//cust_nm   AS param2
//				docObjects[0].RemoveAll();
			}
		}
		else{
			if(CODETYPE =="CUSTUMER"){
				formObj.cust_cd.value="";				//cust_cd  AS param1
				formObj.cust_nm.value="";				//cust_nm   AS param2
			}
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

/*
 * Office search
 * OnKeyDown 13 or onChange
 */
function codeNameAction(str, tmp){
	var formObj=document.form;
	if( tmp == "onKeyDown" ) {
		if (event.keyCode == 13){
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+formObj.ofc_cd.value, './GateServlet.gsl');
		}
	}else if( tmp == "onBlur" ) {
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+formObj.ofc_cd.value, './GateServlet.gsl');
	}
}

function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@^@@^@@^');
			if(rtnArr[0] != ""){
				formObj.ofc_nm.value=rtnArr[1];
			}
			else{
				formObj.ofc_cd.value="";
				formObj.ofc_nm.value="";	
			}
		}
		else{
			formObj.ofc_cd.value="";
			formObj.ofc_nm.value="";	
		}
	}
	else{
		//ComShowMessage(getLabel('SEE_BMD_MSG43'));
	}
}

/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			//날짜 체크
			if(ComIsEmpty(formObj.fm_cls_date) && ComIsEmpty(formObj.to_cls_date))
			{
				ComShowCodeMessage("COM0114","Closing Month");
				$("#fm_cls_date").focus();
				return false;
			}
			if(!ComIsEmpty(formObj.fm_cls_date) && ComIsEmpty(formObj.to_cls_date)){
				var td = ComGetNowInfo("mdy");
				var today = td.substring(0,2) + "-" + td.substring(6,10);
				$("#to_cls_date").val(today);
				formObj.to_cls_date.value=today;
			}
			
			var frm = formObj.fm_cls_date.value;
			var frm_m = frm.substring(0,2);
			var frm_y = frm.substring(3,8);
			var to = formObj.to_cls_date.value;
			var to_m = to.substring(0,2);
			var to_y = to.substring(3,8);
			if (!ComIsEmpty(formObj.fm_cls_date) && !ComIsDate(frm_y + "-" + frm_m + "-01")) {
				ComShowCodeMessage("COM0114","Closing Month");
				formObj.fm_cls_date.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.to_cls_date) && !ComIsDate(to_y + "-" + to_m + "-01")) {
				ComShowCodeMessage("COM0114","Closing Month");
				formObj.to_cls_date.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.fm_cls_date)&&ComIsEmpty(formObj.to_cls_date))||(ComIsEmpty(formObj.fm_cls_date)&&!ComIsEmpty(formObj.to_cls_date))) {
				ComShowCodeMessage("COM0122","Closing Month");
				formObj.fm_cls_date.focus();
				return false;
			}
			if (check_getDaysBetween((frm_m + "-01-" +frm_y), (to_m + "-01-" + to_y), 'MM-dd-yyyy')<0) {
				ComShowCodeMessage("COM0122","Closing Month");
				formObj.fm_cls_date.focus();
				return false;
			}
		}
	}
	return true;
}

//check date
function check_getDaysBetween(fromObj, toObj, format) {
    
    var numstr1=fromObj.replace(/\/|\-|\./g,"");
	var numstr2=toObj.replace(/\/|\-|\./g,"");
	var user_day1="";
	var user_day2="";
	if(format == "MM-dd-yyyy"){
		user_day1=new Date(numstr1.substr(4), parseInt2(numstr1.substr(0,2))-1, parseInt2(numstr1.substr(2,2)));
        user_day2=new Date(numstr2.substr(4), parseInt2(numstr2.substr(0,2))-1, parseInt2(numstr2.substr(2,2)));
	}else{    	
		 user_day1=new Date(numstr1.substr(0,4), parseInt2(numstr1.substr(4,2))-1, parseInt2(numstr1.substr(6)));
         user_day2=new Date(numstr2.substr(0,4), parseInt2(numstr2.substr(4,2))-1, parseInt2(numstr2.substr(6)));
	}
    user_day1=user_day1.getTime();
    user_day2=user_day2.getTime();
    var day_gab=Math.floor( (user_day2 - user_day1) / (60*60*24*1000) );
    return day_gab;
}

function htmlDecode(value){
	return (typeof value === 'undefined') ? '' : $('<div/>').html(value).text();
}
function loadComboType(){
	var obj = document.getElementById("rate_tp_cd");
	var option =  document.createElement("option");
	
	option.text = "ALL";
	option.value = "ALL";
	
	obj.add(option);
	
	var rate_tp_cd_cd = rate_tp_cdCode.split('|');
	var rate_tp_cd_nm = rate_tp_cdText.split('|');
	
	for(var i = 0; i < rate_tp_cd_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(rate_tp_cd_nm[i]);
		option.value = htmlDecode(rate_tp_cd_cd[i]);
		
		obj.add(option);
	}
}
function loadComboStatus(){
	var obj = document.getElementById("sts_cd");
	var option =  document.createElement("option");
	
	option.text = "ALL";
	option.value = "ALL";
	
	obj.add(option);
	
	var sts_cd_cd = sts_cdCode.split('|');
	var sts_cd_nm = sts_cdText.split('|');
	
	for(var i = 0; i < sts_cd_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(sts_cd_nm[i]);
		option.value = htmlDecode(sts_cd_cd[i]);
		
		obj.add(option);
	}
}

function loadComboWarehouse(){
	var obj = document.getElementById("wh_combo");
	var option =  document.createElement("option");
	
	option.text = "";
	option.value = "";
	obj.add(option);
	
	var wh_combo_cd = wh_comboCode.split('|');
	var wh_combo_nm = wh_comboText.split('|');
	
	for(var i = 0; i < wh_combo_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(wh_combo_nm[i]);
		option.value = htmlDecode(wh_combo_cd[i]);
		obj.add(option);
	}
}
/*
 * Show Sub Sum

function displaySubSum()
{
	$("#sheet1")[0].ShowSubSum(fix_grid01 + "sub_key"
	          , fix_grid01 + "basic_amt|" + fix_grid01 + "adjust_amt|" + fix_grid01 + "tot_amt"
	          , -1
	          , false
	          , false
	          , $("#sheet1")[0].SaveNameCol(fix_grid01 + "sub_sum_row")
	          ,fix_grid01 + "cls_no=%s" + ";" 
	          +fix_grid01 + "ctrt_no=%s" + ";"
	          +fix_grid01 + "ctrt_nm=%s" + ";" 
	          +fix_grid01 + "cust_cd=%s" + ";"
	          +fix_grid01 + "cust_nm=%s" + ";"
	          +fix_grid01 + "sb_cls_nm=%s TOTAL" + ";"
	          +fix_grid01 + "sub_sum_row_div=" + sub_sum_row_div + ";"
				);	
}
 */
function addSeperator(obj, event, dateCheck, type) {
	Date_Format(obj, obj.value, event, dateCheck, type);
}

function Date_Format(vDateName, vDateValue, e, dateCheck, dateType) {
	var form = document.form;
	var whichCode = (window.Event) ? e.which : e.keyCode;
	var strSeperator = "-";
	if (whichCode == 8){
		return false;
	}else {
		var strCheck = '47,48,49,50,51,52,53,54,55,56,57,58,59,95,96,97,98,99,100,101,102,103,104,105';

		if (strCheck.indexOf(whichCode) != -1) {
			if (vDateType == 3) {
				if (vDateValue.length == 2) {
					if(vDateName.id == "fm_cls_date")
						form.fm_cls_date.value = vDateValue + strSeperator;
					if(vDateName.id == "to_cls_date")
						form.to_cls_date.value = vDateValue + strSeperator;
				}
			}
		}
	}
}


function checkDateType(obj,dateCheck,dateType,to) {
	checkDate(obj, obj.value, dateCheck, vDateType, to.value);
}
function checkDateTypes(obj,dateCheck,dateType,from) {
	checkDates(obj, obj.value, dateCheck, vDateType,from.value);
}
function checkDate(vDateName,vDateValue,dateCheck,vDateType,to){
	var vYearType = 4; //Set to 2 or 4 for number of digits in the year for Netscape
	var vYearLength = 4; // Set to 4 if you want to force the user to enter 4 digits for the year before validating.
	var strSeperator = "-";
	formObj = document.form;
	if ((vDateValue.length < 6 && dateCheck)  && (vDateValue.length >=1)) {
		//Invalid Date\nPlease Re-Enter
		ComShowMessage(getLabel('FMS_COM_ALT002'));
		vDateName.value = "";
		vDateName.focus();
		return false;
	}
	if (vDateValue.length >= 6 && dateCheck) {

		var sepCnt = vDateValue.split(strSeperator).length - 1;
		if(sepCnt==0){
			if(vDateValue.length ==6){
				form.fm_cls_date.value = vDateName.value.substring(0,2) + strSeperator + vDateName.value.substring(2,6);
				checkDate(vDateName,formObj.fm_cls_date.value,dateCheck,vDateType,to);
				return false;
			}else{
				ComShowMessage(getLabel('FMS_COM_ALT002'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
		}else if(sepCnt == 1){
			var mMonth = vDateName.value.substring(0,2);
			var mYear = vDateName.value.substring(3,7);
			if((mMonth)>=13 || (mMonth) <=0){
				ComShowMessage(getLabel('FMS_COM_ALT002'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
			if(to != null && to != ""){
				var from = mYear + mMonth;
				var todate = to.substring(3,7) +   to.substring(0,2);;
				if(from > todate){
					ComShowMessage("End date must be greater than start date");
					vDateName.value = "";
					vDateName.focus();
					return false;
				}
			}
		}
		
		// Additional date formats can be entered here and parsed out to
		// a valid date format that the validation routine will recognize.
		if (vDateType == 3) // mm/yyyy
		{
			var mMonth = vDateName.value.substring(0,2);
			var mYear = vDateName.value.substring(3,7);
		}
		

		// Create temp. variable for storing the current vDateType
		var vDateTypeTemp = vDateType;

		// Change vDateType to a 1 for standard date format for validation
		// Type will be changed back when validation is completed.
		vDateType = 1;

		// Store reformatted date to new variable for validation.
		var vDateValueCheck = mMonth+strSeperator+mYear;
		
		if (vYearLength == 4) {
			if (mYear.length < 4) {
				//Invalid Date\nPlease Re-Enter
				ComShowMessage(getLabel('FMS_COM_ALT002'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			} else if(parseInt(mYear) < 1900) {
				//Year must be greater than 1900.
				ComShowMessage(getLabel('FMS_COM_ALT041'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
		}

		vDateType = vDateTypeTemp;
		return true;

	}else {
		if (vDateType == 3) {
				if (vDateValue.length == 2) {
					vDateName.value = vDateValue+strSeperator;
				}
				if (vDateValue.length == 5) {
					vDateName.value = vDateValue+strSeperator;
			   }
		}
		return true;
	}	
}

function checkDates(vDateName,vDateValue,dateCheck,vDateType,from){
	var vYearType = 4; //Set to 2 or 4 for number of digits in the year for Netscape
	var vYearLength = 4; // Set to 4 if you want to force the user to enter 4 digits for the year before validating.
	var strSeperator = "-";
	formObj = document.form;
	if ((vDateValue.length < 6 && dateCheck)  && (vDateValue.length >=1)) {
		//Invalid Date\nPlease Re-Enter
		ComShowMessage(getLabel('FMS_COM_ALT002'));
		
		vDateName.value = "";
		vDateName.focus();
		return false;
	}
	if (vDateValue.length >= 6 && dateCheck) {

		var sepCnt = vDateValue.split(strSeperator).length - 1;
		if(sepCnt==0){
			if(vDateValue.length ==6){
				form.to_cls_date.value = vDateName.value.substring(0,2) + strSeperator + vDateName.value.substring(2,6);
				checkDates(vDateName,formObj.to_cls_date.value,dateCheck,vDateType,from);
				return false;
			}else{
				ComShowMessage(getLabel('FMS_COM_ALT002'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
		}
		
		if(sepCnt==1){
			var mMonth = vDateName.value.substring(0,2);
			var mYear = vDateName.value.substring(3,7);
			if((mMonth)>=13 || (mMonth) <=0){
				ComShowMessage(getLabel('FMS_COM_ALT002'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
			var to = mYear + mMonth;
			var fromdate = from.substring(3,7) +   from.substring(0,2);
			if(fromdate > to){
				ComShowMessage("End date must be greater than start date");
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
		}
		
		// Additional date formats can be entered here and parsed out to
		// a valid date format that the validation routine will recognize.
		if (vDateType == 3) // mm/yyyy
		{
			var mMonth = vDateName.value.substring(0,2);
			var mYear = vDateName.value.substring(3,7);
		}
		

		// Create temp. variable for storing the current vDateType
		var vDateTypeTemp = vDateType;

		// Change vDateType to a 1 for standard date format for validation
		// Type will be changed back when validation is completed.
		vDateType = 1;

		// Store reformatted date to new variable for validation.
		var vDateValueCheck = mMonth+strSeperator+mYear;
		
		if (vYearLength == 4) {
			if (mYear.length < 4) {
				//Invalid Date\nPlease Re-Enter
				ComShowMessage(getLabel('FMS_COM_ALT002'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			} else if(parseInt(mYear) < 1900) {
				//Year must be greater than 1900.
				ComShowMessage(getLabel('FMS_COM_ALT041'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
		}

		vDateType = vDateTypeTemp;
		return true;

	}else {
		if (vDateType == 3) {
				if (vDateValue.length == 2) {
					vDateName.value = vDateValue+strSeperator;
				}
				if (vDateValue.length == 5) {
					vDateName.value = vDateValue+strSeperator;
			   }
		}
		return true;
	}	
}
function makeSkipCol(sobj,colsShow,colsHide){
    var lc = sobj.LastCol();
    var colsArr = new Array();
    var colsShowArr = new Array();
    var colsHideArr = new Array();
    colsShowArr = colsShow.split("|");
    colsHideArr = colsHide.split("|");
    for(var i=0;i<=lc;i++){
    	if(1==sobj.GetColHidden(i) || sobj.GetCellProperty(0,i,"Type") == "DummyCheck" || sobj.GetCellProperty(0,i,"Type") == "Status" 
    		||  sobj.GetCellProperty(0,i,"Type") =="DelCheck"){
    		var flg_show = false;
    		for(var j=0;j < colsShowArr.length;j++){
    			if(colsShowArr[j] == i )
    				flg_show = true;
    		}
    		if(!flg_show){
    			 colsArr.push(i);
    		}
    	}
    	if(0==sobj.GetColHidden(i)){
    		var flg_hide = false;
    		for(var k=0;k < colsHideArr.length;k++){
    			if(colsHideArr[k] == i )
    				flg_hide = true;
    		}
    		if(flg_hide){
   				 colsArr.push(i);
    		}
    	}
    	
    }
    var rtnStr = "";
    for(var i=0;i<=lc;i++){
           if(!colsArr.contains(i)){
        	   rtnStr += "|"+ i;
           }
    }
    return rtnStr.substring(1);
}