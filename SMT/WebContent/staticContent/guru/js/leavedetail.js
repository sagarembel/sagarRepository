function leaved(){



	if ( document.leave.emp_id.value == "selected" )
	{
		alert("Please Select Employee ID.");
		return false;
	}	

	if ( document.leave.typeofleave.value == "selected" )
	{
		alert("Please Select Type Of Leave..!!");
		return false;
	}

	if ( document.leave.fdate.value == "" )
	{
		alert("Please Select Leave Start Date..!!");
		return false;
	}

	if ( document.leave.tdate.value == "" )
	{
		alert("Please Select Leave End Date..!!");
		return false;
	}

	if ( document.leave.reason.value == "" )
	{

		alert("Please Enter Reason of Leave.");
		return false;
	}

	var letterNumber = /^[a-zA-Z]+$/;  
	if(document.leave.reason.value.match(letterNumber))
	{
		if ( document.leave.approvedBy.value == "" )
		{

			alert("Please Enter Who approved the Leave.");
			return false;
		}

		var letterNumber = /^[a-zA-Z]+$/;  
		if(document.leave.approvedBy.value.match(letterNumber))
		{

			leavede();

		}
		else
		{
			alert("Enter Alphabets Only..!!");
			return false;
		}	
	}
	else
	{
		alert("Enter Alphabets Only...!!");
	}	

}	


function leavede(){

	var emp_id= $('#emp_id').val();
	var empName= $('#empName').val();
	var typeofleave= $('#typeofleave').val();
	var fdate= $('#fdate').val();
	var tdate= $('#tdate').val();
	var reason= $('#reason').val();
	var approvedBy= $('#approvedBy').val();

	var params= {};


	params ["emp_id"] = emp_id;
	params ["empName"] = empName;
	params ["typeofleave"] = typeofleave;
	params ["fdate"] = fdate;
	params ["tdate"] = tdate;
	params ["reason"] = reason;
	params ["approvedBy"] = approvedBy;


	params["methodName"] = "regleavede";


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