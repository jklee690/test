/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RateHistoryPopup.js
*@FileTitle  : Rate History
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/20
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");	
		switch(srcName) {
			case "CLOSE" :
				ComClosePopup();
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
function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	if (formObj.sb_cls_cd.value == "S") {
		document.all.selling.style.display="block";
		document.all.buyling.style.display="none";
	} else {
		document.all.selling.style.display="none";
		document.all.buyling.style.display="block";
	}
	btn_Search();
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:
		      with(sheetObj){
         
         //var hdr1="SEQ|Rate No|User|Update Date/Time|Freight Mode|his_seq|frt_mode";
         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         var headers = [ { Text:getLabel('RateHistoryPopup_Sheet1_HDR1'), Align:"Center"} ]; 			                      
         InitHeaders(headers, info);
         var cols = [ {Type:"Seq",       Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"seq" },
             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",    ColMerge:1,   SaveName:"rate_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"modi_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Date",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"modi_sys_dt",   KeyField:0,   CalcLogic:"",   Format:"MM-dd-yyyy HH:mm:ss",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"freight_mode",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"hst_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"frt_mode",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
          
         InitColumns(cols);
         SetSheetHeight(150);
         SetEditable(0);
         SetWaitImageVisible(0);
      	}
         break;


		case 2:      //IBSheet1 init
		    with(sheetObj){
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				    var headers = [ { Text:getLabel('RateHistoryPopup_Sheet2_HDR1'), Align:"Center"},
				                      { Text:getLabel('RateHistoryPopup_Sheet2_HDR2'), Align:"Center"} ];
			      InitHeaders(headers, info);

			      var cols = [ {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ctrt_no" },
			             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"sb_cls_cd" },
			             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"hst_tp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",    ColMerge:1,   SaveName:"rate_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"frt_mode",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"por",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"pol",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"pod",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"del",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"svcterm_fr_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"svcterm_to_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"departure_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"arrival_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"origin_loc_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"origin_loc_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"dest_loc_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dest_loc_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"loc_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"loc_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"commodity_desc",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"co_loader_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"carrier_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Int",       Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"priority",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"sc_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"bullet_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"named_acct_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eff_fr_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eff_to_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
			       
			      InitColumns(cols);
			     // SetColProperty("frt_mode", {ComboText:"|"+ftr_modText, ComboCode:"|"+ftr_modCode} );
			      SetColProperty("named_acct_flg", {ComboText:"|Y|N", ComboCode:"|Y|N"} );
			      SetSheetHeight(150);
			      SetEditable(0);
			      SetWaitImageVisible(0);
			      SetColProperty(0 ,"por", {AcceptKeys:"E" , InputCaseSensitive:1});
			      SetColProperty(0 ,"pol", {AcceptKeys:"E" , InputCaseSensitive:1});
			      SetColProperty(0 ,"pod", {AcceptKeys:"E" , InputCaseSensitive:1});
			      SetColProperty(0 ,"del", {AcceptKeys:"E" , InputCaseSensitive:1});
			      SetColProperty(0 ,"departure_cd", {AcceptKeys:"E" , InputCaseSensitive:1});
			      SetColProperty(0 ,"arrival_cd", {AcceptKeys:"E" , InputCaseSensitive:1});
			      SetColProperty(0 ,"origin_loc_cd", {AcceptKeys:"E" , InputCaseSensitive:1});
			      SetColProperty(0 ,"dest_loc_cd", {AcceptKeys:"E" , InputCaseSensitive:1});
			      SetColProperty(0 ,"co_loader_cd", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			      SetColProperty(0 ,"carrier_cd", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			      SetColProperty(0 ,"sc_no", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			      SetColProperty(0 ,"bullet_no", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			      SetShowButtonImage(2);
			      }
			      break;


		case 3:      //IBSheet1 init
		    with(sheetObj){
	     // var hdr1='ctrt_no|sb_cls_cd|Flag|Rate No|Rate Seq|Office|Provider|Freight|Freight|Unit|Currency|Rate|Remark';
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		    var headers = [ { Text:getLabel('RateHistoryPopup_Sheet3_HDR1'), Align:"Center"} ];		                      
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ctrt_no" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"sb_cls_cd" },
	             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"hst_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",    ColMerge:1,   SaveName:"rate_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"rate_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"cust_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"frt_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"frt_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"unit_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:1,   SaveName:"unit_price",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"rmk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(150);
	      SetEditable(0);
	      SetWaitImageVisible(0);
	      SetColProperty(0 ,"ofc_cd", {AcceptKeys:"E" , InputCaseSensitive:1});
	      SetColProperty(0 ,"cust_cd", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      SetColProperty(0 ,"frt_cd", {AcceptKeys:"E" , InputCaseSensitive:1});
	      SetColProperty(0 ,"unit_cd", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      SetColProperty(0 ,"curr_cd", {AcceptKeys:"E" , InputCaseSensitive:1});
	      SetShowButtonImage(2);
	      }
	      break;

		
	}
}
function btn_Search()
{
	var formObj=document.form;
	var sXml="";
	var sParam="";
	var i=0;
	doShowProcess(true); //ComOpenWait(true);
	for(var i=0; i < 3; i++){
		if(i == 0){
			formObj.f_cmd.value = SEARCH;
			var sXml= docObjects[0].GetSearchData("./searchRateHistoryMainGS.clt", FormQueryString(formObj));
			docObjects[0].LoadSearchData(sXml,{Sync:1} );
		}else if(i == 1){
			formObj.f_cmd.value = SEARCH01;
			var sXml1= docObjects[1].GetSearchData("./searchRateHistoryListGS.clt", FormQueryString(formObj));
			docObjects[1].LoadSearchData(sXml1,{Sync:1} );
		}else if(i == 2){
			formObj.f_cmd.value = SEARCH02;
			var sXml2= docObjects[2].GetSearchData("./searchRateHistoryFooterGS.clt", FormQueryString(formObj));
			docObjects[2].LoadSearchData(sXml2,{Sync:1} );
		}
	}
	doHideProcess(false); //ComOpenWait(false);
	sheet_main_hidden(docObjects[0].GetCellValue(1,"freight_mode"),formObj.sb_cls_cd.value,docObjects[0].GetCellValue(1,"frt_mode"));
}
var rowb = "";
var colb = "";
function sheet1_OnClick(sheetObj,Row,Col){
	rowb = Row;
	colb = Col;
	var formObj=document.form;
	var sXml="";
	var sParam="";
	doShowProcess(true); //ComOpenWait(true);
	formObj.f_cmd.value=SEARCH01;
	
	for(var i=1; i < 3; i++){
		if(i == 1){
//			formObj.f_cmd.value = SEARCH01;
			sParam="ctrt_no="+formObj.ctrt_no.value+"&sb_cls_cd="+formObj.sb_cls_cd.value+"&rate_no="+sheetObj.GetCellValue(Row,"rate_no")
			+"&freight_mode="+sheetObj.GetCellValue(Row,"freight_mode")+"&hst_seq="+sheetObj.GetCellValue(Row,"hst_seq");
			sParam += "&f_cmd=101";
			
			sXml1 = docObjects[1].DoSearch("./searchRateHistoryListGS.clt", sParam);
			//docObjects[1].LoadSearchData(sXml1,{Sync:1} );
		}else if(i == 2){
//			formObj.f_cmd.value = SEARCH02;
			sParam="ctrt_no="+formObj.ctrt_no.value+"&sb_cls_cd="+formObj.sb_cls_cd.value+"&rate_no="+sheetObj.GetCellValue(Row,"rate_no")
			+"&freight_mode="+sheetObj.GetCellValue(Row,"freight_mode")+"&hst_seq="+sheetObj.GetCellValue(Row,"hst_seq");
			sParam += "&f_cmd=102";
			
			 sXml2 = docObjects[2].DoSearch("./searchRateHistoryFooterGS.clt", sParam);
			//docObjects[2].LoadSearchData(sXml2,{Sync:1} );
		}
	}
	doHideProcess(false); //ComOpenWait(false);
	sheet_main_hidden(sheetObj.GetCellValue(Row,"freight_mode"),formObj.sb_cls_cd.value,sheetObj.GetCellValue(Row,"frt_mode"));
}
function sheet_main_hidden(freight_mode,rate_type, frt_mode){
	var sheet_main=docObjects[1];
	var sheet_detail=docObjects[2];
	if ( freight_mode == "Header"){
		sheet_main.SetColHidden("hst_tp_cd",0);
		document.all.Main.style.display="block";
		document.all.Detail.style.display="none";
		sheet_main.SetSheetHeight(300);
	} else {
		sheet_main.SetColHidden("hst_tp_cd",1);
		document.all.Main.style.display="block";
		document.all.Detail.style.display="block";
		sheet_main.SetSheetHeight(150);
	}
	if( rate_type == "S"){
		sheet_detail.SetCellValue(0,"cust_cd","Customer");
		sheet_main.SetColHidden("co_loader_cd",1);
		sheet_main.SetColHidden("carrier_cd",1);
		sheet_main.SetColHidden("priority",1);
		sheet_main.SetColHidden("sc_no",1);
		sheet_main.SetColHidden("bullet_no",1);
		sheet_main.SetColHidden("named_acct_flg",1);
	} else {
		sheet_detail.SetCellValue(0,"Grd02cust_cd","Provider");
		sheet_main.SetColHidden("co_loader_cd",0);
		sheet_main.SetColHidden("carrier_cd",0);
		sheet_main.SetColHidden("priority",0);
		sheet_main.SetColHidden("sc_no",0);
		sheet_main.SetColHidden("bullet_no",0);
		sheet_main.SetColHidden("named_acct_flg",0);
	}
	if(frt_mode=="S"){
		sheet_main.SetColHidden("por",0);
		sheet_main.SetColHidden("pol",0);
		sheet_main.SetColHidden("pod",0);
		sheet_main.SetColHidden("del",0);
		sheet_main.SetColHidden("svcterm_fr_cd",0);
		sheet_main.SetColHidden("svcterm_to_cd",0);
		sheet_main.SetColHidden("departure_cd",1);
		sheet_main.SetColHidden("arrival_cd",1);
		sheet_main.SetColHidden("origin_loc_cd",1);
		sheet_main.SetColHidden("origin_loc_nm",1);
		sheet_main.SetColHidden("dest_loc_cd",1);
		sheet_main.SetColHidden("dest_loc_nm",1);
		sheet_main.SetColHidden("loc_cd",1);
		sheet_main.SetColHidden("loc_nm",1);
	} else if(frt_mode=="A"){
		sheet_main.SetColHidden("por",1);
		sheet_main.SetColHidden("pol",1);
		sheet_main.SetColHidden("pod",1);
		sheet_main.SetColHidden("del",1);
		sheet_main.SetColHidden("svcterm_fr_cd",1);
		sheet_main.SetColHidden("svcterm_to_cd",1);
		sheet_main.SetColHidden("departure_cd",0);
		sheet_main.SetColHidden("arrival_cd",0);
		sheet_main.SetColHidden("origin_loc_cd",1);
		sheet_main.SetColHidden("origin_loc_nm",1);
		sheet_main.SetColHidden("dest_loc_cd",1);
		sheet_main.SetColHidden("dest_loc_nm",1);
		sheet_main.SetColHidden("loc_cd",1);
		sheet_main.SetColHidden("loc_nm",1);
		if(rate_type="B"){
			sheet_main.SetColHidden("bullet_no",1);
			sheet_main.SetColHidden("named_acct_flg",1);
		}
	} else if(frt_mode=="D"){
		sheet_main.SetColHidden("por",1);
		sheet_main.SetColHidden("pol",1);
		sheet_main.SetColHidden("pod",1);
		sheet_main.SetColHidden("del",1);
		sheet_main.SetColHidden("svcterm_fr_cd",1);
		sheet_main.SetColHidden("svcterm_to_cd",1);
		sheet_main.SetColHidden("departure_cd",1);
		sheet_main.SetColHidden("arrival_cd",1);
		sheet_main.SetColHidden("origin_loc_cd",0);
		sheet_main.SetColHidden("origin_loc_nm",0);
		sheet_main.SetColHidden("dest_loc_cd",0);
		sheet_main.SetColHidden("dest_loc_nm",0);
		sheet_main.SetColHidden("loc_cd",0);
		sheet_main.SetColHidden("loc_nm",0);
		if(rate_type="B"){
			sheet_main.SetColHidden("co_loader_cd",1);
			sheet_main.SetColHidden("sc_no",1);
			sheet_main.SetColHidden("bullet_no",1);
			sheet_main.SetColHidden("named_acct_flg",1);
		}
	}
}
function sheet2_OnSearchEnd(){
	sheet1.SetSelectRow(rowb,colb);
}
