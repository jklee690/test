<%--
=========================================================
*@FileName   : EQU_INV_0020.jsp
*@FileTitle  : Route Creation
*@Description: Route Creation
*@author     : Kang dae soo - Cyberlogitec
*@version    : 1.0 - 10/15/2009
*@since      : 10/15/2009

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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EQU_MSG.js"></script>
	<script language="javascript" src="./apps/fis/equ/inv/invoice/script/EQU_INV_0020.js"></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>
</head>
<script language="javascript">
	<!-- 처리시 메시지 -->
	var PARAM1_1 = '';
	var PARAM1_2 = '';
	var PARAM2_1 = '';
	var PARAM2_2 = '';
	var typeSize_1 = '';
	var typeSize_2 = '';
	
	
	<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

	<% boolean isBegin = false; %>
    <!-- equ status Code 코드조회-->
	<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
	<logic:iterate id="codeVO" name="param1List">
		<% if(isBegin){ %>
			PARAM1_1+= '|';
			PARAM1_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM1_1+= '<bean:write name="codeVO" property="cd_nm"  filter="false"/>';
        PARAM1_2+= '<bean:write name="codeVO" property="cd_val" filter="false"/>';
    </logic:iterate>    
    <!-- inv status Code 코드조회-->
	<bean:define id="param2List"  name="rtnMap" property="PARAM2"/>
	<logic:iterate id="codeVO" name="param2List">
		<% if(isBegin){ %>
			PARAM2_1+= '|';
			PARAM2_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM2_1+= '<bean:write name="codeVO" property="cd_nm"  filter="false"/>';
        PARAM2_2+= '<bean:write name="codeVO" property="cd_val" filter="false"/>';
    </logic:iterate>    
    
   	<!--typeSize 코드조회-->
	var typeSize= '<bean:write name="rtnMap" property="typeSize" filter="false"/>';
	typeSize_2 += ' |';
	typeSize_1 += ' |';  
	typeSize_2 += "A" + typeSize.substring(0, typeSize.indexOf(";"));
	typeSize_1 += typeSize.substring(typeSize.indexOf(";")+1, typeSize.length);


</script>
<body class="TD" onload="javascript:loadPage();">
	<form name="frm1" method="POST">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="trdp_cd"/>
	<input type="hidden" name="hid_inv_no"/>
	<input type="hidden" name="s_inv_no"/>
	<input type="hidden" name="s_lr_trdp_cd"/>
	<input type="hidden" name="s_intg_bl_seq"/>
	<input type="hidden" name="s_agmt_no"/>
	<input type="hidden" name="s_lr_trdp_nm"/>
    <!-- 타이틀, 네비게이션 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
	    <tr>
		    <td class="bigtitle"><%=LEV3_NM%></td>
		    <td align="right" nowrap="nowrap" class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><bean:message key="Home"/> > <%=LEV1_NM%> <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span></td>
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
                        <td style="cursor:hand" onclick="doWork('SEARCHLIST')">
							<table height="21" border="0" cellpadding="0" cellspacing="0" >
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand" onclick="doWork('NEW')">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="New"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand" onclick="doWork('MAPPING')">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Mapping"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>

                        <td style="cursor:hand" onclick="doWork('MODIFY')">
							<table id="btnModify" height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
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
                <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
              </tr>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="100%" align="left" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="80" nowrap="nowrap" class="table_search_head">Creation DT</td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="fm_rgst_dt" type="text" value='' onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" class="search_form" style="width:72px;" maxlength="10"/>
								<img id="fm_rgst_dt_cal" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" onclick="doDisplay('DATE1', frm1);" align="absmiddle" style="cursor:pointer"/>
                                ~
                            	<input name="to_rgst_dt" type="text" value='' onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" class="search_form" style="width:72px;" maxlength="10"/>
								<img id="to_rgst_dt_cal" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" onclick="doDisplay('DATE2', frm1);" align="absmiddle" style="cursor:pointer"/>
                            </td>
                            <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                            <td width="80" nowrap="nowrap" class="table_search_head">Booking No</td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="bkg_no" maxlength="20" value="" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:115;" onBlur="javascript:this.value=this.value.toUpperCase();">
							<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="doWork('BKNO_POPLIST')" style="cursor:hand" align="absmiddle"/>
                            </td>
                            <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                            <td width="80" nowrap="nowrap" class="table_search_head"><bean:message key="Invoice_No"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="inv_no" maxlength="50" value="" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:115;" onBlur="javascript:this.value=this.value.toUpperCase();">
							<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="doWork('INVOICE_POPLIST')" style="cursor:hand" align="absmiddle"/>
                            </td>
                        </tr>
                        <tr>
                            <td width="60" nowrap="nowrap" class="table_search_head"><bean:message key="Customer"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="cs_trdp_cd" maxlength="20" value='' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode_cs',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_cs',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="lr_trdp_cd" onClick="doWork('CUSTOMER_POPLIST')" style="cursor:hand;" align="absmiddle"/>
								<input name="cs_trdp_nm" maxlength="50" value='' type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:80;" disabled="true">
                            </td>
                            <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                            <td width="60" nowrap="nowrap" class="table_search_head"><bean:message key="Lessor"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="lr_trdp_cd" value='' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="lr_trdp_cd" onClick="doWork('LESSOR_POPLIST')" style="cursor:hand;" align="absmiddle"/>
								<input name="lr_trdp_nm" value='' type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:80;" disabled="true">
                            </td>
                            <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                            <td width="90" nowrap="nowrap" class="table_search_head"><bean:message key="Equip_Status"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            <select name="equ_sts_cd" onchange="doWork('SEARCHLIST')">
                            <bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
								<option value='' selected>ALL</option>
								<logic:iterate id="codeVO" name="param1List">
								<option value='<bean:write name="codeVO" property="cd_val"  filter="false"/>'><bean:write name="codeVO" property="cd_nm"  filter="false"/></option>
								</logic:iterate>
                            </select>
                            </td>
                            <td width="10 "><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                            <td width="60" nowrap="nowrap" class="table_search_head">Cntr No</td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="cntr_no" value='' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:90;"/>
                            </td>
                        </tr>
                    </table>
                </td>
                <td width="600"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
              </tr>
            </table>
            <!-- 간격 -->
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
            <td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
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
                     <td nowrap="nowrap" width="120">
                    	<table border="0" cellpadding="0" cellspacing="0">
                    		<tr>
                    			<td nowrap="nowrap"  class="sub_title"  width="120">
                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Basic_Information"/>
                    			</td>
                    		</tr>
                    	</table>
                    </td>
                     <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                     
                     <td align="right" style="cursor:hand" onclick="doWork('EXCEL')" width="50" id="excel" style="display:none">
                         <table height="21" border="0" cellpadding="0" cellspacing="0">
                             <tr>
                                 <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"/></td>
                                 <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Excel"/></td>
                                 <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"/></td>
                             </tr>
                         </table>            
                     </td>
                     <td align="right" style="cursor:hand" onclick="doWork('PRINT')" width="45" id="prn" style="display:none">
                         <table id="btnPrint" height="21" border="0" cellpadding="0" cellspacing="0">
                             <tr>
                                 <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"/></td>
                                 <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Print"/></td>
                                 <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"/></td>
                             </tr>
                         </table>            
                     </td>
                     <td align="right" style="cursor:hand" onclick="doWork('ROWADD')"  width="75" id="rowAdd" style="display:none">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="New"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
                  </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                  </tr>
                </table>
                <!-- 간격 -->
				<table border="0" width="100%">
					<tr>
						<td>
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
			</td>
		</tr>
	</table>
	<!--빈공간 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <table width="950" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
				<!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" height="20">
                  <tr>
                    <td nowrap="nowrap" class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Detail_Information"/></td>
                     <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                  </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                  </tr>
                </table>
                <!-- 간격 -->
				<table border="0" width="100%">
					<tr>
						<td>
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
		</tr>
	</table>
	<!--빈공간 -->
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
      </tr>
    </table>
	</form>
</body>
</html>