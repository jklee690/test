var TODAY;
var SELECTROW;
var CHGFLAG;

var ORG_BLOCK_DT  = ""; 		//MAX(BLOCK_DT)
var NEXT_BLOCK_DT = "";    	//MAX(BLOCK_DT)+1

var rtnary=new Array(1);
var callBackFunc = "";
function CUSTOMER_POPLIST(rtnVal){
      if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}
        else{
			var rtnValAry=rtnVal.split("|");
			formObj.s_cust_cd.value=rtnValAry[0];
			formObj.s_cust_nm.value=rtnValAry[2];
			formObj.s_paid_cd.value=rtnValAry[0];
			formObj.s_paid_nm.value=rtnValAry[2];
		}             

	}
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
		   break;
	   case "COPY":
	        Copy();
	        break;
       case "SEARCHLIST":
    	    formObj.f_cmd.value=SEARCHLIST;
            //검증로직
             docObjects[0].DoSearch("./ACC_JOR_0050GS.clt", FormQueryString(formObj) );
            break;
       case "MULTIROWADD":
    	   var rowcnt=Number(formObj.f_row_cnt.value);
    	   for(var i=0; i<rowcnt; i++){
    		   doWork('ROWADD');
    	   }
    	   break;
       case "ROWADD":
    	    var last_no;
    	    var com_nm;
    	    if(sheetObj.LastRow()== 0){
    	    	last_no=0;
    	    	com_nm="";
    	    }
    	    else{
    	    	last_no=Number(sheetObj.GetCellValue(sheetObj.LastRow(), "seq"));
    	    	com_cd=sheetObj.GetCellValue(sheetObj.LastRow(), "com_cd");
    	    	com_nm=sheetObj.GetCellValue(sheetObj.LastRow(), "com_nm");
    	    }
    	    var intRows=sheetObj.LastRow()+1;
            sheetObj.DataInsert(intRows);
            if(intRows > 1){
				sheetObj.SetCellValue(intRows, "com_tp",sheetObj.GetCellValue(intRows-1, "com_tp"));
				sheetObj.SetCellValue(intRows, "com_cd",sheetObj.GetCellValue(intRows-1, "com_cd"));
				sheetObj.SetCellValue(intRows, "com_nm",sheetObj.GetCellValue(intRows-1, "com_nm"));
            }
            SELECTROW=intRows;
            /*
            sheetObj.SetCellValue(intRows, "gl_no","");
            sheetObj.SetCellValue(intRows, "com_nm",com_nm);
var gl_no=sheetObj.GetCellValue(intRows, "gl_no");
            sheetObj.SetCellValue(intRows, "seq",last_no + 1);
			SELECTROW=intRows;
            ajaxSendPost(searchGlBankInfo, 'reqVal', '&goWhere=aj&bcKey=searchGlBankInfo&gl_no='+gl_no, './GateServlet.gsl');
            */
            break;
       case "MODIFY":	//수정
    	   /*
       		var hasCng=false;
	       	for(var i=1; i< sheetObj.RowCount()+1; i++){
	       		if(sheetObj.GetCellValue(i, 'ibflag')=='I'||sheetObj.GetCellValue(i, 'ibflag')=='U'||sheetObj.GetCellValue(i, 'ibflag')=='D'){
	    			hasCng=true;
	    			break;
	    		}
	       	}
	       	if(!hasCng){
	       		alert(getLabel('FMS_COM_ALT007') + "\n\n: ACC_JOR_0050.83");
	       		return;
	       	}
	       	*/
    	   //그리드 전체삭제시 invoice를 삭제한다.
    	   if(!checkDelete()){
    		   doWork("DELETE");
    	   }
    	   else{
			   frm1.f_cmd.value=MODIFY;
			   var chkCnt=0;
			   for(var i=1;i<=sheetObj.LastRow();i++){
				   if(sheetObj.GetCellValue(i, "gl_no") == ""){
					   //[G/L No.] is mandatory field.
					   alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_JOR_0050.86");
					   sheetObj.SelectCell(i, "gl_no", false);
					   return;
				   }
				   //LHK Customer 일 경우, com_nm 이 있고 , code 가 없을 경우 ofc_cd + DEFAULT 입력
				   if(sheetObj.GetCellValue(i, "com_nm") != "" && sheetObj.GetCellValue(i, "com_cd") == "" && sheetObj.GetCellValue(i, "com_tp")=="C"){
					   sheetObj.SetCellValue(i, "com_cd",frm1.h_ofc_cd.value+"DEFAULT");
				   }
				   if(sheetObj.GetCellValue(i, "com_cd") == "" && sheetObj.GetCellValue(i, "com_tp")=="B"){
					   //Please Check [Transaction Entity(Customer)]
					   alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_JOR_0050.94");
					   sheetObj.SelectCell(i, "com_nm", false);
					   return;
				   }
				   if(sheetObj.GetCellValue(i, "ibflag") == "U" || sheetObj.GetCellValue(i, "ibflag") == "I"){
					   chkCnt += 1;
				   }
			   }
			   /*
			   if(chkCnt == 0){
				   //No Save Row Data!
				   return;
			   }
			   */
			   sumBalance(sheetObj);
			   if(formObj.f_balance_tot.value != 0){
				   //Debit/Credit don’t match.
				   alert(getLabel('ACC_COM_ALT006') + "\n\n: ACC_JOR_0050.115");
				   return;
			   }
	           if(confirm(getLabel('FMS_COM_CFMSAV'))){
	        	   var sht2=sheetObj2.GetSaveString(false);		//Bill Collecting List
 		           var intRows2=sheetObj2.RowCount();
		           sheetObj2.DataInsert(intRows2);
		           formObj.f_debit_tot.value=removeComma(formObj.f_debit_tot.value);
				   formObj.f_credit_tot.value=removeComma(formObj.f_credit_tot.value);
				   formObj.f_balance_tot.value=removeComma(formObj.f_balance_tot.value);
		           sheetObj.DoAllSave("./ACC_JOR_0050GS.clt", FormQueryString(formObj)+'&'+sht2, true);
	           }
    	   }
    	   break;
       case "DELETE":	//삭제
			var hasCng=false;
	      	for(var i=1; i< sheetObj.LastRow() + 1; i++){
	      		if(sheetObj.GetCellValue(i, 'slip_no')!=''){
		   			hasCng=true;
		   			break;
		   		}
	      	}
		   if(!hasCng){
		   		alert(getLabel('FMS_COM_ALT007') + "\n\n: ACC_JOR_0050.83");
		   		return;
		   }
    	   frm1.f_cmd.value=REMOVE;
           if(confirm(getLabel('FMS_COM_CFMDEL'))){
        	   for(var i=1; i<=sheetObj.LastRow(); i++){
    			   sheetObj.SetCellValue(i, "ibflag","D");
    		   }
        	   var sht2=sheetObj2.GetSaveString(false);		//Bill Collecting List
 	           var intRows2=sheetObj2.RowCount();
	           sheetObj2.DataInsert(intRows2);
	           sheetObj.DoAllSave("./ACC_JOR_0050GS.clt", FormQueryString(formObj)+'&'+sht2, true);
           }
           break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]="";
	   		rtnary[2]=window;
		   	 callBackFunc = "CUSTOMER_POPLIST";
	         modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   		
  	        break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//오늘일자구하기
	var now=new Date(); 				
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1; 		
	var date=now.getDate(); 			
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	TODAY=month + "-" + date + "-" + year;
	formObj.f_date.value=TODAY;
	formObj.f_old_date.value	= formObj.f_date.value;
	/*
	if(btn_role == "Y"){
//    	deleteBtn1.style.display="inline";
    	getObj('deleteBtn2').style.display="inline";
    }else{
//    	deleteBtn1.style.display="none";
    	getObj('deleteBtn2').style.display="none";
    }
    */
	
	//#36527 - [COMMON]Journal Entry - 수정사항 1.Block 된 날짜 이전으로 입력 안되도록 Validation 추가 (Default : MAX+1 일)
	setBlock_dt();
	if(formObj.f_slip_no.value != ""){
		doWork("SEARCHLIST");
	}
	if(formObj.proc_userid.value == "cltmaster"){
		getObj('cltMultiBtn').style.display="inline";
    }
}
 /* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 */
 function authControl(){
 	var formObj=document.frm1;
 	var sheetObj=docObjects[0];
 	// 1.Paid Amount 값이 >0 인지 체크
 	//var paidAmtYn = parseFloat(eval((formObj.f_paid_amt.value).replaceAll(",",""))) > 0?true:false;
var fileBolckYn=sheetObj.GetCellValue(1, "clt_cmpl_flg") == "Y"?true:false;
var jrnYn=sheetObj.GetCellValue(1, "jnr_yn");
var clsYn=sheetObj.GetCellValue(1, "cls_yn");
 	var blockYn=true;
 	//if (paidAmtYn) {
 	if (fileBolckYn || jrnYn == "Y" || clsYn =="Y") {
 		blockYn=false;
 	}
 	//if (formObj.fb_flg.value == "Y") {
 	//	blockYn = true;
 	//} 
 	/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.13 */
 	//if (jrnYn == "Y" || clsYn =="Y") {
 	//	blockYn = false;
 	//} 
 	editInputForm(blockYn);
 	editSheet(blockYn);
 } 
 /**
 * Input Form 의 수정을 가능/불가 하게 한다
 */
 function editInputForm(flg){
 	// form 의 read Only 값을 false로 변경
 	var sheetObj=docObjects[0];
 	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
 	for(var i=0; i<collTxt.length; i++){
 		if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
 			if(collTxt[i].name == "f_date" || collTxt[i].name == "f_seq"){
				if(!flg)
				{
					collTxt[i].className="search_form-disable";
				}
 				collTxt[i].readOnly=!flg;
 			}
 		}           
 	}
 	frm1.f_date.disabled=!flg;
 	frm1.s_ofc_cd.disabled=!flg;
 	frm1.f_remark.disabled=!flg;
 	if (flg) {
 		frm1.f_date.className="search_form";
 		frm1.f_date_cal.onclick=function(){doDisplay('DATE1', frm1);};
 	} else {
 		frm1.f_date.className="search_form-disable";
 		frm1.f_date_cal.onclick="";
 	}
 }
 /**
 * Sheet 의 수정을 가능/불가 하게 한다
 */
 function editSheet(flg){
 	var sheetObj=docObjects[0];
 	// Row Add 버튼 보이기/숨기기
 	if (flg) {
 		/*
// 		addBtn01.style.display="inline";
 		getObj('addBtn02').style.display="inline";
 		// Save버튼 보이기/숨기기
//		saveBtn1.style.display="inline";
		getObj('saveBtn2').style.display="inline";
		getObj('btnModify').style.display="inline";
//		deleteBtn1.style.display="inline";
		getObj('deleteBtn2').style.display="inline";		
		*/
 	} else {
// 		addBtn01.style.display="none";
 		getObj('addBtn02').style.display="none";		
 		// Save버튼 보이기/숨기기
//		saveBtn1.style.display="none";
		getObj('saveBtn2').style.display="none";
		getObj('btnModify').style.display="none";
//		deleteBtn1.style.display="none";
		getObj('deleteBtn2').style.display="none"	;	
		// sheet edit 가능/불가
		sheetObj.SetEditable(flg);
		sheetObj.RenderSheet(2);
 	}
 	// Amout 체크를 위해
 	//isSheetValChanged = flg;
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
        	 with(sheetObj){
        	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, SortEventMode:1 } );

        	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	       var headers = [ { Text:getLabel('ACC_JOR_0050_HDR'), Align:"Center"} ];
        	       InitHeaders(headers, info);

        	       var cols = [ {Type:"DelCheck",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, HeaderCheck: 0},
        	              {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"chk_flag",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, HeaderCheck: 0},
        	              {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
        	              {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"gl_no",         KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"gl_sub",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Combo",     Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"com_tp",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"com_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"PopupEdit", Hidden:0, Width:270,  Align:"Left",    ColMerge:1,   SaveName:"com_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:1,   SaveName:"slip_desc",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"debit",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"credit",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",      Hidden:1, Width:110,  Align:"Right",   ColMerge:1,   SaveName:"ttl_debit",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"ttl_credit",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"g_debit",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"g_credit",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"post_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dt_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"p_ofc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"curr_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"slip_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"slip_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"acct_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Right",   ColMerge:1,   SaveName:"clt_cmpl_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Right",   ColMerge:1,   SaveName:"jnr_yn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Right",   ColMerge:1,   SaveName:"cls_yn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Right",   ColMerge:1,   SaveName:"delt_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
        	        
        	       InitColumns(cols);
        	       SetColProperty("com_tp", {ComboText:"Bank|Company", ComboCode:"B|C"} );
        	       SetEditable(1);
	               SetHeaderRowHeight(25);
	               SetSheetHeight(350);
	               SetHighlightAfterSort(0);
	               resizeSheet();
	       }
           break;
         case 2:      //IBSheet2 init
        	    with(sheetObj){
		           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		
		           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		           var headers = [ { Text:"inv_seq|ibflag2", Align:"Center"} ];
		           InitHeaders(headers, info);
		
		           var cols = [ {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                  {Type:"Status",    Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag2",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
		            
		           InitColumns(cols);
		
		           SetEditable(1);
		           SetVisible(false);
             }
            break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0], 190);
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	formObj.f_slip_no.value=sheetObj.GetCellValue(1, "slip_no");
	formObj.f_curr_cd.value=sheetObj.GetCellValue(1, "curr_cd");
	formObj.f_debit_tot.value=doMoneyFmt(sheetObj.GetCellValue(1, "g_debit"));
	formObj.f_credit_tot.value=doMoneyFmt(sheetObj.GetCellValue(1, "g_credit"));
	var debit=roundXL(Number(sheetObj.GetCellValue(1, "g_debit")),2);
	var credit=roundXL(Number(sheetObj.GetCellValue(1, "g_credit")),2);
	var tot_amt;
	tot_amt=debit - credit;
	formObj.f_balance_tot.value=doMoneyFmt(roundXL(tot_amt,2));
	formObj.f_date.value=sheetObj.GetCellValue(1, "post_dt");
	formObj.f_seq.value=sheetObj.GetCellValue(1, "dt_seq");
	formObj.s_ofc_cd.value=sheetObj.GetCellValue(1, "p_ofc_cd");
	formObj.f_remark.value=sheetObj.GetCellValue(1, "rmk");
	formObj.f_old_date.value 		= formObj.f_date.value;
	/*
	if(formObj.f_slip_no.value != ""){
//		deleteBtn1.style.display="inline";
		getObj('deleteBtn2').style.display="inline";
//		copyBtn01.style.display="inline";
		getObj('copyBtn02').style.display="inline";
		getObj('btnCopy').style.display="inline";
	}else{
//		deleteBtn1.style.display="none";
		getObj('deleteBtn2').style.display="none";
//		copyBtn01.style.display="none";
		getObj('copyBtn02').style.display="none";
		getObj('btnCopy').style.display="none";
	}
	*/
	/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 주석 처리 */
	/*
	//마감처리를 한다. ACCT_DT != ""
	for(var i=1; i<=sheetObj.LastRow();i++){
if(sheetObj.GetCellValue(1, "acct_dt") != ""){
			saveBtn1.style.display="none"
			getObj('saveBtn2').style.display="none"
			getObj('btnModify').style.display="none"
			deleteBtn1.style.display="none"
			getObj('deleteBtn2').style.display="none"	
		}
		//2012/02/08 생성된 데이터의 글자색을 바꾼다.
		sheetObj.SetRowFontColor(i,"#FF0000");
	}
	*/
	
	/* LHK, 20131122 #23692 모든 처리 후에 확인, 삭제된 data 의 경우 처리 불가
	 * LHK, 20140715 #36527 - [COMMON]Journal Entry - 수정사항 */
	if((sheetObj.GetCellValue(1, "slip_tp") != "SL" && sheetObj.GetCellValue(1, "slip_tp") != "-1")
		|| (sheetObj.GetCellValue(1, "slip_tp") == "SL" && sheetObj.GetCellValue(1, "delt_flg") == "Y")){
		//sheetObj.Editable = false;
		for(var i=1; i<=sheetObj.LastRow(); i++){
			sheetObj.SetRowEditable(i,0);
		}
//		getObj("saveBtn1").style.display   	= "none"
		getObj("saveBtn2").style.display   	= "none"
		getObj("btnModify").style.display   = "none"
//		getObj("deleteBtn1").style.display 	= "none"
		getObj("deleteBtn2").style.display 	= "none"	
//		getObj("addBtn01").style.display  	= "none";	
		getObj("addBtn02").style.display  	= "none";
	}
	
	/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 */
	authControl();	

} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	if(sheetObj.GetCellValue(1, "slip_no") != "-1"){
		formObj.f_slip_no.value=sheetObj.GetCellValue(1, "slip_no");
		formObj.f_curr_cd.value=sheetObj.GetCellValue(1, "curr_cd");
		formObj.f_debit_tot.value=doMoneyFmt(sheetObj.GetCellValue(1, "g_debit"));
		formObj.f_credit_tot.value=doMoneyFmt(sheetObj.GetCellValue(1, "g_credit"));
		var debit=roundXL(Number(sheetObj.GetCellValue(1, "g_debit")),2);
		var credit=roundXL(Number(sheetObj.GetCellValue(1, "g_credit")),2);
		var tot_amt;
		tot_amt=debit - credit;
		formObj.f_balance_tot.value=doMoneyFmt(roundXL(tot_amt,2));
		formObj.f_date.value=sheetObj.GetCellValue(1, "post_dt");
		formObj.f_seq.value=sheetObj.GetCellValue(1, "dt_seq");
		formObj.s_ofc_cd.value=sheetObj.GetCellValue(1, "p_ofc_cd");
		formObj.f_remark.value=sheetObj.GetCellValue(1, "rmk");
		formObj.f_old_date.value 		= formObj.f_date.value;
		/*
		if(formObj.f_slip_no.value != ""){
//			deleteBtn1.style.display="inline";
			getObj('deleteBtn2').style.display="inline";
		}else{
//			deleteBtn1.style.display="none";
			getObj('deleteBtn2').style.display="none";
		}
		*/
		/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 주석 처리 */
		/*
		//마감처리를 한다. ACCT_DT != ""
		for(var i=1; i<=sheetObj.LastRow();i++){
if(sheetObj.GetCellValue(1, "acct_dt") != ""){
				saveBtn1.style.display="none"
				getObj('saveBtn2').style.display="none"
				getObj('btnModify').style.display="none"
				deleteBtn1.style.display="none"
				getObj('deleteBtn2').style.display="none"	
			}
			//2012/02/08 생성된 데이터의 글자색을 바꾼다.
			sheetObj.SetRowFontColor(i,"#FF0000");
		}
		*/
		/*
//		copyBtn01.style.display="inline";
		getObj('copyBtn02').style.display="inline";
		getObj('btnCopy').style.display="inline";
		*/
	
		/* LHK, 20131122 #23692 모든 처리 후에 확인, 삭제된 data 의 경우 처리 불가
		 * LHK, 20140715 #36527 - [COMMON]Journal Entry - 수정사항 */
		if((sheetObj.GetCellValue(1, "slip_tp") != "SL" && sheetObj.GetCellValue(1, "slip_tp") != "-1")
			|| (sheetObj.GetCellValue(1, "slip_tp") == "SL" && sheetObj.GetCellValue(1, "delt_flg") == "Y")){
			//sheetObj.Editable = false;
			for(var i=1; i<=sheetObj.LastRow(); i++){
				sheetObj.SetRowEditable(i,0);
			}
//			getObj("saveBtn1").style.display   	= "none";
			getObj("saveBtn2").style.display   	= "none";
			getObj("btnModify").style.display   = "none";
//			getObj("deleteBtn1").style.display 	= "none";
			getObj("deleteBtn2").style.display 	= "none";	
//			getObj("addBtn01").style.display  	= "none";	
			getObj("addBtn02").style.display  	= "none";
		}
	}else{
		clearAll();
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	SELECTROW=Row;
    switch (sheetObj.ColSaveName(Col)) {
    }
}
var cur_row;
function sheet1_OnPopupClick(sheetObj, row, col){
	cur_row = row;
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "com_nm"){
		if(sheetObj.GetCellValue(row, "com_tp") == "B"){
			//BANK POPUP을 호출한다.
/*			var rtnary=new Array(1);
	   		rtnary[0]="1";
  	        var rtnVal=window.showModalDialog('./CMM_POP_0090.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:658px;dialogHeight:400px");
  	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				sheetObj.SetCellValue(row, "com_cd",rtnValAry[0],0);
				sheetObj.SetCellValue(row, "com_nm",rtnValAry[1],0);
				sheetObj.SetCellValue(row, "gl_no",rtnValAry[2],0);
				sheetObj.SetCellValue(row, "gl_rmk",rtnValAry[3],0);
			} */
  			rtnary=new Array(1);
  	   		rtnary[0]="1";
  	   		callBackFunc = "sheet1_OnPopupClick_com_nm";
  	   		modal_center_open('./CMM_POP_0090.clt', rtnary, 658,459,"yes");
  	        
		}else{
			//CUSTOMER POPUP을 호출한다.
		/*	var rtnary=new Array(1);
			rtnary[0]="";
			rtnary[1]=sheetObj.GetCellValue(row, "com_nm");
	   		rtnary[2]=window;
  	        var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
  	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				sheetObj.SetCellValue(row, "com_cd",rtnValAry[0]);
				sheetObj.SetCellValue(row, "com_nm",rtnValAry[2]);
			}   */ 
			
  			rtnary=new Array(1);
			rtnary[0]="";
			rtnary[1]=sheetObj.GetCellValue(row, "com_nm");
	   		rtnary[2]=window;
  	   		callBackFunc = "sheet1_OnPopupClick_customer";
  	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	   		
		}
	}else if(colStr == "gl_no"){
		//GLCODE POPUP을 호출한다.
/*		rtnary=new Array(1);
   		rtnary[0]="1";
        var rtnVal=window.showModalDialog('./CMM_POP_0260.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:658px;dialogHeight:450px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
        	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(row, "gl_no",rtnValAry[0]);
			sheetObj.SetCellValue(row, "gl_rmk",rtnValAry[1],0);
		}
*/
		//GLCODE POPUP을 호출한다.
		rtnary=new Array(1);
   		rtnary[0]="1";
   		callBackFunc = "sheet1_OnPopupClick_gl_no";
   		modal_center_open('./CMM_POP_0260.clt', rtnary, 658,450,"yes");

	}
}

function sheet1_OnPopupClick_gl_no(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
   	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "gl_no",rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, "gl_rmk",rtnValAry[1]);
//		docObjects[0].SelectCell(cur_row, "gl_no", 0);
	}
}

function sheet1_OnPopupClick_com_nm(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "com_cd",rtnValAry[0],0);
		docObjects[0].SetCellValue(cur_row, "com_nm",rtnValAry[1],0);
		docObjects[0].SetCellValue(cur_row, "gl_no",rtnValAry[2],0);
		docObjects[0].SetCellValue(cur_row, "gl_rmk",rtnValAry[3],0);
		docObjects[0].SelectCell(cur_row, "slip_desc", 0);
	}
}

function sheet1_OnPopupClick_customer(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "com_cd",rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, "com_nm",rtnValAry[2]);
		docObjects[0].SelectCell(cur_row, "slip_desc", 0);
	}
}

function sheet1_OnKeyUp(sheetObj, Row, Col, KeyCode, Shift){
	cur_row = Row;
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(Col);
	if (KeyCode == 13 && colStr == "com_nm"){
		/*
		if(SELECTROW == Row){
			sheetObj.SelectCell(Row, Col);
			Row=Row;
		}else{
			sheetObj.SelectCell(Row-1, Col);
			Row=Row-1
		}
		*/
		if(sheetObj.GetCellValue(Row, "com_tp") == "B"){
			//BANK POPUP을 호출한다.
			/*rtnary=new Array(1);
	   		rtnary[0]="1";
  	        var rtnVal=window.showModalDialog('./CMM_POP_0090.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:658px;dialogHeight:379px");
  	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				sheetObj.SetCellValue(Row, "com_cd",rtnValAry[0],0);
				sheetObj.SetCellValue(Row, "com_nm",rtnValAry[1],0);
				sheetObj.SetCellValue(Row, "gl_no",rtnValAry[2],0);
				sheetObj.SetCellValue(Row, "gl_rmk",rtnValAry[3],0);
				sheetObj.SelectCell(Row, "slip_desc", false);
			}  */
  	        
  			rtnary=new Array(1);
  	   		rtnary[0]="1";
  	   		callBackFunc = "sheet1_OnPopupClick_com_nm";
  	   		modal_center_open('./CMM_POP_0090.clt', rtnary, 658,459,"yes");
		}else{
			//CUSTOMER POPUP을 호출한다.
/*			var rtnary=new Array(1);
			rtnary[0]="";
			rtnary[1]=sheetObj.GetCellValue(Row, "com_nm");
	   		rtnary[2]=window;
  	        var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
  	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				sheetObj.SetCellValue(Row, "com_cd",rtnValAry[0]);
				sheetObj.SetCellValue(Row, "com_nm",rtnValAry[2]);
				sheetObj.SelectCell(Row, "slip_desc", false);
			} */
  	        
  			rtnary=new Array(1);
			rtnary[0]="";
			rtnary[1]=sheetObj.GetCellValue(Row, "com_nm");
	   		rtnary[2]=window;
  	   		callBackFunc = "sheet1_OnPopupClick_customer";
  	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		}
	}
	/*
	if (KeyCode == 13 && colStr == "gl_no"){
		//GLCODE POPUP을 호출한다.
		var rtnary=new Array(2);
		rtnary[0]="GLNO"
rtnary[1]=sheetObj.GetCellValue(Row, "gl_no");
        var rtnVal=window.showModalDialog('./CMM_POP_0260.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:658px;dialogHeight:450px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
        	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(Row, "gl_no",rtnValAry[0]);
			sheetObj.SetCellValue(Row, "gl_rmk",rtnValAry[1]);
		}
	}
	*/
	if (KeyCode == 13 && colStr == "gl_rmk"){
		/*
		if(SELECTROW == Row){
			sheetObj.SelectCell(Row, Col);
			Row=Row;
		}else{
			sheetObj.SelectCell(Row-1, Col);
			Row=Row-1
		}
		*/
		//GLCODE POPUP을 호출한다.
/*		var rtnary=new Array(2);
		rtnary[0]="GLRMK";
			rtnary[1]=sheetObj.GetCellValue(Row, "gl_rmk");
        var rtnVal=window.showModalDialog('./CMM_POP_0260.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:658px;dialogHeight:450px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
        	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(Row, "gl_no",rtnValAry[0]);
			sheetObj.SetCellValue(Row, "gl_rmk",rtnValAry[1],0);
			sheetObj.SelectCell(Row, "gl_sub", false);
		}*/
		
		rtnary=new Array(1);
		rtnary[0]="GLRMK";
		rtnary[1]=sheetObj.GetCellValue(Row, "gl_rmk");
		callBackFunc = "sheet1_OnKeyDown_gl_rmk";
   		modal_center_open('./CMM_POP_0260.clt', rtnary, 658,450,"yes");
	}
}

function sheet1_OnKeyDown_gl_rmk(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
   	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "gl_no",rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, "gl_rmk",rtnValAry[1]);
		docObjects[0].SelectCell(cur_row, "gl_sub", 1);
	}
}

function sheet1_OnKeyDown(sheetObj, Row, Col, KeyCode, Shift){
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(Col);
	if (KeyCode == 9 && colStr == "credit"){
		doWork("ROWADD");
		sheetObj.SelectCell(Row+1, "gl_no", false);
		SELECTROW=Row+1;
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "del_chk" : 
			sumBalance(sheetObj);
		break;
		case "gl_no" :
			// GL NO에 매핑되어있는 BANK 정보를 가져온다.
			var gl_no=sheetObj.GetCellValue(Row, "gl_no");
			var gl_rmk=sheetObj.GetCellValue(Row, "gl_rmk");
			SELECTROW=Row;
			//LHK 수정 .GL Code, Remark 매핑 후 Bank 정보 매핑
			ajaxSendPost(getGlInfo, 'reqVal', '&goWhere=aj&bcKey=getGlInfo&gl_no='+gl_no, './GateServlet.gsl');
			ajaxSendPost(searchBankInfoByGL, 'reqVal', '&goWhere=aj&bcKey=searchBankInfoByGL&gl_no='+gl_no, './GateServlet.gsl');
		break;
		case "gl_rmk" :
			// GL NO에 매핑되어있는 BANK 정보를 가져온다.
			var gl_no=sheetObj.GetCellValue(Row, "gl_no");
			var gl_rmk=sheetObj.GetCellValue(Row, "gl_rmk");
			SELECTROW=Row;
			//LHK 수정 .Remark 매핑 후 Bank 정보 매핑
			ajaxSendPost(getGlInfo, 'reqVal', '&goWhere=aj&bcKey=getGlInfo&gl_rmk='+gl_rmk, './GateServlet.gsl');
			ajaxSendPost(searchBankInfoByGL, 'reqVal', '&goWhere=aj&bcKey=searchBankInfoByGL&gl_no='+gl_no, './GateServlet.gsl');
		break;
		case "debit" :
			/*
			var debit=0;
			var credit=0;
			var tot_amt;
			for(var i=1; i<=sheetObj.LastRow();i++){
debit 	+= Number(sheetObj.GetCellValue(i, "debit"));
credit 	+= Number(sheetObj.GetCellValue(i, "credit"));
			}
			tot_amt=(Math.ceil(debit*100) - Math.ceil(credit*100))/100;
			formObj.f_debit_tot.value=doMoneyFmt(roundXL(debit,2));
			formObj.f_credit_tot.value=doMoneyFmt(roundXL(credit,2));
			formObj.f_balance_tot.value=doMoneyFmt(roundXL(tot_amt,2));
			*/
			
			sumBalance(sheetObj);
		break;
		case "credit" :
			/*
			var debit=0;
			var credit=0;
			var tot_amt;
			for(var i=1; i<=sheetObj.LastRow();i++){
debit 	+= Number(sheetObj.GetCellValue(i, "debit"));
credit 	+= Number(sheetObj.GetCellValue(i, "credit"));
			}
			tot_amt=(Math.ceil(debit*100) - Math.ceil(credit*100))/100;
			formObj.f_debit_tot.value=doMoneyFmt(roundXL(debit,2));
			formObj.f_credit_tot.value=doMoneyFmt(roundXL(credit,2));
			formObj.f_balance_tot.value=doMoneyFmt(roundXL(tot_amt,2));
			*/
			sumBalance(sheetObj);
		break;
		case "com_nm" :
			// Customer를 입력했을 경우 해당  CODE를 검색한다.
			var com_nm=sheetObj.GetCellValue(Row, "com_nm");
			SELECTROW=Row;
			if(sheetObj.GetCellValue(Row, "com_tp") == "B"){
				//ajaxSendPost(searchBankNm, 'reqVal', '&goWhere=aj&bcKey=searchBankNm&com_nm='+com_nm, './GateServlet.gsl');
				var bank_seq=sheetObj.GetCellValue(Row, "com_cd");
				var bank_nm=sheetObj.GetCellValue(Row, "com_nm");
				var param="";
				if(bank_nm != ""){
					param="bank_nm="+bank_nm;
					ajaxSendPost(searchBankInfoByGL2, 'reqVal', '&goWhere=aj&bcKey=searchBankInfoByGL&'+param, './GateServlet.gsl');
				}else{
					//param = "bank_seq="+bank_seq;
					sheetObj.SetCellValue(Row, "com_cd","");
				}
			}else{
				//if(com_nm != ""){
				//	ajaxSendPost(searchCustNm, 'reqVal', '&goWhere=aj&bcKey=searchCustNm&com_nm='+com_nm, './GateServlet.gsl');
				//}
			}
		break;
		case "com_tp" :
			// Customer를 입력했을 경우 해당  CODE를 검색한다.
			var com_nm=sheetObj.GetCellValue(Row, "com_nm");
			SELECTROW=Row;
			if(sheetObj.GetCellValue(Row, "com_tp") == "B"){
				ajaxSendPost(searchBankNm, 'reqVal', '&goWhere=aj&bcKey=searchBankNm&com_nm='+com_nm, './GateServlet.gsl');
			}else{
				sheetObj.SetCellValue(SELECTROW, "com_cd","");
				sheetObj.SetCellValue(SELECTROW, "com_nm","");
				if(com_nm != ""){
					ajaxSendPost(searchCustNm, 'reqVal', '&goWhere=aj&bcKey=searchCustNm&com_nm='+com_nm, './GateServlet.gsl');
				}else{
					if(formObj.ofc_cnt.value == "US"){
						//sheetObj.CellValue(Row, "com_cd") = "LAX90812";
						//sheetObj.CellValue(Row, "com_nm") = "Cyberlogitec (HQ)";
					}
				}
			}
		break;
	}
}
function sumBalance(sheetObj){
	var formObj=document.frm1;
	var debit=0;
	var credit=0;
	var tot_amt;
	for(var i=1; i<=sheetObj.LastRow();i++){
if(sheetObj.GetCellValue(i,"del_chk") == "1"){
		}else{
			//sheetObj.SelectCell(i, 0);
			debit 	+= roundXL(Number(sheetObj.GetCellValue(i, "debit")),2);
			credit 	+= roundXL(Number(sheetObj.GetCellValue(i, "credit")),2);
		}
	}
	tot_amt=debit - credit;
	formObj.f_debit_tot.value=doMoneyFmt(roundXL(debit,2));
	formObj.f_credit_tot.value=doMoneyFmt(roundXL(credit,2));
	formObj.f_balance_tot.value=doMoneyFmt(roundXL(tot_amt,2));
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출  
	    	var cal=new ComCalendar();
	        cal.select(formObj.f_date, 'MM-dd-yyyy');
	    break;
    }
}
function getGlInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			sheetObj.SetCellValue(SELECTROW, "gl_no",rtnArr[0],0);
			sheetObj.SetCellValue(SELECTROW, "gl_rmk",rtnArr[1],0);
		}else{
			sheetObj.SetCellValue(SELECTROW, "gl_no","",0);
			sheetObj.SetCellValue(SELECTROW, "gl_rmk","",0);
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function searchBankInfoByGL(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "" && rtnArr[0] != "null"){
				sheetObj.SetCellValue(SELECTROW, "com_tp","B",0);
				sheetObj.SetCellValue(SELECTROW, "com_cd",rtnArr[0],0);
				if(rtnArr[1] != "" && rtnArr[1] != "null"){
					sheetObj.SetCellValue(SELECTROW, "com_nm",rtnArr[1],0);
				}else{
					sheetObj.SetCellValue(SELECTROW, "com_nm","",0);
				}
				sheetObj.SetCellValue(SELECTROW, "gl_no",rtnArr[2],0);
				sheetObj.SetCellValue(SELECTROW, "gl_rmk",rtnArr[3],0);
			}	
		}else{
			sheetObj.SetCellValue(SELECTROW, "com_tp","C",0);
			sheetObj.SetCellValue(SELECTROW, "com_cd","",0);
			sheetObj.SetCellValue(SELECTROW, "com_nm","",0);
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function searchBankInfoByGL2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "" && rtnArr[0] != "null"){
				sheetObj.SetCellValue(SELECTROW, "com_tp","B",0);
				sheetObj.SetCellValue(SELECTROW, "com_cd",rtnArr[0],0);
				if(rtnArr[1] != "" && rtnArr[1] != "null"){
					sheetObj.SetCellValue(SELECTROW, "com_nm",rtnArr[1],0);
				}else{
					sheetObj.SetCellValue(SELECTROW, "com_nm","",0);
				}
				sheetObj.SetCellValue(SELECTROW, "gl_no",rtnArr[2],0);
				sheetObj.SetCellValue(SELECTROW, "gl_rmk",rtnArr[3],0);
			}	
		}else{
			sheetObj.SetCellValue(SELECTROW, "com_cd","",0);
			sheetObj.SetCellValue(SELECTROW, "com_nm","",0);
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function searchBankNm(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			sheetObj.SetCellValue(SELECTROW, "com_cd",rtnArr[0]);
			sheetObj.SetCellValue(SELECTROW, "com_nm",rtnArr[1]);
		}else{
			sheetObj.SetCellValue(SELECTROW, "com_cd","");
			sheetObj.SetCellValue(SELECTROW, "com_nm","");
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function searchCustNm(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			sheetObj.SetCellValue(SELECTROW, "com_cd",rtnArr[0]);
			sheetObj.SetCellValue(SELECTROW, "com_nm",rtnArr[1]);
		}else{
			sheetObj.SetCellValue(SELECTROW, "com_cd","");
			sheetObj.SetCellValue(SELECTROW, "com_nm","");
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function setVoidDate(){
	var formObj=document.frm1;
	if(formObj.void_chk.checked){
		formObj.f_void_dt.value=TODAY;
	}else{
		formObj.f_void_dt.value="";
	}
}
function setDepositDate(){
	var formObj=document.frm1;
	if(formObj.deposit_chk.checked){
		formObj.f_deposit_dt.value=TODAY;
	}else{
		formObj.f_deposit_dt.value="";
	}
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  if(collTxt[i].name != "old_curr_cd"){
			  collTxt[i].value="";
		  }
	  }           
	}
	formObj.f_curr_cd.value=formObj.old_curr_cd.value;
	formObj.f_date.value=TODAY;
	formObj.f_old_date.value    = formObj.f_date.value;
	formObj.f_remark.value="";

	sheetObj.SetCellValue(1, "jnr_yn", "");
 	sheetObj.SetCellValue(1, "cls_yn", "");
 	
 	authControl();
 	
 	//#36527 - [COMMON]Journal Entry - 수정사항 1.Block 된 날짜 이전으로 입력 안되도록 Validation 추가 (Default : MAX+1 일)
	setBlock_dt();
	
	if(btn_role3 == "Y"){
//		getObj("saveBtn1").style.display   = "inline"
		getObj("saveBtn2").style.display   = "inline"
		getObj("btnModify").style.display   = "inline"
	}
	
	if(btn_role4 == "Y"){
//		getObj("deleteBtn1").style.display = "inline"
		getObj("deleteBtn2").style.display = "inline"
	}
	
//	getObj("addBtn01").style.display   	= "inline";
	getObj("addBtn02").style.display   	= "inline";
	
	sheetObj.RemoveAll();
	sheetObj.SetEditable(1);
}
function Copy(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	formObj.f_slip_no.value="";
	formObj.f_date.value=TODAY;
	formObj.f_seq.value="";
	sheetObj.SetCellValue(1, "clt_cmpl_flg", "") ;
	sheetObj.SetCellValue(1, "jnr_yn", "");
 	sheetObj.SetCellValue(1, "cls_yn", "");
	
 	authControl();
 	 
 	//#36527 - [COMMON]Journal Entry - 수정사항 1.Block 된 날짜 이전으로 입력 안되도록 Validation 추가 (Default : MAX+1 일)
	setBlock_dt();
	
	if(btn_role3 == "Y"){
//		getObj("saveBtn1").style.display   = "inline"
		getObj("saveBtn2").style.display   = "inline"
		getObj("btnModify").style.display   = "inline"
	}
	
	if(btn_role4 == "Y"){
//		getObj("deleteBtn1").style.display = "inline"
		getObj("deleteBtn2").style.display = "inline"
	}
	
//	addBtn01.style.display   	= "inline";
	getObj("addBtn02").style.display   	= "inline";
	
	for(var i=sheetObj.LastRow(); i>0; i--){
		
		sheetObj.SetCellValue(i, "ibflag", "I");
		sheetObj.SetCellValue(i, "clt_cmpl_flg", "");
		sheetObj.SetCellValue(i, "jnr_yn", "");
		sheetObj.SetCellValue(i, "cls_yn", "");
		sheetObj.SetCellValue(i, "delt_flg", "N");
		// 데이터의 글자색을 바꾼다.
		sheetObj.SetRowFontColor(i,"#000000");
		sheetObj.SetRowEditable(i,1);
	}
}
//그리드 전체를 삭제하면 전체 를 삭제한다.
function checkDelete(){
	var sheetObj=docObjects[0];
	var returnFlag=true;
	var delCnt=0;
	for(var i=1; i<=sheetObj.LastRow(); i++){
if(sheetObj.GetCellValue(i,"del_chk") == "1" && sheetObj.GetCellValue(i,"slip_no") != ""){
		    delCnt += 1;
	    }
   }
	if(delCnt == sheetObj.RowCount()){
		returnFlag=false;
	}
	return returnFlag;
}

/** LHK, 20131025 #21734  [BINEX]Post Date Check 로직 적용
*  File Block_dt 와 Post Date 체크, Post Date Set, BL 생성시 post date 에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
**/
function setBlock_dt(){
	
	var formObj  = document.frm1;
	
	//MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt', './GateServlet.gsl');
	
	if(NEXT_BLOCK_DT != "") {
		var nextBlockDtYMD  =   NEXT_BLOCK_DT.replaceAll("-", "");															//NEXT_BLOCK_DT  12-01-2013
			nextBlockDtYMD  =   nextBlockDtYMD.substring(4,8)+nextBlockDtYMD.substring(0,2)+nextBlockDtYMD.substring(2,4);	//nextBlockDtYMD 20131201
	
		var orgBlockDt   	= 	addDate('d', -1, nextBlockDtYMD, "");			
			ORG_BLOCK_DT	=   orgBlockDt.substring(4,6) + "-" + orgBlockDt.substring(6,8) + "-" + orgBlockDt.substring(0,4);
			
		//post_dt 와 block_dt 비교
		//fromDate > toDate true
		if(formObj.f_slip_no.value == ""){
			if(compareTwoDate(NEXT_BLOCK_DT, formObj.f_date.value)){
	 			formObj.f_date.value	= NEXT_BLOCK_DT;
	 		}
			formObj.f_old_date.value = formObj.f_date.value;
		}	
	}
}

function getMaxBlockOrJnrNextDt(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			NEXT_BLOCK_DT	=   doc[1].substring(4,6) + "-" + doc[1].substring(6,8) + "-" + doc[1].substring(0,4);
		}else{
			NEXT_BLOCK_DT =  "";
		}
	}
}

function checkPostDate(){
	var formObj  = document.frm1;
	var post_dt = formObj.f_date.value;
	
	if(post_dt == ""){
		alert(getLabel('ACC_MSG125'));
		formObj.f_date.value = formObj.f_old_date.value;
		formObj.f_date.select();
		return;
	}
	
	//OnChange 시에 check 함
	if(post_dt == formObj.f_old_date.value){
		return;
	}
	
	//Post Date 가 변경되는 경우에 NEXT_BLOCK_DT 보다 작으면 warnning massage 띄워줌
	if(NEXT_BLOCK_DT != "") {
		if(compareTwoDate(NEXT_BLOCK_DT, post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
			alert(getLabel2('ACC_MSG119',new Array(ORG_BLOCK_DT)));		//The Post Date must be later than the block date (@)";
			formObj.f_date.value = formObj.f_old_date.value;
			formObj.f_date.select();
			return;
		}
	}
}

//화면의 office 변경시 Detail 의 p_ofc_cd 변경유도, Grid update 시에 Server 단에서 처리됨으로 p_ofc_cd 에 value set 함
function chageGridOfcCd(obj){

	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	var ofc_cd	 = obj.value;
	
	for(var i=sheetObj.LastRow(); i>0; i--){
		sheetObj.SetCellValue(i, "p_ofc_cd", ofc_cd);
	}
}
