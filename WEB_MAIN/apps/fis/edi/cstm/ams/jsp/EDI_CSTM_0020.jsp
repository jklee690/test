<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : EDI_CSTM_0020.jsp
*@FileTitle  : 항공수출 미세관 AMS 화물적화목록 EDI 처리
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
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/edi/cstm/ams/script/EDI_CSTM_0020.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript">
		function setupPage(){
			initFinish();
			loadPage();
			doWork('SEARCHLIST01');
		}
	</script>
<form name="frm1" method="POST" action="./">
    <!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_edi_sts" id="f_edi_sts" />
    <input type="hidden" name="f_edi_cre_seq" id="f_edi_cre_seq" />
	<input type="hidden" name="f_edi_msg_seq" id="f_edi_msg_seq" />
    <input type="hidden" name="f_edi_msg_no" id="f_edi_msg_no" />
	<input type="hidden" name="obdt_fltno" id="obdt_fltno" />
	<input type="hidden" name="mbl_pck_qty" id="mbl_pck_qty" />
	<input type="hidden" name="mbl_grs_wgt" id="mbl_grs_wgt" />
	
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><%=LEV3_NM%></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST01')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal"   onclick="doWork('CALLCT')"><bean:message key="CTradeWorld"/></button> 
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
		        	<col width="90">
		        	<col width="90">
		        	<col width="*">
		        </colgroup>
		        <tbody>
					  <tr>
			                <th><bean:message key="MAWB"/></th>
			                <td>
			                    <input type="text" name="f_mawb" id="f_mawb" maxlength="40" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onKeyPress="doEnter();">
			                </td>
							<th><bean:message key="Onboard_Date"/></th>
							<td>
								<input type="text" name="f_obdt_str_dt" id="f_obdt_str_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)"/>~ <!--  
			                     --><input type="text" name="f_obdt_end_dt" id="f_obdt_end_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormat(this,event,false)" onKeyPress="doEnter();" onBlur="mkDateFormat(this, event, true)"/><!-- 
			                   	 --><button type="button" class="calendar" tabindex="-1"  id="f_obdt__dt_cal" onclick="doDisplay('DATE1', frm1);"></button>
							</td>
			                <th><bean:message key="Flight_No"/></th>
			                <td>
			                    <input type="text" name="f_flt_no" id="f_flt_no" maxlength="20" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onKeyPress="doEnter();">
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
						<span id="btn1"  style="display:none;">
								<button class="btn_normal" type="button"   onclick="doWork('COMMAND02')">전송자료 생성</button><!-- 
							 --><button class="btn_normal" type="button"  onclick="doWork('COMMAND03')">삭제</button><!-- 
							 --><button class="btn_normal" type="button"   onclick="doWork('RESET')">초기화</button>
						</span>
						<span id="btn2" style="display:none;">
							<button class="btn_normal" type="button"  onclick="doWork('COMMAND02')">전송자료 생성</button><!-- 
							--><button class="btn_normal" type="button"  onclick="doWork('COMMAND03')">삭제</button><!-- 
							--><button class="btn_normal" type="button"   onclick="doWork('COMMAND04')"><bean:message key="EDI_Send"/></button><!-- 
							--><button class="btn_normal" type="button"  onclick="doWork('RESET')">초기화</button>
						</span>
						<span id="btn3" style="display:none;">
							   <button class="btn_normal" type="button"  onclick="doWork('COMMAND02')">전송자료 생성</button><!-- 
							--><button class="btn_normal" type="button"  onclick="doWork('COMMAND06')"><bean:message key="EDI_Resend"/></button><!-- 
							--><button class="btn_normal" type="button"  onclick="doWork('RESET')">초기화</button>
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
							<th>MAWB</th>
							<td>
								<input type="text" name="disp_mawb_no" id="disp_mawb_no" style="width:90px" class="search_form"><!-- 
								 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('MBL_POPLIST');"></button><!-- 
								 --><button type="button"  onclick="checkMblInfos();" class="btn_etc">등록</button>
							</td>														
							<td id="ediView" style="display:none;">
										<span><strong>전문번호</strong></span>
										<span>
											<select name="sndKeyList" id="sndKeyList" style="width:125px;"></select><!-- 
											 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="showEdiMsg();" ></button><!-- 
											 --><input type="hidden" name="disp_edi_msg_no" id="disp_edi_msg_no" style="width:120px" class="search_form-disable" readonly>
										</span>
							</td>
							<th>상태</th>
							<td>
								<input type="text"   name="disp_edi_sts" id="disp_edi_sts" style="width:90px" class="search_form-disable" readonly><!-- 
								 --><input type="hidden" name="cur_edi_sts" id="cur_edi_sts">
							</td>
						</tr>
						</tbody>
					</table>
					
					<table>
				        <colgroup>
				        	<col width="90">
				        	<col width="80">
				        	<col width="90">
				        	<col width="80">
				        	<col width="90">
				        	<col width="80">
				        	<col width="90">
				        	<col width="*">
				        </colgroup>
				        <tbody>
							 <tr>
	                                <th>항공사</th>
	                                <td>
	                                    <input type="text" name="disp_trsp_co_scac_cd" style="width:70px" class="search_form-disable" readonly>
	                                </td>
	                                <th>편명</th>
	                                <td>
	                                    <input type="text" name="disp_flt_no" id="disp_flt_no" style="width:70px" class="search_form-disable" readonly>
	                                </td>
	                                <th>총수량</th>
	                                <td>
	                                    <input type="text" name="disp_pck_qty" id="disp_pck_qty" style="width:70px;align:right;" class="search_form-disable_right" readonly>
	                                </td>
	                                <th>전송유형</th>
	                                <td>
	                                    <select name="disp_ams_msg_snd_tp" id="disp_ams_msg_snd_tp" style="width:75px">
	                                        <option value=""> </option>
	                                        <option value="O">원본전송</option>
	                                        <option value="U">수정</option>
	                                    </select>
	                                </td>
	                            </tr>
	                            <tr>
	                                <th>출항일</th>
	                                <td>
	                                    <input type="text" name="disp_workday" id="disp_workday" style="width:70px" class="search_form-disable" readonly>
	                                </td>
	                                <th>출발지</th>
	                                <td>
										<input type="text" name="disp_pol"  id="disp_pol"   style="width:70px" class="search_form" maxlength="3">
	                                </td>
	                                <th>총중량</th>
	                                <td>
										<input type="text" name="disp_grs_wgt" id="disp_grs_wgt" style="width:70px;align:right;" class="search_form-disable_right" readonly>
	                                </td>
	                                <th>작성일자</th>
	                                <td>
	                                    <input type="text" name="disp_cre_dt" id="disp_cre_dt" style="width:75px" class="search_form-disable" readonly>
	                                </td>
	                            </tr>
	                            <tr>
	                                <th>포워더</th>
	                                <td>
										<input type="text" name="disp_fwrd_scac_cd" id="disp_fwrd_scac_cd" style="width:70px" class="search_form-disable" readonly>
	                                </td>
	                                <th>도착지</th>
	                                <td>
	                                    <input type="text" name="disp_pod" id="disp_pod"  style="width:70px" class="search_form" maxlength="3">
	                                </td>
	                                <th><bean:message key="HAWB_Count"/></th>
	                                <td>
										<input type="text" name="disp_bl_cnt" id="disp_bl_cnt" style="width:30px" class="search_form-disable_right" readonly>&nbsp;건
	                                </td>
	                                <th>전송일자</th>
	                                <td>
	                                    <input type="text" name="disp_smt_dt" id="disp_smt_dt" style="width:75px" class="search_form-disable" readonly>
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
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);
</script>