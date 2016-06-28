<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ITMgmt.jsp
*@FileTitle  : Item Management  
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/03/05 
=========================================================--%>
<%@page import="sun.org.mozilla.javascript.internal.Undefined"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js"></script>
    <script type="text/javascript" src="./js/common/message/KO/WMS_MSG.js"></script>
	<script type="text/javascript" src="./js/common/message/EN/WMS_COM_MSG.js"></script> 
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js"></script>
    <script type="text/javascript" src="./apps/fis/wms/item/script/ITEMMgmt.js"></script>  
     <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
    <bean:define id="warehouseList" name="cdMap" property="whList"/>    
     <bean:define id="officeInfo" name="cdMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>                                                                                                                                                                                                                                    
<%
	/* ResponseObjectInfo responseObjectInfo = (ResponseObjectInfo)request.getAttribute("brokerResult");	
	Object obj = responseObjectInfo.getBusinessReturn(); */
	
	String in_ctrt_no 		= "";
	String in_ctrt_nm 		= "";
	String in_item_no 		= "";
	String in_item_sys_no 	= "";
	String uploadfile 		= "";
	
	try {
		in_ctrt_no  	= request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
		in_ctrt_nm  	= request.getParameter("ctrt_nm")== null?"":request.getParameter("ctrt_nm");
		in_item_no 		= request.getParameter("item_cd")== null?"":request.getParameter("item_cd");
		in_item_sys_no  = request.getParameter("item_sys_no")== null?"":request.getParameter("item_sys_no");
		uploadfile  = request.getParameter("uploadfile")== null?"":request.getParameter("uploadfile");
	}catch(Exception e) {
		out.println(e.toString());
	}
	
	//LKH::2015-09-27 WMS3.O 긴급수정4
	String wmsUseVer = (String)application.getAttribute("WMS_USE_VER");
	if(wmsUseVer == null){wmsUseVer = "";} 

%>

    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="pkg_lv1_put_tp_cd" name="cdMap" property="pkg_lv1_put_tp_cd"/>
	<bean:define id="pkg_lv2_put_tp_cd" name="cdMap" property="pkg_lv2_put_tp_cd"/>
	<bean:define id="pkg_lv3_put_tp_cd" name="cdMap" property="pkg_lv3_put_tp_cd"/>
	<bean:define id="pkg_lv4_put_tp_cd" name="cdMap" property="pkg_lv4_put_tp_cd"/>
	
	<script>
		var ofc_size_ut_cd = "<bean:write name="ofcVO" property="oth_size_ut_cd"/>";
		var h_ut_tp_cd =  ofc_size_ut_cd;		
		var pkg_lv1_put_tp_cdText = '';
		var pkg_lv1_put_tp_cdCode = '';
		<!-- Freight Unit 단위 -->
			<% boolean isBegin_pkg_lv1_put_tp_cd = false; %>
            <logic:iterate id="codeVO" name="pkg_lv1_put_tp_cd">
                <% if(isBegin_pkg_lv1_put_tp_cd){ %>
                pkg_lv1_put_tp_cdText+= '|';
                pkg_lv1_put_tp_cdCode+= '|';
                <% }else{
                	isBegin_pkg_lv1_put_tp_cd = true;
                   } %>
                   pkg_lv1_put_tp_cdCode+= '<bean:write name="codeVO" property="code"/>';
                   pkg_lv1_put_tp_cdText+= '<bean:write name="codeVO" property="name"/>';
            </logic:iterate>
            
            var pkg_lv2_put_tp_cdText = '';
    		var pkg_lv2_put_tp_cdCode = '';
    		<!-- Freight Unit 단위 -->
    			<% boolean isBegin_pkg_lv2_put_tp_cd = false; %>
                <logic:iterate id="codeVO" name="pkg_lv2_put_tp_cd">
                    <% if(isBegin_pkg_lv2_put_tp_cd){ %>
                    pkg_lv2_put_tp_cdText+= '|';
                    pkg_lv2_put_tp_cdCode+= '|';
                    <% }else{
                    	isBegin_pkg_lv2_put_tp_cd = true;
                       } %>
                       pkg_lv2_put_tp_cdCode+= '<bean:write name="codeVO" property="code"/>';
                       pkg_lv2_put_tp_cdText+= '<bean:write name="codeVO" property="name"/>';
                </logic:iterate>
                
                var pkg_lv3_put_tp_cdText = '';
        		var pkg_lv3_put_tp_cdCode = '';
        		<!-- Freight Unit 단위 -->
        			<% boolean isBegin_pkg_lv3_put_tp_cd = false; %>
                    <logic:iterate id="codeVO" name="pkg_lv3_put_tp_cd">
                        <% if(isBegin_pkg_lv3_put_tp_cd){ %>
                        pkg_lv3_put_tp_cdText+= '|';
                        pkg_lv3_put_tp_cdCode+= '|';
                        <% }else{
                        	isBegin_pkg_lv3_put_tp_cd = true;
                           } %>
                           pkg_lv3_put_tp_cdCode+= '<bean:write name="codeVO" property="code"/>';
                           pkg_lv3_put_tp_cdText+= '<bean:write name="codeVO" property="name"/>';
                    </logic:iterate>
                    
                    var pkg_lv4_put_tp_cdText = '';
            		var pkg_lv4_put_tp_cdCode = '';
            		<!-- Freight Unit 단위 -->
            			<% boolean isBegin_pkg_lv4_put_tp_cd = false; %>
                        <logic:iterate id="codeVO" name="pkg_lv4_put_tp_cd">
                            <% if(isBegin_pkg_lv4_put_tp_cd){ %>
                            pkg_lv4_put_tp_cdText+= '|';
                            pkg_lv4_put_tp_cdCode+= '|';
                            <% }else{
                            	isBegin_pkg_lv4_put_tp_cd = true;
                               } %>
                               pkg_lv4_put_tp_cdCode+= '<bean:write name="codeVO" property="code"/>';
                               pkg_lv4_put_tp_cdText+= '<bean:write name="codeVO" property="name"/>';
                        </logic:iterate>
                        
                        var whCd = "";
                        var whNm = "";
                        var whCd_Nm="";
                		<!-- Freight Unit 단위 -->
                			<% boolean isBegin_WH = false; %>
                            <logic:iterate id="item" name="warehouseList">
                                <% if(isBegin_WH){ %>
                                whCd+= '|';
                                whNm+= '|';
                                whCd_Nm+= '|';
                                <% }else{
                                	isBegin_WH = true;
                                   } %>
                                   whCd +='<bean:write name="item" property="wh_cd"/>';
                           		whNm +='<bean:write name="item" property="wh_nm"/>';
                           		whCd_Nm +='<bean:write name="item" property="wh_cd"/>' +'\t '+'<bean:write name="item" property="wh_nm"/>';
                            </logic:iterate>
	</script>
    <script type="text/javascript">
		<%-- <%=JSPUtil.getIBCodeCombo("pkg_lv1_put_tp_cd", 		"", "PP0", 	"0", "")%>
		<%=JSPUtil.getIBCodeCombo("pkg_lv2_put_tp_cd", 		"", "PP0", 	"0", "")%>
		<%=JSPUtil.getIBCodeCombo("pkg_lv3_put_tp_cd", 		"", "PP0", 	"0", "")%>
		<%=JSPUtil.getIBCodeCombo("pkg_lv4_put_tp_cd", 		"", "PP0", 	"0", "")%> --%>
		
		function setupPage(){
			var errMessage = "";
			if (errMessage.length >= 1) {
				ComShowMessage(errMessage);
			} // end if
			loadPage(true);
		}
	</script>
	                                                                                                                                      
<form id="form" name="form" method="POST" action="./ITMgmt.clt" enctype="multipart/form-data">   
 <input type="hidden" name="f_cmd">
 <input type="hidden" name="form_mode" value="NEW" id="form_mode" />
 <input type="hidden" name="uploadfile" id="uploadfile" value="<%=uploadfile%>"/>
 <input type="hidden" name="old_item_cd" value="" id="old_item_cd" />
 <input type="hidden" name="item_sys_no" value="<%=in_item_sys_no %>" id="item_sys_no" />
 <input type="hidden" name="h_ctrt_no" id="h_ctrt_no" />

 <%-- <input type="hidden" name="curr_date" value="<%=DateUtility.transformDate(CalendarUtilities.dateToString(new Date()), " -") %>" id="curr_date" />
 <input type="hidden" name="user_id" value="<%=userInfo.getUser_id()%>" id="user_id" />
 <input type="hidden" name="user_nm" value="<%=userInfo.getUser_nm()%>" id="user_nm" />
 <input type="hidden" name="org_cd" value="<%=userInfo.getOrg_cd()%>" id="org_cd" />
 <input type="hidden" name="org_nm" value="<%=userInfo.getOrg_nm()%>" id="org_nm" /> --%>
 
 <div class="page_title_area clear">
	<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_search" id="btn_search" onClick="doWork('SEARCHLIST');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" ><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btnSave" id="btnSave" onClick="doWork('SAVE');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" ><bean:message key="Save"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_new" id="btn_new" onClick="doWork('NEW');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" ><bean:message key="New"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_cancel" id="btn_cancel" onClick="doWork('INACTIVE');" btnAuth="INACTIVE"><bean:message key="Inactive"/></button><!-- 
		 <!--<button type="button" class="btn_normal" name="btn_cancel" id="btn_cancel" onClick="doWork('TEMPATE_DOWNLOAD');" btnAuth="TEMPATE_DOWNLOAD"><bean:message key="Template_Download"/></button>
		<button type="button" class="btn_normal" name="btn_cancel" id="btn_cancel" onClick="doWork('UPLOAD_EXEL');" btnAuth="UPLOAD_EXEL"><bean:message key="Excel_Upload"/></button>
	 --></div>
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
<!-- opus_design_inquiry(S) -->
<div class= "wrap_search">
<div class="opus_design_inquiry">
	<table>
    	<colgroup>
		<col width="80" />
		<col width="200" />
		<col width="80" />
 		<col width="*" />
		</colgroup>    
		<tbody>        	
			<tr>
				<th><bean:message key="Item_Code"/></th>
				<td><input name="in_item_cd" type="text" id="in_item_cd" style="width:150px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="80" value="<%=in_item_no %>" OnKeyDown="if(event.keyCode==13){quickSearch();}"/></td>
				<th><bean:message key="Contract_No"/></th>
				<td><input name="in_ctrt_no" id="in_ctrt_no" type="text" maxlength="10" style="width:100px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getCtrtInfo(this)"
						   value="<%=in_ctrt_no %>" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);quickSearch();}"/><!-- 
						   --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no"class="input_seach_btn" tabindex="-1" onclick="btn_ctrt()"></button><!-- 
					 --><input name="in_ctrt_nm" id="in_ctrt_nm" type="text" style="width:200px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="10" value="<%=in_ctrt_nm %>"  OnKeyDown="if(event.keyCode==13){searchCtrtPop(this);}" maxlength="100" /><!-- 
				 --></td>
			</tr>
		</tbody>
	</table>
</div>
</div>
<div class="wrap_result">
    
   <!--  <ul class="opus_design_tab">
        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Item"/></span></a></li>
        <li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Optional_Field"/></span></a></li>
    </ul> -->
			
<!-- 	<div id="tabLayer" name="tabLayer" style="display:inline">   -->
		<div class= "opus_design_inquiry" style="margin-bottom:8px;">
		<table>
			<colgroup>
				<col width="108">
				<col width="250">
				<col width="114">
				<col width="200">
				<col width="80">
				<col width="*">
			</colgroup>
			<tbody>
			<tr>
				<th><a href="javascript:btn_link_ctrt();" id="btn_link_ctrt"><span class="point_B"><bean:message key="Contract_No"/></span></a></th>
				<td><input name="ctrt_no" required id="ctrt_no" type="text" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo2(this);getOptField();" class="L_input"  
					       maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo2(this);getOptField();}"/><!-- 
					 --><button type="button" name="btn_ctrt_no2" id="btn_ctrt_no2"class="input_seach_btn" tabindex="-1" onclick="btn_ctrt2()"></button><!-- 
					 --><input name="ctrt_nm" required id="ctrt_nm" dataformat="engup" otherchar = " ()-_" type="text" class="L_input_R" style="width:150px" readOnly tabindex="-1"/>
				</td>
				<th><bean:message key="Item_Code"/></th>
				<td><input name="item_cd" otherchar = "-_" type="text" dataformat= "engup" class="L_input" required style="width:150px;ime-mode:disabled;text-transform:uppercase;" maxlength="20" onblur="checkCustItem(this, 0);"/></td>
				<th><bean:message key="Name"/></th>
				<td><input name="item_nm" type="text" required class="L_input" style="width:200px;ime-mode:disabled;text-transform:uppercase;" maxlength="100"/></td>
			</tr>
			<tr>
				<th><bean:message key="HTS_Code"/></th>
				<td><input name="hts_no" type="text" dataformat= "engup" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" maxlength="10" 
					OnKeyDown="if(event.keyCode==13){getHtsInfo(this);}" onblur="getHtsInfo(this);"/><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="btn_hts()"></button><!-- 
					 --><input name="hts_nm" type="text" class="L_input_R" style="width:150px" readOnly tabindex="-1"/>
				</td>
				<th><bean:message key="Group_Code"/></th>
				<td><input name="item_grp_cd" type="text" dataformat= "engup" class="L_input" style="width:150px;ime-mode:disabled;text-transform:uppercase;" maxlength="10" 
					OnKeyDown="if(event.keyCode==13){getItemGroup(this);}" onblur="getItemGroup(this);"/><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="btn_grp_cd()"></button>
				</td>
        		<th><bean:message key="USE"/></th>
				<td><select name="item_use_flg" id="item_use_flg" style="width:128px" disabled>
						<option value="Y"><bean:message key="Y"/></option>
						<option value="N"><bean:message key="N"/></option>
					</select>
				</td>
			</tr>
			</tbody>
		</table>
		<h3 class="title_design"><bean:message key="Pack_Master"/>&nbsp;(<span id="sh_ut_tp_cd"></span>)</h3>
		<table class = "grid_2 wAuto" style="text-align:center;">
			<colgroup>
			    <col width="50">
			    <col width="150">
			    <col width="50">
			    <col width="70">
			    <col width="60">
			    <col width="60">
			    <col width="60">
			    <col width="150">
			    <col width="150">
			    <col width="150">
			    <col width="150">
			    <col width="150">
			    <col width="150">
		   </colgroup>
			<tbody>
			<tr>
	   	    	<th></th>
	   	    	<th style="text-align: center;"><bean:message key="Unit"/></th>
	   	    	<th style="text-align: center;"><bean:message key="Qty"/></th>
	   	    	<th style="text-align: center;"><bean:message key="Put_Type"/></th>
                <th style="text-align: center;"><bean:message key="Length"/></th>
                <th style="text-align: center;"><bean:message key="Width"/></th>
                <th style="text-align: center;"><bean:message key="Height"/></th>
	   	    	<th style="text-align: center;"><bean:message key="CBM"/></th>
	   	    	<th style="text-align: center;"><bean:message key="CBF"/></th>
	   	    	<th style="text-align: center;"><bean:message key="G_WGT"/></th>
	   	    	<th style="text-align: center;"><bean:message key="G_LBS"/></th>
	   	    	<th style="text-align: center;"><bean:message key="N_WGT"/></th>
	   	    	<th style="text-align: center;"><bean:message key="N_LBS"/></th>
	   	    </tr>
			<tr>
				<th style="text-align: center;"><bean:message key="EA_Level"/></th>
				<td><input name="pkg_lv1_unit_cd" required type="text" class="L_input" style="width:30px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getPkgUnit(this);" maxlength="5" 
						   OnKeyDown="if(event.keyCode==13){getPkgUnit(this);}"/><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="btn_pkgunit1()"></button><!-- 
					 --><input name="pkg_lv1_unit_nm" type="text" class="L_input_R" style="width:70px;" readOnly required tabindex="-1"/>
				</td>
				<td><input name="pkg_lv1_qty" type="text" class="L_input_R" readonly value="1"  style="width:50px;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '999999999999999');convertNumber(this);"/></td>
				<td>
					<!-- <script type="text/javascript" >ComComboObject('pkg_lv1_put_tp_cd', 1, 85, 1);</script> -->
					<select name="pkg_lv1_put_tp_cd" id="pkg_lv1_put_tp_cd" class="search_form">
       				</select>
				</td>
                <td><input name="lv1_length" type="text" class="L_input"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '999.00');chkComma(this,3,2);autoCalculator(this);"/></td>
                <td><input name="lv1_width" type="text" class="L_input" style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '999.00');chkComma(this,3,2);autoCalculator(this);"/></td>
                <td><input name="lv1_height" type="text" class="L_input"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '999.00');chkComma(this,3,2);autoCalculator(this);"/></td>
                <td><input name="lv1_cbm" type="text" class="L_input" value="0.00000"  style="width:97%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
				<td><input name="lv1_cbf" type="text" class="L_input" value="0.00000"  style="width:97%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
				<td><input name="lv1_grs_kgs" type="text" class="L_input" value="0.00000"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
				<td><input name="lv1_grs_lbs" type="text" class="L_input" value="0.00000"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
				<td><input name="lv1_net_kgs" type="text" class="L_input" value="0.00000"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
				<td><input name="lv1_net_lbs" type="text" class="L_input" value="0.00000"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
			</tr>
				    		
			<tr><!-- LKH::2015-09-26 WMS3.O 긴급수정3 -->
				<th style="text-align: center;"><bean:message key="IN_Level"/></th>
				<td><input name="item_pkgunit" type="text" class="L_input" style="width:30px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getPkgUnit(this);" 
								 maxlength="5" OnKeyDown="if(event.keyCode==13){getPkgUnit(this);}" /><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="btn_pkgunit()"></button><!-- 
					 --><input name="item_pkgunit_nm" type="text" class="L_input_R" style="width:70px" readOnly tabindex="-1"/>
				</td>
				<td><input name="item_pkgbaseqty" type="text" class="L_input" value="" style="width:50px;text-align:right" onkeypress="onlyNumberCheck();" onblur="checkNumFormat(this, '999999999999999');convertNumber(this);"/></td>
				<td>
					<!-- <script type="text/javascript" >ComComboObject('pkg_lv2_put_tp_cd', 1, 85, 1);</script> -->
					<select name="pkg_lv2_put_tp_cd" id="pkg_lv2_put_tp_cd" class="search_form">
       				</select>
				</td>
                <td><input name="item_length" type="text" class="L_input"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '999.00');chkComma(this,3,2);autoCalculator(this);"/></td>
                <td><input name="item_width" type="text" class="L_input"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '999.00');chkComma(this,3,2);autoCalculator(this);"/></td>
                <td><input name="item_height" type="text" class="L_input"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '999.00');chkComma(this,3,2);autoCalculator(this);"/></td>
                <td><input name="item_cbm" type="text" class="L_input" value="0.00000"  style="width:97%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
				<td><input name="item_cbf" type="text" class="L_input" value="0.00000"  style="width:97%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
				<td><input name="item_kgs" type="text" class="L_input" value="0.00000"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
				<td><input name="item_grs_lbs" type="text" class="L_input" value="0.00000"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
				<td><input name="item_net_wgt" type="text" class="L_input" value="0.00000"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
				<td><input name="item_net_lbs" type="text" class="L_input" value="0.00000"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
			</tr>
    		<tr>
    			<th style="text-align: center;"><bean:message key="BX_Level"/></th>
	    		<td><input name="pkg_lv3_unit_cd" type="text" class="L_input" style="width:30px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getPkgUnit(this);" maxlength="5" 
	    					OnKeyDown="if(event.keyCode==13){getPkgUnit(this);}" /><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="btn_pkgunit3()"></button><!-- 
					 --><input name="pkg_lv3_unit_nm" type="text" class="L_input_R" style="width:70px" readOnly tabindex="-1"/>
	    		</td>
	    		<td><input name="pkg_lv3_qty" type="text" class="L_input" value=""  style="width:50px;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '999999999999999');convertNumber(this);"/></td>
	    		<td>
	    			<!-- <script type="text/javascript" >ComComboObject('pkg_lv3_put_tp_cd', 1, 85, 1);</script> -->
	    			<select name="pkg_lv3_put_tp_cd" id="pkg_lv3_put_tp_cd" class="search_form">
       				</select>
	    		</td>
                <td>
                    <input name="lv3_length" type="text" class="L_input"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '999.00');chkComma(this,3,2);autoCalculator(this);"/>
                </td>
                <td>
                    <input name="lv3_width" type="text" class="L_input"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '999.00');chkComma(this,3,2);autoCalculator(this);"/>
                </td>
                <td>
                    <input name="lv3_height" type="text" class="L_input"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '999.00');chkComma(this,3,2);autoCalculator(this);"/>
                </td>
                <td>
                    <input name="lv3_cbm" type="text" class="L_input" value="0.00000"  style="width:97%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/>
                </td>
                <td>
                    <input name="lv3_cbf" type="text" class="L_input" value="0.00000"  style="width:97%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/>
                </td>
                <td>
                    <input name="lv3_grs_kgs" type="text" class="L_input" value="0.00000"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/>
                </td>
                <td>
                    <input name="lv3_grs_lbs" type="text" class="L_input" value="0.00000"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/>
                </td>
                <td>
                    <input name="lv3_net_kgs" type="text" class="L_input" value="0.00000"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/>
                </td>
                <td>
                    <input name="lv3_net_lbs" type="text" class="L_input" value="0.00000"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/>
                </td>
    		</tr>
    		<tr>
    			<th style="text-align: center;"><bean:message key="PL_Level"/></th>
	    		<td><input name="pkg_lv4_unit_cd" type="text" class="L_input" style="width:30px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getPkgUnit(this);"
	    						maxlength="5" OnKeyDown="if(event.keyCode==13){getPkgUnit(this);}" /><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="btn_pkgunit4()"></button><!-- 
					 --><input name="pkg_lv4_unit_nm" type="text" class="L_input_R" style="width:70px" readOnly tabindex="-1"/>
	    		</td>
	    		<td><input name="pkg_lv4_qty" type="text" class="L_input" value=""  style="width:50px;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '999999999999999');convertNumber(this);"/></td>
	    		<td>
	    			<!-- <script type="text/javascript" >ComComboObject('pkg_lv4_put_tp_cd', 1, 85, 1);</script> -->
	    			<select name="pkg_lv4_put_tp_cd" id="pkg_lv4_put_tp_cd" class="search_form">
       				</select>
	    		</td>
                <td></td>
                <td></td>
                <td></td>
	    		<td colspan="2"><bean:message key="Standard_PL_Qty"/></td>
                <td>
                    <input name="pkg_pl_std_qty" type="text" class="L_input" value="0"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999');convertNumber(this);"/>
                </td>
                <td colspan="2" style="text-align: center;"><bean:message key="Over_PL_Weighting"/></td>
                <td>
                    <input name="pkg_pl_over_wgt" type="text" class="L_input" value="1.0"  style="width:95%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '99.0');chkComma(this,2,1);"/>
                </td>
    		</tr>
    	</tbody>
    	</table>
    	<h3 class="title_design"><bean:message key="Additional_Information"/></h3>
		<table>
			<colgroup>
				<col width="100">
				<col width="150">
				<col width="100">
				<col width="220">
				<col width="80">
				<col width="*">
			</colgroup>
			<tbody>
			<tr>
				<th><bean:message key="Alternative_Code"/></th>
				<td><input name="alter_item_cd" type="text" class="L_input" style="width:150px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/></td>
				<th><bean:message key="Advance_Price"/></th>
				<td><logic:notEmpty name="EventResponse">
						<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
						<bean:define id="prList" name="cdMap" property="priceList"/>
						<select id="adv_curr_cd" name="adv_curr_cd" class=""  dataformat="engup" style="ime-mode:disabled;width:80px;text-align:left">
							<option value=""></option>
							<logic:iterate id="ComCdDtlVO" name="prList">
								<option value='<bean:write name="ComCdDtlVO" property="cd_val"/>'><bean:write name="ComCdDtlVO" property="cd_nm"/></option>
							</logic:iterate>
						</select><!-- 
					 --></logic:notEmpty><!-- 
						<input name="adv_curr_cd" type="text" class="L_input"  style="width:50px;text-align:right" maxlength="50"  OnKeyDown="if(event.keyCode==13){getCurrInfo(this);}" onchange="getCurrInfo(this);"/>
						<button type="button" class="input_seach_btn" tabindex="-1" onclick="btn_adv_curr()"></button>
					 --><input name="adv_price" type="text" class="L_input"  value="0.00" style="width:90px;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999999.00');chkComma(this,13,2);"/>
				</td>
				<th><bean:message key="ABC"/></th>
				<td><select name="abc_cd" id="abc_cd" style="width:120px">
						<option value="A"><bean:message key="A_"/></option>
						<option value="B"><bean:message key="B_"/></option>
						<option value="B"><bean:message key="C_"/></option>
					</select>
				</td>
			</tr>
			<tr>
				<th><bean:message key="Barcode_No"/></th>
				<td><input name="barcode_no" type="text" class="L_input" style="width:150px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/></td>
				<th><bean:message key="Nego_Price"/></th>
				<td><logic:notEmpty name="EventResponse">
						<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
						<bean:define id="prList" name="cdMap" property="priceList"/>
						<select id="nego_curr_cd" name="nego_curr_cd" class=""  dataformat="engup" style="ime-mode:disabled;width:80px;text-align:left">
							<option value=""></option>
							<logic:iterate id="ComCdDtlVO" name="prList">
								<option value='<bean:write name="ComCdDtlVO" property="cd_val"/>'><bean:write name="ComCdDtlVO" property="cd_nm"/></option>
							</logic:iterate>
						</select><!-- 
					 --></logic:notEmpty><!-- 
				 		<input name="nego_curr_cd" type="text" class="L_input"  style="width:50px;text-align:right" maxlength="50" OnKeyDown="if(event.keyCode==13){getCurrInfo(this);}" onblur="getCurrInfo(this);"/><button type="button" class="input_seach_btn" tabindex="-1" onclick="btn_nego_curr()"></button> 
					--><input name="nego_price" type="text" class="L_input"  value="0.00" style="width:90px;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999999.00');chkComma(this,13,2);"/>
				</td>
				<th><bean:message key="Reference_Code1"/></th>
				<td><input name="ref_cd_01" type="text" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" class="L_input"  maxlength="50"/></td>
			</tr>
			<tr>
				<th><bean:message key="Safety_Stock_Qty"/></th>
				<td><input name="safe_stc_qty" type="text" class="L_input" style="width:150px;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNum(this, '999999999999999');convertNumber(this);"/></td>
				<th><bean:message key="Unit_Price"/></th>
				<td><logic:notEmpty name="EventResponse">
						<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
						<bean:define id="prList" name="cdMap" property="priceList"/>
						<select id=unit_curr_cd name="unit_curr_cd" class=""  dataformat="engup" style="ime-mode:disabled;width:80px;text-align:left">
							<option value=""></option>
							<logic:iterate id="ComCdDtlVO" name="prList">
								<option value='<bean:write name="ComCdDtlVO" property="cd_val"/>'><bean:write name="ComCdDtlVO" property="cd_nm"/></option>
							</logic:iterate>
						</select><!-- 
					 --></logic:notEmpty><!-- 
				 <!-- <input name="unit_curr_cd" type="text" class="L_input"  style="width:50px;text-align:right" maxlength="15" OnKeyDown="if(event.keyCode==13){getCurrInfo(this);}" onchange="getCurrInfo(this);"/><button type="button" class="input_seach_btn" tabindex="-1" onclick="btn_unit_curr()"></button>
					 --><input name="unit_price" type="text" class="L_input"  value="0.00" style="width:90px;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999999.00');chkComma(this,13,2);"/>
				</td>
				<th><bean:message key="Reference_Code2"/></th>
				<td><input name="ref_cd_02" type="text" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" class="L_input" maxlength="50"/></td>
			</tr>
			</tbody>
		</table>
		<div id="hiddenSheet" style="display:none">        
			<div class="opus_design_grid clear">                                                                                                                                                                                                      
				<script type="text/javascript">comSheetObject('sheet1');</script>                 
			</div>                                                                                                                                                               
		</div>
		</div>	
		<!-- layout_wrap(S) -->
		<div class="layout_wrap">
	    	<div class="layout_vertical_2 pad_rgt_4" style="display:<%="VER3.0".equals(wmsUseVer)?"none":"inline"%>">	
	    	<h3 class="title_design"><bean:message key="Warehouse_LOC"/></h3>	
	    	<!-- opus_design_grid(S) -->
				<div class="opus_design_grid clear">
				<!-- opus_design_btn(S) -->
					<div class="opus_design_btn">
					 	<button type="button" class="btn_normal" name="row_add" id="row_add" onClick="doWork('row_add');"><bean:message key="Add"/></button><!-- 
					 --><button type="button" class="btn_normal" name="row_del" id="row_del" onClick="doWork('row_del');"><bean:message key="Del"/></button>
					</div>
				<!-- opus_design_btn(E) -->
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
				
			</div>
			<div class="layout_vertical_2 pad_rgt_4">	
			<h3 class="title_design"><bean:message key="Supplier_Manufacturer"/></h3>	
	    	<!-- opus_design_grid(S) -->
				<div class="opus_design_grid clear">
				<!-- opus_design_btn(S) -->
					<div class="opus_design_btn">
					 	<button type="button" class="btn_normal" name="row_add2" id="row_add2"onClick="doWork('row_add2');"><bean:message key="Add"/></button><!-- 
					 --><button type="button" class="btn_normal" name="row_del2" id="row_del2" onClick="doWork('row_del2');"><bean:message key="Del"/></button>
					</div>
				<!-- opus_design_btn(E) -->
					<script type="text/javascript">comSheetObject('sheet3');</script>
				</div>
			</div>
	    	<div class="layout_vertical_2">	
	    	<h3 class="title_design"><bean:message key="Remark"/></h3>
    		<div class= "opus_design_inquiry">
				<table>
					<colgroup>
						<col width="*">
					</colgroup>
				<tbody>
					<tr>
						<td><textarea name="item_remark" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:100%;height:278px;overflow:hidden;text-transform:uppercase;" maxlength="100" WRAP="off"></textarea></td>
					</tr>
				</tbody>
				</table>
	    		</div>
    		</div>
    		
    		<div class="layout_vertical_2 pad_rgt_4" style="display:<%="VER3.0".equals(wmsUseVer)?"none":"inline"%>">
    		<h3 class="title_design"><bean:message key="Image_File_Attachment"/></h3>
				<div class= "opus_design_inquiry">
					<table>
					<colgroup>
						<col width="100">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
						<td><!--
			                --><div id="logo_rec_id" style="display: none;"><!--
			                --></div><!--
			                --><input tabindex = "-1" type="file" name="logo_rectangle"  size="25"/><!--
			                --><input name="logo_rec_flg" type="checkbox" value="Y"  style="display: none">
						<td>
						<td><button type="button" class="btn_etc" id="btn_file_upload" name="btn_file_upload" onClick="doWork('btn_file_upload');" ><bean:message key="File_Upload"/></button><!-- 
							 --><button tabindex="-1" type="button" class="btn_etc"  id="btn_file_delete" name="btn_file_delete" onClick="doWork('btn_file_delete');"><bean:message key="File_Delete"/></button>
						</td>
						</tr>
					</tbody>
					</table>
	    		</div>
	    		<div class="opus_design_grid clear">
	    			<script type="text/javascript">comSheetObject('sheet4');</script>
	    			<%-- <script type="text/javascript">ComUploadObject('upload1', '<%=session.getId()%>');</script> --%>
	    		</div>
    		</div>
	    	</div>
    	</div>	   	
<!--   	</div> -->
   
<!-- 	<div id="tabLayer" name="tabLayer" style="display:none"> -->
		<div class="opus_design_grid" style="display:none">
			<script type="text/javascript">comSheetObject('sheet5');</script>
	 	</div>
<!-- 	</div> -->
</div>

</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
<!-- LKH::2015-09-28-File Attachment -->
<form name="frm1" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd" id="goWhere" />
    <input type="hidden" name="bcKey" value="downloadTlFileTemplateWMS" id="bcKey" />
    <input type="hidden" name="file_path" value="" id="file_path" />
    <input type="hidden" name="file_name" value="" id="file_name"/>	
    <input type="hidden" name="docType" value="" id="docType" />
</form>	

<iframe name="ifra_hidden" style="width:0;height:0;visibility:hidden" border=0></iframe>
