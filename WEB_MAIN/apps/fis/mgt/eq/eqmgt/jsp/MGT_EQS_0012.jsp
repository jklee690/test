<div class="opus_design_grid">
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" onClick="doWork('ADD_ROW')"><bean:message key="Add"/></button>
	</div>
	<div class="opus_design_inquiry">
	<script language="javascript">comSheetObject('sheet2');</script>
	 <table>
	     <tr>
	         <td width="60px"><!---
	          Display option Begin
	           ---><bean:define id="pagingVal" name="valMap"     property="paging"/><!-- 
	           --><paging:options name="pagingVal" defaultval="50"/><!--- 
	           Display option End 
	           ---></td>
	          <td id="pagingTb" align="center" class="paging" height="10" valign="bottom"></td> 
	     </tr>
	 </table>
	</div>
</div>