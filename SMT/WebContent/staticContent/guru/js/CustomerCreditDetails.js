function customerCredit()
{
	if(document.custcred.billDate.value == "")
	{
		alert("please select Date...!!!");
		return false;
	}
	if(document.custcred.billNo.value == "")
	{
		alert("Please enter Bill No...!!!");
		return false;
	}	
	var letterNumber = /^[0-9]+$/;
	if(document.custcred.billNo.value.match(letterNumber))
	{
		if(document.custcred.name.value == "")
		{
			alert("please enter first name...!!!");
			return false;
		}
		var letterNumber = /^[a-zA-Z]+$/;  
		if(document.custcred.name.value.match(letterNumber)) 
		{
			if(document.custcred.middleName.value == "")
			{
				alert("please enter middle name...!!!");
				return false;
			}
			var letterNumber = /^[a-zA-Z]+$/;  
			if(document.custcred.middleName.value.match(letterNumber)) 
			{
				if(document.custcred.lastName.value == "")
				{
					alert("please enter last name...!!!");
					return false;
				}
				var letterNumber = /^[a-zA-Z]+$/;  
				if(document.custcred.lastName.value.match(letterNumber)) 
				{
					if(document.custcred.address.value == "")
					{
						alert("please enter address...!!!");
						return false;
					}
					var letterNumber = /^[a-zA-Z0-9\.]+$/;  
					if(document.custcred.address.value.match(letterNumber)) 
					{
						if(document.custcred.landmark.value == "")
						{
							alert("please enter landmark...!!!");
							return false;
						}
						var letterNumber = /^[a-zA-Z0-9\.]+$/;  
						if(document.custcred.landmark.value.match(letterNumber))
						{
							if(document.custcred.state.value == "selected")
							{
								alert("please select state...!!!");
								return false;
							}
							if(document.custcred.district.value == "selected")
							{
								alert("please select district...!!!");
								return false;
							}
							if(document.custcred.city.value == "selected")
							{
								alert("please select city...!!!");
								return false;
							}
							if(document.custcred.pinCode.value == "")
							{
								alert("please enter pincode...!!!");
								return false;
							}
							var letterNumber = /^[0-9]+$/;  
							if(document.custcred.pinCode.value.match(letterNumber))
							{
								if(document.custcred.mobileNo.value == "")
								{
									alert("please enter mobile no...!!!");
									return false;
								}
								var letterNumber = /^[0-9]+$/;  
								if(document.custcred.mobileNo.value.match(letterNumber))
								{
									if(document.custcred.emailId.value == "")
									{
										alert("Please enter email id..!!");
										return false;
									}	
									var letterNumber = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
									if(document.custcred.emailId.value.match(letterNumber))
									{
										if(document.custcred.referedBy.value == "")
										{
											alert("please enter mobile no...!!!");
											return false;
										}
										var letterNumber = /^[a-zA-Z]+$/;  
										if(document.custcred.referedBy.value.match(letterNumber))
										{
											custcreditd();
										}	
										else
										{
											alert("enter alphabets only in refernce by Column...!!!");
											return false;
										}	
									}	 
									else
									{
										alert("not a valid email...!!");
									}	 
								}
								else
								{
									alert("enter numbers only in mobile no Column...!!!");
									return false;
								}	
							}
							else
							{
								alert("enter numbers only in pincode Column...!!!");
								return false;
							}	
						}
						else
						{
							alert("enter alphabets and numbers only in Landmaek Column..");
							return false;
						}	
					}
					else
					{
						alert("Enter alphabets and numbers only in Address Column.");
						return false;
					}	
				}
				else
				{
					alert("Enter Alphabets Only in last name Column...!!");
					return false;
				}	
			}
			else
			{
				alert("Enter Alphabets Only in middle name Column...!!");
				return false;
			}	
		}	
		else
		{
			alert("Enter Alphabets Only in First name Column...!!");
			return false;
		}	
	}
	else
	{
		alert("Enter Valid BillNo...!!!");
		return false;
	}	
}	

function custcreditd(){
	document.custcred.btn.disabled = true; 	

	var billDate= $('#billDate').val();
	var billNo= $('#billNo').val();
	var name= $('#name').val();
	var middleName= $('#middleName').val();
	var lastName= $('#lastName').val();
	var address= $('#address').val();
	var landmark= $('#landmark').val();
	var state= $('#state').val();
	var district= $('#district').val();
	var city= $('#city').val();
	var pinCode= $('#pinCode').val();
	var mobileNo= $('#mobileNo').val();
	var emailId= $('#emailId').val();
	var referedBy= $('#referedBy').val();

	var params= {};

	params ["billDate"] = billDate;
	params ["billNo"] = billNo;
	params ["name"] = name;
	params ["middleName"] = middleName;
	params ["lastName"] = lastName;
	params ["address"] = address;
	params ["landmark"] = landmark;
	params ["state"] = state;
	params ["district"] = district;
	params ["city"] = city;
	params ["pinCode"] = pinCode;
	params ["mobileNo"] = mobileNo;
	params ["emailId"] = emailId;
	params ["referedBy"] = referedBy;

	params["methodName"] = "regCustCredit";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{   
		alert(data);
		if(document.custcred)
		{
			document.custcred.reset();
		}
		document.custcred.btn.disabled = false;
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
	document.custcred.reset();	
}