// 공통전역변수
var docObjects = new Array();
var sheetCnt = 0;
var rdObjects = new Array();
var rdCnt = 0;
var isChrome = false;
var RPT_ZOOM_RATIO = "1.5";

function loadPage() {
    
	var org_bl_qty = document.frm1.org_bl_qty.value;
//	if(org_bl_qty == ""){
//	}else 
	if(org_bl_qty>3){
		//Original B/L Print 횟수가 " + org_bl_qty + "회 입니다.
		alert(getLabel2('PFM_COM_ALT008', new Array(org_bl_qty))+ "\n\n: RPT_PRN_0010.13");	
		//window.close();
	}
	
	setRdInit(rdObjects[0]);

	document.getElementById("mainTable").height = screen.height - 150;
	
	
}


function loadPageHtml5() {	
	
	var opt_key = "RPT_ZOOM_RATIO";
	ajaxSendPost(setRptZoomRatioReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	document.getElementById("mainTable").height = screen.height - 150;
	isChrome = true;	
    var host = location.origin;
	var viewer = new m2soft.crownix.Viewer( host+'/ReportingServer/service', "mainTable");
	rdObjects[0] = viewer;
	setRdInit(rdObjects[0]);
}


/**
 * Report Design 환경을 초기화한다.
 */
function setRdInit(objRd){

	var formObj=document.frm1;
	objRd.height = (screen.height - 220) + "px";
	if(formObj.fileName.value=="air_label_01.mrd" || formObj.fileName.value == "air_mbl_label_01.mrd" || formObj.fileName.value=="package_label.mrd" || formObj.fileName.value=="check_journal_01.mrd"){
		objRd.AutoAdjust=false;
		objRd.ZoomRatio=100;
	}else{
		objRd.AutoAdjust=2;

		// US, CA 이외(현재는 DE)에는 RD에 LETTER로 설정되어 있어도 기본값을 A4로 설정한다.
		if (!isChrome) {
			if (user_ofc_cnt_cd=="DE") {
				objRd.SetPrint2(1,1,1,100); // A4
			}
		} else {
			// 현재 정상작동 안됨
			//objRd.zoom(1.5);
		}
	}
	var rptFilePath = rpt_file_path;
	if(rptFilePath == "") {
		rptFilePath = "C:\\opus\\";
	} else if(rptFilePath.substring(rptFilePath.length,rptFilePath.length-1)!="\\") {
		rptFilePath = rptFilePath + "\\";
	}

	if (!isChrome) {
	    objRd.SetSaveDialogEx(rptFilePath, "", "xls@doc@pdf@tif@bmp", "pdf");
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
	
	var rdParamVal = "";	
	if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA"){
		RD_path += "letter/";
		//objRd.FileOpen(RD_path+formObj.fileName.value, RDServer+'/rp '+formObj.rdParam.value + " /riprnmargin");
		rdParamVal = RDServer+'/rp '+formObj.rdParam.value + "/riprnmargin  /rpptexportapitype [1]";
	}else{
		//objRd.FileOpen(RD_path+formObj.fileName.value, RDServer+'/rp '+formObj.rdParam.value);
		rdParamVal = RDServer+'/rp '+formObj.rdParam.value + "/rpptexportapitype [1]";
	}
	
	if (!isChrome) {
		objRd.FileOpen(RD_path+formObj.fileName.value,rdParamVal);
	} else {
		objRd.openFile(RD_path+formObj.fileName.value,rdParamVal, {timeout:1200, defaultZoom : Number(RPT_ZOOM_RATIO) ,defaultZoomCentre:'LEFTTOP',keepZoomRatio:'true'});
	}
	
}

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.frm1;
    
    switch(srcName) {
    	case "Fax":
//    		rdObjects[0].SetSaveDialog("C:/", "제목없음", 6);
//    		rdObjects[0].SaveASDialog();

			var lpSubject = (formObj.mailTitle.value != ""?  formObj.mailTitle.value: formObj.title.value);
			var lpAttachFileName = formObj.fileName.value.replaceAll(".mrd",  ".tif");

			var rptBizTp = formObj.rpt_biz_tp.value;
			var rptBizSubTp = formObj.rpt_biz_sub_tp.value;
			var rptTp = formObj.rpt_tp.value
			var rptTrdpCd = formObj.rpt_trdp_cd.value
			
			/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
			var his_type = "F"; // E : email, P : print, F : FAX
			var his_call_view = formObj.title.value;
			var his_call_file = formObj.fileName.value;
			var his_title = formObj.mailTitle.value;	
			var inv_seq = formObj.f_inv_seq.value;

			if (!(((rptBizTp == "" || rptBizTp == "undefined" || rptBizTp == undefined) &&
				       (rptBizSubTp == "" || rptBizSubTp == "undefined" || rptBizSubTp == undefined) &&
				           (rptTp == "" || rptTp == "undefined" || rptTp == undefined) &&
				               (rptTrdpCd == "" || rptTrdpCd == "undefined" || rptTrdpCd == undefined)) ||
				  (rptBizTp == "OIM" && rptBizSubTp == "DS"))
				) {    // Ocean Import > Master B/L >Devanning / Segregation 일 경우는 parameter로 받음
				// mailTo 조회 & setting
				ajaxSendPost(getRptFaxParameters, "reqVal", "&goWhere=aj&bcKey=getRptMailParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
																			+ "&rpt_biz_tp=" + rptBizTp
																			+ "&rpt_biz_sub_tp=" + rptBizSubTp
																			+ "&rpt_tp=" + formObj.rpt_tp.value
																			+ "&rpt_trdp_cd=" + formObj.rpt_trdp_cd.value
																			, "./GateServlet.gsl");
			}
    		
    		
    		var formObj = document.frm1;    		
    		formObj.f_cmd.value = COMMAND01;
    		formObj.target = "ifr_hidden";
			formObj.action = "./RPT_RD_0011.clt";
			formObj.submit();
    		
    	break;
    	
    	case "Mail":
			var lpSubject = (formObj.mailTitle.value != ""?  formObj.mailTitle.value: formObj.title.value);
			var lpAttachFileName = formObj.fileName.value.replaceAll(".mrd",  ".pdf");

			var rptBizTp = formObj.rpt_biz_tp.value;
			var rptBizSubTp = formObj.rpt_biz_sub_tp.value;
			var rptTp = formObj.rpt_tp.value
			var rptTrdpCd = formObj.rpt_trdp_cd.value
			
			/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
			var his_type = "E"; // E : email, P : print
			var his_call_view = formObj.title.value;
			var his_call_file = formObj.fileName.value;
			var his_title = formObj.mailTitle.value;	
			var inv_seq = formObj.f_inv_seq.value;

			if (!(((rptBizTp == "" || rptBizTp == "undefined" || rptBizTp == undefined) &&
				       (rptBizSubTp == "" || rptBizSubTp == "undefined" || rptBizSubTp == undefined) &&
				           (rptTp == "" || rptTp == "undefined" || rptTp == undefined) &&
				               (rptTrdpCd == "" || rptTrdpCd == "undefined" || rptTrdpCd == undefined)) ||
				  (rptBizTp == "OIM" && rptBizSubTp == "DS"))
				) {    // Ocean Import > Master B/L >Devanning / Segregation 일 경우는 parameter로 받음
				// mailTo 조회 & setting
				ajaxSendPost(getRptMailParameters, "reqVal", "&goWhere=aj&bcKey=getRptMailParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
																			+ "&rpt_biz_tp=" + rptBizTp
																			+ "&rpt_biz_sub_tp=" + rptBizSubTp
																			+ "&rpt_tp=" + formObj.rpt_tp.value
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
				var link = "mailto:"+formObj.mailTo.value
     		   			   + "&subject=" + escape(lpSubject)
     		   			   + "&body=" + escape(content_val)
     		   	window.location.href = link;
			} else {
				rdObjects[0].SendMailEx2(0, user_eml+"", lpSubject+"", "", formObj.mailTo.value+"", "", "", lpAttachFileName+"");
			}
			
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
    }
}


function getRptMailParameters(reqVal){
	var formObj = document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != 'undefined' && doc[1] != undefined && doc[1] != "") {

			var rtnArr = doc[1].split('@@');
			formObj.mailTo.value = rtnArr[0];
			
		}
	}
}

function getRptFaxParameters(reqVal){
	var formObj = document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != 'undefined' && doc[1] != undefined && doc[1] != "") {

			var rtnArr = doc[1].split('@@');
			formObj.fax_no.value = rtnArr[2];
			
		}
	}
}

/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
function getRptMailHistory(reqVal){
	var formObj = document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != 'undefined' && doc[1] != undefined && doc[1] != "") {
			formObj.mailTo.value = doc[1];
		}
	}
}

function setRptZoomRatioReq(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
    	RPT_ZOOM_RATIO = doc[1];
    }
}