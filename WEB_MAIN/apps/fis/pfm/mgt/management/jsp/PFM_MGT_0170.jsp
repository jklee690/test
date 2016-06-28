<%--
=========================================================
*@FileName   : PFM_MGT_0170.jsp
*@FileTitle  : Total Volume & Profit by Month
*@Description: Total Volume & Profit by Month
*@author     : CyberLogitec
*@version    : 1.0 - 2013/04/11
*@since      : 2013/04/11

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<%
	//WMS ACCOUNT LKH 2015.01.20
	String wmsUseFlag = (String)application.getAttribute("WMS_USE_FLAG");
	if(wmsUseFlag == null){wmsUseFlag = "N";} 
%>			
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js"></script>
	<script language="javascript" src="./apps/fis/pfm/mgt/management/script/PFM_MGT_0170.js" />
	
	
	<bean:define id="valMap"     name="EventResponse" 	property="mapVal"/>
	<bean:define id="ofcInfo"    name="valMap" 			property="ofcInfo"/>
	<bean:define id="ofcCurr"    name="valMap" 			property="ofcInfo"/>
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
		
		//Batch Performance LKH 2015.01.28
		String usrId		= userInfo.getUsrid();
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>
	
	<script>
		function setSelect(){
			var formObj = document.frm1;
		}
		
		var usrNm = "<%= usrNm %>";
		
		function setupPage()
        {
			loadPage();
			setSelect();
        }
	</script>
<form name="frm1" method="POST" action="./PFM_MGT_0170.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	
	<!-- Batch Performance LKH 2015.01.28 -->
	<input	type="hidden" name="f_usrId" value="<%= usrId %>"/>
	
	<input type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input type="hidden" name="f_email" value="<%= email %>"/>
	<input type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input type="hidden" name="f_ofc_locl_nm" value="<%= ofcLoclNm %>"/>
	<input type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	<input type="hidden" name="f_curr_cd" value="<bean:write name="ofcCurr" property="trf_cur_cd"/>"/>
	<input type="hidden" name="s_prd_strdt" value=""/>
	<input type="hidden" name="s_prd_enddt" value=""/>
	<input type="hidden" name="s_air_sea_clss_cd" value=""/>
	<input type="hidden" name="s_bnd_clss_cd" value=""/>
	<input type="hidden" name=one_curr_rate_sql value=""/>
	<input type="hidden" name="sqlOpt" value=""/>
	<input type="hidden" name="sqlOpt2" value=""/>
	<input type="hidden" name="sqlOpt3" value=""/>
	<input type="hidden" name="s_oth_flg" value=""/>
	<!-- WMS ACCOUNT LKH 2015.01.20 -->
	<input type="hidden" name="s_wms_flg" value=""/>
	<input type="hidden" name="s_fms_flg" value=""/>
	<input type="hidden" name="s_fms_oth_flg" value=""/>
	<input type="hidden" name="s_uncheck_flg" value=""/>
	
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onClick="doWork('SEARCH')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal" onClick="doWork('CLEAR')" style="cursor:hand; display:none;" btnAuth="CLEAR"><bean:message key="Clear"/></button><!-- 
		--><button type="button" class="btn_normal" onClick="doWork('EXCEL')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" name="btn_DownExcel"><bean:message key="Excel"/></button> 
		<!--<button type="button" class="btn_normal" onClick="doWork('MINIMIZE')" style="cursor:hand; display:none;" btnAuth="MINIMIZE"><bean:message key="Minimize"/></button>-->
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	
	<div class="wrap_search" id="mainForm" style="height: 155px">	
		<div class="layout_wrap">
			<div class="layout_flex_fixed" style="float: left !important;width: 450px;">
				<div class="opus_design_inquiry">
					<table>
						<colgroup>
					        	<col width="80">
					        	<col width="120">
					        	<col width="120">
					        	<col width="*">
					   </colgroup>
				        <tbody>
			      			<tr>
			      				<th><bean:message key="Department"/></th>
			                	<td><input name="s_dptm_oe_flg" id="s_dptm_oe_flg" type="checkbox"  value="SO"  onClick = "doWork('CURR_SEARCH');" checked ><label for="s_dptm_oe_flg">Ocean Export</label></td>
				                <!-- WMS ACCOUNT LKH 2015.01.20 -->
				                <td><input name="s_dptm_ae_flg" id="s_dptm_ae_flg" type="checkbox" value="AO" onClick = "doWork('CURR_SEARCH');"><label for="s_dptm_ae_flg">Air Export</label></td>
				                <td><input name="s_dptm_wm_flg" id="s_dptm_wm_flg" type="checkbox" value="W" onClick = "doWork('CURR_SEARCH');" style="display:<%="Y".equals(wmsUseFlag)?"inline":"none"%>;">
				                	<label for="s_dptm_wm_flg" style="display:<%="Y".equals(wmsUseFlag)?"inline":"none"%>;"><bean:message key="Warehouse"/></label>
				                </td>
			      			</tr>
			      			<tr>
			      				<td></td>
			               		<td><input name="s_dptm_oi_flg" id="s_dptm_oi_flg" type="checkbox" value="SI" onClick = "doWork('CURR_SEARCH');" checked><label for="s_dptm_oi_flg">Ocean Import</label></td>
				                <td><input name="s_dptm_ai_flg" id="s_dptm_ai_flg" type="checkbox" value="AI" onClick = "doWork('CURR_SEARCH');"><label for="s_dptm_ai_flg">Air Import</label></td>
				                <td><input name="s_dptm_ot_flg" id="s_dptm_ot_flg" type="checkbox" value="O" onClick = "doWork('CURR_SEARCH');"><label for="s_dptm_ot_flg">Other</label></td>
			      			</tr>
			      			<tr>
			      				<th>As Of</th>
			               		<td colspan="3">
									<select required name="s_dt_clss_cd" style="width:150px;" OnChange="doWork('CURR_SEARCH');">
										<option value="PDT"><bean:message key="Posting_Date"/></option>	
										<option value="ETD">Port of Loading ETD</option>
									    <option value="ETA">Port of Discharging ETA</option>
									    <option value="MBL">MBL Create Date</option>
									</select><!-- 
								--><input required type="text" name="s_as_of_dt" onkeyPress="onlyNumberCheck();" onKeyUp="onlyNumberCheck();" onblur ="isValidMMYYYY(this);initFinish(this.value);" onClick="removeSeparator(this);" size='6' maxlength="6" class="search_form" OnChange="doWork('CURR_SEARCH');"><!-- 
		                        --><button type="button" class="calendar ir" id="s_prd_dt_cal" onclick="doDisplay('DATE1', frm1);"></button>
								</td>
			      			</tr>
			      			<tr>
			      				<th>Office</th>
			               		<td colspan="3">
									<bean:define id="oficeList" name="valMap" property="ofcList"/>
									<select name="s_ofc_cd" style="width:150px;" OnChange="doWork('CURR_SEARCH');"/>
										<bean:size id="len" name="oficeList" />
										<logic:greaterThan name="len" value="1">
											<option value=''>ALL</option>
										</logic:greaterThan>
										<logic:iterate id="ofcVO" name="oficeList">
										   	<logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
				                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                         	</logic:equal>
				                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
				                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                         	</logic:notEqual>
										</logic:iterate>
									</select>
								</td>
			      			</tr>
			      			<tr>
			      				<th>Profit</th>
			               		<td>
									<input name="s_vat_flg" id="s_vat_flg" type="checkbox" value ="VAT" onClick = "" checked ><label for="s_vat_flg"><bean:message key="Include_VAT"/></label> 
								</td>
			               		<td>
		                 			<input name="s_tax_flg" id="s_tax_flg" type="checkbox" value ="TAX" onClick = "" ><label for="s_tax_flg"><bean:message key="Include_Duty_Tax"/></label>
								</td>
			      			</tr>
		      			</tbody>
		      		</table>
		      	</div>
			</div>
			<div class="layout_flex_flex" style="padding-left: 458px;">
				<div class="opus_design_inquiry">
					 <table>	
						<colgroup>
					        	<col width="90px">
					        	<col width="*">
					   </colgroup>
				        <tbody>   
				             <tr>
		                    	<td><h3 class="title_design"><bean:message key="To_Currency"/></h3></td>
		                    	<td>
		                    		<select name= "s_curr_cd" OnChange="doWork('CURR_SEARCH');">
					          			<bean:define id="paramCurrList"  name="valMap" property="currList"/>
										<logic:iterate id="CurrVO" name="paramCurrList">
					          			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
					          			</logic:iterate>
					         		</select>  
		                    	</td>
	                    	</tr>
	                    </tbody>
	                </table>
                </div>
         		<div class="opus_design_grid" style="width: 325px;">
         			<script language="javascript">comSheetObject('sheet1');</script>
         		</div>
			</div>
		</div>
	</div>
	<!-- wrap_result(S) -->
	<div class="wrap_result">
		<div class="opus_design_inquiry">
			<script language="javascript">comSheetObject('sheet2');</script>
		</div>
	</div>
</form>
<form name="frm2">
  	<input type="hidden" name="f2_curr_cd" value="<bean:write name="ofcCurr" property="trf_cur_cd"/>"/>
	<input type="hidden" name="f2_sys_ofc_cd" value="<bean:write name="valMap" property="sysOfcCd"/>"/>
</form>
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	