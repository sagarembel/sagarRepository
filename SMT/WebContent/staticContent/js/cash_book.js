function validateCashBook(){

	var paymenttonameid = $('#paymenttonameid').val();  
	var itemNames = $('#itemNames').val();
	var paymentTypeId = $('#paymentTypeId').val();
	var paymebtById = $('#paymebtById').val();
	var paymentAmountId = $('#paymentAmountId').val();
	var paymentReasonId = $('#paymentReasonId').val();
	var chequeNoId = $('#chequeNoId').val();
	var chequeDateId = $('#chequeDateId').val();
	var cardNoId = $('#cardNoId').val();
	var neftAccNoId = $('#neftAccNoId').val();
	var amountPattern = /^-?\d*(\.\d+)?$/;
	var amountPatternRes = amountPattern.test(paymentAmountId);

	if(paymenttonameid != null && paymenttonameid != "" && paymenttonameid != " ")
	{
		if(itemNames != null && itemNames != "" && itemNames != " ")
		{
			if(paymebtById != null && paymebtById != "" && paymebtById != " ")
			{
				if(paymentAmountId != null && paymentAmountId != "" && paymentAmountId != " ")
				{
					if(amountPatternRes)
					{
						if(paymentReasonId != null && paymentReasonId != "" && paymentReasonId != " ")
						{
							if(paymentTypeId != null && paymentTypeId != "" && paymentTypeId != " ")
							{
								//internal validation for payment By field
								if(paymebtById == "cheque")
								{
									if(chequeNoId != null && chequeNoId != "" && chequeNoId != " "){
										if(chequeDateId != null && chequeDateId != "" && chequeDateId != " "){
											cashBook();
										}
										else{
											alert("Please select cheque date !");
										}
									}
									else{
										alert("Please Enter cheque number !");
									}
								}
								if(paymebtById == "card"){

									if(cardNoId != null && cardNoId != "" && cardNoId != " "){
										cashBook();
									}
									else{
										alert("Please Enter card number !");
									}
								}
								if(paymebtById == "neft")
								{
									if(neftAccNoId != null && neftAccNoId != "" && neftAccNoId != " "){
										cashBook();
									}
									else{
										alert("Please Enter NEFT account number !");
									}
								}
								if(paymebtById == "cash")
								{
									cashBook();
								}

							}
							else{
								alert("Please Enter payment type field !");
							}
						}
						else{
							alert("Please Enter payment reason !");
						}
					}
					else{
						alert("Enter amount only in number or digit witout any space and special symbols");
					}
				}
				else{
					alert("Please Enter amount !");
				}
			}
			else{
				alert("Please Select Payment By field !");
			}
		}
		else{
			alert("Please Select name field !");
		}
	}
	else{
		alert("Please Select Paymen to field !");
	}

}

function cashBook()
{
	document.cashbook.saveButton.disabled = true;

	var payToId = $('#paymenttonameid').val();
	var toPayNameId = $('#itemNames').val();
	var paymentDate = $('#paymentDate').val();
	var paymentTypeId = $('#paymentTypeId').val();
	var paymebtById = $('#paymebtById').val();
	var chequeNoId = $('#chequeNoId').val();
	var chequeDateId = $('#chequeDateId').val();
	var cardNoId = $('#cardNoId').val();
	var neftAccNoId = $('#neftAccNoId').val();	
	var paymentAmountId = $('#paymentAmountId').val();
	var paymentReasonId = $('#paymentReasonId').val();

	var params = {};

	params['payToId'] = payToId;	
	params['toPayNameId'] = toPayNameId;
	params['paymentDate'] = paymentDate;
	params['paymentTypeId'] = paymentTypeId;
	params['paymebtById'] = paymebtById;
	params['chequeNoId'] = chequeNoId;
	params['chequeDateId'] = chequeDateId;
	params['cardNoId'] = cardNoId;
	params['neftAccNoId'] = neftAccNoId;	
	params['paymentAmountId'] = paymentAmountId;
	params['paymentReasonId'] = paymentReasonId;

	params["methodName"] = "addCashBook";

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

function cheak()
{
	var x = document.getElementById("paymenttonameid").value;	
	if(x=="employee")
	{
		$("#itemNames").empty();
		$("#itemNames").append($("<option></option>").attr("value","").text("Select Employee Name"));
		var params= {};
		params["methodName"] = "getEmlpToPayment";
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				$("#itemNames").append($("<option></option>").attr("value",v.firstName).text(v.firstName + " "+v.lastName));
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
					}
				}); 	
	}
	if(x=="supplier")	 
	{		 
		$("#itemNames").empty();
		$("#itemNames").append($("<option></option>").attr("value","").text("Select Supplier Name"));
		var params= {};
		params["methodName"] = "getSupplierToPayment";
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				$("#itemNames").append($("<option></option>").attr("value",v.supplierName).text(v.supplierName)); 
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
	}

	if(x=="customer")	 
	{
		$("#itemNames").empty();
		$("#itemNames").append($("<option></option>").attr("value","").text("Select Customer Name"));
		var params= {};
		params["methodName"] = "getCustomer";
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				$("#itemNames").append($("<option></option>").attr("value",v.firstName+" "+v.lastName).text(v.firstName+" "+v.lastName)); 
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
					}
				});
	}
}