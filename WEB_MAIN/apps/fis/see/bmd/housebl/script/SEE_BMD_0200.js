/*=========================================================
*@FileName   : SEE_BMD_0200.jsp
*@FileTitle  : OEH Booking 등록
*@Description: OEH Booking 등록 및 조회
*@author     : You,Ji-Won
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
*@author     : Hoang.Pham
*@version    : 2.0 - 2014/12/25
*@since      : 2014/12/25
=========================================================*/
var poListSheet=false;
var cntrListSheet=false;

//--------------------------------------------------------------------------------------------------------------
//Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
function goTabSelect(isNumSep) {
	frm1.f_isNumSep.value = isNumSep;
	var tabObjs = document.getElementsByName('tabLayer');
	if (isNumSep == "01") {
		currTab = isNumSep;	//탭상태저장
		tabObjs[0].style.display = 'inline';
		tabObjs[1].style.display = 'none';
		tabObjs[2].style.display = 'none';
		tabObjs[3].style.display = 'none';
		tabObjs[4].style.display = 'none';
	} else if (isNumSep == "02") {
		currTab = isNumSep;	//탭상태저장
		tabObjs[0].style.display = 'none';
		tabObjs[1].style.display = 'inline';
		tabObjs[2].style.display = 'none';
		tabObjs[3].style.display = 'none';
		tabObjs[4].style.display = 'none';
	}else if(isNumSep == "03"){
		currTab = isNumSep;
		tabObjs[0].style.display = 'none';
		tabObjs[1].style.display = 'none';
		tabObjs[2].style.display = 'inline';
		tabObjs[3].style.display = 'none';
		tabObjs[4].style.display = 'none';
	}else if(isNumSep == "04"){
		currTab = isNumSep;
		tabObjs[0].style.display = 'none';
		tabObjs[1].style.display = 'none';
		tabObjs[2].style.display = 'none';
		tabObjs[3].style.display = 'inline';
		tabObjs[4].style.display = 'none';
	}else if(isNumSep == "05"){
		currTab = isNumSep;
		tabObjs[0].style.display = 'none';
		tabObjs[1].style.display = 'none';
		tabObjs[2].style.display = 'none';
		tabObjs[3].style.display = 'none';
		tabObjs[4].style.display = 'inline';
	}

var index = parseInt(isNumSep);
var count = 0;
$('.opus_design_tab').find("li").each(function () {
if (count++ == index - 1) {
$(this).addClass('nowTab');
} else {
$(this).removeClass('nowTab');
}
});
}

//저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	isError = false;
	var sheetParam='';
    var poListParam=docObjects[2].GetSaveString(false);
    var cntrListParam=docObjects[1].GetSaveString(false);
    if(poListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= poListParam;
    	poListSheet=true;
    }  
    
    
    if(cntrListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= cntrListParam;
    	cntrListSheet=true;
    } 
    
    var frtSdListParam = docObjects[3].GetSaveString(false);
	if (frtSdListParam != '') {
		var rtnFlg = frCheckInpuVals(docObjects[3], '');
		if (rtnFlg == 'IV') {
			isError = true;
		}
		frtSdListParam = docObjects[3].GetSaveString(false);
		sheetParam += '&';
		sheetParam += frtSdListParam;
		frtSdSheet = true;
	}
	if (isError == true) {
		return true;
	}
	return sheetParam;
}

function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    try {
    	
        switch(srcName) {
        	case "NEW":	//NEW
        	
        		doShowProcess();
        		var currLocUrl=this.location.href;
				currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
				currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
//				parent.mkNewFrame(document.getElementById("title_form").value, currLocUrl);
//				parent.mkNewFrame('OEH Booking Entry', './SEE_BMD_0200.clt');
				
				window.location.href = currLocUrl
				break;
        	case "CREATEHBL":
    			ajaxSendPost(createHBL, 'reqVal','&goWhere=aj&bcKey=getBkgCheck&f_bkg_no='+ frm1.bkg_no.value, './GateServlet.gsl');
    			break;
        	case "ADD":	//등록
	        case "MODIFY":	//등록
	        	if(frm1.bkg_seq.value == ''){
	    			doWork('SAVE_ADD');
	    		}else{
	    			doWork('SAVE_MODIFY');
	    		}
	            break;
	            
        	case "SAVE_ADD":	//등록
        		frm1.f_cmd.value=ADD;
               	if(bkgCheckInpuVals()){
               		if(!etdRangeOk){
              			//[Warning] ETD is outside range of 6 months from today. \nPlease kindly check ETD  again.
               			alert(getLabel('FMS_COM_ALT021'));		
               		}
               		if(frm1.bkg_no.value == "AUTO"){
               			frm1.bkg_no.value="";
               		}
               		ajaxSendPost(getBkgCheck, 'reqVal', '&goWhere=aj&bcKey=getBkgCheck&f_bkg_no='+frm1.bkg_no.value, './GateServlet.gsl');
               	}
               	break;
        		
        	case "SAVE_MODIFY":	//등록
        	   ajaxSendPost(checkHblModifyReq, 'reqVal', '&goWhere=aj&bcKey=getCheckHblCreate&bkg_no='+frm1.bkg_no.value, './GateServlet.gsl');
               break;
               
           case "REMOVE"://삭제
    		   ajaxSendPost(checkHblRemoveReq, 'reqVal', '&goWhere=aj&bcKey=getCheckHblCreate&bkg_no='+frm1.bkg_no.value, './GateServlet.gsl');
    		   break;
    		   
           case "SEARCHLIST":	//조회
        	   frm1.f_bkg_no.value=trim(frm1.f_bkg_no.value);
        	   if(frm1.f_bkg_no.value==''){
        		   alert(getLabel('FMS_COM_ALT014'));
        		   frm1.f_bkg_no.focus();
        		   return;
        	   }
        	   else{
        		   if(frm1.f_bkg_no.value!=''){
        			   frm1.f_bkg_seq.value='';
        		   }
        		   
                   frm1.f_cmd.value=SEARCHLIST;
                   submitForm(SEARCHLIST);
        	   }
        	   break;
        	
           case "SEARCH_PO":	// PO 조회
        	   frm1.f_cmd.value=SEARCHLIST01;
        	   docObjects[2].DoSearch("./SEE_BMD_0200_1GS.clt", FormQueryString(frm1) );
        	   break;
           case "SEARCHLIST02": // FRT 조회
   			   frm1.f_cmd.value = SEARCHLIST02;
   			   docObjects[3].DoSearch("./SEE_BMD_0200_2GS.clt", FormQueryString(frm1));
   			   break;
           case "SEARCH_CNTR": // CNTR 조회
   			   frm1.f_cmd.value = SEARCHLIST03;
   			   docObjects[1].DoSearch("./SEE_BMD_0200_3GS.clt", FormQueryString(frm1));
   			   break;
   		
           case "COPY":	//조회
        	   if(confirm(getLabel('FMS_COM_CFMCPY'))){
                   frm1.f_cmd.value=COMMAND05;
                   submitForm(COMMAND05);
        	   }
        	   break;
        	   
           case "PO_ADD":
        	   //gridAdd(1);
        	   var formObj=document.frm1;
        	   rtnary=new Array(8);
        	   //rtnary[0]=formObj.cnee_trdp_cd.value;
        	   //rtnary[1]=formObj.cnee_trdp_nm.value;
        	   
        	   // 2016.01.29 yjw "P/O & Item Search" Popup 열때 Customer에 세팅되는 데이터를 Consignee에서 Customer로 변경
        	   rtnary[0]=formObj.act_shpr_trdp_cd.value;
        	   rtnary[1]=formObj.act_shpr_trdp_nm.value;
        	   rtnary[2]=formObj.shpr_trdp_cd.value;
        	   rtnary[3]=formObj.shpr_trdp_nm.value;
        	   
        	   //rtnary[4]=formObj.por_cd.value;
        	   //rtnary[5]=formObj.por_nm.value;
        	   //rtnary[6]=formObj.del_cd.value;
        	   //rtnary[7]=formObj.del_nm.value;
				
        	   callBackFunc = "PO_POPLIST";
        	   modal_center_open('./CMM_POP_0500.clt', rtnary, 1300,500,"yes");
        	   break;
       		
           case "PRINT":
        	   var formObj=document.frm1;
        	   if(formObj.bkg_seq.value == ""){
        		   alert(getLabel('FMS_COM_ALT004'));
        		   return;
        	   }
        	   formObj.file_name.value='booking_confirmation_02.mrd';
        	   formObj.title.value='Booking Confirmation';
        	   // Parameter Setting
        	   var param='';
        	   param += '[' + formObj.bkg_seq.value + ']'; // $1
        	   param += '[' + v_ofc_eng_nm + ']';		//2
        	   param += '[' + v_eml + ']';		//3
        	   param += '[' + v_ofc_cd + ']';	//4
        	   param += '[' + v_phn + ']';		//5
        	   param += '[' + v_fax + ']';		//6
        	   //#24658 [GPL] Arrival Notice에다 "Place of Receipt" 추가
        	   if (prn_ofc_cd == "GPL") {
        		   param += '[]';								//7
        		   param += '[Y]';								//8
        	   } else {
        		   param += '[]';								//7
        		   param += '[N]';								//8
        	   }
        	   formObj.rd_param.value=param;
        	   formObj.bkg_seq.value=formObj.bkg_seq.value;
        	   formObj.rpt_biz_tp.value="OEH";
        	   formObj.rpt_biz_sub_tp.value="BC";
        	   popPOST(formObj, 'RPT_RD_0010.clt', 'popB_Confirm', 1025, 740);			
        	   break; 
        }
    }
    catch(e) {
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
	formObj.f_bkg_no.value = getParam(url,"f_bkg_no");
	formObj.f_bkg_seq.value = getParam(url,"f_bkg_seq");
	
	doWork('SEARCHLIST');
}

function setFieldValue(obj, value){
	if($(obj).is("select") || $(obj).is("input:radio") || $(obj).is("input:checkbox")){
		if(value != ""){
			$(obj).val(value);
		}
	}else {
		$(obj).val(value);
	}
}
function submitForm(cmd){
	var formObj=document.frm1;
	doShowProcess();
	formObj.f_cmd.value=cmd;
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./SEE_BMD_0200AJ.clt",
		   dataType: 'xml',
		   data: $(formObj).serialize(),
		   success: function(data){
			   setFieldValue( formObj.bkg_seq, $('bkg_seq',data).text());
			   setFieldValue( formObj.f_bkg_seq, $('f_bkg_seq',data).text());
			   setFieldValue( formObj.h_ooh_bkg_rmk, $('ooh_bkg_rmk',data).text());
			   setFieldValue( formObj.f_bkg_no, $('f_bkg_no',data).text());
			   setFieldValue( formObj.bkg_no, $('bkg_no',data).text());
			   setFieldValue( formObj.h_bkg_no, $('bkg_no',data).text());
			   setFieldValue( formObj.bkg_dt_tm, $('bkg_dt_tm',data).text());
			   setFieldValue( formObj.bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.po_no, $('po_no',data).text());
			   setFieldValue( formObj.lc_no, $('lc_no',data).text());
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
			   setFieldValue( formObj.exp_ref_no, $('exp_ref_no',data).text());
			   setFieldValue( formObj.pu_trdp_cd, $('pu_trdp_cd',data).text());
			   setFieldValue( formObj.pu_trdp_nm, $('pu_trdp_nm',data).text());
			   setFieldValue( formObj.cgo_pu_trdp_cd, $('cgo_pu_trdp_cd',data).text());
			   setFieldValue( formObj.cgo_pu_trdp_nm, $('cgo_pu_trdp_nm',data).text());
			   setFieldValue( formObj.cgo_pu_trdp_addr, $('cgo_pu_trdp_addr',data).text());
			   setFieldValue( formObj.rcv_wh_cd, $('rcv_wh_cd',data).text());
			   setFieldValue( formObj.rcv_wh_nm, $('rcv_wh_nm',data).text());
			   setFieldValue( formObj.trk_trdp_cd, $('trk_trdp_cd',data).text());
			   setFieldValue( formObj.trk_trdp_nm, $('trk_trdp_nm',data).text());
			   setFieldValue( formObj.cust_ref_no, $('cust_ref_no',data).text());
			   setFieldValue( formObj.cntr_info, $('cntr_info',data).text());
			   setFieldValue( formObj.trnk_vsl_cd, $('trnk_vsl_cd',data).text());
			   setFieldValue( formObj.trnk_vsl_nm, $('trnk_vsl_nm',data).text());
			   setFieldValue( formObj.trnk_voy, $('trnk_voy',data).text());
			   setFieldValue( formObj.por_cd, $('por_cd',data).text());
			   setFieldValue( formObj.por_nm, $('por_nm',data).text());
			   setFieldValue( formObj.pol_cd, $('pol_cd',data).text());
			   setFieldValue( formObj.pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.pod_cd, $('pod_cd',data).text());
			   setFieldValue( formObj.pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.del_cd, $('del_cd',data).text());
			   setFieldValue( formObj.del_nm, $('del_nm',data).text());
			   setFieldValue( formObj.fnl_dest_loc_cd, $('fnl_dest_loc_cd',data).text());
			   setFieldValue( formObj.fnl_dest_loc_nm, $('fnl_dest_loc_nm',data).text());
			   setFieldValue( formObj.lnr_trdp_cd, $('lnr_trdp_cd',data).text());
			   setFieldValue( formObj.lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			   setFieldValue( formObj.lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.etd_por_tm, $('etd_por_tm',data).text());
			   setFieldValue( formObj.shp_mod_cd, $('shp_mod_cd',data).text());
			   setFieldValue( formObj.rep_cmdt_cd, $('rep_cmdt_cd',data).text());
			   setFieldValue( formObj.rep_cmdt_nm, $('rep_cmdt_nm',data).text());
			   setFieldValue( formObj.pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.grs_wgt, $('grs_wgt',data).text());
			   setFieldValue( formObj.grs_wgt1, $('grs_wgt1',data).text());
			   setFieldValue( formObj.meas, $('meas',data).text());
			   setFieldValue( formObj.meas1, $('meas1',data).text());
			   setFieldValue( formObj.fm_svc_term_cd, $('fm_svc_term_cd',data).text());
			   setFieldValue( formObj.to_svc_term_cd, $('to_svc_term_cd',data).text());
			   setFieldValue( formObj.h_fm_svc_term_cd, $('fm_svc_term_cd',data).text());
			   setFieldValue( formObj.h_to_svc_term_cd, $('to_svc_term_cd',data).text());
			   setFieldValue( formObj.cargo_tp_cd, $('cargo_tp_cd',data).text());
			   setFieldValue( formObj.cut_off_dt, $('cut_off_dt',data).text());
			   setFieldValue( formObj.cut_off_tm, $('cut_off_tm',data).text());
			   setFieldValue( formObj.rail_cut_off_dt, $('rail_cut_off_dt',data).text());
			   setFieldValue( formObj.rail_cut_off_tm, $('rail_cut_off_tm',data).text());
			   setFieldValue( formObj.wh_cut_off_dt, $('wh_cut_off_dt',data).text());
			   setFieldValue( formObj.wh_cut_off_tm, $('wh_cut_off_tm',data).text());
			   setFieldValue( formObj.doc_cut_off_dt, $('doc_cut_off_dt',data).text());
			   setFieldValue( formObj.doc_cut_off_tm, $('doc_cut_off_tm',data).text());
			   setFieldValue( formObj.sls_ofc_cd, $('sls_ofc_cd',data).text());
			   setFieldValue( formObj.sls_usrid, $('sls_usrid',data).text());
			   setFieldValue( formObj.sls_usr_nm, $('sls_usr_nm',data).text());
			   setFieldValue( formObj.sls_dept_cd, $('sls_dept_cd',data).text());
			   setFieldValue( formObj.rmk, $('rmk',data).text());
			   setFieldValue( formObj.lnr_ctrt_no, $('lnr_ctrt_no',data).text());
			   setFieldValue( formObj.frt_term_cd, $('frt_term_cd',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   
			   doBtnAuthority(attr_extension);
			   btnLoad();
			   loadPage();
			   loadData();
			   loadBtn();
//			   bindDataCntr();
			   doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("system error!");
		   }
		 });
}
function dispData(reqVal){
	alert(reqVal);
}

function checkHblModifyReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='N'){
			//Cannot modify because HB/L was Created!
			alert(getLabel('FMS_COM_ALT069'));
		}
		else{
			
			frm1.f_cmd.value=MODIFY;
			if(bkgCheckInpuVals()){
    		   if(!etdRangeOk){
         			//[Warning] ETD is outside range of 6 months from today. \nPlease kindly check ETD  again.
    			   alert(getLabel('FMS_COM_ALT021'));		
    		   }
    		   if(frm1.bkg_no.value=="AUTO"){
          			frm1.bkg_no.value="";
    		   }
    		   
    		   if (!blCheckInpuVals()) {
					return;
			   }
    		   
    		   if(frm1.h_bkg_no.value!=frm1.bkg_no.value){
          			ajaxSendPost(getBkgCheckModify, 'reqVal', '&goWhere=aj&bcKey=getBkgCheck&f_bkg_no='+frm1.bkg_no.value, './GateServlet.gsl');
    		   } else {
    			   //BL No. 가 없을 경우
    			   //The [HB/L No.] is Blank. Generate the Number? Yes/No. Yes 일 경우 Save 진행 
    			   var blNullChk=true;
          		   if(frm1.bkg_no.value == ""){
          			   blNullChk=confirm(getLabel('SEA_COM_ALT032'));
          		   }
          		   if(blNullChk){
        			   if(confirm(getLabel('FMS_COM_CFMSAV'))){
                     	    gridAdd(0);
                    	    docObjects[0].SetCellValue(1, 1,1);
                    	    frm1.f_bkg_no.value=frm1.bkg_no.value;
                    	    var sndParam=getSndParam();
     	        		    if(sndParam == true)	{	return false;	}	  
     	        		    calculatorCntr();
              				doShowProcess();
              				docObjects[0].DoAllSave("./SEE_BMD_0200GS.clt", FormQueryString(frm1)+sndParam, false);
              			}
          		    }   
          		}
            }
		}
	}
}

function checkHblRemoveReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='N'){
			//Cannot delete because HB/L was Created!
			alert(getLabel('FMS_COM_ALT068'));
		}
		else{
			if(confirm(getLabel('FMS_COM_CFMDEL'))){
                frm1.f_cmd.value=REMOVE;
                submitForm(REMOVE);
     	   }
		}
	}
}

function getBkgCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bkg_no.value!=''){
				/*
				 *  2012.02.24
				 * 중복되면 저장 수행 안함
				 */
				// Duplicated Data!
				alert(getLabel('FMS_COM_ALT008'));
				frm1.bkg_no.focus();
			}else{
				if (!blCheckInpuVals()) {
					return;
				}
	    	    //'Do you want to save HB/L?')){
				if(confirm(getLabel('FMS_COM_CFMSAV'))){
	    		   gridAdd(0);
            	   docObjects[0].SetCellValue(1, 1,1);
            	   var sndParam=getSndParam();
            	   
            	   //alert("getBkgCheck"+sndParam);
            	   
        		   if(sndParam == true)	{	return false;	}
        		   calculatorCntr();
            	   doShowProcess();
            	   docObjects[0].DoAllSave("./SEE_BMD_0200GS.clt", FormQueryString(frm1)+sndParam, false);
            	   
            	   //SAVE 성공시 HBL_Create를 한다.
            	   document.getElementById('btn_CreateHBL').style.display = 'inline';
        	    }
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function getBkgCheckModify(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bkg_no.value!=''){
				/*
				 *  2012.02.24
				 * 중복되면 저장 수행 안함
				 */
				// Duplicated Data!
				alert(getLabel('FMS_COM_ALT008'));
				frm1.bkg_no.focus();
			}else{
			    //BL No. 가 없을 경우
 			    //The [HB/L No.] is Blank. Generate the Number? Yes/No. Yes 일 경우 Save 진행 
 			    var blNullChk=true;
       		    if(frm1.bkg_no.value == ""){
       			    blNullChk=confirm(getLabel('SEA_COM_ALT032'));
       		    }
       		    if(blNullChk){
		    	    //'Do you want to save HB/L?')){
					if(confirm(getLabel('FMS_COM_CFMSAV'))){
		    		   gridAdd(0);
	            	   docObjects[0].SetCellValue(1, 1,1);
	            	   var sndParam=getSndParam();
	        		   if(sndParam == true)	{	return false;	}	 
	        		   calculatorCntr();
	            	   doShowProcess();
	            	   docObjects[0].DoAllSave("./SEE_BMD_0200GS.clt", FormQueryString(frm1)+sndParam, false);
	        	    }
		    	}	
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	if(errMsg==''&&frm1.bkg_seq.value==''){
		frm1.f_bkg_seq.value=docObjects[0].GetCellValue(1, "sv_bkg_seq");
		frm1.bkg_seq.value=docObjects[0].GetCellValue(1, "sv_bkg_seq");
		frm1.f_bkg_no.value=docObjects[0].GetCellValue(1, "sv_bkg_no");
		frm1.bkg_no.value=docObjects[0].GetCellValue(1, "sv_bkg_no");
		frm1.h_bkg_no.value=frm1.bkg_no.value;
	}
	frm1.bkg_no.value=docObjects[0].GetCellValue(1, "sv_bkg_no");
	frm1.h_bkg_no.value=frm1.bkg_no.value;
	frm1.f_bkg_no.value=frm1.bkg_no.value;
	
	if(poListSheet){
		doWork('SEARCH_PO');
	}

	if(frtSdSheet){
		doWork('SEARCHLIST02');
	}
	
	if(cntrListSheet){
		doWork('SEARCH_CNTR');
	}
	
	//목록 Flag 초기화
	poListSheet=false;
	
	//목록 Flag 초기화
	cntrListSheet=false;
	
	//버튼 초기화
	btnLoad();
	
	if(errMsg =='' ){
		showCompleteProcess();
	}
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}
function sheet1_OnSearchEnd(errMsg){
	//버튼 초기화
	btnLoad();
	doHideProcess();
}
function gridAdd(objIdx){
	var intRows=docObjects[objIdx].LastRow() + 1;
	docObjects[objIdx].DataInsert(intRows);
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	        /*var cal=new calendarPopup();
	        cal.select(obj, obj.name, 'MM-dd-yyyy');*/
	    	var cal=new ComCalendar();
            cal.select(obj, 'MM-dd-yyyy');
	    break;
    }
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
var isRun = false;
function loadPage() {
    for(var i=0;!isRun && i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
        if(i == docObjects.length - 1){
        	isRun = true;
        }
    }
    frm1.pck_qty.value=doMoneyFmt(Number(frm1.pck_qty.value).toFixed(0));
    frm1.grs_wgt.value=doMoneyFmt(Number(frm1.grs_wgt.value).toFixed(3));
    frm1.grs_wgt1.value=doMoneyFmt(Number(frm1.grs_wgt1.value).toFixed(3));
    frm1.meas.value=doMoneyFmt(Number(frm1.meas.value).toFixed(3));
    frm1.meas1.value=doMoneyFmt(Number(frm1.meas1.value).toFixed(0));
    if(frm1.bkg_seq.value==""){
    	shipModeChange();
    	frm1.bkg_no.value="AUTO";
    	frm1.rmk.value=frm1.h_ooh_bkg_rmk.value;
    }
    
    setFrCntrList();
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
    switch(sheetObj.id) {
		case "sheet1":     
		with (sheetObj) {
            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:"|Booking Seq.|Booking No.", Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
                         {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bkg_seq" },
                         {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bkg_no" } ];
             
            InitColumns(cols);
            SetEditable(1);
            SetVisible(0);
		}
        break;
        
		case "sheet2":     // PO
		with(sheetObj){
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('SEE_BMD_0200_HDR1'), Align:"Center"},
		                    { Text:getLabel('SEE_BMD_0200_HDR2'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"del",            	KeyField:0,   CalcLogic:"",   Format:"",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_ibflag" },
			             {Type:"Text",   	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"bkg_seq" },
			             {Type:"Text",    	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"po_sys_no" },
			             {Type:"Text",    	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"po_cmdt_seq" },
			             {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cust_po_no",			KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text", 		Hidden:0, Width:90,   Align:"Center",  ColMerge:0,   SaveName:"cust_itm_id",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cust_itm_nm",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Int",       Hidden:0, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"cmdt_pck_qty",   	KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cmdt_pck_ut_cd",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:0, Width:90,   Align:"Center",  ColMerge:0,   SaveName:"cmdt_pck_ut_nm",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:0,   SaveName:"cmdt_pck_inr_qty",	KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:0,   SaveName:"cmdt_ea_cnt",    	KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
        	             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:0,   SaveName:"cmdt_ttl_qty",       KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:7 },
        	             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"cmdt_kgs_wgt",  	 	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"cmdt_lbs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"cmdt_cbm_meas",  	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
        	             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"cmdt_cft_meas",  	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 }];
	       
			InitColumns(cols);
			SetEditable(1);
			SetSheetHeight(300);
			SetHeaderRowHeight(20);
	        SetHeaderRowHeight(21);
		}
		break;
		case "sheet3":     // Container1
            with (sheetObj) {
                SetConfig({SearchMode: 2, MergeSheet: 5, Page: 20, DataRowMerge: 1, TabStop: 0});

                var info = {Sort: 1, ColMove: 1, HeaderCheck: 1, ColResize: 1};
                var headers = [{Text: getLabel('SEE_BMD_0200_HDR3'), Align: "Center"}];
                InitHeaders(headers, info);

                var cols = [{Type: "DelCheck", Hidden: 0, Width: 60, Align: "Center", ColMerge: 1, SaveName: "del", KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1},
                            {Type: "Int", Hidden: 1, Width: 0, Align: "Center", ColMerge: 0, SaveName: "cntr_seq"},
                            {Type:"Text", Hidden:1,  Width:0,  Align:"Center",  ColMerge:0,  SaveName:"bkg_seq"},
                            {Type: "Status", Hidden: 1, Width: 0, Align: "Center", ColMerge: 0, SaveName: "cntr_ibflag"},
                            {Type: "Combo", Hidden: 0, Width: 70, Align: "Left", ColMerge: 0, SaveName: "cntr_tpsz_cd", KeyField: 0, CalcLogic: "", Format: ""},
                            {Type: "Int", Hidden: 0, Width: 60, Align: "Right", ColMerge: 1, SaveName: "qty", KeyField: 0, CalcLogic: "", Format: "Integer", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 7},
                            {Type:"Text", Hidden:1,  Width:0,  Align:"Center",  ColMerge:0,  SaveName:"delt_flg"}
                            ];
                
                InitColumns(cols);
                SetEditable(1);
                SetColProperty('cntr_tpsz_cd', {ComboText: '|' + TPCD1, ComboCode: '|' + TPCD2});
                SetSheetHeight(300);
                SetHeaderRowHeight(20);
            }
            break;
    
        case 'sheet5':
        	 if(MULTI_CURR_FLAG == "Y"){	//Muti Currency 
        		 with(sheetObj){
                	 
             	    //   (44, 0, 0, true);
             	       var cnt=0;

             	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

             	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             	       var headers = [ { Text:getLabel('SEE_BMD_0020_HDR6_3'), Align:"Center"},
             	                   { Text:getLabel('SEE_BMD_0020_HDR6_4'), Align:"Center"} ];
             	       InitHeaders(headers, info);

             	       var cols = [ 
             	              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
             	              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
             	              {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20, AcceptKeys:"N|[_]",InputCaseSensitive:1 },
             	              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
             	              {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
             	              {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
             	              {Type:"Float",     Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             	              {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             	              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_inv_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"PopupEdit",      Hidden:0, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
             	              {Type:"Date",      Hidden:0, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
             	              {Type:"Float",      Hidden:0, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
             	              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             	              {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             	              {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             	              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             	              {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             	              {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_auto_trf_flg" },
             	              {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             	              {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             	              {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_frt_ask_clss_cd" },
             	              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_due_dt" },
             	              {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
             	              {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N" },
             	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd_h",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
             	        
             	       InitColumns(cols);

             	       SetEditable(1);
             	    //   SetHeaderGetRowHeight(20 );
             	       SetHeaderRowHeight(21);
             	       SetColProperty('fr_frt_cd', {ComboText:ARFRTCD2, ComboCode:ARFRTCD1} );
     	              	 SetColProperty('fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
     	              	 SetColProperty('fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
     	              	 SetColProperty('fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
     	              	 SetColProperty('fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
     	              	SetColProperty('fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
                   	     SetSheetHeight(300);
                }  
        		 
        	 }else{
        		 with(sheetObj){
                	 
             	    //   (44, 0, 0, true);
             	       var cnt=0;

             	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

             	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             	       var headers = [ { Text:getLabel('SEE_BMD_0020_HDR6_1'), Align:"Center"},
             	                   { Text:getLabel('SEE_BMD_0020_HDR6_2'), Align:"Center"} ];
             	       InitHeaders(headers, info);

             	       var cols = [ 
             	              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
             	              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
             	              {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
             	              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
             	              {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
             	              {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
             	              {Type:"Float",     Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             	              {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             	              {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
             	              {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
             	              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
             	              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
             	              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Text",      Hidden:1, Width:80,   Align:"Center",   ColMerge:1,   SaveName:"fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             	              {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             	              {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             	              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             	              {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             	              {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                 	          {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                 	          {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_auto_trf_flg" },
             	              {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             	              {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             	              {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_frt_ask_clss_cd" },
             	              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_due_dt" },
             	              {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
             	              {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N" },
             	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd_h",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
             	        
             	       InitColumns(cols);

             	       SetEditable(1);
             	    //   SetHeaderGetRowHeight(20 );
             	       SetHeaderRowHeight(21);
             	       SetColProperty('fr_frt_cd', {ComboText:ARFRTCD2, ComboCode:ARFRTCD1} );
     	              	 SetColProperty('fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
     	              	 SetColProperty('fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
     	              	 SetColProperty('fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
     	              	 SetColProperty('fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
                   	     SetSheetHeight(300);
                }  
        	 }
        	break;
        case "sheet6":
        	with(sheetObj){
  	      
    		SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

    	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	      var headers = [ { Text:getLabel('SEE_BMD_0020_HDR8_1'), Align:"Center"} ];
    	      InitHeaders(headers, info);

    	      var cols = [ {Type:"Text",     Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"wo_seq" },
    	             {Type:"Text",     Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"wo_no" },
    	             {Type:"Combo",     Hidden:0, Width:90,   Align:"Center",  ColMerge:0,   SaveName:"wo_status" },
    	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"pickup_trdp_nm" },
    	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"delivery_trdp_nm" },
    	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"return_trdp_nm" },
    	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"trucker_trdp_nm" },
    	             {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"wo_grs_wgt" } ];
    	       
    	      InitColumns(cols);

    	   //   SetGetCountPosition()(0);
    	      SetEditable(0);
    	      SetColProperty('wo_status', {ComboText:"SAVED|ISSUED", ComboCode:"A|B"} );
    	      SetSheetHeight(300);
        }
        break;
    }
}
var etdRangeOk=true;
/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function bkgCheckInpuVals(){
	var isOk=true;
	//---------------20121130 OJG---------------------------
	if(!chkCmpAddr(frm1.shpr_trdp_addr, 'Shipper Address')){
		isOk=false;
		//frm1.shpr_trdp_addr.focus();
	}
	if(!chkCmpAddr(frm1.cnee_trdp_addr, 'Consignee Address')){
		isOk=false;
		//frm1.cnee_trdp_addr.focus();
	}
	if(!chkCmpAddr(frm1.ntfy_trdp_addr, 'Notify Address')){
		isOk=false;
		//frm1.ntfy_trdp_addr.focus();
	}
	if(!checkInType(frm1.etd_dt_tm.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ETD_')); 
		isOk=false;
		//moveTab('01');
		frm1.etd_dt_tm.focus();
		return isOk; 
	}
	if(trim(frm1.etd_dt_tm.value)!= "" && trim(frm1.eta_dt_tm.value) != ""){
		if(getDaysBetweenFormat(frm1.etd_dt_tm, frm1.eta_dt_tm, "MM-dd-yyyy") < 0){
			// 'ETD date must be greater than ETA date
			alert(getLabel("SEA_COM_ALT021"));
			//moveTab('01');
			frm1.eta_dt_tm.focus();
			isOk=false;
			return isOk; 
		}
	}
 	//#25246, 25247 필수값 설정 추가
	if(frm1.pol_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		//moveTab('01');
		frm1.pol_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.pod_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		//moveTab('01');
		frm1.pod_cd.focus();
		isOk=false;
		return isOk; 
	}
	//#31594 [BINEX]B/L Entry 에서 Customer 항목을 mandatory 지정 - 필수값 설정 추가
	if(frm1.act_shpr_trdp_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001') + " - CUSTOMER");
		frm1.act_shpr_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.act_shpr_trdp_nm.value == "") { 
//		alert(getLabel('FMS_COM_ALT001'));
		alert(getLabel('FMS_COM_ALT001') + " - CUSTOMER");
		//moveTab('01');
		frm1.act_shpr_trdp_nm.focus();
		isOk=false;
		return isOk; 
	}
	if(checkInputVal(frm1.bkg_dt_tm.value, 10, 10, "DD", 'Booking Date')!='O'){
		frm1.bkg_dt_tm.focus();
		isOk=false;
		return isOk; 
	}
	//today를 기준으로 6개월 차이가 나면 안됨
	var tmpEtdDate=frm1.etd_dt_tm.value.replaceAll("-", "");
	var etdDate=new Date(tmpEtdDate.substring(4,8), tmpEtdDate.substring(0,2)-1, tmpEtdDate.substring(2,4));
	var tmpDate=new Date();
	var today=new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()); 
	if((today-etdDate)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	} else if((etdDate-today)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	} else{
		etdRangeOk=true;
	}
	
	// PO List validation.
    var poListParam=docObjects[2].GetSaveString(false);
	if(poListParam!=''){
		if(poListCheckInpuVals(docObjects[2])){
			isOk=false;
		}
	}
	return isOk;
}

/**
 * PO List의 입력값 확인
 */
function poListCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
	var isError=false; 
	for(var i=2; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'item_ibflag')=='U'||sheetObj.GetCellValue(i, 'item_ibflag')=='I'){
			if(sheetObj.GetCellValue(i, 'po_sys_no') == "") { 
				alert(getLabel('FMS_COM_ALT001'));
				sheetObj.SelectCell(i,"cust_po_no");
				isError=true;
				break;
			}
		}
	}
	return isError;
}

/**
 * cntr List의 입력값 확인
 */
function cntrListCheckInpuVals(sheetObj){


//	cntr_ibflag
}

function weightChange(obj){
	var formObj=document.frm1;
	if(obj.name=="grs_wgt"){
		var rndXLValue=roundXL(formObj.grs_wgt.value.replaceAll(",","") / 0.453597315, 3);
		formObj.grs_wgt1.value=rndXLValue;
		chkComma(formObj.grs_wgt1, 8, 3);
	}
	else if(obj.name=="grs_wgt1"){
		var rndXLValue=roundXL(formObj.grs_wgt1.value.replaceAll(",","") * 0.453597315, 3);
		formObj.grs_wgt.value=rndXLValue;
		chkComma(formObj.grs_wgt, 8, 3);
	}
}
function cbmChange(obj){
	var formObj=document.frm1;
	if(obj.name=="meas"){
		var rndXLValue=roundXL(formObj.meas.value.replaceAll(",", "") * 35.3165, 3);
		formObj.meas1.value=doMoneyFmt(Number(rndXLValue).toFixed(0));
		//chkComma(formObj.meas1, 8, 3);
	}
	// CFT ==> CBM 기능  
	else if(obj.name=="meas1"){
		var rndXLValue=roundXL(formObj.meas1.value.replaceAll(",", "") / 35.3165, 3);
		formObj.meas.value=rndXLValue;
		chkComma(formObj.meas, 8, 3);
	}
}
function shipModeChange(){
	var formObj=document.frm1;
	if (formObj.shp_mod_cd.value == 'FCL' || formObj.shp_mod_cd.value == 'BLK') {
		formObj.to_svc_term_cd.value='CY';
		formObj.fm_svc_term_cd.value='CY';
	} else {
		formObj.to_svc_term_cd.value='CF';
		formObj.fm_svc_term_cd.value='CF';
	}
}
function setActShipper(){
	var formObj=document.frm1;
	formObj.act_shpr_trdp_cd.value=formObj.shpr_trdp_cd.value;
	formObj.act_shpr_trdp_nm.value=formObj.shpr_trdp_nm.value;
	//#25711 [SUNWAY]Sales Man 자동 설정 
	if (typeof(formObj.sls_usrid.value)!='undefined'
		&& typeof(formObj.sls_usr_nm.value)!='undefined'
			&& typeof(formObj.sls_ofc_cd.value)!='undefined'
				&& typeof(formObj.sls_dept_cd.value)!='undefined')
	{
		setSalesMan(formObj.act_shpr_trdp_cd.value);
	}
}
function setCargoPuckup(){
	var formObj=document.frm1;
	//2011.10.28 Kim,Jin-Hyuk
	//해상 수출 HBL Shipper 입력하면 A/Shipper도 같이 입력해준다. 수정은 가능
	if(trim(formObj.cgo_pu_trdp_cd.value)=="" 
		  && trim(formObj.cgo_pu_trdp_nm.value)=="" 
		  && trim(formObj.cgo_pu_trdp_addr.value)==""){
		formObj.cgo_pu_trdp_cd.value=formObj.shpr_trdp_cd.value;
		formObj.cgo_pu_trdp_nm.value=formObj.shpr_trdp_nm.value;
		formObj.cgo_pu_trdp_addr.value=formObj.shpr_trdp_addr.value;
	}
}
function svcTermChange(){
	var formObj=document.frm1;
	formObj.to_svc_term_cd.value=formObj.fm_svc_term_cd.value;
}
//화면로드시 데이터 표시
function loadData(){
	if(frm1.bkg_seq.value!=""){
		frm1.fm_svc_term_cd.value=frm1.h_fm_svc_term_cd.value;
		frm1.to_svc_term_cd.value=frm1.h_to_svc_term_cd.value;
		
		doWork('SEARCH_PO');
		doWork('SEARCH_CNTR');
		doWork('SEARCHLIST02');
		
	} else {
		if (docObjects[2].GetEditable() == 0) {
			docObjects[2].SetEditable(1);
		}
	}
	//#41634 - [DMS] Default Cursor Position Change
	setTimeout("frm1.bkg_no.focus();", 100);
}
function checkTrdpCode(obj){
	if(obj.name=="shpr_trdp_nm"){
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
		if(frm1.cust_trdp_cd.value==""){
			frm1.cust_trdp_addr.value=obj.value;
		}
	}
}

function sheet2_OnSearchEnd(sheetObj, row, col) {
	if (sheetObj.GetEditable() == 0) {
		sheetObj.SetEditable(1);
	}
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
    setFrCntrList();
}

/*function sheet2_OnChange(sheetObj, row, col, value){
	switch(sheetObj.ColSaveName(col)){
		case "cust_po_no":
			var curVal=sheetObj.GetCellValue(row, "cust_po_no");
			if(curVal==''){
				sheetObj.SetCellValue(row, "po_sys_no","");
				return;
			}else{
				// PO 유효성 검증
				if(!checkCustPoItem(sheetObj.GetCellValue(row, "cust_po_no"))){
					//This Container Number is already used!\nPlease check the P/O No.!
					alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('PO'));
					sheetObj.SetCellValue(row, "cust_po_no",'',0);
					sheetObj.SetCellValue(row, "po_sys_no",'',0);
					sheetObj.SetCellValue(row, "buyr_trdp_nm",'',0);
					sheetObj.SetCellValue(row, "vndr_trdp_nm",'',0);
					sheetObj.SetCellValue(row, "org_loc_nm",'',0);
					sheetObj.SetCellValue(row, "dest_loc_nm",'',0);
					sheetObj.SetCellValue(row, "ord_dt",'',0);
					sheetObj.SetCellValue(row, "shpwin_fr_dt",'',0);
					sheetObj.SetCellValue(row, "shpwin_to_dt",'',0);
					sheetObj.SelectCell(row, "cust_po_no");
				} else {
					ajaxSendPost(searchPoSysNoReq, 'reqVal', '&goWhere=aj&bcKey=searchCustPoNo&s_cust_po_no='+sheetObj.GetCellValue(row, 'cust_po_no'), './GateServlet.gsl');
				}
			}
		break;
	}
}*/

/**
 * PO 중복확인
 */
function checkCustPoItem(inCustPoItem){
 	var intRows=docObjects[2].LastRow() +1;
	var loopNum=0;
	for(var i=2; i < intRows; i++){
		if(inCustPoItem==docObjects[2].GetCellValue(i, 'po_cmdt_seq')){
			loopNum++;	
		}
	}
	if(loopNum>1){
		return false;
	}else{
		return true;
	}
}

/*function sheet2_OnPopupClick(sheetObj, row, col) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	
	// PO 조회
	if(colStr == "cust_po_no"){
		rtnary=new Array(8);
		rtnary[0]=formObj.cnee_trdp_cd.value;
		rtnary[1]=formObj.cnee_trdp_nm.value;
		rtnary[2]=formObj.shpr_trdp_cd.value;
		rtnary[3]=formObj.shpr_trdp_nm.value;
		rtnary[4]=formObj.pol_cd.value;
		rtnary[5]=formObj.pol_nm.value;
		rtnary[6]=formObj.pod_cd.value;
		rtnary[7]=formObj.pod_nm.value;
		
		callBackFunc = "PO_POPLIST";
		modal_center_open('./CMM_POP_0500.clt', rtnary, 1300,500,"yes");
	}
}*/

function PO_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("^^");
		var idx=docObjects[2].LastRow() + 1;
		
		for (var i=0; i < rtnValAry.length; i++) {
			if(rtnValAry[i] == ""){
				break;
			}
			gridAdd(2);
			
			var itemArr=rtnValAry[i].split("@@");
			docObjects[2].SetCellValue(idx, "cust_po_no",itemArr[0],0);
			docObjects[2].SetCellValue(idx, "cust_itm_id",itemArr[1],0);
			docObjects[2].SetCellValue(idx, "cust_itm_nm",itemArr[2],0);
			docObjects[2].SetCellValue(idx, "cmdt_pck_qty",itemArr[3],0);
			docObjects[2].SetCellValue(idx, "cmdt_pck_ut_cd",itemArr[4],0);
			docObjects[2].SetCellValue(idx, "cmdt_pck_ut_nm",itemArr[5],0);
			docObjects[2].SetCellValue(idx, "cmdt_pck_inr_qty",itemArr[6],0);
			docObjects[2].SetCellValue(idx, "cmdt_ea_cnt",itemArr[7],0);
			docObjects[2].SetCellValue(idx, "cmdt_ttl_qty",itemArr[8],0);
			docObjects[2].SetCellValue(idx, "cmdt_kgs_wgt",itemArr[9],0);
			docObjects[2].SetCellValue(idx, "cmdt_lbs_wgt",itemArr[10],0);
			docObjects[2].SetCellValue(idx, "cmdt_cbm_meas",itemArr[11],0);
			docObjects[2].SetCellValue(idx, "cmdt_cft_meas",itemArr[12],0);
			docObjects[2].SetCellValue(idx, "po_cmdt_seq",itemArr[13],0);
			docObjects[2].SetCellValue(idx, "po_sys_no",itemArr[14],0);
			
			// PO 유효성 검증
			if(!checkCustPoItem(docObjects[2].GetCellValue(idx, "po_cmdt_seq"))){
				//This Container Number is already used!\nPlease check the P/O No.!
				alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('ITEM') + " (" + docObjects[2].GetCellValue(idx, "cust_itm_id") + ")");
				docObjects[2].SetCellValue(idx, "del","1",0);
				continue;
			}
			
			idx++;
		}
	}
	
	/*var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var curRow = docObjects[2].GetSelectRow();
		var rtnValAry=rtnVal.split("|");
		
		docObjects[2].SetCellValue(curRow, "cust_po_no",rtnValAry[0],0);
		docObjects[2].SetCellValue(curRow, "buyr_trdp_nm",rtnValAry[1],0);
		docObjects[2].SetCellValue(curRow, "vndr_trdp_nm",rtnValAry[2],0);
		docObjects[2].SetCellValue(curRow, "org_loc_nm",rtnValAry[3],0);
		docObjects[2].SetCellValue(curRow, "dest_loc_nm",rtnValAry[4],0);
		docObjects[2].SetCellValue(curRow, "ord_dt",rtnValAry[5],0);
		docObjects[2].SetCellValue(curRow, "shpwin_fr_dt",rtnValAry[6],0);
		docObjects[2].SetCellValue(curRow, "shpwin_to_dt",rtnValAry[7],0);
		docObjects[2].SetCellValue(curRow, "po_sys_no",rtnValAry[8],0);
		
		sheet2_OnChange(docObjects[2], curRow, 4, "");
	}*/
}

/*function searchPoSysNoReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		var curRow = docObjects[2].GetSelectRow();
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('@@;');
			var result = rtnArr[0].split('@@^');
			docObjects[2].SetCellValue(curRow, 'po_sys_no',result[0],0);
			docObjects[2].SetCellValue(curRow, 'buyr_trdp_nm',result[1],0);
			docObjects[2].SetCellValue(curRow, 'vndr_trdp_nm',result[2],0);
			docObjects[2].SetCellValue(curRow, 'org_loc_nm',result[3],0);
			docObjects[2].SetCellValue(curRow, 'dest_loc_nm',result[4],0);
			docObjects[2].SetCellValue(curRow, 'ord_dt',result[5],0);
			docObjects[2].SetCellValue(curRow, 'shpwin_fr_dt',result[6],0);
			docObjects[2].SetCellValue(curRow, 'shpwin_to_dt',result[7],0);
		}else{
			alert(CODE_NOT_FND);
			docObjects[2].SetCellValue(curRow, 'cust_po_no','',0);
			docObjects[2].SetCellValue(curRow, 'po_sys_no','',0);
			docObjects[2].SetCellValue(curRow, 'buyr_trdp_nm','',0);
			docObjects[2].SetCellValue(curRow, 'vndr_trdp_nm','',0);
			docObjects[2].SetCellValue(curRow, 'org_loc_nm','',0);
			docObjects[2].SetCellValue(curRow, 'dest_loc_nm','',0);
			docObjects[2].SetCellValue(curRow, 'ord_dt','',0);
			docObjects[2].SetCellValue(curRow, 'shpwin_fr_dt','',0);
			docObjects[2].SetCellValue(curRow, 'shpwin_to_dt','',0);
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}*/

function sheet2_OnChange(sheetObj, row, col, value){
	switch (sheetObj.ColSaveName(col)) {
		case "cmdt_pck_inr_qty" :
		case "cmdt_pck_qty" :
		case "cmdt_ea_cnt" :
		case "cmdt_kgs_wgt" :
		case "cmdt_lbs_wgt" :
		case "cmdt_cbm_meas" :
		case "cmdt_cft_meas" :
			if (value < 0) 
			{
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	
	switch(sheetObj.ColSaveName(col)){
		case "cmdt_pck_inr_qty":
		case "cmdt_pck_qty":
		case "cmdt_ea_cnt":
			sheetObj.SetCellValue(row, "cmdt_ttl_qty", (Number(sheetObj.GetCellValue(row, "cmdt_pck_inr_qty")) * Number(sheetObj.GetCellValue(row, "cmdt_pck_qty"))) + Number(sheetObj.GetCellValue(row, "cmdt_ea_cnt")),0);
			break;
		
		case "cmdt_kgs_wgt":
			sheetObj.SetCellValue(row, "cmdt_lbs_wgt",roundXL(sheetObj.GetCellValue(row, col) / 0.453597315, 2),0);
			if (sheetObj.GetCellValue(row, "cmdt_lbs_wgt") >99999999.99) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGWEIG'));				
				sheetObj.SetCellValue(row, "cmdt_kgs_wgt","",0);
				sheetObj.SelectCell(row, "cmdt_kgs_wgt");
			}
			break;
			
		case "cmdt_lbs_wgt":
			sheetObj.SetCellValue(row, "cmdt_kgs_wgt",roundXL(sheetObj.GetCellValue(row, col) * 0.453597315, 2),0);
			break;
			
		case "cmdt_cbm_meas":
			sheetObj.SetCellValue(row, "cmdt_cft_meas",roundXL(sheetObj.GetCellValue(row, col) * 35.3165, 3),0);
			if (sheetObj.GetCellValue(row, "cmdt_cft_meas") > 999999.999999) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGMEAS'));
				sheetObj.SetCellValue(row, "cmdt_cbm_meas","",0);
				sheetObj.SelectCell(row, "cmdt_cbm_meas");
			}
			break;
			
		case "cmdt_cft_meas":
			sheetObj.SetCellValue(row, "cmdt_cbm_meas",roundXL(sheetObj.GetCellValue(row, col) / 35.3165, 3),0);
			break;
	}
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet2_OnDblClick(sheetObj,Row,Col){	
	if (sheetObj.GetCellValue(Row, "item_ibflag") == "R") {
		var colStr=sheetObj.ColSaveName(Col);
		var formObj=document.frm1;
		doProcess=true;
		formObj.f_cmd.value="";
		var paramStr="./OTH_OPR_0030.clt?f_cmd="+SEARCHLIST+'&f_po_sys_no='+sheetObj.GetCellValue(Row, 'po_sys_no')+"&f_cust_po_no="+sheetObj.GetCellValue(Row, "cust_po_no");
	   	parent.mkNewFrame('Purchase Order Entry', paramStr, "OTH_OPR_0030_SHEET_" + sheetObj.GetCellValue(Row, 'po_sys_no')+"_"+sheetObj.GetCellValue(Row, "cust_po_no"));
	}
}

/**
 * Vessel Popup이 BL_CODE_UTIL.js 공통함수 openPopUp를 호출하면서 Return 함수 필요 
 */
function cobChange(){
	
}

var frtSdSheet = false;
var isError = false;

function createHBL(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			if (doc[1] == 'DP' && frm1.bkg_no.value != '') {
				var paramStr="./SEE_BMD_0020.clt?f_cmd=135&f_bkg_no="+frm1.bkg_no.value;
				parent.mkNewFrame('House B/L Entry', paramStr);
			} else {
				alert(getLabel('SAVE_BOOKING_ENTRY'));
			}
		}
	} else {
		// alert(getLabel('SEE_BMD_MSG43'));
	}
}

function loadBtn() {
	document.getElementById('FrtAddDefault').style.display = 'inline';
	document.getElementById('FrtAdd').style.display = 'inline';
	if (frm1.f_bkg_no.value != "" && frm1.intg_bl_seq.value == "") {
		document.getElementById('btn_CreateHBL').style.display = 'inline';
	} else {
		document.getElementById('btn_CreateHBL').style.display = 'none';
	}
}

function cntrGridAddCustom(obj){
	/*	frm1.f_bkg_no.value = trim(frm1.f_bkg_no.value);
	if (frm1.f_bkg_no.value == '') {
		alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_BLNO')
				+ "\n\n: BL_FRT.444");
		return;
	}*/
	cntrGridAdd(obj);
}
function calculatorCntr(){
	var cntrQty = {};
	for(var i=0;i<sheet3.RowCount();i++){
		var dtmp = sheet3.GetRowJson(i+1);
		if(dtmp.cntr_tpsz_cd && dtmp.cntr_tpsz_cd && dtmp.cntr_tpsz_cd != "0" && dtmp.del != "1"){
			if(cntrQty[dtmp.cntr_tpsz_cd]){
				cntrQty[dtmp.cntr_tpsz_cd] += parseInt(dtmp.qty);
			}else{
				cntrQty[dtmp.cntr_tpsz_cd] = parseInt(dtmp.qty);
			}
		}
	}
	
	var first = true;
	frm1.cntr_info.value = "";
	for(key in cntrQty){
		if(!first) {frm1.cntr_info.value += ",";}
		first=false;
		frm1.cntr_info.value += key+'x'+cntrQty[key];
	}
}
function sheet3_OnChange(sheetObj, row, col, value){
	calculatorCntr();
	setFrCntrList();
}
/**
 * Freight S/D 처리. Type/Size에 따른 Volume(수량) 체크
 */
function sheet5_OnChange(sheetObj, row, col, value) {
	switch (sheetObj.ColSaveName(col)) {
	case "fr_qty":
	case "fr_ru":
	case "fr_trf_cur_sum_amt":
	case "fr_vat_rt":
	case "fr_vat_amt":
	case "fr_inv_xcrt":
	case "fr_inv_amt":
	case "fr_inv_vat_amt":
	case "fr_inv_sum_amt":
		if (value < 0) {
			// Input data must be greater than 0.
			alert(getLabel("FMS_COM_ALT042"));
			sheetObj.SetCellValue(row, col, "", 0);
			return;
		}
		break;
	}
	mutiSheetOnChangeCustom(sheetObj, row, col, '', 'S', 'O', 'H');
}

/**
 * Freight S/D 처리
 */
function sheet5_OnClick(sheetObj, row, col) {
	mutiSheetOnClick(sheetObj, row, col, '');
}
function sheet5_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'O', 'H');
}
function sheet5_OnDblClick(sheetObj, row, col) {
	mutiSheetDblClick(sheetObj, row, col, '');
}
function sheet5_OnSaveEnd(sheetObj, row, col) {
	//P/C값을 copy
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellValue(i,"fr_frt_term_cd_h",sheetObj.GetCellValue(i,"fr_frt_term_cd"),0);
	}
	//버튼 초기화
	cnfCntr('SD');
	//PPD, CCT, Total 계산
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
}
function sheet5_OnSearchEnd(sheetObj, row, col) {
	//#25833 P/C값을 copy
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellValue(i,"fr_frt_term_cd_h",sheetObj.GetCellValue(i,"fr_frt_term_cd"),0);
	}
	//버튼 초기화
	cnfCntr('SD');
	//PPD, CCT, Total 계산
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, '', 'S', 'O', 'H');
	}
    setFrCntrList();
}
/**
 * 
 * @param doWhat
 * @param sheetObj
 * @param air_sea_clss_cd
 * @param bnd_clss_cd
 * @param biz_clss_cd
 * @param collVal :
 *            Add - 'A', Tab Add - 'T', Default - 'D', 추가 로직으로 Default 일때만 값 전송
 * @return
 */
function frtRowAddCustom(doWhat, sheetObj, air_sea_clss_cd, bnd_clss_cd,
		biz_clss_cd, callVal) {
	frm1.f_bkg_no.value = trim(frm1.f_bkg_no.value);
	if (doWhat == "ROWADD") {
/*		if (frm1.f_bkg_no.value == '') {
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_BLNO')
					+ "\n\n: BL_FRT.444");
			return;
		} else {*/
			var intRows2;

			var tmpRow = sheetObj.LastRow();

			if (sheetObj.GetCellValue(tmpRow, 'fr_sell_buy_tp_cd') == '') {
				intRows2 = tmpRow;
				sheetObj.DataInsert(intRows2);
			} else {
				intRows2 = sheetObj.DataInsert();
			}

			sheetObj.SetCellValue(intRows2, 'fr_sell_buy_tp_cd', 'S', 0);

			if (intRows2 > headerRowCnt) {
				if (callVal != 'D') {
					if (sheetObj.GetCellValue(intRows2 - 1, 'fr_trdp_cd') != "") {
						sheetObj.SetCellValue(intRows2, "fr_trdp_cd", sheetObj
								.GetCellValue(intRows2 - 1, "fr_trdp_cd"));
					}
					if (sheetObj.GetCellValue(intRows2 - 1, 'fr_aply_ut_cd') != "") {
						sheetObj.SetCellValue(intRows2, "fr_aply_ut_cd",
								sheetObj.GetCellValue(intRows2 - 1,
										"fr_aply_ut_cd"));
					}
					if (sheetObj.GetCellValue(intRows2, "fr_aply_ut_cd") != "SCN"
							&& sheetObj.GetCellValue(intRows2 - 1, 'fr_qty') != "") {
						sheetObj.SetCellValue(intRows2, "fr_cntr_tpsz_cd", '',
								0);
						sheetObj.SetCellValue(intRows2, "fr_qty", sheetObj
								.GetCellValue(intRows2 - 1, "fr_qty"), 0);
					}
				}
				if (sheetObj.GetCellValue(intRows2 - 1, 'fr_rat_curr_cd') != "") {
					sheetObj.SetCellValue(intRows2, "fr_rat_curr_cd", sheetObj
							.GetCellValue(intRows2 - 1, "fr_rat_curr_cd"), 0);
				}
				if (sheetObj.GetCellValue(intRows2 - 1, 'fr_inv_curr_cd') != "") {
					sheetObj.SetCellValue(intRows2, "fr_inv_curr_cd", sheetObj
							.GetCellValue(intRows2 - 1, "fr_inv_curr_cd"), 0);
				}
				if (sheetObj.GetCellValue(intRows2 - 1, 'fr_inv_xcrt') != "") {
					sheetObj.SetCellValue(intRows2, "fr_inv_xcrt", sheetObj
							.GetCellValue(intRows2 - 1, "fr_inv_xcrt"), 0);
				}
			}
			if (bnd_clss_cd == "I") {
				sheetObj.SetCellValue(intRows2, 'fr_frt_term_cd', 'CC', 0);
			} else if (bnd_clss_cd == "O") {
				sheetObj.SetCellValue(intRows2, 'fr_frt_term_cd', 'PP', 0);
			}
			if (sheetObj.GetCellValue(intRows2, 'fr_rat_curr_cd') == "") { // 위
																			// row
																			// 값이
																			// 없는
																			// 경우
																			// Set
				sheetObj.SetCellValue(intRows2, "fr_rat_curr_cd", ofc_curr_cd,
						0);// ofc_curr_cd;
			}
			sheetObj.SetCellValue(intRows2, "fr_inv_curr_cd", sheetObj
					.GetCellValue(intRows2, "fr_rat_curr_cd"), 0);
			sheetObj.SetCellValue(intRows2, "fr_inv_xcrt", 1, 0);

			var vDateName = frm1.xcrtDt.value;

			if (vDateName != "" && biz_clss_cd == "H") {
				var mYear = vDateName.substr(4, 4)
				var mMonth = vDateName.substr(0, 2);
				var mDay = vDateName.substr(2, 2);
				vDateName = mYear + "" + mMonth + "" + mDay;
			}
			if (MULTI_CURR_FLAG == "Y") { // [20141212 OJG]Muti Currency
				if (frm1.xcrtDt.value.length == 8) {
					var xcrtDt = frm1.xcrtDt.value.substr(4, 4)
							+ frm1.xcrtDt.value.substr(0, 2)
							+ frm1.xcrtDt.value.substr(2, 2);
					sheetObj
							.SetCellValue(intRows2, "fr_inv_xcrt_dt", xcrtDt, 0);
				}
			} else {
				sheetObj.SetCellValue(intRows2, "fr_inv_xcrt_dt", vDateName, 0);
			}
			// perf_curr_cd
			sheetObj.SetCellValue(intRows2, "fr_perf_curr_cd", dfPerfCurr, 0);
			sheetObj.SetCellValue(intRows2, "fr_perf_xcrt", 0, 0);
			sheetObj.SetCellValue(intRows2, "fr_perf_amt", 0, 0);
			sheetObj.SetCellValue(intRows2, "fr_perf_vat_amt", 0, 0);
			if (sheetObj.GetCellValue(intRows2, 'fr_trdp_cd') == "") { // 위 row
																		// 값이 없는
																		// 경우
																		// Set
				if (biz_clss_cd == "H") {
					sheetObj.SetCellValue(intRows2, 'fr_trdp_cd',
							frm1.act_shpr_trdp_cd.value);
				} else {
					sheetObj.SetCellValue(intRows2, 'fr_trdp_cd', '', 0);
					sheetObj.SetCellValue(intRows2, 'fr_trdp_nm', '', 0);
				}
			}
			if (sheetObj.GetCellValue(intRows2, 'fr_aply_ut_cd') == "") { // 위
																			// row
																			// 값이
																			// 없는
																			// 경우
																			// Set
				if (biz_clss_cd == "H") {
					if (air_sea_clss_cd == "A" && bnd_clss_cd == "I") {
						sheetObj.SetCellValue(intRows2, 'fr_aply_ut_cd', "ACW",
								0);
						sheetObj.SetCellValue(intRows2, 'fr_qty',
								frm1.chg_wgt.value, 0);
					} else if (air_sea_clss_cd == "A" && bnd_clss_cd == "O") {
						// ------------[20130208
						// OJG]-------------------------------------
						if (frm1.customer_unit_chk[0].checked) { // Selling
																	// Rate/Amount
																	// 무게 단위에 따라
																	// 무게 값 적용
							sheetObj.SetCellValue(intRows2, 'fr_aply_ut_cd',
									"ACW", 0);
							sheetObj.SetCellValue(intRows2, 'fr_qty',
									frm1.agent_chg_wgt.value, 0);// Kg 적용
						} else if (frm1.customer_unit_chk[1].checked) {
							sheetObj.SetCellValue(intRows2, 'fr_aply_ut_cd',
									"ACL", 0);
							sheetObj.SetCellValue(intRows2, 'fr_qty',
									frm1.agent_chg_wgt1.value, 0);// Lb 적용
						}
						// ------------[20130208
						// OJG]-------------------------------------
					}
				}
			}
			// ADD Row 시에 check box handling 불가, 저장에만 이용
			sheetObj.SetCellEditable(intRows2, 'fr_frt_check', 0);
			// fr_inv_sum_amt 가 0 일 경우 warning
			warningTotalAmount(sheetObj, intRows2, 'fr_inv_sum_amt', sheetObj
					.GetCellValue(intRows2, 'fr_inv_sum_amt'));
			// focus 주기
			sheetObj.SelectCell(intRows2, 1);
		}
		// ------[20130829 OJG]---------
		if (sheetObj.GetCellValue(intRows2, 'fr_aply_ut_cd') != "SCN") { // Container
																			// 가
																			// 아니면.
			sheetObj.SetCellEditable(intRows2, "fr_cntr_tpsz_cd", 0);
		}
		// ------[20130829 OJG]---------
	//}
}


function setFrCntrList(){
	var TPSZCD1=' |';
	
	for(var i=1;i<sheet3.RowCount()+1;i++){
		TPSZCD1 += sheet3.GetCellValue(i,"cntr_tpsz_cd");
		if(i < sheet3.RowCount()){TPSZCD1 += "|";}
	}

	sheet5.SetColProperty("fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD1} );
}


function bindDataCntr(){
	var cntrData = frm1.cntr_info.value.trim();
	if(!cntrData) return;
	var TPSZCD1=' |';
	
	cntrData = cntrData.split(',');
	for(var i=0;i<cntrData.length;i++){
		var r = sheet3.DataInsert();
		var tmp = cntrData[i].split('x');
		sheet3.SetCellValue(r, "cntr_tpsz_cd", tmp[0]);
		sheet3.SetCellValue(r, "cmdt_pck_qty", tmp[1]);
		TPSZCD1 += tmp[0];
		if(i < cntrData.length - 1){TPSZCD1 += "|";}
	}
	sheet5.SetColProperty("fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD1} );
	
//	var formObj=document.frm1;
//	formObj.f_cmd.value=cmd;
//	
//	$.ajax({
//		   type: "POST",
//		   url: "./SEE_BMD_0200_3GS.clt",
//		   dataType: 'xml',
//		   data: $(formObj).serialize(),
//		   success: function(data){
//			   setFieldValue( formObj.bkg_seq, $('bkg_seq',data).text());
//			   setFieldValue( formObj.cntr_seq, $('cntr_seq',data).text());
//			   setFieldValue( formObj.delt_flg, $('delt_flg',data).text());
//			   setFieldValue( formObj.cntr_tpsz_cd, $('cntr_tpsz_cd',data).text());
//			   setFieldValue( formObj.qty, $('qty',data).text());
//			   
//			   loadData();
//		   },
//		   error: function(){
//			   doHideProcess();
//			   alert("system error!");
//		   }
//		 });
	
	
}

function setDfltFrtCustom(tabStr, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd){
	curTab=tabStr;
	var tmp_dt=frm1.xcrtDt.value.replaceAll("-", "");
	var param=''; 
	param += '&cur_dt=' + tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
	param += '&air_sea_clss_cd=' + air_sea_clss_cd;
	param += '&bnd_clss_cd=' + bnd_clss_cd;
	param += '&biz_clss_cd=' + biz_clss_cd;
	param += '&tabStr=' + tabStr;
	ajaxSendPost(dispDfltAjaxReqCustom, 'reqVal', '&goWhere=aj&bcKey=getDfltFrt&f_sea_use_flg=Y' + param, './GateServlet.gsl');
}

/**
 * Default Fregiht를 화면에 표시함
 */
function dispDfltAjaxReqCustom(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split(';');
			var curSheet;
			if(curTab=='b_'){
				doDispDfltFrtCustom(rtnArr, 'b_', 'BCROWADD', getBcSheet())
			}else if(curTab=='dc_'){
				doDispDfltFrtCustom(rtnArr, 'dc_', 'DCROWADD', getDcSheet())
			}else{
				doDispDfltFrtCustom(rtnArr, '',   'ROWADD',   getSdSheet())
			}
		}
	}
	else{
		//Data load failed.
		alert(getLabel('FMS_COM_ALT019') + "\n\n: BL_FRT.2507");
	}
}
function doDispDfltFrtCustom(rtnArr, curTab, addRowStr, curSheet){
	var loopLen=rtnArr.length;
	loopLen--;
	for(var i=0; i < loopLen; i++){
		var masterVals=rtnArr[i].split('@^');	
		var usedFrtCd=false;
		var tmpTotRows=curSheet.LastRow();
		//사용된 Freight Code가 아닌 경우 열추가 및 코드값 입력
		if(!usedFrtCd){
			curSheet.SetSelectRow(tmpTotRows);
			frtRowAddCustom(addRowStr, curSheet, masterVals[8], masterVals[9], masterVals[10], 'D');
			tmpTotRows=curSheet.LastRow() + 1; // + 1
			tmpTotRows--;
			if(curTab==''){
				if(masterVals[10]=="H"){
					curSheet.SetCellValue(tmpTotRows, 'fr_trdp_cd',frm1.act_shpr_trdp_cd.value,0);
					curSheet.SetCellValue(tmpTotRows, 'fr_trdp_nm',frm1.act_shpr_trdp_nm.value,0);
				}else{
				}
			}else if(curTab=='b_'){
//				curSheet.CellValue2(tmpTotRows, 'b_fr_trdp_cd') = frm1.lnr_trdp_cd.value;
//				curSheet.CellValue2(tmpTotRows, 'b_fr_trdp_nm') = frm1.lnr_trdp_nm.value;
			}else if(curTab=='dc_'){
				if(masterVals[10]=="H"){
					if(typeof(frm1.prnr_trdp_cd2)!='undefined' && frm1.prnr_trdp_cd2.value!=''){
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_cd',frm1.prnr_trdp_cd2.value,0);
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_nm',frm1.prnr_trdp_nm2.value,0);
					}else{
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_cd',frm1.prnr_trdp_cd.value,0);
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_nm',frm1.prnr_trdp_nm.value,0);
					}
				}else{
				}
			}
			curSheet.SetCellValue(tmpTotRows, curTab+'fr_frt_cd',masterVals[0]);
			curSheet.SetCellValue(tmpTotRows, curTab+'fr_frt_cd_nm',masterVals[1],0);
			/*
			curSheet.SetCellValue(tmpTotRows, curTab+"fr_rat_curr_cd",masterVals[2],0);
if(curSheet.GetCellValue(tmpTotRows, curTab+"fr_inv_curr_cd")==masterVals[2]){
				curSheet.SetCellValue(tmpTotRows, curTab+'fr_inv_xcrt',1,0);
			}else{
				curSheet.SetCellValue(tmpTotRows, curTab+'fr_inv_xcrt',masterVals[4],0);
			}
			curSheet.SetCellValue(tmpTotRows, curTab+'fr_inv_xcrt_dt',masterVals[3],0);
			*/
			//2011.12.14  Kim,Jin-Hyuk 추가
			//단위를 BL로 수량을 1로 셋팅
			if(masterVals[8]=="A"){
				if(masterVals[9]=='O' && masterVals[10]=="H"){
					if(frm1.customer_unit_chk[0].checked){
						curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"ACW",0);
						curSheet.SetCellValue(tmpTotRows, 'fr_cntr_tpsz_cd','',0);
						curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',frm1.chg_wgt.value,0);
					}else if(frm1.customer_unit_chk[1].checked){
						curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"AGL",0);
						curSheet.SetCellValue(tmpTotRows, 'fr_cntr_tpsz_cd','',0);
						curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',frm1.chg_wgt1.value,0);
					}
				}else{
					curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"ACW",0);
					curSheet.SetCellValue(tmpTotRows, 'fr_cntr_tpsz_cd','',0);
					curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',frm1.chg_wgt.value,0);
				}
			}else{
				curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd','B/L',0);
				curSheet.SetCellValue(tmpTotRows, 'fr_cntr_tpsz_cd','',0);
				curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',1,0);
			}
			if(curTab==''){
				//VAT 요율 셋팅
				if(masterVals[5]=="Y"){
					curSheet.SetCellValue(tmpTotRows, 'fr_vat_rt',masterVals[6],0);
				}
				if(masterVals[10]=="H"){
					if(masterVals[8]=="A" && masterVals[9]=='O'){
						//curSheet.CellValue2(tmpTotRows, curTab+'fr_qty') = frm1.agent_chg_wgt.value;
						//------[20130215 ojg]-----------
						if(frm1.customer_unit_chk[0].checked){		//Selling Rate/Amount 무게 단위에 따라 무게 값 적용
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"ACW",0);
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',frm1.agent_chg_wgt.value,0);//Kg 적용
						}else if(frm1.customer_unit_chk[1].checked){	
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"ACL",0);
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',frm1.agent_chg_wgt1.value,0);//Lb 적용
						}	
						//------[20130215 ojg]-----------
					}
				}else{
				}
				//fr_inv_sum_amt 가 0 일 경우 warning
warningTotalAmount(curSheet, tmpTotRows, 'fr_inv_sum_amt', curSheet.GetCellValue(tmpTotRows, 'fr_inv_sum_amt'));
			}else if(curTab=='b_'){
				//VAT 요율 셋팅
				if(masterVals[5]=="Y"){
					curSheet.SetCellValue(tmpTotRows, 'b_fr_vat_rt',masterVals[6],0);
				}			
				//fr_inv_sum_amt 가 0 일 경우 warning
warningTotalAmount(curSheet, tmpTotRows, 'b_fr_inv_sum_amt', curSheet.GetCellValue(tmpTotRows, 'b_fr_inv_sum_amt'));
				if(masterVals[10]=="H"){
					if(masterVals[8]=="A" && masterVals[9]=='O'){
						//curSheet.CellValue2(tmpTotRows, curTab+'fr_qty') = frm1.agent_chg_wgt.value;
						//------[20130215 ojg]-----------
						if(frm1.customer_unit_chk[0].checked){		//Selling Rate/Amount 무게 단위에 따라 무게 값 적용
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"ACW",0);
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',frm1.agent_chg_wgt.value,0);//Kg 적용
						}else if(frm1.customer_unit_chk[1].checked){	
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"ACL",0);
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',frm1.agent_chg_wgt1.value,0);//Lb 적용
						}	
						//------[20130215 ojg]-----------
					}
				}
			}else if(curTab=='dc_'){
				/*
				 * Agent_rt, Customer_rt 반영
				 * masterVals[9] == bnd_clss_cd (해상 수출, 항공 수출)
				 * masterVals[7] == frt_clss_cd (FC)
				 */
				//if(masterVals[8]=="A" && masterVals[9]=='O'){
				if(masterVals[8]=="A" && masterVals[9]=='O'){
					if(masterVals[7]=="FC"){
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd','D',0);
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_term_cd','CC',0);
						//강성덕수석님 요청으로 아래의 소스 수정함. 미심적은 부분있으면 문의할 것 2012.02.01 PJK
						//curSheet.CellValue(tmpTotRows, 'dc_fr_ru') = frm1.cust_amt.value;
						if(masterVals[10]=="H"){
							if(frm1.cust_rt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru', frm1.cust_rt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru',frm1.cust_rt.value==''? 0 : frm1.cust_rt.value.replaceAll(",",""));
							if(frm1.cust_amt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_amt', 0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_amt', frm1.cust_amt.value.replaceAll(",","")*1);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt', frm1.cust_amt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_amt',frm1.cust_amt.value==''? 0 : frm1.cust_amt.value.replaceAll(",",""));
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt',frm1.cust_amt.value==''? 0 : frm1.cust_amt.value.replaceAll(",",""));
							
							if(frm1.cust_rt.value!=''){
								if(frm1.customer_unit_chk[0].checked){
									curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',curSheet.GetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm') + "(" + frm1.chg_wgt.value + " * " + Number(frm1.cust_rt.value).toFixed(2) + ")",0);
								}else if(frm1.customer_unit_chk[1].checked){
									curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',curSheet.GetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm') + "(" + frm1.chg_wgt1.value + " * " + Number(frm1.cust_rt.value).toFixed(2) + ")",0);
								}
							}
						}else{
						}
						//Agent row를 하나 더 추가한다.
						frtRowAddCustom(addRowStr, curSheet, masterVals[8], masterVals[9], masterVals[10], 'D');
						tmpTotRows=curSheet.LastRow() + 1; // + 1
						tmpTotRows--;
						if(masterVals[10]=="H"){
							if(typeof(frm1.prnr_trdp_cd2)!='undefined' && frm1.prnr_trdp_cd2.value!=''){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_cd',frm1.prnr_trdp_cd2.value,0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_nm',frm1.prnr_trdp_nm2.value,0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_cd',frm1.prnr_trdp_cd.value,0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_nm',frm1.prnr_trdp_nm.value,0);
							}
							if(frm1.agent_rt.value==''){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1],0);
							}else{
								if(user_ofc_cnt_cd=="JP"){
									curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1] + "(" + frm1.chg_wgt.value + " * " + Number(frm1.agent_rt.value).toFixed(2) + ")",0);
								}else{
									if(frm1.agent_unit_chk[0].checked){
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1] + "(" + frm1.grs_wgt.value + " * " + Number(frm1.agent_rt.value).toFixed(2) + ")",0);
									}else if(frm1.agent_unit_chk[1].checked){
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1] + "(" + frm1.grs_wgt1.value + " * " + Number(frm1.agent_rt.value).toFixed(2) + ")",0);
									}
								}
							}
							//강성덕수석님 요청으로 아래의 소스 수정함. 미심적은 부분있으면 문의할 것 2012.02.01 PJK
							//curSheet.CellValue(tmpTotRows, 'dc_fr_agent_ru') = frm1.agent_amt.value;
							if(frm1.agent_rt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru', frm1.agent_rt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru',frm1.agent_rt.value==''? 0 : frm1.agent_rt.value.replaceAll(",",""));
							if(frm1.agent_amt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_amt', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_amt', frm1.agent_amt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_amt',frm1.agent_amt.value==''? 0 : frm1.agent_amt.value.replaceAll(",",""));
						}
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd',masterVals[0],0);
						/*
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_rat_curr_cd',masterVals[2],0);
if(curSheet.GetCellValue(tmpTotRows, 'dc_fr_inv_curr_cd')==masterVals[2]){
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_xcrt',1,0);
						}else{
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_xcrt',masterVals[4],0);
						}
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_xcrt_dt',masterVals[3],0);
						*/
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',1,0);
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd','C',0);
						if(masterVals[8]=="A"){
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_term_cd','PP',0);
							if(user_ofc_cnt_cd=="JP"){
								curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"ACW",0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_cntr_tpsz_cd','',0);
								curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',frm1.chg_wgt.value,0);
							}else{
								//LHK 20132026 오류수정
								if(masterVals[10]=="H"){
									if(frm1.agent_unit_chk[0].checked){
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd',"AGW",0);
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',frm1.grs_wgt.value,0);
									}else if(frm1.agent_unit_chk[1].checked){
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd',"AGL",0);
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',frm1.grs_wgt1.value,0);
									}
								}
							}
						}else if(masterVals[8]=="S"){
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_term_cd','CC',0);
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"B/L",0);
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_cntr_tpsz_cd','',0);
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',1,0);
						}
					}
				}
				//원래 조건
				//if(masterVals[8]=="S" && masterVals[9]=='O' && masterVals[10]=='H'){
				if(masterVals[8]=="S" && masterVals[9]=='O'){
					if(masterVals[7]=="FC"){
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd','D',0);
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_term_cd','CC',0);
						if(frm1.shp_mod_cd.value=="FCL"){
							//LHK 2013.01.31 FCL 인 경우 BL 선택 QTY 1, Debit/Credit Rate 에  Amount 를 Set.
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd','BL',0);
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',1,0);
if(curSheet.GetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd') == 'D'){
curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru',curSheet.GetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt'),0);
							}else{
curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru',curSheet.GetCellValue(tmpTotRows, 'dc_fr_agent_amt'),0);
							}
						}else{
							//2012.05.02 CBM / Weight 중 높은 기준으로 적용 (RT)
							var grsWgtKg=frm1.grs_wgt.value.replaceAll(",","");
							var retWgt=roundXL(grsWgtKg / 1000, 3);
							var cbm=frm1.meas.value.replaceAll(",","");
							if(cbm<1){
								cbm=1;
							}
							if(retWgt<1){
								retWgt=1;
							}
							if(retWgt > cbm){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd','RET',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_cntr_tpsz_cd','',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',retWgt,0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd','CBM',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_cntr_tpsz_cd','',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',frm1.meas.value,0);
							}
						}
						//강성덕수석님 요청으로 아래의 소스 수정함. 미심적은 부분있으면 문의할 것 2012.02.01 PJK
						//curSheet.CellValue(tmpTotRows, 'dc_fr_ru') = frm1.cust_amt.value;
						if(masterVals[10]=="H"){
							if(frm1.cust_rt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru', frm1.cust_rt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru',frm1.cust_rt.value==''? 0 : frm1.cust_rt.value.replaceAll(",",""));
							if(frm1.cust_amt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_amt', 0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_amt', frm1.cust_amt.value.replaceAll(",","")*1);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt', frm1.cust_amt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_amt',frm1.cust_amt.value==''? 0 : frm1.cust_amt.value.replaceAll(",",""));
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt',frm1.cust_amt.value==''? 0 : frm1.cust_amt.value.replaceAll(",",""));
							//LHK 2013.01.31 FCL 인 경우 BL 선택 QTY 1, Debit/Credit Rate 에  Amount 를 Set
							if(frm1.shp_mod_cd.value=="FCL"){
curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru',curSheet.GetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt'),0);
							}
							if(frm1.cust_rt.value!=''){
curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',curSheet.GetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm') + "("+ frm1.meas.value + " * " + Number(frm1.cust_rt.value).toFixed(2) +")",0);
							}
						}else{
						}
						//Agent row를 하나 더 추가한다.
						frtRowAddCustom(addRowStr, curSheet, masterVals[8], masterVals[9], masterVals[10], 'D');
						tmpTotRows=curSheet.LastRow() + 1; // +1
						tmpTotRows--;
						if(masterVals[10]=="H"){
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_cd',frm1.prnr_trdp_cd.value,0);
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_nm',frm1.prnr_trdp_nm.value,0);
							if(frm1.agent_rt.value==''){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1],0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1] + "("+ frm1.meas.value + " * " + Number(frm1.agent_rt.value).toFixed(2) +")",0);
							}
							//강성덕수석님 요청으로 아래의 소스 수정함. 미심적은 부분있으면 문의할 것 2012.02.01 PJK
							//curSheet.CellValue(tmpTotRows, 'dc_fr_agent_ru') = frm1.agent_amt.value;
							
							if(frm1.agent_rt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru', frm1.agent_rt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru',frm1.agent_rt.value==''? 0 : frm1.agent_rt.value.replaceAll(",",""));
							if(frm1.agent_amt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_amt', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_amt', frm1.agent_amt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_amt',frm1.agent_amt.value==''? 0 : frm1.agent_amt.value.replaceAll(",",""));
						}else{
						}
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd',masterVals[0],0);
						/*
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_rat_curr_cd',masterVals[2],0);
if(curSheet.GetCellValue(tmpTotRows, 'dc_fr_inv_curr_cd')==masterVals[2]){
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_xcrt',1,0);
						}else{
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_xcrt',masterVals[4],0);
						}
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_xcrt_dt',masterVals[3],0);
						*/
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',1,0);
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd','C',0);
						if(frm1.shp_mod_cd.value=="FCL"){
							//LHK 2013.01.31 FCL 인 경우 BL 선택 QTY 1, Debit/Credit Rate 에  Amount 를 Set.
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd','BL',0);
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',1,0);
if(curSheet.GetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd') == 'D'){
curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru',curSheet.GetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt'),0);
							}else{
curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru',curSheet.GetCellValue(tmpTotRows, 'dc_fr_agent_amt'),0);
							}
						}else{
							//2012.05.02 CBM / Weight 중 높은 기준으로 적용 (RT)
							var grsWgtKg=frm1.grs_wgt.value.replaceAll(",","");
							var retWgt=roundXL(grsWgtKg / 1000, 3);
							var cbm=frm1.meas.value.replaceAll(",","");
							if(cbm<1){
								cbm=1;
							}
							if(retWgt<1){
								retWgt=1;
							}
							if(retWgt > cbm){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd','RET',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_cntr_tpsz_cd','',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',retWgt,0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd','CBM',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_cntr_tpsz_cd','',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',frm1.meas.value,0);
							}
						}
					}
				}
				//fr_inv_sum_amt 가 0 일 경우 warning
				//Revenue 일 경우 
if(curSheet.GetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd') == "D"){
					//fr_inv_sum_amt 가 0 일 경우 warning
warningTotalAmount(curSheet, tmpTotRows, 'dc_fr_inv_sum_amt', curSheet.GetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt'));
					curSheet.SetCellBackColor(tmpTotRows, 'dc_fr_agent_amt',curSheet.GetDataBackColor());
					//Credit 입력 제한 
					curSheet.SetCellEditable(tmpTotRows, "dc_fr_ru",1);
					curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru',0);
					curSheet.SetCellEditable(tmpTotRows, "dc_fr_agent_ru",0);
					curSheet.SetCellEditable(tmpTotRows, "dc_fr_inv_sum_amt",1);
					curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_amt',0);
					curSheet.SetCellEditable(tmpTotRows, "dc_fr_agent_amt",0);
				}	
				//Cost 일 경우 
if(curSheet.GetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd') == "C"){
					//fr_inv_sum_amt 가 0 일 경우 warning
warningTotalAmount(curSheet, tmpTotRows, 'dc_fr_agent_amt', curSheet.GetCellValue(tmpTotRows, 'dc_fr_agent_amt'));
					curSheet.SetCellBackColor(tmpTotRows, 'dc_fr_inv_sum_amt',curSheet.GetDataBackColor());
					//Debit 입력 제한
					curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru',0);
					curSheet.SetCellEditable(tmpTotRows, "dc_fr_ru",0);
					curSheet.SetCellEditable(tmpTotRows, "dc_fr_agent_ru",1);
					curSheet.SetCellEditable(tmpTotRows, "dc_fr_agent_amt",1);
					curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt',0);
					curSheet.SetCellEditable(tmpTotRows, "dc_fr_inv_sum_amt",0);
				}
			}
			//------[20130829 OJG]---------
if(curSheet.GetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd') != "SCN"){	//Container 가 아니면.
				curSheet.SetCellEditable(tmpTotRows, curTab+"fr_cntr_tpsz_cd",0);
			}
			//------[20130829 OJG]---------
		}
	}
}
function getSdSheet(){
	return docObjects[3];
}
function blCheckInpuVals() {
	var isOk = true;
	var frtSdListParam = docObjects[3].GetSaveString(false);
	if (docObjects[3].IsDataModified() && frtSdListParam == "") {
		isOk = false;
	}
	;
	return isOk;
}
function mutiSheetOnChangeCustom(sheetObj, row, col, objPfx, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd) {
	var colStr=sheetObj.ColSaveName(col);
	//check 된 경우 ,수정된 데이터 check false
	if(colStr!=objPfx+"fr_frt_check" && sheetObj.GetCellValue(row, objPfx+"fr_frt_check") == 1){
			//sheetObj.CellValue2(row, objPfx+"fr_frt_check") = 0;
			//sheetObj.CellEditable(row, objPfx+"fr_cntr_tpsz_cd") = false;
	}
	if(colStr==objPfx+'fr_sell_buy_tp_cd'){
		var tpCd=sheetObj.GetCellValue(row, objPfx+'fr_sell_buy_tp_cd');
		var trfCur=sheetObj.GetCellValue(row, objPfx+'fr_rat_curr_cd');
		/*
		var invCur='KRW';
		if(tpCd=='D'||tpCd=='C'){
			invCur='USD';
		}
		sheetObj.SetCellValue(row, objPfx+'fr_inv_curr_cd',invCur,0);
		if(trfCur=='USD'&&invCur=='KRW'){
//			sheetObj.CellValue(row, objPfx+'fr_inv_xcrt') = frm1.dispCur.value;
		}else if(trfCur==invCur){
			sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
		}else{
			sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
		}
		*/
		if(objPfx == 'dc_' && sheetObj.GetCellValue(row, objPfx+'fr_sell_buy_tp_cd') == 'D'){
			//DC , Revenue 일 때 credit 입력 제한
			sheetObj.SetCellEditable(row, objPfx+"fr_ru",1);
			sheetObj.SetCellValue(row, objPfx+'fr_agent_ru',0);
			sheetObj.SetCellEditable(row, objPfx+"fr_agent_ru",0);
			sheetObj.SetCellEditable(row, objPfx+"fr_inv_sum_amt",1);
			sheetObj.SetCellValue(row, objPfx+'fr_agent_amt',0);
			sheetObj.SetCellEditable(row, objPfx+"fr_agent_amt",0);
		}
		if(objPfx == 'dc_' && sheetObj.GetCellValue(row, objPfx+'fr_sell_buy_tp_cd') == 'C'){
			//DC , Cost 일 때 revenue 입력 제한
			sheetObj.SetCellValue(row, objPfx+'fr_ru',0);
			sheetObj.SetCellEditable(row, objPfx+"fr_ru",0);
			sheetObj.SetCellEditable(row, objPfx+"fr_agent_ru",1);
			sheetObj.SetCellEditable(row, objPfx+"fr_agent_amt",1);
			sheetObj.SetCellValue(row, objPfx+'fr_inv_sum_amt',0);
			sheetObj.SetCellEditable(row, objPfx+"fr_inv_sum_amt",0);
		}
	}else if(colStr==objPfx+'fr_frt_cd'){
		var codeStr=sheetObj.GetCellValue(row, objPfx+'fr_frt_cd');
		if(codeStr.length>1){
			//결과를 표시할 Col을 초기화함
			sheetObj.SetCellValue(row, objPfx+'fr_frt_cd_nm','',0);
			//sheetObj.CellValue2(row, objPfx+"fr_qty") = '';
		    sheetObj.SetCellValue(row, objPfx+"fr_cntr_tpsz_cd",'',0);
		    //sheetObj.CellValue2(row, objPfx+"fr_trf_cur_sum_amt") = '';
		    //param setting
		    var param='&air_sea_clss_cd=' + air_sea_clss_cd;
			param += '&bnd_clss_cd=' + bnd_clss_cd;
			param += '&biz_clss_cd=' + biz_clss_cd;
			param += '&tabStr=' + objPfx;
			doAutoSearch(sheetObj, row, objPfx+'fr_frt_cd', 'freight', codeStr, objPfx+'fr_frt_cd', objPfx+'fr_frt_cd_nm', param);	
			//LHK 2013.08.10 #16896 레드마인 요구사항
			//A/P : Row Add 하고 Billing Code 선택 시, 해당 Billing Code 의 Group 이 "FC" 인 경우 (tb_frt_cd.frt_clss_cd = 'FC') Customer 는
			//OEM 의 경우 B/L 의 Billing Carrier(tb_bl_prnr.BL_TRDP_TP_CD = 'B01') 로, AEM 인 경우 AWB 의 Carrier (tb_bl_prnr.BL_TRDP_TP_CD = 'L01') 자동 선택
			// --> Customer 가 없는 경우 Set 함.
			if(objPfx == "b_" && sheetObj.GetCellValue(row, objPfx+'fr_ibflag') == "I"){
				var param=''; 
				param += '&s_code=' + codeStr;
				ajaxSendPost(getFrtCdInfoAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getFrtCdInfo' + param, './GateServlet.gsl');
				if(h_temp_frt_clss_cd == 'FC'){
					if(air_sea_clss_cd == "S" && bnd_clss_cd=="O" && biz_clss_cd =="M"){
						sheetObj.SetCellValue(row, objPfx+'fr_trdp_cd',frm1.carr_trdp_cd.value);
					}
					if(air_sea_clss_cd == "A" && bnd_clss_cd=="O" && biz_clss_cd =="M"){
						sheetObj.SetCellValue(row, objPfx+'fr_trdp_cd',frm1.lnr_trdp_cd.value);
					}
				}	
				h_temp_frt_clss_cd="";
			}
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: BL_FRT.1156");
			sheetObj.SelectCell(row, objPfx+'fr_frt_cd');
		}
	//Trade Partner Code
	}else if(colStr==objPfx+'fr_trdp_cd'){
		var codeStr=sheetObj.GetCellValue(row, objPfx+'fr_trdp_cd');
		if(codeStr.length>=2){
			//결과를 표시할 Col을 초기화함
			sheetObj.SetCellValue(row, objPfx+'fr_trdp_nm','');
			doAutoSearch(sheetObj, row, col, 'trdpcode', codeStr, objPfx+'fr_trdp_cd', objPfx+'fr_trdp_nm');	
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: BL_FRT.1171");
			sheetObj.SelectCell(row, colStr);
		}
	//Tariff Currency 조회
	}else if(colStr==objPfx+'fr_rat_curr_cd'){
		var codeStr=sheetObj.GetCellValue(row, objPfx+'fr_rat_curr_cd');
		if(codeStr.length>2){
			var tmpCurr=codeStr.toUpperCase();
			if(tmpCurr==sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd')){
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
			}else{
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
			}
			//결과를 표시할 Col을 초기화함
			doAutoSearch(sheetObj, row, col, 'currency', codeStr, objPfx+'fr_rat_curr_cd', objPfx+'fr_rat_curr_cd');	
			var param='';
			var tmp_dt='';
			if(bnd_clss_cd=='O'){
				tmp_dt=frm1.etd_dt_tm.value.replaceAll("-", "");
				tmp_dt=tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
			}else{
				tmp_dt=frm1.eta_dt_tm.value.replaceAll("-", "");
				tmp_dt=tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
			}
			param += '&cur_dt=' + tmp_dt;
			param += '&trf_cur_cd=' + sheetObj.GetCellValue(row, objPfx+'fr_rat_curr_cd');
			param += '&ofccurr_cd=' + sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd');
			ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrency' + param, './GateServlet.gsl');
			if(getXcrtRate==0){
				if(tmpCurr==sheetObj.GetCellValue(row, objPfx+'fr_rat_curr_cd')){
					sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
				}else{
					sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
				}
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt_dt','',0);
			}else{
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',getXcrtRate,0);
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt_dt',tmp_dt,0);
			}
			sheetObj.SetCellValue(row, objPfx+'fr_inv_curr_cd',codeStr,0);
			sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
			sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt_dt','',0);
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: BL_FRT.1218");
			sheetObj.SelectCell(row, colStr);
		}
	//Buying/Credit Invoice Currency
	}else if(colStr==objPfx+'fr_inv_curr_cd'){
		var codeStr=sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd');
		if(codeStr.length>2){
			var tmpCurr=codeStr.toUpperCase();
//			if(tmpCurr==sheetObj.CellValue(row, objPfx+'fr_rat_curr_cd')){
//				sheetObj.CellValue(row, objPfx+'fr_inv_xcrt') = 1;
//			}else{
//				sheetObj.CellValue(row, objPfx+'fr_inv_xcrt') = 0;	
//			}
			//결과를 표시할 Col을 초기화함
			doAutoSearch(sheetObj, row, col, 'currency', codeStr, objPfx+'fr_inv_curr_cd', objPfx+'fr_inv_curr_cd');	
			var param='';
			var tmp_dt='';
			if(bnd_clss_cd=='O'){
				tmp_dt=frm1.etd_dt_tm.value.replaceAll("-", "");
				tmp_dt=tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
			}else{
				tmp_dt=frm1.eta_dt_tm.value.replaceAll("-", "");
				tmp_dt=tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
			}
			param += '&cur_dt=' + tmp_dt;
			param += '&trf_cur_cd=' + sheetObj.GetCellValue(row, objPfx+'fr_rat_curr_cd');
			param += '&ofccurr_cd=' + sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd');
			ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrency' + param, './GateServlet.gsl');
			if(getXcrtRate==0){
				if(tmpCurr==sheetObj.GetCellValue(row, objPfx+'fr_rat_curr_cd')){
					sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
				}else{
					sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
				}
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt_dt','',0);
			}else{
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',getXcrtRate);//[20141212 OJG] Exhange Rate 변경으로 Event 발생
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt_dt',tmp_dt,0);
			}
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: BL_FRT.1266");
			sheetObj.SelectCell(row, colStr);
		}
	}else if(colStr==objPfx+"fr_frt_check"){
		/*
if(sheetObj.GetCellValue(row, objPfx+"fr_frt_check")==1){
			if(objPfx==''){
				if(sdCheckTrdp==''){
					sdCheckTrdp=row;
				}
if(sheetObj.GetCellValue(sdCheckTrdp, objPfx+"fr_sell_buy_tp_cd")!=sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd")){
					sheetObj.SetCellValue(row, objPfx+"fr_frt_check",0,0);
					//동일한 [Selling], [Buying] 경우에만 선택하수 있습니다!
					//alert(getLabel('COM_FRT_ALT007') + "\n\n: BL_FRT.1342");
				}
else if(sheetObj.GetCellValue(sdCheckTrdp, objPfx+"fr_trdp_cd")!=sheetObj.GetCellValue(row, objPfx+"fr_trdp_cd")){
					sheetObj.SetCellValue(row, objPfx+"fr_frt_check",0,0);
					//동일한 거래처인 경우에만 선택하수 있습니다!
					//alert(getLabel('COM_FRT_ALT008') + "\n\n: BL_FRT.1347");
				}
				else{
					sdCheckCnt++;
				}
			}else{
				if(bcCheckTrdp==''){
					bcCheckTrdp=row;
				}
if(sheetObj.GetCellValue(bcCheckTrdp, objPfx+"fr_sell_buy_tp_cd")!=sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd")){
					sheetObj.SetCellValue(row, objPfx+"fr_frt_check",0,0);
					//동일한 [Selling], [Buying] 경우에만 선택하수 있습니다!
					//alert(getLabel('COM_FRT_ALT007') + "\n\n: BL_FRT.1359");
				}
else if(sheetObj.GetCellValue(bcCheckTrdp, objPfx+"fr_trdp_cd")!=sheetObj.GetCellValue(row, objPfx+"fr_trdp_cd")){
					sheetObj.SetCellValue(row, objPfx+"fr_frt_check",0,0);
					//동일한 거래처인 경우에만 선택하수 있습니다!
					//alert(getLabel('COM_FRT_ALT008') + "\n\n: BL_FRT.1347");
				}
				else{
					bcCheckCnt++;					
				}
			}
		}else{
			if(objPfx==''){
				sdCheckCnt--;
				if(sdCheckCnt==0){
					sdCheckTrdp='';
				}
			}else{
				bcCheckCnt--;
				if(bcCheckCnt==0){
					bcCheckTrdp='';
				}
			}
		}
		*/
		//ADD Row 시에 customer, invoice currency 가 같은 경우만 check 해서 invoice 로 넘기기 위해 check box handling 로직 추가
		frFrtCheck(sheetObj, row, objPfx, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd);
	//Unit 선택시
	}else if(colStr==objPfx+"fr_aply_ut_cd"){
		if(air_sea_clss_cd=="S"){
			//Container인 경우 TP/SZ활성화
			if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='SCN'){
				sheetObj.SetCellEditable(row, objPfx+"fr_cntr_tpsz_cd",1);
				var curSheet=null;
				var cntrCnt=0;
				var cntrTpsz='';
				/*
				if(bnd_clss_cd=="O"){
					curSheet=docObjects[2];
				}else{
					if(biz_clss_cd=="M"){
						curSheet=docObjects[2];
					}else{
						curSheet=docObjects[1];
					}
				}
				*/
				curSheet=sheet3;
				/*
				for(var i=1 ; i<curSheet.LastRow() ; i++){
if(curSheet.GetCellValue(i, "cntr_no")!=""){
						cntrCnt++;
cntrTpsz=curSheet.GetCellValue(i, 'cntr_tpsz_cd');
					}
				}
				*/
				for(var i=1 ; i<curSheet.LastRow()+1 ; i++){	//+1
				    var qtyCnt=0;
				    for(var j=2 ; j<sheetObj.LastRow()+1 ; j++){	//+1
					   if( j != row 
							   //&& curSheet.CellValue(j, "cntr_no")!=""
							   && sheetObj.GetCellValue(j, objPfx+"fr_aply_ut_cd")=='SCN'
								   && sheetObj.GetCellValue(j, objPfx+"fr_cntr_tpsz_cd") == curSheet.GetCellValue(i, "cntr_tpsz_cd")
							   && sheetObj.GetCellText(j, objPfx+"fr_frt_cd") == sheetObj.GetCellText(row, objPfx+"fr_frt_cd")
							   && sheetObj.GetCellValue(j, objPfx+"fr_sell_buy_tp_cd") == sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd")){
						   qtyCnt=qtyCnt + parseInt(sheetObj.GetCellValue(j, objPfx+"fr_qty"));
					   }
					}
				    
				    
				    
				    if(curSheet.GetCellValue(i, "qty") - qtyCnt > 0){
				    	cntrTpsz=curSheet.GetCellValue(i, "cntr_tpsz_cd");
				    	cntrCnt=curSheet.GetCellValue(i, "qty")-qtyCnt;
						break;
					}
				}
				//sheetObj.CellValue(row,		objPfx+'fr_cntr_tpsz_cd') = cntrTpsz;
				//sheetObj.CellValue2(row,		objPfx+"fr_qty") = cntrCnt;
				if(cntrTpsz != ""){
					sheetObj.SetCellValue(row, objPfx+"fr_cntr_tpsz_cd",curSheet.GetCellValue(i, "cntr_tpsz_cd"),0);
					sheetObj.SetCellValue(row, objPfx+"fr_qty",cntrCnt);
				}else{
					sheetObj.SetCellValue(row,  objPfx+"fr_qty",'',0);
					sheetObj.SetCellValue(row,  objPfx+"fr_trf_cur_sum_amt",'',0);
				    sheetObj.SetCellValue(row, objPfx+"fr_cntr_tpsz_cd",'',0);
					//Selected \"Type/Size\" is already in use.\n\n\Please select other \"Type/Size\".
				    alert(getLabel('COM_FRT_ALT009'));
				}
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='CBM'){
				sheetObj.SetCellEditable(row,  objPfx+"fr_cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,	objPfx+"fr_cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.meas.value);
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='CFT'){
				sheetObj.SetCellEditable(row,  objPfx+"fr_cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,	objPfx+"fr_cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.meas1.value);
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='KGS'){
				sheetObj.SetCellEditable(row,  objPfx+"fr_cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,	objPfx+"fr_cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.grs_wgt.value);
				
			// #48771 - [IMPEX] UNIT M/T와 R/T 로직 추가
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='MET'){
				sheetObj.SetCellEditable(row,  objPfx+"fr_cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,	objPfx+"fr_cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row,		objPfx+"fr_qty", roundXL(frm1.grs_wgt.value.replaceAll(",","") / 1000, 3));
				
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='RET'){
				sheetObj.SetCellEditable(row,  objPfx+"fr_cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,	objPfx+"fr_cntr_tpsz_cd",' ',0);
				
				var grs_wgt = roundXL(frm1.grs_wgt.value.replaceAll(",","") / 1000, 3);
				var meas = Number(frm1.meas.value.replaceAll(",",""));
				
				if(grs_wgt > meas){
					sheetObj.SetCellValue(row,objPfx+"fr_qty",grs_wgt);
				} else {
					sheetObj.SetCellValue(row,objPfx+"fr_qty",meas);
				}
				
			}else{
				sheetObj.SetCellEditable(row, objPfx+"fr_cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,		objPfx+"fr_cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row,		objPfx+"fr_qty",'1');
				//Bug #23228  B/L Entry - Freight Tab 각 Billing Item 입력 시 Unit 선택에 따른 계산로직 오류
//				sheetObj.CellValue2(row,		objPfx+"fr_trf_cur_sum_amt") = '';
			}
		}else{
			//-----[20130208 OJG] 아래 부분에 Air Export -> Booking & House AWB Entry 메뉴의 Freight 탭 화면에서 ------
			// Account Receivable Debit/Credit Account Payable해당 내용을 세팅   
			if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='ACW'){
				if(air_sea_clss_cd=="A" && bnd_clss_cd=="O" && biz_clss_cd=="H" && objPfx==""){
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.agent_chg_wgt.value);
				}else{
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.chg_wgt.value);
				}
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='AGW'){
				if(air_sea_clss_cd=="A" && bnd_clss_cd=="O" && biz_clss_cd=="H" && objPfx==""){
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.agent_grs_wgt.value);
				}else{
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.grs_wgt.value);
				}
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='ACL'){
				if(air_sea_clss_cd=="A" && bnd_clss_cd=="O" && biz_clss_cd=="H" && objPfx==""){
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.agent_chg_wgt1.value);
				}else{
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.chg_wgt1.value);
				}
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='AGL'){
				if(air_sea_clss_cd=="A" && bnd_clss_cd=="O" && biz_clss_cd=="H" && objPfx==""){
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.agent_grs_wgt1.value);
				}else{
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.grs_wgt1.value);
				}
			}else{
				sheetObj.SetCellValue(row,		objPfx+"fr_qty",'1');
				//sheetObj.CellValue2(row,		objPfx+"fr_trf_cur_sum_amt") = '';
			}
			//-----[20130208 OJG] -------------------------
		}
	//Unit이 Container인 경우 TP/SZ선택시 해당 수량을 넣어줌
	}else if(colStr==objPfx+"fr_cntr_tpsz_cd"){
		if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='SCN'){
			var curFrtCd=sheetObj.GetCellText(row, objPfx+"fr_frt_cd");	//Freight Code
			var curGetCellText=trim(sheetObj.GetCellText(row, objPfx+"fr_cntr_tpsz_cd"));
			var curCellbuyTpCd=sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd");
			if(curGetCellText==''){
				sheetObj.SetCellValue(row, objPfx+"fr_qty",'',0);
				sheetObj.SetCellValue(row, objPfx+"fr_trf_cur_sum_amt",'');
			}else{
				var minNum=0;
				if(curGetCellText.length>1){
					for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
						if(i!=row){
							//동일한 Freight Code에 동일한  Container Size가 사용되었는지 확인함
							if(sheetObj.GetCellValue(i, objPfx+"fr_aply_ut_cd")=='SCN'
								&& curFrtCd==sheetObj.GetCellText(i, objPfx+"fr_frt_cd")
									&&curGetCellText==sheetObj.GetCellText(i, objPfx+"fr_cntr_tpsz_cd")
									&&curCellbuyTpCd==sheetObj.GetCellValue(i, objPfx+"fr_sell_buy_tp_cd")){//dc_ 비교를 위해서 조건 추가, AR/AP 는 sell buy type 이 항상 같기때문에 상관없슴.
								minNum=minNum+parseInt(sheetObj.GetCellValue(i, objPfx+"fr_qty"));
							}
						}
					}
				}

				//이미 선택되었는지 확인한다.
				var curNum='';
				var cntrSheet=sheet3;//getCrtrSheet();
				for(var i=1; i < cntrSheet.LastRow() + 1; i++){
					if(curGetCellText==cntrSheet.GetCellValue(i, "cntr_tpsz_cd")){
						curNum=cntrSheet.GetCellValue(i, "qty");
						break;
					}
				}
				var cntrQty=parseInt(curNum)-minNum;
				if(cntrQty>0){
					sheetObj.SetCellValue(row, objPfx+"fr_qty",cntrQty);
				}
				else{
					sheetObj.SetCellValue(row, objPfx+"fr_qty",'',0);
					sheetObj.SetCellValue(row, objPfx+"fr_trf_cur_sum_amt",'',0);
				    sheetObj.SetCellValue(row, objPfx+"fr_cntr_tpsz_cd",'',0);
					//Selected \"Type/Size\" is already in use.\n\n\Please select other \"Type/Size\".
				    alert(getLabel('COM_FRT_ALT009'));
				}
			}
		}		
	//P/C
	}else if(colStr==objPfx+"fr_frt_term_cd"){
		//Default Prepaid
//		var trdpCd = frm1.hid_shp_cd.value;
//		var trdpNm = frm1.hid_shp_nm.value;
//		
//		//Collected
//		if(sheetObj.CellValue(row, objPfx+"fr_frt_term_cd")=='CC'){
//			trdpCd = frm1.cnee_trdp_cd.value;
//			trdpNm = frm1.cnee_trdp_nm.value;
//		}
//	    sheetObj.CellValue(row, objPfx+"fr_trdp_cd") = trdpCd;
//	    sheetObj.CellValue(row, objPfx+"fr_trdp_nm") = trdpNm;
	//Tariff Currency
	}
	/*
	else if(colStr==objPfx+"fr_rat_curr_cd"){
		//Tariff Currency를 기준으로 생성된 값들을 초기화 한다.
		resetCurCd(sheetObj, row, objPfx);
	//Rate 입력시 Vat 계산
	}
	*/
	else if(colStr==objPfx+"fr_qty"||colStr==objPfx+"fr_ru"||colStr==objPfx+"fr_vat_rt"||colStr==objPfx+"fr_agent_ru"){		
		var valCnt=sheetObj.GetCellValue(row, objPfx+"fr_qty"); // .replaceAll(",","");
		//수량인경우
		if(colStr==objPfx+"fr_qty"){	
			var qty=sheetObj.GetCellValue(row, objPfx+"fr_qty");
			var ruStr=sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd");
			if(isNaN(qty)){
				//Please input Number!
				alert(getLabel('FMS_COM_ALT005') + "\n\n: BL_FRT.1519");
				sheetObj.SetCellValue(row, objPfx+"fr_qty",'',0);
				return;
			}
			var totLen=qty.length;
			var dotIdx=(qty+"").indexOf('.');	// qty.indexOf('.');
			// 2011.08.19 김진혁 추가, RET 도 소수 3째 자리까지 입력할 수 있어야 함.
			//if(ruStr=='CBM'||ruStr=='KGS'||ruStr=='AKG'||ruStr=='ACW'||ruStr=='AGW'||ruStr=='AMT'||ruStr=='RET'){	//[20130401 OJG]
			if(ruStr=='CBM'||ruStr=='KGS'||ruStr=='AKG'||ruStr=='ACW'||ruStr=='AGW'||ruStr=='AMT'||ruStr=='RET' || ruStr=='HRS' || ruStr=='DAY' || ruStr=='UNT'){	//[20130401 OJG]
				if(dotIdx>0){
					totLen=totLen-(dotIdx+1);
					if(totLen==0){
						sheetObj.SetCellValue(row, objPfx+"fr_qty",qty.substring(0, dotIdx),0);
					}else if(totLen>2){
						dotIdx=dotIdx+4;
						sheetObj.SetCellValue(row, objPfx+"fr_qty",qty.substring(0, dotIdx),0);
					}
				}
			}else{
				if(dotIdx>0){
					sheetObj.SetCellValue(row, objPfx+"fr_qty",qty.substring(0, dotIdx),0);
				}
				if(ruStr=='SCN'){
					var curGetCellText=trim(sheetObj.GetCellText(row, objPfx+"fr_cntr_tpsz_cd"));
					var curFrtCd=sheetObj.GetCellText(row, objPfx+"fr_frt_cd");	//Freight Code
					var curCellbuyTpCd=sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd");
					if(curGetCellText==''){
						sheetObj.SetCellValue(row, objPfx+"fr_qty",0,0);
					}else{
						var minNum=0;
						for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
							//동일한 Freight Code에 동일한  Container Size가 사용되었는지 확인함
							if(sheetObj.GetCellValue(i, objPfx+"fr_aply_ut_cd")=='SCN'
								&& curFrtCd==sheetObj.GetCellText(i, objPfx+"fr_frt_cd")
								&& curGetCellText==sheetObj.GetCellText(i, objPfx+"fr_cntr_tpsz_cd")
								&&curCellbuyTpCd==sheetObj.GetCellValue(i, objPfx+"fr_sell_buy_tp_cd")){//dc_ 비교를 위해서 조건 추가, AR/AP 는 sell buy type 이 항상 같기때문에 상관없슴.
								minNum=minNum+parseInt(sheetObj.GetCellValue(i, objPfx+"fr_qty"));
							}
						}
						//이미 선택되었는지 확인한다.
						var curNum='';
						var cntrSheet=sheet3;//getCrtrSheet();
						for(var i=1; i < cntrSheet.LastRow() + 1; i++){
							if(curGetCellText==cntrSheet.GetCellValue(i, "qty")){
								curNum=cntrSheet.GetCellValue(i, "cntr_tpsz_cd");
								break;
							}
						}
						if(parseInt(curNum)<minNum){
							//Please check the Container qty!
							alert(getLabel('COM_FRT_ALT010') + "\n\n: BL_FRT.1568");
							sheetObj.SetCellValue(row, objPfx+"fr_qty",0);
							sheetObj.SelectCell(row, objPfx+"fr_qty");
							return;
						}
					}
				}
			}
		}	
		if(valCnt==''){
			valCnt=1;
		}
		//[20140730 OJG] - replaceAll 제거 : var tmpSum=getMultiplyFloat(valCnt, sheetObj.GetCellValue(row, objPfx+"fr_ru").replaceAll(",",""));
		var tmpSum=getMultiplyFloat(valCnt, sheetObj.GetCellValue(row, objPfx+"fr_ru"));
		if(sheetObj.GetCellValue(row, objPfx+"fr_vat_rt")>0){
			//단가별 Vat금액 = (세금비율*0.01)*단가 
			//[20150126 OJG] - VAT Cal 버튼 클릭시 Operation 별 VAT Freight 에 해당되는 Freight Row를 추가하는 방식으로 변경 - 아래 로직 제거
			/*
			var tmpRt=sheetObj.GetCellValue(row, objPfx+"fr_vat_rt")*0.01;
			tmpSum=getMultiplyFloat(tmpSum, tmpRt);
			sheetObj.SetCellValue(row, objPfx+"fr_vat_amt",tmpSum);
			*/
			
		}else{
			sheetObj.SetCellValue(row, objPfx+"fr_vat_amt",0);
		}
		//2010.12.20 김진혁 추가, Freight에 vol * rate 컬럼추가, 값 입력시 자동 계산로직 추가
		//[20140730 OJG] - replaceAll 제거 : sheetObj.SetCellValue(row, objPfx+"fr_trf_cur_sum_amt",sheetObj.GetCellValue(row, objPfx+"fr_qty").replaceAll(",","") * sheetObj.GetCellValue(row, objPfx+"fr_ru").replaceAll(",",""));
//		sheetObj.SetCellValue(row, objPfx+"fr_trf_cur_sum_amt",sheetObj.GetCellValue(row, objPfx+"fr_qty") * sheetObj.GetCellValue(row, objPfx+"fr_ru"));
		//[20141205 OJG] - Multi Currency
		if(MULTI_CURR_FLAG == "Y" && sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd") == "C" ){		//Credit
			sheetObj.SetCellValue(row, objPfx+"fr_trf_cur_sum_amt",sheetObj.GetCellValue(row, objPfx+"fr_qty") * sheetObj.GetCellValue(row, objPfx+"fr_agent_ru"),0);
		}else{
			sheetObj.SetCellValue(row, objPfx+"fr_trf_cur_sum_amt",sheetObj.GetCellValue(row, objPfx+"fr_qty") * sheetObj.GetCellValue(row, objPfx+"fr_ru"));
		}
		//Invoice Amt를계산함
		calcInvAmt(sheetObj, row, objPfx);
		//Performance Amt를 계산함
		calcPefrAmt(sheetObj, row, objPfx);
	//Invoice Currency
	}
	/*
	else if(colStr==objPfx+"fr_inv_curr_cd"){
		sheetObj.SetCellValue(row, objPfx+"fr_inv_xcrt",0);
		sheetObj.SetCellValue(row, objPfx+"fr_inv_amt",0);
		sheetObj.SetCellValue(row, objPfx+"fr_inv_vat_amt",0);
if(sheetObj.GetCellValue(row,  objPfx+"fr_inv_curr_cd")==sheetObj.GetCellValue(row, objPfx+"rat_curr_cd")){
			sheetObj.SetCellValue(row, objPfx+"fr_inv_xcrt",1);
		}
	}
	*/
	else if(colStr==objPfx+"fr_inv_xcrt"||colStr==objPfx+"fr_perf_xcrt"){
		//Invoice Amt를계산함
		calcInvAmt(sheetObj, row, objPfx);
		//Performance Amt를 계산함
		calcPefrAmt(sheetObj, row, objPfx);
	//inv_amt 및 inv_vat_amt 직접 수정시
	}else if(colStr==objPfx+"fr_inv_amt"||colStr==objPfx+"fr_inv_vat_amt"){
		var invCur=sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd');
		if(invCur=="KRW" || invCur=="JPY"){
			sheetObj.SetCellValue(row, objPfx+"fr_inv_amt",parseFloat(sheetObj.GetCellValue(row, objPfx+"fr_inv_amt")).toFixed(0),0);
			sheetObj.SetCellValue(row, objPfx+"fr_inv_vat_amt",parseFloat(sheetObj.GetCellValue(row, objPfx+"fr_inv_vat_amt")).toFixed(0),0);
		}else{
			sheetObj.SetCellValue(row, objPfx+"fr_inv_amt",parseFloat(sheetObj.GetCellValue(row, objPfx+"fr_inv_amt")).toFixed(2),0);
			sheetObj.SetCellValue(row, objPfx+"fr_inv_vat_amt",parseFloat(sheetObj.GetCellValue(row, objPfx+"fr_inv_vat_amt")).toFixed(2),0);
		}
		var invAmt=sheetObj.GetCellValue(row, objPfx+"fr_inv_amt");
		var valAmt=sheetObj.GetCellValue(row, objPfx+"fr_inv_vat_amt");
		sheetObj.SetCellValue(row, objPfx+"fr_inv_sum_amt",getSumFloat(invAmt, valAmt));
	}else if(colStr==objPfx+"fr_inv_sum_amt"){
		var invCur=sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd');
		if(invCur=="KRW" || invCur=="JPY"){
			sheetObj.SetCellValue(row, objPfx+"fr_inv_sum_amt",parseFloat(sheetObj.GetCellValue(row, objPfx+"fr_inv_sum_amt")).toFixed(0),0);
		}else{
			sheetObj.SetCellValue(row, objPfx+"fr_inv_sum_amt",parseFloat(sheetObj.GetCellValue(row, objPfx+"fr_inv_sum_amt")).toFixed(2),0);
		}
	}
	//값이 변경 될 경우 Total Amount 를 확인 한 후 0 인 경우 warning 을 보여준다. 
	if(objPfx == 'dc_'){
		//Revenue 일 경우 
		if(sheetObj.GetCellValue(row, objPfx+'fr_sell_buy_tp_cd') == "D"){
			//fr_inv_sum_amt 가 0 일 경우 warning
			warningTotalAmount(sheetObj, row, objPfx+'fr_inv_sum_amt', sheetObj.GetCellValue(row, objPfx+'fr_inv_sum_amt'));
			sheetObj.SetCellBackColor(row, objPfx+'fr_agent_amt',sheetObj.GetDataBackColor());
		}	
		//Cost 일 경우 
		if(sheetObj.GetCellValue(row, objPfx+'fr_sell_buy_tp_cd') == "C"){
			//fr_inv_sum_amt 가 0 일 경우 warning
			warningTotalAmount(sheetObj, row, objPfx+'fr_agent_amt', sheetObj.GetCellValue(row, objPfx+'fr_agent_amt'));
			sheetObj.SetCellBackColor(row, objPfx+'fr_inv_sum_amt',sheetObj.GetDataBackColor());
		}
	}else{
		warningTotalAmount(sheetObj, row, objPfx+'fr_inv_sum_amt', sheetObj.GetCellValue(row, objPfx+'fr_inv_sum_amt'));
	}
}