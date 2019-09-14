function leafcategoryd(){


	if ( document.leafcat.fkRootcatId.value == "selected" )
	{

		alert("Please Select Category Name!!!");
		return false;
	}


	if ( document.leafcat.fkSubcatId.value == "selected" )
	{

		alert("Please Select Sub Category Name!!!");
		return false;
	}

	if ( document.leafcat.leafcatName.value == "" )
	{

		alert("Please Enter Leaf Category Name!!!");
		return false;
	}

	var letterNumber = /^[a-zA-Z]+$/;  
	if(document.leafcat.leafcatName.value.match(letterNumber))   
	{  

		leafcatName();


	}  
	else  
	{   

		alert( "Enter Alphabets only In Leaf Category Column !!!");
		return false;   
	}  


}

function leafcatName(){

	document.leafcat.btn.disabled = true;

	var fkRootcatId=$('#fkRootcatId').val();
	var fkSubcatId=$('#fkSubcatId').val();
	var leafcatName=$('#leafcatName').val();

	var input = document.getElementById('fkRootcatId'),
	list = document.getElementById('fkRootcatId_drop'),
	i,fkRootcatId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootcatId = list.options[i].getAttribute('data-value');
		}
	}

	//alert(fkRootcatId+"hgh");

	var input = document.getElementById('fkSubcatId'),
	list = document.getElementById('fkSubcatId_drop'),
	i,fkSubcatId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkSubcatId = list.options[i].getAttribute('data-value');
		}
	}

	//alert(fkSubcatId+"hgh");

	var params= {};

	params ["fkRootcatId"] = fkRootcatId;
	params ["fkSubcatId"] = fkSubcatId;
	params ["leafcatName"] = leafcatName;

	params["methodName"] = "regLeafCategory";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.getElementById) 
		{
			document.leafcat.reset();
		}
		document.leafcat.btn.disabled = false;
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}


