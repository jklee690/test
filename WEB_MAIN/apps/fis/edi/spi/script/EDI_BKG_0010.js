function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
            formObj.f_cmd.value=SEARCHLIST;
            sheetObj.DoSearch("./EDI_BKG_0010GS.clt", FormQueryString(formObj) );
       break;
		//EDI 전송 
       case "SEND_EDI":
			var chks=sheetObj.FindCheckedRow('chk');
			if(chks == ''){
				alert(getLabel('FMS_COM_ALT007'));
				return false;
			}
			for(var i=1;i<sheetObj.LastRow() + 1;i++){
				if(sheetObj.GetCellValue(i, "chk")=="1" && sheetObj.GetCellValue(i, "lnr_trdp_cd") != "HJSC"){		//현재 한진해운만 가능
					alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CARR'));
					return false;
				}
			}
			/*
			for(var i=2;i<sheetObj.LastRow() + 1;i++){
				if(sheetObj.GetCellValue(i, "chk")=="1" && sheetObj.GetCellValue(i, "mbl_no")==""){
					alert(getLabel('FMS_COM_ALT043') + '[ row : ' + i + ']');
					return;
				}
			}
			*/
		    formObj.f_cmd.value=COMMAND01;
		    if(confirm(getLabel('FMS_COM_CFMSENDEDI'))){
		    	sheetObj.DoAllSave("./EDI_BKG_0010GS.clt", FormQueryString(formObj) +'', true);
		    }
		break;
		
//       case "SEARCHLIST":
//           formObj.f_cmd.value=SEARCHLIST;
//           sheetObj.DoSearch("./EDI_BKG_0010GS.clt", FormQueryString(formObj) );
//       break;
		
		//Booking EDI 전송 
		case "SEND_BOOKING_EDI":
			/*
			 * 유효성 체크 보류
			 * 
			var chks=sheetObj.FindCheckedRow('chk');
			if(chks == ''){
				alert(getLabel('FMS_COM_ALT007'));
				return false;
			}*/
			
			for(var i=1;i<sheetObj.LastRow() + 1;i++){
				if(sheetObj.GetCellValue(i, "chk")=="1"){		//현재 한진해운만 가능
					if (!bkgEdiValidation(sheetObj,i)){
						return false;
					}
				}
			}
			
			/*
			 * sheetObj 사용 보류, Booking의 단건만 처리 
			 * 
			 for(var i=1;i<sheetObj.LastRow() + 1;i++){
				if(sheetObj.GetCellValue(i, "chk")=="1" && sheetObj.GetCellValue(i, "lnr_trdp_cd") != "HJSC"){		//현재 한진해운만 가능
					alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CARR'));
					return false;
				}
			}*/
			
		    formObj.f_cmd.value=COMMAND01;
		 
		    if(confirm(getLabel('FMS_COM_CFMSENDEDI'))){
		    	sheetObj.DataInsert(0);
		    	sheetObj.SetCellValue(1, "bkg_seq", "lnr_trdp_nm", "trnk_vsl_nm", "trnk_voy", "msg_no_seq", "msg_sts_nm");
		    	sheetObj.DoAllSave("./EDI_BKG_0010GS.clt", FormQueryString(formObj), false);
		    }
		break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
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
	doWork("SEARCHLIST");
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

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
//             var headers = [ { Text:getLabel('EDI_BKG_0010_HDR'), Align:"Center"} ];
             var headers = [ { Text:'No.|bkg_seq|Carrier|Vessel|Voyage|send_seq|edi_status', Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ 
	                    {Type:"Text",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"chk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"bkg_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	                    {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"trnk_vsl_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                    {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"trnk_voy",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"bkg_dt_tm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"po_no"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lc_no"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"prnr_trdp_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"prnr_trdp_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"act_shpr_trdp_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"act_shpr_trdp_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_addr"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_eml"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_phn"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_fax"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_cnt_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_addr"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_eml"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_phn"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_fax "},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_cnt_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_addr"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_eml"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_phn"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_fax "},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_cnt_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"exp_ref_no"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pu_trdp_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pu_trdp_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cgo_pu_trdp_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cgo_pu_trdp_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cgo_pu_trdp_addr"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rcv_wh_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rcv_wh_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trk_trdp_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trk_trdp_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cust_ref_no"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_info"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trnk_vsl_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"por_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"por_nod_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"por_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"por_un_loc_cd "},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pol_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pol_un_loc_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pol_nod_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pol_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pod_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pod_un_loc_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pod_nod_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pod_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"del_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"del_un_loc_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"del_nod_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"del_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"fnl_dest_loc_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"fnl_dest_nod_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"fnl_dest_loc_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_trdp_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_bkg_no"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_eml"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_phn"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_fax"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_cnt_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"etd_por_tm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shp_mod_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rep_cmdt_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rep_cmdt_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pck_qty"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pck_ut_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"grs_wgt_ut_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"grs_wgt"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"grs_wgt1"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"meas_ut_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"meas"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"meas1"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"fm_svc_term_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"to_svc_term_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cargo_tp_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cut_off_dt"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rail_cut_off_dt"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"wh_cut_off_dt"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"doc_cut_off_dt"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sls_ofc_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sls_dept_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sls_usrid"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sls_usr_nm"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rmk"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"dept_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rgst_usrid"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rgst_ofc_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rgst_tms"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"modi_usrid"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"modi_ofc_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"modi_tms"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"delt_flg"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_ctrt_no"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"frt_term_cd"},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"msg_no"},
	                  {Type:"Text",      Hidden:0, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"msg_no_seq", KeyField:0,   CalcLogic:"",   Format:"", PointCount:0,   UpdateEdit:0,   InsertEdit:1},
	                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"msg_sts"},
	                  {Type:"Text",      Hidden:0, Width:50,   Align:"Left",    ColMerge:1,   SaveName:"msg_sts_nm", KeyField:0,   CalcLogic:"",   Format:"", PointCount:0,   UpdateEdit:0,   InsertEdit:1}
                    ];
              
             InitColumns(cols);
             SetEditable(1);
             SetSheetHeight(305);
             
           }                                                      
         break;
     }
}

//조회 후 페이지징 표시
/*
function sheet1_OnSearchEnd(sheetObj, errMsg) {
	for ( var i = 1; i <= sheetObj.LastRow(); i++) {
		if (sheetObj.GetCellValue(i, "msg_sts") == "S") {
			sheetObj.SetCellValue(i, "block_flag", "Y");
		}
	}
}
*/

function sheet1_OnSaveEnd(sheetObj, errMsg){
	doWork('SEARCHLIST', '');
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

function bkgEdiValidation(sheetObj, row) {
	
	//BKG EDI Validation check
	// 1. i_booking check
//	if(sheetObj.GetCellValue(row, "lnr_trdp_cd") != "HJSC" && 
//			sheetObj.GetCellValue(row, "lnr_trdp_cd") != "CMDU" &&
//			sheetObj.GetCellValue(row, "lnr_trdp_cd") != "ECMU" &&
//			sheetObj.GetCellValue(row, "lnr_trdp_cd") != "HDMU" &&
//			sheetObj.GetCellValue(row, "lnr_trdp_cd") != "YMLU"){		//CMDU(ECMU), HJSC, HDMU, YMLU 
//		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CARR'));
//		return false;
//	}
	
	// 2. VSL VVD Check 
	var formObj=document.frm1;
	
/*    
	var vmlNm = formObj.vsl_nm.value();
	var voy   = formObj.voy.value();
	
	if (vmlNm == "" || voy == ""){
    	alert(getLabel('FMS_COM_ALT007') + "\n - "+ "Vessel/Voyage");
    	return false;
	}*/
	
	// 3. 이외 항목 check 
	var bkg_seq = 	   sheetObj.GetCellValue(row, "bkg_seq");
	var bkg_dt_tm   =   sheetObj.GetCellValue(row, "bkg_dt_tm");
	var ib_c_name = 	formObj.user_name.value();
	var ib_c_phn = 	formObj.user_phn.value();
	var ib_c_fax = 	formObj.user_fax.value();
	var ib_c_email = 	formObj.user_email.value();
	var trnk_vsl_nm =   	sheetObj.GetCellValue(row, "trnk_vsl_nm");
//	var ib_ref_tp = 	sheetObj.GetCellValue(row, "cust_ref_tp"); //BN고정값
	var cust_ref_no = 	sheetObj.GetCellValue(row, "cust_ref_no");
//	var ibcs_tp  = 		sheetObj.GetCellValue(row, "ibcs_tp"); //CA고정값
	var lnr_trdp_cd  =      sheetObj.GetCellValue(row, "lnr_trdp_cd");
	var lnr_trdp_nm	 = 		sheetObj.GetCellValue(row, "lnr_trdp_nm");
//    var ib_chg_tp  = 	sheetObj.GetCellValue(row, "ib_chg_tp");//고정값
	var frt_term_cd  =	sheetObj.GetCellValue(row, "frt_term_cd");
	var fm_svc_term_cd =    sheetObj.GetCellValue(row, "fm_svc_term_cd");
	var to_svc_term_cd =    sheetObj.GetCellValue(row, "to_svc_term_cd");
	var grs_wgt =      sheetObj.GetCellValue(row, "grs_wgt");
	var grs_wgt_ut_cd =     sheetObj.GetCellValue(row, "grs_wgt_ut_cd");
	var rep_cmdt_cd	= 		sheetObj.GetCellValue(row, "rep_cmdt_cd");
//	var icmd_desc	=		sheetObj.GetCellValue(row, "icmd_desc");미정

    
    // 1. null check
    if (bkg_seq == "") {  
    	alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Booking SEQ");
    	return false;
    }
    if (bkg_dt_tm == "") {  
    	alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Booking Date Time");
    	return false;
    }
    if (ib_c_name == "") {  
    	alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Login User Name");
    	return false;
    }
    if (trnk_vsl_nm == "") {  
    	alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Vessel Name");
    	return false;
    }
    if (cust_ref_no == "") {  
    	alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Customer Ref. No.");
    	return false;
    }
    if (frt_term_cd == "") {  
    	alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Freight ");
    	return false;
    }
    if (fm_svc_term_cd == "") {  
    	alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "SVC Term From");
    	return false;
    }
    if (to_svc_term_cd == "") {  
    	alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "SVC Term To");
    	return false;
    }
    if (grs_wgt == "") {  
    	alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Gross Weight");
    	return false;
    }
    if (grs_wgt_ut_cd == "") {  
    	alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Gross Weight "+grs_wgt_ut_cd);
    	return false;
    }
//    if (trim(desc_txt) == "") {  
//    	alert(getLabel('FMS_COM_ALT007') + "\n - " + ref_no + " : " + "Description");
//    	return false;
//    }
    
    // 0 > 이상인지 체크 
    if (cntr_cnt == 0 ) {  
    	alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Container");
    	return false;
    }
    if (no_name_cntr_cn > 0) {   // 이름 없는 컨테이너가 1개 이상이라면 
    	alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Container Name");
    	return false;
    }
    if (no_tpsz_cntr_cn > 0) {  // TPSZ 없는 컨테이너가 1개 이상이라면 
    	alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Container Type/Size");
    	return false;
    }
    
    // 각trdp에 tel/fax/eml 이 있을때 pic는 필수
    if (shpr_pic_phn != "" || shpr_pic_fax !="" || shpr_pic_eml != "") {
    	if (shpr_pic_nm  == "") {
    		alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Shipper's Contact Person Name");
        	return false;
    	}
    }
    if (cnee_pic_phn != "" || cnee_pic_fax !="" || cnee_pic_eml != "") {
    	if (cnee_pic_nm  == "") {
    		alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Consignee's Contact Person Name");
    		return false;
    	}
    }
    if (ntfy_pic_phn != "" || ntfy_pic_fax !="" || ntfy_pic_eml != "") {
    	if (ntfy_pic_nm  == "") {
    		alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Notify's Contact Person Name");
    		return false;
    	}
    }
    if (carr_pic_phn != "" || carr_pic_fax !="" || carr_pic_eml != "") {
    	if (carr_pic_nm  == "") {
    		alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Carrier's Contact Person Name");
    		return false;
    	}
    }
    if (ib_c_phn != "" || ib_c_fax !="" || ib_c_email != "") {
    	if (ib_c_name  == "") {
    		alert(getLabel('FMS_COM_ALT007') + "\n - " + bkg_seq + " : " + "Login User Contact Person Name");
    		return false;
    	}
    }
    
    return true;
	
}
