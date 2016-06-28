<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0020_1GS.jsp
*@FileTitle  : Booking Container 데이터 그리드
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<% int cnt = 0; %>
				<% boolean isBegin = true; %>
	            <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD><![CDATA[<bean:write name="row" property="fm_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fm_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mrg_chk_n1st"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mrg_chk_n2nd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mrg_chk_n3rd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_usrid"/>]]></TD>
                            <TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
				
			</logic:notEmpty>
</logic:empty>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
