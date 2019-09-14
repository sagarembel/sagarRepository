function userLogin()
{
	var typeId= $('#typeId').val();
	var userName = $('#userName').val();
	var password=$('#password').val();
	var repassword=$('#repassword').val();
	var params= {};

	params ["typeId"] = typeId;
	params ["userName"] = userName;
	params ["password"] = password;
	params ["repassword"] = repassword;

	params["methodName"] = "userLogin";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{   
		alert(data);
		if(document.createuser) 
		{
			document.createuser.reset();
		}
		document.createuser.btn.disabled = false;

			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function check(){
	var abc = document.getElementById("password").value;
	var cd = document.getElementById("repassword").value;
	if(abc !== cd){
		alert("Password Not Match!!");
		return false;
	}
}