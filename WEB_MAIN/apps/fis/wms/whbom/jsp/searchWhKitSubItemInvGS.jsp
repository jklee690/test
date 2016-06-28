<%@page contentType = "text/xml; charset=UTF-8"%>
<%@page pageEncoding = "UTF-8"%>
<%@include file = "./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<%-- 조회 결과가 없는 경우 --%>
		<logic:empty name="EventResponse" property="listVal">
				<DATA TOTAL="0"></DATA>
		</logic:empty>
	<%-- 조회 결과가 있는 경우 --%>
		<logic:notEmpty name="EventResponse" property="listVal">
			<bean:define id="rowSet" name="EventResponse" property="listVal"/>
			<SHEET>
				<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
				<logic:iterate id="row" name="rowSet">
					<tr>
						<TD><![CDATA[<bean:write name="row" property="sub_item_cd"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_item_nm"/>]]></TD>
						<TD></TD>
						<TD></TD>
						<TD><![CDATA[<bean:write name="row" property="inbound_dt"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="lot_no"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_wh_loc_cd_nm"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="stock_qty"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_item_ea_qty"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_item_cbm"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_item_cbf"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_item_grs_kgs"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_item_grs_lbs"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_item_net_kgs"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_item_net_lbs"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_lot_id"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="exp_dt"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="lot_04"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="lot_05"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="ibflag"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_po_sys_no"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_item_sys_no"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_wh_loc_cd"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_item_so_no"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_wib_bk_no"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_item_po_no"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="pkg_lv1_qty"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="lv1_cbm"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="lv1_cbf"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="lv1_grs_kgs"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="lv1_grs_lbs"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="lv1_net_kgs"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="lv1_net_lbs"/>]]></TD>
		            </tr>
				</logic:iterate>
				</DATA>
			</SHEET>
		</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property = "message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
