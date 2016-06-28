<%--
=========================================================
*@FileName   : SEE_AMS_0020.jsp
*@FileTitle  : AMS SEND(sea)
*@Description: AMS SEND(sea)
*@author     : Chungrue
*@version    : 1.0 - 2012/09/10
*@since      : 2012/09/10

*@Change history: 
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />

	<script language="javascript" src="./apps/fis/see/bmd/ams/script/SEE_AMS_0020.js"></script>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/SAL_TFM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/MDM_MCM_MSG.js"></script>
	
	
	<script language="JavaScript">
	function goTabSelect(isNumSep) {
		var tabObjs = document.getElementsByName('tabLayer');

	    if(isNumSep=='01') {
			tabObjs[0].style.display = 'inline';
	        tabObjs[1].style.display = 'none';
	    }else if(isNumSep=='02') {
			tabObjs[0].style.display = 'none';
	        tabObjs[1].style.display = 'inline';
	    }else if (isNumSep=='03') {
	        tabObjs[0].style.display = 'none';
	        tabObjs[1].style.display = 'none';
		}
  	}

  	function openOrder(cF,type){
	    var param = "?openerForm=goals&openerType="+type+"&openerCodeField="+cF;
	    window.open("/cupfmsWeb/cup/common/pop/COM_ORDER_01.jsp"+param,"search","height=550,width=450,scrollbars=yes");  
  	}

  	function openLocation(cF,nF, type){
	    var param = "?openerForm=goals&openerType="+type+"&openerCodeField="+cF+"&openerNameField="+nF;
	    window.open("/cupfmsWeb/cup/common/pop/COM_LOCATION_01.jsp"+param,"search","height=550,width=450,scrollbars=yes");  
  	}
	
  	var user_ofc_cd = "<%=userInfo.getOfc_cd()%>";
  	
  	function setupPage(){
    	loadPage();
    }
	</script>
	
	<bean:define id="amsVO" name="EventResponse" property="objVal"/>
	
	<form name="frm1" method="POST" action="./AIE_AMS_0020.clt">
		<input type="hidden" name="f_cmd"/> 
		<input type="hidden" name="f_CurPage"/>
		<input type="hidden" name="t_sls_ofc_cd" value="<%= userInfo.getOfc_cd() %>"/>
		<input type="hidden" name="t_sls_ofc_nm" value="<%= userInfo.getOfc_eng_nm() %>"/>
		<input type="hidden" name="t_sls_usrid" value="<%= userInfo.getUsrid() %>"/>
		<input type="hidden" name="t_sls_usrnm" value="<%= userInfo.getUser_name() %>"/>
		
		<input type="hidden" name="f_intg_bl_seq" value="<bean:write name="amsVO" property="intg_bl_seq"/>"/>
		<input type="hidden" name="f_mbl_no" value="<bean:write name="amsVO" property="mbl_no"/>"/>
		<input type="hidden" name="f_etd_dt_tm" value="<bean:write name="amsVO" property="etd_dt_tm"/>"/>
		<input type="hidden" name="f_eta_dt_tm" value="<bean:write name="amsVO" property="eta_dt_tm"/>"/>
		
		<input type="hidden" name="f_cntr_list_seq" value=""/>
		
		<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
		<input type="hidden" name="pageurl" id="pageurl" value="SEE_AMS_0020.clt"/>
	 <!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn"><!--
	   --><button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST01')"><bean:message key="Search"/></button><!--
	   --><button type="button" class="btn_normal" style="display:none;" btnAuth="LIST" onclick="doWork('LIST')"><bean:message key="List"/></button><!--
	   --><button type="button" class="btn_normal" style="display:none;" btnAuth="AMS_SEND" onclick="doWork('SEND')"><bean:message key="AMS_Send"/></button>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<!-- wrap_search (S) -->
	<div class="wrap_search_tab">	
		<div class="opus_design_inquiry">
			<h3 class="title_design"><bean:message key="Vessel_Information"/></h3>
			<table>
				<colgroup>
					<col width="70">
					<col width="200">
					<col width="80">
					<col width="230">
					<col width="125">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Vessel"/></th>
	                    <td><!-- 
	                     --><input type="text" name="f_vsl_nm"  value="<bean:write name="amsVO" property="trnk_vsl_nm"/>" style="width:120px" class="search_form"  /><!-- 
	                     --><input type="text" name="f_voy_cd"  value="<bean:write name="amsVO" property="trnk_voy"/>" style="width:60px" class="search_form"  /><!-- 
	                     --><input type="hidden" name="f_vsl_cd"  value="<bean:write name="amsVO" property="vsl_cd"/>" /></td>
						<th><bean:message key="Nation"/></th>
	                    <td><input type="text" name="f_cnt_cd" value="<bean:write name="amsVO" property="cnt_cd"/>"  dataformat="excepthan" style="ime-mode:disabled;width:60px;text-transform:uppercase;" onblur="strToUpper(this)"  class="search_form" maxlength="2"></td>
						<th><bean:message key="SNP_Code"/></th>
	                    <td><input type="text" name="f_snp_cd" value="" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-transform:uppercase;" class="search_form" onBlur="strToUpper(this);setSnpCd(this.value)" maxlength="4"></td>
					</tr>
					<tr>
						<th><bean:message key="POL"/></th>
	                    <td><!-- 
	                     --><input type="text" name="f_pol_cd"  value="<bean:write name="amsVO" property="pol_cd"/>" style="width:60px" class="search_form"  /><!-- 
	                     --><input type="text" name="f_pol_nm"  value="<bean:write name="amsVO" property="pol_nm"/>" style="width:120px" class="search_form"  /><!-- 
	                     --><input type="hidden" name="f_ams_pol_cd"  value="<bean:write name="amsVO" property="ams_pol_cd"/>" ></td>
						<th><bean:message key="POD"/></th>
	                    <td><!-- 
	                     --><input type="text" name="f_pod_cd" maxlength="5" value="<bean:write name="amsVO" property="pod_cd"/>" style="width:60px" class="search_form"  ><!-- 
	                     --><input type="text" name="f_pod_nm" maxlength="50"  value="<bean:write name="amsVO" property="pod_nm"/>" style="width:157px" class="search_form"  ><!-- 
	                     --><input type="hidden" name="f_ams_pod_cd"  value="<bean:write name="amsVO" property="ams_pod_cd"/>" ></td>
						<th><bean:message key="Last_Loading_Port"/></th>
	                    <td><!-- 
	                     --><input type="text" name="f_lst_pol_cd" maxlength="5"  value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:60px" class="search_form" onKeyDown="codeNameAction('location_last_pod',this, 'onKeyDown')" onBlur="codeNameAction('location_last_pod',this, 'onBlur');setLstPolCd(this.value, frm1.f_lst_pol_nm.value)"><!-- 
	                     --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('LAST_POL_LOCATION_POPLIST')"></button><!-- 
	                     --><input type="text" name="f_lst_pol_nm" maxlength="50"  value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px" class="search_form" onKeyPress="if(event.keyCode==13){doWork('LAST_POL_LOCATION_POPLIST', frm1.f_lst_pol_nm.value);}"><!-- 
	                     --><input type="hidden" name="f_ams_lst_pol_cd"  value="" ></td>
						</tr>
						<tr>
							<th><bean:message key="T_S_Cargo"/></th>
	                        <td><select name="f_ts_cgo" style="width:150px" onChange="setTsCgo(this.value)"><!-- 
	                         --><option value="N"></option><!-- 
	                         --><option value="Y">FROB</option><!-- 
	                         --></select></td>
							<th><bean:message key="US_T_S_Port"/></th>
	                        <td><!-- 
	                         --><input type="text" name="f_ts_cd"  value="" onKeyDown="codeNameAction('location_ts_cd',this, 'onKeyDown')" onBlur="codeNameAction('location_ts_cd',this, 'onBlur');" style="width:60px" class="search_form" maxlength="4"><!-- 
	                         --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('TS_LOCATION_POPLIST')"></button><!-- 
	                         --><input type="text" name="f_ts_nm"  value="" style="width:128px" class="search_form" onKeyPress="if(event.keyCode==13){doWork('TS_LOCATION_POPLIST', frm1.f_ts_nm.value);}"><!-- 
	                         --></td>
							<th><bean:message key="AMS_Send"/></th>
	                        <td><select name="f_ams_snd" style="width:150px" onChange="setAmsSnd(this.value)"><!-- 
		                         --><option value='A'>Addition</option><!-- 
		                         --><option value='B'>Amendment</option><!-- 
		                         --><option value='D'>Elimination</option><!-- 
		                         --><option value="I">IT Assign</option><!-- 
	                         --></select></td>
						</tr>
					</tbody>
				</table>
		</div>
	</div>	
	<!-- wrap_search (E) -->
    <!-- wrap_result(S) -->
	<div class="wrap_result_tab">
	    <ul class="opus_design_tab">
	        <li class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="HBL_Information"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span>AMS Sending Result</span></a></li>
	    </ul>
	
		<!-- tabLayer1 (S) -->
		<div name="tabLayer" id="tabLayer" style="display:inline">
			<div class="opus_design_inquiry">
				<h3 class="title_design"><bean:message key="House_BL_Information"/></h3>
				<div class="opus_design_gird">
					<script language="javascript">comSheetObject('sheet1');</script>
				</div>
			</div>
			<div class="opus_design_inquiry sm">
				<h3 class="title_design mar_btm_8"><bean:message key="IT_Assign_Information"/></h3>
				<table>
					<colgroup>
						<col width="100">
						<col width="240">
						<col width="100">
						<col width="230">
						<col width="85">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="IT_No"/></th>
		                    <td><input type="text" name="f_it_no"  maxlength="11" value="" style="width:150px" onKeyPress="ComKeyOnlyNumber(this)" class="search_form" onBlur="setItNo(this.value)"></td>
							<th><bean:message key="IT_Type"/></th>
		                    <td><!-- 
		                     --><select name="f_it_tp" style="width:220px" onChange="setItTp(this.value)"><!-- 
			                     --><option value=''></option><!-- 
			                     --><option value='61'>61:Immediate Transportation (IT)</option><!-- 
			                     --><option value='62'>62:Transportation & Exportation (T&E)</option><!-- 
			                     --><option value='63'>63:Immediate Exportation (IE)</option><!-- 
		                     --></select></td>
							<th><bean:message key="Bond_No"/></th>
		                    <td><input type="text" name="f_bond_id" maxlength="12" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px" class="search_form" onBlur="setBondNo(this.value)"></td>
						</tr>
						<tr>
							<th><bean:message key="Hub_AMS_Port"/></th>
		                    <td><input type="text" name="f_hub_cd"  value="" style="width:60px" class="search_form" onKeyDown="codeNameAction('location_hub_cd',this, 'onKeyDown')" onBlur="codeNameAction('location_hub_cd',this, 'onBlur');setHubCd(this.value, frm1.f_hub_nm.value)" onChange="setHubCd(this.value, frm1.f_hub_nm.value)"><!-- 
		                     --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('HUB_LOCATION_POPLIST')"></button><!-- 
		                     --><input type="text" name="f_hub_nm"  value="" style="width:128px" class="search_form" onKeyPress="if(event.keyCode==13){doWork('HUB_LOCATION_POPLIST', frm1.f_hub_nm.value);}"></td>
							<th><bean:message key="Last_USA_Port"/></th>
		                    <td colspan="3"><input type="text" name="f_usa_cd"  value="" style="width:60px" class="search_form" onKeyDown="codeNameAction('location_usa_cd',this, 'onKeyDown')" onBlur="codeNameAction('location_usa_cd',this, 'onBlur');setUsaCd(this.value, frm1.f_usa_nm.value)" onChange="setUsaCd(this.value, frm1.f_usa_nm.value)"><!-- 
		                     --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('USA_LOCATION_POPLIST')"></button><!-- 
		                     --><input type="text" name="f_usa_nm"  value="" style="width:128px" class="search_form" onKeyPress="if(event.keyCode==13){doWork('USA_LOCATION_POPLIST', frm1.f_usa_nm.value);}"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- layout_wrap(S) -->
			<div class="layout_wrap">
			    <div class="layout_vertical_2">
			        <!-- opus_design_grid(S) -->
			        <h3 class="title_design"><bean:message key="Container_Information"/></h3>
			        <div class="opus_design_grid" style="margin-right: 10px;">
			            <script type="text/javascript">comSheetObject('sheet2');</script>
			        </div>
			        <!-- opus_design_grid(E) -->
			    </div>
			    <div class="layout_vertical_2">
			        <!-- opus_design_grid(S) -->
			        <h3 class="title_design"><bean:message key="Item_Information"/></h3>
			        <div class="opus_design_grid">
			            <script type="text/javascript">comSheetObject('sheet3');</script>
			        </div>
			        <!-- opus_design_grid(E) -->
			    </div>
			</div>
			<!-- layout_wrap(E) -->
		</div>
		<!-- tabLayer1 (E) -->
		<!-- tabLayer2 (S) -->
		<div name="tabLayer" id="tabLayer" style="display: none;">
			<h3 class="title_design"><bean:message key="AMS_Send_Reuslt"/></h3>
			<div class="opus_design_grid">
				<script type="text/javascript">comSheetObject('sheet4');</script>
			</div>
			<h3 class="title_design mar_top_8"><bean:message key="AMS_Send_History"/></h3>
			<div class="opus_design_grid">
				<script type="text/javascript">comSheetObject('sheet5');</script>
			</div>
		</div>
		<!-- tabLayer2 (E) -->
	</div>
	<!-- wrap_result(E) -->
    </form>
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>
