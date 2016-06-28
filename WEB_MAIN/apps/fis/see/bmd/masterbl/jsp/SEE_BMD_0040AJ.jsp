<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0030GS.jsp
*@FileTitle  : Shipping Request 처리용 Grid
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
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="hblVO"   name="EventResponse" property="objVal"/>
        <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
		<DATA>
			<bl_sts_cd><![CDATA[<bean:write name="hblVO"  property="bl_sts_cd" filter="false" />]]></bl_sts_cd>
			<intg_bl_seq><![CDATA[<bean:write name="hblVO"  property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<f_intg_bl_seq><![CDATA[<bean:write name="valMap" property="f_intg_bl_seq" filter="false" />]]></f_intg_bl_seq>
			<f_hbl_intg_bl_seq><![CDATA[<bean:write name="valMap" property="f_hbl_intg_bl_seq" filter="false" />]]></f_hbl_intg_bl_seq>
			<bl_no><![CDATA[<bean:write name="hblVO" property="bl_no" filter="false" />]]></bl_no>
			<ref_no><![CDATA[<bean:write name="hblVO" property="ref_no" filter="false" />]]></ref_no>
			<lnr_bkg_no><![CDATA[<bean:write name="hblVO" property="lnr_bkg_no" filter="false" />]]></lnr_bkg_no>
			<post_dt><![CDATA[<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></post_dt>
			<f_isNumSep><![CDATA[<bean:write name="valMap" property="f_isNumSep" filter="false" />]]></f_isNumSep>
			<f_ref_no><![CDATA[<bean:write name="valMap" property="f_ref_no" filter="false" />]]></f_ref_no>
			<f_bl_no><![CDATA[<bean:write name="valMap" property="f_bl_no" filter="false" />]]></f_bl_no>
			<f_lnr_bkg_no><![CDATA[<bean:write name="valMap" property="f_lnr_bkg_no" filter="false" />]]></f_lnr_bkg_no>
			<ref_ofc_cd><![CDATA[<bean:write name="hblVO" property="ref_ofc_cd" filter="false" />]]></ref_ofc_cd>
			<hbl_tp_cd><![CDATA[<bean:write name="hblVO" property="hbl_tp_cd" filter="false" />]]></hbl_tp_cd>
			<mrn><![CDATA[<bean:write name="hblVO" property="mrn" filter="false" />]]></mrn>
			<sub_bl_no><![CDATA[<bean:write name="hblVO" property="sub_bl_no" filter="false" />]]></sub_bl_no>
			<itn_no><![CDATA[<bean:write name="hblVO" property="itn_no" filter="false" />]]></itn_no>
			<sc_no><![CDATA[<bean:write name="hblVO" property="sc_no" filter="false" />]]></sc_no>
			<cust_ref_no><![CDATA[<bean:write name="hblVO" property="cust_ref_no" filter="false" />]]></cust_ref_no>
			<shpr_trdp_nm><![CDATA[<bean:write name="hblVO" property="shpr_trdp_nm" filter="false" />]]></shpr_trdp_nm>
			<shpr_trdp_cd><![CDATA[<bean:write name="hblVO" property="shpr_trdp_cd" filter="false" />]]></shpr_trdp_cd>
			<shpr_trdp_addr><![CDATA[<bean:write name="hblVO" property="shpr_trdp_addr"  filter="false" />]]></shpr_trdp_addr>
			<cnee_trdp_cd><![CDATA[<bean:write name="hblVO" property="cnee_trdp_cd" filter="false" />]]></cnee_trdp_cd>
			<cnee_trdp_nm><![CDATA[<bean:write name="hblVO" property="cnee_trdp_nm" filter="false" />]]></cnee_trdp_nm>
			<cnee_trdp_addr><![CDATA[<bean:write name="hblVO" property="cnee_trdp_addr"  filter="false" />]]></cnee_trdp_addr>
			<ntfy_trdp_cd><![CDATA[<bean:write name="hblVO" property="ntfy_trdp_cd" filter="false" />]]></ntfy_trdp_cd>
			<ntfy_trdp_nm><![CDATA[<bean:write name="hblVO" property="ntfy_trdp_nm" filter="false" />]]></ntfy_trdp_nm>
			<ntfy_trdp_addr><![CDATA[<bean:write name="hblVO" property="ntfy_trdp_addr"  filter="false" />]]></ntfy_trdp_addr>
			<agent_trdp_cd><![CDATA[<bean:write name="hblVO" property="agent_trdp_cd" filter="false" />]]></agent_trdp_cd>
			<agent_trdp_nm><![CDATA[<bean:write name="hblVO" property="agent_trdp_nm" filter="false" />]]></agent_trdp_nm>
			<agent_trdp_addr><![CDATA[<bean:write name="hblVO" property="agent_trdp_addr"  filter="false" />]]></agent_trdp_addr>
			<prnr_trdp_cd2><![CDATA[<bean:write name="hblVO" property="prnr_trdp_cd2" filter="false" />]]></prnr_trdp_cd2>
			<prnr_trdp_nm2><![CDATA[<bean:write name="hblVO" property="prnr_trdp_nm2" filter="false" />]]></prnr_trdp_nm2>
			<prnr_trdp_addr2><![CDATA[<bean:write name="hblVO" property="prnr_trdp_addr2" filter="false" />]]></prnr_trdp_addr2>
			<prnr_trdp_cd><![CDATA[<bean:write name="hblVO" property="prnr_trdp_cd" filter="false" />]]></prnr_trdp_cd>
			<prnr_trdp_nm><![CDATA[<bean:write name="hblVO" property="prnr_trdp_nm" filter="false" />]]></prnr_trdp_nm>
			<prnr_trdp_addr><![CDATA[<bean:write name="hblVO" property="prnr_trdp_addr" filter="false" />]]></prnr_trdp_addr>
			<lnr_trdp_cd><![CDATA[<bean:write name="hblVO" property="lnr_trdp_cd" filter="false" />]]></lnr_trdp_cd>
			<lnr_trdp_nm><![CDATA[<bean:write name="hblVO" property="lnr_trdp_nm" filter="false" />]]></lnr_trdp_nm>
			<trnk_vsl_cd><![CDATA[<bean:write name="hblVO" property="trnk_vsl_cd" filter="false" />]]></trnk_vsl_cd>
			<trnk_vsl_nm><![CDATA[<bean:write name="hblVO" property="trnk_vsl_nm" filter="false" />]]></trnk_vsl_nm>
			<trnk_voy><![CDATA[<bean:write name="hblVO" property="trnk_voy" filter="false" />]]></trnk_voy>
			<etd_dt_tm><![CDATA[<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></etd_dt_tm>
			<eta_dt_tm><![CDATA[<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></eta_dt_tm>
			<etd_por_tm><![CDATA[<wrt:write name="hblVO" property="etd_por_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></etd_por_tm>
			<carr_trdp_cd><![CDATA[<bean:write name="hblVO" property="carr_trdp_cd" filter="false" />]]></carr_trdp_cd>
			<carr_trdp_addr><![CDATA[<bean:write name="hblVO" property="carr_trdp_addr" filter="false" />]]></carr_trdp_addr>
			<carr_trdp_nm><![CDATA[<bean:write name="hblVO" property="carr_trdp_nm" filter="false" />]]></carr_trdp_nm>
			<por_cd><![CDATA[<bean:write name="hblVO" property="por_cd" filter="false" />]]></por_cd>
			<por_nod_cd><![CDATA[<bean:write name="hblVO" property="por_nod_cd" filter="false" />]]></por_nod_cd>
			<por_nm><![CDATA[<bean:write name="hblVO" property="por_nm" filter="false" />]]></por_nm>
			<pol_cd><![CDATA[<bean:write name="hblVO" property="pol_cd" filter="false" />]]></pol_cd>
			<pol_nod_cd><![CDATA[<bean:write name="hblVO" property="pol_nod_cd" filter="false" />]]></pol_nod_cd>
			<pol_nm><![CDATA[<bean:write name="hblVO" property="pol_nm" filter="false" />]]></pol_nm>
			<pod_cd><![CDATA[<bean:write name="hblVO" property="pod_cd" filter="false" />]]></pod_cd>
			<pod_nod_cd><![CDATA[<bean:write name="hblVO" property="pod_nod_cd" filter="false" />]]></pod_nod_cd>
			<pod_nm><![CDATA[<bean:write name="hblVO" property="pod_nm" filter="false" />]]></pod_nm>
			<del_cd><![CDATA[<bean:write name="hblVO" property="del_cd" filter="false" />]]></del_cd>
			<del_nod_cd><![CDATA[<bean:write name="hblVO" property="del_nod_cd" filter="false" />]]></del_nod_cd>
			<del_nm><![CDATA[<bean:write name="hblVO" property="del_nm" filter="false" />]]></del_nm>
			<fnl_dest_loc_cd><![CDATA[<bean:write name="hblVO" property="fnl_dest_loc_cd" filter="false" />]]></fnl_dest_loc_cd>
			<fnl_dest_nod_cd><![CDATA[<bean:write name="hblVO" property="fnl_dest_nod_cd" filter="false" />]]></fnl_dest_nod_cd>
			<fnl_dest_loc_nm><![CDATA[<bean:write name="hblVO" property="fnl_dest_loc_nm" filter="false" />]]></fnl_dest_loc_nm>
			<rcv_wh_cd><![CDATA[<bean:write name="hblVO" property="rcv_wh_cd" filter="false" />]]></rcv_wh_cd>
			<rcv_wh_nm><![CDATA[<bean:write name="hblVO" property="rcv_wh_nm" filter="false" />]]></rcv_wh_nm>
			<cntr_info><![CDATA[<bean:write name="hblVO" property="cntr_info" filter="false" />]]></cntr_info>
			<pu_trdp_cd><![CDATA[<bean:write name="hblVO" property="pu_trdp_cd" filter="false" />]]></pu_trdp_cd>
			<pu_trdp_nm><![CDATA[<bean:write name="hblVO" property="pu_trdp_nm" filter="false" />]]></pu_trdp_nm>
			<frt_term_cd><![CDATA[<bean:write name="hblVO" property="frt_term_cd" filter="false" />]]></frt_term_cd>
			<shp_mod_cd><![CDATA[<bean:write name="hblVO"  property="shp_mod_cd" filter="false" />]]></shp_mod_cd>
			<fm_svc_term_cd><![CDATA[<bean:write name="hblVO" property="fm_svc_term_cd" filter="false" />]]></fm_svc_term_cd>
			<to_svc_term_cd><![CDATA[<bean:write name="hblVO" property="to_svc_term_cd" filter="false" />]]></to_svc_term_cd>
			<curr_cd><![CDATA[<bean:write name="hblVO" property="curr_cd" filter="false" />]]></curr_cd>
			<obl_tp_cd><![CDATA[<bean:write name="hblVO" property="obl_tp_cd" filter="false" />]]></obl_tp_cd>
			<broker_rt><![CDATA[<bean:write name="hblVO" property="broker_rt" filter="false" />]]></broker_rt>
			<profit_share><![CDATA[<bean:write name="hblVO" property="profit_share" filter="false" />]]></profit_share>
			<cut_off_dt><![CDATA[<wrt:write name="hblVO" property="cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></cut_off_dt>
			<cut_off_tm><![CDATA[<wrt:write name="hblVO" property="cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></cut_off_tm>
			<rail_cut_off_dt><![CDATA[<wrt:write name="hblVO" property="rail_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></rail_cut_off_dt>
			<rail_cut_off_tm><![CDATA[<wrt:write name="hblVO" property="rail_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></rail_cut_off_tm>
			<doc_cut_off_dt><![CDATA[<wrt:write name="hblVO" property="doc_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></doc_cut_off_dt>
			<doc_cut_off_tm><![CDATA[<wrt:write name="hblVO" property="doc_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></doc_cut_off_tm>
			<pck_qty><![CDATA[<bean:write name="hblVO" property="pck_qty" filter="false" />]]></pck_qty>
			<pck_ut_cd><![CDATA[<bean:write name="hblVO" property="pck_ut_cd" filter="false" />]]></pck_ut_cd>
			<grs_wgt><![CDATA[<bean:write name="hblVO" property="grs_wgt" filter="false" />]]></grs_wgt>
			<grs_wgt1><![CDATA[<bean:write name="hblVO" property="grs_wgt1" filter="false" />]]></grs_wgt1>
			<meas><![CDATA[<bean:write name="hblVO" property="meas" filter="false" />]]></meas>
			<meas1><![CDATA[<bean:write name="hblVO" property="meas1" filter="false" />]]></meas1>
			<bl_iss_dt><![CDATA[<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></bl_iss_dt>
			<issued_by><![CDATA[<bean:write name="hblVO" property="issued_by" filter="false" />]]></issued_by>
			<proc_usrnm><![CDATA[<bean:write name="hblVO" property="proc_usrnm" filter="false" />]]></proc_usrnm>
			<proc_ofccd><![CDATA[<bean:write name="hblVO" property="proc_ofccd" filter="false" />]]></proc_ofccd>
			<proc_dept_cd><![CDATA[<bean:write name="hblVO" property="proc_dept_cd" filter="false" />]]></proc_dept_cd>
			<sls_ofc_cd><![CDATA[<bean:write name="hblVO" property="sls_ofc_cd" filter="false" />]]></sls_ofc_cd>
			<sls_usrid><![CDATA[<bean:write name="hblVO" property="sls_usrid" filter="false" />]]></sls_usrid>
			<sls_usr_nm><![CDATA[<bean:write name="hblVO" property="sls_usr_nm" filter="false" />]]></sls_usr_nm>
			<sls_dept_cd><![CDATA[<bean:write name="hblVO" property="sls_dept_cd" filter="false" />]]></sls_dept_cd>
			<sad_txt><![CDATA[<bean:write name="hblVO" property="sad_txt"  filter="false" />]]></sad_txt>
			<mk_grs_wgt><![CDATA[<bean:write name="hblVO" property="mk_grs_wgt" filter="false" />]]></mk_grs_wgt>
			<mk_grs_wgt1><![CDATA[<bean:write name="hblVO" property="mk_grs_wgt1" filter="false" />]]></mk_grs_wgt1>
			<mk_meas><![CDATA[<bean:write name="hblVO" property="mk_meas" filter="false" />]]></mk_meas>
			<mk_meas1><![CDATA[<bean:write name="hblVO" property="mk_meas1" filter="false" />]]></mk_meas1>
			<mk_txt><![CDATA[<bean:write name="hblVO" property="mk_txt"   filter="false" />]]></mk_txt>
			<desc_txt><![CDATA[<bean:write name="hblVO" property="desc_txt"  filter="false" />]]></desc_txt>
			<rmk><![CDATA[<bean:write name="hblVO" property="rmk"  filter="false" />]]></rmk>
			<obrd_dt_tm><![CDATA[<bean:write name="hblVO" property="obrd_dt_tm" filter="false" />]]></obrd_dt_tm>
			<ctrb_ofc_cd><![CDATA[<bean:write name="hblVO" property="ctrb_ofc_cd" filter="false" />]]></ctrb_ofc_cd>
			<ctrb_dept_cd><![CDATA[<bean:write name="hblVO" property="ctrb_dept_cd" filter="false" />]]></ctrb_dept_cd>
			<ctrb_ratio_yn><![CDATA[<bean:write name="hblVO" property="ctrb_ratio_yn" filter="false" />]]></ctrb_ratio_yn>
			<ctrb_mgn><![CDATA[<bean:write name="hblVO" property="ctrb_mgn" filter="false" />]]></ctrb_mgn>
		</DATA>
	</logic:notEmpty>    
</logic:empty>