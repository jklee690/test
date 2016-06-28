function doWork(srcName){
	var formObj=document.frm1;
	var formObj2=document.frm2;
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    switch(srcName) {
	    case "SEARCHLIST":
	        formObj.f_cmd.value=SEARCHLIST01;
	        //Detail, Summary 선택 option
	        var f_prn_opt=document.getElementsByName("f_prn_opt"); 
			var prn_opt=getRadioVal(f_prn_opt);  
			
			if(prn_opt == "D"){
				formObj.f_prn_opt.value="D";
			}else{
				formObj.f_prn_opt.value="S";
			}
			//One, Multi Currency 선택 option
			var f_curr_opt=document.getElementsByName("f_curr_opt");		
			var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt == "O" && formObj.f_curr_cd.value == ""){
				//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR') + "\n\n: RPT_PRN_0200.17");
				return;
			}
			if(curr_opt == "M"){
				formObj.f_curr_opt.value="M";
			}else{
				//Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
	            if(currRateCheck(sheetObj)){
	            	return;
	            }
				formObj.f_curr_opt.value="O";
			}
			formObj.one_curr_rate_sql.value=getRateQuery();
			if(prn_opt == "D"){				
				sheetObj2.DoSearch("./RPT_PRN_0181GS.clt", FormQueryString(formObj) );
			}else{
				sheetObj3.DoSearch("./RPT_PRN_0182GS.clt", FormQueryString(formObj) );
			}
	    break;
	    case "BLOCK":
	    	/* Block status 재확인 */
	        ajaxSendPost(getBlBlockCheck, 'reqVal', '&goWhere=aj&bcKey=getBlBlockCheck&intg_bl_seq='+formObj2.bl_intg_bl_seq.value, './GateServlet.gsl');
	        if( formObj2.s_block_satus.value == "Y") {
	        	alert(getLabel('PFM_COM_ALT019')) ;
	        	return;
	        } 
	    	formObj2.f_cmd.value=COMMAND01;
			if(confirm(getLabel('FMS_COM_CFMSAV'))){
				formObj2.search_opt.value="bl";
				formObj2.target="ifrm1";
				formObj2.submit();
				alert(getLabel('PFM_COM_ALT020')) ;
				getObj('btnBlock').style.display='none';	
				//showCompleteProcess();
				//operner.docObjects[1].CellValue2(row, '') = '';
			}
		    break;
	     case "CURR_SEARCH":
	        formObj.f_cmd.value=SEARCHLIST;
	        var f_curr_opt=document.getElementsByName("f_curr_opt");	//Currency Option
		    var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt != "O"){
				//Please, select the [One Currency]
	 	    	//alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_OCUR') + "\n\n: RPT_PRN_0180.16");
				//return;
				formObj.f_curr_one.checked=true;        
			}
		    if(formObj.f_curr_cd.value == ""){
		    	//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR') + "\n\n: RPT_PRN_0180.23");	
				return;
			}
		    sheetObj.DoSearch("./RPT_PRN_0180GS.clt", FormQueryString(formObj) );
	    break;
		case 'Print':
			formObj.title.value='Profit Report';
			if(formObj.intg_bl_seq.value == "") return;
			//Report 호출 메뉴 
			var air_sea_clss_cd=formObj.air_sea_clss_cd.value;
			var bnd_clss_cd=formObj.bnd_clss_cd.value;
			var biz_clss_cd=formObj.biz_clss_cd.value;
			//Detail, Summary 선택 option
			var f_prn_opt=document.getElementsByName("f_prn_opt"); 
			var prn_opt=getRadioVal(f_prn_opt);
			//One, Multi Currency 선택 option
			var f_curr_opt=document.getElementsByName("f_curr_opt");		
			var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt == "O" && formObj.f_curr_cd.value == ""){
				//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR') + "\n\n: RPT_PRN_0180.53");
				return;
			}
			if(curr_opt == "O" && sheetObj.DataRow == 0){
				//Please, select the [To Currency] 
	 	    	alert(getLabel('FMS_COM_ALT029')  + "\n\n: RPT_PRN_0180.60");
				return;
			}
			//alert("f_prn_opt : "+f_prn_opt + " f_curr_opt : "+f_curr_opt);
			//Parameter Setting
			var param="";
			var file_names="";
			
			if(MULTI_CURR_FLAG == "Y" && curr_opt == "M"){
				param += '[' + formObj.intg_bl_seq.value + ']'; //$1
				param += '[' + air_sea_clss_cd + ']';  //$2
				param += '[' + bnd_clss_cd + ']';		 //$3
				param += '[' + biz_clss_cd + ']';		//$4
				param += '[' + prn_opt + ']';					//$5
				param += '[' + formObj.f_ofc_cd.value + ']';		//$6
				if(prn_opt == "D"){
					file_names += 'profit_report_mbl_dtl_multi_curr.mrd';
				}else{
					file_names += 'profit_report_mbl_smr_multi_curr.mrd';
				}
				formObj.rd_param.value = param;
				formObj.file_name.value = file_names;					
				//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			}else{
				//Multi Currency 인 경우 
				if(curr_opt == "M"){
					var profitCurr=PROFITCURR.split("|");					
					for(var i=0 ; i < profitCurr.length ; i ++){
						param += '[' + formObj.intg_bl_seq.value + ']'; //$1
						param += '[' + air_sea_clss_cd + ']';  //$2
						param += '[' + bnd_clss_cd + ']';		 //$3
						param += '[' + biz_clss_cd + ']';		//$4
						param += '[' + prn_opt + ']';					//$5
						param += '[' + formObj.f_ofc_cd.value + ']';		//$6
						param += '[' + profitCurr[i] + ']';		//$7
						if(i < profitCurr.length-1){
							param += '^@@^';
						}	
						//[Detail]
						if(prn_opt == "D")
						{	
							file_names += 'profit_report_mbl_dtl_multi.mrd';
							if(i < profitCurr.length-1){
								file_names += '^@@^';
							}	
						}
						//[Summary]
						if(prn_opt == "S")
						{
							file_names += 'profit_report_mbl_smr_multi.mrd';
							if(i < profitCurr.length-1){
								file_names += '^@@^';
							}
						}
					}
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;
					
					/* #18793, [GPL]Profit Report jsjang 2013.11.8 */
					formObj.rpt_biz_tp.value = "";
					formObj.rpt_biz_sub_tp.value = "";		
					formObj.mailTitle.value = "";		
					formObj.mailTo.value = "";		
					
					
					//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
				}
	    
			    //One Currency 인 경우 
				if(curr_opt== "O"){
					//Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
		            if(currRateCheck(sheetObj)){
		            	return;
		            }
					
					param += '[' + formObj.intg_bl_seq.value + ']'; //$1
					param += '[' + air_sea_clss_cd + ']';  //$2
					param += '[' + bnd_clss_cd + ']';		 //$3
					param += '[' + biz_clss_cd + ']';		//$4
					param += '[' + prn_opt + ']';					//$5
					param += '[' + formObj.f_ofc_cd.value + ']';		//$6
					param += '[' + formObj.f_curr_cd.options[formObj.f_curr_cd.selectedIndex].text + ']';		//$7 f_curr_cd
					
					param += '[' + getRateQuery() + ']';		//$8 One 인 경우 Currency SQL
					
					//[Detail]
					if(prn_opt == "D")
					{	
						file_names += 'profit_report_mbl_dtl_one.mrd';
					}
					//[Summary]
					if(prn_opt == "S")
					{
						file_names += 'profit_report_mbl_smr_one.mrd';
					}
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;					
					//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
			}
		break;
		case 'EXCEL':			
			var f_prn_opt=document.getElementsByName("f_prn_opt"); 
			var prn_opt=getRadioVal(f_prn_opt);  
			if(prn_opt == "D"){
				if (isValidDownExcel(sheetObj2))
					sheetObj2.Down2Excel({DownCols: makeHiddenSkipCol(sheetObj2), SheetDesign:1,Merge:1 });
			}else{
				if (isValidDownExcel(sheetObj3))
					sheetObj3.Down2Excel({DownCols: makeHiddenSkipCol(sheetObj3), SheetDesign:1,Merge:1 });
//					sheetObj3.Down2Excel({SheetDesign:1, HiddenColumn:0, DownSum:0});
			}
        break;
		case 'MINIMIZE':
			if(mainForm.style.display != "none") {
				mainForm.style.display="none";
				sheetObj2.SetSheetHeight(510);
				sheetObj3.SetSheetHeight(510);
				$(formObj.btn_minimize).html("Maximize");
			} else {
				mainForm.style.display="block";
				sheetObj2.SetSheetHeight(340);
				sheetObj3.SetSheetHeight(340);
				$(formObj.btn_minimize).html("Minimize");
			}
        break; 
		case "CLOSE":
			ComClosePopup(); 
			//opener.doWork('SEARCHLIST');
			parent.doWork('SEARCHLIST');
			window.close();
    	break;
    }
}

function isValidDownExcel(sheetObj) {
	if(sheetObj.RowCount() < 1){//no data	
		ComShowCodeMessage("COM132501");
		return false;
	}
	return true;
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
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
	var formObj2=document.frm2;
	
	if( formObj.air_sea_clss_cd.value  == "S" ){
		mbl.style.display="inline";
	}else {	
		mawb.style.display="inline";
	}
	
	for(var i=0;i<docObjects.length;i++){
	//khlee-시작 환경 설정 함수 이름 변경
	comConfigSheet(docObjects[i], SYSTEM_FIS);
	initSheet(docObjects[i],i+1);
	//khlee-마지막 환경 설정 함수 추가
	comEndConfigSheet(docObjects[i]);
	}
   	formObj.f_curr_cd.value=formObj.h_curr_cd.value;
   	
   	
   	if (prn_ofc_cd == "BNXC"){
   		formObj.f_opt_sum.checked = true ; 
   		formObj.f_opt_dtl.checked = false ;
   		mainTable2.style.display="none";
		mainTable3.style.display="block";
   	}else{
   		formObj.f_opt_sum.checked = false ;
   		formObj.f_opt_dtl.checked = true ;
   		mainTable2.style.display="block";
		mainTable3.style.display="none";
   	}
   	
   	
    ajaxSendPost(getBlBlockCheck, 'reqVal', '&goWhere=aj&bcKey=getBlBlockCheck&intg_bl_seq='+formObj2.bl_intg_bl_seq.value, './GateServlet.gsl');
	doWork('SEARCHLIST');
}
function getBlBlockCheck(reqVal){
	var formObj=document.frm2;
	var doc=getAjaxMsgXML(reqVal);
	formObj.s_block_satus.value='N';
    //Block 상태이면 Block 버튼 disable
	if( doc[1]=='HF') {
		formObj.s_block_satus.value="Y";
		getObj('btnBlock').style.display='none';	
	}
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
		case 1:      //IBSheet2 init
		with (sheetObj) {

	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('PFM_MGT_0030_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"aply_fm_dt",  KeyField:0,   CalcLogic:"",   Format:"Ym" },
	               {Type:"Float",     Hidden:0,  Width:110,  Align:"Right",   ColMerge:1,   SaveName:"rate",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 } ];
	         
	        InitColumns(cols);

	        SetEditable(1);
	        InitViewFormat(0, "aply_fm_dt", "MM\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        SetSheetHeight(130);
		} 
		break;
		case 2:      //IBSheet2 init
		with (sheetObj) {

	        SetConfig( { SearchMode:2, MergeSheet:2, Page:20, DataRowMerge:0 } );

	        var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('RPT_PRN_0181_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Text",     Hidden:0,  Width:32,   Align:"Center",  ColMerge:1,   SaveName:"d_bl_kind" },
	               {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"d_bl_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"d_inv_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",     Hidden:0,  Width:170,  Align:"Left",    ColMerge:1,   SaveName:"d_bill_to" },
	               {Type:"Text",     Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"d_frt_nm" },
	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"d_local_inv_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"d_cost_inv_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"d_debit_inv_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"d_cr_inv_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"d_inv_post_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd" },
	               {Type:"Text",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"d_local_inv_ttl_amt",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"d_cost_inv_ttl_amt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"d_agent_inv_ttl_amt",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"d_clr_yn",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",   ColMerge:1,   SaveName:"d_remark",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",      Hidden:1, Width:20,   Align:"Center",  ColMerge:0,   SaveName:"d_profit",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_sell_buy_tp_cd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_org_bl_rcvd_flg" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_express_tp_cd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_rlsd_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_last_chk_no" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_last_pay_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_inv_curr_cd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_inv_curr_cd2" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_inv_curr_cd3" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_remark2" },
	               {Type:"Text",      Hidden:1, Width:75,   Align:"Right",   ColMerge:1,   SaveName:"d_agent_inv_amt",      KeyField:0,   CalcLogic:"|d_debit_inv_amt|-|d_cr_inv_amt|",Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_rcvd_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_ref_ofc_cd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_inv_seq" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_trdp_cd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_ofc_cd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_bl_cnt_cd" },
	        	   {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_rmk_bl_no" } ];
	         
	        InitColumns(cols);

	        SetEditable(0);

	        sheetObj.ShowSubSum([
	    	                      {StdCol:"d_inv_curr_cd3", SumCols:"15", Sort:false, ShowCumulate:false, CaptionCol:4,CaptionText:"Profit : %col "}
	    	                      ,{StdCol:"d_inv_curr_cd2", SumCols:"5|6|7|8", Sort:false, ShowCumulate:false, CaptionCol:4, CaptionText:"Total"}
	    	                      ,{StdCol:"d_remark2", SumCols:"5|6|7|8", Sort:false, ShowCumulate:false, CaptionCol:4, CaptionText:" "}
	    	                      ]);
	    	
		} 	
		break;
		case 3:      //IBSheet2 init
		with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:2, Page:20, DataRowMerge:0 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('RPT_PRN_0182_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Text",     Hidden:0,  Width:32,   Align:"Center",  ColMerge:1,   SaveName:"bl_kind" },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"inv_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",     Hidden:0,  Width:220,  Align:"Left",    ColMerge:1,   SaveName:"bill_to" },
	               {Type:"Date",      Hidden:0,  Width:65,   Align:"Left",    ColMerge:1,   SaveName:"inv_post_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd" },
	               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"local_inv_ttl_amt",  KeyField:0,   CalcLogic:"Math.round(|local_inv_ttl_amt|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cost_inv_ttl_amt",   KeyField:0,   CalcLogic:"Math.round(|cost_inv_ttl_amt|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"agent_inv_ttl_amt",  KeyField:0,   CalcLogic:"Math.round(|agent_inv_ttl_amt|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clr_yn",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",   ColMerge:1,   SaveName:"remark",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",      Hidden:1, Width:20,   Align:"Center",  ColMerge:0,   SaveName:"profit",             KeyField:0,   CalcLogic:"Math.round(|profit|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"sell_buy_tp_cd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"org_bl_rcvd_flg" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"express_tp_cd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"rlsd_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"last_chk_no" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"last_pay_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_curr_cd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_curr_cd2" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_curr_cd3" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"cnt" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"rcvd_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"ref_ofc_cd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_seq" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"trdp_cd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"ofc_cd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"bl_cnt_cd" } ];
	         
	        InitColumns(cols);

	        SetEditable(0);
	           
	        SetSheetHeight(340);
	        ShowSubSum([
		        {StdCol:"inv_curr_cd3", SumCols:"10", Sort:false, ShowCumulate:false, CaptionCol:3 ,CaptionText:"Profit : %col "}
		        ,{StdCol:"inv_curr_cd2", SumCols:"5|6|7", Sort:false, ShowCumulate:false, CaptionCol:4, CaptionText:"Total"}
//		        ,{StdCol:"inv_curr_cd", SumCols:"17", Sort:false, ShowCumulate:false, CaptionCol:0 ,CaptionText:"Currency : %col "}
		        ]);
//	    	SetSubSumBackColor("#ECE7F7");
		} 	
		break;
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
} 
function sheet2_OnSearchEnd(){
	var sheetObj2=docObjects[1];
	setRows2Info(sheetObj2);	
	sub_total();
	//[20131118 ojg]
	for(var i=1;i<=sheetObj2.LastRow();i++){
		if(sheetObj2.GetCellValue(i,"d_inv_no") != ""){
		sheetObj2.SetCellFont("FontUnderline", i,"d_inv_no",i,"d_inv_no",1);
		sheetObj2.SetCellFontColor(i, "d_inv_no","#0000FF");
		}	
	}
	/**
	 * 소계 TITLE 영역 상단 출력
	 */
	var formObj = document.frm1;
	var arrTitleRow = new Array();
	var cellValue="";
	for(var i=1;i<=sheet2.LastRow();i++){
		//console.log(sheet2.GetCellValue(i,"d_inv_curr_cd"));
		if(sheet2.GetCellValue(i,"d_inv_curr_cd") != "" && cellValue != sheet2.GetCellValue(i,"d_inv_curr_cd")){
			arrTitleRow.push(i);
			var mergeRow = sheet2.GetMergedEndCell(i,0).split(",")[0];
			if(mergeRow != i){
				i=mergeRow;
			}
		}
		if(sheet2.GetCellValue(i,"d_inv_curr_cd") != ""){
			cellValue = sheet2.GetCellValue(i,"d_inv_curr_cd");
		}
	}
	
	for(var i=0; i < arrTitleRow.length ; i++){
		var row = sheet2.DataInsert(arrTitleRow[i]+i);
		sheet2.SetMergeCell(row,0,1,sheet2.LastCol());
		var gTitle = "Currency : " +  sheet2.GetCellText(row + 1,"d_inv_curr_cd") 
													+ "   Reference No. : " + formObj.f_ref_no.value    
    												+ "   MB/L No. : " + formObj.f_bl_no.value 
    												+ "";
													
		sheet2.SetCellValue(row,0, gTitle);
		sheet2.SetRowFontColor(row, "#FF0000");
		sheet2.SetCellFont("FontBold", row,0,row,0,1);
		sheet2.InitCellProperty(row,0,{Type:"Text", Align:"Left"});
	}
}
function sheet3_OnSearchEnd(){
	var sheetObj3=docObjects[2];
	setRows2Info(sheetObj3);
	summary_sub_total();
	/* #18793, [GPL]Profit Report jsjang 2013.11.8 */
	for(var i=1;i<=sheetObj3.LastRow();i++){
		if(sheetObj3.GetCellValue(i,"inv_no") != ""){
			sheetObj3.SetCellFont("FontUnderline", i,"inv_no", i,"inv_no",1);
			sheetObj3.SetCellFontColor(i, "inv_no","#0000FF");
		}	
	}
	
	/**
	 * 소계 TITLE 영역 상단 출력
	 */
	var formObj = document.frm1;
	var arrTitleRow = new Array();
	var cellValue="";
	for(var i=1;i<=sheet3.LastRow();i++){
		//console.log(sheet3.GetCellValue(i,"d_inv_curr_cd"));
		if(sheet3.GetCellValue(i,"inv_curr_cd") != "" && cellValue != sheet3.GetCellValue(i,"inv_curr_cd")){
			arrTitleRow.push(i);
			var mergeRow = sheet3.GetMergedEndCell(i,0).split(",")[0];
			if(mergeRow != i){
				i=mergeRow;
			}
		}
		if(sheet3.GetCellValue(i,"inv_curr_cd") != ""){
			cellValue = sheet3.GetCellValue(i,"inv_curr_cd");
		}
	}
	
	for(var i=0; i < arrTitleRow.length ; i++){
		var row = sheet3.DataInsert(arrTitleRow[i]+i);
		sheet3.SetMergeCell(row,0,1,sheet3.LastCol());
		var gTitle = "Currency : " +  sheet3.GetCellText(row + 1,"inv_curr_cd") 
													+ "   Reference No. : " + formObj.f_ref_no.value    
    												+ "   MB/L No. : " + formObj.f_bl_no.value 
    												+ "";
													
		sheet3.SetCellValue(row,0, gTitle);
		sheet3.SetRowFontColor(row, "#FF0000");
		sheet3.SetCellFont("FontBold", row,0,row,0,1);
		sheet3.InitCellProperty(row,0,{Type:"Text", Align:"Left"});
	}
} 
/* #18793, [GPL]Profit Report jsjang 2013.11.8 */
function sheet3_OnClick(sheetObj3,Row,Col){
	var formObj=document.frm1;
	if(sheetObj3.ColSaveName(Col) == "inv_no"){
		// 소계Row 클릭인 경우, return
		if(sheetObj3.GetCellValue(Row, "inv_no") != ''){
			var inv_seq=sheetObj3.GetCellValue(Row,"inv_seq");
			var inv_no=sheetObj3.GetCellValue(Row,"inv_no");
			var print_type=sheetObj3.GetCellValue(Row,"sell_buy_tp_cd");
			var bl_cnt_cd=sheetObj3.GetCellValue(Row,"bl_cnt_cd");
			var ref_ofc_cd=sheetObj3.GetCellValue(Row,"ref_ofc_cd");
			var ofc_cd=sheetObj3.GetCellValue(Row,"ofc_cd");
			var trdp_cd=sheetObj3.GetCellValue(Row,"trdp_cd");
		} else {
			return
		}
	}else{
		return;
	}
	if(inv_seq != ""){
		//alert(print_type);
		if(print_type == "S"){
			//formObj.file_name.value = 'invoice_06.mrd';
			formObj.file_name.value='invoice_01.mrd';
			formObj.title.value='Local Invoice';
		}else if(print_type == "D" || print_type == "C"){
    		formObj.file_name.value='invoice_02_us.mrd';
			formObj.title.value='Debit/Credit Note';
		}else if(print_type == "B"){
			formObj.file_name.value='invoice_13.mrd';
			formObj.title.value='PAYMENT REQUEST';
		}
	}
	//alert(inv_seq);
	// 날짜변환
	//var tmp_start = formObj.f_strdt.value.replaceAll("-","");
	//var tmp_end   = formObj.f_enddt.value.replaceAll("-","");
	//var start_dt = tmp_start.substring(4,8)+tmp_start.substring(0,2)+tmp_start.substring(2,4);
	//var end_dt   = tmp_end.substring(4,8)+tmp_end.substring(0,2)+tmp_end.substring(2,4);
	var start_dt='';
	var end_dt='';
	if(print_type == "B"){
		//Parameter Setting
  		var param="[" + "'" + inv_seq + "'" + ']';	// [1]
		param += '[' + trdp_cd + ']';					// Vendor [2]
		param += '[' + ref_ofc_cd + ']';				// REF_OFC_CD [3]
		param += '[' + bl_cnt_cd + ']';					// CNT_CD  [4]
		param += '[' + formObj.f_usr_nm.value + ']';					// USER_NM [5]
		param += '[' + formObj.f_email.value + ']';						// USER EMAIL [6]
		param += '[' + formObj.f_usrPhn.value + ']';					// 7
		param += '[' + formObj.f_usrFax.value + ']';					// 8
		param += '[' + formObj.f_usr_nm.value + ']';						// 9
	}else{
		var param='[' + formObj.f_email.value + ']';				// USER EMAIL';	[1]
		//if(formObj.prn_radio[0].checked){
			param += "[" + "'" + inv_seq + "'" + ']';			// [2]
			param += '[]';											// [3]
			param += '[]';											// [4]
			param += '[]';											// [5]
			param += '[]';											// [6]	
		/*
		}else{
			param += '[]';											// [2]
			param += '[' + start_dt + ']';							// [3]
			param += '[' + end_dt + ']';							// [4] 
			if(formObj.date_radio[0].checked){
				formObj.f_search_type.value="POST";
			}else{
				formObj.f_search_type.value="INVOICE";
			}
			param += '[' + formObj.f_search_type.value + ']';		// POST DATE OR INVOICE DATE [5]
			if(formObj.sort_radio[0].checked){
				formObj.f_order_type.value="DATE";
			}else{
				formObj.f_order_type.value="INVNO";
			}
			param += '[' + formObj.f_order_type.value + ']';		// ORDER BY(DATE OR INV_NO)	[6]
		}
		*/
		if(print_type == "D" || print_type == "C"){
			//param += '[' + formObj.f_ref_ofc_cd.value + 'MAINCMP]';		// CURR BRANCH[7]
			param += '[' + trdp_cd + ']';				// TRDP_CD [7]
			param += '[' + ref_ofc_cd + ']';			// OFC_CD  [8]
		}else if(print_type == "S"){
			//param += '[' + ref_ofc_cd.value + 'MAINCMP]';		// CURR BRANCH[7]
			param += '[' + trdp_cd + ']';				// TRDP_CD [7]
			param += '[' + ref_ofc_cd + ']';			// OFC_CD  [8]
			param += '[' + bl_cnt_cd + ']';				// CNT_CD  [9]
			param += '[' + formObj.f_usr_nm.value + ']';				// USER_NM [10]
		}
		param += '[' + formObj.f_usrPhn.value + ']';				// 9,  11
		param += '[' + formObj.f_usrFax.value + ']';				// 10, 12
		param += '[' + formObj.f_usrId.value + ']';					// 11, 13
		//param += '[' + formObj.main_trdp.value + ']';				// 12, 14
		param += '[]';				// 12, 14
		if(print_type == "D" || print_type == "C"){
			param += '[' + formObj.f_ofc_loc_nm.value + ']';		//13  cr_db
			param += '[]';		//14  cr_db
			param += '[]';
		}
	}
	formObj.f_inv_seq.value=inv_seq;
	var temp='';
	var mailTitle='';
	if(print_type =="D" || print_type=="C"){
		temp='Credit/Debit Note No : ';
	}else{
		temp='Invoice No : ';
	}
	mailTitle=temp + inv_no;	
	formObj.mailTitle.value=mailTitle;
	formObj.rpt_biz_tp.value="ACCT";
	if(print_type=="D" || print_type=="C"){
		formObj.rpt_biz_sub_tp.value="DC";
	} else if (print_type=="S"){
		formObj.rpt_biz_sub_tp.value="AR";
	} else {
		formObj.rpt_biz_sub_tp.value="AP";
	}	
	var trdp_cd1='';
	trdp_cd1='(' + '\'' + trdp_cd + '\'' + ')';
	//alert(trdp_cd1);
	ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd1, './GateServlet.gsl');
	formObj.mailTo.value=mailTo;
	formObj.intg_bl_seq_tmp.value=formObj.intg_bl_seq.value;
	formObj.intg_bl_seq.value="";
	//alert(param);
	formObj.rd_param.value=param;
	popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	formObj.intg_bl_seq.value=formObj.intg_bl_seq_tmp.value;
}
//[20131118 OJG]
function sheet2_OnClick(sheetObj2,Row,Col){
	var formObj=document.frm1;
	if(sheetObj2.ColSaveName(Col) == "d_inv_no"){
		if(sheetObj2.GetCellValue(Row, "d_inv_seq") != ''){
			var inv_seq=sheetObj2.GetCellValue(Row,"d_inv_seq");
			var inv_no=sheetObj2.GetCellValue(Row,"d_inv_no");
			var print_type=sheetObj2.GetCellValue(Row,"d_sell_buy_tp_cd");
			var bl_cnt_cd=sheetObj2.GetCellValue(Row,"d_bl_cnt_cd");
			var ref_ofc_cd=sheetObj2.GetCellValue(Row,"d_ref_ofc_cd");
			var ofc_cd=sheetObj2.GetCellValue(Row,"d_ofc_cd");
			var trdp_cd=sheetObj2.GetCellValue(Row,"d_trdp_cd");
		} else {
			return;
		}
	}else{
		return;
	}
	if(inv_seq != ""){
		//alert(print_type);
		if(print_type == "S"){
			//formObj.file_name.value = 'invoice_06.mrd';
			formObj.file_name.value='invoice_01.mrd';
			formObj.title.value='Local Invoice';
		}else if(print_type == "D" || print_type == "C"){
    		formObj.file_name.value='invoice_02_us.mrd';
			formObj.title.value='Debit/Credit Note';
		}else if(print_type == "B"){
			formObj.file_name.value='invoice_13.mrd';
			formObj.title.value='PAYMENT REQUEST';
		}
	}
	//alert(inv_seq);
	// 날짜변환
	//var tmp_start = formObj.f_strdt.value.replaceAll("-","");
	//var tmp_end   = formObj.f_enddt.value.replaceAll("-","");
	//var start_dt = tmp_start.substring(4,8)+tmp_start.substring(0,2)+tmp_start.substring(2,4);
	//var end_dt   = tmp_end.substring(4,8)+tmp_end.substring(0,2)+tmp_end.substring(2,4);
	var start_dt='';
	var end_dt='';
	if(print_type == "B"){
		//Parameter Setting
  		var param="[" + "'" + inv_seq + "'" + ']';	// [1]
		param += '[' + trdp_cd + ']';					// Vendor [2]
		param += '[' + ref_ofc_cd + ']';				// REF_OFC_CD [3]
		param += '[' + bl_cnt_cd + ']';					// CNT_CD  [4]
		param += '[' + formObj.f_usr_nm.value + ']';					// USER_NM [5]
		param += '[' + formObj.f_email.value + ']';						// USER EMAIL [6]
		param += '[' + formObj.f_usrPhn.value + ']';					// 7
		param += '[' + formObj.f_usrFax.value + ']';					// 8
		param += '[' + formObj.f_usr_nm.value + ']';						// 9
	}else{
		var param='[' + formObj.f_email.value + ']';				// USER EMAIL';	[1]
		//if(formObj.prn_radio[0].checked){
			param += "[" + "'" + inv_seq + "'" + ']';			// [2]
			param += '[]';											// [3]
			param += '[]';											// [4]
			param += '[]';											// [5]
			param += '[]';											// [6]	
		/*
		}else{
			param += '[]';											// [2]
			param += '[' + start_dt + ']';							// [3]
			param += '[' + end_dt + ']';							// [4] 
			if(formObj.date_radio[0].checked){
				formObj.f_search_type.value="POST";
			}else{
				formObj.f_search_type.value="INVOICE";
			}
			param += '[' + formObj.f_search_type.value + ']';		// POST DATE OR INVOICE DATE [5]
			if(formObj.sort_radio[0].checked){
				formObj.f_order_type.value="DATE";
			}else{
				formObj.f_order_type.value="INVNO";
			}
			param += '[' + formObj.f_order_type.value + ']';		// ORDER BY(DATE OR INV_NO)	[6]
		}
		*/
		if(print_type == "D" || print_type == "C"){
			//param += '[' + formObj.f_ref_ofc_cd.value + 'MAINCMP]';		// CURR BRANCH[7]
			param += '[' + trdp_cd + ']';				// TRDP_CD [7]
			param += '[' + ref_ofc_cd + ']';			// OFC_CD  [8]
		}else if(print_type == "S"){
			//param += '[' + ref_ofc_cd.value + 'MAINCMP]';		// CURR BRANCH[7]
			param += '[' + trdp_cd + ']';				// TRDP_CD [7]
			param += '[' + ref_ofc_cd + ']';			// OFC_CD  [8]
			param += '[' + bl_cnt_cd + ']';				// CNT_CD  [9]
			param += '[' + formObj.f_usr_nm.value + ']';				// USER_NM [10]
		}
		param += '[' + formObj.f_usrPhn.value + ']';				// 9,  11
		param += '[' + formObj.f_usrFax.value + ']';				// 10, 12
		param += '[' + formObj.f_usrId.value + ']';					// 11, 13
		//param += '[' + formObj.main_trdp.value + ']';				// 12, 14
		param += '[]';				// 12, 14
		param += '[' + formObj.f_ofc_loc_nm.value + ']';		//13  cr_db
		param += '[]';		//13  cr_db
	}
	formObj.f_inv_seq.value=inv_seq;
	var temp='';
	var mailTitle='';
	if(print_type =="D" || print_type=="C"){
		temp='Credit/Debit Note No : ';
	}else{
		temp='Invoice No : ';
	}
	mailTitle=temp + inv_no;	
	formObj.mailTitle.value=mailTitle;
	formObj.rpt_biz_tp.value="ACCT";
	if(print_type=="D" || print_type=="C"){
		formObj.rpt_biz_sub_tp.value="DC";
	} else if (print_type=="S"){
		formObj.rpt_biz_sub_tp.value="AR";
	} else {
		formObj.rpt_biz_sub_tp.value="AP";
	}	
	var trdp_cd1='';
	trdp_cd1='(' + '\'' + trdp_cd + '\'' + ')';
	//alert(trdp_cd1);
	ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd1, './GateServlet.gsl');
	formObj.mailTo.value=mailTo;
	formObj.intg_bl_seq_tmp.value=formObj.intg_bl_seq.value;
	formObj.intg_bl_seq.value="";
	//alert(param);
	formObj.rd_param.value=param;
	popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	formObj.intg_bl_seq.value=formObj.intg_bl_seq_tmp.value;
}
/* #18793, [GPL]Profit Report jsjang 2013.11.8 */
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
/*
	if(formObj.f_inv_seq.value != ""){
		var inv_seq=formObj.f_inv_seq.value;
		var inv_no=formObj.f_inv_no.value;
		var print_type=formObj.f_print_type.value;
		var bl_cnt_cd=formObj.f_bl_cnt_cd.value;
		var ref_ofc_cd=formObj.f_ref_ofc_cd.value;
		var oth_seq=formObj.f_oth_seq.value;
		var trdp_cd=formObj.f_trdp_cd.value;
		var reqParam='?f_inv_no='+ inv_no+'&f_print_type=' + print_type + '&f_inv_seq=' + inv_seq + '&f_bl_cnt_cd=' + bl_cnt_cd + '&f_ref_ofc_cd=' + ref_ofc_cd+ '&f_oth_seq=' + oth_seq + '&f_trdp_cd='+ trdp_cd;
		var temp='';
		if(print_type=="DB/CR"){
			temp='Credit/Debit Note No : ';
		}else{
			temp='Invoice No : ';
		}
reqParam += '&mailTitle=' + temp + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "inv_no");
		formObj.rpt_biz_tp.value="ACCT";
		if(print_type=="DB/CR"){
			formObj.rpt_biz_sub_tp.value="DC";
		} else if (print_type=="A/R"){
			formObj.rpt_biz_sub_tp.value="AR";
		} else {
			formObj.rpt_biz_sub_tp.value="AP";
		}
 		var trdp_cd='';
trdp_cd += '(' + '\'' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trdp_cd") + '\'' + ')';
 		ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
 		reqParam += '&mailTo=' + mailTo;
		popGET('ACC_INV_0050.clt'+reqParam, '', 390, 330, "scroll:yes;status:no;help:no;");
	}else {
		//Please select the row to print.
		alert(getLabel('FMS_COM_ALT004') + "\n\n: ACC_INV_0040.280");
		return;
	}
*/
function getRadioVal(radioObj){
	var rtnStr="";
	for(var i=0; i<radioObj.length; i++){
	   if(radioObj[i].checked==true)
	   {
		   rtnStr=radioObj[i].value;
	   }
	}
	return rtnStr;
}
function currRateCheck(sheetObj){
	var rtnVal=false;
	if(sheetObj.RowCount()> 0){
		for(var i=1; i<=sheetObj.LastRow();i++){
			if(sheetObj.GetCellValue(i, "rate") <= 0 ){
				sheetObj.SelectCell(i, "rate");
				rtnVal=true;
				alert(getLabel('PFM_COM_ALT018'));
				break;
			}
		}	
	}
	return rtnVal;
}
function getRateQuery(){
	var sheetObj=docObjects[0];
	var rateSQL="select  rate.curr_cd, rate.aply_fm_dt, rate.xch_rt_ut "
			+     "  from ( "
			;
	//ex)
	//select rate.curr_cd, rate.aply_fm_dt, rate.xch_rt_ut
	//from (
	//		select 'USD' as curr_cd, '201308' AS aply_fm_dt, 2 AS xch_rt_ut
	//      UNION
	//		select 'JPY' as curr_cd, '201308' AS aply_fm_dt, 2 AS xch_rt_ut
    //      ) rate
	if(sheetObj.RowCount()== 0){
		rateSQL += "         SELECT '" + '' + "' AS curr_cd, " 
								 + "'" + '' + "'  AS aply_fm_dt, "
								 + 0 + " AS xch_rt_ut ) rate ";
	}else{
		for(var i=1; i<=sheetObj.LastRow();i++){
			rateSQL += "         SELECT '" + sheetObj.GetCellValue(i, "curr_cd") + "' AS curr_cd, "
					+ "'" + sheetObj.GetCellValue(i, "aply_fm_dt") + "' AS aply_fm_dt, "
					+ sheetObj.GetCellValue(i, "rate") + " AS xch_rt_ut ";
	    	if(i < sheetObj.LastRow()){
	    		rateSQL += " UNION ";
	    	}else{
	    		rateSQL += "      ) rate ";
	    	}
		}	
	}
	return rateSQL;
}
function prn_opt_sheet(){
	var formObj=document.frm1;
	var sheetObj2=docObjects[1];
	var sheetObj3=docObjects[2];
	var f_prn_opt=document.getElementsByName("f_prn_opt"); 
	var prn_opt=getRadioVal(f_prn_opt);
	sheetObj2.SetSheetHeight(340);
	sheetObj3.SetSheetHeight(340);
	if(prn_opt == "D"){
		mainTable2.style.display="block";
		mainTable3.style.display="none";
	}else{
		mainTable2.style.display="none";
		mainTable3.style.display="block";
	}
}
function setRows2Info(sheetObj){
	var formObj=document.frm1;
 	var sRow=0;
 	var pre_="";
	if(sheetObj == docObjects[1]){
		sRow=1;
	 	pre_="d_";
	}
	if(sheetObj == docObjects[2]){
		sRow=1;
	 	pre_="";
	}
	for(var i=sRow; i<sheetObj.LastRow()+1; i++){
		if(formObj.air_sea_clss_cd.value == "S" && formObj.bnd_clss_cd.value == "I"){
			if(sheetObj.GetCellValue(i
					, pre_+"bl_kind")!="" && sheetObj.GetCellValue(i, pre_+"bl_kind") != "M"){
				var org_bl_rcvd_flg=(sheetObj.GetCellText(i, pre_+"org_bl_rcvd_flg")== "Y") ? "Origin " : "";
				var rcvd_dt_tm=(sheetObj.GetCellText(i, pre_+"rcvd_dt_tm")!= "") 		? "Released :  " + sheetObj.GetCellText(i, pre_+"rcvd_dt_tm") : " ";
				var express_tp_cd=(sheetObj.GetCellText(i, pre_+"express_tp_cd")== "Y") 	? "Express " : "";
				var rlsd_dt_tm=(sheetObj.GetCellText(i, pre_+"rlsd_dt_tm")!= "") 		? "Released :  " + sheetObj.GetCellText(i, pre_+"rlsd_dt_tm") : "";
				sheetObj.SetCellText(i, pre_+"remark" ,"O B/L : " + org_bl_rcvd_flg + rcvd_dt_tm + express_tp_cd + rlsd_dt_tm);
			}	
		}
		
		//26888
		if (sheetObj == docObjects[1]) {
			if((sheetObj.GetCellValue(i, pre_+"bl_kind")!="" && sheetObj.GetCellValue(i, pre_+"bl_kind") != "H") && 
					(sheetObj.GetCellValue(i, pre_+"sell_buy_tp_cd") == "D" || sheetObj.GetCellValue(i, pre_+"sell_buy_tp_cd") == "C") &&
					sheetObj.GetCellValue(i, pre_+"rmk_bl_no") != ""){
				var rmk_bl_no 	= (sheetObj.GetCellText(i, pre_+"rmk_bl_no")!= "") ? sheetObj.GetCellText(i, pre_+"rmk_bl_no") + " ": "";
				
				sheetObj.SetCellText(i, pre_+"remark", "B/L : " + rmk_bl_no);
			}
		} else {
			if(!(sheetObj.GetCellValue(i, "last_chk_no")=="" && sheetObj.GetCellValue(i, "last_pay_dt") == "")){
				var last_chk_no 	= (sheetObj.GetCellText(i, pre_+"last_chk_no")!= "") ? sheetObj.GetCellText(i, pre_+"last_chk_no") + " ": "";
				var last_pay_dt 	= (sheetObj.GetCellText(i, pre_+"last_pay_dt")!= "") ? sheetObj.GetCellText(i, pre_+"last_pay_dt") : "";
				
				sheetObj.SetCellText(i, pre_+"remark", sheetObj.GetCellText(i, pre_+"remark") + "   " + " Check # " + last_chk_no + last_pay_dt);
			}
		}
	}
}
function summary_sub_total(){
	var formObj=document.frm1;
	var sheetObj3=docObjects[2];
	
    //표시된 모든 소계의 행 번호를 가져온다. 결과->"3|5|10|"
    var sRow=sheetObj3.FindSubSumRow();
    //가져온 행을 배열로 반든다.
    var arrRow=sRow.split("|");
    for (idx=0; idx<arrRow.length; idx++){ 

    	sheetObj3.SetCellFont("FontBold", arrRow[idx],0,arrRow[idx],3,1);
    	sheetObj3.SetCellFont("FontBold", arrRow[idx],4,arrRow[idx],5,1);
    	sheetObj3.SetCellFont("FontBold", arrRow[idx],6,arrRow[idx],7,1);

    	if(sheetObj3.GetCellValue(arrRow[idx],4) == "Total" ){
    		sheetObj3.SetCellAlign(arrRow[idx],4,"Center");
    	}
    	if(sheetObj3.GetCellValue(arrRow[idx],3).indexOf("Profit") != -1 ){
    		 sheetObj3.SetCellText(arrRow[idx], 4,sheetObj3.GetCellText(arrRow[idx], 3));
    		 sheetObj3.SetCellText(arrRow[idx], 5,sheetObj3.GetCellText(arrRow[idx], 10));
    		 sheetObj3.SetCellText(arrRow[idx], 6,sheetObj3.GetCellText(arrRow[idx], 10));
    		 sheetObj3.SetCellText(arrRow[idx], 7,sheetObj3.GetCellText(arrRow[idx], 10));
    		 sheetObj3.SetMergeCell(Number(arrRow[idx]), 3, 1, 2);
    		 sheetObj3.SetMergeCell(Number(arrRow[idx]), 5, 1, 3);
    		 sheetObj3.SetCellAlign(arrRow[idx], 3,"Center");
    	}
   }
}
function sub_total(){
	var formObj=document.frm1;
	var sheetObj2=docObjects[1];
//no support[implemented common]CLT 	sheetObj2.MessageText ("SubSum")="Currency"; 
	
	//표시된 모든 소계의 행 번호를 가져온다. 결과->"3|5|10|"
    var sRow=sheetObj2.FindSubSumRow();
    
    //가져온 행을 배열로 반든다.
    var arrRow=sRow.split("|");
    for (idx=0; idx<arrRow.length; idx++){ 
    	if(  sheetObj2.GetCellValue(arrRow[idx],4) == "Total" ){
			sheetObj2.SetCellText(arrRow[idx], 7,(sheetObj2.GetCellText(arrRow[idx], 7) - sheetObj2.GetCellText(arrRow[idx], 8)));
			sheetObj2.SetCellText(arrRow[idx], 8,sheetObj2.GetCellText(arrRow[idx], 7));
    		sheetObj2.SetCellAlign(arrRow[idx],4,"Center");
    	}
    	
    	if(  sheetObj2.GetCellValue(arrRow[idx],4).indexOf("Profit") != -1  ){
			sheetObj2.SetCellText(arrRow[idx], 4,sheetObj2.GetCellText(arrRow[idx], 4));
			sheetObj2.SetCellText(arrRow[idx], 5,sheetObj2.GetCellText(arrRow[idx], 15));
			sheetObj2.SetCellText(arrRow[idx], 6,sheetObj2.GetCellText(arrRow[idx], 15));
			sheetObj2.SetCellText(arrRow[idx], 7,sheetObj2.GetCellText(arrRow[idx], 15));
			sheetObj2.SetCellText(arrRow[idx], 8,sheetObj2.GetCellText(arrRow[idx], 15));
			sheetObj2.SetMergeCell(Number(arrRow[idx]), 5, 1, 4);
    		sheetObj2.SetCellAlign(arrRow[idx], 4,"Center");
    	}
    	
    	if(sheetObj2.GetCellValue(arrRow[idx],4) == ""){
	   		 sheetObj2.SetCellAlign(arrRow[idx], 4,"Center");
	   		 
	   		 //26888
	    	 if(!(sheetObj2.GetCellValue(arrRow[idx] - 1, 20)=="" && sheetObj2.GetCellValue(arrRow[idx] - 1, 21) == "")){
	    		 var last_chk_no 	= (sheetObj2.GetCellValue(arrRow[idx] - 1, 20)!= "") ? sheetObj2.GetCellValue(arrRow[idx] - 1, 20) + " ": "";
				 var last_pay_dt 	= (sheetObj2.GetCellValue(arrRow[idx] - 1, 21)!= "") ? sheetObj2.GetCellValue(arrRow[idx] - 1, 21) : "";
					
				 if (last_pay_dt != "") {
					 last_pay_dt = last_pay_dt.substring(4,6) + "-" + last_pay_dt.substring(6,8) + "-" + last_pay_dt.substring(0,4);
				 }
					
				 sheetObj2.SetCellText(arrRow[idx], 14, "Check # " + last_chk_no + " " + last_pay_dt + "");
	    	 }
    	}
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