<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0040.jsp
*@FileTitle  : HGBL등록
*@Description: HBL 등록 및 조회
*@author     : PhiTran
*@version    : 2104/06/20

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
     <link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>

    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/sei/bmd/masterbl/script/SEI_BMD_0040.js"></script>
    
    <%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
	%>
	
	<script>	

		function dispBizBtns(dispTp){
			//Freight버튼
			getObj("sdBtns").style.display    = dispTp;
			getObj("bcBtns").style.display    = dispTp;
			getObj("dcBtns").style.display    = dispTp;
			getObj("finalModiObj").style.display = 'none';
		}
        function btnLoad(){ 
        	
        	
        	getObj("btnSave").style.display = 'inline';
        	
        	
        	frm1.ref_no.className = 'search_form';
		    frm1.ref_no.readOnly  = false;
		    
			if(user_lang_cd == "KO"){
				getObj("printObj").style.display 		= 'inline';
            }else{
            	getObj("printObj").style.display 		= 'none';
            } 
        	
            if(frm1.bl_sts_cd.value=='NA'){
            	getObj("btnAccounting").style.display = 'none';    
            }else{
            	getObj("btnPProfit").style.display  = 'inline';	
                 if(frm1.bl_sts_cd.value=='MC'){
                	 getObj("btnDelete").style.display   = 'inline';
                	 getObj("fileUp").style.display  = 'inline';
                	 getObj("sDoc").style.display  = 'inline';
		             getObj("btnCopy").style.display = 'inline';
                	 getObj("hblObj").style.display  = 'inline';

					dispBizBtns('inline');
					
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
				}else if(frm1.bl_sts_cd.value=='MF'){
					getObj("btnDelete").style.display   = 'none';
					getObj("fileUp").style.display  = 'none';
					getObj("sDoc").style.display  = 'none';
					getObj("btnCopy").style.display = 'inline';
					getObj("hblObj").style.display = 'inline';

					dispBizBtns('inline');
					
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
                }else if(frm1.bl_sts_cd.value=='HO'){
                	//printObj").style.display = 'inline';
                	if(user_lang_cd == "KO"){
                		getObj("printObj").style.display 		= 'inline';
    	            }else{
    	            	getObj("printObj").style.display 		= 'none';
    	            } 
                	getObj("btnAccounting").style.display = 'inline';
                	getObj("btnAdd").style.display = 'none';
                	getObj("btnModify").style.display = 'none';
                	getObj("closeModiObj").style.display = 'inline';
                	getObj("btnCopy").style.display = 'inline';
                	getObj("btnDelete").style.display = 'none';
                	getObj("hblObj").style.display = 'inline';

                	dispBizBtns('none');  
                	
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
                }else if(frm1.bl_sts_cd.value=='HF'){
                	if(user_lang_cd == "KO"){
                		getObj("printObj").style.display 		= 'inline';
    	            }else{
    	            	getObj("printObj").style.display 		= 'none';
    	            } 
                	getObj("btnAccounting").style.display = 'inline';
                	getObj("btnSave").style.display = 'none';
                	getObj("closeModiObj").style.display = 'inline';
                	getObj("btnCopy").style.display = 'inline';
                	getObj("btnDelete").style.display = 'none';
                	getObj("hblObj").style.display = 'none';

                	dispBizBtns('none');
                	
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
					
					// #48835 - [CARGOIS] COPY 한 HBL 의 이상한 현상
		            // Block 된 B/L일 경우 Filing No 수정 못하도록 수정
		           	frm1.ref_no.className = 'search_form-disable';
		            frm1.ref_no.readOnly  = true;
                }
            }
            
            fnbtnCtl();
        }

        var TPCD1 = '';
        var TPCD2 = '';
        <% boolean isBegin = false; %>
        <!--Role 코드조회-->
        <bean:define id="tpszList"  name="valMap" property="cntrTpszList"/>
        <logic:iterate id="codeVO" name="tpszList">
            <% if(isBegin){ %>
                TPCD1+= '|';
                TPCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
            TPCD1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
            TPCD2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
        </logic:iterate>
		
		<!-- ###Package 코드## -->
		var PCKCD1 = '|';
		var PCKCD2 = '|';
		<% isBegin = false; %>
        <bean:define id="pckList" name="valMap" property="pckCdList"/>
		<logic:iterate id="pckVO" name="pckList">
			<% if(isBegin){ %>
				PCKCD1+= '|';
				PCKCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PCKCD1+= '<bean:write name="pckVO" property="pck_nm"/>';
			PCKCD2+= '<bean:write name="pckVO" property="pck_ut_cd"/>';
		</logic:iterate>

		<!-- ###Lease Term 코드## -->
        var LSTCD1 = '|';
        var LSTCD2 = '|';
        <% isBegin = false; %>
        <bean:define id="leaList" name="valMap" property="leaseCdList"/>
        <logic:iterate id="pckVO" name="leaList">
            <% if(isBegin){ %>
                LSTCD1+= '|';
                LSTCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
            LSTCD1+= '<bean:write name="pckVO" property="cd_nm"/>';
            LSTCD2+= '<bean:write name="pckVO" property="cd_val"/>';
        </logic:iterate>

        <!-- ###Freight 항목### -->
		var UNITCD1 = ' |';
		var UNITCD2 = ' |';
		<!-- Freight Unit 단위 -->
        <logic:notEmpty name="valMap" property="UNITCD">
			<% isBegin = false; %>
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
        
        <!-- ###FRT_CD LIST 항목 AR### -->
        var ARFRTCD1 = ' |';
		var ARFRTCD2 = ' |';
		<% isBegin = false; %>
        <bean:define id="arFrtCdList" name="valMap" property="arFrtCdList"/>
		<logic:iterate id="FrtCdVO" name="arFrtCdList">
			<% if(isBegin){ %>
				ARFRTCD1+= '|';
				ARFRTCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   ARFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
			   ARFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
		</logic:iterate>
        
        <!-- ###FRT_CD LIST 항목 AP### -->
        var APFRTCD1 = ' |';
		var APFRTCD2 = ' |';
		<% isBegin = false; %>
        <bean:define id="apFrtCdList" name="valMap" property="apFrtCdList"/>
		<logic:iterate id="FrtCdVO" name="apFrtCdList">
			<% if(isBegin){ %>
				APFRTCD1+= '|';
				APFRTCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   APFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
			   APFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
		</logic:iterate>
        
        <!-- ###FRT_CD LIST 항목 DC### -->
        var DCFRTCD1 = ' |';
		var DCFRTCD2 = ' |';
		<% isBegin = false; %>
        <bean:define id="dcFrtCdList" name="valMap" property="dcFrtCdList"/>
		<logic:iterate id="FrtCdVO" name="dcFrtCdList">
			<% if(isBegin){ %>
				DCFRTCD1+= '|';
				DCFRTCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   DCFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
			   DCFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
		</logic:iterate>

		<!-- 요구사항 #25606 : [B/L Entry] B/L에서의 Freight Input 시 Currency 선택 옵션 변경 //-->
        var CURRCD = '';
		<% isBegin = false; %>
        <bean:define id="currCdList" name="valMap" property="currCdList"/>
        <logic:iterate id="codeVO" name="currCdList">
            <% if(isBegin){ %>
                   CURRCD += '|';
            <% }else{
            	isBegin = true;
               } %>
            CURRCD+= '<bean:write name="codeVO" property="cd_val"/>';
        </logic:iterate>
    	
		<!-- Currency 조회 -->
		<%  String ofc_curr     = "";
		    String partner_curr = "";
		%>
        <logic:notEmpty name="valMap" property="OfcCurrency">
            <bean:define id="curMap" name="valMap" property="OfcCurrency"/>
            <%  HashMap tmpMap = (HashMap)curMap;
                ofc_curr     = (String)tmpMap.get("ofccurr_cd");
                partner_curr = (String)tmpMap.get("tocurr_cd");
            %>
        </logic:notEmpty>
        
        <!-- ###Office Info## -->
        <% isBegin = false; %>
        <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
        var v_ofc_cd = "<bean:write name="ofcVO" property="ofc_cd"/>";
        var oth_wgt_ut_cd = "";
        var oth_meas_ut_cd = "";
        var oth_size_ut_cd = "<bean:write name="ofcVO" property="oth_size_ut_cd"/>";
        var sea_body = "<bean:write name="ofcVO" property="sea_body"/>";
        var sea_cob = "<bean:write name="ofcVO" property="sea_cob"/>";
        var sea_mei = "<bean:write name="ofcVO" property="sea_mei"/>";
        var sea_msco = "<bean:write name="ofcVO" property="sea_msco"/>";
        var vsl_show_flg = "<bean:write name="ofcVO" property="vsl_show_flg"/>";
        var load_port_show_flg = "<bean:write name="ofcVO" property="load_port_show_flg"/>";
        var ofc_post_dt = "<bean:write name="ofcVO" property="post_dt_imp"/>";
        var ofc_curr_cd = "<bean:write name="ofcVO" property="trf_cur_cd"/>";
        var pps_use_flg = "<bean:write name="ofcVO" property="pps_use_flg"/>";

        var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
        var user_role_cd = "<%=userInfo.getRole_cd()%>";
        var user_lang_cd = "<%=userInfo.getUse_lang_cd()%>";
        var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
        function setupPage()
        {
        	loadPage();setOfficeData();btnLoad();doHideProcess();loadData();
        }
        var attr_extension = "<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>";
        
        





		function fnbtnCtl(){
			
			
			doBtnAuthority(attr_extension); 
			
			
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
			//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
			var formObj=document.frm1;
			var edob_flg 		= "<%=userInfo.getEdob_flg()%>"; //ENABLE EDITING OTHER OFFICE (B/L) 
			var ofc_cd 		= "<%=ofc_cd%>";  
			var ref_ofc_cd =  formObj.h_ref_ofc_cd.value;
			//alert(edob_flg + " "+ofc_cd+" "+ref_ofc_cd);
			var btnflag = "Y";
			if (edob_flg == "N"){
				if (ofc_cd != ref_ofc_cd){  
					btnflag = "N";
				}
			}  
			if (ref_ofc_cd == "") {  btnflag = "Y"; }
			//alert(btnflag);
			if (btnflag == "Y"){
				//기존유지
				//$("#btnSave").show();
				//$("#closeModiObj").show();
				//$("#btnDelete").show(); 
			}else{
				$("#btnSave").hide();
				//$("#closeModiObj").hide();
				$("#btnDelete").hide(); 
				$("#printObj").hide(); 
			}
 

			 
		}
		
   </script>

<form name="frm1" method="POST" action="./SEI_BMD_0040.clt" class="filter">
	<input type="hidden" name="f_cmd" id="f_cmd">
	<html:hidden name="hblVO"  property="bl_sts_cd"/>	
    <html:hidden name="hblVO"  property="intg_bl_seq"/>
	<html:hidden name="valMap" property="f_intg_bl_seq"/>
		
	<input type="hidden" name="c_mrn"       id="c_mrn"  value="<bean:write name="hblVO" property="mrn"/>">
	<input type="hidden" name="c_bl_ser_no" id="c_bl_ser_no" value="<bean:write name="hblVO" property="bl_ser_no"/>">
		
	<input type="hidden" name="mk_bl_no"     id="mk_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
	<input type="hidden" name="h_bl_no"     id="h_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
	
	<input type="hidden" name="file_name" id="file_name">
	<input type="hidden" name="title" id="title">
	<input type="hidden" name="rd_param" id="rd_param">
	<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input	type="hidden" name="f_usr_nm" id="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  id="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" id="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_cnt_cd" id="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<!-- check freight -->
    <input type="hidden" name="chk_fr_trdp_cd" id="chk_fr_trdp_cd"      value="">  
    <input type="hidden" name="chk_fr_trdp_nm" id="chk_fr_trdp_nm"     value=""> 
    <input type="hidden" name="chk_fr_inv_curr_cd" id="chk_fr_inv_curr_cd" value=""> 
    
    <!-- 조회된 Ref_no , ref 번호 변경시 비교를 위해서 -->
    <input type="hidden" name="sel_ref_no" id="sel_ref_no"  value='<bean:write name="hblVO" property="ref_no"/>'>
    
    <!-- 업데이트 시에 변경된 값과 비교해 보기 위해서 -->
    <input type="hidden" name="org_post_dt"  id="org_post_dt" value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>
     
     <!-- 업데이트 시에 변경된 값과 비교해 보기 위해서 Block page에서 post_dt 변경후 화면에서 아래 값들을 변경 체크 위해 유지 -->     
    <input type="hidden" name="org_etd_dt_tm"  id="org_etd_dt_tm" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>
    <input type="hidden" name="org_eta_dt_tm"  id="org_eta_dt_tm" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>
    <input type="hidden" name="org_f_eta_dt_tm"  id="org_f_eta_dt_tm" value='<wrt:write name="hblVO" property="f_eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>
    
    <!--  jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. -->
    <input type="hidden" name="f_isNumSep"  id="f_isNumSep" 	value='<bean:write name="valMap" property="f_isNumSep"/>'>      
	<div id="WORKING_IMG" style="position: fixed;left: 0; right: 0; bottom: 0; top: 0;z-index: 1000;display: none;" valign="middle" align="center">
		<iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style="position: absolute;top: 50%;left: 40%;"></iframe>
	</div>
<!-- page_title_area(S) -->
	<div class="page_title_area clear ">
		<!-- page_title(S) -->
		<h2 class="page_title"  id="bigtitle"><button type="button"><span><%=LEV3_NM%></span></button></h2>
		<!-- page_title(E) -->
			
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn" >
				<span style="display:none;" btnAuth="FINAL"><button style="display:none;" type="button" class="btn_normal" id="finalModiObj" onClick="doWork('FINAL_MODIFY')"><bean:message key="New"/></button></span><!--  
			--><button style="cursor:hand; display:none;" type="button" class="btn_accent" btnAuth="<%= roleBtnVO.getAttr1() %>" onClick="doWork('SEARCHLIST')" ><bean:message key="Search"/></button><!--  
			--><button style="cursor:hand; display:none;" type="button" class="btn_normal" btnAuth="<%= roleBtnVO.getAttr2() %>" onClick="doWork('NEW')"><bean:message key="New"/></button><!--   
			--><span style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button style="display:none;" type="button" class="btn_normal" id="btnSave" onClick="doWork('SAVE')"><bean:message key="Save"/></button></span><!--  
			--><span style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button style="display:none;" type="button" class="btn_normal" id="closeModiObj" onClick="doWork('CLOSE_MODIFY')"><bean:message key="Save"/></button></span><!--  
			--><span style="cursor:hand; display:none;" btnAuth="COPY"><button style="display:none;" type="button" class="btn_normal" id="btnCopy" onClick="doWork('COPY')"><bean:message key="Copy"/></button></span><!--  
			--><span style="cursor:hand; display:none;" btnAuth="ACCOUNTING"><button type="button" class="btn_normal" id="btnAccounting" onClick="doWork('GOTOACCT')"><bean:message key="Accounting"/></button></span><!--  
			--><span style="cursor:hand; display:none;" btnAuth="P_REPORT"><button style="display:none;" type="button" class="btn_normal" id="btnPProfit" onClick="doWork('PROFIT_REPORT')"><bean:message key="P_Report"/></button></span><!--  
			--><span style="cursor:hand; display:none;" btnAuth="M_F"><button type="button" class="btn_normal" id="printObj" onClick="doWork('MFPRINT')"><bean:message key="M_F"/></button></span><!--  
			--><span style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>"><button style="display:none;" type="button" class="btn_normal" id="btnDelete" onClick="doWork('REMOVE')"><bean:message key="Delete"/></button></span><!--  
			--><span style="cursor:hand; display:none;" btnAuth="HBL_CREATE"><button style="display:none;" type="button" class="btn_normal" id="hblObj" onClick="doWork('HBL_ENTRY')"><bean:message key="HBL_Create"/></button></span>  
		</div>
		<!-- opus_design_btn(E) -->	
		    <!-- page_location(S) -->
		<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
			<span><%=LEV1_NM%></span> &gt;
		 	 <span><%=LEV2_NM%></span> &gt;
		  	 <span><%=LEV3_NM%></span>
	   		<a href="" class="ir">URL Copy</a>
		</div>
    <!-- page_location(E) -->
		
</div>
<!-- page_title_area(E) -->	


<div class= "wrap_search_tab">
  <div class= "opus_design_inquiry">
  	<table>
  		<colgroup>
  			<col width="60">
  			<col width="190">
  			<col width="80">
  			<col width="*">
  		</colgroup>
  		<tr>
			<th><bean:message key="Ref_No"/></th>
            <td>
                <input name="f_ref_no" maxlength="20" value='<bean:write name="valMap" property="f_ref_no"/>' type="text" class="search_form"  dataformat="excepthan" style="resize:none;ime-mode:disabled;width:150px;text-transform:uppercase;" onblur="strToUpper(this)" /><!-- 
                 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('REF_POPLIST',this)"></button>
            </td>
            <th><bean:message key="MBL_No"/></th>
            <td>
                <input type="text" name="f_bl_no" maxlength="40" value='<bean:write name="valMap" property="f_bl_no"/>' class="search_form" dataformat="excepthan" style="resize:none;ime-mode:disabled;width:150px;text-transform:uppercase;" onblur="strToUpper(this)" /><!-- 
                 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('MBL_POPLIST',this)"></button>
            </td>
		</tr>
  	</table>
	</div>
</div>	
<div class="wrap_result_tab">
	<div class="opus_design_grid" style="display: none;">
		<script language="javascript">comSheetObject('sheet1');</script>
	</div>
	    <ul class="opus_design_tab">
	        <li class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Master_BL_Entry"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Container"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Mark_Desc"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Freight"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Work_Order"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('06');"><span><bean:message key="Shipping_Document"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('07');"><span><bean:message key="Status"/></span></a></li>
	    </ul>

		 <!-- tab_player_ 1 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:inline"><!--Shipping Request Main inline -->
			
			<div class= "opus_design_inquiry" style="margin-bottom:8px;">
				<table>
					<colgroup>
						<col width="70">
						<col width="190">
						<col width="70">
						<col width="150">
						<col width="95">
						<col width="125">
						<col width="90">
						<col width="130">
						<col width="125">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
                        	<th><bean:message key="Ref_No"/></th>
                            <td>
                                <input type="text" name="ref_no" maxlength ="20" value='<bean:write name="hblVO" property="ref_no"/>' class="search_form" dataformat="excepthan" style="resize:none;ime-mode:disabled;width:100px;text-transform:uppercase;" onblur="strToUpper(this)" onclick="if(frm1.ref_no.value=='AUTO'){frm1.ref_no.value=''}"><!-- 
                             --><bean:define id="ofcList" name="valMap" property="ofcList"/><!-- 
                             --><html:select name="hblVO" property="ref_ofc_cd" styleClass="search_form" style="width:75px;" onchange="ofcChDEta();">
								<html:options collection="ofcList" property="ofc_cd" labelProperty="ofc_cd"/>
								</html:select>
								<input type="hidden" name="h_ref_ofc_cd" value='<bean:write name="hblVO" property="ref_ofc_cd"/>'>
								<input type="hidden" name="h_post_dt_imp" value='<bean:write name="hblVO" property="i_post_dt_imp"/>'>
                            </td>
                            <th><bean:message key="MBL_No"/></th>
                            <td>
                                <input required type="text" name="bl_no"  maxlength ="40" value='<bean:write name="hblVO" property="bl_no"/>' onKeyDown="setCarrierCd(this)" class="search_form" dataformat="excepthan" style="resize:none;ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this);setCarrierCd(this)">
                            </td>
                            <th><bean:message key="Sub_MBL_No"/></th>
                            <td>
                                <input type="text" name="sub_bl_no"  maxlength ="20"  value="<bean:write name="hblVO" property="sub_bl_no"/>" class="search_form" dataformat="excepthan" style="resize:none;ime-mode:disabled;width:100px;text-transform:uppercase;" onblur="strToUpper(this)">
                            </td>
                            <th><bean:message key="BL_Type"/></th>
							<td>
								<bean:define id="blTypeList" name="valMap" property="blTypeList"/>
								<html:select name="hblVO" property="hbl_tp_cd" styleClass="search_form" style="width:100px;">
								<html:options collection="blTypeList" property="cd_val" labelProperty="cd_nm"/>
								</html:select>
							</td>
                            <th><bean:message key="Service_Contract_No"/></th>
                            <td>
                                <input type="text" name="sc_no" maxlength ="20"  value="<bean:write name="hblVO" property="sc_no"/>"  class="search_form" dataformat="excepthan" style="resize:none;ime-mode:disabled;width:100;text-transform:uppercase;" onblur="strToUpper(this)">
                            </td>
                        </tr>
                        <tr>
                        	<th><bean:message key="Post_Date"/></th>
                            <td>
                                <input type="text" name="post_dt" value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form-disable" style="width:100px;" readonly>
                            </td>
                            <th><bean:message key="MRN"/></th>
                            <td>
                                <input type="text" name="mrn" maxlength ="20" value="<bean:write name="hblVO" property="mrn"/>" class="search_form" dataformat="excepthan" style="resize:none;ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)">
                            </td>
                            <th><bean:message key="MSN"/></th>
                            <td>
                                <input type="text" name="bl_ser_no"  maxlength ="20" value="<bean:write name="hblVO" property="bl_ser_no"/>" class="search_form" dataformat="excepthan" style="resize:none;ime-mode:disabled;width:100px;text-transform:uppercase;" onblur="strToUpper(this)">
                            </td>
                            <th><bean:message key="Agent_Reference_No"/></th>
                            <td colspan="3">
                                <input type="text" name="imp_ref_no" maxlength ="40" value="<bean:write name="hblVO" property="imp_ref_no"/>" class="search_form" dataformat="excepthan" style="resize:none;ime-mode:disabled;width:100px;text-transform:uppercase;" onblur="strToUpper(this)">
                            </td>
                        </tr>
					</tbody>
				</table>
			</div>
			
			<div class="layout_wrap">
				<!-- layout_vertical_2 a(S) -->
			    <div class="layout_vertical_3 sm" style="height:530px">
			    	<h3 class="title_design"><bean:message key="Customer"/></h3>
			    	<div class="opus_design_inquiry" >
				    	<table>
				    		<colgroup>
				    			<col width="70px" />
				    			<col width="*" />
				    		</colgroup>
				    		<tbody>
				    			<tr>
                                    <th><a href="javascript:clearBlPrnr('S01');"><bean:message key="Shipper"/></a></th>
                                    <td>
                                        <input type="text"   name="shpr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown','S','I','M')" onBlur="codeNameAction('trdpCode_shipper',this, 'onBlur' ,'S','I','M');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="resize:none;ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
                                     --><button type="button" name="shipper" id="shipper" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                     --><input type="text"   name="shpr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  class="search_form" dataformat="excepthan" style="resize:none;ime-mode:disabled;width:calc(100% - 150px);text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" onKeyPress="if(event.keyCode==13){openSeiMasterPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);}"><!-- 
                                     --><button type="button" class="btn_etc" name="shipper" id="shipper" onClick="openSeiMasterPopUp('PIC_POP', this)" ><bean:message key="PIC"/></td></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <textarea name="shpr_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address');" WRAP="off">
<bean:write name="hblVO" property="shpr_trdp_addr" filter="false"/></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <th><a href="javascript:clearBlPrnr('C01');"><bean:message key="Consignee"/></a></th>
                                    <td>
                                        <input type="hidden" name="cnee_trdp_cd"  value='<bean:write name="hblVO" property="cnee_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_consignee',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="resize:none;ime-mode:disabled; text-transform:uppercase;width:48px;">
                                        <input type="text"   name="cnee_trdp_nm"  value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'  class="search_form" dataformat="excepthan" style="resize:none;ime-mode:disabled;width:calc(100% - 30px);text-transform:uppercase;" onblur="strToUpper(this)" maxlength="50" onKeyPress="if(event.keyCode==13){openSeiMasterPopUp('LINER_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);}"><!-- 
                                     --><button type="button" name="consignee" id="consignee" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('LINER_POPLIST',this)"></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <textarea name="cnee_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address');" WRAP="off">
<bean:write name="hblVO" property="cnee_trdp_addr" filter="false"/></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <th><a href="javascript:clearBlPrnr('N01');"><bean:message key="Notify"/></a></th>
                                    <td>
                                        <input type="hidden"   name="ntfy_trdp_cd" value='<bean:write name="hblVO" property="ntfy_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_notify',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_notify',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="resize:none;ime-mode:disabled;width:48px;">
                                        <input type="text" name="ntfy_trdp_nm"   value='<bean:write name="hblVO" property="ntfy_trdp_nm"/>'   class="search_form" dataformat="excepthan" style="resize:none;ime-mode:disabled;width:calc(100% - 30px);text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){openSeiMasterPopUp('LINER_POPLIST', document.getElementById('notify'), frm1.ntfy_trdp_nm.value);}"><!-- 
                                     --><button type="button" name="notify" id="notify" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('LINER_POPLIST',this)"></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('SAC', 'S', 'I', 'M')"><bean:message key="Same_As_Consignee"/></a><!-- 
                                     -->&nbsp;<img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('CNEE', 'S', 'I', 'M')"><bean:message key="Copy"/></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <textarea name="ntfy_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address');" WRAP="off">
<bean:write name="hblVO" property="ntfy_trdp_addr" filter="false"/></textarea>
                                    </td>
                                </tr>
                                                        
				    		</tbody>
				    	</table>
				    </div>
				    <div class="opus_design_inquiry" >
			    	<h3 class="title_design"><bean:message key="Contribution"/></h3>	
				    	<table>
				    		<colgroup>
				    			<col width="137px" />
				    			<col width="90px" />
				    			<col width="100px" />
				    			<col width="*" />
				    		</colgroup>
				    		<tbody>
								<tr>
									<th><bean:message key="Contrib_Office"/></th>
		                             <td>
		                                 <input type="text"   name="ctrb_ofc_cd" value='<bean:write name="hblVO" property="ctrb_ofc_cd"/>' class="search_form" onKeyDown="codeNameAction('officeCd_ctrbOfc',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('officeCd_ctrbOfc',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
		                                    --><button type="button" name="ctrbOfc" id="ctrbOfc" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('OFFICE_GRID_POPLIST',this)"></button>
		                             </td>
									<th><bean:message key="Use_Ratio"/></th>
									<td>
										<input type="checkBox" name="ctrb_ratio_yn" id="ctrb_ratio_yn" value="<bean:write name="hblVO" property="ctrb_ratio_yn"/>" onclick="flgChange(this);clickCtrbRatioYn();">
										<input type="text" name="ctrb_mgn" value="<bean:write name="hblVO" property="ctrb_mgn"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,20,2);chkComma(this,20,2);" onBlur="checkRatioValid();" maxlength="23" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;">
									</td>
				    			</tr>
				    			<tr>
				    				<th><bean:message key="Contrib_Dept"/></th>
									<td>
										<bean:define id="ctrbDeptList" name="valMap" property="ctrbDeptList"/>
		                                <html:select name="hblVO" property="ctrb_dept_cd" styleClass="search_form" style="width:100px;">
		                                    <option value=""></option>
		                                    <html:options collection="ctrbDeptList" property="cd_val" labelProperty="cd_nm"/>
		                                </html:select>
									</td>
								</tr>
				    		</tbody>
				    	</table>
				    </div>
				</div>
				<!-- layout_vertical_2 a(E) -->
				<!-- layout_vertical_2 b(S) -->
				<div class="layout_vertical_3 sm mar_left_8" style="height:530px">
			    	<div class="opus_design_inquiry" >
				    	<table>
				    		<colgroup>
				    			<col width="115px" />
				    			<col width="100px" />
				    			<col width="30px" />
				    			<col width="*" />
				    		</colgroup>
				    		<tbody>
				    			<tr>
									<th><a href="javascript:clearBlPrnr('P03');"><bean:message key="Triangle_Agent"/></a></th>
									<td colspan="3">
										<input type="text"   name="prnr_trdp_cd2" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd2"/>' onKeyDown="codeNameAction('trdpCode_partner2',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner2',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                     --><button type="button" name="partner2" id="partner2" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                     --><input type="text"   name="prnr_trdp_nm2" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm2"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:138px;" onKeyPress="if(event.keyCode==13){openSeiMasterPopUp('LINER_POPLIST', document.getElementById('partner2'), frm1.prnr_trdp_nm2.value);}">
										<input type="hidden" name="prnr_trdp_addr2" value='<bean:write name="hblVO" property="prnr_trdp_addr2"/>'>
									</td>
								</tr>
								
								<tr>
									<th><a href="javascript:clearBlPrnr('A01');"><bean:message key="Forwarding_Agent"/></a></th>
									<td colspan="3">
                                        <input type="text" name="agent_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="agent_trdp_cd"/>' onKeyDown="if(this.readOnly==true){return};codeNameAction('trdpCode_agent',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_agent',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                     --><button type="button" name="agent" id="agent" class="input_seach_btn" tabindex="-1" onClick="if(frm1.agent_trdp_cd.readOnly==true){return};openSeiMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                     --><input type="text"   name="agent_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="agent_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:138px;" onKeyPress="if(this.readOnly==true){return};if(event.keyCode==13){openSeiMasterPopUp('LINER_POPLIST', document.getElementById('agent'), frm1.agent_trdp_nm.value);}"><!-- 
                                     --><input type="hidden" name="agent_trdp_addr" value='<bean:write name="hblVO" property="agent_trdp_addr"/>'>                                                        
									</td>
					            </tr>
								<tr>
									<td colspan="4"><h3 class="title_design mar_top_8" style="margin-bottom:0px;"><bean:message key="Vessel"/></h3></td>
								</tr>
								<tr>
									<th><bean:message key="Liner"/></th>
									<td colspan="3">
										<input required type="text"  name="lnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_sea_liner',this, 'onKeyDown')" onblur="strToUpper(this);codeNameAction('trdpCode_sea_liner',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                     --><button type="button" name="liner" id="liner" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('LINER_POPLIST_MS',this)"></button><!-- 
                                     --><input required type="text"  name="lnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:138px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openSeiMasterPopUp('LINER_POPLIST_MS', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}">
									</td>
								</tr>
								<tr>
                                    <th><bean:message key="VSL_VOY"/></th>
                                    <td colspan="3">
                                        <input type="hidden" name="trnk_vsl_cd" value='<bean:write name="hblVO" property="trnk_vsl_cd"/>' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onBlur="codeNameAction('srVessel',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;width:40px;">
                                        <input type="text"   name="trnk_vsl_nm" value='<bean:write name="hblVO" property="trnk_vsl_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:135px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeiMasterPopUp('VESSEL_POPLIST', document.getElementById('trunkvessel'), frm1.trnk_vsl_nm.value);}"><!-- 
                                     --><button type="button" name="trunkvessel" id="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('VESSEL_POPLIST',this)"></button><!-- 
                                     --><input type="text"   name="trnk_voy"    value='<bean:write name="hblVO" property="trnk_voy"/>'    class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:78px;text-transform:uppercase;" maxlength="15" onblur="strToUpper(this)">
                                    </td>
                                </tr>
                                <tr>
                                    <th><bean:message key="ETD"/></th>
                                    <td>
                                        <input name="etd_dt_tm" id="etd_dt_tm" required  maxlength="10" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETD');"><!-- 
                                     --><button type="button" class="calendar" tabindex="-1" name="etd_dt_tm_cal" id="etd_dt_tm_cal"  onclick="doDisplay('DATE1',frm1.etd_dt_tm);" ></button>
                                    </td>
                                    <th><bean:message key="ETA"/></th>
                                    <td>
                                        <input name="eta_dt_tm" id="eta_dt_tm" required  maxlength="10" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETA');txtAtChange(this, frm1.f_eta_dt_tm)"><!-- 
                                     --><button type="button" class="calendar" tabindex="-1" name="eta_dt_tm_cal" id="eta_dt_tm_cal"  onclick="doDisplay('DATE1',frm1.eta_dt_tm);" ></button>
                                    </td>
                                </tr>
                                <tr>
									<th >
										<span id="st_hear_r"><bean:message key="Delivery_ETA"/></span>
										<span id="st_hear" style="display:none;"><bean:message key="Delivery_ETA"/></span>
									</th>
									
									<td>
										<input type="text" name="f_eta_dt_tm" id="f_eta_dt_tm" value='<wrt:write name="hblVO" property="f_eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Delivery ETA');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;" size='11' maxlength="10"><!-- 
                                     --><button type="button" class="calendar" tabindex="-1" name="f_eta_dt_tm_cal" id="f_eta_dt_tm_cal"  onclick="doDisplay('DATE1', frm1.f_eta_dt_tm);" ></button>
									</td>
								</tr>
								<tr>
									<th><a href="javascript:clearBlPrnr('B01');"><bean:message key="Billing_Carrier"/></a></th>
									<td colspan="3">
										<input type="text"   name="carr_trdp_cd" maxlength= "20" value='<bean:write name="hblVO" property="carr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_carr',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_carr',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                     --><button type="button" name="carr" id="carr" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                     --><input type="text"   name="carr_trdp_nm" maxlength= "50" value='<bean:write name="hblVO" property="carr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" style="width:138px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openSeiMasterPopUp('LINER_POPLIST', document.getElementById('carr'), frm1.carr_trdp_nm.value);}">
										<input type="hidden" name="carr_trdp_addr" value='<bean:write name="hblVO" property="carr_trdp_addr"/>'>
									</td>
								</tr>	
								<tr>
									<td colspan="4"><h3 class="title_design mar_top_8" style="margin-bottom:0px;"><bean:message key="Route"/></h3></td>
								</tr>	
								<tr>
                                    <th><bean:message key="POR"/></th>
                                    <td colspan="3">
                                        <input type="text" name="por_cd" maxlength="5" value='<bean:write name="hblVO" property="por_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_por',this, 'onKeyDown','S')" onBlur="codeNameAction('Location_por',this, 'onBlur','S');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                      --><button type="button" name="por" id="por" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                                      --><input type="text" name="por_nm" maxlength="50" value='<bean:write name="hblVO" property="por_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:138px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeiMasterPopUp('LOCATION_POPLIST', document.getElementById('por'), frm1.por_nm.value);}">
									</td>
                                </tr>
                                <tr>
                                    <th><bean:message key="POL"/></th>
                                    <td colspan="3">
                                        <input type="text" required  name="pol_cd" maxlength="5"  value='<bean:write name="hblVO" property="pol_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','S')" onBlur="codeNameAction('Location_pol',this, 'onBlur','S');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                     --><button type="button" name="pol" id="pol" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                                     --><input type="text" required  name="pol_nm" maxlength="50" value='<bean:write name="hblVO" property="pol_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:138px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeiMasterPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}">
                                    </td>
                                </tr>
                                <tr>
                                    <th><bean:message key="POD"/></th>
                                    <td colspan="3">
                                        <input type="text" required  name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown','S')" onBlur="codeNameAction('Location_pod',this, 'onBlur','S');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                     --><button type="button" name="pod" id="pod" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                                     --><input type="text" required  name="pod_nm" maxlength="50" value='<bean:write name="hblVO" property="pod_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:138px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeiMasterPopUp('LOCATION_POPLIST', document.getElementById('pod'), frm1.pod_nm.value);}">
                                    </td>
                                </tr>
                                <tr>
                                    <th><bean:message key="DEL"/></th>
                                    <td colspan="3">
                                        <input type="text" name="del_cd" maxlength="5" value='<bean:write name="hblVO" property="del_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_del',this, 'onKeyDown','S')" onBlur="codeNameAction('Location_del',this, 'onBlur','S');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                     --><button type="button" name="del" id="del" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                                     --><input type="text" name="del_nm" maxlength="50"value='<bean:write name="hblVO" property="del_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:138px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeiMasterPopUp('LOCATION_POPLIST', document.getElementById('del'), frm1.del_nm.value);}">
                                    </td>
                                </tr>
                            <input type="hidden" name="fnl_dest_loc_cd" value='<bean:write name="hblVO" property="fnl_dest_loc_cd"/>'>
                            <input type="hidden" name="fnl_dest_loc_nm" value='<bean:write name="hblVO" property="fnl_dest_loc_nm"/>'>	
                                <tr>
									<th><bean:message key="CY_Location"/></th>
									<td colspan="3">
										<input type="text"   name="cy_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="cy_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_cy',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_cy',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                     --><button type="button" name="cy" id="cy" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                     --><input type="text"   name="cy_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="cy_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:138px;" onKeyPress="if(event.keyCode==13){openSeiMasterPopUp('LINER_POPLIST', document.getElementById('cy'), frm1.cy_trdp_nm.value);}">
										</td>
								</tr>
								<tr>
									<th><bean:message key="CFS_Location"/></th>
									<td colspan="3">
										<input type="text"   name="cfs_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="cfs_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_cfs',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_cfs',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                     --><button type="button" name="cfs" id="cfs" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                     --><input type="text"   name="cfs_trdp_nm" maxlength="50"  value='<bean:write name="hblVO" property="cfs_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:138px;" onKeyPress="if(event.keyCode==13){openSeiMasterPopUp('LINER_POPLIST', document.getElementById('cfs'), frm1.cfs_trdp_nm.value);}">
										</td>
								</tr>
								<tr>
									<th><bean:message key="Return_Locaiton"/></th>
									<td colspan="3">
										<input type="text"   name="rt_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="rt_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_rt',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_rt',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                     --><button type="button" name="rt" id="rt" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                     --><input type="text"   name="rt_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="rt_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:138px;" onKeyPress="if(event.keyCode==13){openSeiMasterPopUp('LINER_POPLIST', document.getElementById('rt'), frm1.rt_trdp_nm.value);}">
									</td>
								</tr>
								<tr>
									<th><bean:message key="IT_No"/></th>
									<td>
										<input type="text" name="it_no" maxlength="20" value="<bean:write name="hblVO" property="it_no"/>" class="search_form" dataformat="excepthan" onblur="strToUpper(this)" style="ime-mode:disabled; width:75px;">
									</td>
									<th><bean:message key="Date"/></th>
									<td>
										<input type="text" name="te_dt_tm" id="te_dt_tm" maxlength="10" value="<wrt:write name="hblVO" property="te_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'IT Date');autoFillITLoc();" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!-- 
                                     --><button type="button" class="calendar" tabindex="-1" name="te_dt_tm_cal" id="te_dt_tm_cal"  onclick="doDisplay('DATE1' ,frm1.te_dt_tm);" ></button>
									</td>
								</tr>
								<tr>
									<th><bean:message key="IT_Location"/></th>
									<td colspan="3">
										<input type="text" name="it_loc" maxlength="20" value="<bean:write name="hblVO" property="it_loc"/>" onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:247px;">
									</td>
								</tr>			            
				    		</tbody>
				    	</table>
				    </div>
				</div>
				<!-- layout_vertical_2 b(E) -->
				<!-- layout_vertical_2 c(S) -->
				<div class="layout_vertical_3 mar_left_8 sm"  style="height:530px; width:calc(34% - 16px)">
			    	<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Shippment_and_Item"/></h3>
			    	<div class="opus_design_inquiry" >
				    	<table>
				    		<colgroup>
				    			<col width="70px" />
				    			<col width="*" />
				    		</colgroup>
				    		<tbody>
				    			<tr>
                                     <th><bean:message key="Freight"/></th>
                                     <td>
                                         <bean:define id="frtList" name="valMap" property="frtCdList"/>
                                         <html:select name="hblVO" property="frt_term_cd" styleClass="search_form" style="width:90px;">
                                             <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/>
                                         </html:select> 
                                     </td>
                                  </tr>
                                  <tr>                                                                   
                                     <th><bean:message key="Ship_Mode"/></th>
                                     <td>
                                         <bean:define id="shipModeList" name="valMap" property="shipModeList"/>
                                         <html:select  name="hblVO" property="shp_mod_cd" style="width:90px;" onchange="shipModeChangeDef(this);" styleClass="input1">
                                             <html:options collection="shipModeList" property="cd_val" labelProperty="cd_nm"/>
                                         </html:select>
                                     </td>
                                 </tr>
                                 <tr>
                                     <th><bean:message key="Service_Term"/></th>
                                     <td>
                                         <bean:define id="serviceList" name="valMap" property="serviceList"/>
                                         <html:select name="hblVO" property="fm_svc_term_cd" styleClass="search_form" style="width:90px;" onchange="svcTermChange()">
                                             <html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                         </html:select> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<!-- 
                                     --><html:select name="hblVO" property="to_svc_term_cd" styleClass="search_form" style="width:80px;">
                                             <html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                         </html:select> 
                                    </td>
                                </tr>
                                <tr>
									<th><bean:message key="Package"/></th>
									<td>
										<input type="text" name="pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" maxlength="7"  class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:90px;text-align:right"><!-- 
                                     --><bean:define id="pckList" name="valMap" property="pckCdList"/><!-- 
                                     --><html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:143px;">
										<option></option>
										<html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
										</html:select> 
									</td>
								</tr>
								<tr>
									<th><bean:message key="GWeight"/></th>
									<td>
										<input type="text" name="grs_wgt" value="<bean:write name="hblVO" property="grs_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:90px;text-align:right;"><!-- 
                                     --><input type="text" name="grs_wgt_ut_cd" value="K" style="width:58px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
                                     --><input type="text" name="grs_wgt1" value="<bean:write name="hblVO" property="grs_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
                                     --><input type="text" name="grs_wgt_ut_cd1" value="L" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="2">
									</td>
								</tr>
								<tr>
										<th><bean:message key="Measurement"/></th>
									<td>
										<input type="text" name="meas" value="<bean:write name="hblVO" property="meas"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:90px;text-align:right;"><!-- 
                                     --><input type="text" name="meas_ut_cd" value="CBM" style="width:58px;border:0;background-color:transparent;" readOnly tabindex="5"><!-- 
                                     --><input type="text" name="meas1" value="<bean:write name="hblVO" property="meas1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);cbmChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
                                     --><input type="text" name="meas_ut_cd1" value="CFT" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="6">
									</td>
								</tr>
								<tr>
									<td colspan="2"><button type="button" class="btn_etc" onclick="sumHblValue();" ><bean:message key="Sum"/></button>
									</td>
								</tr>
								<tr>
	                                 	<th><bean:message key="Tariff_Currency_Code"/></th>
	                                     <td>
	                                         <bean:define id="currCdList" name="valMap" property="currCdList"/>
	                                         <html:select name="hblVO" property="curr_cd" styleClass="search_form" style="width:90px;">
	                                             <html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/>
	                                         </html:select>
	                                         <input type="hidden" name="h_curr_cd" value="<bean:write name="hblVO" property="curr_cd"/>">
	                                     </td>
                                 </tr>
                                 <tr>
	                                     <th><bean:message key="Profit_Share"/></th>
	                                     <td>
	                                         <input type="text" name="profit_share" maxlength="5" onkeyPress="onlyNumberCheck();" value="<bean:write name="hblVO" property="profit_share"/>" onKeyPress="ComKeyOnlyNumber(this)" class="search_form zero_remove" style="width:90px;text-align:right;"><!-- 
                                     		--><input type="text" value="%" class="search_form" style="width:20px;border:0;background-color:transparent;" tabindex="1">
	                                     </td>
                                </tr>
                                <tr>
                                        <th><bean:message key="Express_BL"/></th>
										<td>
											<bean:define id="yesNoCdList" name="valMap" property="yesNoCdList"/>
											<html:select name="hblVO" property="express_tp_cd" styleClass="search_form" style="width:90px;">
												<html:options collection="yesNoCdList" property="cd_val" labelProperty="cd_nm"/>
											</html:select>
										</td>
                                </tr>
                                <tr>
									<td colspan="2">
										<input type="checkBox" name="rlsd_flg" value='<bean:write name="hblVO" property="rlsd_flg"/>' onclick="flgChange(this);setToday(this);"><!--
										--><label for="chk_pro"><bean:message key="Released"/></label>
									</td>
								</tr>
								<tr>
										<th><bean:message key="Released_Date"/></th>
                                        <td>
                                            <input type="text" name="rlsd_dt_tm" id="rlsd_dt_tm" maxlength="10" value="<wrt:write name="hblVO" property="rlsd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Released Date');" dataformat="excepthan" style="ime-mode:disabled;width:90px;" size='11'><!-- 
                                           --><button type="button" class="calendar" tabindex="-1" name="rlsd_dt_tm_cal" id="rlsd_dt_tm_cal"  onclick="doDisplay('DATE1' ,frm1.rlsd_dt_tm)" ></button>
                                        </td>
	                        	 </tr>
					              <tr>
					              		<td colspan="2"><h3 class="title_design mar_top_8" style="margin-bottom:0px;"><bean:message key="Management"/></h3></td>
					              </tr> 
					               <tr>
                                           <th><bean:message key="Issue_Date"/></th>
                                           <td>
                                               <input type="text" name="bl_iss_dt" id="bl_iss_dt" maxlength="10" value="<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Date Issued');" dataformat="excepthan" style="ime-mode:disabled;width:90px;"><!-- 
                                           --><button type="button" class="calendar" tabindex="-1" name="bl_iss_dt_cal" id="bl_iss_dt_cal"  onclick="doDisplay('DATE1' ,frm1.bl_iss_dt);" ></button>
                                           </td>
                                    </tr>
                                    <tr>
		                                  <th><bean:message key="Issued_By"/></th>
		                                  <td>
											<input type="text"   name="opr_usrid" value="<bean:write name="hblVO" property="issued_by"/>" class="search_form-disable" readOnly style="width:90px;"><!-- 
                                           --><button type="button" name="oprBtn" id="oprBtn" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('OPR_POPLIST',this)"></button>
											<input type="hidden" name="opr_usrnm"   value="<bean:write name="hblVO" property="proc_usrnm"/>">
											<input type="hidden" name="opr_ofc_cd"  value="<bean:write name="hblVO" property="proc_ofccd"/>">
											<input type="hidden" name="opr_dept_cd" value="<bean:write name="hblVO" property="proc_dept_cd"/>">
                                                        </td>
                                   </tr>
                                   <tr>
                                         <th><bean:message key="Sales_OFC"/></th>
                                         <td>
                                             <input type="text" name="sls_ofc_cd" value="<bean:write name="hblVO" property="sls_ofc_cd"/>" class="search_form-disable" style="width:90px;" readonly><!-- 
                                           --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="openSeiMasterPopUp('OFFICE_GRID_POPLIST',this);" ></button>
                                         </td>
                                    </tr>
                                    <tr>
                                         <th><bean:message key="Sales_PIC"/></th>
                                         <td>
                                             <input type="text"   name="sls_usrid"  value="<bean:write name="hblVO" property="sls_usrid"/>" style="width:90px;" class="search_form-disable" readOnly><!-- 
                                           --><button type="button" name="input_seach_btn" id="input_seach_btn" class="input_seach_btn" tabindex="-1" onClick="openSeiMasterPopUp('USER_POPLIST',this)"></button>
                                             <input type="hidden" name="sls_usr_nm" value="<bean:write name="hblVO" property="sls_usr_nm"/>" class="search_form-disable" style="width:120px;" readOnly>
                                             <input type="hidden" name="sls_dept_cd" value="<bean:write name="hblVO" property="sls_dept_cd"/>">
                                         </td>
                                    </tr>                          
				    		</tbody>
				    	</table>
				    </div>
				</div>
				<!-- layout_vertical_2 c(E) -->
			
			</div>
			<h3 class="title_design mar_top_8"><bean:message key="House_BL_List"/></h3>
			<div class="opus_design_grid" id="mainTable">
				<script type="text/javascript">comSheetObject('sheet2');</script>
			</div>
			
		</div>
		<!-- tab_player_1 (E) -->
		
		<!-- tab_player_2 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Status-->
			<div class="opus_design_grid" id="mainTable">
				<h3 class="title_design"><bean:message key="Container_List"/></h3>
				<div class="opus_design_btn">
					<button type="button" class="btn_accent" name="cnrtAdd" id="cnrtAdd" onClick="cntrGridAdd(docObjects[2]);set_goDate();"><bean:message key="Add"/></button>
				</div>
				<script type="text/javascript">comSheetObject('sheet4');</script>
			</div>
		</div>
		<!-- tab_player_2 (E) -->
		<!-- tab_player_3 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Status-->
 			<div class= "opus_design_inquiry sm">
 				<div class= "opus_design_inquiry sm">
	  				<table>
	  					<colgroup>
	  						<col width="40" />
	  						<col width="170" />
	  						<col width="100" />
	  						<col width="170" />
	  						<col width="60" />
	  						<col width="*" />
	  					</colgroup>
	  					<tr>
							<th><bean:message key="CCN"/></th>
							<td>
								<input type="text" name="ccn_no" maxlength="30" value="<bean:write name="hblVO" property="ccn_no"/>" onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:160px;">
							</td>
							<th><bean:message key="Manifest_From"/></th>
							<td>
								<input type="text" name="mnf_fr_loc" maxlength="20" value="<bean:write name="hblVO" property="mnf_fr_loc"/>" onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:160px;">
							</td>
							<th><bean:message key="To_A"/></th>
							<td>
								<input type="text" name="mnf_to_loc" maxlength="20" value="<bean:write name="hblVO" property="mnf_to_loc"/>" onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:160px;">
							</td>
						</tr>
					</table>
				</div>
			
			<!-- layout_wrap(S) -->
				<div class="layout_wrap">
				    <div class="layout_vertical_3 sm" style="width: 460px;">
	 					 <h3 class="title_design"><bean:message key="Mark"/></h3>
	 					 <input tabindex = "-1" type="hidden" name="rider_lbl" id="rider_lbl" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;text-align:right;width:267px;border:0;background-color:transparent;"/>
	 					 <textarea name="mk_txt" rows="16" cols="20" maxlength="4000"  onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:450px;" onKeyPress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,15,rider_ocean);keyUp_maxLength(this);">
<bean:write name="hblVO" property="mk_txt" filter="false"/></textarea>
				    </div>
				    <div class="layout_vertical_3 sm mar_left_8" style="width: 460px;">
				    	 <h3 class="title_design"><bean:message key="Description"/></h3>
				    	 <textarea name="desc_txt" rows="16"  maxlength="4000" onKeyPress="keyPress_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:445px;" WRAP="off" onkeyup="rowCount(frm1,15,rider_ocean);keyUp_maxLength(this);">
<bean:write name="hblVO" property="desc_txt" filter="false"/></textarea>
				    </div>
				    <div class="layout_vertical_3 sm" style="width: calc(100% - 950px)">
				    	<img src="<%=CLT_PATH%>/web/img/main/Rider_Icon.gif" style="display:none;"width="45px" height="42" border="0" id="rider_ocean" valign="top">
				    </div>
				</div>
				<div class="opus_design_btn sm" style="text-align: left;"><button type="button" class="btn_etc" onclick="addCntrInfo(docObjects[2], 'M');"><bean:message key="Add_Container_Info"/></button></div>

                <div class="opus_design_inquiry sm pad_top_8" style="width:920px">
                    <h3 class="title_design sm"><bean:message key="Remark1"/></h3>
				  <textarea name="desc_txt1" rows="3" maxlength="800" onkeypress="keyPress_maxLength(this);"  onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:920px;" >
<bean:write name="hblVO" property="desc_txt1" filter="false"/></textarea>
                    <%--<h3 class="title_design"><bean:message key="Remark"/></h3>
                    <textarea name="desc_txt1" cols="175" rows="2" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:920px;">
  <bean:write name="hblVO" property="desc_txt1" filter="false"/></textarea>--%>
                </div>

                <div class="opus_design_inquiry sm" style="width:920px;">
                    <h3 class="title_design sm"><bean:message key="CFS_Remark"/></h3>
				  <textarea name="cfs_rmk" rows="3" maxlength="800" onkeypress="keyPress_maxLength(this);"  onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:920px; height: 25px; padding-top: 4px;" >
<bean:write name="hblVO" property="cfs_rmk" filter="false"/></textarea>
                </div>
			  
			</div>
			<!-- layout_wrap(E) -->
				
		</div>
		<!-- tab_player_3 (E) -->
		
		<!-- tab_player_4 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Status-->
			
			<script>
				var dfPerfCurr = 'KRW';
			</script>
			<%
				boolean sdIns = true;
				boolean sdInsDisp = true;
				boolean bcIns = true;
				boolean bcInsDisp = true;
				String to_rt_ut = "";
				String trf_cur_cd = "";   //Invoice Currency
			%>
			<!--Selling/Debit-->
			<logic:notEmpty name="valMap" property="SFRT">
			    <bean:define id="sellCnfCk" name="valMap" property="SFRT"/>
			    <logic:equal name="sellCnfCk" property="flg" value="Y">
			        <% sdIns = false; %>
			    </logic:equal>
			
			    <logic:equal name="sellCnfCk" property="invflg" value="Y">
			        <% sdInsDisp = false; %>
			    </logic:equal>
			</logic:notEmpty>
			
			<!--Buying/Crebit-->
			<logic:notEmpty name="valMap" property="BFRT">
			    <bean:define id="buyCnfCk" name="valMap" property="BFRT"/>
			    <logic:equal name="buyCnfCk" property="flg" value="Y">
			        <% bcIns = false; %>
			    </logic:equal>
			    
			    <logic:equal name="buyCnfCk" property="invflg" value="Y">
			        <% bcInsDisp = false; %>
			    </logic:equal>
			</logic:notEmpty>
			
			<!-- Currency 조회 -->
			<logic:notEmpty name="valMap" property="OfcCurrency">
				<bean:define id="curMap" name="valMap" property="OfcCurrency"/>
				<%  HashMap tmpMap = (HashMap)curMap;
					ofc_curr   = (String)tmpMap.get("ofccurr_cd");
					trf_cur_cd = (String)tmpMap.get("trf_cur_cd");
					to_rt_ut   = (String)tmpMap.get("to_rt_ut");
				%>
			</logic:notEmpty>
				<script>
					var obdtCur = '<%=to_rt_ut%>';
				</script>
			
				<input type="hidden" name="f_ofc_cnt_cd" id="f_ofc_cnt_cd"   value="">
				<input type="hidden" name="hid_act_cnt_cd" id="hid_act_cnt_cd" value="">
				
				<input type="hidden" name="ppdOrgCurr"  id="ppdOrgCurr"   value="">
				<input type="hidden" name="ofc_curr"    id="ofc_curr"   value="<%=ofc_curr%>">
			    <input type="hidden" name="trf_cur_cd"  id="trf_cur_cd"   value="<%=trf_cur_cd%>">
			    <input type="hidden" name="xcrtDt"       id="xcrtDt"   value='<bean:write name="hblVO" property="obrd_dt_tm"/>'>
			
				<input type="hidden" name="cctOrgCurr"  id="cctOrgCurr"   value="">
				<input type="hidden" name="objPfx"      id="objPfx"    value="">
				<input type="hidden" name="curRow2"      id="curRow2"   value="">
			
				<input type="hidden" name="ppdToCurrency" id="ppdToCurrency" value="<%=partner_curr%>">
				<input type="hidden" name="ppdOrgCurr"   id="ppdOrgCurr"  value="<%=partner_curr%>">
			
			    <!--Invoice추가-->    
			    <input type="hidden" name="tax_bil_flg" id="tax_bil_flg"  value="">  
			    <input type="hidden" name="inv_dt"     id="inv_dt"  value="">
			    <input type="hidden" name="inv_due_dt"  id="inv_due_dt" value="">  
			    <input type="hidden" name="inv_rmk"     id="inv_rmk" value="">  
			    <input type="hidden" name="buy_inv_no" id="buy_inv_no"  value="">  
			    
			    <!-- #47413 [IMPEX]B/L COPY 기능보완  --> 
    			<input type="hidden" name="copy_bl_seq" 	value='<bean:write name="valMap" property="org_bl_seq"></bean:write>'/>
	
						
			<div id="frtTableS">
				<div class="opus_design_grid" id="mainTable">
				<h3 class="title_design"><bean:message key="Account_Receivable"/></h3>
					<div class="opus_design_btn">
						<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[4], 'frtTableS')"><bean:message key="Plus"/></button><!-- 
					--><button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[4], 'frtTableS')"><bean:message key="Minus"/></button><!-- 
					--><div style="display:none;" id="sdBtns" ><!-- 
					--><button type="button" class="btn_normal"  onClick="goToInvoice(docObjects[4], 'LOCAL')" ><bean:message key="B.AR"/></button><!-- 
					--><button type="button" class="btn_normal"  onClick="goToInvoiceModify('LOCAL')" ><bean:message key="Invoice"/></button><!-- 
					--><button type="button" class="btn_normal"  onClick="setDfltFrt('', 'S', 'I', 'M')" ><bean:message key="Default"/> <bean:message key="New"/></button><!-- 
					--><button type="button" class="btn_normal"  onclick="frtRowAdd('ROWADD', docObjects[4], 'S', 'I', 'M');" ><bean:message key="Add"/></button>	
						</div>
					</div>
				
				<script type="text/javascript">comSheetObject('sheet7');</script>
				</div>
			</div>
			<div class="opus_design_grid" id="mainTable">
				<h3 class="title_design"><bean:message key="Debit_Credit"/></h3>
					<div class="opus_design_btn">
						<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[6], 'frtTableDC')"><bean:message key="Plus"/></button><!-- 
					--><button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[6], 'frtTableDC')"><bean:message key="Minus"/></button><!-- 
					--><div style="display:none;" id="dcBtns" ><!-- 
					--><button type="button" class="btn_normal"  onClick="goToInvoice(docObjects[6], 'DC')" ><bean:message key="B.DC"/></button><!-- 
					--><button type="button" class="btn_normal"  onClick="goToInvoiceModify('DC')" ><bean:message key="Invoice"/></button><!-- 
					--><button type="button" class="btn_normal"  onClick="setDfltFrt('dc_', 'S', 'I', 'M')" ><bean:message key="Default"/> <bean:message key="New"/></button><!-- 
					--><button type="button" class="btn_normal"  onclick="frtRowAdd('DCROWADD', docObjects[6], 'S', 'I', 'M');" ><bean:message key="Add"/></button>	
						</div>
					</div>
				<script type="text/javascript">comSheetObject('sheet9');</script>
			</div>
			<div class="opus_design_grid" id="mainTable">
				<h3 class="title_design"><bean:message key="Account_Payable"/></h3>
					<div class="opus_design_btn">
						<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[5], 'frtTableB')"><bean:message key="Plus"/></button><!-- 
					--><button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[5], 'frtTableB')"><bean:message key="Minus"/></button><!-- 
					--><div style="display:none;" id="bcBtns" ><!-- 
					--><button type="button" class="btn_normal"  onClick="goToInvoice(docObjects[5], 'AP')" ><bean:message key="B.AP"/></button><!-- 
					--><button type="button" class="btn_normal"  onClick="goToInvoiceModify('AP')" ><bean:message key="Invoice"/></button><!-- 
					--><span id="btnPierpass"><button type="button" class="btn_normal"  onClick="addPierPassFrt(frm1.intg_bl_seq.value, 'M', frm1.shp_mod_cd.value, 'I', 'B')" ><bean:message key="PIERPASS"/></button></span><!-- 
					--><button type="button" class="btn_normal"  onClick="setDfltFrt('b_', 'S', 'I', 'M')" ><bean:message key="Default"/> <bean:message key="New"/></button><!-- 
					--><button type="button" class="btn_normal"  onclick="frtRowAdd('BCROWADD', docObjects[5], 'S', 'I', 'M');" ><bean:message key="Add"/></button>	
						</div>
					</div>
				<script type="text/javascript">comSheetObject('sheet8');</script>
			</div>
		</div>
		<!-- tab_player_4 (E) -->
		
		<!-- tab_player_5 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Status-->
			<div class="opus_design_grid" id="mainTable">
				<h3 class="title_design mar_btm_8"><bean:message key="Work_Order_List"/></h3>
				<div class="opus_design_btn">
				<button type="button" class="btn_accent" name="goWoObj" id="goWoObj"  onClick="doWork('WORKORDER')" style="display:none;margin-left:9px;cursor:hand"> <bean:message key="WorkOrder"/></button>
				</div>
				<script type="text/javascript">comSheetObject('sheet12');</script>
			</div>
		</div>
		<!-- tab_player_5 (E) -->
		
		<!-- tab_player_6 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Status-->
			<div class="opus_design_grid">
				<h3 class="title_design"><bean:message key="Shipping_Document"/></h3>
					<div class="opus_design_btn">
						<button type="button" class="btn_accent" id="sDoc"  name="sDoc" btnAuth="S_DOC" onClick="doWork('S_DOC');"><bean:message key="Print"/></button><!-- 
					--><button type="button" class="btn_normal" name="emlSnd" id="emlSnd" onClick="doWork('SNDEML')" style="display:none;margin-left:5px;cursor:hand"><bean:message key="Email"/></button><!-- 
					--><button type="button" class="btn_normal" name="fileUp" id="fileUp" onClick="doWork('DOCFILE')" style="display:none;margin-left:5px;cursor:hand"><bean:message key="Upload"/></button>
						</div>
						
						<script type="text/javascript">comSheetObject('sheet3');</script>
						<script type="text/javascript">comSheetObject('sheet10');</script>
			</div>
		</div>
		<!-- tab_player_6 (E) -->
		
		<!-- tab_player_7 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Status-->
			<h3 class="title_design"><bean:message key="History_Search"/></h3>
			<div class="opus_design_grid">
					<script type="text/javascript">comSheetObject('sheet11');</script>
			</div>
		</div>
		<!-- tab_player_7 (E) -->
</div>

    </form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" id="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"  id="bcKey"   value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq"   id="s_palt_doc_seq" value=""/>
    <input type="hidden" name="intg_bl_seq" id="intg_bl_seq" value="" />
    <input type="hidden" name="docType" id="docType"  value=""/>
</form>

<script type="text/javascript">
fnbtnCtl();
</script>	
		
<!-- 2010.12.17 김진혁 추가, 수입은 최초화면 loading될 때 Collect로 셋팅 -->
<script>
if('<bean:write name="hblVO" property="frt_term_cd"/>'==""){
	frm1.frt_term_cd.value = "CC";
}
</script>
