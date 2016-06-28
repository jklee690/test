//=========================================================
//*@FileName   : 
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 18/07/2014
//*@since      : 18/07/2014
//=========================================================
var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
    switch(srcName) {
    	case "MANUAL_ADD":
    		var row = sheetObj.LastRow() + 1;
    		sheetObj.DataInsert(row);
    		// Manual add시 체크박스 디폴트값 셋팅
    		sheetObj.SetCellValue(row, "chk", "1", 0);
    		break;
	    case "MAIL":
	    	var retArray="";
    		for(var idx=1; idx<=sheetObj.LastRow(); idx++){
    			// 체크된 것 만 전송한다
    			if (sheetObj.GetCellValue(idx,"chk") == "1") {
    				if (sheetObj.GetCellValue(idx,"email") == "") {
    					alert(getLabel('FMS_COM_ALT001') + "\nemail");
    					return;
    				}
    				retArray += sheetObj.GetCellValue(idx,"trdp_pic_nm");
    				retArray += "@@";
    				retArray += sheetObj.GetCellValue(idx,"email");
    				retArray += "^^";
    			}
    		}
			// 체크한 항목이 없습니다.
			if (retArray == "") {
				//select 버튼만 클릭해도 outlook과 연계
//				alert(getLabel('FMS_COM_ALT007'));
//				return;
				// IE 의 X 아이콘으로 닫았을 경우, OUTLOOK 실행 안되게 하기 위해
				ComClosePopup("none");
			} else {
				retArray=retArray.substring(0,retArray.length-2);
//				window.returnValue=retArray;
				ComClosePopup(retArray);
			}
	    case "SEARCHLIST":
	    	formObj.f_cmd.value=SEARCHLIST;
	    	sheetObj.DoSearch("RPT_FAX_0010GS.clt", FormQueryString(formObj) );
	    	break;
		case "MODIFY":
			frm1.f_cmd.value=MODIFY;
			var sht1=sheetObj1.GetSaveString(true);
			sheetObj2.DataInsert(sheetObj2.LastRow() + 1);
			sheetObj2.DoAllSave("./RPT_FAX_0010_2GS.clt", FormQueryString(frm1));
			break;
		case "FAX_TO_POPLIST":
    		rtnary=new Array(1);
	   		rtnary[0]="3";
   	        
   	        callBackFunc = "FAX_TO_POPLIST";
	        modal_center_open('./CMM_POP_0360.clt', rtnary, 836,490,"yes");
	        break;
		case "CLOSE":
			ComClosePopup();
			break;	
    }
}

function FAX_TO_POPLIST(rtnVal){
   var sheetObj=docObjects[0];
   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 	return;
   }else{
	var rtnValAry=rtnVal.split("^^");
	idx=sheetObj.RowCount();
	for (i=0; i < rtnValAry.length; i++) {
		if(rtnValAry[i] == ""){
			break;
		}
		doWork("MANUAL_ADD");
		itemArr=rtnValAry[i].split("@@");
		sheetObj.SetCellValue(idx+1, "chk","1",0);
		sheetObj.SetCellValue(idx+1, "trdp_nm",itemArr[0],0);
		sheetObj.SetCellValue(idx+1, "trdp_pic_nm",itemArr[1],0);
		sheetObj.SetCellValue(idx+1, "dept_cd",itemArr[2],0);
		sheetObj.SetCellValue(idx+1, "trdp_cd",itemArr[4],0);
		sheetObj.SetCellValue(idx+1, "email",itemArr[5],0);
		idx++;
	}
}}

//코드표시 Ajax
function resultAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			formObj.m_corpfrcode.value=masterVals[0];
			frm1.f_cmd.value=ADD;
			var sht1=sheetObj1.GetSaveString(true);
			sheetObj2.DataInsert(sheetObj2.LastRow() + 1);
			sheetObj2.DoAllSave("./RPT_FAX_0010_2GS.clt", FormQueryString(frm1)+'&'+sht1);
		}
	}
}
/**
* 전체 데이터 저장 완료시
*/
function sheet2_OnSaveEnd(sheetObj, Row, Col) {
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
	formObj.m_id.value="clt00";
	formObj.m_pw.value="clt00";
	var faxNo="";
	for(var i=1 ; i < sheetObj1.LastRow() + 1 ; i++){
		faxNo += "," + sheetObj1.GetCellValue(i, "country_no") + "-" + sheetObj1.GetCellValue(i, "area_no")
		+ "-" + sheetObj1.GetCellValue(i, "fax_no");
	}
	formObj.m_fax.value=faxNo.substring(1);
	formObj.action="http://www.netshot.co.kr/corp/tsend.php"
	formObj.submit();
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
* Sheet 기본 설정 및 초기화
* body 태그의 onLoad 이벤트핸들러 구현
* 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
*/
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		//khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
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
	        var headers = [ { Text:getLabel('RPT_FAX_0021_HDR'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"del",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, HeaderCheck: 0 },
	               {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"trdp_pic_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"dept_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"email",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag1" } ];
	         
	        InitColumns(cols);
	        SetEditable(1);
	        SetSheetHeight(430);
		}                                                      
		break;
	}
}
function sheet1_OnClick(sheetObj, Row, Col){
	var formObj=document.frm1;
}
function setGrid() {
	var doc=window.dialogArguments;
	if(!doc){
		doc = parent.rtnary[0];
	}
	if (typeof(doc) != 'undefined' && doc != undefined && doc != "") {
		var paramArr=String(doc).substring(3).split('^^');
		var itemArr=new Array(5);
		for (idx=0; idx < paramArr.length; idx++) {
			if(paramArr[idx] == ""){
				break;
			}
			itemArr=paramArr[idx].split('@@');
			doWork("MANUAL_ADD");
			docObjects[0].SetCellValue(idx+1, "chk",1,0);
			docObjects[0].SetCellValue(idx+1, "trdp_nm",itemArr[0],0);
			docObjects[0].SetCellValue(idx+1, "trdp_pic_nm",itemArr[1],0);
			docObjects[0].SetCellValue(idx+1, "dept_cd",itemArr[2],0);
			//docObjects[0].CellValue2(idx+1, "fax") = itemArr[3];
			docObjects[0].SetCellValue(idx+1, "trdp_cd",itemArr[4],0);
			docObjects[0].SetCellValue(idx+1, "email",itemArr[5],0);
		}
	}
}
