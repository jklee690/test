<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<bean:parameter id="fileName" name="file_name"/>
	<bean:parameter id="rdParam" name="rd_param"/>
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_RD_0070.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/rd/rdviewer50u.js"></script>

	<script>
		var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
		function setupPage(){
			loadPage();
		}
	</script>	

<form method="post" name="frm1" onSubmit="return false;">
	
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="fileName" value='<bean:write name="fileName"/>'/>
	<input type="hidden" name="rdParam" value='<bean:write name="rdParam"/>'/>	
	<input type="hidden" name="filePath" value=""/>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="rdPdfFileDown"/>
    <input type="hidden" name="filePath" value=""/>	
    <input type="hidden" name="fileNm" value=""/>
</form>	