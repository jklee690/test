<!DOCTYPE html>
<html     lang="en">
<%  
//LHK 20150417, Cache 사용하지 않도록 추가
response.setHeader("Cache-Control","no-store");   
response.setHeader("Pragma","no-cache");   
response.setDateHeader("Expires",0);   
if (request.getProtocol().equals("HTTP/1.1")) 
        response.setHeader("Cache-Control", "no-cache"); 
%>
<%@ taglib uri="/WEB-INF/tld/template.tld" prefix="template"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@page import="com.clt.apps.opusbase.system.menu.dto.MenuTreeVO"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Map"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@include file="./../../../../../syscommon/header/CLTTemplateHeader.jsp"%>
<head>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!-- Mobile meta tag(S) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densityDpi=medium-dpi">
<meta name="format-detection" content="telephone=no" />
<!-- Mobile meta tag(E) -->
<title><%="".equals(LEV3_NM)?"Home":LEV3_NM%></title>
<link rel="shortcut icon" href="<%=CLT_PATH%>/favicon.ico" type="image/x-icon">
<link id="theme" value="default" href="style/css/theme_default.css" rel="stylesheet" type="text/css">
<!--[if IE]>
<link rel="stylesheet" type="text/css" href="style/css/IECC.css" />
<![endif]-->
<script src="./js/ibsheet/ibsheet.js" TYPE="text/javascript"></script>
<script src="./js/common/IBSheetInfo.js" TYPE="text/javascript"></script>
<script src="./js/common/IBSheetConfig.js" TYPE="text/javascript"></script>
<script src="./js/common/CoBizCommon.js" TYPE="text/javascript"></script>
<script src="./js/common/CoMessage.js" TYPE="text/javascript"></script>
<script src="./js/common/CoCommon.js" TYPE="text/javascript"></script>
<script src="./js/common/CoFormControl.js" TYPE="text/javascript"></script>
<script src="./js/common/ajax_util.js" TYPE="text/javascript"></script>
<script src="style/js/jquery-1.11.0.min.js"></script>
<script src="style/js/jquery-ui.js"></script><!-- 이파일 로드 -->
<script src="style/js/opus_ui.js"></script>
<script type="text/javascript" src="js/common/CoAxon.js"></script>
<script type="text/javascript">
	/*  [강제 Style 적용] */
	// Menu Level getting CallBack
	function getMenuLevel(reqVal){
		
		var menuLvl='';
		var doc=getAjaxMsgXML(reqVal);
		if(doc[0]=='OK'){
			if(typeof(doc[1])!= 'undefined'){
				menuLvl=doc[1];
			}
		}
		// callback
		// Select Menu Level
		if(menuLvl == "" || menuLvl == "H"){
			$(".gnb_list > li > div").addClass("menu_horz");
			$("#menu_arco").attr("checked",false);
			$("#menu_horz").attr("checked",true);
		} else {
			$(".gnb_list > li > div").removeClass("menu_horz");
			$("#menu_arco").attr("checked",true);
			$("#menu_horz").attr("checked",false);
		}
	}
	
	// 메뉴선택 (아코디언형 / 가로펼침형)
	$("[data-menu='arco']").bind(eventType_click ,function(){
		$(".gnb_list > li > div").removeClass("menu_horz");
	});
	$("[data-menu='horz']").bind(eventType_click ,function(){
		$(".gnb_list > li > div").addClass("menu_horz");
	});
	
	var boldYn='';
	
	// Bold Y/N getting CallBack
	function getBoldYn(reqVal){
		var doc=getAjaxMsgXML(reqVal);
		if(doc[0]=='OK'){
			if(typeof(doc[1])!= 'undefined'){
				boldYn=doc[1];
			}
		}
		
		if(boldYn == "Y"){
			$(".gnb_list > li > a").css("font-weight","bold");
			$("#bold_yes").attr("checked",true);
			$("#bold_no").attr("checked",false);
		} else {
			$(".gnb_list > li > a").css("font-weight","normal");
			$("#bold_yes").attr("checked",false);
			$("#bold_no").attr("checked",true);
		}
	}
	
	// Menu Level setting CallBack
	function setMenuLevel(){
		// callback
	}
	
	// Bold Y/N setting CallBack
	function setBoldYn(){
		// callback
	}
	
	// USer Theme getting CallBack
	function getUserTheme(reqVal){
		
		var userTheme='';
		var doc=getAjaxMsgXML(reqVal);
		if(doc[0]=='OK'){
			if(typeof(doc[1])!= 'undefined'){
				userTheme=doc[1];
			}
		}
		// callback
		// Select USer Theme
		if(userTheme == "2"){
			$("#theme_default").attr("checked",false);
			$("#theme_blue").attr("checked",true);
			$("#theme").attr("href","style/css/theme_blue.css");
		} else {
			$("#theme_default").attr("checked",true);
			$("#theme_blue").attr("checked",false);
			$("#theme").attr("href","style/css/theme_default.css");
		}
	}
	
	// Menu Level setting CallBack
	function setUserTheme(reqVal){
		
		var userTheme='';
		var doc=getAjaxMsgXML(reqVal);
		if(doc[0]=='OK'){
			if(typeof(doc[1])!= 'undefined'){
				userTheme=doc[1];
			}
		}
		// callback
		// Set USer Theme
		if(userTheme == "2"){
			$("#theme").attr("href","style/css/theme_blue.css");
		} else {
			$("#theme").attr("href","style/css/theme_default.css");
		}
	}
	
</script>
<script type="text/javascript">
	$(document).ready(function() {
		if(document.frm1!= undefined || document.frm1!= null){
			axon_event.addListenerFormat('keyup', 'ComEditFormating', document.frm1);	//for CNTR
		}
		if(document.form!= undefined || document.form!= null){
			
			axon_event.addListenerFormat('keyup', 'ComEditFormating', document.form);	//for CNTR
		}
		//axon_event.addListenerPreset('keyup', 'ComPresetFormating', document.form);	//for BULK
		ajaxSendPost(getMenuLevel, 'reqVal', '&goWhere=aj&bcKey=getMenuLevel&f_userId=<%=userInfo.getUsrid()%>' , './GateServlet.gsl');
		ajaxSendPost(getBoldYn, 'reqVal', '&goWhere=aj&bcKey=getBoldYn&f_userId=<%=userInfo.getUsrid()%>' , './GateServlet.gsl');
		
		refreshBookmark();
		
		var page_ui_id = document.URL.substring(document.URL.indexOf("opusfwd")+"opusfwd".length+1,document.URL.indexOf(".clt"));
		var params = "&ofc_cd=" + "<%=userInfo.getOfc_cd()%>"
		+"&ui_id=" + page_ui_id
		+"&com_id="+"DOU";
		
		commonSearchOptionConfig(params);
		
	});
	
	function mkNewFrame(val1, val2, tabId){
		if(val2 != null && val2 != undefined){
			if (tabId == null || tabId == undefined) {
				window.open(val2);
				return;
			}
			if (openedTabs[tabId]) {
				var tab = openedTabs[tabId];
				try{
					if (navigator.appName.indexOf("Netscape") != -1 
							&& tab.history.length > 0) {
						tab.focus();
					}else{
						tab = window.open(val2, '_blank');
						openedTabs[tabId] = tab;
					}
				}catch (e) {
					tab = window.open(val2, '_blank');
					openedTabs[tabId] = tab;
				}
			} else {
				var tab = window.open(val2, '_blank');
				openedTabs[tabId] = tab;
			}
		}
	}
</script>
<script>
	var popHeight= 587;
	if(navigator.appName.indexOf("Microsoft") != -1 || navigator.userAgent.indexOf("Firefox") != -1) {
		popHeight = 612;
	} else if (navigator.vendor.indexOf("Apple") != -1) {
		popHeight = 505;
	}
	
	function openHelpPopUp() { 
	    window.open('./HelpPage.html','','location=no, directories=no, resizable=no, status=no, toolbar=no, menubar=no, width=500, height='+popHeight+', left=100, top=100, scrollbars=no'); 
	}
	
	function doLogout(){
		document.frmLogOut.submit();
	}
	
	function refreshBookmark(){
		document.getElementById("ifbookmark").src="viewBookmark.screen";
	}
</script>
<!-- Vinh.Vo 2015/01/15 (S)  -->
<script type="text/javascript">

	<%-- var page_ui_id = document.URL.substring(document.URL.indexOf("opusfwd")+"opusfwd".length+1,document.URL.indexOf(".clt"));
	var params = "&ofc_cd=" + "<%=userInfo.getOfc_cd()%>"
	+"&ui_id=" + page_ui_id
	+"&com_id="+"DOU";
	
	commonSearchOptionConfig(params); --%>


	function commonSearchOptionConfig(params){
	
		ajaxSendPost(commonSearchOptionConfigCallBack, 'reqVal', '&goWhere=aj&bcKey=commonSearchOptionConfig'+params, './GateServlet.gsl');
	}
	
	function commonSearchOptionConfigCallBack(rtnVal){
		
		var doc=getAjaxMsgXML(rtnVal);
		
		if(doc[0]=='OK'){
			if(typeof(doc[1])!='undefined'){
				if(doc[1] != "-1"){
					var arrData = JSON.parse(doc[1]);
					
					var type = "";
					
					for( i = 0 ; i < arrData.data.length; i++){
						
						 var key_cd = arrData.data[i].key_cd;
						 var tp_cd = arrData.data[i].tp_cd;
						 var cs_cd = arrData.data[i].cs_cd;
						 var dflt_val = arrData.data[i].dflt_val;
						 var attr = arrData.data[i].attr;
						 var strDate = arrData.data[i].date;
						 
						 switch(tp_cd){
						 case "LBL":
							 type = "label";
							 
							 $("#" + key_cd).text(dflt_val);
							 
							 if(attr != "" && attr !=  "RO"){
								 $("#"+key_cd).hide();
							 }
							 break;
							 
						 case "TXT":
							 type = "input";
							 
							 $("input[name='" + key_cd + "']").val(dflt_val);
							 break;
							 
						 case "DT":
							 type = "input";
							 
							 $("input[name='" + key_cd + "']").val(strDate);
							 break;
							 
						 case "CHK":
							 type = "input";
							 
							 $("input[name='" + key_cd + "']").prop("checked", (dflt_val.toUpperCase() == "T" ? true : false));
							 break;
							 
						 case "CHKA":
							 type = "input";
							 
							 $("input[name='" + key_cd + "']").each(function(index){
								 
							    	$(this).prop("checked", (dflt_val[index].toUpperCase() == "T" ? true : false));
							    });
							 break;
							 
						 case "RB":
							 type = "input";
							 
							 $("input[name='" + key_cd + "']").each(function(index){
							    	if(index == dflt_val){
							    		$(this).prop("checked", true);
							    	}
							    });
							 break;
							 
						 case "SLT":
							 type = "select";
							 
							 $("select[name='" + key_cd + "']").val(dflt_val);
							
							 break;
							 
						 case "HDN":
							 type = "hidden";
							 $("input[name='" + key_cd + "']").val(dflt_val);
							 break;
						 }
				    	 
				    	 if(attr != "" && type != "hidden" && type != "label" ){
				    		 if(attr == "RO"){
				    			 $(type + "[name='" + key_cd + "']"). prop('readonly', true);
				    		 }else{
				    			 $(type + "[name='" + key_cd + "']").hide();
				    		 }
				    	 }
				     }
				}
			}
		}
	} 
</script>
<!-- Vinh.Vo 2015/01/15 (E)  -->
</head>
<body onload="setupPage()">
	<input type='hidden' id='prm_seq' name='prm_seq' value="<%=roleBtnVO != null ? roleBtnVO.getPgm_mnu_seq() : ""%>">
	<input type='hidden' id='prm_nm' name='prm_nm' value="<%=LEV3_NM%>">

	<!-- HEADER_FIXED (top fixed area) -->
	<div class="header_fixed">
		<!-- util_bar : 상단 로고영역(바) -->
		<div class="util_bar">
            <%
                String wmsUseVer = (String)application.getAttribute("WMS_USE_VER");
                if(wmsUseVer == null){wmsUseVer = "";}
            %>
            <h1 class='<%="VER3.0".equals(wmsUseVer) || "".equals(wmsUseVer)?"logo":"logo4_0"%> ir'>OPUS Forwarding:TM</h1>
			<!-- util_contents(S) -->
            <div class="util_contents">
				<!-- user_info_div(S) -->
				<div class="user_info_div">
					<span class="user_info"><span>NAME</span><%=userInfo.getUser_name()%></span><!-- 
                 --><span class="user_info"><span>ID</span><%=userInfo.getUsrid()%></span><!-- 
                 --><span class="user_info"><span>OFFICE</span><%=userInfo.getOfc_locl_nm()%></span><!-- 
				 --><button type="button" class="btn_logout" onclick="doLogout();">LOGOUT</button>
				</div>
				<!-- user_info_div(E) -->
				
				<!-- layout_change(S) -->
				<div class="layout_change">
					<button type="button" class="layout_default now_layout"><span></span></button>
					<button type="button" class="layout_hide"><span></span></button>
				</div>
				<!-- layout_change(E) -->
				<!-- util_btns(S) -->
				<div class="util_btns"> 
	            	<button type="button" class="util_help ir" onclick="openHelpPopUp()"><span>Help</span></button>
	             	<button type="button" class="util_fav ir"><span>Favorite link</span></button> 
				 	<button type="button" class="util_setting ir"><span>Preferences</span></button>
				</div>
				<!-- util_btns(E) -->
			</div>
            <!-- util_contents(E) -->
                
			<!-- preferences(S) -->
			<div class="preferences">
                <h2>Preferences</h2>
                <!-- theme(S) -->
                <!-- 
                <h3>Themes</h3>
                <ul>
                    <li>
                    	<input type="radio" id="theme_default" name="theme" />
					    <label for="theme_default">Theme White</label>
                    </li>
                    <li>
                    	<input type="radio" id="theme_blue" name="theme" />
					    <label for="theme_blue">Theme Blue</label>
					</li>
				</ul>
				 -->
                <!-- theme(E) -->
                <!-- Menu(S) -->
				<h3>Menu</h3>
                <div>
                	<ul>
	                    <li>
							<input type="radio" id="menu_arco" name="menu_level" data-menu="arco" checked="checked" />
							<label for="menu_arco">Arccodion Menu</label>
						</li>
	                    <li>
		                    <input type="radio" id="menu_horz" name="menu_level" data-menu="horz" />
		                    <label for="menu_horz">Horizontal Menu</label>
	                    </li>
                    </ul>
	                <!-- <input type="checkbox" id="new_links_chk" checked="checked" />
	                <label for="new_links_chk">Open menu links in new tab</label> -->
                </div>
                <!-- Menu(E) -->
                <!-- Bold Y/N(S) -->
                <h3>Bold (Top Menu & Grid Data)</h3>
				<ul>
                    <li>
						<input type="radio" id="bold_yes" name="bold_yn" data-menu="yes" checked="checked" />
						<label for="bold_yes">Yes</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<input type="radio" id="bold_no" name="bold_yn" data-menu="no" />
	                    <label for="bold_no">No</label>
					</li>
                </ul>
                <!-- Bold Y/N(E) -->
                <!-- Download(S) -->
                <h3>Download Report Designer Installer</h3>
				<ul>
					<li>
						<a href="./rpt/CX60u_OCX_setup.exe">Report Designer Install File For I/E</a>
					</li>
				</ul>
                <!-- Download(E) -->
            </div>
            <!-- preferences(E) -->
                
            <!-- favorite_links(S) -->
            <div class="favorite_links">
            	<iframe id="ifbookmark" style="width:100%; height:650px;"></iframe>
                <!-- favorites(E) -->
            </div>
            <!-- favorite_links(E) -->
		</div>
		<!-- //util_bar -->
	</div>
	<!-- //HEADER_FIXED (top fixed area) -->
	<%
		//To get GNB Data.
		HttpSession httpSession = request.getSession();
		CommonEventResponse commonEventResponse = (CommonEventResponse) httpSession.getAttribute("menuResponse");
		Map<String, ArrayList<MenuTreeVO>> menuMap = commonEventResponse.getMapVal();

		ArrayList<MenuTreeVO> topMenuList = menuMap.get("TOPMENU");
		ArrayList<MenuTreeVO> subMenuList = menuMap.get("SUBMENU");
		ArrayList<MenuTreeVO> pgmMenuList = menuMap.get("PGMMENU");
		ArrayList<MenuTreeVO> myPgmList = menuMap.get("MYPGM");
	%>
	<!-- GNB (Global Navigation Bar) : (S) -->
	<button type="button" class="btn_gnb_hide ir" data-gnbbtn="on">Global navigation bar show/hide<span data-gnbbtn="on"></span></button>
	<div class="gnb_wrap">
		<!-- gnb_2dpeth (S) -->
        <div class="gnb_2dpeth">
        	<!-- <strong id="gnb_2depth_name">FORWARDING</strong> -->
        	
        	<!-- Menu 3 Level(S) -->
            <ul class="gnb_list">
            	<%
					for (MenuTreeVO topMenuTreeVO : topMenuList) {
						String topDisplaySequence = topMenuTreeVO.getDispSeq();
						
						//[Menu 사라지는 문제]
						//out.print("<iframe id='temp' style='z-index: -1; filter:alpha(opacity=0); border: 1px solid; left:0px; top:0px; position:absolute;height:500px;width:1000px; background-color: #303030''>");
						
						out.print("<li><a id='" + topMenuTreeVO.getDispSeq() + "'" + " index='" + topMenuTreeVO.getDispIndex() + "'>" + topMenuTreeVO.getDispName() + "</a>");
						out.print("<div>");
						out.print("<ul>");
						int i = 0;
						for (MenuTreeVO subMenuTreeVO : subMenuList) {
							if (topDisplaySequence.equals(subMenuTreeVO.getL1seq())) {
								out.print("<li><a>" + subMenuTreeVO.getDispName() + "</a>");
								out.print("<div><ul>");
								String subDisplaySequence = subMenuTreeVO.getDispSeq();
								for (MenuTreeVO pgmMenuTreeVO : pgmMenuList) {
									if (subDisplaySequence.equals(pgmMenuTreeVO.getL2seq())) {
										
										//out.print("<li><a href=\"" + pgmMenuTreeVO.getPgmURL() + "\" target=\"" + (i++ % 2 == 0 ? "_blank" : "_self") + "\">" + pgmMenuTreeVO.getPgmName() + "</a></li>"); // Hard Code
										out.print("<li><a href=\"" + pgmMenuTreeVO.getPgmURL() + "\" target=\"" + (!pgmMenuTreeVO.isReLoadTab() ? "_blank" : "_self") + "\">" + pgmMenuTreeVO.getPgmName() + "</a></li>"); // Real code
										
									}
								}
								out.print("</ul></div>");
								out.print("</li>");
							}
						}
						out.print("</ul>");
						out.print("</div>");
						out.print("</li>");
						
						//out.print("</iframe>");
						
					}
				%>
            </ul>
        	<!-- Menu 3 Level(E) -->
		</div>
		<!-- gnb_2dpeth (E) -->
	</div>
	<!-- GNB (Global Navigation Bar) : (E) -->
	
	<div class="wrap">
	<input type="hidden" id="userId" value="<%=userInfo.getUsrid()%>">
	<template:insert parameter="body" />
	</div>
	<!--  Working Image  -->
	<div id="WORKING_IMG" style="position: fixed;left: 0; right: 0; bottom: 0; top: 0;z-index: 1000;display: none;" valign="middle" align="center">
		<iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style="position: absolute;top: 50%;left: 40%;"></iframe>
	</div>
	<!--  Complete Image  -->
	<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
		<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
	</div>
	<!--  from for acction logout  -->
	<form method="post" name="frmLogOut" id="frmLogOut" action="LogOut.usr"></form>
</body>
</html>