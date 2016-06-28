<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0200.jsp
*@FileTitle  : OEH Booking 등록
*@Description: OEH Booking 등록 및 조회
*@author     : You,Ji-Won
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
*@author     : Hoang.Pham
*@version    : 2.0 - 2014/12/25
*@since      : 2014/12/25
=========================================================
--%>
<%@page import="com.clt.apps.fis.mdm.mcm.office.dto.OfcVO"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@page import="com.clt.framework.core.layer.event.EventResponse"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<bean:define id="hblVO"   name="EventResponse" property="objVal"/>
<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

<title><bean:message key="system.title"/></title>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/SEE_BMD_0200.js"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js"></script>
<script>	
	function btnLoad(){
		
		if (frm1.bkg_no.value == "") {
			getObj("btnAdd").style.display = 'inline';
			getObj("btnModify").style.display  = 'none';
			getObj("btnCopy").style.display  = 'none';
			getObj("btnDelete").style.display  = 'none';
			getObj("btnPrint").style.display = 'none';
		} else {
			getObj("btnAdd").style.display = 'none';
			getObj("btnModify").style.display  = 'inline';
			getObj("btnCopy").style.display  = 'inline';
			getObj("btnDelete").style.display  = 'inline';
			getObj("btnPrint").style.display = 'inline';
		}
	}
	
    <!-- ###Office Info## -->
    <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
    <bean:define id="ofcVO" name="officeInfo"/>
    var v_ofc_cd = "<bean:write name="ofcVO" property="ofc_locl_nm"/>";

    var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
    
    //[20130926 OJG ]Booking Confirm 출력용 변수.
    var v_ofc_eng_nm = "<bean:write name="ofcVO" property="ofc_eng_nm"/>";	
    var v_eml = "<%=userInfo.getEml()%>";												
	var v_ofc_cd = "<%=userInfo.getOfc_cd()%>";
	var v_phn = "<%=userInfo.getPhn()%>";  
	var v_fax = "<%=userInfo.getFax()%>";
	
       /* jsjang 2013.08.27 office, ooh_bkg_rmk 정보 처리 변경 */
	var prn_ofc_cd = "<%=(String)application.getAttribute("PRNT_OFC_CD")%>";
	
	var TPCD1 = '';
    var TPCD2 = '';
    var TPCD3 = '';
    <% boolean isBegin = false; %>
    <!--Role 코드조회-->
    <bean:define id="tpszList" name="valMap" property="cntrTpszList"/>
    <logic:iterate id="codeVO" name="tpszList">
    <% if (isBegin) { %>
    TPCD1 += '|';
    TPCD2 += '|';
    TPCD3 += '|';
    <% } else {
        isBegin = true;
    } %>
    TPCD1 += '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
    TPCD2 += '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
    TPCD3 += '<bean:write name="codeVO" property="cntr_grp_cd"/>';
    </logic:iterate>
    
    var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
    
    var APFRTCD1 = ' |';
	var APFRTCD2 = ' |';
	<% isBegin = false; %>
    <bean:define id="apFrtCdList" name="valMap" property="apFrtCdList"/>
	<logic:iterate id="FrtCdVO" name="apFrtCdList">
		<% if(isBegin){ %>
			APFRTCD1+= '|';
			APFRTCD2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		   APFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
		   APFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
	</logic:iterate>
	
	
	<!-- ###Freight 항목### -->
	var UNITCD1 = ' |';
	var UNITCD2 = ' |';
	<!-- Freight Unit 단위 -->
    <logic:notEmpty name="valMap" property="UNITCD">
		<% isBegin = false; %>
        <bean:define id="unitList" name="valMap" property="UNITCD"/>
        <logic:iterate id="codeVO" name="unitList">
            <% if(isBegin){ %>
                UNITCD1+= '|';
                UNITCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
            UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
            UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
        </logic:iterate>
    </logic:notEmpty>
    
	<!-- 요구사항 #25606 : [B/L Entry] B/L에서의 Freight Input 시 Currency 선택 옵션 변경 //-->
    var CURRCD = '';
	<% isBegin = false; %>
    <bean:define id="currCdList" name="valMap" property="currCdList"/>
    <logic:iterate id="codeVO" name="currCdList">
        <% if(isBegin){ %>
               CURRCD += '|';
        <% }else{
        	isBegin = true;
           } %>
        CURRCD+= '<bean:write name="codeVO" property="cd_val"/>';
    </logic:iterate>
    
    <!-- ###FRT_CD LIST 항목 AR### -->
    var ARFRTCD1 = ' |';
	var ARFRTCD2 = ' |';
	<% isBegin = false; %>
    <bean:define id="arFrtCdList" name="valMap" property="arFrtCdList"/>
	<logic:iterate id="FrtCdVO" name="arFrtCdList">
		<% if(isBegin){ %>
			ARFRTCD1+= '|';
			ARFRTCD2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		   ARFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
		   ARFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
	</logic:iterate>
    
	var ofc_curr_cd = "<bean:write name="ofcVO" property="trf_cur_cd"/>";
	
</script>
<script type="text/javascript">
    function setupPage() {
        btnLoad();
        loadPage();
        doHideProcess();
        loadData();
    }

    var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
    var dfPerfCurr = 'KRW';
</script>
<form name="frm1">
    <input type="hidden" name="f_cmd" id="f_cmd">
    <input type="hidden" name="h_ofc_cnt_cd" id="h_ofc_cnt_cd">
    <input type="hidden" name="title" id="title"/>
    <input type="hidden" name="file_name" id="file_name"/>
    <input type="hidden" name="rd_param" id="rd_param"/>
    <input type="hidden" name="f_ref_no" id="f_ref_no"/>
    <input type="hidden" name="h_temp_val" id="h_temp_val" value="">
    <input type="hidden" name="post_dt" id="post_dt" value="">
    <input type="hidden" name="user_id" id="user_id" value="<%=userInfo.getUsrid()%>"/>
    <!--  Report ==> OutLook연동 파라미터 (S) -->
    <input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp"/>
    <input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp"/>
    <!--  Report ==> OutLook연동 파라미터 (E) -->
    <html:hidden name="hblVO" property="bkg_seq"/>
    <html:hidden name="hblVO" property="intg_bl_seq"/>
    <html:hidden name="valMap" property="f_bkg_seq"/>
    <input type="hidden" name="title_form" id="title_form" value="<%=LEV3_NM%>">
    <input type="hidden" name="autho" value="<%= roleBtnVO.getAttr5() %>">
    <!-- jsjang 2013.08.28 office, ooh_bkg_rmk 정보 처리 변경 -->
    <input type="hidden" name="h_ooh_bkg_rmk" id="h_ooh_bkg_rmk" value="<bean:write name="ofcVO" property="ooh_bkg_rmk"/>">
	<input type="hidden" name="f_isNumSep" value='<bean:write name="valMap" property="f_isNumSep"></bean:write>'
           id="f_isNumSep"/>
    <input type="hidden" name="xcrtDt" id="xcrtDt" value="<bean:write name="hblVO" property="obrd_dt_tm"/>">
	<div class="page_title_area clear">
   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn"><!--
		   --><button type="button" class="btn_accent" style="display:none;" onClick="doWork('SEARCHLIST')" btnAuth="<%= roleBtnVO.getAttr1() %>" id="btn_Retrieve" name="btn_Retrieve"><bean:message key="Search"/></button><!--
		   --><span style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('CREATEHBL');" name="btn_CreateHBL" id="btn_CreateHBL"><bean:message key="Create_HouseBL"/></button></span><!--
		   --><button type="button" class="btn_normal" style="display:none;" onClick="doWork('NEW');" btnAuth="<%= roleBtnVO.getAttr2() %>" id="btn_New" name="btn_New"><bean:message key="New"/></button><!--
		   --><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onClick="doWork('ADD')" id="btnAdd" name="btnAdd"><bean:message key="Save"/></button><!--
		   --><span style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('MODIFY')" id="btnModify" name="btnModify"><bean:message key="Save"/></button></span><!--
	 	   --><span style="display: none;" btnAuth="COPY"><button type="button" class="btn_normal" style="display:none;" id="btnCopy" name="btnCopy" onClick="doWork('COPY');"><bean:message key="Copy"/></button></span><!-- 
		   --><span style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('PRINT');" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button></span><!--
		   --><span style="display: none;" btnAuth="<%= roleBtnVO.getAttr4() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('REMOVE');" name="btnDelete" id="btnDelete"><bean:message key="Delete"/></button></span></div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
    <div class="wrap_search">
		<div class="opus_design_inquiry wFit">
			<table>
				<colgroup>
					<col width="80">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Booking_No"/></th>
						<td><input type="text" name="f_bkg_no" id="f_bkg_no" required="required" value="<bean:write name="valMap" property="f_bkg_no"/>" style="width:115px;text-transform:uppercase;" onblur="strToUpper(this);loadBtn();"><!--
							--><button type="button"  id="btn_Booking_No" name="btn_Booking_No" class="input_seach_btn" tabindex="-1" onClick="openPopUp('BKNO_POPLIST',this)"></button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result_tab">
		<div class="opus_design_grid" id="mainTable" style="display: none;">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		<ul class="opus_design_tab">
            <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;"
                                           onClick="javascript:goTabSelect('01');"><span><bean:message
                    key="Booking"/></span></a></li>
            <li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message
                    key="Container"/></span></a></li>
            <li id=Tab03><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Remark"/></span></a></li>
            <li id=Tab04><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Freight"/></span></a></li>
<%--             <li id=Tab05><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Work_Order"/></span></a></li> --%>
        </ul>
        <div id="tabLayer" name="tabLayer" style="display:inline"><!--Booking&BL-->
		<div class="opus_design_inquiry wFit">
			<table>
				<colgroup>
					<col width="80">
					<col width="250">
					<col width="90">
					<col width="140">
					<col width="100">
					<col width="220">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Booking_No"/></th>
						<td><input type="text" name="bkg_no" id="bkg_no" maxlength="30" value='<bean:write name="hblVO" property="bkg_no"/>' onblur="strToUpper(this)" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:125px;" onclick="if(frm1.bkg_no.value=='AUTO'){frm1.bkg_no.value=''}"><!--
							--><input type="hidden" name="h_bkg_no" id="h_bkg_no" value="<bean:write name="hblVO" property="bkg_no"/>"><!--
							--><input type="text" name="bkg_dt_tm" id="bkg_dt_tm" maxlength="10" value="<wrt:write name="hblVO" property="bkg_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Booking Date');" style="ime-mode:disabled;width:70px;"><!--
							--><button type="button" id="bkg_dt_tm_cal" name="bkg_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.bkg_dt_tm);" class="calendar" tabindex="-1"></button></td>  
						<th><bean:message key="HBL_No"/></th>
						<td><input type="text" name="bl_no" id="bl_no" maxlength="40" value='<bean:write name="hblVO" property="bl_no"/>' onblur="strToUpper(this)" class="search_form-disable" style="ime-mode:disabled; text-transform:uppercase;width:125px;" tabindex="-1" readonly></td>
                        <!-- 
                        <th><bean:message key="PO_No"/></th>
						<td><input type="text" name="po_no" id="po_no" maxlength="40" value='<bean:write name="hblVO" property="po_no"/>' class="search_form" onblur="strToUpper(this)" style="ime-mode:disabled; text-transform:uppercase;width:125px;" ></td>
						 -->
						<th><bean:message key="LC_No"/></th>
						<td><input type="text" name="lc_no" id="lc_no" maxlength="40" value='<bean:write name="hblVO" property="lc_no"/>' class="search_form" onblur="strToUpper(this)" style="ime-mode:disabled; text-transform:uppercase;width:125px;" ></td>
						<td>&nbsp;</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="layout_wrap">
			<div class="layout_vertical_4" style="width: 275px">
				<div class="opus_design_inquiry sm" style="height: 500px;">
				<h3 class="title_design"><bean:message key="Customer"/></h3>
					<table>
						<colgroup>
							<col width="65">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><a href="javascript:clearBlPrnr('P01');"><bean:message key="Partner"/></a></th>
								<td><input type="text" name="prnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_partner',this, 'onKeyDown', 'S', 'O', 'H')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner',this, 'onBlur', 'S', 'O', 'H')" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button"  id="partner" name="partner" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
									--><input type="text"   name="prnr_trdp_nm" id="prnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('partner'), frm1.prnr_trdp_nm.value);}"><!--
									--><input type="hidden" name="prnr_trdp_addr" id="prnr_trdp_addr" value='<bean:write name="hblVO" property="prnr_trdp_addr"/>'>                                                        
								</td>
				            </tr>
				            <tr>
				            	<th><a href="javascript:clearBlPrnr('S01');"><bean:message key="Shipper"/></a></th>
								<td><input type="text" name="shpr_trdp_nm" id="shpr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  onblur="strToUpper(this);strToUpper(this);checkTrdpCode(this);"  class="search_form" style="ime-mode:disabled;width:165px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);setActShipper();setCargoPuckup();}"><!--
									--><button type="button"  id="shipper" name="shipper" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this);setActShipper();setCargoPuckup();"></button><!--
									--><input type="hidden" name="shpr_trdp_cd" id="shpr_trdp_cd" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_shipper',this, 'onBlur')" style="ime-mode:disabled; text-transform:uppercase;width:48;">
								</td>
				            </tr>
						</tbody>
					</table>
					<table>
						<tr>
							<td>
								<textarea name="shpr_trdp_addr" id="shpr_trdp_addr" class="search_form autoenter_50" style="width:260px;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off"><bean:write name="hblVO" property="shpr_trdp_addr" filter="false"/></textarea>
							</td>
						</tr>
					</table>
					<table>
						<colgroup>
							<col width="65">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><a href="javascript:clearBlPrnr('C01');"><bean:message key="Consignee"/></a></th>
								<td><input type="hidden" name="cnee_trdp_cd"  value='<bean:write name="hblVO" property="cnee_trdp_cd"/>'  onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_consignee',this, 'onBlur');" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:48px;"><!--
									--><input type="text"   name="cnee_trdp_nm"  maxlength="50" value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"   class="search_form" style="ime-mode:disabled;width:165px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);}"><!--
									--><button type="button"  id="consignee" name="consignee" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this);"></button>
								</td>
							</tr>
						</tbody>
					</table>
					<table>
						<tr>
							<td><textarea name="cnee_trdp_addr" id="cnee_trdp_addr" class="search_form autoenter_50" style="width:260px;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address')" WRAP="off"><bean:write name="hblVO" property="cnee_trdp_addr" filter="false"/></textarea></td>
						</tr>
					</table>
					<table>
						<colgroup>
							<col width="65">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><a href="javascript:clearBlPrnr('N01');"><bean:message key="Notify"/></a></th>
								<td><input type="hidden" name="ntfy_trdp_cd" id="ntfy_trdp_cd"  value='<bean:write name="hblVO" property="ntfy_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_notify',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_notify',this, 'onBlur')" style="ime-mode:disabled; text-transform:uppercase;width:48;"><!--
									--><input type="text" name="ntfy_trdp_nm" id="ntfy_trdp_nm" value='<bean:write name="hblVO" property="ntfy_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" style="ime-mode:disabled;width:165px;text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('notify'), frm1.ntfy_trdp_nm.value);}"><!--
									--><button type="button"  id="notify" name="notify" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button>
								</td>
							</tr>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tr>
							<td><img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('SAC', 'S', 'O', 'H')"><bean:message key="Same_As_Consignee"/></a></td>
							<td><img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('CNEE', 'S', 'O', 'H')"><bean:message key="Copy"/></a></td>
						</tr>
					</table>
					<table>
						<tr>
							<td><textarea name="ntfy_trdp_addr" id="ntfy_trdp_addr" class="search_form autoenter_50" style="width:260px;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address')" WRAP="off"><bean:write name="hblVO" property="ntfy_trdp_addr" filter="false"/></textarea></td>
						</tr>
					</table>
				</div>
			</div>
			<div class="layout_vertical_4" style="width: 310px;">
				<div class="opus_design_inquiry sm" style="padding-top: 30px;height: 500px;">
					<table>
						<colgroup>
							<col width="110">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><a href="javascript:clearBlPrnr('S02');"><bean:message key="Customer"/></a></th>
								<td><input type="text" name="act_shpr_trdp_cd" id="act_shpr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="act_shpr_trdp_cd"/>' class="search_form" onKeyDown="strToUpper(this);codeNameAction('trdpCode_ashipper',this, 'onKeyDown', 'S', 'O', 'H');" onBlur="codeNameAction('trdpCode_ashipper',this, 'onBlur', 'S', 'O', 'H');" style="ime-mode:disabled; text-transform:uppercase;width:50px;" required="required"><!--
									--><button type="button"  id="ashipper" name="ashipper" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
									--><input type="text" name="act_shpr_trdp_nm" id="act_shpr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="act_shpr_trdp_nm"/>' onblur="strToUpper(this);" class="search_form" style="ime-mode:disabled;width:90px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('ashipper'), frm1.act_shpr_trdp_nm.value);}" required="required">
								</td>
							</tr>
						</tbody>
					</table>
					<table style="display:none"><!-- [20130926 OJG] ì ë³´ì´ê² ì²ë¦¬ -->
                      	<tr>
                          	<td><textarea name="act_shp_info" id="act_shp_info" class="search_form autoenter_50" onblur="strToUpper(this);chkCmpAddr(this, 'Actual Shipper')" style="width:250;height:60px;" WRAP="off"><bean:write name="hblVO" property="act_shp_info" filter="false"/></textarea></td>
                       	</tr>
                   	</table>
                   	<table>
                    	<tr>
                    		<th style="height: 30px;text-align: left"><bean:message key="Export_Reference_No"/></th>
                     	</tr>
                        <tr>
                        	<td><textarea name="exp_ref_no" class="search_form autoenter_50" onblur="strToUpper(this);chkCmpAddr(this, 'Export Reference No.')" style="width:282px;height:80px;" WRAP="off"><bean:write name="hblVO" property="exp_ref_no" filter="false"/></textarea></td>
                     	</tr>
                    </table>
					<table>
						<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tr>
							<th><bean:message key="Empty_Pickup"/></th>
                             <td><input name="pu_trdp_cd" id="pu_trdp_cd" value='<bean:write name="hblVO" property="pu_trdp_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode_pu',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_pu',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" style="ime-mode:disabled; text-transform:uppercase;width:50px;" onblur="strToUpper(this);"><!--
                             	--><button type="button"  id="pu" name="pu" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
                             	--><input type="text" name="pu_trdp_nm" id="pu_trdp_nm" value='<bean:write name="hblVO" property="pu_trdp_nm"/>' class="search_form" style="ime-mode:disabled;width:82px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('pu'), frm1.pu_trdp_nm.value);}" maxlength="50">
                             </td>
						</tr>
						<tr>
							<th><bean:message key="Cargo_Pick_Up"/></th>
							<td><input type="text" name="cgo_pu_trdp_cd" id="cgo_pu_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="cgo_pu_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_cgo_pu',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_cgo_pu',this, 'onBlur')" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
								--><button type="button"  id="cgo_pu" name="cgo_pu" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST', this)"></button><!--
								--><input type="text" name="cgo_pu_trdp_nm" id="cgo_pu_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="cgo_pu_trdp_nm"/>' onblur="strToUpper(this);" class="search_form" style="ime-mode:disabled;width:82px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('cgo_pu'), frm1.cgo_pu_trdp_nm.value);}"><!-- 
								--><input type="hidden" name="cgo_pu_trdp_addr" id="cgo_pu_trdp_addr" value='<bean:write name="hblVO" property="cgo_pu_trdp_addr"/>'>
							</td>
						</tr>
						<tr>
							<th><bean:message key="Pier"/></th>
                            <td><input name="rcv_wh_cd" id="rcv_wh_cd" value='<bean:write name="hblVO" property="rcv_wh_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode_rcv',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_rcv',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" style="ime-mode:disabled; text-transform:uppercase;width:50px;" onblur="strToUpper(this);"><!--
                            	--><button type="button"  id="rcv" name="rcv" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
                            	--><input type="text" name="rcv_wh_nm" id="rcv_wh_nm" value='<bean:write name="hblVO" property="rcv_wh_nm"/>' class="search_form" style="ime-mode:disabled;width:82px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('rcv'), frm1.rcv_wh_nm.value);}" maxlength="50">
                            </td>
						</tr>
						<tr>
							<th><bean:message key="Trucker"/></th>
							<td><input type="text" name="trk_trdp_cd" id="trk_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="trk_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_trk',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_trk',this, 'onBlur')" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
								--><button type="button"  id="trk" name="trk" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
								--><input type="text"   name="trk_trdp_nm" id="trk_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="trk_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:82px;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('trk'), frm1.trk_trdp_nm.value);}">
							</td>
			            </tr>
					</table>
					<table>
						<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
	                       		<th><bean:message key="Customer_Ref_No"/></th>
		                     	<td><input type="text" name="cust_ref_no" id="cust_ref_no" maxlength="40"  value="<bean:write name="hblVO" property="cust_ref_no"/>" class="search_form" style="ime-mode:disabled;text-transform:uppercase;width:165px;" onblur="strToUpper(this)" ></td>
	                       	</tr>
						</tbody>
                    </table>
                    <table>
                    	<tr>
                        	<%-- <th style="text-align: left;"><bean:message key="Container_Size_Qty"/></th> --%>
                        	<th style="text-align: left; padding-left: 2px;"><bean:message key="Container_Summary"/></th>
                      	</tr>
                        <tr>
                        	<td style="padding-left: 2px;"><input type="text" readOnly name="cntr_info" id="cntr_info" value='<bean:write name="hblVO" property="cntr_info" filter="false"/>' onBlur="strToUpper(this)" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:282px;" maxlength="500"></td>
                      	</tr>
					</table>
					<%-- <div class="opus_design_grid">
                            <h3 class="title_design"><bean:message key="Container_List"/></h3>
                            <div class="opus_design_btn">
                                <button type="button" class="btn_accent" name="cnrtAdd" id="cnrtAdd"
                                        onClick="cntrGridAdd(sheet4);"><bean:message key="Add"/></button>
                            </div>
                            <script type="text/javascript">comSheetObject('sheet4');</script>
                    </div> --%>
				</div>
			</div>
			<div class="layout_vertical_4 pad_left_8" style="width: 360px;">
				<div class="opus_design_inquiry sm" style="height: 500px;">
					<h3 class="title_design"><bean:message key="Vessel"/></h3>
					<table>
						<colgroup>
							<col width="110">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="VSL_VOY"/></th>
                                <td><input type="hidden" name="trnk_vsl_cd" id="trnk_vsl_cd" maxlength="50" value='<bean:write name="hblVO" property="trnk_vsl_cd"/>' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('srVessel',this, 'onBlur');" style="ime-mode:disabled; text-transform:uppercase;width:40px;"><!--
                                	--><input type="text" name="trnk_vsl_nm" id="trnk_vsl_nm" value='<bean:write name="hblVO" property="trnk_vsl_nm"/>' onblur="strToUpper(this);" class="search_form" style="ime-mode:disabled;width:123px;text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openPopUp('VESSEL_POPLIST', document.getElementById('trunkvessel'), frm1.trnk_vsl_nm.value);}"><!--
                                	--><button type="button"  id="trunkvessel" name="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="openPopUp('VESSEL_POPLIST',this);"></button><!--
                                	--><span class="dash">/</span><input type="text" name="trnk_voy" id="trnk_voy" value='<bean:write name="hblVO" property="trnk_voy"/>' onblur="strToUpper(this);"  class="search_form" style="ime-mode:disabled;width:60px;text-transform:uppercase;" maxlength="15">
                               	</td>
							</tr>
						</tbody>
					</table>
					<h3 class="title_design"><bean:message key="Route"/></h3>
					<table>
						<colgroup>
							<col width="110">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="POR"/></th>
                                <td><input type="text" name="por_cd" id="por_cd" maxlength="5" value='<bean:write name="hblVO" property="por_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_por',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_por',this, 'onBlur','S')" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
                                	--><button type="button"  id="por" name="por" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!--
                                	--><input type="text" name="por_nm" id="por_nm" maxlength="50" value='<bean:write name="hblVO" property="por_nm"/>' class="search_form" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('por'), frm1.por_nm.value);}">
								</td>
							</tr>
							<tr>
								<th><bean:message key="POL"/></th>
								<td><input type="text" name="pol_cd" id="pol_cd" maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pol',this, 'onBlur','S')" style="ime-mode:disabled; text-transform:uppercase;width:50px;" required="required"><!--
									--><button type="button"  id="pol" name="pol" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!--
									--><input type="text" name="pol_nm" id="pol_nm" maxlength="50"  value='<bean:write name="hblVO" property="pol_nm"/>' class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:140px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}" required="required">
								</td>
							</tr>
							<tr>
								<th><bean:message key="POD"/></th>
								<td><input type="text" name="pod_cd" id="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pod',this, 'onBlur','S')" style="ime-mode:disabled; text-transform:uppercase;width:50px;" required="required"><!--
									--><button type="button"  id="pod" name="pod" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!--
									--><input type="text" name="pod_nm" id="pod_nm" maxlength="50"  value='<bean:write name="hblVO" property="pod_nm"/>' class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:140px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pod'), frm1.pod_nm.value);}" required="required">
								</td>
							</tr>
							<tr>
								<th><bean:message key="DEL"/></th>
								<td><input type="text" name="del_cd" id="del_cd" maxlength="5" value='<bean:write name="hblVO" property="del_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_del',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_del',this, 'onBlur','S')" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button"  id="del" name="del" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!--
									--><input type="text" name="del_nm" id="del_nm" maxlength="50" value='<bean:write name="hblVO" property="del_nm"/>' class="search_form" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('del'), frm1.del_nm.value);}">
								</td>
							</tr>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="110">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="F_Dest"/></th>
								<td><input type="text" name="fnl_dest_loc_cd" id="fnl_dest_loc_cd" maxlength="5" value='<bean:write name="hblVO" property="fnl_dest_loc_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_dest',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_dest',this, 'onBlur','S')" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button"  id="dest" name="dest" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!--
									--><input type="text" name="fnl_dest_loc_nm" id="fnl_dest_loc_nm" maxlength="50" value='<bean:write name="hblVO" property="fnl_dest_loc_nm"/>' class="search_form" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('dest'), frm1.fnl_dest_loc_nm.value);}">
								</td>
							</tr>
							<tr>
								<th><bean:message key="Liner"/></th>
								<td><input type="text" name="lnr_trdp_cd" id="lnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_liner',this, 'onKeyDown');" onBlur="strToUpper(this);codeNameAction('trdpCode_liner',this, 'onBlur');" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button"  id="liner" name="liner" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this);"></button><!--
									--><input type="text"   name="lnr_trdp_nm" id="lnr_trdp_nm" maxlength="50"  value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this);" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}">
								</td>
							</tr>
							<tr>
								<th><bean:message key="Liner_Bkg"/></th>
	                           	<td><input name="lnr_bkg_no" id="lnr_bkg_no" value='<bean:write name="hblVO" property="lnr_bkg_no"/>' type="text" class="search_form" onblur="strToUpper(this)" style="ime-mode:disabled; text-transform:uppercase;width:223px;" ></td>
							</tr>
							<tr>
								<th><bean:message key="Carrier_SC_No"/></th>
	                           	<td><input name="lnr_ctrt_no" id="lnr_ctrt_no" maxlength=20 value='<bean:write name="hblVO" property="lnr_bkg_no"/>' type="text" class="search_form" onblur="strToUpper(this)" style="ime-mode:disabled; text-transform:uppercase;width:223px;" ></td>
							</tr>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="110">
							<col width="80">
							<col width="70">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="ETD_of_POL"/></th>
								<td><input type="text" name="etd_dt_tm" id="etd_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETD of POL');" required="required"></td>
								<th><bean:message key="ETA_of_POD"/></th>
								<td><input type="text" name="eta_dt_tm" id="eta_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETA of POD');"></td>
							</tr>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="110">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="ETD_Of_POR"/></th>
								<td><input name="etd_por_tm" id="etd_por_tm" value='<wrt:write name="hblVO" property="etd_por_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'   type="text" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETD of POR');" style="ime-mode:disabled;width:70px;" maxlength="10"></td>
							</tr>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="110">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Ship_Mode"/></th>
								<td>
									<bean:define id="shipModeList" name="valMap" property="shipModeList"/>
									<html:select name="hblVO" property="shp_mod_cd" styleClass="search_form" style="width:70px; background-color: #d4f6ff;" onchange="shipModeChange();">
										<html:options collection="shipModeList" property="cd_val" labelProperty="cd_nm"/>
									</html:select>
								</td>
							</tr>
							<tr>
								<th><bean:message key="Commodity"/></th>
								<td><input type="text" name="rep_cmdt_cd" id="rep_cmdt_cd" maxlength="13" value="<bean:write name="hblVO" property="rep_cmdt_cd"/>" class="search_form" onKeyDown="codeNameAction('commodity',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('commodity',this, 'onBlur')" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button"  id="commodity" name="commodity" class="input_seach_btn" tabindex="-1" onClick="openPopUp('COMMODITY_POPLIST',this)"></button><!--
									--><input type="text" name="rep_cmdt_nm" id="rep_cmdt_nm" value="<bean:write name="hblVO" property="rep_cmdt_nm"/>" maxlength="100" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onBlur="strToUpper(this);" onchange="" onKeyPress="if(event.keyCode==13){openPopUp('COMMODITY_POPLIST', this);}">
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="layout_vertical_4 pad_left_8" style="width: calc(100% - 945px);">
				<div class="opus_design_inquiry sm" style="height: 500px;">
					<h3 class="title_design"><bean:message key="Shippment_and_Item"/></h3>
					<table>
						<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
                           		<th><bean:message key="Freight"/></th>
                               <td colspan="3">
                                   <bean:define id="frtList" name="valMap" property="frtCdList"/>
                                   <html:select name="hblVO" property="frt_term_cd" styleClass="search_form" style="width:80px;">
                                       <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/>
                                   </html:select><!-- 
                                   --><input type="hidden" name="h_frt_term_cd" value="<bean:write name="hblVO" property="frt_term_cd"/>">
                               </td>
                            </tr>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Package"/></th>
								<td><input type="text" name="pck_qty" id="pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" maxlength="7"  class="search_form zero_remove" style="ime-mode:disabled;width:60px;text-align:right"><!--
									--><bean:define id="pckList" name="valMap" property="pckCdList"/><!--
									--><html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:126px;" >
											<option></option>
											<html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
										</html:select> 
								</td>
							</tr>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="GWeight"/></th>
								<td><input type="text" name="grs_wgt" id="grs_wgt" value="<bean:write name="hblVO" property="grs_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);weightChange(this);" maxlength="13" class="search_form zero_remove" style="ime-mode:disabled;width:60px;text-align:right;"><!--
									--><input type="text" name="grs_wgt_ut_cd" id="grs_wgt_ut_cd" value="K" style="width:30px;border:0;background-color:transparent;" tabindex="-1" readOnly><!--
									--><input type="text" name="grs_wgt1" id="grs_wgt1" value="<bean:write name="hblVO" property="grs_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);weightChange(this);" maxlength="13" class="search_form zero_remove" style="ime-mode:disabled;width:60px;text-align:right;"><!--
									--><input type="text" name="grs_wgt_ut_cd1" id="grs_wgt_ut_cd1" value="L" style="width:30px;border:0;background-color:transparent;" tabindex="-1" readOnly>
								</td>
							</tr>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Measurement"/></th>
								<td><input type="text" name="meas" id="meas" value="<bean:write name="hblVO" property="meas"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" maxlength="13" class="search_form zero_remove" style="ime-mode:disabled;width:60px;text-align:right;"><!--
									--><input type="text" name="meas_ut_cd" id="meas_ut_cd" value="CBM" style="width:30px;border:0;background-color:transparent;" tabindex="-1" readOnly><!--
									--><input type="text" name="meas1" id="meas1" value="<bean:write name="hblVO" property="meas1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);cbmChange(this);" maxlength="13" class="search_form zero_remove" style="ime-mode:disabled;width:60px;text-align:right;"><!--
									--><input type="text" name="meas_ut_cd1" id="meas_ut_cd1" value="CFT" style="width:30px;border:0;background-color:transparent;" tabindex="-1" readOnly>
								</td>
							</tr>
						</tbody>
					</table>
                    <table>
                    	<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
	                           	<th><bean:message key="SVC_Term"/></th>
                               	<td><bean:define id="serviceList" name="valMap" property="serviceList"/>
                                   	<html:select name="hblVO" property="fm_svc_term_cd" styleClass="search_form" style="width:85px;" onchange="svcTermChange();">
                                   		<html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                   </html:select><span class="dash">~</span><!--
                                   --><html:select name="hblVO" property="to_svc_term_cd" styleClass="search_form" style="width:85px;">
                                   		<html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                   </html:select><!--
                                   --><input type="hidden" name="h_fm_svc_term_cd" id="h_fm_svc_term_cd" value="<bean:write name="hblVO" property="fm_svc_term_cd"/>"><!--
                                   --><input type="hidden" name="h_to_svc_term_cd" id="h_to_svc_term_cd" value="<bean:write name="hblVO" property="to_svc_term_cd"/>">
                              	</td>
	                       	</tr>
						</tbody>
                   	</table>
                   	<table>
                   		<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
                            	<th><bean:message key="Cargo_Type"/></th>
								<td>
									<bean:define id="cargoTpCdList" name="valMap" property="cargoTpCdList"/>
									<html:select name="hblVO" property="cargo_tp_cd" styleClass="search_form" style="width:85px;">
										<html:options collection="cargoTpCdList" property="cd_val" labelProperty="cd_nm"/>
									</html:select>
								</td>
                        	</tr>
						</tbody>
               		</table>
					<table>
						<colgroup>
							<col width="120">
							<col width="110">
							<col width="30">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Port_Cut_Off_Date"/></th>
								<td><input type="text" name="cut_off_dt" id="cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Port Cut-Off Date');"><!--
									--><button type="button" id="cut_off_dt_cal" name="cut_off_dt_cal" onclick="doDisplay('DATE1' ,frm1.cut_off_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="cut_off_tm" id="cut_off_tm" value='<wrt:write name="hblVO" property="cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>
							<tr>
								<th><bean:message key="Rail_Cut_Off_Date"/></th>
								<td><input type="text" name="rail_cut_off_dt" id="rail_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="rail_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Rail Cut-Off Date');"><!--
									--><button type="button" id="rail_cut_off_dt_cal" name="rail_cut_off_dt_cal" onclick="doDisplay('DATE1' ,frm1.rail_cut_off_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="rail_cut_off_tm" id="rail_cut_off_tm" value='<wrt:write name="hblVO" property="rail_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>
							<tr>
								<th><bean:message key="W/H_Cut_Off_Date"/></th>
								<td><input type="text" name="wh_cut_off_dt" id="wh_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="wh_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'W/H Cut-Off Date');"><!--
									--><button type="button" id="wh_cut_off_dt_cal" name="wh_cut_off_dt_cal" onclick="doDisplay('DATE1' ,frm1.wh_cut_off_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="wh_cut_off_tm" id="wh_cut_off_tm" value='<wrt:write name="hblVO" property="wh_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>
							<tr>
								<th><bean:message key="DOC_Cut_Off_Date"/></th>
								<td><input type="text" name="doc_cut_off_dt" id="doc_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="doc_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'DOC Cut-Off Date');"><!--
									--><button type="button" id="doc_cut_off_dt_cal" name="doc_cut_off_dt_cal" onclick="doDisplay('DATE1' ,frm1.doc_cut_off_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="doc_cut_off_tm" id="doc_cut_off_tm" value='<wrt:write name="hblVO" property="doc_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tr>
							<th><bean:message key="Sales_OFC"/></th>
							<td><input type="text"   name="sls_ofc_cd" id="sls_ofc_cd" value="<bean:write name="hblVO" property="sls_ofc_cd"/>" class="search_form-disable" style="width:70px;" tabindex="-1" readonly><!--
								--><button type="button"  id="btn_Sales_OFC" name="btn_Sales_OFC" class="input_seach_btn" tabindex="-1" onClick="openPopUp('OFFICE_GRID_POPLIST',this)"></button>
							</td>
						</tr>
						<tr>
							<th><bean:message key="Sales_PIC"/></th>
			               	<td><input type="text"   name="sls_usrid" id="sls_usrid" value="<bean:write name="hblVO" property="sls_usrid"/>"  class="search_form-disable" style="width:70px;" readOnly><!--
			               		--><button type="button"  id="salesperson" name="salesperson" class="input_seach_btn" tabindex="-1" onClick="openPopUp('USER_POPLIST',this)"></button><!--
			               		--><input type="hidden" name="sls_usr_nm" id="sls_usr_nm" value="<bean:write name="hblVO" property="sls_usr_nm"/>" class="search_form-disable" style="width:120px;" tabindex="-1" readOnly><!--
			               		--><input type="hidden" name="sls_dept_cd" id="sls_dept_cd" value="<bean:write name="hblVO" property="sls_dept_cd"/>"></td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<%-- <div class="opus_design_inquiry sm">
			<h3 class="title_design"><bean:message key="Remark"/></h3>
			<table>
				<tr>
		       		<td>
		           		<textarea name="rmk" id="rmk" cols="200" rows="4" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" style="width: 1270px">
<bean:write name="hblVO" property="rmk" filter="false"/></textarea>
		           </td>
		       </tr> 
			</table>
		</div> --%>
		</div>
        
		<div id="tabLayer" name="tabLayer" style="display:none"><!--Container-->
            <div class="layout_vertical_2" style="width: 20%">
                <div class="opus_design_grid">
                    <h3 class="title_design"><bean:message key="Container_PO"/></h3>

                    <div class="opus_design_btn">
                        <button type="button" class="btn_accent" name="cnrtAdd" id="cnrtAdd"
                                onClick="cntrGridAddCustom(sheet3);"><bean:message key="Add"/></button>
                    </div>
                    <script type="text/javascript">comSheetObject('sheet3');</script>
                </div>
            </div>
            <div class="layout_vertical_2 mar_left_8" style="width: 79%">
                <div class="opus_design_grid">
                    <h3 class="title_design"><bean:message key="PO"/></h3>

                    <div class="opus_design_btn">
                        <button type="button" class="btn_normal" onClick="doWork('PO_ADD')">
                            <bean:message
                                    key="Load_PO"/></button>
                    </div>
                    <script type="text/javascript">comSheetObject('sheet2');</script>
                </div>
            </div>
        </div>
		<div id="tabLayer" name="tabLayer" style="display:none">
	        <div class="opus_design_inquiry sm" style="height: 300px;">
				<h3 class="title_design"><bean:message key="Remark"/></h3>
				<table style="height: 93%;">
					<tr>
			       		<td>
			           		<textarea name="rmk" id="rmk" cols="200" rows="16" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" style="width: 100%; height: 100%;">
<bean:write name="hblVO" property="rmk" filter="false"/></textarea>
			           </td>
	    			<tr>
			           
			       </tr> 
				</table>
			</div>
        </div>
        <div id="tabLayer" name="tabLayer" style="display:none">
        	<div class="opus_design_grid">
                <h3 class="title_design"><bean:message key="Account_Receivable"/></h3>

     			<div class="opus_design_btn" style="height: 29px;">
					<div style="display: none;" class="grid_option_left">
						<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[5], 'frtTableS')"><bean:message key="Plus"/></button><!-- 
					 --><button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[5], 'frtTableS')"><bean:message key="Minus"/></button>	
					</div>
					<div class="grid_option_left" id="sdBtns" >
					 	<button style="display: none;" type="button" class="btn_normal"  onClick="goToInvoice(docObjects[5],'LOCAL')" ><bean:message key="B.AR"/></button><!--
					 --><button style="display: none;" type="button" class="btn_normal"  onClick="goToInvoiceModify('LOCAL')" ><bean:message key="Invoice"/></button><!--
					 --><span style="display: none;" id="btnPierpass"><button type="button" class="btn_normal"  onClick="addPierPassFrt(frm1.intg_bl_seq.value, 'H', frm1.shp_mod_cd.value, 'O', 'S')" ><bean:message key="PIERPASS"/></button></span><!--
					 --><button id="FrtAddDefault" type="button" class="btn_normal"  onclick="setDfltFrtCustom('', 'S', 'O', 'H');" ><bean:message key="Default"/> <bean:message key="New"/></button><!--
					 --><button id="FrtAdd" type="button" class="btn_normal"  onclick="frtRowAddCustom('ROWADD', docObjects[3], 'S', 'O', 'H');" > <bean:message key="Add"/></button>	
					</div>
				</div>
                <script type="text/javascript">comSheetObject('sheet5');</script>
            </div>
        </div>
        <div id="tabLayer" name="tabLayer" style="display:none">
        	<div class="opus_design_grid" id="mainTable">
				<h3 class="title_design mar_btm_8"><bean:message key="Work_Order_List"/></h3>
				<div class="opus_design_btn">
					<button style="display:none" type="button" class="btn_accent" name="goWoObj" id="goWoObj" onClick="doWork('WORKORDER')" style="display:none;margin-left:9px;cursor:hand"> <bean:message key="WorkOrder"/></button>
				</div>
				<script type="text/javascript">comSheetObject('sheet6');</script>
			</div>
        </div>
    </div>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" id="goWhere" value="fd"/>
    <input type="hidden" name="bcKey" id="bcKey"   value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" id="s_palt_doc_seq" value=""/>
    <input type="hidden" name="docType" id="docType" value=""/>
</form>
 <script type="text/javascript">
	doBtnAuthority(attr_extension);
</script>	