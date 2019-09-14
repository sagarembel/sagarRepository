function visitord()
{

	if(document.visit.name.value == "")
	{
		alert("Please Enter Name...!!!");
		return false;
	}

	var letterNumber = /^[a-zA-Z]+$/;  
	if(document.visit.name.value.match(letterNumber)) 
	{

		if(document.visit.contact.value == "")
		{
			alert("Please Enter Contact Number...!!!");
			return false;
		}

		var letterNumber = /^[0-9]+$/;
		if(document.visit.contact.value.match(letterNumber))
		{

			if(document.visit.address.value == "")
			{
				alert("Please Enter Address...!!!");
				return false;
			}

			var letterNumber = /^[a-zA-Z0-9\.]+$/;  
			if(document.visit.address.value.match(letterNumber)) 
			{

				if(document.visit.city.value == "")
				{
					alert("Please Enter City Name...!!!");
					return false;
				}

				var letterNumber = /^[a-zA-Z]+$/;  
				if(document.visit.city.value.match(letterNumber)) 
				{

					if(document.visit.landmark.value == "")
					{
						alert("Please Enter Landmark...!!!");
						return false;
					}

					var letterNumber = /^[a-zA-Z0-9]+$/;  
					if(document.visit.landmark.value.match(letterNumber)) 
					{

						if(document.visit.occu.value == "")
						{
							alert("Please Enter Occcupation...!!!");
							return false;
						}

						var letterNumber = /^[a-zA-Z]+$/;  
						if(document.visit.occu.value.match(letterNumber)) 
						{

							if(document.visit.comname.value == "")
							{
								alert("Please Enter Company Name...!!!");
								return false;
							}

							var letterNumber = /^[a-zA-Z0-9]+$/;  
							if(document.visit.comname.value.match(letterNumber)) 
							{

								if(document.visit.narration.value == "")
								{
									alert("Please Enter Narration...!!!");
									return false;
								}

								var letterNumber = /^[a-zA-Z0-9]+$/;  
								if(document.visit.narration.value.match(letterNumber)) 
								{

									if(document.visit.reminder.value == "")
									{
										alert("Please Enter Current Date...!!!");
										return false;
									}

									visitor();
									/*  var EnteredDate = document.visit.reminder.value; 



							            var date = EnteredDate.substring(0, 2);
							            var month = EnteredDate.substring(3, 5);
							            var year = EnteredDate.substring(6, 10);

							            var myDate = new Date(year, month - 1, date);

							            var today = new Date();

							            if (EnteredDate == today){

							            	visitor();

							            }

							            else
							            {	
							            if (EnteredDate > today) {
							                alert("Entered date is greater than today's date ");
							            }
							            else {
							                alert("Entered date is less than today's date ");
							            }
							            }*/

								}

								else
								{
									alert("Enter Alphabets and Numbers Only in Narration...!!!");
									return false;
								}


							}

							else
							{
								alert("Enter Alphabets and Numbers Only in Company Name");
								return false;
							}	

						}

						else
						{
							alert("Enter Alphabets Only in Occupation");
							return false;
						}	


					}

					else
					{
						alert("Enetr Alphabets and Numbers Only in Landmark ...!!!");
						return false;
					}	


				}

				else
				{
					alert("Enetr Alphabets Only in CIty ...!!!");
					return false;
				}	

			}

			else
			{
				alert("Enetr alphabets and numbers in Addresss");
				return false;
			}	

		}

		else
		{
			alert("Please Numbers Only in Contact");
			return false;
		}	


	}

	else
	{
		alret("Enter Alphabets Only in Name");
		return false;
	}	


}	



function visitor(){

	var name= $('#name').val();
	var contact= $('#contact').val();
	var address= $('#address').val();
	var city= $('#city').val();
	var landmark= $('#landmark').val();
	var occu= $('#occu').val();
	var comname= $('#comname').val();
	var narration= $('#narration').val();
	var reminder= $('#reminder').val();

	var params= {};

	params ["name"] = name;
	params ["contact"] = contact;
	params ["address"] = address;
	params ["city"] = city;
	params ["landmark"] = landmark;
	params ["occu"] = occu;
	params ["comname"] = comname;
	params ["narration"] = narration;
	params ["reminder"] = reminder;



	params["methodName"] = "regVisitor";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.getElementById) 
		{
			document.visit.reset();
		}
		document.visit.btn.disabled = false;

			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	}); 

}





















