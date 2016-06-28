/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : UserInfoMng
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/04
=========================================================*/
function loadPage() {
	var formObj=document.form;
 	doWork('SEARCH');
	if(formObj.save_yn.value == 'Y'){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    var formObj=document.forms[0];
    try {
        switch(srcName) {
           case "MODIFY":
        	   if(checkValues(formObj)){
        		   //if(confirm(getLabel('FMS_COM_CFMSAV'))){
					   formObj.f_cmd.value=MODIFY;
	            	   doShowProcess();
					   formObj.submit();
				   //}
        	   }
           break;
           case "btn_ctrt_no":	
   			var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.dflt_wh_ctrt_nm.value;
   			   callBackFunc = "setCtrtNoInfo";
   			   modal_center_open(sUrl, callBackFunc, 900,620,"yes");
   			break;
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: UserInfoMng.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: UserInfoMng.002");
        }
    }
}

function setCtrtNoInfo(aryPopupData){
	var formObj=document.form;
    if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	 	return;
	}else{
		  var rtnValAry=aryPopupData.split("|");
		   formObj.dflt_wh_ctrt_no.value=rtnValAry[0];
		   formObj.dflt_wh_ctrt_nm.value=rtnValAry[1];
	}
}

function checkValues(fName){
	return true;
    //Min/Maxlength를 확인함.
	if(checkInputVal(fName.usrid.value,             0, 12, "T", 'ID')!='O'){
    	fName.usrid.focus();
		return false;
	}else if(checkInputVal(fName.eng_usr_nm.value,  0,200, "T", getLabel('ITM_USRNMENG'))!='O'){
	   	fName.eng_usr_nm.focus();
		return false;
	}else if(checkInputVal(fName.locl_usr_nm.value, 0, 50, "T", getLabel('ITM_USRNMLOCAL'))!='O'){
	   	fName.locl_usr_nm.focus();
		return false;
	}else if(checkInputVal(fName.phn.value,         0, 30, "T", getLabel('ITM_PHN'))!='O'){
	   	fName.phn.focus();
		return false;
	}else if(checkInputVal(fName.eml.value,         0,100, "T", getLabel('ITM_EML'))!='O'){
	   	fName.eml.focus();
		return false;
	}else if(checkInputVal(fName.addr.value,       00,200, "T", getLabel('ITM_ADDR'))!='O'){
	   	fName.addr.focus();
		return false;
	}else if(checkInputVal(fName.rpt_file_path.value,    0,250, "T", getLabel('ITM_RPT_PATH'))!='O'){
		fName.addr.focus();
		return false;
	}else{
		return true;
	}
	//외부 Mail 사용시
	/*
	if(fName.eml_svc_tp[1].checked){
		if(checkInputVal(fName.eml_id.value,   3,  30, "T", getLabel('ITM_EXTEML'))!='O'){
		   	fName.eml_id.focus();
			return false;
		}else if(checkInputVal(fName.eml_pass.value,   3,  30, "T", getLabel('ITM_EXTPWD'))!='O'){
		   	fName.eml_pass.focus();
			return false;
		}else{
	    	return true;
	    }
	}else{
		return true;
	}
	*/
}
function dispTbl(dispType){
	if(dispType=='D'){
		document.forms[0].eml_id.value='';
		document.forms[0].eml_pass.value='';
		extMlInfo.style.display='none';
	}else{
		extMlInfo.style.display='block';		
	}
}

function getCtrtInfo(obj){
	var formObj=document.form;
	if(obj.value ==""){
		formObj.dflt_wh_ctrt_no.value="";
		formObj.dflt_wh_ctrt_nm.value="";
		return;
	}
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
}

function resultCtrtInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.form;
	
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr = doc[1].split('^@');
		if(rtnArr[0]!=""){
			formObj.dflt_wh_ctrt_nm.value = rtnArr[0];
		}else{
			formObj.dflt_wh_ctrt_no.value = "";
			formObj.dflt_wh_ctrt_nm.value = "";
		}
	}else{
		formObj.dflt_wh_ctrt_no.value = "";
		formObj.dflt_wh_ctrt_nm.value = "";
	}
}