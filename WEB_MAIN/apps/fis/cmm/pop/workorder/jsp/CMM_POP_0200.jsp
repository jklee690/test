<%--
=========================================================
*@FileName   : CMM_POP_0200.jsp
*@FileTitle  : CMM
*@Description: Work Order Search Pop
*@author     : Kang,Jung-Gu - work order search pop
*@version    : 1.0 - 01/28/2009
*@since      : 01/28/2009

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 10/06/2014
*@since      : 10/06/2014
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js"></script>
	<script type="text/javascript" src="./apps/fis/cmm/pop/workorder/script/CMM_POP_0200.js"></script>
	
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
<script>
function setupPage(){
	loadPage();
	initFinish();
	doWork('SEARCHLIST');
}
</script>
<form name="form" method="POST" action="./">
		<!--Command를 담는 공통
		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="air_sea_clss_cd"/>
		<input	type="hidden" name="bnd_clss_cd"/>
		<input	type="hidden" name="biz_clss_cd"/>
		<input	type="hidden" name="f_CurPage"/> 	
	<div class="layer_popup_title">	
		<!-- Button -->
		<div class="page_title_area clear">
		   <h2 class="page_title"><bean:message key="Work_Order_Search"/></h2>
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
					<colgroup>
			        	<col width="70">
			        	<col width="120">
			        	<col width="50">
			        	<col width="120">
			        	<col width="80">
			        	<col width="120">
			        	<col width="50">
			        	<col width="120">
			        	<col width="50">
			        	<col width="*">
				   </colgroup>
				   <tbody>
					<tr>
						<th><bean:message key="Filing_No"/></th>
	                    <td><!-- 
	                    	 --><input name="f_ref_no" type="text" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:100px;" onKeyPress="fncTpCodeSearch()"/>
	                    </td>
	                    
	                    <th id="noTit2"></th>
	                    <td><!-- 
	                    	 --><input name="f_mbl_no" type="text" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:90px;" onKeyPress="fncTpCodeSearch()"/>
	                    </td>
	                    
	                    <th id="noTit"></th>
	                    <td><!-- 
							 --><input name="f_hbl_no" type="text" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:105px;" onKeyPress="fncTpCodeSearch()"/>
						</td>
						
	                    <th><bean:message key="Type"/></th>
						<td><!-- 
							 --><select name="f_wo_tp_cd" style="width:70px;"/><!--
							 --><bean:define id="woKindList" name="valMap" property="woKindList"/><!--
								 --><option value="">All</option><!--
								 --><logic:iterate id="woKindVO" name="woKindList"><!--
									 --><option value='<bean:write name="woKindVO" property="cd_val"/>'><bean:write name="woKindVO" property="cd_nm"/></option><!--
								 --></logic:iterate><!--
							 --></select>
						</td>
						
	                    <th><bean:message key="Office"/></th>
						<td><!-- 
							 --><bean:define id="oficeList" name="valMap" property="ofcList"/><!--
							 --><select name="f_ofc_cd" style="width:105px;"/><!--
	
	                             --><bean:size id="len" name="oficeList" /><!--
	                             --><logic:greaterThan name="len" value="1"><!--
	                             --><option value=''>ALL</option><!--
	                             --></logic:greaterThan><!--
	
								 --><logic:iterate id="ofcVO" name="oficeList"><!--
										 --><logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
				                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                         	</logic:equal>
				                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
				                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                         	</logic:notEqual><!--
								 --></logic:iterate><!--
							 --></select>
						</td> 
					</tr>
					<tr>
						<th><bean:message key="Trucker"/></th>
	                    <td><!-- 				                                	
							 --><input type="text"   name="f_trdp_nm" class="search_form" style="width:100px;" onKeyPress="fncTpCodeSearch()"/><!-- 
							 --><input type="hidden" name="f_trdp_cd" class="search_form" style="width:50px;" maxlength="6" onKeyPress="fncTpCodeSearch()"/><!--
							 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doDisplay('PARTNER_POPLIST')"></button></td>
	                    
						<th id="dtTit"></th>
						<td><!-- 
							 --><input type="text" name="etd_strdt" id="etd_strdt" class="search_form" style="width:75px;" maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!--
							 -->~ <!--
							 --><input type="text" name="etd_enddt" id="etd_enddt" class="search_form" dataformat="excepthan" style="width:75px;ime-mode:disabled" maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!--
							 --><button id="etd_dt_cal" type="button" onclick="doDisplay('DATE11', form);" class="calendar" tabindex="-1">
						</td>
						
	                     <th><bean:message key="Operator"/></th>
	                     <td><input type="text" name="f_pic_id" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:105px;"></td>     
					</tr>
					<tbody>
				</table>
			</div>
		</div>
		
		<div class="wrap_result">
	    	<div class="opus_design_grid">
	    		<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
			<table border="0" width="100%">
			   <tr>
			     	<td width="55">
			<!-------------------- Display option Begin -------------------->
						<bean:define id="pagingVal" name="valMap" property="paging"/>
						<paging:options name="pagingVal" defaultval="200"/>
			<!-------------------- Display option End -------------------->					
					</td>								
					<td align="center">
						<table>
							<tr>
								<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'/>
							</tr>
						</table>		
					</td>
				</tr>
			</table>
		</div>
	</div>
</form>
