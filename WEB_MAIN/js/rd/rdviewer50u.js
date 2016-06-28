	//각 서버정보에 맞게 수정해야 하는 부//var RDServer  = "/rfn [http://"+"211.52.110.122:8000"+"/RDServer/rdagent.jsp]";  //RDServer RDAgnet url
//var RDServer  = "/rfn [http://"+"211.52.110.76:8001"+"/RDServer/rdagent.jsp]";  //RDServer RDAgnet url  TEST
//var RDServer  = "/rfn [http://"+"116.127.225.132:8001"+"/RDServer/rdagent.jsp]";  //RDServer RDAgnet url sdkang
//var RDServer  = "/rfn [http://"+"217.92.189.190:8001"+"/RDServer/rdagent.jsp]";  //RDServer RDAgnet url , HAM
//var RDServer  = "/rfn [http://"+"113.37.92.130:8001"+"/RDServer/rdagent.jsp]";  //RDServer RDAgnet url , JAP
//var RDServer  = "/rfn [http://"+"116.127.223.209:8001"+"/RDServer/rdagent.jsp]";  //RDServer RDAgnet url , JAP

//var RDServer  = "/rfn [http://116.127.223.204:8080/DataServer/rdagent.jsp] ";  //RDServer RDAgnet url
/**********************************************************************************************************************************************************
 rreportopt [opt]
설명:
보고서 작성에 필요한 옵션을 적용하는 파라미터입니다. 각 옵션을 동시에 적용하고자 하는 경우에는 옵션값을 더해서 사용합니다.
opt
1  Crownix Report Designer 6.1.0.x 이상의 버전에서 저장된 보고서의 경우, 텍스트 상자나 표의 셀에 작성되는 공백 문단의 높이가 하위 버전과 다릅니다.
    6.1.0.x 이상의 버전에서 저장된 보고서 실행 시, 공백 문단의 높이를 Report Designer 5.0 버전의 방식으로 계산하도록 하는 옵션입니다.
    참고) 공백 문단 ? 문단과 문단 사이의 글자 없이 리턴 캐릭터만 있는 문단
2 헤더부가 없는 표의 첫 행이 페이지 영역을 벗어나도 다음 페이지로 넘어가지 않도록 하는 옵션입니다.(5.0.0.219 이하 버전처럼 동작)
4  CxImage 라이브러리를 사용하는 경우, 이미지의 로테이션 정보를 무시하도록 하는 옵션입니다.(6.2.1.x 이하 버전처럼 동작)
8 Report Designer 5.0 이하 버전에서 저장된 보고서 실행 시, 폰트 높이 계산을 5.0 버전처럼 하도록 하는 옵션입니다.(/rfonttype50 파라미터 기능과 동일)
예제:
/rreportopt [1]
/rreportopt [10]  // 옵션2와 8을 동시에 적용
***********************************************************************************************************************************************************/
/**********************************************************************************************************************************************************
rlobopt [1] : CCN 출력 버그 수정 옵션
   보고서의 주쿼리/서브쿼리에 CLOB/BLOB 필드가 있는 경우의 데이터 처리방식을 선택할 수 있는 파라미터 입니다.
	0 : 개선된 lob데이터 처리방식을 이용하여 보고서의 실행속도를 향상시킵니다.(기본값)
	1 : 기존 lob데이터 처리방식을 이용합니다.
	단, RDServer는 개선된 lob 데이터 처리방식을 지원하지 않기 때문에, RDServer를 이용해 lob 데이터 처리시에는 반드시 /rlobopt [1](기존 lob 데이터 처리 방식)을 사용해야합니다.
***********************************************************************************************************************************************************/
/**********************************************************************************************************************************************************
/rfonttype50 : RD 5 Version Font 적용 
***********************************************************************************************************************************************************/

/* Cloud 환경관련 김정훈 수석 제공 소스 */
var applicationContext = getApplicationContext();
var defaultContectRoot = "fms";		//Opus Forwarding 기본 Context Root
var host = location.host;//"116.127.223.227:7110";
var RDServer  = "";
if(applicationContext != defaultContectRoot ){	// Was[Tomcat]에 두개의 Context Root 포함 - http://서버IP:8001/RDServer/setup/setup1.jsp 에서 RD Service 설정     
	
	if(navigator.appName.indexOf("Microsoft") != -1) {
		RDServer = "/rfn [http://"+host+"/RDServer/rdagent.jsp]  /rsn [jdbc/"+applicationContext+"] /rfonttype50 /rlobopt [1] /rmmloverlapobj /rimgindexing /rmmlreportdone [2] ";  //RDServer RDAgnet url 
	}else{	
		RDServer = "/rfn [http://localhost:8001/RDServer/rdagent.jsp]  /rsn [jdbc/"+applicationContext+"] /rfonttype50 /rlobopt [1] /rmmloverlapobj /rimgindexing /rmmlreportdone [2] ";  //RDServer RDAgnet url 
	}
	
}else{
	if(navigator.appName.indexOf("Microsoft") != -1) {
		RDServer  = "/rfn [http://"+host+"/RDServer/rdagent.jsp]  /rsn [OPUS_FIS] /rfonttype50 /rlobopt [1] /rmmloverlapobj  /rimgindexing /rmmlreportdone [2] "; 
	}else{	
		RDServer  = "/rfn [http://localhost:8001/RDServer/rdagent.jsp]  /rsn [OPUS_FIS] /rfonttype50 /rlobopt [1] /rmmloverlapobj  /rimgindexing /rmmlreportdone [2] "; 
	}
}

function getApplicationContext(){
       var values = location.pathname.split("/");
       return values[1];
}

if(navigator.appName.indexOf("Microsoft") != -1) {
	var RD_path   = "http://"+location.host+"/"+applicationContext+"/apps/fis/rpt/mrd/";            // Report file 위치
}else{	
	var RD_path   = "http://localhost:8001/"+applicationContext+"/apps/fis/rpt/mrd/";            // Report file 위치
}

var URLX       = "http://"+location.host+"/"+applicationContext+"/rpt/rd/cab/" ;         // report 컴포넌트 다운로드 위치


var jars = URLX + "applet/javard.jar";
var jarpath = URLX + "applet/lib/";

var _os  = navigator.userAgent;  
var _app = navigator.appName;

//alert("_os : " + _os);
//alert("_app : " + _app);

//var parmModalObj = window.dialogArguments;                 // modal 로 넘겨준 param 정보
var parmModalObj;

if (parent.parmObj != undefined) {
	parmModalObj = parent.parmObj
} else {
	parmModalObj = window.dialogArguments;
}

function checkPluginVersion(versionInstalled, versionSetup)  {

	var arr_versionInstalled = versionInstalled.split(",");
	var arr_versionSetup = versionSetup.split(",");
	
	for(i=0; i<=3; i++) {

		if(Number(arr_versionInstalled[i]) > Number(arr_versionSetup[i])) {  // do not install
			return 1;
			break;
		} else if(Number(arr_versionInstalled[i]) < Number(arr_versionSetup[i])) { // install
			return 0;
			break;
		}
	}
	return 1;
}


function comRdObject(id){
	if(_os.indexOf("Linux") != -1 || _os.indexOf("Macintosh") != -1 ) {  
/*		document.write('<object id="' + id + '" type="application/x-java-applet" style="width:100%; height:1000px;" >');
		document.write('<param name="codebase" value="javard.jar" >');
		document.write('<param name="archive"  value="'+ jars + '" >');
		document.write('<param name="code"     value="m2soft.javard.gui.RDApplet" >');
		document.write('<param name="Java_archive" value="'+ jars + '" />');
		document.write('<param name="jar_path" value="'+ jarpath + '" />');
		document.write('<param name="separate_jvm" value="true" />');
		document.write('<param name="mrd.charset" value="MS949" />');
		document.write('<param name="txt.charset" value="MS949" />');
		document.write('<param name="locale" value="en_US" />');
		document.write('<param name="java_arguments" value="-Xmx1000m" />');
		document.write('Your browser needs <a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html">Java SE</a> to view projects.');
		document.write('</object>');*/
	} else {
		if (_os.indexOf("MSIE") != -1 || _os.indexOf("Trident") != -1) {
						
			if(navigator.appName.indexOf("Microsoft") != -1 && navigator.appVersion.indexOf("x64") != -1) {
				//alert("64bit");
				document.write('<OBJECT id="'+ id + '"');
				document.write('  classid="clsid:04931AA4-5D13-442f-AEE8-0F1184002BDD"');
				document.write('  codebase="'+ URLX + 'cxviewer60u.cab#version=6,3,4,238"');
				document.write('   width=100% height=1000px>');
				document.write(' <param name="Visible" value="false"> ');
				document.write(' <param name="UseUTF8" value="true"> ');
				document.write(' <param name="AutoSizeMode" value="true"> ');
				document.write('</OBJECT>');
			}else{
				//alert("32bit"); 
				document.write('<OBJECT id="'+ id + '"');
				document.write('  classid="clsid:04931AA4-5D13-442f-AEE8-0F1184002BDD"');
				document.write('  codebase="'+ URLX + 'cxviewer60u.cab#version=6,3,4,238"');
				document.write('   width=100% height=100%>');
//				document.write(' <param name="Visible" value="false"> ');
//				document.write(' <param name="UseUTF8" value="true"> ');
//				document.write(' <param name="AutoSizeMode" value="true"> ');
				document.write('</OBJECT>');
			}
		} else {
			/* HTML5로 변경됨 
			navigator.plugins.refresh(false);
			if(navigator.mimeTypes["application/x-cxviewer60u"]) {
				var _cxPlugin = navigator.mimeTypes["application/x-cxviewer60u"];
				var cxPluginVersion_installed = _cxPlugin.description.substr(_cxPlugin.description.indexOf("version=")+8, 9);
				var cxPluginVersion_setup = "6,3,4,238";

				if(checkPluginVersion(cxPluginVersion_installed, cxPluginVersion_setup)) {
					document.write('<EMBED id="' + id + '" type="application/x-cxviewer60u" width=100%" height=100% ></EMBED>');
				} else {
					window.location = URL + "CX60_Plugin_u_setup.exe";
				}
			} else {
				window.location = URL + "CX60_Plugin_u_setup.exe";
			}
			*/
		}
	}

/*
document.write('<OBJECT id="'+ id + '"');
document.write('  classid="clsid:04931AA4-5D13-442f-AEE8-0F1184002BDD"');
document.write('  codebase="'+ URL + '/cxviewer60u.cab#version=6,3,3,230"');
document.write('   width="100%" height="100%">');.
document.write(' <param name="Visible" value="false"> ');
document.write(' <param name="UseUTF8" value="true"> ');
document.write(' <param name="AutoSizeMode" value="true"> ');
document.write('</OBJECT>');
*/

setrdObject(eval("document.all."+id));

}

function setrdObject(rd_obj){
	   rdObjects[rdCnt++] = rd_obj;
}

function comRdObjectPopup(id){
	if(_os.indexOf("Linux") != -1 || _os.indexOf("Macintosh") != -1 ) {  
		
/*		
		document.write('<object id="' + id + '" type="application/x-java-applet" style="position: absolute; width:100%; height:100%;" >');
		document.write('<param name="codebase" value="javard.jar" >');
		document.write('<param name="archive"  value="'+ jars + '" >');
		document.write('<param name="code"     value="m2soft.javard.gui.RDApplet" >');
		document.write('<param name="Java_archive" value="'+ jars + '" />');
		document.write('<param name="jar_path" value="'+ jarpath + '" />');
		document.write('<param name="separate_jvm" value="true" />');
		document.write('<param name="mrd.charset" value="MS949" />');
		document.write('<param name="txt.charset" value="MS949" />');
		document.write('<param name="locale" value="en_US" />');
		document.write('<param name="java_arguments" value="-Xmx1000m" />');
		document.write('Your browser needs <a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html">Java SE</a> to view projects.');
		document.write('</object>');*/
		
		} else {
			if (_os.indexOf("MSIE") != -1 || _os.indexOf("Trident") != -1) {
				if(navigator.appName.indexOf("Microsoft") != -1 && navigator.appVersion.indexOf("x64") != -1) {
					//alert("64bit");
					document.write('<OBJECT id="'+ id + '"');
					document.write('  classid="clsid:04931AA4-5D13-442f-AEE8-0F1184002BDD"');
					document.write('  codebase="'+ URLX + 'cxviewer60u.cab#version=6,3,4,238"');
					document.write('   width=1000px height=1000px>');
					document.write('</OBJECT>');
				}else{
					//alert("32bit");
					document.write('<OBJECT id="'+ id + '"');
					document.write('  classid="clsid:04931AA4-5D13-442f-AEE8-0F1184002BDD"');
					document.write('  codebase="'+ URLX + 'cxviewer60u.cab#version=6,3,4,238"');
					document.write('   width=1000px height=1000px>');
					document.write('</OBJECT>');
				}
			} else {
				/*
				navigator.plugins.refresh(false);
				if(navigator.mimeTypes["application/x-cxviewer60u"]) {
					var _cxPlugin = navigator.mimeTypes["application/x-cxviewer60u"];
					var cxPluginVersion_installed = _cxPlugin.description.substr(_cxPlugin.description.indexOf("version=")+8, 9);
					var cxPluginVersion_setup = "6,3,4,238";

					if(checkPluginVersion(cxPluginVersion_installed, cxPluginVersion_setup)) {
						document.write('<EMBED id="' + id + '" type="application/x-cxviewer60u" width=1000px" height=1000px></EMBED>');
					} else {
						window.location = URL + "CX60_Plugin_u_setup.exe";
					}
				} else {
					window.location = URL + "CX60_Plugin_u_setup.exe";
				}
				*/
			}
		}

/*
document.write('<OBJECT id="'+ id + '"');
document.write('  classid="clsid:04931AA4-5D13-442f-AEE8-0F1184002BDD"');
document.write('  codebase="'+ URL + '/cxviewer60u.cab#version=6,3,3,230"');
document.write('   width="100%" height="100%">');
document.write('</OBJECT>');
*/
}

function comchartdirObject(){
document.write('<object ');
document.write('   width=0%');
document.write('   height=0%');
document.write('   classid="clsid:CDE2DAD1-7132-41A9-A998-844AD7BDAC58"');
document.write('  codebase="' + URLX + '/chartdir50.cab#version=5,0,3,0">');
document.write('</object>');
}

function comRdpdfObject(){
document.write('<object');
document.write('   id=rdpdf50');
document.write('   classid="clsid:0D0862D3-F678-48B5-876B-456457E668BC"');
document.write('   width=0%');
document.write('   height=0%');
document.write('   codebase="' + URLX + '/rdpdf50.cab#version=2,2,0,82">');
document.write('</OBJECT>');
}

function comRdbarcodeObject(){
document.write('<object');
document.write('   id=rdbarcode10');
document.write('   classid="clsid:C1829AD9-98E1-4050-A3E5-B7B089C6FFFA"');
document.write('   width=0%');
document.write('   height=0%');
document.write('   codebase="' + URLX + '/rdbarcode10.cab#version=10,2,6,13785">');
document.write(' </object>');
}

// 폼태그의 모든 컨트롤 데이타를 name[value] 포맷으로 가져오기
function RD_FormQueryString(form , no ) {
  if (typeof form != "object" || form.tagName != "FORM") {
	alert("FormQueryString함수의 인자는 FORM 태그가 아닙니다.");
	return "";
  }

  	var name = new Array(form.elements.length);
	var value = new Array(form.elements.length);
	var j = 0;
	var plain_text="";

	//사용가능한 컨트롤을 배열로 생성한다.
	len = form.elements.length;
	for (i = 0; i < len; i++) {
	  //클래스 아이디로 제품을 구분함-아래는 HTMl제품
	  if(form.elements[i].classid==undefined){

	  switch (form.elements[i].type) {
		case "button":
		case "reset":
		case "submit":
		  break;
		case "radio":
		case "checkbox":
					if (form.elements[i].checked == true) {
						name[j] = form.elements[i].name;
						value[j] = form.elements[i].value;
						j++;
					}
					break;
			case "select-one":
					name[j] = form.elements[i].name;
					var ind = form.elements[i].selectedIndex;
					if(ind >= 0) {
						if (form.elements[i].options[ind].value != '')
							value[j] = form.elements[i].options[ind].value;
						else
							value[j] = '';
					} else {
						value[j] = "";
					}
					j++;
					break;
			case "select-multiple":
					name[j] = form.elements[i].name;
					var llen = form.elements[i].length;
					var increased = 0;
					for( k = 0; k < llen; k++) {
						if (form.elements[i].options[k].selected) {
							name[j] = form.elements[i].name;
							if (form.elements[i].options[k].value != '')
								value[j] = form.elements[i].options[k].value;
							else
								value[j] = '';
							j++;
							increased++;
						}
					}
					if(increased > 0) {
						j--;
					} else {
						value[j] = "";
					}
					j++;
					break;
				default :
					name[j] = form.elements[i].name;
					value[j] = form.elements[i].value;
					j++;
		}
	//IB에서 제공하는 컨트롤의 값을 조합한다.
	}else{
	  switch(form.elements[i].classid){
		case "CLSID:BFED6FBB-30E3-4402-B5D6-C31F40B56A0E":  // IBMaskEdit 경우
		  name[j] = form.elements[i].name==""?form.elements[i].id:form.elements[i].name;
				value[j] = form.elements[i].Value;
				j++;
		  break;
		case "CLSID:0B0683AE-1FB7-438f-AA3C-087E11C8AE2D": // IBMultiCombo 경우
		  name[j] = form.elements[i].name==""?form.elements[i].id:form.elements[i].name;
				value[j] = form.elements[i].Code;
				j++;
				break;
	  }
	}
	}

	 //QueryString을 조합한다.
	for (i = 0; i < j; i++) {
		 if (name[i] != '') plain_text += "frm" + no + "_" + name[i]+ "[" + value[i] + "] ";
	}

  //마지막에 &를 없애기 위함
  if (plain_text != "")
	plain_text = plain_text.substr(0, plain_text.length -1);
	return plain_text;
}


// Sheet 에서 xml data 가져오기
function RD_GetDataSearchXml(sheet_obj,no)  {

  //함수 인자 유효성 확인
  if (typeof sheet_obj != "object") {
	alert("Data2SearchXml 함수의 sheet_obj 인자는 IBSheet가 아닙니다.");
	return "";
  }

  var rowXml = "";
  var allXml = "<SHEET" + no + ">  <DATA TOTAL='"+ sheet_obj.GetTotalRows() +"'>";

  var rowcount = sheet_obj.RowCount() + sheet_obj.HeaderRows() - 1;
  for (ir = sheet_obj.HeaderRows(); ir <= rowcount; ir++) {

	rowXml = "<TR>";
	for (ic = 0; ic<= sheet_obj.LastCol(); ic++) {

	  rowXml += "<TD><![CDATA[" + sheet_obj.GetCellValue(ir,ic) + "]]></TD>";
	}
	rowXml += "</TR>";

	allXml += rowXml;
  }

  allXml += "  </DATA></SHEET" + no + ">";

  return allXml;
}

function setrdObject
(rd_obj){
   rdObjects[rdCnt++] = rd_obj;
}

 /**
  * Report 모달창을 화면의 중앙에 활성화 한다.
  */
 function rdObjModal(sURL,parmObj,sWidth,sHeight) {
 // preSet
  parmObj['FORM'] = document.form;
	 sWidth=800;
	 sHeight=700;
  var height = screen.height;
  var width = screen.width;
	 var leftpos = width/2 - sWidth/2;
  var toppos = height/2 - sHeight/2;

  if(leftpos<0) leftpos=0;

	 if(toppos<0) toppos=0;

  var sFeatures = new Array();

  sFeatures[0] = (sWidth > 0)? "dialogWidth:"+sWidth+"px":"dialgWidth:300px";
  sFeatures[1] = (sHeight > 0)? "dialogHeight:"+sHeight+"px":"dialogHeight:300px";
  sFeatures[2] = (toppos > 0)? "dialogTop:"+toppos+"px":"";
  sFeatures[3] = (leftpos > 0)? "dialogLeft:"+leftpos+"px":"";
  sFeatures[4] = (!toppos && !leftpos)? "center:Yes":"";
  sFeatures[5] = "resizeable:No";
  sFeatures[6] = "help:No";
  sFeatures[7] = "status:No";
  sFeatures[8] = "center:Yes;";

  if (_os.indexOf("MSIE") != -1 || _os.indexOf("Trident") != -1) {
	  window.showModelessDialog(sURL, parmObj, sFeatures);
  }else{
	  _CallPopUp(sURL, parmObj, sFeatures);
  }
  
//window.showModelessDialog(sURL,parmObj,sFeatures);
//  _CallPopUp(sURL, parmObj, sFeatures);
  
 }


 /**
  * Report modaless창을 화면의 중앙에 활성화 한다.
  */
 function rdObjModaless(sURL,parmObj,sWidth,sHeight) {
	 sWidth=800;
	 sHeight=700;
 // preSet
  parmObj['FORM'] = document.form;

  var height = screen.height;
  var width = screen.width;
  var leftpos = width/2 - sWidth/2;
  var toppos = height/2 - sHeight/2;

  if(leftpos<0) leftpos=0;

	 if(toppos<0) toppos=0;

  var sFeatures = new Array();

  sFeatures[0] = (sWidth > 0)? "dialogWidth:"+sWidth+"px":"dialgWidth:300px";
  sFeatures[1] = (sHeight > 0)? "dialogHeight:"+sHeight+"px":"dialogHeight:300px";
  sFeatures[2] = (toppos > 0)? "dialogTop:"+toppos+"px":"";
  sFeatures[3] = (leftpos > 0)? "dialogLeft:"+leftpos+"px":"";
  sFeatures[4] = (!toppos && !leftpos)? "center:Yes":"";
  sFeatures[5] = "resizeable:No";
  sFeatures[6] = "help:No";
  sFeatures[7] = "status:No";
  sFeatures[8] = "center:Yes;";

  sFeatures = sFeatures.join(";");

  if (_os.indexOf("MSIE") != -1 || _os.indexOf("Trident") != -1) {
	  window.showModelessDialog(sURL, parmObj, sFeatures);
  }else{
	  _CallPopUp(sURL, parmObj, sFeatures);
  }
  
//window.showModelessDialog(sURL,parmObj,sFeatures);
//  _CallPopUp(sURL, parmObj, sFeatures);
  
 }