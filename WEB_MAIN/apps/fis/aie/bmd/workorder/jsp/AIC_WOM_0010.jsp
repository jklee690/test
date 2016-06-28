<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIC_WOM_0010.jsp
*@FileTitle  :
*@Description:
*@author     :
*@version    :
*@since      :
*@Change history:
*@author     :	Tuan.Chau	
*@version    :	2.0
*@since      :	2014-06-24
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/aie/bmd/workorder/script/AIC_WOM_0010.js"></script>

	<bean:define id="woPickDeliVO"  name="EventResponse" property="objVal"/>
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>

    <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
    <bean:define id="ofcVO" name="officeInfo"/>
	
	<bean:parameter name="air_sea_clss_cd" id="air_sea_clss_cd" value= ""/>
	<bean:parameter name="bnd_clss_cd" id="bnd_clss_cd" value =""/>
	<bean:parameter name="biz_clss_cd" id="biz_clss_cd" value=""/>

	<script language="javascript">
        function btnLoad(){
            if(frm1.wo_sts_cd.value=='NA'){
				/*
				if(frm1.bkg_no.value!=''){
	                btnAdd.style.display    = 'inline';
				}else{
					// booking no 가 없을때
					if(frm1.oth_seq.value == "") {
						// Other 에서 넘어온 Other seq 가 없으면 조회버튼 표시
						getObj('bkgBtn').style.display = 'inline';
					} else {
						// Other 에서 넘어온 Other seq 가 있으면 조회버튼 숨김
						getObj('bkgBtn').style.display = 'none';
					}
				}
				*/
			//저장
			}else if(frm1.wo_sts_cd.value=='A'){
			//	btnAdd.style.display   = 'none';
		        getObj('cancelObj').style.display= 'none';
		   		//btnBL.style.display= 'none';
				//btnModify.style.display   = 'inline';
		        getObj('btnDelete').style.display = 'inline';
		        getObj('btnPrint').style.display = 'inline';
				//issObj.style.display  = 'inline';
		        //btnCopy.style.display  = 'inline';

			//Issue
			}else if(frm1.wo_sts_cd.value=='B'){
            //    btnModify.style.display   = 'none';
				getObj('issObj').style.display   = 'none';
				getObj('btnDelete').style.display = 'none';

				getObj('btnPrint').style.display  = 'inline';
				getObj('cancelObj').style.display= 'inline';
				getObj('btnCopy').style.display  = 'inline';
			}
		}
        function setupPage(){
        	loadPage();
        	loadData();
        	btnLoad();
		}
        var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
	</script>
<form name="frm1" method="POST" action="./AIC_WOM_0010.clt">
	<input type="hidden" name="f_cmd">
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="mailTitle">
	<input type="hidden" name="mailTo">

	<input type="hidden" name="ofc_eng_nm" value="<%=userInfo.getOfc_eng_nm() %>">
	<input type="hidden" name="user_ofc_cd" value="<%=userInfo.getOfc_cd() %>">
	<input type="hidden" name="ofc_locl_nm" value="<%=userInfo.getOfc_locl_nm() %>">
	<input type="hidden" name="eml" value="<%=userInfo.getEml() %>">
	<input type="hidden" name="user_name" value="<%=userInfo.getUser_name() %>">
	<input type="hidden" name="user_fax" value="<%=userInfo.getFax() %>">
	<input type="hidden" name="user_phn" value="<%=userInfo.getPhn() %>">

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<input type="hidden" name="sys_ofc_cd" value="<bean:write name="valMap" property="sysOfcCd"/>">
	<input type="hidden" name="air_sea_clss_cd"  value="<bean:write name="air_sea_clss_cd"/>">
	<input type="hidden" name="bnd_clss_cd"  value="<bean:write name="bnd_clss_cd"/>">
	<input type="hidden" name="biz_clss_cd"  value="<bean:write name="biz_clss_cd"/>">

	<html:hidden name="woPickDeliVO" property="intg_bl_seq"/>
	<html:hidden name="woPickDeliVO" property="wo_sts_cd"/>
<!--	<html:hidden name="woPickDeliVO" property="bnd_clss_cd"/>-->
	<html:hidden name="woPickDeliVO" property="oth_seq"/>
	<input type="hidden" name="pkup_rmk" value="<bean:write name="ofcVO" property="pkup_rmk"/>">
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn"><!--
	   --><button type="button" class="btn_accent" onClick="doWork('SEARCH')" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!--
	   --><button type="button" class="btn_normal" onClick="doWork('NEW')" style="display: none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="New"/></button><!--
	   --><span style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_normal" id="btnSave" onClick="doWork('SAVE')" style='display:inline;'><bean:message key="Save"/></button></span><!--
	   --><span style="display: none;" btnAuth="<%= roleBtnVO.getAttr4() %>"><button type="button" class="btn_normal" id="btnDelete" onClick="doWork('REMOVE')" style="display: none;"><bean:message key="Delete"/></button></span><!--
	   --><span style="display: none;" bbtnAuth="ISSUE"><button type="button" class="btn_normal" id="issObj" onClick="doWork('ISSUE')" style="display: none;"><bean:message key="Issue"/></button></span><!--
	   --><span style="display: none;" btnAuth="CANCEL"><button type="button" class="btn_normal"  id="cancelObj" onClick="doWork('CANCEL')" style="display: none;"><bean:message key="Issue"/> <bean:message key="Cancel"/></button></span><!--
	   --><span style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" id="btnPrint" onClick="doWork('PRINT')" style="display: none;"><bean:message key="Print"/></button></span><!--
	   --><span style="display: none;" btnAuth="COPY"><button type="button" class="btn_normal" id="btnCopy" onClick="doWork('COPY')" style="display: none;"><bean:message key="Copy"/></button></span><!--
	   --><span  style="display: none;" btnAuth="HBL"><button type="button" class="btn_normal" onclick="doWork('HOUSEBL');" style="display: none;"><bean:message key="HBL"/></button></span>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
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
					<col width="120">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Work_Order_No"/></th>
						<td>
							<input tabindex="1" required type="text" name="f_wo_no" maxlength="20" value="<bean:write name="woPickDeliVO" property="wo_no"/>" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:135px"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('WO_POPLIST')"></button><!-- 
						 --></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result">
		<div class="layout_wrap">
			<div class="layout_flex_fixed" style="width:550px;float:left!important">
				<div class="opus_design_inquiry" style="width:100%">
				<table>
					<colgroup>
						<col width="120">
						<col width="145">
						<col width="90">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Work_Order_No"/></th>
							<td><input tabindex="2" name="wo_no" type="text"  maxlength="20" class="search_form-disable" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:135px" readOnly value='<bean:write name="woPickDeliVO" property="wo_no"/>' ></td>
							<th><bean:message key="WO_Kind"/></th>
							<td><!-- 
							 --><bean:define id="wotypeList" name="valMap" property="wotypeList"/><!-- 
							 --><html:select tabindex="3" name="woPickDeliVO" property="wo_tp_cd" styleClass="search_form" style="width:125px;"><!-- 
							 -->     <html:options collection="wotypeList" property="cd_val" labelProperty="cd_nm"/><!-- 
							 --></html:select><!-- 
							 --></td>
						</tr>
					</tbody>
				</table>
				<div id="org_route" style="display:block;" class="mar_top_8">
					<table>
						<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tbody>
                           <tr>
                               <th>
                               <logic:equal name="bnd_clss_cd" value="O">
                                   <bean:message key="Empty_Pickup"/>
                               </logic:equal>
                               <logic:notEqual name="bnd_clss_cd" value="O">
                                   <bean:message key="Pickup"/>
                               </logic:notEqual>
                               </th>
                               <td><!-- 
                                --><input tabindex="6" type="text"   name="pickup_trdp_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="pickup_trdp_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;"  onKeyDown="codeNameAction('partner_pickup',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_pickup',this, 'onBlur')"><!-- 
                                --><button type="button" class="input_seach_btn" tabindex="-1" id="pic" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
                                --><input tabindex="7" type="text"  maxlength="50"  name="pickup_trdp_nm" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:278px;" value='<bean:write name="woPickDeliVO" property="pickup_trdp_nm"/>' id="pic" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this);}"><!-- 
                                --></td>
                           </tr>
                           <tr>
                               <th><bean:message key="Address"/></th>
                               <td><textarea  tabindex="8" name="pickup_trdp_addr" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:391px;height:45px" maxlength="400" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)" ><bean:write name="woPickDeliVO" property="pickup_trdp_addr"/></textarea></td>
                           </tr>
                        </tbody>
					</table>
                        <table>
                        	<colgroup>
								<col width="120">
								<col width="87">
								<col width="95">
								<col width="*">
							</colgroup>
							<tbody>
	                            <tr>
	                                <th><bean:message key="Contact_Person"/></th>
	                                <td><input tabindex="9" name="pickup_pic" maxlength="50" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" value='<bean:write name="woPickDeliVO" property="pickup_pic"/>'></td>
	                                <th><bean:message key="Tel_Fax"/></th>
	                                <td><input tabindex="10" name="pickup_phn" maxlength="30" type="text" class="search_form" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:102px;" value='<bean:write name="woPickDeliVO" property="pickup_phn"/>'><!-- 
	                                 --><input tabindex="11" name="pickup_fax" maxlength="30" type="text" class="search_form" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:102px;" value='<bean:write name="woPickDeliVO" property="pickup_fax"/>'><!-- 
	                                 --></td>
	                            </tr>
	                             <tr>
	                               <th><bean:message key="Reference_No"/></th>
	                               <td><input tabindex="12" name="pickup_ref_no" value='<bean:write name="woPickDeliVO" property="pickup_ref_no"/>' maxlength="20" type="text" onBlur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:auto;text-transform:uppercase;width:80px;"'></td>
	                               <th><bean:message key="Pickup_Time"/></th>
								<td><!-- 
								 --><input tabindex="13" type="text" name="pickup_dt" value='<wrt:write name="woPickDeliVO" property="pickup_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'  maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onKeyUp="mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Pickup Date');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:78px;"><!-- 
								 --><button type="button" class="calendar ir" id="pickup_dt_cal" onclick="doDisplay('DATE1', frm1);"></button><!-- 
								 --><input tabindex="14" type="text" name="pickup_tm" value='<wrt:write name="woPickDeliVO" property="pickup_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onkeyPress="onlyNumberCheck();timeFormat(this)" onkeyup="timeFormat(this)" onBlur="chk_Time(this);"> ~ <!-- 
								 --><input tabindex="15" type="text" name="pickup_to_tm" value='<wrt:write name="woPickDeliVO" property="pickup_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onkeyPress="onlyNumberCheck();timeFormat(this)" onkeyup="timeFormat(this)" onBlur="chk_Time(this);"><!--
								 --></td>
	                             </tr>
	                          </tbody>
                         </table>
				</div>
				<div id="des_route" style="display:block;" class="mar_top_8">
                      <table>
                      	<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tbody>
                          <tr>
                              <th>
                               <logic:equal name="bnd_clss_cd" value="O">
                                   <bean:message key="Freight_Pickup"/>
                               </logic:equal>
                               <logic:notEqual name="bnd_clss_cd" value="O">
                                   <bean:message key="Delivery"/>
                               </logic:notEqual>
                               </th>
                              <td><!-- 
                               --><input tabindex="16" type="text"   name="delivery_trdp_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="delivery_trdp_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;"  onKeyDown="codeNameAction('partner_delivery',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_delivery',this, 'onBlur')"><!-- 
                               --><button type="button" class="input_seach_btn" tabindex="-1" id="del" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
                               --><input tabindex="17" type="text"   name="delivery_trdp_nm" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:278px;" onBlur="strToUpper(this);" value='<bean:write name="woPickDeliVO" property="delivery_trdp_nm"/>' id="del" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this);}"><!-- 
                               --></td>
                          </tr>
                          <tr>
                              <th><bean:message key="Address"/></th>
                              <td><textarea tabindex="18" name="delivery_trdp_addr" maxlength="400" class="search_form" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:391px;height:45px"><bean:write name="woPickDeliVO" property="delivery_trdp_addr"/></textarea></td>
                          </tr>
                         </tbody>
                      </table>
                      <table>
                      	  <colgroup>
								<col width="120">
								<col width="87">
								<col width="95">
								<col width="*">
							</colgroup>
							<tbody>
                          <tr>
                              <th><bean:message key="Contact_Person"/></th>
                              <td><input tabindex="19" name="delivery_pic" maxlength="50" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" value='<bean:write name="woPickDeliVO" property="delivery_pic"/>'></td>
                              <th><bean:message key="Tel_Fax"/></th>
                              <td><!-- 
                               --><input tabindex="20" name="delivery_phn" maxlength="30" type="text" class="search_form" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:102px;" value='<bean:write name="woPickDeliVO" property="delivery_phn"/>'><!-- 
                               --><input tabindex="21" name="delivery_fax" maxlength="30" type="text" class="search_form" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:102px;" value='<bean:write name="woPickDeliVO" property="delivery_fax"/>'><!-- 
                               --></td>
                          </tr>
                          <tr>
                              <th><bean:message key="Reference_No"/></th>
                              <td><input tabindex="22" name="delivery_ref_no"  value='<bean:write name="woPickDeliVO" property="delivery_ref_no"/>' maxlength="20" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:auto; text-transform:uppercase;width:80px;"></td>
                              <th><bean:message key="Delevery_Time"/></th>
							  <td><!-- 
							   --><input tabindex="23" type="text" name="delivery_dt" value='<wrt:write name="woPickDeliVO" property="delivery_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'  maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);"  onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Delivery Date');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:78px;"><!-- 
							   --><button type="button" class="calendar ir" id="delivery_dt_cal" onclick="doDisplay('DATE2', frm1);"></button><!-- 
							   --><input tabindex="24" type="text" name="delivery_tm"  value='<wrt:write name="woPickDeliVO" property="delivery_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onkeyPress="onlyNumberCheck();timeFormat(this);" onkeyup="timeFormat(this)" onBlur="chk_Time(this);"> ~ <!-- 
								 --><input tabindex="25" type="text" name="delivery_to_tm" value='<wrt:write name="woPickDeliVO" property="delivery_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onkeyPress="onlyNumberCheck();timeFormat(this)" onkeyup="timeFormat(this)" onBlur="chk_Time(this);"><!--
							   --></td>
                          </tr>
                          </tbody>
                      </table>
                     <table class="mar_top_8">
                     	<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th>
								<logic:equal name="bnd_clss_cd" value="O">
                                    <bean:message key="Loaded_Return"/>
                                </logic:equal>
                                <logic:notEqual name="bnd_clss_cd" value="O">
                                    <bean:message key="Return"/>
                                </logic:notEqual>
								</th>
	                            <td><!-- 
	                             --><input tabindex="26" type="text" name="return_trdp_cd" maxlength="20" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" value='<bean:write name="woPickDeliVO" property="return_trdp_cd"/>' onKeyDown="codeNameAction('partner_trsp',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_trsp',this, 'onBlur')"><!-- 
	                             --><button type="button" class="input_seach_btn" tabindex="-1" id="trn" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
	                             --><input tabindex="27" type="text" name="return_trdp_nm" maxlength="50" value='<bean:write name="woPickDeliVO" property="return_trdp_nm"/>' class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:278px;" id="trn" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this);}"><!-- 
	                             --></td>
	                        </tr>
	                        <tr>
	                            <th><bean:message key="Address"/></td>
	                            <td><textarea tabindex="28" name="return_trdp_addr" maxlength ="400" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:391px;height:45px"onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)"><bean:write name="woPickDeliVO" property="return_trdp_addr"/></textarea></td>
	                        </tr>
	                    </tbody>
					 </table>
                    <table>
                     	<colgroup>
							<col width="120">
							<col width="87">
							<col width="95">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Contact_Person"/></th>
	                            <td><input tabindex="29" name="return_pic" maxlength="50" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" value='<bean:write name="woPickDeliVO" property="return_pic"/>'></td>
	                            <th><bean:message key="Tel_Fax"/></th>
	                            <td><!-- 
	                             --><input tabindex="30" name="return_phn" maxlength="30" type="text" class="search_form" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:102px;" value='<bean:write name="woPickDeliVO" property="return_phn"/>'><!-- 
	                             --><input tabindex="31" name="return_fax" maxlength="30" type="text" class="search_form" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:102px;" value='<bean:write name="woPickDeliVO" property="return_fax"/>'><!-- 
	                             --></td>
	                             
	                         </tr>
	                         <tr>
	                             <th><bean:message key="Reference_No"/></th>
	                             <td><input tabindex="32" name="return_ref_no"  value='<bean:write name="woPickDeliVO" property="return_ref_no"/>' onBlur="strToUpper(this);" maxlength="20" type="text" class="search_form" dataformat="excepthan" style="ime-mode:auto; text-transform:uppercase;width:80px;"'></td>
	                             <th><bean:message key="Delevery_Time"/></th>
								 <td><!-- 
								  --><input tabindex="33" type="text" name="return_dt" value='<wrt:write name="woPickDeliVO" property="return_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'  maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);"  onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Delivery Date');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:78px;"><!-- 
								  --><button type="button" class="calendar ir" id="return_dt_cal" onclick="doDisplay('DATE3', frm1);"></button><!-- 
								  --><input tabindex="34" type="text" name="return_tm"  value='<wrt:write name="woPickDeliVO" property="return_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onkeyPress="onlyNumberCheck();timeFormat(this);" onkeyup="timeFormat(this)" onBlur="chk_Time(this);"> ~ <!-- 
								 --><input tabindex="35" type="text" name="return_to_tm" value='<wrt:write name="woPickDeliVO" property="return_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onkeyPress="onlyNumberCheck();timeFormat(this)" onkeyup="timeFormat(this)" onBlur="chk_Time(this);"><!--
								  --></td>
	                         </tr>
	                      </tbody>
                     </table>
                 </div>
			</div>
			 <div class="opus_design_grid" id="mainTable" style="width:510px;">
					<script type="text/javascript">comSheetObject('sheet1');</script>		
				</div>	
			</div>
			<div class="layout_flex_flex" style="padding-left:536px">
				<div class="opus_design_inquiry" style="width:100%">
				<table>
					<colgroup>
						<col width="105"></col>
						<col width="170"></col>
						<col width="70"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
					<tr>
						<logic:equal name="biz_clss_cd" value="H">
							<th><bean:message key="BL_No"/></th>
							<td><!-- 
							 --><input  tabindex="4" required type="text" name="bl_no" maxlength="40" value='<bean:write name="woPickDeliVO" property="bl_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px" onBlur="strToUpper(this);frm1.intg_bl_seq.value='';doWork('HBLSMRY');"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('HBL_POPLIST')"></button><!-- 
							 --></td>
							 <td></td>
							 <td></td>
						</logic:equal>
						<logic:equal name="biz_clss_cd" value="M">
							<th><bean:message key="BL_No"/></th>
							<td><!-- 
							 --><input tabindex="4" required type="text" name="mbl_no" maxlength="40" value='<bean:write name="woPickDeliVO" property="bl_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:125px" onBlur="strToUpper(this);frm1.intg_bl_seq.value='';doWork('HBLSMRY');"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('MBL_POPLIST')"></button><!-- 
							 --></td>
							<th><bean:message key="Ref_No"/></th>
							<td><!-- 
							 --><input  tabindex="5" required type="text" name="ref_no" maxlength="20" value='<bean:write name="woPickDeliVO" property="bill_to_ref_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px" onBlur="strToUpper(this);frm1.intg_bl_seq.value='';doWork('HBLSMRY');"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('REF_POPLIST')"></button><!-- 
							 --></td>
							 <td></td>
						</logic:equal>
						<logic:equal name="biz_clss_cd" value="">
							<th><bean:message key="Other_Reference_No"/></th>
							<td><input  tabindex="5" required type="text" name="oth_ref_no" id="oth_ref_no" maxlength="40" value='<bean:write name="woPickDeliVO" property="bl_no"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px" onChange="frm1.intg_bl_seq.value='';doWork('HBLSMRY');"></td>
							<td><button type="button" class="btn_etc" onclick="doWork('HBLSMRY');"><bean:message key="Search"/></button></td>
							<td></td>
						</logic:equal>
					</tr>
					<tr>
						<td colspan="5" style="display: none;">
							 <div class="opus_design_grid" style="display: none;">
								<script type="text/javascript">comSheetObject('sheet2');</script>		
							 </div>	
						</td>
					</tr>	
					</tbody>
				</table>
                  <table class="mar_top_8">
                  	<colgroup>
						<col width="105"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
                     <tr>
                        <th><bean:message key="Bill_To"/></th>
                        <td><!-- 
                         --><input tabindex="32" required type="text"   maxlength="20" name="bill_to_trdp_cd" value='<bean:write name="woPickDeliVO" property="bill_to_trdp_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:75px;"  onKeyDown="codeNameAction('partner_bill',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_bill',this, 'onBlur')"><!-- 
                         --><button type="button" class="input_seach_btn" tabindex="-1" id="bil" onclick="doWork('PARTNER_POPLIST',this)"></button><!-- 
                         --><input tabindex="33" required type="text"   maxlength="50"  name="bill_to_trdp_nm" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:238px;" onBlur="strToUpper(this);" value='<bean:write name="woPickDeliVO" property="bill_to_trdp_nm"/>' id="bil" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this);}"><!-- 
                         --></td>
                    </tr>
                    <tr>
                        <th><bean:message key="Address"/></th>
                        <td><textarea tabindex="34" required name="bill_to_trdp_addr" maxlength="400" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:346px;height:45px" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)"><bean:write name="woPickDeliVO" property="bill_to_trdp_addr"/></textarea></td>
                    </tr>
                    </tbody>
				</table>
				<table>
					<colgroup>
						<col width="105">
						<col width="87">
						<col width="95">
						<col width="*">
					</colgroup>
					<tbody>
                     <tr>
                         <th><bean:message key="Contact_Person"/></th>
                         <td><input tabindex="35" name="bill_to_pic" maxlength="50" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" value='<bean:write name="woPickDeliVO" property="bill_to_pic"/>'></td>
                         <th><bean:message key="Tel_Fax"/></th>
                         <td><!-- 
                          --><input  tabindex="36" name="bill_to_phn" maxlength="30" type="text" class="search_form" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:80px;" value='<bean:write name="woPickDeliVO" property="bill_to_phn"/>'><!-- 
                          --><input tabindex="37" name="bill_to_fax" maxlength="30" type="text" class="search_form" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:81px;" value='<bean:write name="woPickDeliVO" property="bill_to_fax"/>'><!-- 
                          --></td>
                     </tr>
                     <tr>
                         <th><bean:message key="Reference_No"/></th>
                         <td colspan="3"><input tabindex="38" name="bill_to_ref_no" value='<bean:write name="woPickDeliVO" property="bill_to_ref_no"/>' maxlength="20" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:auto; text-transform:uppercase;width:80px;"'></td>
                     </tr>
                 </table>
				<table class="mar_top_8">
					<colgroup>
						<col width="105"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
                    <tr>
                        <th><bean:message key="Trucker"/></th>
                        <td><!-- 
                         --><input type="text"  tabindex="39"  name="trucker_trdp_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="trucker_trdp_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;"  onKeyDown="codeNameAction('partner_trucker',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_trucker',this, 'onBlur')"><!-- 
                         --><button type="button" class="input_seach_btn" tabindex="-1" id="trk" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
                         --><input type="text" tabindex="40"  maxlength="50"  name="trucker_trdp_nm" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:234px;" value='<bean:write name="woPickDeliVO" property="trucker_trdp_nm"/>' id="trk" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this);}"><!-- 
                         --></td>
                      </tr>
                      <tr>
                          <th><bean:message key="Address"/></th>
                          <td><textarea tabindex="41" name="trucker_trdp_addr" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:347px;height:45px" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)" maxlength="400" ><bean:write name="woPickDeliVO" property="trucker_trdp_addr"/></textarea></td>
                      </tr>
                      </tbody>
				</table>
                <table>
                	<colgroup>
						<col width="105">
						<col width="87">
						<col width="95">
						<col width="*">
					</colgroup>
					<tbody>
	                    <tr>
	                        <th><bean:message key="Contact_Person"/></th>
	                        <!-- #34862 - [BINEX]Work Order - Trucker 정보 Link -->
	                        <td><input tabindex="42" name="trucker_pic" maxlength="50" type="text" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" value='<bean:write name="woPickDeliVO" property="trucker_pic"/>'></td>
	                        <th><bean:message key="Tel_Fax"/></th>
	                        <td><!-- 
	                         --><input tabindex="43" name="trucker_phn" maxlength="30" type="text" class="search_form" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:80px;" value='<bean:write name="woPickDeliVO" property="trucker_phn"/>'><!-- 
	                         --><input tabindex="44" name="trucker_fax" maxlength="30" type="text" class="search_form" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:81px;" value='<bean:write name="woPickDeliVO" property="trucker_fax"/>'><!-- 
	                         --></td>
	                    </tr>
	                 </tbody>
                </table>
                <table>
                	<colgroup>
                		<col width="105"></col>
                		<col width="235"></col>
                		<col width="85"></col>
                		<col width="*"></col>
                	</colgroup>
                	<tr>
                        <th><bean:message key="POL"/></th>
                        <td>
							<input tabindex="45" type="text" name="pol_cd" maxlength="5" value='<bean:write name="woPickDeliVO" property="pol_cd"/>' class="search_form-disable"  readOnly dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"  onBlur="strToUpper(this);"><!-- 
                         --><input tabindex="46" type="text" name="pol_nm"  value='<bean:write name="woPickDeliVO" property="pol_nm"/>' class="search_form-disable" readOnly maxlength="50" dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this);">
                         </td>
                        <th><bean:message key="POD"/></th>
                        <td>
							<input tabindex="47" type="text" name="pod_cd" maxlength="5" value='<bean:write name="woPickDeliVO" property="pod_cd"/>' class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" onBlur="strToUpper(this);"><!-- 
                         --><input tabindex="48" type="text" name="pod_nm" value='<bean:write name="woPickDeliVO" property="pod_nm"/>' class="search_form-disable" readOnly maxlength="50" dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this);">
                         </td>
                    </tr>
                    <tr>
                        <th><bean:message key="Commodity"/></th>
                        <td>
                        	<input tabindex="49" type="text" name="cgo_itm_cmdt_cd" maxlength="13" value='<bean:write name="woPickDeliVO" property="cgo_itm_cmdt_cd"/>' class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" onBlur="strToUpper(this);"><!-- 
                         --><input tabindex="50" type="text" name="cgo_itm_cmdt_nm" value='<bean:write name="woPickDeliVO" property="cgo_itm_cmdt_nm"/>' class="search_form-disable" readOnly maxlength="100" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onblur="strToUpper(this);">
						</td>
                        <th><bean:message key="Package"/></th>
                        <td>
                        	<input tabindex="51" type="text" name="cgo_pck_qty" maxlength="7" value="<wrt:write name="woPickDeliVO" property="cgo_pck_qty" formatType="MONEY" format="#,###"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right"><!-- 
                         --><bean:define id="pckList" name="valMap" property="pckCdList"/><!-- 
                         --><html:select tabindex="52" name="woPickDeliVO" property="cgo_pck_ut_cd" styleClass="search_form" style="width:140px;">
                             <option></option>
                             <html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
                            </html:select>
                         </td>
                    </tr>
                    </tbody>
                   </table>
               <table>
	               	<colgroup>
	               		<col width="105"></col>
                		<col width="235"></col>
                		<col width="85"></col>
                		<col width="*"></col>
	               	</colgroup>
	               	<tbody>
                    <tr>
						<th><bean:message key="GWeight"/></th>
						<logic:equal name="air_sea_clss_cd" value="A">
						<td><!-- 
						 --><input  tabindex="53"  required type="text" name="act_wgt_k" maxlength="10" value="<wrt:write name="woPickDeliVO" property="act_wgt_k" formatType="MONEY" format="#,##0.00"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,2);chkComma(this,8,2);weightChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
						 --><input tabindex="54"  required type="text" name="grs_wgt_ut_cd" value="K" style="width:20px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
						 --><input tabindex="55"  required type="text" name="act_wgt_l" maxlength="10" value="<wrt:write name="woPickDeliVO" property="act_wgt_l" formatType="MONEY" format="#,##0.00"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,2);chkComma(this,8,2);weightChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right;"><!-- 
						 --><input tabindex="56"  required type="text" name="grs_wgt_ut_cd1" value="L" style="width:20px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
						 --></td>
						</logic:equal> 
						<logic:notEqual name="air_sea_clss_cd" value="A">
						<td><!-- 
						 --><input  tabindex="53"   type="text" name="act_wgt_k" maxlength="10" value="<wrt:write name="woPickDeliVO" property="act_wgt_k" formatType="MONEY" format="#,##0.00"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,2);chkComma(this,8,2);weightChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
						 --><input tabindex="54"   type="text" name="grs_wgt_ut_cd" value="K" style="width:20px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
						 --><input tabindex="55"   type="text" name="act_wgt_l" maxlength="10" value="<wrt:write name="woPickDeliVO" property="act_wgt_l" formatType="MONEY" format="#,##0.00"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,2);chkComma(this,8,2);weightChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right;"><!-- 
						 --><input tabindex="56"   type="text" name="grs_wgt_ut_cd1" value="L" style="width:20px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
						 --></td>
						</logic:notEqual>
						<logic:equal name="air_sea_clss_cd" value="S">
							<th><bean:message key="Measurement"/></th>
						</logic:equal>
						<logic:equal name="air_sea_clss_cd" value="A">
							<th><bean:message key="Measurement"/></th>
						</logic:equal>
						<logic:equal name="air_sea_clss_cd" value="S">
							<td><!-- 
							 --><input tabindex="57" required type="text" name="cgo_meas_m" maxlength="11" value="<wrt:write name="woPickDeliVO" property="cgo_meas_m" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right;"><!-- 
							 --><input tabindex="58" required type="text" name="meas_ut_cd"  value="CBM" style="width:32px;border:0;background-color:transparent;" readOnly tabindex="5"><!-- 
							 --><input tabindex="59" required type="text" name="cgo_meas_f" maxlength="11" value="<wrt:write name="woPickDeliVO" property="cgo_meas_f" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right;"><!-- 
							 --><input tabindex="60" required type="text" name="meas_ut_cd1" value="CFT" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="6"><!-- 
	                         --><button id="ashipper" type="button" class="btn_etc" onClick="updateWgt()"><bean:message key="Update"/></button></td>
	                         <td></td>
						</logic:equal>
						<logic:notEqual name="air_sea_clss_cd" value="S">
							<td><!-- 
							 --><input tabindex="61" type="text" name="cgo_meas_m" maxlength="11" value="<wrt:write name="woPickDeliVO" property="cgo_meas_m" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right;"><!-- 
							 --><input tabindex="62" type="text" name="meas_ut_cd"  value="CBM" style="width:32px;border:0;background-color:transparent;" readOnly tabindex="5"><!-- 
							 --><input tabindex="63" type="text" name="cgo_meas_f" maxlength="11" value="<wrt:write name="woPickDeliVO" property="cgo_meas_f" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right;"><!-- 
							 --><input tabindex="64" type="text" name="meas_ut_cd1" value="CFT" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="6"><!-- 
							 --></td>
							 <td></td>
						</logic:notEqual>
					</tr>
					</tbody>
				</table>
				<table>
	               	<colgroup>
                		<col width="105"></col>
                		<col width="223"></col>
                		<col width="83"></col>
                		<col width="*"></col>
                	</colgroup>
	               	<tbody>	
					<tr>
                        <th> 
                           <logic:equal name="air_sea_clss_cd" value="S"> 
                           	<bean:message key="Liner"/> 
                           </logic:equal> 
                           <logic:equal name="air_sea_clss_cd" value=""> 
                           	<bean:message key="Liner"/> 
                           </logic:equal> 
                           <logic:equal name="air_sea_clss_cd" value="A"> 
                           	<bean:message key="Air_Line"/> 
                          	</logic:equal> 
                        </th>
                        <td> 
                        	<input tabindex="65" type="text" name="lnr_trdp_cd" maxlength="20"  value='<bean:write name="woPickDeliVO" property="lnr_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('partner_liner',this, 'onKeyDown')" onBlur="codeNameAction('partner_liner',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:auto;text-transform:uppercase;width:50px;"><!-- 
                         --><button type="button" class="input_seach_btn" tabindex="-1" id="liner" onClick="doWork('PARTNER_POPLIST', this)" ></button><!-- 
                         --><input tabindex="66" type="text" name="lnr_trdp_nm"  maxlength="50" value='<bean:write name="woPickDeliVO" property="lnr_trdp_nm"/>' class="search_form" onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="width:100px;ime-mode:auto;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', document.getElementById('liner'));}"><!-- 
                         --></td>
                       		<logic:equal name="air_sea_clss_cd" value="S">
	                            <th><bean:message key="Liner_Bkg_No"/></th>
	                            <td><input tabindex="67" type="text" name="lnr_bkg_no"  maxlength="20" value='<bean:write name="woPickDeliVO" property="lnr_bkg_no"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:auto;text-transform:uppercase;width:100px;"></td>
                            </logic:equal>
	                         <logic:notEqual name="air_sea_clss_cd" value="S">
	                         	<th></th>
	                         	<td>
	                           	 	<input tabindex="68" type="hidden" name="lnr_bkg_no" value="" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabledtext-transform:uppercase;width:100px;">
	                            </td>
	                         </logic:notEqual>
                         </tr>
                         <tr>
                          	<td colspan="4"><b><label for="print_md_yn"><bean:message key="Print_The_BL_Mark_Descriptio"/></label></b>&nbsp;<input tabindex="69" name="print_md_yn" id="print_md_yn" type="checkbox" value='<bean:write name="woPickDeliVO" property="prt_md_yn"/>'></td>
                         </tr>
                		 <tr>
                             <th><bean:message key="Remark"/></th>
                             <td colspan="3"><textarea tabindex="70" name="rmk" maxlength="1000" class="search_form" onblur="strToUpper(this)" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:540px;height:130px" onChange="lengthChk(this);"><bean:write name="woPickDeliVO" property="rmk"/></textarea></td>
                         </tr>
                        </tbody>
                 </table>
			</div>
			</div>
		</div>
	</div>
</form>
		
<script type="text/javascript">
doBtnAuthority(attr_extension);
</script>	