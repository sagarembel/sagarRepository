
function clearFormData(formId)
{
	$('#'+formId).find(':input').each(function(){
		var type = this.type, tag = this.tagName.toLowerCase();
		if (type == 'text' || type == 'password' || tag == 'textarea')
			this.value = '';
		else if (type == 'checkbox' || type == 'radio')
			this.checked = false;
		else if (tag == 'select')
			this.selectedIndex = 0;
	})
}
function validateEmail(email)
{

	var emailExp = /^[a-z0-9](([a-z0-9]*[\\._\-][a-z0-9]+)|([a-z0-9])*)*@[a-z0-9]{2,15}\\.[a-z0-9]{2,15}(\\.[a-z0-9]{2,15})*$/;
	var emailId  = email;
	if(!emailId.match(emailExp) || emailId == null || $.trim(emailId) === "" )
	{
		return false;
	}
	return true;
}
function validateNumber(element)
{	
	var numericExpression = /^[0-9]+$/;
	var number = element;
	if(!number.match(numericExpression) )
	{
		return false;
	}
	return true;
}


function  validateMobile(mobNumber)
{
	var numericExpression =  /^([7-9][0-9]{9})$/ ;                   

	if(!mobNumber.match(numericExpression) || mobNumber == null || $.trim(mobNumber) === "" || mobNumber.length < 10 || mobNumber.length > 13 || mobNumber <1000000000)
	{
		return false;
	}
	return true;
}

function onlyCharAllowed(evt) {
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode( key );
	if (key == 8 || key == 27  || key == 46  || key == 37  || key == 39 )// backspace delete  escape arrows 
	{ 
		return;
	}
	var regex = /[a-zA-Z\t\s]/;
	if( !regex.test(key) && theEvent.keyCode!=8) {
		theEvent.returnValue = false;
		if(theEvent.preventDefault) theEvent.preventDefault();
	}

}


function onlyNumberAllowed(evt) {
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode( key );
	if (key == 8 || key == 27  || key == 46  || key == 37  || key == 39 )// backspace delete  escape arrows 
	{ 
		return;
	}
	var regex = /[0-9\t]/;
	if( !regex.test(key) && theEvent.keyCode!=8) {
		theEvent.returnValue = false;
		if(theEvent.preventDefault) theEvent.preventDefault();
	}

}

