
function productRegister(){
	var productName= $('#productname').val();
	var categoryName=$('#categoryname').val();
	var subName=$('#subcatname').val();
	var SuppName=$('#supliername').val();
	var isVat=$('#isVat').val();
	var vatPercentage=$('#vatper').val();
	var isAlternateProd=$('#isAter').val();
	var avilableStock=$('#avilS').val();
	var isItem=$('#isitem').val();
	var isActiveYN=$('#isactive').val();
	var IsModified=$('#ismodify').val();
	var isInsertDate=$('#isinsert').val();
	var requestParams = {pName:productName,cName:categoryName,suName:subName,sName:SuppName,isV:isVat,vatPer:vatPercentage,isAter:isAlternateProd,avilS:avilableStock,isI:isItem,isactive:isActiveYN,ismodify:IsModified,isinsert:isInsertDate};
	$.post('<%=contextPath%>/admin',{pName:productName,cName:categoryName,suName:subName,sName:SuppName,isV:isVat,vatPer:vatPercentage,isAter:isAlternateProd,avilS:avilableStock,isI:isItem,isactive:isActiveYN,ismodify:IsModified,isinsert:isInsertDate},
			function(data)
			{
		$("#result").html(data+"  You are Registered successfully");
		alert("You are Registered Successfully");
			}).error(function(jqXHR, textStatus, errorThrown){
				alert("ERROR IN AJAX");
			});
}