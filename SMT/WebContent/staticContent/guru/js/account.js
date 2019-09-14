function accountt(){

	document.acc.btn.disabled= true;

	var totalAmount= $('#totalAmount').val();
	var discount = $('#discount').val();
	var netAmount=$('#netAmount').val();
	var paymentType=$('#paymentType').val();
	var amountPaid= $('#amountPaid').val();
	var amountDue = $('#amountDue').val();
	var due=$('#due').val();
	var fk_superpo_id1=$('#fk_superpo_id1').val();
	var params= {};

	params ["totalAmount"] = totalAmount;
	params ["discount"] = discount;
	params ["netAmount"] = netAmount;
	params ["paymentType"] = paymentType;
	params ["amountPaid"] = amountPaid;
	params ["amountDue"] = amountDue;
	params ["due"] = due;
	params ["fk_superpo_id1"] = fk_superpo_id1;

	params["methodName"] = "regPOAccount";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{   
		alert(data);
		if(document.acc)
		{
			document.acc.reset();
		}	 
		document.acc.btn.disabled = false;

			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function changeAmount(data)
{
	var netamount = document.getElementById("netAmount").value;
	var paidamount = document.getElementById("amountPaid").value;
	amount = netamount - paidamount ;
	document.getElementById("amountDue").value = amount;
}

function   total()
{
	this.getTotalAmmount = getTotalAmmount;

	function getTotalAmmount()
	{
		var mainCat = $("#fk_superpo_id1").val();
		$("#totalAmount").empty();
		$("#totalAmount").append($("<input/>").attr("value","").text("Select podetails"));
		var params= {};
		params["methodName"] = "getTotalAmmountBySuperPOID";
		params["fk_superpo_id1"]= mainCat;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				document.getElementById("totalAmount").value = v.totalAmount;
				//$("#totalAmount").append($("<input/>").attr("value",i).text(v.totalAmount)); 

					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
	}

}
var to = new total();
function reset()
{
	document.acc.reset();	
}