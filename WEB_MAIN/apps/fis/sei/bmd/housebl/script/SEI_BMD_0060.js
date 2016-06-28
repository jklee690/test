/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEI_BMD_0060.jsp
*@FileTitle  : House B/L Search 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/10
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var USE_CFS_FIELDS = "N";
var USE_FAX_MAIL = "N";

function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDtEndPlus(document.frm1.eta_strdt, 180, document.frm1.eta_enddt, 60);
}
function doWork(srcName, valObj){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
    var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	var sheetObj3 = docObjects[2];
	var sheetObj4 = docObjects[3];
	formObj.f_cn_cp.value = "";
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
    	   		sheetObj2.RemoveAll();
    	   		sheetObj3.RemoveAll();
    	   		sheetObj4.RemoveAll();
    	   		if(!formValidation()) return;
			    if(validateForm(sheetObj1, formObj, SEARCHLIST, 1)){
			   		formObj.f_cmd.value=SEARCHLIST01;
			   		sheetObj1.DoSearch("./SEI_BMD_0060GS.clt", FormQueryString(formObj) );
			    }
			    break;
           	case "NEW":
           		parent.mkNewFrame('House B/L Entry', './SEI_BMD_0020.clt');
           		break;
           	case "HBLCLS":
           		var ckRow=sheetObj1.FindCheckedRow('cls_check');
           		if(ckRow==''){
           			//Please checked the [Sel.] column!
           			alert(getLabel('FMS_COM_ALT004'));
           		}
           		else{
           			//'Do you want to close HBL?')){
           			if(confirm(getLabel('FMS_COM_CFMCLS'))){
           				frm1.f_cmd.value=COMMAND01;
    			    	sheetObj1.DoSave("./SEI_BMD_0060GS.clt", FormQueryString(formObj), "ibflag", false);
           			}
           		}
           		break;
           	case "HBLUNCNF":
           		var ckRow=sheetObj1.FindCheckedRow('cls_check');
           		if(ckRow==''){
           			//'Please checked the [Sel.] column!');
           			alert(getLabel('FMS_COM_ALT004'));
           		}
           		else{
           			if(confirm(getLabel('FMS_COM_CFMCAN'))){
           				frm1.f_cmd.value=COMMAND02;
    			    	sheetObj1.DoSave("./SEI_BMD_0060GS.clt", FormQueryString(formObj), "ibflag", false);
           			}
           		}
           		break;
           	case "POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(3);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}
		   		else{
		   			rtnary[2]="";
		   		}
		   		callBackFunc = "POL_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,500,"yes");
		   		
    	        break;
           	case "POR_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(3);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}
		   		else{
		   			rtnary[2]="";
		   		}
		   		callBackFunc = "POR_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,500,"yes");
		   		
    	        break;
           	case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(3);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		//2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}
		   		else{
		   			rtnary[2]="";
		   		}
		   		callBackFunc = "POD_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
    	         
    	        break;
           	case "DEL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(3);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}
		   		else{
		   			rtnary[2]="";
		   		}
		   		callBackFunc = "DEL_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
    	         
    	        break;
           	case "DEST_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(3);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}
		   		else{
		   			rtnary[2]="";
		   		}
		   		callBackFunc = "DEST_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
    	         
    	        break;
           	case "PRNR_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "PRNR_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	                     
	   	        break;
           	case "SHIP_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
	   	 		rtnary[0]="1";
	   	 		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "SHIP_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		   		
	   	 		break;
           	case "CNEE_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
	   	 		rtnary[0]="1";
	   	 		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "CNEE_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 		             
	   	 		break;
           	case "ASHIP_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
	   	 		rtnary[0]="1";
	   	 		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "ASHIP_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 		             
	   	 		break;
           	case "NTFY_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   	 	rtnary=new Array(1);
		   	 	rtnary[0]="1";
		   	 	// 2011.12.27 value parameter
		   	 	if(typeof(valObj)!='undefined'){
		   	 		rtnary[1]=valObj;
		   	 	}
		   	 	else{
		   	 		rtnary[1]="";
		   	 	}
		   	 	rtnary[2]=window;
		   	 	callBackFunc = "NTFY_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		   	 	            
		   	 	break;
           	case "CFS_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   	 	rtnary=new Array(1);
		   	 	rtnary[0]="1";
		   	 	// 2011.12.27 value parameter
		   	 	if(typeof(valObj)!='undefined'){
		   	 		rtnary[1]=valObj;
		   	 	}
		   	 	else{
		   	 		rtnary[1]="";
		   	 	}
		   	 	rtnary[2]=window;
		   	 	callBackFunc = "CFS_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt?iata_cd=Y', rtnary, 1150,650,"yes");
		   		
		   	 	             
		   	 	break;
//	   	 	case "Print":
////	   	 		var param = "bkg_no=" + formObj.f_bkg_no.value;
//	   	 		var param = "&hbl_no=" + formObj.f_hbl_no.value;
//	   	 		param += "&hbl_tp_cd=" + formObj.f_hbl_tp_cd.value;
//	   	 		param += "&ofc_cd=" + formObj.f_ofc_cd.value;
////	   	 		param += "&lnr_bkg_no=" + formObj.f_lnr_bkg_no.value;
////	   	 		param += "&sr_no=" + formObj.f_sr_no.value;
//	   	 		param += "&mbl_no=" + formObj.f_mbl_no.value;
//	   	 		param += "&obrd_dt_strdt=" + formObj.eta_strdt.value;
//	   	 		param += "&obrd_dt_enddt=" + formObj.eta_enddt.value;
//	   	 		param += "&pol_cd=" + formObj.f_pol_cd.value;
//	   	 		param += "&pod_cd=" + formObj.f_pod_cd.value;
//	   	 		
//	   	 		param += "&cmd_type=2";
//	   	 		param += "&title=H B/L List";
//	   	 		
//	   	 		window.showModalDialog('RPT_PRN_0010.clt?'+param, [],'dialogWidth:1025px; dialogHeight:740px');
//	   	 	break;
	   	 	case "ArrivalNotice":
				if(sheetObj1.RowCount()== 0){
					//There is no data
					alert(getLabel('FMS_COM_ALT004'));
				}
				else{
					var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var custRefNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_ref_no");
					var reqParam='?intg_bl_seq=' + intgBlSeq;
					reqParam += '&hbl_no=' + hblNo;
					//reqParam += '&cust_ref_no=' + custRefNo;
					reqParam += '&air_sea_tp=' + "S";
					reqParam += '&cgor_pic_info=' + oi_cgor_pic_info;
					reqParam += '&mailTitle=' + 'ARRIVAL NOTICE / INVOICE [HBL No : ' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no") + ']';
	         		reqParam += '&mailTo=' + mailTo;
					popGET('RPT_PRN_0140.clt'+reqParam, '', 480, 290, "scroll:yes;status:no;help:no;");
				}
				break;
	   	 	case "PreliminaryClaim":
				if(sheetObj1.RowCount()== 0){
					//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
				}
				else{
					var sRow=sheetObj1.GetSelectRow();
					var reqParam='?air_sea_tp=' + 'S';
					reqParam += '&intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
					reqParam += '&hbl_no=' + encodeURIComponent(sheetObj1.GetCellValue(sRow, "bl_no"));
					reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
					reqParam += '&cgor_pic_info=' + oi_cgor_pic_info;
					popGET('RPT_PRN_0230.clt'+reqParam, '', 620, 565, "scroll:yes;status:no;help:no;");
				}
				break;		
	   	 	case "CCN":
	   	 		if(sheetObj1.RowCount()== 0){
	   	 			//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 		}
	   	 		else{
		   	 		printHouseCcn();
	   	 		}
	   	 		break;
	   	 	case "DELIVERY_ORDER":
				if(sheetObj1.RowCount()== 0){
					//There is no data
					alert(getLabel('FMS_COM_ALT004'));
				}else{
					var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var custRefNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_ref_no");
					var liner_trdp_nm=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "act_trdp_nm");
					var trk_trdp_cd=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "trk_trdp_cd");
					var trk_trdp_nm=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "trk_trdp_nm");
					var cne_trdp_cd=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cne_trdp_cd");
					var reqParam='?intg_bl_seq=' + intgBlSeq;
					reqParam += '&f_bl_no=' + hblNo;
					reqParam += '&cust_ref_no=' + encodeURIComponent(custRefNo);
					reqParam += '&liner_trdp_nm=' + encodeURIComponent(liner_trdp_nm);
					reqParam += '&air_sea_clss_cd=S';
					reqParam += '&biz_clss_cd=H';
					reqParam += '&bnd_clss_cd=I';
					reqParam += '&trsp_trdp_cd='+encodeURIComponent(trk_trdp_cd) ;
					reqParam += '&trsp_trdp_nm='+encodeURIComponent(trk_trdp_nm);
					reqParam += '&dest_rout_trdp_cd='+cne_trdp_cd;
					popGET('CMM_POP_0320.clt'+reqParam, '', 1200, 800, "scroll:yes;status:no;help:no;");
				}
				break;
	   	 	case "RELEASE_ORDER":
				if(sheetObj1.RowCount()== 0){
					//There is no data
					alert(getLabel('FMS_COM_ALT004'));
				}
				else{
					var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var custRefNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_ref_no");
					var reqParam='';
					reqParam += '?s_intg_bl_seq=' + intgBlSeq;
					reqParam += '&f_bl_no=' + hblNo;
					reqParam += '&cust_ref_no=' + custRefNo;
					popGET('SEI_DOC_1080.clt'+reqParam, '', 600, 478, "scroll:yes;status:no;help:no;");
				}
				break;
	   	 	case "P_O_D":
	   	 		if(sheetObj1.RowCount()== 0){
	   	 			//There is no data
					alert(getLabel('FMS_COM_ALT004'));
	   	 		}
	   	 		else{
					var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var custRefNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_ref_no");
	   	 			var reqParam='';
	   	 			reqParam += '?s_intg_bl_seq=' + intgBlSeq;
	   	 			reqParam += '&f_bl_no=' + hblNo;
	   	 			reqParam += '&cust_ref_no=' + custRefNo;
	   	 			popGET('SEE_BMD_0062.clt'+reqParam, '', 600, 660, "scroll:yes;status:no;help:no;");
	   	 		}
	   	 		break;
	   	 	case "USDA_HOLD_NOTICE":
		   	 	if(sheetObj1.RowCount()== 0){
	   	 			//There is no data
					alert(getLabel('FMS_COM_ALT004'));
	   	 		}
	   	 		else{
					var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var custRefNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_ref_no");
					var cne_trdp_cd=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cne_trdp_cd");
					var ntfy_trdp_cd=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "ntfy_trdp_cd");
					var cust_trdp_cd=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_trdp_cd"); //broker
	   	 			var reqParam='';
	   	 			reqParam += '?s_intg_bl_seq=' + intgBlSeq;
	   	 			reqParam += '&f_bl_no=' + hblNo;
	   	 			reqParam += '&cust_ref_no=' + custRefNo;
	   	 			reqParam += '&cne_trdp_cd=' + cne_trdp_cd;
	   	 			reqParam += '&ntfy_trdp_cd=' + ntfy_trdp_cd;
	   	 			reqParam += '&cust_trdp_cd=' + cust_trdp_cd;
	   	 			popGET('SEE_BMD_0064.clt'+reqParam, '', 600, 590, "scroll:yes;status:no;help:no;");
	   	 		}

	   	 		break;
	   	 	case "ITNTE":
				if(sheetObj1.RowCount()== 0){
					//There is no data
					alert(getLabel('FMS_COM_ALT004'));
				}
				else{
					var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var reqParam='?intg_bl_seq=' + intgBlSeq;
					reqParam += '&hbl_no=' + hblNo;
					reqParam += '&f_ofc_cd=' + formObj.f_ofc_cd.value;					
					reqParam += '&air_sea_tp=' + "S";
					popGET('RPT_PRN_0170.clt'+reqParam, '', 480, 115, "scroll:yes;status:no;help:no;");
				}
				break;
	   	 	case 'CERTIFICATE':
	   			//프린트
	   			var formObj=document.frm1;
	   			formObj.file_name.value="carrier_certificate_01.mrd";
	   			formObj.title.value="Carrier's Certificate";
	   			// Parameter Setting
	   			var param='';
	   			param += '[' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") + ']'; // $1
	   			param += '[S]';
	   			formObj.rd_param.value=param;
	   			/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
	   			formObj.rpt_intg_bl_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	   			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   			break;
	   	 	case "PROFIT_REPORT":
		   	 	if(sheetObj1.GetSelectRow()== 0){
		   	 		//There is no data
					alert(getLabel('FMS_COM_ALT004'));
				}
		   	 	else{
					var sRow=sheetObj1.GetSelectRow();
						var reqParam='?intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
						reqParam += '&hbl_no=' + sheetObj1.GetCellValue(sRow, "bl_no");
						reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
						reqParam += '&air_sea_clss_cd=' + "S";
						reqParam += '&bnd_clss_cd=' + "I";
						reqParam += '&biz_clss_cd=' + "H";
						reqParam += '&mbl_no=' + sheetObj1.GetCellValue(sRow, "mbl_no");
					popGET('RPT_PRN_0200.clt'+reqParam, '', 1100, 690, "scroll:yes;status:no;help:no;");
				}
		   	 	break;	
	   	 	case "GOTOACCT":
	   	 		if(sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no')!='-1'){
	   	 		var formObj=document.frm1;
	   		   	var paramStr="./ACC_INV_0040.clt?";
	   		   	//#34054 [BINEX]B/L List/Entry 에서 AR/AP List Link
	   		   	paramStr+= 's_hbl_no=' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no')
	   		   		+"&s_intg_bl_seq="+sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'intg_bl_seq')
	   		   		+"&s_ref_no="+sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no');
	   		   	parent.mkNewFrame('Invoice List', paramStr);

	   	 		}
	   	 		break;
	   	 	case "COMMODITY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		 	rtnary=new Array(2);
		   		rtnary[0]="1";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		callBackFunc = "COMMODITY_POPLIST";
		   		modal_center_open('./CMM_POP_0110.clt', rtnary, 556,480,"yes");
		   		
		   		break;
	   	 	case "EXCEL":
		   	 	if(docObjects[0].RowCount() < 1){//no data	
		   			ComShowCodeMessage("COM132501");
		   		}else{
		   			docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
//		   	 		docObjects[0].Down2Excel({ HiddenColumn:true});
		   		}
	   	 		break;
	   	 	/*Vinh.Vo (S) - 04/14/2015 */
		   	 case "EXCEL_ALL":
		        	excelDown(sheet1);
		        break;
		     /*Vinh.Vo (E)*/
	   	 	case "HBL_COPY":
	   	 		if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") == "-1"){
	   	 			//Select Please.
		   	 		alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	    		}
		   	 	else{
	    			if(confirm(getLabel('FMS_COM_CFMCPY'))){
	   	 				var paramStr="./SEI_BMD_0020.clt?";
	   	 				paramStr+= "f_cmd=" + COMMAND05;
	   	 				paramStr+= "&intg_bl_seq=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	   	 				parent.mkNewFrame('House B/L Entry', paramStr);
	   	 			}
	    		}
		   	 	break;
	   	 	case "DELETE":
	   	 		
	   	 		// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
	   	 		var ref_ofc_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ref_ofc_cd");
	   	 		
	   	 		//alert(edob_flg + " "+ofc_cd+" "+ref_ofc_cd);
		   	 	var btnflag = "Y";
				if (edob_flg == "N"){
					if (ofc_cd != ref_ofc_cd){  
						btnflag = "N";
					}
				}  
				if (btnflag == "Y"){ 
				}else{
					alert(getLabel('FMS_COM_ALT084'));
					return;
				}

	   	 		ajaxSendPost(checkBlInvReq, 'reqVal', '&goWhere=aj&bcKey=getCheckInv&intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq"), './GateServlet.gsl');
	   	 		if(isInvStsOk){
	   	 			//'Do you want to delete?')){
	   	 			if(confirm(getLabel('FMS_COM_CFMDEL'))){
	   	 				frm1.f_cmd.value=REMOVE;
						frm1.intg_bl_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
						frm1.rlt_intg_bl_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "rlt_intg_bl_seq");
						docObjects[0].DoSearch("./SEI_BMD_0060GS.clt", FormQueryString(formObj) );
	   	 			}
	   	 		}
	   	 		else{
	   	 			//You Cannot delete HB/L. Because Invoice was already Issued.
	   	 			alert(getLabel('FMS_COM_ALT022'));
	   	 		}
	   	 		break;
	   	 	case "DOCFILE":	//첨부파일
	   	 		var reqParam='?intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
			   	 	/**  Document List ==> Common Memo 연동 파라미터 (S) */
	        		reqParam += '&palt_mnu_cd='+formObj.palt_mnu_cd.value;
	        		reqParam += '&opr_no='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hbl_no");
	        		/**  Document List ==> Common Memo 연동 파라미터 (E) */
	        		reqParam += '&openMean=SEARCH01';
	    	   		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDoc', 806, 420, "scroll:no;status:no;help:no;");
	    	   	break;
	   	 	case "SNDEML":	//Email전송
	   	 		var reqParam='?intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	       		reqParam += '&openMean=SEARCH01';
	   	   		popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
	   	   		break;
	   	 	case "DOC_SAVE":
	   	 		frm1.f_cmd.value=COMMAND03;
	   	 		docObjects[2].DoAllSave("./SEI_BMD_0060_3GS.clt", FormQueryString(frm1), true);
	   	 		break;
	   	 	case "SEARCHLIST03":
	   	 		frm1.f_cmd.value=SEARCHLIST03;
	   	 		docObjects[2].DoSearch("./SEE_BMD_0070_3GS.clt", FormQueryString(frm1) );
	   	 		//				frm1.memo_txt.value = "";
				break;
	   	 	case "MBL_LIST":
				var refNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'ref_no');
				var mblNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'mbl_no');
			   	var paramStr="./SEI_BMD_0070.clt?";
			   	paramStr+= 'f_ref_no=' + refNo + '&f_mbl_no=' + mblNo;
			   	parent.mkNewFrame('Master B/L List', paramStr);
			   	break;
		     case "WORK_ORDER":	//Work Order 화면호출
		    	if(docObjects[0].RowCount()== 0 || docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") == "-1"){
		   	 		//Select Please.
			   	 	alert(getLabel('FMS_COM_ALT004'));
		   	 		return;
		    	}
		    	 
		    	 var param='f_intg_bl_seq=' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
			  		param += '&air_sea_clss_cd=S'; 
			   		param += '&bnd_clss_cd=I';
			   		param += '&biz_clss_cd=H';
	            var paramStr="./AIC_WOM_0013.clt?f_cmd="+SEARCH01+"&s_type=B&"+param;
	            parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
	            break;
		   	 	case "S_DOC":
	        		var sheetObj3=docObjects[2];	
		   	 		if(sheetObj3.GetTotalRows()> 0){
		   	 			var formObj=document.frm1;
		   	 			formObj.file_name.value='doc_list.mrd';
		   	 			formObj.title.value='Document List';
		   	 			//Parameter Setting
		   	 			var param='[' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") + ']';		// [1]
		   	 			param += '['+formObj.palt_mnu_cd.value+']';	// [2]  MASTER/HOUSE/OTH 여부
		   	 			param += '[' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no") + ']';				// [3] MBL_NO
		   	 			param += '[' + formObj.user_id.value + ']';	// [4]
		   	 			formObj.rd_param.value=param;
		   	 			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		   	 		}
		   	 		break;
				/* #18782 [BINEX, GPL] OBL RCV and Release update function (From BL List) jsjang 2013.9.14  */
		        case "MODIFY":	//값 수정
			        	
			   	 		// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			   	 		var ref_ofc_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ref_ofc_cd");
			   	 		
			   	 		//alert(edob_flg + " "+ofc_cd+" "+ref_ofc_cd);
				   	 	var btnflag = "Y";
						if (edob_flg == "N"){
							if (ofc_cd != ref_ofc_cd){  
								btnflag = "N";
							}
						}  
						if (btnflag == "Y"){ 
						}else{
							alert(getLabel('FMS_COM_ALT083'));
							return;
						}

					
					   frm1.f_cmd.value=MODIFY;
					   if(formObj.r_intg_bl_seq.value == "")
					   {
						   alert(getLabel('FMS_COM_ALT049'));
						   return;
					   }
					   //alert(frm1.f_rlsd_dt_tm.value);
			           if(confirm(getLabel('FMS_COM_CFMSAV'))){
			        	   //formObj.f_intg_bl_seq.value = removeComma(formObj.s_amt_fr.value);
			               //formObj.s_amt_to.value = removeComma(formObj.s_amt_to.value);
			        	   //docObjects[0].DoAllSave("./SEI_BMD_0060GS.clt", FormQueryString(frm1), true);
			        	   docObjects[0].DoSave("./SEI_BMD_0060GS.clt", FormQueryString(frm1),"ibflag", false);
			        	   //docObjects[2].DoAllSave("./SEI_BMD_0060_3GS.clt", FormQueryString(frm1), true);
			        	   doWork('SEARCHLIST');
			           }
				break;
			   	/* #20962, Log history, jsjang 2013.10.11 */
		   	 	case "LOG":
			   	 	if(sheetObj1.GetTotalRows()== 0){
			   	 		//There is no data
		   				alert(getLabel('FMS_COM_ALT004'));
					}
			   	 	else{
						var sRow=sheetObj1.GetSelectRow();
						var reqParam='?s_bl_inv=' + sheetObj1.GetCellValue(sRow, "bl_no");
							//reqParam += '&s_bl_inv=' + sheetObj1.CellValue(sRow, "bl_no");
							reqParam += '&f_his_type=' + "";
							//reqParam += '&his_call_view=' + "B/L Print";
							reqParam += '&f_cmd=' + "11";
							reqParam += '&p_gb=' + "POP";
							//reqParam += '&biz_clss_cd=' + "H";
							//reqParam += '&mbl_no=' + sheetObj1.CellValue(sRow, "mbl_no");
							//formObj.f_cmd.value = -1;
							popGET('MGT_HIS_0041.clt'+reqParam, '', 1240, 670, "scroll:yes;status:no;help:no;");
					}
			   	 	break;
		   	 	case "OPR_POPLIST":
		   	    	rtnary =new Array(1);
			   		rtnary[0]="1";
			   		callBackFunc = "OPR_POPLIST";
					modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
			   	break;
			   	
			   	//#50591 [BNX TORONTO] FREIGHT LOCATION인 RAIL 회사인 CN과 CP의 CONTAINER LIST 및 EXCEL 다운로드 화면 추가
	    	   	case "CN":  
	    	 	case "CP": 
	    	   		if(!formValidation()) return;
				    if(validateForm(sheetObj1, formObj, SEARCHLIST, 1)){
				    	formObj.f_cmd.value=SEARCHLIST04;
				    	formObj.f_cn_cp.value=srcName;  
				    	//alert(formObj.f_cn_cp.value); 
				   		sheetObj4.DoSearch("./SEI_BMD_0060_4GS.clt", FormQueryString(formObj) );  
				    }
				    break;
	    	  
				    
        } // end switch
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
function OPR_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.opr_usrid.value=rtnValAry[0];
		formObj.opr_usrnm.value=rtnValAry[1];
		formObj.opr_ofc_cd.value=rtnValAry[2];
		formObj.opr_dept_cd.value=rtnValAry[3];
	}
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
	    case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
	    	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.eta_strdt,  formObj.eta_enddt,  'MM-dd-yyyy');
	    break;
	    case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
	    	var cal=new ComCalendarFromTo();
		    cal.displayType="date";
		    cal.select(formObj.etd_strdt,  formObj.etd_enddt,  'MM-dd-yyyy');
	    break;
	    case 'DATE13':   //달력 조회 From ~ To 팝업 호출 
	    	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.post_strdt,  formObj.post_enddt,  'MM-dd-yyyy');
	    break;
    }
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.frm1.f_CurPage.value=callPage;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
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
function loadPage() { 
	var opt_key = "USE_CFS_FIELDS";
    ajaxSendPost(setUseCfsFieldsReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
    var opt_key_s = "AN_FIRST_SEND_DATE";
    ajaxSendPost(setAnFaxMailFiled, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_s, "./GateServlet.gsl");
    
	var formObj=document.frm1;
	var s_ofc_cd=formObj.s_ofc_cd.value;
	if(s_ofc_cd != ""){
		formObj.f_ofc_cd.value=s_ofc_cd;
	}
	 
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd); 
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
  	
    /* #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) - check 시에는 아무 동작 안함. */
    //오늘일자구하기
    var now=new Date();
    var year=now.getFullYear();
    var month=now.getMonth() + 1;
    var date=now.getDate();
    if (month < 10) {
    	month="0" + (month);
    }
    if (date < 10) {
    	date="0" + date;
    }
    TODAY=month + "-" + date + "-" + year;  
    
    // IMPEX HBL_SER_NO 리스트 추가    
    if (frm1.use_hbl_ser.value == 'Y') {
    	docObjects[0].SetColHidden('hbl_ser_no',0);
    } 
    
    setUseCfsField();
}

function RestoreGrid(){
	doWork('SEARCHLIST');
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
    switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	        var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
	        var headers = [ { Text:getLabel('SEI_BMD_0060_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);
	        var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"block_flag",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ref_ofc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"prnr_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"prnr_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"shp_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"shp_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cne_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cne_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"act_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"act_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"ntfy_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"ntfy_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"trnk_vsl_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"trnk_voy",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"lnr_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Image",     Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"view_mbl",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:false },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"isf_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fnl_dest_loc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fnl_dest_loc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"f_eta_dt_tm",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cust_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cust_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cfs_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cfs_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"it_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Int",       Hidden:0,  Width:60,   Align:"Right",   ColMerge:0,   SaveName:"pck_qty",          KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"grs_wgt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"grs_wgt1",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"meas",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"CheckBox",  Hidden:0,  Width:85,   Align:"Center",  ColMerge:0,   SaveName:"org_bl_rcvd_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N" },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"rcvd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"express_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"CheckBox",  Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"rlsd_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N" },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"rlsd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"ccn_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"mnf_fr_loc",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"mnf_to_loc",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"frt_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ar_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ap_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"dc_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"memo",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"proc_usr_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"ams_id",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:108,  Align:"Left",    ColMerge:0,   SaveName:"cust_ref_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"ams_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               
	               {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"hbl_ser_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"entr_no",       	 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pkup_dt",       	 KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"post_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"sub_bl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"rep_cmdt_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"an_fax_snd_dt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"an_eml_snd_dt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"trk_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"trk_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cust_ref_no_h",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bl_cnt",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bl_sts_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"rlt_intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_cnt" },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Status",    Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	        InitColumns(cols);
	        SetEditable(1);
	        SetImageList(0,APP_PATH+"/web/img/button/btns_view.gif");
	         /* #18782 [BINEX, GPL] OBL RCV and Release update function (From BL List) jsjang 2013.9.14  */
	        /* #18782 [BINEX, GPL] OBL RCV and Release update function (From BL List) jsjang 2013.9.14  */
	        SetDataLinkMouse('view_mbl',1);
	        InitViewFormat(0, "eta_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        InitViewFormat(0, "post_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        InitViewFormat(0, "rlsd_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        InitViewFormat(0, "etd_dt_tm", 	"MM\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	        /* #18782 [BINEX, GPL] OBL RCV and Release update function (From BL List) jsjang 2013.9.14  */
	        InitViewFormat(0, "rcvd_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        InitViewFormat(0, "pkup_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	        
	        if(USE_FAX_MAIL == 'N'){
			    SetColHidden("an_fax_snd_dt", 1);
	  		    SetColHidden("an_eml_snd_dt", 1);
	        }else{
	        }  		    
	        SetSheetHeight(SYSTEM_ROW_HEIGHT*18);
	        //sheetObj.SetFocusAfterProcess(1);
		   }                                                      
		break;
		 case 2:      //IBSheet1 init
		    with (sheetObj) {
	            var cnt=0;
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('SEE_BMD_HDR11'), Align:"Center"} ];
	            InitHeaders(headers, info);
	            var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"block_flag",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"mbl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"shipper_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"shipper_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"consignee_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"consignee_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0 },
	                {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0 },
	                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bl_sts_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 } ];
	            InitColumns(cols);
	            SetEditable(0);
	            InitViewFormat(0, "etd_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
		        InitViewFormat(0, "eta_dt_tm", 	"MM\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		        SetSheetHeight(SYSTEM_ROW_HEIGHT*5);
	            //sheetObj.SetFocusAfterProcess(0);
		   }                                                      
		break;
		 case 3:					//첨부파일
		     with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('SEE_BMD_HDR2'), Align:"Center"} ];
             InitHeaders(headers, info);
             var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"doc_ibflag" },
              {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"Del",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
              {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"palt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
              {Type:"Text",      Hidden:0,  Width:55,   Align:"Center",  ColMerge:0,   SaveName:"palt_ext_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:1, Width:140,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:0,  Width:290,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_msg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_img_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_pdf_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_rmk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq_d",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
             InitColumns(cols);
             SetEditable(1);
             SetImageList(0,APP_PATH+"/web/img/button/bt_img.gif");
             SetImageList(1,APP_PATH+"/web/img/button/bt_pdf.gif");
             sheetObj.SetDataLinkMouse("palt_doc_nm",1);
             sheetObj.SetDataLinkMouse("palt_doc_img_url",1);
             sheetObj.SetDataLinkMouse("palt_doc_pdf_url",1);
             //SetAutoRowHeight(0);
             SetSheetHeight(SYSTEM_ROW_HEIGHT*8);
             sheetObj.SetFocusAfterProcess(0);
		       }                                                      
		   break;
		   
		 case 4:					//cn cp excel 
		     with (sheetObj) { 
             var info    = { Sort:1, ColMove:1 , ColResize:1 }; 
             var headers = [ { Text:getLabel('SEE_BMD_HDR3'), Align:"Center"} ];
             InitHeaders(headers, info);
             var cols = [  
                 {Type:"Text",      Hidden:0, Width:150,  Align:"Center",    ColMerge:0,   SaveName:"hbl_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0, Width:150,  Align:"Center",    ColMerge:0,   SaveName:"ref_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ,
                 {Type:"Date",      Hidden:0, Width:150,  Align:"Center",    ColMerge:0,   SaveName:"post_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ,
                 {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cfs_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ,
                 {Type:"Text",      Hidden:0, Width:150,  Align:"Center",    ColMerge:0,   SaveName:"cntr_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } 
                 ];
                 InitColumns(cols); 
                 SetSheetHeight(SYSTEM_ROW_HEIGHT*8);
		 	}                                                      
		   break;		   
    }
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet1_OnSelectMenu(sheetObj, MenuString){
	 var formObj=document.frm1;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 사용자가 저장한 Header Setting을 삭제한다.
		//		case "Header Setting Delete":
		//			IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
		//		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}
var curBlNo='';
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr=='view_mbl'){
		var formObj=document.frm1;
	    var sheetObj1=docObjects[0];
		var sheetObj2=docObjects[1];
	  	searchSheet2(sheetObj,Row,Col);
	/* #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) - check 시에는 아무 동작 안함. */
	}else if(colStr =='rlsd_flg'){
		var f_rlsd_flg=sheetObj.GetCellValue(Row,"rlsd_flg");
		var f_rlsd_dt_tm=sheetObj.GetCellValue(Row,"rlsd_dt_tm");
		if(f_rlsd_flg == 1)
		{
			//frm1.f_rlsd_flg.value = "Y";
		}else{
			if(f_rlsd_dt_tm == "")
			{
				sheetObj.SetCellValue(Row,"rlsd_dt_tm",getTodayStr("MM-dd-yyyy"),0);
			}
		}
		//frm1.f_rlsd_dt_tm.value =  = sheetObj.CellValue(Row,"rlsd_dt_tm");
	}else if(colStr =='org_bl_rcvd_flg'){
		var f_org_bl_rcvd_flg=sheetObj.GetCellValue(Row,"org_bl_rcvd_flg");
		var f_rcvd_dt_tm=sheetObj.GetCellValue(Row,"rcvd_dt_tm");
		if(f_org_bl_rcvd_flg == 1)
		{
		}else{
			if(f_rcvd_dt_tm == "")
			{
				sheetObj.SetCellValue(Row,"rcvd_dt_tm",getTodayStr("MM-dd-yyyy"),0);
			}
		}
		//frm1.f_rcvd_dt_tm.value =  = sheetObj.CellValue(Row,"rcvd_dt_tm");
	}else if(colStr =='isf_no'){
		var formObj=document.frm1;
   		formObj.file_name.value='isf_history.mrd';
   		if( trim(sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ams_no"))  != ""){
   			formObj.title.value='Importer Security Filling History[' +  sheetObj.GetCellValue(sheetObj.GetSelectRow(),"ams_no") + ']';
   		}else{
   			formObj.title.value='Importer Security Filling History[' +  sheetObj.GetCellValue(sheetObj.GetSelectRow(),"bl_no") + ']';
   		}
    	formObj.mailTitle.value=formObj.title.value;
    	var isfNo=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "isf_no");
    	// BL_NO는 SCAC + BL_NO 이므로 AMS_NO를 넘겨준다.
    	var blNo=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ams_no");
    	if(isfNo == "") return;
		var param='[' + isfNo + ']';				// [1]
		param	  += '[' + blNo + ']';				// [2]
		formObj.rd_param.value=param;
		popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);	
			
	}else /*if(colStr=='bl_no')*/{
		var formObj=document.frm1;
		var sheetObj1=docObjects[0];
		var sheetObj3=docObjects[2];
		formObj.intg_bl_seq.value=sheetObj1.GetCellValue(Row,"intg_bl_seq");
		/**  Document List ==> Common Memo 연동 파라미터 (S) */
		formObj.palt_mnu_cd.value="OIH";
		formObj.opr_no.value=sheetObj1.GetCellValue(Row,"hbl_no");
		/**  Document List ==> Common Memo 연동 파라미터 (E) */
		formObj.f_cmd.value=SEARCHLIST03;
		sheetObj3.DoSearch("./SEI_BMD_0060_3GS.clt", FormQueryString(formObj) );
		//		if(docObjects[2].SearchRows==0){
		//			formObj.memo_txt.value = "";
		//		}
		/* #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) - check 시에는 아무 동작 안함. */
		var f_rlsd_flg=sheetObj.GetCellValue(Row,"rlsd_flg");
		frm1.r_intg_bl_seq.value=sheetObj.GetCellValue(Row,"intg_bl_seq");
		frm1.f_rlsd_dt_tm.value=sheetObj.GetCellValue(Row,"rlsd_dt_tm");
		var f_org_bl_rcvd_flg=sheetObj.GetCellValue(Row,"org_bl_rcvd_flg");
		frm1.f_rcvd_dt_tm.value=sheetObj.GetCellValue(Row,"rcvd_dt_tm");
		//alert(f_rlsd_flg);
		if(f_rlsd_flg == 1)
		{
			frm1.f_rlsd_flg.value="Y";
		}else{
			frm1.f_rlsd_flg.value="N";
		}		
		if(f_org_bl_rcvd_flg == 1)
		{
			frm1.f_org_bl_rcvd_flg.value="Y";
		}else{
			frm1.f_org_bl_rcvd_flg.value="N";
		}			
	}
	/*
	else{
	if(curBlNo!=''&&curBlNo!=sheetObj.GetCellValue(Row, 'bl_no')){
			docObjects[1].RemoveAll();
		}
	}
	*/
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	/* #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) - check 시에는 아무 동작 안함. */
	if(colStr =='rlsd_flg' || colStr =='rlsd_dt_tm' || colStr =='org_bl_rcvd_flg' || colStr =='rcvd_dt_tm'){
	}else{		
		if(colStr!='view_mbl'){
			var formObj=document.frm1;
		   	doProcess=true;
		   	formObj.f_cmd.value="";                   
		   	var paramStr="./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+escape(sheetObj.GetCellValue(Row,"bl_no"))+"&f_intg_bl_seq="+sheetObj.GetCellValue(Row,"intg_bl_seq");
		   	parent.mkNewFrame('Booking & HB/L Entry', paramStr,"SEI_BMD_0020_SHEET_" + sheetObj.GetCellValue(Row,"bl_no")+"_"+sheetObj.GetCellValue(Row,"intg_bl_seq")); 
		}
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet2에서 OnDblClick이벤트 발생시.
 * sheet2_OnDblClick(sheetObj, Row, Col)  <= sheet2번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet2_OnDblClick(sheetObj,Row,Col){	
	var formObj=document.frm1;
   	var paramStr="./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST;
   	paramStr+= '&f_ref_no='+sheetObj.GetCellValue(Row, 'ref_no');
   	parent.mkNewFrame('Master B/L Entry', paramStr, "SEI_BMD_0040_SHEET_" +sheetObj.GetCellValue(Row, 'ref_no')); 
}
/**
 * sheet2 search
 */
function searchSheet2(sheetObj,Row,Col){
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	formObj.f_intg_bl_seq.value=sheetObj1.GetCellValue(Row,"intg_bl_seq");
	formObj.master_bl_no.value=sheetObj1.GetCellValue(Row,"bl_no");
	formObj.f_cmd.value=SEARCHLIST02;
	sheetObj2.DoSearch("./SEI_BMD_0060_2GS.clt", FormQueryString(formObj) );
}
var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}		
	var s_type="";
	//	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			//			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				//			}
		}else if ( tmp == "onChange" ) {
			//			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			//			}
		}
	//	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value=masterVals[0];
				formObj.f_pol_nm.value=masterVals[3];
			}else if(CODETYPE == "location_por"){
				formObj.f_por_cd.value=masterVals[0];
				formObj.f_por_nm.value=masterVals[3];
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value=masterVals[0];
				formObj.f_pod_nm.value=masterVals[3];
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value=masterVals[0];
				formObj.f_del_nm.value=masterVals[3];
			}else if(CODETYPE == "location_dest"){
				formObj.f_fnl_dest_loc_cd.value=masterVals[0];
				formObj.f_fnl_dest_loc_nm.value=masterVals[3];
			}else if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=masterVals[0]; 
				formObj.f_trdp_full_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_por"){
				formObj.f_por_cd.value="";
				formObj.f_por_nm.value="";
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value="";
				formObj.f_pod_nm.value="";
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value="";
				formObj.f_del_nm.value="";
			}else if(CODETYPE == "location_dest"){
				formObj.f_fnl_dest_loc_cd.value="";
				formObj.f_fnl_dest_loc_nm.value="";
			}else if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=""; 
				formObj.f_trdp_full_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	for(var i=1; i<=sheetObj.LastRow();i++){
if(sheetObj.GetCellValue(i, "bl_sts_cd") == "HF") {
			sheetObj.SetCellValue(i, "block_flag","Y");
			sheetObj.SetCellFontColor(i, "block_flag","#FF0000");
		}	
		// #22632 oyh Isf No 에 링크걸기
	sheetObj.SetCellFontColor(i, "isf_no","#0000FF");
	}
	if(frm1.f_cmd.value==REMOVE){
		doWork("SEARCHLIST");
	}
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}
function sheet2_OnSearchEnd(sheetObj, errMsg){
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "bl_sts_cd") == "HF") {
			sheetObj.SetCellValue(i, "block_flag","Y");
			sheetObj.SetCellFontColor(i, "block_flag","#FF0000");
		}
	}
}

 
function sheet4_OnSearchEnd(sheetObj, errMsg){
	 
	sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
}

function sheet1_OnChange(sheetObj, rowIdx, colIdx){
	var colStr=sheetObj.ColSaveName(colIdx);
	if(colStr=="cls_check"){
		if(sheetObj.GetCellValue(rowIdx, 'bl_sts_cd')!='HO'){
			sheetObj.SetCellValue(rowIdx, 'cls_check',0,0);
		}
	}
	if(colStr=="org_bl_rcvd_flg"){
		if(sheetObj.GetCellValue(rowIdx, 'org_bl_rcvd_flg') == 0){
			sheetObj.SetCellValue(rowIdx, 'rcvd_dt_tm',"",0);
		}
	}
	if(colStr=="rcvd_dt_tm"){
		if(sheetObj.GetCellValue(rowIdx, 'rcvd_dt_tm').length == 8){
			sheetObj.SetCellValue(rowIdx, 'org_bl_rcvd_flg',1);
		}else{
			sheetObj.SetCellValue(rowIdx, 'org_bl_rcvd_flg',0);
		}
	}
	if(colStr=="rlsd_flg"){
		if(sheetObj.GetCellValue(rowIdx, 'rlsd_flg') == 0){
			sheetObj.SetCellValue(rowIdx, 'rlsd_dt_tm',"",0);
		}
	}
	if(colStr=="rlsd_dt_tm"){
		if(sheetObj.GetCellValue(rowIdx, 'rlsd_dt_tm').length == 8){
			sheetObj.SetCellValue(rowIdx, 'rlsd_flg',1);
		}else{
			sheetObj.SetCellValue(rowIdx, 'rlsd_flg',0);
		}
	}
 	//var colStr = sheetObj.ColSaveName(Col);
 	/* #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) - check 시에는 아무 동작 안함. */
	var f_rlsd_flg=sheetObj.GetCellValue(rowIdx,"rlsd_flg");
	frm1.r_intg_bl_seq.value=sheetObj.GetCellValue(rowIdx,"intg_bl_seq");
	frm1.f_rlsd_dt_tm.value=sheetObj.GetCellValue(rowIdx,"rlsd_dt_tm");
	if(f_rlsd_flg == 1)
	{
		frm1.f_rlsd_flg.value="Y";
	}else{
		frm1.f_rlsd_flg.value="N";
	}
	var f_org_bl_rcvd_flg=sheetObj.GetCellValue(rowIdx,"org_bl_rcvd_flg");
	frm1.f_rcvd_dt_tm.value=sheetObj.GetCellValue(rowIdx,"rcvd_dt_tm");
	if(f_org_bl_rcvd_flg == 1)
	{
		frm1.f_org_bl_rcvd_flg.value="Y";
	}else{
		frm1.f_org_bl_rcvd_flg.value="N";
	}		
}
function sheet1_OnMouseMove(sheetObj, row, col){
	if(sheetObj.MouseCol()==0){
		var memo=sheetObj.GetCellValue(sheetObj.MouseRow(), "memo");
		memo=memo.replaceAll("@^^@", "\n");
		sheetObj.SetToolTipText(sheetObj.MouseRow(), sheetObj.MouseCol(),memo);
	}
}
function sheet3_OnMouseMove(sheetObj, row, col){
	if(sheetObj.MouseCol()==9){
		var memo=sheetObj.GetCellValue(sheetObj.MouseRow(), "palt_doc_msg");
		memo=memo.replaceAll("@^^@", "\n");
		sheetObj.SetToolTipText(sheetObj.MouseRow(), sheetObj.MouseCol(),memo);
	}
}
var isInvStsOk=false;
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
function reloadDocList(){
	sheet1_OnClick(docObjects[0], docObjects[0].GetSelectRow(), 1);
}
function getSelectedFiles(){
	return docObjects[2];
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
        case "palt_doc_msg":
//        	frm1.memo_txt.value = sheetObj.CellValue(Row, Col);
        break;
	} // end switch
}
function downloadFile(downType, s_intg_bl_seq, s_palt_doc_seq){
	document.frm2.docType.value=downType;
	document.frm2.s_palt_doc_seq.value=s_palt_doc_seq;
	document.frm2.intg_bl_seq.value = s_intg_bl_seq;
	//document.frm2.target = '_self';
	document.frm2.submit();
}
function clearAll(){
	docObjects[0].RemoveAll();
	docObjects[1].RemoveAll();
	docObjects[2].RemoveAll();
	var formObj=document.frm1;
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
	formObj.f_shp_mod_cd.selectedIndex=0;
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text"){
			collTxt[i].value="";
		}           
	}
}
function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value='';
		doWork('SEARCHLIST');
	}
}
function copyPckQty(){
	frm1.to_pck_qty.value=frm1.fm_pck_qty.value;
}
function copyGrsWgt(){
	frm1.to_grs_wgt.value=frm1.fm_grs_wgt.value;
}
function copyMeas(){
	frm1.to_meas.value=frm1.fm_meas.value;
}
function sheet1_OnSaveEnd(sheetObj, row, col){
	doWork("SEARCHLIST");
}
function sheet3_OnSaveEnd(sheetObj, row, col){
	doWork("SEARCHLIST03");
}
function sheet3_OnSearchEnd(sheetObj, row, col){
	var formObj=document.frm1;
	if(docObjects[2].SearchRows()>0){
//		formObj.memo_txt.value = docObjects[2].CellValue(1, "palt_doc_msg");
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
function formValidation(){
	if(!chkSearchCmprPrd(false, frm1.eta_strdt, frm1.eta_enddt)){
		return false;
	}
	return true;
}
//Calendar flag value
var firCalFlag=false;
function printHouseCcn(){
	var sheetObj1=docObjects[0];
	// 하단부 print text 설정
	var end_txt=new Array();
	end_txt[0]="MAIL COPY - EXEMPLAIRE DE LA POSTE";
	end_txt[1]="STATION COPY - EXEMPLAIRE DE LA GARE";
	end_txt[2]="LONG ROOM COPY - EXEMPLAIRE DE LA SALLE DES COMPTOIRS";
	end_txt[3]="WAREHOUSE OPERATOR'S COPY - EXEMPLAIRE DE L'EXPLOITANT D'ENTREPOT";
	end_txt[4]="CUSTOMS DELIVERY AUTHORITY COPY - EXEMPLAIRE DE L'AUTORISATION DOUANIERE DE";
	frm1.title.value='CARGO CONTROL NO SHEET';
	//Parameter Setting
	var ttlFileName='cargo_control_no.mrd';
	var param="";
	for (var i=0; i< end_txt.length; i++) {
		if (i > 0){
			ttlFileName += '^@@^' + 'cargo_control_no.mrd';
			param +=  "^@@^";
		}		
		param += '[' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq") + ']';		// [1] Intg_bl_seq
		param += '[' + frm1.f_user_ofc_cd.value + ']';										// [2] ofc_cd
		param += '[' + frm1.f_phone.value + ']';											// [3] tel
		param += '[' + frm1.f_fax.value + ']';												// [4] fax
		param += '[' + frm1.f_email.value + ']';											// [5] email
		param += '[' + end_txt[i] + ']';													// [6] end_txt
	}
	frm1.file_name.value=ttlFileName;
	frm1.rd_param.value=param;
	popPOST(frm1, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
 }
function POL_LOCATION_POPLIST(rtnVal){
		var formObj=document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pol_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pol_nm.value=rtnValAry[2];//loc_nm
	} 
}
function POR_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_por_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_por_nm.value=rtnValAry[2];//loc_nm
	} 
}
function POD_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
	}
}
function DEL_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_del_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_del_nm.value=rtnValAry[2];//loc_nm
	}
}
function DEST_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_fnl_dest_loc_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_fnl_dest_loc_nm.value=rtnValAry[2];//loc_nm
	}
}
function PRNR_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_prnr_trdp_nm.value=rtnValAry[2];//full_nm
	}
}
function SHIP_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_shpr_trdp_nm.value=rtnValAry[2];//full_nm
	}
}
function CNEE_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cnee_trdp_nm.value=rtnValAry[2];//full_nm
	}
}
function ASHIP_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ahpr_trdp_nm.value=rtnValAry[2];//full_nm
	}
}
function NTFY_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
 	}
 	else{
 		var rtnValAry=rtnVal.split("|");
 		formObj.f_ntfy_trdp_nm.value=rtnValAry[2];//full_nm
 	} 
}
function CFS_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
 	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
 	}
 	else{
 		var rtnValAry=rtnVal.split("|");
 		formObj.f_cfs_trdp_nm.value=rtnValAry[2];//full_nm
 	}
 }
function COMMODITY_POPLIST(){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cmdt_nm.value=rtnValAry[2];
	}
}

function setHblSizeUp(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*32);//height
}
function setHblSizeDown(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*18);//height
}

/* Vinh.Vo (S)*/
function onlyNumberAndAnphabet(evt){
	/**
	 * 	Accept numbers and anphabets only
	*/
	
	var formObj = document.frm1;
	
	var theEvent = evt || window.event;
	
	var key = theEvent.keyCode || theEvent.which;
	
	key = String.fromCharCode( key );
	
	var regex = /[0-9A-Za-z ]/;
	
	if( !regex.test(key) ) {
	  theEvent.returnValue = false;
	  if(theEvent.preventDefault) theEvent.preventDefault();
	}
}

function formValidation2(){
	var formObj=document.frm1;
	if(!chkSearchCmprPrd(false, frm1.eta_strdt, frm1.eta_enddt)){
		return false;
	}
	if(!chkSearchCmprPrd(false, frm1.etd_strdt, frm1.etd_enddt)){
		return false;
	}
	return true;
}

function excelDown(mySheet){
	
	var formObj = document.frm1;
	
	if(!formValidation()){
		return;
	}
	
	if(formObj.eta_strdt.value == "" && formObj.etd_strdt.value == ""){
		ComShowCodeMessage("COM132602");
		formObj.eta_strdt.focus();
		return;
	}
	
	formObj.f_cmd.value = COMMAND10;
	
	
	var formParam = FormQueryString(formObj);
	
	var param = {
					DownCols: makeHiddenSkipCol(mySheet)
					,SheetDesign:1
					,URL:"./SEI_BMD_0060.clt"
					,ExtendParam:formParam
					,ExtendParamMethod:"GET"
				};	
	mySheet.DirectDown2Excel(param);
}

/* Vinh.Vo (E)*/

function setUseCfsFieldsReq(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
    	if(doc[1] == "Y"){
    		USE_CFS_FIELDS = "Y";
    	}
    }
}
function setAnFaxMailFiled(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
    	if(doc[1] == "Y"){
    		USE_FAX_MAIL = "Y";
    	}else{
    		USE_FAX_MAIL = "N";
    	}
    }
}
function setUseCfsField(){
	if(USE_CFS_FIELDS == "Y"){
		$('[id=show_entr_no]').show();
		docObjects[0].SetColHidden('entr_no',0);
		docObjects[0].SetColHidden('pkup_dt',0);
	}
}