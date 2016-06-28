<%--
=========================================================
*@FileName   : MDM_MCM_0050.jsp
*@FileTitle  : Office Code
*@Description: Office Code
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/12/2009
*@since      : 01/12/2009

*@Change history:
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mdm/mcm/office/script/MDM_MCM_0050.js"></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
     	<bean:define id="cdList" name="cdMap" property="GL_CODE"/>
     	<bean:define id="cdList1" name="cdMap" property="FREIGHT_CODE"/>
     	<bean:define id="bankList" name="cdMap" property="BANK_LIST"/>
     	<bean:define id="fontSize" name="cdMap" property="PARAM1"/>
     	<bean:define id="wgtUtCd" name="cdMap" property="PARAM2"/>
     	<bean:define id="measUtCd" name="cdMap" property="PARAM3"/>
     	<bean:define id="length" name="cdMap" property="PARAM4"/>
     	<bean:define id="postDate" name="cdMap" property="PARAM5"/>
     	<bean:define id="taxType" name="cdMap" property="PARAM6"/>
     	<bean:define id="invPostDate" name="cdMap" property="PARAM7"/>

     	<bean:define id="impPostDate" name="cdMap" property="PARAM8"/>
     	
     	<bean:define id="ofcVO"  name="EventResponse" property="objVal"/>
	</script>
<script type="text/javascript">
<!--
var th_debit_note = "<bean:message key='B.CR_DB'/>";
	
function setupPage() {
	loadPage();
	loaddata();
}
//-->
</script>
<form name="frm1" method="POST" action="./MDM_MCM_0050.clt" enctype="multipart/form-data">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="i_9_it_next_no"/> 
        <!-- 타이틀, 네비게이션 --> 
        
        
    <input type="hidden" name="svr_ip"/> 
    
    <!--  jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. -->
    <input type="hidden" name="f_isNumSep" 	value='<bean:write name="cdMap" property="f_isNumSep"/>'>    
    
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title" id='bigtitle'><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn"><!--
	   --><button type="button" class="btn_accent" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="doWork('SEARCH')"><bean:message key="Search"/></button><!--
	   --><button type="button" class="btn_normal" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr2() + "'"  : "" %> onClick="doWork('NEW')"><bean:message key="New"/></button><!--
	   --><button type="button" class="btn_normal" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> onclick="doWork('SAVE')" id="btnSave"><bean:message key="Save"/></button></div>
	   <!-- btn_div -->
	  
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	
	<!-- Search option -->
    <div class="wrap_search_tab">	
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="80"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
                    	<th><bean:message key="Office_Code"/></th>
                        <td><!--
                        --><input type="text" name="s_ofc_cd" maxlength="5" value="<bean:write name="cdMap" property="s_ofc_cd"/>" required style="text-transform:uppercase;width:60;" onKeyPress="if(event.keyCode==13){codeNameAction('office',this, 'onKeyDown');doWork('SEARCH');}" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onBlur="codeNameAction('office',this, 'onBlur')"><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="pod" onclick="doWork('OFFICE_POPLIST4')"></button><!--
                        --><input name="s_ofc_nm" class="search_form-disable" type="text" dataformat="excepthan" style="ime-mode:disabled;width:200px;text-align:left" value="<bean:write name="cdMap" property="s_ofc_nm"/>" readOnly></td>
                    </tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result_tab">
	    <ul class="opus_design_tab">
	        <li class="nowTab"><a href="#" id=Tab01 style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Basic_Information"/></span></a></li>
	        <li><a href="#" id=Tab02 style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Accounting"/></span></a></li>
	        <li><a href="#" id=Tab03 style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Remark1"/></span></a></li>
	        <li><a href="#" id=Tab04 style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Remark2"/></span></a></li>
	        <li><a href="#" id=Tab05 style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Department"/></span></a></li>
<%-- 	        <li><a href="#" id=Tab06 style="cursor:hand;" onClick="javascript:goTabSelect('06');" style="display:none"><span><bean:message key="Terms"/></span></a></li> --%>
<%-- 	        <li><a href="#" id=Tab06 style="cursor:hand;" onClick="javascript:goTabSelect('07');" style="display:none"><span><bean:message key="Setup"/></span></a></li> --%>
	    </ul>
	 
		<div id="tabLayer" name="tabLayer"><!--Booking&BL-->
			   <%@ include file = "./MDM_MCM_0051.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer"><!--Mark Description-->
			   <%@ include file = "./MDM_MCM_0052.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer"><!--Container-->
			   <%@ include file = "./MDM_MCM_0053.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer"><!--Freight-->
				<%@ include file = "./MDM_MCM_0054.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer"><!--WorkOrder-->
				<%@ include file = "./MDM_MCM_0055.jsp"%>
		</div>
		
		<div id="tabLayer" name="tabLayer"  style="display:none"><!--Status-->
				<%@ include file = "./MDM_MCM_0056.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer"  style="display:none"><!--Status-->
				<%@ include file = "./MDM_MCM_0057.jsp"%>
		</div>
	</div>
</form>

<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd" id="goWhere" />
    <input type="hidden" name="bcKey" value="ofcFileDown" id="bcKey" />
    <input type="hidden" name="v_ofc_cd" value="" id="v_ofc_cd" />
    <input type="hidden" name="v_set_type" value="" id="v_set_type"/>	
    <input type="hidden" name="docType" value="" id="docType" />
</form>	

<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
	</script>
