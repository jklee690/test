<%--
=========================================================
*@FileName   : CMM_POP_0140GS.jsp
*@FileTitle  : CMM
*@Description: vessel pop
*@author     : 이광훈 - vessel pop
*@version    : 1.0 - 12/30/2008
*@since      : 12/30/2008

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
			
			<bean:define id="tmpMapVal" name="EventResponse" property="mapVal" />
				<% boolean isBegin = true; %>
				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD><![CDATA[<bean:write name="row" property="vsl_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vsl_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm"/>]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
														
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
				
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
