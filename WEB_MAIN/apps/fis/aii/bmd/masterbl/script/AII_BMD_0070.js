/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AII_BMD_0070.jsp
*@FileTitle  : Master B/L Search 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/11
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	//ZOOT::TODO 
	//setFromToDtEndPlus(document.frm1.eta_strdt, 90, document.frm1.eta_enddt, 30);
}
function doWork(srcName, valObj){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
    var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	var sheetObj3 = docObjects[2];
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
    	   		if(!formValidation()) return;
    	   		if(validateForm(sheetObj1, formObj, SEARCHLIST, 1)){
			   		formObj.f_cmd.value=SEARCHLIST01;
			   		sheetObj2.RemoveAll();
			   		sheetObj3.RemoveAll();
			   		sheetObj1.DoSearch("./AII_BMD_0070GS.clt", FormQueryString(formObj) );
			    }
    	   	break;
           	case "NEW":
           		var paramStr="./AII_BMD_0040.clt?f_cmd=-1";
           		parent.mkNewFrame('Master AWB Entry', paramStr);
 			break;
           	case "POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}else{
		   			rtnary[2]="";
		   		}
		   		callBackFunc = "POL_LOCATION_POPLIST";
	  	        modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
    	         
			break;
			case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}else{
		   			rtnary[2]="";
		   		}
		   		callBackFunc = "POD_LOCATION_POPLIST";
	  	        modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
    	        
			break;
			case "FIRST_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="SEA";
				rtnary[1]="BL";
				// 2011.12.27 value parameter
				if(typeof(valObj)!='undefined'){
					rtnary[2]=valObj;
				}else{
					rtnary[2]="";
				}
				callBackFunc = "FIRST_LOCATION_POPLIST";
	  	        modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
				 
			break;
	   	 	case "SHIP_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
	   	 		rtnary[0]="1";
	   	 		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "SHIP_TRDP_POPLIST";
	  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
          
	   	 	break;
	   	 	case "LNR_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   	 	rtnary=new Array(1);
		   	 	rtnary[0]="1";
		   	 	// 2011.12.27 value parameter
		   	 	if(typeof(valObj)!='undefined'){
		   	 		rtnary[1]=valObj;
		   	 	}else{
		   	 		rtnary[1]="";
		   	 	}
		   	 	rtnary[2]=window;
		   	 	//var rtnVal = window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
		   	 	callBackFunc = "LNR_TRDP_POPLIST";
	  	        modal_center_open('./CMM_POP_0010.clt?callTp=AC', rtnary, 1150,650,"yes");
		   	 	            
	   	 	break;
	   	 	case "CNEE_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
	   	 		rtnary[0]="1";
	   	 		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "CNEE_TRDP_POPLIST";
	  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 		           
	   	 	break;
	   	 	case "CargoManifest":
	   	 		if(sheetObj1.GetTotalRows()> 0){
	   	 			formObj.title.value='Cargo Manifest';
	   	 			formObj.file_name.value="cargo_manifest_ai_mbl_01.mrd";
	   	 			//Parameter Setting
	   	 			var param='[' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq") + ']';
	   	 			param += '[' + ofcCd + ']';
	   	 			formObj.rd_param.value=param;
	   	 			formObj.intg_bl_seq.value=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					formObj.rpt_biz_tp.value="AIM";
	    			formObj.rpt_biz_sub_tp.value="MF";
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);//Fax Test - PJK
					formObj.intg_bl_seq.value="";
					formObj.rpt_biz_tp.value="";
	    			formObj.rpt_biz_sub_tp.value="";
				}
	 		break;
	   	 	case "S_DOC":
        		var sheetObj3=docObjects[2];	
	   	 		if(sheetObj3.GetTotalRows()> 0){
	   	 			formObj.title.value='Document List';
	   	 			formObj.file_name.value="doc_list.mrd";
	   	 			//Parameter Setting
	   	 			var param='[' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") + ']';	// [1]
	   	 			param += '['+formObj.palt_mnu_cd.value+']';                                                     // [2]  MASTER/HOUSE/OTH 여부
	   	 			param += '[' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no") + ']';				// [3] MBL_NO
	   	 			param += '[' + formObj.user_id.value + ']';	                                                // [4]
	   	 			formObj.rd_param.value=param;
	   	 			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   	 		}
	   	 		break;
	   	 	case "ArrivalNotice":
		   	 	if(sheetObj1.GetTotalRows()== 0){
		   	 		//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
				}else{
					var sRow=sheetObj1.GetSelectRow();
					var reqParam='?air_sea_tp=' + 'A';
					reqParam += '&intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
					reqParam += '&mbl_no=' + sheetObj1.GetCellValue(sRow, "bl_no");
					reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
					reqParam += '&cgor_pic_info=' + ai_cgor_pic_info;
					popGET('RPT_PRN_0150.clt'+reqParam, '', 850, 700, "scroll:yes;status:no;help:no;");
				}
           	break;
	   	 	case "CCN":
	   	 		if(sheetObj1.GetTotalRows()== 0){
	   	 			//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 		} else {
	   	 			ajaxSendPost(searchHouseBlSeqAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getHouseBlSeq&mbl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq"), './GateServlet.gsl');
	   	 		}
	   	 		break;
           	// AUTHORITY 팝업 호출
		   	case "AUTHORITY":
		   		var sRow=sheetObj1.GetSelectRow();
		   		rtnary=new Array(4);		   		
//			   	rtnary[0] = formObj.f_intg_bl_seq.value;
//			   	rtnary[1] = formObj.h_ref_no.value;
//			   	rtnary[2] = formObj.f_mawb_no.value;
				rtnary[0]=sheetObj1.GetCellValue(sRow, "intg_bl_seq");
				rtnary[1]=sheetObj1.GetCellValue(sRow, "ref_no");
				rtnary[2]=sheetObj1.GetCellValue(sRow, "bl_no");
				rtnary[3]=sheetObj1.GetCellValue(sRow, "ref_ofc_cd");
			   	if(sheetObj1.GetTotalRows()== 0){
			   		//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
				}else{
//			   		var rtnVal = window.showModalDialog('./ARI_DOC_1010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:430px", window);
//			   	    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
//			   	    	return;
//					} 
					var reqParam='?intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
					reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
					reqParam += '&mbl_no=' + sheetObj1.GetCellValue(sRow, "bl_no");
					reqParam += '&ref_ofc_cd=' + sheetObj1.GetCellValue(sRow, "ref_ofc_cd");
					popGET('ARI_DOC_1010.clt'+reqParam, '', 700, 430, "scroll:yes;status:no;help:no;");
			   	}	
	       	break;
		   	case "PROFIT_REPORT":
		   	 	if(sheetObj1.GetTotalRows()== 0){
		   	 		//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
				}else{
					var sRow=sheetObj1.GetSelectRow();
						var reqParam='?intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
						reqParam += '&mbl_no=' + sheetObj1.GetCellValue(sRow, "bl_no");
						reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
						reqParam += '&air_sea_clss_cd=' + "A";
						reqParam += '&bnd_clss_cd=' + "I";
						reqParam += '&biz_clss_cd=' + "M";
					popGET('RPT_PRN_0180.clt'+reqParam, '', 1130, 750, "scroll:yes;status:no;help:no;");
				}
	   	 	break;	
		   	case "PROFIT_REPORT_BY_HBL":
		   	 	if(sheetObj1.GetTotalRows()== 0){
		   	 		//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
				}else{
					var sRow=sheetObj1.GetSelectRow();
						var reqParam='?intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
						reqParam += '&mbl_no=' + sheetObj1.GetCellValue(sRow, "bl_no");
						reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
						reqParam += '&air_sea_clss_cd=' + "A";
						reqParam += '&bnd_clss_cd=' + "I";
						reqParam += '&biz_clss_cd=' + "M";
					popGET('RPT_PRN_0190.clt'+reqParam, '', 1100, 670, "scroll:yes;status:no;help:no;");
				}
	   	 	break;	
		   	case "GOTOACCT":
		   		if(sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no')!='-1' || sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no')!='-1'){
		   	 		var formObj=document.frm1;
		   		   	var paramStr="./ACC_INV_0040.clt?";
		   		   	/* #23987, s_mbl_no 링크제거 jsjang 2013.11.25 */
		   		   	//24842 oyh Mbl에서 AP를 눌렀을 경우 Vendor inv no에 MBLno가 세팅안됨 으로 기존 로직으로 재수정
						paramStr+= "s_mbl_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no');
						paramStr+= "&s_intg_bl_seq=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'intg_bl_seq');
						paramStr+= "&s_ref_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no');
           			//#22112 Billing Carrier 추가 
						paramStr+= "&s_carr_trdp_cd=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'carr_trdp_cd');
						paramStr+= "&s_carr_trdp_nm=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'carr_trdp_nm');
						parent.mkNewFrame('Invoice List', paramStr);
	   	 		}
	   	 	break;
		   	case "EXCEL":
		   		if(docObjects[0].RowCount() < 1){//no data	
	    			ComShowCodeMessage("COM132501");
	    		}else{
	    			docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
	    		}
	   	 	break;
		   	case "MAWB_COPY":
		   		if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") == "-1"){
	   				//Select Please.
	   				alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}
		   		else{
	   	 			if(confirm(getLabel('FMS_COM_CFMCPY'))){
	   	 				var paramStr="./AII_BMD_0040.clt?";
	   	 				paramStr+= "f_cmd=" + COMMAND02;
	   	 				paramStr+= "&intg_bl_seq=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	   	 				parent.mkNewFrame('Master AWB Entry', paramStr);
	   	 			}
	   	 		}
		   		break;
		   	case "MAWB_DELETE":
		   		

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
		   					
		   		ajaxSendPost(doRmvSrInfo, 'reqVal', '&goWhere=aj&bcKey=getHblClsChk&biz_clss_cd=M&intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq"), './GateServlet.gsl');
   	 		break;
		   	case "DOCFILE":	//첨부파일
		   		var reqParam='?intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
			   		/**  Document List ==> Common Memo 연동 파라미터 (S) */
	        		reqParam += '&palt_mnu_cd='+formObj.palt_mnu_cd.value;
	        		reqParam += '&opr_no='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ref_no");
	        		/**  Document List ==> Common Memo 연동 파라미터 (E) */
	        		reqParam += '&openMean=SEARCH01';
	    	   		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDoc', 806, 420, "scroll:no;status:no;help:no;");
	    	break;
	   	 	case "SNDEML":	//Email전송
	   	 		var reqParam='?intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	       		reqParam += '&openMean=SEARCH01';
	   	   		popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
	   	    break;
	   	 	case "MAWB_CLAIM":
	   	 		if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq")!=""){
		   			var formObj=document.frm1;
		   			ajaxSendPost(getHAWBList, 'reqVal', '&goWhere=aj&bcKey=getHAWBList&intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq"), './GateServlet.gsl');
		   		}
		   	break;
	   	 	case "SAVE":
	   	 		

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
	   	 					
	   	 		frm1.f_cmd.value=COMMAND03;
	   	 		docObjects[2].DoAllSave("./SEI_BMD_0060_3GS.clt", FormQueryString(frm1), true);
	   	 	break;
	   	 	case "SEARCHLIST03":
	   	 		frm1.f_cmd.value=SEARCHLIST03;
	   	 		docObjects[2].DoSearch("./SEE_BMD_0070_3GS.clt", FormQueryString(frm1) );
//				frm1.memo_txt.value = "";
	   	 	break;
	   	 	case "CARGO_TRACKING":
				var blNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
				var liner=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "lnr_trdp_nm");
		   	 	if(sheetObj1.GetTotalRows()== 0 || blNo == ""){
		   	 		//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
		   	 	}else{
		   	 		var preBlNo=blNo.substring(0,3);
		   	 		var popLink="";
		   	 		var reqParam=""; 
		   	 		/*
		   	 		if(preBlNo == "180"){
		   	 			popLink="http://cargo.koreanair.com/ecus/trc/servlet/TrackingServlet?pid=5&version=eng";
		   	 			reqParam="&awb_no=" + blNo.replaceAll("-","");
		   	 		}else if(preBlNo == "988"){
		   	 			if(blNo.indexOf("-") == -1){
		   	 				blNo=preBlNo + "-" + blNo.substring(3);
		   	 			}
		   	 			popLink="http://www.asianacargo.co.kr/English/tracking/trk_master_air_waybill_result_popup.jsp?frmFlag=SND&Language=ENG";
		   	 			reqParam="&frmBillNum=" + blNo;
		   	 		}else if(preBlNo == "403"){
		   	 			popLink="http://www.polaraircargo.com/tracking.asp";
		   	 		}else if(preBlNo == "160"){
		   	 			popLink="http://www.cathaypacificcargo.com/usrapps/identity/home.aspx";
		   	 		}else if(preBlNo == "016"){
		   	 			popLink="http://www.unitedcargo.com/";
		   	 		}else if(preBlNo == "023"){
		   	 			popLink="https://ftn.fedex.com/app/quickfind/QuickFindIntroduction_en.jsp";	
		   	 		}else if(preBlNo == "131"){
		   	 			popLink="http://www.jal.co.jp/en/jalcargo/inter/jproducts/jtr.html";
		   	 		}else if(preBlNo == "618"){
		   	 			popLink="http://www.siacargo.com/";
		   	 		}else if(preBlNo == "020"){
		   	 			popLink="http://www.lhcargo.com/trackit/awb.trackit?referrer=myCargo&prefix=020&awb=Multiple+AWB+check";
		   	 		}else{
//		   	 			alert("Only KE and OZ can access to Cargo Tracking");
		   	 			alert(getLabel('AIR_MSG_042'));
		   	 			return;
		   	 		}
		   	 		*/
		   	 		//* jsjang 2013.8.20 #20332 : Track-Trace 기능 OPUS FWD 적용 건 */
		   	 		/* jsjang 2013.9.11 #20775 carrier link - MBL */
		   	 		popLink='http://connect.track-trace.com/for/opus/aircargo/'+blNo;
		   	 		window.open(popLink + reqParam, "_blank");
//					popGET(popLink + reqParam, '', 480, 500, "scroll:yes;status:no;help:no;");
				}
	   	 	break;
	   	 	case "HBL_LIST":
				var refNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'ref_no');
				var mblNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'bl_no');
			   	var paramStr="./AII_BMD_0060.clt?";
			   	paramStr+= 'f_ref_no=' + refNo + '&f_mbl_no=' + mblNo;
			   	parent.mkNewFrame('House B/L List', paramStr);
	   	 	break;
	   	 	//#27548 [BINEX]BL 공통-HC 단축키 추가
	   	 	case "HBL_ENTRY":
	   	 		if (docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "HC") != "") {
	   	 			var refNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'ref_no');
	   	 			if(refNo !=''){
		   	 			var paramStr="./AII_BMD_0020.clt?";
		   	 			paramStr+= "f_mbl_ref_no=" + refNo;
		   	 			paramStr+= "&f_pre_ccn_no=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'ccn_no');
		   	 			paramStr+= "&f_mnf_fr_loc=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'mnf_fr_loc');
		   	 			paramStr+= "&f_mnf_to_loc=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'mnf_to_loc');
		   				parent.mkNewFrame('Booking & HBL', paramStr);
	   	 			}
	   	 		}
	   	 		break;

		   	/* #20962, Log history, jsjang 2013.10.11 */
	   	 	case "LOG":
		   	 	if(sheetObj1.GetTotalRows()== 0){
		   	 		//There is no data
		   	 		alert(getLabel('FMS_COM_ALT004'));
				}
		   	 	else{
		   	 		if(sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no") == '')
		   	 		{
		   	 			alert(getLabel('FMS_COM_ALT050'));
		   	 		}else{		   	 		
		   	 			var sRow=sheetObj1.GetSelectRow();
		   	 			var reqParam='?s_bl_inv=' + sheetObj1.GetCellValue(sRow, "bl_no");
						//reqParam += '&s_bl_inv=' + sheetObj1.CellValue(sRow, "bl_no");
						reqParam += '&f_his_type=' + "";
						//reqParam += '&his_call_view=' + "Ocean Export SR";
						reqParam += '&f_cmd=' + "11";
						reqParam += '&p_gb=' + "POP";
						//reqParam += '&biz_clss_cd=' + "H";
						//reqParam += '&mbl_no=' + sheetObj1.CellValue(sRow, "mbl_no");
						//formObj.f_cmd.value = -1;
						popGET('MGT_HIS_0041.clt'+reqParam, '', 1240, 670, "scroll:yes;status:no;help:no;");
		   	 		}
				}
		   	 	break;
	   	    case "OPR_POPLIST":
	            rtnary =new Array(1);
	   		    rtnary[0]="1";
	   		    callBackFunc = "OPR_POPLIST";
			    modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
	   	    break;
        } // end switch
	}catch(e){
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
            cal.select(formObj.etd_strdt,  formObj.etd_enddt, 'MM-dd-yyyy');
        break;
        case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.eta_strdt,  formObj.eta_enddt, 'MM-dd-yyyy');
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
	var formObj=document.frm1;
//	if(formObj.f_h_ofc_cd.value != ""){
//		formObj.f_ofc_cd.value = formObj.f_h_ofc_cd.value;
//	}
	
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
            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('AII_BMD_0070_HDR1'), Align:"Center"} ];
            InitHeaders(headers, info);
            var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"block_flag",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Image",     Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"HC",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:40,   Align:"Left",    ColMerge:0,   SaveName:"ref_ofc_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"hbl_cnt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm1",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm2",     KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm1",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm2",     KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"flt_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"shpr_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"shpr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cnee_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cnee_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"lnr_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"carr_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"carr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Image",     Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"view_hbl",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:0,   SaveName:"ts1_port_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:0,   SaveName:"ts2_port_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:0,   SaveName:"ts3_port_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"first_port_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"first_port_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"imp_ref_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"ccn_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"mnf_fr_loc",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"mnf_to_loc",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"frt_chk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ar_chk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ap_chk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"dc_chk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"memo",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"proc_usr_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
                {Type:"Text",      Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"post_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bl_sts_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 } ];
            InitColumns(cols);
            SetEditable(1);
            SetImageList(0,APP_PATH+"/web/img/button/btns_hc.gif");
            SetImageList(1,APP_PATH+"/web/img/button/btns_view.gif");
            SetDataLinkMouse('HC',1);
            SetDataLinkMouse('view_hbl',1);
            SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
            SetSheetHeight(SYSTEM_ROW_HEIGHT*18);
            //sheetObj.SetFocusAfterProcess(1);
		   }                                                      
		break;
		 case 2:      //IBSheet1 init
		    with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('AII_BMD_HDR10'), Align:"Center"} ];
		        InitHeaders(headers, info);
		        var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"block_flag",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bkg_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"shipper_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"shipper_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"consignee_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"consignee_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"liner_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"liner_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:110,   Align:"Center",  ColMerge:0,   SaveName:"cfm_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:110,   Align:"Center",  ColMerge:0,   SaveName:"clz_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bl_sts_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 } ];
		        InitColumns(cols);
		        SetEditable(1);
		        SetSheetHeight(SYSTEM_ROW_HEIGHT*9);
		        //sheetObj.SetFocusAfterProcess(0);
		   }                                                      
		break;
		 case 3:					//첨부파일
		     with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('AII_BMD_0070_HDR3'), Align:"Center"} ];
             InitHeaders(headers, info);
             var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"doc_ibflag" },
				{Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"Del",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				{Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"palt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				{Type:"Text",      Hidden:0,  Width:55,   Align:"Center",  ColMerge:0,   SaveName:"palt_ext_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
	if(colStr=='view_hbl'){	
		var formObj=document.frm1;
	    var sheetObj1=docObjects[0];
		var sheetObj2=docObjects[1];
	  	searchSheet2(sheetObj,Row,Col);
	} else if(colStr=='HC' && sheetObj.GetCellValue(Row, "HC") != ""){
	if(sheetObj.GetCellValue(Row, 'ref_no') !=''){
			var paramStr="./AII_BMD_0020.clt?";
			paramStr+= "f_mbl_ref_no=" + sheetObj.GetCellValue(Row, 'ref_no');
			paramStr+= "&f_pre_ccn_no=" + sheetObj.GetCellValue(Row, 'ccn_no');
			paramStr+= "&f_mnf_fr_loc=" + sheetObj.GetCellValue(Row, 'mnf_fr_loc');
			paramStr+= "&f_mnf_to_loc=" + sheetObj.GetCellValue(Row, 'mnf_to_loc');
			parent.mkNewFrame('Booking & HBL', paramStr);
   		}
	}else /*if(colStr=='bl_no')*/{
		var formObj=document.frm1;
		var sheetObj1=docObjects[0];
		var sheetObj3=docObjects[2];
		formObj.intg_bl_seq.value=sheetObj1.GetCellValue(Row,"intg_bl_seq");
		/**  Document List ==> Common Memo 연동 파라미터 (S) */
		formObj.palt_mnu_cd.value="AIM";
		formObj.opr_no.value=sheetObj1.GetCellValue(Row,"ref_no");
		/**  Document List ==> Common Memo 연동 파라미터 (E) */
		formObj.f_cmd.value=SEARCHLIST03;
		sheetObj3.DoSearch("./AII_BMD_0070_3GS.clt", FormQueryString(formObj) );
		if(docObjects[2].GetTotalRows()==0){
//			formObj.memo_txt.value = "";
		}
	}
	/*
	else{
if(curBlNo!=''&&curBlNo!=sheetObj.GetCellValue(Row, 'bl_no')){
			docObjects[1].RemoveAll();
		}
	}
	*/
	//AUTHORITY 팝업을 호출하기 위해 INTG_BL_SEQ 값을 담는다.
		document.frm1.f_intg_bl_seq.value=docObjects[0].GetCellValue(Row, "intg_bl_seq");
		document.frm1.h_ref_no.value=docObjects[0].GetCellValue(Row, "ref_no");
		document.frm1.f_mawb_no.value=docObjects[0].GetCellValue(Row, "bl_no");
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr!='view_hbl'){
		var formObj=document.frm1;
	   	var paramStr="./AII_BMD_0040.clt?f_cmd="+SEARCHLIST;
	   	paramStr+= '&f_ref_no='+escape(sheetObj.GetCellValue(Row, 'ref_no'));
	   	parent.mkNewFrame('Master AWB Entry', paramStr, "AII_BMD_0040_SHEET_" + sheetObj.GetCellValue(Row, 'ref_no'));
	}
}
function sheet2_OnDblClick(sheetObj,Row,Col){
var hblNo=sheetObj.GetCellValue(Row, 'hbl_no');
	if(sheetObj.ColSaveName(Col)!='del_icon'&&hblNo!=''){
	   	var paramStr="./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+hblNo;
	   	parent.mkNewFrame('Booking & House AWB Entry', paramStr,"AII_BMD_0020_SHEET_" + hblNo);
	}
}
/**
 * sheet2 search
 */
function searchSheet2(sheetObj,Row,Col){
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	formObj.s_intg_bl_seq.value=sheetObj1.GetCellValue(Row,"intg_bl_seq");
	formObj.master_bl_no.value=sheetObj1.GetCellValue(Row,"bl_no");
	formObj.f_cmd.value=SEARCHLIST02;
	sheetObj2.DoSearch("./AII_BMD_0070_1GS.clt", FormQueryString(formObj) );
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
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value=masterVals[0];
				formObj.f_pod_nm.value=masterVals[3];
			}else if(CODETYPE == "location_first"){
				formObj.f_first_port_cd.value=masterVals[0];
				formObj.f_first_port_nm.value=masterVals[3];
			}else if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=masterVals[0]; 
				formObj.f_trdp_full_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value="";
				formObj.f_pod_nm.value="";
			}else if(CODETYPE == "location_first"){
				formObj.f_first_port_cd.value="";
				formObj.f_first_port_nm.value="";
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
	//#29408 [BINEX]B/L List 검색조건 추가
	/*
	var formObj=document.frm1; 
	if (formObj.f_bl_cd.value == "HAWB_No"){
		sheetObj.SetColHidden(3,0);
		sheetObj.SetColHidden(8,1);
		var fMlbNo=formObj.f_mbl_no.value;
		var tfMlbNo="";
		if (fMlbNo != null) {
			tfMlbNo=trim(fMlbNo);
		}
		if( fMlbNo == null || tfMlbNo == "") {
			sheetObj.SetColHidden(3,1);
			sheetObj.SetColHidden(8,0);
			formObj.f_bl_cd.value="MAWB_No";
		}
	} else {
		sheetObj.SetColHidden(3,1);
		sheetObj.SetColHidden(8,0);
	}
	*/
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "bl_sts_cd") == "HF") {
			sheetObj.SetCellValue(i, "block_flag","Y");
			sheetObj.SetCellFontColor(i, "block_flag","#FF0000");
		}
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
function sheet1_OnMouseMove(sheetObj, row, col){
	if(sheetObj.MouseCol()==0){
		var memo=sheetObj.GetCellValue(sheetObj.MouseRow(), "memo");
		memo=memo.replaceAll("@^^@", "\n");
		sheetObj.SetToolTipText(sheetObj.MouseRow(), sheetObj.MouseCol(),memo);
	}
}
function setMblSizeUp(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*32);//height
}
function setMblSizeDown(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*18);//height
}
function setHblSizeUp(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*16);//height
}
function setHblSizeDown(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*9);//height
}
function doRmvSrInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
		   if(doc[1]==0){
			   //invoice 생성 유무를 체크한다.
			   ajaxSendPost(checkBlInvReq, 'reqVal', '&goWhere=aj&bcKey=getCheckInv&intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq"), './GateServlet.gsl');
    		   if(isInvStsOk){
    			   if(confirm(getLabel('FMS_COM_CFMDEL'))){
	                   frm1.f_cmd.value=REMOVE;
	                   frm1.intg_bl_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	                   docObjects[0].DoSearch("./AII_BMD_0070GS.clt", FormQueryString(formObj) );
	        	   }
    		   }else{
    			   //'You Cannot delete MAWB. Because Invoice was already Issued.'
    			   alert(getLabel('AIR_MSG_043'));
    		   }
		   }else{
			   //'Please delete the HAWB in advance.'
			   alert(getLabel('AIR_MSG_044'));
		   }
		}
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
			popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDocUp', 806, 550, "scroll:no;status:no;help:no;");
		}
	}
function sheet3_OnMouseMove(sheetObj, row, col){
	if(sheetObj.MouseCol()==9){
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
        case "palt_doc_msg":
//        	frm1.memo_txt.value = sheetObj.CellValue(Row, Col);
        break;
	}
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
	formObj.f_hbl_tp_cd.selectedIndex=0;
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
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
function getHAWBList(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpArray=doc[1].split('@@@');
			//HAWB 1개면 바로 프린트
			if(tmpArray.length<3){
				var result=tmpArray[0].split("^^^");
				formObj.file_name.value="pre_claim.mrd";
	   			formObj.title.value="PRE-CLAIM";
	   			// Parameter Setting
	   			var param='';
	   			param += '[' + result[0] + ']'; // $1
	   			param += '/reditmode /rfixallobject';
	   			formObj.rd_param.value=param;
	   			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			}else{
				rtnary=new Array(1);		   		
				rtnary[0]=tmpArray;
				var rtnVal =  window.showModalDialog('./AII_BMD_0071.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:190px;dialogHeight:230px");
				if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					return;
				}else{
					var rtnValAry=rtnVal.split("@@@");
					for(var i=0 ; i<rtnValAry.length-1 ; i++){
						var result=rtnValAry[i].split("^^^");
						formObj.file_name.value += "^@@^";
						formObj.rd_param.value += "^@@^";
						//pre-claim report multi print out
						formObj.file_name.value=formObj.file_name.value + "pre_claim.mrd";
			   			formObj.title.value="PRE-CLAIM";
			   			// Parameter Setting
			   			var param='';
			   			param += '[' + result[0] + ']'; // $1
			   			param += '/reditmode /rfixallobject';
			   			formObj.rd_param.value += param;
					}
					formObj.file_name.value=formObj.file_name.value.substring(4);
					formObj.rd_param.value=formObj.rd_param.value.substring(4);
					popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
				}
			}
		}else{
//			alert("There is no HAWB.");
			alert(getLabel('AIR_MSG_045'));
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function sheet3_OnSaveEnd(sheetObj, row, col){
	doWork("SEARCHLIST03");
}
function sheet3_OnSearchEnd(sheetObj, row, col){
	var formObj=document.frm1;
//	if(docObjects[2].SearchRows>0){
//		formObj.memo_txt.value = docObjects[2].CellValue(1, "palt_doc_msg");
//	}
}
function formValidation(){
	if(!chkSearchCmprPrd(false, frm1.etd_strdt, frm1.etd_enddt)){
		return false;
	}
	if(!chkSearchCmprPrd(false, frm1.eta_strdt, frm1.eta_enddt)){
		return false;
	}
	return true;
}
//Calendar flag value
var firCalFlag=false;
function searchHouseBlSeqAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if (doc[1] == "" || doc[1] == "undefined" || doc[1] == undefined) {
			alert(getLabel('FMS_COM_ALT010'));	
			return;
		}else{
			var rtnArr=doc[1].split('@@');
			if (rtnArr.length > 0 ) {
				printHouseCcn(rtnArr);
			} else {
				alert(getLabel('FMS_COM_ALT010'));	
			}
		}
	}else{
		alert(getLabel('FMS_COM_ALT010'));	
	}
}
function printHouseCcn(hbl_seq_list){
	// templet 설정
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
	for (var i=0; i< hbl_seq_list.length; i++) {
		for (var j=0; j< end_txt.length; j++) {
			if (i != 0 || j != 0){
				ttlFileName += '^@@^cargo_control_no.mrd';
				param +=  "^@@^";
			}		
			param += '[' + hbl_seq_list[i] + ']';				// [1] Intg_bl_seq			
			param += '[' + ofcCd + ']';							// [2] ofc_cd
			param += '[' + frm1.f_phone.value + ']';			// [3] tel
			param += '[' + frm1.f_fax.value + ']';				// [4] fax
			param += '[' + frm1.f_email.value + ']';			// [5] email
			param += '[' + end_txt[j] + ']';					// [6] end_txt
		}
	}
	frm1.file_name.value=ttlFileName;
	frm1.rd_param.value=param;
	popPOST(frm1, 'RPT_RD_0030.clt', 'popTest', 1025, 740);	
}

function POL_LOCATION_POPLIST(rtnVal){
  	var formObj=document.frm1;
  	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pol_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pol_nm.value=rtnValAry[2];//loc_nm
	}
  }

function POD_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
  	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
	} 
  }

function FIRST_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
  	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_first_port_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_first_port_nm.value=rtnValAry[2];//loc_nm
	}
  }

function SHIP_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_shpr_trdp_nm.value=rtnValAry[2];//full_nm
		}   
  }

function LNR_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
 	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
 	}else{
 		var rtnValAry=rtnVal.split("|");
 		formObj.f_lnr_trdp_nm.value=rtnValAry[2];//full_nm
 	} 
}

function CNEE_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
  	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
		}else{
			var rtnValAry=rtnVal.split("|");
			formObj.f_cnee_trdp_nm.value=rtnValAry[2];//full_nm
		}  
  }

function searchValueClear(){
	var formObj = document.frm1;

	formObj.f_mbl_no.value = "";
	
}