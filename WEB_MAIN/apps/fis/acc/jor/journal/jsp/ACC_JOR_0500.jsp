<%--
=========================================================
*@FileName   : ACC_JOR_0500.jsp
*@FileTitle  : Deposit Journal POPUP
*@Description: Deposit Journal POPUP
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/02/15
*@since      : 2012/02/15

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	
	<base target="_self"/>
	
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js"></script>
	<script language="javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0500.js"></script>
	
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
	%>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		function setupPage() {
			loadPage();
		}
	</script>
	
	
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>

<form name="frm1" method="POST" action="./ACC_JOR_0500.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="f_jnr_tp" 		value=""/>
	<input type="hidden" name="f_curr_cd" 		value=""/>
	<input type="hidden" name="f_call_val" 		value=""/>
	<div class="layer_popup_title">
		<!-- Button -->
		<div class="page_title_area clear">
		   <h2 class="page_title">Invoice List</h2>
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="document.frm1.f_CurPage.value='';doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('APPLY')"><bean:message key="Apply"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_search">	
			<div class="opus_design_inquiry">
				<table>
					<colgroup>
						<col width="128px"></col>
						<col width="306px"></col>
						<col width="128x"></col>
						<col width="306px"></col>
						<col width="283px"></col>
						<col></col>
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Customer"/></th>
		                    <td><!--
		                     --><input type="text" name="s_cust_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px" onKeyDown="codeNameAction('CUSTOMER',this, 'onKeyDown')" onBlur="codeNameAction('CUSTOMER',this, 'onBlur')" class="search_form"><!--
		                     --><button type="button" class="input_seach_btn" tabindex="-1" id="customer" onclick="doWork('CUSTOMER_POPLIST')"></button><!--
		                     --><input type="text" name="s_cust_nm" maxlength="50" value="" onKeyDown="custEnterAction(this,'CUSTOMER')" style="width:180px" class="search_form">
		                    </td>
		                    <th><bean:message key="Invoice_No"/></th>
	                        <td>
	                            <input type="text" name="s_inv_no" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:165px" class="search_form">
	                        </td>
		                    <th align="right"><input type="radio" name="his_chk" id="his_chk1" value="A"><label for="his_chk1"><bean:message key="All"/></label> &nbsp;<input type="radio" name="his_chk" id="his_chk2" value="O" checked><label for="his_chk2"><bean:message key="Open"/></label> &nbsp;</th>
						</tr>
						<tr>
	                        <th><bean:message key="Office"/></th>
							<td>
								<bean:define id="oficeList" name="valMap" property="ofcList"/>
								<select name="s_ofc_cd" style="width:99px;"/>
								<bean:size id="len" name="oficeList" />
								<logic:greaterThan name="len" value="1">
									<option value=''>ALL</option>
								</logic:greaterThan>
								<logic:iterate id="ofcVO" name="oficeList">
									<logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
		                            	<option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
		                         	</logic:equal>
		                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
		                            	<option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
		                         	</logic:notEqual>
								</logic:iterate>
								</select>
							</td>
	                        <th><bean:message key="Post_Date"/></th>
							<td>
								<input style="width:75px;" type="text" name="s_post_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(ComGetEvent('keycode')==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_post_enddt);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!-- 
							 --><span class="dash">~</span><!-- 
							 --><input style="width:75px;" type="text" name="s_post_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(ComGetEvent('keycode')==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_post_strdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!-- 
							 --><button type="button" class="calendar ir" name="s_post_dt_cal" id="s_post_dt_cal"  onclick="doDisplay('DATE1', frm1);"></button>
							</td>
	                        <th><label for="dept_chk1"><bean:message key="Local"/></label> <input type="checkbox" name="dept_chk1" id="dept_chk1" value="1" checked><label for="dept_chk2"><bean:message key="CR_DB"/></label> <input type="checkbox" name="dept_chk2" id="dept_chk2" value="2" checked><label for="dept_chk3"><bean:message key="AP"/></label>   <input type="checkbox" name="dept_chk3" id="dept_chk3" value="3" checked></th>
	                        <td class="table_search_body">
	                            <input type="hidden" name="s_v_inv_no" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px" class="search_form">
	                        </td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	    
	    <div class="wrap_result" id="mainTable">
	    	<div class="opus_design_grid">
	    		<script language="javascript">comSheetObject('sheet1');</script>
	    	</div>
	    	<table width="1200" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td width="40px">
				    	<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
						<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
						<paging:options name="pagingVal" defaultval="200"/>
					</td>
					<td align="center">
				        <table>
							<tr>
								<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
								</td>
							</tr>
						</table>
					</td>
					<td width="40px" height="10" colspan="2" align="right">&nbsp;
					</td>
				</tr>
			</table>
	    </div>
	</div>
</form>
