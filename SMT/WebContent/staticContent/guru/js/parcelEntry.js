function parcelEntry() {
	if(document.parcel.challanNo.value == "")
	{
		alert("Enter Challan No.");
		return false;
	}		
	var letterNumber = /^[0-9]+$/;
	if(document.parcel.challanNo.value.match(letterNumber))
	{
		if(document.parcel.invoiceNo.value == "")
		{
			alert("Enter Invoice No.");
			return false;
		}	
		var letterNumber = /^[0-9]+$/;
		if(document.parcel.invoiceNo.value.match(letterNumber))
		{
			if(document.parcel.supplierName.value == "")
			{
				alert("Supplier Name can't be Blank.");
				return false;
			}
			var letterNumber = /^[a-zA-Z ]+$/;
			if(document.parcel.supplierName.value.match(letterNumber))
			{
				if(document.parcel.transportName.value == "")
				{
					alert("Transport Name can't be Blank.");
					return false;
				}
				var letterNumber = /^[a-zA-Z ]+$/;
				if(document.parcel.transportName.value.match(letterNumber))
				{
					if(document.parcel.invoiceAmount.value == "")
					{
						alert("Enter InVoice Amount.");
						return false;
					}
					var letterNumber = /^[0-9]+$/;
					if(document.parcel.invoiceAmount.value.match(letterNumber))
					{
						if(document.parcel.paidAmount.value == "")
						{
							alert("Enter Paid Amount.");
							return false;
						}	

						var letterNumber = /^[0-9]+([.][0-9]+)?$/;
						if(document.parcel.paidAmount.value.match(letterNumber))
						{
							if(document.parcel.transportFees.value == "")
							{
								alert("Enter Transport Fees Amount.");
								return false;
							}
							var letterNumber = /^[0-9]+([.][0-9]+)?$/;
							if(document.parcel.transportFees.value.match(letterNumber))
							{
								if(document.parcel.checkInBy.value == "")
								{
									alert("Enter Checked in by Name.");
									return false;
								}
								var letterNumber = /^[a-zA-Z ]+$/;
								if(document.parcel.checkInBy.value.match(letterNumber))
								{
									if(document.parcel.checkedBy.value == "")
									{
										alert("Enter Checked by Name.");
										return false;
									}
									var letterNumber = /^[a-zA-Z ]+$/;
									if(document.parcel.checkedBy.value.match(letterNumber))
									{
										if(document.parcel.totalPaid.value == "")
										{
											alert("Enter Total Paid.");
											return false;
										}
										var letterNumber = /^[0-9]+([.][0-9]+)?$/;
										if(document.parcel.totalPaid.value.match(letterNumber))
										{

											parceld();
										}
										else
										{
											alert("Enter Numbers Only.");
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
						else
						{
							alert("Enter Numbers Only.");
							return false;
						}


					}
					else
					{
						alert("Enter Numbers Only.");
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
	else
	{
		alert("Enter Numbers Only.");
		return false;
	}	
}	


function parceld(){

	document.parcel.btn.disabled = true; 

	var invoiceNo = $('#invoiceNo').val();
	var challanNo = $('#challanNo').val();
	var supplierName = $('#supplierName').val();
	var transportName = $('#transportName').val();
	var invoiceAmount = $('#invoiceAmount').val();
	var paidAmount = $('#paidAmount').val();
	var transportFees = $('#transportFees').val();
	var checkInBy = $('#checkInBy').val();
	var totalPaid = $('#totalPaid').val();
	var insertDate = $('#insertDate').val();
	var modifiedDate = $('#modifiedDate').val();
	var checkedBy = $('#checkedBy').val();

	var params = {};


	params["invoiceNo"] = invoiceNo;
	params["challanNo"] = challanNo;
	params["supplierName"] = supplierName;
	params["transportName"] = transportName;
	params["invoiceAmount"] = invoiceAmount;
	params["paidAmount"] = paidAmount;
	params["transportFees"] =transportFees;
	params["checkInBy"] =checkInBy;
	params["totalPaid"] =totalPaid;
	params["insertDate"] =insertDate;
	params["modifiedDate"] =modifiedDate;
	params["checkedBy"] =checkedBy;


	params["methodName"] = "regParcelEntry";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.parcel) 
		{
			document.parcel.reset();
		}
		document.parcel.btn.disabled = false;
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	})



}



