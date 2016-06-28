<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>

	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js"></script>
	<script type="text/javascript" src="./apps/fis/see/bmd/masterbl/script/SEE_BMD_0170.js"></script>
		
	<bean:define id="mblVO" name="EventResponse" property="mapVal"/>
	<bean:parameter id="intg_bl_seq" name="intg_bl_seq" value=""/>

	<script type="text/javascript">
	function setupPage(){}
		var ofcCd = "<%= userInfo.getOfc_cd() %>";
		var userNm = "<%= userInfo.getUser_name() %>";
		var userTel = "<%= userInfo.getPhn() %>";
		var userFax = "<%= userInfo.getFax() %>";
		var userEml = "<%= userInfo.getEml() %>";
	</script>
<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<!-- Report Value -->
	<input type="hidden" name="cmd_type" id="cmd_type" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="rd_param" id="rd_param" />

	<input type="hidden" name="mailTitle" value="" id="mailTitle" />
	<input type="hidden" name="mailTo" value="" id="mailTo" />

	<input type="hidden" name="master_bl_no" id="master_bl_no" />

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="intg_bl_seq" id="intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/>
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp" />
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp" />
	<input type="hidden" name="rpt_tp" id="rpt_tp" />
	<input type="hidden" name="rpt_trdp_cd" id="rpt_trdp_cd" />
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><span id="title"><%=LEV3_NM%></span></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" onclick="doWork('Print')" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button><!-- 
		<!-- opus_design_btn(E) -->
		</div>
		<!-- page_location(S) -->
		<div class="location">	
			<span id="navigation">
			<%=LEV1_NM%> > <%=LEV2_NM%> ><span class="navi_b"><%=LEV3_NM%></span>
			</span>
		</div>
		<!-- page_location(E) -->
	</div>
	<!-- page_title_area(E) -->
	<div class= "wrap_search">
  		<!-- opus_design_inquiry(S) -->
		<div class="opus_design_inquiry">
			<table>
					<colgroup>
						<col width="50">
						<col width="150">
						<col width="70">
						<col width="*">
					</colgroup>
					<tbody>
								<tr>
									<th><bean:message key="MBL_No"/></th>
									<td>
										<input name="s_mbl_no"  id="s_mbl_no"  maxlength="40" value='<bean:write name="mblVO" property="s_mbl_no"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){doPop('MBL_POPLIST',this);}"><!-- 
			                             --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doPop('MBL_POPLIST',this)"></button>
									</td>
									<th><bean:message key="Ref_No"/></th>
									<td>
										<input name="s_ref_no"  id="s_ref_no" maxlength="20" value='<bean:write name="mblVO" property="s_ref_no"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){doPop('REF_POPLIST',this);}"><!-- 
			                             --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doPop('REF_POPLIST',this)"></button>
									</td>
								</tr>
					</tbody>
			</table>
		</div>
	</div>
		<!-- opus_design_inquiry(E) -->
		<!-- opus_design_inquiry(S) -->
	<div class= "wrap_result">
		<div class="opus_design_inquiry">
			<table>
					<colgroup>
						<col width="*" />
					</colgroup>
					<tbody>
								<tr>	
		                          	<td>
		                          		<input type="radio" name="s_ship_to" id="s_ship_to1" value="B" onClick="fRadio(this.value);" checked ><label for="s_ship_to1"><bean:message key="Broker"/></label> <!-- 
		                            	 --><input type="radio" name="s_ship_to" id="s_ship_to2" value="S" onClick="fRadio(this.value);"><label for="s_ship_to2"><bean:message key="Shipper"/></label> <!-- 
		                            	 --><input type="radio" name="s_ship_to" id="s_ship_to3" value="C" onClick="fRadio(this.value);"><label for="s_ship_to3"><bean:message key="Consignee"/></label> <!-- 
		                            	 --><input type="radio" name="s_ship_to" id="s_ship_to4" value="N" onClick="fRadio(this.value);"><label for="s_ship_to4"><bean:message key="Notify"/></label>
		                      		</td>
		                        </tr>
		                        <tr>
		                      		<td>
		                            	<input type="radio" name="s_ship_to" id="s_ship_to5" value="O" onClick="fRadio(this.value);"><label for="s_ship_to5"><bean:message key="Other_Company"/></label> <!-- 
		                            	 --><input name="ntc_trdp_cd" id="ntc_trdp_cd" readonly type="text" maxlength="20" value='' class="search_form-disable" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48px;" onKeyPress="if(event.keyCode==13){doPop('PARTNER_POPLIST');}"><!-- 
	                                     --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doPop('PARTNER_POPLIST')"></button><!-- 
	                                     --><input name="ntc_trdp_full_nm" id="ntc_trdp_full_nm" readonly type="text" maxlength="50" value='' class="search_form-disable" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:237px;" onKeyPress="if(event.keyCode==13){doPop('PARTNER_POPLIST');}">
		                            </td>    
		                        </tr>
		                        <tr>
		                            <td>
		                                <textarea name="s_rmk" id="s_rmk" maxlength="218" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);if(!checkTxtAreaLn(this, 53, 5, 'Remark'))this.focus();" class="search_form" dataformat="excepthan" style="width:434px;height:80px;"></textarea>
		                            </td>
		                        </tr>
					</tbody>
			</table>
		</div>
		<!-- opus_design_inquiry(E) -->
	</div>			
</form>
