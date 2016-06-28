<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHICListPopup.jsp
*@FileTitle  : IB Complete List
*@author     : Kieu.Le
*@version    : 1.0
*@since      : 2015/05/26
=========================================================*/
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHICListPopup.js"></script>
<%
	
	String wib_bk_no = ""; //booking no
	try {
		wib_bk_no = request.getParameter("wib_bk_no")== null?"":request.getParameter("wib_bk_no");
		System.out.println(wib_bk_no);
		
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
<input type="hidden" id="f_cmd" value="0" />
<input type="hidden" id="wib_bk_no" name="wib_bk_no" value="<%=wib_bk_no%>"/>

<div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
	
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="IB_Complete_List"/></span></h2>
		<!-- page_title(E) -->
					
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		</div>
		<!-- opus_design_btn(E) -->	
	
		<!-- page_location(S) -->
		<div class="location">	
			<span id="navigation"></span>
		</div>
		<!-- page_location(E) -->
		
	</div>
	<!-- page_title_area(E) -->
</div>

<div class="layer_popup_contents">
	<div class="wrap_result">
		<div class="opus_design_grid clear">
			<script type="text/javascript">
				comSheetObject('sheet1');
			</script>
		</div>
	</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>