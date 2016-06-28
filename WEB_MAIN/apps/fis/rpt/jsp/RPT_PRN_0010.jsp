<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>

<%
	String autoEmailFlag = (String)application.getAttribute("AUTO_EMAIL_FLAG");
	String autoFaxFlag = (String)application.getAttribute("AUTO_FAX_FLAG");
%>	

	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0010.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/rd/rdviewer50u.js"></script>
	
	
	<!-- HTML5 TEST -->
 	<script src="<%=CLT_PATH%>/js/rd/jquery-1.11.0.min.js"></script>
	<script src="<%=CLT_PATH%>/js/rd/crownix-viewer.min.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=CLT_PATH%>/js/css/crownix-viewer.min.css">
	
	<style>
	<!--
		.crownix-container span {white-space:pre}
	-->
	</style>
	
	<script language="javascript">
		var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
		var user_id = "<%=userInfo.getUsrid()%>";
		var user_eml = "<%=userInfo.getEml()%>";
		var user_phn = "<%=userInfo.getPhn()%>";
		var user_fax = "<%=userInfo.getFax()%>";
		var rpt_file_path = "<%=userInfo.getRpt_file_path().replaceAll("\\\\","\\\\\\\\")%>";
		var user_ofc_cnt_nm = "<%=userInfo.getOfc_eng_nm()%>";
		var user_nm = "<%=userInfo.getUser_name()%>";
		
		function setupPage(){
			
			if(_os.indexOf("Linux") != -1 || _os.indexOf("Macintosh") != -1 ) {  
		 		$("#mainTable").css("top","50px");
				loadPageHtml5();
			}else{
				if (_os.indexOf("MSIE") != -1 || _os.indexOf("Trident") != -1) {
					if(navigator.appName.indexOf("Microsoft") != -1) {
						loadPage();
					}else{	
		 				$("#mainTable").css("top","50px");
						loadPageHtml5();
					}
				} else {
					$("#mainTable").css("top","50px");
					loadPageHtml5();
				}
			}	
		}
	</script>

<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
<bean:parameter id="mailTitle" name="mailTitle" value=""/>
<bean:parameter id="mailTo" name="mailTo" value=""/>
<bean:parameter id="intg_bl_seq" name="intg_bl_seq" value=""/>

<!--  Report ==> OutLook연동 파라미터 (S) -->
<bean:parameter id="rpt_biz_tp" name="rpt_biz_tp" value=""/>
<bean:parameter id="rpt_biz_sub_tp" name="rpt_biz_sub_tp" value=""/>
<bean:parameter id="rpt_tp" name="rpt_tp" value=""/>
<bean:parameter id="rpt_trdp_cd" name="rpt_trdp_cd" value=""/>
	
<bean:parameter id="f_inv_seq" name="f_inv_seq" value=""/>
<!--  Report ==> OutLook연동 파라미터 (E) -->

<form method="post" name="frm1" onSubmit="return false;">
	<input type="hidden" name="fileName" value='<bean:write name="tmpMap" property="fileName"/>'/>
	<input type="hidden" name="rdParam" value='<bean:write name="tmpMap" property="rdParam"/>'/>
	<input type="hidden" name="title" value='<bean:write name="tmpMap" property="title"/>'/>
	<input type="hidden" name="mailTitle" value='<bean:write name="mailTitle"/>'/>
	<input type="hidden" name="mailTo" value='<bean:write name="mailTo"/>'/>
	<input type="hidden" name="intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/>

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" value='<bean:write name="rpt_biz_tp"/>'/>
	<input type="hidden" name="rpt_biz_sub_tp" value='<bean:write name="rpt_biz_sub_tp"/>'/>
	<input type="hidden" name="rpt_tp" value='<bean:write name="rpt_tp"/>'/>
	<input type="hidden" name="rpt_trdp_cd" value='<bean:write name="rpt_trdp_cd"/>'/>
	
	<!-- jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History -->
	<input type="hidden" name="f_inv_seq" value='<bean:write name="f_inv_seq"/>'/>
	<input type="hidden" name="usr_fax_no" value="<%=userInfo.getFax()%>"/>
	<input type="hidden" name="fax_no" value=''/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<input type="hidden" name="org_bl_qty" value='<logic:notEmpty name="tmpMap" property="org_bl_qty"><bean:write name="tmpMap" property="org_bl_qty"/></logic:notEmpty>'/>
	
	
	<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title">
			<span><bean:write name="tmpMap" property="title"/></span>
	   </h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_normal" onClick="doWork('Mail');"><bean:message key="Outlook"/></button>
		   <button type="button" class="btn_normal" onClick="doWork('Print');"><bean:message key="Print"/></button>
		   <button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
	   </div>
	</div>
	

	<!-- wrap_result (S) -->
<!--     <div class="wrap_result">
		<div class="opus_design_RD">
		
			<table id="mainTable" width="100%" height="98%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="left" valign="top" width="100%" height="98%"  ><script language="javascript">comRdObject('wo_rePort');</script></td>
             	</tr>
        	</table>
		</div>
	</div> -->
	
	
	 	<div style="overflow:hidden">
		<div class="wrap_result">
    <div style="padding-left:50px">
 

		<div id="mainTable"  class="layout_flex_flex" style="top:50px; left:6px; padding-left:0px; width:calc(100% - 12px); height: 100%;">
	     	<script language="javascript">comRdObject('wo_rePort');</script>
		</div>
	
	
	<iframe name="ifr_hidden" style="width:0;height:0;visibility:hidden" border=0></iframe>
	</div>
	
</form>