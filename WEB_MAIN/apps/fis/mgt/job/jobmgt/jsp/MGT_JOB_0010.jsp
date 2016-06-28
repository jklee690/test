<%--
=========================================================
*@FileName   : MGT_JOB_0010.jsp
*@FileTitle  : Job Management
*@Description: Trade Partner ManagementList
*@author     : Phitran
*@since      :06/11/2014
*@Change history:
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js"></script>
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>
	<script>
	function setupPage()
	{
		loadPage();
	}
	
	$(document).ready(function(){			
		frm1.category_code.focus();
	});
</script>
<!--ajax 사용시 -->

<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/mgt/job/jobmgt/script/MGT_JOB_0010.js"></script>
<style type="text/css">
<!--
style1 {color: #CC0000}
-->
</style>
</head>

<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="work_flg" id="work_flg" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	<input type="hidden" name="f_Flag" id="f_Flag" />
	<!--Category Code를 넘긴다 -->
	<input type="hidden" name="c_code" id="c_code" />
	<!--Template 삭제여부/저장후조회를 위해 hidden으로 처리한다. -->
	<input type="hidden" name="tmp_del" id="tmp_del" />

	<input type="hidden" name="air_sea_flg" value="C054" id="air_sea_flg" />
	
	<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>	
	<input type="hidden" name="tmp_seq"  id="tmp_seq" value="<bean:write name="rtnMap" property="jb_tmplt_seq"></bean:write>" />
	
	 <div class="page_title_area clear">
	   <h2 class="page_title" id='bigtitle'><button type="button"><%=LEV3_NM%></button></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('NEW')"  style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="New"/></button><!-- 
			--><button id="save_btn" type="button" class="btn_normal" onclick="check_save_null()" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><bean:message key="Save"/></button>
		   </div>
		   <!-- btn_div -->
	   <div class="location">	
			<span><%=LEV1_NM%></span> &gt;
		    <span><%=LEV2_NM%></span> &gt;
		    <span><%=LEV3_NM%></span>
		    <a href="" class="ir">URL Copy</a>
		</div>
	</div>
	
	<div class= "wrap_search">
 		<div class= "opus_design_inquiry">
 			<table>
 				<colgroup>
 					<col width="120">
 					<col width="160">
 					<col width="100">
 					<col width="*">
 				</colgroup>
 				<tr>
 					<th><bean:message key="Category"/></th>
 					<td id="div_subcode">
 						<logic:notEmpty name="EventResponse">
						     <bean:define id="categoryMap"  name="EventResponse" property="mapVal"/><!-- 
						  --><bean:define id="categoryList" name="categoryMap" property="categoryList"/><!-- 
						  --><select name="category_code" id="category_code" onChange="doWork('TPLSEARCH')">
					             <logic:iterate id="categoryVO" name="categoryList">
						             <option value='<bean:write name="categoryVO" property="cd_val"/>'><bean:write name="categoryVO" property="cd_nm"/></option>
					             </logic:iterate>
				             </select>
					    </logic:notEmpty>	
 					</td>
 					<th><bean:message key="Template_List"/></th>
 					<td>
                       <select required  name="template_code" id="template_code" style="width:120px;">
                            <option selected="true" value=""></option>
                       </select>
                    </td>
 				</tr>
 			</table>
 		</div>
 	</div>
	
	<div class="wrap_result">
 		<div class= "opus_design_inquiry">
 			<table>
 				<colgroup>
 					<col width="120">
 					<col width="160">
 					<col width="100">
 					<col width="220">
 					<col width="130">
 					<col width="*">
 				</colgroup>
 				<tr>
 					<th><bean:message key="Template_List_Name"/></th>
 					<td>
						<input required type="text" name="tmplt_nm" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:145px" maxlength="50" class="search_form">									
					</td>
					<th><bean:message key="Description"/></th>
					<td>
                        <input required type="text" name="description" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:220px" maxlength="200" class="search_form">
					</td>
					<th><label for="tmplet_del"><bean:message key="Template_Delete"/></label></th>
					<td>
						<input type="checkbox" name="tmplet_del" id="tmplet_del" />
					</td>
 				</tr>
 			</table>
 		</div>
 	
    	<div class="opus_design_grid" id="mainTable">
    		<script type="text/javascript">comSheetObject('sheet1');</script>
    	</div>
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="700">
					<col width="150">
					<col width="100">
					<col width="*">
				</colgroup>
				<tr>
					<th><bean:message key="Basic_Time"/></th>
					<td height="7">
		            	<select name="basic_time" style="width:130px">
		          			<option selected="true" value=""></option>
		          		</select>
          			</td>
          			<th><bean:message key="Calc_Logic"/></th>
          			<td height="7">
	            		<select name="cal_loc" style="width:60px;text-align:center;font-size:14">
		         			<option value='PLS'> + </option>
		         			<option value='MIN'> - </option>
		         		</select>
	          		</td>
				</tr>
			</table>
		</div>
	</div>
	
</form>                  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");

</script>	
