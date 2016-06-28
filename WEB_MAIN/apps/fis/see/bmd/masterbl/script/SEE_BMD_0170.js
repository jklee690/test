var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName){
	var formObj=document.frm1;
    switch(srcName) {
		case 'Print':
			formObj.s_mbl_no.value=trim(formObj.s_mbl_no.value);
			formObj.s_ref_no.value=trim(formObj.s_ref_no.value);
			if(formObj.s_mbl_no.value == "" && formObj.s_ref_no.value == ""){
				//[MBL No. / REF No.] is mandatory field.
				alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEE_BMD_0170.8");
				formObj.s_mbl_no.focus();
				return;
			}
			formObj.title.value="Shipping Instruction Report";			
			formObj.file_name.value="shipping_instruction_oe_mbl_01.mrd";
			var radio_ship_to=document.getElementsByName("s_ship_to");
			var s_ship_to="";
//			var s_bl_issue = formObj.s_bl_issue.value.toUpperCase();
			var s_bl_issue="";
			for(var i=0; i<radio_ship_to.length; i++){
			   if(radio_ship_to[i].checked==true)
			   {
				   s_ship_to=radio_ship_to[i].value;
			   }
			}
			//Parameter Setting
			var param='[' + formObj.s_mbl_no.value + ']';	//$1
			param += '[' + s_ship_to + ']';			//$2
			param += '[' + formObj.ntc_trdp_full_nm.value + ']';			//$3
			param += '[' + ofcCd + ']';								//$4
			param += '[' + userNm + ']';							//$5			
			param += '[' + s_bl_issue  + ']';			//$6
			param += '[' + formObj.title.value + ']';
			param += '[' + formObj.s_ref_no.value + ']';	//$8
			param += '[' + formObj.s_rmk.value + ']';	//$p9
			param += '[' + userTel  + ']';	    //$10	usr tel
			param += '[' + userFax  + ']';	    //$11	usr fax
			param += '[' + formObj.ntc_trdp_cd.value + ']';			//$12 ntc_trdp_cd
			param += '[' + userEml + ']';		//$13	usr eml
			formObj.rd_param.value=param;
			formObj.mailTitle.value='Shipping Instruction [Ocean Export Master BL No : ' + frm1.s_mbl_no.value + ']';;
			formObj.mailTo.value=mailTo;
			formObj.rpt_biz_tp.value="OEM";
			formObj.rpt_biz_sub_tp.value="SI";
			formObj.rpt_tp.value=s_ship_to;    // [Other Company]가 아닐경우 사용됨
			formObj.rpt_trdp_cd.value=formObj.ntc_trdp_cd.value;    //[Other Company]일 경우 사용됨
			popPOST(formObj, "RPT_RD_0010.clt", "popTest", 1025, 740);
			break;
		case "CLOSE":
			ComClosePopup();
	    	break;
    }
}
/*pop up open*/
function doPop(srcName){
    var formObj=document.frm1;
    switch(srcName) {
		case "MBL_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
			    rtnary=new Array(1);
				rtnary[0]="S"; //S=해운에서 오픈, A=항공에서 오픈
				rtnary[1]="O"; //I: In-bound, O: Out-bound
				
				callBackFunc = "MBL_POPLIST";
		        modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
		           
		    	
		break;			
		case "REF_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0]="S";
				rtnary[1]="O";
				
				callBackFunc = "REF_POPLIST";
		        modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
		    	
		break;
		case "PARTNER_POPLIST":
			if(formObj.s_ship_to5.checked == true){
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]=formObj.ntc_trdp_full_nm.value;
		   		rtnary[2]=window;
		   		callBackFunc = "PARTNER_POPLIST";
		        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	        
			}else{
			}
         break; 
    }
} 
function MBL_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
    	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.intg_bl_seq.value=rtnValAry[1];//intg_bl_seq
		formObj.s_mbl_no.value=rtnValAry[0];//s_mbl_no
		formObj.s_ref_no.value="";
		if(formObj.s_mbl_no.value != ""){
			doWork('SEARCH');	
		}
	}
}
function REF_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.intg_bl_seq.value=rtnValAry[1];//intg_bl_seq
		formObj.s_mbl_no.value="";
		formObj.s_ref_no.value=rtnValAry[2];
		if(formObj.s_ref_no.value != ""){
			doWork('SEARCH');	
		}
	}
}
function PARTNER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.ntc_trdp_cd.value=rtnValAry[0];//trdp_cd
		formObj.ntc_trdp_full_nm.value=rtnValAry[2];//eng_nm
	}
}
function fRadio(value) {
	var formObj=document.frm1;
	if(value == "O"){
		formObj.ntc_trdp_cd.className='search_form';
		formObj.ntc_trdp_cd.readOnly=false;
		formObj.ntc_trdp_full_nm.className='search_form';
		formObj.ntc_trdp_full_nm.readOnly=false;//eng_nm
	}else{
		formObj.ntc_trdp_cd.value="";//trdp_cd
		formObj.ntc_trdp_full_nm.value="";//eng_nm
		formObj.ntc_trdp_cd.className='search_form-disable';
		formObj.ntc_trdp_cd.readOnly=true;
		formObj.ntc_trdp_full_nm.className='search_form-disable';
		formObj.ntc_trdp_full_nm.readOnly=true;
	}
}
var mailTo="";
function getMailTo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			mailTo="";
		}else{
			mailTo=doc[1];
		}
	}
}
