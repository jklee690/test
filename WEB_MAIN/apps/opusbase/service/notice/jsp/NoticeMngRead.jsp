<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MGT_NTC_0020.jsp
*@FileTitle  : 게시판 등록화면
*@Description: 게시판 등록/수정화면입니다.
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 21/07/2014
*@since      : 21/07/2014
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css">

	<bean:define id="mapVO" name="EventResponse" property="mapVal"/>
	<bean:define id="ntcVO" name="EventResponse" property="objVal"/>
	
    <script language="javascript" src="./apps/opusbase/service/notice/script/NoticeMngRead.js"></script>	
	
	<!-- 일자 및 달력팝업 호출 -->
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script>
    <logic:notEmpty name="mapVO" property="noticeDocExt">
            var noticeDocExt = '<bean:write name="mapVO" property="noticeDocExt"/>';        
    </logic:notEmpty>
		
	</script>
<script type="text/javascript">
<!--
function setupPage() {
	setDfDate();
	loadPage();
}
//-->
</script>
<form name="fName" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="f_cmd"     value="">
	<input type="hidden" name="f_brd_seq" value="<bean:write name="ntcVO" property="brd_seq"/>">
    <input type="hidden" name="f_brd_file1" value="<bean:write name="ntcVO" property="file_url"/>">
    <input type="hidden" name="f_brd_file2" value="<bean:write name="ntcVO" property="file_url2"/>">
    <input type="hidden" name="f_brd_file3" value="<bean:write name="ntcVO" property="file_url3"/>">
    <input type="hidden" name="save_yn" value="<bean:write name="ntcVO" property="save_yn"/>">
    <input type="hidden" name="file_no" value="">


	<!-- Email File관련 연동 추가 파라미터 -->
	<input type="hidden" name="f_eml_file_nm1" value="" />
	<input type="hidden" name="f_eml_file_nm2" value="" />
	<input type="hidden" name="f_eml_file_nm3" value="" />

	<html:hidden name="mapVO" property="f_CurPage"/>
    <html:hidden name="mapVO" property="f_dp_bgn_dt"/>
    <html:hidden name="mapVO" property="f_dp_end_dt"/>
    <html:hidden name="mapVO" property="f_wrt_id"/>
    <html:hidden name="mapVO" property="f_wrt_nm"/>
	
	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
			<logic:empty name="ntcVO" property="brd_seq"><!--
	   		--><button type="button" class="btn_accent" onclick="doWork('ADD')" id="btnAdd"><bean:message key="Save"/></button><!--
	   		--><button type="button" class="btn_normal" onclick="doWork('SEARCHLIST')"><bean:message key="List"/></button></logic:empty>
		   <logic:notEmpty name="ntcVO" property="brd_seq"><!--
	   		--><button type="button" class="btn_accent" id="btnModify" onclick="doWork('MODIFY');"><bean:message key="Save"/></button><!--
	   		--><button type="button" class="btn_normal" onclick="doWork('REMOVE')"><bean:message key="Delete"/></button><!--
	   		--><button type="button" class="btn_normal" onclick="doWork('SEARCHLIST')"><bean:message key="List"/></button></logic:notEmpty>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<div class="opus_design_inquiry">
          <table>
			<colgroup>
				<col width="120"></col>
				<col width="172"></col>
				<col width="120"></col>
				<col width="90"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>
				<tr>
                    <th><bean:message key="Title"/></th>
                    <td colspan="4">
                       <input type="text" required name="brd_tit" value="<bean:write name="ntcVO" property="brd_tit"/>" maxlength="100" style="width:500px;">
                    </td>
                </tr>
                <tr id="eml_to" style="display: none;">
                    <th><bean:message key="To"/></th>
                    <td colspan="3">
                       <input type="text" readonly="readonly" required name="eml_addr" value="<bean:write name="ntcVO" property="eml_addr"/>" maxlength="100" style="width:500px;">
                    </td>
                    <td><input type="checkBox" name="mail_yn" id="mail_yn" value="" checked="checked" onclick=""> <bean:message key="Send"/> <bean:message key="Email"/></td>
                </tr>
                <tr>
                    <th><bean:message key="Level"/></th>
                    <td><!--
                    --><select name="dp_scp"><!--
                    --><option value="P" <logic:equal name="ntcVO" property="dp_scp" value="P">selected</logic:equal>><bean:message key="Public"/></option><!--
                    --><option value="M" <logic:equal name="ntcVO" property="dp_scp" value="M">selected</logic:equal>><bean:message key="Private"/></option><!--
                    --></select>
                 	</td>
					<th><bean:message key="Notification_Period"/></th>
					<td><!--
                    --><%boolean dispDt = false; %><!--
                    --><logic:notEmpty name="ntcVO" property="dp_end_dt"><!--
                    --><logic:notEqual name="ntcVO" property="dp_end_dt" value="30001231"><% dispDt = true; %></logic:notEqual><!--
                    --></logic:notEmpty><!--
                    --><select name="f_period_tp" onchange="doDispDate(this)"><!--
                    --><option value="P" <% if(!dispDt){ %>selected<% } %> >Permanent</option><!--
                    --><option value="T" <% if(dispDt){ %>selected<% } %> >Temporary</option></select>
					</td>
					<td><!--
                    --><div id="dateDispObj" <% if(!dispDt){ %>style="display:none;"<% } %>><!--
                    --><input type="text" name="dp_end_dt" value="<wrt:write name="ntcVO" property="dp_end_dt" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onkeyup="mkDateFormat(this,event,false)" onblur="mkDateFormat(this, event, true)"><!--
                    --><button type="button" onclick="doDisplay('DATE1', fName);" class="calendar" tabindex="-1"></button></div>
					</td><td></td>
               </tr>
               <tr>
                    <th><bean:message key="Attach_File"/> 1</th>
                    <td colspan="4">
	                    <logic:notEmpty name="ntcVO" property="file_url"><bean:write name="ntcVO" property="file_url"/>&nbsp;&nbsp;<img onclick="doWork('REMOVE01');" src="<%=CLT_PATH%>/web/img/main/trash.gif" border="0" style="cursor:hand;" align="absmiddle"><br>
	                    </logic:notEmpty>
	                    <input type="file" name="brd_file" style="width:500px;">
                    </td>
                    <td></td>
               </tr>
               <tr>
                    <th><bean:message key="Attach_File"/> 2</th>
                    <td colspan="4">
	                    <logic:notEmpty name="ntcVO" property="file_url2"><bean:write name="ntcVO" property="file_url2"/>&nbsp;&nbsp;<img onclick="doWork('REMOVE02');" src="<%=CLT_PATH%>/web/img/main/trash.gif" border="0" style="cursor:hand;" align="absmiddle"><br>
	                    </logic:notEmpty>
	                    <input type="file" name="brd_file2" style="width:500px;">
                    </td>
                    <td></td>
               </tr>
               <tr>
                    <th><bean:message key="Attach_File"/> 3</th>
                    <td colspan="4">
	                    <logic:notEmpty name="ntcVO" property="file_url3"><bean:write name="ntcVO" property="file_url3"/>&nbsp;&nbsp;<img onclick="doWork('REMOVE03');" src="<%=CLT_PATH%>/web/img/main/trash.gif" border="0" style="cursor:hand;" align="absmiddle"><br>
	                    </logic:notEmpty>
	                    <input type="file" name="brd_file3" style="width:500px;">
                    </td>
                    <td></td>
               </tr>
               <tr>
                   <th><bean:message key="Contents"/></th>
                   <td colspan="4"><textarea name="brd_ctnt" style="text-transform:none;ime-mode:inactive" maxlength="2000" cols="160" rows="22" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="keyUp_maxLength(this);"><bean:write name="ntcVO" property="brd_ctnt"/></textarea></td>
               </tr>
			</tbody>
		</table>
	</div>
						
</form>
<form name="fName2" method="POST">
    <html:hidden name="mapVO" property="f_CurPage"/>
    <html:hidden name="mapVO" property="f_dp_bgn_dt"/>
    <html:hidden name="mapVO" property="f_dp_end_dt"/>
    <html:hidden name="mapVO" property="f_wrt_id"/>
    <html:hidden name="mapVO" property="f_wrt_nm"/>
</form>
<script>
	loadPage();
	doHideProcess();
</script>
