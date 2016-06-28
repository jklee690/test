<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIE_BMD_0041.jsp
*@FileTitle  : MAWB HBL 등록 조회팝업
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
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js"></script>
    <script language="javascript" src="./apps/fis/aie/bmd/masterbl/script/AIE_BMD_0041.js"></script>
	<base target="_self"/>
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onload="javascript:loadPage();initFinish();doWork('SEARCHLIST');">
	<form name="frm1" method="POST" action="./">
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="air_sea_clss_cd"/>
		<input	type="hidden" name="bnd_clss_cd"/>
		<input	type="hidden" name="f_CurPage"/> 	

	<table width="750" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td class="td">
				<table width="100%" border="0" cellpadding="0" cellspacing="0"/>
					<tr>
						<td width="100%" class="bigtitle"><bean:message key="MAWB_Mapping"/></td>
					</tr>
			        <tr>
			            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			        </tr>
					<tr>
						<td height="10" align="right">
							<table border="0" cellspacing="0" cellpadding="0">
								<tr>
                                    <td style="cursor:hand" onclick="doWork('USEHBL')">
                                        <table height="21" border="0" cellpadding="0" cellspacing="0" >
                                            <tr>
                                                <td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
                                                <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Use_HBL"/></td>
                                                <td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="3">&nbsp;</td>
									<td style="cursor:hand" onclick="doWork('SEARCHLIST')">
										<table height="21" border="0" cellpadding="0" cellspacing="0" >
											<tr>
												<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
												<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
											</tr>
										</table>
									</td>
									<td width="3">&nbsp;</td>
									<td style="cursor:hand" onclick="doWork('CLOSE')">
										<table height="21" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Close"/></td>
												<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
<!-------------------- button end -------------------->
					<tr>
						<td height="7"></td>
					</tr>
<!-------------------- search begin -------------------->
					<tr>
						<td>
							<table width="100%" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td align="left" class="table_search_bg">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td height="5" colspan="11"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
											</tr>
                                            <tr>
                                                <td class="table_search_head"><bean:message key="Airline"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="f_lnr_nm"  maxlength="50"  class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115;"/>
                                                </td>
                                                <td width="10"></td>
                                                <td class="table_search_head"><bean:message key="Flight_No"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="f_flt_no" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70;" maxlength="20" onblur="strToUpper(this)" onkeydown="onlyNumberCheck()">
                                                </td>
                                                <td width="10"></td>
                                                <td colspan="5" class="table_search_head_r"><bean:message key="Flight_Date"/>
                                                    <input type="text" name="etd_strdt" class="search_form" dataformat="excepthan" style="width:77px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)">
                                                    ~
                                                    <input type="text" name="etd_enddt" class="search_form" dataformat="excepthan" style="width:77px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)">
                                                    <img id="etd_dt_cal" onclick="doDisplay('DATE11', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="60" class="table_search_head"><bean:message key="HAWB"/></td>
                                                <td width="116" class="table_search_body">
                                                    <input name="f_hbl_no" maxlength="40" type="text" class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115;"/>
                                                </td>
                                                <td width="10"></td>
                                                <td width="80" class="table_search_head"><bean:message key="Office"/></td>
                                                <td class="table_search_body">
													<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
													<bean:define id="oficeList" name="valMap" property="ofcList"/>
													<select name="f_ofc_cd" style="width:115;"/>
												<logic:iterate id="ofcVO" name="oficeList">
														<option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_eng_nm"/></option>
												</logic:iterate>
													</select>
                                                </td>
                                                <td width="10"></td>
                                                <td width="70" class="table_search_head_r"><bean:message key="Dept"/></td>
                                                <td class="table_search_body">
                                                    <bean:define id="dptLst" name="valMap" property="deptList"/>
                                                    <html:select name="valMap" property="f_dpt_cd" style="width:95px;">
                                                        <option value="">All</option>
                                                        <html:options collection="dptLst" property="cd_val" labelProperty="cd_nm"/>
                                                    </html:select>
                                                </td>
                                                <td width="10"></td>
                                                <td class="table_search_head_r"><bean:message key="Issued_By"/></td>
                                                <td>
                                                    <input type="text" name="f_pic_id" value='<bean:write name="valMap" property="curPic"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80;">
                                                </td>                                            
											</tr>
											<tr>
												<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
											</tr>
										</table>
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr><td height="10px"></td></tr>
					<tr>
						<td>
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="left" class="table_search_bg">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td height="4" colspan="8"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
											</tr>
											<tr>
												<td width="55" class="table_search_head_r"><bean:message key="Air_Line"/></td>
                                                <td width="115">
													<input type="text"   name="cur_trnk_vsl" value="" class="search_form-disable" style="width:170;" readonly>
													<input type="hidden" name="cur_obrd_dt_tm" value="">
                                                    <input type="hidden" name="cur_pol_cd"     value="">
													<input type="hidden" name="cur_pod_cd"     value="">
                                                </td>
                                                <td width="10"></td>
												<td width="70" class="table_search_head_r"><bean:message key="Flight_No"/></td>
                                                <td>
													<input type="text"   name="cur_trnk_voy" value="" class="search_form-disable" style="width:115;" readonly>
                                                </td>
											</tr>
											<tr><td height="20" colspan="8"></td></tr>
											<tr>
												<td colspan="8">
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="HBL_List"/></td>
                                                            <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                        </tr>
                                                        <tr>
                                                            <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                        </tr>
                                                    </table>
                                                </td>
											</tr>		
										</table>
										<table border="0" width="100%" id="mainTable">								
											<tr>
												<td>
													 <script language="javascript">comSheetObject('sheet1');</script>
												 </td>
											</tr>
										</table>
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td height="4" align="center">
													<img onclick="hblToSrList()" src="<%=CLT_PATH%>/web/img/main/arrow_b.gif" style="cursor:hand;">
													<img onclick="srListToHbl()" src="<%=CLT_PATH%>/web/img/main/arrow_t.gif" style="cursor:hand;">
												</td>
											</tr>

											<tr><td height="20"></td></tr>
                                            <tr>
                                                <td>
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td nowrap class="sub_title" width="200"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="HBL_List_in_Shipping_Request"/></td>
                                                            <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                        </tr>
                                                        <tr>
                                                            <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
										</table>
										<table border="0" width="100%" id="mainTable">                              
											<tr>
												<td colspan = "2">
													<script language="javascript">comSheetObject('sheet2');</script>
												 </td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>		
	</form>
</body>
</html>