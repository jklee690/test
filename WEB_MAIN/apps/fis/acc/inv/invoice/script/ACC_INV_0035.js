/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_INV_0035.js
*@FileTitle  : AR Expense
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/20
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

var SLIP_POST_DT="";
var ORG_BLOCK_POST_DT=""; //MAX(BLOCK_DT)
var BLOCK_POST_DT="";    // MAX(BLOCK_DT)+1
var use_flg=false;
var isSheetValChanged=false;
var isInputFormValChanged=false;
var isInvNoDupChk=false;
//Retrieve시 취득한 Row갯수(Delete체크 로직에서 시트의 Row로만 체크하기때문에 추가함)
var retCnt=0;
var isInvModiTmsOk=false; 
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
		    frm1.f_cmd.value=-1;
	        formObj.submit();
	   break;
       case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            docObjects[0].DoSearch("./ACC_INV_0035GS.clt", FormQueryString(formObj) );
            //조회후 
            // 동기화 문제 때문에 searchEnd에서 실행
//            retCnt=docObjects[0].RowCount();
       break;
       case "ROWADD":
    	   if(sheetObj.GetCellValue(sheetObj.LastRow(), "frt_term_cd") == ""){
    	    	sheetObj.RemoveAll();
    	    }
    	   var intRows=sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);
            sheetObj.SetCellValue(intRows, "sls_ofc_cd",formObj.f_ofc_cd.value);
            sheetObj.SetCellValue(intRows, "frt_term_cd","PP");
            sheetObj.SetCellEditable(intRows, "frt_check",1);
        	sheetObj.SetCellValue(intRows, "frt_check","1");
        	sheetObj.SetCellValue(intRows, "qty","1");
        	if (intRows > 2) {
        		// 기존에 등록된 데이터가 있는경우
				sheetObj.SetCellValue(intRows, "rat_curr_cd",sheetObj.GetCellValue(intRows-1, "rat_curr_cd"));
				sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",sheetObj.GetCellValue(intRows-1, "inv_aply_curr_cd"));
				sheetObj.SetCellValue(intRows, "inv_xcrt",sheetObj.GetCellValue(intRows-1, "inv_xcrt"));
        	} else {
        		// 신규로 등록하는 경우
        		sheetObj.SetCellValue(intRows, "rat_curr_cd",formObj.f_curr_cd.value);
            	sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",formObj.f_curr_cd.value);
        		sheetObj.SetCellValue(intRows, "inv_xcrt",1);
        	}
            retCnt++;
       break;
       case "MODIFY":	//등록
           //데이터 조회 후 생성하지 않았을 경우 경고 메세지
       	   if(formObj.f_inv_seq.value != ""){
       		   ajaxSendPost(getInvModiTms, 'reqVal', '&goWhere=aj&bcKey=searchInvModiTms&inv_seq='+formObj.f_inv_seq.value, './GateServlet.gsl');
       		  if (isInvModiTmsOk) {
       			  // 인보이스가 변경된 경우
          		   alert(getLabel('ACC_MSG128')); 
          		   return;
       		  }
	       }
    	   //그리드 전체삭제시 invoice 를 삭제한다.
    	   if(!checkDelete()){
    		   doWork("DELETE");
    	   }else{
    		   frm1.f_cmd.value=MODIFY;
               //필수항목체크
               if(checkVal()){
        		   if (retCnt == 0){
        			   alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_BILLINGINFO'));
        			   return;
        		   }
        		   // 권한에 의한 수정이 있으면 amount체크와 post_dt의 세팅이필요.
	       		   //TODO  아무 권한이 없을때 POST_DT를 넣어야 하는지 BLOCK_DT를 넣어야 하는지에 따라 이하의 값 설정 필요
	       		   //formObj.f_edit_post_dt.value = formObj.f_post_dt.value;
	       		   //formObj.f_edit_post_dt.value =addDay(formObj.block_post.value, 1);
        		   // FRT에 저장되는 Today는 이제  MAX(Block_dt)+1
	       		   //formObj.f_today_dt.value =addDay(formObj.block_post.value, 1);
        		   //LHK, Row ADD 된 경우 block 인 경우만 적용될 Invoce Date 를 f_today_dt 에 Set 한다.
        		   //post date 도 변경가능하기 때문에 BLOCK_POST_DT 와 비교하여 큰 값을 f_today_dt set
	       			if(BLOCK_POST_DT != "" && compareTwoDate(BLOCK_POST_DT, formObj.f_post_dt.value)){
        			   formObj.f_today_dt.value=BLOCK_POST_DT;
        		   }else{
        			   formObj.f_today_dt.value=formObj.f_post_dt.value;
        		   }
			 	   // Deposit/Payment 이후 수정시 Amout금액 체크
			 	   if (isSheetValChanged) {
			 		  
			 		   //LHK 20140327, amount due 가 - 인 경우 비교로직 추가.
					   var amtDue = parseFloat(eval((formObj.f_amt_due.value).replaceAll(",","")));
			 		   var totAmt = parseFloat(eval((formObj.f_totamt_tot.value).replaceAll(",","")));
			 		   var paidAmt = parseFloat(eval((formObj.f_paid_amt.value).replaceAll(",","")));
			 		   
	        		   var amtComFlg	= false;
	        		   
	         		   if (paidAmt != 0){
	    	    		   if(amtDue < 0){
	    	    			   if (Math.abs(totAmt) < Math.abs(paidAmt)) {
	    	    				   amtComFlg	=	true;
	    	    			   }	   
	    	  			   }else{
	    	  				   if (totAmt < paidAmt) {
	    	  					   amtComFlg	=	true;
	    	  				   }
	    	  			   }
	    			   }

	        		   if (amtComFlg) {
	        			   alert(getLabel('ACC_MSG118'));
	        			   return;
	        		   }
			 		   
			 		   // Edit_post_dt의 값은 MAX(Block_DT)+1
			 		   //formObj.f_edit_post_dt.value =addDay(formObj.block_post.value, 1);
			 	   } 
	        	   // File Block 이후 수정시 Post Date 체크 => post date를 변경시에 체크하도록 변경
	        	   /*
			 	   if (isInputFormValChanged) {
						var blockDt=sheetObj.GetCellValue(2, "block_dt");
			 		   var blockDtPrn=blockDt.substr(0,2)+"/" + blockDt.substr(2,2)+ "/" + blockDt.substr(4,4);
			 		   var curPostDt=(formObj.f_post_dt.value).replaceAll("-","");
			 		   if (!checkPostDt()) {
			 			   alert(getLabel2('ACC_MSG119',new Array(blockDtPrn)));
			 			   return;
			 		   }
			 	   }
			 	   */
			 	   // 권한에 의한 수정이 아니면 paid amt를 체크한다
			 	   if (!isSheetValChanged && !isInputFormValChanged) {
			 		   // -----[20130401 OJG]-----
			 		   if (frm1.f_inv_seq.value != '') {
			 			   bPaid=false;
			 			   ajaxSendPost(getInvoicePayAmt, 'reqVal', '&goWhere=aj&bcKey=getInvoicePayAmt&inv_seq=' + frm1.f_inv_seq.value, './GateServlet.gsl');
			 			   if (bPaid) {
			 				   //execPaidMagam();
			 				   // doWork("SEARCHLIST");
			 				   // return;
			 				   for ( var i=2; i <= sheetObj.LastRow(); i++) {
			 					   if (sheetObj.GetCellValue(i, "ibflag") != 'I') {
			 						   sheetObj.SetCellValue(i, "ibflag",'R');
			 						   sheetObj.SetCellValue(i, "del_chk",0);
			 						   sheetObj.SetRowEditable(i,0);
			 					   }
			 				   }
			 			   }
			 		   }
			 		   //-----[20130401 OJG]-----
			 		   // 마감일때 POST_DT 는 오늘일자로 셋팅한다. =>  MAX(BLOCK_DT)+1로 수정
			 		   if (formObj.f_clt_cmpl_flg.value == "Y") {
			 			   //formObj.f_today_dt.value = TODAY;
			 			   formObj.f_today_dt.value=addDay(formObj.block_post.value, 1);
			 		   }
			 	   }
			 	  /**********    Duplication check      ********************/    
			 	  checkInvNoDup();			 	  
			 	  if(isInvNoDupChk){
		 				return;
			 	  } else {
			 		  chrMsgTxt=getLabel('FMS_COM_CFMSAV');
			 	  }
			 	  // 사용후 초기화 
			 	  isInvNoDupChk=false; 
			 	 /************************************************************/   
			 	  if (confirm(chrMsgTxt)) {
			 		// 다시한번 널 체크 한다.
	           			if(formObj.f_inv_dt.value == ""){
	           				//[Invoice Date] is mandatory field.
	           				alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('FMS_COD_INVOICEDT'));
	           				
	           				formObj.f_inv_dt.focus();
	           				return false;
	           			}
	           		   
	           		   if (formObj.f_due_dt.value =='') {
	           			   //[Due Date] is mandatory field.
	           			   alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('FMS_COD_DUEDT'));
	           			   
	           			   formObj.f_due_dt.focus();
	           			   return false;
	           		   }
	           		   
				 	  calcFrgnAmt();
				 	  //------------[20140112 OJG] 총 금액이 0일 경우에는 0 Check 타지 않음 -------------------
				 	  if(eval(removeComma(formObj.f_totamt_tot.value)) != 0){
	           			  isZeroAmt();
	           		  }
	           		  //------------[20140112 OJG]-------------------------------------------------
//				 	  if(formObj.f_buy_inv_rcv.checked){
//	           			  formObj.f_buy_inv_rcv.value == "Y";
//	           		  }
	           		  if(formObj.f_tax_bill.checked){
	   	           		  formObj.f_tax_bill.value="Y";
	   	           	  }
	               	  formObj.f_amt_tot.value=removeComma(formObj.f_amt_tot.value);
	   	           	  formObj.f_vatamt_tot.value=removeComma(formObj.f_vatamt_tot.value);
	   	           	  formObj.f_totamt_tot.value=removeComma(formObj.f_totamt_tot.value);
	   	           	  formObj.f_paid_amt.value=removeComma(formObj.f_paid_amt.value);
	   	           	  var sht2=sheetObj2.GetSaveString(false);		//Bill Collecting List
	   	           	  var intRows2 = sheetObj2.LastRow() + 1;
	    	          sheetObj2.DataInsert(intRows2);
	    	          sheetObj.DoAllSave("./ACC_INV_0035GS.clt", FormQueryString(formObj)+'&'+sht2, true);
			 	  }
               }
    	   }
       break;
       case "DELETE":	//삭제
           //데이터 조회 후 생성하지 않았을 경우 경고 메세지
       	   if(formObj.f_inv_seq.value != ""){
       		   ajaxSendPost(getInvModiTms, 'reqVal', '&goWhere=aj&bcKey=searchInvModiTms&inv_seq='+formObj.f_inv_seq.value, './GateServlet.gsl');
       		  if (isInvModiTmsOk) {
       			  // 인보이스가 변경된 경우
          		   alert(getLabel('ACC_MSG128')); 
          		   return;
       		  }
	       }
    	   if(frm1.f_inv_seq.value != ""){
    		   
    		   bPaid = false;
 			   ajaxSendPost(getDeleteInvoicePayAmt, 'reqVal', '&goWhere=aj&bcKey=getInvoicePayAmt&inv_seq=' + frm1.f_inv_seq.value, './GateServlet.gsl');
 			   if (bPaid) {
 				   return;
 			   }
    		   
    		   frm1.f_cmd.value=REMOVE;
               if(confirm(getLabel('FMS_COM_CFMDEL'))){
            	   for(var i=2; i<=sheetObj.LastRow(); i++){
            		   sheetObj.SetCellValue(i,"ibflag","D");
            	   }
            	   formObj.f_amt_tot.value=removeComma(formObj.f_amt_tot.value);
	           	   formObj.f_vatamt_tot.value=removeComma(formObj.f_vatamt_tot.value);
	           	   formObj.f_totamt_tot.value=removeComma(formObj.f_totamt_tot.value);
            	   sheetObj.DoSave("ACC_INV_0035GS.clt", FormQueryString(formObj),"ibflag",false);
            	   //화면초기화
            	   clearAll();
               }
        	   // retCnt를 초기화한다.           
        	   retCnt=0;
    	   }
       break;
       case "COPY":	//COPY
	       //필수항목체크
    	   
    	   // List에서 Copy 버튼 클릭시엔 CheckVal함수를 안타도록
    	   if (formObj.do_copy.value != "Y"){
		       if(checkVal()){
				   if (retCnt == 0){
					   alert(getLabel('FMS_COM_ALT007'));
					   return;
				   }
		       }
    	   } 
    	   
    	   if(frm1.f_inv_seq.value != ""){
    		   var sheetObj=docObjects[0];
    		   var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
    		   for(var i=0; i<collTxt.length; i++){
    			   if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
    				   if(collTxt[i].name == "f_vendor_cd" || collTxt[i].name == "f_vendor_nm" ||
    				       collTxt[i].name == "f_inv_no" || collTxt[i].name == "f_post_dt" ||
    				       collTxt[i].name == "f_inv_dt" || collTxt[i].name == "f_term_dt" ||
    				       collTxt[i].name == "f_due_dt"){
    					   collTxt[i].className="search_form";
    					   collTxt[i].readOnly=false;
    				   }
    			   }
    		   }
//    		   frm1.f_buy_inv_rcv.disabled = false;
    		   frm1.f_terms.disabled=false;
    		   frm1.f_curr_cd.disabled=false;
    		   frm1.f_remark.disabled=false;
    		   frm1.f_vendor_cd.onblur=function(){codeNameAction('VENDOR',this, 'onBlur');};
    		   //frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);calcCreateTerms();};
    		   frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);changeInvDt();};
    		   frm1.f_term_dt.onblur=function(){calcCreateTerms();};
    		   frm1.f_inv_seq.value="";
    		   frm1.temp_inv_no.value="";
    		   frm1.f_amt_due.value="";
    		   frm1.f_paid_amt.value="";
    		   frm1.f_last_ck.value="";
    		   frm1.f_last_paid_dt_cal.value="";
    		   frm1.f_inv_no.value="";
    		   if(formObj.slip_post.value != ""){
    			   temp_slip_dt=formObj.slip_post.value;
    			   slip_dt=temp_slip_dt.substring(4,8)+temp_slip_dt.substring(0,2)+temp_slip_dt.substring(2,4);
    			   temp_today_dt=TODAY.replaceAll("-","");
    			   today_dt=temp_today_dt.substring(4,8)+temp_today_dt.substring(0,2)+temp_today_dt.substring(2,4);
    			   if(today_dt > slip_dt){
    				   frm1.f_post_dt.value=TODAY;
    				   if(frm1.f_terms[0].selected){
    					   frm1.f_due_dt.value=TODAY;
    				   }
    			   }else{
    				   frm1.f_post_dt.value=addDay(formObj.slip_post.value, 1);
    				   if(frm1.f_terms[0].selected){
    					   frm1.f_due_dt.value=addDay(formObj.slip_post.value, 1);
    				   }
    			   }
    		   }else{
    			   frm1.f_post_dt.value=TODAY;
    			   if(frm1.f_terms[0].selected){
					   frm1.f_due_dt.value=TODAY;
				   }
    		   }
    		   frm1.f_clt_cmpl_flg.value="";
    		   frm1.f_post_dt.focus();
    		   frm1.f_post_dt.blur();
    		   frm1.f_vendor_cd.focus();
    		   frm1.f_vendor_cd.blur();
    		   for(var i=2; i<=sheetObj.LastRow();i++){
    			   sheetObj.SetCellEditable(i, "frt_check",1);
    			   sheetObj.SetColBackColor("frt_check","#FFFFFF");
    			   sheetObj.SetCellValue(i, "frt_check","1");
    			   sheetObj.SetCellValue(i, "frt_seq","");
    			   sheetObj.SetCellValue(i, "inv_seq","");
    			   sheetObj.SetCellValue(i, "inv_no","");
    			   sheetObj.SetCellValue(i, "inv_dt","");
    			   sheetObj.SetCellValue(i, "inv_post_dt","");
    			   sheetObj.SetCellValue(i, "inv_due_dt","");
    			   sheetObj.SetCellValue(i, "last_pay_dt","");
    			   sheetObj.SetCellValue(i, "inv_trdp_cd","");
    			   sheetObj.SetCellValue(i, "inv_trdp_cd_nm","");
    			   sheetObj.SetCellValue(i, "inv_no","");
    			   sheetObj.SetCellValue(i, "oth_seq","");
    			   sheetObj.SetCellValue(i, "last_chk_no","");
    			   sheetObj.SetCellValue(i, "inv_bal_amt","");
    			   sheetObj.SetCellValue(i, "inv_pay_amt","");
    			   sheetObj.SetCellValue(i, "inco_cd","");
    			   sheetObj.SetCellValue(i, "inv_aply_curr_cd","");
    			   sheetObj.SetCellValue(i, "clt_cmpl_flg","");
//    			   sheetObj.CellValue(i, "buy_inv_rcv") 	= "";
    			   sheetObj.SetCellValue(i, "tax_bil_flg","");
    			   sheetObj.SetCellValue(i, "ibflag","I");
    			   //그리드 활성화
    			   sheetObj.SetRowEditable(i,1);
    		   }
    		   frm1.f_inv_no.select();
    	   }
       break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.f_vendor_nm.value;
	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	break;
        case "INV_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary=new Array(1);
			rtnary[0]="S";
			
			callBackFunc = "INV_POPLIST";
	   		modal_center_open('./CMM_POP_0240.clt', rtnary, 756,480,"yes");
	   		
		break;
        case 'PRINT':
     	    formObj.file_name.value='invoice_06.mrd';
     	    formObj.title.value='INVOICE';
       		formObj.mailTitle.value='INVOICE';
			//Parameter Setting
        	var param='[' + formObj.f_email.value + ']';				// USER EMAIL';	[1]
        	param += "[" + "'" + formObj.f_inv_seq.value + "'" + ']';	// [2]
			param += '[]';												// [3]
			param += '[]';												// [4]
			param += '[]';												// [5]
			param += '[]';												// [6]
			param += '[' + formObj.f_vendor_cd.value + ']';				// BILL_TO [7]
			param += '[' + formObj.f_ref_ofc_cd.value + ']';			// REF_OFC_CD  [8]
			param += '[' + formObj.bl_cnt_cd.value + ']';				// CNT_CD  [9]  f_bl_cnt_cd
			param += '[' + formObj.f_usr_nm.value + ']';				// USER_NM [10]
			param += '[' + formObj.f_usrPhn.value + ']';				// 11
			param += '[' + formObj.f_usrFax.value + ']';				// 12
			param += '[' + formObj.f_usrId.value + ']';					// 13
			param += '[]';												// 14 main_trdp
			param += '[]';												// 15  f_hbl_no
			formObj.rd_param.value=param;
			formObj.mailTitle.value='Invoice No : ' + formObj.f_inv_no.value;
     		var trdp_cd='';
     		trdp_cd += '(' + '\'' + formObj.f_vendor_cd.value + '\'' + ')';
     		ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
     		formObj.mailTo.value=mailTo;
			formObj.rpt_biz_tp.value="ACCT";
			formObj.rpt_biz_sub_tp.value="GA";
			formObj.rpt_trdp_cd.value=formObj.f_vendor_cd.value;
			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
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
	// 체크로직의 변경 SLIP DATE => BLOCK DATE
	//File Block_dt 와 Post Date 체크
	//LHK, 20131016 Post Date Set, Invoice 생성 전에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set 한다. 
	//LHK, POST DATE 변경시 BLOCK_POST_DT 비교, BLOCK_POST_DT 보다 POST DATE가 커야함. 
	setBLOCK_POST_DT();
	if(formObj.f_inv_seq.value == ""){
		var tempPostDt="";
		var tempBlockDt=BLOCK_POST_DT;
		if(BLOCK_POST_DT == ""){
			tempPostDt=TODAY;
    	}else{
    		if(!compareTwoDate(BLOCK_POST_DT, TODAY)){
    			tempPostDt=TODAY;
    		}else{
    			tempPostDt=BLOCK_POST_DT;
    		}
    	}
		
		//LHK, 인보이스 생성시 BLOCK_POST_DT 를 기본 date 를 설정
    	formObj.f_post_dt.value=tempPostDt;
		formObj.f_inv_dt.value=tempPostDt;
		formObj.old_post_dt.value=tempPostDt;
		formObj.f_today_dt.value=tempPostDt;
		
		formObj.f_vendor_cd.focus();
		formObj.f_vendor_cd.blur();
	}
	/*
	// 체크로직의 변경 SLIP DATE => BLOCK DATE
	//File Block_dt 와 Post Date 체크
	var bl_post=(formObj.f_post_dt.value).replaceAll("-","");
	var block_post=formObj.block_post.value;
	if(bl_post != "" && block_post != "") {
		bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
		block_post=block_post.substring(4,8)+block_post.substring(0,2)+block_post.substring(2,4);
		if(block_post >= bl_post){
			BLOCK_POST_DT=addDay(formObj.block_post.value, 1);
			formObj.f_post_dt.value=BLOCK_POST_DT;
			formObj.f_inv_dt.value=BLOCK_POST_DT;
			formObj.old_post_dt.value=BLOCK_POST_DT;
			formObj.f_today_dt.value=BLOCK_POST_DT;
		}else{
			BLOCK_POST_DT="";
		}
	}
	*/
/*	// BL의 POST DATE가 SLIP의 MAX(POST_DT) 보다 작으면.. MAX(POST_DT) + 1 로 셋팅한다.
	var bl_post=formObj.f_post_dt.value;
	var slip_post=formObj.slip_post.value;
	if(formObj.f_inv_seq.value == ""){
		if(bl_post != "" && slip_post != ""){
			bl_post=bl_post.replaceAll("-","");
			bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
			slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
			if(slip_post >= bl_post){
				SLIP_POST_DT=addDay(formObj.slip_post.value, 1);
				formObj.f_post_dt.value=SLIP_POST_DT;
				formObj.f_inv_dt.value=SLIP_POST_DT;
				formObj.old_post_dt.value=TODAY;
			}else{
				SLIP_POST_DT="";
			}
		}
	}*/
	//TAX_BILL 을 SEOUL만 활성화 한다.
	if(formObj.f_ofc_cd.value == "SEL"){
		formObj.f_tax_bill.disabled=false;
	}
	if(formObj.f_inv_seq.value != ""){
		formObj.s_inv_no.value=formObj.temp_inv_no.value;
		doWork("SEARCHLIST");
	}
	// COMPANY의 CUSTMIZE값을 판단하여 Department항목을 보여준다.(SCAC_CD == "AVNF")
	var scac_cd=frm1.scac_cd.value;
	if (scac_cd == "AVNF"){
		use_flg=true;
		getObj("dept_cd").style.display = 'inline';
	}
	if(formObj.do_copy.value == "Y"){
		doWork("COPY");
	}
	// #20443 [BINEX] User Access control rule
	/* 1. Paid Amount > 0 일때
	 *  EDIT INVOICES AFTER DEPOSIT/PAYMENT 권한이 있을때  - sheet 값 변경 가능
	 *  EDIT INVOICES AFTER DEPOSIT/PAYMENT 권한이 없을때  - sheet 값 변경 불가
	 *  
	 * 2. File 이 Block 된 상태일때 (CLT_CFM_FLG = 'Y')
	 *  EDIT INVOICES AFTER FILE BLOCK 권한이 있을때 
	 *  	TB_INV_DTL. CLT_CMPL_FLG = ‘Y’ 
	 *  	and ISNULL(TB_INV_DTL.JNR_YN,’’) <> ‘Y’ 
	 *  	and ISNULL(TB_INV_DTL.CLS_YN,’’) <> ‘Y’ 
	 *   조건에 해당하면 입력 폼 값 수정가능     	  
	 *   
	 * EDIT INVOICES AFTER DEPOSIT/PAYMENT 권한 = dp_flg
	 * EDIT INVOICES AFTER FILE BLOCK 권한 = fb_flg
	*/
	// LHK, 최종 Load 후에 권한 체크하여 화면 control 함
	//authControl();
}
 function authControl(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	// 1.Paid Amount 값이 >0 인지 체크
	var paidAmtYn = parseFloat(eval((formObj.f_paid_amt.value).replaceAll(",",""))) > 0?true:false;
	var fileBolckYn=sheetObj.GetCellValue(2, "clt_cmpl_flg") == "Y"?true:false;
	var jrnYn=sheetObj.GetCellValue(2, "jnr_yn");
	var clsYn=sheetObj.GetCellValue(2, "cls_yn");
	
	//if (paidAmtYn) {
		if (!fileBolckYn && formObj.dp_flg.value == "Y") {
			editSheet(true);
		} 
	//}
		//	if (fileBolckYn) {
		if (formObj.fb_flg.value == "Y" && jrnYn != "Y" && clsYn !="Y") {
			//editInputForm(true);
			//editSheet(true);
			
			if(paidAmtYn == "N"){
				editInputForm(true);
				editSheet(true);
			}else{
				if(formObj.dp_flg.value == "Y"){
					editInputForm(true);
					editSheet(true);
				}
			}
		} 
		//	}
	/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.13 */
	if (jrnYn == "Y" || clsYn =="Y") {
		editInputForm(false);
		editSheet(false);
	} 		
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
			if(collTxt[i].name == "f_agent_cd" || collTxt[i].name == "f_agent_nm" ||
					collTxt[i].name == "f_agent_ref_no" || collTxt[i].name == "f_profit_share" ||
					collTxt[i].name == "f_vendor_cd" || collTxt[i].name == "f_vendor_nm" ||
					collTxt[i].name == "f_inv_no" || collTxt[i].name == "f_post_dt" ||
					collTxt[i].name == "f_inv_dt" || collTxt[i].name == "f_term_dt" ||
					collTxt[i].name == "f_due_dt" || collTxt[i].name == "f_last_paid_dt_cal" ||
					collTxt[i].name == "s_bl_no" || collTxt[i].name == "s_ref_no" ||
					collTxt[i].name == "s_oth_no" || collTxt[i].name == "s_inv_no" ) {
				collTxt[i].className="search_form";
				collTxt[i].readOnly=!flg;
			}
		}           
	}
	frm1.f_terms.disabled=!flg;
	frm1.f_curr_cd.disabled=!flg;
	frm1.f_remark.disabled=!flg;
	frm1.f_dept_cd.disabled=!flg;
//	frm1.f_buy_inv_rcv.disabled = !flg;
	if (flg) {
		getObj("btnModify").style.display="inline";
		frm1.billto.onclick=function(){doWork("CUSTOMER_POPLIST");};
		frm1.billto.style.cursor="hand";
		//frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);calcCreateTerms();};
		frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);changeInvDt();};
		frm1.f_term_dt.onblur=function(){calcCreateTerms();};
		frm1.f_post_dt_cal.onclick=function(){doDisplay('DATE1', frm1);};
		frm1.f_inv_dt_cal.onclick=function(){doDisplay('DATE2', frm1);};
		frm1.f_due_dt_cal.onclick=function(){doDisplay('DATE3', frm1);};
	} else {
		getObj("btnModify").style.display="none";
		frm1.billto.onclick="";
		frm1.billto.style.cursor="";
		frm1.f_inv_dt.onblur="";
		frm1.f_term_dt.onblur="";
		frm1.f_post_dt_cal.onclick="";
		frm1.f_inv_dt_cal.onclick="";
		frm1.f_due_dt_cal.onclick="";
	}
	// Post Date 체크를 위해
	isInputFormValChanged=flg;
}
/**
 * Sheet 의 수정을 가능/불가 하게 한다
 */
function editSheet(flg){
	var sheetObj=docObjects[0];
	// Row Add 버튼 보이기/숨기기
	if (flg) {
		getObj("btnModify").style.display="inline";
//		deleteBtn1.style.display="inline";
		//getObj("deleteBtn2").style.display="inline";
//		getObj("btnDelete").style.display="inline";
//		addrowBtn1.style.display="inline";
		//getObj("rowAddBtn2").style.display="inline";
	} else {
		getObj("btnModify").style.display="none";
//		deleteBtn1.style.display="none";
		getObj("deleteBtn2").style.display="none";
//		btnDelete.style.display="none";
//		addrowBtn1.style.display="none";
		getObj("rowAddBtn2").style.display="none";		
	}
	// sheet edit 가능/불가
	sheetObj.SetEditable(flg);
	sheetObj.RenderSheet(2);
	
	for ( var i=2; i <= sheetObj.LastRow(); i++) {
		var frt_check_flg = sheetObj.GetCellEditable(i,"frt_check");
		
		sheetObj.SetRowEditable(i,flg);
		
		if (flg) {
			sheetObj.SetCellEditable(i,"frt_check",frt_check_flg);
		}
	}
	// Amout 체크를 위해
	isSheetValChanged=flg;
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
        	       var headers = [ { Text:getLabel('ACC_INV_0035_HDR_1'), Align:"Center"},
        	                   { Text:getLabel('ACC_INV_0035_HDR_2'), Align:"Center"} ];
        	       InitHeaders(headers, info);
        	       var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, HeaderCheck:0 },
        	              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"frt_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"CheckBox",  Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"frt_check",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, HeaderCheck:0 },
        	              {Type:"Combo",     Hidden:0, Width:350,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:0,  Width:500,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
        	              // 2014.07.29 LSY add
        	              {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sls_ofc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"frt_term_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"aply_ut_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"qty",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"ru",                KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"trf_cur_sum_amt",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"rat_curr_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"inv_xcrt_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"inv_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	              {Type:"Float",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
        	              {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"vat_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
        	              {Type:"Float",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"inv_vat_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_due_dt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_pay_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"oth_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_chk_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_bal_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_pay_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inco_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"buy_inv_rcv",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"tax_bil_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"ref_ofc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"jnr_yn",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"jnr_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cls_yn",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cls_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"block_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"frt_inv_post_dt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"acc_dept_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"modi_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"bl_cnt_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
        	       InitColumns(cols);
        	       SetEditable(1);
        	       SetHeaderRowHeight(20);
        	       SetHeaderRowHeight(21);
        	       SetSheetHeight(200);
        	       SetColProperty('frt_cd', {ComboText:FRTCD2, ComboCode:FRTCD1} );
              	   SetColProperty('cntr_tpsz_cd', {ComboText:TPSZ1, ComboCode:TPSZ1} );
              	   SetColProperty('aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
              	   SetColProperty('frt_term_cd', {ComboText:"PP|CC", ComboCode:"PP|CC"} );
              	   // 2014.07.29 LSY add
              	   SetColProperty('sls_ofc_cd', {ComboText:OFCCD1, ComboCode:OFCCD2} );
              	   resizeSheet();
              	   
              	   InitComboNoMatchText(1,"",1); 
           }
           break;
         case 2:      //IBSheet2 init
             with (sheetObj) {
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
	ComResizeSheet(docObjects[0], 100);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	
	retCnt=docObjects[0].RowCount();
	
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	//formObj.f_inv_seq.value = sheetObj.CellValue(2,"inv_seq");
	
if(sheetObj.GetCellValue(2,"inv_seq") != "-1" && sheetObj.GetCellValue(2,"inv_seq") != ""){
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		for(var i=2; i<=sheetObj.LastRow();i++){
			sheetObj.SetCellEditable(i, "frt_check",0);
			sheetObj.SetColBackColor(2,"#EFEBEF");
			/*
			formObj.f_amt_tot.value=Number(formObj.f_amt_tot.value) + Number(sheetObj.GetCellValue(i,"inv_amt"));
			formObj.f_vatamt_tot.value=Number(formObj.f_vatamt_tot.value) + Number(sheetObj.GetCellValue(i,"inv_vat_amt"));
			formObj.f_totamt_tot.value=Number(formObj.f_totamt_tot.value) + Number(sheetObj.GetCellValue(i,"inv_sum_amt"));
			*/
			amt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_amt"));
			vatamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_vat_amt"));
			totamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
			//TB_TRDP에 저장하기 위해 OLD_SUM값을 저장한다.
			formObj.f_old_sum_amt.value=formObj.f_totamt_tot.value;
		}
		formObj.f_modi_tms.value=sheetObj.GetCellValue(2, "modi_tms");
		formObj.f_amt_tot.value=parseFloat(amt_tot).toFixed(2);
		formObj.f_vatamt_tot.value=parseFloat(vatamt_tot).toFixed(2);
		formObj.f_totamt_tot.value=parseFloat(totamt_tot).toFixed(2);
		formObj.s_inv_no.value=sheetObj.GetCellValue(2,"inv_no");
		formObj.f_vendor_cd.value=sheetObj.GetCellValue(2, "inv_trdp_cd");
		formObj.f_vendor_nm.value=sheetObj.GetCellValue(2, "inv_trdp_cd_nm");
		formObj.f_remark.value=sheetObj.GetCellValue(2, "inv_rmk");
		formObj.f_inv_no.value=sheetObj.GetCellValue(2, "inv_no");
		formObj.f_amt_due.value=doMoneyFmt(sheetObj.GetCellValue(2, "inv_bal_amt"));
		formObj.f_paid_amt.value=doMoneyFmt(sheetObj.GetCellValue(2, "inv_pay_amt"));
		formObj.f_last_ck.value=sheetObj.GetCellValue(2, "last_chk_no");
		formObj.f_dept_cd.value=sheetObj.GetCellValue(2, "acc_dept_cd");
		formObj.f_ofc_cd.value=sheetObj.GetCellValue(2, "ofc_cd");
		formObj.bl_cnt_cd.value=sheetObj.GetCellValue(2, "bl_cnt_cd");
		var post_dt=sheetObj.GetCellValue(2, "inv_post_dt");
		var inv_dt=sheetObj.GetCellValue(2, "inv_dt");
		var due_dt=sheetObj.GetCellValue(2, "inv_due_dt");
		var last_paid_dt=sheetObj.GetCellValue(2, "last_pay_dt");
		if(post_dt != ""){
			formObj.f_post_dt.value=post_dt.substring(0,2) 	  + "-" + post_dt.substring(2,4) 	  + "-" + post_dt.substring(4,8);
			formObj.old_post_dt.value=post_dt.substring(0,2) 	  + "-" + post_dt.substring(2,4) 	  + "-" + post_dt.substring(4,8);
		}
		if(inv_dt != ""){
			formObj.f_inv_dt.value=inv_dt.substring(0,2) 	  + "-" + inv_dt.substring(2,4) 	  + "-" + inv_dt.substring(4,8);
			formObj.pre_inv_dt.value = formObj.f_inv_dt.value;
		}
		if(due_dt != ""){
			//term을 초기화한다.
			formObj.f_terms[0].selected=true;
			formObj.f_due_dt.value=due_dt.substring(0,2) 	  + "-" + due_dt.substring(2,4) 	  + "-" + due_dt.substring(4,8);
		}
		if(last_paid_dt != ""){
			formObj.f_last_paid_dt_cal.value=last_paid_dt.substring(0,2) + "-" + last_paid_dt.substring(2,4) + "-" + last_paid_dt.substring(4,8);
		}
		formObj.f_frgn_amt.value="";
		formObj.f_frgn_vat_amt.value="";
		formObj.f_frgn_sum_amt.value="";
		/*
		//Vendor를 변경못하게 한다.
		formObj.f_vendor_cd.readOnly=true;
		formObj.f_vendor_cd.className="search_form-disable";
		formObj.f_vendor_nm.readOnly=true;
		formObj.f_vendor_nm.className="search_form-disable";
		formObj.billto.onclick="";
		formObj.billto.style.cursor="none";
		*/
		formObj.f_curr_cd.value=sheetObj.GetCellValue(2, "inv_aply_curr_cd");
		formObj.f_clt_cmpl_flg.value=sheetObj.GetCellValue(2, "clt_cmpl_flg");
//		if(sheetObj.CellValue(2, "buy_inv_rcv") == "Y"){
//			formObj.f_buy_inv_rcv.checked = true;
//		}
		if(sheetObj.GetCellValue(2, "tax_bil_flg") == "Y"){
			formObj.f_tax_bill.checked=true;
		}
		//마감처리를 한다.
		if(sheetObj.GetCellValue(2, "clt_cmpl_flg") == "Y"){
			execMagam();
		}
//		deleteBtn1.style.display="inline";
		getObj("deleteBtn2").style.display="inline";
		formObj.f_ref_ofc_cd.value=sheetObj.GetCellValue(2,"ref_ofc_cd");
	}else{
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		for(var i=2; i<=sheetObj.LastRow();i++){
			sheetObj.SetCellEditable(i, "frt_check",1);
			if(formObj.f_vendor_cd.value == sheetObj.GetCellValue(i, "trdp_cd")){
				sheetObj.SetCellValue(i, "frt_check","1");
			}
		amt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_amt"));
		vatamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_vat_amt"));
		totamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
		}
		formObj.f_amt_tot.value=parseFloat(amt_tot).toFixed(2);
		formObj.f_vatamt_tot.value=parseFloat(vatamt_tot).toFixed(2);
		formObj.f_totamt_tot.value=parseFloat(totamt_tot).toFixed(2);
//		deleteBtn1.style.display="none";
		getObj("deleteBtn2").style.display="none";
	}

	// CNTR TP/SZ 값을 셋팅한다.
	for(var i=2; i<=sheetObj.LastRow();i++){
		sheetObj.SetCellValue(i, "cntr_tpsz_cd",sheetObj.CellSearchValue(i, "cntr_tpsz_cd"));
	}
	// 마감 된 이후에 add 한 값은 수정 가능, clt_cmpl_flg = 'N' 이면 수정 가능 
	for(var i=2; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == 'N'){
			var frt_check_flg = sheetObj.GetCellEditable(i,"frt_check");
			
			sheetObj.SetRowEditable(i,1);
			
			sheetObj.SetCellEditable(i,"frt_check",frt_check_flg);
		}
	}
	//천단위 콤마
	formObj.f_amt_tot.value=doMoneyFmt(roundXL(Number(formObj.f_amt_tot.value),2).toFixed(2));
	formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(Number(formObj.f_vatamt_tot.value),2).toFixed(2));
	formObj.f_totamt_tot.value=doMoneyFmt(roundXL(Number(formObj.f_totamt_tot.value),2).toFixed(2));
	if (formObj.f_inv_seq.value != '') {
	   bPaid=false;
	   ajaxSendPost(getInvoicePayAmt, 'reqVal', '&goWhere=aj&bcKey=getInvoicePayAmt&inv_seq=' + frm1.f_inv_seq.value, './GateServlet.gsl');
	   if (bPaid) {
		   for ( var i=2; i <= sheetObj.LastRow(); i++) {
			   if (sheetObj.GetCellValue(i, "ibflag") != 'I') {
				   sheetObj.SetRowEditable(i,0);
			   }
		   }
	   }
   }
	// LHK, 최종 Load 후에 권한 체크하여 화면 control 함
	authControl();
	fnbtnCtl(2);
}
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if (sheetObj.GetCellValue(2,"inv_seq") != -1 ) {
		formObj.f_inv_seq.value=sheetObj.GetCellValue(2,"inv_seq");
		formObj.temp_inv_no.value=sheetObj.GetCellValue(2,"inv_no");
		formObj.s_inv_no.value=sheetObj.GetCellValue(2,"inv_no");
		formObj.f_inv_no.value=sheetObj.GetCellValue(2,"inv_no");
		formObj.f_modi_tms.value=sheetObj.GetCellValue(2, "modi_tms");
	}
	if(formObj.f_inv_seq.value != ""){
		for(var i=2; i<=sheetObj.LastRow();i++){
			sheetObj.SetCellEditable(i, "frt_check",0);
			sheetObj.SetColBackColor(2,"#EFEBEF");
		}
		var last_paid_dt= "";
		if (sheetObj.GetCellValue(2,"inv_seq") != -1 ) {
			formObj.f_vendor_cd.value=sheetObj.GetCellValue(2, "inv_trdp_cd");
			formObj.f_vendor_nm.value=sheetObj.GetCellValue(2, "inv_trdp_cd_nm");
			formObj.f_remark.value=sheetObj.GetCellValue(2, "inv_rmk");
			formObj.f_inv_no.value=sheetObj.GetCellValue(2, "inv_no");
			formObj.f_dept_cd.value=sheetObj.GetCellValue(2, "acc_dept_cd");
			formObj.f_ofc_cd.value=sheetObj.GetCellValue(2, "ofc_cd");
			formObj.bl_cnt_cd.value=sheetObj.GetCellValue(2, "bl_cnt_cd");
			last_paid_dt=sheetObj.GetCellValue(2, "last_pay_dt");
			formObj.f_curr_cd.value=sheetObj.GetCellValue(2, "inv_aply_curr_cd");
			//마감처리를 한다.
			if(sheetObj.GetCellValue(2, "clt_cmpl_flg") == "Y"){
				execMagam();
			}
			formObj.f_clt_cmpl_flg.value=sheetObj.GetCellValue(2, "clt_cmpl_flg");
		}
		formObj.f_frgn_amt.value="";
		formObj.f_frgn_vat_amt.value="";
		formObj.f_frgn_sum_amt.value="";
		if(last_paid_dt != ""){
			formObj.f_last_paid_dt_cal.value=last_paid_dt.substring(0,2) + "-" + last_paid_dt.substring(2,4) + "-" + last_paid_dt.substring(4,8);
		}
		formObj.f_amt_due.value=doMoneyFmt(sheetObj.GetCellValue(2, "inv_bal_amt"));
		formObj.f_paid_amt.value=doMoneyFmt(sheetObj.GetCellValue(2, "inv_pay_amt"));
		formObj.f_last_ck.value=sheetObj.GetCellValue(2, "last_chk_no");
		/*
		//Vendor를 변경못하게 한다.
		formObj.f_vendor_cd.readOnly=true;
		formObj.f_vendor_cd.className="search_form-disable";
		formObj.f_vendor_nm.readOnly=true;
		formObj.f_vendor_nm.className="search_form-disable";
		formObj.billto.onclick="";
		formObj.billto.style.cursor="none";
		*/
//		if(sheetObj.CellValue(2, "buy_inv_rcv") == "Y"){
//			formObj.f_buy_inv_rcv.checked = true;
//		}
//		deleteBtn1.style.display="inline";
		getObj("deleteBtn2").style.display="inline";
	}else{
//		deleteBtn1.style.display="none";
		getObj("deleteBtn2").style.display="none";
	}
	//TB_TRDP에 저장하기 위해 OLD_SUM값을 저장한다.
	formObj.f_old_sum_amt.value=formObj.f_totamt_tot.value;
	//천단위 콤마
	formObj.f_amt_tot.value=doMoneyFmt(parseFloat(formObj.f_amt_tot.value).toFixed(2));
	formObj.f_vatamt_tot.value=doMoneyFmt(parseFloat(formObj.f_vatamt_tot.value).toFixed(2));
	formObj.f_totamt_tot.value=doMoneyFmt(parseFloat(formObj.f_totamt_tot.value).toFixed(2));
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	//doWork("SEARCHLIST");
	// LHK, 최종 Load 후에 권한 체크하여 화면 control 함
	if (sheetObj.GetCellValue(2,"inv_seq") != -1 ) {
		authControl();
		fnbtnCtl(2);
	} else {
		clearAll();
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
        case "frt_check" :
        	var amt_sum=0;
        	var vat_amt_sum=0;
        	var tot_amt_sum=0;
        	if(formObj.f_vendor_cd.value == ""){
        		//[Vendor] is mandatory field.
        		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_VENDOR'));
        		formObj.f_vendor_cd.focus();
        		sheetObj.SetCellValue(Row,"frt_check","1");
        	}
        	else{
        		if(formObj.f_vendor_cd.value == sheetObj.GetCellValue(Row, "trdp_cd")){
    	        	if(sheetObj.GetCellEditable(Row, "frt_check")){
    	        		if(sheetObj.GetCellValue(Row,"del_chk") == "1"){
    	            		sheetObj.SetCellValue(Row,"del_chk","0",0);
    	            	}
    	        		if(sheetObj.GetCellValue(Row,"frt_check") == "0"){
							formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_amt"));
							formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
							formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
	    	            }else{
							formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_amt"));
							formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
							formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
	    	            }
    	        		formObj.f_amt_tot.value=doMoneyFmt(Number(formObj.f_amt_tot.value).toFixed(2));
        	        	formObj.f_vatamt_tot.value=doMoneyFmt(Number(formObj.f_vatamt_tot.value).toFixed(2));
        	        	formObj.f_totamt_tot.value=doMoneyFmt(Number(formObj.f_totamt_tot.value).toFixed(2));
	    	        }
            	}else{
            		//Check the Customer Info of selected row
            		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CUST'));
            		sheetObj.SetCellValue(Row,"frt_check","1");
            	}
        	}
        	break;
        case "del_chk" :
        	if(sheetObj.GetCellValue(Row,"inv_seq") != ""){
				var amt_sum=0;
		    	var vat_amt_sum=0;
		    	var tot_amt_sum=0;
			if(sheetObj.GetCellValue(Row,"del_chk") == "0"){
				formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_amt"));
				formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
				formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
			    	}else{
				formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_amt"));
				formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
				formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
		    	}
			}else{
				if(sheetObj.GetCellValue(Row,"del_chk") == "0"){
	        		if(Number(removeComma(formObj.f_amt_tot.value)) > 0 && formObj.f_amt_tot.value != ""){
	        			formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_amt"));
	            	}
	            	if(Number(removeComma(formObj.f_vatamt_tot.value)) > 0 && formObj.f_vatamt_tot.value != ""){
	            		formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
	            	}
	            	if(Number(removeComma(formObj.f_totamt_tot.value)) > 0 && formObj.f_totamt_tot.value != ""){
	            		formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
	            	}
	        	}else{
	        	if(sheetObj.GetCellValue(Row,"frt_check") == "1"){
					formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_amt"));
					formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
					formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
	        		}
	        	}
			}
		        	formObj.f_amt_tot.value=doMoneyFmt(Number(formObj.f_amt_tot.value).toFixed(2));
		        	formObj.f_vatamt_tot.value=doMoneyFmt(Number(formObj.f_vatamt_tot.value).toFixed(2));
		        	formObj.f_totamt_tot.value=doMoneyFmt(Number(formObj.f_totamt_tot.value).toFixed(2));
		        	if(sheetObj.GetCellValue(Row,"frt_check") == "1"){
        		sheetObj.SetCellValue(Row,"frt_check","0");
        	}
        	/*	[20140112 OJG]
	if(sheetObj.GetCellValue(Row, "ibflag") == "I"){
    			sheetObj.RowDelete(Row,false);
    			return;
    		}
			*/
		break;
	}
}
function sheet1_OnPopupClick(sheetObj, row, col){
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	//Freight Code조회
	if(colStr == "frt_cd"){
   		rtnary=new Array(1);
   		rtnary[0]="";
   		rtnary[1]="";
   		rtnary[2]="";
   		rtnary[3]="";
   		rtnary[4]="";
   		rtnary[5]="Y";
   		rtnary[6]="Y";	//GNR_FLG
        var rtnVal =  window.showModalDialog('./CMM_POP_0070.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:557px;dialogHeight:520px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(row, "frt_cd",rtnValAry[0]);
			sheetObj.SetCellValue(row, "frt_cd_nm",rtnValAry[1]);
			sheetObj.SetCellValue(row, "vat_rt",rtnValAry[2]);
			//기존 입력값 초기화
			/*
			sheetObj.SetCellValue(row, "cntr_tpsz_cd",'');
			sheetObj.SetCellValue(row, "qty",'');
			sheetObj.SetCellValue(row, "vat_amt",'');
			sheetObj.SetCellValue(row, "inv_amt",'');
			sheetObj.SetCellValue(row, "inv_vat_amt",'');
			*/
			frm1.f_curRow.value=row;
			/*
			var parmStr='&goWhere=aj&bcKey=searchMyTaxRate';
			parmStr += '&f_frt_cd='+rtnValAry[0];
			ajaxSendPost(setTaxRate,  'reqVal', parmStr, './GateServlet.gsl');
			*/
		}
    //Buying/Credit인 경우 Invoice 환률을 선택한다.
	}else if(colStr == "rat_curr_cd"){
    	rtnary=new Array(1);
   		rtnary[0]="1";
        var rtnVal =  ComOpenWindow('./CMM_POP_0040.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:480px" , true);
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(row, col,rtnValAry[0]);
			sheetObj.SetCellValue(row, 'inv_xcrt','');
			sheetObj.SetCellValue(row, 'inv_amt','');
			sheetObj.SetCellValue(row, 'inv_vat_amt','');
			if(sheetObj.GetCellValue(row,  "rat_curr_cd") == sheetObj.GetCellValue(row, "rat_curr_cd")){
				sheetObj.SetCellValue(row, "inv_xcrt",1);
			}
		}
	//Invoice Exchange rate
	}else if(colStr=="inv_xcrt"){
		//팝업 호출 조건을 확인한다.
		if(sheetObj.GetCellValue(row, 'ru') == ''){
   			//Please enter \"Rate!\"!
   			alert(getLabel('FMS_COM_ALT002') + " \n - " + getLabel('FMS_COD_RATE'));
   			return;
   		//Currency 선택여부 확인
		}else if(sheetObj.GetCellValue(row, 'rat_curr_cd') == ''){
   			//Please select \"Currency!\"!
   			alert(getLabel('FMS_COM_ALT004') + " \n - " + getLabel('FMS_COD_CURR'));
   			return;
   		}
		rtnary=new Array(1);
   		rtnary[0]="2";
   		//P/C 구분에 따라서 조회할 환률을 선택한다.
   		var fndCurr='';
		fndCurr=sheetObj.GetCellValue(row, 'rat_curr_cd');
		var paramStr='?f_fm_curr_cd='+sheetObj.GetCellValue(row, "rat_curr_cd");
		paramStr+= '&f_inv_curr_cd='+sheetObj.GetCellValue(row, 'rat_curr_cd');
		paramStr+= '&f_dft_dt=' +sheetObj.GetCellValue(row, "inv_xcrt_dt");
		//paramStr+= '&f_trdp_cd='+sheetObj.CellValue(row, "trdp_cd");
		//paramStr+= '&f_trdp_nm='+sheetObj.CellValue(row, "trdp_nm");
		paramStr+= '&f_trdp_cd='+frm1.f_vendor_cd.value;
		paramStr+= '&f_trdp_nm='+frm1.f_vendor_nm.value;
   		var rtnVal =  ComOpenWindow('./CMM_POP_0220.clt'+paramStr,  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:750px;dialogHeight:600px" , true);
   		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(row, "inv_xcrt",rtnValAry[0]);//EX. Rate  inv_xcrt
			sheetObj.SetCellValue(row, "rat_curr_cd",rtnValAry[1]);//xch_curr_cd
			calcInvAmt(sheetObj, row, objPfx);
		}
	}
}
function sheet1_OnChange(sheetObj, row, col) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	/*
	 * Currency에 의해 금액 결과값의 포맷이 달라짐
	 * KRW, JPY은 소수점이 없는 금액임
	 * Math.round 처리함
	 */
	var curr=formObj.f_curr_cd.value;
	//---------------------[20140112 GOJ]-----------------------------
	if(colStr == "del_chk"){
		var delChkCnt=0;
		//alert(sheetObj.RowCount); alert(sheetObj.CheckedRows("del_chk"));
		if(sheetObj.RowCount()> 0 && sheetObj.RowCount()== sheetObj.CheckedRows("del_chk")){
			alert(getLabel('ACC_MSG135'));
			sheetObj.SetCellValue(row, 'del_chk',0,0);
			return;
		}
		if(sheetObj.GetCellValue(row, "ibflag") == "I"){
    		//sheetObj.SetCellValue(row, 'del_chk',0,0);
			sheetObj.RowDelete(row,false);
		}
	}
	//---------------------[20140112 GOJ]-----------------------------
	if(colStr == "frt_cd"){
		var frt_cd=sheetObj.GetCellValue(row, 'frt_cd');
		//doAutoSearch(sheetObj, row, 'frt_cd', 'freight', codeStr, 'frt_cd', 'frt_cd_nm');
		SELECTROW=row;
		if(frt_cd != ""){
			// #20942 frt_cd 의 특수문자 대응(& )
			frt_cd=frt_cd.replace(/&/g,"%26");
			ajaxSendPost(getInvGnrFrtcd, 'reqVal', '&goWhere=aj&bcKey=getInvGnrFrtcd&sell_buy_tp_cd=S&frt_cd='+frt_cd, './GateServlet.gsl');
		}else{
			sheetObj.SetCellValue(row, "frt_cd","");
			sheetObj.SetCellValue(row, "frt_cd_nm","");
			sheetObj.SetCellValue(row, "vat_rt","");
		}
	}
	if(colStr == "inv_amt"){
		/*sheetObj.SetCellValue(row, "vat_amt",Number(sheetObj.GetCellValue(row, "vat_rt"))/100);
		if(curr=="KRW" || curr=="JPY"){
			sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "inv_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100)));
		}else{
			sheetObj.SetCellValue(row, "inv_vat_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) * Number(sheetObj.GetCellValue(row, "vat_rt"))/100);
		}
		sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));*/
		sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt")));
	}
	/*if(colStr == "vat_rt"){
		sheetObj.SetCellValue(row, "vat_amt",Number(sheetObj.GetCellValue(row, "vat_rt"))/100);
		if(curr=="KRW" || curr=="JPY"){
			sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "inv_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100)));
		}else{
			sheetObj.SetCellValue(row, "inv_vat_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) * Number(sheetObj.GetCellValue(row, "vat_rt"))/100);
		}
		sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
	}
	if(colStr == "inv_vat_amt"){
		if(curr=="KRW" || curr=="JPY"){
			sheetObj.SetCellValue(row, "inv_sum_amt",Math.round( Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")) ));
		}else{
			sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
		}
	}*/
	if(formObj.f_inv_seq.value != ""){
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		for(var i=2; i<=sheetObj.LastRow(); i++){
			if(sheetObj.GetCellValue(i,"del_chk") == "1"){
				//amt_tot 	= Number(sheetObj.CellValue(i, "inv_amt"));
				//vatamt_tot 	= Number(sheetObj.CellValue(i, "inv_vat_amt"));
				//totamt_tot 	= Number(sheetObj.CellValue(i, "inv_sum_amt"));
			}else{
				amt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_amt"));
				vatamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_vat_amt"));
				totamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
			}
		}
		formObj.f_amt_tot.value=doMoneyFmt(Number(amt_tot).toFixed(2));
		formObj.f_vatamt_tot.value=doMoneyFmt(Number(vatamt_tot).toFixed(2));
		formObj.f_totamt_tot.value=doMoneyFmt(Number(totamt_tot).toFixed(2));
	}else{
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		for(var i=2; i<=sheetObj.LastRow(); i++){
			if(sheetObj.GetCellValue(i,"frt_check") == "1"){
				amt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_amt"));
				vatamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_vat_amt"));
				totamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
			}
		}
		formObj.f_amt_tot.value=doMoneyFmt(parseFloat(amt_tot).toFixed(2));
		formObj.f_vatamt_tot.value=doMoneyFmt(parseFloat(vatamt_tot).toFixed(2));
		formObj.f_totamt_tot.value=doMoneyFmt(parseFloat(totamt_tot).toFixed(2));
	}
}
/**
 * 기본 세률 조회
 */
function setTaxRate(reqVal){
	var sheetObj=docObjects[0];
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
		sheetObj.SetCellValue(frm1.f_curRow.value, "vat_rt",doc[1]);
    }
}
function calcFrgnAmt(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	for(var i=2;i<=sheetObj.LastRow();i++){
		//INVOICE생성후 데이터
		if(formObj.f_inv_seq.value != ""){
			if(sheetObj.GetCellValue(i, "del_chk") != "1"){
			if(formObj.f_curr_cd.value != sheetObj.GetCellValue(i, "rat_curr_cd")){
				formObj.f_frgn_curr_cd.value=sheetObj.GetCellValue(i, "rat_curr_cd");
				formObj.f_frgn_amt.value=Number(formObj.f_frgn_amt.value) + Number(sheetObj.GetCellValue(i,"inv_amt"));
				formObj.f_frgn_vat_amt.value=Number(formObj.f_frgn_vat_amt.value) + Number(sheetObj.GetCellValue(i,"inv_vat_amt"));
				formObj.f_frgn_sum_amt.value=Number(formObj.f_frgn_sum_amt.value) + Number(sheetObj.GetCellValue(i,"inv_sum_amt"));
				}else{
					//formObj.f_frgn_curr_cd.value 	= "";
					//formObj.f_frgn_amt.value 		= 0;
					//formObj.f_frgn_vat_amt.value 	= 0;
					//formObj.f_frgn_sum_amt.value 	= 0;
				}
			}
		//INVOICE생성전 데이터
		}else{
		}
	}
}
/**
 * 콤보 조회
 */
function doAction(cmdt_cd){
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCommodityKeyCode&s_cmdt_cd='+cmdt_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//[Commodity Code] is duplicated!
			alert(getLabel('FMS_COM_ALT008') + " \n - " + getLabel('FMS_COD_CMDT') + ": " + doc[1]);
			var sheetObj=docObjects[0];
			var intRow=sheetObj.LastRow();
			sheetObj.SetCellValue(intRow, "cmdt_cd","");
		}
	}else{
		//Error Errupt!
		alert(getLabel('FMS_COM_ERR001'));
	}
}
//참고
function rightDate()
{
  var year=document.form1.JLYEAR.value;
  var month=document.form1.JLMONTH.value;
  var dd=new Date(year, month, 0);
  var selectedDay=document.form1.JLDAY.value;
  var lastDay=dd.getDate();
  if(selectedDay > lastDay){
	  //날짜를 정확히 선택해 주세요. 선택하신 년월의 날짜는 " + lastDay + " 일까지 있습니다.
	  alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_DATE'));
	  return false;
  }
  return false;
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출
        	var cal=new ComCalendar();
            cal.select(formObj.f_post_dt,  'MM-dd-yyyy');
        break;
        case 'DATE2':    //달력 조회 팝업 호출
        	var cal=new ComCalendar();
        	cal.setEndFunction("changeInvDt");
            cal.select(formObj.f_inv_dt, 'MM-dd-yyyy');
            calcCreateTerms();
        break;
        case 'DATE3':    //달력 조회 팝업 호출
        	var cal=new ComCalendar();
            cal.select(formObj.f_due_dt,  'MM-dd-yyyy');
        break;
    }
}
function enterInvInfo(){
	var formObj=document.frm1;
	if(formObj.s_inv_no.value != ""){
		if(event.keyCode == 13){
			ajaxSendPost(getInvInfo, 'reqVal', '&goWhere=aj&bcKey=getInvInfo&s_inv_no='+formObj.s_inv_no.value+'&ofc_cd='+formObj.f_ofc_cd.value+'&type1=B&type2=B', './GateServlet.gsl');
		}
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
				frm1.f_inv_seq.value=rtnArr[0];
				frm1.s_inv_no.value=rtnArr[1];
				doWork("SEARCHLIST");
			}else{
				frm1.f_inv_seq.value="";
				frm1.s_inv_no.value="";
				clearAll();
				formObj.s_inv_no.focus();
			}
		}
	}
	else{
		//SEE_BMD_MSG43
	}
}
/**
 * AJAX RETURN
 * BL CONTAINER TP_SZ 가져온다.
 */
function getBlCntrInfo(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			var tp_sz=" ";
			var tp_cnt=0;
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				for(var i=0;i<rtnArr.length; i++){
					tp_sz += "|"+rtnArr[i];
				}
				sheetObj.SetColProperty('cntr_tpsz_cd', {ComboText:tp_sz, ComboCode:tp_sz} );
			}else{
				sheetObj.SetColProperty('cntr_tpsz_cd', {ComboText:tp_sz, ComboCode:tp_sz} );
			}
		}
	}else{
	}
}
/**
 * AJAX RETURN
 * INVOICE FRT CD 를 가져온다.
 */
function getInvGnrFrtcd(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			// Billing Code조회시 GL_COST의 값이 ""또는 NULL인 경우에는 에러메시지
			var gl_cost=rtnArr[3];
			if (gl_cost == "" || gl_cost == "undefined" || gl_cost == undefined) {
				var parArr=new Array(2);
				//parArr[0]=rtnArr[0];
				//parArr[1]=rtnArr[1];
				parArr[0]=getLabel('FMS_COD_BILLREV');
 				parArr[1]=rtnArr[0]+" - "+rtnArr[1];				
				alert(getLabel2('ACC_MSG110',parArr));
				sheetObj.SetCellValue(SELECTROW, 'frt_cd',"");
				sheetObj.SelectCell(SELECTROW, 'frt_cd');
				return;
			}
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				sheetObj.SetCellValue(SELECTROW, "frt_cd",rtnArr[0]);
				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm",rtnArr[1]);
				sheetObj.SetCellValue(SELECTROW, "vat_rt",rtnArr[2]);
			}else{
				sheetObj.SetCellValue(SELECTROW, "frt_cd","");
				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm","");
				sheetObj.SetCellValue(SELECTROW, "vat_rt","");
			}
		}
	}
	else{
		//SEE_BMD_MSG43
	}
}
//Invoice NO 중복체크를 한다.
function checkInvNoDup(){
 	var formObj=document.frm1;
 	if(formObj.f_inv_no.value != ""){
 		if(formObj.temp_inv_no.value != formObj.f_inv_no.value){
 			ajaxSendPost(checkDupInvNo, 'reqVal', '&goWhere=aj&bcKey=checkDupInvNo&inv_no='+formObj.f_inv_no.value, './GateServlet.gsl');
 		}
 	}
}
 /**
  * AJAX RETURN
  * INVOICE NO 중복체크
  */
function checkDupInvNo(reqVal){
 	var formObj=document.frm1;
 	var sheetObj=docObjects[0];
 	var doc=getAjaxMsgXML(reqVal);
 	if(doc[0]=='OK'){
 		if(typeof(doc[1])!='undefined'){
 			//조회해온 결과를 Parent에 표시함
 			var rtnArr=doc[1].split('^@');
 			if (rtnArr[0] != "null" && rtnArr[0] != "") {
 				isInvNoDupChk=true;
// 				formObj.f_inv_no.value = formObj.temp_inv_no.value;
 				//Invoice No Duplicate!!
 				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_IVNO'));
 				formObj.f_inv_no.select();
			} else {
				isInvNoDupChk=false;
			}
 		}
 	}
}
//조회 INVOICE NO가 비었을경우 INV_SEQ 를 지워준다.
function setInvInfo(){
	var formObj=document.frm1;
	if(formObj.s_inv_no.value == ""){
		formObj.f_inv_seq.value="";
	}
}
function enterCalcCreateTerms(){
	var formObj=document.frm1;
	if(event.keyCode == 13){
		if(formObj.f_term_dt.value != "" && formObj.f_term_dt.value != "0"){
			calcCreateTerms();
		}
	}
}
//CREATE TERMS로 DUE DATE 를 계산한다.
function calcCreateTerms(){
	var formObj=document.frm1;
	// oyh-inv_dt가 입력되지 않으면 동작안되게 수정 
	if (formObj.f_inv_dt.value == "") {
		return;
	}
	if(formObj.f_terms[0].selected){
		formObj.f_term_dt.value="";
		formObj.f_due_dt.value="";
	}else if(formObj.f_terms[1].selected){
		if(formObj.f_term_dt.value == "") formObj.f_term_dt.value = 0;
		if(formObj.f_term_dt.value != ""){
			var dueDay=formObj.f_term_dt.value;
			var endDate=addDay(formObj.f_inv_dt.value, dueDay);
			formObj.f_due_dt.value=endDate;
		}
	}else if(formObj.f_terms[2].selected){
		formObj.f_term_dt.value="";
		var endDate=getEndDate(formObj.f_inv_dt.value);
		formObj.f_due_dt.value=endDate;
	}else if(formObj.f_terms[3].selected){
		formObj.f_term_dt.value="";
		var endDate=getNextEndDate(formObj.f_inv_dt.value);
		formObj.f_due_dt.value=endDate;
	}
	else if(formObj.f_terms[4].selected){
		if(formObj.f_term_dt.value != ""){
			var dueDay=formObj.f_term_dt.value;
			if(Number(dueDay) < 1 || Number(dueDay) > 31){
				//Invalid date.
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_DATE'));
				formObj.f_term_dt.value="";
				formObj.f_term_dt.focus();
				return;
			}
			var endDate=getNextInputDate(formObj.f_inv_dt.value, dueDay);
			formObj.f_due_dt.value=endDate;
		}
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
//다음달 말일구하기
function getNextEndDate(datestr){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2))+1;
	if(mm == 13){
		yy=yy+1;
		mm=1;
	}
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
//다음달 입력일 구하기
function getNextInputDate(datestr, v_day){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2))+1;
	if(mm == 13){
		yy=yy+1;
		mm=1;
	}
    //윤년 검증
    var boundDay="";
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm="0"+mm;
       }
       if(mon[mm-1] < v_day){
    	   //Invalid date.
    	   alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_DATE'));
    	   return false;
       }
    }
    else{
      if(yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm;
          }
          if(y_day > 29){
        	  //Invalid date.
        	  alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_DATE'));
       	   	  return false;
          }
      }
      else{
    	  if(mm < 10){
       	   mm="0"+mm;
          }
    	  if(y_day > 28){
    		  //Invalid date.
    		  alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_DATE'));
       	   	  return false;
          }
      }
    }
    if(Number(v_day) < 10){
    	v_day="0"+v_day;
    }
    boundDay=mm + "-" + v_day + "-" + yy;
    return boundDay;
}
//날짜더하기
function addDay(ymd, v_day){
	 ymd=ymd.replaceAll("-","");
	 var yyyy=ymd.substr(4,4);
	 var mm=eval(ymd.substr(0,2) + "- 1") ;
	 var dd=ymd.substr(2,2);
	 var dt3=new Date(yyyy, mm, eval(dd + '+' + v_day));
	 yyyy=dt3.getFullYear();
	 mm=(dt3.getMonth()+1)<10? "0" + (dt3.getMonth()+1) : (dt3.getMonth()+1) ;
	 dd=dt3.getDate()<10 ? "0" + dt3.getDate() : dt3.getDate();
	 return  mm + "-" + dd + "-" + yyyy ;
}
//그리드 전체를 삭제하면 INVOICE 를 삭제한다.
function checkDelete(){
	var sheetObj=docObjects[0];
	var returnFlag=true;
	var delCnt=0;
	for(var i=2; i<=sheetObj.LastRow(); i++){
if(sheetObj.GetCellValue(i,"del_chk") == "1" && sheetObj.GetCellValue(i,"inv_seq") != ""){
		   delCnt += 1;
	   }
   }
	// 조회한 row가 0이 아니고 delCnt가 시트의 row 갯수와 같을때 
	if(retCnt != 0 && delCnt == sheetObj.RowCount()){
		returnFlag=false;
	}
	return returnFlag;
}
//화면 클리어
function clearAll(){
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  if(collTxt[i].name != "f_usr_nm" && collTxt[i].name != "f_email" && collTxt[i].name != "f_ofc_cd" && collTxt[i].name != "f_cnt_cd"){
			  collTxt[i].value="";
		  }
		  if(collTxt[i].name == "f_vendor_cd" || collTxt[i].name == "f_vendor_nm" ||
		     collTxt[i].name == "f_inv_no" || collTxt[i].name == "f_post_dt" ||
		     collTxt[i].name == "f_inv_dt" || collTxt[i].name == "f_term_dt" ||
		     collTxt[i].name == "f_due_dt"){
			  collTxt[i].className="search_form";
			  collTxt[i].readOnly=false;
		  }
	  }
	}
	frm1.f_post_dt.value=TODAY;
	frm1.f_inv_dt.value=TODAY;
	frm1.f_terms.value="";
	frm1.f_curr_cd.value="";
	frm1.f_remark.value="";
//	frm1.f_buy_inv_rcv.disabled = false;
	frm1.f_terms.disabled=false;
	frm1.f_curr_cd.disabled=false;
	frm1.f_remark.disabled=false;
//	deleteBtn1.style.display="none";
	getObj("deleteBtn2").style.display="none";
	frm1.f_vendor_cd.onblur=function(){codeNameAction('VENDOR',this, 'onBlur');};
	frm1.billto.onclick=function(){doWork("CUSTOMER_POPLIST");};
	frm1.billto.style.cursor="hand";
	frm1.f_post_dt_cal.onclick=function(){doDisplay('DATE1', frm1);};
	frm1.f_inv_dt_cal.onclick=function(){doDisplay('DATE2', frm1);};
	frm1.f_due_dt_cal.onclick=function(){doDisplay('DATE3', frm1);};
	//frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);calcCreateTerms();};
	frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);changeInvDt();};
	frm1.f_term_dt.onblur=function(){calcCreateTerms();};
	sheetObj.SetEditable(1);
	sheetObj.RemoveAll();
	
	frm1.f_ofc_cd.value="";
	fnbtnCtl(2);
}
//필수항목체크
function checkVal(){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(formObj.f_vendor_nm.value == "" || formObj.f_vendor_cd.value == ""){
		//[Vendor] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_BLTO'));
		formObj.f_vendor_nm.focus();
		return false;
	}
	if(formObj.f_post_dt.value == ""){
		//[Posting Date] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_POSTING'));
		formObj.f_post_dt.focus();
		return false;
	}
	if(formObj.f_inv_dt.value == ""){
		//[Invoice Date] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_INVOICEDT'));
		formObj.f_inv_dt.focus();
		return false;
	}
	if(formObj.f_due_dt.value == ""){
		//[Due Date] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_DUEDT'));
		formObj.f_due_dt.focus();
		return false;
	}
	if(formObj.f_curr_cd.value == ""){
		//[Currency] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_BLCURRENCY'));
		formObj.f_curr_cd.focus();
		return false;
	}
	// CUSTMIZE된 회사일 경우 Department는 필수
	/*
	if (use_flg){
		if (formObj.f_dept_cd.value ==""){
			//[Department] is mandatory field.
			alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_INV_0035.1733");
			formObj.f_dept_cd.focus();
			return false;
		}
	}
	*/
	/*
	// #20443 기존의 마감 POST_DT 체크에서 BLOCK_DT 체크로 변경
	if(formObj.f_inv_seq.value == "") {
		var bl_post=(formObj.f_post_dt.value).replaceAll("-","");
		var block_post=formObj.block_post.value;
		if(bl_post != "" && block_post != "") {
			bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
			var blockDtPrn=block_post.substr(0,2)+"/" + block_post.substr(2,2)+ "/" + block_post.substr(4,4);
			block_post=block_post.substring(4,8)+block_post.substring(0,2)+block_post.substring(2,4);
			if(block_post >= bl_post){
				alert(getLabel2('ACC_MSG119',new Array(blockDtPrn)));
				formObj.f_post_dt.value=formObj.old_post_dt.value;
				formObj.f_post_dt.select();
				return false;
			}
		}
	}
	*/
/*	// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
	var bl_post=formObj.f_post_dt.value;
	var slip_post=formObj.slip_post.value;
	if(formObj.f_inv_seq.value == ""){
		if(bl_post != "" && slip_post != ""){
			bl_post=bl_post.replaceAll("-","");
			bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
			slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
			if(slip_post >= bl_post){
				//"Invalid [Posting Date]
				alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0035.1710");
				formObj.f_post_dt.value=TODAY;
				formObj.f_post_dt.select();
				return false;
			}
		}
	}*/
	for(var i=2;i<=sheetObj.LastRow();i++){
if(sheetObj.GetCellValue(i, "frt_cd") == ""){
			//[Freight Code] is mandatory field.
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_BILLINGCODE'));
			sheetObj.SelectCell(i,"frt_cd");
			return false;
		}
		/*
if(sheetObj.GetCellValue(i, "qty") == ""){
			//[Vol] is mandatory field.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('ITM_VOL'));
			sheetObj.SelectCell(i,"qty");
			return false;
		}
		*/
	}
	return true;
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();
	var s_type="";
	if(s_code != ""){
		if(tmp == "onKeyDown"){
			if(event.keyCode == 13){
				CODETYPE=str;
				s_type="trdpCode";
				if(CODETYPE=="VENDOR"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
		else if(tmp == "onBlur"){
			if(s_code != ""){
				CODETYPE=str;
				s_type="trdpCode";
				if(CODETYPE=="VENDOR"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}
	else{
		if(str == "VENDOR"){
			formObj.f_vendor_cd.value="";//trdp_cd  AS param1
			formObj.f_vendor_nm.value="";//eng_nm   AS param2
		}
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
			if(CODETYPE =="VENDOR"){
				
				if(masterVals[5]=='CR'){
					
					//[20140317 OYH] #27474
					var crdLmtAmt = masterVals[6]==""?0:eval(masterVals[6]);
					var curLmtAmt = masterVals[7]==""?0:eval(masterVals[7]);
					var balLmtAmt = crdLmtAmt - curLmtAmt;
					var overDueAmt= masterVals[20]==""?0:eval(masterVals[20]);
					var grandTotal= masterVals[22]==""?0:eval(masterVals[22]);

					//[20141217 YJW] #46708
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0){
							var objArr = new Array();
							objArr[0] = doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							objArr[1] = doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
							if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
								formObj.f_vendor_cd.value = "";//trdp_cd  AS param1
								formObj.f_vendor_nm.value = "";//eng_nm   AS param2
								return;
							}
						} else if (balLmtAmt < 0){
							var objArr = new Array();
							objArr[0] = doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							objArr[1] = doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));     
							if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
								formObj.f_vendor_cd.value = "";//trdp_cd  AS param1
								formObj.f_vendor_nm.value = "";//eng_nm   AS param2
								return;
							}
						} else if (overDueAmt > 0) {
							var objArr = new Array();
							objArr[0] = doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
							if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
								formObj.f_vendor_cd.value = "";//trdp_cd  AS param1
								formObj.f_vendor_nm.value = "";//eng_nm   AS param2
								return;
							}
						}
					}
				}
				
				formObj.f_vendor_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.f_vendor_nm.value=masterVals[3];	//eng_nm   AS param2
				formObj.f_terms.value=masterVals[8];	//term_cd
				formObj.f_term_dt.value=masterVals[9];	//term_dt
				calcCreateTerms();
			}
		}
		else{
			if(CODETYPE =="VENDOR"){
				formObj.f_vendor_cd.value="";				//trdp_cd  AS param1
				formObj.f_vendor_nm.value="";				//eng_nm   AS param2
				formObj.f_terms.value="";				//term_cd
				formObj.f_term_dt.value="";				//term_dt
				calcCreateTerms();
			}
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function custEnterAction(obj, type){
	var formObj=document.frm1;
	if(event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}
		else if(type == "CUSTOMER2"){
			doWork("CUSTOMER_POPLIST2");
		}
	}
}
//마감처리를 한다.
function execMagam(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  if(collTxt[i].name != "f_usr_nm" && collTxt[i].name != "f_email" && collTxt[i].name != "f_ofc_cd" && collTxt[i].name != "f_cnt_cd" &&
				  collTxt[i].name != "s_bl_no" && collTxt[i].name != "s_ref_no" && collTxt[i].name != "s_oth_no" && collTxt[i].name != "s_inv_no"){
			  collTxt[i].className="search_form-disable";
			  collTxt[i].readOnly=true;
		  }
	  }
	}
	//frm1.f_buy_inv_rcv.disabled = true;
	frm1.f_terms.disabled=true;
	frm1.f_curr_cd.disabled=true;
	//frm1.f_remark.disabled   = true;
	frm1.f_vendor_cd.onblur="";
	frm1.f_inv_dt.onblur="";
	frm1.f_term_dt.onblur="";
	frm1.f_post_dt_cal.onclick="";
	frm1.f_inv_dt_cal.onclick="";
	frm1.f_due_dt_cal.onclick="";
//	deleteBtn1.style.display="none";
	getObj("btnModify").style.display  = "none";
	getObj("deleteBtn2").style.display = "none";
	getObj("rowAddBtn2").style.display = "none";
	
	for(var i=2; i<=sheetObj.LastRow();i++){
		sheetObj.SetRowEditable(i,0);
	}
}
//POST_DATE 변경시 INV_DATE를 변경한다.
function setInvDt(){
	frm1.f_inv_dt.value=frm1.f_post_dt.value;
	frm1.f_inv_dt.focus();
	frm1.f_inv_dt.blur();
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
function checkPostDate(obj){
	var formObj=document.frm1;
	var changed_post_dt=obj.value;
	if(changed_post_dt == formObj.old_post_dt.value){
		return;
	}
	if(BLOCK_POST_DT == ""){
		return;
	}
	if(compareTwoDate(BLOCK_POST_DT, changed_post_dt)){
		alert(getLabel2('ACC_MSG119',new Array(ORG_BLOCK_POST_DT)));
		formObj.f_post_dt.value=formObj.old_post_dt.value;
		formObj.f_post_dt.select();
		return false;
	}
	// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
//	var bl_post   = formObj.f_post_dt.value;
//	var slip_post = formObj.slip_post.value;
//
//	if(formObj.f_inv_seq.value == ""){
//		if(bl_post != "" && slip_post != ""){
//			bl_post   = bl_post.replaceAll("-","");
//			bl_post   = bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
//			slip_post = slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
//
//			if(slip_post >= bl_post){
//				//Invalid [Posting Date]
//				alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0035.1892");
//
//				formObj.f_post_dt.value = TODAY;
//				formObj.f_post_dt.select();
//				return false;
//			}
//		}
//	}
}
//날짜더하기
function addDay(ymd, v_day){
	 ymd=ymd.replaceAll("-","");
	 var yyyy=ymd.substr(4,4);
	 var mm=eval(ymd.substr(0,2) + "- 1") ;
	 var dd=ymd.substr(2,2);
	 var dt3=new Date(yyyy, mm, eval(dd + '+' + v_day));
	 yyyy=dt3.getFullYear();
	 mm=(dt3.getMonth()+1)<10? "0" + (dt3.getMonth()+1) : (dt3.getMonth()+1) ;
	 dd=dt3.getDate()<10 ? "0" + dt3.getDate() : dt3.getDate();
	 return  mm + "-" + dd + "-" + yyyy ;
}
/* LHK 20130829 Tab Key 로 ADD 기능 추가 */
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow()== row && "inv_amt" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			doWork('ROWADD');
			sheetObj.SelectCell(row+1, 2);
		}
	}
}
/** 
 *  #20443 POST DATE와 BLOCK_DT 의 비교 
 * 		POST_DATE가 클 경우 return true,
 * 		POST_DATE가 같거나 작을경우 False
 */
function checkPostDt() {
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    var blockDt=formObj.block_post.value;
	var curPostDt=(formObj.f_post_dt.value).replaceAll("-","");
	// 년도 비교 MMDDYYYY형식 주의
	if (blockDt.substr(4,4) > curPostDt.substr(4,4)) {
		return false;
	} else if (blockDt.substr(4,4) == curPostDt.substr(4,4)) {
		if (blockDt.substr(0,2) > curPostDt.substr(0,2)) {
			return false;
		} else if (blockDt.substr(0,2) == curPostDt.substr(0,2)) {
			if (blockDt.substr(2,2) > curPostDt.substr(2,2)) {
				return false;
			}
		}
	}
	return true;
}
//-----[20130401 OJG]-----
function getInvoicePayAmt(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			if (doc[1] * 1 > 0) {
				//alert(getLabel('ACC_MSG114'));	
				bPaid=true;
			}
		}
	} else {
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));
	}
}

function getDeleteInvoicePayAmt(reqVal) {
	var doc = getAjaxMsgXML(reqVal);

	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			if (doc[1] * 1 > 0) {
				alert(getLabel('ACC_MSG114'));	
				bPaid = true;
			}
		}
	} else {
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));
	}
}

//-----[20130401 OJG]-----
/*
//call : isZeroAmt("trf_cur_sum_amt");
//Zero 이면 true
function isZeroAmt(colname){
	var sheetObj=docObjects[0];
	var isRtn=false;
	for(var i=2;i<=sheetObj.LastRow();i++){
		// alert(sheetObj.CellValue(i,"ibflag"));
if(    sheetObj.GetCellValue(i, "del_chk") != "1"
&& sheetObj.GetCellValue(i, colname) == 0
&& (sheetObj.GetCellValue(i,"ibflag") == 'U' || sheetObj.GetCellValue(i,"ibflag") == 'I')
		){
				isRtn=true;
				break;
		}
	}
	return isRtn;
}
*/
function isZeroAmt(){
	var sheetObj=docObjects[0];
	var totRow = sheetObj.LastRow() + 1;
	var isZeroFlg="";
	// amount가 0인 것들은 삭제 처리하고 진행한다.
	for(var k=totRow-1; k > 1 ; k--){
if(     sheetObj.GetCellValue(k, 'inv_amt') == 0
&&  sheetObj.GetCellValue(k, 'del_chk') != '1'
			)
		  {
			if (isZeroFlg == "") {
				if (confirm(getLabel('ACC_MSG124'))) {
					// Confirm 인 경우 0 포함 저장
					isZeroFlg="N";
				} else {
					// Cancel 인 경우 0 저장 안함
					isZeroFlg="Y";
				}
			}
			if (isZeroFlg == "N" && sheetObj.GetCellValue(k, 'ibflag') == 'I') {
				/* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
				sheetObj.RowDelete(k, false);
			}
			if(isZeroFlg == "N" && (sheetObj.GetCellValue(k, 'ibflag') == 'U' || sheetObj.GetCellValue(k, 'ibflag') == 'R')){ //이미 저장된 데이터에 대해서 0인 데이터 삭제처리.
				sheetObj.SetCellValue(k, 'del_chk',1);
			}
		}
	}
}
//CURRENCY를 셋팅한다.
function setCurrency(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	for(var i=2; i<=sheetObj.LastRow();i++){
		var curr=formObj.f_curr_cd.value;
		// if(sheetObj.CellValue(i, "frt_check") == "1"){
		sheetObj.SetCellValue(i, "rat_curr_cd",curr);
		sheetObj.SetCellValue(i, "inv_aply_curr_cd",curr);
		sheetObj.SetCellValue(i, "inv_xcrt",1);
		// }
		/*
	sheetObj.SetCellValue(i, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(i, "qty")) * Number(sheetObj.GetCellValue(i, "ru")));
	sheetObj.SetCellValue(i, "vat_amt",Number(sheetObj.GetCellValue(i, "ru")) * (Number(sheetObj.GetCellValue(i, "vat_rt"))/100));
			if(curr=="KRW" || curr=="JPY"){
	sheetObj.SetCellValue(i, "inv_amt",Math.round( Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt"))));
	sheetObj.SetCellValue(i, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(i, "vat_rt"))/100) * Number(sheetObj.GetCellValue(i, "inv_xcrt"))));
			}else{
	sheetObj.SetCellValue(i, "inv_amt",Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt")));
	sheetObj.SetCellValue(i, "inv_vat_amt",Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(i, "vat_rt"))/100) * Number(sheetObj.GetCellValue(i, "inv_xcrt")));
			}
	sheetObj.SetCellValue(i, "inv_sum_amt",Number(sheetObj.GetCellValue(i, "inv_amt")) + Number(sheetObj.GetCellValue(i, "inv_vat_amt")));
		*/
	}
}
function getInvModiTms(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	// alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			if (doc[1] == formObj.f_modi_tms.value) {
				isInvModiTmsOk=false;
			} else {
				isInvModiTmsOk=true;
			}
		}
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
function CUSTOMER_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry = rtnVal.split("|");
		formObj.f_vendor_cd.value = rtnValAry[0];	//full_nm
		formObj.f_vendor_nm.value = rtnValAry[2];	//full_nm
		formObj.f_terms.value	  = rtnValAry[17];	//term_cd
		formObj.f_term_dt.value	  = rtnValAry[18];	//term_dt

		calcCreateTerms();
	}          
}
function INV_POPLIST(rtnVal){
		var formObj = document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_inv_no.value=rtnValAry[0];//inv_no
		formObj.f_inv_seq.value=rtnValAry[3];//inv_seq
		doWork("SEARCHLIST");
	}
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.f_inv_seq.value = getParam(url,"f_inv_seq");
	formObj.s_inv_no.value = getParam(url,"s_inv_no");
	
	doWork("SEARCHLIST");
}

function getTermDt(){
	var formObj = document.frm1;
	
	var s_type = "trdpCode";
	var s_code = formObj.f_vendor_cd.value;
	
	ajaxSendPost(getTermDtReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
}
	
/**
 * Terms 관린 코드조회
 */
function getTermDtReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');
				
			formObj.f_terms.value	  = masterVals[8];	//term_cd
			formObj.f_term_dt.value	  = masterVals[9];	//term_dt
		}
		else{
			formObj.f_terms.value = "";				
			formObj.f_term_dt.value = "";			
		}
	}
	else{
		//SEE_BMD_MSG43
	}
}

function enterInvDt(){
	var formObj=document.frm1;
	if(ComGetEvent("keycode") == 13){
		formObj.f_inv_dt.focus();
		formObj.f_inv_dt.blur();
	}
}

function changeInvDt(){
	var formObj=document.frm1;
	if(formObj.pre_inv_dt.value != formObj.f_inv_dt.value){
		dateRangeValid(formObj.f_inv_dt, 'Invoice Date');
		getTermDt();
		calcCreateTerms();
		formObj.pre_inv_dt.value = formObj.f_inv_dt.value;
	}
}