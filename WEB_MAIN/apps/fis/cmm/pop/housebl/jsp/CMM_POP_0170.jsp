<%--
=========================================================
*@FileName   : CMM_POP_0170.jsp
*@FileTitle  : HBL 조회 팝업
*@Description: 
*@author     : Kang,Jung-Gu
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
		
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js"></script>
	<script language="javascript" src="./apps/fis/cmm/pop/housebl/script/CMM_POP_0170.js"></script>
	
	<base target="_self"/>
	
	<script language="javascript">
		var ofc_cd = '<%=userInfo.getOfc_cd()%>';
		function setupPage(){
	       	loadPage();
	       	initFinish();
	    }
	</script>
<form name="form" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/>
	<input	type="hidden" name="air_sea_clss_cd"/>
	<input	type="hidden" name="bnd_clss_cd"/>
	<input	type="hidden" name="f_CurPage"/>
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span id = "hblHrdTx"  style="display:none"><bean:message key="HBL"/> <bean:message key="Search"/></span>
	            <span id = "hawbHrdTx" style="display:none"><bean:message key="HAWB"/> <bean:message key="Search"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_search">	
		   	<div class="opus_design_inquiry">
		   		<table>
					<tr>
						<th width="127px"> 
						 <span id = "hblTx"  style="display:none"><bean:message key="HBL_No"/></span> 
						 <span id = "hawbTx" style="display:none"><bean:message key="HAWB_No"/></span></th>
		                <td width="115px"><input type="text" name="s_house_bl_no" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:115px;" onKeyPress="fncTpCodeSearch()"/></td>
	                    <th width="90px"><bean:message key="BL_Type"/></th>
	                    <td width="250px"> 
	                     <bean:define id="blTypeList" name="valMap" property="blTypeList"/> 
	                     <select required name="s_hbl_tp_cd" style="width:160px;"/> 
	                     	<logic:iterate id="bltypeVO" name="blTypeList"> 
	                     		<option value='<bean:write name="bltypeVO" property="cd_val"/>'><bean:write name="bltypeVO" property="cd_nm"/></option> 
	                     	</logic:iterate> 
	                     </select> 
	                     </td>
		                <th width="70px"><bean:message key="Office"/></th>
						<td> 
	                     <bean:define id="oficeList" name="valMap" property="ofcList"/> 
	                     <select name="f_ofc_cd" style="width:82;" required/> 
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
					</tr>
					<tr>
	                    <th> 
	                     <span id = "ashpTx" style="display:none"><bean:message key="A_Shipper"/></span> 
	                     <span id = "acusTx" style="display:none"><bean:message key="Actual_Customer"/></span> 
	                     </th>
	                     <td><input type="text" name="f_act_shpr_nm" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:115px;" onKeyPress="fncTpCodeSearch()"/></td>
						 <td colspan="2"> 
	                     <div id = "div_obrd" style="display:none"> 
	                         <table> 
	                     		<tr> 
	                     			<th width="90px"><bean:message key="Onboard_Date"/></th> 
	                     			<td> 
	                     				<input type="text" name="obrd_strdt" id="obrd_strdt" class="search_form" dataformat="excepthan" style="width:73px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			-->~&nbsp;<!-- 
	                     			--><input type="text" name="obrd_enddt" id="obrd_enddt" class="search_form" dataformat="excepthan" style="width:73px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			--><button type="button" class="calendar" tabindex="-1" onclick="doDisplay('DATE11', form);"></button> 
	                     			</td> 
	                     		</tr> 
	                     	</table> 
	                     </div> 
	                     <div id="div_eta" style="display:none"> 
	                          <table> 
	                     		<tr> 
	                     			<th width="90px"> 
	                     				<span id = "etaTx" style="display:none"><bean:message key="ETA"/></span> 
	                     				<span id = "arTx"  style="display:none"><bean:message key="Arrival"/></span> 
	                     			</th> 
	                     			<td> 
	                     				<input type="text" name="eta_strdt" id="eta_strdt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			-->~&nbsp;<!-- 
	                     			--><input type="text" name="eta_enddt" id="eta_enddt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			--><button type="button" id="eta_dt_cal" class="calendar" tabindex="-1" onclick="doDisplay('DATE13', form);"></button> 
	                     			</td> 
	                     		</tr> 
	                     	</table> 
	                     </div> 
	                     <div id="div_etd_eta" style="display:none"> 
	                         <table> 
	                     		<tr> 
	                     			<th width="90px"><span id = "etdEtaTx" style="display:none"><bean:message key="ETD_ETA"/></span></th> 
	                     			<td> 
	                     				<input type="text" name="etd_eta_strdt" id="etd_eta_strdt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			-->~&nbsp;<!-- 
	                     			--><input type="text" name="etd_eta_enddt" id="etd_eta_enddt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			--><button type="button" id="eta_dt_cal" class="calendar" tabindex="-1" onclick="doDisplay('DATE13', form);"></button> 
	                     			</td> 
	                     		</tr> 
	                     	</table> 
	                      </div> 
	                      <div id="div_air_etd" style="display:none"> 
	                         <table> 
	                     		<tr> 
	                     			<th width="90px"><bean:message key="Flight_Date"/></th> 
	                     			<td> 
	                     				<input type="text" name="etd_strdt" id="etd_strdt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			-->~&nbsp;<!-- 
	                     			--><input type="text" name="etd_enddt" id="etd_enddt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			--><button type="button" id="eta_dt_cal" class="calendar" tabindex="-1" onclick="doDisplay('DATE12', form);"></button> 
	                     			</td>
									</tr>
								</table>
	                         </div>
						 </td>
	                     <th width="70px"><bean:message key="Issued_By"/></th>
	                     <td><input type="text" name="f_pic_id" value="" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:81px;"></td>     
					</tr>
				</table>
		   	</div>
		</div>
		<!-- wrap_result (S) -->
	    <div class="wrap_result">
	    	<div class="opus_design_inquiry">
				<div class="opus_design_grid">
					<script language="javascript">comSheetObject('sheet1');</script>
				</div>
				<table border="0" width="100%">
					<tr>
						<td width="55px"> 
						 <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/> 
						 <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/> 
						 <paging:options name="pagingVal" defaultval="200"/>
						</td>								
						<td align="center"> 
						 <table> 
						 	<tr> 
						 		<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td> 
						 	</tr> 
						 </table> 
						 </td>
						<td width="55px"></td>
					</tr>
				</table>
			</div>
		</div>
	</div>	
</form>