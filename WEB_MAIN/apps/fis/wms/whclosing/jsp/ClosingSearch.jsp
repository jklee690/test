<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ClosingSearch.jsp
*@FileTitle  : W/H Closing Search
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/14
=========================================================--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js"></script>
    <script type="text/javascript" src="./apps/fis/wms/whclosing/script/ClosingSearch.js"></script>
	<script type="text/javascript" src="./js/common/message/KO/WMS_MSG.js"></script>
	<script type="text/javascript" src="./js/common/message/EN/WMS_COM_MSG.js"></script>
<%

String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD  = userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM  = userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();
String DEF_ORG_CD		= request.getParameter("org_cd")== null?"":request.getParameter("org_cd");
String DEF_ORG_NM		= request.getParameter("org_nm")== null?"":request.getParameter("org_nm");

String req_search_no   = "";
String req_search_tp   = "";
String wh_nm = "";
String ctrt_nm = "";
String loc_cd 		= "";
String loc_nm 		= "";
String wh_cd 		= "";
String ctrt_no 		= "";
String prop_date_fm 		= "";
String prop_date_to 		= "";

try {
	req_search_no   = request.getParameter("search_no")== null?"":request.getParameter("search_no");
	req_search_tp   = request.getParameter("search_tp")== null?"":request.getParameter("search_tp");
	
}catch(Exception e) {
	out.println(e.toString());
}	


%>
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="rate_tp_cd" name="cdMap" property="rate_tp_cd"/>
<bean:define id="sts_cd" name="cdMap" property="sts_cd"/>
<bean:define id="wh_combo" name="cdMap" property="wh_combo"/>
<script type="text/javascript">
	var rate_tp_cdCode = "";
	var rate_tp_cdText = "";
	
	var sts_cdCode = "";
	var sts_cdText = "";
	
	var wh_comboCode = "";
	var wh_comboText = "";
	
	<logic:iterate id="codeVO" name="rate_tp_cd">
		rate_tp_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
		rate_tp_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
	</logic:iterate>
	
	<logic:iterate id="codeVO" name="sts_cd">
		sts_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
		sts_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
	</logic:iterate>
	
	<logic:iterate id="ClosingSearchVO" name="wh_combo">
		wh_comboCode+= '<bean:write name="ClosingSearchVO" property="wh_cd"/>' + '|';
		wh_comboText+= '<bean:write name="ClosingSearchVO" property="wh_nm"/>' + '|';
	</logic:iterate>
</script>
<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
	</script>
<form id="form" name="form">
<input type="hidden" id="f_cmd"/> 
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="user_nm" value="ADMINISTRATION_DOU." />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="org_nm" value="<%=userInfo.getOfc_eng_nm()%>">
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><span id="bigtitle"><%=LEV3_NM%></span></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('EXCEL');" style="display: none;" btnAuth="<%= roleBtnVO.getAttr6() %>"><bean:message key="Excel_D/L"/></button>
		</div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		<div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span> 
		   <a href="" class="ir">URL Copy</a> 
	   </div>
		<!-- page_location(E) -->
	</div>
	
	<!-- opus_design_inquiry(S) -->
	<div class="wrap_search">
		<div class="opus_design_inquiry wFit">
			<table>
				<colgroup>
					<col width="50">
					<col width="190">
					<col width="185">
					<col width="150">
					<col width="185">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Office"/></th>
						<td><input name="ofc_cd" id="ofc_cd" type="text" value="<%=DEF_ORG_CD%>" class="L_input" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);codeNameAction('office','onBlur');" maxlength="10" onkeypress="if(event.keyCode==13){codeNameAction('office', 'onKeyDown');}"/><!--
						--><button type="button" name="btn_ofc_cd" id="btn_ofc_cd" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_ofc_cd');"></button><!--
						--><input name="ofc_nm" id="ofc_nm" type="text" value="<%=DEF_ORG_NM%>" class="L_input_R" style="width:112px;" readonly /></td>
						<th><bean:message key="Contract_No"/></th>
						<td><input name="ctrt_no" id="ctrt_no" type="text" value="<%=DEF_WH_CTRT_NO%>" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);searchTlCtrtInfo();" maxlength="10" OnKeyDown="if(event.keyCode==13){CtrtPopup();}"/><!--
						--><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_ctrt_no');"></button><!--						
						--><input name="ctrt_nm" id="ctrt_nm" type="text" value="<%=DEF_WH_CTRT_NM%>" class="L_input" style="width:122px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}"/>
							</td>
						<th><bean:message key="Billing_Customer"/></th>
						<td><input name="cust_cd" id="cust_cd" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);codeName('CUSTUMER',this, 'onBlur');" maxlength="10" onkeypress="if(event.keyCode==13){codeName('CUSTUMER',this, 'onKeyDown');}"/><!--
						--><button type="button" name="btn_cust_cd" id="btn_cust_cd" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_cust_cd');"></button><!--
						--><input name="cust_nm" id="cust_nm" type="text" class="L_input" style="width:122px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="50" onKeyDown="if(event.keyCode==13){CustomerPopup();}" />
						</td>
					</tr>
					<tr>
						<th><bean:message key="Closing_No"/></th>
						<td><input name="item_cd" otherchar = "-_" id = "item_cd" type="text" class="L_input" style="width:215px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="14" /></td>
						<th><bean:message key="Closing_Month"/></th>
						<td><input name="fm_cls_date" type="text" maxlength="7" style="width:80px;" id="fm_cls_date" onkeypress="onlyNumberCheck();" onblur="checkDateType(this,this,3,form.to_cls_date)" onkeyup="addSeperator(this, event, false,1)" required><!-- 
							 --><button class="calendar" type="button" name="btn_fm_cls_date" id="btn_fm_cls_date" onClick="doWork('btn_fm_cls_date');"></button><!-- 
							 --><span class="dash">~</span><!-- 
							 --><input name="to_cls_date" type="text" maxlength="7" style="width:80px;"  id="to_cls_date" onkeypress="onlyNumberCheck();" onblur="checkDateTypes(this,this,3,form.fm_cls_date)" onkeyup="addSeperator(this, event, false,1)" required><!-- 
							 --><button class="calendar" type="button" name="btn_to_cls_date" id="btn_to_cls_date" onClick="doWork('btn_to_cls_date');"></button>
						</td>
						<th><bean:message key="Warehouse"/></th>
						<td>
							<select name="wh_combo" id="wh_combo" style="width: 235px;">
			        			
             				</select>
						</td>
					</tr>
					<tr>
						<th><bean:message key="SELL/BUY"/></th>
 						<td>
							<select id="sb_cls_cd" name="sb_cls_cd" style="width: 70px;">
								<option value="ALL">ALL</option>
								<option value="S">SELL</option>
								<option value="B">BUY</option>
							</select>
						</td>
						<th><bean:message key="Type"/></th>
						<td>
							<select name="rate_tp_cd" id="rate_tp_cd" style="width: 80px;">
			        			
             				</select>
						</td>
						<th><bean:message key="Status"/></th>
						<td>
							<select name="sts_cd" id="sts_cd" style="width: 80px;">
			        			
             				</select>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- opus_design_inquiry(E) -->
	
	<div class="wrap_result">
		<div class="opus_design_grid clear">
			<script type="text/javascript">comSheetObject('sheet1');</script>
			
		</div>
	</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
