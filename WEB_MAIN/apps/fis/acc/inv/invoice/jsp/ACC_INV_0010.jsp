<%--
=========================================================
*@FileName   : ACC_INV_0010.jsp
*@FileTitle  : Local Invoice
*@Description: Local Invoice
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/03
*@since      : 2011/11/03

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<% 
	//WMS ACCOUNT LKH 2015.01.20
	String wmsUseFlag = (String)application.getAttribute("WMS_USE_FLAG");
	if(wmsUseFlag == null){wmsUseFlag = "N";}
	
	//LKH::2015-11-03 WMS4.O 
	String wmsUseVer = (String)application.getAttribute("WMS_USE_VER");
	if(wmsUseVer == null){wmsUseVer = "";} 
%>		
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />

	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/acc/inv/invoice/script/ACC_INV_0010.js"></script>
    
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String usrId		= userInfo.getUsrid();
		String usrPhn		= userInfo.getPhn();
		String usrFax		= userInfo.getFax();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
		
		//User Role
		String dp_flg 		= userInfo.getDp_flg();
		String fb_flg 		= userInfo.getFb_flg();
		String jo_flg 		= userInfo.getJo_flg();
		String oo_flg 		= userInfo.getOo_flg();
		String efc_flg 		= userInfo.getEfc_flg(); //EDIT AFTER CREATING INVOICES
		String sys_cd = (String)request.getParameter("sys_cd");
		String wms_no = "";
		//String arrfrt_seq[];
		//String wms_frt_seq = "";
		if("WMS".equals(sys_cd)){
			wmsUseFlag = "Y";
			wms_no = request.getParameter("wms_no") != null ? (String)request.getParameter("wms_no") : "";
			/*
			arrfrt_seq = request.getParameterValues("chk_fr_frt_seq");
			
			if(arrfrt_seq != null && arrfrt_seq.length > 0){
				
				for(int i = 0 ; i < arrfrt_seq.length; i++){
					wms_frt_seq += arrfrt_seq[i];
					
					if(i < arrfrt_seq.length - 1 ){
						wms_frt_seq += "|";
					}
				}
			}
			*/
		}
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>

	<bean:define id="blinfoVO"   name="EventResponse" property="objVal"/>
	<bean:define id="valMap"  	 name="EventResponse" property="mapVal"/>



	<script>
		<!-- Freight SEA_Unit 단위 -->
	    var UNITCD1 = '';
		var UNITCD2 = '';

		if('<bean:write name="blinfoVO" property="air_sea_clss_cd"/>' == "S"){
			<logic:notEmpty name="valMap" property="SEA_UNITCD">
				<% boolean isBegin = false; %>
	            <bean:define id="unitList" name="valMap" property="SEA_UNITCD"/>
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
		}else if ('<bean:write name="blinfoVO" property="air_sea_clss_cd"/>' == "A"){
			<logic:notEmpty name="valMap" property="AIR_UNITCD">
				<% boolean isBegin2 = false; %>
		        <bean:define id="unitList" name="valMap" property="AIR_UNITCD"/>
		        <logic:iterate id="codeVO" name="unitList">
		            <% if(isBegin2){ %>
		                UNITCD1+= '|';
		                UNITCD2+= '|';
		            <% }else{
		                  isBegin2 = true;
		               } %>
		            UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
		            UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
		        </logic:iterate>
		    </logic:notEmpty>
		}else{

			<logic:notEmpty name="valMap" property="AIR_UNITCD">
				<% boolean isBegin4 = false; %>
		        <bean:define id="unitList" name="valMap" property="UNITCD"/>
		        <logic:iterate id="codeVO" name="unitList">
		            <% if(isBegin4){ %>
		                UNITCD1+= '|';
		                UNITCD2+= '|';
		            <% }else{
		                  isBegin4 = true;
		               } %>
		            UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
		            UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
		        </logic:iterate>
	    	</logic:notEmpty>
	    	
	    	<logic:empty name="valMap" property="AIR_UNITCD">
				<% 
					boolean isBegin4 = false;
					if(wms_no != ""){
				%>
			        <bean:define id="unitList" name="valMap" property="UNITCD"/>
			        <logic:iterate id="codeVO" name="unitList">
			            <% if(isBegin4){ %>
			                UNITCD1+= '|';
			                UNITCD2+= '|';
			            <% }else{
			                  isBegin4 = true;
			               } %>
			            UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
			            UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
			        </logic:iterate>
		        <%}%>
    		</logic:empty>
		}


        <!-- ###CONTAINER T<bean:message key="Profit_Share"/>Z 항목### -->
		var TPSZ1 = ' |';
		var TPSZ2 = ' |';
        <logic:notEmpty name="valMap" property="cntrTpszList">
			<% boolean isBegin3 = false; %>
            <bean:define id="TpszList" name="valMap" property="cntrTpszList"/>
            <logic:iterate id="codeVO" name="TpszList">
                <% if(isBegin3){ %>
                	TPSZ1+= '|';
                	TPSZ2+= '|';
                <% }else{
                      isBegin3 = true;
                   } %>
                TPSZ1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
                TPSZ2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
            </logic:iterate>
        </logic:notEmpty>




        <!-- ###FRT_CD LIST 항목### -->
		var FRTCD1 = ' |';
		var FRTCD2 = ' |';
		var VAT_FRT_CD = '';
		var WHLD_VAT_FRT_CD = '';
        <logic:notEmpty name="valMap" property="FRT_CD_LIST">
			<% boolean isBegin5 = false; %>
            <bean:define id="FRT_CD_LIST" name="valMap" property="FRT_CD_LIST"/>
            <logic:iterate id="codeVO" name="FRT_CD_LIST">
				<logic:match name="codeVO" property="FRT_CLSS_CD" value="VAT">
					VAT_FRT_CD = '<bean:write name="codeVO" property="FRT_CD" filter="false"/>';
            	</logic:match>
            	<logic:match name="codeVO" property="FRT_CLSS_CD" value="WHD">
            		WHLD_VAT_FRT_CD = '<bean:write name="codeVO" property="FRT_CD" filter="false"/>';
        		</logic:match>
                <% if(isBegin5){ %>
                	FRTCD1+= '|';
                	FRTCD2+= '|';
                <% }else{
                      isBegin5 = true;
                   } %>
                   FRTCD1+= '<bean:write name="codeVO" property="FRT_CD" filter="false"/>';
                   FRTCD2+= '<bean:write name="codeVO" property="FRT_CD" filter="false"/>' + ": " + '<bean:write name="codeVO" property="FRT_CD_LOCL_NM" filter="false"/>';
            </logic:iterate>
        </logic:notEmpty>
        
        var CURRCD = '';
		<% boolean isBegin = false; %>
        <bean:define id="currCdList" name="valMap" property="currCdList"/>
        <logic:iterate id="codeVO" name="currCdList">
            <% if(isBegin){ %>
                   CURRCD += '|';
            <% }else{
            	isBegin = true;
               } %>
            CURRCD+= '<bean:write name="codeVO" property="cd_val"/>';
        </logic:iterate>

        var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부

        function setSelect(){
         
			var formObj = document.frm1;

			if(formObj.f_curr_cd.value == ""){
				formObj.f_curr_cd.value = '<bean:write name="blinfoVO" property="curr_cd"/>';
			}

			if(formObj.f_inv_seq.value == ""){
				formObj.f_inco_cd.value = '<bean:write name="blinfoVO" property="inco_cd"/>';
			}
			//if(formObj.f_intg_bl_seq.value != "" && formObj.f_inv_seq.value != ""){
				
			//}
			
			/*
			//TERM_CD 셋팅
			formObj.f_terms.value   = '<bean:write name="blinfoVO" property="term_cd"/>';
			formObj.f_term_dt.value = '<bean:write name="blinfoVO" property="term_dt"/>';

			if(formObj.f_intg_bl_seq.value != "" || formObj.f_oth_seq.value != ""){
				if(formObj.f_terms[0].selected){
					//formObj.f_due_dt.value = f_inv_dt;
				}else{

					if(formObj.f_inv_seq.value != ""){
						formObj.f_terms[0].selected = true;
					}else{
						calcCreateTerms();
					}

				}
			}
			*/
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			fnbtnCtl(2);
		}
        
        function isWMS(){
        	return '<%= sys_cd%>' == 'WMS';
        }

        function setupPage(){
        	loadPage();
        	setSelect();
        	
        	//LKH::2015-11-03 WMS4.O 
        	if('<%=wmsUseVer%>' == 'VER4.0'){
        		gJsWmsVer = 'VER4.0';
        		wmsDocCheck('ALL');	
        	}
        	//setTimeout(function(){
        	//	if('<%= sys_cd%>' == 'WMS'){
            //		onLoadWarehouse();
            //	}	
        	//},100);
        }
        var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
    	// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
		function fnbtnCtl(args){
			if(args == 1){
				doBtnAuthority(attr_extension);  
			}
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
			//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
			var formObj=document.frm1;
			var efc_flg 		= "<%=efc_flg%>"; //EDIT AFTER CREATING INVOICES 
 			//alert(args + " "+efc_flg);
			var btnflag = "Y"; 
			if (efc_flg == "N"){  
				btnflag = "N";
			}
	  
			if (btnflag == "Y"){
				//기존유지
				//$("#btnModify").show(); 
			}else{
				$("#btnModify").hide(); 
				$("#btnPrint").hide(); 
			}
			 
			
			if (btnflag == "Y"){
				//Enable Editing Other Office (ACCT) 
				var edoa_flg 		= "<%=userInfo.getEdoa_flg()%>"; //Enable Editing Other Office (ACCT) 
				var ofc_cd = "<%=ofc_cd%>";
				var ref_ofc_cd =  	formObj.f_ref_no_dtl.value;
				//alert(edoa_flg + " "+ofc_cd+" "+ref_ofc_cd);
				var btnflag = "Y";
				if (edoa_flg == "N"){
					if (ofc_cd != ref_ofc_cd){  
						btnflag = "N";
					}
				}  
				if (ref_ofc_cd == "") { btnflag = "Y"; }
				if (btnflag == "Y"){
					//기존유지
					//$("#btnModify").show(); 
				}else{
					$("#btnModify").hide(); 
					$("#btnPrint").hide(); 
				} 
			}
			
			
			 
		}

	</script>
	<form name="frm1" method="POST" action="./ACC_INV_0010.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="trdp_cd"/>
	<input type="hidden" name="old_trdp_cd"         value="<bean:write name="blinfoVO" property="ship_to_cd"/>"/>
	<input type="hidden" name="f_intg_bl_seq" 		value="<bean:write name="blinfoVO" property="intg_bl_seq"/>"/>
	<input type="hidden" name="f_oth_seq" 			value="<bean:write name="blinfoVO" property="oth_seq"/>"/>
	
	<!-- WMS ACCOUNT LKH 2015.01.20 -->
	<input type="hidden" name="f_wms_seq" 			value="<bean:write name="blinfoVO" property="wms_seq"/>"/>
	<input type="hidden" name="temp_wms_no" 		value="<bean:write name="blinfoVO" property="wms_no"/>"/>
	<input type="hidden" name="f_wms_cntr_info" 	value="<bean:write name="blinfoVO" property="wms_cntr_info"/>"/>
	
	<!-- <input type="hidden" name="f_frt_seq" 			value="<//%= wms_frt_seq %>"/> -->

	<input type="hidden" name="f_bl_no" 			value=""/>
	<input type="hidden" name="f_air_sea_clss_cd" 	value="<bean:write name="blinfoVO" property="air_sea_clss_cd"/>"/>
	<input type="hidden" name="f_biz_clss_cd" 		value="<bean:write name="blinfoVO" property="biz_clss_cd"/>"/>
	<input type="hidden" name="f_bnd_clss_cd" 		value="<bean:write name="blinfoVO" property="bnd_clss_cd"/>"/>
	<input type="hidden" name="f_inv_seq"	 		value="<bean:write name="blinfoVO" property="inv_seq"/>"/>
	<input type="hidden" name="f_bl_cnt_cd"	 		value="<bean:write name="blinfoVO" property="bl_cnt_cd"/>"/>
	<input type="hidden" name="f_ref_ofc_cd" 		value="<bean:write name="blinfoVO" property="ref_ofc_cd"/>"/>

	<input type="hidden" name = "f_frgn_curr_cd">
	<input type="hidden" name = "f_frgn_amt">
	<input type="hidden" name = "f_frgn_vat_amt">
	<input type="hidden" name = "f_frgn_sum_amt">
	<input type="hidden" name = "f_curRow">
 
	<input type="hidden" name = "temp_bl_no"  value="<bean:write name="blinfoVO" property="bl_no"/>"/>
	<input type="hidden" name = "temp_ref_no" value="<bean:write name="blinfoVO" property="ref_no"/>"/>
	<input type="hidden" name = "temp_oth_no" value="<bean:write name="blinfoVO" property="oth_no"/>"/>
	<input type="hidden" name = "temp_inv_no" value="<bean:write name="blinfoVO" property="inv_no"/>"/>
 
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<input type="hidden" name="rpt_pdf_file_nm"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_usrId" value="<%= usrId %>"/>
	<input	type="hidden" name="f_usrPhn" value="<%= usrPhn %>"/>
	<input	type="hidden" name="f_usrFax" value="<%= usrFax %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>

	<!--  User Role Accounting 관련 -->
	<input	type="hidden" name="dp_flg" value="<%= dp_flg %>"/>
	<input	type="hidden" name="fb_flg" value="<%= fb_flg %>"/>
	<input	type="hidden" name="jo_flg" value="<%= jo_flg %>"/>
	<input	type="hidden" name="oo_flg" value="<%= oo_flg %>"/>

	<input type="hidden" name = "f_old_sum_amt">


	<input type="hidden" name = "old_post_dt" value="<bean:write name="blinfoVO" property="post_dt"/>"/>
	<input type="hidden" name = "slip_post"   value="<bean:write name="blinfoVO" property="slip_post"/>"/>
	<input type="hidden" name = "block_post"  value="<bean:write name="blinfoVO" property="block_post"/>"/>
	<input type="hidden" name = "max_jnr_dt"  value="<bean:write name="valMap" property="max_jnr_dt"/>"/>
	
	<input type="hidden" name = "post_dt_inv"  value="<bean:write name="blinfoVO" property="post_dt_inv"/>"/>

	<input type="hidden" name="main_trdp">

	<!-- check freight -->
    <input type="hidden" name="chk_fr_trdp_cd"      value="<bean:write name="blinfoVO" property="chk_fr_trdp_cd"/>"/>
    <input type="hidden" name="chk_fr_inv_curr_cd"  value="<bean:write name="blinfoVO" property="chk_fr_inv_curr_cd"/>"/>
    <input type="hidden" name="chk_fr_frt_seq"  	value="<bean:write name="blinfoVO" property="chk_fr_frt_seq"/>"/>
    
    <input type="hidden" name="f_agent_chg_wgt" 		value="<bean:write name="blinfoVO" property="agent_chg_wgt"/>"/>
    <input type="hidden" name="f_agent_grs_wgt" 		value="<bean:write name="blinfoVO" property="agent_grs_wgt"/>"/>
    
    <!-- office logo -->
    <input type="hidden" name="logo1" 		value="<bean:write name="blinfoVO" property="logo1"/>"/>
	
    <!--마감된 invoice에 대하여 수정권한이 있는 사람이 수정을 했을 경우 frt.post_dts는  form의 post_dt가 아님-->
	<input type="hidden" name = "f_edit_post_dt" value=""/>

	<!-- 환율일자. -->
	<input type="hidden" name="xcrtDt" value="<bean:write name="blinfoVO" property="inv_dt"/>">
	<input type="hidden" name="intg_bl_seq" value="<bean:write name="blinfoVO" property="intg_bl_seq"/>"/>

	<!-- Default New 기능으로 추가된 항목 -->
	<input type="hidden" name="chg_wgt" value="<bean:write name="blinfoVO" property="chg_wgt"/>">
	<input type="hidden" name="chg_wgt1" value="<bean:write name="blinfoVO" property="chg_wgt1"/>">
	<input type="hidden" name="agent_chg_wgt" value="<bean:write name="blinfoVO" property="agent_chg_wgt"/>">
	<input type="hidden" name="agent_chg_wgt1" value="<bean:write name="blinfoVO" property="agent_chg_wgt1"/>">
	<input type="hidden" name="agent_grs_wgt" value="<bean:write name="blinfoVO" property="agent_grs_wgt"/>">
	<input type="hidden" name="agent_grs_wgt1" value="<bean:write name="blinfoVO" property="agent_grs_wgt1"/>">
	<input type="hidden" name="customer_unit_chk" value="<bean:write name="blinfoVO" property="customer_unit_chk"/>">

	<!--  Invoice 정보 변경여부 확인 -->
	<input type="hidden" name="f_modi_tms" value="">
	
	<input type="hidden" name="m_intg_bl_seq" value="<bean:write name="blinfoVO" property="m_intg_bl_seq"/>">

    <!-- 타이틀, 네비게이션 -->
    <!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onclick="doWork('SEARCH');" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  ><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal" onclick="doWork('MODIFY')" id="btnModify" style="cursor:hand; display:none" btnAuth="<%= roleBtnVO.getAttr3() %>"><bean:message key="Save"/></button><!-- 
		--><!-- <button type="button" class="btn_normal" onclick="doWork('DELETE')" id="btnDelete" style="cursor:hand; display:none;"><bean:message key="Delete"/></button> --><!-- 
		--><button  type="button" class="btn_normal" onclick="doWork('PRINT')" id="btnPrint" style="cursor:hand; display:none" btnAuth="<%= roleBtnVO.getAttr5() %>" ><bean:message key="Print"/></button><!-- 
		--><button type="button" class="btn_normal" onclick="clearAll()" style="cursor:hand; display:none" btnAuth="CLEAR"><bean:message key="Clear"/></button><!-- 
		--><button type="button" class="btn_normal" onClick="doWork('PROFIT_REPORT');" style="cursor:hand; display:none" btnAuth="P_REPORT" ><bean:message key="P_Report"/></button>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	
	<div class="wrap_search">	
		<div class="opus_design_inquiry wFit">
			<table width="840">
				<tr>
					<th style="width:60px"><bean:message key="BL_No"/></th>
					<td style="width:140px">
						<input type="text" name="s_bl_no"  maxlength="40" value=""  style="width:115px;" onBlur="strToUpper(this);" dataformat="excepthan" onKeyDown="enterBlCmmInfo();">
					</td>
					<th style="width:100px"><bean:message key="Ref_No"/></th>
					<td style="width:140px">
						<input type="text" name="s_ref_no"  maxlength="20" value=""  style="width:115px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="enterRefInfo();">
					</td>
					<th style="width:70px"><bean:message key="Other_No"/></th>
					<td style="width:140px">
						<input type="text" name="s_oth_no"  maxlength="20" value=""  style="width:115px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="enterOtherInfo();">
					</td>
					<!-- WMS ACCOUNT LKH 2015.01.20 -->
					<th style="width:<%="Y".equals(wmsUseFlag)?"70px":"0px"%>"><%if("Y".equals(wmsUseFlag)){%><bean:message key="WMS_No"/><%}%></th>
					<td style="width:<%="Y".equals(wmsUseFlag)?"140px":"0px"%>">
						<input type="text" name="s_wms_no"  maxlength="20" value="<%= wms_no %>"  style="display:<%="Y".equals(wmsUseFlag)?"inline":"none"%>;width:115px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="enterWarehouseInfo();">
					</td>
					<th style="width:80px"><bean:message key="Invoice_No"/></th>
					<td >
						<input type="text" name="s_inv_no"  maxlength="50" value="" style="width:115px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);setInvInfo();" onKeyDown="enterInvInfo();">
					</td>
				</tr>
			</table>
		</div>
	</div>
		
	<div class="wrap_result_tab">
		<div class="layout_wrap">
			<div class="layout_vertical_4" style="width: 320px">
				<div class="opus_design_inquiry">
					<table>
						<tr>
							<th width="115"><bean:message key="Ref_No"/></th>
							<td>
								<input type="text" name="f_ref_no" maxlength="20" value="<bean:write name="blinfoVO" property="ref_no"/>" style="width:115px" class="search_form-disable" readOnly><!-- 
							 --><input type="text" name="f_ref_no_dtl" value="<bean:write name="blinfoVO" property="ref_ofc_cd"/>" style="width:71px" class="search_form-disable" readOnly>
							</td>
						</tr>
						<tr>
							<th><bean:message key="MBL_No"/></th>
							<td>
								<input type="text" name="f_mbl_no" value="<bean:write name="blinfoVO" property="mbl_no"/>" style="width:190px" class="search_form-disable" readOnly>
							</td>
						</tr>
						<tr>
							<th><bean:message key="HBL_No"/></th>
							<td>
								<logic:equal name="blinfoVO" property="biz_clss_cd" value="M">
								<input type="text" name="f_hbl_no" value="<bean:write name="blinfoVO" property="hbl_no"/>" style="width:190px" class="search_form">
								</logic:equal>
								<logic:notEqual name="blinfoVO" property="biz_clss_cd" value="M">
								<input type="text" name="f_hbl_no" value="<bean:write name="blinfoVO" property="hbl_no"/>" style="width:190px" class="search_form-disable" readOnly>
								</logic:notEqual>
							</td>
						</tr>
						<tr>
							<th><bean:message key="Liner_Bkg_No"/></th>
							<td>
								<input type="text" name="f_lnr_bkg_no" value="<bean:write name="blinfoVO" property="lnr_bkg_no"/>" style="width:190px" class="search_form-disable" readOnly>
							</td>
						</tr>
					</table>
				</div>						
			</div>
			<div class="layout_vertical_4" style="width: 280px">
				<div class="opus_design_inquiry">
					<table>
						<tr>
							<th width="85"><bean:message key="Agent"/></th>
							<td>
								<input type="text" name="f_agent" value="<bean:write name="blinfoVO" property="agent_trdp_nm"/>" style="width:160px" class="search_form-disable" readOnly>
							</td>
						</tr>
						<tr>
							<th><bean:message key="Shipper"/></th>
							<td>
								<input type="text" name="f_shpr_nm" value="<bean:write name="blinfoVO" property="shpr_trdp_nm"/>" style="width:160px" class="search_form-disable" readOnly>
							</td>
						</tr>
						<tr>
							<th><bean:message key="Consignee"/></th>
							<td>
								<input type="text" name="f_cnee_nm" value="<bean:write name="blinfoVO" property="cnee_trdp_nm"/>" style="width:160px" class="search_form-disable" readOnly>
							</td>
						</tr>
						<tr>
							<th><bean:message key="Notify"/></th>
							<td>
								<input type="text" name="f_ntfy_nm" value="<bean:write name="blinfoVO" property="ntfy_trdp_nm"/>" style="width:160px" class="search_form-disable" readOnly>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="layout_vertical_4" style="width: 310px">
				<div class="opus_design_inquiry">
					<table>
						<tr>
							<th width="110"><bean:message key="Vessel_Flight_No"/></th>
							<td>
								<input type="text" name="f_vsl_flt" value="<bean:write name="blinfoVO" property="vsl_flt"/>" style="width:176px" class="search_form-disable" readOnly>
							</td>
						</tr>
						<tr>
							<th><bean:message key="POL_ETD"/></th>
							<td>
								<input type="text" name="f_pol_nm" value="<bean:write name="blinfoVO" property="pol_nm"/>" style="width:100px" class="search_form-disable" readOnly><!-- 
							 --><input type="text" name="f_etd_dt"  value="<bean:write name="blinfoVO" property="etd_dt_tm"/>" style="width:72px" class="search_form-disable" readOnly>
							</td>
						</tr>
						<tr>
							<th><bean:message key="POD_ETA"/></th>
							<td>
								<input type="text" name="f_pod_nm" value="<bean:write name="blinfoVO" property="pod_nm"/>" style="width:100px" class="search_form-disable" readOnly><!-- 
							 --><input type="text" name="f_eta_dt"  value="<bean:write name="blinfoVO" property="eta_dt_tm"/>" style="width:72px" class="search_form-disable" readOnly>
							</td>
						</tr>
						<tr>
							<th><bean:message key="F_Dest_ETA"/></th>
							<td>
								<input type="text" name="f_fnl_dest_loc_nm" value="<bean:write name="blinfoVO" property="fnl_dest_loc_nm"/>" style="width:100px" class="search_form-disable" readOnly><!-- 
							 --><input type="text" name="f_feta_dt" value="<bean:write name="blinfoVO" property="f_eta_dt_tm"/>" style="width:72px" class="search_form-disable" readOnly>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="layout_vertical_4">
				<div class="opus_design_inquiry">
					<table>
						<colgroup>
							<col width="100"/>
							<col width="90"/>
							<col width="41"/>
							<col width="90"/>
							<col width="*" />				
						</colgroup>
						<tr>
							<th width="100"><bean:message key="Commodity"/></th>
							<td colspan="4">
								<input type="text" name="f_cmdt_nm" value="<bean:write name="blinfoVO" property="rep_cmdt_nm"/>" style="width:228px" class="search_form-disable" readOnly>
							</td>
						</tr>
						<tr>
							<th><bean:message key="Package"/></th>
							<td colspan="4">
								<input type="text" name="f_pck_qty" value="<bean:write name="blinfoVO" property="pck_qty"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly><!-- 
							 --><input type="text" name="f_pck_nm"  value="<bean:write name="blinfoVO" property="pck_ut_nm"/>" style="width:134px" class="search_form-disable" readOnly>
							</td>
						</tr>
						<tr>
							<th><bean:message key="Weight_G"/></th>
							<td>
								<input type="text" name="f_grs_wgt" value="<bean:write name="blinfoVO" property="grs_wgt"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
							</td>
							<td>K</td>
							<td>
							 	<input type="text" name="f_grs_wgt1" value="<bean:write name="blinfoVO" property="grs_wgt1"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
							</td>
							<td>L</td>
						</tr>
					<logic:equal name="blinfoVO" property="air_sea_clss_cd" value="A">
						<tr>
							<th><bean:message key="Weight_C"/></th>
							<td>
								<input type="text" name="f_chg_wgt" value="<bean:write name="blinfoVO" property="chg_wgt"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
							</td>
							<td>K</td>
							<td>
							 	<input type="text" name="f_chg_wgt1" value="<bean:write name="blinfoVO" property="chg_wgt1"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
							</td>
							<td>L</td>
						</tr>
					</logic:equal>
					<logic:notEqual name="blinfoVO" property="air_sea_clss_cd" value="A">
		               	<input type="hidden" name="f_chg_wgt" />
		               	<input type="hidden" name="f_chg_wgt1" />
		            </logic:notEqual>
					
						<tr>
							<th>
							<logic:notEqual name="blinfoVO" property="air_sea_clss_cd" value="A">
                            	<bean:message key="Measure"/>
                            </logic:notEqual>
                            <logic:equal name="blinfoVO" property="air_sea_clss_cd" value="A">
                            	<bean:message key="Volume"/>
                            </logic:equal>
							</th>
							<logic:notEqual name="blinfoVO" property="air_sea_clss_cd" value="A">
							<td>
								<input type="text" name="f_meas"  value="<bean:write name="blinfoVO" property="meas"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
							</td>
							<td>
								<bean:message key="CBM"/>
							</td>
							<td>
								<input type="text" name="f_meas1" value="<bean:write name="blinfoVO" property="meas1"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
							</td>
							<td>
								<bean:message key="CFT"/>
							</td>
							</logic:notEqual>
							<logic:equal name="blinfoVO" property="air_sea_clss_cd" value="A">
							<td>
								<input type="text" name="f_meas"  value="<bean:write name="blinfoVO" property="vol_wgt"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
							</td>
							<td>
							</td>
							<td>
								<input type="text" name="f_meas1" value="<bean:write name="blinfoVO" property="vol_meas"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
							</td>
							<td>
								<bean:message key="CBM"/>
							</td>	
							</logic:equal>
						</tr>
					</table>
				</div>
			</div>
		</div>
	<table class="line_bluedot"><tr><td></td></tr></table>
		<div class="opus_design_inquiry"  style="margin-bottom:0;">
			<h3 class="title_design"><bean:message key="Billing_Information"/></h3>
			<div class="layout_wrap">
				<div class="layout_vertical_4" style="width: 320px">	
					<table>
						<colgroup>
							<col width="115">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Bill_To"/></th>
								<td>
									<input  class="input_search" required  type="text" name="f_bill_to_cd" maxlength="20" value="<bean:write name="blinfoVO" property="bill_to_cd"/>" onKeyDown="codeNameAction('BILLTO',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('BILLTO',this, 'onBlur')" style="ime-mode:disabled; text-transform:uppercase;width:50px" dataformat="excepthan" /><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('CUSTOMER_POPLIST')" id="billto"></button><!-- 
							 		--><input type="text" name="f_bill_to_nm" maxlength="50" value="<bean:write name="blinfoVO" property="bill_to_nm"/>" onKeyDown="custEnterAction(this,'CUSTOMER')" onBlur="strToUpper(this);" style="ime-mode:disabled; text-transform:uppercase;width:106px" dataformat="excepthan" >
								</td>
							  </tr>
			                  <tr>
								<th><bean:message key="Ship_to"/></th>
			                     <td>
							         <input  type="hidden" name="f_ship_to_cd" maxlength="20" value="<bean:write name="blinfoVO" property="ship_to_cd"/>" onKeyDown="codeNameAction('SHIPTO',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('SHIPTO',this, 'onBlur')" style="ime-mode:disabled; text-transform:uppercase;width:50px" dataformat="excepthan" ><!-- 
								  --><input type="text" name="f_ship_to_nm" maxlength="50" value="<bean:write name="blinfoVO" property="ship_to_nm"/>" onKeyDown="custEnterAction(this,'CUSTOMER2')" onBlur="strToUpper(this);" style="ime-mode:disabled; text-transform:uppercase;width:189px"  dataformat="excepthan">
			                     </td>
							  </tr>
			                  <tr>
			                    <th><bean:message key="Attention_to"/></th>
				                <td>
				     				<input type="text" name="f_attn_to" maxlength="50" value="" onBlur="strToUpper(this);"  style="ime-mode:disabled; text-transform:uppercase;width:189px" dataformat="excepthan" >
				                </td>
							  </tr>
			                  <tr>
				                <th><bean:message key="Customer_Ref_No"/></th>
			                    <td>
			        				 <input type="text" name="f_cusref_no" maxlength="40" value="<bean:write name="blinfoVO" property="cust_ref_no"/>" onBlur="strToUpper(this);" style="ime-mode:disabled; text-transform:uppercase;width:189px" dataformat="excepthan" >
			                    </td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="layout_vertical_4" style="width: 280px">	
					<table>
						<colgroup>
							<col width="85">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Invoice_No"/></th>
			                    <td>
			         				<input type="text" name="f_inv_no" value="<bean:write name="blinfoVO" property="inv_no"/>" style="ime-mode:disabled; text-transform:uppercase;width:160px" dataformat="excepthan" maxlength="50" onBlur="strToUpper(this);checkInvNoDup()" >
			                    </td>
			                 </tr>
			                 <tr>
			                    <th><bean:message key="Posting_Date"/></th>
			                     <td>
								     <!--input type="text" name="f_post_dt" style="width:70px"  value="<bean:write name="blinfoVO" property="post_dt"/>"  onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);checkPostDate(this);" maxlength="10" readOnly-->
								     <span class="inquiry_calendar">
										<input required type="text" name="f_post_dt" style="width:80px"  value="<bean:write name="blinfoVO" property="post_dt"/>"  onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);checkPostDate(this);" maxlength="10" readOnly>
									</span>
							     </td>
							  </tr>
			                  <tr>
							     <th><bean:message key="Invoice_Date"/></th>
			                     <td>
									<!--input type="text" name="f_inv_dt" style="width:70px"  value="<bean:write name="blinfoVO" property="inv_dt"/>"  onKeyUp="mkDateFormatType(this, event, false,1);enterCalcCreateTerms()" onBlur="mkDateFormatType(this, event, true,1);calcCreateTerms();" maxlength="10" >
									<img id="f_inv_dt_cal" onclick="doDisplay('DATE2', frm1);" src="<CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/-->
									<span class="inquiry_calendar">
										<input required type="text" name="f_inv_dt" id="f_inv_dt" style="width:80px"  value="<bean:write name="blinfoVO" property="inv_dt"/>"  onKeyUp="mkDateFormatType(this, event, false,1);enterInvDt();" onBlur="mkDateFormatType(this, event, true,1);changeInvDt();" maxlength="10" ><!--
										--><button type="button" class="calendar ir" name="f_inv_dt_cal" id="f_inv_dt_cal" onclick="doDisplay('DATE2', frm1);"></button>
										<input type="hidden" name="pre_inv_dt" value="<bean:write name="blinfoVO" property="inv_dt"/>" />
									</span>
			                     </td>
							  </tr>
			                  <tr>
							     <th><bean:message key="Terms"/></th>
			               	    <td>                            	
						            <select name="f_terms" class="search_form" style="width:80px;text-align:left" onchange="javascript:calcCreateTerms();">
						            	<option value=""></option>
			                          		<bean:define id="paramTermsList"  name="valMap" property="termsList"/>
										    <logic:iterate id="TermsVO" name="paramTermsList">
			                          			<option value='<bean:write name="TermsVO" property="cd_val"/>'><bean:write name="TermsVO" property="cd_nm"/></option>
			                          		</logic:iterate>
									</select><!-- 
								 --><input type="text" name="f_term_dt" value="" onKeyDown="enterCalcCreateTerms();" onChange="setRemarkTerms()"; onKeyPress="onlyNumberCheck();" onBlur="calcCreateTerms();" style="ime-mode:disabled;width:25px;text-align:left" dataformat="excepthan">
			                	</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="layout_vertical_4" style="width: 300px">	
					<table>
						<colgroup>
							<col width="110">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Due_Date"/></th>
			                    <td>
							         <!--input type="text" name="f_due_dt" value="" style="width:70px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" maxlength="10">
							         <img id="f_due_dt_cal" onclick="doDisplay('DATE3', frm1);" src="<CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/-->
							         <span class="inquiry_calendar">
										<input required type="text" id="f_due_dt" name="f_due_dt" value="" style="width:70px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Due Date');" maxlength="10"><button type="button" class="calendar ir" name="f_due_dt_cal" id="f_due_dt_cal" onclick="doDisplay('DATE3', frm1);"></button>
									</span>
			                    </td>
							  </tr>
			                  <tr>
			                    <th><bean:message key="Currency"/></th>
			                 	 <td>
								     <select required name="f_curr_cd" style="width:70px;" onChange="setCurrency();">
								 	 <option value=""></option>
			                         <bean:define id="paramCurrList"  name="valMap" property="currList"/>
											<logic:iterate id="CurrVO" name="paramCurrList">
			                           			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
			                           		</logic:iterate>
			                          	</select>
			                      </td>
							  </tr>
			                  <tr>
			                      <th><bean:message key="Amount_Due"/></th>
				                    <td >
				         				<input type="text" name="f_amt_due" value="" style="width:70px;text-align:right" readOnly>
				                    </td>
							  </tr>
			                  <tr>
				                  <th><bean:message key="Paid_Amount"/></th>
			                    <td>
			         				<input type="text" name="f_paid_amt" value="" style="width:70px;text-align:right" readOnly>
			                    </td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="layout_vertical_4">	
					<table>
						<colgroup>
							<col width="100">
							<col width="50">
							<col width="50">
							<col width="*">
						</colgroup>
						<tbody>
						    <tr>
								<th><bean:message key="Last_CK_No"/></th>
			                    <td colspan="3">
			         				<input type="text" name="f_last_ck" value="" style="width:140px" readonly>
			                    </td>
							</tr>
			                <tr>
			                    <th><bean:message key="Last_Paid_Date"/></th>
			                    <td  colspan="3">
			          			    <!--input type="text" name="f_last_paid_dt_cal" style="width:70px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" maxlength="10" >
			                      	<img id="dateImg4" onclick="doDisplay('DATE4', frm1);" src="<=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/-->
			                        <span class="inquiry_calendar">
									    <input type="text" name="f_last_paid_dt_cal" style="width:105px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Last Paid Date');" maxlength="10" ><button type="button" class="calendar ir" name="dateImg4" id="dateImg4" onclick="doDisplay('DATE4', frm1);"></button>
									</span>
			                    </td>
							</tr>
			                <tr>
			                    <th><bean:message key="Incoterms"/></th>
			                    <td  colspan="3">
								    <select name="f_inco_cd" style="width:105px;">
								        <option value=""></option>
								            <bean:define id="incotermsList"  name="valMap" property="incotermsList"/>
										<logic:iterate id="IncotermsVO" name="incotermsList">
			                    		    <option value='<bean:write name="IncotermsVO" property="cd_val"/>'><bean:write name="IncotermsVO" property="cd_nm"/></option>
			                    		</logic:iterate>
			                    	</select>
			                    </td>
							</tr>
							<tr>
						        <th><bean:message key="Tax_No"/></th>
				                <td>
				                    <input type="text" name="f_tax_no" value="" style="ime-mode:disabled; text-transform:uppercase;width:105px" dataformat="excepthan" maxlength="20" onBlur="strToUpper(this);" >
				                </td>
			                    <th><label for="exID01"><bean:message key="Tax_Bill"/></label></th>
			                    <td>
			                        <input type="checkbox" name="f_tax_bill" value="Y" id="exID01" disabled="disabled">
			                    </td>
							</tr>
						</tbody>
					</table>
				</div>
				<table>
					<tr>
	                     <th width="110px"><bean:message key="Remark"/></th>
	                     <td colspan="5">
	         				<textarea name="f_remark" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" style="width:450px;height:50px;" dataformat="excepthan"></textarea>&nbsp;&nbsp;&nbsp;
	         				<button type="button" class="btn_etc" id="btn_etc" onclick="getCntrInfo();"><bean:message key="Container"/> <bean:message key="Information"/></button>
	         				<button id = "btnUstFrei" type="button" class="btn_etc" onclick="setUstFreiInfo();" style="cursor:hand; display:none;"><bean:message key="UST_FREI"/></button>
	                     </td>
					</tr>
	     		</table>
			</div>
				
		</div>
	
<script>
function goSetDfltFrt() {
	var formObj = document.frm1;
	var vf_air_sea_clss_cd = formObj.f_air_sea_clss_cd.value;
	var vf_bnd_clss_cd =  formObj.f_bnd_clss_cd.value;
	var vf_biz_clss_cd =  formObj.f_biz_clss_cd.value;
	setDfltFrtInvS('', vf_air_sea_clss_cd, vf_bnd_clss_cd, vf_biz_clss_cd);
}

</script>
    <!-- 소타이틀, 대버튼 -->
<table class="line_bluedot"><tr><td></td></tr></table>
	<div class="opus_design_grid">
		<div class="opus_design_btn">
		   <button type="button" class="btn_normal" onclick="doWork('VAT_CAL');" id="vatBtn" style="cursor:hand; display:none;" btnAuth="VAT_CAL"><bean:message key="VAT_Cal"/></button>			
		   <button type="button" class="btn_normal" onclick="goSetDfltFrt();" id="rowAddBtn2"><bean:message key="Default"/><bean:message key="New"/></button>
		   <button type="button" class="btn_normal" onclick="doWork('ROWADD');" id="rowAddBtn1"><bean:message key="Add"/></button>
		</div>
		
		<script language="javascript">comSheetObject('sheet1');</script>
		
		<script language="javascript">comSheetObject('sheet2');</script>
		<script language="javascript">comSheetObject('sheet3');</script>
		
		<div class="grid_option_right mar_top_4">
			<table>
				<tr>
					<td style="display:none"><bean:message key="Amount"/></td>
	                      <td style="display:none">
						<input class="mar_left_4" type="text" name="f_amt_tot" value="" style="width:100px;text-align:right;font-weight:bold" readOnly>
					</td>
	
					<td style="display:none"><bean:message key="Vat_Amount"/></td>
	                      <td style="display:none" >                      
						<input type="text" name="f_vatamt_tot" value="" style="width:100px;text-align:right;font-weight:bold" readOnly>
					</td>
					<td ><bean:message key="Total_Amount"/></td>
	                      <td><input  class="mar_left_4" type="text" name="f_totamt_tot" value="" style="width:100px;text-align:right;font-weight:bold" readOnly>
					</td>
				</tr>
			</table>		
		</div>
				
	</div>
	</div>
	</form>

<script type="text/javascript">
fnbtnCtl(1);// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
</script>
