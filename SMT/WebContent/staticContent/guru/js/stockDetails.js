function validatestock(){


	if ( document.stock.fk_product_id.value == "selected" )
	{  
		alert("Please Select Product Name.");
		return false;
	}

	if ( document.stock.fk_item_details_id.value == "selected" )
	{  
		alert("Please Select Item Name.");
		return false;
	}

	if ( document.stock.poNo.value == "" )
	{  
		alert("Please Enter Product Number.");
		return false;
	}

	var letterNumber = /^[0-9]+$/;  
	if(document.stock.poNo.value.match(letterNumber))   
	{
		if ( document.stock.isSold.value == "selected" )
		{  
			alert("Please Select Yes Or No.");
			return false;
		} 

		if ( document.stock.status.value == "" )
		{  
			alert("Please Enter Status.");
			return false;
		} 
		var letterNumber = /^[a-zA-Z]+$/;  
		if(document.stock.status.value.match(letterNumber))   
		{

			if ( document.stock.isActiveYn.value == "selected" )
			{  
				alert("Please Select Yes Or No.");
				return false;
			} 



		}
		else
		{
			alert("Enter Alphabets Only.");
			return false;
		}

	}
	else
	{
		alert("Enter Numbers Only.");
		return false;
	}

}


function stockDetails(){
	var isActiveYn= $('#isActiveYn').val();
	var isInsertDate= $('#isInsertDate').val();
	var isModifiedDate= $('#isModifiedDate').val();
	var isSold= $('#isSold').val();
	var poNo= $('#poNo').val();
	var status= $('#status').val();
	var fk_product_id= $('#fk_product_id').val();
	var fk_item_details_id= $('#fk_item_details_id').val();
	var fk_item_stock_id= $('#fk_item_stock_id').val();


	var params= {};
	params["isActiveYn"] = isActiveYn;
	params["isInsertDate"] = isInsertDate;
	params["isModifiedDate"] = isModifiedDate;
	params["isSold"] = isSold;
	params["poNo"] = poNo;
	params["status"] = status;
	params["fk_product_id"] = fk_product_id;
	alert(fk_product_id)
	params["fk_item_details_id"] = fk_item_details_id;
	alert(fk_item_details_id)
	params["fk_item_stock_id"] = fk_item_stock_id;
	alert(fk_item_stock_id)

	params["methodName"] = "regStockDetail";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	})}