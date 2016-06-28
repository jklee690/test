<!DOCTYPE html>
<html lang="en"  class="pop_html">
<%@ taglib uri="/WEB-INF/tld/template.tld" prefix="template"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@page import="com.clt.apps.opusbase.system.menu.dto.MenuTreeVO"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Map"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@include file="./../../../../../syscommon/header/CLTTemplateHeader.jsp"%>
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!-- Mobile meta tag(S) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densityDpi=medium-dpi">
<meta name="format-detection" content="telephone=no" />
<!-- Mobile meta tag(E) -->
<title>OPUS Forwarding</title>
<link rel="stylesheet" type="text/css" href="style/css/theme_default.css" />
<script src="./js/ibsheet/ibsheet.js" TYPE="text/javascript"></script>
<script src="./js/common/IBSheetConfig.js" TYPE="text/javascript"></script>
<script src="./js/common/CoBizCommon.js" TYPE="text/javascript"></script>
<script src="./js/common/CoMessage.js" TYPE="text/javascript"></script>
<script src="./js/common/CoCommon.js" TYPE="text/javascript"></script>
<script src="./js/common/CoFormControl.js" TYPE="text/javascript"></script>
<script src="./js/common/ajax_util.js" TYPE="text/javascript"></script>
<script src="style/js/jquery-1.11.0.min.js"></script>
<script src="style/js/opus_ui.js"></script>
<script type="text/javascript" src="js/common/CoAxon.js"></script>

<% if(!"RPT_PRN_0010.clt".equals(pageUrl) && !"RPT_RD_0010.clt".equals(pageUrl) && !"RPT_RD_0020.clt".equals(pageUrl) && !"RPT_RD_0030.clt".equals(pageUrl)) { %>
	<script src="./js/common/IBSheetInfo.js" TYPE="text/javascript"></script>
<%} %>

<script type="text/javascript">
	/*$(function(){
        $("button").on("click",function(){
            if($(this).text() == "Down Excel" || $(this).attr("name") == "btn_DownExcel"){
                $(document).find(".opus_design_grid").addClass("excelCellColor");
                setTimeout(function(){
                    $(document).find(".opus_design_grid").removeClass("excelCellColor");
                },10);
            }
        });
    }); */
    $(document).ready(function() {
    	if(document.frm1!= undefined || document.frm1!= null){
			axon_event.addListenerFormat('keyup', 'ComEditFormating', document.frm1);	//for CNTR
		}
		if(document.form!= undefined || document.form!= null){
			axon_event.addListenerFormat('keyup', 'ComEditFormating', document.form);	//for CNTR
		}
		ajaxSendPost(getBoldYn, 'reqVal', '&goWhere=aj&bcKey=getBoldYn&f_userId=<%=userInfo.getUsrid()%>' , './GateServlet.gsl');
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
	}
</script>
</head>
<body onload="setupPage()">
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
	
	
	<template:insert parameter="body" />
</body>
</html>
