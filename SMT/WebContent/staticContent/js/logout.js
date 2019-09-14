function Logout()
{	
	document.getElementById("logoutButton").disabled = true;
	var params = {};
	params["methodName"] = "logout";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{   
		window.location.replace("/SMT/jsp/login.jsp");
		alert("Log Out Successfully !!!");
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout")
		{
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function login()
{
	var uname = $("#uname").val();
	var pass = $("#pass").val();
	
	if(uname == "" || uname == null || uname == undefined || uname == " ")
	{
		alert("Please Enter User Name");
		return false;
	}
	if(pass == "" || pass == null || pass == undefined || pass == " ")
	{
		alert("Please Enter Password");
		return false;
	}
	
	var params = {};

	params["uname"] = uname;
	params["pass"] = pass;
	params["methodName"] = "login";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{   
		window.location.replace("/SMT/jsp/index.jsp");
	}
	).error(function(jqXHR, textStatus, errorThrown)
	{
		if(textStatus==="timeout")
		{
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}
//try to allow chrome popup at login time
function allowPopup()
{
	var popup = window.open(winPath,winName,winFeature,true);
	 setTimeout( function() {
	    if(!popup || popup.outerHeight === 0)
	    {
	        //First Checking Condition Works For IE & Firefox
	        //Second Checking Condition Works For Chrome
	        alert("Popup Blocker is enabled! Please add this site to your exception list.");
	         
	    } else {
	        //Popup Blocker Is Disabled
	        window.open('','_self');
	        window.close();
	    } 
	}, 25);
}
