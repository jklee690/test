<!-- opus_design_grid(S) -->
<div class="opus_design_grid">
	<h3 class="title_design mar_btm_8"><bean:message key="Rate_Combination_Point"/></h3>
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<button style="display:none;cursor:hand" type="button" class="btn_accent" name="rcpBtnObj" onClick="javascript:gridAdd(9);"		id="rcpBtnObj"><bean:message key="New"/></button>
	</div>
	<!-- opus_design_btn(E) -->
	
   <script language="javascript">comSheetObject('sheet2');</script>
</div>
<!-- opus_design_grid(E) -->

<!-- layout_wrap(S) -->
<div class= "opus_design_inquiry sm">
<div class="layout_wrap">
    <div class="layout_vertical_2 sm" style="width:540px;">
    	<table>
    		<colgroup>
    			<col width="450" />
    			<col width="" />
    		</colgroup>
    		<tr>
    			<td colspan="2"><h3 class="title_design"><bean:message key="Handling_Information"/></h3>
    			</td>
    		</tr>
    		<tr>
    			<td colspan="2"><textarea name="hndl_info_txt" id="hndl_info_txt" cols="80" rows="5" maxlength="500" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" style="width:530px;">
<bean:write name="hblVO" property="hndl_info_txt" filter="false"/></textarea></td>
    		</tr>
    		<tr>
    			<td><h3 class="title_design mar_btm_4" style="margin-bottom:0px;"><bean:message key="Mark"/></h3></td> 
    			 <td><button type="button" class="btn_etc" id="addAuto"  name="addAuto" style="cursor:hand;display:none;" onclick="addInst();"><bean:message key="Add_Instruction"/></button></td>
    		</tr>
    		<tr>
    			<td colspan="2"><textarea name="mk_txt" rows="16" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,12,rider_ocean, 'A');keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:530px;" WRAP="off">
<bean:write name="hblVO" property="mk_txt" filter="false"/></textarea></td>
    		</tr>
    	</table>
    </div>	
    <div class="layout_vertical_2 mar_left_8 sm" style="width:calc(100% - 610px)">
    	<table>
    		<colgroup>
    			<col width="450" />
    			<col width="" />
    		</colgroup>
    		<tr>
    			<td colspan="2"><h3 class="title_design"><bean:message key="Account_Info"/></h3></td>
    		</tr>
    		<tr>
    			<td colspan="2"><textarea name="acctg_info_txt" cols="80" rows="5" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" style="width:530px;">
<bean:write name="hblVO" property="acctg_info_txt" filter="false"/></textarea></td>
    		</tr>
    		<tr>
    			<td><h3 class="title_design mar_btm_4" style="margin-bottom:0px;"><bean:message key="Nature_and_Quantity_of_Goods"/></h3></td> 
    			<td>
    			 <button type="button" class="btn_etc" id="addAuto"  name="addAuto"  style="cursor:hand;display:none;" onclick="addInst();"><bean:message key="Add_Instruction"/></button>
    			<input tabindex="-1" type="hidden" name="rider_lbl" id="rider_lbl" value="" style="text-align:right;width:90px;border:0;background-color:transparent;"/>
    			</td>
    		</tr>
    		<tr>
    			<td ><textarea name="desc_txt" rows="16" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,12,rider_ocean, 'A');keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:530px;" WRAP="off">
<bean:write name="hblVO" property="desc_txt" filter="false"/></textarea></td>
    			<td valign="top" ><img src="<%=CLT_PATH%>/web/img/main/Rider_Icon.gif" style="display:none;"width="45" height="42" border="0" id="rider_ocean" valign="top"></td>
    		</tr>
    	</table>
    </div>
</div>
<!-- layout_wrap(E) -->
	<div class= "opus_design_inquiry mar_top_4">
		<table>
			<colgroup>
				<col width="140" />
				<col width="150" />
				<col width="200" />
				<col width="140" />
				<col width="40" />
				<col width="*" />
			</colgroup>
			<tbody>
				<tr>
						<th><bean:message key="Show_Dimension_on"/></th>
						<td><button type="button" class="btn_etc"  name="mk_dim" id="mk_dim" onClick="searchDim('MK_DIM', this)"><bean:message key="Mark"/></button><!-- 
							 --><button type="button" class="btn_etc" name="desc_dim"  id="desc_dim" onClick="searchDim('DESC_DIM', this)"><bean:message key="Description"/></button></td>
						<th><bean:message key="Show_Weight_on_BL_as"/></th>
						<td><!-- 
				      		 --><bean:define id="wgtDispCdList" name="valMap" property="wgtDispCdList"/><!-- 
							 --><html:select name="hblVO" property="wgt_disp_cd" styleClass="search_form" style="width:117px;">
								<html:options collection="wgtDispCdList" property="cd_val" labelProperty="cd_nm"/>
							</html:select><!-- 
							 --><input type="hidden" name="h_wgt_disp_cd" value="<bean:write name="hblVO" property="wgt_disp_cd"/>"><!-- 
							 --></td>
						<th><bean:message key="ITN_No"/></th>
						<td><input type="text" name="itn_no" maxlength="20" value="<bean:write name="hblVO" property="itn_no"/>" class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180px;"><!-- 
			            	 --><button type="button" class="btn_etc" onClick="frm1.itn_no.value='NO EEI 30.37(A)';"><bean:message key="Auto"/></button></td>
					</tr>
					<tr>
						<th><bean:message key="Remark_for_Manifest"/></th>
			      		<td colspan="5"><textarea name="rmk" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" class="search_form" dataformat="excepthan" style="width:320px;height:40px;">
<bean:write name="hblVO" property="rmk" filter="false"/></textarea></td>
					</tr>
			</tbody>
		</table>
	</div>
</div>

<div class="opus_design_grid">
	<h3 class="title_design pad_btm_8"><bean:message key="Item"/></h3>
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="loadPO" id="loadPO"  onClick="cmdtLoadPO(); " style="cursor:hand;display:none;"><bean:message key="Load_PO"/></button>
		<button type="button" class="btn_accent" name="itmAdd" id="itmAdd"  onClick="cmdtRowAdd(); " style="cursor:hand;display:none;"><bean:message key="Add"/></button>
	</div>
	<script type="text/javascript">comSheetObject('sheet8');</script>
</div>