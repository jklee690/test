<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIE_BMD_0120.jsp
*@FileTitle  : A.E.S 등록
*@Description: A.E.S 등록 및 조회
*@author     : PJK
*@version    : 1.0 - 12/12/2011
*@since      :

*@Change history:
=========================================================
--%>
<%@page import="com.clt.apps.fis.mdm.mcm.office.dto.OfcVO"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@page import="com.clt.framework.core.layer.event.EventResponse"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    
    <% boolean isBegin = false; %>
    
    <bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    
    <link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>

    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/aie/bmd/housebl/script/AIE_BMD_0120.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js"></script>
	
	<script type="text/javascript">

		//<bean:message key="License_Type"/>의 내용을 배열에 저장
		var licenseTpArr = new Array();
		<logic:iterate id="licenseTp" name="valMap" property="licenseTpList">
			licenseTpArr.push("<bean:write name="licenseTp" property="cd_nm"/>");
		</logic:iterate>

		//DDTC USML Category의 내용을 배열에 저장
		var ddtcUsmlCdArr = new Array();
		ddtcUsmlCdArr.push("");//비어있는 Option 이 있기때문에 index를 맞추기 위함
		<logic:iterate id="ddtcUsmlCd" name="valMap" property="ddtcUsmlCdList">
		ddtcUsmlCdArr.push("<bean:write name="ddtcUsmlCd" property="cd_nm"/>");
		</logic:iterate>

		//DDTC Unit의 내용을 배열에 저장
		var ddtcUnitCdArr = new Array();
		<logic:iterate id="ddtcUtCd" name="valMap" property="ddtcUtCdList">
		ddtcUnitCdArr.push("<bean:write name="ddtcUtCd" property="cd_nm"/>");
		</logic:iterate>

		//Origin Type Code
        var orgTpCd = '';
        var orgTpNm = '';
        <% isBegin = false; %>
        <logic:iterate id="orgTp" name="valMap" property="orgTpList">
            <% if(isBegin){ %>
            	orgTpCd += '|';
            	orgTpNm += '|';
            <% }else{
                  isBegin = true;
               } %>
               orgTpCd += '<bean:write name="orgTp" property="cd_val"/>';
               orgTpNm += '<bean:write name="orgTp" property="cd_nm"/>';
        </logic:iterate>

		//Vehicle ID Type
        var vhcIdTpCd = '';
        var vhcIdTpNm = '';
        <% isBegin = false; %>
        <logic:iterate id="vhcIdTp" name="valMap" property="vhcIdTpList">
            <% if(isBegin){ %>
            	vhcIdTpCd += '|';
            	vhcIdTpNm += '|';
            <% }else{
                  isBegin = true;
               } %>
               vhcIdTpCd += '<bean:write name="vhcIdTp" property="cd_val"/>';
               vhcIdTpNm += '<bean:write name="vhcIdTp" property="cd_nm"/>';
        </logic:iterate>

		function titBlStyle(isDisable){
			var styleStr = 'table_search_head';
			if(isDisable){
				styleStr = 'table_search_head_r';
			}
		
			blShpObj.className = styleStr;
			blConObj.className = styleStr;
		
			blIsDtObj.className = styleStr;
		}
		
		function dispBizBtns(dispTp){
			//bkgCntrObj.style.display = 'none';
		
			//Mark&Decription
			getObj('sadAuto').style.display  = dispTp;
			getObj('addAuto').style.display  = dispTp;
			getObj('mkSayAuto').style.display= dispTp;
			//ediAdd.style.display   = dispTp;

			//Container 탭
			//cnrtPopAdd.style.display = dispTp;
			getObj('cnrtAdd').style.display = dispTp;
			getObj('itmAdd').style.display = dispTp;

			//Freight버튼
			getObj('sdBtns').style.display    = dispTp;
			getObj('bcBtns').style.display    = dispTp;
		}
		function setupPage(){
	    	loadPage();
	    	doHideProcess();
	    }
		var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
	   </script>
<form name="frm1" method="POST" action="./AIE_BMD_0120.clt">
	<input type="hidden" name="f_cmd">
    <input type="hidden" name="f_save_flg" value="<bean:write name="valMap" property="saveFlg"/>">
    <input type="hidden" name="s_rep_cmdt_cd" value="<bean:write name="hblVO" property="rep_cmdt_cd"/>">
    <input type="hidden" name="s_rep_cmdt_nm" value="<bean:write name="hblVO" property="rep_cmdt_nm"/>">
    <input type="hidden" name="s_cmdt_ut1" value="<bean:write name="hblVO" property="cmdt_ut1"/>">
    <input type="hidden" name="s_cmdt_ut2" value="<bean:write name="hblVO" property="cmdt_ut2"/>">
    <input type="hidden" name="s_pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>">
    <input type="hidden" name="s_wgt" value="<bean:write name="hblVO" property="wgt"/>">
    <input type="hidden" name="s_decl_cstms_val" value="<bean:write name="hblVO" property="decl_cstms_val"/>">
    <input type="hidden" name="s_cntr_add_flg" value="<bean:write name="hblVO" property="cntr_add_flg"/>">
    <!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn"><!--
	   --><button type="button" class="btn_accent" onClick="doWork('SEARCHLIST')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!--
	   --><button type="button" class="btn_normal" onClick="doWork('MODIFY')" id="btnModify" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><bean:message key="Save"/></button><!--
	   --><button type="button" class="btn_normal" onClick="doWork('SEND_FORM');" style="display:none;" btnAuth="SEND"><bean:message key="Send"/></button>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<!-- wrap_search (S) -->
	<div class="wrap_search_tab">	
		<div class="opus_design_inquiry">
			<table border="0" cellpadding="0" cellspacing="0">
				<tr>
					<th width="50px"><bean:message key="HAWB_No"/></th>
					<td width="140px"><!-- 
					 --><input required type="text" name="f_bl_no"  maxlength="40" value="<bean:write name="hblVO" property="hbl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiePopUp('AES_HBL_POPLIST',this);}"><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openAiePopUp('AES_HBL_POPLIST',this)"></button></td>
					<td width="400px"></td>
					<%-- 
					<td width="80px"><img src="<%=CLT_PATH%>/web/img/main/aesdirect_01.jpg" width="80px" height="28px" border="0" align="absmiddle"></td>
					<td><!-- 
					 --><table cellpadding="0" cellspacing="0"><!-- 
						 --><tr><!-- 
						 	--><td><a tabindex="-1" href="http://aesdirect.census.gov" target="blank"><span class="body_pop" ><bean:message key="AESDirect_Hompage"/></span></a></td><!-- 
						 --></tr><!-- 
						 --><tr><!-- 
						 	--><td><a tabindex="-1" href="http://aesdirect.census.gov/support/login_help.html" target="blank" ><span class="body_pop"><bean:message key="AESWebLink_Login_Help"/></span></a></td><!-- 
						 --></tr><!-- 
					 --></table></td>--%>				
					<td width="80px"><img src="<%=CLT_PATH%>/web/img/main/ace.png" width="80px" height="48px" border="0" align="absmiddle"></td>
					<td><!-- 
					 --><table cellpadding="0" cellspacing="0"><!-- 
						 --><tr><!-- 
						 	--><td><a tabindex="-1" href="http://www.census.gov/foreign-trade/aes/aesdirect/AESDirect-User-Guide.pdf" target="blank"><span class="body_pop" ><bean:message key="AESDirect_Hompage"/></span></a></td><!-- 
						 --></tr><!-- 
						 --><tr><!-- 
						 	--><td><a tabindex="-1" href="https://ace.cbp.dhs.gov/" target="blank" ><span class="body_pop"><bean:message key="AESWebLink_Login_Help"/></span></a></td><!-- 
						 --></tr><!-- 
					 --></table></td>
					</tr>
				</table>
		</div>
	</div>
	<!-- wrap_search (E) -->
	<!-- wrap_result(S) -->
	<div class="wrap_result_tab">
	    <ul class="opus_design_tab">
	        <li class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="General_Information"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Party_Information"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Export_LicInformation"/></span></a></li>
	    </ul>
	
		<!-- tabLayer1 (S) -->
		<div name="tabLayer" id="tabLayer" style="display: inline;width: 1200px;">
			<%@ include file = "./AIE_BMD_0121.jsp"%>
		</div>
		<!-- tabLayer1 (E) -->
		<!-- tabLayer2 (S) -->
		<div name="tabLayer" id="tabLayer" style="display: none;width: 1200px;">
			<%@ include file = "./AIE_BMD_0122.jsp"%>
		</div>
		<!-- tabLayer2 (E) -->
		<!-- tabLayer3 (S) -->
		<div name="tabLayer" id="tabLayer" style="display:none;width: 1200px;">
			<%@ include file = "./AIE_BMD_0123.jsp"%>
		</div>
		<!-- tabLayer4 (E) -->
	</div>
	<!-- wrap_result(E) -->
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" value=""/>
    <input type="hidden" name="docType" value=""/>
</form>

<script type="text/javascript">
doBtnAuthority(attr_extension);
</script>	
		
<div id="sndLayer" style="display:none"><!--Send Form-->
	<%@ include file = "./AIE_BMD_0124.jsp"%>
</div>