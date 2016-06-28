<%--
=========================================================
*@FileName   : ACC_JOR_0021GS.jsp
*@FileTitle  : Journal List	MANAGE
*@Description: Journal List	MANAGE
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/30
*@since      : 2011/11/30

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
							<TD><![CDATA[<bean:write name="row" property="clt_cmpl_flg"/>]]></TD>
							<TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcvd_fm_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="chk_no" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="bank_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="clr_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="void_yn"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="void_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="p_ofc_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="block"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="rgst_usrid"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="jnr_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="clt_cmpl_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="clr_yn"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ofc_blck_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="level_value"/>]]></TD>
							<TD></TD>
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
