<%--


/*=========================================================
*Copyright(c) 20px14 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0020px.jsp
*@FileTitle  :  HGBL등록
*@author     : PhiTran
*@version    : 1.0
*@since      : 20px14/06/23
=========================================================*/

--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
   <link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/masterbl/script/SEE_BMD_0040.js"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js"></script>
	<script>	
	 var INST_PROFIT = "N";
		function setupPage()
		{
			setOfficeData();
			loadPage();
			btnLoad();
			doHideProcess();
			loadData();
		}
		function dispBizBtns(dispTp){
			//Freight버튼
			getObj("sdBtns").style.display    = dispTp;
			getObj("profitBtns").style.display = INST_PROFIT == "Y" ? dispTp : 'none';
			getObj("bcBtns").style.display    = dispTp;
			getObj("dcBtns").style.display    = dispTp;
			getObj("finalModiObj").style.display = 'none';
			
		}
		function btnLoad(){

			// post date 수정 권한
        	//if(user_role_cd=="ADM"){
        	//	frm1.post_dt.className = "search_form";
        	//	frm1.post_dt.readOnly = false;
        		
        		//20px12.11.14 요청사항에 의해서 일단 숨김
        		//getObj("finalModiObj").style.display = 'inline';
        	//}
			
			frm1.ref_no.className = 'search_form';
		    frm1.ref_no.readOnly  = false;

			if(user_lang_cd == "KO"){
				getObj("mfObj").style.display 		= 'inline';
            }else{
            	getObj("mfObj").style.display 		= 'none';
            } 
        	
			if(frm1.bl_sts_cd.value=='NA'){
				//frm1.mrn.className = 'search_form';
				//frm1.mrn.readOnly  = false;
				
				//frm1.lnr_bkg_no.className = 'search_form';
				//frm1.lnr_bkg_no.readOnly  = false;
				getObj("btnAccounting").style.display = 'none';
			}else{
				 
				getObj("btnPProfit").style.display  = 'inline';	
				 if(frm1.bl_sts_cd.value=='MC'){
					//frm1.mrn.className = 'search_form';
					//frm1.mrn.readOnly  = false;
					
					//frm1.lnr_bkg_no.className = 'search_form';
					//frm1.lnr_bkg_no.readOnly  = false;
					
					//frm1.bl_no.className = 'search_form';
					//frm1.bl_no.readOnly  = false;
					
					
					//modiObj").style.display = 'inline';
					getObj("btnDelete").style.display  = 'inline';
					//emlSnd").style.display  = 'inline';
					getObj("fileUp").style.display  = 'inline';
					getObj("sDoc").style.display  = 'inline';
					getObj("btnCopy").style.display = 'inline';
					getObj("hblObj").style.display = 'inline';

					dispBizBtns('inline');
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
				 }else if(frm1.bl_sts_cd.value=='MF'){
					 //frm1.mrn.className = 'search_form-disable';
		             //frm1.mrn.readOnly  = true;
		                
		             //frm1.lnr_bkg_no.className = 'search_form-disable';
		             //frm1.lnr_bkg_no.readOnly  = true;
		        
		             //frm1.bl_no.className = 'search_form-disable';
		             //frm1.bl_no.readOnly  = true;
				
		             //modiObj").style.display = 'none';
		             getObj("btnDelete").style.display  = 'none';
				     //emlSnd").style.display  = 'none';
		             getObj("fileUp").style.display  = 'none';	
		             getObj("sDoc").style.display  = 'none';	
		             getObj("btnCopy").style.display = 'none';
		             getObj("hblObj").style.display = 'none';

		             dispBizBtns('inline');
		           	 //#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
		             getObj("goWoObj").style.display = 'inline';
				 }else if(frm1.bl_sts_cd.value=='HO'){
					 getObj("btnSave").style.display 		= 'none';
					 getObj("closeModiObj").style.display = 'inline';
					 getObj("btnDelete").style.display  		= 'none';
					 getObj("btnCopy").style.display 		= 'inline';
		             if(user_lang_cd == "KO"){
		            	 getObj("mfObj").style.display 		= 'inline';
		            }else{
		            	getObj("mfObj").style.display 		= 'none';
		            } 
		             getObj("btnPrint").style.display 		= 'inline';
		             getObj("btnLabel").style.display 		= 'inline';
		             getObj("btnLabel2").style.display 		= 'inline';
		             getObj("hblObj").style.display		= 'inline';

		             dispBizBtns('none');
				 }else if(frm1.bl_sts_cd.value=='HF'){
					 getObj("btnSave").style.display 		= 'none';
					 getObj("closeModiObj").style.display = 'inline';
					 getObj("btnDelete").style.display  		= 'none';
					 getObj("btnCopy").style.display 		= 'inline';
		             if(user_lang_cd == "KO"){
		            	 getObj("mfObj").style.display 		= 'inline';
		             }else{
		            	 getObj("mfObj").style.display 		= 'none';
		             } 
		             getObj("btnPrint").style.display 		= 'inline';
		             getObj("btnLabel").style.display 		= 'inline';
		             getObj("btnLabel2").style.display 		= 'inline';
		             getObj("hblObj").style.display 		= 'none';

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
        var TPCD3 = '';
        <% boolean isBegin = false; %>
        <!--Role 코드조회-->
        <bean:define id="tpszList"  name="valMap" property="cntrTpszList"/>
        <logic:iterate id="codeVO" name="tpszList">
            <% if(isBegin){ %>
                TPCD1+= '|';
                TPCD2+= '|';
                TPCD3+= '|';
            <% }else{
                  isBegin = true;
               } %>
            TPCD1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
            TPCD2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
            TPCD3+= '<bean:write name="codeVO" property="cntr_grp_cd"/>';
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


        <!-- temp code -->
		var TEMPCD1 = '';
		var TEMPCD2 = '';
		<% isBegin = false; %>
        <logic:notEmpty name="valMap" property="TEMPCD">
            <bean:define id="tempcdList" name="valMap" property="TEMPCD"/>
            <logic:iterate id="codeVO" name="tempcdList">
                <% if(isBegin){ %>
                	TEMPCD1+= '|';
                	TEMPCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   TEMPCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
                   TEMPCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>
		<!-- vent code -->
		var VENTCD1 = '';
		var VENTCD2 = '';
		<% isBegin = false; %>
        <logic:notEmpty name="valMap" property="VENTCD">
            <bean:define id="ventcdList" name="valMap" property="VENTCD"/>
            <logic:iterate id="codeVO" name="ventcdList">
                <% if(isBegin){ %>
                	VENTCD1+= '|';
                	VENTCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   VENTCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
                   VENTCD2+= '<bean:write name="codeVO" property="cd_val"/>';
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

		<!-- 요구사항 #2560px6 : [B/L Entry] B/L에서의 Freight Input 시 Currency 선택 옵션 변경 //-->
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
        
		var ofc_cd = "<%= userInfo.getOfc_cd() %>";
		
		
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
        var ofc_post_dt = "<bean:write name="ofcVO" property="post_dt_exp"/>";
        var ofc_curr_cd = "<bean:write name="ofcVO" property="trf_cur_cd"/>";
        var pps_use_flg = "<bean:write name="ofcVO" property="pps_use_flg"/>";
        var pps_use_flg = "<bean:write name="ofcVO" property="pps_use_flg"/>";
        
        var shpAddr = '<bean:write name="hblVO" property="shpr_trdp_nm"/> O/B OF';

        var user_role_cd = "<%=userInfo.getRole_cd()%>";
        var user_lang_cd = "<%=userInfo.getUse_lang_cd()%>";

        var usrId = "<%= userInfo.getUsrid() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrNm = "<%= userInfo.getUser_name() %>";
		var usrEml = "<%= userInfo.getEml() %>";
		var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
		var attr_extension = "<%= roleBtnVO.getAttr_extension() %>"; 
		
		
		
		
		function fnbtnCtl(){
			
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
			//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
			var formObj=document.frm1;
			var edob_flg 		= "<%=userInfo.getEdob_flg()%>"; //ENABLE EDITING OTHER OFFICE (B/L) 
			var ref_ofc_cd =  formObj.h_ref_ofc_cd.value;
			//alert(edob_flg + " "+ofc_cd+" "+ref_ofc_cd);
			var btnflag = "Y";
			if (edob_flg == "N"){
				if (ofc_cd != ref_ofc_cd){  
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
				//$("#closeModiObj").hide();
				$("#btnDelete").hide(); 
				$("#btnPrint").hide(); 
			}
 

			doBtnAuthority(attr_extension);  
		}
	 
   </script>
<form name="frm1" method="POST" action="./SEE_BMD_0040.clt" class="filter">
	<input type="hidden" name="f_cmd" id="f_cmd" />

	<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" id="user_id" />

	<html:hidden name="hblVO"  property="bl_sts_cd"/>	
    <html:hidden name="hblVO"  property="intg_bl_seq"/>
	<html:hidden name="valMap" property="f_intg_bl_seq"/>
	<html:hidden name="valMap" property="f_hbl_intg_bl_seq"/>
	<input type="hidden" name="mk_bl_no" value='<bean:write name="hblVO" property="bl_no"></bean:write>' id="mk_bl_no" />
	<input type="hidden" name="h_bl_no" value='<bean:write name="hblVO" property="bl_no"></bean:write>' id="h_bl_no" />
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="rd_param" id="rd_param" />

	<input type="hidden" name="mailTitle" value="" id="mailTitle" />
	<input type="hidden" name="mailTo" value="" id="mailTo" />

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" value="" id="rpt_biz_tp" />
	<input type="hidden" name="rpt_biz_sub_tp" value="" id="rpt_biz_sub_tp" />
	<input type="hidden" name="rpt_tp" value="" id="rpt_tp" />
	<!--  Report ==> OutLook연동 파라미터 (E) -->

    <!-- check freight -->
    <input type="hidden" name="chk_fr_trdp_cd" value="" id="chk_fr_trdp_cd" />
    <input type="hidden" name="chk_fr_trdp_nm" value="" id="chk_fr_trdp_nm" />
    <input type="hidden" name="chk_fr_inv_curr_cd" value="" id="chk_fr_inv_curr_cd" />

	<input type="hidden" name="h_temp_val" value="" id="h_temp_val" />

    <!-- 조회된 Ref_no , ref 번호 변경시 비교를 위해서 -->
    <input type="hidden" name="sel_ref_no" value="<bean:write name="hblVO" property="ref_no"></bean:write>" id="sel_ref_no" />
    <!-- 조회된 lnr_bkg_no , lnr_bkg_no 번호 변경시 비교를 위해서 -->
    <input type="hidden" name="org_lnr_bkg_no" value="<bean:write name="hblVO" property="lnr_bkg_no"></bean:write>" id="org_lnr_bkg_no" />
    <!-- 업데이트 시에 변경된 값과 비교해 보기 위해서 -->
    <input type="hidden" name="org_post_dt" value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"></wrt:write>' id="org_post_dt" />
    
     <!-- 업데이트 시에 변경된 값과 비교해 보기 위해서 Block page에서 post_dt 변경후 화면에서 아래 값들을 변경 체크 위해 유지 -->     
    <input type="hidden" name="org_etd_dt_tm"  id="org_etd_dt_tm" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>
    <input type="hidden" name="org_eta_dt_tm"  id="org_eta_dt_tm" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>

    <!--  jsjang 20px13.8.29 #1760px4 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. -->
    <input type="hidden" name="f_isNumSep" value='<bean:write name="valMap" property="f_isNumSep"></bean:write>' id="f_isNumSep" />   
    
    <!-- #30284 [BINEX]OEH On-Board Date 동기화 --> 
    <input type="hidden" name="clean_on_board" 	value=''> 

    <!-- #47413 [IMPEX]B/L COPY 기능보완  --> 
    <input type="hidden" name="copy_bl_seq" 	value='<bean:write name="valMap" property="org_bl_seq"></bean:write>'/>
    
   <!-- page_title_area(S) -->
	<div class="page_title_area clear ">
		<!-- page_title(S) -->
		<h2 class="page_title" id="bigtitle"><button type="button"><span><%=LEV3_NM%></span></button></h2>
		<!-- page_title(E) -->
			
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn" >
				<span style="display: none;" btnAuth="FINAL"><button style="display: none;" type="button" class="btn_normal" onclick="doWork('FINAL_MODIFY')" id="finalModiObj" name="finalModiObj"><bean:message key="Final"/></button></span><!-- 
			--><span style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><button type="button" class="btn_accent" onClick="doWork('SEARCHLIST')" ><bean:message key="Search"/></button></span><!--  
			--><span style="display: none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><button type="button" class="btn_normal" onClick="doWork('NEW')"><bean:message key="New"/></button></span><!--  
			--><span style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_normal" onclick="doWork('SAVE');" name="btnSave" id="btnSave"><bean:message key="Save"/></button></span><!-- 
			--><span style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button style="display: none;" type="button" class="btn_normal" onclick="doWork('CLOSE_MODIFY');" name="closeModiObj" id="closeModiObj"><bean:message key="Save"/></button></span><!-- 
			--><span style="display: none;" btnAuth="COPY"><button style="display: none;" type="button" class="btn_normal" onclick="doWork('COPY')" name="btnCopy" id="btnCopy" ><bean:message key="Copy"/></button></span><!-- 
			--><span style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" onClick="doWork('PRINT')" name="btnPrint" id="btnPrint" ><bean:message key="Print"/></button></span><!-- 
			--><span style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" onclick="doWork('PACKAGE_LABEL')" id="btnLabel" name="btnLabel"><bean:message key="Label"/></button></span><!-- 
			--><span style="display: none;" btnAuth="LABEL2"><button type="button" class="btn_normal" onclick="doWork('PACKAGE_LABEL2')" id="btnLabel2" name="btnLabel2"><bean:message key="Label"/>2</button></span><!--
			--><span style="display: none;" btnAuth="ACCOUNTING"><button type="button" class="btn_normal" onclick="doWork('GOTOACCT')" name="btnAccounting" id="btnAccounting" ><bean:message key="Accounting"/></button></span><!-- 
			--><span style="display: none;" btnAuth="P_REPORT"><button style="display: none;" type="button" class="btn_normal" onclick="doWork('PROFIT_REPORT')" name="btnPProfit" id="btnPProfit" ><bean:message key="P_Report"/></button></span><!-- 
			--><span style="display: none;" btnAuth="M_F"><button type="button" class="btn_normal" onclick="doWork('MFPRINT')" name="mfObj" id="mfObj" ><bean:message key="M_F"/></button></span><!-- 
			--><span style="display: none;" btnAuth="<%= roleBtnVO.getAttr4() %>"><button style="display: none;" type="button" class="btn_normal" onclick="doWork('REMOVE')" name="btnDelete" id="btnDelete" ><bean:message key="Delete"/></button></span><!--
			--><span style="display: none;" btnAuth="HBL_CREATE"><button style="display: none;" type="button" class="btn_normal" onclick="doWork('HBL_ENTRY')" name="hblObj" id="hblObj" ><bean:message key="HBL_Create"/></button></span>
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
<div class= "wrap_search_tab">
  <div class= "opus_design_inquiry wFit">
  	<table>
  		<colgroup>
  			<col width="50" />
  			<col width="170px" />
  			<col width="70px" />
  			<col width="170px" />
  			<col width="110px" />
  			<col width="*" />
  		</colgroup>
  		<tr>
            <th><bean:message key="Ref_No"/></th>
            <td>
                <input name="f_ref_no" maxlength="20" value="<bean:write name="valMap" property="f_ref_no"/>" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;resize:none;width:130px;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
                --><button type="button" name="btns_search1" id="btns_search1" class="input_seach_btn" tabindex="-1" onClick="srOpenPopUp('REF_POPLIST',this)"></button>
            </td>
            <th><bean:message key="MBL_No"/></th>
            <td>
                <input name="f_bl_no"  maxlength="40" value="<bean:write name="valMap" property="f_bl_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:130px;text-transform:uppercase;" onblur="strToUpper(this)"><!--  
                --><button type="button" name="btns_search1" id="btns_search1" class="input_seach_btn" tabindex="-1" onClick="srOpenPopUp('MBL_POPLIST',this)"></button>
            </td>
            <th><bean:message key="Liner_Bkg_No"/></th>
            <td>
                <input name="f_lnr_bkg_no"  maxlength="20" value="<bean:write name="valMap" property="f_lnr_bkg_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:130px;text-transform:uppercase;" onblur="strToUpper(this)">
            </td>
		</tr>
  	</table>
	</div>
</div>	
<!-- page_title_area(E) -->	
<div class="wrap_result_tab">
	<div class="opus_design_grid" style="display: none;">
		<script language="javascript">comSheetObject('sheet1');</script>
	</div>
    <ul class="opus_design_tab">
        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Master_BL_Entry"/></span></a></li>
        <li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Container"/></span></a></li>
        <li id=Tab03><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Mark_Desc"/></span></a></li>
        <li id=Tab04><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Freight"/></span></a></li>
        <li id=Tab05><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Work_Order"/></span></a></li>
        <li id=Tab06><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('06');"><span><bean:message key="Shipping_Document"/></span></a></li>
        <li id=Tab07><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('07');"><span><bean:message key="Status"/></span></a></li>
    </ul>

		 <!-- tab_player_ 1 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:inline"><!--Booking&BL-->
			<div class= "opus_design_inquiry" style="margin-bottom:8px;">
				<table>
					<colgroup>
						<col width="60">
						<col width="180">
						<col width="115">
						<col width="140">
						<col width="70">
						<col width="150">
						<col width="130">
						<col width="140">
						<col width="130">
						<col width="*">
					</colgroup>
					<tbody>
						 <tr>
                                            	<th><bean:message key="Ref_No"/></th>
                                                <td>
                                                    <input type="text" name="ref_no" maxlength="20" value='<bean:write name="hblVO" property="ref_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:110px;text-transform:uppercase;" onblur="strToUpper(this)" onclick="if(frm1.ref_no.value=='AUTO'){frm1.ref_no.value=''}"><!-- 
                                                    --><bean:define id="ofcList" name="valMap" property="ofcList"/><!-- 
                                                    --><html:select name="hblVO" property="ref_ofc_cd" styleClass="search_form" style="width:55px;" onchange="ofcChDEta();">
														<html:options collection="ofcList" property="ofc_cd" labelProperty="ofc_cd"/>
													</html:select>
													<input type="hidden" name="h_ref_ofc_cd" value="<bean:write name="hblVO" property="ref_ofc_cd"/>">
                                                </td>
                                                <th><bean:message key="Liner_Bkg_No"/></th>
                                                <td>
                                                    <input type="text" name="lnr_bkg_no" value="<bean:write name="hblVO" property="lnr_bkg_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:120px;text-transform:uppercase;" onblur="strToUpper(this);checkDuplicateLinerBkgNo()" maxlength="20">
                                                </td>
                                                <th><bean:message key="MBL_No"/></th>
                                                <td>
                                                    <input type="text" name="bl_no" value='<bean:write name="hblVO" property="bl_no"/>' onKeyDown="setCarrierCd(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:120px;text-transform:uppercase;" onblur="strToUpper(this);setCarrierCd(this);" maxlength="40">
                                                </td>
                                                <th><bean:message key="BL_Type"/></th>
												<td>
													<bean:define id="blTypeList" name="valMap" property="blTypeList"/>
													<html:select name="hblVO" property="hbl_tp_cd" styleClass="search_form" style="width:100px;" onchange="blTpChange(this.value)">
														<html:options collection="blTypeList" property="cd_val" labelProperty="cd_nm"/>
													</html:select>
												</td>
												<th><bean:message key="MRN"/></th>
                                                <td>
                                                    <input type="text" name="mrn"  value="<bean:write name="hblVO" property="mrn"/>"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:120px;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="20">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th><bean:message key="Post_Date"/></th>
                                                <td>
                                                    <input type="text" name="post_dt" value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:110;text-transform:uppercase;" readonly>
                                                </td>
                                                <th><bean:message key="Sub_MBL_No"/></th>
                                                <td>
                                                    <input type="text" name="sub_bl_no" value='<bean:write name="hblVO" property="sub_bl_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:120px;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="20" style="ime-mode:disabled;resize:none; text-transform:uppercase;" >
                                                </td>
                                                <th><bean:message key="ITN_No"/></th>
                                                <td>
                                                    <input type="text" name="itn_no" value='<bean:write name="hblVO" property="itn_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none; text-transform:uppercase;width:120px;" onblur="strToUpper(this)" maxlength="20" >
                                                </td>
                                                <th><bean:message key="Service_Contract_No"/></th>
                                                <td>
                                                    <input type="text" name="sc_no"    value='<bean:write name="hblVO" property="sc_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:100px;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="20" style="ime-mode:disabled;resize:none; text-transform:uppercase;" >
                                                </td>
												<th><bean:message key="FWDR_Reference_No"/></th>
                                                <td>
                                                    <input type="text" name="cust_ref_no"  value='<bean:write name="hblVO" property="cust_ref_no"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:120px;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="20">
                                                </td>
                                            </tr>
						</tbody>
					</table>
			</div>
			
			<div class="layout_wrap">
			<!-- layout_vertical_2 a(S) -->
			    <div class="layout_vertical_3 sm" style="height:610px">
			    	<h3 class="title_design" style="margin-bottom:0"><bean:message key="Customer"/></h3>
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
                                                                <input type="text"   name="shpr_trdp_nm" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  id="shpr_trdp_nm_id"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:calc(100% - 30px);text-transform:uppercase;" onblur="strToUpper(this)" maxlength="50" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);}"><!-- 
                                                             --><button type="button" name="shipper" id="shipper" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                                             --><input type="hidden" name="shpr_trdp_cd" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_shipper',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:48;">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <textarea name="shpr_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off">
<bean:write name="hblVO" property="shpr_trdp_addr" filter="false"/></textarea>
                                                            </td>
                                                        </tr>
                                                         <tr>
                                                            <th><a href="javascript:clearBlPrnr('C01');"><bean:message key="Consignee"/></a></th>
                                                            <td>
                                                                <input type="hidden" name="cnee_trdp_cd"  value='<bean:write name="hblVO" property="cnee_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_consignee',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;resize:none; text-transform:uppercase;width:48px;"><!-- 
                                                             --><input type="text"   name="cnee_trdp_nm"  value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:calc(100% - 30px);text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);}"><!-- 
                                                             --><button type="button" name="consignee" id="consignee" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <textarea name="cnee_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address')" WRAP="off">
<bean:write name="hblVO" property="cnee_trdp_addr" filter="false"/></textarea>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th><a href="javascript:clearBlPrnr('N01');"><bean:message key="Notify"/></a></th>
                                                            <td>
                                                                <input type="hidden"   name="ntfy_trdp_cd" value='<bean:write name="hblVO" property="ntfy_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_notify',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_notify',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;resize:none; text-transform:uppercase;width:48;"><!-- 
                                                             --><input type="text" name="ntfy_trdp_nm"   value='<bean:write name="hblVO" property="ntfy_trdp_nm"/>'   class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:calc(100% - 30px);text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('notify'), frm1.ntfy_trdp_nm.value);}"><!-- 
                                                             --><button type="button" name="notify" id="notify" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <a href="javascript:copyValue('SAC', 'S', 'O', 'M');"><bean:message key="Same_As_Consignee"/></a>&nbsp;<!-- 
                                                             --><a href="javascript:copyValue('CNEE', 'S', 'O', 'M');"><bean:message key="Copy"/></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <textarea name="ntfy_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address')" WRAP="off">
<bean:write name="hblVO" property="ntfy_trdp_addr" filter="false"/></textarea>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th><a href="javascript:clearBlPrnr('A01');"><bean:message key="Forwarding_Agent"/></a></th>
                                                            <td>
                                                                <input type="hidden" name="agent_trdp_cd"  value='<bean:write name="hblVO" property="agent_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_agent',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_agent',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;resize:none; text-transform:uppercase;width:48px;"><!-- 
                                                             --><input type="text"   name="agent_trdp_nm"  value='<bean:write name="hblVO" property="agent_trdp_nm"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:calc(100% - 30px);text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('agent'), frm1.agent_trdp_nm.value);}"><!-- 
                                                             --><button type="button" name="agent" id="agent" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <textarea name="agent_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="ime-mode:disabled;resize:none;resize:none;width:100%;height:80px;text-transform:uppercase;overflow:hidden;font-family:TAHOMA;" onblur="strToUpper(this);chkCmpAddr(this, 'Agent Address')" WRAP="off">
<bean:write name="hblVO" property="agent_trdp_addr" filter="false"/></textarea>
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
				<div class="layout_vertical_3 pad_left_8">
			    	<div class="opus_design_inquiry sm" style="height:610px">
				    	<table>
				    		<colgroup>
				    			<col width="115px" />
				    			<col width="100px" />
				    			<col width="50px" />
				    			<col width="*" />
				    		</colgroup>
				    		<tbody>
				    			<tr>
									<th><a href="javascript:clearBlPrnr('P03');"><bean:message key="Triangle_Agent"/></a></th>
									<td colspan="3">
                                           <input type="text" name="prnr_trdp_cd2" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd2"/>' onKeyDown="codeNameAction('trdpCode_partner2',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner2',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                        --><button type="button" name="partner2" id="partner2" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                        --><input type="text"   name="prnr_trdp_nm2" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm2"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:157px;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('partner2'), frm1.prnr_trdp_nm2.value);}">
										<input type="hidden" name="prnr_trdp_addr2" value='<bean:write name="hblVO" property="prnr_trdp_addr2"/>'>                                                        
									</td>
					            </tr>
					            <tr>
									<th><a href="javascript:clearBlPrnr('P01');"><bean:message key="Destination_Agent"/></a></th>
									<td colspan="3">
                                           <input type="text" name="prnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd"/>' onKeyDown="if(this.readOnly==true){return};codeNameAction('trdpCode_partner',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                        --><button type="button" name="partner" id="partner" class="input_seach_btn" tabindex="-1" onClick="if(frm1.prnr_trdp_cd.readOnly==true){return};openSeeMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                        --><input type="text"   name="prnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:157px;" onKeyPress="if(this.readOnly==true){return};if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('partner'), frm1.prnr_trdp_nm.value);}">
										    <input type="hidden" name="prnr_trdp_addr" value='<bean:write name="hblVO" property="prnr_trdp_addr"/>'>                                                        
									</td>
					            </tr>
					            <tr>
									<td colspan="3"><h3 class="title_design mar_top_8" style="margin-bottom:0"><bean:message key="Vessel"/></h3>	</td>
								</tr>
								<tr>
									<th><bean:message key="Liner"/></th>
									<td colspan="3">
										<input type="text"   name="lnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_sea_liner',this, 'onKeyDown');" onblur="strToUpper(this);codeNameAction('trdpCode_sea_liner',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                        --><button type="button" name="liner" id="liner" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST_MS',this)"></button><!-- 
                                        --><input type="text"   name="lnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:157px;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST_MS', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}">
									</td>
								</tr>
								<tr>
                                     <th><bean:message key="VSL_VOY"/></th>
                                     <td colspan="3">
                                         <input type="hidden" name="trnk_vsl_cd" value='<bean:write name="hblVO" property="trnk_vsl_cd"/>' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onblur="codeNameAction('srVessel',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;">
                                         <input type="text"   name="trnk_vsl_nm" value='<bean:write name="hblVO" property="trnk_vsl_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:104px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('VESSEL_POPLIST', document.getElementById('trunkvessel'), frm1.trnk_vsl_nm.value);}"><!-- 
                                        --><button type="button" name="trunkvessel" id="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('VESSEL_POPLIST',this)"></button><!-- 
                                        --><input type="text"   name="trnk_voy"    value='<bean:write name="hblVO" property="trnk_voy"/>'    class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:128px;text-transform:uppercase;" maxlength="15" onblur="strToUpper(this)">
                                     </td>
                                 </tr>
                                 <tr>
		                               <th><bean:message key="ETD"/></th>
		                               <td>
		                                   <!-- #30284 [BINEX]OEH On-Board Date 동기화 : cobChange()추가 -->
                                           <input required name="etd_dt_tm" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1);cobChange();" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'ETD');cobChange();" size='11' maxlength="10" class="search_form"><!-- 
                                        --><button required  type="button" class="calendar" tabindex="-1" name="etd_dt_tm_cal" id="etd_dt_tm_cal"  onclick="doDisplay('DATE1',frm1.etd_dt_tm);" ></button>
		                               </td>
		                               <th><bean:message key="ETA"/></th>
		                               <td>
		                                   <input name="eta_dt_tm" id="eta_dt_tm" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'ETA');" size='11' maxlength="10" class="search_form"><!-- 
                                        --><button type="button" class="calendar" tabindex="-1" name="eta_dt_tm_cal" id="eta_dt_tm_cal"  onclick="doDisplay('DATE1',frm1.eta_dt_tm);" ></button>
		                               </td>
		                           </tr>
		                           <tr>
		                               <th><bean:message key="ETD_Of_POR"/></th>
		                               <td colspan="3">
		                                   <input name="etd_por_tm" id="etd_por_tm" value='<wrt:write name="hblVO" property="etd_por_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'ETD of POR');" size='11' maxlength="10" class="search_form"><!-- 
                                        --><button type="button" class="calendar" tabindex="-1" name="etd_por_tm_cal" id="etd_por_tm_cal"  onclick="doDisplay('DATE1',frm1.etd_por_tm);" ></button>
		                               </td>
                                    </tr>
                                    <tr>
										<th><bean:message key="Billing_Carrier"/></th>
										<td  colspan="3">
											<input type="text"   name="carr_trdp_cd" value='<bean:write name="hblVO" property="carr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_carr',this, 'onKeyDown');"  onblur="strToUpper(this); codeNameAction('trdpCode_carr',this, 'onKeyDown');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" maxlength="20" onKeyPress="ComKeyOnlyAlphabet('uppernum');"><!-- 
                                        --><button type="button" name="carr" id="carr" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                        --><input type="hidden" name="carr_trdp_addr" value='<bean:write name="hblVO" property="carr_trdp_addr"/>'><!-- 
                                        --><input type="text"   name="carr_trdp_nm" value='<bean:write name="hblVO" property="carr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:157px;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('carr'), frm1.carr_trdp_nm.value);}" maxlength="50">
											</td>
								</tr>
								<tr>
									<td colspan="2">
									<h3 class="title_design mar_top_8" style="margin-bottom:0"><bean:message key="Route"/></h3>
		                        	</td>
		                        </tr>
		                         <tr>
		                               <th><bean:message key="POR"/></th>
		                               <td colspan="3">
		                                   <input type="text" name="por_cd" maxlength="5" value='<bean:write name="hblVO" property="por_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_por',this, 'onKeyDown','S')" onBlur="codeNameAction('Location_por',this, 'onBlur','S');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;disabled;width:75px;"><!-- 
		                                 --><button type="button" name="por" id="por" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this,'','S')"></button><!-- 
		                                 --><html:hidden name="hblVO" property="por_nod_cd"/><!-- 
		                                 --><input type="text" name="por_nm" value='<bean:write name="hblVO" property="por_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('por'), frm1.por_nm.value);}" maxlength="50">
		                               </td>
		                           </tr>
		                           <tr>
		                               <th><bean:message key="POL"/></th>
		                               <td colspan="3">
		                                   <input required  type="text" name="pol_cd" maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','S');" onBlur="codeNameAction('Location_pol',this, 'onBlur','S');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                        --><button type="button" name="pol" id="pol" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                                        --><html:hidden name="hblVO" property="pol_nod_cd"/><!-- 
                                        --><input required  type="text" name="pol_nm" maxlength="50" value='<bean:write name="hblVO" property="pol_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}">
		                               </td>
		                           </tr>
		                           <tr>
		                               <th><bean:message key="POD"/></th>
		                               <td colspan="3">
		                                   <input required  type="text" name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown','S')" onBlur="codeNameAction('Location_pod',this, 'onBlur','S');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                        --><button type="button" name="pod" id="pod" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                                        --><html:hidden name="hblVO" property="pod_nod_cd"/><!-- 
                                        --><input required  type="text" name="pod_nm" maxlength="50" value='<bean:write name="hblVO" property="pod_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('pod'), frm1.pod_nm.value);}">
		                               </td>
		                           </tr>
		                           <tr>
		                               <th><bean:message key="DEL"/></th>
		                               <td colspan="3">
		                                   <input type="text" name="del_cd" maxlength="5" value='<bean:write name="hblVO" property="del_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_del',this, 'onKeyDown','S')" onBlur="codeNameAction('Location_del',this, 'onBlur','S');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                        --><button type="button" name="del" id="del" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                                        --><html:hidden name="hblVO" property="del_nod_cd"/><!-- 
                                        --><input type="text" name="del_nm" maxlength="50" value='<bean:write name="hblVO" property="del_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('del'), frm1.del_nm.value);}">
		                               </td>
		                           </tr>
		                           <tr>
		                               <th><bean:message key="Final_Destination"/></th>
		                               <td colspan="3">
		                                   <input name="fnl_dest_loc_cd" maxlength="5" value='<bean:write name="hblVO" property="fnl_dest_loc_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('Location_dest',this, 'onKeyDown','S')" onBlur="codeNameAction('Location_dest',this, 'onBlur','S');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                        --><button type="button" name="dest" id="dest" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                                        --><html:hidden name="hblVO" property="fnl_dest_nod_cd"/><!-- 
                                        --><input type="text" name="fnl_dest_loc_nm" maxlength="50" value='<bean:write name="hblVO" property="fnl_dest_loc_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('dest'), frm1.fnl_dest_loc_nm.value);}">
		                               </td>
		                           </tr>
		                            <tr>
		                               <th><bean:message key="Pier"/></th>
		                               <td colspan="3">
		                                   <input name="rcv_wh_cd" value='<bean:write name="hblVO" property="rcv_wh_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode_rcv',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_rcv',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" onblur="strToUpper(this);"><!-- 
                                        --><button type="button" name="rcv" id="rcv" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                        --><html:hidden name="hblVO" property="fnl_dest_nod_cd"/><!-- 
                                        --><input type="text" name="rcv_wh_nm" value='<bean:write name="hblVO" property="rcv_wh_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('rcv'), frm1.rcv_wh_nm.value);}" maxlength="50">
		                               </td>
		                           </tr>
		                           <tr>
		                               <th><bean:message key="Container_Summary"/></th>
		                               <td colspan="3">
		                                   <input type="text" name="cntr_info" value='<bean:write name="hblVO" property="cntr_info"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:265px;" maxlength="50" readOnly>
		                               </td>
		                           </tr>
		                            <tr>
		                               <th><bean:message key="Empty_Pickup"/></th>
		                               <td colspan="3">
		                               		<input name="pu_trdp_cd" value='<bean:write name="hblVO" property="pu_trdp_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode_pu',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_pu',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" onblur="strToUpper(this);"><!-- 
                                        --><button type="button" name="pu" id="pu" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                        --><input type="text" name="pu_trdp_nm" value='<bean:write name="hblVO" property="pu_trdp_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('pu'), frm1.pu_trdp_nm.value);}" maxlength="50">
		                               </td>
		                           </tr>
				    		</tbody>
				    	</table>
				    </div>
				 </div>  
				<!-- layout_vertical_2 b(E) -->
				<!-- layout_vertical_2 c(S) -->
				<div class="layout_vertical_3 mar_left_8 sm" style="height:610px">
			    	<h3 class="title_design" style="margin-bottom:0"><bean:message key="Shippment_and_Item"/></h3>
			    	<div class="opus_design_inquiry">
				    	<table>
				    		<colgroup>
				    			<col width="110" />
				    			<col width="90" />
				    			<col width="60"/>
				    			<col width="*" />
				    		</colgroup>
				    		<tbody>
                                                                    <tr>
                                                                    	<th><bean:message key="Freight"/></th>
                                                                        <td colspan="3">
                                                                            <bean:define id="frtList" name="valMap" property="frtCdList"/>
                                                                            <html:select name="hblVO" property="frt_term_cd" styleClass="search_form" style="width:80px;">
                                                                                <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select><!-- 
                                                                            --><input type="hidden" name="h_frt_term_cd" value="<bean:write name="hblVO" property="frt_term_cd"/>">
                                                                        </td>
                                                                     </tr>
                                                                     <tr>                                               
                                                                        <th><bean:message key="Ship_Mode"/></th>
                                                                        <td colspan="3">
                                                                            <bean:define id="shipModeList" name="valMap" property="shipModeList"/>
                                                                            <html:select name="hblVO"  property="shp_mod_cd"  styleClass="search_form" style="background-color:#d4f6ff;;width:80px;" onchange="shipModeChangeDef(this);">
                                                                                <html:options collection="shipModeList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th><bean:message key="SVC_Term"/></th>
                                                                        <td colspan="3">
                                                                            <bean:define id="serviceList" name="valMap" property="serviceList"/>
                                                                            <html:select name="hblVO" property="fm_svc_term_cd" styleClass="search_form" style="width:80px;" onchange="svcTermChange();">
                                                                                <html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select><span class="dash">~</span>
                                                                            <html:select name="hblVO" property="to_svc_term_cd" styleClass="search_form" style="width:80px;">
                                                                                <html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select> 
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                    	<th><bean:message key="Tariff_Currency_Code"/></th>
                                                                        <td colspan="3">
                                                                            <bean:define id="currCdList" name="valMap" property="currCdList"/>
                                                                            <html:select name="hblVO" property="curr_cd" styleClass="search_form" style="width:80px;">
                                                                                <html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select>
                                                                            <input type="hidden" name="h_curr_cd" value="<bean:write name="hblVO" property="curr_cd"/>">
                                                                        </td>
                                                                    <tr>   
                                                                    <tr>
                                                                        <th><bean:message key="OBL_Type"/></th>
                                                                        <td colspan="3">
                                                                            <bean:define id="oblCdList" name="valMap" property="oblCdList"/>
                                                                            <html:select name="hblVO" property="obl_tp_cd" styleClass="search_form" style="width:80px;">
                                                                                <html:options collection="oblCdList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select> 
                                                                            <input type="hidden" name="h_obl_tp_cd" value="<bean:write name="hblVO" property="obl_tp_cd"/>">
                                                                        </td>
                                                                    </tr>
                                                                	<tr>
																		<th><bean:message key="Brokerage_Rate"/></th>
					                                                    <td colspan="3">
					                                                        <input type="text" name="broker_rt" maxlength="5" value="<bean:write name="hblVO" property="broker_rt"/>" class="search_form zero_remove" onKeyPress="ComKeyOnlyNumber(this)" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right"><!-- 
					                                                      --><input type="text" value="%" class="search_form" style="width:20px;border:0;background-color:transparent;" tabindex="7">
					                                                    </td>
					                                                </tr>
					                                                 <tr>
					                                                    <th><bean:message key="Profit_Share"/></th>
					                                                    <td colspan="3">
					                                                        <input type="text" name="profit_share" maxlength="5" value="<bean:write name="hblVO" property="profit_share"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right"><!-- 
					                                                      --><input type="text" value="%" class="search_form" style="width:20px;border:0;background-color:transparent;" tabindex="8">
					                                                    </td>
                                                                	</tr>
																	<tr>
																		<th><bean:message key="Port_Cut_Off_Date"/></th>
																		
																		<td>
																			<input type="text" name="cut_off_dt" id="cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Port Cut-Off Date');"><!-- 
																		--><button type="button" class="calendar" tabindex="-1" name="cut_off_dt_cal" id="cut_off_dt_cal"  onclick="doDisplay('DATE1' ,frm1.cut_off_dt);" ></button>
																        </td>			
																		<th><bean:message key="Time"/></th>
																		<td>
																			<input type="text" name="cut_off_tm" value='<wrt:write name="hblVO" property="cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
																		</td>
																	</tr>
																	<tr>
																		<th><bean:message key="Rail_Cut_Off_Date"/></th>
																		<td>
																			<input type="text" name="rail_cut_off_dt" id="rail_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="rail_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Rail Cut-Off Date');"><!-- 
																			 --><button type="button" class="calendar" tabindex="-1" name="rail_cut_off_dt_cal" id="rail_cut_off_dt_cal"  onclick="doDisplay('DATE1' ,frm1.rail_cut_off_dt);" ></button>
																		</td>
																		<th ><bean:message key="Time"/></th>
																		<td>
																			<input type="text" name="rail_cut_off_tm" value='<wrt:write name="hblVO" property="rail_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
																		</td>
																	</tr>
																	
																	<!-- #21014 : [GPL] OE House B/L Entry - Modify Requests, jsjang 20px13.10.10 -->
																	<tr>
																		<th><bean:message key="DOC_Cut_Off_Date"/></th>
																		<td>
																			<input type="text" name="doc_cut_off_dt" id="doc_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="doc_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'DOC Cut-Off Date');"><!-- 
																			 --><button type="button" class="calendar" tabindex="-1" name="doc_cut_off_dt_cal" id="doc_cut_off_dt_cal"  onclick="doDisplay('DATE1' ,frm1.doc_cut_off_dt);" ></button>
																		</td>
																		<th><bean:message key="Time"/></th>
																		<td>
																			<input type="text" name="doc_cut_off_tm" value='<wrt:write name="hblVO" property="doc_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
																		</td>
																	</tr>																	
																	<tr>
																		<th><bean:message key="Package"/></th>
																		<td colspan="3">
																			<input type="text" name="pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" onblur="setPacQty();" maxlength="7"  class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right"><!-- 
																			 --><bean:define id="pckList" name="valMap" property="pckCdList"/><!-- 
																			 --><html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:133px;" onchange="setPacQty();">
																				<option></option>
																				<html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
																			</html:select> 
																		</td>
																	</tr>
																	<tr>
																		<th><bean:message key="GWeight"/></th>
																		<td colspan="3">
																			<input type="text" name="grs_wgt" value="<bean:write name="hblVO" property="grs_wgt"/>" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,8,3);chkComma(this,8,3);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
																		--><input type="text" name="grs_wgt_ut_cd" value="K" style="width:50px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
																		--><input type="text" name="grs_wgt1" value="<bean:write name="hblVO" property="grs_wgt1"/>" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,8,3);chkComma(this,8,3);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
																		--><input type="text" name="grs_wgt_ut_cd1" value="L" style="width:50px;border:0;background-color:transparent;" readOnly tabindex="2">
																		</td>
																	</tr>
																	<tr>
																		<th><bean:message key="Measurement"/></th>
																		<td colspan="3">
																			<input type="text" name="meas" value="<bean:write name="hblVO" property="meas"/>" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
																		--><input type="text" name="meas_ut_cd" value="CBM" style="width:50px;border:0;background-color:transparent;" readOnly tabindex="5"><!-- 
																		--><input type="text" name="meas1" value="<bean:write name="hblVO" property="meas1"/>" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,8,3);cbmChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
																		--><input type="text" name="meas_ut_cd1" value="CFT" style="width:50px;border:0;background-color:transparent;" readOnly tabindex="6">
																		</td>
																	</tr>
																	<tr>
																		<td colspan="4">
																			<button type="button" class="btn_etc" onclick="sumHblValue();"><bean:message key="Sum"/></button>
																		</td>
																	</tr>
																	<tr>
																		<td colspan="4"> <h3 class="title_design mar_top_8" style="margin-bottom:0"><bean:message key="Management"/></h3>
																		</td>
																	</tr>
                                                                    <tr>
                                                                        <th><bean:message key="Issue_Date"/></th>
                                                                        <td colspan="3">
                                                                            <input type="text" name="bl_iss_dt" id="bl_iss_dt" value="<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Date Issued');" dataformat="excepthan" style="ime-mode:disabled;width:80px;" size='11' maxlength="10"><!-- 
																		--><button type="button" class="calendar" tabindex="-1" name="bl_iss_dt_cal" id="bl_iss_dt_cal"  onclick="doDisplay('DATE1' ,frm1.bl_iss_dt);" ></button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th><bean:message key="Issued_By"/></th>
                                                                        <td colspan="3">
                                                                            <input type="text"   name="opr_usrid" value="<bean:write name="hblVO" property="issued_by"/>" class="search_form-disable" tabindex="-1" readOnly style="width:80px;"><!-- 
																		--><button type="button" name="oprBtn" id="oprBtn" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('OPR_POPLIST',this)"></button>
                                                                            <input type="hidden" name="proc_usrnm" value="<bean:write name="hblVO" property="proc_usrnm"/>" class="search_form-disable" readOnly style="width:120px;">
                                                                            <input type="hidden" name="opr_usrnm"   value="<bean:write name="hblVO" property="proc_usrnm"/>">
																			<input type="hidden" name="opr_ofc_cd"  value="<bean:write name="hblVO" property="proc_ofccd"/>">
																			<input type="hidden" name="opr_dept_cd" value="<bean:write name="hblVO" property="proc_dept_cd"/>">
                                                                        </td>
                                                                    </tr>
					                                                <tr>
					                                                    <th><bean:message key="Sales_OFC"/></th>
					                                                    <td colspan="3">
					                                                        <input type="text" name="sls_ofc_cd" value="<bean:write name="hblVO" property="sls_ofc_cd"/>" class="search_form-disable" style="width:80px;" readonly><!-- 
																		--><button type="button" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('OFFICE_GRID_POPLIST',this)"></button>
					                                                    </td>
					                                                </tr>
					                                                <tr>
					                                                    <th><bean:message key="Sales_PIC"/></th>
					                                                    <td colspan="3">
					                                                        <input type="text"   name="sls_usrid"  value='<bean:write name="hblVO" property="sls_usrid"/>'  class="search_form-disable" style="width:80px;" readOnly><!-- 
																		--><button id="salesperson" name="salesperson" type="button" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('USER_POPLIST',this)"></button><!-- 
																		--><input type="hidden" name="sls_usr_nm" value='<bean:write name="hblVO" property="sls_usr_nm"/>' class="search_form-disable" style="width:120px;" readOnly><!-- 
																		--><input type="hidden" name="sls_dept_cd" value='<bean:write name="hblVO" property="sls_dept_cd"/>'>
					                                                    </td>
					                                                 </tr>
				    		</tbody>
				    	</table>
				    </div>
				</div>
				</div>
			 	<h3 class="title_design"><bean:message key="House_BL_List"/></h3>
				<div class="opus_design_grid">
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
				    	
		</div>
		<!-- tab_player_1 (E) -->
		
		
		<!-- tab_player_2 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Container-->
			<div class="opus_design_grid">
				<h3 class="title_design pad_btm_4"><bean:message key="Container_List"/></h3>
					<div class="opus_design_btn">
						<table>
						<colgroup>
							<col width="100px">
							<col width="50px">
							<col width="50px">
							<col width="70px">
							<col width="100px">
							<col width="50px">
							<col width="150px">
							<col width="">
						</colgroup>
							<tr>
								<td><button type="button" class="btn_accent" name="cnrtAdd" id="cnrtAdd" onClick="cntrGridAdd(docObjects[2]);"><bean:message key="Add"/></button><button type="button" class="btn_normal" name="cnrtAdd" id="cnrtAdd" onClick="cntrGridCopy(docObjects[2]);"><bean:message key="Copy"/></button></td>
								<th>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
								<th><bean:message key="Type_Size"/></th>
								<td>
									<select name="add_cntr_tpsz_cd" style="width:55px;" class="search_form">
										<option value=""></option>
										    <logic:iterate id="codeVO" name="tpszList">
													<option value="<bean:write name="codeVO" property="cntr_tpsz_cd"/>"><bean:write name="codeVO" property="cntr_tpsz_cd"/></option>
											</logic:iterate>
									</select>
		                         </td>
		                         <td><b><bean:message key="Q_ty"/></b></td>
		                         <td>
									<input type="text" name="cntr_q_ty" value="0" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" onblur="if(frm1.cntr_q_ty.value==''){frm1.cntr_q_ty.value='0'}" maxlength="7" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40;text-align:right;"> 
		                         </td>
		                         <td><button type="button" class="btn_normal" name="qtyAdd" id="qtyAdd" onClick="cntrQtyGridAdd(docObjects[2]);cntrInfoSet(docObjects[2]);"><bean:message key="Q_ty_Add"/></button></td>
							</tr>
						</table>	
					</div>
					<script type="text/javascript">comSheetObject('sheet4');</script>
			</div>
		</div>
		<!-- tab_player_2 (E) -->
		
		
		<!-- tab_player_3 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Mark Description-->
  			<div class= "opus_design_inquiry sm">
  				<div class= "opus_design_inquiry sm">
  					<table>
		  				<colgroup>
		  					<col width="695px" />
		  					<col width="200px" />
		  					<col width="*" />
		  				</colgroup>
  						<tr>
  							<td><h3 class="title_design"><bean:message key="Said"/></h3></td>
  							<td  class="opus_design_btn">
  								<button type="button" class="btn_etc" name="sadAuto" id="sadAuto" onclick="mkSaidTxt(docObjects[2], frm1.sad_txt);" ><bean:message key="Auto"/></button>
  							</td>
  							<td></td>
  						</tr>
  						<tr>
  							<td colspan="4">
  								<textarea name="sad_txt" rows="2" maxlength="200" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:889px;" onkeyup="keyUp_maxLength(this);">
<bean:write name="hblVO" property="sad_txt" filter="false"/></textarea>
  							</td>
  						</tr>
  					</table>
  					<table>
  						<colgroup>
  							<col width="100px" />
  							<col width="250px" />
  							<col width="100px" />
  							<col width="*" />
  						</colgroup>
  						<tbody>
  							<tr>
  								<th><bean:message key="GWeight"/></th>
								<td>
									<input type="text" name="mk_grs_wgt" value='<bean:write name="hblVO" property="mk_grs_wgt"/>' onkeyPress="onlyNumberCheck('.');" onchange="this.value = doMoneyFmt(this.value);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;"><!-- 
								--><input type="text" name="mk_grs_wgt_ut_cd" value="K" style="width:20px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
								--><input type="text" name="mk_grs_wgt1" value='<bean:write name="hblVO" property="mk_grs_wgt1"/>' onkeyPress="onlyNumberCheck('.');" onchange="this.value = doMoneyFmt(this.value);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;"><!-- 
								--><input type="text" name="mk_grs_wgt_ut_cd1" value="L" style="width:20px;border:0;background-color:transparent;" readOnly tabindex="2">
								</td>
								<th><bean:message key="Measurement"/></th>
								<td>
									<input type="text" name="mk_meas" value='<bean:write name="hblVO" property="mk_meas"/>' onkeyPress="onlyNumberCheck('.');" onchange="this.value = doMoneyFmt(this.value);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:79px;text-align:right;"><!-- 
								--><input type="text" name="mk_meas_ut_cd" value="CBM" style="width:40px;border:0;background-color:transparent;" readOnly tabindex="5"><!-- 
								--><input type="text" name="mk_meas1" value='<bean:write name="hblVO" property="mk_meas1"/>' onkeyPress="onlyNumberCheck('.');" onchange="this.value = doMoneyFmt(this.value);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:79px;text-align:right;"><!-- 
								--><input type="text" name="mk_meas_ut_cd1" value="CFT" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="6">
								</td>
  							</tr>
  						</tbody>
  					</table>
  				</div>
  			
  			<!-- layout_wrap(S) -->
				<div class="layout_wrap">
				    <div class="layout_vertical_4 sm" style="width:445px;">
		 					 <h3 class="title_design pad_btm_8" style="margin-bottom:0;"><bean:message key="Mark"/></h3>
		 					 <textarea name="mk_txt" rows="16" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,15,rider_ocean);keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:100%;" WRAP="physical" >
<bean:write name="hblVO" property="mk_txt" filter="false" /></textarea>
		 					 <img tabindex="-1" src="<%=CLT_PATH%>/web/img/main/Rider_Icon.gif" style="display:none;"width="45" height="42" border="0" id="rider_ocean" valign="top">
				    </div>
				    <div class="layout_vertical_4 sm pad_left_8" style="width:444px;">
				    	 <h3 class="title_design pad_btm_8" style="margin-bottom:0;"><bean:message key="Description"/></h3>
	 					 <input tabindex="-1" type="hidden" name="rider_lbl" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;text-align:right;width:267;border:0;background-color:transparent;"/>
	 					  <textarea name="desc_txt" rows="16"  maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,15,rider_ocean);keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:100%;" WRAP="virtual" >
<bean:write name="hblVO" property="desc_txt" filter="false"/></textarea>
				    </div>
				</div>
				<div class="opus_design_btn sm" style="text-align: left;">
					<button tabindex="-1" type="button" class="btn_etc" onclick="addCntrInfo(docObjects[2], 'M');" ><bean:message key="Add_Container_Info"/></button><button tabindex="-1" type="button" class="btn_etc" onclick="copyFromHBL();" ><bean:message key="Copy_from_HBL"/></button>
				</div>
				
			<div class= "opus_design_inquiry sm pad_top_8">
				<h3 class="title_design"><bean:message key="Remark"/></h3>
				<table>
					<tr>
						<td><textarea name="rmk" cols="175" rows="2" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width: 889px;" >
<bean:write name="hblVO" property="rmk" filter="false"/></textarea></td>
					</tr>
				</table>
			</div>
		</div>
		</div>
		<!-- tab_player_3 (E) -->
		
		
		<!-- tab_player_4 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Freight-->
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
		<input type="hidden" name="hid_act_cnt_cd" id=hid_act_cnt_cd"" value="">
		
		<input type="hidden" name="ppdOrgCurr" id="ppdOrgCurr"     value="">
		<input type="hidden" name="ofc_curr"  id="ofc_curr"       value="<%=ofc_curr%>">
	    <input type="hidden" name="trf_cur_cd" id="trf_cur_cd"     value="<%=trf_cur_cd%>">
	    <input type="hidden" name="xcrtDt"     id="xcrtDt"        value="<bean:write name="hblVO" property="obrd_dt_tm"/>">
	
		<input type="hidden" name="cctOrgCurr"  id="cctOrgCurr"    value="">
		<input type="hidden" name="objPfx"   id="objPfx"        value="">
		<input type="hidden" name="curRow2"   id="curRow2"        value="">
	
		<input type="hidden" name="ppdToCurrency" id="ppdToCurrency" value="<%=partner_curr%>">
		<input type="hidden" name="ppdOrgCurr"  id="ppdOrgCurr"    value="<%=partner_curr%>">
	
	    <!--Invoice추가-->    
	    <input type="hidden" name="tax_bil_flg"  id="tax_bil_flg"  value="">  
	    <input type="hidden" name="inv_dt"     id="inv_dt"     value="">
	    <input type="hidden" name="inv_due_dt" id="inv_due_dt"   value="">  
	    <input type="hidden" name="inv_rmk"   id="inv_rmk"      value="">  
	    <input type="hidden" name="buy_inv_no"  id="buy_inv_no"   value="">  
	    
	    <div id="frtTableS">
			<div class="opus_design_grid" id="mainTable">
				<h3 class="title_design"><bean:message key="Account_Receivable"/></h3>
					<div class="opus_design_btn">
					
						<div class="grid_option_left" style="margin-right: 50px; display:none;" id="profitBtns">
							<b><span style="float: left; margin-right: 10px; padding-top: 5px;"><bean:message key="Profit"/></span></b>
							<input type="text" name="profit" size='11' class="search_form-disable" style="float:left;ime-mode:disabled;resize:none;width:110;text-align:right;" readonly>
						</div>
					
						<div class="grid_option_left">
							<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[4], 'frtTableS')"><bean:message key="Plus"/></button><!--
							--><button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[4], 'frtTableS')"><bean:message key="Minus"/></button>	
							<span style="display:none;" id="sdBtns" >
							<button type="button" class="btn_normal"  onClick="goToInvoice(docObjects[4], 'LOCAL')" ><bean:message key="B.AR"/></button><!--
							--><button type="button" class="btn_normal"  onClick="goToInvoiceModify('LOCAL')" ><bean:message key="Invoice"/></button><!--
							--><button type="button" class="btn_normal"  onClick="setDfltFrt('', 'S', 'O', 'M')" ><bean:message key="Default"/> <bean:message key="New"/></button><!--
							--><button type="button" class="btn_normal"  onclick="frtRowAdd('ROWADD', docObjects[4], 'S', 'O', 'M');" ><bean:message key="Add"/></button>
							</span>	
						</div>
					</div>
				<script type="text/javascript">comSheetObject('sheet7');</script>
				</div>
			</div>
			<div class="opus_design_grid" id="mainTable">
				<h3 class="title_design"><bean:message key="Debit_Credit"/></h3>
					<div class="opus_design_btn">
						<div class="grid_option_left">
							<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[6], 'frtTableDC')"><bean:message key="Plus"/></button><!--
							--><button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[6], 'frtTableDC')"><bean:message key="Minus"/></button>
							<span style="display:none;" id="dcBtns" >
							<button type="button" class="btn_normal"  onClick="goToInvoice(docObjects[6], 'DC')" ><bean:message key="B.DC"/></button><!--
							--><button type="button" class="btn_normal"  onClick="goToInvoiceModify('DC')" ><bean:message key="Invoice"/></button><!--
							--><button type="button" class="btn_normal"  onClick="setDfltFrt('dc_', 'S', 'O', 'M')" ><bean:message key="Default"/> <bean:message key="New"/></button><!--
							--><button type="button" class="btn_normal"  onclick="frtRowAdd('DCROWADD', docObjects[6], 'S', 'O', 'M');" ><bean:message key="Add"/></button>
							</span>	
						</div>
					</div>
				<script type="text/javascript">comSheetObject('sheet9');</script>
			</div>
			<div class="opus_design_grid" id="mainTable">
				<h3 class="title_design"><bean:message key="Account_Payable"/></h3>
					<div class="opus_design_btn">
						<div class="grid_option_left">
							<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[5], 'frtTableB')"><bean:message key="Plus"/></button><!-- 
						--><button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[5], 'frtTableB')"><bean:message key="Minus"/></button>
						<span style="display:none;" id="bcBtns" ><!-- 
						--><button type="button" class="btn_normal"  onClick="goToInvoice(docObjects[5], 'AP')" ><bean:message key="B.AP"/></button><!-- 
						--><button type="button" class="btn_normal"  onClick="goToInvoiceModify('AP')" ><bean:message key="Invoice"/></button><!-- 
						--><span id="btnPierpass"><button type="button" class="btn_normal"  onClick="addPierPassFrt(frm1.intg_bl_seq.value, 'M', frm1.shp_mod_cd.value, 'O', 'B')" ><bean:message key="PIERPASS"/></button></span><!-- 
						--><button type="button" class="btn_normal"  onClick="setDfltFrt('b_', 'S', 'O', 'M')" ><bean:message key="Default"/> <bean:message key="New"/></button><!-- 
						--><button type="button" class="btn_normal"  onclick="frtRowAdd('BCROWADD', docObjects[5], 'S', 'O', 'M');" ><bean:message key="Add"/></button>
						</span>	
						</div>
					</div>
				<script type="text/javascript">comSheetObject('sheet8');</script>
			</div>
		
		</div>
		<!-- tab_player_4 (E) -->
		
		
		<!-- tab_player_5 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--WorkOrder-->
			<div class="opus_design_grid" id="mainTable">
					<h3 class="title_design pad_btm_8"><bean:message key="Work_Order_List"/></h3>
					<div class="opus_design_btn">
					<button style="display:none" type="button" class="btn_accent" name="goWoObj" id="goWoObj" onClick="doWork('WORKORDER')" style="display:none;margin-left:9px;cursor:hand"> <bean:message key="WorkOrder"/></button>
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
						<button type="button" class="btn_accent" id="sDoc" btnAuth="S_DOC"  name="sDoc" btnAuth="S_DOC" onClick="doWork('S_DOC');" style="display:none;"><bean:message key="Print"/></button><!-- 
					--><button type="button" class="btn_normal" name="emlSnd"  id="emlSnd" onClick="doWork('SNDEML')" style="display:none;margin-left:5px;cursor:hand"><bean:message key="Email"/></button><!-- 
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
    <input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" value=""/>
    <input type="hidden" name="intg_bl_seq" value=""  />
    <input type="hidden" name="docType" value=""/>
</form>
		
<script type="text/javascript">  

fnbtnCtl();

</script>	
		
</body>
</html>