function leaflevelmasterD(){
	var subLevelName= $('#subLevelName').val();
	var activeYn= $('#activeYn').val();


	var params= {};

	params ["leafLevelName"] = leafLevelName;
	params ["activeYn"] = activeYn;


	params["methodName"] = "regLeafLevelMater";

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


