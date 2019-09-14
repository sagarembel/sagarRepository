function goEditSubCatagoryFrom()
{
	window.location = "EditSubcategory.jsp";
}

function valsubCat(){
	if ( document.subCat.fkRootcatId.value == "" )
	{
		alert("Please Select Category Name.");
		return false;
	}
	if ( document.subCat.subcategoryName.value == "" )
	{
		alert("Please Enter Sub Category Name.");
		return false;
	}
	var letterNumber = /^[a-zA-Z ]+$/;  
	if(document.subCat.subcategoryName.value.match(letterNumber))   
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
	document.subCat.btn1.disabled = true;
	var subcatName= $('#subcategoryName').val();
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
	params["methodName"] = "regSubCategory";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		location.reload();
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function getsubCategory(){
	var input = document.getElementById('catId'),
	list1 = document.getElementById('catId_drop'),
	i,catId;
	for (i = 0; i < list1.options.length; ++i) {
		if (list1.options[i].value === input.value) {
			catId = list1.options[i].getAttribute('data-value');
		}
	}
	$("#subcatId").empty();
	$("#subcatId").append($("<option></option>").attr("value","").text("Select Sub Category"));
	var params = {};
	params["catId"] =catId;
	params["methodName"] = "getSubCategoriesByRootcategory";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var count = 1;
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			$("#subcatId").append($("<option></option>").attr("value",count).text(v.subCatName+","+v.subCatId));
			count++;
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
				}
			});
}

function reNameSubcategory(){
	document.getElementById("btn").disabled = true;
	subcatId= $('#subcatId').val();

	$("#subcatId option:selected").each(function() {
		selectedVal = $(this).text();
	});

	var splitText = selectedVal.split(",");
	var subcatId = splitText[1];
	var reNameCat= $('#reNameCat').val();
	var params= {};
	params ["reNameCat"] = reNameCat;
	params ["subcatId"] = subcatId;
	params["methodName"] = "reNameSubCategory";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{   
		alert(data);
		location.reload();
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}