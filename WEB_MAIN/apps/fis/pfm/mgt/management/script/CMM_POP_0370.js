//=========================================================
//*@FileName   : CMM_POP_0370.jsp
//*@FileTitle  : customized report pop
//*@Description: customized report pop
//*@author     : PJK
//*@version    : 1.0 - 03/30/2012
//*@since      : 03/30/2012
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 22/07/2014
//*@since      : 22/07/2014
//=========================================================
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
		switch(srcName) {
			case "SEARCHLIST":
				if(inputCheck()){
					formObj.f_cmd.value=SEARCHLIST;
					sheetObj.DoSearch("CMM_POP_0370GS.clt", FormQueryString(formObj) );
				}
			break;
			case "EXCEL":
				if(sheetObj.RowCount() < 1){//no data	
		   			ComShowCodeMessage("COM132501");
		   		}else{
		   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
		   		}
	   	 	break;
       	    case "CLOSE":
//   	              window.close();
       	    	ComClosePopup();
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
function loadPage() {
	var arg=parent.rtnary;
	var formObj=document.form;
//	formObj.openMean.value=arg[0];
	formObj.f_rpt_seq.value=arg[0];
	document.getElementById("td_rpt_title").innerText=arg[1];
	document.getElementById("td_desc_1").innerText=arg[2];
	document.getElementById("td_desc_2").innerText=arg[3];
	document.getElementById("td_desc_3").innerText=arg[4];
	document.getElementById("td_desc_4").innerText=arg[5];
	document.getElementById("td_desc_5").innerText=arg[6];
	document.getElementById("td_desc_6").innerText=arg[7];
	formObj.f_qry_txt.value=arg[9];
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i], i+1, arg);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
//	sheetObj.InitHeadRow(0, 'No.|' + arg[8], true);
	
//	var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
//    var headers = [{Text:'No.|' + arg[8], Align:"Center"}];
//    sheetObj.InitHeaders(headers, info);
//    sheetObj.InitColumns([{}]);
//	initSheet()
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
function initSheet(sheetObj,sheetNo, args) {
    switch(sheetNo) {
         case 1:      //IBSheet1 init
            with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [{Text:'No.|' + args[8], Align:"Center"}];
             InitHeaders(headers, info);

             var cols = [ {Type:"Seq",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data1",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data2",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data3",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data4",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data5",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data6",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data7",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data8",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data9",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data10",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data11",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data12",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data13",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data14",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data15",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data16",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data17",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data18",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data19",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data20",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data21",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data22",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data23",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data24",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data25",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data26",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data27",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data28",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data29",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"data30",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
             InitColumns(cols);
             SetEditable(1);
             SetHeaderRowHeight(20);
             SetSheetHeight(410);
           }                                                      
           break;
    }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.form.f_CurPage.value=callPage;	
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
function inputCheck(){
	var formObj=document.form;
	if(document.getElementById("td_desc_1").innerText != "" && formObj.f_param_1.value == ""){
		//Please input [" + document.getElementById("td_desc_1").innerText + "]"
		alert(getLabel('FMS_COM_ALT007') + "\n - " + document.getElementById("td_desc_1").innerText);
		formObj.f_param_1.focus();
		return false;
	}
	if(document.getElementById("td_desc_2").innerText != "" && formObj.f_param_2.value == ""){
		//Please input [" + document.getElementById("td_desc_2").innerText + "]"
		alert(getLabel('FMS_COM_ALT007') + "\n - " + document.getElementById("td_desc_2").innerText);
		formObj.f_param_2.focus();
		return false;
	}
	if(document.getElementById("td_desc_3").innerText != "" && formObj.f_param_3.value == ""){
		//Please input [" + document.getElementById("td_desc_3").innerText + "]"
		alert(getLabel('FMS_COM_ALT001') + "\n - " + document.getElementById("td_desc_3").innerText + "\n\n: CMM_POP_0370.183");
		formObj.f_param_3.focus();
		return false;
	}
	if(document.getElementById("td_desc_4").innerText != "" && formObj.f_param_4.value == ""){
		//Please input [" + document.getElementById("td_desc_4").innerText + "]"
		alert(getLabel('FMS_COM_ALT001') + "\n - " + document.getElementById("td_desc_4").innerText + "\n\n: CMM_POP_0370.190");
		formObj.f_param_4.focus();
		return false;
	}
	if(document.getElementById("td_desc_5").innerText != "" && formObj.f_param_5.value == ""){
		//Please input [" + document.getElementById("td_desc_5").innerText + "]"
		alert(getLabel('FMS_COM_ALT001') + "\n - " + document.getElementById("td_desc_5").innerText + "\n\n: CMM_POP_0370.197");
		formObj.f_param_5.focus();
		return false;
	}
	if(document.getElementById("td_desc_6").innerText != "" && formObj.f_param_6.value == ""){
		//Please input [" + document.getElementById("td_desc_6").innerText + "]"
		alert(getLabel('FMS_COM_ALT001') + "\n - " + document.getElementById("td_desc_6").innerText + "\n\n: CMM_POP_0370.204");
		formObj.f_param_6.focus();
		return false;
	}
	return true;
}
