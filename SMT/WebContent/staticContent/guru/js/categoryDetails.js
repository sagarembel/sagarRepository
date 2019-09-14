function catDetails(){
	if(document.catd.categoryName.value == "")
	{
		alert("Enter Category Name Name.");
		return false;
	}	
	var letterNumber = /^[a-zA-Z]+$/;
	if(document.catd.categoryName.value.match(letterNumber))
	{
		categoryDetails();
	}
	else
	{
		alert("Enter Alphabates Only in Category name field..!!");
		return false;
	}	
}

function categoryDetails(){
	document.catd.btn.disabled =true;
	var categoryName = $('#categoryName').val();
	var params = {};

	params["categoryName"] =categoryName;
	params["methodName"] = "categoryDetails";

	$.post('/Fertilizer/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.catd)
		{
			document.catd.reset();
		}	
		document.catd.btn.disabled =false;
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
	document.catd.reset();	

}