function categoryd(){

	if ( document.subcat.fkRootcatId.value == "" )
	{

		alert("Please Select Category Name.");
		return false;
	}

	if ( document.subcat.subcatName.value == "" )
	{

		alert("Please Enter Sub Category Name.");
		return false;
	}

	var letterNumber = /^[a-zA-Z]+$/;  
	if(document.subcat.subcatName.value.match(letterNumber))   
	{  
		subcate();
	}  
	else  
	{   
		alert( "Enter Alphabets only.");
		return false;   
	}  
}

function subcate(){
	document.subcat.btn.disabled = true;
	var subcatName= $('#subcatName').val();
	var activeYn = $('#activeYn').val();
	var isLeafCatId=$('#isLeafCatId').val();
	var isrootCat =$('#isrootCat').val();
	var input = document.getElementById('fkRootcatId'),
	list = document.getElementById('fkRootcatId_drop'),
	i,fkRootcatId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootcatId = list.options[i].getAttribute('data-value');
		}
	}


	var params= {};

	params ["subcatName"] = subcatName;
	params ["activeYn"] = activeYn;
	params ["isLeafCatId"] = isLeafCatId;
	params ["isrootCat"] = isrootCat;
	params ["fkRootcatId"] = fkRootcatId;


	params["methodName"] = "reNameSubCategory";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.getElementById) 
		{
			document.subcat.reset();
		}
		document.subcat.btn.disabled = false;

			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}


