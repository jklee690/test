<%--
=========================================================
*@FileName   : AIE_BMD_0040.jsp
*@FileTitle  : MAWB등록
*@Description: MAWB 등록 및 조회
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/14
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
				<% int cnt = 0; %>						
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA>
					<logic:iterate id="row" name="rowSet">
						<% cnt++;%>
						<tr>	
							<TD><%=cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="wo_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wo_sts_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="pickup_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="delivery_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="return_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trucker_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_wgt_k"/>]]></TD>
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
