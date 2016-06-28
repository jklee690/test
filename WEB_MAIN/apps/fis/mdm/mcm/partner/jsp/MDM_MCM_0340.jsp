<%--
=========================================================
*@FileName   : MDM_MCM_0010.jsp
*@FileTitle  : Continent Code
*@Description: Continent Code
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/07/2009
*@since      : 01/07/2009

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 10/06/2014
*@since      : 10/06/2014
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mdm/mcm/partner/script/MDM_MCM_0340.js"></script>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>
<script>
function setupPage(){
	loadPage();
}
</script>
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
        
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <div class="opus_design_btn"><!--
	   --><button type="button" class="btn_accent" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="doWork('SEARCHLIST')">Search</button><!--
	   --><button type="button" class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button><!--
	   --><button id="btnModify" type="button" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> class="btn_normal" onclick="doWork('MODIFY')"><bean:message key="Save"/></button>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>

	<div class="wrap_result">
    	<div class="opus_design_grid">
	    	<h3 class="title_design mar_btm_8"><bean:message key="Other_Operation_Code_List"/></h3>
	    	<script language="javascript">comSheetObject('sheet1');</script>
	    </div>
	</div>
</form>

<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
	</script>	
