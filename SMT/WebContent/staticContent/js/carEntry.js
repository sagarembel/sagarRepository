function validateCarEntry(){

	var carNo = $('#carNo').val();
	var contactNo = $('#contactNo').val();
	var ownerName = $('#ownerName').val();
	var monoPattern = /^\d{10}$/;
	var monoPatternRes = monoPattern.test(contactNo);
	var OwnerNamePattern = /^[a-zA-Z ]{2,50}$/;
	var OwnerNamePatternRes = OwnerNamePattern.test(ownerName);

	if(carNo != null && carNo != "" && carNo != " ")
	{
		if(contactNo != null && contactNo != "" && contactNo != " ")
		{
			if(monoPatternRes){
				if(ownerName != null && ownerName != "" && ownerName != " ")
				{
					if(OwnerNamePatternRes){
						carentry();
					}
					else{
						alert("Enter only Name without Special Symbols and digit ! name must be in between 2 - 50 character");
					}
				}
				else{
					alert("Please Enter Owner Name !");
				}
			}
			else{
				alert("Enter valid 10 digit Moible number");
			}
		}
		else{
			alert("Please Enter contact no number !");
		}
	}
	else{
		alert("Please Enter car number !");
	}

}

function carentry(){

	document.getElementById("createbtn").disabled =true;

	var carNo = $('#carNo').val();
	var contactNo = $('#contactNo').val();
	var ownerName = $('#ownerName').val();

	var params = {};

	params["carNo"] = carNo;
	params["contactNo"] = contactNo;
	params["ownerName"] = ownerName;

	params["methodName"] = "carEntry";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		location.reload();
		document.getElementById("createbtn").disabled =false;
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}