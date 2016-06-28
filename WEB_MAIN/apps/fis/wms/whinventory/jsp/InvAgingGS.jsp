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
				<% boolean isBegin = true; %>
				 <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
			
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inbound_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lot_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lot_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grp01"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grp02"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grp03"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grp04"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grp05"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grp06"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grp07"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grp08"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grp09"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grp10"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grp11"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grp12"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grp13"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_cd"/>]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
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
