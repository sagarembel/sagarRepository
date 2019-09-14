function customerDetails(){
	if(document.cstd.firstName.value == "")
	{
		alert("Enter Employee First Name.");
		return false;
	}	
	var letterNumber = /^[a-zA-Z]+$/;
	if(document.cstd.firstName.value.match(letterNumber))
	{
		if(document.cstd.middleName.value == "")
		{
			alert("Enter Employee Middle Name.");
			return false;
		}	
		var letterNumber = /^[a-zA-Z]+$/;
		if(document.cstd.middleName.value.match(letterNumber))
		{
			if(document.cstd.lastName.value == "")
			{
				alert("Enter Employee Last Name.");
				return false;
			}	
			var letterNumber = /^[a-zA-Z]+$/;
			if(document.cstd.lastName.value.match(letterNumber))
			{
				if ( document.cstd.contactNo.value == "" )
				{
					alert("Please Enter Contact Number");
					return false;
				}
				var letterNumber = /^[0-9]+$/;
				if(document.cstd.contactNo.value.match(letterNumber))
				{
					if(document.cstd.address.value == "")
					{
						alert("Please Enter Employee Address.");
						return false;
					}	
					var letterNumber = /^[a-zA-Z]+$/;
					if(document.cstd.address.value.match(letterNumber))
					{
						if ( document.cstd.zipCode.value == "" )
						{

							alert("Please Enter Zip Code");
							return false;
						}
						var letterNumber = /^[0-9]+$/;
						if(document.cstd.zipCode.value.match(letterNumber))
						{
							custDetails();
						}
						else
						{
							alert("Enter Numbers Only in zip code field..!!");
							return false;
						}
					}
					else
					{
						alert("Enter Alphabates Only in address field..!!");
						return false;
					}	
				}
				else
				{
					alert("Enter Numbers Only in contact number field..!!");
					return false;
				}	
			}
			else
			{
				alert("Enter Alphabets Only in last name field..!!");
				return false;
			}
		}
		else
		{
			alert("Enter Alphabets Only in middle name field..!!");
			return false;
		}
	}
	else
	{
		alert("Enter Alphabets Only in first name field..!!");
		return false;
	}
}	

function custDetails(){

	document.cstd.btn.disabled = true;

	var firstName = $('#firstName').val();
	var middleName = $('#middleName').val();
	var lastName = $('#lastName').val();
	var address = $('#address').val();
	var contactNo  = $('#contactNo').val();
	var emailId = $('#emailId').val();
	var zipCode = $('#zipCode').val();

	var params = {};

	params["firstName"] =firstName;
	params["middleName"] =middleName;
	params["lastName"] =lastName;
	params["address"] = address;
	params["contactNo"] =contactNo;
	params["emailId"] = emailId;
	params["zipCode"] = zipCode;

	params["methodName"] = "customerDetails";

	$.post('/Fertilizer/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.cstd)
		{
			document.cstd.reset();
		}	
		document.cstd.btn.disabled =false;
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
	document.cstd.reset();	

}
