<%--
=========================================================
*@FileName   : MGT_EQS_0011GS.jsp
*@FileTitle  : EQ Status
*@Description: EQ Status 정보를 출력한다.
*@author     : 오요한
*@version    : 1.0 - 12/09/2013
*@since      : 12/09/2013

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
				
				<% 
					int cnt = 0;
					//boolean isBegin = true;
				%>
			
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>		
							<TD><%= ++cnt%></TD>							
                            <TD><![CDATA[<bean:write name="row" property="LANE_CD"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ORG_AREA_NM"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="DEST_AREA_NM"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="CRR_NM"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="RGST_USRID"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="RGST_TMS"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="MODI_USRID"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="MODI_TMS"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ORG_AREA_CD"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="DEST_AREA_CD"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="LANE_NM"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="RMK"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="FRE_CD"/>]]></TD>
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
