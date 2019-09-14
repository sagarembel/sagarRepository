function coupondetails(){
	if(document.coupon.couponName.value == "")
	{
		alert("Enter Coupon Name.");
		return false;
	}	
	var letterNumber = /^[a-zA-Z]+$/;
	if(document.coupon.couponName.value.match(letterNumber))
	{
		if(document.coupon.couponCode.value == "")
		{
			alert("Enter Coupan Code.");
			return false;
		}
		var letterNumber = /^[0-9]+$/;
		if(document.coupon.couponCode.value.match(letterNumber))
		{
			if(document.coupon.couponType.value == "selected")
			{
				alert("Select Coupon Type.");
				return false;
			}
			if(document.coupon.discountAmount.value == "")
			{
				alert("Enter Discount Amount.");
				return false;
			}
			var letterNumber = /^[0-9]+$/;
			if(document.coupon.discountAmount.value.match(letterNumber))
			{
				if(document.coupon.percentageDiscount.value == "")
				{
					alert("Enter Percentage Discount.");
					return false;
				}
				var letterNumber = /^[0-9]+([.][0-9]+)?$/;
				if(document.coupon.percentageDiscount.value.match(letterNumber))
				{
					if(document.coupon.isSingleUse.value == "selected")
					{
						alert("Please Select Single Use.");
						return false;
					}
					if(document.coupon.isMultipleUse.value == "selected")
					{
						alert("Please Select Multiple Use.");
						return false;
					}

					if(document.coupon.startDate.value == "")
					{
						alert("Enter Start Date.");
						return false;
					}
					if(document.coupon.createdBy.value == "")
					{
						alert("Please Enter Creater Name.");
						return false;
					}
					var letterNumber = /^[a-zA-Z]+$/;
					if(document.coupon.createdBy.value.match(letterNumber))
					{
						coupandetail1();
					}
					else
					{
						alert("Enter Alphabets Only In Created By Column.");
						return false;
					}
				}
				else
				{
					alert("Enter Numbers Only In Percentage Column.");
					return false;
				}
			}
			else
			{
				alert("Enter Numbers Only In Discount Module Column.");
				return false;
			}
		}
		else
		{
			alert("Enter Correct Coupon Code.");
			return false;
		}
	}
	else
	{
		alert("Enter Correct Coupon Namber.");
		return false;
	}
}			

function coupondetail1(){	
	document.coupon.btn.disabled = true;	

	var couponName = $('#couponName').val();
	var couponCode = $('#couponCode').val();
	var couponType = $('#couponType').val();
	var isSingleUse = $('#isSingleUse').val();
	var isMultipleUse = $('#isMultipleUse').val();
	var createdBy = $('#createdBy').val();
	var discountAmount = $('#discountAmount').val();
	var percentageDiscount = $('#percentageDiscount').val();
	var startDate = $('#startDate').val();
	var endDate = $('#endDate').val();

	var params = {};

	params["couponName"] = couponName;
	params["couponCode"] = couponCode;
	params["couponType"] = couponType;
	params["isSingleUse"] = isSingleUse;
	params["isMultipleUse"] = isMultipleUse;
	params["createdBy"] =createdBy;
	params["discountAmount"] =discountAmount;
	params["percentageDiscount"] =percentageDiscount;
	params["startDate"] =startDate;
	params["endDate"] =endDate;

	params["methodName"] = "regCouponDetails";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.coupon) 
		{
			document.coupon.reset();
		}
		document.coupon.btn.disabled = false;
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
	document.coupon.reset();	
}

