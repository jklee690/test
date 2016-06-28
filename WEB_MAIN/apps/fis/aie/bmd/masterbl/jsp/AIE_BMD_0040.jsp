<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AIE_BMD_0040.jsp
*@FileTitle  : MAWB등록 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/08/14
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>

    <link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>

	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/aie/bmd/masterbl/script/AIE_BMD_0040.js"></script>
	<script>	
		function dispBizBtns(dispTp){
			//Freight버튼
			getObj("sdBtns").style.display    = dispTp;
			getObj("bcBtns").style.display    = dispTp;
			getObj("dcBtns").style.display    = dispTp;

			getObj("finalModiObj").style.display = 'none';
			
		}
        function btnLoad(){

        	// post date 수정 권한
        	//if(user_role_cd=="ADM"){
        	//	frm1.post_dt.className = "search_form";
        	//	frm1.post_dt.readOnly = false;
        		
        		//2012.11.14 요청사항에 의해서 일단 숨김
        		//finalModiObj.style.display = 'inline';
        		
        	//}
        	
        	frm1.ref_no.className = 'search_form';
		    frm1.ref_no.readOnly  = false;

        	if(user_lang_cd == "KO"){
        		getObj("mf").style.display = 'inline';
            }else{
            	getObj("mf").style.display = 'none';
            }
        	
            if(frm1.bl_sts_cd.value=='NA'){

            	getObj("btnAccounting").style.display = 'none';
            	
                frm1.bl_no.className = 'search_form';
                frm1.bl_no.readOnly  = false;

                //hblCallObj.style.display = 'inline';
        
                frm1.mrn.className = 'search_form';
                frm1.mrn.readOnly  = false;
                
                //frm1.lnr_bkg_no.className = 'search_form';
                //frm1.lnr_bkg_no.readOnly  = false;
		
            }else{
            	getObj("btnPProfit").style.display  = 'inline';
				//btnAdd.style.display = 'none';
				 if(frm1.bl_sts_cd.value=='MC'){
				    frm1.mrn.className = 'search_form';
					frm1.mrn.readOnly  = false;
					
					getObj("btnPrint").style.display = 'inline';
					getObj("conPouch").style.display = 'inline';
					getObj("btnAccounting").style.display = 'inline';
					getObj("btnDelete").style.display   = 'inline';
					getObj("fileUp").style.display  = 'inline';        
					getObj("sDoc").style.display  = 'inline';        
					getObj("btnCopy").style.display = 'inline';
					getObj("hblObj").style.display  = 'inline';
					// #48284 - [IMPEX] AIR EXPORT MASTER FUNCTION 버튼 ENTRY & LIST 동일하게
					getObj("btnLabelPrint").style.display = 'inline';
					getObj("btnTSA").style.display = 'inline';
					getObj("btnCargoManifest").style.display = 'inline';
					
					dispBizBtns('inline');
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
				}else if(frm1.bl_sts_cd.value=='HO'){
					getObj("btnPrint").style.display = 'inline';
					getObj("conPouch").style.display = 'inline';
					getObj("btnAccounting").style.display = 'inline';
					
					getObj("btnSave").style.display  = 'none';
					
					getObj("btnDelete").style.display   = 'none';
			
					getObj("fileUp").style.display  = 'inline';        
					getObj("sDoc").style.display  = 'inline';        
					getObj("btnCopy").style.display = 'inline';
					getObj("hblObj").style.display = 'inline';
					// #48284 - [IMPEX] AIR EXPORT MASTER FUNCTION 버튼 ENTRY & LIST 동일하게
					getObj("btnLabelPrint").style.display = 'inline';
					getObj("btnTSA").style.display = 'inline';
					getObj("btnCargoManifest").style.display = 'inline';

					dispBizBtns('none');
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
				}else if(frm1.bl_sts_cd.value=='HF'){
					getObj("btnPrint").style.display = 'inline';
					getObj("conPouch").style.display = 'inline';
					getObj("btnAccounting").style.display = 'inline';
					
					getObj("btnSave").style.display  = 'none';
					
					getObj("btnDelete").style.display   = 'none';
			
					getObj("fileUp").style.display  = 'inline';        
					getObj("sDoc").style.display  = 'inline';        
					getObj("btnCopy").style.display = 'inline';
					getObj("hblObj").style.display = 'none';
					// #48284 - [IMPEX] AIR EXPORT MASTER FUNCTION 버튼 ENTRY & LIST 동일하게
					getObj("btnLabelPrint").style.display = 'inline';
					getObj("btnTSA").style.display = 'inline';
					getObj("btnCargoManifest").style.display = 'inline';

					dispBizBtns('none');
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
					
					// #48835 - [CARGOIS] COPY 한 HBL 의 이상한 현상
		            // Block 된 B/L일 경우 Filing No 수정 못하도록 수정
		           	frm1.ref_no.className = 'search_form-disable';
		            frm1.ref_no.readOnly  = true;
				}else{
					getObj("btnCopy").style.display = 'none';
					getObj("hblObj").style.display = 'none';
					getObj("btnAccounting").style.display = 'none';
				}
			}
            
            fnbtnCtl();
            
        }
		
		var shpAddr = '<bean:write name="hblVO" property="shpr_trdp_nm"/> O/B OF';
		var ref_ofc_eng_nm = '<bean:write name="hblVO" property="ref_ofc_eng_nm"/>';
		
		<!-- ###Office Info## -->
        <% boolean isBegin = false; %>
        <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
        var v_ofc_cd = "<bean:write name="ofcVO" property="ofc_cd"/>";
        var oth_size_ut_cd = "<bean:write name="ofcVO" property="oth_size_ut_cd"/>";
        var air_body = "<bean:write name="ofcVO" property="air_body"/>";
        var ofc_post_dt = "<bean:write name="ofcVO" property="post_dt_exp"/>";
        var ofc_curr_cd = "<bean:write name="ofcVO" property="trf_cur_cd"/>";
        var iata_cd = "<bean:write name="ofcVO" property="iata_cd"/>";
        
        <!-- Air Freight -->
		var UNITCD1_1 = '';
		var UNITCD1_2 = '';
        <logic:notEmpty name="valMap" property="airAplyUtCdCdList">
			<% isBegin = false; %>
            <bean:define id="airAplyUtCdCdList" name="valMap" property="airAplyUtCdCdList"/>
            <logic:iterate id="codeVO" name="airAplyUtCdCdList">
                <% if(isBegin){ %>
                	UNITCD1_1+= '|';
                	UNITCD1_2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   UNITCD1_1+= '<bean:write name="codeVO" property="cd_nm" filter="false"/>';
                   UNITCD1_2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>

        <!-- Other Freight -->
		var UNITCD2_1 = '';
		var UNITCD2_2 = '';
        <logic:notEmpty name="valMap" property="othAplyUtCdCdList">
			<% isBegin = false; %>
            <bean:define id="othAplyUtCdCdList" name="valMap" property="othAplyUtCdCdList"/>
            <logic:iterate id="codeVO" name="othAplyUtCdCdList">
                <% if(isBegin){ %>
	                UNITCD2_1+= '|';
	                UNITCD2_2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   UNITCD2_1+= '<bean:write name="codeVO" property="cd_nm" filter="false"/>';
                   UNITCD2_2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>

        <!-- Freight Term Code -->
		var TERMCD1 = '';
		var TERMCD2 = '';
        <logic:notEmpty name="valMap" property="frtCdList">
			<% isBegin = false; %>
            <bean:define id="frtCdList" name="valMap" property="frtCdList"/>
            <logic:iterate id="codeVO" name="frtCdList">
                <% if(isBegin){ %>
                	TERMCD1+= '|';
                	TERMCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   TERMCD1+= '<bean:write name="codeVO" property="cd_nm" filter="false"/>';
                   TERMCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>

        <!-- Currency Code -->
		var CURRCD1 = '';
		var CURRCD2 = '';
        <logic:notEmpty name="valMap" property="currCdList">
			<% isBegin = false; %>
            <bean:define id="currCdList" name="valMap" property="currCdList"/>
            <logic:iterate id="codeVO" name="currCdList">
                <% if(isBegin){ %>
	                CURRCD1+= '|';
	                CURRCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   CURRCD1+= '<bean:write name="codeVO" property="cd_nm" filter="false"/>';
                   CURRCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>

        <!-- Rate Class Code -->
		var RCLASSCD1 = '';
		var RCLASSCD2 = '';
        <logic:notEmpty name="valMap" property="rClassCdList">
			<% isBegin = false; %>
            <bean:define id="rClassCdList" name="valMap" property="rClassCdList"/>
            <logic:iterate id="codeVO" name="rClassCdList">
                <% if(isBegin){ %>
                	RCLASSCD1+= '|';
                	RCLASSCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   RCLASSCD1+= '<bean:write name="codeVO" property="cd_nm" filter="false"/>';
                   RCLASSCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>

        <!-- Freight Code -->
		var FRTCD1 = '';
		var FRTCD2 = '';
        <logic:notEmpty name="valMap" property="FREIGHT_CODE">
			<% isBegin = false; %>
            <bean:define id="FREIGHT_CODE" name="valMap" property="FREIGHT_CODE"/>
            <logic:iterate id="frtVO" name="FREIGHT_CODE">
                <% if(isBegin){ %>
	                FRTCD1+= '|';
	                FRTCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   FRTCD1+= '<bean:write name="frtVO" property="frt_cd" filter="false"/>';
                   FRTCD2+= '<bean:write name="frtVO" property="frt_cd_nm" filter="false"/>';
            </logic:iterate>
        </logic:notEmpty>

        var usrid = '<%=userInfo.getUsrid()%>';
        var ofccd = '<%=userInfo.getOfc_cd()%>';
        var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";

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

        var user_role_cd = "<%=userInfo.getRole_cd()%>";
        var user_lang_cd = "<%=userInfo.getUse_lang_cd()%>";
        var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
        function setupPage(){
        	setOfficeData();
        	loadPage();
        	btnLoad();
        	doHideProcess();
        	loadData();
		 }
        var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
        


		function fnbtnCtl(){
			
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
			//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
			var formObj=document.frm1;
			var edob_flg 		= "<%=userInfo.getEdob_flg()%>"; //ENABLE EDITING OTHER OFFICE (B/L) 
			var ref_ofc_cd =  formObj.h_ref_ofc_cd.value;
			//alert(edob_flg + " "+ofccd+" "+ref_ofc_cd);
			var btnflag = "Y";
			if (edob_flg == "N"){
				if (ofccd != ref_ofc_cd){  
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
			}
 

			doBtnAuthority(attr_extension);  
		}
        
   </script>
<form name="frm1" method="POST" action="./AIE_BMD_0040.clt" class="filter">
    <input type="hidden" name="f_cmd">
    <html:hidden name="hblVO"  property="bl_sts_cd"/>   
    <html:hidden name="hblVO"  property="intg_bl_seq"/>
    <html:hidden name="hblVO"  property="sr_no"/>
    <html:hidden name="valMap" property="f_intg_bl_seq"/>
    <input type="hidden" name="mk_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
    <input type="hidden" name="h_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
    <input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	
	<!-- check freight -->
    <input type="hidden" name="chk_fr_trdp_cd"      value="">
    <input type="hidden" name="chk_fr_trdp_nm"      value="">
    <input type="hidden" name="chk_fr_inv_curr_cd"  value="">
    
    <!-- 조회된 Ref_no , ref 번호 변경시 비교를 위해서 -->
    <input type="hidden" name="sel_ref_no"  value='<bean:write name="hblVO" property="ref_no"/>'> 
    <!-- 조회된 lnr_bkg_no , lnr_bkg_no 번호 변경시 비교를 위해서 -->
    <input type="hidden" name="org_lnr_bkg_no"  value='<bean:write name="hblVO" property="lnr_bkg_no"/>'> 
    <!-- 업데이트 시에 변경된 값과 비교해 보기 위해서 -->
    <input type="hidden" name="org_post_dt"  value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>
    
    <!-- 업데이트 시에 변경된 값과 비교해 보기 위해서 Block page에서 post_dt 변경후 화면에서 아래 값들을 변경 체크 위해 유지 -->     
    <input type="hidden" name="org_etd_dt_tm"  id="org_etd_dt_tm" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>
    <input type="hidden" name="org_eta_dt_tm"  id="org_eta_dt_tm" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>
    
    
    <input type="hidden" name="h_aem_hand_info" value="<bean:write name='ofcVO' property='aem_hand_info' />" />
    
   	<!-- #47413 [IMPEX]B/L COPY 기능보완  --> 
    <input type="hidden" name="copy_bl_seq" 	value='<bean:write name="valMap" property="org_bl_seq"></bean:write>'/>
    
    <!--  jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. -->
    <input type="hidden" name="f_isNumSep" 	value='<bean:write name="valMap" property="f_isNumSep"/>'>     
    
    <!-- #50048 - [IMPEX] B/L PRINT HISTORY 저장관련 ENTRY 화면에서 CODE FIELDS 저장시 업데이트 -->
    <input type="hidden" name="pre_flt_no"       value='<bean:write name="hblVO" property="flt_no"/>' />
	<input type="hidden" name="pre_lnr_trdp_nm"  value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' />
	<input type="hidden" name="pre_shpr_trdp_nm" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>' />
	<input type="hidden" name="pre_iss_trdp_nm"  value='<bean:write name="hblVO" property="iss_trdp_nm"/>' />
	
    <!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><span id="bigtitle"><%=LEV3_NM%></span></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <span style="display:none;" btnAuth="FINAL"><button type="button" class="btn_normal" id="finalModiObj" style="display:none;" onClick="doWork('FINAL_MODIFY')"><bean:message key="Final"/></button></span><!-- 
		--><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><button type="button" class="btn_accent" onClick="doWork('SEARCHLIST')"><bean:message key="Search"/></button></span><!-- 
		--><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><button type="button" class="btn_normal" onClick="doWork('NEW')"><bean:message key="New"/></button></span><!-- 
		--><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_normal" id="btnSave" onClick="doWork('SAVE')"><bean:message key="Save"/></button></span><!-- 
		--><span style="display:none;" btnAuth="COPY"><button type="button" class="btn_normal" id="btnCopy" style="display:none;" onClick="doWork('COPY')"><bean:message key="Copy"/></button></span><!-- 
		--><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" id="btnPrint"  style="display:none;" onClick="doWork('PRINT')"><bean:message key="Print"/></button></span><!-- 
		--><span style="display:none;" btnAuth="CON_POUCH"><button type="button" class="btn_normal" style="display:none;" id="conPouch" onclick="doWork('CON_POUCH')"><bean:message key="Consolidation_pouch"/></button></span><!--
		--><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" style="display:none;" onclick="doWork('AIR_LABEL')" id="btnLabelPrint" name="btnLabelPrint"><bean:message key="Label"/></button></span><!--
		--><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('CargoManifest');" id="btnCargoManifest" ><bean:message key="B.Manifest"/></button></span><!-- 
		--><span style="display:none;" btnAuth="ACCOUNTING"><button type="button" class="btn_normal" id="btnAccounting" onClick="doWork('GOTOACCT');"><bean:message key="Accounting"/></button></span><!-- 
		--><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('TSA');" id="btnTSA" ><bean:message key="TSA"/></button></span><!-- 
		--><span style="display:none;" btnAuth="P_REPORT"><button type="button" class="btn_normal" id="btnPProfit"  style="display:none;" onClick="doWork('PROFIT_REPORT')"><bean:message key="P_Report"/></button></span><!-- 
		--><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" id="mf" style="display:none;" onClick="doWork('MFPRINT');"><bean:message key="M_F"/></button></span><!-- 
		--><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>" ><button type="button" class="btn_normal" id="btnDelete" style="display:none;" onClick="doWork('REMOVE')"><bean:message key="Delete"/></button></span><!-- 
		--><span style="display:none;" btnAuth="HAWB_CREATE"><button type="button" class="btn_normal" id="hblObj" style="display:none;" onClick="doWork('HBL_ENTRY')"><bean:message key="HAWB_Create"/></button></span>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<div class="wrap_search_tab">	
		<div class="opus_design_inquiry">
			<table>
                <tr>
                	<th width="50px"><bean:message key="Ref_No"/></th>
                    <td width="180px"><!-- 
                     --><input name="f_ref_no" maxlength="20"  value="<bean:write name="valMap" property="f_ref_no"/>" type="text" class="search_form" dataformat="excepthan" style="width:130px;" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
                     --><button type="button" class="input_seach_btn" tabindex="-1" onClick="srAirOpenPopUp('REF_POPLIST2', this, 'A', 'O')"></button><!-- 
                     --></td>
                    <th width="70px"><bean:message key="MAWB_No"/></th>
                    <td><!-- 
                     --><input name="f_bl_no"  maxlength="40"  value="<bean:write name="valMap" property="f_bl_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
                     --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openAieMasterPopUp('MBL_POPLIST',this)"></button><!-- 
                     --></td>
                </tr>
            </table>
		</div>
	</div>
    <div class="wrap_result_tab">
    	<div class="opus_design_grid" id="mainTable" style="display: none;">
    		<script language="javascript">comSheetObject('sheet1');</script>
    	</div>
	    <ul class="opus_design_tab">
	        <li class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Master_AWB_Entry"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Mark_Desc"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="BL_Rate"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Freight"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Work_Order"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('06');"><span><bean:message key="Shipping_Document"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('07');"><span><bean:message key="Status"/></span></a></li>
	    </ul>
	
		<!-- tabLayer1 (S) -->
		<div name="tabLayer" id="tabLayer" style="display: inline;">
			<div class="opus_design_inquiry" style="margin-bottom: 8px;">
				<table>
					<colgroup>
				        	<col width="50">
				        	<col width="75">
				        	<col width="70">
				        	<col width="115">
				        	<col width="120">
				        	<col width="115">
				        	<col width="80">
				        	<col width="*">
				   </colgroup>
			       <tbody>
						<tr>
							<th><bean:message key="Ref_No"/></th>
		                    <td>
		                    	<input type="text" name="ref_no" maxlength="20" value='<bean:write name="hblVO" property="ref_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-transform:uppercase;" onblur="strToUpper(this)" onclick="if(frm1.ref_no.value=='AUTO'){frm1.ref_no.value=''}"><!-- 
		                     --><bean:define id="ofcList" name="valMap" property="ofcList"/><!-- 
		                     --><html:select name="hblVO" property="ref_ofc_cd" styleClass="search_form" style="width:55px;" onchange="ofcChDEta();">
		                     		<html:options collection="ofcList" property="ofc_cd" labelProperty="ofc_cd"/>
		                     	</html:select>
		                     	<input type="hidden" name="h_ref_ofc_cd" value="<bean:write name="hblVO" property="ref_ofc_cd"/>">
		                    </td>
							<th><bean:message key="BL_Type"/></th>
							<td>
								<bean:define id="blTypeList" name="valMap" property="blTypeList"/> 
								 <html:select name="hblVO" property="hbl_tp_cd" styleClass="search_form" style="width:115px;"> 
								 	<html:options collection="blTypeList" property="cd_val" labelProperty="cd_nm"/> 
								 </html:select> 
							 </td>
							<th><bean:message key="Post_Date"/></th>
		                    <td><input type="text" name="post_dt" value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form-disable" style="width:115px;" readonly></td>
							<th><bean:message key="BL_Date"/></th>
		                    <td>
		                        <input type="text" name="bl_dt_tm" id="bl_dt_tm" value='<wrt:write name="hblVO" property="bl_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);changeBLDate();" size='11' maxlength="10" class="search_form" onchange="changeBLDate();"><!-- 
		                     --><button type="button" class="calendar" tabindex="-1" id="bl_dt_tm_cal" onclick="doDisplay('DATE1', frm1.bl_dt_tm);"></button>
		                    </td>
						</tr>
						<tr>
							<th><bean:message key="MAWB_No"/></th>
							<td>
								<input type="text" name="bl_no" maxlength="40" value='<bean:write name="hblVO" property="bl_no"/>' onKeyDown="setCarrierCd(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this);setCarrierCd(this)"><!-- 
							 --><button type="button" class="btn_etc" onClick="doWork('STOCK_POP')"><bean:message key="Stock"/></button>
							</td>
							<th><bean:message key="MRN"/></th>
							<td><input type="text" name="mrn" maxlength="20" value="<bean:write name="hblVO" property="mrn"/>" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)" readonly></td>
							<th><bean:message key="Liner_Bkg_No"/></th>
							<td><input type="text" name="lnr_bkg_no" maxlength="20"  value="<bean:write name="hblVO" property="lnr_bkg_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this);checkDuplicateLinerBkgNo()"></td>
		                    <th><bean:message key="ITN_No"/></th>
		                    <td><input type="text" name="itn_no" value="<bean:write name="hblVO" property="itn_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:129px;" onblur="strToUpper(this)" maxlength="20" ></td>
						</tr>
					</tbody>
				</table>
			</div>
			
			<div class="layout_wrap" id="mainArea">
				<div class="layout_vertical_3 sm" style="height:630px;" id="layoutVertical1">
				<div class="opus_design_inquiry">
					<h3 style="margin-bottom:0" class="title_design"><bean:message key="Customer"/></h3>
					<table>
						<colgroup>
				        	<col width="70">
				        	<col width="*">
					   </colgroup>
				       <tbody>
							<tr>
								<th><a href="javascript:clearBlPrnr('S01');"><bean:message key="Shipper"/></a></th>
								<td><!-- 
								 --><input type="text"   name="shpr_trdp_nm" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  onblur="strToUpper(this)"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 75px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);}"><!-- 
								 --><input type="hidden" name="shpr_trdp_cd" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_shipper',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled;width:48px;"><!-- 
								 --><button type="button" class="input_seach_btn" tabindex="-1" id="shipper"   onClick="openAieMasterPopUp('LINER_POPLIST',this)"></button><!-- 
								 --><button type="button" id="shipper_pic" class="btn_etc" onClick="openAieMasterPopUp('PIC_POP', this)"><bean:message key="PIC"/></button>
								</td>
							</tr>
							<tr>
								<td colspan="2"><textarea name="shpr_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off">
<bean:write name="hblVO" property="shpr_trdp_addr" filter="false"/></textarea></td>
							</tr>
							<tr>
								<th><a href="javascript:clearBlPrnr('C01');"><bean:message key="Consignee"/></a></th>
								<td>
									<input type="hidden" name="cnee_trdp_cd"  value='<bean:write name="hblVO" property="cnee_trdp_cd"/>'  onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_consignee',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:48px;"><!-- 
								 --><input type="text"   name="cnee_trdp_nm"  value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);notifyKeyIn();"   class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 30px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);}"><!-- 
								 --><button type="button" class="input_seach_btn" tabindex="-1" id="consignee" onClick="openAieMasterPopUp('LINER_POPLIST',this);notifyKeyIn();"></button>
								</td>
							</tr>
							<tr>
								<td colspan="2"><textarea name="cnee_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address')" WRAP="off">
<bean:write name="hblVO" property="cnee_trdp_addr" filter="false"/></textarea></td>
							</tr>
							<tr>
								<th><a href="javascript:clearBlPrnr('N01');"><bean:message key="Notify"/></a></th>
								<td>
									<input type="hidden" name="ntfy_trdp_cd"  value='<bean:write name="hblVO" property="ntfy_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_notify',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_notify',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled;width:48px;"><!-- 
								 --><input type="text"   name="ntfy_trdp_nm"  value='<bean:write name="hblVO" property="ntfy_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);notifyKeyIn();" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 30px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST', document.getElementById('notify'), frm1.ntfy_trdp_nm.value);}"><!-- 
								 --><button type="button" class="input_seach_btn" tabindex="-1" id="notify" onClick="openAieMasterPopUp('LINER_POPLIST',this);notifyKeyIn();"></button>
								 </td>
							</tr>
							<tr>
								<td colspan="2">
									<img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('SAC', 'A', 'O', 'M')"><bean:message key="Same_As_Consignee"/></a>&nbsp;<!-- 
								 --><img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('CNEE', 'A', 'O', 'M')"><bean:message key="Copy"/></a>
								 </td>
							</tr>
							<tr>
								<td colspan="2"><textarea name="ntfy_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address');notifyKeyIn();" WRAP="off">
<bean:write name="hblVO" property="ntfy_trdp_addr" filter="false"/></textarea></td>
							</tr>
							<tr>
								<td colspan="2">&nbsp;&nbsp;&nbsp;<bean:message key="Display_NOTIFY_on_MAWB"/> <input type="checkBox" name="disp_ntfy_flg" value="<bean:write name="hblVO" property="disp_ntfy_flg"/>" onclick="flgChange(this);displayChange();" tabindex="16"></td>
							</tr>							
						</tbody>
					</table>
					<table>
						<tr>
							<th width="100px"><a href="javascript:clearBlPrnr('P03');"><bean:message key="Triangle_Agent"/></a></th>
							<td>
								<input type="text"   name="prnr_trdp_cd2" maxlength="20"  value='<bean:write name="hblVO" property="prnr_trdp_cd2"/>' onKeyDown="codeNameAction('trdpCode_partner2',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner2',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" id="partner2"  onClick="openAieMasterPopUp('LINER_POPLIST',this)"></button><!-- 
							 --><input type="text"   name="prnr_trdp_nm2" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm2"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:calc(100% - 85px);" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST', document.getElementById('partner2'), frm1.prnr_trdp_nm2.value);}">
							 	<input type="hidden" name="prnr_trdp_addr2" value='<bean:write name="hblVO" property="prnr_trdp_addr2"/>'>
							 </td>
						</tr>
					</table>
				</div>
				<div class="opus_design_inquiry" >
			    	<h3 class="title_design"><bean:message key="Contribution"/></h3>	
				    	<table>
				    		<colgroup>
				    			<col width="137px" />
				    			<col width="90px" />
				    			<col width="100px" />
				    			<col width="*" />
				    		</colgroup>
				    		<tbody>
								<tr>
									<th><bean:message key="Contrib_Office"/></th>
		                             <td>
		                                 <input type="text"   name="ctrb_ofc_cd" value='<bean:write name="hblVO" property="ctrb_ofc_cd"/>' class="search_form" onKeyDown="codeNameAction('officeCd_ctrbOfc',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('officeCd_ctrbOfc',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
		                                    --><button type="button" name="ctrbOfc" id="ctrbOfc" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('OFFICE_GRID_POPLIST',this)"></button>
		                             </td>
									<th><bean:message key="Use_Ratio"/></th>
									<td>
										<input type="checkBox" name="ctrb_ratio_yn" id="ctrb_ratio_yn" value="<bean:write name="hblVO" property="ctrb_ratio_yn"/>" onclick="flgChange(this);frm1.ctrb_mgn.value = '';">
										<input type="text" name="ctrb_mgn" value="<bean:write name="hblVO" property="ctrb_mgn"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,20,2);chkComma(this,20,2);" onBlur="checkRatioValid();" maxlength="23" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;">
									</td>
				    			</tr>
				    			<tr>
				    				<th><bean:message key="Contrib_Dept"/></th>
									<td>
										<bean:define id="ctrbDeptList" name="valMap" property="ctrbDeptList"/>
		                                <html:select name="hblVO" property="ctrb_dept_cd" styleClass="search_form" style="width:100px;">
		                                    <option value=""></option>
		                                    <html:options collection="ctrbDeptList" property="cd_val" labelProperty="cd_nm"/>
		                                </html:select>
									</td>
								</tr>
				    		</tbody>
				    	</table>
				    </div>
				</div>
				
				<div class="layout_vertical_3 sm mar_left_4" style="height:630px;" id="layoutVertical2">
				<div class="opus_design_inquiry">
					<h3 style="margin-bottom:0" class="title_design"><bean:message key="Flight_Info"/></h3>
                    <table>
                    	<tr>
                            <th width="105px"><bean:message key="Airline"/></th>
                            <td>
                            	<input type="text"   name="lnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_exp_air_carr',this, 'onKeyDown')" onblur="codeNameAction('trdpCode_exp_air_carr',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
                             --><button type="button" class="input_seach_btn" tabindex="-1" id="liner" onClick="openAieMasterPopUp('LINER_POPLIST_AIR_M',this)"></button><!-- 
                             --><input type="text"   name="lnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST_AIR_M', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}">
                             	<input type="hidden" name="obrd_dt_tm"  value='<wrt:write name="hblVO" property="obrd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>' class="search_form" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" dataformat="excepthan" style="ime-mode:disabled;width:140px;">
                             </td>
                        </tr>
                        <tr>
                            <th><bean:message key="Flight_No"/></th>
                            <td><input type="text" name="flt_no"      value='<bean:write name="hblVO" property="flt_no"/>'   onblur="strToUpper(this)"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;text-transform:uppercase;" maxlength="20"></td>
                        </tr>
                    </table>
					<table>
						<tr>
							<th width="105px"><bean:message key="Flight_Date"/></th>
							<td width="98px"><!-- 
							 --><input required type="text" name="etd_dt_tm" id="etd_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Flight Date');"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" id="etd_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.etd_dt_tm);"></button><!-- 
							 --></td>
							<th width="30px"><bean:message key="Time"/></th>
							<td><input type="text" name="etd_tm" value='<wrt:write name="hblVO" property="etd_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="num" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
						</tr>
						<tr>
							<th><bean:message key="Arrival_Date"/></th>
							<td><!-- 
							 --><input type="text" name="eta_dt_tm" id="eta_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Arrival Date');"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" id="eta_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.eta_dt_tm);"></button><!-- 
							 --></td>
							<th><bean:message key="Time"/></th>
							<td><input type="text" name="eta_tm" value='<wrt:write name="hblVO" property="eta_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="num" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
						</tr>
					</table>
					<table>
                    	<tr>
                            <th width="105px"><a href="javascript:clearBlPrnr('I01');"><bean:message key="Issuing_Carrier"/></a></th>
                            <td>
								<input type="text" name="iss_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="iss_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_iss',this, 'onKeyDown');" onBlur="strToUpper(this);codeNameAction('trdpCode_iss',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
                             --><button type="button" class="input_seach_btn" tabindex="-1" id="iss" onClick="openAieMasterPopUp('LINER_POPLIST',this);"></button><!-- 
                             --><input type="text"   name="iss_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="iss_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST', document.getElementById('iss'), frm1.iss_trdp_nm.value);}">
                             	<input type="hidden" name="iss_trdp_addr" value='<bean:write name="hblVO" property="iss_trdp_addr"/>'>
                             </td>
                        </tr>
						<tr>
							<th><bean:message key="Billing_Carrier"/></th>
							<td>
								<input type="text"   name="carr_trdp_cd" value='<bean:write name="hblVO" property="carr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_carr',this, 'onKeyDown');"  onblur="strToUpper(this); codeNameAction('trdpCode_carr',this, 'onKeyDown');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" maxlength="20;" onKeyPress="ComKeyOnlyAlphabet('uppernum');"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" id="carr"  onClick="openAieMasterPopUp('LINER_POPLIST',this)"></button><!-- 
							 --><input type="text"   name="carr_trdp_nm" value='<bean:write name="hblVO" property="carr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST', document.getElementById('carr'), frm1.carr_trdp_nm.value);}" maxlength="50">
							 	<input type="hidden" name="carr_trdp_addr" value='<bean:write name="hblVO" property="carr_trdp_addr"/>'>
							 </td>
						</tr>
					</table>
					<h3 style="margin-bottom:0" class="title_design mar_top_8"><bean:message key="Route"/></h3>
					<table>
						<tr>
							<th width="105px" nowrap class="table_search_head_r"><bean:message key="Departure"/></th>
							<td>
								<input required type="text"   name="pol_cd" maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_pol',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" class="search_form"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" id="pol" onClick="openAieMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
							 --><input type="hidden" name="pol_nod_cd" value='<bean:write name="hblVO" property="pol_nod_cd"/>' ><!-- 
							 --><input required type="text" name="pol_nm" maxlength="50" value='<bean:write name="hblVO" property="pol_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}">
							 </td>
						</tr>
						<tr>
							<th><bean:message key="First_To"/></th>
							<td>
								<input type="text" name="fst_to_cd" maxlength="5" value='<bean:write name="hblVO" property="fst_to_cd"/>' onKeyDown="codeNameAction('Location_fst',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_fst',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" class="search_form"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" id="fst" onClick="openAieMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
							 --><input type="text" name="fst_to_nm" maxlength="50" value='<bean:write name="hblVO" property="fst_to_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('fst'), frm1.fst_to_nm.value);}">
							 </td>
						</tr>
                        <tr>
                             <th><bean:message key="Trans_1"/></th>
                             <td>
                             	<input type="text" name="ts1_port_cd" maxlength="5" value='<bean:write name="hblVO" property="ts1_port_cd"/>' onKeyDown="codeNameAction('Location_ts1',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_ts1',this, 'onBlur','A')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
                              --><button type="button" class="input_seach_btn" tabindex="-1" id="ts1" onClick="openAieMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                              --><input type="text" name="ts1_flt_no"  value='<bean:write name="hblVO" property="ts1_flt_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" maxlength="15" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('ts1'), frm1.ts1_flt_no.value);}">
                              </td>
                         </tr>
                         <tr>
                             <th><bean:message key="Trans_2"/></th>
                             <td>
                             	<input type="text" name="ts2_port_cd" maxlength="5" value='<bean:write name="hblVO" property="ts2_port_cd"/>' onKeyDown="codeNameAction('Location_ts2',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_ts2',this, 'onBlur','A')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
                              --><button type="button" class="input_seach_btn" tabindex="-1" id="ts2" onClick="openAieMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                              --><input type="text" name="ts2_flt_no"  value='<bean:write name="hblVO" property="ts2_flt_no"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" maxlength="15" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('ts2'), frm1.ts2_flt_no.value);}">
                              </td>
                         </tr>
                         <tr>
                             <th><bean:message key="Trans_3"/></th>
                             <td>
                             	<input type="text" name="ts3_port_cd" maxlength="5" value='<bean:write name="hblVO" property="ts3_port_cd"/>' onKeyDown="codeNameAction('Location_ts3',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_ts3',this, 'onBlur','A')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
                              --><button type="button" class="input_seach_btn" tabindex="-1" id="ts3" onClick="openAieMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                              --><input type="text" name="ts3_flt_no"  value='<bean:write name="hblVO" property="ts3_flt_no"/>'  class="search_form" style="width:130px;text-transform:uppercase;" maxlength="15" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('ts3'), frm1.ts3_flt_no.value);}">
                              </td>
                         </tr>
						<tr>
							<th><bean:message key="Destination"/></th>
							<td>
								<input required type="text"   name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' onKeyDown="codeNameAction('Location_air_des',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_air_des',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" class="search_form" ><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" id="air_des" onClick="openAieMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
							 --><input type="hidden" name="pod_nod_cd"     value='<bean:write name="hblVO" property="pod_nod_cd"/>'><!-- 
							 --><input required type="text"   name="pod_nm"   maxlength="50"   value='<bean:write name="hblVO" property="pod_nm"/>'     class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('air_des'), frm1.pod_nm.value);}">
							 </td>
						</tr>
					</table>
					<table>
                    	<tr>
                            <th width="105px"><bean:message key="IATA_Code"/></th>
                            <td width="60px"><input type="text" name="iata_cd" maxlength="20" value='<bean:write name="hblVO" property="iata_cd"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"></td>
                            <th width="63px" nowrap class="table_search_head"><bean:message key="Acct_No"/></th>
                            <td><input type="text" name="mm_txt" maxlength="50" value='<bean:write name="hblVO" property="mm_txt"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:88px;"></td>
	                    </tr>
                    </table>
                                      
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <th width="105px"><bean:message key="Cargo_Type"/></th>
							<td> 
							 <bean:define id="cargoTpCdList" name="valMap" property="cargoTpCdList"/> 
							 <html:select name="hblVO" property="cargo_tp_cd" styleClass="search_form" style="width:233px;" onchange="cargoDesc();"> 
							 	<html:options collection="cargoTpCdList" property="cd_val" labelProperty="cd_nm"/> 
							 </html:select> 
							 </td>
                            </tr>
                            <tr>
                            	<th><bean:message key="Rate"/></th>
								<td> 
								 <bean:define id="rateClssCdList" name="valMap" property="rateClssCdList"/> 
								 <html:select name="hblVO" property="rt_clss_cd" styleClass="search_form" style="width:233px;"> 
								 	<option value=""></option> 
								     <html:options collection="rateClssCdList" property="cd_val" labelProperty="cd_nm"/> 
								 </html:select> 
								 </td>
                          </tr>
                      </table>
                      <h3 style="margin-bottom:0" class="title_design mar_top_8"><bean:message key="Management"/></h3>
                      <table>
                          <tr>
                              <th width="105px"><bean:message key="Date_issued"/></th>
                              <td width="100px">
                                  <input type="text" name="bl_iss_dt" id="bl_iss_dt" value="<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Date Issued');" dataformat="excepthan" style="ime-mode:disabled;width:70px;">
                                  <button type="button" class="calendar" tabindex="-1" id="bl_iss_dt_cal" onclick="doDisplay('DATE1' ,frm1.bl_iss_dt);"></button>
                              </td>
                              <th width="70px"><bean:message key="Issued_By"/></th>
                              <td>
                              	  <input type="text" name="opr_usrid"   value="<bean:write name="hblVO" property="issued_by"/>" class="search_form-disable" readOnly style="width:60px;"><!-- 
                               --><button type="button" class="input_seach_btn" tabindex="-1" id="oprBtn" onClick="openAieMasterPopUp('OPR_POPLIST',this)"></button><!-- 
                               --><input type="hidden" name="opr_usrnm"   value="<bean:write name="hblVO" property="proc_usrnm"/>"><!-- 
                               --><input type="hidden" name="opr_ofc_cd"  value="<bean:write name="hblVO" property="proc_ofccd"/>"><!-- 
                               --><input type="hidden" name="opr_dept_cd" value="<bean:write name="hblVO" property="proc_dept_cd"/>">
                               </td>
                          </tr>
                     </table>
				</div>
				</div>
				
				<div class="layout_vertical_3 sm mar_left_4" style="height:630px; width:calc(34% - 8px)" id="layoutVertical3">
				<div class="opus_design_inquiry" >
					<h3 style="margin-bottom:0" class="title_design"><bean:message key="Account_Information"/></h3>
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <th width="93px"><bean:message key="Commodity"/></th>
                            <td><!-- 
                             --><input type="text" name="rep_cmdt_cd" maxlength="13" value="<bean:write name="hblVO" property="rep_cmdt_cd"/>" class="search_form" onKeyDown="codeNameAction('commodity',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('commodity',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:62px;"><!-- 
                             --><button type="button" class="input_seach_btn" tabindex="-1" id="commodity" onClick="openAieMasterPopUp('COMMODITY_POPLIST',this)"></button><!-- 
                             --><input type="text" name="rep_cmdt_nm" value="<bean:write name="hblVO" property="rep_cmdt_nm"/>" maxlength="100" class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:119px;" onchange="" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('COMMODITY_POPLIST', this);}">
                             </td>
                        </tr>
						<tr>
							<th><bean:message key="Package"/></th>
							<td> 
							 <input type="text" name="pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" maxlength="7"  class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right"><!--
							 --><bean:define id="pckList" name="valMap" property="pckCdList"/><!--
							 --><html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:125px;"> 
							 	<option value=""></option> 
							 	<html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/> 
							 </html:select> 
							 </td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<th width="145px"><bean:message key="GWeight"/></th>
							<td><!-- 
							 --><input type="text" name="grs_wgt" value="<bean:write name="hblVO" property="grs_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="grs_wgt_ut_cd" value="K" style="width:33px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							 --><input type="text" name="grs_wgt1" value="<bean:write name="hblVO" property="grs_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="grs_wgt_ut_cd1" value="L" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
							 --></td>
						</tr>
						<tr>
							<th><bean:message key="Chargeable_Weight"/></th>
							<td><!-- 
							 --><input type="text" name="chg_wgt" value="<bean:write name="hblVO" property="chg_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="chg_wgt_ut_cd" value="K" style="width:33px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							 --><input type="text" name="chg_wgt1" value="<bean:write name="hblVO" property="chg_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="chg_wgt_ut_cd1" value="L" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
							 --></td>
						</tr>
						<tr>
							<th><bean:message key="BL_Gross_Weight"/></th>
							<td><!-- 
							 --><input type="text" name="bl_grs_wgt" value="<bean:write name="hblVO" property="bl_grs_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="bl_grs_wgt_ut_cd" value="K" style="width:33px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							 --><input type="text" name="bl_grs_wgt1" value="<bean:write name="hblVO" property="bl_grs_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="bl_grs_wgt_ut_cd1" value="L" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
							 --></td>
						</tr>
						<tr>
							<th><bean:message key="BL_Chargeable_Weight"/></th>
							<td><!-- 
							 --><input type="text" name="bl_chg_wgt" value="<bean:write name="hblVO" property="bl_chg_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="bl_chg_wgt_ut_cd" value="K" style="width:33px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							 --><input type="text" name="bl_chg_wgt1" value="<bean:write name="hblVO" property="bl_chg_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="bl_chg_wgt_ut_cd1" value="L" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
							 --></td>
						</tr>
					</table>
					<table border="0" cellpadding="0" cellspacing="0">
						<tr>
							<th width="145px"><bean:message key="Volume_Weight"/></th>
							<td width="60px"><input type="text" name="vol_wgt" value="<bean:write name="hblVO" property="vol_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);weightChange(this);" maxlength="13" class="search_form" zero_remove dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;"></td>
							<th width="30px" nowrap class="table_search_head"><bean:message key="CBM"/></th>
							<td><!-- 
							 --><input type="text" name="vol_meas" value="<bean:write name="hblVO" property="vol_meas"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,6);chkComma(this,8,6);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;"><!-- 
							 --><input type="hidden" name="h_vol_meas" value="<bean:write name="hblVO" property="vol_meas"/>" maxlength="200" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:155px;"><!-- 
							 --><button type="button" class="btn_etc" onclick="sumHblValue();"><bean:message key="Sum"/></button><!-- 
							 --></td>
						</tr>
					</table>
					<table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                           <th width="145px"><bean:message key="Tariff_Currency_Code"/></th>
                           <td> 
                            <bean:define id="currCdList" name="valMap" property="currCdList"/> 
                            <html:select name="hblVO" property="curr_cd" styleClass="search_form" style="width:65px;"> 
                            		<html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/> 
                            </html:select> 
                            <input type="hidden" name="h_curr_cd" value="<bean:write name="hblVO" property="curr_cd"/>"> 
                            </td>
                         </tr>
                    </table>
                    <!-- opus_design_grid(S) -->
					<div class="opus_design_grid">
						<input type="hidden" name="size_ut_cd1" value="<bean:write name="hblVO" property="size_ut_cd"/>"/>
						<table>
							<tr>
							   <td width="50px"><input type="radio" name="size_ut_cd" id="size_ut_cd2" value="CM" onClick="javascript:chkSizeType();"><label for="size_ut_cd2"><bean:message key="Cm"/></label></td>
						   	   <td width="50px"><input type="radio" name="size_ut_cd" id="size_ut_cd3" value="INCH" onClick="javascript:chkSizeType();" checked><label for="size_ut_cd3"><bean:message key="Inch"/></label></td>
						   	   <td> 
						   	   		 <div class="opus_design_btn"> 
						   	   		    <button type="button" class="btn_accent" onClick="setSizeUp(docObjects[5], 350);document.getElementById('layoutVertical1').style.height = '850px';document.getElementById('layoutVertical2').style.height = '850px';document.getElementById('layoutVertical3').style.height = '850px' "><bean:message key="Plus"/></button> 
						   	   		    <button type="button" class="btn_accent" onClick="setSizeDown(docObjects[5], 150);;document.getElementById('layoutVertical1').style.height = '630px';document.getElementById('layoutVertical2').style.height = '630px';document.getElementById('layoutVertical3').style.height = '630px'"><bean:message key="Minus"/></button> 
							   	    	<button type="button" class="btn_accent" onClick="javascript:gridAdd(5);"><bean:message key="Add"/></button> 
							   	    </div>
						   	    </td>
							</tr>
						</table>
				   	    
						<script type="text/javascript">comSheetObject('sheet4');</script>
					</div>
                    <table border="0" cellpadding="0" cellspacing="0">
                    	<tr>
                    		<th width="113px"><bean:message key="Freight_Term"/></th>
                            <td width="100px"> 
                             <bean:define id="frtList" name="valMap" property="frtCdList"/> 
                             <html:select name="hblVO" property="frt_term_cd" styleClass="search_form" style="width:94px;"> 
                                 <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/> 
                             </html:select> 
                             </td>
                            <th width="90px"><bean:message key="Other_Charge"/></th>
                            <td> 
                             <bean:define id="frtList" name="valMap" property="frtCdList"/> 
                             <html:select name="hblVO" property="otr_chg_term_cd" styleClass="search_form" style="width:94px;"> 
                                 <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/> 
                             </html:select> 
                             </td>
                    	</tr>
                        <tr>
                            <th><bean:message key="DV_Carriage"/></th>
                            <td><input type="text" name="decl_crr_val" maxlength="50"  value='<bean:write name="hblVO" property="decl_crr_val"/>' class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:94px;"></td>
                            <th><bean:message key="DV_Customs"/></th>
                            <td><input type="text" name="decl_cstms_val" maxlength="50"  value='<bean:write name="hblVO" property="decl_cstms_val"/>' onBlur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:94px;"></td>
                         </tr>
                         <tr>
                             <th><bean:message key="Insurance"/></th>
                             <td colspan="2"><input type="text" name="amt_insur_val" maxlength="50" value='<bean:write name="hblVO" property="amt_insur_val"/>' class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:94px;"></td>
                         </tr>
                   </table>   
				   <table border="0" cellpadding="0" cellspacing="0">
					   <tr>
					      <th width="113px"><bean:message key="Carriers_Spot_No"/></th>
					      <td><input type="text" name="spot_no" maxlength="40" value='<bean:write name="hblVO" property="spot_no"/>' class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:94px;"></td>
					   </tr>
					</table>
                   <table width="100%" border="0" cellpadding="0" cellspacing="0">
					   <tr>
					      <th width="113px"><bean:message key="Sales_OFC"/></th>
					      <td> 
					      	 <input type="text" name="sls_ofc_cd" value="<bean:write name="hblVO" property="sls_ofc_cd"/>" class="search_form-disable" style="width:94px;" readonly><!-- 
					       --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openAieMasterPopUp('OFFICE_GRID_POPLIST',this)"></button><!-- 
					       --></td>
					   </tr>
					   <tr>
					   	   <th><bean:message key="Sales_PIC"/></th>
					       <td><!-- 
					       --><input type="text"   name="sls_usrid"  value="<bean:write name="hblVO" property="sls_usrid"/>"  class="search_form-disable" style="width:94px;" readOnly><!-- 
					       --><button type="button" class="input_seach_btn" tabindex="-1" id="salesperson" onClick="openAieMasterPopUp('USER_POPLIST',this)"></button><!-- 
					       --><input type="hidden" name="sls_usr_nm" value="<bean:write name="hblVO" property="sls_usr_nm"/>" class="search_form-disable" style="width:120px;" readOnly><!-- 
					       --><input type="hidden" name="sls_dept_cd" value="<bean:write name="hblVO" property="sls_dept_cd"/>"><!-- 
					       --></td>
					    </tr>
					</table>
				</div>
				</div>
			</div>
			<h3 class="title_design mar_top_8" ><bean:message key="House_BL_List"/></h3>
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet2');</script>
			</div>
		</div>
		
		<div name="tabLayer" id="tabLayer" style="display: none;">
		<div class= "opus_design_inquiry sm">
			<div class="layout_wrap">
    			<div class="layout_vertical_2 sm"  style="width:519px">
					<table>
						<tr>
							<td><h3 class="title_design"><bean:message key="Handling_Information"/></h3></td>
							<td align="right">
								<span id="tdCertiHndlInfo" style="display:none;">
									<bean:define id="certiHndlInfoList" name="valMap" property="certiHndlInfoList"/>
	                                <html:select name="hblVO" property="certi_hndl_info" styleClass="search_form" style="width:200px;" onchange="setCertiHndlInfo();">
	                                    <option value=""></option>
	                                    <html:options collection="certiHndlInfoList" property="cd_val" labelProperty="cd_nm"/>
	                                </html:select>
	                                <input type="hidden" name="h_certi_hndl_info" value="<bean:write name="hblVO" property="certi_hndl_info"/>">
                                </span>
							</td>
						<tr>
					</table>
					<textarea name="hndl_info_txt" cols="80" rows="5" maxlength="500" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width: 500px;"  WRAP="off">
<bean:write name="hblVO" property="hndl_info_txt" filter="false"/></textarea>
    			</div>
    			<div class="layout_vertical_2 sm mar_left_8" style="width:530px">
					<h3 class="title_design" style="height: 20px"><bean:message key="Account_Info"/></h3>
					<textarea name="acctg_info_txt" cols="80" rows="5" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width: 500px;" WRAP="off">
<bean:write name="hblVO" property="acctg_info_txt" filter="false"/></textarea>
    			</div>
    		</div>
    		<div class="layout_wrap">
    			<div class="layout_vertical_2 sm mar_top_8" style="width:280px">
    				<h3 style="margin-bottom:0" class="title_design"><bean:message key="Mark"/></h3>
    				<div class="opus_design_btn">
    					<button type="button" class="btn_etc" id="addAuto" onclick="addInst();" style="cursor:hand;display:none;"><bean:message key="Add_Instruction"/></button>
    				</div>
    				<textarea name="mk_txt" rows="16" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,15,rider_ocean, 'A');keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:100%;" WRAP="off">
<bean:write name="hblVO" property="mk_txt" filter="false"/></textarea>
    			</div>
    			<div class="layout_vertical_2 sm mar_top_8 pad_left_8" style="width:430px">
    				<h3 style="margin-bottom:0" class="title_design"><bean:message key="Nature_and_Quantity_of_Goods"/></h3>
    				<input tabindex="-1" type="hidden" name="rider_lbl" value="" style="text-align:right;width:90;border:0;background-color:transparent;"/>
    				<div class="opus_design_btn">
    					<button type="button" class="btn_etc" id="addAuto" onclick="addInst();" style="cursor:hand;display:none;"><bean:message key="Add_Instruction"/></button>
    				</div>
    				<textarea name="desc_txt" rows="16" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,15,rider_ocean, 'A');keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:100%;" WRAP="off">
<bean:write name="hblVO" property="desc_txt" filter="false"/></textarea>
    			</div>
    			<div style="float: left;">
    				<img src="<%=CLT_PATH%>/web/img/main/overlimit.gif" style="display:none"width="29" height="29" border="0" id="rider_ocean" valign="top">
    			</div>
    		</div>
    		<div class="opus_design_inquiry sm mar_top_8" style="width:1068px;">
	    		<table border="0" cellpadding="0" cellspacing="0">
					<tr>
						<th width="140px"><bean:message key="Show_Dimension_on"/></th>
			      		<td><!-- 
			      		 --><button type="button" class="btn_etc" name="mk_dim" onClick="searchDim('MK_DIM', this)"><bean:message key="Mark"/></button><!-- 
			      		 --><button type="button" class="btn_etc" name="desc_dim" onClick="searchDim('DESC_DIM', this)"><bean:message key="Description"/></button><!-- 
			      		 --></td>
					</tr>
				</table>
				<table border="0" cellpadding="0" cellspacing="0">
					<tr>
						<th width="140px"><bean:message key="Show_Weight_on_BL_as"/></th>
			      		<td> 
			      		 <bean:define id="wgtDispCdList" name="valMap" property="wgtDispCdList"/> 
			      		 <html:select name="hblVO" property="wgt_disp_cd" styleClass="search_form" style="width:117px;"> 
			      		 	<html:options collection="wgtDispCdList" property="cd_val" labelProperty="cd_nm"/> 
			      		 </html:select> 
			      		 <input type="hidden" name="h_wgt_disp_cd" value="<bean:write name="hblVO" property="wgt_disp_cd"/>">
			      		 </td>
					</tr>
				</table>
			</div>
		</div>
		</div>
		<div name="tabLayer" id="tabLayer" style="display: none;">
			<div class="opus_design_grid">
				<h3 style="margin-bottom:0" class="title_design"><bean:message key="MAWB_Printed_Rate_Air_Freight"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
					<button type="button" class="btn_accent" onClick="setFrtAdd();"><bean:message key="Default"/></button><!-- 
				 --><button type="button" class="btn_normal" onClick="doWork('AIR_FRT_ADD');"><bean:message key="Add"/></button>		
				</div>
				<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet5');</script>
			</div>
			<div class="opus_design_grid">
				<h3 style="margin-bottom:0" class="title_design"><bean:message key="MAWB_Printed_Rate_Other_Charge"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
					<button type="button" class="btn_normal" onClick="doWork('OTH_FRT_ADD');"><bean:message key="Add"/></button>		
				</div>
				<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet6');</script>
			</div>
		</div>
		<div name="tabLayer" id="tabLayer" style="display: none;">
			<script>
		var dfPerfCurr = 'KRW';
	</script>
	<%
		boolean sdIns = true;
		boolean sdInsDisp = true;
		boolean bcIns = true;
		boolean bcInsDisp = true;
		String to_rt_ut = "";
		String trf_cur_cd = "";   //Invoice Currency
	%>
	<!--Selling/Debit-->
	<logic:notEmpty name="valMap" property="SFRT">
	    <bean:define id="sellCnfCk" name="valMap" property="SFRT"/>
	    <logic:equal name="sellCnfCk" property="flg" value="Y">
	        <% sdIns = false; %>
	    </logic:equal>
	
	    <logic:equal name="sellCnfCk" property="invflg" value="Y">
	        <% sdInsDisp = false; %>
	    </logic:equal>
	</logic:notEmpty>
	
	<!--Buying/Crebit-->
	<logic:notEmpty name="valMap" property="BFRT">
	    <bean:define id="buyCnfCk" name="valMap" property="BFRT"/>
	    <logic:equal name="buyCnfCk" property="flg" value="Y">
	        <% bcIns = false; %>
	    </logic:equal>
	    
	    <logic:equal name="buyCnfCk" property="invflg" value="Y">
	        <% bcInsDisp = false; %>
	    </logic:equal>
	</logic:notEmpty>
	
	<!-- Currency 조회 -->
	<logic:notEmpty name="valMap" property="OfcCurrency">
		<bean:define id="curMap" name="valMap" property="OfcCurrency"/>
		<%  HashMap tmpMap = (HashMap)curMap;
			ofc_curr   = (String)tmpMap.get("ofccurr_cd");
			trf_cur_cd = (String)tmpMap.get("trf_cur_cd");
			to_rt_ut   = (String)tmpMap.get("to_rt_ut");
		%>
	</logic:notEmpty>
	<script>
		var obdtCur = '<%=to_rt_ut%>';
	</script>

	<input type="hidden" name="f_ofc_cnt_cd"   value="">
	<input type="hidden" name="hid_act_cnt_cd" value="">
	
	<input type="hidden" name="ppdOrgCurr"     value="">
	<input type="hidden" name="ofc_curr"       value="<%=ofc_curr%>">
    <input type="hidden" name="trf_cur_cd"     value="<%=trf_cur_cd%>">
    <input type="hidden" name="xcrtDt"         value="<bean:write name="hblVO" property="obrd_dt_tm"/>">

	<input type="hidden" name="cctOrgCurr"     value="">
	<input type="hidden" name="objPfx"         value="">
	<input type="hidden" name="curRow2"        value="">

	<input type="hidden" name="ppdToCurrency" value="<%=partner_curr%>">
	<input type="hidden" name="ppdOrgCurr"    value="<%=partner_curr%>">

    <!--Invoice추가-->    
    <input type="hidden" name="tax_bil_flg"  value="">  
    <input type="hidden" name="inv_dt"       value="">
    <input type="hidden" name="inv_due_dt"   value="">  
    <input type="hidden" name="inv_rmk"      value="">  
    <input type="hidden" name="buy_inv_no"   value=""> 
    		<div class="opus_design_grid">
				<h3 style="margin-bottom:0" class="title_design"><bean:message key="Account_Receivable"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn" >
				    <div class="grid_option_left">
						<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[6], 'frtTableS')"><bean:message key="Plus"/></button>
				 		<button type="button" class="btn_normal" onClick="setFrtSizeDown(docObjects[6], 'frtTableS')"><bean:message key="Minus"/></button>
				   	</div>
				    <div id="sdBtns"  class="grid_option_left" style="display:none;"><!-- 
				 	--><button type="button" class="btn_normal" onClick="goToInvoice(docObjects[6], 'LOCAL')"><bean:message key="B.AR"/></button><!-- 
				 	--><button type="button" class="btn_normal" onClick="goToInvoiceModify('LOCAL')"><bean:message key="Invoice"/></button><!-- 
				 	--><button type="button" class="btn_normal" onClick="setDfltFrt('', 'A', 'O', 'M')"><bean:message key="Default"/> <bean:message key="New"/></button><!-- 
				 	--><button type="button" class="btn_normal" onclick="frtRowAdd('ROWADD', docObjects[6], 'A', 'O', 'M');"><bean:message key="Add"/></button>		
					</div>
				</div>
				<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet7');</script>
			</div>
    		<div class="opus_design_grid">
				<h3 style="margin-bottom:0" class="title_design"><bean:message key="Debit_Credit"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
					<div class="grid_option_left">
						<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[8], 'frtTableDC')"><bean:message key="Plus"/></button> 
						<button type="button" class="btn_normal" onClick="setFrtSizeDown(docObjects[8], 'frtTableDC')"><bean:message key="Minus"/></button>
				    </div>
				 	<div id="dcBtns" class="grid_option_left" style="display:none;"><!-- 
				 	--><button type="button" class="btn_normal" onClick="goToInvoice(docObjects[8], 'DC')"><bean:message key="B.DC"/></button><!-- 
				 	--><button type="button" class="btn_normal" onClick="goToInvoiceModify('DC')"><bean:message key="Invoice"/></button><!-- 
				 	--><button type="button" class="btn_normal" onClick="setDfltFrt('dc_', 'A', 'O', 'M')"><bean:message key="Default"/> <bean:message key="New"/></button><!-- 
				 	--><button type="button" class="btn_normal" onclick="frtRowAdd('DCROWADD', docObjects[8], 'A', 'O', 'M');"><bean:message key="Add"/></button>		
					</div>
				</div>
				<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet9');</script>
			</div>
    		<div class="opus_design_grid">
				<h3 style="margin-bottom:0" class="title_design"><bean:message key="Account_Payable"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
					<div class="grid_option_left">
						<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[7], 'frtTableB')"><bean:message key="Plus"/></button>
				 		<button type="button" class="btn_normal" onClick="setFrtSizeDown(docObjects[7], 'frtTableB')"><bean:message key="Minus"/></button>
				 	</div>
				 	<div class="grid_option_left" id="bcBtns" style="display:none;"><!-- 
				 	--><button type="button" class="btn_normal" onClick="goToInvoice(docObjects[7], 'AP')"><bean:message key="B.AP"/></button><!-- 
				 	--><button type="button" class="btn_normal" onClick="goToInvoiceModify('AP')"><bean:message key="Invoice"/></button><!-- 
				 	--><button type="button" class="btn_normal" onClick="setDfltFrt('b_', 'A', 'O', 'M')"><bean:message key="Default"/> <bean:message key="New"/></button><!-- 
				 	--><button type="button" class="btn_normal" onclick="frtRowAdd('BCROWADD', docObjects[7], 'A', 'O', 'M');"><bean:message key="Add"/></button>		
					</div>
				</div>
				<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet8');</script>
			</div>
		</div>
		<div name="tabLayer" id="tabLayer" style="display: none;">
			<div class="opus_design_grid">
				<h3 class="title_design mar_btm_8"><bean:message key="WorkOrder"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
					<button type="button" class="btn_accent" id="goWoObj" onClick="doWork('WORKORDER')"  style="display:none;"><bean:message key="WorkOrder"/></button>
				</div>
				<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet12');</script>
			</div>
		</div>
		<div name="tabLayer" id="tabLayer" style="display: none;">
			<div class="opus_design_grid">
				<h3 class="title_design"><bean:message key="Shipping_Document"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
					<button type="button" class="btn_accent" id="emlSnd" onClick="doWork('SNDEML')" style="display:none;"><bean:message key="Email"/></button><!-- 
				 --><button type="button" class="btn_normal" id="sDoc" btnAuth="S_DOC" onClick="doWork('S_DOC');" style="display:none;"><bean:message key="Print"/></button><!-- 
				 --><button type="button" class="btn_normal" id="fileUp" onClick="doWork('DOCFILE')" style="display:none;"><bean:message key="Upload"/></button>
				</div>
				<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet3');</script>
			</div>
		</div>
		<div name="tabLayer" id="tabLayer">
			<h3 class="title_design"><bean:message key="History_Search"/></h3>
			<div class="opus_design_grid">
				<script type="text/javascript">comSheetObject('sheet11');</script>
			</div>
		</div>
	</div>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" value=""/>
    <input type="hidden" name="intg_bl_seq" value=""/>
    <input type="hidden" name="docType" value=""/>
</form>

<script type="text/javascript">
fnbtnCtl();
</script>	