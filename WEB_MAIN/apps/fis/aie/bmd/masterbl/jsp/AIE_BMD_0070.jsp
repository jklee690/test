<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AIE_BMD_0070.jsp
*@FileTitle  : Master B/L Search 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/11
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js"></script>
	<script type="text/javascript" src="./apps/fis/aie/bmd/masterbl/script/AIE_BMD_0070.js"></script>
	<script type="text/javascript">
	
	// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
	var ofc_cd = "<%= userInfo.getOfc_cd() %>";
	var edob_flg = "<%= userInfo.getEdob_flg() %>";
	
	
	function setupPage(){
		loadPage();
	}
	var usrId = "<%= userInfo.getUsrid() %>";
	var usrPhn = "<%= userInfo.getPhn() %>";
	var usrFax = "<%= userInfo.getFax() %>";
	var usrNm = "<%= userInfo.getUser_name() %>";
	var usrEml = "<%= userInfo.getEml() %>";
	var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
	</script>
	<form name="frm1" method="POST" action="./">
	<input id="f_cmd" name="f_cmd" type="hidden" />
	<input id="f_CurPage" name="f_CurPage" type="hidden" />
	<input id="intg_bl_seq" name="intg_bl_seq" value="" type="hidden" />
	<input id="s_intg_bl_seq" name="s_intg_bl_seq" value="" type="hidden" />
	<input id="master_bl_no" name="master_bl_no" value="" type="hidden" />
	<input id="house_bl_no" name="house_bl_no" value="" type="hidden" />
	<input id="file_name" name="file_name" value="" type="hidden" />
	<input id="title" name="title" value="" type="hidden" />
	<input id="rd_param" name="rd_param" value="" type="hidden" />
	<input id="mailTitle" name="mailTitle" value="" type="hidden" />
	<input id="mailTo" name="mailTo" value="" type="hidden" />
	
	<!--  Document List ==> Common Memo 연동 파라미터 (S) -->
    <input type="hidden" name="palt_mnu_cd" id="palt_mnu_cd" />
    <input type="hidden" name="opr_no" id="opr_no" />
	<!--  Document List ==> Common Memo 연동 파라미터 (E) -->
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input id="rpt_biz_tp" name="rpt_biz_tp" type="hidden" />
	<input id="rpt_biz_sub_tp" name="rpt_biz_sub_tp" type="hidden" />
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<!-- GridSetting Value -->
	<input id="user_id" name="user_id" value="<%=userInfo.getUsrid()%>" type="hidden" />
	<input type="hidden" name="pageurl" id="pageurl" value="AIE_BMD_0070.clt"/>
	
	<div class="page_title_area clear">
				<!-- page_title(S) -->
				<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
				<!-- page_title(E) -->
				
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn"><!-- 
					--><button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="document.frm1.f_CurPage.value='';doWork('SEARCHLIST')" name="btnSearch"><bean:message key="Search"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"  onClick="doWork('NEW');" name="btnNew"><bean:message key="New"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="CLEAR" onClick="clearAll();"><bean:message key="Clear"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="COPY"  id="btnCopy" onClick="doWork('COPY');"><bean:message key="Copy"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"  id="btnPrint" onClick="doWork('PRINT');"><bean:message key="Print"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="H_PRINT" onClick="doWork('HAWB_PRINT');"><bean:message key="H_Print"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="HI_STAT" onClick="doWork('HI_STAT');"><bean:message key="HWI_STMT"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="HI_STAT_COD" onClick="doWork('HI_STAT_COD');"><bean:message key="COD_STMT"/></button><!--
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="CON_POUCH" onClick="doWork('CON_POUCH');"><bean:message key="Consolidation_pouch"/></button><!--
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('AIR_LABEL')"><bean:message key="Label"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onClick="doWork('CargoManifest');"><bean:message key="B.Manifest"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="B_DOC_PKG" onClick="doWork('docPackage');"><bean:message key="B.DOC_PKG"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="D_RECEIPT" onClick="doWork('DOCK_RECEIPT');"><bean:message key="D.Receipt"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="ACCOUNTING" id="btnAccounting" onclick="doWork('GOTOACCT')"><bean:message key="Accounting"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="TRACKING" onClick="doWork('CARGO_TRACKING');"><bean:message key="Tracking"/></button><!-- 
					<%-- --><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="TSA_SE" onClick="doWork('TSA_SECURITY');"><bean:message key="TSA_SE"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="TSA_UN" onClick="doWork('TSA_UNKNOWN');"><bean:message key="TSA_UN"/></button><!-- --%>
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onClick="doWork('TSA');"><bean:message key="TSA"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="P_REPORT" onClick="doWork('PROFIT_REPORT');"><bean:message key="P_Report"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="PR_BY_HAWB" onClick="doWork('PROFIT_REPORT_BY_HBL');"><bean:message key="PR_BY_HAWB"/></button><!--
					<%-- --><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="PRE_MF" onClick="doWork('PREMF');"><bean:message key="PRE_MF"/></button><!-- --%>
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onClick="doWork('EXCEL');" name="btn_DownExcel"><bean:message key="Excel"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>"   id="btnDelete" onClick="doWork('DELETE');"><bean:message key="Delete"/></button><!--
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="LOG" onClick="doWork('LOG');"><bean:message key="LOG"/></button>
				</div>
				<!-- opus_design_btn(E) -->
	    
	  			<!-- page_location(S) -->
				<div class="location">	
					 <span><%=LEV1_NM%></span> &gt;
				 	 <span><%=LEV2_NM%></span> &gt;
				  	 <span><%=LEV3_NM%></span>
			   		<a href="" class="ir">URL Copy</a>
				</div>
				<!-- page_location(E) -->
	</div>
	<!-- page_title_area(E) -->
	
	<!-- inquiry_area(S) -->	
		<div class="wrap_search">
			<div class="opus_design_inquiry">
				<table>	
					<colgroup>
			        	<col width="110">
			        	<col width="1px">
			        	<col width="75px">
			        	<col width="1px">
			        	<col width="100px">
			        	<col width="1px">
			        	<col width="83px">
			        	<col width="1px">
			        	<col width="66px">
			        	<col width="60">
			        	<col width="60">
			        	<col width="*">
				   </colgroup>
				        <tbody>
							<tr>
                                <th><bean:message key="Ref_No"/></th>
                                <td>
                                	<input type="text" name="f_ref_no" id="f_ref_no" maxlength="20" value='<bean:write name="valMap" property="f_ref_no"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
                                </td>
                                <th><bean:message key="ETD"/></th>
                                <td><!-- 
									 --><input style="width:78px" type="text" name="etd_strdt" id="etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.etd_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><span class="dash">~</span><!--
									 --><input style="width:78px" type="text" name="etd_enddt" id="etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.etd_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!--
									 --><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="etd_dt_cal" onclick="doDisplay('DATE11', frm1);"></button>
								</td>
                                <th><bean:message key="Consignee"/></th>
                                <td><!--
                                     --><input type="text" name="f_cnee_trdp_nm" id="f_cnee_trdp_nm" maxlength="50"class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:105px;" onKeyPress="if(event.keyCode==13){doWork('CNEE_TRDP_POPLIST', frm1.f_cnee_trdp_nm.value);}"/><!--
						   			 --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('CNEE_TRDP_POPLIST')"></button>
                                </td>
                                <th><bean:message key="Flight_No"/></th>
                             	<td><!--
                              		 --><input type="text" name="f_flt_no" id="f_flt_no" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:170px;" onkeydown="entSearch();"/>
                             	</td>
                             	<th><bean:message key="Post_Date"/></th>
	                            <td colspan="3"><!-- 
									--><input style="width:100px" type="text" name="post_strdt" id="post_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.post_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><span class="dash">~</span><!-- 
									--><input style="width:100px" type="text" name="post_enddt" id="post_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.post_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!-- 
									--><button type="button" class="calendar" tabindex="-1" name="post_dt_cal" id="post_dt_cal" onclick="doDisplay('DATE14', frm1);"></button>
								</td>
                            </tr>
		                    <tr>
                            	<th>
									<select name="f_bl_cd" onChange="searchValueClear();" style="width: 100px; font-weight: bold;">
										<option value='MAWB_No' ><bean:message key="MAWB_No"/></option>
										<option value='HAWB_No' ><bean:message key="HAWB_No"/></option>
									</select>
								</th>
                                <td>
                                	<input type="text" name="f_mbl_no" id="f_mbl_no" maxlength="40" value='<bean:write name="valMap" property="f_mbl_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
                                </td>
                                <th><bean:message key="ETA"/></th>
                                <td><!-- 
                                    --><input style="width:78px" type="text" name="eta_strdt" id="eta_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.eta_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><span class="dash">~</span><!-- 
									--><input style="width:78px" type="text" name="eta_enddt" id="eta_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.eta_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!-- 
									--><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="eta_dt_cal" onclick="doDisplay('DATE12', frm1);"></button>
                                </td>
                                <th><bean:message key="Triangle_Agent"/></th>
                                <td><!-- 
                                    --><input type="text" name="f_prnr_trdp_nm2" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:105px;" onKeyPress="if(event.keyCode==13){doWork('PRNR2_TRDP_POPLIST', frm1.f_prnr_trdp_nm2.value);}"/><!-- 
							        --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('PRNR2_TRDP_POPLIST')"></button>
                                </td>
                                <th><bean:message key="Destination"/></th>
                                <td><!-- 
                               		--><input type="text"   name="f_pod_cd" id="f_pod_cd"   maxlength="5"   value='' class="search_form" onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="codeNameAction('location_pod',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"/><!-- 
                                    --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POD_LOCATION_POPLIST')"></button><!--
                                    --><input type="text"   name="f_pod_nm" id="f_pod_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:87px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pod_nm.value);}"/>
                                </td>
                                <th><bean:message key="BL_Type"/></th>
                                <td colspan="3">
                                    <bean:define id="blTypeList" name="valMap" property="blTypeList"/>
                                    <select name="f_hbl_tp_cd" id="f_hbl_tp_cd" class="search_form" style="width:115px;">
                                        <option value="">ALL</option>
                                        <logic:iterate id="bltypeVO" name="blTypeList">
                                            <option value='<bean:write name="bltypeVO" property="cd_val"/>'><bean:write name="bltypeVO"  property="cd_nm"/></option>
                                        </logic:iterate>
                                    </select>
                                </td>
                            </tr>
							<tr>
                                <th><bean:message key="Airline"/></th>
                                <td><!-- 
	                               	 --><input type="text" name="f_lnr_trdp_nm" id="f_lnr_trdp_nm" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:71px;" onKeyPress="if(event.keyCode==13){doWork('LNR_TRDP_POPLIST', frm1.f_lnr_trdp_nm.value);}"/><!-- 
									 --><button type="button" class="input_seach_btn" tabindex="-1"  style="cursor:hand" onclick="doWork('LNR_TRDP_POPLIST')"></button>
                                </td>
                                <th><bean:message key="Departure"/></th>
                                <td><!-- 
                               		 --><input type="text"   name="f_pol_cd" id="f_pol_cd"  maxlength="5"    value='' class="search_form" onKeyDown="codeNameAction('location_pol',this, 'onKeyDown')" onBlur="codeNameAction('location_pol',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"/><!-- 
                                     --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('POL_LOCATION_POPLIST')"></button><!--
                                     --><input type="text"   name="f_pol_nm"  id="f_pol_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:87px;" onKeyPress="if(event.keyCode==13){doWork('POL_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/>
                                </td>
                                <th><bean:message key="Shipper"/></th>
                                <td><!-- 
                                    --><input type="text" name="f_shpr_trdp_nm" id="f_shpr_trdp_nm" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:105px;" onKeyPress="if(event.keyCode==13){doWork('SHIP_TRDP_POPLIST', frm1.f_shpr_trdp_nm.value);}"/><!-- 
					   	  			--><button type="button" class="input_seach_btn" tabindex="-1"  style="cursor:hand" onclick="doWork('SHIP_TRDP_POPLIST')"></button>
                                </td>
                       			<th><bean:message key="BL_Date"/></th>
                        		<td><!-- 
                            	    --><input style="width:78px" type="text" name="bl_strdt" id="bl_strdt" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='10' maxlength="10" class="search_form"><span class="dash">~</span><!-- 
								    --><input style="width:78px" type="text" name="bl_enddt" id="bl_enddt" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='10' maxlength="10" class="search_form"><!-- 
								    --><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="eta_dt_cal"  onclick="doDisplay('DATE13', frm1);"></button>
                         	    </td>
                         	    <th><bean:message key="Office"/></th>
                                <td>
                                    <div id="div_subcode">
                                        <bean:define id="oficeList" name="valMap" property="ofcList"/>
                                        <input  type="hidden" name="s_ofc_cd" id="s_ofc_cd" value="<bean:write name="valMap" property="ofc_cd"/>"/> 
                                        <select name="f_ofc_cd" id="f_ofc_cd" class="search_form" style="width:75px;">
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
                                    </div>
                                </td>
                                <th><bean:message key="Issued_By"/></th>
							    <td>
								    <input type="text" name="opr_usrid" tabindex="-1" style="width:74px;"><!-- 
									--><button type="button" name="oprBtn" id="oprBtn" class="input_seach_btn" tabindex="-1" onClick="doWork('OPR_POPLIST')"></button>
	                                <input type="hidden" name="proc_usrnm" class="search_form-disable" readOnly style="width:120px;">
	                                <input type="hidden" name="opr_usrnm">
									<input type="hidden" name="opr_ofc_cd">
									<input type="hidden" name="opr_dept_cd">
			                    </td>
                            </tr>
				        </tbody>
			    </table>
			</div>	
	    </div>
	<!-- inquiry_area(E) -->	
	
	<!-- grid_area(S) -->
		<div class="wrap_result">
			<div class="opus_design_inquiry">	
				<!-- grid_area1(S) -->	
				<div class="opus_design_grid" id="mainTable">
					<h3 class="title_design"><bean:message key="MAWB_List"/></h3>
					<div class="opus_design_btn"> 
						<button  onClick="setMblSizeUp(docObjects[0])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Plus"/></button>
						<button onClick="setMblSizeDown(docObjects[0])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Minus"/></button></td>
					</div>
					<script type="text/javascript">comSheetObject('sheet1');</script>
				</div> 
					<table>
						<tr>
							<td width="100">
								<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
								<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
								<paging:options name="pagingVal" defaultval="200"/>
							</td>
							<td align="center" width="900">
								<table width="900">
									<tr>
										<td width="900" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
										</td>
									</tr>
								</table>		
							</td>
							<td width="100"></td>
						</tr>
					</table>
				</div>
				<!-- grid_area1(E) -->	
				
				<!-- grid_area2(S) -->	
				<div class="opus_design_grid">
					<h3 class="title_design"><bean:message key="HBL_List"/></h3>
					<div class="opus_design_btn"> 
						<button  onClick="setHblSizeUp(docObjects[1])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Plus"/></button>
						<button onClick="setHblSizeDown(docObjects[1])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Minus"/></button></td>
					</div>
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div> 
				<!-- grid_area2(E) -->
				
				<!-- grid_area3(S) -->		
				<div class="opus_design_grid" id="mainTable" style="width: 800px;">
					<h3 class="title_design"><bean:message key="Document_List" /></h3>
					<div class="opus_design_btn"> 
						<button id="btnSave" onClick="doWork('SAVE')" type="button" class="btn_normal"><bean:message key="Save"/></button>
						<button type="button" btnAuth="S_DOC" onClick="doWork('S_DOC');" class="btn_normal"><bean:message key="Print"/></button>
						<button type="button" class="btn_normal" id="fileUpObj" onClick="doWork('DOCFILE')" ><bean:message key="Upload"/></button>
					</div>
					<script type="text/javascript">comSheetObject('sheet3');</script>
					<!-- grid_area3(E) -->	
					</div> 
		</div>
		<!-- grid_area(E) -->	
    </form>
    <form name="frm2" method="POST" action="./GateServlet.gsl">
	    <input id="goWhere" name="goWhere" value="fd" type="hidden" />
	    <input id="bcKey" name="bcKey" value="blFileDown" type="hidden" />
	    <input id="s_palt_doc_seq" name="s_palt_doc_seq" value="" type="hidden" />
	    <input id="intg_bl_seq" name="intg_bl_seq" value="" type="hidden" />
	    <input id="docType" name="docType" value="" type="hidden" />
	</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	