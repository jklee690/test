//--------------------------------------------------------------------------------------------------------------
//Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
var sheetCnt=0;
function doWork(srcName){
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var sheetObj1=docObjects[1];
	var formObj=document.frm1;
	switch(srcName) {
		case "SEARCHLIST":
			formObj.f_cmd.value=SEARCHLIST01;
			
			if (true) {
				sheetObj.DoSearch("MGT_ALT_0011GS.clt", FormQueryString(formObj) );
			} else {
				alert(getLabel('SYS_COM_ALT010')); 
			}
				
			break;
		case "SAVE":
			if (checkValue()) {
				if(confirm(getLabel('FMS_COM_CFMSAV'))){
					frm1.f_cmd.value=MODIFY;
					sheetObj.DoSave("MGT_ALT_0011GS.clt", FormQueryString(formObj),"ibflag",false);
				}
			}
			break;
		case "ADD_ROW1":
			sheetObj.SetSelectRow(sheetObj.LastRow());
			sheetObj.DataInsert();
			sheetObj.SetCellValue(sheetObj.LastRow(),'seq',sheetObj.LastRow(),0);
			break;
			
	}
}
// --------------------------------------------------------------------------------------------------------------
// IBSheet 설정
// --------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	
	document.forms[0].f_CurPage.value=callPage;

	docObjects[0].RemoveAll();
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화 body 태그의 onLoad 이벤트핸들러 구현 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을
 * 추가한다
 */
function loadPage() {
	var formObj=document.frm1;	
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	doWork('SEARCHLIST');
}
/**
 * IBSheet Object를 배열로 등록 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다 배열은 소스
 * 상단에 정의
 */
function setDocumentObject(sheet_obj){
	switch(sheet_obj.id){
		case "sheet1":
			docObjects[0]=sheet_obj;
		/*case "sheet2":
			docObjects[1]=sheet_obj;*/
		break;  
	}
}
/**
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {	 
		 case 1:
			 with (sheetObj) {
			 		
			 	   SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

				   var info	= { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				   var headers = [ { Text:getLabel('MGT_ALT_0010_HDR1'), Align:"Center"}, 
				   				   { Text:getLabel('MGT_ALT_0010_HDR2'), Align:"Center"} ];
				   InitHeaders(headers, info);

				   var cols = [ {Type:"Status",		Hidden:1, 	Width:0,	Align:"Center",	ColMerge:0,	SaveName:"ibflag",			KeyField:0,		CalcLogic:"",	Format:"",			PointCount:1,	UpdateEdit:1,	InsertEdit:1},
				                {Type:"DelCheck",	Hidden:0,	Width:50,	Align:"Center",	ColMerge:0,	SaveName:"del",				KeyField:0,		CalcLogic:"",	Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 },	
				                {Type:"CheckBox",	Hidden:0,	Width:50,	Align:"Center",	ColMerge:0,	SaveName:"use_flg",			KeyField:0,		CalcLogic:"",	Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1, DefaultValue:"1"},	
				                {Type:"Combo",		Hidden:0,	Width:110,	Align:"Center",	ColMerge:0,	SaveName:"alt_tp",			KeyField:1,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
				                {Type:"Combo",		Hidden:0,	Width:60,	Align:"Center",	ColMerge:0,	SaveName:"ofc_cd",			KeyField:1,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
				                {Type:"Text",		Hidden:0,	Width:160,	Align:"Center",	ColMerge:0,	SaveName:"alt_nm",			KeyField:1,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1,   EditLen:50 },
								{Type:"Combo",		Hidden:0,	Width:100,	Align:"Center",	ColMerge:0,	SaveName:"phys_ett_nm",		KeyField:1,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
								{Type:"Combo",		Hidden:0,	Width:140,	Align:"Center",	ColMerge:0,	SaveName:"phys_attr_nm",	KeyField:1,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
								{Type:"Combo",		Hidden:0,	Width:100,	Align:"Center",	ColMerge:0,	SaveName:"eml_to",			KeyField:1,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
								{Type:"Text",		Hidden:0,	Width:300,	Align:"left",	ColMerge:0,	SaveName:"eml_cc",			KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
								{Type:"Int",		Hidden:0,	Width:80,	Align:"Center",	ColMerge:0,	SaveName:"st_days",			KeyField:0,		CalcLogic:"",  	Format:"Integer",	PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3},
								{Type:"Int",		Hidden:1,	Width:60,	Align:"Center",	ColMerge:0,	SaveName:"st_hours",		KeyField:0,		CalcLogic:"",   Format:"Integer",	PointCount:0,	UpdateEdit:1,	InsertEdit:1,	EditLen:3,		MaximumValue:23},
								{Type:"Int",		Hidden:1,	Width:60,	Align:"Center",	ColMerge:0,	SaveName:"st_tm",			KeyField:0,		CalcLogic:"",   Format:"Integer",	PointCount:0,	UpdateEdit:0,	InsertEdit:0,	EditLen:4},
								{Type:"Int",		Hidden:0,	Width:80,	Align:"Center",	ColMerge:0,	SaveName:"end_days",		KeyField:0,		CalcLogic:"",   Format:"Integer",	PointCount:0,	UpdateEdit:1,	InsertEdit:1,	EditLen:3},
								{Type:"Int",		Hidden:1,	Width:60,	Align:"Center",	ColMerge:0,	SaveName:"end_hours",		KeyField:0,		CalcLogic:"",   Format:"Integer",	PointCount:0,	UpdateEdit:1,	InsertEdit:1,	EditLen:3,		MaximumValue:23},
								{Type:"Int",		Hidden:1,	Width:60,	Align:"Center",	ColMerge:0,	SaveName:"end_tm",			KeyField:0,		CalcLogic:"",   Format:"Integer",	PointCount:0,	UpdateEdit:0,	InsertEdit:0,	EditLen:4},
								{Type:"Date",		Hidden:0,	Width:60,	Align:"Center",	ColMerge:0,	SaveName:"batch_tm",		KeyField:0,		CalcLogic:"",   Format:"Hm",		PointCount:0,	UpdateEdit:1,	InsertEdit:1, DefaultValue:"08:00"  },
								{Type:"CheckBox",	Hidden:0,	Width:120,	Align:"Center",	ColMerge:0,	SaveName:"wknd_snd_flg",	KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
								{Type:"Date",		Hidden:0,	Width:120,	Align:"Center",	ColMerge:0,	SaveName:"last_snd_tm",		KeyField:0,		CalcLogic:"",   Format:"YmdHm",		PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",		Hidden:0,	Width:120,	Align:"Center",	ColMerge:0,	SaveName:"fom_ctnt",		KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0, DefaultValue:"Register" },
								{Type:"Text",		Hidden:1,	Width:0,	Align:"Center",	ColMerge:0,	SaveName:"alt_seq",			KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
								{Type:"Text",		Hidden:1,	Width:0,	Align:"Center",	ColMerge:0,	SaveName:"rgst_fom_seq",	KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 }
								];
							
				   InitColumns(cols);

				   SetEditable(1);
				   SetColProperty("alt_tp", {ComboText:'ALERT|NOTIFICATION', ComboCode:'A|N'} );
				   SetColProperty("ofc_cd", {ComboText:OFCCD, ComboCode:OFCCD});
				   SetColProperty('use_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
				   SetColProperty('wknd_snd_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
				   SetColProperty("phys_ett_nm", {ComboText:ETTVAL, ComboCode:ETTCD});
				   SetColProperty("eml_to", {ComboText:CUST_VAL, ComboCode:CUST_CD});
			  	   SetSheetHeight(500);
			}													  
		 break;	 
	 }
}
/**
 * sheet1_OnSaveEnd
 */
function sheet1_OnSaveEnd(){
	doWork('SEARCHLIST');
}

/**
 * sheet1_OnSearchEnd
 */
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	sheetCnt = 0;
	for(sheetCnt=2; sheetCnt<=sheetObj.LastRow();sheetCnt++){
		var alt_tp = sheetObj.GetCellValue(sheetCnt,"alt_tp");
		attrSelectList(alt_tp,sheetCnt);
		
		/*if (rgst_fom_seq == "0") {
			sheetObj.SetCellValue(sheetCnt,"fom_ctnt","Register",0);
		} else {
			sheetObj.SetCellValue(sheetCnt,"fom_ctnt","Registered",0);
		}*/
	}	

	var noRegCnt = 0;
	var noRegRow = 0;

	for(var i=2; i<=sheetObj.LastRow();i++){
		
		var rgst_fom_seq = sheetObj.GetCellValue(i,"rgst_fom_seq");
		if (rgst_fom_seq == "") {
			sheetObj.SetCellValue(i,"fom_ctnt","Register",0);
			noRegCnt++;
			noRegRow = i;
		} else {
			sheetObj.SetCellValue(i,"fom_ctnt","Registered",0);
		}
		
		var Row = i;
		var alt_tp = sheetObj.GetCellValue(Row,"alt_tp");		
		if (alt_tp == "N"){			
			sheetObj.SetCellEditable(Row,"st_days",false);
			sheetObj.SetCellEditable(Row,"st_hours",false);
			sheetObj.SetCellEditable(Row,"end_days",false);
			sheetObj.SetCellEditable(Row,"end_hours",false);
			sheetObj.SetCellEditable(Row,"batch_tm",false);
			sheetObj.SetCellEditable(Row,"wknd_snd_flg",false);
		} else {
			sheetObj.SetCellEditable(Row,"st_days",true);
			sheetObj.SetCellEditable(Row,"st_hours",true);
			sheetObj.SetCellEditable(Row,"end_days",true);
			sheetObj.SetCellEditable(Row,"end_hours",true);
			sheetObj.SetCellEditable(Row,"batch_tm",true);
			sheetObj.SetCellEditable(Row,"wknd_snd_flg",true);
		}
	}
	
	if (noRegCnt > 0) {
		alert("Please Save Message First");
		sheetObj.SelectCell(noRegRow,'fom_ctnt');
	}
}

/**
 * sheet1_OnChange
 */
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;	
	
	switch (sheetObj.ColSaveName(Col)) {
	
	
	case "alt_tp":
		
		var alt_tp = sheetObj.GetCellValue(Row,"alt_tp");		
		if (alt_tp == "N"){
			
			sheetObj.SetCellValue(Row,"st_days","",0);
			sheetObj.SetCellValue(Row,"end_days","",0);
			sheetObj.SetCellValue(Row,"batch_tm","",0);
			sheetObj.SetCellValue(Row,"wknd_snd_flg","0",0);
			sheetObj.SetCellEditable(Row,"st_days",false);
			sheetObj.SetCellEditable(Row,"end_days",false);
			sheetObj.SetCellEditable(Row,"batch_tm",false);
			sheetObj.SetCellEditable(Row,"wknd_snd_flg",false);

		} else {
			
			sheetObj.SetCellEditable(Row,"st_days",true);
			sheetObj.SetCellEditable(Row,"end_days",true);
			sheetObj.SetCellEditable(Row,"batch_tm",true);
			sheetObj.SetCellEditable(Row,"wknd_snd_flg",true);
			
		}

		attrSelectList(alt_tp,Row);
		
		break;		

	case "phys_ett_nm":
		
		var alt_tp = sheetObj.GetCellValue(Row,"alt_tp");
		attrSelectList(alt_tp,Row);
		break;		
	
	/*case "st_days":
		var stDays = Number(sheetObj.GetCellValue(Row,"st_days"));
		var stHours = Number(sheetObj.GetCellValue(Row,"st_hours"));
		sheetObj.SetCellValue(Row,"st_tm",stDays*24+stHours,0)
		break;		
	case "st_hours":
		var stDays = Number(sheetObj.GetCellValue(Row,"st_days"));
		var stHours = Number(sheetObj.GetCellValue(Row,"st_hours"));
		sheetObj.SetCellValue(Row,"st_tm",stDays*24+stHours,0)
		break;		
	case "end_days":
		var endDays = Number(sheetObj.GetCellValue(Row,"end_days"));
		var endHours = Number(sheetObj.GetCellValue(Row,"end_hours"));
		sheetObj.SetCellValue(Row,"end_tm",endDays*24+endHours,0)
		break;		
	case "end_hours":
		var endDays = Number(sheetObj.GetCellValue(Row,"end_days"));
		var endHours = Number(sheetObj.GetCellValue(Row,"end_hours"));
		sheetObj.SetCellValue(Row,"end_tm",endDays*24+endHours,0)
		break;		*/
	}
}


/**
 * Tab 클릭
 *//*
function goTabSelect(isNumSep) {
	return;
	var tabObjs=document.getElementsByName('tabLayer');
	if( isNumSep == "01" ) {
		currTab=isNumSep;	// 탭상태저장
		tabObjs[0].style.display='inline';
		tabObjs[1].style.display='none';
		if(tab1click == ""){
			tab1click="Y";
			tab2click="";
		}
		// 스크롤을 하단으로 이동한다.
		document.body.scrollTop=document.body.scrollHeight;
	} else if( isNumSep == "02" ) {
		currTab=isNumSep;	// 탭상태저장
		tabObjs[0].style.display='none';
		tabObjs[1].style.display="inline";
		if(tab2click == ""){
			tab1click="";
			tab2click="Y";
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
}*/



function sheet1_OnClick(sheetObj,Row,Col){
	
	var colStr=sheetObj.ColSaveName(Col);
	
	switch (colStr) {
	
	case "fom_ctnt":
		var ibflag = sheetObj.GetCellValue(Row,"ibflag");
		if (ibflag == 'I'){
			alert("Please Save First");
			return;
		}	
		var alt_type = sheetObj.GetCellValue(Row,"alt_tp");
		var phys_ett_nm = sheetObj.GetCellValue(Row,"phys_ett_nm");
		if(phys_ett_nm ==""){
			return;
		}
		var phys_attr_nm = sheetObj.GetCellValue(Row,"phys_attr_nm");
		if(phys_attr_nm==""){
			return;
		}
		var alt_seq = sheetObj.GetCellValue(Row,"alt_seq");
		var fom_seq = sheetObj.GetCellValue(Row,"rgst_fom_seq");
		
		var reqParam = '?alt_seq='+alt_seq;
		reqParam += '&fom_seq='+fom_seq;
		reqParam += '&alt_type='+alt_type;
		reqParam += '&phys_ett_nm='+phys_ett_nm;
		reqParam += '&phys_attr_nm='+phys_attr_nm;
		if (alt_type == 'A') {
			popGET('./MGT_POP_0010.clt' + reqParam, 'alertRgstPopUp', 1100, 880,"scroll:no;status:no;help:no;");
		} else {
			popGET('./MGT_POP_0010.clt' + reqParam, 'alertRgstPopUp', 680, 440,"scroll:no;status:no;help:no;");
		}
		
		break;
		
	case "phys_ett_nm":
		if (sheetObj.GetCellValue(Row,"phys_ett_nm")==""){
			return;
		}				
		var alt_tp = sheetObj.GetCellValue(Row,"alt_tp");
		attrSelectList(alt_tp,Row);
		break;	
		
	case "phys_attr_nm":
		if (sheetObj.GetCellValue(Row,"phys_ett_nm")==""){
			return;
		}				
		var alt_tp = sheetObj.GetCellValue(Row,"alt_tp");
		attrSelectList(alt_tp,Row);
		break;	
	}

}


//Entity를 조회한다.
function ettSelectList(){
    var CODETYPE="A010";
    ajaxSendPost(ettNmSelectAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+CODETYPE, './GateServlet.gsl');
}
function ettNmSelectAjaxReq(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    var formObj=document.frm1;
    var cmbString = '';
    if(doc[0]=='OK'){
        if(typeof(doc[1])!='undefined'){
            //조회해온 결과를 Parent에 표시함
        var rtnArr=doc[1].split(';');
        var arrLen=rtnArr.length;
            for( var i=0; i < arrLen-1 ; i++ ){
                var masterVals=rtnArr[i].split('@@^');
            	cmbString +=  masterVals[1];
            	
            	if (i != arrLen-2){
            		cmbString += "|";
            	}
            }
			docObjects[0].SetColProperty("cnt_cd", {ComboText:cmbString, ComboCode:cmbString} );
        }
    }else{
    	//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: MGT_HIS_0020.319");        
    }
}

//Attribute를 조회한다.
function attrSelectList(alt_tp,Row){
	var sheetObj = docObjects[0];
	
	if (alt_tp == "A"){
		/*
		var CODETYPE="alertAttrList";
		var com_cd="";
		var phys_ett_nm = sheetObj.GetCellValue(Row,"phys_ett_nm");
		if (phys_ett_nm == "TB_PO"){
			com_cd="A011";
		} else	if (phys_ett_nm == "TB_INTG_BL"){
			com_cd="A012";
		} else	if (phys_ett_nm == "TB_BKG"){
			com_cd="A013";
		} else {
			// 등록되지 않은 Code - 소스추가필요(또는 매핑테이블 필요)
			alert("ADD Master Code!!");
			return false;
		} 		
		ajaxSendPost(attrNmSelectAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+CODETYPE+'&com_cd='+com_cd, './GateServlet.gsl');*/
		
		// 코드로 등록하지 않고 그냥 칼럼명 취득으로 변경  
		var CODETYPE="alertAttrList";
		var table_nm = sheetObj.GetCellValue(Row,"phys_ett_nm");
		ajaxSendPost(attrNmSelectAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+CODETYPE+'&table_nm='+table_nm+'&alert_tp=A', './GateServlet.gsl');

	} else {
		
		var CODETYPE="notiAttrListByComCd";
		var com_cd="";
		var phys_ett_nm = sheetObj.GetCellValue(Row,"phys_ett_nm");
		if (phys_ett_nm == "TB_PO"){
			com_cd="A015";
		} else	if (phys_ett_nm == "TB_INTG_BL"){
			com_cd="A016";
		} else	if (phys_ett_nm == "TB_BKG"){
			com_cd="A017";
		} else {
			// 등록되지 않은 Code - 소스추가필요(또는 매핑테이블 필요)
			alert("ADD Master Code!!");
			return false;
		} 		
		
		//var table_nm = sheetObj.GetCellValue(Row,"phys_ett_nm");
		//ajaxSendPost(attrNmSelectAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+CODETYPE+'&Table_in='+table_nm, './GateServlet.gsl');
		
		ajaxSendPost(attrNmSelectAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+CODETYPE+'&com_cd='+com_cd, './GateServlet.gsl');
	}
}

function attrNmSelectAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	
	var cmbString = '';
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var arrLen=rtnArr.length;

			for( var i=0; i < arrLen-1 ; i++ ){
				
				var masterVals=rtnArr[i].split('@@^');
				cmbString +=  masterVals[1];
				
				if (i != arrLen-2){
					cmbString += "|";
				}
			}
			var comboInfo = {ComboText:cmbString, ComboCode:cmbString};
			
			if (docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"ibflag") == "I"){
				docObjects[0].CellComboItem(docObjects[0].GetSelectRow(),"phys_attr_nm",comboInfo);
			} else if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"ibflag") == "R"){
					
				docObjects[0].CellComboItem(sheetCnt,"phys_attr_nm",comboInfo);
				//docObjects[0].SetColProperty(0,"phys_attr_nm",comboInfo);
			} else {
				docObjects[0].CellComboItem(docObjects[0].GetSelectRow(),"phys_attr_nm",comboInfo);
			}
			
		} else {
			
			var comboInfo = {ComboText:'', ComboCode:''};
			
			if (docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"ibflag") == "I"){
				docObjects[0].CellComboItem(docObjects[0].GetSelectRow(),"phys_attr_nm",comboInfo);
			} else if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"ibflag") == "R"){
					
				docObjects[0].CellComboItem(sheetCnt,"phys_attr_nm",comboInfo);
			} else {
				docObjects[0].CellComboItem(docObjects[0].GetSelectRow(),"phys_attr_nm",comboInfo);
			}
			
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: MGT_HIS_0020.319");        
	}
}


function setRegister(event){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var strReg ="";
	event=="S"?strReg="Registered":strReg="Register"
	sheetObj.SetCellValue(sheetObj.GetSelectRow(),"fom_ctnt",strReg,0);
}


function checkValue(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	
	for(var i=2; i<=sheetObj.LastRow();i++){
				
		// Alert Type 이  A 일 경우 기간 설정 및 Term값 입력 체크 		
		var alt_type = sheetObj.GetCellValue(i,"alt_tp");
		if (alt_type =="A"){
			var st_days = sheetObj.GetCellValue(i,"st_days");
			var end_days = sheetObj.GetCellValue(i,"end_days");	
			var batch_tm = sheetObj.GetCellValue(i,"batch_tm");
			if (st_days == 0) {
				alert("Please Check Starting Time");
				sheetObj.SelectCell(i,'st_days');
				return false;
			}
			/*
			if (end_days == 0) {
				alert("Please Check Endintg Time");
				sheetObj.SelectCell(i,'end_days');
				return false;
			}*/
			
			if (batch_tm == "") {
				alert("Please Check Term");
				sheetObj.SelectCell(i,'batch_tm');
				return false;
			}
		}
		
		
		// Form 등록 체크 
		// insert 일 경우엔 ALT_SEQ가 없기 때문에 Form저장 체크를 하지 않는다.
		var ibflag = sheetObj.GetCellValue(i,"ibflag");
		var fom_ctnt = sheetObj.GetCellValue(i,"fom_ctnt");
		if (ibflag != 'I' && fom_ctnt == "Register"){
			alert("Please Register Alert Form");
			sheetObj.SelectCell(i,'fom_ctnt');
			return false;
		}
	}	
	
	return true;
}

