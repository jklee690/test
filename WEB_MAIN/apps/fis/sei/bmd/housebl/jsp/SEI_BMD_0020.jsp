<%--
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEI_BMD_0020.jsp
*@FileTitle  :  SEI_BMD_0020
*@author     : CLT
*@version    : 1.0
*@since      : 2015/06/18
=========================================================*/

--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String usrId		= userInfo.getUsrid();
		String usrPhn		= userInfo.getPhn();
		String usrFax		= userInfo.getFax();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
		String use_hbl_ser	= userInfo.getUse_hbl_ser();
	%>
	
    <link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>

    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js"></script>

	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/sei/bmd/housebl/script/SEI_BMD_0020.js"></script>
	<script>

		function setupPage()
		{
			setOfficeData();btnLoad();loadPage();doHideProcess();loadData();fmMbl();
			
		}
		function btnLoad(){
			frm1.ref_no.className = 'search_form';
		    frm1.ref_no.readOnly  = false;
		    getObj("brnRef_no").disabled  = false;
		    
		    getObj("closeModiObj").style.display = 'none';
		    getObj("btnSave").style.display = 'inline';
		    
			if(frm1.bl_sts_cd.value=='NA'){
				//getObj("mblMk").style.display  = 'inline';
				//getObj("tmplObj").style.display= 'inline';
			}else{

				getObj("btnDeliveryOrder").style.display = 'inline';
				//getObj("tmplObj").style.display= 'none';
				//getObj("btnAdd").style.display= 'none';
				if(frm1.bl_sts_cd.value=='HC'){
					getObj("btnDelete").style.display = 'inline';
					//getObj("mblMk").style.display  = 'none';
		            getObj("btnfromBlModiObj").style.display = 'inline';
					getObj("sadAuto").style.display = 'inline';
					//getObj("addAuto").style.display = 'inline';
					getObj("mkSayAuto").style.display = 'inline';
					getObj("cnrtPopAdd").style.display = 'inline';
					//getObj("cnrtAdd").style.display = 'inline';
					getObj("itmAdd").style.display = 'inline';
					getObj("loadPO").style.display = 'inline';

                    //getObj("hblCnfObj").style.display = 'inline';
		
		            //getObj("btnModify").style.display = 'inline';
					getObj("btnCopy").style.display  = 'inline';

					getObj("btnPrint").style.display = 'inline';
					getObj("btnPreliminary").style.display = 'inline';
					getObj("btnAccounting").style.display = 'inline';
					
					getObj("sndEmlObj").style.display = 'none';
					getObj("fileUpObj").style.display = 'inline';
        
					//Freight버튼
					getObj("sdBtns").style.display    = 'inline';
					getObj("bcBtns").style.display    = 'inline';
					getObj("dcBtns").style.display    = 'inline';
					
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
					
                }else if(frm1.bl_sts_cd.value=='HO'){
                    //getObj("hblCnfObj").style.display = 'none';
                    //getObj("btnModify").style.display = 'none';
                    getObj("btnDelete").style.display = 'none';
                    getObj("closeModiObj").style.display = 'none';
                    getObj("btnfromBlModiObj").style.display = 'inline';
                    getObj("btnCopy").style.display  = 'inline';
                    getObj("btnPrint").style.display = 'inline';
                    getObj("btnPreliminary").style.display = 'inline';
                    getObj("btnAccounting").style.display = 'inline';
                    getObj("sndEmlObj").style.display = 'none';
                    getObj("fileUpObj").style.display = 'inline';
        
					//Freight버튼
                    getObj("sdBtns").style.display    = 'none';
                    getObj("bcBtns").style.display    = 'none';
                    getObj("dcBtns").style.display    = 'none';
                    
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
				}else{
		            //btnModify").style.display = 'none';
					getObj("btnDelete").style.display = 'none';
					getObj("btnSave").style.display = 'none';
					getObj("btnfromBlModiObj").style.display = 'inline';
					getObj("closeModiObj").style.display = 'inline';
					getObj("btnCopy").style.display  = 'inline';
					getObj("btnPrint").style.display = 'inline';
					getObj("btnPreliminary").style.display = 'inline';
					getObj("sndEmlObj").style.display = 'none';
					getObj("fileUpObj").style.display = 'inline';
					
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
					
					// #48835 - [CARGOIS] COPY 한 HBL 의 이상한 현상
		            // Block 된 B/L일 경우 Filing No 수정 못하도록 수정
		           	frm1.ref_no.className = 'search_form-disable';
		            frm1.ref_no.readOnly  = true;
		            getObj("brnRef_no").disabled  = true;		
				}
			}
			
			// Chungrue 추가 GLOVIS EDI
			if('<%=ofc_cd%>' == "SEL"){
				getObj("goalsObj").style.display = "inline";
			}else{
				getObj("goalsObj").style.display = "none";
			}
			
			//[20130130 OJG] User Office 국가가 US 인 경우, 맨 하단 AN Freight 부분 안보이게, AR, DC 의 Arrival Notice 버튼도 안보이게
			/*
			if(user_ofc_cnt_cd == "US"){
				getObj("btnARAnList").style.display = "none";
				getObj("btnDCAnList").style.display = "none";
				getObj("gridANFrieght").style.display = "none";	
			}
			*/
			
			fnbtnCtl();
		}
		
		/**
		*BL복사 시
		*/
		function searhCopyFrt(){
			<logic:notEmpty name="valMap" property="org_bl_seq">
				//Selling/Debit Freight 조회
				docObjects[4].DoSearch4Post("./SEI_BMD_0024GS.clt",   'f_search_tp=CP&f_cmd='+SEARCHLIST06+'&intg_bl_seq=<bean:write name="valMap" property="org_bl_seq"/>');
		
				//Buying/Crebit List 조회
				docObjects[5].DoSearch4Post("./SEI_BMD_0024_1GS.clt", 'f_search_tp=CP&f_cmd='+SEARCHLIST07+'&intg_bl_seq=<bean:write name="valMap" property="org_bl_seq"/>');
			</logic:notEmpty>
		}
		
		var TPCD1 = '';
        var TPCD2 = '';
        <% boolean isBegin = false; %>
        <!--Role 코드조회-->
        <bean:define id="tpszList"  name="valMap" property="cntrTpszList"/>
        <logic:iterate id="codeVO" name="tpszList">
            <% if(isBegin){ %>
                TPCD1+= '|';
                TPCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
            TPCD1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
            TPCD2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
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
		
		
		function fmMbl(){
		<logic:notEmpty name="valMap" property="fmMbl">
		    //getObj("btnAdd").style.display = 'inline';
            
            //frm1.bl_no.className = 'search_form';
            //frm1.bl_no.readOnly  = false;
            //frm1.bl_no.focus();
		</logic:notEmpty>
		}
		
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
        var ofc_post_dt = "<bean:write name="ofcVO" property="post_dt_imp"/>";
        var ofc_curr_cd = "<bean:write name="ofcVO" property="trf_cur_cd"/>";
        var oi_cgor_pic_info = "<bean:write name="ofcVO" property="oi_cgor_pic_info"/>";
        var pps_use_flg = "<bean:write name="ofcVO" property="pps_use_flg"/>";
        var ctf_use_flg = "<bean:write name="ofcVO" property="ctf_use_flg"/>";
        var cf_use_flg = "<bean:write name="ofcVO" property="cf_use_flg"/>";

        var current_usrid = "<%=userInfo.getUsrid()%>";
        
        var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
        
        var login_user_ofc_cd = "<%=ofc_cd%>";
        var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
        var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
        


		function fnbtnCtl(){
			
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
			//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
			var formObj=document.frm1;
			var edob_flg 		= "<%=userInfo.getEdob_flg()%>"; //ENABLE EDITING OTHER OFFICE (B/L) 
			var ref_ofc_cd =  formObj.ref_ofc_cd.value;
			//alert(edob_flg + " "+login_user_ofc_cd+" "+ref_ofc_cd);
			var btnflag = "Y";
			if (edob_flg == "N"){
				if (login_user_ofc_cd != ref_ofc_cd){  
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
			}
 

			doBtnAuthority(attr_extension);  
		}
        
        </script>

<style>
<!--
.table_search_head_etc {

    font-family: "Tahoma", "Arial", "Verdana";
    font-size: 11px;
    font-weight: normal;
    vertical-align: middle;
    color: #2D5CAC;
    background-image: url(/opusfwd/web/img/main/star_icon2.gif);
    background-repeat: no-repeat;
    background-position: left center;
    text-indent: 6px;
}
-->
</style>

<form name="frm1" method="POST" action="./SEI_BMD_0020.clt" class="filter">
	<input type="hidden" name="f_cmd" id="f_cmd">
	<input type="hidden" name="h_ofc_cnt_cd" id="h_ofc_cnt_cd">

	<input type="hidden" name="file_name" id="file_name">
	<input type="hidden" name="title" id="title">
	<input type="hidden" name="rd_param" id="rd_param">
	<input type="hidden" name="f_ref_no"/>

	<html:hidden name="hblVO"  property="bl_sts_cd" />	
    <html:hidden name="hblVO"  property="intg_bl_seq"/>
	<html:hidden name="valMap" property="f_intg_bl_seq"/>
	<input type="hidden" name="h_inv_rmk" id="h_inv_rmk" value="<bean:write name="ofcVO" property="inv_rmk"/>"/>
	<input type="hidden" name="h_dflt_an_memo" id="h_dflt_an_memo" value="<bean:write name="ofcVO" property="dflt_an_memo"/>"/>
	<input type="hidden" name="h_oi_an_lcl_desc" id="h_oi_an_lcl_desc" value="<bean:write name="ofcVO" property="oi_an_lcl_desc"/>">
	<input type="hidden" name="h_oi_an_fcl_desc" id="h_oi_an_fcl_desc" value="<bean:write name="ofcVO" property="oi_an_fcl_desc"/>">
	
	<input type="hidden" name="mk_bl_no" id="mk_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
	
	<input	type="hidden" name="f_cnt_cd" id="f_cnt_cd" value="<%= cnt_cd %>"/>
	<input type="hidden" name="email" id="email" value="<%=email%>">
	<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="mailTitle" id="mailTitle" value="">
	<input type="hidden" name="mailTo" id="mailTo" value="">
	<input type="hidden" name="h_ccn_no" id="h_ccn_no" value="">
	
	<input type="hidden" name="h_mbl_curr_cd" id="h_mbl_curr_cd" value="<bean:write name="hblVO" property="mbl_curr_cd"/>">
	
    <!--  jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. -->
    <input type="hidden" name="f_isNumSep" id="f_isNumSep" 	value='<bean:write name="valMap" property="f_isNumSep"/>'> 		
	<input type="hidden" name="use_hbl_ser" id="use_hbl_ser" value="<%=use_hbl_ser%>">
	
	<!-- #47413 [IMPEX]B/L COPY 기능보완  --> 
    <input type="hidden" name="copy_bl_seq" 	value='<bean:write name="valMap" property="org_bl_seq"></bean:write>'/>
	

<!-- page_title_area(S) -->
	<div class="page_title_area clear ">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><span id="bigtitle"><%=LEV3_NM%></span></button></h2>
		<!-- page_title(E) -->
			
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn" >
			   <button style="display:none;" type="button" class="btn_accent" btnAuth="<%= roleBtnVO.getAttr1() %>" onClick="doWork('SEARCHLIST')" ><bean:message key="Search"/></button><!--  
			--><button style="display:none;" type="button" class="btn_normal" btnAuth="<%= roleBtnVO.getAttr2() %>" onClick="doWork('NEW')"><bean:message key="New"/></button><!--   
			--><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button style="display:none;" type="button" class="btn_normal" id="btnSave" onClick="doWork('SAVE')"><bean:message key="Save"/></button></span><!--  
			--><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button style="display:none;" type="button" class="btn_normal" id="btnfromBlModiObj" onClick="doWork('HBL_ADD')"><bean:message key="HBL_ADD_AGAIN"/></button></span><!--  
			--><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button style="display:none;" type="button" class="btn_normal" id="closeModiObj" onClick="doWork('CLOSE_MODIFY')"><bean:message key="Save"/></button></span><!--  
			--><span style="display:none;" btnAuth="COPY"><button style="display:none;" type="button" class="btn_normal" id="btnCopy" onClick="doWork('COPY')"><bean:message key="Copy"/></button></span><!--  
			--><span style="display:none;" btnAuth="P_CL"><button style="display:none;" type="button" class="btn_normal" id="btnPreliminary" onClick="doWork('PreliminaryClaim')"><bean:message key="P.CL"/></button></span><!--
			--><span style="display:none;" btnAuth="B_AN"><button style="display:none;" type="button" class="btn_normal" id="btnPrint" onClick="doWork('ArrivalNotice')"><bean:message key="B.AN"/></button></span><!--
			--><span style="display:none;" btnAuth="B_DO"><button style="display:none;" type="button" class="btn_normal" id="btnDeliveryOrder" onClick="doWork('DELIVERY_ORDER')"><bean:message key="B.DO"/></button></span><!--
			--><button type="button" style="display:none;" class="btn_normal" btnAuth="REL_ORDER" onClick="doWork('RELEASE_ORDER')"><bean:message key="REL_Order"/></button><!--  
			--><span style="display:none;" btnAuth="ACCOUNTING"><button style="display:none;" type="button" class="btn_normal" id="btnAccounting" onClick="doWork('GOTOACCT')"><bean:message key="Accounting"/></button></span><!--  
			--><span style="display:none;" btnAuth="B_GOALS"><button style="display:none;" type="button" class="btn_normal" id="goalsObj" onClick="doWork('GOALS')"><bean:message key="B.Goals"/></button></span><!--  
			--><button style="display:none;" type="button" class="btn_normal" btnAuth="P_REPORT" onClick="doWork('PROFIT_REPORT')"><bean:message key="P_Report"/></button><!--  
			--><span style="display:none;"  btnAuth="<%= roleBtnVO.getAttr4() %>"><button style="display:none;" type="button" class="btn_normal" id="btnDelete" onClick="doWork('REMOVE')"><bean:message key="Delete"/></button></span>
		</div>
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
	
<div class="wrap_search_tab">
	<!-- opus_design_inquiry(S) -->
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="40" />				
				<col width="900" />							
				<col width="50" />				
				<col width="*" />				
		   </colgroup> 
		   <tbody>
		   		<tr>
                    <th><bean:message key="HBL_No"/></th>
                    <td>
                        <input type="text" name="f_bl_no"  maxlength="40" value="<bean:write name="valMap" property="f_bl_no"/>" required dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)"><!--
                     	 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('HBL_POPLIST',this)"></button>
                        </td>
                    <th class="table_search_head_etc"><bean:message key="Status"/></th>
                    <td><input tabindex="-1" type="text" name="bl_sts_label" value="<bean:write name="hblVO" property="bl_sts_label"/>" class="search_form" style="width:130px;border:0;background-color:#f7f9fc;padding-top:5;color:#B60500" readOnly></td>
		   		</tr>
		   </tbody>
		</table>
	</div>
</div>	
	
	 <div class="wrap_result_tab">
		<div class="opus_design_grid" id="mainTable" style="display: none;">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
	    <ul class="opus_design_tab">
	        <li class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Booking"/>&nbsp;&&nbsp;<bean:message key="HBL"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Container"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Mark_Desc"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Freight"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Work_Order"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('06');"><span><bean:message key="Status"/></span></a></li>
	    </ul>
	    <!-- tab_player_ 1 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:inline"><!--Booking&BL-->
			<%@ include file = "./SEI_BMD_0021.jsp"%>
		</div>
		<!-- tab_player_1 (E) -->
		
		
		<!-- tab_player_2 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Container-->
			<%@ include file = "./SEI_BMD_0023.jsp"%>
		</div>
		<!-- tab_player_2 (E) -->
		
		
		<!-- tab_player_3 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Mark Description-->
			<%@ include file = "./SEI_BMD_0022.jsp"%>
		</div>
		<!-- tab_player_3 (E) -->
		
		
		<!-- tab_player_4 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Freight-->
			<%@ include file = "./SEI_BMD_0024.jsp"%>
		</div>
		<!-- tab_player_4 (E) -->
		
		
		<!-- tab_player_5 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--WorkOrder-->
			<%@ include file = "./SEI_BMD_0026.jsp"%>
		</div>
		<!-- tab_player_5 (E) -->
		
		
		<!-- tab_player_6 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Status-->
			<%@ include file = "./SEI_BMD_0025.jsp"%>
		</div>
		<!-- tab_player_6 (E) -->
	 </div>
	
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere"  id="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"  id="bcKey"  value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" id="s_palt_doc_seq" value=""/>
    <input type="hidden" name="intg_bl_seq" id="intg_bl_seq" value="" />
    <input type="hidden" name="docType" name="docType"="docType" value=""/>
</form>

<script type="text/javascript">
fnbtnCtl();
</script>	
		
<!-- 2010.12.17 김진혁 추가, 수입은 최초화면 loading될 때 Collect로 셋팅 -->
<script>
if('<bean:write name="hblVO" property="frt_term_cd"/>'==""){
	frm1.frt_term_cd.value = "CC";
}
</script>