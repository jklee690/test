/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_INV_0032.js
*@FileTitle  : A/P EXPENSE List
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/20
=========================================================*/
var FROMDATE;
var TODAY;
var use_flg=false;
var G_GL_DATA_CREATE_STATUS = "END";
var rtnary=new Array(1);
var callBackFunc = "";
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
       case "SEARCHLIST":
    	   if(!formValidation()) return;
    	    formObj.f_cmd.value=SEARCHLIST;
            formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
            formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
            sheetObj2.RemoveAll();
            sheetObj.DoSearch("./ACC_INV_0032GS.clt", FormQueryString(formObj) );
       break;
	   case "NEWAR":
	    	var paramStr="./ACC_INV_0035.clt?f_cmd=-1";
	        parent.mkNewFrame('A/R Entry(G&A)', paramStr);	        
	   break;
	   case "NEWAP":
	    	var paramStr="./ACC_INV_0031.clt?f_cmd=-1";
	        parent.mkNewFrame('A/P Entry(G&A)', paramStr);	        
	   break;
       case "ROWADD":
			var intRows=sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);
       break;
       case "MODIFY":	//수정
    	   
   			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
  	 		var ref_ofc_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ofc_cd");
  	 		 
  	 		//alert(edoa_flg + " "+ofc_cd+" "+ref_ofc_cd);
	   	 	var btnflag = "Y";
			if (edoa_flg == "N"){
				if (ofc_cd != ref_ofc_cd){  
					btnflag = "N";
				}
			}  
			if (btnflag == "Y"){ 
			}else{
				alert(getLabel('FMS_COM_ALT083'));
				return;
			}
			
       	   if(!modifyval()){
       		   return;
       	   }
		   frm1.f_cmd.value=MODIFY;
           if(confirm(getLabel('FMS_COM_CFMSAV'))){
        	   formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
               formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
        	   sheetObj.DoSave("./ACC_INV_0032GS.clt", FormQueryString(formObj),"ibflag",false);
           }
       break;
       case "DELETE":	//삭제
    	   
  			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
 	 		var ref_ofc_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ofc_cd");
 	 		 
 	 		//alert(edoa_flg + " "+ofc_cd+" "+ref_ofc_cd);
	   	 	var btnflag = "Y";
			if (edoa_flg == "N"){
				if (ofc_cd != ref_ofc_cd){  
					btnflag = "N";
				}
			}  
			if (btnflag == "Y"){ 
			}else{
				alert(getLabel('FMS_COM_ALT084'));
				return;
			}
			
       	   if(!deleteValid()){
       		   return;
       	   }
    	   frm1.f_cmd.value=REMOVE;
           if(confirm(getLabel('FMS_COM_CFMDEL'))){
        	   formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
               formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
        	   sheetObj.DoSave("./ACC_INV_0032GS.clt", FormQueryString(formObj),"ibflag",false);
           }
       break;
		case "COPY":
			var row = sheetObj.GetSelectRow();
			var paramStr = "";
			
			if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "S"){	//A/R Entry(G&A) 인 경우
				paramStr = "./ACC_INV_0035.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(row, "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(row, "inv_no")+"&s_dept_cd="+sheetObj.GetCellValue(row, "dept_cd")+"&do_copy=Y";
		        parent.mkNewFrame('A/R Entry(G&A)', paramStr);
				
			}else {		//A/P Entry(G&A) 인 경우 
				paramStr = "ACC_INV_0031.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(row, "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(row, "inv_no")+"&s_dept_cd="+sheetObj.GetCellValue(row, "dept_cd")+"&do_copy=Y";
				parent.mkNewFrame("A/P Entry(G&A)", paramStr);
			}
			
			
		break;
	   case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_bill_to_nm.value;
	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   		
  	          
     	break;
/*
        case "GOEXP":	//Account Payable 화면호출
            var paramStr="./ACC_INV_0031.clt?f_cmd=-1";
            parent.mkNewFrame('A/P Entry(G&A)', paramStr);
        break;
*/
        case "DEPOSIT":	//DEPOSIT 화면호출
        	var sRow=sheetObj.GetSelectRow();
        	//#24007 oyh Deposit/Payment 이동 시 Level 1 으로 이동 
        	var inv_no=escape(sheetObj.GetCellValue(sRow, "inv_no"));
        	var paramStr="./ACC_JOR_0010.clt?f_cmd=-1&s_inv_no="+inv_no+"&s_cust_cd="+sheetObj.GetCellValue(sRow, "trdp_cd")+"&s_inv_tp="+sheetObj.GetCellValue(sRow, "inv_tp");
            parent.mkNewFrame('Customer Payment', paramStr);
        break;
        case "EXCEL":
        	if(sheetObj.RowCount() < 1){//no data	
    			ComShowCodeMessage("COM132501");
    		}else{
    			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
    		}
        break;
        case "EXCEL_ALL":
        	excelDown(sheetObj);
        break;
        case "INV_HIS":
			var sRow=sheetObj.GetSelectRow();
			if (sRow < 0){
				break;
			}
			var reqParam='?inv_seq=' + sheetObj.GetCellValue(sRow, "inv_seq");
			reqParam += '&inv_tp=' + sheetObj.GetCellValue(sRow, "inv_tp");
        	popGET('ACC_INV_0110.clt'+reqParam, '', 1110, 630, "scroll:yes;status:no;help:no;");
        break;
        case "CHECK":	//CHECK 화면호출
        	var sRow=sheetObj.GetSelectRow();
			//[20130215 OJG] 링크 경로 변경
        	//#24007 oyh Deposit/Payment 이동 시 Level 1 으로 이동 
        	var inv_no = "";
        	if (sheetObj.GetCellValue(sRow, "inv_tp") == "A/P"){
        		inv_no = escape(sheetObj.GetCellValue(sRow, "vnd_inv_no"));
        	} else {
        		inv_no = escape(sheetObj.GetCellValue(sRow, "inv_no"));
        	}
			var paramStr="./ACC_JOR_0030.clt?f_cmd=-1&s_inv_no="+inv_no+"&s_cust_cd="+sheetObj.GetCellValue(sRow, "trdp_cd")+"&s_inv_tp="+sheetObj.GetCellValue(sRow, "inv_tp");
        	parent.mkNewFrame('Payment', paramStr);
        break;
        case "PRINT":
        	var sRow=sheetObj.GetSelectRow();
        	if(sheetObj.GetCellValue(sRow, "sell_buy_tp_cd") == "S"){	// AR
        		 formObj.file_name.value='invoice_06.mrd';
	     	    formObj.title.value='INVOICE';
	       		formObj.mailTitle.value='INVOICE';
				//Parameter Setting
	        	var param='[' + formObj.f_email.value + ']';				// USER EMAIL';	[1]
	        	param += "[" + "'" + sheetObj.GetCellValue(sRow, "inv_seq") + "'" + ']';	// [2]
				param += '[]';												// [3]
				param += '[]';												// [4]
				param += '[]';												// [5]
				param += '[]';												// [6]
				param += '[' + sheetObj.GetCellValue(sRow, "trdp_nm") + ']';				// BILL_TO [7]
				param += '[' + sheetObj.GetCellValue(sRow, "ofc_cd") + ']';			// REF_OFC_CD  [8]
				param += '[' + sheetObj.GetCellValue(sRow, "bl_cnt_cd") + ']';				// CNT_CD  [9]  f_bl_cnt_cd
				param += '[' + formObj.f_usr_nm.value + ']';				// USER_NM [10]
				param += '[' + formObj.f_usrPhn.value + ']';				// 11
				param += '[' + formObj.f_usrFax.value + ']';				// 12
				param += '[' + formObj.f_usrId.value + ']';					// 13
				param += '[]';												// 14 main_trdp
				param += '[]';												// 15  f_hbl_no
				/*
	     		var trdp_cd = '';
	     		trdp_cd += '(' + '\'' + sheetObj.CellValue(sRow, "trdp_nm") + '\'' + ')';
	     		ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
	     		
	     		formObj.mailTo.value = mailTo;
				*/
	
        	}else{
        		formObj.file_name.value='invoice_13.mrd';
           		formObj.title.value='PAYMENT REQUEST';
           		formObj.mailTitle.value='PAYMENT REQUEST';
     			//Parameter Setting
				var param="[" + "'" + sheetObj.GetCellValue(sRow, "inv_seq") + "'" + ']';	// [1]
				param += '[' + sheetObj.GetCellValue(sRow, "trdp_nm") + ']';					// Vendor [2]
				param += '[' + sheetObj.GetCellValue(sRow, "ofc_cd") + ']';				// REF_OFC_CD [3]
     			param += '[]';					// CNT_CD  [4]
     			param += '[' + formObj.f_usr_nm.value + ']';					// USER_NM [5]
     			param += '[' + formObj.f_email.value + ']';						// USER EMAIL [6]
     			param += '[' + formObj.f_usrPhn.value + ']';					// 7
     			param += '[' + formObj.f_usrFax.value + ']';					// 8
     			param += '[' + formObj.f_usrId.value + ']';						// 9
        	}
        	formObj.rd_param.value=param;
        	formObj.mailTitle.value='Invoice No : ' + sheetObj.GetCellValue(sRow, "vnd_inv_no");
        	formObj.rpt_biz_tp.value="ACCT";
			formObj.rpt_biz_sub_tp.value="GA";
			formObj.rpt_trdp_cd.value =  sheetObj.GetCellValue(sRow, "trdp_cd");
        	
        	popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
        	break;
        case 'SLIP':
        	if(G_GL_DATA_CREATE_STATUS == "END"){
        		G_GL_DATA_CREATE_STATUS ="START";
        		setGlDataCreate('');
        	} 
        	return;
        break;
        case "GL_CREATE_END_ACTION":
        	var sRow=sheetObj.GetSelectRow();
        	formObj.title.value='Accounting Slip';
			var inv_seq=sheetObj.GetCellValue(sRow, "inv_seq");
			var source=sheetObj.GetCellValue(sRow, "inv_tp");
			var srcNo=sheetObj.GetCellValue(sRow, "vnd_inv_no");
        	var refNo="";
        	var blNo="";
        	
    		source = source + " (G&A)";
    		//formObj.file_name.value = 'account_slip_04.mrd';
    		//LHK 20140219 01로 통합
    		formObj.file_name.value = 'account_slip_01.mrd';
        	
			//Parameter Setting
        	var param="[" + "'" + inv_seq + "'" + ']';				// [1]
			param += '[' + source + ']';								// [2]
			param += '[' + srcNo + ']';									// [3]
			param += '[' + refNo + ']';									// [4]
			param += '[' + blNo + ']';									// [5]
			param += '[' + formObj.ofc_nm.value + ']';					// [6]
			param += '[' + formObj.user_id.value + ']';					// [7]
			param += '[' + formObj.ofc_cd.value + ']';					// [8]
			formObj.rd_param.value=param;
			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			break;
    }
}

function excelDown(mySheet){
	var formObj = document.frm1;
	formObj.f_cmd.value = COMMAND10;
	
	if(!formValidation()) return;
	formObj.f_cmd.value = COMMAND10;
	
    formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
    formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
	
	var formParam = FormQueryString(formObj);
	var param = {
					DownCols: makeHiddenSkipCol(mySheet)
					,SheetDesign:1
					,URL:"./ACC_INV_0032.clt"
					,ExtendParam:formParam
					,ExtendParamMethod:"GET"
				};	
	mySheet.DirectDown2Excel(param);
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
    
    //LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.s_ofc_cd);
	
	// COMPANY의 CUSTMIZE값을 판단하여 Department항목을 보여준다.(SCAC_CD == "AVNF")
	var scac_cd=frm1.scac_cd.value;
	if (scac_cd == "AVNF"){
		use_flg=true;
	}
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	 //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
    //오늘일자구하기
    var now=new Date(); 				
    var nxtDt=new Date(Date.parse(now) + 30 * 1000 * 60 * 60 * 24);
    var preDt=new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
    var year=nxtDt.getFullYear(); 			
    var month=nxtDt.getMonth() + 1;
    var date=nxtDt.getDate(); 	 	
    var preyear=preDt.getFullYear();
    var premonth=preDt.getMonth() + 1;
    if(month < 10){
    	month="0"+(month);
    }
    if(premonth < 10){
    	premonth="0"+(premonth);
    }
    if(date < 10){
    	date="0"+date;
    }
    FROMDATE=premonth + "-" + "01" + "-" + preyear;
    TODAY=month + "-" + date + "-" + year;
    ENDDATE=getEndDate(TODAY);
    formObj.s_post_strdt.value=FROMDATE;
    formObj.s_post_enddt.value=ENDDATE;
    /* LHK, 20140123 #25535, 추가 내용 Block Date Set */
    setBLOCK_POST_DT();
}

function RestoreGrid() {
	doWork("SEARCHLIST");
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
             var headers = [];
             if (use_flg){
            	headers = [ { Text:getLabel('ACC_INV_0032_HDR2'), Align:"Center"}];
             } else {
            	 headers = [{ Text:getLabel('ACC_INV_0032_HDR1'), Align:"Center"}];
             }
             InitHeaders(headers, info);
             var cols = [ {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"magam_flag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"check_flag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"inv_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",           KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
             if(use_flg){
            	 cols.push({Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"dept_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
             } else {
            	 cols.push({Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"dept_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
             }
             cols.push({Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"vnd_inv_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Float",     Hidden:0,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"pay_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Date",      Hidden:0,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"last_pay_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"bal_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Int",       Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"over_due",          KeyField:0,   CalcLogic:"",   Format:"NullInteger", PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"rgst_usrid",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"modi_usrid",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:1,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"modi_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"inv_modi_tms",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:0,  Width:200,  Align:"left",    ColMerge:1,   SaveName:"inv_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sell_buy_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"bl_cnt_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Status",    Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
             cols.push({Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" });
             InitColumns(cols);
             SetEditable(1);
             InitViewFormat(0, "post_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             InitViewFormat(0, "last_pay_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
             SetSheetHeight(450);
             resizeSheet();
           }                                                      
           break;
           
           <!-- ############################################### COMMON MEMO 2-4 ##################################################### -->
	       case 2:      //IBSheet1 init
	      	   initMemo(sheetObj);                                              
	       break;
	       <!-- ############################################### COMMON MEMO 2-4 ##################################################### -->
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
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
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	//sheetObj.HeadCheck(0, "check_flag") = false;
	doDispPaging(sheetObj.GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	for(var i=1; i<=sheetObj.LastRow();i++){
		// #23823 over_due가 )보다 작으면 0으로 변경 
		if (sheetObj.GetCellValue(i, "over_due") < 0) {
			sheetObj.SetCellValue(i, "over_due",0,0);
		}
		/*
		sheetObj.SetRowBackColor(i,"#EFEBEF");
		sheetObj.SetColBackColor(0,"#FFFFFF");
		sheetObj.SetColBackColor(2,"#FFFFFF");
		*/
		//마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
		if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y" || Number(sheetObj.GetCellValue(i, "pay_amt")) > 0){
			sheetObj.SetCellEditable(i, "post_dt",0);
			sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
			if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
				sheetObj.SetCellValue(i, "magam_flag","Y");
				sheetObj.SetCellFontColor(i, "magam_flag","#FF0000");
			}
		}else{
			sheetObj.SetCellEditable(i, "post_dt",1);
			sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
		}
	}
	formObj.s_amt_fr.value=doMoneyFmt(formObj.s_amt_fr.value);
	formObj.s_amt_to.value=doMoneyFmt(formObj.s_amt_to.value);
	
	<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
	var intg_bl_seq = '';
	var palt_mnu_cd = '';
	var opr_no = '';
	
	if(sheetObj.GetTotalRows()>0){
		intg_bl_seq = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "inv_seq");
		palt_mnu_cd = 'INV';
		
		if(sheetObj.GetCellValue(sheetObj.GetSelectRow(), "inv_tp") == "A/P"){
			opr_no = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "vnd_inv_no");
		}else{
			opr_no = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "inv_no");
		}
	}
		
	setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
	<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	doDispPaging(sheetObj.GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	for(var i=1; i<=sheetObj.LastRow();i++){
		// #23823 over_due가 )보다 작으면 0으로 변경 
		if (sheetObj.GetCellValue(i, "over_due") < 0) {
			sheetObj.SetCellValue(i, "over_due",0,0);
		}
		/*
		sheetObj.SetRowBackColor(i,"#EFEBEF");
		sheetObj.SetColBackColor(0,"#FFFFFF");
		sheetObj.SetColBackColor(2,"#FFFFFF");
		*/
	}
	formObj.s_amt_fr.value=doMoneyFmt(formObj.s_amt_fr.value);
	formObj.s_amt_to.value=doMoneyFmt(formObj.s_amt_to.value);
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	//doWork("SEARCHLIST");
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	//var inv_rmk_var = sheetObj.GetCellValue(Row, "inv_rmk");
    //formObj.f_remark.value = inv_rmk_var;
    
    formObj.f_inv_seq.value=sheetObj.GetCellValue(Row, "inv_seq");
	formObj.f_inv_no.value=sheetObj.GetCellValue(Row, "inv_no");
	formObj.f_print_type.value=sheetObj.GetCellValue(Row, "inv_tp");
	switch (sheetObj.ColSaveName(Col)) {
	    case "check_flag" :
			for(var i=1; i<=sheetObj.LastRow();i++){
				if(i == Row){
					if(sheetObj.GetCellValue(i, "check_flag") == "0"){
						sheetObj.SetCellValue(i, "check_flag","0");
					}else{
						sheetObj.SetCellValue(i, "check_flag","1");
					}
				}else{
					if(i != sheetObj.LastRow()){
						sheetObj.SetCellValue(i, "check_flag","0");
					}
				}
			}
		break;
	 }
	
		for(var i=1; i<=sheetObj.LastRow();i++){
		/*
		if(i == Row){
			sheetObj.SetRowBackColor(i,"#DFFFFF");
		}else{
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			sheetObj.SetColBackColor(0,"#FFFFFF");
			sheetObj.SetColBackColor(2,"#FFFFFF");
		}
		*/
	}
	//마감처리를 한다.
	if(sheetObj.GetCellValue(Row, "clt_cmpl_flg") == "Y"){
		getObj('btnModify').style.display="none";
		getObj('btnDelete').style.display="none";
	}else{
		if(formObj.f_attr3.value == "Y"){
			getObj('btnModify').style.display="inline";
		}
		if(formObj.f_attr4.value == "Y"){
			getObj('btnDelete').style.display="inline";
		}
	}
	
	<!-- ############################################### COMMON MEMO 3-4 ##################################################### -->
	var intg_bl_seq =  sheetObj.GetCellValue(Row, "inv_seq");
	var palt_mnu_cd = 'INV';
	var opr_no = '';
	
	if(sheetObj.GetCellValue(Row, "inv_tp") == "A/P"){
		opr_no = sheetObj.GetCellValue(Row, "vnd_inv_no");
	}else{
		opr_no = sheetObj.GetCellValue(Row, "inv_no");
	}
	
	setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
	doWorkMemo("SEARCHMEMO");
	<!-- ############################################### COMMON MEMO 3-4 ##################################################### -->
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	if(sheetObj.ColSaveName(Col) != "post_dt" && sheetObj.ColSaveName(Col) != "check_flag"){
		if(sheetObj.GetCellValue(Row, "sell_buy_tp_cd") == "S"){
			// TODO param을  if else로 바꿀건지...
			var paramStr="./ACC_INV_0035.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+escape(sheetObj.GetCellValue(Row, "inv_no"));
	        parent.mkNewFrame('A/R Entry(G&A)', paramStr, "ACC_INV_0035_SHEET_"+sheetObj.GetCellValue(Row, "inv_seq") + "_" + sheetObj.GetCellValue(Row, "inv_no"));
		}else{
			// TODO param을  if else로 바꿀건지...
	    	//var paramStr = "./ACC_INV_0031.clt?f_cmd=-1&f_inv_seq="+sheetObj.CellValue(Row, "inv_seq")+"&s_inv_no="+sheetObj.CellValue(Row, "inv_no")+"&s_dept_cd="+sheetObj.CellValue(Row, "dept_cd");
			var paramStr="./ACC_INV_0031.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+escape(sheetObj.GetCellValue(Row, "inv_no"));
	        parent.mkNewFrame('A/P Entry(G&A)', paramStr, "ACC_INV_0031_SHEET_" + sheetObj.GetCellValue(Row, "inv_seq")+ "_" + sheetObj.GetCellValue(Row, "inv_no"));
		}
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "post_dt" :
			//LHK, 20130123, block date, jnr_dt 비교로직 추가.
			var v_post_dt=sheetObj.GetCellValue(Row, "post_dt");
			var v_org_post_dt=sheetObj.CellSearchValue(Row, "post_dt");
			v_post_dt=v_post_dt.substr(4, 2) + '-' + v_post_dt.substr(6, 2) + '-' + v_post_dt.substr(0, 4);
			v_org_post_dt=v_org_post_dt.substr(4, 2) + '-' + v_org_post_dt.substr(6, 2) + '-' + v_org_post_dt.substr(0, 4);
			if(BLOCK_POST_DT == ""){
				sheetObj.SetCellValue(Row, "check_flag","1");
				return;
			}
			//BLOCK_POST_DT > v_post_dt
			if(compareTwoDate(BLOCK_POST_DT, v_post_dt)){
				sheetObj.SetCellText(Row, "post_dt",v_org_post_dt);
				sheetObj.SetCellValue(Row, "check_flag","0");
				alert(getLabel2('ACC_MSG119',new Array(ORG_BLOCK_POST_DT)));
				sheetObj.SelectCell(Row, "post_dt");
			}else{
				sheetObj.SetCellValue(Row, "check_flag","1");
			}
		break;
	}
}
/**
 * Space 이벤트로 체크시 2번의 Row를 선택 못하게 설정
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnKeyUp(sheetObj, Row, Col, KeyCode, Shift){
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(Col);
	if (KeyCode == 32 && colStr == "check_flag"){
		for(var i=1; i<=sheetObj.LastRow();i++){
			if(i == Row){
				if(sheetObj.GetCellValue(i, "check_flag") == "0"){
					sheetObj.SetCellValue(i, "check_flag","0");
				}else{
					sheetObj.SetCellValue(i, "check_flag","1");
				}
			}else{
				sheetObj.SetCellValue(i, "check_flag","0");
			}
		}
	}

}

/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	    	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_post_strdt, formObj.s_post_enddt,  'MM-dd-yyyy');
	    break;
        case 'DATE2':    //달력 조회 팝업 호출      
        	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_inv_strdt, formObj.s_inv_enddt, 'MM-dd-yyyy');
        break;
    }
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].value="";
	  }           
	}

	//#47813 Type 초기화
	formObj.s_sell_buy_tp_cd[0].selected=true;
	
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.s_ofc_cd);
	
	formObj.s_post_strdt.value=FROMDATE;
	formObj.s_post_enddt.value=ENDDATE;
	sheetObj.RemoveAll();
	sheetObj2.RemoveAll();
	//formObj.f_remark.value = '';
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type="";
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;	
				s_type="trdpCode";
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}else{
		formObj.s_bill_to_cd.value="";//trdp_cd  AS param1
		formObj.s_bill_to_nm.value="";//eng_nm   AS param2
	}
}
/**
 * Trade Partner 관린 코드조회
 */
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="BILLTO"){
				formObj.s_bill_to_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.s_bill_to_nm.value=masterVals[3];		//eng_nm   AS param2
			}
		}else{
			if(CODETYPE =="BILLTO"){
				formObj.s_bill_to_cd.value="";//trdp_cd  AS param1
				formObj.s_bill_to_nm.value="";//eng_nm   AS param2
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function addComma(obj){
	obj.value=doMoneyFmt(obj.value);
}
function setAmount(){
	var formObj=document.frm1;
	formObj.s_amt_to.value=formObj.s_amt_fr.value;
}
//말일구하기
function getEndDate(datestr){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2));
    //윤년 검증
    var boundDay="";
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm="0"+mm;
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm;
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm;
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}
function custEnterAction(obj, type){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}else if(type == "CUSTOMER2"){
			doWork("CUSTOMER_POPLIST2");
		}
	}
}
function modifyval(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var rowStsCnt=0;
	if(sheetObj.RowCount()< 1){
		alert(getLabel('ACC_MSG33'));
		return false;
	}
	for(var i=1;i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i,"post_dt")== ""){
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_POSTDT'));
			sheetObj.SelectCell(i,"post_dt");
			return false;
		}
		if(sheetObj.GetRowStatus(i)!="R"){
			rowStsCnt++;
		} 
	}
	if(rowStsCnt == 0){
		alert(getLabel('ACC_COM_ALT007'));
		return false;
	}
	return true;
}
function deleteValid(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var rowStsCnt=0;
	var checkList=sheetObj.FindCheckedRow('check_flag');
	if(sheetObj.RowCount()< 1){
		alert(getLabel('ACC_MSG33'));
		return false;
	}
	if(checkList == ''){
		alert(getLabel('ACC_MSG105'));
		return false;
	}
	
	//#26602 Delete Button Disappear
	var sRow = sheetObj.GetSelectRow();
	
	if(sheetObj.GetCellValue(sRow, "clt_cmpl_flg") == "Y" || Number(sheetObj.GetCellValue(sRow, "pay_amt")) > 0){
		alert(getLabel('ACC_MSG142'));
		return false;
	}
	
	return true;
}
function formValidation(){
	var formObj=document.frm1;
	/*
	if(trim(formObj.s_post_strdt.value)!= "" && trim(formObj.s_post_enddt.value) != ""){
		if(getDaysBetweenFormat(formObj.s_post_strdt,formObj.s_post_enddt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033'));
			formObj.s_post_enddt.focus();
			return false;
		}
	}
	if(trim(formObj.s_inv_strdt.value)!= "" && trim(formObj.s_inv_enddt.value) != ""){
		if(getDaysBetweenFormat(formObj.s_inv_strdt,formObj.s_inv_enddt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033'));
			formObj.s_inv_enddt.focus();
			return false;
		}
	}	
	*/
	if(!chkSearchCmprPrd(false, frm1.s_post_strdt, frm1.s_post_enddt)){
		return false;
	}
    if(!chkSearchCmprPrd(false, frm1.s_inv_strdt, frm1.s_inv_enddt)){
    	return false;
	}
	return true;
}
//Calendar flag value
var firCalFlag=false;
var firAmtFlag=false;
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
function setBLOCK_POST_DT(){
	//LHK, 20130122, today, post date 비교하지 않는다, post_date 변경시 block date, jnr_dt 와만 비교함.
	var formObj=document.frm1;
	var block_post=formObj.block_post.value;
	var max_jnr_dt=formObj.max_jnr_dt.value;
	var tempBlkDt="";
	//큰 것과 jnr_dt 비교, 크면 jnr_dt 아니면 위 로직의 큰 date 이 Set 된다. 
	if(block_post != "" && max_jnr_dt != ""){
		if(!compareTwoDate(block_post, max_jnr_dt)){
			tempBlkDt=max_jnr_dt;
		}else{
			tempBlkDt=block_post;
		}
	}else{
		if(block_post != ""){
			tempBlkDt=block_post;
		}
		if(max_jnr_dt != ""){
			tempBlkDt=max_jnr_dt;
		}
	}
	if(tempBlkDt != ""){
		ORG_BLOCK_POST_DT=tempBlkDt.substring(0,2) + "-" + tempBlkDt.substring(2,4) + "-" + tempBlkDt.substring(4,8);	// mmddyyyy ;
		tempBlkDt=tempBlkDt.substring(4,8)+tempBlkDt.substring(0,2)+tempBlkDt.substring(2,4);
		tempBlkDt=addDate('d', 1, tempBlkDt, "");
		BLOCK_POST_DT=tempBlkDt.substring(4,6) + "-" + tempBlkDt.substring(6,8) + "-" + tempBlkDt.substring(0,4);
	}
}
function  CUSTOMER_POPLIST(rtnVal)
{
	var formObj = document.frm1;
       if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			formObj.s_bill_to_cd.value=rtnValAry[0];//full_nm
			formObj.s_bill_to_nm.value=rtnValAry[2];//full_nm
		}          	
}

//GL View Table Data Create LKH 2015.02.25 Start
function setGlDataCreate(arg){
	//if(confirm(getLabel('FMS_COM_CFMCRE'))){
		var formObj=document.frm1;
		doShowProcess();		
		var type_clss_cd = 'GL_DATA_CREATE';
		ajaxSendPostAsync(rtnAjaxFunction, 'reqVal', '&goWhere=aj&bcKey=setGlDataCreate&f_usrId='+formObj.f_usrId.value+'&f_type_clss_cd='+type_clss_cd, './GateServlet.gsl');
	//}
} 	

function rtnAjaxFunction(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		//getGlDataCreateDate()
		doHideProcess();
		//alert(getLabel('FMS_COM_NTYCOM'));		
	}else{
		doHideProcess();
		alert(getLabel('FMS_COM_ALT019'));
	}
	G_GL_DATA_CREATE_STATUS ="END";
	doWork('GL_CREATE_END_ACTION');
}

function ajaxSendPostAsync(callback, param, data, url){
	sendRequest(callback, param, data, 'POST', url, true);
}