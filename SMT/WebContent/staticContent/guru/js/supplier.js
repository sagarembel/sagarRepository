function supplierDetails(){
	var micrNo= $('#micrNo').val();
	var discount= $('#discount').val();
	var supplierName= $('#supplierName').val();
	var address = $('#address').val();
	var city=$('#city').val();
	var partyType=$('#partyType').val();
	var birthday=$('#birthday').val();
	var anniversary=$('#anniversary').val();
	var state = $('#state').val();
	var contactPerson = $('#contactPerson').val();
	var cstNo=$('#cstNo').val();
	var pin=$('#pin').val();
	var anniversary=$('#anniversary').val();
	var tinNo=$('#tinNo').val();
	var creditLimit=$('#creditLimit').val();
	var email=$('#email').val();
	var bankName=$('#bankName').val();
	var accountNo=$('#accountNo').val();
	var branchName=$('#branchName').val();
	var ifscCode=$('#ifscCode').val();
	var paymentType=$('#paymentType').val();
	var offer=$('#offer').val();
	var brand=$('#brand').val();
	var productType=$('#productType').val();
	var panNo=$('#panNo').val();
	var mobileno=$('#mobileno').val();
	var brokerId=$('#brokerId').val();

	var params= {};

	params ["supplierName"] = supplierName;
	params ["city"] = city;
	params ["partyType"] = partyType;
	params ["birthday"] = birthday;
	params ["address"] = address;
	params  ["anniversary"] = anniversary;
	params ["state"] = state;
	params ["contactPerson"] = contactPerson;
	params ["cstNo"] = cstNo;
	params ["pin"] = pin;
	params ["branchName"] = branchName;
	params ["tinNo"] = tinNo;
	params ["creditLimit"] = creditLimit;
	params ["email"] = email;
	params ["bankName"] = bankName;
	params ["accountNo"] = accountNo;
	params ["ifscCode"] = ifscCode;
	params ["paymentType"] = paymentType;
	params ["offer"] = offer;
	params ["brand"] = brand;
	params ["panNo"] = panNo;
	params ["productType"] = productType;
	params ["mobileno"] = mobileno;
	params ["brokerId"] = brokerId;
	params ["discount"] = discount;
	params ["micrNo"] = micrNo;
	params["methodName"] = "doSupplierDetails";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.supd) 
		{
			document.supd.reset();
		}
		document.supd.btn.disabled = false;
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}

function disablecst(){

	if(document.supd.tinNo.value !== "")
	{
		document.supd.cstNo.disabled = true;
		return false;
	}
	else
	{
		document.supd.cstNo.disabled = false;
		return false;
	}	

}	

function disabletin(){

	if(document.supd.cstNo.value !== "")
	{
		document.supd.tinNo.disabled = true;
		return false;
	}	
	else
	{
		document.supd.tinNo.disabled = false;
		return false;
	}	

}	



function editsupplier()
{
	this.getSupp = getSupp;

	function getSupp()
	{
		var mainCat = $("#supplierName").val();
//		$("#totalAmount").empty();
//		$("#subCat").append($("<option></option>").attr("value","").text("Select subcategory"));
		$("#partyType").append($("<input/>").attr("value","").text());
		$("#brand").append($("<input/>").attr("value","").text());
		$("#address").append($("<input/>").attr("value","").text());
		$("#city").append($("<input/>").attr("value","").text());
		$("#state").append($("<input/>").attr("value","").text());
		$("#pin").append($("<input/>").attr("value","").text());
		$("#contactPerson").append($("<input/>").attr("value","").text());
		$("#email").append($("<input/>").attr("value","").text());
		$("#tinNo").append($("<input/>").attr("value","").text());
		$("#cstNo").append($("<input/>").attr("value","").text());
		$("#creditLimit").append($("<input/>").attr("value","").text());
		$("#productType").append($("<input/>").attr("value","").text());
		$("#mobileno").append($("<input/>").attr("value","").text());
		$("#bankName").append($("<input/>").attr("value","").text());
		$("#branchName").append($("<input/>").attr("value","").text());
		$("#ifscCode").append($("<input/>").attr("value","").text());
		$("#paymentType").append($("<input/>").attr("value","").text());
		$("#accountNo").append($("<input/>").attr("value","").text());
		$("#panNo").append($("<input/>").attr("value","").text());
//		$("#brokerId").append($("<option></option>").attr("value","").text());

		var params= {};
		params["methodName"] = "getSupplier";
		params["supplierName"]= mainCat;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				document.getElementById("partyType").value = v.partyType;
				document.getElementById("brand").value = v.brand;
				document.getElementById("address").value = v.address;
				document.getElementById("city").value = v.city;
				document.getElementById("state").value = v.state;
				document.getElementById("pin").value = v.pin;
				document.getElementById("contactPerson").value = v.contactPerson;
				document.getElementById("email").value = v.email;
				document.getElementById("tinNo").value = v.tinNo;
				document.getElementById("cstNo").value = v.cstNo;
				document.getElementById("creditLimit").value = v.creditLimit;
				document.getElementById("productType").value = v.productType;
				document.getElementById("mobileno").value = v.mobileno;
				document.getElementById("bankName").value = v.bankName;
				document.getElementById("branchName").value = v.branchName;
				document.getElementById("ifscCode").value = v.ifscCode;
				document.getElementById("paymentType").value = v.paymentType;
				document.getElementById("accountNo").value = v.accountNo;
				document.getElementById("panNo").value = v.panNo;
				//   document.getElementById("brokerId").value = v.panNo;



				// $("#totalAmount").append($("<input/>").attr("value",i).text(v.totalAmount)); 


					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});

	}

}
var es = new editsupplier();



function editsuppli(){



	var supplierName= $('#supplierName').val();
	var address = $('#address').val();
	var city=$('#city').val();
	var partyType=$('#partyType').val();
//	var birthday=$('#birthday').val();
//	var anniversary=$('#anniversary').val();
	var state = $('#state').val();
	var contactPerson = $('#contactPerson').val();
	var cstNo=$('#cstNo').val();
	var pin=$('#pin').val();
//	var anniversary=$('#anniversary').val();
	var tinNo=$('#tinNo').val();
	var creditLimit=$('#creditLimit').val();
	var email=$('#email').val();
	var bankName=$('#bankName').val();
	var accountNo=$('#accountNo').val();
	var branchName=$('#branchName').val();
	var ifscCode=$('#ifscCode').val();
	var paymentType=$('#paymentType').val();
//	var offer=$('#offer').val();
	var brand=$('#brand').val();
	var productType=$('#productType').val();
//	var itPanNo=$('#itPanNo').val();
	var mobileno=$('#mobileno').val();
	var panNo=$('#panNo').val();


	var params= {};

	params ["supplierName"] = supplierName;
	params ["city"] = city;
	params ["partyType"] = partyType;
//	params ["birthday"] = birthday;
	params ["address"] = address;
//	params  ["anniversary"] = anniversary;
	params ["state"] = state;
	params ["contactPerson"] = contactPerson;
	params ["cstNo"] = cstNo;
	params ["pin"] = pin;
	params ["branchName"] = branchName;
	params ["tinNo"] = tinNo;
	params ["creditLimit"] = creditLimit;
	params ["email"] = email;
	params ["bankName"] = bankName;
	params ["accountNo"] = accountNo;
	params ["ifscCode"] = ifscCode;
	params ["paymentType"] = paymentType;
//	params ["offer"] = offer;
	params ["brand"] = brand;
//	params ["itPanNo"] = itPanNo;
	params ["productType"] = productType;
	params ["mobileno"] = mobileno;
	params ["panNo"] = panNo;

	params["methodName"] = "editSupp";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);

			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});


}








function editsup(){


	if(document.supd1.supplier.value == "selected")
	{
		document.supd1.city.disabled = true;
		document.supd1.partyType.disabled = true;
		document.supd1.birthday.disabled = true;
		document.supd1.address.disabled = true;
		document.supd1.anniversary.disabled = true;
		document.supd1.state.disabled = true;
		document.supd1.contactPerson.disabled = true;
		document.supd1.cstNo.disabled = true;
		document.supd1.pin.disabled = true;
		document.supd1.branchName.disabled = true;
		document.supd1.tinNo.disabled = true;
		document.supd1.creditLimit.disabled = true;
		document.supd1.email.disabled = true;
		document.supd1.bankName.disabled = true;
		document.supd1.accountNo.disabled = true;
		document.supd1.ifscCode.disabled = true;
		document.supd1.paymentType.disabled = true;
		document.supd1.offer.disabled = true;
		document.supd1.brand.disabled = true;
		document.supd1.itPanNo.disabled = true;
		document.supd1.mobileno.disabled = true;


	}
	else
	{

		document.supd1.city.disabled = false;
		document.supd1.partyType.disabled = false;
		document.supd1.birthday.disabled = false;
		document.supd1.address.disabled = false;
		document.supd1.anniversary.disabled = false;
		document.supd1.state.disabled = false;
		document.supd1.contactPerson.disabled = false;
		document.supd1.cstNo.disabled = false;
		document.supd1.pin.disabled = false;
		document.supd1.branchName.disabled = false;
		document.supd1.tinNo.disabled = false;
		document.supd1.creditLimit.disabled = false;
		document.supd1.email.disabled = false;
		document.supd1.bankName.disabled = false;
		document.supd1.accountNo.disabled = false;
		document.supd1.ifscCode.disabled = false;
		document.supd1.paymentType.disabled = false;
		document.supd1.offer.disabled = false;
		document.supd1.brand.disabled = false;
		document.supd1.itPanNo.disabled = false;
		document.supd1.mobileno.disabled = false;
	}	
}
