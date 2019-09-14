function userDetails(){
	if(document.usd.firstName.value == "")
	{
		alert("Enter Employee First Name.");
		return false;
	}	
	var letterNumber = /^[a-zA-Z]+$/;
	if(document.usd.firstName.value.match(letterNumber))
	{
		if(document.usd.middleName.value == "")
		{
			alert("Enter Employee Middle Name.");
			return false;
		}	
		var letterNumber = /^[a-zA-Z]+$/;
		if(document.usd.middleName.value.match(letterNumber))
		{
			if(document.usd.lastName.value == "")
			{
				alert("Enter Employee Last Name.");
				return false;
			}	
			var letterNumber = /^[a-zA-Z]+$/;
			if(document.usd.lastName.value.match(letterNumber))
			{

				if ( document.usd.contactNo.value == "" )
				{
					alert("Please Enter Contact Number");
					return false;
				}
				var letterNumber = /^[0-9]+$/;
				if(document.usd.contactNo.value.match(letterNumber))
				{
					if(document.usd.address1.value == "")
					{
						alert("Please Enter Employee Address line 1.");
						return false;
					}	
					var letterNumber = /^[a-zA-Z]+$/;
					if(document.usd.address1.value.match(letterNumber))
					{


						if ( document.usd.pan.value == "" )
						{

							alert("Please Enter Pan number...!!!");
							return false;
						}
						var letterNumber = /^[a-zA-Z0-9]+$/;
						if(document.usd.pan.value.match(letterNumber))
						{
							usrDetails();
						}
						else
						{
							alert("Enter Numbers And Alphabates Only in Pan Number field..!!");
							return false;
						}
					}

					else
					{
						alert("Enter Alphabates Only in address line 1 field..!!");
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



function usrDetails(){

	document.usd.btn.disabled = true;

	var firstName = $('#firstName').val();
	var city = $('#city').val();
	var middleName  = $('#middleName').val();
	var lastName  = $('#lastName').val();
	var contactNo = $('#contactNo').val();
	var address1 = $('#address1').val();
	var address2 = $('#address2').val();
	var pan = $('#pan').val();



	var params = {};



	params["firstName"] = firstName;
	params["city"] = city;
	params["middleName"] = middleName;
	params["lastName"] = lastName;
	params["contactNo"] = contactNo;
	params["address1"] = address1;
	params["address2"] =address2;
	params["pan"] =pan;
	params["methodName"] = "regUserDetails";

	$.post('/Fertilizer/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.usd)
		{
			document.usd.reset();
		}	
		document.usd.btn.disabled =false;
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
	document.usd.reset();	

}

