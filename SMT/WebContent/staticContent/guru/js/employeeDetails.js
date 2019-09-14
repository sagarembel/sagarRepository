function employeedetails(obj){
	if(document.empd.firstName.value == "")
	{
		alert("Enter Employee First Name.");
		return false;
	}	
	var letterNumber = /^[a-zA-Z]+$/;
	if(document.empd.firstName.value.match(letterNumber))
	{
		if(document.empd.middleName.value == "")
		{
			alert("Enter Employee Middle Name.");
			return false;
		}	
		var letterNumber = /^[a-zA-Z]+$/;
		if(document.empd.middleName.value.match(letterNumber))
		{
			if(document.empd.lastName.value == "")
			{
				alert("Enter Employee Last Name.");
				return false;
			}	
			var letterNumber = /^[a-zA-Z]+$/;
			if(document.empd.lastName.value.match(letterNumber))
			{
				if ( document.empd.joiningDate.value == "" )
				{
					alert("Please Enter Date of Joining");
					return false;
				}
				if ( document.empd.salary.value == "" )
				{
					alert("Please Enter Salary.");
					return false;
				}
				var letterNumber = /^[0-9]+$/;
				if(document.empd.salary.value.match(letterNumber))
				{
					if ( document.empd.contactNo.value == "" )
					{
						alert("Please Enter Contact Number");
						return false;
					}
					var letterNumber = /^[0-9]+$/;
					if(document.empd.contactNo.value.match(letterNumber))
					{
						if(document.empd.address.value == "")
						{
							alert("Please Enter Employee Address.");
							return false;
						}	
						var letterNumber = /^[a-zA-Z]+$/;
						if(document.empd.address.value.match(letterNumber))
						{
							if ( document.empd.zipCode.value == "" )
							{

								alert("Please Enter Pin Code");
								return false;
							}
							var letterNumber = /^[0-9]+$/;
							if(document.empd.zipCode.value.match(letterNumber))
							{
								empDetails();
							}
							else
							{
								alert("Enter Numbers Only in Pin Code..!!");
								return false;
							}
						}
						else
						{
							alert("Enter Alphabates Only in address..!!");
							return false;
						}	
					}

					else
					{
						alert("Enter Numbers Only in contact number..!!");
						return false;
					}	
				}
				else
				{
					alert("Enter Numbers Only in salary..!!");
					return false;
				}
			}
			else
			{
				alert("Enter Alphabets Only in last name..!!");
				return false;
			}
		}
		else
		{
			alert("Enter Alphabets Only in middle name..!!");
			return false;
		}
	}
	else
	{
		alert("Enter Alphabets Only in first name..!!");
		return false;
	}
}	

function empDetails(){
	document.empd.btn.disabled = true;
	var firstName = $('#firstName').val();
	var middleName = $('#middleName').val();
	var lastName = $('#lastName').val();
	var joiningDate = $('#joiningDate').val();
	var salary = $('#salary').val();
	var address = $('#address').val();
	var contactNo  = $('#contactNo').val();
	var emailId = $('#emailId').val();
	var zipCode = $('#zipCode').val();

	var params = {};

	params["firstName"] = firstName;
	params["middleName"] =middleName;
	params["lastName"] =lastName;
	params["joiningDate"] =joiningDate;
	params["salary"] =salary;
	params["address"] = address;
	params["contactNo"] =contactNo;
	params["emailId"] = emailId;
	params["zipCode"] = zipCode;

	params["methodName"] = "regDetails";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.empd)
		{
			document.empd.reset();
		}	
		document.empd.btn.disabled =false;
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
	document.empd.reset();	
}
