<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RateHistoryPopup.jsp
*@FileTitle  : Rate History
*@author     : Tin.Luong Dou Network
*@version    : 1.0
*@since      : 2015/03/11
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
    <script type="text/javascript" src="./js/common/message/KO/WMS_MSG.js"></script>
	<script type="text/javascript" src="./js/common/message/EN/WMS_COM_MSG.js"></script> 	
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js"></script>
    
    <script type="text/javascript" src="./apps/fis/wms/common/js/RateHistoryPopup.js"></script>  
<%
	String ctrt_no = "";
	String sb_cls_cd = "";
	try {
		ctrt_no = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
		sb_cls_cd = request.getParameter("sb_cls_cd")== null?"":request.getParameter("sb_cls_cd");
	}catch(Exception e) {
		out.println(e.toString());
	}

%>
    
    <script type="text/javascript">    
<%-- 	<%=JSPUtil.getIBCodeCombo("ftr_mod", "", "FT1", "0", "")%>	 --%>
<%-- 	<%=JSPUtil.getIBCodeCombo("rate_filer", "", "FT2", "0", "")%> --%>
	</script>
	
<!-- <iframe id="_iFrameWait_" src="./web/images/common/processing.gif" frameborder="0" marginHeight="0" marginWidth="0" width="343" height="121" style="position:absolute;visibility:hidden;z-index:999;display:none;" ></iframe>                                                                                                                                                                                                                                              -->
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
<input type="hidden" name="f_cmd">
<input type="hidden" name="ctrt_no" value="<%=ctrt_no%>">
<input type="hidden" name="sb_cls_cd" value="<%=sb_cls_cd%>">
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>"/>
<input type="hidden" name="org_cd" value="<%= userInfo.getOfc_cd() %>" />
<div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="Rate_History"/></span></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		</div>
		<!-- opus_design_btn(E) -->	
	</div>
	<!-- page_title_area(E) -->
</div>
<div class="layer_popup_contents">
	<div class="wrap_result">
		<div id="selling" style="display:inline" >
        	<h3 class="title_design"><bean:message key="Selling_History"/></h3>
        </div>
        <div id="buyling" style="display:none" >  
        	<h3 class="title_design"><bean:message key="Buyling_History"/></h3>
        </div>
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid clear">
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
			<div class="opus_design_grid clear" id="Main" style="display:inline">
				<script type="text/javascript">comSheetObject('sheet2');</script>
			</div>
			<div class="opus_design_grid clear" id="Detail" style="display:inline">
				<script type="text/javascript">comSheetObject('sheet3');</script>
			</div>
		</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>