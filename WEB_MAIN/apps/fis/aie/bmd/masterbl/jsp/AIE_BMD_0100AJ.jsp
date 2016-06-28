<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIE_BMD_0100AJ.jsp
*@FileTitle  : Document Package(Air Export MBL)
*@Description: Document Package(Air Export MBL)
*@author     : Hoang.Pham - Cyberlogitec
*@version    : 1.0 - 09/12/2014
*@since      : 09/12/2014
*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
        <bean:define id="mblVO" name="EventResponse" property="objVal"/>
        <bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
		<DATA>
			<intg_bl_seq><![CDATA[<bean:write name="mblVO" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<ref_ofc_cd><![CDATA[<bean:write name="mblVO" property="ref_ofc_cd" filter="false" />]]></ref_ofc_cd>
			<ref_ofc_eng_nm><![CDATA[<bean:write name="mblVO" property="ref_ofc_eng_nm" filter="false" />]]></ref_ofc_eng_nm>
			<ref_ofc_cnt_cd><![CDATA[<bean:write name="mblVO" property="ref_ofc_cnt_cd" filter="false" />]]></ref_ofc_cnt_cd>
			<cmc_inv_flg><![CDATA[<bean:write name="mblVO" property="cmc_inv_flg" filter="false" />]]></cmc_inv_flg>
			<pck_inv_flg><![CDATA[<bean:write name="mblVO" property="pck_inv_flg" filter="false" />]]></pck_inv_flg>
			<cr_db_flg><![CDATA[<bean:write name="mblVO" property="cr_db_flg" filter="false" />]]></cr_db_flg>
			<hbl_flg><![CDATA[<bean:write name="mblVO" property="hbl_flg" filter="false" />]]></hbl_flg>
			<agt_trdp_cd><![CDATA[<bean:write name="mblVO" property="agt_trdp_cd" filter="false" />]]></agt_trdp_cd>
			<bl_no><![CDATA[<bean:write name="mblVO" property="bl_no" filter="false" />]]></bl_no>
			<agt_info><![CDATA[<bean:write name="mblVO" property="agt_info" filter="false" />]]></agt_info>
			<ae_hbl_form><![CDATA[<bean:write name="tmpMap" property="ae_hbl_form" filter="false" />]]></ae_hbl_form>
		</DATA>
	</logic:notEmpty>    
</logic:empty>