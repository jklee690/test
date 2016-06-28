/*=========================================================
 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
 *@FileName   : SEE_BMD_0060.js
 *@FileTitle  : Booking And House B/L Search 
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/16
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

function initFinish() {
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	// setFromToDtEndPlus(document.frm1.etd_strdt, 180, document.frm1.etd_enddt,
	// 30);
}
function doWork(srcName, valObj) {
	if (!btnGetVisible(srcName)) {
		return;
	}
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
	var formObj = document.frm1;
	var sheetObj1 = docObjects[0];
	var sheetObj2 = docObjects[1];
	var sheetObj3 = docObjects[2];
	try {
		switch (srcName) {
		case "SEARCHLIST":
			sheetObj2.RemoveAll();
			sheetObj3.RemoveAll();
			if (!formValidation())
				return;
			// search 조건 추가로 combo box 이용한 추가 조건 set
			searchValueSet();
			if (validateForm(sheetObj1, formObj, SEARCHLIST, 1)) {
				formObj.f_cmd.value = SEARCHLIST01;
				sheetObj1.DoSearch("./SEE_BMD_0060GS.clt",
						FormQueryString(formObj));
			}
			break;
		case "NEW":
			parent.mkNewFrame('Booking & HB/L Entry', './SEE_BMD_0020.clt');
			break;
		case "HBLCLS":
			var ckRow = sheetObj1.FindCheckedRow('cls_check');
			if (ckRow == '') {
				// Please checked the [Sel.] column!
				alert(getLabel('FMS_COM_ALT004'));
			} else {
				// 'Do you want to close HBL?')){
				if (confirm(getLabel('FMS_COM_CFMCLS'))) {
					frm1.f_cmd.value = COMMAND01;
					sheetObj1.DoSave("./SEE_BMD_0060GS.clt",
							FormQueryString(formObj), "ibflag", false);
				}
			}
			break;
		case "HBLUNCNF":
			var ckRow = sheetObj1.FindCheckedRow('cls_check');
			if (ckRow == '') {
				// 'Please checked the [Sel.] column!');
				alert(getLabel('FMS_COM_ALT004'));
			} else {
				// 'Do you want to cancel "HBL Confirm"?')){
				if (confirm(getLabel('FMS_COM_CFMCAN'))) {
					frm1.f_cmd.value = COMMAND02;
					sheetObj1.DoSave("./SEE_BMD_0060GS.clt",
							FormQueryString(formObj), "ibflag", false);
				}
			}
			break;
		case "POL_LOCATION_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(3);
			rtnary[0] = "SEA";
			rtnary[1] = "BL";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[2] = valObj;
			} else {
				rtnary[2] = "";
			}
			callBackFunc = "POL_LOCATION_POPLIST";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
			
			break;
		case "POD_LOCATION_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(3);
			rtnary[0] = "SEA";
			rtnary[1] = "BL";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[2] = valObj;
			} else {
				rtnary[2] = "";
			}
			callBackFunc = "POD_LOCATION_POPLIST";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
			break;
		case "DEL_LOCATION_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(3);
			rtnary[0] = "SEA";
			rtnary[1] = "BL";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[2] = valObj;
			} else {
				rtnary[2] = "";
			}
			callBackFunc = "DEL_LOCATION_POPLIST";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
			break;
		case "PRNR_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "PRNR_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
			break;
		case "SHIP_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "SHIP_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
			break;
		case "CNEE_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "CNEE_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
			break;
		case "ASHIP_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "ASHIP_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			break;
		case "NTFY_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "NTFY_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
			break;
		/*
		 * case "Print": var param="f_bkg_no=" + formObj.f_bkg_no.value; param +=
		 * "&f_hbl_no=" + formObj.f_hbl_no.value; param += "&f_act_shp_nm=" +
		 * formObj.f_act_shp_nm.value; param += "&f_hbl_tp_cd=" +
		 * formObj.f_hbl_tp_cd.value; param += "&f_cntr_no=" +
		 * formObj.f_cntr_no.value; param += "&f_pic_id=" +
		 * formObj.f_pic_id.value; // param += "&f_sr_no=" +
		 * formObj.f_sr_no.value; // param += "&f_mbl_no=" +
		 * formObj.f_mbl_no.value; param += "&obrd_dt_strdt=" +
		 * formObj.obrd_strdt.value; param += "&obrd_dt_enddt=" +
		 * formObj.obrd_enddt.value; param += "&f_ofc_cd=" +
		 * formObj.f_ofc_cd.value; param += "&f_pol_cd=" +
		 * formObj.f_pol_cd.value; param += "&f_pod_cd=" +
		 * formObj.f_pod_cd.value; param += "&f_del_cd=" +
		 * formObj.f_del_cd.value; param += "&f_dpt_cd=" +
		 * formObj.f_dpt_cd.value; //2010.12.23 김진혁 추가, HBL Search에 추가된 조회조건 반영
		 * param += "&f_hbl_status=" + formObj.f_hbl_status.value; param +=
		 * "&cmd_type=2"; param += "&title=H B/L List";
		 * popGET('RPT_PRN_0050.clt?'+param, '', 1025, 740,
		 * "scroll:yes;status:no;help:no;"); break;
		 */
		case "ShippingAdvice":
			if (sheetObj1.RowCount() == 0) {
				// There is no data
				alert(getLabel('FMS_COM_ALT004'));
			} else {
				var row = sheetObj1.GetSelectRow();
				var blNo = sheetObj1.GetCellValue(row, "bl_no");
				var intgBlSeq = sheetObj1.GetCellValue(row, "intg_bl_seq");
				var refOfcCd = sheetObj1.GetCellValue(row, "ref_ofc_cd");
				var refOfcCnt = sheetObj1.GetCellValue(row, "ref_ofc_cnt");
				// HBL의 ref_ofc의 국가코드가 독일일 경우 바로 프린트 창을 띄움
				
				//if (refOfcCnt != "DE") {
					var reqParam = '?air_sea_tp=' + 'S';
					reqParam += '&bl_no=' + blNo;
					reqParam += '&intg_bl_seq=' + intgBlSeq;
					reqParam += '&ref_ofc_cd=' + refOfcCd;
					reqParam += '&mailTitle='
							+ 'Shipping Advice [Ocean Export House BL No : '
							+ docObjects[0].GetCellValue(docObjects[0]
									.GetSelectRow(), "bl_no") + ']';
					var trdp_cd = '';
					trdp_cd += '('
							+ '\''
							+ docObjects[0].GetCellValue(docObjects[0]
									.GetSelectRow(), "shp_trdp_cd") + '\'';
					trdp_cd += ','
							+ '\''
							+ docObjects[0].GetCellValue(docObjects[0]
									.GetSelectRow(), "prnr_trdp_cd") + '\''
							+ ')';
					ajaxSendPost(getMailTo, 'reqVal',
							'&goWhere=aj&bcKey=getMailTo&trdp_cd=' + trdp_cd,
							'./GateServlet.gsl');
					reqParam += '&mailTo=' + mailTo;
					popGET('RPT_PRN_0120.clt' + reqParam, '', 400, 335,
							"scroll:yes;status:no;help:no;");
				/*
				} else {
					formObj.title.value = 'Shipping Advice';
					formObj.file_name.value = 'shipping_advice_oe_hbl_de_01.mrd';
					// Parameter Setting
					var param = '[' + intgBlSeq + ']';
					formObj.rd_param.value = param;
					formObj.mailTitle.value = 'Shipping Advice [Ocean Export House BL No : '
							+ docObjects[0].GetCellValue(docObjects[0]
									.GetSelectRow(), "bl_no") + ']';
					;
					var trdp_cd = '';
					trdp_cd += '('
							+ '\''
							+ docObjects[0].GetCellValue(docObjects[0]
									.GetSelectRow(), "shp_trdp_cd") + '\'';
					trdp_cd += ','
							+ '\''
							+ docObjects[0].GetCellValue(docObjects[0]
									.GetSelectRow(), "prnr_trdp_cd") + '\''
							+ ')';
					ajaxSendPost(getMailTo, 'reqVal',
							'&goWhere=aj&bcKey=getMailTo&trdp_cd=' + trdp_cd,
							'./GateServlet.gsl');
					formObj.mailTo.value = mailTo;
					formObj.rpt_biz_tp.value = "OEH";
					formObj.rpt_biz_sub_tp.value = "SA";
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
				*/
			}
			break;
		case "DockReceipt":
			if (sheetObj1.RowCount() == 0) {
				// There is no data
				alert(getLabel('FMS_COM_ALT004'));
			} else {
				var row = sheetObj1.GetSelectRow();
				var intgBlSeq = sheetObj1.GetCellValue(row, "intg_bl_seq");
				var refOfcCd = sheetObj1.GetCellValue(row, "ref_ofc_cd");
				formObj.title.value = "Dock Receipt";
				formObj.file_name.value = "dock_receipt_oe_hbl_01.mrd";
				// Parameter Setting
				var param = '[' + intgBlSeq + ']';
				param += '[' + refOfcCd + ']';
				param += '[' + formObj.f_phn.value + ']';
				param += '[' + formObj.f_fax.value + ']';
				param += '[' + formObj.f_email.value + ']';
				formObj.rd_param.value = param;
				formObj.rpt_biz_tp.value = "OEH";
				formObj.rpt_biz_sub_tp.value = "DR";
				popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			}
			break;
		case "USDA_HEAT_TREATMENT":
			// Print
			var formObj = document.frm1;
			formObj.file_name.value = "USDA_Heat_Treatment.mrd";
			formObj.title.value = "USDA Heat Treatment";
			// Parameter Setting
			var param = '';
			param += "["
					+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),
							"intg_bl_seq") + "]"; // $1
			formObj.rd_param.value = param;
			popPOST(formObj, "RPT_RD_0010.clt", "popTest", 1025, 740);
			break;
		case "PROFIT_REPORT":
			if (sheetObj1.RowCount() == 0) {
				// There is no data
				alert(getLabel('FMS_COM_ALT004'));
			} else {
				var sRow = sheetObj1.GetSelectRow();
				var reqParam = '?intg_bl_seq='
						+ sheetObj1.GetCellValue(sRow, "intg_bl_seq");
				reqParam += '&hbl_no=' + sheetObj1.GetCellValue(sRow, "bl_no");
				reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
				reqParam += '&air_sea_clss_cd=' + "S";
				reqParam += '&bnd_clss_cd=' + "O";
				reqParam += '&biz_clss_cd=' + "H";
				reqParam += '&mbl_no=' + sheetObj1.GetCellValue(sRow, "mbl_no");
				popGET('RPT_PRN_0200.clt' + reqParam, '', 1100, 650,
						"scroll:yes;status:no;help:no;");
			}
			break;
		/* #20962, Log history, jsjang 2013.10.11 */
		case "LOG":
			if (sheetObj1.RowCount() == 0) {
				// There is no data
				alert(getLabel('FMS_COM_ALT004'));
			} else {
				var sRow = sheetObj1.GetSelectRow();
				var reqParam = '?s_bl_inv='
						+ sheetObj1.GetCellValue(sRow, "bl_no");
				// reqParam += '&s_bl_inv=' + sheetObj1.GetCellValue(sRow,
				// "bl_no");
				reqParam += '&f_his_type=' + "";
				// reqParam += '&his_call_view=' + "B/L Print";
				reqParam += '&f_cmd=' + "11";
				reqParam += '&p_gb=' + "POP";
				// reqParam += '&biz_clss_cd=' + "H";
				// reqParam += '&mbl_no=' + sheetObj1.GetCellValue(sRow, "mbl_no");
				// formObj.f_cmd.value = -1;
				popGET('MGT_HIS_0041.clt' + reqParam, '', 1240, 670,
						"scroll:yes;status:no;help:no;");
			}
			break;
		case 'BOOKING_CONFIRMATION':
			if (sheetObj1.RowCount() == 0) {
				// There is no data
				alert(getLabel('FMS_COM_ALT004'));
			} else {
				var sRow = sheetObj1.GetSelectRow();
				formObj.intg_bl_seq.value = sheetObj1.GetCellValue(sRow,"intg_bl_seq");
				/*20151117 적용 #50431 */
	   			openPopUp('B_CONFIRM');
			}
       		break;
			
			/*
			// B.Confirm PopUp
			var formObj = document.frm1;
			if (formObj.intg_bl_seq.value == "") {
				alert(getLabel('FMS_COM_ALT004'));
				return;
			}
			formObj.file_name.value = 'booking_confirmation.mrd';
			formObj.title.value = 'Booking Confirmation';
			// Parameter Setting
			var param = '';
			param += '[' + formObj.intg_bl_seq.value + ']'; // $1
			param += '[' + formObj.f_ofc_nm.value + ']';
			param += '[' + formObj.f_email.value + ']'; // 3
			param += '[' + formObj.u_ofc_cd.value + ']'; // 4
			param += '[' + formObj.f_phn.value + ']'; // 5
			param += '[' + formObj.f_fax.value + ']'; // 6
			// #24658 [GPL] Arrival Notice에다 "Place of Receipt" 추가
			if (prn_ofc_cd == "GPL") {
				param += '[]'; // 7
				param += '[Y]'; // 8
			} else {
				param += '[]'; // 7
				param += '[N]'; // 8
			}
			formObj.rd_param.value = param;
			formObj.intg_bl_seq.value = formObj.intg_bl_seq.value;
			formObj.rpt_biz_tp.value = "OEH";
			formObj.rpt_biz_sub_tp.value = "BC";
			popPOST(formObj, 'RPT_RD_0010.clt', 'popB_Confirm', 1025, 740);
			break;*/
		/*
		 * jsjang 2013.8.3 #18794 OEH Booking Confirmation Start
		 * if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),
		 * "intg_bl_seq") == ""){ //Select Please.
		 * alert(getLabel('FMS_COM_ALT004')+ "\n\n: SEE_BMD_0060.513"); return; }
		 * else{ var reqParam='?intg_bl_seq=' +
		 * docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),
		 * "intg_bl_seq"); //reqParam += '&house_bl_no=' +
		 * docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no");
		 * popGET('RPT_PRN_0221.clt'+reqParam, '', 450, 220,
		 * "scroll:yes;status:no;help:no;"); } break;
		 */
		case "PACKAGE_LABEL":
			if (sheetObj1.RowCount() == 0) {
				// There is no data
				alert(getLabel('FMS_COM_ALT004'));
			} else {
				var reqParam = '';
				reqParam += '?s_intg_bl_seq='
						+ docObjects[0].GetCellValue(docObjects[0]
								.GetSelectRow(), "intg_bl_seq");
				reqParam += '&biz_clss_cd=' + "H";
				reqParam += '&label_type=' + "01";
				popGET('SEE_BMD_0061.clt' + reqParam, '', 600, 440,
						"scroll:yes;status:no;help:no;");
			}
			break;
			
		case "PACKAGE_LABEL2":
			if (sheetObj1.RowCount() == 0) {
				// There is no data
				alert(getLabel('FMS_COM_ALT004'));
			} else {
				var reqParam = '';
				reqParam += '?s_intg_bl_seq='
						+ docObjects[0].GetCellValue(docObjects[0]
								.GetSelectRow(), "intg_bl_seq");
				reqParam += '&biz_clss_cd=' + "H";
				reqParam += '&label_type=' + "02";
				popGET('SEE_BMD_0061.clt' + reqParam, '', 600, 440,
						"scroll:yes;status:no;help:no;");
			}
			break;
		case "GOTOACCT":
			if (sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no') != '-1') {
				var formObj = document.frm1;
				var paramStr = "./ACC_INV_0040.clt?";
			 	//#34054 [BINEX]B/L List/Entry 에서 AR/AP List Link
	   		   	paramStr+= 's_hbl_no=' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no')
	   		   			 +"&s_intg_bl_seq="+sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'intg_bl_seq')
	   		   			 +"&s_ref_no="+sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no');
				parent.mkNewFrame('Invoice List', paramStr);
			}
			break;
		case "COMMODITY_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(2);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			callBackFunc = "COMMODITY_POPLIST";
			modal_center_open('./CMM_POP_0110.clt', rtnary, 556,480,"yes");
			
			break;
		case "EXCEL":
			// parent.doDeleteWin(parent.sixd);
			// alert(parent);
			// alert(parent.sixd);
			if(docObjects[0].RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
//				docObjects[0].Down2Excel({
//					HiddenColumn : true
//				});
	   			docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
	   		}
			break;
		/*Vinh.Vo (S) - 04/14/2015 */
	   	 case "EXCEL_ALL":
	        	excelDown(sheetObj1);
	        break;
	     /*Vinh.Vo (E)*/
		case "PRINT":
			if (docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"intg_bl_seq") == "-1") {
				// Select Please.
				alert(getLabel('FMS_COM_ALT004'));
				return;
			} else {
				var reqParam = '?intg_bl_seq='
						+ docObjects[0].GetCellValue(docObjects[0]
								.GetSelectRow(), "intg_bl_seq");
				reqParam += '&house_bl_no='
						+ docObjects[0].GetCellValue(docObjects[0]
								.GetSelectRow(), "bl_no");
				reqParam += '&agent_text=' + sea_body;
				/*
				 * if(user_ofc_cnt_cd=="JP"){ } else if(user_ofc_cnt_cd=="DE"){
				 * reqParam += " " +
				 * docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),
				 * "lnr_trdp_nm"); } else{
				 */
				reqParam += ", "
						+ docObjects[0].GetCellValue(docObjects[0]
								.GetSelectRow(), "lnr_trdp_nm").replaceAll('&','%26');;
				// }
				reqParam += '&mailTitle='
						+ 'House BL No : '
						+ docObjects[0].GetCellValue(docObjects[0]
								.GetSelectRow(), "bl_no");
				var trdp_cd = '';
				trdp_cd += '('
						+ '\''
						+ docObjects[0].GetCellValue(docObjects[0]
								.GetSelectRow(), "shp_trdp_cd") + '\'';
				trdp_cd += ','
						+ '\''
						+ docObjects[0].GetCellValue(docObjects[0]
								.GetSelectRow(), "prnr_trdp_cd") + '\'' + ')';
				ajaxSendPost(getMailTo, 'reqVal',
						'&goWhere=aj&bcKey=getMailTo&trdp_cd=' + trdp_cd,
						'./GateServlet.gsl');
				reqParam += '&mailTo=' + mailTo;
				popGET('RPT_PRN_0020.clt' + reqParam, '', 440, 530,
						"scroll:yes;status:no;help:no;");
			}
			break;
			
		case "HI_PRINT":
			if (sheetObj1.RowCount() == 0) {
				// There is no data
				alert(getLabel('FMS_COM_ALT004'));
			} else {
				var row = sheetObj1.GetSelectRow();
				var intgBlSeq = sheetObj1.GetCellValue(row, "intg_bl_seq");
				var refOfcCd = sheetObj1.GetCellValue(row, "ref_ofc_cd");
				formObj.title.value = "Ocean Export House B/L";
				formObj.file_name.value = "bnxd_hawaii_hbl.mrd";
				// Parameter Setting
				var param = '[' + intgBlSeq + ']';
				param += '[' + refOfcCd + ']';
				param += '[' + formObj.f_phn.value + ']';
				param += '[' + formObj.f_fax.value + ']';
				param += '[S]'; // Air/Ocean
				formObj.rd_param.value = param;
				formObj.rpt_biz_tp.value = "OEH";
				formObj.rpt_biz_sub_tp.value = "BL";
				formObj.mailTitle.value = 'House BL No : ' + docObjects[0].GetCellValue(row, "bl_no");
				
				popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			}
			break;
			
		case "COPY":
			if (docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"intg_bl_seq") == "-1") {
				// Select Please.
				alert(getLabel('FMS_COM_ALT004'));
				return;
			} else {
				if (confirm(getLabel('FMS_COM_CFMCPY'))) {
					var paramStr = "./SEE_BMD_0020.clt?";
					paramStr += "f_cmd=" + COMMAND05;
					paramStr += "&intg_bl_seq="
							+ docObjects[0].GetCellValue(docObjects[0]
									.GetSelectRow(), "intg_bl_seq");
					parent.mkNewFrame('Booking & HB/L Entry', paramStr);
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

			
			ajaxSendPost(checkBlInvReq, 'reqVal',
					'&goWhere=aj&bcKey=getCheckInv&intg_bl_seq='
							+ docObjects[0].GetCellValue(docObjects[0]
									.GetSelectRow(), "intg_bl_seq"),
					'./GateServlet.gsl');
			if (isInvStsOk) {
				// 'Do you want to delete?')){
				if (confirm(getLabel('FMS_COM_CFMDEL'))) {
					frm1.f_cmd.value = REMOVE;
					frm1.intg_bl_seq.value = docObjects[0].GetCellValue(
							docObjects[0].GetSelectRow(), "intg_bl_seq");
					frm1.rlt_intg_bl_seq.value = docObjects[0].GetCellValue(
							docObjects[0].GetSelectRow(), "rlt_intg_bl_seq");
					docObjects[0].DoSearch("./SEE_BMD_0060GS.clt",
							FormQueryString(formObj));
				}
			} else {
				// You Cannot delete HB/L. Because Invoice was already Issued.
				alert(getLabel('FMS_COM_ALT022'));
			}
			break;
		case "DOCFILE": // 첨부파일
			var reqParam = '?intg_bl_seq='+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"intg_bl_seq");
			/**  Document List ==> Common Memo 연동 파라미터 (S) */
    		reqParam += '&palt_mnu_cd='+formObj.palt_mnu_cd.value;
    		reqParam += '&opr_no='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hbl_no");
    		/**  Document List ==> Common Memo 연동 파라미터 (E) */
			reqParam += '&openMean=SEARCH01';
			popGET('./SEE_BMD_0051.clt' + reqParam, 'seeShipDoc', 806, 450,
					"scroll:no;status:no;help:no;");
			break;
		case "SNDEML": // Email전송
			var reqParam = '?intg_bl_seq='
					+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),
							"intg_bl_seq");
			reqParam += '&openMean=SEARCH01';
			popGET('./SEE_BMD_0052.clt' + reqParam, 'seeShipDoc', 471, 450,
					"scroll:no;status:no;help:no;");
			break;
		case "AES":
			if (docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no") != "-1") {
				var formObj = document.frm1;
				var paramStr = "./SEE_BMD_0120.clt?f_cmd="
						+ SEARCHLIST
						+ "&f_bl_no="
						+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),
								"bl_no");
				parent.mkNewFrame('A.E.S', paramStr);
			}
			break;
		case "SAVE":
			if (confirm(getLabel('FMS_COM_CFMSAV'))) {
				frm1.f_cmd.value = COMMAND03;
				docObjects[2].DoAllSave("./SEI_BMD_0060_3GS.clt",
						FormQueryString(frm1), true);
			}
			break;
		case "SEARCHLIST03":
			frm1.f_cmd.value = SEARCHLIST03;
			docObjects[2].DoSearch("./SEE_BMD_0070_3GS.clt",
					FormQueryString(frm1));
			// frm1.memo_txt.value = "";
			break;
		case "MBL_LIST":
			var refNo = docObjects[0].GetCellValue(
					docObjects[0].GetSelectRow(), 'ref_no');
			var mblNo = docObjects[0].GetCellValue(
					docObjects[0].GetSelectRow(), 'mbl_no');
			var paramStr = "./SEE_BMD_0070.clt?";
			paramStr += 'f_ref_no=' + refNo + '&f_mbl_no=' + mblNo;
			// alert(paramStr);
			parent.mkNewFrame('Master B/L List', paramStr);
			break;
		case "S_DOC":
			var sheetObj3 = docObjects[2];
			if (sheetObj3.RowCount() > 0) {
				var formObj = document.frm1;
				formObj.file_name.value = 'doc_list.mrd';
				formObj.title.value = 'Document List';
				// Parameter Setting
				var param = '['
						+ docObjects[0].GetCellValue(docObjects[0]
								.GetSelectRow(), "intg_bl_seq") + ']'; // [1]
				param += '['+formObj.palt_mnu_cd.value+']'; // [2] MASTER/HOUSE/OTH 여부
				param += '['
						+ docObjects[0].GetCellValue(docObjects[0]
								.GetSelectRow(), "bl_no") + ']'; // [3]
																	// MBL_NO
				param += '[' + formObj.user_id.value + ']'; // [4]
				formObj.rd_param.value = param;
				formObj.mailTitle.value = 'Master Set / Shipping Request [MBL No : '
						+ docObjects[0].GetCellValue(docObjects[0]
								.GetSelectRow(), "bl_no") + ']';
				formObj.mailTo.value = mailTo;
				popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			}
			break;
		} // end switch
	} catch (e) {
		if (e == "[object Error]") {
			// Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002'));
		} else {
			// System Error! + MSG
			alert(getLabel('FMS_COM_ERR001') + " - " + e);
		}
	}
}
/**
 * 화면에서 사용하는 메소드
 * 
 * @param doWhat
 * @param formObj
 * @return
 */
function doDisplay(doWhat, formObj) {
	switch (doWhat) {
	case 'DATE11': // 달력 조회 From ~ To 팝업 호출
		cal=new ComCalendarFromTo();
		cal.displayType = "date";
		cal.select(formObj.etd_strdt, formObj.etd_enddt, 'MM-dd-yyyy');
		break;
	case 'DATE2': // 달력 조회 팝업 호출
		var cal = new ComCalendar();
		cal.select(formObj.s_bkg_dt_tm, 'MM-dd-yyyy');
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
function goToPage(callPage) {
	docObjects[0].RemoveAll();
	document.frm1.f_CurPage.value = callPage;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList() {
	doWork('SEARCHLIST');
}
// --------------------------------------------------------------------------------------------------------------
// IBSheet 설정
// --------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;
/**
 * Sheet 기본 설정 및 초기화 body 태그의 onLoad 이벤트핸들러 구현 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을
 * 추가한다
 */
function loadPage() {
	var formObj = document.frm1;
	var s_ofc_cd = formObj.s_ofc_cd.value;
	if (s_ofc_cd != "") {
		formObj.f_ofc_cd.value = s_ofc_cd;
	}
	
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
	
	for ( var i = 0; i < docObjects.length; i++) {
		// khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i], i + 1);
		// khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
	// 사용자가 저장한 Header 정보를 읽어온다.
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "setShortcut");
	/*
	 * LHK 20131118 공통으로 처리 shortcut.add("Alt+4",function() {
	 * doWork('PROFIT_REPORT'); });
	 */
	shortcut.add("Alt+G", function() {
		sheet1_OnDblClick(docObjects[0], docObjects[0].GetSelectRow(), 1);
	});
}
function setShortcut() {
	
	doWork('SEARCHLIST');
}
/**
 * IBSheet Object를 배열로 등록 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다 배열은 소스
 * 상단에 정의
 */
function setDocumentObject(sheet_obj) {
	docObjects[sheetCnt++] = sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj, sheetNo) {
	switch (sheetNo) {
	case 1: // IBSheet1 init
		with (sheetObj) {
        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        var headers = [ { Text:getLabel('SEE_BMD_0060_HDR1'), Align:"Center"} ];
        InitHeaders(headers, info);
        var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"block_flag",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ref_ofc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"shp_mod_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"prnr_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"prnr_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"shp_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"shp_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cne_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cne_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"ntfy_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"ntfy_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"act_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"act_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"vndr_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"vndr_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"trnk_vsl_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"trnk_voy",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"lnr_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"lnr_bkg_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Image",     Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"view_mbl",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:false },
               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"exp_ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"po_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"lc_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"meas",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt1",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"doc_recpt_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"frt_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ar_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ap_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"dc_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"memo",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"proc_usr_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"post_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cust_ref_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bl_cnt",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"ref_ofc_cnt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bl_sts_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"rlt_intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" } ];
        InitColumns(cols);
        SetEditable(1);
        SetImageList(0,APP_PATH+"/web/img/button/btns_view.gif");
        SetDataLinkMouse('view_mbl',1);
        InitViewFormat(0, "etd_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
        InitViewFormat(0, "post_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
        SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
        SetSheetHeight(SYSTEM_ROW_HEIGHT*18);
        //sheetObj.SetFocusAfterProcess(1);
		}
		break;
	case 2: // IBSheet1 init
		with (sheetObj) {
        var cnt=0;
        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        var headers = [ { Text:getLabel('SEE_BMD_HDR11'), Align:"Center"} ];
        InitHeaders(headers, info);
        var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
            {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"block_flag",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
            {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"mbl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
            {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"shipper_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
            {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"shipper_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
            {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"consignee_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
            {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"consignee_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
            {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
            {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
            {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
            {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
            {Type:"Date",      Hidden:0,  Width:110,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0 },
            {Type:"Date",      Hidden:0,  Width:110,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0 },
            {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
            {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bl_sts_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
            {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 } ];
        InitColumns(cols);
        SetEditable(0);
        InitViewFormat(0, "etd_dt_tm", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
        InitViewFormat(0, "eta_dt_tm", 	    "MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
        SetSheetHeight(SYSTEM_ROW_HEIGHT*5);
        //sheetObj.SetFocusAfterProcess(0);
		}
		break;
	case 3: // 첨부파일
		with (sheetObj) {
        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0 } );
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
            {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
            {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_msg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
        InitViewFormat(0, "rgst_tms", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
        //SetAutoRowHeight(0);
        SetSheetHeight(SYSTEM_ROW_HEIGHT*8);
        sheetObj.SetFocusAfterProcess(0);
		}
		break;
	}
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
/**
 * Sheet1의 Action Menu Event
 * 
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet1_OnSelectMenu(sheetObj, MenuString) {
	var formObj = document.frm1;
	switch (MenuString) {
	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
	case "Header Setting Save":
		IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
	// Header Setting Reset
	case "Header Setting Reset":
		IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
	// 사용자가 저장한 Header Setting을 삭제한다.
	// case "Header Setting Delete":
	// IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
	// break;
	// 선택된 Column Hidden
	case "Column Hidden":
		var col = sheetObj.MouseCol();
		sheetObj.SetColHidden(col, 1);
		sheetObj.SetColWidth(col, 1);
		break;
	}
}
var curBlNo = '';
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
function sheet1_OnClick(sheetObj, Row, Col) {
	var colStr = sheetObj.ColSaveName(Col);
	if (colStr == 'view_mbl') {
		var formObj = document.frm1;
		var sheetObj1 = docObjects[0];
		var sheetObj2 = docObjects[1];
		searchSheet2(sheetObj, Row, Col);
	} else /* if(colStr=='bl_no') */{
		var formObj = document.frm1;
		var sheetObj1 = docObjects[0];
		var sheetObj3 = docObjects[2];
		formObj.intg_bl_seq.value = sheetObj1.GetCellValue(Row, "intg_bl_seq");
		/**  Document List ==> Common Memo 연동 파라미터 (S) */
		formObj.palt_mnu_cd.value="OEH";
		formObj.opr_no.value=sheetObj1.GetCellValue(Row,"hbl_no");
		/**  Document List ==> Common Memo 연동 파라미터 (E) */
		formObj.f_cmd.value = SEARCHLIST03;
		sheetObj3.DoSearch("./SEE_BMD_0060_3GS.clt", FormQueryString(formObj));
		if (docObjects[2].RowCount() == 0) {
			// formObj.memo_txt.value = "";
		}
	}
	/*
	 * else{ if(curBlNo!=''&&curBlNo!=sheetObj.GetCellValue(Row, 'bl_no')){ //
	 * docObjects[11].RemoveAll(); } }
	 */
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
function sheet1_OnDblClick(sheetObj, Row, Col) {
	var colStr = sheetObj.ColSaveName(Col);
	if (colStr != 'view_mbl') {
		var formObj = document.frm1;
		doProcess = true;
		formObj.f_cmd.value = "";
		var paramStr = "./SEE_BMD_0020.clt?f_cmd=" + SEARCHLIST + "&f_bl_no="
				+ escape(sheetObj.GetCellValue(Row, "bl_no")) + "&f_intg_bl_seq="
				+ sheetObj.GetCellValue(Row, "intg_bl_seq");
		parent.mkNewFrame('Booking & HBL', paramStr,"SEE_BMD_0020_SHEET_" +  sheetObj.GetCellValue(Row, "bl_no") + "_" + sheetObj.GetCellValue(Row, "intg_bl_seq"));
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet2에서 OnDblClick이벤트 발생시.
 * sheet2_OnDblClick(sheetObj, Row, Col) <= sheet2번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
function sheet2_OnDblClick(sheetObj, Row, Col) {
	var formObj = document.frm1;
	doProcess = true;
	formObj.f_cmd.value = "";
	var paramStr = "./SEE_BMD_0040.clt?f_cmd=" + SEARCHLIST + '&f_ref_no='
			+ sheetObj.GetCellValue(Row, 'ref_no') + "&f_intg_bl_seq="
			+ sheetObj.GetCellValue(Row, "intg_bl_seq");
	parent.mkNewFrame('Master B/L Entry', paramStr,"SEE_BMD_0040_SHEET_" + sheetObj.GetCellValue(Row, 'ref_no') + "_" + sheetObj.GetCellValue(Row, "intg_bl_seq"));
}
/**
 * sheet2 search
 */
function searchSheet2(sheetObj, Row, Col) {
	var colStr = sheetObj.ColSaveName(Col);
	var formObj = document.frm1;
	var sheetObj1 = docObjects[0];
	var sheetObj2 = docObjects[1];
	formObj.s_intg_bl_seq.value = sheetObj1.GetCellValue(Row, "intg_bl_seq");
	formObj.master_bl_no.value = sheetObj1.GetCellValue(Row, "bl_no");
	formObj.f_cmd.value = SEARCHLIST02;
	sheetObj2.DoSearch("./SEE_BMD_0060_2GS.clt", FormQueryString(formObj));
}
var CODETYPE = '';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp) {
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if (obj == '[object]' || obj =='[object HTMLInputElement]') {
		var s_code = obj.value.toUpperCase();
	} else {
		var s_code = obj;
	}
	var s_type = "";
	// if ( s_code != "" ) {
	if (tmp == "onKeyDown") {
		if (event.keyCode == 13) {
			CODETYPE = str;
			var sub_str = str.substring(0, 8);
			if (sub_str == "location") {
				s_type = sub_str;
			} else if (sub_str == "trdpCode") {
				s_type = sub_str;
			} else {
				s_type = str;
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal',
					'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
							+ '&s_code=' + s_code, './GateServlet.gsl');
		}
	} else if (tmp == "onBlur") {
		// if ( s_code != "" ) {
		CODETYPE = str;
		var sub_str = str.substring(0, 8);
		if (sub_str == "location") {
			s_type = sub_str;
		} else if (sub_str == "trdpCode") {
			s_type = sub_str;
		} else {
			s_type = str;
		}
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal',
				'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
						+ '&s_code=' + s_code, './GateServlet.gsl');
		// }
	} else if (tmp == "onChange") {
		// if ( s_code != "" ) {
		CODETYPE = str;
		var sub_str = str.substring(0, str.indexOf("_s"));
		s_type = sub_str;
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal',
				'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
						+ '&s_code=' + s_code, './GateServlet.gsl');
		// }
	}
	// }
}
// 코드표시 Ajax
function dispCodeNameAjaxReq(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	var targetFr = 'mainFrame';
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			// 조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');
			if (CODETYPE == "location_pol") {
				formObj.f_pol_por_cd.value = masterVals[0];
				formObj.f_pol_por_nm.value = masterVals[3];
			} else if (CODETYPE == "location_pod") {
				formObj.f_pod_del_cd.value = masterVals[0];
				formObj.f_pod_del_nm.value = masterVals[3];
			} else if (CODETYPE == "location_del") {
				formObj.f_del_cd.value = masterVals[0];
				formObj.f_del_nm.value = masterVals[3];
			} else if (CODETYPE == "trdpCode") {
				formObj.s_trdp_cd.value = masterVals[0];
				formObj.s_trdp_full_nm.value = masterVals[3];// loc_nm
			}
		} else {
			if (CODETYPE == "location_pol") {
				formObj.f_pol_por_cd.value = "";
				formObj.f_pol_por_nm.value = "";
			} else if (CODETYPE == "location_pod") {
				formObj.f_pod_del_cd.value = "";
				formObj.f_pod_del_nm.value = "";
			} else if (CODETYPE == "location_del") {
				formObj.f_del_cd.value = "";
				formObj.f_del_nm.value = "";
			} else if (CODETYPE == "trdpCode") {
				formObj.s_trdp_cd.value = "";
				formObj.s_trdp_full_nm.value = "";
			}
		}
	} else {
		// alert(getLabel('SEE_BMD_MSG43'));
	}
}
// 조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg) {
	for ( var i = 1; i <= sheetObj.LastRow(); i++) {
		if (sheetObj.GetCellValue(i, "bl_sts_cd") == "HF") {
			sheetObj.SetCellValue(i, "block_flag", "Y");
			sheetObj.SetCellFontColor(i, "block_flag", "#FF0000");
		}
	}
	if (frm1.f_cmd.value == REMOVE) {
		doWork("SEARCHLIST");
	}
	doDispPaging(docObjects[0].GetCellValue(1, "Indexing"), getObj('pagingTb'));
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}
function sheet2_OnSearchEnd(sheetObj, errMsg) {
	for ( var i = 1; i <= sheetObj.LastRow(); i++) {
		if (sheetObj.GetCellValue(i, "bl_sts_cd") == "HF") {
			sheetObj.SetCellValue(i, "block_flag", "Y");
			sheetObj.SetCellFontColor(i, "block_flag", "#FF0000");
		}
	}
}
function sheet1_OnChange(sheetObj, rowIdx, colIdx) {
	var colStr = sheetObj.ColSaveName(colIdx);
	if (colStr == "cls_check") {
		if (sheetObj.GetCellValue(rowIdx, 'bl_sts_cd') != 'HO') {
			sheetObj.SetCellValue(rowIdx, 'cls_check', 0, 0);
		}
	}
}
function sheet1_OnMouseMove(sheetObj, row, col) {
	if (sheetObj.MouseCol() == 0) {
		var memo = sheetObj.GetCellValue(sheetObj.MouseRow(), "memo");
		memo = memo.replaceAll("@^^@", "\n");
		sheetObj.SetToolTipText(sheetObj.MouseRow(), sheetObj.MouseCol(), memo);
	}
}
function sheet3_OnMouseMove(sheetObj, row, col) {
	if (sheetObj.MouseCol() == 9) {
		var memo = sheetObj.GetCellValue(sheetObj.MouseRow(), "palt_doc_msg");
		memo = memo.replaceAll("@^^@", "\n");
		sheetObj.SetToolTipText(sheetObj.MouseRow(), sheetObj.MouseCol(), memo);
	}
}
var isInvStsOk = false;
function checkBlInvReq(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (doc[1] == 'N') {
			isInvStsOk = false;
		} else {
			isInvStsOk = true;
		}
	}
}
function reloadDocList() {
	sheet1_OnClick(docObjects[0], docObjects[0].GetSelectRow(), 1);
}
function getSelectedFiles() {
	return docObjects[2];
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
function sheet3_OnDblClick(sheetObj, Row, Col) {
	// Name선택 시에만 팝업 호출
	if (sheetObj.ColSaveName(Col) == 'palt_doc_no'
			|| sheetObj.ColSaveName(Col) == 'palt_doc_msg') {
		var reqParam = '?intg_bl_seq=' + frm1.intg_bl_seq.value;
		reqParam += '&s_palt_doc_seq='
				+ sheetObj.GetCellValue(Row, "palt_doc_seq");
		reqParam += '&openMean=' + SEARCH02;
		popGET('./SEE_BMD_0051.clt' + reqParam, 'seeShipDocUp', 806, 450,
				"scroll:no;status:no;help:no;");
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet3_OnClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet
 * Oeject, Row, Column)
 */
function sheet3_OnClick(sheetObj, Row, Col) {
	var downType;
	var s_palt_doc_seq;
	var s_intg_bl_seq;
	switch (sheetObj.ColSaveName(Col)) {
	case "palt_doc_img_url":
		if(sheetObj.GetCellImage(Row, "palt_doc_img_url") != ""){
			s_palt_doc_seq = sheetObj.GetCellValue(Row, "palt_doc_seq");
			s_intg_bl_seq = sheetObj.GetCellValue(Row, "intg_bl_seq_d");
			downloadFile('org', s_intg_bl_seq, s_palt_doc_seq);
		}
		break;
	case "palt_doc_pdf_url":
		if(sheetObj.GetCellImage(Row, "palt_doc_pdf_url") != ""){
			s_palt_doc_seq = sheetObj.GetCellValue(Row, "palt_doc_seq");
			s_intg_bl_seq = sheetObj.GetCellValue(Row, "intg_bl_seq_d");
			downloadFile('pdf', s_intg_bl_seq, s_palt_doc_seq);
		}
		break;
	case "palt_doc_msg":
		// frm1.memo_txt.value = sheetObj.GetCellValue(Row, Col);
		break;
	} // end switch
}
function downloadFile(downType, s_intg_bl_seq, s_palt_doc_seq) {
	document.frm2.docType.value = downType;
	document.frm2.s_palt_doc_seq.value = s_palt_doc_seq;
	document.frm2.intg_bl_seq.value = s_intg_bl_seq;
	// document.frm2.target = '_self';
	document.frm2.submit();
}
function clearAll() {
	docObjects[0].RemoveAll();
	docObjects[1].RemoveAll();
	docObjects[2].RemoveAll();
	var formObj = document.frm1;
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
	formObj.f_shp_mod_cd.selectedIndex = 0;
	formObj.f_inco_cd.selectedIndex = 0;
	var collTxt = document.getElementsByTagName("INPUT"); // document 상의 모든
															// INPUT 태그 요소들을
															// 컬렉션으로 구하고...
	for ( var i = 0; i < collTxt.length; i++) {
		if (collTxt[i].type == "text") {
			collTxt[i].value = "";
		}
	}
}
function entSearch() {
	if (event.keyCode == 13) {
		document.frm1.f_CurPage.value = '';
		doWork('SEARCHLIST');
	}
}
function sheet3_OnSaveEnd(sheetObj, row, col) {
	doWork("SEARCHLIST03");
}
function sheet3_OnSearchEnd(sheetObj, row, col) {
	var formObj = document.frm1;
	/*
	 * if(docObjects[2].RowCount()>0){
	 * formObj.memo_txt.value=docObjects[2].GetCellValue(1, "palt_doc_msg"); }
	 */
}
var mailTo = "";
function getMailTo(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) == "undefined") {
			mailTo = "";
		} else {
			mailTo = doc[1];
		}
	}
}
function formValidation() {
	if (!chkSearchCmprPrd(false, frm1.etd_strdt, frm1.etd_enddt)) {
		return false;
	}
	return true;
}
// Calendar flag value
var firCalFlag = false;
function searchValueSet() {
	var formObj = document.frm1;
	formObj.f_cntr_no.value = "";
	formObj.f_po_no.value = "";
	formObj.f_lc_no.value = "";
	formObj.f_inv_no.value = "";
	formObj.f_lnr_bkg_no.value = "";
	if (formObj.f_sel_cd.value == "CNTR_NO") {
		formObj.f_cntr_no.value = formObj.f_sel_no.value;
	} else if (formObj.f_sel_cd.value == "PO_NO") {
		formObj.f_po_no.value = formObj.f_sel_no.value;
	} else if (formObj.f_sel_cd.value == "LC_NO") {
		formObj.f_lc_no.value = formObj.f_sel_no.value;
	} else if (formObj.f_sel_cd.value == "INV_NO") {
		formObj.f_inv_no.value = formObj.f_sel_no.value;
	} else if (formObj.f_sel_cd.value == "LNR_BKG_NO") {
		formObj.f_lnr_bkg_no.value = formObj.f_sel_no.value;
	}
	
	formObj.f_pol_cd.value = "";
	formObj.f_pol_nm.value = "";
	formObj.f_por_cd.value = "";
	formObj.f_por_nm.value = "";
	formObj.f_pod_cd.value = "";
	formObj.f_pod_nm.value = "";
	formObj.f_del_cd.value = "";
	formObj.f_del_nm.value = "";
	
	if (formObj.f_pol_por_sel_cd.value == "POL") {
		formObj.f_pol_cd.value = formObj.f_pol_por_cd.value;
		formObj.f_pol_nm.value = formObj.f_pol_por_nm.value;
	} else if (formObj.f_pol_por_sel_cd.value == "POR") {
		formObj.f_por_cd.value = formObj.f_pol_por_cd.value;
		formObj.f_por_nm.value = formObj.f_pol_por_nm.value;
	} 
	
	if (formObj.f_pod_del_sel_cd.value == "POD") {
		formObj.f_pod_cd.value = formObj.f_pod_del_cd.value;
		formObj.f_pod_nm.value = formObj.f_pod_del_nm.value;
	} else if (formObj.f_pod_del_sel_cd.value == "DEL") {
		formObj.f_del_cd.value = formObj.f_pod_del_cd.value;
		formObj.f_del_nm.value = formObj.f_pod_del_nm.value;
	}
}
function searchValueClear(obj) {
	
	var formObj = document.frm1;
	
	if(obj.name == "f_sel_cd"){
		formObj.f_sel_no.value = "";
	}else if(obj.name == "f_pol_por_sel_cd"){
		formObj.f_pol_por_cd.value = "";
		formObj.f_pol_por_nm.value = "";
	}else if(obj.name == "f_pod_del_sel_cd"){
		formObj.f_pod_del_cd.value = "";
		formObj.f_pod_del_nm.value = "";
	}
}
function POL_LOCATION_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_pol_por_cd.value = rtnValAry[0];// loc_cd
		formObj.f_pol_por_nm.value = rtnValAry[2];// loc_nm
	}
}
function POD_LOCATION_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_pod_del_cd.value = rtnValAry[0];// loc_cd
		formObj.f_pod_del_nm.value = rtnValAry[2];// loc_nm
	}
}
function DEL_LOCATION_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_del_cd.value = rtnValAry[0];// loc_cd
		formObj.f_del_nm.value = rtnValAry[2];// loc_nm
	}
}
function PRNR_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_prnr_trdp_nm.value = rtnValAry[2];// full_nm
	}
}
function SHIP_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_shpr_trdp_nm.value = rtnValAry[2];// full_nm
	}
}
function CNEE_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_cnee_trdp_nm.value = rtnValAry[2];// full_nm
	}
}
function ASHIP_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_ahpr_trdp_nm.value = rtnValAry[2];// full_nm
	}
}
function NTFY_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_ntfy_trdp_nm.value = rtnValAry[2];// full_nm
	}
}
function COMMODITY_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_cmdt_nm.value = rtnValAry[2];
	}
}

function setHblSizeUp(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*32);//height
}
function setHblSizeDown(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*18);//height
}

/*Vinh.Vo (S) - 04/14/2015 */

function excelDown(mySheet){
	
	var formObj = document.frm1;
	
	if(!formValidation()){
		
		return;
	}
	
	if(formObj.etd_strdt.value == ""){
		ComShowCodeMessage("COM132602");
		formObj.etd_strdt.focus();
		return;
	}
	
	formObj.f_cmd.value = COMMAND10;
	
	
	var formParam = FormQueryString(formObj);
	
	var param = {
					DownCols: makeHiddenSkipCol(mySheet)
					,SheetDesign:1
					,URL:"./SEE_BMD_0060.clt"
					,ExtendParam:formParam
					,ExtendParamMethod:"GET"
				};	
	mySheet.DirectDown2Excel(param);
}

/*Vinh.Vo (E) */