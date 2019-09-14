function getCurrentNewSupplierData()
{
	var input = document.getElementById('updateSupplierId'),
	list = document.getElementById('updateSupplierId_drop'),
	i,newSupplierId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			newSupplierId = list.options[i].getAttribute('data-value');
		}
	}
	var newSupplierId = newSupplierId;
	var lastSupplier = $("#supplierId").val();
	var splitLastSupplier  = lastSupplier.split(",");
	var lastSuppId = splitLastSupplier[0];
	
	if(lastSuppId == null || lastSuppId == "" || lastSuppId == undefined || lastSuppId == " ")
	{
		alert("Please Enter Voucher Number");
		document.getElementById("newSuppPendingAmount").value = "";
		document.getElementById("updateSupplierId").value = "";
		
		return false;
	}
	else{}
	
	if(lastSuppId == newSupplierId)
	{
		alert("You Can't Select Same Supplier");
		document.getElementById("newSuppPendingAmount").value = "";
		document.getElementById("updateSupplierId").value = "";
		
		return false;
	}
	else{}	
	
	document.getElementById("newSuppPendingAmount").value = "";
	
	var params= {};
	params["newSupplierId"]= newSupplierId;
	params["methodName"] = "getCurrentNewSupplierPendingAmountController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data){

	var jsonData = $.parseJSON(data);
	var catmap = jsonData.list;
	$.each(jsonData,function(i,v)
	{
		alert(v.pendingSuppBalance);
		document.getElementById("newSuppPendingAmount").value = v.pendingSuppBalance;
	});
	})
}

function getAllBillsForEditPurchase()
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

	params["methodName"] = "getAllBillBySuppliers";//"getAllBillBySuppliers";
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

function getItemsFromVoucherNo()
{
	var voucherNo = $('#voucherNo').val();
	
	var params = {};
	params["methodName"] = "getTotalItemByVoucherNoForEditGR";
	params["voucherNo"] = voucherNo;

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
				$("#jqGrid").jqGrid("clearGridData");
		
				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;				
				
				$.each(jsonData, function(i, v)
				{					
					document.getElementById("supplierId").value = v.pkSuppId+","+v.supplierName2+","+v.suppCode;
					document.getElementById("billNo").value = v.billNo;
					document.getElementById("pEDate").value = v.ondate;
					document.getElementById("totalQuantity").value = v.totalQuantity;
					document.getElementById("editGrossTotal").value = v.finalGrossTotal;
					document.getElementById("contactPerson").value = v.contactPerson;
					document.getElementById("finalGrossTotalHidden").value = v.finalGrossTotal;
					document.getElementById("pendingBillpaymentHidden").value = v.pendingBillPayment;
					
					$("#jqGrid").jqGrid(
							{
								datatype : "local",

								colNames : [
												"itemID", "Barcode", "productId", "Item Name", "catId", "Category", "subCatId", "Sub Category","HSN SAC", "Color", 
												"RollSize", "Size", "Style", "oriQTY", "Original Qty", "Returned QTY", "QTY", "Sold Quantity", "Avl QTY", 
												"final Buy Price Ex. Tax", "Buy Price Ex. Tax", "Final Sale Price Inc. Tax", "Sale Price Inc. Tax", "Purchase Code", 
												"Final Discount", "Discount", "GST", "IGST", "finalGST", "finalIGST", "Return Total", "Tax Amount", 
												"Total","Contact Person", "Supplier Id", "Gross Total"
											],
								             autoheight: true,
								             
								             colModel : [ 
								             {
								            	 name : "PkGoodRecId",
								            	 hidden : true
								             },
								             {
								            	 name : 'barcodeNo',
								            	 width : 100,
								             },
								             {
								            	 name : "productId",
								            	 hidden : true
								             },
								             {
								            	 name : "itemName",
								            	 width : 140,
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
								            	 name : "subCatId",
								            	 hidden : true
								             },
								             {
								            	 name : "subcatName",
								            	 width : 120,
								             },
								             {
								            	 name : 'hsnSac',
								            	 width : 70,
								            	// hidden: true,
								            	 editable : true
								             },
								             {
								            	 name : 'color',
								            	 width : 70,
								            	// hidden: true,
								            	 editable : true
								             },
								             {
								            	 name : 'rollsize',
								            	 width : 100,
								            	 //editable : true,
								            	 //hidden:true,
								             },
								             {
								            	 name : 'size',
								            	 width : 50,
								            	// hidden: true,
								            	 editable : true
								             },
								             {
								            	 name : 'style',
								            	 width : 70,
								            	// hidden: true,
								            	 editable : true
								             },								             
								             {
								            	 name : "oriQuantity",
								            	 width : 80,
								            	 hidden:true,
								            	 // must set editable to true if you want to make the field editable
								             },
								             {
								            	 name : "barQtyTotalPuchaseQty",
								            	 width : 80,
								            	 //hidden:true,
								            	 // must set editable to true if you want to make the field editable
								             },
								             { 
								            	 name : 'returnedQty',
								            	 width : 70,
								            	 //hidden:true,
								             },	
								             {
								            	 name : "quantity",
								            	 width : 80,
								            	 editable : true,
								            	 //classes: 'myBackGroundColor',
								            	 // must set editable to true if you want to make the field editable
								             },								             
								             { 
								            	 name : 'soldQty',
								            	 width : 70,
								            	 //hidden:true,
								             },	
								             {
								            	 name : "availquantity",
								            	 width : 100,
								            	// editable : true
								            	 // must set editable to true if you want to make the field editable
								             },
								             {
								            	 name : 'finalBuyPrice',
								            	 width : 100,
								            	 hidden : true
								             },
								             {
								            	 name : 'buyPrice',
								            	 width : 100,
								            	 editable : true,
								             },
								             {
								            	 name : 'finalSalePrice',
								            	 width : 100,
								            	 hidden : true
								             },
								             {
								            	 name : 'salePrice',
								            	 width : 100,
								            	 editable : true
								             },
								             {
								            	 name : 'purchaseCode',
								            	 width : 70,
								            	 editable : true,
								            	 hidden : true
								             },
								             {
								            	 name : 'finalDisPer',
								            	 width : 70,								            	 
								            	 hidden : true
								             },
								             {
								            	 name : 'discount',
								            	 width : 70,
								            	 editable : true,
								            	 //hidden : true
								             },
								             {
								            	 name : 'vat',
								            	 width : 70,
								            	 editable : true
								             },
								             {
								            	 name : 'igst',
								            	 width : 70,
								            	 editable : true
								             },
								             {
								            	 name : 'finalVat',
								            	 width : 70,
								            	 hidden:true,
								             },
								             {
								            	 name : 'finalIgst',
								            	 width : 70,
								            	 hidden:true,
								             },
								             {
								            	 name : "returnTotal",
								            	 width : 150,
								            	 hidden:true,
								             },
								             {
								            	 name : "taxAmount",
								            	 width : 90,
								            	 //formatter: 'integer',
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
								            	 hidden:true,
								             }
								             
								             ],
								            
								             loadonce: false,
								             viewrecords: true,
								             width: 1310,
								             shrinkToFit: true,
								             rowList : [20,30,50],
								             rownumbers: true,
								             rowNum: 10,
								             'cellEdit':true,
								             
								             afterSaveCell: function ()
								             {
								            	 var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
								            	 var rowData = jQuery("#jqGrid").getRowData(rowId);
								            	 var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
								            	 var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
								            	 var barQtyTotalPuchaseQty = rowData['barQtyTotalPuchaseQty'];
								            	 var oriQuantity = rowData['oriQuantity'];
								            	 var quantity = rowData['quantity'];
								            	 var availquantity = rowData['availquantity'];
								            	 var editQuantity = rowData['editQuantity'];
								            	 var finalBuyPrice = rowData['finalBuyPrice'];
								            	 var buyPrice = rowData['buyPrice'];								            	 
								            	 var finalSalePrice = rowData['finalSalePrice'];
								            	 var salePrice = rowData['salePrice'];
								            	 var vat = rowData['vat'];
								            	 var igst = rowData['igst'];
								            	 var finalVat = rowData['finalVat'];
									             var finalIgst = rowData['finalIgst'];
								            	 var dis = rowData['discount'];
								            	 var returnTotal = rowData['returnTotal'];
								            	 var total = rowData['total'];
								            	 var rollS = rowData['rollsize'];
								            	 var unit = rowData['size'];
								            	 var finalDisPer = rowData['finalDisPer'];
								            	 var discount = rowData['discount'];
								            	 var billNo = rowData['billNo'];
								            	 var supplierName2 = rowData['supplierName2'];
								            	 var grossTotal = rowData['grossTotal'];
								            	 var taxAmount = rowData['taxAmount'];
								            	 var soldQty = rowData['soldQty'];
								            	 var returnedQty = rowData['returnedQty'];
								            	 var totAmt = 0;
								            	 var totalAmt = 0;
								            	 var totAmt1 = 0;
								            	 var totalAmt1 = 0;
								            	 var totadis = 0;
								            	 var setZero = 0;
								            	 var checkQty = /^[0-9]+$/;
								            	 var checkValue = /^[0-9]+\.?[0-9]*$/;
								            	 
								            	 if(quantity != "" || quantity != null || quantity != undefined || quantity != "")
								            	 {
								            		 if(quantity.match(checkQty))
								            		 {}
								            		 else
								            		 {
								            			 alert("Please Enter Valid Quantity");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "quantity", oriQuantity);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 alert("Please Enter Quantity");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "quantity", oriQuantity);
								            		 return false;
								            	 }
								            	 
								            	 if(buyPrice != "" || buyPrice != null || buyPrice != undefined || buyPrice != "")
								            	 {
								            		 if(buyPrice.match(checkValue))
								            		 {}
								            		 else
								            		 {
								            			 alert("Please Enter Valid Buy Price");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "buyPrice", finalBuyPrice);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 alert("Please Enter Buy Price");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "buyPrice", finalBuyPrice);
								            		 return false;
								            	 }
								            	 
								            	 if(salePrice != "" || salePrice != null || salePrice != undefined || salePrice != "")
								            	 {
								            		 if(salePrice.match(checkValue))
								            		 {}
								            		 else
								            		 {
								            			 alert("Please Enter Valid Sale Price");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "salePrice", finalSalePrice);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 alert("Please Enter Sale Price");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "salePrice", finalSalePrice);
								            		 return false;
								            	 }
								            	 
								            	 if(discount != "" || discount != null || discount != undefined || discount != "")
								            	 {
								            		 if(discount.match(checkValue))
								            		 {}
								            		 else
								            		 {
								            			 alert("Please Enter Valid Discount Percentage");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "discount", finalDisPer);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 alert("Please Enter Discount Percentage");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "discount", finalDisPer);
								            		 return false;
								            	 }								            	 

								            	/*if(Number(editQuantity) > Number(availquantity))
								            	 {alert("Return Quantity Is Greater Than Availabel Quantity");								            		 
								            		 var rtota = 0.00;
								            		 var maiTota = total;
								            		 var edit = 0;
							            		 	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotal", rtota);
						                    		 $("#jqGrid").jqGrid("setCell", rowId, "total", maiTota);
						                    		 $("#jqGrid").jqGrid("setCell", rowId, "editQuantity", edit);
								            		 return false;}*/
								            	 
								            	 if(availquantity > 0)
								            	 {
									            	 if((+soldQty + +returnedQty) > quantity)
									            	 {
									            		 alert("Sold Quantity + Return Quantity is Greater Than Entered Purchase Quantity");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "quantity", oriQuantity);
									            		 return false;
									            	 }
								            	 }
								            	 else{}
								            	 
								            	 
								            	 	var afterquantity = quantity;// - editQuantity;
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
														var rollSize = 0;
														$("#jqGrid").jqGrid("setCell", rowId, "rollsize", rollSize);
													}								            	 	
								            	 	
								            	 	if(vat == "" || vat == " ")
								            	 	{
								            	 		$("#jqGrid").jqGrid("setCell", rowId, "vat", setZero);
								            	 	}
								            	 	if(igst == "" || igst == " ")
								            	 	{
								            	 		$("#jqGrid").jqGrid("setCell", rowId, "igst", setZero);
								            	 	}
								            	 	
								            	 	if(vat > 0 && igst > 0)
								            	 	{
								            	 		alert("Please Enter Either GST OR IGST");
								            	 		
										            	if(finalVat > 0)
										            	{
										            		vat = finalVat;
										            		$("#jqGrid").jqGrid("setCell", rowId, "vat", finalVat);
										            		$("#jqGrid").jqGrid("setCell", rowId, "igst", "0");
										            	}
										            	else if(finalIgst > 0)
										            	{
										            		igst = finalIgst;
										            		$("#jqGrid").jqGrid("setCell", rowId, "igst", finalIgst);
										            		$("#jqGrid").jqGrid("setCell", rowId, "vat", "0");
										            	}
								            	 		return false;
								            	 	}								            	 	
								            	 	
								            	 	for (var r = 0; r < count1; r++)
													{
														if(vat > 0 )
														{	
															var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
															for (var s = 0; s < count1; s++)
															{
																var rowId1 = ids[s];
																var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
																var currentIgst = rowData1['igst'];
																if(currentIgst > 0)
																{
																	var setZero = 0;
																	var totalBuyP = 0;
																	var taxAmt = 0;
																	if(finalVat > 0)
																	{
																		totalBuyP = quantity * buyPrice;
																		if(dis > 0)
																		{
																			totalBuyP = (totalBuyP - (totalBuyP*(dis/100)));
																		}
																			var taxAmt = (totalBuyP*(finalVat/100));
																	}
																	else if(finalIgst > 0)
																	{
																		totalBuyP = quantity * buyPrice;
																		if(dis > 0)
																		{
																			totalBuyP = (totalBuyP - (totalBuyP*(dis/100)));
																		}
																			var taxAmt = (totalBuyP*(finalIgst/100));
																	}
																	else{taxAmt = 0;}
																	
																	alert("Please Ener Either GST OR IGST");
																	$("#jqGrid").jqGrid("setCell",rowId,"vat",finalVat);
																	$("#jqGrid").jqGrid("setCell",rowId,"igst",finalIgst);
																	$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",taxAmt.toFixed(2));	
																	return false;
																}
															}
														}
														else{}
														if(igst > 0 )
														{	
															var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
															for (var s = 0; s < count1; s++)
															{
																var rowId1 = ids[s];
																var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
																var currentGst = rowData1['vat'];
																if(currentGst > 0)
																{
																	var setZero = 0;
																	var totalBuyP = 0;
																	var taxAmt = 0;
																	
																	if(finalVat > 0)
																	{
																		totalBuyP = quantity * buyPrice;
																		if(dis > 0)
																		{
																			totalBuyP = (totalBuyP - (totalBuyP*(dis/100)));
																		}
																		var taxAmt = (totalBuyP*(finalVat/100));
																	}
																	else if(finalIgst > 0)
																	{
																		totalBuyP = quantity * buyPrice;
																		if(dis > 0)
																		{
																			totalBuyP = (totalBuyP - (totalBuyP*(dis/100)));
																		}
																			var taxAmt = (totalBuyP*(finalIgst/100));
																	}
																	else{taxAmt = 0;}													
																	
																	alert("Please Ener Either GST OR IGST");
																	$("#jqGrid").jqGrid("setCell",rowId,"vat",finalVat);
																	$("#jqGrid").jqGrid("setCell",rowId,"igst",finalIgst);
																	$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",taxAmt);
																	return false;
																}
															}
														}
														else
														{
															var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
															var gstPer = 0;
															var iGstPer = 0;
															var totalTaxAmount = 0;
															for (var s = 0; s < count1; s++)
															{
																var rowId1 = ids[s];
																var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
																var currentTaxAmt = rowData1['taxAmount'];
																gstPer = rowData1['vat'];
																iGstPer = rowData1['igst'];
																totalTaxAmount  = (+totalTaxAmount + +currentTaxAmt).toFixed(2);
																if(gstPer > 0)
																{
																	document.getElementById("totalGst").value = totalTaxAmount;	
																}
																else if(iGstPer > 0)
																{
																	document.getElementById("totalIgst").value = totalTaxAmount;	
																}																	
															}			
															
														}																		
													}
								            	 	
								            	 	if(vat > 0)
													{
								            	 		var totalTaxAmount = 0
														totalBuyP = quantity * buyPrice;
														if(dis > 0)
														{
															totalBuyP = (totalBuyP*(dis/100));
														}
															var taxAmt = (totalBuyP*(finalVat/100));
														
														$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",taxAmt);
														var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
														for (var s = 0; s < count1; s++)
														{
															var rowId1 = ids[s];
															var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
															var currentTaxAmt = rowData1['taxAmount'];
															totalTaxAmount  = (+totalTaxAmount + +currentTaxAmt).toFixed(2);
														}
								             		}
												
								            	 	else if(igst > 0)
													{
														totalBuyP = quantity * buyPrice;
														if(dis > 0)
														{
															totalBuyP = (totalBuyP*(dis/100));
														}
														var taxAmt = (totalBuyP*(finalVat/100));
														
														$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",taxAmt);
														
														var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
														for (var s = 0; s < count1; s++)
														{
															var rowId1 = ids[s];
															var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
															var currentTaxAmt = rowData1['taxAmount'];
															totalTaxAmount  = (+totalTaxAmount + +currentTaxAmt).toFixed(2);
														}														
														 document.getElementById("totalIgst").value = totalTaxAmount;			
													}								            	 	
								            	 	
													if (dis > 0) 
													{
														totadis = (((buyPrice*quantity) * (dis)) / 100);

														if(vat > 0 || igst > 0)
														{
															if (vat > 0) 
															{
																totAmt = (((tota - totadis) * (vat)) / 100);
															} 
															else if (igst > 0) 
															{
																totAmt = (((tota - totadis) * (igst)) / 100);
															}
															$("#jqGrid").jqGrid("setCell", rowId, "taxAmount", totAmt);
														}
														else
														{
															$("#jqGrid").jqGrid("setCell", rowId, "taxAmount", "0");
														}
														totalAmt = +(tota-totadis) + +totAmt;
														totalAmt = totalAmt.toFixed(2);
													}
													else 
													{																		
														if (vat > 0) 
														{
															totAmt = ((tota * (vat)) / 100);
														} 
														else if (igst > 0) 
														{
															totAmt = ((tota * (igst)) / 100);
														}
														
														$("#jqGrid").jqGrid("setCell", rowId, "taxAmount", totAmt);
														
														 totalAmt = +tota + +totAmt;
														 totalAmt = totalAmt.toFixed(2);
													}
													
													var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
													for (var s = 0; s < count1; s++)
													{
														var gstCount = 0;
														var iGstCount = 0;
														var totalTaxAmount = 0;
														var rowId1 = ids[s];
														var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
														var currentTaxAmt = rowData1['taxAmount'];
														
														totalTaxAmount  = (+totalTaxAmount + +currentTaxAmt).toFixed(2);
														for (var s = 0; s < count1; s++)
														{
															var rowId12 = ids[s];
															var rowData12 = jQuery("#jqGrid").getRowData(rowId12);
															var currentGst = rowData12['vat'];
															var currentiGst = rowData12['igst'];
															if(currentGst > 0)
															{
																gstCount++;
															}
															else if(currentiGst > 0)
															{
																iGstCount++;
															}
														}
														
														if(gstCount > 0)
														{
															document.getElementById("totalGst").value = totalTaxAmount;
														}
														else if(iGstCount > 0)
														{
															document.getElementById("totalIgst").value = totalTaxAmount;
														}
														
													}														
													//document.getElementById("totalGst").value = gstTotalTaxAmount;
													
								            	 
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
								            	 if (dis > 0) 
													{
								            	 dist = (total1*dis)/100;
								            	 if (vat > 0) 
								            	 {
									            	 totAmt1 =  (((total1-dist)*(vat))/100);
									            	 }
									            	 else if (igst > 0) 
									            	 {
									            		 totAmt1 =  (((total1-dist)*(igst))/100);
									            	 }
									            	 totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
												 }
								            	 else
								            		{
								            		 if (vat > 0) 
													{
								            			totAmt1 = (((total1)*(vat))/100);
									            	}
								            		 	else if (igst > 0) 
													{
									            		totAmt1 = (((total1)*(igst))/100);
									            	}
									            	 	totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
								            		}
								            	 
								            	// document.getElementById("editGrossTotal").value = totalAmt1;								            	 
								            	 
								            	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotal", totalAmt1);
								            	 var parseTotal=  $(this).jqGrid('getCol', 'returnTotal', false, 'sum');
								            	 parseTotal = parseTotal.toFixed(2);
								            	 $(this).jqGrid('footerData', 'set', { igst: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotal: parseTotal});
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'total', false, 'sum');
								            	 parseTotal1 = parseTotal1.toFixed(2);
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'taxAmount', false, 'sum');
								            	 parseTotal2 = parseTotal2.toFixed(2);
								            	 $(this).jqGrid('footerData', 'set', { total: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { taxAmount: parseTotal2});
								            	 if(parseTotal == null || parseTotal == "" || parseTotal == undefined)
								            	 {
								            		 document.getElementById("editGrossTotal").value = "0.0";
								            	 }
								            	 else
								            	 {
								            		 total1 = editQuantity * buyPrice;
								            		 
									            	 if (dis > 0) 
													 {
									            	  dist = (total1*dis)/100;
									            	  if (vat > 0) 
													 {
									            	  totAmt1 =  (((total1-dist)*(vat))/100);
									            	 }
									            	  else if (igst > 0) 
													 {
									            	  	 totAmt1 =  (((total1-dist)*(igst))/100);
									            	 }
									            	 totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
														}
									            	 else
									            		 {
									            		 if (vat > 0) 
															{
										            	 totAmt1 =  (((total1)*(vat))/100);
										            	 }
										            	 else if (igst > 0) 
															{
										            		 totAmt1 =  (((total1)*(igst))/100);
										            		 }
										            	 totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
									            		 
									            		 document.getElementById("editGrossTotal").value = totalAmt1;
									            	 } 
								            	 }
								            	 document.getElementById("editGrossTotal").value = parseTotal1;
								             },
								             
								              // set a footer row
								             	footerrow: true, 
								             								             
								             gridComplete: function()
								             {								            	 
								            	 var parseTotal=  $(this).jqGrid('getCol', 'returnTotal', false, 'sum');
								            	 parseTotal = parseTotal.toFixed(2);
								            	 $(this).jqGrid('footerData', 'set', { igst: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotal: parseTotal});
								            	 var parseTotal1 = $(this).jqGrid('getCol', 'total', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { total: parseTotal1});
								            	 var totalTaxAmount = $(this).jqGrid('getCol', 'taxAmount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', {taxAmount: totalTaxAmount});
								            	 var gstTotalTaxAmount = 0;
								            	 var iGstTotalTaxAmount = 0;
								            	 var vat = $(this).jqGrid('getCol', 'vat', false, 'sum');
								            	 var igst = $(this).jqGrid('getCol','igst', false, 'sum');
								            	 parseTotal1 = parseTotal1.toFixed(2);
								            	 if(vat > 0)
								            	 {
								            		 gstTotalTaxAmount = (+gstTotalTaxAmount + +totalTaxAmount).toFixed(2);;
								            	 }
								            	 if(igst > 0)
								            	 {
								            		 iGstTotalTaxAmount = (+iGstTotalTaxAmount + +totalTaxAmount).toFixed(2);;
								            	 }
								            	 
								            	 if(parseTotal == null || parseTotal == "" || parseTotal == undefined)
								            	 {
								            		 document.getElementById("editGrossTotal").value = "0.0";
								            	 }
								            	 else
								            	 {}
								            	 if(vat > 0)
								            	 {
								            		 document.getElementById("totalGst").value = gstTotalTaxAmount;
								            		 document.getElementById("totalIgst").value = "0.0";								            		
								            	 }
								            	 if(igst > 0)
								            	 {
								            		 document.getElementById("totalGst").value = "0.0";
								            		 document.getElementById("totalIgst").value = iGstTotalTaxAmount;
								            	 }
								            	 if((vat == 0 && igst == 0) || (vat == "" && igst == "") || (vat == null && igst == null))
								            	 {
								            		 document.getElementById("totalGst").value = "0.0";
								            		 document.getElementById("totalIgst").value = "0.0";
								            	 }								            		 
								            	 
								            	 document.getElementById("editGrossTotal").value = parseTotal1;
								            	 
								             },
								             pager : "#jqGridPager",
							});
					
					$("#jqGrid").addRowData(i, jsonData[i]);					
					
					$('#jqGrid').navGrid('#jqGridPager',
							// the buttons to appear on the toolbar of the grid
							{ edit: true, add: true, del: false, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
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
								afterComplete : function() {
									$('#jqGrid').trigger( 'reloadGrid' );									

					            	 var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
					            	 var rowData = jQuery("#jqGrid").getRowData(rowId);
					            	 var quantity = rowData['quantity'];
					            	 var availquantity = rowData['availquantity'];
					            	 var editQuantity = rowData['editQuantity'];
					            	 var buyPrice = rowData['buyPrice'];
					            	 var vat = rowData['vat'];
					            	 var totAmt = 0;
					            	 var totalAmt = 0;
					            	 var totAmt1 = 0;
					            	 var totalAmt1 = 0;

					            	 if(Number(editQuantity) > Number(availquantity))
					            	 {
					            		 alert("Return Quantity Is Greater Than Availabel Quantity");
					            	 }
					            	 var afterquantity = quantity - editQuantity;
					            	 var tota = afterquantity * buyPrice;
					            	 totAmt =  ((tota*(vat))/100);
					            	 totalAmt = +tota + +totAmt;
					            	 $("#jqGrid").jqGrid("setCell", rowId, "total", totalAmt);
					            	 var total1 = editQuantity * buyPrice;
					            	 totAmt1 =  ((total1*(vat))/100);
					            	 totalAmt1 = +total1 + +totAmt1;
					            	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotal", totalAmt1);
					            	 var parseTotal=  $(this).jqGrid('getCol', 'returnTotal', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { vat: "Total :" });
					            	 $(this).jqGrid('footerData', 'set', { returnTotal: parseTotal});
					            	 var parseTotal1=  $(this).jqGrid('getCol', 'total', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { total: parseTotal1});
					            	 document.getElementById("editGrossTotal").value = totalAmt1;
					             
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
				if (textStatus === "timeout")
				{
				}
			});
}

function validateEditPurchaseGrid()
{
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var gstCount = 0;
	for (var i = 0; i < count; i++)
	{
		var allRowsInGrid = $('#jqGrid').getGridParam('data');
		var AllRows = JSON.stringify(allRowsInGrid);
		
		var igst = allRowsInGrid[i].igst;
		
		for(var j = 0; j < count; j++)
		{
			var vat = allRowsInGrid[j].vat;
			if(vat > 0 && igst > 0)
			{
				gstCount++;
			}
		}		
	}
	if(gstCount > 0)
	{
		alert("Please Enter GST OR IGST on Row "+count);
		return false;
	}
	else
	{
		editPurchase();
	}
}

function editPurchase()
{
	var params = {};
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');
	var AllRows = JSON.stringify(allRowsInGrid);
	
	if(count < 1)
	{
		alert("Please Enter Voucher Number");
		return false;
	}
	
	for (var i = 0; i < count; i++)
	{
		var PkGoodRecId = allRowsInGrid[i].PkGoodRecId;
		params["PkGoodRecId" + i] = PkGoodRecId;

		var itemName = allRowsInGrid[i].itemName;
		params["itemName" + i] = itemName;		
		
		var catName = allRowsInGrid[i].catName;
		params["catName" + i] = catName;
		
		var subcatName = allRowsInGrid[i].subcatName;
		params["subcatName" + i] = subcatName;		
		
		var hsnSac = allRowsInGrid[i].hsnSac;
		params["hsnSac" + i] = hsnSac;
		
		var color = allRowsInGrid[i].color;
		params["color" + i] = color;
		
		var size = allRowsInGrid[i].size;
		params["size" + i] = size;
		
		var style = allRowsInGrid[i].style;
		params["style" + i] = style;
		
		var rollsize = allRowsInGrid[i].rollsize;
		params["rollsize" + i] = rollsize;
		
		var oriQuantity = allRowsInGrid[i].oriQuantity;
		params["oriQuantity" + i] = oriQuantity;
		
		var quantity = allRowsInGrid[i].quantity;
		params["quantity" + i] = quantity;
		
		var soldQty = allRowsInGrid[i].soldQty;
		params["soldQty" + i] = soldQty;
		
		var returnedQty = allRowsInGrid[i].returnedQty;
		params["returnedQty" + i] = returnedQty;
		
		var availquantity = allRowsInGrid[i].availquantity;
		params["availquantity" + i] = availquantity;		

		var buyPrice = allRowsInGrid[i].buyPrice;
		params["buyPrice" + i] = buyPrice;
		
		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice" + i] = salePrice;
		
		var purchaseCode = allRowsInGrid[i].purchaseCode;
		params["purchaseCode" + i] = purchaseCode;
		
		var discount = allRowsInGrid[i].discount;
		params["discount"+i] = discount;
		
		var vat = allRowsInGrid[i].vat;
		params["vat" + i] = vat;
		
		var igst = allRowsInGrid[i].igst ;
		params["igst" + i] = igst;

		var total = allRowsInGrid[i].total;
		params["total" + i] = total;
		
		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
			
		var rollsize = allRowsInGrid[i].rollsize;
		params["rollsize"+i] = rollsize;
		
		var productId = allRowsInGrid[i].productId;
		params["productId"+i] = productId;
		
		var catId = allRowsInGrid[i].catId;
		params["catId"+i] = catId;
		
		var subCatId = allRowsInGrid[i].subCatId;
		params["subCatId"+i] = subCatId;
		
		var taxAmount = allRowsInGrid[i].taxAmount;
		params["taxAmount"+i] = taxAmount;
		
		var total = allRowsInGrid[i].total;
		params["total"+i] = total;		
	}

	var voucherNo = $("#voucherNo").val();
	var billNo = $('#billNo').val();
	
	var input = document.getElementById('updateSupplierId'), 
	list = document.getElementById('updateSupplierId_drop'), k, supplierId, supcode;
	for (k = 0; k < list.options.length; ++k)
	{
		if (list.options[k].value === input.value)
		{
			supplierId = list.options[k].getAttribute('data-value');
		}
	}
	if(supplierId == null || supplierId == undefined || supplierId == "" || supplierId == " ")
	{
		var suppName = $("#supplierId").val();
		var splitSId = suppName.split(",");
		supplierId = splitSId[0];
		var suppCode= splitSId[2];
	}	

	var contactPerson = $('#contactPerson').val();
	var pEDate = $('#pEDate').val();
	var editGrossTotal = $("#editGrossTotal").val();
	var finalGrossTotalHidden = $("#finalGrossTotalHidden").val();
	var pendingBillpaymentHidden = $("#pendingBillpaymentHidden").val();
	var grossTotalDiff = ((Number(editGrossTotal)) - (Number(finalGrossTotalHidden)));
	
	if(+grossTotalDiff == 0)
	{}
	else if(grossTotalDiff > 0)
	{
		pendingBillpaymentHidden = ((+pendingBillpaymentHidden) + (+grossTotalDiff));
	}
	else if(grossTotalDiff < 0)
	{
		pendingBillpaymentHidden = (+pendingBillpaymentHidden + (+grossTotalDiff));
	}
	
	params["billNo"] = billNo;
	params["supplierId"] = supplierId;
	params["contactPerson"] = contactPerson;
	params["pEDate"] = pEDate;
	params["editGrossTotal"] = editGrossTotal;
	params["pendingBillpaymentHidden"] = pendingBillpaymentHidden;	
	params["grossTotalDiff"] = grossTotalDiff;
	
	params["count"] = count;
	params["methodName"] = "updatePurchaseReturn";
	
	$.post('/SMT/jsp/utility/controller.jsp', params, function(data)
	{
		alert(data);
		location.reload();
	}).error(function(jqXHR, textStatus, errorThrown)
	{
		if (textStatus === "timeout")
		{
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
	
	
	
	
	
}