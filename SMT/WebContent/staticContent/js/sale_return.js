function valSaleReturn()
{
	if(document.supd.creditCustomer5.value == "")
	{
		alert("Select Customer Name.");
		return false;
	}	
	if(document.supd.billNo.value == "")
	{
		alert("Select Bill No.");
		return false;
	}	
	saleReturn();
}

function saleReturn()
{
	var params = {};
	var input = document.getElementById('creditCustomer5'),
	list = document.getElementById('cust_drop5'),
	i,creditCustomer,creditCustomer1;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
			creditCustomer1 = list.options[i].getAttribute('value');
		}
	}
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');
	var totalAmount = 0;
	var checkQuantity = 0;
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {

		var pkBillId = allRowsInGrid[i].pkBillId;
		params["pkBillId" + i] = pkBillId;

		var carNo = allRowsInGrid[i].carNo;
		params["carNo" + i] = carNo;

		var categoryName = allRowsInGrid[i].categoryName;
		params["categoryName" + i] = categoryName;

		var itemName = allRowsInGrid[i].itemName;
		params["itemName" + i] = itemName;

		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;

		var quantity = allRowsInGrid[i].quantity;
		params["quantity" + i] = quantity;

		var editQuantity = allRowsInGrid[i].editQuantity;
		if(editQuantity > 0)
		{
			checkQuantity++;
		}
		params["editQuantity" + i] = editQuantity;
		/*
		if(editQuantity == 0)
		{
			alert("Enter Return Quantity.");
			location.reload();
			return false;
		}*/
		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice" + i] = salePrice;

		var contactNo = allRowsInGrid[i].contactNo;
		params["contactNo" + i] = contactNo;

		var returnTotalAmt = allRowsInGrid[i].returnTotalAmt;
		if(returnTotalAmt == "" || returnTotalAmt == undefined || returnTotalAmt == null)
		{
			returnTotalAmt = 0;
		}
		params["returnTotalAmt"+i] = returnTotalAmt;

		var totalAmt = allRowsInGrid[i].totalAmt;
		params["totalAmt"+i] = totalAmt;

		var discount = allRowsInGrid[i].discount;
		params["discount"+i] = discount;

		var grossamt = allRowsInGrid[i].grossamt;
		params["grossamt"+i] = grossamt;

		var Date = allRowsInGrid[i].Date;
		params["Date"+i] = Date;
		
		var taxAmt = allRowsInGrid[i].taxAmt;
		params["taxAmt"+i] = taxAmt;
		
		var gst = allRowsInGrid[i].gst;
		params["gst"+i] = gst;
		
		var iGst = allRowsInGrid[i].iGst;
		params["iGst"+i] = iGst;	
		
		var Date = allRowsInGrid[i].Date;
		params["Date"+i] = Date;
		
		var productId = allRowsInGrid[i].productId;
		params["productId"+i] = productId;
		
		var catId = allRowsInGrid[i].catId;
		params["catId"+i] = catId;
		
		var subCatId = allRowsInGrid[i].subCatId;
		params["subCatId"+i] = subCatId;
	}
	if(checkQuantity > 0){}
	else
	{
		alert("Please Enter Return Quantity");
		return false;
	}

	var billNo = $('#billNo').val();
	var transactionIdSr = $('#transactionIdSr').val();
	var reasonForSReturn1 = $('#reasonForSReturn1').val();
	var userType = $('#userType').val();
	var userName = $('#userName').val();
	
	params["billNo"] = billNo;
	params["count"] = count;
	params["creditCustomer1"] = creditCustomer1;
	params["transactionIdSr"] = transactionIdSr;
	params["reasonForSReturn1"] = reasonForSReturn1;
	params["userType"] = userType;
	params["userName"] = userName;	
	params["methodName"] = "returnSale";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
		alert(data);
		location.reload();
		window.open("PDFSaleReturn.jsp");
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}


function valSaleReturn2()
{	
	var billNo = $('#billNoBW').val();
		
	if(billNo == "")
	{
		alert("Enter Bill No.");
		return false;
	}	
	saleReturn2();
}

function saleReturn2()
{
	var params = {};
	/*var input = document.getElementById('creditCustomer5'),
	list = document.getElementById('cust_drop5'),
	i,creditCustomer,creditCustomer1;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
			creditCustomer1 = list.options[i].getAttribute('value');
		}
	}*/
	var count = jQuery("#jqGrid2").jqGrid('getGridParam', 'records')
	var allRowsInGrid = $('#jqGrid2').getGridParam('data');
	var totalAmount = 0;
	var checkCount = 0;
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{			
		var pkBillId = allRowsInGrid[i].pkBillId;
		params["pkBillId" + i] = pkBillId;

		var carNo = allRowsInGrid[i].carNo;
		params["carNo" + i] = carNo;

		var categoryName = allRowsInGrid[i].categoryName;
		params["categoryName" + i] = categoryName;

		var itemName = allRowsInGrid[i].itemName;
		params["itemName" + i] = itemName;

		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;

		var quantity = allRowsInGrid[i].quantity;
		params["quantity" + i] = quantity;
		
		var editQuantity = allRowsInGrid[i].editQuantity;
		if(Number(editQuantity) > 0)
		{
			checkCount++;
		}
		params["editQuantity" + i] = editQuantity;
					
		/*	if(editQuantity == 0)
		{
			alert("Enter Return Quantity.");
			location.reload();
			return false;
		}*/

		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice" + i] = salePrice;

		var contactNo = allRowsInGrid[i].contactNo;
		params["contactNo" + i] = contactNo;

		var returnTotalAmt = allRowsInGrid[i].returnTotalAmt;
		if(returnTotalAmt == "" || returnTotalAmt == null || returnTotalAmt == undefined)
		{
			returnTotalAmt = 0;
		}
		params["returnTotalAmt"+i] = returnTotalAmt;
			
		var totalAmt = allRowsInGrid[i].totalAmt;
		params["totalAmt"+i] = totalAmt;

		var discount = allRowsInGrid[i].discount;
		params["discount"+i] = discount;

		var grossamt = allRowsInGrid[i].grossamt;
		params["grossamt"+i] = grossamt;

		var Date = allRowsInGrid[i].Date;
		params["Date"+i] = Date;
		
		var taxAmt = allRowsInGrid[i].taxAmt;
		params["taxAmt"+i] = taxAmt;
		
		var gst = allRowsInGrid[i].gst;
		params["gst"+i] = gst;
		
		var iGst = allRowsInGrid[i].iGst;
		params["iGst"+i] = iGst;
		
		var Date = allRowsInGrid[i].Date;
		params["Date"+i] = Date;
		
		var productId = allRowsInGrid[i].productId;
		params["productId"+i] = productId;
		
		var catId = allRowsInGrid[i].catId;
		params["catId"+i] = catId;
		
		var subCatId = allRowsInGrid[i].subCatId;
		params["subCatId"+i] = subCatId;
	}
		
	if(checkCount > 0){}
	else
	{
		alert("Please Entre Return Quantity");
		return false;
	}

	var billNo = $('#billNoBW').val();
	var transactionIdSr = $('#transactionIdSr').val();
	var reasonForSReturn2 = $('#reasonForSReturn2').val();
	var userType = $('#userType').val();
	var userName = $('#userName').val();
	
	params["billNo"] = billNo;
	params["count"] = count;
	params["transactionIdSr"] = transactionIdSr;
	params["reasonForSReturn2"] = reasonForSReturn2;
	params["userType"] = userType;
	params["userName"] = userName;	
	params["methodName"] = "returnSaleBillno";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) 
	{
		alert(data);
		location.reload();
		window.open("PDFSaleReturn.jsp");
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function valSaleReturn1()
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
	saleReturn1();
}

function saleReturn1()
{
	var params = {};
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,creditCustomer,creditCustomer1;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
			creditCustomer1 = list.options[i].getAttribute('value');
		}
	}

	var count = jQuery("#jqGrid1").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid1').getGridParam('data');
	var totalAmount = 0;
	var returnTotalAmount = 0;
	var checkQuantity = 0
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{
		var pkBillId = allRowsInGrid[i].pkBillId;
		params["pkBillId" + i] = pkBillId;

		var carNo = allRowsInGrid[i].carNo;
		params["carNo" + i] = carNo;

		var categoryName = allRowsInGrid[i].categoryName;
		params["categoryName" + i] = categoryName;

		var itemName = allRowsInGrid[i].itemName;
		params["itemName" + i] = itemName;

		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;

		var quantity = allRowsInGrid[i].quantity;
		params["quantity" + i] = quantity;

		var editQuantity = allRowsInGrid[i].editQuantity;
		if(editQuantity > 0)
		{
			checkQuantity++;
		}
		params["editQuantity" + i] = editQuantity;

		/*if(editQuantity == 0)
		{
			alert("Enter Return Quantity.");
			location.reload();
			return false;
		}*/

		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice" + i] = salePrice;

		var contactNo = allRowsInGrid[i].contactNo;
		params["contactNo" + i] = contactNo;

		var returnTotalAmt = allRowsInGrid[i].returnTotalAmt;
		if(returnTotalAmt == "" || returnTotalAmt == undefined || returnTotalAmt == null)
		{
			returnTotalAmt = 0;
		}
		params["returnTotalAmt"+i] = returnTotalAmt;

		var totalAmt = allRowsInGrid[i].totalAmt;
		params["totalAmt"+i] = totalAmt;

		var discount = allRowsInGrid[i].discount;
		params["discount"+i] = discount;

		var Date = allRowsInGrid[i].Date;
		params["Date"+i] = Date;
		
		var fkCreditCustId = allRowsInGrid[i].fkCreditCustId;
		params["fkCreditCustId"+i] = fkCreditCustId;
		
		var gst = allRowsInGrid[i].gst;
		params["gst"+i] = gst;
		
		var iGst = allRowsInGrid[i].iGst;
		params["iGst"+i] = iGst;
		
		var taxAmt = allRowsInGrid[i].taxAmt;
		params["taxAmt"+i] = taxAmt;
		
		var Date = allRowsInGrid[i].Date;
		params["Date"+i] = Date;
		
		var productId = allRowsInGrid[i].productId;
		params["productId"+i] = productId;
		
		var catId = allRowsInGrid[i].catId;
		params["catId"+i] = catId;
		
		var subCatId = allRowsInGrid[i].subCatId;
		params["subCatId"+i] = subCatId;
		
		totalAmount = Number(totalAmount) + Number(totalAmt);
		returnTotalAmount = Number(returnTotalAmount) + Number(returnTotalAmt);
	}

	if(checkQuantity > 0)
	{}
	else
	{
		alert("Please Enter Return Quantity");
		return false;
	}
	
	var billNo = $('#billNo2').val();
	var transactionIdSr = $('#transactionIdSr').val();
	var reasonForSReturn3 = $('#reasonForSReturn3').val();
	var userType = $('#userType').val();
	var userName = $('#userName').val();
	params["totalAmount"] = totalAmount;
	params["returnTotalAmount"] = returnTotalAmount;
	params["billNo"] = billNo;
	params["count"] = count;
	params["transactionIdSr"] = transactionIdSr;	
	params["creditCustomer1"] = creditCustomer1;
	params["reasonForSReturn3"] = reasonForSReturn3;
	params["userType"] = userType;
	params["userName"] = userName;
	
	params["methodName"] = "returnSale1";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
		alert(data);
		location.reload();
		window.open("PDFSaleReturn.jsp");		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}


function getSaleItems2()
{
	var billNo = $('#billNoBW').val();
	var params = {};
	params["methodName"] = "getSaleItemByBillNo2";
	params["billNo"] = billNo;

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data)
			{
				$("#jqGrid2").jqGrid("clearGridData");
				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;
				$.each(jsonData, function(i, v)
				{
					$("#jqGrid2").jqGrid(
							{
								datatype : "local",

								colNames : [ "Date", "itemID", "CatId", "Category Name", "SubCatId", "Sub Cat Name", "productId", "Item Name", "Barcode No", "Quantity", 
											 "Return Quant", "SalePrice", "Contact No", "Return Total", "Discount", "Size", "gst", "Tax Amount", "igst", "Total", 
											 "Total<br>Per<br>Product"],
								             colModel : [ 								            	 
							            	 {
								            	 name : 'Date',
								            	 width : 140,

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
								            	 width : 140,
								             },
								             {
								            	 name : "subCatId",
								            	 hidden : true
								             }, 
								             {
								            	 name : "subCatName",
								            	 width : 100,
								            	 //hidden : true
								             },			
								             {
								            	 name : "productId",
								            	 hidden : true
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
								            	 editoptions: { defaultValue: '00'},
								            	 width : 70,
								            	 editable : true,
								            	 classes: 'myBackGroundColor'
								             },
								             {
								            	 name : "salePrice",
								            	 width : 100,
								             },
								             {
								            	 name : "contactNo",
								            	 width : 120,
								             },
								             {
								            	 name : "returnTotalAmt",
								            	 width : 150,
								            	 formatter: 'number',
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
								            	 name : 'gst',
								            	 width : 140,
								             },
								             {
								            	 name : 'taxAmt',
								            	 width : 100,
								             },
								             {
								            	 name : 'iGst',
								            	 width : 140,
								            	 hidden: true,
								             },
								             {
								            	 name : "totalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								             },								           
								             {
								            	 name : 'finalTotalPerProduct',
								            	 width : 140,
								            	 formatter: 'number',
								            	 hidden: true,
								             }
								             ],

								             loadonce: false,
								             viewrecords: true,
								             width: 1300,
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
								            	/*if(editQuantity > 0)
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

								            	 var tota = afterquantity * finalTotalPerProduct;

								            	// var tota1 = (editQuantity * salePrice)-(editQuantity*discount);
								            	 var tota1 = (editQuantity * totalAmt);// (editQuantity * salePrice);
								            	/*alert("Return Amount of"+pName+"is"+tota1);*/

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
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3});
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
								             },
								             footerrow: true, // set a footer row

								             gridComplete: function()
								             {
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
								             },

								             pager : "#jqGridPager2",

							});

					$("#jqGrid2").addRowData(i, jsonData[i]);

					$('#jqGrid2').navGrid('#jqGridPager2',
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


function getSaleItems()
{
	var billNo = $('#billNo').val();
	var params = {};
	params["methodName"] = "getSaleItemByBillNo";
	params["billNo"] = billNo;

	$.post(
			'/SMT/jsp/utility/controller.jsp',
			params,
			function(data) {

				$("#jqGrid").jqGrid("clearGridData");

				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;
				$.each(jsonData, function(i, v) {
					$("#jqGrid").jqGrid(
							{
								datatype : "local",

								colNames : [ "Date","itemID", "CatId", "Category Name", "productId", "Item Name", "SubCatId", "Barcode No",
								             "Quantity", "Return Quant", "SalePrice", "Contact No", "Return Total", "Discount", "Size", 
								              "gst", "Igst", "Tax amount", "Total", "finalTotalPerProduct"],

								             colModel : [
								             {
								            	 name : 'Date',
								            	 width : 140,
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
								            	 width : 140,
								             },
								             {
								            	 name : "productId",
								            	 hidden : true
								             }, 
								             {
								            	 name : "itemName",
								            	 width : 100,
								             },
								             {
								            	 name : "subCatId",
								            	 hidden : true
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
								            	 classes: 'myBackGroundColor'
								             },
								             {
								            	 name : "salePrice",
								            	 width : 100,
								             },
								             {
								            	 name : "contactNo",
								            	 width : 120,
								             },
								             {
								            	 name : "returnTotalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								             },								            
								             {
								            	 name : 'discount',
								            	 width : 50,
								             },
								             {
								            	 name : 'size',
								            	 width : 140,
								            	 hidden : true,								            	 
								             },
								             {
								            	 name : 'gst',
								            	 width : 140,
								             },
								             {
								            	 name : 'iGst',
								            	 width : 140,
								            	 hidden: true,
								             },
								             {
								            	 name : 'taxAmt',
								            	 width : 140,
								             },	
								             {
								            	 name : "totalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								             },
								             {
								            	 name : 'finalTotalPerProduct',
								            	 width : 140,
								            	 formatter: 'number',
								            	 hidden: true,
								             },

								             ],

								             loadonce: false,
								             viewrecords: true,
								             width: 1300,
								             shrinkToFit: true,
								             rowList : [10,20,50],
								             rownumbers: true,
								             rowNum: 10,
								             'cellEdit':true,
								             afterSaveCell: function()
								             {
								            	 var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
								            	 var rowData = jQuery("#jqGrid").getRowData(rowId);
								            	 var quantity = rowData['quantity'];
								            	 var editQuantity = rowData['editQuantity'];
								            	 var salePrice = rowData['salePrice'];
								            	 var discount = rowData['discount'];
								            	 var pName = rowData['itemName'];
								            	 var unit = rowData['size'];
								            	 var taxAmt = rowData['taxAmt'];
								            	 var gst = rowData['gst'];
								            	 var iGst = rowData['iGst'];
								            	 var finalTotalPerProduct = rowData['finalTotalPerProduct'];
								            	 
								            	 if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
								            	 {
								            		 	editQuantity = 0;
								            		 	var setZero = 0;
							                    		$("#jqGrid").jqGrid("setCell", rowId, "editQuantity", setZero);
							                    		return false;
								            	 }
								            	 
								            	 if(editQuantity == "0" || editQuantity == "")
								            	 {
								            		 var edit = "00";
								            		 $("#jqGrid").jqGrid("setCell", rowId, "editQuantity", edit);
								            	 }
								            	 
								            	 if(Number(editQuantity) > Number(quantity))
								            	 {
								            		 alert("Return Quantity Is Greater Than Quantity");
								            		 var totalAmt = rowData['finalTotalPerProduct'];
								            		 var rtota = 0.00;
								            		 var edit = "00";
								            		 	$("#jqGrid").jqGrid("setCell", rowId, "returnTotalAmt", rtota);
							                    		$("#jqGrid").jqGrid("setCell", rowId, "totalAmt", totalAmt);
							                    		$("#jqGrid").jqGrid("setCell", rowId, "editQuantity", edit);							                    		
								            		 
								            		 return false;
								            	 }

								            	 var afterquantity = quantity - editQuantity;

								            	 var tota = afterquantity * finalTotalPerProduct;//salePrice;

								            	 var tota1 = (editQuantity * finalTotalPerProduct);//salePrice)
								            	/* var tota1 = (editQuantity * salePrice)-(editQuantity*discount);*/
								            	/*alert("Return Amount of"+pName+"is"+tota1);*/

								            	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotalAmt", tota1);

								            	 if(tota == 0)
								            	 {

								            		 $("#jqGrid").jqGrid("setCell", rowId, "grossamt", tota);
								            	 }
								            	 else
								            	 {
								            		 var gross = ((discount/100)*tota) + tota;
								            		 $("#jqGrid").jqGrid("setCell", rowId, "grossamt", gross);
								            	 }

								            	 $("#jqGrid").jqGrid("setCell", rowId, "totalAmt", tota);
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3});
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
								             },
								             footerrow: true, // set a footer row

								             gridComplete: function() {

								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
								             },

								             pager : "#jqGridPager",

							});

					$("#jqGrid").addRowData(i, jsonData[i]);

					$('#jqGrid')
					.navGrid(
							'#jqGridPager',
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
									$('#jqGrid').trigger( 'reloadGrid' );
									

					            	 var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
					            	 var rowData = jQuery("#jqGrid").getRowData(rowId);
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

					            	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotalAmt", tota1);

					            	 if(tota == 0){

					            		 $("#jqGrid").jqGrid("setCell", rowId, "grossamt", tota);
					            	 }
					            	 else{
					            		 var gross = ((discount/100)*tota) + tota;
					            		 $("#jqGrid").jqGrid("setCell", rowId, "grossamt", gross);

					            	 }

					            	 $("#jqGrid").jqGrid("setCell", rowId, "totalAmt", tota);
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
	
	params["methodName"] = "getSaleItemByBillNo1";
	
	params["creditCustomer1"] = "creditCustomer1";
	params["billNo"] = billNo;
	$.post(
			'/SMT/jsp/utility/controller.jsp',
			params,
			function(data) {

				$("#jqGrid1").jqGrid("clearGridData");
				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;
				$.each(jsonData, function(i, v) {
					$("#jqGrid1").jqGrid(
							{
								datatype : "local",

								colNames : [ "Date", "itemID", "CatId", "Category Name", "productId", "Item Name", "SubCatId", "Barcode No",
								             "Quantity", "Return Quant", "SalePrice", "Contact No", "Return Total","Discount", "Size", "creditCustId", 
								             "Bill No", "gst", "iGst", "Tax Amount", "Total", "finalTotalPerProduct"],

								             colModel : [
								             {
								            	 name : 'Date',
								            	 width : 140,

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
								            	 width : 100,
								             },
								             {
								            	 name : "productId",
								            	 hidden : true
								             }, 
								             {
								            	 name : "itemName",
								            	 width : 100,
								             },
								             {
								            	 name : "subCatId",
								            	 hidden : true
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
								            	 classes: 'myBackGroundColor'
								             },
								             {
								            	 name : "salePrice",
								            	 width : 100,
								             },
								             {
								            	 name : "contactNo",
								            	 width : 100,
								             },
								             {
								            	 name : "returnTotalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								             },
								             {
								            	 name : 'discount',
								            	 width : 90,
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
								            	 width : 80,
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
								            	 name : "totalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								             },
								             {
								            	 name : "finalTotalPerProduct",
								            	 width : 150,
								            	 formatter: 'number',
								            	 hidden : true
								             },
								             ],

								             loadonce: false,
								             viewrecords: true,
								             width: 1300,
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
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotalDis=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotalDis });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
								             },
								             footerrow: true, // set a footer row

								             gridComplete: function() {

								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotalDis=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
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
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,creditCustomer;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
		}
	}
	var creditCustomer = creditCustomer;
	$("#billNo2").empty();
	$("#billNo2").append($("<option></option>").attr("value","").text("Select bill"));
	var params= {};
	params["creditCustomer"]= creditCustomer;
	params["methodName"] = "getAllBillByCustomer2";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
	var jsonData = $.parseJSON(data);
	$.each(jsonData,function(i,v)
	{
		$("#billNo2").append($("<option></option>").attr("value",i).text(v.billNo)); 
	});
	})
}

function validateCreditNoteTrId()
{
	var sRTrId = $("#sRTransactionId").val();
	if(sRTrId == null || sRTrId == "" || sRTrId == undefined || sRTrId == " ")
	{
		alert("Please Enter Sale Return Trasansaction Id");
		return false;
	}
	else
	{
		getCreditNoteForSaleReturn();
	}
}

function getCreditNoteForSaleReturn()
{
	var sRTransactionId = $("#sRTransactionId").val();
	var params = {};
	params["sRTransactionId"] = sRTransactionId;
	params["methodName"] = "saleReturnCreditNote";

	$.post('/SMT/jsp/utility/controller.jsp', params,
			function(data) {
		location.reload(true);
		//window.open("Other_Bill_CopyPDF_GHANTALWAR.jsp");
		window.open("PDFSaleReturn.jsp");
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}
