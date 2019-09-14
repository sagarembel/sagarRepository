function myAlert(msg)
{
	var dialog = bootbox.dialog({
		//title: "Embel Technologies Says :",
	   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
	   });
	
	   setTimeout(function()
	  {
		dialog.modal('hide');
	   }, 1500);
}
function addedAlert(msg)
{
	var dialog = bootbox.dialog({
		//title: "Embel Technologies Says :",
	   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
	    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
	    closeButton: false
	   });
	
	   setTimeout(function()
	  {
		dialog.modal('hide');
	   }, 1500);
}

function emptyFields()
{
	document.getElementById("address").value = "";
	document.getElementById("city").value = "";
	document.getElementById("pin").value = "";
	document.getElementById("contactPerson").value = "";
	document.getElementById("email").value = "";
	document.getElementById("mobileno").value = "";
	document.getElementById("panNo").value = "";
	document.getElementById("supplierName").value = "";
	document.getElementById("supplierCode").value = "";
}


function validateSupplierDetails()
{
	var supplierName= $('#supplierName').val();
	var city= $('#city').val();
	var mobileno= $('#mobileno').val();
	var SupplierNamePattern = /^[a-zA-Z ]{2,50}$/;
	var pin=$('#pin').val();
	var checkPin = /^[0-9]+$/;
	var SupplierNamePatternRes = SupplierNamePattern.test(supplierName);
	var monoPattern = /^\d{10}$/;
	var monoPatternRes = monoPattern.test(mobileno);
	
	if(supplierName != null && supplierName != "" && supplierName != " ")
	{
		if(SupplierNamePatternRes){
			if(city != null && city != "" && city != " ")
			{
				if(pin == "" || pin == null || pin == " ")
				{}
				else
				{
					if(pin.match(checkPin))
					{}
					else
					{
						myAlert("Please Enter Only Digits in Pin Code");
						return false;
					}
				}
					if(mobileno != null && mobileno != "" && mobileno != " ")
					{
						if(monoPatternRes)
						{
							supplierDetails();
						}
						else{
							myAlert("Enter Valid 10 Digit Moible Number");
							return false;
						}
					}
					else{
						myAlert("Please Enter mobile number !");
						return false;
					}
				}
			else{
				myAlert("Please Enter City Name !");
				return false;
			}
		}
		else{

			myAlert("Enter only Name without Special Symbols and digit ! name must be in between 2 - 50 character");
			return false;
		}
	}
	else{
		myAlert("Please Enter Supplier Name !");
		return false;
	}
}

function supplierDetails()
{
	if(document.supd)
	{
		document.supd.btn.disabled = true;
	}
	var supplierName= $('#supplierName').val();
	var address = $('#address').val();
	var city=$('#city').val();
	var contactPerson = $('#contactPerson').val();
	var pin=$('#pin').val();
	var email=$('#email').val();
	var mobileno=$('#mobileno').val();
	var panNo=$('#panNo').val();
	var supCode = $('#supplierCode').val();
	var popJspId = $('#popJspId').val();
	var vatName = $('#vatName').val();
	var params= {};

	params ["supplierName"] = supplierName;
	params ["city"] = city;
	params ["address"] = address;
	params ["contactPerson"] = contactPerson;
	params ["pin"] = pin;
	params ["email"] = email;
	params ["mobileno"] = mobileno;
	params ["panNo"] = panNo;
	params ["supCode"] = supCode;
	params ["vatName"] = vatName;

	params["methodName"] = "doSupplierDetails";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		if(document.good) 
		{
			if(popJspId == "POPUPSUPPDATAILS")
			{
				addedAlert("Supplier Added Successfully");
				suppDetailsDivAction(0);
				document.getElementById("address").value = "";
				document.getElementById("city").value = "";
				document.getElementById("pin").value = "";
				document.getElementById("contactPerson").value = "";
				document.getElementById("email").value = "";
				document.getElementById("mobileno").value = "";
				document.getElementById("panNo").value = "";
				document.getElementById("supplierName").value = "";
				document.getElementById("supplierCode").value = "";
			}
		}
		else if(document.supd)
		{
			alert(data);
			document.supd.reset();
			document.supd.btn.disabled = false;
		}
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}

function disablecst(){

	if(document.supd.tinNo.value !== "")
	{
		document.supd.cstNo.disabled = true;
		return false;
	}
	else
	{
		document.supd.cstNo.disabled = false;
		return false;
	}	

}	

function disabletin(){

	if(document.supd.cstNo.value !== "")
	{
		document.supd.tinNo.disabled = true;
		return false;
	}	
	else
	{
		document.supd.tinNo.disabled = false;
		return false;
	}	

}	

function editsupplier()
{
	this.getSupp = getSupp;

	function getSupp()
	{
		var mainCat = $("#supplierName").val();
		$("#address").append($("<input/>").attr("value","").text());
		$("#city").append($("<input/>").attr("value","").text());
		$("#pin").append($("<input/>").attr("value","").text());
		$("#contactPerson").append($("<input/>").attr("value","").text());
		$("#email").append($("<input/>").attr("value","").text());
		$("#mobileno").append($("<input/>").attr("value","").text());
		$("#panNo").append($("<input/>").attr("value","").text());
		$("#supplierName1").append($("<input/>").attr("value","").text());
		$("#supplierCode").append($("<input/>").attr("value","").text());
		var params= {};
		params["methodName"] = "getSupplier";
		params["supplierName"]= mainCat;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(jsonData,function(i,v)
			{
				document.getElementById("address").value = v.address;
				document.getElementById("city").value = v.city;
				document.getElementById("pin").value = v.pin;
				document.getElementById("contactPerson").value = v.contactPerson;
				document.getElementById("email").value = v.email;
				document.getElementById("mobileno").value = v.mobileno;
				document.getElementById("panNo").value = v.panNo;
				document.getElementById("supplierName1").value = v.supplierName;
				document.getElementById("supplierCode").value = v.suppCode;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
					}
				});
	}

}
var es = new editsupplier();

function getAllMAinSupp(){
	var params= {};
	params["methodName"] = "getAllMAinSupp";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#suppName').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {
			var total =   $('#suppName').DataTable( {

				dom: 'Bfrtip',
				buttons: [
				          			          
				          {
				                extend: 'copyHtml5',
				                title: 'Supplier List'
				            },
				            {
				                extend: 'csvHtml5',
				                title: 'Supplier List'
				            },
				            {
				                extend: 'excelHtml5',
				                title: 'Supplier List'
				            },
				            {
				                extend: 'pdfHtml5',
				                title: 'Supplier List',
				            }, /*'print',*/				          
				            {
				                extend: 'print',
				                title: 'Supplier List',
				            },
				          ],

				          fnRowCallback : function(nRow, aData, iDisplayIndex){
				        	  $("th:first", nRow).html(iDisplayIndex +1);
				        	  return nRow;
				          },

				          "sPaginationType": "full_numbers",
				          destroy: true,
				          searching: true,
				          orderable: true,
				          columns: [
				                    {"data": "serialnumber", "width": "5%", "defaultContent": ""},
				                    {"data": "supplierName", "width": "5%", "defaultContent": ""},
				                    {"data": "address", "width": "5%", "defaultContent": ""},
				                    {"data": "city", "width": "5%", "defaultContent": ""},
				                    {"data": "mobileno", "width": "5%", "defaultContent": ""},
				                    {"data": "contactPerson", "width": "5%", "defaultContent": ""},
				                    {"data": "email", "width": "5%", "defaultContent": ""},
				                    {"data": "panNo", "width": "5%", "defaultContent": ""},
				                    {"data": "pin", "width": "5%", "defaultContent": ""},
				                    ],

			} );
		} );

		var mydata = catmap;
		$('#suppName').dataTable().fnAddData(mydata);
			}
	);
}	

function editSupplier3(){

	if(document.supd1.supplierName1.value == "")
	{
		alert("Enter Supplier Name.");
		return false;
	}	
	var letterNumber = /^[a-zA-Z, ]+$/;
	if(document.supd1.supplierName1.value.match(letterNumber))
	{
		if ( document.supd1.city.value == "" )
		{
			alert("Please Enter City");
			return false;
		}
		if ( document.supd1.mobileno.value == "" )
		{
			alert("Please Enter Valid Mobile Number");
			return false;
		}
		var letterNumber = /^[0-9]{10}$/;
		if(document.supd1.mobileno.value.match(letterNumber))
		{
			editsupplier1();
		}
		else
		{
			alert("Enter 10 digit Numbers Only in contact number..!!");
			return false;
		}	
	}							
	else
	{
		alert("Enter Alphabets Only in first name..!!");
		return false;
	}

}


function editsupplier1(){



	var supplierName= $('#supplierName').val();
	var supplierName1= $('#supplierName1').val();
	var address = $('#address').val();
	var city=$('#city').val();
	var partyType=$('#partyType').val();
	var state = $('#state').val();
	var contactPerson = $('#contactPerson').val();
	var cstNo=$('#cstNo').val();
	var pin=$('#pin').val();
	var tinNo=$('#tinNo').val();
	var creditLimit=$('#creditLimit').val();
	var email=$('#email').val();
	var bankName=$('#bankName').val();
	var accountNo=$('#accountNo').val();
	var branchName=$('#branchName').val();
	var ifscCode=$('#ifscCode').val();
	var paymentType=$('#paymentType').val();
	var brand=$('#brand').val();
	var productType=$('#productType').val();
	var mobileno=$('#mobileno').val();
	var panNo=$('#panNo').val();


	var params= {};

	params ["supplierName"] = supplierName;
	params ["supplierName1"] = supplierName1;
	params ["city"] = city;
	params ["partyType"] = partyType;
	params ["address"] = address;
	params ["state"] = state;
	params ["contactPerson"] = contactPerson;
	params ["cstNo"] = cstNo;
	params ["pin"] = pin;
	params ["branchName"] = branchName;
	params ["tinNo"] = tinNo;
	params ["creditLimit"] = creditLimit;
	params ["email"] = email;
	params ["bankName"] = bankName;
	params ["accountNo"] = accountNo;
	params ["ifscCode"] = ifscCode;
	params ["paymentType"] = paymentType;
	params ["brand"] = brand;
	params ["productType"] = productType;
	params ["mobileno"] = mobileno;
	params ["panNo"] = panNo;

	params["methodName"] = "editSupp";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.supd1) 
		{
			document.supd1.reset();
		}

			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});


}