<%--
=========================================================
*@FileName   : MGT_MAC_0010.jsp
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
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mgt/mac/address/script/MGT_MAC_0010.js"></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
// 		var PARAM1_1 = '';
// 		var PARAM1_2 = '';

// 		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

<%-- 		<% boolean isBegin = false; %> --%>
//     	<!--Bound Class Code 코드조회-->
// 		<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
// 		<logic:iterate id="codeVO" name="param1List">
<%-- 			<% if(isBegin){ %> --%>
// 				PARAM1_1+= '|';
// 				PARAM1_2+= '|';
<%-- 			<% }else{ --%>
// 			  	isBegin = true;
<%-- 		   	} %> --%>
// 			PARAM1_1+= '<bean:write name="codeVO" property="cd_nm"/>';
//         	PARAM1_2+= '<bean:write name="codeVO" property="cd_val"/>';
//     	</logic:iterate>
	</script>
	
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
		--><button type="button" class="btn_normal"  <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> id="btnSave" onclick="doWork('SAVE')"><bean:message key="Save"/></button><!-- 
		--><button type="button" class="btn_normal" id="btnSave" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
		
	<div class="wrap_search">	
		<div class="opus_design_inquiry wFit">
					<table>
						<colgroup>
							<col width="40">
							<col width="120">
							<col width="40">
							<col width="*">
						</colgroup>
                        <tr>
                           <th><bean:message key="Date"/></th>
							<td><!-- 
							 --><input type="text" name="f_strdt" id="f_strdt" value='' dataformat="excepthan" style="width:75px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1)" onBlur="mkDateFormatType(this, event, true,1)" class="search_form"><!-- 
							 --><button type="button" id="f_dt_cal" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button>
						</td>
						<th>Use</th>
						<td> 
							 <select name="f_use_flg" styleClass="search_form" style="width=55px;">
								 	<option value=''>ALL</option>
								 <logic:iterate id="codeVO" name="param1List">
									 <option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
								 </logic:iterate>
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
</form>


<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
	</script>
