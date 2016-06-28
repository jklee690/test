<%-- 
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0050.jsp
*@FileTitle  : General Journal 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/14
=========================================================*/
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js"></script>
	<script type="text/javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0050.js" />
	
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
		String userId = userInfo.getUsrid();
		String ofcCnt = userInfo.getOfc_cnt_cd();
		String ofcCd  = userInfo.getOfc_cd();
	%>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>
	
	
	<bean:define id="valMap" 	name="EventResponse" property="mapVal"/>
	<bean:define id="ofcVO" 	name="valMap" property="ofcInfo"/>
	<bean:define id="bankSel"  	name="valMap" property="bankSel"/>
	<bean:define id="f_slip_no" name="valMap" property="f_slip_no"/>
	<bean:define id="ofcInfo"  	name="valMap" property="ofcInfo"/>
	<bean:define id="btnRole"   name="valMap" property="btnRole"/>
	
	<script>
		function setSelection(){
			
			frm1.f_curr_cd.value   = '<bean:write name="ofcVO" property="trf_cur_cd"/>';
			frm1.old_curr_cd.value = '<bean:write name="ofcVO" property="trf_cur_cd"/>';
			frm1.f_slip_no.value   = '<bean:write name="f_slip_no"/>';
			
			frm1.s_ofc_cd.value = '<bean:write name="ofcInfo" property="ofc_cd"/>';
			
		}
		var btn_role3 = '<bean:write name="btnRole" property="attr3"/>';
		var btn_role4 = '<bean:write name="btnRole" property="attr4"/>';
		
		<!-- OFC_CD -->
		var OFCCD = '';
		
        <logic:notEmpty name="valMap" property="ofcList">
			<% boolean isBegin = false; %>
            <bean:define id="ofcList" name="valMap" property="ofcList"/>
            <logic:iterate id="ofcVO" name="ofcList">
                <% if(isBegin){ %>
                       OFCCD += '|';
                <% }else{
                       isBegin = true;
                   } %>
                OFCCD+= '<bean:write name="ofcVO" property="ofc_cd"/>';
            </logic:iterate>
        </logic:notEmpty>
        
        var CURRCD = '';
        <logic:notEmpty name="valMap" property="currList">
			<% boolean isBegin2 = false; %>
	        <bean:define id="currList" name="valMap" property="currList"/>
	        <logic:iterate id="currVO" name="currList">
	            <% if(isBegin2){ %>
	                   CURRCD += '|';
	            <% }else{
	                   isBegin2 = true;
	               } %>
	            CURRCD+= '<bean:write name="currVO"/>';
	        </logic:iterate>
    	</logic:notEmpty>
    	
    	
    	var GLCD   = '';
    	var GLDESC = '';
        <logic:notEmpty name="valMap" property="glList">
			<% boolean isBegin3 = false; %>
	        <bean:define id="glList" name="valMap" property="glList"/>
	        <logic:iterate id="glVO" name="glList">
	            <% if(isBegin3){ %>
	            	   GLCD   += '|';
	            	   GLDESC += '|';
	            <% }else{
	                   isBegin3 = true;
	               } %>
	            GLCD   += '<bean:write name="glVO" property="gl_cd"/>';
	            GLDESC += '<bean:write name="glVO" property="gl_desc"/>' ;
	        </logic:iterate>
    	</logic:notEmpty>
        function setupPage()
        {
        	setSelection();loadPage();
        }
	</script>
	
	<form name="frm1" method="POST" action="./ACC_JOR_0050.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"  id="f_cmd"/>
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	
	<input type="hidden" name="f_slip_no" 	id="f_slip_no"		value=""/>
	
	<input type="hidden" name="old_curr_cd"	id="old_curr_cd"			value=""/>
	<input type="hidden" name="ofc_cnt"		id="ofc_cnt"			value="<%=ofcCnt%>"/>
	
	<input type="hidden" name="file_name" 	id="file_name" 		value=""/>
	<input type="hidden" name="rd_param"  	id="rd_param"		value=""/>
	<input type="hidden" name="title"    	id="title"		value=""/>
	<input type="hidden" name="proc_userid" id="proc_userid"		value="<%=userId%>"/>
	
	<input type="hidden" name="h_ofc_cd" 	id="h_ofc_cd"	value="<bean:write name="ofcInfo" property="ofc_cd"/>"/>
	
	<!-- BALANCE 금액이 O 이 아닌데이터 -->
	<input type="hidden" name="his_chk"    	id="his_chk"		value="O"/>
	<!--  LHK, 20131025 #21734  [BINEX]Post Date Check 로직 적용으로 추가	-->
	<input type="hidden" name="f_old_date"    		value=""/>
<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><span id="title"><%=LEV3_NM%></span></button></h2>
	<!-- page_title(E) -->
	
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" id="saveBtn2" name="saveBtn2"><button type="button" class="btn_accent"  onclick="doWork('MODIFY')" id="btnModify" name="btnModify"  ><bean:message key="Save"/></button></span><!-- 
		 --><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>" id="deleteBtn2" name="deleteBtn2"><button type="button" class="btn_normal" onclick="doWork('DELETE')" id="btnDelete" name="btnDelete" ><bean:message key="Delete"/></button></span><!-- 
		 --><span style="display:none;" btnAuth="COPY" id="copyBtn02" name="copyBtn02"><button type="button" class="btn_normal" style="display:none;" onclick="doWork('COPY')" id="btnCopy" name="btnCopy"><bean:message key="Copy"/></button></span><!-- 
		 --><button type="button" class="btn_normal" style="display:none;" btnAuth="CLEAR" onclick="clearAll()" id="clearBtn01" name="clearBtn01"><bean:message key="Clear"/></button>
	<!-- opus_design_btn(E) -->
	</div>
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
<div class="wrap_search">
	<div class= "opus_design_inquiry" >
		<table>
			<colgroup>
				<col width="60" />
				<col width="*" />
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Currency"/></th>
                       <td>
			            <select name="f_curr_cd" id="f_curr_cd" style="width:70px;">
                          	<bean:define id="paramCurrList"  name="valMap" property="currList"/>
							<logic:iterate id="CurrVO" name="paramCurrList">
                          			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
                          	</logic:iterate>
                         </select>
                    </td>
				</tr>
			</tbody>
		</table>
	</div>
</div>  
<!-- opus_design_inquiry(E) -->

	<div class="wrap_result">
		<div class="opus_design_grid">
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" name="addBtn02" id="addBtn02" onclick="doWork('ROWADD')"><bean:message key="Add"/></button>
				<input type="text" name="f_row_cnt" id="f_row_cnt" value="" style="width:50px;margin:0 0 0 4px;" class="search_form floatL align_right">
				<button id="cltMultiBtn" type="button" class="btn_normal"  onclick="doWork('MULTIROWADD')">Multi <bean:message key="Add"/></button>
			</div>
			<!-- opus_design_btn(E) -->
			<script type="text/javascript">comSheetObject('sheet1');</script>
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>
			<div class="opus_design_inquiry ">
				<table>
					<tbody>
						<colgroup>
							<col width="*" />
							<col width="60" />
							<col width="100" />
							<col width="60" />
							<col width="100" />
						</colgroup>
						<tr>
							<td></td>
							<th>Debit</th>
	                        <td><input type="text" name="f_debit_tot" id="f_debit_tot" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></td>
							<th><bean:message key="Credit"/></th>
	                        <td><input type="text" name="f_credit_tot" id="f_credit_tot" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></td>
						</tr>
						<tr>	
							<td></td>
							<td></td>
							<td></td>
							<th><bean:message key="Balance"/></th>
	                        <td><input type="text" name="f_balance_tot" id="f_balance_tot" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></td>
						</tr>
					</tbody>
				</table>
			</div>
		<div class= "opus_design_inquiry" >
			<table>
				<colgroup>
					<col width="60" />
					<col width="150" />
					<col width="60" />
					<col width="120" />
					<col width="*" />
				</colgroup>
				<tr>
					<th><bean:message key="Date_Seq"/></th>
                    <td><!-- 
                         --><input type="text" name="f_date" id="f_date" value="" class="search_form" maxlength="10" onKeyUp="mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);checkPostDate();" dataformat="excepthan" style="ime-mode:disabled;width:70px;"><!-- 
						 --><button type="button" class="calendar" tabindex="-1" name="f_date_cal" id="f_date_cal"  onclick="doDisplay('DATE1' ,frm1);" ></button><!-- 
						 --><input type="text" name="f_seq" value="" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:30px;text-align:center" readOnly><!-- 
                     --></td>
					<th><bean:message key="Office"/></th>
                    <td>
	                     <bean:define id="oficeList" name="valMap" property="ofcList"/>
	                     <select name="s_ofc_cd" id="s_ofc_cd" style="width:120px;"  onChange="chageGridOfcCd(this);" />
	                       <logic:iterate id="ofcVO" name="oficeList">
	                               <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                       </logic:iterate>
	                    </select></td>
                    <td></td>
				</tr>
				<tr>
                	<th><bean:message key="Remark"/></th>
                	<td colspan="4">
      				  <textarea name="f_remark" maxlength="500" dataformat="excepthan" style="width:600px;height:50px;" onblur="strToUpper(this);keyUp_maxLength(this);"></textarea>
                    </td>
                </tr>
			</table>
		</div>
	</div>
	
</form>
		
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");
</script>	
		
</body>
</html>