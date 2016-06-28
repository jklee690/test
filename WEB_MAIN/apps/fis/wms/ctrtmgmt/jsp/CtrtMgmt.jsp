<%--
=========================================================
*Copyright(c) 2015 DOU Networks. All Rights Reserved.
*@FileName   : ContractManagement.jsp
*@FileTitle  : Contract Management
*@author     : Vinh Vo - DOU
*@version    : 1.0 - 07/14/2015
*@since      : 07/14/2015

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="./js/common/message/KO/WMS_MSG.js"></script>
	<script type="text/javascript" src="./js/common/message/EN/WMS_COM_MSG.js"></script> 		
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/wms/ctrtmgmt/script/CtrtMgmt.js"></script>
<%
	String ctrt_no = "";
	
	ctrt_no = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
	
	//LKH::2015-09-26 WMS3.O 긴급수정
	String wmsUseVer = (String)application.getAttribute("WMS_USE_VER");
	if(wmsUseVer == null){wmsUseVer = "";} 

%>

 <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
 <bean:define id="warehouseList" name="cdMap" property="whList"/>
 
<script type="text/javascript">

var whCd = "";
var whNm = "";
var whCd_Nm="";

'<logic:notEmpty name="warehouseList">'
	'<logic:iterate id="item" name="warehouseList">'
		whCd +="|"+'<bean:write name="item" property="wh_cd"/>';
		whNm +="|"+'<bean:write name="item" property="wh_nm"/>';
		whCd_Nm += "|"+'<bean:write name="item" property="wh_cd"/>' +'\t '+'<bean:write name="item" property="wh_nm"/>';
	'</logic:iterate>'
	
'</logic:notEmpty>'

function setupPage() {
	loadPage();
	//loaddata();
}
</script>

<form name="frm1" method="POST" >
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_ctrt_no" value="<%=ctrt_no%>"/>
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"> 
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title" id='bigtitle'><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn"><!--
	   --><button type="button" class="btn_accent" onclick="form.f_CurPage.value=1;doWork('SEARCH')"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" ><bean:message key="Search"/></button><!--
	   --><button type="button" class="btn_normal" onClick="doWork('NEW')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" ><bean:message key="New"/></button><!--
	   --><button type="button" class="btn_normal" onclick="doWork('MODIFY')" id="btnSave" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" ><bean:message key="Save"/></button></div>
	   <!-- btn_div -->
	  
	<div class="location">	
		<span><%=LEV1_NM%></span> &gt;
		<span><%=LEV2_NM%></span> &gt;
		<span><%=LEV3_NM%></span>
		<a href="" class="ir">URL Copy</a>
	</div>
	</div>
	
	<!-- Search option -->
    <div class="wrap_search">	
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="80"></col>
					<col width="180"></col>
					<col width="80"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
                    	<th><bean:message key="Contract_No"/></th>
                        <td><!--
                        --><input type="text" name="s_ctrt_no"  style="text-transform:uppercase;width:80px;" dataformat="engup" otherchar="_-" onkeydown="if(event.keyCode==13){searchTlCtrtInfo(this, frm1.s_ctrt_nm);}"  onblur="searchTlCtrtInfo(this, frm1.s_ctrt_nm);"><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="pod" onclick="doWork('CTRT_POPLIST')"></button><!--
                        --><input name="s_ctrt_nm" type="text"  style="text-transform:uppercase;width:200px;text-align:left"></td>
                        <th><bean:message key="Delete_YN"/></th>
                        <td>	
                        	<input type="radio"  id="Y" name="radYN"/><!--
                        	--><label for="Y"><bean:message key="Yes"/></label>
                        	
                        	<input type="radio"  id="N" name="radYN" checked/><!--
                        	--><label for="N"><bean:message key="No"/></label>
                        	
                        	<input type="radio"  id="A" name="radYN" /><!--
                        	--><label for="A"><bean:message key="All"/></label>
                        </td>
                        
                    </tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class='wrap_result'>
	<div class="layout_wrap">
		<div class="layout_vertical_2" >
		<div class="opus_design_inquiry">
			<div class="opus_design_inquiry" style="height: 250px;">
				<h3 class="title_design" style="margin-bottom: 0px;"><bean:message key="Contract_List"/></h3>
				<div class="opus_design_grid">
					<script type='text/javascript'>comSheetObject('sheet1');</script>
				</div>
					<%-- <table>
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
               --%>
               <div class="opus_design_inquiry">
              <table border="0" width="720">
					<tr>
						<td width="100">
							<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
							<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
							<paging:options name="pagingVal" defaultval="200"/>
						</td>
						<td align="center" width="700">
							<table width="700">
								<tr>
									<td width="700" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
									</td>
								</tr>
							</table>		
						</td>
						<td width="100"></td>
					</tr>
				</table>
				</div>
			</div>	 
			</div>
		</div>
		
		 <div class="layout_vertical_2 pad_left_8" >
		 	<div class="opus_design_inquiry sm" style="height: 250px;">
		 		<h3 class="title_design" style="margin-bottom: 0px;"><bean:message key="Basic_Information"/></h3>
			    <table>
					<colgroup>
						<col width="150"></col>
						<col width="100"></col>
						<col width="100"></col>
						<col width="*"></col>
					</colgroup >
					<tbody>
						<tr><!-- LKH::2015-09-27 WMS3.O 긴급수정3 -->
	                    	<th><bean:message key="Contract_No"/></th>
	                    	<td>
	                    		<input type="text" name="d_ctrt_cd" id="d_ctrt_cd" style="width:100px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getCtrtInfo(this)"  maxlength="10" required OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}">
	                    	</td>
	                        <th><bean:message key="Delete_Flag"/></th>
	                        <td  >
	                        <select name="cbxDel_Flg" id="cbxDel_Flg" style="width:60px;">
	                        	<option value = "N"><bean:message key="N"/></option>
	                        	<option value = "Y"><bean:message key="Y"/></option>
	                        </select>
	                        </td>
	                    </tr>                    
	                    <tr>
	                    	<th><bean:message key="Contract_Name"/></th>
	                        <td colspan = "3">
	                        	<input type="text" id="d_ctrt_nm" name="d_ctrt_nm"  dataformat="engup" otherchar = " ()-_" value="" maxlength="100" style="width:200px;text-transform:uppercase;" required >
	                        </td>
	                    </tr>                    
	                    <tr>
				 			<th><bean:message key="Effective_Date"/></th>
				           	<td colspan="3">
				           	<input type="text" id="frm_dt" name="frm_dt" value="" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_dt);firCalFlag=false;" onkeypress="onlyNumberCheck();"
				           		size="11" style="width: 78px" maxlength="10" required/><!-- 
							 --><span class="dash">~</span><!-- 
							 --><input type="text" id="to_dt" name="to_dt" value="" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.frm_dt, this);firCalFlag=false;" onkeypress="onlyNumberCheck();"
							 	size="11" style="width: 78px" maxlength="10" required/><!-- 
							 --><button type="button" class="calendar ir" name="btn_date" id="btn_date" onclick="doDisplay('DATE11' ,frm1,frm1.frm_dt,frm1.to_dt);"></button>
				 			</td>
						</tr>
						
						<tr>
				 			<th><bean:message key="Sales_Office"/></th>
				           	<td colspan="3"><!--
                        --><input type="text" name="d_ofc_cd" dataformat="engup" style="text-transform:uppercase;width:78px;" maxlength="40" onkeydown="if(event.keyCode==13){searchORGName(this, frm1.d_ofc_nm);}" onblur="searchORGName(this, frm1.d_ofc_nm);"required><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="pod_ofc_cd" name="pod_ofc_cd" onclick="doWork('SL_OFC_POPLIST')"></button><!--
                        --><input name="d_ofc_nm" type="text"  style="width:200px;text-align:left" required disabled>
				 			</td>
				   		</tr>
				   		
						<tr>
				 			<th><bean:message key="Sales_PIC"/></th>
				           	<td colspan="3"><!--
                        --><input type="text" name="d_pic_cd" dataformat="engup" style="text-transform:uppercase;width:78px;" maxlength="40" onkeydown="if(event.keyCode==13){searchSalesPIC(this, frm1.d_pic_nm);}" onblur="searchSalesPIC(this, frm1.d_pic_nm);" required><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="pod_d_pic_cd" name="pod_d_pic_cd" onclick="doWork('SL_PIC_POPLIST')"></button><!--
                        --><input name="d_pic_nm" type="text"  style="width:200px;text-align:left" required disabled>
				 			</td>
				   		</tr><tr>
				 			<th><bean:message key="Main_Customer"/></th>
				           	<td colspan="3"><!--
                        --><input type="text" name="d_cus_cd" dataformat="engup" style="text-transform:uppercase;width:78px;"maxlength="10" onkeydown="if(event.keyCode==13){searchTlCustInfo(this,frm1.d_cus_nm);}" onblur="searchTlCustInfo(this,frm1.d_cus_nm);" required><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="pod_d_cus_cd" name="pod_d_cus_cd" onclick="doWork('CUST_POPLIST')"></button><!--
                        --><input name="d_cus_nm" type="text"  style="width:200px;text-align:left" required disabled>
				 			</td>
				   		</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<!-- LKH::2015-09-26 WMS3.O 긴급수정 -->
	<div class = "opus_design_grid" style="display:<%="VER3.0".equals(wmsUseVer)?"none":"inline"%>">
		<h3 class="title_design" style="margin-bottom: 0px;"><bean:message key="Warehouse_Information"/></h3>
		<div class="opus_design_btn">
			<button type="button" class="btn_normal" onclick="doWork('ROWADD2')"><bean:message key="Add"/></button>
		</div>
		
		<script type="text/javascript">comSheetObject('sheet2');</script>
	</div>
	</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>