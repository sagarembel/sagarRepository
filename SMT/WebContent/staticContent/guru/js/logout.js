function Logout(){

	var params = {};

	params["methodName"] = "logout";

	$.post('/Fertilizer/jsp/utility/controller.jsp',params,function(data)
			{   

		alert (" Ur r logged Out Successfully!!!");
		window.location.replace("/Fertilizer/jsp/login.jsp");

			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}


function login(){
	var uname = $("#uname").val();
	var pass = $("#pass").val();

	var params = {};

	params["uname"] = uname;
	params["pass"] = pass;

	params["methodName"] = "login";

	$.post('/Fertilizer/jsp/utility/controller.jsp',params,function(data)
			{   

		window.location.replace("/Fertilizer/jsp/customerBill.jsp");

			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}
