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
								{ edit: true, add: true, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
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