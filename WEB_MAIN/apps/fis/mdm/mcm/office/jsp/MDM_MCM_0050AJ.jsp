<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0150AJ.jsp
*@FileTitle  : OEH Certificate of Origin
*@Description: 
*@author     : TIN.LUONG - Dou
*@version    : 1.0 - 05/12/2014
*@since      : 05/12/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="mapVal">
		<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
     	<bean:define id="cdList" name="cdMap" property="GL_CODE"/>
     	<bean:define id="cdList1" name="cdMap" property="FREIGHT_CODE"/>
     	<bean:define id="fontSize" name="cdMap" property="PARAM1"/>
     	<bean:define id="wgtUtCd" name="cdMap" property="PARAM2"/>
     	<bean:define id="measUtCd" name="cdMap" property="PARAM3"/>
     	<bean:define id="length" name="cdMap" property="PARAM4"/>
     	<bean:define id="postDate" name="cdMap" property="PARAM5"/>
     	<bean:define id="taxType" name="cdMap" property="PARAM6"/>
     	<bean:define id="invPostDate" name="cdMap" property="PARAM7"/>

     	<bean:define id="impPostDate" name="cdMap" property="PARAM8"/>
     	
     	<bean:define id="ofcVO"  name="EventResponse" property="objVal"/>
		<DATA>
			<f_isNumSep><![CDATA[<bean:write name="cdMap" property="f_isNumSep" filter="false" />]]></f_isNumSep>
			<s_ofc_cd><![CDATA[<bean:write name="cdMap" property="s_ofc_cd" filter="false" />]]></s_ofc_cd>
			<s_ofc_nm><![CDATA[<bean:write name="cdMap" property="s_ofc_nm" filter="false" />]]></s_ofc_nm>
			<ofc_cd><![CDATA[<bean:write name="ofcVO" property="ofc_cd" filter="false" />]]></ofc_cd>
			<use_flg><![CDATA[<bean:write name="ofcVO" property="use_flg" filter="false" />]]></use_flg>
			<cnt_cd><![CDATA[<bean:write name="ofcVO" property="cnt_cd" filter="false" />]]></cnt_cd>
			<cnt_nm><![CDATA[<bean:write name="ofcVO" property="cnt_nm" filter="false" />]]></cnt_nm>
			<state_cd><![CDATA[<bean:write name="ofcVO" property="state_cd" filter="false" />]]></state_cd>
			<state_nm><![CDATA[<bean:write name="ofcVO" property="state_nm" filter="false" />]]></state_nm>
			<prnt_ofc_cd><![CDATA[<bean:write name="ofcVO" property="prnt_ofc_cd" filter="false" />]]></prnt_ofc_cd>
			<prnt_ofc_nm><![CDATA[<bean:write name="ofcVO" property="prnt_ofc_nm" filter="false" />]]></prnt_ofc_nm>
			<sls_ofc_cd><![CDATA[<bean:write name="ofcVO" property="sls_ofc_cd" filter="false" />]]></sls_ofc_cd>
			<sls_ofc_nm><![CDATA[<bean:write name="ofcVO" property="sls_ofc_nm" filter="false" />]]></sls_ofc_nm>
			<finc_ofc_cd><![CDATA[<bean:write name="ofcVO" property="finc_ofc_cd" filter="false" />]]></finc_ofc_cd>
			<finc_ofc_nm><![CDATA[<bean:write name="ofcVO" property="finc_ofc_nm" filter="false" />]]></finc_ofc_nm>
			<trf_cur_cd><![CDATA[<bean:write name="ofcVO" property="trf_cur_cd" filter="false" />]]></trf_cur_cd>
			<ofc_eng_nm><![CDATA[<bean:write name="ofcVO" property="ofc_eng_nm" filter="false" />]]></ofc_eng_nm>
			<ofc_locl_nm><![CDATA[<bean:write name="ofcVO" property="ofc_locl_nm" filter="false" />]]></ofc_locl_nm>
			<ofc_rep_nm><![CDATA[<bean:write name="ofcVO" property="ofc_rep_nm" filter="false" />]]></ofc_rep_nm>
			<descr><![CDATA[<bean:write name="ofcVO" property="descr" filter="false" />]]></descr>
			<ofc_addr><![CDATA[<bean:write name="ofcVO" property="ofc_addr" filter="false" />]]></ofc_addr>
			<ofc_zip><![CDATA[<bean:write name="ofcVO" property="ofc_zip" filter="false" />]]></ofc_zip>
			<ofc_phn><![CDATA[<bean:write name="ofcVO" property="ofc_phn" filter="false" />]]></ofc_phn>
			<ofc_fax><![CDATA[<bean:write name="ofcVO" property="ofc_fax" filter="false" />]]></ofc_fax>
			<ofc_email><![CDATA[<bean:write name="ofcVO" property="ofc_email" filter="false" />]]></ofc_email>
			<ofc_url><![CDATA[<bean:write name="ofcVO" property="ofc_url" filter="false" />]]></ofc_url>
			<iata_cd><![CDATA[<bean:write name="ofcVO" property="iata_cd" filter="false" />]]></iata_cd>
			<fmc_no><![CDATA[<bean:write name="ofcVO" property="fmc_no" filter="false" />]]></fmc_no>
			<tax_type><![CDATA[<bean:write name="ofcVO" property="tax_type" filter="false" />]]></tax_type>
			<tax_no><![CDATA[<bean:write name="ofcVO" property="tax_no" filter="false" />]]></tax_no>
			<tsa_sec_no><![CDATA[<bean:write name="ofcVO" property="tsa_sec_no" filter="false" />]]></tsa_sec_no>
			<use_hbl_ser><![CDATA[<bean:write name="ofcVO" property="use_hbl_ser" filter="false" />]]></use_hbl_ser>
			<inv_prfx><![CDATA[<bean:write name="ofcVO" property="inv_prfx" filter="false" />]]></inv_prfx>
			<inv_seq_no><![CDATA[<bean:write name="ofcVO" property="inv_seq_no" filter="false" />]]></inv_seq_no>
			<crdr_prfx><![CDATA[<bean:write name="ofcVO" property="crdr_prfx" filter="false" />]]></crdr_prfx>
			<crdr_seq_no><![CDATA[<bean:write name="ofcVO" property="crdr_seq_no" filter="false" />]]></crdr_seq_no>
			<oi_ref_prfx><![CDATA[<bean:write name="ofcVO" property="oi_ref_prfx" filter="false" />]]></oi_ref_prfx>
			<oi_ref_seq_no><![CDATA[<bean:write name="ofcVO" property="oi_ref_seq_no" filter="false" />]]></oi_ref_seq_no>
			<oe_ref_prfx><![CDATA[<bean:write name="ofcVO" property="oe_ref_prfx" filter="false" />]]></oe_ref_prfx>
			<oe_ref_seq_no><![CDATA[<bean:write name="ofcVO" property="oe_ref_seq_no" filter="false" />]]></oe_ref_seq_no>
			<ai_ref_prfx><![CDATA[<bean:write name="ofcVO" property="ai_ref_prfx" filter="false" />]]></ai_ref_prfx>
			<ai_ref_seq_no><![CDATA[<bean:write name="ofcVO" property="ai_ref_seq_no" filter="false" />]]></ai_ref_seq_no>
			<ae_ref_prfx><![CDATA[<bean:write name="ofcVO" property="ae_ref_prfx" filter="false" />]]></ae_ref_prfx>
			<ae_ref_seq_no><![CDATA[<bean:write name="ofcVO" property="ae_ref_seq_no" filter="false" />]]></ae_ref_seq_no>
			<ae_awb_prfx><![CDATA[<bean:write name="ofcVO" property="ae_awb_prfx" filter="false" />]]></ae_awb_prfx>
			<ae_awb_seq_no><![CDATA[<bean:write name="ofcVO" property="ae_awb_seq_no" filter="false" />]]></ae_awb_seq_no>
			<oe_hbl_prfx><![CDATA[<bean:write name="ofcVO" property="oe_hbl_prfx" filter="false" />]]></oe_hbl_prfx>
			<oe_hbl_seq_no><![CDATA[<bean:write name="ofcVO" property="oe_hbl_seq_no" filter="false" />]]></oe_hbl_seq_no>
			<oe_bkg_prfx><![CDATA[<bean:write name="ofcVO" property="oe_bkg_prfx" filter="false" />]]></oe_bkg_prfx>
			<oe_bkg_seq_no><![CDATA[<bean:write name="ofcVO" property="oe_bkg_seq_no" filter="false" />]]></oe_bkg_seq_no>
			<ae_bkg_prfx><![CDATA[<bean:write name="ofcVO" property="ae_bkg_prfx" filter="false" />]]></ae_bkg_prfx>
			<ae_bkg_seq_no><![CDATA[<bean:write name="ofcVO" property="ae_bkg_seq_no" filter="false" />]]></ae_bkg_seq_no>
			<sea_quo_prfx><![CDATA[<bean:write name="ofcVO" property="sea_quo_prfx" filter="false" />]]></sea_quo_prfx>
			<sea_quo_seq_no><![CDATA[<bean:write name="ofcVO" property="sea_quo_seq_no" filter="false" />]]></sea_quo_seq_no>
			<air_quo_prfx><![CDATA[<bean:write name="ofcVO" property="air_quo_prfx" filter="false" />]]></air_quo_prfx>
			<air_quo_seq_no><![CDATA[<bean:write name="ofcVO" property="air_quo_seq_no" filter="false" />]]></air_quo_seq_no>
			<wh_rcpt_prfx><![CDATA[<bean:write name="ofcVO" property="wh_rcpt_prfx" filter="false" />]]></wh_rcpt_prfx>
			<wh_rcpt_seq_no><![CDATA[<bean:write name="ofcVO" property="wh_rcpt_seq_no" filter="false" />]]></wh_rcpt_seq_no>
			<!--  Vinh.Vo (S)-->
			<wh_rcv_prfx><![CDATA[<bean:write name="ofcVO" property="wh_rcv_prfx" filter="false" />]]></wh_rcv_prfx>
            <wh_rcv_seq_no><![CDATA[<bean:write name="ofcVO" property="wh_rcv_seq_no" filter="false" />]]></wh_rcv_seq_no>
            <wh_shp_prfx><![CDATA[<bean:write name="ofcVO" property="wh_shp_prfx" filter="false" />]]></wh_shp_prfx>
            <wh_shp_seq_no><![CDATA[<bean:write name="ofcVO" property="wh_shp_seq_no" filter="false" />]]></wh_shp_seq_no>
			<!--  Vinh.Vo (E)-->
			<trk_prfx><![CDATA[<bean:write name="ofcVO" property="trk_prfx" filter="false" />]]></trk_prfx>
			<trk_seq_no><![CDATA[<bean:write name="ofcVO" property="trk_seq_no" filter="false" />]]></trk_seq_no>
			<wm_doc_prfx><![CDATA[<bean:write name="ofcVO" property="wm_doc_prfx" filter="false" />]]></wm_doc_prfx>
			<wm_doc_seq_no><![CDATA[<bean:write name="ofcVO" property="wm_doc_seq_no" filter="false" />]]></wm_doc_seq_no>
			<aes_cntc_nm><![CDATA[<bean:write name="ofcVO" property="aes_cntc_nm" filter="false" />]]></aes_cntc_nm>
			<aes_city><![CDATA[<bean:write name="ofcVO" property="aes_city" filter="false" />]]></aes_city>
			<aes_state_cd><![CDATA[<bean:write name="ofcVO" property="aes_state_cd" filter="false" />]]></aes_state_cd>
			<aes_zip><![CDATA[<bean:write name="ofcVO" property="aes_zip" filter="false" />]]></aes_zip>
			<aes_cnt_cd><![CDATA[<bean:write name="ofcVO" property="aes_cnt_cd" filter="false" />]]></aes_cnt_cd>
			<aes_rspn_email><![CDATA[<bean:write name="ofcVO" property="aes_rspn_email" filter="false" />]]></aes_rspn_email>
			<aes_prt_type><![CDATA[<bean:write name="ofcVO" property="aes_prt_type" filter="false" />]]></aes_prt_type>
			<it_next_no><![CDATA[<bean:write name="ofcVO" property="it_next_no" filter="false" />]]></it_next_no>
			<it_end><![CDATA[<bean:write name="ofcVO" property="it_end" filter="false" />]]></it_end>
			<ccn_prfx><![CDATA[<bean:write name="ofcVO" property="ccn_prfx" filter="false" />]]></ccn_prfx>
			<oi_ccn_seqno><![CDATA[<bean:write name="ofcVO" property="oi_ccn_seqno" filter="false" />]]></oi_ccn_seqno>
			<ai_ccn_seqno><![CDATA[<bean:write name="ofcVO" property="ai_ccn_seqno" filter="false" />]]></ai_ccn_seqno>
			<oth_wgt_ut_cd><![CDATA[<bean:write name="ofcVO" property="oth_wgt_ut_cd" filter="false" />]]></oth_wgt_ut_cd>
			<oth_meas_ut_cd><![CDATA[<bean:write name="ofcVO" property="oth_meas_ut_cd" filter="false" />]]></oth_meas_ut_cd>
			<oth_size_ut_cd><![CDATA[<bean:write name="ofcVO" property="oth_size_ut_cd" filter="false" />]]></oth_size_ut_cd>
			<logo_square_filenm><![CDATA[<bean:write name="ofcVO" property="logo_square_filenm" filter="false" />]]></logo_square_filenm>
			<logo_square><![CDATA[<bean:write name="ofcVO" property="logo_square" filter="false" />]]></logo_square>
			<logo_rectangle_filenm><![CDATA[<bean:write name="ofcVO" property="logo_rectangle_filenm" filter="false" />]]></logo_rectangle_filenm>
			<logo_rectangle><![CDATA[<bean:write name="ofcVO" property="logo_rectangle" filter="false" />]]></logo_rectangle>
			<logo_sub_filenm><![CDATA[<bean:write name="ofcVO" property="logo_sub_filenm" filter="false" />]]></logo_sub_filenm>
			<logo_sub><![CDATA[<bean:write name="ofcVO" property="logo_sub" filter="false" />]]></logo_sub>
			<gl_ar><![CDATA[<bean:write name="ofcVO" property="gl_ar" filter="false" />]]></gl_ar>
			<gl_ap><![CDATA[<bean:write name="ofcVO" property="gl_ap" filter="false" />]]></gl_ap>
			<gl_agent_ar><![CDATA[<bean:write name="ofcVO" property="gl_agent_ar" filter="false" />]]></gl_agent_ar>
			<gl_agent_ap><![CDATA[<bean:write name="ofcVO" property="gl_agent_ap" filter="false" />]]></gl_agent_ap>
			<gl_re_earn><![CDATA[<bean:write name="ofcVO" property="gl_re_earn" filter="false" />]]></gl_re_earn>
			<gl_ex_profit><![CDATA[<bean:write name="ofcVO" property="gl_ex_profit" filter="false" />]]></gl_ex_profit>
			<gl_ex_loss><![CDATA[<bean:write name="ofcVO" property="gl_ex_loss" filter="false" />]]></gl_ex_loss>
			<gl_misc_profit><![CDATA[<bean:write name="ofcVO" property="gl_misc_profit" filter="false" />]]></gl_misc_profit>
			<gl_misc_loss><![CDATA[<bean:write name="ofcVO" property="gl_misc_loss" filter="false" />]]></gl_misc_loss>
			<gl_vat_rev><![CDATA[<bean:write name="ofcVO" property="gl_vat_rev" filter="false" />]]></gl_vat_rev>
			<gl_vat_cost><![CDATA[<bean:write name="ofcVO" property="gl_vat_cost" filter="false" />]]></gl_vat_cost>
			<gl_vat_exp><![CDATA[<bean:write name="ofcVO" property="gl_vat_exp" filter="false" />]]></gl_vat_exp>
			<gl_agent_ps_oi><![CDATA[<bean:write name="ofcVO" property="gl_agent_ps_oi" filter="false" />]]></gl_agent_ps_oi>
			<gl_agent_ps_oe><![CDATA[<bean:write name="ofcVO" property="gl_agent_ps_oe" filter="false" />]]></gl_agent_ps_oe>
			<gl_agent_ps_ai><![CDATA[<bean:write name="ofcVO" property="gl_agent_ps_ai" filter="false" />]]></gl_agent_ps_ai>
			<gl_agent_ps_ae><![CDATA[<bean:write name="ofcVO" property="gl_agent_ps_ae" filter="false" />]]></gl_agent_ps_ae>
			<gl_agent_ps_oth><![CDATA[<bean:write name="ofcVO" property="gl_agent_ps_oth" filter="false" />]]></gl_agent_ps_oth>
			<rvn_bank_seq><![CDATA[<bean:write name="ofcVO" property="rvn_bank_seq" filter="false" />]]></rvn_bank_seq>
			<cost_bank_seq><![CDATA[<bean:write name="ofcVO" property="cost_bank_seq" filter="false" />]]></cost_bank_seq>
			<post_dt_exp><![CDATA[<bean:write name="ofcVO" property="post_dt_exp" filter="false" />]]></post_dt_exp>
			<post_dt_imp><![CDATA[<bean:write name="ofcVO" property="post_dt_imp" filter="false" />]]></post_dt_imp>
			<post_dt_inv><![CDATA[<bean:write name="ofcVO" property="post_dt_inv" filter="false" />]]></post_dt_inv>
			<post_dt_crdr><![CDATA[<bean:write name="ofcVO" property="post_dt_crdr" filter="false" />]]></post_dt_crdr>
			<pps_use_flg><![CDATA[<bean:write name="ofcVO" property="pps_use_flg" filter="false" />]]></pps_use_flg>
			<pps_payto_trdp_cd><![CDATA[<bean:write name="ofcVO" property="pps_payto_trdp_cd" filter="false" />]]></pps_payto_trdp_cd>
			<pps_payto_trdp_nm><![CDATA[<bean:write name="ofcVO" property="pps_payto_trdp_nm" filter="false" />]]></pps_payto_trdp_nm>
			<pps_cntr20_rt><![CDATA[<bean:write name="ofcVO" property="pps_cntr20_rt" filter="false" />]]></pps_cntr20_rt>
			<pps_cntr40_rt><![CDATA[<bean:write name="ofcVO" property="pps_cntr40_rt" filter="false" />]]></pps_cntr40_rt>
			<pps_cbm_rt><![CDATA[<bean:write name="ofcVO" property="pps_cbm_rt" filter="false" />]]></pps_cbm_rt>
			
			<ctf_use_flg><![CDATA[<bean:write name="ofcVO" property="ctf_use_flg" filter="false" />]]></ctf_use_flg>
			<ctf_payto_trdp_cd><![CDATA[<bean:write name="ofcVO" property="ctf_payto_trdp_cd" filter="false" />]]></ctf_payto_trdp_cd>
			<ctf_payto_trdp_nm><![CDATA[<bean:write name="ofcVO" property="ctf_payto_trdp_nm" filter="false" />]]></ctf_payto_trdp_nm>
			<ctf_cntr20_rt><![CDATA[<bean:write name="ofcVO" property="ctf_cntr20_rt" filter="false" />]]></ctf_cntr20_rt>
			<ctf_cntr40_rt><![CDATA[<bean:write name="ofcVO" property="ctf_cntr40_rt" filter="false" />]]></ctf_cntr40_rt>
			<ctf_cbm_rt><![CDATA[<bean:write name="ofcVO" property="ctf_cbm_rt" filter="false" />]]></ctf_cbm_rt>
			<cf_use_flg><![CDATA[<bean:write name="ofcVO" property="cf_use_flg" filter="false" />]]></cf_use_flg>
			<cf_payto_trdp_cd><![CDATA[<bean:write name="ofcVO" property="cf_payto_trdp_cd" filter="false" />]]></cf_payto_trdp_cd>
			<cf_payto_trdp_nm><![CDATA[<bean:write name="ofcVO" property="cf_payto_trdp_nm" filter="false" />]]></cf_payto_trdp_nm>
			<cf_cntr20_rt><![CDATA[<bean:write name="ofcVO" property="cf_cntr20_rt" filter="false" />]]></cf_cntr20_rt>
			<cf_cntr40_rt><![CDATA[<bean:write name="ofcVO" property="cf_cntr40_rt" filter="false" />]]></cf_cntr40_rt>
			<cf_cbm_rt><![CDATA[<bean:write name="ofcVO" property="cf_cbm_rt" filter="false" />]]></cf_cbm_rt>
			
			<inv_font_size><![CDATA[<bean:write name="ofcVO" property="inv_font_size" filter="false" />]]></inv_font_size>
			<inv_rmk><![CDATA[<bean:write name="ofcVO" property="inv_rmk" filter="false" />]]></inv_rmk>
			<inv_carr_font_size><![CDATA[<bean:write name="ofcVO" property="inv_carr_font_size" filter="false" />]]></inv_carr_font_size>
			<inv_carr_rmk><![CDATA[<bean:write name="ofcVO" property="inv_carr_rmk" filter="false" />]]></inv_carr_rmk>
			<crdr_font_size><![CDATA[<bean:write name="ofcVO" property="crdr_font_size" filter="false" />]]></crdr_font_size>
			<crdr_rmk><![CDATA[<bean:write name="ofcVO" property="crdr_rmk" filter="false" />]]></crdr_rmk>
			<locl_stmt_font_size><![CDATA[<bean:write name="ofcVO" property="locl_stmt_font_size" filter="false" />]]></locl_stmt_font_size>
			<locl_stmt_rmk><![CDATA[<bean:write name="ofcVO" property="locl_stmt_rmk" filter="false" />]]></locl_stmt_rmk>
			<agent_stmt_font_size><![CDATA[<bean:write name="ofcVO" property="agent_stmt_font_size" filter="false" />]]></agent_stmt_font_size>
			<agent_stmt_rmk><![CDATA[<bean:write name="ofcVO" property="agent_stmt_rmk" filter="false" />]]></agent_stmt_rmk>
			<dock_rcpt_rmk><![CDATA[<bean:write name="ofcVO" property="dock_rcpt_rmk" filter="false" />]]></dock_rcpt_rmk>
			<do_font_size><![CDATA[<bean:write name="ofcVO" property="do_font_size" filter="false" />]]></do_font_size>
			<do_rmk><![CDATA[<bean:write name="ofcVO" property="do_rmk" filter="false" />]]></do_rmk>
			<ooh_bkg_font_size><![CDATA[<bean:write name="ofcVO" property="ooh_bkg_font_size" filter="false" />]]></ooh_bkg_font_size>
			<ooh_bkg_rmk><![CDATA[<bean:write name="ofcVO" property="ooh_bkg_rmk" filter="false" />]]></ooh_bkg_rmk>
			<awb_font_size><![CDATA[<bean:write name="ofcVO" property="awb_font_size" filter="false" />]]></awb_font_size>
			<awb_rmk><![CDATA[<bean:write name="ofcVO" property="awb_rmk" filter="false" />]]></awb_rmk>
			<pkup_font_size><![CDATA[<bean:write name="ofcVO" property="pkup_font_size" filter="false" />]]></pkup_font_size>
			<pkup_rmk><![CDATA[<bean:write name="ofcVO" property="pkup_rmk" filter="false" />]]></pkup_rmk>
			<!-- <quo_font_size><![CDATA[<bean:write name="ofcVO" property="quo_font_size" filter="false" />]]></quo_font_size>
			<quo_rmk><![CDATA[<bean:write name="ofcVO" property="quo_rmk" filter="false" />]]></quo_rmk> -->
			<oi_quo_font_size><![CDATA[<bean:write name="ofcVO" property="oi_quo_font_size" filter="false" />]]></oi_quo_font_size>
			<oi_quo_rmk><![CDATA[<bean:write name="ofcVO" property="oi_quo_rmk" filter="false" />]]></oi_quo_rmk>
			<oe_quo_font_size><![CDATA[<bean:write name="ofcVO" property="oe_quo_font_size" filter="false" />]]></oe_quo_font_size>
			<oe_quo_rmk><![CDATA[<bean:write name="ofcVO" property="oe_quo_rmk" filter="false" />]]></oe_quo_rmk>
			<ai_quo_font_size><![CDATA[<bean:write name="ofcVO" property="ai_quo_font_size" filter="false" />]]></ai_quo_font_size>
			<ai_quo_rmk><![CDATA[<bean:write name="ofcVO" property="ai_quo_rmk" filter="false" />]]></ai_quo_rmk>
			<ae_quo_font_size><![CDATA[<bean:write name="ofcVO" property="ae_quo_font_size" filter="false" />]]></ae_quo_font_size>
			<ae_quo_rmk><![CDATA[<bean:write name="ofcVO" property="ae_quo_rmk" filter="false" />]]></ae_quo_rmk>
			<wh_rct_font_size><![CDATA[<bean:write name="ofcVO" property="wh_rct_font_size" filter="false" />]]></wh_rct_font_size>
			<wh_rct_rmk><![CDATA[<bean:write name="ofcVO" property="wh_rct_rmk" filter="false" />]]></wh_rct_rmk>
			<oi_an_font_size><![CDATA[<bean:write name="ofcVO" property="oi_an_font_size" filter="false" />]]></oi_an_font_size>
			<oi_an_rmk><![CDATA[<bean:write name="ofcVO" property="oi_an_rmk" filter="false" />]]></oi_an_rmk>
			<oi_an_lcl_desc><![CDATA[<bean:write name="ofcVO" property="oi_an_lcl_desc" filter="false" />]]></oi_an_lcl_desc>
			<oi_an_fcl_desc><![CDATA[<bean:write name="ofcVO" property="oi_an_fcl_desc" filter="false" />]]></oi_an_fcl_desc>
			<sea_body><![CDATA[<bean:write name="ofcVO" property="sea_body" filter="false" />]]></sea_body>
			<sea_lcl_desc><![CDATA[<bean:write name="ofcVO" property="sea_lcl_desc" filter="false" />]]></sea_lcl_desc>
			<sea_fcl_desc><![CDATA[<bean:write name="ofcVO" property="sea_fcl_desc" filter="false" />]]></sea_fcl_desc>
			<sea_cob><![CDATA[<bean:write name="ofcVO" property="sea_cob" filter="false" />]]></sea_cob>
			<sea_mei><![CDATA[<bean:write name="ofcVO" property="sea_mei" filter="false" />]]></sea_mei>
			<sea_msco><![CDATA[<bean:write name="ofcVO" property="sea_msco" filter="false" />]]></sea_msco>
			<vsl_show_flg><![CDATA[<bean:write name="ofcVO" property="vsl_show_flg" filter="false" />]]></vsl_show_flg>
			<load_port_show_flg><![CDATA[<bean:write name="ofcVO" property="load_port_show_flg" filter="false" />]]></load_port_show_flg>
			<ai_an_font_size><![CDATA[<bean:write name="ofcVO" property="ai_an_font_size" filter="false" />]]></ai_an_font_size>
			<ai_an_rmk><![CDATA[<bean:write name="ofcVO" property="ai_an_rmk" filter="false" />]]></ai_an_rmk>
			<air_body><![CDATA[<bean:write name="ofcVO" property="air_body" filter="false" />]]></air_body>
			<aem_hand_info><![CDATA[<bean:write name="ofcVO" property="aem_hand_info" filter="false" />]]></aem_hand_info>
			<aeh_hand_info><![CDATA[<bean:write name="ofcVO" property="aeh_hand_info" filter="false" />]]></aeh_hand_info>
			<dflt_an_memo><![CDATA[<bean:write name="ofcVO" property="dflt_an_memo" filter="false" />]]></dflt_an_memo>
			<email_sign><![CDATA[<bean:write name="ofcVO" property="email_sign" filter="false" />]]></email_sign>
			<oper1_flg><![CDATA[<bean:write name="ofcVO" property="oper1_flg" filter="false" />]]></oper1_flg>
			<oper2_flg><![CDATA[<bean:write name="ofcVO" property="oper2_flg" filter="false" />]]></oper2_flg>
			<oper3_flg><![CDATA[<bean:write name="ofcVO" property="oper3_flg" filter="false" />]]></oper3_flg>
			<oper4_flg><![CDATA[<bean:write name="ofcVO" property="oper4_flg" filter="false" />]]></oper4_flg>
			<oper5_flg><![CDATA[<bean:write name="ofcVO" property="oper5_flg" filter="false" />]]></oper5_flg>
			<oper6_flg><![CDATA[<bean:write name="ofcVO" property="oper6_flg" filter="false" />]]></oper6_flg>
			<acc1_flg><![CDATA[<bean:write name="ofcVO" property="acc1_flg" filter="false" />]]></acc1_flg>
			<acc2_flg><![CDATA[<bean:write name="ofcVO" property="acc2_flg" filter="false" />]]></acc2_flg>
			<acc3_flg><![CDATA[<bean:write name="ofcVO" property="acc3_flg" filter="false" />]]></acc3_flg>
			<acc4_flg><![CDATA[<bean:write name="ofcVO" property="acc4_flg" filter="false" />]]></acc4_flg>
			<acc5_flg><![CDATA[<bean:write name="ofcVO" property="acc5_flg" filter="false" />]]></acc5_flg>
			<acc5_flg><![CDATA[<bean:write name="ofcVO" property="acc5_flg" filter="false" />]]></acc5_flg>
			<ai_cgor_pic_info><![CDATA[<bean:write name="ofcVO" property="ai_cgor_pic_info" filter="false" />]]></ai_cgor_pic_info>
			<oi_cgor_pic_info><![CDATA[<bean:write name="ofcVO" property="oi_cgor_pic_info" filter="false" />]]></oi_cgor_pic_info>
			<oem_pro_share><![CDATA[<bean:write name="ofcVO" property="oem_pro_share" />]]></oem_pro_share>
			<oeh_pro_share><![CDATA[<bean:write name="ofcVO" property="oeh_pro_share" />]]></oeh_pro_share>
			<oim_pro_share><![CDATA[<bean:write name="ofcVO" property="oim_pro_share" />]]></oim_pro_share>
			<oih_pro_share><![CDATA[<bean:write name="ofcVO" property="oih_pro_share" />]]></oih_pro_share>
			<aeh_pro_share><![CDATA[<bean:write name="ofcVO" property="aeh_pro_share" />]]></aeh_pro_share>
		</DATA>
	</logic:notEmpty>    
</logic:empty>
