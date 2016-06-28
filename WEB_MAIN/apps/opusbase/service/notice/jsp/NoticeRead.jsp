<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MGT_NTC_0030.jsp
*@FileTitle  : 게시판 내용확인 화면
*@Description: 게시판 내용확인합니다.
*@author     : Phi.Tran
*@version    : 20.6.2014



*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
 <link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>

	<bean:define id="ntcVO" name="EventResponse" property="objVal"/>
	<bean:define id="mapVO" name="EventResponse" property="mapVal"/>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script>
		function setupPage(){
			
		}
		function doWork(srcName){
			try {
				switch(srcName){
					case "SEARCHLIST":
						doShowProcess();
						fName.action = './NoticeList.clt';
						fName.submit();
					break;
                    case "COMMAND01":
                    	fName2.f_file_seq.value = '1';
						fName2.target = '_self';
                        fName2.submit();
                    break;
                    case "COMMAND02":
                    	fName2.f_file_seq.value = '2';
						fName2.target = '_self';
                        fName2.submit();
                    break;
                    case "COMMAND03":
                    	fName2.f_file_seq.value = '3';
						fName2.target = '_self';
                        fName2.submit();
                    break;
        <logic:notEmpty name="mapVO" property="WRITER">
                    case "MODIFY":
			            doShowProcess();
						fName.f_cmd.value = MODIFY;
                        fName.target = '_self';
                        fName.submit();
                    break;
        </logic:notEmpty>
 			    }
			}catch(e) {
				if( e == "[object Error]") {
					showErrMessage(getMsg('COM12111'));
				}else{
					showErrMessage(e);
				}
			}
		}
	</script>
<form name="fName" method="POST" action="./NoticeRead.clt">
    <input type="hidden" name="f_cmd" value="">
    <input type="hidden" name="f_CurPage" value="">

	<html:hidden name="mapVO" property="f_CurPage"/>
	<html:hidden name="mapVO" property="f_brd_seq"/>
	<html:hidden name="mapVO" property="f_dp_bgn_dt"/>
	<html:hidden name="mapVO" property="f_dp_end_dt"/>
	<html:hidden name="mapVO" property="f_wrt_id"/>
	<html:hidden name="mapVO" property="f_wrt_nm"/>
	
	<div class="layer_popup_title">
		<!-- page_title_area(S) -->
		<div class="page_title_area clear " style="width:950px !important;">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><span><%=LEV3_NM%></span></button></h2>
			<!-- page_title(E) -->
				
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn" >
				<button type="button" class="btn_normal" onclick="doWork('SEARCHLIST');"><bean:message key="List"/></button><!-- 
			--><logic:notEmpty name="mapVO" property="WRITER"><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('MODIFY');"><bean:message key="Modify"/></button>
				</logic:notEmpty>
			</div>
			<!-- opus_design_btn(E) -->	
			    <!-- page_location(S) -->
			<div class="location">
	        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
				
			</div>
	    <!-- page_location(E) -->
			
		</div>
		<!-- page_title_area(E) -->	
	</div>
	<div class="layer_popup_contents">
		<div class= "wrap_search">
		  <div class= "opus_design_inquiry" style="width:950px !important;">
		  	<table>
		  		<colgroup>
		  			<col width="150" />
		  			<col width="*" />
		  		</colgroup>
		  		<tbody>
		  			<tr>
						<td><bean:message key="Title"/></td>
						<td>
						   <input type="text" name="brd_tit"   value='<bean:write name="ntcVO" property="brd_tit"/>'class="search_form-disable" style="width:500;" readonly>
						</td>
					</tr>
		            <tr>
		                <td><bean:message key="Writer"/></td>
		                <td>
							<input type="text" name="disp_only" value='<bean:write name="ntcVO" property="modi_usrid"/>'      class="search_form-disable" style="width:67px;"  readonly><input type="text" name="disp_only" value='<bean:write name="ntcVO" property="modi_eng_usr_nm"/>' class="search_form-disable" style="width:120px;" readonly>
		                </td>
		            </tr>
				<logic:notEmpty name="ntcVO" property="file_url">
		            <tr>
		               <td width="80"><bean:message key="Attach_File"/> 1</td>
		               <td class="table_search_body">
		                  <a href="javascript:doWork('COMMAND01');"><b><bean:write name="ntcVO" property="file_url"/></b></a>
		               </td>
		           </tr>
		      	</logic:notEmpty>
				<logic:notEmpty name="ntcVO" property="file_url2">
		            <tr>
		               <td width="80"><bean:message key="Attach_File"/> 2</td>
		               <td class="table_search_body">
		                  <a href="javascript:doWork('COMMAND02');"><b><bean:write name="ntcVO" property="file_url2"/></b></a>
		               </td>
		           </tr>
		      	</logic:notEmpty>
				<logic:notEmpty name="ntcVO" property="file_url3">
		            <tr>
		               <td width="80"><bean:message key="Attach_File"/> 3</td>
		               <td class="table_search_body">
		                  <a href="javascript:doWork('COMMAND03');"><b><bean:write name="ntcVO" property="file_url3"/></b></a>
		               </td>
		           </tr>
		      	</logic:notEmpty>
		  		</tbody>
		  	</table>
		  	<table>
		  		<colgroup>
		  			<col width="150" />
		  			<col width="*" />
		  		</colgroup>
		  		<tbody>
		  			<tr>
		               <td><bean:message key="Contents"/></td>
		               <td>
		                  <textarea name="brd_ctnt" maxlength="1000" onkeypress="keyPress_maxLength(this);" style="width: 500px;" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" cols="160" rows="27" readonly><bean:write name="ntcVO" property="brd_ctnt"/></textarea>
		               </td>
		           </tr>
		  		</tbody>
		  	</table>
		  </div>
		 </div> 
	</div>
</form>
<form name="fName2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere"   value="fd"/>
    <input type="hidden" name="bcKey"     value="brdFileDown"/>
    <input type="hidden" name="f_brd_tp"  value="N"/>
    <input type="hidden" name="f_file_seq"   id="f_file_seq"  value="1"/>	
	<html:hidden name="mapVO" property="f_brd_seq"/>
</form>
<script>
	doHideProcess();
</script>
</body>
</html>