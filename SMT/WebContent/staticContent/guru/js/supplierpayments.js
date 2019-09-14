function supllierPayment()
{

	var input = document.getElementById('supplier'),
	list = document.getElementById('sup_drop'),
	i,supplier;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}

	var billNo= $('#billNo').val();
	var totalAmount= $('#totalAmount').val();

	var params= {};

	params ["supplier"] = supplier;
	params ["billNo"] = billNo;
	params ["totalAmount"] = totalAmount;



	params["methodName"] = "regsupplierPayments";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{   
		alert(data);


			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});


}