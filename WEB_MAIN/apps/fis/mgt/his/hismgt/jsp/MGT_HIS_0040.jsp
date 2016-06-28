<%--
=========================================================
*@FileName   : MGT_HIS_0040.jsp
*@FileTitle  : RD History
*@Description: Searching RD History
*@author     : jsjang - Cyberlogitec
*@version    : 1.0 - 2013/08/22
*@since      : 2013/08/22
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mgt/his/hismgt/script/MGT_HIS_0040.js"></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		var PARAM1_1 = '';
		var PARAM1_2 = '';

		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

		<% boolean isBegin = false; %>
    	<!--Bound Class Code 코드조회-->
		<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
		<logic:iterate id="codeVO" name="param1List">
			<% if(isBegin){ %>
				PARAM1_1+= '|';
				PARAM1_2+= '|';
			<% }else{
			  	isBegin = true;
		   	} %>
			PARAM1_1+= '<bean:write name="codeVO" property="cd_nm"/>';
        	PARAM1_2+= '<bean:write name="codeVO" property="cd_val"/>';
    	</logic:iterate>
    	
    	function setupPage(){
        	loadPage();
        }
    	
    	$(document).ready(function(){			
// 			$("form:not(.filter) :input[type='text']:visible:enabled:first").focus();
			frm1.f_his_type.focus();
		});
	</script>
</head>
<!--ajax 사용시 -->
<style type="text/css">
<!--
style1 {color: #CC0000}
-->
</style>
	<bean:parameter name="s_bl_inv" id="c_bl_inv"  value= ""/>
	<bean:parameter name="his_call_view" id="c_his_call_view"  value= ""/>
	<bean:parameter name="f_cmd" id="s_f_cmd"  value= ""/>
	<bean:parameter name="p_gb" id="p_gb"  value= ""/>


	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" value="<bean:write name="s_f_cmd"/>"/>
	<input type="hidden" name="p_gb" value="<bean:write name="p_gb"/>"/>
	<input type="hidden" name="work_flg"/>
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="f_Flag"/>
		
    <!-- 타이틀, 네비게이션 -->
    <div class="layer_popup_title">
    <!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title" id="pageTitleMain" style="display:none;"><button type="button"><%=LEV3_NM%></button></h2>
	   <h2 class="page_title" id="pageTitlePop" style="display:none;">Email/Fax/Print History</h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent"  onclick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal" id="btnClose" onclick="doWork('CLOSE');" style="cursor:hand; display:none;"><bean:message key="Close"/></button>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	</div>
	<div>
	<!-- wrap_search (S) -->
	<div class="wrap_search">	
		<div class="opus_design_inquiry wFit">
			<table border="0" cellpadding="0" cellspacing="0">
              <tr>
				<th><bean:message key="Type"/></th>
				<td><!-- 
				 --><select name="f_his_type" styleClass="search_form" style="width=55px;"><!-- 
				  --><option value=''>ALL</option><!-- 
				  --><logic:iterate id="codeVO" name="param1List"><!-- 
				  	--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!-- 
				  --></logic:iterate><!-- 
				  --></select></td>
				<th><bean:message key="Screen_Name"/></th>
				<td><input type="text" name="his_call_view" class="search_form" style="width:100px;" value="<bean:write name="c_his_call_view"/>"></td>
				<th><bean:message key="BL_No"/> , <bean:message key="Invoice_No"/></th>
				<td><input type="text" name="s_bl_inv" class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:125;" value="<bean:write name="c_bl_inv"/>"></td>													
				<th><bean:message key="Issued_By"/></th>
				<td><input type="text" name="s_eng_name" class="search_form" style="width:125px;" ></td>	
                <th><bean:message key="Date"/></th>
				<td class="table_search_body"><!-- 
				 --><input type="text" name="s_rgst_tms" value='' dataformat="excepthan" style="width:75px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1)" onBlur="mkDateFormatType(this, event, true,1)" class="search_form"><!-- 
				 --><button type="button" class="calendar ir" onclick="doDisplay('DATE1', frm1.s_rgst_tms);"></button><!-- 
				 -->~ <!-- 
				 --><input type="text" name="e_rgst_tms" value='' dataformat="excepthan" style="width:75px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" class="search_form"><!-- 
				 --><button type="button" class="calendar ir" onclick="doDisplay('DATE1', frm1.e_rgst_tms);"></button></td>								
              </tr>
            </table>
		</div>
	</div>
	<!-- wrap_search (E) -->
	
	<!-- wrap_result (S) -->
    <div class="wrap_result">
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
	<!-- wrap_result (E) -->
	</div>
	</form>
	          
<iframe name="ifrm1" src="" frameborder="0" scrolling="no" width="0" height="0"></iframe>
<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="hisFileDown"/>
    <input type="hidden" name="filePath" value=""/>	
    <input type="hidden" name="fileNm" value=""/>
</form>	