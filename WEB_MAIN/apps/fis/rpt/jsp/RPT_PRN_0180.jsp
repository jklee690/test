<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0180.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/web/script/DateFormat.js"></script>
	
<%
	String ofcCd = userInfo.getOfc_cd();

	String ofcLoclNm 	= userInfo.getOfc_locl_nm();
	String usrNm 		= userInfo.getUser_name();
	String ofcEngNm 	= userInfo.getOfc_eng_nm();
	String usrId		= userInfo.getUsrid();
	String usrPhn		= userInfo.getPhn();
	String usrFax		= userInfo.getFax();
	String email 		= userInfo.getEml();
	String eml_con      = userInfo.getEml_con();
	String cnt_cd 		= userInfo.getOfc_cnt_cd();
%>
	
	<bean:parameter name="ref_no" id="ref_no"/>
	<bean:parameter name="mbl_no" id="mbl_no"/>
	<bean:parameter name="intg_bl_seq" id="intg_bl_seq"/>
	<bean:parameter name="air_sea_clss_cd" id="air_sea_clss_cd"/>
	<bean:parameter name="bnd_clss_cd" id="bnd_clss_cd"/>
	<bean:parameter name="biz_clss_cd" id="biz_clss_cd"/>
	
	<bean:define id="valMap"  	 name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	<script type="text/javascript">
		var prn_ofc_cd = "<%=(String)application.getAttribute("PRNT_OFC_CD")%>";
	</script>
	
	<script>	
	<!-- ###Profit Curr 항목### -->
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
	
	function setupPage(){
		loadPage();
    }
	</script>	
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	<!-- Report Value -->
	<input	type="hidden" name="cmd_type"/>
	<input	type="hidden" name="file_name"/>
	<input	type="hidden" name="rd_param"/>
	<input	type="hidden" name="title"/>
	
	<input	type="hidden" name="f_ofc_cd" value="<%= userInfo.getOfc_cd()%>"/>
	<input  type="hidden" name="h_curr_cd" value="<bean:write name="ofcInfo" property="trf_cur_cd"/>"/>
	
	<!-- Report Value -->
	<input	type="hidden" name="intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/>
	<input	type="hidden" name="air_sea_clss_cd" value='<bean:write name="air_sea_clss_cd"/>'/>
	<input	type="hidden" name="bnd_clss_cd" value='<bean:write name="bnd_clss_cd"/>'/>
	<input	type="hidden" name="biz_clss_cd" value='<bean:write name="biz_clss_cd"/>'/>
	
	<input	type="hidden" name="one_curr_rate_sql" value=''/>
	
	<!-- #18793, [GPL]Profit Report jsjang 2013.11.8 -->
	<!-- Report Value -->
	<input	type="hidden" name="f_usrId"  value="<%= usrId %>"/>
	<input	type="hidden" name="f_usrPhn" value="<%= usrPhn %>"/>
	<input	type="hidden" name="f_usrFax" value="<%= usrFax %>"/>
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  value="<%= email %>"/>
	<input	type="hidden" name="f_eml_content"  value="<%= eml_con %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	
	<input	type="hidden" name="mailTitle" value=""/>
	<input	type="hidden" name="mailTo" value=""/>
	<input  type="hidden" name="f_inv_seq" value=""/>
	<input  type="hidden" name="intg_bl_seq_tmp" />
	<input	type="hidden" name="f_ofc_loc_nm" value="<%= ofcLoclNm %>"/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>

	<!--  Report ==> OutLook연동 파라미터 (E) -->	
	<div class="layer_popup_title">	
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span><bean:message key="Profit_Report"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" style="display:none;" id="btnBlock" btnAuth="BLOCK" onClick="doWork('BLOCK')"><bean:message key="Block"/></button><!-- 
			--><button type="button" class="btn_normal" id="btnPrint" onclick="doWork('Print')"><bean:message key="Print"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('MINIMIZE')" name="btn_minimize" id="btn_minimize"><bean:message key="Minimize"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_search">	
		   	<div class="opus_design_inquiry" style="width: 1080px;">
		   		<table>
			        <tr>
			            <th width="66px"><bean:message key="Ref_No"/></th>
			            <td width="110px"><input name="f_ref_no" type="text" class="search_form-disable" value="<bean:write name="ref_no"/>" class="search_form" readOnly></td>
			            <th width="90px">
			            	<span id = "mbl" style="display:none"><bean:message key="MBL_No"/></span>
							<span id = "mawb" style="display:none"><bean:message key="MAWB_No"/></span>
			            </th>
			            <td><input name="f_bl_no" type="text" class="search_form-disable" value="<bean:write name="mbl_no"/>" style="width:130px;" class="search_form" readOnly></td>           
			        </tr>
			    </table>
		   	</div>
	   		<div id="mainForm" class="opus_design_inquiry" style="width: 1080px;">
	   			<div class="layout_wrap">
		   			<div class="layout_vertical_2" style="width:650px !important;">
			   			<table>
					      	<tr>
					        	<td align="left" valign="top">
						            <table>
						           		<tr> 
							                <td width="100%" colspan='2'><b><bean:message key="Print_Option"/></b></td>
							           	</tr>  
							           <tr> 
							               <td width="50px"><input type="radio" name="f_prn_opt" id="f_opt_dtl" value="D" onClick="prn_opt_sheet()"><label for="f_opt_dtl">Detail</label></td>
							               <td><input type="radio" name="f_prn_opt" id="f_opt_sum" value="S" onClick="prn_opt_sheet()"><label for="f_opt_sum">Summary</label></td>
							           </tr>    
						            </table>
					        	</td>
					        	<td align="left">
						            <table>
						           		<tr> 
							                <td width="100%" colspan='2'><b><bean:message key="Currency"/></b></td>
							           </tr>  
							           <tr>     
							               <td colspan='2'><input type="radio" name="f_curr_opt" id="f_curr_multi" value="M" checked/> <bean:message key="Multi_Currency"/></td>
							          </tr>   
							           <tr> 
							               <td width="90px" valign="top"><input type="radio" name="f_curr_opt" id="f_curr_one" value="O" onClick="javascript:if(frm1.f_curr_cd.value != ''){doWork('CURR_SEARCH');}"/> <bean:message key="One_Currency"/></td>
							          	   <td>
							          		<table>
							          			<tr>
								          			<th width="80px" valign="top"><img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><bean:message key="To_Currency"/></th>
						                            <td valign="top">&nbsp;&nbsp;
						                            	<bean:define id="paramCurrList"  name="valMap" property="currList"/>
											            <select name="f_curr_cd" OnChange="doWork('CURR_SEARCH');">
															<logic:iterate id="CurrVO" name="paramCurrList">
						                            			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
						                            		</logic:iterate>
						                            	</select>                     	
						                            </td>
							          			</tr>
							          		</table>
							          	</td>		               
							          </tr> 
						            </table>
					        	</td>
					      	</tr>
					    </table>
					</div>
					<div class="layout_vertical_2" style="width:380px !important;">
			   			<table>
					      	<tr height="50px">
					        	<td></td>
					       	</tr>
					    </table>
					    <div class="opus_design_grid" id="mainTable" style="width: 320px;">
							<script language="javascript">comSheetObject('sheet1');</script>
						</div>
					</div>
				</div>
	   		</div>
	   	</div>
	   	<div class="wrap_result" >
			<div class="opus_design_grid" id="mainTable2" style="display:none">
				<script language="javascript">comSheetObject('sheet2');</script>
			</div>
			<div class="opus_design_grid" id="mainTable3" style="display:block">
				<script language="javascript">comSheetObject('sheet3');</script>
			</div>
	   	</div>
	   	<iframe name="ifrm1" src="" frameborder="0" scrolling="no" width="200" height="0"></iframe>
	</div>
</form>

<form name="frm2" method="POST" action="./ACC_SLP_0080GS.clt">

	<input type="hidden" name="bl_intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/>
	<input type="hidden" name="inv_seq" value=""/>
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="search_opt" value=""/>
	<input type="hidden" name="s_block_satus" value=""/>
	
	<input type="hidden" name="bl_ibflag" value="U"/>

</form>
<script type="text/javascript">
<%
	if(roleBtnVO != null){
%>
		doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
<%
	}
%>
</script>
