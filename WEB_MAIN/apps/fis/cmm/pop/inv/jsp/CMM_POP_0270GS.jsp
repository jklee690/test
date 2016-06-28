<%--
=========================================================
*@FileName   : CMM_POP_0270GS.jsp
*@FileTitle  : CMM
*@Description: bl search pop
*@author     : 정원영 - bl search pop
*@version    : 1.0 - 11/07/2013
*@since      : 11/07/2013

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
			
			<bean:define id="tmpMapVal" name="EventResponse" property="mapVal" />
				<% boolean isBegin = true; %>
				<% int cnt = 0; %>
				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="obrd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta_dt_tm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm" filter="false"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="proc_dept_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="proc_usrnm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_ofc_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_voy"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_bkg_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="por_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="por_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shp_mod_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_addr" filter="false"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_addr" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_cd2"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_nm2" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_addr2" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="etd_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta_tm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="it_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="te_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="it_loc"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cfs_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cfs_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="flt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sub_bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cy_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cy_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="ts1_port_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ts1_flt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ts2_port_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ts2_flt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ts3_port_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ts3_flt_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="frt_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_loc_nm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="f_eta_dt_tm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="fm_svc_term_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_svc_term_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
							
							
							<TD><![CDATA[<bean:write name="row" property="hbl_tp_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mrn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_trdp_addr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fnl_dest_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fnl_dest_loc_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="profit_share"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_wgt1"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="meas1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_iss_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_addr"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="frt_term_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="express_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rlsd_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rlsd_dt_tm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="bl_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="disp_ntfy_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cargo_tp_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="rep_cmdt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rep_cmdt_nm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="agent_grs_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="agent_grs_wgt1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="agent_chg_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="agent_chg_wgt1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="chg_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="chg_wgt1"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="vol_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vol_meas"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="h_vol_meas"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="size_ut_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="decl_cstms_val"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_clss_cd"/>]]></TD>						

							<TD><![CDATA[<bean:write name="row" property="prnr_ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>		
							<!-- jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 end -->
														
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
