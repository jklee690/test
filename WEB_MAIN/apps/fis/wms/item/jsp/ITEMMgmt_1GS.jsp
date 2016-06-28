<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
 
=========================================================
*@FileName   : WWHM_WHM_0009GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Thoa.Dien - Cyberlogitec
*@version    : 1.0 - 2014/12/22
*@since      : 2014/12/22

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="mapVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="mapVal">
				<bean:define id="rowSet" name="EventResponse" property="mapVal"/>
				
				<logic:notEmpty name="rowSet" property="field">
 					<bean:define id="rowSetField" name="rowSet" property="field"/>
					<FIELD>
						<DATA TOTAL="1">
							<logic:iterate id="rowField" name="rowSetField">
								<listCnt><![CDATA[<bean:write name="rowSet" property="listCnt"/>]]></listCnt>
								<item_sys_no><![CDATA[<bean:write name="rowField" property="item_sys_no"/>]]></item_sys_no>
								<ctrt_no><![CDATA[<bean:write name="rowField" property="ctrt_no"/>]]></ctrt_no>
								<ctrt_nm><![CDATA[<bean:write name="rowField" property="ctrt_nm"/>]]></ctrt_nm>
								<item_cd><![CDATA[<bean:write name="rowField" property="item_cd"/>]]></item_cd>
								<item_nm><bean:write name="rowField" property="item_nm"/></item_nm>
								<hts_no><![CDATA[<bean:write name="rowField" property="hts_no"/>]]></hts_no>
								<hts_nm><![CDATA[<bean:write name="rowField" property="hts_nm"/>]]></hts_nm>
								<item_grp_cd><![CDATA[<bean:write name="rowField" property="item_grp_cd"/>]]></item_grp_cd>
								<item_use_flg><![CDATA[<bean:write name="rowField" property="item_use_flg"/>]]></item_use_flg>
								<item_remark><![CDATA[<bean:write name="rowField" property="item_remark"/>]]></item_remark>
								<pkg_lv1_unit_cd><![CDATA[<bean:write name="rowField" property="pkg_lv1_unit_cd"/>]]></pkg_lv1_unit_cd>
								<pkg_lv1_unit_nm><![CDATA[<bean:write name="rowField" property="pkg_lv1_unit_nm"/>]]></pkg_lv1_unit_nm>
								<pkg_lv1_qty><![CDATA[<bean:write name="rowField" property="pkg_lv1_qty"/>]]></pkg_lv1_qty>
								<pkg_lv1_put_tp_cd><![CDATA[<bean:write name="rowField" property="pkg_lv1_put_tp_cd"/>]]></pkg_lv1_put_tp_cd>
								<lv1_cbm><![CDATA[<bean:write name="rowField" property="lv1_cbm"/>]]></lv1_cbm>
								<lv1_cbf><![CDATA[<bean:write name="rowField" property="lv1_cbf"/>]]></lv1_cbf>
								<lv1_grs_kgs><![CDATA[<bean:write name="rowField" property="lv1_grs_kgs"/>]]></lv1_grs_kgs>
								<lv1_grs_lbs><![CDATA[<bean:write name="rowField" property="lv1_grs_lbs"/>]]></lv1_grs_lbs>
								<lv1_net_kgs><![CDATA[<bean:write name="rowField" property="lv1_net_kgs"/>]]></lv1_net_kgs>
								<lv1_net_lbs><![CDATA[<bean:write name="rowField" property="lv1_net_lbs"/>]]></lv1_net_lbs>
								<lv1_width><![CDATA[<bean:write name="rowField" property="lv1_width"/>]]></lv1_width>
								<lv1_length><![CDATA[<bean:write name="rowField" property="lv1_length"/>]]></lv1_length>
								<lv1_height><![CDATA[<bean:write name="rowField" property="lv1_height"/>]]></lv1_height>
								<item_pkgunit><![CDATA[<bean:write name="rowField" property="item_pkgunit"/>]]></item_pkgunit>
								<item_pkgunit_nm><![CDATA[<bean:write name="rowField" property="item_pkgunit_nm"/>]]></item_pkgunit_nm>
								<item_pkgbaseqty><![CDATA[<bean:write name="rowField" property="item_pkgbaseqty"/>]]></item_pkgbaseqty>
								<pkg_lv2_put_tp_cd><![CDATA[<bean:write name="rowField" property="pkg_lv2_put_tp_cd"/>]]></pkg_lv2_put_tp_cd>
								<item_cbm><![CDATA[<bean:write name="rowField" property="item_cbm"/>]]></item_cbm>
								<item_cbf><![CDATA[<bean:write name="rowField" property="item_cbf"/>]]></item_cbf>
								<item_kgs><![CDATA[<bean:write name="rowField" property="item_kgs"/>]]></item_kgs>
								<item_grs_lbs><![CDATA[<bean:write name="rowField" property="item_grs_lbs"/>]]></item_grs_lbs>
								<item_net_wgt><![CDATA[<bean:write name="rowField" property="item_net_wgt"/>]]></item_net_wgt>
								<item_net_lbs><![CDATA[<bean:write name="rowField" property="item_net_lbs"/>]]></item_net_lbs>
								<item_width><![CDATA[<bean:write name="rowField" property="item_width"/>]]></item_width>
								<item_height><![CDATA[<bean:write name="rowField" property="item_height"/>]]></item_height>
								<item_length><![CDATA[<bean:write name="rowField" property="item_length"/>]]></item_length>
								<pkg_lv3_unit_cd><![CDATA[<bean:write name="rowField" property="pkg_lv3_unit_cd"/>]]></pkg_lv3_unit_cd>
								<pkg_lv3_unit_nm><![CDATA[<bean:write name="rowField" property="pkg_lv3_unit_nm"/>]]></pkg_lv3_unit_nm>
								<pkg_lv3_qty><![CDATA[<bean:write name="rowField" property="pkg_lv3_qty"/>]]></pkg_lv3_qty>
								<pkg_lv3_put_tp_cd><![CDATA[<bean:write name="rowField" property="pkg_lv3_put_tp_cd"/>]]></pkg_lv3_put_tp_cd>
								<lv3_cbm><![CDATA[<bean:write name="rowField" property="lv3_cbm"/>]]></lv3_cbm>
								<lv3_cbf><![CDATA[<bean:write name="rowField" property="lv3_cbf"/>]]></lv3_cbf>
								<lv3_grs_kgs><![CDATA[<bean:write name="rowField" property="lv3_grs_kgs"/>]]></lv3_grs_kgs>
								<lv3_grs_lbs><![CDATA[<bean:write name="rowField" property="lv3_grs_lbs"/>]]></lv3_grs_lbs>
								<lv3_net_kgs><![CDATA[<bean:write name="rowField" property="lv3_net_kgs"/>]]></lv3_net_kgs>
								<lv3_net_lbs><![CDATA[<bean:write name="rowField" property="lv3_net_lbs"/>]]></lv3_net_lbs>
								<lv3_width><![CDATA[<bean:write name="rowField" property="lv3_width"/>]]></lv3_width>
								<lv3_length><![CDATA[<bean:write name="rowField" property="lv3_length"/>]]></lv3_length>
								<lv3_height><![CDATA[<bean:write name="rowField" property="lv3_height"/>]]></lv3_height>
								<pkg_lv4_unit_cd><![CDATA[<bean:write name="rowField" property="pkg_lv4_unit_cd"/>]]></pkg_lv4_unit_cd>
								<pkg_lv4_unit_nm><![CDATA[<bean:write name="rowField" property="pkg_lv4_unit_nm"/>]]></pkg_lv4_unit_nm>
								<pkg_lv4_qty><![CDATA[<bean:write name="rowField" property="pkg_lv4_qty"/>]]></pkg_lv4_qty>
								<pkg_lv4_put_tp_cd><![CDATA[<bean:write name="rowField" property="pkg_lv4_put_tp_cd"/>]]></pkg_lv4_put_tp_cd>
								<pkg_pl_std_qty><![CDATA[<bean:write name="rowField" property="pkg_pl_std_qty"/>]]></pkg_pl_std_qty>
								<pkg_pl_over_wgt><![CDATA[<bean:write name="rowField" property="pkg_pl_over_wgt"/>]]></pkg_pl_over_wgt>
								<alter_item_cd><![CDATA[<bean:write name="rowField" property="alter_item_cd"/>]]></alter_item_cd>
								<adv_curr_cd><![CDATA[<bean:write name="rowField" property="adv_curr_cd"/>]]></adv_curr_cd>
								<adv_price><![CDATA[<bean:write name="rowField" property="adv_price"/>]]></adv_price>
								<abc_cd><![CDATA[<bean:write name="rowField" property="abc_cd"/>]]></abc_cd>
								<barcode_no><![CDATA[<bean:write name="rowField" property="barcode_no"/>]]></barcode_no>
								<nego_curr_cd><![CDATA[<bean:write name="rowField" property="nego_curr_cd"/>]]></nego_curr_cd>
								<nego_price><![CDATA[<bean:write name="rowField" property="nego_price"/>]]></nego_price>
								<ref_cd_01><![CDATA[<bean:write name="rowField" property="ref_cd_01"/>]]></ref_cd_01>
								<safe_stc_qty><![CDATA[<bean:write name="rowField" property="safe_stc_qty"/>]]></safe_stc_qty>
								<unit_curr_cd><![CDATA[<bean:write name="rowField" property="unit_curr_cd"/>]]></unit_curr_cd>
								<unit_price><![CDATA[<bean:write name="rowField" property="unit_price"/>]]></unit_price>
								<ref_cd_02><![CDATA[<bean:write name="rowField" property="ref_cd_02"/>]]></ref_cd_02>
								<len_ut_cd><![CDATA[<bean:write name="rowField" property="len_ut_cd"/>]]></len_ut_cd>
							</logic:iterate>
						</DATA>
					</FIELD>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="sheet2">
 					<bean:define id="rowSetSheet2" name="rowSet" property="sheet2"/>
 					
 					<bean:size id="sheet2_size" name="rowSetSheet2"/>
 					
					<SHEET2>
						<DATA TOTAL="<bean:write name="sheet2_size" />">
						<logic:iterate id="rowSheet2" name="rowSetSheet2">
							<tr>
								<TD></TD>
								<TD><bean:write name="rowSheet2" property="wh_cd"/></TD>
								<TD><bean:write name="rowSheet2" property="wh_nm"/></TD>
								<TD><bean:write name="rowSheet2" property="fix_loc_cd"/></TD>
								<TD><bean:write name="rowSheet2" property="fix_loc_nm"/></TD>
								<TD><bean:write name="rowSheet2" property="def_loc_cd"/></TD>
								<TD><bean:write name="rowSheet2" property="def_loc_nm"/></TD>
								<TD><bean:write name="rowSheet2" property="ctrt_no"/></TD>
								<TD><bean:write name="rowSheet2" property="item_sys_no"/></TD>
								<TD></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET2>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="sheet3">
 					<bean:define id="rowSetSheet3" name="rowSet" property="sheet3"/>
 					
 					<bean:size id="sheet3_size" name="rowSetSheet3"/>
 					
					<SHEET3>
						<DATA TOTAL="<bean:write name="sheet3_size" />">
						<logic:iterate id="rowSheet3" name="rowSetSheet3">
							<tr>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="supp_cd"/></TD>
								<TD><bean:write name="rowSheet3" property="supp_nm"/></TD>
								<TD><bean:write name="rowSheet3" property="supp_item_cd"/></TD>
								<TD><bean:write name="rowSheet3" property="ctrt_no"/></TD>
								<TD><bean:write name="rowSheet3" property="item_sys_no"/></TD>
								<TD></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET3>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="sheet4">
 					<bean:define id="rowSetSheet4" name="rowSet" property="sheet4"/>
 					
 					<bean:size id="sheet4_size" name="rowSetSheet4"/>
 					
					<SHEET4>
						<DATA TOTAL="<bean:write name="sheet4_size" />">
						<logic:iterate id="rowSheet4" name="rowSetSheet4">
							<tr>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet4" property="file_org_nm"/></TD>
								<TD><bean:write name="rowSheet4" property="file_size"/></TD>
								<TD><bean:write name="rowSheet4" property="file_seq"/></TD>
								<TD><bean:write name="rowSheet4" property="file_path"/></TD>
								<TD><bean:write name="rowSheet4" property="file_sys_nm"/></TD>
								<TD><bean:write name="rowSheet4" property="ctrt_no"/></TD>
								<TD><bean:write name="rowSheet4" property="item_sys_no"/></TD>
								<TD></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET4>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="sheet5">
 					<bean:define id="rowSetSheet5" name="rowSet" property="sheet5"/>
 					
 					<bean:size id="sheet5_size" name="rowSetSheet5"/>
 					
					<SHEET5>
						<DATA TOTAL="<bean:write name="sheet5_size" />">
						<logic:iterate id="rowSheet5" name="rowSetSheet5">
							<tr>
								<TD></TD>
								<TD><bean:write name="rowSheet5" property="opt_fld_clss_cd"/></TD>
								<TD><bean:write name="rowSheet5" property="opt_fld_id"/></TD>
								<TD><bean:write name="rowSheet5" property="opt_fld_nm"/></TD>
								<TD><bean:write name="rowSheet5" property="opt_fld_val"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET5>
				</logic:notEmpty>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
