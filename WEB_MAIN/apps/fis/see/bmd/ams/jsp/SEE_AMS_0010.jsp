<%--
=========================================================
*@FileName   : SEE_AMS_0010.jsp
*@FileTitle  : SEE AMS Search 
*@Description: SEE AMS Search 
*@author     : Chungrue
*@version    : 
*@since      : 

*@Change history:
*@author2     : Tuan.Chau
*@version    : 2.0 - 2014/06/04
*@since      : 2014/06/04
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEE_BMD_MSG.js"></script>
	<script type="text/javascript" src="./apps/fis/see/bmd/ams/script/SEE_AMS_0010.js"></script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm 	= userInfo.getOfc_eng_nm();
		String usrNm 		= userInfo.getUser_name();
		String phn 			= userInfo.getPhn();
		String fax 			= userInfo.getFax();
		String email 		= userInfo.getEml();
	%>
<script>
function setupPage(){
	initFinish();
	loadPage();
}
</script>
	<form name="frm1" method="POST" action="./SEE_AMS_0010.clt">
	<input type="hidden" name="f_cmd">
    <input type="hidden" name="f_CurPage"> 
    
	<!-- ------------------------------------------------------ -->
	<!-- 세션 유저 정보    -->
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_phn" value="<%= phn %>"/>
	<input	type="hidden" name="f_fax" value="<%= fax %>"/>
	<input	type="hidden" name="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	<!-- ------------------------------------------------------ -->
    
    <!-- Report Value -->
	<input type="hidden" name="title" value="">
	<input type="hidden" name="file_name" value="">
	<input type="hidden" name="rd_param" value="">
	
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">

	<input type="hidden" name="intg_bl_seq" value="">
	<input type="hidden" name="rlt_intg_bl_seq" value="">
	<input type="hidden" name="s_intg_bl_seq" value="">
	<input type="hidden" name="master_bl_no"  value=""> 
	<input type="hidden" name="house_bl_no"   value=""> 
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="SEE_AMS_0010.clt"/>
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="document.forms[0].f_CurPage.value='';doWork('SEARCHLIST')"><bean:message key="Search"/></button>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	
    <!-- 소타이틀, 대버튼 -->
    <div class="wrap_search">	
		<div class="opus_design_inquiry">
            <table>
            	<colgroup>
            		<col width="60">
            		<col width="240">
            		<col width="70">
            		<col width="225">
            		<col width="90">
            		<col width="*">
            	</colgroup>
            	<tbody>
                 <tr>
                      <th><bean:message key="ETD"/></th>
                      <td><!-- 
                       --><input style="width: 70px;"  type="text" id="etd_strdt" name="etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.etd_enddt);firCalFlag=false;" size='11' maxlength="10" ><!-- 
						 --><span class="dash">~</span><!--
						 --><input style="width: 70px;" type="text" id="etd_enddt" name="etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.etd_strdt, this);firCalFlag=false;" size='11' maxlength="10" ><!--
						 --><button type="button" onclick="doDisplay('DATE11', frm1);" class="calendar" tabindex="-1"></button> 
					 </td>
			          <th><bean:message key="ETA"/></th>
			          <td><!--
						--><input style="width: 70px;" type="text" id="eta_strdt" name="eta_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.eta_enddt);firCalFlag=false;" size='11' maxlength="10" ><!-- 
						--><span class="dash">~</span><!--
						--><input style="width: 70px;" type="text" id="eta_enddt" name="eta_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.eta_strdt, this);firCalFlag=false;" size='11' maxlength="10" ><!--
						--><button type="button" onclick="doDisplay('DATE21', frm1);" class="calendar" tabindex="-1"></button>
					 </td>
                       <th><bean:message key="Vessel_Voyage"/></th>
                       <td><!-- 
                                --><input type="text" name="f_trnk_vsl"  dataformat="excepthan" style="ime-mode isabled;width:150px;" onkeydown="entSearch();"/><!--
                                --><input type="text" name="f_trnk_voy"  dataformat="excepthan" style="ime-mode isabled;width:80px;" onkeydown="entSearch();"/>
                       </td>
                     </tr>
                     <tr>
                     	<th><bean:message key="POD"/></th>
                         <td><!-- 
                         	   --><input type="text" name="f_pod_cd" maxlength="5" value='' onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="codeNameAction('location_pod',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:60px;"/><!--
                              --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('POD_LOCATION_POPLIST')" ></button><!--
                              --><input type="text" name="f_pod_nm" maxlength="50" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pod_nm.value);}"/>
                         </td>
                         <th><bean:message key="HBL_No"/></th>
                         <td><!--
                               --><input type="text" name="f_hbl_no" maxlength="40"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:195px;" onkeydown="entSearch();"/>
                         </td>
                         <th><bean:message key="AMS_File_No"/></th>
                         <td><!-- 
                                 --><input type="text" maxlength="40" name="f_ams_no"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" onkeydown="entSearch();"/>
                         </td>
					</tr>
					<tr>
                      	<th><bean:message key="BL_Type"/></th>
                        <td><!-- 
                            --><select name="f_bl_type" style="width:223px;"><!-- 
                           	 --><bean:define id="blTypeList" name="valMap" property="blTypeList"/><!-- 
								 --><logic:iterate id="blTypeVO" name="blTypeList"><!-- 
                      			 --><option value='<bean:write name="blTypeVO" property="cd_val"/>'><bean:write name="blTypeVO" property="cd_nm"/></option><!-- 
                       		 --></logic:iterate><!-- 
                       	   --></select>
                        </td>
                        <th><bean:message key="Transmit"/></th>
                        <td><!-- 
                              --><select name="f_snd_type" style="width:195px"><!-- 
                          		 --><option value="">ALL</option><!-- 
                          		 --><option value="Y">YES</option><!-- 
                          		 --><option value="N">NO</option><!-- 
                          	 --></select>
                        </td>
					</tr>
				</tbody>
          </table>
	   </div>
	</div>
    <!-- 검색 -->
    <div class="wrap_result">
    	<h3 class="title_design"><bean:message key="AMS_Send_List"/></h3>
    	<div class="opus_design_grid">
	    	<script type="text/javascript">comSheetObject('sheet1');</script>
	    </div>
	    
    	<h3 class="title_design"><bean:message key="Result_Information"/></h3>
    	<div class="opus_design_grid">
	    	<script type="text/javascript">comSheetObject('sheet2');</script>
	    </div>
    </div>
    </form>
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
	    
<%@page import="java.net.URLEncoder"%>