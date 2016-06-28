
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0120.js
*@FileTitle  : Shipping Advice Print
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/11
=========================================================*/
function doWork(srcName){
	var formObj=document.form;
    switch(srcName) {
		case 'Print':
			for(var i=0 ; i < formObj.f_to_radio.length ; i++){
				if(formObj.f_to_radio[i].checked == true){
					formObj.f_to_type.value=formObj.f_to_radio[i].value;
					break;
				}
			}
			if(formObj.f_air_sea_tp.value == "S"){
				formObj.file_name.value='shipping_advice_oe_hbl_01.mrd';
			}else{
				formObj.file_name.value='shipping_advice_ae_hawb_01.mrd';
			}
			formObj.title.value='Shipping Advice';
			//Parameter Setting
			var param='[' + formObj.f_intg_bl_seq.value + ']';
			param += '[' + formObj.f_ofc_locl_nm.value + ']';
			param += '[' + usrNm + ']';
			param += '[' + formObj.f_rmk.value + ']';
			param += '[' + formObj.f_to_type.value + ']';
			param += '[' + formObj.f_ref_ofc_cd.value + ']';
			param += '[]';
			param += '[]';
			param += '[' + usrPhn + ']';
			param += '[' + usrFax + ']';
			param += '[]';
			if(formObj.f_air_sea_tp.value == "A"){
				//항공 shipping advice 출력할 때, shipper를 선택한 경우만 e-mail list를 유지한다.
				if(formObj.f_to_radio[1].checked){
					//
				}else{
					formObj.mailTo.value="";
				}
			}
			formObj.rd_param.value=param;
			if (formObj.f_air_sea_tp.value == "S") {
				formObj.rpt_biz_tp.value="OEH";
			} else if (formObj.f_air_sea_tp.value == "A") {
				formObj.rpt_biz_tp.value="AEH";
			}
			formObj.rpt_biz_sub_tp.value="SA";
			formObj.rpt_tp.value=(formObj.f_to_type.value == "agt" ? "P": formObj.f_to_type.value.substring(0, 1).toUpperCase());
			
			//#50593
			if(formObj.f_air_sea_tp.value == "S" && user_ofc_cnt_cd == "DE"){
				var ttlFileName = formObj.file_name.value;
				ttlFileName += "^@@^" + 'shipping_advice_oe_hbl_de_01.mrd';
				var ttlParam = formObj.rd_param.value;
				ttlParam += "^@@^" + '[' + formObj.f_intg_bl_seq.value + ']';;
				
				formObj.file_name.value = ttlFileName;
				formObj.rd_param.value = ttlParam;
			}else if(formObj.f_air_sea_tp.value == "A" && user_ofc_cnt_cd == "DE"){
				var ttlFileName = formObj.file_name.value;
				ttlFileName += "^@@^" + 'shipping_advice_ae_hawb_de_01.mrd';
				var ttlParam = formObj.rd_param.value;
				ttlParam += "^@@^" + '[' + formObj.f_intg_bl_seq.value + ']';
				
				formObj.file_name.value = ttlFileName;
				formObj.rd_param.value = ttlParam;
			}
			
			
			popPOST(form, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		break;
		case "CLOSE":
			window.close(); 
    	break;
    }
}
function loadPage(){
	if(user_ofc_cnt_cd=="JP"){
		document.getElementsByName("f_to_radio")[1].checked=true;
	}
}
