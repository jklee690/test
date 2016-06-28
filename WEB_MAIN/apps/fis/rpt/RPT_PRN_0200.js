function doWork(srcName){
	var formObj=document.frm1;
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    switch(srcName) {
	    case "SEARCHLIST":
	        formObj.f_cmd.value=SEARCHLIST01;
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
				formObj.one_curr_rate_sql.value=getRateQuery();
			}
 			sheetObj2.DoSearch("./RPT_PRN_0201GS.clt", FormQueryString(formObj) );
	    break;
	    case "CURR_SEARCH":
	        formObj.f_cmd.value=SEARCHLIST;
	        var f_curr_opt=document.getElementsByName("f_curr_opt");	//Currency Option
		    var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt != "O"){
				//Please, select the [One Currency]
	 	    	//alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_OCUR') + "\n\n: RPT_PRN_0200.16");
				//return;
				formObj.f_curr_one.checked=true;              
			}
		    if(formObj.f_curr_cd.value == ""){
		    	//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR') + "\n\n: RPT_PRN_0200.23");
				return;
			}
 	       sheetObj.DoSearch("./RPT_PRN_0200GS.clt", FormQueryString(formObj) );
	    break;
		case 'Print':
			//2012.02.16 : Billing Code의 Prmc.가 check된 대상 만 Profit에 포함됨(AND frt.pfmc_flg = 'Y')
			formObj.title.value='Profit Report By HB/L';
			if(formObj.intg_bl_seq.value == "") return;
			//Report 호출 메뉴 
			var air_sea_clss_cd=formObj.air_sea_clss_cd.value;
			var bnd_clss_cd=formObj.bnd_clss_cd.value;
			var biz_clss_cd=formObj.biz_clss_cd.value;
			//One, Multi Currency 선택 option
			var f_curr_opt=document.getElementsByName("f_curr_opt");		
			var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt == "O" && sheetObj.DataRow == 0){
				//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR') + "\n\n: RPT_PRN_0200.51");
				return;
			}
			//Parameter Setting
			var param="";
			var file_names="";
			//Multi Currency 인 경우 
			if(MULTI_CURR_FLAG == "Y"){
				if(curr_opt == "M"){					
					//var profitCurr=PROFITCURR.split("|");					
					param += '[' + formObj.intg_bl_seq.value + ']'; //$1
					param += '[' + air_sea_clss_cd + ']';  			//$2
					param += '[' + bnd_clss_cd + ']';		 		//$3
					param += '[' + biz_clss_cd + ']';				//$4
					param += '[' + formObj.f_bl_no.value + ']';		//$5
					param += '[' + formObj.f_ofc_cd.value + ']';	//$6
					param += '[' + formObj.f_usrId.value + ']';		//$7
					
					//param += '[' + profitCurr[0] + ']';
					file_names += 'profit_report_hbl_byHbl_multi_curr.mrd';
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;
					//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}else{
					
					//Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
		            if(currRateCheck(sheetObj)){
		            	return;
		            }
					
					param += '[' + formObj.intg_bl_seq.value + ']'; 		//$1
					param += '[' + air_sea_clss_cd + ']';  					//$2
					param += '[' + bnd_clss_cd + ']';		 				//$3
					param += '[' + biz_clss_cd + ']';						//$4
					param += '[' + formObj.f_bl_no.value + ']';				//$5
					param += '[' + formObj.f_ofc_cd.value + ']';			//$6
					param += '[' + formObj.f_curr_cd.options[formObj.f_curr_cd.selectedIndex].text + ']';	//$7 f_curr_cd
					param += '[' + getRateQuery() + ']';					//$8 One 인 경우 Currency SQL
					param += '[' + formObj.f_usrId.value + ']';				//$9
					
					file_names += 'profit_report_hbl_byHbl_one.mrd';
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;					
					//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
			}else{
				//Multi Currency 인 경우 
				if(curr_opt == "M"){
					
					//var profitCurr = PROFITCURR.split("|");				
					
					//for(var i = 0 ; i < profitCurr.length ; i ++){
						param += '[' + formObj.intg_bl_seq.value + ']'; //$1
						param += '[' + air_sea_clss_cd + ']';  			//$2
						param += '[' + bnd_clss_cd + ']';		 		//$3
						param += '[' + biz_clss_cd + ']';				//$4
						param += '[' + formObj.f_bl_no.value + ']';		//$5
						param += '[' + formObj.f_ofc_cd.value + ']';	//$6
						param += '[' + formObj.f_usrId.value + ']';		//$7
						//param += '[' + profitCurr[i] + ']';				//$7
						//if(i < profitCurr.length-1){
						//	param += '^@@^';
						//}	

						file_names += 'profit_report_hbl_byHbl_multi.mrd';
						
						//if(i < profitCurr.length-1){
						//	file_names += '^@@^';
						//}
					//}
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;
					//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
				}
	    
			    //One Currency 인 경우 
				if(curr_opt== "O"){					
					//Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
		            if(currRateCheck(sheetObj)){
		            	return;
		            }					
					param += '[' + formObj.intg_bl_seq.value + ']'; 		//$1
					param += '[' + air_sea_clss_cd + ']';  					//$2
					param += '[' + bnd_clss_cd + ']';		 				//$3
					param += '[' + biz_clss_cd + ']';						//$4
					param += '[' + formObj.f_bl_no.value + ']';				//$5
					param += '[' + formObj.f_ofc_cd.value + ']';			//$6
					param += '[' + formObj.f_curr_cd.options[formObj.f_curr_cd.selectedIndex].text + ']';	//$7 f_curr_cd
					param += '[' + getRateQuery() + ']';					//$8 One 인 경우 Currency SQL
					param += '[' + formObj.f_usrId.value + ']';				//$9
					
					file_names += 'profit_report_hbl_byHbl_one.mrd';
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;					
					//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
			}
		break;
		case 'EXCEL':
			if(sheetObj2.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
//	   			sheetObj2.Down2Excel({ HiddenColumn:-1, Merge:1});
	   			sheetObj2.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj2), SheetDesign:1,Merge:1 });
	   		}
        break;
		case 'MINIMIZE':
			if(mainForm.style.display != "none") {
				mainForm.style.display="none";
				$(formObj.btn_minimize).html("Maximize");
				sheetObj2.SetSheetHeight(510);
			} else {
				mainForm.style.display="block";
				$(formObj.btn_minimize).html("Minimize");
				sheetObj2.SetSheetHeight(340 );
			}
        break; 
		case "CLOSE":
//			ComClosePopup(); 
			window.close(); 
    	break;
    }
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
	
	if( formObj.air_sea_clss_cd.value  == "S" ){
		hbl.style.display="inline";
	}else {	
		hawb.style.display="inline";
	}
	
	for(var i=0;i<docObjects.length;i++){
	//khlee-시작 환경 설정 함수 이름 변경
	comConfigSheet(docObjects[i], SYSTEM_FIS);
	initSheet(docObjects[i],i+1);
	//khlee-마지막 환경 설정 함수 추가
	comEndConfigSheet(docObjects[i]);
	}
	formObj.f_curr_cd.value=formObj.h_curr_cd.value;
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
		case 1:      //IBSheet2 init
				    with(sheetObj){
			       
			     // (3, 0, 0, true);
			      var cnt=0;
		
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
			            SetSheetHeight(120);
	      }


		break;
		case 2:      //IBSheet2 init
		    with(sheetObj){
	       
	      //(24, 0, 0, false);
	      var cnt=0;

	      SetConfig( { SearchMode:2, MergeSheet:2, Page:20, DataRowMerge:0 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('RPT_PRN_0201_HDR1'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",     Hidden:0,  Width:32,   Align:"Left",    ColMerge:1,   SaveName:"bl_kind" },
	             {Type:"Text",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"bl_no" },
	             {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"inv_no2" },
	             {Type:"Date",      Hidden:0,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd" },
	             {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"bill_to",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:32,   Align:"Center",  ColMerge:0,   SaveName:"frt_kind",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"frt_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:0,   SaveName:"ratio",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"local_inv_amt",   KeyField:0,   CalcLogic:"Math.round(|local_inv_amt|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cost_inv_amt",    KeyField:0,   CalcLogic:"Math.round(|cost_inv_amt|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"dc_inv_amt",      KeyField:0,   CalcLogic:"Math.round(|dc_inv_amt|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:20,   Align:"Center",  ColMerge:0,   SaveName:"clr_yn",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_curr_cd" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"sell_buy_tp_cd" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_no" },
	             {Type:"Float",      Hidden:1, Width:20,   Align:"Center",  ColMerge:0,   SaveName:"",                KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Float",      Hidden:1, Width:20,   Align:"Center",  ColMerge:0,   SaveName:"profit",          KeyField:0,   CalcLogic:"Math.round((|local_inv_amt|-|cost_inv_amt|+|dc_inv_amt|)*100)/100",Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_curr_cd2" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_curr_cd3" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"ref_ofc_cd" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_seq" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"trdp_cd" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"ofc_cd" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"bl_cnt_cd" } ];
	       
	      		InitColumns(cols);
	      		SetEditable(0);
	            InitViewFormat(0, "inv_post_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	            SetSheetHeight(340);
          
		        ShowSubSum([
	                      {StdCol:"inv_curr_cd3", SumCols:"16", Sort:false, ShowCumulate:false, CaptionCol:6, CaptionText:"Profit : %col "}
	                      ,{StdCol:"inv_curr_cd2", SumCols:"8|9|10", Sort:false, ShowCumulate:false, CaptionCol:6, CaptionText:"Total"}
//	                      ,{StdCol:"inv_curr_cd", SumCols:"15", Sort:false, ShowCumulate:false, CaptionCol:0,CaptionText:"Currency : %col "}
	                      ]);
		        
//		        SetSubSumBackColor("#ECE7F7");
	      }


		break;
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
} 
function sheet2_OnSearchEnd(){
	var sheetObj2=docObjects[1];
	sub_total();
	//[20131118 ojg]
	for(var i=1;i<=sheetObj2.LastRow();i++){
		if(sheetObj2.GetCellValue(i,"inv_no2") != ""){
 			sheetObj2.SetCellFont("FontUnderline", i,"inv_no2", i,"inv_no2",1);
 			sheetObj2.SetCellFontColor(i, "inv_no2","#0000FF");
		}	
	}
	
	/**
	 * 소계 TITLE 영역 상단 출력
	 */
	var formObj = document.frm1;
	var arrTitleRow = new Array();
	var cellValue="";
	for(var i=1;i<=sheetObj2.LastRow();i++){
		if(sheetObj2.GetCellValue(i,"inv_curr_cd") != "" && cellValue != sheetObj2.GetCellValue(i,"inv_curr_cd")){
			arrTitleRow.push(i);
			var mergeRow = sheetObj2.GetMergedEndCell(i,0).split(",")[0];
			if(mergeRow != i){
				i=mergeRow;
			}
		}
		if(sheetObj2.GetCellValue(i,"inv_curr_cd") != ""){
			cellValue = sheetObj2.GetCellValue(i,"inv_curr_cd");
		}
	}
	
	for(var i=0; i < arrTitleRow.length ; i++){
		var row = sheetObj2.DataInsert(arrTitleRow[i]+i);
		sheetObj2.SetMergeCell(row,0,1,sheetObj2.LastCol());
		var gTitle = "Currency : " +  sheetObj2.GetCellText(row + 1,"inv_curr_cd") 
													+ "   Reference No. : " + formObj.f_ref_no.value    
    												+ "   MB/L No. : " + formObj.f_bl_no.value 
    												+ "";
													
		sheetObj2.SetCellValue(row,0, gTitle);
		sheetObj2.SetRowFontColor(row, "#FF0000");
		sheetObj2.SetCellFont("FontBold", row,0,row,0,1);
		sheetObj2.InitCellProperty(row,0,{Type:"Text", Align:"Left"});
	}
	
} 
//[20131118 OJG]
function sheet2_OnClick(sheetObj2,Row,Col){
	var formObj=document.frm1;
	if(sheetObj2.ColSaveName(Col) == "inv_no2"){
		// 소계Row 클릭인 경우, return
		if(sheetObj2.GetCellValue(Row, "inv_no2") != ''){
			var inv_seq=sheetObj2.GetCellValue(Row,"inv_seq");
			var inv_no=sheetObj2.GetCellValue(Row,"inv_no2");
			var print_type=sheetObj2.GetCellValue(Row,"sell_buy_tp_cd");
			var bl_cnt_cd=sheetObj2.GetCellValue(Row,"bl_cnt_cd");
			var ref_ofc_cd=sheetObj2.GetCellValue(Row,"ref_ofc_cd");
			var ofc_cd=sheetObj2.GetCellValue(Row,"ofc_cd");
			var trdp_cd=sheetObj2.GetCellValue(Row,"trdp_cd");
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
function sub_total(){
	var formObj=document.frm1;
	var sheetObj2=docObjects[1];

    //표시된 모든 소계의 행 번호를 가져온다. 결과->"3|5|10|"
    var sRow=sheetObj2.FindSubSumRow();
    //가져온 행을 배열로 반든다.
    var arrRow=sRow.split("|");
    for (idx=0; idx<arrRow.length; idx++){ 
     	sheetObj2.SetCellFont("FontBold", arrRow[idx],0,arrRow[idx],6,1);
     	sheetObj2.SetCellFont("FontBold", arrRow[idx],7,arrRow[idx],8,1);
     	sheetObj2.SetCellFont("FontBold", arrRow[idx],9,arrRow[idx],10,1);

    	if(sheetObj2.GetCellValue(arrRow[idx],6).indexOf("Profit") != -1){
    		sheetObj2.SetCellText(arrRow[idx], 8,sheetObj2.GetCellText(arrRow[idx], 16));
    		sheetObj2.SetCellText(arrRow[idx], 9,sheetObj2.GetCellText(arrRow[idx], 16));
    		sheetObj2.SetCellText(arrRow[idx], 10,sheetObj2.GetCellText(arrRow[idx], 16));
    		sheetObj2.SetMergeCell(Number(arrRow[idx]), 8, 1, 3);
    	}
    	if(sheetObj2.GetCellValue(arrRow[idx],0).indexOf("Currency") != -1 ){
//    		sheetObj2.SetCellText(arrRow[idx], 0 ,sheetObj2.GetCellText(arrRow[idx], 0)
//					+ "   Reference No. : " + formObj.f_ref_no.value    
//					+ "   MB/L No. : " + formObj.mbl_no.value 
//					+ "   HB/L No. : " + formObj.f_bl_no.value
//					+ "");
//    		sheetObj2.SetMergeCell(Number(arrRow[idx]), 0, 1, 12);
    	}else{
    		sheetObj2.SetCellAlign(arrRow[idx],6,"Center");
    	}
    }
}
