<%--
=========================================================
*@FileName   : ACC_JOR_0030.jsp
*@FileTitle  : Check Journal
*@Description: Check Journal
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/23
*@since      : 2011/11/23

*@Change history:
*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/10
*@since      : 2014/07/10
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js"></script>
	<script language="javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0030.js" ></script>
	
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm 	 = userInfo.getUser_name();
		String email 	 = userInfo.getEml();
		String userId 	 = userInfo.getUsrid();
		String cnt_cd 	 = userInfo.getOfc_cnt_cd();
		
		/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 */
		String fb_flg 		= userInfo.getFb_flg();	
		/* LHK, 20130116, #25248, Void 권한 제어 */
		String vc_flg		= userInfo.getVc_flg();
		/* LHK, 20140421, #27585, Print 권한 제어 */
		String prn_flg		= userInfo.getPrn_flg();
		String oa_flg 		= userInfo.getOa_flg();
	%>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>
	
	
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<bean:define id="ofcVO" name="valMap" property="ofcInfo"/>
	
	<bean:define id="jnrNo"   name="valMap" property="jnr_no"/>
	<bean:define id="cust_cd" name="valMap" property="cust_cd"/>
	<bean:define id="inv_no"  name="valMap" property="inv_no"/>
	<bean:define id="inv_tp"  name="valMap" property="inv_tp"/>
	<bean:define id="slip_post"  name="valMap" property="slip_post"/>
	
	<bean:define id="bankSel"  name="valMap" property="bankSel"/>
	<bean:define id="bankCurr"  name="valMap" property="bankCurr"/>
	
	<script>
		function setSelection(){

			//LHK, 20131218 QnA #22627 [BINEX]Deposit/Payment 시 이종 Currency 처리 문제
			//1)Bank 의 Currency 를 보여준다.
			frm1.f_curr_cd.value = '<bean:write name="bankCurr"/>';
			//Japan에서는 선택없음
			if(frm1.f_cnt.value != "JP"){
				frm1.f_bank_cd.value = '<bean:write name="bankSel"/>';
			}

			frm1.t_jnr_no.value  = '<bean:write name="jnrNo"/>';
			frm1.t_cust_cd.value = '<bean:write name="cust_cd"/>';
			frm1.t_inv_no.value  = '<bean:write name="inv_no"/>';
			frm1.t_inv_tp.value  = '<bean:write name="inv_tp"/>';  
		}
		
		function searchSelection(){
			
			//Japan에서는 선택없음
			if(frm1.f_cnt.value != "JP"){
				frm1.f_bank_cd.value = '<bean:write name="bankSel"/>';
			}

			frm1.t_jnr_no.value  = '<bean:write name="jnrNo"/>';
			frm1.t_cust_cd.value = '<bean:write name="cust_cd"/>';
			frm1.t_inv_no.value  = '<bean:write name="inv_no"/>';
			frm1.t_inv_tp.value  = '<bean:write name="inv_tp"/>';  
		}
		
		
		
		<!-- OFC_CD -->
		var OFCCD = '';
		
        <logic:notEmpty name="valMap" property="ofcList">
			<% boolean isBegin = false; %>
            <bean:define id="ofcList" name="valMap" property="ofcList"/>
            <logic:iterate id="ofcVO" name="ofcList">
                <% if(isBegin){ %>
                       OFCCD += '|';
                <% }else{
                       isBegin = true;
                   } %>
                OFCCD+= '<bean:write name="ofcVO" property="ofc_cd"/>';
            </logic:iterate>
        </logic:notEmpty>
        
        var CURRCD = '';
        <logic:notEmpty name="valMap" property="currList">
			<% boolean isBegin2 = false; %>
	        <bean:define id="currList" name="valMap" property="currList"/>
	        <logic:iterate id="currVO" name="currList">
	            <% if(isBegin2){ %>
	                   CURRCD += '|';
	            <% }else{
	                   isBegin2 = true;
	               } %>
	            CURRCD+= '<bean:write name="currVO"/>';
	        </logic:iterate>
    	</logic:notEmpty>
    	
    	
    	var GLCD = '';
        <logic:notEmpty name="valMap" property="glList">
			<% boolean isBegin3 = false; %>
	        <bean:define id="glList" name="valMap" property="glList"/>
	        <logic:iterate id="glVO" name="glList">
	            <% if(isBegin3){ %>
	            	   GLCD += '|';
	            <% }else{
	                   isBegin3 = true;
	               } %>
	            GLCD+= '<bean:write name="glVO" property="gl_cd"/>';
	        </logic:iterate>
    	</logic:notEmpty>

    	var BK_CURR_CD = '';
        <logic:notEmpty name="valMap" property="bankList">
			<% boolean isBegin4 = false; %>
	        <bean:define id="bankList" name="valMap" property="bankList"/>
	        <logic:iterate id="bankCurrVO" name="bankList">
	            <% if(isBegin4){ %>
	            	BK_CURR_CD += '|';
	            <% }else{
	            	isBegin4 = true;
	               } %>
	               BK_CURR_CD+= '<bean:write name="bankCurrVO" property="bank_seq"/>' + '-' + '<bean:write name="bankCurrVO" property="curr_cd"/>';
	        </logic:iterate>
    	</logic:notEmpty>
    	
		function fnbtnCtl(){ 
			
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
			//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
			var formObj=document.frm1;
			 

				//Enable Editing Other Office (ACCT) 
				var edoa_flg 		= "<%=userInfo.getEdoa_flg()%>"; //Enable Editing Other Office (ACCT) 
				var ofc_cd = "<%=userInfo.getOfc_cd()%>";
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
				}else{
					$("#btnModify").hide(); 
					$("#btnPrint").hide(); 
					$("#btnRiderPrint").hide(); 
				} 

		}
    	
    	function setupPage() {
    		setSelection();
    		loadPage();
    	}
	</script>
<form name="frm1" method="POST" action="./ACC_JOR_0030.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="f_inv_seq" 			value=""/>
	<input type="hidden" name="f_inv_no" 			value=""/>
	<input type="hidden" name="f_print_type" 		value=""/>
	
	<input type="hidden" name="f_jnr_no" 			value=""/>
	<input type="hidden" name="s_jnr_no" 			value=""/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name="t_jnr_no" 			value=""/> <!-- LIST에서 이동시 사용 -->
	
	<input type="hidden" name="old_void_chk" 		value=""/>
	<input type="hidden" name="old_void_dt" 		value=""/>
	
	<input type="hidden" name="file_name" 			value=""/>
	<input type="hidden" name="rd_param"  			value=""/>
	<input type="hidden" name="title"    			value=""/>
	<input type="hidden" name="proc_userid" 		value="<%=userId%>"/>
	
	<input type="hidden" name="f_rcv_amt"    		value=""/>
	
	<input type="hidden" name="t_cust_cd" 			value=""/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name="t_inv_no" 			value=""/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name="t_inv_tp" 			value=""/> <!-- LIST에서 이동시 사용 -->
	
	<input type="hidden" name="rider_yn"    		value=""/>
	
	<input type="hidden" name ="slip_post" 			value="<bean:write name="slip_post"/>"/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name ="old_post_dt" 		value=""/>
	
	<input type="hidden" name="f_cnt" value="<%=cnt_cd%>"/>
	<input type="hidden" name="role_cd"  value="<%=userInfo.getRole_cd()%>" />
	
	<input type="hidden" name ="print_auto_save" 		value=""/>
	
	<input type="hidden" name="f_chk_form" 			value=""/>
	
	<input type="hidden" name="f_cur_chk_no" 			value=""/>
	<input type="hidden" name="f_lst_chk_no" 			value=""/>
	
	<!-- #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 -->
	<input	type="hidden" name="fb_flg" value="<%= fb_flg %>"/>		
	
	<!-- LHK, 20130116, #25248, Void 권한 제어 -->
	<input	type="hidden" name="vc_flg" value="<%= vc_flg %>"/>
	
	<!-- LHK, 20140422, #27585, Print 권한 제어  -->
	<input	type="hidden" name="prn_flg" value="<%= prn_flg %>"/>
	
	<!-- #50559 - [ALL GREEN] Payment/Deposit Search 후 Other Branch Access 관련 -->
	<input type="hidden" name="s_ofc_cd" id="s_ofc_cd"  value="" />
	<input type="hidden" name="oa_flg" id="oa_flg" value="<%= oa_flg %>"/>
	

	<!-- #51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가 -->
	<input id="f_ofc_cd" name="f_ofc_cd" value="" type="hidden" />	
	
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn"><!--
	   --><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button id="btnModify" type="button" class="btn_accent" onclick="doWork('MODIFY')"><bean:message key="Save"/></button></span><!--
	   --><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button id="btnPrint" type="button" class="btn_normal" onclick="doWork('PRINT')"><bean:message key="Print"/></button></span><!--
	   --><span style="display:none;" btnAuth="RIDER_PRINT"><button id="btnRiderPrint" type="button" class="btn_normal" onclick="doWork('RIDERPRINT')"><bean:message key="Rider_Print"/></button></span><!--
	   --><span style="display:none;" btnAuth="COPY"><button id="btnCopy" type="button" class="btn_normal" onclick="doWork('COPY')"><bean:message key="Copy"/></button></span><!--
	   --><span style="display:none;" btnAuth="CLEAR"><button type="button" class="btn_normal" onclick="doWork('CLEAR')"><bean:message key="New"/></button></span><!--
	   --><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"><button type="button" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button></span>
	   </div>
	   
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<div class="wrap_search wrap_result_tab"  style="padding-bottom: 0px;">
	<!-- layout_wrap (S) -->
	<div class="layout_wrap" style="width: 100%;">
	    <div class="layout_vertical_2"  style="width:370px">
				<div class="opus_design_inquiry sm" style="height:130px;">
					<table>
						<tr>
							<td width="287px" id="searchInfo"><h3 class="title_design mar_top_4"><bean:message key="Invoice_Search"/></h3></td>
							<td align="right"><span id="rtrvBtn01"><button type="button" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_etc" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button></span></td>
						</tr>
					</table>
			    	<table>
			    		<colgroup>
			    			<col width="100px"></col>
			    			<col width="*"></col>
			    		</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Vendor"/></th>
		                        <td><!--
		                        --><input type="text" name="s_cust_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px" onKeyDown="codeNameAction('CUSTOMER',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('CUSTOMER',this, 'onBlur')" required ><!--
		                        --><button type="button" class="input_seach_btn" tabindex="-1" id="customer1" onclick="doWork('CUSTOMER_POPLIST')"></button><!--
		                        --><input type="text" name="s_cust_nm" maxlength="50" value="" onKeyDown="custEnterAction(this,'CUSTOMER')" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:134px" required></td>
							</tr>
							
							<tr>
		                        <th><bean:message key="Vendor_Invoice_No"/></th>
		                        <td><!--
		                        --><input type="text" name="s_inv_no" maxlength="50" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:208px" onKeyDown="enterInvoiceNo();"><!--
		                        --><button type="button" class="input_seach_btn" tabindex="-1" id="imgInvget" onClick="searchInvList('INVGET')"></button>
		                        </td>
							</tr>
						</tbody>
					</table>
					<table>
			    		<colgroup>
			    			<col width="100"></col>
			    			<col width="40"></col>
			    			<col width="40"></col>
			    			<col width="100"></col>
			    			<col width="*"></col>
			    		</colgroup>
						<tbody>
							<tr>
								<th><label for="dept_chk1"><bean:message key="AR"/></label> <input type="checkbox" name="dept_chk1" id="dept_chk1" value="1" checked></th>
								<th><label for="dept_chk2"><bean:message key="B.DC"/></label> <input type="checkbox" name="dept_chk2" id="dept_chk2" value="2" checked></th>
								<th><label for="dept_chk3"><bean:message key="AP"/></label> <input type="checkbox" name="dept_chk3" id="dept_chk3" value="3" checked></th>
								<th><input type="radio" name="his_chk" id="his_chk1" value="A"><label for="his_chk1"><bean:message key="All"/></label></th>
								<th style="text-align: left;padding-left: 5px;"><input type="radio" name="his_chk" id="his_chk2" value="O" checked><label for="his_chk2"><bean:message key="Open"/></label></th>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="layout_vertical_2" style="padding-left:8px;width:calc(100% - 378px)">
					<div class="opus_design_inquiry sm" style="height:130px;">
						<table>
							<tr>
								<td><h3 class="title_design mar_top_4"><bean:message key="Check_Information"/></h3></td>
							</tr>
						</table>
						<table>
							<colgroup>
								<col width="80"/>
			            		<col width="150"/>
			            		<col width="100"/>
			            		<col width="120"/>
			            		<col width="70"/>
			            		<col width="*"/>
							</colgroup>
							<tbody>
								<tr>
			                        <th><bean:message key="Paid_To"/></th>
			                        <td><!--
			                        --><input required type="text" name="s_paid_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px" onKeyDown="codeNameAction('CUSTOMER2',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('CUSTOMER2',this, 'onBlur')" ><!--
			                        --><button type="button" class="input_seach_btn" tabindex="-1" id="customer" onClick="doWork('CUSTOMER_POPLIST2')"></button><!--
			                        --><input required type="text" name="s_paid_nm" maxlength="50" value="" onKeyDown="custEnterAction(this,'CUSTOMER2')" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px" ></td>
			                        <th><bean:message key="Post_Date"/></th>
			                        <td colspan="3"><!--
			                        --><input type="text" name="f_post_dt" value="" required maxlength="10" onKeyUp="mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Post Date');checkPostDate();setPostDt();" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!--
			                        --><button type="button" id="f_post_dt_cal" onclick="doDisplay('DATE3' ,frm1);" class="calendar" tabindex="-1"></button></td>
								</tr>
								
								<tr>
									<th><bean:message key="Bank"/></th>
									<td><!--
			                        --><select name="f_bank_cd" style="width:213px;" onChange="chageBankCurrCd(this);setBankCurChkNo();" required><!--
			                        --><bean:define id="paramBankList"  name="valMap" property="bankList"/><!--
			                        --><logic:iterate id="BankVO" name="paramBankList"><!--
			                        --><option value='<bean:write name="BankVO" property="bank_seq"/>'><bean:write name="BankVO" property="bank_nm"/></option><!--
			                        --></logic:iterate></select></td>
			                        
			                        <th><bean:message key="Currency"/></th>
			                        <td><input type="text" name="f_curr_cd" value="" style="width:40px;text-align:center" class="search_form-disable" readOnly></td>
									<th><bean:message key="Check_No"/></th>
			                        <td><input type="text" name="f_chk_no" maxlength="20" value=""  onblur="strToUpper(this);chkNoChg();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:92px" ></td>
								</tr>
								
							</tbody>
						</table>
						<table>
							<colgroup>
								<col width="80">
			            		<col width="30">
			            		<col width="80">
			            		<col width="100">
			            		<col width="100">
			            		<col width="80">
			            		<col width="110">
			            		<col width="*">
							</colgroup>
							<tbody>
								<tr>
									<th><label for="deposit_chk">Clear</label></th>
									<td><input type="checkbox" name="deposit_chk" id="deposit_chk" onClick="setDepositDate();depositClick();"/></td>
									<th><bean:message key="Clear_Date"/></th>
									<td>
										<input type="text" name="f_deposit_dt" id="f_deposit_dt" value=""  maxlength="10" onKeyUp="mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Clear Date');chkDate(this, frm1.deposit_chk);checkDeposit();" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!--
			                        --><button type="button" id="f_deposit_dt_cal" onclick="doDisplay('DATE1' ,frm1);" class="calendar" tabindex="-1"></button>
									</td>
									<th><label for="void_chk">Void</label></th>
									<td><input type="checkbox" name="void_chk" id="void_chk" onClick="setVoidDate();voidClick();"></td>
									<th><bean:message key="Void_Date"/></th>
									<td>
										<input type="text" name="f_void_dt" value=""  maxlength="10" onKeyUp="mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Void Date');chkDate(this, frm1.void_chk);checkVoid();" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!--
			                        --><button type="button" id="f_void_dt_cal" onclick="doDisplay('DATE2' ,frm1);" class="calendar" tabindex="-1"></button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
	</div>
	</div>
	</div>

    <div class="wrap_result">
    	<div class="opus_design_grid" id="mainTable">
    		 <div class="opus_design_btn"><!--
		       --><button id="addBtn02" type="button" class="btn_accent" onclick="doWork('ROWADD')"><bean:message key="Add"/></button><!--
		       --><button type="button" class="btn_normal" id="invBtn02" onclick="searchInvList('INVADD')"><bean:message key="Invoice_Add"/></button>
		     </div>
    		<script language="javascript">comSheetObject('sheet1');</script>
			<script language="javascript">comSheetObject('sheet2');</script>
    	</div>
    	<div class="opus_design_inquiry" style="width:100%">
	    	<table>
	    		<colgroup>
				    <col width="500px"></col>
	    			<col width="110px"></col>
	    			<col width="110px"></col>
	    			<col width="110px"></col>
	    			<col width="110px"></col>
	    			<col width="110px"></col>
	    			<col width="*"></col>
				   </colgroup>
		    	<tbody>
		    		<tr>
		    			<td></td>
		    			<th>Invoice Amount</th>
                        <td><input type="text" name="f_inv_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></td>
						
						<th><bean:message key="Balance_Amount"/></th>
                        <td><input type="text" name="f_bal_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></td>
						
						<th><bean:message key="Pay_Amount"/></th>
                        <td><input type="text" name="f_pay_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></td>
                        <td></td>
		    		</tr>
		    	</tbody>
		    </table>
		    <table>
    			   <colgroup>
				       <col width="80"></col>
				   </colgroup>
                <tr id="remark">
                    <th><bean:message key="Remark"/></th>
                    <td><textarea name="f_remark"  onblur="setLimitText(frm1.f_remark,200);strToUpper(this);" dataformat="excepthan" style="width:527px;height:50px;"></textarea></td>
                </tr>
           </table>
   		</div>
	</div>
</form>
	
<script>
function setLimitText(obj, maxLength){
    if(obj.value.length > maxLength){
    	alert(getLabel2('FMS_COM_ALT030', new Array("200")));
        obj.value = obj.value.substring(0,maxLength);
        obj.focus();
        return;
     }
 }
 </script>
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
