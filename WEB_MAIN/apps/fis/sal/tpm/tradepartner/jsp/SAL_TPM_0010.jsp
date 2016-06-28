<%--
=========================================================
*@FileName   : SAL_TPM_0010.jsp
*@FileTitle  : Trade Partner Management
*@Description: Trade Partner Management
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/07/2009
*@since      : 01/07/2009

*@Change history: 
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />

<!-- 일자 및 달력팝업 호출 -->
<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js"></script>
<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js"></script>
<script language="javascript" src="<%=CLT_PATH%>/apps/fis/sal/tpm/tradepartner/script/SAL_TPM_0010.js"></script>

<script language="JavaScript">
function goTabSelect(isNumSep) {
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	frm1.f_isNumSep.value = isNumSep;
	if( isNumSep == "01" ) {
    	document.all.Tab01.className = "nowTab";
        document.all.Tab02.className = "";
        document.all.Tab03.className = "";
        document.all.Tab04.className = "";
        document.all.Tab05.className = "";
        document.all.Tab06.className = "";
        document.all.Tab07.className = "";
      
    } else if( isNumSep == "02" ) {
    	document.all.Tab01.className = "";
        document.all.Tab02.className = "nowTab";
        document.all.Tab03.className = "";
        document.all.Tab04.className = "";
        document.all.Tab05.className = "";
        document.all.Tab06.className = "";
        document.all.Tab07.className = "";
        
    } else if( isNumSep == "03" ) {
    	document.all.Tab01.className = "";
        document.all.Tab02.className = "";
        document.all.Tab03.className = "nowTab";
        document.all.Tab04.className = "";
        document.all.Tab05.className = "";
        document.all.Tab06.className = "";
        document.all.Tab07.className = "";
        
    } else if( isNumSep == "04" ) {
    	document.all.Tab01.className = "";
        document.all.Tab02.className = "";
        document.all.Tab03.className = "";
        document.all.Tab04.className = "nowTab";
        document.all.Tab05.className = "";
        document.all.Tab06.className = "";
        document.all.Tab07.className = "";
        
    } else if( isNumSep == "05" ) {
    	document.all.Tab01.className = "";
        document.all.Tab02.className = "";
        document.all.Tab03.className = "";
        document.all.Tab04.className = "";
        document.all.Tab05.className = "nowTab";
        document.all.Tab06.className = "";
        document.all.Tab07.className = "";
      
    } else if( isNumSep == "06" ) {
    	document.all.Tab01.className = "";
        document.all.Tab02.className = "";
        document.all.Tab03.className = "";
        document.all.Tab04.className = "";
        document.all.Tab05.className = "";
        document.all.Tab06.className = "nowTab";
        document.all.Tab07.className = "";
      
    } else if( isNumSep == "07" ) {
    	document.all.Tab01.className = "";
        document.all.Tab02.className = "";
        document.all.Tab03.className = "";
        document.all.Tab04.className = "";
        document.all.Tab05.className = "";
        document.all.Tab06.className = "";
        document.all.Tab07.className = "nowTab";
    }
	
	var tabObjs = document.getElementsByName('tabLayer');

    if(isNumSep=='01') {
		tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
		
    }else if(isNumSep=='02') {
		tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'inline';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
        
    }else if (isNumSep=='03') {
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'inline';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
        
	}else if (isNumSep=='04') {
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'inline';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
        
    }else if (isNumSep=='05') {
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'inline';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
        
    }else if (isNumSep=='06') {
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'inline';
        tabObjs[6].style.display = 'none';
        
	}else if (isNumSep=='07') {
	    tabObjs[0].style.display = 'none';
	    tabObjs[1].style.display = 'none';
	    tabObjs[2].style.display = 'none';
	    tabObjs[3].style.display = 'none';
	    tabObjs[4].style.display = 'none';
	    tabObjs[5].style.display = 'none';
	    tabObjs[6].style.display = 'inline';
	    
	}
  }

function openOrder(cF,type){
    var param = "?openerForm=goals&openerType="+type+"&openerCodeField="+cF;
    window.open("/cupfmsWeb/cup/js/common/pop/COM_ORDER_01.jsp"+param,"search","height=550,width=450,scrollbars=yes");  
  }

function openLocation(cF,nF, type){
    var param = "?openerForm=goals&openerType="+type+"&openerCodeField="+cF+"&openerNameField="+nF;
    window.open("/cupfmsWeb/cup/js/common/pop/COM_LOCATION_01.jsp"+param,"search","height=550,width=450,scrollbars=yes");  
  }
	
var user_ofc_cd = "<%=userInfo.getOfc_cd()%>";

function btnLoad(){

	if(document.frm1.copyFlag.value == "C"){
		document.frm1.btnCopy.style.display = '';
    }else{
    	document.frm1.btnCopy.style.display = 'none';
    } 
	
	
}

function setupPage(){
	loadPage();
	checkTpCode();
	btnLoad();
}

var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
</script>
<bean:define id="mdmmcm0070VO" name="EventResponse" property="mapVal"/>
<bean:define id="tmpMap" name="mdmmcm0070VO" property="key"/>
<script>
    var UNITCD1 = '';
	var UNITCD2 = '';
	<logic:notEmpty name="EventResponse">
	    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
		<bean:define id="cdList" name="cdMap" property="utType"/>
		    <% boolean isBegin = false; %>
		    <logic:iterate id="codeVO" name="cdList">
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
</script>
	<form name="frm1" method="POST" action="./SAL_TPM_0010.clt">
		<input type="hidden" name="f_cmd"/> 
		<input type="hidden" name="f_CurPage"/>
		<input type="hidden" name="f_trdp_cd"/>
		<input type="hidden" name="f_trf_ctrt_no"/>
		<input type="hidden" name="f_biz_no"/>
		<input type="hidden" name="f_sls_ofc_cd" value='<bean:write name="mdmmcm0070VO" property="sls_ofc_cd"/>'/>
		<input type="hidden" name="f_sls_ofc_nm" value='<bean:write name="mdmmcm0070VO" property="sls_ofc_nm"/>'/>
		
		<input type="hidden" name="t_sls_ofc_cd" value="<%= userInfo.getOfc_cd() %>"/>
		<input type="hidden" name="t_sls_ofc_nm" value="<%= userInfo.getOfc_eng_nm() %>"/>
		<input type="hidden" name="t_sls_usrid" value="<%= userInfo.getUsrid() %>"/>
		<input type="hidden" name="t_sls_usrnm" value="<%= userInfo.getUser_name() %>"/>
		
		<logic:notEmpty name="EventResponse">
	    	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
 	   		<input type="hidden" name="f_bankList" value='<bean:write name="cdMap" property="bankCode"/>'>
	   		<input type="hidden" name="f_RltPrnrTpCd" 	value='<bean:write name="cdMap" property="rtlPrnrTp"/>'>
	   		<input type="hidden" name="f_TrdDiv" value='<bean:write name="cdMap" property="trdDiv"/>'>
  		</logic:notEmpty>
  		<input type="hidden" name="s_Acct_Info_Row"/>
  		<input type="hidden" name="cmd_type" value="26"/>
  		<input type="hidden" name="title" value="Label Print"/>
  		<input type="hidden" name="attn"/>
  		
  		<input type="hidden" name="s_sls_gp_cd" value="CR"/>
	    <input type="hidden" name="cr_term_cd" value="A"/>
	    <input type="hidden" name="cr_term_dt" value=""/>
	    
	    <input type="hidden" name="h_trdp_tp_cd" value='<bean:write name="tmpMap" property="trdp_tp_cd"/>'>
	    <input type="hidden" name="h_trdp_tp_nm" value='<bean:write name="tmpMap" property="trdp_tp_nm"/>'>

		<!--  Payment Term -->
	    <input type="hidden" name="h_sls_gp_cd" value='<bean:write name="tmpMap" property="sls_gp_cd"/>'>
	    <input type="hidden" name="h_cr_term_cd" value='<bean:write name="tmpMap" property="cr_term_cd"/>'>
	    <input type="hidden" name="h_cr_term_dt" value='<bean:write name="tmpMap" property="cr_term_dt"/>'>
	    <input type="hidden" name="h_crd_lmt_amt" value='<bean:write name="tmpMap" property="crd_lmt_amt"/>'>

	    <input type="hidden" name="vis_id_org" value='<bean:write name="tmpMap" property="vis_id"/>'>
	    
	    <input type="hidden" name="vis_id_chk" value='N'>
	    
	    <input type="hidden" name="copyFlag" 	value='<bean:write name="cdMap" property="copyFlag"/>'>
	    
	    <!--  jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. -->
	    <input type="hidden" name="f_isNumSep" 	value='<bean:write name="cdMap" property="f_isNumSep"/>'>
	    
	    <!-- yjw 2014.10.20 #45003 : [Common] DEFAULT, MAINCMP 거래처 코드가 삭제 안되도록 수정 -->
	    <input type="hidden" name="default_maincmp_yn" value='<bean:write name="tmpMap" property="default_maincmp_yn"/>'>
	    
	    <input type="hidden" name="pre_eng_nm" value='<bean:write name="tmpMap" property="eng_nm"/>'>

	<!-- page_title_area(S) -->
	<div class="page_title_area clear ">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><span><%=LEV3_NM%></span></button></h2>
		<input type="hidden" name="screen_title" value="<%=LEV3_NM%>"/>
		<!-- page_title(E) -->
			
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn" >
			<button type="button" style="display:none;" btnAuth="INTERFACE" class="btn_normal" name="Interface" id="Interface"><bean:message key="Interface"/></button><!-- 
		--><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" name="btn_retrieve" id="btn_retrieve" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('NEW');"><bean:message key="New"/></button><!-- 
		--><button type="button" id="btnCopy" class="btn_normal"  style="display:none;" btnAuth="COPY" onClick="doWork('COPY');" name="btnCopy" id="btnCopy"><bean:message key="Copy"/></button><!-- 
		--><button type="button" id="btnAdd" class="btn_normal"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('ADD')"><bean:message key="Save"/></button>
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
	<div class="wrap_search_tab">
		<div class="opus_design_inquiry wFit">
			<h3 class="title_design"><bean:message key="Trade_Partner"/></h3>
			<table>
	            <tr>
	                <th width="50"><bean:message key="Trade_Partner"/></th>
	                <td>
	                <input required name="s_trdp_cd" id="s_trdp_cd" type="text" value='<bean:write name="tmpMap" property="trdp_cd"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:160px;" maxlength="20" onKeyPress="fncTpCodeSearch()"><!-- 
	                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('LINER_POPLIST')"></button>
	                </td>
	            </tr>
	        </table>
		</div>
	</div>
	
    <div class="wrap_result_tab">
	    <ul class="opus_design_tab">
	        <li id=Tab01 ><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Company_Info"/></span></a></li>
	        <li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Bank_Info"/></span></a></li>
	        <li id=Tab03><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Log_Book"/></span></a></li>
	        <li id=Tab04 style="display:none"><a href=""><span style="cursor:hand;" onClick="javascript:goTabSelect('04');"><bean:message key="Tariff_Info"/></span></a></li>
	        <li id=Tab05><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Related_Partner"/></span></a></li>
	        <li id=Tab06><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('06');"><span><bean:message key="Other_Info"/></span></a></li>
	        <li id=Tab07><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('07');"><span><bean:message key="Charge"/></span></a></li>
	    </ul>
	    
		<div id="tabLayer" style="display:none" name="tabLayer">
			<div class="layout_wrap">
				<div class="layout_vertical_3 pad_rgt_8">
					<div class="opus_design_inquiry sm" style="height:500px;">
						<table>
							<colgroup>
								<col width="100"></col>
								<col width="150"></col>
								<col width="50"></col>
								<col width="50"></col>
								<col width="*"></col>
							</colgroup>
							<tbody>
							<tr>
								<th><bean:message key="Code"/></th>
								<td>
									<!-- input type="text" name="i_trdp_cd" value='<bean:write name="tmpMap" property="trdp_cd"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-align:left" maxlength="10" disabled="true"-->
									<logic:empty name="tmpMap" property="trdp_cd">
										<input type="text" name="i_trdp_cd" value="" class="search_form-disable" dataformat="excepthan" style=" text-transform:uppercase;ime-mode:disabled;width:130px;text-align:left" maxlength="20" readonly onblur="strToUpper(this);">
									</logic:empty>
									<logic:notEmpty name="tmpMap" property="trdp_cd">
										<input type="text" name="i_trdp_cd" value='<bean:write name="tmpMap" property="trdp_cd"/>' class="search_form-disable" dataformat="excepthan" style=" text-transform:uppercase;ime-mode:disabled;width:130px;text-align:left" maxlength="20" readonly onblur="strToUpper(this);">
									</logic:notEmpty><input type="hidden" name="hidden_trdp_cd" value='<bean:write name="tmpMap" property="trdp_cd"/>' >
								</td>						
								<td colspan="3" id="keyInDisp"  <logic:notEmpty name="tmpMap" property="trdp_cd">style="display:none;"</logic:notEmpty> align="left" colspan="2"><input type="checkbox" name="doKeyIn" id="doKeyIn" onclick="doKeyInCheck(this);"><label for="doKeyIn">Key In</label></td>
							</tr>
							<tr>
								<th><bean:message key="Alias"/></th>
								<td><input type="text" name="shrt_nm" value='<bean:write name="tmpMap" property="shrt_nm"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;text-align:left" maxlength="50" onblur="strToUpper(this);"></td>
								<th><bean:message key="Use_YN"/></th>
								<td colspan="2">
									<select required name="delt_flg" style="width:60px;text-align:left"  onchange="checkTrdpUse()">
										<option value="N">Yes</option>
										<option value="Y">No</option>
									</select>
								</td>
							</tr>
							<tr>
								<th><bean:message key="Partner_Type"/></th>
								<td>
									<logic:notEmpty name="EventResponse">
										<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
										<bean:define id="cdList" name="cdMap" property="tpType"/>
										<select id="sel_trdp_tp_cd" name="s_trdp_tp_cd" class=""  dataformat="excepthan" style="ime-mode:disabled;width:130px;text-align:left" required>
											<option value=""></option>
											<logic:iterate id="codeVO" name="cdList">
												<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
											</logic:iterate>
										</select>
									</logic:notEmpty>
								</td>
							</tr>
							<tr>
								<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
								<logic:notEmpty name="cdMap" property="tpZone">
								<th width="50"><bean:message key="Trade_Partner"/> <bean:message key="Group"/></th>
								<td colspan="4">
									 <input type="text" name="s_tp_grp" value='' style="width:231px" readonly="readonly" /><!--  
									  --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('TRDP_GROUP_POPLIST')"></button>
								</td>
								</logic:notEmpty>	
								<logic:empty name="cdMap" property="tpZone">
									<input type="hidden" name="s_tp_grp" value='' /> 
								</logic:empty>							
							</tr>
							<tr>
								<th><bean:message key="Name_Eng"/></th>
								<td colspan="4">
									<input required type="text" name="eng_nm" class="" value='<bean:write name="tmpMap" property="eng_nm"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:260px;text-align:left" maxlength="50" onblur="strToUpper(this);eng_nm_chg(this.value);" ></td>
							</tr>
							<tr>
								<th><bean:message key="Local_Name"/></th>
								<td colspan="4">
									<input type="text" name="locl_nm" value='<bean:write name="tmpMap" property="locl_nm"/>' dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:260px;text-align:left" maxlength="100" onBlur="strToUpper(this);bl_addr_chg();"></td>
							</tr>
							<tr>
								<th><bean:message key="Local_Address"/></th>
								<td colspan="4">
									<textarea name="lgl_addr" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:260px;height:100px;" WRAP="off" maxlength="400" onblur="bl_addr_chg();strToUpper(this);"><bean:write name="tmpMap" property="lgl_addr"/></textarea></td>
							</tr>
							<tr>
								<th><bean:message key="City"/></th>
								<td align="left" colspan="4">
									<input type="text" name="city_nm" value='<bean:write name="tmpMap" property="city_nm"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:260px;text-align:left;" onBlur="strToUpper(this);bl_addr_chg();" maxlength="50">
										</td>
									<%-- <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand" onclick="doWork('STATE_POPLIST')" onBlur="bl_addr_chg();"/></td> --%>
							</tr>
							<tr>
								<th><bean:message key="State"/> </th>
								<td align="left" colspan="4">
								<input class="input_search" type="text" name="state_cd" value='<bean:write name="tmpMap" property="state_cd"/>' dataformat="excepthan" style="width:80px;text-align:left;text-transform:uppercase;ime-mode:disabled;" maxlength="2" onKeyDown="codeNameAction('state', this)" onBlur="strToUpper(this);codeNameAction('state', this);bl_addr_chg();"><!-- 
									 --><button id="state" type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('STATE_POPLIST')" onBlur="bl_addr_chg();"></button>
									<span style="font-weight: bold;"><bean:message key="Zip"/></span>								
									<input type="text" name="rep_zip" value='<bean:write name="tmpMap" property="rep_zip"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:87px;text-align:left" onkeypress="javascript:chkZip();" onBlur="strToUpper(this);bl_addr_chg();" onKeyPress="ComKeyOnlyNumber(this)" maxlength="10">
									
								</td>
							</tr>
							<tr>
								<th><bean:message key="Country"/></th>
								<td colspan="4">
									<input required type="text" name="cnt_cd" class="" value='<bean:write name="tmpMap" property="cnt_cd"/>' dataformat="excepthan" style="width:30px;text-transform:uppercase;ime-mode:disabled;" maxlength="2" onKeyDown="codeNameAction('country',this)" onBlur="strToUpper(this);codeNameAction('country',this);bl_addr_chg();">
									<button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('COUNTRY_POPLIST')"></button>
									<%-- <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand" onclick="doWork('COUNTRY_POPLIST')"/> --%>
									<input required type="text" name="cnt_nm" class="" value='<bean:write name="tmpMap" property="cnt_nm"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:202px;text-align:left" onBlur="bl_addr_chg();" readOnly>
								</td>
							</tr>
							<tr>
								<th><bean:message key="Annual_Bond_No"/></th>
								<td align="left" colspan="4"><input type="text" name="an_bond_no" value='<bean:write name="tmpMap" property="an_bond_no"/>' dataformat="engup" style="text-transform:uppercase;ime-mode:disabled;width:69px;text-align:left" maxlength="9" >
                            	<span style="font-weight: bold;"><bean:message key="Expiration_Date"/></span>
	                          	<input type="text" name="an_bond_exp_dt" id="an_bond_exp_dt" maxlength="10" value='<bean:write name="tmpMap" property="an_bond_exp_dt"/>' class="search_form"  style="ime-mode:disabled;width:69px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);"><!--
									--><button type="button" id="btn_an_bond_exp_dt" name="btn_an_bond_exp_dt" onclick="doDisplay('DATE1' ,frm1.an_bond_exp_dt);" class="calendar" tabindex="-1"></button>
								</td>
							</tr> 
							<tr>
								<th><bean:message key="Entered_By"/></th>
								<td colspan="4">
									<input type="text" name="an_bond_entr_usrid" value='<bean:write name="tmpMap" property="an_bond_entr_usrid"/>' 
									dataformat="excepthan" style="width:80px;ime-mode:disabled;" maxlength="12" onKeyDown="codeNameAction('entered_by', this)" onBlur="codeNameAction('entered_by', this)"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('ENTR_USR_POPLIST')"></button><!--
									--><input type="text" name="an_bond_entr_usrnm" value='<bean:write name="tmpMap" property="an_bond_entr_usrnm"/>' class="search_form-disable" dataformat="excepthan" style="min-width:150px; ime-mode:disabled;width:110px;text-align:left" readOnly>
								</td>
							</tr> 
							<tr>
								<th><bean:message key="Purchased_By"/></th>
								<td colspan="4"><input type="text" name="an_bond_pur_cd" maxlength="20" value='<bean:write name="tmpMap" property="an_bond_pur_cd"/>' onKeyDown="codeNameAction('trdpcode',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpcode',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!-- 
                            	--><button type="button" name="partner" id="partner" class="input_seach_btn" tabindex="-1" onClick="doWork('LINER_POPLIST2',this)"></button><!-- 
                            	--><input type="text"   name="an_bond_pur_nm" maxlength="50" value='<bean:write name="tmpMap" property="an_bond_pur_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:121px;" readOnly onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST2', document.getElementById('partner'), frm1.an_bond_pur_nm.value);}"> 
								</td>
							</tr> 
							<tr>
								<th><bean:message key="Purchased_Date"/></th>
	                          	<td colspan="4"><input type="text" name="an_bond_pur_dt" id="an_bond_pur_dt" maxlength="10" value='<bean:write name="tmpMap" property="an_bond_pur_dt"/>' class="search_form"  style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);"><!--
									--><button type="button" id="btn_an_bond_pur_dt" name="btn_an_bond_pur_dt" onclick="doDisplay('DATE1' ,frm1.an_bond_pur_dt);" class="calendar" tabindex="-1"></button>
								</td>
							</tr> 
							</tbody>
						</table>
					</div>
				</div>
				<div class="layout_vertical_3" style="width:34%;">
					<div class="opus_design_inquiry sm" style="height:500px;">
						<table>
							<colgroup>
								<col width="115"></col>
								<col width="70"></col>
								<col width="70"></col>
								<col width="*"></col>
							</colgroup>
							<tbody>
							<tr>
								<th><bean:message key="BL_Address"/></th>
								<td colspan="3">
									<!-- 20121130 OJG  ;checkTxtAreaLn추가-->
									<textarea name="eng_addr" dataformat="excepthan" style="width:290px;height:100px;" WRAP="off" onblur="strToUpper(this);" onKeypress="checkTxtAreaLn(this, 62, 6, 'Name on B/L');"><bean:write name="tmpMap" property="eng_addr"/></textarea></td>
							</tr>
							<tr>
								<th>
									<bean:message key="Billing"/>&nbsp;<bean:message key="Address"/>
									<br/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:acct_addr_copy();" tabindex="-1"><bean:message key="Copy"/></a>
								</th>
								<td colspan="3">
									<textarea name="tax_iss_addr" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:290px;height:100px;" WRAP="off" maxlength="400" onblur="strToUpper(this);"><bean:write name="tmpMap" property="tax_iss_addr"/></textarea></td>
							</tr>
							<tr>
								<th><bean:message key="CEO"/></th>
								<td colspan="3"><input type="text" name="ceo_nm" value='<bean:write name="tmpMap" property="ceo_nm"/>' dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:290px;text-align:left" maxlength="50"></td>
							</tr>
							<tr>
								<th><bean:message key="Identification"/></th>
								<td>
									<select name="tax_type" dataformat="excepthan" style="ime-mode:disabled;width:77px;text-align:left">
										<option></option>
										<logic:notEmpty name="EventResponse">
											<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
											<bean:define id="cdList" name="cdMap" property="taxIdType"/>
											<logic:iterate id="codeVO" name="cdList">
												<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
											</logic:iterate>
										</logic:notEmpty>
									</select>
								</td>
								<th><bean:message key="Tax_ID_No"/></th>
								<td><input type="text" name="biz_no" value='<bean:write name="tmpMap" property="biz_no"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:98px;text-align:left" maxlength="20">
								</td>
								<input type="hidden" name="h_tax_type" value='<bean:write name="tmpMap" property="tax_type"/>'>
							</tr>
							<tr>
								<th><bean:message key="Corp_ID"/></th>
								<td>
									<input type="text" name="corp_no" value='<bean:write name="tmpMap" property="corp_no"/>' onkeypress="javascript:chkCorp();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:77px;text-align:left" maxlength="20">
								</td>
								<th><bean:message key="Account_Group_ID"/></th>
								<td>
									<input type="text" name="acct_cd" value='<bean:write name="tmpMap" property="acct_cd"/>' dataformat="excepthan" style="text-transform:uppercase;ime-mode:disabled;width:98px;text-align:left" onblur="strToUpper(this);" maxlength="20">
								</td>
							</tr>
							<tr>
								<th><bean:message key="IATA_Firm"/></th>
								<td>
									<input type="text" name="iata_cd" value='<bean:write name="tmpMap" property="iata_cd"/>' dataformat="excepthan" style="text-transform:uppercase;ime-mode:disabled;width:77px;text-align:left" onblur="strToUpper(this);" maxlength="20">
								</td>
								<th><bean:message key="SCAC"/></th>
								<td>
									<input type="text" name="scac_cd" value='<bean:write name="tmpMap" property="scac_cd"/>' dataformat="excepthan" style="text-transform:uppercase;ime-mode:disabled;width:98px;text-align:left" onblur="strToUpper(this);" maxlength="10">
								</td>
							</tr>
							<tr>
								<th><bean:message key="Prefix"/></th>
								<td>
									<input type="text" name="prefix" value='<bean:write name="tmpMap" property="prefix"/>' dataformat="excepthan" style="text-transform:uppercase;ime-mode:disabled;width:77px;text-align:left" maxlength="10" onblur="strToUpper(this);">
								</td>
								<th><bean:message key="Deconsol"/>(KAMS)</th>
								<td>
									<input type="text" name="dcnsl_cd" value='<bean:write name="tmpMap" property="dcnsl_cd"/>'  dataformat="excepthan" style="text-transform:uppercase;ime-mode:disabled;width:98px;text-align:left" maxlength="4" onblur="strToUpper(this);">
								</td>            
							</tr>
							<tr>
								<th><bean:message key="Commodity"/></th>
								<td colspan="3">
									<input type="text" class="input_search" name="cmdt_cd" value='<bean:write name="tmpMap" property="cmdt_cd"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:77px;" onKeyDown="codeNameAction('commodity', this)" onBlur="codeNameAction('commodity', this)"  maxlength="12"><!--
									--><button id="commodity" type="button" class="input_seach_btn" tabindex="-1"  onClick="doWork('COMMODITY_POPLIST',this)"></button><!--
									--><input type="text" name="cmdt_nm" value='<bean:write name="tmpMap" property="cmdt_nm"/>' maxlength="200" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180px;"  onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){doWork('COMMODITY_POPLIST',this);}">
								</td>
							</tr>	
							<tr>
								<th><bean:message key="Smartlink_ID"/></th>
								<td colspan="4"><input type="text" name="smt_id" value='<bean:write name="tmpMap" property="smt_id"/>' dataformat="excepthan" style="ime-mode:disabled;width:290px;text-align:left" maxlength="20" >
							</tr> 	
							<tr>
					        	<th><bean:message key="Contract_No"/></th>
					        	<td colspan="4"><input type="text" name="ctrt_no" value='<bean:write name="tmpMap" property="ctrt_no"/>' dataformat="excepthan" style="ime-mode:disabled;width:290px;text-align:left" maxlength="20" >
						    </tr> 
												
							</tbody>
						</table>
					</div>
				</div>
				<div class="layout_vertical_3 pad_left_8">
					<div class="opus_design_inquiry sm" style="height:500px;">
						<table>
							<colgroup>
								<col width="110"></col>
								<col width="*"></col>
							</colgroup>
							<tr>
								<th><bean:message key="Sales_Office"/></th>
								<td>
									<input class="input_search" type="text" name="sls_ofc_cd" value='<bean:write name="tmpMap" property="sls_ofc_cd"/>' class="search_formy" dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" onKeyDown="codeNameAction('office', this)" onBlur="codeNameAction('office', this)"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('OFFICE_POPLIST')"></button><!--
									--><input class="input_search" type="text" name="sls_ofc_nm" value='<bean:write name="tmpMap" property="sls_ofc_nm"/>' class="search_form-disable" dataformat="excepthan" style="min-width:150px;ime-mode:disabled;width:110px;text-align:left" readOnly>
								</td>
							</tr>
							<tr>
								<th><bean:message key="Sales_Person"/></th>
								<td>
									<input type="text" name="sls_usrid" value='<bean:write name="tmpMap" property="sls_usrid"/>' dataformat="excepthan" style="width:80px;ime-mode:disabled;" maxlength="12" onKeyDown="codeNameAction('user', this)" onBlur="codeNameAction('user', this)"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('USER_POPLIST')"></button><!--
									--><input type="text" name="sls_usrnm" value='<bean:write name="tmpMap" property="sls_usrnm"/>' class="search_form-disable" dataformat="excepthan" style="min-width:150px; ime-mode:disabled;width:110px;text-align:left" readOnly>
								</td>
							</tr>
							<tr>
								<th colspan="2" style="text-align:left;"><bean:message key="Status"/>(<bean:message key="For_overseas_partner_only"/>)</th>
							</tr>
							<tr>
								<td></td>
								<td>
									<logic:notEmpty name="EventResponse">
										<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
										<bean:define id="cdList" name="cdMap" property="status"/>
										<select name="s_sts_cd" dataformat="excepthan" style="ime-mode:disabled;width:140px;text-align:left">
											<option></option>
											<logic:iterate id="codeVO" name="cdList">
												<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
											</logic:iterate>
										</select>
									</logic:notEmpty>
								</td>
							</tr>
							<tr>
								<th><label for="bill_to_agent"><bean:message key="Bill_To_Agent"/></label></th>
								<td>
									<input type="checkBox" name="bill_to_agent" id="bill_to_agent" value="Y">
									<input type="hidden" name="h_bill_to_agent" value='<bean:write name="tmpMap" property="bill_to_agent"/>'>
								</td>
							</tr>
							<tr>
								<th><label for="rgst_usrid"><bean:message key="Created"/></label></th>
								<td><bean:message key="By"/>
									<input type="text" name="rgst_usrid" id="rgst_usrid" value='<bean:write name="tmpMap" property="rgst_usrid"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:53px;text-align:left" readOnly><bean:message key="at"/>
									<input type="text" name="rgst_dt" value='<bean:write name="tmpMap" property="rgst_dt"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:73px;text-align:left" readOnly>
								</td>
							</tr>
							<tr>
								<th><label for="modi_usrid"><bean:message key="Modified"/></label></th>
								<td><bean:message key="By"/>
									<input type="text" name="modi_usrid" id="modi_usrid" value='<bean:write name="tmpMap" property="modi_usrid"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:53px;text-align:left" readOnly><bean:message key="at"/>
									<input type="text" name="modi_dt" value='<bean:write name="tmpMap" property="modi_dt"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:73px;text-align:left" readOnly>
								</td>
							</tr>
							<tr style="display:none">
								<th><label for="ar_vat_line"><bean:message key="AR_VAT"/></label></th>
								<td>
									<input type="checkBox" name="ar_vat_line" id="ar_vat_line" value="Y">
									<input type="hidden" name="h_ar_vat_line" value='<bean:write name="tmpMap" property="ar_vat_line"/>'>
								</td>
							</tr>
							<tr style="display:none">
								<th><label for="ap_vat_line"><bean:message key="AP_VAT"/></label></th>
								<td>
									<input type="checkBox" name="ap_vat_line" id="ap_vat_line" value="Y">
									<input type="hidden" name="h_ap_vat_line" value='<bean:write name="tmpMap" property="ap_vat_line"/>'>
								</td>
							</tr>
							<%-- <tr>
								<th width="110"><bean:message key="Visibility_ID"/></th>
								<td nowrap>
									<input type="text" name="vis_id" value='<bean:write name="tmpMap" property="vis_id"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:width:77;" maxlength="12">
								</td>
							</tr>
							<tr>
								<th width="110"><bean:message key="Visibility_PW"/></th>
								<td nowrap>
									<input type="password" name="vis_pwd" dataformat="excepthan" style="ime-mode:disabled; text-transform:width:77;" maxlength="20">
								</td>
							</tr> --%>
							<tr>
								<th><bean:message key="Payment_Term"/></th>
								<td>
									<input type="text" name="payment_term" id="payment_term" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;  text-align:center; width:180px;" readonly="readonly" >
								</td>
							</tr>
							<tr>
								<th><bean:message key="Credit_Limit"/></th>
								<td>
									<input type="text" name="credit_limit" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-align:center; width:180px;" readonly="readonly" >
								</td>
							</tr>
							<tr>
								<th><bean:message key="Credit_Approved_Date"/></th>
								<td>
									<input type="text" name="crd_appr_dt" id="crd_appr_dt" maxlength="10" value='<bean:write name="tmpMap" property="crd_appr_dt"/>' class="search_form"  style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);"><!--  
									 --><button type="button" id="btn_crd_appr_dt" name="btn_crd_appr_dt" onclick="doDisplay('DATE1' ,frm1.crd_appr_dt);" class="calendar" tabindex="-1"></button>
								</td>
							</tr>							
							<tr>
								<th><label for="clm_flg"><bean:message key="CLM_YN"/></label></th>
								<td>
									<input type="checkBox" name="clm_flg" id="clm_flg" value="Y">
									<input type="hidden" name="h_clm_flg" value='<bean:write name="tmpMap" property="clm_flg"/>'>
								</td>
							</tr>	
							<tr>
								<th><bean:message key="Profit_Share_P"/></th>
								<td>
									<input type="text" name="profit_share" onkeyPress="onlyNumberCheck();" maxlength="5" value="<bean:write name="tmpMap" property="profit_share"/>" style="width:180px;text-align:right" > %
								</td>
							</tr>
							<tr>
								<th colspan="2" style="text-align:left;"><bean:message key="ORDER_ACCT_NM"/></th>
							</tr>					                                
							<tr>
								<td></td>
								<td>
									<input type="text" name="reserve_field09" value='<bean:write name="tmpMap" property="reserve_field09"/>' dataformat="excepthan" style="ime-mode:disabled; text-align:left; width:180px;" maxlength="50">
								</td>
							</tr>
							
							<tr>
                                <th  width="110" nowrap class="table_search_head"><bean:message key="Openning_Hours"/></th>
                                <td nowrap class="table_search_body">
                                     <textarea name="ofc_hr" class="search_form" style="width:180px;height:40px;" WRAP="off" maxlength="400" onblur="strToUpper(this);" ><bean:write name="tmpMap" property="ofc_hr"/></textarea></td>
                                </td>
                            </tr>
						                                
						</table>
						</div>
					</div>
			</div>
			<div class="opus_design_grid pad_btm_8" style="margin-top: 0px;">
				<h3 class="title_design"><bean:message key="Contact_Person_Information"/></h3>
				<div class="opus_design_btn"><button type="button" class="btn_normal"  onclick="doWork('ROWADD3')"><bean:message key="Add"/></button></div>
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
									
		<div id="tabLayer" name="tabLayer"style="display:none">
			<div class="opus_design_grid">
				<h3 class="title_design"><bean:message key="Bank_Account_Information"/></h3>
				<div class="opus_design_btn"><button type="button" class="btn_normal"  onclick="doWork('ROWADD4')"><bean:message key="Add"/></button></div>
				<script language="javascript">comSheetObject('sheet2');</script>
				</div>
		</div>
					
		<div id="tabLayer" name="tabLayer"style="display:none">
			<div class="opus_design_grid">
				<h3 class="title_design pad_btm_8"><bean:message key="Contact_Information"/>&nbsp;<bean:message key="List"/></h3>
				<div class="opus_design_btn"><button type="button" class="btn_normal"  onclick="doWork('ROWADD1')"><bean:message key="Add"/></button></div>
				<table>
	               <tr>
	                   <td width="50%" align="center">
						<script language="javascript">comSheetObject('sheet3');</script>
	                   </td>
	                   <th width="5%"><bean:message key="Contents"/></th>
	                   <td width="45%">
	                   	<textarea name="s_s3_sls_his_ctnt" class="search_form-disable" style="text-transform:none;width:99%;height:240px;" readOnly></textarea>
	                   </td>
	               </tr>
	           </table>
			</div>
		</div>
		
	     <div id="tabLayer" name="tabLayer"style="display:none">
	    	 <div class="opus_design_grid">
				<h3 class="title_design pad_btm_8"><bean:message key="Tariff"/> <bean:message key="List"/></h3>
				<script language="javascript">comSheetObject('sheet4');</script>
			</div>
		</div>
			
		<div id="tabLayer" name="tabLayer"style="display:none">
			<div class="opus_design_grid">
				<h3 class="title_design pad_btm_8"><bean:message key="Related_Partner"/></h3>
				<div class="opus_design_btn"><button type="button" class="btn_normal"  onclick="doWork('ROWADD6')"><bean:message key="Add"/></button></div>
				<script language="javascript">comSheetObject('sheet6');</script>
			</div>
		</div>
		
		<!--	20110702 LHK 추가 Agent 별 Filing No. 생성 규칙 수정을 위한 항목 추가  Other Info. Tab Start -->
		<div id="tabLayer" name="tabLayer"style="display:none">
			<div class="opus_design_inquiry sm">
				<h3 class="title_design"><bean:message key="Prefix"/> (<bean:message key="For_overseas_partner_only"/>)</h3>
				<table>
					<colgroup>
						<col width="160"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Ocean_Import_Filing_No"/></th>
							<td>
								<input name="oi_ref_prfx" type="text" dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="tmpMap" property="oi_ref_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
								--><input name="oi_ref_seq_no" type="text" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="tmpMap" property="oi_ref_seq_no"/>" onkeyPress="onlyNumberCheck();">
							</td>
						</tr>

						<tr>
							<th><bean:message key="Ocean_Export_Filing_No"/></th>
							<td>
								<input name="oe_ref_prfx" type="text" dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="tmpMap" property="oe_ref_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
								--><input name="oe_ref_seq_no" type="text" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="tmpMap" property="oe_ref_seq_no"/>" onkeyPress="onlyNumberCheck();">
							</td>
						</tr>

						<tr>
							<th><bean:message key="Air_Import_Filing_No"/></th>
							<td>
								<input name="ai_ref_prfx" type="text" dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="tmpMap" property="ai_ref_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
								--><input name="ai_ref_seq_no" type="text" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="tmpMap" property="ai_ref_seq_no"/>" onkeyPress="onlyNumberCheck();">
							</td>
						</tr>

						<tr>
							<th><bean:message key="Air_Export_Filing_No"/></th>
							<td>
								<input name="ae_ref_prfx" type="text" dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="tmpMap" property="ae_ref_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
								--><input name="ae_ref_seq_no" type="text" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="tmpMap" property="ae_ref_seq_no"/>" onkeyPress="onlyNumberCheck();">
							</td>
						</tr>

						<tr>
							<th><bean:message key="Ocean_Export_HBL_No"/></th>
							<td>
								<input name="oe_hbl_prfx" type="text" dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="tmpMap" property="oe_hbl_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
								--><input name="oe_hbl_seq_no" type="text" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="tmpMap" property="oe_hbl_seq_no"/>" onkeyPress="onlyNumberCheck();">
							</td>
						</tr>

						<tr>
							<th><bean:message key="Air_Export_HAWB_No"/></th>
							<td>
								<input name="ae_awb_prfx" type="text" dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="tmpMap" property="ae_awb_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
								--><input name="ae_awb_seq_no" type="text" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="tmpMap" property="ae_awb_seq_no"/>" onkeyPress="onlyNumberCheck();">
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div id="tabLayer" name="tabLayer"style="display:none">
			<div class="layout_wrap">
				<div class="layout_vertical_2 pad_rgt_8">
			        <div class="opus_design_grid" >
			        	<h3 class="title_design pad_btm_8"><bean:message key="Fuel_Surcharge"/></h3>
			        	<div class="opus_design_btn"><button type="button" class="btn_normal"  onclick="doWork('ROWADD7')"><bean:message key="Add"/></button></div>
			        	<script language="javascript">comSheetObject('sheet7');</script>
			        </div>
				</div>
			    <div class="layout_vertical_2">
			        <div class="opus_design_grid">
			            <h3 class="title_design pad_btm_8"><bean:message key="Security_Charge"/></h3>
			        	<div class="opus_design_btn"><button type="button" class="btn_normal"  onclick="doWork('ROWADD8')"><bean:message key="Add"/></button></div>
			        	<script language="javascript">comSheetObject('sheet8');</script>
			        </div>
				</div>
			</div>
		</div>
	</div>
<!--	Other Info. Tab End	-->
				
	<!-- 탭부분 -->
	<table width="1200" border="0" cellspacing="0" cellpadding="0">
    	<tr>
	        <td align="center">
				<script language="javascript">comSheetObject('sheet5');</script>
            </td>
        </tr>
    </table>
    </form>
    <form name="frm2" method="POST" action="./GateServlet.gsl">
		<input type="hidden" name="goWhere" value="fd"/>
	    <input type="hidden" name="bcKey"   value="paFileDown"/>
	    <input type="hidden" name="trdp_cd" value=""/>
	    <input type="hidden" name="cntc_seq" value=""/>
	</form>
		
<script type="text/javascript">
doBtnAuthority(attr_extension);
</script>	
		
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	addTpTyCd();
	document.frm1.s_trdp_tp_cd.value = '<bean:write name="tmpMap" property="trdp_tp_cd"/>'; 
	document.frm1.s_tp_grp.value = '<bean:write name="tmpMap" property="tp_grp"/>'; 
	//document.frm1.grp_id_cd.value = '<bean:write name="tmpMap" property="grp_id_cd"/>';
	//document.frm1.cr_term_cd.value = '<bean:write name="tmpMap" property="cr_term_cd"/>';
	document.frm1.delt_flg.value = '<bean:write name="tmpMap" property="delt_flg"/>';
	document.frm1.s_sts_cd.value = '<bean:write name="tmpMap" property="sts_cd"/>';
	//document.frm1.s_sls_gp_cd.value = '<bean:write name="tmpMap" property="sls_gp_cd"/>';
</script>