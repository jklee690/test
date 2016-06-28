<%--
=========================================================
*@FileName   : SEE_AMS_0040GS.jsp
*@FileTitle  : SEE AMS 
*@Description: SEE AMS 
*@author     : Chungrue
*@version    : 1.0 - 2012/09/10
*@since      : 2012/09/10

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>

<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="ERR_MSG">
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
						<tr >	
							<TD><![CDATA[<bean:write name="row" property="cntrnbr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntrtype"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sealnbr"/>]]></TD>
	            		</tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="ERR_MSG">
	<ERROR>
		<MESSAGE><![CDATA[<%=(String)request.getAttribute("ERR_MSG")%>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
