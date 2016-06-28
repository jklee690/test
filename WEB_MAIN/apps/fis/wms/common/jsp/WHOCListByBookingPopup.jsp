<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOCListByBookingPopup.jsp
*@FileTitle  : OB Complete List(By Booking)
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/07/08
=========================================================--*/
%>

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
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHOCListByBookingPopup.js"></script>
    <script type="text/javascript" src="./js/common/message/KO/WMS_MSG.js"></script>
 	<script type="text/javascript" src="./js/common/message/EN/WMS_COM_MSG.js"></script>
<%
	String wob_bk_no = ""; //booking no
	try {
		wob_bk_no = request.getParameter("wob_bk_no")== null?"":request.getParameter("wob_bk_no");
		
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
<script type="text/javascript">
	var almightyFlag = false;
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
<input type="hidden" id="wob_bk_no" name="wob_bk_no" value="<%=wob_bk_no%>"/>

<div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="OB_Complete_List_By_Booking"/></span></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			 <button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onclick="doWork('CLOSE');"><bean:message key="Close"/></button><!-- 
		 --></div>
		<!-- opus_design_btn(E) -->
	</div>
</div>

<div class="layer_popup_contents">
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</div>
</form> 

<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>