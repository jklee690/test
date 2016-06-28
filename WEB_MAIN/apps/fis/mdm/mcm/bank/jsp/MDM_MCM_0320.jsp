<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0320.jsp
*@FileTitle  : Bank Setup
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/10
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mdm/mcm/bank/script/MDM_MCM_0320.js"></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

		var gl_cd = ' |';
		var check_form = ' |';
		var check_form_nm = ' |';
		
		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

		<% boolean isBegin = false; %>
	    <!-- GL Code 코드조회-->
		<bean:define id="param1List"  name="rtnMap" property="GL_CODE"/>
		<logic:iterate id="codeVO" name="param1List">
			<% if(isBegin){ %>
			gl_cd+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   gl_cd+= '<bean:write name="codeVO" property="gl_cd"/>';
	    </logic:iterate>
	    
	    <% isBegin = false; %>
	    <!-- check form 코드조회-->
<%
	if(((java.util.HashMap)rtnMap).get("CHECK_FORM") != null ){
%>
		<bean:define id="param3List"  name="rtnMap" property="CHECK_FORM"/>
		<logic:iterate id="codeVO" name="param3List">
			<% if(isBegin){ %>
			check_form+= '|';
			check_form_nm+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   check_form+= '<bean:write name="codeVO" property="cd_nm"/>';
			   check_form_nm+= '<bean:write name="codeVO" property="cd_nm"/>';
	    </logic:iterate>
<%	
	}
%>	    
		var curr_cd = ' ';
	    <!-- Currency Code 코드조회-->
		<bean:define id="param2List"  name="rtnMap" property="CURR_CODE"/>
		<logic:iterate id="currCd" name="param2List">
	   curr_cd+= '|<bean:write name="currCd"/>';
	    </logic:iterate>
	    function setupPage(){
			loadPage();
		}
	</script>
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" id="f_cmd" name="f_cmd"/> 
	<input type="hidden" id="f_CurPage" name="f_CurPage"/>
	<input type="text" id="focus_obj" name="focus_obj" style="height:1px; width:1px; border: 0px"> 

  <!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		
		<!-- btn_div -->
	   <div class="opus_design_btn"><!-- 
	     --><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>">Search</button><!--
	     --><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('ROWADD');">Add</button><!--
	     --><button type="button" class="btn_normal" id="btnModify" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('MODIFY')">Save</button>
	   </div>
	   <!-- btn_div -->
   
 			<!-- page_location(S) -->
		<div class="location">	
			 <span><%=LEV1_NM%></span> &gt;
		 	 <span><%=LEV2_NM%></span> &gt;
		  	 <span><%=LEV3_NM%></span>
	   		<a href="" class="ir">URL Copy</a>
		</div>
		<!-- page_location(E) -->
	</div>

	<div class="wrap_result">
        <h3 class="title_design"><bean:message key="Bank_List"/></h3>
		<div class="opus_design_grid">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
	<!-- grid_area(E) -->
	</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	