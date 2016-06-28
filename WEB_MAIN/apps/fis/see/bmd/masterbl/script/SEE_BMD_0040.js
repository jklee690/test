/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0020.js
*@FileTitle  :  HGBL등록
*@author     : PhiTran
*@version    : 1.0
*@since      : 2014/06/23
=========================================================*/
var tab3click="";
var tab4click="";
var tab5click="";
/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
var tab6click="";
/* #27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가 */
var tab7click="";
var hblListSheet=false;
var docListSheet=false;
var cntrListSheet=false;
var frtSdSheet=false;
var frtBcSheet=false;
var frtDcSheet=false;
var isInvStsOk=false;
var blDupl=false;
/* 
 * jsjang 2013.7.5 
 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건
 * Start 
 */        
var tab_pck_qty="";
var tab_meas="";
var tab_meas1="";
var tab_grs_wgt="";
var tab_grs_wgt1="";
/* 
 * jsjang 2013.7.5 
 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건
 * end 
 */  
//저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	var hblListParam=docObjects[1].GetSaveString(false);
	var docListParam=docObjects[3].GetSaveString(false);
	var cntrListParam=docObjects[2].GetSaveString(false);
	var sheetParam='';
	/* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리(flag) */
	isError=false;
	//alert(isError);
	if(hblListParam!=''){
	  	sheetParam+= '&';
	  	sheetParam+= hblListParam;
	  	hblListSheet=true;
	}
	if(docListParam!=''){
	  	sheetParam+= '&';
	  	sheetParam+= docListParam;
	  	docListSheet=true;
	}
	if(cntrListParam!=''){
		sheetParam+= '&';
    	sheetParam+= cntrListParam;
    	cntrListSheet=true;
    }
	var frtSdListParam=docObjects[4].GetSaveString(false);
	if(frtSdListParam!=''){
    	var rtnFlg=frCheckInpuVals(docObjects[4], '');
    	if(rtnFlg=='IV'){
    		isError=true;
    	}
    	frtSdListParam=docObjects[4].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtSdListParam;
    	frtSdSheet=true;
	}
    var frtBcListParam=docObjects[5].GetSaveString(false);
    if(frtBcListParam!=''){
    	var rtnFlg=frCheckInpuVals(docObjects[5], 'b_');
    	if(rtnFlg=='IV'){
    		isError=true;
    	}
    	frtBcListParam=docObjects[5].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtBcListParam;
    	frtBcSheet=true;
	}
    var frtDcListParam=docObjects[6].GetSaveString(false);
    if(frtDcListParam!=''){
		var rtnFlg=frCheckInpuVals(docObjects[6], 'dc_');
		if(rtnFlg=='IV'){
    		isError=true;
    	}
		frtDcListParam=docObjects[6].GetSaveString(false);
		sheetParam+= '&';
		sheetParam+= frtDcListParam;
		frtDcSheet=true;
	}
    /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리(flag) */
    if(isError == true)
    {
    	return true;
    }
    //sheetParam = isError
  return sheetParam;
}
var refCheck=true;
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    try{
		var formObj=document.frm1;
        switch(srcName) {
        	case "NEW":
        		// clearScreen();
        		// break;
        		doShowProcess();
        		var currLocUrl=this.location.href;
        		currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
        		currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
        		//parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
        		window.location.href = currLocUrl
           		break;
        	case "SAVE":
				formObj.intg_bl_seq.value=trim(formObj.intg_bl_seq.value);
				//LHK 20130828 #20146 [C&LG] Booking Confirmation 을 위한 Container 자동 q'ty add 기능 추가 및 자동 Container Summary Setting 기능 추가
				cntrInfoSet(docObjects[2]);
        		if(formObj.intg_bl_seq.value=="" || formObj.intg_bl_seq.value=="1"){
        			doWork("SAVE_ADD");
        		}
        		else{
        			doWork("SAVE_MODIFY");
        		}
        		break;
			case "SAVE_ADD":	//등록, 2011.10.27 Kim,Jin-Hyuk
//	        	if(blCheckInpuVals()){
//	        		if(confirm(getLabel('FMS_COM_CFMSAV'))){
//	        			formObj.f_cmd.value = ADD;
//	        			gridAdd(0);
//	        			docObjects[0].CellValue(1, 1) = 1;
//	        			
//	        			//save post date, office info
//	        			if(ofc_post_dt=="ETD"){
//            				formObj.post_dt.value = formObj.etd_dt_tm.value;
//            			}else if(ofc_post_dt=="ETA"){
//            				formObj.post_dt.value = formObj.eta_dt_tm.value;
//            			}
//	                	   
//	        			//doShowProcess();
//	        			//docObjects[0].ShowDebugMsg = true;
//	        			docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), false);
//	        			//docObjects[0].ShowDebugMsg = false;
//	        		}
//	        	}
				// #48893 - [BINEX] OPEN Invoice 관련 - MB/L 공백제거
				formObj.ref_no.value=trim(formObj.ref_no.value); 
				formObj.bl_no.value=trim(formObj.bl_no.value);
					
	        	if(blCheckInpuVals()){
					formObj.intg_bl_seq.value=trim(formObj.intg_bl_seq.value);
	        		if(formObj.intg_bl_seq.value==''){
	        			if(formObj.ref_no.value=='' || formObj.ref_no.value=="AUTO"){
	        				formObj.ref_no.value='';
	        				refCheck=true;
	        			}
	        			else{
	        				//ref_no가 자동채번이 아닌경우 저장되어 있는지 체크해야 함.
	        				ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+formObj.ref_no.value, './GateServlet.gsl');
	        			}
	        		}
	        		if(refCheck){
	        			ajaxSendPost(getMblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_bl_no='+formObj.bl_no.value, './GateServlet.gsl');        		   
	        		}
	        	}
		      	/* 
		      	 * jsjang 2013.7.5 
		      	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start 
		      	 */        
		      	cntr_ship_init();
		      	/* 
		      	 * jsjang 2013.7.5 
		      	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end 
		      	 */   			
	        	break;
           case "SAVE_MODIFY":	//등록
               formObj.f_cmd.value=MODIFY;
               //if(inpuValCheck(sheetObj, ADD)){
                   //전체 CellRow의 갯수
               //25559 MBL 중복 체크를 한다.
               blDupl=false;
               
               // #48893 - [BINEX] OPEN Invoice 관련 - MB/L 공백제거 
               formObj.ref_no.value=trim(formObj.ref_no.value);
               formObj.bl_no.value=trim(formObj.bl_no.value);
				
               if(frm1.h_bl_no.value!=frm1.bl_no.value){
            	   ajaxSendPost(getMblCheckNoEmpBL, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');        		   
               } 
               if (blDupl){
            	   return;
               }
               //20121130 OJG 
               if(blCheckInpuVals()){
            	   // /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다.
       	   		  setPost_date("U");
       	   		  if(confirm(getLabel('FMS_COM_CFMSAV'))){
                	   gridAdd(0);
                	   docObjects[0].SetCellValue(1, 1,1);
                	   formObj.f_bl_no.value=formObj.bl_no.value;
                	   //if(user_role_cd!="ADM"){
                		   //save post date, office info
                	   		// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다.
                	   		//confirm 전에 check
                	   	   /***	   
                	   	   if(ofc_post_dt=="ETD"){
                			   formObj.post_dt.value=formObj.etd_dt_tm.value;
                		   }
                		   else if(ofc_post_dt=="ETA"){
                			   formObj.post_dt.value=formObj.eta_dt_tm.value;
                		   }
                		   ***/
                	   //}
                	   //LHK REF_NO MODIFY 시 중복 Check
                	   ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+formObj.ref_no.value+'&mbl_seq='+formObj.intg_bl_seq.value, './GateServlet.gsl');
                	   if(refCheck){
                		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
                		   var sndParam=getSndParam();
                		   if(sndParam == true)	{	return false;	}
                		   doShowProcess();
                    	   //docObjects[0].ShowDebugMsg = true;
                		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
                    	   docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, false);
                    	   //docObjects[0].ShowDebugMsg = false;
                	   }
                   }
                }
               //}
               /* 
		      	 * jsjang 2013.7.5 
		      	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start 
		      	 */        
		      	cntr_ship_init();
		      	/* 
		      	 * jsjang 2013.7.5 
		      	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end 
		      	 */           
               break;
           case "CLOSE_MODIFY":	//등록
        	   formObj.f_cmd.value=COMMAND10;
        	   if(confirm(getLabel('FMS_COM_CFMSAV'))){
        		   gridAdd(0);
        		   docObjects[0].SetCellValue(1, 1,1);
        		   formObj.f_bl_no.value=formObj.bl_no.value;
        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
        		   var sndParam=getSndParam();
        		   if(sndParam == true)	{	return false;	}        		   
        		   doShowProcess();
        		   //docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), false);
        		   docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, false);
        	   }
        	   /* 
		      	 * jsjang 2013.7.5 
		      	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start 
		      	 */        
		      	cntr_ship_init();
		      	/* 
		      	 * jsjang 2013.7.5 
		      	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end 
		      	 */           	   
        	   break;
           case "FINAL_MODIFY":	//등록
        	   formObj.f_cmd.value=COMMAND11;
        	   if(confirm(getLabel('FMS_COM_CFMSAV'))){
        		   gridAdd(0);
        		   docObjects[0].SetCellValue(1, 1,1);
        		   formObj.f_bl_no.value=formObj.bl_no.value;
        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
        		   var sndParam=getSndParam();
        		   if(sndParam == true)	{	return false;	}        		   
        		   doShowProcess();
        		   //docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), false);
        		   docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, false);
        	   }
        	   /* 
		      	 * jsjang 2013.7.5 
		      	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start 
		      	 */        
		      	cntr_ship_init();
		      	/* 
		      	 * jsjang 2013.7.5 
		      	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end 
		      	 */           	   
        	   break;
           case "REMOVE":	//삭제
        	   ajaxSendPost(doRmvSrInfo, 'reqVal', '&goWhere=aj&bcKey=getHblClsChk&biz_clss_cd=M&intg_bl_seq='+formObj.intg_bl_seq.value, './GateServlet.gsl');
        	   break;
           case "DOCFILE":	//첨부파일
       			var reqParam='?intg_bl_seq='+formObj.intg_bl_seq.value;
       			/**  Document List ==> Common Memo 연동 파라미터 (S) */
       			reqParam += '&palt_mnu_cd=OEM';
       			reqParam += '&opr_no='+formObj.f_ref_no.value;
       			/**  Document List ==> Common Memo 연동 파라미터 (E) */
       			reqParam += '&openMean=SEARCH01';
      	   		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDoc', 806, 450, "scroll:no;status:no;help:no;");
      	   		break;
      	   		// Email 전송로직 삭제 Bug 10366
//           case "SNDEML":	//Email전송
//          		var reqParam = '?intg_bl_seq='+formObj.intg_bl_seq.value;
//             	
//          		reqParam += '&openMean=SEARCH01';
//         	   	popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
//       	   
//         	   	break;
           case "SEARCHLIST":	//조회
			   formObj.f_ref_no.value=trim(formObj.f_ref_no.value);
			   formObj.f_bl_no.value=trim(formObj.f_bl_no.value);
			   formObj.f_lnr_bkg_no.value=trim(formObj.f_lnr_bkg_no.value);
        	   if(formObj.f_ref_no.value==''&&formObj.f_bl_no.value==''&&formObj.f_lnr_bkg_no.value==''){
        		   //Please enter more than one Search Condition!
        		   alert(getLabel('FMS_COM_ALT014'));
        		   formObj.f_ref_no.focus();
        		   return;
        	   }
        	   else{
        		   
        		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
        		   
                   formObj.f_cmd.value=SEARCHLIST;
                   submitForm(SEARCHLIST);
            	   
        	   }
        	   break;
           case "SEARCHLIST01":	//조회
			   formObj.intg_bl_seq.value=trim(formObj.intg_bl_seq.value);
			   formObj.f_bl_no.value=trim(formObj.f_bl_no.value);
			   formObj.f_ref_no.value=trim(formObj.f_ref_no.value);
			   formObj.f_lnr_bkg_no.value=trim(formObj.f_lnr_bkg_no.value);
        	   if(formObj.intg_bl_seq.value!=''){
	        	   if(formObj.f_bl_no.value==''&&formObj.f_ref_no.value==''&&formObj.f_lnr_bkg_no.value==''){
	        		   alert(getLabel('FMS_COM_ALT014'));
	        		   return;
	        	   }
	        	   else{
	                   formObj.f_cmd.value=SEARCHLIST01;
	            	   //doShowProcess();
 	            	   docObjects[1].DoSearch("SEE_BMD_0040_1GS.clt", FormQueryString(frm1) );
	        	   }
        	   }
        	   break;
           case "SEARCH_DOC":	//첨부문서 조회
			   formObj.intg_bl_seq.value=trim(formObj.intg_bl_seq.value);
        	   if(formObj.intg_bl_seq.value!=''){
	        	   //Doccument File List 조회
		   	       formObj.f_cmd.value=SEARCHLIST02;
 		   	 	   docObjects[3].DoSearch("./SEE_BMD_0021_1GS.clt", FormQueryString(frm1) );
        	   }	   	 	   
        	   break;
           case "SEARCH_CNTR":	//첨부문서 조회
			   formObj.intg_bl_seq.value=trim(formObj.intg_bl_seq.value);
        	   if(formObj.intg_bl_seq.value!=''){
	   		      //Doccument File List 조회
	   	          formObj.f_cmd.value=SEARCHLIST03;
 	   	 	      docObjects[2].DoSearch("./SEE_BMD_0040_2GS.clt", FormQueryString(frm1) );
        	   }	   	 	   
        	   break;
           case "MFPRINT":
			   formObj.bl_no.value=trim(formObj.bl_no.value);
        	   if(formObj.bl_no.value==""){
        		   //Please retrieve data.
        		   alert(getLabel('FMS_COM_ALT029'));
        		   return;
        	   }
        	   var param='title=Sea Consolidated Cargo Manifest';
        	   param += '&cmd_type=46';
        	   param += '&bl_no=' + formObj.bl_no.value;
        	   popGET('RPT_PRN_0050.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
        	   break;
           case "PRINT":
			   formObj.intg_bl_seq.value=trim(formObj.intg_bl_seq.value);
        	   if(formObj.intg_bl_seq.value == ""){
        		   //Please retrieve data.
        		   alert(getLabel('FMS_COM_ALT029'));
          	   }
        	   else{
	    			formObj.file_name.value='SR_SEA.mrd';
	            	formObj.title.value='Ocean Export SR';
	    			//Parameter Setting
	            	var param='[' + formObj.intg_bl_seq.value + ']';		// [1]
	            	param += '[' + usrPhn + ']';		// [2]
					param += '[' + usrFax + ']';		// [3]
					param += '[' + usrEml + ']';		// [4]
	            	formObj.rd_param.value=param;
	    			formObj.mailTitle.value='Master Set / Shipping Request [MBL No : ' + formObj.bl_no.value + ']';;
	    			formObj.mailTo.value=mailTo;
	    			formObj.rpt_biz_tp.value="OEM";
	    			formObj.rpt_biz_sub_tp.value="BL";
	    			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
          	   }
        	   break;
           //#21635 oyh  shipping document report 출력  
           case "S_DOC":
        		var sheetObj3=docObjects[3];	
	   	 		if(sheetObj3.SearchRows()> 0){
	   	 			var formObj=document.frm1;
	   	 			formObj.file_name.value='doc_list.mrd';
	   	 			formObj.title.value='Document List';
	   	 			//Parameter Setting
	   	 			var param='[' + formObj.intg_bl_seq.value + ']';			// [1]
	   	 			param += '[OEM]'; 											// [2] MASTER/HOUSE/OTH 여부
	   	 			param += '[' + formObj.bl_no.value + ']';					// [3] MBL_NO
	   	 			param += '[' + formObj.user_id.value + ']';					// [4]
	   	 			formObj.rd_param.value=param;
	   	 			formObj.mailTitle.value='Master Set / Shipping Request [MBL No : ' + formObj.bl_no.value + ']';;
	   	 			formObj.mailTo.value=mailTo;
	   	 			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   	 		}
        	   break;
      	   //2010.12.22 김진혁 추가, MBL도 HBL과 같은 조건으로 Copy 버튼 추가
           case "COPY":	//조회
        	   
        	   //BL_COPY COPY시 컨펌메시지 없이 바로 Submit후 frt Check화면을 보여준다
        	   frm1.f_cmd.value=COMMAND02;
        	   doShowProcess();
        	   frm1.submit();
        	   
//        	   if(confirm(getLabel('FMS_COM_CFMCPY'))){
//        		   formObj.f_cmd.value=COMMAND02;
////            	   doShowProcess();
////            	   formObj.submit();
//        		   submitForm(COMMAND02);
//        	   }
        	   break;
           case "HBLADD":	//등록
        	   var keyYn='';
        	   if(formObj.bl_sts_cd.value!='NA'){
        		   keyYn='Y';
        	   }
               var paramArr=new Array(1);
			   var curHblStr='';
			   var divStr='^';
			   var clsStr=';;';
			   //현재 BLSEQ가 등록되었는지를 확인함
			   for(var i=1; i< docObjects[1].LastRow() + 1; i++){
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_bkg_no');
				   curHblStr+= divStr; 
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_bl_no');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_act_shipper');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_obrd_dt_tm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_trnk_vsl');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_trnk_voy');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pol_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pol_nod_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pol_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pod_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pod_nod_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pod_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_del_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_del_nod_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_del_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_rep_cmdt_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_rep_cmdt_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_grs_wgt');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_grs_wgt_ut_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_act_wgt');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_act_wgt_ut_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_meas');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_meas_ut_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pck_qty');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pck_ut_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pck_ut_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_intg_bl_seq');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_ibflag');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_lnr_trdp_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_lnr_trdp_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_shpr_trdp_nm');
				   curHblStr+= clsStr;
			   }
			   paramArr[0]=curHblStr;
        	   var rtnVal =  ComOpenWindow('./SEE_BMD_0031.clt',  paramArr,  "scroll:yes;status:no;help:no;dialogWidth:756px;dialogHeight:670px" , true);
        	   //HBL ADD이후
        	   if(rtnVal!=''&&typeof(rtnVal)!='undefined'){
	        	   var rtnArr=rtnVal.split(';;');
	        	   var isBegin=true;
	        	   var savedHbl='';
	        	   //기존 HBL목록을 초기화
	             	if(docObjects[1].LastRow() + 1>1){
	            		var totRow=docObjects[1].LastRow();
	            		for(var i=totRow; 0 < i; i--){
if(docObjects[1].GetCellValue(i, 'hbl_ibflag')!='R'){
	            				docObjects[1].RowDelete(i, false);
	            			}
	            			else{
savedHbl+= docObjects[1].GetCellValue(i, 'hbl_bl_no');
	            				savedHbl+= ':';
	            			}
	            		}
	            	}
	               //현재 선택된 HBL정보를 표시함 
				   var intRows=docObjects[1].LastRow() + 1;
				   var newRow=intRows;
				   var dispArr;
				   var totPck=0;
				   var totMeas=0;
				   var totActWgt=0;
				   var totWgt=0;
				   var blSeq='';
				   var firstObrdDt=0;
	        	   for(var i=0; i < rtnArr.length; i++){
	        		   var hblArr=rtnArr[i].split('^');
	        		   if(rtnArr[i]!=''){
	        			   //BL번호가 저장되어있지 않음경우
	        			   if(savedHbl.indexOf(hblArr[1]+':')==-1){
	        				   //화면표시
	        				   if(i==0){
	        					   dispArr=hblArr;
	        					   firstObrdDt=hblArr[3];
	        				   }
	        				   else{
	        					   if(firstObrdDt==0){
	        						   firstObrdDt=hblArr[3];   
	        					   //가장빠른 Onboard 일자를 가지고 온다
	        					   }
	        					   else if(firstObrdDt>hblArr[3]){
	        						   firstObrdDt=hblArr[3];   
	        					   }
	        				   }
							    docObjects[1].DataInsert(newRow);
								docObjects[1].SetCellValue(intRows, 'hbl_bkg_no',hblArr[0]);
								docObjects[1].SetCellValue(intRows, 'hbl_bl_no',hblArr[1]);
								docObjects[1].SetCellValue(intRows, 'hbl_act_shipper',hblArr[2]);
								docObjects[1].SetCellValue(intRows, 'hbl_obrd_dt_tm',hblArr[3]);
								docObjects[1].SetCellValue(intRows, 'hbl_trnk_vsl',hblArr[4]);
								docObjects[1].SetCellValue(intRows, 'hbl_trnk_voy',hblArr[5]);
								docObjects[1].SetCellValue(intRows, 'hbl_pol_cd',hblArr[6]);
								docObjects[1].SetCellValue(intRows, 'hbl_pol_nod_cd',hblArr[7]);
								docObjects[1].SetCellValue(intRows, 'hbl_pol_nm',hblArr[8]);
								docObjects[1].SetCellValue(intRows, 'hbl_pod_cd',hblArr[9]);
								docObjects[1].SetCellValue(intRows, 'hbl_pod_nod_cd',hblArr[10]);
								docObjects[1].SetCellValue(intRows, 'hbl_pod_nm',hblArr[11]);
								docObjects[1].SetCellValue(intRows, 'hbl_del_cd',hblArr[12]);
								docObjects[1].SetCellValue(intRows, 'hbl_del_nod_cd',hblArr[13]);
								docObjects[1].SetCellValue(intRows, 'hbl_del_nm',hblArr[14]);
								docObjects[1].SetCellValue(intRows, 'hbl_rep_cmdt_cd',hblArr[15]);
								docObjects[1].SetCellValue(intRows, 'hbl_rep_cmdt_nm',hblArr[16]);
								docObjects[1].SetCellValue(intRows, 'hbl_grs_wgt',hblArr[17]);
								docObjects[1].SetCellValue(intRows, 'hbl_grs_wgt_ut_cd',hblArr[18]);
								docObjects[1].SetCellValue(intRows, 'hbl_act_wgt',hblArr[19]);
								docObjects[1].SetCellValue(intRows, 'hbl_act_wgt_ut_cd',hblArr[20]);
								docObjects[1].SetCellValue(intRows, 'hbl_meas',hblArr[21]);
								docObjects[1].SetCellValue(intRows, 'hbl_meas_ut_cd',hblArr[22]);
								docObjects[1].SetCellValue(intRows, 'hbl_pck_qty',hblArr[23]);
								docObjects[1].SetCellValue(intRows, 'hbl_pck_ut_cd',hblArr[24]);
								docObjects[1].SetCellValue(intRows, 'hbl_pck_ut_nm',hblArr[25]);
								docObjects[1].SetCellValue(intRows, 'hbl_intg_bl_seq',hblArr[26]);
								docObjects[1].SetCellValue(intRows, 'hbl_lnr_trdp_cd',hblArr[27]);
								docObjects[1].SetCellValue(intRows, 'hbl_lnr_trdp_nm',hblArr[28]);
								docObjects[1].SetCellValue(intRows, 'hbl_shpr_trdp_nm',hblArr[29]);
								blSeq+= hblArr[26];
								blSeq+= ',';
								totWgt=getSumFloat(totWgt, hblArr[17]);
								totActWgt=getSumFloat(totActWgt, hblArr[19]);
								totMeas=getSumFloat(totMeas,hblArr[21]);
								totPck=getSumFloat(totPck, hblArr[23]);
							   if(isBegin){
								   if(formObj.intg_bl_seq.value==''){
									   shpAddr+= '\n';
									   shpAddr+= hblArr[29];
									   formObj.shpr_trdp_addr.value=shpAddr;
								   }
								   isBegin=false;
							   }
							   newRow++;
							   intRows++;
	        			   }
	        		   }
	        	   }
	        	   if(typeof(dispArr)!='undefined'&&newRow>0){
	        		   dispArr[3]=mkStrToDate(firstObrdDt);
	        		   dispArr[23]=strToFloatByNDecimalTp(totPck, 100);
	        		   dispArr[17]=strToFloatByNDecimalTp(totWgt, 100);
	        		   dispArr[19]=strToFloatByNDecimalTp(totActWgt, 100);
	        		   dispArr[21]=strToFloatByNDecimalTp(totMeas,10000);
	        		   //화면에 기본값 표시
	        		   setDfltVal(dispArr);
	        		   //Mark/Description 표시
//	        		   if(blSeq!=''){
//	        			   ajaxSendPost(autoMrkDesc, 'reqVal', '&goWhere=aj&bcKey=searchMrkDesc&intg_bl_seq='+blSeq, './GateServlet.gsl');
//	        		   }
	        	   }
				//	formObj.act_wgt.value    = hblArr[19];
				//	formObj.meas.value       = hblArr[21];
				//	formObj.pck_qty.value    = hblArr[23];
        	   }
        	   break;
           	case "SEARCH_FRT":	//Freight 조회
          		if(formObj.bl_sts_cd.value!='NA'){
          			searchGrid(6);
          			searchGrid(7);
          			searchGrid(8);
          			searchGrid(9);
          		}
          		break;
           	case "GOTOACCT":
				formObj.bl_no.value=trim(formObj.bl_no.value);
				formObj.ref_no.value=trim(formObj.ref_no.value);
           		if(formObj.bl_no.value!='' || formObj.ref_no.value!=''){
           			var paramStr="./ACC_INV_0040.clt?";
           			/* #23987, s_mbl_no 링크제거 jsjang 2013.11.25 */
           			//24842 oyh Mbl에서 AP를 눌렀을 경우 Vendor inv no에 MBLno가 세팅안됨 으로 기존 로직으로 재수정
		   		   	paramStr+= "s_mbl_no=" + formObj.bl_no.value;
           			paramStr+= "&s_intg_bl_seq=" + formObj.intg_bl_seq.value;
           			paramStr+= "&s_ref_no=" + formObj.ref_no.value;
           			//#22112 Billing Carrier 추가 
           			paramStr+= "&s_carr_trdp_cd=" + formObj.carr_trdp_cd.value;
           			paramStr+= "&s_carr_trdp_nm=" + formObj.carr_trdp_nm.value;
           			parent.mkNewFrame('Invoice List', paramStr);
           		}
           		break;
           	case "HBL_ENTRY":
				formObj.ref_no.value=trim(formObj.ref_no.value);
           		if(formObj.ref_no.value!=''){
           			var paramStr="./SEE_BMD_0020.clt?";
           			paramStr+= "f_mbl_ref_no=" + formObj.ref_no.value;
           			parent.mkNewFrame('Booking & HBL', paramStr);
           		}
           		break;
           	case "PROFIT_REPORT":
				var reqParam='?intg_bl_seq=' + formObj.intg_bl_seq.value;
					reqParam += '&mbl_no=' + formObj.bl_no.value;
					reqParam += '&ref_no=' + formObj.ref_no.value;
					reqParam += '&air_sea_clss_cd=' + "S";
					reqParam += '&bnd_clss_cd=' + "O";
					reqParam += '&biz_clss_cd=' + "M";
				popGET('RPT_PRN_0180.clt'+reqParam, '', 1130, 750, "scroll:yes;status:no;help:no;");
		   	 	break;	
		   	/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
            case "SEARCH_JB":	//Job template & History
	     	   if(frm1.bl_sts_cd.value!='NA'){
	     		//처리내역( Job temlate에 따라서)
	     		 searchGrid(10);
	     	   }
     	   		break;	
            // #27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
            case "SEARCH_WO":	//WORK ORDER 조회
         	   if(frm1.bl_sts_cd.value!='NA'){
 				   //Container List 조회
         		   searchGrid(11);
         	   }
         	   break;
            case "WORKORDER":	//Work Order 화면호출
 	           var param='f_intg_bl_seq=' + frm1.intg_bl_seq.value;
 		   		   param += '&air_sea_clss_cd=S'; 
 		   		   param += '&bnd_clss_cd=O';
 		   		   param += '&biz_clss_cd=M';
                var paramStr="./AIC_WOM_0010.clt?f_cmd="+SEARCH01+"&s_type=B&"+param;
                parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
                break;
                
			case "PACKAGE_LABEL":
				if (frm1.intg_bl_seq.value != "") {
					var reqParam = '';
					reqParam += '?s_intg_bl_seq='+ frm1.intg_bl_seq.value;
					reqParam += '&biz_clss_cd=' + "M";
					reqParam += '&label_type=' + "01";
					popGET('SEE_BMD_0061.clt' + reqParam, '', 600, 280,"scroll:yes;status:no;help:no;");
				}
				break;
				
			case "PACKAGE_LABEL2":
				if (frm1.intg_bl_seq.value != "") {
					var reqParam = '';
					reqParam += '?s_intg_bl_seq='+ frm1.intg_bl_seq.value;
					reqParam += '&biz_clss_cd=' + "M";
					reqParam += '&label_type=' + "02";
					popGET('SEE_BMD_0061.clt' + reqParam, '', 600, 280,"scroll:yes;status:no;help:no;");
				}
				break;
        }
    }
    catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e); 
        }
    }
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_ref_no.value = getParam(url,"f_ref_no");
	formObj.f_bl_no.value = getParam(url,"f_bl_no");
	formObj.f_lnr_bkg_no.value = getParam(url,"f_lnr_bkg_no");
	
	doWork('SEARCHLIST');
}

function setFieldValue(obj, value){
	if($(obj).is("select") || $(obj).is("input:radio") || $(obj).is("input:checkbox")){
		if(value != ""){
			$(obj).val(value);
		}
	}else {
		$(obj).val(value);
	}
}
function submitForm(cmd){
	var formObj=document.frm1;
	doShowProcess();
	formObj.f_cmd.value=cmd;
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./SEE_BMD_0040AJ.clt",
		   dataType: 'xml',
		   data: $(formObj).serialize(),
		   success: function(data){
			   setFieldValue( formObj.bl_sts_cd, $('bl_sts_cd',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.f_intg_bl_seq, $('f_intg_bl_seq',data).text());
			   setFieldValue( formObj.f_hbl_intg_bl_seq, $('f_hbl_intg_bl_seq',data).text());
			   setFieldValue( formObj.mk_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.h_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.sel_ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.org_lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.org_post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());
			   setFieldValue( formObj.f_ref_no, $('f_ref_no',data).text());
			   setFieldValue( formObj.f_bl_no, $('f_bl_no',data).text());
			   setFieldValue( formObj.f_lnr_bkg_no, $('f_lnr_bkg_no',data).text());
			   setFieldValue( formObj.ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.ref_ofc_cd, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.h_ref_ofc_cd, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.hbl_tp_cd, $('hbl_tp_cd',data).text());
			   setFieldValue( formObj.mrn, $('mrn',data).text());
			   setFieldValue( formObj.post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.sub_bl_no, $('sub_bl_no',data).text());
			   setFieldValue( formObj.itn_no, $('itn_no',data).text());
			   setFieldValue( formObj.sc_no, $('sc_no',data).text());
			   setFieldValue( formObj.cust_ref_no, $('cust_ref_no',data).text());
			   setFieldValue( formObj.shpr_trdp_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.shpr_trdp_cd, $('shpr_trdp_cd',data).text());
			   setFieldValue( formObj.shpr_trdp_addr, $('shpr_trdp_addr',data).text());
			   setFieldValue( formObj.cnee_trdp_cd, $('cnee_trdp_cd',data).text());
			   setFieldValue( formObj.cnee_trdp_nm, $('cnee_trdp_nm',data).text());
			   setFieldValue( formObj.cnee_trdp_addr, $('cnee_trdp_addr',data).text());
			   setFieldValue( formObj.ntfy_trdp_cd, $('ntfy_trdp_cd',data).text());
			   setFieldValue( formObj.ntfy_trdp_nm, $('ntfy_trdp_nm',data).text());
			   setFieldValue( formObj.ntfy_trdp_addr, $('ntfy_trdp_addr',data).text());
			   setFieldValue( formObj.agent_trdp_cd, $('agent_trdp_cd',data).text());
			   setFieldValue( formObj.agent_trdp_nm, $('agent_trdp_nm',data).text());
			   setFieldValue( formObj.agent_trdp_addr, $('agent_trdp_addr',data).text());
			   setFieldValue( formObj.prnr_trdp_cd2, $('prnr_trdp_cd2',data).text());
			   setFieldValue( formObj.prnr_trdp_nm2, $('prnr_trdp_nm2',data).text());
			   setFieldValue( formObj.prnr_trdp_addr2, $('prnr_trdp_addr2',data).text());
			   setFieldValue( formObj.prnr_trdp_cd, $('prnr_trdp_cd',data).text());
			   setFieldValue( formObj.prnr_trdp_nm, $('prnr_trdp_nm',data).text());
			   setFieldValue( formObj.prnr_trdp_addr, $('prnr_trdp_addr',data).text());
			   setFieldValue( formObj.lnr_trdp_cd, $('lnr_trdp_cd',data).text());
			   setFieldValue( formObj.lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			   setFieldValue( formObj.trnk_vsl_cd, $('trnk_vsl_cd',data).text());
			   setFieldValue( formObj.trnk_vsl_nm, $('trnk_vsl_nm',data).text());
			   setFieldValue( formObj.trnk_voy, $('trnk_voy',data).text());
			   setFieldValue( formObj.etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.org_etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.org_eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.etd_por_tm, $('etd_por_tm',data).text());
			   setFieldValue( formObj.carr_trdp_cd, $('carr_trdp_cd',data).text());
			   setFieldValue( formObj.carr_trdp_addr, $('carr_trdp_addr',data).text());
			   setFieldValue( formObj.carr_trdp_nm, $('carr_trdp_nm',data).text());
			   setFieldValue( formObj.por_cd, $('por_cd',data).text());
			   setFieldValue( formObj.por_nod_cd, $('por_nod_cd',data).text());
			   setFieldValue( formObj.por_nm, $('por_nm',data).text());
			   setFieldValue( formObj.pol_cd, $('pol_cd',data).text());
			   setFieldValue( formObj.pol_nod_cd, $('pol_nod_cd',data).text());
			   setFieldValue( formObj.pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.pod_cd, $('pod_cd',data).text());
			   setFieldValue( formObj.pod_nod_cd, $('pod_nod_cd',data).text());
			   setFieldValue( formObj.pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.del_cd, $('del_cd',data).text());
			   setFieldValue( formObj.del_nod_cd, $('del_nod_cd',data).text());
			   setFieldValue( formObj.del_nm, $('del_nm',data).text());
			   setFieldValue( formObj.fnl_dest_loc_cd, $('fnl_dest_loc_cd',data).text());
			   setFieldValue( formObj.fnl_dest_nod_cd, $('fnl_dest_nod_cd',data).text());
			   setFieldValue( formObj.fnl_dest_loc_nm, $('fnl_dest_loc_nm',data).text());
			   setFieldValue( formObj.rcv_wh_cd, $('rcv_wh_cd',data).text());
			   setFieldValue( formObj.fnl_dest_nod_cd, $('fnl_dest_nod_cd',data).text());
			   setFieldValue( formObj.rcv_wh_nm, $('rcv_wh_nm',data).text());
			   setFieldValue( formObj.cntr_info, $('cntr_info',data).text());
			   setFieldValue( formObj.pu_trdp_cd, $('pu_trdp_cd',data).text());
			   setFieldValue( formObj.pu_trdp_nm, $('pu_trdp_nm',data).text());
			   setFieldValue( formObj.frt_term_cd, $('frt_term_cd',data).text());
			   setFieldValue( formObj.h_frt_term_cd, $('frt_term_cd',data).text());
			   setFieldValue( formObj.shp_mod_cd, $('shp_mod_cd',data).text());
			   setFieldValue( formObj.fm_svc_term_cd, $('fm_svc_term_cd',data).text());
			   setFieldValue( formObj.to_svc_term_cd, $('to_svc_term_cd',data).text());
			   setFieldValue( formObj.curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.h_curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.obl_tp_cd, $('obl_tp_cd',data).text());
			   setFieldValue( formObj.h_obl_tp_cd, $('obl_tp_cd',data).text());
			   setFieldValue( formObj.broker_rt, $('broker_rt',data).text());
			   setFieldValue( formObj.profit_share, $('profit_share',data).text());
			   setFieldValue( formObj.cut_off_dt, $('cut_off_dt',data).text());
			   setFieldValue( formObj.cut_off_tm, $('cut_off_tm',data).text());
			   setFieldValue( formObj.rail_cut_off_dt, $('rail_cut_off_dt',data).text());
			   setFieldValue( formObj.rail_cut_off_tm, $('rail_cut_off_tm',data).text());
			   setFieldValue( formObj.doc_cut_off_dt, $('doc_cut_off_dt',data).text());
			   setFieldValue( formObj.doc_cut_off_tm, $('doc_cut_off_tm',data).text());
			   setFieldValue( formObj.pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.grs_wgt, $('grs_wgt',data).text());
			   setFieldValue( formObj.grs_wgt1, $('grs_wgt1',data).text());
			   setFieldValue( formObj.meas, $('meas',data).text());
			   setFieldValue( formObj.meas1, $('meas1',data).text());
			   setFieldValue( formObj.bl_iss_dt, $('bl_iss_dt',data).text());
			   setFieldValue( formObj.opr_usrid, $('issued_by',data).text());
			   setFieldValue( formObj.proc_usrnm, $('proc_usrnm',data).text());
			   setFieldValue( formObj.opr_usrnm, $('proc_usrnm',data).text());
			   setFieldValue( formObj.opr_ofc_cd, $('proc_ofccd',data).text());
			   setFieldValue( formObj.opr_dept_cd, $('proc_dept_cd',data).text());
			   setFieldValue( formObj.sls_ofc_cd, $('sls_ofc_cd',data).text());
			   setFieldValue( formObj.sls_usrid, $('sls_usrid',data).text());
			   setFieldValue( formObj.sls_usr_nm, $('sls_usr_nm',data).text());
			   setFieldValue( formObj.sls_dept_cd, $('sls_dept_cd',data).text());
			   setFieldValue( formObj.sad_txt, $('sad_txt',data).text());
			   setFieldValue( formObj.mk_grs_wgt, $('mk_grs_wgt',data).text());
			   setFieldValue( formObj.mk_grs_wgt1, $('mk_grs_wgt1',data).text());
			   setFieldValue( formObj.mk_meas, $('mk_meas',data).text());
			   setFieldValue( formObj.mk_meas1, $('mk_meas1',data).text());
			   setFieldValue( formObj.mk_txt, $('mk_txt',data).text());
			   setFieldValue( formObj.desc_txt, $('desc_txt',data).text());
			   setFieldValue( formObj.rmk, $('rmk',data).text());
			   
			   setFieldValue( formObj.ctrb_ofc_cd, $('ctrb_ofc_cd',data).text());
			   setFieldValue( formObj.ctrb_dept_cd, $('ctrb_dept_cd',data).text());
			   setFieldValue( formObj.ctrb_ratio_yn, $('ctrb_ratio_yn',data).text());
			   setFieldValue( formObj.ctrb_mgn, $('ctrb_mgn',data).text());
			   
			   //setFieldValue( formObj.xcrtDt, $('obrd_dt_tm',data).text());
			   var obrddttm = $('obrd_dt_tm',data).text().replaceAll('-','');
			   setFieldValue( formObj.xcrtDt, obrddttm);
			   
			   tab3click="";
			   tab4click="";
			   tab5click="";
			   tab6click="";
			   tab7click="";
			   
			   doBtnAuthority(attr_extension);
			   setOfficeData();
			   loadPage();
			   btnLoad();
			   loadData();
			   
			   
			   doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("system error!");
		   }
		 });
}
function dispData(reqVal){
	alert(reqVal);
}
/* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start */ 
function cntr_ship_init()
{
  	var formObj=document.frm1;
  	tab_pck_qty=formObj.pck_qty.value;
  	tab_meas=formObj.meas.value;
  	tab_meas1=formObj.meas1.value;
  	tab_grs_wgt=formObj.grs_wgt.value;
  	tab_grs_wgt1=formObj.grs_wgt1.value;
}
/* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end */ 
/**
 * 화면에 기본값 Display
 */
function setDfltVal(hblArr){
	frm1.etd_dt_tm.value=hblArr[3];
	frm1.lnr_trdp_cd.value=hblArr[27];  
	frm1.lnr_trdp_nm.value=hblArr[28];  
	frm1.pol_cd.value=hblArr[6];       
	frm1.pol_nm.value=hblArr[8];       
	frm1.pod_cd.value=hblArr[9];       
	frm1.pod_nm.value=hblArr[11];       
	frm1.del_cd.value=hblArr[12];       
	frm1.del_nm.value=hblArr[14];       
	frm1.trnk_vsl_nm.value=hblArr[4];     
	frm1.trnk_voy.value=hblArr[5];     
	frm1.grs_wgt.value=hblArr[17];      
	frm1.grs_wgt_ut_cd.value=hblArr[18];
	weightChange(frm1.grs_wgt);
	frm1.meas.value=hblArr[21];         
	frm1.meas_ut_cd.value=hblArr[22];
	cbmChange(frm1.meas);
	frm1.pck_qty.value=hblArr[23];      
	frm1.pck_ut_cd.value=hblArr[24];    
}
/**
 * 화면초기화
 */
function clearScreen(){
	btnPrint.style.display='none';
	doShowProcess();
    frm1.f_cmd.value='';
    frm1.submit();
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	if(errMsg==''&&frm1.intg_bl_seq.value==''){
frm1.f_intg_bl_seq.value=docObjects[0].GetCellValue(1, "sv_intg_bl_seq");
frm1.intg_bl_seq.value=docObjects[0].GetCellValue(1, "sv_intg_bl_seq");
frm1.bl_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bl_sts_cd");
		//frm1.sr_no.value        = docObjects[0].CellValue(1, "sv_sr_no");
		//frm1.f_sr_no.value      = frm1.sr_no.value;
frm1.f_bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
frm1.ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
frm1.f_ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
//		frm1.sel_ref_no.value       = docObjects[0].CellValue(1, "sv_ref_no");
//		frm1.ref_no.className = 'search_form-disable';
//		frm1.ref_no.readOnly  = true;
		//etd가 변경되었을 수 있으므로 etd 날짜를 post에 덮어쓴다.
		//LHK 20131028 왜 저장 후 etd date 를 update 하는지 알 수 없슴, post date 로직은 ETD 만 적용되는 것이 아님, 저장된 post date 를 보여주도록 수정함. 
		//frm1.post_dt.value = frm1.etd_dt_tm.value;
	}
	   
	// 처리후에 org_etd_dt_tm/org_eta_dt_tm 을  설정해준다. 
	frm1.org_etd_dt_tm.value=frm1.etd_dt_tm.value;
	frm1.org_eta_dt_tm.value=frm1.eta_dt_tm.value;
	
	//25559 중복 체크 
	frm1.h_bl_no.value=frm1.bl_no.value;
frm1.ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
frm1.f_ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
	//LHK, 20131028 setPost_date(save_flag) 추가 비교 로직으로 인해 저장 후 org_post_dt reset
	frm1.org_post_dt.value=frm1.post_dt.value;
	if(hblListSheet){
		doWork('SEARCHLIST01');		
	}
	if(docListSheet){
		doWork('SEARCH_DOC');
	}
	if(cntrListSheet){
		doWork('SEARCH_CNTR');
	}
	if(frtSdSheet){
		searchGrid(7);
	}
	if(frtBcSheet){
		searchGrid(8);
	}
	if(frtDcSheet){
		searchGrid(9);
	}
	//버튼 초기화
	btnLoad();
	//"Save success! ");
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}
function gridAdd(objIdx){
 	//var intRows=docObjects[objIdx].LastRow() + 1;
	//intRows--;
	docObjects[objIdx].DataInsert(-1);
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat, obj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
            cal.select(obj, 'MM-dd-yyyy');
        break;
    }
}
/**
 * 파일목록 조회시. 3번째 Sheet를 리턴함.
 */
function getSelectedFiles(){
	return docObjects[3];
}
//--------------------------------------------------------------------------------------------------------------
//                                             Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
function goTabSelect(isNumSep) {
	
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	frm1.f_isNumSep.value = isNumSep;	
	
	var tabObjs = document.getElementsByName('tabLayer');
    if( isNumSep == "01" ) {
    
    	currTab = isNumSep;	//탭상태저장
    	
        tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';

	    //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;

    //Container List 목록
    }else if( isNumSep == "02" ) {
    	currTab = isNumSep;	//탭상태저장
    	
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "inline";
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
        
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
        if(tab3click == ""){
        	tab3click = "Y";
        	doWork('SEARCH_CNTR');
        }



    //Mark Description 탭
    }else if( isNumSep == "03" ) {
    	currTab = isNumSep;	//탭상태저장
    	
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "none";
        tabObjs[2].style.display = 'inline';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
        
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
        
    }else if( isNumSep == "04" ) {
    	currTab = isNumSep;	//탭상태저장
    	
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "none";
        tabObjs[2].style.display = "none";
        tabObjs[3].style.display = 'inline';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
        
        
        //BL_COPY
        var copy_bl_seq = frm1.copy_bl_seq.value;
		if (copy_bl_seq == "") {
			
			//LHK 20130812 tab Click 이후 컨테이너 저장 후 다시 클릭 할 경우, 컨테이너를 재조회 한다. Unit 에 해당하는 Cntr type Size 를 다시 가져옴.
			searchGrid(6);

			if(tab4click== ""){
		        tab4click= "Y";
		        doWork('SEARCH_FRT');
	    	}
		}
        //#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
    	//Work Order
     }else if( isNumSep == "05" ) {
    	currTab = isNumSep;	//탭상태저장

        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "none";
        tabObjs[2].style.display = "none";
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'inline';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
    	
    	if(tab7click== ""){
    		tab7click= "Y";
    		doWork('SEARCH_WO');
    	}
    //Shipping Document 탭
    }else if( isNumSep == "06" ) {
    	currTab = isNumSep;	//탭상태저장
    	
    	tabObjs[0].style.display = 'none';
    	tabObjs[1].style.display = 'none';
    	tabObjs[2].style.display = 'none';
    	tabObjs[3].style.display = 'none';
    	tabObjs[4].style.display = 'none';
    	tabObjs[5].style.display = 'inline';
    	tabObjs[6].style.display = 'none';
    	
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
        if(tab5click == ""){
        	tab5click = "Y";
        	doWork('SEARCH_DOC');
        }
    
    /* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 - add status tab */
    //}
    }else if( isNumSep == "07" ) {
		currTab = isNumSep;	//탭상태저장
		
	    tabObjs[0].style.display = 'none';
	    tabObjs[1].style.display = 'none';
	    tabObjs[2].style.display = 'none';
	    tabObjs[3].style.display = 'none';
	    tabObjs[4].style.display = 'none';
	    tabObjs[5].style.display = 'none';
	    tabObjs[6].style.display = 'inline';
	    
	    if(tab6click== ""){
	        tab6click= "Y";
	        doWork('SEARCH_JB');
	
		}
	}  
    var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
	});
}

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
var isRun = false;
function loadPage() {
	var opt_key = "INST_PROFIT";
	ajaxSendPost(setExpressTpCdVal, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
    for(var i=0;!isRun && i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
        if(i == docObjects.length - 1){
        	isRun = true;
        }
    }
    
    if(pps_use_flg != "Y"){
    	getObj("btnPierpass").style.display = "none";
    }
    
    checkBoxSetting();
    frm1.pck_qty.value=doMoneyFmt(Number(frm1.pck_qty.value).toFixed(0));
    frm1.grs_wgt.value=doMoneyFmt(Number(frm1.grs_wgt.value).toFixed(3));
    frm1.grs_wgt1.value=doMoneyFmt(Number(frm1.grs_wgt1.value).toFixed(3));
    frm1.meas.value=doMoneyFmt(Number(frm1.meas.value).toFixed(3));
    frm1.meas1.value=doMoneyFmt(Number(frm1.meas1.value).toFixed(0));
    frm1.ctrb_mgn.value=doMoneyFmt(Number(frm1.ctrb_mgn.value).toFixed(2));
    // 2011.12.28 BL Type에서 Third Party 뺄 것
    for(var i=0 ; i<frm1.hbl_tp_cd.length ; i++){
    	if(frm1.hbl_tp_cd.options[i].value == 'TP'){
    		frm1.hbl_tp_cd.options[i]=null;
    	}
    }
    if(frm1.intg_bl_seq.value==''){
    	//collect로 셋팅
    	//frm1.frt_term_cd.value = 'CC';
    	//AUTO 표시
    	frm1.ref_no.value="AUTO";
    	/* oyh 2013.09.04 #20421 : [BINEX] B/L type의 default를 Express에 Y로 */
    	/* oyh 2013.09.04 #20420 : [BINEX] BL ENTRY에 Package 정보 default setting*/
       	//frm1.obl_tp_cd.value = "E";
    	//frm1.pck_ut_cd.value = "CT";
    }
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	goTabSelect(frm1.f_isNumSep.value);
    if(frm1.bl_sts_cd.value=='HO' || frm1.bl_sts_cd.value=='HF'){
    	//Accounting Closed. You can only edit following fields.\nContainer Info. / B/L Body / Vessel name & voyage.
    	alert(getLabel('SEA_COM_ALT011'));
    }
    //blTpChange(frm1.hbl_tp_cd.value);
    //단축키추가.
    setShortcut();
}
function setShortcut(){
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
	switch(sheet_obj.id){
		case "sheet1":
			docObjects[0]=sheet_obj;
			break;
		case "sheet2":
			docObjects[1]=sheet_obj;
			break;
		case "sheet4":
			docObjects[2]=sheet_obj;
			break;
		case "sheet3":
			docObjects[3]=sheet_obj;
			break;
		case "sheet7":
			docObjects[4]=sheet_obj;
			break;
		case "sheet8":
			docObjects[5]=sheet_obj;
			break;
		case "sheet9":
			docObjects[6]=sheet_obj;
			break;
		case "sheet10":
			docObjects[7]=sheet_obj;
			break;	
		/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
		case "sheet11":
			docObjects[8]=sheet_obj;
			break;				
		/* #27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가 */
		case "sheet12":
			docObjects[9]=sheet_obj;
			break;				
	}
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */

function initSheet(sheetObj,sheetNo) {
//	MULTI_CURR_FLAG = "Y";
    switch(sheetNo) {
		case 1:     
		    with(sheetObj){
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('SEE_BMD_0040_HDR1'), Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_intg_bl_seq" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_sr_no" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_no" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_sts_cd" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_ref_no" } ];
		       
		      InitColumns(cols);
	
		      SetEditable(1);
		      SetVisible(false);

	            }


        break;
		case 2:     //HBL List
		    with(sheetObj){
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('SEE_BMD_0040_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Seq",     Hidden:0,  Width:35,   Align:"Center",  ColMerge:0,   SaveName:"seq" },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_bkg_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"hbl_bl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"hbl_act_shipper",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"hbl_shpr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"hbl_cnee_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"hbl_prnr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_lnr_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"hbl_ntfy_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_trnk_vsl",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"hbl_trnk_voy",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_por_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"hbl_obrd_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pol_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pol_nod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_pol_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pod_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pod_nod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_pod_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_del_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_del_nod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_del_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_rep_cmdt_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_rep_cmdt_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pck_ut_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pck_ut_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_meas",           KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:4,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_meas1",          KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:4,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_meas_ut_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_grs_wgt",        KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_grs_wgt1",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_grs_wgt_ut_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_act_wgt",        KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_act_wgt_ut_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"hbl_cntr_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hbl_intg_bl_seq" },
	             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hbl_ibflag" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hbl_lnr_trdp_cd" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hbl_shpr_trdp_nm" },
	             {Type:"Text",      Hidden:1, Width:20,   Align:"Center",  ColMerge:0,   SaveName:"del_icon" } ];
	       
		      InitColumns(cols);
	
		      SetCountPosition(0);
		      SetEditable(0);
		      SetImageList(0,APP_PATH+"/web/img/main/trash.gif");
		      sheetObj.SetDataLinkMouse("del_icon",1);
		      InitViewFormat(0, "hbl_obrd_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
		      SetSheetHeight(150);
		      //sheetObj.SetFocusAfterProcess(0);
           }                                                      
	    break;
		case 3:		//Container List 그리드
		    with(sheetObj){
			
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('SEE_BMD_HDR4'), Align:"Center"} ];
		      InitHeaders(headers, info);

		      var cols = [ {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"Del" },
		             {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"conls_ibflag" },
		             {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"Seq",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"soc_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
		             {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"cntr_tpsz_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"seal_no1",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"seal_no2",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"seal_no3",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:0,   SaveName:"cgo_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
		             {Type:"Combo",     Hidden:0, Width:90,   Align:"Left",    ColMerge:0,   SaveName:"cgo_pck_ut",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt1",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas1",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
		             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"vol_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cntr_sprl_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_sprl_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"temp_val",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
		             {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"temp_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"vent_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"dg_gds_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"cntr_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_list_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vol_tot",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rgst_cntr_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
		       
		      InitColumns(cols);

		      SetCountPosition(0);
		      SetEditable(1);
              SetColProperty('cgo_pck_ut', {ComboText:PCKCD1, ComboCode:PCKCD2, DefaultValue:"CT"} );
              SetColProperty('soc_flg', {ComboText:LSTCD1, ComboCode:LSTCD2} );
  			  SetColProperty('temp_cd', {ComboText:'|'+TEMPCD1, ComboCode:'|'+TEMPCD2} );
  			  SetColProperty('vent_cd', {ComboText:'|'+VENTCD1, ComboCode:'|'+VENTCD2} );
  			  SetColProperty('cntr_tpsz_cd', {ComboText:'|'+TPCD1, ComboCode:'|'+TPCD2} );
  			  SetColProperty('dg_gds_flg', {ComboText:'N|Y', ComboCode:'N|Y'} );
  			  SetColProperty(0 ,"cntr_no" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
  			  SetColProperty(0 ,"seal_no1" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
  			  SetColProperty(0 ,"seal_no2" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
  			  SetColProperty(0 ,"seal_no3" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
  			  SetSheetHeight(400);
  			  
  			  //sheetObj.SetFocusAfterProcess(0);
			                  }

                                
		break;
	    case 4:					//첨부파일
	        with(sheetObj){
	    		SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0, TabStop:0 } );

	    		var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    		var headers = [ { Text:getLabel('SEE_BMD_0040_HDR4'), Align:"Center"} ];
	    		InitHeaders(headers, info);

	    		var cols = [ {Type:"Status",    Hidden:1, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"doc_ibflag" },
	             {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"Del",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"palt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:55,   Align:"Center",  ColMerge:0,   SaveName:"palt_ext_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:480,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_msg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_img_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_pdf_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_rmk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq_d",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	       
	    		InitColumns(cols);

	    		SetCountPosition(0);
	    		SetEditable(1);
	    		SetImageList(0,APP_PATH+"/web/img/button/bt_img.gif");
	    		SetImageList(1,APP_PATH+"/web/img/button/bt_pdf.gif");
	    		sheetObj.SetDataLinkMouse("palt_doc_nm",1);
	    		sheetObj.SetDataLinkMouse("palt_doc_img_url",1);
	    		sheetObj.SetDataLinkMouse("palt_doc_pdf_url",1);
	    		InitViewFormat(0, "rgst_tms", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	    		SetSheetHeight(400);
	      }


                        
	   break;
	    case 5:      //Selling/Debit 탭부분 init
	    	if(MULTI_CURR_FLAG == "Y"){
	    		with(sheetObj){

	    		      var cnt=0;

	    		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	    		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    		      var headers = [ { Text:getLabel('SEE_BMD_0040_HDR5_3'), Align:"Center"},
	    		                  { Text:getLabel('SEE_BMD_0040_HDR5_4'), Align:"Center"} ];
	    		      InitHeaders(headers, info);

	    		      var cols = [
	    		             {Type:"Text",      Hidden:1, Width:30,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	    		             {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	    		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	    		             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    		             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	    		             {Type:"Text",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	    		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    		             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	    		             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    		             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    		             {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    		             {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    		             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    		             {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    		             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_auto_trf_flg" },
	    		             {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_frt_ask_clss_cd" },
	    		             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_due_dt" },
	    		             {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
	    		       
	    		      	InitColumns(cols);
	    		      	SetEditable(1);
		    		    SetHeaderRowHeight(20 );
		    		    SetHeaderRowHeight(21);
	    			  	SetColProperty('fr_frt_cd', {ComboText:ARFRTCD2, ComboCode:ARFRTCD1} );
	    			  	SetColProperty('fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
	    				SetColProperty('fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
	    				SetColProperty('fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
	    				SetColProperty('fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
	    				SetColProperty('fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
	    				SetColProperty(0 ,"fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
	    		        SetSheetHeight(150);
	    		        
	    		        InitComboNoMatchText(1,"",1); 
	    		        
	    		}
	    	}else{
	        with(sheetObj){
	    	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

	    	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    	      var headers = [ { Text:getLabel('SEE_BMD_0040_HDR5_1'), Align:"Center"},
	    	                  { Text:getLabel('SEE_BMD_0040_HDR5_2'), Align:"Center"} ];
	    	      InitHeaders(headers, info);

	    	var cols = [ 
	    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	    	             {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	    	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	    	             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    	             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	    	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    	             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    	             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    	             {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    	             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    	             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",   ColMerge:1,   SaveName:"fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    	             {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		             {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		             {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_auto_trf_flg" },
	    	             {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    	             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    	             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_frt_ask_clss_cd" },
	    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_due_dt" },
	    	             {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    	             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
	    	       
	    	      InitColumns(cols);

	    	      SetEditable(1);
	    	      SetHeaderRowHeight(20 );
	    	      SetHeaderRowHeight(21);
	    	      SetColProperty('fr_frt_cd', {ComboText:ARFRTCD2, ComboCode:ARFRTCD1} );
	  	    	SetColProperty('fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
	  	    	SetColProperty('fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
	  	    	SetColProperty('fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
	  	    	SetColProperty('fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
	  	    	SetColProperty(0 ,"fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
	  	    	SetColProperty(0 ,"fr_inv_curr_cd" , {AcceptKeys:"E" , InputCaseSensitive:1});
	  	    	
	  	    	 SetSheetHeight(165);
	  	    	 
	  	    	InitComboNoMatchText(1,"",1); 
	  	    	
	    	      }
	    	}
	    	break;
       //Freight
       case 6:      //Buying/Credit 탭부분 init
    	   if(MULTI_CURR_FLAG == "Y"){
    		    with(sheetObj){
    		        var cnt=0;
    		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

    		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    		        var headers = [ { Text:getLabel('SEE_BMD_0040_HDR6_3'), Align:"Center"},
    		                    { Text:getLabel('SEE_BMD_0040_HDR6_4'), Align:"Center"} ];
    		        InitHeaders(headers, info);
    		        var cols = [
    		  					{Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		  					{Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    		  					{Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    		  					{Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    		  					{Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		  					{Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    		  					{Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    		  					{Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		  					{Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    		  					{Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    		  					{Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    		  					{Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		  					{Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		  					{Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		  					{Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		  					{Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		  					{Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		  					{Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		  					{Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		  					{Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		  					{Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		  					{Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_auto_trf_flg" },
    		  					{Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		  					{Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		  					{Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_frt_ask_clss_cd" },
    		  					{Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_due_dt" },
    		  					{Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		  					{Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field03",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
    		         
    		        InitColumns(cols);
    		        SetColProperty('b_fr_frt_cd', {ComboText:APFRTCD2, ComboCode:APFRTCD1} );
    		        SetColProperty('b_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
    		        SetColProperty('b_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
    		        SetColProperty('b_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
    		        SetColProperty('b_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    		        SetColProperty('b_fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    		        SetColProperty(0 ,"b_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
		    		SetEditable(1);
    		        SetHeaderRowHeight(20 );
    		        SetHeaderRowHeight(21);
    		        SetSheetHeight(150);
    		        InitComboNoMatchText(1,"",1); 
    		        
    	   }
    	   }else{
    	      with(sheetObj){
    	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

    	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	            var headers = [ { Text:getLabel('SEE_BMD_0040_HDR6_1'), Align:"Center"},
    	                      { Text:getLabel('SEE_BMD_0040_HDR6_2'), Align:"Center"} ];
    	            InitHeaders(headers, info);

    	            var cols = [
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    	                {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    	                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	                {Type:"Float",     Hidden:0,  Width:40,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  					{Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  					{Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_auto_trf_flg" },
    	                {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_frt_ask_clss_cd" },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_due_dt" },
    	                {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field03",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
    	            
    	            InitColumns(cols);

    	            SetEditable(1);
    	           SetHeaderRowHeight(20 );
    	            SetHeaderRowHeight(21);
    	            SetColProperty('b_fr_frt_cd', {ComboText:APFRTCD2, ComboCode:APFRTCD1} );
    	     	   SetColProperty('b_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
    	     	   SetColProperty('b_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
    	     	   SetColProperty('b_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
    	     	   SetColProperty('b_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    	     	   SetColProperty(0 ,"b_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
    	     	   SetColProperty(0 ,"b_fr_inv_curr_cd" , {AcceptKeys:"E" , InputCaseSensitive:1});
    	     	   SetSheetHeight(165);
    	     	  InitComboNoMatchText(1,"",1); 
    	     	  
    	            }
    	   }
        break;
       case 7:      //Buying/Credit 탭부분 init
    	   
    	   if(MULTI_CURR_FLAG == "Y"){
    		  with(sheetObj){
    	      var cnt=0;
    	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

    	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	      var headers = [ { Text:getLabel('SEE_BMD_0040_HDR7_3'), Align:"Center"},
    	                  { Text:getLabel('SEE_BMD_0040_HDR7_4'), Align:"Center"} ];
    	      InitHeaders(headers, info);
    	      var cols = [
    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    	             {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    	             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
    	             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
    	             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	             {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	             {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	             {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	             {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_auto_trf_flg" },
    	             {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_frt_ask_clss_cd" },
    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_due_dt" },
    	             {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 } ];
    	       
    	      InitColumns(cols);
    	      SetColProperty('dc_fr_frt_cd', {ComboText:DCFRTCD2, ComboCode:DCFRTCD1} );
    	      SetColProperty('dc_fr_sell_buy_tp_cd', {ComboText:"Revenue|Cost", ComboCode:"D|C"} );
    	      SetColProperty('dc_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
    	      SetColProperty('dc_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
    	      SetColProperty('dc_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
    	      SetColProperty('dc_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    	      SetColProperty('dc_fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    	      SetColProperty(0 ,"dc_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
    	      SetEditable(1);
    	      SetHeaderRowHeight(20 );
    	      SetHeaderRowHeight(21);
    	      SetSheetHeight(150);
    	      InitComboNoMatchText(1,"",1); 
    	      
    		  }
    		  }else{
    			  with(sheetObj){
    	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

    	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	         var headers = [ { Text:getLabel('SEE_BMD_0040_HDR7_1'), Align:"Center"},
    	                     { Text:getLabel('SEE_BMD_0040_HDR7_2'), Align:"Center"} ];
    	         InitHeaders(headers, info);

    	         var cols = [
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    	                {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    	                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	                {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	                {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",   ColMerge:1,   SaveName:"dc_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
       	             	{Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_auto_trf_flg" },
    	                {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_frt_ask_clss_cd" },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_due_dt" },
    	                {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 } ];
    	          
    	         InitColumns(cols);

    	         SetEditable(1);
    	         SetHeaderRowHeight(20 );
    	         SetHeaderRowHeight(21);
    	  	   SetColProperty('dc_fr_frt_cd', {ComboText:DCFRTCD2, ComboCode:DCFRTCD1} );
        	   SetColProperty('dc_fr_sell_buy_tp_cd', {ComboText:"Revenue|Cost", ComboCode:"D|C"} );
        	   SetColProperty('dc_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
        	   SetColProperty('dc_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
        	   SetColProperty('dc_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
        	   SetColProperty('dc_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
        	   SetColProperty(0 ,"dc_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
	     	   SetColProperty(0 ,"dc_fr_inv_curr_cd" , {AcceptKeys:"E" , InputCaseSensitive:1});
        	           SetSheetHeight(165);
        	           
        	           InitComboNoMatchText(1,"",1); 
        	           
    	         }
    		  }
        break;
       case 8:      //TP/SZ init
    	      with(sheetObj){

        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        var headers = [ { Text:getLabel('SEE_FRT_0010_HDR1'), Align:"Center"} ];
        InitHeaders(headers, info);

        var cols = [ {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"" },
            {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"" } ];
         
        InitColumns(cols);

        SetEditable(0);
        SetVisible(false);

                 }


	  break;
	  /* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
       case 9:      //HISTORY
    	    with(sheetObj){
          
         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         var headers = [ { Text:getLabel("SEE_BMD_HDR9"), Align:"Center"} ];
         InitHeaders(headers, info);

         var cols = [ {Type:"Float",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cng_seq" },
                {Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"itm_lbl" },
                {Type:"Text",     Hidden:0,  Width:310,  Align:"Left",    ColMerge:0,   SaveName:"bfr_cng_txt" },
                {Type:"Text",     Hidden:0,  Width:310,  Align:"Left",    ColMerge:0,   SaveName:"bfr_cng_txt" },
                {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"rgst_usrid" },
                {Type:"Text",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"rgst_tms" } ];
          
         InitColumns(cols);

         SetEditable(0);
         SetSheetHeight(400);
               }

                        
		  break;
		//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
	   //Pickup/WorkOrder 그리드        
        case 10:
            with(sheetObj){
        	
        	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

        	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	            var headers = [ { Text:getLabel('SEE_BMD_0020_HDR8_1'), Align:"Center"} ];
        	            InitHeaders(headers, info);

        	            var cols = [ {Type:"Text",     Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"wo_seq" },
        	             {Type:"Text",     Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"wo_no" },
        	             {Type:"Combo",     Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"wo_status" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"pickup_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"delivery_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"return_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"trucker_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"wo_grs_wgt" } ];
        	             
        	            InitColumns(cols);

        	            SetCountPosition(0);
        	            SetEditable(0);
        	            SetColProperty('wo_status', {ComboText:"SAVED|ISSUED", ComboCode:"A|B"} );
    	                SetSheetHeight(400);
        	                                    }

                                    
        break;
    }
}
/**
 * HBL표시
 */
function sheet2_OnDblClick(sheetObj,Row,Col){
var paramStr="./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+sheetObj.GetCellValue(Row, 'hbl_bl_no');
   	parent.mkNewFrame('Booking & HBL', paramStr);
}
//########################## 첨부문서 ##########################
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
function sheet3_OnMouseMove(sheetObj, row, col){
	if(sheetObj.MouseCol()==9){
		sheetObj.ToolTipOption="balloon:true;width:320;backcolor:#FFFFE0;forecolor:#000000;icon:0;title:Message";
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
         	if(sheetObj.GetCellImage(Row, "palt_doc_img_url")  != ""){
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
	} // end switch
}
//파일 다운로드
function downloadFile(downType, s_intg_bl_seq, s_palt_doc_seq){
	document.frm2.docType.value=downType;
	document.frm2.s_palt_doc_seq.value=s_palt_doc_seq;
	document.frm2.intg_bl_seq.value = s_intg_bl_seq;
	//document.frm2.target = '_self';
	document.frm2.submit();
}
/**
 * 파일 업로드 팝업에서 목록 Reload
 */
function reloadDocList(){
	doWork('SEARCH_DOC');
}
/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function blCheckInpuVals(){
	var isOk=true;
	//---------------20121130 OJG---------------------------
	if(!chkCmpAddr(frm1.shpr_trdp_addr, 'Shipper Address')){
		isOk=false;
		moveTab('01');
		//frm1.shpr_trdp_addr.focus();
	}
	if(!chkCmpAddr(frm1.cnee_trdp_addr, 'Consignee Address')){
		isOk=false;
		moveTab('01');
		//frm1.cnee_trdp_addr.focus();
	}
	if(!chkCmpAddr(frm1.ntfy_trdp_addr, 'Notify Address')){
		isOk=false;
		moveTab('01');
		//frm1.ntfy_trdp_addr.focus();
	}
	//---------------20121130 OJG--------------------------
	/*
	 *  2012.02.23
	 * 필수값 설정
	 * REF_NO, ETD
	 */
	/*if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'ETD')!='O'){S.Y BAIK (2013.01.23)*/
	if(!checkInType(frm1.etd_dt_tm.value, "DD")){	
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ETD_'));
		isOk=false;
		moveTab('01');
		frm1.etd_dt_tm.focus();
		return isOk; 
	}
	if(trim(frm1.etd_dt_tm.value)!= "" && trim(frm1.eta_dt_tm.value) != ""){
		if(getDaysBetweenFormat(frm1.etd_dt_tm, frm1.eta_dt_tm, "MM-dd-yyyy") < 0){
			// 'ETD date must be greater than ETA date
			alert(getLabel("SEA_COM_ALT021"));
			moveTab('01');
			frm1.eta_dt_tm.focus();
			isOk=false;
			return isOk; 
		}
	}
 	//#25246, 25247 필수값 설정 추가
	if(frm1.pol_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.pol_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.pod_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.pod_cd.focus();
		isOk=false;
		return isOk; 
	}
	//#29608 MBL Mandatory 항목 추가(Office Code)
	if(frm1.ref_ofc_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.ref_ofc_cd.focus();
		isOk = false;
		return isOk; 
	}
/*
	if(checkInputVal(frm1.shpr_trdp_nm.value, 2, 50, "T", 'Shipper')!='O'){
		isOk=false;
		moveTab('01');
		frm1.shpr_trdp_nm.focus();
	}else if(checkInputVal(frm1.shpr_trdp_addr.value, 2, 400, "T", 'Shipper Address')!='O'){
		moveTab('01');
		frm1.shpr_trdp_addr.focus();
		isOk=false;		
	}else if(checkInputVal(frm1.cnee_trdp_nm.value, 2, 50, "T", 'Consignee Name')!='O'){
		isOk=false;
		moveTab('01');
		frm1.cnee_trdp_nm.focus();
	}else if(checkInputVal(frm1.cnee_trdp_addr.value, 2, 400, "T", 'Consignee Address')!='O'){
		moveTab('01');
		frm1.cnee_trdp_addr.focus();
		isOk=false;			
	}else if(checkInputVal(frm1.lnr_trdp_cd.value, 6, 7, "T", 'Liner Code')!='O'){
		isOk=false;
		moveTab('01');
		frm1.lnr_trdp_cd.focus();
	}else if(checkInputVal(frm1.lnr_trdp_nm.value, 2, 50, "T", 'Liner Name')!='O'){
		isOk=false;
		moveTab('01');
		frm1.lnr_trdp_nm.focus();
	}else if(checkInputVal(frm1.trnk_vsl_nm.value, 2, 100, "T", 'Vessel Name')!='O'){
		isOk=false;
		moveTab('01');
		frm1.trnk_vsl_nm.focus();
	}else if(checkInputVal(frm1.trnk_voy.value, 3, 8, "T", 'Voyage')!='O'){
		isOk=false;
		moveTab('01');
		frm1.trnk_voy.focus();
	}else if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'ETD')!='O'){
		isOk=false;
		moveTab('01');
		frm1.etd_dt_tm.focus();
	}else if(checkInputVal(frm1.pol_cd.value, 5, 6, "T", 'POL')!='O'){
		isOk=false;
		moveTab('01');
		frm1.pol_cd.focus();
	}else if(checkInputVal(frm1.pod_cd.value, 5, 6, "T", 'POD')!='O'){
		isOk=false;
		moveTab('01');
		frm1.pod_cd.focus();
	}else if(checkInputVal(frm1.del_cd.value, 5, 6, "T", 'DEL Code')!='O'){
		isOk=false;
		moveTab('01');
		frm1.del_cd.focus();
	}else if(checkInputVal(frm1.pck_qty.value, 0, 7, "N", 'Package Qty')!='O'){
		isOk=false;
		moveTab('01');
		frm1.pck_qty.focus();		
	}else if(checkInputVal(frm1.grs_wgt.value, 0, 8, "N", 'G/Weight')!='O'){
		isOk=false;
		moveTab('01');
		frm1.grs_wgt.focus();	
	}else if(checkInputVal(frm1.meas.value, 0, 8, "N", 'Measurement')!='O'){
		isOk=false;
		moveTab('01');
		frm1.meas.focus();	
	}else if(checkInputVal(frm1.bl_iss_dt.value, 10, 10, "DD", 'Issued Date')!='O'){
		isOk=false;
		moveTab('01');
		frm1.bl_iss_dt.focus();
	}else if(checkInputVal(frm1.mk_txt.value, 0, 4000, "T", 'Mark')!='O'){
		isOk=false;
		moveTab('02');
		frm1.mk_txt.focus();
	}else if(checkInputVal(frm1.desc_txt.value, 0, 4000, "T", 'Description')!='O'){
		isOk=false;
		moveTab('02');
		frm1.desc_txt.focus();
	}else if(checkInputVal(frm1.rmk.value, 0, 400, "T", 'Remark')!='O'){
		isOk=false;
		moveTab('02');
		frm1.rmk.focus();
	}
*/
	/*==================================================================================================*/
	/* LHK, 20130128 Freight Edit/Delete 는 TB_FRT.INV_STS_CD 가 FI 인 경우에만 허용						    */
	/* Freight 생성 후 Invoice 를 생성한 후 재조회 하지 않고 다시 저장할 경우 delete 하거나 수정 건으로 인한 오류 발생을 차단. */
	var sheetObjArr=new Array(3);
		sheetObjArr[0]=docObjects[4];		//AR LOCAL  'fr_'
		sheetObjArr[1]=docObjects[6];		//DC 		'dc_fr_'
		sheetObjArr[2]=docObjects[5];		//AP 		'b_fr_'
	if(checkFrtSts(sheetObjArr)==false){	//Validation 후 Do you want to save 뜨지 않고 원래값 가져오기
		isOk=false;
	}
	/*=================================================================================================*/
	//Container List validation.
    var cntrListParam=docObjects[2].GetSaveString(false);
    if(docObjects[2].IsDataModified() && cntrListParam == "") { isOk=false; };
	if(cntrListParam!=''){
		if(cntrListCheckInpuVals(docObjects[2])){
			isOk=false;
			return isOk; 
		}
	}
	
	var frtSdListParam=docObjects[4].GetSaveString(false);
    if(docObjects[4].IsDataModified() && frtSdListParam == "") { isOk=false; };

    var frtBcListParam=docObjects[5].GetSaveString(false);
    if(docObjects[5].IsDataModified() && frtBcListParam == "") { isOk=false; };

    var frtDcListParam=docObjects[6].GetSaveString(false);
    if(docObjects[6].IsDataModified() && frtDcListParam == "") { isOk=false; };
	
	return isOk;
}
 /**
  * Container List의 입력값 확인
  */
function cntrListCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
 	var isError=false; 
 	var workItems=0;
 	for(var i=1; i < totRow ; i++){
if(sheetObj.GetCellValue(i, 'conls_ibflag')=='U'||sheetObj.GetCellValue(i, 'conls_ibflag')=='I'){
if(checkInputVal(sheetObj.GetCellValue(i, 'cntr_tpsz_cd'), 2, 6, "T", 'Container Type/Size')!='O'){
 				isError=true;
 				moveTab('02');
 				sheetObj.SelectCell(i, 'cntr_tpsz_cd', false);
 				break;
 			}
 		}
 	}
 	return isError;
} 
function svcTermChange(){
	var formObj=document.frm1;
	formObj.to_svc_term_cd.value=formObj.fm_svc_term_cd.value;
}
function shipModeChangeDef(obj){
	var formObj=document.frm1;
	if (obj.value == 'FCL' || obj.value == 'BLK') {
		formObj.to_svc_term_cd.value='CY';
		formObj.fm_svc_term_cd.value='CY';
	} else {
		formObj.to_svc_term_cd.value='CF';
		formObj.fm_svc_term_cd.value='CF';
	}
}
function setOfficeData(){
	var formObj=document.frm1;
	var sheetObj=docObjects[1];
	//office post date setting, Ocean Export
	if(formObj.post_dt.value==""){
		if(ofc_post_dt=="TODAY"){
			formObj.post_dt.value=getTodayStr();
		}
	}
	//office currency
	if(ofc_curr_cd!=""){
		formObj.curr_cd.value=ofc_curr_cd;
	}
	//office code
	formObj.ref_ofc_cd.value=v_ofc_cd;
}
/*
function weightChange(obj){
	var formObj=document.frm1;
	if(obj.name=="grs_wgt"){
		formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") / 0.453597315, 0);
		chkComma(formObj.grs_wgt1,8,2);
	}
	else if(obj.name=="grs_wgt1"){
		formObj.grs_wgt.value=roundXL(formObj.grs_wgt1.value.replaceAll(",","") * 0.453597315, 3);
		chkComma(formObj.grs_wgt,8,3);
	}
}
function cbmChange(obj){
	var formObj=document.frm1;
	if(obj.name=="meas"){
		formObj.meas1.value=roundXL(formObj.meas.value.replaceAll(",","") * 35.3165, 3);
		chkComma(formObj.meas1,8,3);
	}
	else if(obj.name=="meas1"){
		formObj.meas.value=roundXL(formObj.meas1.value.replaceAll(",","") / 35.3165, 3);
		chkComma(formObj.meas,8,3);
	}
}
*/
function weightChange(obj){
	var formObj=document.frm1;
	if(obj.name=="grs_wgt"){
		var rndXLValue=roundXL(formObj.grs_wgt.value.replaceAll(",","") / 0.453597315, 3);
		formObj.grs_wgt1.value=rndXLValue;
		formObj.mk_grs_wgt1.value=rndXLValue;
		formObj.mk_grs_wgt.value=formObj.grs_wgt.value;
		chkComma(formObj.grs_wgt1, 8, 3);
		formObj.mk_grs_wgt1.value = doMoneyFmt(formObj.mk_grs_wgt1.value);
		formObj.mk_grs_wgt.value = doMoneyFmt(formObj.mk_grs_wgt.value);
	}
	else if(obj.name=="grs_wgt1"){
		var rndXLValue=roundXL(formObj.grs_wgt1.value.replaceAll(",","") * 0.453597315, 3);
		formObj.grs_wgt.value=rndXLValue;
		formObj.mk_grs_wgt.value=rndXLValue;
		formObj.mk_grs_wgt1.value=formObj.grs_wgt1.value;
		//formObj.act_wgt.value = roundXL(formObj.grs_wgt1.value * 0.453597315, 0);
		//formObj.act_wgt1.value = formObj.grs_wgt1.value;
		chkComma(formObj.grs_wgt, 8, 3);
		formObj.mk_grs_wgt.value = doMoneyFmt(formObj.mk_grs_wgt.value);
		formObj.mk_grs_wgt1.value = doMoneyFmt(formObj.mk_grs_wgt1.value);
	}
}
function cbmChange(obj){
	var formObj=document.frm1;
	// #27543, #27534 요건  : 
	if(obj.name=="meas"){
		var rndXLValue=roundXL(formObj.meas.value.replaceAll(",", "") * 35.3165, 3);
		formObj.meas1.value=doMoneyFmt(Number(rndXLValue).toFixed(0));
		formObj.mk_meas1.value=doMoneyFmt(Number(rndXLValue).toFixed(0));
		formObj.mk_meas.value=formObj.meas.value.replaceAll(",", "");
		//alert(formObj.meas1.value);
		//chkComma(formObj.meas1, 8, 0);
		//alert(formObj.meas1.value);
		formObj.mk_meas1.value = doMoneyFmt(formObj.mk_meas1.value);
		formObj.mk_meas.value = doMoneyFmt(formObj.mk_meas.value);
	}
	// CFT ==> CBM 기능  
	else if(obj.name=="meas1"){
		var rndXLValue=roundXL(formObj.meas1.value.replaceAll(",", "") / 35.3165, 3);
		formObj.meas.value=rndXLValue;
		formObj.mk_meas.value=rndXLValue;
		formObj.mk_meas1.value=formObj.meas1.value;
		chkComma(formObj.meas, 8, 3);
		formObj.mk_meas.value = doMoneyFmt(formObj.mk_meas.value);
		formObj.mk_meas1.value = doMoneyFmt(formObj.mk_meas1.value);
	}
	//amountChange(frm1.agent_rt);
	//amountChange(frm1.cust_rt);
}
function loadData(){
	if(frm1.intg_bl_seq.value!=""){
		//ref_ofc_cd를 database에 있는 값으로 셋팅함
		frm1.ref_ofc_cd.value=frm1.h_ref_ofc_cd.value;
		frm1.frt_term_cd.value=frm1.h_frt_term_cd.value;
		//currency를 database에 있는 값으로 셋팅함
		frm1.curr_cd.value=frm1.h_curr_cd.value;
		//attach rider 체크
		rowCount(frm1, 15, frm1.rider_lbl);
//		frm1.ref_no.className = 'search_form-disable';
//		frm1.ref_no.readOnly  = true;
		doWork('SEARCHLIST01');
		doWork('SEARCH_CNTR');
	} else {
		//BL_COPY
		var orgBlSeq = frm1.copy_bl_seq.value;
		if (orgBlSeq != "") {
			selectCopyBLFrt();
		}
	}
	/* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start */        
	 cntr_ship_init();
	/* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 End  */		
	 //OFC의 POST_DATE TYPE를 취득한다.
	 ofcChDEta();
	 
	//#41634 - [DMS] Default Cursor Position Change
	frm1.ref_no.focus();
}
//2011.11.21 Kim,Jin-Hyuk House B/L Add
function sheet2_OnSearchEnd(sheetObj, row, col){
	var rows=sheetObj.SearchRows();
	if(rows==0){
		sheetObj.RemoveAll();
	}
	
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}
/**
 * Container번호 중복확인
 */
function checkCntrNo(inCntrNo){
 	var intRows=docObjects[2].LastRow() +1;
	var loopNum=0;
	for(var i=1; i < intRows; i++){
		if(inCntrNo==docObjects[2].GetCellValue(i, 'cntr_no')){
			loopNum++;	
		}
	}
	if(loopNum>1){
		return false;
	}else{
		return true;
	}
}
function getCntrGrpCd (v_cntr_tpsz_cd) {
	var v_cntr_grp_cd='';
	var arrTpszCd=TPCD1.split('|');
	var arrGrpCd=TPCD3.split('|');
	for (var idx=0; idx < arrTpszCd.length ; idx++ ) {
		if (v_cntr_tpsz_cd == arrTpszCd[idx]) {
			v_cntr_grp_cd=arrGrpCd[idx];
			break;
		}
	}
	return v_cntr_grp_cd;
}
function sheet4_OnSearchEnd(sheetObj, row, col) 
{
 	for (var idx=1; idx < sheetObj.LastRow() + 1; idx++) 
 	{
 		if ( getCntrGrpCd(sheetObj.GetCellValue(idx,"cntr_tpsz_cd")) == "RF") 
 		{
			sheetObj.SetCellEditable(idx,"temp_val",1);
			sheetObj.SetCellEditable(idx,"temp_cd",1);
			sheetObj.SetCellEditable(idx,"vent_cd",1);
		} 
 		else 
		{
			sheetObj.SetCellValue(idx,"temp_val","",0);
			sheetObj.SetCellValue(idx,"temp_cd","",0);
			sheetObj.SetCellValue(idx,"vent_cd","",0);
			sheetObj.SetCellEditable(idx,"temp_val",0);
			sheetObj.SetCellEditable(idx,"temp_cd",0);
			sheetObj.SetCellEditable(idx,"vent_cd",0);
		}
	}
	/*#23809 oyh 컨테이너가 없을때  tab키를 누르면 Row생성되게*/
	if(sheetObj.RowCount()== 0) {
		sheetObj.SelectCell(0,"cntr_rmk");
	}
	
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}
function sheet4_OnChange(sheetObj, row, col, value){
	//alert(sheetObj.ColSaveName(col));
	switch (sheetObj.ColSaveName(col)) {
		case "cgo_pck_qty" :
		case "cgo_wgt" :
		case "cgo_wgt1" :
		case "cgo_meas" :
		case "cgo_meas1" :
			if (value < 0) 
			{
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
		case "cntr_tpsz_cd" :
        	cntrInfoSet(docObjects[2]);
        	if ( getCntrGrpCd(sheetObj.GetCellValue(row,"cntr_tpsz_cd")) == "RF") {
        		sheetObj.SetCellEditable(row,"temp_val",1);
        		sheetObj.SetCellEditable(row,"temp_cd",1);
        		sheetObj.SetCellEditable(row,"vent_cd",1);
        	} else {
        		sheetObj.SetCellValue(row,"temp_val","",0);
        		sheetObj.SetCellValue(row,"temp_cd","",0);
        		sheetObj.SetCellValue(row,"vent_cd","",0);
        		sheetObj.SetCellEditable(row,"temp_val",0);
        		sheetObj.SetCellEditable(row,"temp_cd",0);
        		sheetObj.SetCellEditable(row,"vent_cd",0);
        	}
        break;
		case "temp_val" :
			if(sheetObj.GetCellValue(row,"temp_cd") != "" && sheetObj.GetCellValue(row,"vent_cd") !="") {
				var keyTxt=sheetObj.GetCellValue(row, "cntr_no") + " / " ;
				var sText=sheetObj.GetComboInfo(row,"vent_cd", "Text");
				var arrText=sText.split("|");
				var idx=sheetObj.GetComboInfo(row,"vent_cd", "SelectedIndex");
				var descTxt=
					sheetObj.GetCellValue(row, "temp_val") + " DEG." +
					sheetObj.GetCellValue(row, "temp_cd") + " / " +
					 arrText[idx] + " OPEN";
				 textdescAdd(frm1.desc_txt, keyTxt , descTxt, frm1.h_temp_val);
			}
			break;
		case "temp_cd" :
			if(sheetObj.GetCellValue(row,"temp_cd") != "" && sheetObj.GetCellValue(row,"vent_cd") !="") {
				var keyTxt=sheetObj.GetCellValue(row, "cntr_no") + " / " ;
				var sText=sheetObj.GetComboInfo(row,"vent_cd", "Text");
				var arrText=sText.split("|");
				var idx=sheetObj.GetComboInfo(row,"vent_cd", "SelectedIndex");
				var descTxt=
					sheetObj.GetCellValue(row, "temp_val") + " DEG." +
					sheetObj.GetCellValue(row, "temp_cd") + " / " +
					 arrText[idx] + " OPEN";
				 textdescAdd(frm1.desc_txt, keyTxt , descTxt, frm1.h_temp_val);
			}
			break;
		case "vent_cd" :
			if(sheetObj.GetCellValue(row,"temp_cd") != "" && sheetObj.GetCellValue(row,"vent_cd") !="") {
				var keyTxt=sheetObj.GetCellValue(row, "cntr_no") + " / " ;
				var sText=sheetObj.GetComboInfo(row,"vent_cd", "Text");
				var arrText=sText.split("|");
				var idx=sheetObj.GetComboInfo(row,"vent_cd", "SelectedIndex");
				var descTxt=
					sheetObj.GetCellValue(row, "temp_val") + " DEG." +
					sheetObj.GetCellValue(row, "temp_cd") + " / " +
					 arrText[idx] + " OPEN";
				 textdescAdd(frm1.desc_txt, keyTxt , descTxt, frm1.h_temp_val);
			}
			break;
	}
	var cntrColStr="cntr_no";
	if(sheetObj.ColSaveName(col)==cntrColStr){
		//Contaienr Number 유효성 검증
		if(sheetObj.GetCellValue(row, cntrColStr)!==''){
			var rtnVal=cntrNumCheck(sheetObj.GetCellValue(row, cntrColStr));
			if(rtnVal){		//정상인경우
				//중복 확인
				if(!checkCntrNo(sheetObj.GetCellValue(row, cntrColStr))){
					//This Container Number is already used!\nPlease check the Container Number!
					alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('FMS_COD_CNTR'));
					sheetObj.SetCellValue(row, cntrColStr,'',0);
					sheetObj.SelectCell(row, cntrColStr);
				}
			}
			else{
				//Proceed anyway? ...??? 
				if(confirm(getLabel('FMS_COM_CFMCON')) == false){
					sheetObj.SetCellValue(row, cntrColStr,'',0);
					sheetObj.SelectCell(row, cntrColStr);
				}else{
					//중복 확인
					if(!checkCntrNo(sheetObj.GetCellValue(row, cntrColStr))){
						//This Container Number is already used!\nPlease check the Container Number!
						alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('FMS_COD_CNTR'));
						sheetObj.SetCellValue(row, cntrColStr,'',0);
						sheetObj.SelectCell(row, cntrColStr);
					}
				}
			}
		}
	}
	switch(sheetObj.ColSaveName(col)){
		case "cgo_wgt":
			sheetObj.SetCellValue(row, "cgo_wgt1",roundXL(sheetObj.GetCellValue(row, col) / 0.453597315, 2),0);
			if (sheetObj.GetCellValue(row, "cgo_wgt1") >99999999.99) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGWEIG'));				
				sheetObj.SetCellValue(row, "cgo_wgt","",0);
				sheetObj.SelectCell(row, "cgo_wgt");
			}
			break;
		case "cgo_wgt1":
			sheetObj.SetCellValue(row, "cgo_wgt",roundXL(sheetObj.GetCellValue(row, col) * 0.453597315, 2),0);
			break;
		case "cgo_meas":
			sheetObj.SetCellValue(row, "cgo_meas1",roundXL(sheetObj.GetCellValue(row, col) * 35.3165, 3),0);
			if (sheetObj.GetCellValue(row, "cgo_meas1") > 999999.999999) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGMEAS'));
				sheetObj.SetCellValue(row, "cgo_meas","",0);
				sheetObj.SelectCell(row, "cgo_meas");
			}
			break;
		case "cgo_meas1":
			sheetObj.SetCellValue(row, "cgo_meas",roundXL(sheetObj.GetCellValue(row, col) / 35.3165, 3),0);
			break;
	}
	/* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start */
	var sumFlag='N';
	var colNm=sheetObj.ColSaveName(col);
	if(colNm == "cgo_pck_qty" || colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del")
	{
		sumFlag='A';
	}	
	if(sumFlag == 'A' && sheetObj.ColSaveName(col) != 'Seq')
	{	
		var cgo_pck_qty='0';
		var meas='0.000000';
		var meas1='0.000000';
		var grs_wgt='0.000';
		var grs_wgt1='0.00';
		for(var i=1; i<=sheetObj.LastRow(); i++){
			if(sheetObj.GetCellValue(i, "Del") == 0)
		   {			
				cgo_pck_qty=parseInt(cgo_pck_qty) 			+ parseInt(sheetObj.GetCellValue(i,"cgo_pck_qty"));
				meas=roundXL(parseFloat(meas), 6) 		+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas")), 6);
				meas1=roundXL(parseFloat(meas1), 6) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas1")), 6);
				grs_wgt=roundXL(parseFloat(grs_wgt), 3) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt")), 3);
				grs_wgt1=roundXL(parseFloat(grs_wgt1), 2) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt1")), 2);
		   }
		}
		/* #27534 이렇게 바뀌어야 하지 않나?? 일단 보류 -타 업체 확인 필요 
		var cgo_pck_qty='0';
		var meas='0.000000';
		var meas1='0';
		var grs_wgt='0.000';
		var grs_wgt1='0.000';
		for(var i=1; i<=sheetObj.LastRow(); i++){
if(sheetObj.GetCellValue(i, "Del") == 0)
		   {			
cgo_pck_qty=parseInt(cgo_pck_qty) 			+ parseInt(sheetObj.GetCellValue(i,"cgo_pck_qty"));
meas=roundXL(parseFloat(meas), 6) 		+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas")), 6);
meas1=roundXL(parseFloat(meas1), 0) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas1")), 0);
grs_wgt=roundXL(parseFloat(grs_wgt), 3) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt")), 3);
grs_wgt1=roundXL(parseFloat(grs_wgt1), 3) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt1")), 3);
		   }
		}
		*/ 
		var formObj=document.frm1;
		if((colNm == "cgo_pck_qty" || colNm == "Del") && cgo_pck_qty > 0){
			formObj.pck_qty.value=cgo_pck_qty;		
		}
		if((colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "Del") && grs_wgt > 0){
			/*
				formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(3));
				formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") / 0.453597315, 0);
				chkComma(formObj.grs_wgt1,8,2);		
				formObj.grs_wgt1.value=doMoneyFmt(Number(grs_wgt1).toFixed(2));
				formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(2)); //roundXL(formObj.grs_wgt1.value.replaceAll(",","") * 0.453597315, 3);
				chkComma(formObj.grs_wgt,8,3);
			*/
			formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(3));
			formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") / 0.453597315, 0);
			/* #27534 이렇게 바뀌어야 하지 않나?? 일단 보류 -타 업체 확인 필요 
			formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") / 0.453597315, 3);
			*/ 
			formObj.mk_grs_wgt1.value=formObj.grs_wgt1.value;
			formObj.mk_grs_wgt.value=formObj.grs_wgt.value;
			chkComma(formObj.grs_wgt1,8,2);	
			formObj.mk_grs_wgt1.value =doMoneyFmt(formObj.mk_grs_wgt1.value);
			formObj.mk_grs_wgt.value = doMoneyFmt(formObj.mk_grs_wgt.value);		
			formObj.grs_wgt1.value=doMoneyFmt(Number(grs_wgt1).toFixed(2));
			formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(2)); //roundXL(formObj.grs_wgt1.value.replaceAll(",","") * 0.453597315, 3);
			formObj.mk_grs_wgt.value=formObj.grs_wgt.value;
			formObj.mk_grs_wgt1.value=formObj.grs_wgt1.value;
			chkComma(formObj.grs_wgt,8,3);			
			formObj.mk_grs_wgt.value = doMoneyFmt(formObj.mk_grs_wgt.value);
			formObj.mk_grs_wgt1.value = doMoneyFmt(formObj.mk_grs_wgt1.value);	
		}	
		if((colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del") && meas > 0){
			/*
				formObj.meas.value=doMoneyFmt(Number(meas).toFixed(3));
				formObj.meas1.value=roundXL(formObj.meas.value.replaceAll(",","") * 35.3165, 3);
				chkComma(formObj.meas1,8,3);				
				formObj.meas1.value=doMoneyFmt(Number(meas1).toFixed(3));
				formObj.meas.value=roundXL(formObj.meas1.value.replaceAll(",","") / 35.3165, 3);
				chkComma(formObj.meas,8,3);
			*/
			formObj.meas.value=doMoneyFmt(Number(meas).toFixed(3));
			formObj.meas1.value=roundXL(formObj.meas.value.replaceAll(",","") * 35.3165, 3);
			formObj.mk_meas1.value=formObj.meas1.value;
			formObj.mk_meas.value=formObj.meas.value;		
			chkComma(formObj.meas1,8,3);
			formObj.mk_meas.value = doMoneyFmt(formObj.mk_meas.value);
			formObj.mk_meas1.value = doMoneyFmt(formObj.mk_meas1.value);
			formObj.meas1.value=doMoneyFmt(Number(meas1).toFixed(3));
			formObj.meas.value=roundXL(formObj.meas1.value.replaceAll(",","") / 35.3165, 3);
			formObj.mk_meas.value=formObj.meas.value;
			formObj.mk_meas1.value=formObj.meas1.value;	
			chkComma(formObj.meas,8,3);
			formObj.mk_meas.value = doMoneyFmt(formObj.mk_meas.value);
			formObj.mk_meas1.value = doMoneyFmt(formObj.mk_meas1.value);
		}	
		/* jsjang 2013.7.22  요구사항 #15952 Container Info 자동 필드값 반영요건  */
		if((colNm == "cgo_pck_qty" || colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del") && formObj.shp_mod_cd.value =="FCL"){
			mkSaidTxt(docObjects[2], formObj.sad_txt);
		}	
	}
	/* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 End */	
}

function sheet4_OnBeforeCheck(sheetObj, row, col, value){
	var idx = 1;
	if(sheetObj.GetCellValue(row, "conls_ibflag") !="I"){
		return;
	}
	switch (sheetObj.ColSaveName(col)) {
		case "Del" :
			for(var i=1; i<=sheetObj.LastRow() + 1; i++){
				if(i != row){
					sheetObj.SetCellValue(i, 'Seq',idx++);
				}
			}
        break;
	}
}

function sumHblValue(){
	if(frm1.intg_bl_seq.value!=''){
		ajaxSendPost(getSumHblValue, 'reqVal', '&goWhere=aj&bcKey=sumHblValueSeaExp&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
	}		
}
function getSumHblValue(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			rtnArray=doc[1].split("^^");
			var grs_wgt=roundXL(parseFloat(rtnArray[0]), 3);
			var meas=roundXL(parseFloat(rtnArray[1]), 3);
			var pck_qty=roundXL(parseFloat(rtnArray[2]), 0);
			var grs_wgt1=roundXL(parseFloat(rtnArray[3]), 3);
			var meas1=roundXL(parseFloat(rtnArray[4]), 3);
			
			formObj.grs_wgt.value=grs_wgt;
			formObj.meas.value=meas;
			formObj.pck_qty.value=pck_qty;
			formObj.grs_wgt1.value=grs_wgt1;
			formObj.meas1.value=doMoneyFmt(Number(meas1).toFixed(0));
			
			chkComma(formObj.grs_wgt,8,3);
			chkComma(formObj.grs_wgt1,8,3);
			chkComma(formObj.meas,8,3);
			
			formObj.mk_grs_wgt.value=formObj.grs_wgt.value;
			formObj.mk_grs_wgt1.value=formObj.grs_wgt1.value;
			formObj.mk_meas.value=formObj.meas.value;
			formObj.mk_meas1.value=formObj.meas1.value;
		}else{
			//"There is no House B/L." 
			alert(getLabel('SEA_COM_ALT024'));
		}
	}
}
function test(){
	if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);}
}
function checkTrdpCode(obj){
	/*if(obj.name=="prnr_trdp_nm"){
	}else if(obj.name=="shpr_trdp_nm"){
	}
	else*/ 
	if(obj.name=="cnee_trdp_nm"){
		if(frm1.cnee_trdp_cd.value==""){
			frm1.cnee_trdp_addr.value=obj.value;
		}
	}
	else if(obj.name=="ntfy_trdp_nm"){
		if(frm1.ntfy_trdp_cd.value==""){
			frm1.ntfy_trdp_addr.value=obj.value;
		}
	}
	/*else if(obj.name=="act_shpr_trdp_nm"){
	}
	else if(obj.name=="cust_trdp_nm"){
	}
	else if(obj.name=="lnr_trdp_nm"){
	}
	else if(obj.name=="carr_trdp_nm"){
	}
	else if(obj.name=="prnr_trdp_nm2"){
	}
	else if(obj.name=="iss_trdp_nm"){
	}else if(obj.name=="third_trdp_nm"){
	}*/
}
function getMblCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bl_no.value!=''){
				//Please check B/L no.! alert
				// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다. 
	            setPost_date("I");
				//B/L No. is duplicated. \nDo you want to create MBL?
				if(confirm(getLabel('FMS_COM_ALT008') + getLabel('FMS_COM_CFMCON'))){
	            	   gridAdd(0);
	            	   docObjects[0].SetCellValue(1, 1,1);
	            	   //if(user_role_cd!="ADM"){
	            		   //save post date, office info
	            	   // /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다. 
	            	   //confirm 전에 check;
	            	   /***
	            	   	  if(ofc_post_dt=="ETD"){
	            			   frm1.post_dt.value=frm1.etd_dt_tm.value;
	            		   }
	            		   else if(ofc_post_dt=="ETA"){
	            			   frm1.post_dt.value=frm1.eta_dt_tm.value;
	            		   }
	            	   ***/	   
	            	   //}
	        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
	        		   var sndParam=getSndParam();
	        		   if(sndParam == true)	{	return false;	}	 
	        		   
	        		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
	        		   if (frm1.copy_bl_seq.value != ""){
	        			   frm1.copy_bl_seq.value = "";
	        		   }
	        		   
	            	   doShowProcess();
	                   frm1.f_cmd.value=ADD;
	            	   //docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), false);
	            	   docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, false);
	        	   }
			}
			else if(doc[1]=='RV'){
				//Please check B/L no.!!
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_BLNO'));
			}else{
				// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다. 
	            setPost_date("I");
				//Do you want to create MBL?
				if(confirm(getLabel('FMS_COM_CFMSAV'))){
            	   gridAdd(0);
            	   docObjects[0].SetCellValue(1, 1,1);
            	   //if(user_role_cd!="ADM"){
            		   //save post date, office info
            	   		// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다. 
            	   		//confirm 전에 check;
            	       /***
            	   	   if(ofc_post_dt=="ETD"){
            			   frm1.post_dt.value=frm1.etd_dt_tm.value;
            		   }
            		   else if(ofc_post_dt=="ETA"){
            			   frm1.post_dt.value=frm1.eta_dt_tm.value;
            		   }
            		   ***/
            	   //}
        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
        		   var sndParam=getSndParam();
        		   if(sndParam == true)	{	return false;	}	 
        		   
        		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
        		   
            	   doShowProcess();
                   frm1.f_cmd.value=ADD;
            	   //docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), false);
            	   docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, false);
        	   }			
			}
		}
	}
	else{
		//SEE_BMD_MSG43		
	}
}
//25559 NEW가 아닐시 BL중복을 체크한다.
function getMblCheckNoEmpBL(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bl_no.value!=''){
				//중복일 경우 ERROR
				goTabSelect('01');
				frm1.bl_no.focus();
				if(confirm(getLabel('FMS_COM_ALT008') + getLabel('FMS_COM_CFMCON'))){
					blDupl=false;
				} else {
					blDupl=true;
				}
			}else if(doc[1]=='RV'){
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_BLNO'));
				blDupl=true;
			}else{
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function getRefNoCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP'){
				refCheck=false;
				//Ref. No. is duplicate.
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_REFN'));
				frm1.ref_no.focus();
			}
			else{
				refCheck=true;
			}
		}
	}
	else{
		//SEE_BMD_MSG43
		refCheck=false;
	}
}
// Conatiner 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
function sheet4_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow()== row && "cntr_rmk" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			//#42686
			cntrGridAdd(sheetObj);
			//gridAdd(2);
			sheetObj.SelectCell(sheetObj.LastRow(), 0);
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "cgo_pck_qty" :
		case "cgo_wgt" :
		case "cgo_wgt1" :
		case "cgo_meas" :
		case "cgo_meas1" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
function copyFromHBL(){
	if(frm1.intg_bl_seq.value!=''){
		ajaxSendPost(getHblDesc, 'reqVal', '&goWhere=aj&bcKey=getHblDesc&f_air_sea_clss_cd=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+frm1.ref_no.value, './GateServlet.gsl');
	}
}
function getHblDesc(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('@@^^@@');
			formObj.desc_txt.value = rtnArr[1];
			formObj.mk_txt.value   = rtnArr[0];
			//frm1.desc_txt.value=doc[1];
		}
	}
	else{
		//SEE_BMD_MSG43
		refCheck=false;
	}
}
/**
 * HBL이 Confirm 또는 Closing 된 것이 있는지 확인후 삭제
 */
function doRmvSrInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
		   if(doc[1]==0){
			   //invoice 생성 유무를 체크한다.
			   ajaxSendPost(checkBlInvReq, 'reqVal', '&goWhere=aj&bcKey=getCheckInv&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
			   if(isInvStsOk){
	        	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
	                   frm1.f_cmd.value=REMOVE;
	            	   submitForm(REMOVE);
	        	   }
    		   }
    		   else{
    			   //You Cannot delete B/L. Because Invoice was already Issued.
    			   alert(getLabel('FMS_COM_ALT022'));
    		   }
//	     	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
//	               frm1.f_cmd.value = REMOVE;
//	        	   doShowProcess();
//	        	   frm1.submit();
//	    	   }				
		   }
		   else{
			   //Please delete the HB/L in advance.
			   alert(getLabel('FMS_COM_ALT026'));
		   }
		}
	}
}
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
function cntrGridCopy(sheetObj){
	if(frm1.shp_mod_cd.value=="FCL"){
 		var orgCnt=sheetObj.LastRow() + 1;
		var intRows=orgCnt;
		if(intRows==0){
			cntrGridAdd(sheetObj);
		}
else if(intRows<3 && typeof(sheetObj.GetCellValue(intRows, 'cntr_no'))=="undefined"){
			cntrGridAdd(sheetObj);
		}
		else{
			orgCnt = sheetObj.DataInsert();
//			sheetObj.CellValue2(orgCnt, 'cntr_no') 		= sheetObj.CellValue(orgCnt-1, 'cntr_no');
			sheetObj.SetCellValue(orgCnt, 'cntr_tpsz_cd',sheetObj.GetCellValue(orgCnt-1, 'cntr_tpsz_cd'),0);
			sheetObj.SetCellValue(orgCnt, 'temp_cd',sheetObj.GetCellValue(orgCnt-1, 'temp_cd'),0);
			sheetObj.SetCellValue(orgCnt, 'vent_cd',sheetObj.GetCellValue(orgCnt-1, 'vent_cd'),0);
//			sheetObj.CellValue2(orgCnt, 'seal_no1') 	= sheetObj.CellValue(orgCnt-1, 'seal_no1');
//			sheetObj.CellValue2(orgCnt, 'seal_no2') 	= sheetObj.CellValue(orgCnt-1, 'seal_no2');
//			sheetObj.CellValue2(orgCnt, 'seal_no3') 	= sheetObj.CellValue(orgCnt-1, 'seal_no3');
			sheetObj.SetCellValue(orgCnt, 'cgo_pck_qty',sheetObj.GetCellValue(orgCnt-1, 'cgo_pck_qty'),0);
			sheetObj.SetCellValue(orgCnt, 'cgo_pck_ut',sheetObj.GetCellValue(orgCnt-1, 'cgo_pck_ut'),0);
			sheetObj.SetCellValue(orgCnt, 'cgo_wgt',sheetObj.GetCellValue(orgCnt-1, 'cgo_wgt'),0);
			sheetObj.SetCellValue(orgCnt, 'cgo_wgt1',sheetObj.GetCellValue(orgCnt-1, 'cgo_wgt1'),0);
			sheetObj.SetCellValue(orgCnt, 'cgo_meas',sheetObj.GetCellValue(orgCnt-1, 'cgo_meas'),0);
			sheetObj.SetCellValue(orgCnt, 'cgo_meas1',sheetObj.GetCellValue(orgCnt-1, 'cgo_meas1'),0);
			sheetObj.SetCellValue(orgCnt, 'vol_meas',sheetObj.GetCellValue(orgCnt-1, 'vol_meas'),0);
			sheetObj.SetCellValue(orgCnt, 'intg_bl_seq',sheetObj.GetCellValue(orgCnt-1, 'intg_bl_seq'),0);
		}
	}
}
/*
 *  2012.03.21 
 * Master Freight Tab 추가
 */
function getSdSheet(){
	return docObjects[4];
}
function getBcSheet(){
	return docObjects[5];
}
function getDcSheet(){
	return docObjects[6];
}
function sheet7_OnClick(sheetObj, row, col){
	mutiSheetOnClick(sheetObj, row, col, '');
}
function sheet7_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, '');
}
function sheet7_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'O', 'M');
}
function sheet7_OnChange(sheetObj, row, col, value) {
	switch (sheetObj.ColSaveName(col)) {
		case "fr_qty" :
		case "fr_ru" :
		case "fr_trf_cur_sum_amt" :
		case "fr_vat_rt" :
		case "fr_vat_amt" :
		case "fr_inv_xcrt" :
		case "fr_inv_amt" :
		case "fr_inv_vat_amt" :
		case "fr_inv_sum_amt" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	mutiSheetOnChange(sheetObj, row, col, '', 'S', 'O', 'M');
	if(sheetObj.ColSaveName(col) == "fr_inv_sum_amt"){
		isCalculateProfit = 2;
		calculateProfit();
	}
}
function sheet7_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('SD');
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, '', 'S', 'O', 'M');
	} 	
}
function sheet7_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('SD');
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
}
function sheet7_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'O', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "fr_frt_check" == sheetObj.ColSaveName(col)){
			//gridAdd(4);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			frtRowAdd('ROWADD', docObjects[4], 'S', 'O', 'M');
			sheetObj.SelectCell(row + 1, 0);
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "fr_qty" :
		case "fr_ru" :
		case "fr_trf_cur_sum_amt" :
		case "fr_vat_rt" :
		case "fr_vat_amt" :
		case "fr_inv_xcrt" :
		case "fr_inv_amt" :
		case "fr_inv_vat_amt" :
		case "fr_inv_sum_amt" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
function sheet8_OnClick(sheetObj, row, col){
	mutiSheetOnClick(sheetObj, row, col, 'b_');
}
function sheet8_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'b_');
}
function sheet8_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'O', 'M');
}
function sheet8_OnChange(sheetObj, row, col, value) {
	switch (sheetObj.ColSaveName(col)) {
		case "b_fr_qty" :
		case "b_fr_ru" :
		case "b_fr_trf_cur_sum_amt" :
		case "b_fr_vat_rt" :
		case "b_fr_vat_amt" :
		case "b_fr_inv_xcrt" :
		case "b_fr_inv_amt" :
		case "b_fr_inv_vat_amt" :
		case "b_fr_inv_sum_amt" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	mutiSheetOnChange(sheetObj, row, col,  'b_', 'S', 'O', 'M');
	if(sheetObj.ColSaveName(col) == "b_fr_inv_sum_amt"){
		isCalculateProfit = 2;
		calculateProfit();
	}
}
function sheet8_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, 'b_', 'S', 'O', 'M');
	}	
	calculateProfit();
}
function sheet8_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
}
function sheet8_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="b_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'O', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "b_fr_frt_check" == sheetObj.ColSaveName(col)){
			//gridAdd(5);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			frtRowAdd('BCROWADD', docObjects[5], 'S', 'O', 'M');
			sheetObj.SelectCell(row + 1, 0);
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "b_fr_qty" :
		case "b_fr_ru" :
		case "b_fr_trf_cur_sum_amt" :
		case "b_fr_vat_rt" :
		case "b_fr_vat_amt" :
		case "b_fr_inv_xcrt" :
		case "b_fr_inv_amt" :
		case "b_fr_inv_vat_amt" :
		case "b_fr_inv_sum_amt" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
function sheet9_OnClick(sheetObj, row, col){
	mutiSheetOnClick(sheetObj, row, col, 'dc_');
}
function sheet9_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'dc_');
}
function sheet9_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'O', 'M');
}
function sheet9_OnChange(sheetObj, row, col, value) {
	switch (sheetObj.ColSaveName(col)) {
		case "dc_fr_qty" :
		case "dc_fr_ru" :
		case "dc_fr_agent_ru" :
		case "dc_fr_inv_xcrt" :
		case "dc_fr_inv_sum_amt" :
		case "dc_fr_agent_amt" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	mutiSheetOnChange(sheetObj, row, col,  'dc_', 'S', 'O', 'M');
	isCalculateProfit = 2;
	calculateProfit();
}
function sheet9_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, 'dc_', 'S', 'O', 'M');
	}
	calculateProfit();
}
function sheet9_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
}
function sheet9_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="dc_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'O', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "dc_fr_frt_check" == sheetObj.ColSaveName(col)){
			//gridAdd(6);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			frtRowAdd('DCROWADD', docObjects[6], 'S', 'O', 'M');
			sheetObj.SelectCell(row + 1, 0);
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "dc_fr_qty" :
		case "dc_fr_ru" :
		case "dc_fr_agent_ru" :
		case "dc_fr_inv_xcrt" :
		case "dc_fr_inv_sum_amt" :
		case "dc_fr_agent_amt" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
function sheet10_OnSearchEnd(sheetObj, row, col) {
	//Container Type Size 설정
	var TPSZCD1=' |';
	var TPSZCD2=' |';
 	var totCnt=sheetObj.LastRow() + 1;
	for(var i=1; i < totCnt; i++){
		if(sheetObj.GetCellValue(i, 1)!=''){
			TPSZCD1+= sheetObj.GetCellValue(i, 0);
			TPSZCD2+= sheetObj.GetCellValue(i, 0);
			
			if (totCnt - 1 > i) {
				TPSZCD1+= '|';
				TPSZCD2+= '|';
			}
		}
	}
	docObjects[4].SetColProperty("fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[5].SetColProperty("b_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[6].SetColProperty("dc_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
}
/**
* Container Sheet Object를 리턴함
*/
function getCrtrSheet(){
	//BL_COPY
	if (frm1.copy_bl_seq.value == ""){
		return docObjects[7];
	} else {
		
		//CNTR의 Unit Combo정보를 담을 Sheet를 만든다.
		var curSheet = docObjects[2];
		var frtSheet = docObjects[7];
		
		//sheet를 초기화한다.
		frtSheet.RemoveAll();
		
		for(var i=1 ; i<curSheet.LastRow()+1 ; i++){
			cntrGridAdd(frtSheet);
			frtSheet.SetCellValue(i, 0, curSheet.GetCellValue(i,"cntr_tpsz_cd"));
			frtSheet.SetCellValue(i, 1, curSheet.GetCellValue(i,"cgo_pck_qty"));
		}
		setFrtCntrUnitCombo(frtSheet);
		return frtSheet;
		
	}
}

function goToInvoice(sheetObj, obj){
	switch(obj){
		case "LOCAL":
			var formObj=document.frm1;
			if( frFrtCheckRow(sheetObj, "")){
				return;
			}
			var chkCnt=0;
			var chk_fr_trdp_cd="";
			var chk_fr_trdp_nm="";
			var chk_fr_inv_curr_cd="";
			var chk_fr_frt_seq="";
			for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
			if(sheetObj.GetCellValue(i, "fr_frt_check") == 1){
			chk_fr_trdp_cd=sheetObj.GetCellValue(i, 'fr_trdp_cd');
			chk_fr_trdp_nm=sheetObj.GetCellValue(i, 'fr_trdp_nm');
			chk_fr_inv_curr_cd=sheetObj.GetCellValue(i, 'fr_inv_curr_cd');
					if(chkCnt > 0){
						chk_fr_frt_seq += ", ";
					}
					chk_fr_frt_seq		+= 	sheetObj.GetCellValue(i, 'fr_frt_seq');
					chkCnt++;
				}
			}
			var param="&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
			param += "&s_bl_no=" + formObj.bl_no.value;
			param += "&f_bl_no=" + formObj.bl_no.value;
			param += "&f_air_sea_clss_cd=S";
			param += "&f_biz_clss_cd=M";
			param += "&f_bnd_clss_cd=O";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
		   	var paramStr="./ACC_INV_0010.clt?f_cmd="+param;
		   	parent.mkNewFrame('A/R Entry', paramStr);
		   	break;
		case "AP":
			var formObj=document.frm1;
			if( frFrtCheckRow(sheetObj, "b_")){
				return;
			}
			var chkCnt=0;
			var chk_fr_trdp_cd=formObj.carr_trdp_cd.value;
			var chk_fr_trdp_nm=formObj.carr_trdp_nm.value;
			var chk_fr_inv_curr_cd="";
			var chk_fr_frt_seq="";
			var chk_fr_inv_no="";
			var firstIdx=-1;
 			for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
			if(sheetObj.GetCellValue(i, "b_fr_frt_check") == 1){
			chk_fr_trdp_cd=sheetObj.GetCellValue(i, 'b_fr_trdp_cd');
			chk_fr_trdp_nm=sheetObj.GetCellValue(i, 'b_fr_trdp_nm');
			chk_fr_inv_curr_cd=sheetObj.GetCellValue(i, 'b_fr_inv_curr_cd');
			chk_fr_inv_no=sheetObj.GetCellValue(i, 'b_fr_inv_no');
					if(chkCnt > 0){
						chk_fr_frt_seq += ',';
					}
					chk_fr_frt_seq		+= 	sheetObj.GetCellValue(i, 'b_fr_frt_seq');
					firstIdx=i;
					chkCnt++;
				} 
			}
			var param="&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
			param += "&s_bl_no=" + formObj.bl_no.value;
			param += "&f_bl_no=" + formObj.bl_no.value;
			param += "&f_air_sea_clss_cd=S";
			param += "&f_biz_clss_cd=M";
			param += "&f_bnd_clss_cd=O";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
			/* #20961 Ocean Export Master and Ocean Import Master 에서
			A/P Invoice 화면 이동 시, Vendor Inv No 가 null 이면(#22112에 의해 조건 수정)
			Vndr Invoice No 에 MBL# 세팅 */
//			if(sheetObj.GetCellValue(firstIdx, 'b_fr_buy_inv_no') != '' ){		//Pierpass 인경우 Container No 가 Vendor Invoice No 로 자동 셋업됨.
			if(sheetObj.GetCellValue(firstIdx, 'b_fr_buy_inv_no') != '' && sheetObj.GetCellValue(firstIdx, 'b_fr_buy_inv_no') != '-1'){		//Pierpass 인경우 Container No 가 Vendor Invoice No 로 자동 셋업됨.
				param += "&s_inv_no=" +  sheetObj.GetCellValue(firstIdx, 'b_fr_buy_inv_no');
//			}else if (chk_fr_inv_no == undefined  || chk_fr_inv_no == "undefined" || chk_fr_inv_no == "") {
			}else {
				param += "&s_inv_no=" + formObj.bl_no.value;
			}
		   	var paramStr="./ACC_INV_0030.clt?f_cmd="+param;
		   	parent.mkNewFrame('A/P Entry(Cost)', paramStr);
		   	break;
		case "DC":
			var formObj=document.frm1;
			if( frFrtCheckRow(sheetObj, "dc_")){
				return;
			}
			var chkCnt=0;
			var chk_fr_trdp_cd="";
			var chk_fr_trdp_nm="";
			var chk_fr_inv_curr_cd="";
			var chk_fr_frt_seq="";
 			for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
			if(sheetObj.GetCellValue(i, "dc_fr_frt_check") == 1){
			chk_fr_trdp_cd=sheetObj.GetCellValue(i, 'dc_fr_trdp_cd');
			chk_fr_trdp_nm=sheetObj.GetCellValue(i, 'dc_fr_trdp_nm');
			chk_fr_inv_curr_cd=sheetObj.GetCellValue(i, 'dc_fr_inv_curr_cd');
					if(chkCnt > 0){
						chk_fr_frt_seq += ',';
					}
					chk_fr_frt_seq		+= 	sheetObj.GetCellValue(i, 'dc_fr_frt_seq');
					chkCnt++;
				}
			}
			var param="&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
			param += "&s_bl_no=" + formObj.bl_no.value;
			param += "&f_bl_no=" + formObj.bl_no.value;
			param += "&f_air_sea_clss_cd=S";
			param += "&f_biz_clss_cd=M";
			param += "&f_bnd_clss_cd=O";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
		   	var paramStr="./ACC_INV_0020.clt?f_cmd="+param;
		   	parent.mkNewFrame('D/C Note Entry', paramStr);
		   	break;
	}
}
function goToInvoiceModify(obj){
	var arObj=docObjects[4];
	var apObj=docObjects[5];
	var dcObj=docObjects[6];
	switch(obj){
		case "LOCAL":
			if(arObj.GetCellValue(arObj.GetSelectRow(), "fr_inv_seq")!=""){
				var param="&f_inv_seq=" + arObj.GetCellValue(arObj.GetSelectRow(), "fr_inv_seq");
				var paramStr="./ACC_INV_0010.clt?f_cmd="+param;
				parent.mkNewFrame('A/R Entry', paramStr);
			}
			break;
		case "AP":
			if(apObj.GetCellValue(apObj.GetSelectRow(), "b_fr_inv_seq")!=""){
				var param="&f_inv_seq=" + apObj.GetCellValue(apObj.GetSelectRow(), "b_fr_inv_seq");
				var paramStr="./ACC_INV_0030.clt?f_cmd="+param;
				parent.mkNewFrame('A/P Entry(Cost)', paramStr);
			}
			break;
		case "DC":
			if(dcObj.GetCellValue(dcObj.GetSelectRow(), "dc_fr_inv_seq")!=""){
				var param="&f_inv_seq=" + dcObj.GetCellValue(dcObj.GetSelectRow(), "dc_fr_inv_seq");
				var paramStr="./ACC_INV_0020.clt?f_cmd="+param;
				parent.mkNewFrame('D/C Note Entry', paramStr);
			}
			break;
	}
}
function searchGrid(gridIdx){
	switch(gridIdx){
		case 6:
			//Freight될 Container 조회
			frm1.f_cmd.value=SEARCHLIST01;
 			docObjects[7].DoSearch("./SEE_FRT_0010GS.clt", FormQueryString(frm1) );
		break;
		case 7:
			//Selling/Debit Freight 조회
			frm1.f_cmd.value=SEARCHLIST07;
 			docObjects[4].DoSearch("./SEE_BMD_0040_7GS.clt", FormQueryString(frm1) );
			break;
		case 8:
			//Buying/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST08;
 			docObjects[5].DoSearch("./SEE_BMD_0040_8GS.clt", FormQueryString(frm1) );
			break;
		case 9:
			//Debit/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST09;
 			docObjects[6].DoSearch("./SEE_BMD_0040_9GS.clt", FormQueryString(frm1) );
			break;
		/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
		case 10:
			//Status List 조회
			frm1.f_cmd.value=SEARCHLIST10;
 			docObjects[8].DoSearch("./SEE_BMD_0026_1GS.clt", FormQueryString(frm1) );
			break;	
		//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
		case 11:
			//WorkOrder List 조회
			frm1.f_cmd.value=SEARCHLIST08;
 			docObjects[9].DoSearch("./SEE_BMD_0025GS.clt", FormQueryString(frm1) );
		break;	
	}
}
var mailTo="";
function getMailTo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			mailTo="";
		}
		else{
			mailTo=doc[1];
		}
	}
}
function setBillingCarrier(){
	var formObj=document.frm1;
	// #23721 요건변경됨.
	// formObj.carr_trdp_cd.value = formObj.lnr_trdp_cd.value;
	// formObj.carr_trdp_nm.value = formObj.lnr_trdp_nm.value;
}
function blTpChange(blTp){
/*
	var formObj=document.frm1;
	if(blTp == "DR"){	//Direct
		formObj.agent_trdp_cd.className="search_form";
		formObj.agent_trdp_nm.className="search_form";
		formObj.prnr_trdp_cd.className="search_form";
		formObj.prnr_trdp_nm.className="search_form";
		formObj.agent_trdp_cd.readOnly=false;
		formObj.agent_trdp_nm.readOnly=false;
		formObj.prnr_trdp_cd.readOnly=false;
		formObj.prnr_trdp_nm.readOnly=false;
	}else{
		formObj.agent_trdp_cd.className="search_form-disable";
		formObj.agent_trdp_nm.className="search_form-disable";
		formObj.prnr_trdp_cd.className="search_form-disable";
		formObj.prnr_trdp_nm.className="search_form-disable";
		formObj.agent_trdp_cd.readOnly=true;
		formObj.agent_trdp_nm.readOnly=true;
		formObj.prnr_trdp_cd.readOnly=true;
		formObj.prnr_trdp_nm.readOnly=true;
		formObj.agent_trdp_cd.value="";
		formObj.agent_trdp_nm.value="";
		formObj.prnr_trdp_cd.value="";
		formObj.prnr_trdp_nm.value="";
		formObj.agent_trdp_addr.value="";
	}
*/
}
/* jsjang 2013.7.22 요구사항 #15952 Container Info 자동 필드값 반영요건  */
function setPacQty(){
	var formObj=document.frm1;
	if(formObj.shp_mod_cd.value !="FCL")
	{
		//formObj.sad_txt.value = formObj.pck_qty.value + "  " + formObj.pck_ut_cd.options[formObj.pck_ut_cd.selectedIndex].text;
		mkSaidTxt(docObjects[2], formObj.sad_txt);
	}
}
var NEXT_BLOCK_DT="";    	//MAX(BLOCK_DT)+1
/** LHK, 20131025 #21734  [BINEX]Post Date Check 로직 적용
*  File Block_dt 와 Post Date 체크, Post Date Set, BL 생성시 post date 에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
**/
function setPost_date(save_flag){
	var formObj=document.frm1;
	if(save_flag == "I"){
		if(ofc_post_dt=="ETD"){
			formObj.post_dt.value=formObj.etd_dt_tm.value;
		} else if(ofc_post_dt=="ETA"){
			formObj.post_dt.value=formObj.eta_dt_tm.value;
		//25273 OFC_CD변경시 TODAY에 대한 고려가 없어서 추가
		} else if(ofc_post_dt=="TODAY"){
			//LHK, 20140924 #43960 [DYNAMIC] Post Date 변경
			if(formObj.post_dt.value==""){
				formObj.post_dt.value=getTodayStr();
			}
		}
	}else if(save_flag == "U"){
		if(ofc_post_dt=="ETD"){
			if (frm1.etd_dt_tm.value != frm1.org_etd_dt_tm.value ){
				formObj.post_dt.value=formObj.etd_dt_tm.value;
			}			
		} else if(ofc_post_dt=="ETA"){
			if (frm1.eta_dt_tm.value != frm1.org_eta_dt_tm.value ){
				formObj.post_dt.value=formObj.eta_dt_tm.value;
			}
		}
	}
	
	
	
	
	
	
	//Update 인 경우  post date 가 변경된 경우에만 post date 비교 처리로직 적용.
	if(save_flag == "U"){
		if(formObj.post_dt.value == formObj.org_post_dt.value){	
			return;
		}
	}
	//MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt', './GateServlet.gsl');
	if(formObj.post_dt.value == ""){
		formObj.post_dt.value=NEXT_BLOCK_DT;
	}
	if(formObj.post_dt.value == ""){
		alert(getLabel("SEA_COM_ALT027"));
		return;
	}
	if(NEXT_BLOCK_DT != "") { 
		//post_dt 와 block_dt 비교
//		fromDate > toDate true
		if(compareTwoDate(NEXT_BLOCK_DT, formObj.post_dt.value)){
			formObj.post_dt.value=NEXT_BLOCK_DT;
		}
	}
}
function getMaxBlockOrJnrNextDt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			NEXT_BLOCK_DT=doc[1];
			NEXT_BLOCK_DT=NEXT_BLOCK_DT.substring(4,6) + "-" + NEXT_BLOCK_DT.substring(6,8) + "-" + NEXT_BLOCK_DT.substring(0,4);
		}else{
			NEXT_BLOCK_DT="";
		}
	}
}
function ofcChDEta() {
	var formObj=document.frm1;
	var ofc_cd=formObj.ref_ofc_cd.options[formObj.ref_ofc_cd.selectedIndex].text;
	ajaxSendPost(getExpPostRef, 'reqVal', '&goWhere=aj&bcKey=getExpPostRef&f_ofc_cd='+ofc_cd, './GateServlet.gsl');
}
function getExpPostRef(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]!=''){
				ofc_post_dt=doc[1];
			}
		}
	}
}
function checkDuplicateLinerBkgNo(){
	var formObj=document.frm1;
	if(formObj.lnr_bkg_no.value != ""){
		if(formObj.lnr_bkg_no.value != formObj.org_lnr_bkg_no.value){
			ajaxSendPost(checkDuplicateLinerBkgNoEnd, 'reqVal', '&goWhere=aj&bcKey=searchDuplicateLinerBkgNo&lnr_bkg_no='+formObj.lnr_bkg_no.value+'&air_sea_clss_cd='+'S' , './GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN
 * Carrier Bkg NO 중복체크
 */
function checkDuplicateLinerBkgNoEnd(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				//DUP BKG No ==> proceed with Confirmation.
				if( !confirm( (getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_CBKNO') + '\n'+ getLabel('FMS_COM_CFMPRO'))  ) )	
				{
					formObj.lnr_bkg_no.value=formObj.org_lnr_bkg_no.value;
					formObj.lnr_bkg_no.select();
				}
			}
		}
	}
}
/**
 * MB/L No 기입하면, MB/L 넘버의 Prefix(첫 4 캐릭터)를 Carrier 항목(Code)에 자동 기입되도록. (Carrier 가 비어 있는 경우에만)
 */
function setCarrierCd(obj){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();
	if ((window.event.keyCode == 13 && s_code != "") || window.event.type == "blur") {
		if(formObj.lnr_trdp_cd.value == "" && s_code.length >= 4) {
			var bl_no=formObj.bl_no.value.toUpperCase();
			var s_code=bl_no.substring(0,4);
			formObj.lnr_trdp_cd.value=s_code;
			codeNameAction('trdpCode_sea_liner', formObj.lnr_trdp_cd, 'onBlur');
		}
	}
}
//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
/**
 * Work Order 화면이동
 */
function sheet12_OnDblClick(sheetObj, row, col){
var param='f_wo_no=' + sheetObj.GetCellValue(row, 'wo_no');
	   param += '&air_sea_clss_cd=S'; 
	   param += '&bnd_clss_cd=O';
	   param += '&biz_clss_cd=M';
   	var paramStr="./AIC_WOM_0010.clt?f_cmd="+SEARCH+"&"+param;
   	parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
}

/*
 * on board date, vsl name
 * clean on board 내용을 만들어 준다.
 */
function cobChange(){
	//#30284 [BINEX]OEH On-Board Date 동기화
	var formObj = document.frm1;
	formObj.clean_on_board.value = sea_cob;
	formObj.clean_on_board.value += "\r\n";
	formObj.clean_on_board.value += mkCharDateFormat(formObj.etd_dt_tm.value);
	formObj.clean_on_board.value += "\r\n";		
	formObj.clean_on_board.value += "-------------------";
	if(vsl_show_flg=="Y"){
		formObj.clean_on_board.value += "\r\n";
		formObj.clean_on_board.value += formObj.trnk_vsl_nm.value + " " + formObj.trnk_voy.value;
	}
	if(load_port_show_flg=="Y"){
		formObj.clean_on_board.value += "\r\n";
		formObj.clean_on_board.value += formObj.pol_nm.value;
	}
			
	//formObj.obrd_dt_tm1.value = formObj.obrd_dt_tm.value; 

}


//BL_COPY
function selectCopyBLFrt(){
	 openBlCopyPopUp("COPY_CONFIRM_POPUP",this,this);
}

//BL_COPY
function COPY_CONFIRM_POPUP(rtnVal){
	
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var copyYn = value=rtnValAry[0];
		if (copyYn) {
			
			var arFrt_copy_chk=rtnValAry[1];
			var apFrt_copy_chk=rtnValAry[2];
			var dcFrt_copy_chk=rtnValAry[3];
			
			if (orgBlSeq != "") {
			
				var orgBlSeq = frm1.copy_bl_seq.value;
				var tmpIntgBlSeq = frm1.intg_bl_seq.value;; 
				frm1.intg_bl_seq.value = frm1.copy_bl_seq.value;
							
				if (arFrt_copy_chk == "Y") {
					//Selling/Debit Freight 조회
					frm1.f_cmd.value=SEARCHLIST07;
		 			docObjects[4].DoSearch("./SEE_BMD_0040_7GS.clt", FormQueryString(frm1) );
				}
				
				if (apFrt_copy_chk == "Y") {
					//Buying/Crebit List 조회
					frm1.f_cmd.value=SEARCHLIST08;
		 			docObjects[5].DoSearch("./SEE_BMD_0040_8GS.clt", FormQueryString(frm1) );
				}
				
				if (dcFrt_copy_chk == "Y") {
					//Debit/Crebit List 조회
					frm1.f_cmd.value=SEARCHLIST09;
		 			docObjects[6].DoSearch("./SEE_BMD_0040_9GS.clt", FormQueryString(frm1) );
				}

				frm1.intg_bl_seq.value = tmpIntgBlSeq;	
			}
		}
	}
}


//BL_COPY frt에 설정할 콤보를 만든다.
function setFrtCntrUnitCombo(sheetObj){
	
	//Container Type Size 설정
	var TPSZCD1=' |';
	var TPSZCD2=' |';
 	var totCnt=sheetObj.LastRow() + 1;
	for(var i=1; i < totCnt; i++){
		if(sheetObj.GetCellValue(i, 1)!=''){
			TPSZCD1+= sheetObj.GetCellValue(i, 0);
			TPSZCD2+= sheetObj.GetCellValue(i, 0);
			
			if (totCnt - 1 > i) {
				TPSZCD1+= '|';
				TPSZCD2+= '|';
			}
		}
	}
	docObjects[4].SetColProperty("fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[5].SetColProperty("b_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[6].SetColProperty("dc_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
}

//화면의 checkbox를 database 값으로 셋팅한다.
function checkBoxSetting(){
	var formObj=document.frm1;
	if(formObj.ctrb_ratio_yn.value=="Y"){
		formObj.ctrb_ratio_yn.checked=true;
	}else{
		formObj.ctrb_ratio_yn.checked=false;
	}
}


function setExpressTpCdVal(reqVal){
  var doc=getAjaxMsgXML(reqVal);

  if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
	  INST_PROFIT = doc[1];
  }else{
	  INST_PROFIT = "N";
  }
}

function calculateProfit(){
	isCalculateProfit++;
	if(isCalculateProfit == 3){
		var Account_Receivable = 0;
		var Account_Payable = 0;
		var Debit_Amount = 0;
		var Credit_Amount = 0;
		for (var i=0;i < sheet7.RowCount();i++){
			Account_Receivable += parseFloat(sheet7.GetRowJson(i+2).fr_inv_sum_amt);
		}
		
		for (var i=0;i < sheet9.RowCount();i++){
			Debit_Amount += parseFloat(sheet9.GetRowJson(i+2).dc_fr_inv_sum_amt);
			Credit_Amount += parseFloat(sheet9.GetRowJson(i+2).dc_fr_agent_amt);
		}
		
		for (var i=0;i < sheet8.RowCount();i++){
			Account_Payable += parseFloat(sheet8.GetRowJson(i+2).b_fr_inv_sum_amt);
		}
		document.frm1.profit.value = Number(Account_Receivable - Account_Payable +  Debit_Amount - Credit_Amount).toFixed(2);
		chkComma(document.frm1.profit, 100, 2);
		isCalculateProfit=0;
	}
}

var isCalculateProfit = 0;
