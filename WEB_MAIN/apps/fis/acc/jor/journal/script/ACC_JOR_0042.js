/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0042.js
*@FileTitle  : Check Journal List	MANAGE2
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/25
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var FROMDATE;
var TODAY;
var ENDDATE;
var jnrVoidflag = ''; 
var beforeChkNo = 0;
var G_GL_DATA_CREATE_STATUS = "END";
var changeValue = "*****";
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
	   case "NEW":
			var paramStr="./ACC_JOR_0032.clt?f_cmd=-1";
		    parent.mkNewFrame('Payment Level 3', paramStr);      
	   break;      
       case "SEARCHLIST":
    	   if(!formValidation()) return;
    	   //sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
            formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
            sheetObj2.RemoveAll();
            docObjects[0].DoSearch("./ACC_JOR_0042GS.clt", FormQueryString(formObj) );
       break;
       case "ROWADD":
    	  	var intRows=sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);
       break;
       case "MODIFY":	//수정
    	   
    	   var ref_ofc_cd = "";
    	   for(var i=1; i<=sheetObj.LastRow();i++){
    		   var check_flag = sheetObj.GetCellValue(i, "check_flag");
    		   if (check_flag == "1"){
    			   //alert(sheetObj.GetCellValue(i, "chk_no"));
    			   ref_ofc_cd = sheetObj.GetCellValue(i, "p_ofc_cd");
    		   }
    	   }  
  	 	//	alert(edoa_flg + " "+ofc_cd+" "+ref_ofc_cd);
	   	 	var btnflag = "Y";
			if (edoa_flg == "N"){
				if (ofc_cd != ref_ofc_cd){  
					btnflag = "N";
				}
			}  
			if (ref_ofc_cd == "") { btnflag = "Y"; }
			if (btnflag == "Y"){ 
			}else{
				alert(getLabel('FMS_COM_ALT083'));
				return;
			}
			
		   frm1.f_cmd.value=MODIFY;
	       //LHK, 20140429, #26602 [SUNWAY] Delete Button Disappear
		   var sRow=sheetObj.FindCheckedRow("check_flag");
		   //가져온 행을 배열로 반든다.
//		   var arrRow=sRow.split("|");
//		   chk_cnt=arrRow.length-1;
		   if(sRow == 0){
			   //No Delete Data!!
			   alert(getLabel('FMS_COM_ALT004'));
			   return;
		   } 
		   var chk_row=sRow;
		   //마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
			if(sheetObj.GetCellValue(chk_row, "clt_cmpl_flg") == "Y"
				|| sheetObj.GetCellValue(chk_row, "clr_yn") == "Y"
				|| sheetObj.GetCellValue(chk_row, "void_yn") == "Y"
				|| (sheetObj.GetCellValue(chk_row, "chk_pnt_yn") == "Y" && formObj.prn_flg.value != 'Y')){
				alert(getLabel('ACC_MSG141'));
				return;
		   }
           if(confirm(getLabel('FMS_COM_CFMSAV'))){
        	   sheetObj.DoSave("ACC_JOR_0042GS.clt", FormQueryString(formObj),"ibflag",false);
           }

           break;
       case "DELETE":	//삭제
    	   
    	   var ref_ofc_cd = "";
    	   for(var i=1; i<=sheetObj.LastRow();i++){
    		   var check_flag = sheetObj.GetCellValue(i, "check_flag");
    		   if (check_flag == "1"){
    			   //alert(sheetObj.GetCellValue(i, "chk_no"));
    			   ref_ofc_cd = sheetObj.GetCellValue(i, "p_ofc_cd");
    		   }
    	   }  
  	 	//	alert(edoa_flg + " "+ofc_cd+" "+ref_ofc_cd);
	   	 	var btnflag = "Y";
			if (edoa_flg == "N"){
				if (ofc_cd != ref_ofc_cd){  
					btnflag = "N";
				}
			}  
			if (ref_ofc_cd == "") { btnflag = "Y"; }
			if (btnflag == "Y"){ 
			}else{
				alert(getLabel('FMS_COM_ALT084'));
				return;
			}
			
    	   frm1.f_cmd.value=REMOVE;
	       var chk_cnt=0;
		   var jnrNoVal="";
		   //LHK, 20140429, #26602 [SUNWAY] Delete Button Disappear
		   var sRow=sheetObj.FindCheckedRow("check_flag");
		   //가져온 행을 배열로 반든다.
//		   var arrRow=sRow.split("|");
//		   chk_cnt=arrRow.length-1;
		   if(sRow == 0){
			   //No Delete Data!!
			   alert(getLabel('FMS_COM_ALT004'));
			   return;
		   }
		   var chk_row=sRow;
			jnrNoVal=sheetObj.GetCellValue(chk_row ,"jnr_no");
		   //마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
			if(sheetObj.GetCellValue(chk_row, "clt_cmpl_flg") == "Y"
				|| sheetObj.GetCellValue(chk_row, "clr_yn") == "Y"
				|| (sheetObj.GetCellValue(chk_row, "chk_pnt_yn") == "Y" && formObj.prn_flg.value != 'Y')){
				alert(getLabel('ACC_MSG140'));
				return;
		   }
		   //Bug #26931 LHK, 20140310, A. Deposit/Payment List 에서 Delete 하는 경우 
//		   ajaxSendPost(getJnrVoidInfo, 'reqVal', '&goWhere=aj&bcKey=getJnrVoidInfo&f_jnr_no='+jnrNoVal, './GateServlet.gsl');
//		   if(jnrVoidflag == "Y"){
//			   alert(getLabel('ACC_MSG138'));
//			   return;
//		   }
           if(confirm(getLabel('FMS_COM_CFMDEL'))){
        	   sheetObj.DoSave("ACC_JOR_0042GS.clt", FormQueryString(formObj),"ibflag",false);
           }

       break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_vendor_nm.value;
	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST";   		
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
     	break;
        case "GOLOCAL":	//LOCAL INVOICE 화면호출
            var paramStr="./ACC_INV_0010.clt?f_cmd=-1&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
            parent.mkNewFrame('A/R Entry', paramStr);
        break;
        case "GOCRDB":	//CR/DB Note 화면호출
            var paramStr="./ACC_INV_0020.clt?f_cmd=-1&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
            parent.mkNewFrame('DC Note Entry', paramStr);
        break;
        case "GOAP":	//Account Payable 화면호출
            var paramStr="./ACC_INV_0030.clt?f_cmd=-1&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
            parent.mkNewFrame('A/P Entry(Cost)', paramStr);
        break;
        case "PRINT":
	       	if(formObj.f_jnr_no.value == ""){
//	       		alert("No Print Data! ");
	       		alert(getLabel('FMS_COM_ALT004'));
	       		return;
	       	}
	    	var sRow=sheetObj.GetSelectRow(); 
	   		if (getStatus(sRow)==false) return false;	       	
	       	var bankSeq=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "bank_seq");
	       	ajaxSendPost(getBankChkForm, 'reqVal', '&goWhere=aj&bcKey=searchBankChkForm&bank_seq='+bankSeq, './GateServlet.gsl');
	       	if(formObj.f_chk_form.value !=  ""){
				formObj.file_name.value='check_journal_01_' + formObj.f_chk_form.value + '.mrd';
			}else{
				formObj.file_name.value='check_journal_01.mrd';
			}
			formObj.title.value='Check Print';
			var param='[' + formObj.f_jnr_no.value + ']';				// [1]
			param	  += '[' + formObj.rider_yn.value + ']';				// [2]
			param	  += '[]';												// [3]
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0020.clt', 'popTest', 1025, 740);
       break;
       case "RIDERPRINT":
	       	if(formObj.f_jnr_no.value == ""){
//	       		alert("No Print Data! ");
	       		alert(getLabel('FMS_COM_ALT004'));
	       		return;
	       	}
	    	var sRow=sheetObj.GetSelectRow(); 
	   		if (getStatus(sRow)==false) return false;	       	
	       	formObj.file_name.value='check_journal_02.mrd';
			formObj.title.value='Check Print';
			var param='[' + formObj.f_jnr_no.value + ']';				// [1]
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0020.clt', 'popTest', 1025, 740);
       break;
       case "EXCEL":
    	   if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj.Down2Excel( {HiddenColumn:1, SheetDesign:1,Merge:1, CheckBoxOffValue:" ",CheckBoxOnValue:"Y" });
	   		}
       break;
       case "JNR_HIS":
	       	var sRow=sheetObj.GetSelectRow(); 
	   		if (getStatus(sRow)==false) return false;
			if (sRow < 0){
				break;
			}
			var reqParam='?jnr_no=' + sheetObj.GetCellValue(sRow, "jnr_no");
				reqParam += '&jnr_tp=' +"C";
			popGET('ACC_JOR_0700.clt'+reqParam, '', 1100, 600, "scroll:yes;status:no;help:no;");
       break;
       case 'SLIP':
	    	var sRow=sheetObj.GetSelectRow(); 
	   		if (getStatus(sRow)==false) return false;	    	   
    	   if(G_GL_DATA_CREATE_STATUS == "END"){
         		G_GL_DATA_CREATE_STATUS ="START";
         		setGlDataCreate('');
         	} 
         	return;
         break;
         case "GL_CREATE_END_ACTION":
         	var sRow=sheetObj.GetSelectRow(); 
       		if (getStatus(sRow)==false) return false;
         	formObj.title.value='Accounting Slip';
         	var jnr_no=sheetObj.GetCellValue(sRow, "jnr_no");
         	var source="";
			var srcNo=sheetObj.GetCellValue(sRow, "chk_no");
			var refNo=sheetObj.GetCellValue(sRow, "ref_no");
			var blNo=sheetObj.GetCellValue(sRow, "hbl_no");
     		source="Check Journal";
     		formObj.file_name.value='account_slip_06.mrd';
   		//Parameter Setting
         	var param="[" + "'" + jnr_no + "'" + ']';					// [1]
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
       case 'MESSENGER_SLIP':
       	var sRow=sheetObj.GetSelectRow(); 
   		if (getStatus(sRow)==false) return false;    	   
      	  var chkCnt=0;
  	      	for(var i=1; i < sheetObj.LastRow() + 1; i++){
  	      		if(sheetObj.GetCellValue(i, 'check_flag')==1){
  	      			if(chkCnt>0){
  	      				sheetObj.SetCellValue(i, 'check_flag',0);
  	      	    	}
  	      			chkCnt++;
  	      		}
  	      	}
  	      	if(chkCnt==0){
  	      		alert(getLabel('FMS_COM_ALT004'));
  	      		return;
  	      	}
  	       	if(formObj.f_jnr_no.value == ""){
//  	       		alert("No Print Data! ");
  	       		alert(getLabel('FMS_COM_ALT004'));
  	       		return;
  	       	}
  			formObj.file_name.value='messenger_slip.mrd';
  			formObj.title.value='Messenger Slip';
  			var param='[' + formObj.f_jnr_no.value + ']';				// [1]
  				param += '[' + formObj.ofc_cd.value + ']';					// [2]
  			formObj.rd_param.value=param;
  			//51484 [BNX] ACCOUNTING REPORTS (MESSENGER SLIP) EMAIL로 SEND OUT 가능하게
  			popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
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
    
    //LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.s_ofc_cd);
	
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
    var preDt=new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
    var year=now.getFullYear(); 			
    var month=now.getMonth() + 1;
    var date=now.getDate(); 	
    var preyear=preDt.getFullYear();
    var premonth=preDt.getMonth() + 1;
    var predate=preDt.getDate();
    if(month < 10){
    	month="0"+(month);
    }
    if(date < 10){
    	date="0"+date;
    }
    if(premonth < 10){
    	premonth="0"+(premonth);
    }
    if(predate < 10){
    	predate="0"+predate;
    }
    /* 2013.10.04 변경 
     *  검색시작일 - today - 3달전 (90일)
     *  검색종료일 - today
	FROMDATE=premonth + "-" + "01" + "-" + preyear;
	TODAY=month + "-" + date + "-" + year;
	ENDDATE=getEndDate(TODAY);
     */
    FROMDATE=premonth + "-" + predate + "-" + preyear;
    TODAY=month + "-" + date + "-" + year;
    formObj.s_post_strdt.value=FROMDATE;
    formObj.s_post_enddt.value=TODAY;
    setBlock_dt();
}
function RestoreGrid(){
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
             var headers = [ { Text:getLabel('ACC_JOR_0041_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);
             var cols = [ {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"magam_flag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Radio",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"check_flag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"chk_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"bank_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"AutoSum",   Hidden:0, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Date",      Hidden:0,  Width:75,   Align:"Center",  ColMerge:1,   SaveName:"clr_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:"void_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"void_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:"chk_pnt_yn",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:"rider_yn",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:"block",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"rgst_usrid",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:55,   Align:"Left",    ColMerge:1,   SaveName:"rmk",  	    	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clr_yn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"hbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"mbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"bank_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ofc_blck_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"level_value",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"p_ofc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
             InitColumns(cols);
             SetEditable(1);
             InitViewFormat(0, "post_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             InitViewFormat(0, "clr_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             InitViewFormat(0, "void_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
             SetSheetHeight(500);
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

function sheet1_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
	sheet1_OnClick(sheetObj, sheetObj.HeaderRows(), col);
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
	//칼럼의 글자 색 설정
    sheetObj.SetColFontColor("magam_flag","#FF0000");
	for(var i=1; i<=sheetObj.LastRow();i++){
		/*
if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			sheetObj.SetRowEditable(i,0);
		}else{
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			if(i != sheetObj.LastRow()){
				sheetObj.SetCellBackColor(i, "check_flag","#FFFFFF");
				sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
				sheetObj.SetCellEditable(i, "check_flag",1);
				sheetObj.SetCellEditable(i, "post_dt",1);
			}
		}
		*/
		//마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
		if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"
			|| sheetObj.GetCellValue(i, "clr_yn") == "Y"
			|| sheetObj.GetCellValue(i, "void_yn") == "Y"
			|| (sheetObj.GetCellValue(i, "chk_pnt_yn") == "Y" && formObj.prn_flg.value != 'Y')){
			sheetObj.SetCellEditable(i, "post_dt",0);
			sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
/*if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
				sheetObj.SetCellValue(i, "magam_flag","Y");
//parameter changed[check again]CLT 				sheetObj.SetCellFontColor(i, "magam_flag","#FF0000");
			}*/
		}else{
			sheetObj.SetCellEditable(i, "post_dt",1);
			sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
		}
	}
	
	setGridOfcBlckFlg();
	
	sheetObj.SetSumText(0, 0,"");
	sheetObj.SetSumText(0, 2,"TOTAL");
	formObj.s_amt_fr.value=doMoneyFmt(formObj.s_amt_fr.value);
	formObj.s_amt_to.value=doMoneyFmt(formObj.s_amt_to.value);

	<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
	var intg_bl_seq = '';
	var palt_mnu_cd = '';
	var opr_no = '';
	
	if(sheetObj.GetTotalRows()>0){
		intg_bl_seq = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "jnr_no");
		palt_mnu_cd = 'PMT';
		opr_no = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "chk_no");
	}
	
	setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
	<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	for(var i=1; i<=sheetObj.LastRow();i++){
		/*
if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			sheetObj.SetRowEditable(i,0);
		}else{
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			if(i != sheetObj.LastRow()){
				sheetObj.SetCellBackColor(i, "check_flag","#FFFFFF");
				sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
				sheetObj.SetCellEditable(i, "check_flag",1);
				sheetObj.SetCellEditable(i, "post_dt",1);
			}
		}
		*/
		//마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
		if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"
			|| sheetObj.GetCellValue(i, "clr_yn") == "Y"
			|| sheetObj.GetCellValue(i, "void_yn") == "Y"
			|| (sheetObj.GetCellValue(i, "chk_pnt_yn") == "Y" && formObj.prn_flg.value != 'Y')){
			sheetObj.SetCellEditable(i, "post_dt",0);
			sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
/*if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
				sheetObj.SetCellValue(i, "magam_flag","Y");
//parameter changed[check again]CLT 				sheetObj.SetCellFontColor(i, "magam_flag","#FF0000");
			}*/
		}else{
			sheetObj.SetCellEditable(i, "post_dt",1);
			sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
		}
	}
	
	setGridOfcBlckFlg();
	
	sheetObj.SetSumText(0, 0,"");
	sheetObj.SetSumText(0, 2,"TOTAL");
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}

}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	/* 
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
	*/
	/*
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(i == Row){
			sheetObj.SetRowBackColor(i,"#DFFFFF");
		}else{
if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
				sheetObj.SetRowBackColor(i,"#EFEBEF");
			}else{
				sheetObj.SetRowBackColor(i,"#EFEBEF");
				if(i != sheetObj.LastRow()){
					sheetObj.SetCellBackColor(i, "check_flag","#FFFFFF");
					sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
				}
			}
		}
	}
	 */
//	printBtn01.style.display="inline";
	if (getStatus(Row)==false) return false;
	getObj('printBtn02').style.display="inline";
	//RIDER PRINT 체크
	if(sheetObj.GetCellValue(Row, "rider_yn") == "Y"){
//		riderprintBtn01.style.display="inline";
		getObj('riderprintBtn02').style.display="inline";
		formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
		formObj.rider_yn.value="Y";
	}else{
//		riderprintBtn01.style.display="none";
		getObj('riderprintBtn02').style.display="none";
		formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
		formObj.rider_yn.value="N";
	}
	
	<!-- ############################################### COMMON MEMO 3-4 ##################################################### -->
	var intg_bl_seq =  sheetObj.GetCellValue(Row, "jnr_no");
	var palt_mnu_cd = 'PMT';
	var opr_no = sheetObj.GetCellValue(Row, "chk_no");
	setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
	doWorkMemo("SEARCHMEMO");
	<!-- ############################################### COMMON MEMO 3-4 ##################################################### -->
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	if (getStatus(Row)==false) return false;
	var formObj=document.frm1;
	if(sheetObj.ColSaveName(Col) != "post_dt" && sheetObj.ColSaveName(Col) != "check_flag"){
		var paramStr="./ACC_JOR_0032.clt?f_cmd=-1&s_jnr_no="+sheetObj.GetCellValue(Row, "jnr_no");
	    parent.mkNewFrame('Payment Level 3', paramStr,"ACC_JOR_0032_SHEET_" + sheetObj.GetCellValue(Row, "jnr_no"));
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "post_dt" :
			//LHK, 20130123, block date, jnr_dt 비교로직 추가.
			var v_post_dt=sheetObj.GetCellValue(Row, "post_dt");
			var v_org_post_dt=sheetObj.CellSearchValue(Row, "post_dt");
			if(ORG_BLOCK_DT == ""){
				sheetObj.SetCellValue(Row, "check_flag","1");
				return;
			}
			if(v_post_dt == v_org_post_dt){
				return;
			}
			v_post_dt=v_post_dt.substr(4, 2) + '-' + v_post_dt.substr(6, 2) + '-' + v_post_dt.substr(0, 4);
			v_org_post_dt=v_org_post_dt.substr(4, 2) + '-' + v_org_post_dt.substr(6, 2) + '-' + v_org_post_dt.substr(0, 4);
			//ORG_BLOCK_DT > v_post_dt
			if(compareTwoDate(NEXT_BLOCK_DT, v_post_dt)){
				sheetObj.SetCellText(Row, "post_dt",v_org_post_dt);
				sheetObj.SetCellValue(Row, "check_flag","0");
				alert(getLabel2('ACC_MSG119',new Array(ORG_BLOCK_DT)));
				sheetObj.SelectCell(Row, "post_dt");
			}else{
				sheetObj.SetCellValue(Row, "check_flag","1");
			}
		break;
		case "check_flag" :
			getObj('printBtn02').style.display="inline";
			//RIDER PRINT 체크
			if(sheetObj.GetCellValue(Row, "rider_yn") == "Y"){
				getObj('riderprintBtn02').style.display="inline";
				formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
				formObj.rider_yn.value="Y";
			}else{
				getObj('riderprintBtn02').style.display="none";
				formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
				formObj.rider_yn.value="N";
			}
			
			// 체크 버튼 속도 개선 oyh
			if(beforeChkNo != 0) {
				if (beforeChkNo == Row) {
					if(sheetObj.GetCellValue(Row, "check_flag") == "0") {
						sheetObj.SetCellValue(Row, "check_flag","0",0);
					} else {
						sheetObj.SetCellValue(Row, "check_flag","1",0);
					}
				} else {
					sheetObj.SetCellValue(beforeChkNo, "check_flag","0",0);
				}
			}
    		beforeChkNo=Row;

    	break;
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
	        cal.select(formObj.s_post_strdt,  formObj.s_post_enddt, 'MM-dd-yyyy');
	    break;
        case 'DATE2':    //달력 조회 팝업 호출      
        	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_deposit_strdt, formObj.s_deposit_enddt,  'MM-dd-yyyy');
        break;
        case 'DATE3':    //달력 조회 팝업 호출    
        	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_void_strdt,  formObj.s_void_enddt, 'MM-dd-yyyy');
	    break;
    }
}
function searchBlCmmInfo(){
	var formObj=document.frm1;
	if(formObj.s_hbl_no.value != "" || formObj.s_mbl_no.value != ""){
		ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.s_bl_no.value, './GateServlet.gsl');
	}
}
function enterBlCmmInfo(){
	var formObj=document.frm1;
	if(event.keyCode == 13){
		ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.s_bl_no.value, './GateServlet.gsl');
	}
}
function enterInvInfo(){
	var formObj=document.frm1;
	if(formObj.s_inv_no.value != ""){
		if(event.keyCode == 13){
			ajaxSendPost(getInvInfo, 'reqVal', '&goWhere=aj&bcKey=getInvInfo&s_inv_no='+formObj.s_inv_no.value, './GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN
 * BL_INFO를 가져온다.
 */
function getBlCmmInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				if(rtnArr[2] == "H"){
					frm1.s_hbl_no.value=rtnArr[1];
				}else if(rtnArr[2] == "M"){
					frm1.s_mbl_no.value=rtnArr[1];
				}
				frm1.f_intg_bl_seq.value=rtnArr[0];
				frm1.f_biz_clss_cd.value=rtnArr[2];
				frm1.f_air_sea_clss_cd.value=rtnArr[3];
				frm1.f_bnd_clss_cd.value=rtnArr[4];
				doWork("DEFAULT");
			}else{
				frm1.f_intg_bl_seq.value="";
				frm1.s_hbl_no.value="";
				frm1.s_mbl_no.value="";
				frm1.f_biz_clss_cd.value="";
				frm1.f_air_sea_clss_cd.value="";
				frm1.f_bnd_clss_cd.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
/**
 * AJAX RETURN
 * INVOICE_INFO를 가져온다.
 */
function getInvInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				frm1.s_inv_seq.value=rtnArr[0];
				frm1.s_inv_no.value=rtnArr[1];
				doWork("DEFAULT");
			}else{
				frm1.s_inv_seq.value="";
				frm1.s_inv_no.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].value="";
	  }           
	}
	formObj.s_post_strdt.value=FROMDATE;
	formObj.s_post_enddt.value=TODAY;

	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.s_ofc_cd);
	
	formObj.s_bank_cd[0].selected=true;
	formObj.s_void_yn[0].selected=true;
	formObj.s_print_yn[0].selected=true;
	formObj.s_block_yn[0].selected=true;
	sheetObj.RemoveAll();
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
		formObj.s_vendor_cd.value="";//trdp_cd  AS param1
		formObj.s_vendor_nm.value="";//eng_nm   AS param2
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
				formObj.s_vendor_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.s_vendor_nm.value=masterVals[3];		//eng_nm   AS param2
			}
		}else{
			if(CODETYPE =="BILLTO"){
				formObj.s_vendor_cd.value="";//trdp_cd  AS param1
				formObj.s_vendor_nm.value="";//eng_nm   AS param2
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
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
function setAmount(){
	var formObj=document.frm1;
	formObj.s_amt_to.value=formObj.s_amt_fr.value;
}
function entSearch(){
	if(event.keyCode == 13){
		doWork('SEARCHLIST');
	}
}
function formValidation(){
	if(!chkSearchCmprPrd(false, frm1.s_post_strdt, frm1.s_post_enddt)){
		return false;
	}	
	if(!chkSearchCmprPrd(false, frm1.s_deposit_strdt, frm1.s_deposit_enddt)){
		return false;
	}	
	if(!chkSearchCmprAmt(false, frm1.s_amt_fr, frm1.s_amt_to)){
		return false;
	}	
	return true;
}
//Calendar flag value
var firCalFlag=false;
var firAmtFlag=false;
function getBankChkForm(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			formObj.f_chk_form.value=doc[1];
		}else{
			formObj.f_chk_form.value="";
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
var ORG_BLOCK_DT=""; 		//MAX(BLOCK_DT)
var NEXT_BLOCK_DT="";    		//MAX(BLOCK_DT)+1
/** LHK, 20131025 #21734  [BINEX]Post Date Check 로직 적용
 *  File Block_dt 와 Post Date 체크, Post Date Set, BL 생성시 post date 에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
 **/
function setBlock_dt(){
	var formObj=document.frm1;
	//MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
 	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt', './GateServlet.gsl');
 	if(NEXT_BLOCK_DT != "") {
 		var nextBlockDtYMD=NEXT_BLOCK_DT.replaceAll("-", "");															//NEXT_BLOCK_DT  12-01-2013
			nextBlockDtYMD=nextBlockDtYMD.substring(4,8)+nextBlockDtYMD.substring(0,2)+nextBlockDtYMD.substring(2,4);	//nextBlockDtYMD 20131201
		var orgBlockDt=addDate('d', -1, nextBlockDtYMD, "");			
			ORG_BLOCK_DT=orgBlockDt.substring(4,6) + "-" + orgBlockDt.substring(6,8) + "-" + orgBlockDt.substring(0,4);
 	}
}
function getMaxBlockOrJnrNextDt(reqVal){
 	var doc=getAjaxMsgXML(reqVal);
 	if(doc[0]=='OK'){
 		if(typeof(doc[1])!='undefined'){
 			NEXT_BLOCK_DT=doc[1].substring(4,6) + "-" + doc[1].substring(6,8) + "-" + doc[1].substring(0,4);
 		}else{
			NEXT_BLOCK_DT="";
		}
 	}
}

function getJnrVoidInfo(reqVal){
	jnrVoidflag = '';
	var doc = getAjaxMsgXML(reqVal);
//		alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			jnrVoidflag = doc[1];
		}
	}
}

function CUSTOMER_POPLIST(rtnVal){
	var formObj = document.frm1;
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry = rtnVal.split("|");
		formObj.s_vendor_cd.value = rtnValAry[0];//full_nm
		formObj.s_vendor_nm.value = rtnValAry[2];//full_nm
	}       
}

//GL View Table Data Create LKH 2015.02.25 Start
function setGlDataCreate(arg){
	//if(confirm(getLabel('FMS_COM_CFMCRE'))){
		var formObj=document.frm1;
		doShowProcess();		
		var type_clss_cd = 'GL_DATA_CREATE';
		ajaxSendPostAsync(rtnAjaxFunction, 'reqVal', '&goWhere=aj&bcKey=setGlDataCreate&f_usrId='+formObj.user_id.value+'&f_type_clss_cd='+type_clss_cd, './GateServlet.gsl');
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


function getStatus(row){
	var sheetObj=docObjects[0];
	if (sheetObj.GetCellValue(row, "trdp_nm") == changeValue){
		return false;
	}else{
		return true;
	}
}


function setGridOfcBlckFlg(){ 
 
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	/*
	 * Deposit Lv2, Payment Lv2 List 화면에서 TB_JNR_MST.LEVEL 이 2 이고 TB_JNR_MST.OFC_BLCK_FLG 가 '3' 인 경우는
		Chk, Date 는 Disable 하고, Check No. 이후 부터 Amount 를 제외하고 모두 ***** 처리 해주세요.
	 */
	var ofc_cd =  formObj.ofc_cd.value; 
	var apo_flg =  formObj.apo_flg.value;  
//alert(apo_flg);
 	if (apo_flg == "N"){
		for(var i=1; i<=sheetObj.LastRow();i++){
			
			var level_value = sheetObj.GetCellValue(i, "level_value");
			var ofc_blck_flg = sheetObj.GetCellValue(i, "ofc_blck_flg");
			var p_ofc_cd = sheetObj.GetCellValue(i, "p_ofc_cd");
			var change = false;
			
			//alert("level_value "+ level_value + " ofc_blck_flg"+ofc_blck_flg + " ofc_cd"+ofc_cd +" p_ofc_cd"+p_ofc_cd);
			//기존 블럭에 라벨권한 추가 2016.03.25
			if(level_value == 2 && ofc_blck_flg >= 2 && ofc_cd != p_ofc_cd){
				change = true;
			} else if(level_value == 3 && ofc_blck_flg == 3 && ofc_cd != p_ofc_cd){
				change = true;
			} 			
					
			if (change == true){
				sheetObj.SetCellEditable(i, "check_flag",0);
				sheetObj.SetCellEditable(i, "post_dt",0);
				sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
				
				//sheetObj.SetCellValue(i, "chk_no",changeValue);
				sheetObj.SetCellValue(i, "trdp_nm",changeValue);
				sheetObj.SetCellValue(i, "bank_nm",changeValue);
				sheetObj.SetCellValue(i, "curr_cd",changeValue);
				sheetObj.SetCellValue(i, "clr_dt","");
				sheetObj.SetCellValue(i, "void_yn",changeValue);
				sheetObj.SetCellValue(i, "void_dt","");
				sheetObj.SetCellValue(i, "chk_pnt_yn",changeValue);
				sheetObj.SetCellValue(i, "rider_yn",changeValue);
				sheetObj.SetCellValue(i, "block",changeValue);
				sheetObj.SetCellValue(i, "rgst_usrid",changeValue);
				sheetObj.SetCellValue(i, "rmk",changeValue);
				
			}else{
				
			} 
		}
 	}

}
