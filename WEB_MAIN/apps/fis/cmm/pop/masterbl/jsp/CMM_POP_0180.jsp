<%--
=========================================================
*@FileName   : CMM_POP_0180.jsp
*@FileTitle  : CMM
*@Description: masterbl search pop
*@author     : 이광훈 - masterbl search pop
*@version    : 1.0 - 01/23/2009
*@since      : 01/23/2009

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />

	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js"></script>
	<script language="javascript" src="./apps/fis/cmm/pop/masterbl/script/CMM_POP_0180.js"></script>
	
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
				<span id = "hblHrdTx"  style="display:none"><bean:message key="MBL"/> <bean:message key="Search"/></span>
	            <span id = "hawbHrdTx" style="display:none"><bean:message key="MAWB"/> <bean:message key="Search"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" id="btnSave" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<!-- wrap_search (S) -->
		<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
		<bean:define id="oficeList" name="valMap" property="ofcList"/>	
		<div class="wrap_search">	
		   	<div class="opus_design_inquiry">
				<table>
					<tr>
						<th width="60"><!-- 
						 --><span id = "mbl" style="display:none"><bean:message key="MBL_No"/></span><!-- 
						 --><span id = "mawb" style="display:none"><bean:message key="MAWB_No"/></span></th>
	                     <td width="130"><input type="text" maxlength="40" name="f_mbl_no" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:130px;" onKeyPress="fncTpCodeSearch()"/></td>
	                     <th width="80"><bean:message key="Ref_No"/></th>
	                     <td width="120"><input type="text" name="f_ref_no" maxlength="20"  class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:130px;" onKeyPress="fncTpCodeSearch()"/></td>
						 <td>
							<div id = "div_etd" style="display:none"> 
						 	<table> 
						 		<tr> 
						 			<th width="80px"> 
						 				<span id = "hblTx"  style="display:none"><bean:message key="ETD"/></span> 
						 				<span id = "hawbTx" style="display:none"><bean:message key="Flight_Date"/></span> 
						 			</th> 
						 			<td class="table_search_body"> 
						 				<input type="text" name="etd_strdt" id="etd_strdt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, form.etd_enddt);firCalFlag=false;"><!-- 
						 			-->~&nbsp;<!-- 
						 			--><input type="text" name="etd_enddt" id="etd_enddt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, form.etd_strdt, this);firCalFlag=false;"><!-- 
						 			--><button id="etd_dt_cal" type="button" class="calendar" tabindex="-1" onclick="doDisplay('DATE11', form);"></button> 
						 			</td> 
						 		</tr> 
						 	</table> 
						 </div> 
						 <div id="div_eta" style="display:none"> 
						 	<table> 
						 		<tr> 
						 			<th width="60px"> 
						               <span id = "etaTx" style="display:none"><bean:message key="ETA"/></span> 
						               <span id = "arTx"  style="display:none"><bean:message key="Arrival_Date"/></span> 
						 			</th> 
						 			<td> 
						 				<input type="text" name="eta_strdt" id="eta_strdt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
						 			-->~&nbsp;<!-- 
						 			--><input type="text" name="eta_enddt" id="eta_enddt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
						 			--><button id="eta_dt_cal" type="button" class="calendar" tabindex="-1" onclick="doDisplay('DATE12', form);"></button> 
						 			</td> 
						 		</tr> 
						 	</table> 
						 </div> 
						 <div id="div_etd_eta" style="display:none"> 
						 	<table> 
						 		<tr> 
						 			<th width="60px"><span id = "etdEtaTx" style="display:none"><bean:message key="ETD_ETA"/></span></th> 
						 			<td class="table_search_body"> 
						 				<input type="text" name="etd_eta_strdt" id="etd_eta_strdt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
						 			-->~&nbsp;<!-- 
						 			--><input type="text" name="etd_eta_enddt" id="etd_eta_enddt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
						 			--><button id="eta_dt_cal" type="button" class="calendar" tabindex="-1" onclick="doDisplay('DATE12', form);"></button> 
						 			</td> 
						 		</tr> 
						 	</table> 
						 </div> 
						 </td>
					</tr>
					<tr>
	                    <th><bean:message key="Shipper"/></th>
	                    <td><input type="text" name="f_shpr_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:130px;" onKeyPress="fncTpCodeSearch()"/></td>
	                    <th><bean:message key="Issued_By"/></th>
	                    <td><input type="text" name="f_pic_id" value='' class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:130px;"></td> 
	                    <td> 
						  <table> 
						  	<tr> 
						        <th width="80px"><bean:message key="Office"/></th> 
						  			<td class="table_search_body" > 
						  				<div id="div_subcode"> 
						  	             	<select required required name="f_ofc_cd" style="width:100px;"/> 
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
						             	</div> 
						  			</td> 
						  	</tr> 
						  </table> 
						  </td>			
					</tr>
					
					<tr>
						<th><bean:message key="Liner_Bkg_No"/></th>
                        	<td width="130" class="table_search_body">
                        		<input type="text" maxlength="30" name="f_lnr_bkg_no" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:130px;" onKeyPress="fncTpCodeSearch()"/></td>
                    	<td width="5" colspan="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" /></td>
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
				<table>
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
					 </table></td>
					<td width="55"></td>
					</tr>
				</table>
				</div>
		</div>
		<!-- wrap_result (E) -->
	</div>
</form>