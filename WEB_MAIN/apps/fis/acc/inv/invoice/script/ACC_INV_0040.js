var FROMDATE;
var TODAY;
var ENDDATE;
var PREDATE;
var NXTDATE;
var SLIP_POST_DT="";
var ORG_BLOCK_POST_DT=""; //MAX(BLOCK_DT)
var BLOCK_POST_DT="";    // MAX(BLOCK_DT)+1
var G_GL_DATA_CREATE_STATUS = "END";

var ACC_VAT_VAL = "1";
var ACC_WHD_VAL = "1";

var FIRST_SEARCH_YN = "N";

var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
	   case "SEARCHLIST01":
		   formObj.f_cmd.value=SEARCHLIST01;
           formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
           formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
           //클릭시 셋팅되는 키값들을 초기화한다.
           //formObj.s_oth_seq.value = "";
           formObj.f_inv_seq.value="";
           formObj.f_oth_seq.value="";
           formObj.f_trdp_cd.value="";
           docObjects[0].DoSearch("./ACC_INV_0040GS.clt", FormQueryString(formObj) );
      break;
	  case "NEW":
		  var inv_tp=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "inv_tp");
		    if(inv_tp == "A/R"){
		    	var paramStr="./ACC_INV_0010.clt?f_cmd=-1";
		        parent.mkNewFrame('A/R Entry', paramStr);
		    }else if(inv_tp == "DB/CR"){
		    	var paramStr="./ACC_INV_0020.clt?f_cmd=-1";
		        parent.mkNewFrame('DC Note Entry', paramStr);
		    }else if(inv_tp == "A/P"){
		    	var paramStr="./ACC_INV_0030.clt?f_cmd=-1";
		        parent.mkNewFrame('A/P Entry(Cost)', paramStr);
		    }
	  break;     
       case "SEARCHLIST":
		    if(!chkSearchCmprPrd(false, frm1.s_post_strdt, frm1.s_post_enddt)){
				return;
			}
		    if(!chkSearchCmprPrd(false, frm1.s_inv_strdt, frm1.s_inv_enddt)){
				return;
			}
            formObj.f_cmd.value=SEARCHLIST;
            formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
            formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
            //클릭시 셋팅되는 키값들을 초기화한다.
            //formObj.s_oth_seq.value = "";
            formObj.f_inv_seq.value="";
            formObj.f_oth_seq.value="";
            formObj.f_trdp_cd.value="";
            if(!validationForm()){
         	   return;
            }
            sheetObj2.RemoveAll();
            docObjects[0].DoSearch("./ACC_INV_0040GS.clt", FormQueryString(formObj) );
       break;
       case "ROWADD":
    	   var intRows=sheetObj.LastRow()+1;
            sheetObj.DataInsert(intRows);
       break;
       case "MODIFY":	//수정
    	    
     	   // 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
    	   var ref_ofc_cd = "";
    	   for(var i=2; i<=sheetObj.LastRow();i++){
			   if(sheetObj.GetCellValue(i ,"check_flag") == "1"){
				   ref_ofc_cd = sheetObj.GetCellValue(i, "ref_ofc_cd");
			   }
		   } 

			var btnflag = "Y"; 
			if (efc_flg == "N"){  
				btnflag = "N";
				alert(getLabel('FMS_COM_ALT083'));
				return;				
			} 
			
			if (btnflag == "Y"){ 
				if (edoa_flg == "N"){
					if (ofc_cd != ref_ofc_cd){  
						btnflag = "N";
					}
				}  
				if (btnflag == "Y"){ 
				}else{
					alert(getLabel('FMS_COM_ALT083'));
					return;
				}
			}

			//#26602 Delete Button Disappear
		    for(var i=2; i<=sheetObj.LastRow();i++){
		    	if(sheetObj.GetCellValue(i ,"check_flag") == "1"){
		     	   	if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y" || Number(sheetObj.GetCellValue(i, "pay_amt")) > 0 || sheetObj.GetCellValue(i, "cmb_inv_seq") == "Y"){
		     	   		alert(getLabel('ACC_MSG143'));
		     	   		return;
		     	   	}
		    	}
		    }
		   frm1.f_cmd.value=MODIFY;
		   var chk_cnt=0;
		   for(var i=2; i<=sheetObj.LastRow();i++){
			   	if(sheetObj.GetCellValue(i ,"check_flag") == "1"){
				   chk_cnt += 1;
			   }
		   }
		   if(chk_cnt == 0){
			   //No Save Data!!
			   alert(getLabel('FMS_COM_ALT007'));
			   return;
		   }
           if(confirm(getLabel('FMS_COM_CFMSAV'))){
        	   formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
               formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
        	   sheetObj.DoSave("./ACC_INV_0040GS.clt", FormQueryString(formObj),"ibflag",false);
           }
           break;
       case "DELETE":	//삭제
    	   
     	   // 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
    	   var ref_ofc_cd = "";
    	   for(var i=2; i<=sheetObj.LastRow();i++){
			   if(sheetObj.GetCellValue(i ,"check_flag") == "1"){
				   ref_ofc_cd = sheetObj.GetCellValue(i, "ref_ofc_cd");
			   }
		   } 
 	 		 
			var btnflag = "Y"; 
			if (efc_flg == "N"){  
				btnflag = "N";
				alert(getLabel('FMS_COM_ALT084'));
				return;				
			} 
			
			if (btnflag == "Y"){ 
				if (edoa_flg == "N"){
					if (ofc_cd != ref_ofc_cd){  
						btnflag = "N";
					}
				}  
				if (btnflag == "Y"){ 
				}else{
					alert(getLabel('FMS_COM_ALT084'));
					return;
				}
			}
			
    	   //#26602 Delete Button Disappear
    	   var sRow=sheetObj.GetSelectRow();
    	   if(sheetObj.GetCellValue(sRow, "clt_cmpl_flg") == "Y" || Number(sheetObj.GetCellValue(sRow, "pay_amt")) > 0 || sheetObj.GetCellValue(sRow, "cmb_inv_seq") == "Y"){
    		   alert(getLabel('ACC_MSG142'));
    		   return;
    	   }
    	   frm1.f_cmd.value=REMOVE;
    	   var chk_cnt=0;
		   for(var i=2; i<=sheetObj.LastRow();i++){
			   if(sheetObj.GetCellValue(i ,"check_flag") == "1"){
				   chk_cnt += 1;
			   }
		   }
		   if(chk_cnt == 0){
			   //No Delete Data!!
			   alert(getLabel('FMS_COM_ALT007'));
			   return;
		   }
           if(confirm(getLabel('FMS_COM_CFMDEL'))){
        	   formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
               formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
        	   sheetObj.DoSave("./ACC_INV_0040GS.clt", FormQueryString(formObj),"ibflag",false);
           }
       break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_bill_to_nm.value;
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "CUSTOMER_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	        
  	        
     	break;
        case "GOLOCAL":	//LOCAL INVOICE 화면호출        	
        	goInvoiceEntry("AR");        	
        break;
        case "GOCRDB":	//CR/DB Note 화면호출        	
        	goInvoiceEntry("DC");        	
        break;
        case "GOAP":	//Account Payable 화면호출        	
        	goInvoiceEntry("AP");        	
        break;
        case "DEPOSIT":	//DEPOSIT 대상 화면호출
        	var sRow=sheetObj.GetSelectRow();
        	var inv_no=escape(sheetObj.GetCellValue(sRow, "inv_no"));
        	var paramStr="./ACC_JOR_0010.clt?f_cmd=-1&s_inv_no="+inv_no+"&s_cust_cd="+sheetObj.GetCellValue(sRow, "trdp_cd")+"&s_inv_tp="+sheetObj.GetCellValue(sRow, "inv_tp");
            parent.mkNewFrame('Customer Payment', paramStr);
        break;
        case "CHECK":	//CHECK 대상 화면호출
        	var sRow=sheetObj.GetSelectRow();
        	//VENDER INVOICE에  "#" 이 들어갈 경우 값이 잘리기때문에 치환한다.
        	var inv_no = "";
        	if (sheetObj.GetCellValue(sRow, "inv_tp") == "A/P"){
        		inv_no = escape(sheetObj.GetCellValue(sRow, "vnd_inv_no"));
        	} else {
        		inv_no = escape(sheetObj.GetCellValue(sRow, "inv_no"));
        	}
        	var paramStr="./ACC_JOR_0030.clt?f_cmd=-1&s_inv_no="+inv_no+"&s_cust_cd="+sheetObj.GetCellValue(sRow, "trdp_cd")+"&s_inv_tp="+sheetObj.GetCellValue(sRow, "inv_tp");
        	parent.mkNewFrame('Payment', paramStr);
        break;
        case "DEPOSIT_RT":	//DEPOSIT 생성된 화면호출
        	var sRow=sheetObj.GetSelectRow();
        	var paramStr="./ACC_JOR_0010.clt?f_cmd=-1&s_jnr_no="+sheetObj.GetCellValue(sRow, "jnr_no");
            parent.mkNewFrame('Customer Payment', paramStr);
        break;
        case "CHECK_RT":	//DEPOSIT 생성된 화면호출
        	var sRow=sheetObj.GetSelectRow();
        	var paramStr="./ACC_JOR_0030.clt?f_cmd=-1&s_jnr_no="+sheetObj.GetCellValue(sRow, "jnr_no");
            parent.mkNewFrame('Payment', paramStr);
        break;
        case "PRINT":
            var param = "";
        	if(formObj.f_inv_seq.value != ""){
				if(formObj.f_print_type.value == "A/R"){
					//WMS ACCOUNT LKH 2015.01.20
					if(formObj.f_oth_seq.value != "" || formObj.f_wms_seq.value != ""){
						/*if(formObj.f_bl_cnt_cd.value == "US" || formObj.f_bl_cnt_cd.value == "CA" || formObj.f_bl_cnt_cd.value == "DE"){
		        			formObj.file_name.value = 'invoice_06.mrd';	  
		            	}else if(formObj.f_bl_cnt_cd.value == "IT"){
		            		formObj.file_name.value = 'invoice_09.mrd';
		            	}else if(formObj.f_bl_cnt_cd.value == "JP"){
		            		formObj.file_name.value = 'invoice_08_jp.mrd';
		            	}else{
		            		if(formObj.f_ref_ofc_cd.value == "SEL"){
		            			formObj.file_name.value = 'invoice_08_kr.mrd';
		            		}else{
		            			formObj.file_name.value = 'invoice_08.mrd';
		            		}
		            		
		            	}*/
						formObj.file_name.value = 'invoice_06.mrd';	  
					}else{
						/*if(formObj.f_bl_cnt_cd.value == "US" || formObj.f_bl_cnt_cd.value == "CA" || formObj.f_bl_cnt_cd.value == "DE"){
							
		        			formObj.file_name.value = 'invoice_01.mrd';
							formObj.title.value = 'Local Invoice';
			        	}else if(formObj.f_bl_cnt_cd.value == "IT"){
							formObj.file_name.value = 'invoice_04.mrd';
							formObj.title.value = 'Local Invoice';
			        	}else if(formObj.f_bl_cnt_cd.value == "JP"){
							formObj.file_name.value = 'invoice_03_jp.mrd';
							formObj.title.value = 'Local Invoice';
			        	}else{
			        		if(formObj.f_ref_ofc_cd.value == "SEL"){
		            			formObj.file_name.value = 'invoice_03_kr.mrd';
		            		}else{
		            			formObj.file_name.value = 'invoice_03.mrd';
		            		}
							formObj.title.value = 'Local Invoice';
			        	}*/
						formObj.file_name.value = 'invoice_01.mrd';
						formObj.title.value = 'Local Invoice';
					}
					formObj.mailTitle.value = "INVOICE [INVOICE No. " + formObj.f_inv_no.value + "]";
					formObj.rpt_biz_tp.value = "ACCT";
					formObj.rpt_biz_sub_tp.value = "AR";
					
				}else if(formObj.f_print_type.value == "DB/CR"){
					
					if(formObj.f_oth_seq.value != ""){
		        		/*if(formObj.f_cnt_cd.value == "IT"){
		            		formObj.file_name.value = 'invoice_10.mrd';
		            	}
		        		else if(formObj.f_cnt_cd.value == "US" || formObj.f_cnt_cd.value == "CA" || formObj.f_cnt_cd.value == "DE"){
		            		formObj.file_name.value = 'invoice_07_us.mrd';	
		            	}
		        		else{
		            		formObj.file_name.value = 'invoice_07.mrd';
		            	}*/
						formObj.file_name.value = 'invoice_07_us.mrd';	
		        	}else{
						/*if(formObj.f_bl_cnt_cd.value == "IT"){
							formObj.file_name.value = 'invoice_05.mrd';
						}else if(formObj.f_bl_cnt_cd.value == "US" || formObj.f_bl_cnt_cd.value == "CA" || formObj.f_bl_cnt_cd.value == "DE"){
		        			formObj.file_name.value = 'invoice_02_us.mrd';
						}else{
							formObj.file_name.value = 'invoice_02.mrd';
						}*/
		        		formObj.file_name.value = 'invoice_02_us.mrd';
		        	}
					
					formObj.title.value = 'Debit/Credit Note';
					formObj.mailTitle.value='Debit/Credit Note No : ' + formObj.f_inv_no.value;
					formObj.rpt_biz_tp.value = "ACCT";
					formObj.rpt_biz_sub_tp.value = "DC";
					
				}else if(formObj.f_print_type.value == "A/P"){
 					
					formObj.file_name.value = 'invoice_13.mrd';
					formObj.title.value = 'PAYMENT REQUEST';
					formObj.mailTitle.value = "INVOICE [INVOICE No. " + formObj.f_inv_no.value + "]";
					formObj.rpt_biz_tp.value = "ACCT";
					formObj.rpt_biz_sub_tp.value = "AP";
				}
				
				formObj.rpt_trdp_cd.value = formObj.f_trdp_cd.value;
				
				if(formObj.f_print_type.value == "A/P"){
    				//Parameter Setting
    	      		param = "[" + "'" + formObj.f_inv_seq.value + "'" + ']';		// [1]
    				param += '[' + formObj.f_trdp_cd.value + ']';					// Vendor [2]
    				param += '[' + formObj.f_ref_ofc_cd.value + ']';				// REF_OFC_CD [3]
    				param += '[' + formObj.f_bl_cnt_cd.value + ']';					// CNT_CD  [4]
    				param += '[' + formObj.f_usr_nm.value + ']';					// USER_NM [5]
    				param += '[' + formObj.f_email.value + ']';						// USER EMAIL [6]
    				param += '[' + formObj.f_usrPhn.value + ']';					// 7
    				param += '[' + formObj.f_usrFax.value + ']';					// 8
    				param += '[' + formObj.f_usr_nm.value + ']';						// 9
    			}else{
    				param  = '[' + formObj.f_email.value + ']';				// USER EMAIL';	[1]
					param += "[" + "'" + formObj.f_inv_seq.value + "'" + ']';			// [2]
					param += '[]';											// [3]
					param += '[]';											// [4]
					param += '[]';											// [5]
					param += '[]';											// [6]	
    				if(formObj.f_print_type.value == "DB/CR"){
    					param += '[' + formObj.f_trdp_cd.value + ']';				// TRDP_CD [7]
    					param += '[' + formObj.f_ref_ofc_cd.value + ']';			// OFC_CD  [8]
    				}else if(formObj.f_print_type.value == "A/R"){
    					param += '[' + formObj.f_trdp_cd.value + ']';				// TRDP_CD [7]
    					param += '[' + formObj.f_ref_ofc_cd.value + ']';			// OFC_CD  [8]
    					param += '[' + formObj.f_bl_cnt_cd.value + ']';				// CNT_CD  [9]
    					param += '[' + formObj.f_usr_nm.value + ']';				// USER_NM [10]
    				}
    				

    				param += '[' + formObj.f_usrPhn.value + ']';				// 9,  11
    				param += '[' + formObj.f_usrFax.value + ']';				// 10, 12
    				param += '[' + formObj.f_usrId.value + ']';					// 11, 13
    				param += '[]';// param += '[' + formObj.main_trdp.value + ']';				// 12, 14
    				if(formObj.f_print_type.value == "DB/CR"){
	    				param += '[' + formObj.f_ofc_loc_nm.value + ']';		//13  cr_db
    					param += '[]';
    					param += '[]';
    				}
    			}
				
				formObj.rpt_pdf_file_nm.value=getPdfFileNm();
    			formObj.rd_param.value = param;
    			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
        	}else {
        		//Please select the row to print.
        		alert(getLabel('FMS_COM_ALT004'));
        		
        		return;
        	}
        break;
        case "BATCHPRINT":
    		var inv_seq=formObj.f_inv_seq.value;
    		var inv_no=formObj.f_inv_no.value;
			var print_type=formObj.f_print_type.value;
			var bl_cnt_cd=formObj.f_bl_cnt_cd.value;
			var ref_ofc_cd=formObj.f_ref_ofc_cd.value;
			var oth_seq=formObj.f_oth_seq.value;
			var trdp_cd=formObj.f_trdp_cd.value;
			var reqParam='?f_inv_no='+ inv_no+'&f_print_type=' + print_type + '&f_inv_seq=' + inv_seq + '&f_bl_cnt_cd=' + bl_cnt_cd + '&f_ref_ofc_cd=' + ref_ofc_cd+ '&f_oth_seq=' + oth_seq + '&f_trdp_cd='+ trdp_cd;
			popGET('ACC_INV_0051.clt'+reqParam, '', 550, 260, "scroll:yes;status:no;help:no;");
			
        break;
        case "HISTORY":
	   		rtnary=new Array(1);
	   		rtnary[0]=formObj.f_inv_seq.value;
	   		callBackFunc = "HISTORY";
	        modal_center_open('./ACC_INV_0100.clt', rtnary, 862,457,"yes");
     	break;
        case "EXCEL":
        	if(sheetObj.RowCount() < 1){//no data	
    			ComShowCodeMessage("COM132501");
    		}else{
    			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
    		}
        break;
        case "EXCEL_ALL":
        	excelDown(sheetObj);
        break;
        case "INV_HIS":
			var sRow=sheetObj.GetSelectRow();
			if (sRow < 0){
				break;
			}
			var reqParam='?inv_seq=' + sheetObj.GetCellValue(sRow, "inv_seq");
			reqParam += '&inv_tp=' + sheetObj.GetCellValue(sRow, "inv_tp");
        	popGET('ACC_INV_0110.clt'+reqParam, '', 1110, 630, "scroll:yes;status:no;help:no;");
        break;
        case 'SLIP':
        	if(G_GL_DATA_CREATE_STATUS == "END"){
        		G_GL_DATA_CREATE_STATUS ="START";
        		setGlDataCreate('');
        	} 
        	return;
        break;
        case "GL_CREATE_END_ACTION":
        	var sRow=sheetObj.GetSelectRow();
        	formObj.title.value='Accounting Slip';
        	var inv_seq=sheetObj.GetCellValue(sRow, "inv_seq");
    		var source=sheetObj.GetCellValue(sRow, "inv_tp");
    		var srcNo=sheetObj.GetCellValue(sRow, "inv_no");
    		var refNo=sheetObj.GetCellValue(sRow, "ref_no");
    		var blNo=sheetObj.GetCellValue(sRow, "hbl_no");
        	if(source == "A/R"){
        		source="Local Invoice";
        		//formObj.file_name.value = 'account_slip_01.mrd';
        	}else if(source == "DB/CR"){
        		source="D/C";
        		//formObj.file_name.value = 'account_slip_02.mrd';
        	}else if(source == "A/P"){
        		source="Account Payable";
        		//formObj.file_name.value = 'account_slip_03.mrd';
        	}
        	//LHK 20140219 01로 통합
    		formObj.file_name.value='account_slip_01.mrd';
			//Parameter Setting
        	var param="[" + "'" + inv_seq + "'" + ']';				// [1]
			param += '[' + source + ']';								// [2]
			param += '[' + srcNo + ']';									// [3]
			param += '[' + refNo + ']';									// [4]
			param += '[' + blNo + ']';									// [5]
			param += '[' + formObj.ofc_nm.value + ']';					// [6]
			param += '[' + formObj.user_id.value + ']';					// [7]
			param += '[' + formObj.ofc_cd.value + ']';					// [8]
			formObj.rd_param.value=param;
			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		break;
		/* #22118 : [BINEX]AR/AP List 에 Profit Report 버튼 추가 jsjang 2013.11.6 */
		case "PROFIT_REPORT":
	   	 	if(sheetObj.RowCount()== 0){
	   	 		//There is no data
				alert(getLabel('FMS_COM_ALT004'));	
			}else{ 
				var sRow=sheetObj.GetSelectRow();
				//WMS ACCOUNT LKH 2015.01.20
				if(sheetObj.GetCellValue(sRow, "oth_ref_no") != "" || sheetObj.GetCellValue(sRow, "wms_ref_no") != "")
				{
					var reqParam='';
					if(sheetObj.GetCellValue(sRow, "oth_ref_no") != "")
					{
						reqParam='?oth_seq=' + sheetObj.GetCellValue(sRow, "oth_seq");
						reqParam += '&ref_no=' + sheetObj.GetCellValue(sRow, "oth_ref_no");
						reqParam += '&air_sea_clss_cd=' + "O";
						reqParam += '&bnd_clss_cd=' + "N";
						reqParam += '&biz_clss_cd=' + "";
					}else{
						reqParam='?oth_seq=' + sheetObj.GetCellValue(sRow, "wms_seq");
						reqParam += '&ref_no=' + sheetObj.GetCellValue(sRow, "wms_ref_no");
						reqParam += '&air_sea_clss_cd=' + "W";
						reqParam += '&bnd_clss_cd=' + "N";
						reqParam += '&biz_clss_cd=' + "";
					}
					//alert(reqParam);
					popGET('RPT_PRN_0210.clt'+reqParam, '', 630, 400, "scroll:yes;status:no;help:no;");
				}else{
					var reqParam='?intg_bl_seq=' + sheetObj.GetCellValue(sRow, "m_intg_bl_seq");
					reqParam += '&mbl_no=' + sheetObj.GetCellValue(sRow, "mbl_no");
					reqParam += '&ref_no=' + sheetObj.GetCellValue(sRow, "ref_no");
					reqParam += '&air_sea_clss_cd=' + sheetObj.GetCellValue(sRow, "air_sea_clss_cd");
					reqParam += '&bnd_clss_cd=' + sheetObj.GetCellValue(sRow, "bnd_clss_cd");
					reqParam += '&biz_clss_cd=' + "M";
					//alert(reqParam);
					popGET('RPT_PRN_0180.clt'+reqParam, '', 1130, 750, "scroll:yes;status:no;help:no;");					
				}
			}
   	 	break;		
    }
}

function excelDown(mySheet){
	var formObj = document.frm1;
	formObj.f_cmd.value = COMMAND10;
	
	formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
    formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
    
    formObj.f_inv_seq.value="";
    formObj.f_oth_seq.value="";
    formObj.f_trdp_cd.value="";
	
	var formParam = FormQueryString(formObj);
	var param = {
					DownCols: makeHiddenSkipCol(mySheet)
					,SheetDesign:1
					,Merge:1
					,URL:"./ACC_INV_0040.clt"
					,ExtendParam:formParam
					,ExtendParamMethod:"GET"
				};	
	mySheet.DirectDown2Excel(param);
}

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
    
    var opt_key = "TAX_COL";
	ajaxSendPost(setAccInvVATCdReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	var opt_key = "WHLD_TAX_COL";
	ajaxSendPost(setAccInvWHDCdReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
    //LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.s_ofc_cd);
	
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//사용자가 저장한 Header 정보를 읽어온다.
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
	var formObj=document.frm1;
	//오늘일자구하기
	var now=new Date(); 	
	var nxtDt=new Date(Date.parse(now) + 30 * 1000 * 60 * 60 * 24);
	var preDt=new Date(Date.parse(now) - 30 * 1000 * 60 * 60 * 24);
	var nxtyear=nxtDt.getFullYear(); 			
	var nxtmonth=nxtDt.getMonth() + 1;
	var nxtdate=nxtDt.getDate(); 	
	var preyear=preDt.getFullYear();
	var premonth=preDt.getMonth() + 1;
	var predate=preDt.getDate();
	if(nxtmonth < 10){
		nxtmonth="0"+(nxtmonth);
	}
	if(premonth < 10){
		premonth="0"+(premonth);
	}
	if(nxtdate < 10){
		nxtdate="0"+nxtdate;
	}
	if(predate < 10){
		predate="0"+predate;
	}
	PREDATE=premonth + "-" + predate + "-" + preyear;
	NXTDATE=nxtmonth + "-" + nxtdate + "-" + nxtyear;
	//ENDDATE  = getEndDate(TODAY);
	//PREDATE = subDay(TODAY, 30);
	//NXTDATE = addDay(TODAY, 30);
	//formObj.s_post_strdt.value = PREDATE;
	//formObj.s_post_enddt.value = NXTDATE;
	
	//setFromToDtEndPlus(formObj.s_inv_strdt, 90, formObj.s_inv_enddt, 60);
	
	//2011.12.28
	formObj.s_hbl_no.value=p_hbl_no;
	// 24842 bl List에서 오는 mbl값을 form에 설정하지 않고 hidden으로 처리
	//formObj.s_mbl_no.value=p_mbl_no;
	formObj.s_intg_bl_seq.value=p_intg_bl_seq;
	formObj.s_ref_no.value=p_ref_no;
	formObj.s_oth_ref_no.value=p_oth_ref_no;
	formObj.s_oth_seq.value=p_oth_seq;
	
	//WMS ACCOUNT LKH 2015.01.20
	formObj.s_wms_ref_no.value=p_wms_ref_no;
	formObj.s_wms_seq.value=p_wms_seq;
	
	if (!((p_intg_bl_seq == null || p_intg_bl_seq == "") && (p_oth_seq == null || p_oth_seq == "") && (p_wms_seq == null || p_wms_seq == ""))) {
		FIRST_SEARCH_YN = "Y";
	}
}

function RestoreGrid(){
	var formObj=document.frm1;
    if(formObj.s_intg_bl_seq.value != "" || formObj.s_oth_seq.value != "" || formObj.s_wms_seq.value != ""){
    	//날짜를 없앤다.
    	//#25716 [SUNWAY]B/L List & Entry 에서 Accounting 버튼을 통해 AR/AP List 로 이동하는 경우 Period 문제
    	formObj.s_inv_strdt.value="";
    	formObj.s_inv_enddt.value="";
    	doWork("SEARCHLIST");
    }else{
    	//doWork("SEARCHLIST01");
    	doWork("SEARCHLIST");
    }
    /* LHK, 20140123 #25535, 추가 내용 Block Date Set */
    setBLOCK_POST_DT();
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {
         case 1:      //IBSheet1 init
        	    with(sheetObj){
			           	var cnt=0;
			
			           	SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0 } );
			
			           	var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
			           	var headers = [ { Text:getLabel('ACC_INV_0040_HDR1'), Align:"Center"},
			  		                    { Text:getLabel('ACC_INV_0040_HDR2'), Align:"Center"} ];
			           	InitHeaders(headers, info);
			           	//WMS ACCOUNT LKH 2015.01.20
			           	var cols = [ {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"magam_flag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			           	             {Type:"Radio",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"check_flag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			           	             {Type:"Text",      Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:"inv_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			           	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",           KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:1,   InsertEdit:1 , EditLen:10 },
			           	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			           	             {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			           	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
			            
			           	cols.push({Type:"Float",     Hidden:ACC_VAT_VAL,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"duty_tax_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			           	cols.push({Type:"Float",     Hidden:ACC_VAT_VAL,  Width:125,   Align:"Right",   ColMerge:1,   SaveName:"non_taxable_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			           	cols.push({Type:"Float",     Hidden:ACC_VAT_VAL,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"taxable_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			           	
			           	cols.push({Type:"Float",     Hidden:ACC_VAT_VAL,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"vat_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			           	cols.push({Type:"Float",     Hidden:ACC_WHD_VAL,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"whd_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });	
			           	
			          	cols.push({Type:"Float",     Hidden:0,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			            cols.push({Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"pay_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
	                	cols.push({Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"last_pay_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
               			cols.push({Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"bal_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
               			cols.push({Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
               			cols.push({Type:"Int",       Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:"over_due",          KeyField:0,   CalcLogic:"",   Format:"NullInteger", PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
               			cols.push({Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
           				cols.push({Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"ref_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
           				cols.push({Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"oth_ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 }); 
			           	  
			           	if(wmsUseFlag == 'Y'){
			           	  cols.push({Type:"Text",      Hidden:1,  Width:120,  Align:"Left",  ColMerge:1,   SaveName:"wms_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			              cols.push({Type:"Text",      Hidden:0,  Width:120,  Align:"Left",  ColMerge:1,   SaveName:"wms_ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			            } else {
			              cols.push({Type:"Text",      Hidden:1,  Width:120,  Align:"Left",  ColMerge:1,   SaveName:"wms_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			              cols.push({Type:"Text",      Hidden:1,  Width:120,  Align:"Left",  ColMerge:1,   SaveName:"wms_ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			            }
			              			                  
		                cols.push({Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"imp_ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"cust_ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"vnd_inv_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"inv_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"etd_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eta_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"rgst_usrid",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"modi_usrid",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"modi_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"inv_modi_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"shrt_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"oth_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sell_buy_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"bl_cnt_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ref_ofc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"cmb_inv_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"AutoSum",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"duty_tax_tot_amt",   KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"AutoSum",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"non_taxable_tot_amt",   KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"AutoSum",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"taxable_tot_amt",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"AutoSum",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"vat_tot_amt",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"AutoSum",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"whd_tot_amt",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"AutoSum",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"profit_amt",        KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"profit_gubun",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"AutoSum",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"pay_tot_amt",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"AutoSum",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"bal_tot_amt",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" });
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"m_intg_bl_seq" });
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"bnd_clss_cd" });
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"air_sea_clss_cd" });   
			            
		                InitColumns(cols);
		                SetShowButtonImage(0);
		                SetEditable(1);
			            /* #27785 [AIF] Add "TP Code" and "Alias" Columns to the AR/AP List Screen */
		                /* #22118 */
		                /* account bl block_flag (#21736) */
		                InitViewFormat(0, "post_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		                InitViewFormat(0, "last_pay_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		                InitViewFormat(0, "etd_dt_tm", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		                InitViewFormat(0, "eta_dt_tm", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		                SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
//			           	SetAutoRowHeight(0);
		                SetSheetHeight(450);
		                
		                SetHeaderRowHeight(20);
	    		        SetHeaderRowHeight(20);
	    		        
		                resizeSheet();
		                //	ShowSubSum([{StdCol:"profit_gubun", SumCols:"profit_amt|pay_tot_amt|bal_tot_amt", Sort:false, ShowCumulate:false, CaptionCol:6, CaptionText:"TOTAL"}]);

	           }

                                              
           break;
           
           <!-- ############################################### COMMON MEMO 2-4 ##################################################### -->
	       case 2:      //IBSheet1 init
	      	   initMemo(sheetObj);                                              
	       break;
	       <!-- ############################################### COMMON MEMO 2-4 ##################################################### -->
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

function getPageURL() {
	return document.getElementById("pageurl").value;
}
/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet1_OnSelectMenu(sheetObj, MenuString){
	 var formObj=document.frm1;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 사용자가 저장한 Header Setting을 삭제한다.
//		case "Header Setting Delete":
//			IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
//		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
} 
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg) {
	sheet1.SetSumValue("inv_aply_curr_cd", "TOTAL");
	var formObj=document.frm1;
	//sheetObj.HeadCheck(0, "check_flag") = false;
	doDispPaging(sheetObj.GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	for(var i=2; i<=sheetObj.LastRow();i++){
		// #23823 over_due가 )보다 작으면 0으로 변경 
		if (sheetObj.GetCellValue(i, "over_due") < 0) {
			sheetObj.SetCellValue(i, "over_due",0,0);
		}
		/*
		sheetObj.SetCellEditable(i, "inv_tp",0);
		sheetObj.SetCellEditable(i, "inv_no",0);
		sheetObj.SetCellEditable(i, "trdp_nm",0);
		sheetObj.SetCellEditable(i, "inv_sum_amt",0);
		sheetObj.SetCellEditable(i, "pay_amt",0);
		sheetObj.SetCellEditable(i, "last_pay_dt",0);
		sheetObj.SetCellEditable(i, "bal_amt",0);
		sheetObj.SetCellEditable(i, "over_due",0);
		sheetObj.SetCellEditable(i, "hbl_no",0);
		sheetObj.SetCellEditable(i, "mbl_no",0);
		sheetObj.SetCellEditable(i, "ref_no",0);
		sheetObj.SetCellEditable(i, "vnd_inv_no",0);
		sheetObj.SetCellEditable(i, "ofc_cd",0);
		sheetObj.SetCellEditable(i, "inv_aply_curr_cd",0);
		sheetObj.SetCellEditable(i, "rgst_usrid",0);
		sheetObj.SetCellEditable(i, "check_flag",1);
		sheetObj.SetCellEditable(i, "post_dt",1);
		*/
		//sheetObj.RowBackColor(i) = "#EFEBEF";
		//마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
		if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y" || Number(sheetObj.GetCellValue(i, "pay_amt")) > 0 || sheetObj.GetCellValue(i, "cmb_inv_seq") == "Y"){
			sheetObj.SetCellEditable(i, "post_dt",0);
			sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
			if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
				sheetObj.SetCellValue(i, "magam_flag","Y");
				sheetObj.SetCellFontColor(i, "magam_flag","#FF0000");
			}
		}else{
			sheetObj.SetCellEditable(i, "post_dt",1);
			// TOTAL영역도 흰색으로 변함
//			sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
		}
		/* 요구사항 #20626 : [BINEX]Accounting → B/L jsjang 2013.9.16 */
		//WMS ACCOUNT LKH 2015.01.20
		if(sheetObj.GetCellValue(i, "hbl_no") != "" || sheetObj.GetCellValue(i, "mbl_no") != "" || sheetObj.GetCellValue(i, "oth_ref_no") != "" || sheetObj.GetCellValue(i, "hbl_no") != "" || sheetObj.GetCellValue(i, "wms_ref_no") != ""){
			if(sheetObj.GetCellValue(i, "hbl_no") != ""){
				sheetObj.SetCellFontColor(i,'hbl_no',"#0000FF");
			}
			if(sheetObj.GetCellValue(i, "mbl_no") != ""){
				sheetObj.SetCellFontColor(i,'mbl_no',"#0000FF");
			}
			if(sheetObj.GetCellValue(i, "oth_ref_no") != ""){
				sheetObj.SetCellFontColor(i,'oth_ref_no',"#0000FF");
			}
			if(sheetObj.GetCellValue(i, "ref_no") != ""){
				sheetObj.SetCellFontColor(i,'ref_no',"#0000FF");
			}
			//WMS ACCOUNT LKH 2015.01.20
			if(sheetObj.GetCellValue(i, "wms_ref_no") != ""){
				sheetObj.SetCellFontColor(i,'wms_ref_no',"#0000FF");
			}
		}
	}
	formObj.s_amt_fr.value=doMoneyFmt(formObj.s_amt_fr.value);
	formObj.s_amt_to.value=doMoneyFmt(formObj.s_amt_to.value);
	//LHK 20130811 Profit Total 금액 표기
//no support[implemented common]CLT 	sheetObj.MessageText ("SubSum")="TOTAL"; 
	var sRow=sheetObj.FindSumRow();
	
    //가져온 행을 배열로 반든다.
    //var arrRow=sRow.split("|");
    if(sRow != -1){
//		sheetObj.SetCellValue(sRow, "inv_sum_amt",roundXL2(Number(sheetObj.GetCellValue(sRow, "profit_amt")), 2));
    	//GetCellValue를 GetCellText로 수정 pointCount를 그대로 가져오기 위해
    	sheetObj.SetCellValue(sRow, "duty_tax_amt",sheetObj.GetCellText(sRow, "duty_tax_tot_amt"));
    	sheetObj.SetCellValue(sRow, "non_taxable_amt",sheetObj.GetCellText(sRow, "non_taxable_tot_amt"));
    	sheetObj.SetCellValue(sRow, "taxable_amt",sheetObj.GetCellText(sRow, "taxable_tot_amt"));
    	
    	sheetObj.SetCellValue(sRow, "vat_amt",sheetObj.GetCellText(sRow, "vat_tot_amt"));
    	sheetObj.SetCellValue(sRow, "whd_amt",sheetObj.GetCellText(sRow, "whd_tot_amt"));
		sheetObj.SetCellValue(sRow, "inv_sum_amt",sheetObj.GetCellText(sRow, "profit_amt"));
		sheetObj.SetCellValue(sRow, "pay_amt",sheetObj.GetCellText(sRow, "pay_tot_amt"));
		sheetObj.SetCellValue(sRow, "bal_amt",sheetObj.GetCellText(sRow, "bal_tot_amt"));
	    sheetObj.SetCellEditable(sRow, 1,0);
	//    sheetObj.CellAlign(sRow, 5) = daCenter;
	    sheetObj.SetCellFont("FontBold", sRow, "inv_aply_curr_cd", sRow, "inv_aply_curr_cd",1);
	    sheetObj.SetCellFont("FontBold", sRow, "duty_tax_tot_amt",sRow, "duty_tax_tot_amt",1);
	    sheetObj.SetCellFont("FontBold", sRow, "non_taxable_tot_amt",sRow, "non_taxable_tot_amt",1);
	    sheetObj.SetCellFont("FontBold", sRow, "taxable_tot_amt",sRow, "taxable_tot_amt",1);
	    sheetObj.SetCellFont("FontBold", sRow, "vat_tot_amt",sRow, "vat_tot_amt",1);
	    sheetObj.SetCellFont("FontBold", sRow, "whd_tot_amt",sRow, "whd_tot_amt",1);
	    sheetObj.SetCellFont("FontBold", sRow, "inv_sum_amt",sRow, "inv_sum_amt",1);
	    sheetObj.SetCellFont("FontBold", sRow, "pay_amt",sRow, "pay_amt",1);
	    sheetObj.SetCellFont("FontBold", sRow, "bal_amt", sRow, "bal_amt",1);
    }
    
    <!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
	var intg_bl_seq = '';
	var palt_mnu_cd = '';
	var opr_no = '';
	
	if(sheetObj.GetTotalRows()>0){
		intg_bl_seq = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "inv_seq");
		palt_mnu_cd = 'INV';
		opr_no = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "inv_no");
	}
	
	setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
	<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	for(var i=2; i<=sheetObj.LastRow();i++){
		/*
		sheetObj.SetCellEditable(i, "inv_tp",0);
		sheetObj.SetCellEditable(i, "inv_no",0);
		sheetObj.SetCellEditable(i, "trdp_nm",0);
		sheetObj.SetCellEditable(i, "inv_sum_amt",0);
		sheetObj.SetCellEditable(i, "pay_amt",0);
		sheetObj.SetCellEditable(i, "last_pay_dt",0);
		sheetObj.SetCellEditable(i, "bal_amt",0);
		sheetObj.SetCellEditable(i, "over_due",0);
		sheetObj.SetCellEditable(i, "hbl_no",0);
		sheetObj.SetCellEditable(i, "mbl_no",0);
		sheetObj.SetCellEditable(i, "ref_no",0);
		sheetObj.SetCellEditable(i, "vnd_inv_no",0);
		sheetObj.SetCellEditable(i, "ofc_cd",0);
		sheetObj.SetCellEditable(i, "inv_aply_curr_cd",0);
		sheetObj.SetCellEditable(i, "rgst_usrid",0);
		sheetObj.SetCellEditable(i, "check_flag",1);
		sheetObj.SetCellEditable(i, "post_dt",1);
		*/
		//sheetObj.RowBackColor(i) = "#EFEBEF";
		//마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
		if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y" || Number(sheetObj.GetCellValue(i, "pay_amt")) > 0){
			/*
			//role_cd 가 'ADM' 인경우에는 수정가능하게 한다.
			if(formObj.role_cd.value != "ADM"){
				sheetObj.SetCellEditable(i, "post_dt",0);
				sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
			}else{
				sheetObj.SetCellEditable(i, "post_dt",1);
				sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
			}
			*/
			//LHK, 20140124, 
			sheetObj.SetCellEditable(i, "post_dt",0);
			sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
			if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
				sheetObj.SetCellValue(i, "magam_flag","Y");
				sheetObj.SetCellFontColor(i, "magam_flag","#FF0000");
			}
		}else{
			sheetObj.SetCellEditable(i, "post_dt",1);
//			sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
		}
		//sheetObj.ColBackColor(0) = "#FFFFFF";
		// #23823 over_due가 )보다 작으면 0으로 변경 
		if (sheetObj.GetCellValue(i, "over_due") < 0) {
			sheetObj.SetCellValue(i, "over_due",0,0);
		}
	}
	formObj.s_amt_fr.value=doMoneyFmt(formObj.s_amt_fr.value);
	formObj.s_amt_to.value=doMoneyFmt(formObj.s_amt_to.value);
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	//doWork("SEARCHLIST");
}
/**
 * Space 이벤트로 체크시 2번의 Row를 선택 못하게 설정
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnKeyUp(sheetObj, Row, Col, KeyCode, Shift){
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(Col);
	if (KeyCode == 32 && colStr == "check_flag"){
		for(var i=2; i <= sheetObj.LastRow();i++){
			if(i == Row){
				if(sheetObj.GetCellValue(i, "check_flag") == "0"){
					sheetObj.SetCellValue(i, "check_flag","0");
				}else{
					sheetObj.SetCellValue(i, "check_flag","1");
				}
			}else{
				sheetObj.SetCellValue(i, "check_flag","0");
			}
		}
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	formObj.f_inv_seq.value=sheetObj.GetCellValue(Row, "inv_seq");
	formObj.f_inv_no.value=sheetObj.GetCellValue(Row, "inv_no");
	formObj.f_print_type.value=sheetObj.GetCellValue(Row, "inv_tp");
	formObj.f_bl_cnt_cd.value=sheetObj.GetCellValue(Row, "bl_cnt_cd");
	formObj.f_ref_ofc_cd.value=sheetObj.GetCellValue(Row, "ref_ofc_cd");
	formObj.f_oth_seq.value=sheetObj.GetCellValue(Row, "oth_seq");
	formObj.f_trdp_cd.value=sheetObj.GetCellValue(Row, "trdp_cd");	
	//WMS ACCOUNT LKH 2015.01.20
	formObj.f_wms_seq.value=sheetObj.GetCellValue(Row, "wms_seq");
	/*
if(Number(sheetObj.GetCellValue(Row, "pay_amt")) != 0){
		deleteBtn1.style.display="none";
		deleteBtn2.style.display="none";
	}else{
		deleteBtn1.style.display="inline";
		deleteBtn2.style.display="inline";
	}
	*/
	/*
	if(sheetObj.ColSaveName(Col) != "check_flag"){
		sheetObj.SetCellValue(Row, "check_flag","1");
	}
	sheetObj.SetRowBackColor(Row,"#DFFFFF");
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(i == Row){
			sheetObj.SetRowBackColor(i,"#DFFFFF");
if(sheetObj.GetCellValue(i, "check_flag") == "0"){
				sheetObj.SetCellValue(i, "check_flag","0");
			}else{
				sheetObj.SetCellValue(i, "check_flag","1");
			}
		}else{
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			//마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y" || Number(sheetObj.GetCellValue(i, "pay_amt")) > 0){
				sheetObj.SetCellEditable(i, "post_dt",0);
			}else{
				sheetObj.SetCellEditable(i, "post_dt",1);
				sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
			}
			sheetObj.SetColBackColor(0,"#FFFFFF");
			sheetObj.SetCellValue(i, "check_flag","0");
		}
	}
	*/
	switch (sheetObj.ColSaveName(Col)) {
		case "check_flag" :
			for(var i=2; i<=sheetObj.LastRow();i++){
				if(i == Row){
					if(sheetObj.GetCellValue(i, "check_flag") == "0"){
						sheetObj.SetCellValue(i, "check_flag","0");
					}else{
						sheetObj.SetCellValue(i, "check_flag","1");
					}
				}else{
					sheetObj.SetCellValue(i, "check_flag","0");
				}
			}
		break;
		//------------[20130822 OJG]----------
		case "hbl_no" :
			if(docObjects[0].GetCellValue(Row, "hbl_no") == ''){
			 	return;
			}
			
			var formObj=document.frm1;
			var paramStr = "";
			var titleStr = "";
			
			if (docObjects[0].GetCellValue(Row, "oth_seq") != ""){
				titleStr="Other Sales Details";
			    paramStr="./OTH_OPR_0010.clt?f_cmd=-1&ref_no="+docObjects[0].GetCellValue(Row, "oth_ref_no")+"&oth_seq="+docObjects[0].GetCellValue(Row, "oth_seq");
			    
			}else if (docObjects[0].GetCellValue(Row, "wms_seq") != ""){
				titleStr="WMS Doc Entry";
			    paramStr="./WHM_WHM_0010.clt?f_cmd=-1&doc_ref_no="+docObjects[0].GetCellValue(Row, "wms_ref_no")+"&wm_doc_seq="+docObjects[0].GetCellValue(Row, "wms_seq");
			    
			}else{
				//searchBlCmmInfo(docObjects[0].GetCellValue(Row, "hbl_no"),"H",docObjects[0].GetCellValue(Row, "ref_no"));
				var v_intg_bl_seq = docObjects[0].GetCellValue(Row, "intg_bl_seq");
				var v_air_sea_clss_cd = docObjects[0].GetCellValue(Row, "air_sea_clss_cd");
				var v_bnd_clss_cd = docObjects[0].GetCellValue(Row, "bnd_clss_cd");
				
				if(v_intg_bl_seq == ""){
					alert(getLabel('FMS_COM_ALT010'));
					return;
				}
				
				titleStr="Booking & HB/L Entry";
				if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="O"){	//Ocean Export
					paramStr="./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+docObjects[0].GetCellValue(Row, "hbl_no")+"&f_intg_bl_seq="+v_intg_bl_seq;
				}else if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="I"){	//Ocean Import
					paramStr="./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+docObjects[0].GetCellValue(Row, "hbl_no")+"&f_intg_bl_seq="+v_intg_bl_seq;
				}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="O"){	//Air Export
					titleStr="Booking & House AWB Entry";
					paramStr="./AIE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_bl_no="+docObjects[0].GetCellValue(Row, "hbl_no");
				}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="I"){	//Air Import
					titleStr="Booking & House AWB Entry";
					paramStr="./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_bl_no="+docObjects[0].GetCellValue(Row, "hbl_no");
				}
			}
			parent.mkNewFrame(titleStr, paramStr);
		break;
		case "mbl_no" :
			if(docObjects[0].GetCellValue(Row, "mbl_no") == ''){
			 	return;
			}
			
			var formObj=document.frm1;
			var paramStr = "";
			var titleStr = "";
			
			if (docObjects[0].GetCellValue(Row, "oth_seq") != ""){
				titleStr="Other Sales Details";
			    paramStr="./OTH_OPR_0010.clt?f_cmd=-1&ref_no="+docObjects[0].GetCellValue(Row, "oth_ref_no")+"&oth_seq="+docObjects[0].GetCellValue(Row, "oth_seq");
			    
			}else if (docObjects[0].GetCellValue(Row, "wms_seq") != ""){
				titleStr="WMS Doc Entry";
			    paramStr="./WHM_WHM_0010.clt?f_cmd=-1&doc_ref_no="+docObjects[0].GetCellValue(Row, "wms_ref_no")+"&wm_doc_seq="+docObjects[0].GetCellValue(Row, "wms_seq");
			    
			}else{
				//searchBlCmmInfo(docObjects[0].GetCellValue(Row, "mbl_no"),"M",docObjects[0].GetCellValue(Row, "ref_no"));
				var v_intg_bl_seq = docObjects[0].GetCellValue(Row, "m_intg_bl_seq");
				var v_air_sea_clss_cd = docObjects[0].GetCellValue(Row, "air_sea_clss_cd");
				var v_bnd_clss_cd = docObjects[0].GetCellValue(Row, "bnd_clss_cd");
				
				if(v_intg_bl_seq == ""){
					alert(getLabel('FMS_COM_ALT010'));
					return;
				}
				
				titleStr="Master B/L Entry";			
				if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="O"){	//Ocean Export
					paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+docObjects[0].GetCellValue(Row, "ref_no")+"&f_intg_bl_seq="+v_intg_bl_seq;				
				}else if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="I"){	//Ocean Import
					paramStr="./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+docObjects[0].GetCellValue(Row, "ref_no")+"&f_intg_bl_seq="+v_intg_bl_seq;
				}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="O"){	//Air Export
					titleStr="Master AWB Entry";
					paramStr="./AIE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_ref_no="+docObjects[0].GetCellValue(Row, "ref_no");
				}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="I"){	//Air Import
					titleStr="Master AWB Entry";
					paramStr="./AII_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_ref_no="+docObjects[0].GetCellValue(Row, "ref_no");
				}
			}
			parent.mkNewFrame(titleStr, paramStr);
		break;
		
		case "ref_no" :
			if(docObjects[0].GetCellValue(Row, "ref_no") == ''){
			 	return;
			}			
			//searchBlCmmInfo(docObjects[0].GetCellValue(Row, "mbl_no"),"M",docObjects[0].GetCellValue(Row, "ref_no"));
			var v_intg_bl_seq = docObjects[0].GetCellValue(Row, "m_intg_bl_seq");
			var v_air_sea_clss_cd = docObjects[0].GetCellValue(Row, "air_sea_clss_cd");
			var v_bnd_clss_cd = docObjects[0].GetCellValue(Row, "bnd_clss_cd");
			
			if(v_intg_bl_seq == ""){
				alert(getLabel('FMS_COM_ALT010'));
				return;
			}
			
			var formObj=document.frm1;
			var paramStr="";
			var titleStr="Master B/L Entry";			
			if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="O"){	//Ocean Export
				paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+docObjects[0].GetCellValue(Row, "ref_no")+"&f_intg_bl_seq="+v_intg_bl_seq;				
			}else if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="I"){	//Ocean Import
				paramStr="./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+docObjects[0].GetCellValue(Row, "ref_no")+"&f_intg_bl_seq="+v_intg_bl_seq;
			}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="O"){	//Air Export
				titleStr="Master AWB Entry";
				paramStr="./AIE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_ref_no="+docObjects[0].GetCellValue(Row, "ref_no");
			}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="I"){	//Air Import
				titleStr="Master AWB Entry";
				paramStr="./AII_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_ref_no="+docObjects[0].GetCellValue(Row, "ref_no");
			}
			parent.mkNewFrame(titleStr, paramStr);
		break;
		/* 요구사항 #20626 : [BINEX]Accounting → B/L */
		case "oth_ref_no" :
			if(docObjects[0].GetCellValue(Row, "oth_ref_no") == ''){
				//alert(getLabel('FMS_COM_ALT053'));
			 	return;
			}
			var formObj=document.frm1;
			var ref_no=docObjects[0].GetCellValue(Row, "oth_ref_no");
			var oth_seq=docObjects[0].GetCellValue(Row, "oth_seq");
			var titleStr="Other Sales Details";
		    var paramStr="./OTH_OPR_0010.clt?f_cmd=-1&ref_no="+ref_no+"&oth_seq="+oth_seq;
		    parent.mkNewFrame(titleStr, paramStr);	
		break;		
		//WMS ACCOUNT LKH 2015.01.20
		case "wms_ref_no" :
			if(docObjects[0].GetCellValue(Row, "wms_ref_no") == ''){
				//alert(getLabel('FMS_COM_ALT053'));
			 	return;
			}
			var formObj=document.frm1;
			var ref_no=docObjects[0].GetCellValue(Row, "wms_ref_no");
			var wms_seq=docObjects[0].GetCellValue(Row, "wms_seq");
			var titleStr="WMS Doc Entry";
		    var paramStr="./WHM_WHM_0010.clt?f_cmd=-1&doc_ref_no="+ref_no+"&wm_doc_seq="+wms_seq;
		    parent.mkNewFrame(titleStr, paramStr);	
		break;		
		//--------------------------------------
	}
	//마감처리를 한다.
	//마감이나 PAID됐을시 삭제버튼을 비활성화 한다.
	//LHK, 20140127, 아래 Case 가 오류가 있어보임. 
	/* 
if(sheetObj.GetCellValue(Row, "clt_cmpl_flg") == "Y" || Number(sheetObj.GetCellValue(Row, "pay_amt")) > 0 || sheetObj.GetCellValue(Row, "cmb_inv_seq") == "Y"){
		//role_cd 가 'ADM' 인경우에는 수정가능하게 한다.
		if(formObj.role_cd.value != "ADM"){
			saveBtn1.style.display="none";
			saveBtn2.style.display="none";
		}
		deleteBtn1.style.display="none";
		deleteBtn2.style.display="none";
	}else{
		// [20140121 OJG] 이미 ROLE BUTTON 권한으로 처리되어있슴.
		// saveBtn1.style.display   = "inline";
		// saveBtn2.style.display   = "inline";
		// deleteBtn1.style.display = "inline";
		// deleteBtn2.style.display = "inline";
	}
	*/
if(sheetObj.GetCellValue(Row, "clt_cmpl_flg") == "Y" || Number(sheetObj.GetCellValue(Row, "pay_amt")) > 0 || sheetObj.GetCellValue(Row, "cmb_inv_seq") == "Y"){
		//#26602 Delete Button Disappear
		/*
		getObj('btnModify').style.display="none";
		getObj('btnDelete').style.display="none";
		*/
	}else{
		if(formObj.f_attr3.value == "Y"){
			getObj('btnModify').style.display="inline";
		}
		if(formObj.f_attr4.value == "Y"){
			getObj('btnDelete').style.display="inline";
		}
	}
	/* [20140121 OJG] 이미 ROLE BUTTON 권한으로 처리되어있슴.
	if(sheetObj.Cellvalue(Row, "jnr_no") != ""){
		getObj('paidBtn1').style.display="inline";
		paidBtn2.style.display="inline";
	}else{
		getObj('paidBtn1').style.display="none";
		paidBtn2.style.display="none";
	}
	*/

	<!-- ############################################### COMMON MEMO 3-4 ##################################################### -->
	var intg_bl_seq =  sheetObj.GetCellValue(Row, "inv_seq");
	var palt_mnu_cd = 'INV';
	var opr_no = sheetObj.GetCellValue(Row, "inv_no");
	setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
	doWorkMemo("SEARCHMEMO");
	<!-- ############################################### COMMON MEMO 3-4 ##################################################### -->
}
function searchBlCmmInfo(blNo, biz_cls_cd, ref_no){
	if(blNo != "" || ref_no != ""){
		ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+blNo+'&s_biz_cls_cd='+biz_cls_cd+'&s_ref_no='+ref_no, './GateServlet.gsl');
		//ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+blNo, './GateServlet.gsl');
	}
}
/**
 * AJAX RETURN
 * BL_INFO를 가져온다.
 */
// 동일한 function 중복
/*function getBlCmmInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				frm1.f_intg_bl_seq.value=rtnArr[0];
				frm1.f_biz_clss_cd.value=rtnArr[2];
				frm1.f_air_sea_clss_cd.value=rtnArr[3];
				frm1.f_bnd_clss_cd.value=rtnArr[4];
				//doWork("DEFAULT");
			}else{
				//frm1.f_intg_bl_seq.value  		= "";
				//frm1.f_bl_no.value				= "";
				//frm1.f_biz_clss_cd.value  		= "";
				//frm1.f_air_sea_clss_cd.value  	= "";
				//frm1.f_bnd_clss_cd.value  		= "";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}*/
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){ 
	var formObj=document.frm1;
	if(sheetObj.ColSaveName(Col) != "post_dt" && sheetObj.ColSaveName(Col) != "check_flag"){
		var inv_tp=sheetObj.GetCellValue(Row, "inv_tp");
	    if(inv_tp == "A/R"){
	    	var paramStr="./ACC_INV_0010.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+escape(sheetObj.GetCellValue(Row, "inv_no"));
	        parent.mkNewFrame('A/R Entry', paramStr, "ACC_INV_0010_SHEET_" + sheetObj.GetCellValue(Row, "inv_seq")+"_"+sheetObj.GetCellValue(Row, "inv_no"));
	    }else if(inv_tp == "DB/CR"){
	    	var paramStr="./ACC_INV_0020.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+escape(sheetObj.GetCellValue(Row, "inv_no"));
	        parent.mkNewFrame('DC Note Entry', paramStr,"ACC_INV_0020_SHEET_" + sheetObj.GetCellValue(Row, "inv_seq")+"_"+sheetObj.GetCellValue(Row, "inv_no"));
	    }else if(inv_tp == "A/P"){
	    	var paramStr="./ACC_INV_0030.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+escape(sheetObj.GetCellValue(Row, "inv_no"));
	        parent.mkNewFrame('A/P Entry(Cost)', paramStr,"ACC_INV_0030_SHEET_" + sheetObj.GetCellValue(Row, "inv_seq")+"_"+sheetObj.GetCellValue(Row, "inv_no"));
	    }
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	
	formObj.f_inv_seq.value=sheetObj.GetCellValue(Row, "inv_seq");
	formObj.f_inv_no.value=sheetObj.GetCellValue(Row, "inv_no");
	formObj.f_print_type.value=sheetObj.GetCellValue(Row, "inv_tp");
	formObj.f_bl_cnt_cd.value=sheetObj.GetCellValue(Row, "bl_cnt_cd");
	formObj.f_ref_ofc_cd.value=sheetObj.GetCellValue(Row, "ref_ofc_cd");
	formObj.f_oth_seq.value=sheetObj.GetCellValue(Row, "oth_seq");
	formObj.f_trdp_cd.value=sheetObj.GetCellValue(Row, "trdp_cd");
	
	switch (sheetObj.ColSaveName(Col)) {
		/*
		case "post_dt" :
			sheetObj.SetCellValue(Row, "check_flag","1");
		break;
		*/
		case "check_flag" :
			var delFlag="N";
			for(var i=2; i<=sheetObj.LastRow();i++){
				if(sheetObj.GetCellValue(i, "check_flag") == "1"){
					if(Number(sheetObj.GetCellValue(i, "pay_amt")) != 0){
						delFlag="Y";
					}
				}
			}
		break;
		case "post_dt" :
			//LHK, 20130123, block date, jnr_dt 비교로직 추가.
var v_post_dt=sheetObj.GetCellValue(Row, "post_dt");
			var v_org_post_dt=sheetObj.CellSearchValue(Row, "post_dt");
			v_post_dt=v_post_dt.substr(4, 2) + '-' + v_post_dt.substr(6, 2) + '-' + v_post_dt.substr(0, 4);
			v_org_post_dt=v_org_post_dt.substr(4, 2) + '-' + v_org_post_dt.substr(6, 2) + '-' + v_org_post_dt.substr(0, 4);
			if(BLOCK_POST_DT == ""){
				sheetObj.SetCellValue(Row, "check_flag","1");
				return;
			}
			//BLOCK_POST_DT > v_post_dt
			if(compareTwoDate(BLOCK_POST_DT, v_post_dt)){
				sheetObj.SetCellText(Row, "post_dt",v_org_post_dt);
				sheetObj.SetCellValue(Row, "check_flag","0");
				alert(getLabel2('ACC_MSG119',new Array(ORG_BLOCK_POST_DT)));
				sheetObj.SelectCell(Row, "post_dt");
			}else{
				sheetObj.SetCellValue(Row, "check_flag","1");
			}
		break;
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal = new ComCalendarFromTo();
	        cal.select(formObj.s_post_strdt, formObj.s_post_enddt, 'MM-dd-yyyy');
	    break;
	    case 'DATE2':    //달력 조회 팝업 호출      
	        var cal = new ComCalendarFromTo();
	        cal.select(formObj.s_inv_strdt, formObj.s_inv_enddt, 'MM-dd-yyyy');
	    break;
    }
}
/*function enterBlCmmInfo(){
	var formObj=document.frm1;
	if(event.keyCode == 13){
		ajaxSendPost(getBlCmmInfo2, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.s_bl_no.value, './GateServlet.gsl');
	}
}*/
function enterInvInfo(){
	var formObj=document.frm1;
	if(formObj.s_inv_no.value != ""){
		if(event.keyCode == 13){
			ajaxSendPost(getInvInfo, 'reqVal', '&goWhere=aj&bcKey=getInvInfo&s_inv_no='+formObj.s_inv_no.value, './GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN
 * BL_INFO를 가져온다.
 */
function getBlCmmInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				if(rtnArr[2] == "H"){
					//frm1.s_hbl_no.value  			= rtnArr[1];
				}else if(rtnArr[2] == "M"){
					//frm1.s_mbl_no.value  			= rtnArr[1];
				}
				frm1.f_intg_bl_seq.value=rtnArr[0];
				frm1.f_biz_clss_cd.value=rtnArr[2];
				frm1.f_air_sea_clss_cd.value=rtnArr[3];
				frm1.f_bnd_clss_cd.value=rtnArr[4];
				doWork("DEFAULT");
			}else{
				frm1.f_intg_bl_seq.value="";
				//frm1.s_hbl_no.value  			= "";
				//frm1.s_mbl_no.value				= "";
				frm1.f_biz_clss_cd.value="";
				frm1.f_air_sea_clss_cd.value="";
				frm1.f_bnd_clss_cd.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
/**
 * AJAX RETURN
 * INVOICE_INFO를 가져온다.
 */
function getInvInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				frm1.s_inv_seq.value=rtnArr[0];
				frm1.s_inv_no.value=rtnArr[1];
				doWork("DEFAULT");
			}else{
				frm1.s_inv_seq.value="";
				frm1.s_inv_no.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].value="";
	  }           
	}
//	Tu.Nguyen Dou comment: no need this row.
//	selectSel(); 
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.s_ofc_cd);
	
	formObj.s_type_cd[0].selected=true;
	formObj.s_post_strdt.value="";
	formObj.s_post_enddt.value="";
	/* [20140121 OJG] 이미 ROLE BUTTON 권한으로 처리되어있슴.
	getObj('paidBtn1').style.display="none";
	paidBtn2.style.display="none";
	*/
	sheetObj.RemoveAll();
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type="";
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;	
				s_type="trdpCode";
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}else{
		formObj.s_bill_to_cd.value="";//trdp_cd  AS param1
		formObj.s_bill_to_nm.value="";//eng_nm   AS param2
	}
}
/**
 * Trade Partner 관린 코드조회
 */
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="BILLTO"){
				formObj.s_bill_to_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.s_bill_to_nm.value=masterVals[3];		//eng_nm   AS param2
			}
		}else{
			if(CODETYPE =="BILLTO"){
				formObj.s_bill_to_cd.value="";//trdp_cd  AS param1
				formObj.s_bill_to_nm.value="";//eng_nm   AS param2
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function addComma(obj){
	obj.value=doMoneyFmt(obj.value);
}
function setAmount(){
	var formObj=document.frm1;
	formObj.s_amt_to.value=formObj.s_amt_fr.value;
}
//말일구하기
function getEndDate(datestr){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2));
    //윤년 검증
    var boundDay="";
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm="0"+mm
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}
//날짜더하기
function addDay(ymd, v_day){
	 ymd=ymd.replaceAll("-","");
	 var yyyy=ymd.substr(4,4);
	 var mm=eval(ymd.substr(0,2) + "- 1") ;
	 var dd=ymd.substr(2,2);
	 var dt3=new Date(yyyy, mm, eval(dd + '+' + v_day));
	 yyyy=dt3.getFullYear();
	 mm=(dt3.getMonth()+1)<10? "0" + (dt3.getMonth()+1) : (dt3.getMonth()+1) ;
	 dd=dt3.getDate()<10 ? "0" + dt3.getDate() : dt3.getDate();
	 return  mm + "-" + dd + "-" + yyyy ;
}
//날짜빼기
function subDay(ymd, v_day){
	 ymd=ymd.replaceAll("-","");
	 var yyyy=ymd.substr(4,4);
	 var mm=eval(ymd.substr(0,2) + "- 1") ;
	 var dd=ymd.substr(2,2);
	 var dt3=new Date(yyyy, mm, eval(dd + '-' + v_day));
	 yyyy=dt3.getFullYear();
	 mm=(dt3.getMonth()+1)<10? "0" + (dt3.getMonth()+1) : (dt3.getMonth()+1) ;
	 dd=dt3.getDate()<10 ? "0" + dt3.getDate() : dt3.getDate();
	 return  mm + "-" + dd + "-" + yyyy ;
}
function custEnterAction(obj, type){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}else if(type == "CUSTOMER2"){
			doWork("CUSTOMER_POPLIST2");
		}
	}
}
function entSearch(){
	if(event.keyCode == 13){
		document.forms[0].f_CurPage.value='';
		doWork('SEARCHLIST')
	}
}
var mailTo="";
function getMailTo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			mailTo="";
		}else{
			mailTo=doc[1];
		}
	}
}
function validationForm(){
	if(!chkSearchCmprPrd(false, frm1.s_post_strdt, frm1.s_post_enddt)){
		return false;
	}
	if(!chkSearchCmprPrd(false, frm1.s_inv_strdt,  frm1.s_inv_enddt)){
		return false;
	}
	return true;
}
/**
 * 입력값에서 구분자(-)를 없앤다.
 * @param str   문자열
 * @return 변경된 문자열
 */
function removeDash(str) {
    return str.replace(/-/gi,"");
}
//Calendar flag value
var firCalFlag=false;
var firAmtFlag=false;

/* #21736 jsjang 21013.11.18 */
function enterBlCmmInfo2(sel_hbl_no){
	var formObj=document.frm1;
	if(sel_hbl_no != ""){
		//formObj.s_ref_no.value  = "";
		//formObj.f_inv_seq.value = "";
		//formObj.s_inv_no.value  = "";
		//clearChkVal();
		ajaxSendPost(getBlCmmInfo2, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+sel_hbl_no+'&ofc_cd='+formObj.f_ref_ofc_cd.value, './GateServlet.gsl');
	}
}
function enterRefInfo2(sel_ref_no){
	var formObj=document.frm1;
	if(sel_ref_no != ""){
		//formObj.f_inv_seq.value = "";
		//formObj.s_inv_no.value  = "";
		//clearChkVal();
		ajaxSendPost(getRefInfo2, 'reqVal', '&goWhere=aj&bcKey=getRefInfo&s_ref_no='+sel_ref_no+'&ofc_cd='+formObj.f_ref_ofc_cd.value, './GateServlet.gsl');
	}
}
function enterOtherInfo2(sel_oth_ref_no){
	var formObj=document.frm1;
	if(sel_oth_ref_no != ""){
		//formObj.f_inv_seq.value = "";
		//formObj.s_inv_no.value  = "";
		//clearChkVal();
		ajaxSendPost(getOtherInfo2, 'reqVal', '&goWhere=aj&bcKey=getOtherInfo&s_oth_no='+sel_oth_ref_no+'&ofc_cd='+formObj.f_ref_ofc_cd.value, './GateServlet.gsl');
	}
}
//WMS ACCOUNT LKH 2015.01.20
function enterWmsInfo2(sel_wms_ref_no){
	var formObj=document.frm1;
	if(sel_wms_ref_no != ""){
		ajaxSendPost(getWmsInfo2, 'reqVal', '&goWhere=aj&bcKey=getWarehouseInfo&s_wms_no='+sel_wms_ref_no+'&ofc_cd='+formObj.f_ref_ofc_cd.value, './GateServlet.gsl');
	}
}

/**
* AJAX RETURN
* BL_INFO를 가져온다.
*/
function getBlCmmInfo2(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != "" && rtnArr[5] != "null" && rtnArr[5] != "" && rtnArr[5] == "HF" && formObj.jo_flg.value != "Y")
			{
				frm1.f_block_yn.value="Y";
			}else{
				frm1.f_block_yn.value="";
			}
			frm1.f_oth_sts_cd.value="";
			//WMS ACCOUNT LKH 2015.01.20
			frm1.f_wms_sts_cd.value="";
		}
	}else{
		//SEE_BMD_MSG43
	}
}
/**
* AJAX RETURN
* REF_INFO를 가져온다.
*/
function getRefInfo2(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != "" && rtnArr[5] != "null" && rtnArr[5] != "" && rtnArr[5] == "HF" && formObj.jo_flg.value != "Y")
			{
				frm1.f_block_yn.value="Y";
			}else{
				frm1.f_block_yn.value="";
			}
			frm1.f_oth_sts_cd.value="";
			//WMS ACCOUNT LKH 2015.01.20
			frm1.f_wms_sts_cd.value="";
		}
	}else{
		//SEE_BMD_MSG43
	}
}
/**
* AJAX RETURN
* OTHER_INFO를 가져온다.
*/
function getOtherInfo2(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			//alert(rtnArr[2]);
			//alert(formObj.jo_flg.value);
			if(rtnArr[0] != "null" && rtnArr[0] != "" && rtnArr[2] != "null" && rtnArr[2] != "" && rtnArr[2] == "B" && formObj.jo_flg.value != "Y"){
				frm1.f_oth_sts_cd.value="Y";
			}else{
				frm1.f_oth_sts_cd.value="";
			}
			frm1.f_block_yn.value="";
			//WMS ACCOUNT LKH 2015.01.20
			frm1.f_wms_sts_cd.value="";
		}
	}else{
		//SEE_BMD_MSG43
	}
}

function getWmsInfo2(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			//alert(rtnArr[2]);
			//alert(formObj.jo_flg.value);
			if(rtnArr[0] != "null" && rtnArr[0] != "" && rtnArr[2] != "null" && rtnArr[2] != "" && rtnArr[2] == "B" && formObj.jo_flg.value != "Y"){
				frm1.f_wms_sts_cd.value="Y";
			}else{
				frm1.f_wms_sts_cd.value="";
			}
			frm1.f_block_yn.value="";
			//WMS ACCOUNT LKH 2015.01.20
			frm1.f_oth_sts_cd.value="";
		}
	}else{
		//SEE_BMD_MSG43
	}
}

function setBLOCK_POST_DT(){
	//LHK, 20130122, today, post date 비교하지 않는다, post_date 변경시 block date, jnr_dt 와만 비교함.
	var formObj=document.frm1;
	var block_post=formObj.block_post.value;
	var max_jnr_dt=formObj.max_jnr_dt.value;
	var tempBlkDt="";
	//큰 것과 jnr_dt 비교, 크면 jnr_dt 아니면 위 로직의 큰 date 이 Set 된다. 
	if(block_post != "" && max_jnr_dt != ""){
		if(!compareTwoDate(block_post, max_jnr_dt)){
			tempBlkDt=max_jnr_dt;
		}else{
			tempBlkDt=block_post;
		}
	}else{
		if(block_post != ""){
			tempBlkDt=block_post;
		}
		if(max_jnr_dt != ""){
			tempBlkDt=max_jnr_dt;
		}
	}
	if(tempBlkDt != ""){
		ORG_BLOCK_POST_DT=tempBlkDt.substring(0,2) + "-" + tempBlkDt.substring(2,4) + "-" + tempBlkDt.substring(4,8);	// mmddyyyy ;
		tempBlkDt=tempBlkDt.substring(4,8)+tempBlkDt.substring(0,2)+tempBlkDt.substring(2,4);
		tempBlkDt=addDate('d', 1, tempBlkDt, "");
		BLOCK_POST_DT=tempBlkDt.substring(4,6) + "-" + tempBlkDt.substring(6,8) + "-" + tempBlkDt.substring(0,4);
	}
}

function CUSTOMER_POPLIST(rtnVal){
    var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_bill_to_cd.value=rtnValAry[0];//full_nm
		formObj.s_bill_to_nm.value=rtnValAry[2];//full_nm
	}             
}
function HISTORY(){
	
}

//GL View Table Data Create LKH 2015.02.25 Start
function setGlDataCreate(arg){
	//if(confirm(getLabel('FMS_COM_CFMCRE'))){
		var formObj=document.frm1;
		doShowProcess();		
		var type_clss_cd = 'GL_DATA_CREATE';
		ajaxSendPostAsync(rtnAjaxFunction, 'reqVal', '&goWhere=aj&bcKey=setGlDataCreate&f_usrId='+formObj.f_usrId.value+'&f_type_clss_cd='+type_clss_cd, './GateServlet.gsl');
	//}
} 	

function rtnAjaxFunction(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		//getGlDataCreateDate()
		doHideProcess();
		//alert(getLabel('FMS_COM_NTYCOM'));		
	}else{
		doHideProcess();
		alert(getLabel('FMS_COM_ALT019'));
	}
	G_GL_DATA_CREATE_STATUS ="END";
	doWork('GL_CREATE_END_ACTION');
}

function ajaxSendPostAsync(callback, param, data, url){
	sendRequest(callback, param, data, 'POST', url, true);
}

//#48895 [IMPEX] AR/AP List VAT Option 값 세팅
function setAccInvVATCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]=="Y" && doc[1]!=undefined ) {
		ACC_VAT_VAL = "0";
	}
}

//#48895 [IMPEX] AR/AP List WHD Option 값 세팅
function setAccInvWHDCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]=="Y" && ACC_VAT_VAL=="0") {
		ACC_WHD_VAL = "0";
	}
}

/* #21736, [COMMON]Accounting 관련 권한 jsjang 2013.11.18 */
function goInvoiceEntry(v_inv_tp){
	
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	
	/*if (sheetObj.RowCount() == 0 && ((p_intg_bl_seq == null || p_intg_bl_seq == "") && (p_oth_seq == null || p_oth_seq == "") && (p_wms_seq == null || p_wms_seq == ""))) {
		// There is no data
		alert(getLabel('FMS_COM_ALT004'));
		return;
	}*/
	
	var sel_hbl_no = "";
	var sel_mbl_no = "";
	var sel_ref_no = "";
	var sel_intg_bl_seq = "";
	var sel_mst_intg_bl_seq = "";
	var sel_oth_ref_no = "";
	var sel_oth_seq = "";
	var sel_wms_ref_no = "";
	var sel_wms_seq = "";
	var sel_carr_trdp_cd = "";
	var sel_carr_trdp_nm = "";
	
	if (FIRST_SEARCH_YN != "Y") {
		var vRow = sheetObj.GetSelectRow();
		
		sel_hbl_no = sheetObj.GetCellValue(vRow, "hbl_no");
		sel_mbl_no = sheetObj.GetCellValue(vRow, "mbl_no");
		sel_ref_no = sheetObj.GetCellValue(vRow, "ref_no");
		sel_intg_bl_seq = sheetObj.GetCellValue(vRow, "intg_bl_seq");
		sel_mst_intg_bl_seq = sheetObj.GetCellValue(vRow, "m_intg_bl_seq");
		sel_oth_ref_no = sheetObj.GetCellValue(vRow, "oth_ref_no");
		sel_oth_seq = sheetObj.GetCellValue(vRow, "oth_seq");
		sel_wms_ref_no = sheetObj.GetCellValue(vRow, "wms_ref_no");
		sel_wms_seq = sheetObj.GetCellValue(vRow, "wms_seq");
		sel_carr_trdp_cd = sheetObj.GetCellValue(vRow, "trdp_cd");
		sel_carr_trdp_nm = sheetObj.GetCellValue(vRow, "trdp_nm");
		
	}else{
		sel_hbl_no = p_hbl_no;
		sel_mbl_no = p_mbl_no;
		sel_ref_no = p_ref_no;
		sel_intg_bl_seq = p_intg_bl_seq;
		sel_mst_intg_bl_seq = p_intg_bl_seq
		sel_oth_ref_no = p_oth_ref_no;
		sel_oth_seq = p_oth_seq;
		sel_wms_ref_no = p_wms_ref_no;
		sel_wms_seq = p_wms_seq;
		sel_carr_trdp_cd = formObj.carr_trdp_cd.value;
		sel_carr_trdp_nm = formObj.carr_trdp_nm.value;
	}
	
	formObj.f_block_yn.value="";
	formObj.f_oth_sts_cd.value="";
	formObj.f_wms_sts_cd.value="";
	
	if(sel_hbl_no != null && sel_hbl_no != ""){
    	enterBlCmmInfo2(sel_hbl_no);
    }else{
    	if(sel_ref_no != null && sel_ref_no != ""){
    		enterRefInfo2(sel_ref_no);
    	}else{
    		if(sel_oth_ref_no != null && sel_oth_ref_no != ""){
    			enterOtherInfo2(sel_oth_ref_no);
    		}else{
        		if(sel_wms_ref_no != null && sel_wms_ref_no != ""){
        			enterWmsInfo2(sel_wms_ref_no);
        		}
    		}
    	}
    }
	
	if(formObj.f_block_yn.value == "Y" || formObj.f_oth_sts_cd.value == "Y" || formObj.f_wms_sts_cd.value == "Y"){
		alert(getLabel('FMS_COM_ALT060'));
		return;
	}
	
	var s_bl_no = "";
	var s_ref_no = "";
	var s_intg_bl_seq = "";
	var f_biz_clss_cd = "";
	
	if(sel_hbl_no != ""){
		s_bl_no = sel_hbl_no;
		s_intg_bl_seq = sel_intg_bl_seq;
		f_biz_clss_cd = "H";
	}else if(sel_hbl_no != "" && sel_mbl_no == ""){
		s_bl_no = sel_hbl_no;
		s_intg_bl_seq = sel_intg_bl_seq;
		f_biz_clss_cd = "H";
	}else if(sel_hbl_no == "" && sel_mbl_no != ""){
		s_bl_no = sel_mbl_no;
		s_intg_bl_seq = sel_mst_intg_bl_seq;
		f_biz_clss_cd = "M";
	}else if(sel_hbl_no == "" && sel_ref_no != ""){
		if(v_inv_tp == "AP"){
			s_bl_no = sel_mbl_no;
		}
		s_ref_no = sel_ref_no;
		s_intg_bl_seq = sel_mst_intg_bl_seq;
		f_biz_clss_cd = "M";
	}
	
	if(v_inv_tp == "AR"){
		//WMS ACCOUNT LKH 2015.01.20
		var paramStr="./ACC_INV_0010.clt?f_cmd=-1&f_intg_bl_seq="+s_intg_bl_seq+
			"&s_bl_no="+s_bl_no+
			"&s_ref_no="+s_ref_no+
			"&f_biz_clss_cd="+f_biz_clss_cd+
			"&s_oth_ref_no="+sel_oth_ref_no+
			"&f_oth_seq="+sel_oth_seq+
			"&s_wms_ref_no="+sel_wms_ref_no+
			"&f_wms_seq="+sel_wms_seq;
		
		//alert(paramStr);
		parent.mkNewFrame('A/R Entry', paramStr);
		
	}else if(v_inv_tp == "AP"){
		var paramStr=
	    	"./ACC_INV_0030.clt?f_cmd=-1&f_intg_bl_seq="+s_intg_bl_seq+
	    	"&s_bl_no="+s_bl_no+
	    	"&s_ref_no="+s_ref_no+
	    	"&f_biz_clss_cd="+f_biz_clss_cd+
	    	"&s_oth_ref_no="+sel_oth_ref_no+
	    	"&f_oth_seq="+sel_oth_seq+
	    	"&s_wms_ref_no="+sel_wms_ref_no+
	    	"&f_wms_seq="+sel_wms_seq;
	    
	    	//#22112 Billing Carrier 추가 
	    	if (f_biz_clss_cd == "M") {
	    		paramStr += "&chk_fr_trdp_cd="+sel_carr_trdp_cd+
	    		"&chk_fr_trdp_nm="+sel_carr_trdp_nm+
	    		"&s_inv_no="+s_bl_no;
	    	} else {
	    		//24842 hbl에서 AP를 눌렀을 경우 vendor는 세팅되어지면 안됨
	    		paramStr += "&chk_house_ap=Y";
	    	}
	    	
	    parent.mkNewFrame('A/P Entry(Cost)', paramStr);
	    
	}else if(v_inv_tp == "DC"){
		var paramStr="./ACC_INV_0020.clt?f_cmd=-1&f_intg_bl_seq="+s_intg_bl_seq+
		    "&s_bl_no="+s_bl_no+
		    "&s_ref_no="+s_ref_no+
		    "&f_biz_clss_cd="+f_biz_clss_cd+
		    "&s_oth_ref_no="+sel_oth_ref_no+
		    "&f_oth_seq="+sel_oth_seq;
	    
	    parent.mkNewFrame('DC Note Entry', paramStr);
	}
}

function getPdfFileNm(){
	var formObj=document.frm1;
	var pdfFileNm = "";
	var inv_no = formObj.f_inv_no.value;
	
	if (inv_no == "" || inv_no == "undefined" || inv_no == undefined) {
		return "";
	}
	if(formObj.f_print_type.value == "A/R"){
		pdfFileNm = "AR_"+inv_no;	
	} else if(formObj.f_print_type.value == "A/P"){
		pdfFileNm = "AP_"+inv_no;	
	} else if(formObj.f_print_type.value == "DB/CR"){
		pdfFileNm = "DC_"+inv_no;	
	}
	return pdfFileNm;
}