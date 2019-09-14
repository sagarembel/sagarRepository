function broker(){

	document.brok.btn.disabled = true;

	var firstName= $('#firstName').val();
	var middleName = $('#middleName').val();
	var lastName=$('#lastName').val();
	var accType=$('#accType').val();
	var contactNumber=$('#contactNumber').val();
	var address=$('#address').val();
	var accNumber=$('#accNumber').val();

	var params= {};

	params ["firstName"] = firstName;
	params ["middleName"] = middleName;
	params ["lastName"] = lastName;
	params ["accType"] = accType;
	params ["contactNumber"] = contactNumber;
	params ["address"] = address;
	params ["accNumber"] = accNumber;

	params["methodName"] = "regBroker";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{   
		alert(data);
		if(document.brok)
		{
			document.brok.reset();
		}	
		document.brok.btn.disabled = false;
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
	document.brok.reset();	
}