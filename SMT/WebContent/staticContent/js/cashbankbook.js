//Adding supplier Payment
function supplierPayment()
{
	var balanceAmount = $("#balanceAmount").val();
	var supPay = $("#supPay").val();
	var suppPaymentType = $('#paymentType').val();
	var suppPaymentMode = $('#paymentMode').val();
	var personname = $('#personname').val();
	
	if(+supPay > +balanceAmount )
	{
		alert("Supplier Payment Amount Should Be Less Than Balance Amount");
		return false;
	}

	if(document.spmt.supplier.value == "")
	{
		alert("Please Select Supplier Name");
		return false;
	}	

	if(suppPaymentType == "selected7" )
	{
		alert("Please Select Payment Type");
		return false;
	}
	if(document.spmt.supPay.value == "")
	{
		alert("Please Enter Supplier Payment  Amount");
		return false;
	}
	var letterNumber = /^[0-9]+([.][0-9]+)?$/;
	if(document.spmt.supPay.value.match(letterNumber))
	{}
	else
	{
		alert("Enter only numbers in credit field..!!");
		return false;
	}
	
	if(personname == "" || personname == null || personname == undefined)
	{}
	else
	{
		var checkAccName = /^[a-zA-Z]*$/;
		if(personname.match(checkAccName))
		{}
		else
		{
			alert("Please Enter Only Alphabates In Accountant Name");
			return false;
		}
	}
	
	/*
	if(document.spmt.receiptNo.value == "")
	{
		alert("Please Enter Receipt Number");
		return false;
	}
	*/
	
	sup();
}


function sup()
{
	document.getElementById("btn1").disabled = true;

	var billNo = $('#billNo').val();
	var totalAmount = $('#totalAmount').val();
	var balanceAmount = $('#balanceAmount').val();
	var paymentType = $('#paymentType').val();
	var paymentMode = $('#paymentMode').val();
	var chequeNum = $('#chequeNum').val();
	var nameOnCheck = $('#nameOnCheck').val();
	var bankName = $('#bankName').val();
	var cardNum = $('#cardNum').val();
	var accNum = $('#accNum').val();
	var personname = $('#personname').val();
	var supPay = $('#supPay').val();
	var supPaymentDescription = $('#supPaymentDescription').val();
	var receiptNo = $('#receiptNo').val();
	var suppPayDate = $("#suppPayDate").val();
	
	var input = document.getElementById('supplier'),
	list = document.getElementById('sup_drop'),
	i,fkRootsupId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootsupId = list.options[i].getAttribute('data-value');
		}
	}
	var params= {};

	params ["supplier"] = fkRootsupId;
	params ["billNo"] = billNo;
	params ["totalAmount"] = totalAmount;
	params ["balanceAmount"] = balanceAmount;
	params ["paymentType"] = paymentType;
	params ["paymentMode"] = paymentMode;
	params ["chequeNum"] = chequeNum;
	params ["nameOnCheck"] = nameOnCheck;
	params ["bankName"] = bankName;
	params ["cardNum"] = cardNum;
	params ["accNum"] = accNum;
	params ["personname"] = personname;
	params ["supPay"] = supPay;
	params ["supPaymentDescription"] = supPaymentDescription;
	params ["receiptNo"] = receiptNo;
	params ["suppPayDate"] = suppPayDate;	

	params["methodName"] = "regSupCashBook";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		alert(data);
		location.reload();
		window.open("supplierCreditNotePDF.jsp");
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function customerPaymentValidation()
{
	var creditCustomer = $("#creditCustomer").val();
	var creditCustBillNo = $("#billNo1").val();
	var creditCustAccName = $("#personname1").val();
	var creditCustPaymentType = $("#paymentType1").val();
	var creditCustBalanceAmt = $("#balanceAmount1").val();
	var creditCustCreditAmt = $("#custPay").val();
	var personname1 = $("#personname1").val();
	
	if (creditCustomer != null && creditCustomer != "") {
		/*if (creditCustBillNo != null && creditCustBillNo != "")
		 * {*/
			var creditAmtRegExp = /^[0-9]+([.][0-9]+)?$/;
			if (creditCustCreditAmt != null && creditCustCreditAmt != ""
				&& creditCustCreditAmt != " ") {

				if (creditCustCreditAmt.match(creditAmtRegExp)) {

					if (Number(creditCustCreditAmt) <= Number(creditCustBalanceAmt)) {

						if (Number(creditCustCreditAmt) > 0) {
							if (creditCustPaymentType != "selected" && creditCustPaymentType != "" && creditCustPaymentType != " ")
							{
								customerPayment();
							}
							else
							{
								alert("Please select Payment Type");
							}
						} else {
							alert("Credit Amount should be grater than 1");
						}

					} else {
						alert("Credit Amount should not grater than Balance Amount");
					}

				} else {
					alert("Please Enter valid Credit Amount");
				}

			} else {
				alert("Please Enter Credit Amount");
			}

		} /* else {
			alert("please Select Bill Number");
		}
	}*/ else {
		alert("please Select Customer Name");
	}
}

//Adding Credit Customer Payment
function customerPayment()
{
	//validation of balance amount with credit amount
	var balanceAmount1 = $("#balanceAmount1").val();
	var credit = $("#credit1").val();
	if(credit >balanceAmount ){
		alert("Credit Amount Should Be Less Than Balance Amount")
	}

	document.getElementById("btn2").disabled = true;

	var billNo = $('#billNo1').val();
	var totalAmount = $('#totalAmount1').val();
	var custPay = $('#custPay').val();
	var paymentMode1 = $('#paymentMode1').val();
	var chequeNum = $('#chequeNum1').val();
	var nameOnCheck = $('#nameOnCheck1').val();
	var bankName = $('#bankName1').val();
	var cardNum = $('#cardNum1').val();
	var accNum = $('#accNum1').val();
	var personname = $('#personname1').val();
	var paymentType = $('#paymentType1').val();
	var creditCustPaymentDescription = $('#creditCustPaymentDescription').val();
	var creditReceiptNo = $('#creditReceiptNo').val();
	var ccPayDate = $("#ccPayDate").val();
	
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,fkRootCustId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootCustId = list.options[i].getAttribute('data-value');
		}
	}
	
	var params= {};

	params ["customer"] = fkRootCustId;
	params ["billNo"] = billNo;
	params ["totalAmount"] = totalAmount;
	params ["custPay"] = custPay;
	params ["paymentMode1"] = paymentMode1;
	params ["chequeNum"] = chequeNum;
	params ["nameOnCheck"] = nameOnCheck;
	params ["bankName"] = bankName;
	params ["cardNum"] = cardNum;
	params ["accNum"] = accNum;
	params ["personname"] = personname;
	params ["paymentType"] = paymentType;
	params ["balanceAmount1"] = balanceAmount1;
	params ["creditCustPaymentDescription"] = creditCustPaymentDescription;
	params ["creditReceiptNo"] = creditReceiptNo;
	params ["ccPayDate"] = ccPayDate;

	params["methodName"] = "regCreditCustCashBook";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		alert(data);
		window.open("creditNoteForCustomerPDF.jsp");
		location.reload();		
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function EmployeeValidation()
{
	var empName = $("#employee").val();
	var empCreditAmt = $("#empPay").val();
	var empAccName = $("#personName2").val();
	var empPaymentReason = $("#reason2").val();
	var paymentType2 = $("#paymentType2").val();

	if (empName != null && empName != "") {

		var creditAmtRegExp = /^[0-9]+([.][0-9]+)?$/;
		if (empCreditAmt != null && empCreditAmt != "" && empCreditAmt != " ") {
			if (empCreditAmt.match(creditAmtRegExp)) {
				if (Number(empCreditAmt) > 0) {
					if (empPaymentReason != "" && empPaymentReason != " " && empPaymentReason != null) {
						if (paymentType2 != "selected2" && paymentType2 != "" && paymentType2 != " " && paymentType2 != "selected") {
							emplyeePayment();
						} else {
							alert("Select Payment Type Credti or debit");
						}
					} else {
						alert("Enter Payment Reason.");
					}
				} else {
					alert("Credit Amount should be grater than 1");
				}
			} else {
				alert("Please Enter valid Credit Amount");
			}
		} else {
			alert("Please Enter Credit Amount");
		}
	} else {
		alert("Select Employee Name");
	}
}

//Adding Employee Payment
function emplyeePayment()
{
	document.getElementById("btn3").disabled = true;
	var empPay= $('#empPay').val();
	var personName= $('#personName2').val();
	var reason= $('#reason2').val();
	var paymentMode = $('#paymentMode2').val();
	var chequeNum = $('#chequeNum2').val();
	var nameOnCheck = $('#nameOnCheck2').val();
	var bankName = $('#bankName2').val();
	var cardNum = $('#cardNum2').val();
	var accNum = $('#accNum2').val();
	var paymentType = $('#paymentType2').val();
	var empPayDate = $('#empPayDate').val();

	var input = document.getElementById('employee'),
	list = document.getElementById('emp_drop'),
	i,fkRootempId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootempId = list.options[i].getAttribute('data-value');
		}
	}
	var params= {};

	params ["employee"] = fkRootempId;
	params ["empPay"] = empPay;
	params ["personName"] = personName;
	params ["reason"] = reason;
	params ["paymentMode"] = paymentMode;
	params ["chequeNum"] = chequeNum;
	params ["nameOnCheck"] = nameOnCheck;
	params ["bankName"] = bankName;
	params ["cardNum"] = cardNum;
	params ["accNum"] = accNum;
	params ["paymentType"] = paymentType;
	params ["empPayDate"] = empPayDate;

	params["methodName"] = "regEmpCashBook";

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

function expensePaymentValidation()
{
	var expenseName = $("#expenseName").val();
	var serviceProvider = $("#serviceProvider").val();
	var contactNumber = $("#contactNumber").val();
	var paymentType = $("#paymentType").val();
	var crDbAmount = $("#crDbAmount").val();
	var accountantName = $("#accountantName").val();
	var amount = /[0-9]$/;
	if (expenseName != null && expenseName != "" && expenseName != " ") 
	{
		if (serviceProvider != null && serviceProvider != "" && serviceProvider != " ") 
		{
			if (contactNumber != null && contactNumber != "" && contactNumber != " ") 
			{
				var phoneno = /^\d{10}$/;
				if (contactNumber.match(phoneno)) 
				{
					if(accountantName == null || accountantName == undefined || accountantName == "")
					{}
					else
					{
						var matchAccName = /^[a-z A-Z]*$/;
						if(accountantName.match(matchAccName))
						{}
						else
						{
							alert("Please Enter Valid Name in Account Name ");
							return false;
						}
					}
					if(crDbAmount.match(amount))
					{
						addExpense();
					}
					else
					{
						alert("Please Enter Number in Debit Amount");
					}
				}
			} 
			else 
			{
				alert("Enter Contact Number");
			}
		} 
		else 
		{
			alert("Enter Service Provider");
		}
	} 
	else 
	{
		alert("please Select Expenditure Name");
	}
}

/********************Adding Expenditure Payment****************/

function addExpense()
{
	document.exp.btn4.disabled = true;
	var serviceProvider = $('#serviceProvider').val();
	var paymentType = $("#paymentType").val();
	var crDbAmount = $("#crDbAmount").val();
	var contactNumber = $('#contactNumber').val();
	var accountantName = $('#accountantName').val();
	var expdDate = $("#expdDate").val();
	var input = document.getElementById('expenseName'),
	list = document.getElementById('exp_drop'),
	i,fkRootexpId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootexpId = list.options[i].getAttribute('data-value');
		}
	}
	var params= {};
	params ["fkRootexpId"] = fkRootexpId;
	params ["serviceProvider"] = serviceProvider;
	params ["paymentType"] = paymentType;
	params ["crDbAmount"] = crDbAmount;
	params ["contactNumber"] = contactNumber;
	params ["accountantName"] = accountantName;
	params["expdDate"] = expdDate;
	params["methodName"] = "regExpenseCashBook";

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

/*Following BillHelper() function is to get Bill no , total amount and balamce amount after selecting supplier in Supplier Payment*/
var bill = new BillHelper();
function BillHelper()
{
	this.getAllBills =getAllBills;
	this.getTotalAmtByBills=getTotalAmtByBills;
	this.getRemainingBalaneByBills=getRemainingBalaneByBills;

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
		params["supplier"]= supplier;
		params["methodName"] = "getAllBillBySuppliers";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				$("#billNo").append($("<option></option>").attr("value",i).text(v.billNo)); 
					});
				})
	}

	function getTotalAmtByBills()
	{
		var input = document.getElementById('supplier'),
		list = document.getElementById('sup_drop'),
		i,supplier;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				supplier = list.options[i].getAttribute('data-value');
			}
		}

		var billNo = $("#billNo").val();
		$("#totalAmount").empty();
		$("#totalAmount").append($("<input/>").attr("value","").text());
		var params= {};
		params["billNo"]= billNo;
		params["supplier"]= supplier;
		params["methodName"] = "getTotalAmtByBillNo";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				document.getElementById("totalAmount").value = v.totalAmt;
					});
			getRemainingBalaneByBills();
				})
				
	}

	function getRemainingBalaneByBills()
	{
		var input = document.getElementById('supplier'),
		list = document.getElementById('sup_drop'),
		i,supplier;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				supplier = list.options[i].getAttribute('data-value');
			}
		}
		var billNo = $("#billNo").val();
		var totalAmount = $("#totalAmount").val();
		$("#balanceAmount").empty();
		$("#balanceAmount").append($("<input/>").attr("value","").text());

		var params= {};
		params["billNo"]= billNo;
		params["supplier"]= supplier;
		params["totalAmount"]= totalAmount;
		params["methodName"] = "getBalanceAmtByBillNo";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				document.getElementById("balanceAmount").value = v.balance;
					});
				})
	}
}

function getBillByCustomer(){
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,creditCustomer;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
		}
	}

	var creditCustomer = creditCustomer;
	
	$("#billNo1").empty();
	$("#billNo1").append($("<option></option>").attr("value","").text("Select bill"));
	var params= {};
	params["creditCustomer"]= creditCustomer;
	params["methodName"] = "getAllBillByCustomer";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			$("#billNo1").append($("<option></option>").attr("value",i).text(v.billNo)); 
				});
			})
}

function getBillByCustomer1(){
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,creditCustomer;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
		}
	}

	var creditCustomer = creditCustomer;
	$("#billNo1").empty();
	$("#billNo1").append($("<option></option>").attr("value","").text("Select bill"));
	var params= {};
	params["creditCustomer"]= creditCustomer;
	params["methodName"] = "getAllBillByCustomer";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			$("#billNo1").append($("<option></option>").attr("value",i).text(v.billNo)); 
				});
			})
}

function getBillByCustomerForReport(){
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,creditCustomer;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
		}
	}
	var input = document.getElementById('fk_cat_id0'),
	list = document.getElementById('cat_drop0'),
	i,cat;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			cat = list.options[i].getAttribute('data-value');
		}
	}

	var creditCustomer = creditCustomer;
	$("#billNo1").empty();
	$("#billNo1").append($("<option></option>").attr("value","").text("Select bill"));
	var params= {};
	params["methodName"] = "getAllBillByCustomer";
	params["creditCustomer"]= creditCustomer;
	params["cat"]= cat;

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			$("#billNo1").append($("<option></option>").attr("value",i).text(v.billNo)); 
				});
			})
}

function getCreditCustomerBillDetails(){

	this.getBillByCustomer = getBillByCustomer;
	this.getTotalAmountByBill = getTotalAmountByBill;
}

function getTotalAmountByBill()
{
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,creditCustomer;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
		}
	}
	var billNo1 = $("#billNo1").val();
	$("#totalAmount1").empty();
	$("#totalAmount1").append($("<input/>").attr("value","").text());

	var params= {};

	params["methodName"] = "getTotalAmtByBillNoForCreditCustomer";
	params["billNo1"]= billNo1;
	params["creditCustomer"]= creditCustomer;
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			if(v.totalAmount == undefined || v.totalAmount == null || v.totalAmount == "")
			{
				document.getElementById("totalAmount1").value = "";
			}
			else
			{
				document.getElementById("totalAmount1").value = v.totalAmount;
			}
		});
			balaceAmountbyBillNoForCreditPayment();
		})
			
}

function balaceAmountbyBillNoForCreditPayment(){
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,creditCustomer;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
		}
	}
	var billNo1 = $("#billNo1").val();
	var totalAmount1 = $("#totalAmount1").val();
	$("#balanceAmount1").empty();
	$("#balanceAmount1").append($("<input/>").attr("value","").text());
	var params= {};
	params["methodName"] = "getBalanceAmtByBillNoForCreditCustomer";
	params["billNo1"]= billNo1;
	params["totalAmount1"]= totalAmount1;
	params["creditCustomer"]= creditCustomer;
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);

		$.each(jsonData,function(i,v)
		{
			if(v.balance == null || v.balance == undefined || v.balance == "")
			{
				document.getElementById("balanceAmount1").value = "";
			}
			else
			{
				document.getElementById("balanceAmount1").value = v.balance;
			}
		});
	})
}

var custBill = new getCreditCustomerBillDetails();
/*************** For Reports *********************/

/**************** Supplier Payment *************/
/************ for single date **************/
function supplierReportForSingleDate(){
	var params= {};
	var fDate = $("#fDate11").val();
	params["fDate"]= fDate;
	params["methodName"] = "getSupplierPaymentDetailsForSingleDate";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear table
		$('#supplierSingleDatetable').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {
			var total =   $('#supplierSingleDatetable').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 4 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 4 ).footer() ).html(
							//  'Rs'+' '+pageTotal.toFixed(2)
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 5 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 5 ).footer() ).html(
							//  'Rs'+' '+pageTotal.toFixed(2)
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 6 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 6 ).footer() ).html(
							//  'Rs'+' '+pageTotal.toFixed(2)
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);
				},
				destroy: true,
				searching: true,			        
				columns: [
				          {"data": "supplierName", "width": "5%" ,"defaultContent": ""},
				          {"data": "date" , "width": "7%" ,"defaultContent": ""},
				          /*{"data": "billNo", "width": "5%" ,"defaultContent": ""},*/
				          {"data": "paymentType" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentMode" , "width": "5%" ,"defaultContent": ""},
				          {"data": "totalAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "purchaseReturnAmt" , "width": "5%" ,"defaultContent": ""},
				          {"data": "balanceAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "description" , "width": "5%" ,"defaultContent": ""},
				          {"data": "AccountNo" , "width": "5%" ,"defaultContent": ""},
				          {"data": "bankName" , "width": "5%" ,"defaultContent": ""},
				          {"data": "accountantName" , "width": "5%" ,"defaultContent": ""},
				          
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 

				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Date Wise Supplier Payment Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#supplierSingleDatetable').dataTable().fnAddData(mydata);
			}
	);
}

/********* Between two dates for supplier ***************/
function getSupplierDetailsBetweenTwoDates(){

	var params= {};
	var startDate = $("#fisDate1").val();
	var endDate = $("#endDate1").val();
	params["fisDate"]= startDate;
	params["endDate"]= endDate;
	params["methodName"] = "getSupplierPaymentReportBetweenTwoDates";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear table
		$('#supplierBetweenTwoDatestable').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#supplierBetweenTwoDatestable').DataTable( {
				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 5 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 5 ).footer() ).html(

							'Rs'+' '+parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 6 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 6 ).footer() ).html(

							'Rs'+' '+parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 7 ).footer() ).html(

							'Rs'+' '+parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);
				},

				destroy: true,
				searching: true,				      
				columns: [
				          {"data": "date" , "width": "5%" ,"defaultContent": ""},
				          {"data": "supplierName", "width": "5%" ,"defaultContent": ""},
				          /*{"data": "billNo", "width": "5%" ,"defaultContent": ""},*/
				          {"data": "paymentType" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentMode" , "width": "5%" ,"defaultContent": ""},
				          {"data": "totalAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "purchaseReturnAmt" , "width": "5%" ,"defaultContent": ""},
				          {"data": "balanceAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "description" , "width": "5%" ,"defaultContent": ""},
				          {"data": "AccountNo" , "width": "5%" ,"defaultContent": ""},
				          {"data": "bankName" , "width": "5%" ,"defaultContent": ""},
				          {"data": "accountantName" , "width": "5%" ,"defaultContent": ""},
				          ],

				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Double Date Wise Supplier Payment Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#supplierBetweenTwoDatestable').dataTable().fnAddData(mydata);
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

/*Bill number Wise supplier payment report*/
function getBillWiseReport(){
	var input = document.getElementById('supplier'),
	list = document.getElementById('sup_drop'),
	i,supplier;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}
	var fkSupplierId = supplier;

	var params= {};
	var billNo = $("#billNo").val();
	params["fkSupplierId"]= fkSupplierId;
	params["billNo"]= billNo;
	params["methodName"] = "getSupplierPaymentDetailsAsPerBillNumber";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{

		//To clear table
		$('#supplierBillWiseData').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {
			var total =   $('#supplierBillWiseData').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 5 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 5 ).footer() ).html(
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 6 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 6 ).footer() ).html(
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 7 ).footer() ).html(
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);
				},
				destroy: true,
				searching: true,			        
				columns: [
				          {"data": "date" , "width": "5%" ,"defaultContent": ""},
				          {"data": "supplierName", "width": "5%" ,"defaultContent": ""},
				          {"data": "billNo", "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentType" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentMode" , "width": "5%" ,"defaultContent": ""},
				          {"data": "totalAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "balanceAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "AccountNo" , "width": "5%" ,"defaultContent": ""},
				          {"data": "bankName" , "width": "5%" ,"defaultContent": ""},
				          {"data": "accountantName" , "width": "5%" ,"defaultContent": ""},
				          ],

				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Supplier Bill Wise Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#supplierBillWiseData').dataTable().fnAddData(mydata);
			}
	);
}

/*Supplier Name wise*/
function getSupNameWiseReport(){
	var input = document.getElementById('supplier7'),
	list = document.getElementById('sup_drop7'),
	i,supplier;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}
	var fkSupplierId = supplier;
	var params= {};

	params["fkSupplierId"]= fkSupplierId;
	params["methodName"] = "getSupplierPaymentDetailsAsPerName";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear table
		$('#supplierNameWiseTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			var total =   $('#supplierNameWiseTable').DataTable( {
				
				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 5 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 5 ).footer() ).html(
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 6 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 6 ).footer() ).html(
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 7 ).footer() ).html(
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);
				},				
				
				columns: [
				          {"data": "date" , "width": "5%" ,"defaultContent": ""},
				          {"data": "supplierName", "width": "5%" ,"defaultContent": ""},
				         /* {"data": "billNo", "width": "5%" ,"defaultContent": ""},*/
				          {"data": "paymentType" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentMode" , "width": "5%" ,"defaultContent": ""},
				          {"data": "totalAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "purchaseReturnAmt" , "width": "5%" ,"defaultContent": ""},
				          {"data": "balanceAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "description" , "width": "5%" ,"defaultContent": ""},
				          {"data": "AccountNo" , "width": "5%" ,"defaultContent": ""},
				          {"data": "bankName" , "width": "5%" ,"defaultContent": ""},
				          {"data": "accountantName" , "width": "5%" ,"defaultContent": ""},
				          ],
				          
							"scrollX": true,
							"destroy": true,
							"searching": true,

				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Supplier Name Wise Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#supplierNameWiseTable').dataTable().fnAddData(mydata);
			}
	);
}


/********** Credit Customer Reports *********************/

/*++++++ Customer Name wise +++++*/
function getCreditCustomerReportNameWise()
{
	var input = document.getElementById('creditCustomer5'),
	list = document.getElementById('cust_drop5'),
	i,customer;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			customer = list.options[i].getAttribute('data-value');
		}
	}
	var fkCustomerId = customer;

	var params= {};

	params["fkCustomerId"]= fkCustomerId;
	params["methodName"] = "getCustomerReportByName";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear table
		$('#customerNameWiseData2').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {
			var total =   $('#customerNameWiseData2').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};
					// Total over this page
					
					pageTotal = api
					.column( 5 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 5 ).footer() ).html(
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);
					
					pageTotal = api
					.column( 6 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 6 ).footer() ).html(
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);

					// Total over this page       
					/*pageTotal = api
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 7 ).footer() ).html(
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);*/

				},
				destroy: true,
				searching: true,			        
				columns: [
				          {"data": "date" , "width": "5%", "defaultContent": ""},
				          {"data": "creditCustomerFirstName", "width": "5%" ,"defaultContent": ""},
//				          {"data": "billNo" , "width": "5%" ,"defaultContent": ""},
				          {"data": "PaymentType" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentMode" , "width": "5%" ,"defaultContent": ""},
				          {"data": "totalAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "returnAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "balanceAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "description" , "width": "5%" ,"defaultContent": ""},
				          {"data": "accountNo" , "width": "5%" ,"defaultContent": ""},
				          {"data": "bankName" , "width": "5%" ,"defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Customer Name Wise Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#customerNameWiseData2').dataTable().fnAddData(mydata);
			}
	);
}

/* Bill Wise */
function getBillWiseCreditReport(){

	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,creditCustomer;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
		}
	}
	var fkCustomerId = creditCustomer;
	var params= {};
	var billNo = $("#billNo1").val();


	params["billNo"]= billNo;
	params["fkCustomerId"]= fkCustomerId;
	params["methodName"] = "getCreditCustPaymentDetailsForBillNo";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear table
		$('#customerNameWiseData').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			var total =   $('#customerNameWiseData').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 6 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 6 ).footer() ).html(
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);

					// Total over this page       

					pageTotal = api
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 7 ).footer() ).html(
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);

				},

				destroy: true,
				searching: true,			        
				columns: [
				          {"data": "date" , "width": "5%" ,"defaultContent": ""},
				          {"data": "creditCustomerFirstName", "width": "5%" ,"defaultContent": ""},
				          {"data": "creditCustomerLastName", "width": "5%" ,"defaultContent": ""},
				          {"data": "billNo" , "width": "5%" ,"defaultContent": ""},
				          {"data": "PaymentType" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentMode" , "width": "5%" ,"defaultContent": ""},
				          {"data": "totalAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "balanceAmount" , "width": "5%" ,"defaultContent": ""},
				          ],

				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Customer Bill Wise Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#customerNameWiseData').dataTable().fnAddData(mydata);
			}
	);
}

/********** for single date *********/
function creditCustReportForSingleDate()
{
	var params= {};
	var fDate = $("#fDate1").val();

	params["fDate"]= fDate;
	params["methodName"] = "getCreditCustPaymentDetailsForSingleDate";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		//To clear table
		$('#customerSingleDatetable').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			var total =   $('#customerSingleDatetable').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					/* */

					// Total over this page
					pageTotal = api
					.column( 5 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 5 ).footer() ).html(
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);
					
					pageTotal = api
					.column( 6 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 6 ).footer() ).html(
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);

				},

				destroy: true,
				searching: true,			        
				columns: [
						  {"data": "date", "width": "5%" ,"defaultContent": ""},
				          {"data": "creditCustomerFirstName", "width": "5%" ,"defaultContent": ""},
				          /*{"data": "billNo" , "width": "5%" ,"defaultContent": ""},*/
				          {"data": "PaymentType" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentMode" , "width": "5%" ,"defaultContent": ""},
				          {"data": "totalAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "returnAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "balanceAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "description" , "width": "5%" ,"defaultContent": ""},
				          {"data": "accountNo" , "width": "5%" ,"defaultContent": ""},
				          {"data": "bankName" , "width": "5%" ,"defaultContent": ""},
				          ],

				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Single Date Wise Customer Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );

		var mydata = catmap;
		$('#customerSingleDatetable').dataTable().fnAddData(mydata);
			}
	);
}

/***************** Between two dates *************/

function getCreditCustomerDetailsBetweenTwoDates()
{
	var params= {};
	var startDate = $("#fisDate").val();
	var endDate = $("#endDate").val();


	params["fisDate"]= startDate;
	params["endDate"]= endDate;
	params["methodName"] = "getCustomerReportBetweenTwoDates";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear table
		$('#customerBetweenTwoDates').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;


		$(document).ready(function() {
			$('#customerBetweenTwoDates').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 6 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 6 ).footer() ).html(

							parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 7 ).footer() ).html(

							parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);
				},

				destroy: true,
				searching: true,				      
				columns: [
				          {"data": "date" , "width": "5%" ,"defaultContent": ""},
				          {"data": "creditCustomerFirstName", "width": "5%" ,"defaultContent": ""},
				          {"data": "creditCustomerLastName", "width": "5%" ,"defaultContent": ""},
				          /*{"data": "billNo" , "width": "5%" ,"defaultContent": ""},*/
				          {"data": "PaymentType" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentMode" , "width": "5%" ,"defaultContent": ""},
				          {"data": "totalAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "returnAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "balanceAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "description" , "width": "5%" ,"defaultContent": ""},
				          {"data": "accountNo" , "width": "5%" ,"defaultContent": ""},
				          {"data": "bankName" , "width": "5%" ,"defaultContent": ""},
				          ],

				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Double Date Wise Customer Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#customerBetweenTwoDates').dataTable().fnAddData(mydata);
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

/************ Employee Payment Report **************/
/*********** For single Date *********/

function employeePaymentReportForSingleDate(){
	var params= {};
	var fDate = $("#fDate2").val();
	params["fDate"]= fDate;

	params["methodName"] = "getEmpPaymentDetailsForSingleDate";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear table
		$('#employeeSingleDatetable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			var total =   $('#employeeSingleDatetable').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 5 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 5 ).footer() ).html(
							//  'Rs'+' '+pageTotal.toFixed(2)
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);

					// Total over this page       
				},

				destroy: true,
				searching: true,		        
				columns: [
				          {"data": "insertDate" , "width": "5%" ,"defaultContent": ""},
				          {"data": "firstName", "width": "5%" ,"defaultContent": ""},
				          {"data": "lastName", "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentType", "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentMode" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "chequeNo" , "width": "5%" ,"defaultContent": ""},
				          {"data": "accountantName" , "width": "5%" ,"defaultContent": ""},
				          {"data": "reason" , "width": "5%" ,"defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Single Date Wise Employee Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#employeeSingleDatetable').dataTable().fnAddData(mydata);
			}
	);
}

/****** Between Two dates **********/

function getEmpPaymentDetailsBetTwoDays()
{
	var params= {};
	var startDate = $("#fisDate2").val();
	var endDate = $("#endDate2").val();

	var input = document.getElementById('employee'),
	list = document.getElementById('emp_drop'),
	i,fkRootempId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootempId = list.options[i].getAttribute('data-value');
		}
	}
	params["fkRootempId"]= fkRootempId;
	params["fisDate"]= startDate;
	params["endDate"]= endDate;
	params["methodName"] = "getEmployeeReportBetweenTwoDates";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear table
		$('#empBetweenTwoDates').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#empBetweenTwoDates').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 5 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 5 ).footer() ).html(

							'Rs'+' '+parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);
				},

				destroy: true,
				searching: true,			      
				columns: [
				          {"data": "insertDate" , "width": "5%" ,"defaultContent": ""},
				          {"data": "firstName", "width": "5%" ,"defaultContent": ""},
				          {"data": "lastName", "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentType", "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentMode" , "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentAmount" , "width": "5%" ,"defaultContent": ""},
				          {"data": "chequeNo" , "width": "5%" ,"defaultContent": ""},
				          {"data": "accountantName" , "width": "5%" ,"defaultContent": ""},
				          {"data": "reason" , "width": "5%" ,"defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Double Date Wise Employee Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#empBetweenTwoDates').dataTable().fnAddData(mydata);
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

/*********** Expense Payment Reports *************/
/******** For single date *********/

function expensePaymentReportForSingleDate(){
	var params= {};
	var fDate = $("#fDate4").val();

	params["fDate"]= fDate;
	params["methodName"] = "getExpensePaymentDetailsForSingleDate";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear table
		$('#expenseSingleDatetable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			var total =   $('#expenseSingleDatetable').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 4 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
/*
					// Update footer
					$( api.column( 4 ).footer() ).html(

							parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);	

					// Total over this page
					pageTotal1 = api
					.column( 4 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 4 ).footer() ).html(

							parseFloat(pageTotal1).toFixed(2)

					);
					console.log( pageTotal);
					var creditAmt =  parseFloat(pageTotal).toFixed(2);
					var debitAmt =  parseFloat(pageTotal1).toFixed(2);
					var remainAmt = +creditAmt - +debitAmt;

					// Update footer
					$( api.column( 5 ).footer() ).html(
							parseFloat(remainAmt).toFixed(2)
					);
*/
				},
				destroy: true,
				searching: true,		        
				columns: [
				          {"data": "insertDate" , "width": "5%" ,"defaultContent": ""}, 
				          {"data": "expenseName", "width": "5%" ,"defaultContent": ""},
				          {"data": "serviceProviderName", "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentMode" , "width": "5%" ,"defaultContent": ""},
				          {"data": "payment" , "width": "5%" ,"defaultContent": ""},
				          {"data": "accountantName" , "width": "5%" ,"defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Single Date Wise Expenditure Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#expenseSingleDatetable').dataTable().fnAddData(mydata);
			}
	);
}

/************ Between Two Dates *************/
function getExpensePaymentDetailsBetTwoDays(){
	var params= {};
	var startDate = $("#fisDate4").val();
	var endDate = $("#endDate4").val();

	var input = document.getElementById('expenseName'),
	list = document.getElementById('exp_drop'),
	i,fkRootexpId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootexpId = list.options[i].getAttribute('data-value');
		}
	}
	params["fkRootexpId"]= fkRootexpId; 
	params["fisDate"]= startDate;
	params["endDate"]= endDate;
	params["methodName"] = "getExpenditurePaymentReportBetweenTwoDates";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear Table
		$('#expenseBetweenTwoDates').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;


		$(document).ready(function() {
			$('#expenseBetweenTwoDates').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 3 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 3 ).footer() ).html(

							parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);	
/*
					// Total over this page
					pageTotal1 = api
					.column( 4 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 4 ).footer() ).html(

							parseFloat(pageTotal1).toFixed(2)

					);
					console.log( pageTotal);
					var creditAmt =  parseFloat(pageTotal).toFixed(2);
					var debitAmt =  parseFloat(pageTotal1).toFixed(2);
					var remainAmt = +creditAmt - +debitAmt;

					// Update footer
					$( api.column( 5 ).footer() ).html(

							parseFloat(remainAmt).toFixed(2)

					);
*/
				},
				destroy: true,
				searching: true,			      
				columns: [
				          {"data": "insertDate" , "width": "5%" ,"defaultContent": ""}, 
				          {"data": "expenseName", "width": "5%" ,"defaultContent": ""},
				          {"data": "serviceProviderName", "width": "5%" ,"defaultContent": ""},
				          {"data": "paymentMode" , "width": "5%" ,"defaultContent": ""},
				          {"data": "payment" , "width": "5%" ,"defaultContent": ""},
				          {"data": "accountantName" , "width": "5%" ,"defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Double Date Wise Expenditure Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );

		var mydata = catmap;
		$('#expenseBetweenTwoDates').dataTable().fnAddData(mydata);
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

/*get taday credit and debit report*/
function getTodayCreditDebitReport(){
	var params= {};
	params["methodName"] = "getTodayCreditDebitReport";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear Table
		$('#example1').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example1').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 1 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 1 ).footer() ).html(

							'Rs'+' '+parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);

					var abc = pageTotal;

					document.getElementById('creAmt').value = abc;
				},

				destroy: true,
				searching: true,				      
				columns: [
				          {"data": "name", "width": "5%" ,"defaultContent": ""},
				          {"data": "credit", "width": "5%" ,"defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Today's Credit Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example1').dataTable().fnAddData(mydata);
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

/*get taday credit and debit report*/
function getTodayCreditDebitReport1(){

	var params= {};
	params["methodName"] = "getTodayCreditDebitReport1";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear Table
		$('#example2').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {
			$('#example2').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 1 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 1 ).footer() ).html(
							'Rs'+' '+parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);
					var xyz = pageTotal;
					document.getElementById('debAmt').value = xyz;
				},
				destroy: true,
				searching: true,				      
				columns: [
				          {"data": "name", "width": "5%" ,"defaultContent": ""}, 
				          {"data": "debit", "width": "5%" ,"defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Today's Debit Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example2').dataTable().fnAddData(mydata);
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

/*get taday credit and debit report*/
function creditdebitForsingleDate(){

	var params= {};
	var fDate = $("#fDate").val();

	params["fDate"]= fDate;
	params["methodName"] = "creditdebitForsingleDate";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear Table
		$('#example3').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {
			$('#example3').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 1 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 1 ).footer() ).html(

							'Rs'+' '+parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);
				},
				destroy: true,
				searching: true,				      
				columns: [
				          {"data": "name", "width": "5%" ,"defaultContent": ""},
				          {"data": "credit", "width": "5%" ,"defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Single Date Credit Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example3').dataTable().fnAddData(mydata);
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

/*get taday credit and debit report*/
function creditdebitForsingleDate1(){
	var params= {};
	var fDate = $("#fDate").val();
	params["fDate"]= fDate;
	params["methodName"] = "creditdebitForsingleDate1";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear Table
		$('#example4').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example4').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 1 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 1 ).footer() ).html(

							'Rs'+' '+parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);
				},

				destroy: true,
				searching: true,				      
				columns: [
				          {"data": "name", "width": "5%" ,"defaultContent": ""},
				          {"data": "debit", "width": "5%" ,"defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Single Date Debit Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example4').dataTable().fnAddData(mydata);
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

function creditdebitForBetTowDate(){
	var params= {};
	var fisDate = $("#fisDate").val();
	var endDate = $("#endDate").val();

	params["fisDate"]= fisDate;
	params["endDate"]= endDate;
	params["methodName"] = "creditdebitForBetTowDate";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear Table
		$('#example5').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;


		$(document).ready(function() {
			$('#example5').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},
				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 1 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 1 ).footer() ).html(
							'Rs'+' '+parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);
				},

				destroy: true,
				searching: true,			      
				columns: [
				          {"data": "name", "width": "5%", "defaultContent": ""},
				          {"data": "credit", "width": "5%", "defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Double Date Credit Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example5').dataTable().fnAddData(mydata);
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

/*get taday credit and debit report*/
function creditdebitForBetTowDate1(){
	var params= {};
	var fisDate = $("#fisDate").val();
	var endDate = $("#endDate").val();
	params["fisDate"]= fisDate;
	params["endDate"]= endDate;
	params["methodName"] = "creditdebitForBetTowDate1";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear Table
		$('#example6').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example6').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 1 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 1 ).footer() ).html(

							'Rs'+' '+parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);
				},
				destroy: true,
				searching: true,			      
				columns: [
				          {"data": "name", "width": "5%" ,"defaultContent": ""},
				          {"data": "debit", "width": "5%" ,"defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Double Date Debit Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example6').dataTable().fnAddData(mydata);
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

function getYesterdarTotalAmount()
{
	var params= {};
	params["methodName"] = "getYesterdarTotalAmount";

	$("#yesAmt").append($("<input/>").attr("value","").text());
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			//document.getElementById("yesAmt").value =parseFloat(v.totalAmount).toFixed(2);
				});
			})
}

function getTodaySaleTotalAmount(){
	var params= {};
	params["methodName"] = "getTodaySaleTotalAmount";
	$("#dupsaletotal").append($("<input/>").attr("value","").text());
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			document.getElementById("dupsaletotal").value = v.totalAmount;
			getTodaySaleTotalAmount1();
				});
			})
}

function getTodaySaleTotalAmount1()
{
	var userType = $('#userType').val();
	var userName = $('#userName').val();	
	var params= {};
	params["userType"] = userType;
	params["userName"] = userName;
	params["methodName"] = "getTodaySaleTotalAmount1";

	$("#dupsaletotal1").append($("<input/>").attr("value","").text());
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			var grossSaleTotal =v.totalAmount;
			document.getElementById("totsaleAmt").value = grossSaleTotal;
			shreeDemo();
				});
			})
}

function getTodaySaleTotalAmountInDashboard(){
	var userType = $('#userType').val();
	var userName = $('#userName').val();	
	var params= {};
	params["userType"] = userType;
	params["userName"] = userName;
	params["methodName"] = "getTodaySaleTotalAmount1";

	$("#dupsaletotal1").append($("<input/>").attr("value","").text());
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			var grossSaleTotal =v.totalAmount;
			document.getElementById("totsaleAmt").value = grossSaleTotal;
				});
			})
}

function getTodaySaleReturnTotalAmount()
{
	var userType = $('#userType').val();
	var userName = $('#userName').val();	
	var params= {};
	params["userType"] = userType;
	params["userName"] = userName;
	params["methodName"] = "getTodaySaleReturnTotalAmount";

	$("#saleReturnAmt").append($("<input/>").attr("value","").text());
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			var grossSaleTotal =v.saleReturnAmount;
			
			document.getElementById("saleReturnAmt").value = grossSaleTotal;
			shreeDemo();
				});
			})
}

function getTodayCreditTotalAmount()
{
	var params= {};
	params["methodName"] = "getTodayCreditTotalAmount";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			var grossSaleTotal =v.creditSaleAmount;
			document.getElementById("creditSaleAmount").value = grossSaleTotal;
			shreeDemo();
				});
			})
}

function getTodayCreditReturnTotalAmount()
{
	var params= {};
	params["methodName"] = "getTodayCreditReturnTotalAmount";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			var grossSaleTotal =v.creditRerturnAmount;
			document.getElementById("creditReturnAmount").value = grossSaleTotal;
			shreeDemo();
				});
			})
}


function getTodayPurchaseReturnTotalAmount()
{
	var params= {};
	params["methodName"] = "getTodayPurchaseReturnTotalAmount";

	$("#purchaseReturnAmt").append($("<input/>").attr("value","").text());
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			var grossSaleTotal =v.purchaseReturnAmount;
			document.getElementById("purchaseReturnAmt").value = grossSaleTotal;
			shreeDemo();
				});
			})
}

function getTodayPurchaseTotalAmount(){
	var params= {};
	params["methodName"] = "getTodayPurchaseTotalAmount";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			var grossSaleTotal =v.totalAmount;
			document.getElementById("totpurchaseAmt").value = grossSaleTotal;
			shreeDemo();
				});
			})
}

function getTodayPurchaseTotalAmountInDashboard(){
	var params= {};
	params["methodName"] = "getTodayPurchaseTotalAmount";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			var grossSaleTotal =v.totalAmount;
			document.getElementById("totpurchaseAmt").value = grossSaleTotal;
				});
			})
}


function getTodayExpdCreditAmount()
{
	var params= {};
	params["methodName"] = "getTodayExpdCreditAmount";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			var expdCreditAmount =v.expdCreditAmount;
			document.getElementById("exCreditAmount").value = expdCreditAmount;
		});
	})
}

function getTodayExpdDebitAmount()
{
	var params= {};
	params["methodName"] = "getTodayExpdDebitAmount";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			var expdDebitAmount =v.expdDebitAmount;
			document.getElementById("exDebitAmount").value = expdDebitAmount;
		});
	})
}

function getTodayCashAmount()
{
	var userType = $('#userType').val();
	var userName = $('#userName').val();	
	var params= {};
	params["userType"] = userType;
	params["userName"] = userName;
	params["methodName"] = "getTodayCashAmount";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			var todayCashAmt =v.todayCashAmt;
			document.getElementById("todayCashAmount").value = todayCashAmt;
		});
	})
}

function getTodayCardAmount()
{
	var userType = $('#userType').val();
	var userName = $('#userName').val();	
	var params= {};
	params["userType"] = userType;
	params["userName"] = userName;
	params["methodName"] = "getTodayCardAmount";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			var todayCardAmount =v.todayCardAmt;
			document.getElementById("todayCardAmount").value = todayCardAmount;
		});
	})
}

function getTodayChequeAmount()
{
	var userType = $('#userType').val();
	var userName = $('#userName').val();	
	var params= {};
	params["userType"] = userType;
	params["userName"] = userName;
	params["methodName"] = "getTodayChequeAmount";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			var todayChequeAmount =v.todayChequeAmt;
			document.getElementById("todayChequeAmount").value = todayChequeAmount;
		});
	})
}

function getTodayNEFTAmount()
{
	var userType = $('#userType').val();
	var userName = $('#userName').val();	
	var params= {};
	params["userType"] = userType;
	params["userName"] = userName;
	params["methodName"] = "getTodayNEFTAmount";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			var todayNeftAmt =v.todayNeftAmt;
			document.getElementById("todayNeftAmount").value = todayNeftAmt;
		});
	})
}

function getAllBills1()
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
	params["supplier"]= supplier;
	params["methodName"] = "getAllBillBySuppliers";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			$("#billNo").append($("<option></option>").attr("value",i).text(v.billNo)); 
				});
			})
}

function getUnBillnoTotalAmount()
{
	var supName = $("#supplier").val();
	var input = document.getElementById('supplier'),
	list = document.getElementById('sup_drop'),
	i,supplier;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}
	var params= {};
	params["supplier"]= supplier;
	params["methodName"] = "getAllUnPaidBillAmount";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear Table
		$('#unPaidAmt').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {
			$('#unPaidAmt').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},
				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};
					// Total over this page
					pageTotal = api
					.column( 1 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 1 ).footer() ).html(

							'Rs'+' '+parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);
				},
				destroy: true,
				searching: true,			      
				columns: [
				          {"data": "supplierName", "width": "5%" ,"defaultContent": ""},
				          {"data": "balanceAmount", "width": "5%" ,"defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Supplier Balance Report\nName : "+supName;
				                    	 },
				                    	 orientation : 'portrait',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#unPaidAmt').dataTable().fnAddData(mydata);
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

function shreeDemo()
{
	/*var yesterdayAmt = document.getElementById("yesAmt").value;
	var todayCreditAmt = document.getElementById("creAmt").value;
	var todayDebitAmt = document.getElementById("debAmt").value;
	var todaySaleAmt = document.getElementById("totsaleAmt").value;
	//var todaySaleReturnAmt = document.getElementById("saleReturnAmt").value;
	var todayPurchaseReturnAmt = document.getElementById("purchaseReturnAmt").value;
	
	var grossSaleTotal = (+yesterdayAmt + +todayCreditAmt + +todaySaleAmt ) - (+todayDebitAmt + +todaySaleReturnAmt);
	document.getElementById("remAmt").value = grossSaleTotal;*/
}

function getCreditCustomerBalanceReportNameWise()
{
	var customerName = $("#creditCustomer5").val();
	var input = document.getElementById('creditCustomer5'),
	list = document.getElementById('cust_drop5'),
	i,customer;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			customer = list.options[i].getAttribute('data-value');
		}
	}
	var fkCustomerId = customer;
	var params= {};
	params["fkCustomerId"]= fkCustomerId;
	params["methodName"] = "getCreditCustomerBalanceReportNameWise";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear table
		$('#unPaidAmt').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			var total =   $('#unPaidAmt').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 1 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );


					// Update footer
					$( api.column( 1 ).footer() ).html(
							str = pageTotal.toFixed(0)
					);
					console.log( pageTotal);
				},
				destroy: true,
				searching: true,			        
				columns: [
				          {"data": "creditCustomerFirstName" , "width": "5%" ,"defaultContent": ""},
				          {"data": "balanceAmount" , "width": "5%" ,"defaultContent": ""},
				          ],

				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function()
				                    	 {
				                    		 return "Credit Customer Balance Report\nName : "+customerName;
				                    	 },
				                    	 orientation : 'portrait',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#unPaidAmt').dataTable().fnAddData(mydata);
			}
	);
}


function creditDebitReportRangeWise()
{
	var params= {};
	var startDateCD = $("#startDateCD").val();
	var endDateCD = $("#endDateCD").val();

	params["startDateCD"]= startDateCD;
	params["endDateCD"]= endDateCD;
	params["methodName"] = "creditDebitReportRangeWiseController";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		//To clear Table
		$('#creditDebitReport').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#creditDebitReport').DataTable( {

				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;

					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};

					// Total over this page
					pageTotal = api
					.column( 3 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 3 ).footer() ).html(

							parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);	

					// Total over this page
					pageTotal1 = api
					.column( 4 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 4 ).footer() ).html(

							parseFloat(pageTotal1).toFixed(2)

					);
					console.log( pageTotal);
					/*var creditAmt =  parseFloat(pageTotal).toFixed(2);
					var debitAmt =  parseFloat(pageTotal1).toFixed(2);
					var remainAmt = +creditAmt - +debitAmt;

					// Update footer
					$( api.column( 5 ).footer() ).html(

							parseFloat(remainAmt).toFixed(2)

					)*/;
				},
				destroy: true,
				searching: true,
				"paging":   false,
				"scrollY": "250px",
				
				columns: [
				          {"data": "trIdOrBillNo" , "width": "5%" ,"defaultContent": ""}, 
				          {"data": "discription", "width": "5%" ,"defaultContent": ""},
				          {"data": "transactionDate", "width": "5%" ,"defaultContent": ""},
				          {"data": "credit" , "width": "5%" ,"defaultContent": ""},
				          {"data": "debit" , "width": "5%" ,"defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function()
				                    	 {
				                    		 return "Credit Debit Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );

		var mydata = catmap;
		$('#creditDebitReport').dataTable().fnAddData(mydata);
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}



function getTodayCreditCustCashAmount()
{
	var userType = $('#userType').val();
	var userName = $('#userName').val();	
	var params= {};
	params["userType"] = userType;
	params["userName"] = userName;
	params["methodName"] = "getTodayCreditCustCashAmount";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			var todayCreditCustCashAmt = v.todayCreditCustCashAmt;
			document.getElementById("creditSaleCashAmount").value = todayCreditCustCashAmt;
		});
	})
}

function getTodayCreditCustCardAmount()
{
	var userType = $('#userType').val();
	var userName = $('#userName').val();	
	var params= {};
	params["userType"] = userType;
	params["userName"] = userName;
	params["methodName"] = "getTodayCreditCustCardAmount";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			var todayCreditCustCardAmt = v.todayCreditCustCardAmt;
			document.getElementById("creditSaleCardAmount").value = todayCreditCustCardAmt;
		});
	})
}












function salesGraph(){
	var params= {};
	params["methodName"] = "getSalesGraph";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data){
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		var sss = $.map(catmap, function(el) { return el.totalAmt });
		var ddd = $.map(catmap, function(el) { return el.saleDate });
		
Highcharts.chart('container', {
	chart: {
	    type: 'area'
	},
	title: {
	    text: 'Sale Chart'
	},
	subtitle: {
	    text: 'Source: <a href="https://http://www.embel.co.in">EMBEL TECHNOLOGIES</a>'
	},
	xAxis: {
		categories: ddd
	   /* allowDecimals: false,
	    labels: {
	        formatter: function () {
	            return this.value; // clean, unformatted number for year
	        }
	    }*/
	},
	yAxis: {
	    title: {
	        text: 'Figures (In Lakhs)'
	    },
	    labels: {
	        formatter: function () {
	            return this.value / 500 + 'k';
	        }
	    }
	},
	tooltip: {
	    pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
	},
	plotOptions: {
	    area: {
	    	pointStart: 05,
	        marker: {
	            enabled: false,
	            symbol: 'circle',
	            radius: 2,
	            states: {
	                hover: {
	                    enabled: true
	                }
	            }
	        }
	    }
	},
	series: [{
	    /*name: 'Year 2015',*/
	    data: sss
	},]
})
});
}

// Build the chart
function salesGraph1(){
	var params= {};
	params["methodName"] = "getSalesGraph";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data){
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		
		var sss = $.map(catmap, function(el) { return el.totalAmt });
		var ddd = $.map(catmap, function(el) { return el.saleDate });
		
		//alert(catmap);
Highcharts.chart('container1', {
chart: {
    type: 'bar'
},
title: {
    text: 'Sales Chart'
},
subtitle: {
    text: 'Source: <a href="https://http://www.embel.co.in">EMBEL TECHNOLOGIES</a>'
},
xAxis: {
    categories: ddd 
   /* title: {
        text: Dates
    }*/
},
yAxis: {
    min: 0,
    title: {
        text: 'Sales (In Thousands)',
        align: 'high'
    },
    labels: {
        overflow: 'justify' 
    }

},
tooltip: {
    valueSuffix: ' Thousands'
},
plotOptions: {
    bar: {
        dataLabels: {
            enabled: true
        }
    }
},
legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    x: -40,
    y: 80,
    floating: true,
    borderWidth: 1,
    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
    shadow: true
},
credits: {
    enabled: false
},
series: [ {
   /* name: 'Year 2015',*/
    data: sss 
},]
})
});
}

function purchaseGraph(){
	
	var params= {};
	params["methodName"] = "getPurchaseGraph";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data){
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		
		var sss = $.map(catmap, function(el) { return el.totalAmt });
		var ddd = $.map(catmap, function(el) { return el.saleDate });
		
Highcharts.chart('container2', {
chart: {
    type: 'area'
},
title: {
    text: 'Purchase Chart'
},
subtitle: {
    text: 'Source: <a href="https://http://www.embel.co.in">EMBEL TECHNOLOGIES</a>'
},
xAxis: {
	 categories: ddd 
   /* allowDecimals: false,
    labels: {
        formatter: function () {
            return this.value; // clean, unformatted number for year
        }
    }*/
},
yAxis: {
    title: {
        text: 'Figures (In Lakhs)'
    },
    labels: {
        formatter: function () {
            return this.value / 500 + 'k';
        }
    }
},
tooltip: {
    pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
},
plotOptions: {
    area: {
        pointStart: 05,
        marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
                hover: {
                    enabled: true
                }
            }
        }
    }
},
series: [ {
    name: 'Month 05',
    data: sss 
},]
});
});
}

// Build the chart
function purchaseGraph1(){
	
	var params= {};
	params["methodName"] = "getPurchaseGraph";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data){
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		
		var sss = $.map(catmap, function(el) { return el.totalAmt });
		var ddd = $.map(catmap, function(el) { return el.saleDate });
Highcharts.chart('container3', {
chart: {
    type: 'bar'
},
title: {
    text: 'Purchase Chart'
},
subtitle: {
    text: 'Source: <a href="https://http://www.embel.co.in">EMBEL TECHNOLOGIES</a>'
},
xAxis: {
	 categories: ddd 
  /*  title: {
        text: null
    }*/
},
yAxis: {
    min: 0,
    title: {
        text: 'Sales (In Lakhs)',
        align: 'high'
    },
    labels: {
        overflow: 'justify' 
    }

},
tooltip: {
    valueSuffix: ' Lakhs'
},
plotOptions: {
    bar: {
        dataLabels: {
            enabled: true
        }
    }
},
legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    x: -40,
    y: 80,
    floating: true,
    borderWidth: 1,
    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
    shadow: true
},
credits: {
    enabled: false
},
series: [ {
    name: 'Year 2015',
    data: sss 
},]
})
});
}
