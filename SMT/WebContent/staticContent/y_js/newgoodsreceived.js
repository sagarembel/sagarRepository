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

function setOfferDiscount()
{
	var disPercentage = $('#disPercentage').val();
	var fromBarC = $('#fromBarC').val();
	var toBarC = $('#toBarC').val();
	var hundredPer = 100;
	
	if(disPercentage == null || disPercentage == "")
	{
		myAlert("Please Enter Discount Percentage");
		return false;
	}
	else
	{
		var matchNumber = /^[0-9]+\.?[0-9]*$/
		
		if(disPercentage.match(matchNumber))
		{
			if(Number(disPercentage) >= 100)
			{
				myAlert("Discount Must Be Less Than 100 %");
				return false;
			}
		}
		else
		{
			myAlert("Please Enter valid Discount Value");
			return false;
		}
	}

	if(fromBarC == null || fromBarC == "")
	{
		myAlert("Please Enter From Barcode");
		return false;
	}
	else
	{
		var matchNumber = /^[0-9]*$/;
		
		if(fromBarC.match(matchNumber))
		{}
		else
		{
			myAlert("Please Enter valid Start Barcode");
			return false;
		}
	}

	if(toBarC == null || toBarC == "")
	{
		myAlert("Please Enter To Barcode");
		return false;
	}
	else
	{
		var matchNumber = /^[0-9]*$/;
		
		if(toBarC.match(matchNumber))
		{}
		else
		{
			myAlert("Please Enter valid End Barcode");
			return false;
		}
	}
	
	var params = {};
	params["disPercentage"] = disPercentage;
	params["fromBarC"] = fromBarC;
	params["toBarC"] = toBarC;
	
	params["methodName"] = "setOfferDiscount";
	
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

function checkDate(UserDate)
{
    //var UserDate = document.getElementById("userdate").value;
    var ToDate = new Date();

    if(new Date(UserDate).getTime() > ToDate.getTime())
    {
    	return true;
    }    
}

function validateRegGoodReceive()
{
	var billNo = $('#billNo').val();
	var supplierId = $('#supplierId').val();
	var pDate = $('#pDate').val();
	if(checkDate(pDate))
	{
		myAlert("Please Select Correct Date");
		document.good.btnSubmit.disabled = false;
        return false;
	}
	var expence = $('#expence').val();
	var totalAmount = $('#resolution').val();
	var contactPerson = $('#contactPerson').val();
	var contactPersonNamePattern = /^[a-zA-Z ]{2,50}$/;
	var contactPersonNamePatternRes = contactPersonNamePattern.test(contactPerson);
	var expencePattern = /^\d+$/;
	var expencePatternRes = expencePattern.test(expence);
	
	if (billNo != null && billNo != "" && billNo != " ")
	{
		if (supplierId != null && supplierId != "" && supplierId != " ")
		{
			if(contactPerson == null || contactPerson == "" || contactPerson == undefined)
			{}
			else
			{
				if(contactPersonNamePatternRes)
				{}else
				{
					myAlert("Please Enter Valid Contact Person Name");
					document.good.btnSubmit.disabled = false;
					return false;
				}				
			}				
				if (pDate != null && pDate != "" && pDate != " ")
				{
					if (expencePatternRes)
					{
						if (totalAmount != null && totalAmount != "" && totalAmount != " " && totalAmount != expence)
						{
							// If validation is success than controller will go to
							// regGoodReceive()
							regGoodReceive();
						} else {
							myAlert(" Please select item form item list ");
							document.good.btnSubmit.disabled = false;
							return false;
						}
					} else {
						myAlert("Enter Expenses");
						document.good.btnSubmit.disabled = false;
						return false;
					}
				}
	
				else {
					myAlert("Please select purchase date !");
					document.good.btnSubmit.disabled = false;
					return false;
				}
				
			}
			/*else
			{
				myAlert("Please Enter Valid Contact Person Name");
				return false;
			}
		
			
		} */else {
			myAlert("Please select supplier name !");
			document.good.btnSubmit.disabled = false;
			return false;
		}
	}

	else {
		myAlert("Please Enter Bill No");
		document.good.btnSubmit.disabled = false;
		return false;	
	}
}

function regGoodReceive()
{
	var sPWithoutTax = 0;
	var params = {};
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
	var AllSubRowsValue = JSON.stringify(allRowsInGrid1);
	for (var i = 0; i < count; i++)
	{
		var color = allRowsInGrid1[i].color;
		params["color" + i] = color;

		var size = allRowsInGrid1[i].size;
		params["size" + i] = size;

		var itemName = allRowsInGrid1[i].itemName;
		params["itemName" + i] = itemName;

		var hsnsacno = allRowsInGrid1[i].hsnsacno;
		params["hsnsacno" + i] = hsnsacno;
		
		var actualprice = allRowsInGrid1[i].actualprice;
		if(actualprice == "" || actualprice == '0' || actualprice == null || actualprice == undefined)
		{
			alert("Please Enter Sale Price for => "+(i+1)+" "+itemName);
			return false;
		}
		else
		{
			params["actualprice" + i] = actualprice;
		}	

		var cGst = allRowsInGrid1[i].vat;
		if (cGst == undefined || cGst == null || cGst == "0")
		{
			params["vat" + i] = 0.0;
		}
		else if (cGst != undefined || cGst != null || Number(cGst) > 0)
		{
			params["vat" + i] = cGst;
			
			sPWithoutTax = (actualprice/(1+(cGst/100)));					
			params["sPWithoutTax" + i] = sPWithoutTax.toFixed(2);
		}

		var igst = allRowsInGrid1[i].igst;
		if (igst == undefined || igst == null || igst == "0")
		{
			params["igst" + i] = 0.0;
		}
		else if (igst != undefined || igst != null || Number(igst) > 0)
		{
			params["igst" + i] = igst;
			
			sPWithoutTax = (actualprice/(1+(igst/100)));					
			params["sPWithoutTax" + i] = sPWithoutTax.toFixed(2);
		}

		if((igst == undefined || igst == null || igst == "0") && (cGst == undefined || cGst == null || cGst == "0"))
		{
			params["sPWithoutTax" + i] = actualprice;
		}
		
		var gstamt = allRowsInGrid1[i].gstamt;
		if (gstamt == undefined || gstamt == null)
		{
			params["gstamt" + i] = 0.0;
		}
		else if (gstamt != undefined || gstamt != null)
		{
			params["gstamt" + i] = gstamt;
		}

		var catName = allRowsInGrid1[i].catName;
		params["catName" + i] = catName;

		var quantity = allRowsInGrid1[i].quantity;
		params["quantity" + i] = quantity;

		var rollSize = allRowsInGrid1[i].rollSize;
		if (size == "meter"
			|| size == "Meter"
			|| size == "METER"
			|| size == "MTR"
			|| size == "mtr"
			|| size == "Mtr")
			{
				if (rollSize == "0" || rollSize == "" || rollSize == null || rollSize == undefined)
				{
					alert("Please Enter RollSize for = "+itemName);
					return false;
					//params["rollSize" + i] = 1.0;
				}
			}		
		params["rollSize" + i] = rollSize;
			
		var buyPrice = allRowsInGrid1[i].buyPrice;
		params["buyPrice" + i] = buyPrice;

		var purcode = allRowsInGrid1[i].purcode;
		params["purcode" + i] = purcode;
		
		var disPer = allRowsInGrid1[i].disPer;
		if(disPer == "" || disPer == '0' || disPer == null || disPer == undefined)
		{
			disPer = 0;
		}
		params["disPer" + i] = disPer;
		
		var Total = allRowsInGrid1[i].Total;
		params["Total" + i] = Total;
		
		var subCatId = allRowsInGrid1[i].subCatId;
		params["subCatId" + i] = subCatId;
		
		var productId = allRowsInGrid1[i].productId;
		params["productId" + i] = productId;
		
		var categoryId = allRowsInGrid1[i].categoryId;
		params["categoryId" + i] = categoryId;
		
		var style = allRowsInGrid1[i].style;
		params["style" + i] = style;
		
		var subCatName = allRowsInGrid1[i].subCatName;
		params["subCatName" + i] = subCatName;
		
	}
	var input = document.getElementById('supplierId'), list = document
			.getElementById('supplierId_drop'), k, supplierId, supcode;
	for (k = 0; k < list.options.length; ++k)
	{
		if (list.options[k].value === input.value)
		{
			supplierId = list.options[k].getAttribute('data-value');
		}
	}
	var billNo = $('#billNo').val();
	var contactPerson = $('#contactPerson').val();
	var vat = $('#vat').val();
	var pDate = $('#pDate').val();
	var extraDiscount = $('#extraDiscount').val();
	if (extraDiscount == "" || extraDiscount == undefined || extraDiscount == null)
	{
		extraDiscount = 0;
	}
	var expence = $('#expence').val();
	if (expence == "" || expence == undefined || expence == null)
	{
		expence = 0;
	}
	var resolution = $('#resolution').val();
	var supcode = $('#supplierId').val();

	/*
	 * var res1 = supcode.split(',',1); var res = supcode.split(',',2);
	 */
	var splitText = supcode.split(",");

	var supName = splitText[0];
	var supCode = splitText[1];

	params["billNo"] = billNo;
	params["contactPerson"] = contactPerson;
	params["vat"] = vat;
	params["pDate"] = pDate;
	params["count"] = count;
	params["extraDiscount"] = extraDiscount;
	params["expence"] = expence;
	params["resolution"] = resolution;
	params["supplierId"] = supplierId;
	params["supcode"] = supCode;
	params["methodName"] = "regGoodReceive";

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

// Register good recive without barcode

function validateRegGoodReceive1()
{
	var billNo = $('#billNo').val();
	var supplierId = $('#supplierId').val();
	var pDate = $('#pDate').val();
	if(checkDate(pDate))
	{
		myAlert("Please Select Correct Date");
		document.good.btnSubmit1.disabled = false;
        return false;
	}
	var expence = $('#expence').val();
	var totalAmount = $('#resolution').val();
	var contactPersonNamePattern = /^[a-zA-Z ]{2,50}$/;
	var contactPersonNamePatternRes = contactPersonNamePattern.test(contactPerson);
	var expencePattern = /^\d+$/;
	var expencePatternRes = expencePattern.test(expence);

	if (billNo != null && billNo != "" && billNo != " ") {
		if (supplierId != null && supplierId != "" && supplierId != " ") {
			if (pDate != null && pDate != "" && pDate != " ") {
				if (expencePatternRes)
				{
					if (totalAmount != null && totalAmount != "" && totalAmount != " " && totalAmount != expence)
					{					
						regGoodReceive1();
					}
					else
					{
						myAlert(" Please select item form item list" );
						document.good.btnSubmit1.disabled = false;
						return false;
					}
				} else {
					myAlert("Enter Expenses");
					document.good.btnSubmit1.disabled = false;
					return false;
				}
			}

			else {
				myAlert("Please select purchase date !");
				document.good.btnSubmit1.disabled = false;
				return false;
			}
		} else {
			myAlert("Please select supplier name !");
			document.good.btnSubmit1.disabled = false;
			return false;
		}
	}
	else
	{
		myAlert("Please Enter Bill No");
		document.good.btnSubmit1.disabled = false;
		return false;
	}
}

function regGoodReceive1()
{
	var sPWithoutTax = 0;
	var params = {};
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
	var AllSubRowsValue = JSON.stringify(allRowsInGrid1);
	for (var i = 0; i < count; i++)
	{
		var color = allRowsInGrid1[i].color;
		params["color" + i] = color;

		var size = allRowsInGrid1[i].size;
		params["size" + i] = size;

		var itemName = allRowsInGrid1[i].itemName;
		params["itemName" + i] = itemName;

		var hsnsacno = allRowsInGrid1[i].hsnsacno;
		params["hsnsacno" + i] = hsnsacno;
		
		var actualprice = allRowsInGrid1[i].actualprice;
		if(actualprice == "" || actualprice == '0' || actualprice == null || actualprice == undefined)
		{
			alert("Please Enter Sale Price for => "+(i+1)+" "+itemName);
			document.good.btnSubmit.disabled = false;
			document.good.btnSubmit1.disabled = false;
			return false;
		}
		else
		{
			params["actualprice" + i] = actualprice;
		}	

		var cGst = allRowsInGrid1[i].vat;

		if (cGst == undefined || cGst == null || cGst == "0")
		{
			params["vat" + i] = 0.0;
		}
		else if (cGst != undefined || cGst != null || cGst != 0 || Number(cGst) > 0)
		{
			params["vat" + i] = cGst;
			
			sPWithoutTax = (actualprice/(1+(cGst/100)));					
			params["sPWithoutTax" + i] = sPWithoutTax.toFixed(2);
		}

		var igst = allRowsInGrid1[i].igst;
		if (igst == undefined || igst == null || igst == "0")
		{
			params["igst" + i] = 0.0;			
		}
		else if (igst != undefined || igst != null || igst != 0 || Number(igst) > 0)
		{
			params["igst" + i] = igst;
			
			sPWithoutTax = (actualprice/(1+(igst/100)));					
			params["sPWithoutTax" + i] = sPWithoutTax.toFixed(2);
		}
		
		if((igst == undefined || igst == null || igst == "0") && (cGst == undefined || cGst == null || cGst == "0"))
		{
			params["sPWithoutTax" + i] = actualprice;
		}	
		
		var gstamt = allRowsInGrid1[i].gstamt;
		if (gstamt == undefined || gstamt == null)
		{
			params["gstamt" + i] = 0.0;
		}
		else if (gstamt != undefined || gstamt != null)
		{
			params["gstamt" + i] = gstamt;
		}

		var catName = allRowsInGrid1[i].catName;
		params["catName" + i] = catName;

		var quantity = allRowsInGrid1[i].quantity;
		params["quantity" + i] = quantity;

		/*var rollSize = allRowsInGrid1[i].rollSize;
		if (rollSize == "0") {
			params["rollSize" + i] = 1.0;
		} else {
			params["rollSize" + i] = rollSize;
		}*/
		
		var rollSize = allRowsInGrid1[i].rollSize;
		if (size == "meter"
			|| size == "Meter"
			|| size == "METER"
			|| size == "MTR"
			|| size == "mtr"
			|| size == "Mtr")
			{
				if (rollSize == "0" || rollSize == "" || rollSize == null || rollSize == undefined)
				{
					alert("Please Enter RollSize for = "+itemName);
					document.good.btnSubmit.disabled = false;
					document.good.btnSubmit1.disabled = false;
					return false;
					//params["rollSize" + i] = 1.0;
				}
			}		
		params["rollSize" + i] = rollSize;

		var buyPrice = allRowsInGrid1[i].buyPrice;
		params["buyPrice" + i] = buyPrice;

		var purcode = allRowsInGrid1[i].purcode;
		params["purcode" + i] = purcode;

		var disPer = allRowsInGrid1[i].disPer;
		if(disPer == "" || disPer == '0' || disPer == null || disPer == undefined)
		{
			disPer = 0;
		}
		params["disPer" + i] = disPer;
		
		var Total = allRowsInGrid1[i].Total;
		params["Total" + i] = Total;
		
		var subCatId = allRowsInGrid1[i].subCatId;
		params["subCatId" + i] = subCatId;
		
		var productId = allRowsInGrid1[i].productId;
		params["productId" + i] = productId;
		
		var categoryId = allRowsInGrid1[i].categoryId;
		params["categoryId" + i] = categoryId;
		
		var style = allRowsInGrid1[i].style;
		params["style" + i] = style;		
	}
	
	var input = document.getElementById('supplierId'), list = document.getElementById('supplierId_drop'), k, supplierId, supcode;
	for (k = 0; k < list.options.length; ++k)
	{
		if (list.options[k].value === input.value)
		{
			supplierId = list.options[k].getAttribute('data-value');
		}
	}
	var billNo = $('#billNo').val();
	var contactPerson = $('#contactPerson').val();
	var vat = $('#vat').val();
	var pDate = $('#pDate').val();
	var supcode = $('#supplierId').val();
	var splitText = supcode.split(",");

	var supName = splitText[0];
	var supCode = splitText[1];
	
	var extraDiscount = $('#extraDiscount').val();
	if (extraDiscount == "" || extraDiscount == undefined
			|| extraDiscount == null) {
		extraDiscount = 0;
	}
	var expence = $('#expence').val();
	if (expence == "" || expence == undefined || expence == null) {
		expence = 0;
	}
	var resolution = $('#resolution').val();

	params["billNo"] = billNo;
	params["contactPerson"] = contactPerson;
	params["vat"] = vat;
	params["pDate"] = pDate;
	params["count"] = count;
	params["extraDiscount"] = extraDiscount;
	params["expence"] = expence;
	params["resolution"] = resolution;
	params["supplierId"] = supplierId;
	params["supcode"] = supCode;
	params["methodName"] = "regGoodReceiveWithOutBarcode";

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
// End witout barcode printing code

function getProductList()
{
	/*if (document.getElementById('gst').checked)
	{*/
		var input = document.getElementById('itemName'), list = document.getElementById('itemId_drop'), i, catName, itemName, hsnsacno, productId, size;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				catName = list.options[i].getAttribute('data-value');
				itemName = list.options[i].getAttribute('myvalue');
				subcatId = list.options[i].getAttribute('myvalue1');
				productId = list.options[i].getAttribute('myvalue2');
				size = list.options[i].getAttribute('myvalue4');
				fkCatId = list.options[i].getAttribute('myvalue5');
			}
		}

		itemparams = {};

		itemparams["itemName"] = itemName;
		itemparams["catName"] = catName;
		itemparams["productId"] = productId;
		itemparams["size"] = size;
		itemparams["fkCatId"] = fkCatId;
		itemparams["subcatId"] = subcatId;

		document.getElementById('itemName').value = null;
		var count = 0;
		var newrow;
		var rowId;
		itemparams["methodName"] = "getProductInGrid";
		$.post('/SMT/jsp/utility/controller.jsp',
						itemparams,
						function(data) {
							var jsonData = $.parseJSON(data);
							$.each(jsonData,function(i, v)
							{
								count = jQuery("#jqGrid").jqGrid('getGridParam','records');
								var rowdata = $("#jqGrid").jqGrid('getGridParam','data');
								var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
								var ori_quantity, offerId;
								for (var j = 0; j < count; j++)
								{
									offerId = rowdata[j].itemName;
									var rowId = ids[j];
									var rowData = jQuery('#jqGrid').jqGrid('getRowData',rowId);
									if (offerId == jsonData.offer.itemName)
									{
										ori_quantity = +rowdata[j].quantity + 1;
										$("#jqGrid").jqGrid("setCell",rowId,"quantity",ori_quantity);
										var grid = jQuery("#jqGrid");
										grid.trigger("reloadGrid");
										newrow = false;
										break;
									} else {
												newrow = true;
											}
								}

												var prodName, com;
												for (var j = 0; j < count; j++) {
													prodName = rowdata[j].itemName;
													com = rowdata[j].catName;
													var rowId = ids[j];
													var rowData = jQuery('#jqGrid').jqGrid('getRowData',rowId);
													/*
													 * if (prodName == itemName &&
													 * com == catName) {
													 * newrow=false; alert("Item
													 * Already Inserted !!!");
													 * var grid =
													 * jQuery("#jqGrid");
													 * grid.trigger("reloadGrid");
													 * break; } else {
													 */
													newrow = true;
													/* } */
												}
												if (newrow == true) {
													$("#jqGrid").addRowData(
															count,
															jsonData.offer);
												}

												$("#jqGrid")
														.jqGrid(
																{
																	datatype : "local",
																	editurl : 'clientArray',
																	colNames : [
																			"ProductId",
																			"Item<br>Name",
																			"Category<br>Name",
																			"Category<br>ID",																			
																			"Sub<br>Category<br>Name",
																			"subCatId",
																			"HSN",
																			"Color",
																			"Size",
																			"Roll<br>Size",
																			"Qty",
																			"Buy<br>Price",
																			"Purchase<br>Code",
																			"Sale<br>Price",
																			"Dis<br>%",
																			"GST<br>%",
																			"IGST<br> %",
																			"TAX<br>AMT",
																			"Total",																			
																			"Qty<br>Diff",
																			"Buy<br>Diff",
																			"Sale<br>Diff" ],

																	colModel : [
																			{
																				name : "productId",// PARTICULARS
																				width : 5,
																				hidden : true,
																			},
																			{
																				name : "itemName",// PARTICULARS
																				width : 5,
																			},

																			{
																				name : "catName",
																				width : 5,
																			},
																			{
																				name : "categoryId",
																				width : 5,
																				hidden : true,
																			},
																			{
																				name : "subCatName",
																				width : 5,
																			},
																			{
																				name : "subCatId",
																				width : 5,
																				hidden : true,
																			},
																			{
																				name : "hsnsacno",
																				width : 5,
																			},
																			{
																				name : "color",
																				editable : true,
																				width : 3,
																			},
																			{
																				name : "size",
																				editable : true,
																				width : 2,
																			},
																			{
																				id : "rollSize",
																				name : "rollSize",
																				editable : true,
																				width : 3,
																			},
																			{
																				name : "quantity",
																				required : true,
																				width : 3,
																			},
																			{																			
																				name : "buyPrice",
																				editable : true,
																				width : 3,

																			},
																			{
																				name : "purcode",
																				editable : true,
																				width : 3,

																			},
																			{
																				name : "actualprice",
																				editable : true,
																				width : 3,

																			},
																			{
																				name : "disPer",
																				editable : true,
																				width : 4,

																			},
																			{
																				name : "vat",// PARTICULARS
																				editable : true,
																				width : 3,
																			},

																			{
																				name : "igst",// PARTICULARS
																				editable : true,
																				width : 3,
																			},
																			{
																				name : "gstamt",// PARTICULARS
																				width : 3,
																			// formatter:
																			// calculateGst
																			},

																			{
																				name : "Total",
																				formatter : 'number',
																				width : 5,
																			},
																			
																			{
																				name : "qtydiff",
																				editable : true,
																				edittype : "select",
																				editoptions : {
																					value : "1:1;2:2;3:3;4:4;5:5;6:6;7:7;8:8;9:9;10:10;11:11;12:12;13:13;14:14;15:15;16:16;17:17;18:18;19:19;20:20;21:21;22:22;23:23;24:24;25:25;26:26;27:27;28:28;29:29;30:30;31:31;32:32;33:33;34:34;35:35;36:36;37:37;38:38;39:39;40:40;41:41;42:42;43:43;44:44;45:45;46:46;47:47;48:48;49:49;50:50"
																				},
																				width : 3,
																			},
																			{
																				name : "buydiff",
																				editable : true,
																				edittype : "select",
																				editoptions : {
																					value : "0:0;1:1;2:2;3:3;4:4;5:5;6:6;7:7;8:8;9:9;10:10;11:11;12:12;13:13;14:14;15:15;16:16;17:17;18:18;19:19;20:20"
																				},
																				width : 3,
																			},
																			{
																				name : "salediff",
																				editable : true,
																				edittype : "select",
																				editoptions : {
																					value : "0:0;1:1;2:2;3:3;4:4;5:5;6:6;7:7;8:8;9:9;10:10;11:11;12:12;13:13;14:14;15:15;16:16;17:17;18:18;19:19;20:20"
																				},
																				width : 3,
																			} ],
																	sortorder : 'desc',
																	multiselect : false,
																	loadonce : false,
																	viewrecords : true,
																	width : 1310,
																	shrinkToFit : true,
																	rowheight : 300,
																	rownumbers : true,
																	onSelectRow : editRow,
																	rowNum : 11,

																	'cellEdit' : true,

																	beforeEditCell : function(
																			rowid,
																			cellname,
																			value,
																			irow,
																			icol) {
																		/*var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
																		var rowData = jQuery("#jqGrid").getRowData(rowId);
																		var unit = rowData['size'];

																		if (unit == "meter"
																				|| unit == "Meter"
																				|| unit == "METER"
																				|| unit == "MTR"
																				|| unit == "mtr"
																				|| unit == "Mtr") {
																			$(this).jqGrid('setColProp','rollSize',
																			{
																				editable : true
																			});
																		}
																		else
																		{
																			$(this).jqGrid('setColProp','rollSize',
																			{
																				editable : false
																			});
																		}*/
																	},
																	
																	afterSaveCell : function()
																	{																		
																		document.getElementById('expence').value = 0;
																		document.getElementById('extraDiscount').value = 0;
																		
																		var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
																		var rowData = jQuery("#jqGrid").getRowData(rowId);
																		var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
																		var color = rowData['color'];
																		var itemName = rowData['itemName'];
																		var quantity1 = rowData['qtydiff'];
																		var quantity = rowData['quantity'];
																		var buyPrice = rowData['buyPrice'];
																		var buyprice1 = rowData['buydiff'];
																		var buyPrice2 = rowData['buyPrice'];
																		//var salePrice = rowData['salePrice'];
																		var actualprice = rowData['actualprice'];
																		var actualprice1 = rowData['actualprice'];
																		var salePrice1 = rowData['salediff'];
																		var gst = rowData['vat'];
																		var dis = rowData['disPer'];
																		var igst = rowData['igst'];
																		var catName = rowData['catName'];
																		var qd = rowData['qtydiff'];
																		var rollSize = rowData['rollSize'];
																		var unit = rowData['size'];
																		var subCatName = rowData['subCatName'];
																		
																		var setZero = 0;
																		
																		if(gst == "")
																		{
																			gst = 0;
																			//var setZero = 0;
																			$("#jqGrid").jqGrid("setCell",rowId,"gst",setZero);
																		}
																		if(igst == "")
																		{
																			igst = 0;
																			//var setZero = 0;
																			$("#jqGrid").jqGrid("setCell",rowId,"igst",setZero);
																		}
																		
																		if(Number(gst) > 0)
																		{
																			//var setZero = 0;
																			igst = 0;
																			$("#jqGrid").jqGrid("setCell",rowId,"igst",setZero);
																		}
																		else
																		{
																			document.getElementById("totalGst").value = 0;
																		}
														
																		if(Number(igst) > 0)
																		{
																			gst = 0;
																			var setZero = 0;
																			$("#jqGrid").jqGrid("setCell",rowId,"gst",setZero);
																		}
																		else
																		{
																			document.getElementById("totalIgst").value = 0;
																		}																		
																		
																		if (unit == "meter"
																			|| unit == "Meter"
																			|| unit == "METER"
																			|| unit == "MTR"
																			|| unit == "mtr"
																			|| unit == "Mtr")
																		{
																			if(rollSize == "0" || rollSize == "" || rollSize == undefined || rollSize == null)
																			{
																				alert("please Enter RollSize For = "+itemName);
																				//return false;
																			}
																		}
																		else
																		{
																			rollSize = 0;
																			var setZero = 0;
																			$("#jqGrid").jqGrid("setCell",rowId,"rollSize",setZero);
																		}
																		
																		/* alert(igst); */
																		var taxamt = rowData['gstamt']
																		var vatAmt = 0;
																		var discount = 0;
																		var tota = 0;
																		var totAmt = 0;
																		var ids = jQuery("#jqGrid").jqGrid('getDataIDs');

																		var purcode = rowData['purcode'];
																		
																		if (qd != "")
																		{
																			// for
																			// quantity
																			// update
																			// after
																			// change
																			// in
																			// qty
																			// diff
																			// in
																			// respect
																			// to
																			// itemname
																			var checkVat = 0;
																			for (var j = 0; j < count1; j++)
																			{
																				var rowId = ids[j];
																				var rowData = jQuery("#jqGrid").getRowData(rowId);
																				var vat = rowData['vat'];
																				if(Number(vat) > 0)
																				{
																					checkVat++;
																				}
																			}
																			if(checkVat > 0)
																			{
																				for (var t = 0; t < count1; t++)
																				{
																					igst = 0;
																					var setZero = 0;
																					$("#jqGrid").jqGrid("setCell",rowId,"igst",setZero);																					
																				}
																			}
																			
																			for (var j = 0; j < count1; j++)
																			{
																				var rowId = ids[j];
																				var rowData = jQuery("#jqGrid").getRowData(rowId);
																				var itemName1 = rowData['itemName'];
																				var catName1 = rowData['catName'];
																				var subCatName1 = rowData['subCatName'];
																				if (itemName1 == itemName && catName1 == catName && subCatName1 == subCatName)
																				{
																					$("#jqGrid").jqGrid("setCell",rowId,"quantity",quantity1);
																				}
																			}
																			

																			// for
																			// buy
																			// price
																			// update
																			// after
																			// change
																			// in
																			// buy
																			// diff
																			// in
																			// respect
																			// to
																			// itemname

																			var initialbuyprice = 0;
																			for (var i = 0; i < count1; i++)
																			{
																				var rowId = ids[i];
																				var rowData = jQuery("#jqGrid").getRowData(rowId);
																				var itemName2 = rowData['itemName'];
																				var catName2 = rowData['catName'];
																				var subCatName2 = rowData['subCatName'];
																				if (itemName2 == itemName && catName2 == catName && subCatName2 == subCatName)
																				{
																					var totalbuyprice = Number(buyPrice2) + Number(initialbuyprice);
																					$("#jqGrid").jqGrid("setCell",rowId,"buyPrice",totalbuyprice);

																					initialbuyprice = Number(initialbuyprice) + Number(buyprice1);
																				}
																			}

																			// for
																			// sale
																			// price
																			// update
																			// after
																			// change
																			// in
																			// sale
																			// diff
																			// in
																			// respect
																			// to
																			// itemname

																			var initialsaleprice = 0;
																			for (var d = 0; d < count1; d++) {
																				var rowId = ids[d];
																				var rowData = jQuery("#jqGrid").getRowData(rowId);
																				var itemName3 = rowData['itemName'];
																				var catName3 = rowData['catName'];
																				var subCatName3 = rowData['subCatName'];
																				if (itemName3 == itemName && catName3 == catName && subCatName3 == subCatName)
																				{
																					var totalsaleprice = Number(actualprice1) + Number(initialsaleprice);
																					$("#jqGrid").jqGrid("setCell",rowId,"actualprice",totalsaleprice);

																					initialsaleprice = Number(initialsaleprice) + Number(salePrice1);
																				}
																			}

																			// for
																			// gst
																			// and
																			// igst
																			// update
																			// after
																			// change
																			// in
																			// gst
																			// and
																			// igst
																			// diff
																			// in
																			// respect
																			// to
																			// itemname
																			
																			

																			for (var p = 0; p < count1; p++)
																			{
																				var rowId = ids[p];
																				var rowData = jQuery("#jqGrid").getRowData(rowId);
																				var itemName4 = rowData['itemName'];
																				var catName4 = rowData['catName'];
																				var subCatName4 = rowData['subCatName'];
																				if (itemName4 == itemName && catName4 == catName && subCatName4 == subCatName)
																				{
																					if (gst != "0" && igst != "0")
																					{
																						var zero = 0;
																						var rowData = jQuery("#jqGrid").getRowData(rowId);
																						$("#jqGrid").jqGrid("setCell",rowId,"igst",zero);
																						$("#jqGrid").jqGrid("setCell",rowId,"vat",zero);
																						alert("Please Enter GST OR IGST");

																					}
																					else
																					{
																						/*
																						 * var
																						 * zero =
																						 * 0;
																						 * var
																						 * rowData =
																						 * jQuery("#jqGrid").getRowData(rowId);
																						 * $("#jqGrid").jqGrid("setCell",
																						 * rowId,
																						 * "vat",
																						 * zero);
																						 */
																						$("#jqGrid").jqGrid("setCell",rowId,"vat",gst);
																						$("#jqGrid").jqGrid("setCell",rowId,"igst",igst);
																					}
																					/*
																					 * $("#jqGrid").jqGrid("setCell",
																					 * rowId,
																					 * "vat",
																					 * gst);
																					 * $("#jqGrid").jqGrid("setCell",
																					 * rowId,
																					 * "igst",
																					 * igst);
																					 */
																				}
																			}

																			// for
																			// discount
																			for (var z = 0; z < count1; z++)
																			{
																				var rowId = ids[z];
																				var rowData = jQuery("#jqGrid").getRowData(rowId);
																				var itemName7 = rowData['itemName'];
																				var catName7 = rowData['catName'];
																				var subCatName7 = rowData['subCatName'];
																				if (itemName7 == itemName && catName7 == catName && subCatName7 == subCatName)
																				{
																					$("#jqGrid").jqGrid("setCell",rowId,"disPer",dis);
																				}
																			}

																			// for
																			// color
																			// update
																			// after
																			// change
																			// in
																			// color
																			// in
																			// respect
																			// to
																			// itemname

																			for (var z = 0; z < count1; z++)
																			{
																				var rowId = ids[z];
																				var rowData = jQuery("#jqGrid").getRowData(rowId);
																				var itemName7 = rowData['itemName'];
																				var catName7 = rowData['catName'];
																				var subCatName7 = rowData['subCatName'];
																				if (itemName7 == itemName && catName7 == catName && subCatName7 == subCatName)
																				{
																					$("#jqGrid").jqGrid("setCell",rowId,"color",color);

																				}
																			}

																			// for
																			// color
																			// update
																			// after
																			// change
																			// in
																			// color
																			// in
																			// respect
																			// to
																			// itemname

																			/*var gst1 = 0;
																			var iGst1 = 0;

																			for (var x = 0; x < count1; x++)
																			{
																				var rowId = ids[x];
																				var rowData = jQuery("#jqGrid").getRowData(rowId);
																				var vat = rowData['vat'];
																				var igst = rowData['igst'];
																				var gstamt1 = rowData['gstamt'];
																				
																				if (Number(vat) > 0)
																				{
																					gst1 = +gst1 + +gstamt1;
																					document.getElementById("totalGst").value = gst1.toFixed(2);
																				}
																				else
																				{
																					var setZero = 0.00;
																					document.getElementById("totalGst").value = setZero;
																				}
																				if (Number(igst) > 0)
																				{
																					iGst1 = +iGst1 + +gstamt1;
																					document.getElementById("totalIgst").value = iGst1.toFixed(2);
																				}
																				else
																				{
																					var setZero = 0.00;
																					document.getElementById("totalIgst").value = setZero;
																				}
																			}*/

																			// for
																			// calculation
																			// of
																			// gst
																			// and
																			// total
																			// after
																			// change
																			// in
																			// quantity
																			// and
																			// buy
																			// price
																			// in
																			// resp
																			// to
																			// itemname
																			// to
																			// display
																			// gst
																			// total
																			// and
																			// igst
																			// total

																			/*
																			 * var
																			 * TotalGst =
																			 * document.getElementById("totalGst").value;
																			 * var
																			 * TotalIgst =
																			 * document.getElementById("totalIgst").value;
																			 */

																			var TotalGst = 0;
																			var TotalIgst = 0;

																			for (var r = 0; r < count1; r++)
																			{
																				var rowId = ids[r];
																				var rowData = jQuery("#jqGrid").getRowData(rowId);

																				var itemName5 = rowData['itemName'];
																				var catName5 = rowData['catName'];
																				var subCatName5 = rowData['subCatName'];
																				var vat = rowData['vat'];
																				var igst = rowData['igst'];

																				if (itemName5 == itemName && catName5 == catName && subCatName5 == subCatName)
																				{
																					var buyPrice = rowData['buyPrice'];
																					var quantity = rowData['quantity'];
																					
																					if (unit == "meter"
																						|| unit == "Meter"
																						|| unit == "METER"
																						|| unit == "MTR"
																						|| unit == "mtr"
																						|| unit == "Mtr")
																					{
																						tota = (quantity * rollSize) * buyPrice;
																						totAmt = (quantity * rollSize) * buyPrice;
																					}else
																					{
																						tota = quantity * buyPrice;
																						totAmt = quantity * buyPrice;
																					}
																					
																					/*tota = quantity * buyPrice;
																					totAmt = quantity * buyPrice;*/
																					if (dis != "0")
																					{//																							discount = ((tota * dis) / 100);
																						discount = ((tota * dis) / 100);
																						tota = +tota - +discount;
																						totAmt = +tota;
																					}
																					var itemName9 = rowData['itemName'];
																					var catName9 = rowData['catName'];
																					var subCatName9 = rowData['subCatName'];
																					if (itemName9 == itemName && catName9 == catName && subCatName9 == subCatName)
																					{
																						if (gst > 0)
																						{
																							vatAmt = ((tota * (gst)) / 100).toFixed(2);
																							totAmt = +tota + +vatAmt;
																							TotalGst = +TotalGst + +vatAmt;
																						}
																					}
																					if (itemName9 == itemName && catName9 == catName)
																					{
																						if (igst > 0)
																						{
																							vatAmt = ((tota * igst) / 100).toFixed(2);
																							totAmt = +tota + +vatAmt;
																							TotalIgst = +TotalIgst + +vatAmt;
																						}
																					}

																					var itemName6 = rowData['itemName'];
																					var catName9 = rowData['catName'];
																					var subCatName9 = rowData['subCatName'];
																					//vatAmt = vatAmt.toFixed(2);
																					if (itemName6 == itemName && catName9 == catName && subCatName9 == subCatName)
																					{
																						$("#jqGrid").jqGrid("setCell",rowId,"gstamt",vatAmt);
																						$("#jqGrid").jqGrid("setCell",rowId,"Total",totAmt);
																					}
																				}
																			}																			
																			
																			var gst1 = 0;
																			var iGst1 = 0;
																			
																			for (var x = 0; x < count1; x++)
																			{
																				var rowId = ids[x];
																				var rowData = jQuery("#jqGrid").getRowData(rowId);
																				var vat = rowData['vat'];
																				var igst = rowData['igst'];
																				var gstamt1 = rowData['gstamt'];
																				
																				if (Number(vat) > 0)
																				{
																					gst1 = +gst1 + +gstamt1;
																					document.getElementById("totalGst").value = gst1.toFixed(2);
																				}
																				/*else
																				{
																					var setZero = 0.00;
																					document.getElementById("totalGst").value = setZero;
																				}*/
																				if (Number(igst) > 0)
																				{
																					iGst1 = +iGst1 + +gstamt1;
																					document.getElementById("totalIgst").value = iGst1.toFixed(2);
																				}
																				/*else
																				{
																					var setZero = 0.00;
																					document.getElementById("totalIgst").value = setZero;
																				}*/
																			}
																		}
																		var Total = 0;
																		var TotalQuantity = 0;
																		var TotalGst = 0;
																		var TotalIgst = 0;

																		var count2 = jQuery("#jqGrid").jqGrid('getGridParam','records');
																		var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
																		var AllRows = JSON
																				.stringify(allRowsInGrid1);
																		for (var k = 0; k < count2; k++)
																		{
																			var Total1 = allRowsInGrid1[k].Total;
																			if (Total1 != undefined)
																			{
																				Total = +Total + +Total1;
																			}
																		}

																		for (var n = 0; n < count2; n++)
																		{
																			var TotalQuantity1 = allRowsInGrid1[n].quantity;
																			if (Total1 != undefined)
																			{
																				TotalQuantity = +TotalQuantity + +TotalQuantity1;
																			}
																		}

																		document.getElementById("resolution").value = Total.toFixed(2);
																		document.getElementById("resolution1").value = Total.toFixed(2);
																		document.getElementById("totalQuantity").value = TotalQuantity;

																		var totAmount = Total.toFixed(2);

																		/*var extraDiscount = document.getElementById("extraDiscount").value;
																		if (extraDiscount != "0")
																		{
																			document.getElementById("resolution").value = totAmount;
																		}
																		else
																		{
																			var disAmount = (extraDiscount / 100) * totAmount;
																			var gross = +totAmount - +disAmount;
																			document.getElementById("resolution").value = gross.toFixed(2);
																		}*/

																		var expence = document.getElementById("expence").value;
																		if (expence != "0")
																		{
																			document.getElementById("resolution").value = totAmount;
																		}
																		else
																		{
																			document.getElementById("resolution").value = (+totAmount + +expence);
																		}
																	},
																	pager : "#jqGridPager",
																});

												var lastSelection;

												function editRow(id)
												{
													if (id && id !== lastSelection)
													{
														var grid = $("#jqGrid");
														grid.jqGrid('restoreRow',lastSelection);
														grid.jqGrid('editRow',id,
																{
																	keys : true
																});
														lastSelection = id;
													}
												}

												if (count == 0 || count == null)
												{
													$("#jqGrid").addRowData(0,jsonData.offer);
												}

												$('#jqGrid')
														.navGrid(
																'#jqGridPager',
																// the buttons
																// to appear on
																// the toolbar
																// of the grid
																{
																	edit : true,
																	add : false,
																	del : true,
																	search : true,
																	refresh : false,
																	view : true,
																	position : "left",
																	cloneToTop : false
																},
																// options for
																// the Edit
																// Dialog
																{
																	editCaption : "The Edit Dialog",
																	reloadAfterSubmit : true,
																	closeAfterEdit : true,
																	recreateForm : true,
																	errorTextFormat : function(
																			data) {
																		return 'Error: '
																				+ data.responseText
																	}
																},

																{},

																{
																	errorTextFormat : function(data)
																	{
																		return 'Error: ' + data.responseText
																	},
																	afterComplete : function()
																	{
																		document.getElementById('expence').value = 0;
																		document.getElementById('extraDiscount').value = 0;
																		
																		$('#jqGrid').trigger('reloadGrid');

																		var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
																		var rowData = jQuery("#jqGrid").getRowData(rowId);
																		var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
																		var color = rowData['color'];
																		var itemName = rowData['itemName'];
																		var quantity1 = rowData['qtydiff'];
																		var quantity = rowData['quantity'];
																		var buyPrice = rowData['buyPrice'];
																		var buyprice1 = rowData['buydiff'];
																		var buyPrice2 = rowData['buyPrice'];
																		var disPer = rowData['disPer'];
																		var actualprice = rowData['actualprice'];
																		var actualprice1 = rowData['actualprice'];
																		var salePrice1 = rowData['salediff'];
																		var gst = rowData['vat'];
																		var igst = rowData['igst'];
																		var taxamt = rowData['gstamt']
																		var vatAmt = 0;
																		var discount = 0;
																		var tota = 0;
																		var totAmt = 0;
																		var ids = jQuery("#jqGrid").jqGrid('getDataIDs');

																		// for
																		// calculation
																		// of
																		// gst
																		// and
																		// total
																		// after
																		// change
																		// in
																		// quantity
																		// and
																		// buy
																		// price
																		// in
																		// resp
																		// to
																		// itemname
																		// to
																		// display
																		// gst
																		// total
																		// and
																		// igst
																		// total

																		var TotalGst = 0;
																		var TotalIgst = 0;
																		var totAmt  =0;
																		for (var r = 0; r < count; r++)
																		{
																			var rowId = ids[r];
																			var rowData = jQuery("#jqGrid").getRowData(rowId);

																			var itemName5 = rowData['itemName'];
																			if (itemName5 == itemName)
																			{
																				var buyPrice = rowData['buyPrice'];
																				
																				if(unit == "meter"
																					   || unit == "Meter"
																					   || unit == "METER"
																					   || unit == "MTR"
																					   || unit == "mtr"
																					   || unit == "Mtr")
																					{
																						tota = (quantity * rollSize) * buyPrice;
																						totAmt = (quantity * rollSize) * buyPrice;
																					}
																					else
																					{
																						tota = quantity * buyPrice;
																						totAmt = quantity * buyPrice;
																					}
																				if (disPer != "0")
																				{
																					discount = ((tota * disPer) / 100);
																					tota = +tota - +discount;
																					totAmt = +tota;
																				}
																				if (gst != "0")
																				{
																					vatAmt = ((tota * (gst)) / 100);
																					totAmt = +tota + +vatAmt;
																					TotalGst = +TotalGst + +vatAmt;
																					document.getElementById("totalGst").value = TotalGst.toFixed(2);
																				}
																				if (igst != "0")
																				{
																					vatAmt = ((tota * igst) / 100);
																					totAmt = +tota + +vatAmt;
																					TotalIgst = +TotalIgst + +vatAmt;
																					document.getElementById("totalIgst").value = TotalIgst.toFixed(2);
																				}
																				var itemName6 = rowData['itemName'];
																				if (itemName6 == itemName) {
																					$("#jqGrid").jqGrid("setCell",rowId,"gstamt",vatAmt);
																					$("#jqGrid").jqGrid("setCell",rowId,"Total",totAmt);
																				}
																			}
																		}
																		var gst1 = 0;
																		var iGst1 = 0;

																		for (var x = 0; x < count; x++)
																		{
																			var rowId = ids[x];
																			var rowData = jQuery("#jqGrid").getRowData(rowId);
																			var vat = rowData['vat'];
																			var igst = rowData['igst'];
																			var gstamt1 = rowData['gstamt'];
																			if (vat != "0")
																			{
																				gst1 = +gst1 + +gstamt1;
																				document.getElementById("totalGst").value = gst1.toFixed(2);
																			}
																			if (igst != "0")
																			{
																				iGst1 = +iGst1 + +gstamt1;
																				document.getElementById("totalIgst").value = iGst1.toFixed(2);
																			}

																		}
																		var Total = 0;
																		var TotalQuantity = 0;
																		var TotalGst = 0;
																		var TotalIgst = 0;
																		var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
																		var AllRows = JSON.stringify(allRowsInGrid1);
																		for (var k = 0; k < count; k++) {
																			var Total1 = allRowsInGrid1[k].Total;
																			if (Total1 != undefined) {
																				Total = +Total
																						+ +Total1;
																			}
																		}

																		for (var n = 0; n < count; n++) {
																			var TotalQuantity1 = allRowsInGrid1[n].quantity;
																			if (Total1 != undefined) {
																				TotalQuantity = +TotalQuantity
																						+ +TotalQuantity1;
																			}
																		}

																		document.getElementById("resolution").value = Total.toFixed(2);
																		document.getElementById("resolution1").value = Total.toFixed(2);
																		document.getElementById("totalQuantity").value = TotalQuantity;

																		var totAmount = Total.toFixed(2);

																		var extraDiscount = document.getElementById("extraDiscount").value;
																		if (extraDiscount != "0")
																		{
																			document.getElementById("resolution").value = totAmount;
																		}
																		else
																		{
																			var disAmount = (extraDiscount / 100) * totAmount;
																			var gross = +totAmount - +disAmount;
																			document.getElementById("resolution").value = gross.toFixed(2);
																		}

																		var expence = document.getElementById("expence").value;
																		if (expence != "0")
																		{
																			document.getElementById("resolution").value = totAmount;
																		}
																		else
																		{
																			document.getElementById("resolution").value = (+totAmount + +expence);
																		}
																	},
																	onSelectRow : function(id)
																	{
																		if (id && id !== lastSel) {
																			jQuery("#jqGrid").saveRow(lastSel,true,'clientArray');
																			jQuery("#jqGrid").editRow(id,true);
																			lastSel = id;
																			console.log(id);
																		}
																	}
																});
											})
									.error(
											function(jqXHR, textStatus,
													errorThrown) {
												if (textStatus === "timeout") {
													$(loaderObj).hide();
													$(loaderObj).find(
															'#errorDiv').show();
												}
											})
						});
//	}

/*	if (document.getElementById('nogst').checked) {

		var input = document.getElementById('itemName'), list = document
				.getElementById('itemId_drop'), i, catName, itemName, hsnsacno, productId, size;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				catName = list.options[i].getAttribute('data-value');
				itemName = list.options[i].getAttribute('myvalue');
				subcatId = list.options[i].getAttribute('myvalue1');
				productId = list.options[i].getAttribute('myvalue2');
				size = list.options[i].getAttribute('myvalue4');
				fkCatId = list.options[i].getAttribute('myvalue5');
			}
		}

		itemparams = {};

		itemparams["itemName"] = itemName;
		itemparams["catName"] = catName;
		itemparams["productId"] = productId;
		itemparams["size"] = size;
		itemparams["fkCatId"] = fkCatId;
		itemparams["subcatId"] = subcatId;

		document.getElementById('itemName').value = null;
		var count = 0;
		var newrow;
		var rowId;
		itemparams["methodName"] = "getProductInGrid";
		$
				.post(
						'/SMT/jsp/utility/controller.jsp',
						itemparams,
						function(data) {
							var jsonData = $.parseJSON(data);
							$
									.each(
											jsonData,
											function(i, v) {
												count = jQuery("#jqGrid")
														.jqGrid('getGridParam',
																'records');
												var rowdata = $("#jqGrid")
														.jqGrid('getGridParam',
																'data');
												var ids = jQuery("#jqGrid")
														.jqGrid('getDataIDs');

												var ori_quantity, offerId;
												for (var j = 0; j < count; j++) {
													offerId = rowdata[j].itemName;

													var rowId = ids[j];
													var rowData = jQuery(
															'#jqGrid')
															.jqGrid(
																	'getRowData',
																	rowId);

													if (offerId == jsonData.offer.itemName) {
														ori_quantity = +rowdata[j].quantity + 1;

														$("#jqGrid").jqGrid(
																"setCell",
																rowId,
																"quantity",
																ori_quantity);
														var grid = jQuery("#jqGrid");
														grid
																.trigger("reloadGrid");
														newrow = false;
														break;
													} else {
														newrow = true;
													}
												}
												var prodName, com;
												for (var z = 0; z < count; z++) {
													prodName = rowdata[z].itemName;
													com = rowdata[z].catName;

													var rowId = ids[z];
													var rowData = jQuery(
															'#jqGrid')
															.jqGrid(
																	'getRowData',
																	rowId);

													/*
													 * if (prodName == itemName &&
													 * com == catName) {
													 * 
													 * newrow=false; alert("Item
													 * Already Inserted !!!");
													 * var grid =
													 * jQuery("#jqGrid");
													 * grid.trigger("reloadGrid");
													 * break; } else {
													 */
/*													newrow = true;
													/* } */
/*												}
												if (newrow == true) {
													$("#jqGrid").addRowData(
															count,
															jsonData.offer);
												}
												$("#jqGrid")
														.jqGrid(
																{
																	datatype : "local",
																	editurl : 'clientArray',
																	colNames : [
																			"ProductId",
																			"ItemName",
																			"Category Name",
																			"HSN/SAC",
																			"Color",
																			"Size",
																			"Quantity",
																			"BuyPrice",
																			"Sale Price",
																			"Discount %",
																			"Total",
																			"Qty Diff",
																			"Buy Diff",
																			"Sale Diff" ],

																	colModel : [
																			{
																				name : "productId",// PARTICULARS
																				width : 20,
																				hidden : true,
																			},
																			{
																				name : "itemName",// PARTICULARS
																				width : 10,
																			},

																			{
																				name : "catName",
																				width : 10,
																			},
																			{
																				name : "hsnsacno",
																				width : 10,
																			},
																			{
																				name : "color",
																				width : 10,
																				editable : true,
																			},
																			{
																				name : "size",
																				width : 10,
																				editable : true,
																			},

																			{
																				name : "quantity",
																				width : 10,
																				required : true
																			},

																			{
																				name : "buyPrice",
																				width : 10,
																				editable : true,
																			},
																			{
																				name : "actualprice",
																				width : 10,
																				editable : true,
																			},
																			{
																				name : "salePrice",
																				width : 10,
																				editable : true,
																			},

																			{
																				name : "Total",
																				width : 10,
																				formatter : 'number',
																			},

																			{
																				name : "qtydiff",
																				width : 10,
																				editable : true,
																				edittype : "select",
																				editoptions : {
																					value : "1:1;2:2;3:3;4:4;5:5;6:6;7:7"
																				}
																			},
																			{
																				name : "buydiff",
																				width : 10,
																				editable : true,
																				edittype : "select",
																				editoptions : {
																					value : "0:0;1:1;2:2;3:3;4:4;5:5;6:6;7:7;8:8;9:9;10:10;11:11;12:12;13:13;14:14;15:15;16:16;17:17;18:18;19:19;20:20"
																				}
																			},
																			{
																				name : "salediff",
																				width : 10,
																				editable : true,
																				edittype : "select",
																				editoptions : {
																					value : "0:0;1:1;2:2;3:3;4:4;5:5;6:6;7:7;8:8;9:9;10:10;11:11;12:12;13:13;14:14;15:15;16:16;17:17;18:18;19:19;20:20"
																				}
																			} ],
																	sortorder : 'desc',
																	multiselect : false,
																	loadonce : false,
																	viewrecords : true,
																	width : 2000,
																	shrinkToFit : true,
																	rowheight : 300,
																	rownumbers : true,
																	onSelectRow : editRow,
																	rowNum : 11,

																	'cellEdit' : true,
																	afterSaveCell : function() {
																		var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
																		var rowData = jQuery("#jqGrid").getRowData(rowId);
																		var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
																		var color = rowData['color'];
																		var itemName = rowData['itemName'];
																		var quantity1 = rowData['qtydiff'];
																		var quantity = rowData['quantity'];
																		var buyPrice = rowData['buyPrice'];
																		var buyprice1 = rowData['buydiff'];
																		var buyPrice2 = rowData['buyPrice'];
																		var salePrice = rowData['salePrice'];
																		var actualprice = rowData['actualprice'];
																		var actualprice1 = rowData['actualprice'];
																		var salePrice1 = rowData['salediff'];
																		var vatAmt = 0;
																		var discount = 0;
																		var tota = 0;
																		var totAmt = 0;
																		var ids = jQuery("#jqGrid").jqGrid('getDataIDs');

																		// for
																		// quantity
																		// update
																		// after
																		// change
																		// in
																		// qty
																		// diff
																		// in
																		// respect
																		// to
																		// itemname

																		for (var j = 0; j < count1; j++) {
																			var rowId = ids[j];
																			var rowData = jQuery("#jqGrid").getRowData(rowId);
																			var itemName1 = rowData['itemName'];
																			if (itemName1 == itemName)
																			{
																				$("#jqGrid").jqGrid("setCell",rowId,"quantity",quantity1);
																			}
																		}

																		// for
																		// buy
																		// price
																		// update
																		// after
																		// change
																		// in
																		// buy
																		// diff
																		// in
																		// respect
																		// to
																		// itemname

																		var initialbuyprice = 0;
																		for (var i = 0; i < count1; i++) {
																			var rowId = ids[i];
																			var rowData = jQuery("#jqGrid").getRowData(rowId);
																			var itemName2 = rowData['itemName'];
																			if (itemName2 == itemName) {
																				var totalbuyprice = Number(buyPrice2) + Number(initialbuyprice);
																				$("#jqGrid").jqGrid("setCell",rowId,"buyPrice",totalbuyprice);
																				initialbuyprice = Number(initialbuyprice) + Number(buyprice1);

																			}
																		}

																		// for
																		// sale
																		// price
																		// update
																		// after
																		// change
																		// in
																		// sale
																		// diff
																		// in
																		// respect
																		// to
																		// itemname

																		var initialsaleprice = 0;
																		for (var d = 0; d < count1; d++) {
																			var rowId = ids[d];
																			var rowData = jQuery("#jqGrid").getRowData(rowId);
																			var itemName3 = rowData['itemName'];
																			if (itemName3 == itemName) {
																				var totalsaleprice = Number(actualprice1) + Number(initialsaleprice);
																				$("#jqGrid").jqGrid("setCell",rowId,"actualprice",totalsaleprice);
																				initialsaleprice = Number(initialsaleprice) + Number(salePrice1);
																			}
																		}

																		// for
																		// color
																		// update
																		// after
																		// change
																		// in
																		// color
																		// in
																		// respect
																		// to
																		// itemname

																		for (var z = 0; z < count1; z++) {
																			var rowId = ids[z];
																			var rowData = jQuery("#jqGrid").getRowData(rowId);
																			var itemName7 = rowData['itemName'];
																			if (itemName7 == itemName) {
																				$("#jqGrid").jqGrid("setCell",rowId,"color",color);

																			}
																		}

																		// for
																		// calculation
																		// of
																		// gst
																		// and
																		// total
																		// after
																		// change
																		// in
																		// quantity
																		// and
																		// buy
																		// price
																		// in
																		// resp
																		// to
																		// itemname
																		// to
																		// display
																		// gst
																		// total
																		// and
																		// igst
																		// total

																		var TotalGst = 0;
																		var TotalIgst = 0;

																		for (var r = 0; r < count1; r++) {
																			var rowId = ids[r];
																			var rowData = jQuery("#jqGrid").getRowData(rowId);

																			var itemName5 = rowData['itemName'];
																			if (itemName5 == itemName) {
																				var buyPrice = rowData['buyPrice'];
																				tota = quantity * buyPrice;
																				totAmt = quantity * buyPrice;
																				if (salePrice != "0") {
																					discount = ((tota * salePrice) / 100);
																					tota = +tota - +discount;
																					totAmt = +tota;
																				}

																				var itemName6 = rowData['itemName'];
																				if (itemName6 == itemName)
																				{
																					$("#jqGrid").jqGrid("setCell",rowId,"Total",totAmt);
																				}
																			}
																		}
																		var Total = 0;
																		var TotalQuantity = 0;
																		var TotalGst = 0;
																		var TotalIgst = 0;

																		var count2 = jQuery("#jqGrid").jqGrid('getGridParam','records');
																		var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
																		var AllRows = JSON.stringify(allRowsInGrid1);
																		for (var k = 0; k < count2; k++) {
																			var Total1 = allRowsInGrid1[k].Total;
																			if (Total1 != undefined) {
																				Total = +Total + +Total1;
																			}
																		}
																		for (var n = 0; n < count2; n++) {
																			var TotalQuantity1 = allRowsInGrid1[n].quantity;
																			if (Total1 != undefined) {
																				TotalQuantity = +TotalQuantity + +TotalQuantity1;
																			}
																		}
																		document.getElementById("resolution").value = Total.toFixed(2);
																		document.getElementById("resolution1").value = Total.toFixed(2);
																		document.getElementById("totalQuantity").value = TotalQuantity;
																		var totAmount = Total.toFixed(2);

																		var extraDiscount = document.getElementById("extraDiscount").value;
																		if (extraDiscount != "0") {
																			document.getElementById("resolution").value = totAmount;
																		} else {
																			var disAmount = (extraDiscount / 100) * totAmount;
																			var gross = +totAmount - +disAmount;
																			document.getElementById("resolution").value = gross.toFixed(2);
																		}

																		var expence = document.getElementById("expence").value;
																		if (expence != "0") {
																			document.getElementById("resolution").value = totAmount;
																		} else {
																			document.getElementById("resolution").value = (+totAmount + +expence);
																		}
																	},
																	pager : "#jqGridPager",
																});
												var lastSelection;
												function editRow(id) {
													if (id
															&& id !== lastSelection) {
														var grid = $("#jqGrid");
														grid.jqGrid(
																'restoreRow',
																lastSelection);
														grid.jqGrid('editRow',
																id, {
																	keys : true
																});
														lastSelection = id;
													}
												}

												if (count == 0 || count == null) {
													$("#jqGrid").addRowData(0,
															jsonData.offer);
												}

												$('#jqGrid')
														.navGrid(
																'#jqGridPager',
																// the buttons
																// to appear on
																// the toolbar
																// of the grid
																{
																	edit : true,
																	add : false,
																	del : true,
																	search : true,
																	refresh : false,
																	view : true,
																	position : "left",
																	cloneToTop : false
																},
																// options for
																// the Edit
																// Dialog
																{
																	editCaption : "The Edit Dialog",
																	reloadAfterSubmit : true,
																	closeAfterEdit : true,
																	recreateForm : true,
																	errorTextFormat : function(
																			data) {
																		return 'Error: '
																				+ data.responseText
																	}
																},

																{},

																{
																	closeAfterdel : true,
																	recreateForm : true,
																	afterComplete : function() {
																		$('#jqGrid').trigger('reloadGrid');

																		var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
																		var rowData = jQuery("#jqGrid").getRowData(rowId);
																		var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
																		var color = rowData['color'];
																		var itemName = rowData['itemName'];
																		var quantity1 = rowData['qtydiff'];
																		var quantity = rowData['quantity'];
																		var buyPrice = rowData['buyPrice'];
																		var buyprice1 = rowData['buydiff'];
																		var buyPrice2 = rowData['buyPrice'];
																		var salePrice = rowData['salePrice'];
																		var actualprice = rowData['actualprice'];
																		var actualprice1 = rowData['actualprice'];
																		var salePrice1 = rowData['salediff'];
																		var gst = rowData['vat'];
																		var igst = rowData['igst'];
																		var taxamt = rowData['gstamt']
																		var vatAmt = 0;
																		var discount = 0;
																		var tota = 0;
																		var totAmt = 0;
																		var ids = jQuery("#jqGrid").jqGrid('getDataIDs');

																		// for
																		// calculation
																		// of
																		// gst
																		// and
																		// total
																		// after
																		// change
																		// in
																		// quantity
																		// and
																		// buy
																		// price
																		// in
																		// resp
																		// to
																		// itemname
																		// to
																		// display
																		// gst
																		// total
																		// and
																		// igst
																		// total

																		var TotalGst = 0;
																		var TotalIgst = 0;
																		var count1 = count4 - 1;
																		for (var r = 0; r < count; r++) {
																			var rowId = ids[r];
																			var rowData = jQuery("#jqGrid").getRowData(rowId);

																			var itemName5 = rowData['itemName'];
																			if (itemName5 == itemName)
																			{
																				var buyPrice = rowData['buyPrice'];
																				tota = quantity * buyPrice;
																				totAmt = quantity * buyPrice;
																				if (salePrice != "0")
																				{
																					discount = ((tota * salePrice) / 100);
																					tota = +tota - +discount;
																					totAmt = +tota;
																				}

																				var itemName6 = rowData['itemName'];
																				if (itemName6 == itemName)
																				{
																					$("#jqGrid").jqGrid("setCell",rowId,"Total",totAmt);
																				}
																			}
																		}

																		var Total = 0;
																		var TotalQuantity = 0;
																		var TotalGst = 0;
																		var TotalIgst = 0;

																		var count2 = jQuery("#jqGrid").jqGrid('getGridParam','records');
																		var count3 = count2 - 1;
																		var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
																		var AllRows = JSON.stringify(allRowsInGrid1);
																		for (var k = 0; k < count; k++)
																		{
																			var Total1 = allRowsInGrid1[k].Total;
																			if (Total1 != undefined)
																			{
																				Total = +Total + +Total1;
																			}
																		}

																		for (var n = 0; n < count; n++)
																		{
																			var TotalQuantity1 = allRowsInGrid1[n].quantity;
																			if (Total1 != undefined)
																			{
																				TotalQuantity = +TotalQuantity + +TotalQuantity1;
																			}
																		}

																		document.getElementById("resolution").value = Total.toFixed(2);
																		document.getElementById("resolution1").value = Total.toFixed(2);
																		document.getElementById("totalQuantity").value = TotalQuantity;

																		var totAmount = Total.toFixed(2);

																		var extraDiscount = document.getElementById("extraDiscount").value;
																		if (extraDiscount != "0") {
																			document.getElementById("resolution").value = totAmount;
																		} else {
																			var disAmount = (extraDiscount / 100) * totAmount;
																			var gross = +totAmount - +disAmount;
																			document.getElementById("resolution").value = gross.toFixed(2);
																		}

																		var expence = document.getElementById("expence").value;
																		if (expence != "0") {
																			document.getElementById("resolution").value = totAmount;
																		} else {
																			document.getElementById("resolution").value = (+totAmount + +expence);
																		}
																	},
																	errorTextFormat : function(data)
																	{
																		return 'Error: '+ data.responseText
																	},
																	onSelectRow : function(id)
																	{
																		if (id && id !== lastSel) {
																			jQuery("#jqGrid").saveRow(lastSel,true,'clientArray');
																			jQuery("#jqGrid").editRow(id,true);
																			lastSel = id;
																			console.log(id);
																		}
																	}
																});
											})
									.error(
											function(jqXHR, textStatus,
													errorThrown) {
												if (textStatus === "timeout") {
													$(loaderObj).hide();
													$(loaderObj).find(
															'#errorDiv').show();
												}
											})
						});
	}*/
}

function getProductList1()
{
//	if (document.getElementById('gst').checked)
//	{
		/*var supplier = document.getElementById('supplierId').value;
		if(supplier == null || supplier == undefined || supplier == "" || supplier == " ")
		{
			document.getElementById('itemName').value = null;
			myAlert("Please Select Supplier");
			return false;
		}
	*/
		var input = document.getElementById('itemName'), list = document
				.getElementById('itemId_drop'), i, catName, itemName, hsnsacno, productId, size;
		for (i = 0; i < list.options.length; ++i)
		{
			if (list.options[i].value === input.value) {
				catName = list.options[i].getAttribute('data-value');
				itemName = list.options[i].getAttribute('myvalue');
				subcatId = list.options[i].getAttribute('myvalue1');
				productId = list.options[i].getAttribute('myvalue2');
				size = list.options[i].getAttribute('myvalue4');
				fkCatId = list.options[i].getAttribute('myvalue5');
			}
		}

		itemparams = {};

		itemparams["itemName"] = itemName;
		itemparams["catName"] = catName;
		itemparams["productId"] = productId;
		itemparams["size"] = size;
		itemparams["fkCatId"] = fkCatId;
		itemparams["subcatId"] = subcatId;

		document.getElementById('itemName').value = null;
		var count = 0;
		var newrow;
		var rowId;
		itemparams["methodName"] = "getProductInGrid";
		$.post('/SMT/jsp/utility/controller.jsp',itemparams,function(data)
		{
			var jsonData = $.parseJSON(data);
							$.each(jsonData, function(i, v){
												count = jQuery("#jqGrid").jqGrid('getGridParam','records');
												var rowdata = $("#jqGrid")
														.jqGrid('getGridParam',
																'data');
												var ids = jQuery("#jqGrid")
														.jqGrid('getDataIDs');

												var ori_quantity, offerId;
												for (var j = 0; j < count; j++) {
													offerId = rowdata[j].itemName;

													var rowId = ids[j];
													var rowData = jQuery(
															'#jqGrid')
															.jqGrid(
																	'getRowData',
																	rowId);

													if (offerId == jsonData.offer.itemName) {
														ori_quantity = +rowdata[j].quantity + 1;

														$("#jqGrid").jqGrid(
																"setCell",
																rowId,
																"quantity",
																ori_quantity);
														var grid = jQuery("#jqGrid");
														grid
																.trigger("reloadGrid");
														newrow = false;
														break;
													} else {
														newrow = true;
													}
												}

												var prodName, com;
												for (var j = 0; j < count; j++) {
													prodName = rowdata[j].itemName;
													com = rowdata[j].catName;

													var rowId = ids[j];
													var rowData = jQuery(
															'#jqGrid')
															.jqGrid(
																	'getRowData',
																	rowId);
													/*
													 * if (prodName == itemName &&
													 * com == catName) {
													 * newrow=false; alert("Item
													 * Already Inserted !!!");
													 * var grid =
													 * jQuery("#jqGrid");
													 * grid.trigger("reloadGrid");
													 * break; } else {
													 */
													newrow = true;
													/* } */
												}
												if (newrow == true) {
													$("#jqGrid").addRowData(
															count,
															jsonData.offer);
												}

												$("#jqGrid")
														.jqGrid(
																{
																	datatype : "local",
																	editurl : 'clientArray',
																	colNames : [
																			"ProductId",
																			"ItemName",
																			"Category Name",
																			"Category Id",
																			"Sub Category Name",
																			"subCatId",
																			"HSN/SAC",
																			"Color",
																			"Roll Size",
																			"Size",
																			"SizeFIXED",
																			"Style",
																			"Quantity",
																			"BuyPrice Ex Tax",
																			"Purchase Code",
																			"Sale Price",
																			"Discount %",
																			"GST %",
																			"IGST %",
																			"TAX AMT",
																			"Total"
																			],
																	colModel : [
																			{
																				name : "productId",// PARTICULARS
																				width : 20,
																				hidden : true,
																			},
																			{
																				name : "itemName",// PARTICULARS
																				width : 10,
																			},
																			{
																				name : "catName",
																				width : 10,
																			},
																			{
																				name : "categoryId",
																				width : 10,
																				hidden : true,
																			},
																			{
																				name : "subCatName",
																				width : 10,
																			},
																			{
																				name : "subCatId",
																				width : 10,
																				hidden : true,
																			},
																			{
																				name : "hsnsacno",
																				width : 10,
																			},
																			{
																				name : "color",
																				width : 10,
																				editable : true,
																			},
																			{
																				id : "rollSize",
																				name : "rollSize",
																				width : 10,
																				editable : true,
																				//hidden : true,
																			},
																			{
																				id : "size",
																				name : "size",
																				width : 10,
																				editable : true,
																			},
																			{
																				id : "sizeFixed",
																				name : "sizeFixed",
																				width : 10,
																				hidden:true,
																			},
																			{
																				id : "style",
																				name : "style",
																				width : 10,
																				editable : true,
																			},
																			{
																				name : "quantity",
																				width : 10,
																				editable : true,
																			},
																			{
																				name : "buyPrice",
																				width : 10,
																				editable : true,
																			},
																			{
																				name : "purcode",
																				width : 15,
																				//editable : true,
																				hidden:true,
																			},
																			{
																				name : "actualprice",
																				width : 10,
																				editable : true,
																			},
																			{
																				name : "disPer",
																				width : 10,
																				editable : true,
																			},
																			{
																				name : "vat",// PARTICULARS
																				width : 10,
																				editable : true,
																			},
																			{
																				name : "igst",// PARTICULARS
																				width : 10,
																				editable : true,
																			},
																			{
																				name : "gstamt",// PARTICULARS
																				width : 10,
																			},
																			{
																				name : "Total",
																				width : 10,
																				formatter : 'number',
																			}
																			 ],
																			
																	sortorder : 'desc',
																	multiselect : false,
																	loadonce : false,
																	viewrecords : true,
																	width : 1850,
																	shrinkToFit : true,
																	rowheight : 300,
																	rownumbers : true,
																	onSelectRow : editRow,
																	rowNum : 11,

																	'cellEdit' : true,																	

																	afterSaveCell : function()
																	{
																		/*var gstRangePer = document.getElementById('gstRangePer').value;
																		var startPrice = document.getElementById('startPrice').value;
																		var endPrice = document.getElementById('endPrice').value;
																		var taxType = document.getElementById('taxType').value;*/
																		
																		//alert("gstRangePer ===> "+gstRangePer+"\nstartPrice ===> "+startPrice+"\nendPrice ====> "+endPrice);
																		
																		var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
																		var rowData = jQuery("#jqGrid").getRowData(rowId);
																		var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
																		var itemName = rowData['itemName'];
																		var quantity = rowData['quantity'];
																		var buyPrice = rowData['buyPrice'];
																		var disPer = rowData['disPer'];
																		var unit = rowData['size'];
																		var checkUnit = unit.toUpperCase(); 
																		var sizeFixed = rowData['sizeFixed'];
																		var rollSize = rowData['rollSize'];
																		var gst = rowData['vat'];
																		var igst = rowData['igst'];																		
																		var subCatId = rowData['subCatId'];
																		var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
																		
																		/*if(buyPrice > 0)
																		{
																			if(Number(endPrice) > 0)
																			{
																				if(taxType == "GST")
																				{
																					if(Number(buyPrice) > Number(startPrice) && Number(buyPrice) <= Number(endPrice))
																					{
																						gst = 5;
																						$("#jqGrid").jqGrid("setCell",rowId,"vat",gst);
																					}
																					else if(Number(buyPrice) > Number(endPrice))
																					{
																						gst = 12;
																						$("#jqGrid").jqGrid("setCell",rowId,"vat",gst);
																					}
																					else
																					{
																						gst = 0;
																						$("#jqGrid").jqGrid("setCell",rowId,"vat",gst);
																					}
																				}
																				if(taxType == "IGST")
																				{
																					if(Number(buyPrice) > Number(startPrice) && Number(buyPrice) <= Number(endPrice))
																					{
																						igst = 5;
																						$("#jqGrid").jqGrid("setCell",rowId,"igst",igst);
																					}
																					else if(Number(buyPrice) > Number(endPrice))
																					{
																						igst = 12;
																						$("#jqGrid").jqGrid("setCell",rowId,"igst",igst);
																					}
																					else
																					{
																						igst = 0;
																						$("#jqGrid").jqGrid("setCell",rowId,"igst",igst);
																					}
																				}
																			}
																			else
																			{
																				gst = 0;
																				igst = 0;
																				$("#jqGrid").jqGrid("setCell",rowId,"vat",gst);
																				$("#jqGrid").jqGrid("setCell",rowId,"igst",igst);
																			}
																		}
																		else
																		{
																			gst = 0;
																			igst = 0;
																			$("#jqGrid").jqGrid("setCell",rowId,"vat",gst);
																			$("#jqGrid").jqGrid("setCell",rowId,"igst",igst);
																		}*/
																		
																		if (sizeFixed == "meter"
																			|| sizeFixed == "Meter"
																			|| sizeFixed == "METER"
																			|| sizeFixed == "MTR"
																			|| sizeFixed == "mtr"
																			|| sizeFixed == "Mtr")
																		{	
																			$("#jqGrid").jqGrid("setCell",rowId,"size",sizeFixed);
																		}
																		
																		if(gst == "")
																		{
																			gst = 0;
																			var setZero = 0;
																			$("#jqGrid").jqGrid("setCell",rowId,"vat",setZero);
																		}
																		if(igst == "")
																		{
																			igst = 0;
																			var setZero = 0;
																			$("#jqGrid").jqGrid("setCell",rowId,"igst",setZero);
																		}
																		
																		if(Number(gst) > 0)
																		{
																			igst = 0;
																			var setZero = 0;
																			$("#jqGrid").jqGrid("setCell",rowId,"igst",setZero);
																		}
																		else
																		{
																			document.getElementById("totalGst").value = 0;
																		}
																		
																		if(Number(igst) > 0)
																		{
																			gst = 0;
																			var setZero = 0;
																			$("#jqGrid").jqGrid("setCell",rowId,"vat",setZero);
																		}
																		else
																		{
																			document.getElementById("totalIgst").value = 0;
																		}																		
																															
																		
																		for (var r = 0; r < count1; r++)
																		{
																			if(gst > 0 )
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
																						alert("Please Ener Either GST OR IGST");
																						$("#jqGrid").jqGrid("setCell",rowId,"vat",setZero);
																						$("#jqGrid").jqGrid("setCell",rowId,"igst",setZero);
																						document.good.btnSubmit.disabled = false;
																						document.good.btnSubmit1.disabled = false;
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
																						alert("Please Ener Either GST OR IGST");
																						$("#jqGrid").jqGrid("setCell",rowId,"vat",setZero);
																						$("#jqGrid").jqGrid("setCell",rowId,"igst",setZero);
																						document.good.btnSubmit.disabled = false;
																						document.good.btnSubmit1.disabled = false;
																						return false;
																					}
																				}
																			}
																			else{}																		
																		}
																		
																		
																		if (unit == "meter"
																			|| unit == "Meter"
																			|| unit == "METER"
																			|| unit == "MTR"
																			|| unit == "mtr"
																			|| unit == "Mtr")
																		{
																			if(rollSize == "0" || rollSize == "" || rollSize == undefined || rollSize == null)
																			{
																				alert("please Enter RollSize For = "+itemName);
																				document.good.btnSubmit.disabled = false;
																				document.good.btnSubmit1.disabled = false;
																				return false;
																			}
																		}
																		else
																		{
																			rollSize = 0;
																			var setZero = 0;
																			$("#jqGrid").jqGrid("setCell",rowId,"rollSize",setZero);
																		}
																		
																		if (rollSize != "0")
																		{
																			rs = rollSize;
																		}
																		else
																		{
																			rs = 1;
																		}

																		/*var gst = rowData['vat'];
																		var igst = rowData['igst'];*/
																		var taxamt = rowData['gstamt']
																		var vatAmt = 0;
																		var discount = 0;
																		var tota = 0;
																		var totAmt = 0;
																		var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
																		var gst1 = 0;
																		var iGst1 = 0;
																		
																		// for
																		// calculation
																		// of
																		// gst
																		// and
																		// total
																		// after
																		// change
																		// in
																		// quantity
																		// and
																		// buy
																		// price
																		// in
																		// resp
																		// to
																		// itemname
																		// to
																		// display
																		// gst
																		// total
																		// and
																		// igst
																		// total
																		
																		var TotalGst = 0;
																		var TotalIgst = 0;

																		for (var r = 0; r < count1; r++)
																		{
																			tota = quantity * rs * buyPrice;
																			totAmt = quantity * rs * buyPrice;
																			// calculation
																			// for
																			// total
																			// roll
																			// calculation
																			// and
																			// price
																			// per
																			// meter
																			if (disPer != "0")
																			{
																				discount = ((tota * disPer) / 100);
																				tota = +tota - +discount;
																				totAmt = +tota;
																			}
																			if (gst > 0)
																			{
																				vatAmt = ((tota * (gst)) / 100).toFixed(2);
																				totAmt = +tota + +vatAmt;
																				TotalGst = +TotalGst + +vatAmt;
																			}
																			if (igst > 0) {
																				vatAmt = ((tota * igst) / 100).toFixed(2);
																				totAmt = +tota + +vatAmt;
																				TotalIgst = +TotalIgst + +vatAmt;
																			}
																			
																			$("#jqGrid").jqGrid("setCell",rowId,"gstamt",vatAmt);
																			$("#jqGrid").jqGrid("setCell",rowId,"Total",totAmt);
																		}

																		for (var x = 0; x < count1; x++)
																		{
																			var rowId = ids[x];
																			var rowData = jQuery("#jqGrid").getRowData(rowId);
																			var vat = rowData['vat'];
																			var igst = rowData['igst'];
																			var gstamt1 = rowData['gstamt'];
																			if (vat > 0)
																			{
																				gst1 = (+gst1 + +gstamt1).toFixed(2);
																				document.getElementById("totalGst").value = gst1;
																			}
																			/*else
																			{
																				document.getElementById("totalGst").value = 0;
																			}*/
																			if (igst > 0)
																			{
																				iGst1 = (+iGst1 + +gstamt1).toFixed(2);
																				document.getElementById("totalIgst").value = iGst1;
																			}
																			/*else
																			{
																				document.getElementById("totalIgst").value = 0;
																			}*/
																		}

																		var Total = 0;
																		var TotalQuantity = 0;
																		var TotalGst = 0;
																		var TotalIgst = 0;

																		var count2 = jQuery("#jqGrid").jqGrid('getGridParam','records');
																		var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
																		var AllRows = JSON.stringify(allRowsInGrid1);
																		for (var k = 0; k < count2; k++)
																		{
																			var Total1 = allRowsInGrid1[k].Total;
																			if (Total1 != undefined) {
																				Total = +Total + +Total1;
																			}
																		}
																		for (var n = 0; n < count2; n++) {
																			var TotalQuantity1 = allRowsInGrid1[n].quantity;
																			if (Total1 != undefined) {
																				TotalQuantity = +TotalQuantity + +TotalQuantity1;
																			}
																		}
																		/*
																		 * document.getElementById("resolution").value =
																		 * Math.round(Total);
																		 */
																		document.getElementById("resolution").value = Total.toFixed(2);
																		/*
																		 * document.getElementById("resolution1").value =
																		 * Math.round(Total);
																		 */
																		document.getElementById("resolution1").value = Total.toFixed(2);
																		document.getElementById("totalQuantity").value = TotalQuantity;
																		var totAmount = Total.toFixed(2);
																		;
																		var extraDiscount = document.getElementById("extraDiscount").value;
																		if (extraDiscount != "0")
																		{
																			document.getElementById("resolution").value = totAmount;
																		}
																		else
																		{
																			var disAmount = (extraDiscount / 100) * totAmount;
																			var gross = +totAmount - +disAmount;
																			document.getElementById("resolution").value = gross.toFixed(2);/*Math.round(gross)*/
																		}

																		var expence = document.getElementById("expence").value;
																		if (expence != "0")
																		{
																			document.getElementById("resolution").value = totAmount;
																		}
																		else
																		{
																			document.getElementById("resolution").value = (+totAmount + +expence);
																		}
																	},

																	pager : "#jqGridPager",
																});

												var lastSelection;

												function editRow(id) {
													if (id
															&& id !== lastSelection) {
														var grid = $("#jqGrid");
														grid.jqGrid('restoreRow',lastSelection);
														grid.jqGrid('editRow',id,
																{
																	keys : true
																});
														lastSelection = id;
													}
												}

												if (count == 0 || count == null) {
													$("#jqGrid").addRowData(0,
															jsonData.offer);
												}

												$('#jqGrid')
														.navGrid(
																'#jqGridPager',
																// the buttons to appear on the toolbar of the grid
																{
																	edit : true,
																	add : false,
																	del : true,
																	search : true,
																	refresh : false,
																	view : true,
																	position : "left",
																	cloneToTop : false
																},
																// options for the Edit Dialog
																{
																	editCaption : "The Edit Dialog",
																	reloadAfterSubmit : true,
																	closeAfterEdit : true,
																	recreateForm : true,
																	errorTextFormat : function(
																			data) {
																		return 'Error: '
																				+ data.responseText
																	}
																},

																{},

																{
																	errorTextFormat : function(data)
																	{
																		return 'Error: '+ data.responseText
																	},
																	afterComplete : function()
																	{
																		$('#jqGrid').trigger('reloadGrid');

																		var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
																		var rowData = jQuery("#jqGrid").getRowData(rowId);
																		var count = jQuery("#jqGrid").jqGrid('getGridParam','records');

																		var itemName = rowData['itemName'];
																		var quantity = rowData['quantity'];
																		var buyPrice = rowData['buyPrice'];
																		var disPer = rowData['disPer'];
																		var gst = rowData['vat'];
																		var igst = rowData['igst'];
																		var taxamt = rowData['gstamt']
																		var vatAmt = 0;
																		var discount = 0;
																		var tota = 0;
																		var totAmt = 0;
																		var ids = jQuery("#jqGrid").jqGrid('getDataIDs');

																		var gst1 = 0;
																		var iGst1 = 0;

																		//for calculation of gst and total after change in quantity and buy price in resp to itemname
																		//to display gst total and igst total
																		var TotalGst = 0;
																		var TotalIgst = 0;
																		var count1 = count - 1;
																		for (var r = 0; r < count; r++) {

																			tota = quantity
																					* buyPrice;
																			totAmt = quantity
																					* buyPrice;
																			if (disPer != "0") {
																				discount = ((tota * disPer) / 100);
																				tota = +tota
																						- +discount;
																				totAmt = +tota;
																			}
																			if (gst != "0") {
																				vatAmt = ((tota * (gst)) / 100);
																				totAmt = +tota
																						+ +vatAmt;
																				TotalGst = +TotalGst
																						+ +vatAmt;

																			}
																			if (igst != "0") {
																				vatAmt = ((tota * igst) / 100);
																				totAmt = +tota
																						+ +vatAmt;
																				TotalIgst = +TotalIgst
																						+ +vatAmt;

																			}
																			$("#jqGrid").jqGrid("setCell",rowId,"gstamt",vatAmt);
																			$("#jqGrid").jqGrid("setCell",rowId,"Total",totAmt);
																		}

																		for (var x = 0; x < count; x++) {
																			var rowId = ids[x];
																			var rowData = jQuery("#jqGrid").getRowData(rowId);
																			var vat = rowData['vat'];
																			var gstamt1 = rowData['gstamt'];
																			if (vat != "0")
																			{
																				gst1 = +gst1 + +gstamt1;
																				document.getElementById("totalGst").value = gst1.toFixed(2);
																			}
																			if (igst != "0")
																			{
																				iGst1 = +iGst1 + +gstamt1;
																				document.getElementById("totalIgst").value = iGst1.toFixed(2);
																			}
																		}
																		var Total = 0;
																		var TotalQuantity = 0;
																		var TotalGst = 0;
																		var TotalIgst = 0;

																		var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
																		var AllRows = JSON.stringify(allRowsInGrid1);
																		var count2 = count - 1;
																		for (var k = 0; k < count; k++) {
																			var Total1 = allRowsInGrid1[k].Total;
																			if (Total1 != undefined) {
																				Total = +Total + +Total1;
																			}
																		}

																		for (var n = 0; n < count; n++) {
																			var TotalQuantity1 = allRowsInGrid1[n].quantity;
																			if (Total1 != undefined) {
																				TotalQuantity = +TotalQuantity + +TotalQuantity1;
																			}
																		}
																		document.getElementById("resolution").value = Total.toFixed(2);
																		document.getElementById("resolution1").value = Total.toFixed(2);
																		document.getElementById("totalQuantity").value = TotalQuantity;
																		var totAmount = Total.toFixed(2);

																		var extraDiscount = document.getElementById("extraDiscount").value;
																		if (extraDiscount != "0")
																		{
																			document.getElementById("resolution").value = totAmount.toFixed(2);
																		}
																		else
																		{
																			var disAmount = (extraDiscount / 100) * totAmount;
																			var gross = +totAmount - +disAmount;
																			document.getElementById("resolution").value = gross.toFixed(2);
																		}

																		var expence = document
																				.getElementById("expence").value;
																		if (expence != "0")
																		{
																			document.getElementById("resolution").value = totAmount.toFixed(2);
																		} else {
																			document.getElementById("resolution").value = (+totAmount + +expence).toFixed(2);
																		}
																	},

																	onSelectRow : function(id)
																	{
																		if (id && id !== lastSel) {
																			jQuery("#jqGrid").saveRow(lastSel,true,'clientArray');
																			jQuery("#jqGrid").editRow(id,true);
																			lastSel = id;
																			console.log(id);
																		}
																	}

																});
											}).error(function(jqXHR, textStatus,
													errorThrown) {
												if (textStatus === "timeout") {
													$(loaderObj).hide();
													$(loaderObj).find(
															'#errorDiv').show();
												}
											})
						});
	//}

/*	if (document.getElementById('nogst').checked)
	{
		var input = document.getElementById('itemName'), list = document
				.getElementById('itemId_drop'), i, catName, itemName, hsnsacno, productId, size;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				catName = list.options[i].getAttribute('data-value');
				itemName = list.options[i].getAttribute('myvalue');
				subcatId = list.options[i].getAttribute('myvalue1');
				productId = list.options[i].getAttribute('myvalue2');
				size = list.options[i].getAttribute('myvalue4');
				fkCatId = list.options[i].getAttribute('myvalue5');
			}
		}

		itemparams = {};

		itemparams["itemName"] = itemName;
		itemparams["catName"] = catName;
		itemparams["productId"] = productId;
		itemparams["size"] = size;
		itemparams["fkCatId"] = fkCatId;
		itemparams["subcatId"] = subcatId;

		document.getElementById('itemName').value = null;
		var count = 0;
		var newrow;
		var rowId;
		itemparams["methodName"] = "getProductInGrid";
		$
				.post(
						'/SMT/jsp/utility/controller.jsp',
						itemparams,
						function(data) {
							var jsonData = $.parseJSON(data);
							$
									.each(
											jsonData,
											function(i, v) {
												count = jQuery("#jqGrid")
														.jqGrid('getGridParam',
																'records');
												var rowdata = $("#jqGrid")
														.jqGrid('getGridParam',
																'data');
												var ids = jQuery("#jqGrid")
														.jqGrid('getDataIDs');

												var ori_quantity, offerId;
												for (var j = 0; j < count; j++) {
													offerId = rowdata[j].itemName;

													var rowId = ids[j];
													var rowData = jQuery(
															'#jqGrid')
															.jqGrid(
																	'getRowData',
																	rowId);

													if (offerId == jsonData.offer.itemName) {
														ori_quantity = +rowdata[j].quantity + 1;

														$("#jqGrid").jqGrid(
																"setCell",
																rowId,
																"quantity",
																ori_quantity);
														var grid = jQuery("#jqGrid");
														grid
																.trigger("reloadGrid");
														newrow = false;
														break;
													} else {
														newrow = true;
													}
												}
												var prodName, com;
												for (var z = 0; z < count; z++) {
													prodName = rowdata[z].itemName;
													com = rowdata[z].catName;

													var rowId = ids[z];
													var rowData = jQuery(
															'#jqGrid')
															.jqGrid(
																	'getRowData',
																	rowId);

													/*if (prodName == itemName && com == catName) {

														newrow=false;
														alert("Item Already Inserted !!!");
														var grid = jQuery("#jqGrid");
														grid.trigger("reloadGrid");
														break;
													}
													else
													{*/
							//						newrow = true;
													/*}*/
											/*	}
												if (newrow == true) {

													$("#jqGrid").addRowData(
															count,
															jsonData.offer);

												}
												$("#jqGrid")
														.jqGrid(
																{
																	datatype : "local",
																	editurl : 'clientArray',
																	colNames : [
																			"ProductId",
																			"ItemName",
																			"Category Name",
																			"HSN/SAC",
																			"Color",
																			"Size",
																			"Quantity",
																			"Roll Size",
																			"BuyPrice",
																			"Purchase Code",
																			"Sale Price",
																			"Discount %",
																			"Total" ],

																	colModel : [
																			{
																				name : "productId",//PARTICULARS
																				width : 20,
																				hidden : true,

																			},
																			{
																				name : "itemName",//PARTICULARS
																				width : 10,

																			},

																			{
																				name : "catName",
																				width : 10,

																			},
																			{
																				name : "hsnsacno",
																				width : 10,

																			},
																			{
																				name : "color",
																				width : 10,
																				editable : true,
																			},
																			{
																				name : "size",
																				width : 10,
																				editable : true,
																			},

																			{
																				name : "quantity",
																				width : 10,
																				editable : true,
																			},
																			{
																				name : "rollSize",
																				width : 10,
																				editable : true,
																			},

																			{
																				name : "buyPrice",//THIS IS FOR BUY PRICE	
																				width : 10,
																				editable : true,

																			},
																			{
																				name : "purcode",
																				width : 15,
																				editable : true,

																			},
																			{
																				name : "actualprice",//THIS IS FOR SALE PRICE
																				width : 10,
																				editable : true,

																			},
																			{
																				name : "salePrice",//THIS IS FOR DISCOUNT
																				width : 10,
																				editable : true,

																			},

																			{
																				name : "Total",
																				width : 10,
																				formatter : 'number',
																			}

																	],
																	sortorder : 'desc',
																	multiselect : false,
																	loadonce : false,
																	viewrecords : true,
																	width : 2000,
																	shrinkToFit : true,
																	rowheight : 300,
																	rownumbers : true,
																	onSelectRow : editRow,
																	rowNum : 11,

																	'cellEdit' : true,

																	beforeEditCell : function(
																			rowid,
																			cellname,
																			value,
																			irow,
																			icol) {
																		var rowId = $(
																				"#jqGrid")
																				.jqGrid(
																						'getGridParam',
																						'selrow');
																		var rowData = jQuery(
																				"#jqGrid")
																				.getRowData(
																						rowId);
																		var unit = rowData['size'];

																		if (unit == "meter"
																				|| unit == "Meter"
																				|| unit == "METER") {
																			$(
																					this)
																					.jqGrid(
																							'setColProp',
																							'rollSize',
																							{
																								editable : true
																							});
																		} else {
																			$(
																					this)
																					.jqGrid(
																							'setColProp',
																							'rollSize',
																							{
																								editable : false
																							});
																		}
																	},

																	afterSaveCell : function() {
																		var rowId = $(
																				"#jqGrid")
																				.jqGrid(
																						'getGridParam',
																						'selrow');
																		var rowData = jQuery(
																				"#jqGrid")
																				.getRowData(
																						rowId);
																		var count1 = jQuery(
																				"#jqGrid")
																				.jqGrid(
																						'getGridParam',
																						'records');
																		var itemName = rowData['itemName'];
																		var quantity = rowData['quantity'];
																		var buyPrice = rowData['buyPrice'];
																		var salePrice = rowData['salePrice'];
																		var vatAmt = 0;
																		var discount = 0;
																		var tota = 0;
																		var totAmt = 0;
																		var ids = jQuery(
																				"#jqGrid")
																				.jqGrid(
																						'getDataIDs');

																		//for calculation of gst and total after change in quantity and buy price in resp to itemname
																		//to display gst total and igst total

																		var TotalGst = 0;
																		var TotalIgst = 0;

																		for (var r = 0; r < count1; r++) {

																			tota = quantity
																					* buyPrice;
																			totAmt = quantity
																					* buyPrice;
																			if (salePrice != "0") {
																				discount = ((tota * salePrice) / 100);
																				tota = +tota
																						- +discount;
																				totAmt = +tota;
																			}

																			var itemName6 = rowData['itemName'];

																			$(
																					"#jqGrid")
																					.jqGrid(
																							"setCell",
																							rowId,
																							"Total",
																							totAmt);

																		}
																		var Total = 0;
																		var TotalQuantity = 0;
																		var TotalGst = 0;
																		var TotalIgst = 0;

																		var count2 = jQuery(
																				"#jqGrid")
																				.jqGrid(
																						'getGridParam',
																						'records');
																		var allRowsInGrid1 = $(
																				'#jqGrid')
																				.getGridParam(
																						'data');
																		var AllRows = JSON
																				.stringify(allRowsInGrid1);
																		for (var k = 0; k < count2; k++) {
																			var Total1 = allRowsInGrid1[k].Total;
																			if (Total1 != undefined) {
																				Total = +Total
																						+ +Total1;
																			}
																		}

																		for (var n = 0; n < count2; n++) {
																			var TotalQuantity1 = allRowsInGrid1[n].quantity;
																			if (Total1 != undefined) {
																				TotalQuantity = +TotalQuantity
																						+ +TotalQuantity1;
																			}
																		}
																		document
																				.getElementById("resolution").value = Total
																				.toFixed(2);
																		;
																		document
																				.getElementById("resolution1").value = Total
																				.toFixed(2);
																		;
																		document
																				.getElementById("totalQuantity").value = TotalQuantity;
																		var totAmount = Total
																				.toFixed(2);
																		;

																		var extraDiscount = document
																				.getElementById("extraDiscount").value;
																		if (extraDiscount != "0") {
																			document
																					.getElementById("resolution").value = totAmount;
																		} else {
																			var disAmount = (extraDiscount / 100)
																					* totAmount;
																			var gross = +totAmount
																					- +disAmount;
																			document
																					.getElementById("resolution").value = gross
																					.toFixed(2);
																			;
																		}

																		var expence = document
																				.getElementById("expence").value;
																		if (expence != "0") {
																			document
																					.getElementById("resolution").value = totAmount;
																		} else {
																			document
																					.getElementById("resolution").value = (+totAmount + +expence);
																		}
																	},
																	pager : "#jqGridPager",
																});

												var lastSelection;

												function editRow(id) {
													if (id
															&& id !== lastSelection) {
														var grid = $("#jqGrid");
														grid.jqGrid(
																'restoreRow',
																lastSelection);
														grid.jqGrid('editRow',
																id, {
																	keys : true
																});
														lastSelection = id;
													}
												}

												if (count == 0 || count == null) {
													$("#jqGrid").addRowData(0,
															jsonData.offer);
												}

												$('#jqGrid')
														.navGrid(
																'#jqGridPager',
																// the buttons to appear on the toolbar of the grid
																{
																	edit : true,
																	add : false,
																	del : true,
																	search : true,
																	refresh : false,
																	view : true,
																	position : "left",
																	cloneToTop : false
																},
																// options for the Edit Dialog
																{
																	editCaption : "The Edit Dialog",

																	reloadAfterSubmit : true,
																	closeAfterEdit : true,
																	recreateForm : true,

																	errorTextFormat : function(
																			data) {
																		return 'Error: '
																				+ data.responseText
																	}
																},

																{},

																{
																	closeAfterdel : true,
																	recreateForm : true,
																	afterComplete : function() {
																		$(
																				'#jqGrid')
																				.trigger(
																						'reloadGrid');
																		var rowId = $(
																				"#jqGrid")
																				.jqGrid(
																						'getGridParam',
																						'selrow');
																		var rowData = jQuery(
																				"#jqGrid")
																				.getRowData(
																						rowId);
																		var count = jQuery(
																				"#jqGrid")
																				.jqGrid(
																						'getGridParam',
																						'records');
																		var itemName = rowData['itemName'];
																		var quantity = rowData['quantity'];
																		var buyPrice = rowData['buyPrice'];
																		var salePrice = rowData['salePrice'];
																		var vatAmt = 0;
																		var discount = 0;
																		var tota = 0;
																		var totAmt = 0;
																		var ids = jQuery(
																				"#jqGrid")
																				.jqGrid(
																						'getDataIDs');

																		//for calculation of gst and total after change in quantity and buy price in resp to itemname
																		//to display gst total and igst total

																		var TotalGst = 0;
																		var TotalIgst = 0;
																		var count1 = count - 1;
																		for (var r = 0; r < count; r++) {

																			tota = quantity
																					* buyPrice;
																			totAmt = quantity
																					* buyPrice;
																			if (salePrice != "0") {
																				discount = ((tota * salePrice) / 100);
																				tota = +tota
																						- +discount;
																				totAmt = +tota;
																			}

																			var itemName6 = rowData['itemName'];

																			$(
																					"#jqGrid")
																					.jqGrid(
																							"setCell",
																							rowId,
																							"Total",
																							totAmt);

																		}
																		var Total = 0;
																		var TotalQuantity = 0;
																		var TotalGst = 0;
																		var TotalIgst = 0;

																		var count2 = count - 1;
																		var allRowsInGrid1 = $(
																				'#jqGrid')
																				.getGridParam(
																						'data');
																		var AllRows = JSON
																				.stringify(allRowsInGrid1);
																		for (var k = 0; k < count; k++) {
																			var Total1 = allRowsInGrid1[k].Total;
																			if (Total1 != undefined) {
																				Total = +Total
																						+ +Total1;
																			}
																		}

																		for (var n = 0; n < count; n++) {
																			var TotalQuantity1 = allRowsInGrid1[n].quantity;
																			if (Total1 != undefined) {
																				TotalQuantity = +TotalQuantity
																						+ +TotalQuantity1;
																			}
																		}
																		document
																				.getElementById("resolution").value = Total
																				.toFixed(2);
																		;
																		document
																				.getElementById("resolution1").value = Total
																				.toFixed(2);
																		;
																		document
																				.getElementById("totalQuantity").value = TotalQuantity;

																		var totAmount = Total
																				.toFixed(2);

																		var extraDiscount = document
																				.getElementById("extraDiscount").value;
																		if (extraDiscount != "0") {
																			document
																					.getElementById("resolution").value = totAmount;
																		} else {
																			var disAmount = (extraDiscount / 100)
																					* totAmount;
																			var gross = +totAmount
																					- +disAmount;
																			document
																					.getElementById("resolution").value = gross
																					.toFixed(2);
																		}

																		var expence = document
																				.getElementById("expence").value;
																		if (expence != "0") {
																			document
																					.getElementById("resolution").value = totAmount;
																		} else {
																			document
																					.getElementById("resolution").value = (+totAmount + +expence);
																		}
																	},
																	errorTextFormat : function(
																			data) {
																		return 'Error: '
																				+ data.responseText
																	},
																	onSelectRow : function(
																			id) {
																		if (id
																				&& id !== lastSel) {
																			jQuery(
																					"#jqGrid")
																					.saveRow(
																							lastSel,
																							true,
																							'clientArray');
																			jQuery(
																					"#jqGrid")
																					.editRow(
																							id,
																							true);
																			lastSel = id;
																			console
																					.log(id);
																		}
																	}
																});
											})
									.error(
											function(jqXHR, textStatus,
													errorThrown) {
												if (textStatus === "timeout") {
													$(loaderObj).hide();
													$(loaderObj).find(
															'#errorDiv').show();
												}
											})
						});
	}*/
}

function getTaxType()
{	
	var input = document.getElementById('supplierId'), list = document.getElementById('supplierId_drop'), k, supplierId, supcode;
	for (k = 0; k < list.options.length; ++k)
	{
		if (list.options[k].value === input.value)
		{
			supplierId = list.options[k].getAttribute('data-value');
		}
	}
	
	var mainCat = supplierId;
	
	$("#taxType").append($("<input/>").attr("value","").text());
	
	var params= {};
	params["methodName"] = "getSupplier";
	params["supplierName"]= mainCat;
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			document.getElementById("taxType").value = v.taxType;	
		});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
				}
			});
}
