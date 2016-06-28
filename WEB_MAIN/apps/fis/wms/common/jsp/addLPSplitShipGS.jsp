<%--
=========================================================
*@FileName   : LPShipSplit.jsp
*@FileTitle  : Shipment Split
*@Description: Shipment Split
=========================================================
--%>

<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
				<bean:define id="valMap" name="EventResponse" property="mapVal"/>
				<res><![CDATA[<bean:write name="valMap" property="res"/>]]></res>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
