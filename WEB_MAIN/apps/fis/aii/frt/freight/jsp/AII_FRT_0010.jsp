<%--
=========================================================
*@FileName   : AII_FRT_0010.jsp
*@FileTitle  : HAWB Freight
*@Description: 항공수입 HBL Freight
*@author     : Kang,Jung-Gu
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<bean:define id="blInfo" name="EventResponse" property="objVal"/>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css">
	<title><bean:message key="system.title"/></title>
    
    <script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
		
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/frt/freight/script/FRT_CMM_UTIL.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/aii/frt/freight/script/AII_FRT_0010.js"></script>
		
<script>
    <% String ofc_curr = "";
       String stdCurr  = ""; 
       String trf_cur_cd = "";   //Invoice Currency
       String to_rt_ut = "";
    %>
        <bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
        <% boolean isBegin = false; 
           boolean isWritabl = false;
        %>
        <logic:equal name="rtnMap" property="cmd_right" value="E">
            <% isWritabl = true;%>
        </logic:equal>
    
        var UNITCD1 = '';
        var UNITCD2 = '';
        <logic:notEmpty name="rtnMap" property="UNITCD">
            <bean:define id="unitList" name="rtnMap" property="UNITCD"/>
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

    
        <!-- Currency 조회 -->
        <logic:notEmpty name="rtnMap" property="OfcCurrency">
            <bean:define id="curMap" name="rtnMap" property="OfcCurrency"/>
            <%  HashMap tmpMap = (HashMap)curMap;
                ofc_curr     = (String)tmpMap.get("ofccurr_cd");
                trf_cur_cd = (String)tmpMap.get("trf_cur_cd");
                to_rt_ut    = (String)tmpMap.get("to_rt_ut");
            %>
        </logic:notEmpty>
        var obdtCur = '<%=to_rt_ut%>';
    
        <!-- Default Performance Currency -->
        <logic:notEmpty name="rtnMap" property="STDCURR">
            <bean:define id="stdPerfCurr" name="rtnMap" property="STDCURR"/>
            <% stdCurr = (String)stdPerfCurr; %>
        </logic:notEmpty>

        var dfPerfCurr = '<%=stdCurr%>';
</script>
</head>
<body class="td" onLoad="javascript:loadPage();doWork('SEARCHLIST02');doWork('SEARCHLIST03');doHideProcess();">
<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd"        value="">
	<input type="hidden" name="f_CurPage"    value="">
    <input type="hidden" name="intg_bl_seq"  value="<bean:write name="blInfo" property="intg_bl_seq"/>">
	<input type="hidden" name="curRow2"      value="">
    <input type="hidden" name="curRow5"      value="">
	<input type="hidden" name="f_CurTab"     value="01">
	<input type="hidden" name="ofc_curr"     value="<%=ofc_curr%>">
	<input type="hidden" name="trf_cur_cd"   value="<%=trf_cur_cd%>">
    <input type="hidden" name="xcrtDt"        value="<bean:write name="blInfo" property="obrd_dt_tm"/>">

	<input type="hidden" name="objPfx"       value="">		
	<html:hidden name="rtnMap" property="f_ofc_cnt_cd"/>
	<html:hidden name="rtnMap" property="f_mbl_frt_cfm"/>
	
	<!--Invoice추가-->	
    <input type="hidden" name="tax_bil_flg"  value="">  
	<input type="hidden" name="inv_dt"       value="">
    <input type="hidden" name="inv_due_dt"   value="">  
    <input type="hidden" name="inv_rmk"      value="">  
    <input type="hidden" name="buy_inv_no"   value="">  
		
    <!-- 타이틀, 네비게이션 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><%=LEV3_NM%></td>
            <td align="right" nowrap class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span></td>
        </tr>
    </table>
    <!-- 타이틀, 네비게이션 -->
    <!--빈공간 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 소타이틀, 대버튼 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td onClick="doWork('SEARCHLIST')" style="cursor:hand">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>            
                        </td>
                <% if(isWritabl){ %>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td id="btnSave" onClick="doWork('SAVE')" style="display:block;cursor:hand;">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>            
                        </td>
                <% } %>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!-- 소타이틀, 대버튼 -->
    <!--빈공간 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
	<table width="950" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td align="left" class="table_search_bg"><!-- 간격 -->
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					</tr>
				</table>
				<!-- 간격 -->
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td align="left" valign="top">
							<table border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td nowrap class="table_search_head"><bean:message key="HAWB_No"/></td>
									<td nowrap class="table_search_body">          
										<input type="text" name="f_house_bl_no" value="<bean:write name="rtnMap" property="f_house_bl_no"/>"  class="search_form" style="width:115px;">
										<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" onclick="doWork('HBL_POPLIST');"  style="cursor:hand;" width="19" height="18" border="0" align="absmiddle">
									</td>
									<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
									<td nowrap class="table_search_head"><bean:message key="Booking_No"/></td>
									<td nowrap class="table_search_body">
	                                    <input type="text" name="f_bkg_no"      value="<bean:write name="rtnMap" property="f_bkg_no"/>"       class="search_form-disable" style="width:115px;" readonly>
										<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" onclick="doWork('BKNO_POPLIST');" style="cursor:hand;" width="19" height="18" border="0" align="absmiddle">
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
					<!-- 간격 -->
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					</tr>
				</table>
					<!-- 간격 -->
			</td>
		</tr>
	</table>
    <!--빈공간 -->
    <!--빈공간 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 검색 결과 -->
    <table width="950" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="BL_Information"/></td>
                        <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td valign="top">
                            <table width="100%" border="0" cellspacing="1" cellpadding="0" class="table">
								<tr>
                                    <td width="60px" class="grid_head"><bean:message key="MAWB_No"/></td>
                                    <td width="200px"class="table_body_l" colspan="2">
										<bean:write name="blInfo" property="mbl_no"/>
                                        <input type="hidden" name="master_bl_no" value="<bean:write name="blInfo" property="mbl_no"/>">
                                    </td>
                                    <td width="75px"  class="grid_head"><bean:message key="HAWB_No"/></td>
                                    <td width="120px" class="table_body_l">
										<bean:write name="blInfo" property="hbl_no"/>
                                        <input type="hidden" name="house_bl_no"    value='<bean:write name="blInfo" property="hbl_no"/>'>
                                    </td>
                                    <td width="75px" class="grid_head"><bean:message key="Flight_No"/></td>
                                    <td width="120px" class="table_body_l">
										<bean:write name="blInfo" property="flt_no"/>
                                    </td>
                                    <td width="90px" class="grid_head"><bean:message key="Booking_No"/></td>
                                    <td class="table_body_l">
										<bean:write name="blInfo" property="bkg_no"/>
										<input type="hidden" name="bkg_no"         value="<bean:write name="blInfo" property="bkg_no"/>">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="grid_head"><bean:message key="Shipper"/></td>
                                    <td class="table_body_c" width="45">
                                        <bean:write name="blInfo" property="shpr_trdp_cd"/>
                                        <input type="hidden" name="hid_act_cd"     value="<bean:write name="blInfo" property="act_trdp_cd"/>"><!--Actual Shipper-->
                                        <input type="hidden" name="hid_act_nm"     value="<bean:write name="blInfo" property="act_trdp_nm"/>">
                                        <input type="hidden" name="hid_act_cnt_cd" value="">
                                    </td>
                                    <td class="table_body_l" width="155">
                                        <bean:write name="blInfo" property="shpr_trdp_nm"/>
                                    </td>
                                    <td class="grid_head"><bean:message key="Flight_Date"/></td>
                                    <td class="table_body_l"><wrt:write name="blInfo" property="obrd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy.MM.dd"/>
                                        <input type="hidden" name="obrd_dt_tm" value="<bean:write name="blInfo" property="obrd_dt_tm"/>">
                                    </td>
                                    <td class="grid_head"><bean:message key="Departure"/></td>
                                    <td class="table_body_l">
                                        <bean:write name="blInfo" property="pol_nod_cd"/>
                                        <input type="hidden" name="f_pol_cd" value="<bean:write name="blInfo" property="pol_nod_cd"/>">
                                    </td>
                                      <td class="grid_head"><bean:message key="Destination"/></td>
                                    <td class="table_body_l">
                                        <bean:write name="blInfo" property="pod_nod_cd"/>
                                        <input type="hidden" name="f_pod_cd" value="<bean:write name="blInfo" property="pod_nod_cd"/>">
                                    </td>
                                </tr>
								<tr>
                                    <td class="grid_head"><bean:message key="Partner"/></td>
                                    <td class="table_body_c">
                                        <bean:write name="blInfo" property="prnr_trdp_cd"/>
                                    </td>
                                    <td class="table_body_l">
                                        <bean:write name="blInfo" property="prnr_trdp_nm"/>
                                    </td>
                                    <td class="grid_head"><bean:message key="Incoterms"/></td>
                                    <td class="table_body_l">
                                        <bean:write name="blInfo" property="inco_cd"/>
                                    </td>
                                    <td class="grid_head"><bean:message key="CWeight"/></td>
                                    <td class="table_body_r">
                                        <bean:write name="blInfo" property="chg_wgt"/>&nbsp;<bean:write name="blInfo" property="chg_wgt_ut"/>
                                        <html:hidden name="blInfo" property="chg_wgt_ut"/>
                                    </td>
                                    <td class="grid_head"><bean:message key="Measurement"/></td>
                                    <td class="table_body_r">
                                        <bean:write name="blInfo" property="meas"/>&nbsp;<bean:write name="blInfo" property="meas_ut"/>
                                        <html:hidden name="blInfo" property="meas_ut"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="grid_head"><bean:message key="Airline"/></td>
                                    <td class="table_body_c">
                                        <bean:write name="blInfo" property="lnr_trdp_cd"/>
                                        <input type="hidden" name="hid_lin_cd" value="<bean:write name="blInfo" property="lnr_trdp_cd"/>">
                                        <input type="hidden" name="hid_lin_nm" value="<bean:write name="blInfo" property="lnr_trdp_nm"/>">
                                    </td>
                                    <td class="table_body_l">
                                        <bean:write name="blInfo" property="lnr_trdp_nm"/>
                                    </td>
                                    <td class="grid_head"><bean:message key="FRT_Term"/></td>
                                    <td class="table_body_l">
                                        <bean:write name="blInfo" property="frt_term_cd"/>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td width="70" nowrap class="table_search_head"><bean:message key="KRW_USD"/></td>
                        <td align="left" class="table_search_body" style="text-valing:middle">
							<input type="text" name="dispCur"    value='<%=to_rt_ut%>'  class="search_form"  style="text-align:right;width:90px;" readonly>
                        </td>
						<td width="170">&nbsp;</td>
						<td width="115" nowrap class="table_search_head"><bean:message key="Selling_Buying_D"/>:</td>
						<td align="left" class="table_search_body" style="text-valing:middle">
							<input type="text" name="sb_usd"    value=''  class="search_form"  style="text-align:right;width:90px;" readonly>
						</td>
						<td width="10">&nbsp;</td>
						<td width="102" nowrap class="table_search_head"><bean:message key="Debit_Credit_D"/>:</td>
						<td align="left" class="table_search_body">
							<input type="text" name="dc_usd"    value=''  class="search_form"  style="text-align:right;width:90px;" readonly>
						</td>
						<td width="10">&nbsp;</td>
						<td width="65" nowrap class="table_search_head"><bean:message key="Profit"/>($):</td>
						<td align="left" class="table_search_body">
							<input type="text" name="profit"    value=''  class="search_form"  style="text-align:right;width:100px;" readonly>
						</td>
					</tr>
				</table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 검색 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="22" align="left" background="<%=CLT_PATH%>/web/img/main/tab_table_top.gif">
                <table height="22" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="tab_head2" id=Tab01><span style="cursor:hand;" onClick="javascript:goTabSelect('01');"><bean:message key="Selling_Debit"/></span></td>
                        <td width="1"></td>
                        <td class="tab_head_non2" id=Tab02><span style="cursor:hand;" onClick="javascript:goTabSelect('02');"><bean:message key="Buying_Credit"/></span></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center" valign="top" background="<%=CLT_PATH%>/web/img/main/tab_table_bg.gif">
        <div id="tabLayer" style="display:inline">
                <table width="100%" border="0" cellspacing="5" cellpadding="0">
                    <tr>
                        <td valign="top">
                            <table width="100%" border="0" cellspacing="5" cellpadding="0">
                                <tr>
                                    <td align="right"> 
                    <!--S/D Button Layer-->
                                        <table id="sdBtns"  border="0" cellspacing="0" cellpadding="0" <% if(isWritabl){ %>style="display:block;"<% }else{ %>style="display:none;"<% } %>>
                                            <tr>
                                                <td>
                                                    <table onClick="doFrtWork('COMMAND04');" style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                            <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="Auto"/></td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table onClick="setAirDfltFrt('')"  style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                            <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01">Default Freight</td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table onClick="doWork('ROWADD')" style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                            <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="New"/></td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table onClick="doFrtWork('COMMAND06_S')" style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                            <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="Confirm"/></td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table onClick="doFrtWork('COMMAND07_S')" style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                            <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="Confirm_Cancel"/></td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table onClick="doFrtWork('COMMAND08')" style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0" >
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                            <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="Create"/> <bean:message key="Invoice"/></td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table  onClick="doWork('APPLY')"    style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                            <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="Apply"/></td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                    <!--S/D Button Layer-->
									</td>
								</tr>
                                <tr>
                                    <td align="left" valign="top">
                                        <table border="0" width="100%" id="mainTable">
                                            <tr>
                                                <td>
                                                    <script language="javascript">comSheetObject('sheet1');</script>
                                                 </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="right" valign="top">
										
										<!-- 검색창 -->
										<table width="680" height="10" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td width="130" nowrap class="table_search_head"><bean:message key="Invoice_Total"/>($) :</td>
                                                <td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
												<td width="50" nowrap class="table_body_blue" align="right"><bean:message key="Selling"/></td>
												<td class="table_search_body">
													<input type="text" name="inv_sell"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
												</td>
												<td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
												<td width="50" nowrap class="table_body_blue" align="right"><bean:message key="Debit"/></td>
												<td class="table_search_body">
													<input type="text" name="inv_debit"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
												</td>
												<td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
												<td width="50" nowrap class="table_body_blue" align="right"><bean:message key="Total"/></td>
												<td class="table_search_body">
													<input type="text" name="inv_total"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
												</td>
										<!--
												<td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
												<td width="50" nowrap class="table_body_blue"  align="right">VAT</td>
												<td class="table_search_body">
													<input type="text" name="inv_vat"      value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
												</td>
											-->
											</tr>
										<!--
                                            <tr>
												<td nowrap class="table_search_head"><bean:message key="Performance_Total"/> :</td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                <td nowrap class="table_body_blue" align="right"><bean:message key="Selling"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="pef_sell"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                                </td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                <td nowrap class="table_body_blue" align="right"><bean:message key="Debit"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="pef_debit"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                                </td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                <td nowrap class="table_body_blue" align="right"><bean:message key="Total"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="pef_total"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                                </td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                <td nowrap class="table_body_blue" align="right">VAT</td>
                                                <td class="table_search_body">
                                                    <input type="text" name="pef_vat"      value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                                </td>
                                            </tr>-->
											<tr>
                                                <td class="table_search_body">
                                                    <input type="hidden" name="pef_sell"    value='0'>
                                                    <input type="hidden" name="pef_debit"   value='0'>
                                                    <input type="hidden" name="pef_total"   value='0'>
                                                </td>
											</tr>
										</table>
										<!-- 검색창 -->
										<!-- 간격 -->
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
											</tr>
										</table>
										<!-- 간격 -->
					
                                    </td>
                                </tr>
                            </table>
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
								</tr>
							</table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td colspan="3">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1">Total </td>
                                                <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                            </tr>
                                        </table>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="450" valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td nowrap class="table_search_head"><bean:message key="PPD_AT"/></td>
                                                <td nowrap class="table_search_body" width="190">
                                                    <input type="text" name="ppdCmpCd" class="search_form" style="width:70;"  readonly>
                                                    <input type="text" name="ppdCmpNm" class="search_form" style="width:117;" readonly>
												</td>
                                                <td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="5"></td>
                                                <td nowrap class="table_search_head"><bean:message key="Curr"/></td>
                                                <td nowrap class="table_search_body">
                                                    <input type="text"   name="ppdToCurrency" value="<%=trf_cur_cd%>"  class="search_form" style="width:60" readonly>
													<input type="hidden" name="ppdOrgCurr"    value="<%=trf_cur_cd%>"  class="search_form" style="width:20">
												</td>
												<td align="middle">
                                                    <table id="sdTot1" border="0" cellpadding="0" cellspacing="0" style="display:none;">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="3"></td>
															<td>
																<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" onclick="doWork('PPDCURR');"  style="cursor:hand;" width="19" height="18" border="0" align="absmiddle">
															</td>
															<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="3"></td>
															<td align="right" onClick="doWork('PPDAPPLY')" style="cursor:hand">
																<table border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
																		<td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="Apply"/></td>
																		<td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>			
                                            </tr>
                                        </table>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                            </tr>
                                        </table>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="left" valign="top">
                                                    <table border="0" width="100%" id="mainTable">
                                                        <tr>
                                                            <td>
                                                                <script language="javascript">comSheetObject('sheet2');</script>
                                                             </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="20"></td>
                                    <td width="450" valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td nowrap class="table_search_head"><bean:message key="CCT_AT"/></td>
                                                <td nowrap class="table_search_body" width="190">
                                                    <input type="text" name="cctCmpCd" class="search_form" style="width:70;"  readonly>
                                                    <input type="text" name="cctCmpNm" class="search_form" style="width:117;" readonly>
                                                </td>
                                                <td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="5"></td>
                                                <td nowrap class="table_search_head"><bean:message key="Curr"/></td>
                                                <td nowrap class="table_search_body">
                                                    <input type="text"   name="cctToCurrency" value="<%=trf_cur_cd%>"  class="search_form" style="width:60" readonly>
													<input type="hidden" name="cctOrgCurr"    value="<%=trf_cur_cd%>"  class="search_form" style="width:20">
                                                </td>
												<td align="middle">
                                                    <table id="sdTot2" border="0" cellpadding="0" cellspacing="0" style="display:none;">
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="3"></td>
                                                            <td>
                                                                <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" onclick="doWork('CCTCURR');"  style="cursor:hand;" width="19" height="18" border="0" align="absmiddle">
                                                            </td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="3"></td>
                                                            <td align="right" onClick="doWork('CCTAPPLY')" style="cursor:hand">
                                                                <table border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                                        <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="Apply"/></td>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>  
                                                </td>       
                                            </tr>
                                        </table>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td height="1"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                            </tr>
                                        </table>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="left" valign="top">
                                                    <table border="0" width="100%" id="mainTable">
                                                        <tr>
                                                            <td>
																  <script language="javascript">comSheetObject('sheet3');</script>
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
        </DIV>
        <div id="tabLayer" style="display:none">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td valign="top">
                            <table width="100%" border="0" cellspacing="10" cellpadding="0">
                                <tr>
                                    <td align="right"> 
                    <!--B/C Button Layer-->
                                        <table id="bcBtns" border="0" cellspacing="0" cellpadding="0"  <% if(isWritabl){ %>style="display:block;"<% }else{ %>style="display:none;"<% } %>>
                                            <tr>
                                                <td>
                                                    <table onClick="doFrtWork('COMMAND05');" style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                            <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="Auto"/></td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table onClick="setAirDfltFrt('b_')"  style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                            <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01">Default Freight</td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table onClick="doWork('ROWADD1')" style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                            <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="New"/></td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table onClick="doFrtWork('COMMAND06_B')" style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                            <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="Confirm"/></td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table onClick="doFrtWork('COMMAND07_B')" style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                            <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="Confirm_Cancel"/></td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table onClick="doFrtWork('COMMAND09')" style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0" >
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                            <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="Create"/> <bean:message key="Invoice"/></td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                    <!--B/C Button Layer-->
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" valign="top">
                                        <table border="0" width="100%" id="mainTable">
                                            <tr>
                                                <td>
                                                    <script language="javascript">comSheetObject('sheet4');</script>
                                                 </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="right" valign="top">
                                        
                                        <!-- 검색창 -->
                                        <table width="680" height="10" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="130" nowrap class="table_search_head"><bean:message key="Invoice_Total"/>($) :</td>
                                                <td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                <td width="50" nowrap class="table_body_blue" align="right"><bean:message key="Buying"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="b_inv_sell"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                                </td>
                                                <td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                <td width="50" nowrap class="table_body_blue" align="right"><bean:message key="Credit"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="b_inv_debit"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                                </td>
                                                <td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                <td width="50" nowrap class="table_body_blue" align="right"><bean:message key="Total"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="b_inv_total"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                                </td>
                                            </tr>
											<!--
                                            <tr>
                                                <td nowrap class="table_search_head"><bean:message key="Performance_Total"/> :</td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                <td nowrap class="table_body_blue" align="right"><bean:message key="Buying"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="b_pef_sell"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                                </td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                <td nowrap class="table_body_blue" align="right"><bean:message key="Credit"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="b_pef_debit"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                                </td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                <td nowrap class="table_body_blue" align="right"><bean:message key="Total"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="b_pef_total"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                                </td>
                                            </tr>
											-->
                                            <tr>
                                                <td class="table_search_body">
                                                    <input type="hidden" name="b_pef_sell"  value='0'>
                                                    <input type="hidden" name="b_pef_debit" value='0'>
                                                    <input type="hidden" name="b_pef_total" value='0'>
                                                </td>
                                            </tr>
                                        </table>
									</td>
								</tr>
							</table>			
                        </td>
                    </tr>
                </table>
        </DIV>                
            </td>
        </tr>
        <tr>
            <td width="950" height="1" background="<%=CLT_PATH%>/web/img/main/tab_table_bottomg.gif"></td>
        </tr>
    </table>
</body>
</html>