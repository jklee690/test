<%--
=========================================================
*@FileName   : AIE_BMD_0160.jsp
*@FileTitle  : CERTIFICATE OF ORIGIN
*@Description: CERTIFICATE OF ORIGIN
*@author     : CLT
*@version    : 2.0 - 2014/06/17
*@since      : 2014/06/17
*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js"></script>
	<script language="javascript" src="./apps/fis/aie/bmd/masterbl/script/AIE_BMD_0160.js" ></script>
	
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<bean:define id="coVO"   name="valMap" property="coInfo"/>
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

		function setSelect(){
			var formObj = document.frm1;
		}
		
		function setupPage(){
			loadPage();
		}
        var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
	</script>
<form name="frm1" method="POST" action="./AIE_BMD_0160.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="trdp_cd"/>
	<input type="hidden" name="f_intg_bl_seq" value=""/>
	
	<input type="hidden" name="f_wrk_tp" 	  value='<bean:write name="coVO" property="wrk_tp"/>'/>
	<input type="hidden" name="print_yn"	  value='<bean:write name="coVO" property="print_yn"/>'/>
	<input type="hidden" name="save_yn"	  	  value='<bean:write name="coVO" property="save_yn"/>'/>
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<!-- #33414 [BINEX] Certificate of Origin 이 출력 오류 -->
	<input	type="hidden" name="air_sea_clss_cd" value="A"/>
	<input	type="hidden" name="biz_clss_cd" value="M"/>
	<input	type="hidden" name="bnd_clss_cd" value="O"/>
	
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal" id="btnModify" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('MODIFY')"><bean:message key="Save"/></button><!-- 
		--><button type="button" class="btn_normal" id="btnPrint" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
		--><button type="button" class="btn_normal" style="display:none;" btnAuth="CLEAR" onclick="clearAll()"><bean:message key="Clear"/></button>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<div class="wrap_search">	
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="110"/>
					<col width="*"/>
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="MAWB_No"/></th>
						<td><!-- 
						 --><input required type="text" name="txt_hbl_no"  maxlength="40" value='<bean:write name="coVO" property="txt_hbl_no"/>' dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this);"></input><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('MBL_POPLIST')"></button><!-- 
						 --><input type="hidden" name="intg_bl_seq" value='<bean:write name="coVO" property="intg_bl_seq"/>'></input><!-- 
						 --><input type="hidden" name="hbl_no" value='<bean:write name="coVO" property="txt_hbl_no"/>'></input><!-- 
						 --></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result" style="width: 1200px;">
		<div class="layout_wrap">
			<div style="width: 36%;float: left;" class="opus_design_inquiry">
	   			<table>
	   				<colgroup>
						<col width="110"/>
						<col width="*"/>
					</colgroup>
					<tbody>
	                    <tr>
	                        <th><bean:message key="Shipper_Exporter"/></th>
	                        <td><textarea name="f_seller" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:300px;height:80px;"><bean:write name="coVO" property="shpr_addr"/></textarea></td>
	                    </tr>
	                    <tr>
	                        <th><bean:message key="Consignee"/></th>
	                        <td><textarea name="f_consignee" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:300px;height:80px;"><bean:write name="coVO" property="cnee_addr"/></textarea></td>
	                    </tr>
	                    <tr>
	                        <th><bean:message key="Notify_Party"/></th>
	                        <td><textarea name="f_notify" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:300px;height:80px;"><bean:write name="coVO" property="notify_addr"/></textarea></td>
	                    </tr>
	                </tbody>
                </table>
	   		</div>
	   		<div style="width: 64%;float: left;" class="opus_design_inquiry">
	   			<table>
	   				<colgroup>
						<col width="120"/>
						<col width="*"/>
					</colgroup>
					<tbody>
                       <tr>
                           <th><bean:message key="Document_No"/></th>
                           <td><input type="text" name="f_bl_no" maxlength="20" value='<bean:write name="coVO" property="bl_no"/>' onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:300px"></td>
                       </tr>
                       <tr>
                           <th><bean:message key="BL_Date"/></th>
                           <td>
								<input type="text" name="f_bl_dt" id="f_bl_dt" maxlength="10" value='<bean:write name="coVO" property="inv_dt"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'B/L Date');" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!-- 
                            --><button type="button" class="calendar" tabindex="-1" id="f_bl_dt_cal" onclick="doDisplay('DATE1' ,frm1);"></button></td>
                       </tr>
                        <tr>
                            <th><bean:message key="Export_Reference"/></th>
                            <td><textarea name="f_exp_ref" maxlength="200" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:300px;height:80px;"><bean:write name="coVO" property="exp_ref_no"/></textarea></td>
                        </tr>
                        <tr>
                            <th><bean:message key="Country_of_Origin"/></th>
                            <td><input type="text" name="f_cnt_origin" maxlength="50" value='<bean:write name="coVO" property="cnt_origin"/>' onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:300px"></td>
                        </tr>
                        <tr>
                            <th><bean:message key="Export_Carrier"/></th>
                            <td><input type="text" name="f_exp_carrier" maxlength="50" value='<bean:write name="coVO" property="exp_carrier"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:300px"></td>
                        </tr>
                        <tr>
                            <th><bean:message key="Port_of_Loading"/></th>
                            <td><input type="text" name="f_pol_nm" maxlength="50" value='<bean:write name="coVO" property="pol_nm"/>' onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:300px"></td>
                        </tr>
                        <tr>
                            <th><bean:message key="Port_of_Discharge"/></th>
                            <td><input type="text" name="f_pod_nm" maxlength="50" value='<bean:write name="coVO" property="pod_nm"/>' onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:300px"></td>
                        </tr>
                       </tbody>
                    </table>
                    <table>
                    	<colgroup>
							<col width="120"/>
							<col width="120"/>
							<col width="60"/>
							<col width="*"/>
						</colgroup>
						<tbody>
	                        <tr>
	                            <th><bean:message key="Name_of_Chamber"/></th>
	                            <td><input type="text" name="f_chamber" maxlength="50" value='<bean:write name="coVO" property="chamber"/>' onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px"></td>
	                            <th><bean:message key="State"/></th>
	                            <td><input type="text" name="f_state_nm" maxlength="50" value='<bean:write name="coVO" property="state_nm"/>' onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:113px"></td>
	                        </tr>
	                    </tbody>
                   </table>
	   		</div>
	   	</div>
	   	<table class="grid2">
	   		<colgroup>
				<col width="180"/>
				<col width="100"/>
				<col width="250"/>
				<col width="75"/>
				<col width="75"/>
				<col width="150"/>
			</colgroup>
			<tbody>
	      		<tr>
	       			<th height="25px"><bean:message key="Marks_and_Numbers"/></th>
	       			<th>Q'TY</th>
	       			<th><bean:message key="Description_of_Packages_and_Goods"/></th>
	       			<th><bean:message key="Weight_G"/></th>
	       			<th><bean:message key="Weight_C"/></th>
	       			<th><bean:message key="Measure"/></th>
	       		</tr>
	       		<tr>
	       			<td><textarea name="f_mark_num" maxlength="1000" onkeypress="keyPress_maxLength2(this,1000);" onkeyup="keyUp_maxLength2(this,1000);" dataformat="excepthan" style="width:100%;height:250px;"><bean:write name="coVO" property="mk_txt"/></textarea></td>
	       			<td><textarea name="f_qty" maxlength="500" onkeypress="keyPress_maxLength2(this,500);" onkeyup="keyUp_maxLength2(this,500);" dataformat="excepthan" style="width:100%;height:250px;text-align:right"><bean:write name="coVO" property="qty"/></textarea></td>
	       			<td><textarea name="f_desc_good" maxlength="1000" onkeypress="keyPress_maxLength2(this,1000);" onkeyup="keyUp_maxLength2(this,1000);" dataformat="excepthan" style="width:100%;height:250px;"><bean:write name="coVO" property="desc_txt"/></textarea></td>
	       			<td><textarea name="f_grs_wgt" maxlength="500" onkeypress="keyPress_maxLength2(this,500);" onkeyup="keyUp_maxLength2(this,500);" dataformat="excepthan" style="width:100%;height:250px;text-align:right;"><bean:write name="coVO" property="grs_wgt"/></textarea></td>
	       			<td><textarea name="f_chg_wgt" maxlength="500" onkeypress="keyPress_maxLength2(this,500);" onkeyup="keyUp_maxLength2(this,500);" dataformat="excepthan" style="width:100%;height:250px;text-align:right;"><bean:write name="coVO" property="chg_wgt"/></textarea></td>
	       			<td><textarea name="f_meas" maxlength="500" onkeypress="keyPress_maxLength2(this,500);" onkeyup="keyUp_maxLength2(this,500);" dataformat="excepthan" style="width:100%;height:250px;text-align:right;"><bean:write name="coVO" property="meas"/></textarea></td>
	       		</tr>
            <tbody> 		
        </table>
	</div>	
</form>

<script type="text/javascript">
doBtnAuthority(attr_extension);
</script>	