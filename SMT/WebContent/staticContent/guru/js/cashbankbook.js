function forOptionselect()
{
	var str = document.getElementById("paymentType").value;
	if (str == "cash")
	{
		document.cashboook.registrationNo.disabled = true;
	}
	else if(str == "online")
	{
		document.cashboook.registrationNo.disabled = false;
	} 
	else if(str == "check")
	{

		document.cashboook.registrationNo.disabled = false;
	}
}

function forOptionselects()
{
	var ac1 =  null;
	document.getElementById("credit").value = ac1; 
}

function forOptionselect1()
{
	var ac1 =  null;
	document.getElementById("debit").value = ac1; 
}

function cashbook(){

	if ( document.cashboook.mode.value == "selected" )
	{

		alert("Please Select Mode Type.");
		return false;
	}
	var letterNumber = /^[a-zA-Z]+$/;  
	if(document.cashboook.reason.value.match(letterNumber))
	{

		if ( document.cashboook.paymentType.value == "selected" )
		{

			alert("Please Select Payment Type.");
			return false;
		}

		if ( document.cashboook.personName.value == "" )
		{

			alert("Please Enter Person Name.");
			return false;
		}

		var letterNumber = /^[a-zA-Z]+$/;  
		if(document.cashboook.personName.value.match(letterNumber))
		{
			cash();
		}
		else
		{
			alert("Please Enter Aphabets Only in Person Name Column. ");
			return false;
		}	

	}	

}	

function cash(){

	var supplier= $('#supplier').val();
	var paid= $('#paid').val();
	var billNo= $('#billNo').val();
	var input = document.getElementById('supplier'),
	list = document.getElementById('sup_drop'),
	i,supplier;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}
	var creditCustomer= $('#creditCustomer').val();
	var others= $('#others').val();

	var credit= $('#credit').val();
	var debit= $('#debit').val();
	var totalAmount= $('#totalAmount').val();
	var reason= $('#reason').val();
	var paymentType= $('#paymentType').val();
	var personName= $('#personName').val();

	var params= {};

	params ["supplier"] = supplier;
	params ["paid"] = paid;
	params ["billNo"] = billNo;

	params ["credit"] = credit;
	params ["debit"] = debit;
	params ["totalAmount"] = totalAmount;
	params ["reason"] = reason;
	params ["paymentType"] = paymentType;
	params ["personName"] = personName;

	params["methodName"] = "regcashbook";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.cashboook)
		{
			document.cashboook.reset();
		}	
		document.cashboook.btn.disabled = false;
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}
function forOptionselects23()
{
	var ac1 =  null;
	document.getElementById("credit3").value = ac1; 
}

function forOptionselect123()
{
	var ac1 =  null;
	document.getElementById("debit3").value = ac1; 
}
function CreditOthercash(){

	var input = document.getElementById('otherID'),
	list = document.getElementById('otherID_drop'),
	i,otherID;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			otherID = list.options[i].getAttribute('data-value');
		}
	}
	var reason3= $('#reason3').val();
	var registrationNo3= $('#registrationNo3').val();
	var paymentType3= $('#paymentType3').val();
	var personName3= $('#personName3').val();
	var credit3= $('#credit3').val();
	var debit3= $('#debit3').val();

	var params= {};

	params ["otherID"] = otherID;
	params ["credit3"] = credit3;
	params ["debit3"] = debit3;
	params ["reason3"] = reason3;
	params ["paymentType3"] = paymentType3;
	params ["personName3"] = personName3;

	params["methodName"] = "regothercashbook";

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

function BillHelper()
{
	this.getAllBills =getAllBills;
	this.getTotalAmtByBills=getTotalAmtByBills;
	this.fillItemList = fillItemList;
	function getAllBills()
	{
		var input = document.getElementById('supplier'),
		list = document.getElementById('sup_drop'),
		i,supplier;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				supplier = list.options[i].getAttribute('data-value');
			}
		}
		var supplier = supplier;
		$("#billNo").empty();
		$("#billNo").append($("<option></option>").attr("value","").text("Select bill"));
		var params= {};
		params["methodName"] = "getSAllBillBYSuppliers";
		params["supplier"]= supplier;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				$("#billNo").append($("<option></option>").attr("value",i).text(v.billNo)); 
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
					}
				});
	}

	function getTotalAmtByBills()
	{
		var billNo = $("#billNo").val();
		$("#totalAmount").empty();
		$("#totalAmount").append($("<input/>").attr("value","").text());
		var params= {};
		params["methodName"] = "getTotalAmtByBillNO";
		params["billNo"]= billNo;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				document.getElementById("totalAmount").value = v.totalAmount;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
					}
				});
	}

	function fillItemList()
	{
		var supplierId = $("#supplierId").val();
	}
}

var bill = new BillHelper();

function BillHelperforDetails()
{
	this.getAllBillsforDe =getAllBillsforDe;
	this.getTotalAmtByBillsforde=getTotalAmtByBillsforde;
	function getAllBillsforDe()
	{
		var input = document.getElementById('supplier12'),
		list = document.getElementById('sup1_drop'),
		i,supplier12;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				supplier12 = list.options[i].getAttribute('data-value');
			}
		}
		var supplier12 = supplier12;
		$("#billNo12").empty();
		$("#billNo12").append($("<option></option>").attr("value","").text("Select bill"));
		var params= {};
		params["methodName"] = "getTotalAmtByBillNOforde";
		params["supplier12"]= supplier12;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				$("#billNo12").append($("<option></option>").attr("value",i).text(v.billNo)); 
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
					}
				});
	}

	function getTotalAmtByBillsforde()
	{
		$("#jqGrid").jqGrid("clearGridData");
		var billNo12 = $("#billNo12").val();

		var params= {};
		params["methodName"] = "getAllDeytailsByBillNOforde";
		params["billNo12"]= billNo12;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				$("#jqGrid").jqGrid({
					datatype:"local",
					colNames: ["SupplierName","Total Amount","BillNo","PersonName","credit", "debit","balance","date"],
					colModel: [
					           {
					        	   name:"supplierName",
					        	   width:80
					           },

					           { 	
					        	   name: "total",
					        	   width:80
					           },
					           { 	
					        	   name: "billNo",
					        	   width:80
					           },
					           {
					        	   name: "personName",
					        	   width:80
					           },	

					           {
					        	   name:  "credit",
					        	   width:80
					           },

					           {
					        	   name: "debit",
					        	   width:80
					           },

					           {
					        	   name: "balance",
					        	   width:80
					           },

					           {
					        	   name:'date',
					        	   width:80
					           }
					           ],


					           sortorder : 'desc',

					           loadonce: true,
					           viewrecords: true,
					           width: 800,
					           height: 300,


					           pager: "#jqGridPager",
					           'cellEdit':true
				});

				$("#jqGrid").jqGrid("navGrid", "#jqGridPager", {add: false});
				$("#jqGrid").addRowData(i+1,jsonData[i]);


				$('#jqGrid').navGrid('#jqGridPager',
						// the buttons to appear on the toolbar of the grid
						{edit: true,  del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
						// options for the Edit Dialog
						{
							editCaption: "The Edit Dialog",
							recreateForm: true,
							checkOnUpdate : true,
							checkOnSubmit : true,
							closeAfterEdit: true,
							errorTextFormat: function (data) {
								return 'Error: ' + data.responseText
							}
						},

						// options for the Delete Dailog
						{
							closeAfterdel:true,
							recreateForm: true,
							errorTextFormat: function (data) {
								return 'Error: ' + data.responseText
							},
							onSelectRow: function(id) {
								if (id && id !== lastSel) {
									jQuery("#jqGrid").saveRow(lastSel, true, 'clientArray');
									jQuery("#jqGrid").editRow(id, true);
									lastSel = id;
									console.log(id);
								}
							}
						});
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});
	}
}

var billforde = new BillHelperforDetails();
function employeecashbook(){

	if ( document.cashboook.mode.value == "selected" )
	{

		alert("Please Select Mode Type.");
		return false;
	}
	var letterNumber = /^[a-zA-Z]+$/;  
	if(document.cashboook.reason.value.match(letterNumber))
	{
		if ( document.cashboook.paymentType.value == "selected" )
		{
			alert("Please Select Payment Type.");
			return false;
		}
		if ( document.cashboook.personName.value == "" )
		{
			alert("Please Enter Person Name.");
			return false;
		}

		var letterNumber = /^[a-zA-Z]+$/;  
		if(document.cashboook.personName.value.match(letterNumber))
		{
			cash();
		}
		else
		{
			alert("Please Enter Aphabets Only in Person Name Column. ");
			return false;

		}	
	}	
}	

function forOptionselects11()
{
	var ac1 =  null;
	document.getElementById("credit1").value = ac1; 
}

function forOptionselect111()
{
	var ac1 =  null;
	document.getElementById("debit1").value = ac1; 
}
function employeecash(){

	var params= {};

	var input = document.getElementById('salesman11'),
	list = document.getElementById('salesman11_drop'),
	i,salesman11;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			salesman11 = list.options[i].getAttribute('data-value');
		}
	}
	var reason1= $('#reason1').val();
	var paymentType1= $('#paymentType1').val();
	var personName1= $('#personName1').val();
	var credit1= $('#credit1').val();
	var debit1= $('#debit1').val();
	var salary = $('#salary').val();

	params ["salesman11"] = salesman11;
	params ["credit1"] = credit1;
	params ["debit1"] = debit1;

	params ["reason1"] = reason1;
	params ["paymentType1"] = paymentType1;
	params ["personName1"] = personName1;
	params ["salary"] = salary;

	params["methodName"] = "regemployeecashbook";

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
function forOptionselectforcredit()
{
	var str = document.getElementById("paymentType2").value;
	if (str == "cash2")
	{
		document.cashboook.registrationNo.disabled = true;
	}
	else if(str == "online2")
	{
		document.cashboook.registrationNo.disabled = false;
	} 
	else if(str=="check2")
	{

		document.cashboook.registrationNo.disabled = false;
	}
}


function forOptionselects2()
{
	var ac1 =  null;
	document.getElementById("credit2").value = ac1; 
}

function forOptionselect12()
{
	var ac1 =  null;
	document.getElementById("debit2").value = ac1; 
}


function CreditCustcash(){
	var paid2= $('#paid2').val();
	var creditCustomer12= $('#creditCustomer12').val();
	var input = document.getElementById('creditCustomer12'),
	list = document.getElementById('creditCustomer12_drop'),
	i,creditCustomer12;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer12 = list.options[i].getAttribute('data-value');
		}
	}

	var reason2= $('#reason2').val();
	var registrationNo2= $('#registrationNo2').val();
	var paymentType2= $('#paymentType2').val();
	var personName2= $('#personName2').val();
	var credit2= $('#credit2').val();
	var debit2= $('#debit2').val();
	var billNo2= $('#billNo2').val();
	var totalAmount2 = $('#totalAmount2').val();
	var params= {};

	params["totalAmount2"] =totalAmount2;
	params ["creditCustomer12"] = creditCustomer12;
	params ["credit2"] = credit2;
	params ["debit2"] = debit2;
	params ["reason2"] = reason2;
	params ["paymentType2"] = paymentType2;
	params ["personName2"] = personName2;
	params ["billNo2"] = billNo2;

	params["methodName"] = "regcreditcustcashbook";

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

function BillHelperforCredit()
{
	this.custCresdit=custCresdit;
	this.getTotalAmtByBillsforcredit = getTotalAmtByBillsforcredit;
	this.getsalarybyemployee = getsalarybyemployee ;
	function custCresdit ()
	{
		var input = document.getElementById('creditCustomer12'),
		list = document.getElementById('creditCustomer12_drop'),
		i,creditCustomer12;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				creditCustomer12 = list.options[i].getAttribute('data-value');
			}
		}
		var creditCustomer12 = creditCustomer12;
		$("#billNo2").empty();
		$("#billNo2").append($("<option></option>").attr("value","").text("Select bill"));
		var params= {};
		params["methodName"] = "getSAllBillBYcreditcudt";
		params["creditCustomer12"]= creditCustomer12;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				$("#billNo2").append($("<option></option>").attr("value",i).text(v.billNo)); 

					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {

					}
				});

	}
	function getTotalAmtByBillsforcredit()
	{
		var billNo = $("#billNo2").val();
		$("#totalAmount2").empty();
		$("#totalAmount2").append($("<input/>").attr("value","").text());
		var params= {};
		params["methodName"] = "getTotalAmtByBillNOforCust";
		params["billNo"]= billNo;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				document.getElementById("totalAmount2").value = v.totalAmount;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
					}
				});
	}

	function getsalarybyemployee()
	{
		var input = document.getElementById('salesman11'),
		list = document.getElementById('salesman11_drop'),
		i,salesman11;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				salesman11 = list.options[i].getAttribute('data-value');
			}
		}
		var salesman11 = salesman11;
		$("#salary").empty();
		$("#salary").append($("<input/>").attr("value","").text());
		var params= {};
		params["salesman11"]= salesman11;
		params["methodName"] = "getsalAmtByEmp";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				document.getElementById("salary").value = v.salary;
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
					}
				});
	}
}

var suctbill = new BillHelperforCredit();
