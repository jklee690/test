// 공통전역변수
var docObjects=new Array();
var sheetCnt=0;
var rdObjects=new Array();
var rdCnt=0;
//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
//팝업창에서 리턴한 결과값과 outlook호출 메소드와의 동기화를 위해 필요
var lv_lpSubject="";
var lv_lpAttachFileName="";
var lv_mailAN_param="";
var lv_mailAN_return="";
var rtnary=new Array(1);
var callBackFunc = "";
var isChrome = false;
var RPT_ZOOM_RATIO = "1.5";
var PRN_USE_ACTIVEX = true;
var PRN_WAS_PORT = "8001";

function loadPage() {
	
	var opt_key = "PRN_USE_ACTIVEX";
	ajaxSendPost(setUseActivexReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	if(PRN_USE_ACTIVEX){
		rdObjects[0].SetCacheOption(0);
		setRdInit(rdObjects[0]);
		var formObj=document.frm1;
		formObj.f_eml_to.value=emlToAddr;
		formObj.f_eml_title.value=emlTitle;
		/*formObj.f_eml_content.value=emlContent;*/
		document.getElementById("mainTable").height=screen.height - 150;
		$("#mainTable").css("padding-right",0);
	} else {
		hostUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
		loadPageHtml5();
	}	
	
}

function loadPageHtml5() {
	
	isChrome = true;
	document.getElementById("mainTable").height = screen.height - 150;
	
	var opt_key = "RPT_ZOOM_RATIO";
	ajaxSendPost(setRptZoomRatioReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var opt_key2 = "PRN_WAS_PORT";
	ajaxSendPost(setWasPortReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key2, "./GateServlet.gsl");

	var hostUrl = window.location.protocol + "//" + window.location.hostname + ":" +PRN_WAS_PORT;
	
	var viewer = new m2soft.crownix.Viewer( hostUrl+'/ReportingServer/service', "mainTable");
	rdObjects[0] = viewer;
	setRdInit(rdObjects[0]);
}


/**
 *  Print Finished Event Catch for Chrome
 *  Don't use alert fucntion in this Fucntion 
 */
function PrintFinished(){
	registRptPrintHistory();
}

/**
 * Report Design 환경을 초기화한다.
 */
function setRdInit(objRd){
	var formObj=document.frm1;
	
	if (!isChrome) {
		objRd.height = (screen.height - 220) + "px";
		if(formObj.fileName.value=="air_label_01.mrd" || formObj.fileName.value == "air_mbl_label_01.mrd" || formObj.fileName.value=="package_label.mrd" || formObj.fileName.value=="check_journal_01.mrd"){
			objRd.AutoAdjust=false;
			objRd.ZoomRatio=100;
		}else{
			objRd.AutoAdjust=2;
			// US, CA 이외(현재는 DE)에는 RD에 LETTER로 설정되어 있어도 기본값을 A4로 설정한다.
			if (user_ofc_cnt_cd=="DE") {
				objRd.SetPrint2(1,1,1,100); // A4
			}
		} 
	}
	
	var rptFilePath = rpt_file_path;
	if(rptFilePath == "") {
		rptFilePath = "C:\\opus\\";
	} else if(rptFilePath.substring(rptFilePath.length,rptFilePath.length-1)!="\\") {
		rptFilePath = rptFilePath + "\\";
	}

	if (!isChrome) {
		
		// PDF 파일명 설정 - IE용 
		var pdfFileNm = formObj.rpt_pdf_file_nm.value;
		if (pdfFileNm == "" || pdfFileNm == "undefined" || pdfFileNm == undefined) {
			pdfFileNm = formObj.fileName.value.split(".")[0];
		} 
	    objRd.SetSaveDialogEx(rptFilePath, pdfFileNm, "xls@doc@pdf@tif@bmp", "pdf");
	    objRd.DisableToolbar(14);
		objRd.ViewShowMode(0);
		objRd.SetBackgroundColor(255,255,255); //Case Sensitive
		objRd.SetPageLineColor(255,255,255);	
		objRd.ApplyLicense("0.0.0.0");					//License Checking
	}
	
	// ADV전용 메소드 추가
	if(formObj.fileName.value=="advance_profit_report.mrd"){
		rdOpenMerge(objRd, document.frm1);
		return;
	}
	rdOpen(objRd, document.frm1);
}
function rdOpen(objRd, formObj) {

	if (!isChrome) {
		objRd.SetAppendReport(1);
	}
	
	var fileNmArr=formObj.fileName.value.split("^@@^");
	var rdParamArr=formObj.rdParam.value.split("^@@^");
	if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA"){

		if(RD_path.indexOf("/letter/") == -1) {  
			RD_path += "letter/";
		}
	}
	
	var v_rwait = '';
	
	if (fileNmArr.length > 1){
		v_rwait = '/rwait';
	}
	
	var rdParamVal = "";
	var appendReport = new Array();
	for(var i=0 ; i < fileNmArr.length ; i ++){

		rdParamVal = "";
		
		if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA" || user_ofc_cnt_cd=="DE"){
			if(     fileNmArr[i] == "pfm_profit_month_multi.mrd" ){
				// 동기방식 적용
				//objRd.FileOpen(RD_path+fileNmArr[i], RDServer+'/ruseurlmoniker [0] ' + v_rwait + ' /rp '+rdParamArr[i] + " /riprnmargin");
				rdParamVal = RDServer+'/ruseurlmoniker [0] ' + v_rwait + ' /rp '+rdParamArr[i] + " /riprnmargin /rpptexportapitype [1]";
				
			} else {
				// 기존방식 유지
				if(fileNmArr[i].value=="air_label_01.mrd" || formObj.fileName.value == "air_mbl_label_01.mrd" || fileNmArr[i].value=="package_label.mrd"){
					//objRd.FileOpen(RD_path+fileNmArr[i], RDServer+ v_rwait + ' /rp '+rdParamArr[i]);
					rdParamVal = RDServer+ v_rwait + ' /rp '+rdParamArr[i];
				}else{
					//objRd.FileOpen(RD_path+fileNmArr[i], RDServer+ v_rwait + ' /rp '+rdParamArr[i] + " /riprnmargin");
					rdParamVal = RDServer+v_rwait + ' /rp '+rdParamArr[i] + " /riprnmargin /rpptexportapitype [1]";
				}
			}
		}else{
			//objRd.FileOpen(RD_path+fileNmArr[i], RDServer+ v_rwait + ' /rp '+rdParamArr[i]);
			rdParamVal = RDServer+v_rwait + ' /rp '+rdParamArr[i] + " /rpptexportapitype [1]";
		}
		
		if (!isChrome) {
			objRd.FileOpen(RD_path+fileNmArr[i],rdParamVal);
		} else {
			appendReport.push({ mrdPath : RD_path+fileNmArr[i], mrdParam : rdParamVal }) 
		}
	}
	
	if (isChrome) {
		// PDF 파일명 설정 - chrome용  -IE 설정은 70라인
		var pdfFileNm = formObj.rpt_pdf_file_nm.value;
		if (pdfFileNm == "" || pdfFileNm == "undefined" || pdfFileNm == undefined) {
			pdfFileNm = formObj.fileName.value.split(".")[0];
		} 
		objRd.openFile(appendReport ,{timeout:1200, defaultZoom : Number(RPT_ZOOM_RATIO) ,defaultZoomCentre:'LEFTTOP' ,keepZoomRatio:'true' ,downloadFileName : pdfFileNm });
	}	
}

function rdOpenMerge(objRd, formObj){
	if (formObj.fileName.value=="advance_profit_report.mrd") {
		//rdParam을 "][" 기준으로 배열로 나누어서 12번째 value를 확인
		var currVal=formObj.rdParam.value.split("][")[11];
		if (currVal.length > 3) {
			// "]"가 들어가 있을경우 삭제 (마지막 파라미터인경우)
			if (currVal.indexOf("]")>0){
				currVal=currVal.substr(0,currVal.length-1);
			}
		}
		var curr=currVal.split(";");
		var rdParamVal = "";
		var appendReport = new Array();
		if(curr.length > 0){
			if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA"){
				if(RD_path.indexOf("/letter/") == -1) {  
					RD_path += "letter/";
				}
			}
			
			
			if (!isChrome) {
				objRd.SetAppendReport(1);
			}
			
			
			for (var i=0;i<curr.length;i++){
				var tmpVal="["+curr[i]+"]";
				//objRd.FileOpen(RD_path+formObj.fileName.value, RDServer+' /rwait /rp '+ formObj.rdParam.value+tmpVal);
				rdParamVal =RDServer+' /rwait /rp '+ formObj.rdParam.value+tmpVal + " /rpptexportapitype [1]";
			}
			
			if (!isChrome) {
				objRd.FileOpen(RD_path+formObj.fileName.value,rdParamVal);
			} else {
				appendReport.push({ mrdPath : RD_path+formObj.fileName.value, mrdParam : rdParamVal }) 
			}
		} else {
			// 커런시가 없음 - RD를 프린트하지 않는다.
		}
	} else {
		rdOpen(objRd, document.frm1);
	}
	
	if (isChrome) {
		//objRd.setStateLessMode(false); 
		objRd.openFile(appendReport ,{timeout:1200, defaultZoom : RPT_ZOOM_RATIO ,defaultZoomCentre:'LEFTTOP' ,keepZoomRatio:'true'});
	}
	
}
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
    switch(srcName) {
    	case "Fax":
			var lpSubject=(formObj.mailTitle.value != ""?  formObj.mailTitle.value: formObj.title.value);
			var lpAttachFileName=formObj.fileName.value.replaceAll(".mrd",  ".tif");
			var rptBizTp=formObj.rpt_biz_tp.value;
			var rptBizSubTp=formObj.rpt_biz_sub_tp.value;
			var rptTp=formObj.rpt_tp.value
			var rptTrdpCd=formObj.rpt_trdp_cd.value
			/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
			var his_type="F"; // E : email, P : print, F : FAX
			var his_call_view=formObj.title.value;
			var his_call_file=formObj.fileName.value;
			var his_title=formObj.mailTitle.value;	
			var inv_seq=formObj.f_inv_seq.value;
			if (!(((rptBizTp == "" || rptBizTp == "undefined" || rptBizTp == undefined) &&
				       (rptBizSubTp == "" || rptBizSubTp == "undefined" || rptBizSubTp == undefined) &&
				           (rptTp == "" || rptTp == "undefined" || rptTp == undefined) &&
				               (rptTrdpCd == "" || rptTrdpCd == "undefined" || rptTrdpCd == undefined)) ||
				  (rptBizTp == "OIM" && rptBizSubTp == "DS"))
				) {    // Ocean Import > Master B/L >Devanning / Segregation 일 경우는 parameter로 받음
				// mailTo 조회 & setting
				ajaxSendPost(getRptFaxParameters, "reqVal", "&goWhere=aj&bcKey=getRptFaxParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
																			+ "&rpt_biz_tp=" + rptBizTp
																			+ "&rpt_biz_sub_tp=" + rptBizSubTp
																			+ "&rpt_tp=" + formObj.rpt_tp.value
																			+ "&rpt_trdp_cd=" + formObj.rpt_trdp_cd.value
																			, "./GateServlet.gsl");
			}
//    		var rtnVal =  ComOpenWindow('./RPT_FAX_0020.clt',  formObj.fax_param.value,  "scroll:yes;status:no;help:no;dialogWidth:685px;dialogHeight:480px" , true);
    		
    		callBackFunc = "FAX";
    		rtnary=new Array(1);
    		rtnary[0] = formObj.fax_param.value;
    		modal_center_open('./RPT_FAX_0020.clt', rtnary , 1150,550,"yes");
    	break;
    	case "Mail":
			var lpSubject=(emlTitle != "" ?  emlTitle : title);
			var lpAttachFileName=formObj.fileName.value.split("^@@^")[0].replaceAll(".mrd", ".pdf");
			var rptBizTp=formObj.rpt_biz_tp.value;
			var rptBizSubTp=formObj.rpt_biz_sub_tp.value;
			var rptTp=formObj.rpt_tp.value
			var rptTrdpCd=formObj.rpt_trdp_cd.value
			/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
			var his_type="E"; // E : email, P : print
			var his_call_view=formObj.title.value;
			var his_call_file=formObj.fileName.value;
			var his_title=formObj.f_eml_title.value;
			var inv_seq=formObj.f_inv_seq.value;
			
			lv_lpSubject=lpSubject;
			lv_lpAttachFileName=lpAttachFileName;
			
			if (!((rptBizTp == "" || rptBizTp == "undefined" || rptBizTp == undefined) &&
				       (rptBizSubTp == "" || rptBizSubTp == "undefined" || rptBizSubTp == undefined) &&
				           (rptTp == "" || rptTp == "undefined" || rptTp == undefined) &&
				               (rptTrdpCd == "" || rptTrdpCd == "undefined" || rptTrdpCd == undefined)) ||
				  (formObj.fileName.value.split("^@@^").length == 1)
				) {
				// mailTo 조회 & setting
				ajaxSendPost(getRptMailParameters, "reqVal", "&goWhere=aj&bcKey=getRptMailParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
																			+ "&rpt_biz_tp=" + formObj.rpt_biz_tp.value
																			+ "&rpt_biz_sub_tp=" + formObj.rpt_biz_sub_tp.value
																			+ "&rpt_tp=" + formObj.rpt_tp.value
																			+ "&rpt_acc_grp_id=" + formObj.rpt_acc_grp_id.value
																			+ "&rpt_trdp_cd=" + formObj.rpt_trdp_cd.value																
																			, "./GateServlet.gsl");
			}
			/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
			ajaxSendPost(getRptMailHistory, "reqVal", "&goWhere=aj&bcKey=getRptMailHistory&intg_bl_seq=" + formObj.intg_bl_seq.value
					+ "&inv_seq=" + inv_seq
					+ "&his_type=" + his_type
					+ "&his_call_view=" + his_call_view
					+ "&his_call_file=" + his_call_file
					+ "&his_title=" + his_title
					, "./GateServlet.gsl");				
			/*
				정의)
					short SendMailEx2(short nMode, BSTR lpFrom, BSTR lpSubject, BSTR lpBody, BSTR lpTo, BSTR lpToCc, BSTR lpToBcc, BSTR lpAttachFileName);
				인수)
					nMode: 0이면 설정값으로 기본값이 채워진 새 메시지 창이 뜸(SendMail()과 동일), 1이면 설정값대로 바로 메일을 보냄(SendMailEx()와 동일)
					lFrom : 보내는 사람 주소(AAA<aaa@bbb.com> 과 같이 별칭입력도 가능합니다.)
					lpSubject : 메일 제목
					lpBody : 메일 내용
					lpTo : 받는 사람 주소(AAA<aaa@bbb.com> 과 같이 별칭입력도 가능하며, ';'로 구분시 여러명 발송가능)
					lpToCc : 참조로 받는 사람 주소(AAA<aaa@bbb.com> 과 같이 별칭입력도 가능하며, ';'로 구분시 여러명 발송가능)
					lpToBcc : 숨은 참조로 받는 사람 주소(AAA<aaa@bbb.com> 과 같이 별칭입력도 가능하며, ';'로 구분시 여러명 발송가능)
					lpAttachFileName : 첨부파일 경로(첨부할 파일이 여러개인 경우엔, '|'로 구분가능)
			*/
			//rdObjects[0].SendMailEx2(0, user_eml+"", lpSubject+"", emlContent+"", emlToAddr+"", "", "", lpAttachFileName);
			//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
			// Arrival Notice를 포함 전체 메일 버튼 팝업 호출되도록 수정
			if (!((rptBizTp == "" || rptBizTp == "undefined" || rptBizTp == undefined) &&
				       (rptBizSubTp == "" || rptBizSubTp == "undefined" || rptBizSubTp == undefined) &&
				           (rptTp == "" || rptTp == "undefined" || rptTp == undefined) &&
				               (rptTrdpCd == "" || rptTrdpCd == "undefined" || rptTrdpCd == undefined)) ||
				  (formObj.fileName.value.split("^@@^").length == 1)
				) {
				// mailTo 조회 & setting
				
				ajaxSendPost(getRptMailANParameters2, "reqVal", "&goWhere=aj&bcKey=getRptMailPopParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
																		+ "&rpt_biz_tp=" + formObj.rpt_biz_tp.value
																		+ "&rpt_biz_sub_tp=" + formObj.rpt_biz_sub_tp.value
																		+ "&rpt_tp=" + formObj.rpt_tp.value
																		+ "&rpt_acc_grp_id=" + formObj.rpt_acc_grp_id.value
																		+ "&rpt_trdp_cd=" + formObj.rpt_trdp_cd.value																
																		, "./GateServlet.gsl");
//			}else {	// Bug 42480 slide: 29
//				// Accounting 화면에서 필요.
//				rtnary=new Array(1);
//				rtnary[0]="";	//formObj.mailAN_param.value = "";
//				callBackFunc = "OUTLOOK2";
//				modal_center_open('./RPT_MAIL_0010.clt', rtnary, 1150,600,"yes");
//				
//				//var rtnVal = window.showModalDialog('./RPT_MAIL_0010.clt', formObj.mailAN_param.value, "scroll:yes;status:no;help:no;dialogWidth:685px;dialogHeight:480px");
//				
//			}
			//#35198[AR Aging Report] OUTLOOK 버튼이 기동하지않는 에러
			} else {
		
				lv_mailAN_param = "";
				lv_lpSubject = lpSubject;
				lv_lpAttachFileName = lpAttachFileName;
				
				// Accounting 화면에서 필요.
				rtnary=new Array(1);
				rtnary[0]="";	//formObj.mailAN_param.value = "";
				callBackFunc = "OUTLOOK2";
				modal_center_open('./RPT_MAIL_0010.clt', rtnary, 1150,550,"yes");
				
			}
		
    	break;
    	case "Mail2":
			var lpSubject=(emlTitle != "" ?  emlTitle : title);
			//var lpAttachFileName = formObj.fileName.value.split("^@@^")[0].replaceAll(".mrd", ".pdf"); //formObj.f_eml_file.value.replaceAll(".mrd", ".pdf");
			var lpAttachFileName=formObj.fileName.value.split(".")[0] + getTimeStamp()+".pdf"
			var rptBizTp=formObj.rpt_biz_tp.value;
			var rptBizSubTp=formObj.rpt_biz_sub_tp.value;
			var rptTp=formObj.rpt_tp.value;
			var rptTrdpCd=formObj.rpt_trdp_cd.value;
			/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
			var his_type="E"; // E : email, P : print
			var his_call_view=formObj.title.value;
			var his_call_file=formObj.fileName.value;
			var his_title=formObj.mailTitle.value;
			var inv_seq=formObj.f_inv_seq.value;
			// var his_1 = formObj.shpr_trdp_cd.value;
			// var his_2 = formObj.shpr_trdp_addr.value;
			// var his_3 = formObj.i_ooh_bkg_rmk.value;
			//alert(rptBizTp);
			if (!(((rptBizTp == "" || rptBizTp == "undefined" || rptBizTp == undefined) &&
				       (rptBizSubTp == "" || rptBizSubTp == "undefined" || rptBizSubTp == undefined) &&
				           (rptTp == "" || rptTp == "undefined" || rptTp == undefined) &&
				               (rptTrdpCd == "" || rptTrdpCd == "undefined" || rptTrdpCd == undefined)) ||
				  (rptBizTp == "OEH" && rptBizSubTp == "DR") ||
				  ((rptBizTp == "OIH" || rptBizTp == "AIH") && rptBizSubTp == "IT") ||
				  (rptBizTp == "ACCT" && rptBizSubTp == "AP") ||
				  (rptBizTp == "AEM" && (rptBizSubTp == "TS" || rptBizSubTp == "TU")))
				) {
				// mailTo 조회 & setting
				ajaxSendPost(getRptSmtpMailParameters, "reqVal", "&goWhere=aj&bcKey=getRptMailParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
																			+ "&rpt_biz_tp=" + rptBizTp
																			+ "&rpt_biz_sub_tp=" + rptBizSubTp
																			+ "&rpt_tp=" + rptTp
																			+ "&rpt_trdp_cd=" + rptTrdpCd
																			, "./GateServlet.gsl");
			}
    		var formObj=document.frm1;
    		//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
			//init title, content
			var rptBizSubTp=formObj.rpt_biz_sub_tp.value;
			setMailToAndCC(true,rptBizSubTp);
			frm1.f_eml_content.value += "\r\n";
    		frm1.f_eml_content.value += "\r\n";
    		frm1.f_eml_content.value += user_nm;
    		frm1.f_eml_content.value += "\r\n";
    		frm1.f_eml_content.value += user_eml;
    		frm1.f_eml_content.value += "\r\n";
    		frm1.f_eml_content.value += user_phn;
    		frm1.f_eml_content.value += "\r\n";
    		frm1.f_eml_content.value += user_fax;
    		frm1.f_eml_content.value += "\r\n";
    		//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
    		// setMailToAndCC에서 설정하므로 주석처리
    		/*
    		frm1.f_eml_to.value=frm1.mailTo.value;
    		*/
    		frm1.f_eml_title.value=lpSubject;
    		var nmArr=formObj.fileName.value.split("^@@^");
    		if (nmArr.length>1) { 
    			frm1.f_eml_file.value="Merged_"+formObj.fileName.value.split(".")[0]+".pdf";
    		} else {
    			frm1.f_eml_file.value=formObj.fileName.value.split(".")[0]+".pdf";
    		}
    		/*if(document.getElementById("mail_tab").style.display == "none"){
    			//window.resizeBy(250,0);
    			document.getElementById("mail_tab").style.display="inline";
    			$("#mainTable").css("padding-right",508);
    			//----------------[20140112 OJG]-----------------
    			//frm1.filePath.value = "C:\\clt_email\\"+lpAttachFileName;
    			//rdObjects[0].SaveASPdfFile(frm1.filePath.value);    		
    			//----------------[20140112 OJG]-----------------
    		}*/
    	break;
		case "Print":
			if (isChrome) {
				rdObjects[0].print({
					isServerSide: true,
					limitedPage: 10000
				});
			} else {
				rdObjects[0].PrintDialog();
			}
		break;
		case "CLOSE":
			window.close(); 
    	break;
    	case "Send":
    		var formObj=document.frm1;
    		// email Address를 체크한다.
    		if(formObj.f_eml_to.value == ""){
    			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_MAIL') + "\n\n: RPT_RD_0030.361");	
    			formObj.f_eml_to.focus();
    			return;
    		} 
    		formObj.f_eml_to.value=formObj.f_eml_to.value.replaceAll(";;",";");
    		formObj.f_eml_cc.value=formObj.f_eml_cc.value.replaceAll(";;",";");
    		formObj.f_eml_to.value=formObj.f_eml_to.value.replaceAll(" ","");
    		formObj.f_eml_cc.value=formObj.f_eml_cc.value.replaceAll(" ","");
    		if(checkAllEml(formObj.f_eml_to.value.replaceAll(";",","))==false){
    			formObj.f_eml_to.focus();
    			return;
    		}
    		if(checkAllEml(formObj.f_eml_cc.value.replaceAll(";",","))==false){
    			formObj.f_eml_cc.focus();
    			return;
    		}
    		if(formObj.f_eml_title.value == ""){
    			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('TIT') + "\n\n: RPT_RD_0030.373");	
    			formObj.f_eml_title.focus();
    			return;
    		}
    		// 첨부된 File에서 File명을 분리한다.
    		if (setAttOnlyFileName()==false){
    			// 파일 확장자가 없을때
    			alert(getLabel('FMS_COM_ALT059')+ "\n\n: RPT_RD_0030.381");	
    			return;   			
    		}
    		formObj.f_cmd.value=MODIFY;
    		formObj.target="ifr_hidden";
			formObj.action="./RPT_RD_0031.clt";
			formObj.submit();
    	break;
    	case "Mail_Close":
			// window.resizeBy(-250,0);
			document.getElementById("mail_tab").style.display="none";
			
			if (isChrome) {
				$("#mainTable").css("padding-right",0);
			}else{
				$("#mainTable").css("padding-right",12);
			}
			
			$("#m2soft-crownix-container").css("width","100%");
			$("#m2soft-crownix-container").css("transform","translate(0px, 12px)");
			$("#m2soft-crownix-container").css("top","33px");
			$("#m2soft-crownix-page").css("width","825.243px");
					
			var v_ratio = ($("#crownix-toolbar #crownix-toolbar-ratio div").text().replace("%","")) / 100;
			var totalWidth = (((($("#m2soft-crownix-container").css("width")).replace("px","")) / 2) - (Math.round((849.234 * v_ratio) / 2))) + "px";
			
			$("#m2soft-crownix-page").css("transform","translate("+totalWidth+", 0px) scale("+v_ratio+")");
			
    	break;
    	case "EML_TO_POPLIST":
    		var formObj=document.frm1;
    		//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
			var rptBizSubTp=formObj.rpt_biz_sub_tp.value;
			setMailToAndCC(true,rptBizSubTp);
			/*
    		rtnary=new Array(1);
	   		rtnary[0]="1";
   	        var rtnVal =  ComOpenWindow('./CMM_POP_0360.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px" , true);
   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				if(formObj.f_eml_to.value != "" ){
					formObj.f_eml_to.value += ";" + rtnValAry[0];//eml
					formObj.f_eml_to.value=formObj.f_eml_to.value.replaceAll(";;", ";");
				}else{
					formObj.f_eml_to.value += rtnValAry[0];//eml
				}
			}
			*/
		break;
    	case "EML_CC_POPLIST":
    	    var formObj=document.frm1;
    		//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
			var rptBizSubTp=formObj.rpt_biz_sub_tp.value;
			setMailToAndCC(false,rptBizSubTp);
			/*
    		rtnary=new Array(1);
    		rtnary[0]="1";
    		var rtnVal =  ComOpenWindow('./CMM_POP_0360.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px" , true);
    		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
    			return;
    		}else{
    			var rtnValAry=rtnVal.split("|");
    			if(formObj.f_eml_cc.value != "" ){
					formObj.f_eml_cc.value += ";" + rtnValAry[0];//eml
					formObj.f_eml_cc.value=formObj.f_eml_cc.value.replaceAll(";;", ";");
				}else{
					formObj.f_eml_cc.value += rtnValAry[0];//eml
				}
    		}
    		*/
    	break;
    }
}
function FAX(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		formObj.fax_no.value=rtnVal; //fax
	}
	//alert(formObj.fax_no.value);
	//return;
	formObj.f_cmd.value=COMMAND01;
	formObj.target="ifr_hidden";
	formObj.action="./RPT_RD_0011.clt";
	formObj.submit();
}

//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
function setANMailTo (rtnVal) {
	var strRtnVal="";
	if (typeof(rtnVal) != 'undefined' && rtnVal != undefined && rtnVal != "") {
		var rtnListArr=rtnVal.split('^^');
		for(var i=0; i < rtnListArr.length ; i++) {
			var rtnArr=rtnListArr[i].split('@@');
			strRtnVal +=  rtnArr[0] + "<" + rtnArr[1] + ">;";
		}
		//lv_mailAN_param = strRtn;
	}
	return strRtnVal;
}
//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
var flg = false;
function setMailToAndCC(toFlg,rptBizSubTp){
	flg = toFlg;
	var formObj=document.frm1;
	//var rptBizSubTp = formObj.rpt_biz_sub_tp.value;
	var lpSubject=(formObj.mailTitle.value != ""?  formObj.mailTitle.value: formObj.title.value);
	var lpAttachFileName=formObj.fileName.value.replaceAll(".mrd", ".pdf");
	var rptBizTp=formObj.rpt_biz_tp.value;
	var rptTp=formObj.rpt_tp.value;
	var rptTrdpCd=formObj.rpt_trdp_cd.value;
	// MAIL TO SET
	if (toFlg) {
		if (!(((rptBizTp == "" || rptBizTp == "undefined" || rptBizTp == undefined) &&
			       (rptBizSubTp == "" || rptBizSubTp == "undefined" || rptBizSubTp == undefined) &&
			           (rptTp == "" || rptTp == "undefined" || rptTp == undefined) &&
			               (rptTrdpCd == "" || rptTrdpCd == "undefined" || rptTrdpCd == undefined)) ||
			  (rptBizTp == "OEH" && rptBizSubTp == "DR") ||
			  ((rptBizTp == "OIH" || rptBizTp == "AIH") && rptBizSubTp == "IT") ||
			  (rptBizTp == "ACCT" && rptBizSubTp == "AP") ||
			  (rptBizTp == "AEM" && (rptBizSubTp == "TS" || rptBizSubTp == "TU")))
			) {
			// mailTo 조회 & setting
			ajaxSendPost(getRptMailANParameters, "reqVal", "&goWhere=aj&bcKey=getRptMailPopParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
																		+ "&rpt_biz_tp=" + rptBizTp
																		+ "&rpt_biz_sub_tp=" + rptBizSubTp
																		+ "&rpt_tp=" + formObj.rpt_tp.value
																		+ "&rpt_trdp_cd=" + formObj.rpt_trdp_cd.value
																		, "./GateServlet.gsl");
		}
	} else {
		// MAIL CC SET
		var rptCcTrdpCd=formObj.rpt_cc_trdp_cd.value;
		if(rptCcTrdpCd != ""){
			if (!(((rptBizTp == "" || rptBizTp == "undefined" || rptBizTp == undefined) &&
				       (rptBizSubTp == "" || rptBizSubTp == "undefined" || rptBizSubTp == undefined) &&
				           (rptTp == "" || rptTp == "undefined" || rptTp == undefined) &&
				               (rptTrdpCd == "" || rptTrdpCd == "undefined" || rptTrdpCd == undefined)) ||
				  (rptBizTp == "OEH" && rptBizSubTp == "DR") ||
				  ((rptBizTp == "OIH" || rptBizTp == "AIH") && rptBizSubTp == "IT") ||
				  (rptBizTp == "ACCT" && rptBizSubTp == "AP") ||
				  (rptBizTp == "AEM" && (rptBizSubTp == "TS" || rptBizSubTp == "TU")))
				) {
				// mailTo 조회 & setting
				ajaxSendPost(getRptMailANParameters, "reqVal", "&goWhere=aj&bcKey=getRptMailParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
																			+ "&rpt_biz_tp=" + rptBizTp
																			+ "&rpt_biz_sub_tp=" + rptBizSubTp
																			+ "&rpt_tp=" + rptTp
																			+ "&rpt_trdp_cd=" + rptCcTrdpCd
																			, "./GateServlet.gsl");
			}
		}
	}
	
	
//	var rtnVal =  ComOpenWindow('./RPT_MAIL_0010.clt',  lv_mailAN_param,  "scroll:yes;status:no;help:no;dialogWidth:685px;dialogHeight:480px" , true);
	
	callBackFunc = "RPT_MAIL";
	rtnary=new Array(1);
	rtnary[0] = lv_mailAN_param;
	modal_center_open('./RPT_MAIL_0010.clt', lv_mailAN_param, 1150,550,"yes");
}

function RPT_MAIL(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == "none" || rtnVal == undefined) {
		rtnVal = "";
		if(document.getElementById("mail_tab").style.display == "none"){
			document.getElementById("mail_tab").style.display="inline";			
			
			if (isChrome) {
				var v_ratio = ($("#crownix-toolbar #crownix-toolbar-ratio div").text().replace("%","")) / 100;
				$("#m2soft-crownix-page").css("transform","scale("+v_ratio+")");
				$("#mail_tab").css("margin-top","100px");
				$("#m2soft-crownix-container").css("width","calc(100% - 508px)");
				$("#m2soft-crownix-page").css("width","calc(100% - 508px)");
			} else {
				$("#mail_tab").css("margin-top","50px");
				$("#mainTable").css("width","100%");
				$("#mainTable").css("padding-right",508);
			}
			
		}
		return;
	}else{
		if (typeof(rtnVal) != 'undefined' && rtnVal != undefined && rtnVal != "") {
			var rtnListArr=rtnVal.split('^^');
			var strRtn="";
			for(var i=0; i < rtnListArr.length ; i++) {
				var rtnArr=rtnListArr[i].split('@@');
				strRtn +=  rtnArr[1] + ";";
			}
			if (flg) {
				formObj.f_eml_to.value=strRtn;
			} else {
				formObj.f_eml_cc.value=strRtn;
			}
			if(document.getElementById("mail_tab").style.display == "none"){
				document.getElementById("mail_tab").style.display="inline";
				if (isChrome) {
					var v_ratio = ($("#crownix-toolbar #crownix-toolbar-ratio div").text().replace("%","")) / 100;
					$("#m2soft-crownix-page").css("transform","scale("+v_ratio+")");
					$("#mail_tab").css("margin-top","100px");
					$("#m2soft-crownix-container").css("width","calc(100% - 508px)");
					$("#m2soft-crownix-page").css("width","calc(100% - 508px)");
				} else {
					$("#mail_tab").css("margin-top","50px");
					$("#mainTable").css("width","100%");
					$("#mainTable").css("padding-right",508);
				}
			}
		}
	}
}

function OUTLOOK2(rtnVal){
	var formObj=document.frm1;
	// 이메일 대상자가 없는경우
	if (rtnVal == "none") {
		rtnVal = "";
		//select 버튼만 클릭해도 outlook과 연계
		//return;
	// IE 의 X 아이콘으로 닫았을 경우, OUTLOOK 실행 안되게 하기 위해
	}else if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		
		var retMailTo = setANMailTo(rtnVal);
		
		if (retMailTo != "") {
			formObj.mailAN_return.value = retMailTo;
		}
	}	
//	lv_lpSubject = lpSubject;
//	lv_lpAttachFileName = lpAttachFileName;
	// OutLook호출(ajax와의 동기화)
	setTimeout("sendMailAN(\'"+formObj.mailAN_return.value+"\'\,\'"+ user_eml +"\'\,\'"+ lv_lpSubject +"\'\,\'"+ lv_lpAttachFileName + "\' )", 1000);
	
}

//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
function getRptMailANParameters(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		lv_mailAN_param=doc;
	}
}
//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정(OUTLOOK)
function getRptMailANParameters2(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		lv_mailAN_param=doc;
//		var rtnVal =  ComOpenWindow('./RPT_MAIL_0010.clt',  lv_mailAN_param,  "scroll:yes;status:no;help:no;dialogWidth:685px;dialogHeight:480px" , true);
		
		callBackFunc = "RptMail";
		modal_center_open('./RPT_MAIL_0010.clt', lv_mailAN_param, 1150,550,"yes");
	}
}

function RptMail(rtnVal){
	if (rtnVal == "none") {
		lv_mailAN_return = "";
		//select 버튼만 클릭해도 outlook과 연계
		//return;
	// IE 의 X 아이콘으로 닫았을 경우, OUTLOOK 실행 안되게 하기 위해
	}else if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		
		var retMailTo = setANMailTo(rtnVal);
		
		if (retMailTo != "") {
			lv_mailAN_return = retMailTo;
		}
	}
	// OutLook호출(ajax와의 동기화)
	setTimeout("sendMailAN(\'"+lv_mailAN_return+"\'\,\'"+ user_eml +"\'\,\'"+ lv_lpSubject +"\'\,\'"+ lv_lpAttachFileName + "\' )", 1000);
}

//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
function sendMailAN(mailAN_return, user_eml, lpSubject,lpAttachFileName){
	//if (mailAN_return != "") {
	
	var content_val = "\r\n";
	content_val += "\r\n";
	content_val += user_ofc_cnt_nm;
	content_val += "\r\n";
	content_val += user_nm;
	content_val += "\r\n";
	content_val += user_eml;
	content_val += "\r\n";
	content_val += user_phn;
	content_val += "\r\n";
	content_val += user_fax;
	content_val += "\r\n";
	
	if (isChrome) {
		var link = "mailto:"+mailAN_return
        		   + "&subject=" + escape(lpSubject)
                   + "&body=" + escape(content_val)
        window.location.href = link;
	} else {
		rdObjects[0].SendMailEx2(0, user_eml+"", lpSubject +"", content_val, mailAN_return +"", "", "", lpAttachFileName+"");
	}
		
	//}
}
var flag2=false;
var flag3=false;
var flag4=false;
var flag5=false;
function set2file(){
	if(!flag2){
		document.getElementById("f_eml_content").SetSheetHeight("427");
		document.getElementById("file2").style.display="inline";
		document.getElementById("fileName2").style.display="inline";
		document.getElementById("img2").style.display="inline";
		flag2=true;
	}
}
function set3file(){
	if(!flag3){
		document.getElementById("f_eml_content").SetSheetHeight("404");
		document.getElementById("file3").style.display="inline";
		document.getElementById("fileName3").style.display="inline";
		document.getElementById("img3").style.display="inline";
		flag3=true;
	}
}
function set4file(){
	if(!flag4){
		document.getElementById("f_eml_content").SetSheetHeight("381");
		document.getElementById("file4").style.display="inline";
		document.getElementById("fileName4").style.display="inline";
		document.getElementById("img4").style.display="inline";
		flag4=true;
	}
}
function set5file(){
	if(!flag5){
		document.getElementById("f_eml_content").SetSheetHeight("358");
		document.getElementById("file5").style.display="inline";
		document.getElementById("fileName5").style.display="inline";
		flag5=true;
	}
}
function getRptMailParameters(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != "undefined" && doc[1] != undefined && doc[1] != "") {
			emlToAddr=doc[1];
		}
	}
}
function getRptSmtpMailParameters(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != 'undefined' && doc[1] != undefined && doc[1] != "") {
			var rtnArr=doc[1].split('@@');
			formObj.mailTo.value=rtnArr[1];
		}
	}
}
/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
function getRptMailHistory(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != "undefined" && doc[1] != undefined && doc[1] != "") {
			emlToAddr=doc[1];
		}
	}
}
/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
function registRptPrintHistory(){
	var formObj=document.frm1;
	/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
	var his_type="P"; // E : email, P : print
	var his_call_view=formObj.title.value;
	var his_call_file=formObj.fileName.value;
	var his_title=formObj.f_eml_title.value;
	var inv_seq=formObj.f_inv_seq.value;
	// OEM List  에서 print 눌렀을때
	if(his_call_file == 'SR_SEA.mrd')
	{
		if(formObj.rpt_intg_bl_seq.value != null && formObj.rpt_intg_bl_seq.value != '')
		{
			formObj.intg_bl_seq.value=formObj.rpt_intg_bl_seq.value;
		}
	}
	/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
	ajaxSendPost(getRptMailHistory, "reqVal", "&goWhere=aj&bcKey=getRptMailHistory&intg_bl_seq=" + formObj.intg_bl_seq.value
			+ "&inv_seq=" + inv_seq
			+ "&his_type=" + his_type
			+ "&his_call_view=" + his_call_view
			+ "&his_call_file=" + his_call_file
			+ "&his_title=" + his_title
			, "./GateServlet.gsl");		
}
/*
function savetif_and_upload_clicked() {  
	var success=rdObjects[0].SaveASPdfFile(frm1.filePath.value);
	//var success = Rdviewer.SaveAsImagefile ("c:/mymy.tif", 0);
	if (success==true) {  
		alert("SaveAsImagefile success !     file : " + frm1.filePath.value);
		formObj.f_cmd.value=MODIFY;
		try {
			var success1=rdObjects[0].UploadDataFile("C:\\clt_email\\testl.pdf", "/BACKUP/xxxxyyyy.pdf");
			//var success1 = Rdviewer.UploadDataFile("C:\\clt_email\\testl.pdf", "/BACKUP/xxxxyyyy.pdf");
		} catch (e){
			alert(e);
		}
		alert(success1);
		if (success1==true) {
			alert("UploadDataFileEx success !");  
			return true;
		} else {      
			alert("UploadDataFileEx fail !");    
		}
	} else {
		alert("SaveAsImagefile fail !");  
	}
	return success;
}*/
/* 20140520 LSY mod 팩스값 셋팅 버그로 인하여 아래 메소드로 수정
function getRptFaxParameters(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	alert("doc : " + doc);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != 'undefined' && doc[1] != undefined && doc[1] != "") {
			var rtnArr=doc[1].split('@@');
			alert("rtnArr : " + rtnArr);
			formObj.fax_no.value=rtnArr[2];
			alert("formObj.fax_no.value : " + formObj.fax_no.value);
		}
	}
}
*/
function getRptFaxParameters(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		formObj.fax_param.value=doc;
		// 테스트용 formObj.fax_param.value = "OK,DOOSAN MOTTROL CO. LTD@@OJG DOOSAN@@Import@@00044445555^^aa MOTTROL CO. LTD@@aa DOOSAN@@aa@@123"
	}
}
/**
 * RD 파일명을 고유하기 주기 위함
 */
function getTimeStamp() {
	var d=new Date();
	var s=""+d.getHours()+""+d.getMinutes()+""+d.getSeconds();
	//var s = ""+d.getHours()+""+d.getMinutes()+""+d.getSeconds()+""+d.getMiliseconds();
	return s;
}
/**
 * 파일 패스+파일명 형태에서 파일명을 분리(1번은 PDF파일이므로 2번부터)
 */
function setAttOnlyFileName() {
	var formObj=document.frm1;
	// form값 초기화
	formObj.f_eml_file_nm2.value="";
	formObj.f_eml_file_nm3.value="";
	formObj.f_eml_file_nm4.value="";
	formObj.f_eml_file_nm5.value="";
	var f2=formObj.f_eml_file2.value;
	var f3=formObj.f_eml_file3.value;
	var f4=formObj.f_eml_file4.value;
	var f5=formObj.f_eml_file5.value;
	if (f2 != ""  && f2 != "undefined" && f2 != undefined ) {
		var splitFile=f2.split("\\");
		var splitFileName=splitFile[splitFile.length-1];
		if (splitFileName != ""  && splitFileName != "undefined" && splitFileName != undefined ) {
			formObj.f_eml_file_nm2.value=splitFileName;
		}
		if (splitFileName.indexOf(".") < 0) {
			formObj.f_eml_file2.focus();
			return false;
		}
	}
	if (f3 != ""  && f3 != "undefined" && f3 != undefined ) {
		var splitFile=f3.split("\\");
		var splitFileName=splitFile[splitFile.length-1];
		if (splitFileName != ""  && splitFileName != "undefined" && splitFileName != undefined ) {
			formObj.f_eml_file_nm3.value=splitFileName;
		}
		if (splitFileName.indexOf(".") < 0) {
			formObj.f_eml_file3.focus();
			return false;
		}
	}
	if (f4 != ""  && f4 != "undefined" && f4 != undefined ) {
		var splitFile=f4.split("\\");
		var splitFileName=splitFile[splitFile.length-1];
		if (splitFileName != ""  && splitFileName != "undefined" && splitFileName != undefined ) {
			formObj.f_eml_file_nm4.value=splitFileName;
		}
		if (splitFileName.indexOf(".") < 0) {
			formObj.f_eml_file4.focus();
			return false;
		}
	}
	if (f5 != ""  && f5 != "undefined" && f5 != undefined ) {
		var splitFile=f5.split("\\");
		var splitFileName=splitFile[splitFile.length-1];
		if (splitFileName != ""  && splitFileName != "undefined" && splitFileName != undefined ) {
			formObj.f_eml_file_nm5.value=splitFileName;
		}
		if (splitFileName.indexOf(".") < 0) {
			formObj.f_eml_file5.focus();
			return false;
		}
	}
	return true;
}

function setRptZoomRatioReq(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
    	RPT_ZOOM_RATIO = doc[1];
    }
}

function setUseActivexReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
		//N 으로 설정되어 있다면 Html5버젼으로, 아니면 ActiveX버젼으로 설정한다.
		PRN_USE_ACTIVEX = doc[1]=="N"?false:true;
	}
}

function setWasPortReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
		PRN_WAS_PORT = doc[1];
	}
}