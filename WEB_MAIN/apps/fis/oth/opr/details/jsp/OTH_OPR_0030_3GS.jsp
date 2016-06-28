<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : OTH_OPR_0030_3GS.jsp
*@FileTitle  : PO Document 목록 데이터 그리드
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
        <SHEET>
            <DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
            <logic:iterate id="row" name="rowSet">
                        <tr>    
                            <TD></TD>
                            <TD></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="po_ext_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="palt_doc_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_doc_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_doc_tp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_doc_img_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_doc_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_doc_msg" filter="false"/>]]></TD>
							
                     <logic:notEmpty name="row" property="po_doc_img_url">
                            <TD IMAGE="0"></TD>
                     </logic:notEmpty>
                     <logic:empty name="row" property="po_doc_img_url">
                            <TD></TD>
                     </logic:empty>
                     <logic:notEmpty name="row" property="po_doc_pdf_url">
                            <TD IMAGE="1"></TD>
                     </logic:notEmpty>
                     <logic:empty name="row" property="po_doc_pdf_url">
                            <TD></TD>
                     </logic:empty>     
							<TD><![CDATA[<bean:write name="row" property="po_doc_rmk" filter="false"/>]]></TD>                    
                            <TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>   
                            
                            <TD><![CDATA[<bean:write name="row" property="po_sys_no"/>]]></TD>
                        </tr>
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
