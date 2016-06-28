<%--
=========================================================
*@FileName   : SEI_DOC_1000GS.jsp
*@FileTitle  : Devanning/Segregation Report
*@Description: Devanning/Segregation Report
*@author     : Lee Hae Kyoung - Cyberlogitec
*@version    : 1.0 - 2011/12/13
*@since      : 2011/12/13

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
                            <TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rep_cmdt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_wgt1"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="meas1"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="fnl_dest_loc_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="it_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_ams_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_iata_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm" />]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="pod_ams_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_iata_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm" />]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_addr" />]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_trdp_nm" />]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cust_ref_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fdest_ams_loc_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fdest_un_loc_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="seal_no1" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ams_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_ut_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta_dt_tm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd_dt_tm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_scac_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mk_txt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="desc_txt" />]]></TD>
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
