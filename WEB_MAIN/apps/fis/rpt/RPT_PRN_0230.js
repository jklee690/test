function doWork(srcName){
	var formObj=document.frm1;
	
    switch(srcName) {
		case 'Print':
			$("input[name='title']").val("Preliminary Claim Report");
			$("input[name='file_name']").val("pre_claim2.mrd");

			var intgBlSeq = $("input[name='intg_bl_seq']").val();
			var refNo = $("input[name='f_ref_no']").val();
			var hblNo = $("input[name='f_bl_no']").val();
			var airSeaTp = $("input[name='air_sea_tp']").val();
			var toVal = $("input[name='f_to_radio']:checked").val();
			var ofcCd = $("input[name='f_ofc_cd']").val();
			var name = $("input[name='f_nm']").val();
			var addr = $("textarea[name='f_addr']").val();
			var rmk = $("textarea[name='f_rmk']").val();
			
			//Parameter Setting
			var param = "[" + intgBlSeq + "]";
			param +="[" + refNo + "]";
			param += "[" + hblNo + "]";
			param += "[" + ofcCd + "]";
			param += "[" + airSeaTp + "]";
			param += "[" + toVal + "]";
			param += "[" + name + "]";
			param += "[" + addr + "]";
			param += "[" + rmk + "]";
			param += "[" + usrnm + "]";
			
			$("input[name='rd_param']").val(param);
			
			if ($("input[name='air_sea_tp']").val() == "S") {
				$("input[name='rpt_biz_tp']").val("OIH");
			} else if ($("input[name='air_sea_tp']").val() == "A") {
				$("input[name='rpt_biz_tp']").val("AIH");
			}
			
			$("input[name='cmd_type']").val("68");
			$("input[name='rpt_biz_sub_tp']").val("CLAIM");
			
			popPOST(formObj, "RPT_RD_0010.clt", "popTest", 1025, 740);
		break;
		
		case "CLOSE":
			window.close(); 
		break;
	}
}