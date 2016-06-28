<%--
=========================================================
*@FileName   : ACC_INV_0031.jsp
*@FileTitle  : AP Expense
*@Description: AP Expense
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/12/28
*@since      : 2011/12/28

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/06/20
*@since      : 2014/06/20
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js"></script>
	<script language="javascript" src="./apps/fis/acc/inv/invoice/script/ACC_INV_0031.js" ></script>

	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String usrId		= userInfo.getUsrid();
		String usrPhn		= userInfo.getPhn();
		String usrFax		= userInfo.getFax();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
		
		//User Role
		String dp_flg 		= userInfo.getDp_flg();
		String fb_flg 		= userInfo.getFb_flg();
		String jo_flg 		= userInfo.getJo_flg();
		String oo_flg 		= userInfo.getOo_flg();
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>

	<bean:define id="blinfoVO"   name="EventResponse" property="objVal"/>
	<bean:define id="valMap"  	 name="EventResponse" property="mapVal"/>
	<bean:define id="ofcVO"  	 name="valMap" property="ofcInfo"/>
	<bean:define id="oficeList"  name="valMap" property="ofcList"/>
	
	<bean:parameter name="do_copy" id="do_copy" value= ""/>

	<script>
		function setSelect(){
			var formObj = document.frm1;

			frm1.f_curr_cd.value = '<bean:write name="ofcVO" property="trf_cur_cd"/>';
			//frm1.f_dept_cd.value = frm1.s_dept_cd.value;
			//frm1.f_ofc_cd.value = '<%= ofc_cd %>';
		}

		<!-- Freight SEA_Unit 단위 -->
	    var UNITCD1 = ' |';
		var UNITCD2 = ' |';

		<logic:notEmpty name="valMap" property="UNITCD">
			<% boolean isBegin = false; %>
            <bean:define id="unitList" name="valMap" property="UNITCD"/>
            <logic:iterate id="codeVO" name="unitList">
                <% if(isBegin){ %>
                    UNITCD1+= '|';
                    UNITCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
                UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>


        <!-- ###CONTAINER T<bean:message key="Profit_Share"/>Z 항목### -->
		var TPSZ1 = ' |';
		var TPSZ2 = ' |';
        <logic:notEmpty name="valMap" property="cntrTpszList">
			<% boolean isBegin3 = false; %>
            <bean:define id="TpszList" name="valMap" property="cntrTpszList"/>
            <logic:iterate id="codeVO" name="TpszList">
                <% if(isBegin3){ %>
                	TPSZ1+= '|';
                	TPSZ2+= '|';
                <% }else{
                      isBegin3 = true;
                   } %>
                TPSZ1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
                TPSZ2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
            </logic:iterate>
        </logic:notEmpty>

        <!-- ###FRT_CD LIST 항목### -->
		var FRTCD1 = ' |';
		var FRTCD2 = ' |';
        <logic:notEmpty name="valMap" property="FRT_CD_LIST">
			<% boolean isBegin5 = false; %>
            <bean:define id="FRT_CD_LIST" name="valMap" property="FRT_CD_LIST"/>
            <logic:iterate id="codeVO" name="FRT_CD_LIST">
                <% if(isBegin5){ %>
                	FRTCD1+= '|';
                	FRTCD2+= '|';
                <% }else{
                      isBegin5 = true;
                   } %>
                   FRTCD1+= '<bean:write name="codeVO" property="FRT_CD" filter="false"/>';
                   FRTCD2+= '<bean:write name="codeVO" property="FRT_CD" filter="false"/>' + ": " + '<bean:write name="codeVO" property="FRT_CD_NM" filter="false"/>';
            </logic:iterate>
        </logic:notEmpty>

        <!-- Sheet Office Code List ### -->
		var OFCCD1 = '';
		var OFCCD2 = '';
        <logic:notEmpty name="valMap" property="ofcList">
			<% boolean isBegin4 = false; %>
            <logic:iterate id="ofcVO" name="oficeList">
                <% if(isBegin4){ %>
                	OFCCD1+= '|';
                	OFCCD2+= '|';
                <% }else{
                      isBegin4 = true;
                   } %>
                 OFCCD1+= '<bean:write name="ofcVO" property="ofc_cd"/>';
                OFCCD2+= '<bean:write name="ofcVO" property="ofc_cd"/>';
            </logic:iterate>
        </logic:notEmpty>
    	// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
		function fnbtnCtl(){
			 
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
			//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
			var formObj=document.frm1;


						//Enable Editing Other Office (ACCT) 
				var edoa_flg 		= "<%=userInfo.getEdoa_flg()%>"; //Enable Editing Other Office (ACCT) 
				var ofc_cd = "<%=ofc_cd%>";
				var ref_ofc_cd =  	formObj.f_ofc_cd.value;
				//alert(edoa_flg + " "+ofc_cd+" "+ref_ofc_cd);
				var btnflag = "Y";
				if (edoa_flg == "N"){
					if (ofc_cd != ref_ofc_cd){  
						btnflag = "N";
					}
				}  
				if (ref_ofc_cd == "") { btnflag = "Y"; }
				if (btnflag == "Y"){
					//기존유지
					//$("#btnModify").show(); 
					//$("#deleteBtn2").show(); 
				}else{
					$("#btnModify").hide(); 
					$("#deleteBtn2").hide(); 
					$("#btnPrint").hide(); 
				} 

	}

	</script>
<script>
function setupPage(){
	loadPage();
	setSelect();
}
</script>
<form name="frm1" method="POST" action="./ACC_INV_0031.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="s_inv_flg" value="AP"/>
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="trdp_cd"/>
	<input type="hidden" name="f_frgn_curr_cd">
	<input type="hidden" name="f_frgn_amt">
	<input type="hidden" name="f_frgn_vat_amt">
	<input type="hidden" name="f_frgn_sum_amt">
	<input type="hidden" name="f_curRow">
	<input type="hidden" name="f_old_sum_amt">

	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_usrId" value="<%= usrId %>"/>
	<input	type="hidden" name="f_usrPhn" value="<%= usrPhn %>"/>
	<input	type="hidden" name="f_usrFax" value="<%= usrFax %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>

	<!--  User Role Accounting 관련 -->
	<input	type="hidden" name="dp_flg" value="<%= dp_flg %>"/>
	<input	type="hidden" name="fb_flg" value="<%= fb_flg %>"/>
	<input	type="hidden" name="jo_flg" value="<%= jo_flg %>"/>
	<input	type="hidden" name="oo_flg" value="<%= oo_flg %>"/>
	<!--마감된 invoice에 대하여 수정권한이 있는 사람이 수정을 했을 경우 frt.post_dts는  form의 post_dt가 아님-->
	<input type="hidden" name = "f_edit_post_dt" value=""/>
	
	<input type="hidden" name="s_dept_cd" value="<%=request.getParameter("s_dept_cd")%>"/> 
	<input type="hidden" name="scac_cd" value="<bean:write name="valMap" property="scac_cd"/>"/> 
	
	<input type="hidden" name="f_inv_seq"    value="<bean:write name="blinfoVO" property="inv_seq"/>">
	<input type="hidden" name="temp_inv_no"  value="<bean:write name="blinfoVO" property="inv_no"/>"/>
	<input type="hidden" name="f_ref_ofc_cd" value=""/>
	<input type="hidden" id="do_copy" value='<bean:write name="do_copy"/>'/>

	<!-- 마감 FLAG -->
	<input type="hidden" name = "f_clt_cmpl_flg">
	<input type="hidden" name = "f_today_dt">

	<input type="hidden" name = "old_post_dt" value="<bean:write name="blinfoVO" property="post_dt"/>"/>
	<input type="hidden" name = "slip_post"   value="<bean:write name="blinfoVO" property="slip_post"/>"/>
	<input type="hidden" name = "block_post"  value="<bean:write name="blinfoVO" property="block_post"/>"/>
	<input type="hidden" name = "max_jnr_dt"  value="<bean:write name="valMap" property="max_jnr_dt"/>"/>

	<input type="hidden" name="s_inv_no"  value="">

	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<!--  Invoice 정보 변경여부 확인 -->
	<input type="hidden" name="f_modi_tms" value="">

<!-- Button -->
<div class="page_title_area clear">
   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
   <div class="opus_design_btn">
	   <button id="btnModify" type="button" btnAuth="<%= roleBtnVO.getAttr3() %>" class="btn_accent" onclick="doWork('MODIFY')" style="display:none"><bean:message key="Save"/></button><!-- 
	--><span id="deleteBtn2" style="display:none;"  onclick="doWork('DELETE')"><button id="btnDelete" type="button" class="btn_normal"><bean:message key="Delete"/></button></span><!-- 
	--><button id="btnCopy" type="button" btnAuth="COPY" class="btn_normal" onclick="doWork('COPY')" style="display:none;"><bean:message key="Copy"/></button><!-- 
	--><button id="btnPrint" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_normal" onclick="doWork('PRINT')" style="display:none;"><bean:message key="Print"/></button><!-- 
	--><button type="button" btnAuth="CLEAR" class="btn_normal" onclick="clearAll()" style="display:none;"><bean:message key="Clear"/></button>
   </div>
   <!-- btn_div -->
   <div class="location">
	   <span><%=LEV1_NM%></span> &gt;
	   <span><%=LEV2_NM%></span> &gt;
	   <span><%=LEV3_NM%></span>
	   <a href="" class="ir">URL Copy</a>
   </div>
</div>
<!-- Search option -->
	<div class="wrap_result">
	<div class="opus_design_inquiry" style="margin-bottom:0;">
	    <table>
	    	<colgroup>
	    		<col width="123px"></col>
	    		<col width="250px"></col>
	    		<col width="100px"></col>
	    		<col width="98px"></col>
	    		<col width="250px"></col>
	    		<col width="*"></col>
	    	</colgroup>
	    	<tbody>
	    	<tr>
              <th><bean:message key="Vendor"/></th>
              <td><!--
              --><input required type="text" name="f_vendor_cd" maxlength="20" value="" onKeyDown="codeNameAction('VENDOR',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('VENDOR',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px" ><!--
              --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onclick="doWork('CUSTOMER_POPLIST')"></button><!--
              --><input required type="text" name="f_vendor_nm" maxlength="50" value="" onKeyDown="custEnterAction(this,'CUSTOMER')" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px" ></td>
              <td></td>
              <th><bean:message key="Amount_Due"/></th>
	          <td><input type="text" name="f_amt_due" value="" style="width:70px;text-align:right"  readOnly></td>
	          <td></td>
          	</tr>
          	<tr>
                <th><bean:message key="Vendor_Invoice_No"/></th>
                <td><input type="text" name="f_inv_no" value="" onblur="strToUpper(this);chkInvRcv(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:233px"   maxlength="50"></td>
                <td width="100px"></td>
                <th><bean:message key="Paid_Amount"/></th>
	            <td><input type="text" name="f_paid_amt" value="" style="width:70px;text-align:right"  readOnly></td>
	            <td></td>
            </tr>
            <tr>
              <th><bean:message key="Posting_Date"/></th>
              <td><!--
              --><input required type="text" id="f_post_dt" name="f_post_dt" value="" style="width:75px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Posting Date');checkPostDate(this);setInvDt();" maxlength="10" ><!--
              --><button type="button" id="f_post_dt_cal" onclick="doDisplay('DATE11', frm1);" class="calendar" tabindex="-1"></button></td>
              <td></td>
              <th><bean:message key="Last_CK_No"/></th>
	          <td><input type="text" name="f_last_ck" value="" style="width:70px"  readOnly></td>
	          <td></td>
            </tr>
            <tr>
               <th><bean:message key="Invoice_Date"/></th>
               <td><!--
              --><input required type="text" id="f_inv_dt" name="f_inv_dt" value="" style="width:75px" onKeyUp="mkDateFormatType(this, event, false,1);enterInvDt();" onBlur="mkDateFormatType(this, event, true,1);changeInvDt();" maxlength="10" ><!--
              --><button type="button" id="f_inv_dt_cal" onclick="doDisplay('DATE2', frm1);" class="calendar" tabindex="-1"></button>
               <input type="hidden" name="pre_inv_dt" value="" /></td>
               <td width="100px"></td>
               <th><bean:message key="Last_Paid_Date"/></th>
	           <td><input type="text" name="f_last_paid_dt_cal" style="width:70px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" maxlength="10"  readOnly></td>
	           <td></td>
           </tr>
           <tr>
               <th><bean:message key="Terms"/></th>
               <td><!--
              --><select name="f_terms"  dataformat="excepthan" style="ime-mode:disabled;width:150px;text-align:left" onchange="javascript:calcCreateTerms();"><!--
              --><option value=""></option><!--
              --><bean:define id="paramTermsList"  name="valMap" property="termsList"/><!--
              --><logic:iterate id="TermsVO" name="paramTermsList"><!--
              --><option value='<bean:write name="TermsVO" property="cd_val"/>'><bean:write name="TermsVO" property="cd_nm"/></option><!--
              --></logic:iterate><!--
              --></select><!--
              --><input type="text" name="f_term_dt" value="" onKeyDown="enterCalcCreateTerms();" onKeyPress="onlyNumberCheck();" onBlur="calcCreateTerms();"  dataformat="excepthan" style="ime-mode:disabled;width:23px;text-align:left"></td>
           </tr>
           <tr>
              <th><bean:message key="Due_Date"/></th>
              <td ><!--
              --><input required type="text" id="f_due_dt" name="f_due_dt" value="" style="width:75px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Due Date');" maxlength="10" ><!--
              --><button type="button" id="f_due_dt_cal" onclick="doDisplay('DATE3', frm1);" class="calendar" tabindex="-1"></button></td>
          </tr>
          <tr>
              <th><bean:message key="Tariff_Currency_Code"/></th>
              <td><!--
              --><select required name="f_curr_cd" style="width:75px;" onChange="setCurrency();"><!--
              --><option value=""></option><!--
              --><bean:define id="paramCurrList"  name="valMap" property="currList"/><!--
              --><logic:iterate id="CurrVO" name="paramCurrList"><!--
              --><option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option><!--
              --></logic:iterate><!--
              --></select></td>
          </tr>
          <tr>
             <th><label for="f_buy_inv_rcv"><bean:message key="Invoice_Received"/></label></th>
             <td><input type="checkbox" name="f_buy_inv_rcv" id="f_buy_inv_rcv" value="Y"></td>
          </tr>
          <tr>
              <th><label for="f_tax_bill"><bean:message key="Tax_Bill"/></label></th>
              <td><input type="checkbox" name="f_tax_bill" id="f_tax_bill" value="Y" disabled></td>
          </tr>
          <tr>
			  <th><bean:message key="Office"/></th>
			  <td><!--
              --><select name="f_ofc_cd" style="width:120px;"/><!--
              --><logic:iterate id="ofcVO" name="oficeList"><!--
              --><option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option><!--
              --></logic:iterate><!--
              --></select></td>
              <script type="text/javascript">
              		document.frm1.f_ofc_cd.value = '<%= ofc_cd %>';
              </script>
	      </tr>
	      
	      <tr>
	      	
           	  <th><bean:message key="Department"/></th>
              <td id="dept_cd" style="display:none"><!--
              --><select name="f_dept_cd" style="width:120px;"><!--
              --><bean:define id="departmentList"  name="valMap" property="departmentList"/><!--
              --><option value=""></option><!--
              --><logic:iterate id="DepartmentVO" name="departmentList"><!--
              --><option value='<bean:write name="DepartmentVO" property="cd_val"/>'><bean:write name="DepartmentVO" property="cd_nm"/><!--
              --></option><!--
              --></logic:iterate><!--
              --></select></td>
          </tr>
          <tr>
              <th><bean:message key="Remark"/></th>
              <td colspan="3"><textarea name="f_remark" maxlength="500" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);"  dataformat="excepthan" style="width:470;height:50px;"></textarea></td>
          </tr>
          </tbody>
	    </table>
	 </div>
	 
	<table class="line_bluedot"><tr><td></td></tr></table>
   	<div class="opus_design_grid">
 		<div class="opus_design_btn">
 			<button id="addrowBtn2" type="button" class="btn_accent" onclick="doWork('ROWADD')"><bean:message key="Add"/></button>
 		</div>
   		<script language="javascript">comSheetObject('sheet1');</script>
		<script language="javascript">comSheetObject('sheet2');</script>
   	</div>
	<div class="opus_design_inquiry">
		<table>
			<tr>
				<th style="display:none" width="50px"><bean:message key="Amount"/></th>
	            <td style="display:none"><input type="text" name="f_amt_tot" value="" style="width:100px;text-align:right;font-weight:bold"  readOnly></td>
	
				<th style="display:none" width="70px"><bean:message key="Vat_Amount"/></th>
	            <td style="display:none"><input type="text" name="f_vatamt_tot" value="" style="width:100px;text-align:right;font-weight:bold"  readOnly></td>
				<th><bean:message key="Total_Amount"/>
	            <input type="text" name="f_totamt_tot" value="" style="width:100px;text-align:right;font-weight:bold"  readOnly></th>
			</tr>
		</table>
	</div>
</div>
	</form>
	
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
		
</body>
</html>
