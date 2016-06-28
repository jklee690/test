function loadPage() {
	
}

function doWork(srcName, curObj) {

	switch (srcName) {

	case "PRINT":
		// /////////////////////////////////////////////////////////
		// 프린트
		var formObj = document.frm1;

		formObj.file_name.value = 'TSA_Security.mrd';
		formObj.title.value = 'TSA Security';
		
		if (formObj.display_option[0].checked) {
			formObj.file_name.value = 'TSA_Security.mrd';
			formObj.title.value = 'TSA Security';
		} else {
			formObj.file_name.value = 'TSA_Unknown.mrd';
			formObj.title.value = 'TSA Unknown';
		}
			
		var itemQty = formObj.item_qty.value;
		if(itemQty == ''){
			itemQty = 0;
		}
		
		
		// Parameter Setting
		var param = '';
		param += '[' + formObj.intg_bl_seq.value + ']'; // $1
		param += '[' + formObj.issued_by.value.toUpperCase() + ']'; // $2
		param += '[' + itemQty + ']'; // $3
		
		formObj.rd_param.value = param;
		popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		
		break;

	case "CLOSE":
    	window.close();
	break;	

	}
}