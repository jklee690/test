//=========================================================
//*@FileName   : AIC_WOM_0010.jsp
//*@FileTitle  :
//*@Description:
//*@author     :
//*@version    :
//*@since      :
//*@Change history:
//*@author     :	Tuan.Chau	
//*@version    :	2.0
//*@since      :	2014-06-24
//=========================================================
var rtnary=new Array(2);
var callBackFunc = "";
var id = "";

var defaultVals = [];
var gloVar_Pickup_Return = "Enter"; //Pickup 데이터를 불러왔을때 Return 데이터에 넣을지 말지 여부 변수

function submitForm(cmd){
	var formObj=document.frm1;
	doShowProcess();
	formObj.f_cmd.value = cmd;
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./AIC_WOM_0010AJ.clt",
		   dataType: 'xml',
		   data: $("form" ).serialize(),
		   success: function(data){
			   setFieldValue( formObj.sys_ofc_cd, $('sysOfcCd',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.wo_sts_cd, $('wo_sts_cd',data).text());
			   setFieldValue( formObj.bnd_clss_cd, $('bnd_clss_cd',data).text());
			   setFieldValue( formObj.oth_seq, $('oth_seq',data).text());
			   setFieldValue( formObj.pkup_rmk, $('pkup_rmk',data).text());
			   setFieldValue( formObj.f_wo_no, $('wo_no',data).text());
			   setFieldValue( formObj.wo_no, $('wo_no',data).text());
			   setFieldValue( formObj.wo_tp_cd, $('wo_tp_cd',data).text());
			   setFieldValue( formObj.pickup_trdp_cd, $('pickup_trdp_cd',data).text());
			   setFieldValue( formObj.pickup_trdp_nm, $('pickup_trdp_nm',data).text());
			   setFieldValue( formObj.pickup_trdp_addr, $('pickup_trdp_addr',data).text());
			   setFieldValue( formObj.pickup_pic, $('pickup_pic',data).text());
			   setFieldValue( formObj.pickup_phn, $('pickup_phn',data).text());
			   setFieldValue( formObj.pickup_fax, $('pickup_fax',data).text());
			   setFieldValue( formObj.pickup_ref_no, $('pickup_ref_no',data).text());
			   setFieldValue( formObj.pickup_dt, $('pickup_dt',data).text());
			   setFieldValue( formObj.pickup_tm, $('pickup_tm',data).text());
			   setFieldValue( formObj.pickup_to_tm, $('pickup_to_tm',data).text());
			   setFieldValue( formObj.delivery_trdp_cd, $('delivery_trdp_cd',data).text());
			   setFieldValue( formObj.delivery_trdp_nm, $('delivery_trdp_nm',data).text());
			   setFieldValue( formObj.delivery_trdp_addr, $('delivery_trdp_addr',data).text());
			   setFieldValue( formObj.delivery_pic, $('delivery_pic',data).text());
			   setFieldValue( formObj.delivery_phn, $('delivery_phn',data).text());
			   setFieldValue( formObj.delivery_fax, $('delivery_fax',data).text());
			   setFieldValue( formObj.delivery_ref_no, $('delivery_ref_no',data).text());
			   setFieldValue( formObj.delivery_dt, $('delivery_dt',data).text());
			   setFieldValue( formObj.delivery_tm, $('delivery_tm',data).text());
			   setFieldValue( formObj.delivery_to_tm, $('delivery_to_tm',data).text());
			   setFieldValue( formObj.return_trdp_cd, $('return_trdp_cd',data).text());
			   setFieldValue( formObj.return_trdp_nm, $('return_trdp_nm',data).text());
			   setFieldValue( formObj.return_trdp_addr, $('return_trdp_addr',data).text());
			   setFieldValue( formObj.return_pic, $('return_pic',data).text());
			   setFieldValue( formObj.return_phn, $('return_phn',data).text());
			   setFieldValue( formObj.return_fax, $('return_fax',data).text());
			   setFieldValue( formObj.return_ref_no, $('return_ref_no',data).text());
			   setFieldValue( formObj.return_dt, $('return_dt',data).text());
			   setFieldValue( formObj.return_tm, $('return_tm',data).text());
			   setFieldValue( formObj.return_to_tm, $('return_to_tm',data).text());
			   setFieldValue( formObj.bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.mbl_no, $('bl_no',data).text());
			   setFieldValue( formObj.ref_no, $('bill_to_ref_no',data).text());
			   setFieldValue( formObj.oth_ref_no, $('bl_no',data).text());
			   setFieldValue( formObj.bill_to_trdp_cd, $('bill_to_trdp_cd',data).text());
			   setFieldValue( formObj.bill_to_trdp_nm, $('bill_to_trdp_nm',data).text());
			   setFieldValue( formObj.bill_to_trdp_addr, $('bill_to_trdp_addr',data).text());
			   setFieldValue( formObj.bill_to_pic, $('bill_to_pic',data).text());
			   setFieldValue( formObj.bill_to_phn, $('bill_to_phn',data).text());
			   setFieldValue( formObj.bill_to_fax, $('bill_to_fax',data).text());
			   setFieldValue( formObj.bill_to_ref_no, $('bill_to_ref_no',data).text());
			   setFieldValue( formObj.trucker_trdp_cd, $('trucker_trdp_cd',data).text());
			   setFieldValue( formObj.trucker_trdp_nm, $('trucker_trdp_nm',data).text());
			   setFieldValue( formObj.trucker_trdp_addr, $('trucker_trdp_addr',data).text());
			   setFieldValue( formObj.trucker_pic, $('trucker_pic',data).text());
			   setFieldValue( formObj.trucker_phn, $('trucker_phn',data).text());
			   setFieldValue( formObj.trucker_fax, $('trucker_fax',data).text());
			   setFieldValue( formObj.pol_cd, $('pol_cd',data).text());
			   setFieldValue( formObj.pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.pod_cd, $('pod_cd',data).text());
			   setFieldValue( formObj.pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.cgo_itm_cmdt_cd, $('cgo_itm_cmdt_cd',data).text());
			   setFieldValue( formObj.cgo_itm_cmdt_nm, $('cgo_itm_cmdt_nm',data).text());
			   setFieldValue( formObj.cgo_pck_qty, $('cgo_pck_qty',data).text());
			   setFieldValue( formObj.cgo_pck_ut_cd, $('cgo_pck_ut_cd',data).text());
			   setFieldValue( formObj.act_wgt_k, $('act_wgt_k',data).text());
			   setFieldValue( formObj.act_wgt_l, $('act_wgt_l',data).text());
			   setFieldValue( formObj.cgo_meas_m, $('cgo_meas_m',data).text());
			   setFieldValue( formObj.cgo_meas_f, $('cgo_meas_f',data).text());
			   setFieldValue( formObj.cgo_meas_m, $('cgo_meas_m',data).text());
			   setFieldValue( formObj.cgo_meas_f, $('cgo_meas_f',data).text());
			   setFieldValue( formObj.lnr_trdp_cd, $('lnr_trdp_cd',data).text());
			   setFieldValue( formObj.lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			   setFieldValue( formObj.lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.print_md_yn, $('prt_md_yn',data).text());
			   setFieldValue( formObj.rmk, $('rmk',data).text());

			   
			   doBtnAuthority(attr_extension);
			   	loadPage();
	        	loadData();
	        	btnLoad();
			   
			  doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}
function doWork(srcName, curObj){
	var formObj=document.frm1;
	if(!btnGetVisible(srcName)){
		return;
	}
	try {
		switch(srcName) {
			case "SEARCH":
				if(formObj.f_wo_no.value==''){
//					alert('Please enter a Mandatory Value! (Red indicates required field)!');
					alert(getLabel('FMS_COM_ALT014'));
					formObj.f_wo_no.focus();
				}else{
					doShowProcess();
		       		/*formObj.f_cmd.value=SEARCH;
	       			formObj.action="./AIC_WOM_0010.clt";
				    formObj.submit()*/;
				    formObj.f_cmd.value=SEARCH;
				    submitForm(SEARCH);
				}
			break;
	        case "SEARCHLIST":
	       		formObj.f_cmd.value=SEARCHLIST;
	       		docObjects[0].DoSearch("AIC_WOM_0011GS.clt", FormQueryString(formObj) );
	        break;
			case "NEW":
				//'Do you want to CREATE?'
//				    doShowProcess();
//					formObj.f_cmd.value = '';
//	       			formObj.action = "./AIC_WOM_0010.clt";
//				    formObj.submit();
				/*
				    clearAll();
//				    btnBL.style.display = 'inline';				// LHK 20130812 BL NO /REF_NO 에 대한 display 설정 없앰
				    formObj.act_wgt_k.value="0.00";
				    formObj.act_wgt_l.value="0.00";
				    formObj.cgo_meas_m.value="0.000";
				    formObj.cgo_meas_f.value="0.000";
				    getObj('btnPrint').style.display='none';
					getObj('cancelObj').style.display='none';
					getObj('btnDelete').style.display='none';
					*/
//					var currLocUrl = this.location.href;
//					currLocUrl = currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
//					currLocUrl = '.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
//
//					parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
//					break;
					// NEW 버튼 누를시 새로운창이 뜨는 이유?? 일단 원복
				    clearAll();
				    formObj.act_wgt_k.value="0.00";
				    formObj.act_wgt_l.value="0.00";
				    formObj.cgo_meas_m.value="0.000";
				    formObj.cgo_meas_f.value="0.000";
				    getObj('btnPrint').style.display='none';
					getObj('cancelObj').style.display='none';
					getObj('btnDelete').style.display='none';
					formObj.f_cmd.value='';
	       			//formObj.action="./AIC_WOM_0010.clt";
				    //formObj.submit();
	       			submitForm('');
					
			break;
			case "SAVE":
				if(woCheckInpuVals()){
					var cMsg='FMS_COM_CFMSAV';
					var wFlag='F';
					if(parseFloat(trim(formObj.cgo_meas_m.value).replace(/,/g, '')) <= 0 && formObj.air_sea_clss_cd.value == 'S')
					{
						cMsg='FMS_COM_CFMMEAS';
						wFlag='M';
					}
					if(parseFloat(trim(formObj.act_wgt_k.value).replace(/,/g, '')) <= 0 )
					{
						cMsg='FMS_COM_CFMGRS';
						wFlag='G';
					}
					if(confirm(getLabel(cMsg))){
						gridAdd(1);
						docObjects[1].SetCellValue(1, 1,1);
						doShowProcess();
						if(formObj.wo_no.value==''){
							formObj.f_cmd.value=ADD;
						}else{
							formObj.f_cmd.value=MODIFY;
						}	
						var cntrSheetData=docObjects[0].GetSaveString(true);
	             	    docObjects[1].DoAllSave("./AIC_WOM_0010GS.clt", FormQueryString(formObj)+'&'+cntrSheetData, true);
	             	    //alert(formObj.wo_no.value);
	             	    // cntr정보를 update한다.
	             	    //formObj.f_cmd.value = MULTI01;
	             	    //docObjects[0].DoSave("./AIC_WOM_0010GS.clt", FormQueryString(formObj), -1,false);
					}else{
						if(wFlag == 'G'){	formObj.act_wgt_k.focus();	return; }
						if(wFlag == 'M' && formObj.air_sea_clss_cd.value == 'S'){	formObj.cgo_meas_m.focus();	return; }
					}
				}
			break;
			case "REMOVE"://삭제
	        	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
	                   formObj.f_cmd.value=REMOVE;
//	            	   doShowProcess();
	            	  // formObj.submit();
	            	   submitForm(REMOVE);
	        	   }
			break;
			case "HBLSMRY":
				// 부킹번호 선택시 데이터 새로 가져오기 
				if(formObj.bnd_clss_cd.value == "" || formObj.bnd_clss_cd.value == "G"){	/* [20130410 OJG]*/			
					var oth_ref_no=trim(formObj.oth_ref_no.value);
					if(oth_ref_no ==""){
						alert(getLabel('AIE_BMD_MSG67'));
						formObj.oth_ref_no.focus();
						return;
					}
					ajaxSendPost(dispOthHblSmry, 'reqVal', '&goWhere=aj&bcKey=getOthblSmryInfo&oth_ref_no='+oth_ref_no, './GateServlet.gsl');
				}else{
					var intg_bl_seq=formObj.intg_bl_seq.value;
					var bl_no="";
					var mbl_no="";
					var ref_no="";
					var oth_ref_no="";
					var air_sea_clss_cd=formObj.air_sea_clss_cd.value;
					var bnd_clss_cd=formObj.bnd_clss_cd.value;
					var biz_clss_cd=formObj.biz_clss_cd.value;
					if(formObj.biz_clss_cd.value == 'H'){
						bl_no=formObj.bl_no.value;
					}
					if(formObj.biz_clss_cd.value == 'M'){
						mbl_no=formObj.mbl_no.value;
						ref_no=formObj.ref_no.value;
					}
					if(formObj.biz_clss_cd.value == ''){
						oth_ref_no=formObj.oth_ref_no.value;
					}
					ajaxSendPost(dispHblSmry, 'reqVal', '&goWhere=aj&bcKey=searchBkgSmry&intg_bl_seq='+intg_bl_seq + '&bl_no='+bl_no + '&mbl_no='+mbl_no + '&ref_no='+ref_no+ '&oth_ref_no='+oth_ref_no+ '&air_sea_clss_cd='+air_sea_clss_cd+ '&bnd_clss_cd='+bnd_clss_cd+ '&biz_clss_cd='+biz_clss_cd, './GateServlet.gsl');								
				}
				doWork("SEARCHLIST");
			break;
			case "ISSUE":		//ISSUE
				if(formObj.wo_sts_cd.value!="A"){
					alert(getLabel('AIC_WOM_0010_MSG33'));
					return;
				}else{
					//Do you want to Issue?
					if(confirm(getLabel('FMS_COM_CFMISS'))){
						formObj.f_cmd.value=COMMAND01;
						gridAdd(1);
						docObjects[1].SetCellValue(1, 1,1);
						doShowProcess();
	             	    docObjects[1].DoAllSave("./AIC_WOM_0010GS.clt", FormQueryString(formObj), true);
					}
				}
			break;
			case "CANCEL":		//ISSUE Cancel
				if(formObj.wo_sts_cd.value!="B"){
					alert(getLabel('AIC_WOM_0010_MSG34'));
					return;
				}else{
					if(confirm(getLabel('FMS_COM_CFMCAN'))){
						formObj.f_cmd.value=COMMAND02;
						gridAdd(1);
						docObjects[1].SetCellValue(1, 1,1);
						doShowProcess();
	             	    docObjects[1].DoAllSave("./AIC_WOM_0010GS.clt", FormQueryString(formObj), true);
					}
				}
			break;
			case "COPY":
				if(confirm(getLabel('FMS_COM_CFMCPY'))){
					doShowProcess();
					formObj.f_wo_no.value='';
					formObj.wo_no.value='';
					//formObj.bkg_no.value = '';
					formObj.hbl_no.value='';
					formObj.intg_bl_seq.value='';
					formObj.wo_sts_cd.value='NA';
					formObj.cgo_itm_cmdt_cd.value='';
					formObj.cgo_itm_cmdt_nm.value='';
					formObj.cgo_pck_qty.value='';
					formObj.cgo_pck_ut_cd.value='';
					formObj.act_wgt_k.value='0.00';
					formObj.chg_wgt.value='';
//					formObj.chg_wgt_ut_cd.value = '';
//					formObj.grs_wgt_ut_cd.value = '';
					formObj.cgo_meas_m.value='0.000';
//					formObj.cgo_meas_ut_cd.value = '';
					formObj.lnr_trdp_nm.value='';
					formObj.lnr_trdp_cd.value='';
					formObj.lnr_bkg_no.value='';
					modiObj.style.display='none';
					prntObj.style.display='none';
					getObj('cancelObj').style.display='none';
		            getObj('issObj').style.display='none';
					copyObj.style.display='none';
					var tmpBtn=getObj('bkgBtn');
		            tmpBtn.style.display='block';
					doHideProcess();
				}
			break;
			case "WO_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈		
	         	rtnary=new Array(2);   		
	   			rtnary[0]=formObj.air_sea_clss_cd.value;
	   			rtnary[1]=formObj.bnd_clss_cd.value;
	   			rtnary[2]=formObj.biz_clss_cd.value;
	   			
	   			callBackFunc = "WO_POPLIST";
	   			modal_center_open('./CMM_POP_0200.clt', rtnary, 1150,484,"yes");
			break;  
			case "HBL_POPLIST":
	          	rtnary=new Array(1);
	          	rtnary[0]=formObj.air_sea_clss_cd.value;
	   			rtnary[1]=formObj.bnd_clss_cd.value;
				callBackFunc = "HBL_POPLIST";
	  	        modal_center_open('./CMM_POP_0170.clt', rtnary, 818,468,"yes");
			break;
			case "MBL_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0]=formObj.air_sea_clss_cd.value; //S=해운에서 오픈, A=항공에서 오픈
				rtnary[1]=formObj.bnd_clss_cd.value; //I: In-bound, O: Out-bound
				callBackFunc = "MBL_POPLIST";
	  	        modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			break;			
			case "REF_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
					rtnary=new Array(3);
					rtnary[0]=formObj.air_sea_clss_cd.value;
					rtnary[1]=formObj.bnd_clss_cd.value;
					callBackFunc = "REF_POPLIST";
					 modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			break;
			case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				id=curObj.id;			
				rtnary=new Array(1);
				/* jsjang 2013.8.6 #18801 trade partner 조회조건 변경 */
				var iata_val="";
		   		var cstmTpCd='CS';
		   		var airSeaTp=formObj.air_sea_clss_cd.value;
		   		//alert(airSeaTp);
		   		rtnary[0]="1";
		   		rtnary[1]="";
		   		rtnary[2]=window;
		   		if(id=="pic"){
		   			rtnary[3]=formObj.pickup_trdp_nm.value;	
		   			cstmTpCd='';
				}else if(id=="del") {
					rtnary[3]=formObj.delivery_trdp_nm.value;
					cstmTpCd='';
				}else if(id=="trn") {
					rtnary[3]=formObj.return_trdp_nm.value;
					cstmTpCd='';
				}else if(id=="bil") {
					rtnary[3]=formObj.bill_to_trdp_nm.value;	
					cstmTpCd='';
				}else if(id=="trk") {
					rtnary[3]=formObj.trucker_trdp_nm.value;	
					//cstmTpCd = 'TK';
					/* #23817 D/O PRINT시 TRUCKER 로 검색이아닌 ALL, jsjang 2013.11.22*/
					cstmTpCd='';
				}else if(id=="liner") {
					rtnary[3]=formObj.lnr_trdp_nm.value;	
					//cstmTpCd = 'LN';
		   			if(airSeaTp=='A'){
		   				cstmTpCd='AC';		   				
		   			}else{
		   				cstmTpCd='LN';
		   			}						
				}
		   		callBackFunc = "PARTNER_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");
           break;
           case "COMMODITY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈           
           		rtnary=new Array(1);	   		
		   		rtnary[0]="1";		   		
    	        var rtnVal =  ComOpenWindow('./CMM_POP_0110.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px" , true);
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.cgo_itm_cmdt_cd.value=rtnValAry[0];
					formObj.cgo_itm_cmdt_nm.value=rtnValAry[2];
				}
           break;
           case "PACKAGE_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
		   		rtnary[0]="1";
    	        var rtnVal =  ComOpenWindow('./CMM_POP_0120.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px" , true);
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.cgo_pck_ut_cd.value=rtnValAry[0];
				}
           break;
           case "PRINT":
        	    // 프린트
        	    var print_md_yn="";
				formObj.file_name.value='pickup_delivery_instruction_01.mrd';
				formObj.title.value='';
				if(formObj.print_md_yn.checked==true){
					print_md_yn="Y";
				}else{
					print_md_yn="N";
				}
				//Parameter Setting
				var param='';
				param += '[' + formObj.f_wo_no.value + ']'; //$1
				param += '[' + formObj.ofc_locl_nm.value + ']'; //$2
				param += '[' + formObj.eml.value + ']'; //$3
				param += '[' + formObj.user_name.value + ']'; //$4
				param += '[' + formObj.intg_bl_seq.value + ']'; //$5
				param += '[' + formObj.user_phn.value + ']'; //$6
				param += '[' + formObj.user_fax.value + ']'; //$7
				param += '[' + print_md_yn + ']'; //$8
				param += '[' + formObj.oth_seq.value + ']'; //$9	[20130411 OJG]
				
				formObj.rd_param.value=param;
				 /* oyh 2013.09.05 #20448 :[BINEX] D/O 메일 전송 시 Mail Subject 에 HBL# 같이 표기 */
				var tempTitle='';
				if(formObj.bnd_clss_cd.value=="O"){
					tempTitle += 'Pick Up [';
				}else{
					tempTitle += 'D/O [';
				}
				if(formObj.air_sea_clss_cd.value=="A"){
					tempTitle += 'Air ';
					if(formObj.bnd_clss_cd.value=="O"){
						tempTitle += 'Export ';
					}else{
						tempTitle += 'Import ';
					}
				}else if(formObj.air_sea_clss_cd.value=="S"){
					tempTitle += 'Ocean ';
					if(formObj.bnd_clss_cd.value=="O"){
						tempTitle += 'Export ';
					}else{
						tempTitle += 'Import ';
					}
				}else{
					tempTitle='Pickup/Delivery Order[Other]';
				}
				if (formObj.bl_no != "undefined"  && formObj.bl_no != undefined) {
					if(formObj.biz_clss_cd.value=="H"){
						tempTitle += 'House ';
						tempTitle += 'HBL No : '+formObj.bl_no.value+']';
					}else{
						tempTitle += '';
						tempTitle += 'HBL No : '+formObj.mbl_no.value+']';
					}
				}else if (formObj.mbl_no != "undefined"  && formObj.mbl_no != undefined) {
					if(formObj.biz_clss_cd.value=="M"){
						tempTitle += 'Master ';
						tempTitle += 'MBL No : '+formObj.mbl_no.value+']';
					}else{
						tempTitle += '';
						tempTitle += 'MBL No : '+formObj.mbl_no.value+']';
					}
				}
				formObj.title.value=tempTitle;
				formObj.mailTitle.value=tempTitle;
				//formObj.mailTitle.value = tempTitle + 'Other Reference No. : ' + formObj.oth_ref_no.value + ']';;
				var trdp_cd='';
         		trdp_cd += '(' + '\'' + formObj.return_trdp_cd.value + '\'' + ')';
				ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
				formObj.mailTo.value=mailTo;
				// History화면에서 Link 를 걸기위해 WO_NO와 CLSS_CD를 넘긴다. 
				formObj.rpt_biz_tp.value="PDI";
				formObj.rpt_biz_sub_tp.value=formObj.wo_no.value+formObj.air_sea_clss_cd.value;
				formObj.rpt_trdp_cd.value=formObj.trucker_trdp_cd.value;
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		   break;
        } // end switch
	}catch(e) {
		//alert(e.description);
        if(e == "[object Error]"){
        	//Please enter a Value correctly!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }
	}
}
function gridAdd(objIdx){
	var intRows=docObjects[objIdx].RowCount() + 1;
	docObjects[objIdx].DataInsert(intRows);
}
//화면로드시 데이터 표시
function loadData(){
	doHideProcess();
	//-----------[20130410 OJG]-----------------
	//alert(frm1.oth_ref_no.value);
	//LHK 조건 추가, 조회된 data 의 경우 그대로 보여줌. 
	if(document.getElementById("oth_ref_no") != null && frm1.oth_ref_no.value != '' && frm1.wo_no.value==''){
		doWork("HBLSMRY");
	}
	//-----------[20130410 OJG]-----------------
	// Sea,Other인 경우에만 SEARCH한다
	if(frm1.air_sea_clss_cd.value!="A"){
		if(frm1.intg_bl_seq.value!=''){
		    doWork("SEARCHLIST");
		}
	} else {
		docObjects[0].SetVisible(false);
	}
}
function openPopUp(srcName, curObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
	try {
		switch(srcName) {
    	   case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(2);
		   		rtnary[0]="1";
		   		rtnary[1]="";
		   		rtnary[2]=window;
		   		rtnary[3]=formObj.lnr_trdp_nm.value;
		   		var airSeaTp="";
		   		var curObjId=curObj.id;
		   		var cstmTpCd='';
		   		//선사
		   		if(curObjId=='liner'){
		   			if(airSeaTp=='A'){
		   				cstmTpCd='AC';		   				
		   			}else{
		   				cstmTpCd='LN';
		   			}
		   		}
				var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt?callTp='+cstmTpCd,  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
						formObj.lnr_trdp_cd.value=rtnValAry[0];//trdp_cd
//						formObj.lnr_trdp_nm.value = rtnValAry[2];//eng_nm
						formObj.lnr_trdp_nm.value=rtnValAry[10];//local_nm
				}
           break;
    	   case "LOCATION_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
   			rtnary=new Array(3);
   			rtnary[0]="SEA";
   			rtnary[1]="BL";
   			var curObjId=curObj.id;
   			if (curObjId == "pol") {
   				rtnary[2]=formObj.pol_nm.value;
   			} else if (curObjId == "pod") {
   				rtnary[2]=formObj.pod_nm.value;
   			}
   			var rtnVal =  ComOpenWindow('./CMM_POP_0030.clt',  rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px" , true);
   			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
   				return;
   			} else {
   				var id=curObj.id;
   				var rtnValAry=rtnVal.split("|");
   				if (id == "pol") {
   					formObj.pol_cd.value=rtnValAry[0];// loc_cd
   					formObj.pol_nm.value=rtnValAry[2];// loc_nm
   				} else if (id == "pod") {
   					formObj.pod_cd.value=rtnValAry[0];// loc_cd
   					formObj.pod_nm.value=rtnValAry[2];// loc_nm
   				} 
   			}
   			break;
           case "COMMODITY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
		   		rtnary[0]="1";
    	        var rtnVal =  ComOpenWindow('./CMM_POP_0110.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px" , true);
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.cgo_itm_cmdt_cd.value=rtnValAry[0];
					formObj.cgo_itm_cmdt_nm.value=rtnValAry[2];
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
/**
 * 
 *  Pickup / Delivery / Transporter Address : Local Name + \n + Local Address + '\n' + city + ' ' + state +  ' ' + zip Code 
 *  Bill To Address : Local Name + '\n + Billing Address
 */
//코드표시 Ajax
function dispHblSmry(reqVal){
	var formObj=document.frm1;
	// 부킹번호 선택시 데이터 새로 가져오기 
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			var rtnArr=doc[1].split('@;');
			var rtnVal=rtnArr[0].split('@^');	
			formObj.intg_bl_seq.value=rtnVal[0];
			formObj.pol_cd.value=rtnVal[1];
			formObj.pol_nm.value=rtnVal[2];
			formObj.pod_cd.value=rtnVal[3];
			formObj.pod_nm.value=rtnVal[4];
			formObj.cgo_itm_cmdt_cd.value=rtnVal[5];
			formObj.cgo_itm_cmdt_nm.value=rtnVal[6];
			formObj.cgo_pck_qty.value=doMoneyFmt(rtnVal[7]);
			formObj.cgo_pck_ut_cd.value=rtnVal[8];
			formObj.act_wgt_k.value=doMoneyFmt(rtnVal[24]);
			formObj.act_wgt_l.value=doMoneyFmt(rtnVal[25]);
			if(doMoneyFmt(rtnVal[12])=="0.000000"){
				formObj.cgo_meas_m.value="0.000"
			}else{
				formObj.cgo_meas_m.value=doMoneyFmt(rtnVal[12]);
			}
			// CBM 표시후 CFT 계산 
			formObj.cgo_meas_f.value=roundXL(formObj.cgo_meas_m.value.replaceAll(",","") * 35.3165, 3);
			if(formObj.cgo_meas_f.value =="0" ||formObj.cgo_meas_f.value ==""){
				formObj.cgo_meas_f.value="0.000";
			}
//			formObj.cgo_meas_ut_cd.value= rtnVal[13];
			formObj.lnr_trdp_cd.value=rtnVal[14];
			formObj.lnr_trdp_nm.value=rtnVal[15];
			formObj.lnr_bkg_no.value=rtnVal[16];
			formObj.bill_to_trdp_cd.value=rtnVal[21];
			formObj.bill_to_trdp_nm.value=rtnVal[22];
			formObj.bill_to_trdp_addr.value=rtnVal[23];
			formObj.bill_to_pic.value=rtnVal[35];
			formObj.bill_to_phn.value=rtnVal[36];
			formObj.bill_to_fax.value=rtnVal[37];
			formObj.cgo_itm_cmdt_cd.value=rtnVal[26];
			formObj.cgo_itm_cmdt_nm.value=rtnVal[27];
			formObj.bill_to_ref_no.value=rtnVal[28];
			formObj.trucker_trdp_cd.value=rtnVal[29];
			formObj.trucker_trdp_nm.value=rtnVal[30];
			formObj.trucker_trdp_addr.value=rtnVal[31];
			formObj.trucker_pic.value=rtnVal[32];
			formObj.trucker_phn.value=rtnVal[33];
			formObj.trucker_fax.value=rtnVal[34];
			formObj.pickup_trdp_cd.value=rtnVal[38];
			formObj.pickup_trdp_nm.value=rtnVal[39];
			formObj.pickup_trdp_addr.value=rtnVal[40];
			formObj.pickup_pic.value=rtnVal[41];
			formObj.pickup_phn.value=rtnVal[42];
			formObj.pickup_fax.value=rtnVal[43];
			formObj.delivery_trdp_cd.value=rtnVal[44];
			formObj.delivery_trdp_nm.value=rtnVal[45];
			formObj.delivery_trdp_addr.value=rtnVal[46];
			formObj.delivery_pic.value=rtnVal[47];
			formObj.delivery_phn.value=rtnVal[48];
			formObj.delivery_fax.value=rtnVal[49];
			formObj.return_trdp_cd.value=rtnVal[50];
			formObj.return_trdp_nm.value=rtnVal[51];
			formObj.return_trdp_addr.value=rtnVal[52];
			formObj.return_pic.value=rtnVal[53];
			formObj.return_phn.value=rtnVal[54];
			formObj.return_fax.value=rtnVal[55];
			
			if(gloVar_Pickup_Return != "Not"){
				if (formObj.return_trdp_cd.value == "") {
					formObj.return_trdp_cd.value=formObj.pickup_trdp_cd.value;
				}
				if (formObj.return_trdp_nm.value == "") {
					formObj.return_trdp_nm.value=formObj.pickup_trdp_nm.value;
				}
				if (formObj.return_trdp_addr.value == "") {
					formObj.return_trdp_addr.value=formObj.pickup_trdp_addr.value;
				}
				if (formObj.return_pic.value == "") {
					formObj.return_pic.value=formObj.pickup_pic.value;
				}
				if (formObj.return_phn.value == "") {
					formObj.return_phn.value=formObj.pickup_phn.value;
				}
				if (formObj.return_fax.value == "") {
					formObj.return_fax.value=formObj.pickup_fax.value;
				}	
			}
			// wo_no 리셋
			formObj.wo_no.value="";
			formObj.f_wo_no.value="";
			btnLoad();
			if(formObj.bill_to_trdp_cd.value==""){
			    formObj.bill_to_trdp_cd.value=formObj.user_ofc_cd.value + "MAINCMP";
			    //formObj.bill_to_trdp_cd.value=formObj.sys_ofc_cd.value + "MAINCMP";
				codeNameAction('partner_bill', formObj.bill_to_trdp_cd, 'onBlur');	
			}
		}else{
			formObj.intg_bl_seq.value="";
			formObj.pol_cd.value="";
			formObj.pol_nm.value="";
			formObj.pod_cd.value="";
			formObj.pod_nm.value="";
			formObj.cgo_itm_cmdt_cd.value="";
			formObj.cgo_itm_cmdt_nm.value="";
			formObj.cgo_pck_qty.value="";
			formObj.cgo_pck_ut_cd.value="";
			formObj.act_wgt_k.value="0.00";
			formObj.act_wgt_l.value="0.00";
			formObj.cgo_meas_m.value="0.000";
			// CBM 표시후 CFT 계산 
			formObj.cgo_meas_f.value="0.000";
//			formObj.cgo_meas_ut_cd.value= rtnVal[12];
			formObj.lnr_trdp_cd.value="";
			formObj.lnr_trdp_nm.value="";
			formObj.lnr_bkg_no.value="";
			formObj.bill_to_trdp_cd.value="";
			formObj.bill_to_trdp_nm.value="";
			formObj.bill_to_trdp_addr.value="";
			if(formObj.biz_clss_cd.value == 'H'){
				formObj.bl_no.value="";
			}
			if(formObj.biz_clss_cd.value == 'M'){
				formObj.mbl_no.value="";
				formObj.ref_no.value="";
			}
			if(formObj.biz_clss_cd.value == ''){
				formObj.oth_ref_no.value="";
			}
			formObj.trucker_trdp_cd.value="";
			formObj.trucker_trdp_nm.value="";
			formObj.trucker_trdp_addr.value="";
			formObj.trucker_pic.value="";
			formObj.trucker_phn.value="";
			formObj.trucker_fax.value="";
			formObj.pickup_trdp_cd.value="";
			formObj.pickup_trdp_nm.value="";
			formObj.pickup_trdp_addr.value="";
			formObj.pickup_pic.value="";
			formObj.pickup_phn.value="";
			formObj.pickup_fax.value="";
			formObj.delivery_trdp_cd.value="";
			formObj.delivery_trdp_nm.value="";
			formObj.delivery_trdp_addr.value="";
			formObj.delivery_pic.value="";
			formObj.delivery_phn.value="";
			formObj.delivery_fax.value="";
			formObj.return_trdp_cd.value="";
			formObj.return_trdp_nm.value="";
			formObj.return_trdp_addr.value="";
			formObj.return_pic.value="";
			formObj.return_phn.value="";
			formObj.return_fax.value="";
		}
	}
}
//코드표시 Ajax
function dispOthHblSmry(reqVal){
	var formObj=document.frm1;
	// 부킹번호 선택시 데이터 새로 가져오기 
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('@;');
			var rtnVal=rtnArr[0].split('@^');	
			formObj.wo_sts_cd.value=rtnVal[1];
			formObj.oth_seq.value=rtnVal[2];
			formObj.bill_to_trdp_cd.value=rtnVal[4];
			formObj.bill_to_trdp_nm.value=rtnVal[5];
			formObj.bill_to_trdp_addr.value=rtnVal[6];
			//---------------[20130410 OJG]------------------------------
			formObj.bill_to_pic.value=rtnVal[7];
			formObj.bill_to_phn.value=rtnVal[8];
			formObj.bill_to_fax.value=rtnVal[9];
			formObj.bill_to_ref_no.value=rtnVal[10];
			formObj.pol_cd.value=rtnVal[11];
			formObj.pol_nm.value=rtnVal[12];
			formObj.pod_cd.value=rtnVal[13];
			formObj.pod_nm.value=rtnVal[14];
			formObj.cgo_itm_cmdt_cd.value=rtnVal[15];
			formObj.cgo_itm_cmdt_nm.value=rtnVal[16];
			formObj.cgo_pck_qty.value=doMoneyFmt(rtnVal[17]);
			formObj.cgo_pck_ut_cd.value=rtnVal[18];
			formObj.act_wgt_k.value=doMoneyFmt(rtnVal[19]);
			formObj.act_wgt_l.value=doMoneyFmt(rtnVal[20]);
			formObj.cgo_meas_m.value=doMoneyFmt(rtnVal[21]);
			formObj.cgo_meas_f.value=doMoneyFmt(rtnVal[22]);
			//---------------[20130410 OJG]------------------------------
			btnLoad();
		}else {
			formObj.wo_sts_cd.value="";
			formObj.oth_seq.value="";
			formObj.bill_to_trdp_cd.value="";
			formObj.bill_to_trdp_nm.value="";
			formObj.bill_to_trdp_addr.value="";
			formObj.bill_to_pic.value="";
			formObj.bill_to_phn.value="";
			formObj.bill_to_fax.value="";
			formObj.oth_ref_no.value="";
		}
	}
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
            var cal=new ComCalendar();
            cal.select(formObj.pickup_dt, 'MM-dd-yyyy');
        break;
        case 'DATE2':   //달력 조회 팝업 호출      
            var cal=new ComCalendar();
            cal.select(formObj.delivery_dt, 'MM-dd-yyyy');
        break;        
        case 'DATE3':   //달력 조회 팝업 호출      
            var cal=new ComCalendar();
            cal.select(formObj.return_dt, 'MM-dd-yyyy');
        break;  
    }
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	if(obj.value!=""){
		if(tmp=="onKeyDown"){
			if (event.keyCode == 13){
				var s_code=obj.value;
				CODETYPE=str;
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					str=sub_str;
				}else if(sub_str=="Nodecode"){
					str='node';
				}else if(sub_str=="partner_"){
					str='trdpcode'
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			CODETYPE=str;
			var sub_str=str.substring(0,8);
			if(sub_str=="location"){
				str=sub_str;
			}else if(sub_str=="Nodecode"){
				str='node';
			}else if(sub_str=="partner_"){
				str='trdpcode'
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');		
			var masterVals=rtnArr[0].split('@@^');
			
			if(CODETYPE =="partner_pickup"){
				formObj.pickup_trdp_cd.value=masterVals[0];
//				formObj.pickup_trdp_nm.value = masterVals[3];// eng trdp nm
				formObj.pickup_trdp_nm.value=masterVals[16];//local trdp name 
				//formObj.pickup_trdp_addr.value=masterVals[14];//trdp_addr
				formObj.pickup_trdp_addr.value=masterVals[29];//dflt_addr
				formObj.pickup_pic.value=masterVals[10];//pic_nm // 현재 AJAX 에서 안넘어오는 데이터 
				formObj.pickup_phn.value=masterVals[11];//pic_phn
				formObj.pickup_fax.value=masterVals[12];//pic_fax
				// 25604 Delivery Order에서 Pickup Location을 선택 하면, 자동으로 Pickup Location이 Return Location으로 설정
				/*formObj.return_trdp_cd.value=masterVals[0];//trdp_cd
				formObj.return_trdp_nm.value = masterVals[3];//eng trdp name				
				formObj.return_trdp_nm.value=masterVals[16];//local trdp name
				formObj.return_trdp_addr.value=masterVals[14];//trdp_addr
				formObj.return_pic.value=masterVals[10];//pic_nm
				formObj.return_phn.value=masterVals[11];//pic_phn
				formObj.return_fax.value=masterVals[12];//pic_fax*/
				
				if(gloVar_Pickup_Return == "Enter"){
					formObj.return_trdp_cd.value   = masterVals[0];
					formObj.return_trdp_nm.value   = masterVals[3];
					//formObj.return_trdp_addr.value = masterVals[14];
					formObj.return_trdp_addr.value = masterVals[29];
					formObj.return_pic.value       = masterVals[10];
					formObj.return_phn.value       = masterVals[11];
					formObj.return_fax.value       = masterVals[12];
				}else{
				}
			}
			if(CODETYPE =="partner_delivery"){
				formObj.delivery_trdp_cd.value=masterVals[0];
//				formObj.delivery_trdp_nm.value = masterVals[3];//eng trdp name 				
				formObj.delivery_trdp_nm.value=masterVals[16];//local trdp name 
				//formObj.delivery_trdp_addr.value=masterVals[14];//trdp_addr
				formObj.delivery_trdp_addr.value=masterVals[29];//dflt_addr
				formObj.delivery_pic.value=masterVals[10];//pic_nm
				formObj.delivery_phn.value=masterVals[11];//pic_phn
				formObj.delivery_fax.value=masterVals[12];//pic_fax
			}
			if(CODETYPE =="partner_trsp"){
				formObj.return_trdp_cd.value=masterVals[0];//trdp_cd
//				formObj.return_trdp_nm.value = masterVals[3];//eng trdp name				
				formObj.return_trdp_nm.value=masterVals[16];//local trdp name
				//formObj.return_trdp_addr.value=masterVals[14];//trdp_addr
				formObj.return_trdp_addr.value=masterVals[29];//dflt_addr
				formObj.return_pic.value=masterVals[10];//pic_nm
				formObj.return_phn.value=masterVals[11];//pic_phn
				formObj.return_fax.value=masterVals[12];//pic_fax
			}
			if(CODETYPE =="partner_bill"){
				formObj.bill_to_trdp_cd.value=masterVals[0];//trdp_cd
//				formObj.bill_to_trdp_nm.value = masterVals[3];//eng trdp name
				formObj.bill_to_trdp_nm.value=masterVals[16];//local trdp name				
				//formObj.bill_to_trdp_addr.value=masterVals[15];//bill to Address
				formObj.bill_to_trdp_addr.value=masterVals[29];//bill to Address
				formObj.bill_to_pic.value=masterVals[10];//pic_nm
				formObj.bill_to_phn.value=masterVals[11];//pic_phn
				formObj.bill_to_fax.value=masterVals[12];//pic_fax
			}
			if(CODETYPE =="partner_trucker"){
				formObj.trucker_trdp_cd.value=masterVals[0];//trdp_cd
//				formObj.trucker_trdp_nm.value = masterVals[3];//eng_nm
				formObj.trucker_trdp_nm.value=masterVals[16];//local_nm
				//formObj.trucker_trdp_addr.value=masterVals[14];//trdp_addr
				formObj.trucker_trdp_addr.value=masterVals[29];//dflt_addr
				//formObj.trucker_trdp_addr.value=masterVals[15];//bill to Address
				formObj.trucker_pic.value=masterVals[10];//pic_nm
				formObj.trucker_phn.value=masterVals[11];//pic_phn
				formObj.trucker_fax.value=masterVals[12];//pic_fax
			}
			if(CODETYPE =="location_pol"){
				formObj.pol_cd.value=masterVals[0];//loc_cd
				formObj.pol_nm.value=masterVals[3];//loc_nm
				//formObj.pol_cd.value = masterVals[1];//nod_cd 
//				formObj.pol_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
			}
			if(CODETYPE =="location_pod"){
				formObj.pod_cd.value=masterVals[0];//loc_cd
				formObj.pod_nm.value=masterVals[3];//loc_nm
				//formObj.pol_cd.value = masterVals[1];//nod_cd 
//				formObj.pol_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
			}
			if(CODETYPE =="partner_liner"){
				formObj.lnr_trdp_cd.value=masterVals[0];
//				formObj.lnr_trdp_nm.value = masterVals[3];// eng_nm
				formObj.lnr_trdp_nm.value=masterVals[16];//local_nm
			}
			if(CODETYPE =="commodity"){
				formObj.cgo_itm_cmdt_cd.value=masterVals[0];
				formObj.cgo_itm_cmdt_nm.value=masterVals[3];
			}else if(CODETYPE =="package"){
				formObj.cgo_pck_ut_cd.value=masterVals[0];
			}
		}else{
			if(CODETYPE =="partner_pickup"){
				formObj.pickup_trdp_cd.value="";
				formObj.pickup_trdp_nm.value="";
				formObj.pickup_trdp_addr.value="";
				formObj.pickup_pic.value="";//pic_nm
				formObj.pickup_phn.value="";//pic_phn
				formObj.pickup_fax.value="";//pic_fax
			}
			if(CODETYPE =="partner_delivery"){
				formObj.delivery_trdp_cd.value="";
				formObj.delivery_trdp_nm.value="";
				formObj.delivery_trdp_addr.value="";
				formObj.delivery_pic.value="";//pic_nm
				formObj.delivery_phn.value="";//pic_phn
				formObj.delivery_fax.value="";//pic_fax
			}
			if(CODETYPE =="partner_trsp"){
				formObj.return_trdp_cd.value="";//trdp_cd
				formObj.return_trdp_nm.value="";//full_nm
				formObj.return_trdp_addr.value="";//lgl_addr
				formObj.return_pic.value="";//pic_nm
				formObj.return_phn.value="";//pic_phn
				formObj.return_fax.value="";//pic_fax
			}
			if(CODETYPE =="partner_bill"){
				formObj.bill_to_trdp_cd.value="";//trdp_cd
				formObj.bill_to_trdp_nm.value="";//full_nm
				formObj.bill_to_trdp_addr.value="";//lgl_addr
				formObj.bill_to_pic.value="";//pic_nm
				formObj.bill_to_phn.value="";//pic_phn
				formObj.bill_to_fax.value="";//pic_fax
			}
			if(CODETYPE =="location_pol"){
				formObj.pol_cd.value="";//loc_cd
				formObj.pol_nm.value="";//loc_nm
			}
			if(CODETYPE =="location_pod"){
				formObj.pod_cd.value="";//loc_cd
				formObj.pod_nm.value="";//loc_nm
			}
			if(CODETYPE =="partner_liner"){
				formObj.lnr_trdp_cd.value="";
				formObj.lnr_trdp_nm.value="";
			}
			if(CODETYPE =="commodity"){
				formObj.cgo_itm_cmdt_cd.value="";
				formObj.cgo_itm_cmdt_nm.value="";
			}else if(CODETYPE =="package"){
				formObj.cgo_pck_ut_cd.value="";
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function setNodPic(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0]=='O'){
				formObj.pickup_pic.value=rtnArr[1] 
				formObj.pickup_phn.value=rtnArr[2]
				formObj.pickup_fax.value=rtnArr[3]
				formObj.pickup_trdp_addr.value=rtnArr[4];
			}else if(rtnArr[0]=='D'){
				formObj.return_pic.value=rtnArr[1]; 
				formObj.return_phn.value=rtnArr[2];
				formObj.return_fax.value=rtnArr[3];
				formObj.return_trdp_addr.value=rtnArr[4];
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//시간분이 유효한지 체크한다.
function checkTime(obj){
	var objTime=obj.value;
	if(objTime.length != 0){
		if(objTime.length == 4){
			objHr=objTime.substring(0,2);
			objMn=objTime.substring(2,4);
			if(objHr != "00"){
				if(objHr < 0 || objHr > 23){
					obj.value="";
					alert(getLabel('AIC_WOM_0010_MSG23'));
					obj.focus();
				}
			}
			if(objMn != "00"){
				if(objMn < 0 || objMn > 59){
					obj.value="";
					alert(getLabel('AIC_WOM_0010_MSG23'));
					obj.focus();
				}
			}
			//obj.value = objHr+":"+objMn;
		}else{
			//obj.value = "";
			alert(getLabel('AIC_WOM_0010_MSG24'));
			obj.focus();
		}	
	}		
}
function chk_Time(obj)
{
	var str="";
	str=delete_Char(obj.value,':');
	str=trim(str);
	if (!chk_Number(str)) return (false);
	if (str.length != 4)    return (false);
	hh=str.substring(0,2);
	mm=str.substring(2,4);
	if (!chk_Between(hh,"00","23")) return (obj.value="");
	if (!chk_Between(mm,"00","59")) return (obj.value="");
	return (true);
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
    for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
	var formObj=document.frm1;
	if(formObj.wo_sts_cd.value == 'NA'){
	    formObj.bill_to_trdp_cd.value=formObj.user_ofc_cd.value + "MAINCMP";
	    //formObj.bill_to_trdp_cd.value=formObj.sys_ofc_cd.value + "MAINCMP";
		codeNameAction('partner_bill', formObj.bill_to_trdp_cd, 'onBlur');
	}
	//LHK 조회된 Data 가 존재하는 경우 버튼 Set
	if(formObj.wo_no.value!=''){
		btnLoad();
	}
	ajax_Send_check_opt_Value();
	//var air_sea_clss_cd = formObj.air_sea_clss_cd.value;
	//var bnd_clss_cd = formObj.bnd_clss_cd.value;
	//var biz_clss_cd = formObj.biz_clss_cd.value;
	//alert("air_sea_clss_cd : " + air_sea_clss_cd +" bnd_clss_cd : " + bnd_clss_cd + " biz_clss_cd : " + biz_clss_cd);
	
	//26939 처음 조회되었을 경우 (WO_NO와 BL_NO로 조회되지 않았을경우) Remark는 Office Code에 저장된 P/D Remark값을 가져온다
	if(formObj.wo_no.value ==''){
		formObj.rmk.value=formObj.pkup_rmk.value;	
		//26468
		if(gloVar_Pickup_Return != "Not"){
			if (formObj.return_trdp_cd.value == "") {
				formObj.return_trdp_cd.value=formObj.pickup_trdp_cd.value;
			}
			if (formObj.return_trdp_nm.value == "") {
				formObj.return_trdp_nm.value=formObj.pickup_trdp_nm.value;
			}
			if (formObj.return_trdp_addr.value == "") {
				formObj.return_trdp_addr.value=formObj.pickup_trdp_addr.value;
			}
			if (formObj.return_pic.value == "") {
				formObj.return_pic.value=formObj.pickup_pic.value;
			}
			if (formObj.return_phn.value == "") {
				formObj.return_phn.value=formObj.pickup_phn.value;
			}
			if (formObj.return_fax.value == "") {
				formObj.return_fax.value=formObj.pickup_fax.value;
			}	
		}
	}
	setDefaultValue();
}

function setDefaultValue() {
	var formObj = document.frm1;
	formObj.grs_wgt_ut_cd.value = "K";
	formObj.grs_wgt_ut_cd1.value = "L";
	formObj.meas_ut_cd.value = "CBM";
	formObj.meas_ut_cd1.value = "CFT";
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
		case 2:     
		with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('AIC_WOM_0010_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_intg_bl_seq" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_wo_no" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_wo_sts_cd" } ];
	         
	        InitColumns(cols);
	        SetEditable(1);
	        SetVisible(false);
		}
        break;
		case 1:      //IBSheet2 init
			with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('AIC_WOM_0010_HDR2'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"DummyCheck", Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"chk",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"cntr_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:14 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"cntr_tpsz_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:55,   Align:"Left",    ColMerge:0,   SaveName:"seal_no1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
	               {Type:"Int",       Hidden:0,  Width:30,   Align:"Right",   ColMerge:1,   SaveName:"cgo_pck_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:55,   Align:"Left",    ColMerge:1,   SaveName:"pck_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:0,   InsertEdit:0,   EditLen:11 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"pickup_number",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
	               {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"cntr_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"oth_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"ref_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Status",    Hidden:1, Width:1,    Align:"Center",  ColMerge:0,   SaveName:"cntr_ibflag" } ];
	         
	        InitColumns(cols);
	        SetEditable(1);
	        SetSheetHeight(150);
			}                                                      
		break;
    }
}
function updateWgt(){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	var cntCheck=sheetObj.CheckedRows("chk");
	if (cntCheck == 0) {
		return;
	}
	var grossWeight_tot=0.00;
	var measurement_tot=0.0000;
	var pck_tot=0;
	for(var i=1; i<=sheetObj.LastRow()+1;i++){
		if(sheetObj.GetCellValue(i, "chk")== 1){
			grossWeight_tot 	+= Number(sheetObj.GetCellValue(i, "cgo_wgt"));
			measurement_tot 	+= Number(sheetObj.GetCellValue(i, "cgo_meas"));
			pck_tot			 	+= Number(sheetObj.GetCellValue(i, "cgo_pck_qty"));
		}
	}
	frm1.act_wgt_k.value=grossWeight_tot;
	numberCommaLen(frm1.act_wgt_k,8,2);
	chkComma(frm1.act_wgt_k,8,2);
	weightChange(frm1.act_wgt_k);
	numberCommaLen(frm1.act_wgt_l,8,2);
	chkComma(frm1.act_wgt_l,8,2);
	frm1.cgo_meas_m.value=measurement_tot;
	numberCommaLen(frm1.cgo_meas_m,8,3);
	chkComma(frm1.cgo_meas_m,8,3);
	cbmChange(frm1.cgo_meas_m);
	numberCommaLen(frm1.cgo_meas_f,8,3);
	chkComma(frm1.cgo_meas_f,8,3);
	frm1.cgo_pck_qty.value=pck_tot;
}
function sheet1_OnSearchEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	if(formObj.bnd_clss_cd.value=="O"){
		for(var i=1; i<=sheetObj.LastRow()+1;i++){
			sheetObj.SetCellValue(i, "pickup_number","",0);
		}
	}
}
function sheet2_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	doHideProcess();
	if(formObj.wo_no.value==''){
		formObj.wo_no.value=docObjects[1].GetCellValue(1, "sv_wo_no");
		formObj.f_wo_no.value=docObjects[1].GetCellValue(1, "sv_wo_no");
	}
	formObj.wo_sts_cd.value=docObjects[1].GetCellValue(1, "sv_wo_sts_cd");
	btnLoad();
	if(errMsg == undefined  || errMsg==null || errMsg == ""){
		if(formObj.f_cmd.value=="1" || formObj.f_cmd.value=="4" ){
			//alert(getLabel('FMS_COM_NTYCOM'));
			/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
			showCompleteProcess();
		}
	}
}
function getWhCd(){
	rtnary=new Array(1);
   	rtnary[0]="SAL";
   	rtnary[1]="A";	
	var rtnVal =  ComOpenWindow('./CMM_POP_0250.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:812px;dialogHeight:480px" , true);
	    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var formObj=document.frm1;
		var rtnValAry=rtnVal.split("|");
		formObj.dest_rout_loc_nm.value=rtnValAry[1];    	   
		formObj.dest_rout_nod_cd.value=rtnValAry[3];    	        
	}
}
/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function woCheckInpuVals(){
	var formObj=document.frm1;
	var isOk=true;
	/*
	if(checkInputVal(formObj.bkg_no.value, 3, 15, "T", 'Booking No')!='O') {
		///////////////////////////////////////////////////////////////////////////
		// Booking No
		///////////////////////////////////////////////////////////////////////////
		formObj.bkg_no.focus();
		isOk=false;
	}
	*/
	/*
	if(checkInputVal(formObj.org_rout_trdp_cd.value, 3, 7, "T", 'Pick-Up')!='O'){
		///////////////////////////////////////////////////////////////////////////
		// Route Information
		///////////////////////////////////////////////////////////////////////////
		formObj.org_rout_trdp_cd.focus();
		isOk=false;
	}else if(checkInputVal(formObj.org_rout_addr.value, 2, 400, "T", 'Address')!='O'){
		formObj.org_rout_addr.focus();
		isOk=false;
	}else if(checkInputVal(formObj.org_rout_pic.value, 2, 50, "T", 'PIC')!='O'){
		formObj.org_rout_pic.focus();
		isOk=false;
	}else if(checkInputVal(formObj.pkup_ord_no.value, 2, 50, "T", 'Reference')!='O'){
		formObj.pkup_ord_no.focus();
		isOk=false;
	}else if(checkInputVal(formObj.dest_rout_trdp_cd.value, 1, 50, "T", 'Delivery')!='O'){
		///////////////////////////////////////////////////////////////////////////
		// Delivery
		///////////////////////////////////////////////////////////////////////////
		formObj.dest_rout_trdp_cd.focus();
		isOk=false;
	}else if(checkInputVal(formObj.dest_rout_addr.value, 2, 400, "T", 'Address')!='O'){
		formObj.dest_rout_addr.focus();
		isOk=false;
	}else if(checkInputVal(formObj.dest_rout_pic.value, 2, 50, "T", 'PIC')!='O'){
		formObj.dest_rout_pic.focus();
		isOk=false; 
	}
	*/
	if(formObj.biz_clss_cd.value == "H" && formObj.bl_no.value == ""){
		//Select Hbl No.
		alert(getLabel('AIR_MSG_067'));
		formObj.bl_no.focus();
		isOk=false;
		return isOk;
	}
	if(formObj.biz_clss_cd.value == "M"){
		if(formObj.intg_bl_seq.value == "" && formObj.ref_no.value == ""){
			//Select Mbl No or Ref No
			alert(getLabel('AIR_MSG_068'));
			formObj.ref_no.focus();
			isOk=false;
			return isOk;
		}
	}
	// #21020 [WEBTRANS] SUP - Pickup/Delivery Order에서 Save/Update 시 Other Filing No. (Optional)
	/*
	if(formObj.air_sea_clss_cd.value == "" && formObj.bnd_clss_cd.value == "" && formObj.biz_clss_cd.value == "" ){
		if(formObj.oth_ref_no.value ==""){
	//		alert("Select Ref No.");
			alert(getLabel('AIR_MSG_069'));
			isOk=false;
			return isOk;
		}
	}
	*/
	if(trim(formObj.bill_to_trdp_cd.value)==""){
		//Bill to information
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_BLTO') );
		formObj.bill_to_trdp_cd.focus();
		isOk=false;
		return isOk;
	}
	if(trim(formObj.bill_to_trdp_nm.value)==""){
		//Bill to information
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_BLTO') );
		formObj.bill_to_trdp_nm.focus();
		isOk=false;
		return isOk;
	}
	if(trim(formObj.bill_to_trdp_addr.value)==""){
		//Bill to information
		alert(getLabel('FMS_COM_ALT007') + "\n - " + "Bill To Address" );
		formObj.bill_to_trdp_addr.focus();
		isOk=false;
		return isOk;
	}
	/* jsjang 2013.7.15  요구사항 #15935 Pickup/Delivery Order 화면 G/WT, Measurement Mandatory  제외 건 Start */
	//if(parseFloat(trim(formObj.act_wgt_k.value).replace(/,/g, '')) <= 0 || trim(formObj.act_wgt_k.value)=="" ){
	
	 //Redmine request #48114 20150312 Skwoo
	if(trim(formObj.act_wgt_k.value)=="" && formObj.air_sea_clss_cd.value == 'A'){
		alert(getLabel('FMS_COM_ALT007') + "(Gross Weight)" );
		formObj.act_wgt_k.focus();
		isOk=false;
		return isOk;
	}
	
/*	
	else{
*/
	if (parseFloat(trim(formObj.act_wgt_k.value).replace(/, /g, "")) > 0 && trim(formObj.act_wgt_k.value) != "") {
		var arr_act_wgt_k=(trim(formObj.act_wgt_k.value).replace(/, /g, '')).split(".");
		if(arr_act_wgt_k[0].length > 12){
			alert(getLabel('AIR_MSG_092') + "(Max Length : 999,999,999,999.99)" );
			formObj.act_wgt_k.focus();
			isOk=false;
			return isOk;
		}
	}
/*
	if(parseFloat(trim(formObj.act_wgt_l.value).replace(/,/g, '')) <= 0 || trim(formObj.act_wgt_l.value) =="" ){
		alert(getLabel('FMS_COM_ALT007') + "(Gross Weight)" );
		formObj.act_wgt_l.focus();
		isOk=false;
		return isOk;
	}else{
*/
	if (parseFloat(trim(formObj.act_wgt_l.value).replace(/, /g, "")) > 0 && trim(formObj.act_wgt_l.value) != "") {
		var arr_act_wgt_l=(trim(formObj.act_wgt_l.value).replace(/, /g, '')).split(".");
		if(arr_act_wgt_l[0].length > 12){
			alert(getLabel('AIR_MSG_092') + "(Max Length : 999,999,999,999.99)" );
			formObj.act_wgt_l.focus();
			isOk=false;
			return isOk;
		}
	}
	/* jsjang 2013.7.15  요구사항 #15935 Pickup/Delivery Order 화면 G/WT, Measurement Mandatory  제외 건 Start */
	//if(parseFloat(trim(formObj.cgo_meas_m.value).replace(/,/g,'')) <= 0 || trim(formObj.cgo_meas_m.value)==""){
	if(trim(formObj.cgo_meas_m.value)==""  && formObj.air_sea_clss_cd.value == 'S'){
		alert(getLabel('FMS_COM_ALT007') + "(Measurement)" );
		formObj.cgo_meas_m.focus();
		isOk=false;
		return isOk;
	}
/*
	else{
*/
	if (parseFloat(trim(formObj.cgo_meas_m.value).replace(/, /g, "")) > 0 && trim(formObj.cgo_meas_m.value) != "") {
		var arr_cgo_meas_m=(trim(formObj.cgo_meas_m.value).replace(/, /g, '')).split(".");
		if(arr_cgo_meas_m[0].length > 10){
			alert(getLabel('AIR_MSG_092') + "(Max Length : 9,999,999,999.999999)" );
			formObj.cgo_meas_m.focus();
			isOk=false;
			return isOk;
		}
	}
/*
	if(parseFloat(trim(formObj.cgo_meas_f.value).replace(/,/g, '')) <= 0 || trim(formObj.cgo_meas_f.value)==""){
		alert(getLabel('FMS_COM_ALT007') + "(Measurement)" );
		formObj.cgo_meas_f.focus();
		isOk=false;
		return isOk;
	}else{
*/
	if (parseFloat(trim(formObj.cgo_meas_f.value).replace(/, /g, "")) > 0 && trim(formObj.cgo_meas_f.value) != "") {
		var arr_cgo_meas_f=(trim(formObj.cgo_meas_f.value).replace(/, /g, '')).split(".");
		if(arr_cgo_meas_f[0].length > 10){
			alert(getLabel('AIR_MSG_092') + "(Max Length : 9,999,999,999.999999)" );
			formObj.cgo_meas_f.focus();
			isOk=false;
			return isOk;
		}
	}
/**
	}else if(checkInputVal(formObj.lnr_trdp_cd.value, 6, 20, "T", 'Carrier Code')!='O'){
		formObj.lnr_trdp_cd.focus();
		isOk=false;
		return isOk;
	}else if(checkInputVal(formObj.lnr_trdp_nm.value, 2, 50, "T", 'Carrier Name')!='O'){
		formObj.lnr_trdp_nm.focus();
		isOk=false;
		return isOk;
**/
	//Remark maxlength ckeck
	 lengthChk(formObj.rmk);
	/*
	if(act_wgt_k ==""){
		alert(getLabel('AII_BMD_MSG78'));
		formObj.act_wgt_k.focus();
		return;
	}else if(act_wgt_k =="0" || act_wgt_k =="0.00")
	{
		if(confirm(getLabel('FMS_COM_CFMGRS'))){
			if(formObj.wo_no.value==''){
				doWork("SAVE_ADD");
			}else{
				doWork("SAVE_MODIFY");
			}
		}else{
			formObj.act_wgt_k.focus();
			return;
		}
	}else{
		if(formObj.wo_no.value==''){
			doWork("SAVE_ADD");
		}else{
			doWork("SAVE_MODIFY");
		}
	}
	*/
	return isOk;
}
function weightChange(obj){
		var formObj=document.frm1;
		if(obj.name=="act_wgt_k"){
			formObj.act_wgt_l.value=roundXL(formObj.act_wgt_k.value.replaceAll(",","") / 0.453597315, 2);
			if(formObj.act_wgt_l.value =="0" || formObj.act_wgt_l.value ==""){
				formObj.act_wgt_l.value="0.00";
				chkComma(formObj.act_wgt_l,8,2);
			}
		}else if(obj.name=="act_wgt_l"){
			formObj.act_wgt_k.value=roundXL(formObj.act_wgt_l.value.replaceAll(",","") * 0.453597315, 2);
			if(formObj.act_wgt_k.value =="0" || formObj.act_wgt_k.value ==""){
				formObj.act_wgt_k.value="0.00";
				chkComma(formObj.act_wgt_k,8,2);
			}
		}
	}
function cbmChange(obj){
	var formObj=document.frm1;
	if(obj.name=="cgo_meas_m"){
		formObj.cgo_meas_f.value=roundXL(formObj.cgo_meas_m.value.replaceAll(",","") * 35.3165, 3);
		if(formObj.cgo_meas_f.value =="0" || formObj.cgo_meas_f.value ==""){
			formObj.cgo_meas_f.value="0.000";
			chkComma(formObj.cgo_meas_f,8,3);
		}
	}else if(obj.name=="cgo_meas_f"){
		formObj.cgo_meas_m.value=roundXL(formObj.cgo_meas_f.value.replaceAll(",","") / 35.3165, 3);
		if(formObj.cgo_meas_m.value =="0" || formObj.cgo_meas_m.value ==""){
			formObj.cgo_meas_m.value="0.000";
			chkComma(formObj.cgo_meas_m,8,3);
		}
	}
}
var mailTo="";
function getMailTo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			mailTo="";
		}else{
			mailTo=doc[1];
		}
	}
}
function lengthChk(obj){
	if(obj.value.length > 1000){
		alert(getLabel('AIR_MSG_090'));
		obj.value=obj.value.substr(0,1000);
		obj.focus();
		return;
	}
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].name !="air_sea_clss_cd" && collTxt[i].name !="bnd_clss_cd" && collTxt[i].name !="biz_clss_cd" && collTxt[i].name !="sys_ofc_cd"){
		   if(collTxt[i].type == "text"|| collTxt[i].type == "hidden"){
			  //collTxt[i].value="";
		   }
		}
	}
	formObj.wo_no.value="";
	formObj.f_wo_no.value="";
	formObj.intg_bl_seq.value="";
	formObj.wo_sts_cd.value="NA";
	formObj.pickup_trdp_addr.value="";
	formObj.delivery_trdp_addr.value="";
	formObj.return_trdp_addr.value="";
	formObj.bill_to_trdp_addr.value="";
	formObj.trucker_trdp_addr.value="";
	formObj.rmk.value="";
	sheetObj.RemoveAll();
	setDefaultValue();
}

/*20151105 #49400 관련 사항 반영 시작*/
function ajax_Send_check_opt_Value(){
	var opt_key = "WO_RETURN_LOC_BLANK";
	ajaxSendPost(setSend_check_opt_Value, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

function setSend_check_opt_Value(reqVal){
	var formObj=document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == "OK" && doc[1]!= undefined ) { //DB 에서 option data가 잘 들어가 있는 경우
		if(doc[1] == "Y"){
			gloVar_Pickup_Return = "Not";
		}
	}
}
/*20151105 #49400 관련 사항 반영 종료*/
function PARTNER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{					
		if(id=="pic"){
			var rtnValAry=rtnVal.split("|");
			formObj.pickup_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.pickup_trdp_nm.value=rtnValAry[10];//locl_nm
			//formObj.pickup_trdp_addr.value=rtnValAry[26];//
			formObj.pickup_trdp_addr.value=rtnValAry[37];
			formObj.pickup_pic.value=rtnValAry[3];//pic_nm
			formObj.pickup_phn.value=rtnValAry[4];//pic_phn
			formObj.pickup_fax.value=rtnValAry[5];//pic_fax	
			// 25604 Delivery Order에서 Pickup Location을 선택 하면, 자동으로 Pickup Location이 Return Location으로 설정
			if(gloVar_Pickup_Return == "Enter"){
				formObj.return_trdp_cd.value=rtnValAry[0];
				formObj.return_trdp_nm.value=rtnValAry[10];
				//formObj.return_trdp_addr.value=rtnValAry[26];
				formObj.return_trdp_addr.value=rtnValAry[37];
				formObj.return_pic.value=rtnValAry[3];
				formObj.return_phn.value=rtnValAry[4];
				formObj.return_fax.value=rtnValAry[5];
			}else{
			}
			
		}else if(id=="del") {
			var rtnValAry=rtnVal.split("|");
			formObj.delivery_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.delivery_trdp_nm.value=rtnValAry[10];//locl_nm
			//formObj.delivery_trdp_addr.value=rtnValAry[26];//
			formObj.delivery_trdp_addr.value=rtnValAry[37];
			formObj.delivery_pic.value=rtnValAry[3];//pic_nm
			formObj.delivery_phn.value=rtnValAry[4];//pic_phn
			formObj.delivery_fax.value=rtnValAry[5];//pic_fax
		}else if(id=="trn") {
			var rtnValAry=rtnVal.split("|");
			formObj.return_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.return_trdp_nm.value=rtnValAry[10];//locl_nm
			//formObj.return_trdp_addr.value=rtnValAry[26];//
			formObj.return_trdp_addr.value=rtnValAry[37];
			formObj.return_pic.value=rtnValAry[3];//pic_nm
			formObj.return_phn.value=rtnValAry[4];//pic_phn
			formObj.return_fax.value=rtnValAry[5];//pic_fax
		}else if(id=="bil") {
			var rtnValAry=rtnVal.split("|");
			formObj.bill_to_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.bill_to_trdp_nm.value=rtnValAry[2];//eng_nm
			//formObj.bill_to_trdp_addr.value=rtnValAry[27];//
			formObj.bill_to_trdp_addr.value=rtnValAry[37];
			formObj.bill_to_pic.value=rtnValAry[3];//pic_nm
			formObj.bill_to_phn.value=rtnValAry[4];//pic_phn
			formObj.bill_to_fax.value=rtnValAry[5];//pic_fax
		}else if(id=="trk") {
			var rtnValAry=rtnVal.split("|");
			formObj.trucker_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.trucker_trdp_nm.value=rtnValAry[10];//locl_nm
			//formObj.trucker_trdp_addr.value=rtnValAry[26];//
			formObj.trucker_trdp_addr.value=rtnValAry[37];
			formObj.trucker_pic.value=rtnValAry[3];//pic_nm
			formObj.trucker_phn.value=rtnValAry[4];//pic_phn
			formObj.trucker_fax.value=rtnValAry[5];//pic_fax
		}
		else if(id=="liner") {
			var rtnValAry=rtnVal.split("|");
			formObj.lnr_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.lnr_trdp_nm.value=rtnValAry[2];//full_nm
		}
	}
}

function WO_POPLIST(rtnVal){
  	var formObj=document.frm1;
      if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_wo_no.value=rtnValAry[0];//wo_no
		formObj.intg_bl_seq.value=rtnValAry[2];//intg_bl_seq		
		doWork('SEARCH');
	}
}

function HBL_POPLIST(rtnVal){
	var formObj = document.frm1;
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.bl_no.value=rtnValAry[0];//house_bl_no
		formObj.intg_bl_seq.value=rtnValAry[3];//intg_bl_seq
		//formObj.bkg_no.value = rtnValAry[4];//bkg_no
	}
	doWork('HBLSMRY');
 }

function MBL_POPLIST(rtnVal){
	var formObj = document.frm1;
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.mbl_no.value=rtnValAry[0];//s_mbl_no
		formObj.intg_bl_seq.value=rtnValAry[1];//intg_bl_seq
		formObj.ref_no.value=rtnValAry[2];//s_mbl_no
	}
	doWork('HBLSMRY');
 }

function REF_POPLIST(rtnVal){
	var formObj = document.frm1;
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.mbl_no.value=rtnValAry[0];//s_mbl_no
		formObj.intg_bl_seq.value=rtnValAry[1];//intg_bl_seq
		formObj.ref_no.value=rtnValAry[2];
	}
	doWork('HBLSMRY');
 }




