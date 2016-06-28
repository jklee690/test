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
							 <TD><![CDATA[<bean:write name="row" property="seq"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="sub_key"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="cls_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="cust_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="cust_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="sts_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="so_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="frt_view"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="sb_cls_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="sub_tot"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rn"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rate_tp_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="order_rel_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="frt_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="frt_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="unit_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="unit_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="unit_price"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="basic_amt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="adjust_amt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="tot_amt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wh_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rmk_img"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="sb_cls_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="sts_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rate_tp_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="order_rel"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="sub_sum_row_div"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="sub_sum_row"/>]]></TD>
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
