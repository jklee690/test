<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : CodeMaster.jsp
*@FileTitle  : 마스터코드 관리
*@Description: 마스터 코드 조회/등록/수정/삭제 시 사용되는 메소드임
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2008
*@since      : 08/07/2008

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />

	<!-- 해당 Action별 js -->
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/opusbase/system/systemcode/script/TopCodeMng.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
<script>
	function setupPage(){
       	loadPage();
    }
</script>

<form method="post" name="form" onSubmit="return false;">
	<input	type="hidden" name="f_cmd"> 
<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onclick="doWork('ROWADD')"><bean:message key="Add"/></button><!-- 
		--><button type="button" class="btn_normal" id="btnAdd" onclick="doWork('ADD')"><bean:message key="Save"/></button><!-- 
		--><button type="button" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<!-- wrap_result (S) -->
    <div class="wrap_result">
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
	<!-- wrap_result (E) -->
</form>
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);   
</script>