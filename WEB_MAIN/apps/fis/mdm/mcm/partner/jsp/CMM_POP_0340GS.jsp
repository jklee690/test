<%--
=========================================================
*@FileName   : CMM_POP_0010GS.jsp
*@FileTitle  : CMM
*@Description: trade partner pop
*@author     : 이광훈 - trade partner pop
*@version    : 1.0 - 12/29/2008
*@since      : 12/29/2008

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
							<TD><![CDATA[<bean:write name="row" property="cb_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cb_dest"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cb_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cb_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cb_trdp_addr" filter="false"/>]]></TD>
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
