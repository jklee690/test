<%--

/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0020.jsp
*@FileTitle  :  HGBL등록
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/24
=========================================================*/

--%>
<%@page import="com.clt.apps.fis.mdm.mcm.office.dto.OfcVO"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@page import="com.clt.framework.core.layer.event.EventResponse"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>

    <title><bean:message key="system.title"/></title>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>

    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js"></script>

    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/SEE_BMD_0020.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js"></script>
	
	
	<style>
<!--
.table_search_head_etc {
	color: #2d5cac;
}
-->
</style>
	<script>	
		function setupPage()
		{
			setOfficeData();
			btnLoad();
			loadPage();
			doHideProcess();
			loadData();
			
			//frm1.bl_no.select();
		}
		function titBlStyle(isDisable){
			var styleStr = 'table_search_head';
			if(isDisable){
				styleStr = 'table_search_head_r';
			}
			blIsDtObj.className = styleStr;
		}
		
		function dispBizBtns(dispTp){
			getObj("mkSayAuto").style.display= dispTp;
			//Container 탭
			getObj("cnrtPopAdd").style.display = dispTp;
			getObj("itmAdd").style.display = dispTp;
			getObj("loadPO").style.display = dispTp;

			//Freight버튼
			getObj("sdBtns").style.display    = dispTp;
			getObj("bcBtns").style.display    = dispTp;
			getObj("dcBtns").style.display    = dispTp;
		}
		
		function btnLoad(){
			frm1.ref_no.className = 'search_form';
		    frm1.ref_no.readOnly  = false;
		    getObj("brnRef_no").disabled  = false;
		    
			if(frm1.bl_sts_cd.value=='NA'){
		        titBlStyle(false);
		        getObj("btnAdd").style.display    = 'inline';
		        
			}else{
				getObj("btnAdd").style.display = 'none';
				getObj("sndEmlObj").style.display = 'none';
				getObj("fileUpObj").style.display = 'inline';
				getObj("btnShippingAdvice").style.display = 'inline';
				
				//Bkking Confirm
				if(frm1.bl_sts_cd.value=='BC'){
					titBlStyle(false);
		
					frm1.bkg_no.className = 'search_form-disable';
                    frm1.bkg_no.readOnly  = false;
		
                    getObj("bkgCnfObj").style.display= 'inline';
					getObj("btnSave").style.display  = 'inline';
					getObj("btnfromBlModiObj").style.display    = 'inline';
                    getObj("btnCopy").style.display  = 'inline';
                    getObj("btnDelete").style.display  = 'inline';
					getObj("goWoObj").style.display = 'inline';
		
				//Booking Confirm
				}else if(frm1.bl_sts_cd.value=='BF'){
                    titBlStyle(true);
					frm1.bkg_no.readOnly  = true;
					getObj("bkgCnfObj").style.display = 'none';
					getObj("hblCreObj").style.display = 'inline';
					getObj("btnSave").style.display = 'inline';
					getObj("btnfromBlModiObj").style.display    = 'inline';
					getObj("btnCopy").style.display = 'inline';
					getObj("btnDelete").style.display  = 'inline';
					getObj("goWoObj").style.display = 'inline';
					if(bkCheck==99){
						bkCheck = 0;
					}
				}else if(frm1.bl_sts_cd.value=='HC'){
					titBlStyle(true);
					getObj("btnSave").style.display  = 'inline';
					getObj("btnfromBlModiObj").style.display    = 'inline';
					getObj("btnDelete").style.display   = 'inline';
					getObj("btnCopy").style.display  = 'inline';
					getObj("btnPrint").style.display = 'inline';
					getObj("btnHiPrint").style.display = 'inline';
					getObj("btnLabel").style.display = 'inline';
					getObj("btnLabel2").style.display = 'inline';
					getObj("btnBookConfirm").style.display = 'inline';
					getObj("btnAccounting").style.display = 'inline';
					getObj("aesObj").style.display = 'inline';
					getObj("goWoObj").style.display  = 'inline';
					
					getObj("tabHwiFrt").style.display = 'inline';
		
					dispBizBtns('inline');
		
				}else if(frm1.bl_sts_cd.value=='SR'||frm1.bl_sts_cd.value=='MC'){
					getObj("btnSave").style.display   = 'inline';
					getObj("btnfromBlModiObj").style.display    = 'inline';
					getObj("btnCopy").style.display   = 'inline';
					getObj("btnPrint").style.display  = 'inline';
					getObj("btnHiPrint").style.display  = 'inline';
					getObj("btnLabel").style.display  = 'inline';
					getObj("btnLabel2").style.display  = 'inline';
					getObj("btnBookConfirm").style.display  = 'inline';
					getObj("btnAccounting").style.display  = 'inline';
					getObj("aesObj").style.display  = 'inline';
					
					getObj("tabHwiFrt").style.display = 'inline';
		
                    dispBizBtns('inline');
		
				}else if(frm1.bl_sts_cd.value=='HO'){
					getObj("btnAdd").style.display = 'none';
					getObj("btnfromBlModiObj").style.display = 'inline';
					getObj("btnSave").style.display = 'none';
					getObj("closeModiObj").style.display = 'inline';
					getObj("bkgCnfObj").style.display = 'none';
					getObj("hblCreObj").style.display = 'none';
					getObj("btnPrint").style.display = 'inline';
					getObj("btnHiPrint").style.display = 'inline';
					getObj("btnLabel").style.display = 'inline';
					getObj("btnLabel2").style.display = 'inline';
					getObj("btnBookConfirm").style.display = 'inline';
					getObj("btnAccounting").style.display = 'inline';
					getObj("aesObj").style.display = 'inline';
					//getObj("caObj").style.display = 'none';
					getObj("btnCopy").style.display = 'inline';
					getObj("btnDelete").style.display = 'none';
					getObj("goWoObj").style.display  = 'none';
					
					getObj("tabHwiFrt").style.display = 'inline';
		
                    dispBizBtns('none');
		
				}else{
					getObj("btnAdd").style.display = 'none';
					getObj("btnfromBlModiObj").style.display = 'inline';
					getObj("btnSave").style.display = 'none';
					getObj("closeModiObj").style.display = 'inline';
					getObj("bkgCnfObj").style.display = 'none';
					getObj("hblCreObj").style.display = 'none';
					getObj("btnPrint").style.display = 'inline';
					getObj("btnHiPrint").style.display = 'inline';
					getObj("btnLabel").style.display = 'inline';
					getObj("btnLabel2").style.display = 'inline';
					getObj("btnBookConfirm").style.display = 'inline';
					getObj("btnAccounting").style.display = 'inline';
					getObj("aesObj").style.display = 'inline';
					//getObj("caObj").style.display = 'none';
					getObj("btnCopy").style.display = 'inline';
					getObj("btnDelete").style.display = 'none';
					getObj("goWoObj").style.display  = 'none';
					
					getObj("tabHwiFrt").style.display = 'inline';
		
                    dispBizBtns('none');
                    
                 	// #48835 - [CARGOIS] COPY 한 HBL 의 이상한 현상
		            // Block 된 B/L일 경우 Filing No 수정 못하도록 수정
		           	frm1.ref_no.className = 'search_form-disable';
		            frm1.ref_no.readOnly  = true;
		            getObj("brnRef_no").disabled  = true;
				}
			}
			fnbtnCtl();
		}
		
		/**
		*BL복사 시
		*/
		function searhCopyFrt(){
			<logic:notEmpty name="valMap" property="org_bl_seq">
				//Selling/Debit Freight 조회
				docObjects[5].DoSearch4Post("./SEE_BMD_0024GS.clt",   'f_search_tp=CP&f_cmd='+SEARCHLIST06+'&intg_bl_seq=<bean:write name="valMap" property="org_bl_seq"/>');
		
				//Buying/Crebit List 조회
				docObjects[6].DoSearch4Post("./SEE_BMD_0024_1GS.clt", 'f_search_tp=CP&f_cmd='+SEARCHLIST07+'&intg_bl_seq=<bean:write name="valMap" property="org_bl_seq"/>');
			</logic:notEmpty>
		}
		
		var TPCD1 = '';
        var TPCD2 = '';
        var TPCD3 = '';
        <% boolean isBegin = false; %>
        <!--Role 코드조회-->
        <bean:define id="tpszList"  name="valMap" property="cntrTpszList"/>
        <logic:iterate id="codeVO" name="tpszList">
            <% if(isBegin){ %>
                TPCD1+= '|';
                TPCD2+= '|';
                TPCD3+= '|';
            <% }else{
                  isBegin = true;
               } %>
            TPCD1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
            TPCD2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
            TPCD3+= '<bean:write name="codeVO" property="cntr_grp_cd"/>';
        </logic:iterate>
		
        var CNTCD1 = '';
        var CNTCD2 = '';
		<logic:notEmpty name="valMap" property="cntrNoLst">
			<% isBegin = false; %>
			<bean:define id="cntrLst"  name="valMap" property="cntrNoLst"/>
			<logic:iterate id="cntrNoVO" name="cntrLst">
				<% if(isBegin){ %>
					CNTCD1+= '|';
					CNTCD2+= '|';
				<% }else{
					  isBegin = true;
				   } %>
				CNTCD1+= '<bean:write name="cntrNoVO" property="cd_val"/>';
				CNTCD2+= '<bean:write name="cntrNoVO" property="cd_nm"/>';
			</logic:iterate>		
		</logic:notEmpty>
		
		
		<!-- ###Freight 항목### -->
		var UNITCD1 = ' |';
		var UNITCD2 = ' |';
		<!-- Freight Unit 단위 -->
        <logic:notEmpty name="valMap" property="UNITCD">
			<% isBegin = false; %>
            <bean:define id="unitList" name="valMap" property="UNITCD"/>
            <logic:iterate id="codeVO" name="unitList">
                <% if(isBegin){ %>
                    UNITCD1+= '|';
                    UNITCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
                UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>
		
        <!-- ###Package 코드## -->
		var PCKCD1 = '|';
		var PCKCD2 = '|';
		<% isBegin = false; %>
        <bean:define id="pckList" name="valMap" property="pckCdList"/>
		<logic:iterate id="pckVO" name="pckList">
			<% if(isBegin){ %>
				PCKCD1+= '|';
				PCKCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PCKCD1+= '<bean:write name="pckVO" property="pck_nm"/>';
			PCKCD2+= '<bean:write name="pckVO" property="pck_ut_cd"/>';
		</logic:iterate>

        <!-- ###Lease Term 코드## -->
        var LSTCD1 = '|';
        var LSTCD2 = '|';
        <% isBegin = false; %>
        <bean:define id="leaList" name="valMap" property="leaseCdList"/>
        <logic:iterate id="pckVO" name="leaList">
            <% if(isBegin){ %>
                LSTCD1+= '|';
                LSTCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
            LSTCD1+= '<bean:write name="pckVO" property="cd_nm"/>';
            LSTCD2+= '<bean:write name="pckVO" property="cd_val"/>';
        </logic:iterate>		

        <!-- temp code -->
		var TEMPCD1 = '';
		var TEMPCD2 = '';
		<% isBegin = false; %>
        <logic:notEmpty name="valMap" property="TEMPCD">
            <bean:define id="tempcdList" name="valMap" property="TEMPCD"/>
            <logic:iterate id="codeVO" name="tempcdList">
                <% if(isBegin){ %>
                	TEMPCD1+= '|';
                	TEMPCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   TEMPCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
                   TEMPCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>
		<!-- vent code -->
		var VENTCD1 = '';
		var VENTCD2 = '';
		<% isBegin = false; %>
        <logic:notEmpty name="valMap" property="VENTCD">
            <bean:define id="ventcdList" name="valMap" property="VENTCD"/>
            <logic:iterate id="codeVO" name="ventcdList">
                <% if(isBegin){ %>
                	VENTCD1+= '|';
                	VENTCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   VENTCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
                   VENTCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>
        
        <!-- ###FRT_CD LIST 항목 AR### -->
        var ARFRTCD1 = ' |';
		var ARFRTCD2 = ' |';
		<% isBegin = false; %>
        <bean:define id="arFrtCdList" name="valMap" property="arFrtCdList"/>
		<logic:iterate id="FrtCdVO" name="arFrtCdList">
			<% if(isBegin){ %>
				ARFRTCD1+= '|';
				ARFRTCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   ARFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
			   ARFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
		</logic:iterate>
        
        <!-- ###FRT_CD LIST 항목 AP### -->
        var APFRTCD1 = ' |';
		var APFRTCD2 = ' |';
		<% isBegin = false; %>
        <bean:define id="apFrtCdList" name="valMap" property="apFrtCdList"/>
		<logic:iterate id="FrtCdVO" name="apFrtCdList">
			<% if(isBegin){ %>
				APFRTCD1+= '|';
				APFRTCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   APFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
			   APFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
		</logic:iterate>
        
        <!-- ###FRT_CD LIST 항목 DC### -->
        var DCFRTCD1 = ' |';
		var DCFRTCD2 = ' |';
		<% isBegin = false; %>
        <bean:define id="dcFrtCdList" name="valMap" property="dcFrtCdList"/>
		<logic:iterate id="FrtCdVO" name="dcFrtCdList">
			<% if(isBegin){ %>
				DCFRTCD1+= '|';
				DCFRTCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   DCFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
			   DCFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
		</logic:iterate>

		<!-- 요구사항 #25606 : [B/L Entry] B/L에서의 Freight Input 시 Currency 선택 옵션 변경 //-->
        var CURRCD = '';
		<% isBegin = false; %>
        <bean:define id="currCdList" name="valMap" property="currCdList"/>
        <logic:iterate id="codeVO" name="currCdList">
            <% if(isBegin){ %>
                   CURRCD += '|';
            <% }else{
            	isBegin = true;
               } %>
            CURRCD+= '<bean:write name="codeVO" property="cd_val"/>';
        </logic:iterate>
    	
        <!-- Currency 조회 -->
		<%  String ofc_curr     = "";
		    String partner_curr = "";
		%>
        <logic:notEmpty name="valMap" property="OfcCurrency">
            <bean:define id="curMap" name="valMap" property="OfcCurrency"/>
            <%  HashMap tmpMap = (HashMap)curMap;
                ofc_curr     = (String)tmpMap.get("ofccurr_cd");
                partner_curr = (String)tmpMap.get("tocurr_cd");
            %>
        </logic:notEmpty>
        
        
        
        <!-- ###JOB_STS LIST 항목 ### -->
        var JBCD1 = '';
		var JBCD2 = '';
		<% isBegin = false; %>
        <bean:define id="jobStsList" name="valMap" property="jobStsList"/>
		<logic:iterate id="JobStsVO" name="jobStsList">
			<% if(isBegin){ %>
				JBCD1+= '|';
				JBCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   JBCD1+= '<bean:write name="JobStsVO" property="cd_val"/>';
			   JBCD2+= '<bean:write name="JobStsVO" property="cd_nm"/>';
		</logic:iterate>
		
		<!-- User Defined Field -->
		var UDFCD = '';
		var UDFNM = '';
		<% isBegin = false; %>
        <logic:notEmpty name="valMap" property="UDFCD">
            <bean:define id="udfcdList" name="valMap" property="UDFCD"/>
            <logic:iterate id="codeVO" name="udfcdList">
                <% if(isBegin){ %>
                	UDFCD+= '|';
                	UDFNM+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   UDFCD+= '<bean:write name="codeVO" property="cd_nm"/>';
                   UDFNM+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>
        
        var HWI_FRT_NM = '';
        var HWI_VAT_TAX_RATIO = '';
        var HWI_VAT_FSC_RATIO = '';
		<% isBegin = false; %>
        <bean:define id="hwiFrtList" name="valMap" property="hwiFrtList"/>
        <logic:iterate id="codeVO" name="hwiFrtList">
        	<logic:match name="codeVO" property="cd_nm" value="TAX">
        		HWI_VAT_TAX_RATIO = '<bean:write name="codeVO" property="rmk" filter="false"/>';
			</logic:match>
			<logic:match name="codeVO" property="cd_nm" value="Ocean FSC">
				HWI_VAT_FSC_RATIO = '<bean:write name="codeVO" property="rmk" filter="false"/>';
			</logic:match>
            <% if(isBegin){ %>
            	HWI_FRT_NM += '|';
            <% }else{
            	isBegin = true;
               } %>
               HWI_FRT_NM+= '<bean:write name="codeVO" property="cd_nm"/>';
        </logic:iterate>
		
        <!-- ###Office Info## -->
        <% isBegin = false; %>
        <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
        var v_ofc_cd = "<bean:write name="ofcVO" property="ofc_locl_nm"/>";
        var oth_wgt_ut_cd = "";
        var oth_meas_ut_cd = "";
        var oth_size_ut_cd = "<bean:write name="ofcVO" property="oth_size_ut_cd"/>";
        var sea_body = "<bean:write name="ofcVO" property="sea_body"/>";
        var sea_cob = "<bean:write name="ofcVO" property="sea_cob"/>";
        var sea_mei = "<bean:write name="ofcVO" property="sea_mei"/>";
        var sea_msco = "<bean:write name="ofcVO" property="sea_msco"/>";
        var vsl_show_flg = "<bean:write name="ofcVO" property="vsl_show_flg"/>";
        var load_port_show_flg = "<bean:write name="ofcVO" property="load_port_show_flg"/>";
        var ofc_post_dt = "<bean:write name="ofcVO" property="post_dt_exp"/>";
        var ofc_curr_cd = "<bean:write name="ofcVO" property="trf_cur_cd"/>";
        var pps_use_flg = "<bean:write name="ofcVO" property="pps_use_flg"/>";

        var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
        
        //[20130926 OJG ]Booking Confirm 출력용 변수.
        var v_ofc_eng_nm = "<bean:write name="ofcVO" property="ofc_eng_nm"/>";	
        var v_eml = "<%=userInfo.getEml()%>";												
		var v_ofc_cd = "<%=userInfo.getOfc_cd()%>";
		var v_phn = "<%=userInfo.getPhn()%>";  
		var v_fax = "<%=userInfo.getFax()%>";
		
        /* jsjang 2013.08.27 office, ooh_bkg_rmk 정보 처리 변경 */
		var prn_ofc_cd = "<%=(String)application.getAttribute("PRNT_OFC_CD")%>";
		var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
		
		var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
		
		
		
		function fnbtnCtl(){
			
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
			//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
			var formObj=document.frm1;
			var edob_flg 		= "<%=userInfo.getEdob_flg()%>"; //ENABLE EDITING OTHER OFFICE (B/L) 
			var ref_ofc_cd =  formObj.ref_ofc_cd.value;
			//alert(edob_flg + " "+v_ofc_cd+" "+ref_ofc_cd);
			var btnflag = "Y";
			if (edob_flg == "N"){
				if (v_ofc_cd != ref_ofc_cd){  
					btnflag = "N";
				}	
			}  
			if (ref_ofc_cd == "") {  btnflag = "Y"; }
			if (btnflag == "Y"){
				//기존유지
				//$("#btnSave").show();
				//$("#closeModiObj").show();
				//$("#btnDelete").show(); 
			}else{
				$("#btnSave").hide();
				//$("#closeModiObj").hide();
				$("#btnDelete").hide(); 
				$("#btnPrint").hide(); 
				$("#btnHiPrint").hide(); 
			}
 

			doBtnAuthority(attr_extension);  
		}
		
	   </script>
<form name="frm1" method="POST" action="./SEE_BMD_0020.clt" class="filter">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="h_ofc_cnt_cd" id="h_ofc_cnt_cd" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="rd_param" id="rd_param" />
	<input type="hidden" name="mailTitle" id="mailTitle" />
	<input	type="hidden" name="f_ref_no"/>
	
	<input type="hidden" name="h_temp_val" id="h_temp_val" value=""> 
	<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />	
	
	<!--  Document List ==> Common Memo 연동 파라미터 (S) -->
    <input type="hidden" name="palt_mnu_cd" id="palt_mnu_cd" />
    <input type="hidden" name="opr_no" id="opr_no" />
	<!--  Document List ==> Common Memo 연동 파라미터 (E) -->
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	<html:hidden name="hblVO"  property="bl_sts_cd" />	
    <html:hidden name="hblVO" property="intg_bl_seq"/>
	<html:hidden name="valMap" property="f_intg_bl_seq"/>
	<input type="hidden" name="mk_bl_no" id="mk_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
	
	<input type="hidden" name="h_curr_cd" id="h_curr_cd" value="<bean:write name="hblVO" property="curr_cd"/>">
	<input type="hidden" name="h_mbl_curr_cd" id="h_mbl_curr_cd" value="<bean:write name="hblVO" property="mbl_curr_cd"/>">
	
	<!-- jsjang 2013.08.28 office, ooh_bkg_rmk 정보 처리 변경 -->
	<input type="hidden" name="h_ooh_bkg_rmk" id="h_ooh_bkg_rmk" value="<bean:write name="ofcVO" property="ooh_bkg_rmk"/>">
	<input type="hidden" name="h_sea_lcl_desc" id="h_sea_lcl_desc" value="<bean:write name="ofcVO" property="sea_lcl_desc"/>">
	<input type="hidden" name="h_sea_fcl_desc" id="h_sea_fcl_desc" value="<bean:write name="ofcVO" property="sea_fcl_desc"/>">
	
    <!--  jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. -->
    <input type="hidden" name="f_isNumSep" id="f_isNumSep" 	value='<bean:write name="valMap" property="f_isNumSep"/>'> 	
	
	<!-- #47413 [IMPEX]B/L COPY 기능보완  --> 
    <input type="hidden" name="copy_bl_seq" 	value='<bean:write name="valMap" property="org_bl_seq"></bean:write>'/>
    
    <!--  OE HBL Form -->
	<input	type="hidden" name="oe_hbl_form" value="<bean:write name="valMap" property="oe_hbl_form"/>"/>
	   <!-- page_title_area(S) -->
	<div class="page_title_area clear ">
		<!-- page_title(S) -->
		<h2 class="page_title" id="bigtitle"><button type="button"><span><%=LEV3_NM%></span></button></h2>
		<!-- page_title(E) -->
			
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn" >
			   <button style="cursor:hand; display:none;" type="button" class="btn_accent" btnAuth="<%= roleBtnVO.getAttr1() %>" onClick="doWork('SEARCHLIST')" ><bean:message key="Search"/></button><!--  
			--><button style="cursor:hand; display:none;" type="button" class="btn_normal" btnAuth="<%= roleBtnVO.getAttr2() %>" onClick="doWork('NEW')"><bean:message key="New"/></button><!--  
			--><span style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" ><button style="cursor:hand; display:none;" type="button" class="btn_normal" onclick="doWork('ADD')" id="btnAdd" name="btnAdd"><bean:message key="Save"/></button></span><!-- 
			--><span style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button style="cursor:hand; display:none;" type="button" class="btn_normal" onclick="doWork('HBL_ADD')" id="btnfromBlModiObj" name="btnfromBlModiObj"><bean:message key="HBL_ADD_AGAIN"/></button></span><!-- 
			--><span style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button style="cursor:hand; display:none;" type="button"  class="btn_normal" onclick="doWork('SAVE');"  id="btnSave"  name="btnSave"  ><bean:message key="Save"/></button></span><!-- 
			--><span style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button style="cursor:hand; display:none;" type="button" class="btn_normal" onclick="doWork('CLOSE_MODIFY')" id="closeModiObj" name="closeModiObj"><bean:message key="Save"/></button></span><!-- 
			--><span style="cursor:hand; display:none;" btnAuth="CONFIRM"><button style="cursor:hand; display:none;" type="button" class="btn_normal" onclick="doWork('BKGCNF')" id="bkgCnfObj" name="bkgCnfObj"><bean:message key="Confirm"/></button></span><!-- 
			--><span style="cursor:hand; display:none;" btnAuth="HBL_CREATION"><button style="cursor:hand; display:none;" type="button" class="btn_normal" onclick="doWork('HBLCRE')" id="hblCreObj" name="hblCreObj"><bean:message key="HBL_Creation"/></button></span><!-- 
			--><span style="cursor:hand; display:none;" btnAuth="COPY"><button style="cursor:hand; display:none;" type="button" class="btn_normal" onclick="doWork('COPY')" id="btnCopy" name="btnCopy"><bean:message key="Copy"/></button></span><!-- 
			--><span style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button style="cursor:hand; display:none;" type="button" class="btn_normal"  onclick="doWork('PRINT')" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button></span><!-- 
			--><span style="cursor:hand; display:none;" btnAuth="HI_PRINT"><button style="cursor:hand; display:none;" type="button" class="btn_normal"  onclick="doWork('HI_PRINT')" id="btnHiPrint" name="btnHiPrint"><bean:message key="Hawaii_Print"/></button></span><!--
			--><span style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button style="cursor:hand; display:none;" type="button" class="btn_normal"  onclick="doWork('PACKAGE_LABEL')" id="btnLabel" name="btnLabel"><bean:message key="Label"/></button></span><!-- 
			--><span style="cursor:hand; display:none;" btnAuth="LABEL2"><button style="cursor:hand; display:none;" type="button" class="btn_normal"  onclick="doWork('PACKAGE_LABEL2')" id="btnLabel2" name="btnLabel2"><bean:message key="Label"/>2</button></span><!-- 
			--><span style="cursor:hand; display:none;" btnAuth="B_CONFIRM"><button style="cursor:hand; display:none;" type="button" class="btn_normal" onclick="doWork('BOOKING_CONFIRMATION')" id="btnBookConfirm" name="btnBookConfirm"><bean:message key="B.CONFIRM"/></button></span><!-- 
			--><span style="cursor:hand; display:none;" btnAuth="B_SA"><button style="cursor:hand; display:none;" type="button" class="btn_normal" onclick="doWork('ShippingAdvice')" id="btnShippingAdvice" name="btnShippingAdvice"><bean:message key="B.SA"/></button></span><!-- 
			--><span style="cursor:hand; display:none;" btnAuth="ACCOUNTING"><button style="cursor:hand; display:none;" type="button" class="btn_normal" onclick="doWork('GOTOACCT')" id="btnAccounting" name="btnAccounting"><bean:message key="Accounting"/></button></span><!-- 
			--><span style="cursor:hand; display:none;" btnAuth="B_AES"><button style="cursor:hand; display:none;" type="button" class="btn_normal" onclick="doWork('AES')" id="aesObj" name="aesObj"><bean:message key="B.AES"/></button></span><!-- 
			--><span style="cursor:hand; display:none;" btnAuth="P_REPORT"><button type="button" class="btn_normal"  onclick="doWork('PROFIT_REPORT')" ><bean:message key="P_Report"/></button></span><!-- 
			--><span style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>"><button style="cursor:hand; display:none;" type="button" class="btn_normal"  onclick="checkBlSts();doWork('REMOVE')" id="btnDelete" name="btnDelete"><bean:message key="Delete"/></button></span>
		</div>
		<!-- opus_design_btn(E) -->	
		    <!-- page_location(S) -->
		<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
		</div>
     <!-- page_location(E) -->
	</div>
	 <!-- page_title_area(E) -->
  
   
   <div class= "wrap_search_tab" style="min-width:1300px;">
	  <div class= "opus_design_inquiry">
	  	<table>
	  		<colgroup>
	  			<col width="60" />
	  			<col width="150" />
	  			<col width="*" />
	  			<col width="200" />
	  			<col width="450" />
	  		</colgroup>
	  		<tbody>
	  			<tr>
					<th><bean:message key="HBL_No"/></th>
					<td>
						<input type="text" name="f_bl_no" required  maxlength="40" value="<bean:write name="valMap" property="f_bl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:125px;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openPopUp('HBL_POPLIST',this)"></button>
					</td>
					<td></td>
					<th class="table_search_head_etc">*<bean:message key="Status"/>:</th>
					<td><input  tabindex="-1" type="text" name="bl_sts_label" value='<bean:write name="hblVO" property="bl_sts_label"/>' class="search_form" style="width:130px;border:0;background-color:#f7f9fc;padding-top:5;color:#B60500" readOnly>
					</td>
	  			</tr>
	  		</tbody>
	  	</table>
		</div>
	</div>	

	<div class="wrap_result_tab" style="min-width:1300px;">
		<div class="opus_design_grid" style="display: none;">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
	    <ul class="opus_design_tab">
	        <li class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Booking"/>&nbsp;&&nbsp;<bean:message key="HBL"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Container"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Mark_Desc"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Freight"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Work_Order"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('06');"><span><bean:message key="Status"/></span></a></li>
	        <span style="display:none;" btnAuth="HI_PRINT"><li id="tabHwiFrt" name="tabHwiFrt" style="display: none"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('07');"><span><bean:message key="Hawaii_Freight"/></span></a></li></span>
	    </ul>
	    
	    <!--  jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. -->
		<div id="tabLayer" name="tabLayer" style="display:inline"><!--Booking&BL-->
			   <%@ include file = "./SEE_BMD_0021.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer" style="display:none"><!--Container-->
			   <%@ include file = "./SEE_BMD_0023.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer" style="display:none"><!--Mark Description-->
			   <%@ include file = "./SEE_BMD_0022.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer" style="display:none"><!--Freight-->
				<%@ include file = "./SEE_BMD_0024.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer" style="display:none"><!--WorkOrder-->
				<%@ include file = "./SEE_BMD_0025.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer" style="display:none"><!--Status-->
				<%@ include file = "./SEE_BMD_0026.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer" style="display:none"><!--Hawaii Freight-->
				<%@ include file = "./SEE_BMD_0032.jsp"%>
		</div>
		
</div>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" value=""/>
    <input type="hidden" name="intg_bl_seq" value=""  />
    <input type="hidden" name="docType" value=""/>
</form>
		
<script type="text/javascript">
fnbtnCtl();
</script>	
	
</body>
</html>