function productDetails()
{
	if(document.prd.fk_cat_id.value == "selected")
	{
		alert("Please select Product Category");
		return false;
	}	
	if(document.prd.productName.value == "")
	{
		alert("Enter Product Name.");
		return false;
	}	
	var letterNumber = /^[a-zA-Z]+$/;
	if(document.prd.productName.value.match(letterNumber))
	{
		if(document.prd.manufacturingCompany.value == "")
		{
			alert("Enter Manufacturing Company Name.");
			return false;
		}	
		var letterNumber = /^[a-zA-Z]+$/;
		if(document.prd.manufacturingCompany.value.match(letterNumber))
		{
			if ( document.prd.fk_supplier_id.value == "" )
			{

				alert("Please Select Supplier...!!!");
				return false;
			}

			if ( document.prd.price.value == "" )
			{
				alert("Please Enter price");
				return false;
			}
			var letterNumber = /^[0-9]+$/;
			if(document.prd.price.value.match(letterNumber))
			{

				if(document.prd.fk_tax_id.value == "selected")
				{
					alert("Please select Tax type");
					return false;
				}	
				if ( document.prd.expireDate.value == "" )
				{

					alert("Please Enter Expiry Date...!!!");
					return false;
				}

				if ( document.prd.specialPrice.value == "" )
				{
					alert("Please Enter Special price");
					return false;
				}
				var letterNumber = /^[0-9]+$/;
				if(document.prd.specialPrice.value.match(letterNumber))
				{
					prdctDetails();
				}

				else
				{
					alert("Enter only Numbers in special price field..!!");
					return false;
				}
			}	

			else
			{
				alert("Enter Numbers Only in price field..!!");
				return false;
			}
		}

		else
		{
			alert("Enter Alphabates Only in Manufacturing company field..!!");
			return false;
		}	
	}


	else
	{
		alert("Enter Alphabets Only in Product Name field..!!");
		return false;
	}
}

function prdctDetails(){

	document.prd.btn.disabled = true;

	var fk_cat_id= $('#fk_cat_id').val();
	var productName= $('#productName').val();
	var manufacturingCompany= $('#manufacturingCompany').val();
	var expireDate = $('#expireDate').val();
	var price=$('#price').val();
	var fk_tax_id=$('#fk_tax_id').val();
	var specialPrice=$('#specialPrice').val();
	var taxPercentage=$('#taxPercentage').val();
	var fk_supplier_id=$('#fk_supplier_id').val();


	var params = {};

	params["fk_cat_id"] = fk_cat_id;
	params["productName"] =productName;
	params["manufacturingCompany"] =manufacturingCompany;
	params["expireDate"] = expireDate;
	params["price"] =price;
	params["fk_tax_id"] = fk_tax_id;
	params["specialPrice"] = specialPrice;
	params["taxPercentage"] = taxPercentage;
	params["fk_supplier_id"] = fk_supplier_id;


	params["methodName"] = "proDetails";

	$.post('/Fertilizer/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.prd)
		{
			document.prd.reset();
		}	
		document.prd.btn.disabled =false;
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
	document.prd.reset();	

}
