function myAlert(msg)
{
	var dialog = bootbox.dialog({
		//title: "Embel Technologies Says :",
	   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
	   });
	
	   setTimeout(function() {
		dialog.modal('hide');
	   }, 1500);
}

function purchasereturn()
{
	purchaseReturn();
}

function purchaseReturn()
{	
	var params = {};
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');
	var totalAmount = 0;
	var totalAmount1 = 0;
	var grossTotal = 0;
	var AllRows = JSON.stringify(allRowsInGrid);
	
	if(count < 1)
	{
		alert("Please Select Product To Return");
		return false;
	}
	
	for (var i = 0; i < count; i++)
	{
		var PkGoodRecId = allRowsInGrid[i].PkGoodRecId;
		params["PkGoodRecId" + i] = PkGoodRecId;

		var catName = allRowsInGrid[i].catName;
		params["catName" + i] = catName;

		var itemName = allRowsInGrid[i].itemName;
		params["itemName" + i] = itemName;

		var quantity = allRowsInGrid[i].quantity;
		params["quantity" + i] = quantity;

		var availquantity = allRowsInGrid[i].availquantity;
		params["availquantity"+i] = availquantity;

		var editQuantity = allRowsInGrid[i].editQuantity;
		if(Number(editQuantity) > 0)
		{
			params["editQuantity"+i] = editQuantity;
		}else
		{
			alert("Please Enter Return Quantity");
			return false;
		}

	/*
	 	if(editQuantity == 0)
		{
			alert("Enter Return Quantity.");
			location.reload();
			return false;
		}
	*/
		var buyPrice = allRowsInGrid[i].buyPrice;
		params["buyPrice" + i] = buyPrice;
		
		var vat = allRowsInGrid[i].vat;
		params["vat" + i] = vat;
		
		var igst = allRowsInGrid[i].igst ;
		params["igst" + i] = igst;

		var returnTotal = allRowsInGrid[i].returnTotal;
		params["returnTotal" + i] = returnTotal;

		var total = allRowsInGrid[i].total;
		params["total" + i] = total;

		var contactPerson = allRowsInGrid[i].contactPerson;
		params["contactPerson" + i] = contactPerson;

		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		
		var discount = allRowsInGrid[i].discount;
		params["discount"+i] = discount;
		
		var size = allRowsInGrid[i].size;
		params["size"+i] = size;
		
		var rollsize = allRowsInGrid[i].rollsize;
		params["rollsize"+i] = rollsize;

		var ondate = allRowsInGrid[i].ondate;
		params["ondate"+i] = ondate;
		
		var supplierId = allRowsInGrid[i].supplierId;
		params["supplierId"+i] = supplierId;
		
		var billNo = allRowsInGrid[i].billNo;
		params["billNo"+i] = billNo;
		
		var supplierName2 = allRowsInGrid[i].supplierName2;
		params["supplierName2"+i] = supplierName2;
		
		var productId = allRowsInGrid[i].productId;
		params["productId"+i] = productId;
		
		var catId = allRowsInGrid[i].catId;
		params["catId"+i] = catId;
		
		var subCatId = allRowsInGrid[i].subCatId;
		params["subCatId"+i] = subCatId;		
		
		var totalAmount = Number(totalAmount) + Number(total);
		totalAmount1 = Number(totalAmount1) + Number(returnTotal); //71
		
		grossTotal = allRowsInGrid[i].grossTotal;		
	}

/*	var supplierId = $('#supplierId').val();
	var supName = supplierId.split("=>");
	supplierId = supName[0];
	alert(supplierId);*/
	var billNo = $('#billNo').val();
	var prReason = $('#reasonForPReturn').val();
	var transactionId = $('#transactionId').val();
	var newGrossTotal = Number(grossTotal) - Number(totalAmount1);

	params["totalAmount"] = totalAmount;
	params["totalAmount1"] = totalAmount1;
	params["billNo"] = billNo;
	params["supplierId"] = supplierId;
	params["count"] = count;
	params["prReason"] = prReason;
	params["transactionId"] = transactionId;
	params["newGrossTotal"] = newGrossTotal;
	
	params["methodName"] = "returngoodsReceipt";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data)
	{
		alert(data);
		location.reload();
		window.open("purchaseReturnPDF.jsp");
	}).error(function(jqXHR, textStatus, errorThrown)
	{
		if (textStatus === "timeout")
		{
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function getItemDetails()
{
	this.getitems = getitems;
	/********************************** code for GET ITEM DETAILS BY CATEGORY*******************************************/
	function sumFmatter(cellvalue, options, rowObject)
	{
		return options.rowData.quantity * options.rowData.unitPrice;
	}

	function getitems()
	{
		//NEVER GET CALL
		alert("107 called");
		var dd ;
		var Expence = 0;
		$("#jqGrid").jqGrid("clearGridData");
		//$("#jqGrid").jqGrid("clearGridData");
		var billNo = $('#billNo').val();
		var input = document.getElementById('supplierId'),
		list = document.getElementById('supplierId_drop'),
		i,supplierId;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				supplierId = list.options[i].getAttribute('data-value');
			}

			var supplierId=supplierId;
		}
		alert(supplierId)
		var params = {};
		params["methodName"] = "getItemsByBill";
		params["billNo"] = billNo;
		params["supplierId"] = supplierId;

		$.post(
				'/SMT/jsp/utility/controller.jsp',
				params,
				function(data) {
					var jsonData = $.parseJSON(data);
					var catmap = jsonData.list;
					var grid = $("#jqGrid"),
					intervalId = setInterval(
							function() {
								grid.trigger("reloadGrid",[{current:true}]);
							},
							100); 
					$.each(jsonData, function(i, v) {
						Expence = v.expence;
						document.getElementById('expen').value = Expence;
						function sumFmatter (cellvalue, options, rowObject)
						{
							var itemparams={};
							var jam=0;
							var tot= (options.rowData.quantity * options.rowData.unitPrice);
							var shree = document.returnGoods.resolution.value;
							var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
							var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
							var AllRows=JSON.stringify(allRowsInGrid1);
							for (var i = 0; i < count; i++) {

								var quantity = allRowsInGrid1[i].quantity;
								itemparams["quantity"+i] = quantity;

								var unitPrice = allRowsInGrid1[i].unitPrice;
								itemparams["unitPrice"+i] = unitPrice;

								var totals1=((unitPrice)*(quantity));

								jam = jam + totals1;
							}	
							document.getElementById("resolution").value = jam+Expence;
							return tot;
						}
						$("#jqGrid").jqGrid(
								{
									datatype : "local",

									colNames : [ "itemID", "Item Name",
									             "Color", "Quantity", "Price",
									             "supplier_id", "Supplier Name",
									             "OrderDate", "Total" ],

									             colModel : [ {
									            	 name : "itemID",
									            	 hidden : true
									             }, {
									            	 name : "productName",
									            	 width : 100,
									             },

									             {
									            	 name : "color",
									            	 width : 140,
									            	 editable : true
									             },

									             {
									            	 name : "quantity",
									            	 width : 140,
									            	 editable : true
									            	 // must set editable to true if you want to make the field editable
									             },

									             {
									            	 name : 'unitPrice',
									            	 width : 140,
									            	 editable : true
									             }, {
									            	 name : 'supplier_id',
									            	 hidden : true
									             },

									             {
									            	 name : 'supplierName',
									            	 width : 140,
									            	 editable : true
									             },

									             {
									            	 name : 'insDate',
									            	 width : 280,
									            	 editable : true
									             },

									             {
									            	 label : 'Total',
									            	 name : "total",
									            	 formatter : sumFmatter,
									            	 width : 150,
									             }

									             ],

									             sortorder : 'desc',
									             loadonce: false,
									             footerrow: true,
									             userDataOnFooter: true,		
									             idPrefix : "a",
									             viewrecords: true,
									             width: 1090,
									             shrinkToFit: true,
									             rownumbers: true,
									             rowNum: 25,

									             pager : "#jqGridPager",
								});

						$("#jqGrid").addRowData(i, jsonData[i]);

						$('#jqGrid')
						.navGrid(
								'#jqGridPager',
								// the buttons to appear on the toolbar of the grid
								{ edit: true, add: true, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
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

								// options for the Delete Dailog
								{
									closeAfterdel:true,
									recreateForm: true,
									afterSubmit: function() {
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

function getAllBills()
{
	var input = document.getElementById('supplierId'),
	list = document.getElementById('supplierId_drop'),
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

	params["methodName"] = "getAllBillBySuppliers";
	params["supplier"]= supplier;
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			$("#billNo").append($("<option></option>").attr("value",i).text(v.billNo)); 
				});
			})
}

function getitems()
{
	//s_purchase_return.jsp
	var billNo = $('#billNo').val();
	var input = document.getElementById('supplierId'),
	list = document.getElementById('supplierId_drop'),
	i,supplierId;
	
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplierId = list.options[i].getAttribute('data-value');
		}
	}
	
	var params = {};
	params["methodName"] = "getTotalItemByBillNo";
	params["billNo"] = billNo;
	params["supplierId"] = supplierId;
	var count=0;
	var newrow;
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{		
		document.getElementById('supplierId').value = "";
		
				/*count = jQuery("#jqGrid").jqGrid('getGridParam', 'records'); 
				$("#jqGrid").jqGrid("clearGridData");
				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;
				var ids = jQuery("#jqGrid").jqGrid('getDataIDs');*/
				
				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;
				count = jQuery("#jqGrid").jqGrid('getGridParam', 'records'); 
				var rowdata =$("#jqGrid").jqGrid('getGridParam','data');
				var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
				
				$.each(jsonData, function(i, v)
				{					
					for (var j = 0; j < count; j++) 
					{
						var barcodeNo = rowdata[j].barcodeNo;
						var supplierName2 = rowdata[j].supplierName2;
						var rowId = ids[j];
						var rowData = jQuery('#jqGrid').jqGrid ('getRowData', rowId);
						
						if (barcodeNo == jsonData.offer.barcodeNo)
						{	
							alert("Item Already Inserted !!!");
							newrow=false;
							break;
							//return false;
						}
						else
						{	
							newrow=true;
						}
						if (supplierName2 == jsonData.offer.supplierName2)
						{								
							newrow=true;
						}
						else
						{	
							alert("Please Select Same Supplier !!!");
							newrow=false;
							break;
							//return false;
						}
					}
					if(newrow==true)
					{
						$("#jqGrid").addRowData(count,jsonData.offer);
					}
					
					/*count = jQuery("#jqGrid").jqGrid('getGridParam', 'records'); 
					var rowdata =$("#jqGrid").jqGrid('getGridParam','data');
					var ids = jQuery("#jqGrid").jqGrid('getDataIDs');*/
					
					
					$("#jqGrid").jqGrid(
							{
								datatype : "local",

								colNames : ["itemID", "Supplier<br>Name", "Bill<br>No.", "Date", "catId", "Category", "productId",
											"Barcode", "Item<br>Name", "subCatId", "RollSize", "Size", "QTY", "Avl<br>QTY","Return<br>QTY", 
											"Buy<br>Price", "Discount", "GST", "IGST", "Return<br>Total", "Total", "Contact<br>Person",
								             "Supplier Id", "Gross Total"],
								             autoheight: true,								             
								             colModel : 
								             [
								             {
								            	 name : "PkGoodRecId",
								            	 hidden : true,
								             },
								             {
								            	 name : "supplierName2",
								            	// hidden : true
								             },
								             {
								            	 name : 'billNo',
								            	 width : 80,
								             },
								             {
								            	 name : 'ondate',
								            	 width : 150,
								             },
								             {
								            	 name : "catId",
								            	 hidden : true
								             },
								             {
								            	 name : "catName",
								            	 width : 120,
								             },
								             {
								            	 name : "productId",
								            	 hidden : true
								             },
								             {
								            	 name : 'barcodeNo',
								            	 width : 100,
								             },
								             {
								            	 name : "itemName",
								            	 width : 140,
								             },
								             {
								            	 name : "subCatId",
								            	 hidden : true
								             },
								             {
								            	 name : 'rollsize',
								            	 width : 100,
								            	 //hidden: true,
								             },
								             {
								            	 name : 'size',
								            	 width : 50,
								            	// hidden: true,
								             },
								             {
								            	 name : "quantity",
								            	 width : 80,
								            	
								            	 // must set editable to true if you want to make the field editable
								             },
								             {
								            	 name : "availquantity",
								            	 width : 100,
								            	// editable : true
								            	 // must set editable to true if you want to make the field editable
								             },

								             { 
								            	 /*formatter: function(cellvalue, options, rowObject){
								            	        if(cellvalue != null)
								            	            return '<span style="background-color: red; display: block; width: 100%; height: 100%; ">' + cellvalue + '</span>';
								            	        else
								            	            return cellvalue;
								            	    },*/
								             
								            	 name : 'editQuantity',
								            	 width : 70,
								            	 editable : true,
								            	 classes: 'myBackGroundColor'
								             },							            

								             {
								            	 name : 'buyPrice',
								            	 width : 100,
								            	 editable: true,
								             },
								             {
								            	 name : 'discount',
								            	 width : 70,
								            	 //hidden : true
								             },
								             {
								            	 name : 'vat',
								            	 width : 70,
								             },
								             {
								            	 name : 'igst',
								            	 width : 70,
								             },

								             {
								            	 name : "returnTotal",
								            	 width : 150,
								            	
								             },
								             {
								            	 name : "total",
								            	 width : 120,
								            	 //formatter: 'integer',
								             },
								             {
								            	 name : 'contactPerson',
								            	 width : 160,
								            	 hidden : true
								             },
								             {
								            	 name : 'supplierId',
								            	 width : 150,
								            	 hidden: true,
								             },
								             {
								            	 name : 'grossTotal',
								            	 width : 150,
								             }								             
								             ],
								            
								             loadonce: false,
								             viewrecords: true,
								             width: 1200,
								             shrinkToFit: true,
								             rowList : [20,30,50],
								             rownumbers: true,
								             rowNum: 10,
								             'cellEdit':true,
								             
								             afterSaveCell: function ()
								             {
								            	 var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
								            	 var rowData = jQuery("#jqGrid").getRowData(rowId);
								            	 var quantity = rowData['quantity'];
								            	 var availquantity = rowData['availquantity'];
								            	 var editQuantity = rowData['editQuantity'];
								            	 var buyPrice = rowData['buyPrice'];
								            	 var vat = rowData['vat'];
								            	 var igst = rowData['igst'];
								            	 var dis = rowData['discount'];
								            	 var returnTotal = rowData['returnTotal'];
								            	 var total = rowData['total'];
								            	 var rollS = rowData['rollsize'];
								            	 var unit = rowData['size'];
								            	 var discount = rowData['discount'];
								            	 var billNo = rowData['billNo'];
								            	 var supplierName2 = rowData['supplierName2'];
								            	 var grossTotal = rowData['grossTotal'];
								            	 var totAmt = 0;
								            	 var totalAmt = 0;
								            	 var totAmt1 = 0;
								            	 var totalAmt1 = 0;
								            	 var totadis = 0;
								            	 

								            	 if(Number(editQuantity) > Number(availquantity))
								            	 {
								            		 alert("Return Quantity Is Greater Than Availabel Quantity");
								            		 
								            		 var rtota = 0.00;
								            		 var maiTota = total;
								            		 var edit = 0;
							            		 	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotal", rtota);
						                    		 $("#jqGrid").jqGrid("setCell", rowId, "total", maiTota);
						                    		 $("#jqGrid").jqGrid("setCell", rowId, "editQuantity", edit);
								            		 
								            		 return false;														
								            	 }
								            	 
								            	 	var afterquantity = quantity - editQuantity;
								            	 	var tota = 0;
								            	 	if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
													{
								            	 		tota = (afterquantity*rollS) * buyPrice;
													}
								            	 	else
													{
														tota = afterquantity * buyPrice;
													}
								            	 	
													if (dis != "0") 
													{
														totadis = ((tota * (dis)) / 100);

														if (vat != "0") 
														{
															totAmt = (((tota - totadis) * (vat)) / 100);
														} 
														else if (igst != "0") 
														{
															totAmt = (((tota - totadis) * (igst)) / 100);
														}
														 totalAmt = +(tota-totadis) + +totAmt;
														 totalAmt = totalAmt.toFixed(2);
													}
													else 
													{																		
														if (vat != "0") 
														{
															totAmt = ((tota * (vat)) / 100);
														} 
														else if (igst != "0") 
														{
															totAmt = ((tota * (igst)) / 100);
														}
														
														 totalAmt = +tota + +totAmt;
														 totalAmt = totalAmt.toFixed(2);
													}								            	
								            	 
								            	 $("#jqGrid").jqGrid("setCell", rowId, "total", totalAmt);
								            	 var dist = 0;
								            	 var total1 = 0;
								            	 if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
												{
								            		total1 = (editQuantity*rollS) * buyPrice;
												}
								            	else
								            	{
								            		total1 = editQuantity * buyPrice;
								            	}
								            	 if (dis != "0") 
													{
								            	 dist = (total1*dis)/100;
								            	 if (vat != "0") 
													{
								            	 totAmt1 =  (((total1-dist)*(vat))/100);
								            	 }
								            	 else if (igst != "0") 
													{
								            		 totAmt1 =  (((total1-dist)*(igst))/100);
								            		 }
								            	 totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
													}
								            	 else
								            		 {
								            		 if (vat != "0") 
														{
									            	 totAmt1 =  (((total1)*(vat))/100);
									            	 }
									            	 else if (igst != "0") 
														{
									            		 totAmt1 =  (((total1)*(igst))/100);
									            		 }
									            	 totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
								            		 }
								            	 
								            	// document.getElementById("returnGrossTotal").value = totalAmt1;								            	 
								            	 
								            	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotal", totalAmt1);
								            	 var parseTotal=  $(this).jqGrid('getCol', 'returnTotal', false, 'sum');
								            	 parseTotal = parseTotal.toFixed(2);
								            	 $(this).jqGrid('footerData', 'set', { vat: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotal: parseTotal});
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'total', false, 'sum');
								            	 parseTotal1 = parseTotal1.toFixed(2);
								            	 $(this).jqGrid('footerData', 'set', { total: parseTotal1});
								            	 if(parseTotal == "NaN" || parseTotal == null || parseTotal == "" || parseTotal == undefined)
								            	 {
								            		 total1 = editQuantity * buyPrice;
								            		 
									            	 if (dis != "0") 
														{
									            	 dist = (total1*dis)/100;
									            	 if (vat != "0") 
														{
									            	 totAmt1 =  (((total1-dist)*(vat))/100);
									            	 }
									            	 else if (igst != "0") 
														{
									            		 totAmt1 =  (((total1-dist)*(igst))/100);
									            		 }
									            	 totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
														}
									            	 else
									            		 {
									            		 if (vat != "0") 
															{
										            	 totAmt1 =  (((total1)*(vat))/100);
										            	 }
										            	 else if (igst != "0") 
															{
										            		 totAmt1 =  (((total1)*(igst))/100);
										            		 }
										            	 totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
								            		 
								            		 document.getElementById("returnGrossTotal").value = totalAmt1;
								            	 }
								            	 }
								            	 else
								            	 {
								            		 document.getElementById("returnGrossTotal").value = parseTotal;
								            	 }
								             },
								             footerrow: true, // set a footer row

								             gridComplete: function() {
								            	 var parseTotal=  $(this).jqGrid('getCol', 'returnTotal', false, 'sum');
								            	 parseTotal = parseTotal.toFixed(2);
								            	 $(this).jqGrid('footerData', 'set', { vat: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotal: parseTotal});
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'total', false, 'sum');
								            	 parseTotal1 = parseTotal1.toFixed(2);
								            	 $(this).jqGrid('footerData', 'set', { total: parseTotal1});
								            	 if(parseTotal == "NaN" || parseTotal == null || parseTotal == "" || parseTotal == undefined)
								            	 {
								            		 total1 = editQuantity * buyPrice;
								            		 
									            	 if (dis != "0") 
														{
									            	 dist = (total1*dis)/100;
									            	 if (vat != "0") 
														{
									            	 totAmt1 =  (((total1-dist)*(vat))/100);
									            	 }
									            	 else if (igst != "0") 
														{
									            		 totAmt1 =  (((total1-dist)*(igst))/100);
									            		 }
									            	 totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
														}
									            	 else
									            		 {
									            		 if (vat != "0") 
															{
										            	 totAmt1 =  (((total1)*(vat))/100);
										            	 }
										            	 else if (igst != "0") 
															{
										            		 totAmt1 =  (((total1)*(igst))/100);
										            		 }
										            	 totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
								            		 
								            		 document.getElementById("returnGrossTotal").value = totalAmt1;
								            	 }		
								            		 
								            		 document.getElementById("returnGrossTotal").value = totalAmt1;
								            	 }
								            	 else
								            	 {
								            		 document.getElementById("returnGrossTotal").value = parseTotal;
								            	 }
								             },
								             pager : "#jqGridPager",
							});
					if(count==0 || count==null)
					{
						$("#jqGrid").addRowData(0,jsonData.offer);
					}
					//$("#jqGrid").addRowData(i, jsonData[i]);
					$('#jqGrid').navGrid('#jqGridPager',
							// the buttons to appear on the toolbar of the grid
							{ edit: true, add: true, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
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
								afterComplete : function() {
									$('#jqGrid').trigger( 'reloadGrid' );
									

					            	 var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
					            	 var rowData = jQuery("#jqGrid").getRowData(rowId);
					            	 var quantity = rowData['quantity'];
					            	 var availquantity = rowData['availquantity'];
					            	 var editQuantity = rowData['editQuantity'];
					            	 var buyPrice = rowData['buyPrice'];
					            	 var vat = rowData['vat'];
					            	 var returnTotal = rowData['returnTotal'];
					            	 var totAmt = 0;
					            	 var totalAmt = 0;
					            	 var totAmt1 = 0;
					            	 var totalAmt1 = 0;
					            	 
					            	 if(Number(editQuantity) > Number(availquantity))
					            	 {
					            		 alert("Return Quantity Is Greater Than Availabel Quantity");
					            		 return false;
					            	 }
					            	 var afterquantity = quantity - editQuantity;
					            	 var tota = afterquantity * buyPrice;
					            	 totAmt =  ((tota*(vat))/100);
					            	 totalAmt = +tota + +totAmt;
					            	 $("#jqGrid").jqGrid("setCell", rowId, "total", totalAmt);
					            	 var total1 = editQuantity * buyPrice;
					            	 totAmt1 =  ((total1*(vat))/100);
					            	 if(isNaN(totAmt1))
					            	 {}
					            	 else
					            	 {
					            		 totAmt1 = 0;
					            	 }
					            	 if(isNaN(total1))
					            	 {}
					            	 else
					            	 {
					            		 total1 = 0;
					            	 }
					            	 totalAmt1 = +total1 + +totAmt1;
					            	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotal", totalAmt1);
					            	 var parseTotal=  $(this).jqGrid('getCol', 'returnTotal', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { vat: "Total :" });
					            	 $(this).jqGrid('footerData', 'set', { returnTotal: parseTotal});
					            	 var parseTotal1=  $(this).jqGrid('getCol', 'total', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { total: parseTotal1});
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

function initGrid() {
	$(".jqgrow", "#jqGrid").contextMenu('contextMenu', {
		bindings: {
			'edit': function (t) {
				editRow();
			},
			'add': function (t) {
				addRow();
			},
			'del': function (t) {
				delRow();
			}
		},
		onContextMenu: function (event, menu) {
			var rowId = $(event.target).parent("tr").attr("id")
			var grid = $("#jqGrid");
			grid.setSelection(rowId);
			return true;
		}
	});

	function addRow() {
		var grid = $("#jqGrid");
		grid.editGridRow("new", { closeAfterAdd: true});
	}

	function editRow() {
		var grid = $("#jqGrid");
		var rowKey = grid.getGridParam("selrow");
		if (rowKey) {
			grid.editGridRow(rowKey, {closeAfterEdit: true});
		}
		else {
			alert("No rows are selected");
		}
	}

	function delRow() {
		var grid = $("#jqGrid");
		var rowKey = grid.getGridParam("selrow");
		if (rowKey) {
			grid.delGridRow(rowKey);
		}
		else {
			alert("No rows are selected");
		}
	}
}