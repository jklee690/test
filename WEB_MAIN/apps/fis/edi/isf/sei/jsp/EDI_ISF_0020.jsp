<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : EDI_ISF_0020.jsp
*@FileTitle  : ISF (Ocean) List
*@Description: ISF (Ocean) List
*@author     : Lee, HaeKyoung
*@version    : 1.0 - 09/10/2012
*@since      :

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>

    <title><bean:message key="system.title"/></title>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/isf/sei/script/EDI_ISF_0020.js"></script>
	<script>	
   </script>
</head>
<body class="td" onload="loadPage();">
<form name="frm1" method="POST" action="./EDI_ISF_0020.clt">
    <input type="hidden" name="f_cmd">
    <input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="EDI_ISF_0020.clt"/>
    
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><%=LEV3_NM%></td>
            <td align="right" nowrap class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <%=LEV2_NM%> ><span class="navi_b"><%=LEV3_NM%></span></td>
        </tr>
    </table>
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td>
            </td>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td onClick="doWork('SEARCHLIST')" style="cursor:hand">
                            <table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>        
                        </td>
                        <td onClick="doWork('EXCEL')" style="cursor:hand">
                            <table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Excel"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>        
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <table width="1200" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                    	<td width="60" nowrap class="table_search_head"><bean:message key="ISF_No"/></td>
                        <td width="140" class="table_search_body">
                            <input name="f_isf_no" maxlength="20" value="" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100;text-transform:uppercase;" onblur="strToUpper(this)">
                        </td>
                        <td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    	<td width="70" nowrap class="table_search_head"><bean:message key="HBL_No"/></td>
                        <td width="140" class="table_search_body">
                            <input name="f_hbl_no"  maxlength="40" svalue="" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100;text-transform:uppercase;" onblur="strToUpper(this)">
                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="openPopUpEdi('HBL_POPLIST',this)" style="cursor:hand" align="absmiddle">
                        </td>
                        <td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td width="60"  class="table_search_head"><bean:message key="ETD"/></td>
                        <td width="210" class="table_search_body">
							<input type="text" name="f_etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_etd_enddt);firCalFlag=false;" size='11' maxlength="10" class="search_form">
							~
							<input type="text" name="f_etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_etd_strdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form">
							<img id="f_etd_dt_cal" onclick="doDisplay('DATE11', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
						</td>
						<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                      	<td width="80" nowrap class="table_search_head"><bean:message key="Importer"/></td>
                        <td width="240" class="table_search_body">
                            <input type="text" name="f_im_entt_cd"  onKeyDown="codeNameActionEdi('trdpCode_importer',this, 'onKeyDown');" onBlur="codeNameActionEdi('trdpCode_importer',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:50;" tabindex="35">
                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="importer" onClick="openPopUpEdi('IMPORTER_POPLIST',this);" style="cursor:hand" align="absmiddle">
                            <input type="text"   name="f_im_entt_name" value='' onblur="strToUpper(this)" class="search_form" style="width:140;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUpEdi('IMPORTER_POPLIST', frm1.f_im_entt_name.value);}" tabindex="36">
                        </td>
					</tr>
					<tr>
						<td width="60"  nowrap="nowrap" class="table_search_head"><bean:message key="Status"/></td>
                    	<td width="80" nowrap="nowrap" class="table_search_body">
                       		<select name="f_msg_sts" class="search_form" style="width:80px;">
                       			   <option value="">ALL</option>
                                   <option value="A">Accepted</option>
                                   <option value="C"><bean:message key="Created"/></option>
                                   <option value="R">Rejected</option>
                                   <option value="S">Sent</option>
                              </select>
                      	</td>
                        <td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td width="70" nowrap class="table_search_head"><bean:message key="MBL_No"/></td>
                        <td width="140" class="table_search_body">
                            <input name="f_mbl_no"  maxlength="40" value="" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100;text-transform:uppercase;" onblur="strToUpper(this)">
                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="openPopUpEdi('MBL_POPLIST',this);" style="cursor:hand" align="absmiddle">
                        </td>
                        <td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td width="60"  class="table_search_head"><bean:message key="ETA"/></td>
                        <td width="210" class="table_search_body">
							<input type="text" name="f_eta_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_eta_enddt);firCalFlag=false;" size='11' maxlength="10" class="search_form">
							~
							<input type="text" name="f_eta_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_eta_strdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form">
							<img id="f_eta_dt_cal" onclick="doDisplay('DATE12', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
						</td>
						<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                      	<td width="80" nowrap class="table_search_head"><bean:message key="Consignee"/></td>
                        <td width="240" class="table_search_body">
                        	<input type="text" name="f_cnee_cd" maxlength="50" value='' onKeyDown="codeNameActionEdi('trdpCode_consignee',this, 'onKeyDown');" onBlur="codeNameActionEdi('trdpCode_consignee',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50;" tabindex="35">
                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="consignee" onClick="openPopUpEdi('CONSIGNEE_POPLIST',this);" style="cursor:hand" align="absmiddle">
                            <input type="text"   name="f_cnee_nm" value='' onblur="strToUpper(this)" class="search_form" style="width:140;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUpEdi('CONSIGNEE_POPLIST', frm1.f_cnee_nm.value);}" tabindex="36">
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
    
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="1"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		</tr>
	</table>
    
	<table width="1200" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="5" align="left">
				<table height="5" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
<!--			<td align="center" valign="top" background="<%=CLT_PATH%>/web/img/main/tab_table_bg.gif">-->
			<td align="center" valign="top"  class="table_search_bg">
				<table width="100%" border="0" cellspacing="10" cellpadding="0">
					<tr>
						<td valign="top">
                            <table width="100%" border="0" bordercolor="blue" cellspacing="0" cellpadding="0">                          
                                <!-- Message -->
                                <tr>
                                    <td height="3px" colspan="3"></td>
                                </tr>
                                <tr>
                                    <td align="left" valign="top" colspan="3">
                                    	<table width="100%" border="0" cellpadding="0" cellspacing="0">
						                    <tr>
						                        <td class="sub_title" width="140"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="3"/><bean:message key="New_ISF_Target_List"/></td>
						                        <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
						                    </tr>
						                </table>
						                <table width="100%" border="0" cellspacing="0" cellpadding="0">
						                    <tr>
						                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
						                    </tr>
						                </table>
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td valign="top" align="center" colspan="3"> 
                                                    <table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
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
						                        <td height="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
						                    </tr>
						                </table>
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
						                    <tr>
						                        <td class="sub_title" width="140"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="3"/><bean:message key="ISF_Processed_List"/></td>
						                        <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
						                    </tr>
						                </table>
						                <table width="100%" border="0" cellspacing="0" cellpadding="0">
						                    <tr>
						                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
						                    </tr>
						                </table>
						                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td valign="top" align="center" colspan="3"> 
                                                    <table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
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