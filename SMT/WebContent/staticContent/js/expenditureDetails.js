//Adding expense detail
function addExpenseDetails(){
	if(document.expenseDetails.expenseName.value == "")
	{
		alert("Please Enter Expense Name");
		return false;
	}	
	var letterNumber = /^[a-zA-Z0-9, ]+$/;
	if(document.expenseDetails.expenseName.value.match(letterNumber))
	{
		addExpense();
	}
	else
	{
		alert("Enter Alphabates And Numbers Only in Expense name field..!!");
		return false;
	}	
}

function addExpense() {

	document.expenseDetails.btn.disabled = true;
	var expenseName = $('#expenseName').val();
	var params = {};

	params["expenseName"] = expenseName;
	params["methodName"] = "addExpenseDetails";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) 
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

function reset() {
	document.expenseDetails.reset();
}

function addExpenseForBillingAndGoodsReceive() {

	document.expenseDetails1.btn1.disabled = true;
	var expenseName = $('#expenseNameForBilling').val();
	var params = {};

	params["expenseName"] = expenseName;
	params["methodName"] = "addExpenseDetailsForBilling";

	$.post('/Fertilizer/jsp/utility/controller.jsp', params, function(data) {
		alert(data);
		if (document.expenseDetails1) {
			document.expenseDetails1.reset();
		}
		document.expenseDetails1.btn1.disabled = false;
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}