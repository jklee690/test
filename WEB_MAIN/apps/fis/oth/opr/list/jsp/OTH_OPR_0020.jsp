<%--
=========================================================
*@FileName   : OTH_OPR_0020.jsp
*@FileTitle  : Other Sales List
*@Description: Other Sales List
*@author     : Jung,Byung-Chul - Cyberlogitec
*@version    : 1.0 - 10/20/2011
*@since      : 10/20/2011

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 24/06/2014
*@since      : 24/06/2014
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js"></script>
	
	<script type="text/javascript" src="./apps/fis/oth/opr/list/script/OTH_OPR_0020.js"></script>
	
	<bean:define id="valMap"  		name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  		name="valMap" property="ofcInfo"/>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
	</script>
	
	<script>
	
	
		// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
		var ofc_cd = "<%= userInfo.getOfc_cd() %>";
		var edob_flg = "<%= userInfo.getEdob_flg() %>";
	
		function setupPage(){
			loadPage();
		}
	</script>
</head>
	<form name="frm1" method="POST" action="./OTH_OPR_0020GS.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="ref_no"/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="OTH_OPR_0020.clt"/>
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	
        <!-- 빅 타이틀, 네비게이션 -->
   <div class="page_title_area clear">
   	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button style="cursor:hand; display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="document.frm1.f_CurPage.value='';doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
		--><button style="cursor:hand; display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr2() %>" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('NEW')"><bean:message key="New"/></button><!-- 
		--><button id="btnDelete" style="cursor:hand; display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr4() %>" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('REMOVE')"><bean:message key="Delete"/></button><!-- 
		--><button id="btnCopy" style="cursor:hand; display:none;" type="button" btnAuth="COPY" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('COPY')"><bean:message key="Copy"/></button><!-- 
		--><button id="btnAccounting" style="cursor:hand; display:none;" type="button" btnAuth="ACCOUNTING" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('GOTOACCT')"><bean:message key="Accounting"/></button><!-- 
		--><button style="cursor:hand; display:none;" type="button" btnAuth="PICKUP_DELIVERY_INSTRUCTION" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('INSTRUCTION')"><bean:message key="Pickup_Delivery_Instruction"/></button><!-- 
		--><button style="cursor:hand; display:none;" type="button" btnAuth="DELIVERY_ORDER" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('ORDER')"><bean:message key="Delivery_Order"/></button><!-- 
		--><button style="cursor:hand; display:none;" type="button" btnAuth="PROFIT_REPORT" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('PROFIT_REPORT')"><bean:message key="Profit_Report"/></button>
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
    <!--빈공간 -->
    <div class="wrap_search">	
		<div class="opus_design_inquiry">
			<h3 class="title_design"><bean:message key="Search_Condition"/></h3>
              <table>
              	<colgroup>
              		<col width="70">
              		<col width="210">
              		<col width="80">
              		<col width="230">
              		<col width="80">
              		<col width="200">
              		<col width="70">
              		<col width="200">
              		<col width="70">
              		<col width="*">
              	</colgroup>
              	<tbody>
                	<tr>
		                <th><bean:message key="Post_Date"/></th>
			        	<td><!--
			        		--><input type="text" name="post_frmdt" id="post_frmdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.post_todt);firCalFlag=false;" size='11' maxlength="10" class="search_form" style="width:75px;" ><!--
							--><span class="dash">~</span><!--
							--><input type="text" name="post_todt" id="post_todt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.post_frmdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form" style="width:75px;" ><!--
							--><button type="button" onclick="doDisplay('POST_DATE', frm1);" class="calendar" tabindex="-1"></button>
				        </td>
				        <th><bean:message key="Customer"/></th>
			            <td>
			            	<!-- 
                            --><input type="text" name="cust_nm" id="cust_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:151px;" onKeyPress="if(event.keyCode==13){doWork('CUST_TRDP_POPLIST', frm1.cust_nm.value);}"/><!-- 
							--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CUST_TRDP_POPLIST')"></button>
						</td>
			            <th><bean:message key="Shipper"/></th>
		                <td>
		                	<!-- 
                            --><input type="text" name="shpr_nm" id="shpr_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:151px;" onKeyPress="if(event.keyCode==13){doWork('SHIP_TRDP_POPLIST', frm1.shpr_nm.value);}"/><!-- 
							--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('SHIP_TRDP_POPLIST')"></button>
		           	 	</td>
	                 	
						<th><bean:message key="Consignee"/></th>
		                <td>
		                	<!-- 
	                        --><input type="text" name="cnee_nm" id="cnee_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:151px;" onKeyPress="if(event.keyCode==13){doWork('CNEE_TRDP_POPLIST', frm1.cnee_nm.value);}"/><!--
							--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CNEE_TRDP_POPLIST')"></button>
		            	</td>
				        <th><bean:message key="Office"/></th>
						<td><!--
							--><bean:define id="oficeList" name="valMap" property="ofcList"/><!--
                            --><select name="f_ofc_cd" style="width:120px;"><!--
                            	--><bean:size id="len" name="oficeList" /><!--
                            	--><logic:greaterThan name="len" value="1"><!--
                            		--><option value=''>ALL</option><!--
                            	--></logic:greaterThan><!--
                        		--><logic:iterate id="ofcVO" name="oficeList"><!--
                                	--><logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
			                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
			                         	</logic:equal>
			                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
			                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
			                         	</logic:notEqual><!--
                        		--></logic:iterate><!--
                            --></select>
						</td>			
			        </tr>
			        <tr>
			            <th><bean:message key="HBL_No"/></th>
			            <td><!--
			            	--><input type="text" name="hbl_no" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:164px;" onkeydown="entSearch();"/>
			            </td>
			            <th><bean:message key="MBL_No"/></th>
			            <td><!--
			            	--><input type="text" name="mbl_no" maxlength="40"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180px;" onkeydown="entSearch();"/>
			            </td>
			            <th><bean:message key="Other_Reference_No"/></th>
			            <td><!--
			            	--><input type="text" name="f_ref_no" maxlength="40"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onkeydown="entSearch();"/>
			            </td>	
			            <th><bean:message key="Cntr_No"/></th>
			            <td><!--
			            	--><input type="text" name="f_cntr_no" maxlength="40"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onkeydown="entSearch();"/>
			            </td>		
			            <th><bean:message key="Vessel_Flight"/></th>
	                    <td><input type="text" name="f_vsl_flt" id="f_vsl_flt" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;" onkeydown="entSearch();"/></td>
					</tr>
				</tbody>
   			</table>
    	</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
    	<div class="opus_design_inquiry">
			<!--- Paging(공통) --->
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td width="60">
				<!--- Display option Begin --->
						<bean:define id="pagingVal" name="valMap"     property="paging"/>
						<paging:options name="pagingVal" defaultval="200"/>
				<!--- Display option End --->                 
					</td>
					<td align="center">
						<table>
							<tr>
								<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		 </div>
     </div>
	</form>
	
	
	<!-- ############################################### COMMON MEMO 1-4 ##################################################### -->
		<%@include file="/apps/fis/cmm/mem/jsp/CMM_MEM_0010.jsp"%>	
	<!-- ############################################### COMMON MEMO 1-4 ##################################################### -->
	
	
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
		
</body>
</html>