<%--
=========================================================
*@FileName   : CMM_POP_0200GS.jsp
*@FileTitle  : CMM
*@Description: work order search pop
*@author     : 이광훈 - work order search pop
*@version    : 1.0 - 01/28/2009
*@since      : 01/28/2009

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
				<% int cnt = 0; %>
				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="wo_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="master_bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="house_bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wo_tp_nm" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_nm" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="office_nm" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
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
