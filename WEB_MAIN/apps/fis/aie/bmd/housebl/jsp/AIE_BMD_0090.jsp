<%--
=========================================================
*@FileName   : AIE_BMD_0090.jsp
*@FileTitle  : Document Package(Air Export HBL)
*@Description: Document Package(Air Export HBL)
*@author     : CLT
*@version    : 1.0 - 2014/06/17
*@since      : 2014/06/17

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/aie/bmd/housebl/script/AIE_BMD_0090.js"></script>
	
	<bean:define id="hblVO" name="EventResponse" property="objVal"/>
	<bean:define id="tmpMap" name="EventResponse" property="mapVal"/>
	
	<script type="text/javascript">
		var blNo = "<bean:write name="hblVO" property="bl_no"/>";

		var usrId = "<%= userInfo.getUsrid() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrNm = "<%= userInfo.getUser_name() %>";
		var usrEml = "<%= userInfo.getEml() %>";
		var usrCntCd = "<%= userInfo.getOfc_cnt_cd() %>";
		
		function setupPage(){
	    	loadPage();
	    }
		var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
	</script>
<%
	String ofcLoclNm = userInfo.getOfc_locl_nm();
%>	
	
<form name="frm1" method="POST" action="./">

	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="s_intg_bl_seq" value="<bean:write name="hblVO" property="intg_bl_seq"/>"/>
	<input type="hidden" name="s_hbl_tp_cd" value="<bean:write name="hblVO" property="hbl_tp_cd"/>"/>
	<input type="hidden" name="s_flt_no" value="<bean:write name="hblVO" property="flt_no"/>"/>
	<input type="hidden" name="s_ref_ofc_cd" value="<bean:write name="hblVO" property="ref_ofc_cd"/>"/>
	<input type="hidden" name="s_ref_ofc_eng_nm" value="<bean:write name="hblVO" property="ref_ofc_eng_nm"/>"/>
	<input type="hidden" name="s_ref_ofc_cnt_cd" value="<bean:write name="hblVO" property="ref_ofc_cnt_cd"/>"/>
	<input type="hidden" name="s_shpr_trdp_nm" value="<bean:write name="hblVO" property="shpr_trdp_nm"/>"/>
	<input type="hidden" name="s_lnr_trdp_nm" value="<bean:write name="hblVO" property="lnr_trdp_nm"/>"/>
	<input type="hidden" name="s_thr_trdp_nm" value="<bean:write name="hblVO" property="thr_trdp_nm"/>"/>
	<input type="hidden" name="s_loc_inv_flg" value="<bean:write name="hblVO" property="loc_inv_flg"/>"/>
	<input type="hidden" name="s_loc_inv_seq" value="<bean:write name="hblVO" property="loc_inv_seq"/>"/>
	<input type="hidden" name="s_cmc_inv_seq" value="<bean:write name="hblVO" property="cmc_inv_seq"/>"/>
	<input type="hidden" name="s_pck_inv_seq" value="<bean:write name="hblVO" property="pck_inv_seq"/>"/>

	<!-- Report Value -->
	<input type="hidden" name="file_name"/>
	<input type="hidden" name="rd_param"/>
	<input type="hidden" name="title"/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="intg_bl_seq" value="<bean:write name="hblVO" property="intg_bl_seq"/>"/>
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_tp"/>
	
	<!--  AE HBL Form -->
	<input	type="hidden" name="ae_hbl_form" value="<bean:write name="tmpMap" property="ae_hbl_form"/>"/>
	
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal" id="btnPrint" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('Print')"><bean:message key="Print"/></button>
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
		<h3 class="title_design"><bean:message key="Search_Condition"/></h3>
		<div class="opus_design_inquiry wFit">
			<table>
               <tr>
                    <th width="60px"><bean:message key="HAWB_No"/></th>
					<td><!-- 
					 --><input required type="text" name="f_bl_no"  maxlength="40" value="<bean:write name="hblVO" property="bl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:135;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="entSearch()"><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('HBL_POPLIST')"></button><!-- 
					 --></td>
                  </tr>
                </table>
		</div>
	</div>
  	<!-- wrap_result(S) -->
	<div class="wrap_result">
		<div class="opus_design_inquiry wFit">
			<h3  class="title_design"><bean:message key="Basic_Information"/></h3>
            <table>
                <tr>
                    <th width="170px"><bean:message key="Company_Name_on"/><span style="margin-left:12px;"><bean:message key="Report"/></span></th>
                    <td><input required name="s_ofc_locl_nm" type="text" class="search_form" style="width:200px;" maxlength="100" value="<%= ofcLoclNm %>"/></td>
                </tr>
            </table>
            <table>
                    <tr>
                        <th width="170px"><bean:message key="Show_BL_Type"/></th>
		                <td width="150px"><input type="radio" name="s_bl_radio" id="s_bl_radio1" value="1"><label for="s_bl_radio1"><bean:message key="Original"/></label></td>
		                <td width="150px"><input type="radio" name="s_bl_radio" id="s_bl_radio2" value="2"><label for="s_bl_radio2"><bean:message key="NonNegotiable"/></label></td>
		                <td><input type="radio" name="s_bl_radio" id="s_bl_radio3" value="3"><label for="s_bl_radio3"><bean:message key="Draft"/></label></td>
                    </tr>
                    <tr>
		                <td></td>
		                <td><input type="radio" name="s_bl_radio" id="s_bl_radio4" value="1"><label for="s_bl_radio4"><bean:message key="Copy"/></label></td>
		                <td><input type="radio" name="s_bl_radio" id="s_bl_radio5" value="2"><label for="s_bl_radio5"><bean:message key="Telex_Release"/></label></td>
		                <td><input type="radio" name="s_bl_radio" id="s_bl_radio6" checked><label for="s_bl_radio6"><bean:message key="None"/></label></td>
		            </tr>  
                </table>
             <table>
                 <tr>
                     <th width="170px"><bean:message key="Shipper"/></th>
                     <td width="300px"><textarea name="s_shp_desc" class="search_form" style="width:300px;height:120px" readonly><bean:write name="hblVO" property="shpr_info"/></textarea>
                     <th width="80px"><bean:message key="Consignee"/></th>
                     <td><textarea name="s_cne_desc" class="search_form" dataformat="excepthan" style="width:300px;height:120px" readonly><bean:write name="hblVO" property="cnee_info"/></textarea></td>
                 </tr>
             </table>
             <table>
                  <tr>
                    <th width="170px"><bean:message key="Send_To"/></th>
	                <td width="150px"><input type="radio" name="s_send_to" id="s_send_to1" value="shp" onclick="doWork('SEND_TO');" checked><label for="s_send_to1"><bean:message key="Shipper"/></label></td>
	                <td><input type="radio" name="s_send_to" id="s_send_to2" value="cne" onclick="doWork('SEND_TO');"><label for="s_send_to2"><bean:message key="Consignee"/></label></td>
                  </tr>
              </table>
              <table>
					<tr>
						<th width="170px"><bean:message key="Select_Report_Type"/></th>
                        <td width="20px"><input name="s_rpt_tp_1" id="s_rpt_tp_1" type="checkbox" value="HOUSE_BL"></td>
                        <td width="130px"><label for="s_rpt_tp_1">1. <bean:message key="House_BL"/></label></td>
                        <td width="20px"><input name="s_rpt_tp_3" id="s_rpt_tp_3" type="checkbox" value="SHIPPING_ADVICE"></td>
                        <td width="130px"><label for="s_rpt_tp_3">3. <bean:message key="Shipping_Advice"/></label></td>
						<td colspan="4"><!-- 
		                     --><div class="opus_design_btn" style="width: 120px;"><!-- 
		                     --><button type="button" class="btn_etc" onclick="doWork('ALL')" ><bean:message key="All"/></button><!-- 
		                     --><button type="button" class="btn_etc" onclick="doWork('CLEAR')" ><bean:message key="Clear"/></button><!-- 
		                     --></div><!-- 
		                     --></td>
		               <td></td> 
		                     
					</tr>
					<tr>
						<td></td>
                        <td><input name="s_rpt_tp_2" id="s_rpt_tp_2" type="checkbox" value="LOCAL_INVOICE"></td>
                        <td><label for="s_rpt_tp_2">2. <bean:message key="Local_Invoice"/></label></td>
                        <td><input name="s_rpt_tp_4" id="s_rpt_tp_4" type="checkbox" value="COMMERCIAL_INVOICE"></td>
                        <td><label for="s_rpt_tp_4">4. <bean:message key="Commercial_Invoice"/></label></td>
                        <td width="20px"><input name="s_rpt_tp_5" id="s_rpt_tp_5" type="checkbox" value="PACKING_LIST"></td>
                        <td width="130px"><label for="s_rpt_tp_5">5. <bean:message key="Packing_List"/></label></td>
                        <td></td><td></td>
                        <!-- 
                        <td width="20px"><input name="s_rpt_tp_6" id="s_rpt_tp_6" type="checkbox" value="DE_S/A"></td>
                        <td width="130px"><label for="s_rpt_tp_6">6. <bean:message key="DE_S/A" /></label></td>
                         -->
                    </tr>
    	        </table>
    	        <table>
    	        	<tr>
						<th width="170px"><bean:message key="Option"/></th>
                        <td width="20px"><input name="s_hbl_opt" id="s_hbl_opt" type="checkbox"></td>
                        <td><label for="s_hbl_opt"><bean:message key="Show_User_Signature_on_HAWB"/></label></td>
                	</tr>
                </table>
		</div>
	</div>
</form>

<script type="text/javascript">
doBtnAuthority(attr_extension);
</script>	
			
</body>
</html>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>