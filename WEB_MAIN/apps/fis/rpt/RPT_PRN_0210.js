//=========================================================
//*@FileName   : RPT_PRN_0210.jsp
//*@FileTitle  : CMM
//*@Description: package search pop
//*@author     : 
//*@version    : 
//*@since      : 
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/07/17
//*@since      : 2014/07/17
//=========================================================
function doWork(srcName){
	var formObj=document.frm1;
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    switch(srcName) {
	    case "CURR_SEARCH":
	        formObj.f_cmd.value=SEARCHLIST;
	        var f_curr_opt=document.getElementsByName("f_curr_opt");	//Currency Option
		    var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt != "O"){
				//Please, select the [One Currency]
	 	    	//alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_OCUR') + "\n\n: RPT_PRN_0210.16");
				//return;
				formObj.f_curr_one.checked=true; 
			}
		    if(formObj.f_curr_cd.value == ""){
		    	//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR') + "\n\n: RPT_PRN_0210.23");
				return;
			}
		    sheetObj.DoSearch("./RPT_PRN_0210GS.clt", FormQueryString(formObj) );
	    break;
		case 'Print':
			formObj.title.value='Profit Report';
			if(formObj.oth_seq.value == "") return;
			//Report 호출 메뉴 
			var air_sea_clss_cd=formObj.air_sea_clss_cd.value;
			var bnd_clss_cd=formObj.bnd_clss_cd.value;
			var biz_clss_cd=formObj.biz_clss_cd.value;
			var f_prn_opt=document.getElementsByName("f_prn_opt"); 
			var prn_opt=getRadioVal(f_prn_opt);
			//One, Multi Currency 선택 option
			var f_curr_opt=document.getElementsByName("f_curr_opt");		
			var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt == "O" && formObj.f_curr_cd.value == ""){
		    	//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR') + "\n\n: RPT_PRN_0190.50");
				return;
			}
			//alert("f_prn_opt : "+f_prn_opt + " f_curr_opt : "+f_curr_opt);
			//Parameter Setting
			var param="";
			var file_names="";
			//Multi Currency 인 경우 
			if(MULTI_CURR_FLAG == "Y"){
				if(curr_opt == "M"){					
					param += '[' + formObj.oth_seq.value + ']';  //$1
					param += '[' + air_sea_clss_cd + ']';        //$2
					param += '[' + bnd_clss_cd + ']';		     //$3
					param += '[' + biz_clss_cd + ']';		     //$4
					param += '[' + prn_opt + ']';				 //$5
					param += '[' + formObj.f_ofc_cd.value + ']'; //$6
					param += '['+']';		                     //$7
					param += '['+']';		                     //$8
					param += '[' + GLO_USR_ID + ']';             //$9
					
					//[Detail]
					if(prn_opt == "D")
					{	
						file_names += 'profit_report_other_dtl_multi_curr.mrd';
					}
					//[Summary]
					if(prn_opt == "S")
					{
						file_names += 'profit_report_other_smr_multi_curr.mrd';
					}
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;
					//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
	    
			    //One Currency 인 경우 
				if(curr_opt== "O"){
					
					//Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
		            if(currRateCheck(sheetObj)){
		            	return;
		            }
					
					param += '[' + formObj.oth_seq.value + ']';    //$1
					param += '[' + air_sea_clss_cd + ']';          //$2
					param += '[' + bnd_clss_cd + ']';		       //$3
					param += '[' + biz_clss_cd + ']';		       //$4
					param += '[' + prn_opt + ']';				   //$5
					param += '[' + formObj.f_ofc_cd.value + ']';   //$6
					param += '[' + formObj.f_curr_cd.options[formObj.f_curr_cd.selectedIndex].text + ']';		//$7 f_curr_cd
					param += '[' + getRateQuery() + ']';		   //$8 One 인 경우 Currency SQL
					param += '[' + GLO_USR_ID + ']';               //$9
					//[Detail]
					if(prn_opt == "D")
					{	
						file_names += 'profit_report_other_dtl_one.mrd';
					}
					//[Summary]
					if(prn_opt == "S")
					{
						file_names += 'profit_report_other_smr_one.mrd';
					}
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;					
					//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
			}else{
				//Multi Currency 인 경우 
				if(curr_opt == "M"){
					
					var profitCurr = PROFITCURR.split("|");				
					
					//for(var i = 0 ; i < profitCurr.length ; i ++){
						param += '[' + formObj.oth_seq.value + ']';  //$1
						param += '[' + air_sea_clss_cd + ']';        //$2
						param += '[' + bnd_clss_cd + ']';		     //$3
						param += '[' + biz_clss_cd + ']';		     //$4
						param += '[' + prn_opt + ']';				 //$5
						param += '[' + formObj.f_ofc_cd.value + ']'; //$6
						param += '['+']';		                     //$7
						param += '['+']';		                     //$8
						param += '[' + GLO_USR_ID + ']';             //$9
						
						//param += '[' + profitCurr[i] + ']';		//$7
						//if(i < profitCurr.length-1){
						//	param += '^@@^';
						//}	
						//[Detail]
						if(prn_opt == "D")
						{	
							file_names += 'profit_report_other_dtl_multi.mrd';
							//if(i < profitCurr.length-1){
							//	file_names += '^@@^';
							//}	
						}
						//[Summary]
						if(prn_opt == "S")
						{
							file_names += 'profit_report_other_smr_multi.mrd';
							//if(i < profitCurr.length-1){
							//	file_names += '^@@^';
							//}
						}
					//}
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;
					//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
				}
	    
			    //One Currency 인 경우 
				if(curr_opt== "O"){
					
					//Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
		            if(currRateCheck(sheetObj)){
		            	return;
		            }
					
					param += '[' + formObj.oth_seq.value + ']';     //$1
					param += '[' + air_sea_clss_cd + ']';           //$2
					param += '[' + bnd_clss_cd + ']';		        //$3
					param += '[' + biz_clss_cd + ']';		        //$4
					param += '[' + prn_opt + ']';				    //$5
					param += '[' + formObj.f_ofc_cd.value + ']';	//$6
					param += '[' + formObj.f_curr_cd.options[formObj.f_curr_cd.selectedIndex].text + ']';		//$7 f_curr_cd
					param += '[' + getRateQuery() + ']';		    //$8 One 인 경우 Currency SQL
					param += '[' + GLO_USR_ID + ']';                //$9
					//[Detail]
					if(prn_opt == "D")
					{	
						file_names += 'profit_report_other_dtl_one.mrd';
					}
					//[Summary]
					if(prn_opt == "S")
					{
						file_names += 'profit_report_other_smr_one.mrd';
					}
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;					
					//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
			}
		break;
		case "CLOSE":
	    	window.close();
    	break;
    }
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
	var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
	//khlee-시작 환경 설정 함수 이름 변경
	comConfigSheet(docObjects[i], SYSTEM_FIS);
	initSheet(docObjects[i],i+1);
	//khlee-마지막 환경 설정 함수 추가
	comEndConfigSheet(docObjects[i]);
	}
	formObj.f_curr_cd.value=formObj.h_curr_cd.value;
	
	if (prn_ofc_cd == "BNXC"){
   		formObj.f_opt_sum.checked = true ; 
   		formObj.f_opt_dtl.checked = false ;   		
   	}else{
   		formObj.f_opt_sum.checked = false ;
   		formObj.f_opt_dtl.checked = true ;   		
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
		case 1:      //IBSheet2 init
		with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('PFM_MGT_0030_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"aply_fm_dt",  KeyField:0,   CalcLogic:"",   Format:"Ym" },
	               {Type:"Float",     Hidden:0,  Width:110,  Align:"Right",   ColMerge:1,   SaveName:"rate",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 } ];
	         
	        InitColumns(cols);

	        SetEditable(1);
	        InitViewFormat(0, "aply_fm_dt", "MM\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        SetSheetHeight(145);
		} 
		break;
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
} 
function getRadioVal(radioObj){
	var rtnStr="";
	for(var i=0; i<radioObj.length; i++){
	   if(radioObj[i].checked==true)
	   {
		   rtnStr=radioObj[i].value;
	   }
	}
	return rtnStr;
}
function currRateCheck(sheetObj){
	var rtnVal=false;
	if(sheetObj.RowCount()> 0){
		for(var i=1; i<=sheetObj.LastRow();i++){
			if(sheetObj.GetCellValue(i, "rate") <= 0 ){
				sheetObj.SelectCell(i, "rate");
				rtnVal=true;
				alert(getLabel('PFM_COM_ALT018'));
				break;
			}
		}	
	}
	return rtnVal;
}
function getRateQuery(){
	var sheetObj=docObjects[0];
	var rateSQL="select  rate.curr_cd, rate.aply_fm_dt, rate.xch_rt_ut "
		+     "  from ( "
		;
	//ex)
	//select rate.curr_cd, rate.aply_fm_dt, rate.xch_rt_ut
	//from (
	//		select 'USD' as curr_cd, '201308' AS aply_fm_dt, 2 AS xch_rt_ut
	//      UNION
	//		select 'JPY' as curr_cd, '201308' AS aply_fm_dt, 2 AS xch_rt_ut
	//      ) rate
	if(sheetObj.RowCount()== 0){
		rateSQL += "         SELECT '" + '' + "' AS curr_cd, " 
								 + "'" + '' + "'  AS aply_fm_dt, "
								 + 0 + " AS xch_rt_ut ) rate ";
	}else{
		for(var i=1; i<=sheetObj.LastRow();i++){
			rateSQL += "         SELECT '" + sheetObj.GetCellValue(i, "curr_cd") + "' AS curr_cd, "
			+ "'" + sheetObj.GetCellValue(i, "aply_fm_dt") + "' AS aply_fm_dt, "
			+ sheetObj.GetCellValue(i, "rate") + " AS xch_rt_ut ";
	    	if(i < sheetObj.LastRow()){
	    		rateSQL += " UNION ";
	    	}else{
	    		rateSQL += "      ) rate ";
	    	}
		}	
	}
	return rateSQL;
}
