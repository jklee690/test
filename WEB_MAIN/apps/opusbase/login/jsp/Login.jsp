<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!-- Mobile meta tag(S) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densityDpi=medium-dpi">
<meta name="format-detection" content="telephone=no" />
<!-- Mobile meta tag(E) -->
<title>OPUS Forwarding</title>
<link rel="shortcut icon" href="<%=CLT_PATH%>/favicon.ico" type="image/x-icon">
<%@include file="./../../../../syscommon/header/CLTInitTokenHeader.jsp"%>
<bean:write name="checkStr" filter="false"/>
<link rel="stylesheet" type="text/css" href="style/css/theme_default.css" />
<script src="style/js/jquery-1.11.0.min.js"></script>
<script src="style/js/opus_ui.js"></script>
<script>
$(window).load(function(){
    setTimeout(function(){
        $(".login_div_form > span input").each(function(){
            if($(this).val() != "" && $(this).val() != null){
                $(this).parent().addClass("val_ready");
            } else {
                $(this).parent().removeClass("val_ready");
            }
        });
        
        $(":input:visible:enabled:first").focus();
        
    },10);
    
    //password autocomplete 
    if(event.type == "keyup" && event.keyCode == 13){
        setTimeout(function(){
            $(".login_div_form > span input").each(function(){
                if($(this).val() != "" && $(this).val() != null){
                    $(this).parent().addClass("val_ready");
                } else {
                    $(this).parent().removeClass("val_ready");
                }
            });
        },10);
    }
    
    $(".login_div_form > span input").bind("keyup focusout",function(){
        if($(this).val() != "" && $(this).val() != null){
            $(this).parent().addClass("val_ready");
        } else {
            $(this).parent().removeClass("val_ready");
        }
    });
});


function rtnMsg(){	
	form.j_username.focus();
	
	<logic:notEmpty name="EventResponse">
		<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
		<logic:notEmpty name="valMap">
			<logic:equal name="valMap" property="msg" value="user">
				alert('Your ID is not registered.');
			</logic:equal>
			<logic:equal name="valMap" property="msg" value="pw">
				alert('Your password is wrong.');
			</logic:equal>
			<logic:equal name="valMap" property="msg" value="mac">
				alert('Your Mac Address is not registered.\r\nPlease contact system administrator.');
			</logic:equal>
			<logic:equal name="valMap" property="msg" value="userid">
				alert('Your input user ID, password is wrong 3 times.\r\nPlease contact system administrator.');
			</logic:equal>
			<logic:equal name="valMap" property="msg" value="fail">
				alert('Try again.');
			</logic:equal>
			<logic:equal name="valMap" property="msg" value="chg_pwd">
				form.f_usrid.value = '<bean:write name="valMap" property="usrid"/>';
				form.f_pwd.value = '<bean:write name="valMap" property="pwd"/>';
				alert('Please change your password.\n(After 90 days, must be changed.)');
				document.getElementById("pwd_chg").style.display = 'inline';
			</logic:equal>
		</logic:notEmpty>
	</logic:notEmpty>
	
}


function submitForm() {
	//Input 검증로직
	if(!validate()){
		return
	}
	with(document.form){
		if(document.all("j_username").value.length < 1){
			//alert(getLabel('OPUS_MSG20'));
			document.all("j_username").focus();
			return;
		}
		if(document.all("j_password").value.length < 1){
			//alert(getLabel('OPUS_MSG21'));
			document.all("j_password").focus();
			return;
		}
		showProcess('WORKING', document);
//test 기간 동안 주석처리 함. 
//		if(document.all("j_password").value=="1111"){
//			alert("Please Change your password.");
//		}
		submit();
	}
}


function checkBrowser(){
	
	var browser=navigator.appName
	var b_version=navigator.appVersion
	var version=parseFloat(b_version)
	var lCbrowser = browser.toLowerCase();
	if(lCbrowser.indexOf('explorer')< 0 ){
		UserLangCd = window.navigator.language;
		UserLangCd = UserLangCd.toUpperCase();
		//alert(getLabel('OPUS_MSG19'));
	}
}

</script>
<!-- MAC Address 인증 ActiveX -->
<SCRIPT language=JavaScript for=auth event=OnError(ErrMsg)>
	alert("에러 발생:" + ErrMsg);
</SCRIPT>
</head>



<logic:notEmpty name="EventResponse">
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
		<logic:notEmpty name="valMap">
			<logic:equal name="valMap" property="msg" value="redirection">
				<body class="login_body" onload='javascript:document.getElementById("loginInfo").style.display = "none";doShowProcess();
					location.replace("http://" +location.host+"<%=request.getContextPath() %>/UserLogin.usr");' /> 
				<!-- TopFrame.screen LoginRe.screen -->
			</logic:equal>
			<logic:notEqual name="valMap" property="msg" value="redirection">
				<body class="login_body" onload="rtnMsg();">
			</logic:notEqual>
		</logic:notEmpty>
		<logic:empty  name="valMap">			
			<body class="login_body" onload="rtnMsg();" >
		</logic:empty>
	</logic:notEmpty>
<logic:empty name="EventResponse">	
	<body class="login_body" onload="rtnMsg();">
</logic:empty>


	<!--  Working Image  -->
	<div id="WORKING_IMG" style="position: fixed;left: 0; right: 0; bottom: 0; top: 0;z-index: 1000;display: none;" valign="middle" align="center">
		<iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style="position: absolute;top: 50%;left: 40%;"></iframe>
	</div>
    <!--  login_wrap(S) -->
    <div id="login_wrap">
	    <h1><img src="style/images/theme_default/login_logo.png" alt="OPUS Forwarding: Forwarding information Solution" /></h1>
	    <!-- login_div(S) -->
	    <div id="loginInfo" class="login_div">
            <form name="form" method="post" action="UserLogin.usr" class="login_div_form">
                <input type="hidden" name="f_cmd" value="2" />
                <input type="hidden" name="TOKEN" value=<%=tokenStr %> />
	            <span><input id="login_id" name="j_username" size="15" /></span><!--
	         --><span class="pw"><input id="login_pw" name="j_password" type="password" size="15"   onkeypress="event.keyCode==13?submitForm():'' " /></span>
	            <button type="button" class="login_btn" onclick="submitForm();"><img src="style/images/theme_default/login_btn_in.png" alt="Login" /></button>
            </form>
	    </div>
	    <!-- login_div(E) -->
		<div class="copyright">COPYRIGHT(C) 2014 CYBERLOGITEC CO. LTD. ALL RIGHTS RESERVED.</div>
    </div>
    <!--  login_wrap(E) -->
    <span class="login_border"></span>
</body>
</html>









