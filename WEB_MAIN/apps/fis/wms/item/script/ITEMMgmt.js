/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ITMgmt.js
*@FileTitle  :  Item Management  
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/03/05
=========================================================*/
var SEARCHFLG="N";
var searchCnt=0;
//--------------------------------------------------------------------------------------------------------------
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var tabObjects=new Array();
var tabCnt=0 ;
var beforetab=1; 
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var uploadObjects=new Array();
var uploadCnt=0;
var loading_flag = "N";
var rtnary=new Array(2);
var callBackFunc = "";
var ut_std_chg =  1;
var wgt_std_chg =  1;

/*
 * IE에서 jQuery ajax 호출이 한번만 되는 경우 발생(브라우저 버젼별 틀림)하여
 * cache옵션 false셋팅
 */
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
});
/**
* Sheet  onLoad
*/
function loadPage() {
	doShowProcess(true);
	for(var k=0;k<tabObjects.length;k++){
        initTab(tabObjects[k],k+1);
    }
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	loadDataCombo();
    doHideProcess(false);
    loading_flag = "Y";
	var formObject=document.form;
	if (formObject.in_item_cd.value != "" && formObject.in_ctrt_no.value != ""){
		imSearch();
	}else{
		ComBtnDisable("btn_cancel");
	}	
	resizeSheet();
	if(formObject.uploadfile.value!="")
	{
		btn_Search();
	}
	if(h_ut_tp_cd =="CM"){
		// 센치
		ut_std_chg = 0.01;
	}else if(h_ut_tp_cd=="INCH"){
		//Inch
		ut_std_chg  = 0.0254;
		wgt_std_chg = 2.54;
	}
	document.getElementById("sh_ut_tp_cd").innerHTML = h_ut_tp_cd;
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObject=document.form;
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
    // OnChange 이벤트
    axon_event.addListenerForm("blur", "form_onChange", formObject);
    // OnKeyUp 이벤트
    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
    //- 포커스 나갈때
    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	var parm="";
	switch (srcName) {
		case "item_pkgbaseqty":
			formObj.item_pkgbaseqty.value=ComAddComma(formObj.item_pkgbaseqty.value);
		case "item_kgs":
			formObj.item_kgs.value=ComAddComma(formObj.item_kgs.value);	
		case "item_cbm":
			formObj.item_cbm.value=ComAddComma(formObj.item_cbm.value);	
		case "item_net_wgt":
			formObj.item_net_wgt.value=ComAddComma(formObj.item_net_wgt.value);
		case "item_width":
			formObj.item_width.value=ComAddComma(formObj.item_width.value);
		case "item_length":
			formObj.item_length.value=ComAddComma(formObj.item_length.value);
		case "item_height":
			formObj.item_height.value=ComAddComma(formObj.item_height.value);
	}
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * Tab 기본 설정
 * 탭의 항목을 설정한다.
 */
function initTab(tabObj , tabNo) {
     switch(tabNo) {
         case 1:
            with (tabObj) {
                var cnt=0 ;
                InsertItem( "Item" , "");
                InsertItem( "Optional Field" , "");
            }
       		break;
     }
}
/**
 * Upload Object
 */
function setUploadObject(uploadObj){
	uploadObjects[uploadCnt++]=uploadObj;
}
function doWork(srcName){
//	function doWork(srcName, valObj){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	var sheetObject1=docObjects[0];   //t1sheet1
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
			case "SEARCHLIST":	
				sheet1.RemoveAll();
				sheet2.RemoveAll();
				sheet3.RemoveAll();
				sheet4.RemoveAll();
				sheet5.RemoveAll();
				btn_Search();
				break;
			case "SAVE":	
				btn_Save();
				break;
			case "NEW":	
				btn_New();
				break;
			case "INACTIVE":	
				btn_Cancel();
				break;
			case "row_add":	
				row_add();
				break;
			case "row_del":	
				row_del();
				break;
			case "row_add2":	
				row_add2();
				break;
			case "row_del2":	
				row_del2();
				break;
			case "btn_file_upload":	
				btn_File_Upload();
				break;
			case "btn_file_delete":	
				btn_File_Delete();
				break;
			case "TEMPATE_DOWNLOAD":
				excel_Download();
				break;
			case "UPLOAD_EXEL":
				excel_Upload();
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
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
*/
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
	case 1:      //IBSheet1 init
	    with(sheetObj){
      var prefix="Grd00";

      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	  var headers = [ { Text:getLabel('ITMgmt_Sheet1_HDR1'), Align:"Center"} ];		   
      InitHeaders(headers, info);

      var cols = [ {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"hts_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"hts_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_pkgbaseqty", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_pkgunit",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_pkgunit_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_cbm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_kgs",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_width",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_length",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_height",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_remark",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_use_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_net_wgt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_sys_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
       
		      InitColumns(cols);
		      SetEditable(1);
		      SetSheetHeight(250);
		      resizeSheet();
            }
      break;


		break;	
		case 2:      //IBSheet1 init
		    with(sheetObj){
	      var prefix="Grd01";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		  var headers = [ { Text:getLabel('ITMgmt_Sheet2_HDR1'), Align:"Center"},
	                      { Text:getLabel('ITMgmt_Sheet2_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Combo", Hidden:0, Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"wh_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Combo",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"wh_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:prefix+"fix_loc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:prefix+"fix_loc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:prefix+"def_loc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:prefix+"def_loc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_sys_no", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
	             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
	       
	      InitColumns(cols);
	      SetEditable(1);
	      SetSheetHeight(250);
	    //set warehouse
		  SetColProperty(prefix+"wh_cd", {ComboText:whCd_Nm, ComboCode:whCd} );
		  SetColProperty(prefix+"wh_nm", {ComboText:whNm, ComboCode:whCd} );
		  SetColProperty(0 , prefix + "fix_loc_cd" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
		  SetColProperty(0 , prefix + "def_loc_cd" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
	      resizeSheet();
	      }
	      break;


		case 3:      //IBSheet1 init
		    with(sheetObj){
	      var prefix="Grd02";
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		  var headers = [ { Text:getLabel('ITMgmt_Sheet3_HDR1'), Align:"Center"},
	                      { Text:getLabel('ITMgmt_Sheet3_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"supp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:10 },
	             {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:prefix+"supp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0/*,   EditLen:20*/ },
	             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:prefix+"supp_item_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_sys_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
	             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
	       
	      InitColumns(cols);
	      SetEditable(1);
	      SetColProperty(0 ,prefix+"supp_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"supp_item_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      SetSheetHeight(250);
	      resizeSheet();
	      }
	      break;


		case 4:      //IBSheet1 init
		    with(sheetObj){
	       
	      //var hdr1='|Seq|File Name|file_size|file_seq|file_path|file_sys_nm|ctrt_no|item_sys_no|ibflag';
	      //var headCount=ComCountHeadTitle(hdr1);
	      var prefix="Grd03";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		  var headers = [ { Text:getLabel('ITMgmt_Sheet4_HDR1'), Align:"Center"} ];		   
	      InitHeaders(headers, info);

	      var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Seq",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_org_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"file_size",   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_path",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_sys_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_sys_no", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
	       
	      InitColumns(cols);
	      SetEditable(1);
	      SetSheetHeight(242);
	      resizeSheet();
	      
	      }
	      break;


		case 5:      //IBSheet1 init
		    with(sheetObj){
	  
	      var hdr1='||||';
	      //var headCount=ComCountHeadTitle(hdr1);
	      var prefix="Grd04";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:hdr1, Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"opt_fld_clss_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"opt_fld_id",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:230,  Align:"Left",    ColMerge:1,   SaveName:prefix+"opt_fld_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"opt_fld_val",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(450);
	      SetEditable(1);
	      SetRowHidden(0, 1);
	      SetColProperty(0 ,prefix+"opt_fld_val" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
	      resizeSheet();
	      }
	      break;


	}
}
function resizeSheet(){
	ComResizeSheet(sheet1);
	ComResizeSheet(sheet2);
	ComResizeSheet(sheet3);
	ComResizeSheet(sheet4);
	ComResizeSheet(sheet5);
}
//WAREHOUSE 팝업
function sheet2_OnPopupClick(sheetObj, row, col){
	var formObj=document.form;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "Grd01fix_loc_nm"){     
		if(sheetObj.GetCellValue(row, "Grd01wh_cd") == ""){
			ComShowCodeMessage("COM0082", "Warehouse Code");
			sheetObj.SelectCell(row, "Grd01wh_cd");
			return;
		}else{
			var params = "WarehouseLocPopup.clt?f_loc_cd="+sheetObj.GetCellValue(row, "Grd01wh_cd");
			callBackFunc = "setGrd01FixLoc";
		    modal_center_open(params, callBackFunc, 700, 500,"yes");
		}
	}else if(colStr == "Grd01def_loc_nm"){    
		if(sheetObj.GetCellValue(row, "Grd01wh_cd") == ""){
			ComShowCodeMessage("COM0082", "Warehouse Code");
			sheetObj.SelectCell(row, "Grd01wh_cd");
			return;
		}else{
			var params = "WarehouseLocPopup.clt?f_loc_cd="+sheetObj.GetCellValue(row, "Grd01wh_cd");
			callBackFunc = "setGrd01DefLoc";
		    modal_center_open(params, callBackFunc, 700, 500,"yes");
		}
	}
}

function setGrd01FixLoc(rtnVal){
	var formObj=document.form;
	var sheetObj1=docObjects[1];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "Grd01fix_loc_cd",rtnValAry[0],0);
		sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "Grd01fix_loc_nm",rtnValAry[1],0);
	}
}
function setGrd01DefLoc(rtnVal){
	var formObj=document.form;
	var sheetObj1=docObjects[1];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "Grd01def_loc_cd",rtnValAry[0],0);
		sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "Grd01def_loc_nm",rtnValAry[1],0);
	}
}
function sheet2_OnChange(sheetObj, row, col) {
	var formObj=document.form;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "Grd01wh_cd"){
		var whCd_Change = sheetObj.GetCellText(row, "Grd01wh_cd",1);
		sheetObj.SetCellValue(row, "Grd01wh_nm",whCd_Change,0);
	}
	/*if(colStr == "Grd01wh_cd"){
		ajaxSendPost(resultGrd01WhLocInfo, sheetObj, '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+sheetObj.GetCellValue(row, "Grd01wh_cd"), './GateServlet.gsl');
		try{
			var dup_flg="Y";
			for(var i=2; i<=sheetObj.LastRow();i++){
				for(var j=2; j<=sheetObj.LastRow();j++){
					if(i != j){
						if(sheetObj.GetCellValue(i, "Grd01wh_cd") == sheetObj.GetCellValue(j, "Grd01wh_cd")){
							ComShowCodeMessage("COM0225", "Row No : "+(j-1)+" [Warehouse Info.]");
							sheetObj.SetCellValue(j, "Grd01wh_cd",sheetObj.CellSearchValue(j, "Grd01wh_cd"),0);
							sheetObj.SetCellValue(j, "Grd01wh_nm",sheetObj.CellSearchValue(j, "Grd01wh_nm"),0);
							sheetObj.SelectCell(j, "Grd01wh_cd");
							break;
						}
					}
				}
			}
		}catch (e) {
			sheetObj.SetCellValue(row, "Grd02supp_cd","");
			sheetObj.SetCellValue(row, "Grd02supp_nm","");
		}
	}else*/
	if(colStr == "Grd01fix_loc_nm"){
		if(sheetObj.GetCellValue(row, "Grd01wh_cd") == ""){
			ComShowCodeMessage("COM0082", "Warehouse Code");
			sheetObj.SelectCell(row, "Grd01wh_cd");
			sheetObj.SetCellValue2(row, "Grd01fix_loc_cd","");
			sheetObj.SetCellValue2(row, "Grd01fix_loc_nm","");
			return;
		}else{
			var sParam="f_loc_cd="+sheetObj.GetCellValue(row, "Grd01wh_cd")+"&f_wh_loc_nm="+sheetObj.GetCellValue(row, "Grd01fix_loc_nm");
			ajaxSendPost(checkDataLocSheet2OnChange, sheetObj, '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
		}
	} else if(colStr == "Grd01def_loc_nm"){
		if(sheetObj.GetCellValue(row, "Grd01wh_cd") == ""){
			ComShowCodeMessage("COM0082", "Warehouse Code");
			sheetObj.SelectCell(row, "Grd01wh_cd");
			sheetObj.SetCellValue(row, "Grd01def_loc_cd","");
			sheetObj.SetCellValue(row, "Grd01def_loc_nm","");
			return;
		}else{
			var sParam="f_loc_cd="+sheetObj.GetCellValue(row, "Grd01wh_cd")+"&f_wh_loc_nm="+sheetObj.GetCellValue(row, "Grd01def_loc_nm");
			ajaxSendPost(checkDataWarehouseLocSheet2OnChange, sheetObj, '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
		}
	}
	
}
function checkDataLocSheet2OnChange(reqVal, sheetObj){
	var formObj=document.form;
	var row = sheetObj.GetSelectRow();
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(row,  "Grd01fix_loc_cd", rtnArr[0],0);
				sheetObj.SetCellValue(row,  "Grd01fix_loc_nm", rtnArr[1],0);
			}
			else{
				sheetObj.SetCellValue(row,  "Grd01fix_loc_nm", "",0);
                sheetObj.SetCellValue(row,  "Grd01fix_loc_cd", "",0);
			}
		}
		else{
			sheetObj.SetCellValue(row,  "Grd01fix_loc_nm", "",0);
            sheetObj.SetCellValue(row,  "Grd01fix_loc_cd", "",0);
		}
	}
}
function checkDataWarehouseLocSheet2OnChange(reqVal, sheetObj){
	var formObj=document.form;
	var row = sheetObj.GetSelectRow();
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(row,  "Grd01def_loc_cd", rtnArr[0],0);
				sheetObj.SetCellValue(row,  "Grd01def_loc_nm", rtnArr[1],0);
			}
			else{
				sheetObj.SetCellValue(row,  "Grd01def_loc_nm", "",0);
                sheetObj.SetCellValue(row,  "Grd01def_loc_cd", "",0);
			}
		}
		else{
			sheetObj.SetCellValue(row,  "Grd01def_loc_nm", "",0);
            sheetObj.SetCellValue(row,  "Grd01def_loc_cd", "",0);
		}
	}
}
function resultGrd01WhLocInfo(reqVal, sheetObj){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01wh_nm", rtnArr[0]);
			}
			else{
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01wh_cd", "");
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01wh_nm", "");
			}
		}
		else{
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01wh_cd", "");
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01wh_nm", "");
		}
	}
	else{
	}
}
//SUPP_CD 조회
function sheet3_OnChange(sheetObj, row, col) {
	var formObj=document.form;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "Grd02supp_cd"){
		if(sheetObj.GetCellValue(row, "Grd02supp_cd") != ""){
			var s_type = 'trdpCode';
			var s_code = sheetObj.GetCellValue(row, "Grd02supp_cd");
			
			ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
		}else{
			sheetObj.SetCellValue(row, "Grd02supp_cd","");
			sheetObj.SetCellValue(row, "Grd02supp_nm","");
		}
	}     
}

function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	var sheetObj = sheet3;
	var row = sheetObj.GetSelectRow();
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			sheetObj.SetCellValue(row, "Grd02supp_cd",masterVals[0]);
			sheetObj.SetCellValue(row, "Grd02supp_nm",masterVals[3]);
		}else{
			sheetObj.SetCellValue(row, "Grd02supp_cd","");
			sheetObj.SetCellValue(row, "Grd02supp_nm","");
		}
	} else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

function checkDataCustSheet3OnChange(reqVal, sheetObj){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				try{
					if(rtnArr[0] != ""){
						sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_nm",rtnArr[0]);
						var dup_flg="Y";
						for(var i=2; i<=sheetObj.LastRow();i++){
							for(var j=2; j<=sheetObj.LastRow();j++){
								if(i != j){
									if(sheetObj.GetCellValue(i, "Grd02supp_cd") == sheetObj.GetCellValue(j, "Grd02supp_cd")){
										ComShowCodeMessage("COM131302", "Row No : "+(j-1)+" [Supplier Info.]");
										sheetObj.SetCellValue(j, "Grd02supp_cd",sheetObj.CellSearchValue(j, "Grd02supp_cd"));
										sheetObj.SetCellValue(j, "Grd02supp_nm",sheetObj.CellSearchValue(j, "Grd02supp_nm"));
										sheetObj.SelectCell(j, "Grd02supp_cd");
										break;
									}
								}
							}
						}
					}else{
						sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_cd","");
						sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_nm","");
					}
				}catch (e) {
					sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_cd","");
					sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_nm","");
				}
			}
			else{
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_cd","", 0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_nm", "", 0);
				sheetObj.SelectCell(sheetObj.GetSelectRow(), "Grd02supp_cd");
				return;
			}
		}
		else{
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_cd","", 0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_nm", "", 0);
			sheetObj.SelectCell(sheetObj.GetSelectRow(), "Grd02supp_cd");
			return;
		}
	}
}
//SUPP_CD 팝업
function sheet3_OnPopupClick(sheetObj, row, col){
	var formObj=document.form;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "Grd02supp_cd"){   
		btn_ctrt_cust_cd();
	}
}
function setGrdShipperInfo(rtnVal){
	var formObj=document.form;
	var sheetObj2=docObjects[2];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(), "Grd02supp_cd",rtnValAry[0]);
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(), "Grd02supp_nm",rtnValAry[1]);
		if(sheetObj2.GetCellValue(sheetObj2.GetSelectRow(), "Grd02supp_cd") == ""){
			sheetObj2.SetCellValue(sheetObj2.GetSelectRow(), "Grd02supp_nm","")	;
		}
	}
}
function sheet4_OnDblClick(sheetObj, Row, Col){
	var formObj1=document.frm1;
	var sName=sheetObj.ColSaveName(Col);
	if (sName == "Grd03file_org_nm") {
		//LKH::2015-09-28-File Attachment
		//ComSetObjValue(formObj1.downloadLocation, sheetObj.GetCellValue(Row, "Grd03file_path")+sheetObj.GetCellValue(Row, "Grd03file_sys_nm"));
		//ComSetObjValue(formObj1.downloadFileName, sheetObj.GetCellValue(Row, "Grd03file_org_nm"));
		formObj1.file_path.value = sheetObj.GetCellValue(Row, "Grd03file_path")+sheetObj.GetCellValue(Row, "Grd03file_sys_nm");
		formObj1.file_name.value = sheetObj.GetCellValue(Row, "Grd03file_org_nm");
		formObj1.submit();
	}
}
function sheet5_OnSearchEnd(sheetObj, ErrMsg) {
	var rowcnt=sheetObj.RowCount();
 	sheetObj.SetCellFont("FontBold", 0, 3, rowcnt, 3,1);
	for ( var i=0; i <= rowcnt ; i++){
		sheetObj.SetCellBackColor(i,"Grd04opt_fld_nm","#D9E5FF");
	}
}
var InputName="ctrt_no|ctrt_nm|item_cd|item_use_flg|item_nm|hts_no|hts_nm";
    InputName += "|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|lv1_width|lv1_length|lv1_height";
    InputName += "|item_cbm|item_cbf|item_kgs|item_grs_lbs|item_net_wgt|item_net_lbs|item_width|item_length|item_height";
    InputName += "|item_remark|item_sys_no|item_grp_cd";
    InputName += "|pkg_lv1_unit_cd|pkg_lv1_unit_nm|pkg_lv1_qty|pkg_lv1_put_tp_cd|item_pkgunit|item_pkgunit_nm|item_pkgbaseqty|pkg_lv2_put_tp_cd";
    InputName += "|pkg_lv3_unit_cd|pkg_lv3_unit_nm|pkg_lv3_qty|pkg_lv3_put_tp_cd|pkg_lv4_unit_cd|pkg_lv4_unit_nm|pkg_lv4_qty|pkg_lv4_put_tp_cd";
    InputName += "|alter_item_cd|barcode_no|safe_stc_qty|adv_curr_cd|adv_price|nego_curr_cd|nego_price|unit_curr_cd|unit_price|abc_cd|ref_cd_01|ref_cd_02";
    InputName += "|lv3_cbm|lv3_cbf|lv3_grs_kgs|lv3_grs_lbs|lv3_net_kgs|lv3_net_lbs|lv3_width|lv3_length|lv3_height|pkg_pl_std_qty|pkg_pl_over_wgt";
function quickSearch(){
	var formObj=document.form;
	if(loading_flag != "Y"){
        return;
    }
	if(formObj.in_item_cd.value != "" && formObj.in_ctrt_no.value != ""){
		formObj.item_sys_no.value="";
		imSearch();
	}
}
function btn_Search() {
	var formObj=document.form;
	if(loading_flag != "Y"){
        return;
    }
	formObj.item_sys_no.value="";
	formObj.logo_rectangle.value = "";
	imSearch();
}
function imSearch(){
	var formObj=document.form;
	if(ComIsEmpty(formObj.in_item_cd.value)){
		ComShowCodeMessage("COM0221");
		formObj.in_item_cd.focus();
		return;
	}	
	if(ComIsEmpty(formObj.in_ctrt_no.value)){
		ComShowCodeMessage("COM0222");
		formObj.in_ctrt_no.focus();
		return;
	}
	doShowProcess(true);
	setTimeout(function(){
		formObj.f_cmd.value = SEARCH01;
		var sXml = sheet1.GetSearchData("./ITEMMgmt_1GS.clt",FormQueryString(formObj)+"&len_ut_cd="+ofc_size_ut_cd);
		if (sXml.replace(/^\s+|\s+$/gm,'') != ''){
			if(formObj.item_sys_no.value != ""){
				setDataControl(sXml);
				//조회시 Contract No 입력불가
				if(formObj.item_sys_no.value != ""){
					formObj.ctrt_no.readonly = true;
					formObj.ctrt_no.className="L_input_R";
					formObj.item_cd.disabled = true;
					formObj.item_cd.className="L_input_R";
				}
			}else{
				var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
				var endIndxField = sXml.indexOf("</FIELD>");
				
				var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
				var $xml = $(xmlDoc);
				if($xml.find( "listCnt").text() == 1){
					setDataControl(sXml);
					//조회시 Contract No 입력불가
					if(formObj.item_sys_no.value != ""){
						formObj.ctrt_no.disabled = true;
						formObj.ctrt_no.className="L_input_R";
						formObj.item_cd.disabled = true;
						formObj.item_cd.className="L_input_R";
					}
				}else{
					ComShowCodeMessage("COM131302", "Item No");
					
					formObj.in_item_cd.value = "";
					return;
					
					var paramStr="./ITList.clt?ctrt_no="+formObj.in_ctrt_no.value+"&item_cd="+formObj.in_item_cd.value;
				    parent.mkNewFrame('Item Search', paramStr,"ITList_" + formObj.in_ctrt_no.value + "_" + formObj.in_item_cd.value);

				}
				//중복체크를 위한 item_cd 셋팅
				formObj.old_item_cd.value=formObj.item_cd.value;
			}
			formObj.btn_file_upload.disabled = false;
			formObj.btn_file_delete.disabled = false;
		}else{
			ComShowCodeMessage("COM0185");
			form.in_item_cd.select();
			formObj.btn_file_upload.disabled = true;
			formObj.btn_file_delete.disabled = true;
			return;
		}
		var strtIndxSheet2 = sXml.indexOf("<SHEET2>");
		var endIndxSheet2 = sXml.indexOf("</SHEET2>") + "</SHEET2>".length;
		
		var sheet2Data = sXml.substring(strtIndxSheet2,endIndxSheet2);
		sheet2.LoadSearchData(sheet2Data.replaceAll('SHEET2', 'SHEET'));
		
		var strtIndxSheet3 = sXml.indexOf("<SHEET3>");
		var endIndxSheet3 = sXml.indexOf("</SHEET3>") + "</SHEET3>".length;
		
		var sheet3Data = sXml.substring(strtIndxSheet3,endIndxSheet3);
		sheet3.LoadSearchData(sheet3Data.replaceAll('SHEET3', 'SHEET'));
		
		var strtIndxSheet4 = sXml.indexOf("<SHEET4>");
		var endIndxSheet4 = sXml.indexOf("</SHEET4>") + "</SHEET4>".length;
		
		var sheet4Data = sXml.substring(strtIndxSheet4,endIndxSheet4);
		sheet4.LoadSearchData(sheet4Data.replaceAll('SHEET4', 'SHEET'));
		
		var strtIndxSheet5 = sXml.indexOf("<SHEET5>");
		var endIndxSheet5 = sXml.indexOf("</SHEET5>") + "</SHEET5>".length;
		
		var sheet5Data = sXml.substring(strtIndxSheet5,endIndxSheet5);
		sheet5.LoadSearchData(sheet5Data.replaceAll('SHEET5', 'SHEET'));
		chkCommaObj();
	},100);	
	doHideProcess(false);
	if(formObj.item_use_flg[0].selected){
		ComBtnEnable("btn_cancel");
	}else{
		ComBtnDisable("btn_cancel");
	}
	formObj.form_mode.value = "UPDATE";
	
}
function setDataControl(sXml){
	var formObj=document.form;
	var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	var endIndxField = sXml.indexOf("</FIELD>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
	var $xml = $(xmlDoc);
	
	formObj.item_sys_no.value = $xml.find( "item_sys_no").text();
	formObj.ctrt_no.value = $xml.find( "ctrt_no").text();
	formObj.h_ctrt_no.value = $xml.find( "ctrt_no").text();
	formObj.ctrt_nm.value = $xml.find( "ctrt_nm").text();
	formObj.item_cd.value = $xml.find( "item_cd").text();
	formObj.item_nm.value = $xml.find( "item_nm").text();
	formObj.hts_no.value = $xml.find( "hts_no").text();
	formObj.hts_nm.value = $xml.find( "hts_nm").text();
	formObj.item_grp_cd.value = $xml.find( "item_grp_cd").text();
	formObj.item_use_flg.value = $xml.find( "item_use_flg").text();
	formObj.pkg_lv1_unit_cd.value = $xml.find( "pkg_lv1_unit_cd").text();
	formObj.pkg_lv1_unit_nm.value = $xml.find( "pkg_lv1_unit_nm").text();
	formObj.pkg_lv1_qty.value = $xml.find( "pkg_lv1_qty").text();
	formObj.pkg_lv1_put_tp_cd.value = $xml.find( "pkg_lv1_put_tp_cd").text();
	formObj.lv1_cbm.value = $xml.find( "lv1_cbm").text();
	formObj.lv1_cbf.value = $xml.find( "lv1_cbf").text();
	formObj.lv1_grs_kgs.value = $xml.find( "lv1_grs_kgs").text();
	formObj.lv1_grs_lbs.value = $xml.find( "lv1_grs_lbs").text();
	formObj.lv1_net_kgs.value = $xml.find( "lv1_net_kgs").text();
	formObj.lv1_net_lbs.value = $xml.find( "lv1_net_lbs").text();
	formObj.lv1_width.value = $xml.find( "lv1_width").text();
	formObj.lv1_length.value = $xml.find( "lv1_length").text();
	formObj.lv1_height.value = $xml.find( "lv1_height").text();
	formObj.item_pkgunit.value = $xml.find( "item_pkgunit").text();
	formObj.item_pkgunit_nm.value = $xml.find( "item_pkgunit_nm").text();
	formObj.item_pkgbaseqty.value = $xml.find( "item_pkgbaseqty").text() == 0 ? "" : $xml.find( "item_pkgbaseqty").text();
	formObj.pkg_lv2_put_tp_cd.value = $xml.find( "pkg_lv2_put_tp_cd").text();
	formObj.item_cbm.value = $xml.find( "item_cbm").text();
	formObj.item_cbf.value = $xml.find( "item_cbf").text();
	formObj.item_kgs.value = $xml.find( "item_kgs").text();
	formObj.item_grs_lbs.value = $xml.find( "item_grs_lbs").text();
	formObj.item_net_wgt.value = $xml.find( "item_net_wgt").text();
	formObj.item_net_lbs.value = $xml.find( "item_net_lbs").text();
	formObj.item_width.value = $xml.find( "item_width").text();
	formObj.item_height.value = $xml.find( "item_height").text();
	formObj.item_length.value = $xml.find( "item_length").text();
	formObj.pkg_lv3_unit_cd.value = $xml.find( "pkg_lv3_unit_cd").text();
	formObj.pkg_lv3_unit_nm.value = $xml.find( "pkg_lv3_unit_nm").text();
	formObj.pkg_lv3_qty.value = $xml.find( "pkg_lv3_qty").text() == 0 ? "" : $xml.find( "pkg_lv3_qty").text();
	formObj.pkg_lv3_put_tp_cd.value = $xml.find( "pkg_lv3_put_tp_cd").text();
	formObj.lv3_cbm.value = $xml.find( "lv3_cbm").text();
	formObj.lv3_cbf.value = $xml.find( "lv3_cbf").text();
	formObj.lv3_grs_kgs.value = $xml.find( "lv3_grs_kgs").text();
	formObj.lv3_grs_lbs.value = $xml.find( "lv3_grs_lbs").text();
	formObj.lv3_net_kgs.value = $xml.find( "lv3_net_kgs").text();
	formObj.lv3_net_lbs.value = $xml.find( "lv3_net_lbs").text();
	formObj.lv3_width.value = $xml.find( "lv3_width").text();
	formObj.lv3_length.value = $xml.find( "lv3_length").text();
	formObj.lv3_height.value = $xml.find( "lv3_height").text();
	formObj.pkg_lv4_unit_cd.value = $xml.find( "pkg_lv4_unit_cd").text();
	formObj.pkg_lv4_unit_nm.value = $xml.find( "pkg_lv4_unit_nm").text();
	formObj.pkg_lv4_qty.value = $xml.find( "pkg_lv4_qty").text() == 0 ? "" : $xml.find( "pkg_lv4_qty").text();
	formObj.pkg_lv4_put_tp_cd.value = $xml.find( "pkg_lv4_put_tp_cd").text();
	formObj.pkg_pl_std_qty.value = $xml.find( "pkg_pl_std_qty").text();
	formObj.pkg_pl_over_wgt.value = $xml.find( "pkg_pl_over_wgt").text();
	formObj.alter_item_cd.value = $xml.find( "alter_item_cd").text();
	formObj.adv_curr_cd.value = $xml.find( "adv_curr_cd").text();
	formObj.adv_price.value = $xml.find( "adv_price").text();
	formObj.abc_cd.value = $xml.find( "abc_cd").text();
	formObj.barcode_no.value = $xml.find( "barcode_no").text();
	formObj.nego_curr_cd.value = $xml.find( "nego_curr_cd").text();
	formObj.nego_price.value = $xml.find( "nego_price").text();
	formObj.ref_cd_01.value = $xml.find( "ref_cd_01").text();
	formObj.safe_stc_qty.value = $xml.find( "safe_stc_qty").text();
	formObj.unit_curr_cd.value = $xml.find( "unit_curr_cd").text();
	formObj.unit_price.value = $xml.find( "unit_price").text();
	formObj.ref_cd_02.value = $xml.find( "ref_cd_02").text();
	formObj.item_remark.value = $xml.find( "item_remark").text();
	
	if($xml.find( "len_ut_cd").text() != "" && $xml.find( "len_ut_cd").text() != null){
		h_ut_tp_cd = $xml.find( "len_ut_cd").text();
		document.getElementById("sh_ut_tp_cd").innerHTML = h_ut_tp_cd;
		if(h_ut_tp_cd =="CM"){
			// 센치
			ut_std_chg = 0.01;
		}else if(h_ut_tp_cd=="INCH"){
			//Inch
			ut_std_chg  = 0.0254;
			wgt_std_chg = 2.54;
		}
	}
	if($xml.find( "item_use_flg").text() == "Y"){
		ComBtnEnable("btn_cancel");
	}else{
		ComBtnDisable("btn_cancel");
	}
}
//SUPPLIER LIST 조회후 수행
function sheet3_OnSearchEnd(){
	/*
if(docObjects[2].GetCellValue(1, "Grd01supp_cd") == ""){
		docObjects[2].RemoveAll();
	}
	*/
}
function btn_New(){
	imNew();
}
function imNew() {	
	var formObj=document.form;
	formObj.reset();
	formObj.form_mode.value = "NEW";
	formObj.in_item_cd.value="";
	formObj.in_ctrt_no.value="";
	formObj.in_ctrt_nm.value="";
	formObj.ctrt_nm.value="";
	formObj.item_sys_no.value="";
	formObj.old_item_cd.value="";
	formObj.pkg_lv1_put_tp_cd.value = "N";
	formObj.pkg_lv2_put_tp_cd.value = "N";
	formObj.pkg_lv3_put_tp_cd.value = "N";
	formObj.pkg_lv4_put_tp_cd.value = "N";
	formObj.ctrt_no.disabled = false;
	formObj.ctrt_no.className="L_input";
	formObj.item_cd.disabled = false;
	formObj.item_cd.className="L_input";
	formObj.pkg_lv1_unit_cd.disabled = false;
	formObj.pkg_lv1_unit_cd.className="L_input";
	formObj.item_pkgunit.disabled = false;
	formObj.item_pkgunit.className="L_input";
	formObj.item_pkgbaseqty.disabled = false;
	formObj.item_pkgbaseqty.className="L_input";
	formObj.pkg_lv3_unit_cd.disabled = false;
	formObj.pkg_lv3_unit_cd.className="L_input";
	formObj.pkg_lv3_qty.disabled = false;
	formObj.pkg_lv3_qty.className="L_input";
	formObj.pkg_lv4_unit_cd.disabled = false;
	formObj.pkg_lv4_unit_cd.className="L_input";
	formObj.pkg_lv4_qty.disabled = false;
	formObj.pkg_lv4_qty.className="L_input";
	docObjects[0].RemoveAll();
	docObjects[1].RemoveAll();
	docObjects[2].RemoveAll();
	docObjects[3].RemoveAll();
	docObjects[4].RemoveAll();
	ComBtnDisable("btn_cancel");
	h_ut_tp_cd = ofc_size_ut_cd;
	document.getElementById("sh_ut_tp_cd").innerHTML = h_ut_tp_cd;
}
function btn_Save() {
	var saveXml = "";
	if(validation()){
		var formObj=document.form;
		if(formObj.form_mode.value == "UPDATE"){
			if(ComShowCodeConfirm("COM0226")){
				formObj.f_cmd.value = MODIFY01;
				var sParam=FormQueryString(formObj);
				var paramsSheet2 = '&' + sheet2.GetSaveString();
				var paramsSheet3 = '&' + sheet3.GetSaveString();
				var paramsSheet4 = '&' + sheet4.GetSaveString();
				var paramsSheet5 = '&' + sheet5.GetSaveString();
				sParam = sParam + paramsSheet2 + paramsSheet3 + paramsSheet4 + paramsSheet5+"&len_ut_cd="+h_ut_tp_cd;
				doShowProcess(true);
 				saveXml=docObjects[0].GetSearchData("./ITEMMgmt_2GS.clt", sParam);
				docObjects[0].LoadSearchData(saveXml,{Sync:1} );
				doHideProcess(false);
			}else{
				return;
			}
		}else{
			if(formObj.form_mode.value == "NEW"){
				if(ComShowCodeConfirm("COM0036")){
					formObj.f_cmd.value = MODIFY01;
					var sParam=FormQueryString(formObj);
					var paramsSheet2 = '&' + sheet2.GetSaveString();
					var paramsSheet3 = '&' + sheet3.GetSaveString();
					var paramsSheet4 = '&' + sheet4.GetSaveString();
					var paramsSheet5 = '&' + sheet5.GetSaveString();
					sParam = sParam + paramsSheet2 + paramsSheet3 + paramsSheet4 + paramsSheet5+"&len_ut_cd="+h_ut_tp_cd;
					doShowProcess(true);
	 				saveXml=docObjects[0].GetSearchData("./ITEMMgmt_2GS.clt", sParam);
					docObjects[0].LoadSearchData(saveXml,{Sync:1} );
					formObj.item_sys_no.value = docObjects[0].GetCellValue(1, "Grd00item_sys_no");
					doHideProcess(false);
				}else{
					return;
				}
			}
		}
		//1. Save 후 조회
		if(saveXml.replace(/^\s+|\s+$/gm,'') != ''){
//			ComShowCodeMessage("COM0093", "");
			//Change message 'Successfully' to showCompleteProcess();
			showCompleteProcess();
			
			
			//저장성공시 재조회를 위해 조회조건을 셋팅한다.
			formObj.in_item_cd.value=formObj.item_cd.value;
			formObj.in_ctrt_no.value=formObj.ctrt_no.value;
			formObj.in_ctrt_nm.value=formObj.ctrt_nm.value;
			//중복체크를 위한 item_cd 셋팅
			formObj.old_item_cd.value=formObj.item_cd.value;
			btn_Search();
		}else{
			ComShowCodeMessage("COM12227", "");
		}
	}	
}
function btn_Cancel(){
	var formObj=document.form;
	formObj.form_mode.value = "CANCEL";
	if(ComShowCodeConfirm("COM0040")){
		formObj.f_cmd.value = MODIFY;
		var sXml = docObjects[1].GetSearchData('./ITEMMgmt_2GS.clt', FormQueryString(formObj));
		if(sXml.replace(/^\s+|\s+$/gm,'') != ''){
			var xmlDoc = $.parseXML(sXml);
			var $xml1 = $(xmlDoc);
			var res = $xml1.find("result").text();
			if(res == 'OK'){
//				ComShowCodeMessage("COM0093", "");
				//Change message 'Successfully' to showCompleteProcess();
				showCompleteProcess();
				
				//저장성공시 재조회를 위해 조회조건을 셋팅한다.
				formObj.in_item_cd.value=formObj.item_cd.value;
				formObj.in_ctrt_no.value=formObj.ctrt_no.value;
				formObj.in_ctrt_nm.value=formObj.ctrt_nm.value;
				imSearch();
			}
		}
	}
}
function row_add() {
	var sheetObj1=docObjects[1];		
	if(sheetObj1.GetCellValue(sheetObj1.LastRow(), "Grd01ctrt_no") == ""){
		sheetObj1.RemoveAll();
    }
	//var intRows=sheetObj1.Rows;
	var row_new = sheetObj1.DataInsert(-1);
	//LKH::2015-09-27 WMS3.O 긴급수정4
	sheetObj1.SetCellValue(row_new, "Grd01ctrt_no",form.ctrt_no.value);
	sheetObj1.SetCellValue(row_new, "Grd01item_sys_no",form.item_sys_no.value);
}
function row_add2() {
	var sheetObj2=docObjects[2];		
	if(sheetObj2.GetCellValue(sheetObj2.LastRow(), "Grd02ctrt_no") == ""){
		sheetObj2.RemoveAll();
    }
	//var intRows=sheetObj2.Rows;
	var row_new1 =  sheetObj2.DataInsert(-1);
	//LKH::2015-09-27 WMS3.O 긴급수정4
	sheetObj2.SetCellValue(row_new1, "Grd02ctrt_no",form.ctrt_no.value);
	sheetObj2.SetCellValue(row_new1, "Grd02item_sys_no",form.item_sys_no.value);
}
function row_del(){
	var sheetObj=docObjects[1];
	if(sheetObj.RowCount()> 0){
		ComRowHideDelete(sheetObj, "Grd01del_chk");
	}
	sheetObj.CheckAll("Grd01del_chk",0);
}
function row_del2(){
	var sheetObj=docObjects[2];
	if(sheetObj.RowCount()> 0){
		ComRowHideDelete(sheetObj, "Grd02del_chk");
	}
	sheetObj.CheckAll("Grd02del_chk",0);
}
function btn_ctrt(){
	var formObj=document.form;
	var params = "ContractRoutePopup.clt?ctrt_no="+formObj.in_ctrt_no.value + "&ctrt_nm=" + formObj.in_ctrt_nm.value; 
	callBackFunc = "setCtrtNoInfo";
    modal_center_open(params, callBackFunc, 900, 580,"yes");
}
function setCtrtNoInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.in_ctrt_no.value=rtnValAry[0];//full_nm
		formObj.in_ctrt_nm.value=rtnValAry[1];//full_nm
	}
}
function btn_ctrt2(){
	var formObj=document.form;
	var params = "ContractRoutePopup.clt?ctrt_no="+formObj.ctrt_no.value + "&ctrt_nm=" + formObj.ctrt_nm.value;
    callBackFunc = "setCtrtNoInfo2";
    modal_center_open(params, callBackFunc, 900, 580,"yes");
}
function setCtrtNoInfo2(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.ctrt_no.value=rtnValAry[0];//full_nm
		formObj.ctrt_nm.value=rtnValAry[1];//full_nm
	}
	getOptField();
}
function btn_hts(){
	var formObj=document.form;
    
	rtnary=new Array(3);
	rtnary[0]="1";
	rtnary[1]=formObj.hts_no.value;
	rtnary[2]=formObj.hts_nm.value;
	callBackFunc = "setCommofityInfo";
	modal_center_open('./CMM_POP_0110.clt', rtnary, 556,500,"yes");
}
function setCommofityInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.hts_no.value=rtnValAry[0];//full_nm
		formObj.hts_nm.value=rtnValAry[2];//full_nm
	}
}
function btn_adv_curr(){
	var formObj=document.form;
	var params= "CommonCodePopup.clt?grp_cd=C010";
	callBackFunc = "setAdvCurrInfo";
    modal_center_open(params, callBackFunc, 400, 520,"yes");
}
function setAdvCurrInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.adv_curr_cd.value=rtnValAry[1];
	}
}
function btn_unit_curr(){
	var formObj=document.form;
	var params= "CommonCodePopup.clt?grp_cd=C010";
    callBackFunc = "setUnitCurrInfo";
    modal_center_open(params, callBackFunc, 400, 520,"yes");
}
function setUnitCurrInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.unit_curr_cd.value=rtnValAry[1];
	}
}
function btn_nego_curr(){
	var formObj=document.form;
	var params= "CommonCodePopup.clt?grp_cd=C010";
    callBackFunc = "setNegoCurrInfo";
    modal_center_open(params, callBackFunc, 400, 520,"yes");
}
function setNegoCurrInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.nego_curr_cd.value=rtnValAry[1];
	}
}
function btn_pkgunit1(){
	var formObj=document.form;
	var params= "CommonCodePopup.clt?grp_cd=A6";
    callBackFunc = "setPkgUnitInfo1";
    modal_center_open(params, callBackFunc, 400, 520,"yes");
}
function setPkgUnitInfo1(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.pkg_lv1_unit_cd.value=rtnValAry[1];
		formObj.pkg_lv1_unit_nm.value=rtnValAry[2];
	}
}
function btn_pkgunit(){
	var formObj=document.form;
	var params= "CommonCodePopup.clt?grp_cd=A6";
    callBackFunc = "setPkgUnitInfo";
    modal_center_open(params, callBackFunc, 400, 520,"yes");
}
function setPkgUnitInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.item_pkgunit.value=rtnValAry[1];
		formObj.item_pkgunit_nm.value=rtnValAry[2];
	}
}
function btn_pkgunit3(){
	var formObj=document.form;
	var params= "CommonCodePopup.clt?grp_cd=A6";
    callBackFunc = "setPkgUnitInfo3";
    modal_center_open(params, callBackFunc, 400, 520,"yes");
}
function setPkgUnitInfo3(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.pkg_lv3_unit_cd.value=rtnValAry[1];
		formObj.pkg_lv3_unit_nm.value=rtnValAry[2];
	}
}
function btn_pkgunit4(){
	var formObj=document.form;
	var params= "CommonCodePopup.clt?grp_cd=A6";
    callBackFunc = "setPkgUnitInfo4";
    modal_center_open(params, callBackFunc, 400, 520,"yes");
}
function setPkgUnitInfo4(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.pkg_lv4_unit_cd.value=rtnValAry[1];
		formObj.pkg_lv4_unit_nm.value=rtnValAry[2];
	}
}
function btn_grp_cd(){
	var formObj=document.form;
	if(formObj.ctrt_no.value == ""){
		ComShowCodeMessage("COM0082", "Contract No");
		formObj.ctrt_no.focus();
		return;
	}
	var params = "ItemGroupPopup.clt?ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value+"&grp_cd="+formObj.item_grp_cd.value;
    callBackFunc = "setItemGroupCode";
    modal_center_open(params, callBackFunc, 700, 470,"yes");
}
function setItemGroupCode(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.item_grp_cd.value=rtnValAry[0];//full_nm
	}
}
function getItemGroup(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.item_grp_cd.value="";
	}else{
		searchItemGroup(formObj, ComGetObjValue(formObj.item_grp_cd), "item_grp_cd");
	}
}
function searchItemGroup(form, item_grp_cd, col_nm){
	var formObj=document.form;
	if(formObj.ctrt_no.value == ""){
		ComShowCodeMessage("COM0082", "Contract No");
		formObj.item_grp_cd.value="";
		formObj.ctrt_no.focus();
		return;
	}
	ajaxSendPost(resultItemGroup, 'reqVal','&goWhere=aj&bcKey=searchItemGroup&in_ctrt_no='+formObj.ctrt_no.value+'&in_grp_cd='+item_grp_cd, './GateServlet.gsl');
}
function resultItemGroup(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.item_grp_cd.value=rtnArr[0];
			}
			else{
				formObj.item_grp_cd.value="";
			}
		}
		else{
			formObj.item_grp_cd.value="";
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function validation(){
	var formObj=document.form;
	var sheetObj1=docObjects[1];
	var sheetObj2=docObjects[2];
	if(isNull(formObj.ctrt_no)){
		//Contract No 체크
		ComShowCodeMessage("COM0082", "Contract No");
		formObj.ctrt_no.focus();
		return false;
	}
	if(ComTrim(formObj.item_cd, " ") == ""){
		//Customer Item ID 체크
		ComShowCodeMessage("COM0082", "Customer Item ID");
		formObj.item_cd.focus();
		return false;
	}
	if(ComTrim(formObj.item_nm, " ") == ""){
		//Customer Item ID 체크
		ComShowCodeMessage("COM0082", "Customer Item Name");
		formObj.item_nm.focus();
		return false;
	}
	if(ComTrim(formObj.pkg_lv1_unit_cd, " ") == ""){
		//LEVEL 1 체크
		ComShowCodeMessage("COM0082", "Level 1 Package Unit");
		formObj.pkg_lv1_unit_cd.focus();
		return false;
	}
	//Unit 이 존재할때 Qty는 필수항목이다.
	if(formObj.item_pkgunit.value != ""){
		if(formObj.item_pkgbaseqty.value == "" || formObj.item_pkgbaseqty.value == 0){
			ComShowCodeMessage("COM0082", "Level 2 Package Qty");
			formObj.item_pkgbaseqty.focus();
			return false;
		}
	}
	if(formObj.pkg_lv3_unit_cd.value != ""){
		if(formObj.pkg_lv3_qty.value == "" || formObj.pkg_lv3_qty.value == 0){
			ComShowCodeMessage("COM0082", "Level 3 Package Qty");
			formObj.pkg_lv3_qty.focus();
			return false;
		}
	}
	if(formObj.pkg_lv4_unit_cd.value != ""){
		if(formObj.pkg_lv4_qty.value == "" || formObj.pkg_lv4_qty.value == 0){
			ComShowCodeMessage("COM0082", "Level 4 Package Qty");
			formObj.pkg_lv4_qty.focus();
			return false;
		}
	}
	//Qty 가 존재할때 Unit 는 필수 항목.
	if(formObj.item_pkgbaseqty.value != "" && formObj.item_pkgbaseqty.value != 0){
		if(formObj.item_pkgunit.value == ""){
			ComShowCodeMessage("COM0082", "Level 2 Package Unit");
			formObj.item_pkgunit.focus();
			return false;
		}
	}
	if(formObj.pkg_lv3_qty.value != "" && formObj.pkg_lv3_qty.value != 0){
		if(formObj.pkg_lv3_unit_cd.value == ""){
			ComShowCodeMessage("COM0082", "Level 3 Package Unit");
			formObj.pkg_lv3_unit_cd.focus();
			return false;
		}
	}
	if(formObj.pkg_lv4_qty.value != "" && formObj.pkg_lv4_qty.value != 0){
		if(formObj.pkg_lv4_unit_cd.value == ""){
			ComShowCodeMessage("COM0082", "Level 4 Package Unit");
			formObj.pkg_lv4_unit_cd.focus();
			return false;
		}
	}
	if(formObj.item_remark.value.length > 100){
		ComShowCodeMessage("COM0215", "Remark[100]");
		ComSetFocus(formObj.item_remark);
		return ;
	}
	for(var i=2; i<=sheetObj1.LastRow();i++){
		if(sheetObj1.GetCellValue(i, "Grd01ctrt_no") != "" && sheetObj1.GetCellValue(i, "Grd01ctrt_no") != undefined){		
			if(sheetObj1.GetCellValue(i, "Grd01ibflag") != "D"){
				if(sheetObj1.GetCellValue(i, "Grd01wh_cd") == "" ){
					ComShowCodeMessage("COM0081", "[ Warehouse Info ] Warehouse Code");
					sheetObj1.SelectCell(i, "Grd01wh_cd");
					return;
				}
			}
		}
		//Warehouse Dup 체크
		for(var j=2; j<=sheetObj1.LastRow();j++){
			if(i != j){
				if(sheetObj1.GetCellValue(i, "Grd01wh_cd") == sheetObj1.GetCellValue(j, "Grd01wh_cd")){
					ComShowCodeMessage("COM131302", "Row No : "+(j-1)+" [ Warehouse Info ]");
					sheetObj1.SelectCell(j, "Grd01wh_cd");
					return;
				}
			}
		}
	}
	for(var i=2; i<=sheetObj2.LastRow();i++){
		//Supplier Dup 체크
		for(var j=2; j<=sheetObj2.LastRow();j++){
			if(i != j){
				if(sheetObj2.GetCellValue(i, "Grd02supp_cd") == sheetObj2.GetCellValue(j, "Grd02supp_cd")){
					ComShowCodeMessage("COM131302", "Row No : "+(j-1)+" [ Supplier Info. ]");
					sheetObj2.SelectCell(j, "Grd02supp_cd");
					return;
				}
			}
		}
	}
	return true;
}
function rcv_len_chk(){
	var formObj=document.form;
	if(formObj.rcv_loc_addr1.value.length > 250){
		ComShowCodeMessage("COM0215", "250");
		formObj.rcv_loc_addr1.value=formObj.rcv_loc_addr1.value.substring(0,250);
	}
}
function rmk_len_chk(){
	var formObj=document.form;
	if(formObj.remark.value.length > 1000){
		ComShowCodeMessage("COM0215", "1000");
		formObj.remark.value=formObj.remark.value.substring(0,1000);
	}
}
function goTabSelect(isNumSep) {
	 var tabObjs = document.getElementsByName('tabLayer');
	    if( isNumSep == "01" ) {
	        tabObjs[0].style.display = 'inline';
	        tabObjs[1].style.display = 'none';

	    //Container List 목록
	    }else if( isNumSep == "02" ) {
	        tabObjs[0].style.display = 'none';
	        tabObjs[1].style.display = "inline";
	    }
	    
	    var index = parseInt(isNumSep);
	 var count = 0;
	 $('.opus_design_tab').find("li").each(function(){
	  if(count++ == index - 1){
	   $(this).addClass('nowTab');
	  }else{
	   $(this).removeClass('nowTab');
	  }
	 });
    resizeSheet();
}
//Contract No 입력시 걸려있는 optional Field를 가져온다.
function getOptField(){
	var formObj=document.form;
	formObj.f_cmd.value = SEARCH;
	docObjects[4].DoSearch('./ITEMMgmtGS.clt', FormQueryString(formObj));
}
function getCtrtInfo(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.in_ctrt_no.value="";
		form.in_ctrt_nm.value="";
	}else{
		searchCtrtInfo(formObj, ComGetObjValue(formObj.in_ctrt_no), "in_ctrt_no");
	}
}
function searchCtrtInfo (form, in_ctrt_no, col_nm){
	var ord_tp_lvl1_cd="\'T\'";
	var ord_tp_lvl2_cd="\'S\',\'SA\'";
	
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+in_ctrt_no, './GateServlet.gsl');
}
function resultCtrtInfo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.in_ctrt_nm.value=rtnArr[0];
			}
			else{
				formObj.in_ctrt_no.value="";
				formObj.in_ctrt_nm.value="";	
			}
		}
		else{
			formObj.in_ctrt_no.value="";
			formObj.in_ctrt_nm.value="";	
		}
	}
}
function getCtrtInfo2(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.ctrt_no.value="";
		form.ctrt_nm.value="";
	}else{
		searchCtrtInfo2(formObj, ComGetObjValue(formObj.ctrt_no), "ctrt_no");
	}
}
function searchCtrtInfo2 (form, ctrt_no, col_nm){
	var ord_tp_lvl1_cd="\'T\'";
	var ord_tp_lvl2_cd="\'S\',\'SA\'";
	
	ajaxSendPost(resultCtrtInfo2, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+ctrt_no, './GateServlet.gsl');
}
function resultCtrtInfo2(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.ctrt_nm.value=rtnArr[0];
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
}
function getHtsInfo(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.hts_no.value="";
		form.hts_nm.value="";
	}else{
		searchHtsInfo(formObj, ComGetObjValue(formObj.hts_no), "hts_no");
	}
}
function searchHtsInfo (form, hts_no, col_nm){
	ajaxSendPost(resultHTSInfo,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=commodity&s_code='+hts_no, './GateServlet.gsl');
}
function resultHTSInfo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(rtnArr[0] != ""){
				formObj.hts_no.value=masterVals[0];	
				formObj.hts_nm.value=masterVals[3];	
			}
			else{
				formObj.hts_no.value="";
				formObj.hts_nm.value="";
			}
		}
		else{
			formObj.hts_no.value="";
			formObj.hts_nm.value="";
		}
	}
}
function getPkgUnit(obj){
	var formObj=document.form;
	if(obj.value == ""){
		if(obj.name == "pkg_lv1_unit_cd"){
			form.pkg_lv1_unit_cd.value="";
			form.pkg_lv1_unit_nm.value="";
		}else if(obj.name == "item_pkgunit"){
			form.item_pkgunit.value="";
			form.item_pkgunit_nm.value="";
		}else if(obj.name == "pkg_lv3_unit_cd"){
			form.pkg_lv3_unit_cd.value="";
			form.pkg_lv3_unit_nm.value="";
		}else if(obj.name == "pkg_lv4_unit_cd"){
			form.pkg_lv4_unit_cd.value="";
			form.pkg_lv4_unit_nm.value="";
		}
	}else{
		searchPkgUnit(formObj, obj.value, obj.name);
	}
}
function searchPkgUnit (form, item_pkgunit, col_nm){
	ajaxSendPost(resultPkgUnitInfo, col_nm,'&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+item_pkgunit, './GateServlet.gsl');
}
function resultPkgUnitInfo(reqVal, col_nm){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				if(col_nm == "pkg_lv1_unit_cd"){
					formObj.pkg_lv1_unit_nm.value=rtnArr[1];
				}else if(col_nm == "item_pkgunit"){
					formObj.item_pkgunit_nm.value=rtnArr[1];
				}else if(col_nm == "pkg_lv3_unit_cd"){
					formObj.pkg_lv3_unit_nm.value=rtnArr[1];
				}else if(col_nm == "pkg_lv4_unit_cd"){
					formObj.pkg_lv4_unit_nm.value=rtnArr[1];
				}
			}
			else{
				if(col_nm == "pkg_lv1_unit_cd"){
					form.pkg_lv1_unit_cd.value="";
					form.pkg_lv1_unit_nm.value="";
				}else if(col_nm == "item_pkgunit"){
					form.item_pkgunit.value="";
					form.item_pkgunit_nm.value="";
				}else if(col_nm == "pkg_lv3_unit_cd"){
					form.pkg_lv3_unit_cd.value="";
					form.pkg_lv3_unit_nm.value="";
				}else if(col_nm == "pkg_lv4_unit_cd"){
					form.pkg_lv4_unit_cd.value="";
					form.pkg_lv4_unit_nm.value="";
				}
			}
		}
		else{
			if(col_nm == "pkg_lv1_unit_cd"){
				form.pkg_lv1_unit_cd.value="";
				form.pkg_lv1_unit_nm.value="";
			}else if(col_nm == "item_pkgunit"){
				form.item_pkgunit.value="";
				form.item_pkgunit_nm.value="";
			}else if(col_nm == "pkg_lv3_unit_cd"){
				form.pkg_lv3_unit_cd.value="";
				form.pkg_lv3_unit_nm.value="";
			}else if(col_nm == "pkg_lv4_unit_cd"){
				form.pkg_lv4_unit_cd.value="";
				form.pkg_lv4_unit_nm.value="";
			}
		}
	}
}
function getCurrInfo(obj){
	var formObj=document.form;
	if(obj.value == ""){
		if(obj.name == "adv_curr_cd"){
			form.adv_curr_cd.value="";
		}else if(obj.name == "nego_curr_cd"){
			form.nego_curr_cd.value="";
		}else if(obj.name == "unit_curr_cd"){
			form.unit_curr_cd.value="";
		}
	}else{
		searchCurrInfo(formObj, obj.value, obj.name);
	}
}
function searchCurrInfo (form, curr, col_nm){
	ajaxSendPost(resultCurrInfo, col_nm,'&goWhere=aj&bcKey=searchCommonCodeInfo&grp_cd=C010&code_cd='+curr, './GateServlet.gsl');
}
function resultCurrInfo(reqVal, col_nm){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				if(col_nm == "adv_curr_cd"){
					formObj.adv_curr_cd.value=rtnArr[0];
				}else if(col_nm == "nego_curr_cd"){
					formObj.nego_curr_cd.value=rtnArr[0];
				}else if(col_nm == "unit_curr_cd"){
					formObj.unit_curr_cd.value=rtnArr[0];
				}
			}
			else{
				if(col_nm == "adv_curr_cd"){
					form.adv_curr_cd.value="";
				}else if(col_nm == "nego_curr_cd"){
					form.nego_curr_cd.value="";
				}else if(col_nm == "unit_curr_cd"){
					form.unit_curr_cd.value="";
				}
				return;
			}
		}
		else{
			if(col_nm == "adv_curr_cd"){
				form.adv_curr_cd.value="";
			}else if(col_nm == "nego_curr_cd"){
				form.nego_curr_cd.value="";
			}else if(col_nm == "unit_curr_cd"){
				form.unit_curr_cd.value="";
			}
			return;
		}
	}
}
//Customer Item ID 중복체크를 한다.
function checkCustItem(obj, searchCnt){
	var formObj=document.form;
	if(obj.value == ""){
	}else{
		//중복체크시 기존 item_cd 와 변경시에만 중복체크를 한다.
		if(formObj.old_item_cd.value != formObj.item_cd.value){
			if(formObj.ctrt_no.value == ""){
				alert("Please enter Contract No.");
				formObj.item_cd.value="";
				formObj.item_nm.value="";
				formObj.ctrt_no.focus();
			}else{
				if(searchCnt == 0){
					searchCustItemDup(formObj, ComGetObjValue(formObj.item_cd), "item_cd");
				}
			}
		}
	}
}
function searchCustItemDup (form, item_cd, col_nm){
	var formObj=document.form;
 	var sXml=docObjects[0].GetSearchData("./ITEMMgmt_2GS.clt", "f_cmd="+SEARCH02+"&ctrt_no="+formObj.ctrt_no.value+"&item_cd="+item_cd);
	if( col_nm == "item_cd"){ 
		var xmlDoc = $.parseXML(sXml);
		var $xml = $(xmlDoc);
		if($xml.find( "result").text() == 'OK'){
		}else{
			ComShowMessage("[" + item_cd.toUpperCase() + "] is duplicated.");
			formObj.item_cd.value=formObj.old_item_cd.value;
			formObj.item_cd.focus();
			if(formObj.item_cd.value == ""){
				formObj.ctrt_no.focus();
				formObj.item_cd.focus();
			}else{
				formObj.item_cd.select();
			}
			searchCnt += 1;
			return false;
		}
	}
}
function searchCtrtPop(obj){
	var formObj=document.form;
	if(obj.value.length >= 3){
		var formObj=document.form;
		var params = "ContractRoutePopup.clt?ctrt_no="+formObj.in_ctrt_no.value+"&ctrt_nm="+formObj.in_ctrt_nm.value;
	    callBackFunc = "setCtrtNoInfo";
	    modal_center_open(params, callBackFunc, 900, 580,"yes");
	}
}
function obj_keydown(){ 
    var backspace=8; 
    var t=document.activeElement;  
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
}
function btn_link_ctrt(){
	var formObj=document.form;
	if(!ComIsEmpty(formObj.ctrt_no)){
		var sUrl="./CtrtMgmt.clt?ctrt_no="+formObj.ctrt_no.value;
		parent.mkNewFrame('Contract Management', sUrl, "CtrtMgmt_" + formObj.ctrt_no.value);
		
	}
}
function btn_File_Path(){
	var formObj=document.form;
	ComSetObjValue(formObj.file_path, "");
    var files = upload1.GetList();
    for( var i = 0; i < files.length; i++) {
        upload1.RemoveOneFile(files[i].GetSerialNo());
    }
    upload1.AddFile();
}
function btn_File_Upload(){
	var formObj=document.form;
	//File Path 체크
	if(formObj.logo_rectangle.value == ""){
		ComShowCodeMessage("COM0119");
		return ;
	}
	if(ComIsEmpty(formObj.in_item_cd.value)){
		ComShowCodeMessage("COM0221");
		formObj.in_item_cd.focus();
		return;
	}	
	if(ComIsEmpty(formObj.in_ctrt_no.value)){
		ComShowCodeMessage("COM0222");
		formObj.in_ctrt_no.focus();
		return;
	}
	formObj.f_cmd.value=ADD;
	getParam();
	submitForm();
}

function ClearHTML() {
    var ibupForm = document.getElementById('ibup_form');
    ibupForm.action = ibupForm.action.replace('&FileUploadModule=ITM', '');
}

function getParam() {
    var formObj = document.form;
    var sParam  = "ctrt_no="+formObj.ctrt_no.value;
     	 sParam += "&item_sys_no="+formObj.item_sys_no.value;
    return sParam;
}

function btn_File_Delete(){
	var formObj=document.form;
	var sheetObj=docObjects[3];
	var selRow=sheetObj.GetSelectRow();
	var chkCnt=0;
	if(sheetObj.RowCount() <= 0){
		ComShowCodeMessage("COM12113", "delete row");
		return;
	}else{
		var findcheck = sheetObj.FindCheckedRow("Grd03del_chk",1);
		if (findcheck == "" || findcheck == null || findcheck == -1){
			ComShowCodeMessage("COM12113", "delete row");
			return;
		}
	}
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "Grd03del_chk") == "1"){
			chkCnt += 1;
		}
	}
	if(chkCnt == 0){
		ComShowCodeMessage("COM0250");
		return;
	}
	if(ComShowCodeConfirm("COM0053")){
		var sParam=sheetObj.GetSaveString();
		if( sParam == ""){ return;}
 		var sXml = sheetObj.GetSearchData('./ITEMMgmt_1GS.clt', sParam+"&f_cmd=" + MODIFY02 + "&ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_sys_no="+ComGetObjValue(formObj.item_sys_no));
 		
 		var strtIndxSheet4 = sXml.indexOf("<SHEET4>");
		var endIndxSheet4 = sXml.indexOf("</SHEET4>") + "</SHEET4>".length;
		
		var sheet4Data = sXml.substring(strtIndxSheet4,endIndxSheet4);
		sheetObj.LoadSearchData(sheet4Data.replaceAll('SHEET4', 'SHEET'));
		
		ComShowCodeMessage("COM12201");
	}
}
function submitForm(){
	
	
	var formObj=document.form;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	var formData;
	if(navigator.appName.indexOf("Microsoft") != -1) {
		if(formObj.f_cmd.value==SEARCH){
			formObj.action = "./ITMgmt.clt?item_cd="+formObj.in_item_cd.value+"&uploadfile=T&ctrt_no="+formObj.in_ctrt_no.value+"&ctrt_nm="+formObj.in_ctrt_nm.value;
			formObj.submit();
			return;
		}else{
			formObj.action = "./ITMgmt.clt?item_cd="+formObj.in_item_cd.value+"&uploadfile=T&ctrt_no="+formObj.in_ctrt_no.value+"&ctrt_nm="+formObj.in_ctrt_nm.value;
			formObj.submit();
			return;
		}
	} else {
		formData = new FormData();
		$.each($("form").find("input[type='file']"), function(i, tag) {
	        $.each($(tag)[0].files, function(i, file) {
	            formData.append(tag.name, file);
	        });
	    });
	    var params = $("form").serializeArray();
	    $.each(params, function (i, val) {
	        formData.append(val.name, val.value);
	    });
	}
    
	$.ajax({
		   type: "POST",
		   url: "./ITEMMgmtAJ.clt",
		   dataType: 'xml',
		   data: formData,
		   contentType: false,
		   async: false,
	       processData: false,
		   success: function(data){
			   //MDM_MCM_0050 (S)
			   /*setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());

			   getParam();
			   setupPage();
			   
			   doHideProcess();
			   
			   formObj.logo_square_flg.value = "N";
			   formObj.logo_square_flg.checked = false;
			   
			   if (formObj.logo_square_yn.value != "") {
				   getObj('logo_square_id').style.display="inline";
				   formObj.logo_square_flg.style.display="inline";
				   formObj.logo_square_chk.style.display="inline";
				   
				   $("#logo_square_filenm").html($('logo_square_filenm',data).text());
				   formObj.logo_square.value = "";
			   } else {
				   getObj('logo_square_id').style.display="none";
				   formObj.logo_square_flg.style.display="none";
				   formObj.logo_square_chk.style.display="none";
			   }
			   
			   formObj.logo_rec_flg.value = "N";*/
			   formObj.logo_rectangle.value = "";
			   formObj.logo_rec_flg.checked = false;
			   imSearch();
		   },
		   error: function(){
			   doHideProcess();
		   }
		 });
}
function setStandardQty(){
    var formObj=document.form;
    if(ComIsEmpty(formObj.pkg_pl_std_qty) || Number(formObj.pkg_pl_std_qty.value) == 0){
        formObj.pkg_pl_std_qty.value=formObj.pkg_lv4_qty.value;
    }
}
function loadDataCombo(){
	var obj = "";
	var option =  "";
	
	var code = "";
	var name = "";
	
	//pkg_lv1_put_tp_cd
	
	obj = document.getElementById("pkg_lv1_put_tp_cd");
	option =  document.createElement("option");
	
	code = pkg_lv1_put_tp_cdCode.split('|');
	name = pkg_lv1_put_tp_cdText.split('|');
	
	for(var i = 0; i < code.length; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(name[i]);
		option.value = htmlDecode(code[i]);
		
		obj.add(option);
	}
	obj.value = "N";
	obj.disabled = false;
	//pkg_lv2_put_tp_cd
	
	obj = document.getElementById("pkg_lv2_put_tp_cd");
	option =  document.createElement("option");
	
	code = pkg_lv2_put_tp_cdCode.split('|');
	name = pkg_lv2_put_tp_cdText.split('|');
	
	for(var i = 0; i < code.length; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(name[i]);
		option.value = htmlDecode(code[i]);
		
		obj.add(option);
	}
	obj.value = "N";
	obj.disabled = false;
	//pkg_lv3_put_tp_cd
	
	obj = document.getElementById("pkg_lv3_put_tp_cd");
	option =  document.createElement("option");
	
	code = pkg_lv3_put_tp_cdCode.split('|');
	name = pkg_lv3_put_tp_cdText.split('|');
	
	for(var i = 0; i < code.length; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(name[i]);
		option.value = htmlDecode(code[i]);
		
		obj.add(option);
	}
	obj.value = "N";
	obj.disabled = false;
	//pkg_lv4_put_tp_cd
	
	obj = document.getElementById("pkg_lv4_put_tp_cd");
	option =  document.createElement("option");
	
	code = pkg_lv4_put_tp_cdCode.split('|');
	name = pkg_lv4_put_tp_cdText.split('|');
	
	for(var i = 0; i < code.length; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(name[i]);
		option.value = htmlDecode(code[i]);
		
		obj.add(option);
	}
	obj.value = "N";
	obj.disabled = false;
}
function ComRowHideDelete(sheetObj, col, isMsg) {
	if (isMsg == undefined || isMsg == null)
		isMsg = true;
	var org_col = col;
	// 컬럼Index가 아닌 경우 SaveName인 경우 -> 컬럼Index를 가져온다.
	col = ComIsNumber(col) ? ComParseInt(col) : sheetObj.SaveNameCol(col);

	// 컬럼 인자의 유효성 확인하기
	if (col < 0 || col > sheetObj.LastCol()) {
		ComShowMessage("[ComRowHideDelete] '" + sheetObj.id + "'의 '" + org_col
				+ "' 컬럼은 존재하지 않습니다.");
		return -1;
	}

	// 체크박스에 체크된 행 전체를 문자열로 가져온다. 결과 : "1|3|5"
	var sRow = sheetObj.FindCheckedRow(col);
	if (sRow == "") {
		if (isMsg)ComShowCodeMessage("COM12189");
		return 0;
	}

	// 가져온 행을 배열로 만들기
	var arrRow = sRow.split("|"); // 결과 : "1|3|5|"

	sheetObj.SetRedrawSum(0); // 합계 계산하지 않기, dtAutoSumEx가 있는 경우를 대비

	// 기준컬럼의 DataType이 dtDelCheck이면 그냥 숨기기만하고, dtDelCheck가 아닌 경우만 숨기고, 트랜잭션 바꾼다.
	if (sheetObj.GetCellProperty(0, col, "Type") == "DelCheck") {
		// 역순으로 삭제 처리하기(중간에 입력상태의 행이 있을수도 있으므로 반드시 역순으로 처리한다.)
		for ( var idx = arrRow.length-1; idx >= 0; idx--) {
			var row = arrRow[idx];
			sheetObj.SetRowHidden(row, 1); // 2.행 숨기기
		}
	} else {
		// 역순으로 삭제 처리하기(중간에 입력상태의 행이 있을수도 있으므로 반드시 역순으로 처리한다.)
		for ( var idx = arrRow.length - 1; idx >= 0; idx--) {
			var row = arrRow[idx];
			sheetObj.SetCellValue(row, col, 0, 0); // 1.체크박스 없애기 (체크된데이터만 다른 처리
													// 하는 경우도 있으므로)
			sheetObj.SetRowHidden(row, 1); // 2.행 숨기기
			if( sheetObj.GetRowStatus(row) == "I"){
				sheetObj.RowDelete(row , 0);
			} else {
				sheetObj.SetRowStatus(row, "D"); // 3.트랜잭션 상태 "삭제"로 만들기
			}
		}
	}

	sheetObj.SetRedrawSum(1); // 합계 계산하기

	return arrRow.length;
}
function checkNumFormat(obj, format) {

    var srcNumber = obj.value.replace(/\-/g,"");
    var srcNumber = obj.value.replace(/\,/g,"");

    if(srcNumber == '') return;

    if(isNaN(srcNumber)) {
        alert("Check invalid data! ");
        obj.value = "0";
        obj.focus();
        return;
    }
    dotInx     = format.indexOf('.');
    len        = format.length;

    if (dotInx > 0) decimalLen = len - (dotInx + 1);
    else decimalLen = -1;
    numLen     = len - (decimalLen + 1);
    temp        = srcNumber
    len1        = temp.length;
    dotInx1     = temp.indexOf('.');
    
    //소수점이 유무에 의한 길이 설정
    if(dotInx1 == -1) {
        decimalLen1 = -1;
        numLen1     = len1;
    } else {
        decimalLen1 = len1 - (dotInx1 + 1);
        numLen1     = len1 - (decimalLen1 + 1);
    }
    
    var floatMax = len - (dotInx + 1);
    var decimalMax = len - (floatMax + 1);
     
    if(numLen1 > numLen){
        alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
        obj.value = "0";
        obj.focus();
        return false;
    } else if (decimalLen1 > decimalLen){
        alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
        obj.value = "0";
        obj.focus();
        return false;
    }
    return true;
}

function checkNum(obj, format) {

    var srcNumber = obj.value.replace(/\-/g,"");
    var srcNumber = obj.value.replace(/\,/g,"");

    if(srcNumber == '') return;

    if(isNaN(srcNumber)) {
        alert("Check invalid data! ");
        obj.value = "";
        obj.focus();
        return;
    }
    var len = srcNumber.length;
    var floatMax = "0";
    var decimalMax = format.length;
     
    if(len > decimalMax)
    	{
    	 alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
         obj.value = "";
         obj.focus();
         return false;
    	}
       
    return true;
}

function btn_ctrt_cust_cd(){
	 var formObj=document.form;
	rtnary=new Array(3);
	rtnary[0]=sheet3.GetCellValue(sheet3.GetSelectRow(),"Grd02supp_cd");
	rtnary[1]=sheet3.GetCellValue(sheet3.GetSelectRow(),"Grd02supp_nm");
	rtnary[2]=window;
	callBackFunc = "CT_POPLIST";
	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
}

function CT_POPLIST(rtnVal){
	var formObj=document.form;
	   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   sheet3.SetCellText(sheet3.GetSelectRow(), "Grd02supp_cd",rtnValAry[0]);
		   sheet3.SetCellValue(sheet3.GetSelectRow(), "Grd02supp_nm",rtnValAry[2]);
	   }             
	}

function chkCommaObj(){
	var formObj=document.form;
	chkComma(formObj.lv1_cbm,10,5);
	chkComma(formObj.lv1_cbf,10,5);
	chkComma(formObj.lv1_grs_kgs,10,5);
	chkComma(formObj.lv1_grs_lbs,10,5);
	chkComma(formObj.lv1_net_kgs,10,5);
	chkComma(formObj.lv1_net_lbs,10,5);
	chkComma(formObj.item_cbm,10,5);
	chkComma(formObj.item_cbf,10,5);
	chkComma(formObj.item_kgs,10,5);
	chkComma(formObj.item_grs_lbs,10,5);
	chkComma(formObj.item_net_wgt,10,5);
	chkComma(formObj.item_net_lbs,10,5);
	chkComma(formObj.lv3_cbm,10,5);
	chkComma(formObj.lv3_cbf,10,5);
	chkComma(formObj.lv3_grs_kgs,10,5);
	chkComma(formObj.lv3_grs_lbs,10,5);
	chkComma(formObj.lv3_net_kgs,10,5);
	chkComma(formObj.lv3_net_lbs,10,5);
	chkComma(formObj.adv_price,10,2);
	chkComma(formObj.safe_stc_qty,15,0);
	chkComma(formObj.unit_price,10,2);
	chkComma(formObj.pkg_pl_over_wgt,2,1);
	convertNumber(formObj.pkg_lv4_qty);
	convertNumber(formObj.pkg_pl_std_qty);
	convertNumber(formObj.pkg_lv1_qty);
	convertNumber(formObj.item_pkgbaseqty);
	convertNumber(formObj.pkg_lv3_qty);
}

function convertNumber(obj){
	var intoVal=obj.value;
	intoVal = intoVal.replace(/,/g,'');
	var leng=intoVal.length;
	var result=new Array();
	var cut="";
	var i=0;
	if (leng > 3){
		while(leng>3){
			result[i] = intoVal.substring(leng-3,leng);
			leng = leng -3;
			i++;
		}
		result[i] = intoVal.substring(0,leng);
		for (var j=result.length - 1 ; j >= 0 ; j--){
			cut += result[j] + ",";
		}
		cut = cut.substring(0,cut.length-1);
		obj.value = cut;
	}else
		obj.value = intoVal;
}

function autoCalculator(Obj){
	if(Obj.value==""){
		Obj.value = "0.00000";
		return;
	}
    var value = parseFloat(Obj.value);
    var form = document.form;
    switch(Obj.name){
        //level 1
        case 'lv1_grs_kgs':
            form.lv1_grs_lbs.value = roundXL(value / 0.453597315, 5);
            chkComma(form.lv1_grs_lbs,10,5);
            break;
        case 'lv1_grs_lbs':
            form.lv1_grs_kgs.value = roundXL(value * 0.453597315, 5);
            chkComma(form.lv1_grs_kgs,10,5);
            break;
        case 'lv1_cbm':
            form.lv1_cbf.value = roundXL(value * 35.3147, 5);
            chkComma(form.lv1_cbf,10,5);
            break;
        case 'lv1_cbf':
            form.lv1_cbm.value = roundXL(value / 35.3147, 5);
            chkComma(form.lv1_cbm,10,5);
            break;
        case 'lv1_net_kgs':
            form.lv1_net_lbs.value = roundXL(value / 0.453597315, 5);
            chkComma(form.lv1_net_lbs,10,5);
            break;
        case 'lv1_net_lbs':
            form.lv1_net_kgs.value = roundXL(value * 0.453597315, 5);
            chkComma(form.lv1_net_kgs,10,5);
            break;
        case 'lv1_width':
        case 'lv1_length':
        case 'lv1_height':
            var length=form.lv1_length.value ? form.lv1_length.value : 0;
            var width=form.lv1_width.value ? form.lv1_width.value : 0;
            var height=form.lv1_height.value ? form.lv1_height.value : 0;
            var pcs = 1;//form.pkg_lv1_qty.value ? form.pkg_lv1_qty.value : 0;
            var cbm=0;
            var kg=0;
            var sumCbm=0;
            kg=roundXL(length * width * height * pcs *wgt_std_chg * wgt_std_chg * wgt_std_chg / 6000, 5);
            cbm=roundXL(length * width * height * pcs * ut_std_chg * ut_std_chg * ut_std_chg, 5);
            form.lv1_grs_kgs.value = kg;
            form.lv1_grs_lbs.value = roundXL(kg / 0.453597315, 5);
            form.lv1_net_kgs.value = kg;
            form.lv1_net_lbs.value = roundXL(kg / 0.453597315, 5);
            form.lv1_cbm.value = cbm;
            form.lv1_cbf.value = roundXL(cbm * 35.3165, 5);
            chkComma(form.lv1_grs_kgs,10,5);
            chkComma(form.lv1_grs_lbs,10,5);
            chkComma(form.lv1_net_kgs,10,5);
            chkComma(form.lv1_net_lbs,10,5);
            chkComma(form.lv1_cbm,10,5);
            chkComma(form.lv1_cbf,10,5);
            break;
        //level 2
        case 'item_cbm':
            form.item_cbf.value = roundXL(value * 35.3147, 5);
            chkComma(form.item_cbf,10,5);
            break;
        case 'item_cbf':
            form.item_cbm.value = roundXL(value / 35.3147, 5);
            chkComma(form.item_cbm,10,5);
            break;
        case 'item_kgs':
            form.item_grs_lbs.value = roundXL(value / 0.453597315, 5);
            chkComma(form.item_grs_lbs,10,5);
            break;
        case 'item_grs_lbs':
            form.item_kgs.value = roundXL(value * 0.453597315, 5);
            chkComma(form.item_kgs,10,5);
            break;
        case 'item_net_wgt':
            form.item_net_lbs.value = roundXL(value / 0.453597315, 5);
            chkComma(form.item_net_lbs,10,5);
            break;
        case 'item_net_lbs':
            form.item_net_wgt.value = roundXL(value * 0.453597315, 5);
            chkComma(form.item_net_wgt,10,5);
            break;
        case 'item_width':
        case 'item_height':
        case 'item_length':
            var length=form.item_length.value ? form.item_length.value : 0;
            var width=form.item_width.value ? form.item_width.value : 0;
            var height=form.item_height.value ? form.item_height.value : 0;
            var pcs= 1;//form.item_pkgbaseqty.value ? form.item_pkgbaseqty.value : 0;
            var cbm=0;
            var kg=0;
            var sumCbm=0;
           
            kg=roundXL(length * width * height * pcs * wgt_std_chg * wgt_std_chg * wgt_std_chg / 6000, 5);
            cbm=roundXL(length * width * height * pcs * ut_std_chg * ut_std_chg * ut_std_chg, 5);
            form.item_kgs.value = kg;
            form.item_grs_lbs.value = roundXL(kg / 0.453597315, 5);
            form.item_net_wgt.value = kg;
            form.item_net_lbs.value = roundXL(kg / 0.453597315, 5);
            form.item_cbm.value = cbm;
            form.item_cbf.value = roundXL(cbm * 35.3165, 5);
            
            chkComma(form.item_kgs,10,5);
            chkComma(form.item_grs_lbs,10,5);
            chkComma(form.item_net_wgt,10,5);
            chkComma(form.item_net_lbs,10,5);
            chkComma(form.item_cbm,10,5);
            chkComma(form.item_cbf,10,5);
            break;
        //level 3
        case 'lv3_cbm':
            form.lv3_cbf.value = roundXL(value * 35.3147, 5);
            chkComma(form.lv3_cbf,10,5);
            break;
        case 'lv3_cbf':
            form.lv3_cbm.value = roundXL(value / 35.3147, 5);
            chkComma(form.lv3_cbm,10,5);
            break;
        case 'lv3_grs_kgs':
            form.lv3_grs_lbs.value = roundXL(value / 0.453597315, 5);
            chkComma(form.lv3_grs_lbs,10,5);
            break;
        case 'lv3_grs_lbs':
            form.lv3_grs_kgs.value = roundXL(value * 0.453597315, 5);
            chkComma(form.lv3_grs_kgs,10,5);
            break;
        case 'lv3_net_kgs':
            form.lv3_net_lbs.value = roundXL(value / 0.453597315, 5);
            chkComma(form.lv3_net_lbs,10,5);
            break;
        case 'lv3_net_lbs':
            form.lv3_net_kgs.value = roundXL(value * 0.453597315, 5);
            chkComma(form.lv3_net_kgs,10,5);
            break;
        case 'lv3_width':
        case 'lv3_length':
        case 'lv3_height':
            var length=form.lv3_length.value ? form.lv3_length.value : 0;
            var width=form.lv3_width.value ? form.lv3_width.value : 0;
            var height=form.lv3_height.value ? form.lv3_height.value : 0;
            var pcs= 1; //form.pkg_lv3_qty.value ? form.pkg_lv3_qty.value : 0;
            var cbm=0;
            var kg=0;
            var sumCbm=0;
            
            kg=roundXL(length * width * height * pcs * wgt_std_chg * wgt_std_chg * wgt_std_chg / 6000, 5);
            cbm=roundXL(length * width * height * pcs * ut_std_chg * ut_std_chg * ut_std_chg, 5);
            form.lv3_grs_kgs.value = kg;
            form.lv3_grs_lbs.value = roundXL(kg / 0.453597315, 5);
            form.lv3_net_kgs.value = kg;
            form.lv3_net_lbs.value = roundXL(kg / 0.453597315, 5);
            form.lv3_cbm.value = cbm;
            form.lv3_cbf.value = roundXL(cbm * 35.3165, 5);
            chkComma(form.lv3_grs_kgs,10,5);
            chkComma(form.lv3_grs_lbs,10,5);
            chkComma(form.lv3_net_kgs,10,5);
            chkComma(form.lv3_net_lbs,10,5);
            chkComma(form.lv3_cbm,10,5);
            chkComma(form.lv3_cbf,10,5);
            break;
    }
}

/**
 * Template Download
 */
function excel_Download() {	
	var fileName="WH_ITEM_ENTRY_TEMPLETE.xls";
	document.frm1.file_name.value= fileName;
	document.frm1.submit();
}

/*
 * Excel Upload
 */
function excel_Upload() {	
	var formObj=document.form;
	var ctrt_no=formObj.ctrt_no.value;	
   	var sUrl="./WHItemExcelUploadPopup.clt?display=none&ctrt_no="+ctrt_no;
   	callBackFunc = "setInfoBasicItem_Insert";
	modal_center_open(sUrl, callBackFunc, 900,460,"yes");
}

/**
 * Excel Upload 리턴 데이터
 * @param aryPopupData
 */
function setInfoBasicItem_Insert(rtnVal) {
	var sheetObj=docObjects[2];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if (rtnValAry[0] != -1){
			formObj.ibflag.value 			 = rtnValAry[0]
			formObj.ctrt_no.value            = rtnValAry[1]
			formObj.item_cd.value            = rtnValAry[2]
			formObj.item_nm.value            = rtnValAry[3]
			formObj.hts_no.value             = rtnValAry[4]
			formObj.item_grp_cd.value        = rtnValAry[5]
			formObj.item_grp_cd.value        = rtnValAry[6]
			formObj.pkg_lv1_unit_cd.value    = rtnValAry[7]
			formObj.pkg_lv1_qty.value        = rtnValAry[8]
			formObj.item_pkgunit.value       = rtnValAry[9]
			formObj.item_pkgbaseqty.value    = rtnValAry[10]
			formObj.pkg_lv3_unit_cd.value    = rtnValAry[11]
			formObj.pkg_lv3_qty.value        = rtnValAry[12]
			formObj.pkg_lv4_unit_cd.value    = rtnValAry[13]
			formObj.pkg_lv4_qty.value        = rtnValAry[14]
			formObj.lv1_length.value         = rtnValAry[15]
			formObj.lv1_width.value          = rtnValAry[16]
			formObj.lv1_height.value         = rtnValAry[17]
			formObj.lv1_cbm.value            = rtnValAry[18]
			formObj.lv1_cbf.value            = rtnValAry[19]
			formObj.lv1_grs_kgs.value        = rtnValAry[20]
			formObj.lv1_grs_lbs.value        = rtnValAry[21]
			formObj.lv1_net_kgs.value        = rtnValAry[22]
			formObj.lv1_net_lbs.value        = rtnValAry[23]
			formObj.pkg_pl_std_qty.value     = rtnValAry[24]
			formObj.pkg_pl_over_wgt.value    = rtnValAry[25]
			formObj.alter_item_cd.value      = rtnValAry[26]
			formObj.barcode_no.value         = rtnValAry[27]
			formObj.safe_stc_qty.value       = rtnValAry[28]
			// excel upload data 유효성 체크			
			// EQ TYPE 조회
	}	
	}
}
