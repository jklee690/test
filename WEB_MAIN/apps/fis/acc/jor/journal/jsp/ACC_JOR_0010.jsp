<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0010.jsp
*@FileTitle  : Deposit Journal
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/20
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js"></script>
	<script type="text/javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0010.js"></script>
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm 	 = userInfo.getUser_name();
		String email 	 = userInfo.getEml();
		String cnt_cd 	 = userInfo.getOfc_cnt_cd();
		/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 */
		String fb_flg 		= userInfo.getFb_flg();
		/* LHK, 20130116, #25248, Void 권한 제어 */
		String vc_flg		= userInfo.getVc_flg();
		String oa_flg 		= userInfo.getOa_flg();
	%>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		function setupPage(){
			setSelection();
			loadPage();
			 }
	</script>
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<bean:define id="ofcVO"  name="valMap" property="ofcInfo"/>
	<bean:define id="jnr_no"  name="valMap" property="jnr_no"/>
	<bean:define id="cust_cd" name="valMap" property="cust_cd"/>
	<bean:define id="inv_no"  name="valMap" property="inv_no"/>
	<bean:define id="inv_tp"  name="valMap" property="inv_tp"/>
	<bean:define id="slip_post"  name="valMap" property="slip_post"/>
	<bean:define id="bankSel"  name="valMap" property="bankSel"/>
	<bean:define id="bankCurr"  name="valMap" property="bankCurr"/>
	<script>
		function setSelection(){
			//frm1.f_curr_cd.value = '<bean:write name="ofcVO" property="trf_cur_cd"/>';
			//LHK, 20131218 QnA #22627 [BINEX]Deposit/Payment 시 이종 Currency 처리 문제
			//1)Bank 의 Currency 를 보여준다.
			frm1.f_curr_cd.value = '<bean:write name="bankCurr"/>';
			//Japan에서는 선택없음
			if(frm1.f_cnt.value != "JP"){
				frm1.f_bank_cd.value = '<bean:write name="bankSel"/>';
			}
			//frm1.f_bank_cd.value = '<bean:write name="bankSel"/>';
			frm1.t_jnr_no.value  = '<bean:write name="jnr_no"/>';
			frm1.t_cust_cd.value = '<bean:write name="cust_cd"/>';
			frm1.t_inv_no.value  = '<bean:write name="inv_no"/>';
			frm1.t_inv_tp.value  = '<bean:write name="inv_tp"/>';   
		}
		function setSelection2(){
			//Japan에서는 선택없음
			if(frm1.f_cnt.value != "JP"){
				frm1.f_bank_cd.value = '<bean:write name="bankSel"/>';
			}
			frm1.f_curr_cd.value = '<bean:write name="bankCurr"/>';
			//frm1.f_bank_cd.value = '<bean:write name="bankSel"/>';
			frm1.t_jnr_no.value  = '<bean:write name="jnr_no"/>';
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
				//alert(btnflag);
				if (ref_ofc_cd == "") { btnflag = "Y"; }
				if (btnflag == "Y"){
					//기존유지
					//$("#btnModify").show(); 
				}else{
					$("#btnModify").hide(); 
					$("#btnPrint").hide(); 
				}  
		} 
		
	</script>
	<form name="frm1" method="POST" action="./ACC_JOR_0010.clt">
	<!--Command를 담는 공통 -->
	<input id="f_cmd" name="f_cmd" type="hidden" />
	<input id="f_CurPage" name="f_CurPage" type="hidden" />

	<input id="f_intg_bl_seq" name="f_intg_bl_seq" value="" type="hidden" />
	<input id="f_bl_no" name="f_bl_no" value="" type="hidden" />
	<input id="f_air_sea_clss_cd" name="f_air_sea_clss_cd" value="" type="hidden" />
	<input id="f_biz_clss_cd" name="f_biz_clss_cd" value="" type="hidden" />
	<input id="f_bnd_clss_cd" name="f_bnd_clss_cd" value="" type="hidden" />

	<input id="f_inv_seq" name="f_inv_seq" value="" type="hidden" />
	<input id="f_inv_no" name="f_inv_no" value="" type="hidden" />
	<input id="f_print_type" name="f_print_type" value="" type="hidden" />

	<input id="f_oth_seq" name="f_oth_seq" value="" type="hidden" />
	<input id="f_jnr_no" name="f_jnr_no" value="" type="hidden" />
	<input id="s_jnr_no" name="s_jnr_no" value="" type="hidden" />
	<input id="t_jnr_no" name="t_jnr_no" value="" type="hidden" />

	<input id="old_void_chk" name="old_void_chk" value="" type="hidden" />
	<input id="old_void_dt" name="old_void_dt" value="" type="hidden" />

	<input id="t_cust_cd" name="t_cust_cd" value="" type="hidden" />
	<input id="t_inv_no" name="t_inv_no" value="" type="hidden" />
	<input id="t_inv_tp" name="t_inv_tp" value="" type="hidden" />
	
	<input type="hidden" name ="slip_post" id ="slip_post" 			value="<bean:write name="slip_post"/>"/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name ="old_post_dt" id="old_post_dt" 		value=""/>
	
	<input type="hidden" name="f_cnt" id="f_cnt" value="<%=cnt_cd%>"/>
	<input type="hidden" name="role_cd" id="role_cd"  value="<%=userInfo.getRole_cd()%>" />
	
	<!-- #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 -->
	<input	type="hidden" name="fb_flg" id="fb_flg" value="<%= fb_flg %>"/>
	
	<!-- LHK, 20130116, #25248, Void 권한 제어 -->
	<input	type="hidden" name="vc_flg" id="vc_flg" value="<%= vc_flg %>"/>
	
	<!-- #50559 - [ALL GREEN] Payment/Deposit Search 후 Other Branch Access 관련 -->
	<input type="hidden" name="s_ofc_cd" id="s_ofc_cd"  value="" />
	<input type="hidden" name="oa_flg" id="oa_flg" value="<%= oa_flg %>"/>
	
	<input type="hidden" name="file_name" 			value=""/>
	<input type="hidden" name="rd_param"  			value=""/>
	<input type="hidden" name="title"    			value=""/>
	
	<!-- #51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가 -->
	<input id="f_ofc_cd" name="f_ofc_cd" value="" type="hidden" />
	
	
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
				<span id="saveBtn2" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_accent"  id="btnModify" onclick="doWork('MODIFY')"><bean:message key="Save"/></button></span><!-- 
				--><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button id="btnPrint" type="button" class="btn_normal" onclick="doWork('PRINT')"><bean:message key="Print"/></button></span><!--
				--><span style="display:none;"  btnAuth="COPY" id="copyBtn02" ><button type="button" class="btn_normal" style="display:none;" id="btnCopy" onclick="Copy()"><bean:message key="Copy"/></button></span><!-- 
 				--><span style="display:none;" btnAuth="CLEAR"><button type="button" class="btn_normal" onclick="clearAll();"><bean:message key="New"/></button></span><!--
				--><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"><button type="button" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button></span>
			</div>
			<!-- opus_design_btn(E) -->
    
  			<!-- page_location(S) -->
			<div class="location">	
				 <span><%=LEV1_NM%></span> &gt;
			 	 <span><%=LEV2_NM%></span> &gt;
			  	 <span><%=LEV3_NM%></span>
		   		<a href="" class="ir">URL Copy</a>
			</div>
			<!-- page_location(E) -->
	</div>
    <!-- page_title_area(E) -->
	
	<!-- inquiry_area(S) -->	
	<div class="wrap_search wrap_result_tab" style="padding-bottom: 0px;">
		<div class="layout_wrap" style="width:100%">	 			
	   		 <div class="layout_vertical_2" style="width:370px">
				<div class="opus_design_inquiry sm" style="height:130px;">
					<table>
					    <colgroup>
						        	<col width="290">
						        	<col width="*">
						</colgroup>
						<tbody>
						<tr>
							<td><h3 class="title_design mar_top_4" id='searchInfo'><bean:message key="Invoice_Search"/></h3></td>
							<td align="right">
								<span id='rtrvBtn01'>
									<button type="button" class="btn_etc" style="cursor:hand;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button>
								</span>
							</td>
						</tr>
						</tbody>
					</table>
					<table>	
							<colgroup>
						        	<col width="80">
						        	<col width="*">
						   </colgroup>
					        <tbody>
								<tr>
									<th><bean:message key="Customer"/></th>
			                        <td><!--  
							            --><input Required type="text" name="s_cust_cd" id="s_cust_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px" onKeyDown="codeNameAction('CUSTOMER',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('CUSTOMER',this, 'onBlur')" class="search_form"><!--
							            --><button type="button" class="input_seach_btn" tabindex="-1" id="customer1" onClick="doWork('CUSTOMER_POPLIST')"></button><!-- <!--
							            --><input Required type="text" name="s_cust_nm" id="s_cust_nm" maxlength="50" value="" onKeyDown="custEnterAction(this,'CUSTOMER')" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:168px" class="search_form">
			                        </td>
								</tr>
								<tr>
									<th><bean:message key="Invoice_No"/></th>
			                        <td><!--
							            --><input type="text" name="s_inv_no" id="s_inv_no" maxlength="50" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:241px" class="search_form" onKeyDown="enterInvoiceNo();"><!--
							            --><button type="button" class="input_seach_btn" tabindex="-1" id="imgInvget" onClick="searchInvList('INVGET')"></button>
			                        </td>
								</tr>
						</tbody>
					</table>
					
					<table>	
						<colgroup>
					        	<col width="95">
					        	<col width="136">
					        	<col width="*">
					   </colgroup>
					        <tbody>
								<tr>
									 <td style="text-align: right;"><!--
			                        	--><label for="dept_chk1"><bean:message key="AR"/></label> <input type="checkbox" name="dept_chk1" id="dept_chk1" value="1" checked>&nbsp;&nbsp;<!--
			                        	--><label for="dept_chk2"><bean:message key="B.DC"/></label>
									 </td>
									 <td><!--
			                        	--><input type="checkbox" name="dept_chk2" id="dept_chk2" value="2" checked>&nbsp;&nbsp;<!--
			                        	--><label for="dept_chk3"><bean:message key="AP"/></label>   <input type="checkbox" name="dept_chk3" id="dept_chk3" value="3" checked>
			                        </td>
			                        <td><!--
									 	--><input type="radio" name="his_chk" id="his_chk1" value="A"><label for="his_chk1"><bean:message key="All"/></label> &nbsp;<!--
			                        	--><input type="radio" name="his_chk" id="his_chk2" value="O" checked><label for="his_chk2"><bean:message key="Open"/></label> &nbsp;
			                        </td>
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
					        	<col width="100">
					        	<col width="100">
					        	<col width="84">
					        	<col width="100">
					        	<col width="126">
					        	<col width="*">
					   </colgroup>
					        <tbody>
								<tr>
										<th><bean:message key="Received_From"/></th>
				                        <td>
				                            <input Required type="text" name="f_rcv_from" id="f_rcv_from" maxlength="50" value="" onKeyDown="custEnterAction(this,'CUSTOMER2')" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:200px" class="search_form">
				                        </td>
				                        <th><bean:message key="Post_Date"/></th>
				                        <td><!--
				                            --><input Required type="text" name="f_post_dt" id="f_post_dt" value="" class="search_form" maxlength="10" onKeyUp="mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Post Date');checkPostDate();setPostDt();" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!--
											--><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="f_post_dt_cal" onclick="doDisplay('DATE3' ,frm1);" ></button>
				                        </td>
										<th><bean:message key="Received_Amount"/></th>
				                        <td>
								            <input type="text" name="f_rcv_amt" id="f_rcv_amt" value="" style="width:120px;text-align:right" class="search_form-disable" readOnly>
				                        </td>
								</tr>
								<tr>
									<th><bean:message key="Deposit_Bank"/></th>
			                        <td>
			                            <select Required name="f_bank_cd" id="f_bank_cd" style="width:200px;" onChange="chageBankCurrCd(this);">
			                            	<option value=""></option>
			                           			<bean:define id="paramBankList"  name="valMap" property="bankList"/>
												<logic:iterate id="BankVO" name="paramBankList">
			                           				<option value='<bean:write name="BankVO" property="bank_seq"/>'><bean:write name="BankVO" property="bank_nm"/></option>
			                           			</logic:iterate>
			                           	</select>
			                        </td>
			                        <th><bean:message key="Currency"/></th>
			                        <td>
			                            <input type="text" name="f_curr_cd" id="f_curr_cd" value="" style="width:40px;text-align:center" class="search_form-disable" readOnly>
			                        </td>
			                        <th><bean:message key="Check_No"/></th>
			                        <td>
			                            <input type="text" name="f_chk_no" id="f_chk_no" maxlength="20" value="" onblur="strToUpper(this);chkNoChg();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px" class="search_form">
			                        </td>
							</tr>
						</tbody>
					</table>
					
					<table>	
						<colgroup>
					        	<col width="100">
					        	<col width="53">
					        	<col width="36">
					        	<col width="84">
					        	<col width="96">
					        	<col width="118">
					        	<col width="95">
					        	<col width="*">
					   </colgroup>
					        <tbody>
								<tr>
			                      	<th><label for="deposit_chk"><bean:message key="Deposit"/></label></th>
			                      	<td>
			                      		<input type="checkbox" name="deposit_chk" id="deposit_chk" onClick="setDepositDate();depositClick();">
			                      	</td>
									<th><bean:message key="Deposit_Date"/></th>
			                        <td><!--
			                            --><input type="text" name="f_deposit_dt" value="" class="search_form" maxlength="10" onKeyUp="mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Deposit Date');chkDate(this, frm1.deposit_chk);checkDeposit();" dataformat="excepthan" style="ime-mode:disabled;width:70px;"><!--
										--><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="f_deposit_dt_cal" onclick="doDisplay('DATE1' ,frm1);"></button>
			                        </td>  
									<th style="width:40px;text-align: left;"><label for="void_chk">Void</label> <input type="checkbox" name="void_chk" id="void_chk" onClick="setVoidDate();voidClick();">
									<th><bean:message key="Void_Date"/>&nbsp;<input type="text" name="f_void_dt" value="" class="search_form" maxlength="10" onKeyUp="mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Void Date');chkDate(this, frm1.void_chk);checkVoid();" dataformat="excepthan" style="ime-mode:disabled;width:70px;"><!----><button type="button" class="calendar" tabindex="-1" id="f_void_dt_cal" onclick="doDisplay('DATE2' ,frm1);"></button>
			                        </th>
			                        <td></td>
			                        <td></td>
							</tr>
						</tbody>
					</table>
				</div>	
			</div>
		</div>
	</div>
	<!-- inquiry_area(E) -->
	<!-- grid_area(S) -->
	<div class="wrap_result">
		<div class="opus_design_grid" id="mainTable">
			<div class="opus_design_btn"><!-- 
				--><button type="button" class="btn_normal" id="addBtn02" style="cursor:hand" onclick="doWork('ROWADD')"><bean:message key="Add"/></button><!-- 
				--><button type="button" class="btn_normal" id="invBtn02" style="cursor:hand" onclick="searchInvList('INVADD')"><bean:message key="Invoice_Add"/></button>
			</div>
			<script type="text/javascript">comSheetObject('sheet1');</script>
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>
		
		<!-- inquiry_area(S) -->
		
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
		                        <td>
									<input type="text" name="f_inv_amt" id="f_inv_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
								</td>
								<th><bean:message key="Balance_Amount"/></th>
		                        <td>
									<input type="text" name="f_bal_amt" id="f_bal_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
								</td>
								<th><bean:message key="Pay_Amount"/></th>
		                        <td>
									<input type="text" name="f_pay_amt" id="f_pay_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
								</td>
								<td></td>
							</tr>
					</tbody>
				</table>
				<table>	
					<colgroup>
				        <col width="80"></col>
				   </colgroup>
					 <tr>
                          <th><bean:message key="Remark"/></th>
                          <td>
			           		<textarea name="f_remark" id="f_remark" onblur="setLimitText(frm1.f_remark,200);strToUpper(this);" dataformat="excepthan" style="width:527px;height:50px;"></textarea>
                          </td>
					</tr>
				</table>
			</div>
			<!-- inquiry_area(E) -->
	</div>
	<!-- grid_area(E) -->
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