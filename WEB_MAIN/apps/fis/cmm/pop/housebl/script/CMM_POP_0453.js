var nowWorking = false;
var docObjects=new Array();
var sheetCnt=0;
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
	case 1:      //IBSheet1 init
	    with(sheetObj){
      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	  var headers = [ { Text:"", Align:"Center"} ];		   
      InitHeaders(headers, info);

      var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" } ];
      InitColumns(cols);
      SetEnable(0)
	   SetSheetHeight(100);
            }
      break;
	}
}

function setOfficeData(){
	var formObj=document.frm1;
	formObj.ref_ofc_cd.value=v_ofc_cd;
}

function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}

function doWork(srcName) {
	var formObj = document.frm1;
	if(nowWorking){return;}
	try {
		switch (srcName) {
		case "SAVE":			
			nowWorking = true;
			if(blCheckInpuVals()){
        		ajaxSendPost(getMblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_bl_no='+'', './GateServlet.gsl');
        	}
			break;
		case "CLOSE":
			ComClosePopup();
			break;
		} // end switch
	} catch (e) {
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

function getMblCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sXml = "";
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='RV'){
				//Please check B/L no.!!
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_BLNO'));
			}else{
        	   docObjects[0].SetCellValue(1, 1,1);  		   
        	   doShowProcess();
               frm1.f_cmd.value=ADD;                          
               sXml = docObjects[0].GetSearchData("./CMM_POP_0453GS.clt", FormQueryString(frm1) + '&bl_no=', false);
        	   var retArray="";
        	   if (sXml.replace(/^\s+|\s+$/gm,'') != ''){
        		   var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
        		   var endIndxField = sXml.indexOf("</FIELD>");
        		   var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
        		   var $xml = $(xmlDoc);            		 
        		   retArray += $xml.find( "lnr_trdp_cd").text();
        		   retArray += "|";
        		   retArray += $xml.find( "lnr_trdp_nm").text();
        		   retArray += "|";
        		   retArray += $xml.find( "eta_dt_tm").text().substring(0,8);
        		   retArray += "|";
        		   retArray += $xml.find( "eta_tm").text();
        		   retArray += "|";
        		   retArray += $xml.find( "pol_cd").text();
        		   retArray += "|";
        		   retArray += $xml.find( "pol_nm").text();          		
        		   retArray += "|";
        		   retArray += $xml.find( "pod_cd").text(); 
        		   retArray += "|";
        		   retArray += $xml.find( "pod_nm").text(); 
        		   retArray += "|";
        		   retArray += $xml.find( "ref_no").text();  
        		   retArray += "|";
        		   retArray += $xml.find( "ref_ofc_cd").text(); 
        		   retArray += "|";
        		   retArray += $xml.find( "intg_bl_seq").text(); 
        		   retArray += "|";
        		   retArray += $xml.find( "bl_no").text();           		   
        	   }
        	   ComClosePopup(retArray);
			}
		}
	}
	else{
		//SEE_BMD_MSG43		
	}
}

function svcTermChange(){
	var formObj=document.frm1;
	formObj.to_svc_term_cd.value=formObj.fm_svc_term_cd.value;
}

function doDisplay(doWhat, obj) {
	switch (doWhat) {
	case 'DATE1': // 달력 조회 팝업 호출
		var cal = new ComCalendar();
		cal.select(obj, 'MM-dd-yyyy');
		break;
	}
}

function blCheckInpuVals(){
	var isOk=true;
	if(frm1.lnr_trdp_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001') + " - Carrier");
		moveTab('01');
		frm1.lnr_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(!checkInType(frm1.eta_dt_tm.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ARRV') + getLabel('FMS_COD_DATE'));
		isOk=false;
		moveTab('01');
		frm1.eta_dt_tm.focus();
		return isOk;
	}
	if (trim(frm1.etd_dt_tm.value) != "" && trim(frm1.eta_dt_tm.value) != "") {
		var daysTerms=getDaysBetweenFormat(frm1.etd_dt_tm, frm1.eta_dt_tm, "MM-dd-yyyy");
		if (daysTerms < -1) {
			// Arrival Date time must be greater than Flight Date time
			alert(getLabel("AIR_MSG_091"));
			frm1.eta_dt_tm.focus();
			isOk=false;
			return isOk; 
		}
	}
	if(frm1.pol_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		frm1.pol_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.pod_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		frm1.pod_cd.focus();
		isOk=false;
		return isOk; 
	}
 	//#29608 MBL Mandatory 항목 추가(Office Code)
	if(frm1.ref_ofc_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.ref_ofc_cd.focus();
		isOk=false;
		return isOk; 
	}
	
	return isOk;
}

function ofcChDEta() {
	var formObj=document.frm1;
	var ofc_cd=formObj.ref_ofc_cd.options[formObj.ref_ofc_cd.selectedIndex].text;
	ajaxSendPost(getExpPostRef, 'reqVal', '&goWhere=aj&bcKey=getExpPostRef&f_ofc_cd='+ofc_cd, './GateServlet.gsl');
}

function checkDuplicateLinerBkgNo(){
	var formObj=document.frm1;
	if(formObj.lnr_bkg_no.value != ""){
		if(formObj.lnr_bkg_no.value != formObj.org_lnr_bkg_no.value){
			ajaxSendPost(checkDuplicateLinerBkgNoEnd, 'reqVal', '&goWhere=aj&bcKey=searchDuplicateLinerBkgNo&lnr_bkg_no='+formObj.lnr_bkg_no.value+'&air_sea_clss_cd='+'A' , './GateServlet.gsl');
		}
	}
}

/**
 * AJAX RETURN
 * Carrier Bkg NO 중복체크
 */
function checkDuplicateLinerBkgNoEnd(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				//alert("Ref. No Duplicate!! ");
				if( !confirm( (getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_CBKNO') + '\n'+ getLabel('FMS_COM_CFMPRO'))  ) )	
				{
					formObj.lnr_bkg_no.value=formObj.org_lnr_bkg_no.value;
					formObj.lnr_bkg_no.select();
			}
			}
		}
	}
}

function getExpPostRef(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]!=''){
				ofc_post_dt=doc[1];
			}
		}
	}
}

function loadPage() {
	var formObj = document.frm1;	
	if(typeof(parent.rtnary[0]) != 'undefined'){
		formObj.lnr_trdp_cd.value = parent.rtnary[0];
		formObj.lnr_trdp_nm.value = parent.rtnary[1];
		formObj.eta_dt_tm.value = parent.rtnary[2];	
		formObj.f_eta_dt_tm.value = parent.rtnary[33]==""?parent.rtnary[2]:parent.rtnary[33];
		formObj.eta_tm.value = parent.rtnary[3];
		formObj.pol_cd.value = parent.rtnary[4];		
		formObj.pol_nm.value = parent.rtnary[5];
		formObj.pod_cd.value = parent.rtnary[6];
		formObj.pod_nm.value = parent.rtnary[7];		
		formObj.etd_dt_tm.value = parent.rtnary[31];
		formObj.etd_tm.value = parent.rtnary[9];
		if (formObj.hbl_tp_cd.value == "")		{formObj.hbl_tp_cd.value = parent.rtnary[10]};
		if (formObj.shpr_trdp_nm.value == "")	{formObj.shpr_trdp_nm.value = parent.rtnary[11]};
		if (formObj.shpr_trdp_addr.value == "")	{formObj.shpr_trdp_addr.value = parent.rtnary[12]};
		if (formObj.cnee_trdp_nm.value == "")	{formObj.cnee_trdp_nm.value = parent.rtnary[13]};
		if (formObj.cnee_trdp_addr.value == "")	{formObj.cnee_trdp_addr.value = parent.rtnary[14]};
		if (formObj.ctrb_ofc_cd.value == "")	{formObj.ctrb_ofc_cd.value = parent.rtnary[15]};
		if (formObj.ctrb_mgn.value == "")		{formObj.ctrb_mgn.value = parent.rtnary[16]};
		if (formObj.ctrb_ratio_yn.value == "")	{formObj.ctrb_ratio_yn.value = parent.rtnary[17]};
		if (formObj.ctrb_dept_cd.value == "")	{formObj.ctrb_dept_cd.value = parent.rtnary[18]};
		formObj.lnr_trdp_cd.value = parent.rtnary[19];
		formObj.lnr_trdp_nm.value = parent.rtnary[20];
		formObj.flt_no.value = parent.rtnary[21];		
		formObj.ts1_port_cd.value = parent.rtnary[22];
		formObj.ts1_flt_no.value = parent.rtnary[23];
		formObj.ts2_port_cd.value = parent.rtnary[24];
		formObj.ts2_flt_no.value = parent.rtnary[25];
		formObj.ts3_port_cd.value = parent.rtnary[26];
		formObj.ts3_flt_no.value = parent.rtnary[27];
		formObj.frt_loc_cd.value = parent.rtnary[28];
		formObj.frt_loc_nm.value = parent.rtnary[29];
		formObj.sto_start_dt.value = parent.rtnary[30];
		formObj.post_dt.value = parent.rtnary[32];
	}
	if(typeof(parent.rtnary[3]) != 'undefined'){
		formObj.eta_tm.value = parent.rtnary[3];
	}
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	/*if(frm1.bl_sts_cd.value=='NA'){
        frm1.mrn.className = 'search_form';
        frm1.mrn.readOnly  = false;
    }else if(frm1.bl_sts_cd.value=='MC'){
		    frm1.mrn.className = 'search_form';
			frm1.mrn.readOnly  = false;		
	}*/
}

function txtAtChange(obj, dTxt)
{
	if(dTxt.value == '' & obj.value != '')
	{
		dTxt.value=obj.value;
		frm1.f_eta_tm.value=frm1.eta_tm.value;
	}
}

function formValidation() {
	if (!chkSearchCmprPrd(false, form.etd_strdt, form.etd_enddt)) {
		return false;
	}
	return true;
}