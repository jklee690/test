<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIE_BMD_0022_2GS.jsp
*@FileTitle  : Item 목록 데이터 그리드
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
    <logic:empty name="EventResponse" property="listVal">
        <SHEET>
            <DATA TOTAL="0"></DATA>
        </SHEET>    
    </logic:empty>
    <logic:notEmpty name="EventResponse" property="listVal">
        <bean:define id="rowSet" name="EventResponse" property="listVal"/>
		<% int rowNum = 1;%>
        <SHEET>
            <DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
            <logic:iterate id="row" name="rowSet">
                <TR>
                    <TD></TD>
					<TD></TD>
                    <TD><%=rowNum++%></TD>
					
					<TD><![CDATA[<bean:write name="row" property="item_cust_po_no"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="item_cmdt_cd"/>]]></TD>										
                    <TD><![CDATA[<bean:write name="row" property="item_cmdt_nm"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="item_hs_grp_cd"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="item_shp_cmdt_cd"/>]]></TD>										
                    <TD><![CDATA[<bean:write name="row" property="item_shp_cmdt_nm"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="item_pck_qty"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="item_pck_ut_cd"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="item_pck_ut_cd"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="item_pck_inr_qty"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="item_ea_cnt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="item_ttl_qty"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="item_wgt"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="item_lbs_wgt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="item_meas"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="item_cft_meas"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="item_rmk"/>]]></TD>

                    <TD><![CDATA[<bean:write name="row" property="item_shp_cmdt_seq"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="item_po_sys_no"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="item_po_cmdt_seq"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
                </TR>
            </logic:iterate>
                </DATA>
        </SHEET>
    </logic:notEmpty>
</logic:empty>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
