<%--
=========================================================
*@FileName   : SEE_BMD_0080GS.jsp
*@FileTitle  : S/R Search 
*@Description: S/R Search 조회한다.
*@author     : 이광훈 - see =Export 
*@version    : 1.0 - 01/15/2009
*@since      : 01/15/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="objVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="objVal">
				<bean:define id="invObj" name="EventResponse" property="objVal"/>
				<SHEET>
					<DATA>
						<tr>
							<TD></TD>
							<TD><![CDATA[<bean:write name="invObj" property="cmb_inv_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="invObj" property="inv_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="invObj" property="inv_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="invObj" property="inv_sts_nm"/>]]></TD>
			            </tr>
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
