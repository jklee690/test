//=========================================================
//*@FileName   : MGT_NTC_0020.jsp
//*@FileTitle  : 게시판 등록화면
//*@Description: 게시판 등록/수정화면입니다.
//*@author     : Kang,Jung-Gu - Cyberlogitec
//*@version    : 1.0 - 02/05/2009
//*@since      : 02/05/2009
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 21/07/2014
//*@since      : 21/07/2014
//=========================================================
function loadPage(){
	var formObj=document.fName;
	if(formObj.save_yn.value =="Y"){
		//alert(getLabel('FMS_COM_NTYCOM'));
		//showCompleteProcess();
    	//doShowProcess();
    	fName2.action='./NoticeList.clt';
    	fName2.submit();
	}
	
	
	// Notice를 Email보낼 그룹메일정보를 취득한다. 
	ajaxSendPost(getComEmlAddr, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key=COM_EML_ADDR", "./GateServlet.gsl");
}

function getComEmlAddr(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined && doc[1]!="") {
		$("#eml_to").show();
		fName.eml_addr.value = doc[1];
	} else {
		$("#eml_to").hide();
	}
}

function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    try {
        switch(srcName){
	        case "SEARCHLIST":	//조회
	        	doShowProcess();
	        	fName2.action='./NoticeList.clt';
	        	fName2.submit();
		    break;
            case "ADD":			//등록
                if(checkAddModiVal(fName)){
                	
            		// 첨부된 File에서 File명을 분리한다.
            		if (setAttOnlyFileName()==false){
            			// 파일 확장자가 없을때
            			alert(getLabel('FMS_COM_ALT059'));	
            			return;   			
            		}         
            		
            		// Send Email 체크 되었는지 확인 
            		if (fName.mail_yn.checked){
            			fName.mail_yn.value = "Y";
            		} else{
            			fName.mail_yn.value = "N";            			
            		} 
                	
	            	//Do you want to proceed?
                	//if(confirm(getLabel('FMS_COM_CFMSAV'))){
	            		doShowProcess();
	            		fName.save_yn.value="Y";
		        	    fName.f_cmd.value=ADD;
		   		    	fName.action='./NoticeMngRead.clt';
		                fName.submit();
	            	//}
                }
    	    break;
            case "MODIFY":		//수정
                if(checkAddModiVal(fName)){    
                	
            		// 첨부된 File에서 File명을 분리한다.
            		if (setAttOnlyFileName()==false){
            			// 파일 확장자가 없을때
            			alert(getLabel('FMS_COM_ALT059'));	
            			return;   			
            		}  
                	
            		// Send Email 체크 되었는지 확인 
            		if (fName.mail_yn.checked){
            			fName.mail_yn.value = "Y";
            		} else{
            			fName.mail_yn.value = "N";            			
            		} 
            			
            		
                	//if(confirm(getLabel('FMS_COM_CFMSAV'))){
	            		doShowProcess();
	            		fName.save_yn.value="Y";
		        	    fName.f_cmd.value=MODIFY;
		   		    	fName.action='./NoticeMngRead.clt';
		                fName.submit();
	            	//}
                }
    	    break;
            case "REMOVE":		//게시물 삭제
            	if(confirm(getLabel('FMS_COM_CFMDEL'))){
            		doShowProcess();
	        	    fName.f_cmd.value=REMOVE;
	   		    	fName.action='./NoticeMngRead.clt';
	                fName.submit();
            	}
    	    break;
            case "REMOVE01":	//첨부파일 삭제
            	if(confirm(getLabel('FMS_COM_CFMDEL'))){
            		doShowProcess();
            		fName.save_yn.value="Y";
            		fName.file_no.value=1;
	        	    fName.f_cmd.value=REMOVE01;
	   		    	fName.action='./NoticeMngRead.clt';
	                fName.submit();
            	}
    	    break;
            case "REMOVE02":	//첨부파일 삭제
            	if(confirm(getLabel('FMS_COM_CFMDEL'))){
            		doShowProcess();
            		fName.save_yn.value="Y";
            		fName.f_cmd.value=REMOVE01;
            		fName.file_no.value=2;
            		fName.action='./NoticeMngRead.clt';
            		fName.submit();
            	}
            	break;
            case "REMOVE03":	//첨부파일 삭제
            	if(confirm(getLabel('FMS_COM_CFMDEL'))){
            		doShowProcess();
            		fName.save_yn.value="Y";
            		fName.file_no.value=3;
            		fName.f_cmd.value=REMOVE01;
            		fName.action='./NoticeMngRead.clt';
            		fName.submit();
            	}
            	break;
        } // end switch
    }catch(e) {
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
function checkAddModiVal(fName){
    var isOk=checkFileExt(fName.brd_file.value, noticeDocExt);	//파일 확장자 확인
    if(!isOk){
    	//'You cannot upload the file with not permitted file extension!\r\n\r\nPermitted file extensions are as follows.')+' ['+noticeDocExt+']');
    	alert(getLabel('FMS_COM_ALT027') + noticeDocExt);
    }
    if(fName.brd_file.value!=''){
    	if(getFileNameLength(fName.brd_file.value)>40){
    		//Please modify the name of selected file!\r\n\r\nIts name should be limited to 40 characters or less.
    		alert(getLabel('SYS_COM_ALT002'));
    		return false;
    	}	
    }
    //Expire Date
    if(checkInputVal(fName.dp_end_dt.value, 10, 10, "D", getLabel('SYS_COD_EXDT'))!='O'){
    	isOk=false;
    //Title
    }else if((fName.brd_tit.value).length == 0){
    	alert(getLabel('FMS_COM_ALT007'));
    	isOk=false;
    //Contents
    }else if((fName.brd_ctnt.value).length == 0){
    	alert(getLabel('FMS_COM_ALT007'));
    	isOk=false;
    }
    if(isOk){
    	return true;
    }
}
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 
            var cal=new ComCalendar();
            cal.select(formObj.dp_end_dt, 'yyyy-MM-dd');
        break;
    }
}
/**
 * 게시기간 설정관
 */
function doDispDate(obj){
	var tmpObj=getObj('dateDispObj'); 
	if(obj.value=='P'){
		tmpObj.style.display='none';
		fName.dp_end_dt.value='3000-12-31';
	}else{
		tmpObj.style.display='block';
		fName.dp_end_dt.value='';
	}
}
function setDfDate(){
	if(fName.dp_end_dt.value==''){
		fName.dp_end_dt.value='3000-12-31';
	}
}
function complete(){
	//alert(getLabel('FMS_COM_NTYCOM'));	
	showCompleteProcess();
}


/**
 * 파일 패스+파일명 형태에서 파일명을 분리(1번은 PDF파일이므로 2번부터)
 */
function setAttOnlyFileName() {
	var formObj=document.fName;
	// form값 초기화
	formObj.f_eml_file_nm1.value="";
	formObj.f_eml_file_nm2.value="";
	formObj.f_eml_file_nm3.value="";
	var f1=formObj.brd_file.value;
	var f2=formObj.brd_file2.value;
	var f3=formObj.brd_file3.value;
	if (f1 != ""  && f1 != "undefined" && f1 != undefined ) {
		var splitFile=f1.split("\\");
		var splitFileName=splitFile[splitFile.length-1];
		if (splitFileName != ""  && splitFileName != "undefined" && splitFileName != undefined ) {
			formObj.f_eml_file_nm1.value=splitFileName;
		}
		if (splitFileName.indexOf(".") < 0) {
			formObj.f_eml_file1.focus();
			return false;
		}
	}
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
	return true;
}
