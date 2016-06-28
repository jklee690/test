<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0120.jsp
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0120.js"></script>
	
	<bean:parameter id="intg_bl_seq" name="intg_bl_seq"/>
	<bean:parameter id="air_sea_tp" name="air_sea_tp"/>
	<bean:parameter id="ref_ofc_cd" name="ref_ofc_cd"/>
<%
	String ofcLoclNm = userInfo.getOfc_locl_nm();
	String blTitle = air_sea_tp.equals("S") ? "HBL No." : "HAWB No.";
%>

	<script type="text/javascript">
		var usrNm = "<%= userInfo.getUser_name() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";

		var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
		function setupPage()
	    {
	    	loadPage();
	    }
	</script>
	

<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
<form name="form" method="POST" action="./">
	<!-- Report Value -->
	<input	type="hidden" name="f_cmd" id="f_cmd"/> 
	<input	type="hidden" name="file_name" id="file_name"/> 
	<input	type="hidden" name="rd_param" id="rd_param"/> 
	<input	type="hidden" name="f_intg_bl_seq" id="f_intg_bl_seq" value="<bean:write name="intg_bl_seq"/>"/>
	<input	type="hidden" name="intg_bl_seq" id="intg_bl_seq" value="<bean:write name="intg_bl_seq"/>"/>
	<input	type="hidden" name="f_air_sea_tp" id="f_air_sea_tp" value="<bean:write name="air_sea_tp"/>"/>
	<input	type="hidden" name="f_ref_ofc_cd" id="f_ref_ofc_cd" value="<bean:write name="ref_ofc_cd"/>"/>
	<input	type="hidden" name="f_to_type" id="f_to_type"/>
	<input	type="hidden" name="cmd_type" id="cmd_type"/>
	<input	type="hidden" name="title" id="title"/>

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_tp"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<input	type="hidden" name="mailTitle" id="mailTitle" value="<bean:write name="tmpMap" property="mailTitle"/>"/>
	<input	type="hidden" name="mailTo" id="mailTo" value="<bean:write name="tmpMap" property="mailTo"/>"/>
	<div class="layer_popup_title">
		<!-- 소타이틀, 대버튼 -->
		 <div class="page_title_area clear">
		   <h2 class="page_title "><bean:message key="Shipping_Advice"/></h2>
			   <!-- btn_div -->
			   <div class="opus_design_btn">
				   <button type="button" class="btn_accent" id="btnPrint" onclick="doWork('Print');"><bean:message key="Print"/></button><!--
				     --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			   </div>
			 	 <div class="location">	
				</div>
			   <!-- btn_div -->
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class= "wrap_search">
	 		<div class= "opus_design_inquiry">
	 		<table>
	 			<colgroup>
	 				<col width="80px">
	 				<col width="*">
	 			</colgroup>
	 			<tbody>
	 				<tr>
	 						<th><%= blTitle %></th>
	 						<td>
				            	<bean:parameter name="bl_no" id="bl_no"/><!-- 
				             --><input name="f_bl_no" type="text" value='<bean:write name="bl_no"/>' class="search_form" readOnly>
				            </td> 
				          
	 					</tr>
	 					
	 			</tbody>
	 		</table>
	 		</div>
	 	</div>
		<div class= "wrap_search">
	 		<div class= "opus_design_inquiry" >
	 			<table>
	 				
	 					<colgroup>
	 						<col width="50px">
	 						<col width="*">
	 					</colgroup>
	 					<tbody>
		 					<tr>
				                <td><b><bean:message key="Company_Name_on_Report"></bean:message></b></td>
				                <td></td>
				            </tr>
				            <tr>
				            	<td colspan="2"><input name="f_ofc_locl_nm" type="text" value="<%= ofcLoclNm %>" class="search_form" style="width:180px;" maxlength="100" id="f_ofc_locl_nm" /> </td>
				            </tr>
				            <tr>
				                <td><b><bean:message key="To"></bean:message></b></td>
				                <td></td>
				            </tr>
			              	<tr>
				                <td colspan="2">
					                <table>
					                	<tr>
							                <td width="100px;">
								                <input type="radio" name="f_to_radio" id="f_to_radio1" value="agt" checked><!--
											--><label for="f_to_radio1"><bean:message key="Agent"/></label>
											</td>
							                <td>
											<input type="radio" name="f_to_radio" id="f_to_radio2" value="shp" /><!--
											--><label for="f_to_radio2"><bean:message key="Shipper"/></label>
											</td>
										
							            </tr>
							            <tr>  
							                <td>
								                 <input type="radio" name="f_to_radio" id="f_to_radio3" value="cne"  /><!--
												--><label for="f_to_radio3"><bean:message key="Consignee"/></label>
								             </td>
							                <td>
								                 <input type="radio" name="f_to_radio" id="f_to_radio4" value="ntf"  /><!--
												--><label for="f_to_radio4"><bean:message key="Notify"/></label>
								             </td>
							            </tr>
					                </table>
								</td>
							
				            </tr>
				            <tr>
				                <td><b><bean:message key="Remark"></bean:message></b></td>
				                <td></td>
				            </tr>
				            <tr>
				            	<td>
				            	<textarea name="f_rmk" class="search_form" style="width:300px;height:50px"></textarea>
				                </td>
				            </tr>
			            
					</tbody>
	 			</table>
	 		</div>
	 	</div>
	 </div>
</form>
 						