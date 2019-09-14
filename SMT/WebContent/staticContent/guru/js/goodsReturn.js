function purchaseReturn() {
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
		var itemName = allRowsInGrid[i].itemID;
		params["itemName" + i] = itemName;

		var color = allRowsInGrid[i].color;
		params["color" + i] = color;

		var quantity = allRowsInGrid[i].quantity;
		params["quantity" + i] = quantity;

		var unitPrice = allRowsInGrid[i].unitPrice;
		params["unitPrice" + i] = unitPrice;

		var supplier_id = allRowsInGrid[i].supplier_id;
		params["supplier_id" + i] = supplier_id;

		var insDate = allRowsInGrid[i].insDate;
		params["insDate" + i] = insDate;

		var total = params["unitPrice" + i] * params["quantity" + i];

		params["total" + i] = total;
		for (var int = 0; int < count.length; int++) {

		}
	}

	var billNo = $('#billNo').val();
	params["billNo"] = billNo;

	params["count"] = count;

	params["methodName"] = "returngoodsReceipt";
	var dd = Object.keys(params).length;
	console.log(count);
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
		var billNo = $('#billNo').val();

		var params = {};
		params["methodName"] = "getItemsByBill";
		params["billNo"] = billNo;
		$.post(
				'/SMT/jsp/utility/controller.jsp',
				params,
				function(data) {

					var jsonData = $.parseJSON(data);
					var catmap = jsonData.list;
					$.each(jsonData, function(i, v) {

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
									            	 width : 110,
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
									             loadonce : true,
									             viewrecords : true,
									             width : 1000,
									             height : 300,
									             rowNum : 10,

									             pager : "#jqGridPager",
									             'cellEdit':true
								});

						$("#jqGrid").addRowData(i, jsonData[i]);

						$('#jqGrid')
						.navGrid(
								'#jqGridPager',
								// the buttons to appear on the toolbar of the grid
								{
									edit : true,
									add : true,
									del : true,
									search : true,
									refresh : true,
									view : true,
									position : "left",
									cloneToTop : false
								},
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
									closeAfterdel : true,
									recreateForm : true,
									errorTextFormat : function(data) {
										return 'Error: '
										+ data.responseText
									},

									onSelectRow : function(id) {
										if (id && id !== lastSel) {
											jQuery("#jqGrid").saveRow(
													lastSel, true,
													'clientArray');
											jQuery("#jqGrid").editRow(
													id, true);
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