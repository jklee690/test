<%--
=========================================================
*@FileName   : EDI_CSTM_0040.jsp
*@FileTitle  : 항공수입 인도승락서 국내세관 EDI 관리
*@Description: 항공수입 인도승락서 국내세관 EDI 관리
*@author     : Shin,Beom-Chul - Cyberlogitec
*@version    : 1.0 - 07/24/2009
*@since      : 07/24/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css">
    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/cstm/krcstm/script/EDI_CSTM_0040.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js"></script>
<script type="text/javascript">
<!--
function setupPage() {
	initFinish();loadPage();doWork('SEARCHLIST01');
}
//-->
</script>
<form name="frm1" method="POST" action="./">
    <!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd"/> 
    <input type="hidden" name="f_CurPage"/>
    <input type="hidden" name="f_edi_cre_seq">
    <input type="hidden" name="f_edi_msg_seq">
    <input type="hidden" name="f_edi_msg_no">
	<input type="hidden" name="f_edi_snd_seq">
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="EDI_CSTM_0040.clt"/>
    
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn"><!--
	   --><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST01')" id="btnSearch" name="btnSearch"><bean:message key="Search"/></button><!--
	   --><button type="button" btnAuth="CTRADEWORLD" 	class="btn_normal" onclick="doWork('CALLCT')" id="btnCTradeWorld" name="btnCTradeWorld"><bean:message key="CTradeWorld"/></button>
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
            		<col width="100"></col>
            		<col width="200"></col>
            		<col width="80"></col>
            		<col width="140"></col>
            		<col width="90"></col>
            		<col width="100"></col>
            		<col width="*"></col>
            	</colgroup>
            	<tbody>
	           		<tr>
	           			<td><h3 class="title_design"><bean:message key="Search_Condition"/></h3></td>
	           		</tr>
		            <tr>
						<th><bean:message key="Arrival_Date"/></th>
						<td><!--
						--><input type="text" name="f_arr_str_dt" id="f_arr_str_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_arr_end_dt);firCalFlag=false;"/>~ <!--
						--><input type="text" name="f_arr_end_dt" id="f_arr_end_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_arr_str_dt, this);firCalFlag=false;"/><!--
						--><button type="button" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button>
						</td>
		                <th><bean:message key="Flight_No"/></th>
		                <td>
		                    <input type="text" name="f_flt_no" maxlength="20" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;">
		                </td>
		                <th><bean:message key="tit.trmsStatus"/></th>
		                <td>
		                    <select name="f_trms_sts" value='' class="search_form" style="width:80px;">
		                    	<option value=''>전체</option>
		                    	<option value='S'>전송</option>
		                    	<option value='R'>재전송</option>
		                    </select>
		                </td>
		                <td></td>
		            </tr>
            	</tbody>
            </table>
        </div>
    </div>
    <div class="wrap_result">
    	<div class="opus_design_grid">
	    	<h3 class="title_design"><bean:message key="Processe_Information"/></h3>
    		<div class="opus_design_btn">
		   		<button type="button" class="btn_accent" onclick="doWork('COMMAND01')"><bean:message key="EDI_Send"/></button>
		   	</div>
		   	<script language="javascript">comSheetObject('sheet1');</script>
	    </div>
	</div>
</form>
<script type="text/javascript">
<%-- doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>"); --%>
</script>	
<script>
    var pDoc = parent.parent.document;
    hideProcess('WORKING', pDoc);
</script>