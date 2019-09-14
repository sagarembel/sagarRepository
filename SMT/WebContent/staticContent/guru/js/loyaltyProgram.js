function lolp(){
	var firstName= $('#firstName').val();
	var middleName= $('#middleName').val();
	var lastName= $('#lastName').val();
	var gender= $('#gender').val();
	var maritalStatus= $('#maritalStatus').val();
	var dob= $('#dob').val();
	var anniversary= $('#anniversary').val();
	var address= $('#address').val();
	var landmark= $('#landmark').val();
	var state= $('#state').val();
	var district= $('#district').val();
	var city= $('#city').val();
	var pinCode= $('#pinCode').val();
	var mobileNo= $('#mobileNo').val();
	var emailID= $('#emailID').val();
	var cardType= $('#cardType').val();
	var cardNumber= $('#cardNumber').val();
	var cardPoints= $('#cardPoints').val();
	var voucher= $('#voucher').val();

	var params= {};
	params["firstName"] = firstName;
	params["middleName"] = middleName;
	params["lastName"] = lastName;
	params["gender"] = gender;
	params["maritalStatus"] = maritalStatus;
	params["dob"] = dob;
	params["anniversary"] = anniversary;
	params["address"] = address;
	params["landmark"] = landmark;
	params["state"] = state;
	params["district"] = district;
	params["city"] = city;
	params["pinCode"] = pinCode;
	params["mobileNo"] = mobileNo;
	params["emailID"] = emailID;
	params["cardType"] = cardType;
	params["cardNumber"] = cardNumber;
	params["cardPoints"] = cardPoints;
	params["voucher"] = voucher;

	alert("hsshsgd")
	params["methodName"] = "regLoyalityProgram";

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