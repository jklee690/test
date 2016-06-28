<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0200.js"></script>
	
<%
	String ofcCd = userInfo.getOfc_cd();
	String ofcLoclNm 	= userInfo.getOfc_locl_nm();
	String usrNm 		= userInfo.getUser_name();
	String ofcEngNm 	= userInfo.getOfc_eng_nm();
	String usrId		= userInfo.getUsrid();
	String usrPhn		= userInfo.getPhn();
	String usrFax		= userInfo.getFax();
	String email 		= userInfo.getEml();
	String cnt_cd 		= userInfo.getOfc_cnt_cd();
%>
	
	<bean:parameter name="ref_no" id="ref_no" value=""/>
	<bean:parameter name="hbl_no" id="hbl_no" value=""/>
	<bean:parameter name="mbl_no" id="mbl_no" value=""/>
	<bean:parameter name="intg_bl_seq" id="intg_bl_seq" value=""/>
	<bean:parameter name="air_sea_clss_cd" id="air_sea_clss_cd" value=""/>
	<bean:parameter name="bnd_clss_cd" id="bnd_clss_cd" value=""/>
	<bean:parameter name="biz_clss_cd" id="biz_clss_cd" value=""/>
	
	<bean:define id="valMap"  	 name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	
	<script>	
	<!-- ###Profit Curr 항목### -->
	function setupPage(){
     	loadPage();
     }
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


<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd" id="f_cmd"/> 
	<!-- Report Value -->
	<input	type="hidden" name="cmd_type" id="cmd_type"/>
	<input	type="hidden" name="file_name" id="file_name"/>
	<input	type="hidden" name="rd_param" id="rd_param"/>
	<input	type="hidden" name="title" id="title"/>
	
	<input	type="hidden" name="f_ofc_cd" id="f_ofc_cd" value="<%= userInfo.getOfc_cd()%>"/>
	<input type="hidden" name="h_curr_cd" id="h_curr_cd" value="<bean:write name="ofcInfo" property="trf_cur_cd"/>"/>
	
	<!-- Report Value -->
	<input	type="hidden" name="intg_bl_seq" id="intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/>
	<input	type="hidden" name="air_sea_clss_cd" id="air_sea_clss_cd" value='<bean:write name="air_sea_clss_cd"/>'/>
	<input	type="hidden" name="bnd_clss_cd" id="bnd_clss_cd" value='<bean:write name="bnd_clss_cd"/>'/>
	<input	type="hidden" name="biz_clss_cd" id="biz_clss_cd" value='<bean:write name="biz_clss_cd"/>'/>
	
	<input	type="hidden" name="one_curr_rate_sql" id="one_curr_rate_sql" value=''/>
	
	<input	type="hidden" name="mbl_no" id="mbl_no" value='<bean:write name="mbl_no"/>'/>
	
	<!-- Report Value -->
	<input	type="hidden" name="f_usrId" id="f_usrId"  value="<%= usrId %>"/>
	<input	type="hidden" name="f_usrPhn" id="f_usrPhn" value="<%= usrPhn %>"/>
	<input	type="hidden" name="f_usrFax" id="f_usrFax" value="<%= usrFax %>"/>
	<input	type="hidden" name="f_usr_nm" id="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  id="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_cnt_cd" id="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<input	type="hidden" name="mailTitle" id="mailTitle" value=""/>
	<input	type="hidden" name="mailTo" id="mailTo" value=""/>
	<input  type="hidden" name="f_inv_seq" id="f_inv_seq" value=""/>
	<input  type="hidden" name="intg_bl_seq_tmp" id="intg_bl_seq_tmp" />
	<input	type="hidden" name="f_ofc_loc_nm" id="f_ofc_loc_nm" value="<%= ofcLoclNm %>"/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp"/>
	
	<!--  Report ==> OutLook연동 파라미터 (E) -->	
	<div class="layer_popup_title">
		<!-- 소타이틀, 대버튼 -->
		<div class="page_title_area clear">
		   <h2 class="page_title" style="padding-left: 0px"><bean:message key="Profit_Report_by_HBL"/></h2>
			   <!-- btn_div -->
			   <div class="opus_design_btn">
				   <button id="btnPrint" type="button" class="btn_accent" onclick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
				    --><button type="button" class="btn_normal" onclick="doWork('Print');"><bean:message key="Print"/></button><!-- 
				    --><button type="button" class="btn_normal" onclick="doWork('EXCEL');" name="btn_DownExcel"><bean:message key="Excel"/></button><!-- 
				    --><button type="button" class="btn_normal" onclick="doWork('MINIMIZE');" name="btn_minimize" id="btn_minimize"><bean:message key="Minimize"/></button><!-- 
				    --><button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
			   </div>
			   <!-- btn_div -->
			    <div class="location">	
				</div>
		</div>
    </div>
    <div class="layer_popup_contents">
	   <div class= "wrap_search">
		   <div class= "opus_design_inquiry">
		   	<table>
		   		<colgroup>
		   			<col width="90"/>
		   			<col width="100"/>
		   			<col width="90"/>
		   			<col width="*"/>
		   		</colgroup>
		   		<tbody>
		   			<tr>
		   				<th><bean:message key="Ref_No"/></th>
		   				<td><input name="f_ref_no" type="text" class="search_form-disable" value="<bean:write name="ref_no"/>" class="search_form" readOnly></td>
		   				<th>
		   					<span id = "hbl" style="display:none"><bean:message key="HBL_No"/></span>
							<span id = "hawb" style="display:none"><bean:message key="HAWB_No"/></span>
		   				</th>
		   				<td>
				            <input name="f_bl_no" type="text" class="search_form-disable" value="<bean:write name="hbl_no"/>" style="width:130px;" class="search_form" readOnly>
				        </td>
		   			</tr>
		   		</tbody>
		   	</table>
		  </div>
		  
		  <div class= "opus_design_inquiry" id="mainForm">
		   <div class="layout_wrap">
		   	<div class="layout_vertical_2"  style="width:300px !important;">
			   	<table >
			   		<colgroup>
			   			<col width="90"/>
			   			<col width="200"/>
			   			<col width="*"/>
			   		</colgroup>
			   		<tbody>
			   			<tr> 
				                <td><b><bean:message key="Currency"/></b></td>
				        </tr>  
				        <tr>     
				               <td colspan='3'>
		                         	<input type="radio" name="f_curr_opt" id="f_curr_multi" value="M" checked/><label for="f_curr_multi"><bean:message key="Multi_Currency"/></label>
				               </td>
				        </tr>   
				        <tr> 
				        	<td valign="top" colspan="2">
				        		<table >
							   		<colgroup>
							   			<col width="90"/>
							   			<col width="120"/>
							   			<col width="*"/>
							   		</colgroup>
							   		<tbody>
							   			<tr> 
							   				<td>
					                       		<input type="radio" name="f_curr_opt" id="f_curr_one" value="O" onClick="javascript:if(frm1.f_curr_cd.value != ''){doWork('CURR_SEARCH');}"/><label for="f_curr_one"><bean:message key="One_Currency"/></label>
							               </td>
							        	  
							          	   <td align="right"><img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"> <bean:message key="To_Currency"/></td>
					                       <td >
					                           <select name="f_curr_cd" OnChange="doWork('CURR_SEARCH');">
					                            		<bean:define id="paramCurrList"  name="valMap" property="currList"/>
														<logic:iterate id="CurrVO" name="paramCurrList">
					                            			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
					                            		</logic:iterate>
					                            	</select>                            	
					                        </td>
							   			</tr>
							   		</tbody>
							   	</table>
				        	</td>
				       </tr> 
			   		</tbody>
			   	</table>
		   	</div>
		   	<div class="layout_vertical_2" style="width:400px !important;">
		   		<table>
		   			<tr height="50px"> 
		                <td></td>
			        </tr> 
			   	</table>
		   	<div class="opus_design_grid" id="mainTable2" style="width:400px !important;">
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
			</div>
		   </div>
		   </div>
	   </div>
		   
	   <div class="wrap_result" >
			<div class="opus_design_grid" id="mainTable3">
				<script type="text/javascript">comSheetObject('sheet2');</script>
			</div>
	  </div>
	</div>
</form>