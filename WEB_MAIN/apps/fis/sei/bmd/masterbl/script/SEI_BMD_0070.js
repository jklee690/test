/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEI_BMD_0070.jsp
*@FileTitle  : MBL Search 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/14
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

function initFinish(){
	//var pDoc=parent.parent.parent.document;
	//hideProcess('WORKING', pDoc);
	//ZOOT::TODO
	//setFromToDtEndPlus(document.frm1.eta_strdt, 180, document.frm1.eta_enddt, 60);	
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
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
    	   		if(!formValidation()) return;
    	   		if(validateForm(sheetObj1, formObj, SEARCHLIST, 1)){
			   		formObj.f_cmd.value=SEARCHLIST01;
			   		sheetObj2.RemoveAll();
			   		sheetObj3.RemoveAll();
			   		sheetObj1.DoSearch("./SEI_BMD_0070GS.clt", FormQueryString(formObj) );
			    }
			    break;
           	case "NEW":
           		var paramStr="./SEI_BMD_0040.clt?f_cmd=-1";
           		parent.mkNewFrame('Master B/L Entry', paramStr);
           	break;
           	case "POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
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
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
    	         
    	        break;
           	case "POR_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
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
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
    	         
    	        break;
			case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
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
				rtnary=new Array(1);
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
			case "PRNR2_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
		   		
		   		callBackFunc = "PRNR2_TRDP_POPLIST";
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
	   	 	case "CARR_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
		   		
		   		callBackFunc = "CARR_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt?callTp=LN', rtnary, 1150,650,"yes");
	   	 		             
	   	 		break;
	   	 	case "CY_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
		   	 	callBackFunc = "CY_TRDP_POPLIST";
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
	   	 	case "CargoManifest":
		   	 	if(sheetObj1.RowCount()== 0){
		   	 		//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
				}else{
					var paramUrl="RPT_PRN_0010.clt";
					paramUrl += "?cmd_type=67&intg_bl_seq=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					paramUrl += '&rpt_biz_tp=OIM&rpt_biz_sub_tp=MF';
					popPOST(formObj, paramUrl, 'popTest', 1025, 740);
				}
		   	 	break;
	   	 	case "ArrivalNotice":
				if(sheetObj1.RowCount()== 0){
					//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
				}
				else{
					var sRow=sheetObj1.GetSelectRow();
					var reqParam='?air_sea_tp=' + 'S';
					reqParam += '&intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
					reqParam += '&mbl_no=' + encodeURIComponent(sheetObj1.GetCellValue(sRow, "bl_no"));
					reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
					reqParam += '&cgor_pic_info=' + oi_cgor_pic_info;
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
	   	 	case "USDA_HOLD_NOTICE":
	   	 		if(sheetObj1.GetTotalRows()== 0){
	   	 			//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
	   	 		}
	   	 		else{
					var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var custRefNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_ref_no");
	   	 			var reqParam='';
	   	 			reqParam += '?s_rlt_intg_bl_seq=' + intgBlSeq;
	   	 			reqParam += '&f_bl_no=' + hblNo;
	   	 			reqParam += '&cust_ref_no=' + custRefNo;
	   	 			popGET('SEE_BMD_0065.clt'+reqParam, '', 700, 700, "scroll:yes;status:no;help:no;");
	   	 		}
	   	 		break;
	   	 	case "PROFIT_REPORT":
		   	 	if(sheetObj1.GetTotalRows()== 0){
		   	 		//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
				}
		   	 	else{
					var sRow=sheetObj1.GetSelectRow();
						var reqParam='?intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
						reqParam += '&mbl_no=' + sheetObj1.GetCellValue(sRow, "bl_no");
						reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
						reqParam += '&air_sea_clss_cd=' + "S";
						reqParam += '&bnd_clss_cd=' + "I";
						reqParam += '&biz_clss_cd=' + "M";
					popGET('RPT_PRN_0180.clt'+reqParam, '', 1130, 750, "scroll:yes;status:no;help:no;");
				}
		   	 	break;	
	   	 	case "PROFIT_REPORT_BY_HBL":
		   	 	if(sheetObj1.GetTotalRows()== 0){
		   	 		//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
				}
		   	 	else{
					var sRow=sheetObj1.GetSelectRow();
						var reqParam='?intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
						reqParam += '&mbl_no=' + sheetObj1.GetCellValue(sRow, "bl_no");
						reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
						reqParam += '&air_sea_clss_cd=' + "S";
						reqParam += '&bnd_clss_cd=' + "I";
						reqParam += '&biz_clss_cd=' + "M";
					popGET('RPT_PRN_0190.clt'+reqParam, '', 1100, 670, "scroll:yes;status:no;help:no;");
				}
		   	 	break;	
		   	case 'OUTPRINT':
	      	   frm1.file_name.value='outofstatelog_01.mrd';
	      	   frm1.title.value='OUT OF STATE LOG SHEET';
		   		   //Parameter Setting
					var param='[' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq") + ']';		// [1]
					param += '[' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "ref_ofc_cd")+'MAINCMP]';		// CURR BRANCH [3]
		   		   param += '[' + frm1.f_usr_nm.value + ']';												// [3]
		   		   frm1.rd_param.value=param;
		   		   popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
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
//		   			docObjects[0].Down2Excel({ HiddenColumn:true});
		   			docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
		   		}
	   	 		break;
	   	 	/*Vinh.Vo (S) - 04/14/2015 */
		   	 case "EXCEL_ALL":
		        	excelDown(sheetObj1);
		        break;
		     /*Vinh.Vo (E)*/
		   	case "MBL_COPY":
		   		if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") == "-1"){
	   	 			//Select Please.
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}
		   		else{
	   	 			if(confirm(getLabel('FMS_COM_CFMCPY'))){
	   	 				var paramStr="./SEI_BMD_0040.clt?";
	   	 				paramStr+= "f_cmd=" + COMMAND03;
	   	 				paramStr+= "&intg_bl_seq=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	   	 				parent.mkNewFrame('Master B/L Entry', paramStr);
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

				
		   		ajaxSendPost(doRmvSrInfo, 'reqVal', '&goWhere=aj&bcKey=getHblClsChk&biz_clss_cd=M&intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq"), './GateServlet.gsl');
		   		break;
		   	case "DOCFILE":	//첨부파일
		   		var reqParam='?intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
			   		/**  Document List ==> Common Memo 연동 파라미터 (S) */
	        		reqParam += '&palt_mnu_cd='+formObj.palt_mnu_cd.value;
	        		reqParam += '&opr_no='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ref_no");
	        		/**  Document List ==> Common Memo 연동 파라미터 (E) */
	        		reqParam += '&openMean=SEARCH01';
	    	   		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDoc', 806, 450, "scroll:no;status:no;help:no;");
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
	   	 	case "devanningSegregation":
	   	 		if(sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no')!='-1' || sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no')!='-1'){
		   	 		var formObj=document.frm1;
		   		   	var paramStr="./SEI_DOC_1000.clt?";
					paramStr+= "s_mbl_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no');
					paramStr+= "&s_ref_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no');
					paramStr+= "&s_intg_bl_seq=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'intg_bl_seq');
		   		   	paramStr+= "&f_cmd=" + SEARCH;
		   		   	parent.mkNewFrame('Devanning / Segregation', paramStr);
	   	 		}
	   	 		break;
	   	 	case "CARGO_TRACKING":
		   	 	if(sheetObj1.GetTotalRows()== 0){
		   	 		//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
		   	 	}
		   	 	else{
					var blNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var liner=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "lnr_trdp_nm");
		   	 		var preBlNo=blNo.substring(0,4);
		   	 		var popLink="";
		   	 		var reqParam=""; 
		   	 		/* jsjang 2013.8.20 #19202 carrier link */
		   	 		var cntrNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cntr_no");
	   	 			/* jsjang 2013.9.11 #20775 carrier link - MBL */
		   	 		if(blNo == '' || blNo == null)
		   	 		{		   	 		
			   	 		if(cntrNo == '' || cntrNo == null)
			   	 		{
				   	 		alert(getLabel('FMS_COM_ALT051'));		   	 			
			   	 		}else{		   	 		
			   	 			/*
				   	 		if(preBlNo == "HJSC"){
				   	 			popLink="http://www.hanjin.com/hanjin/CUP_HOM_3301.do?trakNoTpCdParam=B";
				   	 			reqParam="&trakNoParam=" + blNo.substring(4);
				   	 		}
				   	 		else if(preBlNo == "NYKS"){
				   	 			popLink="http://www2.nykline.com/ct/searchForm.nyk";
				   	 		}
				   	 		else if(preBlNo == "HDMU"){
				   	 			popLink="http://www.hmm21.com/otherSites/mobile/main.jsp";
				   	 		}
				   	 		else if(preBlNo == "MAEU"){
				   	 			popLink="http://www.maerskline.com/appmanager/maerskline/public?_nfpb=true&_nfls=false&_pageLabel=page_tracking3_trackSimple";
				   	 		}
				   	 		else if(preBlNo == "KKLU"){
				   	 			popLink="http://app2.kline.com/GctApp/search?id=tracker";
				   	 		}
				   	 		else if(preBlNo.substring(0,3) == "YHU"){
				   	 			popLink="http://www.yml.com.tw/track_trace/track_trace_cargo_tracking.asp";
				   	 		}
				   	 		else if(preBlNo == "EGLV"){
				   	 			popLink="http://www.shipmentlink.com/servlet/TDB1_CargoTracking.do";
				   	 		}
				   	 		else if(preBlNo == "OOLU"){
				   	 			popLink="http//www.oocl.com/eng/ourservices/eservices/cargotracking/Pages/cargotracking.aspx";
				   	 		}
				   	 		else{
				   	 			popLink="http://www.track-trace.com/container";
				   	 		}
				   	 		*/
				   	 		/* jsjang 2013.8.20 #19202 carrier link */
				   	 		popLink='http://connect.track-trace.com/for/opus/container/'+cntrNo;
				   	 		window.open(popLink + reqParam, "_blank");
		//					popGET(popLink + reqParam, '', 480, 500, "scroll:yes;status:no;help:no;");
			   	 		}
		   	 		}else{
			   	 		popLink='http://connect.track-trace.com/for/opus/billoflading/'+blNo;
			   	 		window.open(popLink + reqParam, "_blank");
		   	 		}				   	 		
				}
		   	 	break;
	   	 	case "HBL_LIST":
				var refNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'ref_no');
				var mblNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'bl_no');
			   	var paramStr="./SEI_BMD_0060.clt?";
			   	paramStr+= 'f_ref_no=' + refNo + '&f_mbl_no=' + mblNo;
			   	parent.mkNewFrame('House B/L List', paramStr);
			   	break;
			  //#27548 [BINEX]BL 공통-HC 단축키 추가
	   	 	case "HBL_ENTRY":
		   	 	if (docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "HC") != "") {
		   	 		var refNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'ref_no');
		   	 		if(refNo !=''){
		   	 			var paramStr="./SEI_BMD_0020.clt?";
		   	 			paramStr+= "f_mbl_ref_no=" + refNo;
				   	 	paramStr+= "&f_pre_ccn_no=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'ccn_no');
				   	 	paramStr+= "&f_mnf_fr_loc=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'mnf_fr_loc');
				   	 	paramStr+= "&f_mnf_to_loc=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'mnf_to_loc');
		   	 			parent.mkNewFrame('Booking & HBL', paramStr);
		   	 		 }
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
				   if(formObj.f_intg_bl_seq.value == "")
				   {
					   alert(getLabel('FMS_COM_ALT049'));
					   return;
				   }
		           if(confirm(getLabel('FMS_COM_CFMSAV'))){
		        	   //formObj.f_intg_bl_seq.value = removeComma(formObj.s_amt_fr.value);
		               //formObj.s_amt_to.value = removeComma(formObj.s_amt_to.value);
		        	  // docObjects[0].DoAllSave("./SEI_BMD_0070GS.clt", FormQueryString(frm1), false);
		        	   docObjects[0].DoSave("./SEI_BMD_0070GS.clt", FormQueryString(frm1), "ibflag", false);
		        	   //docObjects[2].DoAllSave("./SEI_BMD_0060_3GS.clt", FormQueryString(frm1), false);
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
		   	 		if(sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no") == '')
		   	 		{
		   	 			alert(getLabel('FMS_COM_ALT058'));
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
	   	 	case "S_DOC":	   	 		
        		var sheetObj3=docObjects[2];	
	   	 		if(sheetObj3.GetTotalRows()> 0){
	   	 			var formObj=document.frm1;
	   	 			formObj.file_name.value='doc_list.mrd';
	   	 			formObj.title.value='Document List';
	   	 			//Parameter Setting
	   	 			var param='[' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") + ']';		// [1]
	   	 			param += '['+formObj.palt_mnu_cd.value+']';		// [2]  MASTER/HOUSE/OTH 여부
	   	 			param += '[' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ref_no") + ']';				// [3] MBL_NO
	   	 			param += '[' + formObj.user_id.value + ']';	// [4]
	   	 			formObj.rd_param.value=param;
	   	 			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
	   	 		break;
	   	    case "OPR_POPLIST":
	   	          rtnary =new Array(1);
		   		  rtnary[0]="1";
		   		  callBackFunc = "OPR_POPLIST";
				  modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
		   	    break;	
        } // end switch
	}
	catch(e) {
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
	        cal.select(formObj.eta_strdt, formObj.eta_enddt,  'MM-dd-yyyy');
	    break;
	    case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
	    	var cal=new ComCalendarFromTo();
		    cal.displayType="date";
		    cal.select(formObj.f_eta_strdt,  formObj.f_eta_enddt,  'MM-dd-yyyy');
	    break;
	    case 'DATE13':   //달력 조회 From ~ To 팝업 호출 
	    	var cal=new ComCalendarFromTo();
		    cal.displayType="date";
		    cal.select(formObj.etd_strdt,  formObj.etd_enddt,  'MM-dd-yyyy');
	    break;
	    case 'DATE14':   //달력 조회 From ~ To 팝업 호출 
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
	document.forms[0].f_CurPage.value=callPage;
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
	var s_ofc_cd=formObj.s_ofc_cd.value;
	if(s_ofc_cd != ""){
		formObj.ofc_cd.value=s_ofc_cd;
	}
	
	//Flight Date wording setting (#48642)
	//var opt_key = "FLIGHT_DT_TXT";
	//ajaxSendPost(setFlightDtTxt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    initFinish();
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
	        var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
	        var headers = [ { Text:getLabel('SEI_BMD_0070_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);
	        var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"block_flag",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Image",     Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"HC",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"shp_mod_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ref_ofc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"hbl_cnt",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"f_eta_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"prnr_trdp_cd2",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"prnr_trdp_nm2",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"shpr_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"shpr_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cnee_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cnee_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"carr_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"carr_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"trnk_vsl_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"trnk_voy",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"lnr_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Image",     Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"view_hbl",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cy_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cy_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cntr_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cfs_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cfs_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },                 
	               {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"rlsd_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y", FalseValue:"N" },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"rlsd_dt_tm",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"ccn_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"mnf_fr_loc",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"mnf_to_loc",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"frt_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ar_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ap_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"dc_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"memo",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"proc_usr_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"ams_id",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"imp_ref_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	               {Type:"Text",      Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"post_dt",         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bl_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_cnt" },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 }, 
	               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	        InitColumns(cols);
	        SetEditable(1);
        	SetImageList(0,APP_PATH+"/web/img/button/btns_hc.gif");
        	SetImageList(1,APP_PATH+"/web/img/button/btns_view.gif");
            /* #18782 [BINEX, GPL] OBL RCV and Release update function (From BL List) jsjang 2013.9.14  */
	        SetDataLinkMouse('HC',1);
	        SetDataLinkMouse('view_hbl',1);
	        InitViewFormat(0, "post_dt", 	"MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        InitViewFormat(0, "eta_dt_tm", 	"MM\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	        InitViewFormat(0, "f_eta_dt_tm", 	"MM\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	        InitViewFormat(0, "etd_dt_tm", 	"MM\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	        /* #18782 [BINEX, GPL] OBL RCV and Release update function (From BL List) jsjang 2013.9.14  */
	        InitViewFormat(0, "rlsd_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	        SetSheetHeight(SYSTEM_ROW_HEIGHT*18);
	        //sheetObj.SetFocusAfterProcess(1);
		   }                                                      
		break;
		 case 2:      //IBSheet1 init
		    with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

		        var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
		        var headers = [ { Text:getLabel('SEI_BMD_0070_HDR2'), Align:"Center"} ];
		        InitHeaders(headers, info);

		        var cols = [ {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bkg_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"master_bl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"shipper_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:240,  Align:"Left",    ColMerge:1,   SaveName:"shipper_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"consignee_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:240,  Align:"Left",    ColMerge:1,   SaveName:"consignee_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:240,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"express_tp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"CheckBox",  Hidden:0, Width:95,   Align:"Center",  ColMerge:0,   SaveName:"org_bl_rcvd_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:-1, TrueValue:"Y", FalseValue:"N" },
		               {Type:"Text",      Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"pck_qty_unit",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"cust_ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"isf_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"ams_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ar_chk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ap_chk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"dc_chk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"liner_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"liner_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cfm_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"clz_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bl_sts_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 } ];
		         
		        InitColumns(cols);

		        //SetCountPosition(0);
		        SetEditable(1);
		        SetSheetHeight(SYSTEM_ROW_HEIGHT*9);
		        //sheetObj.SetFocusAfterProcess(0);
		        //SetCountFormat("BOTTOMDATA / TOTALROWS");

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
	                {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
	            //SetAutoRowHeight(0);
	            SetSheetHeight(SYSTEM_ROW_HEIGHT*8);
	            sheetObj.SetFocusAfterProcess(0);
	            }
	            break;

    }
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
function sheet2_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
function sheet3_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
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
		curBlNo=sheetObj.GetCellValue(Row, 'bl_no');
	  	searchSheet2(sheetObj,Row,Col);
	} else if(colStr=='HC' && sheetObj.GetCellValue(Row, "HC") != ""){
		if(sheetObj.GetCellValue(Row, 'ref_no') !=''){
  			var paramStr="./SEI_BMD_0020.clt?";
			paramStr+= "f_mbl_ref_no=" + sheetObj.GetCellValue(Row, 'ref_no');
			paramStr+= "&f_pre_ccn_no=" + sheetObj.GetCellValue(Row, 'ccn_no');
			paramStr+= "&f_mnf_fr_loc=" + sheetObj.GetCellValue(Row, 'mnf_fr_loc');
			paramStr+= "&f_mnf_to_loc=" + sheetObj.GetCellValue(Row, 'mnf_to_loc');
  			parent.mkNewFrame('Booking & HBL', paramStr);
   		}
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
		//frm1.f_rlsd_dt_tm.value = sheetObj.CellValue(Row,"rlsd_dt_tm");
	}else /*if(colStr=='bl_no')*/{
		var formObj=document.frm1;
		var sheetObj1=docObjects[0];
		var sheetObj3=docObjects[2];
		formObj.intg_bl_seq.value=sheetObj1.GetCellValue(Row,"intg_bl_seq");
		/**  Document List ==> Common Memo 연동 파라미터 (S) */
		formObj.palt_mnu_cd.value="OIM";
		formObj.opr_no.value=sheetObj1.GetCellValue(Row,"ref_no");
		/**  Document List ==> Common Memo 연동 파라미터 (E) */
		formObj.f_cmd.value=SEARCHLIST03;
		sheetObj3.DoSearch("./SEI_BMD_0070_3GS.clt", FormQueryString(formObj) );
		if(docObjects[2].SearchRows()==0){
			//			formObj.memo_txt.value = "";
		}
		/* #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) - check 시에는 아무 동작 안함. */
		var f_rlsd_flg=sheetObj.GetCellValue(Row,"rlsd_flg");
		frm1.f_intg_bl_seq.value=sheetObj.GetCellValue(Row,"intg_bl_seq");
		//alert(f_rlsd_flg);
		if(f_rlsd_flg == 1)
		{
			frm1.f_rlsd_flg.value="Y";
		}else{
			frm1.f_rlsd_flg.value="N";
		}		
		frm1.f_rlsd_dt_tm.value=sheetObj.GetCellValue(Row,"rlsd_dt_tm");
		//alert(frm1.f_rlsd_dt_tm.value);
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
function sheet1_OnDblClick(sheetObj, Row, Col){	
	var colStr=sheetObj.ColSaveName(Col);
	/* #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) - check 시에는 아무 동작 안함. */
	if(colStr =='rlsd_flg' || colStr =='rlsd_dt_tm'){
		/*
		var f_rlsd_flg=sheetObj.GetCellValue(Row,"rlsd_flg");
		frm1.f_intg_bl_seq.value=sheetObj.GetCellValue(Row,"intg_bl_seq");
		frm1.f_rlsd_dt_tm.value=sheetObj.GetCellValue(Row,"rlsd_dt_tm");
		//alert(f_rlsd_flg);
		if(f_rlsd_flg == 1)
		{
			frm1.f_rlsd_flg.value="Y";
		}else{
			frm1.f_rlsd_flg.value="N";
		}
		*/
	}else{	
		if(colStr!='view_hbl'){
			var formObj=document.frm1;
		   	var paramStr="./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST;
		   	paramStr+= '&f_ref_no='+escape(sheetObj.GetCellValue(Row, 'ref_no'));
		   	parent.mkNewFrame('Master B/L Entry', paramStr, "SEI_BMD_0040_SHEET_" + sheetObj.GetCellValue(Row, 'ref_no'));		
		}
	}
}
 /* #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) - check 시에는 아무 동작 안함. */
 function sheet1_OnChange(sheetObj, Row, Col) {
	 	var colStr=sheetObj.ColSaveName(Col);
		var f_rlsd_flg=sheetObj.GetCellValue(Row,"rlsd_flg");
		frm1.f_intg_bl_seq.value=sheetObj.GetCellValue(Row,"intg_bl_seq");
		//alert(f_rlsd_flg);
		if(f_rlsd_flg == 1)
		{
			//sheetObj.CellValue2(Row,"rlsd_dt_tm") = TODAY;
			frm1.f_rlsd_flg.value="Y";
		}else{
			frm1.f_rlsd_flg.value="N";
		}
		//alert(sheetObj.CellValue(Row,"rlsd_dt_tm"));
		frm1.f_rlsd_dt_tm.value=sheetObj.GetCellValue(Row,"rlsd_dt_tm");

		if(colStr=="rlsd_flg"){
			if(sheetObj.GetCellValue(Row, 'rlsd_flg') == 0){
				sheetObj.SetCellValue(Row, 'rlsd_dt_tm', "", 0);
			}
		}
 } 
function sheet2_OnDblClick(sheetObj,Row,Col){
	var hblNo=sheetObj.GetCellValue(Row, 'hbl_no');
	if(sheetObj.ColSaveName(Col)!='del_icon'&&hblNo!=''){
	   	var paramStr="./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+hblNo;
	   	parent.mkNewFrame('HB/L Entry', paramStr,"SEI_BMD_0020_SHEET_"+hblNo);
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
	sheetObj2.DoSearch("./SEI_BMD_0070_2GS.clt", FormQueryString(formObj) );
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
			sheetObj.SetCellValue(i, "block_flag","Y",0);
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
function sheet3_OnMouseMove(sheetObj, row, col){
	if(sheetObj.MouseCol()==9){
		var memo=sheetObj.GetCellValue(sheetObj.MouseRow(), "palt_doc_msg");
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
	        	  //'Do you want to delete?')){
    			   if(confirm(getLabel('FMS_COM_CFMDEL'))){
	                   frm1.f_cmd.value=REMOVE;
	                   frm1.intg_bl_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	                   docObjects[0].DoSearch("./SEI_BMD_0070GS.clt", FormQueryString(formObj) );
	        	   }
    		   }
			   else{
    			   //'You Cannot delete MB/L. Because Invoice was already Issued.');
    			   alert(getLabel('FMS_COM_ALT022'));
    		   }
		   }
		   else{
			   //Please delete the HB/L in advance.
			   alert(getLabel('FMS_COM_ALT026'));
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
		}
		else{
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
	formObj.f_hbl_tp_cd.selectedIndex=0;
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
		document.forms[0].f_CurPage.value='';
		doWork('SEARCHLIST');
	}
}
function sheet1_OnSaveEnd(sheetObj, row, col){
	doWork("SEARCHLIST");
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
	var formObj=document.frm1;
	if(!chkSearchCmprPrd(false, frm1.eta_strdt, frm1.eta_enddt)){
		return false;
	}
	if(!chkSearchCmprPrd(false, frm1.f_eta_strdt, frm1.f_eta_enddt)){
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
			param += '[' + frm1.f_user_ofc_cd.value + ']';		// [2] ofc_cd
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
function PRNR2_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_prnr_trdp_nm2.value=rtnValAry[2];//full_nm
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
function CARR_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_carr_trdp_nm.value=rtnValAry[2];//full_nm
	}
}
function CY_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
 	}
 	else{
 		var rtnValAry=rtnVal.split("|");
 		formObj.f_cy_trdp_nm.value=rtnValAry[2];//full_nm
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

function searchValueClear(){
	var formObj = document.frm1;

	formObj.f_mbl_no.value = "";
	
}

/*Vinh.Vo (S) - 04/14/2015 */

function formValidation2(){
	var formObj=document.frm1;
	if(!chkSearchCmprPrd(false, frm1.eta_strdt, frm1.eta_enddt)){
		return false;
	}
	if(!chkSearchCmprPrd(false, frm1.f_eta_strdt, frm1.f_eta_enddt)){
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
	
	if(formObj.eta_strdt.value == "" && formObj.f_eta_strdt.value == "" && formObj.etd_strdt.value == "" ){
		ComShowCodeMessage("COM132602");
		formObj.eta_strdt.focus();
		return;
	}
	
	formObj.f_cmd.value = COMMAND10;
	
	
	var formParam = FormQueryString(formObj);
	
	var param = {
					DownCols: makeHiddenSkipCol(mySheet)
					,SheetDesign:1
					,URL:"./SEI_BMD_0070.clt"
					,ExtendParam:formParam
					,ExtendParamMethod:"GET"
				};	
	mySheet.DirectDown2Excel(param);
}
/*Vinh.Vo (E) */