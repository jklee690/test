var inv_viw_tp = 'A';
var rtnary = new Array(1);
function doWork(srcName){
	if(!btnVisible(srcName)){
		return;
	}
    var formObj  = document.frm1;

    switch(srcName) {
		case "SEARCHLIST":
			
			var empCond = 0;
			if(formObj.f_house_bl_no.value==''){
				empCond++;
				
			}
			if(formObj.f_master_bl_no.value==''){
				empCond++;
			}
			if(empCond==2){
				alert(getLabel('AIE_BMD_MSG76'));
				formObj.f_master_bl_no.focus();
			}else{
				doShowProcess();
	       		formObj.f_cmd.value = SEARCHLIST;
				formObj.action = "./AII_FRT_0020.clt";
				formObj.submit();				
			}
		break;
		case "SEARCHLIST02":	//House B/L 목록을 조회함
			if(frm1.intg_bl_seq.value!=''){
	       		formObj.f_cmd.value = SEARCHLIST02; 
			    docObjects[0].DoSearch4Post("AII_FRT_0020_1GS.clt", FormQueryString(formObj));
			}
		break;
		case "SEARCHLIST03":	//Buying/Credit Tariff 목록을 조회함
			if(frm1.intg_bl_seq.value!=''){
	       		formObj.f_cmd.value = SEARCHLIST03; 
			    docObjects[1].DoSearch4Post("AII_FRT_0020_2GS.clt", FormQueryString(formObj));
			}
		break;
		case "ROWADD":
			if(frm1.intg_bl_seq.value==''){
				alert(getLabel('AIR_MSG_072'));
				return;
			}else{
				var intRows5 = docObjects[1].Rows;
				var tmpRow = intRows5-1
				if(docObjects[1].CellValue(tmpRow, "sell_buy_tp_cd")==''){
				  intRows5 = tmpRow;
				}
				docObjects[1].DataInsert(intRows5);

				
				//docObjects[1].CellValue2(intRows5, 'trdp_cd')  = frm1.hid_lin_cd.value;
				//docObjects[1].CellValue2(intRows5, 'trdp_nm')  = frm1.hid_lin_nm.value;
				
				docObjects[1].CellValue2(intRows5, "rat_curr_cd") = frm1.trf_cur_cd.value;
				docObjects[1].CellValue2(intRows5, "perf_curr_cd")= dfPerfCurr;

				docObjects[1].CellValue2(intRows5, "inv_curr_cd") = frm1.ofc_curr.value;
				if(frm1.ofc_curr.value==frm1.trf_cur_cd.value){	//Office Currency와 CCT의 Currency가 같은경우 Invoice curency를 1로
					docObjects[1].CellValue2(intRows5, "inv_xcrt") = 1;
					
				}else{
					docObjects[1].CellValue2(intRows5, "inv_xcrt") = frm1.dispCur.value;
				}
				docObjects[1].CellValue2(intRows5,   "inv_xcrt_dt") = frm1.xcrtDt.value;
				
				docObjects[1].CellValue2(intRows5, "auto_trf_flg")= 'N';
				docObjects[1].CellValue2(intRows5, "perf_xcrt")= 0;
				docObjects[1].CellValue2(intRows5, "perf_amt") = 0;
				docObjects[1].CellValue2(intRows5, "perf_vat_amt") = 0;

			}
		break;
		case "SAVE":	//등록/수정/삭제시
			formObj.f_cmd.value = COMMAND01;
			
			var frtRow = docObjects[1].Rows;
			for(var i = 2; i < frtRow; i++){
				//Auto Tariff된 값 최초 저장시 
				if(docObjects[1].CellValue(i, 'auto_trf_flg')=='Y'&&docObjects[1].CellValue(i, 'frt_seq')==''){
					docObjects[1].CellValue(i, 'ibflag') = 'I';
				}
			}
			var secCheck = checkInpuVals(docObjects[1], '');
			var bcFlg = true;
			if(secCheck=='IV'){
				bcFlg = false;
				alert(getLabel('AIR_MSG_074'));
				
			}else if(secCheck=='NI'){
				bcFlg = false;
				//There is no data to save!
			}
			
			if(bcFlg==true){
				//Total 을 표시한다.
            	doMblSumFrt(docObjects[1], 2, '');
            	//Do you want to PROCEED?
				if(confirm(getLabel('FMS_COM_CFMCON'))){
					docObjects[1].DoAllSave("./AII_FRT_0020_2GS.clt", FormQueryString(formObj)+'&'+docObjects[0].GetSaveString(false), true);
				}
			}
		break;
		case "HBL_POPLIST":
	  		rtnary = new Array(1);
				rtnary[0] = "A";	//openMean S = 해운에서 오픈, A = 항공에서 오픈
				rtnary[1] = "I";	//I: In-bound, O: Out-bound
				
	       	var rtnVal = window.showModalDialog('./CMM_POP_0170.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
	      
	       	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 		return;
			}else{
				var rtnValAry = rtnVal.split("|");
				formObj.f_bkg_no.value = '';
				formObj.f_house_bl_no.value = rtnValAry[0];//house_bl_no
				
				formObj.f_master_bl_no.value= '';
				doWork('SEARCHLIST');
			}
		break;
		case "MBL_POPLIST"://openMean S = 해운에서 오픈, A = 항공에서 오픈
      		rtnary = new Array(1);
   			rtnary[0] = "A";	//openMean S = 해운에서 오픈, A = 항공에서 오픈
   			rtnary[1] = "I";	//I: In-bound, O: Out-bound
   			
        	var rtnVal = window.showModalDialog('./CMM_POP_0180.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
        	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 		return;
			}else{
				var rtnValAry = rtnVal.split("|");
				formObj.f_master_bl_no.value = rtnValAry[0];
				
				formObj.f_house_bl_no.value = ''; 
				doWork('SEARCHLIST');
			}
		break;
    }
}

function inpuValCheck(sheetObj, f_cmd, objPrefix){
	var rowCnt = sheetObj.rows;
	var isOk = true;
	var checkVal = false;
	var loopNum = 0;
	for(var i = 1; i < rowCnt; i++){
	   var stat = sheetObj.CellValue(i, objPrefix+'ibflag');
	   if(stat!='R'){
		   if(f_cmd==ADD&&stat=='I'){
			   checkVal = true;
			   loopNum++;
		   }else if(f_cmd==MODIFY&&stat=='U'){
			   checkVal = true;
			   loopNum++;
		   }	
	   }
	}
	return loopNum;
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;

var headerRowCnt = 2;

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	 var formObj  = document.frm1;
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
}


/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++] = sheet_obj;
}


/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
        case 1:      //House B/L List조회
           with (sheetObj) {
               // 높이 설정
               style.height = 120;
               
               //전체 너비 설정
               SheetWidth = mainTable.clientWidth;
              // SheetWidth = 400;

               //Host정보 설정[필수][HostIp, Port, PagePath]
               if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);

               //전체Merge 종류 [선택, Default msNone]
               MergeSheet = msHeaderOnly;

              //전체Edit 허용 여부 [선택, Default false]
               Editable = false;

               //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
               InitRowInfo( 2, 1, 9, 100);

               //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
               InitColumnInfo(13, 0, 0, true);

               // 해더에서 처리할 수 있는 각종 기능을 설정한다
               InitHeadMode(true, true, true, true, false,false) ;

               //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
               InitHeadRow(0, getLabel('SEE_FRT_0010_HDR5_1'), true);
               InitHeadRow(1, getLabel('SEE_FRT_0010_HDR5_2'), true);

               //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
               InitDataProperty(0, 0,  dtData,        40,   daCenter,  true,   "");
               InitDataProperty(0, 1,  dtData,       110,   daLeft,    true,   "hbl_no");
               InitDataProperty(0, 2,  dtData,       120,   daLeft,    true,   "shipper_trdp_nm");
     		   InitDataProperty(0, 3,  dtData,       120,   daLeft,    true,   "consignee_trdp_nm");
     		   InitDataProperty(0, 4,  dtData,       120,   daLeft,    true,   "partner_trdp_nm");
     		   
     		   InitDataProperty(0, 5,  dtData,        80,   daCenter,  true,   "por_cd");
               InitDataProperty(0, 6,  dtData,        80,   daCenter,  true,   "pol_cd");
               InitDataProperty(0, 7,  dtData,        80,   daCenter,  true,   "pod_cd");
               InitDataProperty(0, 8,  dtData,        80,   daCenter,  true,   "del_cd");
               
               InitDataProperty(0, 9,  dtData,        70,   daRight,   true,   "grs_wgt");
               InitDataProperty(0,10,  dtData,        70,   daRight,   true,   "meas");
               InitDataProperty(0,11,  dtData,       100,   daRight,   true,   "sellSum",   false,   "",   dfNullFloat,   2);
               InitDataProperty(0,12,  dtData,       100,   daRight,   true,   "buySum",    false,   "",   dfNullFloat,   2);
          }                                                      
      break;
      case 2:      //Buying/Credit 탭부분 init
          with (sheetObj) {
              // 높이 설정
              style.height = 270;
              
              //전체 너비 설정
              SheetWidth = mainTable.clientWidth;
             // SheetWidth = 400;

              //Host정보 설정[필수][HostIp, Port, PagePath]
              if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);

              //전체Merge 종류 [선택, Default msNone]
              MergeSheet = msHeaderOnly;

             //전체Edit 허용 여부 [선택, Default false]
              Editable = true;

              //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
              InitRowInfo( 2, 1, 9, 100);

              //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
              InitColumnInfo(36, 0, 0, true);

              // 해더에서 처리할 수 있는 각종 기능을 설정한다
              InitHeadMode(true, true, true, true, false,false) ;

              //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
              InitHeadRow(0, getLabel('SEE_FRT_0010_HDR4_1'), true);
              InitHeadRow(1, getLabel('SEE_FRT_0010_HDR4_2'), true);

              //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
              //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
              InitDataProperty(0, 0,  dtDelCheck,    40,   daCenter,  true,    "del_chk",        false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0, 1,  dtHidden,       0,   daCenter,  true,    "frt_seq",        false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0, 2,  dtCheckBox,    40,   daCenter,  true,    "frt_check",      false,   "",       dfNone,         1,     false,      false);

              InitDataProperty(0, 3,  dtCombo,       50,   daCenter,  true,    "sell_buy_tp_cd", false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0, 4,  dtPopupEdit,   50,   daCenter,  true,    "frt_cd",         false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0, 5,  dtHidden,     120,   daLeft,    true,    "frt_cd_nm",      false,   "",       dfNone,         1,     false,      false);
             
              InitDataProperty(0, 6,  dtPopupEdit,   43,   daCenter,  true,    "trdp_cd",        false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0, 7,  dtData,       120,   daLeft,    true,    "trdp_nm",        false,   "",       dfNone,         1,     false,      false);
              InitDataProperty(0, 8,  dtPopupEdit,   40,   daCenter,  true,    "rat_curr_cd",    false,   "",       dfNone,         1,     true,       true);
             
              InitDataProperty(0, 9,  dtCombo,       70,   daCenter,  true,    "aply_ut_cd",     false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0,10,  dtHidden,      40,   daCenter,  true,    "cntr_tpsz_cd",   false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0,11,  dtData,        40,   daRight,   true,    "qty",            false,   "",       dfNone,         0,     true,       true);

              InitDataProperty(0,12,  dtCombo,       30,   daCenter,  true,    "scg_incl_flg",   false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0,13,  dtCombo,       30,   daCenter,  true,    "frt_term_cd",    false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0,14,  dtData,        70,   daRight,   true,    "ru",             false,   "",       dfNullFloat,    2,     true,       true);
              
              InitDataProperty(0,15,  dtData,        70,   daRight,   true,    "trf_cur_sum_amt",false,   "",       dfNullFloat,    2,     false,      false);
              
              InitDataProperty(0,16,  dtData,        23,   daRight,   true,    "vat_rt",         false,   "",       dfInteger,      0,     true,       true);
              InitDataProperty(0,17,  dtData,        70,   daRight,   true,    "vat_amt",        false,   "",       dfNullFloat,    2,     false,      false);

              InitDataProperty(0,18,  dtPopupEdit,   40,   daCenter,  true,    "inv_curr_cd",    false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0,19,  dtPopupEditFormat,50,daRight,   true,    "inv_xcrt",       false,   "",       dfNullFloat,    2,     true,       true);
              InitDataProperty(0,20,  dtHidden,       0,   daCenter,  true,    "inv_xcrt_dt",    false,   "",       dfNone,         0,     true,       true);
              InitDataProperty(0,21,  dtData,        70,   daRight,   true,    "inv_amt",        false,   "",       dfNullFloat,    2,     true,       true);
              InitDataProperty(0,22,  dtData,        70,   daRight,   true,    "inv_vat_amt",    false,   "",       dfNullFloat,    2,     true,       true);
              InitDataProperty(0,23,  dtData,        90,   daRight,   true,    "inv_sum_amt",    false,   "",       dfNullFloat,    2,     true,       true);

              InitDataProperty(0,24,  dtHidden,       0,   daRight,   true,    "perf_curr_cd",   false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0,25,  dtHidden,      40,   daRight,   true,    "perf_xcrt",      false,   "",       dfNullFloat,    2,     true,       true);
              InitDataProperty(0,26,  dtHidden,      70,   daRight,   true,    "perf_amt",       false,   "",       dfNullFloat,    2,     true,       true);
              InitDataProperty(0,27,  dtHidden,      70,   daRight,   true,    "perf_vat_amt",   false,   "",       dfNullFloat,    2,     true,       true);
				
              InitDataProperty(0,28,  dtData,       100,   daLeft,    true,    "inv_no",         false,   "",       dfNone,         0,     false,      false);
              InitDataProperty(0,29,  dtHidden,       0,   daRight,   true,    "inv_sts_cd",     false,   "",       dfNone,         0,     false,      false);
              InitDataProperty(0,30,  dtData,       100,   daLeft,    true,    "inv_sts_nm",     false,   "",       dfNone,         0,     false,      false);

              InitDataProperty(0,31,  dtHidden,       0,   daRight,   true,    "auto_trf_flg");
              InitDataProperty(0,32,  dtData,       100,   daRight,   true,    "trf_ctrt_no",    false,   "",       dfNone,         0,     false,      false);
              InitDataProperty(0,33,  dtData,        80,   daRight,   true,    "trf_dtl_seq",    false,   "",       dfNone,         0,     false,      false);
              
              InitDataProperty(0,34,  dtHiddenStatus, 0,   daCenter,  true,    "ibflag",         false,   "",      dfNone,         1,     true,       true);
              InitDataProperty(0,35,  dtHidden,       0,   daRight,   true,    "frt_ask_clss_cd");
              
			  HeadRowHeight = 20 ;
			  HeadRowHeight = 21;

			  InitDataCombo(0, 'sell_buy_tp_cd', "Buying|Credit", "B|C");     //B/C
			  InitDataCombo(0, 'scg_incl_flg',   "N|Y", "N|Y"); //Inc.
 			  InitDataCombo(0, 'frt_term_cd',    "P|C", "PP|CC"); //P/C
			  InitDataCombo(0, 'aply_ut_cd',      UNITCD1, UNITCD2); //P/C
         }                                                      
     break;
    }
}


function sheet1_OnSearchEnd(sheetObj, row, col) {
	doWork('SEARCHLIST03');
}

//------------------------------------다섯번째 Sheet 처리------------------------------------
function sheet2_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, '');
}

/**
 * Type/Size에 따른 Volume(수량) 체크
 */
function sheet2_OnChange(sheetObj, row, col) {
	mutiSheetOnChange(sheetObj, row, col, '')
}

function sheet2_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('SD');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2);
}

function sheet2_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('SD');
	
	//Invoice Total 계산
	mutiSheetOnSearchEnd(sheetObj, row, col, 2);
	
	dispMblProfit();
	
	//선택버튼 초기화
	bcCheckTrdp = '';
	bcCheckCnt  = 0;
}


/**
 * 기본 세률 조회
 */
function setTaxRate(reqVal){
    var doc = getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	var sheetObj = docObjects[1];
   	
    	var cellNm = "vat_rt";
		sheetObj.CellValue(frm1.curRow2.value, cellNm) =  doc[1];
    }
}


function sheet2_OnClick(sheetObj, row, col) {

	var colStr = sheetObj.ColSaveName(col);

	//Delcheck 선택시 Row 삭제처리
	/*
	if(colStr=="del_chk"){
		if(sheetObj.CellValue(row, "frt_seq")==''){
			sheetObj.RowDelete(row, false);
		}

	//Unit 선택시
	}else 
	*/
	
	if(colStr=="cntr_tpsz_cd"){
		if(sheetObj.CellValue(row, "aply_ut_cd")!='SCN'){
//			alert('Unit이 Container인 항목만 선택이 가능합니다!');
			alert(getLabel('AIR_MSG_076'));
			sheetObj.SelectCell(row, "aply_ut_cd")
			return;
		}
	
	//Rate 선택시
	}else if(colStr=="ru"){
		//Unit 확인
		if(sheetObj.CellValue(row, "qty")==''){
			alert(getLabel('AIR_MSG_077'));
		}
	}else if(colStr=="aply_ut_cd"){
		
		//Freight Code확인
		if(sheetObj.CellValue(row, "frt_cd")==''||sheetObj.CellValue(row, "frt_cd_nm")==''){
			alert(getLabel('AIR_MSG_078'));
			sheetObj.SelectCell(row, "frt_cd");
		
		//Trade Partner 확인
		}else if(sheetObj.CellValue(row, "trdp_cd")==''||sheetObj.CellValue(row, "trdp_nm")==''){
			alert(getLabel('AIR_MSG_079'));
			sheetObj.SelectCell(row, "trdp_cd");
		}

	//Rate 선택시
	}else if(colStr=="ru"){
		//Unit 확인
		if(sheetObj.CellValue(row, "qty")==''){
			alert(getLabel('AIR_MSG_077'));
		}
		
    //Tarriff Currency조회
	}else if(colStr=="inv_xcrt"||colStr=="inv_vat_amt"||colStr=="perf_xcrt"||colStr=="perf_vat_amt"){

		//Volume을 확인한다.
		if(sheetObj.CellValue(row, "qty")==''){
			alert(getLabel('AIR_MSG_077'));
			sheetObj.SelectCell(row, "qty");
			
		}else {
			//Invoice Amt
			if(col=="inv_vat_amt"){
				if(sheetObj.CellValue(row, "inv_xcrt")==''){
					alert(getLabel('AIR_MSG_080'));
					sheetObj.SelectCell(row, "inv_xcrt");
				}
						
			//Performace Amt
			}else if(col=="perf_vat_amt"){

				if(sheetObj.CellValue(row, "perf_xcrt")==''){
					alert(getLabel('AIR_MSG_081'));
					sheetObj.SelectCell(row, "perf_xcrt");
				}
			}			
		}
	}
}



function mutiSheetOnSearchEnd(sheetObj, row, col, callType) {
	//Freight 항목이 등록이 된 경우에만 후 처리
	if(sheetObj.CellValue(2, 'trdp_cd')!=''){
		
		//Total 값을 Display한다.
		doMblSumFrt(sheetObj, callType);
	}
}


/**
 * Selling/Debit에서 코드입력시 Name조회
 */
function sheet2_OnKeyUp(sheetObj, row, col, keyCode){
	if(keyCode==9){
		var curCols = sheetObj.cols;
		curCols--;
		if(curCols!=col){
			col--;
		}
		doAutoComplete('', sheetObj, row, col)	
	}
}


/**
 * Default Fregiht를 화면에 표시함
 */
function dispDfltAjaxReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split(';');
			var curSheet;
			doMblDispDfltFrt(rtnArr, '',   'ROWADD1',  docObjects[1])
		}
	}else{
//		alert('실패');
		alert(getLabel('AIR_MSG_075'));
	}
}	

/**
 * Buying/Selling Sheet를 리턴함
 */
function getBcSheet(){
	return docObjects[1];
}


/**
 * Buying/Selling Sheet를 리턴함
 */
function getSdSheet(){
	return docObjects[1];
}

function getBcSheet(){
	return docObjects[1];
}

/**
 * Selling/Debit
 */
function getSdUrl(){
	return './AII_FRT_0020_2GS.clt';
}