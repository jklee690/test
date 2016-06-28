<%
/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : ACC_SLP_0070.jsp
 *@FileTitle : Accounting Block / Unblock
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js"></script>
	<script type="text/javascript" src="./apps/fis/acc/slp/slip/script/ACC_SLP_0070.js" />
	
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
	%>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		function setupPage(){
			loadPage();
		}
	</script>
	
</head>
<base target="_self"/>
<form name="frm1" method="POST" action="./ACC_SLP_0070.clt">
<!--Command를 담는 공통 -->
<input type="hidden" name="f_cmd" id="f_cmd"/>
<input type="hidden" name="f_CurPage" id="f_CurPage"/>
<input type="hidden" name="f_range_flg" id="f_range_flg"/>

<input type="hidden" name="s_chk_block" id="s_chk_block"/>
<input type="hidden" name="action" id="action"/>
<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
   <div class="location">
	   <span><%=LEV1_NM%></span> &gt;
	   <span><%=LEV2_NM%></span> &gt;
	   <span><%=LEV3_NM%></span>
	   <a href="" class="ir">URL Copy</a>
   </div>
	
</div>
<!-- page_title_area(E) -->
<!-- wrap_search(S) -->
<div class="wrap_result">
<h3 class="title_design"><bean:message key="Accounting_Block_Unblock"/></h3>
<!-- opus_design_inquiry(S) -->
<div class="opus_design_inquiry wFit">
	<div class="opus_design_inquiry sm" style="width:305px;">
		<table>
			<tbody>
				<colgroup>
					<col width="80" />
					<col width="80" />
					<col width="*" />
				</colgroup>
				<tr>
					<th style="line-height: 27px;">Last Block Date : </th>
					<th style="line-height: 27px;" id="last_block_dt"></th>
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
	<table>
		<tbody>
			<colgroup>
				<col width="150" />
				<col width="150" />
				<col width="*" />
			</colgroup>
			<tr>
				<td><input type="radio" name="blk_chk" id="blk_chk1" onClick="chkBlock()" checked><label for="blk_chk1"><bean:message key="Block"/></label></td>
				<td><input type="radio" name="blk_chk" id="blk_chk2" onClick="chkBlock()"><label for="blk_chk2"><bean:message key="Unblock"/></label></td>
				<td></td>
			</tr>
		</tbody>
	</table>
	<table>
		<tbody>
			<colgroup>
				<col width="145" />
				<col width="*" />
			</colgroup>
			<tr>
				<th style="line-height: 40px; text-align: left" id="blk_title"><bean:message key="Block_ALL_Data_Until"/></th>
				<th style="line-height: 40px; text-align: left; display:none;" id="unblk_title"><bean:message key="Unblock_ALL_Data_After"/></th>
				<td><input type="text" name="s_block_dt" id="s_block_dt" required value="" style="width:70px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" maxlength="10" class="search_form"><button type="button" onclick="doDisplay('DATE1', frm1);" id="s_blockdt_cal" name="s_blockdt_cal" class="calendar" tabindex="-1"></button><button type="button" onclick="doWork('COMMAND01')"  class="btn_etc"><bean:message key="Apply"/></button></td>
			</tr>
		</tbody>
	</table>
</div>
<!-- opus_design_inquiry(E) -->
</div>
<!-- wrap_search(E) -->

<!-- wrap_result(S) -->
<div class="wrap_result">
<!-- opus_design_grid(S) -->
<div class="opus_design_grid">
	<script type="text/javascript">comSheetObject('sheet1');</script>
</div>
<!-- opus_design_grid(E) -->
</div>
<!-- wrap_result(E) -->	
	
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
		
</form>