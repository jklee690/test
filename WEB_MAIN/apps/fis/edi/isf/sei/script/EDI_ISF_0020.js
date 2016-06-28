function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj  = docObjects[0];
    var sheetObj2  = docObjects[1];
    
    var formObj   = document.frm1;

    switch(srcName) {
    
	   case "DEFAULT":
		    formObj.f_cmd.value = -1;
	        formObj.submit();
	        
	   break;
       
       case "SEARCHLIST":
    	   if(!chkSearchCmprPrd(false, frm1.f_etd_strdt, frm1.f_etd_enddt)){
    			return;
    	   }
    	   if(!chkSearchCmprPrd(false, frm1.f_eta_strdt, frm1.f_eta_enddt)){
    			return;
    	   }
           formObj.f_cmd.value = SEARCHLIST;

           sheetObj.DoSearch4Post("./EDI_ISF_0020GS.clt", FormQueryString(formObj));
       break;
       
       case "SEARCHLIST01":
           formObj.f_cmd.value = SEARCHLIST01;

           sheetObj2.DoSearch4Post("./EDI_ISF_0020_1GS.clt", FormQueryString(formObj));
       break;
       
       case "EXCEL":
    	   sheetObj2.speedDown2Excel(true);
       break;
    }
}

function getMain(reqVal){
	
}

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value = callPage;
	doWork('SEARCHLIST', '');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value = 1;
	doWork('SEARCHLIST');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value = 1;
	doWork('SEARCHLIST');
}

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj = document.frm1;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	
	initFinish();
	
	
	 //ETD 계산
	var now 		= new Date(); 	
	
	var nxtDt		= new Date(Date.parse(now) + 15 * 1000 * 60 * 60 * 24);
	var preDt		= new Date(Date.parse(now) - 15 * 1000 * 60 * 60 * 24);
	
	var nxtyear		= nxtDt.getYear(); 			
	var nxtmonth	= nxtDt.getMonth() + 2;
	var nxtdate		= nxtDt.getDate(); 	
	
	var preyear		= preDt.getYear();
	var premonth	= preDt.getMonth() + 1;
	var predate		= preDt.getDate();
	
	if(nxtmonth < 10){
		nxtmonth = "0"+(nxtmonth);
	}
	
	if(premonth < 10){
		premonth = "0"+(premonth);
	}
	
	if(nxtdate < 10){
		nxtdate = "0"+nxtdate;
	}
	
	if(predate < 10){
		predate = "0"+predate;
	}

	PREDATE = premonth + "-" + predate + "-" + preyear;
	NXTDATE = nxtmonth + "-" + nxtdate + "-" + nxtyear;
	
    formObj.f_etd_strdt.value = PREDATE;
    formObj.f_etd_enddt.value = NXTDATE;
    
    IBS_RestoreGridSetting(document.frm1.user_id.value, getPageURL(), docObjects[0], false);

}


/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++] = sheet_obj;
}

/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
         
	    case 1:      //IBSheet2 init
	
		    with (sheetObj) {
		       	 // 높이 설정
		            style.height = 210;
		            
		            //전체 너비 설정
		            SheetWidth = mainTable.clientWidth;
		            //SheetWidth = 400;
		
		            //Host정보 설정[필수][HostIp, Port, PagePath]
		            if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
		
		            //전체Merge 종류 [선택, Default msNone]
		            MergeSheet = msHeaderOnly;
		
		            //전체Edit 허용 여부 [선택, Default false]
		            Editable = true;
		
		            //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
		            InitRowInfo( 1, 1, 9, 100);
		
		            //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
		            InitColumnInfo(13, 0, 0, true);
		
		            // 해더에서 처리할 수 있는 각종 기능을 설정한다
		            InitHeadMode(true, true, true, true, false,false) ;
		            
		            //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		            InitHeadRow(0, "SEQ|HB/L No|MB/L No|B/L Type|ETD|ETA|POL|POD|DEL|Carrier|Vessel Name|Voyage", true);
		             
		             var cnt = 0;
		             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		             InitDataProperty(0, cnt++,  dtData,	 	 40,    daCenter,    true,    "seq",      	 		false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,   		120,    daLeft,    true,    "hbl_no",    			false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		120,    daLeft,    true,    "mbl_no",    			false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		120,    daLeft,    true,    "hbl_tp",    		false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		120,    daCenter,    true,    "etd",  				false,   "",       dfDateYmd,     	0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		120,    daCenter,    true,    "eta",   				false,   "",       dfDateYmd,     	0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		150,    daLeft,    true,    "pol",    			false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,        150,    daLeft,    true,    "pod", 				false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,        150,    daLeft,    true,    "del", 				false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,        100,  	daLeft,    true,    "carr",      			false,   "",       dfNone,          0,     false,        false);
		             InitDataProperty(0, cnt++,  dtData,        110,  	daLeft,    true,    "vsl_nm",      		false,   "",       dfNone,          0,     false,        false);
		             InitDataProperty(0, cnt++,  dtData,   		110,    daCenter,    true,    "voy",    			false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtHidden,   		110,    daCenter,    true,    "intg_bl_seq",    			false,   "",       dfNone,          0,     false,      false); 
	    			
	    			InitViewFormat(0, "etd", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	    			InitViewFormat(0, "eta", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	    			
	    			ActionMenu = "Column Hidden|-|Header Setting Save|Header Setting Reset";
	    			
	    } 
		break;
		
	    case 2:      //IBSheet2 init
		
	    with (sheetObj) {
	       	 // 높이 설정
	            style.height = 210;
	            
	            //전체 너비 설정
	            SheetWidth = mainTable.clientWidth;
	            //SheetWidth = 400;
	
	            //Host정보 설정[필수][HostIp, Port, PagePath]
	            if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	
	            //전체Merge 종류 [선택, Default msNone]
	            MergeSheet = msHeaderOnly;
	
	            //전체Edit 허용 여부 [선택, Default false]
	            Editable = true;
	
	            //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
	            InitRowInfo( 1, 1, 9, 100);
	
	            //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
	            InitColumnInfo(16, 0, 0, true);
	
	            // 해더에서 처리할 수 있는 각종 기능을 설정한다
	            InitHeadMode(true, true, true, true, false,false) ;
	            
	            //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
	            InitHeadRow(0, "Status|Transaction No|Transaction Date|ISF No|ISF Type|HB/L No|POL|ETD|POD|ETA|DEL|Importer|Selling Party|Buying Party|Consignee", true);
	             
	             var cnt = 0;
	             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
	             InitDataProperty(0, cnt++,  dtData,	     50,    daCenter,    true,    "msg_status",	 		false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,		120,    daCenter,    true,    "isf_trac_no",      	false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,		100,    daCenter,    true,    "acr_dt",      		false,   "",       dfDateYmd,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,   		100,    daCenter,    true,    "isf_no",    			false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,   		 50,    daCenter,    true,    "isf_tp",    			false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,   		120,    daLeft,    true,    "isf_bl_no",   			false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,   		 150,    daLeft,    true,    "isf_pol_name",    	false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,   		80,    daCenter,    true,    "isf_etd",    		false,   "",       dfDateYmd,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,   		150,    daLeft,    true,    "isf_pod_name",    	false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,   		80,    daCenter,    true,    "isf_eta",  			false,   "",       dfDateYmd,     		0,     false,      false);
	             
	             InitDataProperty(0, cnt++,  dtData,   		150,    daLeft,    true,    "del_nm",    	false,   "",       dfNone,          0,     false,      false);
	             
	             InitDataProperty(0, cnt++,  dtData,   		150,    daLeft,    true,    "isf_imp_name",   	false,   "",       dfNone,     		0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,   		150,    daLeft,    true,    "isf_s_entt_name",    			false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,        150,    daLeft,    true,    "isf_b_entt_name", 			false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,        150,  	daLeft,    true,    "isf_c_entt_name",      		false,   "",       dfNone,          0,     false,        false);
	             
	             InitDataProperty(0, cnt++,  dtHidden,   		110,    daCenter,    true,    "intg_bl_seq",    			false,   "",       dfNone,          0,     false,      false); 
	             
	             InitViewFormat(0, "isf_etd", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	    		 InitViewFormat(0, "isf_eta", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	    		 
	    		 InitViewFormat(0, "acr_dt", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	    		
	    		//ActionMenu = "Column Hidden|-|Header Setting Save|Header Setting Reset";	    			
		    } 
			break;
         
     }
}

 /**
  * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
  * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
  */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr = sheetObj.ColSaveName(Col);
	//if(colStr == "mbl_no"){
	var formObj  = document.frm1;
	//doProcess = true;
	formObj.f_cmd.value = "";
	
	var paramStr = "./EDI_ISF_0010.clt?f_cmd="
											+"&hbl_no="+sheetObj.CellValue(Row, "hbl_no")
											+"&intg_bl_seq="+sheetObj.CellValue(Row, "intg_bl_seq");
	parent.mkNewFrame('ISF EDI (Ocean)', paramStr);
}

function sheet2_OnDblClick(sheetObj,Row,Col){	
	var colStr = sheetObj.ColSaveName(Col);
	//if(colStr == "mbl_no"){
	var formObj  = document.frm1;
	//doProcess = true;
	formObj.f_cmd.value = "";
	
	var paramStr = "./EDI_ISF_0010.clt?f_cmd="
											+"&isf_no="+sheetObj.CellValue(Row, "isf_no");
	parent.mkNewFrame('ISF EDI (Ocean)', paramStr);
}
  
function sheet1_OnSearchEnd(){
	doWork("SEARCHLIST01");
}

/**
* 화면로드 후 초기값 세팅
*/
function initFinish(){
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
//	setFromToDtEndPlus(document.frm1.f_rgst_strdt, 90, document.frm1.f_rgst_enddt, 30);
}

/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
	    case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
	        var cal = new calendarPopupFromTo();
	        cal.displayType = "date";
	        cal.select(formObj.f_etd_strdt, 'f_etd_strdt', formObj.f_etd_enddt, 'f_etd_enddt', 'MM-dd-yyyy');
	    break;
	    case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
        	var cal = new calendarPopupFromTo();
	        cal.displayType = "date";
	        cal.select(formObj.f_eta_strdt, 'f_eta_strdt', formObj.f_eta_enddt, 'f_eta_enddt', 'MM-dd-yyyy');
	    break;
    }
}

var rtnary = new Array(1);
function openPopUpEdi(srcName, curObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.frm1;
	try {
		switch(srcName) {
		
			case "HBL_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
	        
				rtnary = new Array(1);
		   		
		   		rtnary[0] = "S";
		   		rtnary[1] = "I";
	
	   	        var rtnVal = window.showModalDialog('./CMM_POP_0170.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
	   	       
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
				
					var rtnValAry = rtnVal.split("|");
	
					formObj.f_hbl_no.value = rtnValAry[0];//house_bl_no
				}
				 
		    break;
		    
			case "MBL_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
	        
				rtnary = new Array(1);
				rtnary[0] = "S"; //S = 해운에서 오픈, A = 항공에서 오픈
				rtnary[1] = "I"; //I: In-bound, O: Out-bound
				
		    	var rtnVal = window.showModalDialog('./CMM_POP_0180.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
		    	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		    		return;
				}else{
					var rtnValAry = rtnVal.split("|");
					formObj.f_mbl_no.value = rtnValAry[0];//mbl_no
				}
			 
		    break;
		    
			case "IMPORTER_POPLIST":
				
		   		rtnary = new Array(1);
		   		
		   		rtnary[0] = "1";
		   		rtnary[1] = formObj.f_im_entt_name.value;
		   		rtnary[2] = window;
		   		
	   	        var rtnVal = window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	   	        
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					return;
				}else{
				
					var rtnValAry = rtnVal.split("|");
		
					formObj.f_im_entt_cd.value = rtnValAry[0];//trdp_cd
					formObj.f_im_entt_name.value = rtnValAry[2];//eng_nm
				}
	         break; 
	         
			case "CONSIGNEE_POPLIST":
				
		   		rtnary = new Array(1);
		   		
		   		rtnary[0] = "1";
		   		rtnary[1] = formObj.f_cnee_nm.value;
		   		rtnary[2] = window;
		   		
	   	        var rtnVal = window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	   	        
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					return;
				}else{
				
					var rtnValAry = rtnVal.split("|");
		
					formObj.f_cnee_cd.value = rtnValAry[0];//trdp_cd
					formObj.f_cnee_nm.value = rtnValAry[2];//eng_nm
				}
	         break; 
    	   
        } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			showErrMessage(AJ_CMM_ERR);
		} else {
			showErrMessage(e);
		}
	}
}

var CODETYPE = '';
/**
 * code name select
 */
function codeNameActionEdi(str, obj, tmp){
	var s_code = obj.value.toUpperCase();		
	var s_type = "";
	
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE =str;		
				var sub_str = str.substring(0,8);

				if(sub_str=="trdpCode"){
					s_type = sub_str;
					ajaxSendPost(trdpCdReqEdi,      'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
				
			}
		} else if ( tmp == "onBlur" ) {
				CODETYPE =str;		
				var sub_str = str.substring(0,8);
				
				if(sub_str=="trdpCode"){
					s_type = sub_str;
					ajaxSendPost(trdpCdReqEdi,      'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');

				}
		}
}


/**
* Trade Partner 관린 코드조회
*/
function trdpCdReqEdi(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	if(doc[0]=='OK'){

		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			
			var masterVals = rtnArr[0].split('@@^');	
			if(CODETYPE =="trdpCode_importer"){
				formObj.f_im_entt_cd.value = masterVals[0];	//trdp_cd  AS param1
				formObj.f_im_entt_name.value   = masterVals[3];		//eng_nm   AS param2
				
				if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('FMS_COM_000000') + "\n\n: EDI_ISF_0020.461");
				}
				
			}else if(CODETYPE =="trdpCode_consignee"){
				formObj.f_cnee_cd.value = masterVals[0];	//trdp_cd  AS param1
				formObj.f_cnee_nm.value = masterVals[3];		//eng_nm   AS param2
				
				if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('FMS_COM_000000') + "\n\n: EDI_ISF_0020.470");
				}
			}
			
			
		}else{
			if(CODETYPE =="trdpCode_importer"){
				formObj.f_im_entt_cd.value = "";//trdp_cd  AS param1
				formObj.f_im_entt_name.value = "";//eng_nm   AS param2
				
			}else if(CODETYPE =="trdpCode_consignee"){
				formObj.f_cnee_cd.value = "";//trdp_cd  AS param1
				formObj.f_cnee_nm.value = "";//eng_nm   AS param2
			}
		}
	}
}


function getPageURL() {
	return document.getElementById("pageurl").value;
}


function sheet1_OnSelectMenu(sheetObj, MenuString){fnOnSelectMenu(sheetObj, MenuString);};
function sheet2_OnSelectMenu(sheetObj, MenuString){fnOnSelectMenu(sheetObj, MenuString);};
function fnOnSelectMenu(sheetObj, MenuString){
	
	var formObj = document.frm1;
	
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;

		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		
		// 선택된 Column Hidden
		case "Column Hidden":
			var col = sheetObj.MouseCol;
			if(sheetObj.ColSaveName(col)==""){
				alert(CM_MSG6);
				return false;
			}
			
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}

//Calendar flag value
var firCalFlag = false;