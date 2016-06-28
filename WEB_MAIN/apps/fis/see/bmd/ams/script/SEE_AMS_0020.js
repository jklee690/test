var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName, valObj){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCHLIST01":
            formObj.f_cmd.value=SEARCHLIST01;
            //검증로직
			docObjects[0].DoSearch("./SEE_AMS_0020GS.clt", FormQueryString(formObj) );
		break;
		case "SEARCHLIST02":
            formObj.f_cmd.value=SEARCHLIST02;
            //검증로직
			docObjects[1].DoSearch("./SEE_AMS_0021GS.clt", FormQueryString(formObj) );
		break;
		case "SEARCHLIST03":
            formObj.f_cmd.value=SEARCHLIST03;
            //검증로직
			docObjects[2].DoSearch("./SEE_AMS_0022GS.clt", FormQueryString(formObj) );
		break;
		case "SEARCHLIST04":
            formObj.f_cmd.value=SEARCHLIST04;
            var formObj=document.frm1;
			docObjects[4].RemoveAll();
			var blnbr=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hbl_no");
			docObjects[4].DoSearch("./SEE_AMS_0023GS.clt?blnbr=blnbr", FormQueryString(formObj) );
		break;
		case "SEARCHLIST05":
			docObjects[3].RemoveAll();
			formObj.f_cmd.value=SEARCHLIST02;
			var intgBlSeq=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
			var hblNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hbl_no");
			docObjects[3].DoSearch("./SEE_AMS_0011GS.clt?intg_bl_seq=intgBlSeq&bl_no=hblNo", FormQueryString(formObj) );
		break;
		case "SEND":
			formObj.f_cnt_cd.value=trim(formObj.f_cnt_cd.value);
			if(formObj.f_cnt_cd.value == ""){
				alert("Vessel Nation is Mandatory!");
				return;
			}
			if(docObjects[0].CheckedRows("chk") == 0){
        		alert("Please Check the row!");
        		return;
        	}
        	for(var i=1; i<=docObjects[0].RowCount(); i++){
				if(docObjects[0].GetCellValue(i, "chk") == 1){
					if(docObjects[0].GetCellValue(i, "lst_pol_cd") == ''){
						alert("Last POL Port is Mandatory");
						return;
					}else if(docObjects[0].GetCellValue(i, "it_tp") == '61' && docObjects[0].GetCellValue(i, "hub_cd") == ''){
						alert("Hub AMS Port is Mandatory When IT Type is 61");
						return;
					}else if((docObjects[0].GetCellValue(i, "it_tp") == '62' || docObjects[0].GetCellValue(i, "it_tp") == '63') && docObjects[0].GetCellValue(i, "lst_usa_cd") == ''){
						alert("Last USA Port is Mandatory When IT Type is 62 OR 63");
						return;
					}
					if(docObjects[0].GetCellValue(i, "ams_pod_cd").length !=  4){
						alert("POD AMS Port Code is 4 digits");
						return;
					}
					if(docObjects[0].GetCellValue(i, "hbl_no").length >  12){
						alert("House B/L No is Max 12 characters");
						return;
					}
        		}
			}
            formObj.f_cmd.value=COMMAND01;
            //검증로직
            docObjects[0].DoAllSave("./SEE_AMS_0020GS.clt", FormQueryString(formObj), true);
		break;
		case "LIST":
   	 		var formObj=document.frm1;
   		   	var paramStr="./SEE_AMS_0010.clt";
   		   	parent.mkNewFrame('OI B/L Entry by AMS Download', paramStr);
		break;
		case "APPLY":
			for(var i=1; i<docObjects[0].RowCount()+1; i++){
				alert(docObjects[0].GetCellValue(i, "hbl_no"))
			}
            docObjects[0].DoAllSave("./SEE_AMS_0020GS.clt", FormQueryString(formObj), true);
		break;
        case "LAST_POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(3);
      		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "LAST_POL_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,415,"yes");
	         
		break;
        case "TS_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(3);
      		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "TS_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,415,"yes");
	        
		break;
        case "HUB_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(3);
      		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "HUB_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,415,"yes");
	        
		break;
        case "USA_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(3);
      		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "USA_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,415,"yes");
	        
		break;
    }
}
function sheet1_OnSaveEnd(){
	doWork("SEARCHLIST01");
	docObjects[1].RemoveAll();
	docObjects[2].RemoveAll();
	docObjects[3].RemoveAll();
	docObjects[4].RemoveAll();
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if ( doc[0]=='OK' ) {
		if (typeof(doc[1])!='undefined'){
			var sheetObj1=docObjects[2];
			var iRow=formObj.s_Acct_Info_Row.value;
			//alert("[" + doc[1] + "]" + getLabel('SAL_TPM_0010_MSG3')); Duplicated account!
			alert(getLabel('FMS_COM_ALT008') + " - " + doc[1] + "\n\n: SEE_AMS_0020.226");
			sheetObj1.SetCellValue(iRow, 3,"");
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEE_AMS_0020.230");		
	}
}
function fncTpCodeSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		if ( formObj.s_trdp_cd.value != null && formObj.s_trdp_cd.value != "" ) {
			doWork('SEARCHLIST');
		}
	}
}
// 공통전역변수
var tabObjects=new Array();
var tabCnt=0 ;
var beforetab=1;
var beforetab2=1;
var docObjects=new Array();
var sheetCnt=0;
/**
 * IBTab Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setTabObject(tab_obj){
	tabObjects[tabCnt++]=tab_obj;
}
/**
 * Tab 기본 설정
 * 탭의 항목을 설정한다.
 */
function initTab(tabObj , tabNo) {
	switch(tabNo) {
		case 1:
			with (tabObj) {
				InsertItem( "HB/L Information" , "");
				InsertItem( "AMS Sending Result" , "");
			}
		break;
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
		case "sheet2":
			docObjects[1]=sheet_obj;
		break;
		case "sheet3":
			docObjects[2]=sheet_obj;
		break;
		case "sheet4":
			docObjects[3]=sheet_obj;
		break;
		case "sheet5":
			docObjects[4]=sheet_obj;
		break;
		case "sheet6":
			docObjects[5]=sheet_obj;
		break;
	}
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++) {
		comConfigSheet(docObjects[i] , SYSTEM_BLUE);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
    //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}
function RestoreGrid(){
	doWork("SEARCHLIST01");
}
/**
 * Tab 클릭시 이벤트 관련
 * 선택한 탭의 요소가 활성화 된다.
 */
function tab1_OnChange(tabObj , nItem) {
	var objs=document.all.item("tabLayer");
	objs[nItem].style.display="Inline";
	objs[beforetab].style.display="none";
	//--------------- 요기가 중요 --------------------------//
	objs[beforetab].style.zIndex=objs[nItem].style.zIndex -1 ;
	//------------------------------------------------------//
	beforetab=nItem;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {
		case 1:      //sheet1 init
			with (sheetObj) {
	            (39, 0, 0, true);
	
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:"|MasterB/LNo|HouseB/LNo|Type|Sub-Type|AMSFileNo|ETA|POL|LastPOL|POD|DLV|PKGS|ITType|Status", Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"chk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			       {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"hbl_tp",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sub_tp",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"ams_file_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eta_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"pol_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"lst_pol_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"pod_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"del_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Int",       Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"pck_qty",         KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"it_tp",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"ams_sts",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"intg_bl_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"ams_pol_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"ams_lst_pol_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"ams_pod_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"ams_del_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"shpr_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"shpr_addr",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"cnee_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"cnee_addr",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"ntfy_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"ntfy_addr",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"it_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"bond_id",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"hub_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"usa_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"por_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"pck_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"grs_wgt",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"snp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"lst_pol_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"ts_cgo",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"ts_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"lst_usa_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"ams_snd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" } ];
            InitColumns(cols);

            SetEditable(1);
            InitViewFormat(0, "eta_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
            SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
            SetSheetHeight(180);
			}
		break;
		case 2:      //sheet 2 init
			with (sheetObj) {
		        (8, 0, 0, true);
	
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:"SEQ|ContainerNo|Type|SealNo|Pkgs|Weight(Kg)|cntr_ibflag", Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Seq",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"cntr_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"seal_no1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Int",       Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"cgo_pck_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"cgo_wgt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"cntr_list_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Status",    Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"cntr_ibflag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		         
		        InitColumns(cols);

	        	SetEditable(0);
	        	SetSheetHeight(130);
	            SetHeaderRowHeight(21);
			}
		break;
		case 3:      //sheet 2 init
			with (sheetObj) {
		        (7, 0, 0, true);
		        var hdr1="SEQ|HTS Code|Pkgs|Commodity|DG Code|DG Div|item_ibflag";
	
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:hdr1, Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Seq",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"hts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"hts_pkg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"commodity",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"dg_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"dg_div",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Status",    Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"item_ibflag",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		         
		        InitColumns(cols);

		        SetEditable(1);
	            SetHeaderRowHeight(21);
	            SetSheetHeight(130);
			}
		break;
		case 4:      //sheet 2 init
			with (sheetObj) {
		        (7, 0, 0, true);
		        var hdr1="H B/L No|Msg SEQ|Msg Type|Status|Disp|Result Message|Recv Date";
	
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:hdr1, Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Seq",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"msg_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"msg_tp",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ams_sts",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"disp",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:450,  Align:"Left",    ColMerge:1,   SaveName:"rlt_mst",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rcv_dt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		         
		        InitColumns(cols);
	
		        SetEditable(1);
		        SetSheetHeight(130);
	            SetHeaderRowHeight(21);
			}
		break;
		case 5:      //sheet 2 init
			with (sheetObj) {
		        (10, 0, 0, true);
		        var hdr1="SEQ|House B/L No|AMS File No|MSG|SNP Code|Last POL Port|T/S Cargo|AMS Send|Send Date|Send File";
	
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:hdr1, Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Seq",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"ams_file_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:40,   Align:"Left",    ColMerge:1,   SaveName:"msg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"snp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"lst_pol_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"ts_cgo",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"ams_snd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"snd_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"snd_file",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		         
		        InitColumns(cols);
	
		        SetEditable(1);
		        SetSheetHeight(130);
			}
		break;
		case 6:      //sheet 2 init
			with (sheetObj) {
		        (7, 0, 0, true);
		        var hdr1="SEQ|House B/L No|AMS File No|Type|SUB-Type|Ref. No|Check Message";
	
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:hdr1, Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Seq",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:1,   SaveName:"hbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"ams_file_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"type",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sub_type",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:400,  Align:"Left",    ColMerge:1,   SaveName:"chk_msg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		         
		        InitColumns(cols);
		        SetSheetHeight(130);
		        SetEditable(1);
			}
		break;
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
    var sheetObj=docObjects[0];
   	// f_snp_cd
    if(sheetObj.GetSelectRow() > 0)
    	formObj.f_snp_cd.value=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "snp_cd");
	if( sheetObj.GetCellValue(sheetObj.GetSelectRow(), "it_tp") != 'F'){
		formObj.f_it_tp.value=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "it_tp");
   	}
	
	if(sheetObj.GetSelectRow() > 0)
		formObj.f_it_no.value=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "it_no");
	if(sheetObj.GetSelectRow() > 0)
		formObj.f_bond_id.value=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "bond_id");
	if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_snd") == "" || docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_sts") == "Orginal" || docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_snd") == "-1"){
		formObj.f_ams_snd.value="A";
	}else{
		formObj.f_ams_snd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_snd");
	}	
}
function sheet2_OnSearchEnd(){
	var formObj=document.frm1;
    var sheetObj2=docObjects[1];
}
function sheet1_OnClick(sheetObj, Row, Col){
	var formObj=document.frm1;
    var colStr=sheetObj.ColSaveName(Col);
    if(colStr == "hbl_no"){
		formObj.f_intg_bl_seq.value=sheetObj.GetCellValue(Row, "intg_bl_seq");
    	doWork("SEARCHLIST02");
    	doWork("SEARCHLIST04");
    	doWork("SEARCHLIST05");
    }
	formObj.f_snp_cd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "snp_cd");
	formObj.f_lst_pol_cd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lst_pol_cd");
	formObj.f_lst_pol_nm.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lst_pol_nm");
	formObj.f_ts_cgo.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ts_cgo");
	formObj.f_it_no.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "it_no");
	if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "it_tp") == "F"){
		formObj.f_ts_cgo.value="Y";
		formObj.f_it_tp.value='';
	}else{
		formObj.f_it_tp.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "it_tp");
	}
	formObj.f_bond_id.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bond_id");
	formObj.f_hub_cd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hub_cd");
	if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_snd") == "" /*|| docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_sts") == "Orginal"*/ || docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_snd") == "-1"){
		formObj.f_ams_snd.value="A";
	}else{
		formObj.f_ams_snd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_snd");
	}
}
function sheet2_OnClick(sheetObj, Row, Col){
	var formObj=document.frm1;
    var colStr=sheetObj.ColSaveName(Col);
    if(colStr == "cntr_no"){
		formObj.f_cntr_list_seq.value=sheetObj.GetCellValue(Row, "cntr_list_seq");
    	doWork("SEARCHLIST03");
    }
	formObj.f_snp_cd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "snp_cd");
	formObj.f_lst_pol_cd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lst_pol_cd");
	formObj.f_lst_pol_nm.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lst_pol_nm");
	formObj.f_ts_cgo.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ts_cgo");
	formObj.f_it_no.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "it_no");
	formObj.f_it_tp.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "it_tp");
	formObj.f_hub_cd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hub_cd");
	formObj.f_ams_snd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_snd");
}
function setSnpCd(snpCd){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "snp_cd",snpCd);
}
function setLstPolCd(lstPolCd, lstPolNm){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "lst_pol_cd",lstPolCd);
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "lst_pol_nm",lstPolNm);
}
function setTsCgo(tsCgo){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "ts_cgo",tsCgo);
	if(tsCgo == "Y"){
		docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "it_tp","F");
	}else{
		docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "it_tp",frm1.f_it_tp.value);
	}
}
function setItNo(itNo){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "it_no",itNo);
}
function setItTp(itTp){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "it_tp",itTp);
}
function setHubCd(hubCd){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "hub_cd",hubCd);
}
function setUsaCd(usaCd){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "lst_usa_cd",usaCd);
	//alert(docObjects[0].CellValue(docObjects[0].SelectRow, "lst_usa_cd"));
}
function setBondNo(bondNo){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "bond_id",bondNo);
}
function setAmsSnd(amsSnd){
var blAmsSnd=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_snd");
var blAmsSts=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_sts");
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "ams_snd",frm1.f_ams_snd.value);
}
var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}		
	var s_type="";
//	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
//			}
		}else if ( tmp == "onChange" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
//			}
		}
//	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value=masterVals[0];
				formObj.f_pol_nm.value=masterVals[3];
			}else if(CODETYPE == "location_last_pod"){
				formObj.f_lst_pol_cd.value=masterVals[0];
				formObj.f_lst_pol_nm.value=masterVals[3];
				formObj.f_ams_lst_pol_cd.value=masterVals[13];
			}else if(CODETYPE == "location_ts_cd"){
				formObj.f_ts_cd.value=masterVals[0];
				formObj.f_ts_nm.value=masterVals[3];
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value=masterVals[0];
				formObj.f_del_nm.value=masterVals[3];
			}else if(CODETYPE == "location_hub_cd"){
				formObj.f_hub_cd.value=masterVals[0];
				formObj.f_hub_nm.value=masterVals[3];
			}else if(CODETYPE == "location_usa_cd"){
				formObj.f_usa_cd.value=masterVals[0];
				formObj.f_usa_nm.value=masterVals[3];
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=masterVals[0]; 
				formObj.s_trdp_full_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_last_pod"){
				formObj.f_lst_pol_cd.value="";
				formObj.f_lst_pol_nm.value="";
			}else if(CODETYPE == "location_ts_cd"){
				formObj.f_ts_cd.value="";
				formObj.f_ts_nm.value="";
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value="";
				formObj.f_del_nm.value="";
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=""; 
				formObj.s_trdp_full_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function initFinish() {
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
function sheet1_OnSelectMenu(sheetObj, MenuString){
	var formObj=document.frm1;
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
			var col=sheetObj.GetSelectCol();
			if(sheetObj.ColSaveName(col)==""){
				alert(CM_MSG6);
				return false;
			}
			sheetObj.SetColHidden(col,1);
			sheetObj.SetColWidth(col,1);
		break;
	 }
}
function LAST_POL_LOCATION_POPLIST(rtnVal){
  	var formObj=document.frm1;
  	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			formObj.f_lst_pol_cd.value=rtnValAry[0];//loc_cd 
			formObj.f_lst_pol_nm.value=rtnValAry[2];//loc_nm
			docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "lst_pol_cd",rtnValAry[0]);
			docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "lst_pol_nm",rtnValAry[2]);
		}
  }
function TS_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ts_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_ts_nm.value=rtnValAry[2];//loc_nm
	} 
}
function HUB_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_hub_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_hub_nm.value=rtnValAry[2];//loc_nm
		docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "hub_cd",rtnValAry[0]);
		//docObjects[0].CellValue(docObjects[0].SelectRow, "hub_nm") =  rtnValAry[2];
	} 
}
function USA_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_usa_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_usa_nm.value=rtnValAry[2];//loc_nm
		docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "lst_usa_cd",rtnValAry[0]);
		//docObjects[0].CellValue(docObjects[0].SelectRow, "lst_usa_nm") =  rtnValAry[2];
	} 
	}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.f_intg_bl_seq.value = getParam(url,"f_intg_bl_seq");
	formObj.f_mbl_no.value = getParam(url,"f_mbl_no");
//	goTabSelect('01');
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}