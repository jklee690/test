/*=========================================================

*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SAL_TPM_0070.js
*@FileTitle  : Pre-Pickup Order Entry
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12

=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

var dimListSheet=false;
var isError=false;

var newWorkOrdYN = ""

function getSndParam(){
	isError=false;
    var sheetParam='';
    var dimListParam=docObjects[1].GetSaveString(false);
    if(dimListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= dimListParam;
        dimListSheet=true;
    }
	return sheetParam;
}
/* jsjang 2013.8.13 #19478 pre-pickup wo_no duplicated check */
var woCheck=true;
var cur_curObj;
function doWork(srcName, curObj, valObj){
	cur_curObj = curObj;
	if(!btnGetVisible(srcName)){
		return;
	}
	try { 
		switch(srcName) {
			case "SEARCH":
				if(frm1.f_wo_no.value==''){
					//alert('Please enter a search condition.');
					alert(getLabel('FMS_COM_ALT014'));
					frm1.f_wo_no.focus();
				}else{
		       		frm1.f_cmd.value=SEARCH;
				    submitForm(SEARCH);
				}
			break;
			case "NEW":
				frm1.f_cmd.value='';
			    submitForm("");
			break;
			case "ADD"://??
				if(!doChkValue()){
					return;
				}
				frm1.wo_no.value=trim(frm1.wo_no.value);
				if (frm1.size_ut_cd[0].checked == true){
					frm1.size_ut_cd1.value = "CM";
				}else{
					frm1.size_ut_cd1.value = "INCH";
				} 
				
				woCheck = true;
				
				// 신규로 등록할 경우에만 중복체크하도록 수정
				if(newWorkOrdYN == "Y"){
					if (frm1.wo_no.value != '') {
						/* jsjang 2013.8.13 #19478 pre-pickup wo_no duplicated check */
						ajaxSendPost(getWoNoCheckFunc, 'reqVal', '&goWhere=aj&bcKey=getWoNoCheck&f_wo_no='+frm1.wo_no.value, './GateServlet.gsl');
						//ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+formObj.ref_no.value, './GateServlet.gsl');
					}
				}
				
				if(woCheck){
					if(confirm(getLabel('FMS_COM_CFMSAV'))){
						frm1.f_cmd.value=ADD;
						gridAdd(0);
						docObjects[0].SetCellValue(1, 1,1);
						doShowProcess();
	             	    docObjects[0].DoAllSave("./SAL_TPM_0070GS.clt", FormQueryString(frm1)+getSndParam(), true);
					}
				}
			break;
			case "REMOVE"://??
	        	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
	                   frm1.f_cmd.value=REMOVE;
	            	   doShowProcess();
	            	   frm1.submit();
	        	   }
			break;
			case "COPY":
				if(frm1.f_wo_no.value!='' && frm1.wo_no.value!=''){
					if(confirm(getLabel('FMS_COM_CFMCPY'))){
						doShowProcess();
						frm1.f_wo_no.value='';
						frm1.wo_no.value='';
						frm1.wo_no.className='search_form';
						frm1.wo_no.readOnly=false;
						var date=getTodayStr().replaceAll("-","");
				    	date=date.substring(0,2) + "-" + date.substring(2,4) + "-" + date.substring(4,8);
				    	frm1.iss_dt_tm.value=date;
				    	frm1.iss_usrid.value=usrid;
				    	frm1.org_rout_dt_tm.value='';
				    	frm1.org2_rout_dt_tm.value='';
				    	frm1.rmk.value='';
				    	frm1.dest_rout_dt_tm.value='';
				    	frm1.via_rout_dt_tm.value='';
				    	frm1.cgo_pck_qty.value='';
				    	frm1.cgo_pck_ut_cd.value='';
				    	frm1.act_wgt_k.value='';
				    	frm1.act_wgt_l.value='';
				    	frm1.cgo_meas_m.value='';
				    	frm1.cgo_meas_f.value='';
				    	frm1.shpr_trdp_cd.value='';
				    	frm1.shpr_trdp_nm.value='';
				    	frm1.shpr_trdp_addr.value='';
				    	frm1.cnee_trdp_cd.value='';
				    	frm1.cnee_trdp_nm.value='';
				    	frm1.cnee_trdp_addr.value='';
				    	frm1.prnr_trdp_cd.value='';
				    	frm1.prnr_trdp_nm.value='';
				    	frm1.prnr_trdp_addr.value='';
				    	frm1.via_rout_addr.value='';
				    	frm1.org2_rout_addr.value='';
				    	
				    	frm1.org_ofc_hr.value='';
				    	frm1.via_ofc_hr.value='';
				    	frm1.chg_wgt.value='';
				    	frm1.chg_wgt1.value='';
				    	//frm1.cgo_itm_cmdt_nm.value = '';
				    	docObjects[1].RemoveAll();
						doHideProcess();
					}
				}else{
				}
			break;
			case "WO_POPLIST"://openMean S=???? ??, A=???? ??		
	         	rtnary=new Array(2);   		
	   			rtnary[0]=frm1.air_sea_clss_cd.value;
	   			rtnary[1]=frm1.bnd_clss_cd.value;
	   			rtnary[2]=frm1.biz_clss_cd.value;
	   			
	   			callBackFunc = "WO_POPLIST";
		   		modal_center_open('./CMM_POP_0200.clt', rtnary, 756,480,"yes");
	  	        		
			break;  
			case "PARTNER_POPLIST"://openMean 1=???? ??, 2=????? ??
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		var callTp='';
		   		if(curObj.id == "trn"){
		   			//callTp = 'TK';
		   			/* #23817 D/O PRINT? TRUCKER ? ????? ALL, jsjang 2013.11.22*/
		   			callTp='';
		   		}else if(curObj.id == "pic"){
		   		}else if(curObj.id == "del"){
		   		}else if(curObj.id == "bil"){
		   		}else if(curObj.id == "prnr"){
		   		}else if(curObj.id == "shpr"){
		   		}else if(curObj.id == "cnee"){
		   		}
		   		callBackFunc = "PARTNER_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt?callTp=' + callTp, rtnary, 1150,650,"yes");
    	        
           break;
           case "PRINT":
        	   if(frm1.f_wo_no.value!='' && frm1.wo_no.value){
        		   if(ofc_cnt_cd == "DE"){
        			   frm1.file_name.value='pickup_delivery_instruction_03.mrd';
        		   }else{
        			   frm1.file_name.value='pickup_delivery_instruction_04.mrd';
        		   }
        		   frm1.title.value='Pickup Delivery Instruction';
        		   //Parameter Setting
        		   var param="[" + frm1.f_wo_no.value + "]";	// [1]
        		   param += "[" + user_ofc_cd + "]";
        		   param += "[" + user_eml + "]";
        		   param += "[" + user_phn + "]";
        		   param += "[" + user_fax + "]";
        		   if(ofc_cnt_cd == "DE"){
        			   param += "[" + frm1.org_ofc_hr.value + "]";
        			   param += "[" + frm1.via_ofc_hr.value + "]";
        		   }
        		   frm1.mailTitle.value="Pre-Pickup Order [W/O No. " + frm1.f_wo_no.value + "]";
        		   frm1.rd_param.value=param; 
        		   popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
        	   }
		   break;
           case "CAL_CBM_NEW":
	   		   var rowCnt=docObjects[1].LastRow() + 1;
	   		   docObjects[1].DataInsert(rowCnt);
	   		   docObjects[1].SetCellValue(rowCnt, "cbm",0);
		   break;
        } // end switch
	}catch(e) {
		//alert(e.description);
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e);
        }
	}
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.f_wo_no.value = getParam(url,"f_wo_no");
	
	doWork('SEARCH');
}

function submitForm(cmd){ 
	var formObj=document.frm1;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./SAL_TPM_0070AJ.clt",
		   dataType: 'xml',
		   data: { f_cmd: cmd,  f_wo_no: formObj.f_wo_no.value },
		   success: function(data){
			   setFieldValue( formObj.f_wo_no, $('wo_no',data).text());
			   setFieldValue( formObj.trsp_trdp_cd, $('trsp_trdp_cd',data).text());
			   setFieldValue( formObj.trsp_trdp_nm, $('trsp_trdp_nm',data).text());
			   setFieldValue( formObj.trsp_trdp_addr, $('trsp_trdp_addr',data).text());
			   setFieldValue( formObj.org_rout_trdp_cd, $('org_rout_trdp_cd',data).text());
			   setFieldValue( formObj.org_rout_trdp_nm, $('org_rout_trdp_nm',data).text());
			   setFieldValue( formObj.org_rout_addr, $('org_rout_addr',data).text());
			   setFieldValue( formObj.dest_rout_trdp_cd, $('dest_rout_trdp_cd',data).text());
			   setFieldValue( formObj.dest_rout_trdp_nm, $('dest_rout_trdp_nm',data).text());
			   setFieldValue( formObj.dest_rout_addr, $('dest_rout_addr',data).text());
			   setFieldValue( formObj.bill_to_trdp_cd, $('bill_to_trdp_cd',data).text());
			   setFieldValue( formObj.bill_to_trdp_nm, $('bill_to_trdp_nm',data).text());
			   setFieldValue( formObj.bill_to_trdp_addr, $('bill_to_trdp_addr',data).text());
			   setFieldValue( formObj.wo_no, $('wo_no',data).text());
			   setFieldValue( formObj.iss_dt_tm, $('iss_dt_tm',data).text());
			   setFieldValue( formObj.iss_usrid, $('iss_usrid',data).text());
			   setFieldValue( formObj.org_rout_dt_tm, $('org_rout_dt_tm',data).text());
			   setFieldValue( formObj.org2_rout_dt_tm, $('org2_rout_dt_tm',data).text());
			   setFieldValue( formObj.rmk, $('rmk',data).text());
			   setFieldValue( formObj.dest_rout_dt_tm, $('dest_rout_dt_tm',data).text());
			   setFieldValue( formObj.via_rout_dt_tm, $('via_rout_dt_tm',data).text());
			   setFieldValue( formObj.cgo_pck_qty, $('cgo_pck_qty',data).text());
			   setFieldValue( formObj.cgo_pck_ut_cd, $('cgo_pck_ut_cd',data).text());
			   setFieldValue( formObj.act_wgt_k, $('act_wgt_k',data).text());
			   setFieldValue( formObj.act_wgt_l, $('act_wgt_l',data).text());
			   setFieldValue( formObj.cgo_meas_m, $('cgo_meas_m',data).text());
			   setFieldValue( formObj.cgo_meas_f, $('cgo_meas_f',data).text()); 
			   setFieldValue( formObj.chg_wgt, $('chg_wgt',data).text());
			   setFieldValue( formObj.chg_wgt1, $('chg_wgt1',data).text());
			   setFieldValue( formObj.via_rout_addr, $('via_rout_addr',data).text());
			   setFieldValue( formObj.prnr_trdp_cd, $('prnr_trdp_cd',data).text());
			   setFieldValue( formObj.prnr_trdp_nm, $('prnr_trdp_nm',data).text());
			   setFieldValue( formObj.prnr_trdp_addr, $('prnr_trdp_addr',data).text());
			   setFieldValue( formObj.shpr_trdp_cd, $('shpr_trdp_cd',data).text());
			   setFieldValue( formObj.shpr_trdp_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.shpr_trdp_addr, $('shpr_trdp_addr',data).text());
			   setFieldValue( formObj.cnee_trdp_cd, $('cnee_trdp_cd',data).text());
			   setFieldValue( formObj.cnee_trdp_nm, $('cnee_trdp_nm',data).text());
			   setFieldValue( formObj.cnee_trdp_addr, $('cnee_trdp_addr',data).text());
			   setFieldValue( formObj.org2_rout_addr, $('org2_rout_addr',data).text());
			   setFieldValue( formObj.certi_pkup_as_cd, $('certi_pkup_as_cd',data).text());
			   setFieldValue( formObj.org_ofc_hr, $('org_ofc_hr',data).text());
			   setFieldValue( formObj.via_ofc_hr, $('via_ofc_hr',data).text());
			   setFieldValue( formObj.size_ut_cd1, $('size_ut_cd',data).text());
			   
			   doBtnAuthority(attr_extension);
			   loadPage();
			   
			  doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}
/* jsjang 2013.8.13 #19478 pre-pickup wo_no duplicated check */
function getWoNoCheckFunc(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP'){
				woCheck=false;
				//Wo. No. is duplicate.
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_WONO'));
				//frm1.wo_no.value = "";
				//frm1.wo_no.focus();
			}
			else{
				woCheck=true;
			}
		}
	}
	else{
		//SEE_BMD_MSG43
		woCheck=false;
	}
}
function doChkValue(){
	var isOk=true;
	if(rmMoneyFmt(frm1.cgo_pck_qty.value)>9999999.99){
        alert(getLabel('FMS_COM_ALT002') + " - " + getLabel2('FMS_COM_ALT030', new Array("7")));
        frm1.cgo_pck_qty.focus();
        frm1.cgo_pck_qty.select();
        isOk=false;
	}else if(rmMoneyFmt(frm1.act_wgt_k.value)>99999999.99){
        alert(getLabel('FMS_COM_ALT002') + " - " + getLabel2('FMS_COM_ALT030', new Array("8")));
        frm1.act_wgt_k.focus();
        frm1.act_wgt_k.select();
        isOk=false;
	}else if(rmMoneyFmt(frm1.act_wgt_l.value)>99999999.99){
        alert(getLabel('FMS_COM_ALT002') + " - " + getLabel2('FMS_COM_ALT030', new Array("8")));
        frm1.act_wgt_l.focus();
        frm1.act_wgt_l.select();
        isOk=false;
	}else if(rmMoneyFmt(frm1.cgo_meas_m.value)>999999999999.99){
        alert(getLabel('FMS_COM_ALT002') + " - " + getLabel2('FMS_COM_ALT030', new Array("16")));
        frm1.cgo_meas_m.focus();
        frm1.cgo_meas_m.select();
        isOk=false;
	}else if(rmMoneyFmt(frm1.cgo_meas_f.value)>999999999999.99){
        alert(getLabel('FMS_COM_ALT002') + " - " + getLabel2('FMS_COM_ALT030', new Array("16")));
        frm1.cgo_meas_f.focus();
        frm1.cgo_meas_f.select();
        isOk=false;
	}
	return isOk;
}
function gridAdd(objIdx){
	var intRows = docObjects[objIdx].LastRow() + 1;
	docObjects[objIdx].DataInsert(intRows);
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet ??
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet ?? ?? ? ???
 * body ??? onLoad ?????? ??
 * ??? ?????? ??? ?? ????? ?? ??? ????
 */
function loadPage() {
	
	var opt_key = "AE_CERTI_VALIDITY";
	ajaxSendPost(setAeCertiValidityReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	if(CERTI_YN == "Y"){
    	getObj("tbCertiPkupAsCd").style.display = "inline"; 
	    	
    	if(ofc_cnt_cd == "DE"){
    		getObj("divBillTo").style.height = "305px"; 
        	getObj("divflightSchedule").style.height = "308px";
    	}else{
    		getObj("divBillTo").style.height = "202px"; 
        	getObj("divflightSchedule").style.height = "205px";
    	}
	}else{
		if(ofc_cnt_cd == "DE"){
    		getObj("divBillTo").style.height = "276px"; 
        	getObj("divflightSchedule").style.height = "279px";
    	}
	}
	
    for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
    // Dimension Search
    if(frm1.f_wo_no.value!=''){
    	newWorkOrdYN = "N";
    	frm1.wo_no.className='search_form-disable';
		frm1.wo_no.readOnly=true;
    	searchGrid(1);
    }else{
    	newWorkOrdYN = "Y";
    	frm1.wo_no.className='search_form';
		frm1.wo_no.readOnly=false;
    }
    
    if(frm1.f_wo_no.value==''){
    	// ?? ??? ?/?/??? ???
    	var date=getTodayStr().replaceAll("-","");
//    	if(ofc_cnt_cd=="US" || ofc_cnt_cd=="JP"){
    		date=date.substring(0,2) + "-" + date.substring(2,4) + "-" + date.substring(4,8);
//    	}else{
//    		date = date.substring(2,4) + "-" + date.substring(0,2) + "-" + date.substring(4,8);
//    	}
    	frm1.iss_dt_tm.value=date;
    	frm1.iss_usrid.value=usrid;
    }
    
    setSizeUtCd(frm1.size_ut_cd1.value);
    
}
/**
 * IBSheet Object? ??? ??
 * ?? ?? ???? ????? ??? ?? ? ??? ?? ????? ??? ? ??
 * ??? ?? ??? ??
 */
function setDocumentObject(sheet_obj){
	switch(sheet_obj.id){
		case "sheet1":
			docObjects[0]=sheet_obj;
		break;
		case "sheet2":
			docObjects[1]=sheet_obj;
		break;
	}
}
/**
 * ?? ?????, ?? ??
 * param : sheetObj ==> ??????, sheetNo ==> ?????? ??? ???? ?? ????
 * ??? ??? ?? ?? ??? case? ???? ?? ?????? ????
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
    	case 1:     
			with (sheetObj) {
            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('SAL_TPM_0070_HDR1'), Align:"Center"} ];
            InitHeaders(headers, info);
            var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
                   {Type:"Text",     Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"sv_wo_no" } ];
            InitColumns(cols);
            SetEditable(1);
            SetVisible(false);
            SetFocusAfterProcess(0);
          }
        break;
		case 2:     //Calculate CBM
		    with(sheetObj){

	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1, TabStop:0 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('SAL_TPM_0070_HDR2'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"del",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"dim_ibflag" },
	               {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_len_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	               {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_wdt_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	               {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_hgt_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	               {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_pce_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
	               {Type:"Float",     Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_act_dim",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	               {Type:"Float",      Hidden:1, Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_chg_wgt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
	               {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_chg_wgt1",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
	               {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_meas",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	               {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_meas1",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	               {Type:"Text",      Hidden:1, Width:52,   Align:"Left",    ColMerge:1,   SaveName:"dim_pck_ut_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"dim_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	         
	        InitColumns(cols);

			SetCountPosition(0);
            SetEditable(1);
            SetFocusAfterProcess(0);
            SetSheetHeight(100);
        }
		break;
    }
}
function sheet1_OnSearchEnd(sheetObj, errMsg){
	if(frm1.wo_no.value!=''){
		frm1.wo_no.className='search_form-disable';
		frm1.wo_no.readOnly=true;
	}
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	if(errMsg!=''){
		return;
	}
	if(docObjects[0].GetCellValue(1, "sv_wo_no")!=''){
		frm1.wo_no.value=docObjects[0].GetCellValue(1, "sv_wo_no");
		frm1.f_wo_no.value=docObjects[0].GetCellValue(1, "sv_wo_no");
		frm1.wo_no.className='search_form-disable';
		frm1.wo_no.readOnly=true;
		newWorkOrdYN = "N";
	}
	if(dimListSheet){
		searchGrid(1);
	}
	dimListSheet=false;
	//alert("Save success! ");
	if(errMsg == "" || errMsg == undefined || errMsg == null){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message ?? */
		showCompleteProcess();
	}
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}
function weightChange(obj){
	var formObj=document.frm1;
	if(obj.name=="act_wgt_k"){
		formObj.act_wgt_l.value=doMoneyFmt(roundXL(formObj.act_wgt_k.value.replaceAll(",","") / 0.453597315, 2));
	}else if(obj.name=="act_wgt_l"){
		formObj.act_wgt_k.value=doMoneyFmt(roundXL(formObj.act_wgt_l.value.replaceAll(",","") * 0.453597315, 2));
	}
	/*
	 * 2012.03.06 KJH
	 * dimension ??? ???? detail ??? ????.
	 */
	/*var rtnVal="";
	var sumWgt=0;
	var sumCbm=0;
	var sumPcs=0;
	var sheetObj=docObjects[1];
	if(sheetObj.LastRow() + 1 > 0 ){
		for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++){
			var length=sheetObj.GetCellValue(i, "dim_len_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_len_dim");
			var width=sheetObj.GetCellValue(i, "dim_wdt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_wdt_dim");
			var height=sheetObj.GetCellValue(i, "dim_hgt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_hgt_dim");
			var pcs=sheetObj.GetCellValue(i, "dim_pce_qty")=="" ? 0 : sheetObj.GetCellValue(i, "dim_pce_qty");
			if(i!=1){
				rtnVal += "\r\n";
			}
			sumWgt += parseFloat(roundXL(length * width * height * pcs / 6000, 1));
			sumCbm += parseFloat(roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 6));
			sumPcs += parseFloat(sheetObj.GetCellValue(i, "dim_pce_qty"));
			rtnVal += parseFloat(sheetObj.GetCellValue(i, "dim_pce_qty")) + " " + frm1.cgo_pck_ut_cd.value + "   ";
			rtnVal += parseFloat(roundXL(length * width * height * pcs / 6000, 1)) + " Kg" + "   ";
			rtnVal += length + " X " + width + " X " + height + " cm";
		}
	}
	//frm1.act_wgt_k.value = sumWgt.toFixed(1);
	//frm1.act_wgt_l.value = (sumWgt / 0.453597315).toFixed(1);
	if(isNaN(sumCbm)) sumCbm=0;
	if(isNaN(sumPcs)) sumPcs=0;
	frm1.cgo_meas_m.value=doMoneyFmt(sumCbm.toFixed(2));
	frm1.cgo_meas_f.value=doMoneyFmt((sumCbm * 35.3165).toFixed(2));
	frm1.cgo_pck_qty.value=doMoneyFmt(sumPcs);*/
	//frm1.cgo_itm_cmdt_nm.value = rtnVal;
}
function cbmChange(obj){
	var formObj=document.frm1;
	if(obj.name=="cgo_meas_m"){
		var rndXLValue = roundXL(formObj.cgo_meas_m.value.replaceAll(",", "") * 35.3165, 3);
		formObj.cgo_meas_f.value = doMoneyFmt(Number(rndXLValue).toFixed(0));
	}
	// CFT ==> CBM 기능  
	else if(obj.name=="cgo_meas_f"){
		var rndXLValue = roundXL(formObj.cgo_meas_f.value.replaceAll(",", "") / 35.3165, 3);
		formObj.cgo_meas_m.value = rndXLValue;
		chkComma(formObj.cgo_meas_m, 8, 3);
	}
}


function searchGrid(gridIdx){
	switch(gridIdx){
		case 1:
			//Dimension
			frm1.f_cmd.value=SEARCHLIST01;
			docObjects[1].DoSearch("./SAL_TPM_0070_1GS.clt", FormQueryString(frm1) );
		break;
	}
}
function sheet2_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow()== row && "dim_act_dim" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			gridAdd(1);
			sheetObj.SelectCell(sheetObj.LastRow(), 0);
		}
	}
}

// DIM 변?�시??반영?��? ?�고, G.Wgt ?�력 ?�에 반영?�도�?변�?
function sheet2_OnChange(sheetObj, row, col){
	
	var colName=sheetObj.ColSaveName(col);
	var formObj=document.frm1;
	
	if (colName=="dim_len_dim" || colName=="dim_wdt_dim" || colName=="dim_hgt_dim" || colName=="dim_pce_qty" || colName=="del" || colName=="dim_act_dim") {
		var formObj=document.frm1;
		var length=sheetObj.GetCellValue(row, "dim_len_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_len_dim");
		var width=sheetObj.GetCellValue(row, "dim_wdt_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_wdt_dim");
		var height=sheetObj.GetCellValue(row, "dim_hgt_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_hgt_dim");
		var pcs=sheetObj.GetCellValue(row, "dim_pce_qty")=="" ? 0 : sheetObj.GetCellValue(row, "dim_pce_qty");
		
		var cbm=0;
		var sumCbm=0;
		var sumPcs=0;
		
		if (formObj.size_ut_cd[0].checked) {
			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 3);
		} else if (formObj.size_ut_cd[1].checked) {
			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 3);
		}
		
		if (colName !="dim_act_dim")
		{
			sheetObj.SetCellValue(row, "dim_act_dim",cbm.toFixed(3),0);
		}
		if (cbm.toFixed(3) > 999999) {
			alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("6")));
			sheetObj.SetCellValue(row, "dim_act_dim",0,0);
			return;
		}
		for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++){
			if(sheetObj.GetCellValue(i, "del") == 0)
			{
				sumCbm += parseFloat(sheetObj.GetCellValue(i, "dim_act_dim"));
				sumPcs += parseFloat(sheetObj.GetCellValue(i, "dim_pce_qty"));
			}
		}
		formObj.cgo_meas_m.value=sumCbm.toFixed(3);
		formObj.cgo_pck_qty.value=sumPcs.toFixed(0);
		cbmChange(formObj.cgo_meas_m); 
		chgWgtCal(sheetObj);		
		
		
		
	}
}


function chgWgtCal(sheetObj){
	var formObj=document.frm1;
	var chg_wgt = 0;
	var chg_wgt1 = 0;
	for ( var i=1; i <= sheetObj.LastRow(); i++) {
		 
		var length=sheetObj.GetCellValue(i, "dim_len_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_len_dim");
		var width=sheetObj.GetCellValue(i, "dim_wdt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_wdt_dim");
		var height=sheetObj.GetCellValue(i, "dim_hgt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_hgt_dim");
		var pcs=sheetObj.GetCellValue(i, "dim_pce_qty")=="" ? 0 : sheetObj.GetCellValue(i, "dim_pce_qty");
		
		if(formObj.size_ut_cd[0].checked){
			if(sheetObj.GetCellValue(i, "del") == 0)
			{
				kg=roundXL(length * width * height * pcs / 6000, 1); 
				chg_wgt = parseFloat(chg_wgt) + parseFloat(kg.toFixed(1));
				chg_wgt1 = parseFloat(chg_wgt1) + parseFloat((kg / 0.453597315).toFixed(1));  
			}
		} else if(formObj.size_ut_cd[1].checked) {
			if(sheetObj.GetCellValue(i, "del") == 0)
			{
				kg=roundXL(length * width * height * pcs * 2.54 * 2.54 * 2.54 / 6000, 1);  
				chg_wgt = parseFloat(chg_wgt) + parseFloat(kg.toFixed(1));
				chg_wgt1 = parseFloat(chg_wgt1) + parseFloat((kg / 0.453597315).toFixed(1));  
			}
		}
	 
	}
	
	formObj.chg_wgt.value = chg_wgt;
	formObj.chg_wgt1.value = chg_wgt1;  		
	
}












function doDisplay(doWhat,obj){
    switch(doWhat){
	    case 'DATE1':    //?? ?? ?? ??      
	        var cal=new calendarPopup();
	        cal.select(obj, obj.name, 'MM-dd-yyyy');
	    break;
    }
}
function chk_Time(obj){
	var str="";
	str=delete_Char(obj.value,':');
	str=trim(str);
	if (!chk_Number(str)) return (false);
	if (str.length != 4)    return (false);
	hh=str.substring(0,2);
	mm=str.substring(2,4);
	if (!chk_Between(hh,"00","23")) return (obj.value="");
	if (!chk_Between(mm,"00","59")) return (obj.value="");
	return (true);
}
function WO_POPLIST(rtnVal){
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.f_wo_no.value=rtnValAry[0];//wo_no
		//frm1.hbl_no.value     = rtnValAry[1];//hbl_no
		frm1.intg_bl_seq.value=rtnValAry[2];//intg_bl_seq		
		doWork('SEARCH');
	}	
}

function PARTNER_POPLIST(rtnVal){
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var id=cur_curObj.id; 
		if(id=="pic"){
			var rtnValAry=rtnVal.split("|");
			frm1.org_rout_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.org_rout_trdp_nm.value=rtnValAry[2];//eng_nm
			frm1.org_rout_addr.value=rtnValAry[7];//eng_addr

			//26366 PIC ?�보가 2�??�정?��? ?�도�?
			/*
			if(rtnValAry[3]!=''){
				frm1.org_rout_addr.value += '\r\n' + rtnValAry[3];
			}
			if(rtnValAry[4]!='' && rtnValAry[5]!=''){
				frm1.org_rout_addr.value += '\r\n' + 'TEL : ' + rtnValAry[4] + '  FAX : ' + rtnValAry[5];
			}else if(rtnValAry[4]!='' && rtnValAry[5]==''){
				frm1.org_rout_addr.value += '\r\n' + 'TEL : ' + rtnValAry[4];
			}else if(rtnValAry[4]=='' && rtnValAry[5]!=''){
				frm1.org_rout_addr.value += '\r\n' + 'FAX : ' + rtnValAry[5];
			}else{
			}
			*/
			//2012.03.12  pick-up ??? shipper?? ??
			frm1.shpr_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.shpr_trdp_nm.value=rtnValAry[2];//eng_nm
			frm1.shpr_trdp_addr.value=rtnValAry[7];//eng_addr

			//26366 PIC ?�보가 2�??�정?��? ?�도�?
			/*
			if(rtnValAry[3]!=''){
				frm1.shpr_trdp_addr.value += '\r\n' + rtnValAry[3];
			}
			if(rtnValAry[4]!='' && rtnValAry[5]!=''){
				frm1.shpr_trdp_addr.value += '\r\n' + 'TEL : ' + rtnValAry[4] + '  FAX : ' + rtnValAry[5];
			}else if(rtnValAry[4]!='' && rtnValAry[5]==''){
				frm1.shpr_trdp_addr.value += '\r\n' + 'TEL : ' + rtnValAry[4];
			}else if(rtnValAry[4]=='' && rtnValAry[5]!=''){
				frm1.shpr_trdp_addr.value += '\r\n' + 'FAX : ' + rtnValAry[5];
			}else{
			}
			*/
		}else if(id=="del") {
			var rtnValAry=rtnVal.split("|");
			frm1.dest_rout_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.dest_rout_trdp_nm.value=rtnValAry[2];//eng_nm
			frm1.dest_rout_addr.value=rtnValAry[7];//eng_addr
		}else if(id=="trn") {
			var rtnValAry=rtnVal.split("|");
			frm1.trsp_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.trsp_trdp_nm.value=rtnValAry[2];//eng_nm
			frm1.trsp_trdp_addr.value=rtnValAry[7];//eng_addr
			
			/*50630 [OCEAN BLUE] MIsc. Operation Entry DO Double Name & Phone Number
			if(rtnValAry[3]!=''){
				frm1.trsp_trdp_addr.value += '\r\n' + rtnValAry[3];
			}
			
			if(rtnValAry[4]!='' && rtnValAry[5]!=''){
				frm1.trsp_trdp_addr.value += '\r\n' + 'TEL : ' + rtnValAry[4] + '  FAX : ' + rtnValAry[5];
			}else if(rtnValAry[4]!='' && rtnValAry[5]==''){
				frm1.trsp_trdp_addr.value += '\r\n' + 'TEL : ' + rtnValAry[4];
			}else if(rtnValAry[4]=='' && rtnValAry[5]!=''){
				frm1.trsp_trdp_addr.value += '\r\n' + 'FAX : ' + rtnValAry[5];
			}else{
			}
			*/
		}else if(id=="bil") {
			var rtnValAry=rtnVal.split("|");
			frm1.bill_to_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.bill_to_trdp_nm.value=rtnValAry[2];//eng_nm
			frm1.bill_to_trdp_addr.value=rtnValAry[7];//eng_addr
		}else if(id=="prnr") {
			var rtnValAry=rtnVal.split("|");
			frm1.prnr_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.prnr_trdp_nm.value=rtnValAry[2];//eng_nm
			frm1.prnr_trdp_addr.value=rtnValAry[7];//eng_addr
		}else if(id=="shpr") {
			var rtnValAry=rtnVal.split("|");
			frm1.shpr_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.shpr_trdp_nm.value=rtnValAry[2];//eng_nm
			frm1.shpr_trdp_addr.value=rtnValAry[7];//eng_addr
		}else if(id=="cnee") {
			var rtnValAry=rtnVal.split("|");
			frm1.cnee_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.cnee_trdp_nm.value=rtnValAry[2];//eng_nm
			frm1.cnee_trdp_addr.value=rtnValAry[7];//eng_addr
		}
	}
}
function chkSizeType(){
	var formObj=document.frm1;
	var sheetObj=docObjects[1];
	
	var length=0;
	var width=0;
	var height=0;
	var pcs=0;
	var cbm=0;
	var sumCbm=0;
	var sumPcs=0;	
	
	for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++){
		length=sheetObj.GetCellValue(i, "dim_len_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_len_dim");
		width=sheetObj.GetCellValue(i, "dim_wdt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_wdt_dim");
		height=sheetObj.GetCellValue(i, "dim_hgt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_hgt_dim");
		pcs=sheetObj.GetCellValue(i, "dim_pce_qty")=="" ? 0 : sheetObj.GetCellValue(i, "dim_pce_qty");
		
		if (formObj.size_ut_cd[0].checked) {
 			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 3);
 		} else if (formObj.size_ut_cd[1].checked) {
 			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 3);
 		}
 		sheetObj.SetCellValue(i, "dim_act_dim", cbm.toFixed(3), 0);
	}
	for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++) {
		sumCbm += parseFloat(sheetObj.GetCellValue(i, "dim_act_dim"));
		sumPcs += parseFloat(sheetObj.GetCellValue(i, "dim_pce_qty"));
	}
	formObj.cgo_meas_m.value=sumCbm.toFixed(3);
	formObj.cgo_pck_qty.value=sumPcs.toFixed(0);
	cbmChange(formObj.cgo_meas_m);
	chgWgtCal(sheetObj);
}
function setSizeUtCd(obj){
	var formObj=document.frm1; 
	if(obj=="CM"){
		formObj.size_ut_cd[0].checked=true;
		formObj.size_ut_cd[1].checked=false;
	}else {
		formObj.size_ut_cd[0].checked=false;
		formObj.size_ut_cd[1].checked=true;
	}  
}
var CERTI_YN;

function setAeCertiValidityReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		CERTI_YN=doc[1];
	} else {
		CERTI_YN="";
	}
}