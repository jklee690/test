<%--
=========================================================
*@FileName   : SEE-BMD-0010GS.jsp
*@FileTitle  : 최상위 메뉴 표시
*@Description: 최상위 메뉴의 관리
*@author     : 이광훈 - 주문
*@version    : 1.0 - 12/22/2008
*@since      : 12/22/2008

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
							<TD></TD>
							<TD></TD>  
							<TD><![CDATA[<bean:write name="row" property="seqno"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="liner_code"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="liner_name" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="port_code"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="node_code"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="port_name" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="vessel_code"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vessel_name" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="voyage"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="remark"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="created_by"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="created_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modified_by"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modified_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="branch"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="liner_abbr" filter="false"/>]]></TD>				
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
