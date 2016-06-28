<%--
=========================================================
*@FileName   : CMM_POP_0060.jsp
*@FileTitle  : CMM
*@Description: user id search pop
*@author     : 이광훈 -  user id search  pop
*@version    : 1.0 - 01/06/2009
*@since      : 01/06/2009

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
    <title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js"></script>
	<script type="text/javascript" src="./apps/fis/sys/aut/user/script/CMM_POP_0060.js"></script>

<script>
function setupPage(){
	loadPage();
	doWork('SEARCHLIST');
}
</script>
	
<form name="form" method="POST" action="./">
		<!--Command를 담는 공통
		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="openMean"/>
	<div class="layer_popup_title">	
		<div class="page_title_area clear">
		   <h2 class="page_title"><span><bean:message key="User_Info"/></span></h2>
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')">Search</button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<!-- Search option -->
	    <div class="wrap_search">	
			<div class="opus_design_inquiry">
				<table>
					<tr>
						<th width="90px"><bean:message key="User_Name"/></th>
						<td width="150px"><input type="text" name="s_user_name" class="search_form" value="" dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:150" onKeyPress="fncTpCodeSearch()" maxlength="50"/></td>
						<th width="60px"><bean:message key="Office"/></th>
						<td><input type="text" name="s_office_name" maxlength="50" class="search_form" value="" dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:150" onKeyPress="fncTpCodeSearch()"/></td>
					    <th width="90px"><bean:message key="Status"/></th>
					    <td>
					        <select name="USE_YN">
                            	<option value="Y" SELECTED>Enable</option>
                            	<option value="N">Disable</option>
                            </select>
					    </td>
					</tr>
				</table>
			</div>
		</div>
	
		<div class="wrap_result">
	    	<div class="opus_design_grid">
		    	<script type="text/javascript">comSheetObject('sheet1');</script>
		    </div>
		</div>
	</div>
</form>
