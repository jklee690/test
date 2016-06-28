<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0024.jsp
*@FileTitle  : HGBL등록 > Freight
*@Description: Freight 등록화면
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
=========================================================
--%>
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="781"></col>
				<col width="150"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>
				<tr>
					<td><h3 class="title_design" style="margin-bottom: 0;"><bean:message key="DO_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_do_font_size" value="<bean:write name="ofcVO" property="do_font_size"/>"><!--
					--><select name="i_do_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate></select></td>
					<td></td>
				</tr>
				 <tr>
	                <td colspan="3"><textarea name="i_do_rmk"  onblur="strToUpper(this);" dataformat="excepthan" style="width:926px;height:50px"><bean:write name="ofcVO" property="do_rmk"/></textarea>
        			</td>
	            </tr>
	        </tbody>
	   </table>
	</div>
	<div class="opus_design_inquiry mar_btm_8">
	   <table>
			<colgroup>
				<col width="781"></col>
				<col width="150"></col>
				<col width="*"></col>
			</colgroup>
			<tbody> 
				<tr>
					<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="OOH_Booking_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_ooh_bkg_font_size" value="<bean:write name="ofcVO" property="ooh_bkg_font_size"/>"><!--
					--><select name="i_ooh_bkg_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate></select></td>
					<td></td>
				</tr>
				 <tr>
	                <td colspan="3"><textarea name="i_ooh_bkg_rmk"  onblur="strToUpper(this);" dataformat="excepthan" style="width:926px;height:50px"><bean:write name="ofcVO" property="ooh_bkg_rmk"/></textarea>
        			</td>
	            </tr>
	        </tbody>
	   </table>
	</div>
	<div class="opus_design_inquiry mar_btm_8">
	   <table>
			<colgroup>
				<col width="781"></col>
				<col width="150"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>
				<tr>
					<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="AWB_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_awb_font_size" value="<bean:write name="ofcVO" property="awb_font_size"/>"><!--
					--><select name="i_awb_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate></select></td>
					<td></td>
				</tr>
				 <tr>
	                <td colspan="3"><textarea name="i_awb_rmk"  onblur="strToUpper(this);" dataformat="excepthan" style="width:926px;height:50px"><bean:write name="ofcVO" property="awb_rmk"/></textarea>
        			</td>
	            </tr>
	    </tbody>
	   </table>
	</div>
	<div class="opus_design_inquiry mar_btm_8">
	   <table>
			<colgroup>
				<col width="781"></col>
				<col width="150"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>        
				<tr>
					<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="Pickup_Delivery_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_pkup_font_size" value="<bean:write name="ofcVO" property="pkup_font_size"/>"><!--
					--><select name="i_pkup_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate></select></td>
					<td></td>
				</tr>
				 <tr>
	                <td colspan="3"><textarea name="i_pkup_rmk"  onblur="strToUpper(this);" dataformat="excepthan" style="width:926px;height:50px"><bean:write name="ofcVO" property="pkup_rmk"/></textarea>
        			</td>
	            </tr>
	   </tbody>
	   </table>
	</div>
	<div class="opus_design_inquiry mar_btm_8">
	   <table>
			<colgroup>
				<col width="781"></col>
				<col width="150"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>         
				<tr>
					<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;">OI <bean:message key="Quotation_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_oi_quo_font_size" value="<bean:write name="ofcVO" property="oi_quo_font_size"/>"><!--
					--><select name="i_oi_quo_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate></select></td>
					<td></td>
				</tr>
				 <tr>
	                <td colspan="3"><textarea name="i_oi_quo_rmk"  onblur="strToUpper(this);" dataformat="excepthan" style="width:926px;height:50px"><bean:write name="ofcVO" property="oi_quo_rmk"/></textarea>
        			</td>
	            </tr>
			</tbody>
		</table>
	</div>
	<div class="opus_design_inquiry mar_btm_8">
	   <table>
			<colgroup>
				<col width="781"></col>
				<col width="150"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>         
				<tr>
					<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;">OE <bean:message key="Quotation_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_oe_quo_font_size" value="<bean:write name="ofcVO" property="oe_quo_font_size"/>"><!--
					--><select name="i_oe_quo_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate></select></td>
					<td></td>
				</tr>
				 <tr>
	                <td colspan="3"><textarea name="i_oe_quo_rmk"  onblur="strToUpper(this);" dataformat="excepthan" style="width:926px;height:50px"><bean:write name="ofcVO" property="oe_quo_rmk"/></textarea>
        			</td>
	            </tr>
			</tbody>
		</table>
	</div>
	<div class="opus_design_inquiry mar_btm_8">
	   <table>
			<colgroup>
				<col width="781"></col>
				<col width="150"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>         
				<tr>
					<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;">AI <bean:message key="Quotation_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_ai_quo_font_size" value="<bean:write name="ofcVO" property="ai_quo_font_size"/>"><!--
					--><select name="i_ai_quo_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate></select></td>
					<td></td>
				</tr>
				 <tr>
	                <td colspan="3"><textarea name="i_ai_quo_rmk"  onblur="strToUpper(this);" dataformat="excepthan" style="width:926px;height:50px"><bean:write name="ofcVO" property="ai_quo_rmk"/></textarea>
        			</td>
	            </tr>
			</tbody>
		</table>
	</div>
	<div class="opus_design_inquiry mar_btm_8">
	   <table>
			<colgroup>
				<col width="781"></col>
				<col width="150"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>         
				<tr>
					<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;">AE <bean:message key="Quotation_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_ae_quo_font_size" value="<bean:write name="ofcVO" property="ae_quo_font_size"/>"><!--
					--><select name="i_ae_quo_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate></select></td>
					<td></td>
				</tr>
				 <tr>
	                <td colspan="3"><textarea name="i_ae_quo_rmk"  onblur="strToUpper(this);" dataformat="excepthan" style="width:926px;height:50px"><bean:write name="ofcVO" property="ae_quo_rmk"/></textarea>
        			</td>
	            </tr>
			</tbody>
		</table>
	</div>
	<div class="opus_design_inquiry mar_btm_8">
	   <table>
			<colgroup>
				<col width="781"></col>
				<col width="150"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>         
				<tr>
					<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="Warehouse_Receipt_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_wh_rct_font_size" value="<bean:write name="ofcVO" property="wh_rct_font_size"/>"><!--
					--><select name="i_wh_rct_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate></select></td>
					<td></td>
				</tr>
				 <tr>
	                <td colspan="3"><textarea name="i_wh_rct_rmk" dataformat="excepthan" style="text-transform:none;width:926px;height:50px"><bean:write name="ofcVO" property="wh_rct_rmk"/></textarea>
        			</td>
	            </tr>
			</tbody>
		</table>
	</div>
