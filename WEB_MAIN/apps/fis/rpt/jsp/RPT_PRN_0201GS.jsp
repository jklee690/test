<%--
=========================================================
*@FileName   : RPT_PRN_0201GS.jsp
*@FileTitle  : Profit Report
*@Description: Profit Report
*@author     : Lee, Hae Kyoung - Cyberlogitec
*@version    : 1.0 - 2013/05/22
*@since      : 2013/05/22

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
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><bean:write name="row" property="bl_kind"/></TD>
							<TD><bean:write name="row" property="bl_no"/></TD>
							<TD><bean:write name="row" property="inv_no2"/></TD>
							<TD><bean:write name="row" property="inv_post_dt"/></TD>
							<TD><bean:write name="row" property="bill_to"/></TD>
							<TD><bean:write name="row" property="frt_kind"/></TD>
							<TD><bean:write name="row" property="frt_nm"/></TD>							
							<TD><bean:write name="row" property="ratio"/></TD>
							<TD><bean:write name="row" property="local_inv_amt"/></TD>
							<TD><bean:write name="row" property="cost_inv_amt"/></TD>
							<TD><bean:write name="row" property="dc_inv_amt"/></TD>
							<TD><bean:write name="row" property="clr_yn"/></TD>
							<TD><bean:write name="row" property="inv_curr_cd"/></TD>
                            <TD><bean:write name="row" property="sell_buy_tp_cd"/></TD>
                            <TD><bean:write name="row" property="inv_no"/></TD>
							<TD></TD>
							<TD></TD>
							<TD><bean:write name="row" property="inv_curr_cd"/></TD>
							<TD><bean:write name="row" property="inv_curr_cd"/></TD>
							<TD><bean:write name="row" property="ref_ofc_cd"/></TD>
							<TD><bean:write name="row" property="inv_seq"/></TD>
							<TD><bean:write name="row" property="trdp_cd"/></TD>
							<TD><bean:write name="row" property="ofc_cd"/></TD>
							<TD><bean:write name="row" property="bl_cnt_cd"/></TD>
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
