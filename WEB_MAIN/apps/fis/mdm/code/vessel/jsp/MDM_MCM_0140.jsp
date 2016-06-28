<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0140.jsp
*@FileTitle  :  Vessel Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/05
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js"></script>
	<script type="text/javascript" src="./apps/fis/mdm/code/vessel/script/MDM_MCM_0140.js" ></script>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>
<script type="text/javascript">
<!--
function setupPage(){
	loadPage();
}
//-->
</script>
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd"/> 
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	<input type="hidden" name="trdp_cd" id="trdp_cd"/>
    <!-- 타이틀, 네비게이션 -->
 <!-- page_title_area(S) -->
	<div class="page_title_area clear ">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><span><%=LEV3_NM%></span></button></h2>
		<!-- page_title(E) -->
			
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn" >
		 	  <button type="button" class="btn_accent" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="searchList();"><bean:message key="Search"/></button><!-- 
		 	--><button type="button" class="btn_normal" onclick="doWork('ROWADD')" ><bean:message key="Add"/></button><!-- 
		 	--><button type="button" class="btn_normal" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> onclick="doWork('MODIFY')" id="btnModify"><bean:message key="Save"/></button>
		</div>
		<!-- opus_design_btn(E) -->	
		    <!-- page_location(S) -->
		<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
			<span><%=LEV1_NM%></span> &gt;
		    <span><%=LEV2_NM%></span> &gt;
		    <span><%=LEV3_NM%></span>
		    <a href="" class="ir">URL Copy</a>
		</div>
	</div>
    <!-- page_location(E) -->      
<div class= "wrap_search">
		<div class= "opus_design_inquiry">
		<table>
			<colgroup>
				<col width="80">
				<col width="170">
				<col width="90">
				<col width="160">
				<col width="60">
				<col width="*">
			</colgroup>
			<tbody>
					<tr>
						<th><bean:message key="Vessel_Code"/></th>
						<td>
							<input type="text" name="s_vsl_cd" maxlength="10" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80;" onKeyPress="ComKeyOnlyAlphabet('uppernum');fncSearch();">
						</td>
						
						<th><bean:message key="Vessel_Name"/></th>
						<td>
							<input type="text" name="s_vsl_nm" maxlength="10" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150;" onKeyPress="ComKeyOnlyAlphabet('uppernum');fncSearch();">
						</td>
						
						<th><bean:message key="Carrier"/></th>
						<td>
                          	<input type="text" name="s_lnr_trdp_cd" maxlength="20" value="" onBlur="strToUpper(this);codeNameAction('s_trdpcode', this.value);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"><!-- 
                          --><button type="button"  id="liner" class="input_seach_btn" tabindex="-1" onClick="doWork('LINER_POPLIST')"></button><!-- 
                          --><input type="text"   name="s_lnr_trdp_nm" maxlength="50" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110;" onKeyPress="if(event.keyCode==13){doWork('LINER_POPLIST');}">
						</td>
						
					</tr>
			</tbody>			
		</table>

</div>
</div>    
<div class="wrap_result"> 	
	<h3 class="title_design mar_btm_8">Basic Information</h3>
	<div class="opus_design_grid">	
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	  <table>
        <tr>
            <td width="55">
                <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
                <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
                <paging:options name="pagingVal" defaultval="200"/>
            </td>                               
            <td align="center">
                <table>
                    <tr>
                        <td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
                        </td>
                    </tr>
                </table>        
            </td>
            <td width="55"></td>
        </tr>
    </table>	    
</div>  
 </form>  
 
 <script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
	</script>	
