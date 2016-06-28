function loadPage() {
	window.close();
	getPdfFile();
}

function getPdfFile() {
	var formObj=document.frm1;
	var fileNmArr  = formObj.fileName.value.split("^@@^");
	var rdParamArr = formObj.rdParam.value.split("^@@^");

	if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA"){
		
		if(RD_path.indexOf("/letter/") == -1) {  
			RD_path += "letter/";
		}
	}
	
	var v_rwait = '';
	
	if (fileNmArr.length > 1){
		v_rwait = '/rwait';
	}
	
	var rdParamVal = "";
	var filePathStr = "";
	for(var i = 0 ; i < fileNmArr.length ; i ++){
		if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA" || user_ofc_cnt_cd=="DE"){
			if(     fileNmArr[i] == "pfm_profit_month_multi.mrd" ){
				rdParamVal = RDServer+'/ruseurlmoniker [0] ' + v_rwait + ' /rp '+rdParamArr[i] + " /riprnmargin";

			} else {
				// 기존방식 유지
				if(fileNmArr[i].value=="air_label_01.mrd" || formObj.fileName.value == "air_mbl_label_01.mrd" || fileNmArr[i].value=="package_label.mrd"){
					rdParamVal = RDServer+ v_rwait + ' /rp '+rdParamArr[i];
					
				}else{
					rdParamVal = RDServer+v_rwait + ' /rp '+rdParamArr[i] + " /riprnmargin";
				}
			}
		}else{
			rdParamVal = RDServer+v_rwait + ' /rp '+rdParamArr[i];
		}
	}
	frm2.filePath.value = RD_path+fileNmArr[0];
	frm2.fileNm.value = rdParamVal;
	frm2.target = 'pdfDn';
	frm2.submit();	
}