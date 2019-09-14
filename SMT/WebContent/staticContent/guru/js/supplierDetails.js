function supplierDetail(){
	if(document.spld.dealerName.value == "")
	{
		alert("Enter Dealer  Name.");
		return false;
	}	
	var letterNumber = /^[a-zA-Z]+$/;
	if(document.spld.dealerName.value.match(letterNumber))
	{
		if(document.spld.personName.value == "")
		{
			alert("Enter Person Name.");
			return false;
		}	
		var letterNumber = /^[a-zA-Z]+$/;
		if(document.spld.personName.value.match(letterNumber))
		{
			if ( document.spld.contactNo.value == "" )
			{
				alert("Please Enter Contact Number");
				return false;
			}

			var letterNumber = /^[0-9]+$/;
			if(document.spld.contactNo.value.match(letterNumber))
			{
				if(document.spld.city.value == "")
				{
					alert("Please Enter city.");
					return false;
				}	
				var letterNumber = /^[a-zA-Z]+$/;
				if(document.spld.city.value.match(letterNumber))
				{
					if ( document.spld.tinNo.value == "" )
					{

						alert("Please Enter tin Number");
						return false;
					}
					var letterNumber = /^[0-9]+$/;
					if(document.spld.tinNo.value.match(letterNumber))
					{
						if(document.spld.address.value == "")
						{
							alert("Please Enter address.");
							return false;
						}	
						var letterNumber = /^[a-zA-Z]+$/;
						if(document.spld.address.value.match(letterNumber))
						{
							supDetails();
						}
						else
						{
							alert("Enter Alphabates Only in Address field..!!");
							return false;
						}
					}
					else
					{
						alert("Enter Numbers Only in Tin number field..!!");
						return false;
					}
				}
				else
				{
					alert("Enter Alphabates Only in city field..!!");
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
			alert("Enter Alphabets Only in Person name field..!!");
			return false;
		}
	}
	else
	{
		alert("Enter Alphabets Only in Dealer name field..!!");
		return false;
	}
}

function supDetails(){
	document.spld.btn.disabled = true;

	var dealerName = $('#dealerName').val();
	var personName = $('#personName').val();
	var contactNo = $('#contactNo').val();
	var landline = $('#landline').val();
	var emailId = $('#emailId').val();
	var tinNo = $('#tinNo').val();
	var city = $('#city').val();
	var address = $('#address').val();
	var params = {};

	params["dealerName"] = dealerName;
	params["personName"] =personName;
	params["contactNo"] = contactNo;
	params["landline"] =landline;
	params["emailId"] = emailId;
	params["tinNo"] = tinNo;
	params["city"] = city;
	params["address"] = address;

	params["methodName"] = "supplierDetails";

	$.post('/Fertilizer/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.spld)
		{
			document.spld.reset();
		}	
		document.spld.btn.disabled =false;
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
	document.spld.reset();	

}
