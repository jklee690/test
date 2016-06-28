<%--
=========================================================
*@FileName   : EDI_BKG_0010.jsp
*@FileTitle  : BKG BL SEND
*@Description: BKG BL SEND
*@author     : OJG - Cyberlogitec
*@version    : 1.0 - 2014/5/27
*@since      : 2014/5/27

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/web/rpt/rdviewer50u.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js"></script>
	<script language="javascript" src="./apps/fis/edi/bkg/script/EDI_BKG_0010.js"></script>
	
	<%
		String usrId	= userInfo.getUsrid();
		String ofc_cd	= userInfo.getOfc_cd();
		String ofc_eng_nm	= userInfo.getOfc_eng_nm();
		String usrNm	= userInfo.getUser_name();
		String phn 		= userInfo.getPhn();
		String fax 		= userInfo.getFax();
		String email 	= userInfo.getEml();
	%>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		function setupPage(){
			loadPage();
		}
	</script>
<form name="frm1" method="POST" action="./EDI_AGT_0010.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="user_id" id="user_id"  value="<%=usrId%>" />
	<input type="hidden" name="user_name" id="user_name"  value="<%=usrNm%>" />
	<input type="hidden" name="user_phn" id="user_phn"  value="<%=phn%>" />
	<input type="hidden" name="user_fax" id="user_fax"  value="<%=fax%>" />
	<input type="hidden" name="user_email" id="user_email"  value="<%=email%>" />
	<bean:parameter name="bkg_seq" id="bkg_seq"/>
	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span>BKG <bean:message key="EDI"/></span></h2>
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" onclick="doWork('SEND_EDI')" ><bean:message key="Send_EDI"/></button><!--
			--><button type="button" class="btn_normal" style="display: none;" btnAuth="SEND_EDI" onclick="doWork('SEND_EDI')"><bean:message key="Print"/></button><!--
			--><button type="button" class="btn_normal" onclick="doWork('SEND_BOOKING_EDI')" >Send BKG EDI</button>
			
			<!--
			<button type="button" class="btn_normal" style="display: none;" btnAuth="SEND_BOOKING_EDI" onclick="doWork('SEND_BOOKING_EDI')"><bean:message key="Print"/></button> 
			-->
			<!-- <button type="button" class="btn_accent" onclick="doWork('SEND_BOOKING_EDI')" ><bean:message key="Send_EDI"/></button> -->
			
			
			</div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_result">
			<div class="opus_design_inquiry">
				<h3 class="title_design"><bean:message key="Vessel_Information"/></h3>
				<table>
					<colgroup>
						<col width="100">
						<col width="*">
					</colgroup>
					<tbody>
					
						<tr>
							<th><bean:message key="Liner"/></th>
							<td>
								<bean:parameter name="lnr_trdp_nm" id="lnr_trdp_nm"/>
								<input type="text" id="f_lnr_trdp_nm" name="f_lnr_trdp_nm" maxlength="50" value='<bean:write name="lnr_trdp_nm"/>'  onblur="strToUpper(this);" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:300px;"><!-- 
								f_intg_bl_seq input text
	                         --><input type="text" id="f_bkg_seq" name="f_bkg_seq" value="<bean:write name="bkg_seq"/>"   class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:113px;text-transform:uppercase;" maxlength="8" onblur="strToUpper(this)">
								
								
							</td>
						</tr>
	                    <tr>
	                        <th><bean:message key="Vessel_Voyage"/></th>
	                        <td>
	                        	<bean:parameter name="trnk_vsl_nm" id="trnk_vsl_nm"/>
	                        	<bean:parameter name="trnk_voy" id="trnk_voy"/>
	                            <input type="text"  id="f_trnk_vsl_nm" name="f_trnk_vsl_nm" value="<bean:write name="trnk_vsl_nm"/>" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:300px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)"><!-- 
	                         --><input type="text"  id="f_trnk_voy" name="f_trnk_voy"    value="<bean:write name="trnk_voy"/>"   class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:113px;text-transform:uppercase;" maxlength="8" onblur="strToUpper(this)">
	                        </td>
	                    </tr>
                    </tbody>
                </table>
			</div>
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
	</div>
</form>