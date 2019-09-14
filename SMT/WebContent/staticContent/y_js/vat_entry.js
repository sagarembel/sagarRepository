function vatValidation()
{
	var fromPrice= $('#fromPrice').val();
	var toPrice= $('#toPrice').val();
	var vatName= $('#vatName').val();
	var vatPer= $('#vatPer').val();
	
	var checkRange = /^[0-9]+\.?[0-9]*$/;
	var vatPerPattern = /^[a-z0-9]+$/i;
	var vatPerPatternRes = vatPerPattern.test(vatPer);
	
	if(fromPrice == null || fromPrice == "" || fromPrice == " " || fromPrice == undefined)
	{
		alert("Please Enter From Price");
		return false;
	}
	else
	{
		if(fromPrice.match(checkRange))
		{}
		else
		{
			alert("Please Enter Valid From Price");
			return false;
		}
	}
	
	
	if(toPrice == null || toPrice == "" || toPrice == " " || toPrice == undefined)
		{
			alert("Please Enter To Price");
			return false;
		}
	else	
	{
		if(toPrice.match(checkRange))
		{}
		else
		{
			alert("Please Enter Valid To Price");
			return false;
		}
	}
	
	if(Number(fromPrice) > Number(toPrice))
	{
		alert("To Price Must be Less Than From Price");
		return false;
	}	
	
	if(vatName == null || vatName == "" || vatName == " " || vatName == undefined)
		{
			alert("Please Enter Tax Name");
			return false;
		}
	else
	{
		if(vatName.match(vatPerPattern))
		{}
		else
		{
			alert("Please Enter Valid Tax Name");
			return false;
		}
	}
	
	
	if(vatPer == null || vatPer == "" || vatPer == " " || vatPer == undefined)
		
		{
			alert("Please Enter tax Percentage");
			return false;
		}
	else
	{
		if(vatPer.match(checkRange))
		{}
		else
		{
			alert("Please Enter Valid Tax Percentage");
			return false;
		}
	}

	
	vatEntry();	
}

function vatEntry(){
	document.getElementById("btnSubmit").disabled =true;
	var vatName = $('#vatName').val();
	var vatPer = $('#vatPer').val();
	var fromPrice = $('#fromPrice').val();
	var toPrice = $('#toPrice').val();
	var params = {};
	params["vatName"] = vatName;
	params["vatPer"] = vatPer;
	params["fromPrice"] = fromPrice;
	params["toPrice"] = toPrice;
	params["methodName"] = "vatEntry";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		location.reload();
		document.getElementById("btnSubmit").disabled =false;
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}
