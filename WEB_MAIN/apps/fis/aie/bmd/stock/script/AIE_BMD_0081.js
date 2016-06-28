

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var formObj  = document.form;
    switch(srcName) {
    	 
		case "UPLOAD":
			formObj.f_cmd.value = ADD;			
			
            //업로드 가능한 확장자인 경우
            
                if(confirm("파일을 등록하시겠습니까? ")){
                    doProcess = true;
                    //showProcess('WORKING', document);
                    formObj.action = "SND_POP.clt?_pgmId=MGT-STK-0011";
                    formObj.submit();
					
                }
            
       	break;
		       	
       	case "CLOSE":
       		window._childwin = false;
       		window.close();
       	break;

             
    }
}

/* val check*/
function checkAddModiVal(formObj){
        
    if(formObj.img_url.value == ""){
//    	alert("파일을 선택해 주십시요. ");
    	alert(getLabel('AIR_MSG_064'));
    	return false;
    }
    
    /*
    var isOk = checkFileExt(formObj.img_url.value, shipDocExt);	//파일 확장자 확인
    
    if(!isOk){
//    	alert('You can\'t upload unauthorized file!\n\nThe premitted file extension is ['+shipDocExt+']');
    	alert(getLabel('AIR_MSG_065') + ''['+shipDocExt+']'));
    }
    */

}


/* 파일 다운로드 */
function downloadFile(downType){
	frm2.docType.value = downType;
	frm2.target = 'ifrm1';
	frm2.submit();
}


function LoadPage(){
	
	var arg=window.dialogArguments;
	var formObj  = document.form;
		
}