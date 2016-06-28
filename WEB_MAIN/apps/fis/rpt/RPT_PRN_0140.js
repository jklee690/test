/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PN_0140.js
*@FileTitle  : Arrival Notice
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/29
=========================================================*/
function doWork(srcName){
	var formObj=document.frm1;
    switch(srcName) {
		case 'Print':
			formObj.title.value='Arrival Notice';
			//#27397 MailTitle을 f_sel_title값으로 설정 
			// 기본값 'ARRIVAL NOTICE / INVOICE [HBL No : ......';
			
			//formObj.mailTitle.value=formObj.mailTitleTmp.value;
			//formObj.mailTitle.value=formObj.mailTitle.value.replace("ARRIVAL NOTICE / INVOICE",formObj.f_sel_title.value);
			
			if(airSeaTp == "A"){
				//20130917 LHK, MRD 파일에서 처리 , arrival_notice_ai_hawb_01_logo삭제
				//27250
				//formObj.file_name.value = "arrival_notice_ai_hawb_01.mrd";
				
				
				// #46332 [ZIMEX + IML] Arrival Notice to show two charge like Binex A/N does
				// CMM =  Invoice가 2개인 Common Arrival Notice출력
				if (prn_ofc_cd == "CMM"){
					formObj.file_name.value = "arrival_notice_ai_hawb_01_CMM.mrd";
				} else if (prn_ofc_cd == "BNXC"){
					formObj.file_name.value = "arrival_notice_ai_hawb_01_BNXC.mrd";
				} else if (prn_ofc_cd == "YM"){
					formObj.file_name.value = "arrival_notice_ai_hawb_01_YM.mrd";
				} else if (prn_ofc_cd == "IGIC"){
					formObj.file_name.value = "arrival_notice_ai_hawb_01_IGIC.mrd";
				} else if (prn_ofc_cd == "BNXD"){
					formObj.file_name.value = "arrival_notice_ai_hawb_01_BNXD.mrd";
				} else if (prn_ofc_cd == "WEBT"){
					formObj.file_name.value = "arrival_notice_ai_hawb_01_WEBT.mrd";
				} else {					
					formObj.file_name.value = "arrival_notice_ai_hawb_01.mrd";
				}
				
			}else{
				//if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA" || user_ofc_cnt_cd=="DE"){
					//20130917 LHK, MRD 파일에서 처리 , arrival_notice_oi_hbl_us_01_logo
					//#24613 [GPL] Arrival Notice에다 "Place of Receipt" 추가
					
					// #46332 [ZIMEX + IML] Arrival Notice to show two charge like Binex A/N does
					// CMM =  Invoice가 2개인 Common Arrival Notice출력
					if (prn_ofc_cd == "CMM"){
						formObj.file_name.value = "arrival_notice_oi_hbl_us_01_CMM.mrd";
					} else if (prn_ofc_cd == "GPL") {
						formObj.file_name.value="arrival_notice_oi_hbl_us_01_GPL.mrd";
					} else if (prn_ofc_cd == "BNXC"){
						formObj.file_name.value="arrival_notice_oi_hbl_us_01_BNXC.mrd";
					} else if (prn_ofc_cd == "BLS"){
						formObj.file_name.value="arrival_notice_oi_hbl_us_01_BLS.mrd";
					} else if (prn_ofc_cd == "WEBT"){
						formObj.file_name.value="arrival_notice_oi_hbl_us_01_WEBT.mrd";
					} else if (prn_ofc_cd == "IGIC"){
						formObj.file_name.value="arrival_notice_oi_hbl_us_01_IGIC.mrd";
					} else if (prn_ofc_cd == "BNXD"){
						formObj.file_name.value="arrival_notice_oi_hbl_us_01_BNXD.mrd";
					} else {					
						formObj.file_name.value="arrival_notice_oi_hbl_us_01.mrd";
					}
				/*}else{
					formObj.file_name.value="arrival_notice_oi_hbl_01.mrd";
				}*/
			}
			
			// #45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴
			var mailTitle = "";
			
			if(formObj.f_sel_radio[0].checked){
				mailTitle = formObj.f_sel_title.value;	
			}else{
				mailTitle = formObj.f_txt_title.value;
			}
			
			formObj.mailTitle.value = formObj.mailTitleTmp.value;
			formObj.mailTitle.value = formObj.mailTitle.value.replace("ARRIVAL NOTICE / INVOICE",mailTitle);
			
			var attachFileName = mailTitle.toLowerCase();
			
			for(var i=0; i<attachFileName.length; i++){
				attachFileName = attachFileName.replace(/\./g, "");
				attachFileName = attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
		    }
			
			formObj.attachFileName.value = attachFileName + formObj.file_name.value.replace(".mrd","").replace("arrival_notice","");
			
			//Parameter Setting
			var param='[' + formObj.f_intg_bl_seq.value + ']';			// [1]
			if(formObj.f_sel_radio[0].checked){
				param += '[' + formObj.f_sel_title.value + ']';				// [2]
			}else{
				param += '[' + formObj.f_txt_title.value + ']';				// [2]
			}
			param += '[' + ofcCd + ']';										// [3]
			param += '[' + usrEml + ']';									// [4]
			param += '[' + usrPhn + ']';									// [5]
			param += '[' + usrFax + ']';									// [6]
			if(formObj.f_show_frt.checked){
				param += '[' + 'Y' + ']';									// [7]
			}else{
				param += '[]';												// [7]
			}			
			param += '[' + formObj.f_cust_ref_no.value.toUpperCase() + ']';	//[8] House 전용	 
			
			param += '[' + usrnm + ']';										//[9]	 
			param += '[]';													//[10] Master 전용
			param += '[http://' + location.host + ']';						// [11] TODO 삭제되어야 함 > /rv 로 대처
			
			// #47347 - [BINEX] Arrival Notice 프린트 시 아래 담당자 정보가 출력물에 추가되어야 함 (office별 관리)
			param += '[' + formObj.f_cgor_pic_info.value + ']';				// [12]
			
			// #50494 - [BNX] AIR IMPORT HAWB에 FREIGHT OPTION A/N에 표기 안되도록
			if(formObj.f_show_frt_term.checked){
				param += '[' + 'Y' + ']';									// [13]
			}else{
				param += '[]';												// [13]
			}	
			
			param += ' /rv invRptUrl[' +RD_path + 'invoice_01.mrd]';					//[20150330 OJG]  [invRptUrl] : Invoice Report URL 추가
			
			// TB_SYS_PROP에 'PRNT_LOGIN_USR', 'Y'이면
			// Login한 USERID를 파라미터로 넘긴다
			if (prn_login_usr == "Y"){
				param += ' loginUsrNm['+usrnm+']';					//[loginUsrNm]
				param += ' loginUsrTel['+usrPhn+']';					//[loginUsrTel] 
				param += ' loginUsrFax['+usrFax+']';					//[loginUsrFax]
				param += ' loginUsrEml['+usrEml+']';					//[loginUsrEml] 
			}
			
			formObj.rd_param.value=param;
			if (airSeaTp == "S") {
				formObj.rpt_biz_tp.value="OIH";
			} else if (airSeaTp == "A") {
				formObj.rpt_biz_tp.value="AIH";
			}
			formObj.rpt_biz_sub_tp.value="AN";
			formObj.rpt_pdf_file_nm.value=getPdfFileNm();
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		break;
		case "CLOSE":
	    	window.close();
    	break;
    }
}
function changeSel(){
	var formObj=document.frm1; 
	if(formObj.f_sel_radio[0].checked){
		if(formObj.f_sel_title.value.indexOf("FREIGHT INVOICE") != -1){
			formObj.f_show_frt.checked=true;
		}else{
			formObj.f_show_frt.checked=false;
		}
	}
}
/**
* Sheet 기본 설정 및 초기화
* body 태그의 onLoad 이벤트핸들러 구현
* 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
*/
function loadPage() {
	var formObj=document.frm1; 
	var intgBlSeq=formObj.intg_bl_seq.value;
	ajaxSendPost(getIntgBlInfo, 'reqVal', '&goWhere=aj&bcKey=getIntgBlInfo&intg_bl_seq='+intgBlSeq, './GateServlet.gsl');
	
	// #50494 - [BNX] AIR IMPORT HAWB에 FREIGHT OPTION A/N에 표기 안되도록
	if (airSeaTp == "A") {
		var opt_key = "AI_AN_FRT_TERM_DFT";
		ajaxSendPost(setAiAnFrtTermDftReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	}
}
function getIntgBlInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var result=doc[1].split('^@');
			frm1.f_cust_ref_no.value=result[2];
		}else{
			frm1.f_cust_ref_no.value='';
		}
	}else{
	}
}

function setAiAnFrtTermDftReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == "N"){
			formObj.f_show_frt_term.checked = false;
		}
	}
}

function getPdfFileNm(){
	var formObj=document.frm1;
	var pdfFileNm = "";
	var bl_no = formObj.f_bl_no.value;
	
	if (bl_no == "" || bl_no == "undefined" || bl_no == undefined) {
		return "";
	}
	pdfFileNm = "AN_HBL_"+bl_no;	
	return pdfFileNm;
}