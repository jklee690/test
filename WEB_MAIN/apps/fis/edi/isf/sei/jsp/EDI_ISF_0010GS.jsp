<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : EDI_DBS_0010_1GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Lee,Hae-Kyoung - Cyberlogitec
*@version    : 1.0 - 04/05/2012
*@since      : 04/05/2012

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>

<%-- 정상처리 --%>
<logic:empty name="RESULT_MESSAGE">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<% int cnt = 0; %>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD>0</TD>
						    <TD><bean:write name="row" property="bl_seq"/></TD>
						    <TD><bean:write name="row" property="bl_tp"/></TD>
						    <TD><bean:write name="row" property="bl_scac"/></TD>
							<TD><bean:write name="row" property="bl_no"/></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>

<logic:notEmpty name="RESULT_MESSAGE">
	<RESULT>
		<MESSAGE><%=(String)request.getAttribute("RESULT_MESSAGE")%></MESSAGE>
	</RESULT>
</logic:notEmpty>
