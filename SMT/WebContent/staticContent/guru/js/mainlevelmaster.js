function mainlevelD(){
	var mainLevelName= $('#mainLevelName').val();
	var activeYn = $('#activeYn').val();
	var levelId=$('#levelId').val();
	var isRootLevel=$('#isRootLevel').val();


	var params= {};

	params ["mainLevelName"] = mainLevelName;
	params ["activeYn"] = activeYn;
	params ["levelId"] = levelId;
	params ["isRootLevel"] = isRootLevel;


	params["methodName"] = "regMainLevelMater";

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


