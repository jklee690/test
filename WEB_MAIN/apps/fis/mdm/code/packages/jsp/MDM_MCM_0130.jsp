<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0130.jsp
*@FileTitle  : Package Code
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_MSG.js"></script>
	<script type="text/javascript" src="./apps/fis/mdm/code/packages/script/MDM_MCM_0130.js"></script>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>
<script type="text/javascript">
<!--
function setupPage(){
	loadPage();
	//setSelect();
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
		<div class="opus_design_btn" ><!--
		--><button type="button" class="btn_accent" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="searchList();">Search</button><!--
		--><button type="button" class="btn_normal" onclick="doWork('ROWADD')" >Add</button><!--
		--><button type="button" class="btn_normal" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> onclick="doWork('MODIFY')" id="btnModify">Save</button>	  
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
<div class="wrap_result">
	<h3 class="title_design">Basic Information</h3>
	<div class="opus_design_grid">	
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	<table border="0" width="1200">
        <tr>
            <td width="55">
                <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
                <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
                <paging:options name="pagingVal" defaultval="200"/>
            </td>                               
             <td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
             </td>
        </tr>
    </table> 
 </div>   
  	</form>  
  	
  	
<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
	</script>	
  