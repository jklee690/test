<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    
    <title><bean:message key="system.title"/></title>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>

	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/edi/ams/air/script/EDI_AMS_0010.js"></script>
    
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    
    <script type="text/javascript">
		var ofc_cd = "<%=userInfo.getOfc_cd()%>";
		
		function setupPage(){
			loadPage();
		}
		
	</script>
</head>
<form name="frm1" method="POST" action="./EDI_DBA_0010.clt">
    <input type="hidden" name="f_cmd">

    <input type="hidden" name="h_intg_bl_seq">
    <input type="hidden" name="h_msg_no">
	
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="EDI_AMS_0010.clt"/>
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn"><!--
	   --><button style="cursor:hand; display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!--
	   --><button style="cursor:hand; display:none;" id="btnSave" name="btnSave" type="button" btnAuth="<%= roleBtnVO.getAttr3() %>" class="btn_normal" onclick="doWork('SAVE')"><bean:message key="Save"/></button><!--
	   --><button style="cursor:hand; display:none;" type="button" btnAuth="TRANSMIT" class="btn_normal" onclick="doWork('SEND_EDI')"><bean:message key="Send_EDI"/></button><!--
	   --><button style="cursor:hand; display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr4() %>" class="btn_normal" onClick="doWork('DELETE')"><bean:message key="Delete"/></button><!--
	   --><!-- button style="cursor:hand; display:none;" type="button" btnAuth="RECEIVE" class="btn_normal" onClick="doWork('RECEIVE')">Receive</button-->
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	
	<div class="wrap_search_tab">
	    <div class="opus_design_inquiry wFit">
                <table>
                	<colgroup>
                		<col width="70">
                		<col width="160">
                		<col width="50">
                		<col width="260">
                		<col width="50">
                		<col width="90">
                		<col width="55">
                		<col width="*">
                	</colgroup>
                    <tr>
                        <th><bean:message key="MAWB_No"/></th>
                        <td><!-- 
                         	--><input name="bl_no"  maxlength="40" value="" type="text" dataformat="excepthan" style="ime-mode:disabled;width:120;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch();">
                        </td>
						<th><bean:message key="ETD"/></th>
						<td><!-- 
							 --><input type="text" name="etd_strdt" id="etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.etd_enddt);firCalFlag=false;" size='11' maxlength="10"><!-- 
							 --><span class="dash">~</span><!--
							 --><input type="text" name="etd_enddt" id="etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.etd_strdt, this);firCalFlag=false;" size='11' maxlength="10"><!--
							 --><button type="button" id="etd_dt_cal" onclick="doDisplay('DATE11', frm1);" class="calendar" tabindex="-1"></button>
						</td>
						<th><bean:message key="Office"/></th>
						<td><!--
							-->
                               <bean:define id="oficeList" name="valMap" property="ofcList"/><!--  
                                --><input  type="hidden" name="s_ofc_cd" value="<bean:write name="valMap" property="ofc_cd"/>"/><!--  
                                --><select name="f_ofc_cd">
                               		<bean:size id="len" name="oficeList" />
                               	 	<logic:greaterThan name="len" value="1">
                                 	 	 <option value=''>ALL</option>
                               		 </logic:greaterThan>
                           			<logic:iterate id="ofcVO" name="oficeList">
                               	<logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
                                  <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
                               	</logic:equal>
                               	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
                                  <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
                               	</logic:notEqual>
                               </logic:iterate>
                             </select>
						</td>
						<th><bean:message key="Status"/></th>
						<td> 
							 <select name="f_status"/>
								 <option value=''></option>
								 <option value='C'>Created</option>
								 <option value='S'>Sent</option>
								 <option value='A'>Accepted</option>
								 <option value='R'>Rejected</option>
							 </select>
						</td>
						<td></td>
                    </tr>
                </table>
		</div>
	</div>
	
	<div class="wrap_result_tab">
	    <ul class="opus_design_tab">
	        <li class="nowTab"><a href="#" id=Tab01 style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Send"/></span></a></li>
	        <li><a href="#" id=Tab02 style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="History"/></span></a></li>
	    </ul>
	
	<div id="tabLayer" name="tabLayer"style="display:inline;">
		<div class="layout_wrap">
		    <div class="layout_flex_fixed" style="width:500px;float:left!important" >
				<h3 class="title_design"> <bean:message key="MAWB_List"/></h3>
		        <div class="opus_design_grid">
					<script language="javascript">comSheetObject('sheet1');</script>
				</div>
			</div>
			<div class="layout_flex_flex" style="padding-left: 508px;">
				<h3 class="title_design"> <bean:message key="HAWB_List"/></h3>
		        <div class="opus_design_grid">
						<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
			</div>
		</div>
	</div>
	
	<div id="tabLayer" name="tabLayer"style="display:none;">
		<div class="layout_wrap">
		    <div class="layout_vertical_2 pad_rgt_8">
				<h3 class="title_design"> <bean:message key="History"/></h3>
		        <div class="opus_design_grid">
						<script language="javascript">comSheetObject('sheet3');</script>
				</div>
			</div>
			<div class="layout_vertical_2">
				<div class="opus_design_inquiry" style="padding-top: 20px;">
		        	<textarea name="send_msg_txt" dataformat="excepthan" style="width:250px;height:395px;"></textarea>
		        </div>
		    </div>
		</div>
	</div>
	</div>                  
</form>
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>