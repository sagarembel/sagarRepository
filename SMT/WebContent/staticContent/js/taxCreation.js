function taxCreation(){
	var taxType= $('#taxType').val();
	var taxPercentage = $('#taxPercentage').val();
	var activeYn = $('#activeYn').val();



	var params= {};

	params ["taxType"] = taxType;
	params ["taxPercentage"] = taxPercentage;
	params ["activeYn"] = activeYn;

	params["methodName"] = "regTaxCreation";

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

