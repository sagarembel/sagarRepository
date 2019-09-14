function otherAccounts(){
	document.acc.btn.disabled = true;
	var accName= $('#accName').val();
	var accNo = $('#accNo').val();
	var accType=$('#accType').val();
	var contactNo=$('#contactNo').val();
	var params= {};

	params ["accName"] = accName;
	params ["accNo"] = accNo;
	params ["accType"] = accType;
	params ["contactNo"] = contactNo;

	params["methodName"] = "regOtherAccounts";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{   
		alert(data);
		if(document.acc) 
		{
			document.acc.reset();
		}
		document.acc.btn.disabled = false;

			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}