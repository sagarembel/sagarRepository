function txCreation(){
	var taxType= $('#taxType').val();
	var taxPercentage = $('#taxPercentage').val();
	/*var activeYn = $('#activeYn').val();*/



	var params= {};

	params ["taxType"] = taxType;
	params ["taxPercentage"] = taxPercentage;
	/*params ["activeYn"] = activeYn;*/

	params["methodName"] = "taxCreation";

	$.post('/Fertilizer/jsp/utility/controller.jsp',params,function(data)
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


function reset()
{
	document.txc.reset();	

}
