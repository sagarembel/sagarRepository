/*********Goods Entry*************/
function supplierDetails(){
	var supplierName= $('#supplier_Name').val();
	var city=$('#city').val();
	var partyType=$('#party_Type').val();
	var address = $('#supplier_Address').val();
	var state = $('#state').val();
	var contactPerson = $('#supplier_Contact').val();
	var cstNo=$('#CST_no').val();
	var pin=$('#pn').val();
	var itPanNo=$('#it_pan_no').val();
	var birthday=$('#supplier_Birth').val();
	var anniversery=$('#anniversery').val();
	var tinNo=$('#tin_no').val();
	var creditLimit=$('#credit_limit').val();
	var eMail=$('#email_id').val();
	var bankName=$('#bank_Name').val();
	var accountNo=$('#supplier_Acc_No').val();
	var branchName=$('#branch_Name').val();
	var ifscCode=$('#ifsc_Code').val();
	var amount=$('#amt').val();
	var paymentType=$('#payment_Method').val();
	var offer=$('#offers').val();
	var brand=$('#brands').val();
	var productType=$('#product_Type').val();


	var requestParams = {supplier_Name:supplierName,city:city,party_Type:partyType,supplier_Address:address,state:state,supplier_Contact:contactPerson,CST_no:cstNo,pn:pin,it_pan_no:itPanNo,supplier_Birth:birthday,anniversery:anniversery,tin_no:tinNo,credit_limit:creditLimit,email_id:eMail,bank_Name:bankName,supplier_Acc_No:accountNo,branch_Name:branchName,ifsc_Code:ifscCode,amt:amount,payment_Method:paymentType,offers:offer,brands:brand,product_Type:productType};
	$.post('<%=contextPath%>/supdetails',{supplier_Name:supplierName,city:city,party_Type:partyType,supplier_Address:address,state:state,supplier_Contact:contactPerson,CST_no:cstNo,pn:pin,it_pan_no:itPanNo,supplier_Birth:birthday,anniversery:anniversery,tin_no:tinNo,credit_limit:creditLimit,email_id:eMail,bank_Name:bankName,supplier_Acc_No:accountNo,branch_Name:branchName,ifsc_Code:ifscCode,amt:amount,payment_Method:paymentType,offers:offer,brands:brand,product_Type:productType},

			function(data)
			{
		$("#result").html(data+"  You are Registered successfully");
		alert("You are Registered Successfully");
			}).error(function(jqXHR, textStatus, errorThrown){
				alert("ERROR IN AJAX");
			});
}
/*********Goods Entry*************/