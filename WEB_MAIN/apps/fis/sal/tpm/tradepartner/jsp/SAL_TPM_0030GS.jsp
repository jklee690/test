<%--
=========================================================
*@FileName   : SAL_TPM_0030GS.jsp
*@FileTitle  : Trade Partner ManagementList
*@Description: Trade Partner ManagementList
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/07/2009
*@since      : 01/07/2009

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
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="strIdx" name="tmpMapVal" property="beginIdx"/>
				<% 
				boolean isBegin = true;
				int cnt = Integer.parseInt(strIdx.toString());
				%>
				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><% cnt++;%><%= cnt%></TD>
							<TD></TD>
							<TD><bean:write name="row" property="trdp_cd"/></TD>
							<TD><![CDATA[<bean:write name="row" property="eng_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shrt_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="acct_cd" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_gp_cd" filter="false"/>]]></TD>
							<TD><bean:write name="row" property="cr_term_cd"/></TD>
							<TD><bean:write name="row" property="cr_term_dt"/></TD>
							<TD><bean:write name="row" property="crd_lmt_amt"/></TD>
							<TD><bean:write name="row" property="cur_lmt_amt"/></TD>
							<TD><bean:write name="row" property="amt_over"/></TD>
							<TD><bean:write name="row" property="crd_appr_dt"/></TD>
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
