<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   :  MDM_MCM_0160.jsp
*@FileTitle  :  Freight Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/06
=========================================================*/
%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js"></script>
	<script type="text/javascript" src="./apps/fis/mdm/code/freight/script/MDM_MCM_0160.js"></script>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

		<!-- 처리시 메시지 -->
		var CNF_MSG1 = '<bean:message key="Do_you_want_to_run"/>';
		var PARAM1_1 = ' |';
		var PARAM1_2 = ' |';
		var PARAM2_1 = ' |';
		var PARAM2_2 = ' |';
		var PARAM3_1 = ' |';
		var PARAM3_2 = ' |';
		var PARAM4_1 = ' |';
		var PARAM4_2 = ' |';
		var PARAM5_1 = ' |';
		var PARAM5_2 = ' |';

		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

		<% boolean isBegin = false; %>
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

		<% isBegin = false; %>
		<bean:define id="param2List"  name="rtnMap" property="PARAM2"/>
		<logic:iterate id="codeVO" name="param2List">
			<% if(isBegin){ %>
				PARAM2_1+= '|';
				PARAM2_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM2_1+= '<bean:write name="codeVO" property="cd_nm"/>';
	        PARAM2_2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>

	    <% isBegin = false; %>
	    <bean:define id="param3List"  name="rtnMap" property="PARAM3"/>
		<logic:iterate id="codeVO" name="param3List">
			<% if(isBegin){ %>
				PARAM3_1+= '|';
				PARAM3_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM3_1+= '<bean:write name="codeVO" property="cd_nm"/>';
	        PARAM3_2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>

	    <% isBegin = false; %>
	    <bean:define id="param4List"  name="rtnMap" property="GL_CODE"/>
		<logic:iterate id="glVO" name="param4List">
			<% if(isBegin){ %>
				PARAM4_1+= '|';
				PARAM4_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM4_1+= '<bean:write name="glVO" property="gl_cd"/>' + ' [' + '<bean:write name="glVO" property="rmk"/>' + ']';
	        PARAM4_2+= '<bean:write name="glVO" property="gl_cd"/>';
	    </logic:iterate>


	    <% isBegin = false; %>
	    <bean:define id="param5List"  name="rtnMap" property="PARAM4"/>
		<logic:iterate id="codeVO" name="param5List">
			<% if(isBegin){ %>
				PARAM5_1+= '|';
				PARAM5_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM5_1+= '<bean:write name="codeVO" property="cd_nm"/>';
	        PARAM5_2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>
	
	function setupPage(){
		loadPage();
	}

	</script>
 <form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	<input type="hidden" name="trdp_cd" id="trdp_cd" />
	
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><span id="title"><%=LEV3_NM%></span></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button style="cursor:hand;display:none;" btnAuth="<%= roleBtnVO.getAttr1()%>" type="button" class="btn_accent" onclick="doWork('SEARCHLIST')" ><bean:message key="Search" /></button><!-- 
		--><button style="cursor:hand;display:none;" btnAuth="<%= roleBtnVO.getAttr3()%>" type="button" class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button><!-- 
		--><button id="btnModify" style="cursor:hand;display:none;" btnAuth="<%= roleBtnVO.getAttr3()%>" type="button" class="btn_normal" onclick="doWork('MODIFY')"><bean:message key="Save"/></button><!-- 
		--><button id="btnExcel" style="cursor:hand;display:none;"  btnAuth="<%= roleBtnVO.getAttr6() %>"  type="button" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>		
		</div>
		<!-- opus_design_btn(E) -->
	
		<!-- page_location(S) -->
		<div class="location">	
			<span><%=LEV1_NM%></span> &gt;
		    <span><%=LEV2_NM%></span> &gt;
		    <span><%=LEV3_NM%></span>
		    <a href="" class="ir">URL Copy</a>
		</div>
		<!-- page_location(E) -->
			
	</div>
	<!-- page_title_area(E) -->
	
	<!-- opus_design_inquiry(S) -->
	<div class= "wrap_search">
	<div class="opus_design_inquiry wFit">
		<table>
			<colgroup>
				<col width="40">
				<col width="90">
				<col width="120">
				<col width="190">
  				<col width="75">
				<col width="120">
				<col width="110">
				<col width="*">
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Code"/></th>
					<td >
						<input type="text" name="s_bill_cd" maxlength="10" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" onKeyPress="fncSearch('uppernum','45|47')" id="s_bill_cd" />
						</td>
					<th><bean:message key="Name_English_Local" /></th>	
					<td>
						<input type="text" name="s_bill_nm" maxlength="100" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180px;" onKeyPress="fncSearch()" id="s_bill_nm" />
						</td>
					<th><bean:message key="GL_Code"/></th>
					<td >
							<input type="text" name="s_gl_cd" maxlength="10" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="fncSearch('uppernum')">
							</td>
					<th><bean:message key="GL_Description"/></th>
					<td>
							<input type="text" name="s_gl_nm"  maxlength="100" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180px;" onKeyPress="fncSearch()">
							</td>	
					<td></td>	
				</tr>
			</tbody>
		</table>
	</div>
	<!-- opus_design_inquiry(E) -->
	</div>
	
	<div>
		<table>
			<tr height="12px"></tr>
			<tr>
				<th style="color: red;" align="left">&nbsp;&nbsp;&nbsp;* Modifying current Billing Codes and G/L Codes in the system may cause discrepancies in accounting figures.</th>
			</tr>
			<tr>
				<th style="color: red;" align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please contact an OPUS Forwarding consultant before making this change at opusforwarding@cyberlogitec.com.</th>
			</tr>
		</table>
	</div>
	
	<!-- opus_design_grid(S) -->
	<div class="wrap_result">
		<div class="opus_design_grid "id="mainTable">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
	<!-- opus_design_grid(E) -->   
     <table>
	   <tr>
	    <td width="55px">
	     <!--- Display option Begin --->
	       <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
	       <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
	       <paging:options name="pagingVal" defaultval="200"/>
	     <!--- Display option End --->                 
	    </td>
	    <td>
	     <td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
	    </td>
	   </tr>
      </table>
	</div>
	
</form>	
<script type="text/javascript">

		doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");

</script>