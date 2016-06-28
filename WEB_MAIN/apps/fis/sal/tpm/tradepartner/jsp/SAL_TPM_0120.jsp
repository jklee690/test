<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
     <link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/sal/tpm/tradepartner/script/SAL_TPM_0120.js"></script>
<script>
	function setupPage(){
	 	loadPage();
	}
</script>

<form name="frm1" method="POST" action="./SAL_TPM_0120.clt">
	<input type="hidden" name="f_cmd">
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="SAL_TPM_0120.clt"/>
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onClick="doWork('SEARCHLIST')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal" onclick="doWork('ROWADD')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="Add"/></button><!-- 
		--><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('MODIFY')"><bean:message key="Save"/></button>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
    
    <div class="wrap_search">	
		<div class="opus_design_inquiry wFit">
			<table>
				<colgroup>
					<col width="70">
					<col width="140">
					<col width="70">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Visibility_ID"/></th>
						<td><input type="text" name="f_vis_id" maxlength="20" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; width:120" onKeyPress="entSearch()"></td>
						<th><bean:message key="Partner"/></th>
						<td><!-- 
						 --><input type="text" name="f_trdp_cd" maxlength="20" onKeyDown="codeNameAction('partner_pickup', this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_pickup',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('PARTNER_POPLIST',this)"></button><!-- 
						 --><input type="text"   name="f_trdp_nm" maxlength="50" onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:300px;" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', document.getElementById('partner'), frm1.f_trdp_nm.value);}"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>	
	<div class="wrap_result">
		<h3 class="title_design mar_btm_8"><bean:message key="Visibility_Trdp_List"/></h3>
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>

    	<div class="opus_design_inquiry">
		<!--- Paging(공통) --->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                      <td width="60px"><!--- 
                      Display option Begin 
                      ---><bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/> 
                      <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/> 
                      <paging:options name="pagingVal" defaultval="200"/> 
					  </td>
                      <td align="center">
                          <table  border="0" width="100%">
                              <tr><td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td>
                              </tr>
                          </table>
                      </td>
                      <td width="40px" height="10" colspan="2" align="right">&nbsp;</td>
                  </tr>
               </table>
        </div>
     </div>
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
			
</form>