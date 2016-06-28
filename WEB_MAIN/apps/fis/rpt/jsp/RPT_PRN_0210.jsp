<%--
=========================================================
*@FileName   : RPT_PRN_0210.jsp
*@FileTitle  : CMM
*@Description: package search pop
*@author     : 
*@version    : 
*@since      : 

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/17
*@since      : 2014/07/17
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0210.js"></script>
	
<%
	String ofcCd = userInfo.getOfc_cd();
    String usrId = userInfo.getUsrid();
%>
	
	<bean:parameter name="ref_no" id="ref_no"/>
	<bean:parameter name="oth_seq" id="oth_seq"/>
	<bean:parameter name="air_sea_clss_cd" id="air_sea_clss_cd"/>
	<bean:parameter name="bnd_clss_cd" id="bnd_clss_cd"/>
	<bean:parameter name="biz_clss_cd" id="biz_clss_cd"/>
	
	<bean:define id="valMap"  	 name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	<script>	
	<!-- ###Profit Curr 항목### -->
	var GLO_USR_ID = "<%=usrId%>";
	var PROFITCURR = '';
	<logic:notEmpty name="valMap" property="profitCurrList">
	<% boolean isBegin = false; %>
	<bean:define id="paramProfitCurrList"  name="valMap" property="profitCurrList"/>
    <logic:iterate id="CurrVO" name="paramProfitCurrList">
	<% if(isBegin){ %>
    	 PROFITCURR+= '|';
    <% }else{
    	 isBegin = true;
       } %>
    	PROFITCURR+= '<bean:write name="CurrVO" property="curr_cd"/>';
	</logic:iterate>
	</logic:notEmpty>
	
	
	var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
	

	</script>	
	
<script type="text/javascript">
<!--
function setupPage() {
	loadPage();
}
//-->
var prn_ofc_cd = "<%=(String)application.getAttribute("PRNT_OFC_CD")%>";
</script>
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	<!-- Report Value -->
	<input	type="hidden" name="cmd_type"/>
	<input	type="hidden" name="file_name"/>
	<input	type="hidden" name="rd_param"/>
	<input	type="hidden" name="title"/>
	
	<input	type="hidden" name="f_ofc_cd" value="<%= userInfo.getOfc_cd()%>"/>
	<input type="hidden" name="h_curr_cd" value="<bean:write name="ofcInfo" property="trf_cur_cd"/>"/>
	
	<!-- Report Value -->
	<input	type="hidden" name="oth_seq" value='<bean:write name="oth_seq"/>'/>
	<input	type="hidden" name="air_sea_clss_cd" value='<bean:write name="air_sea_clss_cd"/>'/>
	<input	type="hidden" name="bnd_clss_cd" value='<bean:write name="bnd_clss_cd"/>'/>
	<input	type="hidden" name="biz_clss_cd" value='<bean:write name="biz_clss_cd"/>'/>
	<div class="layer_popup_title">
		<div class="page_title_area clear" style="width:605px;">
			<h2 class="page_title"><span><bean:message key="Profit_Report"/></span></h2>
			<div class="opus_design_btn"><!--
			--><button type="button" class="btn_accent" onclick="doWork('Print')" id="btnPrint"><bean:message key="Print"/></button><!--
			--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_search">
			<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="100px"></col>
					<col width="100px"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
				<tr><!-- WMS ACCOUNT LKH 2015.01.20 -->
					<th width="100px"><logic:equal name="air_sea_clss_cd" value="W"><bean:message key="WMS_Filing_No"/></logic:equal>
						<logic:notEqual name="air_sea_clss_cd" value="W"><bean:message key="Other_Reference_No"/></logic:notEqual></th>
		            <td  width="100px"><input name="f_ref_no" type="text" class="search_form-disable" value="<bean:write name="ref_no"/>" class="search_form" readOnly></td>
		            <td></td>
		        </tr>
	           </tbody>
	          </table> 
	          </div>
		</div>
		 
		<div class="wrap_result" style="width:610px;">
			<table>
				<colgroup>
					<col width="100px"></col>
					<col width="100px"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
				<tr>
		            <th colspan="2" style="text-align: left; padding-left: 10px;"><bean:message key="Print_Option"/></th>
		        </tr>
		        <tr> 
	               <td><input type="radio" name="f_prn_opt" id="f_opt_dtl" value="D" ><label for="f_opt_dtl">Detail</label></td>
	               <td><input type="radio" name="f_prn_opt" id="f_opt_sum" value="S" ><label for="f_opt_sum">Summary</label></td>
	               <td></td>
	           </tr> 
	           <tr> 
	                <th colspan='2'  style="text-align: left; padding-left: 10px;"><bean:message key="Currency"/></th>
	                <td></td>
	           </tr>  
	           <tr>     
	               <td colspan='2'><input type="radio" name="f_curr_opt" id="f_curr_multi" value="M" checked/> <bean:message key="Multi_Currency"/></td>
	               <td></td>
	          </tr>   
	           <tr> 
	            	<td><input type="radio" name="f_curr_opt" id="f_curr_one" value="O" onClick="javascript:if(frm1.f_curr_cd.value != ''){doWork('CURR_SEARCH');}"/> <bean:message key="One_Currency"/></td>
	      			<th><img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><bean:message key="To_Currency"/></th>
	                <td>
	           		<select name="f_curr_cd" OnChange="doWork('CURR_SEARCH');">
	                <bean:define id="paramCurrList"  name="valMap" property="currList"/>
					<logic:iterate id="CurrVO" name="paramCurrList">
	                <option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
	                </logic:iterate>
	                </select>                            	
	                </td>
	      	  </tr>
	      	  <tr height="5px"></tr>
	      	  </tbody>
	      </table>
	      <div><script language="javascript">comSheetObject('sheet1');</script></div>
		</div>
	</div>
</form>
