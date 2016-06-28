<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : SEE_BMD_0020GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

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
							<TD></TD>
							<TD><bean:write name="row" property="ref_no"/></TD>
							<TD><bean:write name="row" property="lnr_bkg_no"/></TD>
							<TD><bean:write name="row" property="mbl_no"/></TD>
							<TD><bean:write name="row" property="cnee_trdp_nm"/></TD>
							<TD><bean:write name="row" property="msg_sts_nm"/></TD>
							<TD><bean:write name="row" property="msg_sts"/></TD>
							<TD><bean:write name="row" property="mbl_intg_bl_seq"/></TD>
							<TD><bean:write name="row" property="lnr_trdp_cd"/></TD>
							<TD><bean:write name="row" property="un_pol_cd"/></TD>
							<TD><bean:write name="row" property="un_pod_cd"/></TD>
							<TD><bean:write name="row" property="pol_nm"/></TD>
							<TD><bean:write name="row" property="pod_nm"/></TD>
							<TD><bean:write name="row" property="pck_qty"/></TD>
							<TD><bean:write name="row" property="grs_wgt"/></TD>
							<TD><bean:write name="row" property="meas"/></TD>
							<TD><bean:write name="row" property="cntr_cnt"/></TD>
							<TD><bean:write name="row" property="no_name_cntr_cnt"/></TD>
							<TD><bean:write name="row" property="no_tpsz_cntr_cnt"/></TD>
							<TD><bean:write name="row" property="desc_txt"/></TD>
							<TD><bean:write name="row" property="shpr_pic_nm"/></TD>
							<TD><bean:write name="row" property="shpr_pic_phn"/></TD>
							<TD><bean:write name="row" property="shpr_pic_fax"/></TD>
							<TD><bean:write name="row" property="shpr_pic_eml"/></TD>
							<TD><bean:write name="row" property="cnee_pic_nm"/></TD>
							<TD><bean:write name="row" property="cnee_pic_phn"/></TD>
							<TD><bean:write name="row" property="cnee_pic_fax"/></TD>
							<TD><bean:write name="row" property="cnee_pic_eml"/></TD>
							<TD><bean:write name="row" property="ntfy_pic_nm"/></TD>
							<TD><bean:write name="row" property="ntfy_pic_phn"/></TD>
							<TD><bean:write name="row" property="ntfy_pic_fax"/></TD>
							<TD><bean:write name="row" property="ntfy_pic_eml"/></TD>
							<TD><bean:write name="row" property="carr_pic_nm"/></TD>
							<TD><bean:write name="row" property="carr_pic_phn"/></TD>
							<TD><bean:write name="row" property="carr_pic_fax"/></TD>
							<TD><bean:write name="row" property="carr_pic_eml"/></TD>							
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
