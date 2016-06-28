<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : CLTHeader.jsp
*@FileTitle  : ê³µíµ í¤ëíì¼
*@Description: ê³µíµ í¤ëíì¼
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/28/2008
*@since      : 08/28/2008

*@Change history:
=========================================================
--%>
<%@ page import="com.clt.apps.opusbase.utils.LoginUserUtil,com.clt.apps.opusbase.login.dto.UserInfoVO"%>
<%@ page import="java.util.ArrayList,com.clt.apps.opusbase.system.role.dto.RoleBtnVO"%>
<%@ page import="com.clt.apps.opusbase.main.dto.NaviVo,com.clt.apps.opusbase.utils.NaviInfo"%>

<%@ taglib uri="struts-bean"  prefix="bean"%>
<%@ taglib uri="struts-html"  prefix="html"%>
<%@ taglib uri="struts-logic" prefix="logic"%>
<%@ taglib uri="clt-rowset"   prefix="clt"%>
<%@ taglib uri="clt-writer"   prefix="wrt"%>

<%  
//LHK 20150417, Cache ì¬ì©íì§ ìëë¡ ì¶ê°
response.setHeader("Cache-Control","no-store");   
response.setHeader("Pragma","no-cache");   
response.setDateHeader("Expires",0);   
if (request.getProtocol().equals("HTTP/1.1")) 
        response.setHeader("Cache-Control", "no-cache"); 
%> 

<%! 
String CLT_PATH = "";  
String CLT_MSG_PATH = ""; 
String MULTI_LANGUAGE = ""; 
String MULTI_IMEMODE = "ime-mode:disabled;";

String LEV1_NM = "";
String LEV2_NM = "";
String LEV3_NM = "";

%>
<%  
	CLT_PATH = request.getContextPath();
	UserInfoVO userInfo = null;
	
	//2012.11.27 Lee Hae Kyoung 
	NaviVo naviVo = null; 
	
	String pageUrl = (String)request.getAttribute("requestURL");	
	if(pageUrl != null){
		if (pageUrl.lastIndexOf("/") > 0 && pageUrl.length() > pageUrl.lastIndexOf("/")+1) {
			pageUrl = pageUrl.substring( pageUrl.lastIndexOf("/")+1 );
		}
	}
	
	try{
		userInfo = LoginUserUtil.getUserInfo(request);
		CLT_MSG_PATH = userInfo.getUse_lang_cd();
		MULTI_LANGUAGE = userInfo.getMulti_language();
		if ("Y".equals(MULTI_LANGUAGE)){
			MULTI_IMEMODE = "ime-mode:auto;";
		}
		
		naviVo = NaviInfo.getNaviInfo(pageUrl);
		if(naviVo != null){
			LEV1_NM = 	naviVo.getLev1_nm();
			LEV2_NM = 	naviVo.getLev2_nm();
			LEV3_NM = 	naviVo.getLev3_nm();
		}				
	}catch(Exception exc){
	}  
	
%>
	<% if(userInfo==null){ %>
		location.href='./NoSession.screen';
    <% }else{ %>
    	<script language="javascript" src="<%=CLT_PATH%>/js/common/shortcut.js"></script>
		<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/message.js"></script>
		<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/FMS_COM_MSG.js"></script>
		<script src="<%=CLT_PATH%>/js/common/jquery-1.8.3.min.js" type="text/javascript"></script>
		
		<script language="javascript">
			var UserLangCd = '<%=userInfo.getUse_lang_cd()%>';
			var UserOfcCd  = '<%=userInfo.getOfc_cd()%>';
			var APP_PATH = '<%=CLT_PATH%>'; 
			var ofcFlg = "<%=userInfo.getOfc_flg()%>";
			var Def_wh_ctrt_no = "<%=userInfo.getDef_wh_ctrt_no()%>";
			var Def_wh_ctrt_nm = "<%=userInfo.getDef_wh_ctrt_nm()%>";
			var Def_wh_cd = "<%=userInfo.getDef_wh_cd()%>";
			var Def_wh_nm = "<%=userInfo.getDef_wh_nm()%>";
			var Def_ofc_curr_cd = "<%=userInfo.getOfc_curr_cd()%>";
			var LOCAL_CD = '<%=CLT_MSG_PATH%>';
			var MULTI_LANGUAGE = '<%=MULTI_LANGUAGE%>'; 
 
			
		</script>

		<script language="javascript">

				 document.onkeydown=document_onkeydown;
			      function document_onkeydown(){
			         try{         
			        	 if(ComGetEvent("keycode")==27){
								window.event.returnValue = false;
								return;
			        	 }
			        	 
			            if(ComGetEvent("keycode")!=8) return true; 
			            var se = ComGetEvent();
			              if(se.readOnly!=null && !se.readOnly) return true;
			              if (se.isTextEdit!=null && se.isTextEdit) return true;
			              if (se.isContentEditable!=null && se.isContentEditable) return true;
			              ComJsEventStop();
			              return false;
			         }catch(err) {
			            return false;
			             //ComFuncErrMsg("Backspace ë°©ì§ ì²ë¦¬ ìë¬\n" + err.message);
			         }
			      }			
				
			
		</script>
		
		<script language="javascript"> 
		/*
			window.onbeforeunload=function(){
				if (window.event.clientY < 0 && (window.event.clientX > (document.documentElement.clientWidth - 5) || window.event.clientX < 15) ) { 
					return "";
				} 
			} 
		*/ 
		$(document).ready(function(){			
			$("form:not(.filter) :input[type='text']:visible:enabled:first").focus();
			
			// í¬ë¡¬ìì í¬ì»¤ì¤ê° ì´ëëì ë ì»¤ìê° ë¤ë¡ ê°ëë¡ ì²ë¦¬
			$('textarea').each(function(index, item) {
				item.onfocus = function() {
			        window.setTimeout(function() {
			            moveCaretToEnd(item);
			        }, 1);
			    };
			});
			
			$('textarea[maxlength]').bind('keyup change', function() {  
				var str = $(this).val();  
				var mx = parseInt($(this).attr('maxlength'))  
				
				if (str.length > mx) {  
					$(this).val(str.substr(0, mx));
				    return false;  
				}  
			}) 
		});
		
		function moveCaretToEnd(el) {
		    if (typeof el.selectionStart == "number") {
		        el.selectionStart = el.selectionEnd = el.value.length;
		    } else if (typeof el.createTextRange != "undefined") {
		        el.focus();
		        var range = el.createTextRange();
		        range.collapse(false);
		        range.select();
		    }
		}
		
		$(window).resize(function() {
			if (!ComFuncCheck("resizeSheet")) return; 
			if(this.resizing) {
				clearTimeout(this.resizing);
			}
			this.resizing = setTimeout(function() {
				resizeSheet();
			}, 220);
		});
		</script>
	<% } %>

	
	<%
		RoleBtnVO roleBtnVO = (RoleBtnVO)request.getAttribute("roleBtnVO");
		if(roleBtnVO!=null){
			String attr1 = roleBtnVO.getAttr1();						// attr1: Retrieve
			String attr2 = roleBtnVO.getAttr2();						// attr2: New(Add)
			String attr3 = roleBtnVO.getAttr3();						// attr3: Save
			String attr4 = roleBtnVO.getAttr4();						// attr4: Delete
			String attr5 = roleBtnVO.getAttr5();						// attr5: Print
			String attr6 = roleBtnVO.getAttr6();						// attr6: Excel
			String attr7 = roleBtnVO.getAttr7();						// attr7: 
			String attr8 = roleBtnVO.getAttr8();						// attr8: 
			String attr9 = roleBtnVO.getAttr9();						// attr9: 
			String attr_extension   = roleBtnVO.getAttr_extension();	// Add by pomsjung
			String url   = roleBtnVO.getPgm_url();
			String prm_seq = roleBtnVO.getPgm_mnu_seq(); // PGM  (Add by pomsjung))
		%>
			<script type="text/javascript">
				var attr1 = "<%= attr1 %>";								
				var attr2 = "<%= attr2 %>";
				var attr3 = "<%= attr3 %>";
				var attr4 = "<%= attr4 %>";
				var attr5 = "<%= attr5 %>";
				var attr6 = "<%= attr6 %>";
				var attr7 = "<%= attr7 %>";
				var attr8 = "<%= attr8 %>";
				var attr9 = "<%= attr9 %>";
				var url   = "<%= url   %>";
				var attr_extension   = "<%= attr_extension   %>";		
				var prm_seq = "<%= prm_seq %>";
			</script>
		<%
		}
	%>
	
<script type="text/javascript">
function doBtnAuthority(type) {
	var all = document.all;	
	for (var i=0; i<all.length; i++) {
		if (all[i].getAttribute("btnAuth") != null) {
			var tmpBtnAuth = all[i].getAttribute("btnAuth");
				if (tmpBtnAuth == "Y") {
					all[i].style.display = "";
			}
		}
	}
	
	var tmpType = type.split(",");
	for (var i=0; i<all.length; i++) {
		if (all[i].getAttribute("btnAuth") != null) {
			var tmpBtnAuth = all[i].getAttribute("btnAuth");
			for (var j=0; j<type.length; j++) {
				if (tmpBtnAuth == tmpType[j]) {
					all[i].style.display = "";
				}
			}
		}
	}	
}

//LHK, 20141029 #44986 [BINEX]Office - All Option
function setOfficeAllOption(obj){

	var $selObj = $(obj);    
	var $optArray = $selObj.find('option');

	obj.value = UserOfcCd;
	
	if ($optArray && $optArray.length > 1 && ofcFlg == 'Y') {
		obj.value = '';
	}	

    $optArray.each(function() {
         var tempValue = $(this).val();
         if (tempValue == obj.value) {
        	 $(this).selected;         
         }
     });
}
//alert("111");
//parent.sSts = 'F';
</script>