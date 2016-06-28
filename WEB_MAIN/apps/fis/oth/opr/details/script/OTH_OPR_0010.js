var rtnary=new Array(2);
var callBackFunc = "";
var TODAY;
var isInvStsOk=false;
function doWork(srcName) {
	if(!btnGetVisible(srcName)){
		return;
	}
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var formObj=document.frm1;
	switch (srcName) {
		case "NEW":
			//clearAll();
			doShowProcess();
			
			var currLocUrl=this.location.href;
			currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
			currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
			//parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
			
			window.location.href = currLocUrl
			
	        break;
		case "ROWADD":
			var intRows=sheetObj2.LastRow()+1;
			sheetObj2.DataInsert(intRows);
		break;
		case "SELECT":
			formObj.f_cmd.value=SEARCH;
			formObj.action="OTH_OPR_0010.clt";
	    	formObj.submit();
		break;
		case "SEARCHLIST":
			formObj.f_cmd.value=SEARCHLIST;
			sheetObj2.DoSearch("OTH_OPR_0011GS.clt", FormQueryString(formObj) );
		break;
		case "REMOVE":
			ajaxSendPost(checkOthInvReq, 'reqVal', '&goWhere=aj&bcKey=getCheckOthInv&oth_seq='+formObj.oth_seq.value, './GateServlet.gsl');
		   	if(isInvStsOk){
				if (confirm(getLabel('FMS_COM_CFMDEL'))) {
					formObj.f_cmd.value=REMOVE;
					formObj.action="OTH_OPR_0010.clt";
			    	formObj.submit();
				}
		   	 }else{
		   	 		alert(getLabel('FMS_COM_ALT022'));
		   	 }
		break;
		case "MODIFY"://저장
			// 필수값 check
			if(checkAll()){
				// #48893 - [BINEX] OPEN Invoice 관련 - MB/L 공백제거 
		     	frm1.ref_no.value=trim(frm1.ref_no.value);
		     	frm1.mbl_no.value=trim(frm1.mbl_no.value);
		     	frm1.hbl_no.value=trim(frm1.hbl_no.value);
		     	   
				if (confirm(getLabel('FMS_COM_CFMSAV'))) {
					if (frm1.oth_seq.value == ""){
						frm1.save_sts_flg.value="I";
					} else {
						frm1.save_sts_flg.value="U";
					}
					formObj.f_cmd.value=MODIFY;
					formObj.pck_qty.value=removeComma(formObj.pck_qty.value);
					formObj.grs_wgt_l.value=removeComma(formObj.grs_wgt_l.value);
					formObj.grs_wgt_k.value=removeComma(formObj.grs_wgt_k.value);
					formObj.meas_m.value=removeComma(formObj.meas_m.value);
					formObj.meas_f.value=removeComma(formObj.meas_f.value);
					var intRows=sheetObj.LastRow() + 1;
			        sheetObj.DataInsert(intRows);
					var sht2=sheetObj2.GetSaveString(false);
					sheetObj.DoAllSave("./OTH_OPR_0010GS.clt", FormQueryString(formObj)+'&'+sht2, true);
				}
			}
		break;
		case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="";
	   		rtnary[1]=formObj.cust_nm.value;
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "CUSTOMER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	    
		break;
		case "PICKUP_LOC_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="";
	   		rtnary[1]=formObj.pu_loc_nm.value;
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "PICKUP_LOC_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		break;
		case "DOOR_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="";
	   		rtnary[1]=formObj.door_loc_nm.value;
	   		rtnary[2]=window;
  	        callBackFunc = "DOOR_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
		break;
        case "COMMODITY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(1);
	   		rtnary[0]="1";
	        callBackFunc = "COMMODITY_POPLIST";
	        modal_center_open('./CMM_POP_0110.clt', rtnary, 556,483,"yes");
	        
        break;
		case "PACKAGE_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
			rtnary[0]="1";
			var rtnVal= ComOpenWindow('./CMM_POP_0120.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px", true);
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				return;
			} else {
				var rtnValAry=rtnVal.split("|");
				frm1.pck_ut_cd.value=rtnValAry[0];
			}
		break;
		case "DOC_SAVE":
			var isDel=false;
			for(var i=1; i < docObjects[2].LastRow() + 1; i++){
				if(docObjects[2].GetCellValue(i, 'doc_ibflag')=='D'){
					isDel=true;
					break;
				}
			}
			if (isDel&&confirm(getLabel('FMS_COM_CFMSAV'))) {
	   	 		frm1.f_cmd.value=COMMAND03;
	   	 		docObjects[2].DoAllSave("./OTH_OPR_0010_1GS.clt", FormQueryString(frm1), true);
			}else if(!isDel){
				alert(getLabel('FMS_COM_ALT028'));
			}
   	 	break;
   	 	case "SNDEML":	//Email전송
    		var reqParam='?intg_bl_seq='+frm1.ref_no.value;
       		reqParam += '&openMean=SEARCH01';
   	   		popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
   	    break;
   	 	case "DOCFILE":	//첨부파일
   	 		var reqParam='?intg_bl_seq='+frm1.ref_no.value;
   	 		/**  Document List ==> Common Memo 연동 파라미터 (S) */
    		reqParam += '&palt_mnu_cd=OTH';
    		reqParam += '&opr_no='+frm1.ref_no.value;
    		/**  Document List ==> Common Memo 연동 파라미터 (E) */
   	 		reqParam += '&openMean=SEARCH01';
   	 		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDoc', 806, 450, "scroll:no;status:no;help:no;");
   	 	break;
   	 	case "SEARCHLIST03":
   	 		if(frm1.ref_no.value!=""){
   	 			frm1.f_cmd.value=SEARCHLIST03;
   	 			docObjects[2].DoSearch("./OTH_OPR_0010_1GS.clt", FormQueryString(frm1) );
   	 			frm1.memo_txt.value="";
   	 		}
	 	break;
	   /* #20552 : [ADVC] Other Operation 에 Copy 기능 추가, jsjang 2013.10.24 */
       case "COPY":	//조회
 	   if(confirm(getLabel('FMS_COM_CFMCPY'))){
            frm1.f_cmd.value=COMMAND05;
     	    //doShowProcess();
			formObj.action="OTH_OPR_0010.clt";
	    	formObj.submit();
 	   }
  	 	case "S_DOC":
    		var sheetObj3=docObjects[2];	
   	 		if(sheetObj3.GetTotalRows()> 0){
	   	 		var formObj=document.frm1;
	   	 		formObj.file_name.value='doc_list.mrd';
	   	 		formObj.title.value='Document List';
	   	 		//Parameter Setting
	   	 		var param='[' + formObj.ref_no.value + ']';			// [1]
	   	 		param += '[OTH]'; 										// [2] MASTER/HOUSE/OTH 여부
	   	 		param += '[' + formObj.ref_no.value + ']';				// [3] MBL_NO/HBL_NO
	   	 		param += '[' + formObj.user_id.value + ']';				// [4]
	   	 		formObj.rd_param.value=param;
	   	 		popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			}
  	 		break; 
  	 		
  	 	case "GOTOACCT":
			var ref_no  = formObj.ref_no.value;
			var oth_seq = formObj.oth_seq.value;
			var paramStr = "./ACC_INV_0040.clt?f_cmd=-1&s_oth_ref_no="+ref_no+"&s_oth_seq="+oth_seq;
	        parent.mkNewFrame('Invoice List', paramStr);
	
		break;
		
 	   break;	 	
	}
}

function LOCATION_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		//frm1.pod_cd.value = "";
		var rtnValAry=rtnVal.split("|");
		if (curObj == "pod") {
			frm1.pod_cd.value=rtnValAry[0];// loc_cd
			frm1.pod_nod_cd.value=rtnValAry[1];// nod_cd
			frm1.pod_nm.value=rtnValAry[2];// loc_nm
		} else if (curObj == "org") {
			frm1.pol_cd.value=rtnValAry[0];// loc_cd
			frm1.pol_cd.value=rtnValAry[1];// nod_cd
			frm1.pol_nm.value=rtnValAry[2] + ', ' + rtnValAry[4];// loc_nm
			ajaxSendPost(setNodPic, 'reqVal',
					'&goWhere=aj&bcKey=getNodePic&callId=O&node_cd='
							+ rtnValAry[1], './GateServlet.gsl');
		} else if (curObj == "org2") {
			frm1.pol_cd.value=rtnValAry[0];// loc_cd
			frm1.pol_cd.value=rtnValAry[1];// nod_cd
			frm1.pol_nm.value=rtnValAry[2] + ', ' + rtnValAry[4];// loc_nm
			ajaxSendPost(setNodPic, 'reqVal',
					'&goWhere=aj&bcKey=getNodePic&callId=O2&node_cd='
							+ rtnValAry[1], './GateServlet.gsl');
		} else if (curObj == "via") {
			frm1.pol_cd.value=rtnValAry[0];// loc_cd
			frm1.pol_cd.value=rtnValAry[1];// nod_cd
			frm1.pol_nm.value=rtnValAry[2] + ', ' + rtnValAry[4];// loc_nm
		} else if (curObj == "dest") {
			frm1.pol_cd.value=rtnValAry[0];// loc_cd
			frm1.pol_cd.value=rtnValAry[1];// nod_cd
			frm1.pol_nm.value=rtnValAry[2] + ', ' + rtnValAry[4];// loc_nm
			ajaxSendPost(setNodPic, 'reqVal',
					'&goWhere=aj&bcKey=getNodePic&callId=D&node_cd='
							+ rtnValAry[1], './GateServlet.gsl');
		}
		
		
	}
}

function USER_POPLIST2(rtnVal){
	var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.opr_usrid.value=rtnValAry[0];
	}
}

function OFFICE_GRID_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(cur_curObj.id == "ctrbOfc"){
			formObj.ctrb_ofc_cd.value=rtnValAry[0];
		}else{
			formObj.sls_ofc_cd.value=rtnValAry[0];
		}
	}
}

function USER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.sls_usrid.value=rtnValAry[0];
	}
}

function DOOR_POPLIST(rtnVal){
  	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.door_loc_cd.value=rtnValAry[0];//full_nm
		formObj.door_loc_nm.value=rtnValAry[2];//full_nm
	}  
}

function PICKUP_LOC_POPLIST(rtnVal){
  	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.pu_loc_cd.value=rtnValAry[0];//full_nm
		formObj.pu_loc_nm.value=rtnValAry[2];//full_nm
	}
}

function F_DEST_DATE(rtnVal){
	if( rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined ) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		frm1.fnl_dest_loc_cd.value=rtnValAry[0];
		frm1.fnl_dest_loc_nm.value=rtnValAry[2];
	}
}

function POL_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		frm1.pol_cd.value=rtnValAry[0];// loc_cd
		frm1.pol_nod_cd.value=rtnValAry[1];// nod_cd
		frm1.pol_nm.value=rtnValAry[2];// loc_nm
	}
}

function POD_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		frm1.pod_cd.value=rtnValAry[0];// loc_cd
		frm1.pod_nod_cd.value=rtnValAry[1];// nod_cd
		frm1.pod_nm.value=rtnValAry[2];// loc_nm
	}
}


function COMMODITY_POPLIST(rtnVal){
	var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.cmdt_cd.value=rtnValAry[0];
		formObj.cmdt_nm.value=rtnValAry[2];
	}
}

function CUSTOMER_POPLIST(rtnVal){
  	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.cust_cd.value=rtnValAry[0];//full_nm
		formObj.cust_nm.value=rtnValAry[2];//full_nm
		setCtrbMgn(rtnValAry[0]);
	}
}

//화면 이동
//var paramStr = "./SEE_BMD_0030.clt?f_cmd="+SEARCHLIST02+"&f_hbl_bl_seq="+frm1.intg_bl_seq.value;
//parent.mkNewFrame('S/R Entry', paramStr);
var cur_curObj;
function openPopUp(srcName, curObj) {
	cur_curObj = curObj;
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
	var frm1=document.frm1;
	try {
		switch (srcName) {
		
			case "LOCATION_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]="";
				callBackFunc = "LOCATION_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
			break;
			case "POL_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]=frm1.pol_nm.value;
				
				callBackFunc = "POL_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
			break;
			case "POD_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]=frm1.pod_nm.value;
				
				callBackFunc = "POD_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
				
				/*
				var rtnVal =  ComOpenWindow('./CMM_POP_0030.clt',  rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:440px" , true);
				if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					return;
				} else {
					var curObjId=curObj.id;
					var rtnValAry=rtnVal.split("|");
					//frm1.pol_cd.value = "";
					frm1.pod_cd.value=rtnValAry[0];// loc_cd
					frm1.pod_nod_cd.value=rtnValAry[1];// nod_cd
					frm1.pod_nm.value=rtnValAry[2];// loc_nm
				}
				*/
			break;
			case "F_DEST_DATE":
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]=frm1.fnl_dest_loc_nm.value;
				
				callBackFunc = "F_DEST_DATE";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
			break;
	        case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		
		   		callBackFunc = "USER_POPLIST";
		   		modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
	        break;
	        case "USER_POPLIST2"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		callBackFunc = "USER_POPLIST2";
		   		modal_center_open('./CMM_POP_0060.clt', rtnary, 556,470,"yes");
	        break;
	        case "OFFICE_GRID_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       		rtnary=new Array(2);
		   		rtnary[0]="1";
		   		callBackFunc = "OFFICE_GRID_POPLIST";
		   		modal_center_open('./CMM_POP_0150.clt', rtnary, 556,580,"yes");
	        break;
	        
		} // end switch
	} catch (e) {
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
function setCtrbDeptCd(){
	var formObj = document.frm1;
	formObj.ctrb_dept_cd.value = "OT";
}

function setCtrbMgn(s_cust_cd) {
	var formObj=document.frm1;
	var s_post_dt = formObj.post_dt.value;
	
	if (typeof(formObj.ctrb_ofc_cd)!='undefined')
	{
		if (s_post_dt != ""){
			ajaxSendPost(searchCtrbMgnReq, "reqVal", "&goWhere=aj&bcKey=searchCtrbMgn&s_cust_cd="+s_cust_cd + "&s_post_dt="+s_post_dt, "./GateServlet.gsl");
		}
	}
}

function checkBoxSetting(){
	var formObj=document.frm1;
	
	if(formObj.ctrb_ratio_yn.value=="Y"){
		formObj.ctrb_ratio_yn.checked=true;
	}else{
		formObj.ctrb_ratio_yn.checked=false;
	}
}


function searchCtrbMgnReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@^^@');
			
			formObj.ctrb_ofc_cd.value = rtnArr[0];
			formObj.ctrb_ratio_yn.value = rtnArr[1];
			formObj.ctrb_mgn.value = doMoneyFmt(Number(rtnArr[2]).toFixed(2));
			
			setCtrbDeptCd();
		} else {
			formObj.ctrb_ofc_cd.value = "";
			formObj.ctrb_ratio_yn.value = "N";
			formObj.ctrb_mgn.value = "";
			formObj.ctrb_dept_cd.value = "";
		}
		
		if(formObj.ctrb_ratio_yn.value=="Y"){
			formObj.ctrb_ratio_yn.checked=true;
		}else{
			formObj.ctrb_ratio_yn.checked=false;
		}
	}
}

/**
 * 달력 POPUP
 * @param doWhat
 * @param frm1
 * @return
*/
function doDisplay(doWhat, frm1){
    switch(doWhat){
        case 'DATE_ETD':    //달력 조회 팝업 호출      
            var cal=new ComCalendar(); 
        	cal.select(frm1.etd_dt_tm,  'MM-dd-yyyy');
        break;
        case 'DATE_ETA':   //달력 조회 팝업 호출      
            var cal=new ComCalendar(); 
        	cal.select(frm1.eta_dt_tm,  'MM-dd-yyyy');
        break;        
        case 'DATE_FETA':   //달력 조회 팝업 호출      
            var cal=new ComCalendar(); 
        	cal.select(frm1.feta_dt_tm,  'MM-dd-yyyy');
        break;  
        case 'DATE_POST':   //달력 조회 팝업 호출  
            var cal=new ComCalendar(); 
        	cal.select(frm1.post_dt,  'MM-dd-yyyy');
        break;
    }
}
/*
 * function saveValid(sheetObj){ var rows = sheetObj.Rows; var cnt = 0; for(var
 * i = 1 ; i < rows ; i++){ if(sheetObj.CellValue(i, "ibflag") != "R"){
 * if(sheetObj.CellValue(i, "oth_tp") == ""){ alert("[Type] is mandatory
 * field!") return false; } cnt++; } } if(cnt == 0){ alert("No data to save!")
 * return false; }else{ return true; } }
 */
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
	if (frm1.ref_no.value == ""){
		frm1.save_sts_flg.value="I";
	} else {
		frm1.save_sts_flg.value="U";
	}
	for(var i=0;i<docObjects.length;i++){
		//khlee-시작 환경 설정 함수 이름 변경
	    comConfigSheet(docObjects[i], SYSTEM_FIS);
	    initSheet(docObjects[i],i+1);
	    //khlee-마지막 환경 설정 함수 추가
	    comEndConfigSheet(docObjects[i]);
	}
	frm1.ctrb_mgn.value=doMoneyFmt(Number(frm1.ctrb_mgn.value).toFixed(2));
	checkBoxSetting();
	//오늘일자구하기
	var now=new Date(); 				
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1; 		
	var date=now.getDate(); 			
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	TODAY=month + "-" + date + "-" + year;
	if(formObj.post_dt.value == ""){
		formObj.post_dt.value=TODAY;
	}else{
		var post_dt=formObj.post_dt.value;
		//formObj.post_dt.value = post_dt.substr(0,2) + "-" + post_dt.substr(2,2) + "-" + post_dt.substr(4,4);
	}
	if(formObj.ref_no.value != ""){
		doWork('SEARCHLIST');
	}
	if(formObj.sls_usrid.value == ""){
		formObj.sls_usrid.value=formObj.f_usr_id.value;
	}
	if(formObj.sls_ofc_cd.value == ""){
		formObj.sls_ofc_cd.value=formObj.f_ofc_cd.value;
	}
	if(formObj.opr_usrid.value == ""){
		formObj.opr_usrid.value=formObj.f_usr_id.value;
	}
	/* #20552 : [ADVC] Other Operation 에 Copy 기능 추가, jsjang 2013.10.24 */
	if(formObj.oth_seq.value != ""){
		getObj('btnCopy').style.display='inline';
		getObj('btnAccounting').style.display='inline';
	}
	//LHK, 20131028 setPost_date(save_flag) 추가 비교 로직으로 인해 저장 후 org_post_dt reset
	setBlock_dt();
	//LHK, 20140228, #26595  Other Operation 의 Accounting Validation 
	if(formObj.f_sts_cd.value == "B"){
		formObj.cust_cd.className='search_form-disable';
		formObj.cust_cd.disabled=true;
		formObj.cust_nm.className='search_form-disable';
		formObj.cust_nm.disabled=true;
		formObj.cust.disabled = true;
		formObj.post_dt.className='search_form-disable';
		formObj.post_dt.disabled=true;
		formObj.post_dt_cal.style.display="none";
		formObj.ofc_cd.className='search_form-disable';
		formObj.ofc_cd.disabled=true;
	}else{
		formObj.cust_cd.className='search_form';
		formObj.cust_cd.disabled=false;
		formObj.cust_nm.className='search_form';
		formObj.cust_nm.disabled=false;
		formObj.cust.disabled = false;
		formObj.post_dt.className='search_form';
		formObj.post_dt.disabled=false;
		formObj.post_dt_cal.style.display="inline";
		formObj.ofc_cd.className='search_form';
		formObj.ofc_cd.disabled=false;
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
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('OTH_OPR_0010_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"g_ref_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"g_type",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"g_mbl_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"g_hbl_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"g_oth_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Status",    Hidden:0, Width:1,    Align:"Center",  ColMerge:1,   SaveName:"g_ibflag" } ];
	         
	        InitColumns(cols);
	        SetEditable(1);
	        SetVisible(false);
	     }                                                      
	   break;
       case 2:      //IBSheet1 init
          with (sheetObj) {
    	   	SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

    	   	var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	   	var headers = [ { Text:getLabel('OTH_OPR_0010_HDR2'), Align:"Center"} ];
    	   	InitHeaders(headers, info);

         var cols = [ {Type:"DelCheck",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, HeaderCheck: 0 },
                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cntr_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"seal_no1",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                {Type:"Int",       Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"cgo_pck_qty",   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
                
                {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"cgo_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	            {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"cgo_wgt1",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	            {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"cgo_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
	            {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"cgo_meas1",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
                
                {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"cntr_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"oth_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Status",    Hidden:1, Width:1,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" } ];
          
         	InitColumns(cols);
         	SetEditable(1);
         	SetColProperty('cntr_tpsz_cd', {ComboText:'|'+TPCD1, ComboCode:'|'+TPCD2} );
         	SetColProperty(0 ,"cntr_no" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
         	SetColProperty(0 ,"seal_no1" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
         	SetFocusAfterProcess(0);
         	SetSheetHeight(165);
         }                                                      
       break;
       case 3:					//첨부파일
	        with (sheetObj) {
           	SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

           	var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           	var headers = [ { Text:getLabel('OTH_OPR_0010_HDR3'), Align:"Center"} ];
           	InitHeaders(headers, info);

           	var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"doc_ibflag" },
                  {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"Del",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, HeaderCheck: 1 },
                  {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"palt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, HeaderCheck: 1 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_img_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_pdf_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_rmk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_msg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
            
		           InitColumns(cols);
		
		           SetCountPosition(0);
		           SetEditable(1);
		           SetImageList(0,APP_PATH+"/web/img/button/bt_img.gif");
		           SetImageList(1,APP_PATH+"/web/img/button/bt_pdf.gif");
		                 sheetObj.SetDataLinkMouse("palt_doc_nm",1);
		           sheetObj.SetDataLinkMouse("palt_doc_img_url",1);
		           sheetObj.SetDataLinkMouse("palt_doc_pdf_url",1);
		           SetFocusAfterProcess(0);
		           //SetAutoRowHeight(0);
		           SetSheetHeight(165);
	       }                                                      
	   break;
   }
}
//조회 후
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(sheetObj.GetCellValue(1, "g_ref_no") != "" && sheetObj.GetCellValue(1, "g_ref_no") != undefined){
		formObj.ref_no.value=sheetObj.GetCellValue(1, "g_ref_no");
		formObj.oth_seq.value=sheetObj.GetCellValue(1, "g_oth_seq");
		//Save success!
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
//		doWork("SEARCHLIST");
	}
}
//저장 후
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
//	if(sheetObj.CellValue(1, "g_ref_no") != "" && sheetObj.CellValue(1, "g_ref_no") != undefined){
	if(errMsg == "" || errMsg == undefined || errMsg == null){
		formObj.ref_no.value=sheetObj.GetCellValue(1, "g_ref_no");
		formObj.old_ref_no.value=sheetObj.GetCellValue(1, "g_ref_no");
		formObj.oth_seq.value=sheetObj.GetCellValue(1, "g_oth_seq");
		formObj.grs_wgt_l.value=doMoneyFmt(formObj.grs_wgt_l.value);
		formObj.grs_wgt_k.value=doMoneyFmt(formObj.grs_wgt_k.value);
		formObj.meas_f.value=doMoneyFmt(formObj.meas_f.value);
		formObj.meas_m.value=doMoneyFmt(formObj.meas_m.value);
		//Save success!
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
		formObj.org_post_dt.value=formObj.post_dt.value;
		doWork("SEARCHLIST");
		
		if(formObj.oth_seq.value != ""){
			getObj('btnCopy').style.display='inline';
			getObj('btnAccounting').style.display='inline';
		}
	}
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}

function sheet2_OnSearchEnd(sheetObj, row, col) {
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}

function sheet3_OnSearchEnd(sheetObj, row, col) {
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}

function sheet2_OnChange(sheetObj, row, col){
	var cntrColStr="cntr_no";
	if(sheetObj.ColSaveName(col)==cntrColStr){
		//Contaienr Number 유효성 검증
		if(sheetObj.GetCellValue(row, cntrColStr)!==''){
			var rtnVal=cntrNumCheck(sheetObj.GetCellValue(row, cntrColStr));
			if(rtnVal){		//정상인경우
				//중복 확인
				if(!checkCntrNo(sheetObj.GetCellValue(row, cntrColStr))){
					//This Container Number is already used!\nPlease check the Container Number!
					alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('FMS_COD_CNTR'));
					sheetObj.SetCellValue(row, cntrColStr,'',0);
					sheetObj.SelectCell(row, cntrColStr);
				}
			}
			else{
				//Proceed anyway? ...??? 
				if(confirm(getLabel('FMS_COM_CFMCON')) == false){
					sheetObj.SetCellValue(row, cntrColStr,'',0);
					sheetObj.SelectCell(row, cntrColStr);
				}else{
					//중복 확인
					if(!checkCntrNo(sheetObj.GetCellValue(row, cntrColStr))){
						//This Container Number is already used!\nPlease check the Container Number!
						alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('FMS_COD_CNTR'));
						sheetObj.SetCellValue(row, cntrColStr,'',0);
						sheetObj.SelectCell(row, cntrColStr);
					}
				}
			}
		}
	}
	
	switch(sheetObj.ColSaveName(col)){
		case "cgo_wgt":
			sheetObj.SetCellValue(row, "cgo_wgt1",roundXL(sheetObj.GetCellValue(row, col) / 0.453597315, 2),0);
		break;
		case "cgo_wgt1":
			sheetObj.SetCellValue(row, "cgo_wgt",roundXL(sheetObj.GetCellValue(row, col) * 0.453597315, 2),0);
		break;
		case "cgo_meas":
			sheetObj.SetCellValue(row, "cgo_meas1",roundXL(sheetObj.GetCellValue(row, col) * 35.3165, 3),0);
		break;
		case "cgo_meas1":
			sheetObj.SetCellValue(row, "cgo_meas",roundXL(sheetObj.GetCellValue(row, col) / 35.3165, 3),0);
		break;
	}
}

function sheet2_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow()== row && "cgo_meas1" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			doWork("ROWADD");
			sheetObj.SelectCell(sheetObj.LastRow(), 0);
		}
	}
}
/**
 * Container번호 중복확인
 */
function checkCntrNo(inCntrNo){
	var intRows=docObjects[1].LastRow() + 1;
	var loopNum=0;
	for(var i=1; i < intRows; i++){
		if(inCntrNo==docObjects[1].GetCellValue(i, 'cntr_no')){
			loopNum++;	
		}
	}
	if(loopNum>1){
		return false;
	}else{
		return true;
	}
}
function weightChange(obj){
	var formObj=document.frm1;
	if(obj.name=="grs_wgt_k"){
		formObj.grs_wgt_l.value=doMoneyFmt(roundXL(formObj.grs_wgt_k.value.replaceAll(",","") / 0.453597315, 2));
	}else if(obj.name=="grs_wgt_l"){
		formObj.grs_wgt_k.value=doMoneyFmt(roundXL(formObj.grs_wgt_l.value.replaceAll(",","") * 0.453597315, 2));
	}
}
function cbmChange(obj){
	var formObj=document.frm1;
	if(obj.name=="meas_m"){
		formObj.meas_f.value=doMoneyFmt(roundXL(formObj.meas_m.value.replaceAll(",","") * 35.3165, 3));
	}else if(obj.name=="meas_f"){
		formObj.meas_m.value=doMoneyFmt(roundXL(formObj.meas_f.value.replaceAll(",","") / 35.3165, 3));
	}
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
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="Location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="Location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}else if ( tmp == "onChange" ) {
			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}
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
			if(CODETYPE == "Location_por"){	
				if(masterVals[0]==''){
					formObj.por_cd.focus();
				}else{
					formObj.por_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd
					formObj.por_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
				}
			}else if(CODETYPE == "Location_pol"){
				if(masterVals[0]==''){
					formObj.pol_cd.focus();
				}else{
					formObj.pol_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd
					formObj.pol_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
				}
			}else if(CODETYPE == "Location_pod"){
				if(masterVals[0]==''){
					formObj.pod_cd.focus();
				}else{
					formObj.pod_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd 
					formObj.pod_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
				}
			}else if(CODETYPE == "Location_del"){
				if(masterVals[0]==''){
					formObj.del_cd.focus();
				}else{
					formObj.del_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd 
					//formObj.del_nod_cd.value= masterVals[1];//nod_cd
					//formObj.del_nm.value    = masterVals[3]+', '+masterVals[4];//loc_nm
					formObj.del_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
				}
			}else if(CODETYPE == "Location_dest"){
				formObj.fnl_dest_loc_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd 
				//formObj.fnl_dest_nod_cd.value = masterVals[1];//nod_cd
				//formObj.fnl_dest_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
				formObj.fnl_dest_loc_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
			}else if(CODETYPE == "commodity"){
				formObj.cmdt_cd.value=masterVals.length > 0 ? masterVals[0] : ""; 
				formObj.cmdt_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
			}else if(CODETYPE == "trdpCode_cs"){
				formObj.cust_cd.value=masterVals.length > 0 ? masterVals[0] : ""; 
				formObj.cust_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
				setCtrbMgn(formObj.cust_cd.value);
			}else if(CODETYPE == "trdpCode_pu"){
				formObj.pu_loc_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd 
				formObj.pu_loc_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
			}else if(CODETYPE == "trdpCode_door"){
				formObj.door_loc_cd.value=masterVals.length > 0 ? masterVals[0] : ""; 
				formObj.door_loc_nm.value=masterVals.length > 3 ? masterVals[3] : "";
			}else if(CODETYPE == "booking_s"){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "bkg_no",masterVals.length > 0 ? masterVals[0] : "", 0); 
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "intg_bl_seq",masterVals.length > 1 ? masterVals[1] : "", 0); 
			}
		}else{
			if(CODETYPE == "Location_por"){
				formObj.por_cd.value="";//loc_cd
				//formObj.por_nod_cd.value = "";//nod_cd
				formObj.por_nm.value="";//loc_nm
				formObj.por_cd.focus();
			}else if(CODETYPE == "Location_pol"){
				formObj.pol_cd.value="";//loc_cd
				//formObj.pol_nod_cd.value = "";//nod_cd
				formObj.pol_nm.value="";//loc_nm
				formObj.pol_cd.focus();
			}else if(CODETYPE == "Location_pod"){
				formObj.pod_cd.value="";//loc_cd
				//formObj.pod_nod_cd.value = "";//nod_cd
				formObj.pod_nm.value="";//loc_nm
				formObj.pod_cd.focus();
			}else if(CODETYPE == "Location_del"){
				formObj.del_cd.value="";//loc_cd 
				//formObj.del_nod_cd.value = "";//nod_cd
				formObj.del_nm.value="";//loc_nm
				formObj.del_cd.focus();
			}else if(CODETYPE == "Location_dest"){
				formObj.fnl_dest_loc_cd.value="";//loc_cd
				//formObj.fnl_dest_nod_cd.value = "";//nod_cd
				formObj.fnl_dest_loc_nm.value="";//loc_nm
				formObj.fnl_dest_loc_cd.focus();
			}else if(CODETYPE == "commodity"){
				formObj.cmdt_cd.value=""; 
				formObj.cmdt_nm.value="";
			}else if(CODETYPE == "trdpCode_cs"){
				formObj.cust_cd.value=""; 
				formObj.cust_nm.value="";//loc_nm	
			}else if(CODETYPE == "trdpCode_pu"){
				formObj.pu_loc_cd.value="";
				formObj.pu_loc_cd.focus();
			}else if(CODETYPE == "trdpCode_door"){
				formObj.door_loc_cd.value=""; 
				formObj.door_loc_nm.value="";
			}else if(CODETYPE == "booking_s"){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "bkg_no","", 0); 
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "intg_bl_seq","", 0);
			}
		}
	}else{
		//Error occurred!
		alert(getLabel('FMS_COM_ERR001'));
	}
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
//		  if(collTxt[i].name != "f_usr_id" && collTxt[i].name != "f_ofc_cd"){
//	  			collTxt[i].value = "";
//			}
			if(!(collTxt[i].name == "f_usr_id" || collTxt[i].name == "f_ofc_cd" || 
					collTxt[i].name == "grs_wgt_ut_cd" || collTxt[i].name == "grs_wgt_ut_cd1" ||
					collTxt[i].name == "meas_ut_cd" || collTxt[i].name == "meas_ut_cd1")){
				collTxt[i].value="";
			}
	  }           
	}
	setSelection();
	frm1.type[0].selected=true;
	frm1.pck_ut_cd[0].selected=true;
	frm1.post_dt.value=TODAY;
	sheetObj2.RemoveAll();
	docObjects[2].RemoveAll();
	formObj.sls_usrid.value=formObj.f_usr_id.value;
	formObj.sls_ofc_cd.value=formObj.f_ofc_cd.value;
	formObj.opr_usrid.value=formObj.f_usr_id.value;
	//LHK, 20131028 setPost_date(event_flag) 추가 비교 로직으로 인해 저장 후 org_post_dt reset
	setBlock_dt();
}
//필수값 체크
function checkAll(){
	var formObj=document.frm1;
	var rtnVal=true;
	if(frm1.ofc_cd.value == ""){
//		alert("[Office] is mandatory field. ");
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('ITM_OFFICE_CD'));	
		frm1.ofc_cd.focus();
		rtnVal=false;
	}else if(frm1.cust_cd.value == ""){
//		alert("[Customer] is mandatory field. ");
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CUST'));	
		frm1.cust_cd.focus();
		rtnVal=false;
	}else if(frm1.post_dt.value == ""){
//		alert("[Post Date] is mandatory field. ");
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_POSTDT'));	
		frm1.post_dt.focus();
		rtnVal=false;
	}else if(checkInputVal(frm1.cntr_info.value, 0, 200, "T", 'Container Information')!='O'){
		frm1.cntr_info.focus();
		rtnVal=false;
	}else if(checkInputVal(frm1.int_memo.value, 0, 200, "T", 'Internal Memo')!='O'){
		frm1.int_memo.focus();
		rtnVal=false;
	}else if(checkInputVal(frm1.ext_memo.value, 0, 200, "T", 'External Memo')!='O'){
		frm1.ext_memo.focus();
		rtnVal=false;
	}
	var sheetObj2=docObjects[1];
	for(var i=1; i< docObjects[1].LastRow() + 1; i++){
		if(sheetObj2.GetCellValue(i, 'ibflag')=="I"){
			if(sheetObj2.GetCellValue(i, 'cntr_no')== "" && sheetObj2.GetCellValue(i, 'cntr_tpsz_cd')== ""
				&& sheetObj2.GetCellValue(i, 'seal_no1')== "" && sheetObj2.GetCellValue(i, 'cgo_pck_qty')== "0"){
				alert(getLabel('SUP_COM_ALT003'));	
				sheetObj2.SelectCell(i, 'cntr_no');
				rtnVal=false;
			}
		}
	}
	return rtnVal;	
}
function custEnterAction(obj, type){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}else if(type == "COMMODITY"){
			doWork("COMMODITY_POPLIST");
		}else if(type == "LOC_POL"){
			openPopUp('POL_POPLIST',obj);
		}else if(type == "LOC_POD"){
			openPopUp('POD_POPLIST',obj);
		}else if(type == "LOC_DEST"){
			openPopUp('F_DEST_DATE',obj);
		}else if(type == "LOC_PICKUP"){
			doWork('PICKUP_LOC_POPLIST',obj);
		}else if(type == "LOC_DOOR"){
			doWork('DOOR_POPLIST',obj);
		}
	}
}
//Invoice NO 중복체크를 한다.
function checkRefNo(){
	var formObj=document.frm1;
	if(formObj.ref_no.value != ""){
		if(formObj.ref_no.value != formObj.old_ref_no.value){
			ajaxSendPost(checkRefDup, 'reqVal', '&goWhere=aj&bcKey=checkRefDup&ref_no='+formObj.ref_no.value, './GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN
 * REF NO 중복체크
 */
function checkRefDup(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				//alert("Ref. No Duplicate!! ");
				alert(getLabel('FMS_COM_ALT008') + "\n - " + getLabel('FMS_COD_MISCFILNO'));	
				formObj.ref_no.value=formObj.old_ref_no.value;
				formObj.ref_no.select();
			}
		}
	}
}
function reloadDocList(){
	doWork("SEARCHLIST03");
}
function getSelectedFiles(){
	return docObjects[2];
}
/**
* IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
* sheet3_OnClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
*/
function sheet3_OnClick(sheetObj, Row, Col){	
  	var downType;
  	var s_palt_doc_seq;
  	var s_intg_bl_seq;
  	switch (sheetObj.ColSaveName(Col)) {
       case "palt_doc_img_url" :
    	   if(sheetObj.GetCellImage(Row, "palt_doc_img_url") != ""){
    	   s_palt_doc_seq=sheetObj.GetCellValue(Row,"palt_doc_seq");
    	   s_intg_bl_seq = sheetObj.GetCellValue(Row, "intg_bl_seq");
           downloadFile('org', s_intg_bl_seq, s_palt_doc_seq);
       	}
       	break;
       case "palt_doc_pdf_url" :
    	   if(sheetObj.GetCellImage(Row, "palt_doc_pdf_url") != ""){
    		   s_palt_doc_seq=sheetObj.GetCellValue(Row,"palt_doc_seq");
    		   s_intg_bl_seq = sheetObj.GetCellValue(Row, "intg_bl_seq");
	           downloadFile('pdf', s_intg_bl_seq, s_palt_doc_seq);
       	}
       	break;
	} // end switch
}
//파일 다운로드
function downloadFile(downType, s_intg_bl_seq, s_palt_doc_seq){
	document.frm2.docType.value=downType;
	document.frm2.s_palt_doc_seq.value=s_palt_doc_seq;
	document.frm2.intg_bl_seq.value = s_intg_bl_seq;
	//document.frm2.target = '_self';
	document.frm2.submit();
}

function sheet3_OnDblClick(sheetObj,Row,Col){
 	//Name선택 시에만 팝업 호출
 	if(sheetObj.ColSaveName(Col)=='palt_doc_no' || sheetObj.ColSaveName(Col)=='palt_doc_msg'){
 		var reqParam='?intg_bl_seq='+sheetObj.GetCellValue(Row, "intg_bl_seq");
 		reqParam += '&s_palt_doc_seq='+sheetObj.GetCellValue(Row,"palt_doc_seq");
 		reqParam += '&openMean='+SEARCH02;
 		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDocUp', 806, 550, "scroll:no;status:no;help:no;");
 	}
}

var ORG_BLOCK_DT=""; 		//MAX(BLOCK_DT)
var NEXT_BLOCK_DT="";    	//MAX(BLOCK_DT)+1
/** LHK, 20131025 #21734  [BINEX]Post Date Check 로직 적용
 *  File Block_dt 와 Post Date 체크, Post Date Set, BL 생성시 post date 에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
 **/
function setBlock_dt(){
	var formObj=document.frm1;
	//MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
 	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt', './GateServlet.gsl');
 	if(NEXT_BLOCK_DT != "") {
 		var nextBlockDtYMD=NEXT_BLOCK_DT.replaceAll("-", "");														//NEXT_BLOCK_DT  12-01-2013
			nextBlockDtYMD=nextBlockDtYMD.substring(4,8)+nextBlockDtYMD.substring(0,2)+nextBlockDtYMD.substring(2,4);	//nextBlockDtYMD 20131201
			ORG_BLOCK_DT=addDate('d', -1, nextBlockDtYMD, "");
			ORG_BLOCK_DT=ORG_BLOCK_DT.substring(4,6) + "-" + ORG_BLOCK_DT.substring(6,8) + "-" + ORG_BLOCK_DT.substring(0,4);
		//post_dt 와 block_dt 비교
		//fromDate > toDate true
		if(formObj.oth_seq.value == ""){
			if(compareTwoDate(NEXT_BLOCK_DT, formObj.post_dt.value)){
	 			formObj.post_dt.value=NEXT_BLOCK_DT;
	 		}
			formObj.org_post_dt.value=formObj.post_dt.value;
		}	
 	}
}
function checkPostDate(obj){
	var formObj=document.frm1;
	var post_dt=obj.value;
	//OnChange 시에 check 함
	if(post_dt == formObj.org_post_dt.value){
		return;
	}
	//Post Date 가 변경되는 경우에 NEXT_BLOCK_DT 보다 작으면 warnning massage 띄워줌
	if(NEXT_BLOCK_DT != "") {
		if(compareTwoDate(NEXT_BLOCK_DT, post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
			alert(getLabel2('SUP_COM_ALT007',new Array(ORG_BLOCK_DT)));	//The Post Date must be later than the block date (@)";
			formObj.post_dt.value=formObj.org_post_dt.value;
			formObj.post_dt.select();
			return false;
		}
	}
	
	setCtrbMgn(formObj.cust_cd.value);
}
function getMaxBlockOrJnrNextDt(reqVal){
 	var doc=getAjaxMsgXML(reqVal);
 	if(doc[0]=='OK'){
 		if(typeof(doc[1])!='undefined'){
 			NEXT_BLOCK_DT=doc[1];
 			NEXT_BLOCK_DT=NEXT_BLOCK_DT.substring(4,6) + "-" + NEXT_BLOCK_DT.substring(6,8) + "-" + NEXT_BLOCK_DT.substring(0,4);
 		}else{
			NEXT_BLOCK_DT="";
		}
 	}
}
function checkOthInvReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='N'){
			isInvStsOk=false;
		}else{
			isInvStsOk=true;
		}
	}
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	doShowProcess();
	$.ajax({
		   type: "POST",
		   url: "./OTH_OPR_0010AJ.clt?f_cmd="+getParam(url,"f_cmd")+"&ref_no="+getParam(url,"ref_no")+"&oth_seq="+getParam(url,"oth_seq"),
		   dataType: 'xml',
		   success: function(data){
			   setFieldValue( formObj.oth_seq, $('oth_seq',data).text());
			   setFieldValue( formObj.old_ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.f_sts_cd, $('sts_cd',data).text());
			   setFieldValue( formObj.org_post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.h_ofc_cd, $('ofc_cd',data).text());
			   setFieldValue( formObj.type, $('type',data).text());
			   setFieldValue( formObj.mbl_no, $('mbl_no',data).text());
			   setFieldValue( formObj.hbl_no, $('hbl_no',data).text());
			   setFieldValue( formObj.vsl_flt, $('vsl_flt',data).text());
			   setFieldValue( formObj.cust_cd, $('cust_cd',data).text());
			   setFieldValue( formObj.cust_nm, $('cust_nm',data).text());
			   setFieldValue( formObj.cust_ref_no, $('cust_ref_no',data).text());
			   setFieldValue( formObj.shpr_nm, $('shpr_nm',data).text());
			   setFieldValue( formObj.cnee_nm, $('cnee_nm',data).text());
			   setFieldValue( formObj.cmdt_cd, $('cmdt_cd',data).text());
			   setFieldValue( formObj.cmdt_nm, $('cmdt_nm',data).text());
			   setFieldValue( formObj.loc_nm, $('loc_nm',data).text());
			   setFieldValue( formObj.cntr_info, $('cntr_info',data).text());
			   setFieldValue( formObj.pol_cd, $('pol_cd',data).text());
			   setFieldValue( formObj.pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.pod_cd, $('pod_cd',data).text());
			   setFieldValue( formObj.pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.fnl_dest_loc_cd, $('fnl_dest_loc_cd',data).text());
			   setFieldValue( formObj.fnl_dest_loc_nm, $('fnl_dest_loc_nm',data).text());
			   setFieldValue( formObj.pu_loc_cd, $('pu_loc_cd',data).text());
			   setFieldValue( formObj.pu_loc_nm, $('pu_loc_nm',data).text());
			   setFieldValue( formObj.pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.grs_wgt_k, $('grs_wgt_k',data).text());
			   setFieldValue( formObj.grs_wgt_l, $('grs_wgt_l',data).text());
			   setFieldValue( formObj.meas_m, $('meas_m',data).text());
			   setFieldValue( formObj.meas_f, $('meas_f',data).text());
			   setFieldValue( formObj.post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.int_memo, $('int_memo',data).text());
			   setFieldValue( formObj.etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.feta_dt_tm, $('feta_dt_tm',data).text());
			   setFieldValue( formObj.door_loc_cd, $('door_loc_cd',data).text());
			   setFieldValue( formObj.door_loc_nm, $('door_loc_nm',data).text());
			   setFieldValue( formObj.h_curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.sls_usrid, $('sls_usrid',data).text());
			   setFieldValue( formObj.sls_ofc_cd, $('sls_ofc_cd',data).text());
			   setFieldValue( formObj.opr_usrid, $('opr_usrid',data).text());
			   setFieldValue( formObj.ext_memo, $('ext_memo',data).text());
			   setFieldValue( formObj.ctrb_ofc_cd, $('ctrb_ofc_cd',data).text());
			   setFieldValue( formObj.ctrb_dept_cd, $('ctrb_dept_cd',data).text());
			   setFieldValue( formObj.ctrb_ratio_yn, $('ctrb_ratio_yn',data).text());
			   setFieldValue( formObj.ctrb_mgn, $('ctrb_mgn',data).text());
			   
			   doBtnAuthority(attr_extension);
			   
			   setupPage();
			   doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}

function checkRatioValid(){
	var formObj = document.frm1;
	
	if (formObj.ctrb_ratio_yn.value == "Y"){
		if (Number(removeComma(formObj.ctrb_mgn.value)) > 50) {
			alert(getLabel2('FMS_COM_ALT076',new Array("50")));
			formObj.ctrb_mgn.value = "";
			formObj.ctrb_mgn.focus();
			return;
		}
	}
}

function clickCtrbRatioYn(){
	var formObj = document.frm1;
	
	frm1.ctrb_mgn.value = '';
	frm1.ctrb_mgn.focus();
}
