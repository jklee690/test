<%--
=========================================================
*@FileName   : MDM_MCM_0340GS.jsp
*@FileTitle  : Other Operation COde
*@Description: Other Operation COde
*@author     : Jung,Byung-Chul - Cyberlogitec
*@version    : 1.0 - 10/19/2011
*@since      : 10/19/2011

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
				<% int cnt = 0; %>
				<% boolean isBegin = true; %>
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD><%=++cnt%></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vsl_flt" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_cd"/>]]></TD>
							<TD><bean:write name="row" property="cust_nm"/></TD>
							<TD><bean:write name="row" property="shpr_nm"/></TD>
							<TD><bean:write name="row" property="cnee_nm"/></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_ref_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ar_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ap_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dc_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="op_useid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="oth_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sts_cd"/>]]></TD>
							<TD></TD>
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