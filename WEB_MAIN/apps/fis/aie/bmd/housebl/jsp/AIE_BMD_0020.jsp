<%--
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AIE_BMD_0020.jsp
*@FileTitle  : HGBL등록
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/15
=========================================================*/
--%>

<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>

    <title><bean:message key="system.title"/></title>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>

	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/aie/bmd/housebl/script/AIE_BMD_0020.js"></script>
	<script>
	
        function titBlStyle(isDisable){
            var styleStr = 'table_search_head';
            if(isDisable){
                styleStr = 'table_search_head_r';
            }
        
            blShpObj.className = styleStr;
            blConObj.className = styleStr;
        
            //blIsCdObj.className = styleStr;
            blIsDtObj.className = styleStr;
            //blPayCdObj.className= styleStr;
        }
		
		function dispBizBtns(dispTp){
            //Freight버튼
            getObj("sdBtns").style.display    = dispTp;
            getObj("bcBtns").style.display    = dispTp;
            getObj("dcBtns").style.display    = dispTp;
            
            getObj("itmAdd").style.display = dispTp;
			getObj("loadPO").style.display = dispTp;
        }
		
		function btnLoad(){
			frm1.ref_no.className = 'search_form';
		    frm1.ref_no.readOnly  = false;
		    getObj("brnRef_no").disabled  = false;
		    
			if(frm1.bl_sts_cd.value=='NA'){
				titBlStyle(false);
			}else{
				//getObj("btnShippingAdvice").style.display = 'inline';
				
				getObj("fileUpObj").style.display = 'inline';
				getObj("btnShippingAdvice").style.display = 'inline';
                
				//Booking Confirm
				if(frm1.bl_sts_cd.value=='BC'){
					titBlStyle(false);

		            frm1.bkg_no.className = 'search_form-disable';
                    frm1.bkg_no.readOnly  = false;
                    getObj("btnfromBlModiObj").style.display = 'inline';
                    getObj("bkgCnfObj").style.display= 'inline';
                    getObj("btnCopy").style.display  = 'inline';
                    getObj("btnDelete").style.display  = 'inline';
		
                    getObj("goWoObj").style.display   = 'inline';
				//Booking Confirm
				}else if(frm1.bl_sts_cd.value=='BF'){
                    titBlStyle(true);
		
					frm1.bkg_no.readOnly  = true;
					getObj("btnfromBlModiObj").style.display = 'inline';
					getObj("btnDelete").style.display  = 'inline';
					getObj("btnCopy").style.display  = 'inline';
		
					getObj("hblCreObj").style.display = 'inline';
					getObj("goWoObj").style.display   = 'inline';
		
		
					if(bkCheck==99){
                        bkCheck = 0;
                    }
                    
				}else if(frm1.bl_sts_cd.value=='HC'){
					titBlStyle(true);
					getObj("btnfromBlModiObj").style.display = 'inline';
					getObj("btnCopy").style.display  = 'inline';
					getObj("btnPrint").style.display = 'inline';
					getObj("btnHiPrint").style.display = 'inline';
					getObj("btnLabelPrint").style.display = 'inline';
					getObj("btnAccounting").style.display = 'inline';
					getObj("aesObj").style.display = 'inline';
					getObj("btnDelete").style.display  = 'inline';

					getObj("goWoObj").style.display   = 'inline';
					getObj("tabHwiFrt").style.display = 'inline';
					dispBizBtns('inline');
		
                }else if(frm1.bl_sts_cd.value=='MC'){
                	getObj("btnfromBlModiObj").style.display = 'inline';
                	getObj("btnDelete").style.display   = 'none';
				
                	getObj("goWoObj").style.display  = 'inline';
		
                	getObj("btnCopy").style.display  = 'inline';
                	getObj("btnPrint").style.display = 'inline';
                	getObj("btnHiPrint").style.display = 'inline';
                	getObj("btnLabelPrint").style.display = 'inline';
                	getObj("btnAccounting").style.display = 'inline';
                	getObj("aesObj").style.display = 'inline';
                	
                	getObj("tabHwiFrt").style.display = 'inline';
					dispBizBtns('inline');
					
		
				}else if(frm1.bl_sts_cd.value=='HO'){
                    
					getObj("btnSave").style.display = 'none';
					getObj("btnfromBlModiObj").style.display = 'inline';
                    
					getObj("closeModiObj").style.display = 'inline';
					getObj("bkgCnfObj").style.display = 'none';
					getObj("hblCreObj").style.display = 'none';
					getObj("btnPrint").style.display = 'inline';
					getObj("btnHiPrint").style.display = 'inline';
					getObj("btnLabelPrint").style.display = 'inline';
					getObj("btnAccounting").style.display = 'inline';
					getObj("aesObj").style.display = 'inline';
					getObj("btnCopy").style.display = 'inline';
					getObj("btnDelete").style.display = 'none';
                    
					getObj("goWoObj").style.display  = 'none';
					getObj("tabHwiFrt").style.display = 'inline';
					
					dispBizBtns('none');
					
				}else{
                    
					getObj("btnSave").style.display = 'none';
					getObj("btnfromBlModiObj").style.display = 'inline';
					
					getObj("closeModiObj").style.display = 'inline';
					getObj("bkgCnfObj").style.display = 'none';
					getObj("hblCreObj").style.display = 'none';
					getObj("btnPrint").style.display = 'inline';
					getObj("btnHiPrint").style.display = 'inline';
					getObj("btnLabelPrint").style.display = 'inline';
					getObj("btnAccounting").style.display = 'inline';
					getObj("aesObj").style.display = 'inline';
					getObj("btnCopy").style.display = 'inline';
					getObj("btnDelete").style.display = 'none';
                    
					getObj("goWoObj").style.display  = 'none';
					getObj("tabHwiFrt").style.display = 'inline';
					
					dispBizBtns('none');
					
					//mblMoveObj").style.display= 'none';
					
					// #48835 - [CARGOIS] COPY 한 HBL 의 이상한 현상
		            // Block 된 B/L일 경우 Filing No 수정 못하도록 수정
		           	frm1.ref_no.className = 'search_form-disable';
		            frm1.ref_no.readOnly  = true;
		            getObj("brnRef_no").disabled  = true;	
				}
			}
			
			fnbtnCtl();
		}
		
		/**
		*BL복사 시
		*/
		function searhCopyFrt(){
			<logic:notEmpty name="valMap" property="org_bl_seq">
				//Selling/Debit Freight 조회
				docObjects[2].DoSearch4Post("./AIE_BMD_0024GS.clt",   'f_search_tp=CP&f_cmd='+SEARCHLIST06+'&intg_bl_seq=<bean:write name="valMap" property="org_bl_seq"/>');
		
				//Buying/Crebit List 조회
				docObjects[3].DoSearch4Post("./AIE_BMD_0024_1GS.clt", 'f_search_tp=CP&f_cmd='+SEARCHLIST07+'&intg_bl_seq=<bean:write name="valMap" property="org_bl_seq"/>');
			</logic:notEmpty>
		}
		
		
        <!-- ###Package 코드## -->
        var PCKCD1 = '|';
        var PCKCD2 = '|';
        <% boolean isBegin = false; %>
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
		
		<!-- ###Freight 항목### -->
		var UNITCD1 = ' |';
		var UNITCD2 = ' |';
		<% isBegin = false; %>
        <logic:notEmpty name="valMap" property="UNITCD">
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
	
		
        <!-- ###Rcp Class 항목### -->
        var RCPCD1 = ' ';
        var RCPCD2 = ' ';
        <logic:notEmpty name="valMap" property="RCPCD">
            <bean:define id="rcpList" name="valMap" property="RCPCD"/>
            <logic:iterate id="codeVO" name="rcpList">
                RCPCD1+= '|<bean:write name="codeVO" property="cd_nm"/>';
                RCPCD2+= '|<bean:write name="codeVO" property="cd_val"/>';
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
        
        
        
        <!-- ###JOB_STS LIST 항목 ### -->
        var JBCD1 = '';
		var JBCD2 = '';
		<% isBegin = false; %>
        <bean:define id="jobStsList" name="valMap" property="jobStsList"/>
		<logic:iterate id="JobStsVO" name="jobStsList">
			<% if(isBegin){ %>
				JBCD1+= '|';
				JBCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   JBCD1+= '<bean:write name="JobStsVO" property="cd_val"/>';
			   JBCD2+= '<bean:write name="JobStsVO" property="cd_nm"/>';
		</logic:iterate>
		
		var HWI_FRT_NM = '';
		<% isBegin = false; %>
        <bean:define id="hwiFrtList" name="valMap" property="hwiFrtList"/>
        <logic:iterate id="codeVO" name="hwiFrtList">
            <% if(isBegin){ %>
            	HWI_FRT_NM += '|';
            <% }else{
            	isBegin = true;
               } %>
               HWI_FRT_NM+= '<bean:write name="codeVO" property="cd_nm"/>';
        </logic:iterate>

        <!-- ###Office Info## -->
        <% isBegin = false; %>
        <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
        var v_ofc_cd = "<bean:write name="ofcVO" property="ofc_locl_nm"/>";
        var oth_size_ut_cd = "<bean:write name="ofcVO" property="oth_size_ut_cd"/>";
        var air_body = "<bean:write name="ofcVO" property="air_body"/>";
        var ofc_post_dt = "<bean:write name="ofcVO" property="post_dt_exp"/>";
        var ofc_curr_cd = "<bean:write name="ofcVO" property="trf_cur_cd"/>";
        

        /* jsjang 2013.08.22 office, ae_hand_info 정보 처리 변경 */

        //HBL의 ref_ofc_cd Office 의 Eng Name
        var ref_ofc_eng_nm = "<bean:write name="hblVO" property="ref_ofc_eng_nm"/>";
        
        var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";							
		var v_ofc_cd = "<%=userInfo.getOfc_cd()%>";
		var v_phn = "<%=userInfo.getPhn()%>";  
		var v_fax = "<%=userInfo.getFax()%>";

        //var copy_hndl_info = "1";
        var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
        
        
		function fnbtnCtl(){
			
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
			//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
			var formObj=document.frm1;
			var edob_flg 		= "<%=userInfo.getEdob_flg()%>"; //ENABLE EDITING OTHER OFFICE (B/L) 
			var ref_ofc_cd =  formObj.ref_ofc_cd.value;
			//alert(edob_flg + " "+v_ofc_cd+" "+ref_ofc_cd);
			var btnflag = "Y";
			if (edob_flg == "N"){
				if (v_ofc_cd != ref_ofc_cd){  
					btnflag = "N";
				}
			}  
			if (ref_ofc_cd == "") {  btnflag = "Y"; }
			if (btnflag == "Y"){
				//기존유지
				//$("#btnSave").show();
				//$("#closeModiObj").show();
				//$("#btnDelete").show(); 
			}else{
				$("#btnSave").hide();
				$("#closeModiObj").hide();
				$("#btnDelete").hide(); 
				$("#btnPrint").hide(); 
			}
			 
			
			doBtnAuthority(attr_extension);  
		}
        
   </script>
   <script>
   	 function setupPage()
   	{
   		setOfficeData();btnLoad();loadPage();loadData();doHideProcess();   		
   	}
   	var attr_extension = "<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>";
   </script>
   <style>
<!--
.table_search_head_etc {

    font-family: "Tahoma", "Arial", "Verdana";
    font-size: 11px;
    font-weight: normal;
    vertical-align: middle;
    color: #2D5CAC;
    background-image: url(/opusfwd/web/img/main/star_icon2.gif);
    background-repeat: no-repeat;
    background-position: left center;
    text-indent: 6px;
}
-->
</style>
<form name="frm1" method="POST" action="./AIE_BMD_0020.clt" class="filter">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="h_ofc_cnt_cd" id="h_ofc_cnt_cd" />
	<html:hidden name="hblVO"  property="bl_sts_cd"/>	
    <html:hidden name="hblVO"  property="intg_bl_seq"/>
	<html:hidden name="valMap" property="f_intg_bl_seq"/>
	<input type="hidden" name="mk_bl_no" id="mk_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
	<input	type="hidden" name="f_ref_no"/>
	
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="rd_param" id="rd_param" />
	<input type="hidden" name="mailTitle" id="mailTitle" />
	<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
	
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp"/>
	
	<input type="hidden" name="h_curr_cd" id="h_curr_cd" value="<bean:write name="hblVO" property="curr_cd"/>">
	<input type="hidden" name="h_mbl_curr_cd" id="h_mbl_curr_cd" value="<bean:write name="hblVO" property="mbl_curr_cd"/>">
	
	<!-- jsjang 2013.08.22 office, ae_hand_info 정보 처리 변경 -->
	<input type="hidden" name="h_aeh_hand_info" id="h_aeh_hand_info" value="<bean:write name="ofcVO" property="aeh_hand_info"/>">
	
    <!--  jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. -->
    <input type="hidden" name="f_isNumSep"  id="f_isNumSep" 	value='<bean:write name="valMap" property="f_isNumSep"/>'>	
    
    
    <input type="hidden" name="m_shpr_trdp_nm" id="m_shpr_trdp_nm" 	value='<bean:write name="hblVO" property="m_shpr_trdp_nm"/>'>	
	
	<!-- #47413 [IMPEX]B/L COPY 기능보완  --> 
    <input type="hidden" name="copy_bl_seq" 	value='<bean:write name="valMap" property="org_bl_seq"></bean:write>'/>
	<!-- #50563 관련해서 기관 코드   -->
	<input type="hidden" name="user_offc_cd" 	value='<%=userInfo.getOfc_cd()%>'/>
	
	<!-- #50048 - [IMPEX] B/L PRINT HISTORY 저장관련 ENTRY 화면에서 CODE FIELDS 저장시 업데이트 -->
	<input type="hidden" name="pre_flt_no"       value='<bean:write name="hblVO" property="flt_no"/>' />
	<input type="hidden" name="pre_lnr_trdp_nm"  value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' />
	<input type="hidden" name="pre_shpr_trdp_nm" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>' />
	<input type="hidden" name="pre_iss_trdp_nm"  value='<bean:write name="hblVO" property="iss_trdp_nm"/>' />

	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><span id="bigtitle"><%=LEV3_NM%></span></button></h2>
		<!-- page_title(E) -->
		
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn"><!--  
			 --><button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onClick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!--  
			 --><button type="button" class="btn_normal" onClick="doWork('NEW')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="New"/></button><!--  
			 --><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_normal" style="display:inline;" onClick="doWork('SAVE')" id="btnSave"  name="btnSave" ><bean:message key="Save"/></button></span><!--  
			 --><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('HBL_ADD')" id="btnfromBlModiObj" name="btnfromBlModiObj"><bean:message key="HBL_ADD_AGAIN"/></button></span><!-- 
			 --><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('CLOSE_MODIFY')" id="closeModiObj"><bean:message key="Save"/></button></span><!--  
			 --><span style="display:none;" btnAuth="CONFIRM"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('BKGCNF')" id="bkgCnfObj" name="bkgCnfObj"><bean:message key="Booking"/>&nbsp;<bean:message key="Confirm"/></button></span><!--  
			 --><span style="display:none;" btnAuth="HBL_CREATION"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('HBLCRE')" id="hblCreObj" name="hblCreObj"><bean:message key="HBL_Creation"/></button></span><!--  
			 --><span style="display:none;" btnAuth="COPY"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('COPY')" id="btnCopy" name="btnCopy"><bean:message key="Copy"/></button></span><!--  
			 --><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" style="display:none;" onclick="doWork('PRINT')" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button></span><!--
			 --><span style="display:none;" btnAuth="HI_PRINT"><button type="button" class="btn_normal" style="display:none;"  onclick="doWork('HI_PRINT')" id="btnHiPrint" name="btnHiPrint"><bean:message key="Hawaii_Print"/></button></span><!--
			 --><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" style="display:none;" onclick="doWork('AIR_LABEL')" id="btnLabelPrint" name="btnLabelPrint"><bean:message key="Label"/></button></span><!--
			 --><span style="display:none;" btnAuth="B_SA"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('ShippingAdvice')" id="btnShippingAdvice" name="btnShippingAdvice"><bean:message key="B.SA"/></button></span><!--  
			 --><span style="display:none;" btnAuth="ACCOUNTING"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('GOTOACCT')" id="btnAccounting" name="btnAccounting"><bean:message key="Accounting"/></button></span><!--  
			 --><span style="display:none;" btnAuth="B_AES"><button type="button" class="btn_normal" style="display:none;" onclick="doWork('AES')" id="aesObj" name="aesObj"><bean:message key="B.AES"/></button></span><!--  
			 --><span style="display:none;" btnAuth="P_REPORT"><button type="button" class="btn_normal" onClick="doWork('PROFIT_REPORT')" ><bean:message key="P_Report"/></button></span><!--  
			 --><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>"><button type="button" class="btn_normal" style="display:none;" onClick="checkBlSts();doWork('REMOVE')" id="btnDelete" name="btnDelete" ><bean:message key="Delete"/></button></span>
		<!-- opus_design_btn(E) -->
		</div>
		
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
<div class= "wrap_search_tab">
	<div class= "opus_design_inquiry" >
		<table>
			<colgroup>
				<col width="60" />
				<col width="300" />
				<col width="*" />
				<col width="50" />
				<col width="530" />
			</colgroup>
			<tr>
				<th><bean:message key="HAWB_No"/></th>
				<td>
					<input type="text" required name="f_bl_no" id="f_bl_no" maxlength="40"  value="<bean:write name="valMap" property="f_bl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openAiePopUp('HBL_POPLIST',this)"></button>
				</td>
				<td></td>
				<th class="table_search_head_etc"><bean:message key="Status"/>:</th> 
				<td><input  tabindex="-1" type="text" name="bl_sts_label" value="<bean:write name="hblVO" property="bl_sts_label"/>" style="width:130px;border:0;background-color:#f7f9fc;padding-top:5;color:#B60500" readOnly></td>
			</tr>
		</table>
	</div>
</div>	
 <div class="wrap_result_tab">
    <!-- opus_design_grid(S) -->
    <div class="opus_design_grid"  id="mainTable" style="display: none;">
        <script type="text/javascript">comSheetObject('sheet1');</script>
    </div>
    <!-- opus_design_grid(E) -->
    <ul class="opus_design_tab">
        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Booking"/>&nbsp;&nbsp;<bean:message key="HAWB"/></span></a></li>
        <li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Mark_Desc"/></span></a></li>
        <li id=Tab03><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Freight"/></span></a></li>
        <li id=Tab04><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Work_Order"/></span></a></li>
        <li id=Tab05><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Status"/></span></a></li>
        <span style="display:none;" btnAuth="HI_PRINT"><li id="tabHwiFrt" name="tabHwiFrt" style="display: none"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('06');"><span><bean:message key="Hawaii_Freight"/></span></a></li></span>
    </ul>
    
    <div id="tabLayer" style="display:inline" name="tabLayer">
    	<%@ include file = "./AIE_BMD_0021.jsp"%>
    </div>
    <div id="tabLayer" style="display:none" name="tabLayer">
   		 <%@ include file = "./AIE_BMD_0022.jsp"%>
    </div>
    <div id="tabLayer" style="display:none" name="tabLayer">
    	<%@ include file = "./AIE_BMD_0024.jsp"%>
    </div>
    <div id="tabLayer" style="display:none" name="tabLayer">
    	<%@ include file = "./AIE_BMD_0025.jsp"%>
    </div>
    <div id="tabLayer" style="display:none" name="tabLayer">
    	<%@ include file = "./AIE_BMD_0026.jsp"%>
    </div>
    <div id="tabLayer" style="display:none" name="tabLayer"><!--Hawaii Freight-->
		<%@ include file = "./AIE_BMD_0029.jsp"%>
	</div>
		
</div>	    

</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
	 <input type="hidden" name="goWhere" value="fd" id="goWhere" />
    <input type="hidden" name="bcKey" value="blFileDown" id="bcKey" />
    <input type="hidden" name="s_palt_doc_seq" value="" id="s_palt_doc_seq" />
    <input type="hidden" name="intg_bl_seq" value="" id="intg_bl_seq" />
    <input type="hidden" name="docType" value="" id="docType" />
</form>

<script type="text/javascript">
fnbtnCtl();
</script>	
		
</body>
</html>