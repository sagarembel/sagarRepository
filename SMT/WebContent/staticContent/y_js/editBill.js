function editBill1()
{		
	var firstNameSm = '';
	var lastNameSm = '';
	var mobileNo = $('#mobileNo').val();
	var creditCustomer1 = $('#creditCustomer1').val();

	if(mobileNo == "" || mobileNo == null || mobileNo == undefined)
	{
		mobileNo = 0;
	}
	else if(+(mobileNo.length) < 10)
	{
		alert("Please Enter Correct Mobile Number");
		return false;
	}
	
	var billNo = $('#billNoBW').val();
	if(billNo == null || billNo == undefined || billNo == "" || billNo == " ")
	{
		alert("Please Enter Bill Number");
		return false;
	}	
	
	var params = {};

	var count = jQuery("#jqGrid2").jqGrid('getGridParam', 'records')
	var allRowsInGrid = $('#jqGrid2').getGridParam('data');
	var totalAmount = 0;
	var checkCount = 0;
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{	
		var pkBillId = allRowsInGrid[i].pkBillId;
		params["pkBillId"+i] = pkBillId;
		
		var employeeName1 = allRowsInGrid[i].employeeName1;
		var res = employeeName1.split(" ");
		
		var saleEmpId = res[0];
		params["saleEmpId"+i] = saleEmpId;
		
		if(res[1] == undefined || res[1] == null)
		{
			firstNameSm = 'NA';
		}
		else
		{
			firstNameSm = res[1];
		}
		
		if(res[2] == undefined || res[2] == null)
		{
			lastNameSm = 'NA';
		}
		else
		{
			lastNameSm = res[2];
		}
		
		var saleEmpName = firstNameSm+" "+lastNameSm;
		params["saleEmpName"+i] = saleEmpName;		
	}	
	
	var totalAmount = $("#totalAmount").val();
	var lastPaymentMode = '';
	var cashCard_cashAmount = '';
	var cashCard_cardAmount = '';
	var oldCashAmount = $('#oldCashAmount').val();
	var oldCardAmount = $('#oldCardAmount').val();
	var finalCreditAmount = $("#finalCreditAmount").val();
	var paymentMode = $("#paymentMode").val();

	if(paymentMode == 'none' || paymentMode == null || paymentMode == undefined || paymentMode == "")
	{
		lastPaymentMode = $("#lastPaymentMode").val();
		paymentMode = lastPaymentMode;
		cashCard_cashAmount = $('#oldCashAmount').val();
		cashCard_cardAmount = $('#oldCardAmount').val();
		
		params["cashCard_cashAmount"] = cashCard_cashAmount;
		params["cashCard_cardAmount"] = cashCard_cardAmount;
	}
	else if(paymentMode == "cashAndCard")
	{	
		cashCard_cashAmount = $('#cashCard_cashAmount').val();
		cashCard_cardAmount = $('#cashCard_cardAmount').val();
		if(cashCard_cashAmount == undefined || cashCard_cashAmount == null || cashCard_cashAmount == "" || cashCard_cashAmount == " ")
		{
			myAlert("Please Enter Cash Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else
		{
			var checkCashAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cashAmount.match(checkCashAmt))
			{
				params["cashCard_cashAmount"] = cashCard_cashAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.custord.btnSubmit.disabled = false;
				return false;
			}
		}
		if(cashCard_cardAmount == undefined || cashCard_cardAmount == null || cashCard_cardAmount == "" || cashCard_cardAmount == " ")
		{
			myAlert("Please Enter Card Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else
		{
			var checkCardAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cardAmount.match(checkCardAmt))
			{
				params["cashCard_cardAmount"] = cashCard_cardAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.custord.btnSubmit.disabled = false;
				return false;
			}
		}
		
		if((+cashCard_cashAmount + +cashCard_cardAmount) > (+oldCashAmount + +oldCardAmount))
		{
			myAlert("Cash Amount + Card Amount is Greater Than "+(+totalAmount - +finalCreditAmount));
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else if((+cashCard_cashAmount + +cashCard_cardAmount) < (+oldCashAmount + +oldCardAmount))
		{
			myAlert("Cash Amount + Card Amount is Less Than "+(+totalAmount - +finalCreditAmount));
			document.custord.btnSubmit.disabled = false;
			return false;
		}
	}
	
	params["count"] = count;
	params["totalAmount"] = totalAmount;
	params["paymentMode"] = paymentMode;
	params["finalCreditAmount"] = finalCreditAmount;
	params["creditCustomer1"] = creditCustomer1;
	params["mobileNo"] = mobileNo;
	
	params["methodName"] = "editBillTaxInvoiceC";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) 
	{
		alert(data);
		location.reload();
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}



function editCreditCustBillValidate()
{
	var creditcustCustomer = $("#creditcustCustomer").val();
	var creditCustBillNo = $("#creditCustBillNo").val();
	
	if(creditcustCustomer == "" || creditcustCustomer == null || creditcustCustomer == " " || creditcustCustomer == undefined)
	{
		alert("Select Customer Name");
		return false;
	}	
	if(creditCustBillNo == "" || creditCustBillNo == null || creditCustBillNo == " " || creditCustBillNo == undefined)
	{
		alert("Select Bill No.");
		return false;
	}	
	editCreditCustBill();
}




function editCreditCustBill()
{	
	var firstNameSm = '';
	var lastNameSm = '';
	
	var input = document.getElementById('creditcustCustomer'),
	list = document.getElementById('creditcust_drop'),
	i,fkRootCustId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootCustId = list.options[i].getAttribute('data-value');
		}
	}
	
	var creditCustBillNo = $("#creditCustBillNo").val();
	
	var params = {};

	var count = jQuery("#jqGrid1").jqGrid('getGridParam', 'records')
	var allRowsInGrid = $('#jqGrid1').getGridParam('data');
	var totalAmount = 0;
	var checkCount = 0;
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{	
		var pkBillId = allRowsInGrid[i].pkBillId;
		params["pkBillId"+i] = pkBillId;
		
		var employeeName1 = allRowsInGrid[i].employeeName1;
		var res = employeeName1.split(" ");
		
		var saleEmpId = res[0];
		params["saleEmpId"+i] = saleEmpId;
		
		if(res[1] == undefined || res[1] == null)
		{
			firstNameSm = 'NA';
		}
		else
		{
			firstNameSm = res[1];
		}
		
		if(res[2] == undefined || res[2] == null)
		{
			lastNameSm = 'NA';
		}
		else
		{
			lastNameSm = res[2];
		}
		
		var saleEmpName = firstNameSm+" "+lastNameSm;
		params["saleEmpName"+i] = saleEmpName;		
	}	
	
	var totalAmount = $("#totalAmountCC").val();
	var lastPaymentMode = '';
	var cashCard_cashAmount = '';
	var cashCard_cardAmount = '';
	var oldCashAmount = $('#oldCashAmountCC').val();
	var oldCardAmount = $('#oldCardAmountCC').val();
	var finalCreditAmount = $("#finalCreditAmountCC").val();
	var paymentMode = $("#paymentModeCC").val();
	var netPaymentAmountCC = $("#netPaymentAmountCC").val();

	if(paymentMode == 'noneCC' || paymentMode == null || paymentMode == undefined || paymentMode == "" || paymentMode == "Select")
	{
		lastPaymentMode = $("#oldPaymentModeCC").val();
		paymentMode = lastPaymentMode;
		cashCard_cashAmount = $('#oldCashAmountCC').val();
		cashCard_cardAmount = $('#oldCardAmountCC').val();
				
		params["cashCard_cashAmount"] = cashCard_cashAmount;
		params["cashCard_cardAmount"] = cashCard_cardAmount;
	}
	else if(paymentMode == "cashCC")
	{
		paymentMode = "cash";
	}
	else if(paymentMode == "cardCC")
	{
		paymentMode = "card";
	}
	else if(paymentMode == "cashAndCardCC")
	{		
		cashCard_cashAmount = $('#cashCard_cashAmountCC').val();
		cashCard_cardAmount = $('#cashCard_cardAmountCC').val();
		if(cashCard_cashAmount == undefined || cashCard_cashAmount == null || cashCard_cashAmount == "" || cashCard_cashAmount == " ")
		{
			myAlert("Please Enter Cash Amount");
			document.ccEdit.creditBtn.disabled = false;
			return false;
		}
		else
		{
			var checkCashAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cashAmount.match(checkCashAmt))
			{
				params["cashCard_cashAmount"] = cashCard_cashAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.ccEdit.creditBtn.disabled = false;
				return false;
			}
		}
		if(cashCard_cardAmount == undefined || cashCard_cardAmount == null || cashCard_cardAmount == "" || cashCard_cardAmount == " ")
		{
			myAlert("Please Enter Card Amount");
			document.ccEdit.creditBtn.disabled = false;
			return false;
		}
		else
		{
			var checkCardAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cardAmount.match(checkCardAmt))
			{
				params["cashCard_cardAmount"] = cashCard_cardAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.ccEdit.creditBtn.disabled = false;
				return false;
			}
		}
		
		if((+cashCard_cashAmount + +cashCard_cardAmount) == +netPaymentAmountCC)
		{}
		else
		{
			myAlert("Cash Amount + Card Amount is Must Be Equal To Net Paid Amount");
			document.ccEdit.creditBtn.disabled = false;
			return false;
		}
		
		paymentMode = "cashAndCard";
	}
	
	params["count"] = count;
	params["totalAmount"] = totalAmount;
	params["paymentMode"] = paymentMode;
	params["netPaymentAmountCC"] = netPaymentAmountCC; 
	
	params["methodName"] = "editBillCreditCustomerController";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) 
	{
		alert(data);
		location.reload();
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}


function billEdit2()
{
	if(document.supd1.creditCustomer.value == "")
	{
		alert("Select Customer Name.");
		return false;
	}	
	if(document.supd1.billNo2.value == "")
	{
		alert("Select Bill No.");
		return false;
	}	
	billeditCreditCust();
}

function billeditCreditCust()
{
	var params = {};
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,creditCustomer,creditCustomer1;
	for (i = 0; i < list.options.length; ++i)
	{
		if (list.options[i].value === input.value)
		{
			creditCustomer = list.options[i].getAttribute('data-value');
			creditCustomer1 = list.options[i].getAttribute('value');
		}
	}

	var count = jQuery("#jqGrid1").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid1').getGridParam('data');

	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{	
		var firstNameSm = '';
		var lastNameSm = '';
		
		var pkBillId = allRowsInGrid[i].pkBillId;
		params["pkBillId" + i] = pkBillId;
		
		var employeeName1 = allRowsInGrid[i].employeeName1;
		var res = employeeName1.split(" ");
		
		var saleEmpId = res[0];
		params["saleEmpId"+i] = saleEmpId;
		
		if(res[1] == undefined || res[1] == null)
		{
			firstNameSm = 'NA';
		}
		else
		{
			firstNameSm = res[1];
		}
		
		if(res[2] == undefined || res[2] == null)
		{
			lastNameSm = 'NA';
		}
		else
		{
			lastNameSm = res[2];
		}
		
		var saleEmpName = firstNameSm+" "+lastNameSm;
		params["saleEmpName"+i] = saleEmpName;
	}

	
	var billNo = $('#billNo2').val();

	params["billNo"] = billNo;
	params["count"] = count;
	params["creditCustomer1"] = creditCustomer1;
	
	params["methodName"] = "creditCustEditBillTaxInvoice";	

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
		alert(data);
		location.reload();
	
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

var first;
function getEmpName()
{
	var params= {};
	
	params["methodName"] = "getEmpNameforGrid";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)	
	{  
		var jsonData = $.parseJSON(data);
		first = jsonData;
		//alert("get Data from DataBase****"+first);
		var catmap = jsonData.list;
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}
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

function getSaleItems2()
{	
	var billNo = $('#billNoBW').val();
	var params = {};
	params["methodName"] = "getSaleItemByBillNoForBillEdit";
	params["billNo"] = billNo;
	
	$.post('/SMT/jsp/utility/controller.jsp', params, function(data)
			{
				$("#jqGrid2").jqGrid("clearGridData");
				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;
				
				$.each(jsonData, function(i, v)
				{					
					getEmpName();
					var empname = first;
				
					getEmpName();
					var empname = first;
					
					getEmpName();
					var empname = first;
					
					if(v.contactNo == "0")
					{
						document.getElementById("mobileNo").value = "";
					}
					else
					{
						document.getElementById("mobileNo").value = v.contactNo;
					}					
					document.getElementById("creditCustomer1").value = v.customerName;
					document.getElementById("totalAmount").value = v.totalProductAmount;
					document.getElementById("discount").value = v.totalDiscount;
					document.getElementById("lastPaymentMode").value = v.paymentMode;
					document.getElementById("grossTotal").value = v.grossTotal;
					document.getElementById("totalQuantity").value = v.billProCount;
					document.getElementById("oldCashAmount").value = v.oldCashAmount;
					document.getElementById("oldCardAmount").value = v.oldCardAmount;
					document.getElementById("finalCreditAmount").value = v.totalSaleReturnAmt;
					$("#jqGrid2").jqGrid({
								datatype : "local",

								colNames : [ "PkBillId", "Date", "Category<br>Name","Item Name","Barcode<br>No", "QTY", "Return<br>Quantity", "Sale<br>Price", 
											 "SP<br>Without<br>Tax", "Contact<br>No", "<br>Total", "Discount", "Size", "GST%", "igst", "Tax<br>Amount", "Total", 
											 "Total<br>Per<br>Product", "Employee<br>Name"
								             ],

								             colModel : [ 
								            {
									           	 name : 'pkBillId',
									           	 width : 140,
									           	sortable: false,
									           	 hidden : true,
									         }, 								            	 
							            	 {
								            	 name : 'Date',
								            	 sortable: false,
								            	 sortable: false,
								            	 width : 110,

								             },
								             {
								            	 name : "categoryName",
								            	 sortable: false,
								            	 sortable: false,
								            	 width : 140,
								             },
								             {
								            	 name : "itemName",
								            	 sortable: false,
								            	 sortable: false,
								            	 width : 100,
								             },
								             {
								            	 name : "barcodeNo",
								            	 sortable: false,
								            	 sortable: false,
								            	 width : 100,
								             },
								             {
								            	 name : 'quantity',
								            	 sortable: false,
								            	 sortable: false,
								            	 width : 50,
								             },								
								             {
								            	 name : 'editQuantity',
								            	 editoptions: { defaultValue: '00'},
								            	 width : 70,
								            	 sortable: false,
								            	 hidden: true,
								             },
								             {
								            	 name : "salePrice",
								            	 sortable: false,
								            	 sortable: false,
								            	 width : 70,
								             },
								             {
								            	 name : "spWithoutTax",
								            	 sortable: false,
								            	 sortable: false,
								            	 width : 70,
								             },
								             {
								            	 name : "contactNo",
								            	 width : 120,
								            	 sortable: false,
								            	 hidden:true,
								             },
								             {
								            	 name : "returnTotalAmt",
								            	 width : 150,
								            	 sortable: false,
								            	 hidden:true,
								             },
								             {
								            	 name : 'discount',
								            	 sortable: false,
								            	 width : 60,
								             },
								             {
								            	 name : 'size',
								            	 width : 90,
								            	 sortable: false,
								            	 hidden : true,
								             },
								             {
								            	 name : 'gst',
								            	 sortable: false,
								            	 width : 50,
								             },
								             {
								            	 name : 'iGst',
								            	 width : 50,
								            	 sortable: false,
								            	 hidden: true,
								             },
								             {
								            	 name : 'taxAmt',
								            	 sortable: false,
								            	 width : 90,
								             },								            
								             {
								            	 name : "totalAmt",
								            	 width : 100,
								            	 sortable: false,
								             },
								             {
								            	 name : 'finalTotalPerProduct',
								            	 width : 120,
								            	 sortable: false,
								            	 hidden: true,
								             },
								             {	name:'employeeName1',//this is for take drop down in grid
									        	  width:200,
									        	  align:'center',
									        	  sortable: false,
					                              editable:true,
					                              edittype: 'select',
					                              sortable: false,
					                              editoptions: { value:empname}
									          }
								             ],

								             loadonce: false,
								             viewrecords: true,
								             width: 1200,
								             shrinkToFit: true,
								             rowList : [10,20,50],
								             rownumbers: true,
								             rowNum: 10,
								             'cellEdit':true,
								             afterSaveCell: function ()
								             {
								            	 var rowId =$("#jqGrid2").jqGrid('getGridParam','selrow');  
								            	 var rowData = jQuery("#jqGrid2").getRowData(rowId);
								            	 var quantity = rowData['quantity'];
								            	 var editQuantity = rowData['editQuantity'];
								            	 var salePrice = rowData['salePrice'];
								            	 var discount = rowData['discount'];
								            	 var pName = rowData['itemName'];
								            	 var categoryName = rowData['categoryName'];
								            	 var unit = rowData['size'];
								            	 var returnTotalAmt = rowData['returnTotalAmt'];
								            	 var taxAmt = rowData['taxAmt'];
								            	 var gst = rowData['gst'];
								            	 var iGst = rowData['iGst'];
								            	 var totalAmt = rowData['totalAmt'];
								            	 var finalTotalPerProduct = rowData['finalTotalPerProduct'];
								            	 var employeeName1=rowData['employeeName1'];
								            	 
								            	 if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
								            	 {
							            		 	editQuantity = 00;
							            		 	var setZero = "00";
						                    		$("#jqGrid2").jqGrid("setCell", rowId, "editQuantity", setZero);
						                    		return false;
								            	 }
/*								            	 
								            	 if(editQuantity == "0" || editQuantity == "")
								            	 { 
								            		 var edit = "00";
							            		 	 $("#jqGrid2").jqGrid("setCell", rowId, "editQuantity", edit);
								            	 }
								            	 
								            	 if(Number(editQuantity) > Number(quantity))
								            	 {
								            		 alert("Return Quantity Is Greater Than Quantity");
								            		 var totalAmt = rowData['finalTotalPerProduct'];
								            		 var rtota = 0.00;
								            		 var edit = "00";
							            		 	 $("#jqGrid2").jqGrid("setCell", rowId, "returnTotalAmt", rtota);
						                    		 $("#jqGrid2").jqGrid("setCell", rowId, "totalAmt", totalAmt);
						                    		 $("#jqGrid2").jqGrid("setCell", rowId, "editQuantity", edit);
								            		 
								            		 return false;
								            	 }

								            	 var afterquantity = quantity - editQuantity;
*/								            	/*if(editQuantity > 0)
								            	 {
								            		if (unit == "meter"
													|| unit == "Meter"
													|| unit == "METER"
													|| unit == "MTR"
													|| unit == "mtr"
													|| unit == "Mtr")
													{
								            			 
													}else
													{
														var setZero = 0;
														$("#jqGrid2").jqGrid("setCell", rowId, "discount", setZero);
													}
								            	 }*/

								            	 if(quantity > 0)
								            	 {								            	 
									            	 var tota = quantity * totalAmt;
	
									            	// var tota1 = (editQuantity * salePrice)-(editQuantity*discount);
									            	 var tota1 = (quantity * totalAmt);// (editQuantity * salePrice);
									            	/*alert("Return Amount of"+pName+"is"+tota1);*/
	
									            	 $("#jqGrid2").jqGrid("setCell", rowId, "returnTotalAmt", tota1);
	
									            	 if(tota == 0)
									            	 {
									            		 $("#jqGrid2").jqGrid("setCell", rowId, "grossamt", tota);
									            	 }
									            	 else
									            	 {
									            		 var gross = ((discount/100)*tota) + tota;
									            		 $("#jqGrid2").jqGrid("setCell", rowId, "grossamt", gross);
									            	 }
								            	 

								            	 $("#jqGrid2").jqGrid("setCell", rowId, "totalAmt", tota.toFixed(2));
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
/*												
												 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3});
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
*/
								            	 document.getElementById("totalAmount").value = parseTotal.toFixed(2);;
								            	 document.getElementById("grossTotal").value = parseTotal.toFixed(2);;
								             }else{}
								             },
							            	 
								             //footerrow: true, // set a footer row

								             gridComplete: function()
								             {
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
/*								            	 
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
*/								            	 
								            	 document.getElementById("totalAmount").value = parseTotal.toFixed(2);;
								            	 document.getElementById("grossTotal").value = +(+parseTotal - +v.totalSaleReturnAmt).toFixed(2);
								             },

								             pager : "#jqGridPager2",

							});

					$("#jqGrid2").addRowData(i, jsonData[i]);

					$('#jqGrid2').navGrid('#jqGridPager2',
							// the buttons to appear on the toolbar of the grid
							{ edit: true, add: true, del: false, search: true, refresh: false, view: true, position: "left", cloneToTop: false },
							// options for the Edit Dialog
							{
								editCaption : "The Edit Dialog",
								recreateForm : true,
								checkOnUpdate : true,
								checkOnSubmit : true,
								closeAfteredit : true,
								errorTextFormat : function(data) {
									return 'Error: '
									+ data.responseText
								}
							},

							{},

							// options for the Delete Dailog
							{
								closeAfterdel:true,
								recreateForm: true,
								afterComplete: function() {
									$('#jqGrid2').trigger( 'reloadGrid' );
									

					            	 var rowId =$("#jqGrid2").jqGrid('getGridParam','selrow');  
					            	 var rowData = jQuery("#jqGrid2").getRowData(rowId);
					            	 var quantity = rowData['quantity'];
					            	 var editQuantity = rowData['editQuantity'];
					            	 var salePrice = rowData['salePrice'];
					            	 var discount = rowData['discount'];

					            	 if(Number(editQuantity) > Number(quantity))
					            	 {
					            		 alert("Return Quantity Is Greater Than Quantity");
					            	 }

					            	 var afterquantity = quantity - editQuantity;

					            	 var tota = afterquantity * salePrice;

					            	 var tota1 = editQuantity * salePrice;

					            	 $("#jqGrid2").jqGrid("setCell", rowId, "returnTotalAmt", tota1);

					            	 if(tota == 0){

					            		 $("#jqGrid2").jqGrid("setCell", rowId, "grossamt", tota);
					            	 }
					            	 else{
					            		 var gross = ((discount/100)*tota) + tota;
					            		 $("#jqGrid2").jqGrid("setCell", rowId, "grossamt", gross);

					            	 }

					            	 $("#jqGrid2").jqGrid("setCell", rowId, "totalAmt", tota);
					            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
					            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
					            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
					            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
					             
								},
								errorTextFormat: function (data) {
									return 'Error: ' + data.responseText
								},
								onSelectRow: function(id) {
									if (id && id !== lastSel) {
										jQuery("#jqGrid2").saveRow(lastSel, true, 'clientArray');
										jQuery("#jqGrid2").editRow(id, true);
										lastSel = id;
										console.log(id);
									}
								}
							});
				});
			}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
				}
			});
}

function getSaleItems1()
{
	var billNo = $('#billNo2').val();
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,creditCustomer,creditCustomer1;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
			creditCustomer1 = list.options[i].getAttribute('value');
		}
	}

	var params = {};
	
	params["methodName"] = "getSaleItemByBillNoForBillEditCreditCust";
	
	params["creditCustomer1"] = "creditCustomer1";
	params["billNo"] = billNo;
	$.post(
			'/SMT/jsp/utility/controller.jsp',
			params,
			function(data) {

				$("#jqGrid1").jqGrid("clearGridData");
				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;
				$.each(jsonData, function(i, v) 
				{	
					getEmpName();
					var empname = first;
					
					getEmpName();
					var empname = first;
					
					getEmpName();
					var empname = first;
					
					$("#jqGrid1").jqGrid(
							{
								datatype : "local",

								colNames : [ "pkId", "Date","Category Name","Item Name","Barcode No",
								             "Quantity", "Return Quant", "SalePrice",
								             "Return Total","Total","Discount",
								              "Size", "creditCustId", "Bill No", 
								             "gst", "iGst", "Tax Amount", "finalTotalPerProduct",
								             "Employee<br>Name"],

								             colModel : [
								             {
									            	 name : "pkBillId",
									            	 //hidden : true
									         }, 
							            	 {
								            	 name : 'Date',
								            	 width : 140,
								             },								            	 
								            
								             {
								            	 name : "categoryName",
								            	 width : 100,
								             },

								             {
								            	 name : "itemName",
								            	 width : 100,
								             },
								             {
								            	 name : "barcodeNo",
								            	 width : 100,
								             },
								             {
								            	 name : 'quantity',
								            	 width : 70,
								             },								
								             {
								            	 name : 'editQuantity',
								            	 width : 70,
								            	 editable : true,
								            	 hidden:true,
								             },
								             {
								            	 name : "salePrice",
								            	 width : 100,
								             },
								             {
								            	 name : "returnTotalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								            	 hidden:true,
								             },
								             {
								            	 name : "totalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								            	 hidden:true,
								             },
								             {
								            	 name : 'discount',
								            	 width : 50,
								             },								            
								             {
								            	 name : 'size',
								            	 width : 140,
								            	 hidden : true
								             },
								             {
								            	 name : 'fkCreditCustId',
								            	 width : 140,
								            	 hidden : true
								             },
								             {
								            	 name : 'billNo',
								            	 width : 140,
								            	 hidden : true
								             },
								             {
								            	 name : 'gst',
								            	 width : 140,
								            	 //hidden : true
								             },
								             {
								            	 name : 'iGst',
								            	 width : 140,
								            	 hidden : true
								             },
								             {
								            	 name : 'taxAmt',
								            	 width : 140,
								            	 //hidden : true
								             },
								             {
								            	 name : "finalTotalPerProduct",
								            	 width : 150,
								            	 formatter: 'number',
								            	 hidden:true,
								             },
								             {	name:'employeeName1',//this is for take drop down in grid
									        	  width:250,
									        	  align:'center',
									        	  sortable: false,
					                              editable:true,
					                              edittype: 'select', 
					                              editoptions: { value:empname}
									          }
								             ],

								             loadonce: false,
								             viewrecords: true,
								             width: 1350,
								             shrinkToFit: true,
								             rowList : [10,20,50],
								             rownumbers: true,
								             rowNum: 10,
								             'cellEdit':true,
								             afterSaveCell: function () {
								            	 var rowId =$("#jqGrid1").jqGrid('getGridParam','selrow');  
								            	 var rowData = jQuery("#jqGrid1").getRowData(rowId);
								            	 var quantity = rowData['quantity'];
								            	 var editQuantity = rowData['editQuantity'];
								            	 var salePrice = rowData['salePrice'];
								            	 var discount = rowData['discount'];
								            	 var unit = rowData['size'];
								            	 var fkCreditCustId = rowData['fkCreditCustId'];
								            	 var returnTotalAmt = rowData['returnTotalAmt'];
								            	 var billNo = rowData['billNo'];
								            	 var gst = rowData['gst'];
								            	 var iGst = rowData['iGst'];
								            	 var taxAmt = rowData['taxAmt'];
								            	 var finalTotalPerProduct = rowData['finalTotalPerProduct'];
								            	 
								            	 if (editQuantity == "")
								            	 {
								            		var setZero = "00";
		 				                    		$("#jqGrid1").jqGrid("setCell", rowId, "editQuantity", setZero);							            		 
								            	 }
								            	 
								            	 if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
								            	 {
								            		 	editQuantity = 0;
								            		 	var setZero = "00";
							                    		$("#jqGrid1").jqGrid("setCell", rowId, "editQuantity", setZero);
							                    		return false;
								            	 }
								            	 
								            	 if(Number(editQuantity) > Number(quantity))
								            	 {
								            		 alert("Return Quantity Is Greater Than Quantity");
								            		 var setZero = "00";
							                    	 $("#jqGrid1").jqGrid("setCell", rowId, "editQuantity", setZero)
								            		 return false;
								            	 }
								            	 var afterquantity = quantity - editQuantity;
								            	 var tota = afterquantity * finalTotalPerProduct;//salePrice;
								            	 var total1 = editQuantity * finalTotalPerProduct;//salePrice;

								            	 $("#jqGrid1").jqGrid("setCell", rowId, "returnTotalAmt", total1);

								            	 if(tota == 0)
								            	 {
								            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", tota);
								            	 }
								            	 else
								            	 {
								            		 var gross = ((discount/100)*tota) + tota;
								            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", gross);
								            	 }

								            	 $("#jqGrid1").jqGrid("setCell", rowId, "totalAmt", tota);
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'salePrice', false, 'sum');
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotalDis=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { salePrice: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotalDis });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
								             },
								             footerrow: true, // set a footer row

								             gridComplete: function()
								             {
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'salePrice', false, 'sum');
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotalDis=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { salePrice: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotalDis });
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
								             },

								             pager : "#jqGridPager1",

							});

					$("#jqGrid1").addRowData(i, jsonData[i]);

					$('#jqGrid1')
					.navGrid(
							'#jqGridPager1',
							// the buttons to appear on the toolbar of the grid
							{ edit: true, add: true, del: true, search: true, refresh: false, view: true, position: "left", cloneToTop: false },
							// options for the Edit Dialog
							{
								editCaption : "The Edit Dialog",
								recreateForm : true,
								checkOnUpdate : true,
								checkOnSubmit : true,
								closeAfteredit : true,
								errorTextFormat : function(data) {
									return 'Error: '
									+ data.responseText
								}
							},

							{},

							// options for the Delete Dailog
							{
								closeAfterdel:true,
								recreateForm: true,
								afterComplete: function() {
									$('#jqGrid1').trigger( 'reloadGrid' );
									

					            	 var rowId =$("#jqGrid1").jqGrid('getGridParam','selrow');  
					            	 var rowData = jQuery("#jqGrid1").getRowData(rowId);
					            	 var quantity = rowData['quantity'];
					            	 var editQuantity = rowData['editQuantity'];
					            	 var salePrice = rowData['salePrice'];
					            	 var discount = rowData['discount'];
					            	 if(Number(editQuantity) > Number(quantity))
					            	 {
					            		 alert("Return Quantity Is Greater Than Quantity");
					            	 }
					            	 var afterquantity = quantity - editQuantity;
					            	 var tota = afterquantity * salePrice;
					            	 var total1 = editQuantity * salePrice;

					            	 $("#jqGrid1").jqGrid("setCell", rowId, "returnTotalAmt", total1);

					            	 if(tota == 0){

					            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", tota);
					            	 }
					            	 else{
					            		 var gross = ((discount/100)*tota) + tota;
					            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", gross);

					            	 }

					            	 $("#jqGrid1").jqGrid("setCell", rowId, "totalAmt", tota);
					            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
					            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
					            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
					            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
					             
								},
								errorTextFormat: function (data) {
									return 'Error: ' + data.responseText
								},
								onSelectRow: function(id) {
									if (id && id !== lastSel) {
										jQuery("#jqGrid1").saveRow(lastSel, true, 'clientArray');
										jQuery("#jqGrid1").editRow(id, true);
										lastSel = id;
										console.log(id);
									}
								}
							});
				});

			}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
				}
			});
}

function getAllSaleReturn()
{
	var params = {};
	var namePresent;
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');

	var action = new Array();
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {
		var idVal = "";
		if (i != 0) {
			idVal = i;
		}
		var itemId = allRowsInGrid[i].itemId;
		params["itemId" + i] = itemId;

		var color = allRowsInGrid[i].color;
		params["color" + i] = color;

		var customerBill = allRowsInGrid[i].customerBill;
		params["customerBill" + i] = customerBill;

		var quantity = allRowsInGrid[i].quantity;
		params["quantity" + i] = quantity;

		var SalePrice = allRowsInGrid[i].SalePrice;
		params["SalePrice" + i] = SalePrice;

		var totalAmount = allRowsInGrid[i].totalAmount;
		params["totalAmount" + i] = totalAmount;

		var netAmount = allRowsInGrid[i].netAmount;
		params["netAmount" + i] = netAmount;

		var soldDate = allRowsInGrid[i].soldDate;
		params["soldDate" + i] = soldDate;

		var itemName = allRowsInGrid[i].itemName;
		params["itemName" + i] = itemName;

		var color = allRowsInGrid[i].color;
		params["color" + i] = color;

		var discountforsalereturn = allRowsInGrid[i].discountforsalereturn;
		params["discountforsalereturn"+i] = discountforsalereturn;

		var total = params["unitPrice" + i] * params["quantity" + i];

		params["total" + i] = total;
		for (var int = 0; int < count.length; int++) {

		}
	}

	var customerBill = $('#customerBill').val();
	params["customerBill"] = customerBill;

	params["count"] = count;

	params["methodName"] = "saleReturnReceipt";
	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
		alert(data);
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function getItemDetails()
{
	this.getitems = getitems;

	/********************************** code for GET ITEM DETAILS BY CATEGORY*******************************************/

	function sumFmatter(cellvalue, options, rowObject) {
		return options.rowData.quantity * options.rowData.unitPrice;

	}

	function getitems() {

		$("#jqGrid").jqGrid("clearGridData");
		var customerBill = $('#customerBill').val();

		var params = {};
		params["methodName"] = "getItemsBySaleBill";
		params["customerBill"] = customerBill;
		$.post(
				'/SMT/jsp/utility/controller.jsp',params,function(data) {

					var jsonData = $.parseJSON(data);
					var catmap = jsonData.list;

					function sumFmatter (cellvalue, options, rowObject)
					{
						var jam=0;
						var jam1="";
						var tot= (options.rowData.quantity * options.rowData.SalePrice);
						var shree = document.good1.resolution.value;

						var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
						var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
						var AllRows=JSON.stringify(allRowsInGrid1);
						for (var i = 0; i < count; i++) {

							var quantity = allRowsInGrid1[i].quantity;
							params["quantity"+i] = quantity;

							var SalePrice = allRowsInGrid1[i].SalePrice;
							params["SalePrice"+i] = SalePrice;

							var totals1=((SalePrice)*(quantity));

							jam = jam + totals1;

						}
						jam1= jam+tot;

						document.getElementById("resolution").value = jam1;
						return tot;
					}

					$.each(jsonData, function(i, v) {

						$("#jqGrid").jqGrid(
								{
									datatype : "local",

									colNames : ["customerBill","ItemID","Employee Name", "Item Name","Color",
									            "Quantity", "Price",
									            "Sale DAte", "totalAmount" ,"discount","NETTotal" ],

									            colModel : [ 

									                        {
									                        	name : "customerBill",
									                        },
									                        {
									                        	name : "itemId",
									                        	hidden : true
									                        },

									                        {
									                        	name:"empName",
									                        	width : 220,
									                        },

									                        {
									                        	name : "itemName",
									                        	width : 200,
									                        },

									                        {
									                        	name:"color" ,
									                        	width : 100,
									                        },

									                        {
									                        	name : "quantity",
									                        	width : 140,
									                        	editable : true
									                        },

									                        {
									                        	name : 'SalePrice',
									                        	width : 120,
									                        	editable : true
									                        }, 
									                        {
									                        	name : 'soldDate',
									                        	width : 200,
									                        	editable : true
									                        },

									                        {
									                        	label : 'Total',
									                        	name : "totalAmount",
									                        	width : 175,
									                        },

									                        {
									                        	name:"discountforsalereturn",
									                        	width : 150
									                        },
									                        {
									                        	name : "netAmount",
									                        	formatter: sumFmatter,
									                        	width : 150,
									                        }
									                        ],

									                        sortorder : 'desc',

									                        loadonce : true,
									                        viewrecords : true,
									                        width : 1200,
									                        height : 200,
									                        pager : "#jqGridPager"
								});

						$("#jqGrid").addRowData(i, jsonData[i]);

						$('#jqGrid').navGrid('#jqGridPager',
								// the buttons to appear on the toolbar of the grid
								{ edit: true, add: true, del: true, search: true, refresh: false, view: true, position: "left", cloneToTop: false },
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
								// options for the Add Dialog
								{
									closeAfterAdd: true,
									recreateForm: true,
									errorTextFormat: function (data) {
										return 'Error: ' + data.responseText
									}
								},
								// options for the Delete Dailog
								{
									closeAfterdel:true,
									recreateForm: true,
									afterComplete: function() {
										$('#jqGrid').trigger( 'reloadGrid' );
									},
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
				}).error(function(jqXHR, textStatus, errorThrown) {
					if (textStatus === "timeout") {
					}
				});
	}
}

var items = new getItemDetails();
function getBillByMiscellaneousCustomer1(){
	var input = document.getElementById('creditCustomer5'),
	list = document.getElementById('cust_drop5'),
	i,creditCustomer,creditCustomer1;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer1 = list.options[i].getAttribute('data-value');
			creditCustomer = list.options[i].getAttribute('value');
		}
	}
	var creditCustomer = creditCustomer;
	$("#billNo").empty();
	$("#billNo").append($("<option></option>").attr("value","").text("Select bill"));
	var params= {};
	params["creditCustomer"]= creditCustomer;
	params["methodName"] = "getAllBillByCustomer1";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
			$("#billNo").append($("<option></option>").attr("value",v.billNo).text(v.billNo)); 
				});
			})
}

function getBillByCustomer1(){
	var input = document.getElementById('creditcustCustomer'),
	list = document.getElementById('creditcust_drop'),
	i,creditCustomer;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
		}
	}
	var creditCustomer = creditCustomer;
	$("#creditCustBillNo").empty();
	$("#creditCustBillNo").append($("<option></option>").attr("value","").text("Select bill"));
	var params= {};
	params["creditCustomer"]= creditCustomer;
	params["methodName"] = "getAllBillByCustomer2";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			$("#creditCustBillNo").append($("<option></option>").attr("value",i).text(v.billNo)); 
		});
	})
}

function getCreditCustEditBill()
{
	var billNo = $('#creditCustBillNo').val();
	var input = document.getElementById('creditcustCustomer'),
	list = document.getElementById('creditcust_drop'),
	i,creditCustomer,creditCustomer1;
	for (i = 0; i < list.options.length; ++i)
	{
		if (list.options[i].value === input.value)
		{
			creditCustomer = list.options[i].getAttribute('data-value');
			creditCustomer1 = list.options[i].getAttribute('value');
		}
	}

	var params = {};
	
	params["methodName"] = "getSaleItemByBillNoForBillEditCreditCust";
	
	params["creditCustomer1"] = "creditCustomer1";
	params["billNo"] = billNo;
	$.post('/SMT/jsp/utility/controller.jsp',
			params,
			function(data)
			{
				$("#jqGrid1").jqGrid("clearGridData");
				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;
				$.each(jsonData, function(i, v)
				{
					getEmpName();
					var empname = first;
				
					getEmpName();
					var empname = first;
					
					getEmpName();
					var empname = first;						
					
					document.getElementById("totalAmountCC").value = v.totalProductAmount;
					document.getElementById("discountCC").value = v.totalDiscount;
					document.getElementById("oldPaymentModeCC").value = v.paymentMode;					
					document.getElementById("totalQuantityCC").value = v.billProCount;
					document.getElementById("oldCashAmountCC").value = v.oldCashAmount;
					document.getElementById("oldCardAmountCC").value = v.oldCardAmount;
					document.getElementById("finalCreditAmountCC").value = v.totalSaleReturnAmt;
					document.getElementById("netPaymentAmountCC").value = v.netPaymentAmount;
					document.getElementById("grossTotalCC").value = v.grossamt;
					
					$("#jqGrid1").jqGrid(
							{
								datatype : "local",

								colNames : [ "Date", "itemID", "CatId", "Category<br>Name", "productId", "Item<br>Name", "SubCatId", "Barcode<br>No",
								             "Qty", "Return Quantity", "Sale<br>Price", "SP<br>Without<br>Tax", "Return Total", "Discount", "Size", 
								             "creditCustId", "Bill No", "gst", "iGst", "Tax Amount", "Total", "Employee Name"],

								             colModel : [
								             {
								            	 name : 'Date',
								            	 width : 120,
								             },								            	 
								             {
								            	 name : "pkBillId",
								            	 hidden : true
								             }, 
								             {
								            	 name : "catId",
								            	 hidden : true
								             }, 
								             {
								            	 name : "categoryName",
								            	 width : 85,
								             },
								             {
								            	 name : "productId",
								            	 hidden : true
								             }, 
								             {
								            	 name : "itemName",
								            	 width : 90,
								             },
								             {
								            	 name : "subCatId",
								            	 hidden : true
								             }, 
								             {
								            	 name : "barcodeNo",
								            	 width : 75,
								             },
								             {
								            	 name : 'quantity',
								            	 width : 70,
								             },								
								             {
								            	name : 'editQuantity',
								            	width : 70,
								            	editable : true,
								            	hidden: true,
								             },
								             {
								            	 name : "salePrice",
								            	 width : 100,
								             },
								             {
								            	 name : "spWithoutTax",
								            	 width : 100,
								             },
								             {
								            	 name : "returnTotalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								            	 hidden:true,
								             },
								             {
								            	 name : 'discount',
								            	 width : 80,
								             },								            
								             {
								            	 name : 'size',
								            	 width : 140,
								            	 hidden : true
								             },
								             {
								            	 name : 'fkCreditCustId',
								            	 width : 140,
								            	 hidden : true
								             },
								             {
								            	 name : 'billNo',
								            	 width : 140,
								            	 hidden : true
								             },
								             {
								            	 name : 'gst',
								            	 width : 50,
								            	 //hidden : true
								             },
								             {
								            	 name : 'iGst',
								            	 width : 50,
								            	 hidden : true
								             },
								             {
								            	 name : 'taxAmt',
								            	 width : 100,
								            	 //hidden : true
								             },
								             {
								            	 name : "totalAmt",
								            	 width : 150,
								             },
								             {
							            	 	  name:'employeeName1',//this is for take drop down in grid
									        	  width:240,
									        	  align:'center',
									        	  sortable: false,
					                              editable:true,
					                              edittype: 'select', 
					                              editoptions: { value:empname}										          
								             },
								             ],

								             loadonce: false,
								             viewrecords: true,
								             width: 1200,
								             shrinkToFit: true,
								             rowList : [10,20,50],
								             rownumbers: true,
								             rowNum: 10,
								             'cellEdit':true,
								             afterSaveCell: function ()
								             {
								            	 var rowId =$("#jqGrid1").jqGrid('getGridParam','selrow');  
								            	 var rowData = jQuery("#jqGrid1").getRowData(rowId);
								            	 var quantity = rowData['quantity'];
								            	 var editQuantity = rowData['editQuantity'];
								            	 var salePrice = rowData['salePrice'];
								            	 var discount = rowData['discount'];
								            	 var unit = rowData['size'];
								            	 var fkCreditCustId = rowData['fkCreditCustId'];
								            	 var returnTotalAmt = rowData['returnTotalAmt'];
								            	 var billNo = rowData['billNo'];
								            	 var gst = rowData['gst'];
								            	 var iGst = rowData['iGst'];
								            	 var taxAmt = rowData['taxAmt'];
								            	 var finalTotalPerProduct = rowData['finalTotalPerProduct'];
								            	 
								            	 if(editQuantity == "" || editQuantity == "0")
								            	 {
								            		var setZero = "00";
		 				                    		$("#jqGrid1").jqGrid("setCell", rowId, "editQuantity", setZero);							            		 
								            	 }
								            	 
								            	 if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
								            	 {
								            		 	editQuantity = 0;
								            		 	var setZero = "00";
							                    		$("#jqGrid1").jqGrid("setCell", rowId, "editQuantity", setZero);
							                    		return false;
								            	 }
								            	 
								            	 /*
									            	 if(Number(editQuantity) > Number(quantity))
									            	 {
									            		 alert("Return Quantity Is Greater Than Quantity");
									            		 var setZero = "00";
								                    	 $("#jqGrid1").jqGrid("setCell", rowId, "editQuantity", setZero)
									            		 return false;
									            	 }
									            	 var afterquantity = quantity - editQuantity;
									            	 var tota = afterquantity * finalTotalPerProduct;//salePrice;
									            	 var total1 = editQuantity * finalTotalPerProduct;//salePrice;
	
									            	 $("#jqGrid1").jqGrid("setCell", rowId, "returnTotalAmt", total1);
	
									            	 if(tota == 0)
									            	 {
									            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", tota);
									            	 }
									            	 else
									            	 {
									            		 var gross = ((discount/100)*tota) + tota;
									            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", gross);
									            	 }
	
									            	 $("#jqGrid1").jqGrid("setCell", rowId, "totalAmt", tota);								            	 
								            	 */
								            	 
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotalDis=  $(this).jqGrid('getCol', 'discount', false, 'sum');
/*
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotalDis });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
*/
								            	 document.getElementById("totalAmountCC").value = parseTotal;
								            	 document.getElementById("grossTotalCC").value = +((+parseTotal) - (+v.oldCashAmount + +v.oldCardAmount + +v.totalSaleReturnAmt));								            	 
								            	 },
								            // footerrow: true, // set a footer row

								             gridComplete: function()
								             {
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotalDis=  $(this).jqGrid('getCol', 'discount', false, 'sum');
/*								            	 
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotalDis });
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
*/
								            	 document.getElementById("totalAmountCC").value = parseTotal;
								            	 document.getElementById("grossTotalCC").value = +((+parseTotal) - (+v.oldCashAmount + +v.oldCardAmount + +v.totalSaleReturnAmt));
								            },

								             pager : "#jqGridPager1",

							});

					$("#jqGrid1").addRowData(i, jsonData[i]);

					$('#jqGrid1')
					.navGrid(
							'#jqGridPager1',
							// the buttons to appear on the toolbar of the grid
							{ edit: true, add: true, del: false, search: true, refresh: false, view: true, position: "left", cloneToTop: false },
							// options for the Edit Dialog
							{
								editCaption : "The Edit Dialog",
								recreateForm : true,
								checkOnUpdate : true,
								checkOnSubmit : true,
								closeAfteredit : true,
								errorTextFormat : function(data) {
									return 'Error: '
									+ data.responseText
								}
							},

							{},

							// options for the Delete Dailog
							{
								closeAfterdel:true,
								recreateForm: true,
								afterComplete: function() {
									$('#jqGrid1').trigger( 'reloadGrid' );
									

					            	 var rowId =$("#jqGrid1").jqGrid('getGridParam','selrow');  
					            	 var rowData = jQuery("#jqGrid1").getRowData(rowId);
					            	 var quantity = rowData['quantity'];
					            	 var editQuantity = rowData['editQuantity'];
					            	 var salePrice = rowData['salePrice'];
					            	 var discount = rowData['discount'];
					            	 if(Number(editQuantity) > Number(quantity))
					            	 {
					            		 alert("Return Quantity Is Greater Than Quantity");
					            	 }
					            	 var afterquantity = quantity - editQuantity;
					            	 var tota = afterquantity * salePrice;
					            	 var total1 = editQuantity * salePrice;

					            	 $("#jqGrid1").jqGrid("setCell", rowId, "returnTotalAmt", total1);

					            	 if(tota == 0){

					            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", tota);
					            	 }
					            	 else
					            	 {
					            		 var gross = ((discount/100)*tota) + tota;
					            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", gross);
					            	 }

					            	 $("#jqGrid1").jqGrid("setCell", rowId, "totalAmt", tota);
					            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
					            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
					            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
					            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
					            	 
					            	 document.getElementById("totalAmountCC").value = parseTotal;	
					            	 document.getElementById("grossTotalCC").value = +((+parseTotal) - (+v.oldCashAmount + +v.oldCardAmount + +v.totalSaleReturnAmt));
								},
								errorTextFormat: function (data) {
									return 'Error: ' + data.responseText
								},
								onSelectRow: function(id) {
									if (id && id !== lastSel) {
										jQuery("#jqGrid1").saveRow(lastSel, true, 'clientArray');
										jQuery("#jqGrid1").editRow(id, true);
										lastSel = id;
										console.log(id);
									}
								}
							});
				});

			}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
				}
			});
}