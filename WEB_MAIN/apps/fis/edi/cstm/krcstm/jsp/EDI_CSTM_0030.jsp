<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : EDI_CSTM_0030.jsp
*@FileTitle  : 항공수입 국내세관 화물적화목록 EDI 처리
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/25
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css"  rel="stylesheet" type="text/css">
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/edi/cstm/krcstm/script/EDI_CSTM_0030.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js"></script>

    <script type="text/javascript">
		var cstmCd = ''; 
		var cstmNm = '';
		var cstmDptCd = ''; 
		var cstmDptNm = '';
	
		<logic:notEmpty name="EventResponse" property="mapVal">
			<bean:define id="mapObj" name="EventResponse" property="mapVal"/>
			
			<logic:notEmpty name="mapObj" property="cstm_cd">
				<bean:define id="cstmObj" name="mapObj" property="cstm_cd"/>
				cstmCd = '<bean:write name="cstmObj" property="cd_val"/>';
				cstmNm = '<bean:write name="cstmObj" property="cd_lbl"/>';

				<logic:notEmpty name="mapObj" property="cstm_dpt_cd">	
					<bean:define id="cstmDptObj" name="mapObj" property="cstm_dpt_cd"/>
					cstmDptCd = '<bean:write name="cstmDptObj" property="cd_val"/>';
					cstmDptNm = '<bean:write name="cstmDptObj" property="cd_lbl"/>';
				</logic:notEmpty>	
			</logic:notEmpty>
		</logic:notEmpty>
	</script>
	<script type="text/javascript">
		function setupPage(){
			initFinish();
			loadPage();
			doWork('SEARCHLIST01');
		}
	</script>
<form name="frm1">
    <!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_edi_sts" id="f_edi_sts" />
    <input type="hidden" name="f_edi_cre_seq" id="f_edi_cre_seq" />
	<input type="hidden" name="f_edi_msg_seq" id="f_edi_msg_seq" />
    <input type="hidden" name="f_edi_msg_no" id="f_edi_msg_no" />
    <input type="hidden" name="f_mbl_no" id="f_mbl_no" />
    <input type="hidden" name="f_intg_bl_seq" id="f_intg_bl_seq" />
	<input type="hidden" name="obdt_fltno" id="obdt_fltno" />

	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><%=LEV3_NM%></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST01')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal"  onclick="doWork('CALLCT')"><bean:message key="CTradeWorld"/></button> 
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
	
	 <!-- wrap search (S) -->
 	<div class="wrap_search">
	    <!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry wFit">
			<h3 class="title_design"><bean:message key="Search_Condition"/></h3>	
		    <table>
		        <colgroup>
		        	<col width="60">
		        	<col width="140">
		        	<col width="90">
		        	<col width="*">
		        </colgroup>
		        <tbody>
					  <tr>
						<th>도착일자</th>
						<td>
		                        <input type="text" name="f_obdt_str_dt" id="f_obdt_str_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_obdt_end_dt);firCalFlag=false;"/>~ <!--  
		                     --><input type="text" name="f_obdt_end_dt" id="f_obdt_end_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_obdt_str_dt, this);firCalFlag=false;"/><!-- 
		                     --><button type="button" class="calendar" tabindex="-1"  id="f_obdt_dt_cal" onclick="doDisplay('DATE1', frm1);" ></button>
						</td>
		                <th><bean:message key="Flight_No"/></th>
		                <td>
		                    <input type="text" name="f_flt_no" id="f_flt_no" maxlength="20" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;">
		                </td>
		              </tr>
				 </tbody>
	        </table>
		</div>
	     <!-- inquiry_area(S) -->	
	</div>
	<!-- wrap search (E) -->	

	<div class="wrap_result">
		<div class="layout_wrap">
			<div class="layout_vertical_2" style="width:22%; margin-right:20px">
				<div class="opus_design_grid" id="mainTable">
					<div class="opus_design_btn">
						<button id="btn1"  class="btn_normal" type="button"  style="display:none;"  onclick="doWork('COMMAND01')">전송자료 생성</button>
						<span id="btn2" style="display:none;">
							   <button class="btn_normal" type="button"  onclick="doWork('COMMAND02')">전송자료 생성</button><!-- 
							--><button class="btn_normal" type="button"  onclick="doWork('COMMAND03')">삭제</button><!-- 
							--><button class="btn_normal" type="button"  onclick="doWork('COMMAND04')"><bean:message key="EDI_Send"/></button> 
						</span>
						<span id="btn3" style="display:none;">
							   <button class="btn_normal" type="button"  onclick="doWork('COMMAND02')">전송자료 생성</button><!-- 
							--><button class="btn_normal" type="button"  onclick="doWork('COMMAND06')"><bean:message key="EDI_Resend"/></button><!-- 
							--><button class="btn_normal" type="button"   onclick="doWork('COMMAND07')"><bean:message key="DCD"/></button>
						</span>
					</div>
					 <script type="text/javascript">comSheetObject('sheet1');</script>
				</div>
			</div>
			<div class="layout_vertical_2" style="width:60%">
				<div class="opus_design_inquiry wFit">
					<h3 class="title_design"><bean:message key="EDI_Result_Detail"/></h3>	
					<table>
				      <colgroup>
			        	<col width="90">
			        	<col width="90">
			        	<col width="70">
			        	<col width="*">
			        </colgroup>
				        <tbody>
						<tr>
                                <th><bean:message key="EDI_Number"/></th>
                                <td id="ediView" style="display:none;">
                                	<div>
										   <select name="sndKeyList" id="sndKeyList" style="width:125px;"></select><!--
										--><button type="button" class="input_seach_btn" tabindex="-1" onclick="showEdiMsg();"></button><!--
										--><input type="hidden" name="disp_edi_msg_no" id="disp_edi_msg_no" style="width:120px" class="search_form-disable" readonly>
									</div>
                                </td>
                                <th>상태</th>
                                <td>
                                    <input type="text" name="disp_edi_sts" id="disp_edi_sts" style="width:90px" class="search_form-disable" readonly><!-- 
									 --><input type="hidden" name="cur_edi_sts"  id="cur_edi_sts">
                                </td>
                            </tr>
                            <tr>
                                <th>도착일자</th>
                                <td>
                                    <input type="text" name="disp_workday" id="disp_workday" style="width:120px" class="search_form-disable" readonly>
                                </td>
                                <th>전송일자</th>
                                <td>
                                    <input type="text" name="disp_smt_dt" id="disp_smt_dt" style="width:125px" class="search_form-disable" readonly>
                                </td>
                            </tr>
                            <tr>
                                <th>편명</th>
                                <td>
                                    <input type="text" name="disp_flt_no" id="disp_flt_no" style="width:120px"  class="search_form-disable" readonly>
                                </td>
                                <th>세관</th>
                                <td>
                                        <input type="text" name="disp_cstm_cd" id="disp_cstm_cd" style="width:50px"  class="search_form" maxlength="3"  onKeyDown="if(window.event.keyCode==13){codeNameAction('OFC_CD',this, 'onKeyDown');}" onblur="codeNameAction('OFC_CD',this, 'onBlur')"><!-- 
                                     --><button type="button" class="input_seach_btn" tabindex="-1" onclick="getCode(this, true);"></button><!--
                                     --><input type="text" name="disp_cstm_nm" id="disp_cstm_nm" style="width:100px" class="search_form-disable" readonly>
                                </td>
                            </tr>
                            <tr>
                                <th><bean:message key="Deconsol"/></th>
                                <td>
                                    <input type="text" name="disp_decnsl_cmp_cd" id="disp_decnsl_cmp_cd" style="width:120px" class="search_form-disable" maxlength="4" value="GLAI" readonly>
                                </td>
                                <th>세관부서</th>
                                <td>
                                    <input type="text" name="disp_cstm_dept_cd" id="disp_cstm_dept_cd" style="width:50px"  class="search_form"  maxlength="3" onKeyDown="if(window.event.keyCode==13){codeNameAction('SUB_OFC_CD',this, 'onKeyDown');}" onblur="codeNameAction('SUB_OFC_CD',this, 'onBlur')"><!-- 
                                     --><button type="button" class="input_seach_btn" tabindex="-1" onclick="getCode(this, false);" ></button><!--
                                     --><input type="text" name="disp_cstm_dept_nm" id="disp_cstm_dept_nm" style="width:100px" class="search_form-disable" readonly>
                                </td>
                            </tr>
						</tbody>
					</table>
				</div>
				<div class="opus_design_grid" id="mainTable">
						<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
			</div>
		</div>
	</div>
</form>
<!-- <script type="text/javascript"> -->
<%-- 	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>"); --%>
<!-- </script>	 -->
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);
</script>