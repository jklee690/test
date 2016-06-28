/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AIE_BMD_0020.js
*@FileTitle  : HGBL등록
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/15
=========================================================*/
var rcpListSheet=false;
var docListSheet=false;
var xptListSheet=false;
var dimListSheet=false;
var cmdtListSheet=false;
var frtSdSheet=false;
var frtBcSheet=false;
var frtDcSheet=false;
var jobListSheet=false;
var hwiFrtListSheet=false;
var isError=false;
var isInvStsOk=false;
var rtnary=new Array(1);
var callBackFunc = "";
var mblCreate =false;
var isMBLCreated = false;

//저장할 데이터를 각 목록에서 가지고 온다
function COUNTRY_POPLIST(rtnVal)
{
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}
        else{
			var rtnValAry=rtnVal.split("|");
			frm1.cnt_cd.value=rtnValAry[0];//cd_val
			frm1.cnt_nm.value=rtnValAry[1];//cd_nm
			frm1.cnt_nm.onchange();
		}
}
function getSndParam(){
	isError=false;
    var sheetParam='';
//    if(!blCheckInpuVals()){
//		isError = true;
//    }
    if(!isError){
    	var rcpListParam=docObjects[9].GetSaveString(true);	//[20140326 OJG]  Rate Combination Point 그리드에 데이터가 없는 현상 의심되는 부분입니다.
	    if(rcpListParam!=''){
	    	sheetParam+= '&';
	    	sheetParam+= rcpListParam;
	    	rcpListSheet=true;
	    }else{
	    	//[20140410 OJG] Rate Combination Point 에 데이터가 없을 경우 강제로 추가 
		    gridAdd(9);
		    docObjects[9].SetCellValue(1, "flg","S");
		    gridAdd(9);
		    docObjects[9].SetCellValue(2, "flg","C");
		    pckChange();
		    sGrsChange();
		    cGrsChange();
		    rtChange();
		    sChgChange();
		    cChgChange();
		    sRtChange();
		    cRtChange();
		    sAmtChange();
		    cAmtChange();
		    rcpListParam=docObjects[9].GetSaveString(true);
		    sheetParam+= '&';
	    	sheetParam+= rcpListParam;
	    	rcpListSheet=true;
	    }
    }
    var docListParam=docObjects[6].GetSaveString(false);
    if(docListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= docListParam;
    	docListSheet=true;
	}       
    var dimListParam=docObjects[1].GetSaveString(false);
    if(dimListParam!=''){
    	//isError = ediCheckInpuVals(docObjects[9]);
    	sheetParam+= '&';
    	sheetParam+= dimListParam;
        dimListSheet=true;
    }
    var cmdtListParam=docObjects[10].GetSaveString(false);
	if(cmdtListParam!=''){
		isError=itemCheckInpuVals(docObjects[10]);
		if(!isError){
	    	sheetParam+= '&';
	    	sheetParam+= cmdtListParam;
	    	cmdtListSheet=true;
		}
	}
    /*
    if(!isError){
	    var xptListParam=docObjects[9].GetSaveString(false);
	    if(xptListParam!=''){
	    	isError=ediCheckInpuVals(docObjects[9]);
	    	if(!isError){
		    	sheetParam+= '&';
		    	sheetParam+= xptListParam;
		    	xptListSheet=true;
	    	}
	    }
    }
    */
    var frtSdListParam=docObjects[2].GetSaveString(false);
    if(frtSdListParam!=''){
    	var rtnFlg=frCheckInpuVals(docObjects[2], '');
    	if(rtnFlg=='IV'){
    		isError=true;
    	}
    	frtSdListParam=docObjects[2].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtSdListParam;
    	frtSdSheet=true;
	}
    var frtBcListParam=docObjects[3].GetSaveString(false);
    if(frtBcListParam!=''){
    	var rtnFlg=frCheckInpuVals(docObjects[3], 'b_');
    	if(rtnFlg=='IV'){
    		isError=true;
    	}
    	frtBcListParam=docObjects[3].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtBcListParam;
    	frtBcSheet=true;
	}
    var frtDcListParam=docObjects[8].GetSaveString(false);
	if(frtDcListParam!=''){
		var rtnFlg=frCheckInpuVals(docObjects[8], 'dc_');
		if(rtnFlg=='IV'){
    		isError=true;
    	}
		frtDcListParam=docObjects[8].GetSaveString(false);
		sheetParam+= '&';
		sheetParam+= frtDcListParam;
		frtDcSheet=true;
	}
	var jobListParam=docObjects[5].GetSaveString(false);
    if(jobListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= jobListParam;
        jobListSheet=true;
    }
    var hwiFrtListParam=docObjects[11].GetSaveString(false);
	if(hwiFrtListParam!=''){
		isError=hwiFrtCheckInpuVals(docObjects[11]);
		if(!isError){
	    	sheetParam+= '&';
	    	sheetParam+= hwiFrtListParam;
	    	hwiFrtListSheet=true;
		}
	}
    /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리(flag) */
    if(isError == true)
    {
    	return true;
    }     
	return sheetParam;
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.f_bl_no.value = getParam(url,"f_bl_no");
	
	doWork('SEARCHLIST');
}

function submitForm(cmd){
	var formObj=document.frm1;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}

	$.ajax({
		   type: "POST",
		   url: "./AIE_BMD_0020AJ.clt",
		   dataType: 'xml',
		   data: $(formObj).serialize(),
		   success: function(data){
			   setFieldValue( formObj.bl_sts_cd, $('bl_sts_cd',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.f_intg_bl_seq, $('f_intg_bl_seq',data).text());
			   setFieldValue( formObj.mk_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.h_curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.h_mbl_curr_cd, $('mbl_curr_cd',data).text());
			   setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());
			   setFieldValue( formObj.m_shpr_trdp_nm, $('m_shpr_trdp_nm',data).text());
			   setFieldValue( formObj.f_bl_no, $('f_bl_no',data).text());
			   setFieldValue( formObj.bl_sts_label, $('bl_sts_label',data).text());
			   setFieldValue( formObj.bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.h_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.hbl_tp_cd, $('hbl_tp_cd',data).text());
			   setFieldValue( formObj.jb_tmplt_nm, $('jb_tmplt_nm',data).text());
			   setFieldValue( formObj.jb_tmplt_seq, $('jb_tmplt_seq',data).text());
			   setFieldValue( formObj.mrn, $('mrn',data).text());
			   setFieldValue( formObj.inv_no, $('inv_no',data).text());
			   setFieldValue( formObj.h_inv_no, $('inv_no',data).text());
			   setFieldValue( formObj.ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.ref_ofc_cd, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.rlt_intg_bl_seq, $('rlt_intg_bl_seq',data).text());
			   setFieldValue( formObj.lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.mbl_no, $('mbl_no',data).text());
			   setFieldValue( formObj.po_no, $('po_no',data).text());
			   setFieldValue( formObj.h_po_no, $('po_no',data).text());
			   setFieldValue( formObj.prnr_ref_no, $('prnr_ref_no',data).text());
			   setFieldValue( formObj.bl_dt_tm, $('bl_dt_tm',data).text());
			   setFieldValue( formObj.post_dt, $('post_dt',data).text());
			   
			   $(formObj.sub_mbl_flg).val($('sub_mbl_flg',data).text());
			   
			   setFieldValue( formObj.lc_no, $('lc_no',data).text());
			   setFieldValue( formObj.h_lc_no, $('lc_no',data).text());
			   setFieldValue( formObj.exp_ref_no, $('exp_ref_no',data).text());
			   setFieldValue( formObj.reserve_field03, $('reserve_field03',data).text());
			   setFieldValue( formObj.prnr_trdp_cd, $('prnr_trdp_cd',data).text());
			   setFieldValue( formObj.prnr_trdp_nm, $('prnr_trdp_nm',data).text());
			   setFieldValue( formObj.prnr_trdp_addr, $('prnr_trdp_addr',data).text());
			   setFieldValue( formObj.shpr_trdp_cd, $('shpr_trdp_cd',data).text());
			   setFieldValue( formObj.shpr_trdp_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.shpr_trdp_addr, $('shpr_trdp_addr',data).text());
			   setFieldValue( formObj.cnee_trdp_cd, $('cnee_trdp_cd',data).text());
			   setFieldValue( formObj.cnee_trdp_nm, $('cnee_trdp_nm',data).text());
			   setFieldValue( formObj.cnee_trdp_addr, $('cnee_trdp_addr',data).text());
			   setFieldValue( formObj.ntfy_trdp_cd, $('ntfy_trdp_cd',data).text());
			   setFieldValue( formObj.ntfy_trdp_nm, $('ntfy_trdp_nm',data).text());
			   setFieldValue( formObj.ntfy_trdp_addr, $('ntfy_trdp_addr',data).text());
			   setFieldValue( formObj.act_shpr_trdp_cd, $('act_shpr_trdp_cd',data).text());
			   setFieldValue( formObj.act_shpr_trdp_nm, $('act_shpr_trdp_nm',data).text());
			   setFieldValue( formObj.act_shp_info, $('act_shp_info',data).text());
			   setFieldValue( formObj.vndr_trdp_cd, $('vndr_trdp_cd',data).text());
			   setFieldValue( formObj.vndr_trdp_nm, $('vndr_trdp_nm',data).text());
			   setFieldValue( formObj.vndr_trdp_addr, $('vndr_trdp_addr',data).text());
			   setFieldValue( formObj.disp_ntfy_flg, $('disp_ntfy_flg',data).text());
			   setFieldValue( formObj.prnr_trdp_cd2, $('prnr_trdp_cd2',data).text());
			   setFieldValue( formObj.prnr_trdp_nm2, $('prnr_trdp_nm2',data).text());
			   setFieldValue( formObj.prnr_trdp_addr2, $('prnr_trdp_addr2',data).text());
			   setFieldValue( formObj.lnr_trdp_cd, $('lnr_trdp_cd',data).text());
			   setFieldValue( formObj.lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			   setFieldValue( formObj.obrd_dt_tm, $('obrd_dt_tm',data).text());
			   setFieldValue( formObj.flt_no, $('flt_no',data).text());
			   setFieldValue( formObj.etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.etd_tm, $('etd_tm',data).text());
			   setFieldValue( formObj.eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.eta_tm, $('eta_tm',data).text());
			   setFieldValue( formObj.pol_cd, $('pol_cd',data).text());
			   setFieldValue( formObj.pol_nod_cd, $('pol_nod_cd',data).text());
			   setFieldValue( formObj.pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.fst_to_cd, $('fst_to_cd',data).text());
			   setFieldValue( formObj.fst_to_nm, $('fst_to_nm',data).text());
			   setFieldValue( formObj.ts1_port_cd, $('ts1_port_cd',data).text());
			   setFieldValue( formObj.ts1_flt_no, $('ts1_flt_no',data).text());
			   setFieldValue( formObj.ts2_port_cd, $('ts2_port_cd',data).text());
			   setFieldValue( formObj.ts2_flt_no, $('ts2_flt_no',data).text());
			   setFieldValue( formObj.ts3_port_cd, $('ts3_port_cd',data).text());
			   setFieldValue( formObj.ts3_flt_no, $('ts3_flt_no',data).text());
			   setFieldValue( formObj.pod_cd, $('pod_cd',data).text());
			   setFieldValue( formObj.pod_nod_cd, $('pod_nod_cd',data).text());
			   setFieldValue( formObj.pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.opr_usrid, $('issued_by',data).text());
			   setFieldValue( formObj.opr_usrnm, $('proc_usrnm',data).text());
			   setFieldValue( formObj.opr_ofc_cd, $('proc_ofccd',data).text());
			   setFieldValue( formObj.opr_dept_cd, $('proc_dept_cd',data).text());
			   setFieldValue( formObj.bkg_dt_tm, $('bkg_dt_tm',data).text());
			   setFieldValue( formObj.bl_iss_dt, $('bl_iss_dt',data).text());
			   setFieldValue( formObj.sls_ofc_cd, $('sls_ofc_cd',data).text());
			   setFieldValue( formObj.sls_usrid, $('sls_usrid',data).text());
			   setFieldValue( formObj.sls_usr_nm, $('sls_usr_nm',data).text());
			   setFieldValue( formObj.sls_dept_cd, $('sls_dept_cd',data).text());
			   setFieldValue( formObj.agent_trdp_cd, $('agent_trdp_cd',data).text());
			   setFieldValue( formObj.agent_trdp_nm, $('agent_trdp_nm',data).text());
			   setFieldValue( formObj.agent_trdp_addr, $('agent_trdp_addr',data).text());
			   setFieldValue( formObj.cnt_cd, $('cnt_cd',data).text());
			   setFieldValue( formObj.cnt_nm, $('cnt_nm',data).text());
			   setFieldValue( formObj.h_cnt_nm, $('cnt_nm',data).text());
			   setFieldValue( formObj.iss_trdp_cd, $('iss_trdp_cd',data).text());
			   setFieldValue( formObj.iss_trdp_nm, $('iss_trdp_nm',data).text());
			   setFieldValue( formObj.iss_trdp_addr, $('iss_trdp_addr',data).text());
			   setFieldValue( formObj.rep_cmdt_cd, $('rep_cmdt_cd',data).text());
			   setFieldValue( formObj.rep_cmdt_nm, $('rep_cmdt_nm',data).text());
			   setFieldValue( formObj.h_rep_cmdt_nm, $('rep_cmdt_nm',data).text());
			   setFieldValue( formObj.pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.inco_cd, $('inco_cd',data).text());
			   setFieldValue( formObj.h_inco_cd, $('inco_cd',data).text());
			   setFieldValue( formObj.rt_clss_cd, $('rt_clss_cd',data).text());
			   setFieldValue( formObj.cargo_tp_cd, $('cargo_tp_cd',data).text());
			   setFieldValue( formObj.agent_grs_wgt, $('agent_grs_wgt',data).text());
			   setFieldValue( formObj.agent_grs_wgt1, $('agent_grs_wgt1',data).text());
			   setFieldValue( formObj.grs_wgt, $('grs_wgt',data).text());
			   setFieldValue( formObj.grs_wgt1, $('grs_wgt1',data).text());
			   setFieldValue( formObj.agent_chg_wgt, $('agent_chg_wgt',data).text());
			   setFieldValue( formObj.agent_chg_wgt1, $('agent_chg_wgt1',data).text());
			   setFieldValue( formObj.chg_wgt, $('chg_wgt',data).text());
			   setFieldValue( formObj.chg_wgt1, $('chg_wgt1',data).text());
			   setFieldValue( formObj.vol_wgt, $('vol_wgt',data).text());
			   setFieldValue( formObj.vol_meas, $('vol_meas',data).text());
			   setFieldValue( formObj.h_vol_meas, $('vol_meas',data).text());
			   setFieldValue( formObj.size_ut_cd1, $('size_ut_cd',data).text());
			   setFieldValue( formObj.wh_recp_no, $('wh_recp_no',data).text());
			   setFieldValue( formObj.agent_unit_chk1, $('agent_unit_chk',data).text());
			   setFieldValue( formObj.agent_rt, $('agent_rt',data).text());
			   setFieldValue( formObj.agent_amt, $('agent_amt',data).text());
			   setFieldValue( formObj.agent_curr_cd, $('agent_curr_cd',data).text());
			   setFieldValue( formObj.h_agent_curr_cd, $('agent_curr_cd',data).text());
			   setFieldValue( formObj.customer_unit_chk1, $('customer_unit_chk',data).text());
			   setFieldValue( formObj.cust_rt, $('cust_rt',data).text());
			   setFieldValue( formObj.cust_amt, $('cust_amt',data).text());
			   setFieldValue( formObj.cust_curr_cd, $('cust_curr_cd',data).text());
			   setFieldValue( formObj.h_cust_curr_cd, $('cust_curr_cd',data).text());
			   setFieldValue( formObj.frt_term_cd, $('frt_term_cd',data).text());
			   setFieldValue( formObj.h_frt_term_cd, $('frt_term_cd',data).text());
			   setFieldValue( formObj.otr_chg_term_cd, $('otr_chg_term_cd',data).text());
			   setFieldValue( formObj.h_otr_chg_term_cd, $('otr_chg_term_cd',data).text());
			   setFieldValue( formObj.profit_share, $('profit_share',data).text());
			   setFieldValue( formObj.h_profit_share, $('profit_share',data).text());
			   setFieldValue( formObj.nomi_flg, $('nomi_flg',data).text());
			   setFieldValue( formObj.decl_crr_val, $('decl_crr_val',data).text());
			   setFieldValue( formObj.decl_cstms_val, $('decl_cstms_val',data).text());
			   setFieldValue( formObj.shp_tp_cd, $('shp_tp_cd',data).text());
			   setFieldValue( formObj.amt_insur_val, $('amt_insur_val',data).text());
			   setFieldValue( formObj.hndl_info_txt, $('hndl_info_txt',data).text());
			   setFieldValue( formObj.mk_txt, $('mk_txt',data).text());
			   setFieldValue( formObj.acctg_info_txt, $('acctg_info_txt',data).text());
			   setFieldValue( formObj.desc_txt, $('desc_txt',data).text());
			   setFieldValue( formObj.wgt_disp_cd, $('wgt_disp_cd',data).text());
			   setFieldValue( formObj.h_wgt_disp_cd, $('wgt_disp_cd',data).text());
			   setFieldValue( formObj.itn_no, $('itn_no',data).text());
			   setFieldValue( formObj.rmk, $('rmk',data).text());
			   
			   setFieldValue( formObj.ctrb_ofc_cd, $('ctrb_ofc_cd',data).text());
			   setFieldValue( formObj.ctrb_dept_cd, $('ctrb_dept_cd',data).text());
			   setFieldValue( formObj.ctrb_ratio_yn, $('ctrb_ratio_yn',data).text());
			   setFieldValue( formObj.ctrb_mgn, $('ctrb_mgn',data).text());
			   
			   setFieldValue( formObj.certi_sts_cd, $('certi_sts_cd',data).text());
			   setFieldValue( formObj.h_certi_sts_cd, $('certi_sts_cd',data).text());
			   
			   //setFieldValue( formObj.xcrtDt, $('etd_dt_tm',data).text());
			   var etddttm = $('etd_dt_tm',data).text().replaceAll('-','');
			   setFieldValue( formObj.xcrtDt, etddttm);
			   
			   setFieldValue( formObj.pre_flt_no, $('flt_no',data).text());
			   setFieldValue( formObj.pre_lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			   setFieldValue( formObj.pre_shpr_trdp_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.pre_iss_trdp_nm, $('iss_trdp_nm',data).text());
			   
			   doBtnAuthority(attr_extension);
			   
			   tab1click='';
			   tab2click='';
			   tab4click='';
			   tab5click='';
			   tab6click='';
			   tab7click='';
			   setupPage();
			   doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}
var bkCheck=0;
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    try {
        switch(srcName) {
           case "NEW":
           		doShowProcess();
        		// clearScreen();
        		// break;
				var currLocUrl=this.location.href;
				currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
				currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
				//parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
				window.location.href = currLocUrl
				break;
           case "SAVE":

        	   /*#47308  스페이스 입력시 null이 입력되는 현상  수정 */
        	   if(trim(frm1.bl_no.value)==""){
        		   frm1.bl_no.value = "";
        	   }

        		if(frm1.intg_bl_seq.value==""){
        			doWork("SAVE_ADD");
        		}
        		else{
        			doWork("SAVE_MODIFY");
        		}
        		break;
           case "HBL_ADD":
        	    var asRef_no = frm1.ref_no.value
        	    var paramStr="./AIE_BMD_0020.clt?";
        	    paramStr+= "f_mbl_ref_no=" + asRef_no;
        	    parent.mkNewFrame('Booking & HBL', paramStr);
        		break;	
           case "SAVE_ADD":	// 등록
               frm1.f_cmd.value=ADD;
               //복사된 Freight를 등록상태로 변경함
           	   resetCopyFrt(getSdSheet(), getBcSheet());
               //if(inpuValCheck(sheetObj, ADD)){
               //	   var sndParam = getSndParam();
           	   if(blCheckInpuValsForAdding()){
           		   
           		   frm1.bl_no.value=trim(frm1.bl_no.value);
           		   frm1.ref_no.value=trim(frm1.ref_no.value);

           		   if(!mblCreate){
	           		   // 기초적인 validation을 먼저 체크한다.
	           		   if(!etdOk){
	           			   //BL Date is later than ETD Date.
	           			   alert(getLabel('AIR_COM_ALT001'));
	           		   }                   		
	           		   //#47308 User가 일부러 스페이스 또는 ""을 BL_NO에 입력했을때 Alert
	           		   if(frm1.bl_no.value == ""){
	           			   if(!confirm(getLabel('AIE_BMD_MSG77'))){
	           				   return;
	           			   }
	           		   }
	           		   if (user_ofc_cnt_cd != "DE") {
	           			   if (frm1.itn_no.value.length == 0) {
	           				   if(confirm(getLabel('AIE_BMD_MSG79')) == false){
	           					   return;
	           				   }
	           			   }
	           		   }
           		   }
           		   //MBL이 없는 경우(ref_no == null)
           		   if(getStringLength(frm1.ref_no.value) == 0){

             		   /** #52165 [Globe Runner] HBL > MBL Create **/
             		   if (confirm(getLabel('FMS_COM_CFMMBLCRE'))){
               			   setPost_date("I");
               			   srOpenPopUp('CREATE_MBL_POPLIST_AEH',this);
               			   mblCreate = true;
             		   } else {
             			   moveTab('01');
             			   frm1.ref_no.focus();
             			   return;
             		   }
           			   
           		   }else{

           			   if (!checkHblRefNo('A','O')) { // #43380 HBL 저장시 Filing No 유효성 체크
           				   return;
           			   }

           			   if(frm1.bl_no.value=="AUTO"){
           				   frm1.bl_no.value="";
           			   }

           			   ajaxSendPost(getHblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=A&f_bnd_clss_cd=O&f_biz_clss_cd=H&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');
           		   }
           	   }
           break;
           case "SAVE_MODIFY":	//등록
        	   //doSumCgoRt();
               frm1.f_cmd.value=MODIFY;
	    	   if(blCheckInpuVals()){
	    		   //#48103 remove space
              	   frm1.bl_no.value=trim(frm1.bl_no.value);
              	   frm1.ref_no.value=trim(frm1.ref_no.value);
              		
	    		   if (!checkHblRefNo('A','O')) { // #43380 HBL 저장시 Filing No 유효성 체크
            		   return;
            	   }
	    		   
	    		   if(!etdOk){
	          			//BL Date is later than ETD Date.
	          			alert(getLabel('AIR_COM_ALT001'));
	          		}
	    		    if(!etdRangeOk){
	           			//[Warning] ETD is outside range of 6 months from today. \nPlease kindly check ETD  again.
	           			alert(getLabel('FMS_COM_ALT021'));
	    		    }
	          		if(frm1.bl_no.value=="AUTO"){
	          			frm1.bl_no.value="";
	          		}
	          		
	          		// alert('user_ofc_cnt_cd>>'+user_ofc_cnt_cd);
	          		if (user_ofc_cnt_cd != "DE") {
		          		if (frm1.itn_no.value.length == 0) {
		          			if(confirm(getLabel('AIE_BMD_MSG79')) == false){
		          				return;
		          			}
		          		}
	          		}
	          		
	          		if(frm1.h_bl_no.value!=frm1.bl_no.value){
	          			ajaxSendPost(getHblCheckModify, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=A&f_bnd_clss_cd=O&f_biz_clss_cd=H&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');
	          		}
	          		else{
	          			//BL No. 가 없을 경우
	     			   //The [HB/L No.] is Blank. Generate the Number? Yes/No. Yes 일 경우 Save 진행 
	     			   var blNullChk=true;
	           		   if(frm1.bl_no.value == ""){
	           			   blNullChk=confirm(getLabel('AIE_BMD_MSG77'));
	           		   }
	           		   if(blNullChk){
	              			if(confirm(getLabel('FMS_COM_CFMSAV'))){
	                		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
	                		   var sndParam=getSndParam();
	                		   if(sndParam == true)	{	return false;	}	                      				
	              				//var sndParam = getSndParam();
	              				gridAdd(0);
	                     	    docObjects[0].SetCellValue(1, 1,1);
	                     	    frm1.f_bl_no.value=frm1.bl_no.value;
	                     	    doShowProcess();
	              				//docObjects[0].DoAllSave("./AIE_BMD_0020GS.clt", FormQueryString(frm1)+sndParam, true);
	              				docObjects[0].DoAllSave("./AIE_BMD_0020GS.clt", FormQueryString(frm1)+sndParam, true);
	              			}
	           		   }	
	          		}
	           }
	    	   break;
           case "CLOSE_MODIFY":	//등록
        	   frm1.f_cmd.value=COMMAND10;
        	   if(confirm(getLabel('FMS_COM_CFMSAV'))){
		    	   gridAdd(0);
				   docObjects[0].SetCellValue(1, 1,1);
				   frm1.f_bl_no.value=frm1.bl_no.value;
        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
        		   var sndParam=getSndParam();
        		   if(sndParam == true)	{	return false;	}					   
				   doShowProcess();
				   //docObjects[0].DoAllSave("./AIE_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
				   docObjects[0].DoAllSave("./AIE_BMD_0020GS.clt", FormQueryString(frm1)+sndParam, true);
        	   }
        	   break;
           case "SEARCHLIST":	//조회
			   frm1.f_bl_no.value=trim(frm1.f_bl_no.value);
        	   //if(frm1.f_bkg_no.value==''&&frm1.f_bl_no.value==''){
        	   if(frm1.f_bl_no.value==''){
        		   alert(getLabel('FMS_COM_ALT014'));
        		   frm1.f_bl_no.focus();
        		   return;
        	   }
        	   else{
        		   //if(frm1.f_bkg_no.value==''&&frm1.f_bl_no.value!=''){
        		   if(frm1.f_bl_no.value!=''){
        			   frm1.f_intg_bl_seq.value='';
        		   }
        		   
        		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
        		   
                   frm1.f_cmd.value=SEARCHLIST;
            	   doShowProcess();
            	   //frm1.submit();
            	   submitForm(SEARCHLIST);
        	   }
        	   break;
           case "DOCFILE":	//첨부파일
       		
        	   	var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
        	   
	       		/**  Document List ==> Common Memo 연동 파라미터 (S) */
	       		reqParam += '&palt_mnu_cd=AEH';
	       		reqParam += '&opr_no='+frm1.f_bl_no.value;
	       		/**  Document List ==> Common Memo 연동 파라미터 (E) */
        		
           		reqParam += '&openMean=SEARCH01';
       	   		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDoc', 806, 450, "scroll:no;status:no;help:no;");
       	   		break;
           case "SNDEML":	//Email전송
        	   var 	reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
          			reqParam += '&openMean=SEARCH01';
          	   popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
          	   break;
           case "BKGCNF":	//Booking Confirm
        	   //Booking등록을 완료하시겠습니까?
        	   if(confirm(getLabel('FMS_COM_CFMCFM'))){
                   frm1.f_cmd.value=COMMAND01;
                   doShowProcess();
             	   docObjects[0].DoSearch("./AIE_BMD_0020GS.clt", FormQueryString(frm1) );
        	   }
        	   break;
           case "HBLCRE":	//HBL CREATE
        	   var sndParam=getSndParam();
        	   if(!isError){
        		   if(bkCheck==0){
        			   /*
		        	   if(frm1.doBlKeyIn.checked){
		        		   if(frm1.bl_no.value==''){
		        			   alert(getLabel('AIR_MSG_071'));
		        			   frm1.bl_no.focus();
		        		   }else{
		        			   ajaxSendPost(getHblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=A&f_biz_clss_cd=H&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');   
		        		   }
		        	   }else{
		        	   */
		            	   if(confirm(getLabel('FMS_COM_CFMCRE'))){
		                       frm1.f_cmd.value=COMMAND02;
		                       doShowProcess();
 		                	   docObjects[0].DoSearch("./AIE_BMD_0020GS.clt", FormQueryString(frm1) );
		            	   }
		        	   //}
        		   }
        		   else{
        			   //Please "Save" information before HBL Creation!
        			   alert(getLabel('FMS_COM_ALT015'));
        		   }
        	   }
        	   else{
        		   bkCheck=99;
        	   }
        	   break;
           case "HBLCNF":	//HBL Confirm
        	   if(isStsOk){
	        	   if(confirm(getLabel('FMS_COM_CFMCFM'))){
	                   frm1.f_cmd.value=COMMAND03;
	                   doShowProcess();
 	            	   docObjects[0].DoSearch("./AIE_BMD_0020GS.clt", FormQueryString(frm1) );
	        	   }
        	   }
        	   break;
           case "HBLCLS":	//Booking Closing
        	   if(confirm(getLabel('FMS_COM_CFMCLS'))){
                   frm1.f_cmd.value=COMMAND04;
                   doShowProcess();
            	   docObjects[0].DoSearch("./AIE_BMD_0020GS.clt", FormQueryString(frm1) );
        	   }
        	   break;
           case "COPY":	//조회
        	   //BL_COPY COPY시 컨펌메시지 없이 바로 Submit후 frt Check화면을 보여준다
        	   frm1.f_cmd.value=COMMAND05;
        	   doShowProcess();
        	   frm1.submit();
        	   /*if(confirm(getLabel('FMS_COM_CFMCPY'))){
                   frm1.f_cmd.value=COMMAND05;
            	   doShowProcess();
            	   //frm1.submit();
            	   submitForm(COMMAND05);
        	   }*/
        	   break;
	   	 	case "S_DOC":
	   	 	var sheetObj3=docObjects[6];	
   	 		if(sheetObj3.GetTotalRows()> 0){
		   	 		var formObj=document.frm1;
		   	 		formObj.file_name.value='doc_list.mrd';
		   	 		formObj.title.value='Document List';
		   	 		//Parameter Setting
		   	 		var param='[' + formObj.intg_bl_seq.value + ']';			// [1]
		   	 		param += '[AEH]'; 								// [2]  MASTER/HOUSE/OTH 여부
		   	 		param += '[' + formObj.bl_no.value + ']';				// [3] MBL_NO/HBL_NO
		   	 		param += '[' + formObj.user_id.value + ']';				// [4]
		   	 		formObj.rd_param.value=param;
		   	 		popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
	   	 		break;
           case "REMOVE"://삭제
        	   if(isStsOk){
//	        	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
//	                   frm1.f_cmd.value = REMOVE;
//	            	   doShowProcess();
//	            	   frm1.submit();
//	        	   }
        		   ajaxSendPost(checkBlInvReq, 'reqVal', '&goWhere=aj&bcKey=getCheckInv&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
        		   if(isInvStsOk){
    	        	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
    	                   frm1.f_cmd.value=REMOVE;
    	            	   doShowProcess();
    	            	   //frm1.submit();
    	            	   submitForm(REMOVE);
    	        	   }
        		   }
        		   else{
        			   //You Cannot delete B/L. Because Invoice was already Issued.
        			   alert(getLabel('FMS_COM_ALT022'));
        		   }
        	   }
        	   break;
           case "WORKORDER":	//Work Order 화면호출
        	   /*
              	frm1.f_cmd.value=SEARCH01;
                doShowProcess();
                frm1.action="./SEC_WOM_0010.clt?f_intg_bl_seq="+frm1.intg_bl_seq.value;
                frm1.submit();
                */
	           	var param='f_intg_bl_seq=' + frm1.intg_bl_seq.value;
	           	param += '&air_sea_clss_cd=A'; 
	           	param += '&bnd_clss_cd=O';
	           	param += '&biz_clss_cd=H';
			    //#34862 - [BINEX]Work Order - Trucker 정보 Link
			    param += '&pickup_ref_no=' + document.frm1.exp_ref_no.value;
                var paramStr="./AIC_WOM_0015.clt?f_cmd="+SEARCH01+"&" + param;
                parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
                break;
           case "SEARCH_XPT":	//수출신고 번호 조회
          		if(frm1.bl_sts_cd.value!='NA'){
          			searchGrid(3);
	   				//searchGrid(4);
          		}
          		break;
           case "SEARCH_ITEM":	//Item 조회
         		if(frm1.bl_sts_cd.value!='NA'){
         			//Commodity List 조회
        			searchGrid(11);
         		}
         		break;
           case "SEARCH_FRT":	//Freight 조회
       			if(frm1.bl_sts_cd.value!='NA'){
       				//Selling/Debit Freight 조회
       				searchGrid(5);
       				//Buying/Crebit List 조회
       				searchGrid(6);
       				//Debit/Crebit List 조회
       				searchGrid(10);
       			}
       			break;   
           case "SEARCH_WO":	//WORK ORDER 조회
        	   if(frm1.bl_sts_cd.value!='NA'){
				   //Container List 조회
        		   searchGrid(7);
        	   }
        	   break;
           case "SEARCH_JB":	//Job template & History
        	   if(frm1.bl_sts_cd.value!='NA'){
        		 //처리내역( Job temlate에 따라서)   
        		 searchGrid(8);
        		 //처리내역( Job temlate에 따라서)
        		 searchGrid(9);
        		 searchGrid(2);
        	   }
        	   break;
           case "SEARCH_HWIFRT":	// Hawaii Freight 탭의 목록조회
          		if(frm1.bl_sts_cd.value!='NA'){
   				// Hawaii Freight List 조회
          			searchGrid(12);
          		}
          		break;
	   	   case "CALLCT":
	   		   ajaxSendPost(getCtradeAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCtradeKey', './GateServlet.gsl');
	   		   break;
	   	   case "PRINT":
	   		   if(frm1.bl_no.value==""){
	   			   //Please Search...
	   			   alert(getLabel('FMS_COM_ALT029'));
	   			   return;
	   		   }
	   		   var param='intg_bl_seq=' + frm1.intg_bl_seq.value;
	   		   param += '&house_bl_no=' + frm1.bl_no.value; 
	   		   param += '&biz_clss=House';
	   		   param += '&by_carr=' + frm1.flt_no.value + " " + escape(frm1.lnr_trdp_nm.value);
	   		   //#23991 oyh Air-HBL 서드파티 삭제되고 Issung Carrier로 대체됨 
	   		   var issAddr=escape(frm1.iss_trdp_nm.value);	   		 
	   		   param += '&sign_ship='+issAddr;
	   		   /*	   		   
			   if(frm1.hbl_tp_cd.value=="TP"){
	   			   param += frm1.third_trdp_nm.value;
	   		   //}else if(ref_ofc_eng_nm != ""){
	   		   //   param += ref_ofc_eng_nm;
	   		   }else{
	   			   //param += ref_ofc_eng_nm;
	   			   param += frm1.iss_trdp_nm.value;
					if(user_ofc_cnt_cd=="US"){
		   				param += 'Allstate Int’l Freight USA, Inc. (' + frm1.ref_ofc_cd.value + ')';
		   			}else if(user_ofc_cnt_cd=="DE"){
		   				param += 'Atlantic Integrated Freight GmbH';
		   			}else if(user_ofc_cnt_cd=="IT"){
		   				param += 'Atlantic Integrated Freight S.R.L.';
		   			}else if(user_ofc_cnt_cd=="FR"){
		   				param += 'Atlantic Integrated Freight SARL';
		   			}else if(user_ofc_cnt_cd=="JP"){
		   				//param += '';
		   			}else{
		   			}
	   		   }*/
	   		   param += "&sign_ship1=" + "AS AGENT OF " + escape(frm1.shpr_trdp_nm.value);
	   		   //param += "&sign_ship1=" + "AS AGENT OF " + frm1.m_shpr_trdp_nm.value;
	   		   param += "&sign_carr=" + issAddr;
	   		   //#23991 oyh Air-HBL 서드파티 삭제되고 Issung Carrier로 대체됨 
	   		   /*  if(frm1.hbl_tp_cd.value=="TP"){
	   			   param += frm1.third_trdp_nm.value;
	   		   //}else if(ref_ofc_eng_nm != ""){
               //   param += ref_ofc_eng_nm;
	   		   }else{
	   			   //param += ref_ofc_eng_nm;
	   			   param += frm1.iss_trdp_nm.value;
	   			   	if(user_ofc_cnt_cd=="US"){
		   				param += 'Allstate Int’l Freight USA, Inc. (' + frm1.ref_ofc_cd.value + ')';
		   			}else if(user_ofc_cnt_cd=="DE"){
		   				param += 'Atlantic Integrated Freight GmbH';
		   			}else if(user_ofc_cnt_cd=="IT"){
		   				param += 'Atlantic Integrated Freight S.R.L.';
		   			}else if(user_ofc_cnt_cd=="FR"){
		   				param += 'Atlantic Integrated Freight SARL';
		   			}else if(user_ofc_cnt_cd=="JP"){
		   				//param += '';
		   			}else{
		   			}
	   		   }*/
	   		   param += "&sign_carr1=" + "AS AGENT OF THE CARRIER " + escape(frm1.lnr_trdp_nm.value);
	   		   param += '&mailTitle=' + 'House Air Way BL No : ' + frm1.bl_no.value;
	   		   param += '&mailTo=' + '';
	   		   param += '&refOfcCd=' + frm1.ref_ofc_cd.value;
	   		   //alert(param);
	   		   popGET('RPT_PRN_0080.clt?'+param, '', 420, 675, "scroll:yes;status:no;help:no;");
	   		   break;
	   		   
	   	case "HI_PRINT":
	   		var formObj=document.frm1;
	   		
   			if(formObj.intg_bl_seq.value == ""){
   				alert(getLabel('FMS_COM_ALT004'));
   				return;
   			}
   			
   			formObj.title.value="Air Export House AWB";
			formObj.file_name.value="bnxd_hawaii_hbl.mrd";
			
			var intgBlSeq=formObj.intg_bl_seq.value;
			var refOfcCd=formObj.ref_ofc_cd.value;
			
			// Parameter Setting
			var param = '[' + intgBlSeq + ']';
			param += '[' + refOfcCd + ']';
   			param += '[' + v_phn + ']';
   			param += '[' + v_fax + ']';
   			param += '[A]'; // Air/Ocean
			formObj.rd_param.value = param;
			formObj.rpt_biz_tp.value = "AEH";
			formObj.rpt_biz_sub_tp.value = "BL";
			formObj.mailTitle.value = 'House BL No : ' + formObj.bl_no.value;
			
			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			break;
			
	   	   //2010.12.20 김진혁 추가, 항공은 set 버튼을 통해 BL의 CBM, C.weight, G.weight 값을 Freight에 반영함.
	   	   case "SET":
	   		   //Freight에 Row가 없으면 set 할 수 없음. 
 	   		   if(docObjects[2].RowCount()-2==0 && docObjects[3].RowCount()-2==0){
	   			   //세팅할 Freight정보가 없습니다.
	   			   alert(getLabel('FMS_COM_ALT004'));
	   		   }
	   		   else{
	   			   setFrtAuto(docObjects[2], "");
	   			   setFrtAuto(docObjects[3], "b_");
	   		   }
	   		   break;
	   	   //2011.01.05 김진혁 추가, 항공 수출에 H B/L 생성 후 Move to MAWB 기능 추가
		   case "GOTOMBL":
			   var paramStr="./AIE_BMD_0040.clt?f_cmd="+SEARCHLIST02+"&f_hbl_bl_seq="+frm1.intg_bl_seq.value;
			   parent.mkNewFrame('Master AWB Entry', paramStr);
			   break;
		   case "COUNTRY_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
		   		rtnary[0]="1";
		   		rtnary[1]="";
	   	       callBackFunc = "COUNTRY_POPLIST";
	           modal_center_open('./CMM_POP_0020.clt', rtnary, 560,480,"yes");
	   	       
	   	        break;
		   case "GOTOACCT":
		   		var formObj=document.frm1;
	   	 		if(formObj.bl_no.value!=''){
		   		   	var paramStr="./ACC_INV_0040.clt?";
		   		   	paramStr+= 's_hbl_no=' + formObj.bl_no.value;
		   		   	paramStr+= '&s_intg_bl_seq=' + formObj.intg_bl_seq.value;
		   		   	paramStr+= "&s_ref_no=" + formObj.ref_no.value;
		   		   	parent.mkNewFrame('Invoice List', paramStr);
	   	 		}
	   	 		break;
		   case "AES":
			   var formObj=document.frm1;
			   if(formObj.bl_no.value!=""){
				   var paramStr="./AIE_BMD_0120.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+formObj.bl_no.value;
				   parent.mkNewFrame('A.E.S', paramStr);
			   }
			   break;
		   case "ShippingAdvice":
			   var formObj=document.frm1;
				var blNo=formObj.bl_no.value;
				var intgBlSeq=formObj.intg_bl_seq.value;
				var refOfcCd=frm1.ref_ofc_cd.value;
				var refOfcCnt=user_ofc_cnt_cd;
				//HBL의 ref_ofc의 국가코드가 독일일 경우 바로 프린트 창을 띄움
				
				//if(refOfcCnt != "DE"){
					var reqParam='?air_sea_tp=' + 'A';
					reqParam += '&bl_no=' + blNo;
					reqParam += '&intg_bl_seq=' + intgBlSeq;
					reqParam += '&ref_ofc_cd=' + refOfcCd;
					reqParam += '&mailTitle=' + 'Shipping Advice [Air Export House BL No : ' + formObj.bl_no.value + ']';
	         		var trdp_cd='';
	         		trdp_cd += '(' + '\'' + formObj.shpr_trdp_cd.value + '\'' + ')';
	         		ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
	         		reqParam += '&mailTo=' + mailTo;
					popGET('RPT_PRN_0120.clt'+reqParam, '', 400, 380, "scroll:yes;status:no;help:no;");
				
				/*
        		}else{
					formObj.title.value='Shipping Advice';
					formObj.file_name.value='shipping_advice_ae_hawb_de_01.mrd';
					//Parameter Setting
					var param='[' + intgBlSeq + ']';
					formObj.rd_param.value=param;
					formObj.mailTitle.value='Shipping Advice [Air Export House BL No : ' + formObj.bl_no.value + ']';;
					var trdp_cd='';
	         		trdp_cd += '(' + '\'' + formObj.shpr_trdp_cd.value + '\'' + ')';
					ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
					formObj.mailTo.value=mailTo;
					popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
				*/
				
          	break;
	   	 	/* #20428 : [BINEX] A/R, A/P, D/C등이 보이는 화면에서 Profit Report 버튼 추가 (Entry 화면에서) jsjang 2013.9.10 */	
	   	 	case "PROFIT_REPORT":
				var reqParam='?intg_bl_seq=' + frm1.intg_bl_seq.value;
					reqParam += '&hbl_no=' + frm1.bl_no.value;
					reqParam += '&ref_no=' + frm1.ref_no.value;
					reqParam += '&air_sea_clss_cd=' + "A";
					reqParam += '&bnd_clss_cd=' + "O";
					reqParam += '&biz_clss_cd=' + "H";
					reqParam += '&mbl_no=' + frm1.mbl_no.value;				
					popGET('RPT_PRN_0200.clt'+reqParam, '', 1100, 650, "scroll:yes;status:no;help:no;");
		   	 	break;	        
	   	 case "AIR_LABEL":
				/*if(sheetObj1.GetTotalRows()== 0){
					//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
				}else{*/
					var reqParam='';
					reqParam += '?intg_bl_seq=' + frm1.intg_bl_seq.value;
					reqParam += '&biz_clss_cd=' + "H";
					popGET('AIE_BMD_0061.clt'+reqParam, '', 600, 330, "scroll:yes;status:no;help:no;");
				//}
        	break;	
        }
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        } 	
    }
}
//2010.12.20 김진혁 추가, 앞의 정보 중C.Weight, G.Weight, CBM 값을 Freight에 끌어오는 로직
function setFrtAuto(sheetObj, prepix) {
 	for(var i=2;i<sheetObj.RowCount();i++){
 		if(sheetObj.GetCellValue(i, prepix+"fr_inv_sts_cd")=="FI" || sheetObj.GetCellValue(i, prepix+"fr_inv_sts_cd")==""){
 			if(sheetObj.GetCellValue(i, prepix+"fr_aply_ut_cd") == "ACW") {
				sheetObj.SetCellValue(i, prepix+"fr_qty",frm1.chg_wgt.value);
 			}else if(sheetObj.GetCellValue(i, prepix+"fr_aply_ut_cd") == "AGW"){
				sheetObj.SetCellValue(i, prepix+"fr_qty",frm1.grs_wgt.value);
 			}else if(sheetObj.GetCellValue(i, prepix+"fr_aply_ut_cd") == "AMT"){
				sheetObj.SetCellValue(i, prepix+"fr_qty",frm1.meas.value);
			}
		}
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
			myform.insertBefore(createHidden("returnUrl","http://www.ctradeworld.com/logis/mf/mf3510q0.jsp"));
			myform.action="http://www.ctradeworld.com/ctwpass/autoLoginChk.jsp";
			myform.method="post";
			myform.target="winName";
			window.open("about:blank","winName",'left=100, width=680, height=600');
			myform.submit();
		}
	}
}
/**
 * 화면이동
 */
function goToBlPage(toPage, toNo){
	if(toNo!==''){
		if(toPage=='view_hbl'){
		   	var paramStr="./AIE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+toNo;
		   	parent.mkNewFrame('Booking & House AWB Entry', paramStr);
		}else if(toPage=='view_mbl'){
		   	var paramStr="./AIE_BMD_0040.clt?f_cmd="+SEARCHLIST;
		   	paramStr+= '&f_bl_no='+toNo+'&f_hbl_intg_bl_seq='+frm1.intg_bl_seq.value;
		   	parent.mkNewFrame('Master AWB Entry', paramStr);
		}
	}
}
//화면로드시 데이터 표시
function loadData(){
	if(frm1.bl_sts_cd.value!='NA'){
		//searchGrid(1);
		//searchGrid(2);
	}else{
		//searhCopyFrt();
		
		//BL_COPY
		var orgBlSeq = frm1.copy_bl_seq.value;
		if (orgBlSeq != "") {
			selectCopyBLFrt();
		}
	}
	if(frm1.intg_bl_seq.value!=""){
		//currency를 database에 있는 값으로 셋팅함
		frm1.agent_curr_cd.value=frm1.h_agent_curr_cd.value;
		frm1.cust_curr_cd.value=frm1.h_cust_curr_cd.value;
		frm1.frt_term_cd.value=frm1.h_frt_term_cd.value;
		frm1.otr_chg_term_cd.value=frm1.h_otr_chg_term_cd.value;
		frm1.wgt_disp_cd.value=frm1.h_wgt_disp_cd.value;
		frm1.certi_sts_cd.value=frm1.h_certi_sts_cd.value;
		
		//frm1.hndl_info_txt.value = $("input[name='h_aeh_hand_info']").val();
		//attach rider 체크
		rowCount(frm1, 15, frm1.rider_lbl);
		//sizeUtCd 셋팅
		setSizeUtCd(frm1.size_ut_cd1.value);
		setUtCd();
		searchGrid(3);
		searchGrid(1);
//		frm1.bl_no.className = 'search_form-disable';
//		frm1.bl_no.readOnly  = true;
	}else{
		//Copy 인 경우 셋팅을 해줘야 한다.
		//if(copy_hndl_info==""){
			/* jsjang 2013.08.22 office, ae_hand_info 정보 처리 변경 */
			//frm1.hndl_info_txt.value = ae_hand_info;
		//}
		
		if(frm1.copy_bl_seq.value == "") {
			frm1.hndl_info_txt.value=$("input[name='h_aeh_hand_info']").val();
		}
		
		if (docObjects[1].GetEditable() == 0) {
			docObjects[1].SetEditable(1);
		}
		
		cargoDesc();
	}
	
	//#41634 - [DMS] Default Cursor Position Change
	frm1.bl_no.focus();
}
function searchGrid(gridIdx){
	switch(gridIdx){
		case 1:
			//RCP List 조회
	        frm1.f_cmd.value=SEARCHLIST01;
 	 	   	docObjects[9].DoSearch("./AIE_BMD_0021_1GS.clt", FormQueryString(frm1) );
		break;
		case 2:
			//Doccument File List 조회
	        frm1.f_cmd.value=SEARCHLIST02;
 	 	   	docObjects[6].DoSearch("./AIE_BMD_0021_2GS.clt", FormQueryString(frm1) );
		break;
		case 3:
			//Dimension
			frm1.f_cmd.value=SEARCHLIST04;
			//alert(frm1.f_cmd.value)
 			docObjects[1].DoSearch("./AIE_BMD_0022_1GS.clt", FormQueryString(frm1) );
		break;
		case 4:
			//수출신고 번호 조회
			frm1.f_cmd.value=SEARCHLIST03;
 			docObjects[9].DoSearch("./AIE_BMD_0022GS.clt", FormQueryString(frm1) );
		break;
		case 5:
			//Selling/Debit Freight 조회
			frm1.f_cmd.value=SEARCHLIST06;
			docObjects[2].DoSearch("./AIE_BMD_0024GS.clt", FormQueryString(frm1) );
		break;
		case 6:
			//Buying/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST07;
 			docObjects[3].DoSearch("./AIE_BMD_0024_1GS.clt", FormQueryString(frm1) );
		break;
		case 7:
			//WorkOrder List 조회
			frm1.f_cmd.value=SEARCHLIST08;
 			docObjects[4].DoSearch("./AIE_BMD_0025GS.clt", FormQueryString(frm1) );
		break;
		case 8:
			//처리내역( Job temlate에 따라서)
			frm1.f_cmd.value=SEARCHLIST09;
 			docObjects[5].DoSearch("./AIE_BMD_0026GS.clt", FormQueryString(frm1) );
		break;
		case 9:
			//Change Log
			frm1.f_cmd.value=SEARCHLIST10;
			docObjects[7].DoSearch("./AIE_BMD_0026_1GS.clt", FormQueryString(frm1) );
		break;
		case 10:
			//Change Log
			frm1.f_cmd.value=SEARCHLIST12;
 			docObjects[8].DoSearch("./AIE_BMD_0024_2GS.clt", FormQueryString(frm1) );
		break;
		case 11:
			//Commodity List 조회
			frm1.f_cmd.value=SEARCHLIST05;
 			docObjects[10].DoSearch("./AIE_BMD_0022_2GS.clt", FormQueryString(frm1) );
			break;
		case 12:
			// Hawaii Freight List 조회
			frm1.f_cmd.value=SEARCHLIST13;
 			docObjects[11].DoSearch("./AIE_BMD_0029GS.clt", FormQueryString(frm1) );
			break;
	}
}
/**
 * 파일 업로드 팝업에서 목록 Reload
 */
function reloadDocList(){
	searchGrid(2);
}
function getHblCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bl_no.value!=""){
				/*
				 * 2012.02.24
				 * 중복되면 저장 수행 안함
				 */
				//HAWB No. is duplicate.
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_HAWB'));
				frm1.bl_no.focus();
//
//				//B/L No. is duplicated. \nDo you want to create HAWB?
//				if(confirm(getLabel('FMS_COM_ALT008') + getLabel('FMS_COM_CFMCON'))){
//	            	   gridAdd(0);
//	            	   docObjects[0].CellValue(1, 1) = 1;
//	            	   
//	            	   //save post date, office info
//	            	   if(ofc_post_dt=="ETD"){
//	            		   frm1.post_dt.value = frm1.etd_dt_tm.value;
//	            	   }else if(ofc_post_dt=="ETA"){
//	            		   frm1.post_dt.value = frm1.eta_dt_tm.value;
//	            	   }
//	            	   
//	            	   doShowProcess();
//	                   frm1.f_cmd.value = ADD;
//	            	   docObjects[0].DoAllSave("./AIE_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
//	        	   }
//				
			}else{
				if(isMBLCreated || confirm(getLabel('FMS_COM_CFMSAV'))){
	    		   resetCopyFrt(getSdSheet(), getBcSheet());
	    		   gridAdd(0);
            	   docObjects[0].SetCellValue(1, 1,1);
//            	   //save post date, office info
//            	   if(ofc_post_dt=="ETD"){
//            		   frm1.post_dt.value = frm1.etd_dt_tm.value;
//            	   }else if(ofc_post_dt=="ETA"){
//            		   frm1.post_dt.value = frm1.eta_dt_tm.value;
//            	   }
        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
        		   var sndParam=getSndParam();
        		   if(sndParam == true)	{	return false;	}
        		   
        		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
        		   
            	   doShowProcess();
            	   //docObjects[0].DoAllSave("./AIE_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
            	   docObjects[0].DoAllSave("./AIE_BMD_0020GS.clt", FormQueryString(frm1)+sndParam, true);
            	   isMBLCreated = false;
        	   }			
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function getHblCheckModify(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bl_no.value!=""){
				/*
				 * 2012.02.24
				 * 중복되면 저장 수행 안함
				 */
				//HAWB No. is duplicate.
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_HAWB'));
				frm1.bl_no.focus();
//
//				//B/L No. is duplicated. \nDo you want to create HAWB?
//				if(confirm(getLabel('FMS_COM_ALT008') + getLabel('FMS_COM_CFMCON'))){
//	            	   gridAdd(0);
//	            	   docObjects[0].CellValue(1, 1) = 1;
//	            	   
//	            	   //save post date, office info
//	            	   if(ofc_post_dt=="ETD"){
//	            		   frm1.post_dt.value = frm1.etd_dt_tm.value;
//	            	   }else if(ofc_post_dt=="ETA"){
//	            		   frm1.post_dt.value = frm1.eta_dt_tm.value;
//	            	   }
//	            	   
//	            	   doShowProcess();
//	                   frm1.f_cmd.value = ADD;
//	            	   docObjects[0].DoAllSave("./AIE_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
//	        	   }
//				
			}else{
				//BL No. 가 없을 경우
 			    //The [HB/L No.] is Blank. Generate the Number? Yes/No. Yes 일 경우 Save 진행 
 			    var blNullChk=true;
       		    if(frm1.bl_no.value == ""){
       			    blNullChk=confirm(getLabel('AIE_BMD_MSG77'));
       		    }
       		    if(blNullChk){
					if(confirm(getLabel('FMS_COM_CFMSAV'))){
		    		   resetCopyFrt(getSdSheet(), getBcSheet());
		    		   gridAdd(0);
	            	   docObjects[0].SetCellValue(1, 1,1);
	//            	   //save post date, office info
	//            	   if(ofc_post_dt=="ETD"){
	//            		   frm1.post_dt.value = frm1.etd_dt_tm.value;
	//            	   }else if(ofc_post_dt=="ETA"){
	//            		   frm1.post_dt.value = frm1.eta_dt_tm.value;
	//            	   }
	        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
	        		   var sndParam=getSndParam();
	        		   if(sndParam == true)	{	return false;	}	            	   
	            	   doShowProcess();
	            	   //docObjects[0].DoAllSave("./AIE_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
	            	   docObjects[0].DoAllSave("./AIE_BMD_0020GS.clt", FormQueryString(frm1)+sndParam, true);
	        	   }	
       		    }	
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//파일 다운로드
function downloadFile(downType, s_intg_bl_seq, s_palt_doc_seq){
	document.frm2.docType.value=downType;
	document.frm2.s_palt_doc_seq.value=s_palt_doc_seq;
	document.frm2.intg_bl_seq.value = s_intg_bl_seq;
	//document.frm2.target = '_self';
	document.frm2.submit();
}
//직접입력 여부
function doKeyInCheck(obj, numTp){
	if(numTp=='bk'){
		if(obj.checked){
//			frm1.bkg_no.className= 'search_form';
//			frm1.bkg_no.readOnly = false;
//			frm1.bkg_no.focus();
		}else{
//			frm1.bkg_no.className= 'search_form-disable';
//			frm1.bkg_no.readOnly = true;
//			frm1.bkg_no.value = '';
		}
	}else{
		if(obj.checked){
			alert(getLabel('AIR_MSG_070'));
//			frm1.bl_no.className= 'search_form';
//			frm1.bl_no.readOnly = false;
//			frm1.bl_no.focus();
		}else{
//			frm1.bl_no.className= 'search_form-disable';
//			frm1.bl_no.readOnly = true;
//			frm1.bl_no.value = '';
		}
	}
}
/**
 * Amount를 계산함
 */
function doSumCgoRt(){
	var isOk=true;
	var cntCnt=docObjects[8].RowCount();
	if(cntCnt==2){
		isOk=false;
	}else if(cntCnt==3){
if(docObjects[8].GetCellValue(2, 'rcp_pce_qty')==''){
			isOk=false;
		}
	}
	if(isOk){
		var grsSum=0;
		var chgSum=0;
		for(var i=2; i < cntCnt; i++){
if(docObjects[8].GetCellValue(i, 'rcp_ibflag')!='D'){
grsSum=getSumFloatByNDecimalTp(grsSum, docObjects[8].GetCellValue(i, 'rcp_grs_wgt'), TP_TRM3);
chgSum=getSumFloatByNDecimalTp(chgSum, docObjects[8].GetCellValue(i, 'rcp_chg_wgt'), TP_TRM3);
			}
		}
		frm1.grs_wgt.value=doMoneyFmt(grsSum);
		frm1.chg_wgt.value=doMoneyFmt(chgSum);
	}
}
/**
 * 화면초기화
 */
function clearScreen(){
	doShowProcess();
    frm1.f_cmd.value='';
    frm1.submit();
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	var isModi=true;
	if(errMsg==''&&frm1.intg_bl_seq.value==''){
		frm1.f_intg_bl_seq.value=docObjects[0].GetCellValue(1, "sv_intg_bl_seq");
		frm1.intg_bl_seq.value=docObjects[0].GetCellValue(1, "sv_intg_bl_seq");
		frm1.bl_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bl_sts_cd");
		frm1.bl_sts_label.value=docObjects[0].GetCellValue(1, "sv_bl_sts_label");
		//frm1.bkg_no.value       = docObjects[0].CellValue(1, "sv_bkg_no");
		//frm1.f_bkg_no.value     = frm1.bkg_no.value;
		frm1.f_bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
		frm1.bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
		frm1.h_bl_no.value=frm1.bl_no.value;
		//frm1.bkg_no.readOnly  = true; 
		//frm1.bkg_no.className = 'search_form-disable';
//		frm1.bl_no.className = 'search_form-disable';
//		frm1.bl_no.readOnly  = true;
		//Freight항목을 조회함
	    var etd=frm1.etd_dt_tm.value;
	    getXcrtInfo(etd.replaceAll('-', ''));
	    isModi=false;
	}else{
		// #50048 - [IMPEX] B/L PRINT HISTORY 저장관련 ENTRY 화면에서 CODE FIELDS 저장시 업데이트
		if(AE_BL_HIS_UPDATE == "Y"){
			
			var v_param = "";
			
			if((frm1.pre_flt_no.value != frm1.flt_no.value) || (frm1.pre_lnr_trdp_nm.value != frm1.lnr_trdp_nm.value)){
				v_param += "&by_carr=" + frm1.flt_no.value + " " + escape(frm1.lnr_trdp_nm.value);
			}
			if((frm1.pre_iss_trdp_nm.value != frm1.iss_trdp_nm.value) || (frm1.pre_lnr_trdp_nm.value != frm1.lnr_trdp_nm.value)){
				v_param += "&sign_carr=" + escape(frm1.iss_trdp_nm.value) + "\r\n" + "AS AGENT OF THE CARRIER " + escape(frm1.lnr_trdp_nm.value);
			}
			if((frm1.pre_iss_trdp_nm.value != frm1.iss_trdp_nm.value) || (frm1.pre_shpr_trdp_nm.value != frm1.shpr_trdp_nm.value)){
				v_param += "&sign_ship=" + escape(frm1.iss_trdp_nm.value) + "\r\n" + "AS AGENT OF " + escape(frm1.shpr_trdp_nm.value);
			}
			ajaxSendPost(funcTemp, "reqVal", "&goWhere=aj&bcKey=modifyBLPrintOptInfo&intg_bl_seq="+frm1.intg_bl_seq.value+"&prn_type=OEH"+v_param, "./GateServlet.gsl");
		}
	}
	
	frm1.bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
	frm1.h_bl_no.value=frm1.bl_no.value;
	frm1.f_bl_no.value=frm1.bl_no.value;
	frm1.h_profit_share.value=frm1.profit_share.value;
	
	frm1.pre_flt_no.value = frm1.flt_no.value;
	frm1.pre_lnr_trdp_nm.value = frm1.lnr_trdp_nm.value;
	frm1.pre_shpr_trdp_nm.value = frm1.shpr_trdp_nm.value;
	frm1.pre_iss_trdp_nm.value = frm1.iss_trdp_nm.value;
	
	if(rcpListSheet){
		searchGrid(1);
	}
	if(docListSheet){
		searchGrid(2);
	}
	if(dimListSheet){
		searchGrid(3);
	}
	if(cmdtListSheet){
		searchGrid(11);
	}
	if(xptListSheet){
		//searchGrid(4);
	}
	if(frtSdSheet){
		searchGrid(5);
	}
	if(frtBcSheet){
		searchGrid(6);
	}
	if(frtDcSheet){
		searchGrid(10);
	}
	if(jobListSheet){
		searchGrid(8);
	}
	if(hwiFrtListSheet){
		searchGrid(12);
	}
	//목록 Flag 초기화
	rcpListSheet=false;
	bkgCntrSheet=false;
	docListSheet=false;
	xptListSheet=false;
	frtSdSheet=false;
	frtBcSheet=false;
	frtDcSheet=false;
	hwiFrtListSheet=false;
	//버튼 초기화
	btnLoad();
	//수정시 환률재 조회
	if(isModi){
		//Freight항목을 조회함
	    var obdt=frm1.etd_dt_tm.value;
	    obdt=obdt.replaceAll('-', '');
	    if(obdt!==frm1.xcrtDt.value){
		    getXcrtInfo(obdt);
	    }
	}
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}

function funcTemp(){
	
}

/**
 * Status Grid
 */
function sheet1_OnSearchEnd(errMsg){
	frm1.bl_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bl_sts_cd");
	frm1.bl_sts_label.value=docObjects[0].GetCellValue(1, "sv_bl_sts_label");
	//버튼 초기화
	btnLoad();
	if(frm1.f_cmd.value==COMMAND01){
//		frm1.bkg_no.className = 'search_form-disable';
//		frm1.bkg_no.readOnly  = false;
	    bkgCnfObj.style.display='none';
	}else if(frm1.f_cmd.value==COMMAND02){
		var tmpBlNo=docObjects[0].GetCellValue(1, "sv_bl_no");
		if(tmpBlNo!=''){
			//조회해온 결과를 Parent에 표시함
			frm1.bl_no.value=tmpBlNo;
			frm1.mk_bl_no.value=tmpBlNo;
		}
		//버튼 숨기기
		hblCreObj.style.display='none';
//		frm1.bl_no.className = 'search_form-disable';
//		frm1.bl_no.readOnly  = true;
		//hblMk.style.display  = 'none';
	}
	doHideProcess();
}
function gridAdd(objIdx){
 	var intRows=docObjects[objIdx].LastRow()+1;
	docObjects[objIdx].DataInsert(intRows);
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	        var cal=new ComCalendar();
	        cal.select(obj, 'MM-dd-yyyy');
	    break;
    }
}
//Description에 Instrutction을 추가함
function addInst(){
	ajaxSendPost(addInstTxt, 'reqVal', '&goWhere=aj&bcKey=getInstTxt&loc_cd='+frm1.del_cd.value, './GateServlet.gsl');
}
function addInstTxt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(frm1.desc_txt.value==''){
				frm1.desc_txt.value=doc[1];
			}else{
				frm1.desc_txt.value=frm1.desc_txt.value+'\n'+doc[1];	
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
/**
 * 파일목록 조회시. 3번째 Sheet를 리턴함.
 */
function getSelectedFiles(){
	return docObjects[6];
}
//--------------------------------------------------------------------------------------------------------------
//                                             Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
var tab1click='';
var tab2click='';
var tab4click='';
var tab5click='';
var tab6click='';
var tab7click='';
function goTabSelect(isNumSep) {
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	frm1.f_isNumSep.value=isNumSep;	
	var tabObjs=document.getElementsByName('tabLayer');
    if( isNumSep == "01" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='inline';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
        tabObjs[4].style.display='none';
        tabObjs[5].style.display='none';
        if(tab1click == ""){
	        tab1click="Y";
	    }
	    //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
	//Mark Description 탭
    } else if( isNumSep == "02" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='none';
        tabObjs[1].style.display="inline";
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
        tabObjs[4].style.display='none';
        tabObjs[5].style.display='none';
        if(tab2click == ""){
        	tab2click="Y";
        	doWork('SEARCH_ITEM');
        	//doWork('SEARCH_XPT');
        }
    	//스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
	//Freight탭
    }else if( isNumSep == "03" ) {
    	currTab=isNumSep;	//탭상태저장
	    tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='inline';
        tabObjs[3].style.display='none';
        tabObjs[4].style.display='none';
        tabObjs[5].style.display='none';
       
        //BL_COPY
        var copy_bl_seq = frm1.copy_bl_seq.value;
		if (copy_bl_seq == "") {
	        if(tab4click== ""){
	        	tab4click= "Y";
		        doWork('SEARCH_FRT');
	    	}
		}        
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
	//Work Order
    }else if( isNumSep == "04" ) {
    	currTab=isNumSep;	//탭상태저장
	    tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='inline';
        tabObjs[4].style.display='none';
        tabObjs[5].style.display='none';
        if(tab5click== ""){
	        tab5click="Y";
	        doWork('SEARCH_WO');
    	}
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
    }else if( isNumSep == "05" ) {
    	currTab=isNumSep;	//탭상태저장
	    tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
        tabObjs[4].style.display='inline';
        tabObjs[5].style.display='none';
        if(tab6click== ""){
	        tab6click="Y";
	        doWork('SEARCH_JB');
    	}
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
        
     // Hawaii Freight 탭    
    }else if( isNumSep == "06" ) {
    	currTab = isNumSep;	//탭상태저장
    	
        tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
        tabObjs[4].style.display='none';
        tabObjs[5].style.display='inline';
        
        if(tab7click == ""){
        	tab7click = "Y";
        	doWork('SEARCH_HWIFRT');
        }
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
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
var isRun = true;
function loadPage() {
	
	var opt_key = "AE_CERTI_VALIDITY";
	ajaxSendPost(setAeCertiValidityReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	opt_key = "AEH_ISS_CARR_DFT";
	ajaxSendPost(setAehIssCarrDftReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	opt_key = "AE_BL_HIS_UPDATE";
	ajaxSendPost(setAeBlHisUpdateReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	opt_key = "AEH_BL_FRT_CHK_YN";
	ajaxSendPost(setAehBlFrtChkYnReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	if(CERTI_YN == "Y"){
    	getObj("thCertiStsCd").style.display = "inline"; 
    	getObj("tdCertiStsCd").style.display = "inline";
    }
	
	opt_key = "AE_VOL_ROUND";
	ajaxSendPost(setAeVolRoundReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
    for(var i=0;isRun && i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
        if(i == docObjects.length - 1){
        	isRun = false;
        }
    }    
    checkBoxSetting();
    frm1.pck_qty.value=doMoneyFmt(Number(frm1.pck_qty.value).toFixed(0));
    frm1.grs_wgt.value=doMoneyFmt(Number(frm1.grs_wgt.value).toFixed(1));
    frm1.grs_wgt1.value=doMoneyFmt(Number(frm1.grs_wgt1.value).toFixed(1));
    frm1.chg_wgt.value=doMoneyFmt(Number(frm1.chg_wgt.value).toFixed(1));
    frm1.chg_wgt1.value=doMoneyFmt(Number(frm1.chg_wgt1.value).toFixed(1));
    frm1.agent_grs_wgt.value=doMoneyFmt(Number(frm1.agent_grs_wgt.value).toFixed(1));
    frm1.agent_grs_wgt1.value=doMoneyFmt(Number(frm1.agent_grs_wgt1.value).toFixed(1));
    frm1.agent_chg_wgt.value=doMoneyFmt(Number(frm1.agent_chg_wgt.value).toFixed(1));
    frm1.agent_chg_wgt1.value=doMoneyFmt(Number(frm1.agent_chg_wgt1.value).toFixed(1));
    frm1.vol_wgt.value=doMoneyFmt(Number(frm1.vol_wgt.value).toFixed(1));
    frm1.vol_meas.value=doMoneyFmt(Number(frm1.vol_meas.value).toFixed(6));
    frm1.ctrb_mgn.value=doMoneyFmt(Number(frm1.ctrb_mgn.value).toFixed(2));
    
    //collect로 셋팅 98% 업무
    //frm1.frt_term_cd.value = 'CC';
    //frm1.otr_chg_term_cd.value = 'CC';
    if(frm1.intg_bl_seq.value==""){
    
    	//#48588 [Webtrans][게시판#9] AE PACKAGE TYPE INPUT
    	setPckUtCd();
    	//frm1.pck_ut_cd.value="CT";
    	
	    if(user_ofc_cnt_cd=="US"){
			frm1.wgt_disp_cd.value='KL';
		}else{
			frm1.wgt_disp_cd.value='K';
		}
	    frm1.bl_no.value="AUTO";
	    //2012.02.29 rcp 관리 항목 추가
	    gridAdd(9);
	    docObjects[9].SetCellValue(1, "flg","S");
	    gridAdd(9);
	    docObjects[9].SetCellValue(2, "flg","C");
	    docObjects[9].SetBlur();	//IBSheet Focus out 처리
	    
	  //MBL ENTRY 에서 HBL button 을 눌렀을 경우 2012.10.05 LHK
    	if(frm1.ref_no.value!=""){
        	checkRefNo(frm1.ref_no.value);
        }
    	/*20151126 #50563 관련  */
    	ajaxSendPost(getWeightUnit, 'reqVal', '&goWhere=aj&bcKey=getWeightUnit&ofcCd='+frm1.user_offc_cd.value, './GateServlet.gsl');
		
    	
    }
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	goTabSelect(frm1.f_isNumSep.value);    
    if(user_ofc_cnt_cd=="DE"){
    	if(frm1.intg_bl_seq.value==""){
    		//frm1.acctg_info_txt.value = "LBA NO. DE/RA/00491-01/0213" + "\r\n" + "SPX BY ATTACHED CARGO MANIFEST";
    	}
	}
    if(user_ofc_cnt_cd=="JP"){
    	if(frm1.intg_bl_seq.value==""){
    		frm1.disp_ntfy_flg.checked=true;
    		flgChange(frm1.disp_ntfy_flg);
    		if(copy_hndl_info==""){
    			displayChange();
    		}
    	}
	}
    if(frm1.bl_sts_cd.value=='HO' || frm1.bl_sts_cd.value=='HF'){
    	//Accounting Closed. You can only edit following fields.\nShipper / Consignee / Notify Party / Departure / Destination / \n DLD Carriage / DLD Customs / Insurance / AWB Body.');
    	alert(getLabel('AIR_COM_ALT002'));
    }
}             

function getWeightUnit(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0] == "OK"){
    	if(doc[1] == "LB"){
    		frm1.agent_unit_chk2.checked = false;    //K
    		frm1.agent_unit_chk3.checked = true;     //L
    		frm1.customer_unit_chk2.checked = false; //K
    		frm1.customer_unit_chk3.checked = true;  //L
    	}else{
    		frm1.agent_unit_chk2.checked = true;     //K
    		frm1.agent_unit_chk3.checked = false;    //L
    		frm1.customer_unit_chk2.checked = true;  //K
    		frm1.customer_unit_chk3.checked = false; //L
    	}	
    }else{
    	frm1.agent_unit_chk2.checked = true;     //K
		frm1.agent_unit_chk3.checked = false;    //L
		frm1.customer_unit_chk2.checked = true;  //K
		frm1.customer_unit_chk3.checked = false; //L
    }
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
	switch(sheet_obj.id){
		case "sheet1":
			docObjects[0]=sheet_obj;
		break;
		case "sheet4":
			docObjects[1]=sheet_obj;
		break;
		case "sheet6":
			docObjects[2]=sheet_obj;
		break;
		case "sheet7":
			docObjects[3]=sheet_obj;
		break;
		case "sheet10":
			docObjects[4]=sheet_obj;
		break;
		case "sheet11":
			docObjects[5]=sheet_obj;
		break;
		case "sheet3":
			docObjects[6]=sheet_obj;
		break;
		case "sheet12":
			docObjects[7]=sheet_obj;
		break;
		case "sheet14":
			docObjects[8]=sheet_obj;
		break;
		case "sheet2":
			docObjects[9]=sheet_obj;
		break;
		case "sheet8":
			docObjects[10]=sheet_obj;
		break;
		case "sheet13":
			docObjects[11]=sheet_obj;
		break;
	}
	//docObjects[sheetCnt++] = sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
		case 1:     
		    with(sheetObj){

	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0, TabStop:0 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('AIE_BMD_0020_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_intg_bl_seq" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bkg_no" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_no" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_sts_cd" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_sts_label" } ];
	         
	        InitColumns(cols);
	        SetEditable(1);
	        SetVisible(0);
	            }
        break;
		case 2:	//Dimension     
		    with(sheetObj){
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1, TabStop:0 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('AIE_BMD_0020_HDR2_1'), Align:"Center"},
	                      { Text:getLabel('AIE_BMD_0020_HDR2_2'), Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"del",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"dim_ibflag" },
	                {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_len_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	                {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_wdt_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	                {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_hgt_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	                {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_pce_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
	                {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_act_dim" },
	                {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_chg_wgt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
	                {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_chg_wgt1",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
	                {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_meas",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:16 },
	                {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_meas1",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:16 },
	                {Type:"Text",      Hidden:1, Width:52,   Align:"Left",    ColMerge:1,   SaveName:"dim_pck_ut_cd" },
	                {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"dim_seq" },
	                {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"dim_wh_recp_no"}];
	             
	            InitColumns(cols);
	
				SetCountPosition(0);
		        SetEditable(0);
		        SetSheetHeight(120);
		        //sheetObj.SetFocusAfterProcess(0);

	            }


       break;
       //Freight
       case 3:      //Selling/Debit 탭부분 init
    	   if(MULTI_CURR_FLAG == "Y"){	//Muti Currency
    		    with(sheetObj){
    		        var cnt=0;

    		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

    		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    		        var headers = [ { Text:getLabel('AIE_BMD_0020_HDR3_3'), Align:"Center"},
    		                    { Text:getLabel('AIE_BMD_0020_HDR3_4'), Align:"Center"} ];
    		        InitHeaders(headers, info);

    		        var cols = [ 
    		               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    		               {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    		               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		               {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    		               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    		               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		               {Type:"Float",     Hidden:0,  Width:97,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    		               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    		               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    		               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		               {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		               {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		               {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_auto_trf_flg" },
    		               {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_frt_ask_clss_cd" },
    		               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_due_dt" },
    		               {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" } ];
    		         
    		        InitColumns(cols);
    		        SetEditable(1);
    		        SetHeaderRowHeight(20 );
    		        SetHeaderRowHeight(21);
    		  	  	SetColProperty('fr_frt_cd', {ComboText:ARFRTCD2, ComboCode:ARFRTCD1} );
    		  	  	SetColProperty('fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
    		  	  	SetColProperty('fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
    		  	  	SetColProperty('fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
    		  	  	SetColProperty('fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    		  	  	SetColProperty('fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    		  		SetColProperty(0 ,"fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
    		        SetSheetHeight(140);
    		        InitComboNoMatchText(1,"",1);
    			}
    	   }else{
    	      with(sheetObj){
    	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1, TabStop:0 } );

    	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	         var headers = [ { Text:getLabel('AIE_BMD_0020_HDR3_1'), Align:"Center"},
    	                     { Text:getLabel('AIE_BMD_0020_HDR3_2'), Align:"Center"} ];
    	         InitHeaders(headers, info);

    	         var cols = [ 
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    	                {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    	                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	                {Type:"Text",      Hidden:1, Width:50,   Align:"Center",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_auto_trf_flg" },
    	                {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_frt_ask_clss_cd" },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_due_dt" },
    	                {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"CheckBox",   Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N" } ]; 
    	         
    	         InitColumns(cols);

    	         SetEditable(1);
    	         SetHeaderRowHeight(20 );
    	         SetHeaderRowHeight(21);
    	         SetColProperty('fr_frt_cd', {ComboText:ARFRTCD2, ComboCode:ARFRTCD1} );
    	         SetColProperty('fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
	    	     SetColProperty('fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
	    	     SetColProperty('fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
	    	     SetColProperty('fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
	    	     SetSheetHeight(140);
	    	     SetColProperty(0 ,"fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
	    	     SetColProperty(0 ,"fr_inv_curr_cd" , {AcceptKeys:"E" , InputCaseSensitive:1});
	    	     InitComboNoMatchText(1,"",1);
       	}
    	   }
       break;
	   //Freight
       case 4:      //Buying/Credit 탭부분 init
    	   if(MULTI_CURR_FLAG == "Y"){	//Muti Currency
    		      with(sheetObj){
    		          var cnt=0;

    		          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

    		          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    		          var headers = [ { Text:getLabel('AIE_BMD_0020_HDR4_3'), Align:"Center"},
    		                    { Text:getLabel('AIE_BMD_0020_HDR4_4'), Align:"Center"} ];
    		          InitHeaders(headers, info);

    		          var cols = [ 
    		              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    		              {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    		              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    		              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		              {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    		              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    		              {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		              {Type:"Float",     Hidden:0,  Width:97,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    		              {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    		              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    		              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		              {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		              {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		              {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		              {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		              {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_auto_trf_flg" },
    		              {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		              {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		              {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_frt_ask_clss_cd" },
    		              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_due_dt" },
    		              {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		              {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
    		           
    		          	InitColumns(cols);
    		          	SetEditable(1);
    		          	SetHeaderRowHeight(20 );
    		          	SetHeaderRowHeight(21);
    		 		 	SetColProperty('b_fr_frt_cd', {ComboText:APFRTCD2, ComboCode:APFRTCD1} );
    		 			SetColProperty('b_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
    		 			SetColProperty('b_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
    		 			SetColProperty('b_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
    		 			SetColProperty('b_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    		 			SetColProperty('b_fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    		 			SetColProperty(0 ,"b_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
    		            SetSheetHeight(140);
    		            InitComboNoMatchText(1,"",1);
    			}
    	   }else{
    	    with(sheetObj){
    	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1, TabStop:0 } );

    	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	         var headers = [ { Text:getLabel('AIE_BMD_0020_HDR4_1'), Align:"Center"},
    	                     { Text:getLabel('AIE_BMD_0020_HDR4_2'), Align:"Center"} ];
    	         InitHeaders(headers, info);

    	         var cols = [ 
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    	                {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    	                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	                {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_auto_trf_flg" },
    	                {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_frt_ask_clss_cd" },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_due_dt" },
    	                {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Text",  		Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 }];
    	          
    	         InitColumns(cols);

    	         SetEditable(1);
    	         SetHeaderRowHeight(20 );
    	         SetHeaderRowHeight(21);
    	         SetColProperty('b_fr_frt_cd', {ComboText:APFRTCD2, ComboCode:APFRTCD1} );
    	    	 SetColProperty('b_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
    	    	 SetColProperty('b_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
    	    	 SetColProperty('b_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
    	    	 SetColProperty('b_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    	    	 SetSheetHeight(140);
    	    	 SetColProperty(0 ,"b_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
	    	     SetColProperty(0 ,"b_fr_inv_curr_cd" , {AcceptKeys:"E" , InputCaseSensitive:1});
	    	     InitComboNoMatchText(1,"",1);

    	         }
    	   }
       break;
	   //Pickup/WorkOrder 그리드        
       case 5:
    	    with(sheetObj){
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0, TabStop:0 } );
		
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('AIE_BMD_0020_HDR5_1'), Align:"Center"}];
		        InitHeaders(headers, info);
		
		        var cols = [ {Type:"Text",     Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"wo_seq" },
		            {Type:"Text",     Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"wo_no" },
		            {Type:"Combo",     Hidden:0, Width:90,   Align:"Center",  ColMerge:0,   SaveName:"wo_status" },
		            {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"pickup_trdp_nm" },
		            {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"delivery_trdp_nm" },
		            {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"return_trdp_nm" },
		            {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"trucker_trdp_nm" },
		            {Type:"Text",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"act_wgt_k" } ];
		         
		        InitColumns(cols);
		
				SetCountPosition(0);
			    SetEditable(0);
			    SetColProperty('wo_status', {ComboText:"SAVED|ISSUED", ComboCode:"A|B"} );
			    SetSheetHeight(400);       

    	  }

                                  
        break;
        case 6:      //Job Visibility
            with(sheetObj){
        	
	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1, TabStop:0 } );
	
	         var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
	         var headers = [ { Text:getLabel('AIE_BMD_0020_HDR6'), Align:"Center"} ];
	         InitHeaders(headers, info);
	
	         var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"jb_del_chk",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:1,   EditLen:-1 },
	             {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Combo",     Hidden:0, Width:110,  Align:"Left",    ColMerge:1,   SaveName:"jb_sts_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Image",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"jb_sts_img",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"jb_pln_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"jb_pln_tm",     KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"jb_act_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"jb_act_tm",     KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dur_tm_qty",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"modi_usrid",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"jb_tmplt_Seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"jb_ibflag",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
	          
	         InitColumns(cols);
	
			 SetCountPosition(0);
	         SetEditable(1);
	         SetImageList(0,APP_PATH+"/web/img/button/bt_green.gif");
	         SetImageList(1,APP_PATH+"/web/img/button/bt_red.gif");
	                           //no support[check again]CLT InitDataImage(0, 'Status', daCenter);
	         InitViewFormat(0, "jb_pln_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
	         InitViewFormat(0, "jb_act_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
	         SetColProperty('jb_sts_nm', {ComboText:"|"+JBCD2, ComboCode:"|"+JBCD1} );
	         SetSheetHeight(200);
        	}
                                                    
   		break;
        case 7:					//첨부파일
            with(sheetObj){
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0, TabStop:0 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('AIE_BMD_0020_HDR7'), Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"doc_ibflag" },
	                   {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"Del",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                   {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"palt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                   {Type:"Text",      Hidden:0,  Width:55,   Align:"Center",  ColMerge:0,   SaveName:"palt_ext_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:1, Width:140,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"palt_doc_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_msg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_img_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_pdf_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_rmk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq_d",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	             
	            InitColumns(cols);
	
				SetCountPosition(0);
	            SetEditable(1);
				SetImageList(0,APP_PATH+"/web/img/button/bt_img.gif");
		        SetImageList(1,APP_PATH+"/web/img/button/bt_pdf.gif");
	            //no support[check again]CLT 		        InitDataImage(0, 10, daCenter);
	            //no support[check again]CLT 		        InitDataImage(0, 11, daCenter);
	            sheetObj.SetDataLinkMouse("palt_doc_nm",1);
	            sheetObj.SetDataLinkMouse("palt_doc_img_url",1);
	            sheetObj.SetDataLinkMouse("palt_doc_pdf_url",1);
	            SetSheetHeight(200);
          }

                              
	   break;
        case 8:      //HISTORY
            with(sheetObj){
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0, TabStop:0 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel("AIE_BMD_0020_HDR8"), Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"Float",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cng_seq" },
	                   {Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"itm_lbl" },
	                   {Type:"Text",     Hidden:0,  Width:310,  Align:"Left",    ColMerge:0,   SaveName:"bfr_cng_txt" },
	                   {Type:"Text",     Hidden:0,  Width:310,  Align:"Left",    ColMerge:0,   SaveName:"aft_cng_txt" },
	                   {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"rgst_usrid" },
	                   {Type:"Text",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"rgst_tms" } ];
	             
	            InitColumns(cols);
	
	            SetEditable(0);
	            SetSheetHeight(200);

                }

                 
    	break;
        case 9:      //Buying/Credit 탭부분 init
        	if(MULTI_CURR_FLAG == "Y"){	//Muti Currency
        	    with(sheetObj){
        	        var cnt=0;

        	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

        	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	        var headers = [ { Text:getLabel('AIE_BMD_0020_HDR9_3'), Align:"Center"},
        	                    { Text:getLabel('AIE_BMD_0020_HDR9_4'), Align:"Center"} ];
        	        InitHeaders(headers, info);

        	        var cols = [ 
        	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
        	               {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
        	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
        	               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
        	               {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
        	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
        	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        	               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
        	               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        	               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
        	               {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	               {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	               {Type:"Float",     Hidden:0,  Width:97,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	               {Type:"Float",     Hidden:0,  Width:97,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	               {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_auto_trf_flg" },
        	               {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_frt_ask_clss_cd" },
        	               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_due_dt" },
        	               {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	               {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N" }];
        	         
        	        InitColumns(cols);
        	        SetEditable(1);
        	        SetHeaderRowHeight(20 );
        	        SetHeaderRowHeight(21);
        	  	  	SetColProperty('dc_fr_frt_cd', {ComboText:DCFRTCD2, ComboCode:DCFRTCD1} );
        	  		SetColProperty('dc_fr_sell_buy_tp_cd', {ComboText:"Revenue|Cost", ComboCode:"D|C"} );
        	  		SetColProperty('dc_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
        	  		SetColProperty('dc_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
        	  		SetColProperty('dc_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
        	  		SetColProperty('dc_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
        	  		SetColProperty('dc_fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
        	  		SetColProperty(0 ,"dc_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
        	  		
        	  		SetSheetHeight(140);
        	  		
        	  		// #48327 - 20151112 - [Impex] HBL -- Option to Show D/C Freight Charges
					if(AEH_BL_FRT_CHK_YN == "Y"){
						SetColHidden("dc_reserve_field01", 0);
					}
					InitComboNoMatchText(1,"",1);
        		}
        	}else{
            with(sheetObj){
        	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1, TabStop:0 } );

        	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	      var headers = [ { Text:getLabel('AIE_BMD_0020_HDR9_1'), Align:"Center"},
        	                  { Text:getLabel('AIE_BMD_0020_HDR9_2'), Align:"Center"} ];
        	      InitHeaders(headers, info);

        	      var cols = [ 
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
        	             {Type:"PopupEdit", Hidden:0, Width:60,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
        	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
        	             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
        	             {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
        	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
        	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        	             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
        	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        	             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
        	             {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	             {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	             {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_auto_trf_flg" },
        	             {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_frt_ask_clss_cd" },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_due_dt" },
        	             {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	             {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N" }];
        	       
        	      	InitColumns(cols);

        	      	SetEditable(1);
        	      	SetHeaderRowHeight(20 );
        	      	SetHeaderRowHeight(21);
        	      	SetColProperty('dc_fr_frt_cd', {ComboText:DCFRTCD2, ComboCode:DCFRTCD1} );
              		SetColProperty('dc_fr_sell_buy_tp_cd', {ComboText:"Revenue|Cost", ComboCode:"D|C"} );
              		SetColProperty('dc_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
              		SetColProperty('dc_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
              		SetColProperty('dc_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
              		SetColProperty('dc_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
              	    SetSheetHeight(140);
              	    SetColProperty(0 ,"dc_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
     	    	    SetColProperty(0 ,"dc_fr_inv_curr_cd" , {AcceptKeys:"E" , InputCaseSensitive:1});
     	    	    
     	    	    // #48327 - 20151112 - [Impex] HBL -- Option to Show D/C Freight Charges
					if(AEH_BL_FRT_CHK_YN == "Y"){
						SetColHidden("dc_reserve_field01", 0);
					}
					InitComboNoMatchText(1,"",1);
        	    }
        	}
         break;
        case 10:      
            with(sheetObj){
        	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1, TabStop:0 } );

        	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	      var headers = [ { Text:getLabel('AIE_BMD_0020_HDR10_1'), Align:"Center"} ];
        	      InitHeaders(headers, info);

        	      var cols = [ {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Del" },
        	             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"rcp_ibflag" },
        	             {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"flg",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Int",       Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"rcp_pce_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	             {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:1,   SaveName:"rcp_grs_wgt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	             {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:1,   SaveName:"rcp_grs_wgt1",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	             {Type:"Text",      Hidden:1, Width:37,   Align:"Left",    ColMerge:1,   SaveName:"rcp_grs_wgt_ut_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Combo",     Hidden:0, Width:100,   Align:"Left",    ColMerge:1,   SaveName:"rcp_rt_clss_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",    ColMerge:1,   SaveName:"rcp_cmdt_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"rcp_hs_grp_cd",      KeyField:0,   CalcLogic:"",   Format:"" },
        	             {Type:"Float",     Hidden:0,  Width:140,  Align:"Right",   ColMerge:1,   SaveName:"rcp_chg_wgt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	             {Type:"Float",     Hidden:0,  Width:140,  Align:"Right",   ColMerge:1,   SaveName:"rcp_chg_wgt1",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	             {Type:"Float",     Hidden:0,  Width:140,   Align:"Right",   ColMerge:1,   SaveName:"rcp_ru",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:14 },
        	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"rcp_amt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        	             {Type:"Text",      Hidden:1, Width:72,   Align:"Left",    ColMerge:1,   SaveName:"rcp_amt_prn_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"" },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"rcp_cgo_rt_seq",     KeyField:0,   CalcLogic:"",   Format:"" } ];
        	       
        	      InitColumns(cols);

        	      //SetFocusAfterRowTransaction(0);
        	      				SetCountPosition(0);
        	                      SetEditable(1);
        	                      SetColProperty("rcp_grs_wgt_ut_cd", {ComboText:"KG|LB", ComboCode:"K|L"} );
        	                  	SetColProperty("rcp_rt_clss_cd", {ComboText:RCPCD1, ComboCode:RCPCD2} );
        	                  	SetColProperty("rcp_amt_prn_flg", {ComboText:"Total|ASARRANGED", ComboCode:"N|Y"} );
        	                  	        SetSheetHeight(83);
        	                  	      SetHeaderRowHeight(10);
        	                  	      SetHeaderRowHeight(18);
        	                  	    SetColProperty(0 ,"rcp_cmdt_cd" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
        	                  	  //sheetObj.SetFocusAfterProcess(0);


       }

                                      
        break;
        
      //Item 그리드
        case 11:      
            with(sheetObj){

        	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

        	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	         var headers = [ { Text:getLabel('AIE_BMD_HDR35'), Align:"Center"},
        	                   { Text:getLabel('AIE_BMD_HDR36'), Align:"Center"} ];
        	         InitHeaders(headers, info);

        	         var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"Del" },
        	             {Type:"Status",    Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_ibflag" },
        	             {Type:"Seq",      Hidden:0,  	Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:0,  	Width:100,  Align:"Left",    ColMerge:0,   SaveName:"item_cust_po_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Popup", 	Hidden:0, 	Width:90,   Align:"Center",  ColMerge:0,   SaveName:"item_cmdt_cd",    	   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:0,  	Width:150,  Align:"Left",    ColMerge:0,   SaveName:"item_cmdt_nm",    	   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:300 },
        	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Left",    ColMerge:0,   SaveName:"item_hs_grp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"PopupEdit", Hidden:0, 	Width:90,   Align:"Center",  ColMerge:0,   SaveName:"item_shp_cmdt_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
        	             {Type:"Text",      Hidden:0,  	Width:150,  Align:"Left",    ColMerge:0,   SaveName:"item_shp_cmdt_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:300 },
        	             {Type:"Int",       Hidden:0,  	Width:90,   Align:"Right",   ColMerge:1,   SaveName:"item_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
        	             {Type:"Combo",     Hidden:0, 	Width:90,   Align:"Center",  ColMerge:1,   SaveName:"item_pck_ut_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Left",    ColMerge:0,   SaveName:"item_pck_ut_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Float",     Hidden:0,   Width:100,  Align:"Right",   ColMerge:0,   SaveName:"item_pck_inr_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
        	             {Type:"Float",     Hidden:0,   Width:100,  Align:"Right",   ColMerge:0,   SaveName:"item_ea_cnt",    	   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
        	             {Type:"Float",     Hidden:0,   Width:100,  Align:"Right",   ColMerge:0,   SaveName:"item_ttl_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
        	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_lbs_wgt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
        	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_cft_meas",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
        	             {Type:"Text",      Hidden:0,  	Width:200,  Align:"Left",    ColMerge:1,   SaveName:"item_rmk",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
        	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_shp_cmdt_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_po_sys_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_po_cmdt_seq",    KeyField:0,   CalcLogic:"",   Format:"",       	   PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
        	          
        	         InitColumns(cols);

        	         SetEditable(1);
        	         SetColProperty(0 ,"item_cmdt_cd" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
        	         SetColProperty(0 ,"item_shp_cmdt_cd" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
        	         SetColProperty('item_pck_ut_cd', {ComboText:PCKCD1, ComboCode:PCKCD2} );
        	         SetSheetHeight(170);
        		}
            break;
            
         // Hawaii Freight 그리드
   		case 12:
   			with(sheetObj){
   				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );
				
		         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		         var headers = [ { Text:getLabel('AIE_BMD_0020_HDR12'), Align:"Center"} ];
		         InitHeaders(headers, info);

		         var cols = [ {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"hwifr_del_chk" },
		                {Type:"Status",    Hidden:1,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"hwifr_ibflag" },
		                {Type:"Seq",       Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"hwifr_Seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"hwifr_frt_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
		                {Type:"Float",     Hidden:0,  Width:140,  Align:"Right",   ColMerge:0,   SaveName:"hwifr_grs_wgt1",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
		                {Type:"Float",     Hidden:1,  Width:140,  Align:"Right",   ColMerge:0,   SaveName:"hwifr_meas1",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
		                {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"hwifr_ru",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
		                {Type:"AutoSum",   Hidden:0,  Width:180,  Align:"Right",   ColMerge:1,   SaveName:"hwifr_inv_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
		                {Type:"AutoSum",   Hidden:0,  Width:180,  Align:"Right",   ColMerge:1,   SaveName:"hwifr_cod_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
		                {Type:"AutoSum",   Hidden:1,  Width:180,  Align:"Right",   ColMerge:1,   SaveName:"hwifr_adv_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
		                {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hwifr_frt_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hwifr_intg_bl_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		          
		         InitColumns(cols);

		         SetEditable(1);
          		 SetSheetHeight(400);
         }
   		break;
    	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet3_OnDblClick(sheetObj,Row,Col){
 	//Name선택 시에만 팝업 호출
 	if(sheetObj.ColSaveName(Col)=='palt_doc_no' || sheetObj.ColSaveName(Col)=='palt_doc_msg'){
 		var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
reqParam += '&s_palt_doc_seq='+sheetObj.GetCellValue(Row,"palt_doc_seq");
 		reqParam += '&openMean='+SEARCH02;
 		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDocUp', 806, 450, "scroll:no;status:no;help:no;");
 	}
}
function sheet3_OnMouseMove(sheetObj, row, col){
	if(sheetObj.MouseCol()==9){
//no support[check again]CLT 		sheetObj.ToolTipOption="balloon:true;width:320;backcolor:#FFFFE0;forecolor:#000000;icon:0;title:Message";
var memo=sheetObj.GetCellValue(sheetObj.MouseRow(), "palt_doc_msg");
		memo=memo.replaceAll("@^^@", "\n");
		sheetObj.SetToolTipText(sheetObj.MouseRow(), sheetObj.MouseCol(),memo);
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet3_OnClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet3_OnClick(sheetObj, Row, Col){	
   	var downType;
   	var s_palt_doc_seq;
   	var s_intg_bl_seq;
	switch (sheetObj.ColSaveName(Col)) {
        case "palt_doc_img_url" :
         	if(sheetObj.GetCellImage(Row, "palt_doc_img_url") != ""){
         		s_palt_doc_seq=sheetObj.GetCellValue(Row,"palt_doc_seq");
         		s_intg_bl_seq = sheetObj.GetCellValue(Row, "intg_bl_seq_d");
                downloadFile('org', s_intg_bl_seq, s_palt_doc_seq);
        	}
        break;
        case "palt_doc_pdf_url" :
         	if(sheetObj.GetCellImage(Row, "palt_doc_pdf_url") != ""){
         		s_palt_doc_seq=sheetObj.GetCellValue(Row,"palt_doc_seq");
         		s_intg_bl_seq = sheetObj.GetCellValue(Row, "intg_bl_seq_d");
	            downloadFile('pdf', s_intg_bl_seq, s_palt_doc_seq);
        	}
        break;
	} // end switch
}
//***************Dimension Sheets Event처리 시작***************
function sheet4_OnPopupClick(sheetObj, Row, Col){	
	switch (sheetObj.ColSaveName(Col)) {
        case "dim_pck_ut_cd" :
	  	 	rtnary=new Array(1);
	   		rtnary[0]="1";
	        var rtnVal=window.showModalDialog('./CMM_POP_0120.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px");
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				sheetObj.SetCellValue(Row, Col,rtnValAry[0]);
			}
        break;
	}
}
//***************Dimension Sheets Event처리 종료***************
//***************EDI Sheets Event처리 시작***************
/**
 * 해운 EDI 수출품목 데이터조회
 */
function sheet5_OnPopupClick(sheetObj, row, col){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="edi_pck_ut_cd"){
		gridPopCall(sheetObj, row, col, 'edi_pck_ut_cd');
	}
}
function sheet5_OnKeyUp(sheetObj, row, col, keyCode){
	doAutoComplete(sheetObj, row, col, keyCode);
}
function sheet5_OnClick(sheetObj, row, col){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="sprt_seq"){
if(sheetObj.GetCellValue(row, "sprt_flg")=="N"){
			//분할선적 여부를 \"Yes\"로 변경하십시오!
			alert(getLabel('FMS_COM_ALT024'));
			sheetObj.SelectCell(row, "sprt_flg");
		}
	}
}
function sheet5_OnChange(sheetObj, row, col, value){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="sprt_flg"){
if(sheetObj.GetCellValue(row, "sprt_flg")=='NA'){
			sheetObj.SetCellValue(row, "sprt_seq",'');
		}
	}
	else if(colStr=="sprt_seq"){
if(sheetObj.GetCellValue(row, "sprt_flg")=='NA'&&sheetObj.GetCellValue(row, "sprt_seq") != ''){
			sheetObj.SetCellValue(row, "sprt_seq",'');
			//분할선적 여부가  \"No\"이므로 입력하실수 없습니다!
			alert(getLabel('FMS_COM_ALT024'));
		}
	}
}
//***************EDI Sheets Event처리 종료***************
//***************Freight Sheets Event처리 시작***************
var inv_viw_tp='A';
/**
 * Freight S/D 처리
 */
function sheet6_OnClick(sheetObj, row, col){
	mutiSheetOnClick(sheetObj, row, col, '', 'A', 'O', 'H');
}
/**
 * Freight S/D 처리
 */
function sheet6_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, '', 'A', 'O', 'H');
}
/**
 * Freight S/D 처리. 
 * Type/Size에 따른 Volume(수량) 체크
 */
function sheet6_OnChange(sheetObj, row, col, value) {
	switch (sheetObj.ColSaveName(col)) {
		case "fr_qty" :
		case "fr_ru" :
		case "fr_trf_cur_sum_amt" :
		case "fr_vat_rt" :
		case "fr_vat_amt" :
		case "fr_inv_xcrt" :
		case "fr_inv_amt" :
		case "fr_inv_vat_amt" :
		case "fr_inv_sum_amt" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	mutiSheetOnChange(sheetObj, row, col, '', 'A', 'O', 'H');
}
/**
 * Freight S/D 조회 완료시
 */
function sheet6_OnSearchEnd(sheetObj, row, col) {
	//버튼 초기화
	cnfCntr('SD');
	//PPD, CCT, Total 계산
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, '', 'A', 'O', 'H');
	}
}
/**
 * Freight S/D 저장 완료시
 */
function sheet6_OnSaveEnd(sheetObj, row, col) {
	//버튼 초기화
	cnfCntr('SD');
	//PPD, CCT, Total 계산
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
}
function sheet6_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, '');
}
function sheet7_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
	
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, 'b_', 'A', 'O', 'H');
	}	
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}
function sheet7_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
}
/**
 * Freight B/C 처리
 */
function sheet7_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'A', 'O', 'H');
}
/**
 * Freight B/C 처리
 */
function sheet7_OnClick(sheetObj, row, col){
	mutiSheetOnClick(sheetObj, row, col, 'b_', 'A', 'O', 'H');
}
/**
 * Freight B/C 처리
 * Type/Size에 따른 Volume(수량) 체크
 */
function sheet7_OnChange(sheetObj, row, col, value) {
	switch (sheetObj.ColSaveName(col)) {
		case "b_fr_qty" :
		case "b_fr_ru" :
		case "b_fr_trf_cur_sum_amt" :
		case "b_fr_vat_rt" :
		case "b_fr_vat_amt" :
		case "b_fr_inv_xcrt" :
		case "b_fr_inv_amt" :
		case "b_fr_inv_vat_amt" :
		case "b_fr_inv_sum_amt" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	mutiSheetOnChange(sheetObj, row, col,  'b_', 'A', 'O', 'H');
}
function sheet7_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'b_');
}
/**
 * Selling/Debit Sheet를 리턴함
 */
function getSdSheet(){
	return docObjects[2];
}
function getSdUrl(){
	return "./AIE_BMD_0024GS.clt";
}
function getSdFndSeq(){
	return 5;
}
/**
 * Buying/Selling Sheet를 리턴함
 */
function getBcSheet(){
	return docObjects[3];
}
/**
 * Debit/Selling Sheet를 리턴함
 */
function getDcSheet(){
	return docObjects[8];
}
function getBcUrl(){
	return "./AIE_BMD_0024_1GS.clt";
}
function getBcFndSeq(){
	return 6;
}
//***************Freight Sheets Event처리 종료***************
var etdOk=true;
var etdRangeOk=true;
/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function blCheckInpuVals(){
	var isOk=true;
	//---------------20121130 OJG---------------------------
	if(!chkCmpAddr(frm1.shpr_trdp_addr, 'Shipper Address')){
		isOk=false;
		moveTab('01');
		//frm1.shpr_trdp_addr.focus();
	}
	if(!chkCmpAddr(frm1.cnee_trdp_addr, 'Consignee Address')){
		isOk=false;
		moveTab('01');
		//frm1.cnee_trdp_addr.focus();
	}
	if(!chkCmpAddr(frm1.ntfy_trdp_addr, 'Notify Address')){
		isOk=false;
		moveTab('01');
		//frm1.ntfy_trdp_addr.focus();
	}
	//---------------20121130 OJG--------------------------
	/*
	 * 2012.02.23
	 * 필수값 설정
	 * REF_NO, ETD
	 */
	//if(checkInputVal(frm1.ref_no.value, 2, 30, "T", 'Filing No.')!='O'){ //S.Y BAIK (2013.01.23)
	if(getStringLength(frm1.ref_no.value) == 0){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_FINO'));
		isOk=false;
		moveTab('01');
		frm1.ref_no.focus();
		return isOk;
	}
	//else if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'Flight Date')!='O'){ //S.Y BAIK (2013.01.23)
	else if(!checkInType(frm1.etd_dt_tm.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_FLIT') + getLabel('FMS_COD_DATE'));
		isOk=false;
		moveTab('01');
		frm1.etd_dt_tm.focus();
		return isOk;
	}
	if (trim(frm1.etd_dt_tm.value) != "" && trim(frm1.eta_dt_tm.value) != "") {
		var daysTerms=getDaysBetweenFormat(frm1.etd_dt_tm, frm1.eta_dt_tm, "MM-dd-yyyy");
		if (daysTerms < 0) {
			// Arrival Date time must be greater than Flight Date time
			alert(getLabel("AIR_MSG_091"));
			frm1.eta_dt_tm.focus();
			isOk=false;
			return isOk; 
		} /*else if (daysTerms == 0) {
			if (getDaysBetweenFormat(frm1.etd_tm, frm1.eta_tm, "hh:mm") < 0) {
				// Arrival Date time must be greater than Flight Date time
				alert(getLabel("AIR_MSG_091"));
				moveTab('01');
				frm1.eta_tm.focus();
				isOk=false;
				return isOk; 
			}
		}*/
	}
	//today를 기준으로 6개월 차이가 나면 안됨
	var tmpBlDate=frm1.bl_dt_tm.value.replaceAll("-", "");
	var tmpEtdDate=frm1.etd_dt_tm.value.replaceAll("-", "");
	var blDate=new Date(tmpBlDate.substring(4,8), tmpBlDate.substring(0,2)-1, tmpBlDate.substring(2,4));
	var etdDate=new Date(tmpEtdDate.substring(4,8), tmpEtdDate.substring(0,2)-1, tmpEtdDate.substring(2,4));
	if((etdDate-blDate)/(60*60*24*1000)<0){
		etdOk=false;
	}else{
		etdOk=true;
	}
	var tmpDate=new Date();
	var today=new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()); 
	if((today-etdDate)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	}else if((etdDate-today)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	}else{
		etdRangeOk=true;
	}
 	//#25246, 25247 필수값 설정 추가
	if(frm1.pol_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.pol_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.pod_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.pod_cd.focus();
		isOk=false;
		return isOk; 
	}
	//#31594 [BINEX]B/L Entry 에서 Customer 항목을 mandatory 지정 - 필수값 설정 추가
	if(frm1.act_shpr_trdp_cd.value == "") { 
		//alert(getLabel('FMS_COM_ALT001'));
		alert(getLabel('FMS_COM_ALT001') + " - CUSTOMER");
		moveTab('01');
		frm1.act_shpr_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.act_shpr_trdp_nm.value == "") { 
		//alert(getLabel('FMS_COM_ALT001'));
		alert(getLabel('FMS_COM_ALT001') + " - CUSTOMER");
		moveTab('01');
		frm1.act_shpr_trdp_nm.focus();
		isOk=false;
		return isOk; 
	}
	/*
	//Booking 시
	//if(checkInputVal(frm1.lnr_trdp_cd.value, 6, 6, "T", 'Air Line Code')!='O'){
		isOk=false;
		moveTab('01');
		frm1.lnr_trdp_cd.focus();
	}else //if(checkInputVal(frm1.lnr_trdp_nm.value, 2, 50, "T", 'Air Line')!='O'){
		isOk=false;
		moveTab('01');
		frm1.lnr_trdp_nm.focus();
	}else //if(checkInputVal(frm1.flt_no.value, 3, 6, "T", 'Flight No.')!='O'){
		isOk=false;
		moveTab('01');
		frm1.flt_no.focus();
	}else //if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'Flight Date')!='O'){
		isOk=false;
		moveTab('01');
		frm1.etd_dt_tm.focus();
	}else //if(checkInputVal(frm1.etd_tm.value, 5, 5, "T", 'Flight Time')!='O'){
		isOk=false;
		moveTab('01');
		frm1.etd_tm.focus();
	}
	if(frm1.eta_dt_tm.value!=''){
		//if(checkInputVal(frm1.eta_dt_tm.value, 10, 10, "DD", 'Arrival Date')!='O'){
			isOk=false;
			moveTab('01');
			frm1.eta_dt_tm.focus();
		}else //if(checkInputVal(frm1.eta_tm.value, 5, 5, "T", 'Arrival Time')!='O'){
			isOk=false;
			moveTab('01');
			frm1.eta_tm.focus();
		}
	}
	if(isOk){
		//if(checkInputVal(frm1.pol_nod_cd.value, 3, 8, "T", 'Departure Code')!='O'){
			isOk=false;
			moveTab('01');
			frm1.pol_nod_cd.focus();
		}else //if(checkInputVal(frm1.pod_nod_cd.value, 3, 8, "T", 'Destination Code')!='O'){
			isOk=false;
			moveTab('01');
			frm1.pod_nod_cd.focus();
		}else //if(checkInputVal(frm1.bkg_dt_tm.value, 10, 10, "DD", 'Booking Date')!='O'){
			isOk=false;
			moveTab('01');
			frm1.bkg_dt_tm.focus();
		}else //if(checkInputVal(frm1.pck_qty.value, 0, 7, "N", 'Package Qty')!='O'){
			isOk=false;
			moveTab('01');
			frm1.pck_qty.focus();		
		}else //if(checkInputVal(frm1.mk_txt.value, 0, 4000, "T", 'Mark')!='O'){
			isOk=false;
			moveTab('02');
			frm1.mk_txt.focus();
		}else //if(checkInputVal(frm1.desc_txt.value, 0, 4000, "T", 'Description')!='O'){
			isOk=false;
			moveTab('02');
			frm1.desc_txt.focus();
		}else if(checkInputVal(frm1.rep_cmdt_cd.value, 0, 50, "T", 'Commodity')!='O'){
			isOk=false;
			moveTab('01');
			frm1.rep_cmdt_cd.focus();		
		}else //if(checkInputVal(frm1.rep_cmdt_nm.value, 1, 200, "T", 'Commodity')!='O'){
			isOk=false;
			moveTab('01');
			frm1.rep_cmdt_nm.focus();		
		}else //if(checkInputVal(frm1.rmk.value, 0, 400, "T", 'Remark')!='O'){
			isOk=false;
			moveTab('02');
			frm1.rmk.focus();
		}
		if(frm1.bl_sts_cd.value=='BF'||frm1.bl_sts_cd.value=='HC'){
			//if(checkInputVal(frm1.shpr_trdp_nm.value, 2, 50, "T", 'Shipper Name')!='O'){
				isOk=false;
				moveTab('01');
				frm1.shpr_trdp_nm.focus();
			}else //if(checkInputVal(frm1.shpr_trdp_addr.value, 2, 400, "T", 'Shipper Address')!='O'){
				isOk=false;				
				moveTab('01');
				frm1.shpr_trdp_addr.focus();
			}else //if(checkInputVal(frm1.cnee_trdp_nm.value, 2, 50, "T", 'Consignee Name')!='O'){
				isOk=false;
				moveTab('01');
				frm1.cnee_trdp_nm.focus();
			}else //if(checkInputVal(frm1.cnee_trdp_addr.value, 2, 400, "T", 'Consignee Address')!='O'){
				isOk=false;
				moveTab('01');
				frm1.cnee_trdp_addr.focus();
			}else //if(checkInputVal(frm1.bl_iss_dt.value, 10, 10, "D", 'Issued Date')!='O'){
				isOk=false;
				moveTab('01');
				frm1.bl_iss_dt.focus();
			}else //if(checkInputVal(frm1.sls_ofc_cd.value, 1, 6, "T", 'Sales Office')!='O'){
				isOk=false;
				moveTab('01');	
			}else //if(checkInputVal(frm1.sls_usrid.value, 2, 15, "T", 'Sales Person')!='O'){
				isOk=false;
				moveTab('01');
			}
		}
	}
	*/
	/*==================================================================================================*/
	/* LHK, 20130128 Freight Edit/Delete 는 TB_FRT.INV_STS_CD 가 FI 인 경우에만 허용						    */
	/* Freight 생성 후 Invoice 를 생성한 후 재조회 하지 않고 다시 저장할 경우 delete 하거나 수정 건으로 인한 오류 발생을 차단. */
	var sheetObjArr=new Array(3);
		sheetObjArr[0]=docObjects[2];		//AR LOCAL  'fr_'
		sheetObjArr[1]=docObjects[8];		//DC 		'dc_fr_'
		sheetObjArr[2]=docObjects[3];		//AP 		'b_fr_'
	if(checkFrtSts(sheetObjArr)==false){	//Validation 후 Do you want to save 뜨지 않고 원래값 가져오기
		isOk=false;
	}
	/*=================================================================================================*/
	
	//Item List validation.
	var cmdtListParam=docObjects[10].GetSaveString(false);
	if(docObjects[10].IsDataModified() && cmdtListParam == "") { isOk=false; };
	if(cmdtListParam!=''){
		if(itemCheckInpuVals(docObjects[10])){
			isOk=false;
		}
	}
	
	var frtSdListParam=docObjects[2].GetSaveString(false);
    if(docObjects[2].IsDataModified() && frtSdListParam == "") { isOk=false; };

    var frtBcListParam=docObjects[3].GetSaveString(false);
    if(docObjects[3].IsDataModified() && frtBcListParam == "") { isOk=false; };

    var frtDcListParam=docObjects[8].GetSaveString(false);
    if(docObjects[8].IsDataModified() && frtDcListParam == "") { isOk=false; };
	    
    var hwiFrtListParam=docObjects[11].GetSaveString(false);
	if(docObjects[11].IsDataModified() && hwiFrtListParam == "") { isOk=false; };
	if(hwiFrtListParam!=''){
		if(hwiFrtCheckInpuVals(docObjects[11])){
			isOk=false;
		}
	}
	
	return isOk;
}

/**
 * Item Commodity입력값 확인
 */
function itemCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
	var isError=false; 
	var workItems=0;
	for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'item_ibflag')=='U'||sheetObj.GetCellValue(i, 'item_ibflag')=='I'){
			//if(checkInputVal(sheetObj.GetCellValue(i, 'item_shp_cmdt_cd'), 4, 12, "T", 'Item Code')!='O'){
			//	isError=true;
			//}
		}
	}
	return isError;
}

/**
 * Hawaii Freight 입력값 확인
 */
function hwiFrtCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
	var isError=false; 
	var workItems=0;
	for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'hwifr_ibflag')=='U'||sheetObj.GetCellValue(i, 'hwifr_ibflag')=='I'){
			if(checkInputVal(sheetObj.GetCellValue(i, "hwifr_frt_nm"), 1, 50, "T", "Freight") != 'O'){
				isError=true;
			}
		}
	}
	return isError;
}

/**
 * EDI 입력값 체크
 */
function ediCheckInpuVals(sheetObj){
 	var totRow=sheetObj.RowCount();
	var isError=false; 
	var workItems=0;
	var inLen=0;
	for(var i=1; i < totRow ; i++){
if(sheetObj.GetCellValue(i, 'xpt_ibflag')=='U' || sheetObj.GetCellValue(i, 'xpt_ibflag')=='I'){
	inLen=getStringLength(trim(sheetObj.GetCellValue(i, 'xpt_no')));
			//if(checkInputVal(sheetObj.CellValue(i, 'xpt_no'), 10, 20, "T", '수출신고번호')!='O'){
			//BOND NO.가 맞는지 확인 필요!
			if(inLen < 10 || inLen > 20){
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_BOND') + getLabel('FMS_COD_NUM_'));
				isError=true;
				return isError;
			}
		}
	}
	return isError;
}
//-------------------------Work Order-------------------------
/**
 * Work Order 화면이동
 */
function sheet10_OnDblClick(sheetObj, row, col){
var param='f_wo_no=' + sheetObj.GetCellValue(row, 'wo_no');
	   param += '&air_sea_clss_cd=A'; 
	   param += '&bnd_clss_cd=O';
	   param += '&biz_clss_cd=H';
	   //#34862 - [BINEX]Work Order - Trucker 정보 Link
	   param += '&pickup_ref_no=' + document.frm1.exp_ref_no.value;
   	var paramStr="./AIC_WOM_0015.clt?f_cmd="+SEARCH+"&"+param;
   	parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
}
//화면의 checkbox를 database 값으로 셋팅한다.
function checkBoxSetting(){
	var formObj=document.frm1;
	if(formObj.disp_ntfy_flg.value=="Y"){
		formObj.disp_ntfy_flg.checked=true;
	}
	else{
		formObj.disp_ntfy_flg.checked=false;
	}
	if(formObj.ctrb_ratio_yn.value=="Y"){
		formObj.ctrb_ratio_yn.checked=true;
	}else{
		formObj.ctrb_ratio_yn.checked=false;
	}
}
function weightChange(obj){
	//alert(obj.name);
	var formObj=document.frm1;
	if(obj.name=="grs_wgt"){
		//formObj.grs_wgt.value = calcWeight(formObj.grs_wgt.value, 0);
		chkComma(formObj.grs_wgt,8,1);
		formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") / 0.453597315, 0);
		chkComma(formObj.grs_wgt1,8,1);
	}
	else if(obj.name=="grs_wgt1"){
		//formObj.grs_wgt1.value = calcWeight(formObj.grs_wgt1.value, 1);
		chkComma(formObj.grs_wgt1,8,1);
		formObj.grs_wgt.value=roundXL(formObj.grs_wgt1.value.replaceAll(",","") * 0.453597315, 1);
		chkComma(formObj.grs_wgt,8,1);
	}
	if(obj.name=="agent_grs_wgt"){
		//formObj.agent_grs_wgt.value = calcWeight(formObj.agent_grs_wgt.value, 0);
		chkComma(formObj.agent_grs_wgt,8,1);
		formObj.agent_grs_wgt1.value=roundXL(formObj.agent_grs_wgt.value.replaceAll(",","") / 0.453597315, 0);
		chkComma(formObj.agent_grs_wgt1,8,1);
		formObj.grs_wgt.value=formObj.agent_grs_wgt.value;
		formObj.grs_wgt1.value=formObj.agent_grs_wgt1.value;
		formObj.chg_wgt.value=formObj.agent_grs_wgt.value;
		formObj.chg_wgt1.value=formObj.agent_grs_wgt1.value;
		formObj.agent_chg_wgt.value=formObj.agent_grs_wgt.value;
		formObj.agent_chg_wgt1.value=formObj.agent_grs_wgt1.value;
	}
	else if(obj.name=="agent_grs_wgt1"){
		//formObj.agent_grs_wgt1.value = calcWeight(formObj.agent_grs_wgt1.value, 1);
		chkComma(formObj.agent_grs_wgt1,8,1);
		formObj.agent_grs_wgt.value=roundXL(formObj.agent_grs_wgt1.value.replaceAll(",","") * 0.453597315, 1);
		chkComma(formObj.agent_grs_wgt,8,1);
		formObj.grs_wgt1.value=formObj.agent_grs_wgt1.value;
		formObj.grs_wgt.value=formObj.agent_grs_wgt.value;
		formObj.chg_wgt1.value=formObj.agent_grs_wgt1.value;
		formObj.chg_wgt.value=formObj.agent_grs_wgt.value;
		formObj.agent_chg_wgt1.value=formObj.agent_grs_wgt1.value;
		formObj.agent_chg_wgt.value=formObj.agent_grs_wgt.value;
	}
	if(obj.name=="chg_wgt"){
		//#41637 - [BINEX] Charge weight
		//formObj.chg_wgt.value=calcWeight(formObj.chg_wgt.value.replaceAll(",",""), 0);
		chkComma(formObj.chg_wgt,8,1);
		formObj.chg_wgt1.value=roundXL(formObj.chg_wgt.value.replaceAll(",","") / 0.453597315, 0);
		chkComma(formObj.chg_wgt1,8,1);
		formObj.agent_chg_wgt.value=formObj.chg_wgt.value;
		formObj.agent_chg_wgt1.value=formObj.chg_wgt1.value;
	}
	else if(obj.name=="chg_wgt1"){
		//#41637 - [BINEX] Charge weight
		//formObj.chg_wgt1.value=calcWeight(formObj.chg_wgt1.value.replaceAll(",",""), 1);
		chkComma(formObj.chg_wgt1,8,1);
		formObj.chg_wgt.value=roundXL(formObj.chg_wgt1.value.replaceAll(",","") * 0.453597315, 1);
		chkComma(formObj.chg_wgt,8,1);
		formObj.agent_chg_wgt1.value=formObj.chg_wgt1.value;
		formObj.agent_chg_wgt.value=formObj.chg_wgt.value;
	}
	if(obj.name=="agent_chg_wgt"){
		//#41637 - [BINEX] Charge weight
		//formObj.agent_chg_wgt.value=calcWeight(formObj.agent_chg_wgt.value.replaceAll(",",""), 0);
		chkComma(formObj.agent_chg_wgt,8,1);
		formObj.agent_chg_wgt1.value=roundXL(formObj.agent_chg_wgt.value.replaceAll(",","") / 0.453597315, 0);
		chkComma(formObj.agent_chg_wgt1,8,1);
	}
	else if(obj.name=="agent_chg_wgt1"){
		//#41637 - [BINEX] Charge weight
		//formObj.agent_chg_wgt1.value=calcWeight(formObj.agent_chg_wgt1.value.replaceAll(",",""), 1);
		chkComma(formObj.agent_chg_wgt1,8,1);
		formObj.agent_chg_wgt.value=roundXL(formObj.agent_chg_wgt1.value.replaceAll(",","") * 0.453597315, 1);
		chkComma(formObj.agent_chg_wgt,8,1);
	}
	if(obj.name=="vol_meas"){
		formObj.vol_wgt.value=calcWeight(parseInt((formObj.vol_meas.value.replaceAll(",","") * 1000 / 6) * 1000) / 1000, 0 ,"Y");
		chkComma(formObj.vol_wgt,8,1);
		
		var bl_grs_wgt=0;
		if(formObj.agent_grs_wgt.value.replaceAll(",","") - formObj.grs_wgt.value.replaceAll(",","") >= 0){
			bl_grs_wgt=formObj.agent_grs_wgt.value.replaceAll(",","");
		}else{
			bl_grs_wgt=formObj.grs_wgt.value.replaceAll(",","");
		}
		if(bl_grs_wgt - formObj.vol_wgt.value.replaceAll(",","") >= 0){
			formObj.agent_chg_wgt.value=calcWeight(bl_grs_wgt, 0);
			formObj.chg_wgt.value=calcWeight(bl_grs_wgt, 0);
		}else{
			formObj.agent_chg_wgt.value=formObj.vol_wgt.value.replaceAll(",","");
			formObj.chg_wgt.value=formObj.vol_wgt.value.replaceAll(",","");
		}
//		numberCommaLen(formObj.agent_chg_wgt,8,1);chkComma(formObj.agent_chg_wgt,8,1);
//		numberCommaLen(formObj.chg_wgt,8,1);chkComma(formObj.chg_wgt,8,1);
		weightChange(formObj.agent_chg_wgt);
		weightChange(formObj.chg_wgt);
		getCBM();
		cChgChange();
		sChgChange();
		cGrsChange();
		sGrsChange();
		pckChange();
	}
}
function calcWeight(wgt, type, volWgtCalcYn){
	var intWgt=parseInt(wgt);
	var tmpVal=wgt - intWgt;
	var result=0;
	
	if(volWgtCalcYn == "Y" && AE_VOL_ROUND == "R"){
		result = roundXL(wgt,0);
	}else{
		/*
		 * type==0, kg
		 * type==1, lbs
		 */
		if(type==0){
			if(tmpVal == 0){
				result=wgt;
			}else if(tmpVal <= 0.5){
				result=intWgt + 0.5;
			}else if(tmpVal <= 1){
				result=intWgt + 1;
			}
		}else if(type==1){
			if(tmpVal == 0){
				result=wgt;
			}else if(tmpVal <= 1){
				result=intWgt + 1;
			}
		}
	}
	return result;
}
/*
 * 도량형 변환식
 */
function sheet4_OnChange(sheetObj, row, col, value){
	switch (sheetObj.ColSaveName(col)) {
		case "dim_len_dim" :
		case "dim_wdt_dim" :
		case "dim_hgt_dim" :
		case "dim_pce_qty" :
		case "dim_chg_wgt"  :
		case "dim_chg_wgt1" :
		case "dim_meas" :
		case "dim_meas1" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	//
	var colName=sheetObj.ColSaveName(col);
	var formObj=document.frm1;
	/* jsjang 2013.8.22 #18650 B/L Entry 화면에서 Dimensions 리스트 항목 - 삭제 Check시 상단 Measurement/Package 등에 반영 안됨 보완 */
	//if (colName=="dim_len_dim" || colName=="dim_wdt_dim" || colName=="dim_hgt_dim" || colName=="dim_pce_qty") {
	if (colName=="dim_len_dim" || colName=="dim_wdt_dim" || colName=="dim_hgt_dim" || colName=="dim_pce_qty" || colName=="dim_meas" || colName=="del"){
		var length=sheetObj.GetCellValue(row, "dim_len_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_len_dim");
		var width=sheetObj.GetCellValue(row, "dim_wdt_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_wdt_dim");
		var height=sheetObj.GetCellValue(row, "dim_hgt_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_hgt_dim");
		var pcs=sheetObj.GetCellValue(row, "dim_pce_qty")=="" ? 0 : sheetObj.GetCellValue(row, "dim_pce_qty");
		var cbm=0;
		var kg=0;
		var sumCbm=0;
		var sumPcs=0;
		if(formObj.size_ut_cd[0].checked){
			kg=roundXL(length * width * height * pcs / 6000, 1);
			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 6);
			sheetObj.SetCellValue(row, "dim_act_dim",cbm.toFixed(6),0);
			sheetObj.SetCellValue(row, "dim_chg_wgt",kg.toFixed(1));
			sheetObj.SetCellValue(row, "dim_chg_wgt1",(kg / 0.453597315).toFixed(1));
			/* jsjang 2013.8.22 #18650 B/L Entry 화면에서 Dimensions 리스트 항목 - 삭제 Check시 상단 Measurement/Package 등에 반영 안됨 보완 */
			/* if 문만 추가 */
			if (colName !="dim_meas")
			{			
				sheetObj.SetCellValue(row, "dim_meas",cbm.toFixed(6),0);
			}
			sheetObj.SetCellValue(row, "dim_meas1",(cbm * 35.3165).toFixed(6),0);
		} else if(formObj.size_ut_cd[1].checked) {
			
			kg=roundXL(length * width * height * pcs * 2.54 * 2.54 * 2.54 / 6000, 1);
			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 6);
			sheetObj.SetCellValue(row, "dim_act_dim",cbm.toFixed(6),0);              
			sheetObj.SetCellValue(row, "dim_chg_wgt",kg.toFixed(1));                 
			sheetObj.SetCellValue(row, "dim_chg_wgt1",(kg / 0.453597315).toFixed(1));
			/* jsjang 2013.8.22 #18650 B/L Entry 화면에서 Dimensions 리스트 항목 - 삭제 Check시 상단 Measurement/Package 등에 반영 안됨 보완 */
			/* if 문만 추가 */
			if (colName !="dim_meas")
			{				
				sheetObj.SetCellValue(row, "dim_meas",cbm.toFixed(6),0);
			}
			sheetObj.SetCellValue(row, "dim_meas1",(cbm * 35.3165).toFixed(6),0);
		}
		if (kg.toFixed(1) > 9999999999) {
			alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("10")));
			sheetObj.SetCellValue(row, "dim_chg_wgt",0,0);
			return;
		}
		if ((kg / 0.453597315).toFixed(1) > 9999999999) {
			alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("10")));
			sheetObj.SetCellValue(row, "dim_chg_wgt1",0,0);
			return;
		}
		if (cbm.toFixed(6) > 9999999999) {
			alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("10")));
			sheetObj.SetCellValue(row, "dim_meas",0,0);
			return;
		}
		if ((cbm * 35.3165).toFixed(6) > 9999999999) {
			alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("10")));
			sheetObj.SetCellValue(row, "dim_meas1",0,0);
			return;
		}
		for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
			/* jsjang 2013.8.22 #18650 B/L Entry 화면에서 Dimensions 리스트 항목 - 삭제 Check시 상단 Measurement/Package 등에 반영 안됨 보완 */
			/* if 문만 추가 */
			if(sheetObj.GetCellValue(i, "del") == 0)
			{ 			
				sumCbm += parseFloat(sheetObj.GetCellValue(i, "dim_meas"));
				sumPcs += parseFloat(sheetObj.GetCellValue(i, "dim_pce_qty"));
			}
		}
		/*
		 * 2012.02.15
		 * Total CBM 필드 추가
		 * Total CBM 값을 구하고 Vol Weight로 환산
		 */
		frm1.vol_meas.value=sumCbm.toFixed(6);
		frm1.pck_qty.value=sumPcs.toFixed(0);
		//frm1.vol_wgt.value = (frm1.vol_meas.value * 1000 / 6).toFixed(1);
		weightChange(frm1.vol_meas);
	}
	/*
	else if(colName=="dim_chg_wgt" || colName=="dim_chg_wgt1"){
		var sumChgWgt=0;
		var sumChgWgt1=0;
		for(var i=2 ; i<sheetObj.rows ; i++){
sumChgWgt 	+= parseFloat(sheetObj.GetCellValue(i, "dim_chg_wgt"));
sumChgWgt1 	+= parseFloat(sheetObj.GetCellValue(i, "dim_chg_wgt1"));
		}
		var numAgtGrsWgt=frm1.agent_grs_wgt.value.replaceAll(",", "");
		//g.weight와 c.weight를 비교해서 큰 값을 입력한다. 
		if(parseFloat(numAgtGrsWgt) >= sumChgWgt){
			formObj.chg_wgt.value=frm1.agent_grs_wgt.value;
			formObj.agent_chg_wgt.value=frm1.agent_grs_wgt.value;
		}else{
			formObj.chg_wgt.value=sumChgWgt;
			formObj.agent_chg_wgt.value=sumChgWgt;
		}
		weightChange(formObj.chg_wgt);
	}
	*/
}
/*
 * Rate Combination Point 
 */
function sheet2_OnChange(sheetObj, row, col, value){ 
	var colName=sheetObj.ColSaveName(col);
	if(colName=="rcp_grs_wgt"){
		if(row == 1) {
			 sheetObj.SetCellValue(1,"rcp_grs_wgt1",  sheetObj.GetCellValue(1, "rcp_grs_wgt") / 0.453597315, 0);
		}
		if(row == 2) {
			sheetObj.SetCellValue(2, "rcp_grs_wgt1",sheetObj.GetCellValue(2, "rcp_grs_wgt") / 0.453597315, 0);
			sheetObj.SetCellValue(1, "rcp_amt",sheetObj.GetCellValue(2, "rcp_grs_wgt") * sheetObj.GetCellValue(1, "rcp_ru"), 0);
		}
	}
	if(colName=="rcp_grs_wgt1"){
		if(row == 1) {
			sheetObj.SetCellValue(1, "rcp_grs_wgt",sheetObj.GetCellValue(1, "rcp_grs_wgt1") * 0.453597315, 0);
		}
		if(row == 2) {
			sheetObj.SetCellValue(2, "rcp_grs_wgt",sheetObj.GetCellValue(2, "rcp_grs_wgt1") * 0.453597315, 0);
			sheetObj.SetCellValue(1, "rcp_amt",sheetObj.GetCellValue(2, "rcp_grs_wgt") * sheetObj.GetCellValue(1, "rcp_ru"), 0);
		}
	}
	if(colName=="rcp_chg_wgt"){
		if(row == 1) {
			sheetObj.SetCellValue(1, "rcp_chg_wgt1",sheetObj.GetCellValue(1, "rcp_chg_wgt") / 0.453597315, 0);
		}
		if(row == 2) {
			sheetObj.SetCellValue(2, "rcp_chg_wgt1",sheetObj.GetCellValue(2, "rcp_chg_wgt") / 0.453597315, 0);
			sheetObj.SetCellValue(2, "rcp_amt",sheetObj.GetCellValue(2, "rcp_grs_wgt") * sheetObj.GetCellValue(2, "rcp_ru"), 0);
		}
	}
	if(colName=="rcp_chg_wgt1"){
		if(row == 1) {
			sheetObj.SetCellValue(1, "rcp_chg_wgt",sheetObj.GetCellValue(1, "rcp_chg_wgt1") * 0.453597315, 0);
		}
		if(row == 2) {
			sheetObj.SetCellValue(2, "rcp_chg_wgt",sheetObj.GetCellValue(2, "rcp_chg_wgt1") * 0.453597315, 0);
			sheetObj.SetCellValue(2, "rcp_amt",sheetObj.GetCellValue(2, "rcp_grs_wgt") * sheetObj.GetCellValue(2, "rcp_ru"), 0);
		}
	}
}
function setSizeUtCd(obj){
	var formObj=document.frm1;
	if(obj=="CM"){
		formObj.size_ut_cd[0].checked=true;
		formObj.size_ut_cd[1].checked=false;
	}else if(obj=="INCH"){
		formObj.size_ut_cd[0].checked=false;
		formObj.size_ut_cd[1].checked=true;
	}else{
		formObj.size_ut_cd[0].checked=true;
		formObj.size_ut_cd[1].checked=false;
	}
}
function setUtCd(){
	var formObj=document.frm1;
	if(formObj.agent_unit_chk1.value=="K"){
		formObj.agent_unit_chk[0].checked=true;
		formObj.agent_unit_chk[1].checked=false;
	}else{
		formObj.agent_unit_chk[0].checked=false;
		formObj.agent_unit_chk[1].checked=true;
	}
	if(formObj.customer_unit_chk1.value=="K"){
		formObj.customer_unit_chk[0].checked=true;
		formObj.customer_unit_chk[1].checked=false;
	}else{
		formObj.customer_unit_chk[0].checked=false;
		formObj.customer_unit_chk[1].checked=true;
	}
}
function chkSizeType(){
	var formObj=document.frm1;
	var sheetObj=docObjects[1];
	//LHK 20130812 CM에서 INCH SWITCH 할 경우 CMB Auto Calculation 적용
//	for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
//		sheetObj.CellValue(i, "dim_act_dim") = 0;
//	}
	var length=0;
	var width=0;
	var height=0;
	var pcs=0;
	var cbm=0;
	var kg=0;
	var sumCbm=0;
	var sumPcs=0;
	for(var i=2 ; i<sheetObj.RowCount() + 2 ; i++){
		length=sheetObj.GetCellValue(i, "dim_len_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_len_dim");
		width=sheetObj.GetCellValue(i, "dim_wdt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_wdt_dim");
		height=sheetObj.GetCellValue(i, "dim_hgt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_hgt_dim");
		pcs=sheetObj.GetCellValue(i, "dim_pce_qty")=="" ? 0 : sheetObj.GetCellValue(i, "dim_pce_qty");
		if(formObj.size_ut_cd[0].checked){
			kg=roundXL(length * width * height * pcs / 6000, 1);
			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 6);
			sheetObj.SetCellValue(i, "dim_chg_wgt",kg.toFixed(1));
			sheetObj.SetCellValue(i, "dim_chg_wgt1",(kg / 0.453597315).toFixed(1));
		} else if(formObj.size_ut_cd[1].checked) {
			kg=roundXL(length * width * height * pcs * 2.54 * 2.54 * 2.54 / 6000, 1);    
			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 6);    
			sheetObj.SetCellValue(i, "dim_chg_wgt",kg.toFixed(1));                     
			sheetObj.SetCellValue(i, "dim_chg_wgt1",(kg / 0.453597315).toFixed(1));    
		}
		sheetObj.SetCellValue(i, "dim_act_dim",cbm.toFixed(6),0);
		sheetObj.SetCellValue(i, "dim_meas",cbm.toFixed(6),0);
		sheetObj.SetCellValue(i, "dim_meas1",(cbm * 35.3165).toFixed(6),0);
	}
	for(var i=2 ; i<sheetObj.RowCount() + 2; i++){
sumCbm += parseFloat(sheetObj.GetCellValue(i, "dim_meas"));
sumPcs += parseFloat(sheetObj.GetCellValue(i, "dim_pce_qty"));
	}
	/*
	 * 2012.02.15
	 * Total CBM 필드 추가
	 * Total CBM 값을 구하고 Vol Weight로 환산
	 */
	 formObj.vol_meas.value=sumCbm.toFixed(6);
	 formObj.pck_qty.value=sumPcs.toFixed(0);
	 weightChange(formObj.vol_meas);
}
function amountChange(obj){
	var formObj=document.frm1;
	if(obj.name=="agent_rt" || obj.name=="agent_unit_chk"){	
		//C로 계산
		if(formObj.agent_unit_chk[0].checked){
			//C/WGT(C), KGS과 계산
			if(formObj.agent_curr_cd.value=="KRW"){
				//일본을 제외한 지점은 Agent Rate 계산시 Gross Weight를 사용한다.
				if(user_ofc_cnt_cd=="JP"){
					if(formObj.agent_rt.value!=""){
						formObj.agent_amt.value=roundXL(formObj.agent_rt.value.replaceAll(",","") * formObj.chg_wgt.value.replaceAll(",",""), 0);
					}
				}else{
					if(formObj.agent_rt.value!=""){
						formObj.agent_amt.value=roundXL(formObj.agent_rt.value.replaceAll(",","") * formObj.grs_wgt.value.replaceAll(",",""), 0);
					}
				}
			}else{
				if(user_ofc_cnt_cd=="JP"){
					if(formObj.agent_rt.value!=""){
						formObj.agent_amt.value=roundXL(formObj.agent_rt.value.replaceAll(",","") * formObj.chg_wgt.value.replaceAll(",",""), 2);
					}
				}else{
					if(formObj.agent_rt.value!=""){
						formObj.agent_amt.value=roundXL(formObj.agent_rt.value.replaceAll(",","") * formObj.grs_wgt.value.replaceAll(",",""), 2);
					}
				}
				chkComma(formObj.agent_amt,8,2);
			}
		}else{
			//C/WGT(C), LBS과 계산
			if(formObj.agent_curr_cd.value=="KRW"){
				if(user_ofc_cnt_cd=="JP"){
					if(formObj.agent_rt.value!=""){
						formObj.agent_amt.value=roundXL(formObj.agent_rt.value.replaceAll(",","") * formObj.chg_wgt1.value.replaceAll(",",""), 0);
					}
				}else{
					if(formObj.agent_rt.value!=""){
						formObj.agent_amt.value=roundXL(formObj.agent_rt.value.replaceAll(",","") * formObj.grs_wgt1.value.replaceAll(",",""), 0);
					}
				}
			}else{
				if(user_ofc_cnt_cd=="JP"){
					if(formObj.agent_rt.value!=""){
						formObj.agent_amt.value=roundXL(formObj.agent_rt.value.replaceAll(",","") * formObj.chg_wgt1.value.replaceAll(",",""), 2);
					}
				}else{
					if(formObj.agent_rt.value!=""){
						formObj.agent_amt.value=roundXL(formObj.agent_rt.value.replaceAll(",","") * formObj.grs_wgt1.value.replaceAll(",",""), 2);
					}
				}
				chkComma(formObj.agent_amt,8,2);
			}
		}
	}else if(obj.name=="cust_rt" || obj.name=="customer_unit_chk"){
		//S로 계산
		if(formObj.customer_unit_chk[0].checked){
			//C/WGT(S), KGS과 계산
			if(formObj.agent_curr_cd.value=="KRW"){
				if(formObj.cust_rt.value!=""){
					formObj.cust_amt.value=roundXL(formObj.cust_rt.value.replaceAll(",","") * formObj.chg_wgt.value.replaceAll(",",""), 0);
				}
			}else{
				if(formObj.cust_rt.value!=""){
					formObj.cust_amt.value=roundXL(formObj.cust_rt.value.replaceAll(",","") * formObj.chg_wgt.value.replaceAll(",",""), 2);
				}
				chkComma(formObj.cust_amt,8,2);
			}
		}else{
			//C/WGT(S), LBS과 계산
			if(formObj.agent_curr_cd.value=="KRW"){
				if(formObj.cust_rt.value!=""){
					formObj.cust_amt.value=roundXL(formObj.cust_rt.value.replaceAll(",","") * formObj.chg_wgt1.value.replaceAll(",",""), 0);
				}
			}else{
				if(formObj.cust_rt.value!=""){
					formObj.cust_amt.value=roundXL(formObj.cust_rt.value.replaceAll(",","") * formObj.chg_wgt1.value.replaceAll(",",""), 2);
				}
				chkComma(formObj.cust_amt,8,2);
			}
		}
	}
	if(obj.name=="agent_amt"){
		if(formObj.agent_curr_cd.value=="KRW"){
			numberCommaLen(formObj.agent_amt, 8, 0);
		}else{
			numberCommaLen(formObj.agent_amt, 8, 2);
		}
	}else if(obj.name=="cust_amt"){
		if(formObj.cust_curr_cd.value=="KRW"){
			numberCommaLen(formObj.cust_amt, 8, 0);
		}else{
			numberCommaLen(formObj.cust_amt, 8, 2);
		}
	}
}
var show_mk_flg=false;
var show_desc_flg=false;
function searchDim(name, obj){
	var formObj=document.frm1;
	if(obj.name == "mk_dim"){
		show_mk_flg=true;
	}
	if(obj.name == "desc_dim"){
		show_desc_flg=true;
	}
	/* oyh 2013.09.09 #20439 :[BINEX] AEM Manifest CBM 삭제 */
	//size_ut_cd
	var unitCd=frm1.size_ut_cd[0].checked?"CM":"IN";
	//pck_ut_nm
	var headerStr=document.getElementsByName("pck_ut_cd")[0]; 
	var packageCd=headerStr.options[headerStr.selectedIndex].text;	
	switch(name){
		case "MK_DIM":
//			if(frm1.intg_bl_seq.value!=""){
//				ajaxSendPost(getDimAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchDim&intg_bl_seq=' + frm1.intg_bl_seq.value, './GateServlet.gsl');
//			}
			for(var i=2 ; i<docObjects[1].LastRow() + 1 ; i++){
				formObj.mk_txt.value += "\r\n";
				//formObj.mk_txt.value += docObjects[1].CellValue(i, "dim_len_dim") + ' X ' + docObjects[1].CellValue(i, "dim_wdt_dim") + ' X ' + docObjects[1].CellValue(i, "dim_hgt_dim") + ' X ' + docObjects[1].CellValue(i, "dim_pce_qty");
				formObj.mk_txt.value += docObjects[1].GetCellValue(i, "dim_len_dim") + unitCd + ' X ' + docObjects[1].GetCellValue(i, "dim_wdt_dim")+ unitCd  + ' X ' + docObjects[1].GetCellValue(i, "dim_hgt_dim")+ unitCd  + ' ' + docObjects[1].GetCellValue(i, "dim_pce_qty") + packageCd;
			}
		break;
		case "DESC_DIM":
//			if(frm1.intg_bl_seq.value!=""){
//				ajaxSendPost(getDimAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchDim&intg_bl_seq=' + frm1.intg_bl_seq.value, './GateServlet.gsl');
//			}
			formObj.desc_txt.value += frm1.rep_cmdt_nm.value;
			for(var i=2 ; i<docObjects[1].LastRow() + 1; i++){
				//formObj.desc_txt.value += "\r\n";
				formObj.desc_txt.value += "\r\n";
				formObj.desc_txt.value += docObjects[1].GetCellValue(i, "dim_len_dim") + unitCd + ' X ' + docObjects[1].GetCellValue(i, "dim_wdt_dim") + unitCd + ' X ' + docObjects[1].GetCellValue(i, "dim_hgt_dim") + unitCd + '  ' + docObjects[1].GetCellValue(i, "dim_pce_qty") + packageCd;
			}
		break;
	}
}
/**
 * Mark, Description에 출력되는 Dimension 정보
 **/
function getDimAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(show_mk_flg){
				formObj.mk_txt.value += "\r\n";
				formObj.mk_txt.value += doc[1];
				formObj.mk_txt.value += "\r\n";
				show_mk_flg=false;
			}
			if(show_desc_flg){
				formObj.desc_txt.value += "\r\n";
				formObj.desc_txt.value += doc[1];
				formObj.desc_txt.value += "\r\n";
				show_desc_flg=false;
			}
			rowCount(frm1,15,frm1.rider_lbl);
		}
	}
}
function setOfficeData(){
	var formObj=document.frm1;
	var sheetObj=docObjects[1];
	//office size type setting
	//alert(oth_size_ut_cd);
	setSizeUtCd(oth_size_ut_cd);
	//office post date setting, Ocean Export
//	if(formObj.post_dt.value==""){
//		if(ofc_post_dt=="TODAY"){
//			formObj.post_dt.value = getTodayStr();
//		}
//	}
	formObj.agent_curr_cd.value=ofc_curr_cd;
	formObj.cust_curr_cd.value=ofc_curr_cd;
}
function setActShipper(){
	var formObj=document.frm1;
	//2011.12.05 Kim,Jin-Hyuk
	//항공 수출 HAWB Shipper 입력하면 A/Shipper도 같이 입력해준다. 수정은 가능
 	// #25244 Customer 정보가 있어도 Shipper 변경 시 Customer 를 Shipper 로 다시 변경함
/*	if(  trim(formObj.act_shpr_trdp_cd.value)=="" 
		  && trim(formObj.act_shpr_trdp_nm.value)=="" 
		  && trim(formObj.act_shp_info.value)==""){
		formObj.act_shpr_trdp_cd.value=formObj.shpr_trdp_cd.value;
		formObj.act_shpr_trdp_nm.value=formObj.shpr_trdp_nm.value;
		formObj.act_shp_info.value=formObj.shpr_trdp_addr.value;
	}*/
	
	// #41998 B/L Type 이 Co-Load 혹은 Third Party 인 경우에는 Shipper 선택 시 Customer 를 세팅하지 않습니다.
	/*
	formObj.act_shpr_trdp_cd.value=formObj.shpr_trdp_cd.value;
	formObj.act_shpr_trdp_nm.value=formObj.shpr_trdp_nm.value;
	formObj.act_shp_info.value=formObj.shpr_trdp_addr.value;
	
	// 요구사항 #25751  TP 일때 Customer 와 Issuing Carrier 일치 
	if(formObj.hbl_tp_cd.value =='TP') syncCustomerToCarrier();
	//#25711 [SUNWAY]Sales Man 자동 설정 
	if (typeof(formObj.sls_usrid.value)!='undefined'
		&& typeof(formObj.sls_usr_nm.value)!='undefined'
			&& typeof(formObj.sls_ofc_cd.value)!='undefined'
				&& typeof(formObj.sls_dept_cd.value)!='undefined')
	{
		setSalesMan(formObj.act_shpr_trdp_cd.value);
	}
	*/
	
	if(formObj.hbl_tp_cd.value != 'CL' && formObj.hbl_tp_cd.value != 'TP'){
		formObj.act_shpr_trdp_cd.value 	= formObj.shpr_trdp_cd.value;
		formObj.act_shpr_trdp_nm.value 	= formObj.shpr_trdp_nm.value;
		formObj.act_shp_info.value 	= formObj.shpr_trdp_addr.value;
		
		//#25711 [SUNWAY]Sales Man 자동 설정 
		if (typeof(formObj.sls_usrid.value)!='undefined'
			&& typeof(formObj.sls_usr_nm.value)!='undefined'
				&& typeof(formObj.sls_ofc_cd.value)!='undefined'
					&& typeof(formObj.sls_dept_cd.value)!='undefined')
		{
			setSalesMan(formObj.act_shpr_trdp_cd.value);
		}
	}
}
function chkUnit(){
	amountChange(frm1.agent_rt);
	amountChange(frm1.cust_rt);
}
function checkRefNo(obj){
	if(frm1.ref_no.value!=""){
		ajaxSendPost(getRefNoInfo, 'reqVal', '&goWhere=aj&bcKey=getRefNoInfo&air_sea_clss_cd=A&bnd_clss_cd=O&ref_no='+frm1.ref_no.value, './GateServlet.gsl');
	}else{
		frm1.ref_no.value="";
		frm1.ref_ofc_cd.value="";
	}
}
function getRefNoInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var result=doc[1].split('^^');
			//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
			var cfmFlg=true;
			
			/*
			//if(frm1.copy_bl_seq.value != ""){
				if(frm1.prnr_trdp_cd.value != "" || frm1.iss_trdp_cd.value != "" || frm1.hbl_tp_cd.value != result[56]){
					cfmFlg=confirm(getLabel('AIR_MSG_099'));
				}
			//}
			*/
			
			// #50581 - [BINEX] HB/L DATE INPUT ISSUE 관련
			if(AEH_ISS_CARR_DFT == "Y"){
				if(frm1.prnr_trdp_cd.value != "" || frm1.hbl_tp_cd.value != result[56]){
					cfmFlg=confirm(getLabel('AIR_MSG_101'));
				}
			}else{
				if(frm1.prnr_trdp_cd.value != "" || frm1.iss_trdp_cd.value != "" || frm1.hbl_tp_cd.value != result[56]){
					cfmFlg=confirm(getLabel('AIR_MSG_099'));
				}
			}
			
			frm1.ref_ofc_cd.value=result[1];
			frm1.rlt_intg_bl_seq.value=result[2];
			frm1.mbl_no.value=result[3]; //master bl no
			frm1.lnr_trdp_cd.value=result[6]; //lnr_trdp_cd
			frm1.lnr_trdp_nm.value=result[7]; //lnr_trdp_nm
			frm1.pod_nod_cd.value=result[8]; //pod_cd
			frm1.pod_cd.value=result[8]; //pod_cd
			frm1.pod_nm.value=result[9]; //pod_nm
			frm1.pol_nod_cd.value=result[10]; //pol_cd
			frm1.pol_cd.value=result[10]; //pol_cd
			frm1.pol_nm.value=result[11]; //pol_nm
			frm1.etd_dt_tm.value=modiStrDateType(result[12].substring(0,8), 1); //etd_dt_tm
			frm1.post_dt.value=modiStrDateType(result[51].substring(0,8), 1); //etd_dt_tm
			frm1.eta_dt_tm.value=modiStrDateType(result[13].substring(0,8), 1); //eta_dt_tm
			frm1.etd_tm.value=frm1.etd_dt_tm.value=='' ? '' : result[12].substring(8,10) + ":" + result[12].substring(10,12);
			frm1.eta_tm.value=frm1.eta_dt_tm.value=='' ? '' : result[13].substring(8,10) + ":" + result[13].substring(10,12);
			frm1.flt_no.value=result[14];
			frm1.lnr_bkg_no.value=result[17];
			frm1.prnr_trdp_cd2.value=result[25];
			frm1.prnr_trdp_nm2.value=result[26];
			frm1.prnr_trdp_addr2.value=result[38];
			frm1.ts1_port_cd.value=result[42];
			frm1.ts1_flt_no.value=result[43];
			frm1.ts2_port_cd.value=result[44];
			frm1.ts2_flt_no.value=result[45];
			frm1.ts3_port_cd.value=result[46];
			frm1.ts3_flt_no.value=result[47];
			frm1.fst_to_cd.value=result[101];
			frm1.fst_to_nm.value=result[102];
			/*
			if(result[56] != null && result[56] != '' && result[56] == 'TP')
			{
				frm1.third_trdp_cd.value=result[95];
				frm1.third_trdp_nm.value=result[96];
				frm1.third_trdp_addr.value=result[97];					
			}
			*/
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 Start */  
			if(result[56] != null && result[56] != '' && (result[56] == 'DR' || result[56] == 'FW' ) )
			{
				frm1.ntfy_trdp_cd.value=result[58]; //ntfy_trdp_cd
				frm1.ntfy_trdp_nm.value=result[59]; //ntfy_trdp_nm
				frm1.ntfy_trdp_addr.value=result[60]; //ntfy_trdp_addr
				//frm1.fnl_dest_loc_cd.value		= result[61]; //fnl_dest_loc_cd
				//frm1.fnl_dest_loc_nm.value		= result[62]; //fnl_dest_loc_nm
				//frm1.profit_share.value			= result[63]; //profit_share
				frm1.pck_qty.value=result[64]; //pck_qty
				frm1.pck_ut_cd.value=result[65]; //pck_ut_cd
				//frm1.grs_wgt.value				= result[66]; //grs_wgt
				//frm1.grs_wgt1.value				= result[67]; //grs_wgt1
				//frm1.meas.value					= result[68]; //meas
				//frm1.meas1.value				= result[69]; //meas1
				frm1.bl_iss_dt.value=result[70]; //bl_iss_dt
				frm1.shpr_trdp_cd.value=result[34]; //shpr_trdp_cd
				frm1.shpr_trdp_nm.value=result[35]; //shpr_trdp_nm
				frm1.shpr_trdp_addr.value=result[36]; //shpr_trdp_addr
				frm1.cnee_trdp_cd.value=result[23]; //cnee_trdp_cd
				frm1.cnee_trdp_nm.value=result[24]; //cnee_trdp_nm
				frm1.cnee_trdp_addr.value=result[37]; //cnee_trdp_addr
				/* jsjang 2013.7.10 요구사항 #17108 HAWB Agent 정보 추가 Start */
				/*
				frm1.prnr_trdp_cd.value=result[71]; //prnr_trdp_cd
				frm1.prnr_trdp_nm.value=result[72]; //prnr_trdp_nm
				frm1.prnr_trdp_addr.value=result[73]; //prnr_trdp_addr	
				*/
				/* jsjang 2013.7.10 요구사항 #17108 HAWB Agent 정보 추가 End */
				frm1.bl_dt_tm.value=result[79]; //bl_dt_tm
				//disp_ntfy_flg
				if(result[80]=="Y"){
					frm1.disp_ntfy_flg.checked=true;
				}
				else{
					frm1.disp_ntfy_flg.checked=false;
				}				
				frm1.cargo_tp_cd.value=result[81]; //cargo_tp_cd
				frm1.rep_cmdt_cd.value=result[82];	//rep_cmdt_cd
				frm1.rep_cmdt_nm.value=result[83];	//rep_cmdt_nm
				frm1.agent_grs_wgt.value=result[66];	//agent_grs_wgt
				frm1.agent_grs_wgt1.value=result[67];	//agent_grs_wgt1
				frm1.grs_wgt.value=result[66];	//grs_wgt
				frm1.grs_wgt1.value=result[67];	//grs_wgt1
				frm1.agent_chg_wgt.value=result[84];	//agent_chg_wgt
				frm1.agent_chg_wgt1.value=result[85];	//agent_chg_wgt1
				frm1.chg_wgt.value=result[84];	//chg_wgt
				frm1.chg_wgt1.value=result[85];	//chg_wgt1
				frm1.vol_wgt.value=result[86];	//vol_wgt
				frm1.vol_meas.value=result[87];	//vol_meas
				frm1.h_vol_meas.value=result[87]; //h_vol_meas
				if(result[88]=="CM"){
					frm1.size_ut_cd[0].checked=true;
					frm1.size_ut_cd[1].checked=false;
				}else if(result[88]=="INCH"){
					frm1.size_ut_cd[0].checked=false;
					frm1.size_ut_cd[1].checked=true;
				}else{
					frm1.size_ut_cd[0].checked=false;
					frm1.size_ut_cd[1].checked=false;
				}
				frm1.size_ut_cd1.value=result[88];
				frm1.decl_cstms_val.value=result[89];	//decl_cstms_val
				frm1.rt_clss_cd.value=result[90];	//rt_clss_cd
			}
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End */
			//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
			if(cfmFlg){
				/* #23821 : [BINEX] Issuing Carrier, MAWB -> HAWB, jsjang 2013.11.25 */
				frm1.hbl_tp_cd.value=result[56]; //hbl_tp_cd
				/* jsjang 2013.7.10 요구사항 #17108 HAWB Agent 정보 추가 Start */
				frm1.prnr_trdp_cd.value=result[23]; //prnr_trdp_cd
				frm1.prnr_trdp_nm.value=result[24]; //prnr_trdp_nm
				frm1.prnr_trdp_addr.value=result[37]; //prnr_trdp_addr
				/* jsjang 2013.7.10 요구사항 #17108 HAWB Agent 정보 추가 End */
				/*
				if(result[56] != null && result[56] != '' && result[56] == 'TP')
				{
					#23821 : [BINEX] Issuing Carrier, MAWB -> HAWB, jsjang 2013.11.25 
					#25751 : TP 이면 Customer 와 sync 시킨다.
					frm1.iss_trdp_cd.value=result[95];
					frm1.iss_trdp_nm.value=result[96];
					frm1.iss_trdp_addr.value=result[97];
					
					syncCustomerToCarrier();
				} else {
					// mawb의 office 의 기본거래처 코드 (ex, BINEXMAINCMP) 를 COPY 한다
					frm1.iss_trdp_cd.value=result[34];
					frm1.iss_trdp_nm.value=result[35];
					frm1.iss_trdp_addr.value=result[36];
				}*/
				
				// #48143 요건으로 MAINCMP 값을 가져오도록 변경
				// Issue Carrier 동기화
				//frm1.iss_trdp_cd.value 			= result[95];
				//frm1.iss_trdp_nm.value 			= result[96];
				//frm1.iss_trdp_addr.value 		= result[97];
				
				// #50581 - [BINEX] HB/L DATE INPUT ISSUE 관련
				if(AEH_ISS_CARR_DFT == "N"){
					frm1.iss_trdp_cd.value 			= result[95];
					frm1.iss_trdp_nm.value 			= result[96];
					frm1.iss_trdp_addr.value 		= result[97];
				}
			}	
		}else{
			// frm1.ref_no.value           = '';
			frm1.ref_no.value='';
			frm1.ref_ofc_cd.value='';
			frm1.rlt_intg_bl_seq.value='';
			frm1.mbl_no.value='';
			frm1.lnr_trdp_cd.value='';
			frm1.lnr_trdp_nm.value='';
			frm1.pod_nod_cd.value='';
			frm1.pod_cd.value='';
			frm1.pod_nm.value='';
			frm1.pol_nod_cd.value='';
			frm1.pol_cd.value='';
			frm1.pol_nm.value='';
			frm1.etd_dt_tm.value='';
			frm1.eta_dt_tm.value='';
			frm1.etd_tm.value='';
			frm1.eta_tm.value='';
			frm1.flt_no.value='';
			frm1.prnr_trdp_cd2.value='';
			frm1.prnr_trdp_nm2.value='';
			frm1.prnr_trdp_addr2.value='';
			frm1.ts1_port_cd.value='';
			frm1.ts1_flt_no.value='';
			frm1.ts2_port_cd.value='';
			frm1.ts2_flt_no.value='';
			frm1.ts3_port_cd.value='';
			frm1.ts3_flt_no.value='';
			frm1.fst_to_cd.value='';
			frm1.fst_to_nm.value='';
			/* #23821 : [BINEX] Issuing Carrier, MAWB -> HAWB, jsjang 2013.11.25 */
			frm1.hbl_tp_cd.value='';
			//LHK, 20140319 테스트시 오류 발견되어 수정함. 
			//if(result[56] != null && result[56] != '' && result[56] == 'TP')
			//{
			//	frm1.third_trdp_cd.value 		= '';
			//	frm1.third_trdp_nm.value 		= '';
			//	frm1.third_trdp_addr.value 		= '';				
			//}
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 Start */ 
			if (result != undefined) {
				if(result[56] != null && result[56] != '' && (result[56] == 'DR' || result[56] == 'FW' ) )
				{
					frm1.ntfy_trdp_cd.value='';
					frm1.ntfy_trdp_nm.value='';
					frm1.ntfy_trdp_addr.value='';
					//frm1.fnl_dest_loc_cd.value		= result[61]; //fnl_dest_loc_cd
					//frm1.fnl_dest_loc_nm.value		= result[62]; //fnl_dest_loc_nm
					//frm1.profit_share.value			= result[63]; //profit_share
					frm1.pck_qty.value='';
					frm1.pck_ut_cd.value='';
					//frm1.grs_wgt.value				= result[66]; //grs_wgt
					//frm1.grs_wgt1.value				= result[67]; //grs_wgt1
					//frm1.meas.value					= result[68]; //meas
					//frm1.meas1.value				= result[69]; //meas1
					frm1.bl_iss_dt.value='';
					frm1.shpr_trdp_cd.value='';
					frm1.shpr_trdp_nm.value='';
					frm1.shpr_trdp_addr.value='';
					frm1.cnee_trdp_cd.value='';
					frm1.cnee_trdp_nm.value='';
					frm1.cnee_trdp_addr.value='';
					frm1.bl_dt_tm.value='';
					frm1.disp_ntfy_flg.checked=false;			
					frm1.cargo_tp_cd.value='';
					frm1.rep_cmdt_cd.value='';
					frm1.rep_cmdt_nm.value='';
					frm1.agent_grs_wgt.value='';
					frm1.agent_grs_wgt1.value='';
					frm1.grs_wgt.value='';
					frm1.grs_wgt1.value='';
					frm1.agent_chg_wgt.value='';
					frm1.agent_chg_wgt1.value='';
					frm1.chg_wgt.value='';
					frm1.chg_wgt1.value='';
					frm1.vol_wgt.value='';
					frm1.vol_meas.value='';
					frm1.size_ut_cd[0].checked=true;
					frm1.size_ut_cd[1].checked=false;
					frm1.size_ut_cd1.value='';
					//frm1.decl_cstms_val.value		= result[89];	//decl_cstms_val
					//frm1.rt_clss_cd.value			= result[90];	//rt_clss_cd
					frm1.decl_cstms_val.value='';	//decl_cstms_val
					frm1.rt_clss_cd.value='';	//rt_clss_cd				
				}
			}
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End */	
			frm1.prnr_trdp_cd.value='';
			frm1.prnr_trdp_nm.value='';
			frm1.prnr_trdp_addr.value='';
			/* #23821 : [BINEX] Issuing Carrier, MAWB -> HAWB, jsjang 2013.11.25 */
			frm1.iss_trdp_cd.value='';
			frm1.iss_trdp_nm.value='';
			frm1.iss_trdp_addr.value='';		
		}  
		
		// Contribution Margin 조회
		if (frm1.act_shpr_trdp_cd.value != ""){
			setCtrbMgn(frm1.act_shpr_trdp_cd.value);
		}
	}else{
	}
}
function sheet14_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj,'dc_', 'A', 'O', 'H');
	}
}
function sheet14_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
}
/**
 * Freight B/C 처리
 */
function sheet14_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'A', 'O', 'H');
}
/**
 * Freight B/C 처리
 */
function sheet14_OnClick(sheetObj, row, col){
	mutiSheetOnClick(sheetObj, row, col, 'dc_', 'A', 'O', 'H');
}
/**
 * Freight B/C 처리
 * Type/Size에 따른 Volume(수량) 체크
 */
function sheet14_OnChange(sheetObj, row, col, value) {
	switch (sheetObj.ColSaveName(col)) {
		case "dc_fr_qty" :
		case "dc_fr_ru" :
		case "dc_fr_agent_ru" :
		case "dc_fr_inv_xcrt" :
		case "dc_fr_inv_sum_amt" :
		case "dc_fr_agent_amt" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	mutiSheetOnChange(sheetObj, row, col,  'dc_', 'A', 'O', 'H');
}
function sheet14_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'dc_');
}
function goToInvoice(sheetObj, obj){
	switch(obj){
		case "LOCAL":
			var formObj=document.frm1;
			if( frFrtCheckRow(sheetObj, "")){
				return;
			}
			var chkCnt=0;
			var chk_fr_trdp_cd="";
			var chk_fr_trdp_nm="";
			var chk_fr_inv_curr_cd="";
			var chk_fr_frt_seq="";
			for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
				if(sheetObj.GetCellValue(i, "fr_frt_check") == 1){
					chk_fr_trdp_cd=sheetObj.GetCellValue(i, 'fr_trdp_cd');
					chk_fr_trdp_nm=sheetObj.GetCellValue(i, 'fr_trdp_nm');
					chk_fr_inv_curr_cd=sheetObj.GetCellValue(i, 'fr_inv_curr_cd');
					if(chkCnt > 0){
						chk_fr_frt_seq += ", ";
					}
					chk_fr_frt_seq		+= 	sheetObj.GetCellValue(i, 'fr_frt_seq');
					chkCnt++;
				}
			}
			var param="&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
			param += "&s_bl_no=" + formObj.bl_no.value;
			param += "&f_bl_no=" + formObj.bl_no.value;
			param += "&f_air_sea_clss_cd=A";
			param += "&f_biz_clss_cd=H";
			param += "&f_bnd_clss_cd=O";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
		   	var paramStr="./ACC_INV_0010.clt?f_cmd="+param;
		   	parent.mkNewFrame('A/R Entry', paramStr);
		break;
		case "AP":
			var formObj=document.frm1;
			if( frFrtCheckRow(sheetObj, "b_")){
				return;
			}
			var chkCnt=0;
			var chk_fr_trdp_cd="";
			var chk_fr_trdp_nm="";
			var chk_fr_inv_curr_cd="";
			var chk_fr_frt_seq="";
 			for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
 				if(sheetObj.GetCellValue(i, "b_fr_frt_check") == 1){
				chk_fr_trdp_cd=sheetObj.GetCellValue(i, 'b_fr_trdp_cd');
				chk_fr_trdp_nm=sheetObj.GetCellValue(i, 'b_fr_trdp_nm');
				chk_fr_inv_curr_cd=sheetObj.GetCellValue(i, 'b_fr_inv_curr_cd');
					if(chkCnt > 0){
						chk_fr_frt_seq += ',';
					}
					chk_fr_frt_seq		+= 	sheetObj.GetCellValue(i, 'b_fr_frt_seq');
					chkCnt++;
				}
			}
			var param="&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
			param += "&s_bl_no=" + formObj.bl_no.value;
			param += "&f_bl_no=" + formObj.bl_no.value;
			param += "&f_air_sea_clss_cd=A";
			param += "&f_biz_clss_cd=H";
			param += "&f_bnd_clss_cd=O";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
		   	var paramStr="./ACC_INV_0030.clt?f_cmd="+param;
		   	parent.mkNewFrame('A/P Entry(Cost)', paramStr);
		break;
		case "DC":
			var formObj=document.frm1;
			if( frFrtCheckRow(sheetObj, "dc_")){
				return;
			}
			var chkCnt=0;
			var chk_fr_trdp_cd="";
			var chk_fr_trdp_nm="";
			var chk_fr_inv_curr_cd="";
			var chk_fr_frt_seq="";
			for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
				if(sheetObj.GetCellValue(i, "dc_fr_frt_check") == 1){
					chk_fr_trdp_cd=sheetObj.GetCellValue(i, 'dc_fr_trdp_cd');
					chk_fr_trdp_nm=sheetObj.GetCellValue(i, 'dc_fr_trdp_nm');
					chk_fr_inv_curr_cd=sheetObj.GetCellValue(i, 'dc_fr_inv_curr_cd');
					if(chkCnt > 0){
						chk_fr_frt_seq += ',';
					}
					chk_fr_frt_seq		+= 	sheetObj.GetCellValue(i, 'dc_fr_frt_seq');
					chkCnt++;
				}
			}
			var param="&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
			param += "&s_bl_no=" + formObj.bl_no.value;
			param += "&f_bl_no=" + formObj.bl_no.value;
			param += "&f_air_sea_clss_cd=A";
			param += "&f_biz_clss_cd=H";
			param += "&f_bnd_clss_cd=O";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
		   	var paramStr="./ACC_INV_0020.clt?f_cmd="+param;
		   	parent.mkNewFrame('D/C Note Entry', paramStr);
		break;
	}
}
function goToInvoiceModify(obj){
	var arObj=docObjects[2];
	var apObj=docObjects[3];
	var dcObj=docObjects[8];
	switch(obj){
		case "LOCAL":
			if(arObj.GetCellValue(arObj.GetSelectRow(), "fr_inv_seq")!=""){
				var param="&f_inv_seq=" + arObj.GetCellValue(arObj.GetSelectRow(), "fr_inv_seq");
//				param += "&f_inv_no=" + arObj.CellValue(arObj.SelectRow, "fr_inv_no");
				var paramStr="./ACC_INV_0010.clt?f_cmd="+param;
				parent.mkNewFrame('A/R Entry', paramStr);
			}else{
			}
		break;
		case "AP":
			if(apObj.GetCellValue(apObj.GetSelectRow(), "b_fr_inv_seq")!=""){
				var param="&f_inv_seq=" + apObj.GetCellValue(apObj.GetSelectRow(), "b_fr_inv_seq");
//				param += "&f_inv_no=" + apObj.CellValue(apObj.SelectRow, "b_fr_inv_no");
				var paramStr="./ACC_INV_0030.clt?f_cmd="+param;
				parent.mkNewFrame('A/P Entry(Cost)', paramStr);
			}else{
			}
		break;
		case "DC":
			if(dcObj.GetCellValue(dcObj.GetSelectRow(), "dc_fr_inv_seq")!=""){
				var param="&f_inv_seq=" + dcObj.GetCellValue(dcObj.GetSelectRow(), "dc_fr_inv_seq");
//				param += "&f_inv_no=" + dcObj.CellValue(dcObj.SelectRow, "dc_fr_inv_no");
				var paramStr="./ACC_INV_0020.clt?f_cmd="+param;
				parent.mkNewFrame('D/C Note Entry', paramStr);
			}else{
			}
		break;
	}
}
function getCBM(){
//	if(frm1.h_vol_meas.value==0){
//		frm1.desc_txt.value += "\r\n";
//		frm1.desc_txt.value += frm1.vol_meas.value + "(M3)";
//		frm1.desc_txt.value = frm1.desc_txt.value.replaceAll("\r\n0.000000(M3)", ""); 
//	}else{
//		//alert(frm1.desc_txt.value + "\n" + frm1.h_vol_meas.value + "\n" + frm1.vol_meas.value);
//		frm1.desc_txt.value = frm1.desc_txt.value.replace(frm1.h_vol_meas.value, frm1.vol_meas.value);
//	}
	frm1.h_vol_meas.value=frm1.vol_meas.value;
}
function addZeroBack(obj, digit){
	var tmp=obj.toString().split(".");
	if(tmp[1] != null){
		var cnt=digit - tmp[1].length;
		if(cnt <= 0){
			return obj;
		}else{
			for(var i=0 ; i<cnt ; i++){
				obj += '0';
			}
			return obj;
		}
	}else{
		if(obj == 0){
			return '0.000000';
		}else{
			return obj + '.000000';
		}
	}
}
function cargoDesc(){
	if(frm1.cargo_tp_cd.value=='NOR'){
//		frm1.desc_txt.value += "\r\n";
//		frm1.desc_txt.value += "CONSOLIDATED SHIPMENT AS PER ATTACHED CARGO MANIFEST";
	}else if(frm1.cargo_tp_cd.value=='DGG'){
		frm1.hndl_info_txt.value += "DANGEROUS GOODS AS PER ATTACHED SHIPPER'S DECLARATION";
	}else if(frm1.cargo_tp_cd.value=='SPC'){
	}else if(frm1.cargo_tp_cd.value=='DRY'){
		frm1.desc_txt.value += "\r\n";
		frm1.desc_txt.value += "UN1845";
		frm1.desc_txt.value += "\r\n";
		frm1.desc_txt.value += "CARBON DIOXIDE, SOLID";
	}else if(frm1.cargo_tp_cd.value=='BAT'){
		frm1.hndl_info_txt.value += "LITHIUM METAL BATTERIES OR CELLS, NOT RESTRICTED AS PER PI970//THIS PACKAGE MUST BE HANDLED WITH CARE AND A FLAMMABLILITY HAZARD EXISTS, IF THE PACKAGE IS DAMAGED. DO NOT DAMAGE OR MISHANDLE THIS NECESSARY, BATTERIES MUST BE REPACKED SO AS TO PREVENT SHORT CIRCUIT. CON TACTTEL NUMBER : +81-465-85-2369 (JAPAN)";
	}else{
	}
}
function checkBlInvReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='N'){
			isInvStsOk=false;
		}else{
			isInvStsOk=true;
		}
	}
}
function checkTrdpCode(obj){
	if(obj.name=="prnr_trdp_nm"){
	}else if(obj.name=="shpr_trdp_nm"){
		if(frm1.shpr_trdp_cd.value==""){
			frm1.shpr_trdp_addr.value=obj.value;
		}
	}else if(obj.name=="cnee_trdp_nm"){
		if(frm1.cnee_trdp_cd.value==""){
			frm1.cnee_trdp_addr.value=obj.value;
		}
	}else if(obj.name=="ntfy_trdp_nm"){
		if(frm1.ntfy_trdp_cd.value==""){
			frm1.ntfy_trdp_addr.value=obj.value;
		}
	}else if(obj.name=="act_shpr_trdp_nm"){
		if(frm1.act_shpr_trdp_cd.value==""){
			frm1.act_shp_info.value=obj.value;
		}
	}else if(obj.name=="cust_trdp_nm"){
	}else if(obj.name=="lnr_trdp_nm"){
	}else if(obj.name=="carr_trdp_nm"){
	}else if(obj.name=="prnr_trdp_nm2"){
	}else if(obj.name=="iss_trdp_nm"){
	}else if(obj.name=="third_trdp_nm"){
	}
}
// Dim 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
function sheet4_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow()== row && "dim_meas1" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			gridAdd(1);
			sheetObj.SelectCell(sheetObj.LastRow(), 0);
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "dim_len_dim" :
		case "dim_wdt_dim" :
		case "dim_hgt_dim" :
		case "dim_pce_qty" :
		case "dim_chg_wgt"  :
		case "dim_chg_wgt1" :
		case "dim_meas" :
		case "dim_meas1" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
function displayChange(){
	if(frm1.disp_ntfy_flg.value == "Y"){
		frm1.mk_txt.value = '[NOTIFY]' + '\r\n' + frm1.ntfy_trdp_addr.value + '\r\n' + frm1.mk_txt.value;
		frm1.acctg_info_txt.value = '[NOTIFY]' + '\r\n' + frm1.acctg_info_txt.value;
	}else{
		frm1.mk_txt.value = frm1.mk_txt.value.replace("[NOTIFY]" + "\r\n" + frm1.ntfy_trdp_addr.value + '\r\n',"");
		frm1.acctg_info_txt.value = frm1.acctg_info_txt.value.replace("[NOTIFY]" + "\r\n","");
	}
}
/*
 * 2012.02.15
 * JAPAN만 적용
 * BL DATE 변경하면, BKG DATE, ISSUE DATE 다 같은 날짜로 변경한다. 
 */
function changeBLDate(){
	if(user_ofc_cnt_cd=="JP"){
		frm1.bkg_dt_tm.value=frm1.bl_dt_tm.value;
		frm1.bl_iss_dt.value=frm1.bl_dt_tm.value;
	}
}
function notifyKeyIn(){
	if(typeof(document.getElementsByName("disp_ntfy_flg")[0])=="undefined"){
		frm1.acctg_info_txt.value=frm1.ntfy_trdp_addr.value;
	}else{
		if(document.getElementsByName("disp_ntfy_flg")[0].value == "Y"){
			frm1.acctg_info_txt.value='[NOTIFY]' + '\r\n' + frm1.ntfy_trdp_addr.value;
		}else{
			frm1.acctg_info_txt.value=frm1.ntfy_trdp_addr.value;
		}
	}
}
function pckChange(){
	docObjects[9].SetCellValue(1, "rcp_pce_qty",frm1.pck_qty.value);
	docObjects[9].SetCellValue(2, "rcp_pce_qty",frm1.pck_qty.value);
}
function sGrsChange(){
	/*
	if(frm1.wgt_disp_cd.value=="KL"){
		docObjects[9].Cellvalue(1, "rcp_grs_wgt")=frm1.agent_grs_wgt.value + "  K" + "\r\n" + "(" + frm1.agent_grs_wgt1.value + "  L" + ")";
		docObjects[9].Cellvalue(2, "rcp_grs_wgt")=frm1.grs_wgt.value + "  K" + "\r\n" + "(" + frm1.grs_wgt1.value + "  L" + ")";
	}else if(frm1.wgt_disp_cd.value=="K"){
		docObjects[9].Cellvalue(1, "rcp_grs_wgt")=frm1.agent_grs_wgt.value + "  K";
		docObjects[9].Cellvalue(2, "rcp_grs_wgt")=frm1.grs_wgt.value + "  K";
	}else if(frm1.wgt_disp_cd.value=="LK"){
		docObjects[9].Cellvalue(1, "rcp_grs_wgt")=frm1.agent_grs_wgt1.value + "  L" + "\r\n" + "(" + frm1.agent_grs_wgt.value + "  K" + ")";
		docObjects[9].Cellvalue(2, "rcp_grs_wgt")=frm1.grs_wgt1.value + "  L" + "\r\n" + "(" + frm1.grs_wgt.value + "  K" + ")";
	}else if(frm1.wgt_disp_cd.value=="L"){
		docObjects[9].Cellvalue(1, "rcp_grs_wgt")=frm1.agent_grs_wgt1.value + "  L";
		docObjects[9].Cellvalue(2, "rcp_grs_wgt")=frm1.grs_wgt1.value + "  L";
	}
	*/
	//LHK, 20130228, Show Weight on B/L as 의 옵션에 따라 조합하여 저장하지 않고, DB 에 해당 weight 를 그대로 저장하고 출력시 옵션에 따라 값을 조합하여 보여주도록 로직 수정
	docObjects[9].SetCellValue(1, "rcp_grs_wgt",frm1.agent_grs_wgt.value,0);
	docObjects[9].SetCellValue(2, "rcp_grs_wgt",frm1.grs_wgt.value,0);
	docObjects[9].SetCellValue(1, "rcp_grs_wgt1",frm1.agent_grs_wgt1.value,0);
	docObjects[9].SetCellValue(2, "rcp_grs_wgt1",frm1.grs_wgt1.value,0);
	
	cChgChange();
}
function cGrsChange(){
	/*
	if(frm1.wgt_disp_cd.value=="KL"){
		docObjects[9].Cellvalue(2, "rcp_grs_wgt")=frm1.grs_wgt.value + "  K" + "\r\n" + "(" + frm1.grs_wgt1.value + "  L" + ")";
	}else if(frm1.wgt_disp_cd.value=="K"){
		docObjects[9].Cellvalue(2, "rcp_grs_wgt")=frm1.grs_wgt.value + "  K";
	}else if(frm1.wgt_disp_cd.value=="LK"){
		docObjects[9].Cellvalue(2, "rcp_grs_wgt")=frm1.grs_wgt1.value + "  L" + "\r\n" + "(" + frm1.grs_wgt.value + "  K" + ")";
	}else if(frm1.wgt_disp_cd.value=="L"){
		docObjects[9].Cellvalue(2, "rcp_grs_wgt")=frm1.grs_wgt1.value + "  L";
	}
	*/
	//LHK, 20130228, Show Weight on B/L as 의 옵션에 따라 조합하여 저장하지 않고, DB 에 해당 weight 를 그대로 저장하고 출력시 옵션에 따라 값을 조합하여 보여주도록 로직 수정
	docObjects[9].SetCellValue(2, "rcp_grs_wgt",frm1.grs_wgt.value, 0);
	docObjects[9].SetCellValue(2, "rcp_grs_wgt1",frm1.grs_wgt1.value, 0);
}
function rtChange(){
	if(user_ofc_cnt_cd!="JP"){
		docObjects[9].SetCellValue(1, "rcp_rt_clss_cd",frm1.rt_clss_cd.value);
		docObjects[9].SetCellValue(2, "rcp_rt_clss_cd",frm1.rt_clss_cd.value);
	}
}
function sChgChange(){
	/*
	if(user_ofc_cnt_cd=="JP"){
		if(frm1.wgt_disp_cd.value=="KL"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt.value + "\r\n" + "(" + frm1.agent_chg_wgt1.value + ")";
		}else if(frm1.wgt_disp_cd.value=="K"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt.value;
		}else if(frm1.wgt_disp_cd.value=="LK"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt1.value + "\r\n" +"(" + frm1.agent_chg_wgt.value + ")";
		}else if(frm1.wgt_disp_cd.value=="L"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt1.value;
		}
	}else{
		if(frm1.wgt_disp_cd.value=="KL"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt.value + "  K" + "\r\n" + "(" + frm1.agent_chg_wgt1.value + "  L" + ")";
		}else if(frm1.wgt_disp_cd.value=="K"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt.value + "  K";
		}else if(frm1.wgt_disp_cd.value=="LK"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt1.value + "  L" + "\r\n" +"(" + frm1.agent_chg_wgt.value + "  K" + ")";
		}else if(frm1.wgt_disp_cd.value=="L"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt1.value + "  L";
		}
	}
	*/
	//LHK, 20130228, Show Weight on B/L as 의 옵션에 따라 조합하여 저장하지 않고, DB 에 해당 weight 를 그대로 저장하고 출력시 옵션에 따라 값을 조합하여 보여주도록 로직 수정
	//? JP 일경우 단위를 붙이지 않음. 로직은 같음. print 로직에 추가하겠씀.  
	docObjects[9].SetCellValue(1, "rcp_chg_wgt",frm1.agent_chg_wgt.value,0);
	docObjects[9].SetCellValue(1, "rcp_chg_wgt1",frm1.agent_chg_wgt1.value,0);
}
function cChgChange(){
	/*
	if(user_ofc_cnt_cd=="JP"){
		if(frm1.wgt_disp_cd.value=="KL"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt.value + "\r\n" + "(" + frm1.agent_chg_wgt1.value + ")";
			docObjects[9].Cellvalue(2, "rcp_chg_wgt_meas")=frm1.chg_wgt.value + "\r\n" + "(" + frm1.chg_wgt1.value + ")";
		}else if(frm1.wgt_disp_cd.value=="K"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt.value;
			docObjects[9].Cellvalue(2, "rcp_chg_wgt_meas")=frm1.chg_wgt.value;
		}else if(frm1.wgt_disp_cd.value=="LK"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt1.value + "\r\n" + "(" + frm1.agent_chg_wgt.value + ")";
			docObjects[9].Cellvalue(2, "rcp_chg_wgt_meas")=frm1.chg_wgt1.value + "\r\n" + "(" + frm1.chg_wgt.value + ")";
		}else if(frm1.wgt_disp_cd.value=="L"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt1.value;
			docObjects[9].Cellvalue(2, "rcp_chg_wgt_meas")=frm1.chg_wgt1.value;
		}
	}else{
		if(frm1.wgt_disp_cd.value=="KL"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt.value + "  K" + "\r\n" + "(" + frm1.agent_chg_wgt1.value + "  L" + ")";
			docObjects[9].Cellvalue(2, "rcp_chg_wgt_meas")=frm1.chg_wgt.value + "  K" + "\r\n" + "(" + frm1.chg_wgt1.value + "  L" + ")";
		}else if(frm1.wgt_disp_cd.value=="K"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt.value + "  K";
			docObjects[9].Cellvalue(2, "rcp_chg_wgt_meas")=frm1.chg_wgt.value + "  K";
		}else if(frm1.wgt_disp_cd.value=="LK"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt1.value + "  L" + "\r\n" + "(" + frm1.agent_chg_wgt.value + "  K" + ")";
			docObjects[9].Cellvalue(2, "rcp_chg_wgt_meas")=frm1.chg_wgt1.value + "  L" + "\r\n" + "(" + frm1.chg_wgt.value + "  K" + ")";
		}else if(frm1.wgt_disp_cd.value=="L"){
			docObjects[9].Cellvalue(1, "rcp_chg_wgt_meas")=frm1.agent_chg_wgt1.value + "  L";
			docObjects[9].Cellvalue(2, "rcp_chg_wgt_meas")=frm1.chg_wgt1.value + "  L";
		}
	}
	*/
	//LHK, 20130228, Show Weight on B/L as 의 옵션에 따라 조합하여 저장하지 않고, DB 에 해당 weight 를 그대로 저장하고 출력시 옵션에 따라 값을 조합하여 보여주도록 로직 수정
	//? JP 일경우 단위를 붙이지 않음. 로직은 같음. print 로직에 추가하겠슴.
	docObjects[9].SetCellValue(1, "rcp_chg_wgt",frm1.agent_chg_wgt.value,0);
	docObjects[9].SetCellValue(1, "rcp_chg_wgt1",frm1.agent_chg_wgt1.value,0);
	docObjects[9].SetCellValue(2, "rcp_chg_wgt",frm1.chg_wgt.value,0);
	docObjects[9].SetCellValue(2, "rcp_chg_wgt1",frm1.chg_wgt1.value,0);
}
function sRtChange(){
	docObjects[9].SetCellValue(1, "rcp_ru",frm1.agent_rt.value);
	docObjects[9].SetCellValue(1, "rcp_amt",frm1.agent_amt.value);
}
function cRtChange(){
	docObjects[9].SetCellValue(2, "rcp_ru",frm1.cust_rt.value);
	docObjects[9].SetCellValue(2, "rcp_amt",frm1.cust_amt.value);
}
function sAmtChange(){
	docObjects[9].SetCellValue(1, "rcp_amt",frm1.agent_amt.value);
}
function cAmtChange(){
	docObjects[9].SetCellValue(2, "rcp_amt",frm1.cust_amt.value);
}
function thirdChange(){
	if(frm1.hbl_tp_cd.value=="TP"){
		frm1.iss_trdp_cd.value=frm1.third_trdp_cd.value;
		frm1.iss_trdp_nm.value=frm1.third_trdp_nm.value;
		frm1.iss_trdp_addr.value=frm1.third_trdp_addr.value;
	}
}
//Freight AR 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
//freight tab에서 trdp_nm을 enter로 조회할 수 있도록 설정
function sheet6_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, '', 'A', 'O', 'H');
		}
	}
	if(sheetObj.LastRow()== row && "fr_reserve_field01" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			//gridAdd(2);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			
			//#41998 - [BINEX] [BINEX] AEH (CO-LOAD or THIRD PARTY) – Make Issuing Carrier As Default Billing Party
			frtRowAdd('ROWADD', docObjects[2], 'A', 'O', 'H');
			sheetObj.SelectCell(row + 1, 0);
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "fr_qty" :
		case "fr_ru" :
		case "fr_trf_cur_sum_amt" :
		case "fr_vat_rt" :
		case "fr_vat_amt" :
		case "fr_inv_xcrt" :
		case "fr_inv_amt" :
		case "fr_inv_vat_amt" :
		case "fr_inv_sum_amt" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
//Freight AP 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
//freight tab에서 trdp_nm을 enter로 조회할 수 있도록 설정
function sheet7_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="b_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'A', 'O', 'H');
		}
	}
	if(sheetObj.LastRow()== row && "b_fr_frt_check" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			//gridAdd(3);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			frtRowAdd('BCROWADD', docObjects[3], 'A', 'O', 'H');
			sheetObj.SelectCell(row + 1, 0);
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "b_fr_qty" :
		case "b_fr_ru" :
		case "b_fr_trf_cur_sum_amt" :
		case "b_fr_vat_rt" :
		case "b_fr_vat_amt" :
		case "b_fr_inv_xcrt" :
		case "b_fr_inv_amt" :
		case "b_fr_inv_vat_amt" :
		case "b_fr_inv_sum_amt" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
//Freight DC 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
//freight tab에서 trdp_nm을 enter로 조회할 수 있도록 설정
function sheet14_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="dc_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'A', 'O', 'H');
		}
	}
	if(sheetObj.LastRow()== row && "dc_fr_frt_check" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			//gridAdd(8);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			frtRowAdd('DCROWADD', docObjects[8], 'A', 'O', 'H');
			sheetObj.SelectCell(row + 1, 0);
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "dc_fr_qty" :
		case "dc_fr_ru" :
		case "dc_fr_agent_ru" :
		case "dc_fr_inv_xcrt" :
		case "dc_fr_inv_sum_amt" :
		case "dc_fr_agent_amt" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}

function sheet2_OnSearchEnd(sheetObj, row, col) {
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}

function sheet4_OnSearchEnd(sheetObj, row, col) {
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	
	if (sheetObj.GetEditable() == 0) {
		sheetObj.SetEditable(1);
	}
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}

/**
 * IBSeet내의 데이터 셀에서 키보드가 눌린 경우 발생하는 Event<br>
 * @param {sheetObj} String : 해당 IBSheet Object
 * @param {row} Long : 해당 셀의 row Index
 * @param {col} Long : 해당 셀의 Column Index
 * @param {keyCode} Integer : 키보드의 아스키 값
 */
//Mark Description tab에서 KeyDown Event
function sheet2_OnKeyDown(sheetObj, row, col, keyCode) {
	switch (sheetObj.ColSaveName(col)) {
		case "rcp_grs_wgt":
		case "rcp_grs_wgt1":
		case "rcp_chg_wgt":
		case "rcp_chg_wgt1":
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
//Job Visibility 
function sheet11_OnChange(sheetObj, row, col, value) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "jb_sts_nm"){
		for(var i=1; i<=sheetObj.LastRow(); i++){
			if(i != row){
if(sheetObj.GetCellValue(i,"jb_sts_nm") == sheetObj.GetCellValue(row,"jb_sts_nm")){
					//Duplication Task
					alert(getLabel('FMS_COM_ALT008'));
					sheetObj.SetCellValue(row,"jb_sts_nm","");
				}
			}
		}
	}
}

function sheet13_OnSearchEnd(sheetObj, row, col) {
	var formObj=document.frm1;
	var rows=sheetObj.SearchRows();
	
	sheetObj.SetSumValue("hwifr_frt_nm", "TOTAL");
	
	var sRow=sheetObj.FindSumRow();
	
    if(sRow != -1){
    	sheetObj.SetCellFont("FontBold", sRow, "hwifr_frt_nm", sRow, "hwifr_frt_nm",1);
    	sheetObj.SetCellAlign(sRow, "hwifr_frt_nm", "Center")
    }
	
	if(rows == 0){
		var curRow = sheetObj.DataInsert();
		
		var v_index = formObj.pck_ut_cd.selectedIndex;
		if(v_index < 0) v_index = 0;
		
		var pck_qty = formObj.pck_qty.value;
		var pck_ut_nm = formObj.pck_ut_cd.options[v_index].text;
		
		if(pck_qty > 1){
			pck_ut_nm = pck_ut_nm + "S";
		}
		
		sheetObj.SetCellValue(curRow, "hwifr_frt_nm", pck_qty + " " + pck_ut_nm);
		sheetObj.SetCellValue(curRow, "hwifr_grs_wgt1", frm1.chg_wgt1.value==''? 0 : Number(frm1.chg_wgt1.value.replaceAll(",","")).toFixed(2));
				
		var hwi_frt_list = HWI_FRT_NM.split("|");
		for(var i=0; i < hwi_frt_list.length; i++) {
			curRow = sheetObj.DataInsert();
			sheetObj.SetCellValue(curRow, "hwifr_frt_nm", hwi_frt_list[i]);
		}
		sheetObj.SetSelectRow(1);
	}
}

function sheet13_OnChange(sheetObj, row, col, value){
	var colStr = sheetObj.ColSaveName(col);
	/*if(colStr == "hwifr_inv_amt"){
		if(trim(sheetObj.GetCellValue(row, "hwifr_frt_nm").toUpperCase()) == "O/FRT"){
			for(var i=1; i < sheetObj.LastRow() + 1; i++){
				if(trim(sheetObj.GetCellValue(i, "hwifr_frt_nm").toUpperCase()) == "OCEAN FSC"){
					sheetObj.SetCellValue(i, "hwifr_inv_amt", value * 24.5 / 100)
				}
			}
		}else if(trim(sheetObj.GetCellValue(row, "hwifr_frt_nm").toUpperCase()) == "DOOR DLY"){
			for(var i=1; i < sheetObj.LastRow() + 1; i++){
				if(trim(sheetObj.GetCellValue(i, "hwifr_frt_nm").toUpperCase()) == "TAX"){
					sheetObj.SetCellValue(i, "hwifr_inv_amt", value * 4.987 / 100)
				}
			}
		}
	}else*/ 
	
	if(colStr == "hwifr_ru"){
		var hwifr_grs_wgt1 = sheetObj.GetCellValue(1, "hwifr_grs_wgt1");
		sheetObj.SetCellValue(row, "hwifr_inv_amt", roundXL(value * hwifr_grs_wgt1, 2));
	}
}

var grobalFlag="";
function selectAutoAir(flag){
	var param='';
	if(flag=="S"){
		grobalFlag=flag;
		//frm1.lnr_trdp_cd.value	== '' ? param += '' : param += '&trdp_cd=' + frm1.lnr_trdp_cd.value;
		param += '&trdp_tp_cd=';
		param += '&sell_buy_tp_cd=A' + '&bnd_clss_cd=O';
		frm1.pol_cd.value		== '' ? param += '' : param += '&pol_cd=' + frm1.pol_cd.value;
		frm1.pod_cd.value		== '' ? param += '' : param += '&pod_cd=' + frm1.pod_cd.value;
		frm1.post_dt.value		== '' ? param += '' : param += '&trf_term_dt=' + frm1.post_dt.value.replaceAll("-","");
	}else if(flag=="B"){
		grobalFlag=flag;
		//frm1.lnr_trdp_cd.value	== '' ? param += '' : param += '&trdp_cd=' + frm1.lnr_trdp_cd.value;
		param += '&trdp_tp_cd=';
		param += '&sell_buy_tp_cd=A' + '&bnd_clss_cd=O';
		frm1.pol_cd.value		== '' ? param += '' : param += '&pol_cd=' + frm1.pol_cd.value;
		frm1.pod_cd.value		== '' ? param += '' : param += '&pod_cd=' + frm1.pod_cd.value;
		frm1.post_dt.value		== '' ? param += '' : param += '&trf_term_dt=' + frm1.post_dt.value.replaceAll("-","");
	}else if(flag=="D"){
		grobalFlag=flag;
		//frm1.lnr_trdp_cd.value	== '' ? param += '' : param += '&trdp_cd=' + frm1.lnr_trdp_cd.value;
		param += '&trdp_tp_cd=';
		param += '&sell_buy_tp_cd=A' + '&bnd_clss_cd=O';
		frm1.pol_cd.value		== '' ? param += '' : param += '&pol_cd=' + frm1.pol_cd.value;
		frm1.pod_cd.value		== '' ? param += '' : param += '&pod_cd=' + frm1.pod_cd.value;
		frm1.post_dt.value		== '' ? param += '' : param += '&trf_term_dt=' + frm1.post_dt.value.replaceAll("-","");
	}
	ajaxSendPost(getAutoAir, 'reqVal', '&goWhere=aj&bcKey=selectAutoAir'+param, './GateServlet.gsl');
}
function getAutoAir(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArray=doc[1].split(",");
			var dtlArray=rtnArray[0].split("@@@");
 		   	var objPfx='';
 		   	var sheetObj='';
 		   	var gridVal='';
 		   	var trdp_cd='';
			if(grobalFlag=="S"){
				gridVal=2;
				trdp_cd=frm1.act_shpr_trdp_cd.value;
				sheetObj=docObjects[2];
			}else if(grobalFlag=="B"){
				objPfx='b_';
				gridVal=3;
				trdp_cd='';
				sheetObj=docObjects[3];
			}else if(grobalFlag=="D"){
				objPfx='dc_';
				gridVal=8;
				trdp_cd=frm1.prnr_trdp_cd.value;
				sheetObj=docObjects[8];
			}
			for(var i=0 ; i<dtlArray.length-1 ; i++){
				var tmpArray=dtlArray[i].split("^^^");
				var rows=0;
				var grsWgtKg=frm1.grs_wgt.value;
				var chgWgtKg=frm1.chg_wgt.value;
//				var cbm = frm1.meas.value;
				var masterWgt='';
				if(tmpArray[4]=="AGW"){
					masterWgt=grsWgtKg;
				}else if(tmpArray[4]=="ACW"){
					masterWgt=chgWgtKg;
				}
//				else if(tmpArray[4]=="CBM"){
//					masterWgt = cbm;
//				}
				//section range check
				var useFlag=true;
				if(tmpArray[8]==0 && tmpArray[9]==0){
//					alert(1 + "  " + tmpArray[8] + "  " + tmpArray[9]);
				}else if(tmpArray[8]==0 && tmpArray[9]!=0){
					if(0<=masterWgt-tmpArray[9]){
						useFlag=false;
					}
				}else if(tmpArray[8]!=0 && tmpArray[9]==0){
					if(tmpArray[8]-msterWgt>0){
						useFlag=false;
					}
				}else if(tmpArray[8]!=0 && tmpArray[9]!=0){
					if(tmpArray[8]-masterWgt>0 || 0<=masterWgt-tmpArray[9]){
						useFlag=false;
					}
				}
				if(useFlag){
					gridAdd(gridVal);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_cd",tmpArray[0]);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_cd_nm",tmpArray[1]);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_trdp_cd",trdp_cd);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_rat_curr_cd",tmpArray[3]);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_aply_ut_cd",tmpArray[4]);
					if(user_ofc_cnt_cd=="KR" && grobalFlag=="S"){
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_curr_cd","KRW");
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_term_cd","CC");
					}else{
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_curr_cd",tmpArray[4]);
					}
					if(tmpArray[4]=="AGW"){
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",grsWgtKg);
					}else if(tmpArray[4]=="ACW"){
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",chgWgtKg);
					}
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_ru",tmpArray[7]);
					var tmpInvSumAmt=sheetObj.GetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_sum_amt");
					/*if(tmpArray[5]==0 && tmpArray[6]==0){
					}
					else*/ 
					if(tmpArray[5]!=0 && tmpArray[6]==0){
						if(tmpArray[5]-tmpInvSumAmt>0){
							tmpInvSumAmt=tmpArray[5];
						}
						else{
							//tmpInvSumAmt = tmpInvSumAmt;
						}
					}
					else if(tmpArray[5]==0 && tmpArray[6]!=0){
						if(tmpArray[6]-tmpInvSumAmt>0){
							//tmpInvSumAmt = tmpInvSumAmt;
						}
						else{
							tmpInvSumAmt=tmpArray[6];
						}
					}
					else if(tmpArray[5]!=0 && tmpArray[6]!=0){
						if(tmpArray[5]-tmpInvSumAmt>0){
							tmpInvSumAmt=tmpArray[5];
						}
						else if(tmpArray[6]-tmpInvSumAmt>0){
							//tmpInvSumAmt = tmpInvSumAmt;
						}
						else{
							tmpInvSumAmt=tmpArray[6];
						}
					}
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_sum_amt",tmpInvSumAmt);
				}
			}
		}
		else{
			//There is no Iata Tariff Info.
			alert(getLabel('FMS_COM_ALT010'));
		}
	}
}
//2012.06.19 회사 상호 변경
//2012.08.01 상호 변경 시행
function chkReserve(){
	if(frm1.chk_flg.checked){
		if(user_ofc_cnt_cd=="US"){
			frm1.reserve_field06.value='Allstate Int’l Freight USA, Inc';
		}else if(user_ofc_cnt_cd=="DE"){
			frm1.reserve_field06.value='Atlantic Integrated Freight GmbH';
		}else if(user_ofc_cnt_cd=="IT"){
			frm1.reserve_field06.value='Atlantic Integrated Freight S.R.L.';
		}else if(user_ofc_cnt_cd=="FR"){
			frm1.reserve_field06.value='Atlantic Integrated Freight SARL';
		}else if(user_ofc_cnt_cd=="JP"){
			//frm1.reserve_field06.value = '';
		}else{
		}
//		if(user_ofc_cnt_cd=="US"){
//			frm1.reserve_field06.value = 'Allstate Int’l Freight USA, Inc';
//		}else if(user_ofc_cnt_cd=="DE"){
//			frm1.reserve_field06.value = 'Atlantic Integrated Freight GmbH';
//		}else if(user_ofc_cnt_cd=="IT"){
//			frm1.reserve_field06.value = 'Atlantic Integrated Freight S.R.L.';
//		}else if(user_ofc_cnt_cd=="FR"){
//			frm1.reserve_field06.value = 'Atlantic Integrated Freight SARL';
//		}else if(user_ofc_cnt_cd=="JP"){
//			//frm1.reserve_field06.value = '';
//		}else{
//		}
	}else{
		frm1.reserve_field06.value='';
	}
}
//2012.06.20 fuel surcharge, security charge
function selectTrdpCharge(){
	if(frm1.lnr_trdp_cd.value==""){
		//Please select Airline.
		alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_AIRL'));
		return;
	}
	else{
		var etd=frm1.etd_dt_tm.value.replaceAll("-","");
		etd=etd.substring(4,8) + etd.substring(0,2) + etd.substring(2,4);  
		ajaxSendPost(getTrdpCharge, 'reqVal', '&goWhere=aj&bcKey=getTrdpChargeF&trdp_cd='+frm1.lnr_trdp_cd.value+'&type=F&etd='+etd, './GateServlet.gsl');
		ajaxSendPost(getTrdpCharge, 'reqVal', '&goWhere=aj&bcKey=getTrdpChargeS&trdp_cd='+frm1.lnr_trdp_cd.value+'&type=S&etd='+etd, './GateServlet.gsl');
	}
}
//2012.06.20 Air Export House D/C에만 계산로직 적용
function getTrdpCharge(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tempVal=doc[1].split('^^;');
			for(var i=0 ; i<tempVal.length-1 ; i++){
				var rtnVal=tempVal[i].split('@@^');
				var ut_cd='';
				var amt='';
				var min=rtnVal[1];
				var max=rtnVal[2];
				var g_wgt=frm1.grs_wgt.value.replaceAll(',','');
				var c_wgt=frm1.chg_wgt.value.replaceAll(',','');
				var g_lbs=frm1.grs_wgt1.value.replaceAll(',','');
				var c_lbs=frm1.chg_wgt1.value.replaceAll(',','');
				var chkRow=0;
				//grid에서 fuel surcharge, security charge를 찾는다.
				for(var j=2 ; j<docObjects[8].RowCount() ; j++){
					if(docObjects[8].GetCellValue(j, 'dc_fr_frt_cd') == rtnVal[5]){
						chkRow=j;
					}
				}
				if(chkRow==0){
				}else{
					docObjects[8].SetCellValue(chkRow, 'dc_'+"fr_frt_cd",rtnVal[5]);
					//단위를 통해 amt를 계산함
					if(rtnVal[3]=="gw"){
						ut_cd='AGW';
						amt=g_wgt * rtnVal[0];
					}else if(rtnVal[3]=="cw"){
						ut_cd='ACW';
						amt=c_wgt * rtnVal[0];
					}else if(rtnVal[3]=="gl"){
						ut_cd='AGW';
						amt=g_lbs * rtnVal[0];
					}else if(rtnVal[3]=="cl"){
						ut_cd='ACW';
						amt=c_lbs * rtnVal[0];
					}
					//min, max를 통해 amt 계산
					if(min!=0 && amt<min){
						amt=min;
					}else if(max!=0 && amt>max){
						amt=max;
					}
					if(typeof(frm1.prnr_trdp_cd2)!='undefined' && frm1.prnr_trdp_cd2.value!=''){
						docObjects[8].SetCellValue(chkRow, 'dc_'+"fr_trdp_cd",frm1.prnr_trdp_cd2.value);
						docObjects[8].SetCellValue(chkRow, 'dc_'+"fr_trdp_nm",frm1.prnr_trdp_nm2.value);
					}else{
						docObjects[8].SetCellValue(chkRow, 'dc_'+"fr_trdp_cd",frm1.prnr_trdp_cd.value);
						docObjects[8].SetCellValue(chkRow, 'dc_'+"fr_trdp_nm",frm1.prnr_trdp_nm.value);
					}
					docObjects[8].SetCellValue(chkRow, 'dc_'+"fr_rat_curr_cd",frm1.trf_cur_cd.value);
					docObjects[8].SetCellValue(chkRow, 'dc_'+"fr_inv_curr_cd",frm1.ofc_curr.value);
					docObjects[8].SetCellValue(chkRow, 'dc_'+"fr_aply_ut_cd",ut_cd);
					docObjects[8].SetCellValue(chkRow, 'dc_'+"fr_ru",rtnVal[0]);
					docObjects[8].SetCellValue(chkRow, 'dc_'+"fr_inv_sum_amt",amt);
				}
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function getCheckAmt(obj) {
	var nCSTMS_VAL=0.0;
	var sCSTMS_VAL=obj.value;
	var bCSTMS_VAL=null;
	var cCSTMS_VAL='';
	var tmp='';
	// readOnly 이면 수정할 수 없다.
	if (obj.readOnly == false) {
		for (var idx=0;idx<sCSTMS_VAL.length;idx++){
			cCSTMS_VAL=sCSTMS_VAL.substring(idx,idx+1);
			if (	(cCSTMS_VAL >= 0 && cCSTMS_VAL <= 9)
				 || cCSTMS_VAL == ','
				 || cCSTMS_VAL == '.'
				) {
				if (cCSTMS_VAL != ',') {
					tmp += cCSTMS_VAL;
				}
				try {
					nCSTMS_VAL=parseFloat(tmp,10);
					bCSTMS_VAL=false;
					if (nCSTMS_VAL > 2500) {
						bCSTMS_VAL=true;
						break;
					}
				} catch (e) {
					// NumberFormat 오류
					// alert(e);
				}
			} else {
				tmp='';
			}
		}
		//#35200 - [BINEX]AEH, OEH ITN# 부분 로직 수정
		// ITN# 값이 Null 이 아닌 경우에는 해당 로직 타지 않고 사용자가 ITN# 가 유지되도록 수정
		if (bCSTMS_VAL != null && frm1.itn_no.value == "") {
			// decl_cstms_val 값이 2500이하이면 자동으로 등록한다.
			if (bCSTMS_VAL) {
				frm1.itn_no.value='';
			} else {
				frm1.itn_no.value='NO EEI 30.37(A)';
			}
		}
	}
}
// 요구사항 #25751  TP 일때 Customer 와 Issuing Carrier 일치
function syncCustomerToCarrier(){
	frm1.iss_trdp_cd.value=frm1.act_shpr_trdp_cd.value ;
	frm1.iss_trdp_nm.value=frm1.act_shpr_trdp_nm.value ;
	frm1.iss_trdp_addr.value=frm1.act_shp_info.value ;
}

/* #41998 -	만일 Shipper 와 Customer 가 모두 세팅된 상태에서 B/L Type 을 Co-Load 혹은 Third Party 로 변경하는 경우는 아래와 같이 처리 합니다.
1) Shipper 의 TP code(S01) 와 Customer 의 TP Code(C01) 가 동일함:
Customer 를 Blank 로 변경합니다. (Shipper: S01, Customer: Blank)
2) Shipper 와 Customer 의 TP Code 가 다름: Shipper 와 Customer 의 기존 정보를 그대로 유지합니다.
Shipper: S01, Customer: C01
*/
function setCustmerByBlType(){
	var formObj = document.frm1;

	if(formObj.hbl_tp_cd.value == 'CL' || formObj.hbl_tp_cd.value == 'TP'){
		if (formObj.shpr_trdp_cd.value != "" && formObj.act_shpr_trdp_cd.value != "" && 
				formObj.shpr_trdp_cd.value == formObj.act_shpr_trdp_cd.value) {
			formObj.act_shpr_trdp_cd.value = "";
			formObj.act_shpr_trdp_nm.value = "";
			formObj.act_shp_info.value	= "";
		}
	}
}


function fncBlSearch() {
	var formObj  = document.frm1;
	formObj.f_ref_no.value = formObj.ref_no.value;
	if ( event.keyCode == 13 && formObj.f_ref_no.value != null ) {
		srAirOpenPopUp('REF_POPLIST', this, 'A', 'O');
	}
}

function cmdtRowAdd(){
	gridAdd(10);
}
function cmdtLoadPO(){
	rtnary=new Array(8);
	rtnary[0]=frm1.cnee_trdp_cd.value;
	rtnary[1]=frm1.cnee_trdp_nm.value;
	rtnary[2]=frm1.shpr_trdp_cd.value;
	rtnary[3]=frm1.shpr_trdp_nm.value;
	//rtnary[4]=frm1.pol_cd.value;
	//rtnary[5]=frm1.pol_nm.value;
	//rtnary[6]=frm1.pod_cd.value;
	//rtnary[7]=frm1.pod_nm.value;
	callBackFunc = "PO_POPLIST";
	modal_center_open('./CMM_POP_0400.clt', rtnary, 1300,500,"yes");
}

function hwiFrtRowAdd(){
	gridAdd(11);
}

function PO_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("^^");
		var idx=docObjects[10].LastRow() + 1;
		
		for (var i=0; i < rtnValAry.length; i++) {
			if(rtnValAry[i] == ""){
				break;
			}
			gridAdd(10);
			
			var Seq = docObjects[10].GetCellValue(idx-1, "Seq");
			
			var itemArr=rtnValAry[i].split("@@");
			docObjects[10].SetCellValue(idx, "Seq",Number(idx == 2 ? "0" : docObjects[10].GetCellValue(idx-1, "Seq")) + 1,0);
			docObjects[10].SetCellValue(idx, "item_cust_po_no",itemArr[0],0);
			docObjects[10].SetCellValue(idx, "item_cmdt_cd",itemArr[1],0);
			docObjects[10].SetCellValue(idx, "item_cmdt_nm",itemArr[2],0);
			docObjects[10].SetCellValue(idx, "item_pck_qty",itemArr[3],0);
			docObjects[10].SetCellValue(idx, "item_pck_ut_cd",itemArr[4],0);
			docObjects[10].SetCellValue(idx, "item_pck_inr_qty",itemArr[5],0);
			docObjects[10].SetCellValue(idx, "item_ea_cnt",itemArr[6],0);
			docObjects[10].SetCellValue(idx, "item_ttl_qty",itemArr[7],0);
			docObjects[10].SetCellValue(idx, "item_wgt",itemArr[8],0);
			docObjects[10].SetCellValue(idx, "item_lbs_wgt",itemArr[9],0);
			docObjects[10].SetCellValue(idx, "item_meas",itemArr[10],0);
			docObjects[10].SetCellValue(idx, "item_cft_meas",itemArr[11],0);
			docObjects[10].SetCellValue(idx, "item_hs_grp_cd",itemArr[12],0);
			docObjects[10].SetCellValue(idx, "item_shp_cmdt_cd",itemArr[13],0);
			docObjects[10].SetCellValue(idx, "item_shp_cmdt_nm",itemArr[14],0);
			docObjects[10].SetCellValue(idx, "item_po_cmdt_seq",itemArr[15],0);
			docObjects[10].SetCellValue(idx, "item_po_sys_no",itemArr[16],0);
			idx++;
		}
	}
}

function sheet8_OnSearchEnd(sheetObj) {
	//setItemCntrList();
}
function sheet8_OnPopupClick(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
	//Item 코드
	if(colStr=="item_cmdt_cd"){
		gridPopCall(sheetObj, row, col, 'item_cmdt_cd');
	} 
	//HTS 코드(Commidity)
	else if(colStr=="item_shp_cmdt_cd"){
		gridPopCall(sheetObj, row, col, 'item_shp_cmdt_cd');
	}
}
function sheet8_OnKeyUp(sheetObj, row, col, keyCode) {
	//doAutoComplete(sheetObj, row, col, keyCode);
}
function sheet8_OnChange(sheetObj, row, col, value){
	switch (sheetObj.ColSaveName(col)) {
		case "item_shp_cmdt_cd" :
			doItemSearch(sheetObj, row, "commodity", value);
		break;
		
		case "item_cmdt_cd" :
			var row = sheetObj.GetSelectRow();
			var xml = loadDftItmVal(sheetObj, value);
			displayDftItmVal(xml,sheetObj,row);	
		break;
		
		case "item_pck_qty" :
		case "item_pck_inr_qty" :
		case "item_ea_cnt" :
		case "item_wgt" :
		case "item_lbs_wgt" :
		case "item_meas" :
		case "item_cft_meas" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	
	switch (sheetObj.ColSaveName(col)) {
		case "item_pck_qty" :
		case "item_pck_inr_qty" :
		case "item_ea_cnt" :
			sheetObj.SetCellValue(row, "item_ttl_qty", (Number(sheetObj.GetCellValue(row, "item_pck_qty")) * Number(sheetObj.GetCellValue(row, "item_pck_inr_qty"))) + Number(sheetObj.GetCellValue(row, "item_ea_cnt")),0);
		break;
	}
	
	var colStr=sheetObj.ColSaveName(col);
	//Item 코드(Commidity)
	if(colStr=="item_wgt"){
		sheetObj.SetCellValue(row, "item_lbs_wgt",roundXL(sheetObj.GetCellValue(row, col) / 0.453597315, 2),0);
		if (sheetObj.GetCellValue(row, "item_lbs_wgt") >99999999.99) {
			alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGWEIG'));				
			sheetObj.SetCellValue(row, "item_wgt","",0);
			sheetObj.SelectCell(row, "item_wgt");
		}
	}else if(colStr=="item_lbs_wgt"){
		sheetObj.SetCellValue(row, "item_wgt",roundXL(sheetObj.GetCellValue(row, col) * 0.453597315, 2),0);
			
	}else if(colStr=="item_meas"){
		sheetObj.SetCellValue(row, "item_cft_meas",roundXL(sheetObj.GetCellValue(row, col) * 35.3165, 3),0);
		if (sheetObj.GetCellValue(row, "item_cft_meas") > 999999.999999) {
			alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGMEAS'));
			sheetObj.SetCellValue(row, "item_meas","",0);
			sheetObj.SelectCell(row, "item_meas");
		}
	}else if(colStr=="item_cft_meas"){
		sheetObj.SetCellValue(row, "item_meas",roundXL(sheetObj.GetCellValue(row, col) / 35.3165, 3),0);
	}
}

function sheet8_OnClick(sheetObj, row, col){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="item_cmdt_cd" || colStr=="item_shp_cmdt_cd"){
		if (sheetObj.GetCellValue(row, "item_po_cmdt_seq") == "") {
			sheetObj.SetCellEditable(row, colStr, 1);
		} else {
			sheetObj.SetCellEditable(row, colStr, 0);
		}
	}
}

function sheet8_OnKeyDown(sheetObj, row, col, keyCode) {
	switch (sheetObj.ColSaveName(col)) {
		case "item_pck_qty" :
		case "item_pck_inr_qty" :
		case "item_ea_cnt" :
		case "item_wgt" :
		case "item_lbs_wgt" :
		case "item_meas" :
		case "item_cft_meas" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}

//BL_COPY
function selectCopyBLFrt(){
	 openBlCopyPopUp("COPY_CONFIRM_POPUP",this,this);
}

//BL_COPY
function COPY_CONFIRM_POPUP(rtnVal){
	
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var copyYn = value=rtnValAry[0];
		if (copyYn) {
			
			var arFrt_copy_chk=rtnValAry[1];
			var apFrt_copy_chk=rtnValAry[2];
			var dcFrt_copy_chk=rtnValAry[3];
			
			
			if (orgBlSeq != "") {
			
				var orgBlSeq = frm1.copy_bl_seq.value;
				var tmpIntgBlSeq = frm1.intg_bl_seq.value;; 
				frm1.intg_bl_seq.value = frm1.copy_bl_seq.value;
							
				if (arFrt_copy_chk == "Y") {
					//Selling/Debit Freight 조회
					frm1.f_cmd.value=SEARCHLIST06;
					docObjects[2].DoSearch("./AIE_BMD_0024GS.clt", FormQueryString(frm1) );			
				}
				if (apFrt_copy_chk == "Y") {
					//Buying/Crebit List 조회
					frm1.f_cmd.value=SEARCHLIST07;
		 			docObjects[3].DoSearch("./AIE_BMD_0024_1GS.clt", FormQueryString(frm1) );
				}
				if (dcFrt_copy_chk == "Y") {
					//DC 
					frm1.f_cmd.value=SEARCHLIST12;
		 			docObjects[8].DoSearch("./AIE_BMD_0024_2GS.clt", FormQueryString(frm1) );
				}

				frm1.intg_bl_seq.value = tmpIntgBlSeq;	
			}
		}
	}
}

function setCtrbDeptCd(){
	var formObj = document.frm1;
	formObj.ctrb_dept_cd.value = "AE";
}


//#48588 [Webtrans][게시판#9] AE PACKAGE TYPE INPUT
function setPckUtCd(){
	// Notice를 Email보낼 그룹메일정보를 취득한다. 
	var opt_key = "PCK_VAL_AEH";
	ajaxSendPost(setPckUtCdReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

function setPckUtCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		frm1.pck_ut_cd.value=doc[1];
	} else {
		frm1.pck_ut_cd.value="";
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

var AEH_ISS_CARR_DFT = "Y";

function setAehIssCarrDftReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1]=="N") {
			AEH_ISS_CARR_DFT = "N";
		}
	}
}

var AE_BL_HIS_UPDATE = "N";

function setAeBlHisUpdateReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1]=="Y") {
			AE_BL_HIS_UPDATE = "Y";
		}
	}
}

var AEH_BL_FRT_CHK_YN = "N";

function setAehBlFrtChkYnReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1]=="Y") {
			AEH_BL_FRT_CHK_YN = "Y";
		}
	}
}

var AE_VOL_ROUND = "A"; // 0.5 절상

function setAeVolRoundReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1]=="R") {
			AE_VOL_ROUND = "R"; // 반올림
		}
	}
}


/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function blCheckInpuValsForAdding(){
	var isOk=true;
	//---------------20121130 OJG---------------------------
	if(!chkCmpAddr(frm1.shpr_trdp_addr, 'Shipper Address')){
		isOk=false;
		moveTab('01');
	}
	if(!chkCmpAddr(frm1.cnee_trdp_addr, 'Consignee Address')){
		isOk=false;
		moveTab('01');
	}
	if(!chkCmpAddr(frm1.ntfy_trdp_addr, 'Notify Address')){
		isOk=false;
		moveTab('01');
	}
    if(!checkInType(frm1.etd_dt_tm.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_FLIT') + getLabel('FMS_COD_DATE'));
		isOk=false;
		moveTab('01');
		frm1.etd_dt_tm.focus();
		return isOk;
	}
	if (trim(frm1.etd_dt_tm.value) != "" && trim(frm1.eta_dt_tm.value) != "") {
		var daysTerms=getDaysBetweenFormat(frm1.etd_dt_tm, frm1.eta_dt_tm, "MM-dd-yyyy");
		if (daysTerms < 0) {
			// Arrival Date time must be greater than Flight Date time
			alert(getLabel("AIR_MSG_091"));
			frm1.eta_dt_tm.focus();
			isOk=false;
			return isOk; 
		}
	}
	var tmpBlDate=frm1.bl_dt_tm.value.replaceAll("-", "");
	var tmpEtdDate=frm1.etd_dt_tm.value.replaceAll("-", "");
	var blDate=new Date(tmpBlDate.substring(4,8), tmpBlDate.substring(0,2)-1, tmpBlDate.substring(2,4));
	var etdDate=new Date(tmpEtdDate.substring(4,8), tmpEtdDate.substring(0,2)-1, tmpEtdDate.substring(2,4));
	if((etdDate-blDate)/(60*60*24*1000)<0){
		etdOk=false;
	}else{
		etdOk=true;
	}
	var tmpDate=new Date();
	var today=new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()); 
	if((today-etdDate)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	}else if((etdDate-today)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	}else{
		etdRangeOk=true;
	}
 	//#25246, 25247 필수값 설정 추가
	if(frm1.pol_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.pol_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.pod_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.pod_cd.focus();
		isOk=false;
		return isOk; 
	}
	//#31594 [BINEX]B/L Entry 에서 Customer 항목을 mandatory 지정 - 필수값 설정 추가
	if(frm1.act_shpr_trdp_cd.value == "") { 
		//alert(getLabel('FMS_COM_ALT001'));
		alert(getLabel('FMS_COM_ALT001') + " - CUSTOMER");
		moveTab('01');
		frm1.act_shpr_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.act_shpr_trdp_nm.value == "") { 
		//alert(getLabel('FMS_COM_ALT001'));
		alert(getLabel('FMS_COM_ALT001') + " - CUSTOMER");
		moveTab('01');
		frm1.act_shpr_trdp_nm.focus();
		isOk=false;
		return isOk; 
	}
	/*==================================================================================================*/
	/* LHK, 20130128 Freight Edit/Delete 는 TB_FRT.INV_STS_CD 가 FI 인 경우에만 허용						    */
	/* Freight 생성 후 Invoice 를 생성한 후 재조회 하지 않고 다시 저장할 경우 delete 하거나 수정 건으로 인한 오류 발생을 차단. */
	var sheetObjArr=new Array(3);
		sheetObjArr[0]=docObjects[2];		//AR LOCAL  'fr_'
		sheetObjArr[1]=docObjects[8];		//DC 		'dc_fr_'
		sheetObjArr[2]=docObjects[3];		//AP 		'b_fr_'
	if(checkFrtSts(sheetObjArr)==false){	//Validation 후 Do you want to save 뜨지 않고 원래값 가져오기
		isOk=false;
	}
	/*=================================================================================================*/
	
	//Item List validation.
	var cmdtListParam=docObjects[10].GetSaveString(false);
	if(docObjects[10].IsDataModified() && cmdtListParam == "") { isOk=false; };
	if(cmdtListParam!=''){
		if(itemCheckInpuVals(docObjects[10])){
			isOk=false;
		}
	}
	
	var frtSdListParam=docObjects[2].GetSaveString(false);
    if(docObjects[2].IsDataModified() && frtSdListParam == "") { isOk=false; };

    var frtBcListParam=docObjects[3].GetSaveString(false);
    if(docObjects[3].IsDataModified() && frtBcListParam == "") { isOk=false; };

    var frtDcListParam=docObjects[8].GetSaveString(false);
    if(docObjects[8].IsDataModified() && frtDcListParam == "") { isOk=false; };
	
	return isOk;
}


/** #52165 [Globe Runner] HBL > MBL Create **/
var NEXT_BLOCK_DT="";    	//MAX(BLOCK_DT)+1
/** LHK, 20131025 #21734  [BINEX]Post Date Check 로직 적용
 *  File Block_dt 와 Post Date 체크, Post Date Set, BL 생성시 post date 에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
 **/
function setPost_date(save_flag){
 	var formObj=document.frm1;
 	if(save_flag == "I"){
 		if(ofc_post_dt=="ETD"){
 		   frm1.post_dt.value=frm1.etd_dt_tm.value;
 		}else if(ofc_post_dt=="ETA"){
 		   frm1.post_dt.value=frm1.eta_dt_tm.value;
 		   //25273 OFC_CD변경시 TODAY에 대한 고려가 없어서 추가
 		}else if(ofc_post_dt=="TODAY"){
 			//LHK, 20140924 #43960 [DYNAMIC] Post Date 변경
	 		if(formObj.post_dt.value==""){
	 			formObj.post_dt.value=getTodayStr();
	 		}
 		}
 	}else if(save_flag == "U"){
 		if(ofc_post_dt=="ETD"){
 			if (frm1.etd_dt_tm.value != frm1.org_etd_dt_tm.value ){
 				frm1.post_dt.value=frm1.etd_dt_tm.value;
 			}  		   
  		}else if(ofc_post_dt=="ETA"){
  			if (frm1.eta_dt_tm.value != frm1.org_eta_dt_tm.value ){
  				frm1.post_dt.value=frm1.eta_dt_tm.value;
  			}
  		}
 	}
 	
 	//Update 인 경우  post date 가 변경된 경우에만 post date 비교 처리로직 적용.
 	if(save_flag == "U"){
 		if(formObj.post_dt.value == formObj.org_post_dt.value){	
 			return;
 		}
 	}
 	//MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
 	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt', './GateServlet.gsl');
 	if(formObj.post_dt.value == ""){
 		formObj.post_dt.value=NEXT_BLOCK_DT;
 	}
 	if(formObj.post_dt.value == ""){
 		alert(getLabel("AIR_MSG_096"));
 		return;
 	}
 	if(NEXT_BLOCK_DT != "") {
 		//post_dt 와 block_dt 비교
// 		fromDate > toDate true
 		if(compareTwoDate(NEXT_BLOCK_DT, formObj.post_dt.value)){
 			formObj.post_dt.value=NEXT_BLOCK_DT;
 		}
 	}
}
function getMaxBlockOrJnrNextDt(reqVal){
 	var doc=getAjaxMsgXML(reqVal);
 	if(doc[0]=='OK'){
 		if(typeof(doc[1])!='undefined'){
 			NEXT_BLOCK_DT=doc[1];
 			NEXT_BLOCK_DT=NEXT_BLOCK_DT.substring(4,6) + "-" + NEXT_BLOCK_DT.substring(6,8) + "-" + NEXT_BLOCK_DT.substring(0,4);
 		}else{
			NEXT_BLOCK_DT="";
		}
 	}
}