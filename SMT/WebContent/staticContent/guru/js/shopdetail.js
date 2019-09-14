

function shopdetail1() {

	var shopName= $('#shopName').val();
	var ownerName= $('#ownerName').val();
	var address= $('#address').val();
	var contactNo= $('#contactNo').val();
	var contactPersonName= $('#contactPersonName').val();
	var tinNo= $('#tinNo').val();



	var params= {};


	params ["shopName"] = shopName;
	params ["ownerName"] = ownerName;
	params ["address"] = address;
	params ["contactNo"] = contactNo;
	params ["contactPersonName"] = contactPersonName;
	params ["tinNo"] = tinNo;



	params["methodName"] = "regShop";


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