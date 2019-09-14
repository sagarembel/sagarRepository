//----Hide and show vat Text Box------
function myOnLoadFunction()
{
	$("#HideShowVat").hide();
}

function showVatTextBox()
{
	$("#HideShowVat").show();
}

function hideVatTextBox()
{
	$("#HideShowVat").hide();
}
//validation for cahracter input

function validChar()
{
	var charExp = /^[a-zA-Z]+$/;
	var input = document.getElementById('productName').value();
	if(charExp.test(input))
	{
		alert("not match");
	}
	else
	{
		alert("match");
	}
}