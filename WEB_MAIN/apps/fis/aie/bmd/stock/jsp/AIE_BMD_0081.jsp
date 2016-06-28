<%--
=========================================================
*@FileName   : MGT_STK_0011.jsp
*@FileTitle  : CNA 파일 업로드
*@Description: CNA 파일 업로드
*@author     : Chungrue
*@version    : 1.0 -  2009/08/03
*@since      : 2009/08/03

*@Change history: 
=========================================================
--%>

<%@ page contentType="text/xml; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
    <!-- 공통 Header -->
    <%@include file="/syscommon/header/CLTHeaderPOPUP.jsp"%>
    
    <title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css"/>
	
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js"></script>
	<!--ajax 사용시 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js"></script>
	
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/aie/bmd/stock/script/AIE_BMD_0081.js"></script>
	
<%
	String awbType = (String)request.getAttribute("awbtype");
%>


<logic:notEmpty name="EventResponse" property="mapVal">
    <bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
		<script>
			var rtnmsg  = '<bean:write name="tmpMap" property="RTNMSG"/>';
			var rtncode = '<bean:write name="tmpMap" property="RTNCODE"/>';
			var rtncnt  = '<bean:write name="tmpMap" property="RNTCNT"/>';
			var iatacd  = '<bean:write name="tmpMap" property="IATACD"/>';
			var awbtype = '<bean:write name="tmpMap" property="AWBTYPE"/>';

			if(rtncode == "Y"){
				alert(rtncnt + " 건의 CNA정보가 " + rtnmsg);

				parent.opener.frm1.s_iata_cd.value = iatacd;
				if(awbtype == "CL"){
					parent.opener.frm1.s_awbtype[0].checked = true;
				}else{
					parent.opener.frm1.s_awbtype[1].checked = true;
				}
				
				parent.opener.searchSheet1Child();
				
				window.close();
			}else {
				if(rtnmsg != ""){
					alert(rtnmsg);
				}
			}
			
		</script>
</logic:notEmpty>


</head>
<div id="WORKING_IMG" style="position:absolute;background-color:#FFFFFF;width:357;height:130;display:none;" valign="middle" align="center">
    <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style='margin-top:0px;width:0px; height:0px; border:none;display:block'></iframe>
</div>

<base target="_self"/>

<body class="td" onload="LoadPage();" onunload="javascript:parent.opener.initialWin();this.focus();">

<form name="form" method="POST" action="./MGT_STK_0011.clt" enctype="multipart/form-data">
	<!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd"/> 
    <input type="hidden" name="awbType_in" value="<%=awbType%>"/> 
    	
    <table width="494" border="0" cellpadding="0" cellspacing="0">
		<tr>
    		<td class="bigtitle"><%= request.getAttribute("_tit") %></td>
  		</tr>
					
  		
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			        </tr>
<!-------------------- button begin -------------------->
		<tr>
			<td height="10" align="right">
				<table border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td style="cursor:hand" onclick="doWork('UPLOAD')">
							<table height="21" border="0" cellpadding="0" cellspacing="0" >
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Upload"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
								</tr>
							</table>
						</td>									
						<td width="3">&nbsp;</td>
						<td style="cursor:hand" onclick="doWork('CLOSE')">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Close"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
<!-------------------- button end -------------------->
					<tr>
						<td height="7"></td>
					</tr>
<!-------------------- search begin -------------------->
		<tr>
			<td>
				<table width="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td align="left" class="table_search_bg">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
								</tr>
							</table>
							<table height="100%" border="0" cellpadding="0" cellspacing="0">											
								<tr>
									<td width="80" class="table_search_head">파일명</td>
									<td width="150" class="table_search_body">
										<input type="file" name="cna_url" class="search_form" size="60"/>
									</td>
								</tr>
							</table>
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		
		
		<tr>
        	<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
                    							
	</table>		
	
</form>


<iframe name="ifrm1" src="" frameborder="0" scrolling="no" width="0" height="0"></iframe>
<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="andoFileDown"/>
    <input type="hidden" name="docType" value=""/>    
</form>
</body>
</html>