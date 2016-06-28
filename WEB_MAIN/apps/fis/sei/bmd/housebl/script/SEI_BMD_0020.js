/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEI_BMD_0020.js
*@FileTitle  :  SEI_BMD_0020
*@author     : CLT
*@version    : 1.0
*@since      : 2015/06/18
=========================================================*/

var docListSheet=false;
var cntrListSheet=false;
var cmdtListSheet=false;
var frtSdSheet=false;
var frtBcSheet=false;
var frtDcSheet=false;
var anSheet=false;
var jobListSheet=false;
var isError=false;
var isInvStsOk=false;
var ccn_dupl=false;
var hbl_ser_dupl=false;
var rtnary=new Array(1);
var callBackFunc = "";
/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
var dimListSheet=false;
var udfListSheet = false;
var isMBLCreated = false;

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

var OIH_AN_CNTR_INFO = "CS";

/* 
 * jsjang 2013.7.5 
 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건
 * end 
 */  
//저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	isError=false;
    var sheetParam='';
//    if(!blCheckInpuVals()){
//		isError = true;
//    }
    var docListParam=docObjects[7].GetSaveString(false);
    if(docListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= docListParam;
    	docListSheet=true;
	}
    var cntrListParam=docObjects[1].GetSaveString(false);
	if(cntrListParam!=''){
		isError=cntrListCheckInpuVals(docObjects[1]);
		if(!isError){
			sheetParam+= '&';
	    	sheetParam+= cntrListParam;
	    	cntrListSheet=true;
		}
	}
	var cmdtListParam=docObjects[2].GetSaveString(false);
	if(cmdtListParam!=''){
		isError=itemCheckInpuVals(docObjects[2]);
		if(!isError){
	    	sheetParam+= '&';
	    	sheetParam+= cmdtListParam;
	    	cmdtListSheet=true;
		}
	}
	/* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리(flag)-Freight 부터 다시 초기화 */
	isError=false;
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
    var frtDcListParam=docObjects[9].GetSaveString(false);
	if(frtDcListParam!=''){
		var rtnFlg=frCheckInpuVals(docObjects[9], 'dc_');
		if(rtnFlg=='IV'){
    		isError=true;
    	}
		frtDcListParam=docObjects[9].GetSaveString(false);
		sheetParam+= '&';
		sheetParam+= frtDcListParam;
		frtDcSheet=true;
	}
	var anListParam=docObjects[10].GetSaveString(false);
	if(anListParam!=''){
		sheetParam+= '&';
		sheetParam+= anListParam;
		anSheet=true;
	}
	var jobListParam=docObjects[6].GetSaveString(false);
    if(jobListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= jobListParam;
        jobListSheet=true;
    }
    /* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim Start */
    var dimListParam=docObjects[11].GetSaveString(false);
    if(dimListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= dimListParam;
        dimListSheet=true;
    }     
    /* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim end */
    
    
    var udfListParam = docObjects[13].GetSaveString(false);
    if(udfListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= udfListParam;
    	
        udfListSheet = true;
    }
    
    /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리(flag) */
    if(isError == true)
    {
    	return true;
    }      
	return sheetParam;
}
function doWork(srcName){
	//alert(srcName);
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    try {
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
	        case "SAVE":	//등록
	            if(frm1.intg_bl_seq.value==""){
	            	doWork("SAVE_ADD");
	            }else{
	            	doWork("SAVE_MODIFY");
	            }
	            break;
	        case "HBL_ADD":	//등록
	        	var asRef_no     = frm1.ref_no.value;
	        	var asCcn_no     = frm1.ccn_no.value;
	        	var asMnf_fr_loc = frm1.mnf_fr_loc.value;
	        	var asMnf_to_loc = frm1.mnf_to_loc.value;
	        	
	        	var paramStr="./SEI_BMD_0020.clt?";
	        	paramStr+= "f_mbl_ref_no=" + asRef_no;
	        	paramStr+= "&f_pre_ccn_no=" + asCcn_no;
	        	paramStr+= "&f_mnf_fr_loc=" + asMnf_fr_loc;
	        	paramStr+= "&f_mnf_to_loc=" + asMnf_to_loc;
	        	parent.mkNewFrame('Booking & HBL', paramStr);
	            break;    
	        case "SAVE_ADD":	//등록
        		frm1.f_cmd.value=ADD;
        		if(blCheckInpuValsForAdding() && validateAccountPayable()){
        			if(getStringLength(frm1.ref_no.value) == 0){
        				
             		   /** #52165 [Globe Runner] HBL > MBL Create **/
             		   if (confirm(getLabel('FMS_COM_CFMMBLCRE'))){
             			   setPost_date("I");
             			   srOpenPopUp('CREATE_MBL_POPLIST_OIH',this)
             		   } else {
             			   moveTab('01');
             			   frm1.ref_no.focus();
             			   return;
             		   }
             		   
        			}else{
        			//#48103 remove space
        			frm1.bl_no.value=trim(frm1.bl_no.value);
               		frm1.ref_no.value=trim(frm1.ref_no.value);
               		
        		   if (!checkHblRefNo('S','I')) { // #43380 HBL 저장시 Filing No 유효성 체크
         			   return;
              	   }
            	   if(!etdRangeOk){
             			//[Warning] ETD is outside range of 6 months from today. \nPlease kindly check ETD  again.
            		   alert(getLabel('FMS_COM_ALT021'));
            	   }
            	   if(!etaRangeOk){
            		   //[Warning] ETA is outside range of 6 months from today. \nPlease kindly check ETA  again.
            		   alert(getLabel('FMS_COM_ALT021'));
            	   }
            	   if(!cntrListValid(docObjects[1])){
            		   alert(getLabel('SEA_COM_ALT020'));
            		   return;
            	   }
            	   ajaxSendPost(getHblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=I&f_biz_clss_cd=H&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');
	          	/* 
	          	 * jsjang 2013.7.5 
	          	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start 
	          	 */        
	          	cntr_ship_init();
        			}
        		}
	          	/* 
	          	 * jsjang 2013.7.5 
	          	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end 
	          	 */           		
        		break;
           case "SAVE_MODIFY":	//등록
               frm1.f_cmd.value=MODIFY;
               //if(inpuValCheck(sheetObj, ADD)){
                   //전체 CellRow의 갯수
//                   if(!isError&&confirm(getLabel('FMS_COM_CFMSAV'))){
                	   if(blCheckInpuVals() && validateAccountPayable()){
                		   //#48103 remove space
                     	   frm1.bl_no.value=trim(frm1.bl_no.value);
                     	   frm1.ref_no.value=trim(frm1.ref_no.value);
                     		
                		   if (!checkHblRefNo('S','I')) { // #43380 HBL 저장시 Filing No 유효성 체크
                    		   return;
                    	   }                		  
                		   if(!etdRangeOk){
                    			//[Warning] ETD is outside range of 6 months from today. \nPlease kindly check ETD  again.
                			   alert(getLabel('FMS_COM_ALT021'));
                		   }
                		   if(!etaRangeOk){
                			   //[Warning] ETA is outside range of 6 months from today. \nPlease kindly check ETA  again.
                			   alert(getLabel('FMS_COM_ALT021'));
                		   }
                    	   if(!cntrListValid(docObjects[1])){
                    		   alert(getLabel('SEA_COM_ALT020'));
                    		   return;
                    	   }
                		   if(frm1.h_bl_no.value!=frm1.bl_no.value){
                			   ajaxSendPost(getHblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=I&f_biz_clss_cd=H&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');
                		   }else{
                			   if(confirm(getLabel('FMS_COM_CFMSAV'))){
                        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
                        		   var sndParam=getSndParam();
                        		   if(sndParam == true)	{	return false;	}                				   
                        		   //var sndParam = getSndParam();
                				   gridAdd(0);
                            	   docObjects[0].SetCellValue(1, 1,1);
                            	   frm1.f_bl_no.value=frm1.bl_no.value;
                            	   doShowProcess();
                				   docObjects[0].DoAllSave("./SEI_BMD_0020GS.clt", FormQueryString(frm1)+sndParam, true);
                			   }
                		   }
                       }
//                	   //save post date, office info
//                	   if(ofc_post_dt=="ETD"){
//                		   frm1.post_dt.value = frm1.etd_dt_tm.value;
//                	   }else if(ofc_post_dt=="ETA"){
//                		   frm1.post_dt.value = frm1.eta_dt_tm.value;
//                	   }
                	   //docObjects[0].ShowDebugMsg = true;
                	   //docObjects[0].ShowDebugMsg = false;
//                   }
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
               frm1.f_cmd.value=COMMAND10;
	    	   if(!cntrListValid(docObjects[1])){
	    		   alert(getLabel('SEA_COM_ALT020'));
	    	   }
        	   if(confirm(getLabel('FMS_COM_CFMSAV'))){
        		   gridAdd(0);
        		   docObjects[0].SetCellValue(1, 1,1);
        		   frm1.f_bl_no.value=frm1.bl_no.value;
        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
        		   var sndParam=getSndParam();
        		   if(sndParam == true)	{	return false;	}          		   
        		   doShowProcess();
        		   //docObjects[0].DoAllSave("./SEI_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
        		   docObjects[0].DoAllSave("./SEI_BMD_0020GS.clt", FormQueryString(frm1)+sndParam, true);
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
           case "SEARCHLIST":	//조회
			   frm1.f_bl_no.value=trim(frm1.f_bl_no.value);
        	   if(frm1.f_bl_no.value==''){
        		   alert(getLabel('FMS_COM_ALT014'));
        		   frm1.f_bl_no.focus();
        		   return;
        	   }else{
        		 
        		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
        		   
                   frm1.f_cmd.value=SEARCHLIST;
//            	   doShowProcess();
            	   //frm1.submit();
                   submitForm();
        	   }
       	   break;
           case "DOCFILE":	//첨부파일
        		var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
        		
        		/**  Document List ==> Common Memo 연동 파라미터 (S) */
        		reqParam += '&palt_mnu_cd=OIH';
        		reqParam += '&opr_no='+frm1.bl_no.value;
        		/**  Document List ==> Common Memo 연동 파라미터 (E) */
        		
           		reqParam += '&openMean=SEARCH01';
       	   		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDoc', 806, 450, "scroll:no;status:no;help:no;");
      	   break;
           case "SNDEML":	//Email전송
       		var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
          		reqParam += '&openMean=SEARCH01';
      	   		popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
     	   break;
           case "MBLADD":
				rtnary=new Array(3);
				rtnary[0]='S';
				rtnary[1]='I';
	   			rtnary[2]='';
	   			rtnary[3]=frm1.ref_no.value;
	   			// alert('aaa');
				var rtnVal =  ComOpenWindow('./CMM_POP_0180.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px" , true);
				if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					return;
				}else{
					var rtnValAry=rtnVal.split("|");
					if(rtnValAry[0]!=''){
						frm1.mbl_no.value=rtnValAry[0];//house_bl_no
						ajaxSendPost(getMblImpInfo, 'reqVal', '&goWhere=aj&bcKey=getAirBlSmry&airSeaClssCd=S&f_biz_clss_cd=M&intg_bl_seq='+rtnValAry[1], './GateServlet.gsl');
					}
				}
          break;
           case "HBLCNF":	//Booking Confirm
        	   if(confirm(getLabel('FMS_COM_CFMCFM'))){
                   frm1.f_cmd.value=COMMAND03;
//                   doShowProcess();
             	   docObjects[0].DoSearch("./SEI_BMD_0020GS.clt", FormQueryString(frm1) );
        	   }
       	   break;
           case "HBLCLS":	//Booking Closing
        	   if(confirm(getLabel('FMS_COM_CFMCLS'))){
                   frm1.f_cmd.value=COMMAND04;
//                   doShowProcess();
             	   docObjects[0].DoSearch("./SEI_BMD_0020GS.clt", FormQueryString(frm1) );
        	   }
       	   break;
           case "COPY":	//조회
        	   
        	   //BL_COPY COPY시 컨펌메시지 없이 바로 Submit후 frt Check화면을 보여준다
        	   frm1.f_cmd.value=COMMAND05;
        	   doShowProcess();
        	   frm1.submit();
        	   
        	   /*if(confirm(getLabel('FMS_COM_CFMCPY'))){
                   frm1.f_cmd.value=COMMAND05;
//            	   doShowProcess();
            	   //frm1.submit();
                   submitForm();
        	   }*/
       	   break;
           case "REMOVE"://삭제
//        	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
//                   frm1.f_cmd.value = REMOVE;
//            	   doShowProcess();
//            	   frm1.submit();
//        	  		 submitForm();
//        	   }
        	   ajaxSendPost(checkBlInvReq, 'reqVal', '&goWhere=aj&bcKey=getCheckInv&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
        	   if(isInvStsOk){
	        	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
	                   frm1.f_cmd.value=REMOVE;
//	            	   doShowProcess();
	            	   //frm1.submit();
	                   submitForm();
	        	   }
    		   }
        	   else{
    			   //You Cannot delete B/L. Because Invoice was already Issued.
    			   alert(getLabel('FMS_COM_ALT022'));
    		   }
        	   break;
           case "SEARCHCNTR":	//Freight 조회
          		if(frm1.bl_sts_cd.value!='NA'){
           			searchGrid(3);
          		}
          		break;
           case "SEARCH_FRT":	//Freight 조회
       			if(frm1.bl_sts_cd.value!='NA'){
       				searchGrid(4);
       				//Selling/Debit Freight 조회
       				searchGrid(5);
       				//Buying/Crebit List 조회
       				searchGrid(6);
       				//Debit/Credit 조회
       				searchGrid(9);
       				searchGrid(10);
       			}
       			break;
           case "SEARCH_JB":	//Job template & History
        	   if(frm1.bl_sts_cd.value!='NA'){
        		 //처리내역( Job temlate에 따라서)
        		 searchGrid(7);
        		//처리내역( Job temlate에 따라서)
        		 searchGrid(8);
        		 // udf
        		 searchGrid(14);
        	   }
        	   break;
        	// #27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
           case "SEARCH_WO":	//WORK ORDER 조회
        	   if(frm1.bl_sts_cd.value!='NA'){
				   //Container List 조회
        		   searchGrid(13);
        	   }
        	   break;
           case "WORKORDER":	//Work Order 화면호출
 	           var param='f_intg_bl_seq=' + frm1.intg_bl_seq.value;
 		   		   param += '&air_sea_clss_cd=S'; 
 		   		   param += '&bnd_clss_cd=I';
 		   		   param += '&biz_clss_cd=H';
 		   		//#34862 - [BINEX]Work Order - Trucker 정보 Link
		   		   param += '&delivery_ref_no=' + document.frm1.cust_ref_no.value;
                var paramStr="./AIC_WOM_0013.clt?f_cmd="+SEARCH01+"&s_type=B&"+param;
                parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
                break;
	   	   case "CALLCT":
	   		   ajaxSendPost(getCtradeAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCtradeKey', './GateServlet.gsl');
	   		   break;
		   //2010.12.20 김진혁 추가, 항공은 set 버튼을 통해 BL의 CBM, C.weight, G.weight 값을 Freight에 반영함.
	   	   case "SET":
	   		   //해상은 LCL 건만 세팅을 사용할 수 있음.
	   		   if(frm1.shp_mod_cd.value=="LCL"){
		   		   //Freight에 Row가 없으면 set 할 수 없음.
		   		   if(docObjects[4].LastRow() -1==0 && docObjects[5].LastRow() -1==0){
		   			   //There's no freight information.
		   			alert(getLabel('FMS_COM_ALT004'));
		   		   }
		   		   else{
		   			   //해상은 LCL 건만 적용함.
	   				   setFrtAuto(docObjects[4], "");
		   			   setFrtAuto(docObjects[5], "b_");
		   		   }
	   		   }
	   		   else{
	   			   //alert("해상은 LCL 건만 세팅할 수 있습니다.");
	   			   alert(getLabel('FMS_COM_ALT010'));
	   		   }
	   		   break;
		   	case "ArrivalNotice":
				if(frm1.intg_bl_seq.value==""){
					//There is no data
	   				alert(getLabel('FMS_COM_ALT010'));
				}
				else{
					var intgBlSeq=frm1.intg_bl_seq.value;
					var hblNo=frm1.bl_no.value;
					var custRefNo=frm1.cust_ref_no.value;	//[20130330 OJG]
					var reqParam='?intg_bl_seq=' + intgBlSeq;
					reqParam += '&hbl_no=' + hblNo;
					//reqParam += '&cust_ref_no=' + custRefNo;
					reqParam += '&air_sea_tp=' + "S";
					reqParam += '&cgor_pic_info=' + oi_cgor_pic_info;
					reqParam += '&mailTitle=' + 'ARRIVAL NOTICE / INVOICE [HBL No : ' + frm1.bl_no.value + ']';
	         		reqParam += '&mailTo=' + mailTo;
					popGET('RPT_PRN_0140.clt'+reqParam, '', 480, 290, "scroll:yes;status:no;help:no;");
				}
				break;
	        //GLOVIS EDI (2012/03/12 Chungrue 추가)
		   	case "GOALS"://삭제
		   	   //EDI 전송을 하시겠습니까?  (EDI 필수항목을 체크한다.)
		   	   if(confirm(getLabel('FMS_COM_CFMSEN'))){
		   		   ajaxSendPost(transGoalsAjaxReq, 'reqVal', '&goWhere=aj&bcKey=transGoals&intg_bl_seq='+frm1.intg_bl_seq.value+"&email="+frm1.email.value, './GateServlet.gsl');
		   	   }
		   	   break;
		   	case "CALLGOALS":
				ajaxSendPost(getGoalsAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchGoalsKey', './GateServlet.gsl');
				break;
		   	case "COUNTRY_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			    rtnary=new Array(2);
		   		rtnary[0]="1";
		   		rtnary[1]="";
		   		
		   		callBackFunc = "COUNTRY_POPLIST";
		   		modal_center_open('./CMM_POP_0020.clt', rtnary, 560,450,"yes");
	   	        
	   	        break;
		   	case "GOTOACCT":
		   		var formObj=document.frm1;
		   		if(formObj.bl_no.value!='' || formObj.ref_no.value!=''){
		   			var paramStr="./ACC_INV_0040.clt?";
		   			paramStr+= "s_hbl_no=" + formObj.bl_no.value;
		   			paramStr+= "&s_intg_bl_seq=" + formObj.intg_bl_seq.value;
		   			paramStr+= "&s_ref_no=" + formObj.ref_no.value;
		   			parent.mkNewFrame('Invoice List', paramStr);
		   		}
		   		break;
		   	case "IT_NUM":
		   		var formObj=document.frm1;
		   		if(formObj.bl_no.value!=''){
					ajaxSendPost(getItNextNumReq, 'reqVal', '&goWhere=aj&bcKey=getItNextNum&ofc_cd='+frm1.ref_ofc_cd.value, './GateServlet.gsl');	   		} else{
		   		}
		   		break;	
		   	case "CCN_NUM":
		   		var formObj=document.frm1;
		   		// #27537 hbl을 입력하지 않아도 CCN을 취득할 수 있도록 변경 
		   		// hbl_no가 없으면 OFC_CD가 null이므로 USER의 OFC_CD를 취득한다.
		   		var ofcCd=frm1.ref_ofc_cd.value;
	   			if(ofcCd == "") {
	   				ofcCd=login_user_ofc_cd;
	   			}
	   			ajaxSendPost(getCcnNextNumReq, 'reqVal', '&goWhere=aj&bcKey=getCcnNextNum&type=S&ofc_cd='+ofcCd, './GateServlet.gsl');	   		
		   		break;	
		   	//-------------  20130330 OJG ------------------	
		   	case "MBL_IT_NO":
		   		var formObj=document.frm1;
		   		var refNo=formObj.ref_no.value;
		   		if(formObj.bl_no.value!=''){
					ajaxSendPost(getMblItNoReq, 'reqVal', '&goWhere=aj&bcKey=getMblItNo&ref_no='+refNo, './GateServlet.gsl');	   		} else{
		   		}
		   		break;		
		   	//-------------  20130330 OJG ------------------
		   /* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim Start */
	   	   case "CAL_CBM_NEW":
	   		   var rowCnt=docObjects[11].LastRow() + 1;
	   		   docObjects[11].DataInsert(rowCnt);
	   		   docObjects[11].SetCellValue(rowCnt, "cbm",0);
	   		   break;
	   	   /* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim End */
	   	   case "DELIVERY_ORDER":
	   		   var formObj=document.frm1;
				var intgBlSeq=formObj.intg_bl_seq.value;
				var hblNo=formObj.bl_no.value;
				var custRefNo=formObj.cust_ref_no.value; 
				var liner_trdp_nm=formObj.act_shpr_trdp_nm.value; 
				var trk_trdp_cd=formObj.trk_trdp_cd.value; 
				var trk_trdp_nm=formObj.trk_trdp_nm.value; 
				var cne_trdp_cd=formObj.cnee_trdp_cd.value; 
				var reqParam='?intg_bl_seq=' + intgBlSeq;
				reqParam += '&f_bl_no=' + encodeURIComponent(hblNo);
				reqParam += '&cust_ref_no=' + encodeURIComponent(custRefNo); 
				reqParam += '&liner_trdp_nm=' + encodeURIComponent(liner_trdp_nm);
				reqParam += '&air_sea_clss_cd=S';
				reqParam += '&biz_clss_cd=H';
				reqParam += '&bnd_clss_cd=I';
				reqParam += '&trsp_trdp_cd='+encodeURIComponent(trk_trdp_cd) ;
				reqParam += '&trsp_trdp_nm='+encodeURIComponent(trk_trdp_nm);
				reqParam += '&dest_rout_trdp_cd='+cne_trdp_cd;
				popGET('CMM_POP_0320.clt'+reqParam, '', 1200, 800, "scroll:yes;status:no;help:no;");
			break;	
	   	 	/* #20428 : [BINEX] A/R, A/P, D/C등이 보이는 화면에서 Profit Report 버튼 추가 (Entry 화면에서) jsjang 2013.9.10 */	
	   	 	case "PROFIT_REPORT":
				var reqParam='?intg_bl_seq=' + frm1.intg_bl_seq.value;
					reqParam += '&hbl_no=' + frm1.bl_no.value;
					reqParam += '&ref_no=' + frm1.ref_no.value;
					reqParam += '&air_sea_clss_cd=' + "S";
					reqParam += '&bnd_clss_cd=' + "I";
					reqParam += '&biz_clss_cd=' + "H";
					reqParam += '&mbl_no=' + frm1.mbl_no.value;			
					popGET('RPT_PRN_0200.clt'+reqParam, '', 1100, 650, "scroll:yes;status:no;help:no;");
		   	 	break;
	   	 	case "S_DOC":
        		var sheetObj3=docObjects[7];	
	   	 		if(sheetObj3.GetTotalRows()> 0){
		   	 		var formObj=document.frm1;
		   	 		formObj.file_name.value='doc_list.mrd';
		   	 		formObj.title.value='Document List';
		   	 		//Parameter Setting
		   	 		var param='[' + formObj.intg_bl_seq.value + ']';			// [1]
		   	 		param += '[OIH]'; 											// [2] MASTER/HOUSE/OTH 여부
		   	 		param += '[' + formObj.bl_no.value + ']';				// [3] MBL_NO/HBL_NO
		   	 		param += '[' + formObj.user_id.value + ']';				// [4]
		   	 		formObj.rd_param.value=param;
		   	 		popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
	   	 		break;
	   	 	case "RELEASE_ORDER":
	   	 		var formObj=document.frm1;
				var intgBlSeq=formObj.intg_bl_seq.value;
				var hblNo=formObj.bl_no.value;
				var custRefNo=formObj.cust_ref_no.value; 
				var reqParam='';
				reqParam += '?s_intg_bl_seq=' + intgBlSeq;
				reqParam += '&f_bl_no=' + hblNo;
				reqParam += '&cust_ref_no=' + custRefNo;
				popGET('SEI_DOC_1080.clt'+reqParam, '', 600, 478, "scroll:yes;status:no;help:no;");
				break;
	   	 	case "PreliminaryClaim":
				var reqParam='?air_sea_tp=' + 'S';
				reqParam += '&intg_bl_seq=' + frm1.intg_bl_seq.value;
				reqParam += '&hbl_no=' + frm1.f_bl_no.value;
				reqParam += '&ref_no=' + frm1.ref_no.value;
				reqParam += '&cgor_pic_info=' + oi_cgor_pic_info;
				popGET('RPT_PRN_0230.clt'+reqParam, '', 620, 565, "scroll:yes;status:no;help:no;");
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
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }
    }
}
/* 
* jsjang 2013.7.5 
* 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start 
*/ 
function cntr_ship_init()
{
  	var formObj=document.frm1;
  	tab_pck_qty=formObj.pck_qty.value;
  	tab_meas=formObj.meas.value;
  	tab_meas1=formObj.meas1.value;
  	tab_grs_wgt=formObj.grs_wgt.value;
  	tab_grs_wgt1=formObj.grs_wgt1.value;
}
/* 
* jsjang 2013.7.5 
* 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end 
*/ 
function validateAccountPayable(){
	/*
	for(var i=2; i<=docObjects[5].RowCount()+2; i++){
if(docObjects[5].GetCellValue(i, docObjects[5].SaveNameCol("b_fr_inv_sum_amt"))*1 == 0){
			alert(getLabel('FMS_COM_000000') + " - " + getLabel('FMS_COD_AMT') + "/" + getLabel('FMS_COD_RATE'));
			docObjects[5].SelectCell(i, docObjects[5].SaveNameCol("b_fr_qty"));
			return false;
		}
	}
	*/
	return true;
}
function getItNextNumReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if (doc[1] == "ERR01"){
			alert(getLabel('SEA_COM_ALT016'));
			return;
		}
		if (doc[1] == "ERR02"){
			alert(getLabel('SEA_COM_ALT019'));
			return;
		}
		var retVal=doc[1].split("|");
		var it9Num=retVal[0];
		var gap=retVal[1];
		alert(getLabel2('SEA_COM_ALT018',new Array(gap)));
		formObj.it_no.value=convertItType(it9Num);
		// ###.###.### 형태로 넣기로 변경
		//frm1.real_it_no.value = it9Num;
	} else {
    	//System Error! + MSG
    	alert(getLabel('FMS_COM_ERR001'));
	}
}
function getCcnNextNumReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if (doc[1] == "ERR01"){
			return;
		}
		if (doc[1] == "ERR02"){
			return;
		}
		var retVal=doc[1].split("|");		
		//CCN_NO를 취득했으므로 true, hidden으로 현재 취득한 값 설정
		formObj.h_ccn_no.value=retVal[0];
		formObj.ccn_no.value=retVal[0];
	} else {
		// Error일땐 가져오지 않는다.
		return;
	}
}
//-------------  20130330 OJG ------------------	
function getMblItNoReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');			
			formObj.it_no.value=rtnArr[0];
			formObj.te_dt_tm.value=modiStrDateType(rtnArr[1],1);
			formObj.it_loc.value=rtnArr[2];
		}else{
			formObj.it_no.value="";
		}
	} else {
    	//System Error! + MSG
    	alert(getLabel('FMS_COM_ERR001'));
	}
}
//-------------  20130330 OJG ------------------	
function convertItType(str){
	var cnvVal=str.substring(0,3).concat('.').concat(str.substring(3,6)).concat('.').concat(str.substring(6,9));
	return cnvVal;
}
function getItNum() {
	doWork("IT_NUM");
}
function getCcnNum() {
	var formObj=document.frm1;
	if (formObj.ccn_no.value != '') {
		if (confirm(getLabel('FMS_COM_ALT062'))) {
			doWork("CCN_NUM");
		}
	} else {
		doWork("CCN_NUM");
	}
}
//-------------  20130330 OJG ------------------
function getMblItNo() {
	doWork("MBL_IT_NO");
}
//-------------  20130330 OJG ------------------
function fnItNumChange(val) {
	if (val.length == 9){
		frm1.it_no.value=convertItType(val);
	}
}
//GLOVIS EDI 전송 (Chungrue 추가 2012.03.12)
function transGoalsAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] == "Y"){
				alert(rtnArr[1]);
			}
			else{
				alert(rtnArr[1]);
			}
		}
	}
}
/**
 * GLOVIS EDI 화면
 **/
function getGoalsAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var form;
	Obj=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split(',');
			var myform=document.forms[0];
			myform.insertBefore(createHidden("ctwId",masterVals[0]));
			myform.insertBefore(createHidden("ctwPass",masterVals[1]));
			myform.insertBefore(createHidden("returnUrl","http://www.ctradeworld.com/logis/logis.jsp?topmenu=mfcs"));
			myform.action="http://www.ctradeworld.com/ctwpass/autoLoginChk.jsp";
			myform.method="post";
			myform.target="winName";
			window.open("about:blank","winName","toolbar=no,scrollbars=no,resizable=yes, left=100, width=900, height=600");
			myform.submit();
		}
	}
}
//GLOVIS EDI 필수항목 체크
function checkGoals(){
	var rtnFlg=true;
	return rtnFlg;
}
//2010.12.20 김진혁 추가, 앞의 정보 중 CBM 값을 Freight에 끌어오는 로직
function setFrtAuto(sheetObj, prepix) {
 	for(var i=2;i<sheetObj.LastRow() + 1 ;i++){
 		if(sheetObj.GetCellValue(i, prepix+"fr_inv_sts_cd")=="FI" || sheetObj.GetCellValue(i, prepix+"fr_inv_sts_cd")==""){
 			if(sheetObj.GetCellValue(i, prepix+"fr_aply_ut_cd") == "CBM"){
				//해상의 경우 CBM이 1보다 작으면 MIN 1로 표기함.
				if(frm1.meas.value<1){
					sheetObj.SetCellValue(i, prepix+"fr_qty",1);
				}else{
					//WHF의 경우 무조건 올림한 정수로 표기함.
					if(sheetObj.GetCellValue(i, prepix+"fr_frt_cd")=="WHF"){
						sheetObj.SetCellValue(i, prepix+"fr_qty",Math.ceil(frm1.meas.value));
					}else{
						sheetObj.SetCellValue(i, prepix+"fr_qty",frm1.meas.value);
					}
				}
			}
		}
	}
}
/**
 * Ctrade 화면
 **/
function getCtradeAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split(',');
			var myform=document.forms[0];
			myform.insertBefore(createHidden("ctwId",masterVals[0]));
			myform.insertBefore(createHidden("ctwPass",masterVals[1]));
			myform.insertBefore(createHidden("returnUrl","http://www.ctradeworld.com/logis/mf/mf3510q0.jsp"));
			myform.action="http://www.ctradeworld.com/ctwpass/autoLoginChk.jsp";
			myform.method="post";
			myform.target="winName";
			window.open("about:blank","winName",'left=100, width=680, height=600');
			myform.submit();
		}
	}
}
/**
 * 화면이동
 */
function goToBlPage(toPage, toNo){
	if(toNo!==''){
		if(toPage=='view_hbl'){
		   	var paramStr="./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+toNo;
		   	parent.mkNewFrame('HB/L Entry', paramStr);
		}else if(toPage=='view_mbl'){
		   	var paramStr="./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST;
		   	paramStr+= '&f_bl_no='+toNo+'&f_hbl_intg_bl_seq='+frm1.intg_bl_seq.value;
		   	parent.mkNewFrame('MB/L Entry', paramStr);
		}
	}
}
function searchGrid(gridIdx){
	switch(gridIdx){
		case 1:
			//Doccument File List 조회
	        frm1.f_cmd.value=SEARCHLIST02;
 	 	   	docObjects[7].DoSearch("./SEE_BMD_0021_1GS.clt", FormQueryString(frm1) );
		break;
		case 2:
			//Container List 조회
			frm1.f_cmd.value=SEARCHLIST04;
 			docObjects[1].DoSearch("./SEE_BMD_0023GS.clt", FormQueryString(frm1) );
		break;
		case 3:
			//Commodity List 조회
			setItemCntrList();
			frm1.f_cmd.value=SEARCHLIST05;
 			docObjects[2].DoSearch("./SEE_BMD_0023_1GS.clt", FormQueryString(frm1) );
		break;
		case 4:
			//Freight될 Container 조회
			frm1.f_cmd.value=SEARCHLIST01;
 			docObjects[3].DoSearch("./SEE_FRT_0010GS.clt", FormQueryString(frm1) );
		break;
		case 5:
			//Selling/Debit Freight 조회
			frm1.f_cmd.value=SEARCHLIST06;
 			docObjects[4].DoSearch("./SEI_BMD_0024GS.clt", FormQueryString(frm1) );
		break;
		case 6:
			//Buying/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST07;
 			docObjects[5].DoSearch("./SEI_BMD_0024_1GS.clt", FormQueryString(frm1) );
		break;
		case 7:
			//처리내역( Job temlate에 따라서)
			frm1.f_cmd.value=SEARCHLIST09;
 			docObjects[6].DoSearch("./SEE_BMD_0026GS.clt", FormQueryString(frm1) );
		break;
		case 8:
			//Change Log
			frm1.f_cmd.value=SEARCHLIST10;
 			docObjects[8].DoSearch("./SEE_BMD_0026_1GS.clt", FormQueryString(frm1) );
		break;
		case 9:
			//Debit/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST12;
			
 			docObjects[9].DoSearch("./SEI_BMD_0024_2GS.clt", FormQueryString(frm1) );
		break;
		case 10:
			//Debit/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST15;
 			docObjects[10].DoSearch("./SEI_BMD_0024_3GS.clt", FormQueryString(frm1) );
		break;
		/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim Start */
		case 12:
			//Dim
			frm1.f_cmd.value=SEARCHLIST11;
			docObjects[11].DoSearch("./SEE_BMD_0021_2GS.clt", FormQueryString(frm1) );
		break;
		/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim End */
		//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
		case 13:
			//WorkOrder List 조회
			frm1.f_cmd.value=SEARCHLIST08;
 			docObjects[12].DoSearch("./SEE_BMD_0025GS.clt", FormQueryString(frm1) );
		break;	
		case 14:
			//User Defined Field 조회
			frm1.f_cmd.value = SEARCHLIST13;
			docObjects[13].DoSearch("./SEE_BMD_0026_2GS.clt", FormQueryString(frm1));
		
		break;
	}
}
/**
 * MBL 내용 출력
 */
function getMblImpInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			frm1.obrd_dt_tm.value=mkStrToDate(rtnArr[0]);
			frm1.etd_dt_tm.value=mkStrToDate(rtnArr[0]);
			frm1.eta_dt_tm.value=mkStrToDate(rtnArr[1]);
			frm1.trnk_vsl_cd.value=rtnArr[2];
			frm1.trnk_vsl_nm.value=rtnArr[3];
			frm1.trnk_voy.value=rtnArr[4];
			frm1.pol_cd.value=rtnArr[5];
			frm1.pol_nm.value=rtnArr[6];
			frm1.pod_cd.value=rtnArr[8];
			frm1.pod_nm.value=rtnArr[9];
			frm1.lnr_trdp_cd.value=rtnArr[11];
			frm1.lnr_trdp_nm.value=rtnArr[12];
			frm1.pck_qty.value=doMoneyFmt(rtnArr[13]);
			frm1.pck_ut_cd.value=rtnArr[14];
			frm1.grs_wgt.value=doMoneyFmt(rtnArr[15]);
			frm1.grs_wgt_ut_cd.value=rtnArr[16];
			frm1.meas.value=doMoneyFmt(rtnArr[19]);
			frm1.meas_ut_cd.value=rtnArr[20];
//	        frm1.bl_no.className = 'search_form';
//            frm1.bl_no.readOnly  = false;
//            frm1.bl_no.focus();
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
/**
 * 파일 업로드 팝업에서 목록 Reload
 */
function reloadDocList(){
	searchGrid(1);
}
/**
 * HBL 중복 여부를 확인함
 */
function getHblCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP'){
				/*
				 *  2012.02.24
				 * 중복되면 저장 수행 안함
				 */
				//'HB/L No. is duplicate.');
				alert(getLabel('FMS_COM_ALT008'));
				frm1.bl_no.focus();
//				//'B/L No. is duplicated. \nDo you want to create MBL?'
//				if(confirm(getLabel('FMS_COM_ALT008') + getLabel('FMS_COM_CFMCON'))){
//	            	   gridAdd(0);
//	            	   docObjects[0].CellValue(1, 1) = 1;
//
//	            	   //save post date, office info
//	            	   if(ofc_post_dt=="ETD"){
//	            		   frm1.post_dt.value = frm1.etd_dt_tm.value;
//	            	   }else if(ofc_post_dt=="ETA"){
//	            		   frm1.post_dt.value = frm1.eta_dt_tm.value;
//	            	   }
//
//	            	   doShowProcess();
//	                   frm1.f_cmd.value = ADD;
//	            	   docObjects[0].DoAllSave("./SEI_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
//	        	   }
			}else{
	    	   //'Do you want to save HB/L? ')){
				if(isMBLCreated || confirm(getLabel('FMS_COM_CFMSAV'))){
				   doShowProcess();
	    		   resetCopyFrt(getSdSheet(), getBcSheet());
            	   gridAdd(0);
            	   docObjects[0].SetCellValue(1, 1,1);
//            	   //save post date, office info
//            	   if(ofc_post_dt=="ETD"){
//            		   frm1.post_dt.value = frm1.etd_dt_tm.value;
//            	   }else if(ofc_post_dt=="ETA"){
//            		   frm1.post_dt.value = frm1.eta_dt_tm.value;
//            	   }
        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
        		   var sndParam=getSndParam();
        		   if(sndParam == true)	{	return false;	}      
        		   
        		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
            	   //docObjects[0].DoAllSave("./SEI_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
            	   docObjects[0].DoAllSave("./SEI_BMD_0020GS.clt", FormQueryString(frm1)+sndParam, true);
            	   
            	   isMBLCreated = false;
        	   }
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
/**
 * Inventory 조회팝업
 */
function getCntrList(){
	rtnary=new Array(1);
		rtnary[0]="1";
	var rtnVal =  ComOpenWindow('./SEE_BMD_0027.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:650px;dialogHeight:480px" , true);
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnRows=rtnVal.split("|");
		var rtnLen=rtnRows.length;
		rtnLen--;
 		var intRows=docObjects[1].LastRow() + 1;
 		if(docObjects[1].GetCellValue(1, 'cntr_no')==''){
			intRows--;
		}
		for(var i=0; i < rtnLen; i++){
			var cntrInfo=rtnRows[i].split(",");
			if(checkCntrNo(cntrInfo[0])){
				docObjects[1].DataInsert(intRows);
				docObjects[1].SetCellValue(intRows, 'cntr_no',cntrInfo[0]);
				docObjects[1].SetCellValue(intRows, 'soc_flg',cntrInfo[1]);
				docObjects[1].SetCellValue(intRows, 'cntr_tpsz_cd',cntrInfo[2]);
				docObjects[1].SetCellValue(intRows, 'cntr_sprl_trdp_cd',cntrInfo[3]);
				docObjects[1].SetCellValue(intRows, 'cntr_sprl_trdp_nm',cntrInfo[4]);
				docObjects[1].SetCellValue(intRows, 'rgst_cntr_yn','Y');
				intRows++;
			}else{
				//Container No.['+cntrInfo[0]+']is already used.
				alert(getLabel('FMS_COM_ALT025') + "\n - " + cntrInfo[0]);
			}
		}
	}
}
//파일 다운로드
function downloadFile(downType, s_intg_bl_seq, s_palt_doc_seq){
	document.frm2.docType.value=downType;
	document.frm2.s_palt_doc_seq.value=s_palt_doc_seq;
	document.frm2.intg_bl_seq.value = s_intg_bl_seq;
	//document.frm2.target = '_self';
	document.frm2.submit();
}
//직접입력 여부
function doKeyInCheck(obj, numTp){
	if(numTp=='bk'){
	}else{
		if(obj.checked){
			alert(getLabel('SEA_COM_ALT005'));
//			frm1.bl_no.className= 'search_form';
//			frm1.bl_no.readOnly = false;
//			frm1.bl_no.focus();
		}else{
//			frm1.bl_no.className= 'search_form-disable';
//			frm1.bl_no.readOnly = true;
//			frm1.bl_no.value = '';
		}
	}
}
/**
 * Container번호 중복확인
 */
function checkCntrNo(inCntrNo){
	var intRows = docObjects[1].LastRow() + 1 ;
	var loopNum = 0;
	for(var i = 1; i < intRows; i++){
		if(inCntrNo==docObjects[1].CellValue(i, 'cntr_no')){
			loopNum++;
		}
	}
	if(loopNum>1){
		return false;
	}else{
		return true;
	}
}
/**
 * 화면초기화
 */
function clearScreen(){
	doShowProcess();
    frm1.f_cmd.value='';
    frm1.intg_bl_seq.value='';
    frm1.submit();
    //submitForm();
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	var isModi=true;
	if(errMsg==''&&frm1.intg_bl_seq.value==''){
frm1.f_intg_bl_seq.value=docObjects[0].GetCellValue(1, "sv_intg_bl_seq");
frm1.intg_bl_seq.value=docObjects[0].GetCellValue(1, "sv_intg_bl_seq");
frm1.bl_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bl_sts_cd");
frm1.bl_sts_label.value=docObjects[0].GetCellValue(1, "sv_bl_sts_label");
frm1.bl_ser_no.value=docObjects[0].GetCellValue(1, "sv_bl_ser_no");
frm1.f_bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
		frm1.h_bl_no.value=frm1.bl_no.value;
//		frm1.bl_no.readOnly  = true;
//		frm1.bl_no.className = 'search_form-disable';
		//Freight항목을 조회함
	    var eta=frm1.eta_dt_tm.value;
	    getXcrtInfo(eta.replaceAll('-', ''));
	    isModi=false;
	}
	/* 20130822 LHK 20413 BL# 변경 후 저장 시 Duplicated Error */
	frm1.bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
	frm1.h_bl_no.value=frm1.bl_no.value;
	frm1.f_bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
	frm1.h_profit_share.value=frm1.profit_share.value;
	if(docListSheet){
		searchGrid(1);
	}
	if(cntrListSheet){
		searchGrid(2);
		searchGrid(4);
	}
	if(cmdtListSheet){
		searchGrid(3);
	}
	if(frtSdSheet){
		searchGrid(5);
	}
	if(frtBcSheet){
		searchGrid(6);
	}
	if(frtDcSheet){
		searchGrid(9);
	}
	if(anSheet){
		searchGrid(10);
	}
	if(jobListSheet){
		searchGrid(7);
	}
	/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim Start */
	if(dimListSheet){
		searchGrid(12);
	}	
	/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim End */
	
	if(udfListSheet){		//User Defined Field 조회
		searchGrid(14);
	}
	
	//목록 Flag 초기화
	docListSheet=false;
	cntrListSheet=false;
	cmdtListSheet=false;
	frtSdSheet=false;
	frtBcSheet=false;
	frtDcSheet=false;
	anSheet=false;
	//버튼 초기화
	btnLoad();
	//Freight 버튼 초기화
	cnfCntr('SD');
	cnfCntr('BC');
	cnfCntr('DC');
	//수정시 환률재 조회
	if(isModi){
		//Freight항목을 조회함
	    var eta=frm1.eta_dt_tm.value;
	    eta=eta.replaceAll('-', '');
	    if(eta!==frm1.xcrtDt.value){
		    getXcrtInfo(eta);
	    }
	}
	//"Save success! ");
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}

function sheet3_OnSearchEnd(sheetObj, row, col) {
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}

function sheet10_OnSearchEnd(sheetObj, row, col) {
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}

function sheet13_OnSearchEnd(sheetObj, row, col) {
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	
	if (sheetObj.GetEditable() == 0) {
		sheetObj.SetEditable(1);
	}
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}

function sheet1_OnSearchEnd(errMsg){
frm1.bl_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bl_sts_cd");
frm1.bl_sts_label.value=docObjects[0].GetCellValue(1, "sv_bl_sts_label");
	//버튼 초기화
	btnLoad();
	if(frm1.f_cmd.value==COMMAND01){
	}else if(frm1.f_cmd.value==COMMAND02){
var tmpBlNo=docObjects[0].GetCellValue(1, "sv_bl_no");
		if(tmpBlNo!=''){
			//조회해온 결과를 Parent에 표시함
			frm1.bl_no.value=tmpBlNo;
			frm1.mk_bl_no.value=tmpBlNo;
			doWork("SEARCHCNTR");
		}
		//버튼 숨기기
//		frm1.bl_no.className = 'search_form-disable';
//		frm1.bl_no.readOnly  = true;
	}
	doHideProcess();
}

function sheet2_OnSearchEnd(sheetObj, row, col) {
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}

function gridAdd(objIdx){
 	var intRows=docObjects[objIdx].LastRow() + 1;
	docObjects[objIdx].DataInsert(intRows);
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat, obj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출
            var cal=new ComCalendar();
            cal.setDisplayType('date');
            cal.select(obj, 'MM-dd-yyyy');
        break;
    }
}
//Description에 Instrutction을 추가함
function addInst(){
	ajaxSendPost(addInstTxt, 'reqVal', '&goWhere=aj&bcKey=getInstTxt&loc_cd='+frm1.del_cd.value, './GateServlet.gsl');
}
function addInstTxt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(frm1.desc_txt.value==''){
				frm1.desc_txt.value=doc[1];
			}else{
				frm1.desc_txt.value=frm1.desc_txt.value+'\n'+doc[1];
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
/**
 * 파일목록 조회시. 3번째 Sheet를 리턴함.
 */
function getSelectedFiles(){
	return docObjects[7];
}
//--------------------------------------------------------------------------------------------------------------
//                                             Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
var tab1click = '';
var tab2click = '';
var tab3click = '';
var tab4click = '';
var tab5click = '';
var tab6click = '';

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

        if(tab1click == ""){
	        tab1click = "Y"
	    }

	    //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;

    //Container 탭
    } else if( isNumSep == "02" ) {
    	currTab = isNumSep;	//탭상태저장

        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "inline";
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';

        if(tab2click == ""){
        	tab2click = "Y";
        	doWork('SEARCHCNTR');
        }
    	//스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;

    //Mark Description 탭
    }else if( isNumSep == "03" ) {
    	currTab = isNumSep;	//탭상태저장

	    tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'inline';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';

        if(tab3click== ""){
	        tab3click= "Y";
        	doWork('SEARCH_XPT');
    	}

        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;

	//Freight탭
    }else if( isNumSep == "04" ) {
    	currTab = isNumSep;	//탭상태저장
        
	    tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'inline';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        
        //BL_COPY
        var copy_bl_seq = frm1.copy_bl_seq.value;
		if (copy_bl_seq == "") {

			//LHK 20130812 tab Click 이후 컨테이너 저장 후 다시 클릭 할 경우, 컨테이너를 재조회 한다. Unit 에 해당하는 Cntr type Size 를 다시 가져옴.
			searchGrid(4);
			
	        if(tab4click== ""){
		        tab4click= "Y";
		        doWork('SEARCH_FRT');
	    	}
		} else {
			searchFrtCntr();
		}

        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
     //#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
    //Work Order
    }else if( isNumSep == "05" ) {
    	currTab = isNumSep;	//탭상태저장
    	
    	tabObjs[0].style.display = 'none';
    	tabObjs[1].style.display = 'none';
    	tabObjs[2].style.display = 'none';
    	tabObjs[3].style.display = 'none';
    	tabObjs[4].style.display = 'inline';
    	tabObjs[5].style.display = 'none';
    	
    	if(tab6click== ""){
    		tab6click= "Y";
    		doWork('SEARCH_WO');
    	}
    }else if( isNumSep == "06" ) {
    	currTab = isNumSep;	//탭상태저장

    	tabObjs[0].style.display = 'none';
    	tabObjs[1].style.display = 'none';
    	tabObjs[2].style.display = 'none';
    	tabObjs[3].style.display = 'none';
    	tabObjs[4].style.display = 'none';
    	tabObjs[5].style.display = 'inline';
    	
    	if(tab5click== ""){
    		tab5click= "Y";
    		doWork('SEARCH_JB');
    	}
    	
    	//스크롤을 하단으로 이동한다.
    	//document.body.scrollTop = document.body.scrollHeight;
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
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
var isRun = true;
function loadPage() {

    var opt_key = "USE_CFS_FIELDS";
    ajaxSendPost(setUseCfsFieldsReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
    opt_key = "OIH_AN_CNTR_INFO";
    ajaxSendPost(setOihAnCntrInfoReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

    for(var i=0;isRun && i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
        if(i == docObjects.length - 1){
        	isRun = false;
        }
    }
    
    if(pps_use_flg != "Y"){
    	getObj("btnPierpass").style.display = "none";
    }
    if(ctf_use_flg != "Y"){
    	getObj("btnCTF").style.display = "none";
    }
    if(cf_use_flg != "Y"){
    	getObj("btnCF").style.display = "none";
    }
    
    checkBoxSetting();
    frm1.pck_qty.value=doMoneyFmt(Number(frm1.pck_qty.value).toFixed(0));
    frm1.grs_wgt.value=doMoneyFmt(Number(frm1.grs_wgt.value).toFixed(3));
    frm1.grs_wgt1.value=doMoneyFmt(Number(frm1.grs_wgt1.value).toFixed(3));
    frm1.meas.value=doMoneyFmt(Number(frm1.meas.value).toFixed(3));
    frm1.meas1.value=doMoneyFmt(Number(frm1.meas1.value).toFixed(0));
    frm1.ctrb_mgn.value=doMoneyFmt(Number(frm1.ctrb_mgn.value).toFixed(2));
    if(user_ofc_cnt_cd=="JP"){
    	if(frm1.intg_bl_seq.value==""){
    		frm1.an_curr_cd.value='JPY';
    	}
    }
    if(frm1.intg_bl_seq.value==""){
    	/* 2012.12.13 S.Y BAIK
    	 * //2012/02/03 일본쪽 DESC1에 200자 이상의 데이터가 들어감 (OFC의 INV_RMK를 DEFAULT로 끌고오는걸 끊고 하드코딩함.
    	if(frm1.f_cnt_cd.value == "JP"){
    		frm1.desc_txt1.value="上記の金額を御請求申し上げますのでお支払いは下記銀行にお願い致します。\n振込手数料は誠に恐縮ですが貴社ご負担にてお願い致します。尚、小切手の宛先は　「株式会社　」　でお願い致します。\n取引銀行 : 三井住友銀行   東京中央支店   普通   8242259 / みずほ銀行   銀座支店   普通   2718998\n三菱東京UFJ銀行   新富町支店   普通   3619901   ｶ)ｴｲ.ｱｲ.ｴﾌ.";
    	}
    	*/
    	
    	// Copy 시에 DESCRITION 이 존재하는 경우 유지하도록 수정
    	if(!(frm1.copy_bl_seq.value != "" && frm1.desc_txt.value != "")){
    		shipModeChange();
    	}
    	
    	frm1.desc_txt1.value=frm1.h_dflt_an_memo.value;	//frm1.h_inv_rmk.value; [20130924 OJG] #21004
    	//MBL ENTRY 에서 HBL button 을 눌렀을 경우 2012.10.05 LHK
    	if(frm1.ref_no.value!=""){
        	checkRefNo(frm1.ref_no.value);
        }
    	//[20140220 OJG] 	요구사항 #26463 HBL은 "No"가 Default 
    	frm1.express_tp_cd.value="N";
	}
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	goTabSelect(frm1.f_isNumSep.value);
	/* oyh 2013.09.04 #20421 : [BINEX] B/L type의 default를 Express에 Y로 */
    /* oyh 2013.09.04 #20420 : [BINEX] BL ENTRY에 Package 정보 default setting*/
    if(frm1.intg_bl_seq.value==""){
    	//2014.1.21 #25557
    	//frm1.express_tp_cd.value = "Y";
    	//frm1.pck_ut_cd.value = "CT";
    }
    if(user_ofc_cnt_cd=='DE'){
    	if(frm1.intg_bl_seq.value==''){
    		frm1.frt_term_cd.value='PP';
    	}
    }
    if(frm1.bl_sts_cd.value=='HO' || frm1.bl_sts_cd.value=='HF'){
    	//Accounting Closed. You can only edit following fields.\nDoor delivery Loc. / D.ETA / Final Dest. / F.ETA / CY/CFS Loc / \n Final Warehouse / Available / LFD / G.O Date / \n I.T Date / SVC Term / I.T # / I.T Place / \n Original B/L Received / Released.
    	alert(getLabel('SEA_COM_ALT012'));
    }
    
    //44406
    if (frm1.use_hbl_ser.value == "Y") {
    	th_bl_ser.style.display = 'inline';
    	//td_bl_ser1.style.display = 'inline';
    	td_bl_ser2.style.display = 'inline';
    } else {
    	th_bl_ser.style.display = 'none';
    	//td_bl_ser1.style.display = 'none';
    	td_bl_ser2.style.display = 'none';    	
    }
    
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
		/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim Start */
		case "sheet13":
			docObjects[11]=sheet_obj;
			break;	
		/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim End */			
		case "sheet3":
			docObjects[1]=sheet_obj;
			break;
		case "sheet4":
			docObjects[2]=sheet_obj;
			break;
		case "sheet7":
			docObjects[3]=sheet_obj;
			break;
		case "sheet8":
			docObjects[4]=sheet_obj;
			break;
		case "sheet9":
			docObjects[5]=sheet_obj;
			break;
		case "sheet11":
			docObjects[6]=sheet_obj;
			break;
		case "sheet10":
			docObjects[7]=sheet_obj;
			break;
		case "sheet12":
			docObjects[8]=sheet_obj;
			break;
		case "sheet14":
			docObjects[9]=sheet_obj;
			break;
		case "sheet15":
			docObjects[10]=sheet_obj;
			break;
		// #27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
		// WorkOrder
		case "sheet16":
			docObjects[12]=sheet_obj;
			break;
		case "sheet17":
			docObjects[13]=sheet_obj;
			break;	
	}
	//docObjects[sheetCnt++] = sheet_obj;
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
	     //   SetSheetHeight(0);
	    //  (7, 0, 0, true);
		
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
		
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('SEI_BMD_0020_HDR1'), Align:"Center"} ];
			      InitHeaders(headers, info);
		
			      var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_intg_bl_seq" },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bkg_no" },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_no" },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_sts_cd" },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_sts_label" },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_ser_no" } ];
			       
			      InitColumns(cols);
		
			      SetEditable(1);
			      SetVisible(0);

	            }


        break;
       //Container List 그리드
	   case 2:
		    with(sheetObj){
		 
		       //  (30, 0, 0, true);

		         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

		         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		         var headers = [ { Text:getLabel('SEE_BMD_HDR4-1'), Align:"Center"} ];
		         InitHeaders(headers, info);

		         var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"Del" },
		                {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"conls_ibflag" },
		                {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"Seq",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"soc_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
		                {Type:"Combo",     Hidden:0, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"cntr_tpsz_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"seal_no1",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		                {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"seal_no2",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		                {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"seal_no3",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		                {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:0,   SaveName:"cgo_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
		                {Type:"Combo",     Hidden:0, Width:90,   Align:"Left",    ColMerge:0,   SaveName:"cgo_pck_ut",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt1",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
		                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas1",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
		                {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"vol_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cntr_sprl_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_sprl_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:0,   SaveName:"temp_val",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:0,   SaveName:"temp_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:10,   Align:"Left",    ColMerge:0,   SaveName:"vent_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"dg_gds_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cntr_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
		                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_list_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vol_tot",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rgst_cntr_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"pickup_number",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
		                {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"lfd",                KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cntr_go_date",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
		          
		         InitColumns(cols);

		        // SetGetCountPosition()(0);
		         SetEditable(1);
		                     SetColProperty('cgo_pck_ut', {ComboText:PCKCD1, ComboCode:PCKCD2} );
		                     InitViewFormat(0, "lfd", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
		         InitViewFormat(0, "cntr_go_date", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
		         /* oyh 2013.09.04 #20420 : [BINEX] BL ENTRY에 Package 정보 default setting*/
		         SetColProperty('soc_flg', {ComboText:LSTCD1, ComboCode:LSTCD2} );
				   SetColProperty('cntr_tpsz_cd', {ComboText:'|'+TPCD1, ComboCode:'|'+TPCD2} );
				   SetColProperty('dg_gds_flg', {ComboText:'N|Y', ComboCode:'N|Y'} );
				           SetSheetHeight(250);
				           //sheetObj.SetFocusAfterProcess(0);
				           //sheetObj.SetFocusAfterRowTransaction(0);
		         }


		break;
       //Item 그리드
        case 3:
            with(sheetObj){
        	
        	      //(16, 0, 0, true);

        	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

        	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	      var headers = [ { Text:getLabel('SEE_BMD_HDR6'), Align:"Center"},
        	                  { Text:getLabel('SEE_BMD_HDR7'), Align:"Center"} ];
        	      InitHeaders(headers, info);

        	      var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"Del" },
              	             {Type:"Status",    Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_ibflag" },
              	             {Type:"Seq",      Hidden:0,  	Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              	             {Type:"Combo",     Hidden:0, 	Width:100,  Align:"Left",    ColMerge:1,   SaveName:"item_cntr_list_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
              	             {Type:"Text",      Hidden:0,  	Width:100,  Align:"Left",    ColMerge:0,   SaveName:"item_cust_po_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              	             {Type:"Popup", 	Hidden:0, 	Width:90,   Align:"Center",  ColMerge:0,   SaveName:"item_cmdt_cd",    	   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              	             {Type:"Text",      Hidden:0,  	Width:150,  Align:"Left",    ColMerge:0,   SaveName:"item_cmdt_nm",    	   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:300 },
              	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Left",    ColMerge:0,   SaveName:"item_hs_grp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              	             {Type:"PopupEdit", Hidden:0, 	Width:90,   Align:"Center",  ColMerge:0,   SaveName:"item_shp_cmdt_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
              	             {Type:"Text",      Hidden:0,  	Width:150,  Align:"Left",    ColMerge:0,   SaveName:"item_shp_cmdt_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:300 },
              	             {Type:"Int",       Hidden:0,  	Width:90,   Align:"Right",   ColMerge:1,   SaveName:"item_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
              	             {Type:"Combo",     Hidden:0, 	Width:90,   Align:"Center",  ColMerge:1,   SaveName:"item_pck_ut_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
              	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Left",    ColMerge:0,   SaveName:"item_pck_ut_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              	             {Type:"Float",     Hidden:0,   Width:100,  Align:"Right",   ColMerge:0,   SaveName:"item_pck_inr_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
              	             {Type:"Float",     Hidden:0,   Width:100,  Align:"Right",   ColMerge:0,   SaveName:"item_ea_cnt",    	   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
              	             {Type:"Float",     Hidden:0,   Width:100,  Align:"Right",   ColMerge:0,   SaveName:"item_ttl_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
              	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
              	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_lbs_wgt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
              	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
              	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_cft_meas",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
              	             {Type:"Text",      Hidden:0,  	Width:200,  Align:"Left",    ColMerge:1,   SaveName:"item_rmk",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
              	             {Type:"Combo",     Hidden:0, 	Width:70,   Align:"Left",    ColMerge:1,   SaveName:"item_dg_cd_tp",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
              	             {Type:"Text",      Hidden:0,  	Width:100,  Align:"Left",    ColMerge:1,   SaveName:"item_dg_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
              	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_shp_cmdt_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
              	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_po_sys_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
              	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_po_cmdt_seq",    KeyField:0,   CalcLogic:"",   Format:"",       	   PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
              	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
        	       
        	      InitColumns(cols);

        	     // SetGetCountPosition()(0);
        	      SetEditable(1);
        	      SetColProperty(0 ,"item_cmdt_cd" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
     	          SetColProperty(0 ,"item_shp_cmdt_cd" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
        	      SetColProperty('item_pck_ut_cd', {ComboText:PCKCD1, ComboCode:PCKCD2} );
        	      SetColProperty('item_cntr_list_seq', {ComboText:CNTCD1, ComboCode:CNTCD2} );
              		SetColProperty('item_dg_cd_tp', {ComboText:'|UN|IMDG', ComboCode:'|U|I'} );
              		
              	        SetSheetHeight(300);
        	                        /* oyh 2013.09.04 #20420 : [BINEX] BL ENTRY에 Package 정보 default setting*/
        	      }


      	 break;
		 case 4:      //TP/SZ init
		      with(sheetObj){
	          //  SetSheetHeight(0);
	        // (2, 0, 0, true);
		
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
		  case 5:
			  if(MULTI_CURR_FLAG == "Y"){	//Muti Currency 
				  with(sheetObj){
				      var cnt=0;
				      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
				      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				      var headers = [ { Text:getLabel('SEI_BMD_0020_HDR5_3'), Align:"Center"},
				                  { Text:getLabel('SEI_BMD_0020_HDR5_4'), Align:"Center"} ];
				      InitHeaders(headers, info);
				      var cols = [ 
									{Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
									{Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
									{Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
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
									{Type:"Combo",     Hidden:0, Width:50,   Align:"Center",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
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
									{Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" } ];
				       
						InitColumns(cols);
						SetColProperty('fr_frt_cd', {ComboText:ARFRTCD2, ComboCode:ARFRTCD1} );
						SetColProperty('fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
						SetColProperty('fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
						SetColProperty('fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
						SetColProperty('fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
						SetColProperty('fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
						SetColProperty(0 ,"fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
						SetEditable(1);
				        SetHeaderRowHeight(20 );
						SetHeaderRowHeight(21);
						SetSheetHeight(150);
						InitComboNoMatchText(1,"",1);
				  }
			  }else{
		      with(sheetObj){
			
			          // (43, 0, 0, true);
			           var cnt=0;

			           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

			           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			           var headers = [ { Text:getLabel('SEI_BMD_0020_HDR5_1'), Align:"Center"},
			                     { Text:getLabel('SEI_BMD_0020_HDR5_2'), Align:"Center"} ];
			           InitHeaders(headers, info);

			           var cols = [ 
			               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
			               {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
			               {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
			               {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
			               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
			               {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			               {Type:"Text",      Hidden:1, Width:50,   Align:"Center",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
			               {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
			               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" } ];
			            
			           InitColumns(cols);

			           SetEditable(1);
			           SetHeaderRowHeight(20 );
			           SetColProperty('fr_frt_cd', {ComboText:ARFRTCD2, ComboCode:ARFRTCD1} );
						  SetColProperty('fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
						  SetColProperty('fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
						  SetColProperty('fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
						  SetColProperty('fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
						  SetColProperty(0 ,"fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
						              SetSheetHeight(150);
						              InitComboNoMatchText(1,"",1);

		      }
			  }
	     break;
	     //Freight
	     case 6:      //Buying/Credit 탭부분 init
	    	 if(MULTI_CURR_FLAG == "Y"){	//Muti Currency 
	    		 with(sheetObj){
	    		      var cnt=0;
	    		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	    		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    		      var headers = [ { Text:getLabel('SEI_BMD_0020_HDR6_3'), Align:"Center"},
	    		                  { Text:getLabel('SEI_BMD_0020_HDR6_4'), Align:"Center"} ];
	    		      InitHeaders(headers, info);

	    		      var cols = [ 
	    		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Combo",     Hidden:0, Width:150,  Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	    		             {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	    		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	    		             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    		             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	    		             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    		             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	    		             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    		             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    		             {Type:"PopupEdit", Hidden:0, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
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
	    		             {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" } ];
	    		       
	    					InitColumns(cols);
	    					SetEditable(1);
	    					SetHeaderRowHeight(20 );
	    					SetHeaderRowHeight(21);
	    					SetColProperty('b_fr_frt_cd', {ComboText:APFRTCD2, ComboCode:APFRTCD1} );
	    					SetColProperty('b_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
	    					SetColProperty('b_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
	    					SetColProperty('b_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
	    					SetColProperty('b_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
	    					SetColProperty('b_fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
	    					SetColProperty(0 ,"b_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
	    					SetSheetHeight(150);
	    					InitComboNoMatchText(1,"",1);
	    	 }
	    	 }else{
	         with(sheetObj){
	    	
	    	          var cnt=0;

	    	          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

	    	          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    	          var headers = [ { Text:getLabel('SEI_BMD_0020_HDR6_1'), Align:"Center"},
	    	                    { Text:getLabel('SEI_BMD_0020_HDR6_2'), Align:"Center"} ];
	    	          InitHeaders(headers, info);

	    	          var cols = [ 
	    	              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	              {Type:"Combo",     Hidden:0, Width:150,  Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    	              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	    	              {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	    	              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	    	              {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    	              {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	              {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	              {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	    	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
	    	              {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    	              {Type:"Float",     Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    	              {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	    	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    	              {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
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
	    	              {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    	              {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    	              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    	              {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
	    	              {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" } ];
	    	          
	    	          InitColumns(cols);

	    	          SetEditable(1);
	    	          SetHeaderRowHeight(20);
	    	          SetColProperty('b_fr_frt_cd', {ComboText:APFRTCD2, ComboCode:APFRTCD1} );
	    		    	 SetColProperty('b_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
	    		    	 SetColProperty('b_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
	    		    	 SetColProperty('b_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
	    		    	 SetColProperty('b_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
	    		    	 SetColProperty(0 ,"b_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
	    		    	             SetSheetHeight(150);
	    		    	             InitComboNoMatchText(1,"",1);
	    	          }
	    	 }
	      break;
          case 7:      //Job Visibility
        	    with(sheetObj){
        	  
        	      //  (12, 0, 0, true);

        	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

        	        var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
        	        var headers = [ { Text:getLabel('SEE_BMD_HDR8'), Align:"Center"} ];
        	        InitHeaders(headers, info);

        	        var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"jb_del_chk",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:1,   EditLen:-1, HeaderCheck:0 },
        	               {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
        	               {Type:"Combo",     Hidden:0, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"jb_sts_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:1 },
        	               {Type:"Image",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"jb_sts_img",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
        	               {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"jb_pln_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"jb_pln_tm",     KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"jb_act_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"jb_act_tm",     KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	               {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dur_tm_qty",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:1 },
        	               {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"modi_usrid",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
        	               {Type:"Text",      Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"jb_tmplt_Seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
        	               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"jb_ibflag",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
        	         
        	        InitColumns(cols);

        	       // SetGetCountPosition()(0);
        	        SetEditable(1);
        	        SetImageList(0,APP_PATH+"/web/img/button/bt_green.gif");
        	        SetImageList(1,APP_PATH+"/web/img/button/bt_red.gif");
        	        InitViewFormat(0, "jb_pln_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
        	        InitViewFormat(0, "jb_act_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
        	        SetColProperty('jb_sts_nm', {ComboText:"|"+JBCD2, ComboCode:"|"+JBCD1} );
        	        SetSheetHeight(200);
        	        }
   		break;
          case 8:					//첨부파일
              with(sheetObj){
             
           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel('SEE_BMD_HDR2'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"doc_ibflag" },
               {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"Del",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
               {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"palt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
               {Type:"Text",      Hidden:0,  Width:55,   Align:"Center",  ColMerge:0,   SaveName:"palt_ext_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:380,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"palt_doc_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_msg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_img_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_pdf_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:0,   SaveName:"palt_doc_rmk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
           SetSheetHeight(200);
           //sheetObj.SetFocusAfterProcess(0);
           }
  	   break;
        case 9:      //HISTORY
            with(sheetObj){
           
	          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
	
	          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	          var headers = [ { Text:getLabel("SEE_BMD_HDR9"), Align:"Center"} ];
	          InitHeaders(headers, info);
	
	          var cols = [ {Type:"Float",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cng_seq" },
	                 {Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"itm_lbl" },
	                 {Type:"Text",     Hidden:0,  Width:310,  Align:"Left",    ColMerge:0,   SaveName:"bfr_cng_txt" },
	                 {Type:"Text",     Hidden:0,  Width:310,  Align:"Left",    ColMerge:0,   SaveName:"aft_cng_txt" },
	                 {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"rgst_usrid" },
	                 {Type:"Text",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"rgst_tms" } ];
	           
	          InitColumns(cols);
	          SetEditable(0);
	          SetSheetHeight(200);
                }
    	break;
        case 10:      //Buying/Credit 탭부분 init
        	if(MULTI_CURR_FLAG == "Y"){	//Muti Currency 
        		 with(sheetObj){
        		      var cnt=0;
        		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
        		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        		      var headers = [ { Text:getLabel('SEI_BMD_0020_HDR10_3'), Align:"Center"},
        		                  { Text:getLabel('SEI_BMD_0020_HDR10_4'), Align:"Center"} ];
        		      InitHeaders(headers, info);

        		      var cols = [ 
        		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        		             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        		             {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        		             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
        		             {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
        		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
        		             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
        		             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        		             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        		             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        		             {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
        		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
        		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        		             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        		             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        		             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        		             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
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
        		      SetEditable(1);
        		      SetHeaderRowHeight(20 );
        		      SetHeaderRowHeight(21);
        			  SetColProperty('dc_fr_frt_cd', {ComboText:DCFRTCD2, ComboCode:DCFRTCD1} );
        			  SetColProperty('dc_fr_sell_buy_tp_cd', {ComboText:"Revenue|Cost", ComboCode:"D|C"} );
        			  SetColProperty('dc_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
        			  SetColProperty('dc_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
        			  SetColProperty('dc_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
        			  SetColProperty('dc_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
        			  SetColProperty('dc_fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
        			  SetColProperty(0 ,"dc_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
        		      SetSheetHeight(150);
        		      InitComboNoMatchText(1,"",1);
        	}
        	}else{
            with(sheetObj){
        	         var cnt=0;
        	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

        	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	         var headers = [ { Text:getLabel('SEI_BMD_0020_HDR10_1'), Align:"Center"},
        	                   { Text:getLabel('SEI_BMD_0020_HDR10_2'), Align:"Center"} ];
        	         InitHeaders(headers, info);

        	         var cols = [ 
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
        	             {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
        	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
        	             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
        	             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
        	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
        	             {Type:"Float",     Hidden:0,  Width:40,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
        	             {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	             {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
        	         SetColProperty('dc_fr_frt_cd', {ComboText:DCFRTCD2, ComboCode:DCFRTCD1} );
        	        	SetColProperty('dc_fr_sell_buy_tp_cd', {ComboText:"Revenue|Cost", ComboCode:"D|C"} );
        	        	SetColProperty('dc_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
        	        	SetColProperty('dc_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
        	        	SetColProperty('dc_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
        	        	SetColProperty('dc_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
        	        	SetColProperty(0 ,"dc_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
        	        	            SetSheetHeight(150);
        	        	            InitComboNoMatchText(1,"",1);
        	         }
        	}
         break;
        case 11:	//A/N LIST
            with(sheetObj){
        	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

        	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	      var headers = [ { Text:getLabel('SEI_BMD_0020_HDR11'), Align:"Center"} ];
        	      InitHeaders(headers, info);

        	      var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"an_seq" },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"intg_bl_seq" },
        	             {Type:"PopupEdit", Hidden:0, Width:150,   Align:"Left",    ColMerge:0,   SaveName:"frt_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"frt_cd_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
        	             {Type:"Text",      Hidden:0,  Width:400,  Align:"Left",    ColMerge:0,   SaveName:"descr",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
        	             {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"an_frt_term_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:0,   SaveName:"amt",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
        	             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"an_ibflag" } ];
        	       
        	      InitColumns(cols);
        	      SetEditable(1);
        	      SetColProperty('an_frt_term_cd', {ComboText:"PP|CC", ComboCode:"PP|CC"} );
      	          SetSheetHeight(0, 1);
        	                  }
    	break;
    	/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim Start */
		case 12:     //Calculate CBM
		    with(sheetObj){
	       
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('SEE_BMD_0020_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"dim_ibflag" },
	             {Type:"Int",       Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"dim_len_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	             {Type:"Int",       Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"dim_wdt_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	             {Type:"Int",       Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"dim_hgt_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	             {Type:"Int",       Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"dim_pce_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dim_act_dim",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_chg_wgt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_chg_wgt1",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_meas",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_meas1",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	             {Type:"Text",      Hidden:1, Width:52,   Align:"Left",    ColMerge:1,   SaveName:"dim_pck_ut_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"dim_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"dim_wh_recp_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
	       
	      InitColumns(cols);
	      SetEditable(0);
	      SetSheetHeight(120);
	      //sheetObj.SetFocusAfterProcess(0);
	            }
	   break; 
	   /* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim End */
	   //#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
	   //Pickup/WorkOrder 그리드        
        case 13:
            with(sheetObj){

        	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

        	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	      var headers = [ { Text:getLabel('SEE_BMD_0020_HDR8_1'), Align:"Center"} ];
        	      InitHeaders(headers, info);

        	      var cols = [ {Type:"Text",     Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"wo_seq" },
        	             {Type:"Text",     Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"wo_no" },
        	             {Type:"Combo",     Hidden:0, Width:90,   Align:"Center",  ColMerge:0,   SaveName:"wo_status" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"pickup_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"delivery_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"return_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"trucker_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"wo_grs_wgt" } ];
        	       
        	      InitColumns(cols);
        	      SetEditable(0);
        	      SetColProperty('wo_status', {ComboText:"SAVED|ISSUED", ComboCode:"A|B"} );
      	          SetSheetHeight(400);
        }             
        break;
        
 	   case 14:      //User Defined Field
		    with(sheetObj){
	 		   SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
	
	 		   var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
	 		   var headers = [ { Text:getLabel("SEE_BMD_HDR20"), Align:"Center"} ];
	 		   InitHeaders(headers, info);
	
	 		   var cols = [ {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"udf_del_chk",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	 		                {Type:"Combo",     Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"udf_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	 		                {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"udf_val",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
	 		                {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"udf_ibflag",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
	
	 		   InitColumns(cols);
	
	 		   //   SetGetCountPosition()(0);
	 		   SetEditable(1);
	 		   SetColProperty('udf_cd', {ComboText:'|'+UDFCD, ComboCode:'|'+UDFNM} );
	 		   SetSheetHeight(200);
	 	   }
		    break;
	}
}
/**
 * Container 탭의 Container List
 */
function sheet3_OnPopupClick(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
	//Container 번호 호출시
	if(colStr=="cntr_no"){
		//gridPopCall(sheetObj, row, col, 'cntr_no')
	//Lessor정보 처리
	}else if(colStr=="cntr_sprl_trdp_cd"){
		gridPopCall(sheetObj, row, col, 'cntr_sprl_trdp_cd');
	}
	/*
	else if(colStr=="dim_pck_ut_cd"){
  	 	rtnary=new Array(1);
   		rtnary[0]="1";
        var rtnVal =  ComOpenWindow('./CMM_POP_0120.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px" , true);
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(row, Col,rtnValAry[0]);
		}
	}
	*/	
}
function sheet3_OnKeyUp(sheetObj, row, col, keyCode) {
	doAutoComplete(sheetObj, row, col, keyCode);
}
/**
* Item 탭 처리
*/
function sheet3_OnChange(sheetObj, row, col, value) {
	switch (sheetObj.ColSaveName(col)) {
		case "cgo_pck_qty" :
		case "cgo_wgt" :
		case "cgo_wgt1" :
		case "cgo_meas" :
		case "cgo_meas1" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
		case "Del" :
         	for(var i=1; i<=sheetObj.LastRow() + 1 ; i++){
				sheetObj.SetCellValue(i, 'Seq',i);
			}
        break;
	}
//	var cntrColStr = "cntr_no";
//	if(sheetObj.ColSaveName(col)==cntrColStr){
//
//		//Contaienr Number 유효성 검증
//		if(sheetObj.CellValue(row, cntrColStr)!==''){
//
//			var rtnVal = cntrNumCheck(sheetObj.CellValue(row, cntrColStr));
//			if(rtnVal){		//정상인경우
//				//중복 확인
//				if(!checkCntrNo(sheetObj.CellValue(row, cntrColStr))){
//					alert('This Container Number is already used!\nPlease check the Container Number!');
//					sheetObj.CellValue2(row, cntrColStr) = '';
//					sheetObj.SelectCell(row, cntrColStr);
//				}
//
//			}else{
//				//'Proceed anyway?')){
//				if(confirm(getLabel('FMS_COM_CFMCON'))){
//				}else{
//					sheetObj.CellValue2(row, cntrColStr) = '';
//					sheetObj.SelectCell(row, cntrColStr);
//				}
//			}
//		}
//	}
	switch(sheetObj.ColSaveName(col)){
		case "cgo_wgt":
			sheetObj.SetCellValue(row, "cgo_wgt1",roundXL(sheetObj.GetCellValue(row, col) / 0.453597315, 2),0);
		break;
		case "cgo_wgt1":
			sheetObj.SetCellValue(row, "cgo_wgt",roundXL(sheetObj.GetCellValue(row, col) * 0.453597315, 2),0);
		break;
		case "cgo_meas":
			sheetObj.SetCellValue(row, "cgo_meas1",roundXL(sheetObj.GetCellValue(row, col) * 35.3165, 3),0);
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
			   //meas 	= roundXL(parseFloat(meas), 6) 		+ roundXL(parseFloat(sheetObj.CellValue(i,"cgo_meas"), 6));
				meas=roundXL(parseFloat(meas), 6) 		+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas")), 6);
				meas1=roundXL(parseFloat(meas1), 6) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas1")), 6);
				grs_wgt=roundXL(parseFloat(grs_wgt), 3) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt")), 3);
				grs_wgt1=roundXL(parseFloat(grs_wgt1), 2) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt1")), 2);
		   }
		}
		var formObj=document.frm1;
		if((colNm == "cgo_pck_qty" || colNm == "Del") && cgo_pck_qty > 0){
			formObj.pck_qty.value=cgo_pck_qty;		
		}
		if((colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "Del") && grs_wgt > 0){
			formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(3));
			formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") / 0.453597315, 0);
			chkComma(formObj.grs_wgt1,8,2);		
			formObj.grs_wgt1.value=doMoneyFmt(Number(grs_wgt1).toFixed(2));
			formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(2)); //roundXL(formObj.grs_wgt1.value.replaceAll(",","") * 0.453597315, 3);
			chkComma(formObj.grs_wgt,8,3);			
		}	
		if((colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del") && meas > 0){
			formObj.meas.value=doMoneyFmt(Number(meas).toFixed(3));
			formObj.meas1.value=roundXL(formObj.meas.value.replaceAll(",","") * 35.3165, 3);
			chkComma(formObj.meas1,8,3);				
			formObj.meas1.value=doMoneyFmt(Number(meas1).toFixed(3));
			formObj.meas.value=roundXL(formObj.meas1.value.replaceAll(",","") / 35.3165, 3);
			chkComma(formObj.meas,8,3);				
		}	
		/* jsjang 2013.7.22  요구사항 #15952 Container Info 자동 필드값 반영요건  */
		if((colNm == "cgo_pck_qty" || colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del") && formObj.shp_mod_cd.value =="FCL"){
			mkSaidTxt(docObjects[1], formObj.sad_txt);
		}		
	}
	/* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 End */		
}
/**
 * 열 추가시 Container 번호가 Container List에 있는지 확인함
 */
var cntrListed=false;
function setItemCntrList(){
	if(!cntrListed){
		var cntrListObj=docObjects[1];
 		var cntrSize=cntrListObj.LastRow() + 1 ;
		var cntrCd=' |';
		var cntrLabel=' |';
		if(cntrSize>1){
			var hasCntr=false;
			for(var i=1; i < cntrSize; i++){
				//26239 HiddenRow면 무시
				if(!cntrListObj.GetRowHidden(i)) {
if(cntrListObj.GetCellValue(i, 'cntr_list_seq')!=''){
						if(hasCntr){
							cntrCd    += '|';
							cntrLabel += '|';
						}else{
							hasCntr=true;
						}
cntrLabel+= cntrListObj.GetCellValue(i, 'cntr_no');
cntrCd   += cntrListObj.GetCellValue(i, 'cntr_list_seq');
					}
				}
			}
			if(hasCntr){
				docObjects[2].InitDataCombo (0, 'item_cntr_list_seq', cntrLabel, cntrCd);
				cntrListed=true;
			}
		}
	}
}

function cmdtLoadPO(){
	setItemCntrList();
	
	if(cntrListed){
		rtnary=new Array(8);
		rtnary[0]=frm1.cnee_trdp_cd.value;
		rtnary[1]=frm1.cnee_trdp_nm.value;
		rtnary[2]=frm1.shpr_trdp_cd.value;
		rtnary[3]=frm1.shpr_trdp_nm.value;
		//rtnary[4]=frm1.por_cd.value;
		//rtnary[5]=frm1.por_nm.value;
		//rtnary[6]=frm1.del_cd.value;
		//rtnary[7]=frm1.del_nm.value;
		callBackFunc = "PO_POPLIST";
		modal_center_open('./CMM_POP_0400.clt', rtnary, 1300,500,"yes");
	}
	else{
		//먼저 Container List를 등록하여 주십시오! 
		alert(getLabel('SEA_COM_ALT013'));
	}
}

function PO_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("^^");
		var idx=docObjects[2].LastRow() + 1;
		
		for (var i=0; i < rtnValAry.length; i++) {
			if(rtnValAry[i] == ""){
				break;
			}
			gridAdd(2);
			
			var Seq = docObjects[2].GetCellValue(idx-1, "Seq");
			
			var itemArr=rtnValAry[i].split("@@");
			docObjects[2].SetCellValue(idx, "Seq",Number(idx == 2 ? "0" : docObjects[2].GetCellValue(idx-1, "Seq")) + 1,0);
			docObjects[2].SetCellValue(idx, "item_cust_po_no",itemArr[0],0);
			docObjects[2].SetCellValue(idx, "item_cmdt_cd",itemArr[1],0);
			docObjects[2].SetCellValue(idx, "item_cmdt_nm",itemArr[2],0);
			docObjects[2].SetCellValue(idx, "item_pck_qty",itemArr[3],0);
			docObjects[2].SetCellValue(idx, "item_pck_ut_cd",itemArr[4],0);
			docObjects[2].SetCellValue(idx, "item_pck_inr_qty",itemArr[5],0);
			docObjects[2].SetCellValue(idx, "item_ea_cnt",itemArr[6],0);
			docObjects[2].SetCellValue(idx, "item_ttl_qty",itemArr[7],0);
			docObjects[2].SetCellValue(idx, "item_wgt",itemArr[8],0);
			docObjects[2].SetCellValue(idx, "item_lbs_wgt",itemArr[9],0);
			docObjects[2].SetCellValue(idx, "item_meas",itemArr[10],0);
			docObjects[2].SetCellValue(idx, "item_cft_meas",itemArr[11],0);
			docObjects[2].SetCellValue(idx, "item_hs_grp_cd",itemArr[12],0);
			docObjects[2].SetCellValue(idx, "item_shp_cmdt_cd",itemArr[13],0);
			docObjects[2].SetCellValue(idx, "item_shp_cmdt_nm",itemArr[14],0);
			docObjects[2].SetCellValue(idx, "item_po_cmdt_seq",itemArr[15],0);
			docObjects[2].SetCellValue(idx, "item_po_sys_no",itemArr[16],0);
			idx++;
		}
	}
}

function cmdtRowAdd(){
	setItemCntrList();
	if(cntrListed){
		gridAdd(2);
	}
	else{
		//Please register container list first.
		alert(getLabel('SEA_COM_ALT013'));
	}
}
function sheet4_OnSearchEnd(sheetObj) {
	//setItemCntrList();
}
function sheet4_OnPopupClick(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
	//Item 코드
	if(colStr=="item_cmdt_cd"){
		gridPopCall(sheetObj, row, col, 'item_cmdt_cd');
	} 
	//HTS 코드(Commidity)
	else if(colStr=="item_shp_cmdt_cd"){
		gridPopCall(sheetObj, row, col, 'item_shp_cmdt_cd');
	}
}
function sheet4_OnKeyUp(sheetObj, row, col, keyCode) {
	//doAutoComplete(sheetObj, row, col, keyCode);
}
function sheet4_OnChange(sheetObj, row, col, value){
	switch (sheetObj.ColSaveName(col)) {
		case "item_shp_cmdt_cd" :
			doItemSearch(sheetObj, row, "commodity", value);
		break;
		
		case "item_cmdt_cd" :
			var row = sheetObj.GetSelectRow();
			var xml = loadDftItmVal(sheetObj, value);
			displayDftItmVal(xml,sheetObj,row);	
		break;
	
		case "item_pck_qty" :
		case "item_pck_inr_qty" :
		case "item_ea_cnt" :
		case "item_wgt" :
		case "item_lbs_wgt" :
		case "item_meas" :
		case "item_cft_meas" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	
	switch (sheetObj.ColSaveName(col)) {
		case "item_pck_qty" :
		case "item_pck_inr_qty" :
		case "item_ea_cnt" :
			sheetObj.SetCellValue(row, "item_ttl_qty", (Number(sheetObj.GetCellValue(row, "item_pck_qty")) * Number(sheetObj.GetCellValue(row, "item_pck_inr_qty"))) + Number(sheetObj.GetCellValue(row, "item_ea_cnt")),0);
		break;
	}
		
	var colStr=sheetObj.ColSaveName(col);
	//Item 코드(Commidity)
	if(colStr=="item_dg_cd_tp"){
		if(sheetObj.GetCellValue(row, "item_dg_cd_tp")=='U'||sheetObj.GetCellValue(row, "item_dg_cd_tp")=='I'){
			sheetObj.SetCellEditable(row, "item_dg_cd",1);
		}
		else{
			sheetObj.SetCellValue(row, "item_dg_cd",'');
		}
	}
	else if(colStr=="item_dg_cd"){
		if(sheetObj.GetCellValue(row, "item_dg_cd")!=''){
			if(sheetObj.GetCellValue(row, "item_dg_cd_tp")!='U'&&sheetObj.GetCellValue(row, "item_dg_cd_tp")!='I'){
				//Please select Type first!
				alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TYPE'));
				sheetObj.SetCellValue(row, "item_dg_cd",'',0);
			}
		}
	}else if(colStr=="item_wgt"){
		sheetObj.SetCellValue(row, "item_lbs_wgt",roundXL(sheetObj.GetCellValue(row, col) / 0.453597315, 2),0);
		if (sheetObj.GetCellValue(row, "item_lbs_wgt") >99999999.99) {
			alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGWEIG'));				
			sheetObj.SetCellValue(row, "item_wgt","",0);
			sheetObj.SelectCell(row, "item_wgt");
		}
	}else if(colStr=="item_lbs_wgt"){
		sheetObj.SetCellValue(row, "item_wgt",roundXL(sheetObj.GetCellValue(row, col) * 0.453597315, 2),0);
			
	}else if(colStr=="item_meas"){
		sheetObj.SetCellValue(row, "item_cft_meas",roundXL(sheetObj.GetCellValue(row, col) * 35.3165, 3),0);
		if (sheetObj.GetCellValue(row, "item_cft_meas") > 999999.999999) {
			alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGMEAS'));
			sheetObj.SetCellValue(row, "item_meas","",0);
			sheetObj.SelectCell(row, "item_meas");
		}
	}else if(colStr=="item_cft_meas"){
		sheetObj.SetCellValue(row, "item_meas",roundXL(sheetObj.GetCellValue(row, col) / 35.3165, 3),0);
	}
}
function sheet4_OnClick(sheetObj, row, col){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="item_dg_cd"){
		if(sheetObj.GetCellValue(row, "item_dg_cd_tp")!='U'&&sheetObj.GetCellValue(row, "item_dg_cd_tp")!='I'){
			//Please select Type first!
			alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TYPE'));
		}
	} else if(colStr=="item_cmdt_cd" || colStr=="item_shp_cmdt_cd"){
		if (sheetObj.GetCellValue(row, "item_po_cmdt_seq") == "") {
			sheetObj.SetCellEditable(row, colStr, 1);
		} else {
			sheetObj.SetCellEditable(row, colStr, 0);
		}
	}
}
var etdRangeOk=true;
var etaRangeOk=true;
/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function blCheckInpuVals(){
	var isOk=true;
	//---------------20121130 OJG---------------------------
	if(!chkCmpAddr(frm1.shpr_trdp_addr, 'Shipper Address')){
		isOk=false;
		moveTab('01');		
		frm1.shpr_trdp_addr.focus();
		return isOk;
	}
	if(!chkCmpAddr(frm1.cnee_trdp_addr, 'Consignee Address')){
		isOk=false;
		moveTab('01');
		frm1.cnee_trdp_addr.focus();
		return isOk;
	}
	if(!chkCmpAddr(frm1.ntfy_trdp_addr, 'Notify Address')){
		isOk=false;
		moveTab('01');
		frm1.ntfy_trdp_addr.focus();
		return isOk;
	}
	//---------------20121130 OJG--------------------------
	/*
	 *  2012.02.23
	 * 필수값 설정
	 * REF_NO, ETD
	 */
	//if(checkInputVal(frm1.bl_no.value, 2, 40, "T", 'HB/L No.')!='O'){ //S.Y BAIK (2013.01.23)
	if(getStringLength(frm1.bl_no.value) == 0){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_HBNO'));
		isOk=false;
		moveTab('01');
		frm1.bl_no.focus();
		return isOk;
	}
	//else if(checkInputVal(frm1.ref_no.value, 2, 30, "T", 'Filing. No.')!='O'){ //S.Y BAIK (2013.01.23)
	else if(getStringLength(frm1.ref_no.value) == 0){ 
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_FINO'));
		isOk=false;
		moveTab('01');
		frm1.ref_no.focus();
		return isOk;
	}
	//else if(checkInputVal(frm1.eta_dt_tm.value, 10, 10, "DD", 'ETA')!='O'){ //S.Y BAIK (2013.01.23)
	else if(!checkInType(frm1.eta_dt_tm.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ETA_'));
		isOk=false;
		moveTab('01');
		frm1.eta_dt_tm.focus();
		return isOk; 
	}
	//else if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'ETD')!='O'){ //S.Y BAIK (2013.01.23)
	else if(!checkInType(frm1.etd_dt_tm.value, "DD")){
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
	//LHK, 20140612 #33814 [BINEX]Import Mandatory 추가 - Carrier
	if(frm1.lnr_trdp_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001') + " - Carrier");
		moveTab('01');
		frm1.lnr_trdp_cd.focus();
		isOk = false;
		return isOk; 
	}
	
	//#31594 [BINEX]B/L Entry 에서 Customer 항목을 mandatory 지정 - 필수값 설정 추가
	if(frm1.act_shpr_trdp_cd.value == "") { 
//		alert(getLabel('FMS_COM_ALT001'));
		alert(getLabel('FMS_COM_ALT001') + " - CUSTOMER");
		moveTab('01');
		frm1.act_shpr_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.act_shpr_trdp_nm.value == "") { 
//		alert(getLabel('FMS_COM_ALT001'));
		alert(getLabel('FMS_COM_ALT001') + " - CUSTOMER");
		moveTab('01');
		frm1.act_shpr_trdp_nm.focus();
		isOk = false;
		return isOk; 
	}
	//today를 기준으로 6개월 차이가 나면 안됨
	var tmpEtdDate=frm1.etd_dt_tm.value.replaceAll("-", "");
	var tmpEtaDate=frm1.eta_dt_tm.value.replaceAll("-", "");
	var etdDate=new Date(tmpEtdDate.substring(4,8), tmpEtdDate.substring(0,2)-1, tmpEtdDate.substring(2,4));
	var etaDate=new Date(tmpEtaDate.substring(4,8), tmpEtaDate.substring(0,2)-1, tmpEtaDate.substring(2,4));
	var tmpDate=new Date();
	var today=new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate());
	if((today-etdDate)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	}else if((etdDate-today)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	}else{
		etdRangeOk=true;
	}
	if((today-etaDate)/(60*60*24*1000) > 180){
		etaRangeOk=false;
	}else if((etaDate-today)/(60*60*24*1000) > 180){
		etaRangeOk=false;
	}else{
		etaRangeOk=true;
	}
	
	var sheetObj17=docObjects[13];
	for(var i=1; i<=sheetObj17.RowCount(); i++){
		if(sheetObj17.GetCellValue(i,"udf_cd") == ""){
			alert(getLabel('FMS_COM_ALT001'));
			sheetObj17.SelectCell(i,"udf_cd");
			isOk=false;
		}
	}
	
	
	/*
	else if(checkInputVal(frm1.shpr_trdp_nm.value, 2, 50, "T", 'Shipper Name')!='O'){
		isOk=false;
		moveTab('01');
		frm1.shpr_trdp_nm.focus();
	}else if(checkInputVal(frm1.shpr_trdp_addr.value, 2, 400, "T", 'Shipper Address')!='O'){
		isOk=false;
		moveTab('01');
		frm1.shpr_trdp_addr.focus();
	}else if(checkInputVal(frm1.cnee_trdp_nm.value, 2, 50, "T", 'Consignee Name')!='O'){
		isOk=false;
		moveTab('01');
		frm1.cnee_trdp_nm.focus();
	}else if(checkInputVal(frm1.cnee_trdp_addr.value, 2, 400, "T", 'Consignee Address')!='O'){
		isOk=false;
		moveTab('01');
		frm1.cnee_trdp_addr.focus();
	}else if(checkInputVal(frm1.act_shpr_trdp_cd.value, 6, 6, "T", 'A/Shipper CODE')!='O'){
		isOk=false;
		moveTab('01');
		frm1.act_shpr_trdp_cd.focus();
	}else if(checkInputVal(frm1.act_shpr_trdp_nm.value, 2, 50, "T", 'A/Shipper Name')!='O'){
		isOk=false;
		moveTab('01');
		frm1.act_shpr_trdp_nm.focus();
	}else if(checkInputVal(frm1.act_shp_info.value, 0, 100, "T", 'A/Shipper MEMO')!='O'){
		isOk=false;
		moveTab('01');
		frm1.act_shp_info.focus();
	}else if(checkInputVal(frm1.obrd_dt_tm.value, 10, 10, "DD", 'On Board Date')!='O'){
		isOk=false;
		moveTab('01');
		frm1.obrd_dt_tm.focus();
	}else if(checkInputVal(frm1.trnk_vsl_nm.value, 2, 100, "T", 'Vessel Name')!='O'){
		isOk=false;
		moveTab('01');
		frm1.trnk_vsl_nm.focus();
	}else if(checkInputVal(frm1.trnk_voy.value, 3, 8, "T", 'Voyage')!='O'){
		isOk=false;
		moveTab('01');
		frm1.trnk_voy.focus();
	}else if(checkInputVal(frm1.pol_cd.value, 5, 6, "T", 'POL Code')!='O'){
		isOk=false;
		moveTab('01');
		frm1.pol_cd.focus();
	}else if(checkInputVal(frm1.pod_cd.value, 5, 6, "T", 'POD Code')!='O'){
		isOk=false;
		moveTab('01');
		frm1.pod_cd.focus();
	}else if(checkInputVal(frm1.del_cd.value, 5, 6, "T", 'DEL Code')!='O'){
		isOk=false;
		moveTab('01');
		frm1.del_cd.focus();
	}else if(checkInputVal(frm1.lnr_trdp_cd.value, 6, 7, "T", 'Liner Code')!='O'){
		isOk=false;
		moveTab('01');
		frm1.lnr_trdp_cd.focus();
	}else if(checkInputVal(frm1.lnr_trdp_nm.value, 2, 50, "T", 'Liner')!='O'){
		isOk=false;
		moveTab('01');
		frm1.lnr_trdp_nm.focus();
	}else if(checkInputVal(frm1.eta_dt_tm.value, 10, 10, "DD", 'POD ETA Date')!='O'){
		isOk=false;
		moveTab('01');
		frm1.eta_dt_tm.focus();
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
	}else if(checkInputVal(frm1.sls_usrid.value, 2, 15, "T", 'Sales Person')!='O'){
		isOk=false;
		moveTab('01');
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
	}else if(checkInputVal(frm1.rep_cmdt_cd.value, 0, 50, "T", 'Commodity')!='O'){
		isOk=false;
		moveTab('01');
		frm1.rep_cmdt_cd.focus();
	}else if(checkInputVal(frm1.rep_cmdt_nm.value, 1, 200, "T", 'Commodity')!='O'){
		isOk=false;
		moveTab('01');
		frm1.rep_cmdt_nm.focus();
	}
	*/
	/*==================================================================================================*/
	/* LHK, 20130128 Freight Edit/Delete 는 TB_FRT.INV_STS_CD 가 FI 인 경우에만 허용						    */
	/* Freight 생성 후 Invoice 를 생성한 후 재조회 하지 않고 다시 저장할 경우 delete 하거나 수정 건으로 인한 오류 발생을 차단. */
	var sheetObjArr=new Array(3);
		sheetObjArr[0]=docObjects[4];		//AR LOCAL  'fr_'
		sheetObjArr[1]=docObjects[9];	//DC 		'dc_fr_'
		sheetObjArr[2]=docObjects[5];		//AP 		'b_fr_'
	if(checkFrtSts(sheetObjArr)==false){	//Validation 후 Do you want to save 뜨지 않고 원래값 가져오기
		isOk=false;
	}
	/*=================================================================================================*/
	//Container List & Item List validation.
    var cntrListParam=docObjects[3].GetSaveString(false);
    if(docObjects[3].IsDataModified() && cntrListParam == "") { isOk=false; };
	if(cntrListParam!=''){
		if(cntrListCheckInpuVals(docObjects[3])){
			isOk=false;
		}
	}
	var cmdtListParam=docObjects[2].GetSaveString(false);
	if(docObjects[2].IsDataModified() && cmdtListParam == "") { isOk=false; };
	if(cmdtListParam!=''){
		if(itemCheckInpuVals(docObjects[2])){
			isOk=false;
		}
	}
	
	var frtSdListParam=docObjects[4].GetSaveString(false);
    if(docObjects[4].IsDataModified() && frtSdListParam == "") { isOk=false; };

    var frtBcListParam=docObjects[5].GetSaveString(false);
    if(docObjects[5].IsDataModified() && frtBcListParam == "") { isOk=false; };

    var frtDcListParam=docObjects[9].GetSaveString(false);
    if(docObjects[9].IsDataModified() && frtDcListParam == "") { isOk=false; };
	
	// 24620 CCN NO 중복 체크
	checkDuplCcn();
	if (ccn_dupl){
		//[warning] Duplicated CCN number found.
	 	alert(getLabel('FMS_COM_ALT063'));
	 	moveTab('03');
	 	frm1.ccn_no.value="";
	 	frm1.ccn_no.focus();
	 	isOk=false;
	}
	
	// 44406 BL SERIAL NO 널 체크
	if (frm1.use_hbl_ser.value == 'Y') {
		frm1.hbl_ser_no.value = trim(frm1.hbl_ser_no.value);
		if (frm1.hbl_ser_no.value == ""){
			alert(getLabel('FMS_COM_ALT001'));
			frm1.hbl_ser_no.focus();
			return false;
		}
		
		// 긴급 'N/A', 'SP' 입력 시 중복체크 안함 
		if (frm1.hbl_ser_no.value != 'N/A' && frm1.hbl_ser_no.value != 'SP') {
			// 44406 BL SERIAL NO 중복 체크
			checkHblSerNo();
			if (hbl_ser_dupl){
				alert(getLabel('FMS_COM_ALT072'));
				moveTab('01');
				frm1.hbl_ser_no.focus();
				isOk=false;
			}
		}
	}

	return isOk;
}
/**
 * Container List의 입력값 확인
 */
function cntrListCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1 ;
	var isError=false;
	var workItems=0;
	for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'conls_ibflag')=='U'||sheetObj.GetCellValue(i, 'conls_ibflag')=='I'){
			if(checkInputVal(sheetObj.GetCellValue(i, 'cntr_no'),      0, 14, "T", 'Container No.')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'cntr_tpsz_cd'), 2, 6, "T", 'Container Type/Size')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'seal_no1'),     0,20, "T", 'Seal No.1')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'seal_no2'),     0,20, "T", 'Seal No.2')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'seal_no3'),     0,20, "T", 'Seal No.3')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'cgo_pck_qty'),  0, 7, "N", 'Package Qty')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'cgo_pck_ut'),   0, 6, "T", 'Package Unit')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'cgo_wgt'),      0, 10, "N", 'Weight')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'cgo_meas'),     0, 12, "N", 'Meas.')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'vol_meas'),     0, 12, "N", 'Volume')!='O'){
				isError=true;
			}
			/*
				else if(checkInputVal(sheetObj.GetCellValue(i, 'cntr_sprl_trdp_cd'), 5, 10, "T", 'Lessor Code')!='O'){
				isError=true;
			}
			*/
			else if(checkInputVal(sheetObj.GetCellValue(i, 'cntr_rmk'),     0, 50, "T", 'Remark.')!='O'){
				isError=true;
			}
		}
	}
	return isError;
}
 /**
  * Container List의 입력값 확인
  */
  function cntrListValid(sheetObj){
 	 	var totRow=sheetObj.RowCount();
 	 	var isError=true;
 	 	var workItems=0;
 	 	if(totRow > 0){
	 	 	for(var i=1; i <= totRow ; i++){
	 	 		if(sheetObj.GetCellValue(i, 'cntr_no') != "" && sheetObj.GetCellValue(i,'cntr_tpsz_cd') !=""){
	 				isError=true;
	 			}else{
	 				isError=false;		
	 			}
	 	 	}
 	 	}
 	 	return isError;
 }
/**
 * Item Commodity입력값 확인
 */
function itemCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1 ;
	var isError=false;
	var workItems=0;
	for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'item_ibflag')=='U'||sheetObj.GetCellValue(i, 'item_ibflag')=='I'){
			//if(checkInputVal(sheetObj.GetCellValue(i, 'item_shp_cmdt_cd'), 4, 12, "T", 'Item Code')!='O'){
			//	isError=true;
			//}
				
			if(checkInputVal(sheetObj.GetCellText(i, 'item_cntr_list_seq'), 1, 14, "T", 'Container No.')!='O'){
				isError=true;
			}
		}
	}
	return isError;
}
/**
 * EDI 입력값 체크
 */
function ediCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1 ;
	var isError=false;
	var workItems=0;
	for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'xpt_ibflag')=='U'||sheetObj.GetCellValue(i, 'xpt_ibflag')=='I'){
			if(checkInputVal(sheetObj.GetCellValue(i, 'xpt_no'), 10, 20, "T", '수출신고번호')!='O'){
				isError=true;
			}
		}
	}
	return isError;
}
//***************Freight Sheets Event처리***************
/**
 * Freight Container List 목록조회
 */
function sheet7_OnSearchEnd(sheetObj, row, col) {
	//Container Type Size 설정
	var TPSZCD1=' |';
	var TPSZCD2=' |';
 	var totCnt=sheetObj.LastRow() + 1 ;
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
	docObjects[9].SetColProperty("dc_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
}
var inv_viw_tp='S';
/**
 * Freight S/D 처리
 */
function sheet8_OnClick(sheetObj, row, col){
	mutiSheetOnClick(sheetObj, row, col, '', 'S', 'I', 'H');
}
/**
 * Freight S/D 처리
 */
function sheet8_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'I', 'H');
}
/**
 * Freight S/D 처리.
 * Type/Size에 따른 Volume(수량) 체크
 */
function sheet8_OnChange(sheetObj, row, col, value) {
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
	mutiSheetOnChange(sheetObj, row, col, '', 'S', 'I', 'H');
}
/**
 * Freight S/D 조회 완료시
 */
function sheet8_OnSearchEnd(sheetObj, row, col) {
	//버튼 초기화
	cnfCntr('SD');
	//PPD, CCT, Total 계산
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, '', 'S', 'I', 'H');
	} 	
}
/**
 * Freight S/D 저장 완료시
 */
function sheet8_OnSaveEnd(sheetObj, row, col) {
	//버튼 초기화
	cnfCntr('SD');
	//PPD, CCT, Total 계산
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
}
function sheet8_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, '');
}
function sheet9_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, 'b_', 'S', 'I', 'H');
	}
}
function sheet9_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
}
/**
 * Freight B/C 처리
 */
function sheet9_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'I', 'H');
}
/**
 * Freight B/C 처리
 */
function sheet9_OnClick(sheetObj, row, col){
	mutiSheetOnClick(sheetObj, row, col, 'b_', 'S', 'I', 'H');
}
/**
 * Freight B/C 처리
 * Type/Size에 따른 Volume(수량) 체크
 */
function sheet9_OnChange(sheetObj, row, col, value) {
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
	mutiSheetOnChange(sheetObj, row, col,  'b_', 'S', 'I', 'H');
}
function sheet9_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'b_');
}
//Job Visibility
function sheet11_OnChange(sheetObj, row, col, value) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "jb_sts_nm"){
		for(var i=1; i<=sheetObj.LastRow(); i++){
			if(i != row){
if(sheetObj.GetCellValue(i,"jb_sts_nm") == sheetObj.GetCellValue(row,"jb_sts_nm")){
					//Duplication Task
					alert(getLabel('FMS_COM_ALT008'));
					sheetObj.SetCellValue(row,"jb_sts_nm","");
				}
			}
		}
	}
}
/**
 * Container Sheet Object를 리턴함
 */
function getCrtrSheet(){
	return docObjects[3];
}
/**
 * Selling/Debit Sheet를 리턴함
 */
function getSdSheet(){
	return docObjects[4];
}
function getSdUrl(){
	return "./SEI_BMD_0024GS.clt";
}
function getSdFndSeq(){
	return 5;
}
/**
 * Buying/Selling Sheet를 리턴함
 */
function getBcSheet(){
	return docObjects[5];
}
/**
 * Debit/Credit Sheet를 리턴함
 */
function getDcSheet(){
	return docObjects[9];
}
function getBcUrl(){
	return "./SEI_BMD_0024GS.clt";
}
function getBcFndSeq(){
	return 6;
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column)
 */
function sheet10_OnDblClick(sheetObj,Row,Col){
	//Name선택 시에만 팝업 호출
	if(sheetObj.ColSaveName(Col)=='palt_doc_no' || sheetObj.ColSaveName(Col)=='palt_doc_msg'){
		var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
		reqParam += '&s_palt_doc_seq='+sheetObj.GetCellValue(Row,"palt_doc_seq");
		reqParam += '&openMean='+SEARCH02;
		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDocUp', 806, 420, "scroll:no;status:no;help:no;");
	}
}
 function sheet10_OnMouseMove(sheetObj, row, col){
		if(sheetObj.MouseCol()==9){
//no support[check again]CLT 			sheetObj.ToolTipOption="balloon:true;width:320;backcolor:#FFFFE0;forecolor:#000000;icon:0;title:Message";
var memo=sheetObj.GetCellValue(sheetObj.MouseRow(), "palt_doc_msg");
			memo=memo.replaceAll("@^^@", "\n");
			sheetObj.SetToolTipText(sheetObj.MouseRow(), sheetObj.MouseCol(),memo);
		}
	}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet10_OnClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column)
 */
function sheet10_OnClick(sheetObj, Row, Col){
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
	} // end switch
}
 /*
  * 도량형 변환식
  * jsjang 2013.7.18 #16510 CBM Auto Caculation, dim
  */
 function sheet13_OnChange(sheetObj, row, col, value){
 	switch (sheetObj.ColSaveName(col)) {
 		case "dim_len_dim" :
 		case "dim_wdt_dim" :
 		case "dim_hgt_dim" :
 		case "dim_pce_qty" :
 		case "dim_act_dim" :
 			if (value < 0) {
 				//Input data must be greater than 0.
 				alert(getLabel("FMS_COM_ALT042"));
 				sheetObj.SetCellValue(row, col,"",0);
 				return;
 			}
 		break;
 	}
 	var colName=sheetObj.ColSaveName(col);
 	var formObj=document.frm1;
 	/* jsjang 2013.8.22 #18650 B/L Entry 화면에서 Dimensions 리스트 항목 - 삭제 Check시 상단 Measurement/Package 등에 반영 안됨 보완 */
 	//if (colName=="dim_len_dim" || colName=="dim_wdt_dim" || colName=="dim_hgt_dim" || colName=="dim_pce_qty") {
 	if (colName=="dim_len_dim" || colName=="dim_wdt_dim" || colName=="dim_hgt_dim" || colName=="dim_pce_qty" || colName=="del" || colName=="dim_act_dim") {
 		var formObj=document.frm1;
 		var length=sheetObj.GetCellValue(row, "dim_len_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_len_dim");
		var width=sheetObj.GetCellValue(row, "dim_wdt_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_wdt_dim");
		var height=sheetObj.GetCellValue(row, "dim_hgt_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_hgt_dim");
		var pcs=sheetObj.GetCellValue(row, "dim_pce_qty")=="" ? 0 : sheetObj.GetCellValue(row, "dim_pce_qty");
 		var cbm=0;
// 		var kg		= 0;
 		var sumCbm=0;
 		var sumPcs=0;
 		if (formObj.size_ut_cd[0].checked) {
// 			kg = roundXL(length * width * height * pcs / 6000, 2);
 			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 3);
 		} else if (formObj.size_ut_cd[1].checked) {
// 			kg = roundXL(length * width * height * pcs / 166, 2);
 			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 3);
 		}
 		/* jsjang 2013.8.22 #18650 B/L Entry 화면에서 Dimensions 리스트 항목 - 삭제 Check시 상단 Measurement/Package 등에 반영 안됨 보완 */
		/* if 문만 추가 */
		if (colName !="dim_act_dim")
		{
			sheetObj.SetCellValue(row, "dim_act_dim",cbm.toFixed(3),0);
		}
 		if (cbm.toFixed(3) > 999999) {
 			alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("6")));
 			sheetObj.SetCellValue(row, "dim_act_dim",0,0);
 			return;
 		}
 		for(var i=1 ; i<sheetObj.LastRow() + 1  ; i++){
			/* jsjang 2013.8.22 #18650 B/L Entry 화면에서 Dimensions 리스트 항목 - 삭제 Check시 상단 Measurement/Package 등에 반영 안됨 보완 */
			/* if 문만 추가 */
 			if(sheetObj.GetCellValue(i, "del") == 0)
			{ 			
 				sumCbm += parseFloat(sheetObj.GetCellValue(i, "dim_act_dim"));
 				sumPcs += parseFloat(sheetObj.GetCellValue(i, "dim_pce_qty"));
			}
 		}
 		formObj.meas.value=sumCbm.toFixed(3);
 		formObj.pck_qty.value=sumPcs.toFixed(0);
 		cbmChange(formObj.meas);
// 		if(formObj.size_ut_cd[0].checked){
// 			formObj.meas.value = sumCbm.toFixed(3);
// 			cbmChange(formObj.meas);
// 		}else if(formObj.size_ut_cd[1].checked){
// 			formObj.meas.value = sumCbm.toFixed(3);
// 			cbmChange(formObj.meas);
// 		}else{
// 			//
// 		}
 		}
 } 
function setOfficeData(){
	var formObj=document.frm1;
	var sheetObj=docObjects[11];
	/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
	setSizeUtCd(oth_size_ut_cd);
	//office post date setting, Ocean Export
//	if(formObj.post_dt.value==""){
//		if(ofc_post_dt=="TODAY"){
//			formObj.post_dt.value = getTodayStr();
//		}
//	}
	//office currency
	if(ofc_curr_cd!=""){
		formObj.curr_cd.value=ofc_curr_cd;
	}
}
function setActShipper(){
	var formObj=document.frm1;
 	// #25244 Customer 정보가 있어도 Shipper 변경 시 Customer 를 Shipper 로 다시 변경함
	/*if(  trim(formObj.act_shpr_trdp_cd.value)=="" 
	  && trim(formObj.act_shpr_trdp_nm.value)=="" 
	  && trim(formObj.act_shp_info.value)==""){
		formObj.act_shpr_trdp_cd.value=formObj.cnee_trdp_cd.value;
		formObj.act_shpr_trdp_nm.value=formObj.cnee_trdp_nm.value;
		formObj.act_shp_info.value=formObj.cnee_trdp_addr.value;
	}*/
	formObj.act_shpr_trdp_cd.value=formObj.cnee_trdp_cd.value;
	formObj.act_shpr_trdp_nm.value=formObj.cnee_trdp_nm.value;
	formObj.act_shp_info.value=formObj.cnee_trdp_addr.value;
	//#25711 [SUNWAY]Sales Man 자동 설정 
	if (typeof(formObj.sls_usrid.value)!='undefined'
		&& typeof(formObj.sls_usr_nm.value)!='undefined'
			&& typeof(formObj.sls_ofc_cd.value)!='undefined'
				&& typeof(formObj.sls_dept_cd.value)!='undefined')
	{
		setSalesMan(formObj.act_shpr_trdp_cd.value);
	}
}
//화면의 checkbox를 database 값으로 셋팅한다.
function checkBoxSetting(){
	var formObj=document.frm1;
	if(formObj.sub_mbl_flg.value=="Y"){
		formObj.sub_mbl_flg.checked=true;
	}else{
		formObj.sub_mbl_flg.checked=false;
	}
	if(formObj.org_bl_rcvd_flg.value=="Y"){
		formObj.org_bl_rcvd_flg.checked=true;
	}else{
		formObj.org_bl_rcvd_flg.checked=false;
	}
	if(formObj.ror_flg.value=="Y"){
		formObj.ror_flg.checked=true;
	}else{
		formObj.ror_flg.checked=false;
	}
	if(formObj.rlsd_flg.value=="Y"){
		formObj.rlsd_flg.checked=true;
	}else{
		formObj.rlsd_flg.checked=false;
	}
	if(formObj.ctrb_ratio_yn.value=="Y"){
		formObj.ctrb_ratio_yn.checked=true;
	}else{
		formObj.ctrb_ratio_yn.checked=false;
	}
}
/* 
 * jsjang 2013.7.18 #16510 CBM Auto Caculation, dim 
 */
function setSizeUtCd(obj){
	var formObj=document.frm1;
	var sheetObj=docObjects[11];
	//alert(obj);
	if(obj=="CM"){
		formObj.size_ut_cd[0].checked=true;
		formObj.size_ut_cd[1].checked=false;
		//sheetObj.InitHeadRow(0, '|Del|Length|Width|Height|PCS|CBM', false);
//		sheetObj.InitHeadRow(0, getLabel('SEE_BMD_0020_HDR_C'), false);
	}else if(obj=="INCH"){
		formObj.size_ut_cd[0].checked=false;
		formObj.size_ut_cd[1].checked=true;
//		sheetObj.InitHeadRow(0, '|Del|Length|Width|Height|PCS|CBM', false);
//		sheetObj.InitHeadRow(0, getLabel('SEE_BMD_0020_HDR_C'), false);
	}else{
		formObj.size_ut_cd[0].checked=false;
		formObj.size_ut_cd[1].checked=false;
	}
}
/* 
* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim 
*/
 function chkSizeType(){
		var formObj=document.frm1;
		var sheetObj=docObjects[11];
		if(formObj.size_ut_cd[0].checked){
//			sheetObj.InitHeadRow(0, '|Del|Length|Width|Height|PCS|CBM', false);
			sheetObj.InitHeadRow(0, getLabel('SEE_BMD_0020_HDR_C'), false);
//			formObj.meas1.value = '0.000';
		}else if(formObj.size_ut_cd[1].checked){
//			sheetObj.InitHeadRow(0, '|Del|Length|Width|Height|PCS|CBM', false);
			sheetObj.InitHeadRow(0, getLabel('SEE_BMD_0020_HDR_C'), false);
//			formObj.meas.value = '0.000';
		}else{
			//
		}
		//LHK 20130812 CM에서 INCH SWITCH 할 경우 CMB Auto Calculation 적용
//		for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++){
//			sheetObj.CellValue(i, "dim_act_dim") = 0;
//		}
		var length=0;
		var width=0;
		var height=0;
		var pcs=0;
		var cbm=0;
		var sumCbm=0;
		var sumPcs=0;
		for(var i=1 ; i<sheetObj.LastRow() + 1  ; i++){
			length=sheetObj.GetCellValue(i, "dim_len_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_len_dim");
			width=sheetObj.GetCellValue(i, "dim_wdt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_wdt_dim");
			height=sheetObj.GetCellValue(i, "dim_hgt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_hgt_dim");
			pcs=sheetObj.GetCellValue(i, "dim_pce_qty")=="" ? 0 : sheetObj.GetCellValue(i, "dim_pce_qty");
	 		if (formObj.size_ut_cd[0].checked) {
	 			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 3);
	 		} else if (formObj.size_ut_cd[1].checked) {
	 			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 3);
	 		}
	 		sheetObj.SetCellValue(i, "dim_act_dim",cbm.toFixed(3),0);
		}
 		for(var i=1 ; i<sheetObj.LastRow() + 1  ; i++){
sumCbm += parseFloat(sheetObj.GetCellValue(i, "dim_act_dim"));
sumPcs += parseFloat(sheetObj.GetCellValue(i, "dim_pce_qty"));
 		}
 		formObj.meas.value=sumCbm.toFixed(3);
 		formObj.pck_qty.value=sumPcs.toFixed(0);
 		cbmChange(formObj.meas);
	}
function svcTermChange(){
	var formObj=document.frm1;
	formObj.to_svc_term_cd.value=formObj.fm_svc_term_cd.value;
}

function shipModeChange(){
	var formObj=document.frm1;
	var isOk=true;
	if(isOk){
		//office에서 설정한 FCL, LCL 문장을 가져온다.
		if(formObj.shp_mod_cd.value=="FCL"){
			formObj.desc_txt.value=formObj.h_oi_an_fcl_desc.value;
		}else if(formObj.shp_mod_cd.value=="LCL" || formObj.shp_mod_cd.value=="FAK"){
			formObj.desc_txt.value=formObj.h_oi_an_lcl_desc.value;
			//frm1.fm_svc_term_cd.value='CF';
			//frm1.to_svc_term_cd.value='CF';
		}else{
			formObj.desc_txt.value='';
		}
	}
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
function setToday(obj){
	var formObj=document.frm1;
	if(obj.name=="rlsd_flg"){
		if(obj.checked){
			formObj.rlsd_dt_tm.value=getTodayStr();
			formObj.rlsd_usrid.value=current_usrid;
		}else{
			formObj.rlsd_dt_tm.value='';
			formObj.rlsd_usrid.value='';
		}
	}else if(obj.name=="org_bl_rcvd_flg"){
		if(obj.checked){
			formObj.rcvd_dt_tm.value=getTodayStr();
		}else{
			formObj.rcvd_dt_tm.value='';
		}
	}
}
//화면로드시 데이터 표시
function loadData(){
	frm1.f_intg_bl_seq.value='';	 
	if(frm1.bl_sts_cd.value!='NA'){
		searchGrid(1);
		//Container목록 기본조회
		searchGrid(2);
		//DIM 조회  jsjang 2013.7.18 #16510 CBM Auto Caculation, dim 
		searchGrid(12);		
	}else{
		if (docObjects[11].GetEditable() == 0) {
			docObjects[11].SetEditable(1);
		}

		//BL_COPY
		var orgBlSeq = frm1.copy_bl_seq.value;
		if (orgBlSeq != "") {
			selectCopyBLFrt();
		}
	}
	if(frm1.intg_bl_seq.value!=""){
		//currency를 database에 있는 값으로 셋팅함
		frm1.curr_cd.value=frm1.h_curr_cd.value;
		//attach rider 체크
		rowCount(frm1, 15, frm1.rider_lbl);
//		frm1.bl_no.className = 'search_form-disable';
//		frm1.bl_no.readOnly  = true;
		//sizeUtCd 셋팅 jsjang 2013.7.18 #16510 CBM Auto Caculation, dim
		//alert(frm1.size_ut_cd1.value);
		setSizeUtCd(frm1.size_ut_cd1.value);
	}
    // IT NUMBER형식에 맞게 변환
    var frmItNum=frm1.it_no.value;
    if (frmItNum.length == 9){
    	frm1.it_no.value=convertItType(frmItNum);
    	// ###.###.### 형태로 변경
    	//frm1.real_it_no.value = frmItNum;
    }
	/* 
	 * jsjang 2013.7.5 
	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건
	 * Start 
	 */        
	 cntr_ship_init();
	/* 
	 * jsjang 2013.7.5 
	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건
	 * End 
	 */		    
	 
	//#41634 - [DMS] Default Cursor Position Change
	frm1.bl_no.focus();
}
function obrdChange(){
	var formObj=document.frm1;
	//ETD에도 on board date를 반영한다.
	formObj.etd_dt_tm.value=formObj.obrd_dt_tm.value;
	mkDateFormatType(formObj.etd_dt_tm, event, true,1);
}
function weightChange(obj){
	var formObj=document.frm1;
	if(obj.name=="grs_wgt"){
		formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") / 0.453597315, 3);
		chkComma(formObj.grs_wgt1,8,3);
	}
	else if(obj.name=="grs_wgt1"){
		formObj.grs_wgt.value=roundXL(formObj.grs_wgt1.value.replaceAll(",","") * 0.453597315, 3);
		chkComma(formObj.grs_wgt,8,3);
	}
}
/*
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
/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
function weightChange(obj){
	var formObj=document.frm1;
	if(obj.name=="grs_wgt"){
		var rndXLValue=roundXL(formObj.grs_wgt.value.replaceAll(",","") / 0.453597315, 3);
		formObj.grs_wgt1.value=rndXLValue;
		//formObj.mk_grs_wgt1.value = doMoneyFmt(Number(rndXLValue).toFixed(0));
		//formObj.mk_grs_wgt.value = formObj.grs_wgt.value;
		//formObj.act_wgt1.value = roundXL(formObj.grs_wgt.value / 0.453597315, 0);
		//formObj.act_wgt.value = formObj.grs_wgt.value;
		chkComma(formObj.grs_wgt1, 8, 3);
		//chkComma(formObj.mk_grs_wgt1, 8, 2);
		//chkComma(formObj.mk_grs_wgt, 8, 3);
	}
	else if(obj.name=="grs_wgt1"){
		var rndXLValue=roundXL(formObj.grs_wgt1.value.replaceAll(",","") * 0.453597315, 3);
		formObj.grs_wgt.value=rndXLValue;
		//formObj.mk_grs_wgt.value = rndXLValue;
		//formObj.mk_grs_wgt1.value = formObj.grs_wgt1.value;
		//formObj.act_wgt.value = roundXL(formObj.grs_wgt1.value * 0.453597315, 0);
		//formObj.act_wgt1.value = formObj.grs_wgt1.value;
		chkComma(formObj.grs_wgt, 8, 3);
		//chkComma(formObj.mk_grs_wgt, 8, 3);
		//chkComma(formObj.mk_grs_wgt1, 8, 2);
	}
	/*
	if(obj.name=="act_wgt"){
		formObj.act_wgt1.value=roundXL(formObj.act_wgt.value / 0.453597315, 0);
	}else if(obj.name=="act_wgt1"){
		formObj.act_wgt.value=roundXL(formObj.act_wgt1.value * 0.453597315, 0);
	}
	*/
	/*
	if(obj.name=="mk_grs_wgt"){
		formObj.mk_grs_wgt1.value=roundXL(formObj.mk_grs_wgt.value.replaceAll(",","") / 0.453597315, 2);
		chkComma(formObj.mk_grs_wgt1,8,2);
	}else if(obj.name=="mk_grs_wgt1"){
		formObj.mk_grs_wgt.value=roundXL(formObj.mk_grs_wgt1.value.replaceAll(",","") * 0.453597315, 2);
		chkComma(formObj.mk_grs_wgt,8,2);
	}
	*/
}
/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
function cbmChange(obj){
	var formObj=document.frm1;
	if(obj.name=="meas"){
		var rndXLValue=roundXL(formObj.meas.value.replaceAll(",", "") * 35.3165, 0);
		// #27534
		formObj.meas1.value=doMoneyFmt(Number(rndXLValue).toFixed(0));
		//formObj.mk_meas1.value = rndXLValue;
		//formObj.mk_meas.value = formObj.meas.value.replaceAll(",", "");
		//chkComma(formObj.meas1, 8, 3);
		//chkComma(formObj.mk_meas1, 8, 3);
		//chkComma(formObj.mk_meas, 8, 3);
	}
	// CFT ==> CBM 기능  
	else if(obj.name=="meas1"){
		var rndXLValue=roundXL(formObj.meas1.value.replaceAll(",", "") / 35.3165, 3);
		formObj.meas.value=rndXLValue;
		//formObj.mk_meas.value = rndXLValue;
		//formObj.mk_meas1.value = formObj.meas1.value;
		chkComma(formObj.meas, 8, 3);
		//chkComma(formObj.mk_meas, 8, 3);
		//chkComma(formObj.mk_meas1, 8, 3);
	}
	/*
	if(obj.name=="mk_meas"){
		formObj.mk_meas1.value=roundXL(formObj.mk_meas.value.replaceAll(",","") * 35.3165, 3);
		chkComma(formObj.mk_meas1,8,3);
	}else if(obj.name=="mk_meas1"){
		formObj.mk_meas.value=roundXL(formObj.mk_meas1.value.replaceAll(",","") / 35.3165, 3);
		chkComma(formObj.mk_meas,8,3);
	}
	*/
	//amountChange(frm1.agent_rt);
	//amountChange(frm1.cust_rt);
}
/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
function amountChange(obj){
	var formObj=document.frm1;
	//Selling/Buying Amount 계산시 R/T(G.WT/1000) 과 CBM 비교하여 값이 큰 것으로 계산한다.
	var grsWgtKg=formObj.grs_wgt.value.replaceAll(",","");
	var retWgt=roundXL(grsWgtKg / 1000, 3);
	var cbm=formObj.meas.value.replaceAll(",","");
	var volume=0;
	if(retWgt - cbm > 0){
		volume=retWgt;
	}else{
		volume=cbm;
	}
	if(obj.name=="agent_rt"){		
		if(formObj.agent_rt.value!=''){
			if(formObj.agent_curr_cd.value=="KRW"){
				formObj.agent_amt.value=roundXL(formObj.agent_rt.value.replaceAll(",","") * (volume<1 ? 1 : volume), 0);
				numberCommaLen(formObj.agent_amt, 8, 0);
			}else{
				if(volume<1){
					volume=1;
				}
				var curSum=getMultiplyFloat(formObj.agent_rt.value.replaceAll(",",""),  volume);
			    curSum=strToFloatByNDecimalTp(curSum, TP_TRM3);
			    if(curSum>9999999999999.99){
			    	alert(getLabel('FMS_COM_ALT002'));
			    	formObj.agent_rt.value=0;
			    	formObj.agent_amt.value=0;
			    	formObj.agent_rt.focus();
			    	return;
			    }
				formObj.agent_amt.value=curSum;
				chkComma(formObj.agent_amt, 8, 2);
			}			
		}
		//chkComma(formObj.agent_amt,8,2);
	}else if(obj.name=="cust_rt"){
		if(formObj.cust_rt.value!=''){
			if(formObj.cust_curr_cd.value=="KRW"){
				formObj.cust_amt.value=roundXL(formObj.cust_rt.value.replaceAll(",","") * (volume<1 ? 1 : volume), 0);
				numberCommaLen(formObj.cust_amt, 8, 0);
			}else{
				if(volume<1){
					volume=1;
				}
				var curSum=getMultiplyFloat(formObj.cust_rt.value.replaceAll(",",""),  volume);
			    curSum=strToFloatByNDecimalTp(curSum, TP_TRM3);
			    if(curSum>9999999999999.99){
			    	alert(getLabel('FMS_COM_ALT002'));
			    	formObj.cust_rt.value=0;
			    	formObj.cust_amt.value=0;
			    	formObj.cust_rt.focus();
			    	return;
			    }
				formObj.cust_amt.value=curSum;
				chkComma(formObj.cust_amt,8,2);
			}
			//chkComma(formObj.cust_amt,8,2);			
		}
	}
	if(obj.name=="agent_amt"){
		if(formObj.agent_curr_cd.value=="KRW"){
			numberCommaLen(formObj.agent_amt, 8, 0);
		}else{
			chkComma(formObj.agent_amt,8,2);
		}
	}else if(obj.name=="cust_amt"){
		if(formObj.cust_curr_cd.value=="KRW"){
			numberCommaLen(formObj.cust_amt, 8, 0);
		}else{
			chkComma(formObj.cust_amt,8,2);
		}
	}
}
/**
 * Master Container 조회팝업
 */
function getMasterCntrList(){
	/*
	 *  AJAX로 Master의 컨테이너를 전부 가져와서 ADD 하도록 변경
	 */
	if(frm1.ref_no.value==''){
		//There is no Ref No.
		//alert(getLabel('FMS_COM_ALT010') + " - " + getLabel('FMS_COD_REFN'));
		//return;
		cntrGridAdd(docObjects[1]);
	}else{
		if(docObjects[1].GetCellValue(1, "cntr_no")==''){
			docObjects[1].RemoveAll();
		}
		 /* jsjang 2013.7.5 
		  * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 start */ 
		//ajaxSendPost(getMasterCntr, 'reqVal', '&goWhere=aj&bcKey=getMasterCntr&f_ref_no='+frm1.ref_no.value+, './GateServlet.gsl');
		ajaxSendPost(getMasterCntr, 'reqVal', '&goWhere=aj&bcKey=getMasterCntr&f_ref_no='+frm1.ref_no.value+'&f_intg_bl_seq='+frm1.intg_bl_seq.value+'&f_rlt_intg_bl_seq='+frm1.rlt_intg_bl_seq.value, './GateServlet.gsl');	//[20130822  ojg] rlt_intg_bl_seq파라미터추가
		 /* jsjang 2013.7.5 
		  * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end */ 		
	}
//	rtnary = new Array(1);
//	if(frm1.ref_no.value!=""){
//		rtnary[0] = frm1.ref_no.value;
//	}else{
//		return;
//	}
//
//	var rtnVal = window.showModalDialog('./SEE_BMD_0029.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:650px;dialogHeight:480px");
//	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
//		return;
//
//	}else{
//		var rtnRows = rtnVal.split("|");
//		var rtnLen = rtnRows.length;
//		rtnLen--;
//		var intRows = docObjects[1].LastRow() + 1;
//		if(docObjects[1].CellValue(1, 'cntr_no')==''){
//			intRows--;
//		}
//		for(var i = 0; i < rtnLen; i++){
//			var cntrInfo = rtnRows[i].split(",");
////			if(checkCntrNo(cntrInfo[0])){
//				docObjects[1].DataInsert(intRows);
//				docObjects[1].CellValue(intRows, 'cntr_no')           = cntrInfo[0];
//				docObjects[1].CellValue(intRows, 'soc_flg')           = cntrInfo[1];
//				docObjects[1].CellValue(intRows, 'cntr_tpsz_cd')      = cntrInfo[2];
//				docObjects[1].CellValue(intRows, 'cntr_sprl_trdp_cd') = cntrInfo[3];
//				docObjects[1].CellValue(intRows, 'cntr_sprl_trdp_nm') = cntrInfo[4];
//				docObjects[1].CellValue(intRows, 'seal_no1') 		  = cntrInfo[5];
//				docObjects[1].CellValue(intRows, 'rgst_cntr_yn')      = 'Y';
//
//				docObjects[1].CellValue(intRows, 'cgo_pck_qty') 	  = cntrInfo[6];
//				docObjects[1].CellValue(intRows, 'cgo_pck_ut') 		  = cntrInfo[7];
//
//				docObjects[1].CellValue2(intRows, 'cgo_wgt') 		  = cntrInfo[8];
//				docObjects[1].CellValue2(intRows, 'cgo_wgt1') 		  = cntrInfo[9];
//				docObjects[1].CellValue2(intRows, 'cgo_meas') 		  = cntrInfo[10];
//				docObjects[1].CellValue2(intRows, 'cgo_meas1') 		  = cntrInfo[11];
//				docObjects[1].CellValue2(intRows, 'vol_meas') 		  = cntrInfo[12];
//				intRows++;
////			}else{
////				alert('Container No.['+cntrInfo[0]+']is already registered.');
////			}
//		}
//	}
}
function getMasterCntr(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpList=doc[1].split("@;;@");
			var intRows=docObjects[1].LastRow() + 1;
			if(docObjects[1].GetCellValue(1, 'cntr_no')==''){
				intRows--;
			}
			var addCnt=0;
			for(var i=0 ; i<tmpList.length-1 ; i++){
				var tmp=tmpList[i].split("@^^@");
				if(checkAddCntrNo(tmp[0])){
					docObjects[1].DataInsert(intRows);
					docObjects[1].SetCellValue(intRows, 'cntr_no',tmp[0]);
					docObjects[1].SetCellValue(intRows, 'cntr_tpsz_cd',(tmp[1]== "null"?"":tmp[1]));
					docObjects[1].SetCellValue(intRows, 'seal_no1',(tmp[2]== "null"?"":tmp[2]));
					 /* jsjang 2013.7.5 
					  * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 start */ 
					if(tmp[10] != null && tmp[10] != '' && tmp[10] == 'FCL')
					{
						docObjects[1].SetCellValue(intRows, 'cgo_pck_qty',tmp[3]);
						docObjects[1].SetCellValue(intRows, 'cgo_pck_ut',tmp[4]);
						docObjects[1].SetCellValue(intRows, 'cgo_wgt',tmp[5]);
						docObjects[1].SetCellValue(intRows, 'cgo_wgt1',tmp[6]);
						docObjects[1].SetCellValue(intRows, 'cgo_meas',tmp[7]);
						docObjects[1].SetCellValue(intRows, 'cgo_meas1',tmp[8]);
					}
					 /* jsjang 2013.7.5 
					  * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end */ 
					docObjects[1].SetCellValue(intRows, 'seal_no2',(tmp[9]== "null"?"":tmp[9]));
					/* #20419 [BINEX] MLB/IPI 건들 2nd Arrival Notice (Final DSTN) jsjang 2013.9.11 - dg, remark, pickup, lfd hbl 자동연계 */
					docObjects[1].SetCellValue(intRows, 'dg_gds_flg',tmp[11]);
					docObjects[1].SetCellValue(intRows, 'cntr_rmk',(tmp[12]== "null"?"":tmp[12]));
					docObjects[1].SetCellValue(intRows, 'pickup_number',(tmp[13]== "null"?"":tmp[13]));
					docObjects[1].SetCellValue(intRows, 'lfd',(tmp[14]== "null"?"":tmp[14]));
					docObjects[1].SetCellValue(intRows, 'cntr_go_date',(tmp[15]== "null"?"":tmp[15]));
					    //dg_gds_flg, cntr_rmk, pickup_number, lfd
					intRows++;
					addCnt++;
				}
			}
 			for(var i=1; i<=docObjects[1].LastRow() + 1 ; i++){
				docObjects[1].SetCellValue(i, 'Seq',i);
			}
			if(addCnt == 0){
				//alert(getLabel('msg.....')
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
/**
 * 26239
 * Filing No(Ref_NO)로 Container 조회
 */
function getRefCntrList(){
	/*
	 * AJAX로 변경 Filing(Ref_NO)의 컨테이너를 전부 가져와서 ADD 하도록 변경
	 */
	if(frm1.ref_no.value==''){
		// There is no Ref No.
		alert(getLabel('FMS_COM_ALT010') + " - " + getLabel('FMS_COD_REFN'));
		return;
	}else{
		sheetObj=docObjects[1];
 		for (var i=1; i<sheetObj.LastRow() + 1  ; i++) {		
 			if (sheetObj.GetCellValue(i, 'conls_ibflag') != 'I') {
				sheetObj.SetCellValue(i, 'conls_ibflag','D');
				sheetObj.SetRowHidden(i,1);
			} else {
				sheetObj.RowDelete(i, false);
				i--;
			}
		}
		ajaxSendPost(getRefCntr, 'reqVal', '&goWhere=aj&bcKey=getRefCntr&f_ref_no='+frm1.ref_no.value, './GateServlet.gsl');
	}
	// Cntr Sheet를 조회했으므로 Ctnr탭의 재조회를 방지하기 위해 TabClick를 Y로 업데이트 한다.
	tab2click="Y";
}
//26239
function getRefCntr(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpList=doc[1].split("@;;@");
 			var intRows=docObjects[1].LastRow() + 1;
 			if(docObjects[1].GetCellValue(1, 'cntr_no')==''){
				intRows--;
			}
			var addCnt=0;
			for(var i=0 ; i<tmpList.length-1 ; i++){
				var tmp=tmpList[i].split("@^^@");
				//삭제후 추가 이므로 checkAddCntrNo 함수 호출을 하지 않는다.
				//if(checkAddCntrNo(tmp[0])){
					docObjects[1].DataInsert(intRows);
					docObjects[1].SetCellValue(intRows, 'cntr_no',tmp[0]);
					docObjects[1].SetCellValue(intRows, 'cntr_tpsz_cd',(tmp[1]== "null"?"":tmp[1]));
					docObjects[1].SetCellValue(intRows, 'seal_no1',(tmp[2]== "null"?"":tmp[2]));
					 /* jsjang 2013.7.5 
					  * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 start */ 
					if(tmp[10] != null && tmp[10] != '' && tmp[10] == 'FCL')
					{
						docObjects[1].SetCellValue(intRows, 'cgo_pck_qty',tmp[3]);
						docObjects[1].SetCellValue(intRows, 'cgo_pck_ut',tmp[4]);
						docObjects[1].SetCellValue(intRows, 'cgo_wgt',tmp[5]);
						docObjects[1].SetCellValue(intRows, 'cgo_wgt1',tmp[6]);
						docObjects[1].SetCellValue(intRows, 'cgo_meas',tmp[7]);
						docObjects[1].SetCellValue(intRows, 'cgo_meas1',tmp[8]);
					}
					 /* jsjang 2013.7.5 
					  * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end */ 
					docObjects[1].SetCellValue(intRows, 'seal_no2',(tmp[9]== "null"?"":tmp[9]));
					/* #20419 [BINEX] MLB/IPI 건들 2nd Arrival Notice (Final DSTN) jsjang 2013.9.11 - dg, remark, pickup, lfd hbl 자동연계 */
					docObjects[1].SetCellValue(intRows, 'dg_gds_flg',tmp[11]);
					docObjects[1].SetCellValue(intRows, 'cntr_rmk',(tmp[12]== "null"?"":tmp[12]));
					docObjects[1].SetCellValue(intRows, 'pickup_number',(tmp[13]== "null"?"":tmp[13]));
					docObjects[1].SetCellValue(intRows, 'lfd',(tmp[14]== "null"?"":tmp[14]));
					docObjects[1].SetCellValue(intRows, 'cntr_go_date',(tmp[15]== "null"?"":tmp[15]));
					    //dg_gds_flg, cntr_rmk, pickup_number, lfd
					intRows++;
					addCnt++;
				//}
			}
			var hiddenCntrRow=0;
 			for(var i=1; i<=docObjects[1].LastRow() ; i++){
				if (docObjects[1].GetRowHidden(i)) {
					docObjects[1].SetCellValue(i, 'conls_ibflag','D');
					hiddenCntrRow++;
				}
			}
 			for(var i=1; i<=docObjects[1].LastRow() + 1 ; i++){
				docObjects[1].SetCellValue(i, 'Seq',i-hiddenCntrRow);
			}
			if(addCnt == 0){
				//alert(getLabel('msg.....')
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
	
	//if(docObjects[1].GetFocusAfterRowTransaction() == 0) {
	//	docObjects[1].SetFocusAfterRowTransaction(1);
	//}
	
	docObjects[1].SetBlur();	//IBSheet Focus out 처리
}
/**
* ADD 시에 Container번호 중복확인
*/
function checkAddCntrNo(inCntrNo){
 	var intRows=docObjects[1].LastRow() + 1;
	var loopNum=0;
	for(var i=1; i < intRows; i++){
		if(inCntrNo==docObjects[1].GetCellValue(i, 'cntr_no')){
			loopNum++;
		}
	}
	if(loopNum>0){
		return false;
	}else{
		return true;
	}
}
function checkRefNo(obj){
	if(frm1.ref_no.value!=""){
		ajaxSendPost(getRefNoInfo, 'reqVal', '&goWhere=aj&bcKey=getRefNoInfo&air_sea_clss_cd=S&bnd_clss_cd=I&ref_no='+frm1.ref_no.value, './GateServlet.gsl');
	}else{
		frm1.ref_no.value="";
		frm1.ref_ofc_cd.value="";
	}
}
function getRefNoInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var result=doc[1].split('^^');
			//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
			var cfmFlg=true;
			if(frm1.prnr_trdp_cd.value != ""){
				cfmFlg=confirm(getLabel('SEA_COM_ALT030'));
			}
			frm1.ref_ofc_cd.value=result[1];
			frm1.rlt_intg_bl_seq.value=result[2];
			frm1.mbl_no.value=result[3]; //master bl no
			frm1.trnk_vsl_nm.value=result[4]; //trnk_vsl_nm
			frm1.trnk_voy.value=result[5]; //trnk_voy
			frm1.lnr_trdp_cd.value=result[6]; //lnr_trdp_cd
			frm1.lnr_trdp_nm.value=result[7]; //lnr_trdp_nm
			frm1.pod_cd.value=result[8]; //pod_cd
			frm1.pod_nm.value=result[9]; //pod_nm
			frm1.pol_cd.value=result[10]; //pol_cd
			frm1.pol_nm.value=result[11]; //pol_nm
			frm1.obrd_dt_tm.value=modiStrDateType(result[12], 1); //obrd_dt_tm
			frm1.etd_dt_tm.value=modiStrDateType(result[12], 1); //etd_dt_tm
			frm1.eta_dt_tm.value=modiStrDateType(result[13], 1); //eta_dt_tm
			frm1.post_dt.value=modiStrDateType(result[51], 1); //eta_dt_tm
			//frm1.lnr_bkg_no.value 		= result[14]; //lnr_bkg_no
			// POR, DEL 추가 
			frm1.por_cd.value=result[18]; //por_cd
			frm1.por_nm.value=result[19]; //por_nm
			frm1.del_cd.value=result[20]; //del_cd
			frm1.del_nm.value=result[21]; //del_nm
			frm1.shp_mod_cd.value=result[22];
			frm1.it_no.value=result[27]; //it_no
			frm1.te_dt_tm.value=modiStrDateType(result[28], 1); //te_dt_tm
			frm1.it_loc.value=result[29]; //it_loc
			//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
			if(cfmFlg){
				frm1.prnr_trdp_cd.value=result[34];
				frm1.prnr_trdp_nm.value=result[35];
				frm1.prnr_trdp_addr.value=result[36];
			}
			frm1.sub_bl_no.value=result[39];
			if(result[30]==''){
				frm1.cfs_trdp_cd.value=result[40]; //cy_nod_cd
				frm1.cfs_trdp_nm.value=result[41]; //cy_loc_nm
			}else{
				frm1.cfs_trdp_cd.value=result[30]; //cfs_nod_cd
				frm1.cfs_trdp_nm.value=result[31]; //cfs_loc_nm
			}
			if(result[50]!=''){
				frm1.d_eta_dt_tm.value=modiStrDateType(result[50], 1); //f_eta_dt_tm
				frm1.f_eta_dt_tm.value=modiStrDateType(result[50], 1); //f_eta_dt_tm
				frm1.post_dt.value=modiStrDateType(result[51], 1); //f_eta_dt_tm
			}
			frm1.fm_svc_term_cd.value=result[32];
			frm1.to_svc_term_cd.value=result[33];
			//----[20130924 OJG] #20974----------
			frm1.fnl_dest_loc_cd.value=result[61]; //fnl_dest_loc_cd
			frm1.fnl_dest_loc_nm.value=result[62]; //fnl_dest_loc_nm
			//----[20130924 OJG]----------
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End  */ 
			if(result[56] != null && result[56] != '' && result[56] == 'DR')
			{
				frm1.hbl_tp_cd.value=result[56]; //hbl_tp_cd
				//frm1.mrn.value					= result[57]; //mrn
				frm1.ntfy_trdp_cd.value=result[58]; //ntfy_trdp_cd
				frm1.ntfy_trdp_nm.value=result[59]; //ntfy_trdp_nm
				frm1.ntfy_trdp_addr.value=result[60]; //ntfy_trdp_addr
				//frm1.fnl_dest_loc_cd.value		= result[61]; //fnl_dest_loc_cd
				//frm1.fnl_dest_loc_nm.value		= result[62]; //fnl_dest_loc_nm
				frm1.profit_share.value=result[63]; //profit_share
				frm1.pck_qty.value=result[64]; //pck_qty
				frm1.pck_ut_cd.value=result[65]; //pck_ut_cd
				frm1.grs_wgt.value=result[66]; //grs_wgt
				frm1.grs_wgt1.value=result[67]; //grs_wgt1
				frm1.meas.value=result[68]; //meas
				frm1.meas1.value=result[69]; //meas1
				frm1.bl_iss_dt.value=result[70]; //bl_iss_dt
				frm1.shpr_trdp_cd.value=result[34]; //shpr_trdp_cd
				frm1.shpr_trdp_nm.value=result[35]; //shpr_trdp_nm
				frm1.shpr_trdp_addr.value=result[36]; //shpr_trdp_addr
				frm1.cnee_trdp_cd.value=result[23]; //cnee_trdp_cd
				frm1.cnee_trdp_nm.value=result[24]; //cnee_trdp_nm
				frm1.cnee_trdp_addr.value=result[37]; //cnee_trdp_addr
				//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
				if(cfmFlg){
					frm1.prnr_trdp_cd.value=result[71]; //prnr_trdp_cd
					frm1.prnr_trdp_nm.value=result[72]; //prnr_trdp_nm
					frm1.prnr_trdp_addr.value=result[73]; //prnr_trdp_addr	
				}	
				frm1.frt_term_cd.value=result[74];//freight, bl.FRT_TERM_CD
				frm1.shp_mod_cd.value=result[75];//ship mode, bl.shp_mod_cd
				frm1.express_tp_cd.value=result[76];//express B/L, bl.express_tp_cd
				//frm1.rlsd_flg.value 			= result[77];//released, bl.rlsd_flg
				if(result[77]=="Y"){
					frm1.rlsd_flg.checked=true;
				}else{
					frm1.rlsd_flg.checked=false;
				}				
				frm1.rlsd_dt_tm.value=result[78];//released date, bl.
			}
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End  */ 			
			frm1.pre_ccn_no.value=result[98];//#24620 ccn 
			frm1.mnf_fr_loc.value=result[99];//#24620 ccn 
			frm1.mnf_to_loc.value=result[100];//#24620 ccn 
			
			//#44406 BL Serial(Impex 전용, Office 설정화면에서 Use B/L Serial에 Check되어있는 경우만  사용)
			if (frm1.use_hbl_ser.value == 'Y') {
				//frm1.hbl_ser_pfx.value=result[103];//44406 BL Serial 
				frm1.hbl_ser_no.value=result[104];//44406 BL Serial 
			}
			
			shipModeChange();
			
			//26239 cntr sheet를 초기화한다.			
			getRefCntrList();			
			//getMasterCntrList();//[20130822 OJG]
			
			//42688 PWC(Packge,Weight,CBM) Change
			changePWC(result);
		}else{
			frm1.ref_no.value='';
			frm1.ref_ofc_cd.value='';
			frm1.rlt_intg_bl_seq.value='';
			frm1.mbl_no.value='';
			frm1.trnk_vsl_nm.value='';
			frm1.trnk_voy.value='';
			frm1.lnr_trdp_cd.value='';
			frm1.lnr_trdp_nm.value='';
			frm1.pod_cd.value='';
			frm1.pod_nm.value='';
			frm1.pol_cd.value='';
			frm1.pol_nm.value='';
			frm1.del_cd.value=''; //del_cd
			frm1.del_nm.value=''; //del_nm
			frm1.obrd_dt_tm.value='';
			frm1.etd_dt_tm.value='';
			frm1.eta_dt_tm.value='';
			//frm1.lnr_bkg_no.value 		= '';
			frm1.shp_mod_cd.value='';
			frm1.it_no.value='';
			frm1.te_dt_tm.value='';
			frm1.it_loc.value='';
//			frm1.cfs_loc_cd.value 		= '';
//			frm1.cfs_loc_nm.value 		= '';
			frm1.prnr_trdp_cd.value='';
			frm1.prnr_trdp_nm.value='';
			frm1.prnr_trdp_addr.value='';
			frm1.sub_bl_no.value='';
			frm1.cfs_trdp_cd.value='';
			frm1.cfs_trdp_nm.value='';
			frm1.f_eta_dt_tm.value='';
			frm1.fm_svc_term_cd.value='';
			frm1.to_svc_term_cd.value='';
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 Start  */ 
			frm1.hbl_tp_cd.value='';
			//frm1.mrn.value					= '';
			frm1.ntfy_trdp_cd.value='';
			frm1.ntfy_trdp_nm.value='';
			frm1.ntfy_trdp_addr.value='';
			frm1.fnl_dest_loc_cd.value='';
			frm1.fnl_dest_loc_nm.value='';
			frm1.profit_share.value='';
			frm1.pck_qty.value='';
			frm1.pck_ut_cd.value='';
			frm1.grs_wgt.value='';
			frm1.grs_wgt1.value='';
			frm1.meas.value='';
			frm1.meas1.value='';
			frm1.bl_iss_dt.value='';	
			frm1.frt_term_cd.value='';//freight
			frm1.shp_mod_cd.value='';//ship mode
			frm1.express_tp_cd.value='';//express B/L
			frm1.rlsd_flg.checked=false; //released
			frm1.rlsd_dt_tm.value='';//released date			
			
			//#44406 BL Serial(Impex 전용, Office 설정화면에서 Use B/L Serial에 Check되어있는 경우만  사용)
			if (frm1.use_hbl_ser.value == 'Y') {
				//frm1.hbl_ser_pfx.value='';//44406 BL Serial 
				frm1.hbl_ser_no.value='';//44406 BL Serial 
			}
			
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End  */		
			docObjects[2].RemoveAll();	//[20130822 OJG]
		}
		
		// Contribution Margin 조회
		if (frm1.act_shpr_trdp_cd.value != ""){
			setCtrbMgn(frm1.act_shpr_trdp_cd.value);
		}
	}else{
	}
}

// 44406 BL SERIAL NO 중복 체크
function checkHblSer() {
	frm1.hbl_ser_no.value = trim(frm1.hbl_ser_no.value);
	if (frm1.hbl_ser_no.value == ""){
		alert(getLabel('FMS_COM_ALT001'));
		frm1.hbl_ser_no.focus();
	}
	
//	checkHblSerNo();
//	if (hbl_ser_dupl){
//		alert(getLabel('FMS_COM_ALT072'));
//		moveTab('01');
//		frm1.hbl_ser_no.focus();
//		isOk=false;
//	}
}

//44406
function checkHblSerNo() {
	if (frm1.use_hbl_ser.value == 'Y') {
		if(frm1.hbl_ser_no.value!=""){
			ajaxSendPost(getHblSerNoInfo, 'reqVal', '&goWhere=aj&bcKey=checkHblSerialNo&hbl_ser_no='+frm1.hbl_ser_no.value+'&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
		}else{
			alert(getLabel('FMS_COM_ALT001'));
			frm1.hbl_ser_no.focus();
			return false;
		}
	}
}

//44406
function getHblSerNoInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	hbl_ser_dupl=false;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			if (doc[1] == "ERR"){
				hbl_ser_dupl=true;
				return;
			}
		} else {
			hbl_ser_dupl=false;
		}
	}
	hbl_ser_dupl=false;
}

function sheet14_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj,'dc_', 'S', 'I', 'H');
	}	
}
function sheet14_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
}
/**
 * Freight B/C 처리
 */
function sheet14_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'I', 'H');
}
/**
 * Freight B/C 처리
 */
function sheet14_OnClick(sheetObj, row, col){
	mutiSheetOnClick(sheetObj, row, col, 'dc_', 'S', 'I', 'H');
}
/**
 * Freight B/C 처리
 * Type/Size에 따른 Volume(수량) 체크
 */
function sheet14_OnChange(sheetObj, row, col, value) {
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
	mutiSheetOnChange(sheetObj, row, col,  'dc_', 'S', 'I', 'H');
}
function sheet14_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'dc_');
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
 			for(var i=headerRowCnt; i < sheetObj.LastRow() + 1 ; i++){
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
			param += "&f_biz_clss_cd=H";
			param += "&f_bnd_clss_cd=I";
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
			var chk_fr_trdp_cd="";
			var chk_fr_trdp_nm="";
			var chk_fr_inv_curr_cd="";
			var chk_fr_frt_seq="";
 			for(var i=headerRowCnt; i < sheetObj.LastRow() + 1 ; i++){
 				if(sheetObj.GetCellValue(i, "b_fr_frt_check") == 1){
 					chk_fr_trdp_cd=sheetObj.GetCellValue(i, 'b_fr_trdp_cd');
 					chk_fr_trdp_nm=sheetObj.GetCellValue(i, 'b_fr_trdp_nm');
 					chk_fr_inv_curr_cd=sheetObj.GetCellValue(i, 'b_fr_inv_curr_cd');
					if(chkCnt > 0){
						chk_fr_frt_seq += ',';
					}
					chk_fr_frt_seq		+= 	sheetObj.GetCellValue(i, 'b_fr_frt_seq');
					chkCnt++;
				}
			}
			var param="&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
			param += "&s_bl_no=" + formObj.bl_no.value;
			param += "&f_bl_no=" + formObj.bl_no.value;
			param += "&f_air_sea_clss_cd=S";
			param += "&f_biz_clss_cd=H";
			param += "&f_bnd_clss_cd=I";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
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
 			for(var i=headerRowCnt; i < sheetObj.LastRow() + 1 ; i++){
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
			param += "&f_biz_clss_cd=H";
			param += "&f_bnd_clss_cd=I";
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
	var dcObj=docObjects[9];
	switch(obj){
		case "LOCAL":
if(arObj.GetCellValue(arObj.GetSelectRow(), "fr_inv_seq")!=""){
var param="&f_inv_seq=" + arObj.GetCellValue(arObj.GetSelectRow(), "fr_inv_seq");
//				param += "&f_inv_no=" + arObj.CellValue(arObj.SelectRow, "fr_inv_no");
				var paramStr="./ACC_INV_0010.clt?f_cmd="+param;
				parent.mkNewFrame('A/R Entry', paramStr);
			}else{
			}
		break;
		case "AP":
if(apObj.GetCellValue(apObj.GetSelectRow(), "b_fr_inv_seq")!=""){
var param="&f_inv_seq=" + apObj.GetCellValue(apObj.GetSelectRow(), "b_fr_inv_seq");
//				param += "&f_inv_no=" + apObj.CellValue(apObj.SelectRow, "b_fr_inv_no");
				var paramStr="./ACC_INV_0030.clt?f_cmd="+param;
				parent.mkNewFrame('A/P Entry(Cost)', paramStr);
			}else{
			}
		break;
		case "DC":
if(dcObj.GetCellValue(dcObj.GetSelectRow(), "dc_fr_inv_seq")!=""){
var param="&f_inv_seq=" + dcObj.GetCellValue(dcObj.GetSelectRow(), "dc_fr_inv_seq");
//				param += "&f_inv_no=" + dcObj.CellValue(dcObj.SelectRow, "dc_fr_inv_no");
				var paramStr="./ACC_INV_0020.clt?f_cmd="+param;
				parent.mkNewFrame('D/C Note Entry', paramStr);
			}else{
			}
		break;
	}
}
function sheet15_OnPopupClick(sheetObj, row, col){
	switch (sheetObj.ColSaveName(col)) {
		case "frt_cd":
			rtnary=new Array(1);
	   		rtnary[0]="2";
	   		rtnary[1]="S";	//air_sea_clss_cd
	   		rtnary[2]="I";	//bnd_clss_cd
	   		rtnary[3]="H";	//biz_clss_cd
	   		rtnary[4]="";		//tabStr
			var rtnVal =  ComOpenWindow('./CMM_POP_0070.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px" , true);
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				sheetObj.SetCellValue(row, "frt_cd",rtnValAry[0]);
				sheetObj.SetCellValue(row, "frt_cd_nm",rtnValAry[1]);
				//기존 입력값 초기화
				sheetObj.SetCellValue(row, "an_frt_term_cd",'PP');
				sheetObj.SetCellValue(row, "amt",'');
			}
		break;
	}
}
function selectAnList(obj, prefix){
	var sheetObj=obj;
	for(var i=2 ; i<sheetObj.LastRow() + 1  ; i++){
if(sheetObj.GetCellValue(i, prefix+"fr_frt_check")=="1"){
			gridAdd(10);
			var tmpSheetObj=docObjects[10];
 			var tmpCnt=docObjects[10].LastRow() ;
			tmpSheetObj.SetCellValue(tmpCnt, "frt_cd",sheetObj.GetCellValue(i, prefix+"fr_frt_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "frt_cd_nm",sheetObj.GetCellValue(i, prefix+"fr_frt_cd_nm"));
			tmpSheetObj.SetCellValue(tmpCnt, "descr",sheetObj.GetCellValue(i, prefix+"fr_frt_cd_nm"));
			tmpSheetObj.SetCellValue(tmpCnt, "an_frt_term_cd",sheetObj.GetCellValue(i, prefix+"fr_frt_term_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "amt",sheetObj.GetCellValue(i, prefix+"fr_inv_sum_amt"));
			if(sheetObj.GetCellValue(i, prefix+"fr_inv_no")!=""){
			frm1.an_inv_no.value=sheetObj.GetCellValue(i, prefix+"fr_inv_no");
			frm1.an_curr_cd.value=sheetObj.GetCellValue(i, prefix+"fr_inv_curr_cd");
			frm1.an_due_dt.value=modiStrDateType(sheetObj.GetCellValue(i, prefix+"fr_inv_due_dt"), 1);
			}
		}
	}
	for(var j=2 ; j<sheetObj.LastRow() + 1  ; j++){
		sheetObj.SetCellValue(j, prefix+"fr_frt_check","0",0);
	}
}
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
function checkTrdpCode(obj){
	if(obj.name=="prnr_trdp_nm"){
	}else if(obj.name=="shpr_trdp_nm"){
		if(frm1.shpr_trdp_cd.value==""){
			frm1.shpr_trdp_addr.value=obj.value;
		}
	}else if(obj.name=="cnee_trdp_nm"){
		if(frm1.cnee_trdp_cd.value==""){
			frm1.cnee_trdp_addr.value=obj.value;
		}
	}else if(obj.name=="ntfy_trdp_nm"){
		if(frm1.ntfy_trdp_cd.value==""){
			frm1.ntfy_trdp_addr.value=obj.value;
		}
	}else if(obj.name=="act_shpr_trdp_nm"){
		if(frm1.act_shpr_trdp_cd.value==""){
			frm1.act_shp_info.value=obj.value;
		}
	}else if(obj.name=="cust_trdp_nm"){
		if(frm1.cust_trdp_cd.value==""){
			frm1.cust_trdp_addr.value=obj.value;
		}
	}else if(obj.name=="lnr_trdp_nm"){
	}else if(obj.name=="carr_trdp_nm"){
	}else if(obj.name=="prnr_trdp_nm2"){
	}else if(obj.name=="iss_trdp_nm"){
	}else if(obj.name=="third_trdp_nm"){
	}
}
function sheet15_OnChange(sheetObj, row, col, value){
	var colName=sheetObj.ColSaveName(col);
	switch(colName){
		case "frt_cd":
			var codeStr=sheetObj.GetCellValue(row, 'frt_cd');
			if(codeStr.length>1){
				//결과를 표시할 Col을 초기화함
				sheetObj.SetCellValue(row, 'frt_cd_nm','',0);
			    //param setting
			    var param='&air_sea_clss_cd=' + 'S';
				param += '&bnd_clss_cd=' + 'I';
				param += '&biz_clss_cd=' + 'H';
				doAutoSearch(sheetObj, row, 'frt_cd', 'freight', codeStr, 'frt_cd', 'frt_cd_nm', param);
			}else{
				//The code is not enough to search
				alert(getLabel('FMS_COM_ALT014'));
				sheetObj.SelectCell(row, objPfx+'fr_frt_cd');
			}
			break;
		case "amt":
			var sum=0;
			for(var i=1 ; i<sheetObj.LastRow() + 1  ; i++){
				sum += parseFloat(sheetObj.GetCellValue(i, "amt"));
			}
			frm1.an_total_amt.value=roundXL(sum, 2);
			break;
	}
}
function sheet15_OnSearchEnd(sheetObj, row, col){
	var sum=0;
	for(var i=1 ; i<sheetObj.LastRow() + 1  ; i++){
		sum += parseFloat(sheetObj.GetCellValue(i, "amt"));
	}
	frm1.an_total_amt.value=roundXL(sum, 2);
}

//User Defined Field
function sheet17_OnChange(sheetObj, row, col, value) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "udf_cd"){
		for(var i=1; i<=sheetObj.LastRow(); i++){
			if(i != row){
					if(sheetObj.GetCellValue(i,"udf_cd") == sheetObj.GetCellValue(row,"udf_cd")){
					//Duplication Task 
					alert(getLabel('FMS_COM_ALT008'));
					sheetObj.SetCellValue(row,"udf_cd","");
				}
			}
		}
	}
}


function cbCheck(){
	if(frm1.cnee_trdp_cd.value!=''){
		ajaxSendPost(getCbList, 'reqVal', '&goWhere=aj&bcKey=getCbList&trdp_cd='+frm1.cnee_trdp_cd.value, './GateServlet.gsl');
	}
}
function getCbList(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpVal=doc[1].split("^^;");
			if(tmpVal.length<2){
			}else if(tmpVal.length==2){
				//Customs Broker가 하나 밖에 없으므로 바로 셋팅
				var resultVal=tmpVal[0].split("@@^");
				frm1.cust_trdp_cd.value=resultVal[3];
				frm1.cust_trdp_nm.value=resultVal[4];
				frm1.cust_trdp_addr.value=resultVal[5];
				
				trCheck();
				
			}else if(tmpVal.length>2){
				//Customs Broker가 2개 이상이면 팝업으로 조회함
				rtnary=new Array(1);
		   		rtnary[0]=doc[1];
		   		rtnary[1]="Customs Broker"; //set Popup title
		   		
		   		callBackFunc = "getCbList_callBackFunc";
		   	    modal_center_open('./CMM_POP_0340.clt', rtnary, 350,270,"yes");
			}
			for(var i=0 ; i<tmpVal.length-1 ; i++){
//				alert(tmpVal[i]);
			}
		} else {
			trCheck();
		}	
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

function getCbList_callBackFunc(rtnVal){
   	if(!(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined)) {
		var rtnValAry=rtnVal.split("|");
		frm1.cust_trdp_cd.value=rtnValAry[2];
		frm1.cust_trdp_nm.value=rtnValAry[3];
		frm1.cust_trdp_addr.value=rtnValAry[4];
	}
//   	trCheck();
	// IE Debug시 Error 발생하여 처리
    setTimeout("trCheck()",500);
}

function trCheck(){
	if(frm1.cnee_trdp_cd.value!=''){
		ajaxSendPost(getTrList, 'reqVal', '&goWhere=aj&bcKey=getTrList&trdp_cd='+frm1.cnee_trdp_cd.value, './GateServlet.gsl');
	}
}
function getTrList(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpVal=doc[1].split("^^;");
			if(tmpVal.length<2){
			}else if(tmpVal.length==2){
				//Customs Broker가 하나 밖에 없으므로 바로 셋팅
				var resultVal=tmpVal[0].split("@@^");
				frm1.trk_trdp_cd.value=resultVal[3];
				frm1.trk_trdp_nm.value=resultVal[4];
				frm1.trk_trdp_addr.value=resultVal[5];
				
				doCheck();
				
			}else if(tmpVal.length>2){
				//Customs Broker가 2개 이상이면 팝업으로 조회함
				rtnary=new Array(1);
		   		rtnary[0]=doc[1];
		   		rtnary[1]="Trucker";	//set Popup title
		   		callBackFunc = "getTrList_callBackFunc";
		   	    modal_center_open('./CMM_POP_0340.clt', rtnary, 350,270,"yes");
			}
		} else {
			doCheck();
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

function getTrList_callBackFunc(rtnVal){
   	if(!(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined)){
		var rtnValAry=rtnVal.split("|");
		frm1.trk_trdp_cd.value=rtnValAry[2];
		frm1.trk_trdp_nm.value=rtnValAry[3];
		frm1.trk_trdp_addr.value=rtnValAry[4];
	}
   	//doCheck();
   	// IE Debug시 Error 발생하여 처리
   	setTimeout("doCheck()",500);
}


function doCheck(){
	if(frm1.cnee_trdp_cd.value!=''){
		ajaxSendPost(getDoList, 'reqVal', '&goWhere=aj&bcKey=getDoList&trdp_cd='+frm1.cnee_trdp_cd.value, './GateServlet.gsl');
	}	
}
function getDoList(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpVal=doc[1].split("^^;");
			if(tmpVal.length<2){
			}else if(tmpVal.length==2){
				//Customs Broker가 하나 밖에 없으므로 바로 셋팅
				var resultVal=tmpVal[0].split("@@^");
				frm1.door_loc_cd.value=resultVal[3];
				frm1.door_loc_nm.value=resultVal[4];
//				frm1.trk_trdp_addr.value = resultVal[5];
			}else if(tmpVal.length>2){
				//Customs Broker가 2개 이상이면 팝업으로 조회함
				rtnary=new Array(1);
		   		rtnary[0]=doc[1];
		   		rtnary[1]="Door Delivery";	//set Popup title
		   		callBackFunc = "getDoList_callBackFunc";
		   		modal_center_open('./CMM_POP_0340.clt', rtnary, 350,270,"yes");
			}
		}else{
			frm1.door_loc_cd.value=frm1.cnee_trdp_cd.value;
			frm1.door_loc_nm.value=frm1.cnee_trdp_nm.value;
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

function getDoList_callBackFunc(rtnVal){
   	if(!(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined)){
		var rtnValAry=rtnVal.split("|");
		frm1.door_loc_cd.value=rtnValAry[2];
		frm1.door_loc_nm.value=rtnValAry[3];
	}
}

function checkAddCntrInfo(){
	/*
	 *  2012.02.24
	 * 하우스의 컨테이너 정보가 달려있으면 해당 내용을 조합해서 찍어주고,
	 * 없으면 마스터의 컨테이너 정보를 가져온다.
	 */
 	var cnt=docObjects[1].LastRow() +1;
	var tmp="";
	var chkFlg=false;
	if(frm1.mk_txt.value != ""){
		tmp="\r\n";
	}
	if(user_ofc_cnt_cd=="JP"){
		if(OIH_AN_CNTR_INFO == "CSW"){
			tmp += "Cntr No/Type/Seal No/Weight(K)";
		}else{
			tmp += "Container No/Type/Seal No";
		}
	}else{
		if(OIH_AN_CNTR_INFO == "CSW"){
			tmp += "Cntr No/Seal No/Weight(K)";
		}else{
			tmp += "Container No/Seal No";
		}
	}
	
	for(var i=1 ; i<cnt ; i++){
		if(docObjects[1].GetCellValue(i, "cntr_no")!=''){
			chkFlg=true;
			tmp += "\r\n";
			if(user_ofc_cnt_cd=="JP"){
				if(docObjects[1].GetCellValue(i, "seal_no2")==''){
					tmp += docObjects[1].GetCellValue(i, "cntr_no") + "/" + docObjects[1].GetCellValue(i, "cntr_tpsz_cd") + "/" + docObjects[1].GetCellValue(i, "seal_no1");
				}else{
					tmp += docObjects[1].GetCellValue(i, "cntr_no") + "/" + docObjects[1].GetCellValue(i, "cntr_tpsz_cd") + "/" + docObjects[1].GetCellValue(i, "seal_no1") + ', ' + docObjects[1].GetCellValue(i, "seal_no2");
				}
			}else{
				if(docObjects[1].GetCellValue(i, "seal_no2")==''){
					tmp += docObjects[1].GetCellValue(i, "cntr_no") + "/" + docObjects[1].GetCellValue(i, "seal_no1");
				}else{
					tmp += docObjects[1].GetCellValue(i, "cntr_no") + "/" + docObjects[1].GetCellValue(i, "seal_no1") + ', ' + docObjects[1].GetCellValue(i, "seal_no2");
				}
			}
			
			if(OIH_AN_CNTR_INFO == "CSW"){
				tmp += "/" + docObjects[1].GetCellValue(i, "cgo_wgt");
			}
		}
	}
	if(chkFlg){
		frm1.mk_txt.value += tmp;
	}else{
		if(user_ofc_cnt_cd=="JP"){
			addCntrInfoType('H');
		}else{
			//addCntrInfo('H');
			addCntrInfo(docObjects[1], 'H');
		}
	}
}
function selectDCList(obj){
	var sheetObj=obj;
	for(var i=2 ; i<sheetObj.LastRow() + 1  ; i++){
		if(sheetObj.GetCellValue(i, "fr_frt_check")=="1" && sheetObj.GetCellValue(i, "fr_rat_curr_cd")!="KRW"){
			gridAdd(9);
			var tmpSheetObj=docObjects[9];
 			var tmpCnt=docObjects[9].LastRow() ;
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_sell_buy_tp_cd",'C');
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_frt_cd",sheetObj.GetCellValue(i, "fr_frt_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_frt_cd_nm",sheetObj.GetCellValue(i, "fr_frt_cd_nm"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_trdp_cd",frm1.prnr_trdp_cd.value);
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_trdp_nm",frm1.prnr_trdp_nm.value);
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_rat_curr_cd",sheetObj.GetCellValue(i, "fr_rat_curr_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_aply_ut_cd",sheetObj.GetCellValue(i, "fr_aply_ut_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_cntr_tpsz_cd",sheetObj.GetCellValue(i, "fr_cntr_tpsz_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_qty",sheetObj.GetCellValue(i, "fr_qty"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_scg_incl_flg",sheetObj.GetCellValue(i, "fr_scg_incl_flg"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_frt_term_cd",sheetObj.GetCellValue(i, "fr_frt_term_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_ru",0);
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_agent_ru",sheetObj.GetCellValue(i, "fr_ru"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_trf_cur_sum_amt",sheetObj.GetCellValue(i, "fr_trf_cur_sum_amt"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_vat_rt",0);
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_vat_amt",0);
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_curr_cd",sheetObj.GetCellValue(i, "fr_rat_curr_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_xcrt",1);
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_xcrt_dt",sheetObj.GetCellValue(i, "fr_inv_xcrt_dt"));
//			tmpSheetObj.CellValue(tmpCnt, "dc_fr_inv_amt") 			= sheetObj.CellValue(i, "fr_inv_amt");
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_vat_amt",0);
//			tmpSheetObj.CellValue(tmpCnt, "dc_fr_inv_sum_amt") 		= sheetObj.CellValue(i, "fr_inv_sum_amt");
//			tmpSheetObj.CellValue(tmpCnt, "dc_fr_agent_amt") 		= 0;
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_perf_curr_cd",sheetObj.GetCellValue(i, "fr_perf_curr_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_perf_xcrt",sheetObj.GetCellValue(i, "fr_perf_xcrt"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_perf_amt",sheetObj.GetCellValue(i, "fr_perf_amt"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_perf_vat_amt",sheetObj.GetCellValue(i, "fr_perf_vat_amt"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_no",'');
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_buy_inv_no",'');
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_seq",'');
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_sts_cd",'');
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_sts_nm",'');
		}
	}
	for(var j=2 ; j<sheetObj.LastRow() + 1  ; j++){
		sheetObj.SetCellValue(j, "fr_frt_check","0",0);
	}
}
//###############################################################################
// Conatiner 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
function sheet3_OnKeyDown(sheetObj, row, col, keyCode){
	/*	[20140116 OJG]
	if(sheetObj.LastRow()== row && "cntr_go_date" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			gridAdd(1);
			sheetObj.SelectCell(sheetObj.LastRow(), 0);
		}
	}
	*/
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
// Freight AR 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
// freight tab에서 trdp_nm을 enter로 조회할 수 있도록 설정
function sheet8_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'I', 'H');
		}
	}
	if(sheetObj.LastRow()== row && "fr_reserve_field01" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			//gridAdd(4);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			frtRowAdd('ROWADD', docObjects[4], 'S', 'I', 'H');
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
// Freight AP 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
//freight tab에서 trdp_nm을 enter로 조회할 수 있도록 설정
function sheet9_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="b_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'I', 'H');
		}
	}
	if(sheetObj.LastRow()== row && "b_fr_reserve_field01" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			//gridAdd(5);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			frtRowAdd('BCROWADD', docObjects[5], 'S', 'I', 'H');
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
// Freight DC 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
//freight tab에서 trdp_nm을 enter로 조회할 수 있도록 설정
function sheet14_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="dc_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'I', 'H');
		}
	}
	if(sheetObj.LastRow()== row && "dc_fr_frt_check" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			//gridAdd(9);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			frtRowAdd('DCROWADD', docObjects[9], 'S', 'I', 'H');
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
// A/N 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
function sheet15_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow()== row && "amt" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			gridAdd(10);
			sheetObj.SelectCell(sheetObj.LastRow(), 0);
		}
	}
}
var grobalFlag="";
function selectAutoSea(flag){
//	doShowProcess();
	var param='';
	if(flag=="S"){
		grobalFlag=flag;
		frm1.lnr_trdp_cd.value	== '' ? param += '' : param += '&trdp_cd=' + frm1.lnr_trdp_cd.value;
		param += '&trdp_tp_cd=';
		param += '&sell_buy_tp_cd=S' + '&bnd_clss_cd=I';
		frm1.pol_cd.value		== '' ? param += '' : param += '&pol_cd=' + frm1.pol_cd.value;
		frm1.pod_cd.value		== '' ? param += '' : param += '&pod_cd=' + frm1.pod_cd.value;
		frm1.del_cd.value		== '' ? param += '' : param += '&dest_del_cd=' + frm1.del_cd.value;
		frm1.post_dt.value		== '' ? param += '' : param += '&trf_term_dt=' + frm1.post_dt.value.replaceAll("-","");
	}else if(flag=="B"){
		grobalFlag=flag;
		frm1.lnr_trdp_cd.value	== '' ? param += '' : param += '&trdp_cd=' + frm1.lnr_trdp_cd.value;
		param += '&trdp_tp_cd=';
		param += '&sell_buy_tp_cd=S' + '&bnd_clss_cd=I';
		frm1.pol_cd.value		== '' ? param += '' : param += '&pol_cd=' + frm1.pol_cd.value;
		frm1.pod_cd.value		== '' ? param += '' : param += '&pod_cd=' + frm1.pod_cd.value;
		frm1.del_cd.value		== '' ? param += '' : param += '&dest_del_cd=' + frm1.del_cd.value;
		frm1.post_dt.value		== '' ? param += '' : param += '&trf_term_dt=' + frm1.post_dt.value.replaceAll("-","");
	}else if(flag=="D"){
		grobalFlag=flag;
		frm1.lnr_trdp_cd.value	== '' ? param += '' : param += '&trdp_cd=' + frm1.lnr_trdp_cd.value;
		param += '&trdp_tp_cd=';
		param += '&sell_buy_tp_cd=S' + '&bnd_clss_cd=I';
		frm1.pol_cd.value		== '' ? param += '' : param += '&pol_cd=' + frm1.pol_cd.value;
		frm1.pod_cd.value		== '' ? param += '' : param += '&pod_cd=' + frm1.pod_cd.value;
		frm1.del_cd.value		== '' ? param += '' : param += '&dest_del_cd=' + frm1.del_cd.value;
		frm1.post_dt.value		== '' ? param += '' : param += '&trf_term_dt=' + frm1.post_dt.value.replaceAll("-","");
	}
	ajaxSendPost(getAutoSea, 'reqVal', '&goWhere=aj&bcKey=selectAutoSea'+param, './GateServlet.gsl');
	doHideProcess();
}
function getAutoSea(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArray=doc[1].split(",");
			var dtlArray=rtnArray[0].split("@@@");
 		   	var objPfx='';
 		   	var sheetObj='';
 		   	var gridVal='';
 		   	var trdp_cd='';
			if(grobalFlag=="S"){
				gridVal=4;
				trdp_cd=frm1.act_shpr_trdp_cd.value;
				sheetObj=docObjects[4];
			}
			else if(grobalFlag=="B"){
				objPfx='b_';
				gridVal=5;
				trdp_cd='';
				sheetObj=docObjects[5];
			}
			else if(grobalFlag=="D"){
				objPfx='dc_';
				gridVal=9;
				trdp_cd=frm1.prnr_trdp_cd.value;
				sheetObj=docObjects[9];
			}
			for(var i=0 ; i<dtlArray.length-1 ; i++){
				var tmpArray=dtlArray[i].split("^^^");
				var rows=0;
				var grsWgtKg=frm1.grs_wgt.value.replaceAll(",","");
				var retWgt=roundXL(grsWgtKg / 1000, 3);
				var cbm=frm1.meas.value.replaceAll(",","");
				if(cbm<1){
					cbm=1;
				}
				if(retWgt<1){
					retWgt=1;
				}
				var cntrCnt=0;
				var cntrTysz='';
				for(var j=1 ; j<docObjects[1].LastRow() + 1  ; j++){
					if(docObjects[1].GetCellValue(j, "cntr_no")!="undefined"){
						cntrCnt++;
						cntrTysz=docObjects[1].GetCellValue(j, "cntr_tpsz_cd");
					}
				}
				if(frm1.shp_mod_cd.value!="FCL" && tmpArray[4]!="SCN"){
					gridAdd(gridVal);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_cd",tmpArray[0]);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_cd_nm",tmpArray[1]);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_trdp_cd",trdp_cd);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_rat_curr_cd",tmpArray[3]);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_aply_ut_cd",tmpArray[4]);
					if(user_ofc_cnt_cd=="KR" && grobalFlag=="S"){
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_curr_cd","KRW");
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_term_cd","CC");
					}
					else{
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_curr_cd",tmpArray[4]);
					}
					if(tmpArray[4]=="KGS"){
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",grsWgtKg);
					}
					else if(tmpArray[4]=="CBM"){
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",cbm);
					}
					else if(tmpArray[4]=="RET"){
						if(retWgt > cbm){
							sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",retWgt);
						}
						else{
							sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",cbm);
						}
					}
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_ru",tmpArray[8]);
					var tmpInvSumAmt=sheetObj.GetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_sum_amt");
					if(tmpArray[6]==0 && tmpArray[7]==0){
					}
					else if(tmpArray[6]!=0 && tmpArray[7]==0){
						if(tmpArray[6]-tmpInvSumAmt>0){
							tmpInvSumAmt=tmpArray[6];
						}
						else{
							//tmpInvSumAmt = tmpInvSumAmt;
						}
					}
					else if(tmpArray[6]==0 && tmpArray[7]!=0){
						if(tmpArray[7]-tmpInvSumAmt>0){
							//tmpInvSumAmt = tmpInvSumAmt;
						}
						else{
							tmpInvSumAmt=tmpArray[7];
						}
					}
					else if(tmpArray[6]!=0 && tmpArray[7]!=0){
						if(tmpArray[6]-tmpInvSumAmt>0){
							tmpInvSumAmt=tmpArray[6];
						}
						else if(tmpArray[7]-tmpInvSumAmt>0){
							//tmpInvSumAmt = tmpInvSumAmt;
						}
						else{
							tmpInvSumAmt=tmpArray[7];
						}
					}
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_sum_amt",tmpInvSumAmt);
				}
				else if((frm1.shp_mod_cd.value=="FCL" && tmpArray[4]=="SCN")){
					if(cntrTysz!="" && cntrTysz.substring(0,2)==tmpArray[5].substring(0,2)){
						gridAdd(gridVal);
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_cd",tmpArray[0]);
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_cd_nm",tmpArray[1]);
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_trdp_cd",trdp_cd);
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_rat_curr_cd",tmpArray[3]);
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_aply_ut_cd",tmpArray[4]);
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_cntr_tpsz_cd",tmpArray[5]);
						if(user_ofc_cnt_cd=="KR" && grobalFlag=="S"){
							sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_curr_cd","KRW");
							sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_term_cd","CC");
						}
						else{
							sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_curr_cd",tmpArray[4]);
						}
						if(tmpArray[4]=="KGS"){
							sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",grsWgtKg);
						}
						else if(tmpArray[4]=="CBM"){
							sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",cbm);
						}
						else if(tmpArray[4]=="RET"){
							if(retWgt > cbm){
								sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",retWgt);
							}
							else{
								sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",cbm);
							}
						}
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_ru",tmpArray[8]);
						var tmpInvSumAmt=sheetObj.GetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_sum_amt");
						if(tmpArray[6]==0 && tmpArray[7]==0){
						}
						else if(tmpArray[6]!=0 && tmpArray[7]==0){
							if(tmpArray[6]>tmpInvSumAmt){
								tmpInvSumAmt=tmpArray[6];
							}
							else{
								//tmpInvSumAmt = tmpInvSumAmt;
							}
						}
						else if(tmpArray[6]==0 && tmpArray[7]!=0){
							if(tmpArray[7]>tmpInvSumAmt){
								//tmpInvSumAmt = tmpInvSumAmt;
							}
							else{
								tmpInvSumAmt=tmpArray[7];
							}
						}
						else if(tmpArray[6]!=0 && tmpArray[7]!=0){
							if(tmpArray[6]>tmpInvSumAmt){
								tmpInvSumAmt=tmpArray[6];
							}
							else if(tmpArray[7]>tmpInvSumAmt){
								//tmpInvSumAmt = tmpInvSumAmt;
							}
							else{
								tmpInvSumAmt=tmpArray[7];
							}
						}
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_sum_amt",tmpInvSumAmt);
					}
				}
			}
		}
		else{
			//There is no Iata Tariff Info.
			alert(getLabel('FMS_COM_ALT010') + " - " + getLabel('FMS_COD_IATA') + getLabel('FMS_COD_RATE'));
		}
	}
}
function sheet4_OnKeyDown(sheetObj, row, col, keyCode){
	switch (sheetObj.ColSaveName(col)) {
		case "item_pck_qty" :
		case "item_pck_inr_qty" :
		case "item_ea_cnt" :
		case "item_wgt" :
		case "item_lbs_wgt" :
		case "item_meas" :
		case "item_cft_meas" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
//DIM 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
function sheet13_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow()== row && "dim_act_dim" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			gridAdd(1);
			sheetObj.SelectCell(sheetObj.LastRow(), 0);
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "dim_len_dim" :
		case "dim_wdt_dim" :
		case "dim_hgt_dim" :
		case "dim_pce_qty" :
		case "dim_act_dim" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
/*
function sheet3_OnPopupClick(sheetObj, Row, Col){	
	switch (sheetObj.ColSaveName(Col)) {
        case "dim_pck_ut_cd" :
	  	 	rtnary=new Array(1);
	   		rtnary[0]="1";
	        var rtnVal =  ComOpenWindow('./CMM_POP_0120.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px" , true);
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				sheetObj.SetCellValue(Row, Col,rtnValAry[0]);
			}
        break;
	}
}
*/
/* jsjang 2013.7.22 요구사항 #15952 Container Info 자동 필드값 반영요건  */
function setPacQty(){
	var formObj=document.frm1;
	if(formObj.shp_mod_cd.value !="FCL")
	{
		//formObj.sad_txt.value = formObj.pck_qty.value + "  " + formObj.pck_ut_cd.options[formObj.pck_ut_cd.selectedIndex].text;
		mkSaidTxt(docObjects[1], formObj.sad_txt);
	}
}
//#24620 CCN NO CHECK
function checkDuplCcn() {
	var formObj=document.frm1;
	if (trim(formObj.ccn_no.value) != '') {
		ajaxSendPost(checkDuplCcnAjaxReq, 'reqVal', '&goWhere=aj&bcKey=checkDuplCcn&bl_seq='+frm1.intg_bl_seq.value+'&ccn_no='+frm1.ccn_no.value, './GateServlet.gsl');
	}
} 
function checkDuplCcnAjaxReq(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	ccn_dupl=false;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if (doc[1] == "ERROR"){
				ccn_dupl=true;
				return;
			}
		} else {
			ccn_dupl=false;
		}
	}
	ccn_dupl=false;
}
//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
/**
* Work Order 화면이동
*/
function sheet16_OnDblClick(sheetObj, row, col){
var param='f_wo_no=' + sheetObj.GetCellValue(row, 'wo_no');
	   param += '&air_sea_clss_cd=S'; 
	   param += '&bnd_clss_cd=I';
	   param += '&biz_clss_cd=H';
	 //#34862 - [BINEX]Work Order - Trucker 정보 Link
	   param += '&delivery_ref_no=' + document.frm1.cust_ref_no.value;
 	var paramStr="./AIC_WOM_0013.clt?f_cmd="+SEARCH+"&"+param;
 	parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
}
function COUNTRY_POPLIST(rtnVal)
{
   if (rtnVal == undefined || rtnVal == "" || rtnVal == "undefined") {
	 	return;
	}
      else{
		var rtnValAry=rtnVal.split("|");
		frm1.cnt_cd.value=rtnValAry[0];//cd_val
		frm1.cnt_nm.value=rtnValAry[1];//cd_nm
		frm1.cnt_nm.onchange();
	}
 }

function fncBlSearch() {
	var formObj  = document.frm1;
	formObj.f_ref_no.value = formObj.ref_no.value;
	if ( event.keyCode == 13 && formObj.f_ref_no.value != null ) {
		srOpenPopUp('REF_POPLIST2',this);
	}
}

function changePWC(result) {
	
	// M.BL Entry에서 H.BL Copy할 때, M.BL Ship Mode FCL이고, 
	// M.BL CNTR Tab의 Container PWC의 각각 PWC의 합이 0일 때(경우)에는
	// M.BL의 PWC 값을 H.BL의 PWC에 Copy 해준다. (그 외의 경우는 현재 로직 유지)
	
	var formObj  = document.frm1;
	
	if(formObj.shp_mod_cd.value=="FCL"){
		
		var pTotal = 0;
		var wTotal = 0;
		var cTotal = 0;
		
		for(var i=1; i<= docObjects[1].RowCount(); i++){
			pTotal  += Number(docObjects[1].GetCellValue(i, 'cgo_pck_qty'));
			wTotal  += Number(docObjects[1].GetCellValue(i, 'cgo_wgt'));
			wTotal  += Number(docObjects[1].GetCellValue(i, 'cgo_wgt1'));
			cTotal  += Number(docObjects[1].GetCellValue(i, 'cgo_meas'));
			cTotal  += Number(docObjects[1].GetCellValue(i, 'cgo_meas1'));
		}
		if(pTotal == 0) {
			frm1.pck_qty.value				= result[64]; //pck_qty
		}
		if(wTotal == 0) {
			frm1.grs_wgt.value				= result[66]; //grs_wgt
			frm1.grs_wgt1.value				= result[67]; //grs_wgt1
		}
		if(cTotal == 0) {
			frm1.meas.value					= doMoneyFmt(Number(result[68]).toFixed(3)); //meas
			frm1.meas1.value				= doMoneyFmt(Number(result[69]).toFixed(3)); //meas1
		}
	}
	
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

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.f_bl_no.value = getParam(url,"f_bl_no");
	formObj.f_intg_bl_seq.value = getParam(url,"f_intg_bl_seq");
	
	doWork('SEARCHLIST');
}

function submitForm(){
	var formObj=document.frm1;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
	  docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./SEI_BMD_0020AJ.clt",
		   dataType: 'xml',
		   data: $(formObj).serialize(),
		   success: function(data){
			   setFieldValue( formObj.bl_sts_cd, $('bl_sts_cd',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.f_intg_bl_seq, $('f_intg_bl_seq',data).text());
			   setFieldValue( formObj.h_inv_rmk, $('inv_rmk',data).text());
			   setFieldValue( formObj.h_dflt_an_memo, $('dflt_an_memo',data).text());
			   setFieldValue( formObj.mk_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.h_mbl_curr_cd, $('mbl_curr_cd',data).text());
			   setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());
			   setFieldValue( formObj.f_bl_no, $('f_bl_no',data).text());
			   setFieldValue( formObj.bl_sts_label, $('bl_sts_label',data).text());
			   setFieldValue( formObj.bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.h_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.hbl_tp_cd, $('hbl_tp_cd',data).text());
			   setFieldValue( formObj.post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.ams_no, $('ams_no',data).text());
			   setFieldValue( formObj.isf_no, $('isf_no',data).text());
			   setFieldValue( formObj.ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.ref_ofc_cd, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.rlt_intg_bl_seq, $('rlt_intg_bl_seq',data).text());
			   setFieldValue( formObj.mbl_no, $('mbl_no',data).text());
			   setFieldValue( formObj.sub_bl_no, $('sub_bl_no',data).text());
			   setFieldValue( formObj.bl_ser_no, $('bl_ser_no',data).text());
			   setFieldValue( formObj.jb_tmplt_nm, $('jb_tmplt_nm',data).text());
			   setFieldValue( formObj.jb_tmplt_seq, $('jb_tmplt_seq',data).text());
			   setFieldValue( formObj.sub_mbl_flg, $('sub_mbl_flg',data).text());
			   setFieldValue( formObj.po_no, $('po_no',data).text());
			   setFieldValue( formObj.lc_no, $('lc_no',data).text());
			   setFieldValue( formObj.inv_no, $('inv_no',data).text());
			   setFieldValue( formObj.cust_ref_no, $('cust_ref_no',data).text());
			   setFieldValue( formObj.prnr_trdp_cd, $('prnr_trdp_cd',data).text());
			   setFieldValue( formObj.prnr_trdp_nm, $('prnr_trdp_nm',data).text());
			   setFieldValue( formObj.prnr_trdp_addr, $('prnr_trdp_addr',data).text());
			   setFieldValue( formObj.shpr_trdp_cd, $('shpr_trdp_cd',data).text());
			   setFieldValue( formObj.shpr_trdp_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.shpr_trdp_addr, $('shpr_trdp_addr',data).text());
			   setFieldValue( formObj.cnee_trdp_cd, $('cnee_trdp_cd',data).text());
			   setFieldValue( formObj.cnee_trdp_nm, $('cnee_trdp_nm',data).text());
			   setFieldValue( formObj.cnee_trdp_addr, $('cnee_trdp_addr',data).text());
			   setFieldValue( formObj.ntfy_trdp_cd, $('ntfy_trdp_cd',data).text());
			   setFieldValue( formObj.ntfy_trdp_nm, $('ntfy_trdp_nm',data).text());
			   setFieldValue( formObj.ntfy_trdp_addr, $('ntfy_trdp_addr',data).text());
			   setFieldValue( formObj.act_shpr_trdp_cd, $('act_shpr_trdp_cd',data).text());
			   setFieldValue( formObj.act_shpr_trdp_nm, $('act_shpr_trdp_nm',data).text());
			   setFieldValue( formObj.act_shp_info, $('act_shp_info',data).text());
			   setFieldValue( formObj.cust_trdp_cd, $('cust_trdp_cd',data).text());
			   setFieldValue( formObj.cust_trdp_nm, $('cust_trdp_nm',data).text());
			   setFieldValue( formObj.cust_trdp_addr, $('cust_trdp_addr',data).text());
			   setFieldValue( formObj.obrd_dt_tm, $('obrd_dt_tm',data).text());
			   setFieldValue( formObj.pre_vsl_cd, $('pre_vsl_cd',data).text());
			   setFieldValue( formObj.pre_vsl_nm, $('pre_vsl_nm',data).text());
			   setFieldValue( formObj.pre_voy, $('pre_voy',data).text());
			   setFieldValue( formObj.trnk_vsl_cd, $('trnk_vsl_cd',data).text());
			   setFieldValue( formObj.trnk_vsl_nm, $('trnk_vsl_nm',data).text());
			   setFieldValue( formObj.trnk_voy, $('trnk_voy',data).text());
			   setFieldValue( formObj.lane_cd, $('lane_cd',data).text());
			   setFieldValue( formObj.por_cd, $('por_cd',data).text());
			   setFieldValue( formObj.por_nm, $('por_nm',data).text());
			   setFieldValue( formObj.etd_por_tm, $('etd_por_tm',data).text());
			   setFieldValue( formObj.pol_cd, $('pol_cd',data).text());
			   setFieldValue( formObj.pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.pod_cd, $('pod_cd',data).text());
			   setFieldValue( formObj.pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.del_cd, $('del_cd',data).text());
			   setFieldValue( formObj.del_nm, $('del_nm',data).text());
			   setFieldValue( formObj.d_eta_dt_tm, $('d_eta_dt_tm',data).text());
			   setFieldValue( formObj.fnl_dest_loc_cd, $('fnl_dest_loc_cd',data).text());
			   setFieldValue( formObj.fnl_dest_loc_nm, $('fnl_dest_loc_nm',data).text());
			   setFieldValue( formObj.f_eta_dt_tm, $('f_eta_dt_tm',data).text());
			   setFieldValue( formObj.lnr_trdp_cd, $('lnr_trdp_cd',data).text());
			   setFieldValue( formObj.lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			   setFieldValue( formObj.agent_trdp_cd, $('agent_trdp_cd',data).text());
			   setFieldValue( formObj.agent_trdp_nm, $('agent_trdp_nm',data).text());
			   setFieldValue( formObj.agent_trdp_addr, $('agent_trdp_addr',data).text());
			   setFieldValue( formObj.door_loc_cd, $('door_loc_cd',data).text());
			   setFieldValue( formObj.door_loc_nm, $('door_loc_nm',data).text());
			   setFieldValue( formObj.cfs_trdp_cd, $('cfs_trdp_cd',data).text());
			   setFieldValue( formObj.cfs_trdp_nm, $('cfs_trdp_nm',data).text());
			   setFieldValue( formObj.avail_dt_tm, $('avail_dt_tm',data).text());
			   setFieldValue( formObj.lfd_dt_tm, $('lfd_dt_tm',data).text());
			   setFieldValue( formObj.go_dt_tm, $('go_dt_tm',data).text());
			   setFieldValue( formObj.cnt_cd, $('cnt_cd',data).text());
			   setFieldValue( formObj.cnt_nm, $('cnt_nm',data).text());
			   setFieldValue( formObj.trk_trdp_cd, $('trk_trdp_cd',data).text());
			   setFieldValue( formObj.trk_trdp_nm, $('trk_trdp_nm',data).text());
			   setFieldValue( formObj.trk_trdp_addr, $('trk_trdp_addr',data).text());
			   setFieldValue( formObj.cfs_nod_cd, $('cfs_nod_cd',data).text());
			   setFieldValue( formObj.cfs_loc_nm, $('cfs_loc_nm',data).text());
			   setFieldValue( formObj.cfs_loc_cd, $('cfs_loc_cd',data).text());
			   setFieldValue( formObj.csts_clr_tp, $('csts_clr_tp',data).text());
			   setFieldValue( formObj.shp_mod_cd, $('shp_mod_cd',data).text());
			   setFieldValue( formObj.inco_cd, $('inco_cd',data).text());
			   setFieldValue( formObj.rep_cmdt_cd, $('rep_cmdt_cd',data).text());
			   setFieldValue( formObj.rep_cmdt_nm, $('rep_cmdt_nm',data).text());
			   setFieldValue( formObj.h_rep_cmdt_nm, $('rep_cmdt_nm',data).text());
			   setFieldValue( formObj.pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.grs_wgt, $('grs_wgt',data).text());
			   setFieldValue( formObj.grs_wgt1, $('grs_wgt1',data).text());
			   setFieldValue( formObj.meas, $('meas',data).text());
			   setFieldValue( formObj.meas1, $('meas1',data).text());
			   setFieldValue( formObj.size_ut_cd1, $('size_ut_cd',data).text());
			   setFieldValue( formObj.wh_recp_no, $('wh_recp_no',data).text());
			   setFieldValue( formObj.curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.h_curr_cd, $('curr_cd',data).text());
			   
			   if($('frt_term_cd',data).text() == ''){
				   setFieldValue( formObj.frt_term_cd, 'CC');
			   }else{
				   setFieldValue( formObj.frt_term_cd, $('frt_term_cd',data).text());
			   }
			   
			   setFieldValue( formObj.fm_svc_term_cd, $('fm_svc_term_cd',data).text());
			   setFieldValue( formObj.to_svc_term_cd, $('to_svc_term_cd',data).text());
			   setFieldValue( formObj.nomi_flg, $('nomi_flg',data).text());
			   setFieldValue( formObj.shp_tp_cd, $('shp_tp_cd',data).text());
			   setFieldValue( formObj.profit_share, $('profit_share',data).text());
			   setFieldValue( formObj.h_profit_share, $('profit_share',data).text());
			   setFieldValue( formObj.express_tp_cd, $('express_tp_cd',data).text());
			   setFieldValue( formObj.cargo_tp_cd, $('cargo_tp_cd',data).text());
			   setFieldValue( formObj.svc_scope, $('svc_scope',data).text());
			   setFieldValue( formObj.org_bl_rcvd_flg, $('org_bl_rcvd_flg',data).text());
			   setFieldValue( formObj.rcvd_dt_tm, $('rcvd_dt_tm',data).text());
			   setFieldValue( formObj.ror_flg, $('ror_flg',data).text());
			   setFieldValue( formObj.rlsd_flg, $('rlsd_flg',data).text());
			   setFieldValue( formObj.rlsd_dt_tm, $('rlsd_dt_tm',data).text());
			   setFieldValue( formObj.rlsd_usrid, $('rlsd_usrid',data).text());
			   setFieldValue( formObj.rlsd_usr_nm, $('rlsd_usr_nm',data).text());
			   setFieldValue( formObj.rlsd_dept_cd, $('rlsd_dept_cd',data).text());
			   setFieldValue( formObj.bl_iss_dt, $('bl_iss_dt',data).text());
			   setFieldValue( formObj.opr_usrid, $('issued_by',data).text());
			   setFieldValue( formObj.opr_usrnm, $('proc_usrnm',data).text());
			   setFieldValue( formObj.opr_ofc_cd, $('proc_ofccd',data).text());
			   setFieldValue( formObj.opr_dept_cd, $('proc_dept_cd',data).text());
			   setFieldValue( formObj.sls_ofc_cd, $('sls_ofc_cd',data).text());
			   setFieldValue( formObj.sls_usrid, $('sls_usrid',data).text());
			   setFieldValue( formObj.sls_usr_nm, $('sls_usr_nm',data).text());
			   setFieldValue( formObj.sls_dept_cd, $('sls_dept_cd',data).text());
			   setFieldValue( formObj.it_no, $('it_no',data).text());
			   setFieldValue( formObj.te_dt_tm, $('te_dt_tm',data).text());
			   setFieldValue( formObj.it_loc, $('it_loc',data).text());
			   setFieldValue( formObj.te, $('te',data).text());
			   setFieldValue( formObj.bond_carr_cd, $('bond_carr_cd',data).text());
			   setFieldValue( formObj.bond_carr_nm, $('bond_carr_nm',data).text());
			   setFieldValue( formObj.bond_no, $('bond_no',data).text());
			   setFieldValue( formObj.goods_at, $('goods_at',data).text());
			   setFieldValue( formObj.goods_value, $('goods_value',data).text());
			   setFieldValue( formObj.ccn_no, $('ccn_no',data).text());
			   setFieldValue( formObj.ccn_dt, $('ccn_dt',data).text());
			   setFieldValue( formObj.pre_ccn_no, $('pre_ccn_no',data).text());
			   setFieldValue( formObj.mnf_fr_loc, $('mnf_fr_loc',data).text());
			   setFieldValue( formObj.mnf_to_loc, $('mnf_to_loc',data).text());
			   setFieldValue( formObj.sad_txt, $('sad_txt',data).text());
			   setFieldValue( formObj.say_txt, $('say_txt',data).text());
			   setFieldValue( formObj.mk_txt, $('mk_txt',data).text());
			   setFieldValue( formObj.desc_txt, $('desc_txt',data).text());
			   setFieldValue( formObj.rmk, $('rmk',data).text());
			   setFieldValue( formObj.desc_txt1, $('desc_txt1',data).text());
			   //setFieldValue( formObj.xcrtDt, $('eta_dt_tm',data).text());
			   var etadttm = $('eta_dt_tm',data).text().replaceAll('-','');
			   setFieldValue( formObj.xcrtDt, etadttm);
			   
			   setFieldValue( formObj.an_inv_no, $('an_inv_no',data).text());
			   setFieldValue( formObj.an_due_dt, $('an_due_dt',data).text());
			   setFieldValue( formObj.an_curr_cd, $('an_curr_cd',data).text());

			   setFieldValue( formObj.hbl_ser_pfx, $('hbl_ser_pfx',data).text());
			   setFieldValue( formObj.hbl_ser_no, $('hbl_ser_no',data).text());
			   
			   setFieldValue( formObj.ctrb_ofc_cd, $('ctrb_ofc_cd',data).text());
			   setFieldValue( formObj.ctrb_dept_cd, $('ctrb_dept_cd',data).text());
			   setFieldValue( formObj.ctrb_ratio_yn, $('ctrb_ratio_yn',data).text());
			   setFieldValue( formObj.ctrb_mgn, $('ctrb_mgn',data).text());
			   
			   setFieldValue( formObj.csms_rlse_dt, $('csms_rlse_dt',data).text());
			   setFieldValue( formObj.pkup_dt, $('pkup_dt',data).text());
			   setFieldValue( formObj.entr_no, $('entr_no',data).text());
			   setFieldValue( formObj.cfs_rmk, $('cfs_rmk',data).text());

			   doBtnAuthority(attr_extension);
			   tab1click = '';
			   tab2click = '';
			   tab3click = '';
			   tab4click = '';
			   tab5click = '';
			   tab6click = '';
			   setupPage();
			   
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
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
				
				if ((arFrt_copy_chk == "Y")||(apFrt_copy_chk == "Y")||(dcFrt_copy_chk == "Y")) {
					//Freight될 Container 조회
					frm1.f_cmd.value=SEARCHLIST01;
		 			docObjects[3].DoSearch("./SEE_FRT_0010GS.clt", FormQueryString(frm1) );
				}
				
				if (arFrt_copy_chk == "Y") {
					//Selling/Debit Freight 조회
					frm1.f_cmd.value=SEARCHLIST06;
		 			docObjects[4].DoSearch("./SEI_BMD_0024GS.clt", FormQueryString(frm1) );
				}
				
				if (apFrt_copy_chk == "Y") {
					//Buying/Crebit List 조회
					frm1.f_cmd.value=SEARCHLIST07;
		 			docObjects[5].DoSearch("./SEI_BMD_0024_1GS.clt", FormQueryString(frm1) );
				}
				
				if (dcFrt_copy_chk == "Y") {
					//Debit/Crebit List 조회
					frm1.f_cmd.value=SEARCHLIST12;					
		 			docObjects[9].DoSearch("./SEI_BMD_0024_2GS.clt", FormQueryString(frm1) );
				}

				frm1.intg_bl_seq.value = tmpIntgBlSeq;	
				
				// 2015.06.12 Copy 했을 때 Said, Say 다시 세팅
				mkSaidTxt(docObjects[1], frm1.sad_txt);
				mkSayTxt(docObjects[1], frm1.say_txt);
			}
		}
	}
}

function searchFrtCntr(){

	var orgBlSeq = frm1.copy_bl_seq.value;
	var tmpIntgBlSeq = frm1.intg_bl_seq.value;; 
	frm1.intg_bl_seq.value = frm1.copy_bl_seq.value;
	frm1.f_cmd.value=SEARCHLIST01;
	docObjects[3].DoSearch("./SEE_FRT_0010GS.clt", FormQueryString(frm1) );
	frm1.intg_bl_seq.value = tmpIntgBlSeq;	
}

function setCtrbDeptCd(){
	var formObj = document.frm1;
	formObj.ctrb_dept_cd.value = "OI";
}

function setUseCfsFieldsReq(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
        HideCustoms(doc[1]);
    }else{
        HideCustoms("n");
    }
}

function HideCustoms(hide){
    if(hide.toLowerCase()=="y"){
        $("[id=CFS_FIELD]").show();
    }else{
        $("[id=CFS_FIELD]").hide();
    }
}


function blCheckInpuValsForAdding(){
	var isOk=true;
	//---------------20121130 OJG---------------------------
	if(!chkCmpAddr(frm1.shpr_trdp_addr, 'Shipper Address')){
		isOk=false;
		moveTab('01');		
		frm1.shpr_trdp_addr.focus();
		return isOk;
	}
	if(!chkCmpAddr(frm1.cnee_trdp_addr, 'Consignee Address')){
		isOk=false;
		moveTab('01');
		frm1.cnee_trdp_addr.focus();
		return isOk;
	}
	if(!chkCmpAddr(frm1.ntfy_trdp_addr, 'Notify Address')){
		isOk=false;
		moveTab('01');
		frm1.ntfy_trdp_addr.focus();
		return isOk;
	}
	//---------------20121130 OJG--------------------------
	/*
	 *  2012.02.23
	 * 필수값 설정
	 * REF_NO, ETD
	 */
	//if(checkInputVal(frm1.bl_no.value, 2, 40, "T", 'HB/L No.')!='O'){ //S.Y BAIK (2013.01.23)
	if(getStringLength(frm1.bl_no.value) == 0){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_HBNO'));
		isOk=false;
		moveTab('01');
		frm1.bl_no.focus();
		return isOk;
	}
	//else if(checkInputVal(frm1.eta_dt_tm.value, 10, 10, "DD", 'ETA')!='O'){ //S.Y BAIK (2013.01.23)
	else if(!checkInType(frm1.eta_dt_tm.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ETA_'));
		isOk=false;
		moveTab('01');
		frm1.eta_dt_tm.focus();
		return isOk; 
	}
	//else if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'ETD')!='O'){ //S.Y BAIK (2013.01.23)
	else if(!checkInType(frm1.etd_dt_tm.value, "DD")){
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
	//LHK, 20140612 #33814 [BINEX]Import Mandatory 추가 - Carrier
	if(frm1.lnr_trdp_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001') + " - Carrier");
		moveTab('01');
		frm1.lnr_trdp_cd.focus();
		isOk = false;
		return isOk; 
	}

	//#31594 [BINEX]B/L Entry 에서 Customer 항목을 mandatory 지정 - 필수값 설정 추가
	if(frm1.act_shpr_trdp_cd.value == "") { 
//		alert(getLabel('FMS_COM_ALT001'));
		alert(getLabel('FMS_COM_ALT001') + " - CUSTOMER");
		moveTab('01');
		frm1.act_shpr_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.act_shpr_trdp_nm.value == "") { 
//		alert(getLabel('FMS_COM_ALT001'));
		alert(getLabel('FMS_COM_ALT001') + " - CUSTOMER");
		moveTab('01');
		frm1.act_shpr_trdp_nm.focus();
		isOk = false;
		return isOk; 
	}
	//today를 기준으로 6개월 차이가 나면 안됨
	var tmpEtdDate=frm1.etd_dt_tm.value.replaceAll("-", "");
	var tmpEtaDate=frm1.eta_dt_tm.value.replaceAll("-", "");
	var etdDate=new Date(tmpEtdDate.substring(4,8), tmpEtdDate.substring(0,2)-1, tmpEtdDate.substring(2,4));
	var etaDate=new Date(tmpEtaDate.substring(4,8), tmpEtaDate.substring(0,2)-1, tmpEtaDate.substring(2,4));
	var tmpDate=new Date();
	var today=new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate());
	if((today-etdDate)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	}else if((etdDate-today)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	}else{
		etdRangeOk=true;
	}
	if((today-etaDate)/(60*60*24*1000) > 180){
		etaRangeOk=false;
	}else if((etaDate-today)/(60*60*24*1000) > 180){
		etaRangeOk=false;
	}else{
		etaRangeOk=true;
	}

	var sheetObj17=docObjects[13];
	for(var i=1; i<=sheetObj17.RowCount(); i++){
		if(sheetObj17.GetCellValue(i,"udf_cd") == ""){
			alert(getLabel('FMS_COM_ALT001'));
			sheetObj17.SelectCell(i,"udf_cd");
			isOk=false;
		}
	}
	/*==================================================================================================*/
	/* LHK, 20130128 Freight Edit/Delete 는 TB_FRT.INV_STS_CD 가 FI 인 경우에만 허용						    */
	/* Freight 생성 후 Invoice 를 생성한 후 재조회 하지 않고 다시 저장할 경우 delete 하거나 수정 건으로 인한 오류 발생을 차단. */
	var sheetObjArr=new Array(3);
	sheetObjArr[0]=docObjects[4];		//AR LOCAL  'fr_'
	sheetObjArr[1]=docObjects[9];	//DC 		'dc_fr_'
	sheetObjArr[2]=docObjects[5];		//AP 		'b_fr_'
	if(checkFrtSts(sheetObjArr)==false){	//Validation 후 Do you want to save 뜨지 않고 원래값 가져오기
		isOk=false;
	}
	/*=================================================================================================*/
	//Container List & Item List validation.
	var cntrListParam=docObjects[3].GetSaveString(false);
	if(docObjects[3].IsDataModified() && cntrListParam == "") { isOk=false; };
	if(cntrListParam!=''){
		if(cntrListCheckInpuVals(docObjects[3])){
			isOk=false;
		}
	}
	var cmdtListParam=docObjects[2].GetSaveString(false);
	if(docObjects[2].IsDataModified() && cmdtListParam == "") { isOk=false; };
	if(cmdtListParam!=''){
		if(itemCheckInpuVals(docObjects[2])){
			isOk=false;
		}
	}

	var frtSdListParam=docObjects[4].GetSaveString(false);
	if(docObjects[4].IsDataModified() && frtSdListParam == "") { isOk=false; };

	var frtBcListParam=docObjects[5].GetSaveString(false);
	if(docObjects[5].IsDataModified() && frtBcListParam == "") { isOk=false; };

	var frtDcListParam=docObjects[9].GetSaveString(false);
	if(docObjects[9].IsDataModified() && frtDcListParam == "") { isOk=false; };

	// 24620 CCN NO 중복 체크
	checkDuplCcn();
	if (ccn_dupl){
		//[warning] Duplicated CCN number found.
		alert(getLabel('FMS_COM_ALT063'));
		moveTab('03');
		frm1.ccn_no.value="";
		frm1.ccn_no.focus();
		isOk=false;
	}

	// 44406 BL SERIAL NO 널 체크
	if (frm1.use_hbl_ser.value == 'Y') {
		frm1.hbl_ser_no.value = trim(frm1.hbl_ser_no.value);
		if (frm1.hbl_ser_no.value == ""){
			alert(getLabel('FMS_COM_ALT001'));
			frm1.hbl_ser_no.focus();
			return false;
		}

		// 긴급 'N/A', 'SP' 입력 시 중복체크 안함 
		if (frm1.hbl_ser_no.value != 'N/A' && frm1.hbl_ser_no.value != 'SP') {
			// 44406 BL SERIAL NO 중복 체크
			checkHblSerNo();
			if (hbl_ser_dupl){
				alert(getLabel('FMS_COM_ALT072'));
				moveTab('01');
				frm1.hbl_ser_no.focus();
				isOk=false;
			}
		}
	}

	if(!cntrListValid(docObjects[1])){
		moveTab('02');
		alert(getLabel('SEA_COM_ALT020'));
		isOk=false;
	}

	return isOk;
}

/** #52165 [Globe Runner] HBL > MBL Create **/
var NEXT_BLOCK_DT="";    	//MAX(BLOCK_DT)+1
function setPost_date(save_flag){
 	var formObj=document.frm1;
 	var ofc_post_tp=ofc_post_dt;
 	
 	//block에서 바꾼 post_date를 etd ,eta에서 무조건 변경을 함 ==>i,u로 분기해서 실행 
 	//20150312 Skwoo redmine  #48186
 	if(save_flag == "I"){
 		if(ofc_post_tp=="ETD"){
 		   frm1.post_dt.value=frm1.etd_dt_tm.value;
 		}else if(ofc_post_tp=="ETA"){
 		frm1.post_dt.value=frm1.eta_dt_tm.value;
 	    /*if(frm1.f_eta_dt_tm.value!=''){
 		   frm1.post_dt.value=frm1.f_eta_dt_tm.value;
 	    }else{
 		   frm1.post_dt.value=frm1.eta_dt_tm.value;
 	    }*/
 		//25273 OFC_CD변경시 TODAY에 대한 고려가 없어서 추가
 		}else if(ofc_post_tp=="TODAY"){
 		//LHK, 20140924 #43960 [DYNAMIC] Post Date 변경
 		if(formObj.post_dt.value==""){
 			frm1.post_dt.value=getTodayStr();
 		}
 		// 25273 D-ETA인 경우, D-ETA를 POST_DT로 설정한다.
 		}else if(ofc_post_tp=="D-ETA"){
 			frm1.post_dt.value=frm1.f_eta_dt_tm.value;
 			//MASTER에서는 D-ETA의 값이 ETA값으로 자동적으로 설정되기 때문에 ""값이 설정되는걸 미연에 방지
 			if(frm1.post_dt.value == ""){
 				frm1.post_dt.value=frm1.eta_dt_tm.value;
 			}
 		}	
 	}else if(save_flag == "U"){
 		if(ofc_post_tp=="ETD"){
 			if (frm1.etd_dt_tm.value != frm1.org_etd_dt_tm.value ){
 				frm1.post_dt.value=frm1.etd_dt_tm.value;
 			}  		   
  		}else if(ofc_post_tp=="ETA"){
  			if (frm1.eta_dt_tm.value != frm1.org_eta_dt_tm.value ){
  				frm1.post_dt.value=frm1.eta_dt_tm.value;
  			}
  		}else if(ofc_post_tp=="D-ETA"){
  			if (frm1.f_eta_dt_tm.value != frm1.org_f_eta_dt_tm.value ){
  				frm1.post_dt.value=frm1.f_eta_dt_tm.value;
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
 		alert(getLabel("SEA_COM_ALT028"));
 		return;
 	}
 	if(NEXT_BLOCK_DT != "") {
 		//post_dt 와 block_dt 비교
//	 		fromDate > toDate true
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

function setOihAnCntrInfoReq(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
    	if(doc[1] == "CSW"){
    		OIH_AN_CNTR_INFO = "CSW";
    	}
    }
}