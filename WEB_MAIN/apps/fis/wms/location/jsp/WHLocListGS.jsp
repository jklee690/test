<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WarehouseLocPopup.jsp
*@FileTitle  : Location
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
=========================================================
--%>

<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_loc_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="zone_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="block_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_line"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="loc_row"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_floor"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="space_tp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="put_tp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prop_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="abc_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="max_cbm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="max_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="width"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="length"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="height"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="use_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>