<%--
=========================================================
*@FileName   : MGT_OPT_0010.jsp
*@FileTitle  : MAC Address Management
*@Description: MAC Address Management
*@author     : Kim,Jin-Hyuk - Cyberlogitec
*@version    : 1.0 - 2011/09/23
*@since      : 2011/09/23
*@Change history:
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js"></script>
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/opusbase/system/optconf/script/MGT_OPT_0010.js"></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>
	<bean:define id="mapVal" name="EventResponse" property="mapVal"/>
	<script language="javascript">
	function setupPage(){ 
		loadPage();
	}
	</script>
</head>
<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css">
<!--ajax 사용시 -->
<style type="text/css">
<!--
style1 {color: #CC0000}
-->
</style>

	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="work_flg"/>
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="f_Flag"/>
		
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="document.forms[0].f_CurPage.value='';doWork('SEARCHLIST')">Search</button><!-- 
		--><button type="button" class="btn_normal"  <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> id="btnSave" onclick="doWork('ROWADD')"><bean:message key="Add"/></button><!-- 
		--><button type="button" class="btn_normal"  <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> id="btnSave" onclick="doWork('SAVE')"><bean:message key="Save"/></button><!-- 
		--><!-- <button type="button" class="btn_normal" id="btnSave" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button> -->
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>	 
	
   	<div class="opus_design_grid">
   		<script type="text/javascript">comSheetObject('sheet1');</script>
   	</div>
    
	<!-- 52308 [COMMON] System Option Settings 에서 TB_SEQ 의 SYS_OFC_CD update 추가 -->
		<div class="opus_design_inquiry">	
			<table style="width:230px;">
				<tr>
					<th width="100px"><bean:message key="System_Office"/></th>
					<td>&nbsp;&nbsp;&nbsp;<input type="text" required name="f_sys_ofc_cd_pre_fix" id="f_sys_ofc_cd_pre_fix" maxlength="5"  value="<bean:write name="mapVal" property="sys_ofc_cd_pre_fix"/>"  style="width:55px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
					<td style="padding-top: 5px"><button type="button" class="btn_normal"  <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> id="btnSysOfcCdSave" onclick="doWork('SYSOFCCD_SAVE')"><bean:message key="Save"/></button></td>
				</tr>
			</table>
		</div>
</form>

<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
	</script>
